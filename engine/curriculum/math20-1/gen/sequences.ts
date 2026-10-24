/** Math 20-1 Unit 1 — Sequences and Series (RF9, RF10). */
import { mc, numPart, part, retry, skill } from '../../helpers.ts';
import type { GenOutput } from '../../helpers.ts';
import {
  type Frac,
  frac,
  fracAdd,
  fracDiv,
  fracMul,
  fracSub,
  fracValue,
  fmtFixed,
  fmtGroupTex,
  gcdAll,
  lcm,
  polyString,
  roundTo,
} from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Liam', 'Priya', 'Mateo', 'Aiyana', 'Noah', 'Mei', 'Owen', 'Fatima', 'Jasper', 'Simran', 'Kai', 'Chloé', 'Tariq', 'Nadia',
  'Ethan', 'Rajveer', 'Leah', 'Marcus', 'Sofia', 'Hiroshi', 'Zainab', 'Cole', 'Ananya', 'Wyatt', 'Thanh', 'Isabelle', 'Dakota', 'Gurpreet', 'Olumide',
];

const PLACES = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater', 'Elmwood', 'Oakdale'];

/** Remove floating-point noise. */
const cl = (x: number) => roundTo(x, 9);
/** A number for LaTeX, with thousands grouped. */
const nx = (x: number) => fmtGroupTex(cl(x), 6);
/** Negative numbers in brackets, for substitution. */
const px = (x: number) => (cl(x) < 0 ? `(${nx(x)})` : nx(x));
/** "+ 5" or "- 5", continuing an expression. */
const sx = (x: number) => (cl(x) < 0 ? `- ${nx(-x)}` : `+ ${nx(x)}`);

/** A fraction (or an integer) in LaTeX. */
function fl(f: Frac, big = false): string {
  if (f.d === 1) return nx(f.n);
  return `${f.n < 0 ? '-' : ''}${big ? '\\dfrac' : '\\frac'}{${nx(Math.abs(f.n))}}{${nx(f.d)}}`;
}
/** A value shown as a decimal (dec) or as a fraction. */
const fv = (f: Frac, dec: boolean) => (dec ? nx(fracValue(f)) : fl(f));
/** A value in brackets: (-3), \left(\frac{1}{2}\right). */
const fbr = (f: Frac, dec = false) => (f.d === 1 || dec ? `(${fv(f, dec)})` : `\\left(${fl(f)}\\right)`);
/** Negative values bracketed (after a minus sign). */
const fneg = (f: Frac, dec = false) => (f.n < 0 ? fbr(f, dec) : fv(f, dec));
/** "+ x" or "- x" for a fraction. */
const fsx = (f: Frac, dec = false) => (f.n < 0 ? `- ${fv(frac(-f.n, f.d), dec)}` : `+ ${fv(f, dec)}`);
/** The base of a power: 3, (-2), \left(\frac{1}{2}\right), 1.1, (-0.5). */
function rBase(r: Frac, dec = false): string {
  if (!dec && r.d !== 1) return `\\left(${fl(r)}\\right)`;
  return r.n < 0 ? `(${fv(r, dec)})` : fv(r, dec);
}

/** The base of a power written after a coefficient, always bracketed: 9(4)^5, 64\left(\frac{3}{4}\right)^8. */
const pbase = (r: Frac, dec = false) => (!dec && r.d !== 1 ? `\\left(${fl(r)}\\right)` : `(${fv(r, dec)})`);

function fpow(f: Frac, e: number): Frac {
  let out = frac(1);
  for (let i = 0; i < e; i++) out = fracMul(out, f);
  return out;
}

const fabs = (f: Frac) => frac(Math.abs(f.n), f.d);
/** A coefficient in front of a letter: 3r, -r, \frac{1}{2}r. */
const coef = (f: Frac) => (f.d === 1 && Math.abs(f.n) === 1 ? (f.n < 0 ? '-' : '') : fl(f));

/** A list of terms followed by an ellipsis. */
const seqTex = (terms: string[]) => `${terms.join(',\\ ')},\\ \\ldots`;

/** An infinite (or, with `last`, finite) series of numbers. */
function seriesNum(vals: number[], last?: number): string {
  let s = nx(vals[0]);
  for (const v of vals.slice(1)) s += ` ${sx(v)}`;
  s += ' + \\cdots';
  if (last !== undefined) s += ` + ${px(last)}`;
  return s;
}

/** An infinite (or, with `last`, finite) series of fractions or decimals. */
function seriesFrac(vals: Frac[], dec = false, last?: Frac): string {
  let s = fv(vals[0], dec);
  for (const v of vals.slice(1)) s += ` ${fsx(v, dec)}`;
  s += ' + \\cdots';
  if (last) s += ` ${fsx(last, dec)}`;
  return s;
}

function ord(k: number): string {
  const t = k % 100;
  const suf = t >= 11 && t <= 13 ? 'th' : (['th', 'st', 'nd', 'rd'][k % 10] ?? 'th');
  return `${k}${suf}`;
}

const group = (s: string) => s.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
/** Money to the cent, for prose (never inside maths). */
const cash = (x: number) => {
  const [i, f] = fmtFixed(x, 2).split('.');
  return `\\$${group(i)}.${f}`;
};
/** Whole-dollar money, for prose. */
const dollars = (x: number) => `\\$${group(String(Math.round(x)))}`;

/** True when x is safely away from a rounding boundary at `dp` decimal places. */
function safeRound(x: number, dp: number): boolean {
  const f = Math.abs(x) * 10 ** dp;
  return Math.abs(f - Math.floor(f) - 0.5) > 0.05;
}

function placesOf(x: number): number {
  for (let d = 0; d <= 6; d++) if (Math.abs(roundTo(x, d) - x) < 1e-9) return d;
  return 6;
}

/** An exact answer. A terminating decimal keeps its decimal form in review (34.3 m, not 34 3/10 m). */
function exactPart(value: number, opts: { label?: string; suffix?: string } = {}): Part {
  const v = cl(value);
  const d = placesOf(v);
  if (d === 0 || d > 4) return numPart(v, opts);
  return numPart(v, { ...opts, decimals: d, tolerance: 0.5 * 10 ** -d });
}

/** Round to `dp` places and show exactly that many places, thousands grouped (for LaTeX). */
const fixed = (x: number, dp: number) => {
  const [i, f] = fmtFixed(x, dp).split('.');
  return `${group(i).replace(/,/g, '{,}')}${f ? `.${f}` : ''}`;
};

// ---------------------------------------------------------------------------
// Arithmetic helpers
// ---------------------------------------------------------------------------

/** t_k from t_1 and d, as one display line. */
function nthStep(t1: number, d: number, k: number): string {
  return `$t_{${k}} = t_1 + (${k} - 1)d = ${nx(t1)} + (${k - 1})(${nx(d)}) = ${nx(t1)} ${sx((k - 1) * d)} = ${nx(t1 + (k - 1) * d)}$`;
}

/** General term t_n = dn + (t_1 - d), with steps and a check at n = ci. */
function generalSteps(t1: number, d: number, ci = 2): { expected: string; steps: string[] } {
  const a = cl(d);
  const b = cl(t1 - d);
  const expected = polyString([[a, 'n'], [b, '']]);
  const tc = cl(a * ci + b);
  const expanded = polyString([[cl(t1), ''], [a, 'n'], [cl(-d), '']]);
  return {
    expected,
    steps: [
      `$t_n = t_1 + (n - 1)d = ${nx(t1)} + (n - 1)(${nx(d)})$`,
      `Expand: $t_n = ${expanded}$`,
      ...(expanded === expected ? [] : [`Collect like terms: $t_n = ${expected}$`]),
      `Check with $n = ${ci}$: $${nx(a)}(${ci})${b === 0 ? '' : ` ${sx(b)}`} = ${nx(tc)}$, which is $t_{${ci}}$.`,
    ],
  };
}

/** S_k from t_1 and d. */
function sumStepD(t1: number, d: number, k: number): string {
  const inner = cl(2 * t1 + (k - 1) * d);
  const S = cl((k * inner) / 2);
  const half = k % 2 === 0 ? nx(k / 2) : `\\dfrac{${k}}{2}`;
  return `$S_{${k}} = \\dfrac{n}{2}\\left[2t_1 + (n - 1)d\\right] = \\dfrac{${k}}{2}\\left[2(${nx(t1)}) + (${k - 1})(${nx(d)})\\right] = ${half}(${nx(2 * t1)} ${sx((k - 1) * d)}) = ${half}(${nx(inner)}) = ${nx(S)}$`;
}

/** S_k from t_1 and t_k. */
function sumStepL(t1: number, tk: number, k: number): string {
  const S = cl((k * (t1 + tk)) / 2);
  return `$S_{${k}} = \\dfrac{n(t_1 + t_n)}{2} = \\dfrac{${k}(${nx(t1)} ${sx(tk)})}{2} = \\dfrac{${k}(${nx(t1 + tk)})}{2} = ${nx(S)}$`;
}

const arithSum = (t1: number, d: number, k: number) => cl((k * (2 * t1 + (k - 1) * d)) / 2);

/** Steps solving S = n/2[2t_1 + (n - 1)d] for n (a quadratic), rejecting the negative root. */
function solveForN(t1: number, d: number, S: number, nTrue: number, noun: string): string[] {
  const raw = [d, 2 * t1 - d, -2 * S];
  let k = 1;
  while (k < 100 && !raw.every((v) => Math.abs(v * k - Math.round(v * k)) < 1e-6)) k++;
  let [A, B, C] = raw.map((v) => Math.round(v * k));
  const g = gcdAll([A, B, C]) || 1;
  [A, B, C] = [A / g, B / g, C / g];
  const other = frac(-B - A * nTrue, A);
  const steps = [
    `$${nx(S)} = \\dfrac{n}{2}\\left[2(${nx(t1)}) + (n - 1)(${nx(d)})\\right]$`,
    `Multiply both sides by 2 and simplify the bracket: $${nx(2 * S)} = n(${polyString([[cl(d), 'n'], [cl(2 * t1 - d), '']])})$`,
    `Expand and rearrange${k !== 1 || g !== 1 ? ', then simplify the coefficients' : ''}: $${polyString([[A, 'n^2'], [B, 'n'], [C, '']])} = 0$`,
  ];
  if (A === 1 && other.d === 1) {
    steps.push(`Factor: $(n ${sx(-nTrue)})(n ${sx(-other.n)}) = 0$`);
  } else {
    const disc = B * B - 4 * A * C;
    const s = Math.round(Math.sqrt(disc));
    steps.push(
      `Quadratic formula: $n = \\dfrac{-${px(B)} \\pm \\sqrt{${px(B)}^2 - 4(${A})${px(C)}}}{2(${A})} = \\dfrac{${nx(-B)} \\pm ${nx(s)}}{${2 * A}}$`,
    );
  }
  steps.push(`$n = ${nTrue}$ or $n = ${fl(other)}$. The number of ${noun} cannot be negative, so $n = ${nTrue}$.`);
  return steps;
}

/** Steps for "which term is v?" in an arithmetic sequence. */
function whichTermSteps(t1: number, d: number, v: number, m: number): string[] {
  return [
    `$t_1 = ${nx(t1)}$ and $d = ${nx(d)}$. Substitute $t_n = ${nx(v)}$ into $t_n = t_1 + (n - 1)d$:`,
    `$${nx(v)} = ${nx(t1)} + (n - 1)(${nx(d)})$`,
    `$${nx(v - t1)} = ${nx(d)}(n - 1)$`,
    `$n - 1 = ${m - 1}$, so $n = ${m}$`,
  ];
}

// ---------------------------------------------------------------------------
// Lesson 1.1 — Arithmetic sequences
// ---------------------------------------------------------------------------

function arithTermD2(rng: Rng): GenOutput {
  const mode = rng.pick(['dec', 'frac', 'big'] as const);
  const hints = ['Find $d$ by subtracting consecutive terms. It may be negative or a fraction.', 'Then use $t_n = t_1 + (n - 1)d$.'];
  if (mode === 'frac') {
    const q = rng.pick([2, 3, 4, 5, 6]);
    const a = rng.int(-6, 12);
    const b = retry(() => rng.int(1, 2 * q - 1), (x) => x % q !== 0) * (rng.chance(0.3) ? -1 : 1);
    const k = rng.int(12, 30);
    const terms = [0, 1, 2, 3].map((i) => frac(a + i * b, q));
    const t1 = frac(a, q);
    const d = frac(b, q);
    const prod = frac((k - 1) * b, q);
    const tk = frac(a + (k - 1) * b, q);
    return {
      prompt: `Find $t_{${k}}$ for the arithmetic sequence $${seqTex(terms.map((f) => fl(f)))}$.`,
      parts: [numPart(fracValue(tk), { label: `$t_{${k}} =$` })],
      hints,
      solution: [
        `$d = t_2 - t_1 = ${fl(terms[1])} - ${fneg(t1)} = ${fl(d)}$`,
        `$t_{${k}} = t_1 + (${k} - 1)d = ${fl(t1)} + (${k - 1})${fbr(d)} = ${fl(t1)} ${fsx(prod)} = ${fl(tk)}$`,
        `So $t_{${k}} = ${fl(tk)}$.`,
      ],
    };
  }
  let t1: number;
  let d: number;
  let k: number;
  if (mode === 'dec') {
    const u = rng.pick([0.1, 0.25, 0.5]);
    const B = retry(() => rng.int(1, u === 0.1 ? 25 : 9), (x) => Math.abs(x * u - Math.round(x * u)) > 1e-9);
    t1 = cl(rng.int(-20, 40) * u);
    d = cl(B * u * (rng.chance(0.35) ? -1 : 1));
    k = rng.int(15, 40);
  } else {
    t1 = rng.int(60, 250);
    d = -rng.int(3, 15);
    k = rng.int(30, 80);
  }
  const terms = [0, 1, 2, 3].map((i) => cl(t1 + i * d));
  const tk = cl(t1 + (k - 1) * d);
  return {
    prompt: `Find $t_{${k}}$ for the arithmetic sequence $${seqTex(terms.map(nx))}$.`,
    parts: [exactPart(tk, { label: `$t_{${k}} =$` })],
    hints,
    solution: [`$d = t_2 - t_1 = ${nx(terms[1])} - ${px(t1)} = ${nx(d)}$`, nthStep(t1, d, k), `So $t_{${k}} = ${nx(tk)}$.`],
  };
}

function arithTermD3(rng: Rng): GenOutput {
  const half = rng.chance(0.25);
  const d = half ? rng.sign() * (rng.int(1, 6) + 0.5) : rng.sign() * rng.int(2, 9);
  const t1 = rng.int(-20, 30);
  const p = rng.int(2, 6);
  const q = p + rng.int(3, 9);
  const k = rng.chance(0.3) ? 1 : q + rng.int(4, 25);
  const t = (i: number) => cl(t1 + (i - 1) * d);
  const m = q - p;
  const back = p - 1 === 1 ? 'd' : `${p - 1}d`;
  const steps = [
    `From $t_{${p}}$ to $t_{${q}}$ there are $${q} - ${p} = ${m}$ steps of $d$, so $t_{${q}} = t_{${p}} + ${m}d$.`,
    `$${nx(t(q))} = ${nx(t(p))} + ${m}d$, so $${m}d = ${nx(t(q) - t(p))}$ and $d = ${nx(d)}$.`,
    `Work back to the first term: $t_1 = t_{${p}} - ${back} = ${nx(t(p))} - ${p - 1}(${nx(d)}) = ${nx(t1)}$`,
  ];
  if (k !== 1) steps.push(nthStep(t1, d, k));
  steps.push(`So $d = ${nx(d)}$ and $t_{${k}} = ${nx(t(k))}$.`);
  return {
    prompt: `In an arithmetic sequence, $t_{${p}} = ${nx(t(p))}$ and $t_{${q}} = ${nx(t(q))}$. Find the common difference $d$ and ${k === 1 ? 'the first term $t_1$' : `the term $t_{${k}}$`}.`,
    parts: [exactPart(d, { label: '$d =$' }), exactPart(t(k), { label: `$t_{${k}} =$` })],
    hints: [`How many steps of $d$ does it take to get from $t_{${p}}$ to $t_{${q}}$?`, 'Divide the difference of the two terms by the number of steps to get $d$. Then work back to $t_1$ and use $t_n = t_1 + (n - 1)d$.'],
    solution: steps,
  };
}

