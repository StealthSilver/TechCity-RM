"use client";

import { useEffect, useState } from "react";
import CtaLink from "@/components/CtaLink";
import Hyperspeed from "@/components/Hyperspeed";
import { sectionLinks } from "@/data/nav";
import { useDocumentTheme } from "@/hooks/useDocumentTheme";

export default function Hero() {
  const theme = useDocumentTheme();
  const [compact, setCompact] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)");
    const sync = () => setCompact(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const light = theme === "light";

  return (
    <section
      className={`relative isolate h-[100svh] min-h-[28rem] overflow-hidden sm:min-h-[32rem] md:min-h-[36rem] ${
        light ? "bg-[var(--hero-bg)] text-foreground" : "bg-[var(--hero-bg)] text-white"
      }`}
    >
      <Hyperspeed
        key={theme}
        theme={theme}
        curve="winding"
        curvature={1}
        speed={0.22}
        milestones={[
          "Arrays",
          "Strings",
          "Linked lists",
          "Stacks",
          "Hash maps",
          "Trees",
          "Graphs",
          "Dynamic programming",
        ]}
        boost={3}
        fov={90}
        boostFov={130}
        lanes={3}
        roadWidth={10}
        medianWidth={2}
        density={compact ? 18 : 40}
        trailLength={1}
        lightSize={1}
        poles={compact ? 10 : 20}
        dust={compact ? 24 : 100}
        glow={light ? 0.35 : 0.6}
        reflections={compact ? 0.2 : light ? 0.35 : 0.5}
        roadOpacity={light ? 1 : 0.1}
        steer={0.35}
        interactive={!compact}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: light
            ? "linear-gradient(to top, rgba(238,240,245,0.97) 0%, rgba(238,240,245,0.62) 30%, rgba(238,240,245,0.12) 58%, transparent 72%)"
            : "linear-gradient(to top, rgba(8,8,10,0.94) 0%, rgba(8,8,10,0.5) 28%, transparent 55%)",
        }}
      />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-end px-5 pb-[max(3.5rem,env(safe-area-inset-bottom))] pt-24 sm:px-8 sm:pb-20">
        <div className="w-full max-w-xl">
          <h1 className="max-w-[13ch] text-[2.25rem] font-normal leading-[1.05] tracking-tight sm:max-w-[12ch] sm:text-5xl md:text-6xl lg:text-[4.5rem] lg:leading-[1.02]">
            A path for every subject you study.
          </h1>
          <p
            className={`mt-4 max-w-md text-[15px] leading-7 sm:mt-5 sm:text-lg ${
              light ? "text-foreground/65" : "text-white/70"
            }`}
          >
            One sequence of problems, from the first lesson to the work.
          </p>
          <div className="pointer-events-auto mt-7 flex flex-col items-start gap-5 sm:mt-8">
            <CtaLink href="/all" size="lg">
              Get started
            </CtaLink>
            <nav
              className="flex flex-wrap items-center gap-x-4 gap-y-2"
              aria-label="Page sections"
            >
              {sectionLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                    light
                      ? "text-foreground/45 hover:text-foreground"
                      : "text-white/45 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
