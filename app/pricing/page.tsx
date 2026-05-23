import { env } from "@/lib/env";
import { PricingCards } from "./PricingCards";

export default function PricingPage() {
  const stripeConfigured = !!env.STRIPE_SECRET_KEY && !!env.STRIPE_PRICE_ID_PRO && !!env.STRIPE_PRICE_ID_TEAM;

  return (
    <div className="min-h-screen bg-[#05070d] p-6">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Pricing</h1>
          <p className="text-slate-300">Choose the right plan for your launch</p>
        </header>

        {!stripeConfigured && (
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
            <p className="text-yellow-400 text-sm">Stripe is not configured yet. Contact administrator to enable payments.</p>
          </div>
        )}

        <PricingCards
          proPriceId={env.STRIPE_PRICE_ID_PRO || ""}
          teamPriceId={env.STRIPE_PRICE_ID_TEAM || ""}
          stripeConfigured={stripeConfigured}
        />
      </div>
    </div>
  );
}
