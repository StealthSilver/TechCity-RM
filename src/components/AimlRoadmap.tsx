"use client";

import { useLayoutEffect, useState } from "react";
import Link from "next/link";
import {
  aimlPhases,
  aimlPrerequisiteIds,
  aimlPrerequisites,
  aimlTopicIds,
  type AimlPhase,
} from "@/data/aiml";
import type { Roadmap } from "@/data/roadmaps";

const STORAGE_KEY = "techcity-rm-progress:aiml";

type Progress = {
  topics: string[];
  prereqs: string[];
};

function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { topics: [], prereqs: [] };
    const parsed = JSON.parse(raw) as Partial<Progress>;
    const topicSet = new Set(aimlTopicIds);
    const prereqSet = new Set(aimlPrerequisiteIds);
    return {
      topics: (parsed.topics ?? []).filter((id) => topicSet.has(id)),
      prereqs: (parsed.prereqs ?? []).filter((id) => prereqSet.has(id)),
    };
  } catch {
    return { topics: [], prereqs: [] };
  }
}

function toggleId(list: string[], id: string) {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
}

function levelFor(percent: number) {
  if (percent >= 100) return "Complete";
  if (percent >= 70) return "Advanced";
  if (percent >= 35) return "Intermediate";
  return "Beginner";
}

