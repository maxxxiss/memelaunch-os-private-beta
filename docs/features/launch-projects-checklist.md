# Launch Projects + Basic Checklist

## Purpose

Milestone 3A adds the first functional feature to MemeLaunch OS: launch project management with a pre-built checklist for coordinating memecoin launches.

## Database Schema

### launch_projects table (existing, updated)

Updated status constraint to match requirements:
- `draft`, `pre_launch`, `launching`, `live`, `post_launch`

Fields:
- `id` (UUID, primary key)
- `workspace_id` (UUID, foreign key to workspaces)
- `name` (TEXT, required)
- `ticker` (TEXT, required)
- `chain` (TEXT, default "solana")
- `token_address` (TEXT, optional)
- `launch_date` (TIMESTAMP WITH TIME ZONE, optional)
- `status` (TEXT, required, default "draft")
- `description` (TEXT, optional)
- `created_at`, `updated_at` (TIMESTAMP WITH TIME ZONE)

### launch_checklist_items table (new)

Fields:
- `id` (UUID, primary key)
- `project_id` (UUID, foreign key to launch_projects)
- `section` (TEXT, required) - one of: `brand`, `community`, `content`, `technical`, `post_launch`
- `title` (TEXT, required)
- `description` (TEXT, optional)
- `completed` (BOOLEAN, default FALSE)
- `order_index` (INTEGER, default 0)
- `created_at`, `updated_at` (TIMESTAMP WITH TIME ZONE)

## RLS Policies

### launch_checklist_items

- **SELECT**: Workspace members can view checklist items for projects in their workspace
- **ALL**: Workspace owners and members can manage checklist items

Policies use workspace membership checks via launch_projects table join.

## Server Actions

### createLaunchProject

Creates a new launch project and auto-generates default checklist items.

Input (FormData):
- `workspaceId` (UUID)
- `name` (TEXT)
- `ticker` (TEXT)
- `chain` (TEXT, default "solana")
- `launchDate` (TEXT, optional)
- `status` (TEXT, default "draft")
- `description` (TEXT, optional)

Output:
- `{ success: true, projectId: UUID }` on success
- `{ error: string }` on failure

Default checklist items (10 total):
- Brand: Define token name and ticker, Create logo and branding assets
- Community: Set up Telegram group, Set up Discord server
- Content: Write launch announcement, Create content calendar
- Technical: Configure token metadata, Review liquidity pool strategy
- Post-launch: Monitor holder growth, Engage with community

### toggleChecklistItem

Toggles the completed status of a checklist item.

Input:
- `itemId` (UUID)
- `completed` (BOOLEAN)

Output:
- `{ success: true }` on success
- `{ error: string }` on failure

### getWorkspaceLaunchProjects

Fetches all launch projects for a workspace, ordered by creation date (newest first).

Input:
- `workspaceId` (UUID)

Output:
- Array of launch project objects

### getProjectChecklist

Fetches all checklist items for a project, ordered by order_index.

Input:
- `projectId` (UUID)

Output:
- Array of checklist item objects

## UI Components

### CreateLaunchProjectForm

Client component for creating a new launch project.

Props:
- `workspaceId` (string)
- `workspaceSlug` (string)

Features:
- Form fields: name, ticker, chain (select), launch date (date), status (select), description (textarea)
- Zod validation
- Error handling
- Redirects to dashboard on success

### ProjectChecklist

Client component for displaying and interacting with checklist items.

Props:
- `projectId` (string)
- `items` (ChecklistItem[])

Features:
- Grouped by section (Brand, Community, Content, Technical, Post-launch)
- Checkbox for each item
- Real-time toggle via server action
- Local state updates for immediate feedback

### DashboardSidebar

Extracted sidebar component for dashboard navigation.

Props:
- `workspaceSlug` (string)

### DashboardMetrics

Extracted metrics component for dashboard cards.

Props:
- `launchReadiness` (number)
- `activeProject` (object or null)
- `checklistProgress` (object with completed/total)

## Routes

### /app/[slug]/new-project

New project creation page.

Features:
- Auth check
- Workspace membership check
- Displays CreateLaunchProjectForm
- Dark styling consistent with rest of app

### /app/[slug]/projects/[projectId]

Project detail page.

Features:
- Auth check
- Workspace membership check
- Project info display (name, ticker, chain, status, launch date, description)
- Progress metrics (status, progress %, launch date)
- ProjectChecklist component
- Back link to dashboard

### /app/[slug] (updated)

Dashboard page now includes:

- Real launch projects list
- "New Project" button linking to creation page
- Active project card showing newest project
- Launch Readiness % calculated from checklist
- Checklist Progress showing completed/total
- Links to project detail pages

## Design

All pages follow the dark premium SaaS design established in Visual MVP Sprint v3:
- Dark backgrounds: `bg-[#05070d]`, `bg-[#0b1020]`, `bg-[#111827]`
- White text: `text-white`, `text-slate-300`
- Blue accents: `bg-blue-600`, `text-blue-500`
- Borders: `border-white/10`
- Rounded corners: `rounded-2xl`, `rounded-lg`
- No emojis, no generic starter template look

## Limitations

- No content calendar UI yet
- No team tasks UI yet
- No real token metrics
- No Telegram/Discord integrations
- No Stripe subscriptions
- Checklist items are not customizable (fixed default set)

## Next Steps

Future milestones will add:
- Customizable checklist items
- Content calendar with scheduling
- Team task assignment and tracking
- Real token metrics integration
- Telegram/Discord webhook alerts
- Stripe subscription management
