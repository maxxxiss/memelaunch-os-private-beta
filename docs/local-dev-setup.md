# Local Development Setup

## Supabase Local Development

### Email Confirmation

For local development, Supabase may require email confirmation. If you experience issues with signup/login, check your local Supabase settings:

1. Run `supabase status` to see your local instance
2. Access the dashboard at the URL shown (usually http://localhost:54323)
3. Go to Authentication > Providers > Email
4. Disable "Confirm email" for local development
5. Alternatively, use the `supabase auth signup` CLI to create test users without email confirmation

### Test User Creation

To create a test user without email confirmation:

```bash
supabase auth signup --email test@example.com --password test123456
```

Or use the Supabase dashboard:
1. Go to Authentication > Users
2. Click "Add user"
3. Enter email and password
4. Set "Confirm email" to false

### Database Reset

If you need to reset the database:

```bash
pnpm exec supabase db reset
```

This will:
- Drop and recreate the database
- Re-run all migrations
- Clear all data

### Common Issues

**"Not authenticated" in server actions:**
- Ensure middleware is calling `getUser()` to refresh cookies
- Use `getSession()` instead of `getUser()` in server actions
- Check that cookies are being set correctly in middleware

**RLS policy recursion:**
- Ensure helper functions use `SECURITY DEFINER`
- Set `search_path = public` in helper functions
- Avoid recursive EXISTS queries on the same table
