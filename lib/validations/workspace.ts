import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/),
});

export const updateWorkspaceSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/).optional(),
  status: z.enum(["active", "suspended"]).optional(),
});

export const addMemberSchema = z.object({
  email: z.string().email(),
  role: z.enum(["member", "viewer"]),
});
