const flowTones = {
  cyan: { ink: "#03b3c3", wash: "rgba(3,179,195,0.14)", edge: "rgba(3,179,195,0.45)" },
  blue: { ink: "#0e5ea5", wash: "rgba(14,94,165,0.2)", edge: "rgba(14,94,165,0.5)" },
  purple: { ink: "#6750a2", wash: "rgba(103,80,162,0.22)", edge: "rgba(103,80,162,0.5)" },
  magenta: { ink: "#d856bf", wash: "rgba(216,86,191,0.16)", edge: "rgba(216,86,191,0.48)" },
} as const;

function FlowIcon({ kind, x, y }: { kind: "database" | "server" | "cloud" | "stack"; x: number; y: number }) {
  if (kind === "database") {
    return (
      <g transform={`translate(${x} ${y})`} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <ellipse cx="8" cy="3.2" rx="6.2" ry="2.2" />
        <path d="M1.8 3.2v5.2c0 1.2 2.8 2.2 6.2 2.2s6.2-1 6.2-2.2V3.2" />
        <path d="M1.8 6.2c0 1.2 2.8 2.2 6.2 2.2s6.2-1 6.2-2.2" />
      </g>
    );
  }
  if (kind === "server") {
    return (
      <g transform={`translate(${x} ${y})`} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
        <rect x="1.6" y="1.4" width="12.8" height="5" rx="1.2" />
        <rect x="1.6" y="8.6" width="12.8" height="5" rx="1.2" />
        <circle cx="4.2" cy="3.9" r="0.7" fill="currentColor" stroke="none" />
        <circle cx="4.2" cy="11.1" r="0.7" fill="currentColor" stroke="none" />
      </g>
    );
  }
  if (kind === "cloud") {
    return (
      <g transform={`translate(${x} ${y})`} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
        <path d="M4.2 12.2h7.2a2.7 2.7 0 0 0 .4-5.4 3.5 3.5 0 0 0-6.7-1.1A2.6 2.6 0 0 0 4.2 12.2z" />
      </g>
    );
  }
  return (
    <g transform={`translate(${x} ${y})`} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
      <path d="M2 4.2h12M2 8h12M2 11.8h12" />
    </g>
  );
}

function FlowNode({
  x,
  y,
  width,
  height,
  tone,
  label,
  hint,
  icon,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  tone: keyof typeof flowTones;
  label: string;
  hint?: string;
  icon: "database" | "server" | "cloud" | "stack";
}) {
  const color = flowTones[tone];
  const box = height > 46 ? 28 : 24;
  const boxX = x + 6;
  const boxY = y + (height - box) / 2;
  const textX = boxX + box + 8;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="12" fill="#141820" stroke="rgba(255,255,255,0.1)" />
      <rect x={boxX} y={boxY} width={box} height={box} rx="8" fill={color.wash} stroke={color.edge} />
      <g color={color.ink}>
        <FlowIcon kind={icon} x={boxX + (box - 16) / 2} y={boxY + (box - 16) / 2} />
      </g>
      {hint ? (
        <>
          <text
            x={textX}
            y={y + 22}
            fill="#f4f7fb"
            fontSize="12"
            fontWeight="600"
            fontFamily="var(--font-geist-sans), system-ui, sans-serif"
          >
            {label}
          </text>
          <text
            x={textX}
            y={y + 37}
            fill="rgba(244,247,251,0.48)"
            fontSize="10"
            fontFamily="var(--font-geist-sans), system-ui, sans-serif"
          >
            {hint}
          </text>
        </>
      ) : (
        <text
          x={textX}
          y={y + height / 2 + 4}
          fill="#f4f7fb"
          fontSize="11"
          fontWeight="500"
          fontFamily="var(--font-geist-sans), system-ui, sans-serif"
        >
          {label}
        </text>
      )}
    </g>
  );
}

