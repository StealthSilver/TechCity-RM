import type { Roadmap } from "@/data/roadmaps";
import type { TrackContent, TrackSection, TrackTopic } from "@/data/track";

export type PlanDuration = 30 | 90;

export type FlatTopic = {
  sectionId: string;
  sectionTitle: string;
  sectionSummary: string;
  topic: TrackTopic;
};

export type DayKind =
  | "prereq"
  | "teach"
  | "lab"
  | "review"
  | "capstone"
  | "holiday";

export type TeachingDay = {
  day: number;
  week: number;
  weekday: string;
  title: string;
  kind: DayKind;
  sectionTitle?: string;
  topics: { title: string; detail: string; subtopics: string[] }[];
  teach: string[];
  practice: string[];
  checkpoint: string;
};

export type TrainerPlan = {
  duration: PlanDuration;
  roadmap: Pick<Roadmap, "id" | "short" | "title" | "line" | "outcome">;
  daysPerWeek: number;
  totalTeachingDays: number;
  weeks: number;
  days: TeachingDay[];
};

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const DAYS_PER_WEEK = 7;

function flattenTopics(sections: TrackSection[]): FlatTopic[] {
  return sections.flatMap((section) =>
    section.topics.map((topic) => ({
      sectionId: section.id,
      sectionTitle: section.title,
      sectionSummary: section.summary,
      topic,
    })),
  );
}

