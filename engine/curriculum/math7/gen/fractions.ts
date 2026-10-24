/** Math 7 Unit 3 — Adding and Subtracting Fractions (N5). Positive fractions and mixed numbers; every result is positive. */
import { fixedChoice, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { frac, gcd, lcm, type Frac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type Out = GenOutput;

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Harpreet', 'Noor', 'Thanh', 'Kateri', 'Diego', 'Ngozi', 'Leah', 'Ravi',
];
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury'];

const LOWEST = 'Write your answer in lowest terms.';
const MIXED = 'Write your answer as a mixed number in lowest terms.';

/** A fraction in LaTeX exactly as written (not simplified). */
const fr = (n: number | string, d: number | string) => `\\dfrac{${n}}{${d}}`;
/** A fraction as inline maths. */
const ff = (n: number, d: number) => `$${fr(n, d)}$`;

/** A mixed number: whole part w and fraction n/d (n may be 0 for a whole number, w may be 0 for a proper fraction). */
interface Mixed {
  w: number;
  n: number;
  d: number;
}
const mtex = (m: Mixed) => (m.n === 0 ? `${m.w}` : m.w === 0 ? fr(m.n, m.d) : `${m.w}${fr(m.n, m.d)}`);
const mm = (m: Mixed) => `$${mtex(m)}$`;
const mval = (m: Mixed) => m.w + m.n / m.d;
/** A positive fraction as a simplified mixed number. */
function toMixed(f: Frac): Mixed {
  const g = frac(f.n, f.d);
  const w = Math.floor(g.n / g.d);
  return { w, n: g.n - w * g.d, d: g.d };
}
const mixedOf = (f: Frac) => mtex(toMixed(f));
/** A simplified fraction: 3/4, 7/4 or 2. */
const frf = (f: Frac) => (f.d === 1 ? `${f.n}` : fr(f.n, f.d));
const isProper = (f: Frac) => f.n < f.d;

/** A fraction answer: 'lowest' accepts 7/4 or 1 3/4; 'mixed' wants 1 3/4 (or a proper fraction). */
function fracPart(f: Frac, mode: 'lowest' | 'mixed', suffix?: string): Part {
  return numPart(f.n / f.d, { exact: false, fraction: mode, suffix });
}

/** Proper numerators in lowest terms for a denominator. */
const lowNums = (d: number) => Array.from({ length: d - 1 }, (_, i) => i + 1).filter((n) => gcd(n, d) === 1);

/** "a", "a and b", "a, b and c". */
const andList = (xs: string[]) => (xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);

function multiples(d: number, upTo: number): string {
  const out: number[] = [];
  for (let k = d; k <= upTo; k += d) out.push(k);
  return out.join(', ');
}

/** Sentences that find the lowest common denominator of several denominators. */
function lcdSteps(dens: number[]): { L: number; steps: string[] } {
  const uniq = [...new Set(dens)].sort((a, b) => a - b);
  const L = uniq.reduce((m, x) => lcm(m, x), 1);
  if (uniq.length === 1) return { L, steps: [] };
  const big = uniq[uniq.length - 1];
  if (L === big) {
    const small = uniq.slice(0, -1).map((x) => `$${x}$`).join(' and ');
    return { L, steps: [`The denominators are different. $${big}$ is a multiple of ${small}, so use $${L}$ as the common denominator.`] };
  }
  return {
    L,
    steps: [`The denominators are different. List multiples until they match: ${uniq.map((x) => `multiples of $${x}$ are $${multiples(x, L)}$`).join('; ')}. The lowest common denominator is $${L}$.`],
  };
}

/** Rewrite n/d with denominator L, showing the multiplication. */
function convert(n: number, d: number, L: number): string {
  const k = L / d;
  return `$${fr(n, d)} = ${fr(`${n} \\times ${k}`, `${d} \\times ${k}`)} = ${fr(n * k, L)}$`;
}

function simplifyStep(n: number, d: number): string | null {
  const g = gcd(n, d);
  if (g <= 1 || n === 0) return null;
  return `Simplify: divide the top and the bottom by $${g}$. $${fr(n, d)} = ${fr(n / g, d / g)}$`;
}

/** Steps for a sum or difference of proper fractions written left to right. */
function fracSteps(terms: Array<[number, number]>, ops: Array<'+' | '-'>): { steps: string[]; result: Frac } {
  const { L, steps } = lcdSteps(terms.map((t) => t[1]));
  if (steps.length === 0) {
    const verb = ops.every((o) => o === '+') ? 'add' : ops.every((o) => o === '-') ? 'subtract' : 'add or subtract';
    steps.push(`The denominators are the same, so the pieces are the same size. ${verb.charAt(0).toUpperCase() + verb.slice(1)} the numerators and keep the denominator $${L}$.`);
  } else {
    const conv = terms.filter((t) => t[1] !== L).map((t) => convert(t[0], t[1], L));
    steps.push(`Rewrite ${conv.length === 1 ? 'the fraction' : 'each fraction'} with denominator $${L}$: ${andList(conv)}.`);
  }
  const nums = terms.map((t) => t[0] * (L / t[1]));
  let lhs = fr(nums[0], L);
  let top = `${nums[0]}`;
  let R = nums[0];
  ops.forEach((op, i) => {
    lhs += ` ${op} ${fr(nums[i + 1], L)}`;
    top += ` ${op} ${nums[i + 1]}`;
    R = op === '+' ? R + nums[i + 1] : R - nums[i + 1];
  });
  steps.push(`$${lhs} = ${fr(top, L)} = ${fr(R, L)}$`);
  const s = simplifyStep(R, L);
  if (s) steps.push(s);
  const result = frac(R, L);
  if (result.n > result.d) steps.push(`$${frf(result)}$ is more than $1$ whole. As a mixed number, $${frf(result)} = ${mixedOf(result)}$.`);
  return { steps, result };
}

/** The expression a/b ± c/d ± ... in LaTeX. */
function fracExpr(terms: Array<[number, number]>, ops: Array<'+' | '-'>): string {
  return terms.map((t, i) => (i === 0 ? '' : ` ${ops[i - 1]} `) + fr(t[0], t[1])).join('');
}

/** "3/4" or "7/4, or 1 3/4" for a final sentence. */
const bothForms = (f: Frac, unit = '') => (f.n > f.d ? `$${frf(f)}${unit}$, or $${mixedOf(f)}${unit}$` : `$${frf(f)}${unit}$`);
/** The last step of a fraction calculation: the result, and its mixed-number form when it is improper. */
function finalLine(expr: string, f: Frac, unit?: string): string {
  const u = unit ? `\\ \\text{${unit}}` : '';
  return unit ? `$${expr} = ${frf(f)}$, so the answer is ${bothForms(f, u)}.` : `So $${expr} = ${frf(f)}$${f.n > f.d ? `, which is $${mixedOf(f)}$` : ''}.`;
}

/** Steps for a ± b with mixed numbers (whole parts and fraction parts, with carrying and regrouping). */
function mixedSteps(a: Mixed, b: Mixed, op: '+' | '-'): { steps: string[]; result: Frac } {
  const da = a.n === 0 ? b.d : a.d;
  const db = b.n === 0 ? a.d : b.d;
  const L = lcm(da, db);
  const A = a.n * (L / da);
  const B = b.n * (L / db);
  const steps: string[] = [];
  if (a.n > 0 && b.n > 0 && a.d !== b.d) {
    const { steps: lcd } = lcdSteps([a.d, b.d]);
    steps.push(...lcd);
    const conv = [a, b].filter((m) => m.d !== L).map((m) => `$${mtex(m)} = ${mtex({ w: m.w, n: m.n * (L / m.d), d: L })}$`);
    steps.push(`Rewrite the fraction ${conv.length === 1 ? 'part' : 'parts'}: ${conv.join(' and ')}.`);
  }
  let W: number;
  let F: number;
  if (op === '+') {
    W = a.w + b.w;
    F = A + B;
    const wholes = a.w > 0 && b.w > 0 ? `Add the whole numbers: $${a.w} + ${b.w} = ${W}$.` : `The whole number part is $${W}$.`;
    steps.push(A === 0 || B === 0 ? `${wholes} The fraction part is $${fr(F, L)}$.` : `${wholes} Add the fractions: $${fr(A, L)} + ${fr(B, L)} = ${fr(F, L)}$.`);
    if (F >= L) {
      steps.push(
        F === L
          ? `$${fr(F, L)} = 1$ whole, so the total is $${W} + 1 = ${W + 1}$.`
          : `$${fr(F, L)}$ is more than $1$ whole: $${fr(F, L)} = ${mtex({ w: 1, n: F - L, d: L })}$. Carry the $1$: $${W} + ${mtex({ w: 1, n: F - L, d: L })} = ${mtex({ w: W + 1, n: F - L, d: L })}$.`,
      );
      W += 1;
      F -= L;
    }
  } else {
    let aw = a.w;
    let aA = A;
    if (A < B) {
      aw = a.w - 1;
      aA = A + L;
      steps.push(
        a.n === 0
          ? `There is no fraction to subtract from, so regroup $1$ whole as $${fr(L, L)}$: $${a.w} = ${mtex({ w: aw, n: aA, d: L })}$.`
          : `You cannot take $${fr(B, L)}$ away from $${fr(A, L)}$. Regroup $1$ whole as $${fr(L, L)}$: $${mtex({ w: a.w, n: A, d: L })} = ${mtex({ w: aw, n: aA, d: L })}$.`,
      );
    }
    W = aw - b.w;
    F = aA - B;
    const wholes = b.w > 0 ? `Subtract the whole numbers: $${aw} - ${b.w} = ${W}$.` : `The whole number part stays $${W}$.`;
    steps.push(`${wholes} Subtract the fractions: $${fr(aA, L)} - ${fr(B, L)} = ${fr(F, L)}$.`);
  }
  const g = gcd(F, L);
  if (F > 0 && g > 1) steps.push(`Simplify the fraction part: $${fr(F, L)} = ${fr(F / g, L / g)}$. That gives $${mtex({ w: W, n: F / g, d: L / g })}$.`);
  return { steps, result: frac(W * L + F, L) };
}

/** Fraction strips drawn on a blank canvas: each row is a bar cut into equal parts with the first `shaded` parts striped. */
function strips(rows: Array<{ parts: number; shaded: number }>, caption: string): Figure {
  const W = 120;
  const h = 16;
  const gap = 10;
  const H = rows.length * (h + gap) + gap;
  const polylines: Array<{ points: Array<[number, number]>; color?: 'brand' | 'accent' | 'muted' }> = [];
  const segments: Array<{ from: [number, number]; to: [number, number]; color?: 'brand' | 'accent' | 'muted' }> = [];
  rows.forEach((r, i) => {
    const y0 = H - gap - h - i * (h + gap);
    const cw = W / r.parts;
    for (let j = 1; j <= 5 && r.shaded > 0; j++) {
      const y = Math.round((y0 + (h * j) / 6) * 1000) / 1000;
      segments.push({ from: [0.8, y], to: [Math.round((r.shaded * cw - 0.8) * 1000) / 1000, y], color: 'accent' });
    }
    for (let k = 1; k < r.parts; k++) segments.push({ from: [k * cw, y0], to: [k * cw, y0 + h], color: 'brand' });
    polylines.push({ points: [[0, y0], [W, y0], [W, y0 + h], [0, y0 + h], [0, y0]] });
  });
  return { type: 'plane', grid: { xMin: -2, xMax: W + 2, yMin: 0, yMax: H, step: W + 4 }, polylines, segments, hideTickLabels: true, caption };
}

const pickName = (rng: Rng, not: string[] = []) => rng.pick(NAMES.filter((n) => !not.includes(n)));

// ---------------------------------------------------------------------------
// 3.1 Adding and subtracting fractions
// ---------------------------------------------------------------------------

const LIKE_DENS = [3, 4, 5, 6, 8, 10, 12];
/** Unlike denominators where one is a multiple of the other, or a small product. */
const EASY_PAIRS: Array<[number, number]> = [[2, 4], [2, 8], [4, 8], [3, 6], [2, 6], [3, 12], [4, 12], [6, 12], [5, 10], [2, 10], [2, 3], [3, 4], [2, 5], [3, 5], [4, 5]];
/** Unlike denominators whose lowest common denominator is less than their product. */
const LCD_PAIRS: Array<[number, number]> = [[4, 6], [6, 8], [4, 10], [6, 9], [8, 12], [9, 12], [10, 4], [6, 4], [8, 6]];

interface Story {
  text: string;
  unit?: string;
  ok: boolean;
}

function addSubD1(rng: Rng): Out {
  const d = rng.pick(LIKE_DENS);
  const op = rng.pick(['+', '+', '-'] as const);
  const [a, c] = retry(
    () => [rng.int(1, d - 1), rng.int(1, d - 1)],
    ([x, y]) => (op === '+' ? (x + y) % d !== 0 : x > y),
    200,
  );
  const [A, B] = [pickName(rng), pickName(rng)];
  const name2 = B === A ? pickName(rng, [A]) : B;
  const stories: Story[] =
    op === '+'
      ? [
          { text: `${A} ate ${ff(a, d)} of a pizza and ${name2} ate ${ff(c, d)} of the same pizza. What fraction of the pizza did they eat altogether?`, ok: a + c < d },
          { text: `${A} painted ${ff(a, d)} of a fence on Saturday and ${ff(c, d)} of the fence on Sunday. What fraction of the fence is painted?`, ok: a + c < d },
          { text: `${A} read for ${ff(a, d)} of an hour before supper and ${ff(c, d)} of an hour after supper. How many hours did ${A} read?`, unit: 'h', ok: [3, 4, 6, 12].includes(d) },
          { text: `Find $${fr(a, d)} + ${fr(c, d)}$.`, ok: true },
        ]
      : [
          { text: `A jug was ${ff(a, d)} full of juice. ${A} poured out ${ff(c, d)} of the jug. What fraction of the jug is full now?`, ok: true },
          { text: `${A} had ${ff(a, d)} of a bag of popcorn. ${A} ate ${ff(c, d)} of the bag during a movie. What fraction of the bag is left?`, ok: true },
          { text: `${A} skated ${ff(a, d)} km and ${name2} skated ${ff(c, d)} km. How much farther did ${A} skate?`, unit: 'km', ok: true },
          { text: `Find $${fr(a, d)} - ${fr(c, d)}$.`, ok: true },
        ];
  const story = rng.pick(stories.filter((s) => s.ok));
  const { steps, result } = fracSteps([[a, d], [c, d]], [op]);
  const showStrips = rng.chance(0.5);
  const figure = showStrips
    ? strips(
        [{ parts: d, shaded: a }, { parts: d, shaded: c }],
        `The top strip shows ${a}/${d}. The bottom strip shows ${c}/${d}.`,
      )
    : undefined;
  return {
    prompt: `${story.text}${showStrips ? ' The fraction strips show the two fractions.' : ''} ${LOWEST}`,
    figure,
    parts: [fracPart(result, 'lowest', story.unit)],
    hints: [
      'The denominators are the same, so the pieces are the same size.',
      `${op === '+' ? 'Add' : 'Subtract'} the numerators and keep the denominator $${d}$. Then simplify if you can.`,
    ],
    solution: [...steps, finalLine(`${fr(a, d)} ${op} ${fr(c, d)}`, result, story.unit)],
  };
}

/** Two proper fractions in lowest terms with the given denominators; a difference is always positive and no answer is a whole number. */
function twoFractions(rng: Rng, pairs: Array<[number, number]>, op: '+' | '-'): { a: number; b: number; c: number; e: number } {
  return retry(
    () => {
      const [p, q] = rng.pick(pairs);
      const [b, e] = rng.chance(0.5) ? [p, q] : [q, p];
      return { a: rng.pick(lowNums(b)), b, c: rng.pick(lowNums(e)), e };
    },
    ({ a, b, c, e }) => {
      const r = op === '+' ? frac(a * e + c * b, b * e) : frac(a * e - c * b, b * e);
      return r.n > 0 && r.d > 1;
    },
    200,
  );
}

function addSubD2(rng: Rng): Out {
  const op = rng.pick(['+', '-'] as const);
  const { a, b, c, e } = twoFractions(rng, EASY_PAIRS, op);
  const A = pickName(rng);
  const B = pickName(rng, [A]);
  const kitchen = [b, e].every((x) => [2, 3, 4, 8].includes(x));
  const hours = [b, e].every((x) => [2, 3, 4, 6, 12].includes(x));
  const stories: Story[] =
    op === '+'
      ? [
          { text: `A muffin recipe uses ${ff(a, b)} cup of milk and ${ff(c, e)} cup of oil. How many cups of liquid is that?`, unit: 'cups', ok: kitchen },
          { text: `${A} walked ${ff(a, b)} km to the bus stop and then ${ff(c, e)} km from the bus to the arena. How far did ${A} walk?`, unit: 'km', ok: true },
          { text: `${A} spent ${ff(a, b)} h on math homework and ${ff(c, e)} h on science. How many hours is that in all?`, unit: 'h', ok: hours },
          { text: `Find $${fr(a, b)} + ${fr(c, e)}$.`, ok: true },
          { text: `Find $${fr(a, b)} + ${fr(c, e)}$.`, ok: true },
        ]
      : [
          { text: `${A} had ${ff(a, b)} of a bottle of maple syrup. ${A} used ${ff(c, e)} of the bottle on pancakes. What fraction of the bottle is left?`, ok: true },
          { text: `${A} biked ${ff(a, b)} km. ${B} biked ${ff(c, e)} km. How much farther did ${A} bike?`, unit: 'km', ok: true },
          { text: `Find $${fr(a, b)} - ${fr(c, e)}$.`, ok: true },
          { text: `Find $${fr(a, b)} - ${fr(c, e)}$.`, ok: true },
        ];
  const story = rng.pick(stories.filter((s) => s.ok));
  const { steps, result } = fracSteps([[a, b], [c, e]], [op]);
  const L = lcm(b, e);
  return {
    prompt: `${story.text} ${LOWEST}`,
    parts: [fracPart(result, 'lowest', story.unit)],
    hints: ['You can only add or subtract fractions when the pieces are the same size, so find a common denominator first.', `Use $${L}$ as the common denominator. Change both fractions, then ${op === '+' ? 'add' : 'subtract'} the numerators.`],
    solution: [...steps, finalLine(`${fr(a, b)} ${op} ${fr(c, e)}`, result, story.unit)],
  };
}

function addSubD3(rng: Rng): Out {
  const kind = rng.pick(['lcd', 'three', 'missing'] as const);
  if (kind === 'lcd') {
    const op = rng.pick(['+', '-'] as const);
    const { a, b, c, e } = twoFractions(rng, LCD_PAIRS, op);
    const { steps, result } = fracSteps([[a, b], [c, e]], [op]);
    return {
      prompt: `Find $${fr(a, b)} ${op} ${fr(c, e)}$. ${LOWEST}`,
      parts: [fracPart(result, 'lowest')],
      hints: [`Multiplying the denominators gives $${b * e}$, but there is a smaller common denominator. List the multiples of $${b}$ and $${e}$.`, `The lowest common denominator is $${lcm(b, e)}$. Rewrite both fractions, ${op === '+' ? 'add' : 'subtract'}, then simplify if you can.`],
      solution: [...steps, finalLine(`${fr(a, b)} ${op} ${fr(c, e)}`, result)],
    };
  }
  if (kind === 'three') {
    const FAMS = [[2, 4, 8], [2, 3, 6], [3, 4, 12], [2, 5, 10], [2, 3, 4], [3, 6, 12], [4, 6, 12], [2, 4, 6]];
    const { terms, ops } = retry(
      () => {
        const dens = rng.shuffle(rng.pick(FAMS));
        const terms = dens.map((d) => [rng.pick(lowNums(d)), d] as [number, number]);
        const ops = [rng.pick(['+', '-'] as const), rng.pick(['+', '-'] as const)];
        return { terms, ops };
      },
      ({ terms, ops }) => {
        let v = frac(terms[0][0], terms[0][1]);
        for (let i = 0; i < 2; i++) {
          const t = frac(terms[i + 1][0], terms[i + 1][1]);
          v = ops[i] === '+' ? frac(v.n * t.d + t.n * v.d, v.d * t.d) : frac(v.n * t.d - t.n * v.d, v.d * t.d);
          if (v.n <= 0) return false;
        }
        return v.d > 1 && ops.includes('-');
      },
      300,
    );
    const { steps, result } = fracSteps(terms, ops);
    const L = terms.reduce((m, t) => lcm(m, t[1]), 1);
    return {
      prompt: `Find $${fracExpr(terms, ops)}$. ${LOWEST}`,
      parts: [fracPart(result, 'lowest')],
      hints: ['Find one common denominator that works for all three fractions.', `Use $${L}$. Rewrite each fraction, then work from left to right.`],
      solution: [...steps, finalLine(fracExpr(terms, ops), result)],
    };
  }
  // Missing number: a/b + ? = p/q, or p/q - ? = a/b
  const { a, b, c, e } = twoFractions(rng, [...EASY_PAIRS, ...LCD_PAIRS], '-');
  // c/e is known, a/b is the total; the missing number is a/b - c/e.
  const addForm = rng.chance(0.5);
  const box = '\\square';
  const eq = addForm ? `${fr(c, e)} + ${box} = ${fr(a, b)}` : `${fr(a, b)} - ${box} = ${fr(c, e)}`;
  const { steps, result } = fracSteps([[a, b], [c, e]], ['-']);
  return {
    prompt: `What fraction goes in the box?\n\n$$${eq}$$\n\n${LOWEST}`,
    parts: [fracPart(result, 'lowest', undefined)],
    hints: [
      addForm ? `Think: what do you add to $${fr(c, e)}$ to get $${fr(a, b)}$? Subtract to find it.` : `Think: what do you take away from $${fr(a, b)}$ to leave $${fr(c, e)}$? Subtract to find it.`,
      `Find $${fr(a, b)} - ${fr(c, e)}$ with a common denominator of $${lcm(b, e)}$.`,
    ],
    solution: [
      addForm ? `The missing number is the difference between the total and the part you know: $${fr(a, b)} - ${fr(c, e)}$.` : `The missing number is how much was taken away: $${fr(a, b)} - ${fr(c, e)}$.`,
      ...steps,
      `Check: $${addForm ? `${fr(c, e)} + ${frf(result)} = ${frf(frac(a, b))}` : `${fr(a, b)} - ${frf(result)} = ${frf(frac(c, e))}`}$. It works.`,
      `The missing fraction is $${frf(result)}$.`,
    ],
  };
}

const fractionAddSub = skill({
  id: 'm7-fraction-add-sub',
  name: 'Adding and subtracting fractions',
  description: 'Add and subtract positive fractions with like and unlike denominators, using a common denominator, and write the answer in lowest terms.',
  outcomes: ['N5'],
  lessonId: 'm7-3-1',
  calculator: false,
  gen(rng, d) {
    return d === 1 ? addSubD1(rng) : d === 2 ? addSubD2(rng) : addSubD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 3.2 Adding and subtracting mixed numbers
// ---------------------------------------------------------------------------

function mixedD1(rng: Rng): Out {
  const d = rng.pick(LIKE_DENS);
  const op = rng.pick(['+', '-'] as const);
  const [n1, n2] = retry(
    () => [rng.int(1, d - 1), rng.int(1, d - 1)],
    ([x, y]) => (op === '+' ? x + y < d : x > y),
    200,
  );
  const w2 = rng.int(1, 6);
  const w1 = op === '+' ? rng.int(1, 7) : rng.int(w2 + 1, 9);
  const a: Mixed = { w: w1, n: n1, d };
  const b: Mixed = { w: w2, n: n2, d };
  const { steps, result } = mixedSteps(a, b, op);
  return {
    prompt: `Find $${mtex(a)} ${op} ${mtex(b)}$. ${MIXED}`,
    parts: [fracPart(result, 'mixed')],
    hints: ['Work with the whole numbers and the fractions separately.', `The denominators are the same, so ${op === '+' ? 'add' : 'subtract'} the numerators. Then ${op === '+' ? 'add' : 'subtract'} the whole numbers.`],
    solution: [...steps, `So $${mtex(a)} ${op} ${mtex(b)} = ${mixedOf(result)}$.`],
  };
}

/** Two mixed numbers with denominators from the pairs; a difference is positive and (when asked) needs regrouping. */
function twoMixed(rng: Rng, pairs: Array<[number, number]>, op: '+' | '-', regroup: boolean | null): { a: Mixed; b: Mixed } {
  return retry(
    () => {
      const [p, q] = rng.pick(pairs);
      const [da, db] = rng.chance(0.5) ? [p, q] : [q, p];
      const wb = rng.int(1, 6);
      const wa = op === '+' ? rng.int(1, 8) : rng.int(wb + 1, 10);
      return { a: { w: wa, n: rng.pick(lowNums(da)), d: da }, b: { w: wb, n: rng.pick(lowNums(db)), d: db } };
    },
    ({ a, b }) => {
      const fa = a.n / a.d;
      const fb = b.n / b.d;
      if (Math.abs(fa - fb) < 1e-9) return false;
      if (op === '+') return Math.abs(fa + fb - 1) > 1e-9 && (regroup === null || regroup === fa + fb > 1);
      return regroup === null || regroup === fa < fb;
    },
    300,
  );
}

function mixedD2(rng: Rng): Out {
  const op = rng.pick(['+', '-'] as const);
  const regroup = rng.chance(0.6);
  const { a, b } = twoMixed(rng, EASY_PAIRS, op, regroup);
  const { steps, result } = mixedSteps(a, b, op);
  const A = pickName(rng);
  const story = rng.pick(
    op === '+'
      ? [
          { text: `Find $${mtex(a)} + ${mtex(b)}$.`, unit: undefined },
          { text: `Find $${mtex(a)} + ${mtex(b)}$.`, unit: undefined },
          { text: `${A} biked ${mm(a)} km on Saturday and ${mm(b)} km on Sunday. How far did ${A} bike in all?`, unit: 'km' },
        ]
      : [
          { text: `Find $${mtex(a)} - ${mtex(b)}$.`, unit: undefined },
          { text: `Find $${mtex(a)} - ${mtex(b)}$.`, unit: undefined },
          { text: `A roll of ribbon has ${mm(a)} m on it. ${A} cuts off ${mm(b)} m to wrap gifts. How much ribbon is left?`, unit: 'm' },
        ],
  );
  const unit = story.unit ? `\\ \\text{${story.unit}}` : '';
  return {
    prompt: `${story.text} ${MIXED}`,
    parts: [fracPart(result, 'mixed', story.unit)],
    hints: [
      `Give the fraction parts a common denominator of $${lcm(a.d, b.d)}$ first.`,
      op === '+' ? 'Add the whole numbers and add the fractions. If the fractions add to more than $1$, carry $1$ whole.' : 'If the first fraction is smaller than the second, regroup $1$ whole from the whole number before you subtract.',
    ],
    solution: [...steps, `So $${mtex(a)} ${op} ${mtex(b)} = ${mixedOf(result)}$.${story.unit ? ` The answer is $${mixedOf(result)}${unit}$.` : ''}`],
  };
}

function mixedD3(rng: Rng): Out {
  const kind = rng.pick(['regroup', 'whole', 'three'] as const);
  if (kind === 'regroup') {
    const { a, b } = twoMixed(rng, LCD_PAIRS, '-', true);
    const { steps, result } = mixedSteps(a, b, '-');
    return {
      prompt: `Find $${mtex(a)} - ${mtex(b)}$. ${MIXED}`,
      parts: [fracPart(result, 'mixed')],
      hints: [`Find the lowest common denominator of $${a.d}$ and $${b.d}$ by listing multiples.`, 'After you rewrite the fractions, the first fraction is too small. Regroup $1$ whole, then subtract.'],
      solution: [...steps, `So $${mtex(a)} - ${mtex(b)} = ${mixedOf(result)}$.`],
    };
  }
  if (kind === 'whole') {
    const d = rng.pick([3, 4, 5, 6, 8, 10, 12]);
    const b: Mixed = { w: rng.int(1, 6), n: rng.pick(lowNums(d)), d };
    const a: Mixed = { w: rng.int(b.w + 1, 10), n: 0, d };
    const { steps, result } = mixedSteps(a, b, '-');
    return {
      prompt: `Find $${a.w} - ${mtex(b)}$. ${MIXED}`,
      parts: [fracPart(result, 'mixed')],
      hints: [`$${a.w}$ has no fraction part. Write it as a mixed number with denominator $${d}$.`, `Regroup: $${a.w} = ${mtex({ w: a.w - 1, n: d, d })}$. Then subtract the whole numbers and the fractions.`],
      solution: [...steps, `So $${a.w} - ${mtex(b)} = ${mixedOf(result)}$.`],
    };
  }
  // a + b - c
  const { a, b, c } = retry(
    () => {
      const fam = rng.pick([[2, 4, 8], [2, 3, 6], [3, 4, 12], [2, 5, 10], [4, 6, 12], [3, 6, 12]]);
      const ds = rng.shuffle(fam);
      return {
        a: { w: rng.int(1, 6), n: rng.pick(lowNums(ds[0])), d: ds[0] },
        b: { w: rng.int(1, 6), n: rng.pick(lowNums(ds[1])), d: ds[1] },
        c: { w: rng.int(1, 6), n: rng.pick(lowNums(ds[2])), d: ds[2] },
      };
    },
    ({ a, b, c }) => {
      const r = mval(a) + mval(b) - mval(c);
      return r > 1 && Math.abs(r - Math.round(r)) > 1e-9;
    },
    300,
  );
  const s1 = mixedSteps(a, b, '+');
  const sum = toMixed(s1.result);
  const s2 = mixedSteps(sum, c, '-');
  const expr = `${mtex(a)} + ${mtex(b)} - ${mtex(c)}`;
  return {
    prompt: `Find $${expr}$. ${MIXED}`,
    parts: [fracPart(s2.result, 'mixed')],
    hints: ['Work from left to right: add the first two mixed numbers, then subtract the third.', 'Use a common denominator each time. Carry or regroup $1$ whole when you need to.'],
    solution: [
      `First add: $${mtex(a)} + ${mtex(b)}$.`,
      ...s1.steps,
      `So far: $${mtex(sum)}$. Now subtract: $${mtex(sum)} - ${mtex(c)}$.`,
      ...s2.steps,
      `So $${expr} = ${mixedOf(s2.result)}$.`,
    ],
  };
}

const mixedAddSub = skill({
  id: 'm7-mixed-add-sub',
  name: 'Adding and subtracting mixed numbers',
  description: 'Add and subtract mixed numbers with like and unlike denominators, carrying and regrouping a whole when needed.',
  outcomes: ['N5'],
  lessonId: 'm7-3-2',
  calculator: false,
  gen(rng, d) {
    return d === 1 ? mixedD1(rng) : d === 2 ? mixedD2(rng) : mixedD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 3.3 Solving fraction problems
// ---------------------------------------------------------------------------

/** A proper fraction a/b. */
type P = [number, number];

function properPair(rng: Rng, pairs: Array<[number, number]>, ok: (x: P, y: P) => boolean): [P, P] {
  return retry(
    () => {
      const [p, q] = rng.pick(pairs);
      const [b, e] = rng.chance(0.5) ? [p, q] : [q, p];
      return [[rng.pick(lowNums(b)), b], [rng.pick(lowNums(e)), e]] as [P, P];
    },
    // Distinct fractions whose sum is not a whole number (a difference of two proper fractions never is).
    ([x, y]) => x[0] * y[1] !== y[0] * x[1] && (x[0] * y[1] + y[0] * x[1]) % (x[1] * y[1]) !== 0 && ok(x, y),
    300,
  );
}

const PIZZA_PAIRS: Array<[number, number]> = [[8, 4], [8, 2], [12, 3], [12, 4], [12, 6], [6, 3], [6, 2], [8, 8], [12, 12], [10, 5], [10, 2]];
const HOUR_PAIRS: Array<[number, number]> = [[2, 4], [4, 4], [3, 6], [2, 3], [3, 4], [4, 6], [2, 6], [3, 12], [4, 12], [6, 12]];
const KM_PAIRS: Array<[number, number]> = [[2, 4], [4, 8], [2, 8], [5, 10], [2, 5], [4, 5], [2, 10], [3, 4]];
const CUP_PAIRS: Array<[number, number]> = [[2, 4], [4, 8], [3, 4], [2, 3], [2, 8], [3, 3], [4, 4]];
const GARDEN_PAIRS: Array<[number, number]> = [[2, 4], [3, 6], [4, 8], [2, 8], [3, 4], [2, 5], [5, 10], [4, 6], [3, 12], [2, 6]];

interface Problem {
  prompt: string;
  steps: string[];
  result: Frac;
  unit?: string;
  hints: string[];
  /** Final sentence, given the answer as LaTeX. */
  say: (ans: string) => string;
}

function problemD1(rng: Rng): Problem {
  const A = pickName(rng);
  const B = pickName(rng, [A]);
  const kind = rng.pick(['pizza', 'pizzaLeft', 'garden', 'homework', 'walk', 'farther', 'recipe'] as const);
  const sumHints = (L: number) => ['The question asks for a total, so add.', `Use a common denominator of $${L}$, then add the numerators.`];
  const diffHints = (L: number, what: string) => [`The question asks ${what}, so subtract.`, `Use a common denominator of $${L}$, then subtract the numerators.`];
  if (kind === 'pizza') {
    const [x, y] = properPair(rng, PIZZA_PAIRS, (p, q) => p[0] / p[1] + q[0] / q[1] < 1);
    const s = fracSteps([x, y], ['+']);
    return {
      prompt: `${A} and ${B} share a pizza. ${A} eats ${ff(...x)} of the pizza and ${B} eats ${ff(...y)} of it. What fraction of the pizza do they eat altogether?`,
      steps: [`Add the two parts: $${fracExpr([x, y], ['+'])}$.`, ...s.steps], result: s.result,
      hints: sumHints(lcm(x[1], y[1])),
      say: (ans) => `They eat $${ans}$ of the pizza.`,
    };
  }
  if (kind === 'pizzaLeft') {
    const [x, y] = properPair(rng, PIZZA_PAIRS, (p, q) => p[0] / p[1] > q[0] / q[1]);
    const s = fracSteps([x, y], ['-']);
    return {
      prompt: `After a birthday party, ${ff(...x)} of a pizza was left over. The next day, ${A} ate ${ff(...y)} of a whole pizza for lunch. What fraction of a pizza is left now?`,
      steps: [`Take away the part ${A} ate: $${fracExpr([x, y], ['-'])}$.`, ...s.steps], result: s.result,
      hints: diffHints(lcm(x[1], y[1]), 'what is left'),
      say: (ans) => `$${ans}$ of a pizza is left.`,
    };
  }
  if (kind === 'garden') {
    const veg = rng.sample(['carrots', 'beans', 'peas', 'lettuce', 'potatoes', 'tomatoes', 'squash'], 2);
    const [x, y] = properPair(rng, GARDEN_PAIRS, (p, q) => p[0] / p[1] + q[0] / q[1] < 1);
    const s = fracSteps([x, y], ['+']);
    return {
      prompt: `${A}’s family has a garden plot at a community garden in ${rng.pick(TOWNS)}. They plant ${ff(...x)} of the plot with ${veg[0]} and ${ff(...y)} of the plot with ${veg[1]}. What fraction of the plot is planted?`,
      steps: [`Add the two parts: $${fracExpr([x, y], ['+'])}$.`, ...s.steps], result: s.result,
      hints: sumHints(lcm(x[1], y[1])),
      say: (ans) => `$${ans}$ of the plot is planted.`,
    };
  }
  if (kind === 'homework') {
    const [x, y] = properPair(rng, HOUR_PAIRS, () => true);
    const subj = rng.sample(['math', 'science', 'reading', 'French', 'social studies'], 2);
    const s = fracSteps([x, y], ['+']);
    return {
      prompt: `${A} spends ${ff(...x)} h on ${subj[0]} homework and ${ff(...y)} h on ${subj[1]} homework. How many hours does ${A} spend on homework in all?`,
      unit: 'h',
      steps: [`Add the two times: $${fracExpr([x, y], ['+'])}$.`, ...s.steps], result: s.result,
      hints: sumHints(lcm(x[1], y[1])),
      say: (ans) => `${A} spends $${ans}$ h on homework.`,
    };
  }
  if (kind === 'walk') {
    const [x, y] = properPair(rng, KM_PAIRS, () => true);
    const place = rng.pick(['the arena', 'the library', 'the pool', 'the skate park', 'a friend’s house']);
    const s = fracSteps([x, y], ['+']);
    return {
      prompt: `${A} walks ${ff(...x)} km to the bus stop. Then ${A} walks ${ff(...y)} km from the bus to ${place}. How far does ${A} walk in all?`,
      unit: 'km',
      steps: [`Add the two distances: $${fracExpr([x, y], ['+'])}$.`, ...s.steps], result: s.result,
      hints: sumHints(lcm(x[1], y[1])),
      say: (ans) => `${A} walks $${ans}$ km.`,
    };
  }
  if (kind === 'farther') {
    const [x, y] = properPair(rng, KM_PAIRS, (p, q) => p[0] / p[1] > q[0] / q[1]);
    const s = fracSteps([x, y], ['-']);
    return {
      prompt: `At track practice, ${A} jogged ${ff(...x)} km and ${B} jogged ${ff(...y)} km. How much farther did ${A} jog than ${B}?`,
      unit: 'km',
      steps: [`“How much farther” means find the difference: $${fracExpr([x, y], ['-'])}$.`, ...s.steps], result: s.result,
      hints: diffHints(lcm(x[1], y[1]), 'how much farther'),
      say: (ans) => `${A} jogged $${ans}$ km farther.`,
    };
  }
  const [x, y] = properPair(rng, CUP_PAIRS, () => true);
  const liq = rng.sample(['milk', 'water', 'oil', 'orange juice'], 2);
  const s = fracSteps([x, y], ['+']);
  return {
    prompt: `A pancake recipe uses ${ff(...x)} cup of ${liq[0]} and ${ff(...y)} cup of ${liq[1]}. How many cups of liquid does the recipe use?`,
    unit: 'cups',
    steps: [`Add the two amounts: $${fracExpr([x, y], ['+'])}$.`, ...s.steps], result: s.result,
    hints: sumHints(lcm(x[1], y[1])),
    say: (ans) => `The recipe uses $${ans}$ cups of liquid.`,
  };
}

/** Two mixed numbers with whole parts in [lo, hi]; for a difference the first is larger. */
function mixedPair(rng: Rng, pairs: Array<[number, number]>, lo: number, hi: number, op: '+' | '-'): [Mixed, Mixed] {
  return retry(
    () => {
      const [p, q] = rng.pick(pairs);
      const [da, db] = rng.chance(0.5) ? [p, q] : [q, p];
      return [
        { w: rng.int(lo, hi), n: rng.pick(lowNums(da)), d: da },
        { w: rng.int(lo, hi), n: rng.pick(lowNums(db)), d: db },
      ] as [Mixed, Mixed];
    },
    ([a, b]) => {
      const r = op === '+' ? mval(a) + mval(b) : mval(a) - mval(b);
      return r > 0.2 && Math.abs(r - Math.round(r)) > 1e-9 && a.n * b.d !== b.n * a.d;
    },
    300,
  );
}

function problemD2(rng: Rng): Problem {
  const A = pickName(rng);
  const kind = rng.pick(['flour', 'trail', 'practice', 'drive', 'ribbon', 'puppies', 'pizzas'] as const);
  const mix = (op: '+' | '-', a: Mixed, b: Mixed, lead: string) => {
    const s = mixedSteps(a, b, op);
    return { steps: [`${lead} $${mtex(a)} ${op} ${mtex(b)}$.`, ...s.steps], result: s.result };
  };
  const addHints = ['Add to find a total. Work with the whole numbers and the fractions separately.', 'Use a common denominator for the fractions. If they add to more than $1$, carry $1$ whole.'];
  const subHints = ['Subtract to find what is left or how much more. Work with the whole numbers and the fractions separately.', 'Use a common denominator. If the first fraction is too small, regroup $1$ whole.'];
  if (kind === 'flour') {
    const [a, b] = mixedPair(rng, CUP_PAIRS, 1, 3, '+');
    const r = mix('+', a, b, 'Add the two amounts:');
    return { ...r, unit: 'cups', hints: addHints, prompt: `A bread recipe uses ${mm(a)} cups of white flour and ${mm(b)} cups of whole wheat flour. How many cups of flour does the recipe use in all?`, say: (ans) => `The recipe uses $${ans}$ cups of flour.` };
  }
  if (kind === 'trail') {
    const [a, b] = mixedPair(rng, KM_PAIRS, 1, 7, '-');
    const r = mix('-', a, b, 'Find what is left:');
    return { ...r, unit: 'km', hints: subHints, prompt: `A mountain hiking trail is ${mm(a)} km long. ${A}’s family has hiked ${mm(b)} km of it. How much farther is it to the end of the trail?`, say: (ans) => `It is $${ans}$ km to the end of the trail.` };
  }
  if (kind === 'practice') {
    const [a, b] = mixedPair(rng, HOUR_PAIRS, 1, 3, '+');
    const inst = rng.pick(['guitar', 'piano', 'violin', 'drums']);
    const r = mix('+', a, b, 'Add the two times:');
    return { ...r, unit: 'h', hints: addHints, prompt: `${A} practised ${inst} for ${mm(a)} h on Saturday and ${mm(b)} h on Sunday. How many hours did ${A} practise in all?`, say: (ans) => `${A} practised for $${ans}$ h.` };
  }
  if (kind === 'drive') {
    const [a, b] = mixedPair(rng, HOUR_PAIRS, 1, 4, '+');
    const [t1, t2] = rng.sample(TOWNS, 2);
    const r = mix('+', a, b, 'Add the two driving times:');
    return { ...r, unit: 'h', hints: addHints, prompt: `On a road trip from ${t1} to ${t2} and beyond, ${A}’s family drove for ${mm(a)} h before lunch and ${mm(b)} h after lunch. How long did they drive in all?`, say: (ans) => `They drove for $${ans}$ h.` };
  }
  if (kind === 'ribbon') {
    const [a, b] = mixedPair(rng, KM_PAIRS, 1, 6, '-');
    const r = mix('-', a, b, 'Find what is left:');
    return { ...r, unit: 'm', hints: subHints, prompt: `${A} has ${mm(a)} m of rope for a camping trip. ${A} uses ${mm(b)} m to tie up a tarp. How much rope is left?`, say: (ans) => `${A} has $${ans}$ m of rope left.` };
  }
  if (kind === 'puppies') {
    const [a, b] = mixedPair(rng, [[2, 4], [4, 8], [2, 8], [3, 4], [5, 10], [2, 5]], 2, 9, '-');
    const [p1, p2] = rng.sample(['Biscuit', 'Maple', 'Scout', 'Juno', 'Pepper', 'Moose', 'Nala'], 2);
    const r = mix('-', a, b, '“How much heavier” means find the difference:');
    return { ...r, unit: 'kg', hints: subHints, prompt: `${A} has two puppies. ${p1} has a mass of ${mm(a)} kg and ${p2} has a mass of ${mm(b)} kg. How much heavier is ${p1} than ${p2}?`, say: (ans) => `${p1} is $${ans}$ kg heavier.` };
  }
  const [a, b] = mixedPair(rng, PIZZA_PAIRS.filter(([p, q]) => p <= 12 && q <= 12), 1, 3, '+');
  const r = mix('+', a, b, 'Add the two amounts:');
  return { ...r, unit: 'pizzas', hints: addHints, prompt: `After a hockey game, the players ate ${mm(a)} pizzas and the parents ate ${mm(b)} pizzas. How many pizzas did they eat in all?`, say: (ans) => `They ate $${ans}$ pizzas.` };
}

function problemD3(rng: Rng): Out {
  const A = pickName(rng);
  const B = pickName(rng, [A]);
  const kind = rng.pick(['garden', 'flour', 'time', 'triathlon', 'compare', 'party'] as const);
  if (kind === 'garden') {
    const [x, y] = properPair(rng, GARDEN_PAIRS, (p, q) => p[0] / p[1] + q[0] / q[1] < 1);
    const veg = rng.sample(['carrots', 'beans', 'peas', 'lettuce', 'potatoes', 'corn'], 2);
    const s1 = fracSteps([x, y], ['+']);
    const used = s1.result;
    const left = frac(used.d - used.n, used.d);
    return {
      prompt: `${A} is planning a garden. ${A} uses ${ff(...x)} of the garden for ${veg[0]} and ${ff(...y)} of it for ${veg[1]}. The rest of the garden is for flowers. What fraction of the garden is for flowers? ${LOWEST}`,
      parts: [fracPart(left, 'lowest')],
      hints: ['First find the fraction of the garden used for vegetables.', `The whole garden is $1 = ${fr(used.d, used.d)}$. Subtract the vegetable part from $1$.`],
      solution: [
        `Step 1: Add the vegetable parts: $${fracExpr([x, y], ['+'])}$.`,
        ...s1.steps,
        `Step 2: The whole garden is $1$. Write $1$ as $${fr(used.d, used.d)}$ and subtract: $${fr(used.d, used.d)} - ${fr(used.n, used.d)} = ${fr(used.d - used.n, used.d)}$.`,
        ...(simplifyStep(used.d - used.n, used.d) ? [simplifyStep(used.d - used.n, used.d)!] : []),
        `$${frf(left)}$ of the garden is for flowers.`,
      ],
    };
  }
  if (kind === 'flour' || kind === 'time' || kind === 'party') {
    const c =
      kind === 'flour'
        ? { pairs: CUP_PAIRS, total: rng.int(5, 8), lo: 1, hi: 2, unit: 'cups' }
        : kind === 'time'
          ? { pairs: HOUR_PAIRS, total: rng.int(4, 6), lo: 1, hi: 2, unit: 'h' }
          : { pairs: PIZZA_PAIRS.filter(([p, q]) => p <= 8 && q <= 8), total: rng.int(4, 6), lo: 1, hi: 2, unit: 'pizzas' };
    const [a, b] = retry(
      () => mixedPair(rng, c.pairs, c.lo, c.hi, '+'),
      ([p, q]) => {
        const left = c.total - mval(p) - mval(q);
        return left > 0.3 && Math.abs(left - Math.round(left)) > 1e-9;
      },
      200,
    );
    const s1 = mixedSteps(a, b, '+');
    const used = toMixed(s1.result);
    const s2 = mixedSteps({ w: c.total, n: 0, d: used.d }, used, '-');
    const left = s2.result;
    const mode = isProper(left) ? 'lowest' : 'mixed';
    const text =
      kind === 'flour'
        ? `${A} has $${c.total}$ cups of flour. A batch of cookies needs ${mm(a)} cups and a batch of pancakes needs ${mm(b)} cups. How much flour will be left after ${A} makes both?`
        : kind === 'time'
          ? `${A} has $${c.total}$ h of free time on Saturday. Soccer practice takes ${mm(a)} h and chores take ${mm(b)} h. How much free time is left?`
          : `${A}’s class ordered $${c.total}$ pizzas for a party. The students ate ${mm(a)} pizzas and the teachers ate ${mm(b)} pizzas. How much pizza is left?`;
    return {
      prompt: `${text} ${mode === 'mixed' ? MIXED : LOWEST}`,
      parts: [fracPart(left, mode, c.unit)],
      hints: ['First add the two amounts that are used.', `Then subtract the total used from $${c.total}$. Regroup $1$ whole from $${c.total}$ so you can subtract the fraction.`],
      solution: [
        `Step 1: Add the amounts used: $${mtex(a)} + ${mtex(b)}$.`,
        ...s1.steps,
        `Step 2: Subtract from the total: $${c.total} - ${mtex(used)}$.`,
        ...s2.steps,
        kind === 'flour'
          ? `${A} will have $${mixedOf(left)}$ ${isProper(left) ? 'cup' : 'cups'} of flour left.`
          : kind === 'time'
            ? `${A} has $${mixedOf(left)}$ h of free time left.`
            : `There ${isProper(left) ? 'is' : 'are'} $${mixedOf(left)}$ ${isProper(left) ? 'of a pizza' : 'pizzas'} left.`,
      ],
    };
  }
  if (kind === 'triathlon') {
    const swim: P = rng.pick([[1, 2], [3, 4], [1, 4], [2, 5], [3, 5], [7, 10], [3, 10]] as P[]);
    const [bike, run] = retry(
      () => mixedPair(rng, KM_PAIRS, 2, 9, '+').sort((p, q) => mval(q) - mval(p)),
      ([p, q]) => {
        const part = swim[0] / swim[1] + mval(p);
        const tot = part + mval(q);
        return Math.abs(tot - Math.round(tot)) > 1e-9 && Math.abs(part - Math.round(part)) > 1e-9 && lcm(lcm(swim[1], p.d), q.d) <= 20;
      },
      200,
    );
    const s1 = mixedSteps({ w: 0, n: swim[0], d: swim[1] }, bike, '+');
    const part1 = toMixed(s1.result);
    const s2 = mixedSteps(part1, run, '+');
    return {
      prompt: `${A} is training for a youth triathlon. In one workout, ${A} swims ${ff(...swim)} km, bikes ${mm(bike)} km and runs ${mm(run)} km. What is the total distance? ${MIXED}`,
      parts: [fracPart(s2.result, 'mixed', 'km')],
      hints: ['Add the three distances. Add two of them first, then add the third.', 'Use a common denominator each time, and carry $1$ whole if the fractions add to more than $1$.'],
      solution: [
        `Step 1: Swim + bike: $${fr(...swim)} + ${mtex(bike)}$.`,
        ...s1.steps,
        `Step 2: Add the run: $${mtex(part1)} + ${mtex(run)}$.`,
        ...s2.steps,
        `The total distance is $${mixedOf(s2.result)}$ km.`,
      ],
    };
  }
  // compare: A rides twice, B rides once
  const [m1, m2] = mixedPair(rng, KM_PAIRS, 1, 4, '+');
  const s1 = mixedSteps(m1, m2, '+');
  const tot = toMixed(s1.result);
  const other = retry(
    () => {
      const d = tot.d === 1 ? rng.pick([2, 4, 8]) : rng.pick([tot.d, tot.d, 2, 4, 8]);
      return { w: tot.w + rng.int(-2, 2), n: rng.pick(lowNums(d)), d } as Mixed;
    },
    (o) => o.w >= 1 && Math.abs(mval(o) - mval(tot)) > 0.2 && Math.abs(mval(o) - mval(tot) - Math.round(mval(o) - mval(tot))) > 1e-9,
    200,
  );
  const aWins = mval(tot) > mval(other);
  const s2 = aWins ? mixedSteps(tot, other, '-') : mixedSteps(other, tot, '-');
  return {
    prompt: `${A} biked ${mm(m1)} km on Monday and ${mm(m2)} km on Tuesday. ${B} biked ${mm(other)} km in one long ride. Who biked farther in all, and by how much? Write the difference as ${isProper(s2.result) ? 'a fraction' : 'a mixed number'} in lowest terms.`,
    parts: [
      { label: 'Who biked farther?', answer: fixedChoice([A, B], aWins ? 0 : 1) },
      { ...fracPart(s2.result, isProper(s2.result) ? 'lowest' : 'mixed', 'km'), label: 'By how much?' },
    ],
    hints: [`First add ${A}’s two rides.`, `Compare ${A}’s total with ${B}’s ride, then subtract the smaller distance from the larger one.`],
    solution: [
      `Step 1: ${A}’s total: $${mtex(m1)} + ${mtex(m2)}$.`,
      ...s1.steps,
      `Step 2: Compare: ${A} biked $${mtex(tot)}$ km and ${B} biked $${mtex(other)}$ km. ${aWins ? A : B} biked farther.`,
      `Step 3: Subtract: $${aWins ? `${mtex(tot)} - ${mtex(other)}` : `${mtex(other)} - ${mtex(tot)}`}$.`,
      ...s2.steps,
      `${aWins ? A : B} biked $${mixedOf(s2.result)}$ km farther.`,
    ],
  };
}

const fractionProblems = skill({
  id: 'm7-fraction-problems',
  name: 'Solving fraction problems',
  description: 'Solve everyday problems about recipes, distances, time, pizza and garden plots by adding and subtracting fractions and mixed numbers.',
  outcomes: ['N5'],
  lessonId: 'm7-3-3',
  calculator: false,
  gen(rng, d) {
    if (d === 3) return problemD3(rng);
    const p = d === 1 ? problemD1(rng) : problemD2(rng);
    const mode: 'lowest' | 'mixed' = d === 1 || isProper(p.result) ? 'lowest' : 'mixed';
    const unit = p.unit ? `\\ \\text{${p.unit}}` : '';
    const ans = d === 1 ? frf(p.result) : mixedOf(p.result);
    return {
      prompt: `${p.prompt} ${mode === 'lowest' ? LOWEST : MIXED}`,
      parts: [fracPart(p.result, mode, p.unit)],
      hints: p.hints,
      solution: [...p.steps, d === 1 && p.result.n > p.result.d ? `${p.say(frf(p.result))} That is $${mixedOf(p.result)}${unit}$.` : p.say(ans)],
    };
  },
});

export const FRACTIONS_SKILLS: SkillDef[] = [fractionAddSub, mixedAddSub, fractionProblems];
