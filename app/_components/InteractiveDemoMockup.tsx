"use client";
import { useState } from "react";

/* Engine hues tuned for the dark surface — recognizable but not neon. */
const ENG_COLORS: Record<string, string> = {
  ChatGPT: "#3ecf9e",
  Claude: "#e08a5e",
  Gemini: "#6ba5ff",
  Perplexity: "#35c3d6",
  Grok: "#cfd8d3",
  "Google AI": "#ffb469",
};
const ENGINES = ["ChatGPT", "Claude", "Gemini", "Perplexity", "Grok", "Google AI"];

/* shared skin */
const card = "rounded-xl bg-white/[0.03] shadow-[inset_0_0_0_1px_rgba(234,246,238,0.07)]";
const kpiLabel = "text-[9px] font-semibold uppercase tracking-[0.14em] text-faint mb-1";

// ── OVERVIEW ──────────────────────────────────────────────────────
function OverviewContent() {
  const trend = [42, 46, 44, 50, 54, 52, 58, 62, 60, 65, 68, 65, 70, 72, 74];
  const max = Math.max(...trend), min = Math.min(...trend);
  const norm = trend.map((v) => ((v - min) / (max - min)) * 55);
  const poly = norm.map((v, i) => `${i * 27 + 8},${60 - v}`).join(" ");
  const lastX = 8 + 14 * 27, lastY = 60 - norm[14];
  return (
    <div className="p-5" style={{ animation: "fadeUp 0.3s ease forwards" }}>
      <h2 className="mb-0.5 text-lg font-semibold text-ink">Overview</h2>
      <p className="mb-4 text-xs text-faint">playwright.dev · last scan Jun 24, 2026</p>
      <div className="mb-4 grid grid-cols-4 gap-2.5">
        {[
          { label: "COMPOSITE VISIBILITY", val: "72.4%", sub: "+8.1% vs last scan", up: true },
          { label: "TOTAL MENTIONS", val: "3,241", sub: "+12% this week", up: true },
          { label: "AVG POSITION", val: "1.8", sub: "across all engines", up: false },
          { label: "SENTIMENT", val: "89%", sub: "positive responses", up: false },
        ].map((s) => (
          <div key={s.label} className={`${card} p-3.5`}>
            <p className={kpiLabel}>{s.label}</p>
            <p className="font-serif text-2xl font-[400] text-ink">{s.val}</p>
            <p className={`mt-0.5 text-[10px] ${s.up ? "text-mint" : "text-faint"}`}>{s.sub}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        <div className={`${card} col-span-2 p-4`}>
          <p className="mb-2 text-xs font-medium text-muted">Visibility trend — last 15 scans</p>
          <svg width="100%" height="65" viewBox="0 0 390 65">
            <defs>
              <linearGradient id="demoSpark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="rgba(140,245,195,.25)" />
                <stop offset="1" stopColor="rgba(140,245,195,0)" />
              </linearGradient>
            </defs>
            <polygon points={`8,60 ${poly} ${lastX},60`} fill="url(#demoSpark)" />
            <polyline
              points={poly}
              fill="none"
              stroke="#8cf5c3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 0 5px rgba(140,245,195,.45))" }}
            />
            <circle cx={lastX} cy={lastY} r="3.5" fill="#8cf5c3" />
          </svg>
        </div>
        <div className={`${card} p-4`}>
          <p className="mb-3 text-xs font-medium text-muted">By engine</p>
          <div className="space-y-2">
            {[
              { name: "ChatGPT", pct: 80 }, { name: "Claude", pct: 74 }, { name: "Gemini", pct: 72 },
              { name: "Perplexity", pct: 69 }, { name: "Grok", pct: 65 }, { name: "Google AI", pct: 79 },
            ].map((e) => (
              <div key={e.name} className="flex items-center gap-1.5">
                <span className="w-14 shrink-0 truncate text-right text-[9px] text-muted">{e.name}</span>
                <div className="h-1.5 flex-1 rounded-full bg-white/[0.06]">
                  <div className="h-full rounded-full" style={{ width: `${e.pct}%`, background: ENG_COLORS[e.name] }} />
                </div>
                <span className="w-6 shrink-0 text-[9px] text-muted">{e.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ENGINES ───────────────────────────────────────────────────────
function EnginesContent() {
  const scans: Array<{ overall: number; data: Record<string, number>; time: string }> = [
    { overall: 74, data: { ChatGPT: 80, Claude: 78, Gemini: 72, Perplexity: 69, Grok: 65, "Google AI": 79 }, time: "Jun 24, 2026, 12:01 AM" },
    { overall: 71, data: { ChatGPT: 75, Claude: 74, Gemini: 68, Perplexity: 71, Grok: 61, "Google AI": 77 }, time: "Jun 23, 2026, 11:09 PM" },
    { overall: 68, data: { ChatGPT: 73, Claude: 70, Gemini: 65, Perplexity: 64, Grok: 58, "Google AI": 74 }, time: "Jun 23, 2026, 10:54 PM" },
  ];
  return (
    <div className="p-5" style={{ animation: "fadeUp 0.3s ease forwards" }}>
      <h2 className="mb-4 text-lg font-semibold text-ink">Engines</h2>
      <div className="space-y-2.5">
        {scans.map((scan, i) => (
          <div key={i} className={`${card} flex items-center gap-4 px-5 py-4`}>
            <span className="w-14 shrink-0 font-serif text-3xl font-[400] text-ink">{scan.overall}%</span>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted">
                {ENGINES.map((e) => (
                  <span key={e}>
                    <span className="font-medium text-ink/80">{e}:</span>{" "}
                    <span className="text-muted">{scan.data[e]}%</span>
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-faint">{scan.time}</p>
            </div>
            <div className="flex shrink-0 gap-1">
              {ENGINES.map((e) => (
                <span key={e} className="h-2 w-2 rounded-full" style={{ background: ENG_COLORS[e], boxShadow: `0 0 6px ${ENG_COLORS[e]}66` }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PROMPTS ───────────────────────────────────────────────────────
const PROMPT_ENGINE_COLORS: Record<string, string> = { gpt: "#3ecf9e", gemini: "#6ba5ff", google: "#ffb469" };
const PROMPT_TYPE_COLORS: Record<string, string> = { branded: "#c9a5ff", competitor: "#ffb469", commercial: "#6ba5ff" };

function PromptsContent() {
  const [search, setSearch] = useState("");
  const rows: { text: string; vis: number; engines: Record<"gpt" | "gemini" | "google", boolean>; competing: string; type: string }[] = [
    { text: "Playwright review", vis: 67, engines: { gpt: true, gemini: true, google: false }, competing: "Selenium", type: "branded" },
    { text: "Playwright pricing", vis: 100, engines: { gpt: true, gemini: true, google: true }, competing: "—", type: "branded" },
    { text: "Is Playwright free", vis: 100, engines: { gpt: true, gemini: true, google: true }, competing: "—", type: "branded" },
    { text: "best browser automation tool for QA teams", vis: 67, engines: { gpt: true, gemini: false, google: true }, competing: "Selenium", type: "commercial" },
    { text: "Playwright vs Selenium which is better", vis: 33, engines: { gpt: false, gemini: true, google: false }, competing: "Selenium", type: "competitor" },
  ];
  const filtered = rows.filter((r) => !search || r.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-5" style={{ animation: "fadeUp 0.3s ease forwards" }}>
      <h2 className="mb-0.5 text-lg font-semibold text-ink">Prompts</h2>
      <p className="mb-4 text-xs text-faint">Manage your search prompts &amp; track visibility gaps</p>

      <div className="mb-3 grid grid-cols-4 gap-2.5">
        {[
          { label: "PROMPTS", val: "20", sub: "tracked" },
          { label: "WITH GAPS", val: "5", sub: "need articles" },
          { label: "AVG VISIBILITY", val: "92%", sub: "across engines" },
          { label: "ENGINES", val: "3", sub: "being tracked" },
        ].map((s) => (
          <div key={s.label} className={`${card} p-3.5`}>
            <p className={kpiLabel}>{s.label}</p>
            <p className="font-serif text-2xl font-[400] text-ink">{s.val}</p>
            <p className="mt-0.5 text-[10px] text-faint">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className={`${card} mb-3 px-4 py-3.5`}>
        <p className="mb-2 text-xs font-medium text-ink/90">20 of 25 prompts used</p>
        <div className="mb-2 flex h-1.5 gap-0.5 overflow-hidden rounded-full bg-white/[0.06]">
          <div className="h-full rounded-full" style={{ width: "36%", background: PROMPT_TYPE_COLORS.commercial }} />
          <div className="h-full rounded-full" style={{ width: "24%", background: PROMPT_TYPE_COLORS.competitor }} />
          <div className="h-full rounded-full" style={{ width: "20%", background: PROMPT_TYPE_COLORS.branded }} />
        </div>
        <div className="flex gap-4">
          {([["commercial", "Commercial", 9], ["competitor", "Competitor", 6], ["branded", "Branded", 5]] as const).map(([key, label, count]) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full" style={{ background: PROMPT_TYPE_COLORS[key] }} />
              <span className="text-[10px] text-muted">{label} ({count})</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3 flex items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-2 shadow-[inset_0_0_0_1px_rgba(234,246,238,0.1)] focus-within:shadow-[inset_0_0_0_1px_rgba(140,245,195,0.4)] transition-shadow">
        <svg className="h-3.5 w-3.5 shrink-0 text-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search prompts"
          className="flex-1 bg-transparent text-xs text-ink outline-none placeholder:text-faint"
        />
      </div>

      <div className={`${card} overflow-hidden`}>
        <div className="grid grid-cols-[1fr_100px_90px_36px] gap-x-3 border-b border-line bg-white/[0.02] px-4 py-2.5">
          <span className={kpiLabel + " mb-0"}>Prompts</span>
          <span className={kpiLabel + " mb-0"}>Engines</span>
          <span className={kpiLabel + " mb-0"}>Competing with</span>
          <span className={kpiLabel + " mb-0 text-center"}>Type</span>
        </div>
        {filtered.map((r, i) => (
          <div key={i} className="grid grid-cols-[1fr_100px_90px_36px] items-center gap-x-3 border-b border-line px-4 py-3 last:border-0">
            <div className="flex min-w-0 items-center gap-2.5">
              <div className="relative h-8 w-8 shrink-0">
                <svg viewBox="0 0 32 32" className="h-8 w-8 -rotate-90">
                  <circle cx="16" cy="16" r="13" fill="none" stroke="rgba(234,246,238,.08)" strokeWidth="2.5" />
                  <circle
                    cx="16" cy="16" r="13" fill="none"
                    stroke={r.vis >= 80 ? "#8cf5c3" : r.vis >= 50 ? "#ffb469" : "#ff7d6b"}
                    strokeWidth="2.5" strokeDasharray={`${r.vis * 0.817} 81.7`} strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[7px] font-bold text-muted">{r.vis}%</span>
              </div>
              <span className="truncate text-xs font-medium text-ink/90">{r.text}</span>
            </div>
            <div className="flex items-center gap-1.5">
              {(["gpt", "gemini", "google"] as const).map((e) => (
                <span key={e} className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: r.engines[e] ? PROMPT_ENGINE_COLORS[e] : "rgba(234,246,238,.12)" }} />
              ))}
            </div>
            <span className="truncate text-[11px] text-muted">{r.competing}</span>
            <div className="flex justify-center">
              <div className="h-2 w-2 rounded-full" style={{ background: PROMPT_TYPE_COLORS[r.type] }} />
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="px-4 py-6 text-center text-xs text-faint">No prompts match “{search}”.</p>
        )}
      </div>
    </div>
  );
}

// ── CITATIONS ─────────────────────────────────────────────────────
type EngageDemoItem = { platform: "Reddit" | "LinkedIn"; color: string; icon: string; url: string; prompt: string };

const CITATION_DOMAINS = [
  { rank: 1, domain: "youtube.com", count: 16, color: "#e5484d", icon: "▶", engagement: false },
  { rank: 2, domain: "reddit.com", count: 11, color: "#FF4500", icon: "R", engagement: true },
  { rank: 3, domain: "medium.com", count: 6, color: "#e6e6e6", icon: "M", engagement: false },
  { rank: 4, domain: "linkedin.com", count: 5, color: "#378fe9", icon: "in", engagement: true },
  { rank: 5, domain: "github.com", count: 3, color: "#c9d1d9", icon: "◆", engagement: false },
];

const CITATION_INSTANCES: Record<string, { url: string; source: string; prompt: string }[]> = {
  "reddit.com": [
    { url: "reddit.com/r/softwaretesting/comments/1b91vv6/playwright_costs/", source: "Google AI", prompt: "Is Playwright free" },
    { url: "reddit.com/r/QualityAssurance/comments/1mxe2yc/ai_in_qaautomation/", source: "Google AI", prompt: "best web automation tool for QA teams" },
    { url: "reddit.com/r/softwaretesting/comments/1bovaoa/selenium_vs_playwright/", source: "Google AI", prompt: "Playwright vs Selenium which is better" },
  ],
  "linkedin.com": [
    { url: "linkedin.com/posts/qa-weekly_playwright-vs-selenium-activity/", source: "Perplexity", prompt: "Playwright vs Selenium which is better" },
    { url: "linkedin.com/posts/testautomation-hub_switching-to-playwright/", source: "ChatGPT", prompt: "switching from Selenium to Playwright" },
  ],
  "youtube.com": [{ url: "youtube.com/watch?v=playwright-crash-course", source: "ChatGPT", prompt: "how good is Playwright" }],
  "medium.com": [{ url: "medium.com/@qaeng/playwright-vs-cypress-2026", source: "Gemini", prompt: "best browser automation tool for QA teams" }],
  "github.com": [{ url: "github.com/microsoft/playwright", source: "Perplexity", prompt: "Playwright review" }],
};

const REDDIT_REPLY = "Playwright's auto-waiting alone cut our flaky test rate way down — worth a look if Selenium timeouts are the pain point.";
const LINKEDIN_REPLY = "We moved our E2E suite from Selenium to Playwright and cut CI time in half — happy to share specifics if useful.";

function CitationsContent() {
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);
  const [engageItem, setEngageItem] = useState<EngageDemoItem | null>(null);
  const [engageDraft, setEngageDraft] = useState("");
  const [engageSubmitted, setEngageSubmitted] = useState(false);
  const [upvoteEnabled, setUpvoteEnabled] = useState(false);
  const [upvoteQty, setUpvoteQty] = useState(10);
  const [upvoteSpeed, setUpvoteSpeed] = useState<"Slow" | "Normal" | "Fast">("Normal");

  const platforms: { name: "Reddit" | "LinkedIn"; color: string; icon: string; desc: string }[] = [
    { name: "Reddit", color: "#FF4500", icon: "R", desc: "Engage on Reddit threads to get cited in AI responses and boost your visibility." },
    { name: "LinkedIn", color: "#378fe9", icon: "in", desc: "Engage on LinkedIn posts to get cited in AI responses and boost your visibility." },
  ];

  function openEngage(platform: "Reddit" | "LinkedIn", url: string, prompt: string) {
    const meta = platform === "Reddit" ? { color: "#FF4500", icon: "R" } : { color: "#378fe9", icon: "in" };
    setEngageItem({ platform, url, prompt, ...meta });
    setEngageDraft("");
    setEngageSubmitted(false);
    setUpvoteEnabled(false);
    setUpvoteQty(10);
    setUpvoteSpeed("Normal");
  }

  return (
    <div className="relative p-5" style={{ animation: "fadeUp 0.3s ease forwards" }}>
      <h2 className="mb-0.5 text-lg font-semibold text-ink">Citations</h2>
      <p className="mb-4 text-xs text-faint">Discover the sources AI uses in its responses</p>

      <p className="mb-0.5 text-xs font-medium text-ink/90">Engagement platforms</p>
      <p className="mb-3 text-[11px] text-faint">Engage on these platforms to increase your AI visibility</p>
      <div className="mb-4 grid grid-cols-2 gap-2.5">
        {platforms.map((p) => {
          const firstInstance = CITATION_INSTANCES[p.name === "Reddit" ? "reddit.com" : "linkedin.com"][0];
          return (
            <div key={p.name} className={`${card} p-3.5`}>
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold text-white" style={{ background: p.color }}>
                  {p.icon}
                </div>
                <span className="text-sm font-semibold text-ink">{p.name}</span>
                <span className="ml-auto whitespace-nowrap rounded-full bg-mint/10 px-1.5 py-0.5 text-[9px] font-bold text-mint shadow-[inset_0_0_0_1px_rgba(140,245,195,0.25)]">
                  High impact
                </span>
              </div>
              <p className="mb-2.5 text-[10px] leading-snug text-muted">{p.desc}</p>
              <button
                onClick={() => openEngage(p.name, firstInstance.url, firstInstance.prompt)}
                className="w-full rounded-lg py-1.5 text-xs font-semibold text-white transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint"
                style={{ background: p.color }}
              >
                Engage
              </button>
            </div>
          );
        })}
      </div>

      <div className={`${card} overflow-hidden`}>
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <p className="text-xs font-medium text-ink/90">Top cited domains</p>
          <p className="text-[11px] text-faint">121 domains</p>
        </div>
        <div className="grid grid-cols-[40px_1fr_70px_150px] gap-x-3 border-b border-line px-4 py-2">
          <span className={kpiLabel + " mb-0"}>Rank</span>
          <span className={kpiLabel + " mb-0"}>Domain</span>
          <span className={kpiLabel + " mb-0 text-right"}>Citations</span>
          <span className={kpiLabel + " mb-0 text-right"}>Details</span>
        </div>
        {CITATION_DOMAINS.map((d) => {
          const isExpanded = expandedDomain === d.domain;
          const instances = CITATION_INSTANCES[d.domain] ?? [];
          return (
            <div key={d.domain} className="border-b border-line last:border-0">
              <button
                onClick={() => setExpandedDomain(isExpanded ? null : d.domain)}
                className="grid w-full grid-cols-[40px_1fr_70px_150px] items-center gap-x-3 px-4 py-2.5 text-left transition-colors hover:bg-white/[0.03] focus-visible:outline-none focus-visible:bg-white/[0.04]"
                aria-expanded={isExpanded}
              >
                <span className="text-[11px] font-medium text-faint">#{d.rank}</span>
                <div className="flex min-w-0 items-center gap-2">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-[9px] font-bold text-[#08130d]" style={{ background: d.color }}>
                    {d.icon}
                  </div>
                  <span className="truncate text-xs font-medium text-ink/90">{d.domain}</span>
                </div>
                <span className="text-right text-xs font-semibold text-ink">{d.count}</span>
                <div className="flex items-center justify-end gap-1.5">
                  <span className={`text-right text-[11px] font-medium ${d.engagement ? "text-amber" : "text-faint"}`}>
                    {d.engagement ? "Engagement opportunities" : "Learn more ↗"}
                  </span>
                  <svg className={`h-3 w-3 shrink-0 text-faint transition-transform ${isExpanded ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
              {isExpanded && (
                <div className="border-t border-line bg-black/20 px-4 py-2">
                  {instances.map((inst, i) => (
                    <div key={i} className="flex items-center gap-2 border-b border-line py-1.5 last:border-0">
                      <a
                        href={`https://${inst.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="min-w-0 flex-1 truncate text-[11px] text-mint hover:underline"
                      >
                        {inst.url}
                      </a>
                      <span className="shrink-0 rounded bg-white/[0.05] px-1.5 py-0.5 text-[9px] font-medium text-muted shadow-[inset_0_0_0_1px_rgba(234,246,238,0.08)]">
                        {inst.source}
                      </span>
                      <span className="hidden w-28 shrink-0 truncate text-[10px] italic text-faint sm:block">{inst.prompt}</span>
                      {d.engagement && (
                        <button
                          onClick={() => openEngage(d.domain === "reddit.com" ? "Reddit" : "LinkedIn", inst.url, inst.prompt)}
                          className="shrink-0 rounded-md px-2 py-1 text-[10px] font-semibold text-white transition-all hover:brightness-110"
                          style={{ background: d.color === "#378fe9" || d.domain === "linkedin.com" ? "#378fe9" : "#FF4500" }}
                        >
                          Engage
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Engage side panel */}
      {engageItem && (
        <div className="absolute inset-0 z-20 flex overflow-hidden rounded-b-2xl">
          <div className="flex-1 bg-black/50 backdrop-blur-[2px]" onClick={() => setEngageItem(null)} />
          <div className="flex h-full w-[280px] flex-col border-l border-line-2 bg-[#0b1c13] shadow-2xl" style={{ animation: "fadeSlideIn 0.25s ease forwards" }}>
            <div className="flex items-center gap-2.5 border-b border-line px-4 py-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold text-white" style={{ background: engageItem.color }}>
                {engageItem.icon}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-ink">Engage on {engageItem.platform}</p>
                <p className="truncate text-[10px] text-faint">Draft a reply to influence this citation</p>
              </div>
              <button onClick={() => setEngageItem(null)} className="ml-auto shrink-0 text-faint transition-colors hover:text-ink" aria-label="Close">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="border-b border-line bg-black/20 px-4 py-3">
              <p className={kpiLabel}>Thread</p>
              <p className="break-all text-[11px] leading-relaxed text-mint">{engageItem.url}</p>
              <p className="mt-1.5 truncate text-[10px] italic text-faint">for prompt: &ldquo;{engageItem.prompt}&rdquo;</p>
            </div>

            <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-4 py-3">
              {engageSubmitted ? (
                <div className="flex flex-1 flex-col items-center justify-center gap-3 py-6 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mint/10 shadow-[inset_0_0_0_1px_rgba(140,245,195,0.3)]">
                    <svg className="h-5 w-5 text-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-ink">Task submitted!</p>
                  <p className="text-[10px] text-faint">Your reply is queued for review.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <p className={kpiLabel + " mb-0"}>Reply draft</p>
                    <button
                      onClick={() => setEngageDraft(engageItem.platform === "Reddit" ? REDDIT_REPLY : LINKEDIN_REPLY)}
                      className="flex items-center gap-1 text-[10px] font-medium text-mint transition-opacity hover:opacity-80"
                    >
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      AI suggest
                    </button>
                  </div>
                  <textarea
                    value={engageDraft}
                    onChange={(e) => setEngageDraft(e.target.value)}
                    placeholder="Write your reply, or click AI suggest…"
                    rows={5}
                    className="w-full resize-none rounded-lg bg-white/[0.04] p-2.5 text-[11px] text-ink shadow-[inset_0_0_0_1px_rgba(234,246,238,0.1)] outline-none placeholder:text-faint focus:shadow-[inset_0_0_0_1px_rgba(140,245,195,0.4)]"
                  />

                  {engageItem.platform === "Reddit" && (
                    <div className="overflow-hidden rounded-lg shadow-[inset_0_0_0_1px_rgba(234,246,238,0.1)]">
                      <button
                        onClick={() => setUpvoteEnabled((v) => !v)}
                        className="flex w-full items-center gap-2.5 px-3 py-2.5 transition-colors hover:bg-white/[0.03]"
                        aria-expanded={upvoteEnabled}
                      >
                        <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded transition-colors ${upvoteEnabled ? "bg-[#FF4500]" : "shadow-[inset_0_0_0_1px_rgba(234,246,238,0.25)]"}`}>
                          {upvoteEnabled && (
                            <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div className="min-w-0 flex-1 text-left">
                          <p className="text-[11px] font-semibold text-ink/90">Order upvotes to rank this reply</p>
                          <p className="text-[9px] text-faint">Boost visibility so AI engines surface your comment</p>
                        </div>
                        <svg className={`h-3.5 w-3.5 shrink-0 text-faint transition-transform ${upvoteEnabled ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {upvoteEnabled && (
                        <div className="space-y-2.5 border-t border-line px-3 pb-3 pt-2">
                          <div className="flex gap-2.5">
                            <div className="flex-1">
                              <p className="mb-1 text-[9px] font-semibold text-faint">Quantity</p>
                              <div className="flex items-center gap-1.5">
                                <button onClick={() => setUpvoteQty((q) => Math.max(1, q - 5))} className="flex h-6 w-6 items-center justify-center rounded-md text-xs font-medium text-muted shadow-[inset_0_0_0_1px_rgba(234,246,238,0.12)] hover:text-ink" aria-label="Fewer upvotes">−</button>
                                <span className="w-6 text-center text-xs font-semibold text-ink">{upvoteQty}</span>
                                <button onClick={() => setUpvoteQty((q) => q + 5)} className="flex h-6 w-6 items-center justify-center rounded-md text-xs font-medium text-muted shadow-[inset_0_0_0_1px_rgba(234,246,238,0.12)] hover:text-ink" aria-label="More upvotes">+</button>
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="mb-1 text-[9px] font-semibold text-faint">Speed</p>
                              <select
                                value={upvoteSpeed}
                                onChange={(e) => setUpvoteSpeed(e.target.value as "Slow" | "Normal" | "Fast")}
                                className="w-full rounded-md bg-white/[0.05] px-1.5 py-1 text-[11px] text-ink shadow-[inset_0_0_0_1px_rgba(234,246,238,0.12)] outline-none"
                              >
                                <option value="Slow">Slow (safer)</option>
                                <option value="Normal">Normal</option>
                                <option value="Fast">Fast</option>
                              </select>
                            </div>
                          </div>
                          <div className="flex items-center justify-between rounded-md bg-white/[0.03] px-2.5 py-1.5 text-[10px] text-faint">
                            <span>{upvoteQty} upvotes × $0.10</span>
                            <span className="font-semibold text-ink/90">${(upvoteQty * 0.1).toFixed(2)}</span>
                          </div>
                          <p className="rounded-md bg-amber/10 px-2.5 py-1.5 text-[10px] leading-relaxed text-amber">
                            Comments under 200 chars have ~35% removal rate. Keep replies natural and helpful.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {!engageSubmitted && (
              <div className="border-t border-line px-4 py-3">
                <button
                  onClick={() => setEngageSubmitted(true)}
                  disabled={!engageDraft.trim()}
                  className="w-full rounded-lg py-2 text-xs font-semibold text-white transition-opacity disabled:opacity-40"
                  style={{ background: engageItem.color }}
                >
                  {upvoteEnabled ? `Submit Task · $${(upvoteQty * 0.1).toFixed(2)}` : "Submit reply"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── COMPETITORS ───────────────────────────────────────────────────
function CompetitorsContent() {
  const data = [
    { name: "Selenium", pct: 35 }, { name: "Cypress", pct: 35 },
    { name: "Puppeteer", pct: 9 }, { name: "TestCafe", pct: 13 },
    { name: "Playwright", pct: 51, isMe: true },
  ];
  return (
    <div className="p-5" style={{ animation: "fadeUp 0.3s ease forwards" }}>
      <div className={`${card} p-5`}>
        <h2 className="mb-0.5 text-lg font-semibold text-ink">Competitors</h2>
        <p className="mb-5 text-xs text-faint">Share of voice across AI engines</p>
        <div className="space-y-3">
          {data.map((d) => (
            <div key={d.name} className="flex items-center gap-4">
              <span className={`w-20 shrink-0 text-right text-sm ${d.isMe ? "font-semibold text-ink" : "text-muted"}`}>{d.name}</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${d.pct}%`,
                    background: d.isMe ? "linear-gradient(90deg, rgba(55,201,141,.6), #8cf5c3)" : "rgba(234,246,238,.22)",
                    boxShadow: d.isMe ? "0 0 12px rgba(140,245,195,.35)" : undefined,
                  }}
                />
              </div>
              <span className={`w-9 shrink-0 text-right text-sm ${d.isMe ? "font-semibold text-mint" : "text-muted"}`}>{d.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── RESEARCH ──────────────────────────────────────────────────────
function ResearchContent() {
  const gaps = [
    { query: "what tools can help me create visual dashboards for test results?", absent: ["ChatGPT", "Gemini", "Perplexity"], instead: null, published: false },
    { query: "how to ensure my tests are resilient and not impacted by UI changes?", absent: ["ChatGPT", "Gemini", "Perplexity"], instead: "Selenium", published: false },
    { query: "what's the best way to run parallel tests in different browsers?", absent: ["Perplexity", "Gemini"], instead: "Selenium", published: false },
    { query: "what tool do I use for testing across multiple browsers effortlessly?", absent: ["ChatGPT", "Perplexity"], instead: "Selenium", published: true },
    { query: "how can I monitor browser sessions live during test execution?", absent: ["ChatGPT", "Gemini"], instead: "Cypress", published: false },
  ];
  return (
    <div className="p-5" style={{ animation: "fadeUp 0.3s ease forwards" }}>
      <h2 className="mb-0.5 text-lg font-semibold text-ink">Research</h2>
      <p className="mb-4 text-xs text-faint">20 queries where Playwright isn&apos;t mentioned</p>
      <div className="space-y-2.5">
        {gaps.map((g, i) => (
          <div key={i} className={`${card} p-4`}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="mb-2 text-sm font-medium text-ink">{g.query}</p>
                <div className="mb-2 flex flex-wrap items-center gap-1.5">
                  {g.absent.map((e) => (
                    <span key={e} className="rounded-full bg-rose/10 px-2 py-0.5 text-[11px] font-medium text-rose shadow-[inset_0_0_0_1px_rgba(255,125,107,0.25)]">
                      Not in {e}
                    </span>
                  ))}
                  {g.instead && <span className="text-[11px] text-faint">· {g.instead} appears instead</span>}
                </div>
                <p className="text-[11px] text-faint">Publishing an article that answers this query will teach AI engines to recommend Playwright for it.</p>
              </div>
              {g.published ? (
                <div className="mt-0.5 flex shrink-0 items-center gap-2">
                  <span className="text-xs font-semibold text-mint">Published</span>
                  <span className="cursor-pointer text-xs text-muted underline">View article ↗</span>
                </div>
              ) : (
                <button className="shrink-0 rounded-lg bg-mint/10 px-3 py-1.5 text-xs font-semibold text-mint shadow-[inset_0_0_0_1px_rgba(140,245,195,0.3)] transition-colors hover:bg-mint/15">
                  Write article →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── TASKS ─────────────────────────────────────────────────────────
function TasksContent() {
  const tasks = [
    { platform: "Reddit", color: "#FF4500", status: "Completed", url: "reddit.com/r/QualityAssurance/comments/…", reply: "Playwright's auto-waiting alone cut our flaky test rate way down — worth a look if you're fighting Selenium timeouts.", upvotes: 25, engine: "ChatGPT" },
    { platform: "LinkedIn", color: "#378fe9", status: "Pending", url: "linkedin.com/posts/…", reply: "We moved our E2E suite from Selenium to Playwright and cut CI time in half.", upvotes: 0, engine: "Perplexity" },
    { platform: "Reddit", color: "#FF4500", status: "Pending", url: "reddit.com/r/webdev/comments/…", reply: "If cross-browser flakiness is the issue, Playwright's built-in retries handle it better than Selenium out of the box.", upvotes: 10, engine: "Gemini" },
  ];
  const pending = tasks.filter((t) => t.status === "Pending").length;
  return (
    <div className="p-5" style={{ animation: "fadeUp 0.3s ease forwards" }}>
      <h2 className="mb-0.5 text-lg font-semibold text-ink">Tasks</h2>
      <p className="mb-4 text-xs text-faint">Replies and upvote orders submitted from Citations · {pending} pending</p>
      <div className="space-y-2.5">
        {tasks.map((t, i) => (
          <div key={i} className={`${card} p-4`}>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold text-white" style={{ background: t.color }}>
                {t.platform === "LinkedIn" ? "in" : "R"}
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1.5 flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      t.status === "Completed"
                        ? "bg-mint/10 text-mint shadow-[inset_0_0_0_1px_rgba(140,245,195,0.25)]"
                        : "bg-amber/10 text-amber shadow-[inset_0_0_0_1px_rgba(255,180,105,0.25)]"
                    }`}
                  >
                    {t.status}
                  </span>
                  <span className="text-[10px] text-faint">{t.engine}</span>
                  <span className="ml-auto text-[10px] text-faint">{t.url}</span>
                </div>
                <p className="mb-1.5 rounded-lg bg-black/25 px-3 py-2 text-xs text-muted shadow-[inset_0_0_0_1px_rgba(234,246,238,0.06)]">{t.reply}</p>
                <p className="text-[10px] text-faint">{t.upvotes > 0 ? `${t.upvotes} upvotes ordered` : "No upvotes ordered"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── ARTICLES ──────────────────────────────────────────────────────
function ArticlesContent() {
  const [filter, setFilter] = useState("All");
  const articles = [
    { title: "What Tool Do I Use for Testing Across Multiple Browsers Effortlessly?", prompt: "what tool do I use for testing across multiple browsers effortlessly?", status: "Published", seo: "—", updated: "Jun 24" },
    { title: "Playwright vs Cypress: Complete 2025 Comparison Guide", prompt: "playwright vs cypress 2025", status: "Draft", seo: "72", updated: "Jun 23" },
    { title: "Setting up Playwright in Docker for CI/CD Pipelines", prompt: "playwright docker ci setup", status: "Draft", seo: "—", updated: "Jun 22" },
  ];
  const filtered = filter === "All" ? articles : articles.filter((a) => a.status === filter);
  return (
    <div className="p-5" style={{ animation: "fadeUp 0.3s ease forwards" }}>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="mb-0.5 text-lg font-semibold text-ink">Articles</h2>
          <p className="text-xs text-faint">{articles.length} pieces · 1 published</p>
        </div>
        <button className="rounded-lg bg-mint/10 px-3 py-1.5 text-xs font-semibold text-mint shadow-[inset_0_0_0_1px_rgba(140,245,195,0.3)] transition-colors hover:bg-mint/15">
          + New article
        </button>
      </div>
      <div className="mb-3 grid grid-cols-4 gap-2.5">
        {[
          { label: "PUBLISHED", val: "1", sub: "+0 this month" },
          { label: "IN DRAFT", val: "2", sub: "awaiting review" },
          { label: "AVG SEO SCORE", val: "72", sub: "1 scored" },
          { label: "LAST PUBLISHED", val: "Jun 24", sub: "" },
        ].map((s) => (
          <div key={s.label} className={`${card} p-3.5`}>
            <p className={kpiLabel}>{s.label}</p>
            <p className="font-serif text-xl font-[400] leading-tight text-ink">{s.val}</p>
            {s.sub && <p className="mt-0.5 text-[10px] text-faint">{s.sub}</p>}
          </div>
        ))}
      </div>
      <div className={`${card}`}>
        <div className="flex gap-1.5 border-b border-line p-3">
          {["All", "Draft", "Review", "Scheduled", "Published"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition-colors ${
                filter === f ? "bg-mint/15 text-mint" : "text-faint hover:bg-white/[0.04] hover:text-muted"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-3 border-b border-line px-4 py-2">
          <span className={kpiLabel + " mb-0 flex-1"}>Title</span>
          <span className={kpiLabel + " mb-0 w-20 text-center"}>Status</span>
          <span className={kpiLabel + " mb-0 w-10 text-center"}>SEO</span>
          <span className={kpiLabel + " mb-0 w-14 text-right"}>Updated</span>
        </div>
        {filtered.map((a, i) => (
          <div key={i} className="flex items-start gap-3 border-b border-line px-4 py-3 last:border-0">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium leading-snug text-ink/90">{a.title}</p>
              <p className="mt-0.5 truncate text-[10px] text-faint">{a.prompt}</p>
            </div>
            <span className={`mt-0.5 w-20 text-center text-xs font-semibold ${a.status === "Published" ? "text-mint" : "text-muted"}`}>{a.status}</span>
            <span className="mt-0.5 w-10 text-center text-xs text-muted">{a.seo}</span>
            <span className="mt-0.5 w-14 text-right text-xs text-faint">{a.updated}</span>
          </div>
        ))}
        {filtered.length === 0 && <p className="px-4 py-6 text-center text-xs text-faint">Nothing with status “{filter}” yet.</p>}
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────
export function InteractiveDemoMockup() {
  const [activeTab, setActiveTab] = useState("Overview");

  const navItem = (name: string, badge?: number) => {
    const active = activeTab === name;
    return (
      <button
        key={name}
        onClick={() => setActiveTab(name)}
        className={`flex w-full items-center rounded-lg px-2.5 py-1.5 text-left text-xs transition-all duration-200 ${
          active
            ? "bg-mint/10 font-semibold text-mint shadow-[inset_0_0_0_1px_rgba(140,245,195,0.22)]"
            : "text-muted hover:bg-white/[0.04] hover:text-ink"
        }`}
      >
        <span
          className={`mr-1.5 h-1.5 w-1.5 rounded-full transition-all ${active ? "bg-mint shadow-[0_0_8px_rgba(140,245,195,0.8)]" : "bg-transparent"}`}
          aria-hidden="true"
        />
        <span className="flex-1">{name}</span>
        {badge != null && <span className="text-[10px] font-bold text-amber">{badge}</span>}
      </button>
    );
  };

  const sectionLabel = (text: string) => (
    <p className="mb-1 mt-3 px-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-faint first:mt-0">{text}</p>
  );

  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="min-w-[760px]">
        {/* window bar */}
        <div className="flex items-center gap-3 rounded-t-2xl border border-b-0 border-line bg-[#0a1a12]/90 px-4 py-3 backdrop-blur-xl">
          <div className="flex gap-1.5" aria-hidden="true">
            <div className="h-2.5 w-2.5 rounded-full bg-rose/50" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/[0.14]" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/[0.14]" />
          </div>
          <div className="flex-1 rounded-md bg-white/[0.04] px-3 py-1 text-center text-xs tracking-wide text-faint">
            app.rankongeo.com/dashboard — playwright.dev
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-mint/10 px-2.5 py-1 text-[11px] font-medium text-mint shadow-[inset_0_0_0_1px_rgba(140,245,195,0.25)]">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_8px_rgba(140,245,195,0.8)]" aria-hidden="true" />
            Live demo · click around
          </div>
        </div>

        {/* app shell */}
        <div
          className="flex overflow-hidden rounded-b-2xl border border-t-0 border-line shadow-[0_40px_90px_-20px_rgba(0,0,0,0.8),0_0_120px_-30px_rgba(60,200,150,0.2)]"
          style={{ height: 580, background: "linear-gradient(180deg, rgba(13,29,22,.92), rgba(6,15,11,.96))" }}
        >
          {/* sidebar */}
          <div className="flex w-52 shrink-0 flex-col border-r border-line bg-black/25">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <circle cx="16" cy="16" r="6" stroke="#8cf5c3" strokeWidth="2.5" />
                  <circle cx="16" cy="16" r="12.5" stroke="#8cf5c3" strokeWidth="1.8" strokeDasharray="4 5" transform="rotate(-20 16 16)" />
                  <circle cx="26.5" cy="9" r="2.5" fill="#ffb469" />
                </svg>
                <span className="text-sm font-semibold text-ink">RankOnGeo</span>
              </div>
              <span className="text-[10px] font-medium text-faint">v2.0</span>
            </div>
            <div className="border-b border-line px-2.5 py-2">
              <div className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-2.5 py-2 shadow-[inset_0_0_0_1px_rgba(234,246,238,0.08)]">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-mint/15 text-xs font-bold text-mint">P</div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-ink">Playwright</p>
                  <p className="text-[9px] uppercase tracking-wider text-faint">Owner</p>
                </div>
                <span className="text-xs text-faint" aria-hidden="true">▾</span>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-0.5 overflow-hidden px-2 py-2">
              {navItem("Agent")}
              {sectionLabel("Measure")}
              {["Overview", "Engines", "Prompts", "Citations", "Competitors"].map((t) => navItem(t))}
              {sectionLabel("Create")}
              {navItem("Research", 20)}
              {navItem("Articles")}
              {navItem("Tasks")}
              {sectionLabel("Distribute")}
              {navItem("Publishing")}
            </div>
            <div className="flex items-center gap-2 border-t border-line px-3 py-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber/15 text-xs font-bold text-amber">U</div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-ink/90">playwright.dev</p>
                <p className="text-[9px] text-faint">Workspace</p>
              </div>
            </div>
          </div>

          {/* main panel */}
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex shrink-0 items-center gap-2 border-b border-line bg-black/15 px-5 py-2.5">
              <div className="flex items-center gap-1.5">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-mint/15 text-[9px] font-bold text-mint">P</div>
                <span className="text-xs text-faint">playwright.dev</span>
                <span className="text-xs text-faint/50" aria-hidden="true">/</span>
                <span className="text-xs font-medium text-ink">{activeTab}</span>
              </div>
              <div className="flex-1" />
              <div className="hidden items-center gap-1 lg:flex">
                {ENGINES.map((e) => (
                  <span key={e} className="cursor-default rounded-full px-2 py-0.5 text-[10px] font-medium text-muted shadow-[inset_0_0_0_1px_rgba(234,246,238,0.1)]">
                    {e}
                  </span>
                ))}
              </div>
              <button className="ml-1 rounded-lg bg-gradient-to-b from-[#a5f8d1] to-[#6fe9b2] px-3 py-1.5 text-xs font-semibold text-[#04241a] transition-all hover:brightness-105">
                + Re-scan
              </button>
            </div>

            <div key={activeTab} className="flex-1 overflow-y-auto">
              {activeTab === "Overview" && <OverviewContent />}
              {activeTab === "Engines" && <EnginesContent />}
              {activeTab === "Prompts" && <PromptsContent />}
              {activeTab === "Citations" && <CitationsContent />}
              {activeTab === "Competitors" && <CompetitorsContent />}
              {activeTab === "Research" && <ResearchContent />}
              {activeTab === "Articles" && <ArticlesContent />}
              {activeTab === "Tasks" && <TasksContent />}
              {(activeTab === "Publishing" || activeTab === "Agent") && (
                <div className="flex h-full items-center justify-center p-5">
                  <div className="text-center">
                    <p className="mb-2 font-serif text-xl italic text-muted">This one&apos;s for the real thing.</p>
                    <a href="/dashboard" className="text-sm font-medium text-mint hover:underline">
                      Open the full dashboard →
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
