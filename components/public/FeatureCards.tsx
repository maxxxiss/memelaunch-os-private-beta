import { CheckSquare, ListTodo, Calendar, BarChart2, Rocket, Users } from "lucide-react";

const FEATURES = [
  { icon: Rocket, accent: "text-blue-400", bg: "bg-blue-500/8 border-blue-500/15", title: "Launch Readiness Score", description: "A live score showing exactly how ready your launch is — based on checklist, tasks, links, and content." },
  { icon: CheckSquare, accent: "text-emerald-400", bg: "bg-emerald-500/8 border-emerald-500/15", title: "Pre-launch Checklist", description: "Token contract, liquidity, community setup, and announcements — never miss a step before going live." },
  { icon: ListTodo, accent: "text-indigo-400", bg: "bg-indigo-500/8 border-indigo-500/15", title: "Team Task Board", description: "Assign tasks, set priorities, track progress. Keep your whole team moving with one view." },
  { icon: Calendar, accent: "text-cyan-400", bg: "bg-cyan-500/8 border-cyan-500/15", title: "Content Planner", description: "Plan your X, Telegram, and Discord content before launch day. No more scrambling at zero hour." },
  { icon: BarChart2, accent: "text-violet-400", bg: "bg-violet-500/8 border-violet-500/15", title: "Launch Metrics", description: "Track holder count, volume, and community growth post-launch. Know what's working." },
  { icon: Users, accent: "text-amber-400", bg: "bg-amber-500/8 border-amber-500/15", title: "Team Workspaces", description: "One workspace per launch. Invite your team, share context, and keep operations synchronized." },
];

export function FeatureCards() {
  return (
    <section className="border-t border-white/8">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-4">WHAT&apos;S INSIDE</p>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
            Everything your launch needs.<br className="hidden md:block" /> Nothing it doesn&apos;t.
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto text-sm">
            Built for teams that need structure before the chaos starts.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="group bg-[#0d1117] border border-white/6 hover:border-white/12 p-6 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30">
              <div className={`inline-flex p-2.5 rounded-xl border mb-5 transition-transform group-hover:scale-110 ${f.bg}`}>
                <f.icon className={`w-4 h-4 ${f.accent}`} />
              </div>
              <h3 className="font-semibold text-white mb-2 text-sm">{f.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
