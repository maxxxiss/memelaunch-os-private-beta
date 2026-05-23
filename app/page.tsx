import Link from "next/link";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import { FeatureCards } from "@/components/public/FeatureCards";

const FAQ = [
  {
    q: "What is MemeLaunch OS?",
    a: "MemeLaunch OS is a launch planning platform for memecoin and crypto teams. It gives your team one place to manage checklists, tasks, content schedules, and launch readiness.",
  },
  {
    q: "Is this financial or investment advice?",
    a: "No. MemeLaunch OS is planning and coordination software. It does not provide financial advice, investment recommendations, or token issuance guidance.",
  },
  {
    q: "What does the free plan include?",
    a: "The free plan includes 1 workspace, 1 launch project, the full checklist, task management, and content planner.",
  },
  {
    q: "Can I upgrade later?",
    a: "Yes. Upgrade to Pro or Team at any time from the pricing page. Your workspace and data carry over.",
  },
  {
    q: "How does the readiness score work?",
    a: "The readiness score is calculated from your checklist completion, open tasks, and scheduled content. It gives your team a live percentage of launch readiness.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#05070d]">
      <PublicNav />

      <section className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-medium mb-8">
            Launch infrastructure for crypto teams
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
            Launch memecoins with an operating system,{" "}
            <span className="text-slate-500">not a group chat.</span>
          </h1>
          <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-2xl">
            Plan launches, assign tasks, track readiness, schedule content, and coordinate your team from one clean dashboard.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/register"
              className="px-6 py-3 bg-white text-[#05070d] rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors"
            >
              Start free
            </Link>
            <Link
              href="/pricing"
              className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-medium text-sm hover:bg-white/10 transition-colors"
            >
              View pricing
            </Link>
          </div>
        </div>
      </section>

      <FeatureCards />

      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">Simple, transparent pricing</h2>
          <p className="text-slate-400">Start free. Upgrade when your team grows.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {["Free — $0/month", "Pro — $29/month", "Team — $99/month"].map((p) => (
            <div key={p} className="px-5 py-3 bg-[#0b1020] border border-white/8 rounded-xl text-sm text-slate-300">
              {p}
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/pricing" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            See full plan comparison →
          </Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-20 border-t border-white/8">
        <h2 className="text-2xl font-bold text-white mb-10 text-center">Frequently asked questions</h2>
        <div className="space-y-6">
          {FAQ.map((item) => (
            <div key={item.q} className="border-b border-white/8 pb-6">
              <h3 className="font-semibold text-white mb-2">{item.q}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to run a structured launch?</h2>
        <p className="text-slate-400 mb-8">Free to start. No credit card required.</p>
        <Link
          href="/register"
          className="inline-block px-8 py-4 bg-white text-[#05070d] rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
        >
          Create your workspace
        </Link>
      </section>

      <PublicFooter />
    </div>
  );
}
