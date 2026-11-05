import { prisma } from '@/lib/db'
import { getSession } from '@/lib/session'
import { formatCurrency, quoteStatusColor, projectStatusColor } from '@/lib/utils'
import Link from 'next/link'
import {
  FileText,
  Briefcase,
  Users,
  DollarSign,
  Clock,
  AlertTriangle,
  TrendingUp,
} from 'lucide-react'

async function getDashboardStats() {
  const [
    totalRequests,
    newRequests,
    totalProjects,
    activeProjects,
    totalWorkers,
    recentRequests,
    recentProjects,
    financialSummary,
  ] = await Promise.all([
    prisma.quoteRequest.count(),
    prisma.quoteRequest.count({ where: { status: 'NEW' } }),
    prisma.project.count(),
    prisma.project.count({ where: { status: 'ACTIVE' } }),
    prisma.worker.count({ where: { isActive: true } }),
    prisma.quoteRequest.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        refNumber: true,
        name: true,
        email: true,
        services: true,
        status: true,
        createdAt: true,
      },
    }),
    prisma.project.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        status: true,
        totalValue: true,
        currency: true,
        createdAt: true,
      },
    }),
    prisma.financialRecord.aggregate({
      where: { type: 'PAYMENT' },
      _sum: { amount: true },
    }),
  ])

  return {
    totalRequests,
    newRequests,
    totalProjects,
    activeProjects,
    totalWorkers,
    recentRequests,
    recentProjects,
    totalRevenue: Number(financialSummary._sum.amount ?? 0),
  }
}

function StatCard({
  label,
  value,
  icon: Icon,
  sub,
  color = 'blue',
}: {
  label: string
  value: string | number
  icon: React.ElementType
  sub?: string
  color?: 'blue' | 'green' | 'orange' | 'purple'
}) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-emerald-50 text-emerald-600',
    orange: 'bg-orange-50 text-orange-600',
    purple: 'bg-purple-50 text-purple-600',
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex items-start gap-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${colors[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-[#090D1A]">{value}</p>
        <p className="text-sm text-slate-500 mt-0.5">{label}</p>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

export default async function AdminDashboardPage() {
  const session = await getSession()
  const stats = await getDashboardStats()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#090D1A]">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">
          Welcome back, {session?.name}. Here&#39;s what&#39;s happening at WERTIX.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          label="Quote Requests"
          value={stats.totalRequests}
          icon={FileText}
          sub={`${stats.newRequests} new`}
          color="blue"
        />
        <StatCard
          label="Active Projects"
          value={stats.activeProjects}
          icon={Briefcase}
          sub={`${stats.totalProjects} total`}
          color="green"
        />
        <StatCard
          label="Active Workers"
          value={stats.totalWorkers}
          icon={Users}
          color="purple"
        />
        <StatCard
          label="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
          sub="Payments received"
          color="orange"
        />
      </div>

      {/* Quick actions */}
      {stats.newRequests > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 shrink-0" />
          <p className="text-sm text-slate-700">
            <strong>{stats.newRequests} new quote request{stats.newRequests !== 1 ? 's' : ''}</strong>{' '}
            waiting for review.{' '}
            <Link href="/admin/requests?status=NEW" className="text-[#0055e5] font-semibold hover:underline">
              Review now →
            </Link>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent requests */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-[#090D1A] text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              Recent Quote Requests
            </h2>
            <Link href="/admin/requests" className="text-xs text-[#0055e5] hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {stats.recentRequests.length === 0 ? (
              <p className="px-5 py-8 text-sm text-slate-400 text-center">No quote requests yet.</p>
            ) : (
              stats.recentRequests.map((req) => (
                <Link
                  key={req.id}
                  href={`/admin/requests/${req.id}`}
                  className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors group"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900 group-hover:text-[#0055e5]">
                      {req.name}
                    </p>
                    <p className="text-xs text-slate-500">{req.refNumber} · {req.email}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${quoteStatusColor(req.status)}`}>
                    {req.status}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Recent projects */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-[#090D1A] text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-slate-400" />
              Recent Projects
            </h2>
            <Link href="/admin/projects" className="text-xs text-[#0055e5] hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {stats.recentProjects.length === 0 ? (
              <p className="px-5 py-8 text-sm text-slate-400 text-center">No projects yet.</p>
            ) : (
              stats.recentProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/admin/projects/${project.id}`}
                  className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition-colors group"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900 group-hover:text-[#0055e5]">
                      {project.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatCurrency(Number(project.totalValue), project.currency)}
                    </p>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${projectStatusColor(project.status)}`}>
                    {project.status.replace('_', ' ')}
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick nav links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { href: '/admin/requests', label: 'Quote Requests', icon: FileText },
          { href: '/admin/projects', label: 'Projects', icon: Briefcase },
          { href: '/admin/workers', label: 'Workers', icon: Users },
          { href: '/admin/finances', label: 'Finances', icon: DollarSign },
        ].map(({ href, label, icon: Icon }) => (
          <a
            key={href}
            href={href}
            className="flex items-center gap-2.5 p-4 bg-white rounded-xl border border-slate-200 hover:border-[#0055e5] hover:bg-blue-50/40 transition-all group"
          >
            <Icon className="w-4 h-4 text-slate-400 group-hover:text-[#0055e5]" />
            <span className="text-sm font-medium text-slate-700 group-hover:text-[#0055e5]">
              {label}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
