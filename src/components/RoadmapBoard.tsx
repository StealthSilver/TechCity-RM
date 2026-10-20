import type { Roadmap } from "@/data/roadmaps";
import { progressStage } from "@/data/roadmaps";

export default function RoadmapBoard({
  roadmap,
  stageIndex,
  onStage,
  audience,
}: {
  roadmap: Roadmap;
  stageIndex: number;
  onStage: (index: number) => void;
  audience: "student" | "college";
}) {
  const stage = roadmap.stages[stageIndex];
  const status =
    stageIndex < progressStage
      ? "Review"
      : stageIndex === progressStage
        ? "Now"
        : "Ahead";

  return (
    <div className="lesson-card border border-foreground/10">
      <div className="flex items-center justify-between gap-3 border-b border-foreground/10 px-3 py-3 sm:gap-4 sm:px-5">
        <p className="min-w-0 truncate font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          {roadmap.short}
        </p>
        <p className="shrink-0 font-mono text-[11px] tabular-nums tracking-[0.14em] text-foreground/45">
          {String(stageIndex + 1).padStart(2, "0")} / 06
        </p>
      </div>

      <ol className="px-3 py-3 sm:px-5 sm:py-4">
        {roadmap.stages.map((item, index) => {
          const done = index < progressStage;
          const current = index === progressStage;
          const selected = index === stageIndex;

          return (
            <li key={item.title} className="relative">
              {index < roadmap.stages.length - 1 ? (
                <span
                  aria-hidden="true"
                  className={`absolute top-6 bottom-0 left-[7px] w-px ${
                    done ? "bg-accent/70" : "bg-foreground/15"
                  }`}
                />
              ) : null}
              <button
                type="button"
                onClick={() => onStage(index)}
                aria-current={selected ? "step" : undefined}
                className={`relative flex w-full items-start gap-3 py-2 text-left ${
                  selected ? "text-foreground" : "text-foreground/55"
                }`}
              >
                <span
                  className={`relative z-10 mt-1 size-[15px] shrink-0 border ${
                    current
                      ? "border-accent-secondary bg-accent-secondary"
                      : done
                        ? "border-accent bg-accent"
                        : "border-foreground/25 bg-background"
                  }`}
                />
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-3">
                    <span
                      className={`text-[15px] leading-6 ${
                        selected ? "text-foreground" : ""
                      }`}
                    >
                      {item.title}
                    </span>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/35">
                      {current ? "Now" : done ? "Done" : "Later"}
                    </span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="border-t border-foreground/10 bg-foreground/[0.03] px-3 py-4 sm:px-5">
        <div className="flex items-center justify-between gap-3">
          <p className="min-w-0 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-secondary">
            {audience === "college" ? "This week’s problem" : status}
          </p>
          <div className="flex gap-1">
            <StageStep
              label="Previous stage"
              disabled={stageIndex === 0}
              onClick={() => onStage(stageIndex - 1)}
              direction="prev"
            />
            <StageStep
              label="Next stage"
              disabled={stageIndex === roadmap.stages.length - 1}
              onClick={() => onStage(stageIndex + 1)}
              direction="next"
            />
          </div>
        </div>
        <p className="mt-2 text-lg leading-6 tracking-tight text-foreground">
          {stage.problem}
        </p>
        <p className="mt-2 max-w-md text-sm leading-6 text-foreground/60">
          {stage.hint}
        </p>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40">
          {audience === "college"
            ? `Trainer and section are on ${stage.title}`
            : stage.detail}
        </p>
      </div>
    </div>
  );
}

function StageStep({
  label,
  disabled,
  onClick,
  direction,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  direction: "prev" | "next";
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex size-7 items-center justify-center border border-foreground/15 text-foreground/70 transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-30"
    >
      <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden="true">
        <path
          d={direction === "prev" ? "M7.5 2.5 4 6l3.5 3.5" : "M4.5 2.5 8 6l-3.5 3.5"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="square"
        />
      </svg>
    </button>
  );
}
