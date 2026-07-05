"use client";
import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

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

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${
        scrolled ? "border-line bg-[#040d0a]/75 backdrop-blur-xl" : "border-transparent bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="relative mx-auto flex max-w-6xl items-center gap-9 px-6 py-4">
        <a
          href="#top"
          className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint rounded"
        >
          <LogoMark />
          RankOnGeo
        </a>
        <div className="hidden flex-1 items-center gap-7 text-sm text-muted md:flex">
          <a href="#platform" className="rounded py-2 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint">Platform</a>
          <a href="#loop" className="rounded py-2 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint">How it works</a>
          <a href="#pricing" className="rounded py-2 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint">Pricing</a>
          <a href="#faq" className="rounded py-2 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint">FAQ</a>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <a
            href="/auth"
            className="hidden rounded text-sm text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint md:block"
          >
            Login
          </a>
          <a
            href="/dashboard"
            className="rounded-full bg-gradient-to-b from-[#a5f8d1] to-[#6fe9b2] px-5 py-2 text-sm font-semibold text-[#04241a] shadow-[0_0_0_1px_rgba(140,245,195,0.25),0_8px_30px_-6px_rgba(80,230,170,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_rgba(140,245,195,0.4),0_14px_40px_-6px_rgba(80,230,170,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mint focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Dashboard
          </a>
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
