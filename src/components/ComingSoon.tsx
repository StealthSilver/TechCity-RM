import CtaLink from "@/components/CtaLink";
import { comingSoonItems } from "@/data/comingSoon";

export default function ComingSoon() {
  return (
    <section id="coming" className="scroll-mt-24 bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-5 pt-16 text-left sm:px-8 sm:pt-24 lg:pt-28">
        <div className="flex flex-col gap-6 border-t border-foreground/10 pt-10 sm:flex-row sm:items-end sm:justify-between sm:gap-10 sm:pt-14">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/40">
              Coming soon
            </p>
            <h2 className="mt-3 text-[1.65rem] font-normal leading-[1.18] tracking-tight sm:text-[2.35rem] lg:text-[2.7rem] lg:leading-[1.12]">
              <span className="text-foreground">More of the path. </span>
              <span className="text-foreground/55">
                Practice, content, and habits around the sheet.
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-[13px] leading-6 text-foreground/45 sm:pb-1 sm:text-right">
            Not on the sheet yet. Landing as the catalog grows.
          </p>
        </div>

        <ol className="mt-10 border-t border-foreground/10 sm:mt-14">
          {comingSoonItems.map((item, index) => (
            <li
              key={item.label}
              className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-3 border-b border-foreground/10 py-4 sm:grid-cols-[3rem_minmax(10rem,0.9fr)_minmax(0,1.4fr)] sm:gap-x-6 sm:py-5"
            >
              <span className="font-mono text-[11px] tabular-nums text-foreground/35">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="flex min-w-0 items-baseline gap-2.5">
                <span
                  className="mt-[0.35em] size-1.5 shrink-0 rounded-full sm:mt-0"
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                />
                <span className="text-[15px] font-medium tracking-tight text-foreground">
                  {item.label}
                </span>
              </span>
              <span className="col-start-2 mt-1 text-[13px] leading-5 text-foreground/50 sm:col-start-3 sm:mt-0">
                {item.note}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-col items-start gap-5 border-t border-foreground/10 py-12 sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-14">
          <p className="max-w-md text-[1.35rem] font-normal leading-snug tracking-tight text-foreground sm:text-[1.6rem]">
            Pick a subject. Start at the stage you can do.
          </p>
          <CtaLink href="/all" size="lg">
            Get started
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
