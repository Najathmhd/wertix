import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Info,
  Layers,
  Activity,
} from "lucide-react";
import { portfolioProjects } from "@/lib/portfolio";

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = portfolioProjects.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found — WERTIX",
    };
  }

  return {
    title: `${project.title} — Technical Concept | WERTIX`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — WERTIX Architectural Concept`,
      description: project.summary,
      url: `https://wertix.lk/portfolio/${project.id}`,
    },
  };
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-4">
      {children}
    </span>
  );
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectIndex = portfolioProjects.findIndex((p) => p.id === id);

  if (projectIndex === -1) {
    notFound();
  }

  const project = portfolioProjects[projectIndex];
  const prevProject =
    projectIndex > 0 ? portfolioProjects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < portfolioProjects.length - 1
      ? portfolioProjects[projectIndex + 1]
      : null;

  return (
    <div className="w-full">
      {/* ── Page Header ── */}
      <section className="pt-12 sm:pt-16 pb-10 sm:pb-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-xs text-slate-500">
            <Link
              href="/portfolio"
              className="hover:text-[#0055e5] flex items-center gap-1 font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Portfolio Concepts</span>
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-semibold">{project.title}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Label>{project.categoryBadge}</Label>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-[10px] font-semibold text-[#0055e5] border border-blue-100">
              <Sparkles className="w-2.5 h-2.5" />
              {project.conceptType}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#090D1A] tracking-tight leading-tight max-w-3xl text-balance">
            {project.title}
          </h1>
          <p className="mt-3 text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
            {project.subtitle}
          </p>

          {/* Prototype Disclosure Notice */}
          <div className="mt-6 p-3.5 rounded-lg bg-blue-50 border border-blue-200 flex items-start gap-2.5 text-xs text-slate-700 max-w-3xl">
            <Info className="w-4 h-4 text-[#0055e5] shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              <strong>Demonstration Concept Notice:</strong> This case study illustrates an architectural design system and technical implementation concept developed by WERTIX to demonstrate domain craftsmanship and engineering standards. It is not an active commercial client project.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Case Study Content ── */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Left 8 cols: Narrative & Architecture */}
            <div className="lg:col-span-8 space-y-10">
              {/* Visual Banner Preview */}
              <div
                className={`w-full h-52 sm:h-64 rounded-xl ${project.gradient} p-6 sm:p-8 flex flex-col justify-between text-white relative overflow-hidden`}
              >
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                  aria-hidden="true"
                />
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-xs font-mono tracking-wider uppercase text-white/80">
                    System Architecture
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-black/30 backdrop-blur-xs">
                    {project.aspectSnippet}
                  </span>
                </div>
                <div className="relative z-10">
                  <h2 className="text-xl sm:text-2xl font-extrabold">{project.title}</h2>
                  <p className="text-xs text-slate-300 mt-1 max-w-md">{project.summary}</p>
                </div>
              </div>

              {/* The Challenge */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#090D1A] flex items-center gap-2">
                  <span className="w-1.5 h-4 rounded-full bg-[#0055e5]" />
                  The Problem & Architectural Challenge
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              {/* The Solution */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-[#090D1A] flex items-center gap-2">
                  <span className="w-1.5 h-4 rounded-full bg-[#0055e5]" />
                  The WERTIX Engineering & Design Approach
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {project.solution}
                </p>
              </div>

              {/* Architectural Highlights */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#090D1A] flex items-center gap-2">
                  <span className="w-1.5 h-4 rounded-full bg-[#0055e5]" />
                  Key Technical & Design Innovations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.architecturalHighlights.map((hl) => (
                    <div
                      key={hl}
                      className="p-3.5 rounded-lg border border-slate-200 bg-[#f8fafc] flex items-start gap-2.5 text-xs text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#0055e5] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div className="p-6 rounded-xl border border-slate-200 bg-[#f8fafc] space-y-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                  Deliverables Produced
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                  {project.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0055e5]" />
                      <span className="font-medium">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right 4 cols: Spec Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-xs space-y-6 sticky top-24">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 block mb-1">
                    Discipline
                  </span>
                  <div className="text-sm font-bold text-[#090D1A] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#0055e5]" />
                    {project.categoryBadge}
                  </div>
                </div>

                {/* Benchmarks */}
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 block mb-2">
                    Target Architectural Benchmarks
                  </span>
                  <div className="space-y-2">
                    {project.benchmarks.map((bm) => (
                      <div
                        key={bm.label}
                        className="flex items-center justify-between p-2 rounded-md bg-slate-50 text-xs"
                      >
                        <span className="text-slate-600 flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-slate-400" />
                          {bm.label}
                        </span>
                        <span className="font-mono font-semibold text-[#090D1A]">
                          {bm.metric}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 block mb-2">
                    Technology & Tooling
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 text-[#0055e5] border border-blue-100 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Primary CTA */}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <Link
                    href={`/request-quote?service=${project.category}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#090D1A] text-white text-xs font-semibold hover:bg-[#0055e5] active:scale-[0.98] transition-all duration-150 min-h-[40px]"
                  >
                    <span>Scope a Similar Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <p className="text-[11px] text-slate-400 text-center leading-tight">
                    Dedicated lead & transparent sprint milestones
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* ── Bottom Prev / Next Navigation ── */}
          <div className="mt-14 pt-8 border-t border-slate-200 flex items-center justify-between text-xs">
            {prevProject ? (
              <Link
                href={`/portfolio/${prevProject.id}`}
                className="inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-[#0055e5] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Prev: {prevProject.title}</span>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                href={`/portfolio/${nextProject.id}`}
                className="inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-[#0055e5] transition-colors"
              >
                <span>Next: {nextProject.title}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
