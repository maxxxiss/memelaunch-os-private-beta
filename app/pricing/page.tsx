import { env } from "@/lib/env";
import { PricingCards } from "./PricingCards";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import { SectionLabel, VisualShell } from "@/components/ui/premium";

export default async function PricingPage({
  searchParams,
}: {
  searchParams: Promise<{ checkout?: string }>;
}) {
  const { checkout } = await searchParams;
  const errors: string[] = [];

  if (!env.STRIPE_SECRET_KEY) {
    errors.push("Missing STRIPE_SECRET_KEY");
  }

  if (!env.STRIPE_PRICE_ID_PRO) {
    errors.push("Missing STRIPE_PRICE_ID_PRO");
  } else if (!env.STRIPE_PRICE_ID_PRO.startsWith("price_")) {
    errors.push("Invalid STRIPE_PRICE_ID_PRO, expected price_...");
  }

  if (!env.STRIPE_PRICE_ID_TEAM) {
    errors.push("Missing STRIPE_PRICE_ID_TEAM");
  } else if (!env.STRIPE_PRICE_ID_TEAM.startsWith("price_")) {
    errors.push("Invalid STRIPE_PRICE_ID_TEAM, expected price_...");
  }

  if (!env.NEXT_PUBLIC_APP_URL) {
    errors.push("Missing NEXT_PUBLIC_APP_URL");
  }

  const stripeConfigured = errors.length === 0;

  const pricingFaq = [
    { q: "Can I cancel anytime?", a: "Yes. Cancel from your account at any time. Access continues until the end of your billing period." },
    { q: "Is there a free trial?", a: "The Free plan is available indefinitely. No credit card required to start." },
    { q: "What payment methods are accepted?", a: "All major credit and debit cards via Stripe. No crypto payments accepted." },
    { q: "Do you offer refunds?", a: "We offer refunds within 7 days of first payment if paid features were not used. See our refund policy for details." },
  ];

  return (
    <VisualShell>
      <PublicNav />
      <div className="max-w-6xl mx-auto px-6 py-24">
        <header className="text-center mb-14">
          <SectionLabel>Pricing</SectionLabel>
          <h1 className="text-5xl font-black text-white tracking-[-0.05em] mb-4">Plans for serious launch operations</h1>
          <p className="text-slate-400 max-w-xl mx-auto">Start free. Upgrade when your team needs more projects, workspaces, exports, and launch capacity.</p>
        </header>

        {!stripeConfigured && (
          <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
            <p className="text-yellow-400 text-sm font-medium mb-2">Stripe configuration required:</p>
            <ul className="text-yellow-400/80 text-sm list-disc list-inside space-y-1">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <PricingCards
          key={checkout || "default"}
          proPriceId={env.STRIPE_PRICE_ID_PRO || ""}
          teamPriceId={env.STRIPE_PRICE_ID_TEAM || ""}
          stripeConfigured={stripeConfigured}
        />

        <div className="mt-20 border-t border-white/8 pt-16">
          <h2 className="text-xl font-bold text-white mb-8 text-center">Pricing FAQ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pricingFaq.map((item) => (
              <div key={item.q} className="bg-[#0b1020] border border-white/8 rounded-xl p-5">
                <h3 className="font-semibold text-white text-sm mb-2">{item.q}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PublicFooter />
    </VisualShell>
  );
}
