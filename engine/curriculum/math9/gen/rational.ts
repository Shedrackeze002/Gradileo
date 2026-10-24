/** Math 9 Unit 3 — Rational Numbers (N3, N4). */
import { fixedChoice, mc, numPart, retry, roundingPhrase, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, frac, fracAdd, fracDiv, fracMul, fracSub, fracValue, lcm, roundTo, type Frac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Choice, Difficulty, Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type Out = GenOutput;

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Harpreet', 'Noor', 'Thanh', 'Kateri', 'Diego', 'Ngozi', 'Mathieu', 'Leila',
];
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater', 'Northfield', 'Elmwood'];

const T = '\\times';
const DV = '\\div';
/** Remove floating-point noise from an exact decimal result. */
const clean = (x: number) => roundTo(x, 9);
/** A decimal inside maths. */
const dx = (x: number) => fmt(clean(x), 4);
/** A decimal after an operator: negatives in brackets. */
const dop = (x: number) => (x < 0 ? `(${dx(x)})` : dx(x));
/** A fraction (or integer) in LaTeX with the sign in front: -\frac{3}{4}. */
const fx = (f: Frac) => (f.d === 1 ? `${f.n}` : `${f.n < 0 ? '-' : ''}\\frac{${Math.abs(f.n)}}{${f.d}}`);
/** A fraction written as a mixed number when it is bigger than 1 in size: -2\frac{1}{6}. */
function mx(f: Frac): string {
  const a = Math.abs(f.n);
  if (f.d === 1 || a < f.d) return fx(f);
  const w = Math.floor(a / f.d);
  const r = a - w * f.d;
  return `${f.n < 0 ? '-' : ''}${w}${r ? `\\frac{${r}}{${f.d}}` : ''}`;
}
/** An operand after an operator: negatives in brackets. */
const op = (f: Frac, mixed = false) => {
  const t = mixed ? mx(f) : fx(f);
  return f.n < 0 ? `\\left(${t}\\right)` : t;
};
/** Plain text for a fraction (number-line labels). */
const ftxt = (f: Frac) => (f.d === 1 ? `${f.n}` : `${f.n}/${f.d}`);
const isWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;

/** An exact decimal answer (review screens show it as a decimal). */
const decPart = (v: number, suffix?: string, label?: string): Part => numPart(clean(v), { exact: false, display: 'decimal', suffix, label });
/** A fraction answer in lowest terms ('lowest') or as a mixed number ('mixed'). */
const fracPart = (f: Frac, mode: 'lowest' | 'mixed' = 'lowest', suffix?: string): Part => numPart(fracValue(f), { exact: false, fraction: mode, suffix });
/** Money to the nearest cent. */
const moneyPart = (v: number, label = '\\$'): Part => numPart(clean(v), { decimals: 2, tolerance: 0.011, label });
/** Money in prose: \$12.50 or −\$12.50 (never inside $...$). */
const money = (x: number) => (x < 0 ? `−\\$${fmtFixed(-x, 2)}` : `\\$${fmtFixed(x, 2)}`);
/** Money inside maths, without a dollar sign. */
const mv = (x: number) => fmtFixed(x, 2);
const deg = (t: number) => `$${dx(t)}^\\circ\\text{C}$`;
const FRACTION_FORM = 'Write your answer as a fraction in lowest terms.';
const MIXED_FORM = 'Write your answer as a mixed number or a fraction in lowest terms.';

/** Decimal expansion of a fraction in LaTeX, with bar notation for a repeating part: -1.08\overline{3}. */
function decTex(f: Frac): string {
  const neg = f.n < 0;
  let r = Math.abs(f.n);
  const whole = Math.floor(r / f.d);
  r -= whole * f.d;
  if (r === 0) return `${neg ? '-' : ''}${whole}`;
  const digits: number[] = [];
  const seen = new Map<number, number>();
  while (r !== 0 && !seen.has(r) && digits.length < 12) {
    seen.set(r, digits.length);
    r *= 10;
    digits.push(Math.floor(r / f.d));
    r %= f.d;
  }
  let body: string;
  if (r === 0) body = digits.join('');
  else {
    const start = seen.get(r) ?? digits.length;
    body = `${digits.slice(0, start).join('')}\\overline{${digits.slice(start).join('')}}`;
  }
  return `${neg ? '-' : ''}${whole}.${body}`;
}

/** Fractions with small denominators in a value range (lowest terms, not whole numbers). */
function fracPool(dens: number[], lo: number, hi: number): Frac[] {
  const out: Frac[] = [];
  for (const d of dens) {
    for (let n = Math.ceil(lo * d); n <= Math.floor(hi * d); n++) {
      const f = frac(n, d);
      if (f.d === d) out.push(f);
    }
  }
  return out;
}

/** A rational number as it is shown to a student: fraction, mixed number or decimal. */
interface Shown {
  f: Frac;
  v: number;
  tex: string;
  dec: string;
}

function show(f: Frac, form: 'fraction' | 'decimal' | 'auto'): Shown {
  const v = fracValue(f);
  const dec = decTex(f);
  const terminating = !dec.includes('overline');
  const tex = form === 'decimal' && (terminating || f.d % 3 === 0) ? dec : Math.abs(v) > 1 ? mx(f) : fx(f);
  return { f, v, tex, dec };
}

/** "As decimals: ..." listing only the numbers that are not already decimals. */
function asDecimals(list: Shown[]): string {
  const conv = list.filter((x) => x.tex !== x.dec);
  if (conv.length === 0) return '';
  return `Write ${conv.length === list.length ? (list.length === 2 ? 'both' : 'each') : conv.length === 1 ? 'the fraction' : 'the fractions'} as ${conv.length === 1 ? 'a decimal' : 'decimals'}: ${conv.map((x) => `$${x.tex} = ${x.dec}$`).join(', ')}.`;
}

/** A short decimal strictly between lo and hi (fewest decimal places, nearest the middle). */
function niceBetween(lo: Frac, hi: Frac): number {
  const a = fracValue(lo);
  const b = fracValue(hi);
  for (let dp = 1; dp <= 4; dp++) {
    const f = 10 ** dp;
    const k0 = Math.floor(a * f + 1e-9) + 1;
    const k1 = Math.ceil(b * f - 1e-9) - 1;
    if (k0 <= k1) {
      const mid = (a + b) / 2;
      let best = k0;
      for (let k = k0; k <= k1; k++) if (Math.abs(k / f - mid) < Math.abs(best / f - mid)) best = k;
      return clean(best / f);
    }
  }
  return (a + b) / 2;
}

const COMPARE_HINT = 'On a number line, numbers increase from left to right. A negative number with a greater size is farther left, so it is less.';
const DEC_HINT = 'Write every number as a decimal so they are easy to compare.';

// ---------------------------------------------------------------------------
// 3.1 Comparing and ordering rational numbers
// ---------------------------------------------------------------------------

