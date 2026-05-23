-- Add plan column to workspaces table
ALTER TABLE workspaces ADD COLUMN plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'team'));
