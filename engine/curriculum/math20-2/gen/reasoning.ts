/** Math 20-2 Unit 1 — Inductive and Deductive Reasoning (NL1, NL2). */
import { fixedChoice, mc, numPart, skill } from '../../helpers.ts';
import type { GenOutput } from '../../helpers.ts';
import { fmt, isPrime } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Choice, Part, PlaneFigure, SkillDef } from '../../../types.ts';
import { NAMES, Sketch, type P } from './angles.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const oddIn = (rng: Rng, lo: number, hi: number) => 2 * rng.int(Math.ceil((lo - 1) / 2), Math.floor((hi - 1) / 2)) + 1;
const evenIn = (rng: Rng, lo: number, hi: number) => 2 * rng.int(Math.ceil(lo / 2), Math.floor(hi / 2));
const isSquare = (n: number) => n >= 0 && Number.isInteger(Math.sqrt(n));
const bullets = (lines: string[]) => lines.map((l) => `- ${l}`).join('\n');
const numbered = (lines: string[]) => lines.map((l, i) => `${i + 1}. ${l}`).join('\n');
const ORD = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];

/** "2n + 3", "n - 4", "5" ... as LaTeX for a*v + b. */
function lin(a: number, b: number, v = 'n'): string {
  const head = a === 0 ? '' : a === 1 ? v : a === -1 ? `-${v}` : `${a}${v}`;
  if (!head) return String(b);
  if (b === 0) return head;
  return `${head} ${b < 0 ? '-' : '+'} ${Math.abs(b)}`;
}

/** An order answer whose starting arrangement is never already correct. */
function orderAnswer(rng: Rng, steps: string[]): AnswerSpec {
  let perm: number[];
  do perm = rng.shuffle(steps.map((_, i) => i));
  while (perm.every((v, i) => v === i));
  const items: Choice[] = perm.map((orig, i) => ({ id: 'abcdefgh'[i], md: steps[orig] }));
  return { kind: 'order', items, correctOrder: steps.map((_, orig) => items[perm.indexOf(orig)].id) };
}

const ORDER_NOTE = 'Use the arrows to move the steps so that the **first step is at the top**.';

// ---------------------------------------------------------------------------
// Lesson 1.1 — Making conjectures (inductive reasoning)
// ---------------------------------------------------------------------------

interface Conj {
  intro: string;
  examples: string[];
  /** Show the examples as a table instead of a list. */
  table?: { headers: string[]; rows: string[][] };
  correct: string;
  fits: string;
  ds: Array<{ md: string; why: string }>;
  predict?: { q: string; value: number; steps: string[]; label?: string; suffix?: string };
}

function famOddSum(rng: Rng, who: string): Conj {
  for (;;) {
    const pairs = Array.from({ length: 4 }, () => [oddIn(rng, 3, 59), oddIn(rng, 3, 59)] as [number, number]);
    if (pairs.some(([a, b]) => a === b)) continue;
    const sums = pairs.map(([a, b]) => a + b);
    const not4 = sums.find((s) => s % 4 !== 0);
    const not3 = sums.find((s) => s % 3 !== 0);
    if (not4 === undefined || not3 === undefined || new Set(sums).size < 4) continue;
    return {
      intro: `${who} adds pairs of odd numbers:`,
      examples: pairs.map(([a, b], i) => `$${a} + ${b} = ${sums[i]}$`),
      correct: 'The sum of two odd numbers is even.',
      fits: 'Every sum in the examples is even.',
      ds: [
        { md: 'The sum of two odd numbers is odd.', why: `$${sums[0]}$ is even.` },
        { md: 'The sum of two odd numbers is a multiple of 4.', why: `$${not4}$ is not a multiple of 4.` },
        { md: 'The sum of two odd numbers is a multiple of 3.', why: `$${not3}$ is not a multiple of 3.` },
      ],
    };
  }
}

function famOddProduct(rng: Rng, who: string): Conj {
  for (;;) {
    const pairs = Array.from({ length: 4 }, () => [oddIn(rng, 3, 15), oddIn(rng, 3, 15)] as [number, number]);
    const prods = pairs.map(([a, b]) => a * b);
    const not3 = prods.find((p) => p % 3 !== 0);
    if (not3 === undefined || new Set(prods).size < 4) continue;
    return {
      intro: `${who} multiplies pairs of odd numbers:`,
      examples: pairs.map(([a, b], i) => `$${a} \\times ${b} = ${prods[i]}$`),
      correct: 'The product of two odd numbers is odd.',
      fits: 'Every product in the examples is odd.',
      ds: [
        { md: 'The product of two odd numbers is even.', why: `$${prods[0]}$ is odd.` },
        { md: 'The product of two odd numbers is a multiple of 3.', why: `$${not3}$ is not a multiple of 3.` },
        { md: 'The product of two odd numbers is a prime number.', why: `$${prods[1]} = ${pairs[1][0]} \\times ${pairs[1][1]}$ is not prime.` },
      ],
    };
  }
}

function famEvenOdd(rng: Rng, who: string): Conj {
  for (;;) {
    const pairs = Array.from({ length: 4 }, () => [evenIn(rng, 4, 40), oddIn(rng, 3, 39)] as [number, number]);
    const sums = pairs.map(([a, b]) => a + b);
    const not5 = sums.find((s) => s % 5 !== 0);
    const comp = sums.find((s) => !isPrime(s));
    if (not5 === undefined || comp === undefined || new Set(sums).size < 4) continue;
    return {
      intro: `${who} adds an even number and an odd number several times:`,
      examples: pairs.map(([a, b], i) => `$${a} + ${b} = ${sums[i]}$`),
      correct: 'The sum of an even number and an odd number is odd.',
      fits: 'Every sum in the examples is odd.',
      ds: [
        { md: 'The sum of an even number and an odd number is even.', why: `$${sums[0]}$ is odd.` },
        { md: 'The sum of an even number and an odd number is a multiple of 5.', why: `$${not5}$ is not a multiple of 5.` },
        { md: 'The sum of an even number and an odd number is a prime number.', why: `$${comp}$ is not prime.` },
      ],
    };
  }
}

function famOddSquare(rng: Rng, who: string): Conj {
  for (;;) {
    const ns = rng.sample([3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25], 4);
    const sq = ns.map((n) => n * n);
    const not1 = sq.find((s) => s % 10 !== 1);
    const not3 = sq.find((s) => s % 3 !== 0);
    if (not1 === undefined || not3 === undefined) continue;
    return {
      intro: `${who} squares some odd numbers:`,
      examples: ns.map((n, i) => `$${n}^2 = ${sq[i]}$`),
      correct: 'The square of an odd number is odd.',
      fits: 'Every square in the examples is odd.',
      ds: [
        { md: 'The square of an odd number is even.', why: `$${sq[0]}$ is odd.` },
        { md: 'The square of an odd number ends in the digit 1.', why: `$${not1}$ does not end in 1.` },
        { md: 'The square of an odd number is a multiple of 3.', why: `$${not3}$ is not a multiple of 3.` },
      ],
    };
  }
}

function famConsec3(rng: Rng, who: string, predict: boolean): Conj {
  for (;;) {
    const starts = rng.sample(Array.from({ length: 40 }, (_, i) => i + 3), 4);
    const mids = starts.map((s) => s + 1);
    const sums = mids.map((m) => 3 * m);
    const odd = sums.find((s) => s % 2 === 1);
    if (odd === undefined) continue;
    const P = rng.int(25, 95);
    return {
      intro: `${who} adds sets of three consecutive integers:`,
      examples: starts.map((s, i) => `$${s} + ${s + 1} + ${s + 2} = ${sums[i]}$`),
      correct: 'The sum of three consecutive integers is three times the middle integer.',
      fits: `In every example the sum is three times the middle number, for example $3 \\times ${mids[0]} = ${sums[0]}$.`,
      ds: [
        { md: 'The sum of three consecutive integers is even.', why: `$${odd}$ is odd.` },
        { md: 'The sum of three consecutive integers is twice the largest integer.', why: `$2 \\times ${starts[0] + 2} = ${2 * (starts[0] + 2)}$, not $${sums[0]}$.` },
        { md: 'The sum of three consecutive integers is the square of the middle integer.', why: `$${mids[1]}^2 = ${mids[1] ** 2}$, not $${sums[1]}$.` },
      ],
      predict: predict
        ? {
            q: `Use your conjecture to find $${P - 1} + ${P} + ${P + 1}$ without adding.`,
            value: 3 * P,
            label: 'Sum',
            steps: [`The middle integer is $${P}$, so the sum is $3 \\times ${P} = ${3 * P}$.`],
          }
        : undefined,
    };
  }
}

function famConsecProduct(rng: Rng, who: string): Conj {
  for (;;) {
    const ns = rng.sample(Array.from({ length: 28 }, (_, i) => i + 2), 4);
    const prods = ns.map((n) => n * (n + 1));
    const not4 = prods.find((p) => p % 4 !== 0);
    const not3 = prods.find((p) => p % 3 !== 0);
    if (not4 === undefined || not3 === undefined) continue;
    return {
      intro: `${who} multiplies pairs of consecutive integers:`,
      examples: ns.map((n, i) => `$${n} \\times ${n + 1} = ${prods[i]}$`),
      correct: 'The product of two consecutive integers is even.',
      fits: 'Every product in the examples is even.',
      ds: [
        { md: 'The product of two consecutive integers is odd.', why: `$${prods[0]}$ is even.` },
        { md: 'The product of two consecutive integers is a multiple of 4.', why: `$${not4}$ is not a multiple of 4.` },
        { md: 'The product of two consecutive integers is a multiple of 3.', why: `$${not3}$ is not a multiple of 3.` },
      ],
    };
  }
}

function famConsecSquares(rng: Rng, who: string, predict: boolean): Conj {
  for (;;) {
    const ns = rng.sample(Array.from({ length: 27 }, (_, i) => i + 3), 4);
    const d = ns.map((n) => 2 * n + 1);
    const notSq = d.find((v) => !isSquare(v));
    const not3 = d.find((v) => v % 3 !== 0);
    if (notSq === undefined || not3 === undefined) continue;
    const P = rng.pick([20, 30, 40, 50, 60, 70, 80, 90, 100]) + rng.int(0, 9);
    return {
      intro: `${who} finds the difference between the squares of two consecutive integers:`,
      examples: ns.map((n, i) => `$${n + 1}^2 - ${n}^2 = ${d[i]}$`),
      correct: 'The difference between the squares of two consecutive integers equals the sum of the two integers.',
      fits: `In every example the difference equals the sum of the two integers, for example $${ns[0] + 1} + ${ns[0]} = ${d[0]}$.`,
      ds: [
        { md: 'The difference between the squares of two consecutive integers is even.', why: `$${d[0]}$ is odd.` },
        { md: 'The difference between the squares of two consecutive integers is a perfect square.', why: `$${notSq}$ is not a perfect square.` },
        { md: 'The difference between the squares of two consecutive integers is a multiple of 3.', why: `$${not3}$ is not a multiple of 3.` },
      ],
      predict: predict
        ? {
            q: `Use your conjecture to find $${P + 1}^2 - ${P}^2$ without squaring.`,
            value: 2 * P + 1,
            label: 'Difference',
            steps: [`The difference equals the sum of the two integers: $${P + 1} + ${P} = ${2 * P + 1}$.`],
          }
        : undefined,
    };
  }
}

function famReversal(rng: Rng, who: string): Conj {
  for (;;) {
    const pairs: Array<[number, number]> = [];
    while (pairs.length < 4) {
      const a = rng.int(2, 9);
      const b = rng.int(1, a - 1);
      if (!pairs.some(([x, y]) => x === a && y === b)) pairs.push([a, b]);
    }
    const diffs = pairs.map(([a, b]) => 9 * (a - b));
    const even = diffs.find((v) => v % 2 === 0);
    const notSq = diffs.find((v) => !isSquare(v));
    const not18 = diffs.find((v) => v % 18 !== 0);
    if (even === undefined || notSq === undefined || not18 === undefined) continue;
    return {
      intro: `${who} takes a two-digit number, reverses its digits, and subtracts the smaller number from the larger:`,
      examples: pairs.map(([a, b], i) => `$${a}${b} - ${b}${a} = ${diffs[i]}$`),
      correct: 'The difference between a two-digit number and its reversal is a multiple of 9.',
      fits: 'Every difference in the examples is a multiple of 9.',
      ds: [
        { md: 'The difference between a two-digit number and its reversal is odd.', why: `$${even}$ is even.` },
        { md: 'The difference between a two-digit number and its reversal is a perfect square.', why: `$${notSq}$ is not a perfect square.` },
        { md: 'The difference between a two-digit number and its reversal is a multiple of 18.', why: `$${not18}$ is not a multiple of 18.` },
      ],
    };
  }
}

function famTrick(rng: Rng, who: string, predict: boolean): Conj {
  const m = rng.int(2, 5);
  const a = rng.int(4, 15);
  const b = rng.int(1, a - 1);
  const c = a - b;
  const starts = rng.sample(
    Array.from({ length: 40 }, (_, i) => i + 2).filter((s) => s !== c && s !== c - 1 && s !== 2 * c),
    4,
  );
  const steps = [`Add $${a}$.`, `Multiply by $${m}$.`, `Subtract $${m * b}$.`, `Divide by $${m}$.`, 'Subtract the number you started with.'];
  const parity = c % 2 === 1 ? { md: 'The result is always even.', why: `the result $${c}$ is odd.` } : { md: 'The result is always odd.', why: `the result $${c}$ is even.` };
  const S = rng.pick([2026, 1000, 365, 999, 4321]);
  return {
    intro: `${who} tries a number trick: choose a number. ${steps.join(' ')} Here are the results:`,
    examples: starts.map((s) => `Start with $${s}$: $${s} + ${a} = ${s + a}$, $${s + a} \\times ${m} = ${m * (s + a)}$, $${m * (s + a)} - ${m * b} = ${m * (s + a) - m * b}$, $${m * (s + a) - m * b} \\div ${m} = ${s + c}$, $${s + c} - ${s} = ${c}$.`),
    correct: `The result is always $${c}$.`,
    fits: `Every example ends with $${c}$.`,
    ds: [
      { md: 'The result is always the number you started with.', why: `starting with $${starts[0]}$ gives $${c}$, not $${starts[0]}$.` },
      parity,
      { md: 'The result is always half the number you started with.', why: `Half of $${starts[1]}$ is $${fmt(starts[1] / 2)}$, not $${c}$.` },
    ],
    predict: predict
      ? { q: `Use your conjecture to predict the result if you start with $${S}$.`, value: c, label: 'Result', steps: [`The conjecture says the result is always $${c}$, so starting with $${S}$ gives $${c}$.`, `Check: $${S} + ${a} = ${S + a}$, $\\times ${m} = ${m * (S + a)}$, $- ${m * b} = ${m * (S + a) - m * b}$, $\\div ${m} = ${S + c}$, $- ${S} = ${c}$.`] }
      : undefined,
  };
}

