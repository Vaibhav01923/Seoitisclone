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

const CURL_SNIPPET = `curl -X POST https://rankongeo.com/api/track/bot \\
  -H "Content-Type: application/json" \\
  -d '{
    "siteKey": "YOUR_SITE_KEY",
    "path": "/current/path",
    "userAgent": "User-Agent header from the request",
    "referrer": "Referer header from the request"
  }'`;

const NEXTJS_SNIPPET = `import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  fetch("https://rankongeo.com/api/track/bot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      siteKey: "YOUR_SITE_KEY",
      path: req.nextUrl.pathname,
      userAgent: req.headers.get("user-agent") ?? "",
      referrer: req.headers.get("referer") ?? "",
    }),
  }).catch(() => {}); // never let tracking break the request

  return NextResponse.next();
}`;

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative bg-[var(--line-soft)] border border-[var(--line)] rounded-lg px-4 py-3 font-mono text-[13px] text-[var(--ink)]/90 overflow-x-auto mb-4 whitespace-pre">
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

export default function LlmAnalyticsDocsPage() {
  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]" style={signalVars}>
      <div className="max-w-2xl mx-auto px-6 py-16">
        <Link href="/dashboard" className="text-xs font-semibold text-[var(--rust)] hover:underline">← Back to dashboard</Link>

        <h1 className="text-3xl font-bold text-[var(--ink)] mt-6 mb-2">LLM Analytics setup</h1>
        <p className="text-[var(--ink-soft)] mb-10">Track AI search engines, crawlers, and bots visiting your site — ChatGPT, Claude, Perplexity, Gemini, DeepSeek, and more.</p>

        <div className="bg-[var(--rust-wash)] border border-[var(--rust)]/25 rounded-lg px-4 py-3 mb-10">
          <p className="text-sm text-[var(--rust-deep)]">
            Most AI crawlers don&apos;t execute JavaScript, so a client-side script (like Web Analytics uses) can&apos;t see them. This needs a <strong>server-side</strong> call from your own backend or middleware — on every request, not just the ones a browser would make.
          </p>
        </div>

        <h2 className="text-lg font-semibold text-[var(--ink)] mb-2">Endpoint</h2>
        <p className="text-sm text-[var(--ink-soft)] mb-3"><code className="text-[var(--rust-deep)]">POST https://rankongeo.com/api/track/bot</code></p>
        <CodeBlock code={CURL_SNIPPET} />
        <p className="text-xs text-[var(--ink-faint)] mb-10">
          Only recognized AI bot user-agents get stored — sending this for every request (including regular human traffic) is safe and expected; non-bot requests are silently ignored.
        </p>

        <h2 className="text-lg font-semibold text-[var(--ink)] mb-2">Next.js middleware example</h2>
        <p className="text-sm text-[var(--ink-soft)] mb-3">Drop this in your <code className="text-[var(--rust-deep)]">middleware.ts</code> so every request gets checked:</p>
        <CodeBlock code={NEXTJS_SNIPPET} />
        <p className="text-xs text-[var(--ink-faint)] mb-10">
          Not on Next.js? Any server-side request hook works — Express middleware, a Cloudflare Worker, an Nginx log-based script, anything that can read the incoming <code className="text-[var(--rust-deep)]">User-Agent</code> header and make an outbound POST.
        </p>

        <h2 className="text-lg font-semibold text-[var(--ink)] mb-2">AI crawlers we track</h2>
        <ul className="text-sm text-[var(--ink-soft)] space-y-1.5 mb-10 list-disc pl-5">
          <li><strong className="text-[var(--ink)]">ChatGPT</strong> — OpenAI&apos;s conversational AI and search (GPTBot, ChatGPT-User, OAI-SearchBot)</li>
          <li><strong className="text-[var(--ink)]">Claude</strong> — Anthropic&apos;s AI assistant (ClaudeBot, anthropic-ai)</li>
          <li><strong className="text-[var(--ink)]">Perplexity</strong> — AI-powered search engine (PerplexityBot)</li>
          <li><strong className="text-[var(--ink)]">Gemini</strong> — Google&apos;s AI platform (Google-Extended)</li>
          <li><strong className="text-[var(--ink)]">DeepSeek</strong> — Advanced AI search</li>
          <li><strong className="text-[var(--ink)]">Others</strong> — CCBot, Bytespider, Amazonbot, and other AI crawlers</li>
        </ul>

        <h2 className="text-lg font-semibold text-[var(--ink)] mb-2">Not seeing AI traffic?</h2>
        <ul className="text-sm text-[var(--ink-soft)] space-y-2 list-disc pl-5">
          <li>Verify the <code className="text-[var(--rust-deep)]">siteKey</code> matches the Website ID shown on the LLM Analytics tab.</li>
          <li>Add a log line to confirm your middleware is actually running on the routes you expect.</li>
          <li>AI crawlers visit on their own schedule, not on a fixed interval — it can take time before real traffic shows up. Use &quot;Send test event&quot; in the dashboard to confirm the pipeline itself works.</li>
        </ul>

        <div className="mt-10 pt-6 border-t border-[var(--line)]">
          <Link href="/docs/web-analytics" className="text-sm font-semibold text-[var(--rust)] hover:underline">← Web Analytics setup</Link>
        </div>
      </div>
    </div>
  );
}
