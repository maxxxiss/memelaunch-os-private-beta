# START HERE — Windsurf setup for MemeLaunch OS

## 1. Open Windsurf
Open an empty project folder, for example:

```bash
mkdir memelaunch-os
cd memelaunch-os
windsurf .
```

## 2. Copy these files into the project root
Copy:
- `AGENTS.md`
- `.windsurf/rules/*.md`
- `docs/PROJECT_PROMPT.md`

## 3. Open Cascade
Press `Cmd/Ctrl + L` or click Cascade.

## 4. Paste this first message into Cascade

```text
Read AGENTS.md, every file in .windsurf/rules/, and docs/PROJECT_PROMPT.md.

We are building MemeLaunch OS.

First, do NOT code yet.
Give me:
1. the product summary in your own words,
2. 3–5 clarifying questions only if truly necessary,
3. a proposed MVP architecture split into frontend / backend / websocket / admin / shared,
4. the first implementation milestone after I approve the architecture,
5. the exact files you would create first.

Respect all security, docs, API, design, Supabase RLS, and no-market-manipulation rules.
Wait for my approval before editing files.
```

## 5. After you approve architecture
Use this message:

```text
Architecture approved. Start milestone 1 only: project setup, docs baseline, env validation, Supabase client structure, README, and health endpoint. Keep every file under 150 lines. Update docs/context.md and docs/CHANGELOG.md. Before each larger change, explain which files you will touch.
```

## 6. Run locally when Cascade creates the project

```bash
cp .env.example .env.local
pnpm install
supabase db reset
pnpm dev:kompletka
```
