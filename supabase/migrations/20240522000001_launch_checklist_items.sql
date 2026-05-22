-- Update launch_projects status constraint to match requirements
ALTER TABLE launch_projects DROP CONSTRAINT launch_projects_status_check;
ALTER TABLE launch_projects ADD CONSTRAINT launch_projects_status_check 
  CHECK (status IN ('draft', 'pre_launch', 'launching', 'live', 'post_launch'));

-- Launch checklist items table
CREATE TABLE launch_checklist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES launch_projects(id) ON DELETE CASCADE,
  section TEXT NOT NULL CHECK (section IN ('brand', 'community', 'content', 'technical', 'post_launch')),
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on launch_checklist_items
ALTER TABLE launch_checklist_items ENABLE ROW LEVEL SECURITY;

-- RLS policies for launch_checklist_items
CREATE POLICY "Workspace members can view checklist items"
  ON launch_checklist_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM launch_projects
      JOIN workspace_members ON launch_projects.workspace_id = workspace_members.workspace_id
      WHERE launch_projects.id = launch_checklist_items.project_id
      AND workspace_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Workspace owner/member can manage checklist items"
  ON launch_checklist_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM launch_projects
      JOIN workspace_members ON launch_projects.workspace_id = workspace_members.workspace_id
      WHERE launch_projects.id = launch_checklist_items.project_id
      AND workspace_members.user_id = auth.uid()
      AND workspace_members.role IN ('owner', 'member')
    )
  );

-- Index for faster queries
CREATE INDEX idx_checklist_items_project ON launch_checklist_items(project_id);
CREATE INDEX idx_checklist_items_section ON launch_checklist_items(section);
