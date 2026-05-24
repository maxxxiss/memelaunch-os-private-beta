import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        surface: {
          DEFAULT: "#0d1117",
          muted: "#070b14",
          subtle: "#111827",
          elevated: "#0f1623",
          deep: "#05070d",
        },
        content: {
          DEFAULT: "#f8fafc",
          muted: "#94a3b8",
          subtle: "#64748b",
          inverse: "#0f172a",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "24px",
        pill: "999px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.04)",
        pop: "0 12px 40px -8px rgba(0,0,0,0.12)",
        "glow-blue": "0 0 0 1px rgba(59,130,246,0.18), 0 4px 32px rgba(59,130,246,0.28)",
        "glow-cyan": "0 0 0 1px rgba(6,182,212,0.15),  0 4px 24px rgba(6,182,212,0.22)",
        "glow-violet": "0 0 0 1px rgba(139,92,246,0.18), 0 4px 24px rgba(139,92,246,0.22)",
        "glow-emerald": "0 0 0 1px rgba(16,185,129,0.18), 0 4px 24px rgba(16,185,129,0.22)",
        panel: "0 0 0 1px rgba(255,255,255,0.06), 0 16px 48px rgba(0,0,0,0.48)",
        cta: "0 4px 20px rgba(59,130,246,0.40), 0 1px 3px rgba(0,0,0,0.30)",
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(ellipse 110% 65% at 50% -5%, rgba(59,130,246,0.22) 0%, transparent 65%)",
        "card-shimmer": "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%)",
        "pro-card": "linear-gradient(135deg, rgba(59,130,246,0.25) 0%, rgba(139,92,246,0.12) 50%, rgba(6,182,212,0.08) 100%)",
        "sidebar-id": "linear-gradient(135deg, rgba(59,130,246,0.18) 0%, rgba(6,182,212,0.10) 100%)",
      },
      keyframes: {
        "float-slow": { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-6px)" } },
        "dash": { "to": { strokeDashoffset: "-28" } },
        "ring-pulse": {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.1", transform: "scale(1.08)" },
        },
      },
      animation: {
        "float-slow": "float-slow 4s ease-in-out infinite",
        "float-mid": "float-slow 5.5s ease-in-out infinite",
        "float-fast": "float-slow 3.5s ease-in-out infinite",
        "ring-pulse": "ring-pulse 3s ease-in-out infinite",
        "dash": "dash 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
