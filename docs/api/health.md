# API: Health

**Base path:** `/api/health`
**Auth required:** ❌
**Rate limit:** None
**Last updated:** 2026-05-19

---

## `GET /api/health`

Returns health status of the application.

**Response 200:**
```json
{
  "status": "ok",
  "timestamp": "2026-05-19T23:59:00Z",
  "version": "0.1.0"
}
```

**Errors:**
- None

**Related files:**
- Route: `app/api/health/route.ts`
- Validation: `lib/validations/health.ts`
