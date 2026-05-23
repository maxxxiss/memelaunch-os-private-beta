export function HeroDashboardMockup() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-3xl" />
      <div className="relative bg-[#0d1117] border border-white/10 rounded-2xl p-4 shadow-2xl">
        {/* Header bar */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-slate-400 font-medium">PEPE Launch</span>
          </div>
          <div className="px-2 py-0.5 bg-blue-500/15 border border-blue-500/20 rounded-full text-[10px] text-blue-400 font-medium">
            Pro Plan
          </div>
        </div>

        {/* Readiness hero */}
        <div className="bg-[#070b14] border border-white/8 rounded-xl p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">Launch Readiness</span>
            <span className="text-xs text-slate-500">12 days left</span>
          </div>
          <div className="text-3xl font-bold text-white mb-2">74<span className="text-lg text-slate-500">%</span></div>
          <div className="w-full bg-white/5 rounded-full h-1.5">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "74%" }} />
          </div>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[{ label: "Tasks", value: "8", sub: "open" }, { label: "Checklist", value: "18/24", sub: "done" }, { label: "Content", value: "5", sub: "scheduled" }].map((k) => (
            <div key={k.label} className="bg-[#070b14] border border-white/8 rounded-xl p-3 text-center">
              <div className="text-sm font-bold text-white">{k.value}</div>
              <div className="text-[10px] text-slate-500">{k.label}</div>
            </div>
          ))}
        </div>

        {/* Task preview */}
        <div className="space-y-1.5">
          {[
            { label: "Deploy token contract", done: true },
            { label: "Set up Telegram community", done: true },
            { label: "Post launch announcement", done: false },
            { label: "Add DEX liquidity pool", done: false },
          ].map((t) => (
            <div key={t.label} className="flex items-center gap-2.5 px-2.5 py-2 bg-[#070b14] border border-white/6 rounded-lg">
              <div className={`w-3.5 h-3.5 rounded-sm border shrink-0 flex items-center justify-center ${t.done ? "bg-emerald-500/20 border-emerald-500/40" : "border-white/20"}`}>
                {t.done && <svg className="w-2.5 h-2.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
              </div>
              <span className={`text-[11px] ${t.done ? "text-slate-600 line-through" : "text-slate-300"}`}>{t.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
