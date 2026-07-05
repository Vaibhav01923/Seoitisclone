"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function DomainForm({ variant = "hero" }: { variant?: "hero" | "cta" }) {
  const router = useRouter();
  const [domain, setDomain] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const d = domain.trim();
    const params = new URLSearchParams();
    if (d) params.set("domain", d);
    router.push(`/audit${params.size ? `?${params}` : ""}`);
  }

  const inputId = variant === "hero" ? "domain-hero" : "domain-cta";

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={inputId} className="sr-only">
        Your website domain
      </label>
      <div className="flex gap-2.5 max-sm:flex-col">
        <div className="flex flex-1 items-center gap-2.5 rounded-full border border-line-2 bg-white/[0.05] px-5 backdrop-blur-sm transition-colors focus-within:border-mint/50 focus-within:bg-white/[0.07]">
          <svg className="h-4 w-4 shrink-0 text-faint" fill="none" viewBox="0 0 16 16" aria-hidden="true">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2.5 8h11M8 2c1.8 1.7 2.6 3.8 2.6 6S9.8 12.3 8 14c-1.8-1.7-2.6-3.8-2.6-6S6.2 3.7 8 2z" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <input
            id={inputId}
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="yoursite.com"
            className="flex-1 bg-transparent py-3.5 text-sm text-ink outline-none placeholder:text-faint"
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-b from-[#a5f8d1] to-[#6fe9b2] px-7 py-3.5 text-sm font-semibold text-[#04241a] shadow-[0_0_0_1px_rgba(140,245,195,0.25),0_8px_30px_-6px_rgba(80,230,170,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(140,245,195,0.4),0_14px_40px_-6px_rgba(80,230,170,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Free analysis
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </form>
  );
}
