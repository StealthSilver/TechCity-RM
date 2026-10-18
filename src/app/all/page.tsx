import type { Metadata } from "next";
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
      <Navbar cta={{ href: "/login", label: "Login" }} />
      <main className="flex-1">
        <h1 className="sr-only">Roadmaps</h1>
        <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-5 pt-28 pb-12 sm:grid-cols-3 sm:gap-5 sm:px-8 sm:pt-32">
          {catalog.map((roadmap) => (
            <li key={roadmap.id}>
              <RoadmapCard id={roadmap.id} title={roadmap.title} />
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
