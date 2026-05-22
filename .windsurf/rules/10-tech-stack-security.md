---
trigger: always_on
description: Non-negotiable tech stack and security rules.
---

# Tech Stack and Security Rule

## Fixed stack
Use:
- Next.js 15+ App Router
- TypeScript strict mode, no `any`
- Tailwind CSS + shadcn/ui
- Supabase Postgres
- Supabase Auth + RLS
- Supabase Realtime by default
- Zod on every boundary
- React Hook Form + Zod resolver
- Render deployment
- pnpm

## Security hard rules
- No hardcoded secrets, URLs, API keys, IDs, or emails.
- All config goes through `.env` and validated Zod env schema in `lib/env.ts`.
- `.env.example` must always be current and contain no real values.
- Supabase RLS must be enabled on every table.
- Service role key is server-side only.
- Every API route and server action validates input with Zod before DB access.
- No raw SQL string interpolation.
- Add rate limiting to mutations.
- Do not use `dangerouslySetInnerHTML` without sanitization.
- Logs must never include secrets, tokens, passwords, seed phrases, or full emails.
- Every protected route, server action, and API endpoint must check auth server-side.

## Code quality
- Max 150 lines per file.
- Single responsibility per function/component/module.
- Server Components by default.
- Use `"use client"` only when browser state, event handlers, or browser APIs are required.
- No dead imports, dead variables, unused comments, or duplicate logic.
- No `@ts-ignore`, `eslint-disable`, or workaround comments unless explained and unavoidable.

## File naming
- Components: `PascalCase.tsx`
- Hooks: `useThing.ts`
- Utilities: `kebab-case.ts`
- Global types: `PascalCase`
