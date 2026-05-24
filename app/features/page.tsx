import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import { LaunchCommandVisual } from "@/components/public/LaunchCommandVisual";
import { GlowCard, SectionLabel, StatusChip, VisualShell } from "@/components/ui/premium";
import { CalendarDays, CheckCircle2, Link2, Radar, Users2, Zap } from "lucide-react";

export const metadata = {
  title: "Features — MemeLaunch OS",
  description: "Explore MemeLaunch OS features: readiness, checklists, tasks, content planning, links, and workspace coordination.",
};

const modules = [
  { icon: Radar, title: "Readiness Engine", copy: "A live operational score from checklist progress, open tasks, content schedule, and required project links.", stat: "Live score" },
  { icon: CheckCircle2, title: "Launch Checklists", copy: "Keep contract, community, content, liquidity, and launch operations steps visible before launch day.", stat: "Pre-launch ops" },
  { icon: Zap, title: "Task Operations", copy: "Assign work, set priorities, track owners, and stop action items from disappearing in chat.", stat: "Team execution" },
  { icon: CalendarDays, title: "Content Planning", copy: "Schedule X, Telegram, Discord, and website content so launch messaging is ready before pressure hits.", stat: "Multi-channel" },
  { icon: Users2, title: "Workspace Coordination", copy: "One shared launch room for your team’s projects, status, links, and operational context.", stat: "Shared context" },
  { icon: Link2, title: "Project Links", copy: "Centralize X, Telegram, Discord, website, chart, and docs links for readiness and team reference.", stat: "Link control" },
];

export default function FeaturesPage() {
  return (
    <VisualShell>
      <PublicNav />
      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionLabel>Features</SectionLabel>
          <h1 className="text-5xl font-black leading-none tracking-[-0.05em] text-white md:text-6xl">A command center for every part of launch ops.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">MemeLaunch OS replaces scattered chats and docs with one operational system for planning, execution, and launch readiness.</p>
        </div>
        <LaunchCommandVisual />
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div><SectionLabel tone="cyan">Modules</SectionLabel><h2 className="text-4xl font-black tracking-[-0.04em] text-white">Built for launch-room execution.</h2></div>
          <p className="max-w-sm text-sm leading-6 text-slate-400">Each module is designed around operational clarity, not hype or trading automation.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <GlowCard key={module.title} className="p-6 transition hover:-translate-y-1 hover:border-blue-400/30">
              <div className="mb-6 flex items-center justify-between"><div className="rounded-2xl border border-white/10 bg-white/5 p-3"><module.icon className="h-5 w-5 text-blue-300" /></div><StatusChip>{module.stat}</StatusChip></div>
              <h3 className="text-lg font-bold text-white">{module.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{module.copy}</p>
            </GlowCard>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <GlowCard className="grid gap-8 p-8 md:grid-cols-3 md:p-10">
          {[
            ["01", "Create workspace", "Set the shared launch room."],
            ["02", "Build operations", "Checklist, tasks, content, links."],
            ["03", "Track readiness", "Know what is ready and missing."],
          ].map(([num, title, copy]) => (
            <div key={num} className="rounded-2xl border border-blue-500/15 bg-blue-500/5 p-5">
              <p className="font-mono text-[10px] text-blue-300">{num}</p>
              <p className="mt-4 text-base font-bold text-white">{title}</p>
              <p className="mt-2 text-sm text-slate-400">{copy}</p>
            </div>
          ))}
        </GlowCard>
      </section>
      <PublicFooter />
    </VisualShell>
  );
}
