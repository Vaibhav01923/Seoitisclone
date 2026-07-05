"use client";
import { useState } from "react";

const PRICING = [
  {
    name: "Pro",
    desc: "For solo founders proving the channel.",
    price: 89,
    highlight: false,
    features: [
      "10 SEO articles per month",
      "50 tracked prompts",
      "4,000 AI search responses / mo",
      "1 website · 1 team seat",
      "3 AI engines",
      "Weekly full refresh",
      "Google Search Console + GA4",
      "Webhook CMS publishing",
      "Email support",
    ],
  },
  {
    name: "Business",
    desc: "For teams that want the loop on autopilot.",
    price: 239,
    highlight: true,
    features: [
      "Everything in Pro, plus:",
      "50 SEO articles per month",
      "150 tracked prompts",
      "6,000 AI search responses / mo",
      "3 websites · 5 team seats",
      "6 AI engines",
      "Daily visibility updates",
      "7 competitor brands",
      "Gap detection & gap → article",
      "Auto-publish to WordPress, Shopify & Framer",
    ],
  },
  {
    name: "Scale",
    desc: "For agencies & multi-brand portfolios.",
    price: 739,
    highlight: false,
    features: [
      "Everything in Business, plus:",
      "150 SEO articles per month",
      "400 tracked prompts",
      "15,000 AI search responses / mo",
      "10 websites · Unlimited seats",
      "All 7 AI engines",
      "Expanded confidence checks",
      "25 competitor brands",
      "Full autopilot (gap → article → publish)",
      "Priority support",
    ],
  },
];

export function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <section id="pricing" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <h2
            className="mb-4 font-serif text-4xl font-[350] tracking-tight text-ink sm:text-5xl"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Plans that scale with your <em className="italic text-mint">visibility</em>
          </h2>
          <p className="mb-9 text-muted">
            Every plan starts free — your first visibility score costs nothing.
          </p>
          <div
            className="inline-flex items-center gap-1 rounded-full border border-line bg-surface p-1"
            role="group"
            aria-label="Billing period"
          >
            <button
              onClick={() => setBilling("monthly")}
              aria-pressed={billing === "monthly"}
              className={`rounded-full px-5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint ${
                billing === "monthly" ? "bg-mint/15 text-mint" : "text-faint hover:text-muted"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("annual")}
              aria-pressed={billing === "annual"}
              className={`rounded-full px-5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint ${
                billing === "annual" ? "bg-mint/15 text-mint" : "text-faint hover:text-muted"
              }`}
            >
              Annual <span className="ml-1 text-xs font-semibold text-amber">−17%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
          {PRICING.map((plan) => {
            const price = billing === "annual" ? Math.round(plan.price * 0.83) : plan.price;
            return (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-1.5 ${
                  plan.highlight
                    ? "bg-gradient-to-b from-mint/10 to-mint/[0.02] shadow-[inset_0_1px_0_rgba(140,245,195,0.25),inset_0_0_0_1px_rgba(140,245,195,0.3),0_40px_90px_-30px_rgba(0,0,0,0.8),0_0_90px_-30px_rgba(80,230,170,0.35)]"
                    : "bg-gradient-to-b from-white/[0.04] to-white/[0.01] shadow-[inset_0_1px_0_rgba(234,246,238,0.08),inset_0_0_0_1px_rgba(234,246,238,0.06)]"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-b from-[#a5f8d1] to-[#6fe9b2] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#04241a] shadow-[0_6px_20px_-4px_rgba(80,230,170,0.5)]">
                    Most picked
                  </div>
                )}
                <h3
                  className={`text-sm font-semibold uppercase tracking-[0.14em] ${
                    plan.highlight ? "text-mint" : "text-muted"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="mb-1 mt-5 flex items-baseline gap-1.5">
                  <span className="font-serif text-5xl font-[350] tracking-tight text-ink">${price}</span>
                  <span className="text-sm text-faint">/ month</span>
                </div>
                <p className="mb-7 text-sm text-muted">{plan.desc}</p>
                <ul className="mb-8 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-mint" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M13 4.5L6.5 11 3 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/auth"
                  className={`w-full rounded-full py-3 text-center text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    plan.highlight
                      ? "bg-gradient-to-b from-[#a5f8d1] to-[#6fe9b2] text-[#04241a] shadow-[0_0_0_1px_rgba(140,245,195,0.25),0_8px_30px_-6px_rgba(80,230,170,0.35)] hover:shadow-[0_0_0_1px_rgba(140,245,195,0.4),0_14px_40px_-6px_rgba(80,230,170,0.5)]"
                      : "bg-white/[0.05] text-ink shadow-[inset_0_0_0_1px_rgba(234,246,238,0.15)] hover:bg-white/[0.09]"
                  }`}
                >
                  Get started
                </a>
              </div>
            );
          })}
        </div>
        <p className="mt-9 text-center text-sm text-faint">
          Not sure yet? <span className="text-amber">Run the free analysis first</span> — see your score before you
          spend a cent.
        </p>
      </div>
    </section>
  );
}
