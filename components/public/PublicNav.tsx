import Link from "next/link";

export function PublicNav() {
  return (
    <nav className="border-b border-white/8 bg-[#05070d]/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-lg font-bold text-white tracking-tight">
          MemeLaunch OS
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/features" className="text-sm text-slate-400 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="text-sm text-slate-400 hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="/about" className="text-sm text-slate-400 hover:text-white transition-colors">
            About
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm text-slate-400 hover:text-white transition-colors">
            Sign in
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-white text-[#05070d] rounded-lg text-sm font-semibold hover:bg-slate-200 transition-colors"
          >
            Get started free
          </Link>
        </div>
      </div>
    </nav>
  );
}
