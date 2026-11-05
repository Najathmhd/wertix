"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected client error to monitoring in production
    console.error("Client runtime error caught:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 sm:py-24 bg-white">
      <div className="max-w-xl mx-auto px-5 sm:px-8 text-center space-y-6">
        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
          <AlertCircle className="w-6 h-6" />
        </div>
        <span className="inline-block text-[11px] font-semibold tracking-[0.16em] uppercase text-amber-700 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 font-mono">
          System Notice
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#090D1A] tracking-tight">
          An unexpected interface error occurred.
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
          We encountered an issue rendering this view. You can attempt to reload the component or return to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#090D1A] text-white text-sm font-semibold hover:bg-[#0055e5] transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-slate-300 text-[#090D1A] text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
