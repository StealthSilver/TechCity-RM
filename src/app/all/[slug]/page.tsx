import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
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
    <div className="flex min-h-dvh flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-5 py-24">
        <Suspense fallback={<ComingSoon />}>
          <RoadmapBody params={params} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

async function RoadmapBody({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getCatalogRoadmap(slug)) {
    notFound();
  }

  return <ComingSoon />;
}

function ComingSoon() {
  return <p className="text-2xl tracking-tight sm:text-3xl">Coming soon</p>;
}
