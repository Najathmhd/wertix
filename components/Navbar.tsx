"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "About", href: "/about" },
  { name: "FAQ", href: "/faq" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Reset menu on pathname change without triggering effect cascading render
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  // Do not render public marketing navbar on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled || menuOpen
          ? "bg-white shadow-[0_1px_0_0_#e2e8f0]"
          : "bg-white/95 backdrop-blur-sm shadow-[0_1px_0_0_#e2e8f0]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-[62px]">

          {/* ── Brand ── */}
          <Logo />

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Primary navigation">
            {navLinks.map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 py-2 rounded-md text-[13.5px] font-medium transition-colors duration-150 ${
                    active
                      ? "text-[#0055e5] bg-blue-50"
                      : "text-slate-600 hover:text-[#090D1A] hover:bg-slate-100"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/request-quote"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#090D1A] text-white text-[13.5px] font-medium hover:bg-[#0055e5] active:scale-[0.98] transition-all duration-150"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* ── Mobile Action & Menu Toggle ── */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:hidden shrink-0">
            <Link
              href="/request-quote"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#090D1A] text-white text-xs font-semibold hover:bg-[#0055e5] active:scale-95 transition-all duration-150 min-h-[36px]"
              aria-label="Start a project / Request a quote"
            >
              <span>Quote</span>
              <ArrowRight className="w-3 h-3 shrink-0" />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              className="w-10 h-10 rounded-lg text-slate-700 hover:text-[#090D1A] hover:bg-slate-100 active:scale-95 transition-all duration-150 flex items-center justify-center shrink-0"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile slide-down menu sheet ── */}
      {menuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-slate-200 bg-white/98 backdrop-blur-md px-5 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-1 duration-150"
        >
          <div className="mb-3 px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-600">Have a new project?</span>
            <Link
              href="/request-quote"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#0055e5] hover:underline"
            >
              Scoping tool <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <nav className="flex flex-col space-y-1" aria-label="Mobile full navigation">
            {[
              { name: "Services", href: "/services", desc: "Design, Web, Data & AI, Marketing, Business" },
              { name: "Portfolio & Concepts", href: "/portfolio", desc: "Sample architectures and demonstrative prototypes" },
              { name: "About WERTIX", href: "/about", desc: "Our managed digital services model & standards" },
              { name: "FAQ", href: "/faq", desc: "Pricing, milestone, and delivery policies" },
              { name: "Request a Quote", href: "/request-quote", desc: "Interactive project scoping blueprint tool" },
              { name: "Contact", href: "/contact", desc: "Direct inquiries and specialist requests" },
            ].map((link) => {
              const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex flex-col p-3 rounded-lg transition-colors duration-150 ${
                    active ? "bg-blue-50 text-[#0055e5]" : "hover:bg-slate-50 text-slate-900 active:bg-slate-100"
                  }`}
                >
                  <span className="text-sm font-semibold flex items-center justify-between">
                    {link.name}
                    <ArrowRight className={`w-3.5 h-3.5 ${active ? "text-[#0055e5]" : "opacity-40"}`} />
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5">{link.desc}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Direct Email:</span>
            <a href="mailto:wertix.global@gmail.com" className="font-semibold text-[#0055e5] hover:underline">
              wertix.global@gmail.com
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