const arithTerm = skill({
  id: 'm201-arith-term',
  name: 'Terms of an arithmetic sequence',
  description: 'Find the common difference and any term of an arithmetic sequence, including from two non-consecutive terms.',
  outcomes: ['RF9'],
  lessonId: 'm201-1-1',
  calculator: true,
  gen(rng, diff) {
    if (diff === 2) return arithTermD2(rng);
    if (diff === 3) return arithTermD3(rng);
    const d = rng.int(2, 9) * (rng.chance(0.3) ? -1 : 1);
    const t1 = rng.int(-12, 25);
    const k = rng.int(9, 30);
    const terms = [0, 1, 2, 3].map((i) => t1 + i * d);
    const tk = t1 + (k - 1) * d;
    return {
      prompt: `For the arithmetic sequence $${seqTex(terms.map(nx))}$, find the common difference $d$ and the term $t_{${k}}$.`,
      parts: [numPart(d, { label: '$d =$' }), numPart(tk, { label: `$t_{${k}} =$` })],
      hints: ['Subtract any term from the term that follows it to find $d$.', `Use $t_n = t_1 + (n - 1)d$ with $n = ${k}$.`],
      solution: [`$d = t_2 - t_1 = ${nx(terms[1])} - ${px(t1)} = ${nx(d)}$`, nthStep(t1, d, k), `So $d = ${nx(d)}$ and $t_{${k}} = ${nx(tk)}$.`],
    };
  },
});

// ---- General term ---------------------------------------------------------

const exprPart = (expected: string, label = '$t_n =$'): Part =>
  part({ kind: 'expression', expected, form: 'expanded' }, { label, placeholder: 'e.g. 4n + 3' });

interface GenCtx {
  intro: string;
  what: string;
  setup: string[];
  t1: number;
  d: number;
  k: number;
  ask: string;
  check?: number;
  part2: (v: number) => Part;
  say: (v: number) => string;
}

const GEN_CONTEXTS: Array<(rng: Rng) => GenCtx> = [
  (rng) => {
    const t1 = rng.int(14, 30);
    const d = rng.int(2, 4);
    const k = rng.int(18, 35);
    return {
      intro: `The first row of a community theatre in ${rng.pick(PLACES)} has ${t1} seats, and each row has ${d} more seats than the row in front of it.`,
      what: 'the number of seats in row $n$',
      setup: [`The rows form an arithmetic sequence with $t_1 = ${t1}$ and $d = ${d}$.`],
      t1, d, k,
      ask: `How many seats are in row ${k}?`,
      part2: (v) => numPart(v, { label: `(b) Row ${k}:`, suffix: 'seats' }),
      say: (v) => `Row ${k} has ${nx(v)} seats.`,
    };
  },
  (rng) => {
    const d = rng.int(2, 5);
    const t1 = rng.int(12, 28);
    const p = rng.int(3, 6);
    const q = p + rng.int(4, 9);
    const k = q + rng.int(5, 15);
    const tp = t1 + (p - 1) * d;
    const tq = t1 + (q - 1) * d;
    return {
      intro: `The numbers of seats in the rows of a concert hall form an arithmetic sequence. Row ${p} has ${tp} seats and row ${q} has ${tq} seats.`,
      what: 'the number of seats in row $n$',
      setup: [
        `$t_{${q}} = t_{${p}} + ${q - p}d$: $${tq} = ${tp} + ${q - p}d$, so $d = \\dfrac{${tq - tp}}{${q - p}} = ${d}$.`,
        `$t_1 = t_{${p}} - ${p - 1}d = ${tp} - ${p - 1}(${d}) = ${t1}$`,
      ],
      t1, d, k, check: p,
      ask: `How many seats are in row ${k}?`,
      part2: (v) => numPart(v, { label: `(b) Row ${k}:`, suffix: 'seats' }),
      say: (v) => `Row ${k} has ${nx(v)} seats.`,
    };
  },
  (rng) => {
    const name = rng.pick(NAMES);
    const start = rng.int(10, 30) * 10;
    const d = rng.pick([15, 20, 25, 30, 40, 50]);
    const k = rng.int(12, 52);
    return {
      intro: `${name} opens a savings account with ${dollars(start)} and deposits ${dollars(d)} at the end of every week. There is no interest and no withdrawals. Let $t_n$ be the balance, in dollars, at the end of week $n$.`,
      what: 'the balance at the end of week $n$',
      setup: [`At the end of week 1 the balance is $${start} + ${d} = ${start + d}$, so $t_1 = ${start + d}$ and $d = ${d}$.`],
      t1: start + d, d, k,
      ask: `What is the balance at the end of week ${k}?`,
      part2: (v) => numPart(v, { label: `(b) Week ${k}: \\$` }),
      say: (v) => `The balance at the end of week ${k} is ${dollars(v)}.`,
    };
  },
  (rng) => {
    const w = rng.pick([
      { where: 'Earth', a: 4.9, d: 9.8 },
      { where: 'the Moon', a: 0.8, d: 1.6 },
      { where: 'Mars', a: 1.85, d: 3.7 },
    ]);
    const k = rng.int(4, 12);
    return {
      intro: `Ignoring air resistance, on ${w.where} an object dropped from rest falls $${w.a}$ m during the first second. During each second after that, it falls $${w.d}$ m more than during the second before.`,
      what: 'the distance, in metres, the object falls during second $n$',
      setup: [`The distances form an arithmetic sequence with $t_1 = ${w.a}$ and $d = ${w.d}$.`],
      t1: w.a, d: w.d, k,
      ask: `How far does the object fall during second ${k}?`,
      part2: (v) => exactPart(v, { label: `(b) Second ${k}:`, suffix: 'm' }),
      say: (v) => `The object falls $${nx(v)}$ m during second ${k}.`,
    };
  },
  (rng) => {
    const thing = rng.pick([
      { one: 'plastic chair', many: 'chairs', h: rng.int(76, 88), d: rng.int(4, 8) },
      { one: 'paper cup', many: 'cups', h: rng.int(9, 14), d: rng.pick([1.2, 1.5, 0.8]) },
      { one: 'shopping cart', many: 'carts', h: rng.int(95, 110), d: rng.int(18, 25) },
    ]);
    const k = rng.int(8, 30);
    const flat = thing.many === 'carts';
    return {
      intro: flat
        ? `One shopping cart is ${thing.h} cm long. When carts are nested in a line, each extra cart adds ${thing.d} cm to the length of the line.`
        : `One ${thing.one} is ${thing.h} cm tall. Each extra ${thing.one} added to a stack adds ${thing.d} cm to the height.`,
      what: flat ? `the length, in centimetres, of a line of $n$ nested carts` : `the height, in centimetres, of a stack of $n$ ${thing.many}`,
      setup: [`The ${flat ? 'lengths' : 'heights'} form an arithmetic sequence with $t_1 = ${thing.h}$ and $d = ${thing.d}$.`],
      t1: thing.h, d: thing.d, k,
      ask: flat ? `How long is a line of ${k} nested carts?` : `How tall is a stack of ${k} ${thing.many}?`,
      part2: (v) => exactPart(v, { label: `(b) ${k} ${thing.many}:`, suffix: 'cm' }),
      say: (v) => `${flat ? 'The line' : 'The stack'} of ${k} ${thing.many} is $${nx(v)}$ cm ${flat ? 'long' : 'tall'}.`,
    };
  },
];

const arithGeneral = skill({
  id: 'm201-arith-general',
  name: 'The general term of an arithmetic sequence',
  description: 'Write the general term tₙ = t₁ + (n − 1)d of an arithmetic sequence in simplified form, including from a context.',
  outcomes: ['RF9'],
  lessonId: 'm201-1-1',
  calculator: true,
  gen(rng, diff) {
    if (diff === 1) {
      const d = rng.int(2, 9);
      const t1 = rng.int(-10, 20);
      const terms = [0, 1, 2, 3].map((i) => t1 + i * d);
      const { expected, steps } = generalSteps(t1, d);
      return {
        prompt: `Write the general term $t_n$ of the arithmetic sequence $${seqTex(terms.map(nx))}$. Simplify your answer.`,
        parts: [exprPart(expected)],
        hints: ['Find $t_1$ and the common difference $d$ first.', 'Substitute them into $t_n = t_1 + (n - 1)d$, expand, and collect like terms.'],
        solution: [`$t_1 = ${nx(t1)}$ and $d = ${nx(terms[1])} - ${px(t1)} = ${d}$`, ...steps, `The general term is $t_n = ${expected}$.`],
      };
    }
    if (diff === 2) {
      const mode = rng.pick(['neg', 'dec', 'later'] as const);
      if (mode === 'later') {
        const d = rng.nonZero(-8, 8);
        const t1 = rng.int(-15, 25);
        const p = rng.int(3, 8);
        const tp = [0, 1, 2].map((i) => t1 + (p - 1 + i) * d);
        const { expected, steps } = generalSteps(t1, d, p);
        return {
          prompt: `The ${ord(p)}, ${ord(p + 1)} and ${ord(p + 2)} terms of an arithmetic sequence are $${tp[0]}$, $${tp[1]}$ and $${tp[2]}$. Write the general term $t_n$ in simplified form.`,
          parts: [exprPart(expected)],
          hints: ['The common difference is the difference between consecutive terms.', `Work back from $t_{${p}}$ to $t_1$: $t_1 = t_{${p}} - ${p - 1}d$.`],
          solution: [
            `$d = ${nx(tp[1])} - ${px(tp[0])} = ${nx(d)}$`,
            `$t_1 = t_{${p}} - ${p - 1}d = ${nx(tp[0])} - ${p - 1}(${nx(d)}) = ${nx(t1)}$`,
            ...steps,
            `The general term is $t_n = ${expected}$.`,
          ],
        };
      }
      const d = mode === 'neg' ? -rng.int(2, 9) : cl(rng.pick([0.5, 1.5, 2.5, 0.2, 0.4, 1.2, 0.25, 0.75, 3.5]) * (rng.chance(0.4) ? -1 : 1));
      const t1 = mode === 'neg' ? rng.int(10, 60) : cl(rng.int(-10, 30) * 0.5);
      const terms = [0, 1, 2, 3].map((i) => cl(t1 + i * d));
      const { expected, steps } = generalSteps(t1, d);
      return {
        prompt: `Write the general term $t_n$ of the arithmetic sequence $${seqTex(terms.map(nx))}$. Simplify your answer.`,
        parts: [exprPart(expected)],
        hints: ['Find $d = t_2 - t_1$. Watch the sign.', 'Substitute into $t_n = t_1 + (n - 1)d$, expand, and collect like terms.'],
        solution: [`$t_1 = ${nx(t1)}$ and $d = ${nx(terms[1])} - ${px(t1)} = ${nx(d)}$`, ...steps, `The general term is $t_n = ${expected}$.`],
      };
    }
    const c = rng.pick(GEN_CONTEXTS)(rng);
    const { expected, steps } = generalSteps(c.t1, c.d, c.check ?? 2);
    const a = cl(c.d);
    const b = cl(c.t1 - c.d);
    const v = cl(a * c.k + b);
    return {
      prompt: `${c.intro}\n\n(a) Write the general term $t_n$ for ${c.what}, in simplified form.\n\n(b) ${c.ask}`,
      parts: [exprPart(expected, '(a) $t_n =$'), c.part2(v)],
      hints: ['Decide what $t_1$ (the first term) and $d$ (the change from one term to the next) are in this situation.', 'Substitute into $t_n = t_1 + (n - 1)d$ and simplify. Then substitute the value of $n$ for part (b).'],
      solution: [...c.setup, ...steps, `(b) $t_{${c.k}} = ${nx(a)}(${c.k})${b === 0 ? '' : ` ${sx(b)}`} = ${nx(v)}$`, c.say(v)],
    };
  },
});

// ---- Unknowns: n, t1, d ---------------------------------------------------

