import 'server-only'
import { getSession } from './session'
import { prisma } from './db'
import type { Admin } from '@prisma/client'

/** Returns the authenticated admin from the session, or null. */
export async function getAuthenticatedAdmin(): Promise<Omit<Admin, 'passwordHash'> | null> {
  const session = await getSession()
  if (!session?.adminId) return null

  const admin = await prisma.admin.findUnique({
    where: { id: session.adminId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  return admin
}

/** Asserts the request is from an authenticated admin.
 *  Throws an error (returns null) if not authenticated.
 *  Use this in Server Actions and Route Handlers.
 */
export async function requireAdmin(): Promise<Omit<Admin, 'passwordHash'>> {
  const admin = await getAuthenticatedAdmin()
  if (!admin) {
    throw new Error('Unauthorized')
  }
  return admin
}

/** Asserts the request is from a SUPER_ADMIN */
export async function requireSuperAdmin(): Promise<Omit<Admin, 'passwordHash'>> {
  const admin = await requireAdmin()
  if (admin.role !== 'SUPER_ADMIN') {
    throw new Error('Forbidden: Super Admin access required')
  }
  return admin
}
