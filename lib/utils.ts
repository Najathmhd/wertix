/**
 * Generates a unique reference number for a quote request.
 * Format: WERTIX-YYYYMMDD-XXXXX (e.g. WERTIX-20261022-A3F2B)
 */
export function generateRefNumber(): string {
  const date = new Date()
  const dateStr =
    date.getFullYear().toString() +
    String(date.getMonth() + 1).padStart(2, '0') +
    String(date.getDate()).padStart(2, '0')
  const random = Math.random().toString(36).toUpperCase().slice(2, 7)
  return `WERTIX-${dateStr}-${random}`
}

/**
 * Calculates the company/worker financial split.
 * @param totalAmount - Total project value
 * @param companyPct - Company percentage (e.g. 60)
 * @param workerPct - Worker percentage (e.g. 40)
 */
export function calculateAllocation(
  totalAmount: number,
  companyPct: number,
  workerPct: number
) {
  const companyAmount = (totalAmount * companyPct) / 100
  const workerAmount = (totalAmount * workerPct) / 100
  return {
    companyAmount: parseFloat(companyAmount.toFixed(2)),
    workerAmount: parseFloat(workerAmount.toFixed(2)),
    companyPct,
    workerPct,
    total: totalAmount,
  }
}

/**
 * Formats a Decimal/number as a currency string.
 */
export function formatCurrency(
  amount: number | string,
  currency = 'USD'
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(Number(amount))
}

/** Status display maps */
export const QUOTE_STATUS_LABELS: Record<string, string> = {
  NEW: 'New',
  REVIEWING: 'Reviewing',
  QUOTED: 'Quoted',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
  CONVERTED: 'Converted',
  ARCHIVED: 'Archived',
}

export const PROJECT_STATUS_LABELS: Record<string, string> = {
  ACTIVE: 'Active',
  ON_HOLD: 'On Hold',
  IN_REVIEW: 'In Review',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
}

export const REVIEW_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pending',
  PASSED: 'Passed',
  FAILED: 'Failed',
  REVISION_REQUIRED: 'Revision Required',
}

/** Status badge color classes */
export function quoteStatusColor(status: string): string {
  const map: Record<string, string> = {
    NEW: 'bg-blue-100 text-blue-800',
    REVIEWING: 'bg-yellow-100 text-yellow-800',
    QUOTED: 'bg-purple-100 text-purple-800',
    APPROVED: 'bg-green-100 text-green-800',
    REJECTED: 'bg-red-100 text-red-800',
    CONVERTED: 'bg-emerald-100 text-emerald-800',
    ARCHIVED: 'bg-slate-100 text-slate-600',
  }
  return map[status] ?? 'bg-slate-100 text-slate-600'
}

export function projectStatusColor(status: string): string {
  const map: Record<string, string> = {
    ACTIVE: 'bg-green-100 text-green-800',
    ON_HOLD: 'bg-yellow-100 text-yellow-800',
    IN_REVIEW: 'bg-purple-100 text-purple-800',
    COMPLETED: 'bg-blue-100 text-blue-800',
    CANCELLED: 'bg-red-100 text-red-800',
  }
  return map[status] ?? 'bg-slate-100 text-slate-600'
}

export function reviewStatusColor(status: string): string {
  const map: Record<string, string> = {
    PENDING: 'bg-slate-100 text-slate-700',
    PASSED: 'bg-green-100 text-green-800',
    FAILED: 'bg-red-100 text-red-800',
    REVISION_REQUIRED: 'bg-orange-100 text-orange-800',
  }
  return map[status] ?? 'bg-slate-100 text-slate-600'
}
