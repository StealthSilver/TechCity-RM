import CtaLink from "@/components/CtaLink";
import Hyperspeed from "@/components/Hyperspeed";

export default function Hero() {
  return (
    <section className="relative isolate h-[100svh] min-h-[36rem] overflow-hidden bg-[#08080a] text-white">
      <Hyperspeed
        curve="winding"
        curvature={1}
        speed={0.22}
        milestones={[
          "Arrays",
          "Strings",
          "Linked lists",
          "Stacks",
          "Hash maps",
          "Trees",
          "Graphs",
          "Dynamic programming",
        ]}
        boost={3}
        fov={90}
        boostFov={130}
        lanes={3}
        roadWidth={10}
        medianWidth={2}
        density={40}
        trailLength={1}
        lightSize={1}
        poles={20}
        dust={100}
        glow={0.6}
        reflections={0.5}
        roadOpacity={0.1}
        steer={0.35}
        tailColors={["#d856bf", "#6750a2", "#c247ac"]}
        headColors={["#03b3c3", "#0e5ea5", "#324555"]}
        poleColors={["#03b3c3"]}
        interactive
        roadColor="#08080a"
        lineColor="#25252d"
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(8,8,10,0.92)_0%,rgba(8,8,10,0.42)_22%,transparent_48%)]" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-end px-5 pb-16 pt-24 sm:px-8 sm:pb-20">
        <div className="max-w-xl">
          <h1 className="max-w-[12ch] text-[2.6rem] font-normal leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.5rem]">
            A path for every subject you study.
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-white/70 sm:text-lg">
            One sequence of problems, from the first lesson to the work.
          </p>
          <div className="pointer-events-auto mt-8">
            <CtaLink href="/all" size="lg">
              Get started
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
