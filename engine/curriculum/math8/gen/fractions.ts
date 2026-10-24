/** Math 8 Unit 4 — Multiplying and Dividing Fractions (N6). */
import { numPart, retry, skill } from '../../helpers.ts';
import { frac, gcd, lcm, type Frac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure; answerDisplay?: string };

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Ananya', 'Nathan', 'Lena', 'Diego', 'Harpreet', 'Noor',
];

const T = '\\times';
const D = '\\div';
const tx = (u: string) => `\\text{${u}}`;
/** A fraction in LaTeX exactly as written (not simplified). */
const fr = (n: number | string, d: number | string) => `\\dfrac{${n}}{${d}}`;
/** A mixed number in LaTeX from its parts: 2\dfrac{3}{4}, 2 or \dfrac{3}{4}. */
const mx = (w: number, n: number, d: number) => (n === 0 ? `${w}` : w === 0 ? fr(n, d) : `${w}${fr(n, d)}`);

interface Mixed {
  w: number;
  n: number;
  d: number;
}
const mtex = (m: Mixed) => mx(m.w, m.n, m.d);
/** The improper fraction for a mixed number (not simplified). */
const improper = (m: Mixed): Frac => ({ n: m.w * m.d + m.n, d: m.d });
const fval = (f: Frac) => f.n / f.d;
/** A positive fraction in lowest terms, as a mixed number when it is more than 1. */
function mixedTex(f: Frac): string {
  const g = frac(f.n, f.d);
  const w = Math.floor(g.n / g.d);
  return mx(w, g.n - w * g.d, g.d);
}
/** Lowest-terms fraction LaTeX (improper allowed). */
const lowTex = (f: Frac) => {
  const g = frac(f.n, f.d);
  return g.d === 1 ? `${g.n}` : fr(g.n, g.d);
};
/** Proper numerators in lowest terms for a denominator. */
const lowNums = (d: number) => Array.from({ length: d - 1 }, (_, i) => i + 1).filter((n) => gcd(n, d) === 1);

/** The answer part and the instruction for the answer form, chosen from the value. */
function answerFor(f: Frac, suffix?: string, label?: string): { part: Part; ask: string } {
  const g = frac(f.n, f.d);
  if (g.d === 1) return { part: numPart(g.n, { suffix, label, exact: false }), ask: '' };
  if (g.n < g.d) return { part: numPart(g.n / g.d, { fraction: 'lowest', suffix, label }), ask: ' Write your answer in lowest terms.' };
  return { part: numPart(g.n / g.d, { fraction: 'mixed', suffix, label }), ask: ' Write your answer as a mixed number in lowest terms.' };
}

/** Steps that simplify a/b (when needed) and turn it into a mixed number (when improper). */
function finishSteps(n: number, d: number): string[] {
  const out: string[] = [];
  const g = gcd(n, d);
  if (g > 1) out.push(`Simplify: divide the top and bottom by $${g}$: $${fr(n, d)} = ${lowTex({ n, d })}$.`);
  const s = frac(n, d);
  if (s.d !== 1 && s.n > s.d) out.push(`Write it as a mixed number: $${fr(s.n, s.d)} = ${mixedTex(s)}$, because $${s.n} ${D} ${s.d} = ${Math.floor(s.n / s.d)}$ R $${s.n % s.d}$.`);
  return out;
}

/**
 * Area model for a/b × c/d on a unit square: the square is cut into b rows and d columns,
 * c columns are shaded one colour and a rows (from the bottom) another; the overlap is the product.
 */
function areaModel(a: number, b: number, c: number, d: number): Figure {
  const S = 12;
  const cw = S / d;
  const rh = S / b;
  const segments: Array<{ from: [number, number]; to: [number, number]; color?: 'brand' | 'accent' | 'muted'; dashed?: boolean }> = [];
  for (let i = 1; i < d; i++) segments.push({ from: [i * cw, 0], to: [i * cw, S], color: 'muted' });
  for (let j = 1; j < b; j++) segments.push({ from: [0, j * rh], to: [S, j * rh], color: 'muted' });
  const X = c * cw;
  const Y = a * rh;
  // Hatch the overlap (the product) with diagonal lines so it stands out from the two shadings.
  const h = 0.9;
  for (let k = -Y + h / 2; k < X; k += h) {
    const from: [number, number] = [Math.max(0, k), Math.max(0, -k)];
    const to: [number, number] = [Math.min(X, Y + k), Math.min(Y, X - k)];
    if (to[0] - from[0] > 0.15) segments.push({ from, to, color: 'brand' });
  }
  return {
    type: 'plane',
    grid: { xMin: -0.4, xMax: S + 0.4, yMin: -0.4, yMax: S + 0.4, step: S + 0.8 },
    polylines: [
      { points: [[0, 0], [X, 0], [X, S], [0, S], [0, 0]], color: 'brand', fill: true },
      { points: [[0, 0], [S, 0], [S, Y], [0, Y], [0, 0]], color: 'accent', fill: true },
      { points: [[0, 0], [S, 0], [S, S], [0, S], [0, 0]], color: 'muted' },
    ],
    segments,
    hideTickLabels: true,
    caption: `Area model for ${a}/${b} × ${c}/${d}: a square cut into ${b} rows and ${d} columns, with ${c} ${c === 1 ? 'column' : 'columns'} and ${a} ${a === 1 ? 'row' : 'rows'} shaded; the overlap is hatched`,
  };
}

/** Fraction strips: `wholes` bars, each cut into `parts` equal pieces. */
function strips(wholes: number, parts: number, caption: string): Figure {
  const W = 120;
  const h = 16;
  const gap = 10;
  const H = wholes * (h + gap) + gap;
  const polylines: Array<{ points: Array<[number, number]>; color?: 'brand' | 'accent' | 'muted'; fill?: boolean }> = [];
  const segments: Array<{ from: [number, number]; to: [number, number]; color?: 'brand' | 'accent' | 'muted' }> = [];
  for (let i = 0; i < wholes; i++) {
    const y0 = H - gap - h - i * (h + gap);
    const cw = W / parts;
    for (let k = 1; k < parts; k++) segments.push({ from: [k * cw, y0], to: [k * cw, y0 + h], color: 'brand' });
    polylines.push({ points: [[0, y0], [W, y0], [W, y0 + h], [0, y0 + h], [0, y0]], color: 'brand', fill: true });
  }
  return { type: 'plane', grid: { xMin: -2, xMax: W + 2, yMin: 0, yMax: H, step: W + 4 }, polylines, segments, hideTickLabels: true, caption };
}

