import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Palette,
  Code2,
  Cpu,
  Video,
  Headphones,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services — WERTIX Managed Digital Services",
  description:
    "Explore WERTIX's 5 core digital service pillars: Design & Branding, Web & Technology, Data & AI, Marketing & Video, and Business Support.",
};

const detailedServices = [
  {
    id: "design",
    title: "Design & Branding",
    subtitle: "Brand identity, UI/UX systems, and human-centered digital experiences.",
    icon: <Palette className="w-5 h-5" />,
    overview:
      "Great products start with coherent design systems. We help companies build distinctive brand languages, intuitive user journeys, and pixel-precise interfaces.",
    deliverables: [
      "Brand identity systems, logo marks, and comprehensive design guides",
      "End-to-end UI/UX architecture for web and mobile platforms",
      "Interactive high-fidelity prototypes in Figma",
      "Design system component libraries for developers",
      "UX audits, usability testing, and conversion rate redesigns",
    ],
    tools: ["Figma", "Tailwind CSS", "Framer", "Design Tokens"],
  },
  {
    id: "web",
    title: "Web & Technology",
    subtitle: "Modern full-stack web applications, headless architectures, and cloud platforms.",
    icon: <Code2 className="w-5 h-5" />,
    overview:
      "We build robust, lightning-fast digital solutions using contemporary tech stacks. Our engineering emphasises type-safety, clean architecture, search engine visibility, and maintainability.",
    deliverables: [
      "Next.js, React, and TypeScript web applications",
      "Headless CMS setups (Sanity, Strapi, Payload, Contentful)",
      "REST & GraphQL API design, integrations, and microservices",
      "Cloud deployments (Vercel, AWS, Cloudflare, Docker)",
      "Performance optimisation, Core Web Vitals, and technical SEO",
    ],
    tools: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL"],
  },
  {
    id: "data",
    title: "Data & AI",
    subtitle: "Applied AI workflows, business intelligence, and intelligent automation.",
    icon: <Cpu className="w-5 h-5" />,
    overview:
      "Move beyond AI hype to practical implementations. We build internal assistants, automate repetitive document workflows, and construct clear business intelligence dashboards.",
    deliverables: [
      "Custom AI assistants and domain-specific knowledge retrieval (RAG)",
      "Automated document processing and data extraction pipelines",
      "Interactive executive dashboards and reporting views",
      "Data ingestion, cleaning, and ETL automation scripts",
      "API integrations connecting internal databases with modern AI models",
    ],
    tools: ["Python", "FastAPI", "Vector DBs", "OpenAI / Claude APIs", "Pandas", "Supabase"],
  },
  {
    id: "marketing",
    title: "Marketing & Video",
    subtitle: "High-impact video editing, motion graphics, and conversion-focused assets.",
    icon: <Video className="w-5 h-5" />,
    overview:
      "Clear communication commands attention. We produce crisp explainer videos, product feature walkthroughs, animated teasers, and performance marketing collateral.",
    deliverables: [
      "Product demonstration and explainer videos (15s to 90s)",
      "2D and 3D motion graphics for social channels and hero banners",
      "High-conversion landing page creative bundles and copy",
      "Digital advertising assets optimised across aspect ratios",
      "Visual slide decks and presentation assets for stakeholders",
    ],
    tools: ["Premiere Pro", "After Effects", "Blender", "DaVinci Resolve", "Figma"],
  },
  {
    id: "support",
    title: "Business Support",
    subtitle: "Continuous platform maintenance, technical monitoring, and SLA support.",
    icon: <Headphones className="w-5 h-5" />,
    overview:
      "Software requires continuous care to remain secure, fast, and stable. Our managed technical support acts as your fractional DevOps and IT engineering squad.",
    deliverables: [
      "24/7 uptime monitoring and incident response",
      "Security updates, dependency patching, and vulnerability scans",
      "Managed backups, disaster recovery, and cloud cost management",
      "Monthly performance reviews and continuous optimisation",
      "Flexible monthly sprint hours for minor feature enhancements",
    ],
    tools: ["GitHub Actions", "Vercel / AWS", "Sentry", "BetterStack", "Docker"],
  },
];

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[11px] font-semibold tracking-[0.12em] uppercase text-slate-500 mb-4">
      {children}
    </span>
  );
}

