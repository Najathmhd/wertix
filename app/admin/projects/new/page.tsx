'use client'

import { Suspense, useActionState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createProjectAction, type ProjectActionState } from '@/app/actions/projects'
import { ArrowLeft } from 'lucide-react'

function NewProjectForm() {
  const [state, action, pending] = useActionState<ProjectActionState, FormData>(
    createProjectAction,
    undefined
  )
  const searchParams = useSearchParams()
  const quoteRequestId = searchParams.get('quoteRequestId')

  return (
    <div className="space-y-6 max-w-2xl">
      <Link href="/admin/projects" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" />
        Back to projects
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-[#090D1A]">New Project</h1>
        <p className="text-slate-500 text-sm mt-1">Create a new project and configure the financial allocation.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <form action={action} className="space-y-5">
          {quoteRequestId && (
            <input type="hidden" name="quoteRequestId" value={quoteRequestId} />
          )}

          {state?.errors && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              Please check the highlighted fields.
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="proj-title">
              Project Title *
            </label>
            <input
              id="proj-title"
              name="title"
              type="text"
              required
              placeholder="e.g. Acme Corp Website Redesign"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]"
            />
            {state?.errors?.title && <p className="mt-1 text-xs text-red-600">{state.errors.title[0]}</p>}
          </div>

          {/* Total value & currency */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="proj-value">
                Total Project Value *
              </label>
              <input
                id="proj-value"
                name="totalValue"
                type="number"
                step="0.01"
                min="0"
                required
                placeholder="10000.00"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]"
              />
              {state?.errors?.totalValue && <p className="mt-1 text-xs text-red-600">{state.errors.totalValue[0]}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="proj-currency">
                Currency
              </label>
              <select
                id="proj-currency"
                name="currency"
                defaultValue="USD"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]"
              >
                <option>USD</option>
                <option>LKR</option>
                <option>EUR</option>
                <option>GBP</option>
                <option>AUD</option>
              </select>
            </div>
          </div>

          {/* Allocation */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <p className="text-xs font-semibold text-slate-700">Financial Allocation Policy</p>
            <p className="text-xs text-slate-500">
              The default split is 60% company / 40% worker. This is stored at the project level and used to calculate allocation on each financial record.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="proj-company-pct">
                  Company % (default 60)
                </label>
                <input
                  id="proj-company-pct"
                  name="companyPct"
                  type="number"
                  min="0"
                  max="100"
                  defaultValue="60"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="proj-worker-pct">
                  Worker % (default 40)
                </label>
                <input
                  id="proj-worker-pct"
                  name="workerPct"
                  type="number"
                  min="0"
                  max="100"
                  defaultValue="40"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]"
                />
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="proj-start">
                Start Date
              </label>
              <input
                id="proj-start"
                name="startDate"
                type="date"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="proj-end">
                Target End Date
              </label>
              <input
                id="proj-end"
                name="endDate"
                type="date"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="proj-notes">
              Notes
            </label>
            <textarea
              id="proj-notes"
              name="notes"
              rows={3}
              placeholder="Internal project notes…"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0055e5]"
            />
          </div>

          <div className="flex gap-3 pt-2 border-t border-slate-100">
            <Link
              href="/admin/projects"
              className="px-5 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={pending}
              className="px-6 py-2.5 rounded-lg bg-[#090D1A] text-white text-sm font-semibold hover:bg-[#0055e5] disabled:opacity-60 transition-colors"
            >
              {pending ? 'Creating…' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function NewProjectPage() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-400 text-sm">Loading…</div>}>
      <NewProjectForm />
    </Suspense>
  )
}