function symbolCompare(rng: Rng): Out {
  const kind = rng.pick(['decimals', 'fracDec', 'sameDen', 'equal', 'opposites'] as const);
  let a: Shown;
  let b: Shown;
  if (kind === 'decimals') {
    const x = -rng.int(11, 49) / 10;
    const y = -(Math.floor(-x) + rng.int(1, 9) / 100);
    const pair = rng.shuffle([x, y]);
    a = show(frac(Math.round(pair[0] * 100), 100), 'decimal');
    b = show(frac(Math.round(pair[1] * 100), 100), 'decimal');
  } else if (kind === 'fracDec') {
    const f = rng.pick(fracPool([2, 4, 5, 8, 10], -2, -0.1));
    const off = rng.pick([-0.05, -0.1, 0.05, 0.1, -0.15, 0.15]);
    const g = frac(Math.round((fracValue(f) + off) * 100), 100);
    const pair = rng.shuffle([show(f, 'fraction'), show(g, 'decimal')]);
    [a, b] = pair;
  } else if (kind === 'sameDen') {
    const d = rng.pick([3, 4, 5, 7, 8, 9]);
    const [n1, n2] = rng.sample([1, 2, 3, 4, 5, 6, 7, 8].filter((n) => n < d * 2 && frac(n, d).d === d), 2);
    a = show(frac(-n1, d), 'fraction');
    b = show(frac(-n2, d), 'fraction');
  } else if (kind === 'equal') {
    const f = rng.pick(fracPool([2, 4, 5, 8], -3, -0.1));
    const pair = rng.shuffle([show(f, 'fraction'), show(f, 'decimal')]);
    [a, b] = pair;
  } else {
    const f = rng.pick(fracPool([2, 3, 4, 5, 8], 0.1, 3));
    const pair = rng.shuffle([show(f, 'auto'), show(frac(-f.n, f.d), rng.chance(0.5) ? 'decimal' : 'auto')]);
    [a, b] = pair;
  }
  const idx = a.v < b.v - 1e-12 ? 0 : a.v > b.v + 1e-12 ? 1 : 2;
  const sym = ['<', '>', '='][idx];
  const steps: string[] = [];
  if (a.tex !== a.dec || b.tex !== b.dec) steps.push(asDecimals([a, b]));
  if (idx === 2) steps.push('The decimals are the same, so the numbers are equal.');
  else {
    const [lo, hi] = idx === 0 ? [a, b] : [b, a];
    steps.push(lo.v < 0 && hi.v < 0 ? `Both are negative. $${lo.dec}$ is farther from $0$, so it is farther left on a number line and is less.` : `$${lo.dec}$ is to the left of $${hi.dec}$ on a number line, so it is less.`);
  }
  steps.push(`$${a.tex} ${sym} ${b.tex}$`);
  return {
    prompt: `Which symbol makes this statement true?\n\n$$${a.tex} \\;\\square\\; ${b.tex}$$`,
    parts: [{ answer: fixedChoice(['$<$', '$>$', '$=$'], idx) }],
    hints: [COMPARE_HINT, DEC_HINT],
    solution: steps,
  };
}

function numberLineLetter(rng: Rng): Out {
  const quarters = [-7, -6, -5, -3, -2, -1, 1, 2, 3, 5, 6, 7].map((k) => frac(k, 4));
  const target = rng.pick(quarters.filter((f) => f.n < 0));
  const opposite = frac(-target.n, target.d);
  const others = rng.sample(quarters.filter((f) => f.n !== target.n && f.n !== opposite.n && Math.abs(f.n - target.n) !== 0), 2);
  const vals = rng.shuffle([target, opposite, ...others]).sort((x, y) => fracValue(x) - fracValue(y));
  const letters = ['A', 'B', 'C', 'D'];
  const figure: Figure = { type: 'numberLine', min: -2, max: 2, step: 0.25, points: vals.map((f, i) => ({ value: fracValue(f), label: letters[i] })) };
  const asDecimal = rng.chance(0.5);
  const tTex = asDecimal ? decTex(target) : mx(target);
  const ti = vals.indexOf(target);
  return {
    prompt: `Which point on the number line shows $${tTex}$? Each small space is $\\frac{1}{4}$, or $0.25$.`,
    figure,
    parts: [{ answer: fixedChoice(letters, ti) }],
    hints: ['Negative numbers are to the left of $0$.', `Count quarters to the left of $0$: $${tTex}$ is $${Math.abs(target.n)}$ quarter${Math.abs(target.n) === 1 ? '' : 's'} left of $0$.`],
    solution: [
      `$${tTex}$ is negative, so it is to the left of $0$.`,
      `$${tTex} = ${fx(target)}$, which is $${Math.abs(target.n)}$ spaces of $\\frac{1}{4}$ to the left of $0$${Math.abs(target.n) > 4 ? `, past $-1$` : ''}.`,
      `Point ${letters[vals.indexOf(opposite)]} is at $${mx(opposite)}$, the opposite, on the other side of $0$.`,
      `Point ${letters[ti]} shows $${tTex}$.`,
    ],
  };
}

/** Distinct values, at least `gap` apart. */
function spreadPick(rng: Rng, pool: Frac[], n: number, gap: number, ok: (fs: Frac[]) => boolean = () => true): Frac[] {
  return retry(
    () => rng.sample(pool, n),
    (fs) => fs.every((x, i) => fs.every((y, j) => i === j || Math.abs(fracValue(x) - fracValue(y)) >= gap)) && ok(fs),
    300,
  );
}

const IDS = 'abcdef';

function orderQuestion(rng: Rng, d: Difficulty): Out {
  const count = d === 2 ? 4 : 5;
  const pool = fracPool(d === 2 ? [2, 4, 5, 10, 3] : [3, 4, 5, 6, 8, 10], -3, d === 2 ? 2 : 1);
  const fs = spreadPick(rng, pool, count, d === 2 ? 0.1 : 0.04, (xs) => {
    const negs = xs.filter((x) => x.n < 0).length;
    return negs >= (d === 2 ? 2 : 3) && negs < xs.length && (d === 2 || xs.some((x) => x.d % 3 === 0));
  });
  const shownList = fs.map((f, i) => show(f, i % 2 === 0 ? 'decimal' : 'fraction'));
  const ascending = rng.chance(0.6);
  const sorted = [...shownList].sort((x, y) => (ascending ? x.v - y.v : y.v - x.v));
  const display = retry(() => rng.shuffle(shownList), (s) => s.some((x, i) => x !== sorted[i]) && s.some((x, i) => x !== sorted[sorted.length - 1 - i]));
  const items: Choice[] = display.map((s, i) => ({ id: IDS[i], md: `$${s.tex}$` }));
  const idOf = (s: Shown) => items[display.indexOf(s)].id;
  const word = ascending ? 'least to greatest' : 'greatest to least';
  return {
    prompt: `Order these numbers from **${word}**.`,
    parts: [{ answer: { kind: 'order', items, correctOrder: sorted.map(idOf) } }],
    hints: [DEC_HINT, COMPARE_HINT],
    solution: [
      asDecimals(display),
      'Negative numbers are less than positive numbers. Among the negatives, the one farthest from $0$ is the least.',
      `From ${word}: $${sorted.map((s) => s.tex).join(ascending ? ',\\ ' : ',\\ ')}$`,
    ],
  };
}

/** Two close negative rational numbers a < b. */
function closePair(rng: Rng): [Frac, Frac] {
  const pool = fracPool([2, 3, 4, 5, 6, 8, 10, 20], -3, -0.05);
  return retry(
    () => {
      const [x, y] = rng.sample(pool, 2);
      return (fracValue(x) < fracValue(y) ? [x, y] : [y, x]) as [Frac, Frac];
    },
    ([x, y]) => {
      const g = fracValue(y) - fracValue(x);
      return g >= 0.02 && g <= 0.25 && x.d !== y.d;
    },
    500,
  );
}

function betweenChoice(rng: Rng): Out {
  const [lo, hi] = closePair(rng);
  const nice = niceBetween(lo, hi);
  const a = show(lo, rng.chance(0.5) ? 'fraction' : 'decimal');
  const b = show(hi, a.tex === a.dec ? 'fraction' : 'decimal');
  const gap = fracValue(hi) - fracValue(lo);
  const step = Math.max(0.05, roundTo(gap, 2));
  const below = roundTo(fracValue(lo) - step, 3);
  const above = roundTo(fracValue(hi) + step, 3);
  const ds = [`$${dx(-nice)}$`, `$${dx(below)}$`, `$${dx(above)}$`];
  const [x, y] = rng.chance(0.5) ? [a, b] : [b, a];
  return {
    prompt: `Which number is between $${x.tex}$ and $${y.tex}$?`,
    parts: [{ answer: mc(rng, `$${dx(nice)}$`, ds) }],
    hints: [DEC_HINT, 'Sketch a number line with both numbers. The number you want is between them.'],
    solution: [
      ...(asDecimals([a, b]) ? [asDecimals([a, b])] : []),
      `$${a.dec} < ${b.dec}$, so you need a number greater than $${a.dec}$ and less than $${b.dec}$.`,
      `$${dx(nice)}$ is between them: $${a.dec} < ${dx(nice)} < ${b.dec}$.`,
      `The answer is $${dx(nice)}$.`,
    ],
  };
}

