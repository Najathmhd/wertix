'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Briefcase, Mail, Phone, Globe, ToggleLeft, ToggleRight } from 'lucide-react'
import { updateWorkerAction, toggleWorkerActiveAction, type WorkerActionState } from '@/app/actions/workers'

interface Assignment {
  id: string
  role: string
  workerPct: number
  startedAt: Date | null
  completedAt: Date | null
  project: { id: string; title: string; status: string }
}

interface Worker {
  id: string
  name: string
  email: string
  phone: string | null
  skills: string
  portfolio: string | null
  notes: string | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  assignments: Assignment[]
}

interface Props {
  worker: Worker
  skills: string[]
}

const STATUS_LABEL: Record<string, string> = {
  ACTIVE: 'Active',
  ON_HOLD: 'On Hold',
  IN_REVIEW: 'In Review',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
}

const STATUS_COLOUR: Record<string, string> = {
  ACTIVE: 'bg-blue-100 text-blue-800',
  ON_HOLD: 'bg-yellow-100 text-yellow-800',
  IN_REVIEW: 'bg-purple-100 text-purple-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-slate-100 text-slate-500',
}

export default function WorkerDetailClient({ worker, skills }: Props) {
  // ── Edit-form state ──────────────────────────────────────────────────────────
  const updateWithId = updateWorkerAction.bind(null, worker.id)
  const [editState, editAction, editPending] = useActionState<WorkerActionState, FormData>(
    updateWithId,
    undefined
  )

  const [skillsDisplay, setSkillsDisplay] = useState(skills.join(', '))
  const [skillsJson, setSkillsJson] = useState(JSON.stringify(skills))
  const [isActive, setIsActive] = useState(worker.isActive)
  const [togglePending, setTogglePending] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  async function handleToggleActive() {
    setTogglePending(true)
    try {
      await toggleWorkerActiveAction(worker.id, !isActive)
      setIsActive((v) => !v)
    } finally {
      setTogglePending(false)
    }
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Back link */}
      <Link
        href="/admin/workers"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to workers
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#090D1A]">{worker.name}</h1>
          <p className="text-slate-500 text-sm mt-0.5">{worker.email}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleToggleActive}
            disabled={togglePending}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors disabled:opacity-60 ${
              isActive
                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
            {isActive ? 'Active' : 'Inactive'}
          </button>
          <button
            onClick={() => setShowEdit((v) => !v)}
            className="px-4 py-2 rounded-lg bg-[#090D1A] text-white text-sm font-semibold hover:bg-[#0055e5] transition-colors"
          >
            {showEdit ? 'Cancel Edit' : 'Edit Worker'}
          </button>
        </div>
      </div>

      {/* Detail card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <Mail className="w-4 h-4 text-slate-400 shrink-0" />
            {worker.email}
          </div>
          {worker.phone && (
            <div className="flex items-center gap-2 text-slate-600">
              <Phone className="w-4 h-4 text-slate-400 shrink-0" />
              {worker.phone}
            </div>
          )}
          {worker.portfolio && (
            <div className="flex items-center gap-2 text-slate-600 col-span-full">
              <Globe className="w-4 h-4 text-slate-400 shrink-0" />
              <a
                href={worker.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0055e5] hover:underline truncate"
              >
                {worker.portfolio}
              </a>
            </div>
          )}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Skills</p>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s) => (
                <span key={s} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        {worker.notes && (
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Notes</p>
            <p className="text-sm text-slate-700 whitespace-pre-line">{worker.notes}</p>
          </div>
        )}
      </div>

      {/* Edit form */}
      {showEdit && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-base font-bold text-[#090D1A] mb-4">Edit Worker</h2>
          <form action={editAction} className="space-y-5">
            {editState?.errors && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                Please check the highlighted fields.
              </div>
            )}
            {editState?.success && (
              <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-sm text-green-700">
                ✓ Worker updated successfully.
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="edit-name">
                  Full Name *
                </label>
                <input
                  id="edit-name"
                  name="name"
                  type="text"
                  required
                  defaultValue={worker.name}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]"
                />
                {editState?.errors?.name && (
                  <p className="mt-1 text-xs text-red-600">{editState.errors.name[0]}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="edit-email">
                  Email Address *
                </label>
                <input
                  id="edit-email"
                  name="email"
                  type="email"
                  required
                  defaultValue={worker.email}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]"
                />
                {editState?.errors?.email && (
                  <p className="mt-1 text-xs text-red-600">{editState.errors.email[0]}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="edit-phone">
                Phone Number
              </label>
              <input
                id="edit-phone"
                name="phone"
                type="tel"
                defaultValue={worker.phone ?? ''}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="edit-portfolio">
                Portfolio URL
              </label>
              <input
                id="edit-portfolio"
                name="portfolio"
                type="url"
                defaultValue={worker.portfolio ?? ''}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]"
              />
              {editState?.errors?.portfolio && (
                <p className="mt-1 text-xs text-red-600">{editState.errors.portfolio[0]}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="edit-skills-display">
                Skills (comma-separated)
              </label>
              {/* Hidden input carries the JSON that gets submitted */}
              <input type="hidden" name="skills" value={skillsJson} />
              <input
                id="edit-skills-display"
                type="text"
                value={skillsDisplay}
                placeholder="e.g. React, Node.js, Figma, SQL"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]"
                onChange={(e) => {
                  setSkillsDisplay(e.target.value)
                  const parsed = e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                  setSkillsJson(JSON.stringify(parsed))
                }}
              />
              <p className="mt-1 text-xs text-slate-400">Enter skills separated by commas.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="edit-notes">
                Notes
              </label>
              <textarea
                id="edit-notes"
                name="notes"
                rows={3}
                defaultValue={worker.notes ?? ''}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0055e5]"
              />
            </div>

            <div className="flex gap-3 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowEdit(false)}
                className="px-5 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={editPending}
                className="px-6 py-2.5 rounded-lg bg-[#090D1A] text-white text-sm font-semibold hover:bg-[#0055e5] disabled:opacity-60 transition-colors"
              >
                {editPending ? 'Saving…' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Assignments */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-slate-400" />
          <h2 className="text-sm font-bold text-slate-800">Project Assignments</h2>
          <span className="ml-auto text-xs text-slate-400">{worker.assignments.length} total</span>
        </div>
        {worker.assignments.length === 0 ? (
          <p className="px-6 py-8 text-sm text-center text-slate-400">No assignments yet.</p>
        ) : (
          <div className="divide-y divide-slate-100">
            {worker.assignments.map((a) => (
              <div key={a.id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="flex-1">
                  <Link
                    href={`/admin/projects/${a.project.id}`}
                    className="text-sm font-medium text-slate-900 hover:text-[#0055e5]"
                  >
                    {a.project.title}
                  </Link>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {a.role} · {a.workerPct}% share
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    STATUS_COLOUR[a.project.status] ?? 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {STATUS_LABEL[a.project.status] ?? a.project.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

