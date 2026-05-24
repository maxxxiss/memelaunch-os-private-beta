"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CheckSquare, ListTodo, Calendar, BarChart2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { SignOutButton } from "@/components/auth/SignOutButton";

interface DashboardSidebarProps {
  workspaceSlug: string;
  projectId?: string;
  projectName?: string;
}

function NavItem({ icon: Icon, label, href, active }: { icon: React.ElementType; label: string; href: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-all",
        active
          ? "border-l-2 border-blue-400 border-y border-r border-blue-400/25 bg-blue-500/10 text-white shadow-glow-blue/40"
          : "text-slate-500 hover:bg-white/[0.04] hover:text-slate-200"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </Link>
  );
}

export function DashboardSidebar({ workspaceSlug, projectId, projectName }: DashboardSidebarProps) {
  const pathname = usePathname();
  const base = `/app/${workspaceSlug}`;
  const isDashboard = pathname === base;
  const isProject = !!projectId;

  return (
    <aside className="hidden min-h-screen w-[240px] shrink-0 border-r border-white/8 bg-[#040810]/98 backdrop-blur-xl md:flex md:flex-col">
      <div className="border-b border-white/8 p-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-500/25 to-violet-500/15 shadow-glow-blue/30">
            <svg viewBox="0 0 16 16" className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor">
              <path d="M4 12 L8 4 L12 12" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="8" cy="4" r="1.5" fill="currentColor" />
            </svg>
          </div>
          MemeLaunch OS
        </Link>
        <div className="mt-3 rounded-2xl border border-white/8 bg-white/[0.03] p-3 bg-gradient-to-br from-blue-500/8 to-transparent">
          <p className="text-[9px] font-semibold uppercase tracking-widest text-slate-600">Workspace</p>
          <p className="mt-1.5 truncate text-sm font-bold text-slate-200">/{workspaceSlug}</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        <NavItem icon={LayoutDashboard} label="Dashboard" href={base} active={isDashboard} />
        {isProject && (
          <>
            <div className="px-3 pb-1 pt-5"><p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">Launch room</p></div>
            <div className="mb-2 flex items-center gap-2 rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-3">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              <span className="truncate text-xs font-medium text-slate-300">{projectName ?? "Project"}</span>
            </div>
            <NavItem icon={CheckSquare} label="Checklist" href={`${base}/projects/${projectId}#checklist`} active={false} />
            <NavItem icon={ListTodo} label="Tasks" href={`${base}/projects/${projectId}#tasks`} active={false} />
            <NavItem icon={Calendar} label="Content Plan" href={`${base}/projects/${projectId}#content`} active={false} />
            <NavItem icon={BarChart2} label="Readiness" href={`${base}/projects/${projectId}#readiness`} active={false} />
          </>
        )}
      </nav>
      <div className="border-t border-white/10 p-3"><SignOutButton /></div>
    </aside>
  );
}
