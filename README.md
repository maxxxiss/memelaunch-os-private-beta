# MemeLaunch OS

Launch operating system for memecoin teams, communities, and builders.

## Private Beta Quickstart

### Local Setup

```bash
# Clone the repository
git clone <repository-url>
cd memelaunch-os

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Start Supabase local
supabase start

# Get local Supabase credentials
supabase status

# Fill in .env.local with local Supabase credentials
# NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
# NEXT_PUBLIC_SUPABASE_ANON_KEY=<from supabase status>
# SUPABASE_SERVICE_ROLE_KEY=<from supabase status>
# SUPABASE_DB_URL=<from supabase status>
# NEXT_PUBLIC_APP_URL=http://localhost:3000

# Run migrations
supabase db reset

# Start development server
pnpm dev
```

### Test Flow

1. Open http://localhost:3000
2. Register a new account
3. Create a workspace
4. Create a launch project with a template (Basic, Solana Meme, or Community-First)
5. Verify checklist items, tasks, and content items are created
6. Test project settings editing
7. Test adding project links
8. Test task status updates
9. Test content status updates
10. Test launch plan export (copy to clipboard)

### Deploy Flow

1. Create a Supabase Cloud project at [supabase.com](https://supabase.com)
2. Get credentials from Project Settings > API
3. Configure auth redirect URLs in Supabase
4. Push migrations: `supabase link --project-ref YOUR_REF && supabase db push`
5. Deploy to Render or Vercel (see [docs/deployment.md](docs/deployment.md))
6. Set environment variables in deployment platform
7. Test production deployment

### Known Limitations

- No Stripe integration yet
- No Telegram/Discord real integrations yet
- No token metrics yet
- No admin panel yet
- No wallet connect

## Stack

- Next.js 15+ (App Router)
- TypeScript strict mode
- Tailwind CSS + shadcn/ui
- Supabase (Postgres + Auth + RLS + Realtime)
- Zod validation
- React Hook Form
- Render or Vercel deployment
- pnpm

## Documentation

- [Context](docs/context.md) — project overview and current state
- [Architecture](docs/architecture.md) — system design and layers
- [Deployment](docs/deployment.md) — Render + Vercel + Supabase setup
- [API Docs](docs/api/README.md) — API reference
- [CHANGELOG](docs/CHANGELOG.md) — version history

## Development

```bash
# Install dependencies
pnpm install

# Start Supabase local
supabase start

# Run migrations
supabase db reset

# Start development server
pnpm dev

# Type check
pnpm type-check

# Lint
pnpm lint

# Build
pnpm build
```

## Security

- No hardcoded secrets
- All config via `.env` and validated in `lib/env.ts`
- Supabase RLS enabled on every table
- Service role key server-side only
- Zod validation on every boundary
- `.env.local` and `.env` ignored by git

## License

Proprietary. All rights reserved.
