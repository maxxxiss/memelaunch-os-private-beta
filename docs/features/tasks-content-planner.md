# Tasks + Content Planner

## Purpose

Milestone 3B adds two practical launch operations features to MemeLaunch OS: team task management and content planning for coordinating memecoin launches.

## Database Schema

### tasks table (new)

Fields:
- `id` (UUID, primary key)
- `workspace_id` (UUID, foreign key to workspaces)
- `project_id` (UUID, foreign key to launch_projects, optional)
- `title` (TEXT, required)
- `description` (TEXT, optional)
- `status` (TEXT, required, default "todo") - one of: `todo`, `in_progress`, `done`
- `priority` (TEXT, required, default "medium") - one of: `low`, `medium`, `high`
- `due_date` (TIMESTAMP WITH TIME ZONE, optional)
- `assignee_name` (TEXT, optional)
- `created_at`, `updated_at` (TIMESTAMP WITH TIME ZONE)

### content_items table (new)

Fields:
- `id` (UUID, primary key)
- `workspace_id` (UUID, foreign key to workspaces)
- `project_id` (UUID, foreign key to launch_projects, optional)
- `title` (TEXT, required)
- `platform` (TEXT, required) - one of: `x`, `telegram`, `discord`, `website`
- `scheduled_at` (TIMESTAMP WITH TIME ZONE, optional)
- `status` (TEXT, required, default "draft") - one of: `draft`, `scheduled`, `published`
- `notes` (TEXT, optional)
- `created_at`, `updated_at` (TIMESTAMP WITH TIME ZONE)

## RLS Policies

### tasks

- **SELECT**: Workspace members can view tasks in their workspace
- **ALL**: Workspace owners and members can manage tasks in their workspace

Policies use workspace membership checks via workspace_members table.

### content_items

- **SELECT**: Workspace members can view content items in their workspace
- **ALL**: Workspace owners and members can manage content items in their workspace

Policies use workspace membership checks via workspace_members table.

## Server Actions

### createTask

Creates a new task and revalidates relevant paths.

Input (FormData):
- `workspaceId` (UUID)
- `projectId` (UUID, optional)
- `title` (TEXT)
- `description` (TEXT, optional)
- `status` (TEXT, default "todo")
- `priority` (TEXT, default "medium")
- `dueDate` (TEXT, optional)
- `assigneeName` (TEXT, optional)
- `workspaceSlug` (TEXT) for revalidation

Output:
- `{ success: true }` on success
- `{ error: string }` on failure

### updateTaskStatus

Updates task status and revalidates relevant paths.

Input:
- `taskId` (UUID)
- `status` (TEXT)

Output:
- `{ success: true }` on success
- `{ error: string }` on failure

### getWorkspaceTasks

Fetches all tasks for a workspace, ordered by creation date (newest first).

Input:
- `workspaceId` (UUID)

Output:
- Array of task objects

### getProjectTasks

Fetches all tasks for a project, ordered by creation date (newest first).

Input:
- `projectId` (UUID)

Output:
- Array of task objects

### createContentItem

Creates a new content item and revalidates relevant paths.

Input (FormData):
- `workspaceId` (UUID)
- `projectId` (UUID, optional)
- `title` (TEXT)
- `platform` (TEXT)
- `scheduledAt` (TEXT, optional)
- `status` (TEXT, default "draft")
- `notes` (TEXT, optional)
- `workspaceSlug` (TEXT) for revalidation

Output:
- `{ success: true }` on success
- `{ error: string }` on failure

### updateContentStatus

Updates content item status and revalidates relevant paths.

Input:
- `itemId` (UUID)
- `status` (TEXT)

Output:
- `{ success: true }` on success
- `{ error: string }` on failure

### getWorkspaceContentItems

Fetches all content items for a workspace, ordered by scheduled date.

Input:
- `workspaceId` (UUID)

Output:
- Array of content item objects

### getProjectContentItems

Fetches all content items for a project, ordered by scheduled date.

Input:
- `projectId` (UUID)

Output:
- Array of content item objects

## UI Components

### CreateTaskForm

Client component for creating a new task.

Props:
- `workspaceId` (string)
- `workspaceSlug` (string)
- `projectId` (string, optional)

Features:
- Form fields: title, priority (select), due date (date), assignee (text), description (textarea)
- Zod validation
- Error handling
- Revalidates dashboard and project detail paths on success

### TaskList

Client component for displaying and managing tasks.

Props:
- `tasks` (Task[])

Features:
- Displays tasks with title, description, priority, assignee, due date
- Priority color coding (low: slate, medium: yellow, high: red)
- Status dropdown for changing task status (todo, in_progress, done)
- Local state updates for immediate feedback
- Error display if status update fails
- Empty state message

### CreateContentForm

Client component for creating a new content item.

Props:
- `workspaceId` (string)
- `workspaceSlug` (string)
- `projectId` (string, optional)

Features:
- Form fields: title, platform (select), scheduled date (datetime-local), status (select), notes (textarea)
- Zod validation
- Error handling
- Revalidates dashboard and project detail paths on success

### ContentList

Client component for displaying and managing content items.

Props:
- `items` (ContentItem[])

Features:
- Displays content items with title, platform, scheduled date, notes
- Platform labels (X, Telegram, Discord, Website)
- Status dropdown for changing content status (draft, scheduled, published)
- Local state updates for immediate feedback
- Error display if status update fails
- Empty state message

## Routes

### /app/[slug]/projects/[projectId] (updated)

Project detail page now includes:

- Two-column layout below checklist
- Left column: Tasks section with TaskList and CreateTaskForm
- Right column: Content Plan section with ContentList and CreateContentForm
- Tasks and content items filtered by project_id

### /app/[slug] (updated)

Dashboard page now includes:

- Fetches workspace tasks and content items
- Calculates open tasks count (tasks with status != "done")
- Calculates scheduled content count (content items with status == "scheduled")
- Updated DashboardMetrics component with new metrics

## Design

All pages follow the dark premium SaaS design established in Visual MVP Sprint v3:
- Dark backgrounds: `bg-[#05070d]`, `bg-[#0b1020]`, `bg-[#111827]`
- White text: `text-white`, `text-slate-300`
- Blue accents: `bg-blue-600`, `text-blue-500`
- Borders: `border-white/10`
- Rounded corners: `rounded-2xl`, `rounded-lg`
- No emojis, no generic starter template look

## Limitations

- No task assignment to specific users (only assignee name)
- No task dependencies
- No content calendar view
- No real posting automation to platforms
- No Telegram/Discord integrations
- No Stripe subscriptions
- No real token metrics

## Next Steps

Future milestones will add:
- User-based task assignment
- Task dependencies and milestones
- Content calendar view with drag-and-drop
- Telegram/Discord webhook alerts for content
- Real posting automation (optional)
- Stripe subscription management
