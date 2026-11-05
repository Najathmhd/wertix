import { prisma } from '@/lib/db'
import type { QuoteRequestStatus, Prisma } from '@prisma/client'
import { quoteStatusColor, QUOTE_STATUS_LABELS } from '@/lib/utils'
import { FileText, Search } from 'lucide-react'

const STATUSES = ['ALL', 'NEW', 'REVIEWING', 'QUOTED', 'APPROVED', 'REJECTED', 'CONVERTED', 'ARCHIVED']

export default async function AdminRequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string; page?: string }>
}) {
  const params = await searchParams
  const status = params.status && params.status !== 'ALL' ? (params.status as QuoteRequestStatus) : undefined
  const q = params.q ?? ''
  const page = parseInt(params.page ?? '1')
  const PAGE_SIZE = 20

  const where: Prisma.QuoteRequestWhereInput = {
    ...(status ? { status } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q } },
            { email: { contains: q } },
            { refNumber: { contains: q } },
            { company: { contains: q } },
          ],
        }
      : {}),
  }

  const [requests, total] = await Promise.all([
    prisma.quoteRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
      select: {
        id: true,
        refNumber: true,
        name: true,
        email: true,
        company: true,
        services: true,
        budget: true,
        timeline: true,
        status: true,
        createdAt: true,
        _count: { select: { quotations: true } },
      },
    }),
    prisma.quoteRequest.count({ where }),
  ])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#090D1A] flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Quote Requests
          </h1>
          <p className="text-slate-500 text-sm mt-1">{total} request{total !== 1 ? 's' : ''} found</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <form>
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search by name, email, ref number…"
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5] focus:border-transparent"
            />
            {status && <input type="hidden" name="status" value={status} />}
          </form>
        </div>

        {/* Status tabs */}
        <div className="flex flex-wrap gap-1.5">
          {STATUSES.map((s) => {
            const isActive = (s === 'ALL' && !status) || s === status
            return (
              <a
                key={s}
                href={`/admin/requests?status=${s}${q ? `&q=${q}` : ''}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#090D1A] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s === 'ALL' ? 'All' : QUOTE_STATUS_LABELS[s] ?? s}
              </a>
            )
          })}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Ref / Date
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Client
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">
                  Budget
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">
                  Quotes
                </th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-slate-400">
                    No requests found.
                  </td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3">
                      <a href={`/admin/requests/${req.id}`} className="hover:text-[#0055e5]">
                        <p className="font-mono text-xs text-slate-600">{req.refNumber}</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {new Date(req.createdAt).toLocaleDateString()}
                        </p>
                      </a>
                    </td>
                    <td className="px-5 py-3">
                      <a href={`/admin/requests/${req.id}`} className="hover:text-[#0055e5]">
                        <p className="font-medium text-slate-900">{req.name}</p>
                        <p className="text-xs text-slate-500">{req.email}</p>
                        {req.company && (
                          <p className="text-xs text-slate-400">{req.company}</p>
                        )}
                      </a>
                    </td>
                    <td className="px-5 py-3 hidden lg:table-cell">
                      <span className="text-slate-600 text-xs">{req.budget}</span>
                    </td>
                    <td className="px-5 py-3 hidden lg:table-cell">
                      <span className="text-slate-600">{req._count?.quotations ?? 0}</span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${quoteStatusColor(req.status)}`}>
                        {QUOTE_STATUS_LABELS[req.status] ?? req.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-500">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              {page > 1 && (
                <a
                  href={`/admin/requests?page=${page - 1}${status ? `&status=${status}` : ''}${q ? `&q=${q}` : ''}`}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200"
                >
                  Previous
                </a>
              )}
              {page < totalPages && (
                <a
                  href={`/admin/requests?page=${page + 1}${status ? `&status=${status}` : ''}${q ? `&q=${q}` : ''}`}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200"
                >
                  Next
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
