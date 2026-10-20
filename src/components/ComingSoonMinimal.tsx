import { comingSoonItems } from "@/data/comingSoon";

export default function ComingSoonMinimal() {
  return (
    <aside
      className="mx-auto w-full max-w-4xl px-3 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:pb-16 md:px-8"
      aria-labelledby="roadmap-coming-heading"
    >
      <div className="relative overflow-hidden border border-foreground/10 bg-surface px-4 py-5 sm:px-6 sm:py-6">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
          aria-hidden="true"
        />
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id="roadmap-coming-heading"
              className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent"
            >
              Coming soon
            </h2>
            <p className="mt-1.5 text-[15px] tracking-tight text-foreground sm:text-base">
              More around the sheet.
            </p>
          </div>
          <p className="max-w-[14rem] text-[12px] leading-5 text-foreground/45 sm:text-right">
            Practice, content, and habits landing next.
          </p>
        </div>

        <ul className="mt-5 grid grid-cols-1 gap-2 sm:mt-6 sm:grid-cols-2">
          {comingSoonItems.map((item) => (
            <li key={item.label}>
              <div className="flex h-full min-w-0 items-start gap-3 border border-foreground/[0.07] bg-background/70 px-3 py-2.5 transition-colors hover:border-foreground/15">
                <span
                  className="mt-1.5 h-6 w-0.5 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                />
                <span className="min-w-0">
                  <span className="block text-[13px] font-medium tracking-tight text-foreground">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-[12px] leading-4 text-foreground/50">
                    {item.note}
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
