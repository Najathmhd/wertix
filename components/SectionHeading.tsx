import React from "react";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  inverted?: boolean;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "left",
  inverted = false,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`max-w-3xl ${
        isCenter ? "mx-auto text-center" : "text-left"
      } mb-12 lg:mb-16`}
    >
      {badge && (
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3.5 ${
            inverted
              ? "bg-blue-500/15 text-blue-400 border border-blue-400/25"
              : "bg-blue-50 text-[#0066FF] border border-blue-200/60"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
          <span>{badge}</span>
        </div>
      )}
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight ${
          inverted ? "text-white" : "text-[#090D1A]"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            inverted ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
