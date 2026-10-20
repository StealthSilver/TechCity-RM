import {
  NextMotion,
  PersonalMotion,
  PrerequisiteMotion,
  ProgressMotion,
  ExportMotion,
  ResourceMotion,
} from "@/components/FeatureMotion";
import type { ReactNode } from "react";

const cards: {
  title: string;
  body: string;
  motion: ReactNode;
}[] = [
  {
    title: "Progress",
    body: "Finished stages stay marked. The one you are on stays open.",
    motion: <ProgressMotion />,
  },
  {
    title: "Export as PDF",
    body: "Download the path you are on, with the stages you have finished.",
    motion: <ExportMotion />,
  },
  {
    title: "Next topics",
    body: "The next step is already on the path.",
    motion: <NextMotion />,
  },
  {
    title: "Prerequisites",
    body: "Each topic names what has to come first.",
    motion: <PrerequisiteMotion />,
  },
  {
    title: "Resources",
    body: "The reading for a topic stays with that topic.",
    motion: <ResourceMotion />,
  },
  {
    title: "Personalisation",
    body: "The path follows the stages you have finished.",
    motion: <PersonalMotion />,
  },
];

export default function Features() {
  return (
    <section id="features" className="scroll-mt-24 bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 text-left sm:px-8 sm:py-24 lg:py-28">
        <h2 className="max-w-3xl text-[1.65rem] font-normal leading-[1.18] tracking-tight sm:text-[2.35rem] lg:text-[2.7rem] lg:leading-[1.12]">
          <span className="text-foreground">On the stage you are on. </span>
          <span className="text-foreground/55">
            The path, the question, and what comes next.
          </span>
        </h2>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {cards.map((card) => (
            <li key={card.title}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-surface">
                <div className="relative h-52 overflow-hidden bg-[var(--feat-panel)] sm:h-60 md:h-64">
                  <div className="absolute left-1/2 top-1/2 h-72 w-full -translate-x-1/2 -translate-y-1/2 scale-[0.72] sm:scale-[0.78]">
                    {card.motion}
                  </div>
                </div>
                <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                  <h3 className="text-[15px] font-medium tracking-tight text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-5 text-foreground/55">{card.body}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
