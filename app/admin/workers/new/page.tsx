'use client'

import { useActionState, useState } from 'react'
import Link from 'next/link'
import { createWorkerAction, type WorkerActionState } from '@/app/actions/workers'
import { ArrowLeft } from 'lucide-react'

export default function NewWorkerPage() {
  const [state, action, pending] = useActionState<WorkerActionState, FormData>(
    createWorkerAction,
    undefined
  )
  const [skillsDisplay, setSkillsDisplay] = useState('')
  const [skillsJson, setSkillsJson] = useState('[]')

  return (
    <div className="space-y-6 max-w-2xl">
      <Link href="/admin/workers" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" />
        Back to workers
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-[#090D1A]">Add Worker</h1>
        <p className="text-slate-500 text-sm mt-1">Register a new worker in the WERTIX pool.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <form action={action} className="space-y-5">
          {state?.errors && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              Please check the highlighted fields.
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="worker-name">
                Full Name *
              </label>
              <input
                id="worker-name"
                name="name"
                type="text"
                required
                placeholder="e.g. Amali Fernando"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]"
              />
              {state?.errors?.name && <p className="mt-1 text-xs text-red-600">{state.errors.name[0]}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="worker-email">
                Email Address *
              </label>
              <input
                id="worker-email"
                name="email"
                type="email"
                required
                placeholder="worker@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]"
              />
              {state?.errors?.email && <p className="mt-1 text-xs text-red-600">{state.errors.email[0]}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="worker-phone">
              Phone Number
            </label>
            <input
              id="worker-phone"
              name="phone"
              type="tel"
              placeholder="+94 77 000 0000"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="worker-portfolio">
              Portfolio URL
            </label>
            <input
              id="worker-portfolio"
              name="portfolio"
              type="url"
              placeholder="https://portfolio.example.com"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]"
            />
            {state?.errors?.portfolio && <p className="mt-1 text-xs text-red-600">{state.errors.portfolio[0]}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="worker-skills-display">
              Skills (comma-separated)
            </label>
            {/* Hidden input carries the JSON value that gets submitted */}
            <input type="hidden" name="skills" value={skillsJson} />
            <input
              id="worker-skills-display"
              type="text"
              value={skillsDisplay}
              placeholder="e.g. React, Node.js, Figma, SQL"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]"
              onChange={(e) => {
                setSkillsDisplay(e.target.value)
                const skills = e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                setSkillsJson(JSON.stringify(skills))
              }}
            />
            <p className="mt-1 text-xs text-slate-400">Enter skills separated by commas.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="worker-notes">
              Notes
            </label>
            <textarea
              id="worker-notes"
              name="notes"
              rows={3}
              placeholder="Availability, working hours, special notes…"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0055e5]"
            />
          </div>

          {state?.success && (
            <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-sm text-green-700">
              ✓ Worker added successfully.{' '}
              <Link href="/admin/workers" className="font-semibold underline">
                View all workers
              </Link>
            </div>
          )}

          <div className="flex gap-3 pt-2 border-t border-slate-100">
            <Link href="/admin/workers" className="px-5 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={pending}
              className="px-6 py-2.5 rounded-lg bg-[#090D1A] text-white text-sm font-semibold hover:bg-[#0055e5] disabled:opacity-60 transition-colors"
            >
              {pending ? 'Adding…' : 'Add Worker'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
