import Link from "next/link";

interface DashboardSidebarProps {
  workspaceSlug: string;
}

export function DashboardSidebar({ workspaceSlug }: DashboardSidebarProps) {
  return (
    <aside className="w-64 bg-[#0b1020] border-r border-white/10 p-6 hidden md:block">
      <div className="mb-8">
        <div className="text-lg font-bold text-white tracking-tight">MemeLaunch OS</div>
        <div className="text-sm text-slate-300">/{workspaceSlug}</div>
      </div>
      <nav className="space-y-1">
        <div className="px-3 py-2 bg-[#111827] rounded-lg text-white text-sm font-medium">
          Dashboard
        </div>
        <div className="px-3 py-2 text-slate-300 text-sm hover:text-white cursor-pointer">
          Launch Projects
        </div>
        <div className="px-3 py-2 text-slate-300 text-sm hover:text-white cursor-pointer">
          Checklist
        </div>
        <div className="px-3 py-2 text-slate-300 text-sm hover:text-white cursor-pointer">
          Tasks
        </div>
        <div className="px-3 py-2 text-slate-300 text-sm hover:text-white cursor-pointer">
          Content Plan
        </div>
        <div className="px-3 py-2 text-slate-300 text-sm hover:text-white cursor-pointer">
          Community
        </div>
        <div className="px-3 py-2 text-slate-300 text-sm hover:text-white cursor-pointer">
          Alerts
        </div>
        <div className="px-3 py-2 text-slate-300 text-sm hover:text-white cursor-pointer">
          Metrics
        </div>
        <div className="px-3 py-2 text-slate-300 text-sm hover:text-white cursor-pointer">
          Settings
        </div>
      </nav>
    </aside>
  );
}
