"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { roadmaps } from "@/data/roadmaps";

export default function Topics() {
  const [activeId, setActiveId] = useState(roadmaps[0].id);
  const active = roadmaps.find((roadmap) => roadmap.id === activeId) ?? roadmaps[0];

  return (
    <section id="subjects" className="scroll-mt-24 border-t border-foreground/10">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="03"
            label="Subjects"
            title="DSA, AIML, cloud, data, and the rest of the work."
          />
          <p className="max-w-sm text-[15px] leading-7 text-foreground/65 lg:pb-1">
            Six paths. Software and security sit beside the four you came for.
            Each one is six stages, in one order.
          </p>
        </div>

        <div
          className="mt-10 flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Roadmaps"
        >
          {roadmaps.map((roadmap) => {
            const selected = roadmap.id === active.id;
            return (
              <button
                key={roadmap.id}
                type="button"
                role="tab"
                id={`tab-${roadmap.id}`}
                aria-selected={selected}
                aria-controls={`panel-${roadmap.id}`}
                onClick={() => setActiveId(roadmap.id)}
                className={`shrink-0 border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                  selected
                    ? "border-accent bg-accent text-on-accent"
                    : "border-foreground/15 text-foreground/60 hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {roadmap.short}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          className="mt-6 grid border border-foreground/10 bg-surface md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
        >
          <div className="border-b border-foreground/10 p-6 sm:p-8 md:border-r md:border-b-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
              {active.short}
            </p>
            <h3 className="mt-3 text-2xl font-normal tracking-tight sm:text-3xl">{active.title}</h3>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-foreground/65">{active.line}</p>
            <p className="mt-6 border-t border-foreground/10 pt-5 text-[15px] leading-7 text-foreground">
              <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-accent-secondary">
                You leave able to
              </span>
              {active.outcome}
            </p>
          </div>

          <ol className="divide-y divide-foreground/10">
            {active.stages.map((stage, index) => (
              <li key={stage.title} className="grid grid-cols-[3.5rem_minmax(0,1fr)] gap-2 px-6 py-4 sm:px-8">
                <span className="font-mono text-[11px] tracking-[0.14em] text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-[15px] text-foreground">{stage.title}</span>
                  <span className="mt-1 block text-sm leading-6 text-foreground/55">{stage.detail}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
