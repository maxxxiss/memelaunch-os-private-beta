"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, LayoutDashboard, CheckSquare, ListTodo, Calendar, BarChart2 } from "lucide-react";
import { SignOutButton } from "@/components/auth/SignOutButton";

interface DashboardMobileNavProps {
  workspaceSlug: string;
  projectId?: string;
  projectName?: string;
}

export function DashboardMobileNav({ workspaceSlug, projectId, projectName }: DashboardMobileNavProps) {
  const [open, setOpen] = useState(false);
  const base = `/app/${workspaceSlug}`;

  const links = [
    { icon: LayoutDashboard, label: "Dashboard", href: base },
    ...(projectId
      ? [
          { icon: CheckSquare, label: "Checklist", href: `${base}/projects/${projectId}#checklist` },
          { icon: ListTodo, label: "Tasks", href: `${base}/projects/${projectId}#tasks` },
          { icon: Calendar, label: "Content Plan", href: `${base}/projects/${projectId}#content` },
          { icon: BarChart2, label: "Readiness", href: `${base}/projects/${projectId}#readiness` },
        ]
      : []),
  ];

  return (
    <>
      <button
        className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
      >
        <Menu className="w-5 h-5" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 z-50 w-64 bg-[#070b14] border-r border-white/8 flex flex-col md:hidden">
            <div className="p-4 border-b border-white/8 flex items-center justify-between">
              <Link href="/" className="text-sm font-bold text-white tracking-tight" onClick={() => setOpen(false)}>
                MemeLaunch OS
              </Link>
              <button onClick={() => setOpen(false)} className="p-1.5 text-slate-500 hover:text-white transition-colors" aria-label="Close navigation">
                <X className="w-4 h-4" />
              </button>
            </div>
            {projectId && projectName && (
              <div className="px-4 py-3 border-b border-white/8">
                <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-0.5">Current Project</p>
                <p className="text-xs text-slate-300 font-medium truncate">{projectName}</p>
              </div>
            )}
            <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto pt-3">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
                  <l.icon className="w-4 h-4 shrink-0" />
                  {l.label}
                </Link>
              ))}
            </nav>
            <div className="p-3 border-t border-white/8">
              <SignOutButton />
            </div>
          </div>
        </>
      )}
    </>
  );
}
