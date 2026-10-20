"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Roadmap } from "@/data/roadmaps";
import type { TrackContent } from "@/data/track";
import type { PlanDuration } from "@/lib/pdf/trainer-plan";

export default function ExportPdfButton({
  roadmap,
  content,
}: {
  roadmap: Roadmap;
  content: TrackContent;
}) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function download(duration: PlanDuration) {
    setError(null);
    setOpen(false);
    setPending(true);
    try {
      const { generateTrainerPdf } = await import(
        "@/lib/pdf/generate-trainer-pdf"
      );
      await generateTrainerPdf(roadmap, content, duration);
    } catch (err) {
      console.error("PDF export failed", err);
      setError("Could not build the PDF. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div ref={rootRef} className="relative w-full sm:w-auto">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        disabled={pending}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-10 w-full items-center justify-center gap-2 border border-foreground/15 bg-surface px-3.5 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground transition-colors hover:border-accent/40 hover:text-accent disabled:cursor-wait disabled:opacity-60 sm:h-9 sm:w-auto sm:justify-start sm:text-[11px]"
      >
        <DownloadIcon className="size-3.5 opacity-70" />
        {pending ? "Preparing…" : "Export as PDF"}
        <Chevron open={open} />
      </button>

      {open ? (
        <div
          id={menuId}
          role="menu"
          aria-label="Choose plan duration"
          className="absolute left-0 right-0 z-40 mt-1.5 w-full overflow-hidden border border-foreground/12 bg-surface shadow-[0_12px_40px_-18px_rgba(0,0,0,0.35)] sm:left-auto sm:right-0 sm:w-[17.5rem]"
        >
          <p className="border-b border-foreground/8 px-3.5 py-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-foreground/40">
            Trainer teaching guide
          </p>
          <MenuItem
            duration={30}
            subtitle="Intensive core path"
            onSelect={() => download(30)}
          />
          <MenuItem
            duration={90}
            subtitle="Full roadmap with labs"
            onSelect={() => download(90)}
          />
        </div>
      ) : null}

      {error ? (
        <p className="mt-2 font-mono text-[10px] text-amber-700 dark:text-amber-400/90" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function MenuItem({
  duration,
  subtitle,
  onSelect,
}: {
  duration: PlanDuration;
  subtitle: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onSelect}
      className="flex w-full items-start gap-3 border-b border-foreground/8 px-3.5 py-3 text-left transition-colors last:border-b-0 hover:bg-foreground/[0.03]"
    >
      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center bg-accent/10 font-mono text-[11px] tabular-nums text-accent">
        {duration}
      </span>
      <span className="min-w-0">
        <span className="block text-[13px] tracking-tight text-foreground">
          {duration}-day plan
        </span>
        <span className="mt-0.5 block text-[11px] leading-4 text-foreground/50">
          {subtitle}
        </span>
      </span>
    </button>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={`size-2.5 text-foreground/45 transition-transform duration-200 ${
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

function DownloadIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" fill="none">
      <path
        d="M8 2.5v7M8 9.5 5.5 7M8 9.5 10.5 7M3 12.5h10"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinecap="square"
      />
    </svg>
  );
}