/** "= 5/6" or "= 3" for a product written as n/d. */
const eqFrac = (n: number, d: number) => (d === 1 ? `= ${n}` : `= ${fr(n, d)}`);

/** Steps for multiplying two fractions (simplifying across first when it helps). */
function multiplySteps(x: Frac, y: Frac): string[] {
  const steps: string[] = [];
  const g1 = gcd(x.n, y.d);
  const g2 = gcd(y.n, x.d);
  if (g1 > 1 || g2 > 1) {
    const sx = { n: x.n / g1, d: x.d / g2 };
    const sy = { n: y.n / g2, d: y.d / g1 };
    const notes = [g1 > 1 ? `$${x.n}$ and $${y.d}$ share the factor $${g1}$` : '', g2 > 1 ? `$${y.n}$ and $${x.d}$ share the factor $${g2}$` : ''].filter(Boolean).join('; ');
    steps.push(`Simplify before multiplying: ${notes}. $${fr(x.n, x.d)} ${T} ${fr(y.n, y.d)} = ${fr(sx.n, sx.d)} ${T} ${fr(sy.n, sy.d)}$.`);
    steps.push(`Multiply the numerators and the denominators: $${fr(`${sx.n} ${T} ${sy.n}`, `${sx.d} ${T} ${sy.d}`)} ${eqFrac(sx.n * sy.n, sx.d * sy.d)}$.`);
    steps.push(...finishSteps(sx.n * sy.n, sx.d * sy.d));
  } else {
    steps.push(`Multiply the numerators and the denominators: $${fr(`${x.n} ${T} ${y.n}`, `${x.d} ${T} ${y.d}`)} ${eqFrac(x.n * y.n, x.d * y.d)}$.`);
    steps.push(...finishSteps(x.n * y.n, x.d * y.d));
  }
  return steps;
}

/** Steps for x ÷ y using the reciprocal. */
function divideSteps(x: Frac, y: Frac): string[] {
  return [`Dividing by $${lowTex(y)}$ is the same as multiplying by its reciprocal, $${fr(y.d, y.n)}$: $${fr(x.n, x.d)} ${D} ${fr(y.n, y.d)} = ${fr(x.n, x.d)} ${T} ${fr(y.d, y.n)}$.`, ...multiplySteps(x, { n: y.d, d: y.n })];
}

/** Steps for x ÷ y using a common denominator. */
function commonDenSteps(x: Frac, y: Frac): string[] {
  const L = lcm(x.d, y.d);
  const X = x.n * (L / x.d);
  const Y = y.n * (L / y.d);
  const steps: string[] = [];
  if (x.d !== L || y.d !== L) steps.push(`Write both fractions with the common denominator $${L}$: $${fr(x.n, x.d)} ${D} ${fr(y.n, y.d)} = ${fr(X, L)} ${D} ${fr(Y, L)}$.`);
  if (X % Y === 0) steps.push(`Now the pieces are the same size, so divide the numerators: $${X} ${D} ${Y} = ${X / Y}$.`);
  else {
    steps.push(`Now the pieces are the same size, so divide the numerators: $${X} ${D} ${Y} = ${fr(X, Y)}$.`);
    steps.push(...finishSteps(X, Y));
  }
  return steps;
}

const asFrac = (w: number): Frac => ({ n: w, d: 1 });
const ftex = (f: Frac) => (f.d === 1 ? `${f.n}` : fr(f.n, f.d));

// ---------------------------------------------------------------------------
// 4.1 Multiplying fractions
// ---------------------------------------------------------------------------

const MUL_HINT = 'To multiply fractions, multiply the numerators and multiply the denominators.';

function mulD1(rng: Rng): Out {
  if (rng.chance(0.3)) {
    // A fraction of a whole number.
    const b = rng.pick([2, 3, 4, 5, 6]);
    const a = rng.pick(lowNums(b));
    const k = rng.int(2, 6);
    const N = b * k;
    return {
      prompt: `Find $${fr(a, b)} ${T} ${N}$.`,
      parts: [numPart(a * k, { exact: false })],
      hints: [`$${fr(a, b)} ${T} ${N}$ means $${fr(a, b)}$ of $${N}$.`, `Find $${fr(1, b)}$ of $${N}$ first: $${N} ${D} ${b}$. Then multiply by $${a}$.`],
      solution: [
        `$${fr(a, b)}$ of $${N}$: first find $${fr(1, b)}$ of $${N}$: $${N} ${D} ${b} = ${k}$.`,
        a === 1 ? `You need $1$ part, so the answer is $${k}$.` : `Then take $${a}$ parts: $${a} ${T} ${k} = ${a * k}$.`,
        `Or: $${fr(`${a} ${T} ${N}`, b)} = ${fr(a * N, b)} = ${a * k}$.`,
        `$${fr(a, b)} ${T} ${N} = ${a * k}$`,
      ],
    };
  }
  const [b, d] = [rng.int(2, 5), rng.int(2, 6)];
  const a = rng.pick(lowNums(b));
  const c = rng.pick(lowNums(d));
  const r: Frac = { n: a * c, d: b * d };
  const { part, ask } = answerFor(r);
  return {
    prompt: `The area model shows $${fr(a, b)} ${T} ${fr(c, d)}$. The square is cut into $${b}$ rows and $${d}$ columns. $${c}$ ${c === 1 ? 'column is' : 'columns are'} shaded one colour and $${a}$ ${a === 1 ? 'row is' : 'rows are'} shaded another colour. The overlap is hatched with lines. Find the product.${ask}`,
    figure: areaModel(a, b, c, d),
    parts: [part],
    hints: ['The overlap (shaded both ways) is the product. Count the small rectangles in the overlap and in the whole square.', MUL_HINT],
    solution: [
      `The whole square has $${b} ${T} ${d} = ${b * d}$ small rectangles, so each one is $${fr(1, b * d)}$.`,
      `The overlap is $${a}$ ${a === 1 ? 'row' : 'rows'} by $${c}$ ${c === 1 ? 'column' : 'columns'}: $${a} ${T} ${c} = ${a * c}$ small ${a * c === 1 ? 'rectangle' : 'rectangles'}.`,
      `So $${fr(a, b)} ${T} ${fr(c, d)} = ${fr(a * c, b * d)}$. This matches multiplying numerators and denominators.`,
      ...finishSteps(a * c, b * d),
      `$${fr(a, b)} ${T} ${fr(c, d)} = ${lowTex(r)}$`,
    ],
  };
}

