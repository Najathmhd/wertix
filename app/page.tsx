import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Target,
  Users2,
} from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import ProcessTimeline from "@/components/ProcessTimeline";
import PortfolioCard from "@/components/PortfolioCard";
import MarqueeStrip from "@/components/MarqueeStrip";
import { servicesData, portfolioData } from "@/lib/data";
import FaqAccordion from "@/components/FaqAccordion";
import { HOMEPAGE_FAQS } from "@/lib/faq-data";

// ─── Shared label style ──────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-4">
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col w-full">

      {/* ══════════════════════════════════════════════════════
          HERO — asymmetric, typography-forward
      ══════════════════════════════════════════════════════ */}
      <section className="pt-12 sm:pt-20 lg:pt-24 pb-14 sm:pb-20 lg:pb-24 border-b border-slate-200 animate-fade-in">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          {/* Eyebrow */}
          <div className="mb-5 sm:mb-7">
            <Label>WERTIX · Managed Digital Services · wertix.lk</Label>
          </div>

          {/* Headline + supporting text — two-column on lg */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
            <div className="lg:col-span-7 animate-fade-up">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#090D1A] tracking-tight leading-[1.12] sm:leading-[1.08] text-balance">
                Big ideas deserve<br className="hidden sm:inline" />{" "}
                the{" "}
                <span className="text-[#0055e5]">right team.</span>
              </h1>
            </div>

            <div className="lg:col-span-5 animate-fade-up-delay-1">
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 sm:mb-8 max-w-lg">
                From creative design and websites to data, AI, and digital
                support, WERTIX brings the right expertise together to make your
                next project happen.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/request-quote"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#090D1A] text-white text-sm font-semibold hover:bg-[#0055e5] active:scale-[0.98] transition-all duration-150 min-h-[44px]"
                >
                  <span>Tell Us About Your Project</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-slate-300 text-[#090D1A] text-sm font-semibold hover:bg-slate-50 hover:border-slate-400 active:scale-[0.98] transition-all duration-150 min-h-[44px]"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>

          {/* ── Value Strip ──────────────────────────────────── */}
          <div className="mt-12 sm:mt-14 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5 sm:gap-y-6 animate-fade-up-delay-2">
            {[
              { icon: Users2,     label: "Curated Squads",    desc: "Domain specialists matched to your stack" },
              { icon: ShieldCheck, label: "Managed Oversight", desc: "One senior lead accountable for delivery" },
              { icon: Zap,        label: "Sprint Cadence",    desc: "Clear milestones with weekly demos" },
              { icon: Target,     label: "Outcome Focused",   desc: "Defined deliverables, no scope surprises" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon className="w-4 h-4 mt-0.5 text-[#0055e5] shrink-0" />
                <div>
                  <div className="text-sm font-semibold text-[#090D1A] mb-0.5">{label}</div>
                  <div className="text-xs text-slate-500 leading-snug">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Marquee strip ── */}
      <MarqueeStrip />

      {/* ══════════════════════════════════════════════════════
          SERVICES — clean list, not identical cards
      ══════════════════════════════════════════════════════ */}
      <section id="services" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <Label>Service Pillars</Label>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#090D1A] tracking-tight">
                Five core capabilities.
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0055e5] hover:text-[#0047c5] transition-colors shrink-0"
            >
              Full service detail
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {servicesData.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}

            {/* Custom engagement prompt — restrained, not a hero card */}
            <div className="flex flex-col justify-between p-6 rounded-xl bg-[#090D1A] text-white border border-slate-800">
              <div>
                <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-400 mb-3 block">
                  Custom Engagement
                </span>
                <h3 className="text-lg font-bold mb-2">
                  Need a cross-functional team?
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Many projects span design, web, and data simultaneously. We build multi-disciplinary squads matched precisely to scope.
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-slate-800">
                <Link
                  href="/request-quote"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-300 transition-colors group"
                >
                  Build your squad
                  <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PROCESS — numbered horizontal flow
      ══════════════════════════════════════════════════════ */}
      <section id="process" className="py-16 sm:py-20 lg:py-24 bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="mb-10">
            <Label>How We Work</Label>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#090D1A] tracking-tight">
              The managed delivery process.
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl">
              A transparent, structured five-stage lifecycle that eliminates the
              risks of fragmented freelancers and bloated legacy agencies.
            </p>
          </div>
          <ProcessTimeline />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PORTFOLIO PREVIEW
      ══════════════════════════════════════════════════════ */}
      <section id="portfolio" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <Label>Sample Work</Label>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#090D1A] tracking-tight">
                Concepts & demonstrations.
              </h2>
              <p className="mt-2 text-sm text-slate-500 max-w-sm">
                Illustrative prototypes showcasing our engineering and design capabilities.
              </p>
            </div>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0055e5] hover:text-[#0047c5] transition-colors shrink-0"
            >
              View full showcase
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioData.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>

          <p className="mt-6 text-xs text-slate-400 text-center">
            All concepts are illustrative demonstrations of our technical and design execution standards.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ABOUT / QUALITY — editorial layout, not a card grid
      ══════════════════════════════════════════════════════ */}
      <section id="about" className="py-16 sm:py-20 lg:py-24 bg-[#090D1A] text-white border-b border-[#1e293b]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

            {/* Left: text */}
            <div className="lg:col-span-5">
              <Label>The WERTIX Standard</Label>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mb-6">
                Why managed digital services matter.
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-4">
                Hiring individual contractors often means managing fragmented
                communication, variable quality, and zero accountability. Legacy
                agencies bring bloated overhead and slow turnarounds.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                WERTIX bridges this gap — a managed partner where seasoned leads
                supervise every phase, ensuring deliverables are production-grade,
                secure, and shipped on schedule.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-300 transition-colors group"
              >
                Our operating standards
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Right: clean list */}
            <div className="lg:col-span-7">
              <div className="space-y-0 divide-y divide-[#1e293b]">
                {[
                  {
                    icon: CheckCircle2,
                    title: "Strict Code & Design Audits",
                    body: "Every component undergoes peer reviews for performance, accessibility, and responsive precision before delivery.",
                  },
                  {
                    icon: Users2,
                    title: "Complete IP Ownership",
                    body: "All source code, design libraries, credentials, and deployments remain 100% yours. No lock-ins.",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Transparent Milestone Agreements",
                    body: "Clear scopes, explicit acceptance criteria, and no ambiguous billing. Each sprint is approved against defined deliverables.",
                  },
                ].map(({ icon: Icon, title, body }) => (
                  <div key={title} className="flex items-start gap-5 py-7">
                    <Icon className="w-5 h-5 text-[#0055e5] mt-0.5 shrink-0" />
                    <div>
                      <h3 className="text-base font-semibold text-white mb-1.5">{title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOMEPAGE FAQ SECTION
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#f8fafc] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <Label>Frequently Asked Questions</Label>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#090D1A] tracking-tight leading-tight mb-4">
                Everything you need to know before we begin.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Understand how our managed model protects your timeline, ensures code quality, and aligns the right specialists with your business.
              </p>
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0055e5] hover:text-[#0047c5] transition-colors group"
              >
                <span>View All FAQs & Policies</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="lg:col-span-7">
              <FaqAccordion items={HOMEPAGE_FAQS} defaultOpenIndex={0} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FINAL CTA — simple, confident, not a modal-style card
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <Label>Ready to Collaborate?</Label>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#090D1A] tracking-tight leading-tight mb-5">
              Let&apos;s assemble the right team for your next build.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
              Share your concept, timeline, and requirements. We&apos;ll provide a
              structured plan and team recommendation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/request-quote"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#090D1A] text-white text-sm font-semibold hover:bg-[#0055e5] active:scale-[0.98] transition-all duration-150"
              >
                Tell Us About Your Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-slate-300 text-[#090D1A] text-sm font-semibold hover:bg-slate-50 hover:border-slate-400 active:scale-[0.98] transition-all duration-150"
              >
                Schedule an Intro Chat
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