function betweenFree(rng: Rng): Out {
  const [lo, hi] = closePair(rng);
  const mid = frac(lo.n * hi.d + hi.n * lo.d, 2 * lo.d * hi.d);
  const nice = niceBetween(lo, hi);
  const a = show(lo, rng.chance(0.5) ? 'fraction' : 'decimal');
  const b = show(hi, a.tex === a.dec ? 'fraction' : 'decimal');
  const half = (fracValue(hi) - fracValue(lo)) / 2;
  const first = rng.chance(0.5);
  const pair = first ? `$${a.tex}$ and $${b.tex}$` : `$${b.tex}$ and $${a.tex}$`;
  return {
    prompt: `Write a rational number that is between ${pair}. You may write it as a decimal or a fraction.`,
    // Any value strictly between the two numbers is accepted: the centre with a tolerance of half the gap.
    parts: [{ label: 'A number between them:', answer: { kind: 'numeric', value: fracValue(mid), tolerance: half - 1e-9, allowExpression: false, exact: dx(nice), display: 'decimal' } }],
    hints: [DEC_HINT, 'Write both numbers as decimals with the same number of decimal places, such as $-0.60$ and $-0.70$, and find a decimal in between.'],
    solution: [
      ...(asDecimals([a, b]) ? [asDecimals([a, b])] : []),
      `On a number line, $${a.dec}$ is to the left of $${b.dec}$, so any number greater than $${a.dec}$ and less than $${b.dec}$ works.`,
      `For example, $${a.dec} < ${dx(nice)} < ${b.dec}$.`,
      `One answer is $${dx(nice)}$. There are many others.`,
    ],
    answerDisplay: `Any number between $${a.tex}$ and $${b.tex}$, such as $${dx(nice)}$`,
  };
}

function trueStatement(rng: Rng): Out {
  const used = new Set<string>();
  const make = (truth: boolean) => {
    const [lo, hi] = retry(() => closePair(rng), ([x, y]) => !used.has(ftxt(x)) && !used.has(ftxt(y)));
    used.add(ftxt(lo));
    used.add(ftxt(hi));
    const sl = show(lo, rng.chance(0.5) ? 'fraction' : 'decimal');
    const sh = show(hi, sl.tex === sl.dec ? 'fraction' : 'decimal');
    const flip = rng.chance(0.5);
    // true: lo < hi or hi > lo; false: lo > hi or hi < lo
    const tex = truth ? (flip ? `${sl.tex} < ${sh.tex}` : `${sh.tex} > ${sl.tex}`) : flip ? `${sl.tex} > ${sh.tex}` : `${sh.tex} < ${sl.tex}`;
    const eqd = (x: Shown) => (x.tex === x.dec ? `$${x.tex}$` : `$${x.tex} = ${x.dec}$`);
    return { md: `$${tex}$`, why: `${eqd(sl)} and ${eqd(sh)}, so $${sl.tex} < ${sh.tex}$. The statement $${tex}$ is ${truth ? 'true' : 'false'}.` };
  };
  const right = make(true);
  const wrongs = [make(false), make(false), make(false)];
  return {
    prompt: 'Which statement is true?',
    parts: [{ answer: mc(rng, right.md, wrongs.map((w) => w.md)) }],
    hints: [DEC_HINT, COMPARE_HINT],
    solution: [...rng.shuffle([right, ...wrongs]).map((s) => s.why), `The true statement is ${right.md}.`],
  };
}

function oppositeOf(rng: Rng): Out {
  const f = rng.pick(fracPool([2, 3, 4, 5, 8], -3, 3).filter((x) => x.n !== 0));
  const asDec = rng.chance(0.4) && !decTex(f).includes('overline');
  const tex = asDec ? decTex(f) : mx(f);
  const o = frac(-f.n, f.d);
  return {
    prompt: `What is the opposite of $${tex}$? ${asDec ? 'Write your answer as a decimal.' : 'Write it as a fraction or mixed number in lowest terms.'}`,
    parts: [asDec ? decPart(fracValue(o)) : fracPart(o, 'lowest')],
    hints: ['Opposites are the same distance from $0$ on a number line, on opposite sides.', 'Change the sign.'],
    solution: [`$${tex}$ is $${asDec ? dx(Math.abs(fracValue(f))) : mx(frac(Math.abs(f.n), f.d))}$ units from $0$, on the ${f.n < 0 ? 'left' : 'right'}.`, `Its opposite is the same distance on the ${f.n < 0 ? 'right' : 'left'}.`, `The opposite of $${tex}$ is $${asDec ? dx(fracValue(o)) : mx(o)}$.`],
  };
}

const rationalCompare = skill({
  id: 'm9-rational-compare',
  name: 'Comparing and ordering rational numbers',
  description: 'Compare and order positive and negative rational numbers written as fractions, mixed numbers and decimals, and find a rational number between two others.',
  outcomes: ['N3'],
  lessonId: 'm9-3-1',
  format: 'mc',
  calculator: false,
  gen(rng, d: Difficulty) {
    if (d === 1) {
      const kind = rng.weighted([['symbol', 4], ['line', 3], ['opposite', 2]] as const);
      if (kind === 'symbol') return symbolCompare(rng);
      if (kind === 'line') return numberLineLetter(rng);
      return oppositeOf(rng);
    }
    if (d === 2) return rng.chance(0.6) ? orderQuestion(rng, 2) : betweenChoice(rng);
    const kind = rng.weighted([['between', 4], ['order', 3], ['true', 3]] as const);
    if (kind === 'between') return betweenFree(rng);
    if (kind === 'order') return orderQuestion(rng, 3);
    return trueStatement(rng);
  },
});

// ---------------------------------------------------------------------------
// Fraction arithmetic steps
// ---------------------------------------------------------------------------

/** Steps for a ± b with fractions (a, b may be mixed numbers). */
function addSubSteps(a: Frac, b: Frac, sub: boolean, mixed: boolean): { steps: string[]; result: Frac } {
  const steps: string[] = [];
  const A = a;
  const B = sub ? frac(-b.n, b.d) : b;
  const expr = `${mixed ? mx(a) : fx(a)} ${sub ? '-' : '+'} ${op(b, mixed)}`;
  if (mixed && (Math.abs(a.n) > a.d || Math.abs(b.n) > b.d)) steps.push(`Write the mixed numbers as improper fractions: $${expr} = ${fx(a)} ${sub ? '-' : '+'} ${op(b)}$`);
  if (sub) steps.push(`Subtracting is the same as adding the opposite: $${fx(a)} - ${op(b)} = ${fx(A)} + ${op(B)}$`);
  const L = lcm(A.d, B.d);
  const an = A.n * (L / A.d);
  const bn = B.n * (L / B.d);
  const tf = (n: number) => `${n < 0 ? '-' : ''}\\frac{${Math.abs(n)}}{${L}}`;
  const tfo = (n: number) => (n < 0 ? `\\left(${tf(n)}\\right)` : tf(n));
  if (A.d !== L || B.d !== L) steps.push(`Use the common denominator $${L}$: $${fx(A)} + ${op(B)} = ${tf(an)} + ${tfo(bn)}$`);
  const result = frac(an + bn, L);
  steps.push(`Add the numerators: $${an} + ${bn < 0 ? `(${bn})` : bn} = ${an + bn}$, so the sum is $${tf(an + bn)}${result.d !== L ? ` = ${fx(result)}` : ''}$.`);
  return { steps, result };
}

/** Steps for a × b or a ÷ b with fractions. */
function mulDivSteps(a: Frac, b: Frac, div: boolean, mixed: boolean): { steps: string[]; result: Frac } {
  const steps: string[] = [];
  const expr = `${mixed ? mx(a) : fx(a)} ${div ? DV : T} ${op(b, mixed)}`;
  if (mixed && (Math.abs(a.n) > a.d || Math.abs(b.n) > b.d)) steps.push(`Write the mixed numbers as improper fractions: $${expr} = ${fx(a)} ${div ? DV : T} ${op(b)}$`);
  let B = b;
  if (div) {
    B = frac(b.d * Math.sign(b.n), Math.abs(b.n));
    steps.push(`Dividing is the same as multiplying by the reciprocal: $${fx(a)} ${DV} ${op(b)} = ${fx(a)} ${T} ${op(B)}$`);
  }
  const negCount = (a.n < 0 ? 1 : 0) + (B.n < 0 ? 1 : 0);
  steps.push(`Sign: ${negCount === 0 ? 'both factors are positive, so the product is positive' : negCount === 1 ? 'one factor is negative, so the product is negative' : 'two negative factors give a positive product'}.`);
  const result = fracMul(a, B);
  const rawN = Math.abs(a.n * B.n);
  const rawD = a.d * B.d;
  steps.push(`Multiply the sizes, numerators together and denominators together: $\\frac{${Math.abs(a.n)} ${T} ${Math.abs(B.n)}}{${a.d} ${T} ${B.d}} = \\frac{${rawN}}{${rawD}}${frac(rawN, rawD).d !== rawD ? ` = ${fx(frac(rawN, rawD))}` : ''}$.`);
  return { steps, result };
}

