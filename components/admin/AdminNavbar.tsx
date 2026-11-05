"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  Building2,
  DollarSign,
  Menu,
  X,
  LogOut,
  ShieldCheck,
  Globe,
  ChevronRight,
} from "lucide-react";
import { WertixMark } from "@/components/Logo";
import type { SessionPayload } from "@/lib/session";

interface AdminNavbarProps {
  session: SessionPayload;
}

const navItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
    shortLabel: "Dashboard",
  },
  {
    name: "Requests",
    href: "/admin/requests",
    icon: FileText,
    exact: false,
    shortLabel: "Requests",
  },
  {
    name: "Projects",
    href: "/admin/projects",
    icon: Briefcase,
    exact: false,
    shortLabel: "Projects",
  },
  {
    name: "Workers",
    href: "/admin/workers",
    icon: Users,
    exact: false,
    shortLabel: "Workers",
  },
  {
    name: "Clients",
    href: "/admin/clients",
    icon: Building2,
    exact: false,
    shortLabel: "Clients",
  },
  {
    name: "Finances",
    href: "/admin/finances",
    icon: DollarSign,
    exact: false,
    shortLabel: "Finances",
  },
];

export default function AdminNavbar({ session }: AdminNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route navigation without triggering effect cascading render
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isLinkActive = (href: string, exact: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const formattedRole = (session?.role || "ADMIN")
    .replace("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <>
      {/* ── Top Header Bar ── */}
      <header className="bg-[#090D1A] text-white h-14 sticky top-0 z-50 border-b border-white/10 shadow-sm">
        <div className="h-full max-w-screen-xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3">

          {/* Left: Brand / Logo */}
          <Link
            href="/admin"
            className="inline-flex items-center gap-2.5 font-bold tracking-tight text-base group shrink-0"
            aria-label="WERTIX Admin Home"
          >
            <WertixMark className="w-7 h-7" variant="light" />
            <div className="flex items-center gap-1.5">
              <span className="text-white font-bold tracking-tight text-sm">WERTIX</span>
              <span className="text-slate-400 font-normal text-xs px-1.5 py-0.5 rounded bg-white/10 font-mono">
                Admin
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-1 text-sm"
            aria-label="Admin primary navigation"
          >
            {navItems.map((item) => {
              const active = isLinkActive(item.href, item.exact);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    active
                      ? "bg-white/15 text-white font-semibold shadow-inner"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? "text-[#3b82f6]" : "text-slate-400"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Desktop Profile + Sign out */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 border border-white/10 rounded-full py-1 px-3">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span className="truncate max-w-[150px]">{session.email}</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                {formattedRole}
              </span>
            </div>
            <form action="/api/auth/logout" method="post">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white hover:bg-white/10 px-2.5 py-1.5 rounded-md transition-colors"
                title="Sign out of Admin"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign out</span>
              </button>
            </form>
          </div>

          {/* Mobile Right: Hamburger Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            <span className="text-[11px] font-mono text-slate-400 truncate max-w-[120px] hidden xs:block">
              {session.email}
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              className="w-10 h-10 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center shrink-0 border border-white/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Slide-down Menu Drawer ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex flex-col top-14">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="relative w-full max-h-[calc(100vh-3.5rem)] overflow-y-auto bg-[#090D1A] border-b border-white/10 shadow-2xl flex flex-col">
            {/* User profile card */}
            <div className="p-4 bg-white/[0.04] border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 font-bold text-sm">
                  {session.name ? session.name[0].toUpperCase() : "A"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white truncate">
                    {session.name || "Administrator"}
                  </p>
                  <p className="text-xs text-slate-400 truncate">{session.email}</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30 shrink-0">
                  {formattedRole}
                </span>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="p-3 space-y-1" aria-label="Mobile admin navigation">
              <p className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Management Views
              </p>
              {navItems.map((item) => {
                const active = isLinkActive(item.href, item.exact);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      active
                        ? "bg-[#0055e5] text-white font-semibold shadow-md"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${active ? "text-white" : "text-slate-400"}`} />
                      <span>{item.name}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 ${active ? "text-white" : "text-slate-600"}`} />
                  </Link>
                );
              })}
            </nav>

            {/* Public site link & Logout */}
            <div className="p-3 mt-auto border-t border-white/10 space-y-2 bg-black/20">
              <Link
                href="/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-slate-500" />
                  <span>View Public Website</span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">wertix.lk ↗</span>
              </Link>

              <form action="/api/auth/logout" method="post" className="w-full">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold bg-red-500/10 text-red-300 border border-red-500/20 hover:bg-red-500/20 transition-all active:scale-[0.99]"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out of Admin</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile Quick Navigation Bottom Bar ── */}
      <nav
        aria-label="Admin mobile quick navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090D1A]/95 backdrop-blur-md border-t border-white/10 flex items-stretch [padding-bottom:env(safe-area-inset-bottom,0px)] shadow-[0_-4px_20px_rgba(0,0,0,0.4)]"
        style={{ height: "calc(58px + env(safe-area-inset-bottom, 0px))" }}
      >
        {navItems.map((item) => {
          const active = isLinkActive(item.href, item.exact);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.name}
              aria-current={active ? "page" : undefined}
              className={`relative flex-1 flex flex-col items-center justify-center gap-1 min-h-[44px] py-1 transition-all active:scale-95 ${
                active ? "text-white" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {/* Active top pill indicator */}
              <span
                className={`absolute top-0 left-1/2 -translate-x-1/2 w-6 h-[2.5px] rounded-b-full transition-all duration-200 ${
                  active ? "bg-[#3b82f6] opacity-100" : "opacity-0"
                }`}
                aria-hidden="true"
              />
              <Icon
                className={`w-4 h-4 transition-transform ${active ? "text-[#3b82f6] scale-110" : "text-slate-400"}`}
                strokeWidth={active ? 2.4 : 1.8}
              />
              <span
                className={`text-[9.5px] leading-none tracking-tight truncate max-w-[54px] ${
                  active ? "font-bold text-white" : "font-medium text-slate-400"
                }`}
              >
                {item.shortLabel}
              </span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
