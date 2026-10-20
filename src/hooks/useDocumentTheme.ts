"use client";

import { useEffect, useState } from "react";

export type DocumentTheme = "light" | "dark";

function readTheme(): DocumentTheme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function useDocumentTheme() {
  const [theme, setTheme] = useState<DocumentTheme>("dark");

  useEffect(() => {
    const sync = () => setTheme(readTheme());
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return theme;
}
