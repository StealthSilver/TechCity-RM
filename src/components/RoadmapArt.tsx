"use client";

import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from "react";
import RequireAuthLink from "@/components/auth/RequireAuthLink";
import { Settle, Stack, Terminal } from "@lucasmarkes/hairline/react";

const COS = Math.cos(Math.PI / 6);
const SIN = Math.sin(Math.PI / 6);
const UNIT = 32;

const ink = {
  blue: "#3b63c4",
  blueSide: "#2c4ea8",
  blueTop: "#d7e2f8",
  amber: "#e08a12",
  amberSide: "#b45309",
  amberTop: "#fde4bc",
  teal: "#0e8f86",
  tealSide: "#0b645e",
  tealTop: "#d2f3ef",
  violet: "#6b5ce0",
  violetSide: "#4638b0",
  violetTop: "#e3dffb",
  rose: "#d4537e",
  roseSide: "#a33258",
  roseTop: "#fbd5e2",
};

type Point = { x: number; y: number; hot: number };

type Box = {
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  h: number;
  top: string;
  side: string;
  front: string;
};

type Edge = { x: number; y: number; z: number; x2: number; y2: number; z2: number; color: string };

function project(x: number, y: number, z: number) {
  return {
    x: 180 + (x - y) * COS * UNIT,
    y: 118 + (x + y) * SIN * UNIT - z * UNIT,
  };
}

function poly(points: [number, number, number][]) {
  return points
    .map(([x, y, z]) => {
      const p = project(x, y, z);
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    })
    .join(" ");
}

function lift(point: Point, sx: number, sy: number, reach = 110) {
  const dx = point.x * 360 - sx;
  const dy = point.y * 220 - sy;
  const near = Math.max(0, 1 - Math.hypot(dx, dy) / reach);
  return point.hot * near;
}

export default function RoadmapCard({ id, title }: { id: string; title: string }) {
  const point = usePointerSpring();

  return (
    <RequireAuthLink
      href={`/all/${id}`}
      className="group flex h-full flex-col border border-foreground/10 bg-surface transition-colors duration-300 hover:border-accent"
    >
      <div
        className="flex h-full flex-col"
        onPointerMove={point.move}
        onPointerLeave={point.leave}
      >
        <div className="relative aspect-[5/4] overflow-hidden border-b border-foreground/10 bg-foreground/[0.03]">
          {id === "cloud" || id === "mern" || id === "python" ? (
            <HairlineArt id={id} />
          ) : (
            <Figure id={id} point={point.value} />
          )}
        </div>
        <div className="flex items-end justify-between gap-3 px-3 py-3.5 sm:px-4 sm:py-4">
          <h2 className="text-base font-normal leading-snug tracking-tight transition-colors duration-300 group-hover:text-accent sm:text-lg">
            {title}
          </h2>
          <span
            aria-hidden="true"
            className="mb-1 shrink-0 font-mono text-sm text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
          >
            →
          </span>
        </div>
      </div>
    </RequireAuthLink>
  );
}

