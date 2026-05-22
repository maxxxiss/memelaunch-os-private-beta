# Launch Templates

## Purpose

Milestone 4C adds launch templates to make MemeLaunch OS faster to use. When creating a new launch project, teams can choose from pre-configured templates that automatically populate checklist items, tasks, and content plan items.

## Templates

### Basic Launch

**Description:** Essential checklist for any token launch

**Checklist Items (8):**
- Define token name and ticker
- Create logo and branding assets
- Set up Telegram group
- Write launch announcement
- Configure token metadata
- Review liquidity pool strategy
- Monitor holder growth
- Engage with community

**Tasks (5):**
- Prepare launch announcement (high priority)
- Set up X profile (high priority)
- Set up Telegram group (high priority)
- Prepare community rules (medium priority)
- Verify project links (medium priority)

**Content Plan (2):**
- Launch announcement thread (X) - Pin to profile
- Community introduction (Telegram) - Welcome message

### Solana Meme Launch

**Description:** Optimized for Solana memecoin launches

**Checklist Items (12):**
- Define token name and ticker
- Create logo and branding assets
- Prepare meme pack
- Set up Telegram group
- Set up Discord server
- Write launch thread
- Create content calendar
- Configure token metadata
- Review liquidity pool strategy
- Prepare Raydium/Jupiter pool
- Monitor holder growth
- Engage with community

**Tasks (8):**
- Prepare launch announcement (high priority)
- Set up X profile (high priority)
- Set up Telegram group (high priority)
- Prepare meme pack (high priority)
- Prepare community rules (medium priority)
- Verify project links (medium priority)
- Schedule launch announcement (high priority)
- Schedule post-launch update (medium priority)

**Content Plan (4):**
- Launch announcement thread (X) - Pin to profile
- Meme pack preview (X) - Showcase memes
- Community introduction (Telegram) - Welcome message
- Community rules post (Discord) - Pin to rules channel

### Community-First Launch

**Description:** Focus on community building before launch

**Checklist Items (13):**
- Define token name and ticker
- Create logo and branding assets
- Set up Telegram group
- Set up Discord server
- Prepare community rules
- Write launch announcement
- Create content calendar
- Prepare community engagement plan
- Configure token metadata
- Review liquidity pool strategy
- Monitor holder growth
- Engage with community
- Host community events

**Tasks (9):**
- Prepare launch announcement (high priority)
- Set up X profile (high priority)
- Set up Telegram group (high priority)
- Set up Discord server (high priority)
- Prepare community rules (high priority)
- Prepare community engagement plan (medium priority)
- Verify project links (medium priority)
- Schedule launch announcement (high priority)
- Schedule post-launch update (medium priority)

**Content Plan (4):**
- Launch announcement thread (X) - Pin to profile
- Community introduction (Telegram) - Welcome message
- Community rules post (Discord) - Pin to rules channel
- Community engagement teaser (X) - Build anticipation

## Implementation

### Template Data Structure

Templates are defined in `lib/templates/launch-templates.ts` with the following structure:

```typescript
interface LaunchTemplate {
  name: string;
  description: string;
  checklist: Array<{ section: string; title: string; description: string }>;
  tasks: Array<{ title: string; priority: string; description?: string }>;
  content: Array<{ title: string; platform: string; notes?: string }>;
}
```

### Server Action

The `createLaunchProject` server action in `lib/actions/launch-project.ts` now:
1. Accepts a `template` parameter (default: "basic")
2. Loads the selected template from `TEMPLATES`
3. Creates checklist items from the template
4. Creates tasks from the template (status: "todo")
5. Creates content items from the template (status: "draft")

### UI Component

The `CreateLaunchProjectForm` component now includes:
- Template selector dropdown at the top of the form
- Dynamic description showing the selected template's purpose
- Template value is submitted with the form

## Design

The template selector follows the dark premium SaaS design:
- Select dropdown with dark background
- Description text in small slate color below selector
- No emojis, no generic starter template look

## Database

**No schema changes required** — Templates are handled entirely in server action code using existing tables (launch_checklist_items, tasks, content_items).

## File Changes

**Templates:**
- `lib/templates/launch-templates.ts` (new) — Template data structures for Basic, Solana Meme, and Community-First launches

**Server Actions:**
- `lib/actions/launch-project.ts` (updated) — Added template parameter to schema, removed DEFAULT_CHECKLIST_ITEMS, now uses template data to create checklist items, tasks, and content items

**Components:**
- `components/launch/CreateLaunchProjectForm.tsx` (updated) — Added template selector with descriptions

**Documentation:**
- `docs/context.md` — Added Milestone 4C
- `docs/CHANGELOG.md` — Added Milestone 4C entries
- `docs/features/launch-templates.md` — This file

## Template Content Philosophy

All template content is operational and realistic:
- Focus on preparation (set up profiles, prepare announcements, verify links)
- No fake market metrics or trading-related tasks
- No manipulation features (sniper bots, volume faking, wash trading)
- Community-focused (rules, engagement, communication)
- Content planning (threads, announcements, updates)

## Limitations

- Templates are static and cannot be customized by users
- No custom template creation
- No template preview before project creation
- All tasks start as "todo" status
- All content items start as "draft" status
- No template versioning or updates

## Next Steps

Future milestones could add:
- Custom template creation
- Template preview before project creation
- Template cloning from existing projects
- Template categories
- Template sharing between workspaces
- Template updates and versioning
