import type { Metadata } from "next";
import { RotatingWord } from "./_components/RotatingWord";
import { DomainForm } from "./_components/DomainForm";
import { PricingSection } from "./_components/PricingSection";
import { FAQSection } from "./_components/FAQSection";
import { MobileNav } from "./_components/MobileNav";

export const metadata: Metadata = {
  title: "RankOnGeo — Track Your Brand in AI Search",
  description:
    "See how ChatGPT, Claude, Gemini, Perplexity, Grok and AI Overviews respond about your brand. Close the gap with research, articles, and publishing.",
};

function LogoIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect width="28" height="28" rx="7" fill="#c8372d" />
      <path
        d="M14 5C10.96 5 8.5 7.46 8.5 10.5c0 4.63 5.5 12.5 5.5 12.5s5.5-7.87 5.5-12.5C19.5 7.46 17.04 5 14 5z"
        fill="white"
      />
      <circle cx="14" cy="10.5" r="2.2" fill="#c8372d" />
    </svg>
  );
}

function DashboardMockup() {
  return (
    <div className="relative mx-auto max-w-5xl overflow-x-auto" aria-hidden="true">
      <div className="min-w-190">
      {/* Browser chrome */}
      <div className="bg-[#1a1a1a] rounded-t-xl px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1.5" aria-hidden="true">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 bg-[#2a2a2a] rounded-md px-3 py-1 text-xs text-center text-[#888] font-mono">
          app.rankongeo.com/overview
        </div>
        <div className="bg-brand text-white text-xs px-3 py-1 rounded-md font-medium">
          Live demo · click around
        </div>
      </div>

      {/* App shell */}
      <div
        className="bg-white border border-[#e5e0da] rounded-b-xl overflow-hidden flex shadow-2xl"
        style={{ height: 560 }}
        role="img"
        aria-label="RankOnGeo dashboard preview"
      >
        {/* Sidebar */}
        <div className="w-56 bg-[#f8f9fb] border-r border-[#eaecf0] flex flex-col shrink-0">
          <div className="px-4 py-3 border-b border-[#eaecf0] flex items-center gap-2">
            <LogoIcon size={22} />
            <span className="font-bold text-sm tracking-tight">
              RankOn<span className="text-brand">Geo</span>
            </span>
            <span className="ml-auto text-[10px] bg-[#eaecf0] text-[#888] px-1.5 py-0.5 rounded">v2.0</span>
          </div>
          <div className="px-3 py-2 border-b border-[#eaecf0]">
            <div className="flex items-center gap-2 bg-white border border-[#e5e7eb] rounded-lg px-2.5 py-2">
              <div className="w-6 h-6 bg-brand rounded flex items-center justify-center text-white text-[10px] font-bold">
                A
              </div>
              <div>
                <div className="text-xs font-semibold text-[#111]">Acme Corp</div>
                <div className="text-[10px] text-[#888] uppercase tracking-wide">Owner</div>
              </div>
              <svg className="ml-auto w-3 h-3 text-[#aaa]" fill="none" viewBox="0 0 12 12">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-2 py-2 space-y-4 text-xs">
            <div>
              <div className="px-2 py-1 text-[10px] uppercase tracking-widest text-[#bbb] font-medium">Measure</div>
              {(
                [["Overview", true], ["Engines", false], ["Prompts", false], ["Citations", false], ["Competitors", false]] as [string, boolean][]
              ).map(([label, active]) => (
                <div
                  key={label}
                  className={`flex items-center gap-2 px-2 py-1.5 rounded-md ${
                    active ? "bg-white border border-[#e5e7eb] text-[#111] font-medium shadow-sm" : "text-[#666]"
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${active ? "bg-brand" : "bg-transparent"}`} />
                  {label}
                </div>
              ))}
            </div>
            <div>
              <div className="px-2 py-1 text-[10px] uppercase tracking-widest text-[#bbb] font-medium">Create</div>
              {["Research", "Keywords", "Articles"].map((label) => (
                <div key={label} className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[#666]">
                  <div className="w-1.5 h-1.5 rounded-full bg-transparent" />
                  {label}
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-[#eaecf0] px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-brand rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                AC
              </div>
              <div>
                <div className="text-[10px] font-medium text-[#111]">john@acmecorp.com</div>
                <div className="text-[10px] text-[#888]">Workspace</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <div className="border-b border-[#eaecf0] px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-5 h-5 bg-brand rounded flex items-center justify-center text-white text-[9px] font-bold">A</div>
              <span className="text-[#888]">acmecorp.com</span>
              <span className="text-[#ccc]">/</span>
              <span className="font-semibold text-[#111]">Overview</span>
            </div>
            <button className="bg-[#111] text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1">
              <span>+</span> New prompt
            </button>
          </div>

          <div className="px-5 py-4">
            <h2 className="text-lg font-bold text-[#111] mb-0.5">Overview</h2>
            <p className="text-xs text-[#888] mb-4">Visibility up 12.4 pts this window</p>

            <div className="grid grid-cols-4 gap-3 mb-4">
              {[
                { label: "COMPOSITE VISIBILITY", value: "60.6%", sub: "+12.4 vs start" },
                { label: "MENTIONS", value: "2,841", sub: "+78.0% mention rate" },
                { label: "AVG POSITION", value: "2.1", sub: "lower is better" },
                { label: "SENTIMENT SCORE", value: "84", sub: "positive" },
              ].map((s) => (
                <div key={s.label} className="border border-[#eaecf0] rounded-xl p-3 bg-white">
                  <div className="text-[9px] uppercase tracking-widest text-[#aaa] font-medium mb-1">{s.label}</div>
                  <div className="text-2xl font-bold text-[#111] mb-0.5">{s.value}</div>
                  <div className="text-[10px] text-brand font-medium">{s.sub}</div>
                  <div className="mt-2 h-6 flex items-end gap-0.5">
                    {[20, 22, 24, 22, 25, 28, 26, 30, 32, 35, 38, 40].map((h, i) => (
                      <div key={i} className="flex-1 bg-red-100 rounded-sm" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="border border-[#eaecf0] rounded-xl p-3 bg-white">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-[#111]">Composite visibility</span>
                  <span className="text-[10px] text-[#aaa]">· last 30 days</span>
                  <div className="ml-auto flex items-center gap-3 text-[10px]">
                    <span className="flex items-center gap-1"><span className="inline-block w-5 h-0.5 bg-brand" />You: 60.6%</span>
                    <span className="flex items-center gap-1"><span className="inline-block w-5 h-0.5 bg-[#888]" />Obsidian</span>
                  </div>
                </div>
                <svg viewBox="0 0 300 80" className="w-full" style={{ height: 80 }}>
                  <polyline points="0,65 25,60 50,55 75,52 100,50 125,45 150,42 175,38 200,35 225,30 250,28 275,25 300,22" fill="none" stroke="#c8372d" strokeWidth="2" />
                  <polyline points="0,70 25,68 50,65 75,62 100,60 125,58 150,57 175,55 200,54 225,53 250,52 275,52 300,52" fill="none" stroke="#888" strokeWidth="1.5" strokeDasharray="4,3" />
                </svg>
              </div>

              <div className="border border-[#eaecf0] rounded-xl p-3 bg-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-[#111]">Rankings</span>
                  <span className="text-[10px] text-[#aaa]">· brands by visibility</span>
                </div>
                <table className="w-full text-[10px]">
                  <thead>
                    <tr className="text-[#aaa] uppercase tracking-wide">
                      <th className="text-left py-0.5 font-medium w-5">#</th>
                      <th className="text-left py-0.5 font-medium">Brand</th>
                      <th className="text-right py-0.5 font-medium">Vis.</th>
                      <th className="text-right py-0.5 font-medium">SOV</th>
                      <th className="text-right py-0.5 font-medium">Sent.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { rank: "01", name: "Acme Corp", you: true, vis: "60.6", sov: "31.0%", sent: 84, color: "#111" },
                      { rank: "02", name: "Obsidian", you: false, vis: "54.2", sov: "21.0%", sent: 70, color: "#555" },
                      { rank: "03", name: "Coda", you: false, vis: "47.5", sov: "16.0%", sent: 61, color: "#e85d04" },
                      { rank: "04", name: "ClickUp", you: false, vis: "41.0", sov: "14.0%", sent: 56, color: "#c8372d" },
                      { rank: "05", name: "Confluence", you: false, vis: "33.8", sov: "10.0%", sent: 48, color: "#2684ff" },
                    ].map((r) => (
                      <tr key={r.rank} className={r.you ? "bg-red-50" : ""}>
                        <td className="py-0.5 text-[#aaa]">{r.rank}</td>
                        <td className="py-0.5">
                          <div className="flex items-center gap-1">
                            <div className="w-4 h-4 rounded flex items-center justify-center text-white text-[8px] font-bold shrink-0" style={{ background: r.color }}>
                              {r.name[0]}
                            </div>
                            <span className={r.you ? "font-semibold text-[#111]" : "text-[#555]"}>{r.name}</span>
                            {r.you && <span className="bg-brand text-white text-[8px] px-1 rounded font-bold">YOU</span>}
                          </div>
                        </td>
                        <td className="py-0.5 text-right font-medium text-[#111]">{r.vis}</td>
                        <td className="py-0.5 text-right text-[#888]">{r.sov}</td>
                        <td className="py-0.5 text-right">
                          <span className={`font-bold ${r.sent >= 80 ? "text-green-600" : r.sent >= 60 ? "text-yellow-600" : "text-red-500"}`}>
                            {r.sent}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#111]" style={{ fontFamily: "var(--font-geist-sans, system-ui, sans-serif)" }}>

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-brand focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>

      {/* NAV */}
      <nav className="relative border-b border-gray-100" aria-label="Main navigation">
        <div className="flex items-center justify-between px-8 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2.5">
            <LogoIcon />
            <span className="text-xl font-bold tracking-tight">RankOn<span className="text-brand">Geo</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-[#4b5563]">
            <a href="#platform" className="py-2 hover:text-[#111] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded">Platform</a>
            <a href="#" className="py-2 hover:text-[#111] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded">Tools</a>
            <a href="#" className="py-2 hover:text-[#111] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded">Guides</a>
            <a href="#" className="py-2 hover:text-[#111] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded">Blog</a>
            <a href="#pricing" className="py-2 hover:text-[#111] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded">Pricing</a>
          </div>
          <div className="flex items-center gap-2">
            <MobileNav />
            <a
              href="/dashboard"
              className="bg-brand hover:bg-brand-dark text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
            >
              Dashboard <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </nav>

      <main id="main-content">
        {/* HERO */}
        <section
          className="relative overflow-hidden"
          style={{ background: "radial-gradient(ellipse at 50% -10%, rgba(200,55,45,0.18) 0%, transparent 55%), #0d0d0d" }}
        >
          <div className="relative max-w-4xl mx-auto px-8 pt-16 pb-20 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 border border-white/15 bg-white/8 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs font-medium tracking-wide mb-10">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand animate-pulse motion-reduce:animate-none" aria-hidden="true" />
                <span className="uppercase tracking-widest text-brand font-semibold">Up to 7 engines</span>
              </span>
              <span className="text-white/30" aria-hidden="true">·</span>
              <span className="uppercase tracking-widest text-white/70">Daily updates</span>
              <span className="text-white/30 ml-1" aria-hidden="true">→</span>
            </div>

            {/* Headline */}
            <h1
              className="leading-[1.05] font-black tracking-tight mb-8 text-white"
              style={{ fontSize: "clamp(2.5rem, 10vw, 5rem)", letterSpacing: "-0.03em", textWrap: "balance" } as React.CSSProperties}
            >
              Be the answer<br />
              in <RotatingWord /> AI&nbsp;search.
            </h1>

            {/* Subtext */}
            <p className="text-lg text-white/75 mb-10 max-w-2xl mx-auto leading-relaxed">
              Track how{" "}
              <strong className="text-white/95">ChatGPT, Claude, Gemini, Perplexity, Grok, AI Overviews</strong>{" "}
              answer about your brand — then close the gap with research, articles, and publishing.{" "}
              <strong className="text-white/95">One pipeline.</strong>
            </p>

            {/* Form */}
            <div className="max-w-xl mx-auto mb-5">
              <DomainForm variant="hero" />
            </div>

            <p className="text-xs text-white/55 tracking-wide">
              <span className="uppercase font-semibold text-white/65">Free analysis</span>
              {" · "}Paid plans track up to 7 engines{" · "}Results in ~60s
            </p>
          </div>
        </section>

        {/* DASHBOARD MOCKUP */}
        <section className="px-8 pb-20 bg-[#0d0d0d] pt-4">
          <DashboardMockup />
        </section>

        {/* ENGINE STRIP */}
        <section className="border-y border-gray-100 bg-[#f4f6ff] py-6 px-8">
          <p className="text-center text-xs uppercase tracking-widest text-[#6b7280] font-medium mb-5">
            Tracking visibility across every major AI engine
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {[
              { name: "ChatGPT", bg: "#10a37f" },
              { name: "Claude", bg: "#d4673a" },
              { name: "Perplexity", bg: "#1c1c1c" },
              { name: "Gemini", bg: "#4285f4" },
              { name: "Grok", bg: "#111" },
              { name: "AI Overviews", bg: "#4285f4" },
              { name: "AI Mode", bg: "#8b5cf6" },
            ].map((e) => (
              <div key={e.name} className="flex items-center gap-2 text-sm text-[#374151] font-medium">
                <div className="w-5 h-5 rounded-md flex items-center justify-center text-white text-[9px] font-bold" style={{ background: e.bg }} aria-hidden="true">
                  {e.name[0]}
                </div>
                {e.name}
              </div>
            ))}
          </div>
        </section>

        {/* PLATFORM */}
        <section id="platform" className="max-w-6xl mx-auto px-8 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight mb-4" style={{ textWrap: "balance" } as React.CSSProperties}>
              One pipeline. Four instruments.
            </h2>
            <p className="text-[#4b5563] max-w-xl mx-auto">
              Most tools tell you that you&apos;re not visible. RankOnGeo closes the loop: measure, research, write, publish, re-measure. Automatically.
            </p>
          </div>

          <div className="flex gap-2 justify-center mb-16 flex-wrap">
            {[["01", "Visibility"], ["02", "Research"], ["03", "Generation"], ["04", "Publishing"]].map(([num, label]) => (
              <div key={num} className="flex items-center gap-2 border border-gray-200 bg-white rounded-full px-4 py-1.5 text-sm">
                <span className="text-[#6b7280] text-xs font-mono">{num}</span>
                <span className="font-medium text-[#111]">{label}</span>
              </div>
            ))}
          </div>

          <div className="space-y-24">
            {/* 01 Visibility */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-mono text-[#6b7280]">01</span>
                  <span className="text-xs font-semibold text-[#374151]">Visibility</span>
                </div>
                <h3 className="text-3xl font-black tracking-tight mb-4" style={{ textWrap: "balance" } as React.CSSProperties}>
                  See your brand the way the model sees it.
                </h3>
                <p className="text-[#4b5563] mb-6 leading-relaxed">
                  Daily visibility updates across ChatGPT, Perplexity, AI Overviews, Claude, Gemini, AI Mode, and Grok depending on plan.
                  Rotating coverage keeps your composite score, triggering prompts, and competitor movement fresh.
                </p>
                <ul className="space-y-2">
                  {[
                    "Up to 7 engines with daily visibility updates — incl. browse + search modes",
                    "Composite visibility, sentiment, mention density, position",
                    "Side-by-side competitor differential",
                    "Source-of-citation breakdown (UGC, Editorial, Forum, Corporate)",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#374151]">
                      <span className="text-brand mt-0.5 shrink-0" aria-hidden="true">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className="text-[10px] uppercase tracking-widest text-[#6b7280] font-medium mb-3">Industry ranking · note-taking</div>
                <div className="text-[10px] text-[#6b7280] mb-3">5 brands · ChatGPT · last 30 days</div>
                <div className="space-y-2">
                  {[
                    { rank: 1, domain: "acmecorp.com", you: true, pct: 74, delta: "+4.2" },
                    { rank: 2, domain: "evernote.com", pct: 52, delta: "-1.1" },
                    { rank: 3, domain: "obsidian.md", pct: 48, delta: "+0.3" },
                    { rank: 4, domain: "roamresearch.com", pct: 31, delta: "-2.4" },
                    { rank: 5, domain: "logseq.com", pct: 24, delta: "+0.8" },
                  ].map((r) => (
                    <div key={r.domain} className={`flex items-center gap-3 rounded-lg px-2 py-1.5 ${r.you ? "bg-red-50" : ""}`}>
                      <span className="text-[10px] text-[#6b7280] w-4">{r.rank}</span>
                      <span className={`text-xs flex-1 ${r.you ? "font-semibold" : "text-[#555]"}`}>
                        {r.domain}
                        {r.you && <span className="ml-1.5 bg-brand text-white text-[9px] px-1 rounded font-bold">YOU</span>}
                      </span>
                      <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${r.you ? "bg-brand" : "bg-gray-300"}`} style={{ width: `${r.pct}%` }} />
                      </div>
                      <span className="text-xs font-medium text-[#111] w-6 text-right">{r.pct}%</span>
                      <span className={`text-[10px] w-8 text-right ${r.delta.startsWith("+") ? "text-green-600" : "text-red-500"}`}>{r.delta}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-1.5 mt-3 flex-wrap">
                  {["ChatGPT", "Claude", "Gemini", "Perplexity", "Grok", "+ browse mode"].map((e) => (
                    <span key={e} className="text-[10px] bg-gray-100 text-[#555] px-2 py-0.5 rounded-full">{e}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* 02 Research */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm order-2 md:order-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] text-[#6b7280]">note-taking · AI workflow</span>
                  <span className="ml-auto text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Generative ✓</span>
                </div>
                <div className="flex gap-4 mb-3 text-xs">
                  <span className="font-bold">247 <span className="text-[#555] font-normal">queries</span></span>
                  <span className="font-bold">4.8M <span className="text-[#555] font-normal">volume</span></span>
                  <span className="font-bold">82% <span className="text-[#555] font-normal">AI overlap</span></span>
                </div>
                <div className="space-y-1.5">
                  {[
                    { q: "best note app for ADHD", vol: "12.4k", overlap: 84, intent: "info" },
                    { q: "notion vs obsidian for engineers", vol: "8.9k", overlap: 91, intent: "comp" },
                    { q: "how to write second brain notes", vol: "6.1k", overlap: 76, intent: "info" },
                    { q: "is notion losing to obsidian", vol: "2.3k", overlap: 88, intent: "comp" },
                    { q: "notion AI pricing 2026", vol: "11.2k", overlap: 94, intent: "trans" },
                  ].map((r) => (
                    <div key={r.q} className="flex items-center gap-2 text-[11px] py-1 border-b border-gray-50">
                      <span className="flex-1 text-[#333]">{r.q}</span>
                      <span className="text-[#6b7280] w-10">{r.vol}</span>
                      <span className="text-brand font-semibold w-6">{r.overlap}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                        r.intent === "info" ? "bg-blue-100 text-blue-600" :
                        r.intent === "comp" ? "bg-purple-100 text-purple-600" :
                        "bg-green-100 text-green-600"
                      }`}>{r.intent}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-mono text-[#6b7280]">02</span>
                  <span className="text-xs font-semibold text-[#374151]">Research</span>
                </div>
                <h3 className="text-3xl font-black tracking-tight mb-4" style={{ textWrap: "balance" } as React.CSSProperties}>
                  Mine the prompts your customers are about to type.
                </h3>
                <p className="text-[#4b5563] mb-6 leading-relaxed">
                  Volume, intent, and difficulty — for the way people actually ask AI. Surface the prompts that fork into your category,
                  the long-tail no one else is tracking, and the questions where you&apos;re one good answer away from being cited.
                </p>
                <ul className="space-y-2">
                  {[
                    "Generative query expansion — not keyword stems",
                    "AI overlap score: how often LLMs cite for this prompt",
                    "Intent classification: informational, comparative, transactional",
                    "Topic clusters mapped to your content gaps",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#374151]">
                      <span className="text-brand mt-0.5 shrink-0" aria-hidden="true">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 03 Generation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-mono text-[#6b7280]">03</span>
                  <span className="text-xs font-semibold text-[#374151]">Generation</span>
                </div>
                <h3 className="text-3xl font-black tracking-tight mb-4" style={{ textWrap: "balance" } as React.CSSProperties}>
                  Write what citation engines actually quote.
                </h3>
                <p className="text-[#4b5563] mb-6 leading-relaxed">
                  A research-grounded writer that produces articles structured the way LLMs cite — claim-dense paragraphs, source tables, semantic schema.
                  Backed by your brand voice and your factual sources, never fabricated.
                </p>
                <ul className="space-y-2">
                  {[
                    "Brand voice trained on your existing content",
                    "Source-grounded — no hallucinated stats",
                    "Schema, FAQ, and TL;DR auto-emitted",
                    "In-editor revision loops with the visibility model",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#374151]">
                      <span className="text-brand mt-0.5 shrink-0" aria-hidden="true">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm font-mono text-xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-[#6b7280]">Outline</span>
                  <span className="font-sans text-[10px] text-[#6b7280]">1,840 / 2,400</span>
                </div>
                <div className="space-y-1 text-[#555] mb-4">
                  {["TL;DR", "The five engines", "Why GEO ≠ SEO", "Citation hierarchy", "Measurement", "FAQ"].map((s, i) => (
                    <div key={s} className="flex items-center gap-2">
                      <span className="text-[#ddd]">{i + 1}</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-3">
                  <div className="font-sans font-bold text-sm text-[#111] mb-2">Why GEO is not just SEO with extra steps</div>
                  <p className="text-[10px] text-[#555] leading-relaxed font-sans">
                    Search has fragmented. Five different engines now decide what your prospects see, before they ever reach your site.
                    A traditional surface evaluates pages on keyword density and backlink graphs. A generative surface evaluates passages…
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-[10px] text-brand font-sans">
                    <span className="animate-pulse motion-reduce:animate-none" aria-hidden="true">▋</span>
                    <span className="text-[#6b7280]">Writing claim-dense passage…</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 04 Publishing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <div className="text-[10px] uppercase tracking-widest text-[#6b7280] font-medium mb-3">Publishing · 3 destinations</div>
                <div className="text-[10px] text-[#6b7280] mb-3">Crawl pickup ~6h · <span className="text-brand font-mono">14:32:20</span></div>
                <div className="space-y-2">
                  {[
                    { dest: "WordPress", detail: "Published — /blog/why-geo-is-not-seo", status: "published" },
                    { dest: "Shopify", detail: "Published — /blogs/news/why-geo", status: "published" },
                    { dest: "Schema", detail: "Article + FAQ + HowTo emitted", status: "published" },
                    { dest: "Canonical", detail: "Cross-posts → primary URL", status: "published" },
                    { dest: "Internal links", detail: "7 contextual links woven in", status: "published" },
                    { dest: "Framer", detail: "Scheduled — 15:00 UTC", status: "scheduled" },
                  ].map((r) => (
                    <div key={r.dest} className="flex items-center gap-3 text-xs py-1 border-b border-gray-50">
                      <span className="font-medium text-[#333] w-24 shrink-0">{r.dest}</span>
                      <span className="flex-1 text-[#555] truncate">{r.detail}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium shrink-0 ${
                        r.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>{r.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-mono text-[#6b7280]">04</span>
                  <span className="text-xs font-semibold text-[#374151]">Publishing</span>
                </div>
                <h3 className="text-3xl font-black tracking-tight mb-4" style={{ textWrap: "balance" } as React.CSSProperties}>
                  Publish once. Structured for citation.
                </h3>
                <p className="text-[#4b5563] mb-6 leading-relaxed">
                  One click to your CMS, with the structure citation engines actually parse — schema, FAQ, canonical, and internal links applied automatically.
                </p>
                <ul className="space-y-2">
                  {[
                    "Native: WordPress · Shopify · Framer",
                    "Anything else: REST API or webhook",
                    "Schema (Article, FAQ, HowTo) auto-emitted",
                    "Internal links woven in · canonical handled",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#374151]">
                      <span className="text-brand mt-0.5 shrink-0" aria-hidden="true">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-[#f4f6ff] border-y border-gray-100 py-24 px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-black tracking-tight mb-3" style={{ textWrap: "balance" } as React.CSSProperties}>
                Diagnose. Treat. Repeat.
              </h2>
              <p className="text-[#4b5563]">Every morning, you wake up to fresh visibility signals. Here&apos;s the loop.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "01", label: "Diagnose", desc: "Plug in your domain. Daily visibility updates begin across your plan engines. Your first composite visibility index arrives in minutes." },
                { step: "02", label: "Research", desc: "Generative query mining, topic clusters, AI overlap & intent scoring. Outlines you approve." },
                { step: "03", label: "Write", desc: "Source-grounded article generation tuned to citation patterns. Schema and FAQ included." },
                { step: "04", label: "Publish", desc: "One-click to your CMS, structured for citation. Schema, canonical, and internal links, handled." },
              ].map((s) => (
                <div key={s.step}>
                  <div className="text-xs font-mono text-brand font-bold mb-2">{s.step}</div>
                  <h3 className="font-black text-lg mb-2">{s.label}</h3>
                  <p className="text-sm text-[#4b5563] leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-[#6b7280] mt-10 uppercase tracking-widest">
              The loop runs daily: update visibility, treat gaps, re-measure.
            </p>
          </div>
        </section>

        {/* PRICING */}
        <PricingSection />

        {/* FAQ */}
        <FAQSection />

        {/* BOTTOM CTA */}
        <section className="bg-[#111] text-white py-24 px-8 text-center">
          <h2 className="text-4xl font-black tracking-tight mb-4" style={{ textWrap: "balance" } as React.CSSProperties}>
            Be in the answer,<br />not just on the page.
          </h2>
          <p className="text-[#9ca3af] mb-8 max-w-md mx-auto">
            Run a free diagnosis in minutes. See exactly where you stand across the engines that now answer your customers&apos; questions.
          </p>
          <div className="max-w-md mx-auto mb-5">
            <DomainForm variant="cta" />
          </div>
          <p className="text-xs text-white/55 tracking-wide uppercase">
            Free analysis · Paid plans track up to 7 engines · Results in ~60s
          </p>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0a] text-white px-8 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <LogoIcon />
              <span className="text-lg font-bold">RankOn<span className="text-brand">Geo</span></span>
            </div>
            <p className="text-sm text-[#888] mb-4">The visibility layer for AI search. Track. Treat. Repeat.</p>
            <div className="flex gap-3">
              {["Twitter", "LinkedIn", "GitHub"].map((s) => (
                <a key={s} href="#" className="text-xs text-[#555] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded">{s}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-[#555] font-medium mb-3">Product</div>
            <div className="space-y-2">
              {["Visibility", "Research", "Generation", "Publishing", "Pricing", "Blog"].map((l) => (
                <a key={l} href="#" className="block text-sm text-[#888] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-[#555] font-medium mb-3">Integrations</div>
            <div className="space-y-2">
              {["WordPress", "Shopify", "Framer", "Webhooks", "REST API"].map((l) => (
                <a key={l} href="#" className="block text-sm text-[#888] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-[#555] font-medium mb-3">Resources</div>
            <div className="space-y-2">
              {([["Free visibility audit", true], ["Methodology", false], ["GEO playbook", false]] as [string, boolean][]).map(([l, free]) => (
                <a key={l} href="#" className="flex items-center gap-1.5 text-sm text-[#888] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded">
                  {l}
                  {free && <span className="text-[9px] bg-brand text-white px-1 rounded font-bold">free</span>}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-[#1a1a1a] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#555]">
          <span>© 2026 RankOnGeo</span>
          <div className="flex gap-4">
            {["Privacy", "Terms", "DPA", "Security"].map((l) => (
              <a key={l} href="#" className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded">{l}</a>
            ))}
          </div>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
            All systems operational
          </span>
        </div>
      </footer>
    </div>
  );
}
