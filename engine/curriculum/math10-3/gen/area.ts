/** Math 10-3 Unit 5 — Area (M4, A1; lesson 5.4 also M1, M2). */
import { numPart, retry, roundingPhrase, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, gcd, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { PlaneFigure, SkillDef, SolidFigure } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

const tx = (u: string) => `\\text{${u}}`;
const sq = (u: string) => `\\text{${u}}^2`;
/** Remove floating-point noise from an exact decimal result. */
const exact = (x: number) => roundTo(x, 6);

function withGroups(s: string): string {
  const neg = s.startsWith('-');
  const [i, f] = (neg ? s.slice(1) : s).split('.');
  const g = i.length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : i;
  return `${neg ? '-' : ''}${g}${f ? `.${f}` : ''}`;
}
/** LaTeX number (trailing zeros dropped) with SI thin-space grouping for 5+ digit numbers. */
const n = (x: number, dec = 4) => withGroups(fmt(x, dec));
/** LaTeX number with exactly `dec` decimals. */
const nf = (x: number, dec: number) => withGroups(fmtFixed(x, dec));
const len = (x: number, u: string) => `$${n(x)}\\ ${tx(u)}$`;
const ar = (x: number, u: string) => `$${n(x)}\\ ${sq(u)}$`;
const arR = (x: number, u: string, dec: number) => `$${nf(x, dec)}\\ ${sq(u)}$`;

/** Money for Markdown text, kept outside maths: \$1,234.50 */
function cash(x: number): string {
  const [i, f] = fmtFixed(x, 2).split('.');
  return `\\$${i.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${f}`;
}

const UNIT: Record<string, { one: string; many: string }> = {
  mm: { one: 'millimetre', many: 'millimetres' },
  cm: { one: 'centimetre', many: 'centimetres' },
  m: { one: 'metre', many: 'metres' },
  in: { one: 'inch', many: 'inches' },
  ft: { one: 'foot', many: 'feet' },
  yd: { one: 'yard', many: 'yards' },
};
const article = (w: string) => (/^[aeiou]/i.test(w) ? 'an' : 'a');
const sqName = (u: string) => `square ${UNIT[u].many}`;

/** "to the nearest tenth of a square metre", "to the nearest square foot". */
function sqRound(dec: number, u: string): string {
  const w = `square ${UNIT[u].one}`;
  return dec === 0 ? `to the nearest ${w}` : `${roundingPhrase(dec)} of a ${w}`;
}
/** "to the nearest tenth of a metre", "to the nearest tenth of an inch". */
function lenRound(dec: number, u: string): string {
  const w = UNIT[u].one;
  return dec === 0 ? `to the nearest ${w}` : `${roundingPhrase(dec)} of ${article(w)} ${w}`;
}

/** True when rounding to `dec` places would sit on (or very near) a ...5 boundary. */
function nearHalf(v: number, dec: number): boolean {
  const x = Math.abs(v) * 10 ** dec;
  return Math.abs(x - Math.floor(x) - 0.5) < 0.02;
}

/** Mixed number in LaTeX for multiples of 1/16, e.g. 3\tfrac{3}{4}. */
function mixedTex(x: number): string {
  const whole = Math.floor(x + 1e-9);
  const num = Math.round((x - whole) * 16);
  if (num === 0) return `${whole}`;
  const g = gcd(num, 16);
  const fr = `\\tfrac{${num / g}}{${16 / g}}`;
  return whole ? `${whole}${fr}` : fr;
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Kiona', 'Liam', 'Mei', 'Tariq', 'Sofia', 'Aiden', 'Nadia', 'Ravi',
  'Chloé', 'Dakota', 'Hamid', 'Jasmine', 'Wei', 'Olivia', 'Kwame', 'Simran', 'Ethan', 'Fatima', 'Noah',
  'Leilani', 'Émilie', 'Tyler', 'Aaliyah', 'Connor', 'Anika', 'Gurpreet', 'Marcus', 'Ayesha', 'Owen',
  'Sienna', 'Jun', 'Malik', 'Harpreet', 'Isabelle', 'Cody', 'Talia', 'Yusuf', 'Brooklyn', 'Sanjay',
  'Rosalie', 'Nathan', 'Ingrid', 'Tanis', 'Mariam',
];

// ---------------------------------------------------------------------------
// Figure helpers
// ---------------------------------------------------------------------------

type P2 = [number, number];
const r3 = (v: number) => Math.round(v * 1000) / 1000;
const rectPts = (x: number, y: number, w: number, h: number): P2[] => [
  [x, y],
  [x + w, y],
  [x + w, y + h],
  [x, y + h],
  [x, y],
];
function arcPts(cx: number, cy: number, r: number, a0: number, a1: number, segs = 24): P2[] {
  const out: P2[] = [];
  for (let i = 0; i <= segs; i++) {
    const a = a0 + ((a1 - a0) * i) / segs;
    out.push([r3(cx + r * Math.cos(a)), r3(cy + r * Math.sin(a))]);
  }
  return out;
}
const circlePts = (cx: number, cy: number, r: number) => arcPts(cx, cy, r, 0, 2 * Math.PI, 40);

function gridStep(span: number): number {
  for (const s of [1, 2, 5, 10, 20, 25, 50, 100]) if (span / s <= 16) return s;
  return 200;
}

/** A plan drawn to scale on a light grid. Tick labels are hidden: the prompt gives the measurements. */
function planFigure(
  shapes: Array<{ points: P2[]; color?: 'brand' | 'accent' | 'muted' }>,
  W: number,
  H: number,
  caption: string,
  dashed: Array<[P2, P2]> = [],
): PlaneFigure {
  const s = gridStep(Math.max(W, H));
  const sh = (p: P2): P2 => [r3(p[0] + s), r3(p[1] + s)];
  const fig: PlaneFigure = {
    type: 'plane',
    grid: { xMin: 0, xMax: Math.ceil(W / s) * s + 2 * s, yMin: 0, yMax: Math.ceil(H / s) * s + 2 * s, step: s },
    polylines: shapes.map((x) => ({ points: x.points.map(sh), color: x.color ?? 'brand' })),
    hideTickLabels: true,
    caption,
  };
  if (dashed.length) fig.segments = dashed.map(([a, b]) => ({ from: sh(a), to: sh(b), dashed: true, color: 'muted' as const }));
  return fig;
}

const prismFig = (l: number, w: number, h: number, u: string): SolidFigure => ({
  type: 'solid',
  shape: 'rectPrism',
  labels: { l: `${fmt(l)} ${u}`, w: `${fmt(w)} ${u}`, h: `${fmt(h)} ${u}` },
});
const cylFig = (r: number, h: number, u: string, useD: boolean): SolidFigure => ({
  type: 'solid',
  shape: 'cylinder',
  labels: useD ? { d: `${fmt(2 * r)} ${u}`, h: `${fmt(h)} ${u}` } : { r: `${fmt(r)} ${u}`, h: `${fmt(h)} ${u}` },
});

// Polygon area and grid-square coverage (for irregular shapes).

function polyArea(p: P2[]): number {
  let s = 0;
  for (let i = 0; i < p.length; i++) {
    const [x1, y1] = p[i];
    const [x2, y2] = p[(i + 1) % p.length];
    s += x1 * y2 - x2 * y1;
  }
  return Math.abs(s) / 2;
}

function clipHalf(poly: P2[], inside: (q: P2) => boolean, cut: (a: P2, b: P2) => P2): P2[] {
  const out: P2[] = [];
  for (let i = 0; i < poly.length; i++) {
    const cur = poly[i];
    const prev = poly[(i + poly.length - 1) % poly.length];
    const ci = inside(cur);
    const pi = inside(prev);
    if (ci) {
      if (!pi) out.push(cut(prev, cur));
      out.push(cur);
    } else if (pi) out.push(cut(prev, cur));
  }
  return out;
}

/** Area of the unit grid cell with lower-left corner (x0, y0) that lies inside the polygon. */
function cellCover(poly: P2[], x0: number, y0: number): number {
  const atX = (x: number) => (a: P2, b: P2): P2 => [x, a[1] + ((b[1] - a[1]) * (x - a[0])) / (b[0] - a[0])];
  const atY = (y: number) => (a: P2, b: P2): P2 => [a[0] + ((b[0] - a[0]) * (y - a[1])) / (b[1] - a[1]), y];
  let p = clipHalf(poly, (q) => q[0] >= x0, atX(x0));
  if (p.length) p = clipHalf(p, (q) => q[0] <= x0 + 1, atX(x0 + 1));
  if (p.length) p = clipHalf(p, (q) => q[1] >= y0, atY(y0));
  if (p.length) p = clipHalf(p, (q) => q[1] <= y0 + 1, atY(y0 + 1));
  return p.length >= 3 ? polyArea(p) : 0;
}

function countCells(poly: P2[], cols: number, rows: number): { full: number; partial: number } {
  let full = 0;
  let partial = 0;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const a = cellCover(poly, i, j);
      if (a > 0.97) full++;
      else if (a > 0.03) partial++;
    }
  }
  return { full, partial };
}

/** A smooth, star-shaped "blob" that fits inside a cols × rows grid. */
function blob(rng: Rng, cols: number, rows: number, nPts = 16): P2[] {
  const cx = cols / 2;
  const cy = rows / 2;
  const a1 = rng.float(0.08, 0.18, 2);
  const a2 = rng.float(0.04, 0.1, 2);
  const p1 = rng.next() * 2 * Math.PI;
  const p2 = rng.next() * 2 * Math.PI;
  const maxF = 1 + a1 + a2;
  const rx = (cols / 2 - 0.4) / maxF;
  const ry = (rows / 2 - 0.4) / maxF;
  const pts: P2[] = [];
  for (let i = 0; i < nPts; i++) {
    const t = (2 * Math.PI * i) / nPts;
    const f = 1 + a1 * Math.sin(2 * t + p1) + a2 * Math.sin(3 * t + p2);
    pts.push([Math.round((cx + rx * f * Math.cos(t)) * 10) / 10, Math.round((cy + ry * f * Math.sin(t)) * 10) / 10]);
  }
  return pts;
}

// ---------------------------------------------------------------------------
// Lesson 5.1 — Area of common shapes
// ---------------------------------------------------------------------------

interface Ctx {
  what: string;
  u: string;
  lo: number;
  hi: number;
}

const RECT_CTX: Ctx[] = [
  { what: 'rectangular deck', u: 'm', lo: 3, hi: 9 },
  { what: 'rectangular concrete pad for a shed', u: 'm', lo: 2, hi: 6 },
  { what: 'rectangular vegetable garden', u: 'm', lo: 3, hi: 12 },
  { what: 'rectangular garage floor', u: 'ft', lo: 12, hi: 24 },
  { what: 'rectangular bedroom floor', u: 'ft', lo: 9, hi: 15 },
  { what: 'rectangular cutting board', u: 'cm', lo: 20, hi: 45 },
  { what: 'rectangular window pane', u: 'in', lo: 14, hi: 36 },
  { what: 'rectangular tarp', u: 'ft', lo: 6, hi: 20 },
];
const TRI_CTX: Ctx[] = [
  { what: 'triangular corner shelf', u: 'cm', lo: 20, hi: 50 },
  { what: 'triangular sail', u: 'm', lo: 2, hi: 6 },
  { what: 'triangular gable end of a shed', u: 'ft', lo: 4, hi: 12 },
  { what: 'triangular warning sign', u: 'cm', lo: 60, hi: 90 },
  { what: 'triangular pennant flag', u: 'in', lo: 8, hi: 18 },
  { what: 'triangular flower bed', u: 'm', lo: 2, hi: 8 },
];
const PARA_CTX: Ctx[] = [
  { what: 'parallelogram-shaped patio stone', u: 'cm', lo: 20, hi: 45 },
  { what: 'parallelogram-shaped parking stall', u: 'm', lo: 3, hi: 6 },
  { what: 'parallelogram-shaped piece of sheet metal', u: 'in', lo: 6, hi: 24 },
  { what: 'parallelogram-shaped flower bed', u: 'ft', lo: 4, hi: 14 },
];
const TRAP_CTX: Ctx[] = [
  { what: 'trapezoid-shaped building lot', u: 'm', lo: 15, hi: 40 },
  { what: 'trapezoid-shaped garden bed', u: 'ft', lo: 4, hi: 16 },
  { what: 'trapezoid-shaped piece of countertop', u: 'cm', lo: 40, hi: 120 },
  { what: 'trapezoid-shaped side panel of a wheelbarrow', u: 'in', lo: 10, hi: 30 },
  { what: 'trapezoid-shaped window', u: 'in', lo: 18, hi: 40 },
];

type Shape = 'rect' | 'tri' | 'para' | 'trap';

/** True when x has more than two decimal places. */
const over2dp = (x: number) => Math.abs(x * 100 - Math.round(x * 100)) > 1e-6;

function shapeArea(shape: Shape, dims: number[]): number {
  if (shape === 'trap') return ((dims[0] + dims[1]) / 2) * dims[2];
  return shape === 'tri' ? (dims[0] * dims[1]) / 2 : dims[0] * dims[1];
}

/**
 * Answer part and wording for an area. Values with more than two decimal places ask for
 * rounding to the hundredth (exact values and mixed numbers are still within tolerance);
 * otherwise the exact value is expected.
 */
function areaAnswer(A: number, u: string, frac: boolean) {
  const round = over2dp(A);
  const note = round
    ? ` Give the area as a decimal ${sqRound(2, u)}${frac ? ', or as a mixed number' : ''}.`
    : frac
      ? ' Give the exact area as a decimal or a mixed number.'
      : '';
  return {
    note,
    part: numPart(A, round ? { decimals: 2, suffix: `${u}²` } : { suffix: `${u}²` }),
    /** End of the calculation line: "226.3125 \approx 226.31" or "57.75". */
    eq: round ? `${n(A, 6)} \\approx ${nf(A, 2)}` : n(A),
    /** The answer with units, for the last solution step. */
    final: round ? `about ${arR(A, u, 2)}` : ar(A, u),
  };
}

