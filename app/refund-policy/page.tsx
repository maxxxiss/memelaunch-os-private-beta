import Link from "next/link";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";

export const metadata = {
  title: "Refund Policy — MemeLaunch OS",
  description: "MemeLaunch OS refund policy for subscriptions.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#05070d]">
      <PublicNav />
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-20">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Refund Policy</h1>
        <p className="text-slate-500 text-sm mb-12">Last updated: May 2025</p>

        <div className="space-y-8 text-sm text-slate-400 leading-relaxed">
          <div>
            <h2 className="font-semibold text-white mb-3">Subscription cancellation</h2>
            <p>
              You may cancel your subscription at any time from your account settings or by contacting support. Upon cancellation, your access continues until the end of the current billing period. No partial refunds are issued for unused days.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-white mb-3">Refund eligibility</h2>
            <p>
              We offer refunds in the following cases:
            </p>
            <ul className="mt-3 space-y-2">
              <li>— You were charged in error (technical issue on our side)</li>
              <li>— You were charged twice for the same subscription period</li>
              <li>— You request a refund within 7 days of your first payment and have not used paid features</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-white mb-3">Non-refundable situations</h2>
            <p>
              Refunds are not issued in the following cases:
            </p>
            <ul className="mt-3 space-y-2">
              <li>— You changed your mind after using paid features</li>
              <li>— Your token launch did not succeed</li>
              <li>— You forgot to cancel before the renewal date</li>
              <li>— Partial months after cancellation</li>
            </ul>
          </div>

          <div>
            <h2 className="font-semibold text-white mb-3">How to request a refund</h2>
            <p>
              Email <a href="mailto:billing@memelaunch.app" className="text-blue-400 hover:text-blue-300">billing@memelaunch.app</a> with your account email, the charge date, and a brief description. We respond within 2 business days.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-white mb-3">No guarantee of outcome</h2>
            <p>
              MemeLaunch OS is planning software. Refunds are not issued based on launch performance, trading outcomes, holder counts, or any external result. The platform does not guarantee any outcome.
            </p>
          </div>
        </div>

        <p className="mt-12 text-xs text-slate-600">
          This is not legal advice. Policy is subject to change with notice.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/terms" className="text-sm text-blue-400 hover:text-blue-300">Terms of Service</Link>
          <Link href="/privacy" className="text-sm text-blue-400 hover:text-blue-300">Privacy Policy</Link>
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}
