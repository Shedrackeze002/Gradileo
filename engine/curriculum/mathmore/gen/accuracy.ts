/** More Mathematics Topics, Unit 7: error intervals, upper and lower bounds, and recurring decimals. */
import { mc, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtGroupTex, gcd, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Part, SkillDef } from '../../../types.ts';
import { NAMES } from './common.ts';

type Out = GenOutput;

/** An exact sum or product written to 6 places, without floating-point noise. */
const r6 = (x: number) => roundTo(x, 6);
/** A number in maths with thin-space groups, to 6 places. */
const G = (x: number) => fmtGroupTex(x, 6);
const exactPart = (v: number, label?: string, suffix?: string): Part => numPart(r6(v), { label, suffix, exact: false });

// ---------------------------------------------------------------------------
// 7.1 Error intervals
// ---------------------------------------------------------------------------

interface Accuracy {
  /** The size of the unit rounded to (10 for "the nearest 10", 0.01 for "2 decimal places"). */
  unit: number;
  phrase: string;
}

const WHOLE: Accuracy[] = [
  { unit: 1, phrase: 'to the nearest whole number' },
  { unit: 10, phrase: 'to the nearest 10' },
];
const PLACES: Accuracy[] = [
  { unit: 0.1, phrase: 'to 1 decimal place' },
  { unit: 0.01, phrase: 'to 2 decimal places' },
  { unit: 100, phrase: 'to the nearest 100' },
  { unit: 1000, phrase: 'to the nearest 1000' },
];

/** A rounded value r with `sig` significant figures, and the unit of its last figure. */
function sigFigs(rng: Rng): { r: number; unit: number; phrase: string } {
  const sig = rng.int(1, 3);
  const mag = rng.int(-2, 3);
  const unit = 10 ** (mag - sig + 1);
  const lead = rng.int(10 ** (sig - 1), 10 ** sig - 1);
  // The last figure is not zero, so the significant figures are plain to see (340 to 2 s.f. is clear, 300 is not).
  const k = lead % 10 === 0 && sig > 1 ? lead + rng.int(1, 9) : lead;
  return { r: r6(k * unit), unit: r6(unit), phrase: `to ${sig} significant figure${sig > 1 ? 's' : ''}` };
}

interface Measure {
  text: (name: string, v: string) => string;
  letter: string;
  what: string;
  unit: string;
}

const MEASURES: Measure[] = [
  { text: (n, v) => `${n} measures the length of a field as ${v} m`, letter: 'l', what: 'length', unit: 'metres' },
  { text: (n, v) => `The mass of a parcel ${n} posts is ${v} kg`, letter: 'm', what: 'mass', unit: 'kilograms' },
  { text: (n, v) => `${n} runs a race in a time of ${v} seconds`, letter: 't', what: 'time', unit: 'seconds' },
  { text: (n, v) => `${n} pours ${v} litres of water into a tank`, letter: 'v', what: 'volume', unit: 'litres' },
  { text: (n, v) => `A town in ${n}’s story has a population of ${v}`, letter: 'p', what: 'population', unit: 'people' },
];

const INTERVAL_HINT = 'Halve the unit you are rounding to. The smallest value that rounds up to the number is half a unit below it, and every value up to (but not including) half a unit above it rounds down to it.';

