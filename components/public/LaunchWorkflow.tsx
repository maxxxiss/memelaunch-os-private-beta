import { Lightbulb, ClipboardCheck, Megaphone, Users2, Rocket } from "lucide-react";

const STEPS = [
  {
    icon: Lightbulb, num: "01", label: "Plan",
    desc: "Token concept, ticker, chain, team structure",
    style: "border-blue-500/30 text-blue-400 bg-blue-500/8 shadow-blue-500/8",
  },
  {
    icon: ClipboardCheck, num: "02", label: "Checklist",
    desc: "Contract, liquidity pool, socials, all systems go",
    style: "border-indigo-500/30 text-indigo-400 bg-indigo-500/8 shadow-indigo-500/8",
  },
  {
    icon: Megaphone, num: "03", label: "Content",
    desc: "X, Telegram, Discord launch campaigns",
    style: "border-violet-500/30 text-violet-400 bg-violet-500/8 shadow-violet-500/8",
  },
  {
    icon: Users2, num: "04", label: "Execute",
    desc: "Team tasks, coordination, real-time tracking",
    style: "border-cyan-500/30 text-cyan-400 bg-cyan-500/8 shadow-cyan-500/8",
  },
  {
    icon: Rocket, num: "05", label: "Launch",
    desc: "Go live, monitor, grow the community",
    style: "border-emerald-500/30 text-emerald-400 bg-emerald-500/8 shadow-emerald-500/8",
  },
];

export function LaunchWorkflow() {
  return (
    <section className="border-t border-white/8 bg-[#030507]">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-semibold mb-4">LAUNCH OPERATIONS FLOW</p>
          <h2 className="text-3xl font-bold text-white tracking-tight leading-[1.15]">
            From concept to live,<br className="hidden md:block" /> in one organized system.
          </h2>
        </div>

        <div className="relative">
          {/* Connecting glow line */}
          <div className="absolute top-[27px] left-[12%] right-[12%] h-px bg-gradient-to-r from-blue-500/0 via-blue-500/25 to-emerald-500/0 hidden md:block" />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
            {STEPS.map((step) => (
              <div key={step.num} className="flex flex-col items-center text-center">
                <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center mb-4 relative z-10 shadow-lg ${step.style}`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <p className="text-[9px] text-slate-600 font-mono mb-1.5 tracking-widest">{step.num}</p>
                <p className="font-semibold text-white text-sm mb-1.5">{step.label}</p>
                <p className="text-[11px] text-slate-500 leading-relaxed max-w-[120px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
