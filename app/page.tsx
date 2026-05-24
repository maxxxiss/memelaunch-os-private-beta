import Link from "next/link";
import { ChevronDown, MessageCircle, CheckCircle2, CalendarDays, Users2, Link2, Radar, Zap } from "lucide-react";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import { LaunchCommandVisual } from "@/components/public/LaunchCommandVisual";
import { GlowCard, PremiumCTA, SectionLabel, VisualShell, StatusChip } from "@/components/ui/premium";

const problems = ["Tasks buried in Telegram", "No shared launch checklist", "Content planned too late", "Readiness lives in someone’s head"];
const modules = [
  { icon: Radar, title: "Launch Readiness", copy: "Track checklist progress, open tasks, scheduled content, and key links in one live score.", tone: "blue" },
  { icon: CheckCircle2, title: "Pre-launch Checklist", copy: "Keep contract, community, liquidity, brand, and launch ops steps visible to the whole team.", tone: "emerald" },
  { icon: Zap, title: "Task Operations", copy: "Assign owners, priorities, due dates, and statuses before launch week gets noisy.", tone: "cyan" },
  { icon: CalendarDays, title: "Content Planning", copy: "Schedule X, Telegram, Discord, and website content so the launch narrative is ready.", tone: "violet" },
  { icon: Users2, title: "Workspace Coordination", copy: "Give the team one operating layer instead of scattered spreadsheets and pinned messages.", tone: "blue" },
  { icon: Link2, title: "Project Links", copy: "Centralize X, Telegram, Discord, website, chart, and docs links for launch readiness.", tone: "emerald" },
];
const workflow = ["Workspace", "Project", "Checklist", "Tasks", "Content", "Readiness"];
const faq = [
  { q: "What is MemeLaunch OS?", a: "A launch command center for memecoin and crypto teams. It organizes projects, tasks, readiness, links, and content planning." },
  { q: "Is this a trading product?", a: "No. MemeLaunch OS is planning and coordination software only. It does not trade, automate buys, or provide investment advice." },
  { q: "Can I start free?", a: "Yes. The Free plan lets you create your first workspace and launch project without a credit card." },
  { q: "What does Pro unlock?", a: "Pro is built for teams running more launches with more workspaces, projects, exports, and templates." },
];

export default function HomePage() {
  return (
    <VisualShell>
      <PublicNav />
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 pb-20 pt-24 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:pt-28">
        <div>
          <SectionLabel>Launch Command Center</SectionLabel>
          <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.05em] text-white md:text-7xl">
            Launch memecoins with an operating system, not a group chat.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
            Plan launches, assign tasks, track readiness, schedule content, and coordinate your team from one command center.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <PremiumCTA href="/register">Start free</PremiumCTA>
            <Link href="/pricing" className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/12 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              View pricing
            </Link>
          </div>
          <div className="mt-7 grid grid-cols-3 gap-3 text-center sm:max-w-lg">
            {["No card", "Free plan", "Stripe billing"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-3 text-[11px] font-medium text-slate-400">{item}</div>
            ))}
          </div>
        </div>
        <LaunchCommandVisual />
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-5 lg:grid-cols-2">
          <GlowCard className="p-7"><SectionLabel tone="violet">Before</SectionLabel><h2 className="text-3xl font-bold tracking-tight text-white">Launch chaos starts in chat.</h2><div className="mt-6 space-y-3">{problems.map((item) => (<div key={item} className="flex items-center gap-3 rounded-2xl border border-red-500/10 bg-red-500/5 p-4 text-sm text-slate-300"><MessageCircle className="h-4 w-4 text-red-300" />{item}</div>))}</div></GlowCard>
          <GlowCard className="p-7"><SectionLabel tone="emerald">After</SectionLabel><h2 className="text-3xl font-bold tracking-tight text-white">MemeLaunch OS turns it into launch operations.</h2><div className="mt-6 grid grid-cols-2 gap-3">{["Plan", "Assign", "Track", "Schedule", "Coordinate", "Launch"].map((item) => (<div key={item} className="rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-4"><CheckCircle2 className="mb-3 h-4 w-4 text-emerald-300" /><p className="text-sm font-semibold text-white">{item}</p></div>))}</div></GlowCard>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 max-w-2xl"><SectionLabel tone="cyan">Product Modules</SectionLabel><h2 className="text-4xl font-black tracking-[-0.04em] text-white">The operating layer for launch teams.</h2></div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{modules.map((module) => (<GlowCard key={module.title} className="group p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30"><div className="mb-6 flex items-center justify-between"><div className="rounded-2xl border border-white/10 bg-white/5 p-3"><module.icon className="h-5 w-5 text-blue-300" /></div><StatusChip tone={module.tone as "blue"}>Live module</StatusChip></div><h3 className="text-lg font-bold text-white">{module.title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{module.copy}</p></GlowCard>))}</div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20"><GlowCard className="p-8 md:p-10"><SectionLabel>Workflow</SectionLabel><div className="grid gap-5 md:grid-cols-6">{workflow.map((step, index) => (<div key={step} className="relative rounded-2xl border border-blue-500/15 bg-blue-500/5 p-5"><p className="text-[10px] font-mono text-blue-300">0{index + 1}</p><p className="mt-3 text-sm font-bold text-white">{step}</p></div>))}</div></GlowCard></section>
      <section className="mx-auto max-w-6xl px-6 py-20"><div className="grid gap-4 md:grid-cols-3">{[{ plan: "Free", price: "$0", copy: "Start your first launch command center.", href: "/register" }, { plan: "Pro", price: "$29", copy: "Unlimited projects and workspaces for active teams.", href: "/pricing" }, { plan: "Team", price: "$99", copy: "Team operations, role access, and activity context.", href: "/pricing" }].map((plan) => (<GlowCard key={plan.plan} className={`p-6 ${plan.plan === "Pro" ? "border-blue-400/30 bg-blue-500/10" : ""}`}><p className="text-xs font-bold uppercase tracking-widest text-blue-300">{plan.plan}</p><p className="mt-3 text-4xl font-black text-white">{plan.price}<span className="text-sm font-medium text-slate-500">/mo</span></p><p className="mt-3 min-h-12 text-sm leading-6 text-slate-400">{plan.copy}</p><Link href={plan.href} className="mt-6 inline-flex w-full justify-center rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#05070d] transition hover:bg-blue-50">Choose {plan.plan}</Link></GlowCard>))}</div></section>
      <section className="mx-auto max-w-3xl px-6 py-16"><h2 className="mb-8 text-center text-3xl font-black tracking-tight text-white">Questions before launch?</h2>{faq.map((item) => (<details key={item.q} className="group border-b border-white/10 py-2"><summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-bold text-white">{item.q}<ChevronDown className="h-4 w-4 text-slate-500 transition group-open:rotate-180" /></summary><p className="pb-5 text-sm leading-6 text-slate-400">{item.a}</p></details>))}</section>
      <section className="mx-auto max-w-7xl px-6 py-20"><GlowCard className="p-10 text-center md:p-16"><SectionLabel>Start now</SectionLabel><h2 className="text-4xl font-black tracking-[-0.04em] text-white md:text-5xl">Create your launch command center.</h2><p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-400">Free to start. Upgrade when your team needs more launch capacity.</p><div className="mt-8"><PremiumCTA href="/register">Start free</PremiumCTA></div></GlowCard></section>
      <PublicFooter />
    </VisualShell>
  );
}