function errorInterval(rng: Rng, d: Difficulty): Out {
  let r: number;
  let unit: number;
  let phrase: string;
  if (d === 3) ({ r, unit, phrase } = sigFigs(rng));
  else {
    const acc = rng.pick(d === 1 ? WHOLE : PLACES);
    unit = acc.unit;
    phrase = acc.phrase;
    // A decimal answer does not end in 0 (3.40 to 2 decimal places would print as 3.4).
    r = r6(retry(() => rng.int(unit >= 100 ? 2 : 11, unit >= 100 ? 95 : 999), (k) => unit >= 1 || k % 10 !== 0) * unit);
  }
  const lo = r6(r - unit / 2);
  const hi = r6(r + unit / 2);
  const pop = r >= 100;
  const m = d === 1 && !pop ? null : pop ? MEASURES[MEASURES.length - 1]! : rng.pick(MEASURES.slice(0, -1));
  const x = m ? m.letter : 'x';
  return {
    prompt: m
      ? `${m.text(rng.pick(NAMES), `$${G(r)}$`)}, ${phrase}. Write the error interval for $${x}$, the exact ${m.what}${m.what === 'population' ? '' : ` in ${m.unit}`}, in the form $a \\le ${x} < b$.`
      : `A number $x$ is rounded ${phrase}. The result is $${G(r)}$. Write the error interval for $x$ in the form $a \\le x < b$.`,
    parts: [exactPart(lo, '$a$ ='), exactPart(hi, '$b$ =')],
    hints: [INTERVAL_HINT, `Rounding ${phrase} means the unit is $${G(unit)}$, so half a unit is $${G(unit / 2)}$.`],
    solution: [
      `Rounding ${phrase}, the unit is $${G(unit)}$, so half a unit is $${G(unit / 2)}$.`,
      `Lower bound: $${G(r)} - ${G(unit / 2)} = ${G(lo)}$. Upper bound: $${G(r)} + ${G(unit / 2)} = ${G(hi)}$.`,
      `$${G(hi)}$ itself would round up, so it is not included: $${G(lo)} \\le ${x} < ${G(hi)}$.`,
    ],
  };
}

/** a ≤ x < b written three wrong ways and the right way. */
const ineq = (a: number, b: number, kind: 'lt' | 'le-le' | 'lt-le' | 'lt-lt', x = 'x') =>
  `$${fmt(a, 6)} ${kind === 'lt-le' || kind === 'lt-lt' ? '<' : '\\le'} ${x} ${kind === 'le-le' || kind === 'lt-le' ? '\\le' : '<'} ${fmt(b, 6)}$`;

function truncationInterval(rng: Rng, d: Difficulty): Out {
  if (d === 3) {
    // Rounding or truncation, and the right inequality signs.
    const dp = rng.int(0, 1);
    const unit = 10 ** -dp;
    const t = r6(rng.int(dp ? 11 : 3, dp ? 99 : 40) * unit);
    const trunc = rng.chance(0.5);
    const how = dp ? '1 decimal place' : 'a whole number';
    const [lo, hi] = trunc ? [t, r6(t + unit)] : [r6(t - unit / 2), r6(t + unit / 2)];
    const [olo, ohi] = trunc ? [r6(t - unit / 2), r6(t + unit / 2)] : [t, r6(t + unit)];
    const correct = ineq(lo, hi, 'lt');
    return {
      prompt: `A number $x$ is ${trunc ? 'truncated' : 'rounded'} to ${how}. The result is $${fmt(t)}$. Which is the error interval for $x$?`,
      parts: [{ answer: mc(rng, correct, [ineq(olo, ohi, 'lt'), ineq(lo, hi, 'le-le'), ineq(lo, hi, 'lt-le'), ineq(olo, ohi, 'le-le')]) }],
      hints: ['Truncating chops off the extra digits, so the number can be anything from the truncated value up to (not including) the next value. Rounding reaches half a unit either side.', 'The lower bound is included ($\\le$); the upper bound is not ($<$).'],
      solution: trunc
        ? [`Truncating to ${how} keeps the digits up to that place and drops the rest, so every number from $${fmt(t)}$ up to, but not including, $${fmt(hi, 6)}$ truncates to $${fmt(t)}$.`, `The error interval is ${correct}.`]
        : [`Rounding to ${how}, half a unit is $${fmt(unit / 2, 6)}$, so $x$ is from $${fmt(lo, 6)}$ up to, but not including, $${fmt(hi, 6)}$.`, `The error interval is ${correct}.`],
    };
  }
  const dp = d === 1 ? 0 : rng.int(1, 2);
  const unit = 10 ** -dp;
  const tt = r6(rng.int(dp ? 101 : 3, dp ? 999 : 95) * unit);
  const hi = r6(tt + unit);
  const how = dp === 0 ? 'a whole number' : `${dp} decimal place${dp > 1 ? 's' : ''}`;
  const ex = r6(tt + unit * 0.73);
  return {
    prompt: `A calculator shows a number $x$ truncated to ${how}: $${fmt(tt, 6)}$. Write the error interval for $x$ in the form $a \\le x < b$.`,
    parts: [exactPart(tt, '$a$ ='), exactPart(hi, '$b$ =')],
    hints: ['To truncate, cut off the digits after the place you want, without rounding.', `Which numbers give $${fmt(tt, 6)}$ when everything after ${dp === 0 ? 'the decimal point' : `the ${dp === 1 ? 'first' : 'second'} decimal place`} is cut off?`],
    solution: [
      `Truncating cuts off digits without rounding, so $${fmt(tt, 6)}$ itself and every number above it up to the next value, $${fmt(hi, 6)}$, truncate to $${fmt(tt, 6)}$ (for example $${fmt(ex, 6)}$ does).`,
      `$${fmt(hi, 6)}$ truncates to $${fmt(hi, 6)}$, so it is not included.`,
      `The error interval is $${fmt(tt, 6)} \\le x < ${fmt(hi, 6)}$.`,
    ],
  };
}

