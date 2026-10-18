export default function SectionHeading({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: string;
}) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/45">
        <span className="text-accent">{index}</span>
        <span className="mx-2 text-foreground/20">/</span>
        {label}
      </p>
      <h2 className="mt-4 max-w-xl text-[1.7rem] font-normal leading-[1.1] tracking-tight text-foreground sm:text-[2rem]">
        {title}
      </h2>
    </div>
  );
}
