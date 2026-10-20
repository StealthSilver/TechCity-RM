import { jsPDF } from "jspdf";
import type { Roadmap } from "@/data/roadmaps";
import type { TrackContent } from "@/data/track";
import {
  buildTrainerPlan,
  type DayKind,
  type PlanDuration,
  type TeachingDay,
  type TrainerPlan,
} from "@/lib/pdf/trainer-plan";

const C = {
  ink: [26, 25, 22] as [number, number, number],
  muted: [100, 104, 112] as [number, number, number],
  soft: [150, 154, 162] as [number, number, number],
  line: [218, 222, 230] as [number, number, number],
  head: [242, 244, 248] as [number, number, number],
  zebra: [249, 250, 252] as [number, number, number],
  holiday: [246, 246, 248] as [number, number, number],
  accent: [59, 99, 196] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
};

const M = 36;
const PAGE_W = 595.28;
const PAGE_H = 841.89;
const W = PAGE_W - M * 2;
const FOOTER_Y = PAGE_H - 26;
const CONTENT_BOTTOM = PAGE_H - 42;

type Doc = jsPDF & { __pageMap?: Map<string, number> };

type Col = { label: string; width: number };

function rgb(doc: jsPDF, c: [number, number, number]) {
  doc.setTextColor(c[0], c[1], c[2]);
}
function fill(doc: jsPDF, c: [number, number, number]) {
  doc.setFillColor(c[0], c[1], c[2]);
}
function stroke(doc: jsPDF, c: [number, number, number]) {
  doc.setDrawColor(c[0], c[1], c[2]);
}

