"use client";

import { signIn } from "@/lib/actions/auth";
import { useState } from "react";
import Link from "next/link";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setError(null);
    setLoading(true);
    const result = await signIn(formData);
    setLoading(false);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#05070d] px-4">
      <Link href="/" className="text-lg font-bold text-white mb-8 tracking-tight">MemeLaunch OS</Link>
      <div className="w-full max-w-md p-8 bg-[#111827] rounded-2xl border border-white/10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Sign in</h1>
          <p className="text-sm text-slate-400">
            Access your launch command center
          </p>
        </div>
        <form action={handleSubmit} className="space-y-4">
          {error && (
            <ErrorMessage
              title="Sign in failed"
              message={error}
              onRetry={() => setError(null)}
            />
          )}
          <div>
            <label htmlFor="email" className="block text-sm text-slate-300 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 bg-[#0b1020] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-slate-300 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 bg-[#0b1020] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <div className="mt-6 flex flex-col gap-3 text-center">
          <p className="text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-400 hover:underline">Sign up</Link>
          </p>
          <Link href="/reset-password" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
