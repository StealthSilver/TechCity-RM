import SectionHeading from "@/components/SectionHeading";

const steps = [
  {
    index: "01",
    title: "A path, not a playlist",
    body: "The stages are ordered. Arrays come before graphs. SQL comes before a pipeline. You do not pick the next video from a pile.",
  },
  {
    index: "02",
    title: "The next problem is already chosen",
    body: "Open the roadmap and the current stage has the problem to do. The hint tells you how to start. It does not hand you the solution.",
  },
  {
    index: "03",
    title: "Done, now, and later stay visible",
    body: "Blue is finished. Orange is the stage you are on. Everything after it stays on the path, so a week away does not lose the order.",
  },
];

export default function HowItWorks() {
  return (
    <section id="working" className="scroll-mt-24 border-t border-foreground/10">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:py-24">
        <SectionHeading
          index="02"
          label="Working"
          title="You always know the step you are on."
        />

        <ol className="mt-10 grid gap-px bg-foreground/10 sm:mt-12 md:grid-cols-3">
          {steps.map((step) => (
            <li key={step.index} className="bg-background py-6 sm:py-8 md:px-5 lg:px-6 md:first:pl-0 md:last:pr-0">
              <p className="font-mono text-[11px] tracking-[0.16em] text-accent">{step.index}</p>
              <h3 className="mt-3 max-w-xs text-lg font-normal leading-snug tracking-tight sm:mt-4 sm:text-xl">
                {step.title}
              </h3>
              <p className="mt-3 max-w-sm text-[15px] leading-7 text-foreground/65">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-6 border border-foreground/10 bg-surface sm:mt-8">
          <div className="grid md:grid-cols-2">
            <article className="border-b border-foreground/10 p-5 sm:p-8 md:border-r md:border-b-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-secondary">
                For a student
              </p>
              <h3 className="mt-3 text-xl font-normal tracking-tight sm:mt-4 sm:text-2xl">
                Start where you already are.
              </h3>
              <p className="mt-3 max-w-md text-[15px] leading-7 text-foreground/65">
                DSA, AI-ML, cloud, and data are the same kind of path. Open one,
                move to the stage you can do, and the next problem is waiting.
              </p>
            </article>
            <article id="students" className="scroll-mt-24 p-5 sm:p-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                For a college
              </p>
              <h3 className="mt-3 text-xl font-normal tracking-tight sm:mt-4 sm:text-2xl">
                The trainer sees the same stage.
              </h3>
              <p className="mt-3 max-w-md text-[15px] leading-7 text-foreground/65">
                A cohort sits on one roadmap. The lab that week is the stage the
                section is on, reviewed the way a teammate would review it.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
