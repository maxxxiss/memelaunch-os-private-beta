"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function PublicNav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#05070d]/75 backdrop-blur-xl relative">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-white tracking-tight" onClick={() => setOpen(false)}>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-blue-400/30 bg-gradient-to-br from-blue-500/25 to-violet-500/15 shadow-glow-blue/30">
            <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-blue-300" fill="none" stroke="currentColor">
              <path d="M4 12 L8 4 L12 12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="8" cy="4" r="1.5" fill="currentColor" />
            </svg>
          </div>
          <span>MemeLaunch OS</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-slate-400 hover:text-white transition-colors">{l.label}</Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors">Sign in</Link>
          <Link href="/register" className="px-4 py-2 bg-white text-[#05070d] rounded-xl text-sm font-bold shadow-cta hover:bg-blue-50 transition hover:-translate-y-0.5">
            Get started free
          </Link>
        </div>
        <button className="md:hidden p-2 text-slate-400 hover:text-white transition-colors" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
      {open && (
        <div className="absolute top-full left-0 right-0 bg-[#05070d]/98 backdrop-blur-2xl border-b border-white/10 px-6 pb-5 md:hidden z-50">
          <div className="flex flex-col pt-2">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                className="text-sm text-slate-300 hover:text-white py-3 border-b border-white/5 last:border-0 transition-colors">
                {l.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-4">
              <Link href="/login" onClick={() => setOpen(false)}
                className="flex-1 py-2.5 text-center text-sm text-slate-300 border border-white/10 rounded-xl hover:bg-white/[0.03] transition-colors">
                Sign in
              </Link>
              <Link href="/register" onClick={() => setOpen(false)}
                className="flex-1 py-2.5 text-center bg-white text-[#05070d] rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors shadow-cta">
                Get started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