function usePointerSpring() {
  const target = useRef<Point>({ x: 0.5, y: 0.42, hot: 0 });
  const current = useRef<Point>({ x: 0.5, y: 0.42, hot: 0 });
  const frame = useRef(0);
  const [value, setValue] = useState<Point>({ x: 0.5, y: 0.42, hot: 0 });

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  const start = () => {
    if (frame.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = () => {
      const next = target.current;
      const k = reduce ? 1 : 0.16;
      current.current = {
        x: current.current.x + (next.x - current.current.x) * k,
        y: current.current.y + (next.y - current.current.y) * k,
        hot: current.current.hot + (next.hot - current.current.hot) * k,
      };
      const settled =
        Math.abs(next.x - current.current.x) < 0.004 &&
        Math.abs(next.y - current.current.y) < 0.004 &&
        Math.abs(next.hot - current.current.hot) < 0.004;
      if (settled) {
        current.current = next;
        setValue(next);
        frame.current = 0;
        return;
      }
      setValue(current.current);
      frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
  };

  const move = (event: PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    target.current = {
      x: clamp((event.clientX - box.left) / box.width),
      y: clamp((event.clientY - box.top) / box.height),
      hot: 1,
    };
    start();
  };

  const leave = () => {
    target.current = { x: 0.5, y: 0.42, hot: 0 };
    start();
  };

  return { value, move, leave };
}

function Figure({ id, point }: { id: string; point: Point }) {
  const scene = scenes[id]?.(point) ?? scenes.dsa(point);
  const boxes = [...scene.boxes].sort((a, b) => a.x + a.y + a.z - (b.x + b.y + b.z));

  return (
    <svg viewBox="0 0 360 220" className="h-full w-full" aria-hidden="true">
      <Floor />
      {scene.edges.map((edge, index) => {
        const a = project(edge.x, edge.y, edge.z);
        const b = project(edge.x2, edge.y2, edge.z2);
        return (
          <line
            key={index}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={edge.color}
            strokeWidth="1.25"
          />
        );
      })}
      {boxes.map((box, index) => (
        <IsoBox key={index} box={box} />
      ))}
    </svg>
  );
}

function IsoBox({ box }: { box: Box }) {
  const { x, y, z, w, d, h } = box;
  const top = poly([
    [x, y, z + h],
    [x + w, y, z + h],
    [x + w, y + d, z + h],
    [x, y + d, z + h],
  ]);
  const side = poly([
    [x, y + d, z],
    [x, y + d, z + h],
    [x + w, y + d, z + h],
    [x + w, y + d, z],
  ]);
  const front = poly([
    [x + w, y, z],
    [x + w, y, z + h],
    [x + w, y + d, z + h],
    [x + w, y + d, z],
  ]);

  return (
    <g stroke="color-mix(in srgb, var(--foreground) 28%, transparent)" strokeWidth="1" strokeLinejoin="round">
      <polygon points={side} fill={box.side} />
      <polygon points={front} fill={box.front} />
      <polygon points={top} fill={box.top} />
    </g>
  );
}

function Floor() {
  const plate = poly([
    [-3.1, -2.1, 0],
    [3.2, -2.1, 0],
    [3.2, 2.6, 0],
    [-3.1, 2.6, 0],
  ]);
  return <polygon points={plate} fill="color-mix(in srgb, var(--foreground) 5%, var(--surface))" />;
}

const scenes: Record<string, (point: Point) => { boxes: Box[]; edges: Edge[] }> = {
  dsa: treeScene,
  aiml: netScene,
  java: classScene,
};

const tones = [
  { body: ink.teal, edge: ink.tealSide, top: ink.tealTop },
  { body: ink.blue, edge: ink.blueSide, top: ink.blueTop },
  { body: ink.violet, edge: ink.violetSide, top: ink.violetTop },
  { body: ink.amber, edge: ink.amberSide, top: ink.amberTop },
  { body: ink.rose, edge: ink.roseSide, top: ink.roseTop },
] as const;

const figures = {
  cloud: Terminal,
  mern: Stack,
  python: Settle,
} as const;

function HairlineArt({ id }: { id: keyof typeof figures }) {
  const host = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const FigureMark = figures[id];

  useLayoutEffect(() => {
    const root = host.current;
    const seat = frame.current;
    if (!root || !seat) return;
    const paint = () => {
      const svg = root.querySelector("svg");
      const board = svg?.querySelector(":scope > g");
      const face = board?.querySelector("path.sil") as SVGPathElement | null;
      if (!svg || !board || !face || face.style.fill) return;
      if (id === "cloud") inkTerminal(board);
      if (id === "mern") inkStack(board);
      if (id === "python") inkSettle(board);
    };
    let seated = false;
    const trySeat = () => {
      try {
        paint();
      } catch {
        // Coloring can retry; seating still runs.
      }
      if (!seated) seated = seatOnPanel(root, seat);
      return seated;
    };
    trySeat();
    const timer = window.setInterval(() => {
      if (trySeat()) window.clearInterval(timer);
    }, 100);
    const stop = window.setTimeout(() => window.clearInterval(timer), 8000);
    const watch = new MutationObserver(() => {
      if (trySeat()) window.clearInterval(timer);
    });
    watch.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ["d"] });
    const onResize = () => {
      seated = false;
      trySeat();
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(stop);
      watch.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [id]);

  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 360 220" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
        <Floor />
      </svg>
      <div ref={frame} className="absolute inset-0">
        <FigureMark ref={host} aria-hidden="true" className="h-full w-full" intensity={0.8} label="" />
      </div>
    </div>
  );
}

function seatOnPanel(root: HTMLElement, frame: HTMLElement) {
  const floor = frame.parentElement?.querySelector("polygon");
  const svg = root.querySelector("svg");
  if (!floor || !svg || !svg.querySelector("path.sil")) return false;
  frame.style.transform = "none";
  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;
  for (const face of svg.querySelectorAll("path.sil")) {
    const box = face.getBoundingClientRect();
    if (box.width < 1 || box.height < 1) continue;
    left = Math.min(left, box.left);
    top = Math.min(top, box.top);
    right = Math.max(right, box.right);
    bottom = Math.max(bottom, box.bottom);
  }
  if (!Number.isFinite(left)) return false;
  const panel = floor.getBoundingClientRect();
  const host = frame.getBoundingClientRect();
  const inkW = right - left;
  const inkH = bottom - top;
  const fit = (0.86 * panel.width * panel.height) / (inkW * panel.height + inkH * panel.width);
  const centerX = (left + right) / 2;
  const centerY = (top + bottom) / 2;
  const nudges: Record<string, { x: number; y: number }> = {
    terminal: { x: -6, y: -8 },
    stack: { x: 0, y: 0 },
    settle: { x: 0, y: 0 },
  };
  const nudge = nudges[root.dataset.hairline ?? "settle"] ?? nudges.settle;
  frame.style.transformOrigin = `${centerX - host.left}px ${centerY - host.top}px`;
  frame.style.transform = `translate(${panel.left + panel.width / 2 - centerX + nudge.x}px, ${panel.top + panel.height / 2 - centerY + nudge.y}px) scale(${fit})`;
  return true;
}

const edgeInk = "color-mix(in srgb, var(--foreground) 28%, transparent)";

function paintSolid(group: Element | undefined, body: string, edge: string, top?: string) {
  const face = group?.querySelector(":scope > path.sil") as SVGPathElement | null;
  if (!group || !face) return;
  face.style.fill = body;
  face.style.stroke = edgeInk;
  const crease = group.querySelector(":scope > path.lo") as SVGPathElement | null;
  if (!crease) return;
  const closed = /z\s*$/i.test(crease.getAttribute("d") ?? "");
  if (top && closed) {
    crease.style.fill = top;
    crease.style.stroke = edgeInk;
    crease.style.strokeWidth = "1";
    return;
  }
  crease.style.stroke = edge;
}

function inkTerminal(board: Element) {
  const kids = [...board.children];
  const breakAt = kids.findIndex((node) => node.tagName === "path");
  const before = kids.slice(0, breakAt).filter((node) => node.tagName === "g");
  const after = kids.slice(breakAt + 1).filter((node) => node.tagName === "g");
  paintSolid(before[0], "#152033", ink.blue);
  before.slice(1, -1).forEach((line, index) => {
    const tone = tones[index % tones.length];
    paintSolid(line, tone.body, tone.edge, tone.top);
    const bar = line.querySelector(":scope > path.sil") as SVGPathElement | null;
    if (bar && !/z\s*$/i.test(line.querySelector(":scope > path.lo")?.getAttribute("d") ?? "")) {
      bar.style.fill = tone.top;
      bar.style.stroke = tone.body;
    }
  });
  paintSolid(before[before.length - 1], "#1b2744", ink.blue, ink.blueTop);
  const prompt = kids[breakAt] as SVGPathElement | undefined;
  if (prompt) {
    prompt.style.fill = "#e08a12";
    prompt.style.stroke = "#b45309";
  }
  paintSolid(after[0], ink.amber, ink.amberSide, ink.amberTop);
  paintSolid(after[1], "#152033", ink.blue, ink.blueTop);
  after.slice(2).forEach((button, index) => {
    const tone = tones[index % tones.length];
    paintSolid(button, tone.top, tone.body, tone.top);
  });
}

function inkStack(board: Element) {
  const kids = [...board.children];
  const frames = kids.filter((node) => node.tagName === "g");
  paintSolid(frames[0], "#1a2b52", ink.blue, ink.blueTop);
  const mark = kids.find((node) => node.tagName === "path") as SVGPathElement | undefined;
  if (mark) {
    mark.style.stroke = ink.amber;
    mark.style.strokeWidth = "1.6";
  }
  frames.slice(1).forEach((frame, index) => {
    const tone = tones[index % tones.length];
    const chipTone = tones[(index + 2) % tones.length];
    paintSolid(frame, tone.body, tone.edge, tone.top);
    const crease = frame.querySelector(":scope > path.lo") as SVGPathElement | null;
    if (crease) {
      crease.style.stroke = chipTone.body;
      crease.style.strokeWidth = "1.8";
    }
    const face = frame.querySelector(":scope > path.sil") as SVGPathElement | null;
    if (!face || frame.querySelector("[data-chip]")) return;
    const chip = document.createElementNS("http://www.w3.org/2000/svg", "path");
    chip.dataset.chip = "1";
    frame.appendChild(chip);
    const place = () => {
      const box = face.getBBox();
      if (box.width < 2) return;
      const size = Math.min(9, box.width * 0.14);
      const x = box.x + box.width * 0.66;
      const y = box.y + box.height * 0.22;
      chip.setAttribute("fill", chipTone.body);
      chip.setAttribute("stroke", chipTone.edge);
      chip.setAttribute("stroke-width", "0.8");
      chip.setAttribute(
        "d",
        `M${x} ${y}l${size} ${size * 0.48}l${-size * 0.62} ${size * 0.46}l${-size} ${-size * 0.48}z`,
      );
    };
    place();
    new MutationObserver(place).observe(face, { attributes: true, attributeFilter: ["d"] });
  });
}

function inkSettle(board: Element) {
  const solids = [...board.querySelectorAll("g")].filter((group) => group.querySelector(":scope > path.sil"));
  const hub = solids.find((group) => group.querySelector(":scope > path.sil.hi")) ?? solids[0];
  paintSolid(hub, ink.blue, ink.blueSide, ink.blueTop);
  const hubMark = hub?.parentElement?.querySelector(":scope > path") as SVGPathElement | null;
  if (hubMark) hubMark.style.stroke = ink.amber;
  solids
    .filter((group) => group !== hub)
    .forEach((tile, index) => {
      const tone = tones[index % tones.length];
      paintSolid(tile, tone.body, tone.edge, tone.top);
    });
  [...board.children].forEach((node) => {
    if (node.tagName !== "path") return;
    const path = node as SVGPathElement;
    path.style.stroke = ink.blueSide;
    path.style.strokeWidth = "1.35";
  });
}

function treeScene(point: Point) {
  const nodes = [
    { x: -0.26, y: -1.85, parent: -1, tone: "blue" as const },
    { x: -1.35, y: -0.4, parent: 0, tone: "teal" as const },
    { x: 0.85, y: -0.4, parent: 0, tone: "violet" as const },
    { x: -2.05, y: 1.05, parent: 1, tone: "teal" as const },
    { x: -0.75, y: 1.05, parent: 1, tone: "blue" as const },
    { x: 0.35, y: 1.05, parent: 2, tone: "violet" as const },
    { x: 1.65, y: 1.05, parent: 2, tone: "amber" as const },
  ];
  const size = 0.5;
  const boxes: Box[] = [];
  const edges: Edge[] = [];
  const tones = {
    blue: [ink.blue, ink.blueSide, ink.blueTop],
    teal: [ink.teal, ink.tealSide, ink.tealTop],
    violet: [ink.violet, ink.violetSide, ink.violetTop],
    amber: [ink.amber, ink.amberSide, ink.amberTop],
  } as const;

  const risen = nodes.map((node) => {
    const screen = project(node.x + size / 2, node.y + size / 2, size);
    return lift(point, screen.x, screen.y, 90) * 1.2;
  });

  nodes.forEach((node, index) => {
    const [front, side, top] = tones[node.tone];
    boxes.push(cube(node.x, node.y, risen[index], size, front, side, top));
    if (node.parent < 0) return;
    const parent = nodes[node.parent];
    edges.push({
      x: parent.x + size / 2,
      y: parent.y + size / 2,
      z: risen[node.parent] + size * 0.15,
      x2: node.x + size / 2,
      y2: node.y + size / 2,
      z2: risen[index] + size * 0.85,
      color: ink.blueSide,
    });
  });

  return { boxes, edges };
}

function netScene(point: Point) {
  const columns = [
    [-1.55, [-0.85, 0.05, 0.95]],
    [-0.15, [-1.15, -0.25, 0.65, 1.45]],
    [1.25, [-0.45, 0.65]],
  ] as const;
  const size = 0.46;
  const placed: { x: number; y: number; z: number; color: [string, string, string] }[] = [];
  const colors: [string, string, string][] = [
    [ink.teal, ink.tealSide, ink.tealTop],
    [ink.blue, ink.blueSide, ink.blueTop],
    [ink.violet, ink.violetSide, ink.violetTop],
  ];

  columns.forEach(([x, ys], column) => {
    ys.forEach((y) => {
      const screen = project(x + size / 2, y + size / 2, size);
      const rise = lift(point, screen.x, screen.y, 70) * 1.05;
      placed.push({ x, y, z: rise, color: colors[column] });
    });
  });

  const edges: Edge[] = [];
  for (let column = 0; column < columns.length - 1; column++) {
    const from = placed.filter((_, index) => index < columns.slice(0, column + 1).reduce((sum, item) => sum + item[1].length, 0) && index >= columns.slice(0, column).reduce((sum, item) => sum + item[1].length, 0));
    const toStart = columns.slice(0, column + 1).reduce((sum, item) => sum + item[1].length, 0);
    const to = placed.slice(toStart, toStart + columns[column + 1][1].length);
    from.forEach((a) => {
      to.forEach((b) => {
        const hot = Math.max(a.z, b.z);
        edges.push({
          x: a.x + size / 2,
          y: a.y + size / 2,
          z: a.z + size * 0.5,
          x2: b.x + size / 2,
          y2: b.y + size / 2,
          z2: b.z + size * 0.5,
          color: hot > 0.25 ? ink.amber : ink.blueSide,
        });
      });
    });
  }

  return {
    boxes: placed.map((node) => cube(node.x, node.y, node.z, size, node.color[0], node.color[1], node.color[2])),
    edges,
  };
}

function classScene(point: Point) {
  const blocks = [
    { x: -0.72, y: -1.7, front: ink.blue, side: ink.blueSide, top: ink.blueTop, band: ink.amber },
    { x: -1.85, y: 0.25, front: ink.teal, side: ink.tealSide, top: ink.tealTop, band: ink.violet },
    { x: 0.45, y: 0.25, front: ink.violet, side: ink.violetSide, top: ink.violetTop, band: ink.rose },
  ];
  const body = { w: 1.35, d: 0.82, h: 0.48 };
  const boxes: Box[] = [];
  const edges: Edge[] = [];
  const risen = blocks.map((block) => {
    const screen = project(block.x + body.w / 2, block.y + body.d / 2, body.h);
    return lift(point, screen.x, screen.y, 96) * 0.95;
  });

  blocks.forEach((block, index) => {
    boxes.push({
      x: block.x,
      y: block.y,
      z: risen[index],
      w: body.w,
      d: body.d,
      h: body.h,
      front: block.front,
      side: block.side,
      top: block.top,
    });
    boxes.push(
      slab(block.x, block.y, risen[index] + body.h, body.w, 0.22, 0.18, block.band, block.band, block.band),
    );
  });

  [1, 2].forEach((index) => {
    edges.push({
      x: blocks[0].x + body.w / 2,
      y: blocks[0].y + body.d,
      z: risen[0] + 0.2,
      x2: blocks[index].x + body.w / 2,
      y2: blocks[index].y,
      z2: risen[index] + body.h,
      color: ink.blueSide,
    });
  });

  return { boxes, edges };
}

function cube(x: number, y: number, z: number, size: number, front: string, side: string, top: string): Box {
  return { x, y, z, w: size, d: size, h: size, front, side, top };
}

function slab(
  x: number,
  y: number,
  z: number,
  w: number,
  d: number,
  h: number,
  front: string,
  side: string,
  top: string,
): Box {
  return { x, y, z, w, d, h, front, side, top };
}

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}
