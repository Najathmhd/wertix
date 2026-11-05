import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import {
  quoteStatusColor,
  QUOTE_STATUS_LABELS,
  formatCurrency,
} from '@/lib/utils'
import { ArrowLeft, Mail, Building, Clock, Tag } from 'lucide-react'
import QuoteRequestActions from './QuoteRequestActions'

export default async function AdminRequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const request = await prisma.quoteRequest.findUnique({
    where: { id },
    include: {
      quotations: {
        orderBy: { version: 'desc' },
      },
      project: {
        select: { id: true, title: true, status: true },
      },
    },
  })

  if (!request) notFound()

  let services: string[] = []
  try {
    services = JSON.parse(request.services)
  } catch {
    services = [request.services]
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back nav */}
      <Link
        href="/admin/requests"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to requests
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {request.refNumber}
            </span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${quoteStatusColor(request.status)}`}>
              {QUOTE_STATUS_LABELS[request.status] ?? request.status}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#090D1A]">{request.name}</h1>
          <p className="text-slate-500 text-sm mt-0.5">{request.email}</p>
        </div>
        <p className="text-xs text-slate-400">
          Submitted {new Date(request.createdAt).toLocaleString()}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Contact info */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
            <h2 className="text-sm font-semibold text-[#090D1A]">Contact Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoRow icon={Mail} label="Email" value={request.email} />
              {request.company && (
                <InfoRow icon={Building} label="Company" value={request.company} />
              )}
              {request.phone && (
                <InfoRow icon={Clock} label="Phone" value={request.phone} />
              )}
            </div>
          </div>

          {/* Project details */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-[#090D1A]">Project Details</h2>

            <div className="space-y-2">
              <InfoRow icon={Tag} label="Services" value={services.join(', ')} />
              <InfoRow icon={Clock} label="Stage" value={request.stage} />
              <InfoRow icon={Clock} label="Timeline" value={request.timeline} />
              <InfoRow icon={Clock} label="Budget" value={request.budget} />
            </div>

            {request.description && (
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Description
                </p>
                <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 whitespace-pre-wrap">
                  {request.description}
                </p>
              </div>
            )}
          </div>

          {/* Quotations history */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-[#090D1A]">
              Quotations ({(request.quotations ?? []).length})
            </h2>
            {(request.quotations ?? []).length === 0 ? (
              <p className="text-sm text-slate-400">No quotations created yet.</p>
            ) : (
              <div className="space-y-2">
                {(request.quotations ?? []).map((q) => (
                  <div
                    key={q.id}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        Version {q.version} — {formatCurrency(Number(q.totalAmount), q.currency)}
                      </p>
                      <p className="text-xs text-slate-500">
                        {q.status} · Created {new Date(q.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      q.status === 'APPROVED'
                        ? 'bg-green-100 text-green-800'
                        : q.status === 'SENT'
                        ? 'bg-blue-100 text-blue-800'
                        : q.status === 'SUPERSEDED'
                        ? 'bg-slate-100 text-slate-500'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {q.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Linked project */}
          {request.project && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-[#090D1A] mb-2">Linked Project</h2>
              <a
                href={`/admin/projects/${request.project.id}`}
                className="text-sm text-[#0055e5] font-medium hover:underline"
              >
                {request.project.title} →
              </a>
              <p className="text-xs text-slate-500 mt-0.5">{request.project.status}</p>
            </div>
          )}
        </div>

        {/* Sidebar: actions */}
        <div className="space-y-5">
          <QuoteRequestActions request={request} />
        </div>
      </div>
    </div>
  )
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
      <div>
        <p className="text-xs text-slate-400 font-medium">{label}</p>
        <p className="text-sm text-slate-800">{value}</p>
      </div>
    </div>
  )
}
