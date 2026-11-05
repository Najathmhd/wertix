import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { FAQ_CATEGORIES } from '@/lib/faq-data'
import FaqAccordion from '@/components/FaqAccordion'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — WERTIX Managed Digital Services',
  description:
    'Everything you need to know about working with WERTIX, from requesting a quote to receiving your completed project.',
  alternates: {
    canonical: 'https://wertix.lk/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions — WERTIX',
    description:
      'Everything you need to know about working with WERTIX, from requesting a quote to receiving your completed project.',
    url: 'https://wertix.lk/faq',
    siteName: 'WERTIX',
    type: 'website',
  },
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-4">
      {children}
    </span>
  )
}

export default function FaqPage() {
  // Schema.org FAQPage structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_CATEGORIES.flatMap((category) =>
      category.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      }))
    ),
  }

  return (
    <div className="w-full">
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Page Header ── */}
      <section className="pt-14 sm:pt-20 pb-12 sm:pb-16 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <Label>Knowledge Base & FAQs</Label>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#090D1A] tracking-tight leading-tight max-w-2xl text-balance">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            Everything you need to know about working with WERTIX, from requesting a quote to receiving your completed project.
          </p>

          {/* Quick jump pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {FAQ_CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700 hover:text-[#0055e5] hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
              >
                {cat.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categorized FAQ Sections ── */}
      <section className="py-12 sm:py-16 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 space-y-14 sm:space-y-16">
          {FAQ_CATEGORIES.map((category, idx) => (
            <div
              key={category.id}
              id={category.id}
              className="scroll-mt-24"
            >
              <div className="mb-5 sm:mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#0055e5]" />
                  <h2 className="text-xl sm:text-2xl font-bold text-[#090D1A] tracking-tight">
                    {category.title}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-500">
                  {category.description}
                </p>
              </div>

              <FaqAccordion items={category.items} defaultOpenIndex={idx === 0 ? 0 : -1} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Support & Direct Contact CTA ── */}
      <section className="py-12 sm:py-16 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="p-8 sm:p-10 rounded-2xl bg-[#090D1A] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-lg">
              <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 block">
                Have a specific requirement?
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                Still have questions about your project?
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Our technical leads are available to discuss architecture, timelines, and specialized squad arrangements.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href="/request-quote"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#0055e5] text-white text-sm font-semibold hover:bg-[#0047c5] transition-colors"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-slate-700 text-slate-300 text-sm font-medium hover:text-white hover:border-slate-500 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
