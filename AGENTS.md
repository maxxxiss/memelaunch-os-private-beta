# AGENTS.md — MemeLaunch OS

This repository is for **MemeLaunch OS**: a launch operating system for memecoin teams, communities, and builders.

Cascade must follow the rules in `.windsurf/rules/` and the full source prompt in `docs/PROJECT_PROMPT.md`.

## Non-negotiable workflow
1. Read `docs/PROJECT_PROMPT.md` before planning.
2. Start with a short architecture proposal split into frontend / backend / websocket / admin / shared.
3. Do not write production code until the user approves the architecture.
4. Build the MVP in small end-to-end slices.
5. After every feature, update docs, changelog, env example, API docs, and context files.

## Product boundary
MemeLaunch OS helps teams organize legitimate memecoin launches. It must not implement or suggest fake volume, wash trading, botting, sniper automation, seed phrase collection, hidden fees, deceptive marketing, wallet-draining flows, or market manipulation.
