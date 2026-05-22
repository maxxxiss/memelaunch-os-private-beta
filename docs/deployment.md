# Deployment

## Supabase Cloud Setup

### Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Choose a region close to your users
4. Set a strong database password (save it securely)
5. Wait for the project to be provisioned

### Get Credentials

1. Go to Project Settings > API
2. Copy the following values:
   - Project URL (NEXT_PUBLIC_SUPABASE_URL)
   - anon public key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
   - service_role key (SUPABASE_SERVICE_ROLE_KEY)
3. Go to Project Settings > Database
4. Copy the Connection String (SUPABASE_DB_URL)

### Configure Auth Redirect URLs

1. Go to Authentication > URL Configuration
2. Add your production URL to Redirect URLs:
   - For local: `http://localhost:3000/**`
   - For production: `https://your-domain.com/**`
3. Add to Site URL:
   - For local: `http://localhost:3000`
   - For production: `https://your-domain.com`

### Run Migrations

1. Install Supabase CLI locally
2. Link your local project: `supabase link --project-ref YOUR_PROJECT_REF`
3. Push migrations: `supabase db push`
4. Or reset: `supabase db reset`

### Enable RLS

RLS is enabled by default in migrations. Verify:
1. Go to Database > Tables
2. For each table, check that "Enable Row Level Security" is on
3. Review policies in the SQL editor

## Render Deployment

### Setup

1. Create a Render account
2. Connect GitHub repository
3. Create a new web service
4. Configure:
   - Name: memelaunch-os
   - Region: choose closest to your users
   - Branch: main
   - Build command: `pnpm install && pnpm build`
   - Start command: `pnpm start`
   - Environment variables (see below)

### Environment Variables

Set these in Render dashboard:

**Required:**
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `SUPABASE_DB_URL` - Your Supabase database connection string
- `NEXT_PUBLIC_APP_URL` - Your Render app URL (e.g., https://memelaunch-os.onrender.com)

**Optional:**
- `ADMIN_EMAIL` - Admin email for bootstrap
- `ADMIN_PASSWORD_HASH` - Pre-hashed admin password
- `ADMIN_BOOTSTRAP_DISPLAY_NAME` - Admin display name
- `DEXSCREENER_API_KEY` - For token metrics (future)
- `HELIUS_API_KEY` - For token metrics (future)
- `BIRDEYE_API_KEY` - For token metrics (future)

**Do not set locally:**
- `RENDER` - Auto-set by Render

### Production Checklist

1. Create Supabase project
2. Get Supabase credentials
3. Configure Supabase auth redirect URLs
4. Push migrations to Supabase Cloud
5. Create Render web service
6. Set environment variables in Render
7. Deploy to Render
8. Test register/login flow
9. Test workspace creation
10. Test project creation with template
11. Test launch plan export

### Auto Deploy

- Auto deploy from main branch
- Preview deploys for feature branches

## Vercel Deployment

### Setup

1. Create a Vercel account
2. Connect GitHub repository
3. Import the project
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `pnpm install && pnpm build`
   - Output Directory: `.next`
   - Environment variables (see below)

### Environment Variables

Set these in Vercel dashboard:

**Required:**
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `SUPABASE_DB_URL` - Your Supabase database connection string
- `NEXT_PUBLIC_APP_URL` - Your Vercel app URL (e.g., https://memelaunch-os.vercel.app)

**Optional:**
- Same as Render above

### Production Checklist

Same as Render, but deploy to Vercel instead.

## Local Development

### Setup

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Copy `.env.example` to `.env.local`
4. Fill in local Supabase credentials
5. Start Supabase local: `supabase start`
6. Run migrations: `supabase db reset`
7. Start dev server: `pnpm dev`

### Environment Variables for Local

Use local Supabase instance:
- `NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - From `supabase status`
- `SUPABASE_SERVICE_ROLE_KEY` - From `supabase status`
- `SUPABASE_DB_URL` - From `supabase status`
- `NEXT_PUBLIC_APP_URL=http://localhost:3000`

## Health Check

- Endpoint: `/api/health`
- Returns: status, timestamp, version
- Use for monitoring and uptime checks
