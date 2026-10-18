import Link from "next/link";
import { catalog } from "@/data/catalog";

const columns =
  "grid grid-cols-[2.75rem_minmax(12rem,1.15fr)_minmax(14rem,1.7fr)_4.5rem] items-center gap-4 px-5";

export default function Topics() {
  return (
    <section id="subjects" className="scroll-mt-24 bg-[#08080a] text-white">
      <div className="mx-auto max-w-7xl px-5 py-20 text-left sm:px-8 sm:py-28">
        <h2 className="max-w-3xl text-[1.85rem] font-normal leading-[1.18] tracking-tight sm:text-[2.35rem] lg:text-[2.7rem] lg:leading-[1.12]">
          <span className="text-white">Six subjects. </span>
          <span className="text-[#8a8f98]">The same kind of path.</span>
        </h2>

        <div className="mt-14 overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#0e1014] sm:mt-16">
          <div className="min-w-[40rem]" role="table" aria-label="Subjects">
            <div
              role="row"
              className={`${columns} border-b border-white/[0.08] py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-[#8a8f98]`}
            >
              <span role="columnheader" />
              <span role="columnheader">Subject</span>
              <span role="columnheader">Path</span>
              <span role="columnheader" className="text-right">
                Stages
              </span>
            </div>
            {catalog.map((roadmap, index) => (
              <Link
                key={roadmap.id}
                href={`/all/${roadmap.id}`}
                className={`${columns} border-b border-white/[0.08] py-4 transition-colors last:border-b-0 hover:bg-white/[0.04]`}
              >
                <span className="font-mono text-[11px] text-[#8a8f98]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] tracking-tight text-white">{roadmap.title}</span>
                <span className="text-[13px] leading-6 text-[#8a8f98]">{roadmap.line}</span>
                <span className="text-right font-mono text-[11px] tracking-[0.14em] text-[#8a8f98]">
                  {String(roadmap.stages.length).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