// ---------------------------------------------------------------------------
// 7.2 Upper and lower bounds in calculations
// ---------------------------------------------------------------------------

interface Bounded {
  v: number;
  lo: number;
  hi: number;
}

const bound = (v: number, unit: number): Bounded => ({ v, lo: r6(v - unit / 2), hi: r6(v + unit / 2) });
const accWords = (unit: number) => (unit === 1 ? 'to the nearest whole number' : unit === 10 ? 'to the nearest 10' : unit === 0.1 ? 'to 1 decimal place' : 'to 2 decimal places');

function boundsCalc(rng: Rng, d: Difficulty): Out {
  const op = d === 1 ? rng.pick(['+', '×'] as const) : d === 2 ? rng.pick(['−', '×'] as const) : rng.pick(['÷', '−'] as const);
  const unit = d === 1 ? rng.pick([1, 10]) : rng.pick([1, 0.1]);
  const [lo, hi] = unit === 0.1 ? [30, 150] : [12, 60];
  const ka = rng.int(lo, hi);
  const kb = rng.int(op === '÷' ? Math.ceil(ka / 12) + 2 : 4, ka - 2);
  const a = bound(r6(ka * unit), unit);
  const b = bound(r6(kb * unit), unit);
  const upper = rng.chance(0.5);
  const word = upper ? 'upper' : 'lower';
  let value: number;
  let how: string;
  if (op === '+') {
    value = upper ? a.hi + b.hi : a.lo + b.lo;
    how = upper ? `Add the two upper bounds: $${fmt(a.hi)} + ${fmt(b.hi)}$.` : `Add the two lower bounds: $${fmt(a.lo)} + ${fmt(b.lo)}$.`;
  } else if (op === '×') {
    value = upper ? a.hi * b.hi : a.lo * b.lo;
    how = upper ? `Multiply the two upper bounds: $${fmt(a.hi)} \\times ${fmt(b.hi)}$.` : `Multiply the two lower bounds: $${fmt(a.lo)} \\times ${fmt(b.lo)}$.`;
  } else if (op === '−') {
    value = upper ? a.hi - b.lo : a.lo - b.hi;
    how = upper ? `For the largest difference, take the largest $a$ and the smallest $b$: $${fmt(a.hi)} - ${fmt(b.lo)}$.` : `For the smallest difference, take the smallest $a$ and the largest $b$: $${fmt(a.lo)} - ${fmt(b.hi)}$.`;
  } else {
    value = upper ? a.hi / b.lo : a.lo / b.hi;
    how = upper ? `For the largest quotient, divide the largest $a$ by the smallest $b$: $${fmt(a.hi)} \\div ${fmt(b.lo)}$.` : `For the smallest quotient, divide the smallest $a$ by the largest $b$: $${fmt(a.lo)} \\div ${fmt(b.hi)}$.`;
  }
  const exact = op !== '÷';
  const opTex = op === '+' ? '+' : op === '−' ? '-' : op === '×' ? '\\times' : '\\div';
  return {
    prompt: `$a = ${fmt(a.v)}$ and $b = ${fmt(b.v)}$, each correct ${accWords(unit)}. Find the ${word} bound of $a ${opTex} b$${exact ? '' : ', to 2 decimal places'}.`,
    parts: [exact ? exactPart(value) : numPart(value, { decimals: 2 })],
    hints: [
      `First write the bounds of each number: half a unit ($${fmt(unit / 2)}$) either side.`,
      op === '−' || op === '÷' ? `Subtracting or dividing by a smaller number gives a bigger answer, so the ${word} bound of $a ${opTex} b$ uses the ${upper ? 'upper' : 'lower'} bound of $a$ and the ${upper ? 'lower' : 'upper'} bound of $b$.` : `The ${word} bound of $a ${opTex} b$ uses the ${word} bounds of both numbers.`,
    ],
    solution: [
      `$${fmt(a.lo)} \\le a < ${fmt(a.hi)}$ and $${fmt(b.lo)} \\le b < ${fmt(b.hi)}$`,
      how,
      exact ? `The ${word} bound is $${fmt(r6(value))}$.` : `$= ${fmt(value, 5)}\\ldots$, so the ${word} bound is $${fmt(value, 2)}$ to 2 decimal places.`,
    ],
  };
}