function chunk<T>(items: T[], size: number): T[][] {
  if (size <= 0) return [items];
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

function pickTopicsForDuration(
  all: FlatTopic[],
  duration: PlanDuration,
): FlatTopic[] {
  if (duration === 90 || all.length === 0) return all;
  const keep = Math.max(8, Math.ceil(all.length * 0.6));
  return all.slice(0, keep);
}

/** Day 1 = Monday. Sat/Sun are holidays. */
function isWeekend(day: number) {
  const dow = (day - 1) % 7;
  return dow >= 5;
}

function weekdayLabel(day: number) {
  return WEEKDAYS[(day - 1) % 7];
}

function teachMoves(topic: TrackTopic, kind: DayKind): string[] {
  if (kind === "holiday") {
    return ["No session. Rest and optional light revision."];
  }
  if (kind === "review") {
    return [
      "Cold recall first, then re-teach the two weakest points.",
      "Close with a timed mini-set.",
    ];
  }
  if (kind === "lab") {
    return [
      "Demo once, then students drive. Circulate with goal / blocker / next.",
    ];
  }
  if (kind === "capstone") {
    return [
      "Rubric first, silent build, then short demos with one trade-off each.",
    ];
  }
  if (kind === "prereq") {
    return [
      "Confirm tools live. Capture gaps before teaching starts.",
    ];
  }
  return [
    `Open with a problem that forces ${topic.title.toLowerCase()}.`,
    "Whiteboard the model, then code a thin slice.",
  ];
}

function practiceMoves(
  topic: TrackTopic,
  subtopics: string[],
  kind: DayKind,
): string[] {
  if (kind === "holiday") return ["Optional: skim notes from this week."];
  if (kind === "review") {
    return ["Mixed set: recall, transfer, explain-aloud."];
  }
  if (kind === "lab" || kind === "capstone") {
    return ["Ship a small working artifact for today’s brief."];
  }
  if (kind === "prereq") {
    return ["Finish setup checklist; submit one green-path proof."];
  }
  const focus = subtopics.slice(0, 3);
  return [
    focus.length
      ? `Drill: ${focus.join(" · ")}`
      : `Drill core moves in ${topic.title}.`,
  ];
}

function checkpointFor(kind: DayKind, titles: string[]): string {
  if (kind === "holiday") return "—";
  if (kind === "review") return "Can the cohort explain last week without notes?";
  if (kind === "lab") return "Does each student have a green run today?";
  if (kind === "capstone") return "Can a student demo end-to-end and defend one trade-off?";
  if (kind === "prereq") return "Is everyone past setup friction?";
  return `Can students apply ${titles[0] ?? "today’s topic"} on a fresh example?`;
}

function buildDay(
  day: number,
  title: string,
  kind: DayKind,
  flats: FlatTopic[],
): TeachingDay {
  const topics = flats.map((item) => ({
    title: item.topic.title,
    detail: item.topic.detail,
    subtopics: item.topic.subtopics.map((sub) => sub.title),
  }));
  const lead = flats[0]?.topic ?? {
    id: "none",
    title,
    detail: "",
    subtopics: [],
  };
  const subtitles = topics.flatMap((t) => t.subtopics);
  return {
    day,
    week: Math.ceil(day / DAYS_PER_WEEK),
    weekday: weekdayLabel(day),
    title,
    kind,
    sectionTitle: flats[0]?.sectionTitle,
    topics,
    teach: teachMoves(lead, kind),
    practice: practiceMoves(lead, subtitles, kind),
    checkpoint: checkpointFor(
      kind,
      topics.map((t) => t.title),
    ),
  };
}

/**
 * Calendar plan: Day 1 = Monday.
 * Sat/Sun are holidays. Teaching fills Mon–Fri only.
 */
export function buildTrainerPlan(
  roadmap: Roadmap,
  content: TrackContent,
  duration: PlanDuration,
): TrainerPlan {
  const allTopics = flattenTopics(content.sections);
  const topics = pickTopicsForDuration(allTopics, duration);

  const prereqFlats: FlatTopic[] = content.prerequisites.map((item) => ({
    sectionId: "prerequisites",
    sectionTitle: "Prerequisites",
    sectionSummary: "Confirm readiness before the teaching path starts.",
    topic: {
      id: item.id,
      title: item.title,
      detail: item.detail,
      subtopics: [],
    },
  }));

  const weekdayNumbers: number[] = [];
  for (let d = 1; d <= duration; d += 1) {
    if (!isWeekend(d)) weekdayNumbers.push(d);
  }

  // Capstone on last weekday; prereq on first weekday if needed
  const lastWeekday = weekdayNumbers[weekdayNumbers.length - 1];
  const firstWeekday = weekdayNumbers[0];
  const teachable = weekdayNumbers.filter(
    (d) => d !== lastWeekday && !(prereqFlats.length > 0 && d === firstWeekday),
  );

  // Friday reviews when possible (dow === 4 → day % 7 === 5 for Mon-start: day 5,12,19...)
  const isFriday = (d: number) => (d - 1) % 7 === 4;
  const reviewDays = new Set(
    teachable.filter((d) => isFriday(d) && d !== lastWeekday),
  );

  const labEvery = duration === 90 ? 3 : 0;
  let pureTeachSlots = teachable.filter((d) => !reviewDays.has(d)).length;
  if (labEvery > 0) {
    pureTeachSlots = Math.max(1, Math.floor(pureTeachSlots * 0.75));
  }
  const perDay = Math.max(1, Math.ceil(topics.length / Math.max(1, pureTeachSlots)));
  const batches = chunk(topics, perDay);

  const days: TeachingDay[] = [];
  let batchIndex = 0;
  let teachSinceLab = 0;

  for (let day = 1; day <= duration; day += 1) {
    if (isWeekend(day)) {
      days.push(
        buildDay(day, "Holiday — no session", "holiday", []),
      );
      continue;
    }

    if (day === lastWeekday) {
      days.push(
        buildDay(
          day,
          duration === 30
            ? "Capstone sprint & demo"
            : "Final capstone, demo & debrief",
          "capstone",
          topics.slice(-Math.min(3, Math.max(1, topics.length))),
        ),
      );
      continue;
    }

    if (day === firstWeekday && prereqFlats.length > 0) {
      days.push(
        buildDay(
          day,
          "Prerequisites & environment check",
          "prereq",
          prereqFlats,
        ),
      );
      continue;
    }

    if (reviewDays.has(day)) {
      const recent = days
        .filter((d) => d.kind === "teach")
        .slice(-3)
        .flatMap((d) =>
          d.topics.map((t) => ({
            sectionId: "review",
            sectionTitle: "Weekly review",
            sectionSummary: "Consolidate and close gaps.",
            topic: {
              id: `review-${t.title}`,
              title: t.title,
              detail: t.detail,
              subtopics: t.subtopics.map((title) => ({ id: title, title })),
            },
          })),
        );
      days.push(
        buildDay(
          day,
          `Week ${Math.ceil(day / DAYS_PER_WEEK)} review & gap close`,
          "review",
          recent.length ? recent.slice(0, 4) : topics.slice(0, 1),
        ),
      );
      continue;
    }

    if (
      labEvery > 0 &&
      teachSinceLab >= labEvery &&
      batchIndex > 0
    ) {
      const lastBatch =
        batches[Math.max(0, batchIndex - 1)] ?? topics.slice(0, 1);
      const sectionHint = lastBatch[0]?.sectionTitle ?? "path";
      days.push(
        buildDay(day, `Lab: apply ${sectionHint}`, "lab", lastBatch),
      );
      teachSinceLab = 0;
      continue;
    }

    if (batchIndex < batches.length) {
      const batch = batches[batchIndex];
      const sectionHint = batch[0]?.sectionTitle ?? "Path";
      const title =
        batch.length === 1
          ? `Teach: ${batch[0].topic.title}`
          : `Teach: ${sectionHint}`;
      days.push(buildDay(day, title, "teach", batch));
      batchIndex += 1;
      teachSinceLab += 1;
      continue;
    }

    days.push(
      buildDay(
        day,
        "Flex lab / catch-up",
        "lab",
        topics.slice(-Math.min(2, topics.length)),
      ),
    );
  }

  return {
    duration,
    roadmap: {
      id: roadmap.id,
      short: roadmap.short,
      title: roadmap.title,
      line: roadmap.line,
      outcome: roadmap.outcome,
    },
    daysPerWeek: DAYS_PER_WEEK,
    totalTeachingDays: days.filter((d) => d.kind !== "holiday").length,
    weeks: Math.ceil(duration / DAYS_PER_WEEK),
    days,
  };
}
