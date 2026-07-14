"use client";
import { useEffect, useState } from "react";

// Fired on every toggle so surfaces that can't use CSS custom properties
// directly (e.g. dashboard's inline SVG chart colors, which use literal hex
// for cross-engine reliability — see app/dashboard/page.tsx) can react to a
// theme change without prop-drilling. Listeners: dashboard/page.tsx.
export const THEME_CHANGE_EVENT = "rankongeo:themechange";

type Theme = "light" | "dark";

function currentTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

// For components that can't consume var(--token) directly — inline SVG
// chart colors, mainly — and need a plain boolean to pick a literal hex.
// Starts false (light) to match server render, then syncs on mount and on
// every toggle, so a chart never gets stuck on the wrong palette after a
// theme switch elsewhere on the page.
export function useIsDarkMode(): boolean {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(currentTheme() === "dark");
    const onChange = (e: Event) => setIsDark((e as CustomEvent<{ theme: Theme }>).detail.theme === "dark");
    window.addEventListener(THEME_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, onChange);
  }, []);

  return isDark;
}

export function ThemeToggle({ className, iconSize = 16 }: { className?: string; iconSize?: number }) {
  // Starts null so the icon only renders once we know the real theme —
  // avoids a hydration mismatch flash between server-rendered "light" and
  // whatever the no-FOUC script in app/layout.tsx actually applied.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(currentTheme());
  }, []);

  function toggle() {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme: next } }));
    setTheme(next);
  }

  const baseClassName =
    className ??
    "rounded p-2 text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rust)]";

  if (!theme) return <span className={baseClassName} style={{ width: iconSize + 16, height: iconSize + 16, display: "inline-block" }} aria-hidden="true" />;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={baseClassName}
    >
      {theme === "dark" ? (
        <svg width={iconSize} height={iconSize} viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M10 1.5v2M10 16.5v2M18.5 10h-2M3.5 10h-2M15.66 4.34l-1.42 1.42M5.76 14.24l-1.42 1.42M15.66 15.66l-1.42-1.42M5.76 5.76 4.34 4.34"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width={iconSize} height={iconSize} viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M17.5 11.2A7.5 7.5 0 018.8 2.5a7.5 7.5 0 108.7 8.7z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
