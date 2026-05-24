import Link from "next/link";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import { GlowCard, SectionLabel, VisualShell } from "@/components/ui/premium";

export const metadata = {
  title: "Contact — MemeLaunch OS",
  description: "Get in touch with the MemeLaunch OS team.",
};

const cards = [
  { title: "General support", copy: "Account issues, product questions, and workspace support.", email: "support@memelaunch.app" },
  { title: "Billing", copy: "Payment issues, refund requests, or subscription questions.", email: "billing@memelaunch.app" },
];

export default function ContactPage() {
  return (
    <VisualShell>
      <PublicNav />
      <section className="mx-auto max-w-5xl px-6 py-24">
        <SectionLabel>Contact</SectionLabel>
        <h1 className="max-w-3xl text-5xl font-black tracking-[-0.05em] text-white md:text-6xl">Support for launch teams using MemeLaunch OS.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Questions, billing issues, or feedback? We aim to respond within 1–2 business days.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {cards.map((card) => (
            <GlowCard key={card.title} className="p-7">
              <h2 className="text-lg font-bold text-white">{card.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{card.copy}</p>
              <a href={`mailto:${card.email}`} className="mt-6 inline-flex text-sm font-semibold text-blue-300 hover:text-blue-200">{card.email}</a>
            </GlowCard>
          ))}
        </div>
        <GlowCard className="mt-5 p-6">
          <p className="text-sm text-slate-400">MemeLaunch OS does not provide financial advice or investment guidance. Support is for platform usage only.</p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm"><Link href="/pricing" className="text-blue-300 hover:text-blue-200">Pricing</Link><Link href="/terms" className="text-blue-300 hover:text-blue-200">Terms</Link><Link href="/refund-policy" className="text-blue-300 hover:text-blue-200">Refund policy</Link></div>
        </GlowCard>
      </section>
      <PublicFooter />
    </VisualShell>
  );
}
