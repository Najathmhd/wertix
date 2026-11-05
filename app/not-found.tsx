import React from "react";
import Link from "next/link";
import { Home, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 sm:py-24 bg-white">
      <div className="max-w-xl mx-auto px-5 sm:px-8 text-center space-y-6">
        <span className="inline-block text-[11px] font-semibold tracking-[0.16em] uppercase text-[#0055e5] px-3 py-1 rounded-full bg-blue-50 border border-blue-100 font-mono">
          404 · Page Not Found
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#090D1A] tracking-tight">
          We couldn&apos;t locate that page.
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-md mx-auto">
          The link you followed may be outdated, or the URL might have been mistyped.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#090D1A] text-white text-sm font-semibold hover:bg-[#0055e5] transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-slate-300 text-[#090D1A] text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Services</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
