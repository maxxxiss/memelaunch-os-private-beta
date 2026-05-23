const CHECKLIST = [
  { label: "Contract deployed", done: true },
  { label: "Telegram setup", done: true },
  { label: "Liquidity pool", done: false },
  { label: "Marketing push", done: false },
];

export function LaunchCommandVisual() {
  return (
    <div className="relative w-full h-[520px] select-none overflow-hidden" aria-hidden="true">
      {/* Ambient glow orbs */}
      <div className="absolute top-[28%] left-[32%] w-[320px] h-[320px] rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute bottom-[20%] right-[18%] w-[220px] h-[220px] rounded-full bg-violet-500/8 blur-3xl" />
      <div className="absolute top-[10%] right-[28%] w-[150px] h-[150px] rounded-full bg-cyan-500/6 blur-2xl" />

      {/* SVG connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 520" fill="none">
        <defs>
          <linearGradient id="cl1" x1="270" y1="260" x2="295" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="cl2" x1="270" y1="260" x2="528" y2="58" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="cl3" x1="270" y1="260" x2="568" y2="228" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="cl4" x1="270" y1="260" x2="508" y2="432" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22C55E" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#22C55E" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="cl5" x1="270" y1="260" x2="58" y2="402" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <line x1="270" y1="260" x2="295" y2="28" stroke="url(#cl1)" strokeWidth="1.5" />
        <line x1="270" y1="260" x2="528" y2="58" stroke="url(#cl2)" strokeWidth="1.5" />
        <line x1="270" y1="260" x2="568" y2="228" stroke="url(#cl3)" strokeWidth="1.5" />
        <line x1="270" y1="260" x2="508" y2="432" stroke="url(#cl4)" strokeWidth="1.5" />
        <line x1="270" y1="260" x2="58" y2="402" stroke="url(#cl5)" strokeWidth="1.5" />
        <circle cx="270" cy="260" r="5" fill="#3B82F6" fillOpacity="0.7" />
        <circle cx="295" cy="28" r="3" fill="#3B82F6" fillOpacity="0.55" />
        <circle cx="528" cy="58" r="3" fill="#8B5CF6" fillOpacity="0.55" />
        <circle cx="568" cy="228" r="3" fill="#06B6D4" fillOpacity="0.55" />
        <circle cx="508" cy="432" r="3" fill="#22C55E" fillOpacity="0.55" />
        <circle cx="58" cy="402" r="3" fill="#F59E0B" fillOpacity="0.55" />
      </svg>

      {/* Orbit rings */}
      <div className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full border border-blue-500/8" />
      <div className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 w-[298px] h-[298px] rounded-full border border-blue-500/12" />

      {/* Central panel */}
      <div className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 z-10 w-[188px] bg-[#080e1c] border border-blue-500/20 rounded-2xl p-4 shadow-2xl shadow-blue-500/8">
        <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-white/6">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] text-slate-300 font-semibold">PEPE Launch</span>
          </div>
          <span className="text-[8px] bg-blue-500/12 border border-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-full font-mono">$PEPE</span>
        </div>
        <div className="mb-3.5">
          <p className="text-[8px] text-slate-600 uppercase tracking-widest mb-0.5">Readiness</p>
          <p className="text-2xl font-bold text-white leading-none">74<span className="text-xs text-slate-500">%</span></p>
          <div className="w-full bg-white/5 h-1 rounded-full mt-2">
            <div className="bg-blue-500 h-1 rounded-full" style={{ width: "74%" }} />
          </div>
        </div>
        <div className="space-y-1.5">
          {CHECKLIST.map((t) => (
            <div key={t.label} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-sm border shrink-0 flex items-center justify-center ${t.done ? "bg-emerald-500/20 border-emerald-500/30" : "border-white/15"}`}>
                {t.done && <svg viewBox="0 0 24 24" className="w-1.5 h-1.5 text-emerald-400" stroke="currentColor" fill="none"><path d="M5 13l4 4L19 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </div>
              <span className={`text-[9px] ${t.done ? "text-slate-600 line-through" : "text-slate-400"}`}>{t.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating: Launch Score */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 bg-[#080e1c] border border-blue-500/20 rounded-xl px-3 py-2.5 shadow-lg shadow-blue-500/8 min-w-[112px]">
        <p className="text-[8px] text-blue-400 uppercase tracking-widest">Launch Score</p>
        <p className="text-lg font-bold text-white leading-tight">74<span className="text-[10px] text-slate-500">%</span></p>
        <div className="w-full bg-white/5 h-0.5 rounded-full mt-1"><div className="bg-blue-500 h-0.5 rounded-full" style={{ width: "74%" }} /></div>
      </div>

      {/* Floating: Checklist */}
      <div className="absolute top-[28px] right-4 z-10 bg-[#080e1c] border border-violet-500/20 rounded-xl px-3 py-2.5 shadow-lg shadow-violet-500/8">
        <p className="text-[8px] text-violet-400 uppercase tracking-widest">Checklist</p>
        <p className="text-lg font-bold text-white leading-tight">18<span className="text-[10px] text-slate-500">/24</span></p>
      </div>

      {/* Floating: Open Tasks */}
      <div className="absolute top-[212px] right-2 z-10 bg-[#080e1c] border border-cyan-500/20 rounded-xl px-3 py-2.5 shadow-lg shadow-cyan-500/8">
        <p className="text-[8px] text-cyan-400 uppercase tracking-widest">Open Tasks</p>
        <p className="text-lg font-bold text-white leading-tight">8</p>
      </div>

      {/* Floating: Content */}
      <div className="absolute bottom-[52px] right-8 z-10 bg-[#080e1c] border border-emerald-500/20 rounded-xl px-3 py-2.5 shadow-lg shadow-emerald-500/8">
        <p className="text-[8px] text-emerald-400 uppercase tracking-widest">Content</p>
        <p className="text-sm font-bold text-white leading-tight">5 <span className="text-[10px] text-slate-500">sched.</span></p>
      </div>

      {/* Floating: Team */}
      <div className="absolute bottom-[88px] left-4 z-10 bg-[#080e1c] border border-amber-500/20 rounded-xl px-3 py-2.5 shadow-lg shadow-amber-500/8">
        <p className="text-[8px] text-amber-400 uppercase tracking-widest mb-1.5">Team</p>
        <div className="flex gap-0.5">
          {["M", "J", "A"].map((l) => (
            <div key={l} className="w-4 h-4 rounded-full bg-amber-500/15 border border-amber-500/25 flex items-center justify-center">
              <span className="text-[7px] text-amber-300 font-semibold">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
