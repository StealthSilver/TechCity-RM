import type { Metadata } from "next";
import { Suspense } from "react";
import AuthQueryOpener from "@/components/auth/AuthQueryOpener";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import RoadmapCard from "@/components/RoadmapArt";
import { catalog } from "@/data/catalog";

export const metadata: Metadata = {
  title: "All roadmaps",
  description:
    "Six student roadmaps. DSA, AI-ML, cloud, and fullstack in MERN, Python, and Java.",
};

export default function AllRoadmapsPage() {
  return (
    <div className="flex min-h-full flex-col bg-background font-sans text-foreground">
      <Navbar cta="auth" sections={false} />
      <Suspense fallback={null}>
        <AuthQueryOpener />
      </Suspense>
      <main className="flex-1">
        <h1 className="sr-only">Roadmaps</h1>
        <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-3 px-3 pt-20 pb-6 sm:grid-cols-2 sm:gap-4 sm:px-6 sm:pt-28 sm:pb-8 md:gap-5 md:px-8 md:pt-32 lg:grid-cols-3">
          {catalog.map((roadmap) => (
            <li key={roadmap.id}>
              <RoadmapCard id={roadmap.id} title={roadmap.title} />
            </li>
          ))}
        </ul>

        <p className="mx-auto max-w-5xl px-3 pb-[max(2.5rem,env(safe-area-inset-bottom))] text-center font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/40 sm:px-6 sm:pb-12 md:px-8">
          More subjects coming
        </p>
      </main>
      <Footer />
    </div>
  );
}