/** A non-zero proper fraction in lowest terms with denominator d. */
function properFrac(rng: Rng, d: number, sign: number): Frac {
  const ns = Array.from({ length: d - 1 }, (_, i) => i + 1).filter((n) => frac(n, d).d === d);
  return frac(sign * rng.pick(ns), d);
}

/** A mixed number with whole part in [1, wMax] and a fraction part with denominator d. */
function mixedFrac(rng: Rng, d: number, wMax: number, sign: number): Frac {
  const p = properFrac(rng, d, 1);
  const w = rng.int(1, wMax);
  return frac(sign * (w * d + p.n), d);
}

// ---------------------------------------------------------------------------
// 3.2 Adding and subtracting rational numbers
// ---------------------------------------------------------------------------

const ADD_HINT = 'Same signs: add the sizes and keep the sign. Different signs: subtract the sizes and use the sign of the number with the greater size.';
const SUB_HINT = 'To subtract, add the opposite: $a - (-b) = a + b$ and $a - b = a + (-b)$.';

/** a ± b with decimals in hundredths; returns the steps. */
function decAddSub(a: number, b: number, sub: boolean): { tex: string; steps: string[]; v: number } {
  const B = sub ? -b : b;
  const v = clean(a + B);
  const tex = `${dx(a)} ${sub ? '-' : '+'} ${dop(b)}`;
  const steps: string[] = [];
  if (sub) steps.push(`Add the opposite: $${tex} = ${dx(a)} + ${dop(B)}$`);
  if ((a < 0) === (B < 0)) steps.push(`Same signs: add the sizes, $${dx(Math.abs(a))} + ${dx(Math.abs(B))} = ${dx(Math.abs(v))}$, and keep the ${a < 0 ? 'negative' : 'positive'} sign.`);
  else {
    const big = Math.abs(a) >= Math.abs(B) ? a : B;
    const small = big === a ? B : a;
    steps.push(`Different signs: subtract the sizes, $${dx(Math.abs(big))} - ${dx(Math.abs(small))} = ${dx(Math.abs(v))}$. The number with the greater size, $${dx(big)}$, is ${big < 0 ? 'negative' : 'positive'}, so the answer is ${v < 0 ? 'negative' : v > 0 ? 'positive' : '$0$'}.`);
  }
  steps.push(`$${tex} = ${dx(v)}$`);
  return { tex, steps, v };
}

function addSubDecimal(rng: Rng, d: Difficulty): Out {
  const scale = d === 1 ? 10 : 100;
  const { a, b } = retry(
    () => ({ a: rng.nonZero(d === 1 ? -99 : -2500, d === 1 ? 99 : 2500) / scale, b: rng.nonZero(d === 1 ? -99 : -2500, d === 1 ? 99 : 2500) / scale }),
    ({ a, b }) => (a < 0 || b < 0) && !isWhole(a) && !isWhole(b) && Math.abs(a + b) > 1e-9 && Math.abs(a - b) > 1e-9,
  );
  const sub = rng.chance(0.5);
  const r = decAddSub(a, b, sub);
  return {
    prompt: `Evaluate.\n\n$$${r.tex}$$`,
    parts: [decPart(r.v)],
    hints: [sub ? SUB_HINT : ADD_HINT, 'Estimate first so you can check the sign and size of your answer.'],
    solution: r.steps,
  };
}

function addSubFraction(rng: Rng, d: Difficulty): Out {
  const sub = rng.chance(0.5);
  let a: Frac;
  let b: Frac;
  if (d === 1) {
    const den = rng.pick([3, 4, 5, 6, 8, 10]);
    [a, b] = retry(
      () => [properFrac(rng, den, rng.sign()), properFrac(rng, den, rng.sign())] as [Frac, Frac],
      ([x, y]) => (x.n < 0 || y.n < 0) && (sub ? fracSub(x, y) : fracAdd(x, y)).n !== 0 && x.n !== y.n,
    );
  } else {
    const [d1, d2] = rng.sample([2, 3, 4, 5, 6, 8, 10, 12], 2);
    [a, b] = retry(
      () => [properFrac(rng, d1, rng.sign()), properFrac(rng, d2, rng.sign())] as [Frac, Frac],
      ([x, y]) => (x.n < 0 || y.n < 0) && lcm(x.d, y.d) <= 40 && (sub ? fracSub(x, y) : fracAdd(x, y)).n !== 0,
    );
  }
  const { steps, result } = addSubSteps(a, b, sub, false);
  return {
    prompt: `Evaluate. ${FRACTION_FORM}\n\n$$${fx(a)} ${sub ? '-' : '+'} ${op(b)}$$`,
    parts: [fracPart(result, 'lowest')],
    hints: [sub ? SUB_HINT : ADD_HINT, d === 1 ? 'The denominators are the same, so add or subtract the numerators.' : `Write both fractions with the common denominator $${lcm(a.d, b.d)}$ first.`],
    solution: [...steps, `The answer is $${fx(result)}$.`],
  };
}

function addSubMixed(rng: Rng): Out {
  const sub = rng.chance(0.5);
  const [d1, d2] = rng.sample([2, 3, 4, 5, 6, 8], 2);
  const [a, b] = retry(
    () => [mixedFrac(rng, d1, 3, rng.sign()), mixedFrac(rng, d2, 3, rng.sign())] as [Frac, Frac],
    ([x, y]) => (x.n < 0 || y.n < 0) && lcm(x.d, y.d) <= 24 && (sub ? fracSub(x, y) : fracAdd(x, y)).n !== 0 && (sub ? fracSub(x, y) : fracAdd(x, y)).d !== 1,
  );
  const { steps, result } = addSubSteps(a, b, sub, true);
  return {
    prompt: `Evaluate. ${MIXED_FORM}\n\n$$${mx(a)} ${sub ? '-' : '+'} ${op(b, true)}$$`,
    parts: [fracPart(result, 'lowest')],
    hints: [sub ? SUB_HINT : ADD_HINT, 'Write each mixed number as an improper fraction, then use a common denominator.'],
    solution: [...steps, `The answer is $${fx(result)}$${Math.abs(result.n) > result.d ? `, or $${mx(result)}$` : ''}.`],
  };
}

function temperatureChanges(rng: Rng): Out {
  const town = rng.pick(TOWNS);
  const t0 = -rng.int(50, 250) / 10;
  const rise = rng.int(41, 159) / 10;
  const fall = rng.int(21, 119) / 10;
  const t1 = clean(t0 + rise);
  const t2 = clean(t1 - fall);
  const [time0, time1, time2] = rng.pick([['6:00 a.m.', 'noon', '9:00 p.m.'], ['7:00 a.m.', '2:00 p.m.', 'midnight'], ['5:00 a.m.', '1:00 p.m.', '10:00 p.m.']]);
  return {
    prompt: `At ${time0} in ${town}, the temperature was ${deg(t0)}. By ${time1} it had risen $${dx(rise)}$ degrees. By ${time2} it had fallen $${dx(fall)}$ degrees from the ${time1} temperature. What was the temperature at ${time2}?`,
    parts: [decPart(t2, '°C')],
    hints: ['A rise is a positive change and a fall is a negative change.', `Start at $${dx(t0)}$, add $${dx(rise)}$, then add $${dx(-fall)}$.`],
    solution: [
      `Temperature at ${time1}: $${dx(t0)} + ${dx(rise)} = ${dx(t1)}$`,
      `Temperature at ${time2}: $${dx(t1)} + (${dx(-fall)}) = ${dx(t2)}$`,
      `The temperature at ${time2} was ${deg(t2)}.`,
    ],
  };
}

