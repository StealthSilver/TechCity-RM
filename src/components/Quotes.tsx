import { quotes } from "@/data/quotes";

export default function Quotes() {
  const loop = [...quotes, ...quotes];

  return (
    <section id="testimonials" className="scroll-mt-24 border-t border-foreground/10 py-16 sm:py-20" aria-label="Testimonials">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
          <span className="text-accent">04</span>
          <span className="mx-2 text-foreground/20">/</span>
          Testimonials
        </p>
        <h2 className="mt-4 max-w-xl text-[1.7rem] font-normal leading-[1.1] tracking-tight sm:text-[2rem]">
          The work is what they talk about.
        </h2>
      </div>

      <div className="marquee-mask mt-10 overflow-hidden">
        <ul className="marquee-track flex w-max gap-4 px-5 sm:px-8">
          {loop.map((quote, index) => (
            <li
              key={`${quote.id}-${index}`}
              className="w-[min(22rem,78vw)] shrink-0 border border-foreground/10 bg-surface p-6"
            >
              <blockquote>
                <p className="text-[15px] leading-7 text-foreground/85">“{quote.quote}”</p>
                <footer className="mt-5">
                  <p className="text-sm text-foreground">{quote.name}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-foreground/40">
                    {quote.detail}
                  </p>
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
