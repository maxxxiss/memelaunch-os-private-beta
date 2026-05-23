import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import { FeatureCards } from "@/components/public/FeatureCards";
import { LaunchCommandVisual } from "@/components/public/LaunchCommandVisual";
import { LaunchWorkflow } from "@/components/public/LaunchWorkflow";

const FAQ = [
  { q: "What is MemeLaunch OS?", a: "A launch command center for memecoin and crypto teams. Plan launches, assign tasks, track readiness, schedule content, and coordinate your team from one place." },
  { q: "Is this financial or investment advice?", a: "No. MemeLaunch OS is planning and coordination software only. It does not provide financial advice, investment recommendations, or token issuance guidance." },
  { q: "What does the free plan include?", a: "1 workspace, 1 launch project, the full pre-launch checklist, task management, and content planner. Free forever." },
  { q: "Can I upgrade later?", a: "Yes. Upgrade to Pro or Team at any time. Your workspace and all data carry over instantly." },
  { q: "How does the readiness score work?", a: "Calculated from checklist completion, open tasks, scheduled content, and key links. It gives your team a live launch readiness percentage." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#05070d]">
      <PublicNav />

      {/* Hero */}
      <section className="relative overflow-hidden hero-glow grid-bg">
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-bold mb-8 tracking-[0.15em] uppercase">
              Launch Command Center
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.06] max-w-[520px]">
              Launch memecoins with an OS,{" "}
              <span className="text-slate-500">not a group chat.</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-lg">
              Plan launches, assign tasks, track readiness, schedule content, and coordinate your team — from one command center.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="/register" className="px-7 py-3.5 bg-white text-[#05070d] rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors glow-blue">
                Start free
              </Link>
              <Link href="/pricing" className="px-7 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl font-medium text-sm hover:bg-white/10 transition-colors">
                View pricing
              </Link>
            </div>
            <div className="flex flex-wrap gap-4 text-[11px] text-slate-600">
              <span>No credit card required</span>
              <span className="text-slate-700">·</span>
              <span>Free plan forever</span>
              <span className="text-slate-700">·</span>
              <span>Solana-ready</span>
            </div>
            {/* Mobile hero stat strip — shown only when visual is hidden */}
            <div className="flex gap-4 mt-8 lg:hidden">
              {[{ n: "74%", l: "Readiness" }, { n: "18/24", l: "Checklist" }, { n: "8", l: "Open tasks" }].map((s) => (
                <div key={s.l} className="bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-center">
                  <p className="text-base font-bold text-white">{s.n}</p>
                  <p className="text-[10px] text-slate-500">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <LaunchCommandVisual />
          </div>
        </div>
      </section>

      <LaunchWorkflow />
      <FeatureCards />

      {/* Pricing teaser */}
      <section className="max-w-4xl mx-auto px-6 py-20 border-t border-white/8">
        <div className="text-center mb-10">
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-semibold mb-4">PRICING</p>
          <h2 className="text-2xl font-bold text-white mb-3">Simple pricing for launch teams</h2>
          <p className="text-slate-500 text-sm">Start free. Upgrade when you scale.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { plan: "Free", price: "$0", note: "1 project · forever free", cta: "Get started", href: "/register", highlight: false },
            { plan: "Pro", price: "$29", note: "Unlimited projects & workspaces", cta: "Get Pro", href: "/pricing", highlight: true },
            { plan: "Team", price: "$99", note: "Team collaboration & role access", cta: "Get Team", href: "/pricing", highlight: false },
          ].map((p) => (
            <div key={p.plan} className={`p-5 rounded-2xl border flex flex-col gap-3 ${p.highlight ? "bg-blue-500/8 border-blue-500/25 shadow-lg shadow-blue-500/8" : "bg-[#0d1117] border-white/8"}`}>
              <div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-semibold">{p.plan}</div>
                <div className="text-3xl font-bold text-white mb-0.5">{p.price}<span className="text-sm text-slate-500 font-normal">/mo</span></div>
                <div className="text-xs text-slate-500">{p.note}</div>
              </div>
              <Link href={p.href} className={`block w-full py-2 rounded-lg text-xs font-semibold text-center transition-colors ${p.highlight ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-white/5 border border-white/8 hover:bg-white/10 text-white"}`}>
                {p.cta}
              </Link>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/pricing" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">See full plan comparison →</Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/8">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently asked questions</h2>
        <div>
          {FAQ.map((item) => (
            <details key={item.q} className="group border-b border-white/8">
              <summary className="py-5 cursor-pointer flex items-center justify-between font-semibold text-white text-sm list-none hover:text-slate-200 transition-colors">
                {item.q}
                <ChevronDown className="w-4 h-4 text-slate-500 group-open:rotate-180 transition-transform shrink-0 ml-4" />
              </summary>
              <p className="pb-5 text-sm text-slate-400 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/8">
        <div className="cta-glow bg-[#080e1c] border border-blue-500/12 rounded-3xl p-14 text-center">
          <p className="text-[10px] text-blue-400 uppercase tracking-[0.2em] font-semibold mb-4">Get started today</p>
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Run a structured launch.<br className="hidden md:block" /> Not a chaotic one.</h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">Free to start. No credit card required. Upgrade when you scale.</p>
          <Link href="/register" className="inline-block px-9 py-4 bg-white text-[#05070d] rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors glow-blue">
            Create your workspace
          </Link>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
