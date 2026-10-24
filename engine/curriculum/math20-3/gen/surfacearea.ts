/** Math 20-3 Unit 2 — Surface Area (M1, A1): prisms, cylinders, pyramids, cones, spheres and applied problems. */
import { numPart, retry, roundingPhrase, skill } from '../../helpers.ts';
import { fmt, fmtFixed, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Part, PlaneFigure, SkillDef, SolidFigure } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

export const tx = (u: string) => `\\text{${u}}`;
export const sq = (u: string) => `\\text{${u}}^2`;
/** Remove floating-point noise from an exact decimal result. */
export const exact = (x: number) => roundTo(x, 6);

export function withGroups(s: string): string {
  const neg = s.startsWith('-');
  const [i, f] = (neg ? s.slice(1) : s).split('.');
  const g = i.length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : i;
  return `${neg ? '-' : ''}${g}${f ? `.${f}` : ''}`;
}
/** LaTeX number (trailing zeros dropped) with SI thin-space grouping for 5+ digit numbers. */
export const n = (x: number, dec = 4) => withGroups(fmt(x, dec));
/** LaTeX number with exactly `dec` decimals. */
export const nf = (x: number, dec: number) => withGroups(fmtFixed(x, dec));
export const len = (x: number, u: string) => `$${n(x)}\\ ${tx(u)}$`;
export const ar = (x: number, u: string) => `$${n(x)}\\ ${sq(u)}$`;
export const arR = (x: number, u: string, dec: number) => `$${nf(x, dec)}\\ ${sq(u)}$`;

/** Money for Markdown text, kept outside maths: \$1,234.50 */
export function cash(x: number): string {
  const [i, f] = fmtFixed(x, 2).split('.');
  return `\\$${i.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${f}`;
}

export const UNIT: Record<string, { one: string; many: string }> = {
  mm: { one: 'millimetre', many: 'millimetres' },
  cm: { one: 'centimetre', many: 'centimetres' },
  m: { one: 'metre', many: 'metres' },
  in: { one: 'inch', many: 'inches' },
  ft: { one: 'foot', many: 'feet' },
  yd: { one: 'yard', many: 'yards' },
};

/** "to the nearest tenth of a square metre", "to the nearest square foot". */
export function sqRound(dec: number, u: string): string {
  const w = `square ${UNIT[u].one}`;
  return dec === 0 ? `to the nearest ${w}` : `${roundingPhrase(dec)} of a ${w}`;
}

/** True when rounding to `dec` places would sit on (or near) a ...5 boundary, so a worked step shown to one more place never ends in 5. */
export function nearHalf(v: number, dec: number): boolean {
  const x = Math.abs(v) * 10 ** dec;
  return Math.abs(x - Math.floor(x) - 0.5) < 0.06;
}

/** A quotient that is not close to a whole number, so rounding up clearly matters. */
export function notWhole(q: number): boolean {
  const f = q - Math.floor(q);
  return f > 0.08 && f < 0.92;
}

export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Answer rounded to `dec` places. */
export const rPart = (v: number, dec: number, suffix: string, label?: string): Part => numPart(v, { decimals: dec, suffix, label });
/** Exact answer, shown as a decimal on review screens. */
export const xPart = (v: number, suffix: string, label?: string): Part => numPart(exact(v), { suffix, label, display: 'decimal' });
/** Money to the nearest cent. */
export const moneyPart = (v: number, label: string): Part => numPart(v, { decimals: 2, tolerance: 0.011, label });

export const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Kiona', 'Liam', 'Mei', 'Tariq', 'Sofia', 'Aiden', 'Nadia', 'Ravi',
  'Chloé', 'Dakota', 'Hamid', 'Jasmine', 'Wei', 'Olivia', 'Kwame', 'Simran', 'Ethan', 'Fatima', 'Noah',
  'Leilani', 'Émilie', 'Tyler', 'Aaliyah', 'Connor', 'Anika', 'Gurpreet', 'Marcus', 'Ayesha', 'Owen',
  'Sienna', 'Jun', 'Malik', 'Harpreet', 'Isabelle', 'Cody', 'Talia', 'Yusuf', 'Brooklyn', 'Sanjay',
  'Rosalie', 'Nathan', 'Ingrid', 'Tanis', 'Mariam',
];
export const TOWNS = [
  'Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury',
  'Ashford', 'Clearwater', 'Elmwood', 'Cedar Hills', 'Oakdale', 'Fernbrook', 'Millbrook', 'Glenview',
  'Birchwood', 'Fairhaven', 'Kingsbury', 'Willowdale',
];

// ---------------------------------------------------------------------------
// Figure helpers
// ---------------------------------------------------------------------------

export type P2 = [number, number];
export const r3 = (v: number) => Math.round(v * 1000) / 1000;

export const prismFig = (l: number, w: number, h: number, u: string): SolidFigure => ({
  type: 'solid',
  shape: 'rectPrism',
  labels: { l: `${fmt(l)} ${u}`, w: `${fmt(w)} ${u}`, h: `${fmt(h)} ${u}` },
});
export const cylFig = (r: number, h: number, u: string, useD: boolean, hLabel?: string): SolidFigure => ({
  type: 'solid',
  shape: 'cylinder',
  labels: useD ? { d: `${fmt(2 * r)} ${u}`, h: hLabel ?? `${fmt(h)} ${u}` } : { r: `${fmt(r)} ${u}`, h: hLabel ?? `${fmt(h)} ${u}` },
});

/** A label with no visible dot (the text sits up and to the right of the point). */
export const tag = (x: number, y: number, label: string) => ({ x: r3(x), y: r3(y), label, color: 'muted' as const, open: true });

/**
 * End view of an isosceles triangle (tent, greenhouse, gift box), drawn to scale on a blank canvas
 * with the base, the dashed height and one sloped side labelled.
 */
export function endViewFig(b: number, h: number, labels: { b: string; h: string; s: string }, caption: string): PlaneFigure {
  const k = Math.min(6 / b, 4.2 / h);
  const half = (k * b) / 2;
  const y0 = 1;
  const top = y0 + k * h;
  const L: P2 = [r3(5 - half), y0];
  const R: P2 = [r3(5 + half), y0];
  const A: P2 = [5, r3(top)];
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: 10, yMin: 0, yMax: 6.2, step: 10 },
    hideTickLabels: true,
    polylines: [{ points: [L, R, A, L], color: 'brand' }],
    segments: [{ from: A, to: [5, y0], dashed: true, color: 'muted' }],
    points: [tag(4.3, y0 - 0.75, labels.b), tag(5.22, y0 + (k * h) / 2 - 0.3, labels.h), tag(5 + half / 2 + 0.25, y0 + (k * h) / 2 + 0.25, labels.s)],
    caption,
  };
}

/** End wall of a shed with a gable: a rectangle with a triangle on top, drawn on a blank canvas. */
function gableEndFig(W: number, H: number, g: number, u: string, caption: string): PlaneFigure {
  const k = Math.min(6 / W, 4.4 / (H + g));
  const x0 = 5 - (k * W) / 2;
  const x1 = 5 + (k * W) / 2;
  const y0 = 0.9;
  const yw = y0 + k * H;
  const yp = yw + k * g;
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: 10, yMin: 0, yMax: 6.2, step: 10 },
    hideTickLabels: true,
    polylines: [{ points: [[r3(x0), y0], [r3(x1), y0], [r3(x1), r3(yw)], [5, r3(yp)], [r3(x0), r3(yw)], [r3(x0), y0]], color: 'brand' }],
    segments: [
      { from: [r3(x0), r3(yw)], to: [r3(x1), r3(yw)], dashed: true, color: 'muted' },
      { from: [5, r3(yp)], to: [5, r3(yw)], dashed: true, color: 'muted' },
    ],
    points: [tag(4.3, y0 - 0.75, `${fmt(W)} ${u}`), tag(x1 + 0.25, y0 + (k * H) / 2 - 0.25, `${fmt(H)} ${u}`), tag(5.22, yw + (k * g) / 2 - 0.3, `${fmt(g)} ${u}`)],
    caption,
  };
}

// ---------------------------------------------------------------------------
// Lesson 2.1 — Prisms
// ---------------------------------------------------------------------------

function boxSteps(l: number, w: number, h: number, u: string) {
  const tb = exact(2 * l * w);
  const fb = exact(2 * l * h);
  const ends = exact(2 * w * h);
  const SA = exact(tb + fb + ends);
  return {
    SA,
    steps: [
      `Top and bottom: $2 \\times ${n(l)} \\times ${n(w)} = ${n(tb)}\\ ${sq(u)}$`,
      `Front and back: $2 \\times ${n(l)} \\times ${n(h)} = ${n(fb)}\\ ${sq(u)}$`,
      `Two ends: $2 \\times ${n(w)} \\times ${n(h)} = ${n(ends)}\\ ${sq(u)}$`,
      `$SA = ${n(tb)} + ${n(fb)} + ${n(ends)} = ${n(SA)}\\ ${sq(u)}$`,
    ],
  };
}

const BOX_HINTS = ['A closed rectangular prism has 6 faces in 3 matching pairs: top and bottom, front and back, and the two ends.', '$SA = 2lw + 2lh + 2wh$'];

/** Isosceles triangle ends [base, height, sloped side] with whole-number sides. */
const ISO_ENDS: Array<[number, number, number]> = [
  [6, 4, 5],
  [8, 3, 5],
  [10, 12, 13],
  [12, 8, 10],
  [16, 6, 10],
  [24, 5, 13],
  [24, 9, 15],
];

