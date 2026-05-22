# MemeLaunch OS

Launch operating system for memecoin teams, communities, and builders.

## Quickstart

```bash
cp .env.example .env.local
pnpm install
pnpm dev:kompletka
```

## Stack

- Next.js 15+ (App Router)
- TypeScript strict mode
- Tailwind CSS + shadcn/ui
- Supabase (Postgres + Auth + RLS + Realtime)
- Zod validation
- React Hook Form
- Render deployment
- pnpm

## Documentation

- [Context](docs/context.md) — project overview and current state
- [Architecture](docs/architecture.md) — system design and layers
- [Deployment](docs/deployment.md) — Render + Supabase setup
- [API Docs](docs/api/README.md) — API reference
- [CHANGELOG](docs/CHANGELOG.md) — version history

## Development

```bash
# Install dependencies
pnpm install

# Start all services (Supabase + Next.js)
pnpm dev:kompletka

# Stop all services
pnpm stop:kompletka

# Type check
pnpm type-check

# Lint
pnpm lint
```

## Security

- No hardcoded secrets
- All config via `.env` and validated in `lib/env.ts`
- Supabase RLS enabled on every table
- Service role key server-side only
- Zod validation on every boundary

## License

Proprietary. All rights reserved.
