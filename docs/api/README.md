# API Documentation

## Overview

All API endpoints follow these conventions:
- REST-style routes in `app/api/`
- Zod input validation
- Zod output schema where practical
- Consistent error responses
- Auth required on protected routes
- Rate limiting on mutations

## Auth model

- Supabase Auth sessions
- Bearer token in Authorization header
- Server-side session validation on protected routes

## Error codes

See [errors.md](./_shared/errors.md).

## Rate limits

See [rate-limits.md](./_shared/rate-limits.md).

## Conventions

See [conventions.md](./_shared/conventions.md).

## Endpoints

- [Health](./health.md) — `/api/health`
