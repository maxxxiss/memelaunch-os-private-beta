"use client";

import Link from "next/link";
import { createCheckoutSession } from "@/lib/actions/stripe";
import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Check, X, ShieldCheck } from "lucide-react";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

interface PricingCardsProps {
  proPriceId: string;
  teamPriceId: string;
  stripeConfigured: boolean;
}

const freeFeatures = ["1 workspace", "1 launch project", "Launch checklist", "Tasks & content planner", "Launch plan export", "Launch templates"];
const proFeatures = ["Unlimited workspaces", "Unlimited projects", "Launch checklist", "Tasks & content planner", "Launch plan export", "Launch templates"];
const teamFeatures = ["Everything in Pro", "Team collaboration", "Role-based access", "Team activity logs", "Custom branding", "Priority support"];

function PlanFeature({ label, included = true }: { label: string; included?: boolean }) {
  return (
    <li className="flex items-center gap-2 text-sm">
      {included ? <Check className="h-4 w-4 shrink-0 text-emerald-400" /> : <X className="h-4 w-4 shrink-0 text-slate-600" />}
      <span className={included ? "text-slate-300" : "text-slate-500"}>{label}</span>
    </li>
  );
}

export function PricingCards({ proPriceId, teamPriceId, stripeConfigured }: PricingCardsProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const checkoutStatus = searchParams.get("checkout");
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetLoading = () => {
    setLoading(null);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
  };

  useEffect(() => {
    resetLoading();
    setError(null);
  }, [checkoutStatus, pathname]);

  useEffect(() => {
    const reset = () => resetLoading();
    const handleVisibilityChange = () => document.visibilityState === "visible" && resetLoading();
    window.addEventListener("pageshow", reset);
    window.addEventListener("focus", reset);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.removeEventListener("pageshow", reset);
      window.removeEventListener("focus", reset);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCheckout = async (priceId: string, planName: string) => {
    setLoading(planName);
    setError(null);
    timeoutRef.current = setTimeout(() => {
      resetLoading();
      setError("Checkout took too long. Please try again.");
    }, 10000);
    try {
      const result = await createCheckoutSession(priceId);
      if (result.url) window.location.href = result.url;
    } catch (err) {
      resetLoading();
      setError(err instanceof Error ? err.message : "Failed to start checkout");
    }
  };

  return (
    <>
      {checkoutStatus === "cancelled" && <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">Checkout cancelled. You can try again anytime.</div>}
      {error && <div className="mb-6"><ErrorMessage title="Checkout failed" message={error} onRetry={() => setError(null)} /></div>}
      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#0a1628] to-[#060e1c] p-6 shadow-panel">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Free</p>
          <div className="mt-4 text-5xl font-black text-white">$0<span className="text-base font-normal text-slate-500">/mo</span></div>
          <p className="mt-3 text-sm text-slate-400">Start your first launch command center.</p>
          <ul className="my-7 space-y-3">{freeFeatures.map((f, i) => <PlanFeature key={f} label={f} included={i < 4} />)}</ul>
          <Link href="/register" className="block rounded-xl border border-white/10 bg-white/5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10">Start free</Link>
        </div>
        <div className="relative rounded-3xl border border-blue-400/40 bg-gradient-to-b from-blue-500/20 to-[#0a1628] p-6 shadow-glow-blue">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent rounded-t-3xl" />
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full border border-blue-300/30 bg-blue-500 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-glow-blue/50">Best for launch teams</div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-blue-300">Pro</p>
          <div className="mt-4 text-5xl font-black text-white">$29<span className="text-base font-normal text-slate-400">/mo</span></div>
          <p className="mt-3 text-sm text-slate-300">Unlimited launch projects, exports, and templates.</p>
          <ul className="my-7 space-y-3">{proFeatures.map((f) => <PlanFeature key={f} label={f} />)}</ul>
          <button onClick={() => handleCheckout(proPriceId, "pro")} disabled={loading === "pro" || !stripeConfigured} className="w-full rounded-xl bg-white py-3 text-sm font-bold text-[#05070d] shadow-cta transition hover:bg-blue-50 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50">
            {loading === "pro" ? "Opening checkout..." : stripeConfigured ? "Get Pro" : "Checkout unavailable"}
          </button>
        </div>
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#0a1628] to-[#060e1c] p-6 shadow-panel">
          <p className="text-[10px] font-bold uppercase tracking-widest text-violet-300">Team</p>
          <div className="mt-4 text-5xl font-black text-white">$99<span className="text-base font-normal text-slate-500">/mo</span></div>
          <p className="mt-3 text-sm text-slate-400">Built for multi-person launch operations.</p>
          <ul className="my-7 space-y-3">{teamFeatures.map((f, i) => <PlanFeature key={f} label={f} included={i < 4} />)}</ul>
          <button onClick={() => handleCheckout(teamPriceId, "team")} disabled={loading === "team" || !stripeConfigured} className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50">
            {loading === "team" ? "Opening checkout..." : stripeConfigured ? "Get Team" : "Checkout unavailable"}
          </button>
        </div>
      </div>
      <div className="mt-10 flex flex-col items-center gap-2 rounded-3xl border border-emerald-500/15 bg-emerald-500/5 p-5 text-center sm:flex-row sm:justify-center shadow-panel">
        <ShieldCheck className="h-4 w-4 text-emerald-300" />
        <p className="text-sm text-slate-400">Payments processed securely by Stripe. <Link href="/refund-policy" className="text-blue-300 hover:text-blue-200">Refund policy</Link></p>
      </div>
    </>
  );
}
