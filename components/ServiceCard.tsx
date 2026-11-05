import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  deliverables: string[];
  href: string;
  highlight?: boolean;
}

export default function ServiceCard({ service }: { service: ServiceItem }) {
  return (
    <div
      className={`group flex flex-col justify-between p-6 rounded-xl transition-all duration-150 border ${
        service.highlight
          ? "bg-slate-900 text-white border-slate-700"
          : "bg-white text-[#090D1A] border-slate-200 hover:border-slate-300 hover:shadow-sm"
      }`}
    >
      <div>
        {/* Icon + Category */}
        <div className="flex items-start justify-between mb-5">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              service.highlight
                ? "bg-blue-500/15 text-blue-400"
                : "bg-slate-100 text-[#0055e5] group-hover:bg-blue-50"
            } transition-colors duration-150`}
          >
            {service.icon}
          </div>
          <span
            className={`text-[10px] font-semibold uppercase tracking-widest mt-1 ${
              service.highlight ? "text-slate-500" : "text-slate-400"
            }`}
          >
            {service.tagline}
          </span>
        </div>

        {/* Title */}
        <h3
          className={`text-base font-bold mb-2 ${
            service.highlight ? "text-white" : "text-[#090D1A]"
          }`}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p
          className={`text-xs leading-relaxed mb-5 ${
            service.highlight ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {service.description}
        </p>

        {/* Capability tags */}
        <div className="flex flex-wrap gap-1.5">
          {service.deliverables.map((item, idx) => (
            <span
              key={idx}
              className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                service.highlight
                  ? "bg-slate-800 text-slate-400"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Footer link */}
      <div className={`mt-5 pt-4 border-t ${service.highlight ? "border-slate-800" : "border-slate-100"}`}>
        <Link
          href={service.href}
          className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors duration-150 group/link ${
            service.highlight
              ? "text-blue-400 hover:text-blue-300"
              : "text-[#0055e5] hover:text-[#0047c5]"
          }`}
        >
          Details & deliverables
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover/link:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
