import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Users } from 'lucide-react'

export default async function AdminWorkersPage() {
  const workers = await prisma.worker.findMany({
    orderBy: [{ isActive: 'desc' }, { name: 'asc' }],
    include: {
      _count: { select: { assignments: true } },
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#090D1A] flex items-center gap-2">
            <Users className="w-6 h-6" />
            Workers
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {workers.filter((w) => w.isActive).length} active · {workers.length} total
          </p>
        </div>
        <Link
          href="/admin/workers/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#090D1A] text-white text-sm font-semibold hover:bg-[#0055e5] transition-colors"
        >
          + Add Worker
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Worker</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Skills</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Assignments</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {workers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-slate-400">
                    No workers yet.{' '}
                    <Link href="/admin/workers/new" className="text-[#0055e5] hover:underline">
                      Add one →
                    </Link>
                  </td>
                </tr>
              ) : (
                workers.map((w) => {
                  let skills: string[] = []
                  try { skills = JSON.parse(w.skills) } catch { skills = [] }

                  return (
                    <tr key={w.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3">
                        <Link href={`/admin/workers/${w.id}`} className="hover:text-[#0055e5]">
                          <p className="font-medium text-slate-900">{w.name}</p>
                          <p className="text-xs text-slate-500">{w.email}</p>
                          {w.phone && <p className="text-xs text-slate-400">{w.phone}</p>}
                        </Link>
                      </td>
                      <td className="px-5 py-3 hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {skills.slice(0, 4).map((s) => (
                            <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                              {s}
                            </span>
                          ))}
                          {skills.length > 4 && (
                            <span className="text-xs text-slate-400">+{skills.length - 4}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3 text-slate-600">{w._count?.assignments ?? 0}</td>
                      <td className="px-5 py-3">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          w.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {w.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
