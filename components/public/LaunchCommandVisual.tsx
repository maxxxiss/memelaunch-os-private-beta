"use client";

import { motion } from "framer-motion";

const CHECKLIST = [
  { label: "Contract deployed", done: true },
  { label: "Telegram setup", done: true },
  { label: "Liquidity pool", done: false },
  { label: "Marketing push", done: false },
];

function SatelliteCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-gradient-to-b from-[#0a1628] to-[#060e1c] border border-blue-400/22 rounded-2xl px-3 py-2.5 shadow-[0_2px_12px_rgba(59,130,246,0.18)] backdrop-blur-sm relative ${className}`}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent rounded-t-2xl" />
      {children}
    </div>
  );
}

export function LaunchCommandVisual() {
  return (
    <div className="relative w-full h-[520px] select-none overflow-hidden" aria-hidden="true">
      {/* Ambient glow orbs - increased opacity */}
      <div className="absolute top-[28%] left-[32%] w-[340px] h-[340px] rounded-full bg-blue-600/14 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[15%] right-[15%] w-[240px] h-[240px] rounded-full bg-violet-500/12 blur-3xl pointer-events-none" />
      <div className="absolute top-[5%] right-[25%] w-[180px] h-[180px] rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />

      {/* SVG connection lines with dash animation */}
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
        <line x1="270" y1="260" x2="295" y2="28" stroke="url(#cl1)" strokeWidth="1.5" strokeDasharray="8 6" className="animate-dash" />
        <line x1="270" y1="260" x2="528" y2="58" stroke="url(#cl2)" strokeWidth="1.5" strokeDasharray="8 6" className="animate-dash" style={{ animationDelay: "0.5s" }} />
        <line x1="270" y1="260" x2="568" y2="228" stroke="url(#cl3)" strokeWidth="1.5" strokeDasharray="8 6" className="animate-dash" style={{ animationDelay: "1s" }} />
        <line x1="270" y1="260" x2="508" y2="432" stroke="url(#cl4)" strokeWidth="1.5" strokeDasharray="8 6" className="animate-dash" style={{ animationDelay: "1.5s" }} />
        <line x1="270" y1="260" x2="58" y2="402" stroke="url(#cl5)" strokeWidth="1.5" strokeDasharray="8 6" className="animate-dash" style={{ animationDelay: "2s" }} />
        <circle cx="270" cy="260" r="5" fill="#3B82F6" fillOpacity="0.8" />
        <circle cx="270" cy="260" r="10" fill="none" stroke="#3B82F6" strokeOpacity="0.3" strokeWidth="1.5">
          <animate attributeName="r" values="10;16;10" dur="2.5s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="295" cy="28" r="3" fill="#3B82F6" fillOpacity="0.55" />
        <circle cx="528" cy="58" r="3" fill="#8B5CF6" fillOpacity="0.55" />
        <circle cx="568" cy="228" r="3" fill="#06B6D4" fillOpacity="0.55" />
        <circle cx="508" cy="432" r="3" fill="#22C55E" fillOpacity="0.55" />
        <circle cx="58" cy="402" r="3" fill="#F59E0B" fillOpacity="0.55" />
      </svg>

      {/* Animated orbit rings */}
      <div className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] rounded-full border border-blue-500/18" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full border border-dashed border-blue-500/10"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-violet-500/6"
      />

      {/* Central panel with micro-gauge */}
      <div className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 z-10 w-[200px] bg-gradient-to-b from-[#0a1628] to-[#06101e] border border-blue-400/25 rounded-3xl p-5 shadow-panel">
        <div className="flex items-center gap-1.5 mb-3 pb-3 border-b border-white/8">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] text-slate-300 font-semibold tracking-wide">PEPE Launch</span>
          <span className="ml-auto font-mono text-[8px] border border-blue-400/20 bg-blue-500/10 text-blue-300 px-1.5 py-0.5 rounded-full">$PEPE</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="relative w-12 h-12">
            <svg className="-rotate-90 w-full h-full" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="16" strokeWidth="4" stroke="rgba(255,255,255,0.06)" fill="none" />
              <circle cx="20" cy="20" r="16" strokeWidth="4" stroke="#3B82F6" fill="none" strokeLinecap="round" strokeDasharray="74.4 100.4" style={{ filter: "drop-shadow(0 0 4px #3B82F6)" }} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">74</span>
            </div>
          </div>
          <div>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest">Readiness</p>
            <p className="text-xs font-bold text-blue-300">Getting closer</p>
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

      {/* Floating satellite cards with animation */}
      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-3 left-1/2 -translate-x-1/2 z-10 min-w-[112px]">
        <SatelliteCard>
          <p className="text-[8px] text-blue-400 uppercase tracking-widest">Launch Score</p>
          <p className="text-lg font-bold text-white leading-tight">74<span className="text-[10px] text-slate-500">%</span></p>
          <div className="w-full bg-white/5 h-0.5 rounded-full mt-1"><div className="bg-blue-500 h-0.5 rounded-full" style={{ width: "74%" }} /></div>
        </SatelliteCard>
      </motion.div>

      <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} className="absolute top-[28px] right-4 z-10">
        <SatelliteCard>
          <p className="text-[8px] text-violet-400 uppercase tracking-widest">Checklist</p>
          <p className="text-lg font-bold text-white leading-tight">18<span className="text-[10px] text-slate-500">/24</span></p>
        </SatelliteCard>
      </motion.div>

      <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.4 }} className="absolute top-[212px] right-2 z-10">
        <SatelliteCard>
          <p className="text-[8px] text-cyan-400 uppercase tracking-widest">Open Tasks</p>
          <p className="text-lg font-bold text-white leading-tight">8</p>
        </SatelliteCard>
      </motion.div>

      <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} className="absolute bottom-[52px] right-8 z-10">
        <SatelliteCard>
          <p className="text-[8px] text-emerald-400 uppercase tracking-widest">Content</p>
          <p className="text-sm font-bold text-white leading-tight">5 <span className="text-[10px] text-slate-500">sched.</span></p>
        </SatelliteCard>
      </motion.div>

      <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.0 }} className="absolute bottom-[88px] left-4 z-10">
        <SatelliteCard>
          <p className="text-[8px] text-amber-400 uppercase tracking-widest mb-1.5">Team</p>
          <div className="flex gap-0.5">
            {["M", "J", "A"].map((l) => (
              <div key={l} className="w-4 h-4 rounded-full bg-amber-500/15 border border-amber-500/25 flex items-center justify-center">
                <span className="text-[7px] text-amber-300 font-semibold">{l}</span>
              </div>
            ))}
          </div>
        </SatelliteCard>
      </motion.div>
    </div>
  );
}
