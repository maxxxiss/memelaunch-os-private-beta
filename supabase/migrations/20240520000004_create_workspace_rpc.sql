-- Create RPC function for safe workspace creation with owner
CREATE OR REPLACE FUNCTION public.create_workspace_with_owner(
  workspace_name TEXT,
  workspace_slug TEXT
)
RETURNS JSONB AS $$
DECLARE
  user_id UUID;
  profile_id UUID;
  workspace_id UUID;
  result JSONB;
BEGIN
  -- Check authentication
  user_id := auth.uid();
  IF user_id IS NULL THEN
    RETURN jsonb_build_object('error', 'Not authenticated');
  END IF;

  -- Upsert profile for user
  INSERT INTO public.profiles (id, display_name)
  VALUES (
    user_id,
    COALESCE(
      (SELECT raw_user_meta_data->>'display_name' FROM auth.users WHERE id = user_id),
      (SELECT raw_user_meta_data->>'name' FROM auth.users WHERE id = user_id),
      (SELECT SPLIT_PART(email, '@', 1) FROM auth.users WHERE id = user_id),
      'user'
    )
  )
  ON CONFLICT (id) DO UPDATE SET display_name = EXCLUDED.display_name
  RETURNING id INTO profile_id;

  -- Insert workspace
  INSERT INTO public.workspaces (name, slug, owner_id)
  VALUES (workspace_name, workspace_slug, profile_id)
  RETURNING id INTO workspace_id;

  -- Insert owner membership
  INSERT INTO public.workspace_members (workspace_id, user_id, role)
  VALUES (workspace_id, profile_id, 'owner');

  -- Return success with workspace data
  SELECT jsonb_build_object(
    'success', true,
    'workspace_id', workspace_id,
    'slug', workspace_slug
  ) INTO result;

  RETURN result;

EXCEPTION
  WHEN unique_violation THEN
    RETURN jsonb_build_object('error', 'Workspace slug already exists');
  WHEN OTHERS THEN
    RETURN jsonb_build_object('error', SQLERRM);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION public.create_workspace_with_owner(TEXT, TEXT) TO authenticated;
