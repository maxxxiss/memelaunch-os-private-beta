---
trigger: always_on
description: Core product brief, product boundaries, and launch safety rules for MemeLaunch OS.
---

# MemeLaunch OS — Product Rule

## Product
MemeLaunch OS helps creators of memecoin projects prepare and manage a launch from concept to first holders.

The app gives teams one place for:
- launch workspaces,
- token concept and ticker planning,
- launch checklist,
- content planning for X, Telegram, Discord,
- team tasks,
- community role and supporter tracking,
- launch metrics,
- real-time team alerts,
- admin and subscription management.

## Users
Primary users:
- memecoin creators,
- launch teams,
- Telegram/Discord community admins,
- Solana/DeFi builders,
- small alpha groups.

## MVP direction
Build the product as a legitimate launch operations SaaS, not as a trading bot or manipulation tool.

MVP order:
1. Auth + workspaces.
2. Launch project creation.
3. Launch checklist.
4. Team tasks.
5. Content calendar.
6. Community links and assets.
7. Basic metrics dashboard.
8. In-app notifications.
9. Telegram/Discord webhook alerts.
10. Stripe subscriptions.
11. Admin panel.

## Hard product boundaries
Never implement:
- fake volume,
- wash trading,
- botting,
- sniper bot automation,
- auto-buy/auto-sell execution,
- seed phrase collection,
- wallet private key storage,
- deceptive marketing flows,
- hidden fees,
- wallet-draining transactions,
- market manipulation instructions.

Wallet features must be read-only unless the user explicitly approves a safe, audited transaction flow later.

## External crypto data
Use provider abstraction. Do not hardcode one provider into business logic.
Recommended provider interface:
- token metadata,
- price/liquidity/volume,
- holder count,
- token events,
- social/community metrics where available.

Candidate providers can include Helius, Birdeye, DexScreener, Jupiter, or similar. Keep API keys server-side only.
