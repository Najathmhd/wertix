'use client'

import { useActionState, useState } from 'react'
import {
  updateQuoteStatusAction,
  createQuotationAction,
  type QuotationActionState,
} from '@/app/actions/quotes'
import { ChevronDown, Plus } from 'lucide-react'

const STATUS_OPTIONS = [
  'NEW',
  'REVIEWING',
  'QUOTED',
  'APPROVED',
  'REJECTED',
  'ARCHIVED',
]

type MinimalRequest = {
  id: string
  status: string
  notes: string | null
}

export default function QuoteRequestActions({ request }: { request: MinimalRequest }) {
  const [showQuotationForm, setShowQuotationForm] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(request.status)
  const [notes, setNotes] = useState(request.notes ?? '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const [quotationState, quotationAction, quotationPending] = useActionState<
    QuotationActionState,
    FormData
  >(createQuotationAction, undefined)

  const handleStatusSave = async () => {
    setSaving(true)
    await updateQuoteStatusAction(request.id, selectedStatus, notes)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-4">
      {/* Status update */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-[#090D1A]">Status & Notes</h2>

        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">
            Status
          </label>
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#0055e5]"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1.5">
            Internal Notes
          </label>
          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Internal notes visible only to admins…"
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0055e5]"
          />
        </div>

        <button
          onClick={handleStatusSave}
          disabled={saving}
          className="w-full py-2 rounded-lg bg-[#090D1A] text-white text-sm font-semibold hover:bg-[#0055e5] disabled:opacity-60 transition-colors"
        >
          {saved ? '✓ Saved' : saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>

      {/* Create quotation */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#090D1A]">Create Quotation</h2>
          <button
            onClick={() => setShowQuotationForm(!showQuotationForm)}
            className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {showQuotationForm && (
          <form action={quotationAction} className="space-y-3">
            <input type="hidden" name="quoteRequestId" value={request.id} />

            {quotationState?.errors && (
              <div className="text-xs text-red-600 bg-red-50 p-2 rounded-lg">
                Please check the form fields.
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">
                Total Amount (USD)
              </label>
              <input
                type="number"
                name="totalAmount"
                step="0.01"
                min="0"
                required
                placeholder="5000.00"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">
                Valid Until
              </label>
              <input
                type="date"
                name="validUntil"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">
                Notes
              </label>
              <textarea
                name="notes"
                rows={3}
                placeholder="Scope summary, assumptions…"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0055e5]"
              />
            </div>

            {/* Line items as JSON (simplified for this version) */}
            <input type="hidden" name="lineItems" value="[]" />

            {quotationState?.success && (
              <p className="text-xs text-green-600 font-medium">✓ Quotation created successfully.</p>
            )}

            <button
              type="submit"
              disabled={quotationPending}
              className="w-full py-2 rounded-lg bg-[#0055e5] text-white text-sm font-semibold hover:bg-[#0047c5] disabled:opacity-60 transition-colors"
            >
              {quotationPending ? 'Creating…' : 'Create Quotation'}
            </button>
          </form>
        )}

        {/* Convert to project */}
        <a
          href={`/admin/projects/new?quoteRequestId=${request.id}`}
          className="w-full py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors text-center block"
        >
          Convert to Project
        </a>
      </div>
    </div>
  )
}
