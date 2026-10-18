import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import AimlRoadmap from "@/components/AimlRoadmap";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import RoadmapSession from "@/components/RoadmapSession";
import { catalog, getCatalogRoadmap } from "@/data/catalog";

export function generateStaticParams() {
  return catalog.map((roadmap) => ({ slug: roadmap.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const roadmap = getCatalogRoadmap(slug);
  if (!roadmap) {
    return { title: "Roadmap" };
  }

  return {
    title: roadmap.title,
    description: roadmap.line,
  };
}

export default function RoadmapPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="flex min-h-full flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<RoadmapFallback />}>
          <RoadmapBody params={params} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

async function RoadmapBody({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const roadmap = getCatalogRoadmap(slug);
  if (!roadmap) {
    notFound();
  }

  const others = catalog.filter((item) => item.id !== roadmap.id);

  if (roadmap.id === "aiml") {
    return (
      <>
        <AimlRoadmap roadmap={roadmap} />
        <OtherRoadmaps others={others} />
      </>
    );
  }

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:gap-16 lg:py-20">
        <div>
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
          <p className="mt-5 max-w-md text-[15px] leading-7 text-foreground/65">{roadmap.line}</p>
          <p className="mt-6 max-w-md border-t border-foreground/10 pt-5 text-[15px] leading-7 text-foreground">
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.16em] text-accent-secondary">
              You leave able to
            </span>
            {roadmap.outcome}
          </p>
        </div>
        <RoadmapSession roadmap={roadmap} />
      </section>
      <OtherRoadmaps others={others} />
    </>
  );
}

function OtherRoadmaps({ others }: { others: typeof catalog }) {
  return (
    <section className="border-t border-foreground/10" aria-label="Other roadmaps">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/45">
          Other roadmaps
        </p>
        <ul className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {others.map((item) => (
            <li key={item.id} className="shrink-0">
              <Link
                href={`/all/${item.id}`}
                className="inline-flex border border-foreground/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-foreground/60 transition-colors hover:border-foreground/40 hover:text-foreground"
              >
                {item.short}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function RoadmapFallback() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:py-20">
      <div>
        <div className="h-3 w-28 bg-foreground/10" />
        <div className="mt-8 h-3 w-16 bg-accent/30" />
        <div className="mt-4 h-12 w-full max-w-md bg-foreground/10" />
        <div className="mt-6 h-20 w-full max-w-sm bg-foreground/5" />
      </div>
      <div className="min-h-80 border border-foreground/10 bg-surface" />
    </section>
  );
}