const saPrism = skill({
  id: 'm203-sa-prism',
  name: 'Surface area of prisms',
  description: 'Find the surface area of rectangular and triangular prisms, including only the faces a job needs.',
  outcomes: ['M1', 'A1'],
  lessonId: 'm203-2-1',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      if (rng.chance(0.25)) {
        const c = rng.pick([
          { thing: 'closed cube-shaped storage box', u: 'cm', lo: 20, hi: 60 },
          { thing: 'cube-shaped concrete block', u: 'cm', lo: 10, hi: 40 },
          { thing: 'closed cube-shaped wooden crate', u: 'ft', lo: 2, hi: 6 },
          { thing: 'cube-shaped block of ice for a carving contest', u: 'in', lo: 12, hi: 30 },
        ]);
        const s = rng.int(c.lo, c.hi);
        const SA = 6 * s * s;
        return {
          prompt: `A ${c.thing} has edges that are ${len(s, c.u)} long. What is its surface area?`,
          figure: { type: 'solid', shape: 'cube', labels: { l: `${s} ${c.u}` } },
          parts: [xPart(SA, `${c.u}²`)],
          hints: ['A cube has 6 faces, and every face is the same square.', 'Find the area of one face, then multiply by 6.'],
          solution: [`One face: $${s} \\times ${s} = ${n(s * s)}\\ ${sq(c.u)}$`, `Six faces: $6 \\times ${n(s * s)} = ${n(SA)}\\ ${sq(c.u)}$`, `The surface area is ${ar(SA, c.u)}.`],
        };
      }
      const c = rng.pick([
        { thing: 'closed cardboard shipping box', u: 'cm', lo: 20, hi: 80 },
        { thing: 'steel job-site toolbox', u: 'in', lo: 10, hi: 36 },
        { thing: 'closed wooden storage crate', u: 'ft', lo: 2, hi: 7 },
        { thing: 'closed insulated cooler', u: 'in', lo: 12, hi: 30 },
        { thing: 'closed plywood tool chest', u: 'cm', lo: 40, hi: 90 },
        { thing: 'closed metal electrical box', u: 'cm', lo: 10, hi: 40 },
      ]);
      const l = rng.int(c.lo, c.hi);
      const w = rng.intExcept(c.lo, c.hi, [l]);
      const h = rng.int(c.lo, c.hi);
      const L = Math.max(l, w);
      const W = Math.min(l, w);
      const { SA, steps } = boxSteps(L, W, h, c.u);
      return {
        prompt: `A ${c.thing} is ${len(L, c.u)} long, ${len(W, c.u)} wide and ${len(h, c.u)} high. What is its total surface area?`,
        figure: prismFig(L, W, h, c.u),
        parts: [xPart(SA, `${c.u}²`)],
        hints: BOX_HINTS,
        solution: [...steps, `The surface area is ${ar(SA, c.u)}.`],
      };
    }
    if (d === 2) {
      const mode = rng.pick(['wedge', 'tent', 'decimal'] as const);
      if (mode === 'wedge') {
        const c = rng.pick([
          { thing: 'A rubber wheel chock', u: 'cm', tri: [[9, 12, 15], [5, 12, 13], [8, 15, 17], [12, 16, 20]], L: [12, 25] },
          { thing: 'A solid wooden levelling wedge', u: 'in', tri: [[3, 4, 5], [6, 8, 10], [5, 12, 13]], L: [4, 12] },
          { thing: 'A foam safety wedge for a gym', u: 'in', tri: [[9, 12, 15], [12, 16, 20], [15, 20, 25], [7, 24, 25]], L: [24, 48] },
          { thing: 'A concrete splash block for a downspout', u: 'cm', tri: [[6, 8, 10], [9, 12, 15], [5, 12, 13]], L: [30, 60] },
        ]);
        const [a, b, hyp] = rng.pick(c.tri);
        const L = rng.int(c.L[0], c.L[1]);
        const u = c.u;
        const tri = a * b;
        const bottom = b * L;
        const back = a * L;
        const slope = hyp * L;
        const SA = tri + bottom + back + slope;
        return {
          prompt: `${c.thing} is shaped like a right triangular prism. Each triangular end has legs of ${len(a, u)} and ${len(b, u)} and a sloped side of ${len(hyp, u)}. The prism is ${len(L, u)} long. What is its total surface area?`,
          figure: { type: 'solid', shape: 'triPrism', labels: { a: `${a} ${u}`, b: `${b} ${u}`, c: `${hyp} ${u}`, l: `${L} ${u}` } },
          parts: [xPart(SA, `${u}²`)],
          hints: ['A triangular prism has 2 triangular ends and 3 rectangular faces.', 'Each triangle has area $\\tfrac12 \\times$ base $\\times$ height. Each rectangle is one side of the triangle times the length of the prism.'],
          solution: [
            `Two triangular ends: $2 \\times \\tfrac12 \\times ${a} \\times ${b} = ${tri}\\ ${sq(u)}$`,
            `Bottom: $${b} \\times ${L} = ${bottom}\\ ${sq(u)}$`,
            `Upright back: $${a} \\times ${L} = ${back}\\ ${sq(u)}$`,
            `Sloped face: $${hyp} \\times ${L} = ${slope}\\ ${sq(u)}$`,
            `$SA = ${tri} + ${bottom} + ${back} + ${slope} = ${n(SA)}\\ ${sq(u)}$`,
            `The surface area is ${ar(SA, u)}.`,
          ],
        };
      }
      if (mode === 'tent') {
        const c = rng.pick([
          { thing: 'a closed triangular gift box', u: 'cm', ends: [0, 1, 2, 3, 4], L: [15, 40], what: 'cardboard' },
          { thing: 'an A-frame tent with a sewn-in floor', u: 'ft', ends: [0, 1], L: [6, 10], what: 'nylon fabric' },
          { thing: 'a closed A-frame chicken coop', u: 'ft', ends: [0, 1], L: [4, 8], what: 'plywood' },
          { thing: 'a closed triangular shipping tube for posters', u: 'cm', ends: [0, 1, 2], L: [60, 100], what: 'cardboard' },
        ]);
        const [b, h, s] = ISO_ENDS[rng.pick(c.ends)];
        const L = rng.int(c.L[0], c.L[1]);
        const u = c.u;
        const tri = b * h;
        const floor = b * L;
        const sides = 2 * s * L;
        const SA = tri + floor + sides;
        return {
          prompt: `${name} is making ${c.thing}, which is a triangular prism. Each triangular end has a base of ${len(b, u)}, a height of ${len(h, u)} and two sloped sides of ${len(s, u)}. The prism is ${len(L, u)} long. How much ${c.what} covers all five faces? (Ignore overlaps.)`,
          figure: endViewFig(b, h, { b: `${b} ${u}`, h: `${h} ${u}`, s: `${s} ${u}` }, `End view; the prism is ${L} ${u} long`),
          parts: [xPart(SA, `${u}²`)],
          hints: ['The faces are 2 triangles, the bottom rectangle and 2 sloped rectangles.', 'Triangles: $2 \\times \\tfrac12 bh$. Each rectangle is a side of the triangle times the length.'],
          solution: [
            `Two triangular ends: $2 \\times \\tfrac12 \\times ${b} \\times ${h} = ${tri}\\ ${sq(u)}$`,
            `Bottom: $${b} \\times ${L} = ${floor}\\ ${sq(u)}$`,
            `Two sloped sides: $2 \\times ${s} \\times ${L} = ${sides}\\ ${sq(u)}$`,
            `$SA = ${tri} + ${floor} + ${sides} = ${n(SA)}\\ ${sq(u)}$`,
            `${name} needs ${ar(SA, u)} of ${c.what}.`,
          ],
        };
      }
      const metric = rng.chance(0.5);
      const u = metric ? 'm' : 'ft';
      const [l, w, h] = metric
        ? retry(() => [rng.int(8, 24) / 10, rng.int(5, 15) / 10, rng.int(5, 15) / 10], ([x, y]) => x > y)
        : retry(() => [rng.int(6, 20) / 2, rng.int(4, 12) / 2, rng.int(4, 12) / 2], ([x, y, z]) => x > y && [x, y, z].some((v) => v % 1 !== 0));
      const c = rng.pick(
        metric
          ? [
              { thing: 'a closed plywood storage bin', what: 'plywood' },
              { thing: 'a closed wooden shipping crate', what: 'plywood' },
              { thing: 'a closed steel job box for a construction site', what: 'sheet steel' },
            ]
          : [
              { thing: 'a closed wooden tack box for a horse trailer', what: 'plywood' },
              { thing: 'a closed sheet-metal plenum box for a furnace', what: 'sheet metal' },
              { thing: 'a closed insulated pump-house cover', what: 'insulated panel' },
            ],
      );
      const { SA, steps } = boxSteps(l, w, h, u);
      return {
        prompt: `${name} is building ${c.thing} that is ${len(l, u)} long, ${len(w, u)} wide and ${len(h, u)} high. How much ${c.what} covers all six faces? (Ignore overlaps.)`,
        figure: prismFig(l, w, h, u),
        parts: [xPart(SA, `${u}²`)],
        hints: BOX_HINTS,
        solution: [...steps, `${name} needs ${ar(SA, u)} of ${c.what}.`],
      };
    }
    const mode = rng.pick(['openTop', 'tent', 'ramp'] as const);
    if (mode === 'openTop') {
      if (rng.chance(0.5)) {
        const c = rng.pick([
          { thing: 'a galvanized water trough for horses', what: 'sheet metal' },
          { thing: 'a cedar planter box', what: 'cedar' },
          { thing: 'a steel tool tray for a service truck', what: 'sheet steel' },
        ]);
        const L = rng.int(4, 10);
        const W = rng.int(2, Math.min(4, L - 1));
        const depthIn = rng.pick([6, 9, 12, 15, 18, 21]);
        const h = depthIn / 12;
        const bottom = L * W;
        const fb = exact(2 * L * h);
        const ends = exact(2 * W * h);
        const SA = exact(bottom + fb + ends);
        return {
          prompt: `${name} is making ${c.thing} with no top. It is ${len(L, 'ft')} long, ${len(W, 'ft')} wide and ${len(depthIn, 'in')} deep. How much ${c.what} is needed for the outside, in square feet? (Ignore overlaps.)`,
          figure: { type: 'solid', shape: 'rectPrism', labels: { l: `${L} ft`, w: `${W} ft`, h: `${depthIn} in` } },
          parts: [xPart(SA, 'ft²')],
          hints: ['Change every measurement to the same unit first: $12\\ \\text{in} = 1\\ \\text{ft}$.', 'With no top there are 5 faces: $SA = lw + 2lh + 2wh$.'],
          solution: [
            `Change the depth to feet: $${depthIn} \\div 12 = ${n(h)}\\ \\text{ft}$`,
            `Bottom only (no top): $${L} \\times ${W} = ${bottom}\\ ${sq('ft')}$`,
            `Front and back: $2 \\times ${L} \\times ${n(h)} = ${n(fb)}\\ ${sq('ft')}$`,
            `Two ends: $2 \\times ${W} \\times ${n(h)} = ${n(ends)}\\ ${sq('ft')}$`,
            `$SA = ${bottom} + ${n(fb)} + ${n(ends)} = ${n(SA)}\\ ${sq('ft')}$`,
            `${name} needs ${ar(SA, 'ft')} of ${c.what}.`,
          ],
        };
      }
      const c = rng.pick([
        { thing: 'a glass aquarium with no lid', what: 'glass' },
        { thing: 'an open-top glass terrarium', what: 'glass' },
        { thing: 'an open-top acrylic display case for a museum', what: 'acrylic sheet' },
      ]);
      const L = rng.int(8, 20) / 10;
      const Wc = rng.int(3, 6) * 10;
      const Hc = rng.intExcept(3, 7, [Wc / 10]) * 10;
      const W = Wc / 100;
      const H = Hc / 100;
      const bottom = exact(L * W);
      const fb = exact(2 * L * H);
      const ends = exact(2 * W * H);
      const SA = exact(bottom + fb + ends);
      return {
        prompt: `${name} is building ${c.thing}. It is ${len(L, 'm')} long, ${len(Wc, 'cm')} wide and ${len(Hc, 'cm')} high. How much ${c.what} is needed, in square metres? (Ignore the thickness of the ${c.what}.)`,
        figure: { type: 'solid', shape: 'rectPrism', labels: { l: `${n(L)} m`, w: `${Wc} cm`, h: `${Hc} cm` } },
        parts: [xPart(SA, 'm²')],
        hints: ['Change every measurement to metres first: $100\\ \\text{cm} = 1\\ \\text{m}$.', 'With no lid there are 5 faces: $SA = lw + 2lh + 2wh$.'],
        solution: [
          `In metres: width $= ${Wc} \\div 100 = ${n(W)}\\ \\text{m}$, height $= ${Hc} \\div 100 = ${n(H)}\\ \\text{m}$`,
          `Bottom only (no lid): $${n(L)} \\times ${n(W)} = ${n(bottom)}\\ ${sq('m')}$`,
          `Front and back: $2 \\times ${n(L)} \\times ${n(H)} = ${n(fb)}\\ ${sq('m')}$`,
          `Two ends: $2 \\times ${n(W)} \\times ${n(H)} = ${n(ends)}\\ ${sq('m')}$`,
          `$SA = ${n(bottom)} + ${n(fb)} + ${n(ends)} = ${n(SA)}\\ ${sq('m')}$`,
          `${name} needs ${ar(SA, 'm')} of ${c.what}.`,
        ],
      };
    }
    if (mode === 'tent') {
      const imperial = rng.chance(0.5);
      const u = imperial ? 'ft' : 'm';
      const [b, h, L] = retry(
        () => (imperial ? [rng.int(6, 10), rng.int(4, 7), rng.int(7, 12)] : [rng.int(24, 40) / 10, rng.int(18, 26) / 10, rng.int(30, 60) / 10]),
        ([x, y, z]) => {
          const s = Math.hypot(x / 2, y);
          return Math.abs(s - Math.round(s)) > 0.05 && !nearHalf(x * y + 2 * s * z, 1);
        },
      );
      const s = Math.hypot(b / 2, h);
      const tri = exact(b * h);
      const sides = 2 * s * L;
      const A = tri + sides;
      const prompt = imperial
        ? `${name} is sewing an A-frame tent with two triangular ends and two sloped sides, but no floor. Each end is a triangle with a base of ${len(b, u)} and a height of ${len(h, u)}. The tent is ${len(L, u)} long. How much fabric is needed, ${sqRound(1, u)}?`
        : `A small A-frame greenhouse in ${rng.pick(TOWNS)} is covered with plastic film on its two triangular ends and two sloped sides (not the floor). Each end is a triangle with a base of ${len(b, u)} and a height of ${len(h, u)}. The greenhouse is ${len(L, u)} long. How much plastic film is needed, ${sqRound(1, u)}?`;
      return {
        prompt,
        figure: endViewFig(b, h, { b: `${n(b)} ${u}`, h: `${n(h)} ${u}`, s: 's' }, `End view; the length is ${n(L)} ${u}`),
        parts: [rPart(A, 1, `${u}²`)],
        hints: ['First find the sloped side $s$. The height splits each end into two right triangles with legs $\\tfrac{b}{2}$ and $h$.', '$s = \\sqrt{\\left(\\tfrac{b}{2}\\right)^2 + h^2}$. Then add the two triangles ($2 \\times \\tfrac12 bh$) and the two sloped rectangles ($2 \\times s \\times$ length). There is no floor.'],
        solution: [
          `Half the base: $${n(b)} \\div 2 = ${n(b / 2)}\\ ${tx(u)}$`,
          `Sloped side: $s = \\sqrt{${n(b / 2)}^2 + ${n(h)}^2} = \\sqrt{${n(exact((b * b) / 4 + h * h))}} \\approx ${nf(s, 3)}\\ ${tx(u)}$`,
          `Two triangular ends: $2 \\times \\tfrac12 \\times ${n(b)} \\times ${n(h)} = ${n(tri)}\\ ${sq(u)}$`,
          `Two sloped sides: $2 \\times ${nf(s, 3)} \\times ${n(L)} \\approx ${nf(sides, 2)}\\ ${sq(u)}$`,
          `Total: $${n(tri)} + ${nf(sides, 2)} \\approx ${nf(A, 2)}$`,
          `About ${arR(A, u, 1)} is needed.`,
        ],
      };
    }
    // ramp: the sloped top, the upright back and the two triangular sides are covered (not the bottom)
    const imperialFt = rng.chance(0.5);
    const u = imperialFt ? 'ft' : 'in';
    const [rise, run, W] = retry(
      () => (imperialFt ? [rng.int(2, 6) / 2, rng.int(4, 8), rng.int(3, 6)] : [rng.int(6, 8), 12 * rng.int(6, 8), rng.pick([36, 42, 48])]),
      ([a, b, w]) => {
        const s = Math.hypot(a, b);
        return Math.abs(s - Math.round(s)) > 0.05 && !nearHalf(s * w + a * w + a * b, imperialFt ? 1 : 0);
      },
    );
    const dec = imperialFt ? 1 : 0;
    const s = Math.hypot(rise, run);
    const top = s * W;
    const back = exact(rise * W);
    const sides = exact(rise * run);
    const A = top + back + sides;
    const thing = imperialFt ? 'a plywood skateboard ramp' : 'a wooden wheelchair ramp for a single step';
    return {
      prompt: `${name} is building ${thing}. It is a right triangular prism with a rise of ${len(rise, u)}, a run of ${len(run, u)} and a width of ${len(W, u)}. Plywood covers the sloped top, the upright back and the two triangular sides, but not the bottom. How much plywood is needed, ${sqRound(dec, u)}?`,
      figure: { type: 'solid', shape: 'triPrism', labels: { a: `${n(rise)} ${u}`, b: `${run} ${u}`, c: 's', l: `${W} ${u}` } },
      parts: [rPart(A, dec, `${u}²`)],
      hints: ['Find the length of the sloped top with the Pythagorean theorem: $s^2 = \\text{rise}^2 + \\text{run}^2$.', 'Add the sloped top ($s \\times$ width), the back (rise $\\times$ width) and two triangles ($2 \\times \\tfrac12 \\times$ rise $\\times$ run).'],
      solution: [
        `Sloped length: $s = \\sqrt{${n(rise)}^2 + ${run}^2} = \\sqrt{${n(exact(rise * rise + run * run))}} \\approx ${nf(s, 3)}\\ ${tx(u)}$`,
        `Sloped top: $${nf(s, 3)} \\times ${W} \\approx ${nf(top, 2)}\\ ${sq(u)}$`,
        `Upright back: $${n(rise)} \\times ${W} = ${n(back)}\\ ${sq(u)}$`,
        `Two triangular sides: $2 \\times \\tfrac12 \\times ${n(rise)} \\times ${run} = ${n(sides)}\\ ${sq(u)}$`,
        `Total: $${nf(top, 2)} + ${n(back)} + ${n(sides)} \\approx ${nf(A, 2)}$`,
        `${name} needs about ${arR(A, u, dec)} of plywood.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 2.1 — Cylinders
// ---------------------------------------------------------------------------

function cylSteps(r: number, h: number, u: string, kind: 'closed' | 'open' | 'lateral', bottomWord = 'the bottom'): { SA: number; steps: string[] } {
  const ends = kind === 'closed' ? 2 : kind === 'open' ? 1 : 0;
  const circK = exact(ends * r * r);
  const latK = exact(2 * r * h);
  const SA = Math.PI * (circK + latK);
  const steps: string[] = [];
  if (ends === 2) steps.push(`Two circles: $2\\pi r^2 = 2\\pi(${n(r)})^2 = ${n(circK)}\\pi\\ ${sq(u)}$`);
  if (ends === 1) steps.push(`One circle (${bottomWord}): $\\pi r^2 = \\pi(${n(r)})^2 = ${n(circK)}\\pi\\ ${sq(u)}$`);
  steps.push(`Curved side: $2\\pi r h = 2\\pi(${n(r)})(${n(h)}) = ${n(latK)}\\pi\\ ${sq(u)}$`);
  steps.push(ends ? `$SA = ${n(circK)}\\pi + ${n(latK)}\\pi = ${n(exact(circK + latK))}\\pi \\approx ${nf(SA, 2)}$` : `$A = ${n(latK)}\\pi \\approx ${nf(SA, 2)}$`);
  return { SA, steps };
}

const saCylinder = skill({
  id: 'm203-sa-cylinder',
  name: 'Surface area of cylinders',
  description: 'Find the surface area of closed and open-top cylinders, or only the curved side for labels, pipes and ducts.',
  outcomes: ['M1', 'A1'],
  lessonId: 'm203-2-1',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      const c = rng.pick([
        { thing: 'closed metal can', u: 'cm', r: [3, 8], h: [8, 20] },
        { thing: 'closed cylindrical water tank', u: 'm', r: [1, 3], h: [2, 6] },
        { thing: 'round hatbox with a lid', u: 'in', r: [5, 10], h: [5, 12] },
        { thing: 'closed cylindrical storage drum', u: 'cm', r: [25, 30], h: [80, 95] },
        { thing: 'closed air tank for a compressor', u: 'in', r: [5, 9], h: [18, 30] },
      ]);
      const [r, h] = retry(() => [rng.int(c.r[0], c.r[1]), rng.int(c.h[0], c.h[1])], ([x, y]) => !nearHalf(2 * Math.PI * x * (x + y), 1));
      const { SA, steps } = cylSteps(r, h, c.u, 'closed');
      return {
        prompt: `A ${c.thing} has a radius of ${len(r, c.u)} and a height of ${len(h, c.u)}. What is its total surface area, ${sqRound(1, c.u)}? Use the $\\pi$ key on your calculator.`,
        figure: cylFig(r, h, c.u, false),
        parts: [rPart(SA, 1, `${c.u}²`)],
        hints: ['A closed cylinder unfolds into two circles and one rectangle. The rectangle is as long as the circumference, $2\\pi r$, and as tall as the cylinder.', '$SA = 2\\pi r^2 + 2\\pi r h$'],
        solution: [...steps, `The surface area is about ${arR(SA, c.u, 1)}.`],
      };
    }
    if (d === 2) {
      if (rng.chance(0.6)) {
        const c = rng.pick([
          { lead: 'A steel oil drum', u: 'cm', d: () => rng.int(54, 60), h: () => rng.int(84, 92), tail: 'How much steel is needed to make the drum (top, bottom and curved side)?' },
          { lead: 'A hot-water tank', u: 'cm', d: () => rng.int(45, 60), h: () => 10 * rng.int(12, 16), tail: 'What is the total area of its outside surface, including the top and bottom?' },
          { lead: 'A round hay bale', u: 'ft', d: () => rng.int(4, 6), h: () => rng.int(4, 5), tail: 'It is wrapped completely in plastic, ends included. What area of plastic covers the bale?' },
          { lead: 'A closed cylindrical fuel tank', u: 'm', d: () => rng.int(12, 24) / 10, h: () => rng.int(3, 6), tail: 'What is its total surface area?' },
          { lead: 'A compressed-air tank', u: 'in', d: () => rng.int(10, 16), h: () => rng.int(24, 40), tail: 'The whole outside (a closed cylinder) gets a coat of primer. What area is primed?' },
        ]);
        const [dia, h] = retry(() => [c.d(), c.h()], ([x, y]) => !nearHalf(Math.PI * (x / 2) * (x + 2 * y), 1));
        const r = dia / 2;
        const { SA, steps } = cylSteps(r, h, c.u, 'closed');
        return {
          prompt: `${c.lead} has a diameter of ${len(dia, c.u)} and a height of ${len(h, c.u)}. ${c.tail} Round to the nearest tenth of a square ${UNIT[c.u].one}.`,
          figure: cylFig(r, h, c.u, true),
          parts: [rPart(SA, 1, `${c.u}²`)],
          hints: ['The formula uses the radius. Find it first: radius = diameter ÷ 2.', '$SA = 2\\pi r^2 + 2\\pi r h$'],
          solution: [`$r = ${n(dia)} \\div 2 = ${n(r)}\\ ${tx(c.u)}$`, ...steps, `The surface area is about ${arR(SA, c.u, 1)}.`],
        };
      }
      const c = rng.pick([
        { lead: 'A round stock tank for cattle has no lid. It has', u: 'ft', d: () => rng.int(6, 10), h: () => rng.int(2, 3), what: 'the outside of the tank (the bottom and the curved side)' },
        { lead: 'A round concrete planter has no top. It has', u: 'cm', d: () => 2 * rng.int(20, 40), h: () => rng.int(40, 70), what: 'the outside of the planter (the bottom and the curved side)' },
        { lead: 'An open-top rain barrel has', u: 'cm', d: () => rng.int(50, 65), h: () => rng.int(80, 100), what: 'its outside surface (the bottom and the curved side)' },
        { lead: 'A cylindrical hot tub shell with no lid has', u: 'ft', d: () => rng.int(6, 8), h: () => rng.int(3, 4), what: 'the outside of the shell (the bottom and the curved side)' },
      ]);
      const [dia, h] = retry(() => [c.d(), c.h()], ([x, y]) => !nearHalf(Math.PI * ((x / 2) ** 2 + x * y), 1));
      const r = dia / 2;
      const { SA, steps } = cylSteps(r, h, c.u, 'open');
      return {
        prompt: `${c.lead} a diameter of ${len(dia, c.u)} and a height of ${len(h, c.u)}. ${name} wants to seal ${c.what}. What area is that, ${sqRound(1, c.u)}?`,
        figure: cylFig(r, h, c.u, true),
        parts: [rPart(SA, 1, `${c.u}²`)],
        hints: ['With no lid, there is only one circle: the bottom.', '$SA = \\pi r^2 + 2\\pi r h$, with $r$ = diameter ÷ 2.'],
        solution: [`$r = ${n(dia)} \\div 2 = ${n(r)}\\ ${tx(c.u)}$`, ...steps, `The area to seal is about ${arR(SA, c.u, 1)}.`],
      };
    }
    const mode = rng.pick(['label', 'culvert', 'duct'] as const);
    if (mode === 'label') {
      const [dia, H, o] = retry(
        () => [rng.int(65, 110) / 10, rng.int(8, 14), rng.pick([0.5, 1, 1.5])],
        ([x, y, z]) => !nearHalf((Math.PI * x + z) * y, 1),
      );
      const C = Math.PI * dia;
      const Lb = C + o;
      const A = Lb * H;
      return {
        prompt: `A paper label wraps around the curved side of a can and overlaps itself by ${len(o, 'cm')} so it can be glued. The can has a diameter of ${len(dia, 'cm')} and the label is ${len(H, 'cm')} tall. What is the area of one label, ${sqRound(1, 'cm')}?`,
        figure: { type: 'solid', shape: 'cylinder', labels: { d: `${n(dia)} cm`, h: `${H} cm` } },
        parts: [rPart(A, 1, 'cm²')],
        hints: ['Flattened out, the label is a rectangle. Its length is the distance around the can plus the overlap.', 'Circumference: $C = \\pi d$. Then area = (C + overlap) × height.'],
        solution: [
          `Distance around the can: $C = \\pi d = \\pi(${n(dia)}) \\approx ${nf(C, 3)}\\ \\text{cm}$`,
          `Label length with the overlap: $${nf(C, 3)} + ${n(o)} \\approx ${nf(Lb, 3)}\\ \\text{cm}$`,
          `Area: $${nf(Lb, 3)} \\times ${H} \\approx ${nf(A, 2)}\\ ${sq('cm')}$`,
          `Each label has an area of about ${arR(A, 'cm', 1)}.`,
        ],
      };
    }
    if (mode === 'culvert') {
      const [dcm, L] = retry(() => [10 * rng.int(6, 12), rng.int(8, 20)], ([x, y]) => !nearHalf((Math.PI * x * y) / 100, 1));
      const dm = dcm / 100;
      const A = Math.PI * dm * L;
      return {
        prompt: `A steel culvert (a pipe under a road near ${rng.pick(TOWNS)}) is ${len(L, 'm')} long and has a diameter of ${len(dcm, 'cm')}. Both ends are open. The outside curved surface gets a protective coating. What area is coated, ${sqRound(1, 'm')}?`,
        figure: { type: 'solid', shape: 'cylinder', labels: { d: `${dcm} cm`, h: `${L} m` } },
        parts: [rPart(A, 1, 'm²')],
        hints: ['Both ends are open, so only the curved side counts. Change the diameter to metres first.', 'Curved side: $A = \\pi d h$ (the same as $2\\pi r h$).'],
        solution: [
          `Diameter in metres: $${dcm} \\div 100 = ${n(dm)}\\ \\text{m}$`,
          `Curved side: $A = \\pi d h = \\pi(${n(dm)})(${L}) = ${n(exact(dm * L))}\\pi \\approx ${nf(A, 2)}\\ ${sq('m')}$`,
          `About ${arR(A, 'm', 1)} is coated.`,
        ],
      };
    }
    const inSq = rng.chance(0.4);
    const [dIn, L] = retry(
      () => [rng.pick([6, 9, 12, 18]), rng.int(4, 20)],
      ([x, y]) => !nearHalf(inSq ? Math.PI * x * 12 * y : (Math.PI * x * y) / 12, inSq ? 0 : 1),
    );
    if (inSq) {
      const Lin = 12 * L;
      const A = Math.PI * dIn * Lin;
      return {
        prompt: `A sheet-metal shop is making a round heating duct that is ${len(L, 'ft')} long with a diameter of ${len(dIn, 'in')}. Both ends are open. How much sheet metal is needed for the curved side, ${sqRound(0, 'in')}? (Ignore the seam.)`,
        figure: { type: 'solid', shape: 'cylinder', labels: { d: `${dIn} in`, h: `${L} ft` } },
        parts: [rPart(A, 0, 'in²')],
        hints: ['The answer is in square inches, so change the length to inches: $1\\ \\text{ft} = 12\\ \\text{in}$.', 'Curved side only: $A = \\pi d h$.'],
        solution: [
          `Length in inches: $${L} \\times 12 = ${Lin}\\ \\text{in}$`,
          `Curved side: $A = \\pi d h = \\pi(${dIn})(${Lin}) = ${n(dIn * Lin)}\\pi \\approx ${nf(A, 1)}\\ ${sq('in')}$`,
          `About ${arR(A, 'in', 0)} of sheet metal is needed.`,
        ],
      };
    }
    const dFt = dIn / 12;
    const A = Math.PI * dFt * L;
    return {
      prompt: `A round ventilation duct for a shop in ${rng.pick(TOWNS)} is ${len(L, 'ft')} long and has a diameter of ${len(dIn, 'in')}. Both ends are open. How much sheet metal is needed for the curved side, ${sqRound(1, 'ft')}? (Ignore the seam.)`,
      figure: { type: 'solid', shape: 'cylinder', labels: { d: `${dIn} in`, h: `${L} ft` } },
      parts: [rPart(A, 1, 'ft²')],
      hints: ['The answer is in square feet, so change the diameter to feet: $12\\ \\text{in} = 1\\ \\text{ft}$.', 'Curved side only: $A = \\pi d h$.'],
      solution: [
        `Diameter in feet: $${dIn} \\div 12 = ${n(dFt)}\\ \\text{ft}$`,
        `Curved side: $A = \\pi d h = \\pi(${n(dFt)})(${L}) = ${n(exact(dFt * L))}\\pi \\approx ${nf(A, 2)}\\ ${sq('ft')}$`,
        `About ${arR(A, 'ft', 1)} of sheet metal is needed.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 2.2 — Pyramids and cones
// ---------------------------------------------------------------------------

/** Rectangular pyramids whose two slant heights are whole numbers: [l, w, slant on the l sides, slant on the w sides]. */
const RECT_PYR: Array<[number, number, number, number]> = [
  [18, 10, 13, 15], // h = 12
  [32, 18, 15, 20], // h = 12
  [32, 10, 13, 20], // h = 12
  [30, 12, 10, 17], // h = 8
  [20, 14, 25, 26], // h = 24
  [36, 20, 26, 30], // h = 24
  [40, 16, 17, 25], // h = 15
  [42, 30, 25, 29], // h = 20
];

const saPyramidCone = skill({
  id: 'm203-sa-pyramid-cone',
  name: 'Surface area of pyramids and cones',
  description: 'Find the surface area of square and rectangular pyramids and of cones, using the slant height (found with the Pythagorean theorem when needed).',
  outcomes: ['M1', 'A1'],
  lessonId: 'm203-2-2',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      if (rng.chance(0.5)) {
        const c = rng.pick([
          { thing: 'A solid glass paperweight shaped like a square pyramid', u: 'cm', b: [4, 10] },
          { thing: 'A concrete garden ornament shaped like a square pyramid', u: 'in', b: [8, 16] },
          { thing: 'A closed gift box shaped like a square pyramid', u: 'cm', b: [8, 20] },
          { thing: 'A square-pyramid roof vent cap', u: 'in', b: [10, 18] },
        ]);
        const b = 2 * rng.int(c.b[0] / 2, c.b[1] / 2);
        const s = rng.int(b / 2 + 2, b + 6);
        const base = b * b;
        const tris = 2 * b * s;
        const SA = base + tris;
        const closed = !c.thing.includes('vent');
        const ans = closed ? SA : tris;
        return {
          prompt: closed
            ? `${c.thing} has a base side of ${len(b, c.u)} and a slant height of ${len(s, c.u)}. What is its total surface area?`
            : `${c.thing} has four triangular faces and no bottom. Its base side is ${len(b, c.u)} and its slant height is ${len(s, c.u)}. What is the area of the four triangles?`,
          figure: { type: 'solid', shape: 'squarePyramid', labels: { b: `${b} ${c.u}`, s: `${s} ${c.u}` } },
          parts: [xPart(ans, `${c.u}²`)],
          hints: [closed ? 'The surface is a square base plus four matching triangles.' : 'There is no base to cover: only the four matching triangles.', 'Each triangle has area $\\tfrac12 \\times b \\times s$, where $s$ is the slant height.'],
          solution: closed
            ? [`Base: $${b} \\times ${b} = ${base}\\ ${sq(c.u)}$`, `Four triangles: $4 \\times \\tfrac12 \\times ${b} \\times ${s} = ${tris}\\ ${sq(c.u)}$`, `$SA = ${base} + ${tris} = ${SA}\\ ${sq(c.u)}$`, `The surface area is ${ar(SA, c.u)}.`]
            : [`One triangle: $\\tfrac12 \\times ${b} \\times ${s} = ${n(b * s / 2)}\\ ${sq(c.u)}$`, `Four triangles: $4 \\times ${n(b * s / 2)} = ${tris}\\ ${sq(c.u)}$`, `The four triangles have an area of ${ar(tris, c.u)}.`],
        };
      }
      const u = rng.pick(['cm', 'in', 'm', 'ft']);
      const [r, s] = retry(() => {
        const rr = rng.int(2, 12);
        return [rr, rng.int(rr + 2, rr + 15)];
      }, ([x, y]) => !nearHalf(Math.PI * x * (x + y), 1));
      const SA = Math.PI * (r * r + r * s);
      return {
        prompt: `A solid cone has a radius of ${len(r, u)} and a slant height of ${len(s, u)}. What is its total surface area, ${sqRound(1, u)}? Use the $\\pi$ key.`,
        figure: { type: 'solid', shape: 'cone', labels: { r: `${r} ${u}`, s: `${s} ${u}` } },
        parts: [rPart(SA, 1, `${u}²`)],
        hints: ['A closed cone has a circular base and a curved side.', '$SA = \\pi r^2 + \\pi r s$, where $s$ is the slant height.'],
        solution: [`Base: $\\pi r^2 = \\pi(${r})^2 = ${r * r}\\pi$`, `Curved side: $\\pi r s = \\pi(${r})(${s}) = ${r * s}\\pi$`, `$SA = ${r * r}\\pi + ${r * s}\\pi = ${r * r + r * s}\\pi \\approx ${nf(SA, 2)}$`, `The surface area is about ${arR(SA, u, 1)}.`],
      };
    }
    if (d === 2) {
      const mode = rng.pick(['rect', 'cone', 'roof'] as const);
      if (mode === 'rect') {
        const [l, w, s1, s2] = rng.pick(RECT_PYR);
        const u = rng.pick(['cm', 'in']);
        const base = l * w;
        const long = l * s1;
        const short = w * s2;
        const SA = base + long + short;
        return {
          prompt: `A solid rectangular pyramid has a base that is ${len(l, u)} by ${len(w, u)}. The triangles on the ${len(l, u)} sides have a slant height of ${len(s1, u)}, and the triangles on the ${len(w, u)} sides have a slant height of ${len(s2, u)}. What is its total surface area?`,
          figure: { type: 'solid', shape: 'rectPyramid', labels: { l: `${l} ${u}`, w: `${w} ${u}`, s: `${s1} ${u}`, s2: `${s2} ${u}` } },
          parts: [xPart(SA, `${u}²`)],
          hints: ['The faces are a rectangular base and two pairs of matching triangles.', 'Each pair of triangles has area $2 \\times \\tfrac12 \\times$ base $\\times$ slant height.'],
          solution: [
            `Base: $${l} \\times ${w} = ${base}\\ ${sq(u)}$`,
            `Triangles on the long sides: $2 \\times \\tfrac12 \\times ${l} \\times ${s1} = ${long}\\ ${sq(u)}$`,
            `Triangles on the short sides: $2 \\times \\tfrac12 \\times ${w} \\times ${s2} = ${short}\\ ${sq(u)}$`,
            `$SA = ${base} + ${long} + ${short} = ${SA}\\ ${sq(u)}$`,
            `The surface area is ${ar(SA, u)}.`,
          ],
        };
      }
      if (mode === 'cone') {
        const c = rng.pick([
          { thing: 'a solid cone of modelling clay for an art project', u: 'cm', d: [6, 20], s: [8, 20] },
          { thing: 'a solid wooden cone for a ring-toss game', u: 'in', d: [6, 12], s: [8, 16] },
          { thing: 'a solid cone-shaped wooden finial for a fence post', u: 'cm', d: [8, 14], s: [10, 18] },
        ]);
        const [dia, s] = retry(() => [2 * rng.int(c.d[0] / 2, c.d[1] / 2), rng.int(c.s[0], c.s[1])], ([x, y]) => y > x / 2 + 1 && !nearHalf(Math.PI * (x / 2) * (x / 2 + y), 1));
        const r = dia / 2;
        const SA = Math.PI * (r * r + r * s);
        return {
          prompt: `${name} is making ${c.thing}. The cone has a diameter of ${len(dia, c.u)} and a slant height of ${len(s, c.u)}. What is its total surface area, ${sqRound(1, c.u)}?`,
          figure: { type: 'solid', shape: 'cone', labels: { d: `${dia} ${c.u}`, s: `${s} ${c.u}` } },
          parts: [rPart(SA, 1, `${c.u}²`)],
          hints: ['Halve the diameter to get the radius.', '$SA = \\pi r^2 + \\pi r s$'],
          solution: [`$r = ${dia} \\div 2 = ${r}\\ ${tx(c.u)}$`, `$SA = \\pi(${r})^2 + \\pi(${r})(${s}) = ${r * r}\\pi + ${r * s}\\pi = ${r * r + r * s}\\pi \\approx ${nf(SA, 2)}$`, `The surface area is about ${arR(SA, c.u, 1)}.`],
        };
      }
      if (rng.chance(0.5)) {
        const b = rng.int(8, 16);
        const s = rng.int(Math.ceil(b / 2) + 2, b + 2);
        const tris = 2 * b * s;
        return {
          prompt: `The roof of a square gazebo is a square pyramid with a base side of ${len(b, 'ft')} and a slant height of ${len(s, 'ft')}. How much roof sheathing covers the four triangular faces?`,
          figure: { type: 'solid', shape: 'squarePyramid', labels: { b: `${b} ft`, s: `${s} ft` } },
          parts: [xPart(tris, 'ft²')],
          hints: ['A roof has no base to cover: only the four triangles.', 'Each triangle: $\\tfrac12 \\times b \\times s$. Multiply by 4.'],
          solution: [`One triangle: $\\tfrac12 \\times ${b} \\times ${s} = ${n((b * s) / 2)}\\ ${sq('ft')}$`, `Four triangles: $4 \\times ${n((b * s) / 2)} = ${tris}\\ ${sq('ft')}$`, `The roof needs ${ar(tris, 'ft')} of sheathing.`],
        };
      }
      const [dia, s] = retry(() => [rng.int(8, 20), rng.int(6, 14)], ([x, y]) => y > x / 2 + 1 && !nearHalf((Math.PI * x * y) / 2, 1));
      const r = dia / 2;
      const A = Math.PI * r * s;
      return {
        prompt: `A round lookout tower has a cone-shaped roof with a diameter of ${len(dia, 'ft')} and a slant height of ${len(s, 'ft')}. How much roofing covers the cone (no base), ${sqRound(1, 'ft')}?`,
        figure: { type: 'solid', shape: 'cone', labels: { d: `${dia} ft`, s: `${s} ft` } },
        parts: [rPart(A, 1, 'ft²')],
        hints: ['A roof has no base: use only the curved (lateral) area.', 'Lateral area of a cone: $\\pi r s$, with $r$ = diameter ÷ 2.'],
        solution: [`$r = ${dia} \\div 2 = ${n(r)}\\ \\text{ft}$`, `Curved area: $\\pi r s = \\pi(${n(r)})(${s}) = ${n(r * s)}\\pi \\approx ${nf(A, 2)}\\ ${sq('ft')}$`, `The roof needs about ${arR(A, 'ft', 1)} of roofing.`],
      };
    }
    // d3: the height is given, so find the slant height first
    const mode = rng.pick(['pyramid', 'pyrRoof', 'cone', 'cup'] as const);
    if (mode === 'pyramid' || mode === 'pyrRoof') {
      const roof = mode === 'pyrRoof';
      const u = roof ? 'm' : rng.pick(['cm', 'in']);
      const [b, h] = retry(
        () => (roof ? [rng.int(30, 60) / 10, rng.int(15, 30) / 10] : [2 * rng.int(3, 10), rng.int(5, 18)]),
        ([x, y]) => {
          const s = Math.hypot(x / 2, y);
          return Math.abs(s - Math.round(s)) > 0.05 && !nearHalf(roof ? 2 * x * s : x * x + 2 * x * s, 1);
        },
      );
      const s = Math.hypot(b / 2, h);
      const tris = 2 * b * s;
      const SA = roof ? tris : b * b + tris;
      return {
        prompt: roof
          ? `The roof of a square pump house in ${rng.pick(TOWNS)} is a square pyramid. The base side is ${len(b, u)} and the peak is ${len(h, u)} above the base (that is the height, not the slant height). How much roofing covers the four triangular faces, ${sqRound(1, u)}?`
          : `A solid square pyramid has a base side of ${len(b, u)} and a height of ${len(h, u)}. What is its total surface area, ${sqRound(1, u)}?`,
        figure: { type: 'solid', shape: 'squarePyramid', labels: { b: `${n(b)} ${u}`, h: `${n(h)} ${u}`, s: 's' } },
        parts: [rPart(SA, 1, `${u}²`)],
        hints: ['The triangles need the slant height $s$, not the height. The height, half the base and $s$ form a right triangle.', `$s = \\sqrt{h^2 + \\left(\\tfrac{b}{2}\\right)^2}$, then ${roof ? '$A = 4 \\times \\tfrac12 bs$' : '$SA = b^2 + 4 \\times \\tfrac12 bs$'}.`],
        solution: [
          `Half the base: $${n(b)} \\div 2 = ${n(b / 2)}\\ ${tx(u)}$`,
          `Slant height: $s = \\sqrt{${n(h)}^2 + ${n(b / 2)}^2} = \\sqrt{${n(exact(h * h + (b * b) / 4))}} \\approx ${nf(s, 3)}\\ ${tx(u)}$`,
          `Four triangles: $4 \\times \\tfrac12 \\times ${n(b)} \\times ${nf(s, 3)} \\approx ${nf(tris, 2)}\\ ${sq(u)}$`,
          ...(roof ? [] : [`Base: $${n(b)}^2 = ${n(b * b)}\\ ${sq(u)}$, so $SA \\approx ${n(b * b)} + ${nf(tris, 2)} = ${nf(SA, 2)}$`]),
          roof ? `The roof needs about ${arR(SA, u, 1)} of roofing.` : `The surface area is about ${arR(SA, u, 1)}.`,
        ],
      };
    }
    const cup = mode === 'cup';
    const c = cup
      ? rng.pick([
          { lead: 'A paper drinking cup is a cone with no lid.', u: 'cm', d: [6, 9], h: [8, 12], ask: 'How much paper is needed for one cup' },
          { lead: 'A sheet-metal funnel is shaped like a cone with no base (ignore the small hole at the tip).', u: 'in', d: [6, 12], h: [5, 10], ask: 'How much sheet metal is needed for the funnel' },
          { lead: 'The roof of a round grain-bin vent is a cone with no base.', u: 'in', d: [12, 24], h: [4, 9], ask: 'How much sheet metal covers the cone' },
        ])
      : rng.pick([
          { lead: 'A solid concrete cone is cast for a garden sculpture.', u: 'cm', d: [30, 60], h: [20, 50], ask: 'What is its total surface area, including the base' },
          { lead: 'A closed cone-shaped container is made from plastic.', u: 'cm', d: [10, 24], h: [12, 30], ask: 'How much plastic is needed, including the base' },
          { lead: 'A solid cone-shaped piece of foam is used as a model of a volcano.', u: 'in', d: [10, 20], h: [6, 14], ask: 'What is its total surface area, including the base' },
        ]);
    const [dia, h] = retry(
      () => [rng.int(c.d[0], c.d[1]), rng.int(c.h[0], c.h[1])],
      ([x, y]) => {
        const s = Math.hypot(x / 2, y);
        return Math.abs(s - Math.round(s)) > 0.05 && !nearHalf(Math.PI * (x / 2) * (s + (cup ? 0 : x / 2)), 1);
      },
    );
    const r = dia / 2;
    const s = Math.hypot(r, h);
    const lat = Math.PI * r * s;
    const SA = cup ? lat : lat + Math.PI * r * r;
    return {
      prompt: `${c.lead} It has a diameter of ${len(dia, c.u)} and a height of ${len(h, c.u)}. ${c.ask}, ${sqRound(1, c.u)}?`,
      figure: { type: 'solid', shape: 'cone', labels: { d: `${dia} ${c.u}`, h: `${h} ${c.u}`, s: 's' } },
      parts: [rPart(SA, 1, `${c.u}²`)],
      hints: ['The area formula uses the slant height $s$, not the height. The radius, the height and $s$ form a right triangle.', `$s = \\sqrt{r^2 + h^2}$, then ${cup ? 'curved area $= \\pi r s$ (no base)' : '$SA = \\pi r^2 + \\pi r s$'}.`],
      solution: [
        `$r = ${dia} \\div 2 = ${n(r)}\\ ${tx(c.u)}$`,
        `Slant height: $s = \\sqrt{${n(r)}^2 + ${h}^2} = \\sqrt{${n(exact(r * r + h * h))}} \\approx ${nf(s, 3)}\\ ${tx(c.u)}$`,
        `Curved side: $\\pi r s = \\pi(${n(r)})(${nf(s, 3)}) \\approx ${nf(lat, 2)}\\ ${sq(c.u)}$`,
        ...(cup ? [] : [`Base: $\\pi r^2 = \\pi(${n(r)})^2 \\approx ${nf(Math.PI * r * r, 2)}$, so $SA \\approx ${nf(SA, 2)}$`]),
        cup ? `About ${arR(SA, c.u, 1)} is needed.` : `The total surface area is about ${arR(SA, c.u, 1)}.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 2.2 — Spheres
// ---------------------------------------------------------------------------

const saSphere = skill({
  id: 'm203-sa-sphere',
  name: 'Surface area of spheres and hemispheres',
  description: 'Find the surface area of spheres and hemispheres, and work back from a surface area or circumference to the radius.',
  outcomes: ['M1', 'A1'],
  lessonId: 'm203-2-2',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      const c = rng.pick([
        { thing: 'A steel ball bearing', u: 'mm', r: [3, 15] },
        { thing: 'A round foam float for a fishing net', u: 'cm', r: [4, 12] },
        { thing: 'A glass gazing ball for a garden', u: 'cm', r: [10, 20] },
        { thing: 'A playground ball', u: 'in', r: [4, 8] },
        { thing: 'A sphere', u: 'm', r: [2, 9] },
      ]);
      const r = retry(() => rng.int(c.r[0], c.r[1]), (x) => !nearHalf(4 * Math.PI * x * x, 1));
      const SA = 4 * Math.PI * r * r;
      return {
        prompt: `${c.thing} has a radius of ${len(r, c.u)}. What is its surface area, ${sqRound(1, c.u)}? Use the $\\pi$ key.`,
        figure: { type: 'solid', shape: 'sphere', labels: { r: `${r} ${c.u}` } },
        parts: [rPart(SA, 1, `${c.u}²`)],
        hints: ['The surface area of a sphere is 4 times the area of a circle with the same radius.', '$SA = 4\\pi r^2$'],
        solution: [`$SA = 4\\pi r^2 = 4\\pi(${r})^2 = ${4 * r * r}\\pi$`, `$${4 * r * r}\\pi \\approx ${nf(SA, 2)}$`, `The surface area is about ${arR(SA, c.u, 1)}.`],
      };
    }
    if (d === 2) {
      if (rng.chance(0.55)) {
        const c = rng.pick([
          { thing: 'A basketball', u: 'cm', d: () => rng.int(23, 25) },
          { thing: 'An exercise ball', u: 'cm', d: () => 5 * rng.int(11, 15) },
          { thing: 'A bowling ball', u: 'in', d: () => rng.pick([8, 8.5]) },
          { thing: 'A spherical water tank on a tower', u: 'm', d: () => rng.int(8, 14) },
          { thing: 'A round snow globe', u: 'cm', d: () => rng.int(8, 15) },
        ]);
        const dia = retry(c.d, (x) => !nearHalf(Math.PI * x * x, 1));
        const r = dia / 2;
        const SA = 4 * Math.PI * r * r;
        return {
          prompt: `${c.thing} has a diameter of ${len(dia, c.u)}. What is its surface area, ${sqRound(1, c.u)}?`,
          figure: { type: 'solid', shape: 'sphere', labels: { d: `${n(dia)} ${c.u}` } },
          parts: [rPart(SA, 1, `${c.u}²`)],
          hints: ['The formula uses the radius, which is half the diameter.', '$SA = 4\\pi r^2$'],
          solution: [`$r = ${n(dia)} \\div 2 = ${n(r)}\\ ${tx(c.u)}$`, `$SA = 4\\pi(${n(r)})^2 = ${n(4 * r * r)}\\pi \\approx ${nf(SA, 2)}$`, `The surface area is about ${arR(SA, c.u, 1)}.`],
        };
      }
      const c = rng.pick([
        { thing: 'An igloo is shaped like a hemisphere', u: 'm', d: () => rng.int(25, 40) / 10, ask: 'What is the area of its curved outside surface (not the floor)' },
        { thing: 'The dome of a planetarium is a hemisphere', u: 'm', d: () => rng.int(15, 25), ask: 'How much roofing covers the dome' },
        { thing: 'A plastic skylight dome is a hemisphere', u: 'in', d: () => 2 * rng.int(10, 20), ask: 'What is the area of the curved plastic' },
        { thing: 'A steel tank cap is a hemisphere', u: 'cm', d: () => 10 * rng.int(6, 15), ask: 'How much steel is in the curved cap' },
      ]);
      const dia = retry(c.d, (x) => !nearHalf((Math.PI * x * x) / 2, 1));
      const r = dia / 2;
      const SA = 2 * Math.PI * r * r;
      return {
        prompt: `${c.thing} with a diameter of ${len(dia, c.u)}. ${c.ask}, ${sqRound(1, c.u)}?`,
        figure: { type: 'solid', shape: 'hemisphere', labels: { d: `${n(dia)} ${c.u}` } },
        parts: [rPart(SA, 1, `${c.u}²`)],
        hints: ['The curved part of a hemisphere is half of a sphere: $\\tfrac12 \\times 4\\pi r^2 = 2\\pi r^2$.', 'The flat circle is not included here. Use $r$ = diameter ÷ 2.'],
        solution: [`$r = ${n(dia)} \\div 2 = ${n(r)}\\ ${tx(c.u)}$`, `Curved area: $2\\pi r^2 = 2\\pi(${n(r)})^2 = ${n(exact(2 * r * r))}\\pi \\approx ${nf(SA, 2)}$`, `The curved surface is about ${arR(SA, c.u, 1)}.`],
      };
    }
    const mode = rng.pick(['closedHemi', 'fromSA', 'fromC'] as const);
    if (mode === 'closedHemi') {
      const c = rng.pick([
        { thing: 'A concrete parking bollard is a solid hemisphere', u: 'cm', d: () => 10 * rng.int(4, 9), what: 'the curved top and the flat base' },
        { thing: 'A solid wooden doorknob is shaped like a hemisphere', u: 'cm', d: () => rng.int(5, 8), what: 'the curved surface and the flat face' },
        { thing: 'A solid rubber dome for a gym floor is a hemisphere', u: 'in', d: () => 2 * rng.int(4, 9), what: 'the curved surface and the flat base' },
      ]);
      const dia = retry(c.d, (x) => !nearHalf((3 * Math.PI * x * x) / 4, 1));
      const r = dia / 2;
      const curved = 2 * Math.PI * r * r;
      const flat = Math.PI * r * r;
      const SA = curved + flat;
      return {
        prompt: `${c.thing} with a diameter of ${len(dia, c.u)}. What is its total surface area (${c.what}), ${sqRound(1, c.u)}?`,
        figure: { type: 'solid', shape: 'hemisphere', labels: { d: `${n(dia)} ${c.u}` } },
        parts: [rPart(SA, 1, `${c.u}²`)],
        hints: ['A solid hemisphere has two surfaces: the curved half-sphere ($2\\pi r^2$) and a flat circle ($\\pi r^2$).', 'Altogether $SA = 3\\pi r^2$, with $r$ = diameter ÷ 2.'],
        solution: [
          `$r = ${n(dia)} \\div 2 = ${n(r)}\\ ${tx(c.u)}$`,
          `Curved surface: $2\\pi(${n(r)})^2 = ${n(exact(2 * r * r))}\\pi$`,
          `Flat base: $\\pi(${n(r)})^2 = ${n(exact(r * r))}\\pi$`,
          `$SA = ${n(exact(3 * r * r))}\\pi \\approx ${nf(SA, 2)}$`,
          `The total surface area is about ${arR(SA, c.u, 1)}.`,
        ],
      };
    }
    if (mode === 'fromSA') {
      const c = rng.pick([
        { thing: 'a spherical water tank', u: 'm', A: () => 10 * rng.int(15, 60) },
        { thing: 'a round weather balloon at launch', u: 'm', A: () => rng.int(8, 30) },
        { thing: 'a spherical buoy', u: 'cm', A: () => 100 * rng.int(20, 90) },
      ]);
      const A = retry(c.A, (x) => !nearHalf(Math.sqrt(x / (4 * Math.PI)), 1));
      const r = Math.sqrt(A / (4 * Math.PI));
      return {
        prompt: `${name} needs the radius of ${c.thing}. The spec sheet gives only its surface area: ${ar(A, c.u)}. What is the radius, ${roundingPhrase(1)} of ${c.u === 'm' ? 'a metre' : 'a centimetre'}?`,
        figure: { type: 'solid', shape: 'sphere', labels: { r: 'r' } },
        parts: [rPart(r, 1, c.u, '$r =$')],
        hints: ['Start with $SA = 4\\pi r^2$ and substitute the surface area.', 'Divide both sides by $4\\pi$, then take the square root.'],
        solution: [
          `$${n(A)} = 4\\pi r^2$`,
          `$r^2 = \\dfrac{${n(A)}}{4\\pi} \\approx ${nf(A / (4 * Math.PI), 3)}$`,
          `$r = \\sqrt{${nf(A / (4 * Math.PI), 3)}} \\approx ${nf(r, 2)}$`,
          `The radius is about ${len(Number(fmtFixed(r, 1)), c.u)}.`,
        ],
      };
    }
    const c = rng.pick([
      { thing: 'A basketball', u: 'cm', C: () => rng.int(74, 78) },
      { thing: 'A soccer ball', u: 'cm', C: () => rng.int(68, 70) },
      { thing: 'A large exercise ball', u: 'cm', C: () => 5 * rng.int(34, 46) },
      { thing: 'A spherical propane tank', u: 'ft', C: () => rng.int(15, 30) },
    ]);
    const C = retry(c.C, (x) => !nearHalf((x * x) / Math.PI, 1));
    const r = C / (2 * Math.PI);
    const SA = 4 * Math.PI * r * r;
    return {
      prompt: `${c.thing} has a circumference (the distance around its widest part) of ${len(C, c.u)}. What is its surface area, ${sqRound(1, c.u)}? Do not round until the last step.`,
      figure: { type: 'solid', shape: 'sphere', labels: { r: 'r' } },
      parts: [rPart(SA, 1, `${c.u}²`)],
      hints: ['Use $C = 2\\pi r$ to find the radius first: $r = \\dfrac{C}{2\\pi}$.', 'Then $SA = 4\\pi r^2$. Keep all the decimals in your calculator.'],
      solution: [
        `$r = \\dfrac{C}{2\\pi} = \\dfrac{${C}}{2\\pi} \\approx ${nf(r, 4)}\\ ${tx(c.u)}$`,
        `$SA = 4\\pi r^2 = 4\\pi(${nf(r, 4)})^2 \\approx ${nf(SA, 2)}$`,
        `The surface area is about ${arR(SA, c.u, 1)}.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 2.3 — Surface area problems
// ---------------------------------------------------------------------------

/** A price such as 3.49 within [lo, hi]. */
export function price(rng: Rng, lo: number, hi: number): number {
  return rng.int(lo, hi) + rng.pick([0.19, 0.29, 0.49, 0.79, 0.99]);
}

const saApply = skill({
  id: 'm203-sa-apply',
  name: 'Surface area problems',
  description: 'Solve surface area problems in SI and imperial units: square-unit conversions, paint and shingles to buy, sheet metal, and material cost.',
  outcomes: ['M1', 'A1'],
  lessonId: 'm203-2-3',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      const mode = rng.pick(['convert', 'cost', 'cans'] as const);
      if (mode === 'convert') {
        const kind = rng.pick(['ft-in', 'in-ft', 'm-cm', 'cm-m'] as const);
        if (kind === 'ft-in' || kind === 'in-ft') {
          const toIn = kind === 'ft-in';
          const ft = rng.int(2, 30) / rng.pick([1, 1, 2]);
          const inch = exact(ft * 144);
          const thing = rng.pick(['a sheet of aluminum flashing', 'a piece of sheet metal for a duct', 'a sheet of plywood cut for a cabinet', 'a vinyl patch for a truck tarp']);
          return {
            prompt: toIn
              ? `${cap(thing)} has an area of ${ar(ft, 'ft')}. Using $1\\ ${sq('ft')} = 144\\ ${sq('in')}$, what is its area in square inches?`
              : `${cap(thing)} has an area of ${ar(inch, 'in')}. Using $1\\ ${sq('ft')} = 144\\ ${sq('in')}$, what is its area in square feet?`,
            parts: [xPart(toIn ? inch : ft, toIn ? 'in²' : 'ft²')],
            hints: ['One square foot is a square 12 in by 12 in, so it holds $12 \\times 12 = 144$ square inches.', toIn ? 'Square inches are smaller, so the number gets bigger: multiply by 144.' : 'Square feet are bigger, so the number gets smaller: divide by 144.'],
            solution: [
              `$1\\ ${sq('ft')} = 12\\ \\text{in} \\times 12\\ \\text{in} = 144\\ ${sq('in')}$`,
              toIn ? `$${n(ft)} \\times 144 = ${n(inch)}$` : `$${n(inch)} \\div 144 = ${n(ft)}$`,
              toIn ? `The area is ${ar(inch, 'in')}.` : `The area is ${ar(ft, 'ft')}.`,
            ],
            calculator: true,
          };
        }
        const toCm = kind === 'm-cm';
        const m = toCm ? rng.int(2, 95) / 10 : rng.int(20, 400) / 100;
        const cm = exact(m * 10000);
        const thing = rng.pick(['a sheet of glass for a window', 'a canvas tarp', 'a rubber mat for a shop floor', 'a sheet of drywall']);
        return {
          prompt: toCm
            ? `${cap(thing)} has an area of ${ar(m, 'm')}. Using $1\\ ${sq('m')} = 10\\,000\\ ${sq('cm')}$, what is its area in square centimetres?`
            : `${cap(thing)} has an area of ${ar(cm, 'cm')}. Using $1\\ ${sq('m')} = 10\\,000\\ ${sq('cm')}$, what is its area in square metres?`,
          parts: [xPart(toCm ? cm : m, toCm ? 'cm²' : 'm²')],
          hints: ['One square metre is a square 100 cm by 100 cm, so it holds $100 \\times 100 = 10\\,000$ square centimetres.', toCm ? 'Multiply by 10 000.' : 'Divide by 10 000.'],
          solution: [
            `$1\\ ${sq('m')} = 100\\ \\text{cm} \\times 100\\ \\text{cm} = 10\\,000\\ ${sq('cm')}$`,
            toCm ? `$${n(m)} \\times 10\\,000 = ${n(cm)}$` : `$${n(cm)} \\div 10\\,000 = ${n(m)}$`,
            toCm ? `The area is ${ar(cm, 'cm')}.` : `The area is ${ar(m, 'm')}.`,
          ],
          calculator: true,
        };
      }
      if (mode === 'cost') {
        const c = rng.pick([
          { thing: 'a closed steel storage tank', item: 'Sheet steel', u: 'm', A: () => rng.int(80, 400) / 10, p: [18, 45] },
          { thing: 'a plywood shipping crate', item: 'Plywood', u: 'ft', A: () => rng.int(60, 200), p: [1, 3] },
          { thing: 'a sheet-metal duct run', item: 'Galvanized sheet metal', u: 'ft', A: () => rng.int(20, 120), p: [2, 6] },
          { thing: 'a fibreglass hot-tub cover', item: 'Fibreglass panel', u: 'm', A: () => rng.int(40, 120) / 10, p: [25, 60] },
        ]);
        const [A, rate] = retry(() => [c.A(), price(rng, c.p[0], c.p[1])], ([a, p]) => !nearHalf(a * p, 2));
        const cost = A * rate;
        return {
          prompt: `The surface area of ${c.thing} is ${ar(A, c.u)}. ${c.item} costs ${cash(rate)} per square ${UNIT[c.u].one}. What does the material cost before tax, to the nearest cent?`,
          parts: [moneyPart(cost, 'Cost')],
          hints: ['The price is per square unit, so you pay that amount for every square unit of surface.', 'Cost = area × price per square unit.'],
          solution: [`Cost $= ${n(A)} \\times ${fmtFixed(rate, 2)}$`, `$= ${n(exact(cost))}$`, `The material costs ${cash(cost)} before tax.`],
        };
      }
      const c = rng.pick([
        { thing: 'the outside walls of a garden shed', u: 'ft', cover: [300, 350, 400], A: [180, 900], item: 'can of paint', items: 'cans' },
        { thing: 'the outside of a steel grain bin', u: 'ft', cover: [350, 400], A: [900, 2400], item: 'can of paint', items: 'cans' },
        { thing: 'a wooden fence', u: 'm', cover: [30, 35, 40], A: [50, 200], item: 'can of stain', items: 'cans' },
        { thing: 'the tank of a water tower', u: 'm', cover: [35, 40], A: [150, 500], item: 'pail of primer', items: 'pails' },
      ]);
      const cover = rng.pick(c.cover);
      const A = retry(() => rng.int(c.A[0], c.A[1]), (x) => notWhole(x / cover) && x / cover > 1.1);
      const N = Math.ceil(A / cover);
      return {
        prompt: `${name} is giving ${c.thing} one coat. The surface area to cover is ${ar(A, c.u)}, and one ${c.item} covers ${ar(cover, c.u)}. How many ${c.items} does ${name} need to buy?`,
        parts: [numPart(N, { suffix: c.items })],
        hints: [`Divide the area by the amount one ${c.item.split(' of ')[0]} covers.`, `You cannot buy part of a ${c.item.split(' of ')[0]}, so always round up.`],
        solution: [`$${n(A)} \\div ${cover} \\approx ${nf(A / cover, 2)}$`, `Round up: ${name} needs ${N} ${c.items}.`],
      };
    }
    if (d === 2) {
      const mode = rng.pick(['shed', 'duct', 'wrap', 'shingles'] as const);
      if (mode === 'shed') {
        const coats = rng.pick([1, 2]);
        const cover = rng.pick([300, 350, 400]);
        const [L, W, H] = retry(
          () => [rng.int(8, 16), rng.int(6, 10), rng.pick([7, 8])],
          ([x, y, z]) => x > y && notWhole(((2 * (x + y) * z - 21) * coats) / cover) && ((2 * (x + y) * z - 21) * coats) / cover > 1.1,
        );
        const walls = 2 * (L + W) * H;
        const A = walls - 21;
        const total = A * coats;
        const N = Math.ceil(total / cover);
        return {
          prompt: `${name} is painting the four outside walls of a shed that is ${len(L, 'ft')} long, ${len(W, 'ft')} wide and ${len(H, 'ft')} high. The shed has one door that is ${len(3, 'ft')} by ${len(7, 'ft')}, which is not painted. The walls need ${coats === 1 ? 'one coat' : 'two coats'}, and one can of paint covers ${ar(cover, 'ft')}. What area of wall is painted, and how many cans are needed?`,
          figure: prismFig(L, W, H, 'ft'),
          parts: [xPart(A, 'ft²', 'Wall area to paint'), numPart(N, { label: 'Cans needed', suffix: 'cans' })],
          hints: ['Four walls: $2lh + 2wh$. Subtract the door ($3 \\times 7$). The roof and floor are not painted.', coats === 2 ? 'Two coats means covering the area twice. Divide by the coverage of one can and round up.' : 'Divide by the coverage of one can and round up.'],
          solution: [
            `Long walls: $2 \\times ${L} \\times ${H} = ${2 * L * H}$; short walls: $2 \\times ${W} \\times ${H} = ${2 * W * H}$`,
            `Four walls: $${2 * L * H} + ${2 * W * H} = ${walls}\\ ${sq('ft')}$`,
            `Subtract the door: $${walls} - 21 = ${A}\\ ${sq('ft')}$`,
            ...(coats === 2 ? [`Two coats: $${A} \\times 2 = ${total}\\ ${sq('ft')}$`] : []),
            `Cans: $${total} \\div ${cover} \\approx ${nf(total / cover, 2)}$, so round up to ${N}.`,
            `${name} paints ${ar(A, 'ft')} of wall and needs ${N} cans.`,
          ],
        };
      }
      if (mode === 'duct') {
        const [w, h, L] = retry(
          () => [rng.pick([6, 8, 10, 12]), rng.pick([8, 10, 12, 14, 16]), rng.int(4, 12)],
          ([a, b, c]) => a < b && !nearHalf((2 * (a + b) * c) / 12, 1),
        );
        const P = 2 * (w + h);
        const Lin = 12 * L;
        const Ain = P * Lin;
        const Aft = Ain / 144;
        return {
          prompt: `A rectangular heating duct is ${len(w, 'in')} by ${len(h, 'in')} and ${len(L, 'ft')} long. Both ends are open. How much sheet metal is needed for the four sides, ${sqRound(1, 'ft')}? Use $1\\ ${sq('ft')} = 144\\ ${sq('in')}$.`,
          figure: { type: 'solid', shape: 'rectPrism', labels: { l: `${L} ft`, w: `${w} in`, h: `${h} in` } },
          parts: [rPart(Aft, 1, 'ft²')],
          hints: ['Both ends are open, so only the four sides count: perimeter of the end × length.', 'Work in inches (12 in = 1 ft), then divide the square inches by 144.'],
          solution: [
            `Perimeter of the end: $2(${w} + ${h}) = ${P}\\ \\text{in}$`,
            `Length in inches: $${L} \\times 12 = ${Lin}\\ \\text{in}$`,
            `Four sides: $${P} \\times ${Lin} = ${n(Ain)}\\ ${sq('in')}$`,
            Ain % 144 === 0 ? `In square feet: $${n(Ain)} \\div 144 = ${n(Aft)}$` : `In square feet: $${n(Ain)} \\div 144 \\approx ${nf(Aft, 2)}$`,
            `About ${arR(Aft, 'ft', 1)} of sheet metal is needed.`,
          ],
        };
      }
      if (mode === 'wrap') {
        const [dia, H, rate] = retry(
          () => [rng.int(12, 30) / 10, rng.int(20, 60) / 10, price(rng, 8, 24)],
          ([a, b, p]) => !nearHalf(Math.PI * a * b, 1) && !nearHalf(roundTo(Math.PI * a * b, 1) * p, 2),
        );
        const A = Math.PI * dia * H;
        const Ar = roundTo(A, 1);
        const cost = Ar * rate;
        return {
          prompt: `${name} is wrapping the curved side of a cylindrical water tank with insulation. The tank has a diameter of ${len(dia, 'm')} and a height of ${len(H, 'm')}. The top and bottom are not wrapped. Insulation costs ${cash(rate)} per square metre. Find the area to wrap, ${sqRound(1, 'm')}, and then the cost of the insulation using your rounded area, to the nearest cent.`,
          figure: { type: 'solid', shape: 'cylinder', labels: { d: `${n(dia)} m`, h: `${n(H)} m` } },
          parts: [rPart(A, 1, 'm²', 'Area to wrap'), moneyPart(cost, 'Cost')],
          hints: ['Only the curved side is wrapped: $A = \\pi d h$ (or $2\\pi r h$).', 'Multiply the rounded area by the price per square metre.'],
          solution: [
            `Curved side: $A = \\pi d h = \\pi(${n(dia)})(${n(H)}) \\approx ${nf(A, 3)}$, which rounds to $${nf(A, 1)}\\ ${sq('m')}$`,
            `Cost: $${nf(A, 1)} \\times ${fmtFixed(rate, 2)} = ${n(exact(cost))}$`,
            `The area is about ${arR(A, 'm', 1)} and the insulation costs ${cash(cost)}.`,
          ],
        };
      }
      const [L, s] = retry(() => [rng.int(12, 30), rng.int(8, 16)], ([x, y]) => x > y + 2 && notWhole((3 * 2 * x * y) / 100));
      const A = 2 * L * s;
      const bundles = Math.ceil((3 * A) / 100);
      return {
        prompt: `The gable roof of a garage in ${rng.pick(TOWNS)} has two matching rectangular faces. Each face is ${len(L, 'ft')} long and ${len(s, 'ft')} from the ridge down to the edge. Shingles come in bundles, and 3 bundles cover $100\\ ${sq('ft')}$. What is the roof area, and how many bundles should ${name} buy?`,
        parts: [xPart(A, 'ft²', 'Roof area'), numPart(bundles, { label: 'Bundles', suffix: 'bundles' })],
        hints: ['The roof is two rectangles: $2 \\times$ length $\\times$ slope length.', 'Each $100\\ \\text{ft}^2$ needs 3 bundles, so bundles $= \\dfrac{\\text{area}}{100} \\times 3$. Round up.'],
        solution: [
          `Roof area: $2 \\times ${L} \\times ${s} = ${A}\\ ${sq('ft')}$`,
          `Bundles: $\\dfrac{${A}}{100} \\times 3 = ${n((3 * A) / 100)}$`,
          `Round up: ${name} should buy ${bundles} bundles.`,
        ],
      };
    }
    const mode = rng.pick(['grainBin', 'tankCost', 'shedCost', 'ductSheets'] as const);
    if (mode === 'grainBin') {
      const cover = rng.pick([300, 350, 400]);
      const [D, H, R] = retry(
        () => [2 * rng.int(7, 15), rng.int(16, 28), rng.int(4, 9)],
        ([a, b, c]) => {
          const r = a / 2;
          const A = Math.PI * a * b + Math.PI * r * Math.hypot(r, c);
          return !nearHalf(A, 0) && notWhole(A / cover);
        },
      );
      const r = D / 2;
      const s = Math.hypot(r, R);
      const wall = Math.PI * D * H;
      const roof = Math.PI * r * s;
      const A = wall + roof;
      const N = Math.ceil(A / cover);
      return {
        prompt: `A steel grain bin on a farm near ${rng.pick(TOWNS)} is a cylinder with a cone-shaped roof. The bin has a diameter of ${len(D, 'ft')}, the wall is ${len(H, 'ft')} high, and the peak of the roof is ${len(R, 'ft')} above the top of the wall. ${name} will paint the wall and the roof, but not the floor. One can of paint covers ${ar(cover, 'ft')}. Find the area to paint, ${sqRound(0, 'ft')}, and the number of cans needed for one coat.`,
        figure: { type: 'solid', shape: 'cylinderCone', labels: { d: `${D} ft`, h: `${H} ft`, h2: `${R} ft` } },
        parts: [rPart(A, 0, 'ft²', 'Area to paint'), numPart(N, { label: 'Cans needed', suffix: 'cans' })],
        hints: ['Wall: the curved side of the cylinder, $\\pi d h$. Roof: the curved side of a cone, $\\pi r s$.', `The roof needs its slant height: $s = \\sqrt{r^2 + ${R}^2}$. Divide the total area by ${cover} and round up.`],
        solution: [
          `$r = ${D} \\div 2 = ${r}\\ \\text{ft}$`,
          `Wall: $\\pi d h = \\pi(${D})(${H}) \\approx ${nf(wall, 2)}\\ ${sq('ft')}$`,
          `Roof slant height: $s = \\sqrt{${r}^2 + ${R}^2} = \\sqrt{${r * r + R * R}} ${Number.isInteger(s) ? `= ${s}` : `\\approx ${nf(s, 3)}`}\\ \\text{ft}$`,
          `Roof: $\\pi r s = \\pi(${r})(${Number.isInteger(s) ? s : nf(s, 3)}) \\approx ${nf(roof, 2)}\\ ${sq('ft')}$`,
          `Total: $${nf(wall, 2)} + ${nf(roof, 2)} \\approx ${nf(A, 2)}$, about ${arR(A, 'ft', 0)}`,
          `Cans: $${nf(A, 2)} \\div ${cover} \\approx ${nf(A / cover, 2)}$, so round up to ${N} cans.`,
        ],
      };
    }
    if (mode === 'tankCost') {
      const [dia, H, rate] = retry(
        () => [rng.int(10, 24) / 10, rng.int(20, 50) / 10, price(rng, 25, 60)],
        ([a, b, p]) => {
          const area = Math.PI * (a / 2) * (a + 2 * b);
          return !nearHalf(area, 1) && !nearHalf(roundTo(area, 1) * 1.1 * p, 2);
        },
      );
      const r = dia / 2;
      const SA = 2 * Math.PI * r * r + 2 * Math.PI * r * H;
      const SAr = roundTo(SA, 1);
      const withWaste = exact(SAr * 1.1);
      const cost = withWaste * rate;
      return {
        prompt: `A welding shop in ${rng.pick(TOWNS)} is building a closed cylindrical fuel tank with a diameter of ${len(dia, 'm')} and a length of ${len(H, 'm')}. Sheet steel costs ${cash(rate)} per square metre, and the shop orders 10% extra to allow for waste. Find the surface area of the tank, ${sqRound(1, 'm')}. Then, using your rounded area, find the cost of the steel to the nearest cent.`,
        figure: cylFig(r, H, 'm', true),
        parts: [rPart(SA, 1, 'm²', 'Surface area'), moneyPart(cost, 'Cost of steel')],
        hints: ['Closed cylinder: $SA = 2\\pi r^2 + 2\\pi r h$, with $r$ = diameter ÷ 2.', 'Add 10% by multiplying the rounded area by 1.1, then multiply by the price per square metre.'],
        solution: [
          `$r = ${n(dia)} \\div 2 = ${n(r)}\\ \\text{m}$`,
          `$SA = 2\\pi(${n(r)})^2 + 2\\pi(${n(r)})(${n(H)}) \\approx ${nf(SA, 3)}$, which rounds to $${nf(SA, 1)}\\ ${sq('m')}$`,
          `With 10% extra: $${nf(SA, 1)} \\times 1.1 = ${n(withWaste)}\\ ${sq('m')}$`,
          `Cost: $${n(withWaste)} \\times ${fmtFixed(rate, 2)} = ${n(exact(cost))}$`,
          `The steel costs ${cash(cost)}.`,
        ],
      };
    }
    if (mode === 'shedCost') {
      const cover = rng.pick([350, 400]);
      const can = price(rng, 39, 69);
      const [L, W, H, g] = retry(
        () => [rng.int(10, 16), rng.pick([8, 10, 12]), rng.pick([7, 8]), rng.int(3, 5)],
        ([a, b, c, e]) => a > b && notWhole(((2 * (a + b) * c + b * e - 21) * 2) / cover) && !nearHalf(Math.ceil(((2 * (a + b) * c + b * e - 21) * 2) / cover) * can * 1.05, 2),
      );
      const walls = 2 * (L + W) * H;
      const gables = W * g;
      const A = walls + gables - 21;
      const total = 2 * A;
      const N = Math.ceil(total / cover);
      const sub = exact(N * can);
      const cost = sub * 1.05;
      return {
        prompt: `${name} is painting the outside of a shed that is ${len(L, 'ft')} long and ${len(W, 'ft')} wide, with walls ${len(H, 'ft')} high. Each end wall also has a triangular gable that rises ${len(g, 'ft')} to the peak of the roof. The ${len(3, 'ft')} by ${len(7, 'ft')} door is not painted. The shed needs two coats. One can covers ${ar(cover, 'ft')} and costs ${cash(can)}, and 5% GST is added. How many cans are needed, and what is the total cost, to the nearest cent?`,
        figure: gableEndFig(W, H, g, 'ft', `End wall; the shed is ${L} ft long`),
        parts: [numPart(N, { label: 'Cans needed', suffix: 'cans' }), moneyPart(cost, 'Total cost with GST')],
        hints: ['Paint area = four rectangular walls + two triangular gables − the door. Then double it for two coats.', 'Each gable is a triangle: $\\tfrac12 \\times$ width $\\times$ rise. Round the cans up, multiply by the price, then by 1.05 for GST.'],
        solution: [
          `Four walls: $2(${L} + ${W}) \\times ${H} = ${walls}\\ ${sq('ft')}$`,
          `Two gables: $2 \\times \\tfrac12 \\times ${W} \\times ${g} = ${gables}\\ ${sq('ft')}$`,
          `Subtract the door: $${walls} + ${gables} - 21 = ${A}\\ ${sq('ft')}$`,
          `Two coats: $${A} \\times 2 = ${total}\\ ${sq('ft')}$`,
          `Cans: $${total} \\div ${cover} \\approx ${nf(total / cover, 2)}$, so round up to ${N}.`,
          `Cost: $${N} \\times ${fmtFixed(can, 2)} = ${nf(sub, 2)}$, and with GST $${nf(sub, 2)} \\times 1.05 \\approx ${nf(cost, 3)}$`,
          `${name} needs ${N} cans, costing ${cash(cost)} in total.`,
        ],
      };
    }
    // ductSheets: area is a whole number of square feet because (w + h) is a multiple of 6
    const sheetPrice = price(rng, 28, 55);
    const [w, h, L] = retry(
      () => {
        const pair = rng.pick([[6, 12], [8, 10], [10, 14], [12, 18], [8, 16], [10, 20], [6, 6], [12, 12]] as const);
        return [pair[0], pair[1], rng.int(20, 80)];
      },
      ([a, b, c]) => notWhole((((a + b) * c) / 6) * 1.1 / 32),
    );
    const A = ((w + h) * L) / 6;
    const need = exact(A * 1.1);
    const N = Math.ceil(need / 32);
    const cost = exact(N * sheetPrice);
    return {
      prompt: `An HVAC crew in ${rng.pick(TOWNS)} is installing ${len(L, 'ft')} of rectangular duct that is ${len(w, 'in')} by ${len(h, 'in')}, open at both ends. They add 10% to the sheet metal for seams and waste. Sheet metal comes in $4\\ \\text{ft}$ by $8\\ \\text{ft}$ sheets that cost ${cash(sheetPrice)} each. How many square feet of duct surface are there, how many sheets are needed, and what do the sheets cost before tax, to the nearest cent? Use $1\\ \\text{ft} = 12\\ \\text{in}$.`,
      figure: { type: 'solid', shape: 'rectPrism', labels: { l: `${L} ft`, w: `${w} in`, h: `${h} in` } },
      parts: [xPart(A, 'ft²', 'Duct surface'), numPart(N, { label: 'Sheets', suffix: 'sheets' }), moneyPart(cost, 'Cost')],
      hints: ['Change the end dimensions to feet. The four sides have area (perimeter of the end) × length.', 'Multiply by 1.1 for the extra 10%. One sheet is $4 \\times 8 = 32\\ \\text{ft}^2$; round the number of sheets up.'],
      solution: [
        `End in feet: $${w} \\div 12 = ${n(w / 12)}\\ \\text{ft}$ and $${h} \\div 12 = ${n(h / 12)}\\ \\text{ft}$, so the perimeter is $2(${w} + ${h}) \\div 12 = ${n((w + h) / 6)}\\ \\text{ft}$`,
        `Duct surface: $${n((w + h) / 6)} \\times ${L} = ${n(A)}\\ ${sq('ft')}$`,
        `With 10% extra: $${n(A)} \\times 1.1 = ${n(need)}\\ ${sq('ft')}$`,
        `Sheets: $${n(need)} \\div 32 \\approx ${nf(need / 32, 2)}$, so round up to ${N} sheets.`,
        `Cost: $${N} \\times ${fmtFixed(sheetPrice, 2)} = ${nf(cost, 2)}$`,
        `The duct has ${ar(A, 'ft')} of surface; the crew needs ${N} sheets costing ${cash(cost)} before tax.`,
      ],
    };
  },
});

export const SURFACE_AREA_SKILLS: SkillDef[] = [saPrism, saCylinder, saPyramidCone, saSphere, saApply];