function famCalendar(rng: Rng, who: string): Conj {
  for (;;) {
    const mids = rng.sample(Array.from({ length: 15 }, (_, i) => i + 9), 4);
    if (!mids.some((m) => m % 2 === 1)) continue;
    const odd = mids.find((m) => m % 2 === 1)!;
    const P = rng.pick(Array.from({ length: 15 }, (_, i) => i + 9).filter((m) => !mids.includes(m)));
    return {
      intro: `On a monthly calendar, ${who} outlines $3 \\times 3$ squares of dates and adds the nine dates in each square. The table shows the middle date of each square and the sum of its nine dates.`,
      examples: [],
      table: { headers: ['Middle date', 'Sum of the nine dates'], rows: mids.map((m) => [String(m), String(9 * m)]) },
      correct: 'The sum of the nine dates is 9 times the middle date.',
      fits: `In every row the sum is 9 times the middle date, for example $9 \\times ${mids[0]} = ${9 * mids[0]}$.`,
      ds: [
        { md: 'The sum of the nine dates is 9 times the smallest date.', why: `the smallest date in the square with middle $${mids[0]}$ is $${mids[0] - 8}$, and $9 \\times ${mids[0] - 8} = ${9 * (mids[0] - 8)}$, not $${9 * mids[0]}$.` },
        { md: 'The sum of the nine dates is always a multiple of 18.', why: `$${9 * odd}$ is not a multiple of 18.` },
        { md: 'The sum of the nine dates is 81 more than the middle date.', why: `$${mids[1]} + 81 = ${mids[1] + 81}$, not $${9 * mids[1]}$.` },
      ],
      predict: { q: `Use your conjecture to find the sum of the nine dates in a $3 \\times 3$ square whose middle date is $${P}$.`, value: 9 * P, label: 'Sum', steps: [`The sum is 9 times the middle date: $9 \\times ${P} = ${9 * P}$.`] },
    };
  }
}

function famTimes11(rng: Rng, who: string): Conj {
  const all: number[] = [];
  for (let a = 1; a <= 8; a++) for (let b = 1; a + b <= 9; b++) all.push(10 * a + b);
  for (;;) {
    const ns = rng.sample(all, 4);
    const prods = ns.map((n) => 11 * n);
    const not1 = prods.find((p) => p % 10 !== 1);
    const oddP = prods.find((p) => p % 2 === 1);
    if (not1 === undefined || oddP === undefined) continue;
    const P = rng.pick(all.filter((n) => !ns.includes(n)));
    const [pa, pb] = [Math.floor(P / 10), P % 10];
    return {
      intro: `${who} multiplies two-digit numbers by 11. In each number, the two digits add to less than 10.`,
      examples: ns.map((n, i) => `$${n} \\times 11 = ${prods[i]}$`),
      correct: 'The answer is the first digit, then the sum of the two digits, then the last digit.',
      fits: `In every example the middle digit is the sum of the two digits, for example $${ns[0]} \\times 11 = ${prods[0]}$ and $${Math.floor(ns[0] / 10)} + ${ns[0] % 10} = ${Math.floor(ns[0] / 10) + (ns[0] % 10)}$.`,
      ds: [
        { md: 'The answer is the number written twice.', why: `$${ns[0]} \\times 11 = ${prods[0]}$, not $${ns[0]}${ns[0]}$.` },
        { md: 'The answer always ends in the digit 1.', why: `$${not1}$ does not end in 1.` },
        { md: 'The answer is always even.', why: `$${oddP}$ is odd.` },
      ],
      predict: { q: `Use your conjecture to find $${P} \\times 11$.`, value: 11 * P, label: 'Product', steps: [`The digits of $${P}$ are $${pa}$ and $${pb}$, and $${pa} + ${pb} = ${pa + pb}$.`, `So $${P} \\times 11 = ${11 * P}$.`] },
    };
  }
}

function famNearSquares(rng: Rng, who: string): Conj {
  for (;;) {
    const ns = rng.sample(Array.from({ length: 12 }, (_, i) => i + 4), 4);
    const prods = ns.map((n) => (n - 1) * (n + 1));
    const even = prods.find((p) => p % 2 === 0);
    if (even === undefined) continue;
    const P = rng.pick([20, 30, 40, 50, 60, 70, 80, 90]);
    return {
      intro: `${who} multiplies pairs of integers that differ by 2 and compares each product with the square of the integer between them:`,
      examples: ns.map((n, i) => `$${n - 1} \\times ${n + 1} = ${prods[i]}$ and $${n}^2 = ${n * n}$`),
      correct: 'The product of two integers that differ by 2 is one less than the square of the integer between them.',
      fits: `In every example the product is one less than the square, for example $${prods[0]} = ${ns[0] * ns[0]} - 1$.`,
      ds: [
        { md: 'The product of two integers that differ by 2 equals the square of the integer between them.', why: `$${prods[0]} \\ne ${ns[0] * ns[0]}$.` },
        { md: 'The product of two integers that differ by 2 is one more than the square of the integer between them.', why: `$${prods[1]}$ is less than $${ns[1] * ns[1]}$, not more.` },
        { md: 'The product of two integers that differ by 2 is always odd.', why: `$${even}$ is even.` },
      ],
      predict: { q: `Use your conjecture to find $${P - 1} \\times ${P + 1}$ without a calculator.`, value: P * P - 1, label: 'Product', steps: [`The integer between them is $${P}$, and $${P}^2 = ${P * P}$.`, `$${P - 1} \\times ${P + 1} = ${P * P} - 1 = ${P * P - 1}$`] },
    };
  }
}

const conjecture = skill({
  id: 'm202-conjecture',
  name: 'Choosing a conjecture',
  description: 'Choose the conjecture that fits every example, and use a conjecture to predict a new case.',
  outcomes: ['NL1'],
  lessonId: 'm202-1-1',
  format: 'mc',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    const fam =
      d === 1
        ? rng.pick([famOddSum, famOddProduct, famEvenOdd, famOddSquare])(rng, who)
        : d === 2
          ? rng.pick([(r: Rng, w: string) => famConsec3(r, w, false), famConsecProduct, (r: Rng, w: string) => famConsecSquares(r, w, false), famReversal, (r: Rng, w: string) => famTrick(r, w, false)])(rng, who)
          : rng.pick([(r: Rng, w: string) => famConsec3(r, w, true), (r: Rng, w: string) => famConsecSquares(r, w, true), (r: Rng, w: string) => famTrick(r, w, true), famCalendar, famTimes11, famNearSquares])(rng, who);
    const answer = mc(rng, fam.correct, fam.ds.map((x) => x.md));
    const parts: Part[] = [{ label: fam.predict ? 'Conjecture' : undefined, answer }];
    if (fam.predict) parts.push(numPart(fam.predict.value, { label: fam.predict.label }));
    const shown = fam.table ? '' : `\n\n${bullets(fam.examples)}`;
    return {
      prompt: `${fam.intro}${shown}\n\nWhich conjecture fits all of the examples?${fam.predict ? ` ${fam.predict.q}` : ''}`,
      figure: fam.table ? { type: 'table', headers: fam.table.headers, rows: fam.table.rows } : undefined,
      parts,
      hints: [
        'Test each conjecture against every example. A single example that does not fit rules a conjecture out.',
        'Look for what all the results have in common: even or odd, multiples, or how each result is related to the numbers used.',
      ],
      solution: [
        fam.fits,
        ...fam.ds.map((x) => `"${x.md}" does not fit: ${x.why}`),
        `The conjecture that fits every example is: ${fam.correct}`,
        ...(fam.predict ? fam.predict.steps : []),
      ],
      answerDisplay: fam.predict ? `${fam.correct} ${fam.predict.label}: $${fmt(fam.predict.value)}$` : fam.correct,
    };
  },
});

// Patterns ------------------------------------------------------------------------

interface Pattern {
  unit: 'toothpicks' | 'tiles';
  what: string;
  count: (n: number) => number;
  /** Rule in n (LaTeX) and how to see it. */
  rule: string;
  see: string;
  draw: (s: Sketch, n: number, ox: number) => number;
  /** Wrong rules: [LaTeX, function]. */
  wrong: Array<[string, (n: number) => number]>;
}

/** One square tile, drawn slightly inset so separate tiles (and any gaps) are easy to see and count. */
function tile(s: Sketch, x: number, y: number) {
  const e = 0.07;
  s.polyline([[x + e, y + e], [x + 1 - e, y + e], [x + 1 - e, y + 1 - e], [x + e, y + 1 - e], [x + e, y + e]]);
}

const PATTERNS: Pattern[] = [
  {
    unit: 'toothpicks',
    what: 'squares in a row made from toothpicks',
    count: (n) => 3 * n + 1,
    rule: '3n + 1',
    see: 'The first square uses 4 toothpicks and each new square adds 3 more.',
    draw(s, n, ox) {
      for (let i = 0; i <= n; i++) s.seg([ox + i, 0], [ox + i, 1]);
      s.seg([ox, 0], [ox + n, 0]).seg([ox, 1], [ox + n, 1]);
      return n;
    },
    wrong: [['4n', (n) => 4 * n], ['3n + 4', (n) => 3 * n + 4], ['n + 3', (n) => n + 3]],
  },
  {
    unit: 'toothpicks',
    what: 'triangles in a row made from toothpicks',
    count: (n) => 2 * n + 1,
    rule: '2n + 1',
    see: 'The first triangle uses 3 toothpicks and each new triangle adds 2 more.',
    draw(s, n, ox) {
      const h = 0.87;
      const pts: P[] = [];
      for (let i = 0; i <= n + 1; i++) pts.push(i % 2 === 0 ? [ox + i / 2, 0] : [ox + i / 2, h]);
      // Zigzag edges.
      for (let i = 0; i < n + 1; i++) s.seg(pts[i], pts[i + 1]);
      // Bottom and top edges.
      for (let i = 0; i + 2 <= n + 1; i += 2) s.seg(pts[i], pts[i + 2]);
      for (let i = 1; i + 2 <= n + 1; i += 2) s.seg(pts[i], pts[i + 2]);
      return (n + 1) / 2;
    },
    wrong: [['3n', (n) => 3 * n], ['2n + 3', (n) => 2 * n + 3], ['n + 2', (n) => n + 2]],
  },
  {
    unit: 'toothpicks',
    what: 'houses in a row made from toothpicks',
    count: (n) => 5 * n + 1,
    rule: '5n + 1',
    see: 'The first house uses 6 toothpicks and each new house adds 5 more.',
    draw(s, n, ox) {
      for (let i = 0; i <= n; i++) s.seg([ox + i, 0], [ox + i, 1]);
      s.seg([ox, 0], [ox + n, 0]).seg([ox, 1], [ox + n, 1]);
      for (let i = 0; i < n; i++) s.seg([ox + i, 1], [ox + i + 0.5, 1.6]).seg([ox + i + 0.5, 1.6], [ox + i + 1, 1]);
      return n;
    },
    wrong: [['6n', (n) => 6 * n], ['5n + 6', (n) => 5 * n + 6], ['n + 5', (n) => n + 5]],
  },
  {
    unit: 'tiles',
    what: 'L-shapes made from square tiles',
    count: (n) => 2 * n + 1,
    rule: '2n + 1',
    see: 'Each arm of the L has $n$ tiles, plus 1 corner tile.',
    draw(s, n, ox) {
      tile(s, ox, 0);
      for (let i = 1; i <= n; i++) tile(s, ox + i, 0), tile(s, ox, i);
      return n + 1;
    },
    wrong: [['3n', (n) => 3 * n], ['2n + 3', (n) => 2 * n + 3], ['n + 2', (n) => n + 2]],
  },
  {
    unit: 'tiles',
    what: 'plus signs made from square tiles',
    count: (n) => 4 * n + 1,
    rule: '4n + 1',
    see: 'There is 1 centre tile and 4 arms of $n$ tiles each.',
    draw(s, n, ox) {
      tile(s, ox + n, n);
      for (let i = 1; i <= n; i++) {
        tile(s, ox + n + i, n);
        tile(s, ox + n - i, n);
        tile(s, ox + n, n + i);
        tile(s, ox + n, n - i);
      }
      return 2 * n + 1;
    },
    wrong: [['5n', (n) => 5 * n], ['4n + 5', (n) => 4 * n + 5], ['n + 4', (n) => n + 4]],
  },
  {
    unit: 'tiles',
    what: 'square frames made from square tiles',
    count: (n) => 4 * n + 4,
    rule: '4n + 4',
    see: 'Each of the 4 sides has $n$ tiles, plus 4 corner tiles.',
    draw(s, n, ox) {
      const k = n + 2;
      for (let i = 0; i < k; i++)
        for (let j = 0; j < k; j++) if (i === 0 || j === 0 || i === k - 1 || j === k - 1) tile(s, ox + i, j);
      return k;
    },
    wrong: [['8n', (n) => 8 * n], ['4n + 8', (n) => 4 * n + 8], ['n + 7', (n) => n + 7]],
  },
  {
    unit: 'tiles',
    what: 'squares made from square tiles',
    count: (n) => n * n,
    rule: 'n^2',
    see: 'Figure $n$ is a square $n$ tiles wide and $n$ tiles high.',
    draw(s, n, ox) {
      for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) tile(s, ox + i, j);
      return n;
    },
    wrong: [['3n - 2', (n) => 3 * n - 2], ['2n', (n) => 2 * n], ['n^2 + 1', (n) => n * n + 1]],
  },
  {
    unit: 'tiles',
    what: 'rectangles made from square tiles',
    count: (n) => n * (n + 1),
    rule: 'n(n + 1)',
    see: 'Figure $n$ is a rectangle $n$ tiles high and $n + 1$ tiles wide.',
    draw(s, n, ox) {
      for (let i = 0; i <= n; i++) for (let j = 0; j < n; j++) tile(s, ox + i, j);
      return n + 1;
    },
    wrong: [['4n - 2', (n) => 4 * n - 2], ['n^2 + 1', (n) => n * n + 1], ['2n', (n) => 2 * n]],
  },
  {
    unit: 'tiles',
    what: 'staircases made from square tiles',
    count: (n) => (n * (n + 1)) / 2,
    rule: '\\dfrac{n(n + 1)}{2}',
    see: 'Figure $n$ has columns of $1, 2, 3, \\ldots, n$ tiles; two copies of the staircase make an $n$ by $n + 1$ rectangle.',
    draw(s, n, ox) {
      for (let i = 0; i < n; i++) for (let j = 0; j <= i; j++) tile(s, ox + i, j);
      return n;
    },
    wrong: [['2n - 1', (n) => 2 * n - 1], ['n^2', (n) => n * n], ['3n - 2', (n) => 3 * n - 2]],
  },
];
const LINEAR = PATTERNS.slice(0, 6);
const NONLINEAR = PATTERNS.slice(6);

/** The rule with a figure number substituted, e.g. 3(4) + 1 or 4(5). */
function subRule(rule: string, k: number): string {
  return rule
    .replace('n(n + 1)', `${k}(${k + 1})`)
    .replace('n^2', `${k}^2`)
    .replace(/(\d)n/g, `$1(${k})`)
    .replace(/\bn\b/g, String(k));
}