function temperatureDifference(rng: Rng): Out {
  const [t1, t2] = rng.sample(TOWNS, 2);
  const low = -retry(() => rng.int(150, 380), (x) => x % 10 !== 0) / 10;
  const high = clean(low + rng.int(55, Math.min(300, Math.round(-low * 10) - 10)) / 10);
  const diff = clean(high - low);
  return {
    prompt: `One January day, the low temperature in ${t1} was ${deg(low)} and the low in ${t2} was ${deg(high)}. How many degrees warmer was it in ${t2}?`,
    parts: [decPart(diff, '°C')],
    hints: ['The difference is the warmer temperature minus the colder temperature.', SUB_HINT],
    solution: [`Difference $= ${dx(high)} - (${dx(low)})$`, `$= ${dx(high)} + ${dx(-low)} = ${dx(diff)}$`, `It was $${dx(diff)}^\\circ\\text{C}$ warmer in ${t2}.`],
  };
}

function stockChanges(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const start = rng.int(800, 4500) / 100;
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday'];
  const n = rng.int(3, 4);
  const changes = retry(
    () => Array.from({ length: n }, () => rng.nonZero(-250, 200) / 100),
    (cs) => cs.filter((c) => c < 0).length >= 2 && cs.some((c) => c > 0) && cs.every((c) => !isWhole(c)),
  );
  const total = clean(changes.reduce((s, c) => s + c, 0));
  const end = clean(start + total);
  const rows = changes.map((c, i) => [days[i], c < 0 ? `-$${fmtFixed(-c, 2)}` : `+$${fmtFixed(c, 2)}`]);
  return {
    prompt: `${name} owns shares in a company. On Friday, one share was worth ${money(start)}. The table shows how the price of one share changed each day the next week. What was one share worth after ${days[n - 1]}? Give your answer to the nearest cent.`,
    figure: { type: 'table', headers: ['Day', 'Change in price'], rows },
    parts: [moneyPart(end)],
    hints: ['Add all the changes to find the total change. Losses are negative.', 'Then add the total change to the starting price.'],
    solution: [
      `Total change: $${changes.map((c, i) => (i === 0 ? mv(c) : c < 0 ? `(${mv(c)})` : mv(c))).join(' + ')} = ${mv(total)}$`,
      `New price: $${mv(start)} + ${total < 0 ? `(${mv(total)})` : mv(total)} = ${mv(end)}$`,
      `One share was worth ${money(end)}.`,
    ],
  };
}

function accountBalance(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const start = rng.int(1500, 9000) / 100;
  const spend1 = rng.int(4000, 12000) / 100;
  const dep = rng.int(2000, 8000) / 100;
  const spend2 = rng.int(1500, 6000) / 100;
  const b1 = clean(start - spend1);
  const b2 = clean(b1 + dep);
  const b3 = clean(b2 - spend2);
  const items = rng.pick([['a new hockey stick', 'babysitting money', 'a concert ticket'], ['a jacket', 'a paycheque from a part-time job', 'groceries'], ['a phone bill', 'birthday money', 'a bus pass']]);
  return {
    prompt: `${name}'s bank account has a balance of ${money(start)}. ${name} pays ${money(spend1)} for ${items[0]}, then deposits ${money(dep)} of ${items[1]}, then pays ${money(spend2)} for ${items[2]}. What is the balance now? A negative balance means the account is overdrawn. Give your answer to the nearest cent.`,
    parts: [moneyPart(b3)],
    hints: ['A payment is a negative change and a deposit is a positive change.', 'Work through the changes in order, one at a time.'],
    solution: [
      `After the first payment: $${mv(start)} - ${mv(spend1)} = ${mv(b1)}$`,
      `After the deposit: $${mv(b1)} + ${mv(dep)} = ${mv(b2)}$`,
      `After the second payment: $${mv(b2)} - ${mv(spend2)} = ${mv(b3)}$`,
      `The balance is ${money(b3)}${b3 < 0 ? ', so the account is overdrawn' : ''}.`,
    ],
  };
}

function waterLevel(rng: Rng): Out {
  const pond = rng.pick(['a pond on a farm', 'a small reservoir on a cattle ranch', 'a marsh at the edge of town', 'a backyard rain barrel']);
  const unit = pond.includes('barrel') ? 'cm' : 'm';
  const months = ['June', 'July', 'August'];
  const cs = retry(
    () => [mixedFrac(rng, rng.pick([2, 4]), 1, -1), properFrac(rng, rng.pick([3, 4, 8]), -1), mixedFrac(rng, rng.pick([2, 3, 4]), 2, 1)],
    (xs) => {
      const t = xs.reduce((s, x) => fracAdd(s, x), frac(0));
      return t.n !== 0 && t.d !== 1;
    },
  );
  const order = rng.shuffle(cs);
  const total = order.reduce((s, x) => fracAdd(s, x), frac(0));
  const L = order.reduce((m, x) => lcm(m, x.d), 1);
  const conv = order.map((x) => `${x.n * (L / x.d) < 0 ? '-' : ''}\\frac{${Math.abs(x.n * (L / x.d))}}{${L}}`);
  return {
    prompt: `The water level in ${pond} changed by ${order.map((x, i) => `${i === order.length - 1 ? 'and ' : ''}$${mx(x)}$ ${unit} in ${months[i]}`).join(', ')}. What was the total change in the water level? ${MIXED_FORM}`,
    parts: [fracPart(total, 'lowest', unit)],
    hints: ['A drop is a negative change and a rise is positive. Add all three changes.', `Write each change as an improper fraction with the denominator $${L}$.`],
    solution: [
      `Total change $= ${order.map((x, i) => (i === 0 ? mx(x) : op(x, true))).join(' + ')}$`,
      `With the common denominator $${L}$: $${conv.map((c, i) => (i > 0 && c.startsWith('-') ? `\\left(${c}\\right)` : c)).join(' + ')}$`,
      `Add the numerators: $= ${total.n < 0 ? '-' : ''}\\frac{${Math.abs(order.reduce((sum, x) => sum + x.n * (L / x.d), 0))}}{${L}}${total.d !== L ? ` = ${fx(total)}` : ''}${Math.abs(total.n) > total.d ? ` = ${mx(total)}` : ''}$`,
      `The water level changed by $${mx(total)}$ ${unit}${total.n < 0 ? ' (it went down)' : ' (it went up)'}.`,
    ],
  };
}

const rationalAddSub = skill({
  id: 'm9-rational-add-sub',
  name: 'Adding and subtracting rational numbers',
  description: 'Add and subtract positive and negative fractions, mixed numbers and decimals, and solve problems about temperature, money and other changes.',
  outcomes: ['N3'],
  lessonId: 'm9-3-2',
  calculator: false,
  gen(rng, d: Difficulty) {
    if (d === 1) return rng.chance(0.5) ? addSubDecimal(rng, 1) : addSubFraction(rng, 1);
    if (d === 2) {
      const kind = rng.weighted([['frac', 4], ['mixed', 3], ['dec', 3]] as const);
      if (kind === 'frac') return addSubFraction(rng, 2);
      if (kind === 'mixed') return addSubMixed(rng);
      return addSubDecimal(rng, 2);
    }
    const kind = rng.weighted([['temp', 3], ['diff', 2], ['stock', 2], ['account', 2], ['water', 2]] as const);
    if (kind === 'temp') return temperatureChanges(rng);
    if (kind === 'diff') return temperatureDifference(rng);
    if (kind === 'stock') return { ...stockChanges(rng), calculator: true };
    if (kind === 'account') return { ...accountBalance(rng), calculator: true };
    return waterLevel(rng);
  },
});

// ---------------------------------------------------------------------------
// 3.3 Multiplying and dividing rational numbers
// ---------------------------------------------------------------------------

const MUL_HINT = 'Multiply or divide the sizes. Then find the sign: same signs give a positive answer, different signs give a negative answer.';

