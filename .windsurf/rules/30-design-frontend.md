---
trigger: glob
globs: **/*.{tsx,ts,css}
description: UI, design system, accessibility, responsive behavior, and frontend quality rules.
---

# Design System and Frontend Rule

## Product UI standard
The app must look like a polished SaaS product, not a generic Tailwind starter.

Do not use:
- emoji in production UI,
- generic purple-to-pink gradient buttons,
- visible gray border boxes everywhere,
- random glow/backdrop blur/neon aesthetics,
- lorem ipsum in finished views,
- `text-gray-*`, `border-gray-*`, hardcoded colors in components.

Use:
- semantic Tailwind tokens,
- modified shadcn/ui primitives,
- lucide-react icons,
- Framer Motion for functional micro-interactions,
- Sonner for toasts,
- Radix/shadcn for popovers, modals, tooltips,
- next-themes for dark mode from day one.

## Tailwind theme
Create semantic tokens:
- `brand` 50–900
- `surface.DEFAULT`, `surface.muted`, `surface.subtle`, `surface.elevated`
- `content.DEFAULT`, `content.muted`, `content.subtle`, `content.inverse`
- semantic radii such as `rounded-card`, `rounded-pill`
- semantic shadows such as `shadow-soft`, `shadow-pop`

## Responsive rules
- Mobile-first.
- Test 375px, 768px, 1440px.
- Tap targets at least 44px on mobile.
- No horizontal scroll on mobile.
- Modals on mobile should become bottom sheets/drawers when appropriate.
- Tables on mobile should become card lists or use a carefully controlled horizontal scroll.

## Required data states
Every data-fetching view must implement:
1. loading skeleton,
2. empty state,
3. friendly error state with retry,
4. success state.

## Accessibility
- Semantic HTML.
- Keyboard navigation.
- Visible focus states.
- Escape closes modal/drawer.
- `aria-label` for icon-only buttons.
- Meaningful alt text.
- WCAG AA contrast.

## Component structure
- Keep components under 150 lines.
- Prefer composition over prop monsters.
- Variants through `class-variance-authority`.
- No inline styles except truly dynamic transforms/measurements.