function unknownContext(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const place = rng.pick(PLACES);
  const kind = rng.pick(['row', 'week', 'train', 'loan', 'first', 'dive', 'fall'] as const);
  if (kind === 'row') {
    const t1 = rng.int(12, 30);
    const d = rng.int(2, 4);
    const m = rng.int(12, 35);
    const v = t1 + (m - 1) * d;
    return {
      prompt: `The first row of a section in an arena in ${place} has ${t1} seats, and each row has ${d} more seats than the row in front of it. Which row has ${v} seats?`,
      parts: [numPart(m, { label: 'Row' })],
      hints: ['The rows form an arithmetic sequence. What are $t_1$ and $d$?', `Solve $${v} = t_1 + (n - 1)d$ for $n$.`],
      solution: [...whichTermSteps(t1, d, v, m), `Row ${m} has ${v} seats.`],
      calculator: true,
    };
  }
  if (kind === 'week') {
    const t1 = rng.int(6, 25) * 10;
    const d = rng.pick([15, 20, 25, 30, 35, 40]);
    const m = rng.int(12, 40);
    const v = t1 + (m - 1) * d;
    return {
      prompt: `At the end of week 1, ${name} has ${dollars(t1)} in a savings account. ${name} deposits ${dollars(d)} at the end of every week after that and makes no withdrawals. At the end of which week will the balance be ${dollars(v)}?`,
      parts: [numPart(m, { label: 'Week' })],
      hints: ['The weekly balances form an arithmetic sequence with $t_1$ equal to the week 1 balance.', `Solve $${v} = t_1 + (n - 1)d$ for $n$.`],
      solution: [...whichTermSteps(t1, d, v, m), `The balance is ${dollars(v)} at the end of week ${m}.`],
      calculator: true,
    };
  }
  if (kind === 'train') {
    const a = rng.int(2, 6);
    const d = rng.pick([0.25, 0.5, 0.2, 0.4, 0.3, 0.75]);
    const m = retry(() => rng.int(10, 30), (x) => Number.isInteger(cl((x - 1) * d * 100)) && cl(a + (x - 1) * d) <= 25);
    const b = cl(a + (m - 1) * d);
    return {
      prompt: `${name} is training for a race in ${place}. On day 1, ${name} runs $${a}$ km. The distance increases by the same amount each day, and on day ${m}, ${name} runs $${nx(b)}$ km. By how much does the distance increase each day?`,
      parts: [exactPart(d, { label: 'Increase per day:', suffix: 'km' })],
      hints: ['The daily distances form an arithmetic sequence. You know $t_1$ and one later term.', `Solve $${nx(b)} = ${a} + (${m} - 1)d$ for $d$.`],
      solution: [`$t_1 = ${a}$ and $t_{${m}} = ${nx(b)}$`, `$${nx(b)} = ${a} + (${m} - 1)d$`, `$${nx(b - a)} = ${m - 1}d$`, `$d = \\dfrac{${nx(b - a)}}{${m - 1}} = ${nx(d)}$`, `The distance increases by $${nx(d)}$ km each day.`],
      calculator: true,
    };
  }
  if (kind === 'loan') {
    const dec = rng.int(5, 16) * 50;
    const m = rng.int(8, 30);
    const bm = rng.int(10, 60) * 100;
    const b1 = bm + (m - 1) * dec;
    return {
      prompt: `${name} pays off a car loan with equal monthly payments and no interest. After the first payment, the balance owing is ${dollars(b1)}. After the ${ord(m)} payment, it is ${dollars(bm)}. By how much does the balance decrease each month?`,
      parts: [numPart(dec, { label: 'Decrease per month: \\$' })],
      hints: ['The balances form an arithmetic sequence with a negative common difference.', `Solve $${nx(bm)} = ${nx(b1)} + (${m} - 1)d$ for $d$.`],
      solution: [`$t_1 = ${nx(b1)}$ and $t_{${m}} = ${nx(bm)}$`, `$${nx(bm)} = ${nx(b1)} + (${m} - 1)d$`, `$${nx(bm - b1)} = ${m - 1}d$`, `$d = ${nx(-dec)}$`, `The balance decreases by ${dollars(dec)} each month.`],
      calculator: true,
    };
  }
  if (kind === 'first') {
    const d = rng.int(2, 4);
    const k = rng.int(10, 30);
    const t1 = rng.int(10, 30);
    const tk = t1 + (k - 1) * d;
    return {
      prompt: `Each row of seats in a stadium section has ${d} more seats than the row in front of it. Row ${k} has ${tk} seats. How many seats are in the first row?`,
      parts: [numPart(t1, { label: 'Row 1:', suffix: 'seats' })],
      hints: ['You know $d$ and one term, $t_{' + k + '}$.', `Solve $${tk} = t_1 + (${k} - 1)(${d})$ for $t_1$.`],
      solution: [`The rows form an arithmetic sequence with $d = ${d}$: $t_{${k}} = t_1 + (${k} - 1)d$`, `$${tk} = t_1 + (${k - 1})(${d}) = t_1 + ${(k - 1) * d}$`, `$t_1 = ${tk} - ${(k - 1) * d} = ${t1}$`, `The first row has ${t1} seats.`],
      calculator: true,
    };
  }
  if (kind === 'dive') {
    const t1 = rng.int(3, 9) * 10;
    const d = rng.pick([10, 12, 15, 18, 20, 25]);
    const m = rng.int(10, 30);
    const v = t1 + (m - 1) * d;
    return {
      prompt: `A research submersible off the coast of British Columbia is $${t1}$ m below the surface after 1 minute. It then descends $${d}$ m every minute. After how many minutes is it $${v}$ m below the surface?`,
      parts: [numPart(m, { label: 'Time:', suffix: 'minutes' })],
      hints: ['The depths after 1, 2, 3, … minutes form an arithmetic sequence.', `Solve $${v} = t_1 + (n - 1)d$ for $n$.`],
      solution: [...whichTermSteps(t1, d, v, m), `It is $${v}$ m deep after ${m} minutes.`],
      calculator: true,
    };
  }
  const w = rng.pick([
    { where: 'Earth', a: 4.9, d: 9.8 },
    { where: 'the Moon', a: 0.8, d: 1.6 },
  ]);
  const m = rng.int(5, 15);
  const v = cl(w.a + (m - 1) * w.d);
  return {
    prompt: `Ignoring air resistance, on ${w.where} an object dropped from rest falls $${w.a}$ m during the first second. During each second after that, it falls $${w.d}$ m more than during the second before. During which second does it fall $${nx(v)}$ m?`,
    parts: [numPart(m, { label: 'Second number:' })],
    hints: ['The distances fallen during each second form an arithmetic sequence.', `Solve $${nx(v)} = t_1 + (n - 1)d$ for $n$.`],
    solution: [...whichTermSteps(w.a, w.d, v, m), `It falls $${nx(v)}$ m during second ${m}.`],
    calculator: true,
  };
}

