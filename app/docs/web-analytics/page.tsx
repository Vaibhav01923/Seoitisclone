"use client";

import { useState } from "react";
import Link from "next/link";

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

const SNIPPET = `<script src="https://rankongeo.com/track.js" data-site="YOUR_SITE_KEY" defer></script>`;

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative bg-[var(--line-soft)] border border-[var(--line)] rounded-lg px-4 py-3 font-mono text-sm text-[var(--ink)]/90 overflow-x-auto mb-4 whitespace-pre">
      {code}
      <button
        onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
        className="absolute top-2 right-2 text-[10px] font-semibold border border-[var(--line)] bg-[var(--surface)] px-2 py-1 rounded-md text-[var(--ink-soft)] hover:bg-[var(--line-soft)] transition-colors"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

export default function WebAnalyticsDocsPage() {
  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]" style={signalVars}>
      <div className="max-w-2xl mx-auto px-6 py-16">
        <Link href="/dashboard" className="text-xs font-semibold text-[var(--rust)] hover:underline">← Back to dashboard</Link>

        <h1 className="text-3xl font-bold text-[var(--ink)] mt-6 mb-2">Web Analytics setup</h1>
        <p className="text-[var(--ink-soft)] mb-10">Privacy-first analytics for your website — live visitors, pageviews, visit duration, and bounce rate.</p>

        <h2 className="text-lg font-semibold text-[var(--ink)] mb-2">1. Get your Website ID</h2>
        <p className="text-sm text-[var(--ink-soft)] mb-4">
          Open <Link href="/dashboard" className="text-[var(--rust)] hover:underline">Web Analytics</Link> in your dashboard — your site&apos;s ID is shown there, and gets substituted into the snippet below automatically.
        </p>

        <h2 className="text-lg font-semibold text-[var(--ink)] mb-2">2. Add the tracking script</h2>
        <p className="text-sm text-[var(--ink-soft)] mb-3">Paste this into the <code className="text-[var(--rust-deep)]">&lt;head&gt;</code> section of every page you want tracked:</p>
        <CodeBlock code={SNIPPET} />
        <p className="text-xs text-[var(--ink-faint)] mb-10">
          The script sets a first-party cookie to distinguish visitors and sessions, then sends one pageview event per page load. No cross-site tracking, no third-party cookies.
        </p>

        <h2 className="text-lg font-semibold text-[var(--ink)] mb-2">3. Confirm it&apos;s working</h2>
        <p className="text-sm text-[var(--ink-soft)] mb-10">
          Visit a page on your site, then check the Web Analytics tab — a pageview should show up within a few seconds. You can also click &quot;Send test event&quot; in the dashboard to see the layout populate before deploying the script.
        </p>

        <h2 className="text-lg font-semibold text-[var(--ink)] mb-2">Metrics explained</h2>
        <ul className="text-sm text-[var(--ink-soft)] space-y-2 mb-10 list-disc pl-5">
          <li><strong className="text-[var(--ink)]">Live Visitors</strong> — distinct visitors seen in the last 5 minutes.</li>
          <li><strong className="text-[var(--ink)]">Visitors</strong> — distinct visitors in the last 30 days.</li>
          <li><strong className="text-[var(--ink)]">Pageviews</strong> — total page loads in the last 30 days.</li>
          <li><strong className="text-[var(--ink)]">Visit Duration</strong> — average time between a session&apos;s first and last pageview.</li>
          <li><strong className="text-[var(--ink)]">Bounce Rate</strong> — share of sessions with only a single pageview.</li>
        </ul>

        <h2 className="text-lg font-semibold text-[var(--ink)] mb-2">Not seeing data?</h2>
        <ul className="text-sm text-[var(--ink-soft)] space-y-2 list-disc pl-5">
          <li>Confirm the script tag&apos;s <code className="text-[var(--rust-deep)]">data-site</code> matches the Website ID shown in your dashboard.</li>
          <li>Open your browser&apos;s network tab and confirm a request to <code className="text-[var(--rust-deep)]">rankongeo.com/api/track/pageview</code> is firing and returning 200.</li>
          <li>Ad blockers occasionally block analytics scripts by name — this is a known limitation of any client-side analytics tool.</li>
        </ul>

        <div className="mt-10 pt-6 border-t border-[var(--line)]">
          <Link href="/docs/llm-analytics" className="text-sm font-semibold text-[var(--rust)] hover:underline">Next: LLM Analytics setup →</Link>
        </div>
      </div>
    </div>
  );
}
