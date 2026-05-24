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
          ? "border border-blue-400/20 bg-blue-500/12 text-white shadow-lg shadow-blue-500/10"
          : "text-slate-500 hover:bg-white/5 hover:text-slate-200"
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
    <aside className="hidden min-h-screen w-64 shrink-0 border-r border-white/10 bg-[#050914]/95 md:flex md:flex-col">
      <div className="border-b border-white/10 p-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-white">
          <span className="grid h-8 w-8 place-items-center rounded-xl border border-blue-400/25 bg-blue-500/15 text-blue-200">M</span>
          MemeLaunch OS
        </Link>
        <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.03] p-3">
          <p className="text-[10px] uppercase tracking-widest text-slate-600">Workspace</p>
          <p className="mt-1 truncate text-sm font-semibold text-slate-300">/{workspaceSlug}</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        <NavItem icon={LayoutDashboard} label="Dashboard" href={base} active={isDashboard} />
        {isProject && (
          <>
            <div className="px-3 pb-1 pt-5"><p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">Launch room</p></div>
            <div className="mb-2 flex items-center gap-2 rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-3">
              <ChevronRight className="h-3 w-3 shrink-0 text-blue-300" />
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