const arithUnknown = skill({
  id: 'm201-arith-unknown',
  name: 'Finding n, t₁ or d',
  description: 'Find the position of a term, the number of terms, the first term or the common difference of an arithmetic sequence.',
  outcomes: ['RF9'],
  lessonId: 'm201-1-1',
  calculator: true,
  gen(rng, diff) {
    if (diff === 3) return unknownContext(rng);
    if (diff === 1) {
      const d = rng.int(2, 9) * (rng.chance(0.25) ? -1 : 1);
      const t1 = rng.int(-10, 20);
      const m = rng.int(15, 45);
      const v = t1 + (m - 1) * d;
      const terms = [0, 1, 2].map((i) => t1 + i * d);
      return {
        prompt: `Which term of the arithmetic sequence $${seqTex(terms.map(nx))}$ is $${nx(v)}$?`,
        parts: [numPart(m, { label: '$n =$' })],
        hints: ['Find $t_1$ and $d$.', `Substitute $t_n = ${nx(v)}$ into $t_n = t_1 + (n - 1)d$ and solve for $n$.`],
        solution: [...whichTermSteps(t1, d, v, m), `$${nx(v)}$ is the ${ord(m)} term, $t_{${m}}$.`],
      };
    }
    const mode = rng.pick(['count', 'first', 'diff'] as const);
    if (mode === 'count') {
      const d = rng.int(2, 12) * (rng.chance(0.35) ? -1 : 1);
      const t1 = rng.int(-20, 40);
      const m = rng.int(18, 60);
      const v = t1 + (m - 1) * d;
      const terms = [0, 1, 2].map((i) => t1 + i * d);
      return {
        prompt: `How many terms are in the arithmetic sequence $${terms.map(nx).join(',\\ ')},\\ \\ldots,\\ ${nx(v)}$?`,
        parts: [numPart(m, { label: 'Number of terms:' })],
        hints: ['The last term is $t_n$, where $n$ is the number of terms.', `Solve $${nx(v)} = t_1 + (n - 1)d$ for $n$.`],
        solution: [...whichTermSteps(t1, d, v, m), `The sequence has ${m} terms.`],
      };
    }
    if (mode === 'first') {
      const d = rng.nonZero(-9, 9);
      const k = rng.int(8, 40);
      const t1 = rng.int(-30, 40);
      const tk = t1 + (k - 1) * d;
      return {
        prompt: `In an arithmetic sequence, $t_{${k}} = ${nx(tk)}$ and $d = ${d}$. Find the first term, $t_1$.`,
        parts: [numPart(t1, { label: '$t_1 =$' })],
        hints: ['Use $t_n = t_1 + (n - 1)d$ with the term you know.', `Substitute $n = ${k}$, $t_{${k}} = ${nx(tk)}$ and $d = ${d}$, then solve for $t_1$.`],
        solution: [`$t_{${k}} = t_1 + (${k} - 1)d$`, `$${nx(tk)} = t_1 + (${k - 1})(${d})$`, `$${nx(tk)} = t_1 ${sx((k - 1) * d)}$`, `$t_1 = ${nx(tk)} ${sx(-(k - 1) * d)} = ${nx(t1)}$`],
      };
    }
    const d = rng.chance(0.3) ? rng.sign() * (rng.int(1, 5) + 0.5) : rng.nonZero(-9, 9);
    const t1 = rng.int(-25, 30);
    const k = retry(() => rng.int(10, 41), (x) => Number.isInteger(cl((x - 1) * d)));
    const tk = cl(t1 + (k - 1) * d);
    return {
      prompt: `In an arithmetic sequence, $t_1 = ${nx(t1)}$ and $t_{${k}} = ${nx(tk)}$. Find the common difference, $d$.`,
      parts: [exactPart(d, { label: '$d =$' })],
      hints: [`From $t_1$ to $t_{${k}}$ there are $${k - 1}$ steps of $d$.`, `Solve $${nx(tk)} = ${nx(t1)} + (${k} - 1)d$ for $d$.`],
      solution: [`$t_{${k}} = t_1 + (${k} - 1)d$`, `$${nx(tk)} = ${nx(t1)} + ${k - 1}d$`, `$${k - 1}d = ${nx(tk - t1)}$`, `$d = \\dfrac{${nx(tk - t1)}}{${k - 1}} = ${nx(d)}$`],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 1.2 — Arithmetic series
// ---------------------------------------------------------------------------

function arithSumD3(rng: Rng): GenOutput {
  const mode = rng.pick(['two', 'diff', 'multiples'] as const);
  if (mode === 'two') {
    const d = rng.nonZero(-7, 7);
    const t1 = rng.int(-20, 30);
    const p = rng.int(2, 5);
    const q = p + rng.int(3, 8);
    const k = rng.int(15, 35);
    const t = (i: number) => t1 + (i - 1) * d;
    const S = arithSum(t1, d, k);
    return {
      prompt: `In an arithmetic series, $t_{${p}} = ${t(p)}$ and $t_{${q}} = ${t(q)}$. Find $S_{${k}}$, the sum of the first ${k} terms.`,
      parts: [numPart(S, { label: `$S_{${k}} =$` })],
      hints: [`Find $d$ first: from $t_{${p}}$ to $t_{${q}}$ there are $${q - p}$ steps of $d$.`, 'Work back to $t_1$, then use $S_n = \\dfrac{n}{2}\\left[2t_1 + (n - 1)d\\right]$.'],
      solution: [
        `$t_{${q}} = t_{${p}} + ${q - p}d$: $${t(q)} = ${t(p)} + ${q - p}d$, so $d = \\dfrac{${t(q) - t(p)}}{${q - p}} = ${d}$`,
        `$t_1 = t_{${p}} - ${p - 1}d = ${t(p)} - ${p - 1}(${d}) = ${t1}$`,
        sumStepD(t1, d, k),
        `So $S_{${k}} = ${nx(S)}$.`,
      ],
    };
  }
  if (mode === 'diff') {
    const d = rng.nonZero(-6, 9);
    const t1 = rng.int(-15, 30);
    const k = rng.int(10, 30);
    const S = arithSum(t1, d, k);
    const m = cl((2 * S) / k);
    return {
      prompt: `The sum of the first ${k} terms of an arithmetic series is $${nx(S)}$, and the first term is $${t1}$. Find the common difference, $d$.`,
      parts: [numPart(d, { label: '$d =$' })],
      hints: ['Substitute what you know into $S_n = \\dfrac{n}{2}\\left[2t_1 + (n - 1)d\\right]$.', `Multiply both sides by $\\dfrac{2}{${k}}$, then solve the linear equation for $d$.`],
      solution: [
        `$${nx(S)} = \\dfrac{${k}}{2}\\left[2(${t1}) + (${k} - 1)d\\right]$`,
        `Multiply both sides by $\\dfrac{2}{${k}}$: $${nx(m)} = ${2 * t1} + ${k - 1}d$`,
        `$${k - 1}d = ${nx(m - 2 * t1)}$`,
        `$d = ${d}$`,
      ],
    };
  }
  const { m, A, B } = retry(
    () => ({ m: rng.int(3, 13), A: rng.int(20, 200), B: rng.int(400, 1000) }),
    (o) => o.A % o.m !== 0 && o.B % o.m !== 0,
  );
  const first = Math.ceil(A / m) * m;
  const last = Math.floor(B / m) * m;
  const n = (last - first) / m + 1;
  const S = (n * (first + last)) / 2;
  return {
    prompt: `Find the sum of all the multiples of ${m} between ${A} and ${B}.`,
    parts: [numPart(S, { label: 'Sum:' })],
    hints: [`Find the first and last multiples of ${m} in the range. They are $t_1$ and $t_n$, with $d = ${m}$.`, 'Find $n$ from $t_n = t_1 + (n - 1)d$, then use $S_n = \\dfrac{n(t_1 + t_n)}{2}$.'],
    solution: [
      `The first multiple of ${m} after ${A} is $${first}$, and the last one before ${B} is $${last}$.`,
      `$${last} = ${first} + (n - 1)(${m})$, so $n - 1 = \\dfrac{${last - first}}{${m}} = ${n - 1}$ and $n = ${n}$.`,
      sumStepL(first, last, n),
      `The sum is $${nx(S)}$.`,
    ],
  };
}

const arithSumSkill = skill({
  id: 'm201-arith-sum',
  name: 'Sum of an arithmetic series',
  description: 'Find the sum of an arithmetic series with Sₙ = n(t₁ + tₙ)/2 or Sₙ = n[2t₁ + (n − 1)d]/2, finding n first when the last term is given.',
  outcomes: ['RF9'],
  lessonId: 'm201-1-2',
  calculator: true,
  gen(rng, diff) {
    if (diff === 3) return arithSumD3(rng);
    if (diff === 1) {
      const d = rng.int(2, 9) * (rng.chance(0.25) ? -1 : 1);
      const t1 = rng.int(-5, 20);
      const k = rng.int(10, 30);
      const S = arithSum(t1, d, k);
      if (rng.chance(0.4)) {
        const tk = t1 + (k - 1) * d;
        return {
          prompt: `An arithmetic series has $t_1 = ${t1}$ and $t_{${k}} = ${tk}$. Find $S_{${k}}$.`,
          parts: [numPart(S, { label: `$S_{${k}} =$` })],
          hints: ['You know the first and last terms, so use $S_n = \\dfrac{n(t_1 + t_n)}{2}$.', `Here $n = ${k}$.`],
          solution: [sumStepL(t1, tk, k), `So $S_{${k}} = ${nx(S)}$.`],
        };
      }
      const terms = [0, 1, 2, 3].map((i) => t1 + i * d);
      return {
        prompt: `Find the sum of the first ${k} terms of the arithmetic series $${seriesNum(terms)}$.`,
        parts: [numPart(S, { label: `$S_{${k}} =$` })],
        hints: ['Find $t_1$ and $d$.', `Use $S_n = \\dfrac{n}{2}\\left[2t_1 + (n - 1)d\\right]$ with $n = ${k}$.`],
        solution: [`$t_1 = ${t1}$, $d = ${d}$, $n = ${k}$`, sumStepD(t1, d, k), `So $S_{${k}} = ${nx(S)}$.`],
      };
    }
    const dec = rng.chance(0.3);
    const d = dec ? cl(rng.pick([0.5, 1.5, 2.5, 0.25, 0.75]) * (rng.chance(0.3) ? -1 : 1)) : rng.int(2, 11) * (rng.chance(0.35) ? -1 : 1);
    const t1 = dec ? cl(rng.int(-10, 30) * 0.5) : rng.int(-15, 40);
    const n = rng.int(12, 45);
    const tn = cl(t1 + (n - 1) * d);
    const S = arithSum(t1, d, n);
    const terms = [0, 1, 2].map((i) => cl(t1 + i * d));
    return {
      prompt: `For the arithmetic series $${seriesNum(terms, tn)}$, find the number of terms and the sum of the series.`,
      parts: [numPart(n, { label: 'Number of terms, $n =$' }), exactPart(S, { label: 'Sum, $S_n =$' })],
      hints: ['The last term is $t_n$. Solve $t_n = t_1 + (n - 1)d$ for $n$ first.', 'Then use $S_n = \\dfrac{n(t_1 + t_n)}{2}$.'],
      solution: [...whichTermSteps(t1, d, tn, n), sumStepL(t1, tn, n), `There are ${n} terms and the sum is $${nx(S)}$.`],
    };
  },
});

// ---- Applications --------------------------------------------------------

const PLANETS = [
  { where: 'Earth', a: 4.9, d: 9.8 },
  { where: 'the Moon', a: 0.8, d: 1.6 },
  { where: 'Mars', a: 1.85, d: 3.7 },
];

function sumApplyD1(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['theatre', 'logs', 'save', 'fall', 'cycle'] as const);
  let t1: number;
  let d: number;
  let n: number;
  let prompt: string;
  let label: string;
  let suffix: string | undefined;
  let say: (S: number) => string;
  if (kind === 'theatre') {
    t1 = rng.int(12, 24);
    d = rng.int(1, 3);
    n = rng.int(15, 30);
    prompt = `A theatre in ${rng.pick(PLACES)} has ${n} rows. The first row has ${t1} seats, and each row has ${d} more seat${d > 1 ? 's' : ''} than the row in front of it. How many seats are in the theatre?`;
    label = 'Total:';
    suffix = 'seats';
    say = (S) => `The theatre has ${nx(S)} seats.`;
  } else if (kind === 'logs') {
    t1 = rng.int(18, 30);
    d = -1;
    n = rng.int(8, t1 - 3);
    prompt = `Logs are stacked in a pile with ${n} rows. The bottom row has ${t1} logs, and each row has one fewer log than the row below it. How many logs are in the pile?`;
    label = 'Total:';
    suffix = 'logs';
    say = (S) => `There are ${nx(S)} logs in the pile.`;
  } else if (kind === 'save') {
    t1 = rng.pick([5, 10, 15, 20, 25]);
    d = rng.pick([2, 3, 4, 5]);
    n = rng.pick([20, 26, 30, 40, 52]);
    prompt = `${name} saves ${dollars(t1)} in week 1, and each week saves ${dollars(d)} more than the week before. How much does ${name} save in total over ${n} weeks?`;
    label = 'Total: \\$';
    say = (S) => `${name} saves ${dollars(S)} in total.`;
  } else if (kind === 'fall') {
    const w = rng.pick(PLANETS);
    t1 = w.a;
    d = w.d;
    n = rng.int(3, 10);
    prompt = `Ignoring air resistance, on ${w.where} an object dropped from rest falls $${w.a}$ m during the first second. During each second after that, it falls $${w.d}$ m more than during the second before. How far does it fall in the first ${n} seconds?`;
    label = 'Distance:';
    suffix = 'm';
    say = (S) => `It falls $${nx(S)}$ m in ${n} seconds.`;
  } else {
    t1 = rng.int(2, 8);
    d = rng.pick([0.5, 1, 0.25]);
    n = rng.int(10, 30);
    prompt = `${name} is getting ready for a cycling tour near ${rng.pick(PLACES)}. ${name} rides $${t1}$ km on day 1 and increases the distance by $${d}$ km each day. What total distance does ${name} ride in ${n} days?`;
    label = 'Total:';
    suffix = 'km';
    say = (S) => `${name} rides $${nx(S)}$ km in total.`;
  }
  const S = arithSum(t1, d, n);
  return {
    prompt,
    parts: [exactPart(S, { label, suffix })],
    hints: ['Identify $t_1$, $d$ and $n$ in the situation.', 'Use $S_n = \\dfrac{n}{2}\\left[2t_1 + (n - 1)d\\right]$.'],
    solution: [`This is an arithmetic series with $t_1 = ${nx(t1)}$, $d = ${nx(d)}$ and $n = ${n}$.`, sumStepD(t1, d, n), say(S)],
  };
}

function sumApplyD2(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['logs', 'theatre', 'cycle', 'salary'] as const);
  let t1: number;
  let d: number;
  let n: number;
  let intro: string;
  let nLabel: string;
  let sLabel: string;
  let sSuffix: string | undefined;
  let say: (n: number, S: number) => string;
  if (kind === 'logs') {
    const s = rng.pick([1, 2]);
    n = rng.int(6, 15);
    const top = rng.int(2, 8);
    t1 = top + s * (n - 1);
    d = -s;
    intro = `A pile of logs has ${t1} logs in the bottom row and ${top} logs in the top row. Each row has ${s === 1 ? 'one fewer log' : 'two fewer logs'} than the row below it. How many rows are there, and how many logs are in the pile?`;
    nLabel = 'Rows:';
    sLabel = 'Logs:';
    say = (k, S) => `There are ${k} rows and ${nx(S)} logs.`;
  } else if (kind === 'theatre') {
    d = rng.int(1, 4);
    n = rng.int(12, 30);
    t1 = rng.int(10, 24);
    intro = `In a theatre, the first row has ${t1} seats and the last row has ${t1 + (n - 1) * d} seats. Each row has ${d} more seat${d > 1 ? 's' : ''} than the row in front of it. How many rows are there, and how many seats are in the theatre?`;
    nLabel = 'Rows:';
    sLabel = 'Seats:';
    say = (k, S) => `There are ${k} rows and ${nx(S)} seats.`;
  } else if (kind === 'cycle') {
    d = rng.pick([0.5, 1, 0.25]);
    t1 = rng.int(2, 6);
    n = retry(() => rng.int(10, 32), (k) => Number.isInteger(cl((k - 1) * d * 2)));
    intro = `${name} rides $${t1}$ km on the first day of a training plan and increases the distance by $${d}$ km each day. On the last day of the plan, ${name} rides $${nx(t1 + (n - 1) * d)}$ km. How many days long is the plan, and what total distance does ${name} ride?`;
    nLabel = 'Days:';
    sLabel = 'Total:';
    sSuffix = 'km';
    say = (k, S) => `The plan is ${k} days long and ${name} rides $${nx(S)}$ km.`;
  } else {
    t1 = rng.int(38, 64) * 1000;
    d = rng.pick([1000, 1200, 1500, 2000, 2500]);
    n = rng.int(6, 15);
    intro = `${name}'s salary is ${dollars(t1)} in the first year of a contract and rises by ${dollars(d)} each year after that. In the last year of the contract, the salary is ${dollars(t1 + (n - 1) * d)}. How many years long is the contract, and what is the total salary over the contract?`;
    nLabel = 'Years:';
    sLabel = 'Total: \\$';
    say = (k, S) => `The contract is ${k} years long and pays ${dollars(S)} in total.`;
  }
  const tn = cl(t1 + (n - 1) * d);
  const S = arithSum(t1, d, n);
  return {
    prompt: intro,
    parts: [numPart(n, { label: nLabel }), exactPart(S, { label: sLabel, suffix: sSuffix })],
    hints: ['You know the first term, the last term and $d$. Find $n$ from $t_n = t_1 + (n - 1)d$.', 'Then use $S_n = \\dfrac{n(t_1 + t_n)}{2}$.'],
    solution: [...whichTermSteps(t1, d, tn, n), sumStepL(t1, tn, n), say(n, S)],
  };
}

function sumApplyD3(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['theatre', 'cans', 'save', 'cycle', 'fall'] as const);
  let t1: number;
  let d: number;
  let n: number;
  let q: (S: number) => string;
  let label: string;
  let noun: string;
  if (kind === 'theatre') {
    t1 = rng.int(10, 24);
    d = rng.int(1, 4);
    n = rng.int(10, 30);
    q = (S) => `A theatre's first row has ${t1} seats, and each row has ${d} more seat${d > 1 ? 's' : ''} than the row in front of it. The theatre has ${nx(S)} seats in total. How many rows does it have?`;
    label = 'Rows:';
    noun = 'rows';
  } else if (kind === 'cans') {
    t1 = rng.int(1, 8);
    d = 1;
    n = rng.int(8, 20);
    q = (S) => `A grocery store in ${rng.pick(PLACES)} stacks cans in a display. The top row has ${t1} can${t1 > 1 ? 's' : ''}, and each row has one more can than the row above it. The display uses ${S} cans. How many rows does it have?`;
    label = 'Rows:';
    noun = 'rows';
  } else if (kind === 'save') {
    t1 = rng.pick([10, 15, 20, 25, 30]);
    d = rng.pick([2, 4, 5, 10]);
    n = rng.int(10, 30);
    q = (S) => `${name} deposits ${dollars(t1)} into a savings account in the first week, and each week deposits ${dollars(d)} more than the week before. After how many weeks will ${name} have deposited ${dollars(S)} in total?`;
    label = 'Weeks:';
    noun = 'weeks';
  } else if (kind === 'cycle') {
    t1 = rng.int(2, 5);
    d = 0.5;
    n = rng.int(8, 24);
    q = (S) => `${name} rides $${t1}$ km on the first day of a training plan and $${d}$ km more each day than the day before. After how many days will ${name} have ridden $${nx(S)}$ km in total?`;
    label = 'Days:';
    noun = 'days';
  } else {
    const w = rng.pick(PLANETS.slice(0, 2));
    t1 = w.a;
    d = w.d;
    n = rng.int(3, 12);
    q = (S) => `Ignoring air resistance, on ${w.where} an object dropped from rest falls $${w.a}$ m during the first second. During each second after that, it falls $${w.d}$ m more than during the second before. How many seconds does it take to fall $${nx(S)}$ m?`;
    label = 'Time:';
    noun = 'seconds';
  }
  const S = arithSum(t1, d, n);
  return {
    prompt: q(S),
    parts: [numPart(n, { label, suffix: noun === 'seconds' ? 's' : undefined })],
    hints: [
      `Substitute $S_n = ${nx(S)}$, $t_1 = ${nx(t1)}$ and $d = ${nx(d)}$ into $S_n = \\dfrac{n}{2}\\left[2t_1 + (n - 1)d\\right]$.`,
      'You get a quadratic equation in $n$. Solve it by factoring or with the quadratic formula, and reject the negative root.',
    ],
    solution: [`This is an arithmetic series with $t_1 = ${nx(t1)}$, $d = ${nx(d)}$ and $S_n = ${nx(S)}$.`, ...solveForN(t1, d, S, n, noun), `The answer is ${n} ${noun}.`],
  };
}

const arithSumApply = skill({
  id: 'm201-arith-sum-apply',
  name: 'Arithmetic series problems',
  description: 'Solve problems with arithmetic series, such as seats in a theatre, stacked logs and savings plans, including finding the number of terms from a sum.',
  outcomes: ['RF9'],
  lessonId: 'm201-1-2',
  calculator: true,
  gen(rng, diff) {
    if (diff === 1) return sumApplyD1(rng);
    if (diff === 2) return sumApplyD2(rng);
    return sumApplyD3(rng);
  },
});

// ---------------------------------------------------------------------------
// Lesson 1.3 — Geometric sequences
// ---------------------------------------------------------------------------

/** t_k = t_1 r^(k-1), as one display line. */
function geoNth(t1: Frac, r: Frac, k: number, dec = false): string {
  const pw = fpow(r, k - 1);
  const tk = fracMul(t1, pw);
  return `$t_{${k}} = t_1 r^{${k - 1}} = ${fv(t1, dec)}${pbase(r, dec)}^{${k - 1}} = ${fv(t1, dec)}${fbr(pw, dec)} = ${fv(tk, dec)}$`;
}

const FRAC_RATIOS: Frac[] = [frac(1, 2), frac(-1, 2), frac(1, 3), frac(-1, 3), frac(2, 3), frac(-2, 3), frac(3, 2), frac(-3, 2), frac(1, 4), frac(3, 4), frac(-3, 4), frac(4, 3)];

const geoTerm = skill({
  id: 'm201-geo-term',
  name: 'Terms of a geometric sequence',
  description: 'Find the common ratio and any term of a geometric sequence, including negative and fractional ratios and from two non-consecutive terms.',
  outcomes: ['RF10'],
  lessonId: 'm201-1-3',
  calculator: true,
  gen(rng, diff) {
    if (diff === 1) {
      const r = rng.pick([2, 3, 4, 5, -2, -3]);
      const t1 = rng.int(1, 9) * (rng.chance(0.2) ? -1 : 1);
      const k = retry(() => rng.int(5, 9), (x) => Math.abs(t1 * r ** (x - 1)) <= 2e6);
      const terms = [0, 1, 2, 3].map((i) => t1 * r ** i);
      const tk = t1 * r ** (k - 1);
      return {
        prompt: `For the geometric sequence $${seqTex(terms.map(nx))}$, find the common ratio $r$ and the term $t_{${k}}$.`,
        parts: [numPart(r, { label: '$r =$' }), numPart(tk, { label: `$t_{${k}} =$` })],
        hints: ['Divide any term by the term before it to find $r$.', `Use $t_n = t_1 r^{n - 1}$ with $n = ${k}$.`],
        solution: [`$r = \\dfrac{t_2}{t_1} = \\dfrac{${nx(terms[1])}}{${nx(t1)}} = ${r}$`, geoNth(frac(t1), frac(r), k), `So $r = ${r}$ and $t_{${k}} = ${nx(tk)}$.`],
      };
    }
    if (diff === 2) {
      const dec = rng.chance(0.35);
      let r: Frac;
      let t1: Frac;
      let k: number;
      if (dec) {
        r = rng.pick([frac(11, 10), frac(6, 5), frac(3, 2), frac(9, 10), frac(4, 5), frac(-1, 2), frac(1, 2)]);
        t1 = frac(rng.pick([100, 200, 400, 500, 1000, 2500]));
        k = rng.int(5, 7);
      } else {
        r = rng.pick(FRAC_RATIOS);
        t1 = frac(rng.int(1, 3) * r.d ** 3 * (rng.chance(0.2) ? -1 : 1));
        const r0 = r;
        const s0 = t1;
        k = retry(
          () => rng.int(5, 9),
          (x) => {
            const v = fracMul(s0, fpow(r0, x - 1));
            return v.d <= 256 && Math.abs(v.n) <= 20000;
          },
        );
      }
      const terms = [0, 1, 2, 3].map((i) => fracMul(t1, fpow(r, i)));
      const tk = fracMul(t1, fpow(r, k - 1));
      return {
        prompt: `For the geometric sequence $${seqTex(terms.map((f) => fv(f, dec)))}$, find the common ratio $r$ and the term $t_{${k}}$.${dec ? '' : ' Give exact values.'}`,
        parts: dec
          ? [exactPart(fracValue(r), { label: '$r =$' }), exactPart(fracValue(tk), { label: `$t_{${k}} =$` })]
          : [numPart(fracValue(r), { label: '$r =$' }), numPart(fracValue(tk), { label: `$t_{${k}} =$` })],
        hints: ['Divide a term by the term before it. The ratio may be negative or a fraction.', `Use $t_n = t_1 r^{n - 1}$ with $n = ${k}$. Put a negative or fractional $r$ in brackets before raising it to a power.`],
        solution: [
          `$r = \\dfrac{t_2}{t_1} = \\dfrac{${fv(terms[1], dec)}}{${fv(t1, dec)}} = ${fv(r, dec)}$`,
          geoNth(t1, r, k, dec),
          `So $r = ${fv(r, dec)}$ and $t_{${k}} = ${fv(tk, dec)}$.`,
        ],
      };
    }
    // Two non-consecutive terms.
    const fracR = rng.chance(0.3);
    const r = fracR ? rng.pick([frac(1, 2), frac(-1, 2), frac(1, 3), frac(-1, 3)]) : frac(rng.pick([2, 3, 4, -2, -3, -4]));
    const g = rng.pick([2, 3]);
    const p = rng.int(1, 3);
    const q = p + g;
    const k = rng.chance(0.25) && p > 1 ? 1 : q + rng.int(1, fracR ? 2 : 3);
    const maxIdx = Math.max(q, k);
    const c = rng.int(1, fracR ? 2 : 5) * (rng.chance(0.25) ? -1 : 1);
    const t1 = frac(c * r.d ** (maxIdx - 1));
    const t = (i: number) => fracMul(t1, fpow(r, i - 1));
    const rg = fpow(r, g);
    const sign = r.n < 0 ? 'negative' : 'positive';
    const steps = [
      `From $t_{${p}}$ to $t_{${q}}$ is ${g} steps, so $t_{${q}} = t_{${p}} r^{${g}}$.`,
      `$${fl(t(q))} = ${coef(t(p))}r^{${g}}$, so $r^{${g}} = \\dfrac{${fl(t(q))}}{${fl(t(p))}} = ${fl(rg)}$.`,
      g === 2
        ? `$r = \\pm\\sqrt{${fl(rg)}} = \\pm ${fl(fabs(r))}$. The ratio is ${sign}, so $r = ${fl(r)}$.`
        : `$r = \\sqrt[3]{${fl(rg)}} = ${fl(r)}$`,
    ];
    if (k === 1) {
      const rp = fpow(r, p - 1);
      steps.push(
        p === 2
          ? `$t_2 = t_1 r$, so $t_1 = \\dfrac{${fl(t(p))}}{${fl(r)}} = ${fl(t1)}$`
          : `$t_{${p}} = t_1 r^{${p - 1}}$, so $t_1 = \\dfrac{${fl(t(p))}}{${rBase(r)}^{${p - 1}}} = \\dfrac{${fl(t(p))}}{${fl(rp)}} = ${fl(t1)}$`,
      );
    } else {
      const pw = fpow(r, k - q);
      steps.push(
        k - q === 1
          ? `$t_{${k}} = t_{${q}} r = ${fl(t(q))}${pbase(r)} = ${fl(t(k))}$`
          : `$t_{${k}} = t_{${q}} r^{${k - q}} = ${fl(t(q))}${pbase(r)}^{${k - q}} = ${fl(t(q))}${fbr(pw)} = ${fl(t(k))}$`,
      );
    }
    steps.push(`So $r = ${fl(r)}$ and $t_{${k}} = ${fl(t(k))}$.`);
    return {
      prompt: `In a geometric sequence, $t_{${p}} = ${fl(t(p))}$ and $t_{${q}} = ${fl(t(q))}$${g === 2 ? `, and the common ratio is ${sign}` : ''}. Find the common ratio $r$ and ${k === 1 ? 'the first term $t_1$' : `the term $t_{${k}}$`}.`,
      parts: [numPart(fracValue(r), { label: '$r =$' }), numPart(fracValue(t(k)), { label: `$t_{${k}} =$` })],
      hints: [`How many factors of $r$ take you from $t_{${p}}$ to $t_{${q}}$?`, `Divide the two terms to get $r^{${g}}$, take the ${g === 2 ? 'square' : 'cube'} root, then multiply or divide by $r$ to reach the term you want.`],
      solution: steps,
    };
  },
});

// ---- Unknowns and growth or decay ----------------------------------------

function geoUnknownContext(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['ball', 'bacteria', 'decay', 'growth', 'depreciate'] as const);
  if (kind === 'ball') {
    const [p, q] = rng.pick([[3, 4], [2, 3], [4, 5], [1, 2], [3, 5]] as const);
    let maxK = 3;
    while (q ** (maxK + 1) <= 1100 && maxK < 6) maxK++;
    const k = rng.int(3, maxK);
    const c = rng.int(1, Math.min(8, Math.floor(1100 / q ** k)));
    const h0 = c * q ** k;
    const hk = c * p ** k;
    const r = frac(p, q);
    return {
      prompt: `A ball is dropped from a height of $${h0}$ cm. After each bounce, it rises to $${fl(r)}$ of the height it fell from. After which bounce does it rise to a height of $${hk}$ cm?`,
      parts: [numPart(k, { label: 'Bounce number:' })],
      hints: [`The height after bounce $n$ is $${h0}\\left(${fl(r)}\\right)^n$.`, `Set this equal to $${hk}$, divide by $${h0}$, and write the result as a power of $${fl(r)}$.`],
      solution: [
        `The heights after each bounce form a geometric sequence with $r = ${fl(r)}$. After bounce $n$ the height is $${h0}\\left(${fl(r)}\\right)^n$.`,
        `$${hk} = ${h0}\\left(${fl(r)}\\right)^n$`,
        `$\\left(${fl(r)}\\right)^n = \\dfrac{${hk}}{${h0}}${c === 1 ? '' : ` = \\dfrac{${p ** k}}{${q ** k}}`}$`,
        `$\\dfrac{${p ** k}}{${q ** k}} = \\left(${fl(r)}\\right)^{${k}}$, so $n = ${k}$.`,
        `The ball rises to $${hk}$ cm after bounce ${k}.`,
      ],
    };
  }
  if (kind === 'bacteria' || kind === 'decay') {
    const grow = kind === 'bacteria';
    const f = grow ? rng.pick([2, 3]) : 2;
    const T = grow
      ? rng.pick([{ v: 20, u: 'minutes' }, { v: 30, u: 'minutes' }, { v: 15, u: 'minutes' }, { v: 4, u: 'hours' }, { v: 3, u: 'hours' }])
      : rng.pick([{ v: 6, u: 'hours' }, { v: 8, u: 'days' }, { v: 5, u: 'days' }, { v: 12, u: 'hours' }, { v: 30, u: 'years' }]);
    const k = f === 2 ? rng.int(3, 8) : rng.int(3, 6);
    const base = grow ? rng.pick([100, 150, 200, 250, 300, 400, 500]) : rng.pick([3, 5, 6, 10, 15, 20, 25]);
    const big = base * f ** k;
    const word = f === 2 ? (grow ? 'doubles' : 'halves') : 'triples';
    const prompt = grow
      ? `A culture starts with ${nx(base)} bacteria, and the number ${word} every ${T.v} ${T.u}. After how many ${T.u} will there be $${nx(big)}$ bacteria?`
      : `A lab has $${nx(big)}$ mg of a radioactive tracer. The amount left halves every ${T.v} ${T.u}. After how many ${T.u} will only $${base}$ mg remain?`;
    const steps = grow
      ? [`After $k$ periods of ${T.v} ${T.u}, there are $${nx(base)}(${f})^k$ bacteria.`, `$${nx(big)} = ${nx(base)}(${f})^k$`, `$${f}^k = ${nx(f ** k)}$`]
      : [`After $k$ periods of ${T.v} ${T.u}, the amount left is $${nx(big)}\\left(\\frac{1}{2}\\right)^k$ mg.`, `$${base} = ${nx(big)}\\left(\\frac{1}{2}\\right)^k$`, `$\\left(\\frac{1}{2}\\right)^k = \\dfrac{${base}}{${nx(big)}} = \\dfrac{1}{${nx(f ** k)}}$`];
    return {
      prompt,
      parts: [numPart(k * T.v, { label: 'Time:', suffix: T.u })],
      hints: [`Each ${T.v} ${T.u}, the amount is multiplied by ${grow ? f : '$\\frac{1}{2}$'}. Let $k$ be the number of ${T.v}-${T.u.replace(/s$/, '')} periods.`, `Find $k$ by writing the ratio of the amounts as a power of ${grow ? f : 2}, then multiply $k$ by ${T.v}.`],
      solution: [...steps, `$${nx(f ** k)} = ${f}^{${k}}$, so $k = ${k}$ periods.`, `Time: $${k} \\times ${T.v} = ${k * T.v}$ ${T.u}.`],
      calculator: true,
    };
  }
  const growth = kind === 'growth';
  const opts = growth
    ? [{ pct: 5, r: frac(21, 20) }, { pct: 10, r: frac(11, 10) }, { pct: 20, r: frac(6, 5) }, { pct: 25, r: frac(5, 4) }, { pct: 50, r: frac(3, 2) }]
    : [{ pct: 10, r: frac(9, 10) }, { pct: 20, r: frac(4, 5) }, { pct: 25, r: frac(3, 4) }, { pct: 15, r: frac(17, 20) }, { pct: 30, r: frac(7, 10) }];
  const o = rng.pick(opts);
  const g = rng.pick([2, 3]);
  const unit = lcm(o.r.d ** g, 100);
  const [lo, hi] = growth ? [2000, 60000] : [12000, 60000];
  const mult = rng.int(Math.max(1, Math.ceil(lo / unit)), Math.max(Math.ceil(lo / unit), Math.floor(hi / unit)));
  const v0 = unit * mult;
  const v1 = fracValue(fracMul(frac(v0), fpow(o.r, g)));
  const rg = fracValue(fpow(o.r, g));
  const rv = fracValue(o.r);
  const prompt = growth
    ? `The population of a town grows by the same percent each year. At the start of one year it is $${nx(v0)}$, and ${g} years later it is $${nx(v1)}$. What is the annual growth rate, as a percent?`
    : `${name} buys a used truck for ${dollars(v0)}. Its value drops by the same percent each year, and ${g} years later it is worth ${dollars(v1)}. By what percent does the value drop each year?`;
  return {
    prompt,
    parts: [numPart(o.pct, { label: growth ? 'Growth rate:' : 'Drop per year:', suffix: '%' })],
    hints: [`Each year the ${growth ? 'population' : 'value'} is multiplied by the same ratio $r$, so after ${g} years it has been multiplied by $r^{${g}}$.`, `Find $r^{${g}}$ by dividing, take the ${g === 2 ? 'square' : 'cube'} root, then compare $r$ with 1.`],
    solution: [
      `$${nx(v1)} = ${nx(v0)}r^{${g}}$`,
      `$r^{${g}} = \\dfrac{${nx(v1)}}{${nx(v0)}} = ${nx(rg)}$`,
      `$r = ${g === 2 ? `\\sqrt{${nx(rg)}}` : `\\sqrt[3]{${nx(rg)}}`} = ${nx(rv)}$${g === 2 ? ` (reject $-${nx(rv)}$: a ${growth ? 'population' : 'value'} cannot change sign)` : ''}`,
      growth
        ? `$r = ${nx(rv)} = 1 + ${nx(o.pct / 100)}$, so the population grows by ${o.pct}% each year.`
        : `$r = ${nx(rv)} = 1 - ${nx(o.pct / 100)}$, so the value drops by ${o.pct}% each year.`,
    ],
    calculator: true,
  };
}

