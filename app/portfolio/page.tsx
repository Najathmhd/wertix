"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Info, Sparkles } from "lucide-react";
import { portfolioProjects } from "@/lib/portfolio";

const categories = [
  { id: "all",       label: "All" },
  { id: "web",       label: "Web & Tech" },
  { id: "design",    label: "Design" },
  { id: "data",      label: "Data & AI" },
  { id: "marketing", label: "Marketing" },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-4">
      {children}
    </span>
  );
}

export default function PortfolioPage() {
  const [selected, setSelected] = useState<string>("all");

  const filtered =
    selected === "all"
      ? portfolioProjects
      : portfolioProjects.filter((c) => c.category === selected);

  return (
    <div className="w-full">

      {/* ── Page header ── */}
      <section className="pt-14 sm:pt-20 pb-10 sm:pb-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <Label>Technical & Creative Concepts</Label>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#090D1A] tracking-tight leading-tight max-w-xl text-balance">
            Sample Work & Demonstrations.
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed">
            Conceptual prototypes and technical architectures illustrating how
            WERTIX approaches system design, performance, and craftsmanship.
          </p>

          {/* Transparency notice */}
          <div className="mt-5 p-3.5 rounded-lg bg-blue-50 border border-blue-200 flex items-start gap-2.5 text-xs text-slate-700 max-w-2xl">
            <Info className="w-4 h-4 text-[#0055e5] shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              <strong>Demonstration notice:</strong> Every case study below is an illustrative prototype or architectural concept designed to showcase our engineering and design standards — not a live client project.
            </p>
          </div>
        </div>
      </section>

      {/* ── Showcase ── */}
      <section className="py-10 sm:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          {/* Filter pills */}
          <div className="flex flex-wrap items-center gap-2 mb-8" role="group" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelected(cat.id)}
                aria-pressed={selected === cat.id}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
                  selected === cat.id
                    ? "bg-[#090D1A] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Concept grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group flex flex-col rounded-xl border border-slate-200 bg-white overflow-hidden hover:border-slate-300 hover:shadow-sm transition-all duration-150"
              >
                {/* Visual header */}
                <Link
                  href={`/portfolio/${item.id}`}
                  className={`h-36 sm:h-40 w-full flex flex-col justify-between p-4 ${item.gradient} text-white relative overflow-hidden block`}
                  aria-label={`View ${item.title} case study`}
                >
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                    aria-hidden="true"
                  />
                  <div className="relative z-10 flex items-start justify-between">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/25 text-[10px] font-semibold tracking-wide backdrop-blur-xs">
                      <Sparkles className="w-2.5 h-2.5 text-blue-200" aria-hidden="true" />
                      {item.conceptType}
                    </span>
                    <span className="text-[10px] font-medium text-white/70 uppercase tracking-wider">
                      {item.categoryBadge}
                    </span>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-sm font-bold text-white group-hover:text-blue-200 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </Link>

                {/* Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      {item.summary}
                    </p>

                    {/* Architectural Highlights */}
                    <ul className="space-y-1.5 mb-4">
                      {item.architecturalHighlights.slice(0, 3).map((f) => (
                        <li key={f} className="flex items-start gap-2 text-[11px] text-slate-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0055e5] shrink-0 mt-1" aria-hidden="true" />
                          <span className="line-clamp-1">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech + link */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1">
                      {item.techStack.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-[#0055e5] border border-blue-100"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/portfolio/${item.id}`}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0055e5] hover:text-[#0047c5] transition-colors shrink-0"
                    >
                      Case Study
                      <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-12 sm:py-16 bg-[#f8fafc] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-[#090D1A] mb-3">
              Have a project with similar requirements?
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Tell us about your upcoming project and we&apos;ll prepare a tailored architectural breakdown and sprint estimate.
            </p>
            <Link
              href="/request-quote"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#090D1A] text-white text-sm font-semibold hover:bg-[#0055e5] active:scale-[0.98] transition-all duration-150"
            >
              Tell Us About Your Project
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
