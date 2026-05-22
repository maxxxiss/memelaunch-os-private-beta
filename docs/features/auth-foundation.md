# Feature: Auth Foundation
**Date:** 2026-05-20
**Status:** ✅ Done

## What it does

Sets up the foundation for authentication, database schema, and protected routes:
- Supabase local project structure
- Database tables for profiles, workspaces, workspace_members, launch_projects
- Row Level Security (RLS) policies on all tables
- SQL helper functions for workspace membership and role checks
- Auth middleware for session management
- Route groups for auth, app, and admin areas
- Zod validation schemas for database entities
- Admin bootstrap mechanism via display_name

## Files touched

- `supabase/config.toml` — Supabase local configuration
- `supabase/migrations/20240520000001_initial_schema.sql` — Initial database schema
- `lib/supabase/middleware.ts` — Auth middleware for session management
- `lib/supabase/server.ts` — Updated to async for Next.js 15 cookies API
- `app/(auth)/layout.tsx` — Auth route group layout
- `app/(app)/layout.tsx` — Protected app route group with auth check
- `app/(admin)/layout.tsx` — Admin route group with admin check
- `.env.example` — Added ADMIN_BOOTSTRAP_DISPLAY_NAME
- `lib/env.ts` — Added admin bootstrap display name validation
- `lib/validations/workspace.ts` — Workspace Zod schemas
- `lib/validations/project.ts` — Project Zod schemas
- `lib/validations/profile.ts` — Profile Zod schemas
- `docs/context.md` — Updated with auth foundation status
- `docs/architecture.md` — Updated with route groups and auth details
- `docs/CHANGELOG.md` — Added auth foundation changes

## DB changes

**Migration:** `20240520000001_initial_schema.sql`

**Tables created:**
- `profiles` — User profiles linked to auth.users
- `workspaces` — Team workspaces
- `workspace_members` — Workspace membership with roles
- `launch_projects` — Launch projects within workspaces

**RLS policies:**
- `profiles` — Users can view/update own profile
- `workspaces` — Workspace members can view, owners can update
- `workspace_members` — Members can view, owners can manage
- `launch_projects` — Members can view, owners/members can manage

**SQL helper functions:**
- `is_workspace_member(workspace_id, user_id)` — Check membership
- `has_workspace_role(workspace_id, user_id, roles[])` — Check role
- `is_admin()` — Check admin bootstrap via display_name

**Trigger:**
- `on_auth_user_created` — Auto-create profile on auth signup

## Env variables (new)

- `ADMIN_BOOTSTRAP_DISPLAY_NAME` — Display name for admin bootstrap (default: ADMIN_BOOTSTRAP)

## How to test

1. Start Supabase local: `supabase start`
2. Run migration: `supabase db reset`
3. Start dev server: `pnpm dev`
4. Visit protected route `/app` — should redirect to `/auth/signin`
5. Visit admin route `/admin` — should redirect to `/auth/signin`
6. Create admin user via Supabase dashboard with display_name "ADMIN_BOOTSTRAP"
7. Sign in and verify admin access to `/admin`

## Security notes

- RLS enabled on every table
- Service role key server-side only
- Admin check uses display_name bootstrap (temporary, will use admin_roles table later)
- Middleware handles session refresh on every request
- All protected routes check auth server-side
- Workspace membership enforced via RLS policies