function mulD2(rng: Rng): Out {
  if (rng.chance(0.4)) {
    // Whole number times a fraction, with an improper result.
    const d = rng.pick([3, 4, 5, 6, 8]);
    const n = rng.pick(lowNums(d).filter((x) => x > 1 || d > 3));
    const W = retry(() => rng.int(2, 9), (w) => (w * n) % d !== 0 && w * n > d);
    const r: Frac = { n: W * n, d };
    const { part, ask } = answerFor(r);
    const first = rng.chance(0.5);
    const expr = first ? `${W} ${T} ${fr(n, d)}` : `${fr(n, d)} ${T} ${W}`;
    return {
      prompt: `Find $${expr}$.${ask}`,
      parts: [part],
      hints: [`Write $${W}$ as $${fr(W, 1)}$.`, MUL_HINT],
      solution: [
        `Write the whole number as a fraction: $${W} = ${fr(W, 1)}$.`,
        `$${first ? `${fr(W, 1)} ${T} ${fr(n, d)}` : `${fr(n, d)} ${T} ${fr(W, 1)}`} = ${fr(W * n, d)}$`,
        ...finishSteps(W * n, d),
        `$${expr} = ${mixedTex(r)}$`,
      ],
      answerDisplay: `$${mixedTex(r)}$`,
    };
  }
  // Two fractions with common factors to cancel.
  const { x, y } = retry(
    () => {
      const b = rng.pick([3, 4, 5, 6, 8, 9, 10, 12]);
      const d = rng.pick([3, 4, 5, 6, 8, 9, 10, 12]);
      return { x: { n: rng.pick(lowNums(b)), d: b }, y: { n: rng.pick(lowNums(d)), d } };
    },
    ({ x, y }) => (gcd(x.n, y.d) > 1 || gcd(y.n, x.d) > 1) && x.n * y.n < x.d * y.d && frac(x.n * y.n, x.d * y.d).d <= 36,
    300,
  );
  const r: Frac = { n: x.n * y.n, d: x.d * y.d };
  const { part, ask } = answerFor(r);
  return {
    prompt: `Find $${fr(x.n, x.d)} ${T} ${fr(y.n, y.d)}$.${ask}`,
    parts: [part],
    hints: [MUL_HINT, 'Look for a numerator and a denominator with a common factor. Divide them both by it first to keep the numbers small.'],
    solution: [...multiplySteps(x, y), `$${fr(x.n, x.d)} ${T} ${fr(y.n, y.d)} = ${lowTex(r)}$`],
  };
}

function randMixed(rng: Rng, dens: number[], wMax: number): Mixed {
  const d = rng.pick(dens);
  return { w: rng.int(1, wMax), n: rng.pick(lowNums(d)), d };
}

function mulD3(rng: Rng): Out {
  if (rng.chance(0.25)) {
    // Three fractions.
    const { fs } = retry(
      () => ({ fs: [0, 1, 2].map(() => { const d = rng.pick([2, 3, 4, 5, 6, 8, 9, 10]); return { n: rng.pick(lowNums(d)), d }; }) }),
      ({ fs }) => {
        const r = frac(fs[0].n * fs[1].n * fs[2].n, fs[0].d * fs[1].d * fs[2].d);
        return r.d <= 30 && r.d > 1 && gcd(fs[0].n * fs[1].n * fs[2].n, fs[0].d * fs[1].d * fs[2].d) >= 6;
      },
      400,
    );
    const N = fs[0].n * fs[1].n * fs[2].n;
    const Dn = fs[0].d * fs[1].d * fs[2].d;
    const r = frac(N, Dn);
    const { part, ask } = answerFor(r);
    const expr = fs.map((f) => fr(f.n, f.d)).join(` ${T} `);
    return {
      prompt: `Find $${expr}$.${ask}`,
      parts: [part],
      hints: [MUL_HINT + ' This works for three fractions too.', 'Simplify first: divide any numerator and any denominator by a common factor.'],
      solution: [
        `Multiply all the numerators and all the denominators: $${fr(fs.map((f) => f.n).join(` ${T} `), fs.map((f) => f.d).join(` ${T} `))} = ${fr(N, Dn)}$.`,
        ...finishSteps(N, Dn),
        `$${expr} = ${lowTex(r)}$`,
        'Tip: simplifying before you multiply gives the same answer with smaller numbers.',
      ],
    };
  }
  const { A, B } = retry(
    () => ({ A: randMixed(rng, [2, 3, 4, 5, 6], 3), B: rng.chance(0.3) ? { w: 0, n: 0, d: 1 } : randMixed(rng, [2, 3, 4, 5, 6], 3) }),
    ({ A, B }) => {
      if (B.d === 1) return true;
      const r = frac(improper(A).n * improper(B).n, A.d * B.d);
      return r.d > 1 && A.d * B.d <= 30 && r.d <= 24;
    },
  );
  let Bm = B;
  if (B.d === 1) {
    // A proper fraction times a mixed number.
    Bm = retry(
      () => { const d = rng.pick([2, 3, 4, 5, 6, 8]); return { w: 0, n: rng.pick(lowNums(d)), d }; },
      (m) => { const r = frac(improper(A).n * m.n, A.d * m.d); return r.d > 1 && r.d <= 24; },
      100,
    );
  }
  const x = improper(A);
  const y = improper(Bm);
  const r = frac(x.n * y.n, x.d * y.d);
  const { part, ask } = answerFor(r);
  const useModel = Bm.w > 0 && rng.chance(0.4);
  const prod = `${mtex(A)} ${T} ${mtex(Bm)}`;
  return {
    prompt: `Find $${prod}$.${ask}${useModel ? ' You can use the area model: each part of one mixed number times each part of the other.' : ''}`,
    figure: useModel ? { type: 'areaModel', top: [`${A.w}`, fr(A.n, A.d)], side: [`${Bm.w}`, fr(Bm.n, Bm.d)], cells: [['?', '?'], ['?', '?']] } : undefined,
    parts: [part],
    hints: ['Write each mixed number as an improper fraction first.', MUL_HINT],
    solution: [
      `Write ${Bm.w > 0 ? 'each mixed number' : 'the mixed number'} as an improper fraction: $${mtex(A)} = ${fr(x.n, x.d)}$${Bm.w > 0 ? ` and $${mtex(Bm)} = ${fr(y.n, y.d)}$` : ''}.`,
      ...multiplySteps(x, y),
      ...(useModel
        ? [`Area model check: $${A.w} ${T} ${Bm.w} + ${A.w} ${T} ${fr(Bm.n, Bm.d)} + ${fr(A.n, A.d)} ${T} ${Bm.w} + ${fr(A.n, A.d)} ${T} ${fr(Bm.n, Bm.d)} = ${A.w * Bm.w} + ${lowTex({ n: A.w * Bm.n, d: Bm.d })} + ${lowTex({ n: A.n * Bm.w, d: A.d })} + ${lowTex({ n: A.n * Bm.n, d: A.d * Bm.d })} = ${mixedTex(r)}$.`]
        : []),
      `$${prod} = ${mixedTex(r)}$`,
    ],
    answerDisplay: `$${mixedTex(r)}$`,
  };
}