function boundsProblem(rng: Rng, d: Difficulty): Out {
  const upper = rng.chance(0.5);
  const word = upper ? 'upper' : 'lower';
  const name = rng.pick(NAMES);
  if (d === 3) {
    // Speed = distance ÷ time.
    const dist = bound(rng.int(10, 40) * 10, 10);
    const time = bound(r6(roundTo((dist.v * 100) / rng.int(40, 80), 0) / 10), 0.1);
    const value = upper ? dist.hi / time.lo : dist.lo / time.hi;
    return {
      prompt: `${name} runs $${dist.v}$ m, correct to the nearest $10$ m, in a time of $${fmt(time.v)}$ seconds, correct to $1$ decimal place. Find the ${word} bound of ${name}’s average speed, in metres per second, to 2 decimal places.`,
      parts: [numPart(value, { decimals: 2, suffix: 'm/s' })],
      hints: ['Speed $=$ distance $\\div$ time.', upper ? 'The greatest speed comes from the longest distance in the shortest time.' : 'The least speed comes from the shortest distance in the longest time.'],
      solution: [
        `Distance: $${fmt(dist.lo)} \\le d < ${fmt(dist.hi)}$. Time: $${fmt(time.lo)} \\le t < ${fmt(time.hi)}$.`,
        upper ? `Upper bound of the speed $= \\dfrac{\\text{upper bound of } d}{\\text{lower bound of } t} = \\dfrac{${fmt(dist.hi)}}{${fmt(time.lo)}}$` : `Lower bound of the speed $= \\dfrac{\\text{lower bound of } d}{\\text{upper bound of } t} = \\dfrac{${fmt(dist.lo)}}{${fmt(time.hi)}}$`,
        `$= ${fmt(value, 5)}\\ldots \\approx ${fmt(value, 2)}$ m/s`,
      ],
    };
  }
  const unit = d === 1 ? 1 : rng.pick([1, 0.1]);
  const l = bound(r6(rng.int(unit === 1 ? 12 : 41, unit === 1 ? 40 : 129) * unit), unit);
  const w = bound(r6(retry(() => rng.int(unit === 1 ? 5 : 21, unit === 1 ? 30 : 99), (v) => v * unit < l.v) * unit), unit);
  const area = d === 2;
  const value = area ? (upper ? l.hi * w.hi : l.lo * w.lo) : upper ? 2 * (l.hi + w.hi) : 2 * (l.lo + w.lo);
  const u = unit === 1 ? 'cm' : 'm';
  return {
    prompt: `A rectangular ${unit === 1 ? 'card' : 'garden'} is $${fmt(l.v)}$ ${u} long and $${fmt(w.v)}$ ${u} wide, each measured ${accWords(unit)}. Find the ${word} bound of its ${area ? 'area' : 'perimeter'}.`,
    parts: [exactPart(value, undefined, area ? `${u}²` : u)],
    hints: [`First find the bounds of the length and the width: half a unit ($${fmt(unit / 2)}$ ${u}) either side.`, `The ${word} bound of the ${area ? 'area' : 'perimeter'} uses the ${word} bounds of both sides.`],
    solution: [
      `Length: $${fmt(l.lo)} \\le l < ${fmt(l.hi)}$. Width: $${fmt(w.lo)} \\le w < ${fmt(w.hi)}$.`,
      area
        ? `${upper ? 'Upper' : 'Lower'} bound of the area $= ${fmt(upper ? l.hi : l.lo)} \\times ${fmt(upper ? w.hi : w.lo)} = ${fmt(r6(value))}$ ${u}²`
        : `${upper ? 'Upper' : 'Lower'} bound of the perimeter $= 2 \\times (${fmt(upper ? l.hi : l.lo)} + ${fmt(upper ? w.hi : w.lo)}) = ${fmt(r6(value))}$ ${u}`,
    ],
  };
}

