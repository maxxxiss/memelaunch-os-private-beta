import Link from "next/link";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import { FeatureCards } from "@/components/public/FeatureCards";
import { LaunchWorkflow } from "@/components/public/LaunchWorkflow";

export const metadata = {
  title: "Features — MemeLaunch OS",
  description: "Explore the full feature set of MemeLaunch OS: checklists, tasks, content planning, readiness scores, and more.",
};

const MODULES = [
  {
    tag: "Readiness Engine",
    title: "Know exactly how ready you are.",
    body: "A live readiness score calculated from checklist completion, open tasks, scheduled content, and key links. Your team always knows where things stand.",
    stats: [{ n: "100%", d: "Score cap" }, { n: "5", d: "Score factors" }, { n: "Live", d: "Updated in real-time" }],
    accent: "border-blue-500/20 bg-blue-500/4",
    tag_color: "text-blue-400",
  },
  {
    tag: "Task Operations",
    title: "Assign, track, and ship.",
    body: "Create tasks for any team member with priority levels and due dates. Track everything in one board from to-do to done.",
    stats: [{ n: "3", d: "Priority levels" }, { n: "3", d: "Status stages" }, { n: "Team", d: "Assignable" }],
    accent: "border-cyan-500/20 bg-cyan-500/4",
    tag_color: "text-cyan-400",
  },
  {
    tag: "Content Calendar",
    title: "Never scramble on launch day.",
    body: "Plan X, Telegram, Discord, and website posts in advance. Organize by platform, schedule by date, and track publishing status.",
    stats: [{ n: "4+", d: "Platforms" }, { n: "Draft → Live", d: "Workflow" }, { n: "Pre-launch", d: "Planning" }],
    accent: "border-violet-500/20 bg-violet-500/4",
    tag_color: "text-violet-400",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#05070d]">
      <PublicNav />

      <section className="relative overflow-hidden hero-glow grid-bg">
        <div className="max-w-4xl mx-auto px-6 pt-28 pb-20 text-center">
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-semibold mb-5">WHAT YOU GET</p>
          <h1 className="text-5xl font-bold text-white tracking-tight mb-5 leading-[1.06]">
            Built for launch day.<br className="hidden md:block" /> Not just launch week.
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
            Every module in MemeLaunch OS is purpose-built to keep crypto launch teams organized, aligned, and ready.
          </p>
        </div>
      </section>

      <FeatureCards />

      {/* Module deep-dives */}
      <section className="border-t border-white/8 bg-[#030507]">
        <div className="max-w-5xl mx-auto px-6 py-20 space-y-6">
          <div className="text-center mb-14">
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-semibold mb-4">CORE MODULES</p>
            <h2 className="text-3xl font-bold text-white tracking-tight">The engine behind every launch.</h2>
          </div>
          {MODULES.map((m) => (
            <div key={m.tag} className={`p-8 rounded-2xl border ${m.accent}`}>
              <p className={`text-[10px] uppercase tracking-widest font-bold mb-3 ${m.tag_color}`}>{m.tag}</p>
              <h3 className="text-xl font-bold text-white mb-3">{m.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xl">{m.body}</p>
              <div className="flex gap-6">
                {m.stats.map((s) => (
                  <div key={s.d}>
                    <p className="text-lg font-bold text-white">{s.n}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wide">{s.d}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <LaunchWorkflow />

      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/8 text-center">
        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-semibold mb-5">GET STARTED</p>
        <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Start your first launch project</h2>
        <p className="text-slate-500 text-sm mb-8">Free plan. No credit card required.</p>
        <Link href="/register" className="inline-block px-8 py-4 bg-white text-[#05070d] rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors shadow-lg shadow-white/10">
          Get started free
        </Link>
      </section>

      <PublicFooter />
    </div>
  );
}