/** Area item for one basic shape, with measurements shown as decimals or (if `frac`) mixed numbers. */
function basicItem(shape: Shape, what: string, u: string, dims: number[], frac = false, slant?: number): GenOutput {
  const res = areaAnswer(exact(shapeArea(shape, dims)), u, frac);
  const note = res.note;
  const show = frac ? mixedTex : (x: number) => n(x);
  const L = (x: number) => `$${show(x)}\\ ${tx(u)}$`;
  const fracDims = frac ? dims.filter((x, i) => x % 1 !== 0 && dims.indexOf(x) === i) : [];
  const toDec = fracDims.length ? [`Write each mixed number as a decimal: ${fracDims.map((x) => `$${show(x)} = ${n(x)}$`).join(', ')}.`] : [];
  if (shape === 'rect') {
    const l = Math.max(dims[0], dims[1]);
    const w = Math.min(dims[0], dims[1]);
    return {
      prompt: `A ${what} is ${L(l)} long and ${L(w)} wide. What is its area?${note}`,
      parts: [res.part],
      hints: ['Area counts how many unit squares cover the surface.', 'For a rectangle, $A = l \\times w$ (length times width).'],
      solution: [...toDec, '$A = lw$', `$A = ${n(l)} \\times ${n(w)} = ${res.eq}$`, `The area of the ${what} is ${res.final}.`],
    };
  }
  if (shape === 'tri') {
    const [b, h] = dims;
    return {
      prompt: `A ${what} has a base of ${L(b)} and a height of ${L(h)}. What is its area?${note}`,
      parts: [res.part],
      hints: ['A triangle is half of a rectangle with the same base and height.', 'Use $A = \\tfrac{1}{2}bh$.'],
      solution: [
        ...toDec,
        '$A = \\tfrac{1}{2}bh$',
        `$A = \\tfrac{1}{2} \\times ${n(b)} \\times ${n(h)} = \\tfrac{1}{2} \\times ${n(exact(b * h), 6)} = ${res.eq}$`,
        `The area of the ${what} is ${res.final}.`,
      ],
    };
  }
  if (shape === 'para') {
    const [b, h] = dims;
    const slantText = slant ? ` Its slanted sides are ${L(slant)} long.` : '';
    return {
      prompt: `A ${what} has a base of ${L(b)} and a perpendicular height of ${L(h)}.${slantText} What is its area?${note}`,
      parts: [res.part],
      hints: [
        slant ? 'The height must be measured at a right angle to the base. A slanted side is not the height.' : 'Cut a triangle off one end of a parallelogram and slide it to the other end: you get a rectangle.',
        'Use $A = bh$ (base times perpendicular height).',
      ],
      solution: [...toDec, '$A = bh$', `$A = ${n(b)} \\times ${n(h)} = ${res.eq}$`, ...(slant ? [`The slanted side length (${L(slant)}) is not needed.`] : []), `The area of the ${what} is ${res.final}.`],
    };
  }
  const [a, b, h] = dims;
  return {
    prompt: `A ${what} has parallel sides of ${L(a)} and ${L(b)}. The perpendicular distance between the parallel sides (the height) is ${L(h)}. What is its area?${note}`,
    parts: [res.part],
    hints: ['Average the two parallel sides, then multiply by the height.', 'Use $A = \\dfrac{a + b}{2} \\times h$, where $a$ and $b$ are the parallel sides.'],
    solution: [
      ...toDec,
      '$A = \\dfrac{a + b}{2} \\times h$',
      `$A = \\dfrac{${n(a)} + ${n(b)}}{2} \\times ${n(h)} = ${n(exact((a + b) / 2))} \\times ${n(h)} = ${res.eq}$`,
      `The area of the ${what} is ${res.final}.`,
    ],
  };
}

const ctxFor = (shape: Shape): Ctx[] => (shape === 'rect' ? RECT_CTX : shape === 'tri' ? TRI_CTX : shape === 'para' ? PARA_CTX : TRAP_CTX);

function intDims(rng: Rng, shape: Shape, c: Ctx): number[] {
  if (shape === 'trap') {
    const a = rng.int(c.lo, c.hi - 2);
    const b = rng.int(a + 2, c.hi + Math.ceil((c.hi - c.lo) / 2));
    const h = rng.int(Math.max(2, Math.ceil(c.lo / 2)), c.hi);
    return [a, b, h];
  }
  return retry(
    () => {
      const x = rng.int(c.lo, c.hi);
      return [x, rng.intExcept(c.lo, c.hi, [x])];
    },
    ([x, y]) => shape !== 'tri' || (x * y) % 2 === 0,
  );
}

const areaBasic = skill({
  id: 'm103-area-basic',
  name: 'Area of rectangles, triangles, parallelograms and trapezoids',
  description: 'Calculate the area of rectangles, triangles, parallelograms and trapezoids from SI or imperial measurements, including decimals and fractions.',
  outcomes: ['M4'],
  lessonId: 'm103-5-1',
  calculator: true,
  gen(rng, d) {
    if (d === 1) {
      const shape = rng.pick(['rect', 'tri', 'para'] as const);
      const c = rng.pick(ctxFor(shape));
      return { ...basicItem(shape, c.what, c.u, intDims(rng, shape, c)), calculator: false };
    }
    if (d === 2) {
      const mode = rng.weighted([
        ['trap', 4],
        ['decimal', 3],
        ['fraction', 3],
      ] as const);
      if (mode === 'trap') {
        const c = rng.pick(TRAP_CTX);
        return basicItem('trap', c.what, c.u, intDims(rng, 'trap', c));
      }
      if (mode === 'decimal') {
        const shape = rng.pick(['rect', 'tri', 'para'] as const);
        const c = rng.pick(ctxFor(shape).filter((x) => x.u === 'm' || x.u === 'cm'));
        const dims = retry(
          () => [rng.int(c.lo * 10, c.hi * 10) / 10, rng.int(c.lo * 10, c.hi * 10) / 10],
          ([x, y]) => x !== y && (shape !== 'tri' || Math.round(x * y * 100) % 2 === 0) && (Math.round(x * 10) % 10 !== 0 || Math.round(y * 10) % 10 !== 0),
        );
        const slant = shape === 'para' && rng.chance(0.5) ? exact(dims[1] + rng.int(3, 15) / 10) : undefined;
        return basicItem(shape, c.what, c.u, dims, false, slant);
      }
      const shape = rng.pick(['rect', 'tri', 'para', 'trap'] as const);
      const c = rng.pick(ctxFor(shape).filter((x) => x.u === 'in' || x.u === 'ft'));
      const base = intDims(rng, shape, c);
      const dims = retry(
        () => base.map((x) => x + rng.pick([0, 0.25, 0.5, 0.75])),
        (ds) => ds.some((x) => x % 1 !== 0) && (shape !== 'trap' || ds[0] < ds[1]) && !nearHalf(shapeArea(shape, ds), 2),
      );
      return basicItem(shape, c.what, c.u, dims, true);
    }
    // d === 3: applied, multi-step
    const mode = rng.pick(['mixedImp', 'mixedSI', 'many', 'trapFrac'] as const);
    const name = rng.pick(NAMES);
    if (mode === 'mixedImp') {
      const [L, W, a, b] = retry(
        () => [rng.int(10, 18), rng.int(8, 14), rng.pick([0, 3, 6, 9]), rng.pick([0, 3, 6, 9])],
        ([l, w, x, y]) => x + y > 0 && !nearHalf((l + x / 12) * (w + y / 12), 2),
      );
      const room = rng.pick(['bedroom', 'basement rec room', 'kitchen', 'home office', 'laundry room']);
      const lf = L + a / 12;
      const wf = W + b / 12;
      const A = exact(lf * wf);
      const res = areaAnswer(A, 'ft', true);
      const ftin = (f: number, i: number) => `$${f}\\ ${tx('ft')}${i ? `\\ ${i}\\ ${tx('in')}` : ''}$`;
      const conv = (side: string, f: number, i: number) =>
        i ? `$${i}\\ ${tx('in')} = \\tfrac{${i}}{12}\\ ${tx('ft')} = ${fmt(i / 12)}\\ ${tx('ft')}$, so the ${side} is $${fmt(f + i / 12)}\\ ${tx('ft')}$.` : `The ${side} is already in feet: $${f}\\ ${tx('ft')}$.`;
      return {
        prompt: `${name} is installing vinyl plank flooring in a rectangular ${room} that measures ${ftin(L, a)} by ${ftin(W, b)}. What is the floor area in square feet?${res.note}`,
        parts: [res.part],
        hints: ['Write each measurement in feet only. There are 12 inches in 1 foot.', 'Then use $A = lw$.'],
        solution: [conv('length', L, a), conv('width', W, b), `$A = lw = ${fmt(lf)} \\times ${fmt(wf)} = ${res.eq}$`, `The floor area is ${res.final}.`],
      };
    }
    if (mode === 'mixedSI') {
      const thing = rng.pick(['kitchen countertop', 'workbench top', 'reception desk top', 'shop counter']);
      const [L, D] = retry(
        () => [rng.int(12, 36) / 10, rng.int(11, 19) * 5],
        ([l, dd]) => !over2dp(l * (dd / 100)),
      );
      const A = exact(L * (D / 100));
      return {
        prompt: `A rectangular ${thing} is ${len(L, 'm')} long and ${len(D, 'cm')} deep. ${name} needs its area in square metres to order a laminate sheet. What is the area, in square metres?`,
        parts: [numPart(A, { suffix: 'm²' })],
        hints: ['Both measurements must be in the same unit before you multiply.', `Change centimetres to metres by dividing by 100, then use $A = lw$.`],
        solution: [`$${D}\\ ${tx('cm')} = ${D} \\div 100 = ${fmt(D / 100)}\\ ${tx('m')}$`, `$A = lw = ${fmt(L)} \\times ${fmt(D / 100)} = ${n(A)}$`, `The area is ${ar(A, 'm')}.`],
      };
    }
    if (mode === 'many') {
      const kind = rng.pick(['pennants', 'gables', 'tiles'] as const);
      if (kind === 'pennants') {
        const count = rng.int(8, 24);
        const b = rng.int(6, 12);
        const h = 2 * rng.int(5, 9);
        const one = (b * h) / 2;
        const A = one * count;
        return {
          prompt: `${name} is sewing ${count} triangular pennants for a banner at a community rodeo. Each pennant has a base of ${len(b, 'in')} and a height of ${len(h, 'in')}. How much fabric is needed for all the pennants? (Ignore seams.)`,
          parts: [numPart(A, { suffix: 'in²' })],
          hints: ['First find the area of one pennant.', 'Use $A = \\tfrac{1}{2}bh$ for one pennant, then multiply by the number of pennants.'],
          solution: [`One pennant: $A = \\tfrac{1}{2} \\times ${b} \\times ${h} = ${n(one)}\\ ${sq('in')}$`, `All pennants: $${count} \\times ${n(one)} = ${n(A)}$`, `${name} needs ${ar(A, 'in')} of fabric.`],
        };
      }
      if (kind === 'gables') {
        const sheds = rng.int(2, 4);
        const b = 2 * rng.int(4, 7);
        const h = rng.int(3, 6);
        const one = (b * h) / 2;
        const A = one * 2 * sheds;
        return {
          prompt: `A crew is putting siding on ${sheds} identical sheds. Each shed has two triangular gable ends. Each gable end has a base of ${len(b, 'ft')} and a height of ${len(h, 'ft')}. What is the total area of all the gable ends?`,
          parts: [numPart(A, { suffix: 'ft²' })],
          hints: ['Count how many triangles there are in total.', 'Find the area of one triangle with $A = \\tfrac{1}{2}bh$, then multiply by the number of triangles.'],
          solution: [`Number of gable ends: $${sheds} \\times 2 = ${2 * sheds}$`, `One gable end: $\\tfrac{1}{2} \\times ${b} \\times ${h} = ${n(one)}\\ ${sq('ft')}$`, `Total: $${2 * sheds} \\times ${n(one)} = ${n(A)}$`, `The gable ends have a total area of ${ar(A, 'ft')}.`],
        };
      }
      const count = rng.int(12, 40);
      const b = rng.int(15, 30);
      const h = rng.int(10, 20);
      const one = b * h;
      const A = one * count;
      return {
        prompt: `A landscaper lays ${count} parallelogram-shaped paving stones. Each stone has a base of ${len(b, 'cm')} and a perpendicular height of ${len(h, 'cm')}. What area do the stones cover altogether?`,
        parts: [numPart(A, { suffix: 'cm²' })],
        hints: ['Find the area of one stone first.', 'For a parallelogram, $A = bh$. Then multiply by the number of stones.'],
        solution: [`One stone: $A = ${b} \\times ${h} = ${n(one)}\\ ${sq('cm')}$`, `All stones: $${count} \\times ${n(one)} = ${n(A)}$`, `The stones cover ${ar(A, 'cm')}.`],
      };
    }
    // trapFrac
    const c = rng.pick(TRAP_CTX.filter((x) => x.u === 'ft' || x.u === 'in'));
    const base = intDims(rng, 'trap', c);
    const dims = retry(
      () => base.map((x) => x + rng.pick([0, 0.25, 0.5, 0.75])),
      (ds) => ds.filter((x) => x % 1 !== 0).length >= 2 && ds[0] < ds[1] && !nearHalf(shapeArea('trap', ds), 2),
    );
    const out = basicItem('trap', c.what, c.u, dims, true);
    return { ...out, prompt: out.prompt.replace(`A ${c.what} has`, `${name} measured a ${c.what}. It has`) };
  },
});

// ----- Circles -----

const CIRC_R: Ctx[] = [
  { what: 'circular rug', u: 'ft', lo: 2, hi: 6 },
  { what: 'round tabletop', u: 'cm', lo: 40, hi: 70 },
  { what: 'circular flower bed', u: 'm', lo: 1, hi: 5 },
  { what: 'round manhole cover', u: 'cm', lo: 30, hi: 45 },
  { what: 'round clock face', u: 'in', lo: 5, hi: 12 },
  { what: 'circular fire pit pad', u: 'ft', lo: 3, hi: 7 },
  { what: 'circular skating rink on a farm pond', u: 'm', lo: 8, hi: 20 },
];

interface DCtx {
  u: string;
  make: (rng: Rng) => number;
  lead: (x: string) => string;
  thing: string;
}
const CIRC_D: DCtx[] = [
  { u: 'in', make: (r) => r.int(10, 18), lead: (x) => `A pizza has a diameter of ${x}.`, thing: 'the top of the pizza' },
  { u: 'm', make: (r) => r.int(30, 46) / 10, lead: (x) => `A round trampoline mat has a diameter of ${x}.`, thing: 'the mat' },
  { u: 'ft', make: (r) => 2 * r.int(9, 18), lead: (x) => `A round steel grain bin has a diameter of ${x}.`, thing: 'the floor of the bin' },
  { u: 'cm', make: (r) => r.int(60, 120), lead: (x) => `A round table has a diameter of ${x}.`, thing: 'the tabletop' },
  { u: 'm', make: (r) => r.int(3, 8), lead: (x) => `A circular patio is ${x} across (its diameter).`, thing: 'the patio' },
  { u: 'ft', make: (r) => r.int(6, 9), lead: (x) => `A round hot tub cover has a diameter of ${x}.`, thing: 'the cover' },
];

interface PartCtx {
  frac: 2 | 4;
  u: string;
  given: 'r' | 'd';
  make: (rng: Rng) => number;
  lead: (x: string) => string;
  thing: string;
}
const PART_CTX: PartCtx[] = [
  { frac: 2, u: 'in', given: 'd', make: (r) => 2 * r.int(12, 20), lead: (x) => `A semicircular window above a door is ${x} wide along its straight bottom edge.`, thing: 'the glass' },
  { frac: 4, u: 'in', given: 'r', make: (r) => r.int(32, 40), lead: (x) => `A corner shower base is shaped like a quarter circle with a radius of ${x}.`, thing: 'the shower base' },
  { frac: 2, u: 'm', given: 'd', make: (r) => r.int(30, 60) / 10, lead: (x) => `A semicircular concrete patio has a diameter of ${x}.`, thing: 'the patio' },
  { frac: 4, u: 'm', given: 'r', make: (r) => r.int(4, 12), lead: (x) => `A lawn sprinkler in the corner of a yard sweeps a quarter circle. The water reaches ${x} from the sprinkler.`, thing: 'the lawn it waters' },
  { frac: 2, u: 'ft', given: 'd', make: (r) => 2 * r.int(8, 15), lead: (x) => `A small outdoor stage is shaped like a half circle. Its straight front edge is ${x} long.`, thing: 'the stage floor' },
  { frac: 4, u: 'ft', given: 'r', make: (r) => r.int(6, 12), lead: (x) => `A corner deck is shaped like a quarter circle with a radius of ${x}.`, thing: 'the deck' },
  { frac: 2, u: 'cm', given: 'd', make: (r) => 2 * r.int(30, 50), lead: (x) => `A half-round table fits flat against a wall. Its straight edge is ${x} long.`, thing: 'the tabletop' },
];

