import Link from "next/link";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";

export const metadata = {
  title: "Terms of Service — MemeLaunch OS",
  description: "MemeLaunch OS terms of service.",
};

const SECTIONS = [
  {
    title: "1. Acceptance",
    body: "By using MemeLaunch OS, you agree to these terms. If you do not agree, do not use the platform.",
  },
  {
    title: "2. What MemeLaunch OS is",
    body: "MemeLaunch OS is a launch planning and team coordination platform for memecoin and crypto projects. It is not financial advice, investment advice, legal advice, or a token issuance service. It does not guarantee any launch outcome, token performance, trading volume, or community growth.",
  },
  {
    title: "3. Prohibited use",
    body: "You may not use MemeLaunch OS to coordinate illegal activity, market manipulation, wash trading, fake volume, pump-and-dump schemes, or any activity prohibited by applicable laws. You may not store private keys, seed phrases, or sensitive financial credentials in the platform.",
  },
  {
    title: "4. Accounts",
    body: "You are responsible for keeping your account credentials secure. You must be at least 18 years old to use the platform. One person may not create multiple accounts to bypass plan limits.",
  },
  {
    title: "5. Subscriptions and billing",
    body: "Paid plans (Pro, Team) are billed monthly via Stripe. Subscriptions renew automatically unless cancelled. You may cancel at any time; access continues until the end of the billing period. See our Refund Policy for refund terms.",
  },
  {
    title: "6. Intellectual property",
    body: "MemeLaunch OS and its code, design, and content are our intellectual property. Your workspace data belongs to you. You grant us permission to store and process your data to operate the platform.",
  },
  {
    title: "7. Disclaimer of warranties",
    body: 'MemeLaunch OS is provided "as is" without warranty of any kind. We do not guarantee uptime, accuracy, or fitness for any particular purpose. Use at your own risk.',
  },
  {
    title: "8. Limitation of liability",
    body: "To the maximum extent permitted by law, MemeLaunch OS is not liable for any indirect, incidental, or consequential damages arising from your use of the platform.",
  },
  {
    title: "9. Changes",
    body: "We may update these terms. Continued use of the platform after changes constitutes acceptance of the updated terms.",
  },
  {
    title: "10. Contact",
    body: "Questions about these terms: support@memelaunch.app",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#05070d]">
      <PublicNav />
      <section className="max-w-3xl mx-auto px-6 pt-24 pb-20">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Terms of Service</h1>
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
          This is not legal advice. Consult a qualified attorney for legal guidance.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/privacy" className="text-sm text-blue-400 hover:text-blue-300">Privacy Policy</Link>
          <Link href="/refund-policy" className="text-sm text-blue-400 hover:text-blue-300">Refund Policy</Link>
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}