export default function AimlRoadmap({ roadmap }: { roadmap: Roadmap }) {
  const [doneTopics, setDoneTopics] = useState<string[]>([]);
  const [donePrereqs, setDonePrereqs] = useState<string[]>([]);
  const [openPhases, setOpenPhases] = useState<string[]>([aimlPhases[0].id]);
  const [openTopics, setOpenTopics] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const saved = loadProgress();
    setDoneTopics(saved.topics);
    setDonePrereqs(saved.prereqs);
    const current = aimlPhases.find((phase) =>
      phase.topics.some((topic) => !saved.topics.includes(topic.id)),
    );
    setOpenPhases([current?.id ?? aimlPhases[aimlPhases.length - 1].id]);
    setReady(true);
  }, []);

  useLayoutEffect(() => {
    if (!ready) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ topics: doneTopics, prereqs: donePrereqs }),
    );
  }, [ready, doneTopics, donePrereqs]);

  const total = aimlTopicIds.length;
  const completed = doneTopics.length;
  const remaining = total - completed;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const doneSet = new Set(doneTopics);

  const phaseProgress = aimlPhases.map((phase) => {
    const done = phase.topics.filter((topic) => doneSet.has(topic.id)).length;
    return { done, total: phase.topics.length, complete: done === phase.topics.length };
  });
  const currentIndex = phaseProgress.findIndex((phase) => !phase.complete);

  return (
    <article className="mx-auto max-w-7xl px-5 pt-28 pb-16 sm:px-8 sm:pt-32 sm:pb-20">
      <div className="max-w-3xl">
        <Link
          href="/all"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/55 transition-colors hover:text-accent"
        >
          <span aria-hidden="true">←</span>
          All roadmaps
        </Link>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          {roadmap.short}
        </p>
        <h1 className="mt-3 max-w-xl text-[2.2rem] font-normal leading-[1.05] tracking-tight sm:text-5xl">
          {roadmap.title}
        </h1>
        <p className="mt-5 max-w-xl text-[15px] leading-7 text-foreground/65">{roadmap.line}</p>
        <p className="mt-6 max-w-xl border-t border-foreground/10 pt-5 text-[15px] leading-7 text-foreground">
          <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-accent-secondary">
            You leave able to
          </span>
          {roadmap.outcome}
        </p>
        <p className="mt-4 max-w-xl text-sm leading-6 text-foreground/50">
          Check a topic when you can do its problem. Progress stays on this browser.
        </p>

        <section className="mt-10 border border-foreground/10 bg-surface" aria-labelledby="prereq-heading">
          <div className="flex items-center justify-between gap-4 border-b border-foreground/10 px-4 py-3 sm:px-5">
            <h2
              id="prereq-heading"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/55"
            >
              Prerequisites
            </h2>
            <p className="font-mono text-[11px] tabular-nums tracking-[0.14em] text-foreground/45">
              {donePrereqs.length}/{aimlPrerequisites.length}
            </p>
          </div>
          <ul>
            {aimlPrerequisites.map((item) => {
              const checked = donePrereqs.includes(item.id);
              const inputId = `prereq-${item.id}`;
              return (
                <li key={item.id} className="border-b border-foreground/10 last:border-b-0">
                  <div className="flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-foreground/[0.03] sm:px-5">
                    <CheckBox
                      id={inputId}
                      checked={checked}
                      onChange={() => setDonePrereqs((current) => toggleId(current, item.id))}
                    />
                    <label htmlFor={inputId} className="min-w-0 cursor-pointer">
                      <span className="block text-[15px] leading-6 text-foreground">{item.title}</span>
                      <span className="mt-0.5 block text-sm leading-6 text-foreground/60">{item.detail}</span>
                    </label>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-4 border border-foreground/10 bg-surface" aria-labelledby="progress-heading">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-4 sm:px-5">
            <h2
              id="progress-heading"
              className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground"
            >
              <TargetIcon />
              Overall progress
            </h2>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-secondary">
              {levelFor(percent)}
            </p>
            <p className="ml-auto font-mono text-sm tabular-nums text-accent">{percent}%</p>
          </div>
          <div className="px-4 sm:px-5">
            <div
              className="h-1 bg-foreground/10"
              role="progressbar"
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Overall progress"
            >
              <div
                className="h-full bg-accent transition-[width] duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 divide-x divide-foreground/10 border-t border-foreground/10">
            <Stat value={completed} label="Completed" tone="accent" />
            <Stat value={remaining} label="Remaining" tone="secondary" />
            <Stat value={aimlPhases.length} label="Milestones" tone="neutral" />
          </div>
        </section>

        <div className="mt-10 flex items-center gap-4">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
            Milestones
          </h2>
          <span className="h-px flex-1 bg-foreground/10" />
        </div>

        <ol className="mt-6">
          {aimlPhases.map((phase, index) => (
            <PhaseItem
              key={phase.id}
              phase={phase}
              index={index}
              progress={phaseProgress[index]}
              current={index === currentIndex}
              last={index === aimlPhases.length - 1}
              open={openPhases.includes(phase.id)}
              openTopics={openTopics}
              doneTopics={doneSet}
              onTogglePhase={() =>
                setOpenPhases((current) => toggleId(current, phase.id))
              }
              onToggleTopic={(id) => setOpenTopics((current) => toggleId(current, id))}
              onCheckTopic={(id) => setDoneTopics((current) => toggleId(current, id))}
            />
          ))}
        </ol>
      </div>
    </article>
  );
}

function PhaseItem({
  phase,
  index,
  progress,
  current,
  last,
  open,
  openTopics,
  doneTopics,
  onTogglePhase,
  onToggleTopic,
  onCheckTopic,
}: {
  phase: AimlPhase;
  index: number;
  progress: { done: number; total: number; complete: boolean };
  current: boolean;
  last: boolean;
  open: boolean;
  openTopics: string[];
  doneTopics: Set<string>;
  onTogglePhase: () => void;
  onToggleTopic: (id: string) => void;
  onCheckTopic: (id: string) => void;
}) {
  const panelId = `${phase.id}-panel`;
  const fill = progress.complete ? 100 : (progress.done / progress.total) * 100;

  return (
    <li className="flex gap-3 sm:gap-4" aria-current={current ? "step" : undefined}>
      <div className="flex w-8 shrink-0 flex-col items-center">
        <span
          className={`flex size-8 items-center justify-center rounded-full border font-mono text-[11px] tabular-nums ${
            progress.complete
              ? "border-accent bg-accent text-on-accent"
              : current
                ? "border-accent-secondary text-accent-secondary"
                : "border-foreground/20 text-foreground/45"
          }`}
        >
          {index + 1}
        </span>
        {last ? null : (
          <span className="relative my-1 w-0.5 flex-1 bg-foreground/15" aria-hidden="true">
            <span className="absolute inset-x-0 top-0 bg-accent" style={{ height: `${fill}%` }} />
          </span>
        )}
      </div>

      <div className={`min-w-0 flex-1 ${last ? "" : "pb-4"}`}>
        <div className="border border-foreground/10 bg-surface">
          <h3>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={onTogglePhase}
              className="flex w-full cursor-pointer items-start justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-foreground/[0.03] sm:px-5"
            >
              <span className="min-w-0">
                <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/40">
                  Phase {index + 1}
                </span>
                <span className="mt-1 block text-lg font-normal leading-snug tracking-tight sm:text-xl">
                  {phase.title}
                </span>
              </span>
              <span className="flex shrink-0 items-center gap-3 pt-1">
                <span
                  className={`font-mono text-[12px] tabular-nums tracking-[0.08em] ${
                    progress.complete ? "text-accent" : "text-foreground/45"
                  }`}
                >
                  {progress.done}/{progress.total}
                </span>
                <Chevron open={open} />
              </span>
            </button>
          </h3>
          {open ? (
            <div id={panelId} className="border-t border-foreground/10">
              <p className="px-4 pt-4 text-sm leading-6 text-foreground/60 sm:px-5">{phase.summary}</p>
              <ul className="mt-3 border-t border-foreground/10">
                {phase.topics.map((topic) => {
                  const topicOpen = openTopics.includes(topic.id);
                  const checked = doneTopics.has(topic.id);
                  const topicPanelId = `${topic.id}-detail`;
                  return (
                    <li key={topic.id} className="border-b border-foreground/10 last:border-b-0">
                      <div className="flex items-start gap-3 px-4 py-3 sm:px-5">
                        <CheckBox
                          id={`topic-${topic.id}`}
                          checked={checked}
                          onChange={() => onCheckTopic(topic.id)}
                          label={`Mark ${topic.title} complete`}
                        />
                        <button
                          type="button"
                          aria-expanded={topicOpen}
                          aria-controls={topicPanelId}
                          onClick={() => onToggleTopic(topic.id)}
                          className="flex min-w-0 flex-1 cursor-pointer items-start justify-between gap-3 text-left"
                        >
                          <span className="text-[15px] leading-6 text-foreground">{topic.title}</span>
                          <Chevron open={topicOpen} />
                        </button>
                      </div>
                      {topicOpen ? (
                        <div
                          id={topicPanelId}
                          className="border-t border-foreground/10 bg-foreground/[0.03] px-4 py-4 sm:px-5 sm:pl-12"
                        >
                          <p className="text-sm leading-6 text-foreground/70">{topic.detail}</p>
                          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-accent-secondary">
                            Problem
                          </p>
                          <p className="mt-1 text-[15px] leading-6 text-foreground">{topic.problem}</p>
                          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/40">
                            Hint
                          </p>
                          <p className="mt-1 text-sm leading-6 text-foreground/65">{topic.hint}</p>
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
}

function CheckBox({
  id,
  checked,
  onChange,
  label,
}: {
  id: string;
  checked: boolean;
  onChange: () => void;
  label?: string;
}) {
  return (
    <label className="relative mt-0.5 flex size-5 shrink-0 cursor-pointer items-center justify-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label={label}
        className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
      />
      <span className="size-[18px] rounded-full border border-foreground/30 bg-background peer-checked:border-accent peer-checked:bg-accent peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent" />
      <svg
        viewBox="0 0 12 12"
        className="pointer-events-none absolute size-2.5 text-on-accent opacity-0 peer-checked:opacity-100"
        aria-hidden="true"
      >
        <path
          d="M2.4 6.2 4.7 8.5 9.6 3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="square"
        />
      </svg>
    </label>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={`mt-1.5 size-3 shrink-0 text-foreground/40 transition-transform duration-200 ${
        open ? "rotate-180" : ""
      }`}
      aria-hidden="true"
    >
      <path
        d="M2.5 4.5 6 8l3.5-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5 text-accent" aria-hidden="true">
      <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="8" cy="8" r="1.6" fill="currentColor" />
    </svg>
  );
}

function Stat({
  value,
  label,
  tone,
}: {
  value: number;
  label: string;
  tone: "accent" | "secondary" | "neutral";
}) {
  const color =
    tone === "accent"
      ? "text-accent"
      : tone === "secondary"
        ? "text-accent-secondary"
        : "text-foreground";

  return (
    <div className="px-4 py-3 sm:px-5">
      <p className={`text-2xl tabular-nums tracking-tight ${color}`}>{value}</p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/40">
        {label}
      </p>
    </div>
  );
}
