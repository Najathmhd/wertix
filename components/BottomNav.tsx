"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, FolderOpen, FileText, Mail } from "lucide-react";

const tabs = [
  { label: "Home",      href: "/",              icon: Home,       exact: true },
  { label: "Services",  href: "/services",      icon: Briefcase,  exact: false },
  { label: "Portfolio", href: "/portfolio",     icon: FolderOpen, exact: false },
  { label: "Quote",     href: "/request-quote", icon: FileText,   exact: false },
  { label: "Contact",   href: "/contact",       icon: Mail,       exact: false },
];

export default function BottomNav() {
  const pathname = usePathname();

  // Do not render public marketing bottom nav on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <nav
      aria-label="Mobile navigation"
      className={[
        "md:hidden", // only visible below md breakpoint
        "fixed bottom-0 left-0 right-0 z-50",
        "bg-white border-t border-slate-200",
        "flex items-stretch",
        // Safe area on notched devices
        "[padding-bottom:env(safe-area-inset-bottom,0px)]",
      ].join(" ")}
      style={{ height: "calc(64px + env(safe-area-inset-bottom, 0px))" }}
    >
      {tabs.map(({ label, href, icon: Icon, exact }) => {
        const active = exact ? pathname === href : (pathname === href || pathname.startsWith(href + "/"));
        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            aria-current={active ? "page" : undefined}
            className={[
              "relative flex-1 flex flex-col items-center justify-center gap-1 min-h-[44px] py-1",
              "transition-all duration-150 active:scale-95",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500",
              active
                ? "text-[#0055e5]"
                : "text-slate-500 hover:text-slate-800 active:text-slate-900",
            ].join(" ")}
          >
            {/* Active indicator bar */}
            <span
              className={[
                "absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2.5px] rounded-b-full transition-all duration-200",
                active ? "bg-[#0055e5] opacity-100" : "opacity-0",
              ].join(" ")}
              aria-hidden="true"
            />

            <Icon
              className={`transition-all duration-150 ${active ? "w-[21px] h-[21px]" : "w-[20px] h-[20px]"}`}
              strokeWidth={active ? 2.3 : 1.8}
              aria-hidden="true"
            />
            <span
              className={`text-[10px] leading-none tracking-tight transition-all duration-150 ${
                active ? "font-bold text-[#0055e5]" : "font-medium text-slate-500"
              }`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
