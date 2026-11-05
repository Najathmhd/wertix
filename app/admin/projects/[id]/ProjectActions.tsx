'use client'

import { useActionState, useState } from 'react'
import {
  updateProjectStatusAction,
  assignWorkerAction,
  addMilestoneAction,
  addFinancialRecordAction,
  addQualityReviewAction,
  type ProjectActionState,
} from '@/app/actions/projects'
import { ChevronDown } from 'lucide-react'

const PROJECT_STATUSES = ['ACTIVE', 'ON_HOLD', 'IN_REVIEW', 'COMPLETED', 'CANCELLED']

type Worker = { id: string; name: string }
type Project = { id: string; status: string; companyPct: number; workerPct: number }

type Tab = 'status' | 'worker' | 'milestone' | 'financial' | 'review'

export default function ProjectActions({
  project,
  workers,
}: {
  project: Project
  workers: Worker[]
}) {
  const [tab, setTab] = useState<Tab>('status')
  const [statusUpdating, setStatusUpdating] = useState(false)
  const [statusSaved, setStatusSaved] = useState(false)

  const [workerState, workerAction, workerPending] = useActionState<ProjectActionState, FormData>(assignWorkerAction, undefined)
  const [milestoneState, milestoneAction, milestonePending] = useActionState<ProjectActionState, FormData>(addMilestoneAction, undefined)
  const [financialState, financialAction, financialPending] = useActionState<ProjectActionState, FormData>(addFinancialRecordAction, undefined)
  const [reviewState, reviewAction, reviewPending] = useActionState<ProjectActionState, FormData>(addQualityReviewAction, undefined)

  const handleStatusChange = async (newStatus: string) => {
    setStatusUpdating(true)
    await updateProjectStatusAction(project.id, newStatus)
    setStatusUpdating(false)
    setStatusSaved(true)
    setTimeout(() => setStatusSaved(false), 2000)
  }

  const TABS: { key: Tab; label: string }[] = [
    { key: 'status', label: 'Status' },
    { key: 'worker', label: 'Workers' },
    { key: 'milestone', label: 'Milestone' },
    { key: 'financial', label: 'Finance' },
    { key: 'review', label: 'Review' },
  ]

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
      <h2 className="text-sm font-semibold text-[#090D1A]">Actions</h2>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors ${
              tab === t.key
                ? 'bg-[#090D1A] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Status tab */}
      {tab === 'status' && (
        <div className="space-y-3">
          <p className="text-xs text-slate-500">Update the project status.</p>
          <div className="relative">
            <select
              defaultValue={project.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={statusUpdating}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#0055e5] disabled:opacity-60"
            >
              {PROJECT_STATUSES.map((s) => (
                <option key={s} value={s}>{s.replace('_', ' ')}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          {statusSaved && <p className="text-xs text-green-600">✓ Status updated.</p>}
        </div>
      )}

      {/* Assign worker tab */}
      {tab === 'worker' && (
        <form action={workerAction} className="space-y-3">
          <input type="hidden" name="projectId" value={project.id} />
          {workerState?.success && <p className="text-xs text-green-600">✓ Worker assigned.</p>}
          {workerState?.errors && <p className="text-xs text-red-600">Please fill all required fields.</p>}

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Worker *</label>
            <select name="workerId" required className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]">
              <option value="">Select a worker</option>
              {workers.map((w) => (
                <option key={w.id} value={w.id}>{w.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Role *</label>
            <input type="text" name="role" required placeholder="e.g. Lead Developer" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Worker % (default {project.workerPct})</label>
            <input type="number" name="workerPct" defaultValue={project.workerPct} min="0" max="100" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]" />
          </div>

          <button type="submit" disabled={workerPending} className="w-full py-2 rounded-lg bg-[#0055e5] text-white text-xs font-semibold hover:bg-[#0047c5] disabled:opacity-60 transition-colors">
            {workerPending ? 'Assigning…' : 'Assign Worker'}
          </button>
        </form>
      )}

      {/* Milestone tab */}
      {tab === 'milestone' && (
        <form action={milestoneAction} className="space-y-3">
          <input type="hidden" name="projectId" value={project.id} />
          {milestoneState?.success && <p className="text-xs text-green-600">✓ Milestone added.</p>}

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Title *</label>
            <input type="text" name="title" required placeholder="e.g. Design Approval" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Description</label>
            <textarea name="description" rows={2} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0055e5]" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Due Date</label>
            <input type="date" name="dueDate" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]" />
          </div>

          <button type="submit" disabled={milestonePending} className="w-full py-2 rounded-lg bg-[#0055e5] text-white text-xs font-semibold hover:bg-[#0047c5] disabled:opacity-60 transition-colors">
            {milestonePending ? 'Adding…' : 'Add Milestone'}
          </button>
        </form>
      )}

      {/* Financial tab */}
      {tab === 'financial' && (
        <form action={financialAction} className="space-y-3">
          <input type="hidden" name="projectId" value={project.id} />
          {financialState?.success && <p className="text-xs text-green-600">✓ Record added.</p>}

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Type *</label>
            <select name="type" required className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]">
              <option value="INVOICE">Invoice</option>
              <option value="PAYMENT">Payment Received</option>
              <option value="WORKER_PAYMENT">Worker Payment</option>
              <option value="EXPENSE">Expense</option>
              <option value="REFUND">Refund</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Amount *</label>
            <input type="number" name="amount" step="0.01" min="0" required placeholder="0.00" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Description</label>
            <input type="text" name="description" placeholder="e.g. Invoice #001" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Reference / Invoice #</label>
            <input type="text" name="referenceId" placeholder="INV-001" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Date Paid</label>
            <input type="date" name="paidAt" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]" />
          </div>

          <p className="text-xs text-slate-400">
            The {project.companyPct}/{project.workerPct}% allocation will be automatically calculated and stored with this record.
          </p>

          <button type="submit" disabled={financialPending} className="w-full py-2 rounded-lg bg-[#0055e5] text-white text-xs font-semibold hover:bg-[#0047c5] disabled:opacity-60 transition-colors">
            {financialPending ? 'Saving…' : 'Add Record'}
          </button>
        </form>
      )}

      {/* Review tab */}
      {tab === 'review' && (
        <form action={reviewAction} className="space-y-3">
          <input type="hidden" name="projectId" value={project.id} />
          {reviewState?.success && <p className="text-xs text-green-600">✓ Review added.</p>}

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Review Title *</label>
            <input type="text" name="title" required placeholder="e.g. Final QA Review" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Status *</label>
            <select name="status" required className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]">
              <option value="PENDING">Pending</option>
              <option value="PASSED">Passed</option>
              <option value="FAILED">Failed</option>
              <option value="REVISION_REQUIRED">Revision Required</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Feedback</label>
            <textarea name="feedback" rows={3} placeholder="Review notes and feedback…" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0055e5]" />
          </div>

          <button type="submit" disabled={reviewPending} className="w-full py-2 rounded-lg bg-[#0055e5] text-white text-xs font-semibold hover:bg-[#0047c5] disabled:opacity-60 transition-colors">
            {reviewPending ? 'Saving…' : 'Save Review'}
          </button>
        </form>
      )}
    </div>
  )
}