const geoUnknown = skill({
  id: 'm201-geo-unknown',
  name: 'Finding r, n or t₁ in a geometric sequence',
  description: 'Find the common ratio, the position of a term or the first term of a geometric sequence, and model growth and decay.',
  outcomes: ['RF10'],
  lessonId: 'm201-1-3',
  calculator: true,
  gen(rng, diff) {
    if (diff === 3) return geoUnknownContext(rng);
    if (diff === 1) {
      if (rng.chance(0.6)) {
        const r = rng.pick([2, 3, 4, 5]);
        const t1 = rng.int(1, 7) * (rng.chance(0.2) ? -1 : 1);
        const m = retry(() => rng.int(6, 12), (x) => Math.abs(t1 * r ** (x - 1)) <= 5e6);
        const v = t1 * r ** (m - 1);
        const terms = [0, 1, 2].map((i) => t1 * r ** i);
        return {
          prompt: `Which term of the geometric sequence $${seqTex(terms.map(nx))}$ is $${nx(v)}$?`,
          parts: [numPart(m, { label: '$n =$' })],
          hints: ['Find $t_1$ and $r$, then substitute into $t_n = t_1 r^{n - 1}$.', 'Divide both sides by $t_1$, then write the result as a power of $r$.'],
          solution: [
            `$t_1 = ${t1}$ and $r = ${r}$. Substitute $t_n = ${nx(v)}$ into $t_n = t_1 r^{n - 1}$:`,
            `$${nx(v)} = ${t1 === 1 ? `${r}^{n - 1}` : `${t1}(${r})^{n - 1}`}$`,
            `$${r}^{n - 1} = ${nx(r ** (m - 1))}$`,
            `$${nx(r ** (m - 1))} = ${r}^{${m - 1}}$, so $n - 1 = ${m - 1}$ and $n = ${m}$.`,
            `$${nx(v)}$ is the ${ord(m)} term.`,
          ],
        };
      }
      const r = rng.pick([2, 3, 4, 5, -2, -3]);
      const t1 = rng.int(1, 9) * (rng.chance(0.2) ? -1 : 1);
      const k = retry(() => rng.int(4, 8), (x) => Math.abs(t1 * r ** (x - 1)) <= 1e6);
      const tk = t1 * r ** (k - 1);
      const pw = r ** (k - 1);
      return {
        prompt: `In a geometric sequence, $t_{${k}} = ${nx(tk)}$ and $r = ${r}$. Find the first term, $t_1$.`,
        parts: [numPart(t1, { label: '$t_1 =$' })],
        hints: ['Use $t_n = t_1 r^{n - 1}$ with the term you know.', `Evaluate $${px(r)}^{${k - 1}}$, then divide.`],
        solution: [`$t_{${k}} = t_1 r^{${k - 1}}$`, `$${nx(tk)} = t_1(${r})^{${k - 1}} = ${nx(pw)}t_1$`, `$t_1 = \\dfrac{${nx(tk)}}{${nx(pw)}} = ${t1}$`],
      };
    }
    // Find all possible values of r from two terms.
    const g = rng.pick([2, 3]);
    const r = g === 2 ? rng.pick([frac(2), frac(3), frac(4), frac(5), frac(1, 2), frac(1, 3), frac(2, 3), frac(3, 2)]) : rng.pick([frac(2), frac(3), frac(-2), frac(-3), frac(1, 2), frac(-1, 2), frac(2, 3), frac(-1, 3)]);
    const p = rng.int(1, 4);
    const q = p + g;
    const tp = frac(rng.int(1, 6) * (rng.chance(0.25) ? -1 : 1) * r.d ** g);
    const tq = fracMul(tp, fpow(r, g));
    const rg = fpow(r, g);
    const values = g === 2 ? [fracValue(r), -fracValue(r)] : [fracValue(r)];
    return {
      prompt: `In a geometric sequence, $t_{${p}} = ${fl(tp)}$ and $t_{${q}} = ${fl(tq)}$. Find all possible values of the common ratio $r$.`,
      parts: [part({ kind: 'numbers', values }, { label: '$r =$', placeholder: 'e.g. 2, -2' })],
      hints: [`From $t_{${p}}$ to $t_{${q}}$ is ${g} steps, so $t_{${q}} = t_{${p}} r^{${g}}$.`, g === 2 ? 'Solve for $r^2$. A positive number has two square roots.' : 'Solve for $r^3$. A number has only one real cube root.'],
      solution: [
        `$t_{${q}} = t_{${p}} r^{${g}}$, so $${fl(tq)} = ${coef(tp)}r^{${g}}$`,
        `$r^{${g}} = \\dfrac{${fl(tq)}}{${fl(tp)}} = ${fl(rg)}$`,
        g === 2
          ? `$r = \\pm\\sqrt{${fl(rg)}} = \\pm ${fl(r)}$. Both values work: the middle term is just positive for one and negative for the other.`
          : `$r = \\sqrt[3]{${fl(rg)}} = ${fl(r)}$. There is only one real cube root.`,
        g === 2 ? `So $r = ${fl(r)}$ or $r = ${fl(frac(-r.n, r.d))}$.` : `So $r = ${fl(r)}$.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 1.4 — Geometric series
// ---------------------------------------------------------------------------

/** Exact S_k = t_1(r^k - 1)/(r - 1) as one line, for integer or terminating-decimal ratios. */
function geoSumExact(t1: Frac, r: Frac, k: number, dec = false): { S: Frac; step: string } {
  const rk = fpow(r, k);
  const top = fracSub(rk, frac(1));
  const den = fracSub(r, frac(1));
  const S = fracDiv(fracMul(t1, top), den);
  return {
    S,
    step: `$S_{${k}} = \\dfrac{t_1(r^n - 1)}{r - 1} = \\dfrac{${fv(t1, dec)}\\left(${rBase(r, dec)}^{${k}} - 1\\right)}{${fv(r, dec)} - 1} = \\dfrac{${fv(t1, dec)}${fbr(top, dec)}}{${fv(den, dec)}} = ${fv(S, dec)}$`,
  };
}

/** S_k for a ratio that needs rounding: the setup line and an approximation. */
function geoSumApprox(t1: number, r: Frac, k: number, dp: number, dec: boolean): { S: number; steps: string[] } {
  const rv = fracValue(r);
  const S = (t1 * (rv ** k - 1)) / (rv - 1);
  return {
    S,
    steps: [
      `$S_{${k}} = \\dfrac{t_1(r^n - 1)}{r - 1} = \\dfrac{${nx(t1)}\\left(${rBase(r, dec)}^{${k}} - 1\\right)}{${fv(r, dec)} - 1}$`,
      `$S_{${k}} \\approx ${nx(roundTo(S, dp + 3))}$`,
    ],
  };
}

const geoSum = skill({
  id: 'm201-geo-sum',
  name: 'Sum of a geometric series',
  description: 'Find the sum of a geometric series with Sₙ = t₁(rⁿ − 1)/(r − 1), including negative and fractional ratios and series given by their last term.',
  outcomes: ['RF10'],
  lessonId: 'm201-1-4',
  calculator: true,
  gen(rng, diff) {
    const hintsBase = ['Find $t_1$, $r$ and $n$.', 'Use $S_n = \\dfrac{t_1(r^n - 1)}{r - 1}$. Put a negative or fractional $r$ in brackets.'];
    if (diff === 1) {
      const r = rng.pick([2, 3, 4, 5]);
      const t1 = rng.int(1, 6);
      const k = retry(() => rng.int(5, 9), (x) => t1 * r ** x <= 1e7);
      const terms = [0, 1, 2, 3].map((i) => frac(t1 * r ** i));
      const { S, step } = geoSumExact(frac(t1), frac(r), k);
      return {
        prompt: `Find the sum of the first ${k} terms of the geometric series $${seriesFrac(terms)}$.`,
        parts: [numPart(fracValue(S), { label: `$S_{${k}} =$` })],
        hints: hintsBase,
        solution: [`$t_1 = ${t1}$, $r = \\dfrac{${t1 * r}}{${t1}} = ${r}$, $n = ${k}$`, step, `So $S_{${k}} = ${fl(S)}$.`],
      };
    }
    if (diff === 2) {
      const mode = rng.pick(['neg', 'last', 'frac', 'dec'] as const);
      if (mode === 'neg' || mode === 'last') {
        const r = mode === 'neg' ? rng.pick([-2, -3, -4]) : rng.pick([2, 3, 4, -2, -3]);
        const t1 = rng.int(1, 7) * (rng.chance(0.2) ? -1 : 1);
        const k = retry(() => rng.int(6, 10), (x) => Math.abs(t1 * r ** x) <= 1e7);
        const terms = [0, 1, 2].map((i) => frac(t1 * r ** i));
        const { S, step } = geoSumExact(frac(t1), frac(r), k);
        if (mode === 'neg') {
          return {
            prompt: `Find the sum of the first ${k} terms of the geometric series $${seriesFrac([...terms, frac(t1 * r ** 3)])}$.`,
            parts: [numPart(fracValue(S), { label: `$S_{${k}} =$` })],
            hints: ['The signs alternate, so $r$ is negative.', 'Use $S_n = \\dfrac{t_1(r^n - 1)}{r - 1}$ with $r$ in brackets.'],
            solution: [`$t_1 = ${t1}$, $r = \\dfrac{${nx(t1 * r)}}{${t1}} = ${r}$, $n = ${k}$`, step, `So $S_{${k}} = ${fl(S)}$.`],
          };
        }
        const tn = t1 * r ** (k - 1);
        return {
          prompt: `For the geometric series $${seriesFrac(terms, false, frac(tn))}$, find the number of terms and the sum of the series.`,
          parts: [numPart(k, { label: 'Number of terms, $n =$' }), numPart(fracValue(S), { label: 'Sum, $S_n =$' })],
          hints: ['The last term is $t_n$. Solve $t_n = t_1 r^{n - 1}$ for $n$ by writing a power of $r$.', 'Then use $S_n = \\dfrac{t_1(r^n - 1)}{r - 1}$.'],
          solution: [
            `$t_1 = ${t1}$ and $r = ${r}$. The last term: $${nx(tn)} = ${t1}(${r})^{n - 1}$`,
            `$${px(r)}^{n - 1} = ${nx(r ** (k - 1))} = ${px(r)}^{${k - 1}}$, so $n - 1 = ${k - 1}$ and $n = ${k}$.`,
            step,
            `There are ${k} terms and the sum is $${fl(S)}$.`,
          ],
        };
      }
      const dec = mode === 'dec';
      const { r, t1, k, S, steps } = retry(
        () => {
          const rr = dec ? rng.pick([frac(3, 2), frac(6, 5), frac(4, 5), frac(3, 5), frac(11, 10)]) : rng.pick([frac(2, 3), frac(3, 4), frac(4, 5), frac(3, 5), frac(-2, 3), frac(-3, 4)]);
          const tt = dec ? rng.int(2, 12) * (rr.n < rr.d ? 10 : 1) : rng.int(1, 3) * rr.d ** 2;
          const kk = rng.int(8, 14);
          return { r: rr, t1: tt, k: kk, ...geoSumApprox(tt, rr, kk, 2, dec) };
        },
        (o) => safeRound(o.S, 2),
      );
      const terms = [0, 1, 2].map((i) => fracMul(frac(t1), fpow(r, i)));
      return {
        prompt: `Find the sum of the first ${k} terms of the geometric series $${seriesFrac(terms, dec)}$. Round to the nearest hundredth.`,
        parts: [numPart(S, { label: `$S_{${k}} \\approx$`, decimals: 2 })],
        hints: ['Find $r$ by dividing the second term by the first.', 'Use $S_n = \\dfrac{t_1(r^n - 1)}{r - 1}$. Round only at the end.'],
        solution: [`$t_1 = ${nx(t1)}$, $r = \\dfrac{${fv(terms[1], dec)}}{${nx(t1)}} = ${fv(r, dec)}$, $n = ${k}$`, ...steps, `So $S_{${k}} \\approx ${fixed(S, 2)}$.`],
      };
    }
    const mode = rng.pick(['first', 'two', 'last'] as const);
    if (mode === 'first') {
      const r = rng.pick([frac(2), frac(3), frac(-2), frac(-3), frac(4)]);
      const k = rng.int(5, 8);
      const t1 = rng.int(1, 9) * (rng.chance(0.2) ? -1 : 1);
      const mult = fracDiv(fracSub(fpow(r, k), frac(1)), fracSub(r, frac(1)));
      const S = t1 * mult.n;
      return {
        prompt: `A geometric series has common ratio $r = ${fl(r)}$, and the sum of its first ${k} terms is $S_{${k}} = ${nx(S)}$. Find the first term, $t_1$.`,
        parts: [numPart(t1, { label: '$t_1 =$' })],
        hints: ['Substitute what you know into $S_n = \\dfrac{t_1(r^n - 1)}{r - 1}$.', 'Simplify the fraction with $r$ in it to a number, then divide.'],
        solution: [
          `$${nx(S)} = \\dfrac{t_1\\left(${rBase(r)}^{${k}} - 1\\right)}{${fl(r)} - 1}$`,
          `$\\dfrac{${rBase(r)}^{${k}} - 1}{${fl(r)} - 1} = \\dfrac{${nx(fracValue(fpow(r, k)) - 1)}}{${nx(fracValue(r) - 1)}} = ${nx(mult.n)}$, so $${nx(S)} = ${nx(mult.n)}t_1$.`,
          `$t_1 = \\dfrac{${nx(S)}}{${nx(mult.n)}} = ${t1}$`,
        ],
      };
    }
    if (mode === 'two') {
      const r = rng.pick([2, 3, -2, -3]);
      const t1 = rng.int(1, 5) * (rng.chance(0.25) ? -1 : 1);
      const k = rng.int(6, 9);
      const t2 = t1 * r;
      const t5 = t1 * r ** 4;
      const { S, step } = geoSumExact(frac(t1), frac(r), k);
      return {
        prompt: `In a geometric series, $t_2 = ${t2}$ and $t_5 = ${nx(t5)}$. Find $S_{${k}}$.`,
        parts: [numPart(fracValue(S), { label: `$S_{${k}} =$` })],
        hints: ['From $t_2$ to $t_5$ is 3 steps, so $t_5 = t_2 r^3$. Find $r$.', 'Find $t_1 = t_2 \\div r$, then use $S_n = \\dfrac{t_1(r^n - 1)}{r - 1}$.'],
        solution: [
          `$t_5 = t_2 r^3$: $${nx(t5)} = ${t2}r^3$, so $r^3 = ${nx(r ** 3)}$ and $r = ${r}$.`,
          `$t_1 = \\dfrac{t_2}{r} = \\dfrac{${t2}}{${r}} = ${t1}$`,
          step,
          `So $S_{${k}} = ${fl(S)}$.`,
        ],
      };
    }
    const r = rng.pick([frac(1, 2), frac(-1, 2), frac(1, 3), frac(-1, 3), frac(2, 3), frac(3, 4)]);
    const n = r.d === 2 ? rng.int(7, 10) : r.d === 3 ? rng.int(5, 7) : rng.int(5, 6);
    const t1 = frac(rng.int(1, 2) * r.d ** (n - 1));
    const terms = [0, 1, 2].map((i) => fracMul(t1, fpow(r, i)));
    const tn = fracMul(t1, fpow(r, n - 1));
    const rtn = fracMul(r, tn);
    const S = fracDiv(fracSub(rtn, t1), fracSub(r, frac(1)));
    return {
      prompt: `Find the sum of the geometric series $${seriesFrac(terms, false, tn)}$.`,
      parts: [numPart(fracValue(S), { label: 'Sum:' })],
      hints: ['You know the first term, the last term and $r$. There is a form of the sum formula that does not need $n$.', 'Use $S_n = \\dfrac{rt_n - t_1}{r - 1}$.'],
      solution: [
        `$t_1 = ${fl(t1)}$, $r = ${fl(r)}$ and the last term is $t_n = ${fl(tn)}$.`,
        `$S_n = \\dfrac{rt_n - t_1}{r - 1} = \\dfrac{${fbr(r)}(${fl(tn)}) - ${fl(t1)}}{${fl(r)} - 1} = \\dfrac{${fl(fracSub(rtn, t1))}}{${fl(fracSub(r, frac(1)))}} = ${fl(S)}$`,
        `The sum is $${fl(S)}$.`,
      ],
    };
  },
});

// ---- Applications --------------------------------------------------------

function geoApplyD1(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['email', 'phone', 'ancestors', 'tournament', 'pay'] as const);
  if (kind === 'pay') {
    const c = rng.pick([1, 2, 5]);
    const n = rng.int(15, 24);
    const cents = c * (2 ** n - 1);
    const S = cents / 100;
    return {
      prompt: `${name} agrees to a summer job that pays ${c} cent${c > 1 ? 's' : ''} on day 1, and the daily pay doubles every day after that. What is the total pay for the first ${n} days, in dollars? Give the answer to the nearest cent.`,
      parts: [numPart(S, { label: 'Total: \\$', decimals: 2, tolerance: 0.011 })],
      hints: [`The daily pay, in cents, is a geometric sequence with $t_1 = ${c}$ and $r = 2$.`, 'Use $S_n = \\dfrac{t_1(r^n - 1)}{r - 1}$, then divide by 100 to change cents to dollars.'],
      solution: [
        `$t_1 = ${c}$, $r = 2$, $n = ${n}$ (in cents)`,
        `$S_{${n}} = \\dfrac{${c}(2^{${n}} - 1)}{2 - 1} = ${c === 1 ? '' : `${c}(${nx(2 ** n - 1)}) = `}${nx(cents)}$ cents`,
        `$${nx(cents)} \\div 100 = ${fixed(S, 2)}$`,
        `The total pay is ${cash(S)}.`,
      ],
    };
  }
  let t1: number;
  let r: Frac;
  let n: number;
  let prompt: string;
  let label: string;
  let say: (S: string) => string;
  if (kind === 'email' || kind === 'phone') {
    const f = rng.int(2, 5);
    n = retry(() => rng.int(4, 9), (x) => f ** x <= 2e6);
    t1 = f;
    r = frac(f);
    if (kind === 'email') {
      prompt = `${name} sends an email to ${f} friends. Each of them forwards it to ${f} new people, who each forward it to ${f} more new people, and so on. Counting ${name}'s emails as the first round, how many emails are sent in ${n} rounds?`;
      label = 'Emails:';
      say = (S) => `$${S}$ emails are sent.`;
    } else {
      prompt = `A soccer club in ${rng.pick(PLACES)} uses a phone tree. The coach calls ${f} players, each of them calls ${f} more players, and so on. If the tree has ${n} levels of calls, how many calls are made in total?`;
      label = 'Calls:';
      say = (S) => `$${S}$ calls are made.`;
    }
  } else if (kind === 'ancestors') {
    n = rng.int(5, 12);
    t1 = 2;
    r = frac(2);
    prompt = `Every person has 2 parents, 4 grandparents, 8 great-grandparents, and so on. Assuming no one appears twice, how many ancestors does a person have in the previous ${n} generations?`;
    label = 'Ancestors:';
    say = (S) => `There are $${S}$ ancestors in ${n} generations.`;
  } else {
    n = rng.int(4, 8);
    t1 = 2 ** (n - 1);
    r = frac(1, 2);
    prompt = `A single-elimination volleyball tournament starts with ${2 ** n} teams. In each round, teams play in pairs and the loser of each game is out. How many games are played in the whole tournament?`;
    label = 'Games:';
    say = (S) => `$${S}$ games are played.`;
  }
  const { S, step } = geoSumExact(frac(t1), r, n);
  return {
    prompt,
    parts: [numPart(fracValue(S), { label })],
    hints: ['Write the number in each round (or level, or generation) as a geometric sequence: what are $t_1$ and $r$?', 'Add the terms with $S_n = \\dfrac{t_1(r^n - 1)}{r - 1}$.'],
    solution: [
      kind === 'tournament'
        ? `Round 1 has $${t1}$ games, and each round has half as many: $t_1 = ${t1}$, $r = \\frac{1}{2}$, $n = ${n}$.`
        : `The terms are $${[0, 1, 2].map((i) => nx(t1 * fracValue(r) ** i)).join(',\\ ')},\\ \\ldots$, so $t_1 = ${t1}$, $r = ${fl(r)}$, $n = ${n}$.`,
      step,
      say(fl(S)),
    ],
  };
}

function geoApplyD2(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['salary', 'oil', 'app', 'pendulum'] as const);
  if (kind === 'salary') {
    const { a, pct, n, S } = retry(
      () => {
        const a0 = rng.int(76, 130) * 500;
        const p0 = rng.pick([2, 2.5, 3, 3.5, 4]);
        const n0 = rng.int(5, 15);
        const rr = 1 + p0 / 100;
        return { a: a0, pct: p0, n: n0, S: (a0 * (rr ** n0 - 1)) / (rr - 1) };
      },
      (o) => safeRound(o.S, 2),
    );
    const rr = cl(1 + pct / 100);
    const job = rng.pick(['an engineer', 'a lab technician', 'a physiotherapist', 'a software developer', 'a geologist', 'an electrician']);
    return {
      prompt: `${name} starts work as ${job} in ${rng.pick(PLACES)} with a salary of ${dollars(a)} in the first year. The salary goes up by ${pct}% each year, so each year's salary is ${nx(rr)} times the year before. What is the total salary earned over ${n} years, to the nearest cent?`,
      parts: [numPart(S, { label: 'Total: \\$', decimals: 2, tolerance: 0.011 })],
      hints: ['The yearly salaries form a geometric sequence. What are $t_1$ and $r$?', 'Use $S_n = \\dfrac{t_1(r^n - 1)}{r - 1}$ and round only at the end.'],
      solution: [
        `$t_1 = ${nx(a)}$, $r = ${nx(rr)}$, $n = ${n}$`,
        `$S_{${n}} = \\dfrac{${nx(a)}(${nx(rr)}^{${n}} - 1)}{${nx(rr)} - 1}$`,
        `$S_{${n}} \\approx ${nx(roundTo(S, 4))}$`,
        `The total salary is ${cash(S)}.`,
      ],
    };
  }
  const c =
    kind === 'oil'
      ? { t1: rng.int(30, 90) * 1000, rates: [5, 8, 10, 12, 15], down: true, dp: 0, n: [6, 15] as const }
      : kind === 'app'
        ? { t1: rng.int(2, 12) * 100, rates: [10, 15, 20, 25], down: false, dp: 0, n: [7, 14] as const }
        : { t1: rng.int(40, 90), rates: [5, 10, 15, 20], down: true, dp: 1, n: [8, 20] as const };
  const { pct, n, S } = retry(
    () => {
      const p0 = rng.pick(c.rates);
      const n0 = rng.int(c.n[0], c.n[1]);
      const rr = c.down ? 1 - p0 / 100 : 1 + p0 / 100;
      return { pct: p0, n: n0, S: (c.t1 * (rr ** n0 - 1)) / (rr - 1) };
    },
    (o) => safeRound(o.S, c.dp),
  );
  const rr = cl(c.down ? 1 - pct / 100 : 1 + pct / 100);
  let prompt: string;
  let label: string;
  let suffix: string;
  let unitWord: string;
  if (kind === 'oil') {
    prompt = `An oil well in a northern oil field produces $${nx(c.t1)}$ barrels in its first year. Each year after that, it produces ${pct}% less than the year before. Using this model, what is the total production over the first ${n} years, to the nearest barrel?`;
    label = 'Total:';
    suffix = 'barrels';
    unitWord = 'barrels';
  } else if (kind === 'app') {
    prompt = `A new game app is downloaded $${nx(c.t1)}$ times on its first day. Each day after that, the number of downloads is ${pct}% more than the day before. Using this model, how many downloads are there in total over the first ${n} days, to the nearest whole number?`;
    label = 'Total:';
    suffix = 'downloads';
    unitWord = 'downloads';
  } else {
    prompt = `A pendulum swings through an arc of $${c.t1}$ cm on its first swing. Each swing after that is ${pct}% shorter than the swing before. What total distance does the pendulum travel in its first ${n} swings, to the nearest tenth of a centimetre?`;
    label = 'Distance:';
    suffix = 'cm';
    unitWord = 'cm';
  }
  return {
    prompt,
    parts: [numPart(S, { label, suffix, decimals: c.dp })],
    hints: [`Each term is ${c.down ? `${100 - pct}%` : `${100 + pct}%`} of the one before, so $r = ${nx(rr)}$.`, 'Use $S_n = \\dfrac{t_1(r^n - 1)}{r - 1}$ and round only at the end.'],
    solution: [
      `$t_1 = ${nx(c.t1)}$, $r = ${c.down ? `1 - ${nx(pct / 100)}` : `1 + ${nx(pct / 100)}`} = ${nx(rr)}$, $n = ${n}$`,
      `$S_{${n}} = \\dfrac{${nx(c.t1)}(${nx(rr)}^{${n}} - 1)}{${nx(rr)} - 1} \\approx ${nx(roundTo(S, 3))}$`,
      `The total is about $${fixed(S, c.dp)}$ ${unitWord}.`,
    ],
  };
}

function geoApplyD3(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['ball', 'ball', 'email', 'pay'] as const);
  if (kind === 'ball') {
    const { h, r, k, D, up } = retry(
      () => {
        const hh = rng.pick([2, 3, 4, 5, 6, 8, 10, 12, 15]);
        const rr = rng.pick([0.4, 0.5, 0.6, 0.7, 0.75, 0.8]);
        const kk = rng.int(3, 7);
        const upSum = (hh * rr * (1 - rr ** (kk - 1))) / (1 - rr);
        return { h: hh, r: rr, k: kk, up: upSum, D: hh + 2 * upSum };
      },
      (o) => safeRound(o.D, 1),
    );
    const pct = Math.round(r * 100);
    return {
      prompt: `A ball is dropped from a height of $${h}$ m. Each time it hits the ground, it bounces back up to ${pct}% of the height it fell from. What total vertical distance has the ball travelled when it hits the ground for the ${ord(k)} time? Round to the nearest tenth of a metre.`,
      parts: [numPart(D, { label: 'Distance:', suffix: 'm', decimals: 1 })],
      hints: [`Draw the path. The ball falls ${h} m once, then each bounce goes up and comes back down the same distance.`, `Before hitting the ground the ${ord(k)} time, the ball makes ${k - 1} bounces. Add the bounce heights with a geometric series, double the sum, and add the first drop.`],
      solution: [
        `The first drop is $${h}$ m. The bounce heights are $${nx(h * r)},\\ ${nx(h * r * r)},\\ \\ldots$, a geometric series with $t_1 = ${nx(h * r)}$ and $r = ${nx(r)}$.`,
        `Before the ${ord(k)} hit there are ${k - 1} bounces: $S_{${k - 1}} = \\dfrac{${nx(h * r)}(1 - ${nx(r)}^{${k - 1}})}{1 - ${nx(r)}} \\approx ${nx(roundTo(up, 4))}$`,
        `Each bounce is travelled up and down, so the total is $${h} + 2(${nx(roundTo(up, 4))}) \\approx ${nx(roundTo(D, 4))}$`,
        `The ball has travelled about $${fixed(D, 1)}$ m.`,
      ],
    };
  }
  if (kind === 'email') {
    const f = rng.int(2, 5);
    const n = retry(() => rng.int(4, 9), (x) => f ** x <= 2e6);
    const S = (f * (f ** n - 1)) / (f - 1);
    return {
      prompt: `${name} starts a chain email by sending it to ${f} people. Each person who receives it forwards it to ${f} new people. Counting ${name}'s emails as the first round, after how many rounds will a total of $${nx(S)}$ emails have been sent?`,
      parts: [numPart(n, { label: 'Rounds:' })],
      hints: [`The emails in each round form a geometric sequence with $t_1 = ${f}$ and $r = ${f}$.`, `Set $S_n = ${nx(S)}$, isolate $${f}^n$, and write the result as a power of ${f}.`],
      solution: [
        `$${nx(S)} = \\dfrac{${f}(${f}^n - 1)}{${f} - 1}$`,
        `$${f}^n - 1 = \\dfrac{${nx(S)}(${f - 1})}{${f}} = ${nx(f ** n - 1)}$`,
        `$${f}^n = ${nx(f ** n)} = ${f}^{${n}}$, so $n = ${n}$.`,
        `After ${n} rounds, $${nx(S)}$ emails have been sent.`,
      ],
    };
  }
  const c = rng.pick([1, 2, 5]);
  const n = rng.int(12, 22);
  const cents = c * (2 ** n - 1);
  const S = cents / 100;
  return {
    prompt: `${name} is offered a job that pays ${c} cent${c > 1 ? 's' : ''} on day 1, with the daily pay doubling every day after that. After how many days will the total pay be ${cash(S)}?`,
    parts: [numPart(n, { label: 'Days:' })],
    hints: [`Work in cents: the daily pay is geometric with $t_1 = ${c}$ and $r = 2$, and the total is $${nx(cents)}$ cents.`, 'Set $S_n$ equal to the total, isolate $2^n$, and write the result as a power of 2.'],
    solution: [
      `In cents, the total is $${fixed(S, 2)} \\times 100 = ${nx(cents)}$.`,
      `$${nx(cents)} = \\dfrac{${c}(2^n - 1)}{2 - 1}${c === 1 ? '' : ` = ${c}(2^n - 1)`}$`,
      `$2^n - 1 = ${nx(2 ** n - 1)}$, so $2^n = ${nx(2 ** n)}$`,
      `$${nx(2 ** n)} = 2^{${n}}$, so $n = ${n}$.`,
      `The total pay reaches ${cash(S)} after ${n} days.`,
    ],
  };
}

