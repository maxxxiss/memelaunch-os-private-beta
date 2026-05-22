# MemeLaunch OS — Context

## What the app does

MemeLaunch OS is a legitimate launch operations SaaS for memecoin teams to organize workspaces, launch projects, checklists, tasks, content calendars, community links, read-only metrics, and alerts. It does not support trading, botting, or market manipulation.

## Current stack

- Next.js 15+ (App Router)
- TypeScript strict mode
- Tailwind CSS + shadcn/ui
- Supabase (Postgres + Auth + RLS + Realtime)
- Zod validation
- React Hook Form
- Render deployment
- pnpm

## Architecture

- `app/` — Next.js App Router UI with route groups: `(auth)`, `(admin)`
- `app/app/` — Protected app routes at /app and /app/[slug]
- `lib/` — Utilities, Supabase clients, validations
- `components/` — React components
- `supabase/` — Database migrations and config
- `docs/` — Documentation

## Completed features

- Milestone 1A: Project baseline, env validation, health endpoint, docs
- Milestone 1B: Supabase schema, RLS policies, auth middleware, route groups, Zod schemas
- Milestone 2A: Auth UI (login, register, reset-password), workspace onboarding, dashboard shell
- Milestone 3A: Launch projects with checklist, project detail pages, dashboard metrics
- Milestone 3B: Team tasks and content planner
- Milestone 3C: Demo polish and UX quality improvements

## Known limitations

- No Stripe yet
- No Telegram/Discord integrations yet
- No token metrics yet

## Last updated

2026-05-22 — Milestone 3C: Demo Polish + UX Quality