export default function ServicesPage() {
  return (
    <div className="w-full">

      {/* ── Page header ── */}
      <section className="pt-14 sm:pt-20 pb-12 sm:pb-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <Label>Managed Service Pillars</Label>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#090D1A] tracking-tight leading-tight max-w-2xl text-balance">
            End-to-end expertise for your entire digital lifecycle.
          </h1>
          <p className="mt-4 text-slate-600 text-sm sm:text-base max-w-xl leading-relaxed">
            WERTIX integrates design, engineering, data intelligence, marketing
            visuals, and continuous platform maintenance under one managed structure.
          </p>
        </div>
      </section>

      {/* ── Service detail rows ── */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="space-y-16 sm:space-y-20">
            {detailedServices.map((service, index) => (
              <div
                key={service.id}
                id={service.id}
                className="scroll-mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
              >
                {/* Left: overview */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-lg bg-[#090D1A] text-white flex items-center justify-center">
                      {service.icon}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                      Pillar 0{index + 1}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#090D1A] tracking-tight">
                    {service.title}
                  </h2>
                  <p className="text-sm font-medium text-[#0055e5]">
                    {service.subtitle}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.overview}
                  </p>

                  {/* Tools */}
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 block mb-2">
                      Tools
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.tools.map((tool) => (
                        <span
                          key={tool}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/request-quote?service=${service.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#090D1A] text-white text-xs font-semibold hover:bg-[#0055e5] transition-colors duration-150"
                  >
                    Scope this service
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Right: deliverables */}
                <div className="lg:col-span-8">
                  <div className="p-6 sm:p-8 rounded-xl border border-slate-200 bg-[#f8fafc]">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-5">
                      Capabilities & Deliverables
                    </h3>
                    <ul className="space-y-3.5">
                      {service.deliverables.map((d) => (
                        <li key={d} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#0055e5] shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700 leading-relaxed">{d}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 pt-5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                      <span>Delivered as milestone sprints or monthly retainer</span>
                      <Link
                        href={`/request-quote?service=${service.id}`}
                        className="text-[#0055e5] font-semibold hover:underline flex items-center gap-1"
                      >
                        Enquire <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Engagement models ── */}
      <section className="py-12 sm:py-16 bg-[#f8fafc] border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="mb-8">
            <Label>Flexible Engagements</Label>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#090D1A] tracking-tight">
              How you can work with WERTIX.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                model: "Model A",
                title: "Milestone-Based Project",
                desc: "Ideal for well-defined deliverables — new website builds, branding systems, or bespoke web applications with a clear scope.",
                points: ["Fixed scope & milestones", "Transparent sprint progress", "Complete handover & docs"],
                dark: false,
              },
              {
                model: "Model B",
                title: "Dedicated Managed Squad",
                desc: "A multi-disciplinary team acting as an extension of your company for continuous product iteration and rapid feature development.",
                points: ["Senior tech lead + specialists", "Bi-weekly sprint reviews", "Seamless tool integration"],
                dark: true,
              },
              {
                model: "Model C",
                title: "Continuous Support & SLA",
                desc: "Ongoing oversight, security updates, uptime guarantees, and monthly sprint hours for maintenance and on-demand enhancements.",
                points: ["Guaranteed SLA response", "Uptime & security monitoring", "Monthly retained hours"],
                dark: false,
              },
            ].map(({ model, title, desc, points, dark }) => (
              <div
                key={model}
                className={`p-6 rounded-xl border ${
                  dark
                    ? "bg-[#090D1A] border-slate-800 text-white"
                    : "bg-white border-slate-200"
                }`}
              >
                <span
                  className={`text-[10px] font-semibold uppercase tracking-widest block mb-3 ${
                    dark ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  {model}
                </span>
                <h3
                  className={`text-base font-bold mb-2 ${
                    dark ? "text-white" : "text-[#090D1A]"
                  }`}
                >
                  {title}
                </h3>
                <p
                  className={`text-xs leading-relaxed mb-5 ${
                    dark ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  {desc}
                </p>
                <ul
                  className={`space-y-1.5 text-xs mb-6 ${
                    dark ? "text-slate-500" : "text-slate-500"
                  }`}
                >
                  {points.map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-current shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/request-quote"
                  className={`text-xs font-semibold transition-colors duration-150 ${
                    dark ? "text-blue-400 hover:text-blue-300" : "text-[#0055e5] hover:text-[#0047c5]"
                  }`}
                >
                  Enquire about this model →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
