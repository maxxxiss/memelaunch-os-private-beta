import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

interface UpgradePromptProps {
  currentPlan: string;
  reason: string;
  feature?: string;
}

const planBenefits: Record<string, string> = {
  free: "Unlimited projects, workspaces, and launch templates",
  pro: "Team collaboration, role-based access, and activity logs",
  team: "Custom branding and priority support",
};

export function UpgradePrompt({ currentPlan, reason, feature }: UpgradePromptProps) {
  const targetPlan = currentPlan === "free" ? "pro" : "team";
  const benefit = planBenefits[targetPlan] || "Unlock advanced features";

  return (
    <div className="bg-gradient-to-r from-blue-500/8 to-violet-500/8 border border-blue-500/20 rounded-2xl p-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
          <Zap className="w-5 h-5 text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-white mb-1">Upgrade to {targetPlan.charAt(0).toUpperCase() + targetPlan.slice(1)}</h4>
          <p className="text-xs text-slate-400 mb-3 leading-relaxed">
            {reason} {feature && `to access ${feature}.`}
          </p>
          <p className="text-xs text-slate-500 mb-4">
            {benefit}
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-xs transition-colors"
          >
            View plans
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
