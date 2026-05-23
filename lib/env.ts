import { z } from "zod";

const envSchema = z.object({
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  SUPABASE_DB_URL: z.string().url(),

  // App
  NEXT_PUBLIC_APP_URL: z.string().url(),
  PORT_WEB: z.string().default("3000"),

  // Admin
  ADMIN_EMAIL: z.string().email().optional(),
  ADMIN_PASSWORD_HASH: z.string().min(1).optional(),
  ADMIN_BOOTSTRAP_DISPLAY_NAME: z.string().default("ADMIN_BOOTSTRAP"),

  // Metrics Providers (server-side only)
  DEXSCREENER_API_KEY: z.string().optional(),
  HELIUS_API_KEY: z.string().optional(),
  BIRDEYE_API_KEY: z.string().optional(),

  // Stripe
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  STRIPE_PRICE_ID_PRO: z.string().optional(),
  STRIPE_PRICE_ID_TEAM: z.string().optional(),

  // Telegram/Discord (later)
  TELEGRAM_BOT_TOKEN: z.string().optional(),
  DISCORD_WEBHOOK_URL: z.string().url().optional(),

  // Render (auto-set)
  RENDER: z.string().optional(),
});

export const env = envSchema.parse(process.env);
