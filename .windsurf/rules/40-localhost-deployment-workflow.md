---
trigger: model_decision
description: Local development, deployment, and agent behavior rules. Use for setup, scripts, Render, Supabase, and terminal workflows.
---

# Localhost, Deployment, and Agent Behavior Rule

## Local development
Project must have one master command:

```bash
pnpm dev:kompletka
```

Prefer `mprocs` for beginners. Only include services the project actually has.

Each service must have a health endpoint. Ports must come from env:
- `PORT_WEB=3000`
- `PORT_ADMIN=3001`
- `PORT_API=4000`
- `PORT_WS=4001`

Do not hardcode ports.

## First setup instructions
On first run, tell the user:

```bash
cp .env.example .env.local
pnpm install
supabase db reset
pnpm dev:kompletka
```

## Deployment
Default deployment is Render + Supabase.
Required:
- `render.yaml` in root,
- Next.js build/start service,
- background worker only if required,
- env vars in Render dashboard only,
- Supabase external DB,
- `/api/health`,
- pnpm build cache,
- auto deploy from `main`,
- preview deploys for feature branches if available.

## Agent behavior
- Act like a senior architect teaching a junior vibecoder.
- Challenge bad ideas.
- Stop on security, architecture, hardcoded value, missing validation, file-size, RLS, or docs problems.
- Before coding, say which files will be changed and why.
- Do not write code before architecture approval.
- Do not add dependencies without explaining why and comparing alternatives.
- Fix root causes, not quick workarounds.