function patternFigure(p: Pattern, upTo = 3): PlaneFigure {
  const s = new Sketch();
  let ox = 0;
  for (let n = 1; n <= upTo; n++) {
    const w = p.draw(s, n, ox);
    s.textAt([ox + w / 2, -0.9], `Figure ${n}`);
    s.include([ox + w / 2, -1.3]);
    ox += w + 1.6;
  }
  return s.build({ margin: 0.5 });
}

/** Multiplication patterns: line k (k = 1, 2, ...) as [left side LaTeX, value]. */
const MULT_PATTERNS: Array<{ line: (k: number) => [string, number]; max: number }> = [
  { line: (k) => { const a = Number('123456789'.slice(0, k)); return [`${a} \\times 9 + ${k + 1}`, a * 9 + k + 1]; }, max: 8 },
  { line: (k) => { const a = Number('123456789'.slice(0, k)); return [`${a} \\times 8 + ${k}`, a * 8 + k]; }, max: 8 },
  { line: (k) => { const a = 10 ** k - 1; return [`${a} \\times ${a}`, a * a]; }, max: 6 },
  { line: (k) => { const a = Number('1'.repeat(k + 1)); return [`${a} \\times ${a}`, a * a]; }, max: 7 },
  { line: (k) => [`37 \\times ${3 * k}`, 37 * 3 * k], max: 9 },
  { line: (k) => { const a = Number('6'.repeat(k)); return [`${a} \\times ${a + 1}`, a * (a + 1)]; }, max: 6 },
];

