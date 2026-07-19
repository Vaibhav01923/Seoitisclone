"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/app/_components/ThemeToggle";

function LogoIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="6" stroke="var(--rust)" strokeWidth="2.5" />
      <circle cx="16" cy="16" r="12.5" stroke="var(--rust)" strokeWidth="1.8" strokeDasharray="4 5" transform="rotate(-20 16 16)" />
      <circle cx="26.5" cy="9" r="2.5" fill="var(--olive)" />
    </svg>
  );
}

const NAV_SECTIONS: { title: string; items: { href: string; label: string }[] }[] = [
  { title: "Overview", items: [{ href: "/docs", label: "Welcome to RankOnGeo Docs" }] },
  {
    title: "How-To Guides",
    items: [
      { href: "/docs/web-analytics", label: "How to Set Up Web Analytics" },
      { href: "/docs/llm-analytics", label: "How to Set Up AI Crawler & Bot Analytics" },
      { href: "/docs/autopublish", label: "How to Set Up Auto-Publishing" },
    ],
  },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)]">
      <header className="border-b border-[var(--line)] bg-[var(--surface)] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <LogoIcon />
            <span className="font-bold text-[var(--ink)]">RankOnGeo</span>
            <span className="text-[var(--ink-faint)] font-medium">Docs</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm font-medium text-[var(--ink-soft)]">
            <Link href="/#pricing" className="hover:text-[var(--ink)] transition-colors">Pricing</Link>
            <Link href="/dashboard" className="hover:text-[var(--ink)] transition-colors">Dashboard</Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex items-start">
        <aside className="w-64 shrink-0 py-8 pr-4 hidden lg:block sticky top-14 self-start max-h-[calc(100vh-3.5rem)] overflow-y-auto">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title} className="mb-6">
              <p className="text-[10px] font-semibold text-[var(--ink-faint)] uppercase tracking-widest mb-2 px-3">{section.title}</p>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        active
                          ? "bg-[var(--rust-wash)] text-[var(--rust-deep)] font-semibold border-l-2 border-[var(--rust)] -ml-0.5 pl-[11px]"
                          : "text-[var(--ink-soft)] hover:bg-[var(--line-soft)] hover:text-[var(--ink)]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </aside>

        <main className="flex-1 min-w-0 px-6 py-10">{children}</main>
      </div>
    </div>
  );
}