function mulDivDecimal(rng: Rng, d: Difficulty): Out {
  const div = rng.chance(0.5);
  if (d === 1) {
    // friendly: one factor is a single digit or the quotient is whole
    const [A, B] = retry(
      () => [clean(rng.nonZero(-9, 9) / (rng.chance(0.5) ? 10 : 1)), clean(rng.nonZero(-9, 9) / 10)],
      ([x, y]) => x < 0 || y < 0,
    );
    const prod = clean(A * B);
    const tex = div ? `${dx(prod)} ${DV} ${dop(B)}` : `${dx(A)} ${T} ${dop(B)}`;
    const v = div ? A : prod;
    const neg = (div ? prod : A) < 0 !== B < 0;
    return {
      prompt: `Evaluate.\n\n$$${tex}$$`,
      parts: [decPart(v)],
      hints: [MUL_HINT, div ? `Think: what times $${dx(Math.abs(B))}$ gives $${dx(Math.abs(prod))}$?` : 'Multiply as if there were no decimal points, then place the decimal point.'],
      solution: [
        `Sign: ${neg ? 'the signs are different, so the answer is negative' : 'the signs are the same, so the answer is positive'}.`,
        div ? `Size: $${dx(Math.abs(prod))} ${DV} ${dx(Math.abs(B))} = ${dx(Math.abs(v))}$` : `Size: $${dx(Math.abs(A))} ${T} ${dx(Math.abs(B))} = ${dx(Math.abs(v))}$`,
        `$${tex} = ${dx(v)}$`,
      ],
    };
  }
  const { a, b } = retry(
    () => ({ a: rng.nonZero(-999, 999) / 100, b: rng.nonZero(-450, 450) / 100 }),
    ({ a, b }) => {
      if (Math.abs(b) < 0.6 || Math.abs(a) < 1 || (a > 0 && b > 0) || isWhole(b)) return false;
      const v = div ? a / b : a * b;
      const hund = Math.abs(v * 100) % 1;
      return Math.abs(hund - 0.5) > 0.02 && hund > 0.02 && hund < 0.98;
    },
  );
  const v = div ? a / b : a * b;
  const tex = div ? `${dx(a)} ${DV} ${dop(b)}` : `${dx(a)} ${T} ${dop(b)}`;
  const neg = a < 0 !== b < 0;
  return {
    prompt: `Use a calculator to evaluate. Round your answer ${roundingPhrase(2)}.\n\n$$${tex}$$`,
    parts: [numPart(v, { decimals: 2 })],
    hints: [MUL_HINT, 'Find the sign first, then use the calculator for the sizes.'],
    solution: [
      `Sign: ${neg ? 'the signs are different, so the answer is negative' : 'the signs are the same, so the answer is positive'}.`,
      `Size: $${dx(Math.abs(a))} ${div ? DV : T} ${dx(Math.abs(b))} = ${fmt(Math.abs(v), 6)}\\ldots$`,
      `Rounded ${roundingPhrase(2)}: $${tex} \\approx ${fmtFixed(v, 2)}$`,
    ],
    calculator: true,
  };
}

function mulDivFraction(rng: Rng, d: Difficulty): Out {
  const div = rng.chance(0.5);
  let a: Frac;
  let b: Frac;
  if (d === 1) {
    [a, b] = retry(
      () => [properFrac(rng, rng.pick([2, 3, 4, 5, 6, 8]), rng.sign()), properFrac(rng, rng.pick([2, 3, 4, 5, 6, 8, 9, 10]), rng.sign())] as [Frac, Frac],
      ([x, y]) => (x.n < 0 || y.n < 0) && (div ? fracDiv(x, y) : fracMul(x, y)).d <= 24 && (div ? fracDiv(x, y) : fracMul(x, y)).d !== 1,
    );
  } else {
    [a, b] = retry(
      () => [mixedFrac(rng, rng.pick([2, 3, 4, 5]), 3, rng.sign()), rng.chance(0.5) ? mixedFrac(rng, rng.pick([2, 3, 4, 6]), 2, rng.sign()) : properFrac(rng, rng.pick([2, 3, 4, 5, 6, 8]), rng.sign())] as [Frac, Frac],
      ([x, y]) => {
        const r = div ? fracDiv(x, y) : fracMul(x, y);
        return (x.n < 0 || y.n < 0) && r.d <= 12 && Math.abs(r.n) <= 60;
      },
    );
  }
  const mixed = d > 1;
  const { steps, result } = mulDivSteps(a, b, div, mixed);
  return {
    prompt: `Evaluate. ${mixed ? MIXED_FORM : FRACTION_FORM}\n\n$$${mixed ? mx(a) : fx(a)} ${div ? DV : T} ${op(b, mixed)}$$`,
    parts: [fracPart(result, 'lowest')],
    hints: [MUL_HINT, div ? 'To divide by a fraction, multiply by its reciprocal.' : 'Multiply the numerators, multiply the denominators, then simplify.'],
    solution: [...steps, `The answer is $${fx(result)}$${Math.abs(result.n) > result.d && result.d > 1 ? `, or $${mx(result)}$` : ''}.`],
  };
}

function tempRate(rng: Rng): Out {
  const town = rng.pick(TOWNS);
  const kind = rng.pick(['total', 'average'] as const);
  if (kind === 'total') {
    const rate = rng.pick([0.5, 0.75, 1.2, 1.25, 1.5, 1.8, 2.25, 2.4, 3.5]);
    const h = rng.pick([2.5, 3, 3.5, 4, 4.5, 6]);
    const v = clean(-rate * h);
    return {
      prompt: `A cold front moves into ${town}. The temperature drops $${dx(rate)}$ degrees each hour for $${dx(h)}$ hours. What is the total change in temperature?`,
      parts: [decPart(v, '°C')],
      hints: ['A drop is a negative change.', `Multiply the change each hour, $${dx(-rate)}$, by the number of hours.`],
      solution: [`Change each hour: $${dx(-rate)}^\\circ\\text{C}$`, `Total change: $${dx(-rate)} ${T} ${dx(h)} = ${dx(v)}$`, `The temperature changes by $${dx(v)}^\\circ\\text{C}$.`],
      calculator: true,
    };
  }
  const h = rng.pick([4, 5, 6, 8]);
  const per = -rng.int(5, 30) / 10;
  const start = rng.int(-50, 60) / 10;
  const end = clean(start + per * h);
  const change = clean(end - start);
  return {
    prompt: `Over $${h}$ hours one evening in ${town}, the temperature fell steadily from ${deg(start)} to ${deg(end)}. What was the average change in temperature per hour?`,
    parts: [decPart(per, '°C per hour')],
    hints: ['First find the total change: final temperature minus starting temperature.', 'Divide the total change by the number of hours. A fall is negative.'],
    solution: [`Total change: $${dx(end)} - ${dop(start)} = ${dx(change)}$`, `Change per hour: $${dx(change)} ${DV} ${h} = ${dx(per)}$`, `The average change was $${dx(per)}^\\circ\\text{C}$ per hour.`],
    calculator: true,
  };
}

function stockRate(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['total', 'average'] as const);
  const days = rng.int(4, 8);
  if (kind === 'total') {
    const per = rng.int(12, 95) / 100;
    const v = clean(-per * days);
    return {
      prompt: `The price of one share of a company fell ${money(per)} each day for $${days}$ days in a row. ${name} owns one share. What was the total change in its price? Give your answer to the nearest cent (it will be negative).`,
      parts: [moneyPart(v)],
      hints: ['A fall in price is a negative change.', `Multiply $${mv(-per)}$ by $${days}$.`],
      solution: [`Change each day: $${mv(-per)}$`, `Total change: $${mv(-per)} ${T} ${days} = ${mv(v)}$`, `The price changed by ${money(v)}.`],
      calculator: true,
    };
  }
  const per = -rng.int(12, 95) / 100;
  const total = clean(per * days);
  return {
    prompt: `Over $${days}$ days, the price of one share of a company changed by a total of ${money(total)}. What was the average change in price per day? Give your answer to the nearest cent.`,
    parts: [moneyPart(per)],
    hints: ['Divide the total change by the number of days.', 'A negative divided by a positive is negative.'],
    solution: [`Average change $= ${mv(total)} ${DV} ${days}$`, `$= ${mv(per)}$`, `The average change was ${money(per)} per day.`],
    calculator: true,
  };
}

