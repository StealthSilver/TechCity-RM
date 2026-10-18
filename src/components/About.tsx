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
    <section id="about" className="scroll-mt-24 bg-[#08080a] text-white">
      <div className="mx-auto max-w-7xl px-5 py-20 text-left sm:px-8 sm:py-28">
        <h2 className="max-w-5xl text-2xl font-[510] leading-[1.33] tracking-[-0.012em] text-[#8a8f98] sm:text-[2rem] sm:leading-[1.125] sm:tracking-[-0.022em] md:text-[2.5rem] md:leading-[1.1] xl:text-5xl xl:leading-none">
          <strong className="font-[510] text-[#f7f8f8]">A new species of study tool.</strong>{" "}
          Purpose-built for students who need one path through a subject, TechCity sets a new
          standard for learning and finishing the work.
        </h2>

        <ul className="mt-16 grid grid-cols-1 sm:mt-24 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.index}
              className={`flex min-h-[22rem] flex-col lg:min-h-[29.25rem] ${
                index < steps.length - 1
                  ? "border-b border-white/[0.08] pb-8 lg:border-b-0 lg:border-r lg:pb-0"
                  : ""
              } ${index > 0 ? "pt-8 lg:pt-0" : ""} ${
                index === 0 ? "lg:pr-8" : index === 1 ? "lg:px-8" : "lg:pl-8"
              }`}
            >
              <span className="font-mono text-xs uppercase text-[#8a8f98]/40">{step.index}</span>
              <div className="flex flex-1 items-center justify-center py-8" aria-hidden="true">
                {step.mark}
              </div>
              <div className="flex max-w-sm flex-col gap-2">
                <h3 className="text-[15px] font-[510] leading-6 tracking-[-0.011em] text-[#d0d6e0]">
                  {step.title}
                </h3>
                <p className="text-[15px] leading-6 tracking-[-0.011em] text-[#8a8f98]">
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
          d="M118 56h44M126 66h28"
          fill="none"
          stroke="#d0d6e0"
          strokeWidth="0.8"
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
        d="M78 154h86M86 164h62"
        fill="none"
        stroke="#3e3e44"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <g className="about-lift">
        <Slab y={58} tone="bright" wide />
        <path
          d="M78 84h108M86 94h84M94 104h52"
          fill="none"
          stroke="#62666d"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
        <path
          d="M148 100h42"
          fill="none"
          stroke="#d0d6e0"
          strokeWidth="1.1"
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
      <line x1="58" y1="170" x2="226" y2="74" stroke="#2e2e32" strokeWidth="0.8" />
      <line
        className="feat-line"
        pathLength={1}
        x1="58"
        y1="170"
        x2="226"
        y2="74"
        stroke="#d0d6e0"
        strokeWidth="0.9"
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
  const stroke = tone === "bright" ? "#d0d6e0" : tone === "mid" ? "#62666d" : "#3e3e44";
  const side = tone === "bright" ? "#62666d" : "#2e2e32";
  const top = `M ${left} ${y + depth} L ${mid} ${y} L ${right} ${y + depth} L ${mid} ${y + depth * 2} Z`;
  const leftFace = `M ${left} ${y + depth} L ${mid} ${y + depth * 2} L ${mid} ${y + depth * 2 + thick} L ${left} ${y + depth + thick} Z`;
  const rightFace = `M ${mid} ${y + depth * 2} L ${right} ${y + depth} L ${right} ${y + depth + thick} L ${mid} ${y + depth * 2 + thick} Z`;

  return (
    <g>
      <path d={leftFace} fill="#08080a" stroke={side} strokeWidth="0.7" />
      <path d={rightFace} fill="#08080a" stroke={side} strokeWidth="0.7" />
      <path d={top} fill="#08080a" stroke={stroke} strokeWidth="0.7" />
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
  const stroke = tone === "bright" ? "#d0d6e0" : tone === "mid" ? "#62666d" : "#3e3e44";
  const side = tone === "bright" ? "#62666d" : "#2e2e32";
  const s = 22;
  const top = `M ${x} ${y + 12} L ${x + s} ${y} L ${x + s * 2} ${y + 12} L ${x + s} ${y + 24} Z`;
  const left = `M ${x} ${y + 12} L ${x + s} ${y + 24} L ${x + s} ${y + 40} L ${x} ${y + 28} Z`;
  const right = `M ${x + s} ${y + 24} L ${x + s * 2} ${y + 12} L ${x + s * 2} ${y + 28} L ${x + s} ${y + 40} Z`;

  return (
    <g>
      <path d={left} fill="#08080a" stroke={side} strokeWidth="0.7" />
      <path d={right} fill="#08080a" stroke={side} strokeWidth="0.7" />
      <path d={top} fill="#08080a" stroke={stroke} strokeWidth="0.7" />
    </g>
  );
}
