"use client";

import React, { useActionState, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  CheckCircle2,
  Palette,
  Code2,
  Cpu,
  Video,
  Headphones,
  RotateCcw,
} from "lucide-react";
import { submitQuoteAction } from "@/app/actions/quotes";
import type { QuoteActionState } from "@/app/actions/quotes";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-4">
      {children}
    </span>
  );
}

const serviceOptions = [
  {
    id: "design",
    label: "Design & Branding",
    desc: "Brand identity, UI/UX systems, interactive Figma prototypes",
    icon: <Palette className="w-5 h-5" />,
  },
  {
    id: "web",
    label: "Web & Technology",
    desc: "Next.js applications, headless CMS, APIs, high-performance web",
    icon: <Code2 className="w-5 h-5" />,
  },
  {
    id: "data",
    label: "Data & AI",
    desc: "Applied LLM workflows, automated data ingestion, analytics dashboards",
    icon: <Cpu className="w-5 h-5" />,
  },
  {
    id: "marketing",
    label: "Marketing & Video",
    desc: "Product explainer videos, 3D motion graphics, launch assets",
    icon: <Video className="w-5 h-5" />,
  },
  {
    id: "support",
    label: "Business Support",
    desc: "Managed platform operations, SLA maintenance, security updates",
    icon: <Headphones className="w-5 h-5" />,
  },
];

const timelineOptions = [
  "Within 1 Month (Fast-track)",
  "1 to 3 Months (Standard Sprint)",
  "3 to 6 Months (Multi-phase Build)",
  "Continuous / Monthly Retainer",
];

const budgetOptions = [
  "Concept Discovery ($2,500 – $5,000)",
  "Core Sprint Build ($5,000 – $15,000)",
  "Full Platform / Multi-Discipline ($15,000 – $30,000)",
  "Enterprise / Dedicated Squad ($30,000+)",
];

const stageOptions = [
  "New Concept / Pre-planning",
  "Design / Wireframes Ready",
  "Existing Codebase Overhaul",
  "Scaling / Live Product",
];

function RequestQuoteContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");

  const [selectedServices, setSelectedServices] = useState<string[]>(() => {
    if (serviceParam && serviceOptions.some((s) => s.id === serviceParam)) {
      return [serviceParam];
    }
    return ["web", "design"];
  });
  const [timeline, setTimeline] = useState<string>(
    "1 to 3 Months (Standard Sprint)"
  );
  const [budget, setBudget] = useState<string>(
    "Core Sprint Build ($5,000 – $15,000)"
  );
  const [stage, setStage] = useState<string>("New Concept / Pre-planning");

  const [state, action, pending] = useActionState<QuoteActionState, FormData>(
    submitQuoteAction,
    undefined
  );

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== id));
      }
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const resetForm = () => {
    window.location.reload();
  };

  // Success state
  if (state?.success && state.refNumber) {
    return (
      <div className="w-full">
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-green-600">
              Request Received
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#090D1A] mt-2">
              We&apos;ll be in touch soon.
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
              Your project request has been submitted to the WERTIX team. We&apos;ll
              review your requirements and respond within 1–2 business days.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-mono">
              Reference:{" "}
              <strong className="text-[#0055e5]">{state.refNumber}</strong>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Save your reference number. You can quote it in any correspondence
              with us at{" "}
              <a
                href="mailto:hello@wertix.lk"
                className="underline text-[#0055e5]"
              >
                hello@wertix.lk
              </a>
              .
            </p>
            <button
              onClick={resetForm}
              className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Submit Another Request
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* ── Page header ── */}
      <section className="pt-14 sm:pt-20 pb-10 sm:pb-14 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <Label>Project Scoping Tool</Label>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#090D1A] tracking-tight leading-tight max-w-xl text-balance">
            Tell Us About Your Project.
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed">
            Let&apos;s align on your scope, timeline, and disciplines. Fill out
            the parameters below and we&apos;ll be in touch within 1–2 business days.
          </p>
        </div>
      </section>

      {/* Main Scoping Form */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10">
          <form action={action} className="space-y-10 sm:space-y-12">
            {/* Hidden fields for controlled state */}
            <input
              type="hidden"
              name="services"
              value={JSON.stringify(selectedServices)}
            />
            <input type="hidden" name="stage" value={stage} />
            <input type="hidden" name="timeline" value={timeline} />
            <input type="hidden" name="budget" value={budget} />

            {/* Server-side errors */}
            {state?.errors && (
              <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
                Please review the highlighted fields and try again.
              </div>
            )}

            {/* Step 1: Services */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-bold text-[#090D1A] flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-blue-50 text-[#0055e5] text-xs font-bold flex items-center justify-center font-mono">
                    1
                  </span>
                  <span>What services does your project need?</span>
                </h3>
                <span className="text-xs text-slate-400">Select one or more</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {serviceOptions.map((opt) => {
                  const isSelected = selectedServices.includes(opt.id);
                  return (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => toggleService(opt.id)}
                      className={`text-left p-3.5 sm:p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                        isSelected
                          ? "bg-blue-50/70 border-[#0055e5]"
                          : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected
                            ? "bg-[#0055e5] text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {opt.icon}
                      </div>
                      <div>
                        <span
                          className={`block text-sm font-bold ${
                            isSelected ? "text-[#0055e5]" : "text-slate-900"
                          }`}
                        >
                          {opt.label}
                        </span>
                        <span className="block text-xs text-slate-500 mt-0.5 leading-relaxed">
                          {opt.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Project Stage */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-[#090D1A] flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-blue-50 text-[#0055e5] text-xs font-bold flex items-center justify-center font-mono">
                  2
                </span>
                <span>What stage is your project currently at?</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {stageOptions.map((st) => (
                  <button
                    type="button"
                    key={st}
                    onClick={() => setStage(st)}
                    className={`px-4 py-3 rounded-lg border text-left text-sm font-medium transition-all ${
                      stage === st
                        ? "bg-[#090D1A] text-white border-[#090D1A]"
                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Timeline & Budget */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-[#090D1A] flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-blue-50 text-[#0055e5] text-xs font-bold flex items-center justify-center font-mono">
                  3
                </span>
                <span>Timeline and target budget range</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                    htmlFor="quote-timeline"
                  >
                    Estimated Timeline
                  </label>
                  <select
                    id="quote-timeline"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5] focus:border-transparent transition-all"
                  >
                    {timelineOptions.map((tl) => (
                      <option key={tl} value={tl}>
                        {tl}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                    htmlFor="quote-budget"
                  >
                    Budget Range Target
                  </label>
                  <select
                    id="quote-budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5] focus:border-transparent transition-all"
                  >
                    {budgetOptions.map((bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 4: Description */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-[#090D1A] flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-blue-50 text-[#0055e5] text-xs font-bold flex items-center justify-center font-mono">
                  4
                </span>
                <span>Project details &amp; core objectives</span>
              </h3>

              <textarea
                id="quote-description"
                name="description"
                rows={4}
                placeholder="Outline the problem you are solving, core user features, or current pain points..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5] focus:border-transparent transition-all"
              />
            </div>

            {/* Step 5: Contact Information */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-[#090D1A] flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-blue-50 text-[#0055e5] text-xs font-bold flex items-center justify-center font-mono">
                  5
                </span>
                <span>Your contact details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                    htmlFor="quote-name"
                  >
                    Name *
                  </label>
                  <input
                    id="quote-name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5] focus:border-transparent transition-all"
                  />
                  {state?.errors?.name && (
                    <p className="mt-1 text-xs text-red-600">{state.errors.name[0]}</p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                    htmlFor="quote-email"
                  >
                    Email *
                  </label>
                  <input
                    id="quote-email"
                    name="email"
                    type="email"
                    required
                    placeholder="sarah@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5] focus:border-transparent transition-all"
                  />
                  {state?.errors?.email && (
                    <p className="mt-1 text-xs text-red-600">{state.errors.email[0]}</p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                    htmlFor="quote-company"
                  >
                    Company / Organization
                  </label>
                  <input
                    id="quote-company"
                    name="company"
                    type="text"
                    placeholder="Acme Corp"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055e5] focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-xs text-slate-500">
                Your request is stored securely · We respond within 1–2 business days
              </p>
              <button
                type="submit"
                disabled={pending}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#090D1A] text-white font-semibold text-sm hover:bg-[#0055e5] active:scale-[0.98] transition-all min-h-[44px] disabled:opacity-60"
              >
                <Sparkles className="w-4 h-4" />
                <span>{pending ? "Submitting…" : "Submit Project Request"}</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default function RequestQuotePage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[60vh] flex items-center justify-center py-24 text-center">
          <div className="space-y-3">
            <div className="w-8 h-8 rounded-full border-2 border-[#0055e5] border-t-transparent animate-spin mx-auto" />
            <p className="text-xs text-slate-500 font-medium">Loading...</p>
          </div>
        </div>
      }
    >
      <RequestQuoteContent />
    </Suspense>
  );
}