const areaCircle = skill({
  id: 'm103-area-circle',
  name: 'Area of circles',
  description: 'Calculate the area of a circle, semicircle or quarter circle from its radius or diameter.',
  outcomes: ['M4'],
  lessonId: 'm103-5-1',
  calculator: true,
  gen(rng, d) {
    const piHint = 'Use the $\\pi$ key on your calculator and round only at the end.';
    if (d === 1) {
      const c = rng.pick(CIRC_R);
      const r = retry(() => rng.int(c.lo, c.hi), (x) => !nearHalf(Math.PI * x * x, 1));
      const A = Math.PI * r * r;
      return {
        prompt: `A ${c.what} has a radius of ${len(r, c.u)}. What is its area, ${sqRound(1, c.u)}?`,
        parts: [numPart(A, { decimals: 1, suffix: `${c.u}²` })],
        hints: ['Use $A = \\pi r^2$. Square the radius first, then multiply by $\\pi$.', piHint],
        solution: ['$A = \\pi r^2$', `$A = \\pi (${r})^2 = \\pi \\times ${r * r} \\approx ${nf(A, 1)}$`, `The area of the ${c.what} is about ${arR(A, c.u, 1)}.`],
      };
    }
    if (d === 2) {
      if (rng.chance(0.25)) {
        const ctx = rng.pick([
          { u: 'm', make: () => rng.int(3, 12), lead: (x: string) => `A lawn sprinkler sprays water up to ${x} away in every direction.`, ask: 'What area of lawn does it water' },
          { u: 'm', make: () => rng.int(2, 9), lead: (x: string) => `A goat on an acreage is tied to a post with a rope that is ${x} long.`, ask: 'How much ground can the goat graze' },
          { u: 'ft', make: () => rng.int(10, 30), lead: (x: string) => `A yard light lights up the ground for ${x} in every direction around the pole.`, ask: 'What area of ground is lit' },
        ]);
        const r = retry(ctx.make, (x) => !nearHalf(Math.PI * x * x, 1));
        const A = Math.PI * r * r;
        return {
          prompt: `${ctx.lead(len(r, ctx.u))} ${ctx.ask}, ${sqRound(1, ctx.u)}?`,
          parts: [numPart(A, { decimals: 1, suffix: `${ctx.u}²` })],
          hints: ['The covered region is a circle. Which measurement of the circle are you given?', `The distance from the centre to the edge is the radius. Use $A = \\pi r^2$.`],
          solution: [`The distance from the centre is the radius: $r = ${r}\\ ${tx(ctx.u)}$.`, `$A = \\pi r^2 = \\pi (${r})^2 \\approx ${nf(A, 1)}$`, `The area is about ${arR(A, ctx.u, 1)}.`],
        };
      }
      const c = rng.pick(CIRC_D);
      const dia = retry(() => c.make(rng), (x) => !nearHalf((Math.PI * x * x) / 4, 1));
      const r = dia / 2;
      const A = Math.PI * r * r;
      return {
        prompt: `${c.lead(len(dia, c.u))} What is the area of ${c.thing}, ${sqRound(1, c.u)}?`,
        parts: [numPart(A, { decimals: 1, suffix: `${c.u}²` })],
        hints: ['The area formula uses the radius, not the diameter.', 'Radius = diameter ÷ 2. Then use $A = \\pi r^2$.'],
        solution: [`$r = ${n(dia)} \\div 2 = ${n(r)}\\ ${tx(c.u)}$`, `$A = \\pi r^2 = \\pi (${n(r)})^2 \\approx ${nf(A, 1)}$`, `The area of ${c.thing} is about ${arR(A, c.u, 1)}.`],
      };
    }
    const c = rng.pick(PART_CTX);
    const g = retry(() => c.make(rng), (x) => {
      const r = c.given === 'd' ? x / 2 : x;
      return !nearHalf((Math.PI * r * r) / c.frac, 1);
    });
    const r = c.given === 'd' ? g / 2 : g;
    const full = Math.PI * r * r;
    const A = full / c.frac;
    const part = c.frac === 2 ? 'half' : 'one quarter';
    return {
      prompt: `${c.lead(len(g, c.u))} What is the area of ${c.thing}, ${sqRound(1, c.u)}?`,
      parts: [numPart(A, { decimals: 1, suffix: `${c.u}²` })],
      hints: [`This shape is ${part} of a full circle.`, `Find the area of the full circle with $A = \\pi r^2$, then divide by ${c.frac}.`],
      solution: [
        ...(c.given === 'd' ? [`The straight edge is a diameter, so $r = ${n(g)} \\div 2 = ${n(r)}\\ ${tx(c.u)}$.`] : [`$r = ${n(r)}\\ ${tx(c.u)}$`]),
        `Full circle: $\\pi (${n(r)})^2 \\approx ${nf(full, 2)}\\ ${sq(c.u)}$`,
        `${cap(part)} of the circle: $${nf(full, 2)} \\div ${c.frac} \\approx ${nf(A, 1)}$`,
        `The area of ${c.thing} is about ${arR(A, c.u, 1)}.`,
      ],
    };
  },
});

// ----- Rearranging area formulas (A1) -----

const UNK_RECT: Ctx[] = [
  { what: 'rectangular dog run', u: 'm', lo: 2, hi: 12 },
  { what: 'rectangular patio', u: 'ft', lo: 6, hi: 20 },
  { what: 'rectangular storage unit floor', u: 'ft', lo: 5, hi: 15 },
  { what: 'rectangular garden plot', u: 'm', lo: 2, hi: 12 },
  { what: 'rectangular parking pad', u: 'm', lo: 3, hi: 10 },
  { what: 'rectangular bulletin board', u: 'cm', lo: 30, hi: 120 },
  { what: 'rectangular hay storage shed floor', u: 'ft', lo: 10, hi: 30 },
];

