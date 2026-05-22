# Deployment

## Render

### Setup

1. Create a Render account
2. Connect GitHub repository
3. Create a new web service
4. Configure:
   - Build command: `pnpm install && pnpm build`
   - Start command: `pnpm start`
   - Environment variables (see `.env.example`)

### Environment variables

Set these in Render dashboard:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_DB_URL`
- `NEXT_PUBLIC_APP_URL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`
- Metrics provider keys (optional)
- Stripe keys (later)
- Telegram/Discord keys (later)

### Auto deploy

- Auto deploy from `main` branch
- Preview deploys for feature branches

## Supabase

### Setup

1. Create Supabase project
2. Get credentials
3. Run migrations: `supabase db reset`
4. Enable RLS on all tables

### Local development

```bash
supabase start
supabase db reset
```

## Health check

- Endpoint: `/api/health`
- Returns: status, timestamp, version
