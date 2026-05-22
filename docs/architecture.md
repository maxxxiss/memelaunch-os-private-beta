# Architecture

## Layers

### Frontend
- Next.js 15+ App Router with route groups: `(auth)`, `(app)`, `(admin)`
- Server Components by default
- Tailwind CSS with semantic tokens
- shadcn/ui components
- next-themes for dark mode

### Backend
- Next.js API routes and server actions
- Supabase Auth session checks
- Zod validation on every boundary
- Rate limiting on mutations

### Realtime
- Supabase Realtime by default
- No dedicated websocket service in MVP

### Admin
- Lives in `app/(admin)`
- Admin role checked server-side via display_name bootstrap
- Role stored in database

### Shared
- `lib/env.ts` — Zod-validated environment
- `lib/validations/` — Zod schemas for workspaces, projects, profiles
- `lib/supabase/` — Server and browser clients + middleware
- `lib/utils/` — Pure helpers

## Data flow

1. Client component calls server action or API route
2. Server validates input with Zod
3. Server checks auth and workspace membership
4. Server interacts with Supabase
5. Server returns validated response

## Security

- RLS enabled on every table
- Service role key server-side only
- No hardcoded secrets
- All config via `.env` and `lib/env.ts`
