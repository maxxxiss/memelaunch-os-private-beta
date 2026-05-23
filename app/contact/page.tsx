import Link from "next/link";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";

export const metadata = {
  title: "Contact — MemeLaunch OS",
  description: "Get in touch with the MemeLaunch OS team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#05070d]">
      <PublicNav />

      <section className="max-w-2xl mx-auto px-6 pt-24 pb-20">
        <h1 className="text-4xl font-bold text-white tracking-tight mb-4">Contact</h1>
        <p className="text-slate-400 mb-12">
          Have a question, issue, or feedback? We&apos;re here to help.
        </p>

        <div className="space-y-4">
          <div className="bg-[#0b1020] border border-white/8 rounded-2xl p-6">
            <h2 className="font-semibold text-white mb-2">General support</h2>
            <p className="text-sm text-slate-400 mb-3">
              For account issues, billing questions, and general product support.
            </p>
            <a
              href="mailto:support@memelaunch.app"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              support@memelaunch.app
            </a>
          </div>

          <div className="bg-[#0b1020] border border-white/8 rounded-2xl p-6">
            <h2 className="font-semibold text-white mb-2">Billing and subscriptions</h2>
            <p className="text-sm text-slate-400 mb-3">
              For payment issues, refund requests, or subscription changes.
            </p>
            <a
              href="mailto:billing@memelaunch.app"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              billing@memelaunch.app
            </a>
          </div>

          <div className="bg-[#0b1020] border border-white/8 rounded-2xl p-6">
            <h2 className="font-semibold text-white mb-2">Response time</h2>
            <p className="text-sm text-slate-400">
              We aim to respond within 1–2 business days.
            </p>
          </div>
        </div>

        <p className="mt-10 text-xs text-slate-600">
          MemeLaunch OS does not provide financial advice or investment guidance. All support is for platform usage only.
        </p>

        <div className="mt-8">
          <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
            ← Back to home
          </Link>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
