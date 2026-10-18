import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div id="top" className="flex min-h-full flex-col bg-[#03060f] font-sans text-[#f4f7fb]">
      <Navbar />
      <main className="flex-1">
        <Hero />
      </main>
    </div>
  );
}
