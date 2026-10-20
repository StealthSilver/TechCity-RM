"use client";

import { useLayoutEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import type { Roadmap } from "@/data/roadmaps";
import {
  trackPrerequisiteIds,
  trackSubtopicIds,
  type TrackContent,
  type TrackSection,
  type TrackTopic,
} from "@/data/track";

type Progress = {
  subtopics: string[];
  prereqs: string[];
};

function progressKey(studentId: string, trackId: string) {
  return `techcity-rm-progress:${studentId}:${trackId}`;
}

function loadProgress(key: string, content: TrackContent): Progress {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return { subtopics: [], prereqs: [] };
    const parsed = JSON.parse(raw) as Partial<Progress>;
    const subSet = new Set(trackSubtopicIds(content));
    const prereqSet = new Set(trackPrerequisiteIds(content));
    return {
      subtopics: (parsed.subtopics ?? []).filter((id) => subSet.has(id)),
      prereqs: (parsed.prereqs ?? []).filter((id) => prereqSet.has(id)),
    };
  } catch {
    return { subtopics: [], prereqs: [] };
  }
}

function toggleId(list: string[], id: string) {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
}

function tierBuckets(sections: TrackSection[]) {
  const n = sections.length;
  if (n === 0) return { basic: [], core: [], pro: [] };
  const a = Math.ceil(n / 3);
  const b = Math.ceil((2 * n) / 3);
  return {
    basic: sections.slice(0, a),
    core: sections.slice(a, b),
    pro: sections.slice(b),
  };
}

function countDone(sections: TrackSection[], done: Set<string>) {
  const ids = sections.flatMap((section) =>
    section.topics.flatMap((topic) => topic.subtopics.map((sub) => sub.id)),
  );
  return {
    done: ids.filter((id) => done.has(id)).length,
    total: ids.length,
  };
}

