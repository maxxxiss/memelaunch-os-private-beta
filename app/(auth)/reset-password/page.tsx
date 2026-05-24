"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import Link from "next/link";
import { ErrorMessage } from "@/components/ui/ErrorMessage";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setError(error.message);
      } else {
        setSent(true);
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#05070d] px-4">
        <Link href="/" className="text-lg font-bold text-white mb-8 tracking-tight">MemeLaunch OS</Link>
        <div className="w-full max-w-md p-8 bg-[#111827] rounded-2xl border border-white/10 text-center">
          <div className="w-10 h-10 bg-emerald-500/15 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h1 className="text-xl font-bold text-white mb-3">Check your email</h1>
          <p className="text-sm text-slate-400 mb-6">
            We sent a reset link to <span className="text-white">{email}</span>. Click the link to set a new password.
          </p>
          <Link href="/login" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            Back to sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#05070d] px-4">
      <Link href="/" className="text-lg font-bold text-white mb-8 tracking-tight">MemeLaunch OS</Link>
      <div className="w-full max-w-md p-8 bg-[#111827] rounded-2xl border border-white/10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Reset your password</h1>
          <p className="text-sm text-slate-400">Enter your email and we&apos;ll send a reset link.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <ErrorMessage
              title="Failed to send reset link"
              message={error}
              onRetry={() => setError(null)}
            />
          )}
          <div>
            <label htmlFor="email" className="block text-sm text-slate-300 mb-1.5 font-medium">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#0b1020] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-600"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm disabled:opacity-50 transition-colors"
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>
        <p className="mt-6 text-sm text-slate-500 text-center">
          <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">Back to sign in</Link>
        </p>
      </div>
    </div>
  );
}
