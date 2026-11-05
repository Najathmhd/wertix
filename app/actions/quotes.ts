'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { prisma } from '@/lib/db'
import { generateRefNumber } from '@/lib/utils'
import { requireAdmin } from '@/lib/dal'
import { checkRateLimit } from '@/lib/rate-limit'
import { logAuditEvent } from '@/lib/audit'

// ─── Public: Submit a Quote Request ──────────────────────────────────────────

const SubmitQuoteSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters.')
    .max(100, 'Name cannot exceed 100 characters.')
    .trim(),
  email: z
    .string()
    .email('Please enter a valid email address.')
    .max(120, 'Email cannot exceed 120 characters.')
    .trim()
    .toLowerCase(),
  company: z
    .string()
    .max(100, 'Company cannot exceed 100 characters.')
    .trim()
    .optional(),
  phone: z
    .string()
    .max(35, 'Phone number cannot exceed 35 characters.')
    .trim()
    .optional(),
  services: z
    .string()
    .min(1, 'Please select at least one service.')
    .max(2000, 'Invalid services selection.')
    .refine((val) => {
      try {
        const parsed = JSON.parse(val)
        return Array.isArray(parsed) && parsed.length > 0
      } catch {
        return false
      }
    }, 'Services must be a valid list.'),
  stage: z
    .string()
    .min(1, 'Please select your project stage.')
    .max(100, 'Invalid stage selection.'),
  timeline: z
    .string()
    .min(1, 'Please select a timeline.')
    .max(100, 'Invalid timeline selection.'),
  budget: z
    .string()
    .min(1, 'Please select a budget range.')
    .max(100, 'Invalid budget selection.'),
  description: z
    .string()
    .max(4000, 'Project description cannot exceed 4000 characters.')
    .trim()
    .optional(),
})

export type QuoteActionState =
  | {
      success?: boolean
      refNumber?: string
      errors?: Record<string, string[]>
    }
  | undefined

export async function submitQuoteAction(
  _state: QuoteActionState,
  formData: FormData
): Promise<QuoteActionState> {
  const reqHeaders = await headers()
  const forwardedFor = reqHeaders.get('x-forwarded-for')
  const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1'

  // Security: Rate limit public quote requests (max 5 per 10 minutes per IP)
  const rateLimitKey = `quote-submit:${clientIp}`
  const rateLimit = await checkRateLimit(rateLimitKey, {
    intervalMs: 10 * 60 * 1000,
    maxRequests: 5,
  })

  if (!rateLimit.success) {
    const minutes = Math.ceil(rateLimit.resetMs / 60000)
    return {
      errors: {
        form: [
          `Submission rate limit reached. Please wait ${minutes} minute${
            minutes > 1 ? 's' : ''
          } before submitting another quote request.`,
        ],
      },
    }
  }

  const validated = SubmitQuoteSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    company: formData.get('company') || undefined,
    phone: formData.get('phone') || undefined,
    services: formData.get('services'),
    stage: formData.get('stage'),
    timeline: formData.get('timeline'),
    budget: formData.get('budget'),
    description: formData.get('description') || undefined,
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  const data = validated.data
  const refNumber = generateRefNumber()

  try {
    await prisma.quoteRequest.create({
      data: {
        refNumber,
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
        services: data.services,
        stage: data.stage,
        timeline: data.timeline,
        budget: data.budget,
        description: data.description,
        status: 'NEW',
      },
    })

    return { success: true, refNumber }
  } catch (error) {
    console.error('[QUOTE_SUBMISSION_ERROR]', error)
    return {
      errors: {
        form: ['Unable to submit your quote request at this time. Please contact us directly at hello@wertix.lk.'],
      },
    }
  }
}

// ─── Admin: Update Quote Request Status ──────────────────────────────────────

const UpdateStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum([
    'NEW',
    'REVIEWING',
    'QUOTED',
    'APPROVED',
    'REJECTED',
    'CONVERTED',
    'ARCHIVED',
  ]),
  notes: z.string().max(4000).optional(),
})