const areaUnknown = skill({
  id: 'm103-area-unknown',
  name: 'Finding a missing dimension from the area',
  description: 'Rearrange A = lw, A = ½bh, the trapezoid formula or A = πr² to find an unknown length.',
  outcomes: ['M4', 'A1'],
  lessonId: 'm103-5-1',
  calculator: true,
  gen(rng, d) {
    if (d === 1) {
      const c = rng.pick(UNK_RECT);
      const l = rng.int(c.lo, c.hi);
      const w = rng.intExcept(c.lo, c.hi, [l]);
      const L = Math.max(l, w);
      const W = Math.min(l, w);
      const A = L * W;
      const askLength = rng.chance(0.5);
      const known = askLength ? W : L;
      const ans = askLength ? L : W;
      return {
        prompt: `A ${c.what} has an area of ${ar(A, c.u)}. It is ${len(known, c.u)} ${askLength ? 'wide' : 'long'}. How ${askLength ? 'long' : 'wide'} is it?`,
        parts: [numPart(ans, { suffix: c.u })],
        hints: ['Start with $A = lw$ and substitute the values you know.', `To undo multiplying by ${known}, divide both sides by ${known}.`],
        solution: [
          '$A = lw$',
          askLength ? `$${A} = l \\times ${known}$` : `$${A} = ${known} \\times w$`,
          askLength ? `$l = \\dfrac{${A}}{${known}} = ${ans}$` : `$w = \\dfrac{${A}}{${known}} = ${ans}$`,
          `Check: $${L} \\times ${W} = ${A}$ ✓. The ${c.what} is ${len(ans, c.u)} ${askLength ? 'long' : 'wide'}.`,
        ],
        calculator: false,
      };
    }
    if (d === 2) {
      const mode = rng.pick(['triH', 'triB', 'rectDec', 'paraH'] as const);
      if (mode === 'triH' || mode === 'triB') {
        const c = rng.pick(TRI_CTX);
        const [b, h] = intDims(rng, 'tri', c);
        const A = (b * h) / 2;
        const findH = mode === 'triH';
        const known = findH ? b : h;
        const ans = findH ? h : b;
        return {
          prompt: `A ${c.what} has an area of ${ar(A, c.u)}. Its ${findH ? 'base' : 'height'} is ${len(known, c.u)}. What is its ${findH ? 'height' : 'base'}?`,
          parts: [numPart(ans, { suffix: c.u })],
          hints: ['Start with $A = \\tfrac{1}{2}bh$ and substitute what you know.', `Multiply both sides by 2 to clear the $\\tfrac{1}{2}$, then divide by the ${findH ? 'base' : 'height'}: ${findH ? '$h = \\dfrac{2A}{b}$' : '$b = \\dfrac{2A}{h}$'}.`],
          solution: [
            '$A = \\tfrac{1}{2}bh$',
            findH ? `$${n(A)} = \\tfrac{1}{2} \\times ${b} \\times h$` : `$${n(A)} = \\tfrac{1}{2} \\times b \\times ${h}$`,
            `Multiply both sides by 2: $${n(2 * A)} = ${findH ? `${b}h` : `${h}b`}$`,
            `Divide both sides by ${known}: $${findH ? 'h' : 'b'} = \\dfrac{${n(2 * A)}}{${known}} = ${ans}$`,
            `The ${findH ? 'height' : 'base'} is ${len(ans, c.u)}.`,
          ],
        };
      }
      if (mode === 'rectDec') {
        const c = rng.pick(UNK_RECT.filter((x) => x.u === 'm' || x.u === 'ft'));
        const [l, w] = retry(
          () => [rng.int(c.lo * 10, c.hi * 10) / 10, rng.int(c.lo * 2, c.hi * 2) / 2],
          ([x, y]) => x !== y && x % 1 !== 0,
        );
        const A = exact(l * w);
        return {
          prompt: `A ${c.what} has an area of ${ar(A, c.u)}. One side is ${len(w, c.u)} long. How long is the other side?`,
          parts: [numPart(l, { suffix: c.u })],
          hints: ['Start with $A = lw$.', `Divide the area by the side you know: $l = \\dfrac{A}{w}$.`],
          solution: ['$A = lw$', `$${n(A)} = l \\times ${n(w)}$`, `$l = \\dfrac{${n(A)}}{${n(w)}} = ${n(l)}$`, `The other side is ${len(l, c.u)} long.`],
        };
      }
      const c = rng.pick(PARA_CTX);
      const [b, h] = intDims(rng, 'para', c);
      const A = b * h;
      return {
        prompt: `A ${c.what} has an area of ${ar(A, c.u)} and a base of ${len(b, c.u)}. What is its perpendicular height?`,
        parts: [numPart(h, { suffix: c.u })],
        hints: ['Start with $A = bh$.', 'Divide both sides by the base: $h = \\dfrac{A}{b}$.'],
        solution: ['$A = bh$', `$${A} = ${b} \\times h$`, `$h = \\dfrac{${A}}{${b}} = ${h}$`, `The height is ${len(h, c.u)}.`],
      };
    }
    const mode = rng.pick(['circR', 'circD', 'trapH', 'trapB'] as const);
    if (mode === 'circR' || mode === 'circD') {
      const ctx = rng.pick([
        { u: 'm', lo: 200, hi: 700, text: (a: string) => `A farmer floods a circular skating rink on a pond. The rink covers ${a}.`, ask: 'radius of the rink' },
        { u: 'm', lo: 30, hi: 150, text: (a: string) => `A lawn sprinkler waters a circle with an area of ${a}.`, ask: 'radius of the circle (how far the water reaches)' },
        { u: 'ft', lo: 20, hi: 80, text: (a: string) => `A circular rug has an area of ${a}.`, ask: 'radius of the rug' },
        { u: 'ft', lo: 250, hi: 1200, text: (a: string) => `The floor of a round grain bin has an area of ${a}.`, ask: 'radius of the bin floor' },
        { u: 'cm', lo: 1500, hi: 6000, text: (a: string) => `A round tabletop has an area of ${a}.`, ask: 'radius of the tabletop' },
      ]);
      const wantD = mode === 'circD';
      const A = retry(() => rng.int(ctx.lo, ctx.hi), (a) => !nearHalf((wantD ? 2 : 1) * Math.sqrt(a / Math.PI), 1));
      const r2 = A / Math.PI;
      const r = Math.sqrt(r2);
      const ans = wantD ? 2 * r : r;
      const ask = wantD ? ctx.ask.replace('radius', 'diameter').replace(' (how far the water reaches)', '') : ctx.ask;
      return {
        prompt: `${ctx.text(ar(A, ctx.u))} What is the ${ask}, ${lenRound(1, ctx.u)}?`,
        parts: [numPart(ans, { decimals: 1, suffix: ctx.u })],
        hints: ['Start with $A = \\pi r^2$ and substitute the area.', `Undo the steps in reverse order: divide both sides by $\\pi$, then take the square root.${wantD ? ' Double the radius to get the diameter.' : ''}`],
        solution: [
          '$A = \\pi r^2$',
          `$${n(A)} = \\pi r^2$`,
          `$r^2 = \\dfrac{${n(A)}}{\\pi} \\approx ${nf(r2, 2)}$`,
          `$r = \\sqrt{${nf(r2, 2)}} \\approx ${nf(r, 2)}\\ ${tx(ctx.u)}$`,
          ...(wantD ? [`$d = 2r \\approx 2 \\times ${nf(r, 2)} \\approx ${nf(ans, 1)}$`] : []),
          `The ${wantD ? 'diameter' : 'radius'} is about $${nf(ans, 1)}\\ ${tx(ctx.u)}$.`,
        ],
      };
    }
    const c = rng.pick(TRAP_CTX);
    const [a, b, h] = retry(() => intDims(rng, 'trap', c), ([x, y, z]) => ((x + y) * z) % 2 === 0);
    const A = ((a + b) * h) / 2;
    if (mode === 'trapH') {
      return {
        prompt: `A ${c.what} has an area of ${ar(A, c.u)}. Its parallel sides are ${len(a, c.u)} and ${len(b, c.u)}. What is its height (the perpendicular distance between the parallel sides)?`,
        parts: [numPart(h, { suffix: c.u })],
        hints: ['Substitute into $A = \\dfrac{a + b}{2} \\times h$ and simplify the fraction first.', 'Divide the area by the average of the parallel sides: $h = \\dfrac{2A}{a + b}$.'],
        solution: [
          '$A = \\dfrac{a + b}{2} \\times h$',
          `$${n(A)} = \\dfrac{${a} + ${b}}{2} \\times h = ${n((a + b) / 2)}h$`,
          `$h = \\dfrac{${n(A)}}{${n((a + b) / 2)}} = ${h}$`,
          `The height is ${len(h, c.u)}.`,
        ],
      };
    }
    return {
      prompt: `A ${c.what} has an area of ${ar(A, c.u)} and a height of ${len(h, c.u)}. One of its parallel sides is ${len(a, c.u)}. How long is the other parallel side?`,
      parts: [numPart(b, { suffix: c.u })],
      hints: ['Substitute into $A = \\dfrac{a + b}{2} \\times h$.', 'Multiply both sides by 2, divide by the height, then subtract the known side: $b = \\dfrac{2A}{h} - a$.'],
      solution: [
        '$A = \\dfrac{a + b}{2} \\times h$',
        `$${n(A)} = \\dfrac{${a} + b}{2} \\times ${h}$`,
        `Multiply both sides by 2: $${n(2 * A)} = (${a} + b) \\times ${h}$`,
        `Divide both sides by ${h}: $${n((2 * A) / h)} = ${a} + b$`,
        `Subtract ${a}: $b = ${n((2 * A) / h)} - ${a} = ${b}$`,
        `The other parallel side is ${len(b, c.u)}.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 5.2 — Composite and irregular shapes
// ---------------------------------------------------------------------------

const areaComposite = skill({
  id: 'm103-area-composite',
  name: 'Area of composite shapes',
  description: 'Find the area of a composite shape by splitting it into common shapes and adding or subtracting their areas.',
  outcomes: ['M4'],
  lessonId: 'm103-5-2',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      if (rng.chance(0.5)) {
        const ctx = rng.pick([
          { what: 'L-shaped kitchen floor', u: 'm', a: [2, 4], H: [4, 7], w: [2, 4] },
          { what: 'L-shaped deck', u: 'ft', a: [6, 12], H: [10, 18], w: [6, 12] },
          { what: 'L-shaped garden', u: 'm', a: [3, 6], H: [5, 10], w: [3, 7] },
          { what: 'L-shaped office floor', u: 'm', a: [3, 6], H: [6, 10], w: [3, 6] },
          { what: 'L-shaped shop floor', u: 'ft', a: [10, 20], H: [16, 30], w: [8, 16] },
        ]);
        const a = rng.int(ctx.a[0], ctx.a[1]);
        const H = rng.int(ctx.H[0], ctx.H[1]);
        const w = rng.int(ctx.w[0], ctx.w[1]);
        const c = rng.int(2, H - 2);
        const A1 = a * H;
        const A2 = w * c;
        const u = ctx.u;
        const pts: P2[] = [[0, 0], [a + w, 0], [a + w, c], [a, c], [a, H], [0, H], [0, 0]];
        return {
          prompt: `The ${ctx.what} shown is split into two rectangles by the dashed line. The left rectangle is ${len(a, u)} by ${len(H, u)}. The right rectangle is ${len(w, u)} by ${len(c, u)}. What is the total area of the ${ctx.what}?`,
          figure: planFigure([{ points: pts }], a + w, H, `${ctx.what} split into two rectangles`, [[[a, 0], [a, c]]]),
          parts: [numPart(A1 + A2, { suffix: `${u}²` })],
          hints: ['Find the area of each rectangle separately.', 'Add the two areas: $A = A_1 + A_2$.'],
          solution: [`Left rectangle: $A_1 = ${a} \\times ${H} = ${A1}\\ ${sq(u)}$`, `Right rectangle: $A_2 = ${w} \\times ${c} = ${A2}\\ ${sq(u)}$`, `Total: $${A1} + ${A2} = ${A1 + A2}$`, `The ${ctx.what} has an area of ${ar(A1 + A2, u)}.`],
          calculator: false,
        };
      }
      const ctx = rng.pick([
        { outer: 'rectangular backyard', inner: 'shed', u: 'm', W: [10, 18], H: [8, 14], iw: [2, 4], ih: [2, 4], ask: 'How much of the yard is left for grass?' },
        { outer: 'rectangular wall', inner: 'window', u: 'ft', W: [10, 16], H: [8, 9], iw: [3, 5], ih: [3, 4], ask: 'How much wall area needs paint?' },
        { outer: 'rectangular parking lot', inner: 'rectangular planter island', u: 'm', W: [20, 40], H: [15, 30], iw: [3, 8], ih: [2, 4], ask: 'What area of the lot needs to be paved?' },
        { outer: 'rectangular warehouse floor', inner: 'rectangular office', u: 'ft', W: [60, 100], H: [40, 60], iw: [10, 20], ih: [8, 15], ask: 'What floor area is left for storage?' },
      ]);
      const W = rng.int(ctx.W[0], ctx.W[1]);
      const H = rng.int(ctx.H[0], ctx.H[1]);
      const iw = rng.int(ctx.iw[0], ctx.iw[1]);
      const ih = rng.int(ctx.ih[0], ctx.ih[1]);
      const u = ctx.u;
      const x0 = Math.round((W - iw) * rng.float(0.2, 0.8, 2));
      const y0 = Math.round((H - ih) * rng.float(0.2, 0.8, 2));
      const big = W * H;
      const small = iw * ih;
      return {
        prompt: `A ${ctx.outer} is ${len(W, u)} by ${len(H, u)}. A ${ctx.inner} that is ${len(iw, u)} by ${len(ih, u)} sits inside it. ${ctx.ask}`,
        figure: planFigure([{ points: rectPts(0, 0, W, H) }, { points: rectPts(x0, y0, iw, ih), color: 'accent' }], W, H, `${ctx.outer} with a ${ctx.inner}`),
        parts: [numPart(big - small, { suffix: `${u}²` })],
        hints: ['Find the area of the whole rectangle, then take away the part that is not included.', '$A = A_{\\text{large}} - A_{\\text{small}}$'],
        solution: [`Large rectangle: $${W} \\times ${H} = ${n(big)}\\ ${sq(u)}$`, `${cap(ctx.inner)}: $${iw} \\times ${ih} = ${small}\\ ${sq(u)}$`, `Subtract: $${n(big)} - ${small} = ${n(big - small)}$`, `The area is ${ar(big - small, u)}.`],
        calculator: false,
      };
    }
    if (d === 2) {
      const mode = rng.pick(['Lsides', 'gable', 'window', 'counter', 'wall'] as const);
      if (mode === 'Lsides') {
        const ctx = rng.pick([
          { what: 'L-shaped basement floor', u: 'ft' },
          { what: 'L-shaped concrete slab', u: 'm' },
          { what: 'L-shaped lawn', u: 'm' },
          { what: 'L-shaped garage floor', u: 'ft' },
        ]);
        const sc = ctx.u === 'ft' ? 2 : 1;
        const W = sc * rng.int(8, 12);
        const H = sc * rng.int(5, Math.floor(W / sc) - 1);
        const w2 = sc * rng.int(2, Math.floor(W / sc) - 3);
        const h2 = sc * rng.int(2, Math.floor(H / sc) - 2);
        const u = ctx.u;
        const pts: P2[] = [[0, 0], [W, 0], [W, H - h2], [W - w2, H - h2], [W - w2, H], [0, H], [0, 0]];
        const big = W * H;
        const cut = w2 * h2;
        return {
          prompt: `The ${ctx.what} shown is ${len(W, u)} long and ${len(H, u)} wide overall. A corner piece that is ${len(w2, u)} by ${len(h2, u)} is missing, as shown. What is the area of the ${ctx.what}?`,
          figure: planFigure([{ points: pts }], W, H, ctx.what),
          parts: [numPart(big - cut, { suffix: `${u}²` })],
          hints: ['Imagine the corner is filled in to make one big rectangle.', 'Find the area of the big rectangle, then subtract the area of the missing corner.'],
          solution: [
            `Big rectangle: $${W} \\times ${H} = ${n(big)}\\ ${sq(u)}$`,
            `Missing corner: $${w2} \\times ${h2} = ${cut}\\ ${sq(u)}$`,
            `$${n(big)} - ${cut} = ${n(big - cut)}$ (splitting into two rectangles and adding gives the same answer)`,
            `The ${ctx.what} has an area of ${ar(big - cut, u)}.`,
          ],
        };
      }
      if (mode === 'gable') {
        const bld = rng.pick(['shed', 'garage', 'barn', 'chicken coop']);
        const w = 2 * rng.int(4, 9);
        const h = rng.int(7, 10);
        const t = rng.int(3, 6);
        const rect = w * h;
        const tri = (w * t) / 2;
        const pts: P2[] = [[0, 0], [w, 0], [w, h], [w / 2, h + t], [0, h], [0, 0]];
        return {
          prompt: `${name} is buying siding for the end wall of a ${bld}. The wall is a rectangle with a triangle on top. It is ${len(w, 'ft')} wide, the rectangular part is ${len(h, 'ft')} tall, and the peak is ${len(t, 'ft')} above the top of the rectangle. What is the area of the end wall? (Ignore any door.)`,
          figure: planFigure([{ points: pts }], w, h + t, `end wall of a ${bld}`, [[[0, h], [w, h]]]),
          parts: [numPart(rect + tri, { suffix: 'ft²' })],
          hints: ['Split the wall into a rectangle and a triangle.', 'Rectangle: $A = lw$. Triangle: $A = \\tfrac{1}{2}bh$, where the base is the width of the wall.'],
          solution: [`Rectangle: $${w} \\times ${h} = ${rect}\\ ${sq('ft')}$`, `Triangle: $\\tfrac{1}{2} \\times ${w} \\times ${t} = ${n(tri)}\\ ${sq('ft')}$`, `Total: $${rect} + ${n(tri)} = ${n(rect + tri)}$`, `The end wall has an area of ${ar(rect + tri, 'ft')}.`],
        };
      }
      if (mode === 'window') {
        const u = rng.pick(['in', 'cm']);
        const [w, h] = retry(
          () => (u === 'in' ? [2 * rng.int(12, 24), rng.int(30, 60)] : [10 * rng.int(6, 12), 10 * rng.int(8, 15)]),
          ([x, y]) => !nearHalf(x * y + (Math.PI * (x / 2) ** 2) / 2, 1),
        );
        const r = w / 2;
        const rect = w * h;
        const semi = (Math.PI * r * r) / 2;
        const A = rect + semi;
        const pts: P2[] = [[0, 0], [w, 0], ...arcPts(w / 2, h, r, 0, Math.PI), [0, 0]];
        return {
          prompt: `A window is a rectangle with a semicircle on top. The window is ${len(w, u)} wide and the rectangular part is ${len(h, u)} tall. What is the area of the glass, ${sqRound(1, u)}?`,
          figure: planFigure([{ points: pts }], w, h + r, 'window with a semicircular top', [[[0, h], [w, h]]]),
          parts: [numPart(A, { decimals: 1, suffix: `${u}²` })],
          hints: ['Split the window into a rectangle and a semicircle. The width of the window is the diameter of the semicircle.', 'Rectangle: $A = lw$. Semicircle: $A = \\tfrac{1}{2}\\pi r^2$ with $r = \\text{width} \\div 2$.'],
          solution: [
            `Rectangle: $${w} \\times ${h} = ${n(rect)}\\ ${sq(u)}$`,
            `Semicircle: $r = ${w} \\div 2 = ${n(r)}$, so $A = \\tfrac{1}{2}\\pi (${n(r)})^2 \\approx ${nf(semi, 2)}\\ ${sq(u)}$`,
            `Total: $${n(rect)} + ${nf(semi, 2)} \\approx ${nf(A, 1)}$`,
            `The glass has an area of about ${arR(A, u, 1)}.`,
          ],
        };
      }
      if (mode === 'counter') {
        const L = 10 * rng.int(18, 30);
        const D = rng.pick([60, 63, 64, 65]);
        const sw = rng.int(70, 85);
        const sd = rng.int(42, 50);
        const big = L * D;
        const sink = sw * sd;
        const x0 = Math.round((L - sw) * rng.float(0.3, 0.7, 2));
        const y0 = Math.round((D - sd) / 2);
        return {
          prompt: `A kitchen countertop is ${len(L, 'cm')} long and ${len(D, 'cm')} deep. A rectangular hole ${len(sw, 'cm')} by ${len(sd, 'cm')} is cut out for the sink. What area of countertop is left?`,
          figure: planFigure([{ points: rectPts(0, 0, L, D) }, { points: rectPts(x0, y0, sw, sd), color: 'accent' }], L, D, 'countertop with a sink cut-out'),
          parts: [numPart(big - sink, { suffix: 'cm²' })],
          hints: ['The cut-out is not part of the countertop.', 'Subtract the area of the sink hole from the area of the whole countertop.'],
          solution: [`Whole countertop: $${L} \\times ${D} = ${n(big)}\\ ${sq('cm')}$`, `Sink hole: $${sw} \\times ${sd} = ${n(sink)}\\ ${sq('cm')}$`, `$${n(big)} - ${n(sink)} = ${n(big - sink)}$`, `The countertop has an area of ${ar(big - sink, 'cm')}.`],
        };
      }
      const L = rng.int(12, 20);
      const H = rng.pick([8, 9, 10]);
      const ww = rng.int(3, 6);
      const wh = rng.int(3, 4);
      const wall = L * H;
      const door = 3 * 7;
      const win = ww * wh;
      const A = wall - door - win;
      const dx = 1;
      const wx = rng.int(5, L - ww - 1);
      return {
        prompt: `${name} is painting one wall of a garage. The wall is ${len(L, 'ft')} long and ${len(H, 'ft')} high. It has a door that is ${len(3, 'ft')} by ${len(7, 'ft')} and a window that is ${len(ww, 'ft')} by ${len(wh, 'ft')}. What area needs to be painted?`,
        figure: planFigure(
          [{ points: rectPts(0, 0, L, H) }, { points: rectPts(dx, 0, 3, 7), color: 'accent' }, { points: rectPts(wx, H - wh - 1.5, ww, wh), color: 'accent' }],
          L,
          H,
          'wall with a door and a window',
        ),
        parts: [numPart(A, { suffix: 'ft²' })],
        hints: ['The door and the window do not get painted.', 'Find the area of the whole wall, then subtract the door and the window.'],
        solution: [`Whole wall: $${L} \\times ${H} = ${wall}\\ ${sq('ft')}$`, `Door: $3 \\times 7 = ${door}\\ ${sq('ft')}$; window: $${ww} \\times ${wh} = ${win}\\ ${sq('ft')}$`, `$${wall} - ${door} - ${win} = ${A}$`, `${name} needs to paint ${ar(A, 'ft')}.`],
      };
    }
    // d === 3
    const mode = rng.pick(['hole', 'track', 'border', 'Lmissing'] as const);
    if (mode === 'hole') {
      const ctx = rng.pick([
        { lead: 'A rectangular deck', hole: 'a round hole for a hot tub', u: 'ft', W: [14, 20], H: [10, 14], d: [6, 8], left: 'deck surface' },
        { lead: 'A rectangular steel plate', hole: 'a circular hole for a pipe', u: 'cm', W: [30, 60], H: [25, 40], d: [6, 16], left: 'steel' },
        { lead: 'A rectangular concrete patio', hole: 'a circular opening for a fire pit', u: 'm', W: [5, 8], H: [4, 6], d: [1, 2], left: 'concrete' },
        { lead: 'A rectangular piece of plywood for a workbench top', hole: 'a circular hole for a sink', u: 'in', W: [36, 60], H: [24, 30], d: [10, 16], left: 'plywood' },
      ]);
      const [W, H, dia] = retry(
        () => [rng.int(ctx.W[0], ctx.W[1]), rng.int(ctx.H[0], ctx.H[1]), rng.int(ctx.d[0], ctx.d[1])],
        ([x, y, z]) => !nearHalf(x * y - (Math.PI * z * z) / 4, 1),
      );
      const u = ctx.u;
      const r = dia / 2;
      const big = W * H;
      const circ = Math.PI * r * r;
      const A = big - circ;
      const cx = Math.max(r + 0.5, Math.min(W - r - 0.5, W * rng.float(0.35, 0.65, 2)));
      return {
        prompt: `${ctx.lead} is ${len(W, u)} by ${len(H, u)}. It has ${ctx.hole} with a diameter of ${len(dia, u)}. What area of ${ctx.left} is left, ${sqRound(1, u)}?`,
        figure: planFigure([{ points: rectPts(0, 0, W, H) }, { points: circlePts(cx, H / 2, r), color: 'accent' }], W, H, `${ctx.left} with a circular hole`),
        parts: [numPart(A, { decimals: 1, suffix: `${u}²` })],
        hints: ['Subtract the area of the hole from the area of the rectangle.', 'Hole: $A = \\pi r^2$, with the radius equal to half the diameter.'],
        solution: [
          `Rectangle: $${W} \\times ${H} = ${n(big)}\\ ${sq(u)}$`,
          `Hole: $r = ${dia} \\div 2 = ${n(r)}$, so $A = \\pi (${n(r)})^2 \\approx ${nf(circ, 2)}\\ ${sq(u)}$`,
          `$${n(big)} - ${nf(circ, 2)} \\approx ${nf(A, 1)}$`,
          `About ${arR(A, u, 1)} of ${ctx.left} is left.`,
        ],
      };
    }
    if (mode === 'track') {
      const ctx = rng.pick([
        { what: 'The infield of a running track', u: 'm', L: [60, 90], W: [40, 64] },
        { what: 'A boardroom table', u: 'cm', L: [180, 300], W: [90, 120] },
        { what: 'An outdoor skating oval', u: 'ft', L: [60, 120], W: [30, 50] },
        { what: 'A swimming pool', u: 'm', L: [8, 14], W: [4, 7] },
      ]);
      const [L, W] = retry(
        () => [rng.int(ctx.L[0], ctx.L[1]), 2 * rng.int(Math.ceil(ctx.W[0] / 2), Math.floor(ctx.W[1] / 2))],
        ([x, y]) => !nearHalf(x * y + Math.PI * (y / 2) ** 2, 1),
      );
      const u = ctx.u;
      const r = W / 2;
      const rect = L * W;
      const circ = Math.PI * r * r;
      const A = rect + circ;
      const pts: P2[] = [[r, 0], [r + L, 0], ...arcPts(r + L, r, r, -Math.PI / 2, Math.PI / 2), [r, W], ...arcPts(r, r, r, Math.PI / 2, (3 * Math.PI) / 2)];
      return {
        prompt: `${ctx.what} is a rectangle with a semicircle at each end. The straight sides are ${len(L, u)} long and the shape is ${len(W, u)} wide. What is its area, ${sqRound(1, u)}?`,
        figure: planFigure([{ points: pts }], L + W, W, 'rectangle with semicircular ends', [[[r, 0], [r, W]], [[r + L, 0], [r + L, W]]]),
        parts: [numPart(A, { decimals: 1, suffix: `${u}²` })],
        hints: ['The two semicircles together make one full circle. Its diameter is the width of the shape.', 'Area = rectangle + one full circle $= lw + \\pi r^2$.'],
        solution: [
          `Rectangle: $${L} \\times ${W} = ${n(rect)}\\ ${sq(u)}$`,
          `Two semicircles make one circle with $r = ${W} \\div 2 = ${n(r)}$: $\\pi (${n(r)})^2 \\approx ${nf(circ, 2)}\\ ${sq(u)}$`,
          `Total: $${n(rect)} + ${nf(circ, 2)} \\approx ${nf(A, 1)}$`,
          `The area is about ${arR(A, u, 1)}.`,
        ],
      };
    }
    if (mode === 'border') {
      const ctx = rng.pick([
        { inner: 'swimming pool', border: 'concrete walkway', u: 'm', a: [6, 12], b: [3, 6], k: [1, 1.5, 2] },
        { inner: 'rectangular garden', border: 'gravel path', u: 'ft', a: [10, 20], b: [6, 12], k: [2, 3, 4] },
        { inner: 'photo', border: 'wooden frame', u: 'in', a: [8, 20], b: [6, 14], k: [1.5, 2, 2.5] },
        { inner: 'hockey rink surface', border: 'rubber walkway', u: 'm', a: [40, 60], b: [20, 30], k: [1.5, 2, 3] },
      ]);
      const a = rng.int(ctx.a[0], ctx.a[1]);
      const b = rng.intExcept(ctx.b[0], ctx.b[1], [a]);
      const k = rng.pick(ctx.k);
      const u = ctx.u;
      const oa = a + 2 * k;
      const ob = b + 2 * k;
      const outer = oa * ob;
      const inner = a * b;
      const A = exact(outer - inner);
      return {
        prompt: `A ${ctx.inner} is ${len(a, u)} by ${len(b, u)}. A ${ctx.border} that is ${len(k, u)} wide goes all the way around it. What is the area of the ${ctx.border}?`,
        figure: planFigure([{ points: rectPts(0, 0, oa, ob) }, { points: rectPts(k, k, a, b), color: 'accent' }], oa, ob, `${ctx.inner} with a ${ctx.border} around it`),
        parts: [numPart(A, { suffix: `${u}²` })],
        hints: [`The outside edge of the ${ctx.border} is longer than the ${ctx.inner} on both ends of each side.`, `Outer length $= ${a} + 2(${n(k)})$. Find the outer area, then subtract the area of the ${ctx.inner}.`],
        solution: [
          `Outer rectangle: $${a} + 2(${n(k)}) = ${n(oa)}$ by $${b} + 2(${n(k)}) = ${n(ob)}$`,
          `Outer area: $${n(oa)} \\times ${n(ob)} = ${n(exact(outer))}\\ ${sq(u)}$`,
          `${cap(ctx.inner)}: $${a} \\times ${b} = ${n(inner)}\\ ${sq(u)}$`,
          `$${n(exact(outer))} - ${n(inner)} = ${n(A)}$`,
          `The ${ctx.border} has an area of ${ar(A, u)}.`,
        ],
      };
    }
    // Lmissing: only four outside lengths are given
    const ctx = rng.pick([
      { what: 'L-shaped deck', u: 'ft', sc: 2 },
      { what: 'L-shaped room', u: 'm', sc: 1 },
      { what: 'L-shaped parking area', u: 'm', sc: 5 },
      { what: 'L-shaped feedlot pen', u: 'm', sc: 5 },
    ]);
    const sc = ctx.sc;
    const W = sc * rng.int(7, 12);
    const H = sc * rng.int(6, 10);
    const a = sc * rng.int(3, W / sc - 2);
    const c = sc * rng.int(2, H / sc - 2);
    const u = ctx.u;
    const pts: P2[] = [[0, 0], [W, 0], [W, c], [a, c], [a, H], [0, H], [0, 0]];
    const A1 = a * H;
    const A2 = (W - a) * c;
    return {
      prompt: `An ${ctx.what} is shown. The bottom edge is ${len(W, u)}, the left edge is ${len(H, u)}, the top edge is ${len(a, u)}, and the short right edge is ${len(c, u)}. What is the area of the ${ctx.what}?`,
      figure: planFigure([{ points: pts }], W, H, ctx.what),
      parts: [numPart(A1 + A2, { suffix: `${u}²` })],
      hints: ['Draw a line to split the shape into two rectangles. Some side lengths are not given, so work them out from the ones that are.', `Split straight down from the end of the top edge: the left rectangle is $${n(a)}$ by $${n(H)}$, and the right rectangle is $(${n(W)} - ${n(a)})$ by $${n(c)}$.`],
      solution: [
        `Split the shape with a vertical line. Left rectangle: $${a} \\times ${H} = ${n(A1)}\\ ${sq(u)}$`,
        `Width of the right rectangle: $${W} - ${a} = ${W - a}$, so its area is $${W - a} \\times ${c} = ${n(A2)}\\ ${sq(u)}$`,
        `Total: $${n(A1)} + ${n(A2)} = ${n(A1 + A2)}$`,
        `The ${ctx.what} has an area of ${ar(A1 + A2, u)}.`,
      ],
    };
  },
});

// ----- Irregular shapes -----

const BLOB_SMALL = [
  { thing: 'a patch of dead grass on a lawn', u: 'm' },
  { thing: 'an oil spill on a shop floor', u: 'ft' },
  { thing: 'a puddle in a parking lot', u: 'm' },
  { thing: 'a patch of hail damage on a roof', u: 'ft' },
  { thing: 'a flower bed in a park', u: 'm' },
  { thing: 'a slough (a small pond) in a pasture', u: 'm' },
];
const BLOB_BIG = [
  { thing: 'a pond on a ranch', u: 'm', scales: [2, 5] },
  { thing: 'a wetland on a farm', u: 'm', scales: [5, 10] },
  { thing: 'a gravel pit', u: 'm', scales: [5, 10] },
  { thing: 'a clearing in a forest', u: 'ft', scales: [10, 20] },
  { thing: 'a hay meadow', u: 'm', scales: [10, 20] },
  { thing: 'a backyard skating rink', u: 'ft', scales: [2, 5] },
];

function blobItem(rng: Rng, d: 1 | 2 | 3): GenOutput {
  const big = d === 3;
  const c = big ? rng.pick(BLOB_BIG) : { ...rng.pick(BLOB_SMALL), scales: [1] };
  const s = rng.pick(c.scales);
  const [cols, rows] = d === 1 ? [rng.int(7, 8), rng.int(6, 7)] : [rng.int(9, 11), rng.int(7, 9)];
  const poly = blob(rng, cols, rows);
  const { full, partial } = countCells(poly, cols, rows);
  const E = full + partial / 2;
  const T = polyArea(poly);
  const slack = Math.max(1, 0.08 * E);
  const lo = Math.floor(Math.min(E, T) - slack);
  const hi = Math.ceil(Math.max(E, T) + slack);
  const k = s * s;
  const u = c.u;
  const fig: PlaneFigure = {
    type: 'plane',
    grid: { xMin: 0, xMax: cols * s, yMin: 0, yMax: rows * s, step: s },
    polylines: [{ points: [...poly, poly[0]].map(([x, y]) => [r3(x * s), r3(y * s)] as P2) }],
    caption: `${c.thing} drawn on a grid`,
  };
  const scale = s === 1 ? `Each grid square represents $1\\ ${sq(u)}$.` : `Each grid square is $${s}\\ ${tx(u)}$ by $${s}\\ ${tx(u)}$.`;
  const method = d === 1 ? ' Count the full squares, then add about half of the squares that are only partly covered.' : '';
  return {
    prompt: `The figure shows ${c.thing}, drawn on a grid. ${scale} Estimate the area of the shape in ${sqName(u)}.${method}`,
    figure: fig,
    parts: [numPart(((lo + hi) / 2) * k, { suffix: `${u}²`, tolerance: ((hi - lo) / 2) * k })],
    hints: [
      'Count the squares that are completely inside the shape. Then count the squares that are only partly inside.',
      s === 1
        ? 'Partly covered squares are about half full on average: estimate = full squares + (partial squares ÷ 2).'
        : `Estimate the number of squares (full + half of the partial ones), then multiply by the area of one square: $${s} \\times ${s} = ${k}\\ ${sq(u)}$.`,
    ],
    solution: [
      `Full squares: about $${full}$. Partly covered squares: about $${partial}$.`,
      `Estimate: $${full} + ${partial} \\div 2 = ${n(E)}$ squares.`,
      ...(s === 1 ? [] : [`Each square is $${s} \\times ${s} = ${k}\\ ${sq(u)}$, so the area is about $${n(E)} \\times ${k} = ${n(E * k)}\\ ${sq(u)}$.`]),
      `Counts differ a little from person to person, so any estimate from $${n(lo * k)}$ to $${n(hi * k)}\\ ${sq(u)}$ is accepted. (The actual area of this shape is about $${nf(T * k, 0)}\\ ${sq(u)}$.)`,
      `The area is about ${ar(E * k, u)}.`,
    ],
    answerDisplay: `about ${ar(E * k, u)} (any estimate from $${n(lo * k)}$ to $${n(hi * k)}\\ ${sq(u)}$)`,
    calculator: s > 1,
  };
}

function lotItem(rng: Rng, d: 2 | 3): GenOutput {
  const s = d === 2 ? 1 : rng.pick([2, 5, 10]);
  const c = d === 2 ? rng.pick([{ thing: 'a patio', u: 'm' }, { thing: 'a garden bed', u: 'ft' }, { thing: 'a deck', u: 'ft' }, { thing: 'a play area', u: 'm' }]) : rng.pick([{ thing: 'a pasture', u: 'm' }, { thing: 'a building lot', u: 'm' }, { thing: 'a parking lot', u: 'm' }, { thing: 'a farmyard', u: 'ft' }]);
  const u = c.u;
  const the = c.thing.replace(/^a /, 'the ');
  const kind = rng.pick(['slant', 'point', 'cut', 'gable'] as const);
  const a = rng.int(4, 8);
  const b = rng.int(3, 6);
  const S = (x: number) => n(x * s);
  const unit = `\\ ${tx(u)}`;
  const area2 = `\\ ${sq(u)}`;
  let pts: P2[];
  let steps: string[];
  let A: number;
  let W = a;
  let H = b;
  if (kind === 'slant') {
    const t = rng.int(1, 4);
    pts = [[0, 0], [a, 0], [a, b], [0, b + t]];
    const r = a * b * s * s;
    const tr = (a * t * s * s) / 2;
    A = r + tr;
    H = b + t;
    steps = [
      `Split the shape with a horizontal line across the top of the shorter side: a rectangle below and a right triangle on top.`,
      `Rectangle: $${S(a)} \\times ${S(b)} = ${n(r)}${area2}$`,
      `Triangle: base $${S(a)}${unit}$ and height $${S(t)}${unit}$, so $\\tfrac{1}{2} \\times ${S(a)} \\times ${S(t)} = ${n(tr)}${area2}$`,
      `Total: $${n(r)} + ${n(tr)} = ${n(A)}$`,
    ];
  } else if (kind === 'point') {
    const cc = rng.int(1, 3);
    const p = rng.int(1, b - 1);
    pts = [[0, 0], [a, 0], [a + cc, p], [a, b], [0, b]];
    const r = a * b * s * s;
    const tr = (b * cc * s * s) / 2;
    A = r + tr;
    W = a + cc;
    steps = [
      `Split the shape with a vertical line: a rectangle on the left and a triangle on the right.`,
      `Rectangle: $${S(a)} \\times ${S(b)} = ${n(r)}${area2}$`,
      `Triangle: its base is the vertical side, $${S(b)}${unit}$, and its height is $${S(cc)}${unit}$, so $\\tfrac{1}{2} \\times ${S(b)} \\times ${S(cc)} = ${n(tr)}${area2}$`,
      `Total: $${n(r)} + ${n(tr)} = ${n(A)}$`,
    ];
  } else if (kind === 'cut') {
    const cc = rng.int(1, b - 1);
    const e = rng.int(1, a - 1);
    pts = [[0, 0], [a, 0], [a, b - cc], [a - e, b], [0, b]];
    const r = a * b * s * s;
    const tr = (cc * e * s * s) / 2;
    A = r - tr;
    steps = [
      `Fill in the cut corner to make a rectangle, then subtract the triangle that is missing.`,
      `Full rectangle: $${S(a)} \\times ${S(b)} = ${n(r)}${area2}$`,
      `Missing triangle: legs $${S(e)}${unit}$ and $${S(cc)}${unit}$, so $\\tfrac{1}{2} \\times ${S(e)} \\times ${S(cc)} = ${n(tr)}${area2}$`,
      `Area: $${n(r)} - ${n(tr)} = ${n(A)}$`,
    ];
  } else {
    const t = rng.int(1, 3);
    const k = rng.int(1, a - 1);
    pts = [[0, 0], [a, 0], [a, b], [k, b + t], [0, b]];
    const r = a * b * s * s;
    const tr = (a * t * s * s) / 2;
    A = r + tr;
    H = b + t;
    steps = [
      `Split the shape with a horizontal line: a rectangle below and a triangle on top.`,
      `Rectangle: $${S(a)} \\times ${S(b)} = ${n(r)}${area2}$`,
      `Triangle: base $${S(a)}${unit}$ and height $${S(t)}${unit}$, so $\\tfrac{1}{2} \\times ${S(a)} \\times ${S(t)} = ${n(tr)}${area2}$`,
      `Total: $${n(r)} + ${n(tr)} = ${n(A)}$`,
    ];
  }
  const fig: PlaneFigure = {
    type: 'plane',
    grid: { xMin: 0, xMax: (W + 2) * s, yMin: 0, yMax: (H + 2) * s, step: s },
    polylines: [{ points: [...pts, pts[0]].map(([x, y]) => [(x + 1) * s, (y + 1) * s] as P2) }],
    caption: `plan of ${c.thing} on a grid`,
  };
  return {
    prompt: `The plan of ${c.thing} is drawn on a grid. Each grid square is $${s}\\ ${tx(u)}$ by $${s}\\ ${tx(u)}$. Find the area of ${the} by splitting it into rectangles and triangles.`,
    figure: fig,
    parts: [numPart(A, { suffix: `${u}²` })],
    hints: [
      'Look for a rectangle you can draw inside the shape (or around it). What is left over is a right triangle.',
      s === 1 ? 'Count squares to find each length. Rectangle: $A = lw$. Triangle: $A = \\tfrac{1}{2}bh$.' : `Count squares to find each length, then multiply by $${s}$ to get ${UNIT[u].many}. Rectangle: $A = lw$. Triangle: $A = \\tfrac{1}{2}bh$.`,
    ],
    solution: [...(s === 1 ? [] : [`Each square is $${s}${unit}$ long, so multiply each count of squares by $${s}$.`]), ...steps, `The area of ${the} is ${ar(A, u)}.`],
    calculator: s > 1,
  };
}

const areaIrregular = skill({
  id: 'm103-area-irregular',
  name: 'Estimating the area of irregular shapes',
  description: 'Estimate the area of an irregular shape by counting grid squares, or find it by splitting it into rectangles and triangles.',
  outcomes: ['M4'],
  lessonId: 'm103-5-2',
  gen(rng, d) {
    if (d === 1) return blobItem(rng, 1);
    if (d === 2) return rng.chance(0.6) ? blobItem(rng, 2) : lotItem(rng, 2);
    return rng.chance(0.5) ? blobItem(rng, 3) : lotItem(rng, 3);
  },
});

// ---------------------------------------------------------------------------
// Lesson 5.3 — Surface area
// ---------------------------------------------------------------------------

function prismSteps(l: number, w: number, h: number, u: string) {
  const top = exact(2 * l * w);
  const front = exact(2 * l * h);
  const side = exact(2 * w * h);
  const SA = exact(top + front + side);
  return {
    SA,
    steps: [
      `Top and bottom: $2 \\times ${n(l)} \\times ${n(w)} = ${n(top)}\\ ${sq(u)}$`,
      `Front and back: $2 \\times ${n(l)} \\times ${n(h)} = ${n(front)}\\ ${sq(u)}$`,
      `Two ends: $2 \\times ${n(w)} \\times ${n(h)} = ${n(side)}\\ ${sq(u)}$`,
      `$SA = ${n(top)} + ${n(front)} + ${n(side)} = ${n(SA)}$`,
    ],
  };
}

const saPrism = skill({
  id: 'm103-sa-prism',
  name: 'Surface area of rectangular prisms',
  description: 'Calculate the surface area of boxes and rooms, including only the faces a job needs.',
  outcomes: ['M4'],
  lessonId: 'm103-5-3',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    const prismHints = ['A rectangular prism has 6 faces that come in 3 matching pairs: top and bottom, front and back, and the two ends.', '$SA = 2lw + 2lh + 2wh$'];
    if (d === 1) {
      if (rng.chance(0.3)) {
        const c = rng.pick([
          { thing: 'closed cube-shaped storage box', u: 'cm', lo: 20, hi: 50 },
          { thing: 'cube-shaped block of ice for an ice sculpture', u: 'in', lo: 10, hi: 24 },
          { thing: 'closed cube-shaped wooden crate', u: 'ft', lo: 2, hi: 6 },
          { thing: 'cube-shaped concrete block', u: 'cm', lo: 10, hi: 40 },
        ]);
        const s = rng.int(c.lo, c.hi);
        const SA = 6 * s * s;
        return {
          prompt: `A ${c.thing} has edges that are ${len(s, c.u)} long. What is its surface area?`,
          figure: { type: 'solid', shape: 'cube', labels: { l: `${s} ${c.u}` } },
          parts: [numPart(SA, { suffix: `${c.u}²` })],
          hints: ['A cube has 6 faces, and every face is the same square.', 'Find the area of one square face, then multiply by 6.'],
          solution: [`One face: $${s} \\times ${s} = ${n(s * s)}\\ ${sq(c.u)}$`, `Six faces: $6 \\times ${n(s * s)} = ${n(SA)}$`, `The surface area is ${ar(SA, c.u)}.`],
        };
      }
      const c = rng.pick([
        { thing: 'closed wooden crate', u: 'm', lo: 1, hi: 4 },
        { thing: 'cardboard shipping box', u: 'cm', lo: 15, hi: 60 },
        { thing: 'steel toolbox', u: 'in', lo: 6, hi: 22 },
        { thing: 'closed storage chest', u: 'ft', lo: 2, hi: 5 },
        { thing: 'closed insulated cooler', u: 'in', lo: 12, hi: 30 },
      ]);
      const l = rng.int(c.lo, c.hi);
      const w = rng.intExcept(c.lo, c.hi, [l]);
      const h = rng.int(c.lo, c.hi);
      const { SA, steps } = prismSteps(Math.max(l, w), Math.min(l, w), h, c.u);
      return {
        prompt: `A ${c.thing} is ${len(Math.max(l, w), c.u)} long, ${len(Math.min(l, w), c.u)} wide and ${len(h, c.u)} high. What is its total surface area?`,
        figure: prismFig(Math.max(l, w), Math.min(l, w), h, c.u),
        parts: [numPart(SA, { suffix: `${c.u}²` })],
        hints: prismHints,
        solution: [...steps, `The surface area is ${ar(SA, c.u)}.`],
      };
    }
    if (d === 2) {
      const c = rng.pick([
        { lead: (s: string) => `${name} is building a closed wooden shipping crate that is ${s}. How much plywood is needed to cover all six faces?`, u: 'm', lo: 4, hi: 25, step: 10 },
        { lead: (s: string) => `A sheet-metal shop is making a closed box for a furnace duct that is ${s}. How much sheet metal is needed? (Ignore overlaps.)`, u: 'ft', lo: 2, hi: 12, step: 2 },
        { lead: (s: string) => `${name} wants to wrap a gift box that is ${s} with no overlap. How much wrapping paper covers the box exactly?`, u: 'cm', lo: 100, hi: 450, step: 10 },
        { lead: (s: string) => `Every face of a wooden toy chest that is ${s} gets one coat of stain. What area is stained?`, u: 'in', lo: 24, hi: 72, step: 2 },
      ]);
      const [l, w, h] = retry(
        () => [rng.int(c.lo, c.hi) / c.step, rng.int(c.lo, c.hi) / c.step, rng.int(c.lo, c.hi) / c.step],
        (ds) => ds.some((x) => x % 1 !== 0) && ds[0] !== ds[1],
      );
      const L = Math.max(l, w);
      const W = Math.min(l, w);
      const { SA, steps } = prismSteps(L, W, h, c.u);
      const sizes = `${len(L, c.u)} long, ${len(W, c.u)} wide and ${len(h, c.u)} high`;
      return {
        prompt: c.lead(sizes),
        figure: prismFig(L, W, h, c.u),
        parts: [numPart(SA, { suffix: `${c.u}²` })],
        hints: prismHints,
        solution: [...steps, `The surface area is ${ar(SA, c.u)}.`],
      };
    }
    const mode = rng.pick(['openTop', 'room', 'sides'] as const);
    if (mode === 'openTop') {
      const c = rng.pick([
        { thing: 'an open-top planter box', u: 'in', lo: 12, hi: 48, what: 'cedar boards' },
        { thing: 'a glass aquarium with no lid', u: 'cm', lo: 30, hi: 100, what: 'glass' },
        { thing: 'a metal water trough with no top', u: 'ft', lo: 2, hi: 8, what: 'sheet metal' },
        { thing: 'an open-top storage bin', u: 'cm', lo: 25, hi: 70, what: 'plastic' },
      ]);
      const l = rng.int(c.lo, c.hi);
      const w = rng.intExcept(c.lo, c.hi, [l]);
      const h = rng.int(Math.ceil(c.lo * 0.7), c.hi);
      const L = Math.max(l, w);
      const W = Math.min(l, w);
      const bottom = L * W;
      const fb = 2 * L * h;
      const ends = 2 * W * h;
      const SA = bottom + fb + ends;
      return {
        prompt: `${name} is building ${c.thing}. It is ${len(L, c.u)} long, ${len(W, c.u)} wide and ${len(h, c.u)} high. How much ${c.what} is needed for the outside faces? (Ignore the thickness and any overlap.)`,
        figure: prismFig(L, W, h, c.u),
        parts: [numPart(SA, { suffix: `${c.u}²` })],
        hints: ['With no top, the box has only 5 faces: the bottom and four sides.', 'Add the bottom ($lw$), the front and back ($2lh$) and the two ends ($2wh$).'],
        solution: [
          `Bottom only (no top): $${L} \\times ${W} = ${n(bottom)}\\ ${sq(c.u)}$`,
          `Front and back: $2 \\times ${L} \\times ${h} = ${n(fb)}\\ ${sq(c.u)}$`,
          `Two ends: $2 \\times ${W} \\times ${h} = ${n(ends)}\\ ${sq(c.u)}$`,
          `$SA = ${n(bottom)} + ${n(fb)} + ${n(ends)} = ${n(SA)}$`,
          `${name} needs ${ar(SA, c.u)} of ${c.what}.`,
        ],
      };
    }
    if (mode === 'room') {
      const L = rng.int(10, 16);
      const W = rng.intExcept(9, 14, [L]);
      const H = rng.pick([8, 9]);
      const ww = rng.int(3, 5);
      const wh = rng.int(3, 4);
      const ceiling = rng.chance(0.4);
      const walls = 2 * (L + W) * H;
      const door = 21;
      const win = ww * wh;
      const ceil = ceiling ? L * W : 0;
      const A = walls - door - win + ceil;
      return {
        prompt: `${name} is painting a bedroom that is ${len(L, 'ft')} long, ${len(W, 'ft')} wide and ${len(H, 'ft')} high. The room has one door that is ${len(3, 'ft')} by ${len(7, 'ft')} and one window that is ${len(ww, 'ft')} by ${len(wh, 'ft')}. ${ceiling ? 'The four walls and the ceiling will be painted, but not the floor.' : 'Only the four walls will be painted.'} What area will be painted?`,
        figure: prismFig(L, W, H, 'ft'),
        parts: [numPart(A, { suffix: 'ft²' })],
        hints: [`List the surfaces that get paint: ${ceiling ? 'four walls and the ceiling' : 'only the four walls'}. The door and window are not painted.`, 'Walls: $2lh + 2wh$. Then subtract the door ($3 \\times 7$) and the window.'],
        solution: [
          `Long walls: $2 \\times ${L} \\times ${H} = ${2 * L * H}\\ ${sq('ft')}$; short walls: $2 \\times ${W} \\times ${H} = ${2 * W * H}\\ ${sq('ft')}$`,
          `All four walls: $${2 * L * H} + ${2 * W * H} = ${walls}\\ ${sq('ft')}$`,
          `Subtract the door ($3 \\times 7 = 21$) and the window ($${ww} \\times ${wh} = ${win}$): $${walls} - 21 - ${win} = ${walls - door - win}\\ ${sq('ft')}$`,
          ...(ceiling ? [`Add the ceiling: $${L} \\times ${W} = ${ceil}$, so $${walls - door - win} + ${ceil} = ${A}$`] : []),
          `${name} will paint ${ar(A, 'ft')}.`,
        ],
      };
    }
    const l = rng.int(4, 12);
    const w = rng.int(3, Math.min(8, l));
    const h = rng.pick([1, 1.5, 2]);
    const SA = 2 * (l + w) * h;
    return {
      prompt: `A raised garden bed is a box frame with no top and no bottom: just four wooden sides. It is ${len(l, 'ft')} long, ${len(w, 'ft')} wide and ${len(h, 'ft')} high. What is the total area of the four sides (the outside only)?`,
      figure: prismFig(l, w, h, 'ft'),
      parts: [numPart(SA, { suffix: 'ft²' })],
      hints: ['There is no top face and no bottom face, so only the four sides count.', 'Add the two long sides ($2lh$) and the two short sides ($2wh$).'],
      solution: [
        `Long sides: $2 \\times ${l} \\times ${n(h)} = ${n(2 * l * h)}\\ ${sq('ft')}$`,
        `Short sides: $2 \\times ${w} \\times ${n(h)} = ${n(2 * w * h)}\\ ${sq('ft')}$`,
        `Total: $${n(2 * l * h)} + ${n(2 * w * h)} = ${n(SA)}$`,
        `The four sides have an area of ${ar(SA, 'ft')}.`,
      ],
    };
  },
});

function cylSteps(r: number, h: number, u: string, parts: 'closed' | 'open' | 'lateral'): { SA: number; steps: string[] } {
  const ends = parts === 'closed' ? 2 : parts === 'open' ? 1 : 0;
  const circK = exact(ends * r * r);
  const latK = exact(2 * r * h);
  const SA = Math.PI * (circK + latK);
  const steps: string[] = [];
  if (ends === 2) steps.push(`Two circles: $2\\pi r^2 = 2\\pi(${n(r)})^2 = ${n(circK)}\\pi\\ ${sq(u)}$`);
  if (ends === 1) steps.push(`One circle (the bottom): $\\pi r^2 = \\pi(${n(r)})^2 = ${n(circK)}\\pi\\ ${sq(u)}$`);
  steps.push(`Curved side: $2\\pi r h = 2\\pi(${n(r)})(${n(h)}) = ${n(latK)}\\pi\\ ${sq(u)}$`);
  steps.push(ends ? `$SA = ${n(circK)}\\pi + ${n(latK)}\\pi = ${n(exact(circK + latK))}\\pi \\approx ${nf(SA, 1)}$` : `$A = ${n(latK)}\\pi \\approx ${nf(SA, 1)}$`);
  return { SA, steps };
}

const saCylinder = skill({
  id: 'm103-sa-cylinder',
  name: 'Surface area of cylinders',
  description: 'Calculate the surface area of closed and open cylinders, or just the curved side.',
  outcomes: ['M4'],
  lessonId: 'm103-5-3',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    const closedHints = ['A closed cylinder unfolds into two circles and one rectangle. The rectangle is as long as the circumference, $2\\pi r$, and as tall as the cylinder.', '$SA = 2\\pi r^2 + 2\\pi r h$'];
    if (d === 1) {
      const c = rng.pick([
        { thing: 'closed metal can', u: 'cm', r: [3, 8], h: [8, 20] },
        { thing: 'closed cylindrical water tank', u: 'm', r: [1, 3], h: [2, 6] },
        { thing: 'round hatbox with a lid', u: 'in', r: [6, 10], h: [6, 12] },
        { thing: 'closed cylindrical storage drum', u: 'cm', r: [25, 30], h: [80, 95] },
      ]);
      const [r, h] = retry(() => [rng.int(c.r[0], c.r[1]), rng.int(c.h[0], c.h[1])], ([x, y]) => !nearHalf(2 * Math.PI * x * (x + y), 1));
      const { SA, steps } = cylSteps(r, h, c.u, 'closed');
      return {
        prompt: `A ${c.thing} has a radius of ${len(r, c.u)} and a height of ${len(h, c.u)}. What is its surface area, ${sqRound(1, c.u)}?`,
        figure: cylFig(r, h, c.u, false),
        parts: [numPart(SA, { decimals: 1, suffix: `${c.u}²` })],
        hints: closedHints,
        solution: [...steps, `The surface area is about ${arR(SA, c.u, 1)}.`],
      };
    }
    if (d === 2) {
      const c = rng.pick([
        { lead: 'A steel oil drum', u: 'cm', d: () => rng.int(54, 60), h: () => rng.int(84, 92), tail: 'How much steel is needed to make the drum (top, bottom and side)?' },
        { lead: 'A hot-water tank', u: 'cm', d: () => rng.int(45, 60), h: () => 10 * rng.int(12, 16), tail: 'What is the total area of its outside surface, including the top and bottom?' },
        { lead: 'A round hay bale', u: 'ft', d: () => rng.int(4, 6), h: () => rng.int(4, 5), tail: 'It is wrapped completely in plastic. What area of plastic covers the bale?' },
        { lead: 'A closed cylindrical fuel tank', u: 'm', d: () => rng.int(12, 24) / 10, h: () => rng.int(3, 6), tail: 'What is its total surface area?' },
        { lead: 'A closed rain barrel', u: 'cm', d: () => rng.int(50, 65), h: () => rng.int(80, 100), tail: 'What is its total surface area?' },
      ]);
      const [dia, h] = retry(() => [c.d(), c.h()], ([x, y]) => !nearHalf(Math.PI * (x / 2) * (x + 2 * y), 1));
      const r = dia / 2;
      const { SA, steps } = cylSteps(r, h, c.u, 'closed');
      return {
        prompt: `${c.lead} has a diameter of ${len(dia, c.u)} and a height of ${len(h, c.u)}. ${c.tail} Round to the nearest tenth of a square ${UNIT[c.u].one}.`,
        figure: cylFig(r, h, c.u, true),
        parts: [numPart(SA, { decimals: 1, suffix: `${c.u}²` })],
        hints: ['The formula uses the radius. Find it first: radius = diameter ÷ 2.', '$SA = 2\\pi r^2 + 2\\pi r h$'],
        solution: [`$r = ${n(dia)} \\div 2 = ${n(r)}\\ ${tx(c.u)}$`, ...steps, `The surface area is about ${arR(SA, c.u, 1)}.`],
      };
    }
    const mode = rng.pick(['open', 'label', 'pipe', 'bin'] as const);
    if (mode === 'open') {
      const c = rng.pick([
        { lead: 'A cylindrical stock tank for cattle has no lid.', u: 'ft', d: () => rng.int(6, 10), h: () => rng.int(2, 3), what: 'the outside (the bottom and the curved side)' },
        { lead: 'A round planter has no top.', u: 'cm', d: () => 2 * rng.int(15, 30), h: () => rng.int(30, 60), what: 'the outside (the bottom and the curved side)' },
        { lead: 'An open-top rain barrel', u: 'cm', d: () => rng.int(50, 65), h: () => rng.int(80, 100), what: 'its outside surface (the bottom and the curved side)' },
      ]);
      const [dia, h] = retry(() => [c.d(), c.h()], ([x, y]) => !nearHalf(Math.PI * ((x / 2) ** 2 + x * y), 1));
      const r = dia / 2;
      const { SA, steps } = cylSteps(r, h, c.u, 'open');
      const lead = c.lead.endsWith('.') ? `${c.lead} It has` : `${c.lead} has`;
      return {
        prompt: `${lead} a diameter of ${len(dia, c.u)} and a height of ${len(h, c.u)}. ${name} wants to paint ${c.what}. What area is that, ${sqRound(1, c.u)}?`,
        figure: cylFig(r, h, c.u, true),
        parts: [numPart(SA, { decimals: 1, suffix: `${c.u}²` })],
        hints: ['With no lid, there is only one circle: the bottom.', '$SA = \\pi r^2 + 2\\pi r h$, with $r$ = diameter ÷ 2.'],
        solution: [`$r = ${n(dia)} \\div 2 = ${n(r)}\\ ${tx(c.u)}$`, ...steps, `The area to paint is about ${arR(SA, c.u, 1)}.`],
      };
    }
    if (mode === 'label' || mode === 'pipe') {
      const label = mode === 'label';
      const u = label ? 'cm' : 'm';
      const [dia, h] = retry(
        () => (label ? [rng.int(60, 110) / 10, rng.int(8, 15)] : [rng.int(6, 12) / 10, rng.int(6, 14)]),
        ([x, y]) => !nearHalf(Math.PI * x * y, 1),
      );
      const r = dia / 2;
      const { SA, steps } = cylSteps(r, h, u, 'lateral');
      return {
        prompt: label
          ? `A paper label wraps once around the curved side of a can, with no overlap. The can has a diameter of ${len(dia, u)} and the label is ${len(h, u)} tall. What is the area of the label, ${sqRound(1, u)}?`
          : `A steel culvert (a pipe under a road) is ${len(h, u)} long and has a diameter of ${len(dia, u)}. Both ends are open. The outside curved surface gets a protective coating. What area is coated, ${sqRound(1, u)}?`,
        figure: cylFig(r, h, u, true),
        parts: [numPart(SA, { decimals: 1, suffix: `${u}²` })],
        hints: [label ? 'The label covers only the curved side, not the top or the bottom.' : 'Both ends are open, so there are no circles to include.', 'The curved side unrolls into a rectangle: $A = 2\\pi r h$ (or $\\pi d h$).'],
        solution: [`$r = ${n(dia)} \\div 2 = ${n(r)}\\ ${tx(u)}$`, ...steps, `The ${label ? 'label' : 'coated surface'} has an area of about ${arR(SA, u, 1)}.`],
      };
    }
    const [dia, h] = retry(() => [2 * rng.int(9, 15), rng.int(16, 24)], ([x, y]) => !nearHalf(Math.PI * ((x / 2) ** 2 + x * y), 1));
    const r = dia / 2;
    const { SA, steps } = cylSteps(r, h, 'ft', 'open');
    return {
      prompt: `A steel grain bin is a cylinder with a flat roof. It has a diameter of ${len(dia, 'ft')} and a height of ${len(h, 'ft')}. ${name} will paint the curved wall and the roof, but not the floor. What area will be painted, ${sqRound(1, 'ft')}?`,
      figure: cylFig(r, h, 'ft', true),
      parts: [numPart(SA, { decimals: 1, suffix: 'ft²' })],
      hints: ['The floor is not painted, so include only one circle (the roof).', '$A = \\pi r^2 + 2\\pi r h$, with $r$ = diameter ÷ 2.'],
      solution: [`$r = ${dia} \\div 2 = ${n(r)}\\ ${tx('ft')}$`, ...steps.map((s) => s.replace('(the bottom)', '(the roof)')), `The painted area is about ${arR(SA, 'ft', 1)}.`],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 5.4 — Area units and material costs
// ---------------------------------------------------------------------------

interface Conv {
  big: string;
  small: string;
  f: number;
  k: number;
}
const CONV: Conv[] = [
  { big: 'ft', small: 'in', f: 12, k: 144 },
  { big: 'yd', small: 'ft', f: 3, k: 9 },
  { big: 'm', small: 'cm', f: 100, k: 10000 },
  { big: 'cm', small: 'mm', f: 10, k: 100 },
];

function convFact(c: Conv): string {
  return `$1\\ ${tx(c.big)} = ${c.f}\\ ${tx(c.small)}$, so $1\\ ${sq(c.big)} = ${c.f}\\ ${tx(c.small)} \\times ${c.f}\\ ${tx(c.small)} = ${n(c.k)}\\ ${sq(c.small)}$.`;
}

const areaUnits = skill({
  id: 'm103-area-units',
  name: 'Converting units of area',
  description: 'Convert between square units within SI or imperial, and between SI and imperial using a given factor.',
  outcomes: ['M4', 'M1', 'M2'],
  lessonId: 'm103-5-4',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    const mistake = (c: Conv) => `Square the length conversion: one square ${UNIT[c.big].one} is ${c.f} ${UNIT[c.small].many} by ${c.f} ${UNIT[c.small].many}, not just ${c.f} square ${UNIT[c.small].many}.`;
    if (d === 1 || d === 2) {
      const c = rng.pick(CONV);
      const toSmall = d === 1 || rng.chance(0.35);
      let v: number;
      let res: number;
      if (toSmall) {
        v = d === 1 ? rng.int(2, 20) : rng.int(5, 95) / (c.k >= 10000 ? 100 : 10);
        res = exact(v * c.k);
      } else {
        res = rng.int(3, 60) / rng.pick([1, 2, 4]);
        v = exact(res * c.k);
        res = exact(v / c.k);
      }
      const from = toSmall ? c.big : c.small;
      const to = toSmall ? c.small : c.big;
      const ctxs = [
        `Convert ${ar(v, from)} to ${sqName(to)}.`,
        `A sheet of material has an area of ${ar(v, from)}. What is its area in ${sqName(to)}?`,
        `${name} measured a surface and found an area of ${ar(v, from)}. Express this area in ${sqName(to)}.`,
      ];
      return {
        prompt: rng.pick(ctxs),
        parts: [numPart(res, { suffix: `${to}²` })],
        hints: [`Picture one square ${UNIT[c.big].one}. How many square ${UNIT[c.small].many} fit inside it?`, mistake(c)],
        solution: [
          convFact(c),
          toSmall
            ? `Converting to a smaller unit gives a bigger number, so multiply: $${n(v)} \\times ${n(c.k)} = ${n(res)}$`
            : `Converting to a larger unit gives a smaller number, so divide: $${n(v)} \\div ${n(c.k)} = ${n(res)}$`,
          `$${n(v)}\\ ${sq(from)} = ${n(res)}\\ ${sq(to)}$`,
        ],
        calculator: d === 2,
      };
    }
    const mode = rng.pick(['m2ToFt2', 'ft2ToM2', 'roomYd', 'roomM'] as const);
    const F = 10.76;
    if (mode === 'm2ToFt2' || mode === 'ft2ToM2') {
      const toFt = mode === 'm2ToFt2';
      const v = retry(
        () => (toFt ? rng.int(40, 250) : 10 * rng.int(60, 300)),
        (x) => !nearHalf(toFt ? x * F : x / F, 0),
      );
      const res = toFt ? v * F : v / F;
      const what = toFt
        ? rng.pick(['A downtown condo has a floor area of', 'A shop on Main Street has a floor area of', 'A new house plan shows a main floor area of'])
        : rng.pick(['A house listing says the home has', 'A warehouse unit for rent has', 'A basement suite has']);
      return {
        prompt: `${what} ${ar(v, toFt ? 'm' : 'ft')}. Use $1\\ ${sq('m')} \\approx 10.76\\ ${sq('ft')}$ to find the area in ${toFt ? 'square feet' : 'square metres'}, ${sqRound(0, toFt ? 'ft' : 'm')}.`,
        parts: [numPart(res, { decimals: 0, suffix: toFt ? 'ft²' : 'm²' })],
        hints: [toFt ? 'A square foot is smaller than a square metre, so the number of square feet should be bigger.' : 'A square metre is bigger than a square foot, so the number of square metres should be smaller.', toFt ? 'Multiply by 10.76.' : 'Divide by 10.76.'],
        solution: [
          `$1\\ ${sq('m')} \\approx 10.76\\ ${sq('ft')}$`,
          toFt ? `$${n(v)} \\times 10.76 = ${n(res)}$` : `$${n(v)} \\div 10.76 \\approx ${nf(res, 2)}$`,
          `The area is about $${nf(res, 0)}\\ ${sq(toFt ? 'ft' : 'm')}$.`,
        ],
      };
    }
    if (mode === 'roomYd') {
      const [l, w] = retry(() => [rng.int(9, 20), rng.int(8, 16)], ([x, y]) => x !== y && !nearHalf((x * y) / 9, 1));
      const A = l * w;
      const yd = A / 9;
      return {
        prompt: `Carpet is sold by the square yard. ${name}’s living room is ${len(l, 'ft')} by ${len(w, 'ft')}. What is the area of the room in square yards, ${sqRound(1, 'yd')}?`,
        parts: [numPart(yd, { decimals: 1, suffix: 'yd²' })],
        hints: ['Find the area in square feet first.', `$1\\ ${tx('yd')} = 3\\ ${tx('ft')}$, so $1\\ ${sq('yd')} = 3 \\times 3 = 9\\ ${sq('ft')}$. Divide by 9 (not by 3).`],
        solution: [`$A = ${l} \\times ${w} = ${A}\\ ${sq('ft')}$`, `$1\\ ${sq('yd')} = 9\\ ${sq('ft')}$, so divide by 9: $${A} \\div 9 ${A % 9 === 0 ? `= ${yd}` : `\\approx ${nf(yd, 2)}`}$`, `The room is about $${nf(yd, 1)}\\ ${sq('yd')}$.`],
      };
    }
    const [l, w] = retry(
      () => [rng.int(25, 70) / 10, rng.int(22, 50) / 10],
      ([x, y]) => x !== y && !nearHalf(x * y * F, 0),
    );
    const A = exact(l * w);
    const ft2 = A * F;
    return {
      prompt: `A room measures ${len(l, 'm')} by ${len(w, 'm')}. The flooring ${name} wants is priced in square feet. Using $1\\ ${sq('m')} \\approx 10.76\\ ${sq('ft')}$, what is the floor area in square feet, ${sqRound(0, 'ft')}?`,
      parts: [numPart(ft2, { decimals: 0, suffix: 'ft²' })],
      hints: ['Find the area in square metres first.', 'Then multiply by 10.76 to change square metres to square feet.'],
      solution: [`$A = ${n(l)} \\times ${n(w)} = ${n(A)}\\ ${sq('m')}$`, `$${n(A)} \\times 10.76 \\approx ${nf(ft2, 2)}$`, `The floor area is about $${nf(ft2, 0)}\\ ${sq('ft')}$.`],
    };
  },
});

/** A price such as 3.49 within [lo, hi]. */
function price(rng: Rng, lo: number, hi: number): number {
  return rng.int(lo, hi) + rng.pick([0.19, 0.29, 0.49, 0.79, 0.99]);
}

/** Pick a needed amount whose quotient by `cover` is not close to a whole number (so rounding up matters). */
function notWhole(q: number): boolean {
  const f = q - Math.floor(q);
  return f > 0.08 && f < 0.92;
}

const areaCost = skill({
  id: 'm103-area-cost',
  name: 'Material needed and cost',
  description: 'Find how many boxes, cans or rolls of material to buy for an area, and what they cost, including waste and GST.',
  outcomes: ['M4'],
  lessonId: 'm103-5-4',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      if (rng.chance(0.5)) {
        const c = rng.pick([
          { item: 'Sod', u: 'm', p: [3, 5], A: [40, 180], job: 'cover a new lawn' },
          { item: 'Laminate flooring', u: 'ft', p: [1, 4], A: [120, 400], job: 'cover a floor' },
          { item: 'Carpet', u: 'ft', p: [2, 6], A: [100, 300], job: 'carpet a basement' },
          { item: 'Ceramic tile', u: 'ft', p: [3, 7], A: [40, 120], job: 'tile a bathroom floor' },
          { item: 'Rubber gym flooring', u: 'ft', p: [2, 4], A: [150, 500], job: 'cover a home gym floor' },
        ]);
        const rate = price(rng, c.p[0], c.p[1]);
        const A = rng.int(c.A[0], c.A[1]);
        const cost = A * rate;
        return {
          prompt: `${c.item} costs ${cash(rate)} per square ${UNIT[c.u].one}. ${name} needs to ${c.job} with an area of ${ar(A, c.u)}. What will the ${c.item.toLowerCase()} cost before tax, to the nearest cent?`,
          parts: [numPart(cost, { decimals: 2, tolerance: 0.011, label: 'Cost' })],
          hints: ['The price is given per square unit, so you pay that amount for every square unit of area.', 'Cost = area × price per square unit.'],
          solution: [`Cost $= ${A} \\times ${fmtFixed(rate, 2)}$`, `$= ${nf(cost, 2)}$`, `The ${c.item.toLowerCase()} costs ${cash(cost)} before tax.`],
        };
      }
      const c = rng.pick([
        { item: 'box of laminate flooring', items: 'boxes', u: 'ft', cover: [18, 20.5, 22.5, 24], A: [120, 380] },
        { item: 'can of paint', items: 'cans', u: 'm', cover: [30, 35, 40], A: [60, 200] },
        { item: 'bundle of roof shingles', items: 'bundles', u: 'ft', cover: [32, 33], A: [300, 1200] },
        { item: 'roll of sod', items: 'rolls', u: 'm', cover: [0.8], A: [20, 80] },
        { item: 'sheet of drywall', items: 'sheets', u: 'ft', cover: [32, 48], A: [150, 600] },
      ]);
      const cover = rng.pick(c.cover);
      const A = retry(() => rng.int(c.A[0], c.A[1]), (x) => notWhole(x / cover));
      const q = A / cover;
      const N = Math.ceil(q);
      return {
        prompt: `One ${c.item} covers ${ar(cover, c.u)}. How many ${c.items} does ${name} need to buy to cover ${ar(A, c.u)}?`,
        parts: [numPart(N, { suffix: c.items })],
        hints: [`Divide the area by the amount one ${c.item.split(' of ')[0]} covers.`, `You cannot buy part of a ${c.item.split(' of ')[0]}, so always round up to the next whole number.`],
        solution: [`$${n(A)} \\div ${n(cover)} \\approx ${nf(q, 2)}$`, `${cap(c.items)} are sold whole, so round up: $${nf(q, 2)} \\rightarrow ${N}$`, `${name} needs ${N} ${c.items}.`],
      };
    }
    if (d === 2) {
      const mode = rng.pick(['boxes', 'perArea', 'paint'] as const);
      if (mode === 'boxes') {
        const c = rng.pick([
          { item: 'laminate flooring', box: 'box', boxes: 'boxes', cover: [20.5, 22.5, 24, 26], p: [39, 69] },
          { item: 'vinyl plank flooring', box: 'box', boxes: 'boxes', cover: [18, 20, 23.5], p: [45, 79] },
          { item: 'carpet tiles', box: 'box', boxes: 'boxes', cover: [24, 36], p: [49, 89] },
        ]);
        const cover = rng.pick(c.cover);
        const [L, W] = retry(() => [rng.int(10, 20), rng.int(9, 16)], ([x, y]) => notWhole((x * y) / cover));
        const A = L * W;
        const N = Math.ceil(A / cover);
        const P = price(rng, c.p[0], c.p[1]);
        const cost = N * P;
        return {
          prompt: `${name} is installing ${c.item} in a rectangular room that is ${len(L, 'ft')} by ${len(W, 'ft')}. Each ${c.box} covers ${ar(cover, 'ft')} and costs ${cash(P)}. How many ${c.boxes} are needed, and what do they cost before tax?`,
          parts: [numPart(N, { label: `${cap(c.boxes)} needed`, suffix: c.boxes }), numPart(cost, { decimals: 2, tolerance: 0.011, label: 'Cost before tax' })],
          hints: ['Find the floor area first, then divide by the area one box covers.', 'Round the number of boxes up, then multiply the number of boxes by the price of one box.'],
          solution: [
            `Area: $${L} \\times ${W} = ${A}\\ ${sq('ft')}$`,
            `Boxes: $${A} \\div ${n(cover)} \\approx ${nf(A / cover, 2)}$, so round up to $${N}$ ${c.boxes}.`,
            `Cost: $${N} \\times ${fmtFixed(P, 2)} = ${nf(cost, 2)}$`,
            `${name} needs ${N} ${c.boxes}, costing ${cash(cost)} before tax.`,
          ],
        };
      }
      if (mode === 'perArea') {
        const c = rng.pick([
          { item: 'Sod', what: 'lawn', u: 'm', L: [8, 20], W: [5, 12], p: [3, 5] },
          { item: 'Interlocking paving stone', what: 'patio', u: 'm', L: [3, 7], W: [3, 5], p: [45, 65] },
          { item: 'Artificial turf', what: 'putting green', u: 'ft', L: [10, 24], W: [8, 15], p: [3, 6] },
        ]);
        const L = rng.int(c.L[0], c.L[1]);
        const W = rng.intExcept(c.W[0], c.W[1], [L]);
        const A = L * W;
        const rate = price(rng, c.p[0], c.p[1]);
        const cost = A * rate;
        return {
          prompt: `${c.item} costs ${cash(rate)} per square ${UNIT[c.u].one}. ${name} is covering a rectangular ${c.what} that is ${len(L, c.u)} by ${len(W, c.u)}. What is the cost before tax, to the nearest cent?`,
          parts: [numPart(cost, { decimals: 2, tolerance: 0.011, label: 'Cost' })],
          hints: ['Find the area of the rectangle first.', 'Cost = area × price per square unit.'],
          solution: [`Area: $${L} \\times ${W} = ${A}\\ ${sq(c.u)}$`, `Cost: $${A} \\times ${fmtFixed(rate, 2)} = ${nf(cost, 2)}$`, `The ${c.item.toLowerCase()} costs ${cash(cost)} before tax.`],
        };
      }
      const u = rng.pick(['ft', 'm']);
      const cover = u === 'ft' ? rng.pick([300, 350, 400]) : rng.pick([30, 35, 40]);
      const coats = 2;
      const [L, H] = retry(
        () => (u === 'ft' ? [rng.int(12, 40), rng.int(8, 12)] : [rng.int(4, 12), rng.pick([2.4, 2.5, 3])]),
        ([x, y]) => notWhole((x * y * coats) / cover) && (x * y * coats) / cover > 1.2,
      );
      const A = exact(L * H);
      const total = exact(A * coats);
      const N = Math.ceil(total / cover);
      return {
        prompt: `${name} is painting a wall that is ${len(L, u)} long and ${len(H, u)} high. The wall needs ${coats} coats of paint. One can of paint covers ${ar(cover, u)}. How many cans should ${name} buy?`,
        parts: [numPart(N, { suffix: 'cans' })],
        hints: ['Two coats means you cover the wall twice, so double the area.', 'Divide the total area by the coverage of one can, then round up.'],
        solution: [`Wall area: $${n(L)} \\times ${n(H)} = ${n(A)}\\ ${sq(u)}$`, `Two coats: $${n(A)} \\times 2 = ${n(total)}\\ ${sq(u)}$`, `$${n(total)} \\div ${cover} \\approx ${nf(total / cover, 2)}$, so round up to $${N}$`, `${name} should buy ${N} cans.`],
      };
    }
    const mode = rng.pick(['waste', 'carpetYd', 'sod'] as const);
    if (mode === 'waste') {
      const waste = rng.pick([10, 15]);
      const cover = rng.pick([20.5, 22.5, 24, 26]);
      const [L, W, P] = retry(
        () => [rng.int(10, 22), rng.int(9, 16), price(rng, 39, 69)],
        ([x, y, p]) => {
          const need = (x * y * (100 + waste)) / 100;
          const N = Math.ceil(need / cover - 1e-9);
          return notWhole(need / cover) && !nearHalf(N * p * 1.05, 2);
        },
      );
      const A = L * W;
      const need = exact((A * (100 + waste)) / 100);
      const N = Math.ceil(need / cover - 1e-9);
      const sub = exact(N * P);
      const total = sub * 1.05;
      return {
        prompt: `${name} is installing hardwood flooring in a room that is ${len(L, 'ft')} by ${len(W, 'ft')}. Installers add ${waste}% extra to allow for cutting waste. Each box covers ${ar(cover, 'ft')} and costs ${cash(P)}. GST of 5% is added to the price. How many boxes are needed, and what is the total cost including GST, to the nearest cent?`,
        parts: [numPart(N, { label: 'Boxes needed', suffix: 'boxes' }), numPart(total, { decimals: 2, tolerance: 0.011, label: 'Total cost with GST' })],
        hints: [`Find the floor area, then add ${waste}% by multiplying by ${fmt(1 + waste / 100)}.`, 'Divide by the coverage of one box and round up. Multiply by the price per box, then multiply by 1.05 to add 5% GST.'],
        solution: [
          `Floor area: $${L} \\times ${W} = ${A}\\ ${sq('ft')}$`,
          `With ${waste}% extra: $${A} \\times ${fmt(1 + waste / 100)} = ${n(need)}\\ ${sq('ft')}$`,
          `Boxes: $${n(need)} \\div ${n(cover)} \\approx ${nf(need / cover, 2)}$, so round up to $${N}$ boxes.`,
          `Before tax: $${N} \\times ${fmtFixed(P, 2)} = ${nf(sub, 2)}$`,
          `With 5% GST: $${nf(sub, 2)} \\times 1.05 \\approx ${nf(total, 2)}$`,
          `${name} needs ${N} boxes, and the total cost is ${cash(total)}.`,
        ],
      };
    }
    if (mode === 'carpetYd') {
      const [a, b, rate] = retry(
        () => [rng.int(3, 7), rng.int(3, 6), price(rng, 18, 45)],
        ([x, y, r]) => x !== y && !nearHalf(x * y * r * 1.05, 2),
      );
      const L = 3 * a;
      const W = 3 * b;
      const ft2 = L * W;
      const yd2 = ft2 / 9;
      const sub = exact(yd2 * rate);
      const total = sub * 1.05;
      return {
        prompt: `Carpet costs ${cash(rate)} per square yard, installed. ${name}’s family room is ${len(L, 'ft')} by ${len(W, 'ft')}. GST of 5% is added. What is the total cost of carpeting the room, to the nearest cent?`,
        parts: [numPart(total, { decimals: 2, tolerance: 0.011, label: 'Total cost with GST' })],
        hints: [`The price is per square yard, but the room is measured in feet. $1\\ ${sq('yd')} = 9\\ ${sq('ft')}$.`, 'Find the area in square feet, divide by 9, multiply by the price, then multiply by 1.05 for GST.'],
        solution: [
          `Area: $${L} \\times ${W} = ${ft2}\\ ${sq('ft')}$`,
          `In square yards: $${ft2} \\div 9 = ${n(yd2)}\\ ${sq('yd')}$ (or $${a}\\ ${tx('yd')} \\times ${b}\\ ${tx('yd')}$)`,
          `Before tax: $${n(yd2)} \\times ${fmtFixed(rate, 2)} = ${nf(sub, 2)}$`,
          `With 5% GST: $${nf(sub, 2)} \\times 1.05 \\approx ${nf(total, 2)}$`,
          `The carpet costs ${cash(total)} in total.`,
        ],
      };
    }
    const cover = 0.8;
    const [L, W, pa, pb, P] = retry(
      () => [rng.int(10, 20), rng.int(8, 14), rng.int(3, 5), rng.int(3, 4), price(rng, 3, 5)],
      ([x, y, p, q, pr]) => {
        const need = (x * y - p * q) * 1.05;
        return notWhole(need / cover) && !nearHalf(Math.ceil(need / cover - 1e-9) * pr * 1.05, 2);
      },
    );
    const A = L * W - pa * pb;
    const need = exact(A * 1.05);
    const N = Math.ceil(need / cover - 1e-9);
    const sub = exact(N * P);
    const total = sub * 1.05;
    return {
      prompt: `${name} is laying sod in a backyard that is ${len(L, 'm')} by ${len(W, 'm')}. A ${len(pa, 'm')} by ${len(pb, 'm')} patio will not get sod. ${name} orders 5% extra sod for trimming. Each roll covers ${ar(cover, 'm')} and costs ${cash(P)}. GST of 5% is added. How many rolls are needed, and what is the total cost including GST, to the nearest cent?`,
      parts: [numPart(N, { label: 'Rolls needed', suffix: 'rolls' }), numPart(total, { decimals: 2, tolerance: 0.011, label: 'Total cost with GST' })],
      hints: ['Area of sod = area of the yard − area of the patio. Then add 5% extra by multiplying by 1.05.', 'Divide by 0.8 and round up to get the rolls. Multiply by the price per roll, then by 1.05 for GST.'],
      solution: [
        `Sod area: $${L} \\times ${W} - ${pa} \\times ${pb} = ${L * W} - ${pa * pb} = ${A}\\ ${sq('m')}$`,
        `With 5% extra: $${A} \\times 1.05 = ${n(need)}\\ ${sq('m')}$`,
        `Rolls: $${n(need)} \\div 0.8 \\approx ${nf(need / cover, 2)}$, so round up to $${N}$ rolls.`,
        `Before tax: $${N} \\times ${fmtFixed(P, 2)} = ${nf(sub, 2)}$`,
        `With 5% GST: $${nf(sub, 2)} \\times 1.05 \\approx ${nf(total, 2)}$`,
        `${name} needs ${N} rolls, and the total cost is ${cash(total)}.`,
      ],
    };
  },
});

export const AREA_SKILLS: SkillDef[] = [areaBasic, areaCircle, areaUnknown, areaComposite, areaIrregular, saPrism, saCylinder, areaUnits, areaCost];
