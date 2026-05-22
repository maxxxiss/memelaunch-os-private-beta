# Feature: Auth UI and Workspace Onboarding
**Date:** 2026-05-20
**Status:** ✅ Done

## What it does

Implements the first real user flow:
- Authentication UI (login, register, reset-password)
- Protected app shell with workspace detection
- Workspace onboarding form for new users
- Simple workspace dashboard shell

## Files touched

**Auth:**
- `lib/actions/auth.ts` — Auth server actions (sign up, sign in, sign out)
- `app/(auth)/login/page.tsx` — Login page with form
- `app/(auth)/register/page.tsx` — Register page with form
- `app/(auth)/reset-password/page.tsx` — Password reset page

**Workspace:**
- `lib/actions/workspace.ts` — Workspace server actions (create, get user workspaces)
- `app/(app)/page.tsx` — Protected app home with workspace detection
- `app/(app)/[slug]/page.tsx` — Workspace dashboard shell with dynamic routing
- `components/workspace/WorkspaceOnboarding.tsx` — Workspace creation form

**Components:**
- `components/auth/SignOutButton.tsx` — Logout button component

**Documentation:**
- `docs/context.md` — Updated with Milestone 2A status
- `docs/CHANGELOG.md` — Added Milestone 2A changes

## User flow

1. User visits `/app` → redirected to `/auth/login` (not authenticated)
2. User clicks "Sign up" → goes to `/auth/register`
3. User fills form → creates account, redirected to `/auth/login`
4. User signs in → redirected to `/app`
5. If user has no workspace → shows onboarding form
6. User creates workspace → redirected to `/app/{slug}`
7. If user has workspace → redirected to `/app/{slug}` directly
8. User sees dashboard shell with "Coming soon" placeholders

## Auth flow

Uses Supabase Auth email/password only:
- `signUp` — Creates user with optional display_name, auto-creates profile via trigger
- `signIn` — Authenticates with email/password
- `signOut` — Clears session, redirects to `/`

## Workspace creation

- User enters workspace name and slug
- Slug validated with regex: `[a-z0-9-]+`
- Workspace created in database
- Current user added as owner in workspace_members
- User redirected to workspace dashboard

## RLS usage

All database operations use existing RLS policies:
- Workspace creation: Authenticated users can insert
- Workspace reading: Workspace members can view
- Workspace management: Owners can update

## UI states

**Auth pages:**
- Loading state on form submission
- Error state with inline error messages
- Success state via redirect

**Workspace onboarding:**
- Loading state on form submission
- Error state with inline error messages
- Success state via redirect to workspace

**Dashboard shell:**
- Empty state with "Coming soon" placeholders
- No loading/error states yet (data not fetched)

## Security notes

- All auth checks server-side in route layouts
- Forms use Zod validation on server actions
- Password reset uses Supabase built-in flow
- No hardcoded secrets
- Workspace membership enforced via RLS policies
