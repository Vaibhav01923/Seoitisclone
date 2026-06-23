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
      <label htmlFor={inputId} className="sr-only">Your website domain</label>
      <div className="flex gap-2">
        {variant === "hero" ? (
          <div className="flex-1 flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 focus-within:border-white/40 transition-colors">
            <svg className="w-4 h-4 text-white/40 shrink-0" fill="none" viewBox="0 0 16 16" aria-hidden="true">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 5v3l2 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              id={inputId}
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="yoursite.com"
              className="flex-1 py-3.5 text-sm text-white bg-transparent outline-none placeholder-white/40"
            />
          </div>
        ) : (
          <input
            id={inputId}
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="yoursite.com"
            className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus-visible:border-white/50 focus-visible:ring-2 focus-visible:ring-white/30"
          />
        )}
        <button
          type="submit"
          className={`bg-brand hover:bg-brand-dark text-white font-semibold rounded-xl text-sm transition-colors whitespace-nowrap flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d0d0d] ${
            variant === "hero" ? "px-6 py-3.5" : "px-5 py-3"
          }`}
        >
          Free analysis <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}
