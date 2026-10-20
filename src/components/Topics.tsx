"use client";

import RequireAuthLink from "@/components/auth/RequireAuthLink";
import { catalog } from "@/data/catalog";

export default function Topics() {
  return (
    <section id="subjects" className="scroll-mt-24 bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 text-left sm:px-8 sm:py-24 lg:py-28">
        <h2 className="max-w-3xl text-[1.65rem] font-normal leading-[1.18] tracking-tight sm:text-[2.35rem] lg:text-[2.7rem] lg:leading-[1.12]">
          <span className="text-foreground">Six subjects. </span>
          <span className="text-foreground/55">The same kind of path.</span>
        </h2>

        <ul
          className="mt-10 space-y-0 overflow-hidden rounded-2xl border border-foreground/10 bg-surface shadow-[0_1px_0_color-mix(in_srgb,var(--foreground)_6%,transparent)] md:hidden"
          aria-label="Subjects"
        >
          {catalog.map((roadmap, index) => (
            <li key={roadmap.id} className="border-b border-foreground/10 last:border-b-0">
              <RequireAuthLink
                href={`/all/${roadmap.id}`}
                className="flex items-start gap-3 px-4 py-4 transition-colors hover:bg-foreground/[0.03] sm:gap-4 sm:px-5"
              >
                <span className="mt-0.5 font-mono text-[11px] text-foreground/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="text-[15px] tracking-tight text-foreground">
                      {roadmap.title}
                    </span>
                    <span className="shrink-0 font-mono text-[11px] tracking-[0.14em] text-foreground/45">
                      {String(roadmap.stages.length).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="mt-1 block text-[13px] leading-6 text-foreground/55">
                    {roadmap.line}
                  </span>
                </span>
              </RequireAuthLink>
            </li>
          ))}
        </ul>

        <div className="mt-14 hidden overflow-x-auto rounded-2xl border border-foreground/10 bg-surface shadow-[0_1px_0_color-mix(in_srgb,var(--foreground)_6%,transparent)] md:mt-16 md:block">
          <div className="min-w-0" role="table" aria-label="Subjects">
            <div
              role="row"
              className="grid grid-cols-[2.5rem_minmax(0,1.1fr)_minmax(0,1.6fr)_3.75rem] items-center gap-3 border-b border-foreground/10 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/45 lg:grid-cols-[2.75rem_minmax(12rem,1.15fr)_minmax(14rem,1.7fr)_4.5rem] lg:gap-4 lg:px-5"
            >
              <span role="columnheader" />
              <span role="columnheader">Subject</span>
              <span role="columnheader">Path</span>
              <span role="columnheader" className="text-right">
                Stages
              </span>
            </div>
            {catalog.map((roadmap, index) => (
              <RequireAuthLink
                key={roadmap.id}
                href={`/all/${roadmap.id}`}
                role="row"
                className="grid grid-cols-[2.5rem_minmax(0,1.1fr)_minmax(0,1.6fr)_3.75rem] items-center gap-3 border-b border-foreground/10 px-4 py-4 transition-colors last:border-b-0 hover:bg-foreground/[0.03] lg:grid-cols-[2.75rem_minmax(12rem,1.15fr)_minmax(14rem,1.7fr)_4.5rem] lg:gap-4 lg:px-5"
              >
                <span className="font-mono text-[11px] text-foreground/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="truncate text-[15px] tracking-tight text-foreground">
                  {roadmap.title}
                </span>
                <span className="min-w-0 text-[13px] leading-6 text-foreground/55">
                  {roadmap.line}
                </span>
                <span className="text-right font-mono text-[11px] tracking-[0.14em] text-foreground/45">
                  {String(roadmap.stages.length).padStart(2, "0")}
                </span>
              </RequireAuthLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