async function loadLogoDataUrl(): Promise<string | null> {
  try {
    const res = await fetch("/logo.png");
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

function kindLabel(kind: DayKind) {
  switch (kind) {
    case "prereq":
      return "Prereq";
    case "teach":
      return "Teach";
    case "lab":
      return "Lab";
    case "review":
      return "Review";
    case "capstone":
      return "Capstone";
    case "holiday":
      return "Holiday";
  }
}

/** jsPDF Helvetica is WinAnsi — strip characters that break or garble output. */
function pdfSafe(text: string) {
  return text
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    .replace(/[\u201C\u201D\u201E]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/[\u2190-\u21FF\u27F0-\u27FF]/g, "->")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "");
}

function wrap(doc: jsPDF, text: string, maxWidth: number, size: number) {
  doc.setFontSize(size);
  return doc.splitTextToSize(pdfSafe(text), maxWidth) as string[];
}

function mark(doc: Doc, key: string) {
  if (!doc.__pageMap) doc.__pageMap = new Map();
  doc.__pageMap.set(key, doc.getNumberOfPages());
}

function chrome(doc: Doc, subtitle?: string) {
  const page = doc.getNumberOfPages();
  fill(doc, C.accent);
  doc.rect(0, 0, PAGE_W, 2.5, "F");

  rgb(doc, C.soft);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.text("TECHCITY ROADMAPS", M, 20);
  doc.text(subtitle ?? "TRAINER GUIDE", PAGE_W - M, 20, { align: "right" });
  stroke(doc, C.line);
  doc.setLineWidth(0.4);
  doc.line(M, 28, PAGE_W - M, 28);

  stroke(doc, C.line);
  doc.line(M, FOOTER_Y - 10, PAGE_W - M, FOOTER_Y - 10);
  rgb(doc, C.soft);
  doc.setFontSize(7.5);
  doc.text("techcity", M, FOOTER_Y);
  doc.text(String(page), PAGE_W - M, FOOTER_Y, { align: "right" });
}

function newPage(doc: Doc, subtitle?: string) {
  doc.addPage();
  chrome(doc, subtitle);
  return 44;
}

function dayTopics(day: TeachingDay) {
  if (day.kind === "holiday") return "—";
  const titles = day.topics.map((t) => t.title);
  if (titles.length === 0) return day.title.replace(/^(Teach|Lab):\s*/i, "");
  return titles.slice(0, 2).join("; ");
}

function dayTeach(day: TeachingDay) {
  if (day.kind === "holiday") return "Rest day";
  return day.teach[0] ?? "—";
}

function dayPractice(day: TeachingDay) {
  if (day.kind === "holiday") return "—";
  return day.practice[0] ?? "—";
}

function drawCover(doc: Doc, plan: TrainerPlan, logo: string | null) {
  fill(doc, C.white);
  doc.rect(0, 0, PAGE_W, PAGE_H, "F");
  fill(doc, C.accent);
  doc.rect(0, 0, PAGE_W, 2.5, "F");

  if (logo) {
    try {
      doc.addImage(logo, "PNG", M, 52, 30, 29);
    } catch {
      /* ignore */
    }
  }

  const brandX = logo ? M + 40 : M;
  rgb(doc, C.accent);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("TECHCITY", brandX, 64);
  rgb(doc, C.muted);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text("ROADMAPS", brandX, 78);

  let y = 130;
  rgb(doc, C.soft);
  doc.setFontSize(8.5);
  doc.text("TRAINER TEACHING GUIDE", M, y);
  y += 22;

  rgb(doc, C.ink);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  for (const line of wrap(doc, plan.roadmap.title, W, 24)) {
    doc.text(line, M, y);
    y += 30;
  }

  y += 8;
  rgb(doc, C.muted);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  for (const line of wrap(doc, plan.roadmap.line, W * 0.92, 11)) {
    doc.text(line, M, y);
    y += 16;
  }

  y += 28;
  stroke(doc, C.line);
  doc.setLineWidth(0.6);
  doc.line(M, y, PAGE_W - M, y);
  y += 22;

  const meta = [
    ["Duration", `${plan.duration} days`],
    ["Weeks", String(plan.weeks)],
    ["Teaching days", String(plan.totalTeachingDays)],
    ["Track", plan.roadmap.short],
  ];
  const colW = W / 4;
  for (let i = 0; i < meta.length; i += 1) {
    const x = M + i * colW;
    rgb(doc, C.soft);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text(meta[i][0].toUpperCase(), x, y);
    rgb(doc, C.ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(meta[i][1], x, y + 16);
  }

  y += 44;
  stroke(doc, C.line);
  doc.line(M, y, PAGE_W - M, y);
  y += 20;

  rgb(doc, C.muted);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  for (const line of wrap(doc, `Outcome: ${plan.roadmap.outcome}`, W, 9.5)) {
    doc.text(line, M, y);
    y += 14;
  }

  y += 18;
  rgb(doc, C.soft);
  doc.setFontSize(8.5);
  doc.text("Mon–Fri teaching  ·  Sat & Sun holiday  ·  Two weeks per page", M, y);

  rgb(doc, C.soft);
  doc.setFontSize(8);
  doc.text("Day-by-day schedule for trainers.", M, PAGE_H - 36);
}

function scheduleCols(): Col[] {
  return [
    { label: "Day", width: 26 },
    { label: "Dow", width: 28 },
    { label: "Type", width: 48 },
    { label: "Topics", width: 112 },
    { label: "How to teach", width: 140 },
    { label: "Practice", width: 96 },
    { label: "Checkpoint", width: W - 26 - 28 - 48 - 112 - 140 - 96 },
  ];
}

function drawWeekTable(
  doc: Doc,
  y: number,
  week: number,
  weekDays: TeachingDay[],
  plan: TrainerPlan,
): number {
  const cols = scheduleCols();
  const fontSize = 8;
  const lineH = 11;
  const padY = 8;
  const gapAfterHeader = 0;

  // Week title
  y += 4;
  rgb(doc, C.ink);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text(`Week ${week}`, M, y);

  const focus = [
    ...new Set(
      weekDays
        .filter((d) => d.kind === "teach")
        .map((d) => d.sectionTitle)
        .filter(Boolean),
    ),
  ]
    .slice(0, 2)
    .join("  ·  ");

  if (focus) {
    rgb(doc, C.muted);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(focus, M + 58, y);
  }

  rgb(doc, C.soft);
  doc.setFontSize(7.5);
  doc.text(`${plan.duration}-day plan`, PAGE_W - M, y, { align: "right" });
  y += 12;

  // Column header
  fill(doc, C.accent);
  doc.rect(M, y, W, 18, "F");
  rgb(doc, C.white);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  let x = M;
  for (const col of cols) {
    doc.text(col.label.toUpperCase(), x + 4, y + 12);
    x += col.width;
  }
  y += 18 + gapAfterHeader;

  for (const day of weekDays) {
    const cells = [
      String(day.day),
      day.weekday,
      kindLabel(day.kind),
      dayTopics(day),
      dayTeach(day),
      dayPractice(day),
      day.checkpoint,
    ].map((text, i) => wrap(doc, text, cols[i].width - 8, fontSize));

    const lines = Math.max(...cells.map((c) => Math.min(c.length, 2)), 1);
    const h = Math.max(lines * lineH + padY * 2, 30);

    if (day.kind === "holiday") {
      fill(doc, C.holiday);
      doc.rect(M, y, W, h, "F");
    } else if (day.day % 2 === 0) {
      fill(doc, C.zebra);
      doc.rect(M, y, W, h, "F");
    }

    stroke(doc, C.line);
    doc.setLineWidth(0.35);
    doc.rect(M, y, W, h, "S");

    x = M;
    for (let i = 0; i < cols.length; i += 1) {
      if (i > 0) doc.line(x, y, x, y + h);
      const holiday = day.kind === "holiday";
      const isKey = i <= 2;
      rgb(doc, holiday ? C.soft : isKey ? C.ink : C.muted);
      doc.setFont("helvetica", isKey && !holiday ? "bold" : "normal");
      doc.setFontSize(fontSize);
      let ty = y + padY + 8;
      for (const line of cells[i].slice(0, 2)) {
        doc.text(line, x + 4, ty);
        ty += lineH;
      }
      x += cols[i].width;
    }
    y += h;
  }

  return y + 22;
}

function drawSchedule(doc: Doc, plan: TrainerPlan) {
  const weeks = Array.from({ length: plan.weeks }, (_, i) => i + 1);
  const pairs: number[][] = [];
  for (let i = 0; i < weeks.length; i += 2) {
    pairs.push(weeks.slice(i, i + 2));
  }

  for (let p = 0; p < pairs.length; p += 1) {
    let y = newPage(
      doc,
      `WEEKS ${pairs[p][0]}${pairs[p][1] ? `–${pairs[p][1]}` : ""}`,
    );
    if (p === 0) mark(doc, "schedule");

    rgb(doc, C.accent);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.text("SCHEDULE", M, y);
    y += 14;
    rgb(doc, C.ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(
      pairs[p].length === 2
        ? `Weeks ${pairs[p][0]} & ${pairs[p][1]}`
        : `Week ${pairs[p][0]}`,
      M,
      y,
    );
    y += 10;
    rgb(doc, C.muted);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("Saturday and Sunday are holidays.", M, y);
    y += 16;

    for (const week of pairs[p]) {
      const weekDays = plan.days.filter((d) => d.week === week);
      if (weekDays.length === 0) continue;
      y = drawWeekTable(doc, y, week, weekDays, plan);
    }
  }
}

function drawClosing(doc: Doc, plan: TrainerPlan) {
  let y = newPage(doc, "CHECKLIST");
  mark(doc, "close");

  rgb(doc, C.accent);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.text("CLOSE", M, y);
  y += 14;
  rgb(doc, C.ink);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Closing checklist", M, y);
  y += 20;

  const checks =
    plan.duration === 30
      ? [
          ["Core path", "Students demo the core path end-to-end."],
          ["Gaps", "Weak review topics have a named follow-up."],
          ["Capstone", "Rubric scores recorded for the cohort."],
          ["Next", "Students know which roadmap sections to continue."],
          ["Retro", "Trainer notes: keep / cut / slow for next run."],
        ]
      : [
          ["Coverage", "Every section had a lab or review contact."],
          ["Demo", "Capstone covers happy path and one failure."],
          ["Recall", "Exit tickets show patterns without notes."],
          ["Gaps", "Outstanding gaps mapped to roadmap subtopics."],
          ["Retro", "Trainer retrospective filed for next cohort."],
        ];

  const cols: Col[] = [
    { label: "Item", width: 90 },
    { label: "Done when", width: W - 90 },
  ];

  fill(doc, C.accent);
  doc.rect(M, y, W, 18, "F");
  rgb(doc, C.white);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  let x = M;
  for (const col of cols) {
    doc.text(col.label.toUpperCase(), x + 6, y + 12);
    x += col.width;
  }
  y += 18;

  for (let r = 0; r < checks.length; r += 1) {
    const h = 32;
    if (r % 2 === 1) {
      fill(doc, C.zebra);
      doc.rect(M, y, W, h, "F");
    }
    stroke(doc, C.line);
    doc.setLineWidth(0.35);
    doc.rect(M, y, W, h, "S");
    doc.line(M + cols[0].width, y, M + cols[0].width, y + h);

    rgb(doc, C.ink);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(checks[r][0], M + 6, y + 20);

    rgb(doc, C.muted);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(checks[r][1], M + cols[0].width + 6, y + 20);
    y += h;
  }

  y += 28;
  if (y < CONTENT_BOTTOM - 40) {
    rgb(doc, C.soft);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    for (const line of wrap(
      doc,
      "Continue on TechCity Roadmaps for interactive progress tracking. This PDF is the teaching spine.",
      W,
      8.5,
    )) {
      doc.text(line, M, y);
      y += 13;
    }
  }
}

export async function generateTrainerPdf(
  roadmap: Roadmap,
  content: TrackContent,
  duration: PlanDuration,
): Promise<void> {
  const plan = buildTrainerPlan(roadmap, content, duration);
  const logo = await loadLogoDataUrl();
  const doc = new jsPDF({
    unit: "pt",
    format: "a4",
    compress: true,
  }) as Doc;
  doc.__pageMap = new Map();

  drawCover(doc, plan, logo);
  drawSchedule(doc, plan);
  drawClosing(doc, plan);

  const safeName = roadmap.short
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  doc.save(`techcity-${safeName}-trainer-${duration}-day.pdf`);
}
