import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#05070d]">
      <nav className="border-b border-white/10 bg-[#0b1020]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-white">MemeLaunch OS</div>
          <div className="flex gap-4">
            <Link href="/login" className="text-slate-300 hover:text-white text-sm">
              Sign in
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="max-w-3xl">
          <h1 className="text-6xl font-bold text-white mb-6 tracking-tight">
            Launch memecoins. Coordinate your team.
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            MemeLaunch OS is the launch operating system for memecoin teams.
            Plan, coordinate, and execute your launch from one place.
          </p>
          <div className="flex gap-4">
            <Link
              href="/register"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              Start free
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 bg-[#111827] hover:bg-[#1f2937] text-white rounded-lg font-medium border border-white/10"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
            <h3 className="font-semibold text-white mb-2">Launch Plan</h3>
            <p className="text-sm text-slate-300">
              Track your launch timeline and milestones in one place.
            </p>
          </div>
          <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
            <h3 className="font-semibold text-white mb-2">Team Tasks</h3>
            <p className="text-sm text-slate-300">
              Assign and track tasks across your launch team.
            </p>
          </div>
          <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
            <h3 className="font-semibold text-white mb-2">Checklist</h3>
            <p className="text-sm text-slate-300">
              Pre-launch checklist to ensure nothing is missed.
            </p>
          </div>
          <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
            <h3 className="font-semibold text-white mb-2">Content Calendar</h3>
            <p className="text-sm text-slate-300">
              Plan X, Telegram, and Discord content in advance.
            </p>
          </div>
          <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
            <h3 className="font-semibold text-white mb-2">Real-time Alerts</h3>
            <p className="text-sm text-slate-300">
              Stay notified of important launch events.
            </p>
          </div>
          <div className="bg-[#111827] p-6 rounded-2xl border border-white/10">
            <h3 className="font-semibold text-white mb-2">Metrics</h3>
            <p className="text-sm text-slate-300">
              Monitor launch performance and community growth.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
