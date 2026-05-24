import Link from "next/link";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import { GlowCard, PremiumCTA, SectionLabel, VisualShell } from "@/components/ui/premium";

export const metadata = {
  title: "About — MemeLaunch OS",
  description: "MemeLaunch OS is built for teams that need structure before launch chaos starts.",
};

const isList = ["Launch planning and coordination", "Team tasks and checklist execution", "Content scheduling and link control", "Readiness tracking before launch"];
const notList = ["Financial or investment advice", "Trading, sniper, or bot automation", "Token issuance or legal compliance", "A guarantee of any launch outcome"];

export default function AboutPage() {
  return (
    <VisualShell>
      <PublicNav />
      <section className="mx-auto max-w-5xl px-6 py-24">
        <SectionLabel>About</SectionLabel>
        <h1 className="max-w-3xl text-5xl font-black leading-none tracking-[-0.05em] text-white md:text-6xl">Built for teams that need structure before launch chaos starts.</h1>
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <GlowCard className="p-8">
            <p className="text-lg leading-8 text-slate-300">MemeLaunch OS gives crypto launch teams one place to plan projects, track readiness, assign tasks, schedule content, and keep operational context visible.</p>
            <p className="mt-5 text-sm leading-7 text-slate-400">Most launch teams do not need more noise. They need one operating layer that shows what is ready, what is missing, and who owns the next step.</p>
            <div className="mt-8"><PremiumCTA href="/register">Start free</PremiumCTA></div>
          </GlowCard>
          <GlowCard className="p-8">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-300">Product boundary</p>
            <p className="mt-4 text-sm leading-7 text-slate-400">MemeLaunch OS is planning and coordination software. It is not financial advice, not a trading product, and not a guarantee of token performance, volume, or community growth.</p>
            <Link href="/contact" className="mt-6 inline-flex text-sm font-semibold text-blue-300 hover:text-blue-200">Contact support</Link>
          </GlowCard>
        </div>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <GlowCard className="p-6"><h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-emerald-300">What we are</h2><ul className="space-y-3 text-sm text-slate-400">{isList.map((item) => <li key={item}>{item}</li>)}</ul></GlowCard>
          <GlowCard className="p-6"><h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-violet-300">What we are not</h2><ul className="space-y-3 text-sm text-slate-400">{notList.map((item) => <li key={item}>{item}</li>)}</ul></GlowCard>
        </div>
      </section>
      <PublicFooter />
    </VisualShell>
  );
}