// ---------------------------------------------------------------------------
// 7.3 Recurring decimals
// ---------------------------------------------------------------------------

interface Expansion {
  int: number;
  pre: string;
  rep: string;
}

/** The decimal expansion of n/d (n, d > 0): whole part, digits before the repeating block, and the block ('' when it terminates). */
export function expand(n: number, d: number): Expansion {
  const int = Math.floor(n / d);
  let r = n % d;
  const seen = new Map<number, number>();
  let digits = '';
  while (r !== 0 && !seen.has(r)) {
    seen.set(r, digits.length);
    r *= 10;
    digits += String(Math.floor(r / d));
    r %= d;
  }
  if (r === 0) return { int, pre: digits, rep: '' };
  const at = seen.get(r)!;
  return { int, pre: digits.slice(0, at), rep: digits.slice(at) };
}

/** A recurring decimal with dots over the first and last digits of the block: 0.1\dot{6}, 0.\dot{1}4\dot{2}. */
export function recurringTex(e: Expansion): string {
  const { int, pre, rep } = e;
  if (!rep) return `${int}${pre ? `.${pre}` : ''}`;
  const block = rep.length === 1 ? `\\dot{${rep}}` : `\\dot{${rep[0]}}${rep.slice(1, -1)}\\dot{${rep[rep.length - 1]}}`;
  return `${int}.${pre}${block}`;
}

/** The decimal with the block written out twice and dots after: 0.272727… with the point moved k places right. */
function written(e: Expansion, k = 0): string {
  const all = `${e.int}${e.pre}${e.rep.repeat(6)}`;
  const at = String(e.int).length + k;
  const whole = String(Number(all.slice(0, at)));
  const dec = all.slice(at, at + Math.max(3, e.rep.length * 2 + (e.pre.length > k ? e.pre.length - k : 0)));
  return `${whole}.${dec}\\ldots`;
}

const fracTex = (n: number, d: number) => `\\frac{${n}}{${d}}`;
const lowest = (n: number, d: number): [number, number] => {
  const g = gcd(n, d);
  return [n / g, d / g];
};

