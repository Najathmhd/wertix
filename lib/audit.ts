import 'server-only'
import { prisma } from './db'

export interface AuditEventParams {
  adminId?: string | null
  action: string
  entity: string
  entityId?: string | null
  details?: Record<string, unknown> | string
  ipAddress?: string | null
}

/**
 * Record an audit log entry for security and administrative operations.
 * Fails safely if database logging fails.
 */
export async function logAuditEvent(params: AuditEventParams): Promise<void> {
  try {
    const detailsString =
      typeof params.details === 'object' && params.details !== null
        ? JSON.stringify(params.details)
        : params.details ?? null

    await prisma.auditLog.create({
      data: {
        adminId: params.adminId || null,
        action: params.action,
        entity: params.entity,
        entityId: params.entityId || null,
        details: detailsString,
        ipAddress: params.ipAddress || null,
      },
    })
  } catch (error) {
    // Non-blocking fallback to avoid breaking main business flow
    console.error('[AUDIT_LOG_ERROR]', {
      action: params.action,
      entity: params.entity,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