const patternConjecture = skill({
  id: 'm202-pattern-conjecture',
  name: 'Conjectures about patterns',
  description: 'Make a conjecture about a number pattern or a geometric pattern and use it to find a later term.',
  outcomes: ['NL1'],
  lessonId: 'm202-1-1',
  gen(rng, d): GenOutput {
    const who = rng.pick(NAMES);
    const hintsFig = (p: Pattern) => [`Count the ${p.unit} in each figure and see how the count changes from one figure to the next.`, `Make a conjecture about how many ${p.unit} Figure $n$ needs. ${p.see}`];
    if (d === 1) {
      const kind = rng.pick(['figure', 'figure', 'arith', 'mult'] as const);
      if (kind === 'figure') {
        const p = rng.pick(PATTERNS);
        const c = [1, 2, 3, 4].map(p.count);
        return {
          prompt: `${who} builds ${p.what}. Figures 1 to 3 are shown. How many ${p.unit} will Figure 4 need?`,
          figure: patternFigure(p),
          parts: [numPart(c[3], { suffix: p.unit })],
          hints: hintsFig(p),
          solution: [`Figures 1, 2 and 3 use $${c[0]}$, $${c[1]}$ and $${c[2]}$ ${p.unit}.`, `${p.see} So Figure $n$ uses $${p.rule}$ ${p.unit}.`, `Figure 4: $${subRule(p.rule, 4)} = ${c[3]}$`, `Figure 4 needs $${c[3]}$ ${p.unit}.`],
        };
      }
      if (kind === 'arith') {
        const geo = rng.chance(0.35);
        const a = geo ? rng.int(2, 7) : rng.int(-8, 25);
        const r = geo ? rng.pick([2, 3]) : rng.intExcept(-9, 12, [0, 1, -1]);
        const terms = Array.from({ length: 6 }, (_, i) => (geo ? a * r ** i : a + r * i));
        return {
          prompt: `Make a conjecture about this number pattern, then use it to find the next number: $${terms.slice(0, 5).join(',\\ ')},\\ \\ldots$`,
          parts: [numPart(terms[5], { label: 'Next number' })],
          hints: ['Compare each number with the one before it. Do you add, subtract or multiply?', geo ? 'Divide each number by the one before it.' : 'Subtract each number from the one after it.'],
          solution: [geo ? `Each number is $${r}$ times the one before: $${terms[1]} \\div ${terms[0]} = ${r}$.` : `Each number is $${r}$ ${r > 0 ? 'more' : 'less'} than the one before: $${terms[1]} - ${terms[0]} = ${r}$.`, `Conjecture: ${geo ? `multiply by $${r}$` : `${r > 0 ? 'add' : 'subtract'} $${Math.abs(r)}$`} each time.`, `Next number: $${terms[4]} ${geo ? `\\times ${r}` : r > 0 ? `+ ${r}` : `- ${-r}`} = ${terms[5]}$`],
        };
      }
      const mp = rng.pick(MULT_PATTERNS);
      const lines = [1, 2, 3, 4].map(mp.line);
      return {
        prompt: `${who} notices a pattern:\n\n${bullets(lines.slice(0, 3).map(([l, v]) => `$${l} = ${v}$`))}\n\nUse the pattern to predict the value of $${lines[3][0]}$.`,
        parts: [numPart(lines[3][1])],
        hints: ['Look at how both sides change from one line to the next.', 'Write the next line of the pattern, then check it with a calculator.'],
        solution: [`From line to line the answers go $${lines.slice(0, 3).map((l) => l[1]).join(', ')}$.`, `Following the pattern, the next line is $${lines[3][0]} = ${lines[3][1]}$.`, `Predicted value: $${lines[3][1]}$ (a calculator confirms it).`],
        calculator: false,
      };
    }
    if (d === 2) {
      const kind = rng.pick(['figure', 'figure', 'nonlinear', 'arith', 'mult'] as const);
      if (kind === 'figure' || kind === 'nonlinear') {
        const p = rng.pick(kind === 'figure' ? LINEAR : NONLINEAR);
        const k = kind === 'figure' ? rng.int(10, 40) : rng.int(6, 15);
        const v = p.count(k);
        const c = [1, 2, 3].map(p.count);
        return {
          prompt: `${who} builds ${p.what}. Figures 1 to 3 are shown. Make a conjecture about the number of ${p.unit} in Figure $n$, then find how many ${p.unit} Figure ${k} needs.`,
          figure: patternFigure(p),
          parts: [numPart(v, { suffix: p.unit })],
          hints: hintsFig(p),
          solution: [`Figures 1, 2 and 3 use $${c[0]}$, $${c[1]}$ and $${c[2]}$ ${p.unit}.`, p.see, `Conjecture: Figure $n$ uses $${p.rule}$ ${p.unit}. Check Figure 3: $${subRule(p.rule, 3)} = ${c[2]}$ ✓`, `Figure ${k}: $${subRule(p.rule, k)} = ${v}$`, `Figure ${k} needs $${v}$ ${p.unit}.`],
        };
      }
      if (kind === 'arith') {
        const a = rng.int(-10, 20);
        const r = rng.intExcept(-8, 12, [0, 1, -1]);
        const k = rng.int(15, 40);
        const terms = Array.from({ length: 5 }, (_, i) => a + r * i);
        const v = a + r * (k - 1);
        return {
          prompt: `The pattern $${terms.join(',\\ ')},\\ \\ldots$ continues in the same way. Make a conjecture about the pattern, then find the ${k}th number.`,
          parts: [numPart(v, { label: `${k}th number` })],
          hints: ['How much does the pattern change from one number to the next?', `To reach the ${k}th number from the 1st, the change happens $${k - 1}$ times.`],
          solution: [`Each number is $${Math.abs(r)}$ ${r > 0 ? 'more' : 'less'} than the one before.`, `The ${k}th number is the first number with $${k - 1}$ changes: $${a} ${r > 0 ? '+' : '-'} ${k - 1} \\times ${Math.abs(r)}$.`, `$${a} ${r > 0 ? '+' : '-'} ${(k - 1) * Math.abs(r)} = ${v}$`, `The ${k}th number is $${v}$.`],
        };
      }
      const mp = rng.pick(MULT_PATTERNS);
      const k = rng.int(5, mp.max);
      const lines = [1, 2, 3].map(mp.line);
      const target = mp.line(k);
      return {
        prompt: `${who} notices a pattern:\n\n${bullets(lines.map(([l, v]) => `$${l} = ${v}$`))}\n\nIf the pattern continues, predict the value of $${target[0]}$.`,
        parts: [numPart(target[1])],
        hints: ['Write the next two lines of the pattern.', 'Look at how the digits of each answer are built from the digits of the line before.'],
        solution: [...[4, 5].filter((j) => j < k).map((j) => { const [l, v] = mp.line(j); return `Line ${j}: $${l} = ${v}$`; }), `Continuing the pattern: $${target[0]} = ${target[1]}$.`, `Predicted value: $${target[1]}$.`],
      };
    }
    // d3: the rule, then which figure uses a given number.
    const p = rng.pick([...LINEAR, ...LINEAR, ...NONLINEAR]);
    const lin3 = LINEAR.includes(p);
    const k = lin3 ? rng.int(12, 45) : rng.int(8, 20);
    const N = p.count(k);
    const ds = p.wrong.filter(([, f]) => [1, 2, 3].some((n) => f(n) !== p.count(n))).map(([w]) => `$${w}$`);
    const c = [1, 2, 3].map(p.count);
    const solveSteps = lin3
      ? (() => {
          const a = p.count(2) - p.count(1);
          const b = p.count(1) - a;
          return [`Solve $${p.rule} = ${N}$: $${a}n = ${N - b}$, so $n = ${k}$.`];
        })()
      : p.rule === 'n^2'
        ? [`Solve $n^2 = ${N}$: $n = \\sqrt{${N}} = ${k}$.`]
        : p.rule === 'n(n + 1)'
          ? [`Solve $n(n + 1) = ${N}$: look for two consecutive integers whose product is $${N}$.`, `$${k} \\times ${k + 1} = ${N}$, so $n = ${k}$.`]
          : [`Solve $\\dfrac{n(n + 1)}{2} = ${N}$: then $n(n + 1) = ${2 * N}$.`, `$${k} \\times ${k + 1} = ${2 * N}$, so $n = ${k}$.`];
    return {
      prompt: `${who} builds ${p.what}. Figures 1 to 3 are shown. Which expression gives the number of ${p.unit} in Figure $n$? Then find which figure uses exactly $${N}$ ${p.unit}.`,
      figure: patternFigure(p),
      parts: [{ label: `${p.unit[0].toUpperCase()}${p.unit.slice(1)} in Figure $n$`, answer: mc(rng, `$${p.rule}$`, ds) }, numPart(k, { label: 'Figure number' })],
      hints: [`Test each expression with $n = 1$, $2$ and $3$. It must match all three figures.`, lin3 ? 'Set the expression equal to the number of pieces and solve for $n$.' : 'Set the expression equal to the number of tiles and use guess and check or square roots.'],
      solution: [
        `Figures 1, 2 and 3 use $${c[0]}$, $${c[1]}$ and $${c[2]}$ ${p.unit}. ${p.see}`,
        ...p.wrong.filter(([w]) => ds.includes(`$${w}$`)).map(([w, f]) => { const n = [1, 2, 3].find((x) => f(x) !== p.count(x))!; return `$${w}$ gives $${f(n)}$ for Figure ${n}, not $${p.count(n)}$.`; }),
        `$${p.rule}$ matches all three figures.`,
        ...solveSteps,
        `Figure $${k}$ uses exactly $${N}$ ${p.unit}.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 1.2 — Counterexamples
// ---------------------------------------------------------------------------

type CxKind = 'counter' | 'support' | 'other';
interface CxCand {
  md: string;
  kind: CxKind;
  why: string;
}
interface CxFamily {
  claim: string;
  intro?: string;
  cands: CxCand[];
}

function cxPrimeOdd(rng: Rng): CxFamily {
  const sup = rng.sample([3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47], 3);
  const oth = rng.sample([9, 15, 21, 25, 27, 33, 35, 39, 45, 49], 2);
  return {
    claim: 'All prime numbers are odd.',
    cands: [
      { md: '$2$', kind: 'counter', why: '$2$ is prime (its only factors are 1 and 2) and it is even, so it disproves the conjecture.' },
      ...sup.map((p) => ({ md: `$${p}$`, kind: 'support' as const, why: `$${p}$ is prime and odd, so it agrees with the conjecture.` })),
      ...oth.map((n) => ({ md: `$${n}$`, kind: 'other' as const, why: `$${n}$ is odd but it is not prime, so it does not test the conjecture.` })),
    ],
  };
}

function cxSquareBigger(rng: Rng): CxFamily {
  const counters: CxCand[] = [
    { md: '$\\dfrac{1}{2}$', kind: 'counter', why: '$\\left(\\dfrac{1}{2}\\right)^2 = \\dfrac{1}{4}$, which is less than $\\dfrac{1}{2}$.' },
    { md: '$1$', kind: 'counter', why: '$1^2 = 1$, which is not greater than $1$.' },
    { md: '$0$', kind: 'counter', why: '$0^2 = 0$, which is not greater than $0$.' },
    { md: '$0.3$', kind: 'counter', why: '$0.3^2 = 0.09$, which is less than $0.3$.' },
  ];
  const sup = rng.sample([2, 3, 5, 10, -1, -4, 1.5], 3).map((n) => ({ md: `$${n}$`, kind: 'support' as const, why: `$${n < 0 ? `(${n})` : n}^2 = ${fmt(n * n)}$, which is greater than $${n}$.` }));
  return { claim: 'The square of a number is always greater than the number.', cands: [rng.pick(counters), ...sup] };
}

function cxDiv4(rng: Rng): CxFamily {
  const ctr = rng.pick([12, 20, 28, 36, 44, 52, 60, 68, 76, 84, 92]);
  const sup = rng.sample([16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96], 3);
  const oth = rng.sample([6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46, 50], 2);
  return {
    claim: 'Every number that is divisible by 4 is also divisible by 8.',
    cands: [
      { md: `$${ctr}$`, kind: 'counter', why: `$${ctr} = 4 \\times ${ctr / 4}$ is divisible by 4, but $${ctr} \\div 8 = ${fmt(ctr / 8)}$ is not a whole number.` },
      ...sup.map((n) => ({ md: `$${n}$`, kind: 'support' as const, why: `$${n}$ is divisible by 4 and by 8 ($${n} = 8 \\times ${n / 8}$), so it agrees with the conjecture.` })),
      ...oth.map((n) => ({ md: `$${n}$`, kind: 'other' as const, why: `$${n}$ is not divisible by 4, so it does not test the conjecture.` })),
    ],
  };
}

function cxMult3(rng: Rng): CxFamily {
  const ctr = rng.pick([6, 12, 18, 24, 30, 36, 42, 48]);
  const sup = rng.sample([9, 15, 21, 27, 33, 39, 45], 3);
  const oth = rng.sample([7, 11, 13, 25, 35, 49], 2);
  return {
    claim: 'Every multiple of 3 is odd.',
    cands: [
      { md: `$${ctr}$`, kind: 'counter', why: `$${ctr} = 3 \\times ${ctr / 3}$ is a multiple of 3, and it is even.` },
      ...sup.map((n) => ({ md: `$${n}$`, kind: 'support' as const, why: `$${n}$ is a multiple of 3 and it is odd, so it agrees with the conjecture.` })),
      ...oth.map((n) => ({ md: `$${n}$`, kind: 'other' as const, why: `$${n}$ is not a multiple of 3, so it does not test the conjecture.` })),
    ],
  };
}

function cxSumGreater(rng: Rng): CxFamily {
  const a = rng.int(2, 9);
  const y = a + rng.int(2, 6);
  const ctr = rng.pick<CxCand>([
    { md: `$-${a}$ and $${y}$`, kind: 'counter', why: `$-${a} + ${y} = ${y - a}$, which is less than $${y}$.` },
    { md: `$0$ and $${a + 3}$`, kind: 'counter', why: `$0 + ${a + 3} = ${a + 3}$, which is not greater than $${a + 3}$.` },
  ]);
  const sup = rng.sample([[3, 8], [2, 11], [6, 7], [4, 9], [5, 5], [10, 1]] as Array<[number, number]>, 3).map(([x, z]) => ({ md: `$${x}$ and $${z}$`, kind: 'support' as const, why: `$${x} + ${z} = ${x + z}$, which is greater than both numbers.` }));
  return { claim: 'The sum of two numbers is always greater than each of the two numbers.', cands: [ctr, ...sup] };
}

function cxProductGreater(rng: Rng): CxFamily {
  const k = rng.int(3, 9);
  const ctr = rng.pick<CxCand>([
    { md: `$1$ and $${k}$`, kind: 'counter', why: `$1 \\times ${k} = ${k}$ and $1 + ${k} = ${k + 1}$: the product is less than the sum.` },
    { md: '$2$ and $2$', kind: 'counter', why: '$2 \\times 2 = 4$ and $2 + 2 = 4$: the product is not greater than the sum.' },
    { md: `$0$ and $${k}$`, kind: 'counter', why: `$0 \\times ${k} = 0$ and $0 + ${k} = ${k}$: the product is less than the sum.` },
  ]);
  const sup = rng.sample([[3, 4], [2, 5], [3, 3], [4, 6], [2, 7], [5, 3]] as Array<[number, number]>, 3).map(([x, y]) => ({ md: `$${x}$ and $${y}$`, kind: 'support' as const, why: `$${x} \\times ${y} = ${x * y}$ is greater than $${x} + ${y} = ${x + y}$.` }));
  return { claim: 'The product of two whole numbers is always greater than their sum.', cands: [ctr, ...sup] };
}

function cxQuad(rng: Rng): CxFamily {
  const s = rng.int(4, 9);
  return {
    claim: 'If a quadrilateral has four equal sides, then it is a square.',
    cands: [
      { md: `a rhombus with sides of ${s} cm and angles of $60^\\circ$ and $120^\\circ$`, kind: 'counter', why: 'the rhombus has four equal sides, but its angles are not right angles, so it is not a square.' },
      { md: `a square with sides of ${s} cm`, kind: 'support', why: 'the square has four equal sides and it is a square, so it agrees with the conjecture.' },
      { md: `a rectangle that is ${s} cm by ${s + 2} cm`, kind: 'other', why: 'the rectangle does not have four equal sides, so it does not test the conjecture.' },
      { md: `a kite with sides of ${s} cm, ${s} cm, ${s + 3} cm and ${s + 3} cm`, kind: 'other', why: 'the kite does not have four equal sides, so it does not test the conjecture.' },
      { md: `a trapezoid with sides of ${s} cm, ${s} cm, ${s} cm and ${2 * s} cm`, kind: 'other', why: 'the trapezoid does not have four equal sides, so it does not test the conjecture.' },
    ],
  };
}

function cxSupp(rng: Rng): CxFamily {
  const pairs = rng.sample([35, 48, 62, 71, 25, 54], 2).map((a) => [a, 180 - a]);
  return {
    claim: 'If two angles are supplementary, then one of them is obtuse.',
    cands: [
      { md: '$90^\\circ$ and $90^\\circ$', kind: 'counter', why: '$90^\\circ + 90^\\circ = 180^\\circ$, so the angles are supplementary, but neither angle is obtuse.' },
      ...pairs.map(([a, b]) => ({ md: `$${a}^\\circ$ and $${b}^\\circ$`, kind: 'support' as const, why: `$${a}^\\circ + ${b}^\\circ = 180^\\circ$ and $${b}^\\circ$ is obtuse, so it agrees with the conjecture.` })),
      { md: '$40^\\circ$ and $50^\\circ$', kind: 'other', why: 'these angles add to $90^\\circ$, not $180^\\circ$, so they are not supplementary and do not test the conjecture.' },
      { md: '$100^\\circ$ and $100^\\circ$', kind: 'other', why: 'these angles add to $200^\\circ$, so they are not supplementary and do not test the conjecture.' },
    ],
  };
}

function cxConsecEven(rng: Rng): CxFamily {
  const oddMid = oddIn(rng, 5, 41);
  const evens = rng.sample([6, 8, 12, 16, 20, 24, 30, 36], 2);
  return {
    claim: 'The sum of any three consecutive integers is even.',
    cands: [
      { md: `$${oddMid - 1}, ${oddMid}, ${oddMid + 1}$`, kind: 'counter', why: `$${oddMid - 1} + ${oddMid} + ${oddMid + 1} = ${3 * oddMid}$, which is odd.` },
      ...evens.map((m) => ({ md: `$${m - 1}, ${m}, ${m + 1}$`, kind: 'support' as const, why: `$${m - 1} + ${m} + ${m + 1} = ${3 * m}$, which is even, so it agrees with the conjecture.` })),
      { md: '$4, 6, 8$', kind: 'other', why: '$4$, $6$ and $8$ are not consecutive integers, so they do not test the conjecture.' },
      { md: '$3, 5, 7$', kind: 'other', why: '$3$, $5$ and $7$ are not consecutive integers, so they do not test the conjecture.' },
    ],
  };
}

function cxPrime41(rng: Rng): CxFamily {
  const f = (n: number) => n * n + n + 41;
  const ctr = rng.pick([40, 41]);
  const sup = rng.sample([1, 2, 3, 5, 8, 10, 12, 15, 20, 25, 30, 39], 3);
  for (const n of sup) if (!isPrime(f(n))) throw new Error('n^2 + n + 41');
  return {
    claim: 'For every whole number $n$, the value of $n^2 + n + 41$ is a prime number.',
    cands: [
      { md: `$n = ${ctr}$`, kind: 'counter', why: ctr === 40 ? '$40^2 + 40 + 41 = 1681 = 41 \\times 41$, which is not prime.' : '$41^2 + 41 + 41 = 1763 = 41 \\times 43$, which is not prime.' },
      ...sup.map((n) => ({ md: `$n = ${n}$`, kind: 'support' as const, why: `$${n}^2 + ${n} + 41 = ${f(n)}$, which is prime, so it agrees with the conjecture.` })),
    ],
  };
}

function cxMersenne(rng: Rng): CxFamily {
  const sup = rng.sample([2, 3, 5, 7, 13], 3);
  return {
    claim: 'If $n$ is a prime number, then $2^n - 1$ is also a prime number.',
    cands: [
      { md: '$n = 11$', kind: 'counter', why: '$11$ is prime, but $2^{11} - 1 = 2047 = 23 \\times 89$, which is not prime.' },
      ...sup.map((n) => ({ md: `$n = ${n}$`, kind: 'support' as const, why: `$${n}$ is prime and $2^{${n}} - 1 = ${2 ** n - 1}$ is prime, so it agrees with the conjecture.` })),
      { md: '$n = 4$', kind: 'other', why: '$4$ is not prime, so it does not test the conjecture (even though $2^4 - 1 = 15$ is not prime).' },
      { md: '$n = 9$', kind: 'other', why: '$9$ is not prime, so it does not test the conjecture.' },
    ],
  };
}

function cxLeap(rng: Rng): CxFamily {
  const ctr = rng.pick([1700, 1800, 1900, 2100, 2200, 2300]);
  const sup = rng.sample([1996, 2000, 2008, 2012, 2024, 2400, 1600], 3);
  const oth = rng.sample([2023, 2026, 1999, 2101, 1901], 2);
  return {
    intro: 'In the calendar we use, a year is a leap year when it is divisible by 4, **except** that a year divisible by 100 is a leap year only if it is also divisible by 400.',
    claim: 'Every year that is divisible by 4 is a leap year.',
    cands: [
      { md: `the year ${ctr}`, kind: 'counter', why: `${ctr} is divisible by 4 and by 100 but not by 400, so it is not a leap year.` },
      ...sup.map((y) => ({ md: `the year ${y}`, kind: 'support' as const, why: `${y} is divisible by 4 and it is a leap year${y % 100 === 0 ? ` (it is divisible by 400)` : ''}, so it agrees with the conjecture.` })),
      ...oth.map((y) => ({ md: `the year ${y}`, kind: 'other' as const, why: `${y} is not divisible by 4, so it does not test the conjecture.` })),
    ],
  };
}

function cxCircle(rng: Rng): CxFamily {
  const regions = (n: number) => 1 + (n * (n - 1)) / 2 + (n * (n - 1) * (n - 2) * (n - 3)) / 24;
  const ctr = rng.pick([6, 7]);
  return {
    intro: 'Points are placed on a circle and every pair of points is joined with a chord, placed so that no three chords meet at one point. With 1, 2, 3, 4 and 5 points, the circle is cut into 1, 2, 4, 8 and 16 regions.',
    claim: 'With $n$ points, the circle is cut into $2^{n - 1}$ regions.',
    cands: [
      { md: `$n = ${ctr}$`, kind: 'counter', why: `With ${ctr} points there are only ${regions(ctr)} regions, not $2^{${ctr - 1}} = ${2 ** (ctr - 1)}$.` },
      ...rng.sample([2, 3, 4, 5], 3).map((n) => ({ md: `$n = ${n}$`, kind: 'support' as const, why: `With ${n} points there are ${regions(n)} regions, and $2^{${n - 1}} = ${2 ** (n - 1)}$, so it agrees with the conjecture.` })),
    ],
  };
}

function cxSquareOfSum(rng: Rng): CxFamily {
  const a = rng.int(2, 6);
  const b = rng.int(1, 5);
  const zeros = rng.sample([[0, 4], [5, 0], [0, -3], [-2, 0], [0, 7]] as Array<[number, number]>, 3);
  const p = (x: number) => (x < 0 ? `(${x})` : `${x}`);
  return {
    claim: 'For all numbers $a$ and $b$, $(a + b)^2 = a^2 + b^2$.',
    cands: [
      { md: `$a = ${a}$, $b = ${b}$`, kind: 'counter', why: `$(${a} + ${b})^2 = ${(a + b) ** 2}$, but $${a}^2 + ${b}^2 = ${a * a + b * b}$.` },
      ...zeros.map(([x, y]) => ({ md: `$a = ${x}$, $b = ${y}$`, kind: 'support' as const, why: `$(${x} + ${p(y)})^2 = ${(x + y) ** 2}$ and $${p(x)}^2 + ${p(y)}^2 = ${x * x + y * y}$, so the two sides are equal.` })),
    ],
  };
}

function cxMonths(rng: Rng): CxFamily {
  const ctr = rng.pick(['July', 'December']);
  const sup = rng.sample(['March', 'May', 'August', 'October'], 3);
  const oth = rng.sample(['April', 'June', 'September', 'November'], 2);
  const next: Record<string, string> = { March: 'April', May: 'June', August: 'September', October: 'November', July: 'August', December: 'January' };
  return {
    intro: 'The months have these numbers of days: January 31, February 28 or 29, March 31, April 30, May 31, June 30, July 31, August 31, September 30, October 31, November 30, December 31.',
    claim: 'Every month with 31 days is followed by a month with 30 days.',
    cands: [
      { md: ctr, kind: 'counter', why: `${ctr} has 31 days and so does the month after it, ${next[ctr]}.` },
      ...sup.map((m) => ({ md: m, kind: 'support' as const, why: `${m} has 31 days and ${next[m]} has 30, so it agrees with the conjecture.` })),
      ...oth.map((m) => ({ md: m, kind: 'other' as const, why: `${m} has 30 days, so it does not test the conjecture.` })),
    ],
  };
}

const NONE = 'None of these is a counterexample.';

const counterexample = skill({
  id: 'm202-counterexample',
  name: 'Counterexamples',
  description: 'Choose the counterexample that disproves a conjecture, or recognize that none of the choices disproves it.',
  outcomes: ['NL1'],
  lessonId: 'm202-1-2',
  format: 'mc',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    const fam = (d === 1 ? rng.pick([cxPrimeOdd, cxSquareBigger, cxDiv4, cxMult3, cxSumGreater]) : d === 2 ? rng.pick([cxProductGreater, cxQuad, cxSupp, cxConsecEven, cxSquareOfSum, cxMonths, cxDiv4]) : rng.pick([cxPrime41, cxMersenne, cxLeap, cxCircle, cxQuad, cxSupp, cxConsecEven]))(rng);
    const ctr = fam.cands.find((c) => c.kind === 'counter')!;
    const non = rng.shuffle(fam.cands.filter((c) => c.kind !== 'counter'));
    const noneCorrect = d > 1 && rng.chance(0.25);
    let shown: CxCand[];
    let answer: AnswerSpec;
    if (noneCorrect) {
      shown = non.slice(0, 3);
      // "None of these" is always the last choice.
      answer = fixedChoice([...shown.map((c) => c.md), NONE], 3);
    } else if (d > 1) {
      shown = rng.shuffle([ctr, ...non.slice(0, 2)]);
      answer = fixedChoice([...shown.map((c) => c.md), NONE], shown.indexOf(ctr));
    } else {
      shown = [ctr, ...non.slice(0, 3)];
      answer = mc(rng, ctr.md, non.slice(0, 3).map((c) => c.md));
    }
    return {
      prompt: `${fam.intro ? `${fam.intro}\n\n` : ''}${who} makes this conjecture: "${fam.claim}"\n\nWhich of these is a counterexample to the conjecture?`,
      parts: [{ answer }],
      hints: ['A counterexample must satisfy the **condition** in the conjecture and still give a result that makes the conclusion false.', 'Test each choice. Examples that agree with the conjecture, or that do not meet its condition, cannot disprove it.'],
      solution: [...shown.map((c) => `${c.md.charAt(0).toUpperCase()}${c.md.slice(1)}: ${c.why}`), noneCorrect ? 'None of the choices is a counterexample, even though the conjecture is false: a counterexample exists, but it is not one of the choices.' : `The counterexample is ${ctr.md}.`],
      answerDisplay: noneCorrect ? NONE : ctr.md,
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 1.3 — Deductive proofs and errors in proofs
// ---------------------------------------------------------------------------

const VARS: Array<[string, string]> = [
  ['m', 'n'],
  ['a', 'b'],
  ['j', 'k'],
  ['p', 'q'],
  ['r', 's'],
];

interface ProofT {
  claim: string;
  steps: (u: string, v: string) => string[];
}

const PROOFS: ProofT[] = [
  {
    claim: 'the sum of two odd integers is even',
    steps: (u, v) => [
      `Let the two odd integers be $2${u} + 1$ and $2${v} + 1$, where $${u}$ and $${v}$ are integers.`,
      `Their sum is $(2${u} + 1) + (2${v} + 1) = 2${u} + 2${v} + 2$.`,
      `Factor out 2: $2${u} + 2${v} + 2 = 2(${u} + ${v} + 1)$.`,
      `$${u} + ${v} + 1$ is an integer, so $2(${u} + ${v} + 1)$ is even. The sum of two odd integers is even.`,
    ],
  },
  {
    claim: 'the sum of an even integer and an odd integer is odd',
    steps: (u, v) => [
      `Let the even integer be $2${u}$ and the odd integer be $2${v} + 1$, where $${u}$ and $${v}$ are integers.`,
      `Their sum is $2${u} + (2${v} + 1) = 2${u} + 2${v} + 1$.`,
      `Factor 2 out of the first two terms: $2${u} + 2${v} + 1 = 2(${u} + ${v}) + 1$.`,
      `$2(${u} + ${v})$ is even, and one more than an even integer is odd. The sum is odd.`,
    ],
  },
  {
    claim: 'the product of two odd integers is odd',
    steps: (u, v) => [
      `Let the two odd integers be $2${u} + 1$ and $2${v} + 1$, where $${u}$ and $${v}$ are integers.`,
      `Their product is $(2${u} + 1)(2${v} + 1) = 4${u}${v} + 2${u} + 2${v} + 1$.`,
      `Factor 2 out of the first three terms: $2(2${u}${v} + ${u} + ${v}) + 1$.`,
      `$2(2${u}${v} + ${u} + ${v})$ is even, and one more than an even integer is odd. The product is odd.`,
    ],
  },
  {
    claim: 'the sum of three consecutive integers is three times the middle integer',
    steps: (_u, v) => [
      `Let the three consecutive integers be $${v} - 1$, $${v}$ and $${v} + 1$, where $${v}$ is an integer.`,
      `Their sum is $(${v} - 1) + ${v} + (${v} + 1)$.`,
      `Collect like terms: the sum is $3${v}$.`,
      `$3${v}$ is three times the middle integer $${v}$.`,
    ],
  },
  {
    claim: 'the sum of five consecutive integers is divisible by 5',
    steps: (_u, v) => [
      `Let the five consecutive integers be $${v} - 2$, $${v} - 1$, $${v}$, $${v} + 1$ and $${v} + 2$, where $${v}$ is an integer.`,
      `Their sum is $(${v} - 2) + (${v} - 1) + ${v} + (${v} + 1) + (${v} + 2)$.`,
      `Collect like terms: the sum is $5${v}$.`,
      `$5${v}$ is 5 times an integer, so the sum is divisible by 5.`,
    ],
  },
  {
    claim: 'the difference between the squares of two consecutive integers equals the sum of the integers',
    steps: (_u, v) => [
      `Let the consecutive integers be $${v}$ and $${v} + 1$, where $${v}$ is an integer.`,
      `The difference of their squares is $(${v} + 1)^2 - ${v}^2$.`,
      `Expand: $${v}^2 + 2${v} + 1 - ${v}^2 = 2${v} + 1$.`,
      `$2${v} + 1 = ${v} + (${v} + 1)$, which is the sum of the two integers.`,
    ],
  },
  {
    claim: 'the square of an odd integer is odd',
    steps: (_u, v) => [
      `Let the odd integer be $2${v} + 1$, where $${v}$ is an integer.`,
      `Its square is $(2${v} + 1)^2 = 4${v}^2 + 4${v} + 1$.`,
      `Factor 2 out of the first two terms: $2(2${v}^2 + 2${v}) + 1$.`,
      `$2(2${v}^2 + 2${v})$ is even, and one more than an even integer is odd. The square is odd.`,
    ],
  },
  {
    claim: 'the sum of two consecutive odd integers is a multiple of 4',
    steps: (_u, v) => [
      `Let the consecutive odd integers be $2${v} + 1$ and $2${v} + 3$, where $${v}$ is an integer.`,
      `Their sum is $(2${v} + 1) + (2${v} + 3) = 4${v} + 4$.`,
      `Factor out 4: $4${v} + 4 = 4(${v} + 1)$.`,
      `$4(${v} + 1)$ is 4 times an integer, so the sum is a multiple of 4.`,
    ],
  },
  {
    claim: 'the difference between a two-digit number and the number with its digits reversed is a multiple of 9',
    steps: (u, v) => [
      `Let the digits be $${u}$ and $${v}$, so the number is $10${u} + ${v}$ and its reversal is $10${v} + ${u}$.`,
      `The difference is $(10${u} + ${v}) - (10${v} + ${u})$.`,
      `Simplify: $10${u} + ${v} - 10${v} - ${u} = 9${u} - 9${v}$.`,
      `Factor: $9${u} - 9${v} = 9(${u} - ${v})$, which is a multiple of 9.`,
    ],
  },
  {
    claim: 'the sum of a two-digit number and the number with its digits reversed is a multiple of 11',
    steps: (u, v) => [
      `Let the digits be $${u}$ and $${v}$, so the number is $10${u} + ${v}$ and its reversal is $10${v} + ${u}$.`,
      `The sum is $(10${u} + ${v}) + (10${v} + ${u})$.`,
      `Collect like terms: $11${u} + 11${v}$.`,
      `Factor: $11${u} + 11${v} = 11(${u} + ${v})$, which is a multiple of 11.`,
    ],
  },
];

/** A number trick: add a, multiply by m, subtract m·b, divide by m, subtract the start. Result a − b. */
function trickData(rng: Rng) {
  const m = rng.int(2, 6);
  const a = rng.int(3, 15);
  const b = rng.int(1, a - 1);
  const ops = [`Add $${a}$.`, `Multiply by $${m}$.`, `Subtract $${m * b}$.`, `Divide by $${m}$.`, 'Subtract the number you started with.'];
  const exprs = [lin(1, a), lin(m, m * a), lin(m, m * (a - b)), lin(1, a - b), String(a - b)];
  return { m, a, b, c: a - b, ops, exprs };
}

const SYLLOGISMS: Array<(who: string, rng: Rng) => { premises: string[]; correct: string; ds: string[] }> = [
  (who) => ({
    premises: ['All players on the school relay team train on Saturday mornings.', `${who} is on the school relay team.`],
    correct: `${who} trains on Saturday mornings.`,
    ds: [`Everyone who trains on Saturday mornings is on the relay team.`, `${who} is the fastest runner on the team.`, `${who} does not train on Saturday mornings.`],
  }),
  (_who, rng) => {
    const n = rng.pick([84, 96, 126, 156, 222, 312]);
    return {
      premises: ['If a number is divisible by 6, then it is divisible by 3.', `$${n}$ is divisible by 6.`],
      correct: `$${n}$ is divisible by 3.`,
      ds: [`Every number divisible by 3 is divisible by 6.`, `$${n}$ is divisible by 12.`, `$${n}$ is not divisible by 3.`],
    };
  },
  () => ({
    premises: ['The interior angles of every quadrilateral add to $360^\\circ$.', 'A kite is a quadrilateral.'],
    correct: 'The interior angles of a kite add to $360^\\circ$.',
    ds: ['Every quadrilateral is a kite.', 'All four angles of a kite are $90^\\circ$.', 'The interior angles of a kite add to $180^\\circ$.'],
  }),
  (who) => ({
    premises: ['All employees at the downtown garden centre have completed first-aid training.', `${who} is an employee at the downtown garden centre.`],
    correct: `${who} has completed first-aid training.`,
    ds: [`Everyone with first-aid training works at the garden centre.`, `${who} is a manager at the garden centre.`, `${who} has not completed first-aid training.`],
  }),
  (_who, rng) => {
    const n = rng.pick([470, 1230, 90, 3560]);
    return {
      premises: ['Every multiple of 10 ends in the digit 0.', `$${n}$ is a multiple of 10.`],
      correct: `$${n}$ ends in the digit 0.`,
      ds: ['Every number that ends in 0 is a multiple of 100.', `$${n}$ is a multiple of 20.`, `$${n}$ ends in the digit 5.`],
    };
  },
  () => ({
    premises: ['Vertically opposite angles are equal.', '$\\angle A$ and $\\angle B$ are vertically opposite angles.'],
    correct: '$\\angle A = \\angle B$',
    ds: ['$\\angle A + \\angle B = 180^\\circ$', '$\\angle A$ and $\\angle B$ are both right angles.', 'All equal angles are vertically opposite.'],
  }),
];

const REASONING_KINDS = (who: string) => ({
  deductive: [
    `All triangles have an angle sum of $180^\\circ$. ${who} draws a triangle with angles of $50^\\circ$ and $60^\\circ$ and concludes that the third angle is $70^\\circ$.`,
    `Every bus on Route 8 stops at the library. ${who} is on a Route 8 bus, so ${who} concludes the bus will stop at the library.`,
    `${who} knows that any even number can be written as $2n$, so the sum of two even numbers, $2m + 2n = 2(m + n)$, is always even.`,
  ],
  inductive: [
    `The last five buses on Route 8 were late, so ${who} concludes the next bus will be late.`,
    `${who} measures the angles of six triangles, finds they always add to $180^\\circ$, and concludes this is true for every triangle.`,
    `${who} adds several pairs of even numbers, always gets an even sum, and concludes the sum of two even numbers is always even.`,
    `It rained the last three Saturdays in ${who}’s town, so ${who} concludes it will rain next Saturday.`,
  ],
});

const deductiveProof = skill({
  id: 'm202-deductive-proof',
  name: 'Deductive proofs',
  description: 'Use deductive reasoning and algebra to prove statements about numbers, and put the steps of a proof in order.',
  outcomes: ['NL1'],
  lessonId: 'm202-1-3',
  gen(rng, d): GenOutput {
    const who = rng.pick(NAMES);
    const [u, v] = rng.pick(VARS);
    if (d === 1) {
      const kind = rng.pick(['expr', 'expr', 'syllogism', 'which'] as const);
      if (kind === 'syllogism') {
        const s = rng.pick(SYLLOGISMS)(who, rng);
        return {
          prompt: `Use deductive reasoning. What conclusion follows from these statements?\n\n${bullets(s.premises)}`,
          parts: [{ answer: mc(rng, s.correct, s.ds) }],
          hints: ['Deductive reasoning applies a general statement to a particular case.', 'The second statement puts a particular case into the group described by the first statement.'],
          solution: [`The first statement is true for everything in the group, and the second statement says the particular case belongs to the group.`, `So the conclusion must be: ${s.correct}`, 'The other choices either reverse the first statement or claim things the statements do not say.'],
          answerDisplay: s.correct,
        };
      }
      if (kind === 'which') {
        const k = REASONING_KINDS(who);
        const correct = rng.pick(k.deductive);
        return {
          prompt: 'Which of these is an example of **deductive** reasoning?',
          parts: [{ answer: mc(rng, correct, rng.sample(k.inductive, 3)) }],
          hints: ['Inductive reasoning goes from specific examples to a general conjecture.', 'Deductive reasoning starts from statements known to be true and applies them to reach a conclusion that must be true.'],
          solution: ['The other three choices draw a general conclusion from a few observations, which is inductive reasoning.', `"${correct}" uses a statement that is always true to reach a certain conclusion, so it is deductive reasoning.`],
          answerDisplay: correct,
        };
      }
      const e = rng.pick([
        { q: `If $${v}$ is an integer, which expression represents **any odd integer**?`, a: `$2${v} + 1$`, ds: [`$${v} + 1$`, `$2${v}$`, `$${v}^2$`], why: `Every odd integer is one more than an even integer $2${v}$, so it can be written as $2${v} + 1$. The expression $${v} + 1$ is odd only when $${v}$ is even.` },
        { q: `If $${v}$ is an integer, which expression represents **any even integer**?`, a: `$2${v}$`, ds: [`$${v} + 2$`, `$2${v} + 1$`, `$${v}^2$`], why: `Every even integer is 2 times an integer, so it can be written as $2${v}$. The expression $${v} + 2$ is even only when $${v}$ is even.` },
        { q: `If $${v}$ is an integer, which list represents **three consecutive integers**?`, a: `$${v},\\ ${v} + 1,\\ ${v} + 2$`, ds: [`$${v},\\ 2${v},\\ 3${v}$`, `$${v},\\ ${v} + 2,\\ ${v} + 4$`, `$${v} - 1,\\ ${v},\\ ${v} + 2$`], why: `Consecutive integers go up by 1 each time: $${v}$, $${v} + 1$, $${v} + 2$. The list $${v}, ${v} + 2, ${v} + 4$ goes up by 2.` },
        { q: `Simplify the sum of three consecutive integers $${v} + (${v} + 1) + (${v} + 2)$.`, a: `$3${v} + 3$`, ds: [`$3${v} + 2$`, `$3${v}$`, `$${v} + 3$`], why: `$${v} + ${v} + ${v} = 3${v}$ and $1 + 2 = 3$, so the sum is $3${v} + 3 = 3(${v} + 1)$.` },
        { q: `Two odd integers are written as $2${u} + 1$ and $2${v} + 1$. Which expression is their sum, fully simplified and factored?`, a: `$2(${u} + ${v} + 1)$`, ds: [`$2(${u} + ${v}) + 1$`, `$2${u} + 2${v} + 1$`, `$4(${u} + ${v})$`], why: `$(2${u} + 1) + (2${v} + 1) = 2${u} + 2${v} + 2 = 2(${u} + ${v} + 1)$.` },
      ]);
      return {
        prompt: e.q,
        parts: [{ answer: mc(rng, e.a, e.ds) }],
        hints: ['Algebra lets you reason about every integer at once.', 'Test each choice with a few values of the variable.'],
        solution: [e.why, `The answer is ${e.a}.`],
        answerDisplay: e.a,
      };
    }
    if (d === 2) {
      const pr = rng.pick(PROOFS);
      const steps = pr.steps(u, v);
      return {
        prompt: `${who} is proving that ${pr.claim}. Put the steps of the proof in order. ${ORDER_NOTE}`,
        parts: [{ answer: orderAnswer(rng, steps) }],
        hints: ['A proof starts by naming the numbers with variables ("Let ...").', 'Each step should use the result of the step before it. The conclusion comes last.'],
        solution: [...steps.map((s, i) => `Step ${i + 1}: ${s}`), `This proves that ${pr.claim}.`],
        answerDisplay: steps.map((s, i) => `${i + 1}. ${s}`).join(' '),
      };
    }
    // d3
    const t = trickData(rng);
    if (rng.chance(0.5)) {
      const k = rng.int(2, 3); // ask for the expression after step k (1-based: 2 = multiply, 3 = subtract)
      const correct = `$${t.exprs[k - 1]}$`;
      const ds =
        k === 2
          ? [`$${lin(t.m, t.a)}$`, `$${lin(1, t.m * t.a)}$`, `$${lin(t.m, t.m + t.a)}$`]
          : [`$${lin(t.m, t.a - t.m * t.b)}$`, `$${lin(t.m, t.m * t.a + t.m * t.b)}$`, `$${lin(1, t.a - t.b)}$`];
      return {
        prompt: `${who} shows the class a number trick:\n\n${numbered(['Choose any number.', ...t.ops])}\n\nLet $n$ be the number chosen. Which expression shows the result after step ${k + 1}? Then prove what the final result always is.`,
        parts: [{ label: `After step ${k + 1}`, answer: mc(rng, correct, ds) }, numPart(t.c, { label: 'Final result' })],
        hints: ['Write each step as an algebraic expression in $n$, simplifying as you go.', `When you multiply, multiply **every** term by $${t.m}$; when you divide, divide every term.`],
        solution: [
          `Start: $n$`,
          ...t.ops.map((op, i) => `${op.replace(/\.$/, '')}: $${t.exprs[i]}$`),
          `The $n$ terms cancel, so the result is always $${t.c}$, whatever number you choose.`,
        ],
        answerDisplay: `${correct}; the result is always $${t.c}$`,
      };
    }
    const steps = [
      'Let $n$ be the number chosen.',
      `Add $${t.a}$: $${t.exprs[0]}$`,
      `Multiply by $${t.m}$: $${t.m}(${t.exprs[0]}) = ${t.exprs[1]}$`,
      `Subtract $${t.m * t.b}$: $${t.exprs[1]} - ${t.m * t.b} = ${t.exprs[2]}$`,
      `Divide by $${t.m}$: $${t.exprs[3]}$`,
      `Subtract the starting number: $${t.exprs[3]} - n = ${t.c}$. The result is always $${t.c}$.`,
    ];
    return {
      prompt: `${who} shows the class a number trick:\n\n${numbered(['Choose any number.', ...t.ops])}\n\nPut the steps of a proof that the result is always $${t.c}$ in order. ${ORDER_NOTE}`,
      parts: [{ answer: orderAnswer(rng, steps) }],
      hints: ['Start by naming the chosen number with a variable.', 'Follow the trick one instruction at a time; each expression comes from the one before it.'],
      solution: [...steps.map((s, i) => `Step ${i + 1}: ${s}`), 'Because the proof works for any $n$, the trick always gives the same result.'],
    };
  },
});

// Errors in proofs ------------------------------------------------------------------

const ERR = {
  divZero: 'Dividing by an expression that equals zero (or could equal zero)',
  sqrt: 'Taking the square root of both sides without considering the negative root',
  examples: 'Concluding a statement is always true because it works for a few examples',
  sameVar: 'Using the same variable for two numbers that can be different',
  algebra: 'An algebra mistake when expanding, simplifying or dividing',
};
type ErrKey = keyof typeof ERR;

interface FlawedProof {
  intro: string;
  steps: string[];
  bad: number; // 0-based
  err: ErrKey;
  explain: string;
}

function flawTrick(rng: Rng, who: string): FlawedProof {
  for (;;) {
    const m = rng.int(2, 5);
    const a = rng.int(3, 12);
    const b = rng.int(1, a - 1);
    const divErr = rng.chance(0.5);
    const right = a - b;
    if (divErr) {
      // Divides only the n-term by m.
      const wrong = m * (a - b);
      const steps = [
        'Let the starting number be $n$.',
        `Add $${a}$: $${lin(1, a)}$`,
        `Multiply by $${m}$: $${lin(m, m * a)}$`,
        `Subtract $${m * b}$: $${lin(m, m * (a - b))}$`,
        `Divide by $${m}$: $${lin(1, wrong)}$`,
        `Subtract the starting number: $${wrong}$. So the result is always $${wrong}$.`,
      ];
      return {
        intro: `${who} wants to prove that this trick always gives the same result: choose a number, add $${a}$, multiply by $${m}$, subtract $${m * b}$, divide by $${m}$, then subtract the number you started with.`,
        steps,
        bad: 4,
        err: 'algebra',
        explain: `Dividing $${lin(m, m * (a - b))}$ by $${m}$ gives $${lin(1, a - b)}$: both terms must be divided. The result is always $${right}$, not $${wrong}$.`,
      };
    }
    // Multiplies only the n-term by m.
    if ((a - m * b) % m !== 0 || a - m * b === 0) continue;
    const w3 = a - m * b;
    const wrong = w3 / m;
    const steps = [
      'Let the starting number be $n$.',
      `Add $${a}$: $${lin(1, a)}$`,
      `Multiply by $${m}$: $${lin(m, a)}$`,
      `Subtract $${m * b}$: $${lin(m, w3)}$`,
      `Divide by $${m}$: $${lin(1, wrong)}$`,
      `Subtract the starting number: $${wrong}$. So the result is always $${wrong}$.`,
    ];
    return {
      intro: `${who} wants to prove that this trick always gives the same result: choose a number, add $${a}$, multiply by $${m}$, subtract $${m * b}$, divide by $${m}$, then subtract the number you started with.`,
      steps,
      bad: 2,
      err: 'algebra',
      explain: `$${m}(n + ${a}) = ${lin(m, m * a)}$: both terms must be multiplied by $${m}$. The result is always $${right}$, not $${wrong}$.`,
    };
  }
}

function flawSign(rng: Rng, who: string): FlawedProof {
  const k = rng.pick([2, 3, 4, 5]);
  const c = rng.int(1, 4);
  const p = rng.int(1, 3);
  const q = rng.int(1, 9);
  // (a n + b) - (c n + d) with a - c = k p... keep it simple: a = c + k*p, b = d + k*q.
  const d0 = rng.int(1, 9);
  const a = c + k * p;
  const b = d0 + k * q;
  const wrongConst = b + d0;
  const wrongRem = ((wrongConst % k) + k) % k;
  if (wrongRem === 0) return flawSign(rng, who);
  const right = `${k}(${lin(p, q)})`;
  return {
    intro: `${who} claims that $(${lin(a, b)}) - (${lin(c, d0)})$ is **never** a multiple of $${k}$ for any integer $n$, and gives this proof.`,
    steps: [
      `Remove the brackets: $${lin(a, b)} - ${lin(c, d0)}$`,
      `Collect like terms: $${lin(a - c, wrongConst)}$`,
      `Rewrite: $${lin(a - c, wrongConst - wrongRem)} + ${wrongRem} = ${k}(${lin(p, (wrongConst - wrongRem) / k)}) + ${wrongRem}$`,
      `The expression is always $${wrongRem}$ more than a multiple of $${k}$, so it is never a multiple of $${k}$.`,
    ],
    bad: 0,
    err: 'algebra',
    explain: `Subtracting the bracket changes the sign of **both** terms: $-(${lin(c, d0)}) = ${lin(-c, -d0)}$. The correct result is $${lin(a - c, b - d0)} = ${right}$, which is always a multiple of $${k}$.`,
  };
}

function flawDivZero(rng: Rng, who: string): FlawedProof {
  const [x, y] = rng.pick([['a', 'b'], ['x', 'y'], ['p', 'q'], ['m', 'n']]);
  if (rng.chance(0.5)) {
    return {
      intro: `${who} shares a "proof" that $2 = 1$. Let $${x}$ and $${y}$ be equal numbers that are not zero.`,
      steps: [
        `$${x} = ${y}$`,
        `Multiply both sides by $${x}$: $${x}^2 = ${x}${y}$`,
        `Subtract $${y}^2$ from both sides: $${x}^2 - ${y}^2 = ${x}${y} - ${y}^2$`,
        `Factor both sides: $(${x} + ${y})(${x} - ${y}) = ${y}(${x} - ${y})$`,
        `Divide both sides by $${x} - ${y}$: $${x} + ${y} = ${y}$`,
        `Substitute $${x} = ${y}$: $2${y} = ${y}$`,
        `Divide both sides by $${y}$: $2 = 1$`,
      ],
      bad: 4,
      err: 'divZero',
      explain: `Since $${x} = ${y}$, the expression $${x} - ${y}$ equals $0$, and dividing by zero is not allowed. (Dividing by $${y}$ in the last step is fine because $${y}$ is not zero.)`,
    };
  }
  const k = rng.int(3, 9);
  const j = rng.intExcept(2, 9, [k]);
  return {
    intro: `${who} shares a "proof" that $${k} = ${j}$.`,
    steps: [
      `Let $${x} = ${y}$.`,
      `Then $${x} - ${y} = 0$.`,
      `Multiply zero by $${k}$ and by $${j}$: $${k}(${x} - ${y}) = 0$ and $${j}(${x} - ${y}) = 0$.`,
      `So $${k}(${x} - ${y}) = ${j}(${x} - ${y})$.`,
      `Divide both sides by $${x} - ${y}$: $${k} = ${j}$.`,
    ],
    bad: 4,
    err: 'divZero',
    explain: `Step 2 shows that $${x} - ${y} = 0$, so step 5 divides both sides by zero, which is not allowed.`,
  };
}

function flawSqrt(rng: Rng, who: string): FlawedProof {
  const p = rng.int(2, 6);
  const q = rng.int(p + 2, 11);
  return {
    intro: `${who} shares a "proof" that $${p} = ${q}$.`,
    steps: [
      `$(${p} - ${q})^2 = (${p - q})^2 = ${(p - q) ** 2}$ and $(${q} - ${p})^2 = ${q - p}^2 = ${(q - p) ** 2}$.`,
      `So $(${p} - ${q})^2 = (${q} - ${p})^2$.`,
      `Take the square root of both sides: $${p} - ${q} = ${q} - ${p}$.`,
      `Add $${p + q}$ to both sides: $${2 * p} = ${2 * q}$.`,
      `Divide both sides by 2: $${p} = ${q}$.`,
    ],
    bad: 2,
    err: 'sqrt',
    explain: `$(${p - q})^2 = ${q - p}^2$ does not mean $${p - q} = ${q - p}$. A square has two square roots, so the correct conclusion is $${p} - ${q} = \\pm(${q} - ${p})$, and only the negative sign is true.`,
  };
}

function flawDivVar(rng: Rng, who: string): FlawedProof {
  const k = rng.int(2, 12);
  return {
    intro: `${who} claims that $x = ${k}$ is the **only** solution of $x^2 = ${k}x$, and gives this proof.`,
    steps: [`Start with $x^2 = ${k}x$.`, `Divide both sides by $x$: $x = ${k}$.`, `Check: $${k}^2 = ${k * k}$ and $${k}(${k}) = ${k * k}$.`, `So $x = ${k}$ is the only solution.`],
    bad: 1,
    err: 'divZero',
    explain: `Dividing by $x$ assumes $x \\ne 0$. But $x = 0$ is also a solution: $0^2 = ${k}(0)$. Factoring instead gives $x(x - ${k}) = 0$, so $x = 0$ or $x = ${k}$.`,
  };
}

function flawExamples(rng: Rng, who: string): FlawedProof {
  if (rng.chance(0.5)) {
    const ns = rng.sample([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3).sort((a, b) => a - b);
    const f = (n: number) => n * n + n + 41;
    return {
      intro: `${who} claims that $n^2 + n + 41$ is prime for every whole number $n$, and gives this proof.`,
      steps: [...ns.map((n) => `When $n = ${n}$: $${n}^2 + ${n} + 41 = ${f(n)}$, which is prime.`), `The expression gives a prime every time, so it is prime for every whole number $n$.`],
      bad: 3,
      err: 'examples',
      explain: 'Each example is correct, but examples cannot prove a statement about every whole number. In fact $n = 40$ gives $1681 = 41 \\times 41$, which is not prime.',
    };
  }
  const ps = rng.sample([2, 3, 5, 7], 3).sort((a, b) => a - b);
  return {
    intro: `${who} claims that $2^p - 1$ is prime whenever $p$ is prime, and gives this proof.`,
    steps: [...ps.map((p) => `When $p = ${p}$: $2^{${p}} - 1 = ${2 ** p - 1}$, which is prime.`), 'It works every time, so $2^p - 1$ is prime for every prime $p$.'],
    bad: 3,
    err: 'examples',
    explain: 'Each example is correct, but a few examples cannot prove the statement for every prime. In fact $p = 11$ gives $2^{11} - 1 = 2047 = 23 \\times 89$, which is not prime.',
  };
}

function flawSameVar(rng: Rng, who: string): FlawedProof {
  const [, v] = rng.pick(VARS);
  if (rng.chance(0.5)) {
    return {
      intro: `${who} claims that the sum of any two even integers is a multiple of 4, and gives this proof.`,
      steps: [`Let the two even integers be $2${v}$ and $2${v}$, where $${v}$ is an integer.`, `Their sum is $2${v} + 2${v} = 4${v}$.`, `$4${v}$ is 4 times an integer.`, 'So the sum of two even integers is always a multiple of 4.'],
      bad: 0,
      err: 'sameVar',
      explain: `Writing both numbers as $2${v}$ makes them equal. Two different even integers need different variables, such as $2${v}$ and $2${v === 'n' ? 'm' : 'n'}$. For example $2 + 4 = 6$ is not a multiple of 4.`,
    };
  }
  return {
    intro: `${who} claims that the sum of any two odd integers is never a multiple of 4, and gives this proof.`,
    steps: [`Let the two odd integers be $2${v} + 1$ and $2${v} + 1$, where $${v}$ is an integer.`, `Their sum is $(2${v} + 1) + (2${v} + 1) = 4${v} + 2$.`, `$4${v} + 2$ is always 2 more than a multiple of 4.`, 'So the sum of two odd integers is never a multiple of 4.'],
    bad: 0,
    err: 'sameVar',
    explain: `Writing both numbers as $2${v} + 1$ makes them equal. Two different odd integers need different variables. For example $1 + 3 = 4$ is a multiple of 4.`,
  };
}

const proofError = skill({
  id: 'm202-proof-error',
  name: 'Finding errors in proofs',
  description: 'Find the step with the error in an invalid proof, such as dividing by zero, taking a square root without the negative root, or relying on examples.',
  outcomes: ['NL1'],
  lessonId: 'm202-1-3',
  format: 'mc',
  gen(rng, d): GenOutput {
    const who = rng.pick(NAMES);
    const fp = (d === 1 ? rng.pick([flawTrick, flawTrick, flawSign]) : rng.pick([flawDivZero, flawSqrt, flawDivVar, flawExamples, flawSameVar, ...(d === 3 ? [flawTrick, flawSign] : [])]))(rng, who);
    const stepChoices = fp.steps.map((_, i) => `Step ${i + 1}`);
    const parts = [{ label: 'Error in', answer: fixedChoice(stepChoices, fp.bad) }];
    if (d === 3) {
      const ds = rng.shuffle((Object.keys(ERR) as ErrKey[]).filter((k) => k !== fp.err)).slice(0, 3).map((k) => ERR[k]);
      parts.push({ label: 'Type of error', answer: mc(rng, ERR[fp.err], ds) });
    }
    return {
      prompt: `${fp.intro}\n\n${fp.steps.map((s, i) => `**Step ${i + 1}:** ${s}`).join('\n\n')}\n\nThe conclusion is false, so the proof must contain an error. ${d === 3 ? 'In which step is the error, and what kind of error is it?' : 'In which step is the error?'}`,
      parts,
      hints: ['Check each step: does it follow correctly from the step before it?', 'Watch for dividing by something that could be zero, square roots, using examples as proof, and algebra slips.'],
      solution: [
        `Step ${fp.bad + 1} contains the error. ${fp.explain}`,
        ...(d === 3 ? [`Type of error: ${ERR[fp.err].charAt(0).toLowerCase()}${ERR[fp.err].slice(1)}.`] : []),
        fp.bad === 0 ? 'The later steps only carry the mistake forward.' : fp.bad === fp.steps.length - 1 ? 'The steps before it are correct.' : 'The steps before it are correct, and the later steps only carry the mistake forward.',
      ],
      answerDisplay: `Step ${fp.bad + 1}${d === 3 ? `; ${ERR[fp.err]}` : ''}`,
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 1.4 — Puzzles and games
// ---------------------------------------------------------------------------

interface Clue {
  text: string;
  test: (x: number) => boolean;
}

function numberClues(t: number, three: boolean): Clue[] {
  const ds = String(t).split('').map(Number);
  const sum = ds.reduce((s, x) => s + x, 0);
  const out: Clue[] = [];
  for (const k of [3, 4, 6, 7, 8, 9, 11, 12, 13, 15]) {
    if (t % k === 0) out.push({ text: `It is a multiple of ${k}.`, test: (x) => x % k === 0 });
  }
  for (const k of [3, 4, 5]) if (t % k !== 0) out.push({ text: `It is not a multiple of ${k}.`, test: (x) => x % k !== 0 });
  out.push(t % 2 ? { text: 'It is odd.', test: (x) => x % 2 === 1 } : { text: 'It is even.', test: (x) => x % 2 === 0 });
  out.push({ text: `The sum of its digits is ${sum}.`, test: (x) => String(x).split('').reduce((s, c) => s + Number(c), 0) === sum });
  const tens = Math.floor(t / 10) % 10;
  const ones = t % 10;
  if (tens > ones) out.push({ text: 'Its tens digit is greater than its ones digit.', test: (x) => Math.floor(x / 10) % 10 > x % 10 });
  if (tens < ones) out.push({ text: 'Its tens digit is less than its ones digit.', test: (x) => Math.floor(x / 10) % 10 < x % 10 });
  if (isSquare(t)) out.push({ text: 'It is a perfect square.', test: (x) => isSquare(x) });
  if (isPrime(t)) out.push({ text: 'It is a prime number.', test: (x) => isPrime(x) });
  if (three) {
    const h = Math.floor(t / 100);
    out.push({ text: h % 2 ? 'Its hundreds digit is odd.' : 'Its hundreds digit is even.', test: (x) => Math.floor(x / 100) % 2 === h % 2 });
  }
  return out;
}

function solveRiddle(rng: Rng, d: 1 | 2) {
  const three = d === 2;
  const lo = three ? 100 : 10;
  const hi = three ? 999 : 99;
  for (let tries = 0; tries < 500; tries++) {
    const t = rng.int(lo, hi);
    const pool = numberClues(t, three);
    // Start with restrictive clues so the candidate list is short enough to write out.
    const strong = pool.filter((c) => /multiple of (7|8|9|11|12|13|15)\.|perfect square/.test(c.text));
    if (!strong.length) continue;
    const h = Math.floor(t / 100);
    const clues = three ? [{ text: `Its hundreds digit is ${h}.`, test: (x: number) => Math.floor(x / 100) === h }, rng.pick(strong)] : [rng.pick(strong)];
    let cands = Array.from({ length: hi - lo + 1 }, (_, i) => i + lo).filter((x) => clues.every((c) => c.test(x)));
    const rest = rng.shuffle(pool.filter((c) => !clues.includes(c) && !/hundreds digit/.test(c.text)));
    for (const c of rest) {
      if (cands.length === 1) break;
      const next = cands.filter(c.test);
      if (next.length === cands.length) continue;
      clues.push(c);
      cands = next;
    }
    if (cands.length !== 1 || clues.length < (three ? 3 : 2) || clues.length > (three ? 4 : 3)) continue;
    // Recompute the narrowing for the solution.
    let cur = Array.from({ length: hi - lo + 1 }, (_, i) => i + lo);
    const steps: string[] = [];
    clues.forEach((c, i) => {
      cur = cur.filter(c.test);
      const list = cur.length <= 16 ? cur.join(', ') : `the ${cur.length} numbers from ${cur[0]} to ${cur[cur.length - 1]}`;
      steps.push(`Clue ${i + 1} ("${c.text}") leaves: ${list}.`);
    });
    return { t, clues, steps };
  }
  throw new Error('riddle');
}

interface GridCtx {
  group: string;
  phrase: string;
  items: string[];
  has: (p: string, i: string) => string;
  not: (p: string, i: string) => string;
  either: (p: string, i: string, j: string) => string;
  ask: (p: string) => string;
}

const GRID_CTX: GridCtx[] = [
  {
    group: 'friends',
    phrase: 'each play a different sport',
    items: ['hockey', 'curling', 'soccer', 'basketball'],
    has: (p, i) => `${p} plays ${i}`,
    not: (p, i) => `${p} does not play ${i}.`,
    either: (p, i, j) => `${p} plays either ${i} or ${j}.`,
    ask: (p) => `Which sport does ${p} play?`,
  },
  {
    group: 'students',
    phrase: 'each have a different summer job at a mountain resort',
    items: ['lifeguard', 'camp counsellor', 'cashier', 'trail guide'],
    has: (p, i) => `${p} works as a ${i}`,
    not: (p, i) => `${p} is not the ${i}.`,
    either: (p, i, j) => `${p} works as either a ${i} or a ${j}.`,
    ask: (p) => `What is ${p}'s summer job?`,
  },
  {
    group: 'band members',
    phrase: 'each play a different instrument',
    items: ['guitar', 'drums', 'piano', 'violin'],
    has: (p, i) => `${p} plays the ${i}`,
    not: (p, i) => `${p} does not play the ${i}.`,
    either: (p, i, j) => `${p} plays either the ${i} or the ${j}.`,
    ask: (p) => `Which instrument does ${p} play?`,
  },
  {
    group: 'cousins',
    phrase: 'each live in a different city',
    items: ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest'],
    has: (p, i) => `${p} lives in ${i}`,
    not: (p, i) => `${p} does not live in ${i}.`,
    either: (p, i, j) => `${p} lives in either ${i} or ${j}.`,
    ask: (p) => `Where does ${p} live?`,
  },
];

/** Logic grid: random assignment, negative and either/or clues until simple elimination solves it. */
function gridPuzzle(rng: Rng, n: 3 | 4) {
  const ctx = rng.pick(GRID_CTX);
  for (let tries = 0; tries < 400; tries++) {
    const people = rng.sample(NAMES.filter((x) => !x.includes('-')), n);
    const items = rng.sample(ctx.items, n);
    const answer = rng.shuffle(items); // answer[i] belongs to people[i]
    const clueObjs: Array<{ text: string; apply: (poss: Array<Set<string>>) => void }> = [];
    const maxClues = n === 3 ? 4 : 6;
    const solved = (poss: Array<Set<string>>) => {
      const p = poss.map((s) => new Set(s));
      for (let changed = true; changed; ) {
        changed = false;
        for (let i = 0; i < n; i++)
          if (p[i].size === 1) {
            const it = [...p[i]][0];
            for (let j = 0; j < n; j++) if (j !== i && p[j].delete(it)) changed = true;
          }
        for (const it of items) {
          const who = p.map((s, i) => (s.has(it) ? i : -1)).filter((i) => i >= 0);
          if (who.length === 1 && p[who[0]].size > 1) {
            p[who[0]] = new Set([it]);
            changed = true;
          }
        }
      }
      return p;
    };
    let poss = people.map(() => new Set(items));
    const used = people.map(() => 0);
    for (let c = 0; c < 30 && clueObjs.length < maxClues; c++) {
      // Spread the clues over different people.
      const fewest = Math.min(...used);
      const i = rng.chance(0.8) ? rng.pick(people.map((_, k) => k).filter((k) => used[k] === fewest)) : rng.int(0, n - 1);
      let clue: { text: string; apply: (poss: Array<Set<string>>) => void };
      if (rng.chance(0.6)) {
        const wrong = rng.pick(items.filter((x) => x !== answer[i]));
        clue = { text: ctx.not(people[i], wrong), apply: (ps) => void ps[i].delete(wrong) };
      } else {
        const other = rng.pick(items.filter((x) => x !== answer[i]));
        const pair = rng.shuffle([answer[i], other]);
        clue = { text: ctx.either(people[i], pair[0], pair[1]), apply: (ps) => { for (const x of [...ps[i]]) if (!pair.includes(x)) ps[i].delete(x); } };
      }
      const before = solved(poss).map((s) => s.size).join();
      const trial = poss.map((s) => new Set(s));
      clue.apply(trial);
      if (solved(trial).map((s) => s.size).join() === before) continue;
      clueObjs.push(clue);
      used[i]++;
      poss = trial;
      if (solved(poss).every((s) => s.size === 1)) break;
    }
    const fin = solved(poss);
    if (!fin.every((s) => s.size === 1)) continue;
    if (poss.filter((s) => s.size === 1).length > 1) continue; // the clues should not give away more than one answer directly
    const ask = rng.int(0, n - 1);
    const after = people.map((p, i) => `${p}: ${[...poss[i]].join(' or ')}`);
    return { ctx, people, items, answer, clues: clueObjs.map((c) => c.text), ask, after };
  }
  throw new Error('grid');
}

/** Finishing-order puzzle for 4 people. */
function orderPuzzle(rng: Rng) {
  const perms: number[][] = [];
  const permute = (arr: number[], k = 0) => {
    if (k === arr.length) return void perms.push(arr.slice());
    for (let i = k; i < arr.length; i++) {
      [arr[k], arr[i]] = [arr[i], arr[k]];
      permute(arr, k + 1);
      [arr[k], arr[i]] = [arr[i], arr[k]];
    }
  };
  permute([0, 1, 2, 3]);
  const event = rng.pick(['a cross-country race', 'a speed-skating race at an indoor oval', 'a canoe race on a river', 'a 5 km fun run in a mountain town']);
  for (let tries = 0; tries < 300; tries++) {
    const people = rng.sample(NAMES.filter((x) => !x.includes('-')), 4);
    const order = rng.shuffle([0, 1, 2, 3]); // order[pos] = person index
    const pos = (perm: number[], p: number) => perm.indexOf(p);
    const pool: Array<{ text: string; ok: (perm: number[]) => boolean }> = [];
    for (let a = 0; a < 4; a++)
      for (let b = 0; b < 4; b++) {
        if (a === b) continue;
        if (pos(order, a) < pos(order, b)) pool.push({ text: `${people[a]} finished ahead of ${people[b]}.`, ok: (pm) => pos(pm, a) < pos(pm, b) });
        if (pos(order, a) === pos(order, b) + 1) pool.push({ text: `${people[a]} finished right behind ${people[b]}.`, ok: (pm) => pos(pm, a) === pos(pm, b) + 1 });
      }
    for (let a = 0; a < 4; a++) {
      if (pos(order, a) !== 0) pool.push({ text: `${people[a]} did not finish first.`, ok: (pm) => pos(pm, a) !== 0 });
      if (pos(order, a) !== 3) pool.push({ text: `${people[a]} did not finish last.`, ok: (pm) => pos(pm, a) !== 3 });
    }
    const clues: typeof pool = [];
    let left = perms.slice();
    for (const c of rng.shuffle(pool)) {
      const next = left.filter(c.ok);
      if (next.length === left.length) continue;
      clues.push(c);
      left = next;
      if (left.length === 1) break;
    }
    if (left.length !== 1 || clues.length < 3 || clues.length > 4) continue;
    const ask = rng.int(0, 3);
    return { event, people, order, clues: clues.map((c) => c.text), ask, place: pos(order, ask) + 1 };
  }
  throw new Error('order puzzle');
}

const logicPuzzle = skill({
  id: 'm202-logic-puzzle',
  name: 'Logic and number puzzles',
  description: 'Solve number riddles, logic grids and ordering puzzles with deductive reasoning.',
  outcomes: ['NL1'],
  lessonId: 'm202-1-4',
  gen(rng, d): GenOutput {
    const who = rng.pick(NAMES);
    if (d === 1 || (d === 2 && rng.chance(0.35))) {
      const r = solveRiddle(rng, d === 1 ? 1 : 2);
      const digits = d === 1 ? 'two-digit' : 'three-digit';
      return {
        prompt: `${who} is thinking of a ${digits} number.\n\n${bullets(r.clues.map((c) => c.text))}\n\nWhat is the number?`,
        parts: [numPart(r.t)],
        hints: ['Start with the clue that allows the fewest numbers, and list them.', 'Use each other clue to cross numbers off your list until one is left.'],
        solution: [...r.steps, `The number is $${r.t}$.`],
      };
    }
    if (d === 2 || rng.chance(0.4)) {
      const n = d === 2 ? 3 : 4;
      const g = gridPuzzle(rng, n as 3 | 4);
      const ans = g.answer[g.ask];
      const solutionLine = g.people.map((p, i) => g.ctx.has(p, g.answer[i])).join(', ');
      return {
        prompt: `${n === 3 ? 'Three' : 'Four'} ${g.ctx.group}, ${g.people.slice(0, -1).join(', ')} and ${g.people[n - 1]}, ${g.ctx.phrase}: ${g.items.slice(0, -1).join(', ')} and ${g.items[n - 1]}.\n\n${numbered(g.clues)}\n\n${g.ctx.ask(g.people[g.ask])}`,
        parts: [{ answer: fixedChoice(g.items, g.items.indexOf(ans)) }],
        hints: ['Make a chart with a row for each person and a column for each choice. Cross out what the clues rule out.', 'When a row or a column has only one box left, that must be the answer for it, and it is crossed out everywhere else.'],
        solution: [`After crossing out what the clues rule out: ${g.after.join('; ')}.`, 'Each choice belongs to exactly one person, so once someone is fixed, cross that choice off for everyone else, and repeat.', `This gives: ${solutionLine}.`, `So ${g.ctx.has(g.people[g.ask], ans)}.`],
        answerDisplay: ans,
      };
    }
    const o = orderPuzzle(rng);
    const placeWord = ['first', 'second', 'third', 'fourth'][o.place - 1];
    return {
      prompt: `Four friends, ${o.people.slice(0, 3).join(', ')} and ${o.people[3]}, entered ${o.event}. There were no ties.\n\n${numbered(o.clues)}\n\nIn what place did ${o.people[o.ask]} finish? (Enter 1 for first, 2 for second, and so on.)`,
      parts: [numPart(o.place, { label: 'Place' })],
      hints: ['Start with the strongest clue, such as one person finishing right behind another, and place that pair first.', 'Try each possible position for the pair and cross out any order that breaks another clue.'],
      solution: [
        'Test possible orders against every clue; only one order fits all of them:',
        o.order.map((p, i) => `${ORD[i]}: ${o.people[p]}`).join(', ') + '.',
        ...o.clues.map((c) => `Check: ${c} ✓`),
        `${o.people[o.ask]} finished ${placeWord}, so the answer is $${o.place}$.`,
      ],
    };
  },
});

// Spatial puzzles and games -------------------------------------------------------------

function gridFigure(rows: number, cols: number): PlaneFigure {
  const s = new Sketch();
  for (let i = 0; i <= cols; i++) s.seg([i, 0], [i, rows]);
  for (let j = 0; j <= rows; j++) s.seg([0, j], [cols, j]);
  return s.build({ margin: 0.5 });
}

function magicFigure(cells: string[][]): PlaneFigure {
  const s = new Sketch();
  for (let i = 0; i <= 3; i++) s.seg([i, 0], [i, 3]).seg([0, i], [3, i]);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) if (cells[r][c]) s.textAt([c + 0.5, 2.5 - r], cells[r][c]);
  return s.build({ margin: 0.4 });
}

const LO_SHU = [
  [2, 7, 6],
  [9, 5, 1],
  [4, 3, 8],
];

function magicSquare(rng: Rng): number[][] {
  let g = LO_SHU.map((r) => r.slice());
  const turns = rng.int(0, 3);
  for (let t = 0; t < turns; t++) g = g[0].map((_, c) => g.map((r) => r[c]).reverse());
  if (rng.chance(0.5)) g = g.map((r) => r.slice().reverse());
  const k = rng.pick([1, 1, 2, 3]);
  const add = rng.int(0, 12);
  return g.map((r) => r.map((v) => k * v + add));
}

const LINES: Array<{ name: string; cells: Array<[number, number]> }> = [
  ...[0, 1, 2].map((r) => ({ name: `row ${r + 1}`, cells: [0, 1, 2].map((c) => [r, c] as [number, number]) })),
  ...[0, 1, 2].map((c) => ({ name: `column ${c + 1}`, cells: [0, 1, 2].map((r) => [r, c] as [number, number]) })),
  { name: 'the diagonal from top left', cells: [[0, 0], [1, 1], [2, 2]] },
  { name: 'the diagonal from top right', cells: [[0, 2], [1, 1], [2, 0]] },
];

/** Hide cells; returns the solving steps (each line with exactly one unknown), or null if it cannot be solved that way. */
function solveMagic(g: number[][], hidden: Array<[number, number]>) {
  const known = g.map((r) => r.map(() => true));
  for (const [r, c] of hidden) known[r][c] = false;
  const steps: Array<{ cell: [number, number]; line: string; others: number[] }> = [];
  for (let changed = true; changed; ) {
    changed = false;
    for (const L of LINES) {
      const unk = L.cells.filter(([r, c]) => !known[r][c]);
      if (unk.length !== 1) continue;
      const [r, c] = unk[0];
      steps.push({ cell: [r, c], line: L.name, others: L.cells.filter(([rr, cc]) => rr !== r || cc !== c).map(([rr, cc]) => g[rr][cc]) });
      known[r][c] = true;
      changed = true;
    }
  }
  return known.every((r) => r.every(Boolean)) ? steps : null;
}

const spatialPuzzle = skill({
  id: 'm202-spatial-puzzle',
  name: 'Spatial puzzles and games',
  description: 'Analyze puzzles and games such as the Tower of Hanoi, take-away games, magic squares and counting squares, and find patterns and winning strategies.',
  outcomes: ['NL2'],
  lessonId: 'm202-1-4',
  gen(rng, d): GenOutput {
    const who = rng.pick(NAMES);
    const kind = rng.pick(['hanoi', 'squares', 'magic', 'nim'] as const);
    if (kind === 'hanoi') {
      const intro = 'In the Tower of Hanoi puzzle, a stack of discs must be moved from one peg to another, one disc at a time, never placing a larger disc on a smaller one. There are three pegs.';
      if (d === 1) {
        const shown = rng.int(3, 4);
        const ask = shown + 1;
        const moves = (n: number) => 2 ** n - 1;
        return {
          prompt: `${intro} ${who} records the fewest moves needed. Make a conjecture about the pattern and predict the fewest moves for ${ask} discs.`,
          figure: { type: 'table', headers: ['Number of discs', 'Fewest moves'], rows: Array.from({ length: shown }, (_, i) => [String(i + 1), String(moves(i + 1))]) },
          parts: [numPart(moves(ask), { suffix: 'moves' })],
          hints: ['Compare each number of moves with the one before it.', 'Each time, the number of moves doubles and then 1 is added.'],
          solution: [
            `From one row to the next: ${Array.from({ length: shown - 1 }, (_, i) => `$${moves(i + 1)} \\times 2 + 1 = ${moves(i + 2)}$`).join(', ')}.`,
            'Conjecture: each extra disc doubles the moves and adds 1. (This makes sense: move the smaller stack off, move the largest disc, then move the smaller stack back on top.)',
            `${ask} discs: $${moves(shown)} \\times 2 + 1 = ${moves(ask)}$`,
            `The fewest moves for ${ask} discs is $${moves(ask)}$.`,
          ],
        };
      }
      if (d === 2) {
        const n = rng.int(6, 10);
        return {
          prompt: `${intro} The fewest moves for 1, 2, 3 and 4 discs are 1, 3, 7 and 15. Make a conjecture for the fewest moves with $n$ discs, then use it to find the fewest moves for ${n} discs.`,
          parts: [numPart(2 ** n - 1, { suffix: 'moves' })],
          hints: ['Add 1 to each number of moves. What do you notice?', '$1 + 1 = 2$, $3 + 1 = 4$, $7 + 1 = 8$, $15 + 1 = 16$: powers of 2.'],
          solution: ['Each number of moves is one less than a power of 2: $2^1 - 1$, $2^2 - 1$, $2^3 - 1$, $2^4 - 1$.', 'Conjecture: the fewest moves for $n$ discs is $2^n - 1$.', `$2^{${n}} - 1 = ${2 ** n} - 1 = ${2 ** n - 1}$`, `The fewest moves for ${n} discs is $${2 ** n - 1}$.`],
        };
      }
      if (rng.chance(0.5)) {
        const n = rng.int(10, 14);
        const sec = rng.pick([2, 3, 5]);
        const minutes = ((2 ** n - 1) * sec) / 60;
        return {
          prompt: `${intro} The fewest moves for $n$ discs is $2^n - 1$. A robot arm makes one move every ${sec} seconds. How many minutes will it take the robot to move a stack of ${n} discs using the fewest moves? Round to the nearest tenth of a minute.`,
          parts: [numPart(minutes, { decimals: 1, suffix: 'min' })],
          hints: [`First find the fewest moves for ${n} discs.`, `Multiply the moves by ${sec} seconds, then divide by 60 to change seconds to minutes.`],
          solution: [`Moves: $2^{${n}} - 1 = ${2 ** n - 1}$`, `Time: $${2 ** n - 1} \\times ${sec} = ${(2 ** n - 1) * sec}$ s`, `Minutes: $${(2 ** n - 1) * sec} \\div 60 \\approx ${minutes.toFixed(1)}$`, `It takes about $${minutes.toFixed(1)}$ minutes.`],
          calculator: true,
        };
      }
      const M = rng.pick([100, 500, 1000, 2000, 5000, 10000, 50000]);
      let n = 1;
      while (2 ** (n + 1) - 1 <= M) n++;
      return {
        prompt: `${intro} The fewest moves for $n$ discs is $2^n - 1$. A game allows at most ${M} moves. What is the greatest number of discs that can be moved within that limit?`,
        parts: [numPart(n, { suffix: 'discs' })],
        hints: ['Find the moves for several numbers of discs, such as 8, 9, 10 and so on.', `Find the largest $n$ with $2^n - 1 \\le ${M}$.`],
        solution: [`$2^{${n}} - 1 = ${2 ** n - 1}$, which is within ${M} moves.`, `$2^{${n + 1}} - 1 = ${2 ** (n + 1) - 1}$, which is more than ${M} moves.`, `The greatest number of discs is $${n}$.`],
        calculator: true,
      };
    }
    if (kind === 'squares') {
      const art = (r: number) => (r === 8 || r === 11 || r === 18 ? 'an' : 'a');
      const ctx = (r: number, c: number) => rng.pick([`A tile floor is laid out as ${art(r)} $${r} \\times ${c}$ grid of square tiles.`, `A window has ${art(r)} $${r} \\times ${c}$ grid of square panes.`, `A quilt is sewn as ${art(r)} $${r} \\times ${c}$ grid of square patches.`]);
      if (d < 3) {
        const n = d === 1 ? rng.int(3, 4) : rng.int(5, 8);
        const terms = Array.from({ length: n }, (_, i) => (n - i) ** 2);
        const total = terms.reduce((s, v) => s + v, 0);
        return {
          prompt: `${ctx(n, n)} How many squares of **all sizes** are in the grid?`,
          figure: n <= 6 ? gridFigure(n, n) : undefined,
          parts: [numPart(total, { suffix: 'squares' })],
          hints: ['Count one size at a time: $1 \\times 1$, then $2 \\times 2$, and so on.', `A $k \\times k$ square fits in $(${n} - k + 1)$ positions across and the same number down.`],
          solution: [...terms.map((t, i) => `${i + 1} × ${i + 1} squares: $${n - i} \\times ${n - i} = ${t}$`), `Total: $${terms.join(' + ')} = ${total}$`, `There are $${total}$ squares.`],
        };
      }
      const r = rng.int(2, 4);
      const c = r + rng.int(1, 3);
      const tri = (k: number) => (k * (k + 1)) / 2;
      const rects = tri(r) * tri(c);
      return {
        prompt: `${ctx(r, c)} How many **rectangles** of all sizes are in the grid? (Squares count as rectangles.)`,
        figure: gridFigure(r, c),
        parts: [numPart(rects, { suffix: 'rectangles' })],
        hints: ['A rectangle is fixed by choosing 2 of the vertical grid lines and 2 of the horizontal grid lines.', 'With $L$ lines there are $\\dfrac{L(L - 1)}{2}$ ways to choose two of them.'],
        solution: [`Vertical lines: $${c + 1}$, so $\\dfrac{${c + 1} \\times ${c}}{2} = ${tri(c)}$ pairs.`, `Horizontal lines: $${r + 1}$, so $\\dfrac{${r + 1} \\times ${r}}{2} = ${tri(r)}$ pairs.`, `Each pair of vertical lines with each pair of horizontal lines makes one rectangle: $${tri(c)} \\times ${tri(r)} = ${rects}$`, `There are $${rects}$ rectangles.`],
      };
    }
    if (kind === 'magic') {
      const g = magicSquare(rng);
      const S = g[0][0] + g[0][1] + g[0][2];
      for (let tries = 0; tries < 200; tries++) {
        const count = d === 1 ? 1 : d === 2 ? rng.int(2, 3) : rng.int(4, 5);
        const all: Array<[number, number]> = [];
        for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) all.push([r, c]);
        const hidden = rng.sample(all, count);
        const steps = solveMagic(g, hidden);
        if (!steps) continue;
        // Ask for the last cell found (at d3 it needs a chain of steps).
        const target = steps[steps.length - 1].cell;
        if (d === 3 && steps.length < 3) continue;
        // Letters for the other missing cells, in reading order.
        const others = hidden.filter(([r, c]) => r !== target[0] || c !== target[1]).sort((p1, p2) => p1[0] * 3 + p1[1] - (p2[0] * 3 + p2[1]));
        const label = (r: number, c: number) => {
          if (r === target[0] && c === target[1]) return '?';
          const i = others.findIndex(([rr, cc]) => rr === r && cc === c);
          return i < 0 ? String(g[r][c]) : 'abcde'[i];
        };
        const cells = g.map((row, r) => row.map((_, c) => label(r, c)));
        const fullLine = LINES.find((L) => L.cells.every(([r, c]) => !hidden.some(([rr, cc]) => rr === r && cc === c)));
        if (d > 1 && !fullLine) continue;
        const sumStep = d === 1 ? `The magic sum is $${S}$.` : `${fullLine!.name.charAt(0).toUpperCase()}${fullLine!.name.slice(1)} is complete: $${fullLine!.cells.map(([r, c]) => g[r][c]).join(' + ')} = ${S}$, so the magic sum is $${S}$.`;
        return {
          prompt: `In a magic square, every row, every column and both diagonals have the same sum (the **magic sum**).${d === 1 ? ` This magic square has a magic sum of $${S}$.` : ''} Find the number that belongs in the square marked **?**.${count > 1 ? ' (Letters mark other missing numbers.)' : ''}`,
          figure: magicFigure(cells),
          parts: [numPart(g[target[0]][target[1]], { label: '? =' })],
          hints: [d === 1 ? 'Find a row, column or diagonal that contains the ? and two known numbers.' : 'First find the magic sum from a row, column or diagonal that is complete.', 'Look for a line with only one missing number, find it, then repeat.'],
          solution: [
            sumStep,
            ...steps.map((st) => `In ${st.line}: $${label(...st.cell)} = ${S} - ${st.others.join(' - ')} = ${g[st.cell[0]][st.cell[1]]}$`),
            `The ? square is $${g[target[0]][target[1]]}$.`,
          ],
        };
      }
      throw new Error('magic');
    }
    // Take-away game (Nim).
    const k = d === 1 ? 2 : rng.int(3, 4);
    const misere = d === 3 && rng.chance(0.6);
    for (;;) {
      const N = d === 1 ? rng.int(7, 14) : rng.int(15, 40);
      const take = misere ? (N - 1) % (k + 1) : N % (k + 1);
      if (take === 0) continue;
      const rule = misere ? 'The player who takes the last counter **loses**.' : 'The player who takes the last counter **wins**.';
      const leave = misere ? `one more than a multiple of $${k + 1}$` : `a multiple of $${k + 1}$`;
      return {
        prompt: `${who} and a friend play a game with ${N} counters. Players take turns removing 1${k === 2 ? ' or 2' : ` to ${k}`} counters. ${rule} ${who} goes first. How many counters should ${who} take on the first turn to be sure of winning?`,
        parts: [numPart(take, { suffix: 'counters' })],
        hints: [
          misere ? 'Work backwards: you want your friend to face exactly 1 counter at the end.' : `Work backwards: if your friend faces exactly $${k + 1}$ counters, whatever they take, you can take the rest.`,
          `Whatever your friend takes, you can take enough to make the total for the round $${k + 1}$. So always leave your friend ${leave}.`,
        ],
        solution: [
          misere
            ? `To win, leave your friend 1 counter at the end. Working back, the positions to leave are $1, ${k + 2}, ${2 * k + 3}, \\ldots$ (each $${k + 1}$ more).`
            : `To win, leave your friend $${k + 1}$ counters near the end, because any move they make lets you take the rest. Working back, the positions to leave are multiples of $${k + 1}$.`,
          misere ? `$${N} - 1 = ${N - 1}$, and $${N - 1} \\div ${k + 1}$ has remainder $${take}$.` : `$${N} \\div ${k + 1}$ has remainder $${take}$.`,
          `Take $${take}$ to leave $${N - take}$, which is ${leave}. After each move your friend makes, take enough to make that round total $${k + 1}$.`,
          `${who} should take $${take}$ counter${take === 1 ? '' : 's'}.`,
        ],
      };
    }
  },
});

export const REASONING_SKILLS: SkillDef[] = [conjecture, patternConjecture, counterexample, deductiveProof, proofError, logicPuzzle, spatialPuzzle];
