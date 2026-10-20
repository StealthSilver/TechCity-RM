import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import RoadmapGate from "@/components/auth/RoadmapGate";
import ComingSoonMinimal from "@/components/ComingSoonMinimal";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TrackRoadmap from "@/components/TrackRoadmap";
import { catalog, getCatalogRoadmap } from "@/data/catalog";
import { getTrack } from "@/data/tracks";

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
    <div className="flex min-h-dvh flex-col bg-background font-sans text-foreground">
      <Navbar cta="auth" sections={false} />
      <main className="flex flex-1 flex-col">
        <Suspense fallback={<PageFallback />}>
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
  const track = getTrack(slug);
  if (!roadmap || !track) {
    notFound();
  }

  return (
    <RoadmapGate>
      <TrackRoadmap roadmap={roadmap} content={track} />
      <ComingSoonMinimal />
    </RoadmapGate>
  );
}

function PageFallback() {
  return (
    <div className="flex flex-1 items-center justify-center px-5 py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
        Loading
      </p>
    </div>
  );
}
