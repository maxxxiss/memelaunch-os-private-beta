import Link from "next/link";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ],
  Support: [
    { label: "Contact", href: "/contact" },
    { label: "Sign in", href: "/login" },
    { label: "Get started", href: "/register" },
  ],
  Legal: [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Refund Policy", href: "/refund-policy" },
  ],
};

export function PublicFooter() {
  return (
    <footer className="border-t border-white/8 bg-[#05070d] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="text-lg font-bold text-white mb-3">MemeLaunch OS</div>
            <p className="text-sm text-slate-500 leading-relaxed">
              The launch operating system for memecoin teams. Plan, coordinate, and execute.
            </p>
          </div>
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">
                {section}
              </div>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} MemeLaunch OS. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Not financial advice. Not investment advice. Planning software only.
          </p>
        </div>
      </div>
    </footer>
  );
}
