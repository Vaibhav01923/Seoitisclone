"use client";
import { useState } from "react";

const FAQS = [
  {
    q: "What's the difference between SEO and what RankOnGeo does?",
    a: "Traditional SEO ranks pages in Google's blue links. RankOnGeo tracks and improves how generative engines — ChatGPT, Perplexity, AI Overviews, Claude, Gemini, AI Mode, and Grok — answer questions about your brand. They use different signals (claim density, source authority, schema, citation graph), and that's increasingly where your customers are searching.",
  },
  {
    q: "Which AI engines do you track?",
    a: "Pro tracks 3 engines (ChatGPT, Claude, Perplexity). Business adds Gemini, AI Overviews, and AI Mode. Scale adds Grok for all 7. Engine availability may vary by region.",
  },
  {
    q: "How is this different from Peec AI, Otterly, or similar tools?",
    a: "Most tools stop at measurement. RankOnGeo closes the loop: it diagnoses your gaps, generates citation-ready content, and publishes directly to your CMS — then re-measures automatically. It's a full pipeline, not just a dashboard.",
  },
  {
    q: "Will I get penalized for AI-generated content?",
    a: "No. Google's guidance targets low-quality, mass-produced content regardless of how it was made. RankOnGeo generates source-grounded, brand-voiced drafts you review before publishing. Quality is the signal, not the tool.",
  },
  {
    q: "How fast can I expect to see results?",
    a: "First visibility data arrives in ~60 seconds. Meaningful citation improvements typically show in 2–6 weeks depending on your domain authority and how quickly search engines crawl new content.",
  },
];

export function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="max-w-3xl mx-auto px-8 pb-24">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black tracking-tight" style={{ textWrap: "balance" } as React.CSSProperties}>
          Common questions.
        </h2>
      </div>
      <div className="space-y-2">
        {FAQS.map((faq, i) => (
          <div key={i} className="border border-gray-100 bg-white rounded-xl overflow-hidden">
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              aria-expanded={openFaq === i}
              aria-controls={`faq-answer-${i}`}
            >
              <span className="font-medium text-sm text-[#111]">{faq.q}</span>
              <span
                className={`text-[#6b7280] transition-transform text-lg ml-4 shrink-0 motion-reduce:transition-none ${openFaq === i ? "rotate-45" : ""}`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            {openFaq === i && (
              <div
                id={`faq-answer-${i}`}
                role="region"
                className="px-5 pb-4 text-sm text-[#4b5563] leading-relaxed border-t border-gray-100"
              >
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-[#4b5563] mt-8">
        Still have questions?{" "}
        <a
          href="mailto:hello@rankongeo.com"
          className="text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded"
        >
          Drop us a line
        </a>{" "}
        and we&apos;ll reply within a business day.
      </p>
    </section>
  );
}