const geoSumApply = skill({
  id: 'm201-geo-sum-apply',
  name: 'Geometric series problems',
  description: 'Solve problems with geometric series, such as chain emails, doubling pay, salary increases and the total distance travelled by a bouncing ball.',
  outcomes: ['RF10'],
  lessonId: 'm201-1-4',
  calculator: true,
  gen(rng, diff) {
    if (diff === 1) return geoApplyD1(rng);
    if (diff === 2) return geoApplyD2(rng);
    return geoApplyD3(rng);
  },
});

// ---------------------------------------------------------------------------
// Lesson 1.5 — Infinite geometric series
// ---------------------------------------------------------------------------

const absLess = (r: Frac) => Math.abs(r.n) < r.d;
const relTex = (r: Frac) => (Math.abs(r.n) < r.d ? '<' : Math.abs(r.n) > r.d ? '>' : '=');

/** First terms of a geometric series with integer (or terminating) values, as Fracs. */
function geoTerms(t1: Frac, r: Frac, count = 4): Frac[] {
  return Array.from({ length: count }, (_, i) => fracMul(t1, fpow(r, i)));
}

/** A first term that keeps the first `count` terms whole numbers. */
function wholeStart(rng: Rng, r: Frac, count = 4, maxC = 4): Frac {
  return frac(rng.int(1, maxC) * r.d ** (count - 1) * (rng.chance(0.15) ? -1 : 1));
}