const fractionMultiply = skill({
  id: 'm8-fraction-multiply',
  name: 'Multiplying fractions',
  description: 'Multiply fractions, whole numbers and mixed numbers, using area models and by multiplying numerators and denominators, and write products in lowest terms.',
  outcomes: ['N6'],
  lessonId: 'm8-4-1',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return mulD1(rng);
    if (d === 2) return mulD2(rng);
    return mulD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 4.2 Dividing fractions
// ---------------------------------------------------------------------------

const RECIP = 'To divide by a fraction, multiply by its reciprocal (flip the second fraction).';

function divD1(rng: Rng): Out {
  const kind = rng.pick(['howMany', 'sameDen', 'relatedDen'] as const);
  if (kind === 'howMany') {
    const n = rng.int(2, 4);
    const d = rng.pick([2, 3, 4, 5, 6]);
    const pic = n <= 3;
    return {
      prompt: `How many $${fr(1, d)}$s are in $${n}$? Find $${n} ${D} ${fr(1, d)}$.${pic ? ` Each strip in the picture is $1$ whole cut into $${d}$ equal parts.` : ''}`,
      figure: pic ? strips(n, d, `${n} wholes, each cut into ${d} equal parts`) : undefined,
      parts: [numPart(n * d, { exact: false })],
      hints: [`Dividing by $${fr(1, d)}$ asks how many pieces of size $${fr(1, d)}$ fit into $${n}$.`, `Each whole has $${d}$ pieces of size $${fr(1, d)}$.`],
      solution: [
        `Each whole holds $${d}$ pieces of size $${fr(1, d)}$.`,
        `$${n}$ wholes hold $${n} ${T} ${d} = ${n * d}$ pieces.`,
        `With the reciprocal: $${n} ${D} ${fr(1, d)} = ${n} ${T} ${fr(d, 1)} = ${n * d}$.`,
        `$${n} ${D} ${fr(1, d)} = ${n * d}$`,
      ],
    };
  }
  if (kind === 'sameDen') {
    const d = rng.pick([5, 6, 8, 9, 10, 12]);
    const { c, q } = retry(() => ({ c: rng.int(1, 3), q: rng.int(2, 5) }), (o) => o.c * o.q < d, 200);
    const a = c * q;
    return {
      prompt: `Find $${fr(a, d)} ${D} ${fr(c, d)}$.`,
      parts: [numPart(q, { exact: false })],
      hints: ['The denominators are the same, so the pieces are the same size.', `How many groups of $${c}$ ${c === 1 ? 'piece' : 'pieces'} fit into $${a}$ pieces?`],
      solution: [
        `Both fractions count pieces of size $${fr(1, d)}$.`,
        `How many groups of $${c}$ ${c === 1 ? 'piece' : 'pieces'} are in $${a}$ pieces? $${a} ${D} ${c} = ${q}$.`,
        `$${fr(a, d)} ${D} ${fr(c, d)} = ${q}$`,
      ],
    };
  }
  // Denominators where one is a multiple of the other, with a whole-number answer.
  const { x, y } = retry(
    () => {
      const d1 = rng.pick([2, 3, 4, 5]);
      const m = rng.pick([2, 3, 4]);
      const d2 = d1 * m;
      const x = { n: rng.pick(lowNums(d1)), d: d1 };
      const y = { n: rng.pick(lowNums(d2)), d: d2 };
      return { x, y };
    },
    ({ x, y }) => (x.n * (y.d / x.d)) % y.n === 0 && d2ok(x, y),
    300,
  );
  const q = (x.n * (y.d / x.d)) / y.n;
  return {
    prompt: `Find $${fr(x.n, x.d)} ${D} ${fr(y.n, y.d)}$.`,
    parts: [numPart(q, { exact: false })],
    hints: [`Write $${fr(x.n, x.d)}$ with denominator $${y.d}$ so the pieces are the same size.`, 'Then divide the numerators.'],
    solution: [...commonDenSteps(x, y), `$${fr(x.n, x.d)} ${D} ${fr(y.n, y.d)} = ${q}$`],
  };
}
/** The answer must be at least 2 (dividing gives "how many groups"). */
function d2ok(x: Frac, y: Frac): boolean {
  return fval(x) / fval(y) >= 2;
}

function divD2(rng: Rng): Out {
  const kind = rng.pick(['frac', 'frac', 'wholeByFrac', 'fracByWhole'] as const);
  let x: Frac;
  let y: Frac;
  if (kind === 'wholeByFrac') {
    const d = rng.pick([3, 4, 5, 6, 8]);
    y = { n: rng.pick(lowNums(d).filter((v) => v > 1)), d };
    x = asFrac(retry(() => rng.int(2, 9), (w) => (w * d) % y.n !== 0));
  } else if (kind === 'fracByWhole') {
    const d = rng.pick([2, 3, 4, 5, 6, 8]);
    x = { n: rng.pick(lowNums(d)), d };
    y = asFrac(rng.int(2, 6));
  } else {
    ({ x, y } = retry(
      () => {
        const b = rng.pick([2, 3, 4, 5, 6, 8, 9, 10]);
        const d = rng.pick([2, 3, 4, 5, 6, 8, 9, 10]);
        return { x: { n: rng.pick(lowNums(b)), d: b }, y: { n: rng.pick(lowNums(d)), d } };
      },
      (o) => o.x.d !== o.y.d && o.y.n > 1 && frac(o.x.n * o.y.d, o.x.d * o.y.n).d !== 1 && frac(o.x.n * o.y.d, o.x.d * o.y.n).d <= 30,
      300,
    ));
  }
  const r: Frac = { n: x.n * y.d, d: x.d * y.n };
  const { part, ask } = answerFor(r);
  const expr = `${ftex(x)} ${D} ${ftex(y)}`;
  const xs = x.d === 1 ? [`Write the whole number as a fraction: $${x.n} = ${fr(x.n, 1)}$.`] : [];
  const ys = y.d === 1 ? [`Write the whole number as a fraction: $${y.n} = ${fr(y.n, 1)}$.`] : [];
  return {
    prompt: `Find $${expr}$.${ask}`,
    parts: [part],
    hints: [RECIP, `The reciprocal of $${ftex(y)}$ is $${fr(y.d, y.n)}$.`],
    solution: [...xs, ...ys, ...divideSteps(x, y), `$${expr} = ${mixedTex(r)}$`],
    answerDisplay: `$${mixedTex(r)}$`,
  };
}

function divD3(rng: Rng): Out {
  const { A, B } = retry(
    () => {
      const A = randMixed(rng, [2, 3, 4, 5, 6, 8], 5);
      const B = rng.chance(0.25) ? { w: 0, n: 0, d: 1 } : randMixed(rng, [2, 3, 4, 6], 2);
      return { A, B };
    },
    ({ A, B }) => {
      if (B.d === 1) return true;
      const x = improper(A);
      const y = improper(B);
      return fval(x) > fval(y) && x.n * y.d <= 300 && frac(x.n * y.d, x.d * y.n).d <= 24;
    },
  );
  let Bm = B;
  if (B.d === 1) {
    Bm = retry(
      () => { const d = rng.pick([2, 3, 4, 6, 8]); return { w: 0, n: rng.pick(lowNums(d)), d }; },
      (m) => { const r = frac(improper(A).n * m.d, A.d * m.n); return r.d > 1 && r.d <= 24; },
      100,
    );
  }
  const x = improper(A);
  const y = improper(Bm);
  const r: Frac = { n: x.n * y.d, d: x.d * y.n };
  const { part, ask } = answerFor(r);
  const expr = `${mtex(A)} ${D} ${mtex(Bm)}`;
  return {
    prompt: `Find $${expr}$.${ask}`,
    parts: [part],
    hints: ['Write each mixed number as an improper fraction first.', RECIP],
    solution: [
      `Write ${Bm.w > 0 ? 'each mixed number' : 'the mixed number'} as an improper fraction: $${mtex(A)} = ${fr(x.n, x.d)}$${Bm.w > 0 ? ` and $${mtex(Bm)} = ${fr(y.n, y.d)}$` : ''}.`,
      ...divideSteps(x, y),
      `$${expr} = ${mixedTex(r)}$`,
    ],
    answerDisplay: `$${mixedTex(r)}$`,
  };
}

const fractionDivide = skill({
  id: 'm8-fraction-divide',
  name: 'Dividing fractions',
  description: 'Divide fractions, whole numbers and mixed numbers using a common denominator or the reciprocal, and write quotients in lowest terms.',
  outcomes: ['N6'],
  lessonId: 'm8-4-2',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return divD1(rng);
    if (d === 2) return divD2(rng);
    return divD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 4.3 Solving fraction problems
// ---------------------------------------------------------------------------

const COMMON: Array<[number, number]> = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 8], [3, 8], [5, 8], [1, 6], [5, 6]];

function probD1(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['servings', 'part', 'pieces', 'ofWhole'] as const);
  if (kind === 'servings' || kind === 'pieces') {
    const ctxs = kind === 'servings'
      ? [
          { fs: [[1, 4], [1, 3], [1, 2], [2, 3], [3, 4]], s: (N: number, f: string) => `${name} made $${N}$ cups of trail mix for a hike. How many $${f}$-cup servings are there?`, u: 'servings' },
          { fs: [[1, 2], [2, 3], [3, 4]], s: (N: number, f: string) => `A pot holds $${N}$ cups of chili. How many $${f}$-cup bowls can ${name} fill?`, u: 'bowls' },
          { fs: [[1, 4], [1, 3], [1, 2], [3, 4]], s: (N: number, f: string) => `${name} has $${N}$ cups of dog food. The puppy eats $${f}$ cup at each meal. How many meals is that?`, u: 'meals' },
          { fs: [[1, 4], [1, 3], [1, 2], [3, 4], [1, 8], [3, 8]], s: (N: number, f: string) => `${name} has $${N}$ cups of sugar. A batch of cookies needs $${f}$ cup. How many batches can ${name} make?`, u: 'batches' },
        ]
      : [
          { fs: [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4]], s: (N: number, f: string) => `${name} cuts a $${N}\\ ${tx('m')}$ rope into pieces that are each $${f}\\ ${tx('m')}$ long for a camping trip. How many pieces are there?`, u: 'pieces' },
          { fs: [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5]], s: (N: number, f: string) => `A ribbon is $${N}\\ ${tx('m')}$ long. ${name} cuts it into $${f}\\ ${tx('m')}$ pieces to decorate the school gym. How many pieces are there?`, u: 'pieces' },
        ];
    const ctx = rng.pick(ctxs);
    const [a, b] = rng.pick(ctx.fs);
    const N = retry(() => rng.int(2, 9), (n) => (n * b) % a === 0 && (n * b) / a <= 40, 200);
    const q = (N * b) / a;
    const c = { s: ctx.s(N, fr(a, b)), u: ctx.u, what: ctx.u };
    return {
      prompt: c.s,
      parts: [numPart(q, { exact: false, suffix: c.u })],
      hints: [`How many $${fr(a, b)}$s fit into $${N}$? That is a division: $${N} ${D} ${fr(a, b)}$.`, RECIP],
      solution: [
        `Divide: $${N} ${D} ${fr(a, b)} = ${N} ${T} ${fr(b, a)}$.`,
        `$${fr(`${N} ${T} ${b}`, a)} = ${fr(N * b, a)} = ${q}$`,
        `There are $${q}$ ${c.what}.`,
      ],
    };
  }
  if (kind === 'part') {
    const [a, b] = rng.pick([[1, 2], [1, 3], [2, 3], [1, 4], [3, 4]] as Array<[number, number]>);
    const [c, d] = rng.pick(COMMON.filter(([, q]) => q <= 8 && q !== b));
    const r: Frac = { n: a * c, d: b * d };
    const { part, ask } = answerFor(r, 'cup');
    const ing = rng.pick(['sugar', 'oil', 'milk', 'brown sugar', 'cocoa', 'melted butter']);
    return {
      prompt: `A recipe uses $${fr(c, d)}$ cup of ${ing}. ${name} makes only $${fr(a, b)}$ of the recipe. How much ${ing} does ${name} need?${ask}`,
      parts: [part],
      hints: [`$${fr(a, b)}$ of $${fr(c, d)}$ means $${fr(a, b)} ${T} ${fr(c, d)}$.`, MUL_HINT],
      solution: [`$${fr(a, b)}$ of $${fr(c, d)}$ cup is $${fr(a, b)} ${T} ${fr(c, d)}$.`, ...multiplySteps({ n: a, d: b }, { n: c, d }), `${name} needs $${lowTex(r)}$ cup of ${ing}.`],
    };
  }
  // A fraction of a whole number of people or things.
  const [a, b] = rng.pick(COMMON.filter(([, q]) => q <= 6));
  const ctx = rng.pick([
    { lo: 20, hi: 32, s: (N: number) => `There are $${N}$ students in ${name}’s class. $${fr(a, b)}$ of them play hockey. How many students play hockey?`, u: 'students' },
    { lo: 12, hi: 30, s: (N: number) => `A soccer team has $${N}$ games this season. The team plays $${fr(a, b)}$ of them at home. How many home games is that?`, u: 'games' },
    { lo: 12, hi: 60, s: (N: number) => `${name} has $${N}$ hockey cards. ${name} gives $${fr(a, b)}$ of them to a friend. How many cards is that?`, u: 'cards' },
  ]);
  const N = b * rng.int(Math.ceil(ctx.lo / b), Math.floor(ctx.hi / b));
  const c = { s: ctx.s(N), u: ctx.u };
  return {
    prompt: c.s,
    parts: [numPart((a * N) / b, { exact: false, suffix: c.u })],
    hints: [`$${fr(a, b)}$ of $${N}$ means $${fr(a, b)} ${T} ${N}$.`, `Divide $${N}$ by $${b}$, then multiply by $${a}$.`],
    solution: [`$${fr(a, b)} ${T} ${N} = ${fr(`${a} ${T} ${N}`, b)} = ${fr(a * N, b)} = ${(a * N) / b}$`, `The answer is $${(a * N) / b}$ ${c.u}.`],
  };
}

