# Changelog

All notable changes to this project will be documented in this file.
Format: Keep a Changelog · Versions: SemVer.

## [Unreleased]

### Added
- Project baseline (README, .env.example, package.json, configs)
- Tailwind CSS with semantic tokens
- Supabase client structure
- Zod env validation
- Health endpoint
- Documentation baseline
- Supabase local project structure
- Database schema (profiles, workspaces, workspace_members, launch_projects)
- RLS policies for all tables based on workspace membership
- SQL helper functions for role checks (is_workspace_member, has_workspace_role, is_admin)
- Auth middleware for protected routes
- Route groups: app/(auth), app/(app), app/(admin)
- Zod schemas for workspaces, projects, profiles
- Admin bootstrap mechanism via display_name
- Auth server actions (sign up, sign in, sign out)
- Auth UI pages (login, register, reset-password)
- Workspace server actions (create workspace, get user workspaces)
- Workspace onboarding form
- Workspace dashboard shell with dynamic routing
- SignOutButton component
- Protected app home page with workspace detection
- Public landing page at / with sign in/sign up links
- Visual MVP Sprint: dark premium dashboard UI
- Public landing page with hero and feature sections
- Professional auth pages with clean layout
- Workspace dashboard with sidebar navigation
- Dashboard cards for launch readiness, projects, checklist, content, community, alerts, metrics
- Visual MVP Sprint v2: premium dark SaaS design
- Global typography fix with font-sans and antialiased
- Landing page with stronger hero and tracking-tight typography
- Auth pages with focus ring on inputs
- Dashboard sidebar with MemeLaunch OS branding
- Improved visual hierarchy and spacing
- Milestone 3A: Launch Projects + Basic Checklist
- launch_checklist_items table with RLS policies
- Launch project creation form with name, ticker, chain, launch date, status, description
- Default checklist items auto-created on project creation (Brand, Community, Content, Technical, Post-launch)
- Dashboard metrics: Launch Readiness %, Checklist Progress, Active Project
- Launch projects list on dashboard with New Project button
- Project detail page at /app/[slug]/projects/[projectId]
- Checklist UI with check/uncheck functionality
- Server actions for creating projects and toggling checklist items
- Milestone 3B: Tasks + Content Planner
- tasks table with RLS policies (title, description, status, priority, due_date, assignee_name)
- content_items table with RLS policies (title, platform, scheduled_at, status, notes)
- Task creation form with title, priority, due date, assignee, description
- Content item creation form with title, platform, scheduled date, status, notes
- Task list component with status change (todo, in_progress, done)
- Content list component with status change (draft, scheduled, published)
- Project detail page shows tasks and content plan in two-column layout
- Dashboard metrics updated with Open Tasks count and Scheduled Content count
- Server actions for tasks and content items with revalidatePath
- Milestone 3C: Demo Polish + UX Quality
- Progress bars added to dashboard metrics (Launch Readiness, Checklist Progress)
- Project cards on dashboard now use grid layout with status badges
- Project cards show chain info and improved hover states
- Checklist section on project detail now has progress bar and completion count
- Task list now shows color-coded status badges (To Do, In Progress, Done)
- Content list now shows color-coded status badges (Draft, Scheduled, Published)
- Status dropdowns moved below item details for better layout
- Improved empty states across all components with helpful guidance text
- Form labels updated to use font-medium weight
- Form placeholders updated to be more professional
- Buttons now have disabled:cursor-not-allowed and transition-colors
- Textareas now have resize-none to prevent layout shifts
- All interactive elements have transition-colors for smooth hover states
- Milestone 4A: Real Launch Project Workspace
- project_links table with RLS policies (type, url, label)
- Project settings form to edit name, ticker, chain, launch date, status, description
- Project links section to add/remove project links (Website, X, Telegram, Discord, Chart, Docs)
- Weighted launch readiness score calculation (50% checklist, 15% launch date, 15% required links, 10% tasks, 10% content)
- Readiness breakdown component showing score components with progress bars
- Launch timeline component showing tasks and content chronologically
- Project detail page now shows readiness score instead of simple checklist progress
- Dashboard readiness score now uses weighted formula
- Server actions for project links (add, remove, list) with Zod URL validation
- Server action to update launch project with revalidatePath
- Milestone 4B: Launch Plan Export + Demo Data Guidance
- LaunchPlanSummary component with project overview, links, and progress display
- Copy to clipboard functionality for launch plan export
- Markdown generation includes project overview, links, readiness breakdown, checklist, tasks, and content plan
- Helpful empty states for missing links with guidance to add X and Telegram
- Client-side clipboard API with success state feedback
- No database schema changes required
- Milestone 4C: Launch Templates
- Three launch templates: Basic Launch, Solana Meme Launch, Community-First Launch
- Template data structures with checklist items, tasks, and content plan items
- Template selector in CreateLaunchProjectForm with descriptions
- createLaunchProject server action now accepts template parameter
- Templates create default checklist items, recommended tasks, and content plan items on project creation
- All template content is operational (prepare launch announcement, set up X profile, set up Telegram, prepare community rules, etc.)
- No database schema changes required

### Fixed
- Route structure: protected app now at /app, workspace dashboard at /app/[slug]
- Auth redirects: login/register -> /app, logout -> /login
- Middleware now protects /app and /admin routes
- Deleted incorrect app/(app) route group files
- Supabase auth session bounce using official @supabase/ssr Next.js pattern
- RLS policies infinite recursion on workspace_members table
- Profile trigger to use search_path = public and handle missing display_name
- Workspace creation fallback to create profile if missing
- Replaced fragile multi-step workspace creation with single RPC function
- Simplified RLS policies to use SECURITY DEFINER helpers instead of recursive policies
- Next.js 16 params Promise issue in dynamic routes

### Security
- RLS enabled on every table
- RLS strategy documented
- No hardcoded secrets
- Service role key server-side only
