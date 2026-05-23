import Link from "next/link";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";

export const metadata = {
  title: "About — MemeLaunch OS",
  description: "MemeLaunch OS is built for teams that need structure before launch chaos starts.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#05070d]">
      <PublicNav />

      <section className="max-w-3xl mx-auto px-6 pt-24 pb-20">
        <h1 className="text-4xl font-bold text-white tracking-tight mb-6">About MemeLaunch OS</h1>

        <div className="space-y-6 text-slate-400 leading-relaxed">
          <p className="text-lg text-slate-300">
            MemeLaunch OS is built for teams that need structure before launch chaos starts.
          </p>
          <p>
            Most memecoin launches fail not because of the token — but because of the team. Missed deadlines, scattered tasks in a Telegram group, last-minute content scrambles, forgotten checklist items. MemeLaunch OS gives your team one place to run the launch properly.
          </p>
          <p>
            We built a launch operating system: structured workspaces, project tracking, pre-launch checklists, task boards, content schedulers, and launch readiness scores — all designed around how crypto teams actually operate.
          </p>
          <p>
            MemeLaunch OS is planning and coordination software. It is not financial advice, not investment advice, and not a token issuance or legal compliance service. It does not guarantee launch success, token performance, volume, or community growth.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 bg-[#0b1020] border border-white/8 rounded-2xl">
            <h2 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">What we are</h2>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>— A launch planning and coordination platform</li>
              <li>— A team task and checklist system</li>
              <li>— A content scheduling tool</li>
              <li>— A readiness tracking dashboard</li>
            </ul>
          </div>

          <div className="p-6 bg-[#0b1020] border border-white/8 rounded-2xl">
            <h2 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">What we are not</h2>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>— Financial or investment advice</li>
              <li>— A trading bot, sniper, or automation tool</li>
              <li>— A token issuance or legal compliance service</li>
              <li>— A guarantee of any launch outcome</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex gap-4">
          <Link
            href="/register"
            className="px-6 py-3 bg-white text-[#05070d] rounded-xl font-semibold text-sm hover:bg-slate-200 transition-colors"
          >
            Start free
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-medium text-sm hover:bg-white/10 transition-colors"
          >
            Contact us
          </Link>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
