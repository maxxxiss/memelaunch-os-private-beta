import { NextResponse } from "next/server";
import { healthResponseSchema } from "@/lib/validations/health";

export async function GET() {
  const response = {
    status: "ok",
    timestamp: new Date().toISOString(),
    version: "0.1.0",
  };

  const validated = healthResponseSchema.parse(response);

  return NextResponse.json(validated, { status: 200 });
}
