"use client";

import { signOut } from "@/lib/actions/auth";
import { useState } from "react";

export function SignOutButton() {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    await signOut();
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="text-sm text-slate-300 hover:text-white disabled:opacity-50"
    >
      {loading ? "Signing out..." : "Sign out"}
    </button>
  );
}
