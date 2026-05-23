import Link from "next/link";

type CheckRowProps = { label: string; present: boolean; mode?: "test" | "live" | null };

function CheckRow({ label, present, mode }: CheckRowProps) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
      <span className="text-sm text-slate-300 font-mono">{label}</span>
      <div className="flex items-center gap-3">
        {mode && (
          <span
            className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
              mode === "live"
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                : "bg-yellow-500/15 border-yellow-500/30 text-yellow-400"
            }`}
          >
            {mode}
          </span>
        )}
        <span
          className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
            present
              ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
              : "bg-red-500/15 border-red-500/30 text-red-400"
          }`}
        >
          {present ? "present" : "missing"}
        </span>
      </div>
    </div>
  );
}

function getStripeMode(key: string | undefined): "live" | "test" | null {
  if (!key) return null;
  if (key.startsWith("sk_live_") || key.startsWith("pk_live_")) return "live";
  if (key.startsWith("sk_test_") || key.startsWith("pk_test_")) return "test";
  return null;
}

export default function AdminStripePage() {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const proPriceId = process.env.STRIPE_PRICE_ID_PRO;
  const teamPriceId = process.env.STRIPE_PRICE_ID_TEAM;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  const stripeMode = getStripeMode(stripeKey) ?? getStripeMode(publishableKey);
  const isProduction = appUrl ? !appUrl.includes("localhost") : false;
  const testKeysInProd = isProduction && stripeMode === "test";

  return (
    <div className="min-h-screen bg-[#05070d] p-6">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <Link href="/admin" className="text-sm text-slate-400 hover:text-white mb-4 inline-block">
            ← Back to admin
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">Stripe Diagnostics</h1>
          <p className="text-slate-400 text-sm mt-1">
            Environment variable presence check — no values are shown.
          </p>
        </header>

        {testKeysInProd && (
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/40 rounded-xl">
            <p className="text-yellow-400 text-sm font-semibold">
              Warning: Production is using Stripe test keys. Live payments are not enabled.
            </p>
            <p className="text-yellow-400/70 text-xs mt-1">
              Replace Stripe env vars in Vercel with live keys and redeploy.
            </p>
          </div>
        )}

        <div className="bg-[#111827] p-6 rounded-2xl border border-white/10 mb-6">
          <h2 className="text-white font-semibold mb-4">Stripe Keys</h2>
          <CheckRow label="STRIPE_SECRET_KEY" present={!!stripeKey} mode={getStripeMode(stripeKey)} />
          <CheckRow label="STRIPE_WEBHOOK_SECRET" present={!!webhookSecret} />
          <CheckRow label="NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" present={!!publishableKey} mode={getStripeMode(publishableKey)} />
        </div>

        <div className="bg-[#111827] p-6 rounded-2xl border border-white/10 mb-6">
          <h2 className="text-white font-semibold mb-4">Price IDs</h2>
          <CheckRow label="STRIPE_PRICE_ID_PRO" present={!!proPriceId} />
          <CheckRow label="STRIPE_PRICE_ID_TEAM" present={!!teamPriceId} />
        </div>

        <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
          <h2 className="text-white font-semibold mb-4">App</h2>
          <CheckRow label="NEXT_PUBLIC_APP_URL" present={!!appUrl} />
          <div className="pt-3 mt-1">
            <span className="text-xs text-slate-500">App URL: </span>
            <span className="text-xs text-slate-300 font-mono">{appUrl || "not set"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
