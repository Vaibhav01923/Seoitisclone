"use client";
import { useState } from "react";

const ENG_COLORS: Record<string, string> = {
  ChatGPT: "#10a37f",
  Claude: "#d4673a",
  Gemini: "#4285f4",
  Perplexity: "#7c3aed",
  Grok: "#1a1a1a",
  "Google AI": "#c8372d",
};
const ENGINES = ["ChatGPT", "Claude", "Gemini", "Perplexity", "Grok", "Google AI"];

// ── OVERVIEW ──────────────────────────────────────────────────────
function OverviewContent() {
  const trend = [42, 46, 44, 50, 54, 52, 58, 62, 60, 65, 68, 65, 70, 72, 74];
  const max = Math.max(...trend), min = Math.min(...trend);
  const norm = trend.map((v) => ((v - min) / (max - min)) * 55);
  const poly = norm.map((v, i) => `${i * 27 + 8},${60 - v}`).join(" ");
  const lastX = 8 + 14 * 27, lastY = 60 - norm[14];
  return (
    <div className="p-5" style={{ animation: "fadeUp 0.2s ease forwards" }}>
      <h2 className="text-lg font-bold text-[#111] mb-0.5">Overview</h2>
      <p className="text-xs text-[#aaa] mb-4">playwright.dev · last scan Jun 24, 2026</p>
      <div className="grid grid-cols-4 gap-2.5 mb-4">
        {[
          { label: "COMPOSITE VISIBILITY", val: "72.4%", sub: "+8.1% vs last scan" },
          { label: "TOTAL MENTIONS", val: "3,241", sub: "+12% this week" },
          { label: "AVG POSITION", val: "1.8", sub: "across all engines" },
          { label: "SENTIMENT", val: "89%", sub: "positive responses" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-3.5 border border-[#e5e0da]">
            <p className="text-[9px] font-semibold text-[#bbb] tracking-wider mb-1 uppercase">{s.label}</p>
            <p className="text-xl font-black text-[#111]">{s.val}</p>
            <p className="text-[10px] text-[#aaa] mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        <div className="col-span-2 bg-white rounded-xl border border-[#e5e0da] p-4">
          <p className="text-xs font-semibold text-[#444] mb-2">Visibility trend — last 15 scans</p>
          <svg width="100%" height="65" viewBox="0 0 390 65">
            <polyline points={poly} fill="none" stroke="#c8372d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={lastX} cy={lastY} r="3.5" fill="#c8372d" />
          </svg>
        </div>
        <div className="bg-white rounded-xl border border-[#e5e0da] p-4">
          <p className="text-xs font-semibold text-[#444] mb-3">By engine</p>
          <div className="space-y-2">
            {[
              { name: "ChatGPT", pct: 80 }, { name: "Claude", pct: 74 }, { name: "Gemini", pct: 72 },
              { name: "Perplexity", pct: 69 }, { name: "Grok", pct: 65 }, { name: "Google AI", pct: 79 },
            ].map((e) => (
              <div key={e.name} className="flex items-center gap-1.5">
                <span className="text-[9px] text-[#888] w-14 text-right shrink-0 truncate">{e.name}</span>
                <div className="flex-1 h-1.5 bg-[#f0ece6] rounded-full">
                  <div className="h-full rounded-full" style={{ width: `${e.pct}%`, background: ENG_COLORS[e.name] }} />
                </div>
                <span className="text-[9px] text-[#888] w-6 shrink-0">{e.pct}%</span>
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
    <div className="p-5" style={{ animation: "fadeUp 0.2s ease forwards" }}>
      <h2 className="text-lg font-bold text-[#111] mb-4">Engines</h2>
      <div className="space-y-2.5">
        {scans.map((scan, i) => (
          <div key={i} className="bg-white rounded-xl border border-[#e5e0da] px-5 py-4 flex items-center gap-4">
            <span className="text-3xl font-black text-[#111] w-14 shrink-0">{scan.overall}%</span>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-[#444] mb-1">
                {ENGINES.map((e) => (
                  <span key={e}>
                    <span className="font-semibold">{e}:</span>{" "}
                    <span className={scan.data[e] > 0 ? "text-[#222]" : "text-[#bbb]"}>{scan.data[e]}%</span>
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-[#aaa]">{scan.time}</p>
            </div>
            <div className="flex gap-0.5 shrink-0">
              {ENGINES.map((e) => (
                <span key={e} style={{ color: ENG_COLORS[e], fontSize: 14 }}>●</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── PROMPTS ───────────────────────────────────────────────────────
const PROMPT_ENGINE_COLORS: Record<string, string> = { gpt: "#22c55e", gemini: "#3b82f6", google: "#ef4444" };
const PROMPT_TYPE_COLORS: Record<string, string> = { branded: "#a855f7", competitor: "#fbbf24", commercial: "#60a5fa" };

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
    <div className="p-5" style={{ animation: "fadeUp 0.2s ease forwards" }}>
      <h2 className="text-lg font-bold text-[#111] mb-0.5">Prompts</h2>
      <p className="text-xs text-[#aaa] mb-4">Manage your search prompts &amp; track visibility gaps</p>

      <div className="grid grid-cols-4 gap-2.5 mb-3">
        {[{ label: "PROMPTS", val: "20", sub: "tracked" }, { label: "WITH GAPS", val: "5", sub: "need articles" }, { label: "AVG VISIBILITY", val: "92%", sub: "across engines" }, { label: "ENGINES", val: "3", sub: "being tracked" }].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-[#e5e0da] p-3.5">
            <p className="text-[9px] font-semibold text-[#bbb] tracking-wider uppercase mb-1">{s.label}</p>
            <p className="text-xl font-black text-[#111]">{s.val}</p>
            <p className="text-[10px] text-[#aaa] mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#e5e0da] rounded-xl px-4 py-3.5 mb-3">
        <p className="text-xs font-semibold text-[#333] mb-2">20 of 25 prompts used</p>
        <div className="h-1.5 bg-[#f0ece6] rounded-full overflow-hidden flex gap-0.5 mb-2">
          <div className="h-full bg-blue-400 rounded-full" style={{ width: "36%" }} />
          <div className="h-full bg-amber-300 rounded-full" style={{ width: "24%" }} />
          <div className="h-full bg-purple-500 rounded-full" style={{ width: "20%" }} />
        </div>
        <div className="flex gap-4">
          {([["bg-blue-400", "Commercial", 9], ["bg-amber-300", "Competitor", 6], ["bg-purple-500", "Branded", 5]] as const).map(([color, label, count]) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
              <span className="text-[10px] text-[#888]">{label} ({count})</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 bg-white border border-[#e5e0da] rounded-lg px-3 py-2 mb-3">
        <svg className="w-3.5 h-3.5 text-[#bbb] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search prompts" className="text-xs flex-1 outline-none bg-transparent text-[#333] placeholder:text-[#bbb]" />
      </div>

      <div className="bg-white border border-[#e5e0da] rounded-xl overflow-hidden">
        <div className="grid grid-cols-[1fr_100px_90px_36px] gap-x-3 px-4 py-2.5 border-b border-[#f0ece6] bg-[#fafaf8]">
          <span className="text-[9px] font-semibold text-[#bbb] tracking-wider uppercase">Prompts</span>
          <span className="text-[9px] font-semibold text-[#bbb] tracking-wider uppercase">Engines</span>
          <span className="text-[9px] font-semibold text-[#bbb] tracking-wider uppercase">Competing with</span>
          <span className="text-[9px] font-semibold text-[#bbb] tracking-wider uppercase text-center">Type</span>
        </div>
        {filtered.map((r, i) => (
          <div key={i} className="grid grid-cols-[1fr_100px_90px_36px] gap-x-3 px-4 py-3 border-b border-[#f5f3f0] last:border-0 items-center">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative w-8 h-8 shrink-0">
                <svg viewBox="0 0 32 32" className="w-8 h-8 -rotate-90">
                  <circle cx="16" cy="16" r="13" fill="none" stroke="#f0ece6" strokeWidth="2.5"/>
                  <circle cx="16" cy="16" r="13" fill="none" stroke={r.vis >= 80 ? "#22c55e" : r.vis >= 50 ? "#f59e0b" : "#ef4444"} strokeWidth="2.5" strokeDasharray={`${r.vis * 0.817} 81.7`} strokeLinecap="round"/>
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[7px] font-bold text-[#444]">{r.vis}%</span>
              </div>
              <span className="text-xs text-[#222] font-medium truncate">{r.text}</span>
            </div>
            <div className="flex items-center gap-1.5">
              {(["gpt", "gemini", "google"] as const).map((e) => (
                <span key={e} className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: r.engines[e] ? PROMPT_ENGINE_COLORS[e] : "#e5e0da" }} />
              ))}
            </div>
            <span className="text-[11px] text-[#888] truncate">{r.competing}</span>
            <div className="flex justify-center">
              <div className="w-2 h-2 rounded-full" style={{ background: PROMPT_TYPE_COLORS[r.type] }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── CITATIONS ─────────────────────────────────────────────────────
type EngageDemoItem = { platform: "Reddit" | "LinkedIn"; color: string; icon: string; url: string; prompt: string };

const CITATION_DOMAINS = [
  { rank: 1, domain: "youtube.com", count: 16, color: "#FF0000", icon: "▶", engagement: false },
  { rank: 2, domain: "reddit.com", count: 11, color: "#FF4500", icon: "R", engagement: true },
  { rank: 3, domain: "medium.com", count: 6, color: "#111", icon: "M", engagement: false },
  { rank: 4, domain: "linkedin.com", count: 5, color: "#0A66C2", icon: "in", engagement: true },
  { rank: 5, domain: "github.com", count: 3, color: "#111", icon: "◆", engagement: false },
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

  const platforms: { name: "Reddit" | "LinkedIn"; color: string; icon: string; desc: string }[] = [
    { name: "Reddit", color: "#FF4500", icon: "R", desc: "Engage on Reddit threads to get cited in AI responses and boost your visibility." },
    { name: "LinkedIn", color: "#0A66C2", icon: "in", desc: "Engage on LinkedIn posts to get cited in AI responses and boost your visibility." },
  ];

  function openEngage(platform: "Reddit" | "LinkedIn", url: string, prompt: string) {
    const meta = platform === "Reddit" ? { color: "#FF4500", icon: "R" } : { color: "#0A66C2", icon: "in" };
    setEngageItem({ platform, url, prompt, ...meta });
    setEngageDraft("");
    setEngageSubmitted(false);
  }

  return (
    <div className="relative p-5" style={{ animation: "fadeUp 0.2s ease forwards" }}>
      <h2 className="text-lg font-bold text-[#111] mb-0.5">Citations</h2>
      <p className="text-xs text-[#aaa] mb-4">Discover the sources AI uses in its responses</p>

      <p className="text-xs font-semibold text-[#333] mb-0.5">Engagement Platforms</p>
      <p className="text-[11px] text-[#aaa] mb-3">Engage on these platforms to increase your AI visibility</p>
      <div className="grid grid-cols-2 gap-2.5 mb-4">
        {platforms.map((p) => {
          const firstInstance = CITATION_INSTANCES[p.name === "Reddit" ? "reddit.com" : "linkedin.com"][0];
          return (
            <div key={p.name} className="bg-white border-2 rounded-xl p-3.5" style={{ borderColor: `${p.color}33` }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-white text-[11px] font-bold" style={{ background: p.color }}>{p.icon}</div>
                <span className="text-sm font-semibold text-[#111]">{p.name}</span>
                <span className="ml-auto text-[9px] font-bold bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded-full border border-teal-100 whitespace-nowrap">High impact</span>
              </div>
              <p className="text-[10px] text-[#999] mb-2.5 leading-snug">{p.desc}</p>
              <button
                onClick={() => openEngage(p.name, firstInstance.url, firstInstance.prompt)}
                className="w-full text-xs font-semibold text-white rounded-lg py-1.5 hover:opacity-90 transition-opacity"
                style={{ background: p.color }}
              >
                Engage
              </button>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-[#e5e0da] rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-[#f0ece6] flex items-center justify-between">
          <p className="text-xs font-semibold text-[#333]">Top Cited Domains</p>
          <p className="text-[11px] text-[#aaa]">121 domains</p>
        </div>
        <div className="grid grid-cols-[40px_1fr_70px_150px] gap-x-3 px-4 py-2 text-[9px] font-semibold text-[#bbb] tracking-wider uppercase border-b border-[#f0ece6]">
          <span>Rank</span><span>Domain</span><span className="text-right">Citations</span><span className="text-right">Details</span>
        </div>
        {CITATION_DOMAINS.map((d) => {
          const isExpanded = expandedDomain === d.domain;
          const instances = CITATION_INSTANCES[d.domain] ?? [];
          return (
            <div key={d.domain} className="border-b border-[#f5f3f0] last:border-0">
              <button
                onClick={() => setExpandedDomain(isExpanded ? null : d.domain)}
                className="w-full grid grid-cols-[40px_1fr_70px_150px] gap-x-3 px-4 py-2.5 items-center hover:bg-[#fafaf8] transition-colors text-left"
              >
                <span className="text-[11px] text-[#999] font-medium">#{d.rank}</span>
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold text-white shrink-0" style={{ background: d.color }}>{d.icon}</div>
                  <span className="text-xs text-[#222] font-medium truncate">{d.domain}</span>
                </div>
                <span className="text-xs font-semibold text-[#111] text-right">{d.count}</span>
                <div className="flex items-center justify-end gap-1.5">
                  <span className="text-[11px] text-right font-medium text-[#c8372d]">
                    {d.engagement ? "Engagement opportunities" : "Learn more ↗"}
                  </span>
                  <svg className={`w-3 h-3 text-[#bbb] shrink-0 transition-transform ${isExpanded ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                </div>
              </button>
              {isExpanded && (
                <div className="bg-[#fafaf8] border-t border-[#f0ece6] px-4 py-2">
                  {instances.map((inst, i) => (
                    <div key={i} className="flex items-center gap-2 py-1.5 border-b border-[#f0ece6] last:border-0">
                      <a href={`https://${inst.url}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-[11px] text-blue-600 hover:underline truncate flex-1 min-w-0">{inst.url}</a>
                      <span className="text-[9px] font-medium text-[#888] bg-white border border-[#e5e0da] rounded px-1.5 py-0.5 shrink-0">{inst.source}</span>
                      <span className="text-[10px] text-[#bbb] italic truncate w-28 shrink-0 hidden sm:block">{inst.prompt}</span>
                      {d.engagement && (
                        <button
                          onClick={() => openEngage(d.domain === "reddit.com" ? "Reddit" : "LinkedIn", inst.url, inst.prompt)}
                          className="text-[10px] font-semibold text-white rounded-md px-2 py-1 shrink-0"
                          style={{ background: d.color }}
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

      {/* Engage overlay */}
      {engageItem && (
        <div className="absolute inset-0 z-20 flex rounded-b-xl overflow-hidden">
          <div className="flex-1 bg-black/30" onClick={() => setEngageItem(null)} />
          <div className="w-[280px] h-full bg-white shadow-2xl flex flex-col border-l border-[#e5e0da]">
            <div className="px-4 py-3 border-b border-[#f0ece6] flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-white text-[11px] font-bold" style={{ background: engageItem.color }}>{engageItem.icon}</div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#111]">Engage on {engageItem.platform}</p>
                <p className="text-[10px] text-[#aaa] truncate">Draft a reply to influence this citation</p>
              </div>
              <button onClick={() => setEngageItem(null)} className="ml-auto text-[#bbb] hover:text-[#666] shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="px-4 py-3 border-b border-[#f0ece6] bg-[#fafaf8]">
              <p className="text-[9px] font-semibold text-[#bbb] uppercase tracking-widest mb-1.5">Thread</p>
              <p className="text-[11px] text-blue-600 break-all leading-relaxed">{engageItem.url}</p>
              <p className="text-[10px] text-[#aaa] italic mt-1.5 truncate">for prompt: &ldquo;{engageItem.prompt}&rdquo;</p>
            </div>

            <div className="flex-1 flex flex-col px-4 py-3 gap-2.5 overflow-y-auto">
              {engageSubmitted ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-3 py-6 text-center">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <p className="text-xs font-semibold text-[#111]">Task submitted!</p>
                  <p className="text-[10px] text-[#999]">Your reply is queued for review.</p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] font-semibold text-[#bbb] uppercase tracking-widest">Reply draft</p>
                    <button
                      onClick={() => setEngageDraft(engageItem.platform === "Reddit" ? REDDIT_REPLY : LINKEDIN_REPLY)}
                      className="text-[10px] font-medium flex items-center gap-1"
                      style={{ color: engageItem.color }}
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      AI suggest
                    </button>
                  </div>
                  <textarea
                    value={engageDraft}
                    onChange={(e) => setEngageDraft(e.target.value)}
                    placeholder="Write your reply, or click AI suggest…"
                    rows={5}
                    className="w-full text-[11px] text-[#333] placeholder:text-[#bbb] border border-[#e5e0da] rounded-lg p-2.5 resize-none outline-none"
                  />
                </>
              )}
            </div>

            {!engageSubmitted && (
              <div className="px-4 py-3 border-t border-[#f0ece6]">
                <button
                  onClick={() => setEngageSubmitted(true)}
                  disabled={!engageDraft.trim()}
                  className="w-full text-xs font-semibold text-white rounded-lg py-2 disabled:opacity-40 transition-opacity"
                  style={{ background: engageItem.color }}
                >
                  Submit reply
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
    <div className="p-5" style={{ animation: "fadeUp 0.2s ease forwards" }}>
      <div className="bg-white rounded-xl border border-[#e5e0da] p-5">
        <h2 className="text-lg font-bold text-[#111] mb-0.5">Competitors</h2>
        <p className="text-xs text-[#aaa] mb-5">Share of voice across AI engines</p>
        <div className="space-y-3">
          {data.map((d) => (
            <div key={d.name} className="flex items-center gap-4">
              <span className={`w-20 text-sm text-right shrink-0 ${d.isMe ? "font-bold text-[#111]" : "text-[#666]"}`}>{d.name}</span>
              <div className="flex-1 h-2.5 bg-[#f0ece6] rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${d.pct}%`, background: d.isMe ? "#c8372d" : "#ccc" }} />
              </div>
              <span className={`w-9 text-sm text-right shrink-0 ${d.isMe ? "font-bold text-[#c8372d]" : "text-[#888]"}`}>{d.pct}%</span>
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
    <div className="p-5" style={{ animation: "fadeUp 0.2s ease forwards" }}>
      <h2 className="text-lg font-bold text-[#111] mb-0.5">Research</h2>
      <p className="text-xs text-[#aaa] mb-4">20 queries where Playwright isn&apos;t mentioned</p>
      <div className="space-y-2.5">
        {gaps.map((g, i) => (
          <div key={i} className="bg-white rounded-xl border border-[#e5e0da] p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#111] mb-2">{g.query}</p>
                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                  {g.absent.map((e) => (
                    <span key={e} className="text-[11px] px-2 py-0.5 rounded-full border border-[#c8372d]/30 text-[#c8372d] font-medium">Not in {e}</span>
                  ))}
                  {g.instead && <span className="text-[11px] text-[#888]">· {g.instead} appears instead</span>}
                </div>
                <p className="text-[11px] text-[#aaa]">Publishing an article that answers this query will teach AI engines to recommend Playwright for it.</p>
              </div>
              {g.published ? (
                <div className="flex items-center gap-2 shrink-0 mt-0.5">
                  <span className="text-xs font-semibold text-green-600">Published</span>
                  <span className="text-xs text-[#444] underline cursor-pointer">View article ↗</span>
                </div>
              ) : (
                <button className="text-xs font-semibold bg-[#111] text-white px-3 py-1.5 rounded-lg shrink-0">Write article →</button>
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
    { platform: "LinkedIn", color: "#0A66C2", status: "Pending", url: "linkedin.com/posts/…", reply: "We moved our E2E suite from Selenium to Playwright and cut CI time in half.", upvotes: 0, engine: "Perplexity" },
    { platform: "Reddit", color: "#FF4500", status: "Pending", url: "reddit.com/r/webdev/comments/…", reply: "If cross-browser flakiness is the issue, Playwright's built-in retries handle it better than Selenium out of the box.", upvotes: 10, engine: "Gemini" },
  ];
  const pending = tasks.filter((t) => t.status === "Pending").length;
  return (
    <div className="p-5" style={{ animation: "fadeUp 0.2s ease forwards" }}>
      <h2 className="text-lg font-bold text-[#111] mb-0.5">Tasks</h2>
      <p className="text-xs text-[#aaa] mb-4">Replies and upvote orders submitted from Citations · {pending} pending</p>
      <div className="space-y-2.5">
        {tasks.map((t, i) => (
          <div key={i} className="bg-white rounded-xl border border-[#e5e0da] p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white text-[10px] font-bold" style={{ background: t.color }}>
                {t.platform === "LinkedIn" ? "in" : "R"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${t.status === "Completed" ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>{t.status}</span>
                  <span className="text-[10px] text-[#aaa]">{t.engine}</span>
                  <span className="text-[10px] text-[#ccc] ml-auto">{t.url}</span>
                </div>
                <p className="text-xs text-[#444] bg-[#faf8f5] border border-[#f0ece6] rounded-lg px-3 py-2 mb-1.5">{t.reply}</p>
                <p className="text-[10px] text-[#aaa]">{t.upvotes > 0 ? `${t.upvotes} upvotes ordered` : "No upvotes ordered"}</p>
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
    <div className="p-5" style={{ animation: "fadeUp 0.2s ease forwards" }}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-[#111] mb-0.5">Articles</h2>
          <p className="text-xs text-[#aaa]">{articles.length} pieces · 1 published</p>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-xs text-[#aaa]">From research</span>
          <button className="text-xs font-semibold bg-[#111] text-white px-3 py-1.5 rounded-lg">+ New article</button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2.5 mb-3">
        {[{ label: "PUBLISHED", val: "1", sub: "+0 this month" }, { label: "IN DRAFT", val: "2", sub: "awaiting review" }, { label: "AVG SEO SCORE", val: "72", sub: "1 scored" }, { label: "LAST PUBLISHED", val: "Jun 24", sub: "" }].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-[#e5e0da] p-3.5">
            <p className="text-[9px] font-semibold text-[#bbb] tracking-wider uppercase mb-1">{s.label}</p>
            <p className="text-lg font-black text-[#111] leading-tight">{s.val}</p>
            {s.sub && <p className="text-[10px] text-[#aaa] mt-0.5">{s.sub}</p>}
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-[#e5e0da]">
        <div className="p-3 border-b border-[#f0ece6] flex gap-1.5">
          {["All", "Draft", "Review", "Scheduled", "Published"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${filter === f ? "bg-[#c8372d] text-white" : "text-[#666] hover:bg-[#f5f3f0]"}`}>{f}</button>
          ))}
        </div>
        <div className="px-4 py-2 flex gap-3 text-[9px] font-semibold text-[#bbb] tracking-wider uppercase border-b border-[#f0ece6]">
          <span className="flex-1">Title</span>
          <span className="w-20 text-center">Status</span>
          <span className="w-10 text-center">SEO</span>
          <span className="w-14 text-right">Updated</span>
        </div>
        {filtered.map((a, i) => (
          <div key={i} className="px-4 py-3 flex gap-3 items-start border-b border-[#f5f3f0] last:border-0">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[#222] leading-snug">{a.title}</p>
              <p className="text-[10px] text-[#bbb] mt-0.5 truncate">{a.prompt}</p>
            </div>
            <span className={`w-20 text-center text-xs font-semibold mt-0.5 ${a.status === "Published" ? "text-green-600" : "text-[#888]"}`}>{a.status}</span>
            <span className="w-10 text-center text-xs text-[#888] mt-0.5">{a.seo}</span>
            <span className="w-14 text-right text-xs text-[#aaa] mt-0.5">{a.updated}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────
export function InteractiveDemoMockup() {
  const [activeTab, setActiveTab] = useState("Engines");

  const navItem = (name: string, badge?: number) => (
    <button
      key={name}
      onClick={() => setActiveTab(name)}
      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center transition-colors ${
        activeTab === name
          ? "bg-white border border-[#ddd8d0] shadow-sm font-semibold text-[#111]"
          : "text-[#666] hover:bg-white/60"
      }`}
    >
      <span className={`text-[8px] mr-1.5 transition-opacity ${activeTab === name ? "text-[#c8372d]" : "opacity-0"}`}>●</span>
      <span className="flex-1">{name}</span>
      {badge != null && <span className="text-[10px] text-[#c8372d] font-bold">{badge}</span>}
    </button>
  );

  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="min-w-[760px]">
        {/* Browser chrome */}
        <div className="bg-[#1a1a1a] rounded-t-xl px-4 py-2.5 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 bg-[#2a2a2a] rounded-md px-3 py-1 text-xs text-center text-[#777] font-mono">
            app.rankongeo.com/dashboard — playwright.dev
          </div>
          <div className="bg-brand text-white text-[11px] px-2.5 py-1 rounded-md font-medium">Live demo</div>
        </div>

        {/* App shell */}
        <div className="flex overflow-hidden rounded-b-xl border border-[#ddd8d0]" style={{ height: 580, background: "#ede8df" }}>
          {/* Sidebar */}
          <div className="w-52 shrink-0 flex flex-col border-r border-[#ddd8d0]" style={{ background: "#ede8df" }}>
            {/* Logo row */}
            <div className="px-4 py-2.5 border-b border-[#ddd8d0] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#c8372d" />
                  <circle cx="12" cy="9" r="2.5" fill="white" />
                </svg>
                <span className="text-sm font-bold text-[#111]">RankOnGeo</span>
              </div>
              <span className="text-[10px] text-[#aaa] font-medium">v2.0</span>
            </div>
            {/* Brand selector */}
            <div className="px-2.5 py-2 border-b border-[#ddd8d0]">
              <div className="flex items-center gap-2 bg-white rounded-lg px-2.5 py-2 border border-[#ddd8d0]">
                <div className="w-7 h-7 bg-[#111] rounded-md flex items-center justify-center text-white text-xs font-bold shrink-0">P</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#111]">Playwright</p>
                  <p className="text-[9px] text-[#aaa] uppercase tracking-wider">OWNER</p>
                </div>
                <span className="text-[#aaa] text-xs">▾</span>
              </div>
            </div>
            {/* Nav */}
            <div className="flex-1 overflow-hidden py-2 px-2 flex flex-col gap-0.5">
              {navItem("Agent")}
              <p className="text-[9px] font-semibold text-[#aaa] tracking-widest uppercase px-2 mt-2.5 mb-1">Measure</p>
              {["Overview", "Engines", "Prompts", "Citations", "Competitors"].map((t) => navItem(t))}
              <p className="text-[9px] font-semibold text-[#aaa] tracking-widest uppercase px-2 mt-3 mb-1">Create</p>
              {navItem("Research", 20)}
              {navItem("Articles")}
              {navItem("Tasks")}
              <p className="text-[9px] font-semibold text-[#aaa] tracking-widest uppercase px-2 mt-3 mb-1">Distribute</p>
              {navItem("Publishing")}
            </div>
            {/* Bottom user */}
            <div className="px-3 py-2.5 border-t border-[#ddd8d0] flex items-center gap-2">
              <div className="w-7 h-7 bg-[#c8372d] rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">U</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[#333] truncate">playwright.dev</p>
                <p className="text-[9px] text-[#aaa]">Workspace</p>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#aaa]" aria-hidden="true">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Main panel */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-white border-b border-[#e5e0da] px-5 py-2.5 flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 bg-[#111] rounded flex items-center justify-center text-white text-[9px] font-bold">P</div>
                <span className="text-xs text-[#aaa]">playwright.dev</span>
                <span className="text-[#ddd] text-xs">/</span>
                <span className="text-xs font-medium text-[#333]">{activeTab}</span>
              </div>
              <div className="flex-1" />
              <div className="flex items-center gap-1">
                {ENGINES.map((e) => (
                  <span key={e} className="text-[10px] px-2 py-0.5 rounded-full border border-[#c8372d]/40 text-[#c8372d] font-medium cursor-default">
                    {e}
                  </span>
                ))}
              </div>
              <button className="text-xs font-semibold bg-[#111] text-white px-3 py-1.5 rounded-lg ml-1">+ Re-scan</button>
            </div>

            {/* Content */}
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
                <div className="p-5 flex items-center justify-center h-full">
                  <p className="text-sm text-[#aaa]">Available in the full dashboard</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
