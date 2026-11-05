'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/dal'
import { calculateAllocation } from '@/lib/utils'
import { logAuditEvent } from '@/lib/audit'

// ─── Create Project ───────────────────────────────────────────────────────────

const CreateProjectSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters.'),
  clientId: z.string().optional(),
  quoteRequestId: z.string().optional(),
  quotationId: z.string().optional(),
  totalValue: z.coerce.number().positive('Total value must be positive.'),
  currency: z.string().default('USD'),
  companyPct: z.coerce.number().min(0).max(100).default(60),
  workerPct: z.coerce.number().min(0).max(100).default(40),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  notes: z.string().optional(),
})

export type ProjectActionState =
  | { success?: boolean; id?: string; errors?: Record<string, string[]> }
  | undefined

export async function createProjectAction(
  _state: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  await requireAdmin()

  const validated = CreateProjectSchema.safeParse({
    title: formData.get('title'),
    clientId: formData.get('clientId') || undefined,
    quoteRequestId: formData.get('quoteRequestId') || undefined,
    quotationId: formData.get('quotationId') || undefined,
    totalValue: formData.get('totalValue'),
    currency: formData.get('currency') || 'USD',
    companyPct: formData.get('companyPct') || 60,
    workerPct: formData.get('workerPct') || 40,
    startDate: formData.get('startDate') || undefined,
    endDate: formData.get('endDate') || undefined,
    notes: formData.get('notes') || undefined,
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  const data = validated.data

  // ── Auto-create/find client when converting from a quote request ──────────
  // Client.email has no @unique constraint in schema so we use findFirst + create
  // inside a transaction to avoid duplicate client records.
  let resolvedClientId = data.clientId

  if (data.quoteRequestId && !resolvedClientId) {
    const qr = await prisma.quoteRequest.findUnique({
      where: { id: data.quoteRequestId },
      select: { name: true, email: true, phone: true, company: true },
    })
    if (qr) {
      const result = await prisma.$transaction(async (tx) => {
        const existing = await tx.client.findFirst({ where: { email: qr.email } })
        if (existing) return existing
        return tx.client.create({
          data: {
            name: qr.name,
            email: qr.email,
            phone: qr.phone ?? undefined,
            company: qr.company ?? undefined,
          },
        })
      })
      resolvedClientId = result.id
    }
  }

  const project = await prisma.project.create({
    data: {
      title: data.title,
      clientId: resolvedClientId,
      quoteRequestId: data.quoteRequestId,
      quotationId: data.quotationId,
      totalValue: data.totalValue,
      currency: data.currency,
      companyPct: data.companyPct,
      workerPct: data.workerPct,
      startDate: data.startDate ? new Date(data.startDate) : null,
      endDate: data.endDate ? new Date(data.endDate) : null,
      notes: data.notes,
      status: 'ACTIVE',
    },
  })

  // If converted from a quote request, update that status
  if (data.quoteRequestId) {
    await prisma.quoteRequest.update({
      where: { id: data.quoteRequestId },
      data: { status: 'CONVERTED' },
    })
  }

  revalidatePath('/admin/projects')
  redirect(`/admin/projects/${project.id}`)
}

const ProjectStatusSchema = z.enum([
  'ACTIVE',
  'ON_HOLD',
  'IN_REVIEW',
  'COMPLETED',
  'CANCELLED',
])

export async function updateProjectStatusAction(
  id: string,
  status: string
) {
  const admin = await requireAdmin()
  const validatedStatus = ProjectStatusSchema.parse(status)

  await prisma.project.update({
    where: { id },
    data: { status: validatedStatus },
  })

  await logAuditEvent({
    adminId: admin.id,
    action: 'UPDATE_PROJECT_STATUS',
    entity: 'Project',
    entityId: id,
    details: { status: validatedStatus },
  })

  revalidatePath('/admin/projects')
  revalidatePath(`/admin/projects/${id}`)
}

// ─── Assign Worker ────────────────────────────────────────────────────────────

const AssignWorkerSchema = z.object({
  projectId: z.string(),
  workerId: z.string(),
  role: z.string().min(1, 'Role is required.'),
  workerPct: z.coerce.number().min(0).max(100).default(40),
  notes: z.string().optional(),
})

export async function assignWorkerAction(
  _state: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  await requireAdmin()

  const validated = AssignWorkerSchema.safeParse({
    projectId: formData.get('projectId'),
    workerId: formData.get('workerId'),
    role: formData.get('role'),
    workerPct: formData.get('workerPct') || 40,
    notes: formData.get('notes') || undefined,
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  const data = validated.data

  await prisma.workerAssignment.create({
    data: {
      projectId: data.projectId,
      workerId: data.workerId,
      role: data.role,
      workerPct: data.workerPct,
      notes: data.notes,
    },
  })

  revalidatePath(`/admin/projects/${data.projectId}`)
  return { success: true }
}

// ─── Add Milestone ────────────────────────────────────────────────────────────

const MilestoneSchema = z.object({
  projectId: z.string(),
  title: z.string().min(2),
  description: z.string().optional(),
  dueDate: z.string().optional(),
})

export async function addMilestoneAction(
  _state: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  await requireAdmin()

  const validated = MilestoneSchema.safeParse({
    projectId: formData.get('projectId'),
    title: formData.get('title'),
    description: formData.get('description') || undefined,
    dueDate: formData.get('dueDate') || undefined,
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  const data = validated.data

  await prisma.milestone.create({
    data: {
      projectId: data.projectId,
      title: data.title,
      description: data.description,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      status: 'PENDING',
    },
  })

  revalidatePath(`/admin/projects/${data.projectId}`)
  return { success: true }
}

// ─── Add Financial Record ─────────────────────────────────────────────────────

const FinancialSchema = z.object({
  projectId: z.string(),
  type: z.enum(['INVOICE', 'PAYMENT', 'WORKER_PAYMENT', 'EXPENSE', 'REFUND']),
  amount: z.coerce.number().positive(),
  currency: z.string().default('USD'),
  description: z.string().optional(),
  referenceId: z.string().optional(),
  paidAt: z.string().optional(),
})

export async function addFinancialRecordAction(
  _state: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  await requireAdmin()

  const validated = FinancialSchema.safeParse({
    projectId: formData.get('projectId'),
    type: formData.get('type'),
    amount: formData.get('amount'),
    currency: formData.get('currency') || 'USD',
    description: formData.get('description') || undefined,
    referenceId: formData.get('referenceId') || undefined,
    paidAt: formData.get('paidAt') || undefined,
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  const data = validated.data

  // Get project to calculate allocation
  const project = await prisma.project.findUnique({
    where: { id: data.projectId },
    select: { companyPct: true, workerPct: true },
  })

  const allocation = project
    ? calculateAllocation(data.amount, project.companyPct, project.workerPct)
    : null

  await prisma.financialRecord.create({
    data: {
      projectId: data.projectId,
      type: data.type,
      amount: data.amount,
      currency: data.currency,
      description: data.description,
      referenceId: data.referenceId,
      companyAmount: allocation?.companyAmount,
      workerAmount: allocation?.workerAmount,
      companyPct: allocation?.companyPct,
      workerPct: allocation?.workerPct,
      paidAt: data.paidAt ? new Date(data.paidAt) : null,
    },
  })

  revalidatePath(`/admin/projects/${data.projectId}`)
  return { success: true }
}

// ─── Add Quality Review ───────────────────────────────────────────────────────

const ReviewSchema = z.object({
  projectId: z.string(),
  title: z.string().min(2),
  status: z.enum(['PENDING', 'PASSED', 'FAILED', 'REVISION_REQUIRED']),
  checklist: z.string().optional(), // JSON
  feedback: z.string().optional(),
})

export async function addQualityReviewAction(
  _state: ProjectActionState,
  formData: FormData
): Promise<ProjectActionState> {
  await requireAdmin()

  const validated = ReviewSchema.safeParse({
    projectId: formData.get('projectId'),
    title: formData.get('title'),
    status: formData.get('status'),
    checklist: formData.get('checklist') || undefined,
    feedback: formData.get('feedback') || undefined,
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  const data = validated.data

  await prisma.qualityReview.create({
    data: {
      projectId: data.projectId,
      title: data.title,
      status: data.status,
      checklist: data.checklist,
      feedback: data.feedback,
      reviewedAt: data.status !== 'PENDING' ? new Date() : null,
    },
  })

  // If review passed, consider updating project status to COMPLETED if applicable
  if (data.status === 'PASSED') {
    await prisma.project.update({
      where: { id: data.projectId },
      data: { status: 'COMPLETED' },
    })
  }

  revalidatePath(`/admin/projects/${data.projectId}`)
  return { success: true }
}
