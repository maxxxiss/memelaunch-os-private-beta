"use client";

import Link from "next/link";
import { createCheckoutSession } from "@/lib/actions/stripe";
import { useState, useEffect, useRef } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { Check, X } from "lucide-react";

interface PricingCardsProps {
  proPriceId: string;
  teamPriceId: string;
  stripeConfigured: boolean;
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
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    resetLoading();
    setError(null);
  }, [checkoutStatus, pathname]);

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        resetLoading();
      }
    };

    const handleFocus = () => {
      resetLoading();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        resetLoading();
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
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
      if (result.url) {
        window.location.href = result.url;
      }
    } catch (err) {
      resetLoading();
      setError(err instanceof Error ? err.message : "Failed to start checkout");
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        <div className="bg-[#0d1117] p-6 rounded-2xl border border-white/8">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-3">Free</p>
          <div className="text-4xl font-bold text-white mb-1">$0<span className="text-base text-slate-500 font-normal">/mo</span></div>
          <p className="text-xs text-slate-500 mb-5">Forever free, 1 project</p>
          <ul className="space-y-3 mb-6 text-slate-300 text-sm">
            {[
              { included: true, label: "1 workspace" },
              { included: true, label: "1 launch project" },
              { included: true, label: "Launch checklist" },
              { included: true, label: "Tasks & content planner" },
              { included: false, label: "Launch plan export" },
              { included: false, label: "Launch templates" },
            ].map((f) => (
              <li key={f.label} className="flex items-center gap-2">
                {f.included ? <Check className="w-4 h-4 text-emerald-400 shrink-0" /> : <X className="w-4 h-4 text-slate-600 shrink-0" />}
                <span className={f.included ? "" : "text-slate-500"}>{f.label}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/register"
            className="block w-full py-3 bg-white/5 border border-white/8 text-white rounded-xl text-center text-sm font-medium hover:border-white/15 transition-colors"
          >
            Get Started
          </Link>
        </div>

        <div className="relative bg-gradient-to-b from-blue-500/8 to-[#0d1117] p-6 rounded-2xl border border-blue-500/30 shadow-xl shadow-blue-500/10">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-500 text-white text-[10px] font-bold rounded-full tracking-widest uppercase whitespace-nowrap">
            Most Popular
          </div>
          <p className="text-[10px] text-blue-400 uppercase tracking-widest font-semibold mb-3">Pro</p>
          <div className="text-4xl font-bold text-white mb-1">$29<span className="text-base text-slate-500 font-normal">/mo</span></div>
          <p className="text-xs text-slate-400 mb-5">Unlimited projects &amp; workspaces</p>
          <ul className="space-y-3 mb-6 text-sm">
            {["Unlimited workspaces", "Unlimited projects", "Launch checklist", "Tasks & content planner", "Launch plan export", "Launch templates"].map((f) => (
              <li key={f} className="flex items-center gap-2 text-slate-300">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />{f}
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleCheckout(proPriceId, "pro")}
            disabled={loading === "pro" || !stripeConfigured}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-lg shadow-blue-500/20"
          >
            {loading === "pro" ? "Loading..." : stripeConfigured ? "Get Pro" : "Coming Soon"}
          </button>
        </div>

        <div className="bg-[#0d1117] p-6 rounded-2xl border border-white/8">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-3">Team</p>
          <div className="text-4xl font-bold text-white mb-1">$99<span className="text-base text-slate-500 font-normal">/mo</span></div>
          <p className="text-xs text-slate-500 mb-5">Team collaboration &amp; roles</p>
          <ul className="space-y-3 mb-6 text-sm">
            {[
              { included: true, label: "Everything in Pro" },
              { included: true, label: "Team collaboration" },
              { included: true, label: "Role-based access" },
              { included: true, label: "Team activity logs" },
              { included: false, label: "Custom branding" },
              { included: false, label: "Priority support" },
            ].map((f) => (
              <li key={f.label} className="flex items-center gap-2">
                {f.included ? <Check className="w-4 h-4 text-emerald-400 shrink-0" /> : <X className="w-4 h-4 text-slate-600 shrink-0" />}
                <span className={f.included ? "text-slate-300" : "text-slate-500"}>{f.label}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => handleCheckout(teamPriceId, "team")}
            disabled={loading === "team" || !stripeConfigured}
            className="w-full py-3 bg-white/5 border border-white/8 hover:border-white/15 text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading === "team" ? "Loading..." : stripeConfigured ? "Get Team" : "Coming Soon"}
          </button>
        </div>
      </div>

      <div className="mt-10 p-5 bg-[#0d1117] border border-white/6 rounded-2xl text-center">
        <p className="text-slate-400 text-sm">
          All plans include core launch management. Payments processed securely by Stripe.{" "}
          <a href="/refund-policy" className="text-blue-400 hover:text-blue-300">Refund policy</a>
        </p>
      </div>
    </>
  );
}
