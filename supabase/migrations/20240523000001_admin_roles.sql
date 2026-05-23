-- Admin roles table for proper admin management
CREATE TABLE admin_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;

-- RLS policies for admin_roles
-- Only admins can view admin roles
CREATE POLICY "Admins can view admin roles"
  ON admin_roles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
    )
  );

-- Only super_admins can insert admin roles
CREATE POLICY "Super admins can create admin roles"
  ON admin_roles FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
      AND admin_roles.role = 'super_admin'
    )
  );

-- Only super_admins can delete admin roles
CREATE POLICY "Super admins can delete admin roles"
  ON admin_roles FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM admin_roles
      WHERE admin_roles.user_id = auth.uid()
      AND admin_roles.role = 'super_admin'
    )
  );

-- Update is_admin function to use admin_roles table
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM admin_roles
    WHERE admin_roles.user_id = auth.uid()
  );
$$ LANGUAGE SQL SECURITY DEFINER;
