import { prisma } from '@/lib/db'
import { Users } from 'lucide-react'

export default async function AdminClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { quoteRequests: true, projects: true } },
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#090D1A] flex items-center gap-2">
          <Users className="w-6 h-6" />
          Clients
        </h1>
        <p className="text-slate-500 text-sm mt-1">{clients.length} client{clients.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Client</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Company</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Requests</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Projects</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide hidden lg:table-cell">Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center text-slate-400">
                    No clients yet. They are created automatically when a quote request is approved.
                  </td>
                </tr>
              ) : (
                clients.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3">
                      <p className="font-medium text-slate-900">{c.name}</p>
                      <p className="text-xs text-slate-500">{c.email}</p>
                    </td>
                    <td className="px-5 py-3 hidden lg:table-cell text-slate-600">{c.company ?? '—'}</td>
                    <td className="px-5 py-3 text-slate-600">{c._count?.quoteRequests ?? 0}</td>
                    <td className="px-5 py-3 text-slate-600">{c._count?.projects ?? 0}</td>
                    <td className="px-5 py-3 hidden lg:table-cell text-xs text-slate-400">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