function convergeChoices(rng: Rng, t1: Frac, r: Frac, dec: boolean) {
  const rt = (x: Frac) => fv(x, dec && x.d !== 1 ? toDecOk(x) : false);
  const say = (conv: boolean, x: Frac) => `${conv ? 'Converges' : 'Diverges'}: $r = ${rt(x)}$ and $|r| ${relTex(x)} 1$`;
  const conv = absLess(r);
  const correct = say(conv, r);
  // Real mistakes: dividing the wrong way (1/r), and misremembering the rule. Two choices say
  // "converges" and two say "diverges", so the verdict alone does not give the answer away.
  const inv = frac(r.d, r.n);
  const distractors = [say(absLess(inv), inv), say(!conv, r), say(!absLess(inv), inv)];
  if (r.n === -r.d) {
    // r = -1: 1/r = r, so add the classic "it cancels" and "use the formula anyway" errors.
    distractors.push('Converges: the terms cancel in pairs, so the sum is 0');
    distractors.push(`Converges: $S_\\infty = \\dfrac{t_1}{1 - r} = ${fl(fracDiv(t1, fracSub(frac(1), r)))}$`);
  }
  return mc(rng, correct, distractors);
}

/** True when a fraction is a short terminating decimal (shown as a decimal when the series uses decimals). */
function toDecOk(x: Frac): boolean {
  let d = x.d;
  while (d % 2 === 0) d /= 2;
  while (d % 5 === 0) d /= 5;
  return d === 1 && x.d <= 1000;
}

function convergeSolution(t1: Frac, r: Frac, dec: boolean, given = false): string[] {
  const t2 = fracMul(t1, r);
  const rt = fv(r, dec && toDecOk(r));
  return [
    given ? `The general term is $t_1 r^{n - 1}$, so $r = ${rt}$.` : `$r = \\dfrac{t_2}{t_1} = \\dfrac{${fv(t2, dec)}}{${fv(t1, dec)}} = ${rt}$`,
    relTex(r) === '=' ? '$|r| = 1$, which is not less than 1.' : `$|r| = ${fv(fabs(r), dec && toDecOk(r))}$, so $|r| ${relTex(r)} 1$.`,
    absLess(r)
      ? 'An infinite geometric series with $|r| < 1$ converges: its terms shrink toward 0 and the partial sums approach a limit.'
      : relTex(r) === '='
        ? `An infinite geometric series with $|r| \\ge 1$ diverges. Here the partial sums alternate between $${fl(t1)}$ and $0$ and never settle on one value.`
        : 'An infinite geometric series with $|r| \\ge 1$ diverges: its terms do not shrink toward 0, so the partial sums do not approach a limit.',
  ];
}