function recipeScale(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const item = rng.pick([
    { what: 'flour', amt: [frac(3, 4), frac(2, 3), frac(5, 4), frac(3, 2), frac(9, 4)] },
    { what: 'sugar', amt: [frac(1, 3), frac(3, 4), frac(2, 3), frac(1, 2)] },
    { what: 'milk', amt: [frac(3, 4), frac(5, 4), frac(1, 3), frac(2, 3)] },
    { what: 'rolled oats', amt: [frac(3, 2), frac(5, 3), frac(9, 4)] },
  ]);
  const dish = rng.pick(['banana bread', 'bannock', 'pancakes', 'oatmeal cookies', 'muffins for a bake sale']);
  const amt = rng.pick(item.amt);
  const factor = rng.pick([frac(3, 2), frac(5, 2), frac(1, 2), frac(2, 3), frac(3, 4), frac(7, 4), frac(4, 3)]);
  const v = fracMul(amt, factor);
  const scaleWord = fracValue(factor) > 1 ? `$${mx(factor)}$ times the recipe` : `$${fx(factor)}$ of the recipe`;
  const { steps } = mulDivSteps(amt, factor, false, true);
  return {
    prompt: `A recipe for ${dish} uses $${mx(amt)}$ cups of ${item.what}. ${name} makes ${scaleWord}. How many cups of ${item.what} does ${name} need? ${MIXED_FORM}`,
    parts: [fracPart(v, 'lowest', 'cups')],
    hints: [`Multiply the amount by $${mx(factor)}$.`, 'Write mixed numbers as improper fractions before you multiply.'],
    solution: [`Amount $= ${mx(amt)} ${T} ${mx(factor)}$`, ...steps.filter((s) => !s.startsWith('Sign')), `${name} needs $${mx(v)}$ cups of ${item.what}.`],
  };
}

function shareDebt(rng: Rng): Out {
  const names = rng.sample(NAMES, 3);
  const k = rng.int(3, 5);
  const each = rng.int(1200, 4800) / 100;
  const total = clean(each * k);
  const reason = rng.pick(['a pizza order for a group project', 'renting a campsite at a lake', 'tickets to a hockey game', 'supplies for a school dance']);
  return {
    prompt: `${names[0]}, ${names[1]} and ${k === 3 ? names[2] : `${k - 2} other friends`} owe a total of ${money(total)} for ${reason}. They split the cost equally. Write the change in each person's money as a rational number. Give your answer to the nearest cent.`,
    parts: [moneyPart(-each)],
    hints: ['Money owed is a negative amount.', `Divide $${mv(-total)}$ by the number of people, $${k}$.`],
    solution: [`The total change is $${mv(-total)}$, shared by $${k}$ people.`, `$${mv(-total)} ${DV} ${k} = ${mv(-each)}$`, `Each person's money changes by ${money(-each)}.`],
    calculator: true,
  };
}

const rationalMulDiv = skill({
  id: 'm9-rational-multiply-divide',
  name: 'Multiplying and dividing rational numbers',
  description: 'Multiply and divide positive and negative fractions, mixed numbers and decimals, and solve problems with rates of change and recipes.',
  outcomes: ['N3'],
  lessonId: 'm9-3-3',
  calculator: false,
  gen(rng, d: Difficulty) {
    if (d === 1) return rng.chance(0.5) ? mulDivDecimal(rng, 1) : mulDivFraction(rng, 1);
    if (d === 2) return rng.chance(0.55) ? mulDivFraction(rng, 2) : mulDivDecimal(rng, 2);
    const kind = rng.weighted([['temp', 3], ['stock', 2], ['recipe', 3], ['debt', 2]] as const);
    if (kind === 'temp') return tempRate(rng);
    if (kind === 'stock') return stockRate(rng);
    if (kind === 'recipe') return recipeScale(rng);
    return shareDebt(rng);
  },
});

// ---------------------------------------------------------------------------
// 3.4 Order of operations with rational numbers
// ---------------------------------------------------------------------------

const ORDER_HINT = 'Order of operations: brackets, then exponents, then multiply and divide from left to right, then add and subtract from left to right.';

interface Expr {
  tex: string;
  steps: Array<[string, string]>;
  v: number;
  /** Exact value when it is a fraction answer. */
  f?: Frac;
}

function decOps(rng: Rng, d: Difficulty): Expr {
  if (d === 1) {
    const kind = rng.pick(['addMul', 'subDiv'] as const);
    if (kind === 'addMul') {
      const { a, b, c } = retry(
        () => ({ a: rng.nonZero(-60, 60) / 10, b: rng.intExcept(-9, 9, [-1, 0, 1]), c: rng.nonZero(-25, 25) / 10 }),
        (x) => (x.a < 0 || x.b < 0 || x.c < 0) && !isWhole(x.a) && !isWhole(x.c),
      );
      const p = clean(b * c);
      const v = clean(a + p);
      return { tex: `${dx(a)} + ${dop(b)} ${T} ${dop(c)}`, steps: [['Multiply first', `${dx(a)} + ${dop(p)}`], ['Add', dx(v)]], v };
    }
    const c = rng.pick([0.2, 0.4, 0.5, 0.8, 1.2, 1.5]) * rng.sign();
    const q = rng.nonZero(-9, 9);
    const b = clean(q * c);
    const a = rng.nonZero(-80, 80) / 10;
    const v = clean(a - q);
    return { tex: `${dx(a)} - ${dop(b)} ${DV} ${dop(c)}`, steps: [['Divide first', `${dx(a)} - ${dop(q)}`], ['Subtract', dx(v)]], v };
  }
  const kind = rng.pick(['square', 'bracket'] as const);
  if (kind === 'square') {
    const s = rng.pick([-0.5, -0.4, -0.3, -0.2, -1.5, -1.2, 0.5, 0.3]);
    const k = rng.pick([2, 4, 5, 10, 20]);
    const c = rng.pick([0.2, 0.4, 0.5, 0.8]) * rng.sign();
    const q = rng.nonZero(-9, 9);
    const b = clean(q * c);
    const S = clean(s * s);
    const P = clean(S * k);
    const v = clean(P - q);
    return {
      tex: `${dop(s)}^{2} ${T} ${k} - ${dop(b)} ${DV} ${dop(c)}`,
      steps: [['Exponent first', `${dx(S)} ${T} ${k} - ${dop(b)} ${DV} ${dop(c)}`], ['Multiply and divide from left to right', `${dx(P)} - ${dop(q)}`], ['Subtract', dx(v)]],
      v,
    };
  }
  const a = rng.nonZero(-50, 50) / 10;
  const b = rng.nonZero(-50, 50) / 10;
  const m = rng.pick([-2, -3, 2, 3, -4, 0.5, -0.5]);
  const c = rng.nonZero(-90, 90) / 10;
  const s = clean(a + b);
  const p = clean(m * s);
  const v = clean(c - p);
  if (s === 0) return decOps(rng, d);
  return {
    tex: `${dx(c)} - ${dop(m)}(${dx(a)} + ${dop(b)})`,
    steps: [['Brackets first', `${dx(c)} - ${dop(m)} ${T} ${dop(s)}`], ['Multiply', `${dx(c)} - ${dop(p)}`], ['Subtract', dx(v)]],
    v,
  };
}

function fracOps(rng: Rng, d: Difficulty): Expr {
  if (d === 1) {
    const [a, b, c] = retry(
      () => [properFrac(rng, rng.pick([2, 3, 4, 6]), rng.sign()), properFrac(rng, rng.pick([2, 3, 4, 5]), rng.sign()), properFrac(rng, rng.pick([2, 3, 4, 5]), rng.sign())],
      ([x, y, z]) => {
        const r = fracAdd(x, fracMul(y, z));
        return (x.n < 0 || y.n < 0 || z.n < 0) && r.d <= 24 && r.n !== 0;
      },
    );
    const p = fracMul(b, c);
    const r = fracAdd(a, p);
    return { tex: `${fx(a)} + ${op(b)} ${T} ${op(c)}`, steps: [['Multiply first', `${fx(a)} + ${op(p)}`], ['Add with a common denominator', fx(r)]], v: fracValue(r), f: r };
  }
  const [a, b, c] = retry(
    () => [properFrac(rng, rng.pick([2, 3, 4]), -1), properFrac(rng, rng.pick([2, 3, 4, 6]), rng.sign()), properFrac(rng, rng.pick([2, 3, 4, 5]), rng.sign())],
    ([x, y, z]) => {
      const r = fracAdd(fracMul(x, x), fracDiv(y, z));
      return r.d <= 36 && r.n !== 0 && Math.abs(r.n) <= 60;
    },
  );
  const sq = fracMul(a, a);
  const q = fracDiv(b, c);
  const r = fracAdd(sq, q);
  return {
    tex: `\\left(${fx(a)}\\right)^{2} + ${op(b)} ${DV} ${op(c)}`,
    steps: [['Exponent first', `${fx(sq)} + ${op(b)} ${DV} ${op(c)}`], ['Divide (multiply by the reciprocal)', `${fx(sq)} + ${op(q)}`], ['Add with a common denominator', fx(r)]],
    v: fracValue(r),
    f: r,
  };
}