function probD2(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['board', 'scale', 'area', 'speed'] as const);
  if (kind === 'board') {
    const { L, P, q } = retry(
      () => {
        const P = randMixed(rng, [2, 4, 8], 2);
        const q = rng.int(3, 8);
        const L = frac(improper(P).n * q, P.d);
        return { L, P, q };
      },
      (o) => o.L.d > 1 && fval(o.L) <= 16,
    );
    const Lm = { w: Math.floor(L.n / L.d), n: L.n % L.d, d: L.d };
    const p = improper(P);
    return {
      prompt: `${name} has a board that is $${mtex(Lm)}$ ft long. ${name} cuts it into pieces that are each $${mtex(P)}$ ft long to build a birdhouse. How many pieces are there? (Ignore the width of the saw cuts.)`,
      parts: [numPart(q, { exact: false, suffix: 'pieces' })],
      hints: [`How many $${mtex(P)}$s fit into $${mtex(Lm)}$? Divide.`, 'Write both mixed numbers as improper fractions, then multiply by the reciprocal.'],
      solution: [
        `Divide: $${mtex(Lm)} ${D} ${mtex(P)} = ${fr(L.n, L.d)} ${D} ${fr(p.n, p.d)}$.`,
        ...divideSteps(L, p).slice(0),
        `There are $${q}$ pieces.`,
      ],
    };
  }
  if (kind === 'scale') {
    const { A, B } = retry(
      () => ({ A: randMixed(rng, [2, 3, 4], 2), B: randMixed(rng, [2], 3) }),
      ({ A, B }) => frac(improper(A).n * improper(B).n, A.d * B.d).d > 1,
    );
    const r = frac(improper(A).n * improper(B).n, A.d * B.d);
    const ing = rng.pick(['flour', 'rolled oats', 'milk', 'water']);
    const { part, ask } = answerFor(r, 'cups');
    return {
      prompt: `One batch of ${rng.pick(['bannock', 'pancakes', 'granola', 'muffins'])} uses $${mtex(A)}$ cups of ${ing}. ${name} makes $${mtex(B)}$ batches for a school breakfast. How many cups of ${ing} are needed?${ask}`,
      parts: [part],
      hints: [`$${mtex(B)}$ batches of $${mtex(A)}$ cups means $${mtex(B)} ${T} ${mtex(A)}$.`, 'Write each mixed number as an improper fraction, then multiply.'],
      solution: [
        `Multiply: $${mtex(B)} ${T} ${mtex(A)} = ${fr(improper(B).n, B.d)} ${T} ${fr(improper(A).n, A.d)}$.`,
        ...multiplySteps(improper(B), improper(A)),
        `${name} needs $${mixedTex(r)}$ cups of ${ing}.`,
      ],
      answerDisplay: `$${mixedTex(r)}$ cups`,
    };
  }
  if (kind === 'area') {
    const { A, B } = retry(
      () => ({ A: randMixed(rng, [2, 3, 4], 5), B: randMixed(rng, [2, 4], 3) }),
      ({ A, B }) => frac(improper(A).n * improper(B).n, A.d * B.d).d > 1 && A.w + A.n / A.d > B.w + B.n / B.d,
    );
    const r = frac(improper(A).n * improper(B).n, A.d * B.d);
    const { part, ask } = answerFor(r, 'm²');
    return {
      prompt: `A rectangular vegetable garden at a school is $${mtex(A)}\\ ${tx('m')}$ long and $${mtex(B)}\\ ${tx('m')}$ wide. What is its area?${ask}`,
      parts: [part],
      hints: ['Area of a rectangle = length × width.', 'Write each mixed number as an improper fraction, then multiply.'],
      solution: [
        `$A = ${mtex(A)} ${T} ${mtex(B)} = ${fr(improper(A).n, A.d)} ${T} ${fr(improper(B).n, B.d)}$`,
        ...multiplySteps(improper(A), improper(B)),
        `The area is $${mixedTex(r)}\\ ${tx('m')}^2$.`,
      ],
      answerDisplay: `$${mixedTex(r)}\\ ${tx('m')}^2$`,
    };
  }
  // speed: distance in a fraction of an hour
  const { dist, t } = retry(
    () => ({ dist: rng.pick([{ n: 3, d: 4 }, { n: 1, d: 2 }, { n: 2, d: 3 }, { n: 5, d: 4 }, { n: 3, d: 2 }, { n: 7, d: 4 }]), t: rng.pick([{ n: 1, d: 6 }, { n: 1, d: 4 }, { n: 1, d: 3 }, { n: 1, d: 5 }, { n: 2, d: 5 }]) }),
    ({ dist, t }) => frac(dist.n * t.d, dist.d * t.n).d > 1,
  );
  const r = frac(dist.n * t.d, dist.d * t.n);
  const { part, ask } = answerFor(r, 'km/h');
  const mins = (60 * t.n) / t.d;
  const dm = { w: Math.floor(dist.n / dist.d), n: dist.n % dist.d, d: dist.d };
  return {
    prompt: `${name} walks $${mtex(dm)}\\ ${tx('km')}$ to school in $${fr(t.n, t.d)}$ of an hour ($${mins}$ minutes). At that rate, how many kilometres would ${name} walk in one hour?${ask}`,
    parts: [part],
    hints: ['Distance in one hour = distance ÷ time (in hours).', `Divide: $${mtex(dm)} ${D} ${fr(t.n, t.d)}$.`],
    solution: [
      `Speed = distance ÷ time: $${fr(dist.n, dist.d)} ${D} ${fr(t.n, t.d)}$.`,
      ...divideSteps(dist, t),
      `${name} would walk $${mixedTex(r)}\\ ${tx('km')}$ in one hour.`,
    ],
    answerDisplay: `$${mixedTex(r)}$ km/h`,
  };
}