const infiniteConverge = skill({
  id: 'm201-infinite-converge',
  name: 'Convergence of infinite geometric series',
  description: 'Decide whether an infinite geometric series converges or diverges by checking whether |r| < 1, and explain why.',
  outcomes: ['RF10'],
  lessonId: 'm201-1-5',
  format: 'mc',
  gen(rng, diff) {
    const hints = ['Find the common ratio $r = t_2 \\div t_1$.', 'An infinite geometric series converges (has a finite sum) only when $|r| < 1$, that is, when $-1 < r < 1$.'];
    if (diff === 1) {
      const r = rng.pick([frac(1, 2), frac(1, 3), frac(1, 4), frac(2, 3), frac(3, 4), frac(2), frac(3), frac(3, 2), frac(4), frac(5, 2)]);
      const t1 = r.n > r.d ? frac(rng.int(1, 4) * r.d ** 3) : wholeStart(rng, r, 4, 3);
      const series = seriesFrac(geoTerms(t1, r));
      return {
        prompt: `Does the infinite geometric series $${series}$ converge or diverge?`,
        parts: [{ answer: convergeChoices(rng, t1, r, false) }],
        hints,
        solution: [...convergeSolution(t1, r, false), `The series ${absLess(r) ? 'converges' : 'diverges'}.`],
      };
    }
    if (diff === 2) {
      const mode = rng.pick(['neg', 'dec', 'one', 'general'] as const);
      let r: Frac;
      let t1: Frac;
      let dec = false;
      if (mode === 'neg' || mode === 'general') {
        r = rng.pick([frac(-1, 2), frac(-2, 3), frac(-3, 4), frac(-4, 3), frac(-3, 2), frac(-2), frac(-1, 3), frac(-5, 4), frac(4, 5), frac(5, 4)]);
        t1 = frac(rng.int(1, 4) * r.d ** 3 * (rng.chance(0.2) ? -1 : 1));
      } else if (mode === 'dec') {
        r = rng.pick([frac(9, 10), frac(11, 10), frac(-4, 5), frac(21, 20), frac(-6, 5), frac(19, 20), frac(-1, 2)]);
        t1 = frac(rng.pick([100, 200, 400, 1000]));
        dec = true;
      } else {
        r = frac(-1);
        t1 = frac(rng.int(2, 12) * (rng.chance(0.3) ? -1 : 1));
      }
      if (mode === 'general') {
        return {
          prompt: `An infinite geometric series has general term $t_n = ${fl(t1)}${pbase(r)}^{n - 1}$. Does the series converge or diverge?`,
          parts: [{ answer: convergeChoices(rng, t1, r, false) }],
          hints: ['Compare the general term with $t_n = t_1 r^{n - 1}$ to read off $r$.', hints[1]],
          solution: [...convergeSolution(t1, r, false, true), `The series ${absLess(r) ? 'converges' : 'diverges'}.`],
        };
      }
      const series = seriesFrac(geoTerms(t1, r), dec);
      return {
        prompt: `Does the infinite geometric series $${series}$ converge or diverge?`,
        parts: [{ answer: convergeChoices(rng, t1, r, dec) }],
        hints,
        solution: [...convergeSolution(t1, r, dec), `The series ${absLess(r) ? 'converges' : 'diverges'}.`],
      };
    }
    if (rng.chance(0.55)) {
      const fam = rng.pick(['kx', 'xk', 'shift'] as const);
      const k = rng.int(2, 5);
      if (fam === 'kx') {
        const a = rng.int(1, 4);
        const term = (i: number) => (i === 0 ? `${a}` : `${a * k ** i}x${i > 1 ? `^${i}` : ''}`);
        return {
          prompt: `For which values of $x$ does the infinite geometric series $${[0, 1, 2, 3].map(term).join(' + ')} + \\cdots$ converge?`,
          parts: [{ answer: mc(rng, `$-\\frac{1}{${k}} < x < \\frac{1}{${k}}$`, [`$-${k} < x < ${k}$`, `$x < \\frac{1}{${k}}$`, `$0 < x < \\frac{1}{${k}}$`]) }],
          hints: ['Find the common ratio. It contains $x$.', 'The series converges when $|r| < 1$. Solve that inequality for $x$.'],
          solution: [`$r = \\dfrac{${a * k}x}{${a}} = ${k}x$`, `The series converges when $|r| < 1$: $|${k}x| < 1$`, `$-1 < ${k}x < 1$`, `Divide by ${k}: $-\\frac{1}{${k}} < x < \\frac{1}{${k}}$`],
        };
      }
      if (fam === 'xk') {
        const a = rng.int(1, 2) * k ** 2;
        const term = (i: number) => (i === 0 ? `${a}` : `${a / k ** i === 1 ? '' : a / k ** i}x${i > 1 ? `^${i}` : ''}`);
        return {
          prompt: `For which values of $x$ does the infinite geometric series $${[0, 1, 2].map(term).join(' + ')} + \\cdots$ converge?`,
          parts: [{ answer: mc(rng, `$-${k} < x < ${k}$`, [`$-\\frac{1}{${k}} < x < \\frac{1}{${k}}$`, `$x < ${k}$`, `$0 < x < ${k}$`]) }],
          hints: ['Find the common ratio. It contains $x$.', 'The series converges when $|r| < 1$. Solve that inequality for $x$.'],
          solution: [`$r = \\dfrac{${term(1)}}{${a}} = \\dfrac{x}{${k}}$`, `The series converges when $\\left|\\dfrac{x}{${k}}\\right| < 1$`, `$-1 < \\dfrac{x}{${k}} < 1$`, `Multiply by ${k}: $-${k} < x < ${k}$`],
        };
      }
      const h = rng.nonZero(-4, 4);
      const inner = `x ${sx(-h)}`;
      return {
        prompt: `For which values of $x$ does the infinite geometric series $1 + \\dfrac{${inner}}{${k}} + \\dfrac{(${inner})^2}{${k * k}} + \\cdots$ converge?`,
        parts: [{ answer: mc(rng, `$${h - k} < x < ${h + k}$`, [`$-${k} < x < ${k}$`, `$x < ${h + k}$`, `$${-h - k} < x < ${-h + k}$`]) }],
        hints: ['Find the common ratio. It contains $x$.', 'The series converges when $|r| < 1$. Solve that inequality for $x$.'],
        solution: [`$r = \\dfrac{${inner}}{${k}}$`, `The series converges when $\\left|\\dfrac{${inner}}{${k}}\\right| < 1$`, `$-${k} < ${inner} < ${k}$`, `${h > 0 ? `Add ${h}` : `Subtract ${-h}`}: $${h - k} < x < ${h + k}$`],
      };
    }
    // Which series has a sum?
    const good = rng.pick([frac(1, 2), frac(-1, 2), frac(2, 3), frac(-2, 3), frac(3, 4), frac(-3, 4), frac(1, 3), frac(-1, 3)]);
    const inv = frac(good.d, good.n);
    const third = retry(() => rng.pick([frac(3, 2), frac(-3, 2), frac(5, 4), frac(2), frac(-2), frac(4, 3)]), (x) => fracValue(x) !== fracValue(inv));
    const rs = [good, frac(-1), inv, third];
    const series = rs.map((r) => {
      const t1 = Math.abs(r.n) === 1 && r.d === 1 ? frac(rng.int(2, 9)) : frac(rng.int(1, 3) * Math.max(r.d, 1) ** 3);
      return { r, tex: seriesFrac(geoTerms(t1, r)) };
    });
    return {
      prompt: 'Which infinite geometric series has a finite sum?',
      parts: [{ answer: mc(rng, `$${series[0].tex}$`, series.slice(1).map((s) => `$${s.tex}$`)) }],
      hints,
      solution: [...series.map((s) => `$${s.tex}$: $r = ${fl(s.r)}$, so $|r| ${relTex(s.r)} 1$.`), `Only $${series[0].tex}$ has $|r| < 1$, so it is the only one that converges to a finite sum.`],
    };
  },
});

// ---- Sums -----------------------------------------------------------------

/** S_inf = t1 / (1 - r), as one line. */
function infStep(t1: Frac, r: Frac, dec = false): { S: Frac; step: string } {
  const den = fracSub(frac(1), r);
  const S = fracDiv(t1, den);
  return {
    S,
    step: `$S_\\infty = \\dfrac{t_1}{1 - r} = \\dfrac{${fv(t1, dec)}}{1 - ${fneg(r, dec)}} = \\dfrac{${fv(t1, dec)}}{${fv(den, dec)}} = ${fl(S)}$`,
  };
}

function repeatingDecimal(rng: Rng): GenOutput {
  const kind = rng.pick(['two', 'mixed', 'three', 'whole'] as const);
  const prompt = (tex: string) => `Write $${tex}$ as a fraction in lowest terms by treating it as an infinite geometric series.`;
  const hints = ['Split the repeating part into a sum of terms that each shift the digits further right.', 'The repeating part is an infinite geometric series. Use $S_\\infty = \\dfrac{t_1}{1 - r}$.'];
  if (kind === 'mixed') {
    const a = rng.int(1, 9);
    const b = rng.intExcept(1, 9, [a]);
    const v = frac(9 * a + b, 90);
    return {
      prompt: prompt(`0.${a}\\overline{${b}}`),
      parts: [numPart(fracValue(v), { label: 'Fraction:' })],
      hints,
      solution: [
        `$0.${a}\\overline{${b}} = 0.${a} + (0.0${b} + 0.00${b} + 0.000${b} + \\cdots)$`,
        `The bracket is geometric with $t_1 = 0.0${b}$ and $r = 0.1$: $\\dfrac{0.0${b}}{1 - 0.1} = \\dfrac{0.0${b}}{0.9} = \\dfrac{${b}}{90}$`,
        `$0.${a}\\overline{${b}} = \\dfrac{${a}}{10} + \\dfrac{${b}}{90} = \\dfrac{${9 * a}}{90} + \\dfrac{${b}}{90} = \\dfrac{${9 * a + b}}{90}${v.d !== 90 ? ` = ${fl(v, true)}` : ''}$`,
      ],
    };
  }
  const three = kind === 'three';
  const digits = three ? retry(() => rng.int(101, 998), (x) => new Set(String(x)).size > 1 && x % 111 !== 0) : retry(() => rng.int(10, 98), (x) => x % 11 !== 0);
  const w = kind === 'whole' ? rng.int(1, 4) : 0;
  const len = three ? 3 : 2;
  const den = three ? 999 : 99;
  const s = String(digits).padStart(len, '0');
  const v = frac(w * den + digits, den);
  const zeros = (z: number) => '0'.repeat(z);
  const t1 = `0.${s}`;
  const t2 = `0.${zeros(len)}${s}`;
  const t3 = `0.${zeros(2 * len)}${s}`;
  const r = `0.${zeros(len - 1)}1`;
  const tex = `${w}.\\overline{${s}}`;
  const part0 = frac(digits, den);
  return {
    prompt: prompt(tex),
    parts: [numPart(fracValue(v), { label: 'Fraction:' })],
    hints,
    solution: [
      `$${tex} = ${w ? `${w} + ` : ''}${t1} + ${t2} + ${t3} + \\cdots$`,
      `${w ? 'After the whole number, the' : 'The'} series is geometric with $t_1 = ${t1}$ and $r = ${r}$.`,
      `$S_\\infty = \\dfrac{${t1}}{1 - ${r}} = \\dfrac{${t1}}{0.${'9'.repeat(len)}} = \\dfrac{${digits}}{${den}}${part0.d !== den ? ` = ${fl(part0, true)}` : ''}$`,
      w ? `$${tex} = ${w} + ${fl(part0, true)} = ${fl(v, true)}$` : `So $${tex} = ${fl(v, true)}$.`,
    ],
  };
}

const infiniteSum = skill({
  id: 'm201-infinite-sum',
  name: 'Sum of an infinite geometric series',
  description: 'Find the sum of a convergent infinite geometric series with S∞ = t₁/(1 − r), solve for t₁ or r, and apply it to bouncing balls and repeating decimals.',
  outcomes: ['RF10'],
  lessonId: 'm201-1-5',
  calculator: true,
  gen(rng, diff) {
    if (diff === 1) {
      const r = rng.pick([frac(1, 2), frac(1, 3), frac(1, 4), frac(2, 3), frac(3, 4), frac(1, 5), frac(2, 5), frac(3, 5)]);
      const t1 = frac(rng.int(1, 5) * r.d ** 2);
      const terms = geoTerms(t1, r, 3);
      const { S, step } = infStep(t1, r);
      return {
        prompt: `Find the sum of the infinite geometric series $${seriesFrac(terms)}$.`,
        parts: [numPart(fracValue(S), { label: '$S_\\infty =$' })],
        hints: ['Find $r$ and check that $|r| < 1$.', 'Use $S_\\infty = \\dfrac{t_1}{1 - r}$.'],
        solution: [`$r = \\dfrac{${fl(terms[1])}}{${fl(t1)}} = ${fl(r)}$, and $|r| < 1$, so the series converges.`, step, `So $S_\\infty = ${fl(S)}$.`],
      };
    }
    if (diff === 2) {
      const mode = rng.pick(['neg', 'first', 'ratio'] as const);
      if (mode === 'neg') {
        const dec = rng.chance(0.4);
        const r = dec ? rng.pick([frac(-2, 5), frac(-1, 5), frac(-3, 5), frac(-1, 2), frac(-4, 5), frac(-3, 10)]) : rng.pick([frac(-1, 2), frac(-1, 3), frac(-2, 3), frac(-3, 4), frac(-1, 4), frac(-3, 5)]);
        const t1 = dec ? frac(rng.pick([10, 20, 30, 40, 50, 60, 100])) : frac(rng.int(1, 4) * r.d ** 2);
        const terms = geoTerms(t1, r, 3);
        const { S, step } = infStep(t1, r, dec);
        return {
          prompt: `Find the exact sum of the infinite geometric series $${seriesFrac(terms, dec)}$.`,
          parts: [numPart(fracValue(S), { label: '$S_\\infty =$' })],
          hints: ['The ratio is negative. Check that $|r| < 1$.', 'Use $S_\\infty = \\dfrac{t_1}{1 - r}$. Subtracting a negative ratio makes the denominator bigger than 1.'],
          solution: [`$r = \\dfrac{${fv(terms[1], dec)}}{${fv(t1, dec)}} = ${fv(r, dec)}$, and $|r| < 1$, so the series converges.`, step, `So $S_\\infty = ${fl(S)}$.`],
        };
      }
      const r = rng.pick([frac(1, 2), frac(1, 3), frac(2, 3), frac(1, 4), frac(3, 4), frac(-1, 2), frac(-1, 3), frac(2, 5), frac(-1, 4), frac(1, 5), frac(4, 5)]);
      const c = rng.int(2, 9);
      const S = c * r.d;
      const t1 = c * (r.d - r.n);
      if (mode === 'first') {
        return {
          prompt: `An infinite geometric series has common ratio $r = ${fl(r)}$ and sum $S_\\infty = ${S}$. Find the first term, $t_1$.`,
          parts: [numPart(t1, { label: '$t_1 =$' })],
          hints: ['Substitute into $S_\\infty = \\dfrac{t_1}{1 - r}$.', 'Multiply both sides by $(1 - r)$.'],
          solution: [`$${S} = \\dfrac{t_1}{1 - ${fneg(r)}} = \\dfrac{t_1}{${fl(fracSub(frac(1), r))}}$`, `$t_1 = ${S}\\left(${fl(fracSub(frac(1), r))}\\right) = ${t1}$`],
        };
      }
      const q = frac(t1, S);
      return {
        prompt: `An infinite geometric series has first term $t_1 = ${t1}$ and sum $S_\\infty = ${S}$. Find the common ratio, $r$.`,
        parts: [numPart(fracValue(r), { label: '$r =$' })],
        hints: ['Substitute into $S_\\infty = \\dfrac{t_1}{1 - r}$.', 'Solve for $1 - r$ first, then for $r$.'],
        solution: [`$${S} = \\dfrac{${t1}}{1 - r}$`, `$1 - r = \\dfrac{${t1}}{${S}} = ${fl(q)}$`, `$r = 1 - ${fl(q)} = ${fl(r)}$`, `Check: $|r| < 1$, so the series does converge.`],
      };
    }
    if (rng.chance(0.5)) return repeatingDecimal(rng);
    const h = rng.pick([2, 3, 4, 5, 6, 8, 9, 10, 12, 15]);
    const r = rng.pick([frac(1, 2), frac(3, 5), frac(3, 4), frac(2, 3), frac(4, 5), frac(2, 5)]);
    const pctForm = r.d === 5 || r.d === 4 || r.d === 2;
    const rWords = pctForm ? `${Math.round(fracValue(r) * 100)}%` : `$${fl(r)}$`;
    const hr = fracMul(frac(h), r);
    const down = fracDiv(frac(h), fracSub(frac(1), r));
    const up = fracDiv(hr, fracSub(frac(1), r));
    const total = fracValue(down) + fracValue(up);
    const rt = pctForm ? nx(fracValue(r)) : fl(r);
    return {
      prompt: `A ball is dropped from a height of $${h}$ m. Each time it hits the ground, it bounces back up to ${rWords} of the height it fell from. In theory it keeps bouncing forever. Find the total vertical distance it travels, to the nearest tenth of a metre.`,
      parts: [numPart(total, { label: 'Distance:', suffix: 'm', decimals: 1 })],
      hints: ['Split the path into the downward distances and the upward distances. Each is an infinite geometric series.', 'Down: $t_1 = $ the drop height. Up: $t_1 = $ the first bounce height. Both have the same $r$.'],
      solution: [
        `Down: $${h} + ${fv(hr, pctForm)} + \\cdots = \\dfrac{${h}}{1 - ${rt}} = ${fl(down)}$`,
        `Up: $${fv(hr, pctForm)} + ${fv(fracMul(hr, r), pctForm)} + \\cdots = \\dfrac{${fv(hr, pctForm)}}{1 - ${rt}} = ${fl(up)}$`,
        `Total: $${fl(down)} + ${fl(up)} = ${fl(fracAdd(down, up))}${Number.isInteger(total) ? '' : ` \\approx ${fixed(total, 1)}`}$`,
        `The ball travels about $${fixed(total, 1)}$ m in total.`,
      ],
    };
  },
});

export const SEQUENCE_SKILLS: SkillDef[] = [
  arithTerm,
  arithGeneral,
  arithUnknown,
  arithSumSkill,
  arithSumApply,
  geoTerm,
  geoUnknown,
  geoSum,
  geoSumApply,
  infiniteConverge,
  infiniteSum,
];
