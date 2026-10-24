/** Math 6 Unit 9 — Area of Parallelograms and Triangles (M1). */
import { fixedChoice, numPart, skill } from '../../helpers.ts';
import { fmt } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { PlaneFigure, SkillDef } from '../../../types.ts';
import { NAMES, Sketch, bounds, centroid, type P } from './congruence.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const clean = (x: number) => Math.round(x * 1e6) / 1e6;
/** A number inside maths. */
const n = (x: number) => fmt(clean(x));
/** A measurement inside maths: 7.5\ \text{cm} */
const ms = (x: number, u: string) => `${n(x)}\\ \\text{${u}}`;
/** A measurement for a figure label: "7.5 cm". */
const lab = (x: number, u: string) => `${n(x)} ${u}`;
/** An area inside maths: 30\ \text{cm}^2 */
const sq = (x: number, u: string) => `${n(x)}\\ \\text{${u}}^2`;
const areaPart = (v: number, u: string, label = 'Area =') => numPart(clean(v), { suffix: `${u}²`, label });
const lenPart = (v: number, u: string, label?: string) => numPart(clean(v), { suffix: u, label });

/** Right triangles with whole or half-unit sides: [run, rise, slanted side]. */
const TRIPLES: Array<[number, number, number]> = [
  [3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13], [12, 5, 13], [9, 12, 15], [12, 9, 15],
  [1.5, 2, 2.5], [2, 1.5, 2.5], [4.5, 6, 7.5], [6, 4.5, 7.5], [2.5, 6, 6.5], [6, 2.5, 6.5],
];

interface Dim {
  a: P;
  b: P;
  text: string;
  /** The label goes on the side of ab away from this point. */
  away: P;
  /** Keep the label inside this polygon. */
  within?: P[];
}

interface Pic {
  outline: P[];
  /** Dashed heights and cutting lines. */
  dashed?: Array<[P, P]>;
  /** Dashed extensions of a base (for a height outside the shape). */
  extend?: Array<[P, P]>;
  /** Right-angle marks: corner and the direction of the first arm. */
  marks?: Array<{ at: P; dir: number }>;
  dims: Dim[];
  /** Extra outlines drawn inside (other triangles on the same base). */
  more?: P[][];
}

export function picFigure(pic: Pic): PlaneFigure {
  const s = new Sketch();
  const all = [...pic.outline, ...(pic.more ?? []).flat()];
  const b = bounds(all);
  const size = 0.045 * Math.max(b.x1 - b.x0, b.y1 - b.y0);
  for (const m of pic.more ?? []) s.polyline([...m, m[0]], 'muted');
  s.polyline([...pic.outline, pic.outline[0]], 'brand');
  for (const [p, q] of pic.extend ?? []) s.seg(p, q, { dashed: true, color: 'muted' });
  for (const [p, q] of pic.dashed ?? []) s.seg(p, q, { dashed: true, color: 'accent' });
  for (const m of pic.marks ?? []) s.rightMark(m.at, m.dir, size);
  for (const d of pic.dims) s.sideLabel(d.a, d.b, d.text, d.away, d.within);
  return s.build({ margin: 0.22 * Math.max(b.x1 - b.x0, b.y1 - b.y0) });
}


// ---------------------------------------------------------------------------
// Parallelograms
// ---------------------------------------------------------------------------

interface Para {
  b: number;
  h: number;
  /** How far the top side is shifted (a positive number). */
  s: number;
  /** Length of the slanted sides. */
  side: number;
  /** 1 = leaning right, -1 = leaning left. */
  lean: 1 | -1;
}

export function paraPts(p: Para): P[] {
  const s = p.s * p.lean;
  return [[0, 0], [p.b, 0], [p.b + s, p.h], [s, p.h]];
}

/** A parallelogram whose height (from a top corner) lands on the base. */
function makePara(rng: Rng, bMin: number, bMax: number, opts: { halfB?: boolean; hMax?: number } = {}): Para {
  for (;;) {
    const [s, h, side] = rng.pick(TRIPLES);
    if (h > (opts.hMax ?? 12)) continue;
    const b = opts.halfB ? rng.int(bMin * 2, bMax * 2) / 2 : rng.int(bMin, bMax);
    if (b <= s + 1 || b === side || b === h) continue;
    return { b, h, s, side, lean: rng.chance(0.5) ? 1 : -1 };
  }
}

export function paraPic(p: Para, labels: { base?: string; height?: string; side?: string }, extra: Partial<Pic> = {}): Pic {
  const pts = paraPts(p);
  const c = centroid(pts);
  const top: P = p.lean === 1 ? pts[3] : pts[2];
  const foot: P = [top[0], 0];
  const dims: Dim[] = [];
  if (labels.base) dims.push({ a: pts[0], b: pts[1], text: labels.base, away: c });
  if (labels.side) dims.push(p.lean === 1 ? { a: pts[0], b: pts[3], text: labels.side, away: c } : { a: pts[1], b: pts[2], text: labels.side, away: c });
  if (labels.height) dims.push({ a: top, b: foot, text: labels.height, away: [foot[0] - p.lean, p.h / 2], within: pts });
  return {
    outline: pts,
    dashed: [[top, foot], ...(extra.dashed ?? [])],
    marks: [{ at: foot, dir: p.lean === 1 ? 0 : 90 }],
    dims: [...dims, ...(extra.dims ?? [])],
  };
}

