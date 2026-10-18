import SectionHeading from "@/components/SectionHeading";

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-foreground/10">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:py-24">
        <SectionHeading
          index="01"
          label="About"
          title="A path for the subject, written in the order the work actually happens."
        />
        <p className="max-w-md text-[15px] leading-7 text-foreground/65 lg:pb-1">
          TechCity Roadmaps is for students. Each subject is one sequence of
          problems, and new subjects join the same way. You always know the
          step you are on.
        </p>
      </div>
    </section>
  );
}