function recurringToFraction(rng: Rng, d: Difficulty): Out {
  const dens = d === 1 ? [3, 9, 11, 33, 99] : d === 2 ? [6, 12, 15, 18, 30, 36, 45, 90] : [27, 37, 55, 110, 111, 220, 330, 990];
  const [n, den] = retry(
    () => {
      const den = rng.pick(dens);
      const whole = d === 3 && rng.chance(0.3) ? den * rng.int(1, 3) : 0;
      return lowest(whole + rng.int(1, den - 1), den);
    },
    ([n, den]) => {
      const e = expand(n, den);
      return e.rep !== '' && e.rep.length <= 3 && e.pre.length <= 2 && (d !== 2 || e.pre.length > 0) && (d !== 3 || e.rep.length === 3 || e.pre.length > 0);
    },
    300,
  );
  const e = expand(n, den);
  const p = e.pre.length;
  const r = e.rep.length;
  const A = Number(`${e.int}${e.pre}${e.rep}`);
  const B = Number(`${e.int}${e.pre}`);
  const k1 = 10 ** p;
  const k2 = 10 ** (p + r);
  const top = A - B;
  const bottom = k2 - k1;
  const [sn, sd] = lowest(top, bottom);
  return {
    prompt: `Write $${recurringTex(e)}$ as a fraction in its lowest terms.`,
    parts: [numPart(n / den, { fraction: 'lowest' })],
    hints: [
      `The dots mark the repeating block: $${recurringTex(e)} = ${written(e)}$. Call the number $x$.`,
      p === 0
        ? `The block has ${r} digit${r > 1 ? 's' : ''}, so multiply by $${k2}$ and subtract $x$: the repeating parts cancel.`
        : `Multiply by $${k1}$ to move the point to the start of the block, and by $${k2}$ to move it past one whole block. Subtract, and the repeating parts cancel.`,
    ],
    solution: [
      `Let $x = ${written(e)}$`,
      p === 0 ? `$${k2}x = ${written(e, r)}$` : `$${k1}x = ${written(e, p)}$ and $${k2}x = ${written(e, p + r)}$`,
      `Subtract: $${k2}x - ${p === 0 ? '' : k1}x = ${A} - ${B}$, so $${bottom}x = ${top}$.`,
      `$x = ${fracTex(top, bottom)}${sd !== bottom ? ` = ${fracTex(sn, sd)}` : ''}$`,
    ],
  };
}

const TERMINATING = [2, 4, 5, 8, 10, 16, 20, 25, 40, 50];
const RECURRING = [3, 6, 7, 9, 11, 12, 15, 18, 21, 22, 24, 30, 33, 45];

function primeFactors(n: number): number[] {
  const out: number[] = [];
  let m = n;
  for (let p = 2; m > 1; p++) while (m % p === 0) {
    out.push(p);
    m /= p;
  }
  return out;
}

