import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#05070d] flex flex-col items-center justify-center px-6 text-center">
      <div className="text-8xl font-bold text-white/10 mb-6 select-none">404</div>
      <h1 className="text-2xl font-bold text-white mb-3 tracking-tight">Page not found</h1>
      <p className="text-slate-400 mb-10 max-w-sm">
        This page doesn&apos;t exist or was moved. Head back to the dashboard or the homepage.
      </p>
      <div className="flex gap-3">
        <Link
          href="/app"
          className="px-5 py-2.5 bg-white text-[#05070d] rounded-xl text-sm font-semibold hover:bg-slate-200 transition-colors"
        >
          Go to dashboard
        </Link>
        <Link
          href="/"
          className="px-5 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl text-sm font-medium hover:bg-white/10 transition-colors"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