function probD3(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['leftover', 'scoops', 'cookies', 'trail'] as const);
  if (kind === 'leftover') {
    const { L, P } = retry(
      () => ({ L: rng.int(6, 12), P: randMixed(rng, [2, 3, 4, 8], 2) }),
      ({ L, P }) => {
        const p = improper(P);
        return (L * p.d) % p.n !== 0 && (L * p.d) / p.n >= 3;
      },
    );
    const p = improper(P);
    const k = Math.floor((L * p.d) / p.n);
    const used = frac(k * p.n, p.d);
    const left = frac(L * p.d - k * p.n, p.d);
    const { part, ask } = answerFor(left, 'ft', '(b)');
    const q = frac(L * p.d, p.n);
    return {
      prompt: `${name} has ${L === 8 || L === 11 ? 'an' : 'a'} $${L}$ ft board for a shelf project. ${name} cuts as many pieces as possible that are each $${mtex(P)}$ ft long. (Ignore the width of the saw cuts.)\n\n(a) How many full pieces can ${name} cut?\n\n(b) How long is the leftover piece?${ask}`,
      parts: [numPart(k, { exact: false, suffix: 'pieces', label: '(a)' }), part],
      hints: [`Divide: $${L} ${D} ${mtex(P)}$. Only the whole-number part counts as full pieces.`, 'For the leftover, subtract the length of the full pieces from the board.'],
      solution: [
        `(a) $${L} ${D} ${mtex(P)} = ${fr(L, 1)} ${D} ${fr(p.n, p.d)} = ${fr(L, 1)} ${T} ${fr(p.d, p.n)} = ${fr(L * p.d, p.n)} = ${mixedTex(q)}$.`,
        `Only whole pieces count, so ${name} can cut $${k}$ full pieces.`,
        `(b) The full pieces use $${k} ${T} ${fr(p.n, p.d)} = ${fr(k * p.n, p.d)} = ${mixedTex(used)}$ ft.`,
        `Leftover: $${L} - ${mixedTex(used)} = ${mixedTex(left)}$ ft.`,
        `(a) $${k}$ pieces; (b) $${mixedTex(left)}$ ft.`,
      ],
    };
  }
  if (kind === 'scoops') {
    // Has F cups, uses a fraction of it, then fills s-cup scoops with the rest.
    const { F, f, s } = retry(
      () => {
        const F = randMixed(rng, [2, 3, 4], 5);
        const f = rng.pick([[1, 3], [2, 3], [1, 4], [3, 4], [1, 2], [2, 5]] as Array<[number, number]>);
        const s = rng.pick([[1, 4], [1, 3], [1, 2], [3, 4], [2, 3], [1, 8], [3, 8]] as Array<[number, number]>);
        return { F, f, s };
      },
      ({ F, f, s }) => {
        const Fi = improper(F);
        const rest = frac(Fi.n * (f[1] - f[0]), Fi.d * f[1]);
        const scoops = frac(rest.n * s[1], rest.d * s[0]);
        const used = frac(Fi.n * f[0], Fi.d * f[1]);
        return scoops.d === 1 && scoops.n >= 2 && scoops.n <= 30 && rest.d > 1 && used.d > 1;
      },
      500,
    );
    const Fi = improper(F);
    const used = frac(Fi.n * f[0], Fi.d * f[1]);
    const rest = frac(Fi.n * (f[1] - f[0]), Fi.d * f[1]);
    const scoops = frac(rest.n * s[1], rest.d * s[0]).n;
    const { part, ask } = answerFor(rest, 'cups', '(a)');
    return {
      prompt: `${name} has $${mtex(F)}$ cups of flour. ${name} uses $${fr(f[0], f[1])}$ of it to make bread.\n\n(a) How much flour is left?${ask}\n\n(b) ${name} puts the rest into containers that each hold $${fr(s[0], s[1])}$ cup. How many containers can ${name} fill?`,
      parts: [part, numPart(scoops, { exact: false, suffix: 'containers', label: '(b)' })],
      hints: [`If ${name} uses $${fr(f[0], f[1])}$ of the flour, then $${fr(f[1] - f[0], f[1])}$ of it is left. Multiply.`, `For (b), divide what is left by $${fr(s[0], s[1])}$.`],
      solution: [
        `$${mtex(F)} = ${fr(Fi.n, Fi.d)}$. ${name} uses $${fr(f[0], f[1])} ${T} ${fr(Fi.n, Fi.d)} = ${lowTex(used)}$ cups, so $${fr(f[1] - f[0], f[1])}$ of the flour is left.`,
        `(a) $${fr(f[1] - f[0], f[1])} ${T} ${fr(Fi.n, Fi.d)} = ${fr((f[1] - f[0]) * Fi.n, f[1] * Fi.d)} = ${mixedTex(rest)}$ cups.`,
        `(b) $${mixedTex(rest)} ${D} ${fr(s[0], s[1])} = ${fr(rest.n, rest.d)} ${T} ${fr(s[1], s[0])} = ${fr(rest.n * s[1], rest.d * s[0])} = ${scoops}$.`,
        `(a) $${mixedTex(rest)}$ cups; (b) $${scoops}$ containers.`,
      ],
    };
  }
  if (kind === 'cookies') {
    const { n1, A, n2 } = retry(
      () => ({ n1: rng.pick([12, 18, 24, 36]), A: randMixed(rng, [2, 3, 4], 3), n2: rng.pick([6, 8, 9, 10, 15, 16, 20, 30, 40, 48, 60]) }),
      ({ n1, A, n2 }) => n2 !== n1 && n2 % n1 !== 0 && n1 % n2 !== 0 && [2, 3, 4, 8].includes(frac(improper(A).n * n2, A.d * n1).d),
      300,
    );
    const a = improper(A);
    const k = frac(n2, n1);
    const r = frac(a.n * n2, a.d * n1);
    const { part, ask } = answerFor(r, 'cups');
    return {
      prompt: `A recipe for $${n1}$ cookies uses $${mtex(A)}$ cups of flour. ${name} wants to bake $${n2}$ cookies for a bake sale. How much flour is needed?${ask}`,
      parts: [part],
      hints: [`$${n2}$ cookies is $${fr(n2, n1)} = ${mixedTex(k)}$ times the recipe.`, `Multiply the flour by $${lowTex(k)}$.`],
      solution: [
        `Scale factor: $${fr(n2, n1)} = ${lowTex(k)}$, so ${name} makes $${mixedTex(k)}$ times the recipe.`,
        `Flour: $${mtex(A)} ${T} ${lowTex(k)} = ${fr(a.n, a.d)} ${T} ${lowTex(k)}$.`,
        ...multiplySteps(a, k),
        `${name} needs $${mixedTex(r)}$ cups of flour.`,
      ],
      answerDisplay: `$${mixedTex(r)}$ cups`,
    };
  }
  // trail: hikes a fraction of a trail, how much is left
  const { L, f } = retry(
    () => ({ L: randMixed(rng, [2, 3, 4, 5], 7), f: rng.pick([[1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5]] as Array<[number, number]>) }),
    ({ L, f }) => {
      const Li = improper(L);
      return frac(Li.n * f[0], Li.d * f[1]).d > 1 && frac(Li.n * (f[1] - f[0]), Li.d * f[1]).d > 1;
    },
    300,
  );
  const Li = improper(L);
  const done = frac(Li.n * f[0], Li.d * f[1]);
  const left = frac(Li.n * (f[1] - f[0]), Li.d * f[1]);
  const a1 = answerFor(done, 'km', '(a)');
  const a2 = answerFor(left, 'km', '(b)');
  const park = rng.pick(['Pinewood National Park', 'a mountain park', 'a badlands park', 'Clearwater Lakes Park', 'Maple Falls Park']);
  return {
    prompt: `A hiking trail in ${park} is $${mtex(L)}\\ ${tx('km')}$ long. ${name} hikes $${fr(f[0], f[1])}$ of the trail before lunch.\n\n(a) How far does ${name} hike before lunch?${a1.ask}\n\n(b) How far is left to the end of the trail?${a2.ask}`,
    parts: [a1.part, a2.part],
    hints: [`$${fr(f[0], f[1])}$ of $${mtex(L)}$ means $${fr(f[0], f[1])} ${T} ${mtex(L)}$.`, 'Subtract to find what is left, or multiply by the fraction that is left.'],
    solution: [
      `(a) $${fr(f[0], f[1])} ${T} ${mtex(L)} = ${fr(f[0], f[1])} ${T} ${fr(Li.n, Li.d)}$.`,
      ...multiplySteps({ n: f[0], d: f[1] }, Li),
      `${name} hikes $${mixedTex(done)}\\ ${tx('km')}$ before lunch.`,
      `(b) The fraction left is $1 - ${fr(f[0], f[1])} = ${fr(f[1] - f[0], f[1])}$, and $${fr(f[1] - f[0], f[1])} ${T} ${fr(Li.n, Li.d)} = ${fr((f[1] - f[0]) * Li.n, f[1] * Li.d)} = ${mixedTex(left)}$.`,
      `(a) $${mixedTex(done)}\\ ${tx('km')}$; (b) $${mixedTex(left)}\\ ${tx('km')}$.`,
    ],
  };
}

const fractionProblems = skill({
  id: 'm8-fraction-problems',
  name: 'Solving fraction problems',
  description: 'Solve problems that involve multiplying and dividing fractions and mixed numbers, such as scaling recipes, cutting boards and counting servings.',
  outcomes: ['N6'],
  lessonId: 'm8-4-3',
  calculator: false,
  gen(rng, d: Difficulty) {
    if (d === 1) return probD1(rng);
    if (d === 2) return probD2(rng);
    return probD3(rng);
  },
});

export const FRACTIONS_SKILLS: SkillDef[] = [fractionMultiply, fractionDivide, fractionProblems];