/** Contexts with a sensible unit. */
const PARA_CTX: Array<[string, (w: string) => string]> = [
  ['m', (w) => `${w} is painting a parallelogram on the school playground for a game.`],
  ['m', () => 'A parking lot has a section shaped like a parallelogram.'],
  ['cm', (w) => `${w} cut a parallelogram out of coloured paper for a math poster.`],
  ['m', () => 'A flower bed in a park is shaped like a parallelogram.'],
  ['cm', (w) => `${w} is sewing a quilt patch shaped like a parallelogram.`],
  ['cm', () => 'A tile on a bathroom wall is shaped like a parallelogram.'],
];

const areaParallelogram = skill({
  id: 'm6-area-parallelogram',
  name: 'Area of a parallelogram',
  description: 'Find the area of a parallelogram as base × height (the perpendicular height, not the slanted side), and find a missing base or height by division.',
  outcomes: ['M1'],
  lessonId: 'm6-9-1',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    const [u, mk] = rng.pick(PARA_CTX);
    const ctx = mk(who);
    const mode =
      d === 1 ? 'area' : d === 2 ? rng.weighted([['area-decimal', 1], ['missing', 2]] as const) : rng.weighted([['two-bases', 2], ['many', 2]] as const);

    if (mode === 'area' || mode === 'area-decimal') {
      const p = mode === 'area' ? makePara(rng, 4, 12, { hMax: 9 }) : makePara(rng, 5, 15, { halfB: true });
      if (mode === 'area-decimal' && Number.isInteger(p.b) && Number.isInteger(p.h)) p.b = p.b + 0.5;
      const A = p.b * p.h;
      return {
        prompt: `${ctx} Find the area of the parallelogram.`,
        figure: picFigure(paraPic(p, { base: lab(p.b, u), height: lab(p.h, u), side: lab(p.side, u) })),
        parts: [areaPart(A, u)],
        hints: [
          'The height is the dashed line. It makes a right angle with the base. The slanted side is not the height.',
          'Area of a parallelogram = base × height.',
        ],
        solution: [
          `The base is $${ms(p.b, u)}$. The height is the dashed line, $${ms(p.h, u)}$, because it is perpendicular to the base. The slanted side, $${ms(p.side, u)}$, is not used.`,
          `$A = b \\times h = ${n(p.b)} \\times ${n(p.h)} = ${n(A)}$`,
          `The area is $${sq(A, u)}$.`,
        ],
      };
    }

    if (mode === 'missing') {
      const p = makePara(rng, 4, 15);
      const findH = rng.chance(0.5);
      const A = p.b * p.h;
      return {
        prompt: `${ctx} Its area is $${sq(A, u)}$. ${findH ? `Its base is $${ms(p.b, u)}$. What is its height?` : `Its height is $${ms(p.h, u)}$. How long is its base?`}`,
        figure: picFigure(paraPic(p, findH ? { base: lab(p.b, u), height: '?' } : { base: '?', height: lab(p.h, u) })),
        parts: [lenPart(findH ? p.h : p.b, u, findH ? 'Height =' : 'Base =')],
        hints: ['Area = base × height. You know the area and one of the two numbers.', `Divide the area by the ${findH ? 'base' : 'height'}.`],
        solution: [
          `$A = b \\times h$, so $${n(A)} = ${findH ? `${n(p.b)} \\times h` : `b \\times ${n(p.h)}`}$.`,
          findH ? `$h = ${n(A)} \\div ${n(p.b)} = ${n(p.h)}$` : `$b = ${n(A)} \\div ${n(p.h)} = ${n(p.b)}$`,
          `Check: $${n(p.b)} \\times ${n(p.h)} = ${n(A)}$ ✓`,
          `The ${findH ? 'height' : 'base'} is $${ms(findH ? p.h : p.b, u)}$.`,
        ],
      };
    }

    if (mode === 'two-bases') {
      for (;;) {
        const p = makePara(rng, 4, 16);
        if (!Number.isInteger(p.side)) continue;
        if ((p.b * p.h) % p.side !== 0) continue;
        const A = p.b * p.h;
        const h2 = A / p.side;
        if (h2 === p.h) continue;
        return {
          prompt: `${ctx} Any side of a parallelogram can be used as the base. Using the bottom side as the base, the height is $${ms(p.h, u)}$. What is the height when the slanted side, $${ms(p.side, u)}$, is used as the base?`,
          figure: picFigure(paraPic(p, { base: lab(p.b, u), height: lab(p.h, u), side: lab(p.side, u) })),
          parts: [lenPart(h2, u, 'Height =')],
          hints: [
            'The area is the same, whichever side you use as the base. First find the area with the bottom side as the base.',
            'Then divide the area by the new base (the slanted side) to find the new height.',
          ],
          solution: [
            `Area $= ${n(p.b)} \\times ${n(p.h)} = ${n(A)}$, so the area is $${sq(A, u)}$.`,
            `With the slanted side as the base: $${n(A)} = ${n(p.side)} \\times h$.`,
            `$h = ${n(A)} \\div ${n(p.side)} = ${n(h2)}$`,
            `The height to the slanted side is $${ms(h2, u)}$.`,
          ],
        };
      }
    }

    // Several congruent parallelograms.
    const p = makePara(rng, 2, 9, { halfB: true, hMax: 6 });
    const k = rng.int(3, 9);
    const A = p.b * p.h;
    const thing = rng.pick([
      { ctx: `${who} is painting parking spaces in a school parking lot.`, what: 'parking spaces', verb: 'What total area will be painted?', unit: 'm' },
      { ctx: `${who} is making a banner from pieces of felt.`, what: 'pieces', verb: 'What is the total area of the felt pieces?', unit: 'cm' },
      { ctx: 'A patio is made of paving stones.', what: 'stones', verb: 'What area do the stones cover?', unit: 'cm' },
      { ctx: `${who} is gluing tiles onto a picture frame.`, what: 'tiles', verb: 'What total area do the tiles cover?', unit: 'cm' },
    ]);
    const unit = thing.unit;
    return {
      prompt: `${thing.ctx} Each one is a parallelogram like the one shown. There are $${k}$ ${thing.what}. ${thing.verb}`,
      figure: picFigure(paraPic(p, { base: lab(p.b, unit), height: lab(p.h, unit), side: lab(p.side, unit) })),
      parts: [areaPart(A * k, unit, 'Total area =')],
      hints: ['First find the area of one parallelogram: base × height. Use the dashed height, not the slanted side.', `Then multiply by the number of ${thing.what}, $${k}$.`],
      solution: [
        `One parallelogram: $${n(p.b)} \\times ${n(p.h)} = ${n(A)}$, so $${sq(A, unit)}$.`,
        `$${k}$ ${thing.what}: $${n(A)} \\times ${k} = ${n(A * k)}$`,
        `The total area is $${sq(A * k, unit)}$.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// Triangles
// ---------------------------------------------------------------------------

type TriKind = 'acute' | 'right' | 'obtuse';

interface Tri {
  b: number;
  h: number;
  /** Apex at (px, h). */
  px: number;
  kind: TriKind;
  /** A slanted side length that can be labelled (as a distractor), and which side it is. */
  side?: { len: number; from: 0 | 1 };
  mirror: boolean;
}

function makeTri(rng: Rng, kind: TriKind, opts: { bMax?: number; evenProduct?: boolean } = {}): Tri {
  const bMax = opts.bMax ?? 14;
  for (;;) {
    const mirror = rng.chance(0.5);
    if (kind === 'right') {
      const [b, h, hyp] = rng.pick(TRIPLES);
      if (b > bMax || b < 2 || h < 2) continue;
      if (opts.evenProduct && !Number.isInteger((b * h) / 2)) continue;
      return { b, h, px: 0, kind, side: { len: hyp, from: 0 }, mirror };
    }
    if (kind === 'acute') {
      const [run, h, len] = rng.pick(TRIPLES);
      const b = rng.int(Math.ceil(run) + 2, Math.max(Math.ceil(run) + 2, bMax));
      if (b > bMax || h < 2 || b === len) continue;
      if (opts.evenProduct && !Number.isInteger((b * h) / 2)) continue;
      return { b, h, px: run, kind, side: { len, from: 0 }, mirror };
    }
    const b = rng.int(3, Math.min(bMax, 10));
    const h = rng.int(3, 10);
    const over = rng.int(2, 4);
    if (opts.evenProduct && (b * h) % 2 !== 0) continue;
    return { b, h, px: b + over, kind, mirror };
  }
}

function triPts(t: Tri): P[] {
  const pts: P[] = [[0, 0], [t.b, 0], [t.px, t.h]];
  return t.mirror ? pts.map(([x, y]) => [t.b - x, y] as P) : pts;
}

export function triPic(t: Tri, labels: { base?: string; height?: string; side?: string }): Pic {
  const pts = triPts(t);
  const c = centroid(pts);
  const apex = pts[2];
  const foot: P = [apex[0], 0];
  const dims: Dim[] = [];
  if (labels.base) dims.push({ a: pts[0], b: pts[1], text: labels.base, away: c });
  const pic: Pic = { outline: pts, dims, marks: [], dashed: [], extend: [] };
  if (t.kind === 'right') {
    // The vertical leg is the height.
    if (labels.height) dims.push({ a: foot, b: apex, text: labels.height, away: c });
    pic.marks!.push({ at: foot, dir: t.mirror ? 90 : 0 });
    if (labels.side) dims.push({ a: pts[1], b: apex, text: labels.side, away: c });
    return pic;
  }
  pic.dashed!.push([apex, foot]);
  if (t.kind === 'obtuse') {
    const end: P = t.mirror ? pts[0] : pts[1];
    pic.extend!.push([end, foot]);
    pic.marks!.push({ at: foot, dir: t.mirror ? 0 : 90 });
    if (labels.height) dims.push({ a: apex, b: foot, text: labels.height, away: [foot[0] + (t.mirror ? 1 : -1), t.h / 2] });
  } else {
    pic.marks!.push({ at: foot, dir: t.mirror ? 90 : 0 });
    if (labels.height) dims.push({ a: apex, b: foot, text: labels.height, away: [foot[0] + (t.mirror ? 1 : -1), t.h / 2], within: pts });
  }
  if (labels.side && t.side) dims.push({ a: pts[0], b: apex, text: labels.side, away: c });
  return pic;
}

const TRI_CTX: Array<[string, (w: string) => string]> = [
  ['cm', (w) => `${w} is making a triangular pennant for a school team.`],
  ['m', () => 'A sail on a sailboat is shaped like a triangle.'],
  ['m', (w) => `${w} is planting a triangular garden bed.`],
  ['m', () => 'The end of a roof on a large barn is shaped like a triangle.'],
  ['cm', (w) => `${w} cut a triangle out of cardboard for a model.`],
  ['cm', () => 'A slice of a giant cookie at a bake sale is shaped like a triangle.'],
];

const areaTriangle = skill({
  id: 'm6-area-triangle',
  name: 'Area of a triangle',
  description: 'Find the area of a triangle as half of a parallelogram with the same base and height, find a missing base or height, and see that triangles with the same base and height have the same area.',
  outcomes: ['M1'],
  lessonId: 'm6-9-2',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    const [u, mk] = rng.pick(TRI_CTX);
    const ctx = mk(who);
    const mode =
      d === 1
        ? 'area'
        : d === 2
          ? rng.weighted([['area-obtuse', 2], ['half-para', 2], ['missing', 2]] as const)
          : rng.weighted([['same-base', 2], ['same-base-num', 1], ['many', 2]] as const);

    if (mode === 'area' || mode === 'area-obtuse') {
      const kind: TriKind = mode === 'area-obtuse' ? rng.pick(['obtuse', 'acute', 'right'] as const) : rng.pick(['acute', 'right'] as const);
      const t = makeTri(rng, kind, { evenProduct: d === 1 });
      const A = (t.b * t.h) / 2;
      const showSide = !!t.side;
      return {
        prompt: `${ctx} Find the area of the triangle.`,
        figure: picFigure(triPic(t, { base: lab(t.b, u), height: lab(t.h, u), side: showSide ? lab(t.side!.len, u) : undefined })),
        parts: [areaPart(A, u)],
        hints: [
          t.kind === 'right' ? 'In a right triangle, the two sides that make the right angle are a base and a height.' : t.kind === 'obtuse' ? 'The height can be outside the triangle. It is the dashed line that makes a right angle with the base (extended).' : 'The height is the dashed line. It makes a right angle with the base.',
          'A triangle is half of a parallelogram with the same base and height. Area of a triangle = (base × height) ÷ 2.',
        ],
        solution: [
          `The base is $${ms(t.b, u)}$ and the height is $${ms(t.h, u)}$.${showSide ? ` The slanted side, $${ms(t.side!.len, u)}$, is not the height.` : ''}`,
          `$A = (b \\times h) \\div 2 = (${n(t.b)} \\times ${n(t.h)}) \\div 2 = ${n(t.b * t.h)} \\div 2 = ${n(A)}$`,
          `The area is $${sq(A, u)}$.`,
        ],
      };
    }

    if (mode === 'half-para') {
      const p = makePara(rng, 4, 14);
      const A = p.b * p.h;
      const pts = paraPts(p);
      const ask = rng.chance(0.5);
      const pic = paraPic(p, ask ? { base: lab(p.b, u), height: lab(p.h, u) } : {}, { dashed: [[pts[0], pts[2]]] });
      return {
        prompt: ask
          ? `${who} cuts a parallelogram along a diagonal into two triangles. What is the area of one of the triangles?`
          : `${who} cuts a parallelogram with an area of $${sq(A, u)}$ along a diagonal into two triangles. What is the area of one of the triangles?`,
        figure: picFigure(pic),
        parts: [areaPart(A / 2, u, 'Area of one triangle =')],
        hints: ['A diagonal cuts a parallelogram into two congruent triangles. They have the same area.', 'Each triangle is half of the parallelogram.'],
        solution: [
          ...(ask ? [`Area of the parallelogram $= ${n(p.b)} \\times ${n(p.h)} = ${n(A)}$, so $${sq(A, u)}$.`] : []),
          'The diagonal cuts the parallelogram into two congruent triangles, so each triangle is half of the parallelogram.',
          `$${n(A)} \\div 2 = ${n(A / 2)}$`,
          `Each triangle has an area of $${sq(A / 2, u)}$.`,
        ],
      };
    }

    if (mode === 'missing') {
      const t = makeTri(rng, rng.pick(['acute', 'right'] as const));
      const findH = rng.chance(0.6);
      const A = (t.b * t.h) / 2;
      return {
        prompt: `${ctx} Its area is $${sq(A, u)}$. ${findH ? `Its base is $${ms(t.b, u)}$. What is its height?` : `Its height is $${ms(t.h, u)}$. How long is its base?`}`,
        figure: picFigure(triPic(t, findH ? { base: lab(t.b, u), height: '?' } : { base: '?', height: lab(t.h, u) })),
        parts: [lenPart(findH ? t.h : t.b, u, findH ? 'Height =' : 'Base =')],
        hints: [
          'The triangle is half of a parallelogram with the same base and height. Double the area to get the area of that parallelogram.',
          `Then divide by the ${findH ? 'base' : 'height'}, because parallelogram area = base × height.`,
        ],
        solution: [
          `The parallelogram with the same base and height has double the area: $${n(A)} \\times 2 = ${n(2 * A)}$.`,
          findH ? `$h = ${n(2 * A)} \\div ${n(t.b)} = ${n(t.h)}$` : `$b = ${n(2 * A)} \\div ${n(t.h)} = ${n(t.b)}$`,
          `Check: $(${n(t.b)} \\times ${n(t.h)}) \\div 2 = ${n(A)}$ ✓`,
          `The ${findH ? 'height' : 'base'} is $${ms(findH ? t.h : t.b, u)}$.`,
        ],
      };
    }

    if (mode === 'same-base' || mode === 'same-base-num') {
      const u = 'cm';
      const b = rng.int(3, 8);
      const h = rng.int(3, 6);
      const xs = rng.shuffle([rng.int(-3, -1), rng.int(1, b - 1), b + rng.int(1, 3)]);
      const tris: P[][] = xs.map((x) => [[0, 0], [b, 0], [x, h]] as P[]);
      const lineL: P = [Math.min(...xs, 0) - 1, h];
      const lineR: P = [Math.max(...xs, b) + 1, h];
      const s = new Sketch();
      s.seg([Math.min(...xs, 0) - 1, 0], [Math.max(...xs, b) + 1, 0], { color: 'muted', dashed: true });
      s.seg(lineL, lineR, { color: 'muted', dashed: true });
      tris.forEach((t, i) => {
        s.polyline([...t, t[0]], i === 0 ? 'brand' : i === 1 ? 'accent' : 'muted');
        s.endLabel(t[2], 90, String(i + 1));
      });
      s.sideLabel([0, 0], [b, 0], lab(b, u), [b / 2, 1]);
      s.seg([lineR[0] - 0.5, 0], [lineR[0] - 0.5, h], { color: 'accent', arrowEnd: true, arrowStart: true });
      s.sideLabel([lineR[0] - 0.5, 0], [lineR[0] - 0.5, h], lab(h, u), [0, h / 2]);
      const figure = s.build({ margin: 1.6 });
      const intro = `Triangles 1, 2 and 3 share the same base, $${ms(b, u)}$. Their top corners are all on a line parallel to the base, $${ms(h, u)}$ above it.`;
      if (mode === 'same-base') {
        const choices = ['Triangle 1', 'Triangle 2', 'Triangle 3', 'They all have the same area'];
        return {
          prompt: `${who} drew three triangles for a geometry poster. ${intro} Which triangle has the greatest area?`,
          figure,
          parts: [{ answer: fixedChoice(choices, 3) }],
          hints: ['Area of a triangle = (base × height) ÷ 2. Compare the bases and the heights of the three triangles.', 'The height is the distance from the base up to the top corner, measured straight up. Do not use the slanted sides.'],
          solution: [
            `Each triangle has base $${ms(b, u)}$ and height $${ms(h, u)}$, even though they lean differently.`,
            `Each area is $(${b} \\times ${h}) \\div 2 = ${n((b * h) / 2)}$, so each is $${sq((b * h) / 2, u)}$.`,
            'Triangles with the same base and height have the same area. They all have the same area.',
          ],
          answerDisplay: choices[3],
        };
      }
      const A = (b * h) / 2;
      const i = rng.int(1, 3);
      const j = rng.pick([1, 2, 3].filter((k) => k !== i));
      const s2 = new Sketch();
      s2.seg([Math.min(...xs, 0) - 1, h], [Math.max(...xs, b) + 1, h], { color: 'muted', dashed: true });
      tris.forEach((t, k) => {
        s2.polyline([...t, t[0]], k === 0 ? 'brand' : k === 1 ? 'accent' : 'muted');
        s2.endLabel(t[2], 90, String(k + 1));
      });
      return {
        prompt: `${who} drew three triangles for a geometry poster. They share the same base, and their top corners are all on a dashed line parallel to the base. Triangle ${i} has an area of $${sq(A, u)}$. What is the area of triangle ${j}?`,
        figure: s2.build({ margin: 1.6 }),
        parts: [areaPart(A, u, `Area of triangle ${j} =`)],
        hints: ['All three triangles have the same base. Is the height the same too?', 'The top corners are on a line parallel to the base, so they are all the same distance from the base.'],
        solution: [
          'The triangles share the same base, and their top corners are on a line parallel to the base, so they all have the same height.',
          'Triangles with the same base and height have the same area.',
          `Triangle ${j} has an area of $${sq(A, u)}$.`,
        ],
      };
    }

    // Several congruent triangles.
    const t = makeTri(rng, rng.pick(['acute', 'right'] as const), { bMax: 8 });
    const A = (t.b * t.h) / 2;
    const k = rng.int(3, 8);
    const it = rng.pick([
      { ctx: `${who} is sewing $${k}$ triangular pennants for a sports day. Each pennant is the triangle shown.`, q: 'How much fabric is needed for all the pennants?', u: 'cm' },
      { ctx: `A craft club is cutting $${k}$ triangles like the one shown to make a quilt.`, q: 'What is the total area of the triangles?', u: 'cm' },
      { ctx: `${who} is painting $${k}$ triangles like the one shown on a large wall mural.`, q: 'What total area will be painted?', u: 'm' },
    ]);
    const u2 = it.u;
    return {
      prompt: `${it.ctx} ${it.q}`,
      figure: picFigure(triPic(t, { base: lab(t.b, u2), height: lab(t.h, u2), side: t.side ? lab(t.side.len, u2) : undefined })),
      parts: [areaPart(A * k, u2, 'Total area =')],
      hints: ['First find the area of one triangle: (base × height) ÷ 2. Use the height, not the slanted side.', `Then multiply by $${k}$.`],
      solution: [
        `One triangle: $(${n(t.b)} \\times ${n(t.h)}) \\div 2 = ${n(A)}$, so $${sq(A, u2)}$.`,
        `$${k}$ triangles: $${n(A)} \\times ${k} = ${n(A * k)}$`,
        `The total area is $${sq(A * k, u2)}$.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// Composite shapes
// ---------------------------------------------------------------------------

interface Piece {
  kind: 'parallelogram' | 'rectangle' | 'triangle';
  b: number;
  h: number;
}

interface Composite {
  pic: Pic;
  /** The decomposition lines (shown below difficulty 3). */
  cuts: Array<[P, P]>;
  pieces: Piece[];
  /** Pieces to subtract (a cut-out). */
  minus?: Piece[];
  name: string;
}

const pieceArea = (p: Piece) => (p.kind === 'triangle' ? (p.b * p.h) / 2 : p.b * p.h);
const pieceCalc = (p: Piece) => (p.kind === 'triangle' ? `(${n(p.b)} \\times ${n(p.h)}) \\div 2 = ${n(pieceArea(p))}` : `${n(p.b)} \\times ${n(p.h)} = ${n(pieceArea(p))}`);

function makeComposite(rng: Rng, kind: string, u: string, half: boolean): Composite {
  const L = (x: number) => lab(x, u);
  const v = (lo: number, hi: number) => (half && rng.chance(0.4) ? rng.int(lo * 2, hi * 2 - 1) / 2 : rng.int(lo, hi));
  if (kind === 'house') {
    const w = 2 * rng.int(2, 6);
    const h1 = v(3, 8);
    const h2 = rng.int(2, 5);
    const ax = rng.chance(0.6) ? w / 2 : rng.int(1, w - 1);
    const pts: P[] = [[0, 0], [w, 0], [w, h1], [ax, h1 + h2], [0, h1]];
    const c = centroid(pts);
    return {
      name: 'a rectangle with a triangle on top',
      pic: {
        outline: pts,
        dashed: [[[ax, h1 + h2], [ax, h1]]],
        marks: [{ at: [ax, h1], dir: 0 }],
        dims: [
          { a: [0, 0], b: [w, 0], text: L(w), away: c },
          { a: [w, 0], b: [w, h1], text: L(h1), away: c },
          { a: [ax, h1], b: [ax, h1 + h2], text: L(h2), away: [ax - 1, h1 + h2 / 2], within: pts },
        ],
      },
      cuts: [[[0, h1], [w, h1]]],
      pieces: [{ kind: 'rectangle', b: w, h: h1 }, { kind: 'triangle', b: w, h: h2 }],
    };
  }
  if (kind === 'trapezoid') {
    for (;;) {
      const h = rng.int(3, 8);
      const t = v(3, 9);
      const s1 = rng.int(1, 3);
      const B = t + rng.int(2, 6);
      // Top side from (s1, h) to (s1 + t, h); bottom side from (0, 0) to (B, 0).
      if (s1 + t >= B) continue;
      const pts: P[] = [[0, 0], [B, 0], [s1 + t, h], [s1, h]];
      const c = centroid(pts);
      return {
        name: 'a parallelogram and a triangle',
        pic: {
          outline: pts,
          dashed: [[[s1, h], [s1, 0]]],
          marks: [{ at: [s1, 0], dir: 0 }],
          dims: [
            { a: [0, 0], b: [B, 0], text: L(B), away: c },
            { a: [s1, h], b: [s1 + t, h], text: L(t), away: c },
            { a: [s1, h], b: [s1, 0], text: L(h), away: [s1 - 1, h / 2], within: pts },
          ],
        },
        cuts: [[[t, 0], [s1 + t, h]]],
        pieces: [{ kind: 'parallelogram', b: t, h }, { kind: 'triangle', b: clean(B - t), h }],
      };
    }
  }
  if (kind === 'kite') {
    const dd = 2 * rng.int(2, 6);
    const h1 = rng.int(2, 6);
    const h2 = rng.intExcept(2, 7, [h1]);
    const p = rng.int(1, dd - 1);
    const q = rng.int(1, dd - 1);
    const pts: P[] = [[0, 0], [q, -h2], [dd, 0], [p, h1]];
    return {
      name: 'two triangles',
      pic: {
        outline: pts,
        dashed: [[[0, 0], [dd, 0]], [[p, h1], [p, 0]], [[q, -h2], [q, 0]]],
        marks: [{ at: [p, 0], dir: 0 }, { at: [q, 0], dir: 180 }],
        dims: [
          { a: [0, 0], b: [dd, 0], text: L(dd), away: [dd / 2, 1] },
          { a: [p, 0], b: [p, h1], text: L(h1), away: [p - 1, h1 / 2], within: pts },
          { a: [q, 0], b: [q, -h2], text: L(h2), away: [q + 1, -h2 / 2], within: pts },
        ],
      },
      cuts: [],
      pieces: [{ kind: 'triangle', b: dd, h: h1 }, { kind: 'triangle', b: dd, h: h2 }],
    };
  }
  if (kind === 'chevron') {
    const a = v(3, 9);
    const h = rng.int(2, 5);
    const s = rng.int(1, 3);
    const pts: P[] = [[0, 0], [a, 0], [a + s, h], [a, 2 * h], [0, 2 * h], [s, h]];
    const c = centroid(pts);
    return {
      name: 'two parallelograms',
      pic: {
        outline: pts,
        dashed: [[[s, 0], [s, h]], [[s, h], [s, 2 * h]]],
        marks: [{ at: [s, 0], dir: 0 }, { at: [s, 2 * h], dir: -90 }],
        dims: [
          { a: [0, 0], b: [a, 0], text: L(a), away: c },
          { a: [0, 2 * h], b: [a, 2 * h], text: L(a), away: c },
          { a: [s, 0], b: [s, h], text: L(h), away: [s - 1, h / 2], within: pts },
          { a: [s, h], b: [s, 2 * h], text: L(h), away: [s - 1, 1.5 * h], within: pts },
        ],
      },
      cuts: [[[s, h], [a + s, h]]],
      pieces: [{ kind: 'parallelogram', b: a, h }, { kind: 'parallelogram', b: a, h }],
    };
  }
  if (kind === 'flag') {
    // A parallelogram with a triangle on its top side.
    const b = 2 * rng.int(2, 5);
    const h = v(2, 6);
    const s = rng.int(1, 3);
    const h2 = rng.int(2, 5);
    const ax = s + rng.int(1, b - 1);
    const pts: P[] = [[0, 0], [b, 0], [b + s, h], [ax, h + h2], [s, h]];
    const c = centroid(pts);
    return {
      name: 'a parallelogram with a triangle on top',
      pic: {
        outline: pts,
        dashed: [[[s, h], [s, 0]], [[ax, h + h2], [ax, h]]],
        marks: [{ at: [s, 0], dir: 0 }, { at: [ax, h], dir: 0 }],
        dims: [
          { a: [0, 0], b: [b, 0], text: L(b), away: c },
          { a: [s, h], b: [s, 0], text: L(h), away: [s - 1, h / 2], within: pts },
          { a: [ax, h], b: [ax, h + h2], text: L(h2), away: [ax - 1, h + h2 / 2], within: pts },
        ],
      },
      cuts: [[[s, h], [b + s, h]]],
      pieces: [{ kind: 'parallelogram', b, h }, { kind: 'triangle', b, h: h2 }],
    };
  }
  // A rectangle with a triangular notch cut out of the top.
  const W = 2 * rng.int(4, 8);
  const H = rng.int(4, 9);
  const nb = 2 * rng.int(2, Math.floor(W / 2) - 2);
  const depth = rng.int(2, Math.min(H - 2, nb - 1));
  const x0 = rng.int(1, W - nb - 1);
  const pts: P[] = [[0, 0], [W, 0], [W, H], [x0 + nb, H], [x0 + nb / 2, H - depth], [x0, H], [0, H]];
  const notch: P[] = [[x0, H], [x0 + nb, H], [x0 + nb / 2, H - depth]];
  const c: P = [W / 2, H / 3];
  return {
    name: 'a rectangle with a triangle cut out',
    pic: {
      outline: pts,
      dashed: [[[x0 + nb / 2, H - depth], [x0 + nb / 2, H]], [[x0, H], [x0 + nb, H]]],
      dims: [
        { a: [0, 0], b: [W, 0], text: L(W), away: c },
        { a: [W, 0], b: [W, H], text: L(H), away: c },
        { a: [x0, H], b: [x0 + nb, H], text: L(nb), away: c },
        { a: [x0 + nb / 2, H - depth], b: [x0 + nb / 2, H], text: L(depth), away: [x0 + nb / 2 - 1, H - depth / 2], within: notch },
      ],
    },
    cuts: [],
    pieces: [{ kind: 'rectangle', b: W, h: H }],
    minus: [{ kind: 'triangle', b: nb, h: depth }],
  };
}

const COMP_CTX: Record<string, Array<[string, (w: string) => string]>> = {
  house: [['m', (w) => `${w} is painting the end wall of a large barn.`], ['cm', (w) => `${w} drew the outline of a birdhouse.`], ['cm', () => 'A sticker is shaped like a little house.']],
  trapezoid: [['m', () => 'A garden bed is shaped like this.'], ['m', (w) => `${w} is laying sod on a yard shaped like this.`], ['cm', () => 'A wooden block in a toy set has a face shaped like this.']],
  kite: [['cm', (w) => `${w} is making a paper kite from two triangles.`], ['cm', () => 'A badge is shaped like this.'], ['cm', (w) => `${w} cut this gem shape out of paper.`]],
  chevron: [['cm', () => 'A school logo has this arrow shape.'], ['m', (w) => `${w} is painting an arrow on a parking lot.`], ['cm', () => 'A stripe on a hockey jersey has this shape.']],
  flag: [['cm', (w) => `${w} is designing a pennant shaped like this.`], ['m', () => 'A field at a mountain campground has this shape.'], ['cm', (w) => `${w} cut this shape out of felt for a banner.`]],
  notch: [['cm', () => 'A paper banner has a triangle cut out of its top edge.'], ['cm', (w) => `${w} made a sign from a rectangle of card with a triangular notch.`], ['m', () => 'The wall of a barn has a triangular opening at the top.']],
};

const compositeArea = skill({
  id: 'm6-composite-area',
  name: 'Area of composite shapes',
  description: 'Find the area of a shape made of triangles and parallelograms by decomposing it and adding (or subtracting) the areas of the parts.',
  outcomes: ['M1'],
  lessonId: 'm6-9-3',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    const kind = d === 1 ? rng.pick(['house', 'trapezoid', 'flag']) : d === 2 ? rng.pick(['house', 'trapezoid', 'kite', 'chevron', 'flag']) : rng.pick(['trapezoid', 'kite', 'chevron', 'flag', 'notch', 'notch']);
    const [u, mk] = rng.pick(COMP_CTX[kind]);
    const comp = makeComposite(rng, kind, u, d >= 2);
    const showCuts = d < 3;
    const pic: Pic = { ...comp.pic, dashed: [...(comp.pic.dashed ?? []), ...(showCuts ? comp.cuts : [])] };
    const total = comp.pieces.reduce((s, p) => s + pieceArea(p), 0) - (comp.minus ?? []).reduce((s, p) => s + pieceArea(p), 0);
    const word = (p: Piece) => (p.kind === 'triangle' ? 'Triangle' : p.kind === 'rectangle' ? 'Rectangle' : 'Parallelogram');
    const ctx = mk(who);
    const sumLine = comp.minus
      ? `Area $= ${n(pieceArea(comp.pieces[0]))} - ${n(pieceArea(comp.minus[0]))} = ${n(total)}$`
      : `Area $= ${comp.pieces.map((p) => n(pieceArea(p))).join(' + ')} = ${n(total)}$`;
    return {
      prompt: `${ctx} ${showCuts ? `The dashed lines split it into ${comp.name}. ` : ''}Find the area of the whole shape.`,
      figure: picFigure(pic),
      parts: [areaPart(total, u)],
      hints: [
        comp.minus
          ? 'Find the area of the whole rectangle, then subtract the area of the triangle that was cut out.'
          : showCuts
            ? 'Find the area of each part separately.'
            : 'Split the shape into triangles and parallelograms (a rectangle is a parallelogram too). Then find the area of each part.',
        'Parallelogram or rectangle: base × height. Triangle: (base × height) ÷ 2. Then add the areas of the parts.',
      ],
      solution: [
        comp.minus ? 'The shape is a rectangle with a triangle cut out of it.' : `Split the shape into ${comp.name}.`,
        ...comp.pieces.map((p) => `${word(p)}: $${pieceCalc(p)}$`),
        ...(comp.minus ?? []).map((p) => `${word(p)} cut out: $${pieceCalc(p)}$`),
        sumLine,
        `The area of the shape is $${sq(total, u)}$.`,
      ],
    };
  },
});

export const AREA_SKILLS: SkillDef[] = [areaParallelogram, areaTriangle, compositeArea];
