const steps = [
  {
    index: "Fig 0.1",
    title: "The stage you are on",
    body: "Finished stages stay marked. The one you are on stays open, with the problem to do.",
    mark: <StageFigure />,
  },
  {
    index: "Fig 0.2",
    title: "A hint, not the answer",
    body: "Each stage tells you how to start. It does not hand you the solution.",
    mark: <HintFigure />,
  },
  {
    index: "Fig 0.3",
    title: "What comes next",
    body: "The next topic, the prerequisite, and the reading stay with that stage.",
    mark: <NextFigure />,
  },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 bg-background text-foreground">
      <div className="mx-auto max-w-7xl px-5 py-16 text-left sm:px-8 sm:py-24 lg:py-28">
        <h2 className="max-w-5xl text-[1.45rem] font-[510] leading-[1.33] tracking-[-0.012em] text-foreground/55 sm:text-[2rem] sm:leading-[1.125] sm:tracking-[-0.022em] md:text-[2.5rem] md:leading-[1.1] xl:text-5xl xl:leading-none">
          <strong className="font-[510] text-foreground">A new species of study tool.</strong>{" "}
          Purpose-built for students who need one path through a subject, TechCity sets a new
          standard for learning and finishing the work.
        </h2>

        <ul className="mt-12 grid grid-cols-1 sm:mt-16 md:grid-cols-3 md:mt-20 lg:mt-24">
          {steps.map((step, index) => (
            <li
              key={step.index}
              className={`flex flex-col md:min-h-[24rem] lg:min-h-[29.25rem] ${
                index < steps.length - 1
                  ? "border-b border-foreground/10 pb-8 md:border-b-0 md:border-r md:pb-0"
                  : ""
              } ${index > 0 ? "pt-8 md:pt-0" : ""} ${
                index === 0 ? "md:pr-5 lg:pr-8" : index === 1 ? "md:px-5 lg:px-8" : "md:pl-5 lg:pl-8"
              }`}
            >
              <span className="font-mono text-xs uppercase text-foreground/35">{step.index}</span>
              <div
                className="about-well mx-auto my-6 flex w-full max-w-xs flex-1 items-center justify-center rounded-xl bg-[var(--about-well)] py-6 sm:my-8 sm:py-8"
                aria-hidden="true"
              >
                {step.mark}
              </div>
              <div className="flex max-w-sm flex-col gap-2">
                <h3 className="text-[15px] font-[510] leading-6 tracking-[-0.011em] text-foreground">
                  {step.title}
                </h3>
                <p className="text-[15px] leading-6 tracking-[-0.011em] text-foreground/55">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function StageFigure() {
  const layers = [
    { y: 146, tone: "dim" as const },
    { y: 110, tone: "dim" as const },
    { y: 74, tone: "mid" as const },
  ];

  return (
    <svg viewBox="0 0 280 230" className="w-full max-w-xs" aria-hidden="true">
      {layers.map((layer) => (
        <Slab key={layer.y} y={layer.y} tone={layer.tone} />
      ))}
      <g className="about-lift">
        <Slab y={30} tone="bright" />
        <path
          className="about-line"
          d="M118 56h44M126 66h28"
          fill="none"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

function HintFigure() {
  return (
    <svg viewBox="0 0 280 230" className="w-full max-w-xs" aria-hidden="true">
      <Slab y={128} tone="dim" wide />
      <path
        className="about-stroke-dim"
        d="M78 154h86M86 164h62"
        fill="none"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <g className="about-lift">
        <Slab y={58} tone="bright" wide />
        <path
          className="about-stroke-mid"
          d="M78 84h108M86 94h84M94 104h52"
          fill="none"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          className="about-line"
          d="M148 100h42"
          fill="none"
          strokeWidth="1.35"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

function NextFigure() {
  const nodes = [
    { x: 36, y: 150 },
    { x: 92, y: 118 },
    { x: 148, y: 86 },
    { x: 204, y: 54 },
  ];

  return (
    <svg viewBox="0 0 280 230" className="w-full max-w-xs" aria-hidden="true">
      <line
        className="about-stroke-side"
        x1="58"
        y1="170"
        x2="226"
        y2="74"
        strokeWidth="1"
      />
      <line
        className="feat-line about-line"
        pathLength={1}
        x1="58"
        y1="170"
        x2="226"
        y2="74"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      {nodes.map((node, index) => (
        <g key={node.x}>
          <Cube x={node.x} y={node.y} tone="dim" />
          <g className={`about-node about-node-${index}`}>
            <Cube x={node.x} y={node.y} tone="bright" />
          </g>
        </g>
      ))}
    </svg>
  );
}

function Slab({
  y,
  tone,
  wide = false,
}: {
  y: number;
  tone: "dim" | "mid" | "bright";
  wide?: boolean;
}) {
  const left = wide ? 36 : 52;
  const right = wide ? 244 : 228;
  const mid = 140;
  const depth = wide ? 34 : 30;
  const thick = 16;
  const edge =
    tone === "bright"
      ? "about-stroke-bright"
      : tone === "mid"
        ? "about-stroke-mid"
        : "about-stroke-dim";
  const side = tone === "bright" ? "about-stroke-mid" : "about-stroke-side";
  const top = `M ${left} ${y + depth} L ${mid} ${y} L ${right} ${y + depth} L ${mid} ${y + depth * 2} Z`;
  const leftFace = `M ${left} ${y + depth} L ${mid} ${y + depth * 2} L ${mid} ${y + depth * 2 + thick} L ${left} ${y + depth + thick} Z`;
  const rightFace = `M ${mid} ${y + depth * 2} L ${right} ${y + depth} L ${right} ${y + depth + thick} L ${mid} ${y + depth * 2 + thick} Z`;

  return (
    <g>
      <path className={`about-face-left ${side}`} d={leftFace} strokeWidth="1" />
      <path className={`about-face-right ${side}`} d={rightFace} strokeWidth="1" />
      <path className={`about-face-top ${edge}`} d={top} strokeWidth="1" />
    </g>
  );
}

function Cube({
  x,
  y,
  tone,
}: {
  x: number;
  y: number;
  tone: "dim" | "mid" | "bright";
}) {
  const edge =
    tone === "bright"
      ? "about-stroke-bright"
      : tone === "mid"
        ? "about-stroke-mid"
        : "about-stroke-dim";
  const side = tone === "bright" ? "about-stroke-mid" : "about-stroke-side";
  const s = 22;
  const top = `M ${x} ${y + 12} L ${x + s} ${y} L ${x + s * 2} ${y + 12} L ${x + s} ${y + 24} Z`;
  const left = `M ${x} ${y + 12} L ${x + s} ${y + 24} L ${x + s} ${y + 40} L ${x} ${y + 28} Z`;
  const right = `M ${x + s} ${y + 24} L ${x + s * 2} ${y + 12} L ${x + s * 2} ${y + 28} L ${x + s} ${y + 40} Z`;

  return (
    <g>
      <path className={`about-face-left ${side}`} d={left} strokeWidth="1" />
      <path className={`about-face-right ${side}`} d={right} strokeWidth="1" />
      <path className={`about-face-top ${edge}`} d={top} strokeWidth="1" />
    </g>
  );
}
