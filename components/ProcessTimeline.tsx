import React from "react";
import { Compass, Users, Layers, CheckCircle2, LifeBuoy } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery & Scope Alignment",
    tagline: "Clarity Before Code",
    description:
      "We unpack your business goals, constraints, and timeline to craft a concrete roadmap with transparent milestones and estimates.",
    icon: <Compass className="w-4 h-4" />,
  },
  {
    number: "02",
    title: "Dedicated Specialist Squad",
    tagline: "Curated Domain Experts",
    description:
      "WERTIX pairs your project with handpicked senior talent across design, engineering, or data — managed under a single point of accountability.",
    icon: <Users className="w-4 h-4" />,
  },
  {
    number: "03",
    title: "Agile Sprint Execution",
    tagline: "Predictable Cadence",
    description:
      "Focused sprints with weekly walkthroughs, interactive staging links, and full visibility into each phase.",
    icon: <Layers className="w-4 h-4" />,
  },
  {
    number: "04",
    title: "Quality Review & Launch",
    tagline: "Production-Grade Assurance",
    description:
      "Every deliverable passes code quality, accessibility, cross-device, and security checklists before zero-downtime deployment.",
    icon: <CheckCircle2 className="w-4 h-4" />,
  },
  {
    number: "05",
    title: "Ongoing Managed Support",
    tagline: "Long-term Reliability",
    description:
      "After launch: monitoring, routine updates, cloud maintenance, and on-demand sprint capacity as your needs evolve.",
    icon: <LifeBuoy className="w-4 h-4" />,
  },
];

export default function ProcessTimeline() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden">
      {steps.map((step, index) => (
        <div
          key={step.number}
          className={`bg-white p-5 lg:p-6 flex flex-col gap-3 transition-colors duration-150 hover:bg-slate-50 ${
            index === 4 ? "sm:col-span-2 lg:col-span-1" : ""
          }`}
        >
          {/* Number + icon row */}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-slate-200 font-mono tabular-nums">
              {step.number}
            </span>
            <span className="w-7 h-7 rounded-md bg-blue-50 text-[#0055e5] flex items-center justify-center">
              {step.icon}
            </span>
          </div>

          {/* Tagline */}
          <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#0055e5]">
            {step.tagline}
          </span>

          {/* Title */}
          <h3 className="text-sm font-bold text-[#090D1A] leading-snug">
            {step.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-500 leading-relaxed">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}
