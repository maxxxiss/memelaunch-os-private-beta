# MemeLaunch OS — Live Stripe Setup Checklist

Use this guide to switch from Stripe test mode to live (production) payments.

---

## 1. Stripe Dashboard — Create Live Products

> Switch to **Live mode** in the Stripe dashboard (toggle top-left).

### Product: MemeLaunch OS Pro
1. Go to **Products → Add product**
2. Name: `MemeLaunch OS Pro`
3. Pricing: `$29.00 / month` — Recurring
4. Save → copy the **Price ID**: `price_live_...`

### Product: MemeLaunch OS Team
1. Go to **Products → Add product**
2. Name: `MemeLaunch OS Team`
3. Pricing: `$99.00 / month` — Recurring
4. Save → copy the **Price ID**: `price_live_...`

---

## 2. Stripe Dashboard — Create Live Webhook

1. Go to **Developers → Webhooks → Add endpoint**
2. URL:
   ```
   https://memelaunch-os-private-beta.vercel.app/api/webhooks/stripe
   ```
3. Payload style: **Snapshot**
4. Listen to these events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Save endpoint → copy the **Signing secret**: `whsec_live_...`

---

## 3. Stripe Dashboard — Copy Live API Keys

1. Go to **Developers → API keys** (still in Live mode)
2. Copy **Publishable key**: `pk_live_...`
3. Reveal and copy **Secret key**: `sk_live_...`

---

## 4. Vercel — Set Production Environment Variables

Go to: **Vercel → Project → Settings → Environment Variables**

Set the following for **Production** environment only:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` |
| `STRIPE_SECRET_KEY` | `sk_live_...` |
| `STRIPE_PRICE_ID_PRO` | `price_live_...` (from step 1) |
| `STRIPE_PRICE_ID_TEAM` | `price_live_...` (from step 1) |
| `STRIPE_WEBHOOK_SECRET` | `whsec_live_...` (from step 2) |
| `NEXT_PUBLIC_APP_URL` | `https://memelaunch-os-private-beta.vercel.app` |

> **Do not paste these values anywhere in source code or chat.**
> Set them directly in Vercel UI only.

---

## 5. Vercel — Redeploy

1. Go to **Vercel → Project → Deployments**
2. Click **Redeploy** on the latest deployment (or push a new commit)
3. Wait for deployment to complete

---

## 6. Verify Live Setup

After redeployment:

1. Log in as admin → go to `/admin/stripe`
2. Confirm all env vars show **present**
3. Confirm keys show mode **live** (not test)
4. Confirm no yellow test-key warning is shown

---

## 7. Test Live Payment Flow

> Use a real card for one test transaction, then refund it in Stripe dashboard.

1. Log in as a normal user
2. Go to `/pricing`
3. Click **Get Pro** or **Get Team**
4. Complete checkout with a real card
5. Confirm redirect back to `/app?checkout=success`
6. Confirm dashboard shows **Pro Plan** or **Team Plan** badge
7. Check Supabase: `subscriptions` row has `status = active`, `plan_type = pro`
8. Check Stripe dashboard: subscription is active
9. Check Stripe webhook logs: `checkout.session.completed` → 200 OK

---

## 8. Stripe Webhook Test After Go-Live

1. Go to **Stripe → Developers → Webhooks → your live endpoint**
2. Click **Send test event** → `checkout.session.completed`
3. Confirm Vercel logs show 200 OK
4. If 400 error: check `STRIPE_WEBHOOK_SECRET` in Vercel matches the live endpoint signing secret

---

## Security Reminders

- Never commit `sk_live_`, `pk_live_`, or `whsec_live_` to git
- Never paste live secrets into chat
- Never share `.env.local` with live keys
- Rotate keys immediately if accidentally exposed
- Service role key (`SUPABASE_SERVICE_ROLE_KEY`) must also never be exposed

---

## Rollback

To revert to test mode:
1. Go to Vercel env vars
2. Replace live values with test values (`sk_test_`, `pk_test_`, test price IDs, test whsec)
3. Redeploy
