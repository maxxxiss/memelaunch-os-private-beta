-- Create project_links table
CREATE TABLE IF NOT EXISTS project_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES launch_projects(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('website', 'x', 'telegram', 'discord', 'chart', 'docs')),
  url TEXT NOT NULL,
  label TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE project_links ENABLE ROW LEVEL SECURITY;

-- RLS Policies for project_links
-- Workspace members can view project links in their workspace
CREATE POLICY "Workspace members can view project links"
  ON project_links FOR SELECT
  USING (
    workspace_id IN (
      SELECT workspace_id FROM workspace_members
      WHERE user_id = auth.uid()
    )
  );

-- Workspace owners and members can manage project links in their workspace
CREATE POLICY "Workspace owners and members can manage project links"
  ON project_links FOR ALL
  USING (
    workspace_id IN (
      SELECT workspace_id FROM workspace_members
      WHERE user_id = auth.uid()
    )
  );

-- Index for faster lookups
CREATE INDEX idx_project_links_project_id ON project_links(project_id);
CREATE INDEX idx_project_links_workspace_id ON project_links(workspace_id);
