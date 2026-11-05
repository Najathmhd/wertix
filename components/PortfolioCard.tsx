import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  categoryBadge: string;
  conceptLabel: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  gradient: string;
  aspectSnippet: string;
}

export default function PortfolioCard({ item }: { item: PortfolioItem }) {
  const caseStudyUrl = `/portfolio/${item.id.replace("concept-", "")}`;

  return (
    <div className="group flex flex-col bg-white rounded-xl border border-slate-200 hover:border-slate-300 overflow-hidden transition-all duration-150 hover:shadow-sm">
      {/* Visual header */}
      <Link
        href={caseStudyUrl}
        className={`relative h-40 sm:h-48 w-full flex flex-col justify-between p-5 ${item.gradient} text-white overflow-hidden block`}
        aria-label={`View ${item.title} case study`}
      >
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/25 text-white text-[10px] font-semibold tracking-wide backdrop-blur-xs">
            <Sparkles className="w-2.5 h-2.5 text-blue-200" aria-hidden="true" />
            {item.conceptLabel}
          </span>
          <span className="text-[10px] font-medium uppercase tracking-wider text-white/70">
            {item.categoryBadge}
          </span>
        </div>

        <div className="relative z-10">
          <p className="text-[10px] font-mono tracking-tight text-white/60 uppercase mb-0.5">
            Architecture Concept
          </p>
          <p className="text-sm font-bold text-white group-hover:text-blue-200 transition-colors">
            {item.aspectSnippet}
          </p>
        </div>
      </Link>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3 mb-2">
            <Link href={caseStudyUrl}>
              <h3 className="text-base font-bold text-[#090D1A] group-hover:text-[#0055e5] transition-colors duration-150">
                {item.title}
              </h3>
            </Link>
            <Link href={caseStudyUrl} aria-hidden="true">
              <ArrowUpRight
                className="w-4 h-4 text-slate-400 group-hover:text-[#0055e5] transition-colors duration-150 shrink-0 mt-0.5"
              />
            </Link>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed mb-4">
            {item.description}
          </p>

          {/* Deliverables */}
          <div className="flex flex-wrap gap-1 mb-4">
            {item.deliverables.map((d, i) => (
              <span
                key={i}
                className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium"
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        {/* Tech stack + link */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {item.techStack.map((t, i) => (
              <span
                key={i}
                className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-[#0055e5] border border-blue-100"
              >
                {t}
              </span>
            ))}
          </div>
          <Link
            href={caseStudyUrl}
            className="text-[11px] font-semibold text-[#0055e5] hover:text-[#0047c5] transition-colors shrink-0"
          >
            Case Study →
          </Link>
        </div>
      </div>
    </div>
  );
}
