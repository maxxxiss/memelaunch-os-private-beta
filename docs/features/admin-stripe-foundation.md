# Admin Panel + Stripe Payment Foundation

## Purpose

This milestone adds the foundation for MemeLaunch OS to operate as a real SaaS product with admin management and Stripe payment integration.

## Database Changes

### New Tables

**admin_roles**
- Stores admin user assignments
- Columns: id, user_id, role (admin, super_admin), created_at
- RLS policies: Only admins can view/manage admin roles
- Updated `is_admin()` function to use this table

**subscriptions**
- Stores Stripe subscription data
- Columns: id, user_id, workspace_id, stripe_customer_id, stripe_subscription_id, stripe_price_id, status, plan_type, current_period_start, current_period_end, cancel_at_period_end, created_at, updated_at
- RLS policies: Users view own subscriptions, admins view all
- No INSERT/UPDATE/DELETE policies (managed via Stripe webhooks only)

### Schema Changes

**workspaces**
- Added `plan` column (free, pro, team) with default 'free'

## Admin Panel

### Routes
- `/admin` - Admin dashboard
- `/admin/users` - Users list
- `/admin/workspaces` - Workspaces list with suspend/unsuspend
- `/admin/projects` - Projects list

### Features
- Server-side admin check using `is_admin()` RPC function
- Dashboard metrics: total users, workspaces, projects, subscriptions
- Recent workspaces and projects display
- Workspace suspend/unsuspend action
- No secrets exposed in admin UI

## Stripe Integration

### Environment Variables
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Client-side Stripe key
- `STRIPE_SECRET_KEY` - Server-side Stripe key
- `STRIPE_WEBHOOK_SECRET` - Webhook signature verification
- `STRIPE_PRICE_ID_PRO` - Pro plan price ID
- `STRIPE_PRICE_ID_TEAM` - Team plan price ID

### Server Actions
- `createCheckoutSession(priceId)` - Creates Stripe checkout session
- Handles customer creation if needed
- Returns checkout URL

### Webhook Route
- `/api/webhooks/stripe` - Handles Stripe webhooks
- Events handled:
  - `checkout.session.completed` - Creates subscription
  - `customer.subscription.created` - Updates subscription
  - `customer.subscription.updated` - Updates subscription
  - `customer.subscription.deleted` - Cancels subscription
- Signature verification required
- Updates plan_type based on price ID

## Pricing Page

### Plans
- **Free** ($0/month): 1 workspace, 1 project, core features
- **Pro** ($29/month): Unlimited workspaces/projects, launch export, templates
- **Team** ($99/month): Everything in Pro + team collaboration (placeholder)

### UI
- Three pricing cards with feature lists
- Pro plan marked as "Popular"
- Upgrade buttons disabled (Stripe checkout not yet connected to UI)

## Plan Awareness

### Workspace Dashboard
- Shows current plan badge in header
- Plan displayed as "free plan", "pro plan", or "team plan"

### Free Plan Limits
- **1 workspace per user** - Enforced in `createWorkspace` action
- **1 project per workspace** - Enforced in `createLaunchProject` action
- Upgrade CTAs shown when limits reached

## Security

- Admin routes protected server-side via `is_admin()` RPC
- Stripe secret key never exposed to client
- Stripe webhook signature verified
- RLS enabled on all new tables
- Service role key server-side only
- No fake paid status - all Stripe integration is real

## Dependencies

- Added `stripe@^17.0.0` to package.json
- Added Stripe env vars to lib/env.ts schema

## File Changes

**Database:**
- `supabase/migrations/20240523000001_admin_roles.sql` (new)
- `supabase/migrations/20240523000002_subscriptions.sql` (new)
- `supabase/migrations/20240523000003_workspace_plan.sql` (new)

**Configuration:**
- `.env.example` (updated) - Added Stripe env vars
- `lib/env.ts` (updated) - Added Stripe env vars to schema
- `package.json` (updated) - Added stripe dependency

**Admin:**
- `app/(admin)/layout.tsx` (updated) - Uses `is_admin()` RPC
- `app/admin/page.tsx` (new) - Admin dashboard
- `app/admin/users/page.tsx` (new) - Users list
- `app/admin/workspaces/page.tsx` (new) - Workspaces with suspend
- `app/admin/projects/page.tsx` (new) - Projects list

**Stripe:**
- `lib/actions/stripe.ts` (new) - Checkout session action
- `app/api/webhooks/stripe/route.ts` (new) - Webhook handler

**Pricing:**
- `app/pricing/page.tsx` (new) - Pricing page

**Plan Enforcement:**
- `lib/actions/workspace.ts` (updated) - Enforces 1 workspace limit
- `lib/actions/launch-project.ts` (updated) - Enforces 1 project limit
- `app/app/[slug]/page.tsx` (updated) - Shows plan badge

**Documentation:**
- `docs/context.md` (updated) - Added Milestone 5A
- `docs/CHANGELOG.md` (updated) - Added sprint entries
- `docs/deployment.md` (updated) - Added Stripe env vars
- `docs/features/admin-stripe-foundation.md` (new) - This file

## Next Steps

Future work could include:
- Connect Stripe checkout to pricing page buttons
- Add admin user management (promote/demote)
- Add subscription management UI for users
- Implement Team plan features
- Add custom branding for Team plan
- Add priority support for Team plan
