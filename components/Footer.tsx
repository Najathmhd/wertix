"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Globe, ShieldCheck, ArrowRight } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const pathname = usePathname();

  // Do not render public marketing footer on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-[#090D1A] text-slate-400 border-t border-[#1e293b]">

      {/* ── Pre-footer CTA strip ── */}
      <div className="border-b border-[#1e293b]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
                Now Booking
              </p>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Have an ambitious digital project in mind?
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/request-quote"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#0055e5] text-white text-sm font-semibold hover:bg-[#0047c5] transition-colors duration-150"
              >
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-[#1e293b] text-slate-300 text-sm font-medium hover:border-slate-600 hover:text-white transition-colors duration-150"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main footer grid ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-12 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">

          {/* Brand column */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="light" />
            <p className="text-sm leading-relaxed max-w-xs text-slate-500">
              End-to-end managed digital services — design, web, data, and ongoing operations — with dedicated domain specialists.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
                <span>wertix.lk · Colombo, Sri Lanka & Global Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
                <a href="mailto:wertix.global@gmail.com" className="hover:text-white transition-colors duration-150">
                  wertix.global@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-600" aria-hidden="true" />
                <span>Confidentiality & milestone-based agreements</span>
              </div>
            </div>
          </div>

          {/* Service Pillars */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Services
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Design & Branding",  href: "/services#design" },
                { label: "Web & Technology",   href: "/services#web" },
                { label: "Data & AI",          href: "/services#data" },
                { label: "Marketing & Video",  href: "/services#marketing" },
                { label: "Business Support",   href: "/services#support" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "About WERTIX",          href: "/about" },
                { label: "Delivery Process",      href: "/#process" },
                { label: "Sample Work",           href: "/portfolio" },
                { label: "FAQs & Policies",       href: "/faq" },
                { label: "Request a Quote",       href: "/request-quote" },
                { label: "Contact",               href: "/contact" },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Operating Model */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Model
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              {[
                "Dedicated Project Lead",
                "Transparent Sprints",
                "Senior Specialists",
                "Quality Reviews",
                "Clear IP Ownership",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[#1e293b] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
          <p>© 2026 WERTIX. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>wertix.lk</span>
            <span>Prototype Preview</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
