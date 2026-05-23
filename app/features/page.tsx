import Link from "next/link";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import { FeatureCards } from "@/components/public/FeatureCards";

export const metadata = {
  title: "Features — MemeLaunch OS",
  description: "Explore the full feature set of MemeLaunch OS: checklists, tasks, content planning, readiness scores, and more.",
};

const WORKFLOW = [
  { step: "01", title: "Create a workspace", body: "Set up your launch workspace in seconds. Invite your team when ready." },
  { step: "02", title: "Start a launch project", body: "Create a launch project with a ticker, chain, and target launch date." },
  { step: "03", title: "Work through the checklist", body: "Use a structured pre-launch checklist covering contracts, liquidity, socials, and community." },
  { step: "04", title: "Assign tasks", body: "Break the launch down into team tasks. Assign, prioritize, and track progress." },
  { step: "05", title: "Schedule content", body: "Plan your X, Telegram, and Discord posts for launch day and beyond." },
  { step: "06", title: "Monitor readiness", body: "Watch your launch readiness score climb as your team completes the plan." },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#05070d]">
      <PublicNav />

      <section className="max-w-7xl mx-auto px-6 pt-24 pb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
          Built for launch day. Not just launch week.
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Every feature in MemeLaunch OS is designed to help teams ship cleaner, coordinate better, and miss nothing.
        </p>
      </section>

      <FeatureCards />

      <section className="max-w-5xl mx-auto px-6 py-20 border-t border-white/8">
        <h2 className="text-2xl font-bold text-white mb-12 text-center">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORKFLOW.map((w) => (
            <div key={w.step} className="bg-[#0b1020] p-6 rounded-2xl border border-white/8">
              <div className="text-xs font-mono text-blue-500 mb-3">{w.step}</div>
              <h3 className="font-semibold text-white mb-2">{w.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 text-center border-t border-white/8">
        <h2 className="text-2xl font-bold text-white mb-4">Start your first launch project</h2>
        <p className="text-slate-400 mb-8">Free plan includes everything you need to get started.</p>
        <Link
          href="/register"
          className="inline-block px-8 py-4 bg-white text-[#05070d] rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
        >
          Get started free
        </Link>
      </section>

      <PublicFooter />
    </div>
  );
}
