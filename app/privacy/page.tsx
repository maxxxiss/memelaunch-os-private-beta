import Link from "next/link";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";

export const metadata = {
  title: "Privacy Policy — MemeLaunch OS",
  description: "MemeLaunch OS privacy policy.",
};

const SECTIONS = [
  {
    title: "1. What we collect",
    body: "We collect the email address you register with, display name if provided, workspace and project data you create within the platform, and basic usage logs for platform operation. We do not collect wallet private keys, seed phrases, or crypto account credentials.",
  },
  {
    title: "2. How we use your data",
    body: "We use your data to operate the MemeLaunch OS platform, send account-related emails (verification, password reset), process subscription payments via Stripe, and improve the product. We do not sell your data to third parties.",
  },
  {
    title: "3. Third-party services",
    body: "We use Supabase for authentication and database storage, Stripe for payment processing, and Vercel for hosting. These services have their own privacy policies. Stripe handles all payment data — we do not store card details.",
  },
  {
    title: "4. Data retention",
    body: "Your data is retained as long as your account is active. You may request deletion by contacting support@memelaunch.app. Deleted accounts are removed from our systems within 30 days.",
  },
  {
    title: "5. Security",
    body: "We use industry-standard security practices including encrypted connections (HTTPS), Supabase Row Level Security, and server-side secrets management. No security system is perfect — do not store sensitive personal information in workspace notes or project descriptions.",
  },
  {
    title: "6. Cookies",
    body: "We use session cookies for authentication only. We do not use tracking cookies or advertising cookies.",
  },
  {
    title: "7. Contact",
    body: "For privacy-related requests or questions, contact support@memelaunch.app.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#05070d]">
      <PublicNav />
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-20">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-slate-500 text-sm mb-12">Last updated: May 2025</p>
        <div className="space-y-8">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="font-semibold text-white mb-3">{s.title}</h2>
              <p className="text-sm text-slate-400 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-xs text-slate-600">
          This policy applies to the MemeLaunch OS SaaS platform only. It is not legal advice.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/terms" className="text-sm text-blue-400 hover:text-blue-300">Terms of Service</Link>
          <Link href="/refund-policy" className="text-sm text-blue-400 hover:text-blue-300">Refund Policy</Link>
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}