export function ProgressMotion() {
  const track = "rgba(255,255,255,0.16)";
  const trunk = "M200 64 V112";
  const left = "M200 148 C200 190 68 190 68 222";
  const middle = "M200 148 V222";
  const right = "M200 148 C200 190 332 190 332 222";
  return (
    <svg viewBox="0 0 400 276" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="flow-hub" x1="184" y1="116" x2="216" y2="146">
          <stop stopColor="#03b3c3" />
          <stop offset="1" stopColor="#d856bf" />
        </linearGradient>
      </defs>
      <path d={trunk} fill="none" stroke={track} strokeWidth="1.25" strokeLinecap="round" />
      <path d={left} fill="none" stroke={track} strokeWidth="1.25" strokeLinecap="round" />
      <path d={middle} fill="none" stroke={track} strokeWidth="1.25" strokeLinecap="round" />
      <path d={right} fill="none" stroke={track} strokeWidth="1.25" strokeLinecap="round" />
      <path d={trunk} fill="none" stroke="#03b3c3" strokeWidth="1.25" strokeLinecap="round" className="feat-flow" />
      <path d={left} fill="none" stroke="#0e5ea5" strokeWidth="1.25" strokeLinecap="round" className="feat-flow" />
      <path d={middle} fill="none" stroke="#6750a2" strokeWidth="1.25" strokeLinecap="round" className="feat-flow" />
      <path d={right} fill="none" stroke="#d856bf" strokeWidth="1.25" strokeLinecap="round" className="feat-flow" />

      <FlowNode x={118} y={12} width={164} height={52} tone="cyan" icon="database" label="Open stage" hint="Trees" />

      <g>
        <circle cx="200" cy="130" r="26" fill="#101218" stroke="rgba(255,255,255,0.14)" />
        <rect x="188" y="124" width="14" height="16" rx="3.5" fill="none" stroke="url(#flow-hub)" strokeWidth="1.6" />
        <rect x="198" y="118" width="14" height="16" rx="3.5" fill="#101218" stroke="url(#flow-hub)" strokeWidth="1.6" />
      </g>

      <FlowNode x={8} y={214} width={120} height={42} tone="blue" icon="server" label="Arrays" />
      <FlowNode x={140} y={214} width={120} height={42} tone="purple" icon="cloud" label="Hash maps" />
      <FlowNode x={272} y={214} width={120} height={42} tone="magenta" icon="stack" label="Graphs" />

      <path d="M200 60 V76" stroke="#03b3c3" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M200 198 V214" stroke="#6750a2" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

function ExportSheet({
  x,
  y,
  title,
  hint,
  mark,
}: {
  x: number;
  y: number;
  title: string;
  hint: string;
  mark: "triangle" | "bolt" | "flame";
}) {
  const width = 96;
  const height = 58;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="8" fill="#12141a" stroke="rgba(255,255,255,0.1)" />
      <text
        x={x + 10}
        y={y + 16}
        fill="#f4f7fb"
        fontSize="10"
        fontWeight="600"
        fontFamily="var(--font-geist-sans), system-ui, sans-serif"
      >
        {title}
      </text>
      <text
        x={x + 10}
        y={y + 28}
        fill="#f4f7fb"
        fontSize="10"
        fontWeight="600"
        fontFamily="var(--font-geist-sans), system-ui, sans-serif"
      >
        {hint}
      </text>
      {mark === "triangle" ? (
        <path d={`M ${x + 78} ${y + 11} L ${x + 86} ${y + 23} H ${x + 70} Z`} fill="#03b3c3" />
      ) : null}
      {mark === "bolt" ? (
        <path d={`M ${x + 82} ${y + 10} L ${x + 76} ${y + 18} H ${x + 80} L ${x + 78} ${y + 26} L ${x + 86} ${y + 16} H ${x + 81} Z`} fill="#03b3c3" />
      ) : null}
      {mark === "flame" ? (
        <g transform={`translate(${x + 70} ${y + 8}) scale(0.75)`}>
          <path d="M9 0C9 0 1 8 3 14c2 6 12 6 14 0C19 8 9 0 9 0z" fill="#d856bf" />
          <path d="M9 8c0 0-3 3-2 6 1 3 5 3 6 0 1-3-2-6-4-6z" fill="#c247ac" />
        </g>
      ) : null}
      <rect x={x + 10} y={y + 36} width="46" height="2" rx="1" fill="rgba(255,255,255,0.16)" />
      <rect x={x + 10} y={y + 42} width="32" height="2" rx="1" fill="rgba(255,255,255,0.1)" />
      <rect x={x + 10} y={y + 48} width="40" height="2" rx="1" fill="rgba(255,255,255,0.14)" />
    </g>
  );
}

export function ExportMotion() {
  const line = "rgba(255,255,255,0.22)";
  return (
    <svg viewBox="0 0 360 280" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="export-hub" x1="164" y1="140" x2="196" y2="172">
          <stop stopColor="#03b3c3" />
          <stop offset="1" stopColor="#d856bf" />
        </linearGradient>
        <filter id="export-pdf-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="4" result="blur" />
        </filter>
      </defs>

      <path d="M70 66 V122 Q70 132 80 132 H180" fill="none" stroke={line} strokeWidth="1.15" />
      <path d="M290 66 V122 Q290 132 280 132 H180" fill="none" stroke={line} strokeWidth="1.15" />
      <path d="M180 66 V142" fill="none" stroke={line} strokeWidth="1.15" />
      <path d="M180 174 V190" fill="none" stroke="#d856bf" strokeWidth="1.35" />

      <ExportSheet x={22} y={8} title="Progress" hint="Marked" mark="triangle" />
      <ExportSheet x={132} y={8} title="Stages" hint="Finished" mark="bolt" />
      <ExportSheet x={242} y={8} title="Notes" hint="Saved" mark="flame" />

      <g>
        <circle cx="180" cy="158" r="16" fill="#0e1016" stroke="rgba(255,255,255,0.16)" />
        <rect x="172" y="154" width="9" height="11" rx="2.2" fill="none" stroke="url(#export-hub)" strokeWidth="1.4" />
        <rect x="179" y="149" width="9" height="11" rx="2.2" fill="#0e1016" stroke="url(#export-hub)" strokeWidth="1.4" />
      </g>

      <g>
        <rect x="151" y="190" width="58" height="82" rx="3" fill="#16181f" stroke="rgba(255,255,255,0.14)" strokeWidth="0.75" />
        <rect x="159" y="200" width="38" height="2" rx="1" fill="rgba(255,255,255,0.22)" />
        <rect x="159" y="206" width="26" height="2" rx="1" fill="rgba(255,255,255,0.11)" />
        <rect x="159" y="214" width="40" height="2" rx="1" fill="rgba(255,255,255,0.18)" />
        <rect x="159" y="220" width="22" height="2" rx="1" fill="rgba(255,255,255,0.1)" />
        <rect x="159" y="228" width="34" height="2" rx="1" fill="rgba(255,255,255,0.16)" />
        <rect x="159" y="234" width="18" height="2" rx="1" fill="rgba(255,255,255,0.1)" />
        <rect x="159" y="242" width="30" height="2" rx="1" fill="rgba(255,255,255,0.14)" />
        <rect x="159" y="248" width="16" height="2" rx="1" fill="rgba(255,255,255,0.1)" />
        <rect x="159" y="258" width="14" height="2.5" rx="1" fill="rgba(255,255,255,0.55)" />
        <rect x="183" y="258" width="32" height="15" rx="4" fill="#d856bf" filter="url(#export-pdf-glow)" opacity="0.85" />
        <rect x="183" y="258" width="32" height="15" rx="4" fill="#c247ac" />
        <text
          x="199"
          y="268.5"
          textAnchor="middle"
          fill="#fff"
          fontSize="6.5"
          fontWeight="700"
          fontFamily="var(--font-geist-sans), system-ui, sans-serif"
        >
          PDF
        </text>
      </g>
    </svg>
  );
}

const nextStages = [
  { name: "Arrays", ink: "#03b3c3", wash: "rgba(3,179,195,0.14)", edge: "rgba(3,179,195,0.45)" },
  { name: "Hash maps", ink: "#0e5ea5", wash: "rgba(14,94,165,0.22)", edge: "rgba(14,94,165,0.55)" },
  { name: "Trees", ink: "#6750a2", wash: "rgba(103,80,162,0.22)", edge: "rgba(103,80,162,0.5)" },
  { name: "Graphs", ink: "#d856bf", wash: "rgba(216,86,191,0.16)", edge: "rgba(216,86,191,0.48)" },
  { name: "Dynamic programming", ink: "#c247ac", wash: "rgba(194,71,172,0.16)", edge: "rgba(194,71,172,0.48)" },
];

export function NextMotion() {
  return (
    <div className="flex h-full items-center px-5 py-6" aria-hidden="true">
      <ol className="relative w-full">
        <span className="feat-select pointer-events-none absolute inset-x-0 top-0 h-10 rounded-xl border border-white/10 bg-white/[0.045]" />
        {nextStages.map((stage, index) => (
          <li key={stage.name} className="relative flex h-10 items-center gap-3 px-1.5">
            {index < nextStages.length - 1 ? (
              <span className="pointer-events-none absolute -bottom-1 left-[22px] h-2 w-px -translate-x-1/2 bg-white/40" />
            ) : null}
            <span
              className="relative z-10 grid size-8 shrink-0 place-items-center rounded-lg font-mono text-[10px] font-semibold"
              style={{ background: stage.wash, color: stage.ink, boxShadow: `inset 0 0 0 1px ${stage.edge}` }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="truncate text-[13px] text-[#e7edf5]">{stage.name}</span>
            <span className="ml-auto size-1.5 shrink-0 rounded-full" style={{ background: stage.ink }} />
          </li>
        ))}
      </ol>
    </div>
  );
}

const prerequisites = [
  { title: "Arrays", body: "Index the nodes in order", mark: "#03b3c3", required: true },
  { title: "Recursion", body: "A call that has to return", mark: "#6750a2", required: false },
  { title: "Linked lists", body: "The chain a tree grows from", mark: "#d856bf", required: false },
];

export function PrerequisiteMotion() {
  return (
    <div className="relative h-full overflow-hidden px-4 pt-4" aria-hidden="true">
      <div className="h-full overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#12141c]">
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-2 text-[13px] font-medium text-white">
            <span className="size-2 rounded-full bg-[#03b3c3]" />
            Comes first
          </div>
          <span className="text-[15px] leading-none tracking-[0.2em] text-white/35">···</span>
        </div>
        <div className="space-y-2 px-2">
          {prerequisites.map((item) => (
            <div key={item.title} className="rounded-xl border border-white/[0.08] bg-[#181b22] px-3.5 py-2.5">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[14px] font-medium text-white">{item.title}</p>
                {item.required ? (
                  <svg viewBox="0 0 12 14" className="mt-0.5 h-3.5 w-3 shrink-0" aria-hidden="true">
                    <path d="M1.5 1.2h9v7.2l-4.5 3.4L1.5 8.4z" fill="#d856bf" />
                  </svg>
                ) : null}
              </div>
              <p className="mt-1 text-[12px] leading-4 text-[#9aa3b2]">{item.body}</p>
              <span className="mt-2 block size-5 rounded-full" style={{ background: item.mark }} />
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-4 bottom-0 h-16 bg-gradient-to-t from-[#0e1014] to-transparent" />
    </div>
  );
}

const resourceRows = [
  { y: 84, label: "Notes", meta: "with the stage", icon: "notes" },
  { y: 138, label: "Article", meta: "for this topic", icon: "link" },
  { y: 192, label: "Video", meta: "the walkthrough", icon: "play" },
] as const;

export function ResourceMotion() {
  const rail = "M 46 66 V 200";
  const branches = ["M 46 92 Q 46 105 60 105 H 92", "M 46 146 Q 46 159 60 159 H 92", "M 46 200 Q 46 213 60 213 H 92"];
  return (
    <svg viewBox="0 0 360 250" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <g fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="1.25" strokeLinecap="round" strokeDasharray="2.2 3.4">
        <path d={rail} />
        {branches.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g fill="none" stroke="rgba(255,255,255,0.72)" strokeWidth="1.35" strokeLinecap="round" className="feat-resource-line">
        <path d={rail} />
        {branches.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      <g className="feat-resource">
        <rect x="18" y="16" width="324" height="48" rx="24" fill="#141820" stroke="rgba(255,255,255,0.12)" />
        <circle cx="46" cy="40" r="10" fill="rgba(3,179,195,0.16)" stroke="#03b3c3" strokeWidth="1.4" />
        <path d="M41.4 40.2 L44.6 43.2 L51 36.4" fill="none" stroke="#03b3c3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="66" y="45" fill="#f4f7fb" fontSize="14" fontWeight="600" fontFamily="var(--font-geist-sans), system-ui, sans-serif">
          Reading ready
        </text>
      </g>

      {resourceRows.map((row, index) => (
        <g key={row.label} className="feat-resource" style={{ animationDelay: `${0.28 + index * 0.34}s` }}>
          <rect x="92" y={row.y} width="246" height="42" rx="21" fill="#12141a" stroke="rgba(255,255,255,0.1)" />
          {row.icon === "notes" ? (
            <g>
              <circle cx="116" cy={row.y + 21} r="8" fill="#0e5ea5" />
              <path d={`M112 ${row.y + 18} H120 M112 ${row.y + 21} H120 M112 ${row.y + 24} H118`} stroke="#ffffff" strokeWidth="1.1" strokeLinecap="round" />
            </g>
          ) : null}
          {row.icon === "link" ? (
            <g fill="none" stroke="rgba(244,247,251,0.78)" strokeWidth="1.35" strokeLinecap="round">
              <path d={`M113 ${row.y + 18} a 3.2 3.2 0 0 1 4.5 0 l1.2 1.2`} />
              <path d={`M119 ${row.y + 24} a 3.2 3.2 0 0 1 -4.5 0 l-1.2 -1.2`} />
            </g>
          ) : null}
          {row.icon === "play" ? (
            <path d={`M111 ${row.y + 15} L122 ${row.y + 21} L111 ${row.y + 27} Z`} fill="rgba(244,247,251,0.82)" />
          ) : null}
          <text x="134" y={row.y + 25} fill="rgba(214,222,234,0.78)" fontSize="12" fontFamily="var(--font-geist-sans), system-ui, sans-serif">
            {row.label}
            <tspan fill="rgba(214,222,234,0.42)"> · {row.meta}</tspan>
          </text>
        </g>
      ))}
    </svg>
  );
}

function PathColumn({
  x,
  label,
  count,
  mark,
}: {
  x: number;
  label: string;
  count: string;
  mark: "next" | "open" | "done";
}) {
  return (
    <g>
      {mark === "next" ? <circle cx={x + 7} cy="16" r="5" fill="none" stroke="rgba(244,247,251,0.55)" strokeWidth="1.3" /> : null}
      {mark === "open" ? (
        <g>
          <circle cx={x + 7} cy="16" r="5.5" fill="none" stroke="#d856bf" strokeWidth="1.3" />
          <path d={`M ${x + 7} 13.4 V 16 L ${x + 9} 17.2`} fill="none" stroke="#d856bf" strokeWidth="1.1" strokeLinecap="round" />
        </g>
      ) : null}
      {mark === "done" ? (
        <g>
          <circle cx={x + 7} cy="16" r="5.5" fill="rgba(3,179,195,0.16)" stroke="#03b3c3" strokeWidth="1.2" />
          <path d={`M ${x + 4.6} 16 L ${x + 6.4} 17.8 L ${x + 9.6} 14.2`} fill="none" stroke="#03b3c3" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ) : null}
      <text x={x + 18} y="20" fill="#f4f7fb" fontSize="12" fontWeight="600" fontFamily="var(--font-geist-sans), system-ui, sans-serif">
        {label}
      </text>
      <text x={x + 116} y="20" textAnchor="end" fill="rgba(244,247,251,0.38)" fontSize="12" fontFamily="var(--font-geist-sans), system-ui, sans-serif">
        {count}
      </text>
    </g>
  );
}

function PathCard({
  x,
  y,
  tag,
  tagFill,
  tagInk,
  title,
  stage,
}: {
  x: number;
  y: number;
  tag: string;
  tagFill: string;
  tagInk: string;
  title: string;
  stage: string;
}) {
  const tagWidth = tag.length * 5.6 + 14;
  return (
    <g>
      <rect x={x} y={y} width="120" height="82" rx="12" fill="#141820" stroke="rgba(255,255,255,0.1)" />
      <rect x={x + 10} y={y + 10} width={tagWidth} height="16" rx="5" fill={tagFill} />
      <text x={x + 10 + tagWidth / 2} y={y + 21} textAnchor="middle" fill={tagInk} fontSize="8" fontWeight="600" fontFamily="var(--font-geist-sans), system-ui, sans-serif">
        {tag}
      </text>
      <text x={x + 10} y={y + 46} fill="#f4f7fb" fontSize="11" fontWeight="600" fontFamily="var(--font-geist-sans), system-ui, sans-serif">
        {title}
      </text>
      <circle cx={x + 18} cy={y + 66} r="6" fill="#1c2430" stroke="rgba(255,255,255,0.16)" />
      <text x={x + 110} y={y + 69} textAnchor="end" fill="rgba(214,222,234,0.4)" fontSize="9" fontFamily="var(--font-geist-sans), system-ui, sans-serif">
        {stage}
      </text>
    </g>
  );
}

export function PersonalMotion() {
  return (
    <svg viewBox="0 0 392 228" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <PathColumn x={8} label="Up next" count="2" mark="next" />
      <PathColumn x={136} label="Open" count="1" mark="open" />
      <PathColumn x={264} label="Finished" count="4" mark="done" />

      <PathCard x={8} y={36} tag="Practice" tagFill="#0e5ea5" tagInk="#ffffff" title="Two pointers" stage="Stage 8" />
      <PathCard x={8} y={126} tag="Topic" tagFill="#6750a2" tagInk="#ffffff" title="Shortest path" stage="Stage 11" />
      <PathCard x={136} y={36} tag="Now" tagFill="#d856bf" tagInk="#08080a" title="Binary trees" stage="Stage 6" />
      <PathCard x={264} y={36} tag="Done" tagFill="#03b3c3" tagInk="#08080a" title="Arrays" stage="Stage 2" />
    </svg>
  );
}
