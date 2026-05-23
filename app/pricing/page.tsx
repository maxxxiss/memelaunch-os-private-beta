import { env } from "@/lib/env";
import { PricingCards } from "./PricingCards";

export default function PricingPage() {
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

  return (
    <div className="min-h-screen bg-[#05070d] p-6">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Pricing</h1>
          <p className="text-slate-300">Choose the right plan for your launch</p>
        </header>

        {!stripeConfigured && (
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
            <p className="text-yellow-400 text-sm font-medium mb-2">Stripe is not configured:</p>
            <ul className="text-yellow-400 text-sm list-disc list-inside space-y-1">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
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
