'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { FaqItem } from '@/lib/faq-data'

interface FaqAccordionProps {
  items: FaqItem[]
  defaultOpenIndex?: number
  className?: string
}

export default function FaqAccordion({
  items,
  defaultOpenIndex = -1,
  className = '',
}: FaqAccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(() => {
    const initial = new Set<string>()
    if (defaultOpenIndex >= 0 && defaultOpenIndex < items.length) {
      initial.add(items[defaultOpenIndex].id)
    }
    return initial
  })

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id)
        const triggerId = `faq-trigger-${item.id}`
        const panelId = `faq-panel-${item.id}`

        return (
          <div
            key={item.id}
            className={`rounded-xl border transition-all duration-150 ${
              isOpen
                ? 'border-blue-200 bg-white shadow-xs'
                : 'border-slate-200/90 bg-white/70 hover:border-slate-300 hover:bg-white'
            }`}
          >
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="w-full py-4 sm:py-4.5 px-5 sm:px-6 flex items-center justify-between gap-4 text-left font-semibold text-[15px] sm:text-base text-[#090D1A] hover:text-[#0055e5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0055e5] focus-visible:ring-offset-2 rounded-xl transition-colors cursor-pointer"
              >
                <span className="flex-1 pr-2">{item.question}</span>
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 motion-reduce:transition-none ${
                    isOpen
                      ? 'bg-blue-50 text-[#0055e5] rotate-180'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                  aria-hidden="true"
                >
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>
            </h3>

            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                className="px-5 sm:px-6 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100 animate-in fade-in-50 duration-150 motion-reduce:animate-none"
              >
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
