# Real Launch Project Workspace

## Purpose

Milestone 4A transforms each launch project into a real operational workspace for memecoin launch teams. Projects now have editable settings, project links, a weighted launch readiness score, and a launch timeline.

## Database Schema

### project_links table (new)

Fields:
- `id` (UUID, primary key)
- `workspace_id` (UUID, foreign key to workspaces)
- `project_id` (UUID, foreign key to launch_projects)
- `type` (TEXT, required) - one of: `website`, `x`, `telegram`, `discord`, `chart`, `docs`
- `url` (TEXT, required)
- `label` (TEXT, optional)
- `created_at`, `updated_at` (TIMESTAMP WITH TIME ZONE)

### RLS Policies

**project_links:**
- **SELECT**: Workspace members can view project links in their workspace
- **ALL**: Workspace owners and members can manage project links in their workspace

Policies use workspace membership checks via workspace_members table.

## Weighted Launch Readiness Score

The launch readiness score is calculated using a weighted formula:

- **50%** - Checklist completion (completed items / total items)
- **15%** - Launch date set (all or nothing)
- **15%** - Required links present (X + Telegram, both required)
- **10%** - At least one task exists (all or nothing)
- **10%** - At least one content item exists (all or nothing)

**Maximum score: 100%**

### Score Calculation

```typescript
const checklistScore = (checklistCompleted / checklistTotal) * 50;
const launchDateScore = hasLaunchDate ? 15 : 0;
const requiredLinksScore = (hasXLink && hasTelegramLink) ? 15 : 0;
const tasksScore = hasTasks ? 10 : 0;
const contentScore = hasContent ? 10 : 0;
const totalScore = Math.round(checklistScore + launchDateScore + requiredLinksScore + tasksScore + contentScore);
```

## Server Actions

### updateLaunchProject

Updates launch project fields and revalidates relevant paths.

Input (FormData):
- `projectId` (UUID)
- `name` (TEXT)
- `ticker` (TEXT)
- `chain` (TEXT, default "solana")
- `launchDate` (TEXT, optional)
- `status` (TEXT)
- `description` (TEXT, optional)
- `workspaceSlug` (TEXT) for revalidation

Output:
- `{ success: true }` on success
- `{ error: string }` on failure

### addProjectLink

Adds a new project link with URL validation.

Input (FormData):
- `workspaceId` (UUID)
- `projectId` (UUID)
- `type` (TEXT) - one of: website, x, telegram, discord, chart, docs
- `url` (TEXT) - must be valid URL
- `label` (TEXT, optional)
- `workspaceSlug` (TEXT) for revalidation

Output:
- `{ success: true }` on success
- `{ error: string }` on failure

### removeProjectLink

Removes a project link.

Input:
- `linkId` (UUID)
- `workspaceSlug` (TEXT) for revalidation
- `projectId` (UUID) for revalidation

Output:
- `{ success: true }` on success
- `{ error: string }` on failure

### getProjectLinks

Fetches all links for a project, ordered by creation date (newest first).

Input:
- `projectId` (UUID)

Output:
- Array of project link objects

## UI Components

### ProjectSettingsForm

Client component for editing project settings.

Props:
- `projectId` (string)
- `workspaceId` (string)
- `workspaceSlug` (string)
- `initialData` (object with name, ticker, chain, launch_date, status, description)

Features:
- Form fields: name, ticker, chain (select), launch date (date), status (select), description (textarea)
- Zod validation
- Error handling
- Revalidates dashboard and project detail paths on success
- Pre-filled with initial project data

### ProjectLinks

Client component for managing project links.

Props:
- `projectId` (string)
- `workspaceId` (string)
- `workspaceSlug` (string)
- `links` (array of project link objects)

Features:
- Displays existing links with type, label, and URL
- Clickable URLs open in new tab
- Remove button for each link
- Form to add new links with type, URL, and label
- URL validation with Zod
- Empty state with guidance
- Revalidates on add/remove

### ReadinessBreakdown

Server component displaying the weighted readiness score breakdown.

Props:
- `breakdown` (ReadinessBreakdown object with checklistScore, launchDateScore, requiredLinksScore, tasksScore, contentScore, totalScore)

Features:
- Large total score display with progress bar
- Individual score components with labels and progress bars
- Green progress bar for completed components, white for incomplete
- Shows score/max for each component (e.g., "50/50")

### LaunchTimeline

Server component displaying a chronological timeline of tasks and content.

Props:
- `tasks` (array of task objects)
- `contentItems` (array of content item objects)

Features:
- Combines tasks and content into single timeline
- Sorted by date (due_date for tasks, scheduled_at for content)
- Items without dates appear at the end
- Visual timeline with blue dots
- Shows item type (Task/Content) and platform for content
- Empty state with guidance

## Routes

### /app/[slug]/projects/[projectId] (updated)

Project detail page now includes:

- **Top cards**: Status, Readiness (weighted score), Launch Date
- **Checklist section**: Progress bar with completion count
- **Tasks and Content**: Two-column layout with forms
- **Readiness Breakdown**: Shows weighted score components
- **Project Links**: Add/remove project links
- **Launch Timeline**: Chronological view of tasks and content
- **Project Settings**: Edit project fields

### /app/[slug] (updated)

Dashboard page now uses weighted readiness score calculation:
- Fetches project links for active project
- Calculates weighted score using the new formula
- Passes weighted score to DashboardMetrics

## Design

All new components follow the dark premium SaaS design:
- Dark backgrounds: `bg-[#111827]`, `bg-[#0b1020]`
- White text: `text-white`, `text-slate-300`
- Blue accents: `bg-blue-600`, `text-blue-500`
- Green for completed: `bg-green-500`, `text-green-400`
- Borders: `border-white/10`
- Rounded corners: `rounded-2xl`, `rounded-lg`
- No emojis, no generic starter template look

## File Changes

**Database:**
- `supabase/migrations/20240522000003_project_links.sql` (new) — Creates project_links table with RLS policies

**Server Actions:**
- `lib/actions/launch-project.ts` (updated) — Added updateLaunchProject function
- `lib/actions/project-link.ts` (new) — Server actions for project links (add, remove, list)

**Utilities:**
- `lib/utils/readiness.ts` (new) — Weighted readiness score calculation

**Components:**
- `components/launch/ProjectSettingsForm.tsx` (new) — Form to edit project settings
- `components/launch/ProjectLinks.tsx` (new) — Component to manage project links
- `components/launch/ReadinessBreakdown.tsx` (new) — Component to display readiness breakdown
- `components/launch/LaunchTimeline.tsx` (new) — Component to display launch timeline

**Routes:**
- `app/app/[slug]/projects/[projectId]/page.tsx` (updated) — Integrated new components, uses weighted readiness
- `app/app/[slug]/page.tsx` (updated) — Uses weighted readiness score calculation

**Documentation:**
- `docs/context.md` — Added Milestone 4A
- `docs/CHANGELOG.md` — Added Milestone 4A entries
- `docs/features/real-launch-project-workspace.md` — This file

## Limitations

- Timeline is simple chronological (no relative timing to launch date)
- No link validation beyond URL format
- No bulk link operations
- No link categories or grouping
- No task/content filtering in timeline
- No custom weight configuration

## Next Steps

Future milestones could add:
- Relative timeline (e.g., "3 days before launch")
- Link categories and grouping
- Custom readiness weight configuration
- Timeline filtering by type
- Bulk link operations
- Link preview cards
