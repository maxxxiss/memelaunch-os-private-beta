"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderOpen, CheckSquare, ListTodo, Calendar, BarChart2, ChevronRight } from "lucide-react";
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
        "flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors",
        active
          ? "bg-white/8 text-white font-medium"
          : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
      )}
    >
      <Icon className="w-4 h-4 shrink-0" />
      {label}
    </Link>
  );
}

export function DashboardSidebar({ workspaceSlug, projectId, projectName }: DashboardSidebarProps) {
  const pathname = usePathname();
  const base = `/app/${workspaceSlug}`;
  const isDashboard = pathname === base;
  const isProject = !!projectId;

  return (
    <aside className="w-56 shrink-0 bg-[#070b14] border-r border-white/8 flex-col hidden md:flex min-h-screen">
      <div className="p-4 border-b border-white/8">
        <Link href="/" className="text-sm font-bold text-white tracking-tight">MemeLaunch OS</Link>
        <p className="text-xs text-slate-600 mt-0.5 truncate">/{workspaceSlug}</p>
      </div>

      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto pt-3">
        <NavItem icon={LayoutDashboard} label="Dashboard" href={base} active={isDashboard} />
        <NavItem icon={FolderOpen} label="Projects" href={base} active={false} />

        {isProject && (
          <>
            <div className="pt-4 pb-1 px-3">
              <p className="text-[10px] text-slate-600 uppercase tracking-widest font-semibold">Current Project</p>
            </div>
            <div className="px-3 py-2 flex items-center gap-2">
              <ChevronRight className="w-3 h-3 text-slate-600 shrink-0" />
              <span className="text-xs text-slate-400 truncate">{projectName ?? "Project"}</span>
            </div>
            <NavItem icon={CheckSquare} label="Checklist" href={`${base}/projects/${projectId}#checklist`} active={false} />
            <NavItem icon={ListTodo} label="Tasks" href={`${base}/projects/${projectId}#tasks`} active={false} />
            <NavItem icon={Calendar} label="Content Plan" href={`${base}/projects/${projectId}#content`} active={false} />
            <NavItem icon={BarChart2} label="Readiness" href={`${base}/projects/${projectId}#readiness`} active={false} />
          </>
        )}
      </nav>

      <div className="p-3 border-t border-white/8">
        <SignOutButton />
      </div>
    </aside>
  );
}
