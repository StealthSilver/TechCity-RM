"use client";

import { useCallback } from "react";

const STORAGE_KEY = "techcity-rm-theme";

export function applyTheme(theme: "light" | "dark") {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore private-mode storage failures */
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute("content", theme === "light" ? "#ffffff" : "#090b10");
  }
}

export default function ThemeToggle() {
  const toggle = useCallback(() => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="theme-toggle"
    >
      <svg className="theme-toggle-to-light" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="2.25" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <path
          d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M12.6 3.4l-1.1 1.1M4.5 11.5l-1.1 1.1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="square"
        />
      </svg>
      <svg className="theme-toggle-to-dark" viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M10.2 2.2a5.2 5.2 0 1 0 3.6 8.8 4.4 4.4 0 0 1-3.6-8.8Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
