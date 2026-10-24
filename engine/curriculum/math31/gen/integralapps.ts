/** Math 31 Unit 9 — Applications of Integrals: areas between curves and volumes of solids of revolution (IA1). */
import { mc, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, toFrac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { GridSpec, PlaneFigure, PlaneLine, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';
import { cf, curve, hatch, hatchWhere, isSum, lines, niceGrid, par, plotBox, polyTex, r3, range, snap, tn, valuePart, type Pt, type Val } from './integrals.ts';

// ---------------------------------------------------------------------------
// Polynomials, as coefficient lists from the constant term up: [c0, c1, c2, ...]
// ---------------------------------------------------------------------------

type Poly = number[];

function trim(p: Poly): Poly {
  const q = p.map((c) => (Math.abs(c) < 1e-12 ? 0 : snap(c)));
  while (q.length > 1 && q[q.length - 1] === 0) q.pop();
  return q;
}
const padd = (p: Poly, q: Poly): Poly => trim(Array.from({ length: Math.max(p.length, q.length) }, (_, i) => (p[i] ?? 0) + (q[i] ?? 0)));
const pscale = (p: Poly, k: number): Poly => trim(p.map((c) => c * k));
const psub = (p: Poly, q: Poly): Poly => padd(p, pscale(q, -1));
function pmul(p: Poly, q: Poly): Poly {
  const r: number[] = new Array(p.length + q.length - 1).fill(0);
  p.forEach((a, i) => q.forEach((b, j) => (r[i + j] += a * b)));
  return trim(r);
}
const pval = (p: Poly, x: number) => p.reduce((s, c, i) => s + c * x ** i, 0);
const pint = (p: Poly): Poly => trim([0, ...p.map((c, i) => c / (i + 1))]);
const ptex = (p: Poly, v = 'x') => polyTex(p.map((c, n): [number, number] => [c, n]).reverse(), v);
const fromRoots = (rs: number[]): Poly => rs.reduce<Poly>((acc, r) => pmul(acc, [-r, 1]), [1]);

/** (x - r) as a factor; x itself when r = 0. */
const lin = (r: number, v = 'x') => (r === 0 ? v : `(${v} ${r > 0 ? '-' : '+'} ${Math.abs(r)})`);
/** s(x - r1)(x - r2)... with the factor x first. */
function factoredTex(s: number, roots: number[], v = 'x'): string {
  const rs = [...roots].sort((a, b) => (a === 0 ? -1 : b === 0 ? 1 : a - b));
  return `${s === 1 ? '' : s === -1 ? '-' : tn(s)}${rs.map((r) => lin(r, v)).join('')}`;
}
/** Brackets for writing an expression inside [(T) - (B)]. */
const brk = (t: string) => (isSum(t) || t.startsWith('-') ? `\\left(${t}\\right)` : t);

const PI_NOTE = ' Give the exact value in terms of $\\pi$ or round to the nearest hundredth.';

/** A volume qπ as an answer, with its exact form. */
function piVal(q: number, o: { label?: string } = {}): Val {
  const f = toFrac(q, 2000)!;
  const n = f.n === 1 ? '' : `${f.n}`;
  const tex = f.d === 1 ? `${n}\\pi` : `\\dfrac{${n}\\pi}{${f.d}}`;
  const typed = f.d === 1 ? `${n}pi` : `${n}pi/${f.d}`;
  return valuePart(q * Math.PI, { tex, exact: typed, note: PI_NOTE, ...o });
}

// ---------------------------------------------------------------------------
// Figures
// ---------------------------------------------------------------------------

interface Drawn {
  f: (x: number) => number;
  tex: string;
  color: 'brand' | 'accent';
  /** Label text for the figure when the TeX is too complex for it (nested braces): y = <label>. */
  label?: string;
  /** Draw the curve only for x > x0 (1/x and 1/sqrt(x) are drawn for x > 0 only). */
  x0?: number;
}

/** A grid that shows the region a ≤ x ≤ b of the given curves with some room around it (and the axes when they are near). */
function regionGrid(fs: Array<(x: number) => number>, a: number, b: number, o: { x0?: number; x1?: number; y0?: number; y1?: number; xStep?: number } = {}): GridSpec {
  const pad = Math.max(0.5, 0.2 * (b - a));
  let x0 = o.x0 ?? a - pad;
  const x1 = o.x1 ?? b + pad;
  if (o.x0 === undefined && a >= 0 && a < 3) x0 = Math.min(x0, -0.25 * pad);
  let lo = Infinity;
  let hi = -Infinity;
  for (const f of fs) {
    const [l, h] = range(f, a, b);
    lo = Math.min(lo, l);
    hi = Math.max(hi, h);
  }
  const span = Math.max(hi - lo, 1);
  let y0 = o.y0 ?? lo - 0.2 * span;
  let y1 = o.y1 ?? hi + 0.25 * span;
  if (o.y0 === undefined && y0 > 0 && lo < 2 * span) y0 = -0.1 * span;
  if (o.y1 === undefined && y1 < 0 && -hi < 2 * span) y1 = 0.1 * span;
  return niceGrid(x0, x1, y0, y1, o.xStep);
}

/** A curve's TeX made simple enough for a figure label (labels are converted to plain text, without nested braces). */
function figLabel(tex: string): string {
  return tex
    .replace(/\^\{2\}/g, '²')
    .replace(/\^\{3\}/g, '³')
    .replace(/e\^\{x\}/g, 'eˣ')
    .replace(/\\sqrt\{([^{}]*)\}/g, (_, a: string) => (a.includes(' ') ? `√(${a})` : `√${a}`));
}

/** Approximate on-screen width (px) of a label such as y = x^{2} + 1. */
function labelWidth(tex: string): number {
  const plain = tex
    .replace(/\\(?:d|t)?frac\{([^{}]*)\}\{([^{}]*)\}/g, '$1/$2')
    .replace(/\\sqrt/g, 'r')
    .replace(/\\[a-zA-Z]+/g, 'x')
    .replace(/[{}^\\]/g, '');
  return plain.length * 6.8;
}

/**
 * Labelled points (y = ...) on curves. Each label is drawn above and to the right of its point, so the point
 * is chosen (scanning the curve) to keep the label inside the plot and off the other labels, and as far as
 * possible off the shaded region and the curves.
 */
function placeLabels(
  items: Array<{ f: (x: number) => number; label: string; color: 'brand' | 'accent' | 'muted' }>,
  g: GridSpec,
  blocked: (x: number, y: number) => boolean = () => false,
  reserved: PlanePoint[] = [],
): PlanePoint[] {
  const { w, h } = plotBox(g);
  const sx = w / (g.xMax - g.xMin);
  const sy = h / (g.yMax - g.yMin);
  type Box = [number, number, number, number];
  const boxOf = (x: number, y: number, tw: number): Box => [x + 5 / sx, x + (12 + tw) / sx, y + 3 / sy, y + 22 / sy];
  const boxes: Box[] = reserved.map((p) => boxOf(p.x, p.y, labelWidth(p.label ?? '')));
  const out: PlanePoint[] = [];
  for (const it of items) {
    const tw = labelWidth(it.label);
    let best: { x: number; y: number; box: Box; cost: number } | null = null;
    for (let i = 0; i <= 80; i++) {
      const x = g.xMax - ((g.xMax - g.xMin) * i) / 80;
      const y = it.f(x);
      if (!Number.isFinite(y) || y < g.yMin + 6 / sy || y > g.yMax - 24 / sy || x < g.xMin + 4 / sx) continue;
      const box = boxOf(x, y, tw);
      if (box[1] > g.xMax + 8 / sx) continue;
      if (boxes.some((b) => b[0] < box[1] && box[0] < b[1] && b[2] < box[3] && box[2] < b[3])) continue;
      let cost = i * 0.01;
      for (let k = 0; k <= 12; k++) {
        const t = box[0] + ((box[1] - box[0]) * k) / 12;
        for (const other of items) {
          const yt = other.f(t);
          if (Number.isFinite(yt) && yt > box[2] - 2 / sy && yt < box[3] + 2 / sy) cost += other === it ? 1 : 3;
        }
        for (let j = 0; j <= 3; j++) if (blocked(t, box[2] + ((box[3] - box[2]) * j) / 3)) cost += 2;
      }
      for (const p of reserved) if (Math.hypot((p.x - x) * sx, (p.y - y) * sy) < 14) cost += 20;
      if (!best || cost < best.cost) best = { x, y, box, cost };
    }
    if (!best) continue;
    boxes.push(best.box);
    out.push({ x: r3(best.x), y: r3(best.y), label: it.label, color: it.color === 'muted' ? 'brand' : it.color });
  }
  return out;
}

/** Two (or more) curves with a hatched region, labelled. */
function areaFigure(drawn: Drawn[], g: GridSpec, segs: PlaneSegment[], inRegion: (x: number, y: number) => boolean, extra: { points?: PlanePoint[]; segments?: PlaneSegment[]; noLabels?: boolean } = {}): PlaneFigure {
  const labels = extra.noLabels ? [] : placeLabels(drawn.map((d) => ({ f: d.f, label: `y = ${d.label ?? figLabel(d.tex)}`, color: d.color })), g, inRegion, extra.points ?? []);
  const points = [...labels, ...(extra.points ?? [])];
  return {
    type: 'plane',
    grid: g,
    polylines: drawn.flatMap((d) => lines(curve(d.f, g.xMin, g.xMax, g, 160), d.color)),
    segments: [...segs, ...(extra.segments ?? [])],
    ...(points.length ? { points } : {}),
  };
}

// ---------------------------------------------------------------------------
// 9.1 — Area between curves
// ---------------------------------------------------------------------------

const AREA_FORMULA = 'Area between curves: $A = \\displaystyle\\int_a^b \\big[(\\text{upper curve}) - (\\text{lower curve})\\big]\\,dx$.';

/** A line or parabola meeting another at x = r1 and x = r2 (with B - T = s(x - r1)(x - r2)). */
interface Meet {
  T: Poly;
  B: Poly;
  r1: number;
  r2: number;
  s: number;
  axis: boolean;
}

function meetCase(rng: Rng, kinds: Array<'line-up' | 'line-down' | 'two' | 'axis'>): Meet {
  const kind = rng.pick(kinds);
  const r1 = rng.int(-3, 1);
  const r2 = r1 + rng.pick([2, 3, 3, 4]);
  const Q = fromRoots([r1, r2]);
  if (kind === 'line-up') {
    const T = [rng.int(-2, 4), rng.pick([-2, -1, 1, 2, 3])];
    return { T, B: padd(T, Q), r1, r2, s: 1, axis: false };
  }
  if (kind === 'line-down') {
    const B = trim([rng.int(-3, 2), rng.pick([-2, -1, 0, 1, 2])]);
    return { T: psub(B, Q), B, r1, r2, s: 1, axis: false };
  }
  if (kind === 'two') {
    const B = [rng.int(-3, 2), rng.int(-2, 2), 1];
    return { T: psub(B, pscale(Q, 2)), B, r1, r2, s: 2, axis: false };
  }
  const s = rng.pick([1, 1, 2]);
  return { T: pscale(Q, -s), B: [0], r1, r2, s, axis: true };
}

function meetFigure(m: Meet, o: { points?: boolean; labels?: boolean } = {}): PlaneFigure {
  const T = (x: number) => pval(m.T, x);
  const B = (x: number) => pval(m.B, x);
  const g = regionGrid([T, B], m.r1, m.r2);
  const drawn: Drawn[] = [{ f: T, tex: ptex(m.T), color: 'brand' }];
  if (!m.axis) drawn.push({ f: B, tex: ptex(m.B), color: 'accent' });
  const segs = hatch(B, T, m.r1, m.r2, g);
  const pts: PlanePoint[] = o.points
    ? [m.r1, m.r2].map((x) => ({ x, y: snap(B(x)), label: `(${x}, ${fmt(snap(B(x)))})`, color: 'accent' as const }))
    : [];
  return areaFigure(drawn, g, segs, (x, y) => x > m.r1 && x < m.r2 && y > B(x) && y < T(x), { points: pts, noLabels: o.labels === false });
}

/** "Set the curves equal" steps for a Meet. */
function meetSteps(m: Meet): string[] {
  const BT = psub(m.B, m.T);
  const eq = m.axis ? `Find where the curve meets the $x$-axis: $${ptex(m.T)} = 0$, so $${ptex(BT)} = 0$` : `Set the curves equal: $${ptex(m.T)} = ${ptex(m.B)}$, so $${ptex(BT)} = 0$`;
  const mid = m.r1 + 1;
  return [
    `${eq}, which factors as $${factoredTex(m.s, [m.r1, m.r2])} = 0$. They meet at $x = ${m.r1}$ and $x = ${m.r2}$.`,
    `Between them, $y = ${ptex(m.T)}$ is the upper curve: at $x = ${mid}$ it equals $${tn(pval(m.T, mid))}$, while ${m.axis ? 'the $x$-axis is $0$' : `$y = ${ptex(m.B)}$ equals $${tn(pval(m.B, mid))}$`}.`,
  ];
}

/** ∫_a^b (T - B) dx for polynomials, with its worked steps. */
function polyArea(T: Poly, B: Poly, a: number, b: number, axis = false): { value: number; steps: string[] } {
  const D = psub(T, B);
  const F = pint(D);
  const Fa = snap(pval(F, a));
  const Fb = snap(pval(F, b));
  const value = snap(Fb - Fa);
  const setup = axis ? brk(ptex(T)) : `\\left[${brk(ptex(T))} - ${brk(ptex(B))}\\right]`;
  return {
    value,
    steps: [
      `$A = \\displaystyle\\int_{${a}}^{${b}} ${setup}\\,dx${axis ? '' : ` = \\int_{${a}}^{${b}} ${brk(ptex(D))}\\,dx`}$`,
      `$= \\Big[${ptex(F)}\\Big]_{${a}}^{${b}} = ${tn(Fb)} - ${par(Fa)} = ${tn(value)}$`,
    ],
  };
}

/** The region between y = a√x and y = x/k (or y = √x and y = x²), first-quadrant cases. */
interface RootCase {
  T: Drawn;
  B: Drawn;
  r2: number;
  meet: string;
  F: string;
  FbTex: string;
  value: number;
}

function rootCase(rng: Rng): RootCase {
  if (rng.chance(0.25)) {
    return {
      T: { f: Math.sqrt, tex: '\\sqrt{x}', color: 'brand' },
      B: { f: (x) => x * x, tex: 'x^{2}', color: 'accent' },
      r2: 1,
      meet: '$\\sqrt{x} = x^{2}$. Squaring gives $x = x^{4}$, so $x(x^{3} - 1) = 0$ and $x = 0$ or $x = 1$.',
      F: '\\frac{2}{3}x^{3/2} - \\frac{1}{3}x^{3}',
      FbTex: '\\frac{2}{3} - \\frac{1}{3}',
      value: 1 / 3,
    };
  }
  const [a, k] = rng.pick([[1, 1], [1, 2], [2, 1], [1, 3]] as const);
  const r2 = a * a * k * k;
  const value = (a ** 4 * k ** 3) / 6;
  const Bt = k === 1 ? 'x' : `\\dfrac{x}{${k}}`;
  return {
    T: { f: (x) => a * Math.sqrt(x), tex: `${cf(a)}\\sqrt{x}`, color: 'brand' },
    B: { f: (x) => x / k, tex: k === 1 ? 'x' : `\\frac{x}{${k}}`, color: 'accent' },
    r2,
    meet: `$${cf(a)}\\sqrt{x} = ${Bt}$. Squaring gives $${a * a === 1 ? '' : a * a}x = ${k === 1 ? 'x^{2}' : `\\dfrac{x^{2}}{${k * k}}`}$, so $x^{2} - ${r2 === 1 ? '' : r2}x = 0$ and $x(x - ${r2}) = 0$: $x = 0$ or $x = ${r2}$.`,
    F: `${cf(snap((2 * a) / 3))}x^{3/2} - ${tn(1 / (2 * k))}x^{2}`,
    FbTex: `${tn((2 * a) / 3)}(${r2})^{3/2} - ${tn(1 / (2 * k))}(${r2})^{2}`,
    value,
  };
}

const areaBetween = skill({
  id: 'm31-area-between',
  name: 'Area between curves',
  description: 'Find the area between two curves: set up the integral of upper minus lower, find the points of intersection, and split the region where the curves cross.',
  outcomes: ['IA1'],
  lessonId: 'm31-9-1',
  calculator: true,
  gen(rng, d): GenOutput {
    const kind =
      d === 1 ? rng.pick(['given', 'given', 'setupMc'] as const) : d === 2 ? rng.pick(['meet', 'meet', 'meet', 'root'] as const) : rng.pick(['cubic', 'split', 'trig', 'yInt', 'app'] as const);

    if (kind === 'given') {
      const o = retry(
        () => {
          const T: Poly = rng.pick([
            [rng.int(1, 4), 0, 1],
            [rng.int(5, 9), 0, -1],
            [rng.int(2, 6), rng.pick([1, 2, 3])],
            [rng.int(1, 3), 0, 0.5],
          ]);
          const B: Poly = rng.pick([[0, 1], [-rng.int(1, 3), 1], [-rng.int(1, 3)], [0, -1], [-rng.int(2, 4), 0, 0.5]]);
          const a = rng.int(-1, 1);
          const b = a + rng.int(2, 3);
          return { T: trim(T), B: trim(B), a, b };
        },
        ({ T, B, a, b }) => range((x) => pval(T, x) - pval(B, x), a, b)[0] > 0.4,
      );
      const { T, B, a, b } = o;
      const Tf = (x: number) => pval(T, x);
      const Bf = (x: number) => pval(B, x);
      const r = polyArea(T, B, a, b);
      const v = valuePart(r.value);
      const g = regionGrid([Tf, Bf], a, b);
      const fig = areaFigure(
        [
          { f: Tf, tex: ptex(T), color: 'brand' },
          { f: Bf, tex: ptex(B), color: 'accent' },
        ],
        g,
        hatch(Bf, Tf, a, b, g),
        (x, y) => x > a && x < b && y > Bf(x) && y < Tf(x),
        { segments: [a, b].map((x): PlaneSegment => ({ from: [x, r3(Bf(x))], to: [x, r3(Tf(x))], color: 'muted' })) },
      );
      const names = rng.shuffle([`$y = ${ptex(T)}$`, `$y = ${ptex(B)}$`]);
      return {
        prompt: `Find the area of the region bounded by ${names[0]}, ${names[1]}, $x = ${a}$ and $x = ${b}$ (shaded in the graph).${v.note}`,
        figure: fig,
        parts: [{ ...v.part, label: '$A =$' }],
        hints: ['Decide which curve is on top: on this interval the upper curve stays above the lower one.', AREA_FORMULA],
        solution: [`On $[${a}, ${b}]$, $y = ${ptex(T)}$ is above $y = ${ptex(B)}$ (at $x = ${a}$: $${tn(Tf(a))} > ${tn(Bf(a))}$).`, ...r.steps, `The area is $${v.show}$ square units.`],
      };
    }

    if (kind === 'setupMc') {
      const m = meetCase(rng, ['line-up', 'line-down', 'two']);
      const Tt = brk(ptex(m.T));
      const Bt = brk(ptex(m.B));
      const I = (lo: number | string, hi: number | string, body: string) => `$\\displaystyle\\int_{${lo}}^{${hi}} ${body}\\,dx$`;
      const y1 = snap(pval(m.B, m.r1));
      const y2 = snap(pval(m.B, m.r2));
      const correct = I(m.r1, m.r2, `\\left[${Tt} - ${Bt}\\right]`);
      const wrongLimits = y1 !== m.r1 || y2 !== m.r2 ? I(Math.min(y1, y2), Math.max(y1, y2), `\\left[${Tt} - ${Bt}\\right]`) : I(m.r1, m.r2, Tt);
      return {
        prompt: `The curves $y = ${ptex(m.T)}$ and $y = ${ptex(m.B)}$ meet at the two points shown. Which integral gives the area of the shaded region between them?`,
        figure: meetFigure(m, { points: true }),
        parts: [part(mc(rng, correct, [I(m.r1, m.r2, `\\left[${Bt} - ${Tt}\\right]`), I(m.r1, m.r2, `\\left[${Tt} + ${Bt}\\right]`), wrongLimits]))],
        hints: ['The limits are the $x$-coordinates where the curves meet.', 'The integrand is (upper curve) − (lower curve); read from the graph which curve is on top.'],
        solution: [
          `The curves meet at $x = ${m.r1}$ and $x = ${m.r2}$, so these are the limits (they are $x$-values, not $y$-values).`,
          `On $[${m.r1}, ${m.r2}]$ the upper curve is $y = ${ptex(m.T)}$.`,
          `The area is ${correct}.`,
        ],
      };
    }

    if (kind === 'meet') {
      const m = meetCase(rng, ['line-up', 'line-down', 'two', 'axis']);
      const r = polyArea(m.T, m.B, m.r1, m.r2, m.axis);
      const v = valuePart(r.value, { label: '(b) $A =$' });
      const names = rng.shuffle([`$y = ${ptex(m.T)}$`, `$y = ${ptex(m.B)}$`]);
      return {
        prompt: `${m.axis ? `Consider the region enclosed by $y = ${ptex(m.T)}$ and the $x$-axis.` : `Consider the region enclosed by ${names[0]} and ${names[1]}.`}\n\n(a) Find the $x$-coordinates of the points where they meet. (b) Find the area of the region.${v.note}`,
        figure: meetFigure(m),
        parts: [part({ kind: 'numbers', values: [m.r1, m.r2] }, { label: '(a) $x =$', placeholder: 'e.g. -1, 3' }), v.part],
        hints: ['Set the two expressions equal and solve; the solutions are the limits of integration.', AREA_FORMULA],
        solution: [...meetSteps(m), ...r.steps, `(a) $x = ${m.r1}$ and $x = ${m.r2}$; (b) the area is $${v.show}$ square units.`],
      };
    }

    if (kind === 'root') {
      const c = rootCase(rng);
      const v = valuePart(c.value, { label: '(b) $A =$' });
      const g = regionGrid([c.T.f, c.B.f], 0, c.r2, { x0: -0.1 * c.r2 - 0.25 });
      const fig = areaFigure([c.T, c.B], g, hatch(c.B.f, c.T.f, 0, c.r2, g), (x, y) => x > 0 && x < c.r2 && y > c.B.f(x) && y < c.T.f(x));
      return {
        prompt: `Consider the region enclosed by $y = ${c.T.tex}$ and $y = ${c.B.tex}$.\n\n(a) Find the $x$-coordinates of the points where they meet. (b) Find the area of the region.${v.note}`,
        figure: fig,
        parts: [part({ kind: 'numbers', values: [0, c.r2] }, { label: '(a) $x =$', placeholder: 'e.g. 0, 4' }), v.part],
        hints: ['Set the expressions equal and square both sides to remove the root (check the solutions).', 'Write $\\sqrt{x} = x^{1/2}$ to integrate. ' + AREA_FORMULA],
        solution: [
          `Set them equal: ${c.meet}`,
          `Between $x = 0$ and $x = ${c.r2}$, $y = ${c.T.tex}$ is on top (at $x = ${c.r2 / 4}$: $${fmt(c.T.f(c.r2 / 4))} > ${fmt(c.B.f(c.r2 / 4))}$).`,
          `$A = \\displaystyle\\int_0^{${c.r2}} \\left(${c.T.tex} - ${c.B.tex}\\right)dx = \\Big[${c.F}\\Big]_0^{${c.r2}}$`,
          `$= ${c.FbTex} - 0 = ${tn(c.value)}$`,
          `(a) $x = 0$ and $x = ${c.r2}$; (b) the area is $${v.show}$ square units.`,
        ],
      };
    }

    if (kind === 'cubic' || kind === 'split') {
      let T: Poly;
      let B: Poly;
      let cuts: number[];
      let roots: number[];
      let s: number;
      let a: number;
      let b: number;
      if (kind === 'cubic') {
        roots = rng.pick([[-2, 0, 2], [-1, 0, 1], [-2, 0, 1], [-1, 0, 2], [-1, 1, 2], [0, 1, 3], [-3, 0, 3]]);
        s = rng.sign();
        B = rng.pick([[0], [0, 1], [0, -1], [1, 1], [-1]]);
        T = padd(B, pscale(fromRoots(roots), s));
        cuts = roots;
        [a, b] = [roots[0], roots[2]];
      } else {
        const r1 = rng.int(-2, 1);
        const r2 = r1 + rng.pick([2, 3]);
        roots = [r1, r2];
        s = rng.sign();
        B = trim([rng.int(-2, 2), rng.pick([1, 2, -1, 0])]);
        T = padd(B, pscale(fromRoots(roots), s));
        const e = rng.pick([1, 2]);
        [a, b] = rng.chance(0.5) ? [r1, r2 + e] : [r1 - e, r2];
        cuts = [a, ...roots.filter((r) => r > a && r < b), b];
      }
      const D = psub(T, B);
      const F = pint(D);
      const pieces = cuts.slice(1).map((x, i) => ({ lo: cuts[i], hi: x, I: snap(pval(F, x) - pval(F, cuts[i])) }));
      const total = snap(pieces.reduce((t, p) => t + Math.abs(p.I), 0));
      const v = valuePart(total, { label: kind === 'cubic' ? '(b) Total area $=$' : 'Total area $=$' });
      const Tf = (x: number) => pval(T, x);
      const Bf = (x: number) => pval(B, x);
      const axis = B.length === 1 && B[0] === 0;
      const g = regionGrid([Tf, Bf], a, b);
      const lo = (x: number) => Math.min(Tf(x), Bf(x));
      const hi = (x: number) => Math.max(Tf(x), Bf(x));
      const drawn: Drawn[] = [{ f: Tf, tex: ptex(T), color: 'brand' }];
      if (!axis) drawn.push({ f: Bf, tex: ptex(B), color: 'accent' });
      const fig = areaFigure(drawn, g, hatch(lo, hi, a, b, g), (x, y) => x > a && x < b && y > lo(x) && y < hi(x), {
        segments: kind === 'split' ? [a, b].map((x): PlaneSegment => ({ from: [x, r3(lo(x))], to: [x, r3(hi(x))], color: 'muted' })) : [],
      });
      const other = axis ? 'the $x$-axis' : `$y = ${ptex(B)}$`;
      const pieceTex = pieces.map((p) => `$\\displaystyle\\int_{${p.lo}}^{${p.hi}} ${brk(ptex(D))}\\,dx = \\Big[${ptex(F)}\\Big]_{${p.lo}}^{${p.hi}} = ${tn(p.I)}$`);
      const steps = [
        axis
          ? `The curve meets the $x$-axis where $${ptex(T)} = 0$: $${factoredTex(s, roots)} = 0$, so $x = ${roots.join(',\\ ')}$.`
          : `Set the curves equal and move everything to one side: $${brk(ptex(T))} - ${brk(ptex(B))} = ${ptex(D)} = ${factoredTex(s, roots)} = 0$, so $x = ${roots.join(',\\ ')}$.`,
        kind === 'cubic' ? `The ${axis ? 'graph crosses the axis' : 'curves cross'} at $x = ${roots[1]}$, so the upper ${axis ? 'boundary' : 'curve'} changes there: integrate over each piece separately.` : `The curves cross at $x = ${roots.find((r) => r > a && r < b)}$ inside the interval, so the upper curve changes there: integrate over each piece separately.`,
        ...pieceTex,
        `A negative value means ${axis ? 'the $x$-axis' : `$y = ${ptex(B)}$`} is on top there; area is never negative, so add the absolute values: $A = ${pieces.map((p) => `\\left|${tn(p.I)}\\right|`).join(' + ')} = ${tn(total)}$`,
      ];
      if (kind === 'cubic') {
        return {
          prompt: `The ${axis ? 'curve' : 'curves'} $y = ${ptex(T)}$ and ${other} enclose two regions.\n\n(a) Find the $x$-coordinates of the points where they meet. (b) Find the total area of the two regions.${v.note}`,
          figure: fig,
          parts: [part({ kind: 'numbers', values: roots }, { label: '(a) $x =$', placeholder: 'e.g. -2, 0, 2' }), v.part],
          hints: ['Set the curves equal, move everything to one side and factor the cubic.', 'The upper curve changes at the middle intersection. Integrate (upper − lower) on each piece, or integrate the difference and add the absolute values.'],
          solution: [...steps, `(a) $x = ${roots.join(',\\ ')}$; (b) the total area is $${v.show}$ square units.`],
        };
      }
      return {
        prompt: `Find the total area between $y = ${ptex(T)}$ and ${other} from $x = ${a}$ to $x = ${b}$ (shaded in the graph).${v.note}`,
        figure: fig,
        parts: [v.part],
        hints: ['Find where the curves cross inside the interval: the upper curve changes there.', 'Integrate (upper − lower) on each piece, or integrate the difference on each piece and add the absolute values.'],
        solution: [...steps, `The total area is $${v.show}$ square units.`],
      };
    }

    if (kind === 'trig') {
      const k = rng.pick([1, 1, 2, 3]);
      const which = rng.pick(['half', 'full', 'lens'] as const);
      const [a, b, aT, bT] = which === 'half' ? [0, Math.PI / 2, '0', '\\frac{\\pi}{2}'] : which === 'full' ? [0, Math.PI, '0', '\\pi'] : [Math.PI / 4, (5 * Math.PI) / 4, '\\frac{\\pi}{4}', '\\frac{5\\pi}{4}'];
      const S = (x: number) => k * Math.sin(x);
      const C = (x: number) => k * Math.cos(x);
      const lo = (x: number) => Math.min(S(x), C(x));
      const hi = (x: number) => Math.max(S(x), C(x));
      const value = which === 'half' ? 2 * k * (Math.SQRT2 - 1) : 2 * k * Math.SQRT2;
      const exactTex = which === 'half' ? `${2 * k}\\sqrt{2} - ${2 * k}` : `${2 * k}\\sqrt{2}`;
      const exact = which === 'half' ? `${2 * k}sqrt(2) - ${2 * k}` : `${2 * k}sqrt(2)`;
      const v = valuePart(value, { tex: exactTex, exact, label: '$A =$' });
      const g: GridSpec = { xMin: 0, xMax: which === 'half' ? Math.PI : 1.5 * Math.PI, yMin: -k - 0.5, yMax: k + 0.5, xStep: Math.PI / 4, yStep: k === 1 ? 0.5 : 1, xPi: true };
      const fig = areaFigure(
        [
          { f: S, tex: `${cf(k)}\\sin x`, color: 'brand' },
          { f: C, tex: `${cf(k)}\\cos x`, color: 'accent' },
        ],
        g,
        hatch(lo, hi, a, b, g),
        (x, y) => x > a && x < b && y > lo(x) && y < hi(x),
      );
      const ks = k === 1 ? '' : `${k}`;
      const r2 = `\\frac{\\sqrt{2}}{2}`;
      let steps: string[];
      if (which === 'lens') {
        steps = [
          `$${ks}\\sin x = ${ks}\\cos x$ when $\\tan x = 1$: at $x = \\frac{\\pi}{4}$ and $x = \\frac{5\\pi}{4}$. Between them, $\\sin x \\ge \\cos x$ (at $x = \\frac{\\pi}{2}$: $1 > 0$).`,
          `$A = \\displaystyle\\int_{\\pi/4}^{5\\pi/4} ${ks}(\\sin x - \\cos x)\\,dx = ${ks}\\Big[-\\cos x - \\sin x\\Big]_{\\pi/4}^{5\\pi/4}$`,
          `$= ${ks}\\left[\\left(${r2} + ${r2}\\right) - \\left(-${r2} - ${r2}\\right)\\right] = ${ks}(2\\sqrt{2}) = ${v.show}$`,
        ];
      } else {
        const second =
          which === 'half'
            ? `$\\displaystyle\\int_{\\pi/4}^{\\pi/2} ${ks}(\\sin x - \\cos x)\\,dx = ${ks}\\Big[-\\cos x - \\sin x\\Big]_{\\pi/4}^{\\pi/2} = ${ks}\\left[(0 - 1) - (-\\sqrt{2})\\right] = ${ks}(\\sqrt{2} - 1)$`
            : `$\\displaystyle\\int_{\\pi/4}^{\\pi} ${ks}(\\sin x - \\cos x)\\,dx = ${ks}\\Big[-\\cos x - \\sin x\\Big]_{\\pi/4}^{\\pi} = ${ks}\\left[(1 - 0) - (-\\sqrt{2})\\right] = ${ks}(1 + \\sqrt{2})$`;
        steps = [
          `$\\sin x = \\cos x$ when $\\tan x = 1$, so the curves cross at $x = \\frac{\\pi}{4}$. Before it $\\cos x$ is on top; after it $\\sin x$ is on top.`,
          `$\\displaystyle\\int_0^{\\pi/4} ${ks}(\\cos x - \\sin x)\\,dx = ${ks}\\Big[\\sin x + \\cos x\\Big]_0^{\\pi/4} = ${ks}\\left[\\sqrt{2} - 1\\right]$`,
          second,
          `$A = ${ks}(\\sqrt{2} - 1) + ${ks}(${which === 'half' ? '\\sqrt{2} - 1' : '1 + \\sqrt{2}'}) = ${v.show}$`,
        ];
      }
      const region = which === 'lens' ? `the region enclosed by $y = ${cf(k)}\\sin x$ and $y = ${cf(k)}\\cos x$ between their intersections at $x = \\frac{\\pi}{4}$ and $x = \\frac{5\\pi}{4}$` : `the total area between $y = ${cf(k)}\\sin x$ and $y = ${cf(k)}\\cos x$ for $${aT} \\le x \\le ${bT}$`;
      return {
        prompt: `Find ${which === 'lens' ? `the area of ${region}` : region} (shaded in the graph).${v.note}`,
        figure: fig,
        parts: [v.part],
        hints: ['Find where $\\sin x = \\cos x$ in the interval. The upper curve may change there.', '$\\int \\sin x\\,dx = -\\cos x$ and $\\int \\cos x\\,dx = \\sin x$; use exact values at $\\frac{\\pi}{4}$.'],
        solution: [...steps, `The area is $${v.show}$ square units.`],
        calculator: false,
      };
    }

    if (kind === 'yInt') {
      const r1 = rng.int(-3, 0);
      const r2 = r1 + rng.pick([2, 3, 3, 4]);
      const m = rng.pick([1, 1, 0, 2, -1]);
      const k = rng.int(-1, 3);
      const R: Poly = trim([k, m]);
      const L = padd(R, fromRoots([r1, r2]));
      const Lf = (y: number) => pval(L, y);
      const Rf = (y: number) => pval(R, y);
      const D = psub(R, L);
      const F = pint(D);
      const value = snap(pval(F, r2) - pval(F, r1));
      const v = valuePart(value, { label: '(b) $A =$' });
      // figure: curves x = L(y) and x = R(y)
      let xl = Infinity;
      let xr = -Infinity;
      for (let i = 0; i <= 40; i++) {
        const y = r1 + ((r2 - r1) * i) / 40;
        xl = Math.min(xl, Lf(y));
        xr = Math.max(xr, Rf(y));
      }
      const g = niceGrid(Math.min(xl - 1, -0.5), Math.max(xr + 1, 0.5), Math.min(r1 - 1, -0.5), Math.max(r2 + 1, 0.5));
      const side = (fx: (y: number) => number): Pt[][] => {
        const out: Pt[][] = [];
        let cur: Pt[] = [];
        for (let i = 0; i <= 200; i++) {
          const y = g.yMin + ((g.yMax - g.yMin) * i) / 200;
          const x = fx(y);
          if (x >= g.xMin && x <= g.xMax) cur.push([r3(x), r3(y)]);
          else if (cur.length) {
            if (cur.length > 1) out.push(cur);
            cur = [];
          }
        }
        if (cur.length > 1) out.push(cur);
        return out;
      };
      const segs = hatchWhere((x, y, px, py) => y > r1 + py && y < r2 - py && x > Lf(y) + px && x < Rf(y) - px, xl, xr, g);
      const Ltex = ptex(L, 'y');
      const Rtex = ptex(R, 'y');
      // labels: points on each curve outside the region, with the label inside the plot and clear of the other label
      const { w, h } = plotBox(g);
      const sx = w / (g.xMax - g.xMin);
      const sy = h / (g.yMax - g.yMin);
      const labels: PlanePoint[] = [];
      for (const [fx, tex, color] of [[Lf, ptex(L, 'y'), 'brand'], [Rf, ptex(R, 'y'), 'accent']] as const) {
        const label = `x = ${figLabel(tex)}`;
        const tw = labelWidth(label);
        const ys = Array.from({ length: 81 }, (_, i) => g.yMin + ((g.yMax - g.yMin) * i) / 80)
          .filter((y) => y < r1 - 0.25 || y > r2 + 0.25)
          .sort((p, q) => Math.min(Math.abs(p - r1), Math.abs(p - r2)) - Math.min(Math.abs(q - r1), Math.abs(q - r2)));
        for (const y of ys) {
          const x = fx(y);
          if (x < g.xMin + 4 / sx || x + (12 + tw) / sx > g.xMax + 8 / sx || y > g.yMax - 24 / sy || y < g.yMin + 6 / sy) continue;
          if (labels.some((p) => Math.abs(p.y - y) * sy < 22 && Math.abs(p.x - x) * sx < 12 + tw + labelWidth(p.label ?? ''))) continue;
          labels.push({ x: r3(x), y: r3(y), label, color });
          break;
        }
      }
      const fig: PlaneFigure = {
        type: 'plane',
        grid: g,
        polylines: [...lines(side(Lf), 'brand'), ...lines(side(Rf), 'accent')],
        segments: segs,
        ...(labels.length ? { points: labels } : {}),
      };
      const names = rng.shuffle([`$x = ${Ltex}$`, `$x = ${Rtex}$`]);
      return {
        prompt: `Consider the region enclosed by the curves ${names[0]} and ${names[1]}. Each curve gives $x$ in terms of $y$, so integrate with respect to $y$.\n\n(a) Find the $y$-coordinates of the points where they meet. (b) Find the area of the region.${v.note}`,
        figure: fig,
        parts: [part({ kind: 'numbers', values: [r1, r2] }, { label: '(a) $y =$', placeholder: 'e.g. -1, 2' }), v.part],
        hints: ['Use horizontal strips: $A = \\displaystyle\\int_c^d \\big[(\\text{right curve}) - (\\text{left curve})\\big]\\,dy$.', 'The limits are the $y$-values where the curves meet: set the two expressions for $x$ equal.'],
        solution: [
          `Set them equal: $${Ltex} = ${Rtex}$, so $${ptex(psub(L, R), 'y')} = 0$, which factors as $${factoredTex(1, [r1, r2], 'y')} = 0$: $y = ${r1}$ or $y = ${r2}$.`,
          `Between these, $x = ${Rtex}$ is on the right (at $y = ${r1 + 1}$: $${tn(Rf(r1 + 1))} > ${tn(Lf(r1 + 1))}$).`,
          `$A = \\displaystyle\\int_{${r1}}^{${r2}} \\left[${brk(Rtex)} - ${brk(Ltex)}\\right]dy = \\int_{${r1}}^{${r2}} ${brk(ptex(D, 'y'))}\\,dy$`,
          `$= \\Big[${ptex(F, 'y')}\\Big]_{${r1}}^{${r2}} = ${tn(snap(pval(F, r2)))} - ${par(snap(pval(F, r1)))} = ${tn(value)}$`,
          `(a) $y = ${r1}$ and $y = ${r2}$; (b) the area is $${v.show}$ square units.`,
        ],
      };
    }

    // app: a parabolic arch window or a lens-shaped pendant
    if (rng.chance(0.5)) {
      const [H, r] = rng.pick([[2, 1], [3, 1.5], [4, 2], [2, 2], [3, 2]] as const);
      const c = H / (r * r);
      const value = (4 * H * r) / 3;
      const v = valuePart(value, { suffix: 'm²', display: 'decimal' });
      const T = (x: number) => H - c * x * x;
      const zero = () => 0;
      const g = regionGrid([T, zero], -r, r, { y0: -0.5 });
      const fig = areaFigure([{ f: T, tex: `${tn(H)} - ${cf(c)}x^{2}`, color: 'brand' }], g, hatch(zero, T, -r, r, g), (x, y) => x > -r && x < r && y > 0 && y < T(x));
      const place = rng.pick(['a community hall in Riverton', 'a church in Hillcrest', 'a library in Ashford', 'a museum in Stonebridge']);
      return {
        prompt: `An arched window in ${place} is the region between the parabola $y = ${tn(H)} - ${cf(c)}x^{2}$ and the $x$-axis, with $x$ and $y$ in metres. Find the area of the glass.${v.note}`,
        figure: fig,
        parts: [v.part],
        hints: ['Find where the arch meets the $x$-axis: these $x$-values are the limits.', 'Integrate the arch from one end to the other (the lower curve is $y = 0$).'],
        solution: [
          `$${tn(H)} - ${cf(c)}x^{2} = 0$ gives $x^{2} = ${tn(r * r)}$, so $x = \\pm ${tn(r)}$.`,
          `$A = \\displaystyle\\int_{-${tn(r)}}^{${tn(r)}} \\left(${tn(H)} - ${cf(c)}x^{2}\\right)dx = \\Big[${tn(H)}x - ${tn(c / 3)}x^{3}\\Big]_{-${tn(r)}}^{${tn(r)}}$`,
          `$= 2\\left(${tn(H)}(${tn(r)}) - ${tn(c / 3)}(${tn(r)})^{3}\\right) = ${tn(value)}$`,
          `The glass has an area of $${v.show}$ m².`,
        ],
      };
    }
    const [H, k] = rng.pick([[2, 2], [1, 4], [3, 3], [1.5, 6], [2, 8]] as const);
    const r = Math.sqrt(H * k);
    const value = (8 / 3) * H * r;
    const v = valuePart(value, { suffix: 'cm²', display: 'decimal' });
    const T = (x: number) => H - (x * x) / k;
    const B = (x: number) => (x * x) / k - H;
    const Tt = `${tn(H)} - \\frac{x^{2}}{${k}}`;
    const Bt = `\\frac{x^{2}}{${k}} - ${tn(H)}`;
    const g = regionGrid([T, B], -r, r);
    const fig = areaFigure(
      [
        { f: T, tex: Tt, color: 'brand', label: `${tn(H)} - x^{2}/${k}` },
        { f: B, tex: Bt, color: 'accent', label: `x^{2}/${k} - ${tn(H)}` },
      ],
      g,
      hatch(B, T, -r, r, g),
      (x, y) => x > -r && x < r && y > B(x) && y < T(x),
    );
    const who = rng.pick(['A jeweller in Riverton', 'A sign maker in Hillcrest', 'A potter in Stonebridge', 'A designer in Brookfield']);
    return {
      prompt: `${who} makes a lens-shaped piece bounded by the curves $y = ${Tt}$ and $y = ${Bt}$, with $x$ and $y$ in centimetres. Find its area.${v.note}`,
      figure: fig,
      parts: [v.part],
      hints: ['Set the curves equal to find the ends of the lens.', AREA_FORMULA],
      solution: [
        `$${Tt} = ${Bt}$ gives $${cf(2 / k)}x^{2} = ${tn(2 * H)}$, so $x^{2} = ${tn(H * k)}$ and $x = \\pm ${tn(r)}$.`,
        `$A = \\displaystyle\\int_{-${tn(r)}}^{${tn(r)}} \\left[\\left(${Tt}\\right) - \\left(${Bt}\\right)\\right]dx = \\int_{-${tn(r)}}^{${tn(r)}} \\left(${tn(2 * H)} - ${cf(2 / k)}x^{2}\\right)dx$`,
        `$= \\Big[${tn(2 * H)}x - ${cf(2 / (3 * k))}x^{3}\\Big]_{-${tn(r)}}^{${tn(r)}} = 2\\left(${tn(2 * H * r)} - ${tn((2 * r ** 3) / (3 * k))}\\right) = ${tn(value)}$`,
        `The piece has an area of $${v.show}$ cm².`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// 9.2 — Volumes of revolution
// ---------------------------------------------------------------------------

const DISC = 'Disc method: $V = \\pi\\displaystyle\\int_a^b [r(x)]^{2}\\,dx$, where $r(x)$ is the distance from the axis to the curve.';
const WASHER = 'Washer method: $V = \\pi\\displaystyle\\int_a^b \\left([R(x)]^{2} - [r(x)]^{2}\\right)dx$, with outer radius $R$ and inner radius $r$.';

/** A solid of revolution, ready to be written up. */
interface Vol {
  /** Where the cross-sections come from (first solution step). */
  slice: string;
  v: 'x' | 'y';
  aT: string;
  bT: string;
  setup: string;
  simp: string;
  F: string;
  evalTex: string;
  val: Val;
  figure: PlaneFigure;
}

/** π∫_a^b sq dv for a polynomial sq: the antiderivative, the evaluation and V = qπ. */
function polyVol(sq: Poly, a: number, b: number, v: 'x' | 'y' = 'x') {
  const F = pint(sq);
  const Fa = snap(pval(F, a));
  const Fb = snap(pval(F, b));
  const q = snap(Fb - Fa);
  return { simp: ptex(sq, v), F: ptex(F, v), evalTex: Fa === 0 ? tn(Fb) : `${tn(Fb)} - ${par(Fa)}`, q };
}

function volSteps(V: Vol): string[] {
  const d = `\\,d${V.v}`;
  return [
    V.slice,
    `$V = \\pi\\displaystyle\\int_{${V.aT}}^{${V.bT}} ${V.setup}${d}${V.setup === V.simp ? '' : ` = \\pi\\int_{${V.aT}}^{${V.bT}} ${isSum(V.simp) ? `\\left(${V.simp}\\right)` : V.simp}${d}`}$`,
    `$= \\pi\\Big[${V.F}\\Big]_{${V.aT}}^{${V.bT}} = \\pi\\left(${V.evalTex}\\right) = ${V.val.show}$`,
    `The volume is $${V.val.show}$ cubic units.`,
  ];
}

/** Figure for a region rotated about a horizontal line y = k: the region, the curves, their mirror images and the axis. */
function revFigure(o: {
  curves: Drawn[];
  lo: (x: number) => number;
  hi: (x: number) => number;
  a: number;
  b: number;
  k: number;
  g: GridSpec;
  disc?: number;
}): PlaneFigure {
  const { g, a, b, k } = o;
  const mirror = (f: (x: number) => number) => (x: number) => 2 * k - f(x);
  const polylines: PlaneFigure['polylines'] = [];
  for (const c of o.curves) polylines.push(...lines(curve(c.f, Math.max(g.xMin, c.x0 ?? -Infinity), g.xMax, g, 160), c.color));
  // the mirror image of the region's boundary (skipped where it lies on the axis of rotation)
  for (const edge of [o.lo, o.hi]) if (Math.abs(edge(a) - k) > 1e-9 || Math.abs(edge(b) - k) > 1e-9 || Math.abs(edge((a + b) / 2) - k) > 1e-9) polylines.push(...lines(curve(mirror(edge), a, b, g, 80), 'muted'));
  const segs: PlaneSegment[] = hatch(o.lo, o.hi, a, b, g);
  for (const x of [a, b]) {
    const top = Math.max(o.hi(x), mirror(o.lo)(x));
    const bottom = Math.min(o.lo(x), mirror(o.hi)(x));
    if (top - bottom > 1e-6) segs.push({ from: [x, r3(bottom)], to: [x, r3(top)], color: 'muted' });
  }
  if (o.disc !== undefined) segs.push({ from: [o.disc, r3(mirror(o.hi)(o.disc))], to: [o.disc, r3(o.hi(o.disc))], color: 'accent', dashed: true });
  const axis: PlaneLine = { through: [[0, k], [1, k]], color: 'accent', dashed: true };
  const labels = placeLabels(
    o.curves.map((c) => ({ f: c.f, label: `y = ${c.label ?? figLabel(c.tex)}`, color: c.color })),
    g,
    (x, y) => x > a && x < b && ((y > o.lo(x) && y < o.hi(x)) || (y < mirror(o.lo)(x) && y > mirror(o.hi)(x))),
  );
  return { type: 'plane', grid: g, polylines, segments: segs, lines: [axis], ...(labels.length ? { points: labels } : {}) };
}

/** Figure for a region between x = 0 and the curve, 0 ≤ y ≤ c, rotated about the y-axis (f is the curve as y = f(x), x ≥ 0). */
function revYFigure(f: (x: number) => number, label: string, xc: number, c: number, g: GridSpec): PlaneFigure {
  const mirror = (x: number) => f(-x);
  const segs = hatch(f, () => c, 0, xc, g);
  segs.push({ from: [0, c], to: [r3(xc), c], color: 'brand' }, { from: [r3(-xc), c], to: [0, c], color: 'muted' });
  const labels = placeLabels([{ f, label: `y = ${figLabel(label)}`, color: 'brand' }], g, (x, y) => x > -xc && x < xc && y < c && y > f(Math.abs(x)));
  return {
    type: 'plane',
    grid: g,
    polylines: [...lines(curve(f, 0, g.xMax, g, 160), 'brand'), ...lines(curve(mirror, -xc, 0, g, 80), 'muted')],
    segments: segs,
    lines: [{ through: [[0, 0], [0, 1]], color: 'accent', dashed: true }],
    ...(labels.length ? { points: labels } : {}),
  };
}

/** A grid symmetric about y = k that holds radius up to M on [x0, x1]. */
function revGrid(x0: number, x1: number, k: number, M: number): GridSpec {
  return niceGrid(x0, x1, Math.min(k - M * 1.15, -0.3), Math.max(k + M * 1.15, 0.3));
}

/** Disc cases about the x-axis with r(x)² a polynomial. */
function discPoly(rng: Rng, hard: boolean): { fTex: string; f: (x: number) => number; sq: Poly; a: number; b: number; desc: string } {
  const t = hard ? rng.pick(['sphere', 'hemi', 'line'] as const) : rng.pick(['sqrt', 'ksqrt', 'mx', 'x2', 'line'] as const);
  if (t === 'sqrt') {
    const b = rng.pick([1, 2, 3, 4, 6, 9]);
    return { fTex: '\\sqrt{x}', f: Math.sqrt, sq: [0, 1], a: 0, b, desc: '' };
  }
  if (t === 'ksqrt') {
    const k = rng.pick([2, 3]);
    const b = rng.pick([1, 2, 4]);
    return { fTex: `${k}\\sqrt{x}`, f: (x) => k * Math.sqrt(x), sq: [0, k * k], a: 0, b, desc: '' };
  }
  if (t === 'mx') {
    const m = rng.pick([1, 2, 3, 0.5]);
    const b = rng.pick([2, 3, 4]);
    return { fTex: ptex([0, m]), f: (x) => m * x, sq: [0, 0, m * m], a: 0, b, desc: ' (the solid is a cone)' };
  }
  if (t === 'x2') {
    const b = rng.pick([1, 2]);
    return { fTex: 'x^{2}', f: (x) => x * x, sq: [0, 0, 0, 0, 1], a: 0, b, desc: '' };
  }
  if (t === 'line') {
    const c = rng.pick([1, 2, 3]);
    const m = rng.pick([1, 2, 0.5]);
    const b = rng.pick([1, 2, 3]);
    return { fTex: ptex([c, m]), f: (x) => m * x + c, sq: pmul([c, m], [c, m]), a: 0, b, desc: '' };
  }
  const r = rng.pick([1, 2, 3, 5]);
  const sq: Poly = [r * r, 0, -1];
  return t === 'sphere'
    ? { fTex: `\\sqrt{${r * r} - x^{2}}`, f: (x) => Math.sqrt(r * r - x * x), sq, a: -r, b: r, desc: ' (the solid is a sphere)' }
    : { fTex: `\\sqrt{${r * r} - x^{2}}`, f: (x) => Math.sqrt(r * r - x * x), sq, a: 0, b: r, desc: ' (the solid is a hemisphere)' };
}

function discPolyVol(c: ReturnType<typeof discPoly>): Vol {
  const p = polyVol(c.sq, c.a, c.b);
  const val = piVal(p.q, { label: '$V =$' });
  const [, M] = range(c.f, c.a, c.b);
  const g = revGrid(Math.min(0, c.a) - 0.3, c.b + 0.3 + 0.1 * (c.b - c.a), 0, M);
  const zero = () => 0;
  return {
    slice: `A cross-section at $x$ is a disc of radius $r(x) = ${c.fTex}$.`,
    v: 'x',
    aT: `${c.a}`,
    bT: `${c.b}`,
    setup: `\\left(${c.fTex}\\right)^{2}`,
    simp: p.simp,
    F: p.F,
    evalTex: p.evalTex,
    val,
    figure: revFigure({ curves: [{ f: c.f, tex: c.fTex, color: 'brand' }], lo: zero, hi: c.f, a: c.a, b: c.b, k: 0, g, disc: c.a + 0.6 * (c.b - c.a) }),
  };
}

/** Disc cases about the x-axis with transcendental radii. */
function discTrans(rng: Rng): Vol {
  const t = rng.pick(['recip', 'exp', 'expLn', 'sec', 'sinRoot', 'cosRoot', 'invRoot'] as const);
  let o: { fTex: string; f: (x: number) => number; a: number; b: number; aT: string; bT: string; setup?: string; simp: string; F: string; evalTex: string; val: Val; xPi?: boolean };
  const lab = { label: '$V =$' };
  if (t === 'recip') {
    const b = rng.pick([2, 3, 4, 5]);
    o = { fTex: '\\dfrac{1}{x}', f: (x) => 1 / x, a: 1, b, aT: '1', bT: `${b}`, simp: '\\dfrac{1}{x^{2}}', F: '-\\dfrac{1}{x}', evalTex: `-\\frac{1}{${b}} + 1`, val: piVal(1 - 1 / b, lab) };
  } else if (t === 'exp') {
    const value = (Math.PI * (Math.E ** 2 - 1)) / 2;
    o = { fTex: 'e^{x}', f: Math.exp, a: 0, b: 1, aT: '0', bT: '1', simp: 'e^{2x}', F: '\\frac{1}{2}e^{2x}', evalTex: '\\frac{1}{2}e^{2} - \\frac{1}{2}', val: valuePart(value, { tex: '\\dfrac{\\pi(e^{2} - 1)}{2}', exact: 'pi(e^2 - 1)/2', note: PI_NOTE, ...lab }) };
  } else if (t === 'expLn') {
    const k = rng.pick([2, 3]);
    o = { fTex: 'e^{x}', f: Math.exp, a: 0, b: Math.log(k), aT: '0', bT: `\\ln ${k}`, simp: 'e^{2x}', F: '\\frac{1}{2}e^{2x}', evalTex: `\\frac{1}{2}e^{2\\ln ${k}} - \\frac{1}{2}e^{0}`, val: piVal((k * k - 1) / 2, lab) };
  } else if (t === 'sec') {
    if (rng.chance(0.5)) {
      o = { fTex: '\\sec x', f: (x) => 1 / Math.cos(x), a: 0, b: Math.PI / 4, aT: '0', bT: '\\frac{\\pi}{4}', simp: '\\sec^{2} x', F: '\\tan x', evalTex: '\\tan\\frac{\\pi}{4} - \\tan 0', val: piVal(1, lab), xPi: true };
    } else {
      o = { fTex: '\\sec x', f: (x) => 1 / Math.cos(x), a: 0, b: Math.PI / 3, aT: '0', bT: '\\frac{\\pi}{3}', simp: '\\sec^{2} x', F: '\\tan x', evalTex: '\\tan\\frac{\\pi}{3} - \\tan 0', val: valuePart(Math.PI * Math.sqrt(3), { tex: '\\sqrt{3}\\,\\pi', exact: 'sqrt(3)pi', note: PI_NOTE, ...lab }), xPi: true };
    }
  } else if (t === 'sinRoot') {
    o = { fTex: '\\sqrt{\\sin x}', f: (x) => Math.sqrt(Math.sin(x)), a: 0, b: Math.PI, aT: '0', bT: '\\pi', simp: '\\sin x', F: '-\\cos x', evalTex: '-\\cos\\pi + \\cos 0', val: piVal(2, lab), xPi: true };
  } else if (t === 'cosRoot') {
    o = { fTex: '\\sqrt{\\cos x}', f: (x) => Math.sqrt(Math.cos(x)), a: 0, b: Math.PI / 2, aT: '0', bT: '\\frac{\\pi}{2}', simp: '\\cos x', F: '\\sin x', evalTex: '\\sin\\frac{\\pi}{2} - \\sin 0', val: piVal(1, lab), xPi: true };
  } else {
    const b = rng.pick([2, 3, 4]);
    o = {
      fTex: '\\dfrac{1}{\\sqrt{x}}',
      f: (x) => 1 / Math.sqrt(x),
      a: 1,
      b,
      aT: '1',
      bT: `${b}`,
      simp: '\\dfrac{1}{x}',
      F: '\\ln x',
      evalTex: `\\ln ${b} - \\ln 1`,
      val: valuePart(Math.PI * Math.log(b), { tex: `\\pi\\ln ${b}`, exact: `pi*ln(${b})`, fns: true, note: PI_NOTE, ...lab }),
    };
  }
  const [, M] = range(o.f, o.a, o.b);
  const g: GridSpec = o.xPi
    ? { ...niceGrid(0, 1, -M * 1.15, M * 1.15), xMin: 0, xMax: o.b > 2 ? 1.25 * Math.PI : Math.PI / 2 + (o.b > 1.2 ? Math.PI / 4 : 0), xStep: Math.PI / 4, xPi: true }
    : revGrid(Math.min(0, o.a) - 0.3, o.b + 0.5, 0, M);
  const zero = () => 0;
  return {
    slice: `A cross-section at $x$ is a disc of radius $r(x) = ${o.fTex}$.`,
    v: 'x',
    aT: o.aT,
    bT: o.bT,
    setup: o.setup ?? `\\left(${o.fTex}\\right)^{2}`,
    simp: o.simp,
    F: o.F,
    evalTex: o.evalTex,
    val: o.val,
    figure: revFigure({ curves: [{ f: o.f, tex: o.fTex, color: 'brand', x0: o.a > 0 ? 0.02 : undefined }], lo: zero, hi: o.f, a: o.a, b: o.b, k: 0, g, disc: o.a + 0.6 * (o.b - o.a) }),
  };
}

/** Rotation about the y-axis of the region between the y-axis, the curve and y = c. */
function discY(rng: Rng): { V: Vol; desc: string } {
  const t = rng.pick(['x2', 'sqrt', 'mx', 'x3'] as const);
  let f: (x: number) => number;
  let tex: string;
  let xOf: string;
  let c: number;
  let xc: number;
  let simp: string;
  let F: string;
  let evalTex: string;
  let q: number;
  if (t === 'x2') {
    c = rng.pick([2, 4, 9]);
    f = (x) => x * x;
    tex = 'x^{2}';
    xOf = '\\sqrt{y}';
    xc = Math.sqrt(c);
    const p = polyVol([0, 1], 0, c, 'y');
    [simp, F, evalTex, q] = [p.simp, p.F, p.evalTex, p.q];
  } else if (t === 'sqrt') {
    c = rng.pick([1, 2]);
    f = Math.sqrt;
    tex = '\\sqrt{x}';
    xOf = 'y^{2}';
    xc = c * c;
    const p = polyVol([0, 0, 0, 0, 1], 0, c, 'y');
    [simp, F, evalTex, q] = [p.simp, p.F, p.evalTex, p.q];
  } else if (t === 'mx') {
    const m = rng.pick([1, 2, 3]);
    c = rng.pick([2, 3, 6]);
    f = (x) => m * x;
    tex = ptex([0, m]);
    xOf = m === 1 ? 'y' : `\\frac{y}{${m}}`;
    xc = c / m;
    const p = polyVol([0, 0, 1 / (m * m)], 0, c, 'y');
    [simp, F, evalTex, q] = [p.simp, p.F, p.evalTex, p.q];
  } else {
    c = rng.pick([1, 8]);
    f = (x) => x ** 3;
    tex = 'x^{3}';
    xOf = 'y^{1/3}';
    xc = Math.cbrt(c);
    simp = 'y^{2/3}';
    F = '\\frac{3}{5}y^{5/3}';
    evalTex = `\\frac{3}{5}(${c})^{5/3}`;
    q = (3 / 5) * c ** (5 / 3);
  }
  q = snap(q);
  const g = niceGrid(-xc * 1.25 - 0.2, xc * 1.25 + 0.2, -0.3, c * 1.2);
  const V: Vol = {
    slice: `Rotating about the $y$-axis, slice perpendicular to the $y$-axis: solve $y = ${tex}$ for $x$ to get the radius $x = ${xOf}$ at height $y$.`,
    v: 'y',
    aT: '0',
    bT: `${c}`,
    setup: `\\left(${xOf}\\right)^{2}`,
    simp,
    F,
    evalTex,
    val: piVal(q, { label: '$V =$' }),
    figure: revYFigure(f, tex, xc, c, g),
  };
  return { V, desc: `the region in the first quadrant bounded by $y = ${tex}$, the $y$-axis and the line $y = ${c}$` };
}

/** Washers about the x-axis: the region between an upper and a lower curve. */
function washerCase(rng: Rng): { T: Drawn; B: Drawn; Tsq: Poly; Bsq: Poly; a: number; b: number; meet: string } {
  const cases = [
    { T: ['x', (x: number) => x, [0, 0, 1]], B: ['x^{2}', (x: number) => x * x, [0, 0, 0, 0, 1]], a: 0, b: 1, meet: '$x = x^{2}$, so $x(x - 1) = 0$ and $x = 0$ or $x = 1$' },
    { T: ['\\sqrt{x}', Math.sqrt, [0, 1]], B: ['x', (x: number) => x, [0, 0, 1]], a: 0, b: 1, meet: '$\\sqrt{x} = x$; squaring gives $x = x^{2}$, so $x(x - 1) = 0$ and $x = 0$ or $x = 1$' },
    { T: ['\\sqrt{x}', Math.sqrt, [0, 1]], B: ['\\frac{x}{2}', (x: number) => x / 2, [0, 0, 0.25]], a: 0, b: 4, meet: '$\\sqrt{x} = \\frac{x}{2}$; squaring gives $x = \\frac{x^{2}}{4}$, so $x(x - 4) = 0$ and $x = 0$ or $x = 4$' },
    { T: ['2x', (x: number) => 2 * x, [0, 0, 4]], B: ['x^{2}', (x: number) => x * x, [0, 0, 0, 0, 1]], a: 0, b: 2, meet: '$2x = x^{2}$, so $x(x - 2) = 0$ and $x = 0$ or $x = 2$' },
    { T: ['\\sqrt{x}', Math.sqrt, [0, 1]], B: ['x^{2}', (x: number) => x * x, [0, 0, 0, 0, 1]], a: 0, b: 1, meet: '$\\sqrt{x} = x^{2}$; squaring gives $x = x^{4}$, so $x(x^{3} - 1) = 0$ and $x = 0$ or $x = 1$' },
    { T: ['4', () => 4, [16]], B: ['x^{2}', (x: number) => x * x, [0, 0, 0, 0, 1]], a: -2, b: 2, meet: '$x^{2} = 4$, so $x = \\pm 2$' },
    { T: ['4 - x^{2}', (x: number) => 4 - x * x, pmul([4, 0, -1], [4, 0, -1])], B: ['x + 2', (x: number) => x + 2, pmul([2, 1], [2, 1])], a: -2, b: 1, meet: '$4 - x^{2} = x + 2$, so $x^{2} + x - 2 = 0$, $(x + 2)(x - 1) = 0$ and $x = -2$ or $x = 1$' },
  ] as const;
  const c = rng.pick(cases);
  return {
    T: { tex: c.T[0], f: c.T[1], color: 'brand' },
    B: { tex: c.B[0], f: c.B[1], color: 'accent' },
    Tsq: [...c.T[2]],
    Bsq: [...c.B[2]],
    a: c.a,
    b: c.b,
    meet: c.meet,
  };
}

const volume = skill({
  id: 'm31-volume-revolution',
  name: 'Volumes of revolution',
  description: 'Find volumes of solids of revolution about the x-axis, the y-axis and other horizontal lines with the disc and washer methods.',
  outcomes: ['IA1'],
  lessonId: 'm31-9-2',
  calculator: true,
  gen(rng, d): GenOutput {
    const kind =
      d === 1 ? rng.pick(['disc', 'disc', 'setupMc'] as const) : d === 2 ? rng.pick(['disc2', 'trans', 'trans', 'discY', 'discY', 'washerMc'] as const) : rng.pick(['washer', 'washer', 'aboutLine', 'app'] as const);

    if (kind === 'disc' || kind === 'disc2') {
      const c = discPoly(rng, kind === 'disc2');
      const V = discPolyVol(c);
      return {
        prompt: `The region under $y = ${c.fTex}$ from $x = ${c.a}$ to $x = ${c.b}$ (above the $x$-axis) is rotated about the $x$-axis${c.desc}. Find the volume of the solid.${V.val.note}`,
        figure: V.figure,
        parts: [V.val.part],
        hints: ['Each slice perpendicular to the $x$-axis is a disc whose radius is the height of the curve.', DISC],
        solution: volSteps(V),
        calculator: false,
      };
    }

    if (kind === 'trans') {
      const V = discTrans(rng);
      const fTex = /r\(x\) = (.*)\$\.$/.exec(V.slice)![1];
      return {
        prompt: `The region under $y = ${fTex}$ from $x = ${V.aT}$ to $x = ${V.bT}$ (above the $x$-axis) is rotated about the $x$-axis. Find the volume of the solid.${V.val.note}`,
        figure: V.figure,
        parts: [V.val.part],
        hints: [DISC, 'Square the radius first and simplify; then use a basic antiderivative.'],
        solution: volSteps(V),
      };
    }

    if (kind === 'discY') {
      const { V, desc } = discY(rng);
      return {
        prompt: `Find the volume of the solid formed when ${desc} is rotated about the $y$-axis.${V.val.note}`,
        figure: V.figure,
        parts: [V.val.part],
        hints: ['For rotation about the $y$-axis, slice perpendicular to the $y$-axis and integrate with respect to $y$: $V = \\pi\\displaystyle\\int_c^d [x(y)]^{2}\\,dy$.', 'Solve the equation of the curve for $x$ in terms of $y$; that is the radius.'],
        solution: volSteps(V),
      };
    }

    if (kind === 'setupMc') {
      const c = discPoly(rng, false);
      const V = discPolyVol(c);
      const I = (pre: string, body: string) => `$${pre}\\displaystyle\\int_{${c.a}}^{${c.b}} ${body}\\,dx$`;
      const sqT = `\\left(${c.fTex}\\right)^{2}`;
      const correct = I('\\pi', sqT);
      return {
        prompt: `The region under $y = ${c.fTex}$ from $x = ${c.a}$ to $x = ${c.b}$ is rotated about the $x$-axis. Which integral gives the volume of the solid?`,
        figure: V.figure,
        parts: [part(mc(rng, correct, [I('\\pi', c.fTex), I('', sqT), I('2\\pi', c.fTex)]))],
        hints: ['Each slice is a disc of radius $r = f(x)$ and thickness $dx$. What is the volume of one disc?', 'A disc has volume $\\pi r^{2}\\,\\Delta x$.'],
        solution: [`A slice at $x$ is a disc of radius $${c.fTex}$ and thickness $dx$, with volume $\\pi\\left(${c.fTex}\\right)^{2}dx$.`, 'Adding the discs from one end to the other gives the integral.', `The volume is ${correct}.`],
      };
    }

    if (kind === 'washerMc') {
      const w = washerCase(rng);
      const I = (pre: string, body: string) => `$${pre}\\displaystyle\\int_{${w.a}}^{${w.b}} ${body}\\,dx$`;
      const sq = (t: string) => (t.length === 1 ? `${t}^{2}` : `\\left(${t}\\right)^{2}`);
      const correct = I('\\pi', `\\left[${sq(w.T.tex)} - ${sq(w.B.tex)}\\right]`);
      const k = 0;
      const [, M] = range(w.T.f, w.a, w.b);
      const g = revGrid(Math.min(0, w.a) - 0.3, w.b + 0.4, k, M);
      return {
        prompt: `The region between $y = ${w.T.tex}$ and $y = ${w.B.tex}$ from $x = ${w.a}$ to $x = ${w.b}$ is rotated about the $x$-axis. Which integral gives the volume of the solid?`,
        figure: revFigure({ curves: [w.T, w.B], lo: w.B.f, hi: w.T.f, a: w.a, b: w.b, k, g }),
        parts: [part(mc(rng, correct, [I('\\pi', `\\left(${w.T.tex} - ${brk(w.B.tex)}\\right)^{2}`), I('\\pi', `\\left[${sq(w.B.tex)} - ${sq(w.T.tex)}\\right]`), I('\\pi', `\\left(${w.T.tex} - ${brk(w.B.tex)}\\right)`)]))],
        hints: ['Each slice is a washer: a disc with a hole. Its area is (area of the outer disc) − (area of the hole).', WASHER],
        solution: [
          `A slice at $x$ is a washer with outer radius $R = ${w.T.tex}$ (the upper curve) and inner radius $r = ${w.B.tex}$.`,
          `Its area is $\\pi R^{2} - \\pi r^{2}$, not $\\pi(R - r)^{2}$.`,
          `The volume is ${correct}.`,
        ],
      };
    }

    if (kind === 'washer') {
      const w = washerCase(rng);
      const p = polyVol(psub(w.Tsq, w.Bsq), w.a, w.b);
      const val = piVal(p.q, { label: '$V =$' });
      const [, M] = range(w.T.f, w.a, w.b);
      const g = revGrid(Math.min(0, w.a) - 0.3, w.b + 0.4, 0, M);
      const sq = (t: string) => (t.length === 1 ? `${t}^{2}` : `\\left(${t}\\right)^{2}`);
      const V: Vol = {
        slice: `The curves meet where ${w.meet}. Between them $y = ${w.T.tex}$ is on top, so a slice at $x$ is a washer with outer radius $R = ${w.T.tex}$ and inner radius $r = ${w.B.tex}$.`,
        v: 'x',
        aT: `${w.a}`,
        bT: `${w.b}`,
        setup: `\\left[${sq(w.T.tex)} - ${sq(w.B.tex)}\\right]`,
        simp: p.simp,
        F: p.F,
        evalTex: p.evalTex,
        val,
        figure: revFigure({ curves: [w.T, w.B], lo: w.B.f, hi: w.T.f, a: w.a, b: w.b, k: 0, g }),
      };
      return {
        prompt: `The region enclosed by $y = ${w.T.tex}$ and $y = ${w.B.tex}$ is rotated about the $x$-axis. Find the volume of the solid.${val.note}`,
        figure: V.figure,
        parts: [val.part],
        hints: ['Find where the curves meet (the limits) and which curve is farther from the axis.', WASHER],
        solution: volSteps(V),
      };
    }

    if (kind === 'aboutLine') {
      if (rng.chance(0.5)) {
        // region under y = sqrt(x), 0 <= x <= b, rotated about y = -k: washers R = sqrt(x) + k, r = k
        const b = rng.pick([1, 4]);
        const k = rng.pick([1, 2]);
        const q = snap(b * b / 2 + ((4 * k) / 3) * b ** 1.5);
        const val = piVal(q, { label: '$V =$' });
        const f = Math.sqrt;
        const g = niceGrid(-0.4, b + 0.4, -2 * k - Math.sqrt(b) - 0.4, Math.sqrt(b) + 0.4);
        const V: Vol = {
          slice: `Distances are measured from the axis $y = -${k}$. A slice at $x$ is a washer with outer radius $R = \\sqrt{x} + ${k}$ (to the curve) and inner radius $r = ${k}$ (to the $x$-axis).`,
          v: 'x',
          aT: '0',
          bT: `${b}`,
          setup: `\\left[\\left(\\sqrt{x} + ${k}\\right)^{2} - ${k}^{2}\\right]`,
          simp: `x + ${2 * k}\\sqrt{x}`,
          F: `\\frac{1}{2}x^{2} + ${tn((4 * k) / 3)}x^{3/2}`,
          evalTex: `\\frac{1}{2}(${b})^{2} + ${tn((4 * k) / 3)}(${b})^{3/2}`,
          val,
          figure: revFigure({ curves: [{ f, tex: '\\sqrt{x}', color: 'brand' }], lo: () => 0, hi: f, a: 0, b, k: -k, g }),
        };
        return {
          prompt: `The region bounded by $y = \\sqrt{x}$, the $x$-axis and $x = ${b}$ is rotated about the line $y = -${k}$. Find the volume of the solid.${val.note}`,
          figure: V.figure,
          parts: [val.part],
          hints: ['The axis is below the region, so every slice is a washer: the hole comes from the gap between the axis and the $x$-axis.', `Measure each radius from the line $y = -${k}$: add ${k} to each $y$-value. ${WASHER}`],
          solution: volSteps(V),
        };
      }
      // region between y = x^2 and y = c rotated about y = c: discs of radius c - x^2
      const r = rng.pick([1, 2]);
      const c = r * r;
      const half = rng.chance(0.5);
      const a = half ? 0 : -r;
      const p = polyVol(pmul([c, 0, -1], [c, 0, -1]), a, r);
      const val = piVal(p.q, { label: '$V =$' });
      const f = (x: number) => x * x;
      const g = niceGrid(-r - 0.4, r + 0.4, -0.4, 2 * c + 0.4);
      const V: Vol = {
        slice: `The axis $y = ${c}$ is the top edge of the region, so each slice is a disc (no hole). Its radius is the distance from the line down to the curve: $r = ${c} - x^{2}$.`,
        v: 'x',
        aT: `${a}`,
        bT: `${r}`,
        setup: `\\left(${c} - x^{2}\\right)^{2}`,
        simp: p.simp,
        F: p.F,
        evalTex: p.evalTex,
        val,
        figure: revFigure({ curves: [{ f, tex: 'x^{2}', color: 'brand' }], lo: f, hi: () => c, a, b: r, k: c, g }),
      };
      return {
        prompt: `The region ${half ? 'in the first quadrant ' : ''}bounded by $y = x^{2}$${half ? `, $y = ${c}$ and the $y$-axis` : ` and $y = ${c}$`} is rotated about the line $y = ${c}$. Find the volume of the solid.${val.note}`,
        figure: V.figure,
        parts: [val.part],
        hints: ['The axis of rotation is the top edge of the region, so the slices are discs (no hole).', `The radius is the vertical distance from $y = ${c}$ to the curve: $${c} - x^{2}$. ${DISC}`],
        solution: volSteps(V),
      };
    }

    // app: a paraboloid bowl, a nose cone or a rugby ball
    const t = rng.pick(['bowl', 'cone', 'ball'] as const);
    if (t === 'bowl') {
      const o = retry(
        () => ({ k: rng.pick([4, 6, 8, 10]), h: rng.pick([4, 5, 6, 8]) }),
        ({ k, h }) => {
          const v = (Math.PI * k * h * h) / 2;
          return Math.abs(v - Math.floor(v) - 0.5) > 0.05;
        },
      );
      const { k, h } = o;
      const q = (k * h * h) / 2;
      const value = q * Math.PI;
      const xc = Math.sqrt(k * h);
      const f = (x: number) => (x * x) / k;
      const g = niceGrid(-xc * 1.2, xc * 1.2, -0.5, h * 1.2);
      const who = rng.pick(['A potter in Westbury', 'A glassblower in Stonebridge', 'A woodturner in Pinewood']);
      return {
        prompt: `${who} makes a bowl whose inside is formed by rotating the curve $y = \\dfrac{x^{2}}{${k}}$, for $0 \\le y \\le ${h}$, about the $y$-axis (measurements in centimetres). How much does the bowl hold, in millilitres? ($1\\text{ cm}^3 = 1$ mL.) Round to the nearest millilitre.`,
        figure: revYFigure(f, `x^{2}/${k}`, xc, h, g),
        parts: [part({ kind: 'numeric', value, decimals: 0 }, { suffix: 'mL' })],
        hints: ['Rotate about the $y$-axis: slice horizontally and integrate with respect to $y$.', `Solve for $x^{2}$: $x^{2} = ${k}y$. Then $V = \\pi\\displaystyle\\int_0^{${h}} x^{2}\\,dy$.`],
        solution: [
          `A slice at height $y$ is a disc of radius $x$, where $x^{2} = ${k}y$.`,
          `$V = \\pi\\displaystyle\\int_0^{${h}} ${k}y\\,dy = \\pi\\Big[${tn(k / 2)}y^{2}\\Big]_0^{${h}} = ${tn(q)}\\pi$`,
          `$V \\approx ${fmtFixed(value, 2)}\\text{ cm}^3$`,
          `The bowl holds about ${Math.round(value)} mL.`,
        ],
      };
    }
    if (t === 'cone') {
      const o = retry(
        () => ({ c: rng.pick([0.5, 0.6, 0.8, 1.2]), L: rng.pick([6, 8, 10, 12]) }),
        ({ c, L }) => {
          const v = (Math.PI * c * c * L * L) / 2;
          return Math.abs(v * 10 - Math.floor(v * 10) - 0.5) > 0.05;
        },
      );
      const { c, L } = o;
      const q = snap((c * c * L * L) / 2);
      const value = q * Math.PI;
      const f = (x: number) => c * Math.sqrt(x);
      const g = revGrid(-0.5, L + 0.5, 0, c * Math.sqrt(L));
      return {
        prompt: `The nose cone of a model rocket is formed by rotating $y = ${fmt(c)}\\sqrt{x}$, for $0 \\le x \\le ${L}$, about the $x$-axis (measurements in centimetres). Find the volume of the nose cone, to the nearest tenth of a cubic centimetre.`,
        figure: revFigure({ curves: [{ f, tex: `${fmt(c)}\\sqrt{x}`, color: 'brand' }], lo: () => 0, hi: f, a: 0, b: L, k: 0, g }),
        parts: [part({ kind: 'numeric', value, decimals: 1 }, { suffix: 'cm³' })],
        hints: [DISC, `$\\left(${fmt(c)}\\sqrt{x}\\right)^{2} = ${fmt(c * c)}x$.`],
        solution: [
          `A slice at $x$ is a disc of radius $${fmt(c)}\\sqrt{x}$, so its area is $\\pi(${fmt(c * c)}x)$.`,
          `$V = \\pi\\displaystyle\\int_0^{${L}} ${fmt(c * c)}x\\,dx = \\pi\\Big[${fmt((c * c) / 2)}x^{2}\\Big]_0^{${L}} = ${fmt(q)}\\pi$`,
          `$V \\approx ${fmtFixed(value, 2)}$`,
          `The nose cone has a volume of about ${fmtFixed(value, 1)} cm³.`,
        ],
      };
    }
    const o = retry(
      () => ({ a: rng.pick([8, 9, 10]), L: rng.pick([13, 14, 15]) }),
      ({ a, L }) => {
        const v = (4 / 3) * Math.PI * a * a * L;
        return Math.abs(v - Math.floor(v) - 0.5) > 0.05;
      },
    );
    const { a, L } = o;
    const q = (4 / 3) * a * a * L;
    const value = q * Math.PI;
    const k = (a * a) / (L * L);
    const f = (x: number) => (a / L) * Math.sqrt(Math.max(0, L * L - x * x));
    const g = revGrid(-L - 1, L + 1, 0, a);
    return {
      prompt: `A rugby ball is modelled by rotating the curve $y = \\dfrac{${a}}{${L}}\\sqrt{${L * L} - x^{2}}$, for $-${L} \\le x \\le ${L}$, about the $x$-axis (measurements in centimetres). Find its volume, to the nearest cubic centimetre.`,
      figure: revFigure({ curves: [{ f, tex: `\\frac{${a}}{${L}}\\sqrt{${L * L} - x^{2}}`, color: 'brand', label: `(${a}/${L})√(${L * L} − x²)` }], lo: () => 0, hi: f, a: -L, b: L, k: 0, g }),
      parts: [part({ kind: 'numeric', value, decimals: 0 }, { suffix: 'cm³' })],
      hints: [DISC, `Square the radius: $y^{2} = \\dfrac{${a * a}}{${L * L}}\\left(${L * L} - x^{2}\\right)$. The solid is symmetric, so you can double the integral from $0$ to $${L}$.`],
      solution: [
        `A slice at $x$ is a disc with $r^{2} = \\dfrac{${a * a}}{${L * L}}\\left(${L * L} - x^{2}\\right) = ${a * a} - ${tn(k, true)}x^{2}$.`,
        `$V = \\pi\\displaystyle\\int_{-${L}}^{${L}} \\left(${a * a} - ${tn(k, true)}x^{2}\\right)dx = 2\\pi\\Big[${a * a}x - ${tn(k / 3, true)}x^{3}\\Big]_0^{${L}}$`,
        `$= 2\\pi\\left(${a * a * L} - ${tn((k / 3) * L ** 3)}\\right) = ${tn(q)}\\pi \\approx ${fmtFixed(value, 2)}$`,
        `The rugby ball has a volume of about ${Math.round(value)} cm³.`,
      ],
    };
  },
});

export const INTEGRALAPPS_SKILLS: SkillDef[] = [areaBetween, volume];
