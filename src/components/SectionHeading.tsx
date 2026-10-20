export default function SectionHeading({
  index,
  label,
  title,
}: {
  index?: string;
  label?: string;
  title: string;
}) {
  return (
    <div>
      {index && label ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
          <span className="text-accent">{index}</span>
          <span className="mx-2 text-foreground/20">/</span>
          {label}
        </p>
      ) : null}
      <h2
        className={`max-w-xl text-[1.5rem] font-normal leading-[1.1] tracking-tight text-foreground sm:text-[1.85rem] md:text-[2rem] ${
          index && label ? "mt-3 sm:mt-4" : ""
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
