---
trigger: model_decision
description: Architecture, docs, API documentation, and development workflow rules. Use whenever planning, creating files, APIs, DB schema, or features.
---

# Architecture, Docs, and API Rule

## Required architecture layers
Plan and organize the project by these layers where applicable:
- `frontend/` or `app/` — Next.js App Router UI
- `backend/` — API routes, server actions, business logic
- `websocket/` — only if Supabase Realtime is insufficient
- `admin/` — admin panel if required
- `shared/` — shared types, Zod schemas, utilities

## Required initial workflow
1. Ask at most 3–5 clarifying questions if needed.
2. Propose architecture split by frontend/backend/websocket/admin/shared.
3. Wait for user approval before coding.
4. Set up Supabase schema + RLS.
5. Create docs first: `docs/context.md`, `README.md`, `.env.example`.
6. Add boilerplate.
7. Add auth.
8. Build the first smallest end-to-end feature.

## Required docs
Maintain:
- `docs/context.md` — single source of truth, update after every feature.
- `docs/features/{feature}.md` — one file per feature.
- `docs/architecture.md` — diagram and layer descriptions.
- `docs/deployment.md` — Render + Supabase setup.
- `docs/CHANGELOG.md` — Keep a Changelog + SemVer.
- `README.md` — new developer quickstart.

## API docs
For every API endpoint created, changed, or removed:
1. Create/update `docs/api/{resource}.md`.
2. Update `docs/api/README.md`.
3. Update `docs/context.md` API section.
4. Update `docs/CHANGELOG.md` under `[Unreleased]`.

Every endpoint must have:
- Zod input validation,
- Zod output schema where practical,
- consistent errors,
- auth model,
- rate limits,
- related source file links in docs.

## Definition of done
A feature is done only when:
- code is implemented,
- no file exceeds 150 lines,
- no hardcoded values,
- Zod validation exists,
- RLS exists for new tables,
- protected routes have auth checks,
- feature docs are written,
- context docs are updated,
- API docs are updated if applicable,
- changelog is updated,
- `.env.example` is updated if needed,
- UI has loading/empty/error/success states,
- happy path and one edge case are tested locally,
- Render preview deploy remains viable.