export async function updateQuoteStatusAction(
  id: string,
  status: string,
  notes?: string
) {
  const admin = await requireAdmin()

  const validated = UpdateStatusSchema.safeParse({ id, status, notes })
  if (!validated.success) {
    throw new Error('Invalid quote status or payload')
  }

  await prisma.quoteRequest.update({
    where: { id: validated.data.id },
    data: {
      status: validated.data.status,
      notes: validated.data.notes,
    },
  })

  await logAuditEvent({
    adminId: admin.id,
    action: 'UPDATE_QUOTE_STATUS',
    entity: 'QuoteRequest',
    entityId: id,
    details: { status: validated.data.status },
  })

  revalidatePath('/admin/requests')
  revalidatePath(`/admin/requests/${id}`)
}

// ─── Admin: Create / Update Quotation ────────────────────────────────────────

const QuotationSchema = z.object({
  quoteRequestId: z.string().min(1),
  totalAmount: z.coerce.number().positive().max(10000000),
  currency: z.string().min(3).max(3).default('USD'),
  validUntil: z.string().optional(),
  notes: z.string().max(4000).optional(),
  lineItems: z
    .string()
    .max(10000)
    .refine((val) => {
      try {
        JSON.parse(val)
        return true
      } catch {
        return false
      }
    }, 'Line items must be valid JSON format.'),
})

export type QuotationActionState =
  | { success?: boolean; id?: string; errors?: Record<string, string[]> }
  | undefined

export async function createQuotationAction(
  _state: QuotationActionState,
  formData: FormData
): Promise<QuotationActionState> {
  const admin = await requireAdmin()

  const validated = QuotationSchema.safeParse({
    quoteRequestId: formData.get('quoteRequestId'),
    totalAmount: formData.get('totalAmount'),
    currency: formData.get('currency') || 'USD',
    validUntil: formData.get('validUntil'),
    notes: formData.get('notes') || undefined,
    lineItems: formData.get('lineItems') || '[]',
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  const data = validated.data

  // Get the next version number
  const latestVersion = await prisma.quotation.findFirst({
    where: { quoteRequestId: data.quoteRequestId },
    orderBy: { version: 'desc' },
    select: { version: true },
  })
  const version = (latestVersion?.version ?? 0) + 1

  // Mark previous versions as superseded
  if (version > 1) {
    await prisma.quotation.updateMany({
      where: {
        quoteRequestId: data.quoteRequestId,
        status: { in: ['DRAFT', 'SENT'] },
      },
      data: { status: 'SUPERSEDED' },
    })
  }

  const quotation = await prisma.quotation.create({
    data: {
      quoteRequestId: data.quoteRequestId,
      version,
      totalAmount: data.totalAmount,
      currency: data.currency,
      validUntil: data.validUntil ? new Date(data.validUntil) : null,
      notes: data.notes,
      lineItems: data.lineItems,
      status: 'DRAFT',
    },
  })

  // Update quote request status to QUOTED
  await prisma.quoteRequest.update({
    where: { id: data.quoteRequestId },
    data: { status: 'QUOTED' },
  })

  await logAuditEvent({
    adminId: admin.id,
    action: 'CREATE_QUOTATION',
    entity: 'Quotation',
    entityId: quotation.id,
    details: { quoteRequestId: data.quoteRequestId, version, totalAmount: data.totalAmount },
  })

  revalidatePath('/admin/requests')
  revalidatePath(`/admin/requests/${data.quoteRequestId}`)

  return { success: true, id: quotation.id }
}

export async function sendQuotationAction(quotationId: string) {
  const admin = await requireAdmin()

  await prisma.quotation.update({
    where: { id: quotationId },
    data: { status: 'SENT', sentAt: new Date() },
  })

  await logAuditEvent({
    adminId: admin.id,
    action: 'SEND_QUOTATION',
    entity: 'Quotation',
    entityId: quotationId,
  })

  revalidatePath('/admin/requests')
}
