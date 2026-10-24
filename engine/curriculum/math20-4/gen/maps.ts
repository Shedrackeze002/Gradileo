/** Math 20-4 Unit 8 — Maps and Scale (SS3, PR1): scale drawings, reading maps and directions, and distance, speed and time. */
import { fixedChoice, mc, numPart, part, skill } from '../../helpers.ts';
import { fmt, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { GridSpec, Part, PlaneFigure, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared text helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
];

/** Group the whole-number part with thin spaces (SI style) when it has 5 or more digits. */
function grp(s: string): string {
  const [i, f] = s.split('.');
  const g = i.length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : i;
  return f !== undefined ? `${g}.${f}` : g;
}
/** LaTeX number without trailing zeros. */
const nm = (x: number, dp = 4) => grp(fmt(x, dp));
/** A measurement inside maths: 12\ \text{cm}. */
const ms = (x: number, u: string, dp = 4) => `${nm(x, dp)}\\ \\text{${u}}`;
/** A measurement as inline maths: $12\ \text{cm}$. */
const M = (x: number, u: string, dp = 4) => `$${ms(x, u, dp)}$`;
const clean = (x: number) => roundTo(x, 9);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function placesOf(x: number): number {
  for (let d = 0; d <= 6; d++) if (Math.abs(roundTo(x, d) - x) < 1e-9) return d;
  return 6;
}

/** An exact numeric answer; a decimal answer keeps its decimal form for display. */
function exact(value: number, suffix?: string, label?: string): Part {
  const v = clean(value);
  const d = placesOf(v);
  if (d === 0) return numPart(v, { suffix, label });
  return numPart(v, { suffix, label, decimals: d, tolerance: 1e-6 });
}

// ---------------------------------------------------------------------------
// Drawing: a canvas or grid whose labels are placed clear of every line
// (same approach as the angle and shape figures in Math 10-3 and 10-4).
// ---------------------------------------------------------------------------

type P = [number, number];
type Color = 'brand' | 'accent' | 'muted';

const rad = (d: number) => (d * Math.PI) / 180;
const at = (v: P, a: number, r: number): P => [v[0] + r * Math.cos(rad(a)), v[1] + r * Math.sin(rad(a))];
const dirOf = (a: P, b: P) => (((Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI) % 360 + 360) % 360;
const r3 = (x: number) => Math.round(x * 1000) / 1000;

interface Box {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}

function distPtSeg(p: P, a: P, b: P): number {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const L2 = dx * dx + dy * dy;
  let t = L2 ? ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L2 : 0;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
}

function distPtBox(p: P, b: Box): number {
  return Math.hypot(Math.max(b.x0 - p[0], 0, p[0] - b.x1), Math.max(b.y0 - p[1], 0, p[1] - b.y1));
}

function segHitsBox(a: P, b: P, box: Box): boolean {
  let t0 = 0;
  let t1 = 1;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const ps = [-dx, dx, -dy, dy];
  const qs = [a[0] - box.x0, box.x1 - a[0], a[1] - box.y0, box.y1 - a[1]];
  for (let i = 0; i < 4; i++) {
    if (ps[i] === 0) {
      if (qs[i] < 0) return false;
    } else {
      const r = qs[i] / ps[i];
      if (ps[i] < 0) {
        if (r > t1) return false;
        if (r > t0) t0 = r;
      } else {
        if (r < t0) return false;
        if (r < t1) t1 = r;
      }
    }
  }
  return true;
}

function distSegBox(a: P, b: P, box: Box): number {
  if (segHitsBox(a, b, box)) return 0;
  const corners: P[] = [
    [box.x0, box.y0],
    [box.x0, box.y1],
    [box.x1, box.y0],
    [box.x1, box.y1],
  ];
  return Math.min(...corners.map((c) => distPtSeg(c, a, b)), distPtBox(a, box), distPtBox(b, box));
}

function distBoxBox(p: Box, q: Box): number {
  return Math.hypot(Math.max(q.x0 - p.x1, p.x0 - q.x1, 0), Math.max(q.y0 - p.y1, p.y0 - q.y1, 0));
}

/** Approximate rendered width (px) of a 12px bold figure label. */
function textWidth(t: string): number {
  let w = 0;
  for (const ch of t) w += ch === ' ' ? 3.5 : ch === '.' || ch === ',' ? 4 : /[mMwW]/.test(ch) ? 10.5 : /[iljtfI1r]/.test(ch) ? 4.5 : 7.2;
  return w;
}

interface PendingLabel {
  text: string;
  cands: (ppu: number) => P[];
  fixed?: boolean;
}

class Sketch {
  private segs: PlaneSegment[] = [];
  private polys: Array<{ points: P[]; color?: Color }> = [];
  private dots: Array<{ p: P; color: Color }> = [];
  private obstacles: Array<[P, P]> = [];
  private pending: PendingLabel[] = [];
  private extra: P[] = [];

  seg(from: P, to: P, opts: { color?: Color; dashed?: boolean; arrowEnd?: boolean; arrowStart?: boolean } = {}) {
    this.segs.push({ from, to, ...opts });
    this.obstacles.push([from, to]);
    return this;
  }

  polyline(points: P[], color: Color = 'brand') {
    this.polys.push({ points, color });
    for (let i = 0; i + 1 < points.length; i++) this.obstacles.push([points[i], points[i + 1]]);
    return this;
  }

  dot(p: P, color: Color = 'brand') {
    this.dots.push({ p, color });
    return this;
  }

  include(p: P) {
    this.extra.push(p);
    return this;
  }

  /** Label for a point, placed just beyond it in direction a (or nearby). */
  endLabel(p: P, a: number, text: string) {
    this.pending.push({
      text,
      cands: (ppu) => {
        const out: P[] = [];
        for (const dpx of [13, 16, 20, 25, 31])
          for (const off of [0, 180, 90, -90, 30, -30, 150, -150, 60, -60, 120, -120]) {
            const w = textWidth(text) / 2 + 6;
            const ang = a + off;
            // Push sideways labels out by half their width so they clear the point.
            const extra = Math.abs(Math.cos(rad(ang))) * w;
            out.push(at(p, ang, (dpx + extra) / ppu));
          }
        return out;
      },
    });
    return this;
  }

  /** Label beside segment ab, on the side away from `inside` (or either side if none). */
  sideLabel(a: P, b: P, text: string, inside?: P) {
    const m: P = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const d = dirOf(a, b);
    let out = d + 90;
    if (inside && Math.cos(rad(d + 90 - dirOf(m, inside))) > 0) out = d - 90;
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    this.pending.push({
      text,
      cands: (ppu) => {
        const res: P[] = [];
        for (const side of inside ? [out] : [out, out + 180])
          for (const dpx of [11, 14, 18, 23, 29])
            for (const t of [0, 0.12, -0.12, 0.24, -0.24]) res.push(at(at(m, d, t * len), side, (dpx + Math.abs(Math.cos(rad(side))) * textWidth(text) / 2) / ppu));
        return res;
      },
    });
    return this;
  }

  /** Text centred exactly at c. */
  textAt(c: P, text: string) {
    this.pending.push({ text, cands: () => [c], fixed: true });
    return this;
  }

  private place(bounds: Box, ppu: number): PlanePoint[] {
    const placed: Box[] = [];
    const anchors: PlanePoint[] = [];
    for (const lab of this.pending) {
      const wpx = textWidth(lab.text);
      let best: { c: P; score: number } | null = null;
      for (const c of lab.cands(ppu)) {
        const hw = (wpx / 2 + 1.5) / ppu;
        const hh = 6.5 / ppu;
        const box: Box = { x0: c[0] - hw, x1: c[0] + hw, y0: c[1] - hh, y1: c[1] + hh };
        const A: P = [c[0] - (8 + wpx / 2) / ppu, c[1] - 12.3 / ppu];
        let score: number;
        if (lab.fixed) score = 100;
        else if (box.x0 < bounds.x0 || box.x1 > bounds.x1 || box.y0 < bounds.y0 || box.y1 > bounds.y1) score = -1000;
        else {
          let tc = Infinity;
          let ac = Infinity;
          for (const [a, b] of this.obstacles) {
            tc = Math.min(tc, distSegBox(a, b, box));
            ac = Math.min(ac, distPtSeg(A, a, b) - 5.5 / ppu);
          }
          for (const pb of placed) {
            tc = Math.min(tc, distBoxBox(pb, box) - 3 / ppu);
            ac = Math.min(ac, distPtBox(A, pb) - 5.5 / ppu);
          }
          for (const d of this.dots) {
            tc = Math.min(tc, distPtBox(d.p, box) - 7 / ppu);
            ac = Math.min(ac, Math.hypot(A[0] - d.p[0], A[1] - d.p[1]) - 11 / ppu);
          }
          score = Math.min(tc, ac) * ppu;
        }
        if (!best || score > best.score) best = { c, score };
        if (score >= 5) break;
      }
      const c = best!.c;
      const hw = (wpx / 2 + 1.5) / ppu;
      const hh = 6.5 / ppu;
      placed.push({ x0: c[0] - hw, x1: c[0] + hw, y0: c[1] - hh, y1: c[1] + hh });
      anchors.push({ x: c[0] - (8 + wpx / 2) / ppu, y: c[1] - 12.3 / ppu, label: lab.text, color: 'muted', open: true });
    }
    return anchors;
  }

  private output(T: (p: P) => P, grid: GridSpec, anchors: PlanePoint[], extra: Partial<PlaneFigure>): PlaneFigure {
    return {
      type: 'plane',
      grid,
      ...extra,
      segments: this.segs.map((s) => ({ ...s, from: T(s.from), to: T(s.to) })),
      polylines: this.polys.map((p) => ({ points: p.points.map(T), ...(p.color ? { color: p.color } : {}) })),
      points: [
        ...this.dots.map((d) => {
          const [x, y] = T(d.p);
          return { x, y, color: d.color } as PlanePoint;
        }),
        ...anchors.map((a) => {
          const [x, y] = T([a.x, a.y]);
          return { ...a, x, y };
        }),
      ],
    };
  }

  /** A plain canvas (no axes, no grid lines) sized to fit the drawing. */
  build(opts: { margin?: number; caption?: string } = {}): PlaneFigure {
    const m = opts.margin ?? 0.9;
    const pts: P[] = [...this.segs.flatMap((s) => [s.from, s.to] as P[]), ...this.polys.flatMap((p) => p.points), ...this.dots.map((d) => d.p), ...this.extra];
    let minX = Math.min(...pts.map((p) => p[0])) - m;
    let maxX = Math.max(...pts.map((p) => p[0])) + m;
    let minY = Math.min(...pts.map((p) => p[1])) - m;
    let maxY = Math.max(...pts.map((p) => p[1])) + m;
    let w = maxX - minX;
    let h = maxY - minY;
    if (w < h) {
      minX -= (h - w) / 2;
      maxX += (h - w) / 2;
      w = h;
    }
    if (w > 2.2 * h) {
      minY -= (w / 2.2 - h) / 2;
      maxY += (w / 2.2 - h) / 2;
      h = w / 2.2;
    }
    const xr = Math.ceil(w - 1e-9);
    const yr = Math.ceil(h - 1e-9);
    const ox = minX - (xr - w) / 2;
    const oy = minY - (yr - h) / 2;
    const anchors = this.place({ x0: ox, x1: ox + xr, y0: oy, y1: oy + yr }, 340 / xr);
    const T = (p: P): P => [r3(p[0] - ox), r3(p[1] - oy)];
    return this.output(T, { xMin: 0, xMax: xr, yMin: 0, yMax: yr, step: Math.max(xr, yr) }, anchors, { hideTickLabels: true, ...(opts.caption ? { caption: opts.caption } : {}) });
  }

  /** A grid with lines every unit but no numbers (a map grid); coordinates are used as given. */
  buildGrid(grid: GridSpec, caption?: string): PlaneFigure {
    const anchors = this.place({ x0: grid.xMin, x1: grid.xMax, y0: grid.yMin, y1: grid.yMax }, 340 / (grid.xMax - grid.xMin));
    return this.output((p) => [r3(p[0]), r3(p[1])], grid, anchors, { hideTickLabels: true, hideAxes: true, ...(caption ? { caption } : {}) });
  }
}

/** A floor plan: a rectangle (or L-shape) with drawing lengths on two sides. */
function planFigure(w: number, h: number, labels: { w: string; h: string }, notch?: { w: number; h: number }, room?: string): PlaneFigure {
  const s = new Sketch();
  const k = 6 / Math.max(w, h);
  const W = w * k;
  const H = h * k;
  const pts: P[] = notch
    ? [
        [0, 0],
        [W, 0],
        [W, H - notch.h * k],
        [W - notch.w * k, H - notch.h * k],
        [W - notch.w * k, H],
        [0, H],
        [0, 0],
      ]
    : [
        [0, 0],
        [W, 0],
        [W, H],
        [0, H],
        [0, 0],
      ];
  s.polyline(pts);
  const c: P = [W / 2, H / 2];
  s.sideLabel([0, 0], [W, 0], labels.w, c);
  s.sideLabel([0, 0], [0, H], labels.h, c);
  if (room) s.textAt([notch ? (W - notch.w * k) / 2 : W / 2, notch ? H / 2 - (notch.h * k) / 4 : H / 2], room);
  return s.build({ margin: 0.9 });
}

// ---------------------------------------------------------------------------
// Lesson 8.1 — Scale drawings
// ---------------------------------------------------------------------------

const PLAN_CTX = [
  { thing: 'the floor plan of an apartment', part: 'the living room', room: 'Living room' },
  { thing: 'the floor plan of a restaurant kitchen', part: 'the kitchen', room: 'Kitchen' },
  { thing: 'a plan for a backyard deck', part: 'the deck', room: 'Deck' },
  { thing: 'the floor plan of a hair salon', part: 'the salon', room: 'Salon' },
  { thing: 'a plan of a community garden', part: 'one garden bed', room: 'Garden bed' },
  { thing: 'the floor plan of a child-care centre', part: 'the play room', room: 'Play room' },
  { thing: 'a plan for a new garage', part: 'the garage floor', room: 'Garage' },
  { thing: 'the floor plan of a hotel room', part: 'the bedroom', room: 'Bedroom' },
];


/** "1 cm represents 2 m" in maths and words. */
const repr = (k: number, u: string) => `$1\\ \\text{cm}$ on the plan represents ${M(k, u)} in real life`;

const scaleSkill = skill({
  id: 'm204-scale',
  name: 'Scale drawings',
  description: 'Use the scale of a floor plan or scale drawing to find an actual length or a drawing length, and find the scale from a drawing.',
  outcomes: ['SS3'],
  lessonId: 'm204-8-1',
  calculator: true,
  gen(rng, d) {
    const who = rng.pick(NAMES);
    const ctx = rng.pick(PLAN_CTX);
    if (d === 1) {
      const k = rng.pick([2, 3, 4, 5]);
      const mode = rng.pick(['actual', 'actual', 'ruler', 'drawing'] as const);
      if (mode === 'drawing') {
        const cm = rng.int(2, Math.min(9, Math.floor(20 / k)));
        const real = cm * k;
        return {
          prompt: `${who} is drawing ${ctx.thing}. On the plan, ${repr(k, 'm')}. A real wall is ${M(real, 'm')} long. How long should ${who} draw it on the plan?`,
          parts: [numPart(cm, { suffix: 'cm' })],
          hints: [`Each centimetre on the plan stands for ${M(k, 'm')}.`, `Find how many groups of ${M(k, 'm')} are in ${M(real, 'm')}: divide.`],
          solution: [`Each $1\\ \\text{cm}$ on the plan is ${M(k, 'm')} in real life.`, `$${real} \\div ${k} = ${cm}$`, `${who} should draw the wall ${M(cm, 'cm')} long.`],
        };
      }
      const cm = rng.int(mode === 'ruler' ? 3 : 2, Math.min(9, Math.floor(20 / k)));
      const real = cm * k;
      const room = ctx.room;
      return {
        prompt:
          mode === 'ruler'
            ? `${who} measures the length of a wall on ${ctx.thing} with a ruler, as shown. On the plan, ${repr(k, 'm')}. How long is the real wall?`
            : `On ${ctx.thing}, ${repr(k, 'm')}. On the plan, ${ctx.part} is ${M(cm, 'cm')} long. How long is it in real life?`,
        figure: mode === 'ruler' ? { type: 'ruler', system: 'metric', length: 10, start: 0, end: cm } : planFigure(cm, Math.max(1, cm - rng.int(1, 3)), { w: `${cm} cm`, h: '' }, undefined, room),
        parts: [numPart(real, { suffix: 'm' })],
        hints: [mode === 'ruler' ? 'Read the ruler where the bar ends. That is the length on the plan in centimetres.' : `Each centimetre on the plan stands for ${M(k, 'm')}.`, 'Multiply the length on the plan by the real length that $1\\ \\text{cm}$ stands for.'],
        solution: [
          ...(mode === 'ruler' ? [`The wall is ${M(cm, 'cm')} long on the plan.`] : []),
          `Each $1\\ \\text{cm}$ is ${M(k, 'm')}, so multiply: $${cm} \\times ${k} = ${real}$`,
          `The real length is ${M(real, 'm')}.`,
        ],
      };
    }
    if (d === 2) {
      const mode = rng.pick(['ratio', 'ratio', 'decimal', 'drawing'] as const);
      if (mode === 'ratio') {
        const n = rng.pick([50, 50, 100, 100, 200]);
        const cm = rng.int(21, 96) / 10;
        const realCm = clean(cm * n);
        const realM = clean(realCm / 100);
        const room = ctx.room;
        const h = Math.max(1.5, roundTo(cm * rng.pick([0.5, 0.6, 0.7]), 1));
        return {
          prompt: `${ctx.thing === 'a plan for a backyard deck' ? 'A plan for a backyard deck' : cap(ctx.thing)} uses a scale of $1 : ${n}$. On the plan, a wall is ${M(cm, 'cm')} long. How long is the real wall, in metres?`,
          figure: planFigure(cm, h, { w: `${fmt(cm)} cm`, h: '' }, undefined, room),
          parts: [exact(realM, 'm')],
          hints: [`A scale of $1 : ${n}$ means $1\\ \\text{cm}$ on the plan is $${n}\\ \\text{cm}$ in real life.`, `Multiply by ${n} to get centimetres. Then divide by $100$ to change centimetres to metres.`],
          solution: [`$1 : ${n}$ means every $1\\ \\text{cm}$ on the plan is $${n}\\ \\text{cm}$ in real life.`, `$${nm(cm)} \\times ${n} = ${nm(realCm)}$, so the wall is ${M(realCm, 'cm')}.`, `$${nm(realCm)} \\div 100 = ${nm(realM)}$`, `The real wall is ${M(realM, 'm')} long.`],
        };
      }
      if (mode === 'decimal') {
        const k = rng.pick([0.5, 1.5, 2.5, 0.25, 4, 3]);
        const cm = rng.int(21, Math.min(98, Math.floor(200 / k))) / 10;
        const real = clean(cm * k);
        return {
          prompt: `On ${ctx.thing}, ${repr(k, 'm')}. ${who} measures ${ctx.part} on the plan. It is ${M(cm, 'cm')} long. How long is it in real life?`,
          parts: [exact(real, 'm')],
          hints: [`Each centimetre on the plan stands for ${M(k, 'm')}.`, `Multiply: $${nm(cm)} \\times ${nm(k)}$.`],
          solution: [`Each $1\\ \\text{cm}$ is ${M(k, 'm')}, so multiply.`, `$${nm(cm)} \\times ${nm(k)} = ${nm(real)}$`, `${cap(ctx.part)} is ${M(real, 'm')} long.`],
        };
      }
      // Find the drawing length.
      const ratio = rng.chance(0.5);
      const n = rng.pick([20, 25, 50, 100]);
      const k = rng.pick([0.5, 2, 2.5, 4]);
      const cm = rng.int(11, 39) / (ratio ? 5 : 2);
      const realM = ratio ? clean((cm * n) / 100) : clean(cm * k);
      return {
        prompt: ratio
          ? `${who} is drawing ${ctx.thing} with a scale of $1 : ${n}$. A real wall is ${M(realM, 'm')} long. How long should the wall be on the plan, in centimetres?`
          : `${who} is drawing ${ctx.thing}. On the plan, ${repr(k, 'm')}. A real wall is ${M(realM, 'm')} long. How long should the wall be on the plan?`,
        parts: [exact(cm, 'cm')],
        hints: ratio ? ['Change the real length to centimetres first: multiply metres by $100$.', `Then divide by ${n}, because every $${n}\\ \\text{cm}$ in real life is $1\\ \\text{cm}$ on the plan.`] : [`Each centimetre on the plan stands for ${M(k, 'm')}.`, `Divide the real length by ${nm(k)}.`],
        solution: ratio
          ? [`${M(realM, 'm')} $= ${nm(realM)} \\times 100 = ${nm(clean(realM * 100))}\\ \\text{cm}$`, `$${nm(clean(realM * 100))} \\div ${n} = ${nm(cm)}$`, `The wall should be ${M(cm, 'cm')} long on the plan.`]
          : [`$${nm(realM)} \\div ${nm(k)} = ${nm(cm)}$`, `The wall should be ${M(cm, 'cm')} long on the plan.`],
      };
    }
    // d3
    const mode = rng.pick(['findScale', 'findRatio', 'area'] as const);
    if (mode === 'area') {
      const k = rng.pick([0.5, 1, 1.5, 2]);
      const a = rng.int(4, Math.min(9, Math.floor(12 / k)));
      const b = rng.int(3, a - 1);
      const L = clean(a * k);
      const W = clean(b * k);
      const area = clean(L * W);
      const room = ctx.room;
      return {
        prompt: `${who} is ordering flooring for a room. On the floor plan, the room is a rectangle ${M(a, 'cm')} by ${M(b, 'cm')}, and ${repr(k, 'm')}. How many square metres of flooring does the room need?`,
        figure: planFigure(a, b, { w: `${a} cm`, h: `${b} cm` }, undefined, room),
        parts: [exact(area, 'm²')],
        hints: ['First find the real length and the real width of the room.', 'Then multiply the real length by the real width to get the area.'],
        solution: [`Real length: $${a} \\times ${nm(k)} = ${nm(L)}\\ \\text{m}$`, `Real width: $${b} \\times ${nm(k)} = ${nm(W)}\\ \\text{m}$`, `Area: $${nm(L)} \\times ${nm(W)} = ${nm(area)}$`, `The room needs $${nm(area)}\\ \\text{m}^2$ of flooring.`],
      };
    }
    if (mode === 'findScale') {
      const k = rng.pick([0.5, 1.5, 2, 2.5, 3, 4, 5]);
      const cm = rng.pick([2, 3, 4, 5, 6, 8].filter((x) => x * k <= 20));
      const real = clean(cm * k);
      return {
        prompt: `On ${ctx.thing}, a wall that is really ${M(real, 'm')} long is drawn ${M(cm, 'cm')} long. Every wall on the plan uses the same scale. Complete the scale: $1\\ \\text{cm}$ on the plan represents how many metres?`,
        parts: [exact(k, 'm', '$1\\ \\text{cm}$ represents')],
        hints: ['Find how many metres one centimetre stands for.', `Divide the real length by the length on the plan: $${nm(real)} \\div ${cm}$.`],
        solution: [`${M(cm, 'cm')} on the plan stands for ${M(real, 'm')}.`, `$${nm(real)} \\div ${cm} = ${nm(k)}$`, `The scale is $1\\ \\text{cm}$ represents ${M(k, 'm')}.`],
      };
    }
    const models = [
      { thing: 'A model pickup truck', realM: [5.5, 5.75, 6], cm: [11, 11.5, 12, 22, 23, 24] },
      { thing: 'A model of a school bus', realM: [10, 12], cm: [20, 24, 25, 40, 48] },
      { thing: 'A model of a grain bin', realM: [6, 7.5, 9], cm: [12, 15, 18, 30] },
      { thing: 'A drawing of a work van', realM: [5, 5.5, 6], cm: [10, 11, 12, 20, 22, 25] },
    ];
    for (;;) {
      const mo = rng.pick(models);
      const realM = rng.pick(mo.realM);
      const cm = rng.pick(mo.cm);
      const n = clean((realM * 100) / cm);
      if (!Number.isInteger(n) || n < 10) continue;
      return {
        prompt: `${mo.thing} is ${M(cm, 'cm')} long. The real one is ${M(realM, 'm')} long. What is the scale? Write it as $1 : n$ and give the value of $n$.`,
        parts: [numPart(n, { label: 'Scale $1 :$' })],
        hints: ['Both lengths must be in the same unit. Change the real length to centimetres: multiply by $100$.', 'Then find how many times bigger the real one is: divide the real length by the model length.'],
        solution: [`${M(realM, 'm')} $= ${nm(realM)} \\times 100 = ${nm(realM * 100)}\\ \\text{cm}$`, `$${nm(realM * 100)} \\div ${nm(cm)} = ${n}$`, `The real one is $${n}$ times as long, so the scale is $1 : ${n}$.`],
      };
    }
  },
});

// ---------------------------------------------------------------------------
// Lesson 8.2 — Map distances
// ---------------------------------------------------------------------------

/** Highway distances (km) between invented towns. */
const TRIPS: Array<[string, string, number]> = [
  ['Riverton', 'Lakeside', 300],
  ['Riverton', 'Brookfield', 150],
  ['Brookfield', 'Lakeside', 145],
  ['Lakeside', 'Hillcrest', 210],
  ['Hillcrest', 'Pinewood', 165],
  ['Lakeside', 'Pinewood', 295],
  ['Lakeside', 'Maple Falls', 130],
  ['Riverton', 'Stonebridge', 250],
  ['Lakeside', 'Westbury', 135],
  ['Riverton', 'Ashford', 435],
  ['Riverton', 'Clearwater', 465],
];

const LOCAL_MAPS = [
  { map: 'a map of a provincial park', places: ['the campground', 'the boat launch', 'the trailhead', 'the beach', 'the ranger station', 'the lookout'], k: [0.5, 1, 2], k1: [1, 2] },
  { map: 'a county road map', places: ['the farm', 'the grain elevator', 'the town', 'the gas station', 'the feed store', 'the rodeo grounds'], k: [2, 5, 10], k1: [2, 5, 10] },
  { map: 'a map of a ski hill area', places: ['the lodge', 'the parking lot', 'the chairlift', 'the rental shop', 'the hotel'], k: [0.5, 1], k1: [1] },
  { map: 'a map for a delivery route', places: ['the warehouse', 'the hardware store', 'the hospital', 'the school', 'the bakery', 'the arena'], k: [1, 2, 5], k1: [1, 2, 5] },
];

const mapDistance = skill({
  id: 'm204-map-distance',
  name: 'Distances on a map',
  description: 'Use a map scale (1 cm represents 5 km, or 1 : 250 000) to find a real distance from a map distance, and add the legs of a route.',
  outcomes: ['SS3'],
  lessonId: 'm204-8-2',
  calculator: true,
  gen(rng, d) {
    const who = rng.pick(NAMES);
    if (d === 1) {
      const lm = rng.pick(LOCAL_MAPS);
      const k = rng.pick(lm.k1);
      const cm = rng.int(2, 9);
      const real = cm * k;
      const [a, b] = rng.sample(lm.places, 2);
      const ruler = rng.chance(0.4);
      return {
        prompt: ruler
          ? `On ${lm.map}, $1\\ \\text{cm}$ represents ${M(k, 'km')}. ${who} measures from ${a} to ${b} with a ruler, as shown. What is the real distance?`
          : `On ${lm.map}, $1\\ \\text{cm}$ represents ${M(k, 'km')}. On the map, ${a} is ${M(cm, 'cm')} from ${b}. What is the real distance?`,
        ...(ruler ? { figure: { type: 'ruler' as const, system: 'metric' as const, length: 10, start: 0, end: cm } } : {}),
        parts: [numPart(real, { suffix: 'km' })],
        hints: [ruler ? 'Read the ruler where the bar ends. That is the map distance in centimetres.' : `Each centimetre on the map stands for ${M(k, 'km')}.`, 'Multiply the map distance by the number of kilometres in $1\\ \\text{cm}$.'],
        solution: [...(ruler ? [`The map distance is ${M(cm, 'cm')}.`] : []), `$${cm} \\times ${k} = ${real}$`, `The real distance is ${M(real, 'km')}.`],
      };
    }
    if (d === 2) {
      const mode = rng.pick(['towns', 'ratio', 'reverse'] as const);
      if (mode === 'towns') {
        const [a, b, km] = rng.pick(TRIPS);
        const k = rng.pick(km >= 250 ? [25, 50] : [10, 20, 25]);
        const cm = roundTo(km / k, 1);
        const real = clean(cm * k);
        return {
          prompt: `On a regional road map, $1\\ \\text{cm}$ represents ${M(k, 'km')}. ${who} measures the highway from ${a} to ${b} on the map. It is ${M(cm, 'cm')} long. About how far is the drive?`,
          parts: [exact(real, 'km')],
          hints: [`Each centimetre on the map stands for ${M(k, 'km')}.`, `Multiply: $${nm(cm)} \\times ${k}$.`],
          solution: [`$${nm(cm)} \\times ${k} = ${nm(real)}$`, `The drive is about ${M(real, 'km')}.`],
        };
      }
      if (mode === 'ratio') {
        const opts = [
          { n: 50000, k: 0.5, map: 'a hiking map', places: LOCAL_MAPS[0].places },
          { n: 100000, k: 1, map: 'a map of a provincial park', places: LOCAL_MAPS[0].places },
          { n: 250000, k: 2.5, map: 'a county map', places: LOCAL_MAPS[1].places },
          { n: 1000000, k: 10, map: 'a regional road map', places: [] as string[] },
          { n: 2000000, k: 20, map: 'a regional road map', places: [] as string[] },
        ];
        const o = rng.pick(opts);
        let a: string;
        let b: string;
        let cm: number;
        if (o.places.length) {
          [a, b] = rng.sample(o.places, 2);
          cm = rng.int(12, 98) / 10;
        } else {
          const t = rng.pick(TRIPS.filter(([, , km]) => km / o.k <= 25));
          [a, b] = [t[0], t[1]];
          cm = roundTo(t[2] / o.k, 1);
        }
        const real = clean(cm * o.k);
        return {
          prompt: `The scale of ${o.map} is $1 : ${nm(o.n)}$. On the map, ${a} is ${M(cm, 'cm')} from ${b}. What is the real distance in kilometres? (Use $1\\ \\text{km} = 100\\,000\\ \\text{cm}$.)`,
          parts: [exact(real, 'km')],
          hints: [`$1 : ${nm(o.n)}$ means $1\\ \\text{cm}$ on the map is $${nm(o.n)}\\ \\text{cm}$ in real life.`, `Change that to kilometres: $${nm(o.n)} \\div 100\\,000 = ${nm(o.k)}$. So $1\\ \\text{cm}$ represents ${M(o.k, 'km')}.`],
          solution: [`$1\\ \\text{cm}$ on the map is $${nm(o.n)}\\ \\text{cm}$ in real life.`, `$${nm(o.n)} \\div 100\\,000 = ${nm(o.k)}$, so $1\\ \\text{cm}$ represents ${M(o.k, 'km')}.`, `$${nm(cm)} \\times ${nm(o.k)} = ${nm(real)}$`, `The real distance is ${M(real, 'km')}.`],
        };
      }
      const [a, b, km] = rng.pick(TRIPS);
      const k = rng.pick([10, 20, 25, 50].filter((x) => (km / x) * 10 === Math.round((km / x) * 10) && km / x <= 20));
      const cm = clean(km / k);
      return {
        prompt: `${who} is drawing a map of the nearby towns for a school project. On the map, $1\\ \\text{cm}$ represents ${M(k, 'km')}. The highway from ${a} to ${b} is about ${M(km, 'km')} long. How long should it be on the map?`,
        parts: [exact(cm, 'cm')],
        hints: [`Each centimetre on the map stands for ${M(k, 'km')}.`, `Find how many groups of ${k} are in ${km}: divide.`],
        solution: [`$${km} \\div ${k} = ${nm(cm)}$`, `It should be ${M(cm, 'cm')} long on the map.`],
      };
    }
    // d3: a route with two or three legs.
    const lm = rng.pick(LOCAL_MAPS);
    const k = rng.pick(lm.k);
    const n = rng.chance(0.5) ? 3 : 2;
    const stops = rng.sample(lm.places, n + 1);
    const legs = Array.from({ length: n }, () => rng.int(12, 58) / 10);
    const totalCm = clean(legs.reduce((s, x) => s + x, 0));
    const real = clean(totalCm * k);
    const compare = rng.chance(0.4);
    // Route drawing: legs turn left and right like roads.
    const s = new Sketch();
    const pts: P[] = [[0, 0]];
    let dir = rng.pick([0, 20, -20, 70, -70]);
    for (const L of legs) {
      const last = pts[pts.length - 1];
      pts.push(at(last, dir, L));
      dir += rng.pick([1, -1]) * rng.int(50, 90);
    }
    s.polyline(pts);
    pts.forEach((p) => s.dot(p));
    if (compare) s.seg(pts[0], pts[pts.length - 1], { dashed: true, color: 'muted' });
    const cen: P = [pts.reduce((a, p) => a + p[0], 0) / pts.length, pts.reduce((a, p) => a + p[1], 0) / pts.length];
    legs.forEach((L, i) => s.sideLabel(pts[i], pts[i + 1], `${fmt(L)} cm`, cen));
    const short = clean(Math.round(Math.hypot(pts[n][0] - pts[0][0], pts[n][1] - pts[0][1]) * 10) / 10);
    if (compare) s.sideLabel(pts[0], pts[n], `${fmt(short)} cm`);
    stops.forEach((name, i) => s.endLabel(pts[i], dirOf(cen, pts[i]), cap(name.replace(/^the /, ''))));
    const fig = s.build({ margin: 0.6 });
    const routeText = stops.map((x) => x.replace(/^the /, '')).map(cap).join(' → ');
    if (compare && short < totalCm - 0.3) {
      const shortReal = clean(short * k);
      const diff = clean(real - shortReal);
      return {
        prompt: `On ${lm.map}, $1\\ \\text{cm}$ represents ${M(k, 'km')}. ${who} drives the road route ${routeText}. A new straight road (dashed) goes directly from ${stops[0]} to ${stops[n]}. How many kilometres shorter is the new road?`,
        figure: fig,
        parts: [exact(diff, 'km')],
        hints: ['Find the real length of each route: add the map lengths, then multiply by the scale.', 'Subtract the short route from the long route.'],
        solution: [
          `Road route on the map: $${legs.map((x) => nm(x)).join(' + ')} = ${nm(totalCm)}\\ \\text{cm}$`,
          `Real road route: $${nm(totalCm)} \\times ${nm(k)} = ${nm(real)}\\ \\text{km}$`,
          `New road: $${nm(short)} \\times ${nm(k)} = ${nm(shortReal)}\\ \\text{km}$`,
          `$${nm(real)} - ${nm(shortReal)} = ${nm(diff)}$`,
          `The new road is ${M(diff, 'km')} shorter.`,
        ],
      };
    }
    const fig2 = compare ? (() => {
      const s2 = new Sketch();
      s2.polyline(pts);
      pts.forEach((p) => s2.dot(p));
      legs.forEach((L, i) => s2.sideLabel(pts[i], pts[i + 1], `${fmt(L)} cm`, cen));
      stops.forEach((name, i) => s2.endLabel(pts[i], dirOf(cen, pts[i]), cap(name.replace(/^the /, ''))));
      return s2.build({ margin: 0.6 });
    })() : fig;
    return {
      prompt: `On ${lm.map}, $1\\ \\text{cm}$ represents ${M(k, 'km')}. ${who} follows the route ${routeText}. The map lengths of the legs are shown. What is the real length of the whole route?`,
      figure: fig2,
      parts: [exact(real, 'km')],
      hints: ['Add the map lengths of all the legs first.', `Then multiply the total by ${nm(k)}, because $1\\ \\text{cm}$ represents ${M(k, 'km')}.`],
      solution: [`Total on the map: $${legs.map((x) => nm(x)).join(' + ')} = ${nm(totalCm)}\\ \\text{cm}$`, `Real length: $${nm(totalCm)} \\times ${nm(k)} = ${nm(real)}$`, `The whole route is ${M(real, 'km')}.`],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 8.2 — Grid maps and directions
// ---------------------------------------------------------------------------

const PLACES = ['School', 'Arena', 'Library', 'Pool', 'Park', 'Clinic', 'Mall', 'Bank', 'Bakery', 'Hotel', 'Gas station', 'Fire hall', 'Post office', 'Museum', 'Bus depot', 'Café', 'Rink', 'Grocery'];
const COLS = 'ABCDEF';

interface GridMap {
  cols: number;
  rows: number;
  places: Array<{ name: string; c: number; r: number }>;
  figure: PlaneFigure;
}

const cellName = (c: number, r: number) => `${COLS[c]}${r + 1}`;

/** A map grid with lettered columns (below) and numbered rows (at the left), places in the squares and a north arrow. */
function makeGridMap(rng: Rng, count: number, must: Array<{ c: number; r: number }> = []): GridMap {
  const cols = 6;
  const rows = 5;
  for (;;) {
    const names = rng.sample(PLACES, count);
    const cells: Array<{ c: number; r: number }> = [...must];
    let guard = 0;
    while (cells.length < count && guard++ < 500) {
      const c = rng.int(0, cols - 1);
      const r = rng.int(0, rows - 1);
      if (c === cols - 1 && r === rows - 1) continue; // north arrow
      if (cells.some((x) => Math.abs(x.c - c) <= 1 && Math.abs(x.r - r) <= 1)) continue;
      cells.push({ c, r });
    }
    if (cells.length < count) continue;
    if (must.some((m) => m.c === cols - 1 && m.r === rows - 1)) continue;
    const places = names.map((name, i) => ({ name, c: cells[i].c, r: cells[i].r }));
    const s = new Sketch();
    const ppu = 340 / cols;
    // Each name sits right under its dot, inside the same square.
    for (const p of places) s.dot([p.c + 0.5, p.r + 0.64]);
    for (const p of places) s.textAt([p.c + 0.5, p.r + 0.64 - 18 / ppu], p.name);
    for (let c = 0; c < cols; c++) s.textAt([c + 0.5, -14 / ppu], COLS[c]);
    for (let r = 0; r < rows; r++) s.textAt([-14 / ppu, r + 0.5], String(r + 1));
    s.seg([cols - 0.35, rows - 0.85], [cols - 0.35, rows - 0.15], { arrowEnd: true, color: 'accent' });
    s.textAt([cols - 0.7, rows - 0.5], 'N');
    const figure = s.buildGrid({ xMin: 0, xMax: cols, yMin: 0, yMax: rows, step: 1 });
    return { cols, rows, places, figure };
  }
}

const DIRS8 = ['East', 'Northeast', 'North', 'Northwest', 'West', 'Southwest', 'South', 'Southeast'];
const ABBR: Record<string, string> = { East: 'E', Northeast: 'NE', North: 'N', Northwest: 'NW', West: 'W', Southwest: 'SW', South: 'S', Southeast: 'SE' };
const dirLabel = (d: string) => `${d} (${ABBR[d]})`;

/** The 8-point compass direction of a move (dx east, dy north). */
function compass(dx: number, dy: number): string {
  const a = ((Math.atan2(dy, dx) * 180) / Math.PI + 360) % 360;
  return DIRS8[Math.round(a / 45) % 8];
}

function moveText(dx: number, dy: number, firstNS = false): string {
  const ew = dx ? `${Math.abs(dx)} square${Math.abs(dx) === 1 ? '' : 's'} ${dx > 0 ? 'east' : 'west'}` : '';
  const ns = dy ? `${Math.abs(dy)} square${Math.abs(dy) === 1 ? '' : 's'} ${dy > 0 ? 'north' : 'south'}` : '';
  const parts = (firstNS ? [ns, ew] : [ew, ns]).filter(Boolean);
  return `Go ${parts.join(', then ')}.`;
}

const directions = skill({
  id: 'm204-directions',
  name: 'Grid maps and directions',
  description: 'Use grid locations and compass directions on a map, and give or follow route instructions.',
  outcomes: ['SS3'],
  lessonId: 'm204-8-2',
  format: 'mc',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    const town = rng.pick(['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury']);
    const intro = `The map shows part of ${town}. North is at the top of the map.`;
    const locHint = 'Find the letter below the square, then the number at the left. Write the letter first, like B3.';
    if (d === 1) {
      const mode = rng.pick(['where', 'what', 'nsew'] as const);
      if (mode === 'nsew') {
        for (;;) {
          const map = makeGridMap(rng, 5);
          const pairs = map.places.flatMap((p) => map.places.filter((q) => q !== p && (q.c === p.c || q.r === p.r)).map((q) => [p, q] as const));
          if (!pairs.length) continue;
          const [p, q] = rng.pick(pairs);
          const dir = compass(q.c - p.c, q.r - p.r);
          const n = Math.abs(q.c - p.c) + Math.abs(q.r - p.r);
          return {
            prompt: `${intro} In which direction is the **${q.name}** from the **${p.name}**?`,
            figure: map.figure,
            parts: [{ answer: fixedChoice(['North', 'South', 'East', 'West'], ['North', 'South', 'East', 'West'].indexOf(dir)) }],
            hints: ['North is up, south is down, east is to the right and west is to the left.', `Start at the ${p.name}. Which way do you move to reach the ${q.name}?`],
            solution: [`The ${p.name} is in ${cellName(p.c, p.r)} and the ${q.name} is in ${cellName(q.c, q.r)}.`, `From the ${p.name}, you move ${n} square${n === 1 ? '' : 's'} ${dir === 'North' ? 'up' : dir === 'South' ? 'down' : dir === 'East' ? 'to the right' : 'to the left'}.`, `The ${q.name} is **${dir.toLowerCase()}** of the ${p.name}.`],
            answerDisplay: dir,
          };
        }
      }
      const map = makeGridMap(rng, 5);
      const p = rng.pick(map.places);
      const cell = cellName(p.c, p.r);
      if (mode === 'where') {
        return {
          prompt: `${intro} In which square is the **${p.name}**? Write the letter, then the number.`,
          figure: map.figure,
          parts: [part({ kind: 'text', accepted: [cell, `${cell[0]} ${cell.slice(1)}`, `${cell[0]}-${cell.slice(1)}`, `${cell[0]}, ${cell.slice(1)}`, `${cell[0]},${cell.slice(1)}`] }, { label: 'Square', placeholder: 'like B3' })],
          hints: ['The letters name the columns. The numbers name the rows.', locHint],
          solution: [`The ${p.name} is in column ${cell[0]} and row ${cell.slice(1)}.`, `The ${p.name} is in square **${cell}**.`],
          answerDisplay: cell,
        };
      }
      const others = map.places.filter((x) => x !== p);
      // Prefer the place in the "swapped" square or the next squares as distractors.
      const swapped = others.find((x) => x.c === p.r && x.r === p.c);
      const near = others.sort((a, b) => Math.abs(a.c - p.c) + Math.abs(a.r - p.r) - (Math.abs(b.c - p.c) + Math.abs(b.r - p.r)));
      const ds = [...(swapped ? [swapped] : []), ...near].map((x) => x.name);
      return {
        prompt: `${intro} What is in square **${cell}**?`,
        figure: map.figure,
        parts: [{ answer: mc(rng, `The ${p.name}`, ds.map((x) => `The ${x}`)) }],
        hints: ['The letters name the columns. The numbers name the rows.', `Find column ${cell[0]} at the bottom and row ${cell.slice(1)} at the left. Go up and across until they meet.`],
        solution: [`Column ${cell[0]} and row ${cell.slice(1)} meet at the square with the ${p.name}.`, `The ${p.name} is in square ${cell}.`],
        answerDisplay: `The ${p.name}`,
      };
    }
    if (d === 2) {
      if (rng.chance(0.35)) {
        for (;;) {
          const map = makeGridMap(rng, 5);
          const [p, q] = rng.sample(map.places, 2);
          const dx = q.c - p.c;
          const dy = q.r - p.r;
          if (!dx || !dy) continue;
          const total = Math.abs(dx) + Math.abs(dy);
          return {
            prompt: `${intro} Each square is one city block. ${who} walks from the **${p.name}** to the **${q.name}** along the streets, going only ${dx > 0 ? 'east' : 'west'} and ${dy > 0 ? 'north' : 'south'}. How many blocks does ${who} walk?`,
            figure: map.figure,
            parts: [numPart(total, { suffix: 'blocks' })],
            hints: ['Count the squares across between the two places, then the squares up or down.', 'Add the two counts.'],
            solution: [`The ${p.name} is in ${cellName(p.c, p.r)} and the ${q.name} is in ${cellName(q.c, q.r)}.`, `Across: ${Math.abs(dx)} block${Math.abs(dx) === 1 ? '' : 's'} ${dx > 0 ? 'east' : 'west'}. Up or down: ${Math.abs(dy)} block${Math.abs(dy) === 1 ? '' : 's'} ${dy > 0 ? 'north' : 'south'}.`, `$${Math.abs(dx)} + ${Math.abs(dy)} = ${total}$`, `${who} walks $${total}$ blocks.`],
          };
        }
      }
      for (;;) {
        const map = makeGridMap(rng, 5);
        const [p, q] = rng.sample(map.places, 2);
        const dx = q.c - p.c;
        const dy = q.r - p.r;
        if (!dx || !dy) continue;
        const ratio = Math.abs(dy / dx);
        if (ratio < 0.5 || ratio > 2) continue;
        const dir = compass(dx, dy);
        const i = DIRS8.indexOf(dir);
        const wrong = [DIRS8[(i + 4) % 8], DIRS8[(i + 2) % 8], DIRS8[(i + 6) % 8]];
        return {
          prompt: `${intro} In which direction is the **${q.name}** from the **${p.name}**?`,
          figure: map.figure,
          parts: [{ answer: mc(rng, dirLabel(dir), wrong.map(dirLabel)) }],
          hints: ['Start at the first place named after "from". Which way do you go to reach the other place?', 'Up and to the right is northeast (NE). Up and to the left is northwest (NW). Down and to the right is southeast (SE). Down and to the left is southwest (SW).'],
          solution: [
            `Start at the ${p.name} (${cellName(p.c, p.r)}). The ${q.name} is in ${cellName(q.c, q.r)}.`,
            `To get there you go ${dy > 0 ? 'up (north)' : 'down (south)'} and ${dx > 0 ? 'to the right (east)' : 'to the left (west)'}.`,
            `So the ${q.name} is **${dir.toLowerCase()}** (${ABBR[dir]}) of the ${p.name}.`,
          ],
          answerDisplay: dirLabel(dir),
        };
      }
    }
    // d3: route instructions.
    for (;;) {
      const map = makeGridMap(rng, 6);
      const [p, q] = rng.sample(map.places, 2);
      const dx = q.c - p.c;
      const dy = q.r - p.r;
      if (!dx || !dy) continue;
      const nsFirst = rng.chance(0.5);
      if (rng.chance(0.5)) {
        const correct = moveText(dx, dy, nsFirst);
        const ds = [moveText(-dx, dy, nsFirst), moveText(dx, -dy, nsFirst), Math.abs(dx) !== Math.abs(dy) ? moveText(Math.sign(dx) * Math.abs(dy), Math.sign(dy) * Math.abs(dx), nsFirst) : moveText(-dx, -dy, nsFirst)];
        const ctx = rng.pick([`${who} delivers groceries by bike.`, `${who} is giving directions to a new co-worker.`, `${who} drives a snowplow on city streets.`]);
        return {
          prompt: `${intro} ${ctx} Which directions lead from the **${p.name}** to the **${q.name}**?`,
          figure: map.figure,
          parts: [{ answer: mc(rng, correct, ds) }],
          hints: ['Count the squares across from the start to the end. Right is east, left is west.', 'Count the squares up or down. Up is north, down is south.'],
          solution: [`Start: ${p.name} in ${cellName(p.c, p.r)}. End: ${q.name} in ${cellName(q.c, q.r)}.`, `Across: ${Math.abs(dx)} square${Math.abs(dx) === 1 ? '' : 's'} ${dx > 0 ? 'east' : 'west'}. Up or down: ${Math.abs(dy)} square${Math.abs(dy) === 1 ? '' : 's'} ${dy > 0 ? 'north' : 'south'}.`, `The directions are: ${correct}`],
          answerDisplay: correct,
        };
      }
      // Follow directions: where do you end up?
      const reach = (ex: number, ey: number) => map.places.find((x) => x.c === p.c + ex && x.r === p.r + ey);
      const traps = [reach(-dx, dy), reach(dx, -dy), reach(dy, dx), reach(-dx, -dy)].filter((x) => x && x !== q && x !== p);
      const rest = map.places.filter((x) => x !== p && x !== q && !traps.includes(x));
      const ds = [...traps, ...rng.shuffle(rest)].map((x) => `The ${x!.name}`);
      const steps = moveText(dx, dy, nsFirst).replace(/^Go /, '').replace(/\.$/, '');
      return {
        prompt: `${intro} ${who} starts at the **${p.name}** and follows these directions: go ${steps}. Where does ${who} end up?`,
        figure: map.figure,
        parts: [{ answer: mc(rng, `The ${q.name}`, ds) }],
        hints: ['Put your finger on the start. Move one square at a time.', 'North is up, south is down, east is right and west is left.'],
        solution: [`Start at the ${p.name} in ${cellName(p.c, p.r)}.`, `Move ${Math.abs(dx)} square${Math.abs(dx) === 1 ? '' : 's'} ${dx > 0 ? 'east (right)' : 'west (left)'} and ${Math.abs(dy)} square${Math.abs(dy) === 1 ? '' : 's'} ${dy > 0 ? 'north (up)' : 'south (down)'}. You reach ${cellName(q.c, q.r)}.`, `${who} ends up at the **${q.name}**.`],
        answerDisplay: `The ${q.name}`,
      };
    }
  },
});

// ---------------------------------------------------------------------------
// Lesson 8.3 — Distance, speed and time
// ---------------------------------------------------------------------------

/** "=" when x is exact to 4 decimal places, otherwise "≈" (LaTeX). */
const eqx = (x: number) => (Math.abs(roundTo(x, 4) - x) < 1e-9 ? '=' : '\\approx');

/** Hours and minutes from a time in minutes, as text. */
function hm(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return [h ? `${h} h` : '', m ? `${m} min` : ''].filter(Boolean).join(' ') || '0 min';
}

/** A clock time from minutes after midnight, like 11:45 a.m. */
function clock(min: number): string {
  const t = ((min % 1440) + 1440) % 1440;
  const h24 = Math.floor(t / 60);
  const m = t % 60;
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${String(m).padStart(2, '0')} ${h24 < 12 ? 'a.m.' : 'p.m.'}`;
}

const DRIVERS: Array<{ subj: (who: string) => string; veh: string }> = [
  { subj: (who) => `${who} drives a delivery truck`, veh: 'the truck' },
  { subj: (who) => `${who} drives a hotel shuttle van`, veh: 'the van' },
  { subj: (who) => `A bus carries ${who}'s hockey team`, veh: 'the bus' },
  { subj: (who) => `${who} drives a pickup truck full of hay`, veh: 'the truck' },
  { subj: (who) => `${who} drives a rental car`, veh: 'the car' },
  { subj: (who) => `${who} drives a tow truck`, veh: 'the tow truck' },
];

const travelTime = skill({
  id: 'm204-travel-time',
  name: 'Distance, speed and time',
  description: 'Use distance = speed × time to find travel time, average speed or distance, and plan the arrival time of a trip with a stop.',
  outcomes: ['SS3', 'PR1'],
  lessonId: 'm204-8-3',
  calculator: true,
  gen(rng, d) {
    const who = rng.pick(NAMES);
    const dr = rng.pick(DRIVERS);
    const formula = '$\\text{distance} = \\text{speed} \\times \\text{time}$';
    if (d === 1) {
      const mode = rng.pick(['time', 'distance', 'speed'] as const);
      const s = rng.pick([50, 60, 80, 90, 100, 110]);
      const t = rng.int(2, 5);
      const dist = s * t;
      const trip = rng.pick(TRIPS.filter(([, , km]) => km % s === 0 && km / s >= 2));
      if (mode === 'time') {
        const [a, b, km] = trip && rng.chance(0.5) ? trip : ['', '', dist];
        const tt = km / s;
        return {
          prompt: a ? `The drive from ${a} to ${b} is about ${M(km, 'km')}. ${who} drives at an average speed of $${s}\\ \\text{km/h}$. How many hours does the drive take?` : `${dr.subj(who)} ${M(km, 'km')} at an average speed of $${s}\\ \\text{km/h}$. How many hours does the trip take?`,
          parts: [numPart(tt, { suffix: 'h' })],
          hints: [`${formula}. To find the time, divide: $\\text{time} = \\text{distance} \\div \\text{speed}$.`, `$${km} \\div ${s}$`],
          solution: [`$\\text{time} = \\text{distance} \\div \\text{speed}$`, `$${km} \\div ${s} = ${tt}$`, `The trip takes $${tt}$ hours.`],
        };
      }
      if (mode === 'distance') {
        return {
          prompt: `${dr.subj(who)} for $${t}$ hours at an average speed of $${s}\\ \\text{km/h}$. How far does ${dr.veh} travel?`,
          parts: [numPart(dist, { suffix: 'km' })],
          hints: [`$${s}\\ \\text{km/h}$ means $${s}\\ \\text{km}$ in each hour.`, `${formula}`],
          solution: [formula, `$${s} \\times ${t} = ${dist}$`, `${cap(dr.veh)} travels ${M(dist, 'km')}.`],
        };
      }
      return {
        prompt: `${dr.subj(who)} ${M(dist, 'km')} in $${t}$ hours. What is the average speed?`,
        parts: [numPart(s, { suffix: 'km/h' })],
        hints: ['Speed is the distance travelled in one hour.', `$\\text{speed} = \\text{distance} \\div \\text{time}$`],
        solution: [`$\\text{speed} = \\text{distance} \\div \\text{time}$`, `$${dist} \\div ${t} = ${s}$`, `The average speed is $${s}\\ \\text{km/h}$.`],
      };
    }
    if (d === 2) {
      const mode = rng.pick(['hm', 'hm', 'speed', 'distance'] as const);
      if (mode === 'hm') {
        for (;;) {
          const bike = rng.chance(0.3);
          const s = bike ? rng.pick([15, 18, 20]) : rng.pick([60, 75, 80, 90, 100, 110]);
          const minutes = bike ? rng.int(9, 20) * 5 : rng.int(5, 40) * 5 + 60;
          const dist = clean((s * minutes) / 60);
          if (!Number.isInteger(dist) || minutes % 60 === 0 || (bike && dist > 25)) continue;
          const h = Math.floor(minutes / 60);
          const m = minutes % 60;
          const th = clean(minutes / 60);
          return {
            prompt: bike
              ? `${who} rides a bike ${M(dist, 'km')} to work at an average speed of $${s}\\ \\text{km/h}$. How long does the ride take? Give your answer in hours and minutes.`
              : `${dr.subj(who)} ${M(dist, 'km')} at an average speed of $${s}\\ \\text{km/h}$. How long does the trip take? Give your answer in hours and minutes.`,
            parts: [numPart(h, { suffix: 'h', label: 'Hours' }), numPart(m, { suffix: 'min', label: 'Minutes' })],
            hints: [`$\\text{time} = \\text{distance} \\div \\text{speed}$. The answer is in hours.`, 'Change the decimal part of the hours to minutes: multiply it by $60$.'],
            solution: [
              `$${dist} \\div ${s} ${Number.isInteger(th * 100) ? '=' : '\\approx'} ${nm(th, 4)}$ hours`,
              `That is $${h}$ hour${h === 1 ? '' : 's'} and $${nm(clean(th - h), 4)}$ of an hour.`,
              `$${nm(clean(th - h), 4)} \\times 60 ${Number.isInteger(th * 10000) ? '=' : '\\approx'} ${m}$ minutes`,
              `The trip takes ${hm(minutes)}.`,
            ],
          };
        }
      }
      if (mode === 'speed') {
        for (;;) {
          const s = rng.pick([60, 70, 75, 80, 84, 90, 96, 100, 105]);
          const minutes = rng.pick([90, 150, 210, 270, 135, 105, 165, 195]);
          const dist = clean((s * minutes) / 60);
          if (!Number.isInteger(dist)) continue;
          const th = clean(minutes / 60);
          return {
            prompt: `${dr.subj(who)} ${M(dist, 'km')}. The trip takes ${hm(minutes)}. What is the average speed in kilometres per hour?`,
            parts: [numPart(s, { suffix: 'km/h' })],
            hints: [`Change the time to hours first: ${minutes % 60} minutes is $\\frac{${minutes % 60}}{60}$ of an hour.`, '$\\text{speed} = \\text{distance} \\div \\text{time}$'],
            solution: [`${hm(minutes)} $= ${Math.floor(minutes / 60)} + \\frac{${minutes % 60}}{60} = ${nm(th)}$ hours`, `$${dist} \\div ${nm(th)} = ${s}$`, `The average speed is $${s}\\ \\text{km/h}$.`],
          };
        }
      }
      const s = rng.pick([60, 80, 90, 100, 110]);
      const minutes = rng.pick([30, 90, 150, 210, 45, 75, 105]);
      const th = clean(minutes / 60);
      const dist = clean(s * th);
      return {
        prompt: `${dr.subj(who)} for ${hm(minutes)} at an average speed of $${s}\\ \\text{km/h}$. How far does ${dr.veh} travel?`,
        parts: [exact(dist, 'km')],
        hints: [`Change the time to hours: ${minutes % 60} minutes is $\\frac{${minutes % 60}}{60}$ of an hour.`, formula],
        solution: [`${hm(minutes)} $= ${nm(th)}$ hours`, `$${s} \\times ${nm(th)} = ${nm(dist)}$`, `${cap(dr.veh)} travels ${M(dist, 'km')}.`],
      };
    }
    // d3
    if (rng.chance(0.4)) {
      // Two legs at different speeds.
      for (;;) {
        const s1 = rng.pick([40, 50, 60]);
        const m1 = rng.pick([10, 12, 15, 18, 20, 24]);
        const s2 = rng.pick([90, 100, 110]);
        const m2 = rng.pick([60, 75, 90, 120]);
        const d1 = clean((s1 * m1) / 60);
        const d2 = clean((s2 * m2) / 60);
        if (!Number.isInteger(d1) || !Number.isInteger(d2)) continue;
        const total = m1 + m2;
        return {
          prompt: `${who} drives a work truck from ${rng.pick(['Ashford', 'Clearwater', 'Brookfield', 'Hillcrest', 'Pinewood'])} to a ${rng.pick(['farm', 'job site', 'gravel pit', 'ranch'])}. The first ${M(d1, 'km')} are on city streets at an average of $${s1}\\ \\text{km/h}$. The last ${M(d2, 'km')} are on the highway at an average of $${s2}\\ \\text{km/h}$. How long does the whole drive take? Give your answer in hours and minutes.`,
          parts: [numPart(Math.floor(total / 60), { suffix: 'h', label: 'Hours' }), numPart(total % 60, { suffix: 'min', label: 'Minutes' })],
          hints: ['Find the time for each part of the drive: $\\text{time} = \\text{distance} \\div \\text{speed}$.', 'Change each time to minutes (multiply hours by $60$), then add.'],
          solution: [
            `City: $${d1} \\div ${s1} ${eqx(m1 / 60)} ${nm(clean(m1 / 60), 4)}$ h, which is $${nm(clean(m1 / 60), 4)} \\times 60 ${eqx(m1 / 60)} ${m1}$ min.`,
            `Highway: $${d2} \\div ${s2} ${eqx(m2 / 60)} ${nm(clean(m2 / 60), 4)}$ h, which is $${m2}$ min.`,
            `Total: $${m1} + ${m2} = ${total}$ min, which is ${hm(total)}.`,
            `The whole drive takes ${hm(total)}.`,
          ],
        };
      }
    }
    // Arrival time with a stop.
    for (;;) {
      const [a, b, km] = rng.pick(TRIPS);
      const s = rng.pick([80, 90, 100, 100, 110]);
      const drive = (km / s) * 60;
      if (!Number.isInteger(drive) || drive % 5 !== 0) continue;
      const stop = rng.pick([15, 20, 30, 45, 60]);
      const leave = rng.int(14, 22) * 30 + rng.pick([0, 15]);
      const arrive = leave + drive + stop;
      const th = clean(drive / 60);
      const frac = clean(th - Math.floor(th));
      const misread = Math.floor(th) * 60 + Math.round(frac * 100);
      const wrong = [leave + drive, frac && Math.round(frac * 100) !== Math.round(frac * 60) && Math.round(frac * 100) < 100 ? leave + misread + stop : leave + drive + 2 * stop, leave + drive + stop + 60, leave + drive - stop];
      const ds = wrong.filter((w) => w !== arrive).map(clock);
      return {
        prompt: `${who} leaves ${a} at ${clock(leave)} and drives about ${M(km, 'km')} to ${b} at an average speed of $${s}\\ \\text{km/h}$. On the way, ${who} stops for ${stop} minutes ${rng.pick(['for lunch', 'for gas', 'to stretch', 'for coffee'])}. At what time does ${who} arrive?`,
        parts: [{ answer: mc(rng, clock(arrive), ds) }],
        hints: ['First find the driving time: $\\text{time} = \\text{distance} \\div \\text{speed}$. Change any decimal part of an hour to minutes.', 'Add the driving time and the stop to the start time.'],
        solution: [
          `Driving time: $${km} \\div ${s} ${Number.isInteger(th * 100) ? '=' : '\\approx'} ${nm(th, 4)}$ h, which is ${hm(drive)}`,
          `Total time with the stop: ${hm(drive)} $+$ ${stop} min $=$ ${hm(drive + stop)}`,
          `${clock(leave)} $+$ ${hm(drive + stop)} $=$ ${clock(arrive)}`,
          `${who} arrives at ${clock(arrive)}`,
        ],
        answerDisplay: clock(arrive),
      };
    }
  },
});

export const MAP_SKILLS: SkillDef[] = [scaleSkill, mapDistance, directions, travelTime];