function opsQuestion(e: Expr, d: Difficulty): Out {
  return {
    prompt: `Evaluate.${e.f ? ` ${MIXED_FORM}` : ''}\n\n$$${e.tex}$$`,
    parts: [e.f ? fracPart(e.f, 'lowest') : decPart(e.v)],
    hints: [ORDER_HINT, d === 1 ? 'Multiply or divide before you add or subtract.' : 'Evaluate the power first, then multiply and divide, then add and subtract. Watch the signs.'],
    solution: [`$${e.tex}$`, ...e.steps.map(([note, s]) => `${note}: $= ${s}$`), `The value is $${e.f ? (Math.abs(e.f.n) > e.f.d && e.f.d > 1 ? `${fx(e.f)} = ${mx(e.f)}` : fx(e.f)) : dx(e.v)}$.`],
  };
}

function averageTemp(rng: Rng): Out {
  const town = rng.pick(TOWNS);
  const n = rng.pick([5, 6, 7]);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].slice(0, n);
  const temps = retry(
    () => Array.from({ length: n }, () => rng.int(-250, 40) / 10),
    (ts) => {
      const m = ts.reduce((s, t) => s + t, 0) / n;
      const frac10 = Math.abs(m * 10) % 1;
      return ts.filter((t) => t < 0).length >= 3 && Math.abs(frac10 - 0.5) > 0.05 && !ts.includes(0);
    },
  );
  const sum = clean(temps.reduce((s, t) => s + t, 0));
  const mean = sum / n;
  return {
    prompt: `The table shows the low temperature each day for one week in ${town}. What was the mean (average) low temperature? Round your answer ${roundingPhrase(1)}.`,
    figure: { type: 'table', headers: ['Day', 'Low (°C)'], rows: days.map((dd, i) => [dd, `${dx(temps[i])}`]) },
    parts: [numPart(mean, { decimals: 1, suffix: '°C' })],
    hints: ['Mean = sum of the values ÷ number of values.', 'Add the temperatures carefully, keeping track of the signs. The fraction bar or ÷ comes after the sum.'],
    solution: [
      `Sum: $${temps.map((t, i) => (i === 0 ? dx(t) : dop(t))).join(' + ')} = ${dx(sum)}$`,
      `Mean: $${dop(sum)} ${DV} ${n} = ${fmt(mean, 4)}\\ldots$`,
      `Rounded ${roundingPhrase(1)}, the mean low temperature was $${fmtFixed(mean, 1)}^\\circ\\text{C}$.`,
    ],
    calculator: true,
  };
}

function shoppingBalance(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const start = rng.int(2000, 6000) / 100;
  const qty = rng.int(2, 4);
  const price = rng.int(899, 2499) / 100;
  const refund = rng.int(500, 1500) / 100;
  const v = clean(start - qty * price + refund);
  const item = rng.pick(['video games on sale', 'T-shirts for a school team', 'tickets to a movie', 'bags of dog food']);
  return {
    prompt: `${name}'s account balance is ${money(start)}. ${name} buys $${qty}$ ${item} at ${money(price)} each, then gets a refund of ${money(refund)}. Write one expression for the new balance and evaluate it. A negative balance means the account is overdrawn. Give your answer to the nearest cent.`,
    parts: [moneyPart(v)],
    hints: ['The purchases are a negative change of $' + qty + ' \\times ' + mv(price) + '$.', 'Multiply before you add or subtract.'],
    solution: [
      `New balance $= ${mv(start)} - ${qty} ${T} ${mv(price)} + ${mv(refund)}$`,
      `Multiply first: $${qty} ${T} ${mv(price)} = ${mv(qty * price)}$`,
      `$${mv(start)} - ${mv(qty * price)} + ${mv(refund)} = ${mv(clean(start - qty * price))} + ${mv(refund)} = ${mv(v)}$`,
      `The new balance is ${money(v)}${v < 0 ? ', so the account is overdrawn' : ''}.`,
    ],
    calculator: true,
  };
}

function recipeShortfall(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const amt = rng.pick([frac(9, 4), frac(5, 3), frac(7, 4), frac(3, 2), frac(5, 4), frac(4, 3)]);
  const k = rng.pick([2, 3]);
  const need = fracMul(amt, frac(k));
  const have = retry(
    () => frac(rng.int(4, 40), rng.pick([2, 3, 4])),
    (h) => fracValue(h) > fracValue(amt) && Math.abs(fracValue(h) - fracValue(need)) > 0.2 && fracValue(h) < fracValue(need) + 2 && fracSub(need, h).d !== 1 && h.d !== 1,
  );
  const short = fracSub(have, need);
  const what = rng.pick(['flour', 'oats', 'sugar', 'chocolate chips']);
  return {
    prompt: `A cookie recipe uses $${mx(amt)}$ cups of ${what}. ${name} wants to make $${k}$ batches and has $${mx(have)}$ cups. Evaluate $${mx(have)} - ${k} ${T} ${mx(amt)}$ to find how much ${what} ${name} has left over. A negative answer means ${name} is short. ${MIXED_FORM}`,
    parts: [fracPart(short, 'lowest', 'cups')],
    hints: ['Multiply before you subtract.', 'Write the mixed numbers as improper fractions with a common denominator.'],
    solution: [
      `Multiply first: $${k} ${T} ${mx(amt)} = ${k} ${T} ${fx(amt)} = ${fx(need)}$`,
      `Subtract: $${fx(have)} - ${fx(need)} = ${fx(short)}${Math.abs(short.n) > short.d ? ` = ${mx(short)}` : ''}$`,
      short.n < 0 ? `The result is $${mx(short)}$ cups, so ${name} is short $${mx(frac(-short.n, short.d))}$ cups of ${what}.` : `The result is $${mx(short)}$ cups, so ${name} has $${mx(short)}$ cups of ${what} left over.`,
    ],
  };
}

function coldNight(rng: Rng): Out {
  const town = rng.pick(TOWNS);
  const start = -rng.int(10, 90) / 10;
  const drop = rng.pick([0.75, 1.25, 1.5, 1.8, 2.4, 0.9]);
  const h = rng.int(3, 6);
  const rise = rng.int(15, 70) / 10;
  const v = clean(start - h * drop + rise);
  return {
    prompt: `At midnight in ${town}, the temperature was ${deg(start)}. It dropped $${dx(drop)}$ degrees every hour for $${h}$ hours, then rose $${dx(rise)}$ degrees after sunrise. Evaluate $${dx(start)} + ${h} ${T} (${dx(-drop)}) + ${dx(rise)}$ to find the temperature after it rose.`,
    parts: [decPart(v, '°C')],
    hints: ['Multiply first: the total drop is $' + h + ' \\times (' + dx(-drop) + ')$.', 'Then add from left to right.'],
    solution: [
      `Multiply first: $${h} ${T} (${dx(-drop)}) = ${dx(clean(-h * drop))}$`,
      `$${dx(start)} + (${dx(clean(-h * drop))}) = ${dx(clean(start - h * drop))}$`,
      `$${dx(clean(start - h * drop))} + ${dx(rise)} = ${dx(v)}$`,
      `The temperature was ${deg(v)}.`,
    ],
    calculator: true,
  };
}

const rationalOrderOps = skill({
  id: 'm9-rational-order-ops',
  name: 'Order of operations with rational numbers',
  description: 'Apply the order of operations to expressions with positive and negative fractions and decimals, and solve multi-step problems.',
  outcomes: ['N3', 'N4'],
  lessonId: 'm9-3-4',
  calculator: false,
  gen(rng, d: Difficulty) {
    if (d < 3) return opsQuestion(rng.chance(0.5) ? decOps(rng, d) : fracOps(rng, d), d);
    const kind = rng.weighted([['avg', 3], ['shop', 2], ['recipe', 2], ['cold', 3]] as const);
    if (kind === 'avg') return averageTemp(rng);
    if (kind === 'shop') return shoppingBalance(rng);
    if (kind === 'recipe') return recipeShortfall(rng);
    return coldNight(rng);
  },
});

export const RATIONAL_SKILLS: SkillDef[] = [rationalCompare, rationalAddSub, rationalMulDiv, rationalOrderOps];
