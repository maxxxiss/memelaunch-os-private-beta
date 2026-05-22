"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/browser";

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
        redirectTo: `${window.location.origin}/auth/update-password`,
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
      <div className="min-h-screen flex items-center justify-center bg-surface-muted">
        <div className="w-full max-w-md p-8 bg-surface rounded-card shadow-soft">
          <h1 className="text-2xl font-bold text-content mb-6">Check your email</h1>
          <p className="text-content-muted">
            We sent a password reset link to {email}. Click the link to reset your password.
          </p>
          <a
            href="/auth/login"
            className="mt-4 inline-block text-brand-600 hover:underline"
          >
            Back to sign in
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-muted">
      <div className="w-full max-w-md p-8 bg-surface rounded-card shadow-soft">
        <h1 className="text-2xl font-bold text-content mb-6">Reset password</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-surface-subtle border border-content-subtle rounded-card text-content text-sm">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm text-content-muted mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-surface-muted border border-surface-subtle rounded-card text-content"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-card font-medium disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send reset link"}
          </button>
        </form>
        <p className="mt-4 text-sm text-content-muted text-center">
          <a href="/auth/login" className="text-brand-600 hover:underline">
            Back to sign in
          </a>
        </p>
      </div>
    </div>
  );
}
