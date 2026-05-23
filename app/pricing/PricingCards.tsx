"use client";

import Link from "next/link";
import { createCheckoutSession } from "@/lib/actions/stripe";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface PricingCardsProps {
  proPriceId: string;
  teamPriceId: string;
  stripeConfigured: boolean;
}

export function PricingCards({ proPriceId, teamPriceId, stripeConfigured }: PricingCardsProps) {
  const searchParams = useSearchParams();
  const checkoutStatus = searchParams.get("checkout");
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (checkoutStatus === "cancelled") {
      setLoading(null);
      setError(null);
    }
  }, [checkoutStatus]);

  const handleCheckout = async (priceId: string, planName: string) => {
    setLoading(planName);
    setError(null);

    try {
      const result = await createCheckoutSession(priceId);
      if (result.url) {
        window.location.href = result.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start checkout");
      setLoading(null);
    }
  };

  return (
    <>
      {checkoutStatus === "cancelled" && (
        <div className="mb-6 p-4 bg-slate-500/10 border border-slate-500/50 rounded-lg">
          <p className="text-slate-300 text-sm">Checkout cancelled. You can try again anytime.</p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-2">Free</h2>
          <div className="text-3xl font-bold text-white mb-4">$0<span className="text-lg text-slate-400">/month</span></div>
          <ul className="space-y-3 mb-6 text-slate-300">
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              1 workspace
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              1 launch project
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Launch checklist
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Tasks & content planner
            </li>
            <li className="flex items-center gap-2">
              <span className="text-slate-500">✗</span>
              Launch plan export
            </li>
            <li className="flex items-center gap-2">
              <span className="text-slate-500">✗</span>
              Launch templates
            </li>
          </ul>
          <Link
            href="/register"
            className="block w-full py-3 bg-[#0b1020] border border-white/10 text-white rounded-lg text-center font-medium hover:border-white/20 transition-colors"
          >
            Get Started
          </Link>
        </div>

        <div className="bg-[#111827] p-6 rounded-2xl border border-blue-500/50 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
            Popular
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Pro</h2>
          <div className="text-3xl font-bold text-white mb-4">$29<span className="text-lg text-slate-400">/month</span></div>
          <ul className="space-y-3 mb-6 text-slate-300">
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Unlimited workspaces
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Unlimited projects
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Launch checklist
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Tasks & content planner
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Launch plan export
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Launch templates
            </li>
          </ul>
          <button
            onClick={() => handleCheckout(proPriceId, "pro")}
            disabled={loading === "pro" || !stripeConfigured}
            className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading === "pro" ? "Loading..." : stripeConfigured ? "Upgrade to Pro" : "Coming Soon"}
          </button>
        </div>

        <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold text-white mb-2">Team</h2>
          <div className="text-3xl font-bold text-white mb-4">$99<span className="text-lg text-slate-400">/month</span></div>
          <ul className="space-y-3 mb-6 text-slate-300">
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Everything in Pro
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Team collaboration
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Role-based access
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              Team activity logs
            </li>
            <li className="flex items-center gap-2">
              <span className="text-slate-500">✗</span>
              Custom branding
            </li>
            <li className="flex items-center gap-2">
              <span className="text-slate-500">✗</span>
              Priority support
            </li>
          </ul>
          <button
            onClick={() => handleCheckout(teamPriceId, "team")}
            disabled={loading === "team" || !stripeConfigured}
            className="block w-full py-3 bg-[#0b1020] border border-white/10 hover:border-white/20 text-white rounded-lg text-center font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading === "team" ? "Loading..." : stripeConfigured ? "Upgrade to Team" : "Coming Soon"}
          </button>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-slate-400 text-sm">
          All plans include core launch management features. Upgrade to unlock advanced capabilities.
        </p>
      </div>
    </>
  );
}
