/** Math 31 Unit 7 — Optimization (DA2) and related rates (DA3). */
import { fixedChoice, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, fmtGroupTex, fracLatex, radicalSplit, toFrac } from '../../../math/numbers.ts';
import type { Part, PlaneFigure, PlanePoint, PlaneSegment, RightTriangleFigure, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

/** A number in LaTeX: integers plainly, other rationals as fractions. */
function tn(x: number, dfrac = false): string {
  if (Math.abs(x - Math.round(x)) < 1e-9) return fmt(Math.round(x));
  const f = toFrac(x, 400);
  return f ? fracLatex(f, { dfrac }) : fmt(x);
}
/** A decimal (no trailing zeros), with thousands separators in maths. */
const dec = (x: number, dp = 4) => fmtGroupTex(x, dp);
/** A polynomial from [coefficient, body] pairs, skipping zero terms; decimal coefficients stay decimal. */
function poly(terms: Array<[number, string]>): string {
  let out = '';
  for (const [c, body] of terms) {
    if (Math.abs(c) < 1e-12) continue;
    const abs = Math.abs(c);
    const k = body && Math.abs(abs - 1) < 1e-12 ? '' : dec(abs);
    out += out === '' ? `${c < 0 ? '-' : ''}${k}${body}` : ` ${c < 0 ? '-' : '+'} ${k}${body}`;
  }
  return out || '0';
}

/** True when v is not close to a rounding boundary at `dp` decimals. */
function safeRound(v: number, dp: number): boolean {
  const s = Math.abs(v) * 10 ** dp;
  return Math.abs(s - Math.floor(s) - 0.5) > 0.05;
}
/** True when v has at most `dp` decimal places. */
const terminates = (v: number, dp: number) => Math.abs(v * 10 ** dp - Math.round(v * 10 ** dp)) < 1e-6;

/** A positive rational number as a student types it: 3/65, 7. */
function ratStr(x: number): string {
  const f = toFrac(x, 20000);
  if (!f) return fmt(x, 6);
  return f.d === 1 ? `${f.n}` : `${f.n}/${f.d}`;
}
/** q/π as a student types it, and in LaTeX. */
function overPiStr(q: number): string {
  const f = toFrac(q, 20000);
  if (!f) return `${fmt(q, 6)}/pi`;
  return f.d === 1 ? `${f.n}/pi` : `${f.n}/(${f.d}pi)`;
}
function overPiTex(q: number): string {
  const f = toFrac(q, 20000);
  if (!f) return `\\dfrac{${fmt(q, 6)}}{\\pi}`;
  return `\\dfrac{${f.n}}{${f.d === 1 ? '' : f.d}\\pi}`;
}
/** qπ as a student types it. */
function piStr(q: number): string {
  const f = toFrac(q, 20000);
  if (!f) return `${fmt(q, 6)}pi`;
  return f.d === 1 ? `${f.n === 1 ? '' : f.n}pi` : `${f.n === 1 ? '' : f.n}pi/${f.d}`;
}
/** qπ in LaTeX. */
function piTex(q: number): string {
  if (Math.abs(q - 1) < 1e-12) return '\\pi';
  return Math.abs(q - Math.round(q)) < 1e-9 || !toFrac(q, 400) ? `${dec(q)}\\pi` : `${tn(q)}\\pi`;
}

/** √n simplified, in LaTeX and as typed (2√2 is 2\\sqrt{2} and 2sqrt(2)). */
function rootTex(n: number): string {
  const { outside: o, inside: i } = radicalSplit(n);
  return i === 1 ? `${o}` : `${o === 1 ? '' : o}\\sqrt{${i}}`;
}
function rootStr(n: number): string {
  const { outside: o, inside: i } = radicalSplit(n);
  return i === 1 ? `${o}` : `${o === 1 ? '' : o}sqrt(${i})`;
}
/** √n / 2 simplified, in LaTeX and as typed. */
function halfRootTex(n: number): string {
  const { outside: o, inside: i } = radicalSplit(n);
  if (i === 1) return tn(o / 2);
  return o % 2 === 0 ? `${o / 2 === 1 ? '' : o / 2}\\sqrt{${i}}` : `\\dfrac{${o === 1 ? '' : o}\\sqrt{${i}}}{2}`;
}
function halfRootStr(n: number): string {
  const { outside: o, inside: i } = radicalSplit(n);
  if (i === 1) return ratStr(o / 2);
  return o % 2 === 0 ? `${o / 2 === 1 ? '' : o / 2}sqrt(${i})` : `${o === 1 ? '' : o}sqrt(${i})/2`;
}
/** " ≈ 1.41" after an exact value that is not a terminating decimal with at most 2 places. */
const approx = (v: number, dp = 2) => (terminates(v, dp) ? '' : ` \\approx ${fmtFixed(v, dp)}`);

/** A numeric answer that accepts an exact form (π, a root, a fraction) or a rounded decimal. */
function exactPart(value: number, decimals: number, opts: { exact?: string; suffix?: string; label?: string } = {}): Part {
  return {
    label: opts.label,
    suffix: opts.suffix,
    answer: { kind: 'numeric', value, decimals, allowExpression: true, ...(opts.exact ? { exact: opts.exact } : {}) },
  };
}
/** A whole-number answer, or else one that is exact or rounded to the nearest hundredth. */
function valPart(value: number, label: string, exact?: string): Part {
  return terminates(value, 0) ? numPart(Math.round(value), { label }) : exactPart(value, 2, { label, ...(exact ? { exact } : {}) });
}
/** Money to the cent. */
const moneyPart = (value: number, label: string): Part => ({ label, answer: { kind: 'numeric', value, decimals: 2, tolerance: 0.011 } });
/** Fixed two decimals with thousands separators from 10 000 up (in maths, commas need braces). */
function cents(x: number, tex = false): string {
  const [i, f] = fmtFixed(x, 2).split('.');
  const g = i.length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, tex ? '{,}' : ',') : i;
  return `${g}.${f}`;
}
const money = (x: number) => `\\$${cents(x)}`;
/** Whole dollars with separators: \$42,000. */
const dollars = (x: number) => `\\$${String(Math.round(x)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

const NAMES = ['Aiyana', 'Mateo', 'Priya', 'Liam', 'Mei', 'Noah', 'Amara', 'Ethan', 'Sofia', 'Kiran', 'Jasmine', 'Owen', 'Fatima', 'Lucas', 'Hana', 'Dakota', 'Ravi', 'Chloé', 'Tariq', 'Émilie'];
/** Names with the pronoun to use for them. */
const PEOPLE: Array<[string, 'she' | 'he']> = [
  ['Aiyana', 'she'], ['Mateo', 'he'], ['Priya', 'she'], ['Liam', 'he'], ['Mei', 'she'], ['Noah', 'he'], ['Amara', 'she'], ['Ethan', 'he'],
  ['Sofia', 'she'], ['Kiran', 'he'], ['Jasmine', 'she'], ['Owen', 'he'], ['Fatima', 'she'], ['Tariq', 'he'], ['Émilie', 'she'], ['Ravi', 'he'],
];

// ---------------------------------------------------------------------------
// Figures
// ---------------------------------------------------------------------------

type P = [number, number];
const r2 = (v: number) => Math.round(v * 100) / 100 + 0;
const r3 = (v: number) => Math.round(v * 1000) / 1000 + 0;

/** Approximate width (px) of a 12 px bold label. */
function textWidth(t: string): number {
  let w = 0;
  for (const ch of t) w += ch === ' ' || ch === '.' ? 3.6 : ch === 'm' ? 10.8 : ch === 'i' || ch === 'l' ? 3.6 : ch === 'f' || ch === 't' ? 4.4 : 7;
  return w;
}

/**
 * A drawing on a 340-unit-wide canvas (1 unit = 1 px, y up), with text labels centred at the given points.
 * Labels are drawn by invisible anchor points (the renderer puts text 8 px right of and 8 px above a point).
 */
function drawing(h: number, d: { polylines?: Array<{ points: P[]; color?: 'brand' | 'accent' | 'muted' }>; segments?: PlaneSegment[]; labels?: Array<[P, string]>; dots?: PlanePoint[] }, caption?: string): PlaneFigure {
  const labels: PlanePoint[] = (d.labels ?? []).map(([[x, y], text]) => ({ x: r2(x - 8 - textWidth(text) / 2), y: r2(y - 12), label: text, color: 'muted', open: true }));
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: 340, yMin: 0, yMax: h, step: 340 },
    hideTickLabels: true,
    ...(d.polylines ? { polylines: d.polylines.map((p) => ({ ...p, points: p.points.map(([x, y]) => [r2(x), r2(y)] as P) })) } : {}),
    ...(d.segments ? { segments: d.segments } : {}),
    points: [...(d.dots ?? []), ...labels],
    ...(caption ? { caption } : {}),
  };
}

/** Sample y = f(x) on [a, b] and keep the parts inside [yMin, yMax]. */
function sample(f: (x: number) => number, a: number, b: number, yMin: number, yMax: number, n = 120): P[][] {
  const out: P[][] = [];
  let cur: P[] = [];
  for (let i = 0; i <= n; i++) {
    const x = a + ((b - a) * i) / n;
    const y = f(x);
    if (!Number.isFinite(y) || y < yMin - 1e-9 || y > yMax + 1e-9) {
      if (cur.length > 1) out.push(cur);
      cur = [];
      continue;
    }
    cur.push([r3(x), r3(y)]);
  }
  if (cur.length > 1) out.push(cur);
  return out;
}

function ladderFig(x: number, y: number, L: string, labels: { ra: string; rb: string }): RightTriangleFigure {
  return { type: 'rightTriangle', vertices: { right: 'C', a: 'A', b: 'B' }, legA: x, legB: y, sideLabels: { ra: labels.ra, rb: labels.rb, ab: L }, scene: 'ladder' };
}

/** Two roads meeting at right angles, with a vehicle on each and the distance between them. */
function carsFig(x: number, y: number, northArrowUp: boolean, eastArrowRight: boolean): PlaneFigure {
  const s = 200 / Math.max(x, y);
  const O: P = [70, 30];
  const N: P = [O[0], O[1] + x * s];
  const E: P = [O[0] + y * s, O[1]];
  const arrN: PlaneSegment = northArrowUp ? { from: N, to: [N[0], N[1] + 22], color: 'accent', arrowEnd: true } : { from: N, to: [N[0], N[1] - 22], color: 'accent', arrowEnd: true };
  const arrE: PlaneSegment = eastArrowRight ? { from: E, to: [E[0] + 22, E[1]], color: 'accent', arrowEnd: true } : { from: E, to: [E[0] - 22, E[1]], color: 'accent', arrowEnd: true };
  return drawing(
    N[1] + 40,
    {
      segments: [
        { from: [O[0], 10], to: [O[0], N[1] + 30], color: 'muted' },
        { from: [20, O[1]], to: [Math.min(335, E[0] + 30), O[1]], color: 'muted' },
        { from: N, to: E, dashed: true },
        arrN,
        arrE,
      ],
      dots: [{ x: N[0], y: N[1] }, { x: E[0], y: E[1] }],
      labels: [
        [[O[0] - 14, (O[1] + N[1]) / 2], 'x'],
        [[(O[0] + E[0]) / 2, O[1] - 14], 'y'],
        [[(N[0] + E[0]) / 2 + 20, (N[1] + E[1]) / 2 + 20], 'D'],
        [[O[0] - 12, O[1] - 12], 'O'],
        [[N[0] + 20, N[1] + 2], 'A'],
        [[E[0] + 16, E[1] + 22], 'B'],
      ],
    },
    'Car A travels on the north–south road and car B on the east–west road; D is the distance between them.',
  );
}

// ---------------------------------------------------------------------------
// 7.1 — Optimization
// ---------------------------------------------------------------------------

/** Sheets whose best cut (an open box from a rectangle) is a whole or half centimetre. */
const BOX_SHEETS: Array<[number, number]> = [
  [16, 10], [21, 16], [24, 9], [24, 15], [30, 14], [32, 20], [40, 25], [45, 24], [48, 18], [48, 30], [60, 28], [42, 32], [15, 7], [35, 11], [45, 21],
  [12, 12], [18, 18], [24, 24], [30, 30], [36, 36],
];

function sheetFig(L: number, W: number): PlaneFigure {
  const s = Math.min(280 / L, 170 / W);
  const w = L * s;
  const h = W * s;
  const x0 = (340 - w) / 2 + 10;
  const y0 = 30;
  const c = Math.min(w, h) * 0.17;
  const cut: PlaneSegment[] = [];
  for (const [cx, cy, sx, sy] of [[x0, y0, 1, 1], [x0 + w, y0, -1, 1], [x0, y0 + h, 1, -1], [x0 + w, y0 + h, -1, -1]] as const) {
    cut.push({ from: [cx + sx * c, cy], to: [cx + sx * c, cy + sy * c], color: 'accent' });
    cut.push({ from: [cx, cy + sy * c], to: [cx + sx * c, cy + sy * c], color: 'accent' });
  }
  const fold: PlaneSegment[] = [
    { from: [x0 + c, y0 + c], to: [x0 + w - c, y0 + c], dashed: true, color: 'muted' },
    { from: [x0 + c, y0 + h - c], to: [x0 + w - c, y0 + h - c], dashed: true, color: 'muted' },
    { from: [x0 + c, y0 + c], to: [x0 + c, y0 + h - c], dashed: true, color: 'muted' },
    { from: [x0 + w - c, y0 + c], to: [x0 + w - c, y0 + h - c], dashed: true, color: 'muted' },
  ];
  return drawing(
    y0 + h + 30,
    {
      polylines: [{ points: [[x0, y0], [x0 + w, y0], [x0 + w, y0 + h], [x0, y0 + h], [x0, y0]] }],
      segments: [...cut, ...fold],
      labels: [
        [[x0 + w / 2, y0 - 14], `${L} cm`],
        [[x0 - 8 - textWidth(`${W} cm`) / 2, y0 + h / 2], `${W} cm`],
        [[x0 + c / 2, y0 + h + 20], 'x'],
        [[x0 + w + 20, y0 + h - c / 2], 'x'],
      ],
    },
    'Squares of side x are cut from the corners; the sheet is folded up along the dashed lines.',
  );
}

function fenceFig(river: boolean, pens: number): PlaneFigure {
  const [x0, x1, yb, yt] = [40, 300, 30, 150];
  const segs: PlaneSegment[] = [];
  for (let i = 1; i < pens; i++) {
    const x = x0 + ((x1 - x0) * i) / pens;
    segs.push({ from: [x, yb], to: [x, yt] });
  }
  const labels: Array<[P, string]> = [
    [[x0 - 12, (yb + yt) / 2], 'x'],
    [[(x0 + x1) / 2, yb - 13], 'y'],
  ];
  if (river) {
    segs.push({ from: [10, yt + 4], to: [330, yt + 4], color: 'accent' });
    labels.push([[(x0 + x1) / 2, yt + 24], 'river']);
    return drawing(yt + 36, { polylines: [{ points: [[x0, yt], [x0, yb], [x1, yb], [x1, yt]] }], segments: segs, labels }, 'The side along the river needs no fence.');
  }
  return drawing(yt + 14, { polylines: [{ points: [[x0, yt], [x0, yb], [x1, yb], [x1, yt], [x0, yt]] }], segments: segs, labels });
}

function crossingFig(w: string, d: string, end: string): PlaneFigure {
  const [yb, yt] = [40, 150];
  const A: P = [50, yb];
  const Pp: P = [190, yt];
  const C: P = [300, yt];
  return drawing(
    200,
    {
      segments: [
        { from: [10, yb], to: [330, yb], color: 'muted' },
        { from: [10, yt], to: [330, yt], color: 'muted' },
        { from: A, to: Pp, color: 'accent', arrowEnd: true },
        { from: Pp, to: C, color: 'brand', arrowEnd: true },
        { from: [A[0], yb], to: [A[0], yt], dashed: true, color: 'muted' },
      ],
      dots: [{ x: A[0], y: A[1] }, { x: C[0], y: C[1] }],
      labels: [
        [[A[0] - 14 - textWidth(w) / 2, (yb + yt) / 2], w],
        [[(A[0] + Pp[0]) / 2, yt + 20], 'x'],
        [[Pp[0], yt + 20], 'P'],
        [[(A[0] + C[0]) / 2, yt + 40], d],
        [[C[0], yt + 20], end],
        [[A[0], yb - 13], 'start'],
      ],
    },
    `The route crosses to P, a distance x downstream from the point directly across, then follows the bank.`,
  );
}

const optimization = skill({
  id: 'm31-optimization',
  name: 'Optimization',
  description: 'Model a quantity with a function of one variable, state its domain, and use derivatives to find and verify the maximum or minimum.',
  outcomes: ['DA2'],
  lessonId: 'm31-7-1',
  calculator: true,
  gen(rng, d): GenOutput {
    const kind =
      d === 1
        ? rng.pick(['riverModel', 'revenueModel', 'numbers', 'avgCost'] as const)
        : d === 2
          ? rng.pick(['fence', 'fence', 'box', 'revenue', 'profit', 'drug'] as const)
          : rng.pick(['can', 'closest', 'crossing', 'cable', 'openBox', 'inscribed', 'fenceCost'] as const);
    const name = rng.pick(NAMES);

    // ---------------- difficulty 1: the function is given ----------------
    if (kind === 'riverModel') {
      const P = rng.pick([200, 240, 300, 360, 400, 480, 600, 800, 1000, 1200]);
      const what = rng.pick(['field', 'pasture', 'garden', 'paddock']);
      const x = P / 4;
      const A = (P * P) / 8;
      return {
        prompt: `${name} has $${P}$ m of fencing to enclose a rectangular ${what} beside a straight river. No fence is needed along the river. If $x$ is the length of each side perpendicular to the river, the area is $$A(x) = x(${P} - 2x), \\qquad 0 < x < ${P / 2}.$$ Find the value of $x$ that gives the largest area, and the largest area.`,
        parts: [numPart(x, { label: '$x =$', suffix: 'm' }), numPart(A, { label: 'Largest area', suffix: 'm²' })],
        hints: ['Expand $A(x)$, differentiate, and solve $A\'(x) = 0$.', 'Check that the critical number gives a maximum (for example, $A\'\'(x) < 0$), then substitute it into $A(x)$.'],
        solution: [
          `$A(x) = ${P}x - 2x^2$, so $A'(x) = ${P} - 4x$.`,
          `$A'(x) = 0 \\Rightarrow x = \\dfrac{${P}}{4} = ${x}$`,
          `$A''(x) = -4 < 0$, so the graph of $A$ is concave down and $x = ${x}$ gives the maximum. (The area is close to $0$ at both ends of the domain.)`,
          `$A(${x}) = ${x}(${P} - ${2 * x}) = ${x}(${P / 2}) = ${dec(A)}$`,
          `The largest area is $${dec(A)}$ m², when $x = ${x}$ m.`,
        ],
        calculator: false,
      };
    }

    if (kind === 'revenueModel') {
      const k = rng.pick([10, 20, 25, 40, 50]);
      const p = rng.pick([8, 9, 12, 15, 18, 20, 24, 25, 30]) + (k % 2 === 0 && rng.chance(0.35) ? 0.5 : 0);
      const N = 2 * k * p;
      const R = k * p * p;
      const c = rng.pick([
        { who: 'A community theatre in Westbury', item: 'tickets', per: 'per show' },
        { who: 'A bike rental shop in Stonebridge', item: 'rentals', per: 'per day' },
        { who: 'A honey producer at the Riverton farmers’ market', item: 'jars', per: 'per week' },
        { who: 'A climbing gym in Ashford', item: 'day passes', per: 'per week' },
      ]);
      return {
        prompt: `${c.who} finds that when the price is $p$ dollars, it sells $${N} - ${k}p$ ${c.item} ${c.per}, so its revenue, in dollars, is $$R(p) = p(${N} - ${k}p) = ${N}p - ${k}p^2.$$ What price gives the maximum revenue, and what is the maximum revenue? Give both to the nearest cent.`,
        parts: [moneyPart(p, 'Price: \\$'), moneyPart(R, 'Maximum revenue: \\$')],
        hints: ['Solve $R\'(p) = 0$.', 'Confirm a maximum with $R\'\'(p)$, then evaluate $R$ at that price.'],
        solution: [
          `The domain is $0 \\le p \\le ${tn(N / k)}$ (the number sold cannot be negative).`,
          `$R'(p) = ${N} - ${2 * k}p = 0 \\Rightarrow p = \\dfrac{${N}}{${2 * k}} = ${dec(p)}$`,
          `$R''(p) = -${2 * k} < 0$, so this critical number gives the maximum.`,
          `$R(${dec(p)}) = ${dec(p)}(${N} - ${k}(${dec(p)})) = ${dec(p)}(${dec(N - k * p)}) = ${cents(R, true)}$`,
          `The best price is ${money(p)}, for a maximum revenue of ${money(R)} ${c.per}.`,
        ],
      };
    }

    if (kind === 'numbers') {
      if (rng.chance(0.5)) {
        const S = rng.pick([20, 30, 36, 50, 64, 80, 100, 15, 27]);
        const x = S / 2;
        return {
          prompt: `Two positive numbers have a sum of $${S}$. If $x$ is one of them, their product is $$P(x) = x(${S} - x), \\qquad 0 < x < ${S}.$$ Find the value of $x$ that makes the product as large as possible, and the largest product.`,
          parts: [numPart(x, { label: '$x =$' }), numPart(x * x, { label: 'Largest product' })],
          hints: ['Expand $P(x)$ and solve $P\'(x) = 0$.', 'Check with $P\'\'(x)$ that it is a maximum, then evaluate $P$.'],
          solution: [
            `$P(x) = ${S}x - x^2$, so $P'(x) = ${S} - 2x$.`,
            `$P'(x) = 0 \\Rightarrow x = ${tn(x)}$`,
            `$P''(x) = -2 < 0$, so this is a maximum.`,
            `$P(${tn(x)}) = ${tn(x)}(${S} - ${tn(x)}) = ${tn(x * x)}$`,
            `The product is largest, $${tn(x * x)}$, when $x = ${tn(x)}$ (both numbers are $${tn(x)}$).`,
          ],
          calculator: false,
        };
      }
      const D = rng.pick([8, 10, 12, 16, 20, 30, 9, 15]);
      const x = -D / 2;
      return {
        prompt: `Two numbers differ by $${D}$. If $x$ is the smaller number, their product is $$P(x) = x(x + ${D}).$$ Find the smaller number that makes the product as small as possible, and the smallest product.`,
        parts: [numPart(x, { label: '$x =$' }), numPart(-(D * D) / 4, { label: 'Smallest product' })],
        hints: ['Expand $P(x)$ and solve $P\'(x) = 0$.', 'Check with $P\'\'(x)$ that it is a minimum, then evaluate $P$.'],
        solution: [
          `$P(x) = x^2 + ${D}x$, so $P'(x) = 2x + ${D}$.`,
          `$P'(x) = 0 \\Rightarrow x = ${tn(x)}$`,
          `$P''(x) = 2 > 0$, so this is a minimum.`,
          `$P(${tn(x)}) = ${tn(x)}(${tn(x)} + ${D}) = ${tn(x)}(${tn(x + D)}) = ${tn(-(D * D) / 4)}$`,
          `The product is smallest, $${tn(-(D * D) / 4)}$, when the numbers are $${tn(x)}$ and $${tn(x + D)}$.`,
        ],
        calculator: false,
      };
    }

    if (kind === 'avgCost') {
      const { a, x, c } = retry(
        () => {
          const x = rng.pick([20, 40, 50, 100, 200, 250]);
          const a = rng.pick([0.01, 0.02, 0.05, 0.1, 0.5]);
          return { a, x, c: Math.round(a * x * x * 1e6) / 1e6 };
        },
        (o) => Number.isInteger(o.c) && o.c >= 50 && o.c <= 5000 && o.a * o.x >= 1,
        200,
      );
      const b = rng.pick([12, 15, 20, 25, 30, 45]);
      const min = 2 * a * x + b;
      const c2 = rng.pick([
        { who: 'a furniture workshop in Hillcrest', item: 'chair', items: 'chairs' },
        { who: 'a kombucha maker in Stonebridge', item: 'case', items: 'cases' },
        { who: 'a print shop in Pinewood', item: 'poster', items: 'posters' },
        { who: 'a canoe maker in Clearwater', item: 'paddle', items: 'paddles' },
      ]);
      return {
        prompt: `When ${c2.who} makes $x$ ${c2.items} a week, the average cost per ${c2.item}, in dollars, is $$\\bar{C}(x) = ${dec(a)}x + ${b} + \\dfrac{${c}}{x}, \\qquad x > 0.$$ How many ${c2.items} should it make each week to minimize the average cost, and what is the minimum average cost? Give the cost to the nearest cent.`,
        parts: [numPart(x, { label: 'Number of ' + c2.items }), moneyPart(min, 'Minimum average cost: \\$')],
        hints: ['Write $\\dfrac{' + c + '}{x}$ as $' + c + 'x^{-1}$ before differentiating, then solve $\\bar{C}\'(x) = 0$ for $x > 0$.', 'Check with $\\bar{C}\'\'(x)$ that it is a minimum, then evaluate $\\bar{C}$.'],
        solution: [
          `$\\bar{C}'(x) = ${dec(a)} - \\dfrac{${c}}{x^2}$`,
          `$\\bar{C}'(x) = 0 \\Rightarrow x^2 = \\dfrac{${c}}{${dec(a)}} = ${dec(x * x)} \\Rightarrow x = ${x}$ (since $x > 0$)`,
          `$\\bar{C}''(x) = \\dfrac{${2 * c}}{x^3} > 0$ for $x > 0$, so this is a minimum.`,
          `$\\bar{C}(${x}) = ${dec(a)}(${x}) + ${b} + \\dfrac{${c}}{${x}} = ${dec(a * x)} + ${b} + ${dec(c / x)} = ${dec(min)}$`,
          `Making $${x}$ ${c2.items} a week gives the minimum average cost, ${money(min)} per ${c2.item}.`,
        ],
      };
    }

    // ---------------- difficulty 2: build the model ----------------
    if (kind === 'fence') {
      const river = rng.chance(0.6);
      const n = rng.pick(river ? [1, 1, 2, 3] : [2, 3]);
      const m = river ? 1 : 2;
      const x0 = rng.pick([10, 12, 15, 20, 24, 25, 30, 40, 50, 60]);
      const P = 2 * (n + 1) * x0;
      const y0 = ((n + 1) * x0) / m;
      const A = x0 * y0;
      const what = river ? rng.pick(['pasture', 'field', 'garden']) : rng.pick(['corral', 'set of dog runs', 'garden']);
      const divide = n === 1 ? '' : river ? `, divided into ${n} equal pens by ${n === 2 ? 'a fence' : `${n - 1} fences`} perpendicular to the river` : '';
      const prompt = river
        ? `${name} has $${P}$ m of fencing to build a rectangular ${what} beside a straight river${divide}. No fence is needed along the river. What dimensions give the largest total area, and what is that area?`
        : `${name} has $${P}$ m of fencing to build a rectangular ${what} divided into ${n} equal sections by ${n === 2 ? 'a fence' : `${n - 1} fences`} parallel to two of its sides, as shown. What dimensions give the largest total area, and what is that area?`;
      const yExpr = m === 1 ? `${P} - ${n + 1}x` : `\\dfrac{${P} - ${n + 1}x}{2}`;
      const Aexp = m === 1 ? poly([[P, 'x'], [-(n + 1), 'x^2']]) : `${tn(P / 2)}x - ${tn((n + 1) / 2)}x^2`;
      const Aprime = m === 1 ? `${P} - ${2 * (n + 1)}x` : `${tn(P / 2)} - ${tn(n + 1)}x`;
      const A2 = m === 1 ? 2 * (n + 1) : n + 1;
      return {
        prompt,
        figure: fenceFig(river, n),
        parts: [
          numPart(x0, { label: river ? 'Each side $x$ (perpendicular to the river)' : 'Each side $x$ (parallel to the dividers)', suffix: 'm' }),
          numPart(y0, { label: river ? 'Side $y$ (along the river)' : 'Side $y$', suffix: 'm', display: 'decimal' }),
          numPart(A, { label: 'Largest area', suffix: 'm²', display: 'decimal' }),
        ],
        hints: [
          `Write the fencing constraint as an equation in $x$ and $y$ (count the fences of length $x$), solve it for $y$, and write the area as a function of $x$ alone.`,
          'Find the critical number of $A(x)$ in its domain and check that it gives a maximum.',
        ],
        solution: [
          `There are $${n + 1}$ fences of length $x$ and ${m === 1 ? 'one' : 'two'} of length $y$: $${n + 1}x + ${m === 1 ? '' : '2'}y = ${P}$, so $y = ${yExpr}$.`,
          `Area: $A(x) = xy = ${Aexp}$, with domain $0 < x < ${tn(P / (n + 1))}$.`,
          `$A'(x) = ${Aprime} = 0 \\Rightarrow x = ${x0}$`,
          `$A''(x) = -${A2} < 0$, so this is a maximum.`,
          `$y = ${m === 1 ? `${P} - ${n + 1}(${x0})` : `\\dfrac{${P} - ${n + 1}(${x0})}{2}`} = ${tn(y0)}$ and $A = ${x0} \\times ${tn(y0)} = ${dec(A)}$`,
          `Use $x = ${x0}$ m and $y = ${tn(y0)}$ m, for a largest area of $${dec(A)}$ m².`,
        ],
        calculator: false,
      };
    }

    if (kind === 'box') {
      const [L, W] = rng.pick(BOX_SHEETS);
      const s = Math.sqrt(L * L - L * W + W * W);
      const x = (L + W - s) / 6;
      const xBig = (L + W + s) / 6;
      const V = x * (L - 2 * x) * (W - 2 * x);
      const mat = rng.pick(['cardboard', 'sheet metal', 'tin', 'plastic']);
      const b = 4 * (L + W);
      const disc = b * b - 48 * L * W;
      return {
        prompt: `An open-top box is made from a ${L === W ? 'square' : 'rectangular'} sheet of ${mat} that measures $${L}$ cm by $${W}$ cm, by cutting a square with sides of $x$ cm from each corner and folding up the sides. Find the value of $x$ that gives the largest volume, and the largest volume.`,
        figure: sheetFig(L, W),
        parts: [numPart(x, { label: '$x =$', suffix: 'cm', display: 'decimal' }), numPart(V, { label: 'Largest volume', suffix: 'cm³' })],
        hints: ['The box is $x$ cm high; its length and width are each reduced by $2x$. State the domain of $x$.', 'Expand $V(x)$, solve the quadratic equation $V\'(x) = 0$, and keep the root that is in the domain.'],
        solution: [
          `The box is $${L} - 2x$ cm long, $${W} - 2x$ cm wide and $x$ cm high, so $V(x) = x(${L} - 2x)(${W} - 2x) = ${poly([[4, 'x^3'], [-2 * (L + W), 'x^2'], [L * W, 'x']])}$, with domain $0 < x < ${tn(W / 2)}$.`,
          `$V'(x) = ${poly([[12, 'x^2'], [-b, 'x'], [L * W, '']])} = 0 \\Rightarrow x = \\dfrac{${b} \\pm \\sqrt{${disc}}}{24} = \\dfrac{${b} \\pm ${Math.round(Math.sqrt(disc))}}{24}$, so $x = ${tn(x)}$ or $x = ${tn(xBig)}$.`,
          `Only $x = ${tn(x)}$ is in the domain. $V$ is $0$ at both ends of the domain and positive between them, so this critical number gives the maximum.`,
          `$V(${tn(x)}) = ${tn(x)}(${tn(L - 2 * x)})(${tn(W - 2 * x)}) = ${dec(V)}$`,
          `Cut squares with sides of $${dec(x)}$ cm; the largest volume is $${dec(V)}$ cm³.`,
        ],
        calculator: true,
      };
    }

    if (kind === 'revenue') {
      const up = rng.chance(0.6);
      const c = up
        ? rng.pick([
            { who: 'A climbing gym in Hillcrest has', base: (N: number, P: string) => `${N} members who each pay ${P} per month`, change: (s: string, k: number) => `For every ${s} increase in the monthly fee, ${k} members would cancel`, noun: 'monthly fee', unit: 'members', Ps: [40, 50, 60], ss: [1, 2, 5], ks: [4, 5, 8, 10] },
            { who: 'A junior hockey team in Westbury', base: (N: number, P: string) => `sells ${N} tickets per game at ${P} each`, change: (s: string, k: number) => `For every ${s} increase in the ticket price, ${k} fewer tickets are sold`, noun: 'ticket price', unit: 'tickets sold', Ps: [12, 15, 18, 20], ss: [1, 0.5], ks: [40, 50, 60, 80] },
            { who: 'A bus tour company in Stonebridge', base: (N: number, P: string) => `books ${N} seats a week at ${P} each`, change: (s: string, k: number) => `For every ${s} increase in price, it books ${k} fewer seats`, noun: 'price', unit: 'seats booked', Ps: [60, 80, 90], ss: [2, 5], ks: [5, 6, 8, 10] },
          ])
        : rng.pick([
            { who: 'A food truck in Brookfield', base: (N: number, P: string) => `sells ${N} burritos a day at ${P} each`, change: (s: string, k: number) => `For every ${s} decrease in price, it would sell ${k} more burritos a day`, noun: 'price', unit: 'burritos sold', Ps: [12, 14, 15, 16], ss: [0.5, 1], ks: [10, 12, 15, 20] },
            { who: 'A ski rental shop in Maple Falls', base: (N: number, P: string) => `rents ${N} sets of skis a day at ${P} a set`, change: (s: string, k: number) => `For every ${s} decrease in price, it would rent ${k} more sets a day`, noun: 'price', unit: 'sets rented', Ps: [40, 45, 50], ss: [1, 2.5, 5], ks: [3, 4, 5, 6] },
          ]);
      const { P, s, k, xs } = retry(
        () => ({ P: rng.pick(c.Ps), s: rng.pick(c.ss), k: rng.pick(c.ks), xs: rng.int(2, 8) }),
        (o) => Number.isInteger(o.P / o.s) && (up || o.P / o.s - 2 * o.xs >= 2),
        200,
      );
      const N = up ? k * (P / s + 2 * xs) : k * (P / s - 2 * xs);
      const price = up ? P + s * xs : P - s * xs;
      const sold = up ? N - k * xs : N + k * xs;
      const R = price * sold;
      const lin = 2 * k * s * xs; // R'(x) = lin - 2ks x
      return {
        prompt: `${c.who} ${c.base(N, money(P))}. ${c.change(money(s), k)}. What ${c.noun} gives the maximum revenue, and what is the maximum revenue? Give both to the nearest cent.`,
        parts: [moneyPart(price, `${c.noun[0].toUpperCase()}${c.noun.slice(1)}: \\$`), moneyPart(R, 'Maximum revenue: \\$')],
        hints: [`Let $x$ be the number of ${money(s)} ${up ? 'increases' : 'decreases'}. Write the ${c.noun} and the number of ${c.unit} in terms of $x$; revenue is their product.`, 'Solve $R\'(x) = 0$, check that it is a maximum, then find the price and the revenue.'],
        solution: [
          `Let $x$ be the number of ${money(s)} ${up ? 'increases' : 'decreases'}. The ${c.noun} is $${P} ${up ? '+' : '-'} ${dec(s)}x$ dollars and the number of ${c.unit} is $${N} ${up ? '-' : '+'} ${k}x$.`,
          `$R(x) = (${P} ${up ? '+' : '-'} ${dec(s)}x)(${N} ${up ? '-' : '+'} ${k}x) = ${poly([[P * N, ''], [lin, 'x'], [-k * s, 'x^2']])}$, for $0 \\le x \\le ${tn(up ? N / k : P / s)}$.`,
          `$R'(x) = ${poly([[lin, ''], [-2 * k * s, 'x']])} = 0 \\Rightarrow x = ${xs}$. $R''(x) = -${dec(2 * k * s)} < 0$, so this is a maximum.`,
          `${c.noun[0].toUpperCase()}${c.noun.slice(1)}: $${P} ${up ? '+' : '-'} ${dec(s)}(${xs}) = ${dec(price)}$ dollars; number of ${c.unit}: $${N} ${up ? '-' : '+'} ${k}(${xs}) = ${sold}$.`,
          `Revenue: $${cents(price, true)} \\times ${sold} = ${cents(R, true)}$ dollars.`,
          `The best ${c.noun} is ${money(price)}, for a maximum revenue of ${money(R)}.`,
        ],
        calculator: true,
      };
    }

    if (kind === 'profit') {
      const c = rng.pick([
        { who: 'A bakery in Ashford', items: 'loaves of bread', unit: 'loaf', per: 'a week' },
        { who: 'A greenhouse near Elmwood', items: 'hanging baskets', unit: 'basket', per: 'a month' },
        { who: 'A print shop in Lakeside', items: 'T-shirts', unit: 'T-shirt', per: 'a week' },
        { who: 'A small company in Oakridge', items: 'phone cases', unit: 'case', per: 'a month' },
      ]);
      const { a, c1, b } = retry(
        () => ({ a: rng.pick([8, 10, 12, 15, 20, 24]), c1: rng.int(2, 10), b: rng.pick([0.01, 0.02, 0.005, 0.004]) }),
        (o) => o.a - o.c1 >= 3 && Number.isInteger(Math.round(((o.a - o.c1) / (2 * o.b)) * 1e6) / 1e6) && (o.a - o.c1) / (2 * o.b) <= 2000,
        200,
      );
      const x = Math.round((a - c1) / (2 * b));
      const top = (a - c1) * x - b * x * x;
      const c0 = rng.pick([0.3, 0.4, 0.5]) * top;
      const fixed = Math.round(c0 / 50) * 50;
      const profit = top - fixed;
      return {
        prompt: `${c.who} can sell $x$ ${c.items} ${c.per} when the price is $p(x) = ${a} - ${dec(b)}x$ dollars per ${c.unit}. Making $x$ ${c.items} costs $C(x) = ${dec(fixed)} + ${c1}x$ dollars. How many ${c.items} should it make and sell ${c.per} to maximize its profit, and what is the maximum profit? Give the profit to the nearest cent.`,
        parts: [numPart(x, { label: `Number of ${c.items}` }), moneyPart(profit, 'Maximum profit: \\$')],
        hints: ['Revenue is (number sold) × (price): $R(x) = x\\,p(x)$. Profit is revenue minus cost.', 'Solve $P\'(x) = 0$ and check that it is a maximum.'],
        solution: [
          `Revenue: $R(x) = x\\,p(x) = ${a}x - ${dec(b)}x^2$, for $0 \\le x \\le ${dec(a / b)}$ (the price cannot be negative).`,
          `Profit: $P(x) = R(x) - C(x) = ${poly([[-b, 'x^2'], [a - c1, 'x'], [-fixed, '']])}$`,
          `$P'(x) = ${a - c1} - ${dec(2 * b)}x = 0 \\Rightarrow x = \\dfrac{${a - c1}}{${dec(2 * b)}} = ${dec(x)}$`,
          `$P''(x) = -${dec(2 * b)} < 0$, so this is a maximum.`,
          `$P(${x}) = -${dec(b)}(${x})^2 + ${a - c1}(${x}) - ${dec(fixed)} = ${dec(profit)}$`,
          `Selling $${dec(x)}$ ${c.items} ${c.per} gives the maximum profit, ${money(profit)}.`,
        ],
      };
    }

    if (kind === 'drug') {
      const a = rng.pick([1, 2, 3, 4]);
      if (rng.chance(0.5)) {
        const m = rng.pick([2, 3, 4, 5, 6, 8]);
        const k = 2 * a * m;
        return {
          prompt: `The concentration of a medication in a patient's blood $t$ hours after an injection is $$C(t) = \\dfrac{${k}t}{t^2 + ${a * a}}$$ milligrams per litre, for $t \\ge 0$. When is the concentration greatest, and what is the greatest concentration?`,
          parts: [numPart(a, { label: 'Time', suffix: 'h' }), numPart(m, { label: 'Greatest concentration', suffix: 'mg/L' })],
          hints: ['Use the quotient rule and set the numerator of $C\'(t)$ equal to $0$.', 'Check the sign of $C\'(t)$ on each side of the critical number (or compare with $C(0)$ and the long-run behaviour).'],
          solution: [
            `$C'(t) = \\dfrac{${k}(t^2 + ${a * a}) - ${k}t(2t)}{(t^2 + ${a * a})^2} = \\dfrac{${k}(${a * a} - t^2)}{(t^2 + ${a * a})^2}$`,
            `$C'(t) = 0$ when $t^2 = ${a * a}$, so $t = ${a}$ (since $t \\ge 0$).`,
            `$C'(t) > 0$ for $0 \\le t < ${a}$ and $C'(t) < 0$ for $t > ${a}$: the concentration rises, then falls, so $t = ${a}$ gives the maximum.`,
            `$C(${a}) = \\dfrac{${k}(${a})}{${a * a} + ${a * a}} = \\dfrac{${k * a}}{${2 * a * a}} = ${m}$`,
            `The concentration is greatest, $${m}$ mg/L, after $${a}$ h.`,
          ],
        };
      }
      const k = rng.pick([4, 5, 6, 8, 10, 12]);
      const ex = a === 1 ? '-t' : `-t/${a}`;
      const Cmax = (k * a) / Math.E;
      return {
        prompt: `The concentration of a medication in a patient's blood $t$ hours after it is taken is $C(t) = ${k}te^{${ex}}$ milligrams per litre, for $t \\ge 0$. When is the concentration greatest, and what is the greatest concentration? Give the concentration exactly or to the nearest hundredth.`,
        parts: [numPart(a, { label: 'Time', suffix: 'h' }), exactPart(Cmax, 2, { label: 'Greatest concentration', suffix: 'mg/L', exact: `${k * a}/e` })],
        hints: ['Use the product rule and factor out the exponential.', 'An exponential is never $0$, so set the other factor equal to $0$; then check the sign of $C\'(t)$ on each side.'],
        solution: [
          a === 1 ? `$C'(t) = ${k}e^{-t} - ${k}te^{-t} = ${k}e^{-t}(1 - t)$` : `$C'(t) = ${k}e^{${ex}} + ${k}t\\left(-\\dfrac{1}{${a}}\\right)e^{${ex}} = ${k}e^{${ex}}\\left(1 - \\dfrac{t}{${a}}\\right)$`,
          `$e^{${ex}} > 0$, so $C'(t) = 0$ only when $t = ${a}$. $C' > 0$ before and $C' < 0$ after, so this is the maximum.`,
          `$C(${a}) = ${k}(${a})e^{-1} = \\dfrac{${k * a}}{e} \\approx ${fmtFixed(Cmax, 2)}$`,
          `The concentration is greatest, about $${fmtFixed(Cmax, 2)}$ mg/L, after $${a}$ h.`,
        ],
      };
    }

    // ---------------- difficulty 3 ----------------
    if (kind === 'can') {
      const variant = rng.pick(['closed', 'open', 'cost'] as const);
      const div = variant === 'closed' ? 2 : variant === 'open' ? 1 : 4; // r^3 = V / (div π), h = div r
      const V = retry(
        () => rng.pick([250, 330, 355, 473, 500, 750, 1000, 1500, 2000]),
        (v) => {
          const r = Math.cbrt(v / (div * Math.PI));
          return safeRound(r, 1) && safeRound(div * r, 1);
        },
      );
      const r = Math.cbrt(V / (div * Math.PI));
      const h = div * r;
      const prompt =
        variant === 'closed'
          ? `A packaging company is designing a closed cylindrical can that holds $${V}$ cm³ (${V} mL). Find the radius and height that use the least metal. Round both to the nearest tenth of a centimetre.`
          : variant === 'open'
            ? `A cylindrical tin with an open top (no lid) must hold $${V}$ cm³. Find the radius and height that use the least metal. Round both to the nearest tenth of a centimetre.`
            : `A closed cylindrical can must hold $${V}$ cm³. The metal for the top and bottom costs twice as much per square centimetre as the metal for the side. Find the radius and height that make the cost of the metal as small as possible. Round both to the nearest tenth of a centimetre.`;
      const fTex = variant === 'closed' ? `2\\pi r^2 + \\dfrac{${2 * V}}{r}` : variant === 'open' ? `\\pi r^2 + \\dfrac{${2 * V}}{r}` : `4\\pi r^2 + \\dfrac{${2 * V}}{r}`;
      const fpTex = variant === 'closed' ? `4\\pi r - \\dfrac{${2 * V}}{r^2}` : variant === 'open' ? `2\\pi r - \\dfrac{${2 * V}}{r^2}` : `8\\pi r - \\dfrac{${2 * V}}{r^2}`;
      const fppTex = variant === 'closed' ? `4\\pi + \\dfrac{${4 * V}}{r^3}` : variant === 'open' ? `2\\pi + \\dfrac{${4 * V}}{r^3}` : `8\\pi + \\dfrac{${4 * V}}{r^3}`;
      const cube = div === 1 ? `\\dfrac{${V}}{\\pi}` : `\\dfrac{${V}}{${div}\\pi}`;
      return {
        prompt,
        figure: { type: 'solid', shape: 'cylinder', labels: { r: 'r', h: 'h' } },
        parts: [numPart(r, { label: 'Radius', suffix: 'cm', decimals: 1 }), numPart(h, { label: 'Height', suffix: 'cm', decimals: 1 })],
        hints: [
          `Use the volume, $\\pi r^2 h = ${V}$, to write $h$ in terms of $r$, then write the ${variant === 'cost' ? 'cost' : 'area of metal'} as a function of $r$ alone.`,
          'Solve the derivative equal to $0$ for $r > 0$, check that it gives a minimum, then find $h$.',
        ],
        solution: [
          `Volume: $\\pi r^2 h = ${V}$, so $h = \\dfrac{${V}}{\\pi r^2}$.`,
          variant === 'closed'
            ? `Metal: $S = 2\\pi r^2 + 2\\pi rh = ${fTex}$, for $r > 0$.`
            : variant === 'open'
              ? `Metal (one end and the side): $S = \\pi r^2 + 2\\pi rh = ${fTex}$, for $r > 0$.`
              : `Cost, in units of the side's price per cm²: $C = 2(2\\pi r^2) + 2\\pi rh = ${fTex}$, for $r > 0$.`,
          `Derivative: $${fpTex} = 0 \\Rightarrow r^3 = ${cube} \\Rightarrow r = \\sqrt[3]{${cube}} \\approx ${fmtFixed(r, 3)}$`,
          `Second derivative: $${fppTex} > 0$ for $r > 0$, so this critical number gives the minimum.`,
          `$h = \\dfrac{${V}}{\\pi r^2} \\approx ${fmtFixed(h, 3)}$ (exactly $${div === 1 ? '' : div}r$${variant === 'closed' ? ': the height equals the diameter' : ''}).`,
          `The radius is about $${fmtFixed(r, 1)}$ cm and the height is about $${fmtFixed(h, 1)}$ cm.`,
        ],
      };
    }

    if (kind === 'closest') {
      const sub = rng.pick(['sqrt', 'parab', 'hyper'] as const);
      const closeHints = ['Write the distance from a general point on the curve to the given point, using the equation of the curve to replace $y$.', 'Minimize the square of the distance instead: it is smallest at the same point and has no square root.'];
      if (sub === 'sqrt') {
        const a = rng.pick([2.5, 3.5, 4.5, 5.5, 6.5, 9.5]);
        const x = a - 0.5;
        const n = 4 * a - 1; // D = √n / 2
        const xMax = Math.ceil(a) + 2;
        const yMax = Math.ceil(Math.sqrt(xMax)) + 1;
        const gx = r3(0.45 * a);
        return {
          prompt: `Find the point on the curve $y = \\sqrt{x}$ that is closest to the point $(${dec(a)}, 0)$, and the minimum distance. Give exact values or round to the nearest hundredth.`,
          figure: {
            type: 'plane',
            grid: { xMin: -1, xMax, yMin: -1, yMax },
            polylines: sample(Math.sqrt, 0, xMax, -1, yMax).map((points) => ({ points })),
            segments: [{ from: [a, 0], to: [gx, r3(Math.sqrt(gx))], dashed: true, color: 'accent' }],
            points: [{ x: a, y: 0, label: `(${dec(a)}, 0)` }, { x: gx, y: r3(Math.sqrt(gx)), label: '(x, √x)', color: 'accent' }],
          },
          parts: [valPart(x, '$x =$'), valPart(Math.sqrt(x), '$y =$', rootStr(x)), valPart(Math.sqrt(n) / 2, 'Minimum distance', halfRootStr(n))],
          hints: closeHints,
          solution: [
            `A point on the curve is $(x, \\sqrt{x})$, $x \\ge 0$. Its distance $D$ to $(${dec(a)}, 0)$ satisfies $D^2 = (x - ${dec(a)})^2 + (\\sqrt{x})^2 = (x - ${dec(a)})^2 + x$.`,
            `Let $f(x) = D^2$. Then $f'(x) = 2(x - ${dec(a)}) + 1 = 0 \\Rightarrow x = ${x}$.`,
            `$f''(x) = 2 > 0$, so this is a minimum. (At the endpoint $x = 0$, $f(0) = ${dec(a * a)}$, which is larger.)`,
            `$y = \\sqrt{${x}} = ${rootTex(x)}$ and $D = \\sqrt{f(${x})} = \\sqrt{${dec(0.25)} + ${x}} = ${halfRootTex(n)}${approx(Math.sqrt(n) / 2)}$`,
            `The closest point is $(${x}, ${rootTex(x)})$, at a distance of $${halfRootTex(n)}${approx(Math.sqrt(n) / 2)}$.`,
          ],
        };
      }
      if (sub === 'parab') {
        const b = rng.pick([2.5, 3.5, 4.5, 5.5, 6.5, 8.5]);
        const y = b - 0.5;
        const n = 4 * b - 1; // D = √n / 2
        const X = Math.ceil(Math.sqrt(b + 2));
        return {
          prompt: `Find the point in the first quadrant on the parabola $y = x^2$ that is closest to the point $(0, ${dec(b)})$, and the minimum distance. Give exact values or round to the nearest hundredth.`,
          figure: {
            type: 'plane',
            grid: { xMin: -X, xMax: X, yMin: -1, yMax: Math.ceil(b) + 2 },
            polylines: sample((t) => t * t, -X, X, -1, Math.ceil(b) + 2).map((points) => ({ points })),
            segments: [{ from: [0, b], to: [r3(0.6 * X), r3(0.36 * X * X)], dashed: true, color: 'accent' }],
            points: [{ x: 0, y: b, label: `(0, ${dec(b)})` }, { x: r3(0.6 * X), y: r3(0.36 * X * X), label: '(x, x²)', color: 'accent' }],
          },
          parts: [valPart(Math.sqrt(y), '$x =$', rootStr(y)), valPart(y, '$y =$'), valPart(Math.sqrt(n) / 2, 'Minimum distance', halfRootStr(n))],
          hints: closeHints,
          solution: [
            `A point on the parabola is $(x, x^2)$. Its distance $D$ to $(0, ${dec(b)})$ satisfies $D^2 = x^2 + (x^2 - ${dec(b)})^2$.`,
            `Let $f(x) = D^2$. Then $f'(x) = 2x + 2(x^2 - ${dec(b)})(2x) = 2x(2x^2 - ${dec(2 * b - 1)})$.`,
            `$f'(x) = 0$ when $x = 0$ or $x^2 = ${y}$. In the first quadrant, $x = ${rootTex(y)}$.`,
            `$f'$ changes from $-$ to $+$ at $x = ${rootTex(y)}$, so it is a minimum. (At $x = 0$ the distance is $${dec(b)}$, which is larger.)`,
            `$y = x^2 = ${y}$ and $D = \\sqrt{${y} + (${y} - ${dec(b)})^2} = \\sqrt{${dec(y + 0.25)}} = ${halfRootTex(n)}${approx(Math.sqrt(n) / 2)}$`,
            `The closest point is $(${rootTex(y)}, ${y})$, at a distance of $${halfRootTex(n)}${approx(Math.sqrt(n) / 2)}$.`,
          ],
        };
      }
      const k = rng.pick([1, 2, 4, 8, 9, 16]);
      const x = Math.sqrt(k);
      const X = Math.max(4, Math.ceil(2 * x) + 1);
      return {
        prompt: `Find the point on the curve $y = \\dfrac{${k}}{x}$, $x > 0$, that is closest to the origin, and the minimum distance. Give exact values or round to the nearest hundredth.`,
        figure: {
          type: 'plane',
          grid: { xMin: -1, xMax: X, yMin: -1, yMax: X },
          polylines: sample((t) => k / t, 0.05, X, -1, X, 300).map((points) => ({ points })),
          segments: [{ from: [0, 0], to: [r3(1.7 * x), r3(k / (1.7 * x))], dashed: true, color: 'accent' }],
          points: [{ x: 0, y: 0 }, { x: r3(1.7 * x), y: r3(k / (1.7 * x)), label: `(x, ${k}/x)`, color: 'accent' }],
        },
        parts: [valPart(x, '$x =$', rootStr(k)), valPart(x, '$y =$', rootStr(k)), valPart(Math.sqrt(2 * k), 'Minimum distance', rootStr(2 * k))],
        hints: closeHints,
        solution: [
          `A point on the curve is $\\left(x, \\dfrac{${k}}{x}\\right)$. Its distance $D$ to the origin satisfies $D^2 = x^2 + \\dfrac{${k * k}}{x^2}$.`,
          `Let $f(x) = D^2$. Then $f'(x) = 2x - \\dfrac{${2 * k * k}}{x^3} = 0 \\Rightarrow x^4 = ${k * k} \\Rightarrow x = ${rootTex(k)}$ (since $x > 0$).`,
          `$f''(x) = 2 + \\dfrac{${6 * k * k}}{x^4} > 0$, so this is a minimum.`,
          `$y = \\dfrac{${k}}{${rootTex(k)}} = ${rootTex(k)}$ and $D = \\sqrt{${k} + ${k}} = ${rootTex(2 * k)}${approx(Math.sqrt(2 * k))}$`,
          `The closest point is $(${rootTex(k)}, ${rootTex(k)})$, at a distance of $${rootTex(2 * k)}${approx(Math.sqrt(2 * k))}$.`,
        ],
      };
    }

    if (kind === 'crossing') {
      const cfg = rng.pick([
        { vs: 1.2, vr: 2, u: 'm', tu: 's', ws: [200, 300, 400], sv: 'swim', rv: 'run', dp: 1 },
        { vs: 1.5, vr: 2.5, u: 'm', tu: 's', ws: [200, 400, 600], sv: 'swim', rv: 'run', dp: 1 },
        { vs: 1, vr: 2.6, u: 'm', tu: 's', ws: [240, 360, 480], sv: 'swim', rv: 'run', dp: 1 },
        { vs: 3, vr: 5, u: 'km', tu: 'h', ws: [2, 4, 1.2], sv: 'row', rv: 'walk', dp: 2 },
        { vs: 4, vr: 5, u: 'km', tu: 'h', ws: [1.5, 3, 0.9], sv: 'row', rv: 'walk', dp: 2 },
      ]);
      const [who, pr] = rng.pick(PEOPLE);
      const w = rng.pick(cfg.ws);
      const x = (w * cfg.vs) / Math.sqrt(cfg.vr ** 2 - cfg.vs ** 2);
      const xr = Math.round(x * 1000) / 1000;
      const time = (t: number, end: number) => Math.sqrt(w * w + t * t) / cfg.vs + (end - t) / cfg.vr;
      const dd = retry(
        () => r3(xr + (cfg.u === 'm' ? rng.pick([200, 300, 500, 700, 1000]) : rng.pick([1, 2, 3, 5]))),
        (v) => safeRound(time(xr, v), cfg.dp) && v > xr,
      );
      const T = (t: number) => time(t, dd);
      const Tmin = T(xr);
      const place = cfg.u === 'm' ? 'a cabin' : 'a campsite';
      return {
        prompt: `${who} is on one bank of a straight river that is $${dec(w)}$ ${cfg.u} wide. ${pr === 'she' ? 'She' : 'He'} wants to reach ${place} on the opposite bank, $${dec(dd)}$ ${cfg.u} downstream. ${pr === 'she' ? 'She' : 'He'} can ${cfg.sv} at $${dec(cfg.vs)}$ ${cfg.u}/${cfg.tu} and ${cfg.rv} at $${dec(cfg.vr)}$ ${cfg.u}/${cfg.tu}. ${pr === 'she' ? 'She' : 'He'} will ${cfg.sv} in a straight line to a point $P$ on the other bank, then ${cfg.rv} along the bank. How far downstream should $P$ be to make the total time as short as possible, and what is the minimum time? Ignore the current, and round the time to the nearest ${cfg.dp === 1 ? 'tenth of a second' : 'hundredth of an hour'}.`,
        figure: crossingFig(`${dec(w)} ${cfg.u}`, `${dec(dd)} ${cfg.u}`, place.replace('a ', '')),
        parts: [numPart(xr, { label: 'Distance downstream to $P$', suffix: cfg.u, display: 'decimal' }), numPart(Tmin, { label: 'Minimum time', suffix: cfg.tu, decimals: cfg.dp })],
        hints: [
          `Let $x$ be the distance from the point directly across the river to $P$. The ${cfg.sv === 'swim' ? 'swimming' : 'rowing'} distance is $\\sqrt{${dec(w * w)} + x^2}$ (Pythagorean theorem) and the ${cfg.rv === 'run' ? 'running' : 'walking'} distance is $${dec(dd)} - x$. Time is distance divided by speed.`,
          `Solve $T'(x) = 0$ (square both sides), then compare $T$ at the critical number and at the endpoints $x = 0$ and $x = ${dec(dd)}$.`,
        ],
        solution: [
          `Let $x$ be the distance from the point directly across to $P$, $0 \\le x \\le ${dec(dd)}$. Then $T(x) = \\dfrac{\\sqrt{${dec(w * w)} + x^2}}{${dec(cfg.vs)}} + \\dfrac{${dec(dd)} - x}{${dec(cfg.vr)}}$.`,
          `$T'(x) = \\dfrac{x}{${dec(cfg.vs)}\\sqrt{${dec(w * w)} + x^2}} - \\dfrac{1}{${dec(cfg.vr)}} = 0 \\Rightarrow ${dec(cfg.vr)}x = ${dec(cfg.vs)}\\sqrt{${dec(w * w)} + x^2}$`,
          `Square both sides: $${dec(cfg.vr ** 2)}x^2 = ${dec(cfg.vs ** 2)}(${dec(w * w)} + x^2) \\Rightarrow ${dec(cfg.vr ** 2 - cfg.vs ** 2)}x^2 = ${dec(cfg.vs ** 2 * w * w)} \\Rightarrow x = ${dec(xr)}$`,
          `Compare: $T(0) \\approx ${fmtFixed(T(0), cfg.dp + 1)}$, $T(${dec(xr)}) \\approx ${fmtFixed(Tmin, cfg.dp + 1)}$, $T(${dec(dd)}) \\approx ${fmtFixed(T(dd), cfg.dp + 1)}$. The smallest time is at $x = ${dec(xr)}$.`,
          `$P$ should be $${dec(xr)}$ ${cfg.u} downstream; the minimum time is about $${fmtFixed(Tmin, cfg.dp)}$ ${cfg.tu}.`,
        ],
      };
    }

    if (kind === 'cable') {
      const cfg = rng.pick([
        { cw: 25, cl: 15, ws: [200, 400, 600, 800], ratio: 3 / 4, hyp: 5 / 4 },
        { cw: 50, cl: 30, ws: [200, 400, 600], ratio: 3 / 4, hyp: 5 / 4 },
        { cw: 20, cl: 16, ws: [150, 300, 450, 600], ratio: 4 / 3, hyp: 5 / 3 },
        { cw: 65, cl: 25, ws: [240, 360, 480, 600], ratio: 5 / 12, hyp: 13 / 12 },
      ]);
      const w = rng.pick(cfg.ws);
      const x = cfg.ratio * w;
      const dd = x + rng.pick([200, 400, 600, 1000, 1400]);
      const under = cfg.hyp * w;
      const cost = cfg.cw * under + cfg.cl * (dd - x);
      const C = (t: number) => cfg.cw * Math.sqrt(w * w + t * t) + cfg.cl * (dd - t);
      return {
        prompt: `A power company must run a cable from a station on one bank of a river $${w}$ m wide to a factory on the other bank, $${dec(dd)}$ m downstream. Laying cable under the water costs \\$${cfg.cw} per metre; laying it along the bank costs \\$${cfg.cl} per metre. The cable will run under the water to a point $P$ on the far bank, then along the bank to the factory. How far downstream should $P$ be to make the cost as small as possible, and what is the minimum cost?`,
        figure: crossingFig(`${w} m`, `${dec(dd)} m`, 'factory'),
        parts: [numPart(x, { label: 'Distance downstream to $P$', suffix: 'm' }), numPart(cost, { label: 'Minimum cost: \\$' })],
        hints: [
          `Let $x$ be the distance from the point directly across to $P$. The cable under the water is $\\sqrt{${dec(w * w)} + x^2}$ m long and the cable on land is $${dec(dd)} - x$ m long.`,
          'Solve $C\'(x) = 0$ (square both sides), then compare the cost at the critical number with the cost at the endpoints.',
        ],
        solution: [
          `Let $x$ be the distance from the point directly across to $P$, $0 \\le x \\le ${dec(dd)}$: $C(x) = ${cfg.cw}\\sqrt{${dec(w * w)} + x^2} + ${cfg.cl}(${dec(dd)} - x)$.`,
          `$C'(x) = \\dfrac{${cfg.cw}x}{\\sqrt{${dec(w * w)} + x^2}} - ${cfg.cl} = 0 \\Rightarrow ${cfg.cw}x = ${cfg.cl}\\sqrt{${dec(w * w)} + x^2}$`,
          `Square both sides: $${cfg.cw ** 2}x^2 = ${cfg.cl ** 2}(${dec(w * w)} + x^2) \\Rightarrow ${cfg.cw ** 2 - cfg.cl ** 2}x^2 = ${dec(cfg.cl ** 2 * w * w)} \\Rightarrow x = ${dec(x)}$`,
          `Compare: $C(0) = ${dec(C(0))}$, $C(${dec(x)}) = ${cfg.cw}(${dec(under)}) + ${cfg.cl}(${dec(dd - x)}) = ${dec(cost)}$, $C(${dec(dd)}) \\approx ${dec(Math.round(C(dd)))}$. The smallest is at $x = ${dec(x)}$.`,
          `$P$ should be $${dec(x)}$ m downstream, for a minimum cost of ${dollars(cost)}.`,
        ],
      };
    }

    if (kind === 'openBox') {
      if (rng.chance(0.65)) {
        const x = rng.pick([6, 8, 10, 12, 14, 16, 20, 24, 30, 40]);
        const V = (x * x * x) / 2;
        const h = x / 2;
        const what = rng.pick(['storage bin', 'planter box', 'display tray', 'compost bin']);
        return {
          prompt: `A ${what} with a square base and an open top must hold $${dec(V)}$ cm³. Find the dimensions that use the least material, and the least amount of material.`,
          parts: [numPart(x, { label: 'Side of the base', suffix: 'cm' }), numPart(h, { label: 'Height', suffix: 'cm' }), numPart(3 * x * x, { label: 'Least material', suffix: 'cm²' })],
          hints: ['Let the base be $x$ by $x$ and the height $h$. Use the volume to write $h$ in terms of $x$.', 'The material is the base plus four sides: $S = x^2 + 4xh$. Write $S$ in terms of $x$ alone and minimize it for $x > 0$.'],
          solution: [
            `Volume: $x^2h = ${dec(V)}$, so $h = \\dfrac{${dec(V)}}{x^2}$.`,
            `Material: $S = x^2 + 4xh = x^2 + \\dfrac{${dec(4 * V)}}{x}$, for $x > 0$.`,
            `$S'(x) = 2x - \\dfrac{${dec(4 * V)}}{x^2} = 0 \\Rightarrow x^3 = ${dec(2 * V)} \\Rightarrow x = ${x}$`,
            `$S''(x) = 2 + \\dfrac{${dec(8 * V)}}{x^3} > 0$ for $x > 0$, so this is a minimum.`,
            `$h = \\dfrac{${dec(V)}}{${x * x}} = ${dec(h)}$ and $S = ${x * x} + 4(${x})(${dec(h)}) = ${dec(3 * x * x)}$`,
            `The base should be $${x}$ cm by $${x}$ cm and the height $${dec(h)}$ cm, using $${dec(3 * x * x)}$ cm² of material.`,
          ],
          calculator: true,
        };
      }
      const x = rng.pick([5, 8, 10, 12, 15, 20]);
      const V = x * x * x;
      return {
        prompt: `A closed box with a square base must hold $${dec(V)}$ cm³. Find the dimensions that use the least material, and the least amount of material.`,
        figure: { type: 'solid', shape: 'rectPrism', labels: { l: 'x', w: 'x', h: 'h' } },
        parts: [numPart(x, { label: 'Side of the base', suffix: 'cm' }), numPart(x, { label: 'Height', suffix: 'cm' }), numPart(6 * x * x, { label: 'Least material', suffix: 'cm²' })],
        hints: ['Let the base be $x$ by $x$ and the height $h$. Use the volume to write $h$ in terms of $x$.', 'The material is the top, the bottom and four sides: $S = 2x^2 + 4xh$. Write $S$ in terms of $x$ alone and minimize it for $x > 0$.'],
        solution: [
          `Volume: $x^2h = ${dec(V)}$, so $h = \\dfrac{${dec(V)}}{x^2}$.`,
          `Material: $S = 2x^2 + 4xh = 2x^2 + \\dfrac{${dec(4 * V)}}{x}$, for $x > 0$.`,
          `$S'(x) = 4x - \\dfrac{${dec(4 * V)}}{x^2} = 0 \\Rightarrow x^3 = ${dec(V)} \\Rightarrow x = ${x}$`,
          `$S''(x) = 4 + \\dfrac{${dec(8 * V)}}{x^3} > 0$ for $x > 0$, so this is a minimum.`,
          `$h = \\dfrac{${dec(V)}}{${x * x}} = ${x}$ and $S = 2(${x * x}) + 4(${x})(${x}) = ${dec(6 * x * x)}$`,
          `The box is a cube, $${x}$ cm on each edge, using $${dec(6 * x * x)}$ cm² of material.`,
        ],
        calculator: true,
      };
    }

    if (kind === 'inscribed') {
      if (rng.chance(0.5)) {
        const k = rng.pick([1, 2, 3, 4]);
        const c = 3 * k * k;
        const X = Math.ceil(Math.sqrt(c)) + 1;
        const gx = 0.55 * Math.sqrt(c);
        return {
          prompt: `A rectangle has its base on the $x$-axis and its two upper vertices on the parabola $y = ${c} - x^2$. Find the width and height of the rectangle with the largest area, and the largest area.`,
          figure: {
            type: 'plane',
            grid: { xMin: -X, xMax: X, yMin: -2, yMax: c + 2, ...(c > 20 ? { yStep: 5, xStep: 1 } : {}) },
            polylines: [
              ...sample((t) => c - t * t, -X, X, -2, c + 2).map((points) => ({ points })),
              { points: [[-r3(gx), 0], [-r3(gx), r3(c - gx * gx)], [r3(gx), r3(c - gx * gx)], [r3(gx), 0]] as P[], color: 'accent' as const },
            ],
            points: [{ x: r3(gx), y: r3(c - gx * gx), label: '(x, y)', color: 'accent' }],
          },
          parts: [numPart(2 * k, { label: 'Width' }), numPart(2 * k * k, { label: 'Height' }), numPart(4 * k ** 3, { label: 'Largest area' })],
          hints: ['If the upper right vertex is $(x, ' + `${c} - x^2)` + '$, the rectangle is $2x$ wide.', 'Write the area as a function of $x$, state its domain, and find the critical number.'],
          solution: [
            `Let the upper right vertex be $(x, ${c} - x^2)$ with $0 < x < \\sqrt{${c}}$. The rectangle is $2x$ wide and $${c} - x^2$ high.`,
            `$A(x) = 2x(${c} - x^2) = ${2 * c}x - 2x^3$`,
            `$A'(x) = ${2 * c} - 6x^2 = 0 \\Rightarrow x^2 = ${k * k} \\Rightarrow x = ${k}$ (since $x > 0$).`,
            `$A''(x) = -12x < 0$ for $x > 0$, so this is a maximum.`,
            `Width $2(${k}) = ${2 * k}$, height $${c} - ${k * k} = ${2 * k * k}$, area $${2 * k} \\times ${2 * k * k} = ${4 * k ** 3}$.`,
            `The largest rectangle is $${2 * k}$ wide and $${2 * k * k}$ high, with area $${4 * k ** 3}$.`,
          ],
          calculator: false,
        };
      }
      const r = rng.pick([2, 4, 5, 6, 8, 10]);
      const half = r / Math.SQRT2;
      const gx = 0.55 * r;
      return {
        prompt: `A rectangle is inscribed in a semicircle of radius $${r}$: its base lies on the diameter and its two upper vertices are on the arc $y = \\sqrt{${r * r} - x^2}$. Find the width and height of the rectangle with the largest area, and the largest area. Give exact values or round to the nearest hundredth.`,
        figure: {
          type: 'plane',
          grid: { xMin: -r - 1, xMax: r + 1, yMin: -1, yMax: r + 1, ...(r > 6 ? { step: 2 } : {}) },
          polylines: [
            { points: Array.from({ length: 121 }, (_, i) => [r3(r * Math.cos((Math.PI * i) / 120)), r3(r * Math.sin((Math.PI * i) / 120))] as P) },
            { points: [[-r3(gx), 0], [-r3(gx), r3(Math.sqrt(r * r - gx * gx))], [r3(gx), r3(Math.sqrt(r * r - gx * gx))], [r3(gx), 0]] as P[], color: 'accent' },
          ],
          points: [{ x: r3(gx), y: r3(Math.sqrt(r * r - gx * gx)), label: '(x, y)', color: 'accent' }],
        },
        parts: [exactPart(2 * half, 2, { label: 'Width', exact: `${r}sqrt(2)` }), exactPart(half, 2, { label: 'Height', exact: r % 2 === 0 ? `${r / 2}sqrt(2)` : `${r}sqrt(2)/2` }), numPart(r * r, { label: 'Largest area' })],
        hints: ['If the upper right vertex is $(x, \\sqrt{' + `${r * r}` + ' - x^2})$, the rectangle is $2x$ wide.', 'Write the area as a function of $x$ on $0 < x < ' + `${r}` + '$, differentiate with the product and chain rules, and set the numerator equal to $0$.'],
        solution: [
          `Let the upper right vertex be $(x, \\sqrt{${r * r} - x^2})$, $0 < x < ${r}$: $A(x) = 2x\\sqrt{${r * r} - x^2}$.`,
          `$A'(x) = 2\\sqrt{${r * r} - x^2} - \\dfrac{2x^2}{\\sqrt{${r * r} - x^2}} = \\dfrac{2(${r * r} - 2x^2)}{\\sqrt{${r * r} - x^2}}$`,
          `$A'(x) = 0 \\Rightarrow x^2 = ${tn((r * r) / 2)} \\Rightarrow x = \\dfrac{${r}}{\\sqrt{2}} = ${r % 2 === 0 ? `${r / 2 === 1 ? '' : r / 2}\\sqrt{2}` : `\\dfrac{${r}\\sqrt{2}}{2}`}$`,
          `$A$ is $0$ at both ends of the domain and positive between them, so this critical number gives the maximum.`,
          `Width $2x = ${r}\\sqrt{2} \\approx ${fmtFixed(2 * half, 2)}$, height $\\sqrt{${r * r} - ${tn((r * r) / 2)}} = ${r % 2 === 0 ? `${r / 2 === 1 ? '' : r / 2}\\sqrt{2}` : `\\dfrac{${r}\\sqrt{2}}{2}`} \\approx ${fmtFixed(half, 2)}$, area $${r}\\sqrt{2} \\cdot ${r % 2 === 0 ? `${r / 2 === 1 ? '' : r / 2}\\sqrt{2}` : `\\dfrac{${r}\\sqrt{2}}{2}`} = ${r * r}$`,
          `The largest rectangle is $${r}\\sqrt{2} \\approx ${fmtFixed(2 * half, 2)}$ wide and $${fmtFixed(half, 2)}$ high, with area $${r * r}$.`,
        ],
      };
    }

    // fenceCost
    const { a, b, x } = retry(
      () => {
        const [a, b] = rng.pick([[15, 5], [12, 4], [9, 3], [10, 5], [25, 5], [20, 10], [8, 4], [30, 10]] as const);
        return { a, b, x: rng.pick([10, 12, 15, 20, 24, 30, 40]) };
      },
      (o) => Number.isInteger((o.x * o.x * (o.a + o.b)) / (2 * o.b)) && Number.isInteger((o.x * (o.a + o.b)) / (2 * o.b)),
      200,
    );
    const A = (x * x * (a + b)) / (2 * b);
    const y = A / x;
    const cost = 2 * (a + b) * x;
    return {
      prompt: `${name} wants to fence a rectangular yard of area $${dec(A)}$ m² in front of a house. The fence along the street costs \\$${a} per metre; the fence on the other three sides costs \\$${b} per metre. What dimensions make the cost as small as possible, and what is the minimum cost?`,
      parts: [numPart(x, { label: 'Side along the street', suffix: 'm' }), numPart(y, { label: 'Depth (the other side)', suffix: 'm', display: 'decimal' }), numPart(cost, { label: 'Minimum cost: \\$' })],
      hints: ['Let $x$ be the length along the street and $y$ the depth. The cost is $' + `${a}x + ${b}x + 2(${b})y` + '$, and $xy$ is the area.', 'Write the cost in terms of $x$ alone, then minimize it for $x > 0$.'],
      solution: [
        `Let $x$ be the length along the street and $y$ the depth: $xy = ${dec(A)}$, so $y = \\dfrac{${dec(A)}}{x}$.`,
        `Cost: $C = ${a}x + ${b}x + 2(${b})y = ${a + b}x + \\dfrac{${dec(2 * b * A)}}{x}$, for $x > 0$.`,
        `$C'(x) = ${a + b} - \\dfrac{${dec(2 * b * A)}}{x^2} = 0 \\Rightarrow x^2 = ${dec(x * x)} \\Rightarrow x = ${x}$`,
        `$C''(x) = \\dfrac{${dec(4 * b * A)}}{x^3} > 0$ for $x > 0$, so this is a minimum.`,
        `$y = \\dfrac{${dec(A)}}{${x}} = ${dec(y)}$ and $C = ${a + b}(${x}) + \\dfrac{${dec(2 * b * A)}}{${x}} = ${dec(cost)}$`,
        `The yard should be $${x}$ m along the street and $${dec(y)}$ m deep, for a minimum cost of ${dollars(cost)}.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// 7.2 — Related rates
// ---------------------------------------------------------------------------

/** A rate in LaTeX: a decimal when it terminates (0.9), otherwise a fraction (5/6). */
const rt = (v: number) => (terminates(v, 4) ? dec(v) : tn(v));

const LADDERS: Array<[number, number, number]> = [
  [6, 8, 10], [8, 6, 10], [5, 12, 13], [12, 5, 13], [3, 4, 5], [4, 3, 5], [1.8, 2.4, 3], [2.4, 1.8, 3], [3.6, 4.8, 6], [4.8, 3.6, 6], [2.1, 7.2, 7.5], [4.5, 6, 7.5],
];
const TRIPLES: Array<[number, number, number]> = [
  [3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13], [12, 5, 13], [9, 12, 15], [12, 9, 15], [8, 15, 17], [15, 8, 17], [12, 16, 20], [16, 12, 20],
];
const RR_HINT = 'Write an equation that relates the quantities at any time, then differentiate both sides with respect to $t$ (implicitly). Substitute the values at the given instant only after differentiating.';

/** "the exact value or round to the nearest ..." answer for a rate. */
function ratePart(value: number, dp: number, suffix: string, exact?: string, label?: string): Part {
  return exactPart(value, dp, { suffix, ...(label ? { label } : {}), ...(exact ? { exact } : terminates(value, dp) ? {} : { exact: ratStr(value) }) });
}

function shadowFig(H: number, h: number): PlaneFigure {
  const s = 150 / H;
  const g = 30;
  const xp = 60;
  const xm = 190;
  const tip = xp + ((xm - xp) * H) / (H - h);
  const k = Math.min(1, 300 / tip);
  const X = (v: number) => 20 + (v - 20) * k;
  return drawing(
    g + H * s + 28,
    {
      segments: [
        { from: [10, g], to: [330, g], color: 'muted' },
        { from: [X(xp), g], to: [X(xp), g + H * s] },
        { from: [X(xm), g], to: [X(xm), g + h * s], color: 'accent' },
        { from: [X(xp), g + H * s], to: [X(tip), g], dashed: true, color: 'muted' },
      ],
      dots: [{ x: X(xp), y: g + H * s }],
      labels: [
        [[X(xp) - 12 - textWidth(`${dec(H)} m`) / 2, g + (H * s) / 2], `${dec(H)} m`],
        [[X(xm) - 14 - textWidth(`${dec(h)} m`) / 2, g + (h * s) / 2], `${dec(h)} m`],
        [[(X(xp) + X(xm)) / 2, g - 13], 'x'],
        [[(X(xm) + X(tip)) / 2, g - 13], 's'],
      ],
    },
    'The light is at the top of the pole; x is the walker’s distance from the pole and s is the length of the shadow.',
  );
}

function coneFig(R: number, H: number, hFrac: number): PlaneFigure {
  const top = 210;
  const apex: P = [150, 20];
  const halfW = Math.min(120, (190 * R) / H);
  const yw = apex[1] + (top - apex[1]) * hFrac;
  const ww = halfW * hFrac;
  const dimX = apex[0] + halfW + 22;
  const dimL = apex[0] - halfW - 22;
  return drawing(
    top + 30,
    {
      polylines: [{ points: [[apex[0] - halfW, top], apex, [apex[0] + halfW, top]] }],
      segments: [
        { from: [apex[0] - halfW, top], to: [apex[0] + halfW, top], dashed: true, color: 'muted' },
        { from: [apex[0], top], to: [apex[0] + halfW, top], color: 'muted' },
        { from: [apex[0] - ww, yw], to: [apex[0] + ww, yw], color: 'accent' },
        { from: apex, to: [apex[0], yw], dashed: true, color: 'muted' },
        { from: [dimX, apex[1]], to: [dimX, top], color: 'muted', arrowStart: true, arrowEnd: true },
        { from: [dimL, apex[1]], to: [dimL, yw], color: 'accent', arrowStart: true, arrowEnd: true },
        { from: [dimL - 6, yw], to: [apex[0] - ww, yw], color: 'muted', dashed: true },
      ],
      labels: [
        [[apex[0] + halfW / 2, top + 20], `${dec(R)} m`],
        [[dimX + 18 + textWidth(`${dec(H)} m`) / 2, (apex[1] + top) / 2], `${dec(H)} m`],
        [[apex[0] + Math.max(ww / 2, 20), yw - 14], 'r'],
        [[dimL - 14, (apex[1] + yw) / 2], 'h'],
      ],
    },
    'The tank is a cone with its vertex down. The water has depth h and surface radius r.',
  );
}

const relatedRates = skill({
  id: 'm31-related-rates',
  name: 'Related rates',
  description: 'Relate the rates of change of connected quantities by differentiating an equation with respect to time: circles, spheres, ladders, shadows, conical tanks, moving vehicles and balloons.',
  outcomes: ['DA3'],
  lessonId: 'm31-7-2',
  calculator: true,
  gen(rng, d): GenOutput {
    const kind =
      d === 1
        ? rng.pick(['circleArea', 'square', 'sphereVol', 'abstract'] as const)
        : d === 2
          ? rng.pick(['ladder', 'ladder', 'inverseSphere', 'inverseCircle', 'shadow', 'carsApart', 'plane'] as const)
          : rng.pick(['cone', 'cone', 'balloon', 'carsApproach', 'ladderAngle', 'snowball'] as const);
    const [name, pr] = rng.pick(PEOPLE);

    // ---------------- difficulty 1 ----------------
    if (kind === 'circleArea') {
      const oil = rng.chance(0.5);
      const { k, R } = retry(
        () => ({ k: oil ? rng.pick([0.5, 1, 1.5, 2]) : rng.pick([10, 15, 20, 25, 30]), R: oil ? rng.pick([10, 20, 25, 30, 40, 50]) : rng.pick([20, 50, 60, 80, 100, 120]) }),
        (o) => safeRound(2 * o.R * o.k * Math.PI, 0),
      );
      const u = oil ? 'm' : 'cm';
      const tu = oil ? 'min' : 's';
      const q = 2 * R * k;
      return {
        prompt: oil
          ? `Oil leaking from a boat on a lake spreads in a circle whose radius increases at $${dec(k)}$ m/min. How fast is the area of the oil slick increasing when the radius is $${R}$ m? Give the exact value or round to the nearest whole number.`
          : `A pebble dropped into a calm pond makes a circular ripple whose radius increases at $${k}$ cm/s. How fast is the area inside the ripple increasing when the radius is $${R}$ cm? Give the exact value or round to the nearest whole number.`,
        parts: [exactPart(q * Math.PI, 0, { suffix: `${u}²/${tu}`, exact: piStr(q) })],
        hints: [RR_HINT, 'Differentiate $A = \\pi r^2$ with respect to $t$: $\\dfrac{dA}{dt} = 2\\pi r\\dfrac{dr}{dt}$.'],
        solution: [
          `$A = \\pi r^2$, so $\\dfrac{dA}{dt} = 2\\pi r\\dfrac{dr}{dt}$.`,
          `With $r = ${R}$ and $\\dfrac{dr}{dt} = ${dec(k)}$: $\\dfrac{dA}{dt} = 2\\pi(${R})(${dec(k)}) = ${piTex(q)} \\approx ${fmtFixed(q * Math.PI, 0)}$`,
          `The area is increasing at $${piTex(q)} \\approx ${fmtFixed(q * Math.PI, 0)}$ ${u}²/${tu}.`,
        ],
      };
    }

    if (kind === 'square') {
      if (rng.chance(0.5)) {
        const k = rng.pick([0.5, 1.5, 2, 3]);
        const s = rng.pick([5, 8, 10, 12, 20]);
        const rate = 2 * s * k;
        return {
          prompt: `Each side of a square is increasing at $${dec(k)}$ cm/s. How fast is the area of the square increasing when each side is $${s}$ cm long?`,
          parts: [numPart(rate, { suffix: 'cm²/s' })],
          hints: [RR_HINT, '$A = s^2$, so $\\dfrac{dA}{dt} = 2s\\dfrac{ds}{dt}$.'],
          solution: [`$A = s^2$, so $\\dfrac{dA}{dt} = 2s\\dfrac{ds}{dt}$.`, `$\\dfrac{dA}{dt} = 2(${s})(${dec(k)}) = ${dec(rate)}$`, `The area is increasing at $${dec(rate)}$ cm²/s.`],
          calculator: false,
        };
      }
      const k = rng.pick([0.1, 0.2, 0.5]);
      const s = rng.pick([2, 3, 4, 5, 6]);
      const rate = 3 * s * s * k;
      return {
        prompt: `An ice cube is melting, and each of its edges is decreasing at $${dec(k)}$ cm/min. How fast is the volume of the cube decreasing when each edge is $${s}$ cm long?`,
        parts: [numPart(rate, { suffix: 'cm³/min' })],
        hints: [RR_HINT, '$V = s^3$, so $\\dfrac{dV}{dt} = 3s^2\\dfrac{ds}{dt}$. A decreasing edge means $\\dfrac{ds}{dt}$ is negative.'],
        solution: [
          `$V = s^3$, so $\\dfrac{dV}{dt} = 3s^2\\dfrac{ds}{dt}$, with $\\dfrac{ds}{dt} = -${dec(k)}$.`,
          `$\\dfrac{dV}{dt} = 3(${s})^2(-${dec(k)}) = -${dec(rate)}$`,
          `The negative sign means the volume is decreasing: it decreases at $${dec(rate)}$ cm³/min.`,
        ],
        calculator: false,
      };
    }

    if (kind === 'sphereVol') {
      const { k, R } = retry(
        () => ({ k: rng.pick([0.5, 1, 2, 3]), R: rng.pick([5, 8, 10, 12, 15]) }),
        (o) => safeRound(4 * o.R * o.R * o.k * Math.PI, 0),
      );
      const q = 4 * R * R * k;
      return {
        prompt: `${name} is blowing up a spherical balloon. Its radius is increasing at $${dec(k)}$ cm/s. How fast is its volume increasing when the radius is $${R}$ cm? ($V = \\frac{4}{3}\\pi r^3$.) Give the exact value or round to the nearest whole number.`,
        parts: [exactPart(q * Math.PI, 0, { suffix: 'cm³/s', exact: piStr(q) })],
        hints: [RR_HINT, '$\\dfrac{dV}{dt} = 4\\pi r^2\\dfrac{dr}{dt}$.'],
        solution: [
          `$V = \\dfrac{4}{3}\\pi r^3$, so $\\dfrac{dV}{dt} = 4\\pi r^2\\dfrac{dr}{dt}$.`,
          `$\\dfrac{dV}{dt} = 4\\pi(${R})^2(${dec(k)}) = ${piTex(q)} \\approx ${fmtFixed(q * Math.PI, 0)}$`,
          `The volume is increasing at $${piTex(q)} \\approx ${fmtFixed(q * Math.PI, 0)}$ cm³/s.`,
        ],
      };
    }

    if (kind === 'abstract') {
      if (rng.chance(0.5)) {
        const a = rng.nonZero(-3, 3);
        const b = rng.int(-6, 6);
        const c = rng.int(-5, 5);
        const x0 = rng.int(-3, 4);
        const v = rng.pick([2, 3, -2, 4, 0.5, -1, 5]);
        const slope = 2 * a * x0 + b;
        const rate = slope * v;
        const f = poly([[a, 'x^2'], [b, 'x'], [c, '']]);
        return {
          prompt: `Both $x$ and $y$ are functions of $t$, and $y = ${f}$. If $\\dfrac{dx}{dt} = ${dec(v)}$, find $\\dfrac{dy}{dt}$ when $x = ${x0}$.`,
          parts: [numPart(rate, { label: '$\\dfrac{dy}{dt} =$' })],
          hints: ['Differentiate both sides with respect to $t$, using the chain rule on the right: $\\dfrac{d}{dt}(x^2) = 2x\\dfrac{dx}{dt}$.', 'Then substitute the given values of $x$ and $\\dfrac{dx}{dt}$.'],
          solution: [
            `$\\dfrac{dy}{dt} = (${poly([[2 * a, 'x'], [b, '']])})\\dfrac{dx}{dt}$`,
            `At $x = ${x0}$: $\\dfrac{dy}{dt} = (${poly([[2 * a, `(${x0})`], [b, '']])})(${dec(v)}) = (${slope})(${dec(v)}) = ${dec(rate)}$`,
            `$\\dfrac{dy}{dt} = ${dec(rate)}$`,
          ],
          calculator: false,
        };
      }
      const [x0, y0, r] = rng.pick(TRIPLES.slice(0, 8));
      const v = rng.pick([2, 3, 4, 6, -2, -3]);
      const rate = (-x0 * v) / y0;
      return {
        prompt: `A point moves on the circle $x^2 + y^2 = ${r * r}$. When it is at $(${x0}, ${y0})$, $\\dfrac{dx}{dt} = ${v}$. Find $\\dfrac{dy}{dt}$ at that moment.`,
        parts: [numPart(rate, { label: '$\\dfrac{dy}{dt} =$' })],
        hints: ['Differentiate $x^2 + y^2 = ' + `${r * r}` + '$ with respect to $t$: $2x\\dfrac{dx}{dt} + 2y\\dfrac{dy}{dt} = 0$.', 'Substitute $x$, $y$ and $\\dfrac{dx}{dt}$, then solve for $\\dfrac{dy}{dt}$.'],
        solution: [
          `$2x\\dfrac{dx}{dt} + 2y\\dfrac{dy}{dt} = 0$`,
          `$2(${x0})(${v}) + 2(${y0})\\dfrac{dy}{dt} = 0 \\Rightarrow ${2 * y0}\\dfrac{dy}{dt} = ${-2 * x0 * v}$`,
          `$\\dfrac{dy}{dt} = ${rt(rate)}$`,
        ],
        calculator: false,
      };
    }

    // ---------------- difficulty 2 ----------------
    if (kind === 'ladder') {
      const { x, y, L, v, bottom } = retry(
        () => {
          const [x, y, L] = rng.pick(LADDERS);
          const v = rng.pick([0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 1, 1.2]);
          const bottom = rng.chance(0.65);
          return { x, y, L, v, bottom };
        },
        (o) => {
          const rate = o.bottom ? (o.x * o.v) / o.y : (o.y * o.v) / o.x;
          return terminates(rate, 2) || safeRound(rate, 2);
        },
        200,
      );
      const rate = bottom ? (x * v) / y : (y * v) / x;
      const ans = ratePart(rate, 2, 'm/s');
      return {
        prompt: bottom
          ? `A $${dec(L)}$ m ladder leans against a vertical wall. ${name} pulls the bottom of the ladder away from the wall at $${dec(v)}$ m/s. How fast is the top of the ladder sliding down the wall when the bottom is $${dec(x)}$ m from the wall? Give the exact value or round to the nearest hundredth.`
          : `A $${dec(L)}$ m ladder leans against a vertical wall. The top of the ladder slides down the wall at $${dec(v)}$ m/s. How fast is the bottom of the ladder moving away from the wall when the top is $${dec(y)}$ m above the ground? Give the exact value or round to the nearest hundredth.`,
        figure: ladderFig(x, y, `${dec(L)} m`, { ra: 'x', rb: 'y' }),
        parts: [ans],
        hints: [RR_HINT, 'The ladder, the wall and the ground form a right triangle: $x^2 + y^2 = L^2$, where the length $L$ is constant.'],
        solution: [
          `Let $x$ be the distance from the wall to the bottom of the ladder and $y$ the height of the top. Then $x^2 + y^2 = ${dec(L * L)}$.`,
          `Differentiate with respect to $t$: $2x\\dfrac{dx}{dt} + 2y\\dfrac{dy}{dt} = 0$.`,
          bottom ? `When $x = ${dec(x)}$: $y = \\sqrt{${dec(L * L)} - ${dec(x * x)}} = ${dec(y)}$, and $\\dfrac{dx}{dt} = ${dec(v)}$.` : `When $y = ${dec(y)}$: $x = \\sqrt{${dec(L * L)} - ${dec(y * y)}} = ${dec(x)}$, and $\\dfrac{dy}{dt} = -${dec(v)}$ (the top moves down).`,
          bottom
            ? `$2(${dec(x)})(${dec(v)}) + 2(${dec(y)})\\dfrac{dy}{dt} = 0 \\Rightarrow \\dfrac{dy}{dt} = -\\dfrac{${dec(x)}(${dec(v)})}{${dec(y)}} = -${rt(rate)}${terminates(rate, 4) ? '' : ` \\approx -${fmtFixed(rate, 2)}`}$`
            : `$2(${dec(x)})\\dfrac{dx}{dt} + 2(${dec(y)})(-${dec(v)}) = 0 \\Rightarrow \\dfrac{dx}{dt} = \\dfrac{${dec(y)}(${dec(v)})}{${dec(x)}} = ${rt(rate)}${terminates(rate, 4) ? '' : ` \\approx ${fmtFixed(rate, 2)}`}$`,
          bottom
            ? `The negative sign means $y$ is decreasing: the top slides down at $${rt(rate)}${terminates(rate, 4) ? '' : ` \\approx ${fmtFixed(rate, 2)}`}$ m/s.`
            : `The bottom moves away from the wall at $${rt(rate)}${terminates(rate, 4) ? '' : ` \\approx ${fmtFixed(rate, 2)}`}$ m/s.`,
        ],
      };
    }

    if (kind === 'inverseSphere') {
      const { Q, R } = retry(
        () => ({ Q: rng.pick([50, 100, 120, 150, 200, 300]), R: rng.pick([4, 5, 6, 8, 10]) }),
        (o) => safeRound(o.Q / (4 * Math.PI * o.R * o.R), 3) && o.Q / (4 * Math.PI * o.R * o.R) >= 0.1,
        200,
      );
      const q = Q / (4 * R * R);
      const rate = q / Math.PI;
      const diam = rng.chance(0.4);
      return {
        prompt: `Air is pumped into a spherical weather balloon at $${Q}$ cm³/s. How fast is the radius increasing when the ${diam ? `diameter is $${2 * R}$ cm` : `radius is $${R}$ cm`}? ($V = \\frac{4}{3}\\pi r^3$.) Give the exact value or round to the nearest thousandth.`,
        parts: [exactPart(rate, 3, { suffix: 'cm/s', exact: overPiStr(q) })],
        hints: [RR_HINT, 'Differentiate $V = \\frac{4}{3}\\pi r^3$ to get $\\dfrac{dV}{dt} = 4\\pi r^2\\dfrac{dr}{dt}$, then solve for $\\dfrac{dr}{dt}$.'],
        solution: [
          `$V = \\dfrac{4}{3}\\pi r^3$, so $\\dfrac{dV}{dt} = 4\\pi r^2\\dfrac{dr}{dt}$.`,
          `${diam ? `The radius is half the diameter: $r = ${R}$. ` : ''}$${Q} = 4\\pi(${R})^2\\dfrac{dr}{dt} = ${4 * R * R}\\pi\\dfrac{dr}{dt}$`,
          `$\\dfrac{dr}{dt} = \\dfrac{${Q}}{${4 * R * R}\\pi} = ${overPiTex(q)} \\approx ${fmtFixed(rate, 3)}$`,
          `The radius is increasing at $${overPiTex(q)} \\approx ${fmtFixed(rate, 3)}$ cm/s.`,
        ],
      };
    }

    if (kind === 'inverseCircle') {
      const { Q, R } = retry(
        () => ({ Q: rng.pick([10, 20, 30, 50, 80, 100]), R: rng.pick([5, 8, 10, 20, 25, 40]) }),
        (o) => safeRound(o.Q / (2 * Math.PI * o.R), 3) && o.Q / (2 * Math.PI * o.R) >= 0.05,
        200,
      );
      const q = Q / (2 * R);
      const rate = q / Math.PI;
      return {
        prompt: `The area of a circular oil slick is increasing at $${Q}$ m²/min. At the moment when the radius is $${R}$ m, how fast is the radius increasing, and how fast is the circumference increasing? Give exact values or round to the nearest thousandth.`,
        parts: [exactPart(rate, 3, { label: 'Radius', suffix: 'm/min', exact: overPiStr(q) }), exactPart(Q / R, 3, { label: 'Circumference', suffix: 'm/min', ...(terminates(Q / R, 3) ? {} : { exact: ratStr(Q / R) }) })],
        hints: [RR_HINT, 'Use $A = \\pi r^2$ to find $\\dfrac{dr}{dt}$, then $C = 2\\pi r$ gives $\\dfrac{dC}{dt} = 2\\pi\\dfrac{dr}{dt}$.'],
        solution: [
          `$A = \\pi r^2$, so $\\dfrac{dA}{dt} = 2\\pi r\\dfrac{dr}{dt}$: $${Q} = 2\\pi(${R})\\dfrac{dr}{dt}$.`,
          `$\\dfrac{dr}{dt} = \\dfrac{${Q}}{${2 * R}\\pi} = ${overPiTex(q)} \\approx ${fmtFixed(rate, 3)}$ m/min`,
          `$C = 2\\pi r$, so $\\dfrac{dC}{dt} = 2\\pi\\dfrac{dr}{dt} = 2\\pi \\cdot ${overPiTex(q)} = ${rt(Q / R)}$ m/min`,
          `The radius grows at $${overPiTex(q)} \\approx ${fmtFixed(rate, 3)}$ m/min and the circumference at $${rt(Q / R)}${terminates(Q / R, 3) ? '' : ` \\approx ${fmtFixed(Q / R, 3)}`}$ m/min.`,
        ],
      };
    }

    if (kind === 'shadow') {
      const { H, h, v } = retry(
        () => {
          const [H, h] = rng.pick([[6, 1.5], [8, 2], [4.5, 1.5], [5, 2], [7.2, 1.8], [6, 2], [4.8, 1.6], [5.4, 1.8], [6.4, 1.6]] as const);
          return { H, h, v: rng.pick([1, 1.2, 1.4, 1.5, 1.8, 2]) };
        },
        (o) => [(o.v * o.h) / (o.H - o.h), (o.v * o.H) / (o.H - o.h)].every((r) => terminates(r, 2) || safeRound(r, 2)),
        200,
      );
      const tip = rng.chance(0.4);
      const k = h / (H - h);
      const rate = tip ? v * (1 + k) : v * k;
      const x0 = rng.pick([4, 5, 6, 8, 10]);
      return {
        prompt: `A street light is at the top of a pole $${dec(H)}$ m tall. ${name}, who is $${dec(h)}$ m tall, walks away from the pole along a straight, level path at $${dec(v)}$ m/s. ${tip ? `How fast is the tip of ${pr === 'she' ? 'her' : 'his'} shadow moving` : `How fast is ${pr === 'she' ? 'her' : 'his'} shadow getting longer`} when ${pr} is $${x0}$ m from the pole? Give the exact value or round to the nearest hundredth.`,
        figure: shadowFig(H, h),
        parts: [ratePart(rate, 2, 'm/s')],
        hints: [
          `Let $x$ be ${name}'s distance from the pole and $s$ the length of the shadow. The pole and ${name} make similar triangles with the tip of the shadow: $\\dfrac{${dec(H)}}{x + s} = \\dfrac{${dec(h)}}{s}$.`,
          `Solve for $s$ in terms of $x$, then differentiate with respect to $t$.${tip ? ' The tip of the shadow is $x + s$ from the pole.' : ''}`,
        ],
        solution: [
          `Similar triangles: $\\dfrac{${dec(H)}}{x + s} = \\dfrac{${dec(h)}}{s} \\Rightarrow ${dec(H)}s = ${dec(h)}x + ${dec(h)}s \\Rightarrow ${dec(H - h)}s = ${dec(h)}x$, so $s = ${tn(k)}x$.`,
          `$\\dfrac{ds}{dt} = ${tn(k)}\\dfrac{dx}{dt} = ${tn(k)}(${dec(v)}) = ${rt(v * k)}${terminates(v * k, 4) ? '' : ` \\approx ${fmtFixed(v * k, 2)}`}$ m/s`,
          tip
            ? `The tip is $x + s$ from the pole: $\\dfrac{d}{dt}(x + s) = ${dec(v)} + ${rt(v * k)} = ${rt(rate)}${terminates(rate, 4) ? '' : ` \\approx ${fmtFixed(rate, 2)}`}$ m/s.`
            : `The rate does not depend on $x$: the distance of $${x0}$ m is not needed.`,
          `The ${tip ? 'tip of the shadow moves' : 'shadow grows'} at $${rt(rate)}${terminates(rate, 4) ? '' : ` \\approx ${fmtFixed(rate, 2)}`}$ m/s${tip ? ' (and this does not depend on the distance from the pole)' : ''}.`,
        ],
      };
    }

    if (kind === 'carsApart') {
      const [x, y, D] = rng.pick(TRIPLES);
      const a = rng.pick([60, 70, 80, 90, 100]);
      const b = rng.pick([50, 60, 80, 90, 100, 110]);
      const rate = (x * a + y * b) / D;
      const town = rng.pick(['Hillcrest', 'Ashford', 'Oakridge', 'Elmwood', 'Westbury']);
      return {
        prompt: `Two straight highways cross at right angles near ${town}. At a certain moment, car A is $${x}$ km north of the intersection, driving north at $${a}$ km/h, and car B is $${y}$ km east of the intersection, driving east at $${b}$ km/h. How fast is the distance between the cars increasing at that moment? Give the exact value or round to the nearest tenth.`,
        figure: carsFig(x, y, true, true),
        parts: [ratePart(rate, 1, 'km/h')],
        hints: [RR_HINT, 'If car A is $x$ km north and car B is $y$ km east, the distance $D$ between them satisfies $D^2 = x^2 + y^2$.'],
        solution: [
          `$D^2 = x^2 + y^2$, so $2D\\dfrac{dD}{dt} = 2x\\dfrac{dx}{dt} + 2y\\dfrac{dy}{dt}$.`,
          `At that moment $D = \\sqrt{${x}^2 + ${y}^2} = ${D}$, $\\dfrac{dx}{dt} = ${a}$ and $\\dfrac{dy}{dt} = ${b}$.`,
          `$${D}\\dfrac{dD}{dt} = ${x}(${a}) + ${y}(${b}) = ${x * a + y * b} \\Rightarrow \\dfrac{dD}{dt} = \\dfrac{${x * a + y * b}}{${D}} = ${rt(rate)}${terminates(rate, 4) ? '' : ` \\approx ${fmtFixed(rate, 1)}`}$`,
          `The distance is increasing at $${rt(rate)}${terminates(rate, 4) ? '' : ` \\approx ${fmtFixed(rate, 1)}`}$ km/h.`,
        ],
      };
    }

    if (kind === 'plane') {
      const [hh, x, D] = rng.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [7, 24, 25], [12, 16, 20]] as const);
      const v = rng.pick([480, 600, 720, 750, 800, 900]);
      const rate = (x * v) / D;
      return {
        prompt: `A plane flying horizontally at an altitude of $${hh}$ km and a speed of $${v}$ km/h passes directly over a radar station. How fast is the distance from the plane to the station increasing when that distance is $${D}$ km? Give the exact value or round to the nearest tenth.`,
        figure: { type: 'rightTriangle', vertices: { right: 'G', a: 'S', b: 'P' }, legA: x, legB: hh, sideLabels: { ra: 'x', rb: `${hh} km`, ab: 'D' } },
        parts: [ratePart(rate, 1, 'km/h')],
        hints: [RR_HINT, `Let $x$ be the horizontal distance the plane has flown past the station and $D$ its distance from the station: $D^2 = x^2 + ${hh}^2$, where the altitude is constant.`],
        solution: [
          `$D^2 = x^2 + ${hh * hh}$, so $2D\\dfrac{dD}{dt} = 2x\\dfrac{dx}{dt}$.`,
          `When $D = ${D}$: $x = \\sqrt{${D * D} - ${hh * hh}} = ${x}$, and $\\dfrac{dx}{dt} = ${v}$.`,
          `$\\dfrac{dD}{dt} = \\dfrac{x}{D}\\cdot\\dfrac{dx}{dt} = \\dfrac{${x}(${v})}{${D}} = ${rt(rate)}${terminates(rate, 4) ? '' : ` \\approx ${fmtFixed(rate, 1)}`}$`,
          `The distance is increasing at $${rt(rate)}${terminates(rate, 4) ? '' : ` \\approx ${fmtFixed(rate, 1)}`}$ km/h.`,
        ],
      };
    }

    // ---------------- difficulty 3 ----------------
    if (kind === 'cone') {
      const { R, H, Q, h0, mode } = retry(
        () => {
          const [R, H] = rng.pick([[2, 6], [3, 6], [4, 8], [3, 9], [5, 10], [2, 4], [1.5, 6]] as const);
          return { R, H, Q: rng.pick([0.5, 1, 1.5, 2, 3]), h0: rng.int(1, H - 1), mode: rng.pick(['fill', 'fill', 'drain', 'radius'] as const) };
        },
        (o) => {
          const k = o.R / o.H;
          const dh = o.Q / (Math.PI * k * k * o.h0 * o.h0);
          const v = o.mode === 'radius' ? k * dh : dh;
          return safeRound(v, 3) && v >= 0.02 && v <= 5;
        },
        300,
      );
      const k = R / H;
      const q = Q / (k * k * h0 * h0); // dh/dt = q/π
      const dh = q / Math.PI;
      const value = mode === 'radius' ? k * dh : dh;
      const exactQ = mode === 'radius' ? k * q : q;
      const kTex = tn(k);
      const ask =
        mode === 'fill'
          ? `Water flows into the tank at $${dec(Q)}$ m³/min. How fast is the water level rising when the water is $${h0}$ m deep?`
          : mode === 'drain'
            ? `Water drains out of the bottom of the tank at $${dec(Q)}$ m³/min. How fast is the water level falling when the water is $${h0}$ m deep?`
            : `Water flows into the tank at $${dec(Q)}$ m³/min. How fast is the radius of the water's surface increasing when the water is $${h0}$ m deep?`;
      return {
        prompt: `A water tank is an inverted cone (vertex down) with a top radius of $${dec(R)}$ m and a height of $${H}$ m. ${ask} Give the exact value or round to the nearest thousandth.`,
        figure: coneFig(R, H, h0 / H),
        parts: [exactPart(value, 3, { suffix: 'm/min', exact: overPiStr(exactQ) })],
        hints: ['Use similar triangles to write the radius $r$ of the water surface in terms of the depth $h$: $\\dfrac{r}{h} = \\dfrac{' + `${dec(R)}` + '}{' + `${H}` + '}$.', 'Substitute into $V = \\frac{1}{3}\\pi r^2 h$ so that $V$ depends on $h$ alone, then differentiate with respect to $t$.'],
        solution: [
          `Similar triangles: $\\dfrac{r}{h} = \\dfrac{${dec(R)}}{${H}}$, so $r = ${kTex}h$.`,
          `$V = \\dfrac{1}{3}\\pi r^2 h = \\dfrac{1}{3}\\pi\\left(${kTex}h\\right)^2 h = ${tn((k * k) / 3)}\\pi h^3$`,
          `$\\dfrac{dV}{dt} = ${tn(k * k)}\\pi h^2\\dfrac{dh}{dt}$`,
          `${mode === 'drain' ? `The volume is decreasing, so $\\dfrac{dV}{dt} = -${dec(Q)}$: ` : ''}$${mode === 'drain' ? '-' : ''}${dec(Q)} = ${tn(k * k)}\\pi(${h0})^2\\dfrac{dh}{dt} \\Rightarrow \\dfrac{dh}{dt} = ${mode === 'drain' ? '-' : ''}${overPiTex(q)} \\approx ${mode === 'drain' ? '-' : ''}${fmtFixed(dh, 3)}$`,
          ...(mode === 'radius' ? [`$r = ${kTex}h$, so $\\dfrac{dr}{dt} = ${kTex}\\dfrac{dh}{dt} = ${overPiTex(exactQ)} \\approx ${fmtFixed(value, 3)}$`] : []),
          mode === 'fill'
            ? `The water level is rising at $${overPiTex(q)} \\approx ${fmtFixed(dh, 3)}$ m/min.`
            : mode === 'drain'
              ? `The negative sign means the level is going down: it is falling at $${overPiTex(q)} \\approx ${fmtFixed(dh, 3)}$ m/min.`
              : `The radius of the surface is increasing at $${overPiTex(exactQ)} \\approx ${fmtFixed(value, 3)}$ m/min.`,
        ],
      };
    }

    if (kind === 'balloon') {
      const { dd, y, D, v } = retry(
        () => {
          const [dd, y, D] = rng.pick([[30, 40, 50], [40, 30, 50], [60, 80, 100], [80, 60, 100], [50, 120, 130], [120, 50, 130], [90, 120, 150], [120, 90, 150]] as const);
          return { dd, y, D, v: rng.pick([2, 3, 4, 5, 6]) };
        },
        (o) => {
          const ang = (o.v * o.dd) / (o.D * o.D);
          const dist = (o.y * o.v) / o.D;
          return (terminates(ang, 3) || safeRound(ang, 3)) && (terminates(dist, 2) || safeRound(dist, 2)) && ang >= 0.01;
        },
        200,
      );
      const ang = (v * dd) / (dd * dd + y * y);
      const dist = (y * v) / D;
      return {
        prompt: `A hot-air balloon lifts off from a field and rises straight up at $${v}$ m/s. ${name} watches from a point on the ground $${dd}$ m from the lift-off point. When the balloon is $${y}$ m up, how fast is the angle of elevation of ${name}'s line of sight increasing, and how fast is the distance between ${name} and the balloon increasing? Give the angle rate in radians per second, exactly or to the nearest thousandth, and the distance rate exactly or to the nearest hundredth.`,
        figure: { type: 'rightTriangle', vertices: { right: 'L', a: 'O', b: 'B' }, legA: dd, legB: y, sideLabels: { ra: `${dd} m`, rb: 'y', ab: 'D' }, angleLabels: { a: 'θ' } },
        parts: [exactPart(ang, 3, { label: 'Angle', suffix: 'rad/s', ...(terminates(ang, 3) ? {} : { exact: ratStr(ang) }) }), ratePart(dist, 2, 'm/s', undefined, 'Distance')],
        hints: [`Let $y$ be the height of the balloon. Then $\\tan\\theta = \\dfrac{y}{${dd}}$ and $D^2 = ${dd}^2 + y^2$.`, 'Differentiate each equation with respect to $t$ (the derivative of $\\tan\\theta$ is $\\sec^2\\theta\\,\\dfrac{d\\theta}{dt}$), then substitute the values at that moment.'],
        solution: [
          `$\\tan\\theta = \\dfrac{y}{${dd}}$, so $\\sec^2\\theta\\,\\dfrac{d\\theta}{dt} = \\dfrac{1}{${dd}}\\cdot\\dfrac{dy}{dt}$.`,
          `When $y = ${y}$: $D = \\sqrt{${dd}^2 + ${y}^2} = ${D}$, so $\\cos\\theta = \\dfrac{${dd}}{${D}}$ and $\\sec^2\\theta = \\dfrac{${D * D}}{${dd * dd}}$.`,
          `$\\dfrac{d\\theta}{dt} = \\dfrac{${dd * dd}}{${D * D}}\\cdot\\dfrac{${v}}{${dd}} = ${rt(ang)}${terminates(ang, 3) ? '' : ` \\approx ${fmtFixed(ang, 3)}`}$ rad/s`,
          `$D^2 = ${dd}^2 + y^2$, so $2D\\dfrac{dD}{dt} = 2y\\dfrac{dy}{dt}$ and $\\dfrac{dD}{dt} = \\dfrac{${y}(${v})}{${D}} = ${rt(dist)}${terminates(dist, 4) ? '' : ` \\approx ${fmtFixed(dist, 2)}`}$ m/s`,
          `The angle increases at $${rt(ang)}${terminates(ang, 3) ? '' : ` \\approx ${fmtFixed(ang, 3)}`}$ rad/s and the distance at $${rt(dist)}${terminates(dist, 4) ? '' : ` \\approx ${fmtFixed(dist, 2)}`}$ m/s.`,
        ],
      };
    }

    if (kind === 'carsApproach') {
      const { x, y, D, a, b, sa, sb, rate } = retry(
        () => {
          const [x, y, D] = rng.pick(TRIPLES);
          const a = rng.pick([60, 70, 80, 90, 100]);
          const b = rng.pick([50, 60, 80, 90, 100, 110]);
          const sa = rng.pick([1, -1]);
          const sb = sa === 1 ? -1 : rng.pick([1, -1]);
          return { x, y, D, a, b, sa, sb, rate: (sa * a * x + sb * b * y) / D };
        },
        (o) => Math.abs(o.rate) >= 2 && (terminates(o.rate, 4) || safeRound(o.rate, 1)),
        200,
      );
      const inc = rate > 0;
      const desc = (dir: string, toward: boolean, s: number) => `driving ${toward ? `${dir === 'north' ? 'south' : 'west'} toward the intersection` : `${dir} away from the intersection`} at $${s}$ km/h`;
      return {
        prompt: `Two straight roads cross at right angles near Lakeside. At a certain moment, car A is $${x}$ km north of the intersection, ${desc('north', sa < 0, a)}, and car B is $${y}$ km east of it, ${desc('east', sb < 0, b)}. At that moment, is the distance between the cars increasing or decreasing, and at what rate? Give the rate exactly or to the nearest tenth.`,
        figure: carsFig(x, y, sa > 0, sb > 0),
        parts: [part(fixedChoice(['Increasing', 'Decreasing'], inc ? 0 : 1)), ratePart(Math.abs(rate), 1, 'km/h', undefined, 'Rate')],
        hints: ['$D^2 = x^2 + y^2$, so $D\\dfrac{dD}{dt} = x\\dfrac{dx}{dt} + y\\dfrac{dy}{dt}$.', 'A car driving toward the intersection has a decreasing distance from it, so its rate is negative. The sign of $\\dfrac{dD}{dt}$ tells you whether $D$ is increasing or decreasing.'],
        solution: [
          `Let $x$ and $y$ be the cars' distances from the intersection: $D^2 = x^2 + y^2$, so $D\\dfrac{dD}{dt} = x\\dfrac{dx}{dt} + y\\dfrac{dy}{dt}$.`,
          `Now $x = ${x}$, $y = ${y}$, $D = ${D}$, $\\dfrac{dx}{dt} = ${sa * a}$ and $\\dfrac{dy}{dt} = ${sb * b}$.`,
          `$${D}\\dfrac{dD}{dt} = ${x}(${sa * a}) + ${y}(${sb * b}) = ${sa * a * x + sb * b * y} \\Rightarrow \\dfrac{dD}{dt} = ${rt(rate)}${terminates(rate, 4) ? '' : ` \\approx ${fmtFixed(rate, 1)}`}$`,
          `$\\dfrac{dD}{dt} ${inc ? '> 0' : '< 0'}$, so the distance is ${inc ? 'increasing' : 'decreasing'} at $${rt(Math.abs(rate))}${terminates(rate, 4) ? '' : ` \\approx ${fmtFixed(Math.abs(rate), 1)}`}$ km/h.`,
        ],
      };
    }

    if (kind === 'ladderAngle') {
      const { x, y, L, v } = retry(
        () => {
          const [x, y, L] = rng.pick(LADDERS);
          return { x, y, L, v: rng.pick([0.2, 0.3, 0.4, 0.5, 0.6]) };
        },
        (o) => terminates(o.v / o.y, 3) || safeRound(o.v / o.y, 3),
        200,
      );
      const rate = v / y;
      return {
        prompt: `A $${dec(L)}$ m ladder leans against a vertical wall. The bottom of the ladder slides away from the wall at $${dec(v)}$ m/s. How fast is the angle between the ladder and the ground decreasing when the bottom is $${dec(x)}$ m from the wall? Give the answer in radians per second, exactly or to the nearest thousandth.`,
        figure: { type: 'rightTriangle', vertices: { right: 'C', a: 'A', b: 'B' }, legA: x, legB: y, sideLabels: { ra: 'x', ab: `${dec(L)} m` }, angleLabels: { a: 'θ' }, scene: 'ladder' },
        parts: [ratePart(rate, 3, 'rad/s')],
        hints: [`Let $\\theta$ be the angle between the ladder and the ground and $x$ the distance from the wall to the bottom: $\\cos\\theta = \\dfrac{x}{${dec(L)}}$.`, 'Differentiate with respect to $t$: $-\\sin\\theta\\,\\dfrac{d\\theta}{dt} = \\dfrac{1}{' + `${dec(L)}` + '}\\cdot\\dfrac{dx}{dt}$. Find $\\sin\\theta$ from the triangle.'],
        solution: [
          `$\\cos\\theta = \\dfrac{x}{${dec(L)}}$, so $-\\sin\\theta\\,\\dfrac{d\\theta}{dt} = \\dfrac{1}{${dec(L)}}\\cdot\\dfrac{dx}{dt}$.`,
          `When $x = ${dec(x)}$, the top is $\\sqrt{${dec(L * L)} - ${dec(x * x)}} = ${dec(y)}$ m high, so $\\sin\\theta = \\dfrac{${dec(y)}}{${dec(L)}}$.`,
          `$-\\dfrac{${dec(y)}}{${dec(L)}}\\cdot\\dfrac{d\\theta}{dt} = \\dfrac{${dec(v)}}{${dec(L)}} \\Rightarrow \\dfrac{d\\theta}{dt} = -\\dfrac{${dec(v)}}{${dec(y)}} = -${rt(rate)}${terminates(rate, 4) ? '' : ` \\approx -${fmtFixed(rate, 3)}`}$`,
          `The angle is decreasing at $${rt(rate)}${terminates(rate, 4) ? '' : ` \\approx ${fmtFixed(rate, 3)}`}$ rad/s.`,
        ],
      };
    }

    // snowball
    const { Q, R } = retry(
      () => ({ Q: rng.pick([10, 20, 30, 40, 50, 60]), R: rng.pick([3, 4, 5, 6, 8, 10]) }),
      (o) => safeRound(o.Q / (4 * Math.PI * o.R * o.R), 3) && o.Q / (4 * Math.PI * o.R * o.R) >= 0.02 && (terminates((2 * o.Q) / o.R, 2) || safeRound((2 * o.Q) / o.R, 2)),
      200,
    );
    const q = Q / (4 * R * R);
    const dr = q / Math.PI;
    const dS = (2 * Q) / R;
    return {
      prompt: `A spherical snowball is melting so that its volume decreases at $${Q}$ cm³/min. When its radius is $${R}$ cm, how fast is the radius decreasing, and how fast is the surface area decreasing? ($V = \\frac{4}{3}\\pi r^3$ and $S = 4\\pi r^2$.) Give exact values or round to the nearest thousandth.`,
      parts: [exactPart(dr, 3, { label: 'Radius', suffix: 'cm/min', exact: overPiStr(q) }), ratePart(dS, 3, 'cm²/min', undefined, 'Surface area')],
      hints: [RR_HINT, 'First find $\\dfrac{dr}{dt}$ from $\\dfrac{dV}{dt} = 4\\pi r^2\\dfrac{dr}{dt}$ (with $\\dfrac{dV}{dt}$ negative), then use $\\dfrac{dS}{dt} = 8\\pi r\\dfrac{dr}{dt}$.'],
      solution: [
        `$\\dfrac{dV}{dt} = 4\\pi r^2\\dfrac{dr}{dt}$ with $\\dfrac{dV}{dt} = -${Q}$: $-${Q} = 4\\pi(${R})^2\\dfrac{dr}{dt}$, so $\\dfrac{dr}{dt} = -${overPiTex(q)} \\approx -${fmtFixed(dr, 3)}$.`,
        `$S = 4\\pi r^2$, so $\\dfrac{dS}{dt} = 8\\pi r\\dfrac{dr}{dt} = 8\\pi(${R})\\left(-${overPiTex(q)}\\right) = -${rt(dS)}$`,
        `The radius is decreasing at $${overPiTex(q)} \\approx ${fmtFixed(dr, 3)}$ cm/min and the surface area at $${rt(dS)}${terminates(dS, 3) ? '' : ` \\approx ${fmtFixed(dS, 3)}`}$ cm²/min.`,
      ],
    };
  },
});

export const OPTIMIZATION_SKILLS: SkillDef[] = [optimization, relatedRates];
