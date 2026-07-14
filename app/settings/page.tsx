"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Instrument_Serif, Work_Sans, IBM_Plex_Mono } from "next/font/google";
import { createSupabaseBrowserClient } from "@/lib/supabase";
import { PricingCards, PRICING } from "@/app/_components/PricingCards";
import { BRAND_LIMITS, FREE_BRAND_LIMIT } from "@/lib/plan-limits";

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

// Same marketing names shown on the pricing cards the user actually picked
// from, rather than raw plan keys like "starter" — single source of truth.
const PLAN_NAME: Record<string, string> = Object.fromEntries(PRICING.map((p) => [p.planKey, p.name]));

type SubscriptionInfo = {
  plan: string | null;
  isFree: boolean;
  hasBillingAccount: boolean;
  status: string | null;
  nextBillingDate: string | null;
  cancelAtNextBillingDate: boolean;
};

function SettingsContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [sub, setSub] = useState<SubscriptionInfo | null>(null);
  const [brandCount, setBrandCount] = useState(0);
  const [portalLoading, setPortalLoading] = useState(false);
  const [portalError, setPortalError] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    createSupabaseBrowserClient().auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.replace("/auth?redirect=/settings"); return; }
      setUserEmail(user.email ?? "");
    });
    Promise.all([
      fetch("/api/dodo/subscription").then((r) => r.json()),
      fetch("/api/brands").then((r) => r.json()),
    ])
      .then(([subData, brandsData]) => {
        setSub(subData);
        setBrandCount(
          ((brandsData.brands ?? []) as { role?: string }[]).filter((b) => b.role !== "member").length
        );
      })
      .finally(() => setLoading(false));
  }, []);

  async function openBillingPortal() {
    setPortalLoading(true);
    setPortalError("");
    try {
      const res = await fetch("/api/dodo/portal", { method: "POST" });
      const data = await res.json();
      if (!res.ok) { setPortalError(data.error ?? "Couldn't open billing portal"); return; }
      window.location.href = data.url;
    } catch {
      setPortalError("Couldn't open billing portal");
    } finally {
      setPortalLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center">
        <span className="w-7 h-7 border-2 border-[var(--rust)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const planKey = sub?.plan;
  const planLabel = planKey ? PLAN_NAME[planKey] ?? planKey : "Free";
  const brandLimit = planKey ? BRAND_LIMITS[planKey] ?? FREE_BRAND_LIMIT : FREE_BRAND_LIMIT;

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      <header className="bg-[var(--surface)] border-b border-[var(--line)] px-6 py-4 flex items-center justify-between">
        <a href="/dashboard" className="font-bold text-xl tracking-tight">
          RankOn<span className="text-[var(--rust)]">Geo</span>
        </a>
        <a href="/dashboard" className="text-sm text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors">
          ← Back to dashboard
        </a>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12 space-y-8">
        <div>
          <h1 className="font-signal-serif text-3xl text-[var(--ink)] mb-1">Settings</h1>
          <p className="text-sm text-[var(--ink-soft)]">{userEmail}</p>
        </div>

        <div className="rounded-3xl bg-[var(--surface)] border border-[var(--line)] p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-[var(--ink-faint)] mb-1">Current plan</p>
              <p className="font-signal-serif text-2xl text-[var(--ink)]">{planLabel}</p>
            </div>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${
                sub?.isFree
                  ? "bg-[var(--line-soft)] text-[var(--ink-soft)]"
                  : "bg-[var(--olive-wash)] text-[var(--olive)]"
              }`}
            >
              {sub?.isFree ? "Free" : sub?.cancelAtNextBillingDate ? "Cancels at period end" : "Active"}
            </span>
          </div>

          {!sub?.isFree && sub?.nextBillingDate && (
            <p className="text-sm text-[var(--ink-soft)] mb-4">
              {sub.cancelAtNextBillingDate ? "Access ends" : "Renews"} on{" "}
              {new Date(sub.nextBillingDate).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
            </p>
          )}

          <p className="text-sm text-[var(--ink-soft)] mb-4">
            {brandCount} of {brandLimit} website{brandLimit === 1 ? "" : "s"} tracked
          </p>

          {portalError && (
            <p className="text-xs text-red-700 bg-red-500/10 border border-red-500/25 rounded-lg px-3 py-2 mb-4">
              {portalError}
            </p>
          )}

          {sub?.hasBillingAccount ? (
            <button
              onClick={openBillingPortal}
              disabled={portalLoading}
              className="w-full bg-[var(--rust)] hover:bg-[var(--rust-deep)] disabled:opacity-50 text-[var(--surface)] font-semibold py-3 rounded-full text-sm transition-colors"
            >
              {portalLoading ? "Opening billing portal..." : "Manage billing →"}
            </button>
          ) : (
            <p className="text-sm text-[var(--ink-soft)]">Pick a plan below to unlock more websites, prompts, and engines.</p>
          )}
        </div>

        <div>
          <h2 className="font-signal-serif text-xl text-[var(--ink)] mb-4">
            {sub?.isFree ? "Choose a plan" : "Change plan"}
          </h2>
          <PricingCards compact />
        </div>
      </main>
    </div>
  );
}

export default function SettingsPage() {
  const signalVars = {
    "--cream": "oklch(0.965 0.013 80)",
    "--surface": "oklch(0.99 0.006 80)",
    "--ink": "oklch(0.19 0.014 55)",
    "--ink-soft": "oklch(0.46 0.02 55)",
    "--ink-faint": "oklch(0.62 0.02 60)",
    "--rust": "oklch(0.56 0.15 38)",
    "--rust-deep": "oklch(0.46 0.14 36)",
    "--rust-wash": "oklch(0.56 0.15 38 / 12%)",
    "--olive": "oklch(0.52 0.1 130)",
    "--olive-wash": "oklch(0.52 0.1 130 / 12%)",
    "--line": "oklch(0.19 0.014 55 / 10%)",
    "--line-soft": "oklch(0.19 0.014 55 / 6%)",
  } as React.CSSProperties;

  return (
    <div
      className={`${instrumentSerif.variable} ${workSans.variable} ${ibmPlexMono.variable}`}
      style={{ ...signalVars, fontFamily: "var(--font-work-sans), sans-serif" }}
    >
      <Suspense><SettingsContent /></Suspense>
    </div>
  );
}
