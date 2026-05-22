-- Fix RLS policies to avoid infinite recursion
-- Drop problematic workspace_members policies
DROP POLICY IF EXISTS "Workspace members can view membership" ON workspace_members;
DROP POLICY IF EXISTS "Workspace owner can manage members" ON workspace_members;

-- Create new simplified policies for workspace_members
CREATE POLICY "Users can view own workspace membership"
  ON workspace_members FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own workspace membership"
  ON workspace_members FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own workspace membership"
  ON workspace_members FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own workspace membership"
  ON workspace_members FOR DELETE
  USING (user_id = auth.uid());

-- Update helper functions to use SECURITY DEFINER to avoid RLS recursion
CREATE OR REPLACE FUNCTION is_workspace_member(workspace_id UUID, user_id UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_members.workspace_id = is_workspace_member.workspace_id
    AND workspace_members.user_id = is_workspace_member.user_id
  );
$$ LANGUAGE SQL SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION has_workspace_role(workspace_id UUID, user_id UUID, required_roles TEXT[])
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM workspace_members
    WHERE workspace_members.workspace_id = has_workspace_role.workspace_id
    AND workspace_members.user_id = has_workspace_role.user_id
    AND workspace_members.role = ANY(has_workspace_role.required_roles)
  );
$$ LANGUAGE SQL SECURITY DEFINER SET search_path = public;
