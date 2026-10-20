"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import BrandLockup from "@/components/BrandLockup";
import CtaLink from "@/components/CtaLink";
import { sectionLinks } from "@/data/nav";
import { useDocumentTheme } from "@/hooks/useDocumentTheme";

export default function Navbar({
  cta = { href: "/all", label: "Get started" },
  overHero = false,
  sections = true,
}: {
  cta?: { href: string; label: string } | "auth";
  /** Invert nav text while sitting over a dark hero (before scroll). */
  overHero?: boolean;
  /** Landing section links (About, Subjects, …). Off on app pages. */
  sections?: boolean;
}) {
  const theme = useDocumentTheme();
  const { student, loading, openAuth, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const invertOnHero = overHero && theme === "dark" && !scrolled && !open;
  const linkClass = invertOnHero
    ? "text-[13px] text-white/65 transition-colors hover:text-white"
    : "text-[13px] text-foreground/60 transition-colors hover:text-foreground";
  const menuBtnClass = invertOnHero
    ? "inline-flex size-9 items-center justify-center text-white/75 transition-colors hover:text-white md:hidden"
    : "inline-flex size-9 items-center justify-center text-foreground/70 transition-colors hover:text-foreground md:hidden";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!sections) setOpen(false);
  }, [sections]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b pt-[env(safe-area-inset-top,0px)] transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "isolate border-foreground/10 bg-background/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div
        className={`mx-auto grid h-16 max-w-7xl items-center gap-3 px-4 sm:h-[4.25rem] sm:gap-4 sm:px-8 ${
          sections
            ? "grid-cols-[1fr_auto] md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]"
            : "grid-cols-[1fr_auto]"
        }`}
      >
        <div className="flex h-full min-w-0 items-center justify-self-start">
          <BrandLockup
            priority
            markClassName="h-9 w-9 sm:h-10 sm:w-10 md:h-10 md:w-10"
          />
        </div>

        {sections ? (
          <nav
            className="hidden h-full items-center gap-7 md:flex"
            aria-label="Primary"
          >
            {sectionLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`inline-flex h-8 items-center leading-none ${linkClass}`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        ) : null}

        <div className="flex h-full items-center justify-end justify-self-end gap-2 sm:gap-3">
          {sections ? (
            <button
              type="button"
              className={menuBtnClass}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden="true">
                {open ? (
                  <path
                    d="M3 3l10 10M13 3 3 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                ) : (
                  <path
                    d="M2 4h12M2 8h12M2 12h12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                )}
              </svg>
            </button>
          ) : null}

          {cta === "auth" ? (
            loading ? (
              <span
                className="inline-block size-8 bg-foreground/10"
                aria-hidden="true"
              />
            ) : student ? (
              <button
                type="button"
                onClick={() => void logout()}
                className="inline-flex h-8 items-center bg-accent px-4 text-[13px] font-medium leading-none text-on-accent transition-colors hover:bg-accent/90"
              >
                Log out
              </button>
            ) : (
              <button
                type="button"
                onClick={() => openAuth("login")}
                className="inline-flex h-8 items-center bg-accent px-4 text-[13px] font-medium leading-none text-on-accent transition-colors hover:bg-accent/90"
              >
                Login
              </button>
            )
          ) : (
            <CtaLink href={cta.href} className="self-center">
              {cta.label}
            </CtaLink>
          )}
        </div>
      </div>

      {sections && open ? (
        <nav
          id="mobile-nav"
          className="border-t border-foreground/10 px-4 py-3 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col">
            {sectionLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-2.5 text-[15px] text-foreground/75 transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