export default function TrackRoadmap({
  roadmap,
  content,
}: {
  roadmap: Roadmap;
  content: TrackContent;
}) {
  const { student } = useAuth();
  const studentId = student?.id ?? null;
  const storageKey = studentId ? progressKey(studentId, content.id) : null;
  const allSubtopics = trackSubtopicIds(content);

  const [doneSubs, setDoneSubs] = useState<string[]>([]);
  const [donePrereqs, setDonePrereqs] = useState<string[]>([]);
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [openTopics, setOpenTopics] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    if (!storageKey) {
      setDoneSubs([]);
      setDonePrereqs([]);
      setOpenSections(
        content.sections[0]?.id ? [content.sections[0].id] : [],
      );
      setReady(false);
      return;
    }

    const saved = loadProgress(storageKey, content);
    setDoneSubs(saved.subtopics);
    setDonePrereqs(saved.prereqs);
    const current = content.sections.find((section) =>
      section.topics.some((topic) =>
        topic.subtopics.some((sub) => !saved.subtopics.includes(sub.id)),
      ),
    );
    setOpenSections(
      [current?.id ?? content.sections[0]?.id].filter(Boolean) as string[],
    );
    setReady(true);
  }, [content, storageKey]);

  useLayoutEffect(() => {
    if (!ready || !storageKey) return;
    localStorage.setItem(
      storageKey,
      JSON.stringify({ subtopics: doneSubs, prereqs: donePrereqs }),
    );
  }, [ready, doneSubs, donePrereqs, storageKey]);

  const total = allSubtopics.length;
  const completed = doneSubs.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const doneSet = useMemo(() => new Set(doneSubs), [doneSubs]);

  const tiers = useMemo(() => {
    const buckets = tierBuckets(content.sections);
    return {
      basic: countDone(buckets.basic, doneSet),
      core: countDone(buckets.core, doneSet),
      pro: countDone(buckets.pro, doneSet),
    };
  }, [content.sections, doneSet]);

  const sectionProgress = content.sections.map((section) => {
    const ids = section.topics.flatMap((topic) =>
      topic.subtopics.map((sub) => sub.id),
    );
    const done = ids.filter((id) => doneSet.has(id)).length;
    return {
      done,
      total: ids.length,
      complete: ids.length > 0 && done === ids.length,
    };
  });

  return (
    <article className="mx-auto w-full max-w-4xl overflow-x-clip px-3 pt-20 pb-10 sm:px-6 sm:pt-28 sm:pb-12 md:px-8 md:pt-32">
      <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/45 sm:text-[11px] sm:tracking-[0.16em]">
        <Link
          href="/all"
          className="py-1 transition-colors hover:text-accent"
        >
          Roadmaps
        </Link>
        <span className="text-foreground/20" aria-hidden="true">
          /
        </span>
        <span className="text-foreground/70">{roadmap.short}</span>
      </nav>

      <header className="mt-4 sm:mt-6">
        <h1 className="text-balance text-[1.55rem] font-normal leading-[1.15] tracking-tight sm:text-[2.5rem] sm:leading-[1.05] md:text-[2.75rem]">
          {roadmap.title}
        </h1>
      </header>

      <section
        className="mt-6 border border-foreground/10 bg-surface sm:mt-8"
        aria-labelledby="progress-heading"
      >
        <div className="px-3.5 py-4 sm:px-5 sm:py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                id="progress-heading"
                className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent sm:text-[11px]"
              >
                Progress
              </h2>
              <p className="mt-2 flex items-baseline gap-1.5">
                <span className="text-[2.15rem] tabular-nums leading-none tracking-tight text-foreground sm:text-[2.75rem]">
                  {percent}
                </span>
                <span className="text-sm tabular-nums text-accent/50 sm:text-base">%</span>
              </p>
            </div>
            <div className="pt-5 text-right sm:pt-7">
              <p className="font-mono text-[11px] tabular-nums tracking-[0.08em] text-foreground sm:text-[13px]">
                {completed}
                <span className="text-foreground/35"> / {total}</span>
              </p>
              <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-accent/55">
                completed
              </p>
            </div>
          </div>

          <div
            className="relative mt-5 h-2 rounded-full bg-foreground/[0.08]"
            role="progressbar"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Overall progress"
          >
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-accent transition-[width] duration-500 ease-out"
              style={{ width: `${percent}%` }}
            />
            <div
              className="pointer-events-none absolute top-1/2 size-3.5 -translate-y-1/2 rounded-full border-[2.5px] border-accent bg-surface shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_18%,transparent)] transition-[left] duration-500 ease-out"
              style={{
                left: `clamp(0px, calc(${percent}% - 0.4375rem), calc(100% - 0.875rem))`,
              }}
              aria-hidden="true"
            />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-px overflow-hidden rounded-md border border-foreground/10 bg-foreground/10">
            <TierChip label="Basic" done={tiers.basic.done} total={tiers.basic.total} tone="teal" />
            <TierChip label="Core" done={tiers.core.done} total={tiers.core.total} tone="accent" />
            <TierChip label="Pro" done={tiers.pro.done} total={tiers.pro.total} tone="amber" />
          </div>
        </div>
      </section>

      {content.prerequisites.length > 0 ? (
        <section
          className="mt-3 border border-foreground/10 bg-surface sm:mt-4"
          aria-labelledby="prereq-heading"
        >
          <div className="flex items-center justify-between gap-3 border-b border-teal-500/25 px-3.5 py-2 sm:px-5">
            <h2
              id="prereq-heading"
              className="font-mono text-[10px] uppercase tracking-[0.16em] text-teal-600 dark:text-teal-400/90 sm:text-[11px]"
            >
              Prerequisites
            </h2>
            <p className="font-mono text-[10px] tabular-nums text-teal-700/55 dark:text-teal-300/50 sm:text-[11px]">
              {donePrereqs.length}/{content.prerequisites.length}
            </p>
          </div>
          <ul>
            {content.prerequisites.map((item) => {
              const checked = donePrereqs.includes(item.id);
              const inputId = `${content.id}-prereq-${item.id}`;
              return (
                <li
                  key={item.id}
                  className="flex items-center gap-2.5 border-b border-foreground/10 px-3.5 py-1.5 last:border-b-0 sm:gap-3 sm:px-5 sm:py-2"
                >
                  <CheckBox
                    id={inputId}
                    checked={checked}
                    onChange={() =>
                      setDonePrereqs((current) => toggleId(current, item.id))
                    }
                    label={`Mark ${item.title} complete`}
                    tone="teal"
                  />
                  <label
                    htmlFor={inputId}
                    className={`min-w-0 flex-1 cursor-pointer text-[13px] leading-5 sm:text-[14px] ${
                      checked
                        ? "text-foreground/40 line-through decoration-foreground/20"
                        : "text-foreground/80"
                    }`}
                  >
                    {item.title}
                  </label>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <div className="mt-3 border border-foreground/10 bg-surface sm:mt-4">
        <div className="flex items-center justify-between gap-3 border-b border-accent/20 px-3.5 py-2 sm:px-5">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent sm:text-[11px]">
            Path
          </h2>
          <p className="font-mono text-[10px] tabular-nums text-foreground/40 sm:text-[11px]">
            {content.sections.length} sections
          </p>
        </div>
        <ul>
          {content.sections.map((section, index) => (
            <SectionRow
              key={section.id}
              section={section}
              progress={sectionProgress[index]}
              open={openSections.includes(section.id)}
              openTopics={openTopics}
              doneSubs={doneSet}
              onToggle={() =>
                setOpenSections((current) => toggleId(current, section.id))
              }
              onToggleTopic={(id) =>
                setOpenTopics((current) => toggleId(current, id))
              }
              onCheckSub={(id) =>
                setDoneSubs((current) => toggleId(current, id))
              }
            />
          ))}
        </ul>
      </div>
    </article>
  );
}

function TierChip({
  label,
  done,
  total,
  tone = "accent",
}: {
  label: string;
  done: number;
  total: number;
  tone?: "teal" | "accent" | "amber";
}) {
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  const bar =
    tone === "teal"
      ? "bg-teal-600 dark:bg-teal-400"
      : tone === "amber"
        ? "bg-amber-600 dark:bg-amber-400"
        : "bg-accent";
  const labelColor =
    tone === "teal"
      ? "text-teal-700/70 dark:text-teal-300/60"
      : tone === "amber"
        ? "text-amber-800/70 dark:text-amber-300/60"
        : "text-accent/70";

  return (
    <div className="min-w-0 bg-surface px-2.5 py-2.5 sm:px-3 sm:py-3">
      <div className="flex items-baseline justify-between gap-1.5">
        <span
          className={`font-mono text-[9px] uppercase tracking-[0.14em] sm:text-[10px] ${labelColor}`}
        >
          {label}
        </span>
        <span className="font-mono text-[10px] tabular-nums text-foreground/55 sm:text-[11px]">
          {done}
          <span className="text-foreground/30">/{total}</span>
        </span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-foreground/[0.08]">
        <div
          className={`h-full rounded-full transition-[width] duration-500 ease-out ${bar}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function SectionRow({
  section,
  progress,
  open,
  openTopics,
  doneSubs,
  onToggle,
  onToggleTopic,
  onCheckSub,
}: {
  section: TrackSection;
  progress: { done: number; total: number; complete: boolean };
  open: boolean;
  openTopics: string[];
  doneSubs: Set<string>;
  onToggle: () => void;
  onToggleTopic: (id: string) => void;
  onCheckSub: (id: string) => void;
}) {
  const panelId = `${section.id}-panel`;

  return (
    <li className="border-b border-foreground/10 last:border-b-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex min-h-12 w-full cursor-pointer items-start justify-between gap-3 px-3.5 py-3.5 text-left transition-colors hover:bg-foreground/[0.03] active:bg-foreground/[0.04] sm:min-h-0 sm:items-center sm:px-5 sm:py-4"
      >
        <span className="flex min-w-0 items-start gap-2.5 sm:items-center sm:gap-3">
          <Chevron open={open} className="mt-1 sm:mt-0" />
          <span className="min-w-0">
            <span
              className={`block text-[14px] leading-snug tracking-tight sm:text-base ${
                progress.complete ? "text-foreground/55" : "text-foreground"
              }`}
            >
              {section.title}
            </span>
            {open && section.summary ? (
              <span className="mt-1 block text-[12px] leading-5 text-foreground/50 sm:text-[13px] sm:leading-6">
                {section.summary}
              </span>
            ) : null}
          </span>
        </span>
        <span
          className={`mt-0.5 shrink-0 font-mono text-[11px] tabular-nums sm:mt-0 sm:text-[12px] ${
            progress.complete ? "text-accent" : "text-foreground/45"
          }`}
        >
          {progress.done}/{progress.total}
        </span>
      </button>

      {open ? (
        <div
          id={panelId}
          className="border-t border-foreground/10 bg-foreground/[0.02]"
        >
          <ul>
            {section.topics.map((topic) => (
              <TopicRow
                key={topic.id}
                topic={topic}
                open={openTopics.includes(topic.id)}
                doneSubs={doneSubs}
                onToggle={() => onToggleTopic(topic.id)}
                onCheckSub={onCheckSub}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

function TopicRow({
  topic,
  open,
  doneSubs,
  onToggle,
  onCheckSub,
}: {
  topic: TrackTopic;
  open: boolean;
  doneSubs: Set<string>;
  onToggle: () => void;
  onCheckSub: (id: string) => void;
}) {
  const done = topic.subtopics.filter((sub) => doneSubs.has(sub.id)).length;
  const total = topic.subtopics.length;
  const complete = total > 0 && done === total;
  const panelId = `${topic.id}-panel`;

  return (
    <li className="border-b border-foreground/10 last:border-b-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex min-h-11 w-full cursor-pointer items-start justify-between gap-3 px-3.5 py-3 text-left transition-colors hover:bg-foreground/[0.03] active:bg-foreground/[0.04] sm:min-h-0 sm:items-center sm:px-5 sm:pl-10 sm:py-3"
      >
        <span className="flex min-w-0 items-start gap-2.5 sm:items-center sm:gap-3">
          <Chevron open={open} small className="mt-1 sm:mt-0" />
          <span
            className={`min-w-0 text-[13px] leading-snug tracking-tight sm:text-[15px] ${
              complete ? "text-foreground/50" : "text-foreground/90"
            }`}
          >
            {topic.title}
          </span>
        </span>
        <span
          className={`mt-0.5 shrink-0 font-mono text-[10px] tabular-nums sm:mt-0 sm:text-[11px] ${
            complete ? "text-accent" : "text-foreground/40"
          }`}
        >
          {done}/{total}
        </span>
      </button>

      {open ? (
        <ul
          id={panelId}
          className="border-t border-foreground/10 bg-background/50"
        >
          {topic.subtopics.map((sub) => {
            const checked = doneSubs.has(sub.id);
            const inputId = `sub-${sub.id}`;
            return (
              <li
                key={sub.id}
                className="flex items-start gap-3 border-b border-foreground/10 px-3.5 py-3 last:border-b-0 sm:items-center sm:px-5 sm:py-2.5 sm:pl-14"
              >
                <CheckBox
                  id={inputId}
                  checked={checked}
                  onChange={() => onCheckSub(sub.id)}
                  label={`Mark ${sub.title} complete`}
                />
                <label
                  htmlFor={inputId}
                  className={`min-w-0 flex-1 cursor-pointer text-[13px] leading-5 sm:text-[14px] sm:leading-6 ${
                    checked
                      ? "text-foreground/40 line-through decoration-foreground/20"
                      : "text-foreground/80"
                  }`}
                >
                  {sub.title}
                </label>
              </li>
            );
          })}
        </ul>
      ) : null}
    </li>
  );
}

function CheckBox({
  id,
  checked,
  onChange,
  label,
  tone = "accent",
}: {
  id: string;
  checked: boolean;
  onChange: () => void;
  label?: string;
  tone?: "accent" | "teal";
}) {
  const checkedTone =
    tone === "teal"
      ? "peer-checked:border-teal-600 peer-checked:bg-teal-600 dark:peer-checked:border-teal-400 dark:peer-checked:bg-teal-400"
      : "peer-checked:border-accent peer-checked:bg-accent";
  const focusTone =
    tone === "teal"
      ? "peer-focus-visible:outline-teal-600 dark:peer-focus-visible:outline-teal-400"
      : "peer-focus-visible:outline-accent";

  return (
    <label className="relative mt-0.5 flex size-6 shrink-0 cursor-pointer items-center justify-center sm:mt-0 sm:size-5">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label={label}
        className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
      />
      <span
        className={`size-[18px] border border-foreground/30 bg-background peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 sm:size-[17px] ${checkedTone} ${focusTone}`}
      />
      <svg
        viewBox="0 0 12 12"
        className={`pointer-events-none absolute size-2.5 opacity-0 peer-checked:opacity-100 ${
          tone === "teal" ? "text-white dark:text-[#0a1210]" : "text-on-accent"
        }`}
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

function Chevron({
  open,
  small = false,
  className = "",
}: {
  open: boolean;
  small?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={`shrink-0 text-foreground/40 transition-transform duration-200 ${
        small ? "size-2.5" : "size-3"
      } ${open ? "rotate-90" : ""} ${className}`}
      aria-hidden="true"
    >
      <path
        d="M4.5 2.5 8 6l-3.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}
