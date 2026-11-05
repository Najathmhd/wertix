'use server'

import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { prisma } from '@/lib/db'
import { createSession, deleteSession } from '@/lib/session'
import { requireAdmin } from '@/lib/dal'
import { checkRateLimit } from '@/lib/rate-limit'
import { logAuditEvent } from '@/lib/audit'

// ─── Validation Schemas ───────────────────────────────────────────────────────

const LoginSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address.')
    .max(120, 'Email address is too long.')
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(1, 'Password is required.')
    .max(128, 'Password exceeds maximum length.'),
})

// ─── Login ────────────────────────────────────────────────────────────────────

export type AuthActionState =
  | {
      errors?: {
        email?: string[]
        password?: string[]
        currentPassword?: string[]
        newPassword?: string[]
        form?: string[]
      }
    }
  | undefined

export async function loginAction(
  state: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const reqHeaders = await headers()
  const forwardedFor = reqHeaders.get('x-forwarded-for')
  const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1'

  // Validate inputs
  const validated = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  const { email, password } = validated.data

  // Rate limiting: max 5 attempts per 15 minutes per IP + email
  const rateLimitKey = `login:${clientIp}:${email}`
  const rateLimit = await checkRateLimit(rateLimitKey, {
    intervalMs: 15 * 60 * 1000,
    maxRequests: 5,
  })

  if (!rateLimit.success) {
    const minutes = Math.ceil(rateLimit.resetMs / 60000)
    await logAuditEvent({
      action: 'LOGIN_RATE_LIMITED',
      entity: 'Admin',
      details: { email, clientIp },
      ipAddress: clientIp,
    })
    return {
      errors: {
        form: [
          `Too many failed attempts. For security, please wait ${minutes} minute${
            minutes > 1 ? 's' : ''
          } before trying again.`,
        ],
      },
    }
  }

  // Look up admin
  const admin = await prisma.admin.findUnique({ where: { email } })

  if (!admin) {
    await logAuditEvent({
      action: 'LOGIN_FAILED',
      entity: 'Admin',
      details: { email, reason: 'User not found' },
      ipAddress: clientIp,
    })
    return { errors: { form: ['Invalid email or password.'] } }
  }

  // Verify password
  const passwordMatch = await bcrypt.compare(password, admin.passwordHash)
  if (!passwordMatch) {
    await logAuditEvent({
      adminId: admin.id,
      action: 'LOGIN_FAILED',
      entity: 'Admin',
      details: { email, reason: 'Password mismatch' },
      ipAddress: clientIp,
    })
    return { errors: { form: ['Invalid email or password.'] } }
  }

  // Audit log successful authentication
  await logAuditEvent({
    adminId: admin.id,
    action: 'LOGIN_SUCCESS',
    entity: 'Admin',
    details: { email, role: admin.role },
    ipAddress: clientIp,
  })

  // Create session with server-side revocation ID
  await createSession({
    adminId: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  })

  redirect('/admin')
}

// ─── Logout ───────────────────────────────────────────────────────────────────

export async function logoutAction() {
  const reqHeaders = await headers()
  const forwardedFor = reqHeaders.get('x-forwarded-for')
  const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1'

  try {
    const admin = await requireAdmin()
    await logAuditEvent({
      adminId: admin.id,
      action: 'LOGOUT',
      entity: 'Admin',
      ipAddress: clientIp,
    })
  } catch {
    // If already unauthenticated, still clear cookie
  }

  await deleteSession()
  redirect('/admin/login')
}

// ─── Change Password ──────────────────────────────────────────────────────────

const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required.').max(128),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .max(128, 'Password cannot exceed 128 characters.')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number.'
    ),
})

async function revokeAllAdminSessions(adminId: string) {
  try {
    await prisma.adminSession.deleteMany({
      where: { adminId },
    })
  } catch {
    // Non-blocking in environments without active DB table
  }
}

export async function changePasswordAction(
  _state: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const admin = await requireAdmin()
  const reqHeaders = await headers()
  const forwardedFor = reqHeaders.get('x-forwarded-for')
  const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1'

  const validated = ChangePasswordSchema.safeParse({
    currentPassword: formData.get('currentPassword'),
    newPassword: formData.get('newPassword'),
  })

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors }
  }

  const fullAdmin = await prisma.admin.findUnique({ where: { id: admin.id } })
  if (!fullAdmin) return { errors: { form: ['Admin not found.'] } }

  const passwordMatch = await bcrypt.compare(
    validated.data.currentPassword,
    fullAdmin.passwordHash
  )
  if (!passwordMatch) {
    return { errors: { form: ['Current password is incorrect.'] } }
  }

  const newHash = await bcrypt.hash(validated.data.newPassword, 12)
  await prisma.admin.update({
    where: { id: admin.id },
    data: { passwordHash: newHash },
  })

  // Security: Invalidate all other active sessions for this admin
  await revokeAllAdminSessions(admin.id)

  await logAuditEvent({
    adminId: admin.id,
    action: 'PASSWORD_CHANGED',
    entity: 'Admin',
    ipAddress: clientIp,
  })

  // Issue a fresh rotated session for the current client
  await createSession({
    adminId: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  })

  return undefined
}
