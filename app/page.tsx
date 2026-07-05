import type { Metadata } from "next";
import { DomainForm } from "./_components/DomainForm";
import { PricingSection } from "./_components/PricingSection";
import { FAQSection } from "./_components/FAQSection";
import { SiteNav } from "./_components/SiteNav";
import { ScrollReveal } from "./_components/ScrollReveal";
import { InteractiveDemoMockup } from "./_components/InteractiveDemoMockup";
import { NightSky } from "./_components/NightSky";
import { Meadow, FloraLeft, FloraRight, GlobeViz } from "./_components/Scenery";

export const metadata: Metadata = {
  title: "RankOnGeo — Track Your Brand in AI Search",
  description:
    "See how ChatGPT, Claude, Gemini, Perplexity, Grok and AI Overviews respond about your brand. Close the gap with research, articles, and publishing.",
};

function LogoMark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="14" stroke="rgba(140,245,195,.35)" strokeWidth="1.2" />
      <circle cx="16" cy="16" r="6" stroke="#8cf5c3" strokeWidth="2" />
      <circle cx="16" cy="16" r="12.5" stroke="#8cf5c3" strokeWidth="1.4" strokeDasharray="4 5" transform="rotate(-20 16 16)" />
      <circle cx="26.5" cy="9" r="2.2" fill="#ffb469" />
    </svg>
  );
}

const ENGINE_NAMES = ["ChatGPT", "Claude", "Gemini", "Perplexity", "Grok", "Google AI Mode", "AI Overviews"];

