import About from "@/components/About";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Topics from "@/components/Topics";

export default function Home() {
  return (
    <div id="top" className="flex min-h-full flex-col bg-background font-sans text-foreground">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Topics />
        <Features />
      </main>
      <Footer showThemeToggle={false} />
    </div>
  );
}
