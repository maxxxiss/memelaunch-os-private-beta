-- Simplify RLS policies to use SECURITY DEFINER helpers instead of recursive policies

-- Drop all policies that will be recreated
DROP POLICY IF EXISTS "Workspace members can view workspace" ON workspaces;
DROP POLICY IF EXISTS "Workspace owner can update workspace" ON workspaces;
DROP POLICY IF EXISTS "Authenticated users can create workspace" ON workspaces;
DROP POLICY IF EXISTS "Workspace members can view projects" ON launch_projects;
DROP POLICY IF EXISTS "Workspace owner/member can manage projects" ON launch_projects;

-- Create SECURITY DEFINER helper for workspace access
CREATE OR REPLACE FUNCTION public.user_can_access_workspace(workspace_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.workspace_members
    WHERE workspace_members.workspace_id = user_can_access_workspace.workspace_id
    AND workspace_members.user_id = auth.uid()
  );
$$ LANGUAGE SQL SECURITY DEFINER SET search_path = public;

-- Create SECURITY DEFINER helper for workspace role check
CREATE OR REPLACE FUNCTION public.user_has_workspace_role(workspace_id UUID, required_roles TEXT[])
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.workspace_members
    WHERE workspace_members.workspace_id = user_has_workspace_role.workspace_id
    AND workspace_members.user_id = auth.uid()
    AND workspace_members.role = ANY(user_has_workspace_role.required_roles)
  );
$$ LANGUAGE SQL SECURITY DEFINER SET search_path = public;

-- Simplified policies for workspaces
CREATE POLICY "Users can view workspaces they are members of"
  ON workspaces FOR SELECT
  USING (public.user_can_access_workspace(id));

CREATE POLICY "Workspace owners can update workspace"
  ON workspaces FOR UPDATE
  USING (public.user_has_workspace_role(id, ARRAY['owner']));

CREATE POLICY "Authenticated users can create workspace"
  ON workspaces FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Simplified policies for launch_projects
CREATE POLICY "Users can view projects in their workspaces"
  ON launch_projects FOR SELECT
  USING (public.user_can_access_workspace(workspace_id));

CREATE POLICY "Workspace owners/members can manage projects"
  ON launch_projects FOR ALL
  USING (public.user_has_workspace_role(workspace_id, ARRAY['owner', 'member']));
