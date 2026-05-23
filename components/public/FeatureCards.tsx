import { CheckSquare, ListTodo, Calendar, BarChart2, Rocket, Users } from "lucide-react";

const FEATURES = [
  {
    icon: Rocket,
    title: "Launch Readiness Score",
    description: "Know exactly where your launch stands. A live readiness score based on checklist, tasks, and content.",
  },
  {
    icon: CheckSquare,
    title: "Pre-launch Checklist",
    description: "Never miss a launch step. Token contract, liquidity, announcements — all tracked in one place.",
  },
  {
    icon: ListTodo,
    title: "Team Task Board",
    description: "Assign tasks to your team. Track what's open, in progress, and done across your launch.",
  },
  {
    icon: Calendar,
    title: "Content Planner",
    description: "Plan X, Telegram, and Discord posts before launch day. Coordinate your entire content push.",
  },
  {
    icon: BarChart2,
    title: "Launch Metrics",
    description: "Track holder count, volume, and community growth post-launch from your dashboard.",
  },
  {
    icon: Users,
    title: "Workspace Coordination",
    description: "Invite your team, share your workspace, and keep everyone aligned from concept to live.",
  },
];

export function FeatureCards() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
          Everything your launch needs. Nothing it doesn&apos;t.
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Built for teams that want structure before the chaos starts.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="bg-[#0b1020] p-6 rounded-2xl border border-white/8 hover:border-white/15 transition-colors"
          >
            <f.icon className="w-5 h-5 text-blue-400 mb-4" />
            <h3 className="font-semibold text-white mb-2">{f.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