function EngineMarquee() {
  const set = (hidden: boolean) => (
    <div className="flex items-center" aria-hidden={hidden || undefined}>
      {ENGINE_NAMES.map((n) => (
        <span key={n} className="whitespace-nowrap px-9 font-serif text-[22px] font-[350] italic text-muted">
          {n} <span className="not-italic text-mint/60 text-[13px]">&nbsp;&nbsp;✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <section className="border-y border-line bg-gradient-to-b from-white/[0.015] to-transparent py-8">
      <p className="mb-6 text-center text-[11.5px] font-medium uppercase tracking-[0.22em] text-faint">
        Tracking every answer engine your customers use
      </p>
      <div className="marq-mask">
        <div className="marq-track">
          {set(false)}
          {set(true)}
        </div>
      </div>
    </section>
  );
}

const LOOP_STEPS = [
  { n: "1", title: "Measure", desc: "Composite visibility score across 7 engines, ~60 seconds after you enter your domain." },
  { n: "2", title: "Research", desc: "Generative query mining surfaces every question where AI answers without you." },
  { n: "3", title: "Write", desc: "Source-grounded articles engineered for citation — schema, FAQs and internal links included." },
  { n: "4", title: "Publish", desc: "One click to WordPress, Shopify or Framer. Webhooks and REST API for everything else." },
  { n: "5", title: "Re-measure", desc: "Daily refresh proves the lift — watch citations appear engine by engine." },
];

function LoopSection() {
  return (
    <section id="loop" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2
              className="font-serif text-4xl font-[350] tracking-tight text-ink sm:text-5xl"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              One loop, running <em className="italic text-mint">while you sleep</em>
            </h2>
            <p className="mt-4 text-muted">
              Measure → Research → Write → Publish → Re-measure. Every stage feeds the next, fully automatic.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <div className="mb-14 flex justify-center">
            <span className="inline-flex items-center gap-2.5 rounded-full bg-amber/[0.06] px-5 py-2 text-[13px] text-amber shadow-[inset_0_0_0_1px_rgba(255,180,105,0.2)]">
              <svg className="spin-slow h-[15px] w-[15px]" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 1.5v3h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              The loop re-runs daily — no babysitting required
            </span>
          </div>
        </ScrollReveal>
        <div className="relative grid grid-cols-1 gap-9 md:grid-cols-5 md:gap-3">
          <div
            className="absolute left-[33px] top-[5%] bottom-[5%] w-px md:inset-x-[9%] md:top-[33px] md:bottom-auto md:h-px md:w-auto"
            style={{
              background: "repeating-linear-gradient(90deg, rgba(140,245,195,.35) 0 6px, transparent 6px 14px)",
            }}
            aria-hidden="true"
          />
          {LOOP_STEPS.map((s, i) => (
            <ScrollReveal key={s.n} delay={i * 90}>
              <div className="group relative grid grid-cols-[66px_1fr] items-start gap-5 text-left md:block md:px-2.5 md:text-center">
                <div className="relative z-[1] flex h-[66px] w-[66px] items-center justify-center rounded-full font-serif text-2xl italic text-mint shadow-[inset_0_0_0_1px_rgba(140,245,195,0.25),0_0_30px_-8px_rgba(140,245,195,0.4)] transition-all duration-500 [background:radial-gradient(circle_at_35%_30%,rgba(140,245,195,.14),rgba(140,245,195,.03))] group-hover:-translate-y-1 group-hover:shadow-[inset_0_0_0_1px_rgba(140,245,195,0.5),0_0_40px_-6px_rgba(140,245,195,0.6)] md:mx-auto md:mb-5">
                  {s.n}
                </div>
                <div>
                  <h3 className="mb-2 text-[16.5px] font-semibold text-ink">{s.title}</h3>
                  <p className="text-[13.5px] leading-relaxed text-muted">{s.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureBento() {
  const ranks = [
    { rank: 1, domain: "acmecorp.com", you: true, pct: 74, delta: "+4.2" },
    { rank: 2, domain: "evernote.com", pct: 52, delta: "-1.1" },
    { rank: 3, domain: "obsidian.md", pct: 48, delta: "+0.3" },
    { rank: 4, domain: "roamresearch.com", pct: 31, delta: "-2.4" },
  ] as { rank: number; domain: string; you?: boolean; pct: number; delta: string }[];

  const gaps = [
    { q: "best note app for ADHD", score: 84 },
    { q: "notion vs obsidian for engineers", score: 91 },
    { q: "how to write second brain", score: 76 },
    { q: "is notion losing to obsidian", score: 88 },
  ];

  const outline = ["TL;DR", "The five engines", "Why GEO ≠ SEO", "Citation hierarchy"];

  const destinations = [
    { dest: "WordPress", detail: "/blog/why-geo-is-not-seo", status: "published" },
    { dest: "Shopify", detail: "/blogs/news/why-geo", status: "published" },
    { dest: "Framer", detail: "Scheduled · 15:00 UTC", status: "scheduled" },
    { dest: "Webhook", detail: "REST · custom endpoint", status: "published" },
  ];

  const panel =
    "rounded-3xl bg-gradient-to-b from-white/[0.045] to-white/[0.012] p-6 shadow-[inset_0_1px_0_rgba(234,246,238,0.09),inset_0_0_0_1px_rgba(234,246,238,0.055)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[inset_0_1px_0_rgba(234,246,238,0.12),inset_0_0_0_1px_rgba(140,245,195,0.22),0_30px_70px_-20px_rgba(0,0,0,0.7)]";

  return (
    <section id="platform" className="px-6 pb-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl pb-14 pt-20 text-center">
            <h2
              className="mb-4 font-serif text-4xl font-[350] tracking-tight text-ink sm:text-5xl"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Everything between <em className="italic text-mint">invisible</em> and{" "}
              <em className="italic text-mint">cited</em>
            </h2>
            <p className="mx-auto max-w-lg text-muted">
              Monitoring tools tell you you&apos;re losing. RankOnGeo does something about it.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-5">
          <ScrollReveal>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div className={`${panel} md:col-span-2`}>
                <h3 className="mb-5 font-serif text-2xl font-[400] leading-tight text-ink">
                  See exactly where AI ranks your brand.
                </h3>
                <div className="space-y-2">
                  {ranks.map((r) => (
                    <div
                      key={r.domain}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2 ${
                        r.you ? "bg-mint/[0.07] shadow-[inset_0_0_0_1px_rgba(140,245,195,0.25)]" : "bg-white/[0.03]"
                      }`}
                    >
                      <span className="w-3 shrink-0 text-[10px] text-faint">{r.rank}</span>
                      <span className={`min-w-0 flex-1 truncate text-xs ${r.you ? "font-semibold text-ink" : "text-muted"}`}>
                        {r.domain}
                        {r.you && (
                          <span className="ml-2 rounded bg-mint px-1.5 py-0.5 text-[8px] font-bold text-[#04241a]">YOU</span>
                        )}
                      </span>
                      <div className="h-1 w-16 shrink-0 overflow-hidden rounded-full bg-white/[0.08]">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${r.pct}%`,
                            background: r.you ? "linear-gradient(90deg, rgba(55,201,141,.6), #8cf5c3)" : "rgba(234,246,238,.25)",
                          }}
                        />
                      </div>
                      <span className="w-8 shrink-0 text-right text-[11px] font-medium text-muted">{r.pct}%</span>
                      <span className={`w-8 shrink-0 text-right text-[10px] ${r.delta.startsWith("+") ? "text-mint" : "text-rose"}`}>
                        {r.delta}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["ChatGPT", "Claude", "Gemini", "Perplexity", "Grok", "AI Overviews"].map((e) => (
                    <span key={e} className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[9px] text-faint">
                      {e}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`${panel} flex flex-col`}>
                <div className="font-serif text-6xl font-[350] leading-none text-ink">7</div>
                <div className="mb-6 mt-1 text-sm text-muted">AI engines tracked</div>
                <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2.5">
                  {ENGINE_NAMES.map((e) => (
                    <span key={e} className="text-[12px] font-medium text-faint">
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="flex min-h-[220px] flex-col justify-between rounded-3xl bg-gradient-to-b from-[#123a2b] to-[#0a2018] p-6 shadow-[inset_0_1px_0_rgba(140,245,195,0.2),inset_0_0_0_1px_rgba(140,245,195,0.18),0_0_80px_-30px_rgba(80,230,170,0.4)]">
                <span className="text-[13px] text-mint/80">Time to first data</span>
                <div>
                  <div className="mt-3 font-serif text-6xl font-[350] leading-none text-mint">~60s</div>
                  <div className="mt-2 text-sm leading-snug text-muted">domain entry to first visibility score</div>
                </div>
                <div className="mt-2 text-[11px] text-faint">Free · no card required</div>
              </div>

              <div className={panel}>
                <h3 className="mb-4 font-serif text-xl font-[400] leading-tight text-ink">Mine the gaps AI is about to fill.</h3>
                <div className="space-y-2">
                  {gaps.map((r) => (
                    <div key={r.q} className="flex items-center gap-2 border-b border-line py-1 last:border-0">
                      <span className="flex-1 truncate text-[11px] text-muted">{r.q}</span>
                      <span className="shrink-0 text-[11px] font-semibold text-amber">{r.score}%</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-[10px] text-faint">AI overlap score · 247 gaps found</div>
              </div>

              <div className={panel}>
                <h3 className="mb-4 font-serif text-xl font-[400] leading-tight text-ink">Write what citation engines quote.</h3>
                <div className="rounded-xl bg-black/30 p-3.5 text-[10px] shadow-[inset_0_0_0_1px_rgba(234,246,238,0.05)]">
                  <div className="mb-2 text-[9px] uppercase tracking-[0.14em] text-faint">Outline · 1,840 / 2,400 words</div>
                  {outline.map((s, i) => (
                    <div key={s} className="flex gap-2 py-0.5">
                      <span className="text-faint/60">{i + 1}.</span>
                      <span className="text-muted">{s}</span>
                    </div>
                  ))}
                  <div className="mt-2 flex items-center gap-1.5 border-t border-line pt-2">
                    <span className="animate-pulse text-mint motion-reduce:animate-none" aria-hidden="true">▋</span>
                    <span className="text-faint">Writing claim-dense passage…</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className={panel}>
              <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
                <div className="shrink-0 sm:w-56">
                  <h3 className="font-serif text-2xl font-[400] leading-snug text-ink">
                    Publish once.
                    <br />
                    Structured for citation.
                  </h3>
                </div>
                <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
                  {destinations.map((r) => (
                    <div key={r.dest} className="rounded-xl bg-white/[0.03] p-3 shadow-[inset_0_0_0_1px_rgba(234,246,238,0.06)]">
                      <div className="mb-0.5 text-xs font-semibold text-ink/90">{r.dest}</div>
                      <div className="mb-2 truncate text-[9px] text-faint">{r.detail}</div>
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${
                          r.status === "published" ? "bg-mint/10 text-mint" : "bg-amber/10 text-amber"
                        }`}
                      >
                        {r.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function GlobeSection() {
  return (
    <section
      className="overflow-hidden px-6 py-28"
      style={{
        background:
          "radial-gradient(60% 45% at 72% 50%, rgba(15,70,65,.25), transparent 70%), linear-gradient(180deg, #040d0a 0%, #041009 50%, #040d0a 100%)",
      }}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <ScrollReveal>
          <div>
            <h2
              className="font-serif text-4xl font-[350] tracking-tight text-ink sm:text-5xl"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Cited everywhere your customers <em className="italic text-mint">ask</em>
            </h2>
            <p className="mb-9 mt-5 max-w-md text-[16px] text-muted">
              AI engines answer millions of buying questions every hour, in every market. RankOnGeo watches those
              answers around the clock — and makes sure your brand is the one they reach for.
            </p>
            <div className="grid grid-cols-2 gap-3.5">
              {[
                { b: "7", s: "AI engines tracked, from ChatGPT to AI Overviews" },
                { b: "~60s", s: "to your first visibility score. No credit card." },
                { b: "Daily", s: "refresh cycles on Business & Scale plans" },
                { b: "25", s: "competitor brands tracked side-by-side" },
              ].map((st) => (
                <div
                  key={st.b}
                  className="rounded-2xl bg-white/[0.035] px-5 py-5 shadow-[inset_0_0_0_1px_rgba(234,246,238,0.08)] transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[inset_0_0_0_1px_rgba(140,245,195,0.25)]"
                >
                  <span className="block font-serif text-3xl font-[400] leading-tight text-ink">{st.b}</span>
                  <span className="mt-1.5 block text-[13px] text-muted">{st.s}</span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={140}>
          <div className="mx-auto w-full max-w-[480px]">
            <GlobeViz />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div id="top" className="min-h-screen bg-background font-sans text-foreground">
      <div className="grain" aria-hidden="true" />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-mint focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#04241a]"
      >
        Skip to content
      </a>

      <SiteNav />

      <main id="main-content">
        {/* HERO */}
        <section
          className="relative overflow-hidden pb-10"
          style={{
            background:
              "radial-gradient(90% 60% at 70% -5%, rgba(20,80,72,.35), transparent 60%), radial-gradient(70% 50% at 15% 10%, rgba(10,45,55,.4), transparent 65%), linear-gradient(180deg,#02080a 0%,#03100c 45%,#041209 100%)",
          }}
        >
          <NightSky />
          <div
            className="pointer-events-none absolute left-[52%] top-[2%] z-[1] h-[420px] w-[760px] rounded-full opacity-50 mix-blend-screen blur-[70px]"
            style={{
              background: "radial-gradient(ellipse at center, rgba(38,140,120,.35), transparent 65%)",
              animation: "auroraDrift 16s ease-in-out infinite alternate",
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute left-[6%] top-[14%] z-[1] h-[380px] w-[560px] rounded-full opacity-50 mix-blend-screen blur-[70px]"
            style={{
              background: "radial-gradient(ellipse at center, rgba(18,90,110,.3), transparent 65%)",
              animation: "auroraDrift 21s ease-in-out infinite alternate-reverse",
            }}
            aria-hidden="true"
          />

          <div className="relative z-[5] mx-auto max-w-4xl px-6 pt-40 text-center max-md:pt-32">
            <div className="rise" style={{ "--d": ".05s" } as React.CSSProperties}>
              <span className="inline-flex items-center gap-2.5 rounded-full bg-mint/[0.06] px-[18px] py-2 text-[13px] uppercase tracking-[0.12em] text-mint shadow-[inset_0_0_0_1px_rgba(140,245,195,0.22)] backdrop-blur-sm">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_10px_#8cf5c3]" aria-hidden="true" />
                Generative Engine Optimization
              </span>
            </div>
            <h1
              className="rise mx-auto mb-6 mt-8 font-serif font-[340] leading-[1.08] tracking-[-0.015em] text-ink"
              style={{ fontSize: "clamp(2.6rem, 6vw, 4.6rem)", textWrap: "balance", "--d": ".18s" } as React.CSSProperties}
            >
              The internet asks AI first.
              <br />
              Make sure it answers <em className="italic text-mint">with you.</em>
            </h1>
            <p
              className="rise mx-auto mb-10 max-w-xl text-muted"
              style={{ fontSize: "clamp(1.02rem, 1.6vw, 1.15rem)", "--d": ".32s" } as React.CSSProperties}
            >
              See exactly what <strong className="font-medium text-ink">ChatGPT, Claude, Gemini, Perplexity and Grok</strong>{" "}
              say about your brand — then close the gaps with research, articles, and one-click publishing.
            </p>
            <div className="rise mx-auto mb-5 max-w-xl" style={{ "--d": ".46s" } as React.CSSProperties}>
              <DomainForm variant="hero" />
            </div>
            <p className="rise flex items-center justify-center gap-2 text-[13.5px] text-faint" style={{ "--d": ".58s" } as React.CSSProperties}>
              <svg className="h-3.5 w-3.5 opacity-80" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 1.5l1.9 3.9 4.3.6-3.1 3 .7 4.2L8 11.2l-3.8 2 .7-4.2-3.1-3 4.3-.6L8 1.5z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
              </svg>
              Free visibility score in ~60 seconds &nbsp;·&nbsp; No credit card
            </p>
          </div>

          {/* INTERACTIVE DEMO — the real dashboard, click around */}
          <div className="rise relative z-[6] mx-auto mt-16 max-w-5xl overflow-x-auto px-6 pb-28" style={{ "--d": ".7s" } as React.CSSProperties}>
            <InteractiveDemoMockup />
          </div>

          <Meadow />
          <FloraLeft />
          <FloraRight />
        </section>

        <EngineMarquee />

        <LoopSection />

        <FeatureBento />

        <GlobeSection />

        <PricingSection />

        <FAQSection />

        {/* BOTTOM CTA */}
        <section
          className="relative overflow-hidden px-6 py-32 text-center"
          style={{
            background:
              "radial-gradient(55% 55% at 50% 65%, rgba(20,90,70,.3), transparent 70%), linear-gradient(180deg,#040d0a 0%, #051710 60%, #030d08 100%)",
          }}
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {[
              [8, 22, 0.9], [16, 68, 0.5], [24, 14, 0.7], [33, 80, 0.4], [42, 30, 0.8], [51, 60, 0.5],
              [58, 12, 0.6], [67, 74, 0.9], [76, 26, 0.5], [84, 64, 0.7], [91, 18, 0.6], [95, 48, 0.4],
            ].map(([x, y, o], i) => (
              <span
                key={i}
                className="tw absolute h-0.5 w-0.5 rounded-full bg-[#dfeee6]"
                style={{ left: `${x}%`, top: `${y}%`, opacity: o, animationDelay: `-${(i * 0.4) % 3}s` }}
              />
            ))}
          </div>
          <ScrollReveal>
            <h2
              className="mx-auto mb-5 max-w-2xl font-serif text-4xl font-[350] tracking-tight text-ink sm:text-5xl"
              style={{ textWrap: "balance" } as React.CSSProperties}
            >
              Your customers already asked.
              <br />
              <em className="italic text-mint">See what the AI told them.</em>
            </h2>
            <p className="mx-auto mb-10 max-w-md text-muted">
              Free visibility score in ~60 seconds. No credit card, no sales call.
            </p>
            <div className="mx-auto mb-5 max-w-md">
              <DomainForm variant="cta" />
            </div>
            <p className="text-xs uppercase tracking-[0.14em] text-faint">
              Free analysis · Paid plans track up to 7 engines · Results in ~60s
            </p>
          </ScrollReveal>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-line bg-[#020705] px-6 py-16 text-foreground">
        <div className="mx-auto mb-12 grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <div className="mb-3 flex items-center gap-2.5">
              <LogoMark />
              <span className="text-lg font-semibold tracking-tight">RankOnGeo</span>
            </div>
            <p className="mb-5 max-w-[240px] text-sm text-faint">
              Track where AI ranks your brand — and close the gaps automatically.
            </p>
            <span className="inline-flex items-center gap-2 rounded-full bg-mint/[0.05] px-3.5 py-1.5 text-xs text-mint shadow-[inset_0_0_0_1px_rgba(140,245,195,0.18)]">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_8px_#8cf5c3]" aria-hidden="true" />
              All systems operational
            </span>
          </div>
          <div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-faint">Product</div>
            <div className="space-y-2.5">
              {["Visibility", "Research", "Generation", "Publishing", "Pricing", "Blog"].map((l) => (
                <a key={l} href={l === "Pricing" ? "#pricing" : "#platform"} className="block rounded text-sm text-muted transition-colors hover:text-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint">
                  {l}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-faint">Integrations</div>
            <div className="space-y-2.5">
              {["WordPress", "Shopify", "Framer", "Webhooks", "REST API"].map((l) => (
                <a key={l} href="#" className="block rounded text-sm text-muted transition-colors hover:text-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint">
                  {l}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-faint">Resources</div>
            <div className="space-y-2.5">
              {(
                [["Free visibility audit", true], ["Methodology", false], ["GEO playbook", false]] as [string, boolean][]
              ).map(([l, free]) => (
                <a key={l} href={free ? "/audit" : "#"} className="flex items-center gap-1.5 rounded text-sm text-muted transition-colors hover:text-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint">
                  {l}
                  {free && <span className="rounded bg-mint px-1 text-[9px] font-bold text-[#04241a]">free</span>}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-line pt-6 text-xs text-faint sm:flex-row">
          <span>© 2026 RankOnGeo. Grown under a night sky.</span>
          <div className="flex gap-4">
            {["Privacy", "Terms", "DPA", "Security"].map((l) => (
              <a key={l} href="#" className="rounded transition-colors hover:text-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint">
                {l}
              </a>
            ))}
          </div>
          <div className="flex gap-4">
            {["Twitter", "LinkedIn", "GitHub"].map((s) => (
              <a key={s} href="#" className="rounded transition-colors hover:text-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint">
                {s}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
