import { z } from "zod";

export const createProjectSchema = z.object({
  workspace_id: z.string().uuid(),
  name: z.string().min(1).max(100),
  ticker: z.string().min(1).max(10).toUpperCase(),
  chain: z.string().default("solana"),
  description: z.string().max(500).optional(),
});

export const updateProjectSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  ticker: z.string().min(1).max(10).toUpperCase().optional(),
  token_address: z.string().optional(),
  launch_date: z.string().datetime().optional(),
  status: z.enum(["draft", "planning", "live", "post_launch", "archived"]).optional(),
  description: z.string().max(500).optional(),
});
