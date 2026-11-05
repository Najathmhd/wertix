import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import {
  projectStatusColor,
  PROJECT_STATUS_LABELS,
  reviewStatusColor,
  REVIEW_STATUS_LABELS,
  formatCurrency,
} from '@/lib/utils'
import { ArrowLeft, Users, CheckCircle, DollarSign, Flag } from 'lucide-react'
import ProjectActions from './ProjectActions'

export default async function AdminProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      client: true,
      milestones: { orderBy: { createdAt: 'asc' } },
      assignments: {
        include: { worker: { select: { id: true, name: true, email: true } } },
        orderBy: { createdAt: 'desc' },
      },
      reviews: { orderBy: { createdAt: 'desc' } },
      financials: { orderBy: { createdAt: 'desc' } },
    },
  })

  if (!project) notFound()

  const financials = project.financials ?? []
  const milestones = project.milestones ?? []
  const assignments = project.assignments ?? []
  const reviews = project.reviews ?? []

  // Financial summary
  const totalInvoiced = financials
    .filter((f) => f.type === 'INVOICE')
    .reduce((s, f) => s + Number(f.amount), 0)
  const totalReceived = financials
    .filter((f) => f.type === 'PAYMENT')
    .reduce((s, f) => s + Number(f.amount), 0)
  const totalWorkerPaid = financials
    .filter((f) => f.type === 'WORKER_PAYMENT')
    .reduce((s, f) => s + Number(f.amount), 0)

  const companyAllocation = (Number(project.totalValue) * project.companyPct) / 100
  const workerAllocation = (Number(project.totalValue) * project.workerPct) / 100

  // Available workers for assignment
  const allWorkers = await prisma.worker.findMany({
    where: { isActive: true },
    select: { id: true, name: true },
    orderBy: { name: 'asc' },
  })

  return (
    <div className="space-y-6 max-w-5xl">
      <Link href="/admin/projects" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" />
        Back to projects
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${projectStatusColor(project.status)}`}>
              {PROJECT_STATUS_LABELS[project.status] ?? project.status}
            </span>
            {project.client && (
              <span className="text-xs text-slate-500">{project.client.name}</span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-[#090D1A]">{project.title}</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {formatCurrency(Number(project.totalValue), project.currency)} ·{' '}
            {project.companyPct}% / {project.workerPct}% split
          </p>
        </div>
        <p className="text-xs text-slate-400">
          Created {new Date(project.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Financial overview cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Contract Value', value: formatCurrency(Number(project.totalValue), project.currency), sub: 'Total project value' },
          { label: 'Company Allocation', value: formatCurrency(companyAllocation, project.currency), sub: `${project.companyPct}% share` },
          { label: 'Worker Allocation', value: formatCurrency(workerAllocation, project.currency), sub: `${project.workerPct}% share` },
          { label: 'Revenue Received', value: formatCurrency(totalReceived, project.currency), sub: `${formatCurrency(totalInvoiced)} invoiced` },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-lg font-bold text-[#090D1A]">{card.value}</p>
            <p className="text-xs font-semibold text-slate-700 mt-0.5">{card.label}</p>
            <p className="text-xs text-slate-400">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: project details */}
        <div className="lg:col-span-2 space-y-5">
          {/* Workers */}
          <Section title="Worker Assignments" icon={Users} count={assignments.length}>
            {assignments.length === 0 ? (
              <p className="text-sm text-slate-400">No workers assigned yet.</p>
            ) : (
              <div className="space-y-2">
                {assignments.map((a) => (
                  <div key={a.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{a.worker.name}</p>
                      <p className="text-xs text-slate-500">{a.role} · {a.workerPct}% allocation</p>
                    </div>
                    <p className="text-xs text-slate-400">{a.worker.email}</p>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* Milestones */}
          <Section title="Milestones" icon={Flag} count={milestones.length}>
            {milestones.length === 0 ? (
              <p className="text-sm text-slate-400">No milestones added yet.</p>
            ) : (
              <div className="space-y-2">
                {milestones.map((m) => (
                  <div key={m.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${
                      m.status === 'COMPLETED' ? 'bg-green-500' :
                      m.status === 'IN_PROGRESS' ? 'bg-blue-500' :
                      m.status === 'OVERDUE' ? 'bg-red-500' : 'bg-slate-300'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{m.title}</p>
                      {m.dueDate && (
                        <p className="text-xs text-slate-400">
                          Due {new Date(m.dueDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-slate-500">{m.status}</span>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* Quality reviews */}
          <Section title="Quality Reviews" icon={CheckCircle} count={reviews.length}>
            {reviews.length === 0 ? (
              <p className="text-sm text-slate-400">No reviews yet.</p>
            ) : (
              <div className="space-y-2">
                {reviews.map((r) => (
                  <div key={r.id} className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-slate-900">{r.title}</p>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${reviewStatusColor(r.status)}`}>
                        {REVIEW_STATUS_LABELS[r.status] ?? r.status}
                      </span>
                    </div>
                    {r.feedback && <p className="text-xs text-slate-500">{r.feedback}</p>}
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* Financial records */}
          <Section title="Financial Records" icon={DollarSign} count={financials.length}>
            {financials.length === 0 ? (
              <p className="text-sm text-slate-400">No financial records yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left py-2 text-slate-500 font-semibold">Type</th>
                      <th className="text-left py-2 text-slate-500 font-semibold">Amount</th>
                      <th className="text-left py-2 text-slate-500 font-semibold hidden sm:table-cell">Company Share</th>
                      <th className="text-left py-2 text-slate-500 font-semibold hidden sm:table-cell">Worker Share</th>
                      <th className="text-left py-2 text-slate-500 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {financials.map((f) => (
                      <tr key={f.id}>
                        <td className="py-2 font-medium text-slate-700">{f.type.replace('_', ' ')}</td>
                        <td className="py-2 text-slate-900 font-semibold">{formatCurrency(Number(f.amount), f.currency)}</td>
                        <td className="py-2 text-slate-500 hidden sm:table-cell">
                          {f.companyAmount ? formatCurrency(Number(f.companyAmount), f.currency) : '—'}
                        </td>
                        <td className="py-2 text-slate-500 hidden sm:table-cell">
                          {f.workerAmount ? formatCurrency(Number(f.workerAmount), f.currency) : '—'}
                        </td>
                        <td className="py-2 text-slate-400">{new Date(f.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-2 pt-2 border-t border-slate-100 flex gap-4 text-xs text-slate-600">
                  <span><strong>Total Invoiced:</strong> {formatCurrency(totalInvoiced, project.currency)}</span>
                  <span><strong>Received:</strong> {formatCurrency(totalReceived, project.currency)}</span>
                  <span><strong>Worker Paid:</strong> {formatCurrency(totalWorkerPaid, project.currency)}</span>
                </div>
              </div>
            )}
          </Section>
        </div>

        {/* Right: actions */}
        <div>
          <ProjectActions project={project} workers={allWorkers} />
        </div>
      </div>
    </div>
  )
}

function Section({
  title,
  icon: Icon,
  count,
  children,
}: {
  title: string
  icon: React.ElementType
  count?: number
  children: React.ReactNode
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
      <h2 className="text-sm font-semibold text-[#090D1A] flex items-center gap-2">
        <Icon className="w-4 h-4 text-slate-400" />
        {title}
        {count !== undefined && (
          <span className="ml-auto text-xs text-slate-400">{count}</span>
        )}
      </h2>
      {children}
    </div>
  )
}