function fractionToRecurring(rng: Rng, d: Difficulty): Out {
  if (d === 3) {
    const wantRecurring = rng.chance(0.5);
    const pickFrac = (dens: number[]) => {
      const den = rng.pick(dens);
      return lowest(retry(() => rng.int(1, den - 1), (n) => gcd(n, den) === 1), den);
    };
    const odd = pickFrac(wantRecurring ? RECURRING : TERMINATING);
    const others: Array<[number, number]> = [];
    for (let i = 0; i < 40 && others.length < 3; i++) {
      const f = pickFrac(wantRecurring ? TERMINATING : RECURRING);
      if (!others.some((o) => o[1] === f[1])) others.push(f);
    }
    const show = ([n, den]: [number, number]) => `$${fracTex(n, den)}$`;
    const [on, od] = odd;
    const fac = primeFactors(od);
    return {
      prompt: `Which of these fractions ${wantRecurring ? 'gives a recurring decimal' : 'gives a terminating decimal'}?`,
      parts: [{ answer: mc(rng, show(odd), others.map(show)) }],
      hints: ['Write each fraction in its lowest terms and break the denominator into prime factors.', 'A fraction in its lowest terms terminates when the only prime factors of its denominator are $2$ and $5$; any other prime factor makes it recur.'],
      solution: [
        `$${fracTex(on, od)}$: ${fac.length === 1 ? `the denominator, $${od}$, is prime` : `the denominator is $${od} = ${fac.join(' \\times ')}$`}.`,
        wantRecurring ? `It has a prime factor other than $2$ and $5$, so the decimal recurs: $${fracTex(on, od)} = ${recurringTex(expand(on, od))}$.` : `Its only prime factors are $2$ and $5$, so the decimal terminates: $${fracTex(on, od)} = ${recurringTex(expand(on, od))}$.`,
        `Each of the other denominators ${wantRecurring ? 'has only the prime factors $2$ and $5$, so those fractions terminate' : 'has a prime factor other than $2$ and $5$, so those fractions recur'}.`,
      ],
    };
  }
  const dens = d === 1 ? [3, 9, 11, 7] : [6, 12, 15, 18, 22, 30, 36, 45];
  const [n, den] = retry(
    () => {
      const den = rng.pick(dens);
      return lowest(rng.int(1, den - 1), den);
    },
    ([n, den]) => {
      const e = expand(n, den);
      return e.rep !== '' && (d === 1 || e.pre.length > 0);
    },
    300,
  );
  const e = expand(n, den);
  const correct = `$${recurringTex(e)}$`;
  const digits = e.pre + e.rep;
  // Misplaced dots: the same digits with the block starting or ending in the wrong place.
  const wrong: string[] = [];
  for (let s = 0; s < digits.length; s++) {
    for (const len of [1, 2, 3]) {
      if (s + len > digits.length || (s === e.pre.length && len === e.rep.length)) continue;
      wrong.push(`$${recurringTex({ int: e.int, pre: digits.slice(0, s), rep: digits.slice(s, s + len) })}$`);
    }
  }
  wrong.push(`$${e.int}.${(e.pre + e.rep + e.rep).slice(0, 3)}$`, `$${recurringTex({ int: e.int, pre: `0${e.pre}`, rep: e.rep })}$`, `$${e.int}.${digits}$`);
  const wrongs = rng.shuffle(wrong.filter((w) => w !== correct));
  return {
    prompt: `Write $${fracTex(n, den)}$ as a recurring decimal.`,
    parts: [{ answer: mc(rng, correct, wrongs) }],
    hints: [`Divide $${n}$ by $${den}$ with short division, writing zeros after the decimal point, until a remainder repeats.`, 'Put a dot over the first and last digits of the block that repeats.'],
    solution: [
      `$${n} \\div ${den} = ${written(e)}$`,
      e.pre ? `The digit${e.pre.length > 1 ? 's' : ''} $${e.pre}$ ${e.pre.length > 1 ? 'do' : 'does'} not repeat; the block $${e.rep}$ repeats for ever.` : `The block $${e.rep}$ repeats for ever, starting straight after the point.`,
      `$${fracTex(n, den)} = ${recurringTex(e)}$`,
    ],
  };
}

export const ACCURACY_SKILLS: SkillDef[] = [
  skill({ id: 'mx-error-interval', name: 'Error intervals from rounding', description: 'Write the error interval of a number rounded to a given accuracy', outcomes: ['AC1'], lessonId: 'mx-7-1', gen: errorInterval }),
  skill({ id: 'mx-truncation-interval', name: 'Error intervals from truncation', description: 'Write the error interval of a truncated number, and tell it from a rounded one', outcomes: ['AC1'], lessonId: 'mx-7-1', gen: truncationInterval }),
  skill({ id: 'mx-bounds-calc', name: 'Bounds of a calculation', description: 'Find the upper or lower bound of a sum, difference, product or quotient of rounded numbers', outcomes: ['AC2'], lessonId: 'mx-7-2', calculator: true, gen: boundsCalc }),
  skill({ id: 'mx-bounds-problem', name: 'Bounds in problems', description: 'Find the bounds of a perimeter, area or speed worked out from rounded measurements', outcomes: ['AC2'], lessonId: 'mx-7-2', calculator: true, gen: boundsProblem }),
  skill({ id: 'mx-recurring-to-fraction', name: 'Recurring decimals as fractions', description: 'Write a recurring decimal as a fraction in its lowest terms', outcomes: ['AC3'], lessonId: 'mx-7-3', gen: recurringToFraction }),
  skill({ id: 'mx-fraction-to-recurring', name: 'Fractions as recurring decimals', description: 'Write a fraction as a recurring decimal, and tell which fractions recur', outcomes: ['AC3'], lessonId: 'mx-7-3', format: 'mc', gen: fractionToRecurring }),
];
