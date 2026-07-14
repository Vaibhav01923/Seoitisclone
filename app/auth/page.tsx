"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Instrument_Serif, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import { createSupabaseBrowserClient } from "@/lib/supabase";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/dashboard";

  const [mode, setMode] = useState<"signin" | "signup">(searchParams.get("mode") === "signin" ? "signin" : "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const supabase = createSupabaseBrowserClient();

  useEffect(() => {
    // If already logged in, redirect
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.replace(redirect);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (mode === "signup") {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else if (data.user && data.user.identities && data.user.identities.length === 0) {
        setError("An account with this email already exists.");
        setMode("signin");
      } else {
        setMessage("Check your email to confirm your account, then sign in.");
        setMode("signin");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        router.replace(redirect);
      }
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--cream)]">
      <nav className="px-8 py-4 border-b border-[var(--line)]">
        <a href="/" className="flex items-center gap-2.5">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <circle cx="16" cy="16" r="6" stroke="var(--rust)" strokeWidth="2.5" />
            <circle cx="16" cy="16" r="12.5" stroke="var(--rust)" strokeWidth="1.8" strokeDasharray="4 5" transform="rotate(-20 16 16)" />
            <circle cx="26.5" cy="9" r="2.5" fill="var(--olive)" />
          </svg>
          <span className="text-lg font-bold tracking-tight text-[var(--ink)]">
            RankOn<span className="text-[var(--rust)]">Geo</span>
          </span>
        </a>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          <div className="rounded-3xl bg-[var(--surface)] border border-[var(--line)] p-8 shadow-sm">
            <h1 className="font-signal-serif text-3xl text-[var(--ink)] mb-2 tracking-tight">
              {mode === "signup" ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-sm text-[var(--ink-soft)] mb-8">
              {mode === "signup"
                ? "Start tracking your brand's AI visibility for free."
                : "Sign in to access your dashboard."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[var(--ink-soft)] mb-1.5 uppercase tracking-wide">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full border border-[var(--line)] bg-[var(--cream)] rounded-lg px-4 py-3 text-sm outline-none text-[var(--ink)] placeholder:text-[var(--ink-faint)] transition-shadow focus:ring-2 focus:ring-[var(--rust)] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--ink-soft)] mb-1.5 uppercase tracking-wide">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  required
                  minLength={6}
                  className="w-full border border-[var(--line)] bg-[var(--cream)] rounded-lg px-4 py-3 text-sm outline-none text-[var(--ink)] placeholder:text-[var(--ink-faint)] transition-shadow focus:ring-2 focus:ring-[var(--rust)] focus:border-transparent"
                />
              </div>

              {error && (
                <p className="text-xs text-red-700 bg-red-500/10 border border-red-500/25 rounded-lg px-3 py-2">{error}</p>
              )}
              {message && (
                <p className="text-xs text-[var(--rust-deep)] bg-[var(--rust-wash)] border border-[var(--rust)]/25 rounded-lg px-3 py-2">{message}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[var(--rust)] hover:bg-[var(--rust-deep)] disabled:opacity-50 text-[var(--surface)] font-semibold py-3 rounded-full text-sm transition-colors"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-[var(--surface)] border-t-transparent rounded-full animate-spin" />
                    {mode === "signup" ? "Creating account..." : "Signing in..."}
                  </span>
                ) : mode === "signup" ? "Create free account →" : "Sign in →"}
              </button>
            </form>

            <p className="text-sm text-[var(--ink-soft)] text-center mt-6">
              {mode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => { setMode(mode === "signup" ? "signin" : "signup"); setError(""); setMessage(""); }}
                className="text-[var(--rust)] font-medium hover:underline"
              >
                {mode === "signup" ? "Sign in" : "Sign up free"}
              </button>
            </p>
          </div>

          <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-[var(--ink-faint)]">
            <svg className="h-3 w-3" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 1.5l1.9 3.9 4.3.6-3.1 3 .7 4.2L8 11.2l-3.8 2 .7-4.2-3.1-3 4.3-.6L8 1.5z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
            </svg>
            Free visibility score in ~60 seconds · No credit card
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <div
      className={`${instrumentSerif.variable} ${workSans.variable} ${ibmPlexMono.variable} text-[var(--ink)]`}
      style={{ fontFamily: "var(--font-work-sans), sans-serif" }}
    >
      <Suspense><AuthContent /></Suspense>
    </div>
  );
}
