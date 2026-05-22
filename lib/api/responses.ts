import { NextResponse } from "next/server";
import { z } from "zod";

export function apiSuccess<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(message: string, status = 500) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export function apiValidationError(errors: z.ZodError) {
  return NextResponse.json(
    {
      success: false,
      error: "Validation failed",
      details: errors.errors,
    },
    { status: 400 }
  );
}
