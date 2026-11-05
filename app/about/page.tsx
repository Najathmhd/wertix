import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Target,
  Users2,
  Layers,
  Globe,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About WERTIX — Managed Digital Services | wertix.lk",
  description:
    "WERTIX is a managed digital services company. Learn about our model, quality standards, and how we bring together the right specialists for every project.",
};

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-4">
      {children}
    </span>
  );
}

export default function AboutPage() {
  return (
    <div className="w-full">

      {/* ── Page header ── */}
      <section className="pt-14 sm:pt-20 pb-12 sm:pb-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <Label>About WERTIX</Label>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#090D1A] tracking-tight leading-tight max-w-2xl text-balance">
            Big ideas deserve the right team.
          </h1>
          <p className="mt-4 text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed">
            WERTIX is a managed digital services company founded on a straightforward belief: ambitious digital projects succeed when senior expertise, clear processes, and total accountability come together.
          </p>
        </div>
      </section>

      {/* ── Philosophy / The Model ── */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-6 space-y-4">
              <Label>Our Operating Philosophy</Label>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#090D1A] tracking-tight">
                Why we built a managed digital services model.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Organizations tackling digital initiatives face an uncomfortable
                trade-off. Contracting unvetted freelancers means spending
                valuable time managing fragmented handoffs and inconsistent
                quality. Traditional agencies come with excessive overhead, slow
                account tiers, and opaque pricing.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                WERTIX represents a cleaner alternative. We assemble curated
                domain squads tailored to your exact stack and oversee the
                entire project lifecycle with direct engineering leadership.
              </p>
              <div className="pt-2">
                <Link
                  href="/request-quote"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#090D1A] text-white text-sm font-semibold hover:bg-[#0055e5] active:scale-[0.98] transition-all duration-150"
                >
                  Discuss Your Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Comparison */}
            <div className="lg:col-span-6 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
                How WERTIX Compares
              </h3>
              {[
                {
                  label: "Freelance Platforms",
                  body: "High management burden, disjointed communication, variable quality, no accountability when things go wrong.",
                  highlight: false,
                },
                {
                  label: "Legacy Traditional Agencies",
                  body: "Bloated retainers, multiple junior tiers, slow sprint turnarounds, and senior partners only in sales meetings.",
                  highlight: false,
                },
                {
                  label: "The WERTIX Managed Model",
                  body: "Dedicated, vetted senior squads led by a technical lead. Direct communication, predictable sprint milestones, and zero contractor roulette.",
                  highlight: true,
                },
              ].map(({ label, body, highlight }) => (
                <div
                  key={label}
                  className={`p-4 rounded-lg border text-sm ${
                    highlight
                      ? "bg-[#f0f5ff] border-blue-200"
                      : "bg-[#f8fafc] border-slate-200"
                  }`}
                >
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-widest block mb-1.5 ${
                      highlight ? "text-[#0055e5]" : "text-slate-400"
                    }`}
                  >
                    {label}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Principles ── */}
      <section className="py-12 sm:py-16 bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="mb-8">
            <Label>Our Standards</Label>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#090D1A] tracking-tight">
              The principles that guide our work.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: Target,
                title: "Clarity & Scope",
                body: "We define milestones and acceptance criteria before writing code. You always know what is being built, why, and when it ships.",
              },
              {
                icon: ShieldCheck,
                title: "Production Rigour",
                body: "Clean, typed, documented codebases. Accessible UI systems. Performance and security checked at every sprint checkpoint.",
              },
              {
                icon: Users2,
                title: "Curated Talent",
                body: "We do not staff projects with unverified hands. Every squad member is selected for demonstrated excellence in their specific discipline.",
              },
              {
                icon: Layers,
                title: "Your Full Ownership",
                body: "All source code, design libraries, credentials, and deployments remain 100% your property — no restrictive lock-ins.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="p-5 rounded-xl bg-white border border-slate-200">
                <Icon className="w-5 h-5 text-[#0055e5] mb-3" />
                <h3 className="text-sm font-bold text-[#090D1A] mb-1.5">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Global presence banner ── */}
      <section className="py-12 sm:py-16 bg-[#090D1A] text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-widest">
                <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Presence & Collaboration</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-bold tracking-tight text-balance">
                Based in Colombo, operating globally.
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                Through <strong className="text-white">wertix.lk</strong>, we deliver managed services for clients in Sri Lanka and across international timezones. We structure our communication to fit asynchronous schedules with high-bandwidth overlap windows.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col gap-3">
              <Link
                href="/request-quote"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#0055e5] text-white text-sm font-semibold hover:bg-[#0047c5] transition-colors duration-150"
              >
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-[#1e293b] text-slate-300 text-sm font-medium hover:border-slate-600 hover:text-white transition-colors duration-150"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
