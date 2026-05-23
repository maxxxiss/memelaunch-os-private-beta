import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#05070d] p-6">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Pricing</h1>
          <p className="text-slate-300">Choose the right plan for your launch</p>
        </header>

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
              disabled
              className="block w-full py-3 bg-blue-600 text-white rounded-lg text-center font-medium opacity-50 cursor-not-allowed"
            >
              Coming Soon
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
              disabled
              className="block w-full py-3 bg-[#0b1020] border border-white/10 text-white rounded-lg text-center font-medium opacity-50 cursor-not-allowed"
            >
              Coming Soon
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm">
            All plans include core launch management features. Upgrade to unlock advanced capabilities.
          </p>
        </div>
      </div>
    </div>
  );
}
