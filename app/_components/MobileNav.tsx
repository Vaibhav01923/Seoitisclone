"use client";
import { useState } from "react";

const LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Tools", href: "#" },
  { label: "Guides", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Pricing", href: "#pricing" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Toggle navigation menu"
        className="p-2 text-[#4b5563] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          {open ? (
            <path d="M4 4L16 16M4 16L16 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          ) : (
            <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-md z-50 px-8 py-4 flex flex-col gap-1">
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm text-[#4b5563] hover:text-[#111] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
