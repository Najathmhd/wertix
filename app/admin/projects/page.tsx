import Link from 'next/link'
import { prisma } from '@/lib/db'
import type { ProjectStatus, Prisma } from '@prisma/client'
import { projectStatusColor, PROJECT_STATUS_LABELS, formatCurrency } from '@/lib/utils'
import { Briefcase } from 'lucide-react'

const STATUSES = ['ALL', 'ACTIVE', 'ON_HOLD', 'IN_REVIEW', 'COMPLETED', 'CANCELLED']

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>
}) {
  const params = await searchParams
  const status = params.status && params.status !== 'ALL' ? (params.status as ProjectStatus) : undefined
  const page = parseInt(params.page ?? '1')
  const PAGE_SIZE = 20

  const where: Prisma.ProjectWhereInput = status ? { status } : {}

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
      select: {
        id: true,
        title: true,
        status: true,
        totalValue: true,
        currency: true,
        startDate: true,
        deliveryDate: true,
        createdAt: true,
        _count: { select: { assignments: true, milestones: true } },
        client: { select: { name: true } },
      },
    }),
    prisma.project.count({ where }),
  ])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#090D1A] flex items-center gap-2">
            <Briefcase className="w-6 h-6" />
            Projects
          </h1>
          <p className="text-slate-500 text-sm mt-1">{total} project{total !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#090D1A] text-white text-sm font-semibold hover:bg-[#0055e5] transition-colors"
        >
          + New Project
        </Link>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-1.5">
        {STATUSES.map((s) => {
          const isActive = (s === 'ALL' && !status) || s === status
          return (
            <a
              key={s}
              href={`/admin/projects?status=${s}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                isActive
                  ? 'bg-[#090D1A] text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {s === 'ALL' ? 'All' : PROJECT_STATUS_LABELS[s] ?? s}
            </a>
          )
        })}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Project</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Value</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Workers</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Milestones</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-slate-400">No projects found.</td>
                </tr>
              ) : (
                projects.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3">
                      <a href={`/admin/projects/${p.id}`} className="hover:text-[#0055e5]">
                        <p className="font-medium text-slate-900">{p.title}</p>
                        <p className="text-xs text-slate-500">
                          {p.client?.name ?? 'No client'} · {new Date(p.createdAt).toLocaleDateString()}
                        </p>
                      </a>
                    </td>
                    <td className="px-5 py-3 hidden lg:table-cell">
                      <span className="text-slate-700 font-medium">
                        {formatCurrency(Number(p.totalValue), p.currency)}
                      </span>
                    </td>
                    <td className="px-5 py-3 hidden lg:table-cell text-slate-600">{p._count?.assignments ?? 0}</td>
                    <td className="px-5 py-3 hidden lg:table-cell text-slate-600">{p._count?.milestones ?? 0}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${projectStatusColor(p.status)}`}>
                        {PROJECT_STATUS_LABELS[p.status] ?? p.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-between">
            <p className="text-xs text-slate-500">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              {page > 1 && (
                <a href={`/admin/projects?page=${page - 1}${status ? `&status=${status}` : ''}`} className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200">Previous</a>
              )}
              {page < totalPages && (
                <a href={`/admin/projects?page=${page + 1}${status ? `&status=${status}` : ''}`} className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium hover:bg-slate-200">Next</a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
