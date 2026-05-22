# Launch Plan Export + Demo Data Guidance

## Purpose

Milestone 4B adds a launch plan summary and export feature to make MemeLaunch OS more useful as a real launch planning product. Teams can now generate and copy a clean Markdown summary of their launch plan to share with stakeholders.

## Features

### Launch Plan Summary Component

A new section on the project detail page that displays:
- **Project Overview**: Name, ticker, chain, status, readiness score
- **Links**: All project links with helpful empty state guidance
- **Progress**: Checklist completion, open tasks, scheduled content counts

### Copy to Clipboard

The "Copy Launch Plan" button generates a comprehensive Markdown document including:
- Project overview (name, ticker, chain, status, launch date, readiness score)
- Description (if set)
- Links (with labels)
- Readiness breakdown (score components)
- Checklist progress (with checkbox format)
- Tasks (with status, priority, due date, assignee)
- Content plan (with platform, status, schedule, notes)

The copy operation is client-side using the Clipboard API with success state feedback.

### Demo Data Guidance

Helpful empty states guide users to add essential data:
- Links empty state: "No links added yet. Add your X and Telegram links to improve readiness."
- This encourages teams to add required links for the readiness score

## UI Components

### LaunchPlanSummary

Client component that displays the launch plan summary and handles copy functionality.

Props:
- `project` (object with name, ticker, chain, launch_date, status, description)
- `links` (array of project link objects)
- `checklist` (array of checklist items with title and completed status)
- `tasks` (array of task objects)
- `contentItems` (array of content item objects)
- `readiness` (ReadinessBreakdown object)

Features:
- Displays project overview, links, and progress
- "Copy Launch Plan" button with success state
- Generates clean Markdown on copy
- Shows helpful empty state for missing links
- Uses dark premium SaaS styling

## Markdown Format

The generated Markdown follows this structure:

```markdown
# [Project Name] Launch Plan

**Ticker:** [TICKER]
**Chain:** [Chain]
**Status:** [Status]
**Launch Date:** [Date or "Not set"]
**Readiness Score:** [X]%

## Description

[Project description if set]

## Links

- **[Link Type]:** [URL] ([Label] if set)

## Readiness Breakdown

- Checklist completion: [X]/50
- Launch date set: [X]/15
- Required links (X + Telegram): [X]/15
- Tasks created: [X]/10
- Content planned: [X]/10

## Checklist Progress

[X]/[Y] items completed

- [x] Completed item
- [ ] Incomplete item

## Tasks

[X] open tasks

- **[Task title]** ([status], [priority] priority) - Due: [date] - Assigned: [name]

## Content Plan

[X] scheduled content items

- **[Content title]** ([platform], [status]) - [datetime] - [notes]
```

## Routes

### /app/[slug]/projects/[projectId] (updated)

Project detail page now includes the LaunchPlanSummary component between the LaunchTimeline and ProjectSettingsForm sections.

## Design

The component follows the dark premium SaaS design:
- Dark background: `bg-[#111827]`
- White text: `text-white`, `text-slate-300`
- Blue accent button: `bg-blue-600 hover:bg-blue-700`
- Border: `border-white/10`
- Rounded corners: `rounded-2xl`
- No emojis, no generic starter template look

## File Changes

**Components:**
- `components/launch/LaunchPlanSummary.tsx` (new) — Launch plan summary with copy to clipboard

**Routes:**
- `app/app/[slug]/projects/[projectId]/page.tsx` (updated) — Added LaunchPlanSummary component

**Documentation:**
- `docs/context.md` — Added Milestone 4B
- `docs/CHANGELOG.md` — Added Milestone 4B entries
- `docs/features/launch-plan-export.md` — This file

## Database

**No schema changes required** — This is a client-side feature using existing data.

## Limitations

- Markdown is generated client-side only
- No PDF or other export formats
- No customization of markdown template
- No bulk export for multiple projects
- No email sharing integration

## Demo Data Guidance

The feature provides helpful empty states rather than auto-seeding data:
- Links section shows guidance when empty
- Encourages adding X and Telegram links for readiness score
- No fake market metrics or auto-generated content
- Uses realistic operational copy throughout

## Next Steps

Future milestones could add:
- PDF export option
- Custom markdown templates
- Bulk project export
- Email sharing integration
- Timeline relative to launch date
- Custom readiness weight configuration
