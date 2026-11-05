"use client";

import React from "react";

const disciplines = [
  "DESIGN & BRANDING",
  "WEB & TECHNOLOGY",
  "DATA & AI",
  "DIGITAL SOLUTIONS",
  "BUSINESS SUPPORT",
];

// Double the set so both halves are wide enough to span even ultrawide screens
const sequence = [...disciplines, ...disciplines];

export default function MarqueeStrip() {
  return (
    <section
      aria-label="Core service disciplines"
      className="relative w-full overflow-hidden border-b border-slate-200 bg-slate-50/75 py-3 sm:py-3.5 select-none"
    >
      {/* Edge gradient masks for smooth transition */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-10"
        aria-hidden="true"
      />

      <div
        tabIndex={0}
        aria-label="Scrolling disciplines strip. Hover or focus to pause."
        className="group flex w-max items-center animate-marquee focus-visible:outline-hidden"
      >
        {/* Primary copy */}
        <div className="flex items-center shrink-0">
          {sequence.map((item, idx) => (
            <span key={`p-${idx}`} className="flex items-center shrink-0">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-slate-500">
                {item}
              </span>
              <span
                className="mx-4 sm:mx-6 text-[#0055e5] text-xs font-bold select-none"
                aria-hidden="true"
              >
                ·
              </span>
            </span>
          ))}
        </div>

        {/* Seamless duplicate copy */}
        <div className="flex items-center shrink-0" aria-hidden="true">
          {sequence.map((item, idx) => (
            <span key={`d-${idx}`} className="flex items-center shrink-0">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-slate-500">
                {item}
              </span>
              <span
                className="mx-4 sm:mx-6 text-[#0055e5] text-xs font-bold select-none"
                aria-hidden="true"
              >
                ·
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
