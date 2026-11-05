import { prisma } from '@/lib/db'
import { formatCurrency } from '@/lib/utils'
import { DollarSign } from 'lucide-react'

export default async function AdminFinancesPage() {
  const [
    totalInvoiced,
    totalReceived,
    totalWorkerPaid,
    totalExpenses,
    recentRecords,
    projectSummaries,
  ] = await Promise.all([
    prisma.financialRecord.aggregate({ where: { type: 'INVOICE' }, _sum: { amount: true } }),
    prisma.financialRecord.aggregate({ where: { type: 'PAYMENT' }, _sum: { amount: true } }),
    prisma.financialRecord.aggregate({ where: { type: 'WORKER_PAYMENT' }, _sum: { amount: true } }),
    prisma.financialRecord.aggregate({ where: { type: 'EXPENSE' }, _sum: { amount: true } }),
    prisma.financialRecord.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
      include: { project: { select: { id: true, title: true } } },
    }),
    prisma.project.findMany({
      where: { status: { in: ['ACTIVE', 'COMPLETED'] } },
      select: {
        id: true,
        title: true,
        totalValue: true,
        currency: true,
        companyPct: true,
        workerPct: true,
        status: true,
        _count: { select: { financials: true } },
      },
      orderBy: { createdAt: 'desc' },
    }),
  ])

  const received = Number(totalReceived._sum.amount ?? 0)
  const invoiced = Number(totalInvoiced._sum.amount ?? 0)
  const workerPaid = Number(totalWorkerPaid._sum.amount ?? 0)
  const expenses = Number(totalExpenses._sum.amount ?? 0)
  const outstanding = invoiced - received

  const stats = [
    { label: 'Total Invoiced', value: formatCurrency(invoiced), color: 'text-blue-600' },
    { label: 'Payments Received', value: formatCurrency(received), color: 'text-green-600' },
    { label: 'Outstanding', value: formatCurrency(outstanding), color: outstanding > 0 ? 'text-orange-600' : 'text-slate-600' },
    { label: 'Worker Payments', value: formatCurrency(workerPaid), color: 'text-purple-600' },
    { label: 'Expenses', value: formatCurrency(expenses), color: 'text-red-600' },
    { label: 'Net (Received − Worker − Expenses)', value: formatCurrency(received - workerPaid - expenses), color: 'text-emerald-600' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#090D1A] flex items-center gap-2">
          <DollarSign className="w-6 h-6" />
          Finances
        </h1>
        <p className="text-slate-500 text-sm mt-1">Financial overview across all projects.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Project financial summary */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-sm text-[#090D1A]">Project Allocations</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-50 bg-slate-50">
                  <th className="text-left px-5 py-2.5 text-xs font-semibold text-slate-500">Project</th>
                  <th className="text-left px-5 py-2.5 text-xs font-semibold text-slate-500">Value</th>
                  <th className="text-left px-5 py-2.5 text-xs font-semibold text-slate-500">Company</th>
                  <th className="text-left px-5 py-2.5 text-xs font-semibold text-slate-500">Worker</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {projectSummaries.length === 0 ? (
                  <tr><td colSpan={4} className="px-5 py-8 text-center text-slate-400 text-xs">No projects yet.</td></tr>
                ) : (
                  projectSummaries.map((p) => {
                    const value = Number(p.totalValue)
                    const companyAmt = (value * p.companyPct) / 100
                    const workerAmt = (value * p.workerPct) / 100
                    return (
                      <tr key={p.id}>
                        <td className="px-5 py-2.5">
                          <a href={`/admin/projects/${p.id}`} className="text-xs font-medium text-slate-800 hover:text-[#0055e5] truncate max-w-[120px] block">
                            {p.title}
                          </a>
                        </td>
                        <td className="px-5 py-2.5 text-xs text-slate-700 font-medium">{formatCurrency(value, p.currency)}</td>
                        <td className="px-5 py-2.5 text-xs text-green-700">{formatCurrency(companyAmt, p.currency)}</td>
                        <td className="px-5 py-2.5 text-xs text-purple-700">{formatCurrency(workerAmt, p.currency)}</td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent transactions */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-5 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-sm text-[#090D1A]">Recent Transactions</h2>
          </div>
          <div className="divide-y divide-slate-50">
            {recentRecords.length === 0 ? (
              <p className="px-5 py-8 text-sm text-slate-400 text-center">No financial records yet.</p>
            ) : (
              recentRecords.map((r) => (
                <div key={r.id} className="px-5 py-3 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-700">{r.type.replace('_', ' ')}</p>
                    <p className="text-xs text-slate-400 truncate">{r.project?.title ?? 'Unknown project'}</p>
                    {r.description && (
                      <p className="text-xs text-slate-500">{r.description}</p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-sm font-bold ${
                      r.type === 'PAYMENT' ? 'text-green-600' :
                      r.type === 'INVOICE' ? 'text-blue-600' :
                      r.type === 'WORKER_PAYMENT' ? 'text-purple-600' :
                      r.type === 'EXPENSE' ? 'text-red-600' : 'text-slate-700'
                    }`}>
                      {r.type === 'PAYMENT' || r.type === 'INVOICE' ? '' : '−'}
                      {formatCurrency(Number(r.amount), r.currency)}
                    </p>
                    <p className="text-xs text-slate-400">{new Date(r.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
