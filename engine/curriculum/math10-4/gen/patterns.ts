/** Math 10-4 Unit 5 — Patterns, Formulas and Equations (PR1, PR2). */
import { fixedChoice, mc, numPart, part, retry, skill } from '../../helpers.ts';
import { fmt, fmtFixed, fmtGroupTex, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Ananya', 'Nathan', 'Lena', 'Diego', 'Harpreet', 'Noor', 'Thanh', 'Jasmine',
];
const CITIES = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Clearwater', 'Ashford', 'Pinewood'];
const JOBS = ['grocery store', 'coffee shop', 'car wash', 'pizza place', 'garden centre', 'hotel', 'hardware store', 'fast-food restaurant'];

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure };

const tx = (u: string) => `\\text{${u}}`;
/** Remove floating-point noise from an exact decimal result. */
const clean = (x: number) => roundTo(x, 9);
const isWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
/** A number inside maths (commas grouped for 5+ digits). */
const num = (x: number) => fmtGroupTex(clean(x));
/** A quantity with a unit, as inline maths: $12\ \text{cm}$. */
const q = (x: number, u: string) => `$${num(x)}\\ ${tx(u)}$`;
/** Money in prose, always with cents: \$12.50. Never inside $...$. */
const money = (x: number) => `\\$${fmtFixed(x, 2)}`;
/** A price: whole dollars print without cents (\$60), otherwise \$59.99. */
const tag = (x: number) => (isWhole(x) ? `\\$${Math.round(x)}` : money(x));
/** Money inside maths, without a dollar sign: 60 or 16.50. */
const mv = (x: number) => (isWhole(x) ? String(Math.round(x)) : fmtFixed(x, 2));
const CENT = 'to the nearest cent';
const hasCents = (xs: number[]) => xs.some((x) => !isWhole(x));
/** True when v sits too close to a rounding boundary (x.xx5) at `dp` places. */
function onEdge(v: number, dp: number): boolean {
  const s = Math.abs(v) * 10 ** dp;
  return Math.abs(s - Math.floor(s) - 0.5) < 0.06;
}

function placesOf(x: number): number {
  for (let d = 0; d <= 6; d++) if (Math.abs(roundTo(x, d) - x) < 1e-9) return d;
  return 6;
}

/** An exact numeric answer. Decimal answers keep their decimal form for review. */
function exact(value: number, opts: { suffix?: string; label?: string } = {}): Part {
  const v = clean(value);
  const d = placesOf(v);
  if (d === 0) return numPart(v, opts);
  return numPart(v, { ...opts, decimals: d, tolerance: 0.5 * 10 ** -d });
}

// Money is graded to within a cent.
const moneyPart = (v: number, label = '\\$'): Part => numPart(clean(v), { decimals: 2, tolerance: 0.011, label });

/** A money answer: whole-dollar questions are exact; questions with cents ask for the nearest cent. */
function cash(v: number, cents: boolean, label = '\\$'): { part: Part; ask: string } {
  return cents ? { part: moneyPart(v, label), ask: `, ${CENT}` } : { part: exact(v, { label }), ask: '' };
}

/** "Check" step wording. */
const works = 'It works.';

// ---------------------------------------------------------------------------
// 5.1 Patterns and tables — extending a pattern
// ---------------------------------------------------------------------------

interface Seq {
  kind: 'add' | 'double';
  /** Value at position 1. */
  first: number;
  /** Amount added each time (negative to subtract), or 2 for doubling. */
  step: number;
  intro: string;
  head: [string, string];
  /** What one step of the first column is, singular: "week", "table". */
  idx: string;
  /** A label for position k, e.g. "Week 5" or "5 tables". */
  lab: (k: number) => string;
  money?: boolean;
  /** A value in prose (not used for money). */
  say?: (v: number) => string;
  askValue: (k: number) => string;
  askIndex: (v: number) => string;
  indexPart: (k: number) => Part;
  valueSuffix?: string;
  sayIndex: (k: number, v: string) => string;
  /** Largest position allowed when asking "which position reaches ...". */
  maxIndex?: number;
}

type SeqMaker = (rng: Rng, d: Difficulty, name: string) => Seq;

const seqTerm = (s: Seq, k: number) => clean(s.kind === 'add' ? s.first + s.step * (k - 1) : s.first * 2 ** (k - 1));

const ADD_SEQS: SeqMaker[] = [
  // Savings each week
  (rng, d, name) => {
    const step = d === 1 ? rng.pick([5, 10, 20]) : rng.pick([15, 25, 35, 40, 45, 55]);
    const first = d === 1 ? rng.pick([10, 20, 30, 40, 50]) : rng.int(4, 30) * 5;
    const job = rng.pick(JOBS);
    const goal = rng.pick(['a used bike', 'a new phone', 'winter boots', 'driving lessons', 'a concert ticket', 'a laptop for school']);
    return {
      kind: 'add', first, step, money: true,
      intro: `${name} has a part-time job at a ${job} and saves the same amount every week. The table shows ${name}’s total savings at the end of each week.`,
      head: ['Week', 'Total saved (\\$)'],
      idx: 'week',
      lab: (k) => `Week ${k}`,
      askValue: (k) => `If the pattern continues, how much will ${name} have saved by the end of week ${k}?`,
      askIndex: (v) => `${name} wants to buy ${goal} for ${tag(v)}. If the pattern continues, in which week will the savings reach ${tag(v)}?`,
      indexPart: (k) => numPart(k, { label: 'Week' }),
      sayIndex: (k, v) => `${name} will have ${v} saved by the end of week ${k}.`,
      maxIndex: 16,
    };
  },
  // Chairs around tables joined in a row
  (rng, _d, name) => {
    const t = rng.pick([
      { shape: 'square', first: 4, step: 2 },
      { shape: 'rectangular', first: 6, step: 4 },
      { shape: 'trapezoid-shaped', first: 5, step: 3 },
    ]);
    const event = rng.pick(['a community supper', 'a banquet', 'a family reunion', 'a hockey team dinner', 'a wedding', 'a seniors’ lunch']);
    return {
      kind: 'add', first: t.first, step: t.step,
      intro: `${name} works at a community hall in ${rng.pick(CITIES)}. For ${event}, ${name} pushes ${t.shape} tables together in one long row. The table shows how many people can sit at the row.`,
      head: ['Tables', 'People'],
      idx: 'table',
      lab: (k) => `${k} table${k === 1 ? '' : 's'}`,
      say: (v) => `$${num(v)}$ people`,
      askValue: (k) => `How many people can sit at a row of $${k}$ tables?`,
      askIndex: (v) => `How many tables are needed in the row to seat $${num(v)}$ people?`,
      indexPart: (k) => numPart(k, { suffix: 'tables' }),
      valueSuffix: 'people',
      sayIndex: (k, v) => `${name} needs $${k}$ tables to seat ${v}.`,
      maxIndex: 15,
    };
  },
  // Taxi fare by distance
  (rng, d, name) => {
    const base = d === 1 ? rng.pick([3, 4, 5]) : rng.pick([3.25, 3.5, 3.75, 4.1, 4.25, 4.4]);
    const rate = d === 1 ? rng.pick([2, 3]) : rng.pick([1.75, 1.85, 1.95, 2.05, 2.15, 2.25]);
    return {
      kind: 'add', first: clean(base + rate), step: rate, money: true,
      intro: `A taxi in ${rng.pick(CITIES)} charges a starting fee plus the same amount for each kilometre. The table shows the fare for trips of different lengths.`,
      head: ['Distance (km)', 'Fare (\\$)'],
      idx: 'kilometre',
      lab: (k) => `$${k}\\ ${tx('km')}$`,
      askValue: (k) => `If the pattern continues, what is the fare for a ${q(k, 'km')} trip?`,
      askIndex: (v) => `${name} paid a fare of ${money(v)}. How long was the trip?`,
      indexPart: (k) => numPart(k, { suffix: 'km' }),
      sayIndex: (k) => `The trip was ${q(k, 'km')} long.`,
      maxIndex: 20,
    };
  },
  // Plant height in a greenhouse
  (rng, d, name) => {
    const step = d === 1 ? rng.pick([2, 3, 4, 5]) : rng.pick([1.5, 2.5, 3.5, 4.5]);
    const first = d === 1 ? rng.int(3, 10) : rng.int(4, 12);
    const plant = rng.pick(['tomato plant', 'sunflower', 'pepper plant', 'bean plant', 'cucumber plant']);
    return {
      kind: 'add', first, step,
      intro: `${name} works at a greenhouse near ${rng.pick(CITIES)}. Every Friday, ${name} measures the height of a ${plant}. The table shows the heights.`,
      head: ['Week', 'Height (cm)'],
      idx: 'week',
      lab: (k) => `Week ${k}`,
      say: (v) => q(v, 'cm'),
      askValue: (k) => `If the pattern continues, how tall will the ${plant} be in week ${k}?`,
      askIndex: (v) => `If the pattern continues, in which week will the ${plant} be ${q(v, 'cm')} tall?`,
      indexPart: (k) => numPart(k, { label: 'Week' }),
      valueSuffix: 'cm',
      sayIndex: (k, v) => `The ${plant} will be ${v} tall in week ${k}.`,
      maxIndex: 14,
    };
  },
  // A stack of chairs
  (rng, d, name) => {
    const first = d === 1 ? rng.pick([80, 85, 90]) : rng.pick([78, 82, 86, 88]);
    const step = d === 1 ? 5 : rng.pick([4, 6, 7]);
    return {
      kind: 'add', first, step,
      intro: `${name} stacks plastic chairs after an event at a community centre. The table shows how tall the stack is.`,
      head: ['Chairs', 'Height (cm)'],
      idx: 'chair',
      lab: (k) => `${k} chair${k === 1 ? '' : 's'}`,
      say: (v) => q(v, 'cm'),
      askValue: (k) => `How tall is a stack of $${k}$ chairs?`,
      askIndex: (v) => `How many chairs are in a stack that is ${q(v, 'cm')} tall?`,
      indexPart: (k) => numPart(k, { suffix: 'chairs' }),
      valueSuffix: 'cm',
      sayIndex: (k, v) => `A stack that is ${v} tall has $${k}$ chairs.`,
      maxIndex: 15,
    };
  },
  // Gym or pool membership: total paid
  (rng, d, name) => {
    const fee = d === 1 ? rng.pick([20, 30, 40, 50]) : rng.pick([25, 35, 45, 49, 60]);
    const monthly = d === 1 ? rng.pick([10, 15, 20, 25]) : rng.pick([18, 22, 27, 32, 38]);
    const place = rng.pick(['gym', 'swimming pool', 'climbing gym', 'fitness centre']);
    return {
      kind: 'add', first: fee + monthly, step: monthly, money: true,
      intro: `${name} joins a ${place}. ${name} pays a one-time sign-up fee, plus the same amount every month. The table shows the total ${name} has paid so far.`,
      head: ['Month', 'Total paid (\\$)'],
      idx: 'month',
      lab: (k) => `Month ${k}`,
      askValue: (k) => `If the pattern continues, how much will ${name} have paid in total after ${k} months?`,
      askIndex: (v) => `If the pattern continues, after how many months will ${name} have paid ${tag(v)} in total?`,
      indexPart: (k) => numPart(k, { suffix: 'months' }),
      sayIndex: (k, v) => `After ${k} months, ${name} will have paid ${v} in total.`,
      maxIndex: 15,
    };
  },
  // Rows of chairs in a gym
  (rng, d, name) => {
    const first = rng.pick([10, 12, 14, 16, 18, 20]);
    const step = d === 1 ? rng.pick([2, 3, 4]) : rng.pick([2, 3, 4, 5]);
    return {
      kind: 'add', first, step,
      intro: `${name} helps set up chairs for a concert in a school gym in ${rng.pick(CITIES)}. Each row has more chairs than the row in front of it. The table shows the first rows.`,
      head: ['Row', 'Chairs'],
      idx: 'row',
      lab: (k) => `Row ${k}`,
      say: (v) => `$${num(v)}$ chairs`,
      askValue: (k) => `If the pattern continues, how many chairs will be in row ${k}?`,
      askIndex: (v) => `If the pattern continues, which row will have $${num(v)}$ chairs?`,
      indexPart: (k) => numPart(k, { label: 'Row' }),
      valueSuffix: 'chairs',
      sayIndex: (k, v) => `Row ${k} will have ${v}.`,
      maxIndex: 14,
    };
  },
  // Stock going down in a warehouse
  (rng, d, name) => {
    const step = d === 1 ? rng.pick([5, 10]) : rng.pick([6, 7, 8, 9, 12]);
    const first = d === 1 ? rng.pick([60, 80, 100]) : step * rng.int(15, 20) + rng.int(1, step - 1);
    return {
      kind: 'add', first, step: -step,
      intro: `${name} works in a warehouse in ${rng.pick(CITIES)}. The same number of cases of bottled water is shipped out every day. The table shows how many cases are left at the end of each day.`,
      head: ['Day', 'Cases left'],
      idx: 'day',
      lab: (k) => `Day ${k}`,
      say: (v) => `$${num(v)}$ cases`,
      askValue: (k) => `If the pattern continues, how many cases will be left at the end of day ${k}?`,
      askIndex: (v) => `If the pattern continues, at the end of which day will $${num(v)}$ cases be left?`,
      indexPart: (k) => numPart(k, { label: 'Day' }),
      valueSuffix: 'cases',
      sayIndex: (k, v) => `There will be ${v} left at the end of day ${k}.`,
      maxIndex: 14,
    };
  },
];

const DOUBLE_SEQS: SeqMaker[] = [
  // Video views
  (rng, d, name) => {
    const first = d === 1 ? rng.pick([5, 10, 25, 50]) : rng.pick([15, 30, 40, 60, 75]);
    return {
      kind: 'double', first, step: 2,
      intro: `${name} posts a short video for the bakery where ${name} works. The table shows the total number of views at the end of each day.`,
      head: ['Day', 'Views'],
      idx: 'day',
      lab: (k) => `Day ${k}`,
      say: (v) => `$${num(v)}$ views`,
      askValue: (k) => `If the pattern continues, how many views will the video have at the end of day ${k}?`,
      askIndex: (v) => `If the pattern continues, on which day will the video reach $${num(v)}$ views?`,
      indexPart: (k) => numPart(k, { label: 'Day' }),
      valueSuffix: 'views',
      sayIndex: (k, v) => `The video will reach ${v} on day ${k}.`,
    };
  },
  // Phone tree
  (rng, d) => {
    const first = d === 1 ? rng.pick([2, 3, 4, 5]) : rng.pick([3, 5, 6, 7]);
    return {
      kind: 'double', first, step: 2,
      intro: `A hockey league in ${rng.pick(CITIES)} uses a phone tree to tell families when a game is cancelled. The table shows how many families are called in each round.`,
      head: ['Round', 'Families called'],
      idx: 'round',
      lab: (k) => `Round ${k}`,
      say: (v) => `$${num(v)}$ families`,
      askValue: (k) => `If the pattern continues, how many families will be called in round ${k}?`,
      askIndex: (v) => `If the pattern continues, in which round will $${num(v)}$ families be called?`,
      indexPart: (k) => numPart(k, { label: 'Round' }),
      valueSuffix: 'families',
      sayIndex: (k, v) => `In round ${k}, ${v} will be called.`,
    };
  },
];

function seqFigure(s: Seq, vals: number[], cents: boolean): Figure {
  return {
    type: 'table',
    horizontal: true,
    headers: s.head,
    rows: vals.map((v, i) => [String(i + 1), cents ? fmtFixed(v, 2) : fmt(v)]),
  };
}

function patternExtend(rng: Rng, d: Difficulty): Out {
  const name = rng.pick(NAMES);
  const s = rng.chance(0.18) ? rng.pick(DOUBLE_SEQS)(rng, d, name) : rng.pick(ADD_SEQS)(rng, d, name);
  const vals = [1, 2, 3, 4].map((k) => seqTerm(s, k));
  const cents = !!s.money && hasCents([s.first, s.step]);
  const f = (v: number) => (s.money ? (cents ? fmtFixed(v, 2) : mv(v)) : num(v));
  const sayV = (v: number) => (s.money ? (cents ? money(v) : tag(v)) : s.say!(v));
  const figure = seqFigure(s, vals, cents);
  const a = Math.abs(s.step);
  const dbl = s.kind === 'double';
  const op = dbl ? '\\times' : s.step > 0 ? '+' : '-';

  const change = dbl
    ? `Look at how the numbers change: $${f(vals[0])} \\times 2 = ${f(vals[1])}$ and $${f(vals[1])} \\times 2 = ${f(vals[2])}$. The jumps get bigger, so this is not an add pattern. Each number is **double** the one before.`
    : s.step > 0
      ? `Find the change from one ${s.idx} to the next: $${f(vals[1])} - ${f(vals[0])} = ${f(a)}$ and $${f(vals[2])} - ${f(vals[1])} = ${f(a)}$. The pattern adds $${f(a)}$ each time.`
      : `Find the change from one ${s.idx} to the next: $${f(vals[0])} - ${f(vals[1])} = ${f(a)}$ and $${f(vals[1])} - ${f(vals[2])} = ${f(a)}$. The pattern subtracts $${f(a)}$ each time.`;
  const by = dbl ? '2' : f(a);
  const extend = (from: number, to: number) => {
    const out: string[] = [];
    for (let k = from; k <= to; k++) out.push(`${s.lab(k)}: $${f(seqTerm(s, k - 1))} ${op} ${by} = ${f(seqTerm(s, k))}$`);
    return out;
  };
  const nudge = dbl ? 'Look at how the numbers change. Is the jump the same every time?' : `Find how much the numbers change from one ${s.idx} to the next.`;

  if (d < 3) {
    const k = d === 1 ? 5 : dbl ? 6 : rng.int(6, 8);
    const v = seqTerm(s, k);
    const ans = s.money ? cash(v, cents) : { part: exact(v, { suffix: s.valueSuffix }), ask: '' };
    const method = dbl
      ? `Each number is double the one before. Keep multiplying by $2$ until you reach ${s.lab(k)}.`
      : `The pattern ${s.step > 0 ? 'adds' : 'subtracts'} the same amount each time. Keep ${s.step > 0 ? 'adding' : 'subtracting'} it until you reach ${s.lab(k)}.`;
    return {
      prompt: `${s.intro}\n\n${s.askValue(k)}${ans.ask ? ` Give the answer ${CENT}.` : ''}`,
      figure,
      parts: [ans.part],
      hints: [nudge, method],
      solution: [change, ...extend(5, k), `${s.lab(k)}: ${sayV(v)}.`],
    };
  }

  // Difficulty 3: which position reaches a goal?
  if (dbl) {
    const k = rng.int(6, 8);
    const T = seqTerm(s, k);
    return {
      prompt: `${s.intro}\n\n${s.askIndex(T)}`,
      figure,
      parts: [s.indexPart(k)],
      hints: [nudge, `Each number is double the one before. Keep doubling from the last number in the table until you reach $${f(T)}$.`],
      solution: [change, ...extend(5, k), s.sayIndex(k, sayV(T))],
    };
  }
  const k = rng.int(9, s.maxIndex ?? 14);
  const T = seqTerm(s, k);
  const t4 = vals[3];
  const D = clean(Math.abs(T - t4));
  const m = k - 4;
  const plural = `${s.idx}s`;
  return {
    prompt: `${s.intro}\n\n${s.askIndex(T)}`,
    figure,
    parts: [s.indexPart(k)],
    hints: [
      nudge,
      `Find how far $${f(T)}$ is from the last number in the table. Then divide by the change for each ${s.idx}.`,
    ],
    solution: [
      change,
      s.step > 0
        ? `The table stops at ${s.lab(4)} with $${f(t4)}$. You need to reach $${f(T)}$, which is $${f(T)} - ${f(t4)} = ${f(D)}$ more.`
        : `The table stops at ${s.lab(4)} with $${f(t4)}$. You need to get down to $${f(T)}$, which is $${f(t4)} - ${f(T)} = ${f(D)}$ less.`,
      `Each ${s.idx} ${s.step > 0 ? 'adds' : 'takes away'} $${f(a)}$, so you need $${f(D)} \\div ${f(a)} = ${m}$ more ${m === 1 ? s.idx : plural}.`,
      `$4 + ${m} = ${k}$`,
      `Check: $${f(t4)} ${op} ${m} \\times ${f(a)} = ${f(t4)} ${op} ${f(m * a)} = ${f(T)}$. ${works}`,
      s.sayIndex(k, sayV(T)),
    ],
  };
}

// ---------------------------------------------------------------------------
// 5.1 Patterns and tables — writing a rule
// ---------------------------------------------------------------------------

/** A linear rule an + b as text (works as LaTeX and as a typed answer): 3n + 2, n - 1, 5n. */
function ruleText(a: number, b: number, v: string, f: (x: number) => string = num): string {
  const lead = a === 1 ? v : `${f(a)}${v}`;
  if (b === 0) return lead;
  return b > 0 ? `${lead} + ${f(b)}` : `${lead} - ${f(-b)}`;
}

function ruleWords(rng: Rng): Out {
  const type = rng.weighted([['add', 5], ['sub', 2], ['double', 2]] as const);
  let vals: number[];
  let correct: string;
  let wrong: string[];
  let why: string;
  if (type === 'add') {
    const step = rng.int(2, 9);
    const first = rng.intExcept(2, 20, [step]);
    vals = [0, 1, 2, 3].map((i) => first + step * i);
    correct = `Start at ${first} and add ${step} each time.`;
    wrong = rng.shuffle([
      `Start at ${first} and add ${first} each time.`,
      `Start at ${step} and add ${first} each time.`,
      `Start at ${first} and multiply by ${step} each time.`,
      `Start at ${first} and add ${step + 1} each time.`,
    ]);
    why = `The change is the same every time: $${vals[1]} - ${vals[0]} = ${step}$, $${vals[2]} - ${vals[1]} = ${step}$ and $${vals[3]} - ${vals[2]} = ${step}$.`;
  } else if (type === 'sub') {
    const step = rng.int(3, 9);
    const first = rng.int(8, 19) * 5;
    vals = [0, 1, 2, 3].map((i) => first - step * i);
    correct = `Start at ${first} and subtract ${step} each time.`;
    wrong = rng.shuffle([
      `Start at ${first} and add ${step} each time.`,
      `Start at ${vals[1]} and subtract ${step} each time.`,
      `Start at ${first} and subtract ${2 * step} each time.`,
    ]);
    why = `The numbers go down by the same amount every time: $${vals[0]} - ${vals[1]} = ${step}$, $${vals[1]} - ${vals[2]} = ${step}$ and $${vals[2]} - ${vals[3]} = ${step}$.`;
  } else {
    const first = rng.int(2, 9);
    vals = [0, 1, 2, 3].map((i) => first * 2 ** i);
    correct = `Start at ${first} and multiply by 2 (double) each time.`;
    wrong = rng.shuffle([
      `Start at ${first} and add ${first} each time.`,
      `Start at ${first} and add 2 each time.`,
      `Start at ${2 * first} and multiply by 2 each time.`,
      ...(first !== 2 ? [`Start at ${first} and multiply by ${first} each time.`] : []),
    ]);
    why = `The jumps are not the same ($${vals[1] - vals[0]}$, then $${vals[2] - vals[1]}$, then $${vals[3] - vals[2]}$), so it is not an add pattern. Each number is double the one before: $${vals[0]} \\times 2 = ${vals[1]}$, $${vals[1]} \\times 2 = ${vals[2]}$, $${vals[2]} \\times 2 = ${vals[3]}$.`;
  }
  const list = vals.join(',\\ ');
  return {
    prompt: `Look at this pattern:\n\n$$${list},\\ \\ldots$$\n\nWhich rule describes the pattern?`,
    parts: [{ answer: mc(rng, correct, wrong) }],
    hints: [
      'Find the change from each number to the next. Is it the same every time?',
      'If the change is the same every time, the rule adds (or subtracts) that amount. If each number is double the one before, the rule multiplies by $2$.',
    ],
    solution: [`The pattern starts at $${vals[0]}$.`, why, `The rule is: ${correct}`],
  };
}

/** Steps that find the rule y = an + b from a table that starts at n = 1. */
function ruleSteps(a: number, b: number, iv: string, ov: string, vals: number[], f: (x: number) => string = num): string[] {
  const steps = [
    `Each time $${iv}$ goes up by $1$, $${ov}$ goes up by $${f(a)}$ ($${f(vals[1])} - ${f(vals[0])} = ${f(a)}$). So the rule starts with $${a === 1 ? iv : `${f(a)}${iv}`}$${a === 1 ? ` (that is, $1 \\times ${iv}$)` : ''}.`,
  ];
  if (b === 0) steps.push(`When $${iv} = 1$: $${f(a)} \\times 1 = ${f(a)}$, which is already $${f(vals[0])}$. Nothing needs to be added.`);
  else if (b > 0) steps.push(`When $${iv} = 1$: $${f(a)} \\times 1 = ${f(a)}$, but the table shows $${f(vals[0])}$. Add $${f(vals[0])} - ${f(a)} = ${f(b)}$.`);
  else steps.push(`When $${iv} = 1$: $${f(a)} \\times 1 = ${f(a)}$, but the table shows $${f(vals[0])}$. Subtract $${f(a)} - ${f(vals[0])} = ${f(-b)}$.`);
  steps.push(`Put the two parts together: $${ov} = ${ruleText(a, b, iv, f)}$`);
  const sign = b >= 0 ? '+' : '-';
  steps.push(
    `Check with $${iv} = 3$: $${f(a)} \\times 3${b === 0 ? '' : ` ${sign} ${f(Math.abs(b))}`} = ${f(vals[2])}$. It matches the table.`,
  );
  return steps;
}

interface RuleCtx {
  intro: string;
  head: [string, string];
  iv: string;
  ov: string;
  a: number;
  b: number;
  n: number;
  ask: string;
  money: boolean;
  part: (v: number) => Part;
  say: (v: number) => string;
}

const RULE_CTX: Array<(rng: Rng, name: string) => RuleCtx> = [
  (rng, name) => {
    const t = rng.pick([
      { shape: 'square', a: 2 },
      { shape: 'rectangular', a: 4 },
      { shape: 'trapezoid-shaped', a: 3 },
    ]);
    const n = rng.int(12, 25);
    return {
      intro: `${name} sets up ${t.shape} tables in one long row for a banquet. Let $t$ be the number of tables and $p$ be the number of people who can sit at the row.`,
      head: ['Tables, $t$', 'People, $p$'],
      iv: 't', ov: 'p', a: t.a, b: 2, n,
      ask: `how many people can sit at a row of $${n}$ tables`,
      money: false,
      part: (v) => numPart(v, { label: `People at ${n} tables:`, suffix: 'people' }),
      say: (v) => `A row of $${n}$ tables seats $${v}$ people.`,
    };
  },
  (rng, name) => {
    const a = rng.pick([2, 3]);
    const b = rng.pick([3, 4, 5, 6]);
    const n = rng.int(12, 30);
    return {
      intro: `A taxi in ${rng.pick(CITIES)} charges a starting fee plus the same amount for each kilometre. Let $k$ be the distance in kilometres and $C$ be the fare in dollars. ${name} made this table.`,
      head: ['Distance, $k$ (km)', 'Fare, $C$ (\\$)'],
      iv: 'k', ov: 'C', a, b, n,
      ask: `the fare for a ${q(n, 'km')} trip`,
      money: true,
      part: (v) => exact(v, { label: `Fare for ${n} km: \\$` }),
      say: (v) => `A ${q(n, 'km')} trip costs ${tag(v)}.`,
    };
  },
  (rng, name) => {
    const a = rng.pick([15, 20, 25, 30]);
    const b = rng.pick([20, 30, 40, 50]);
    const n = rng.pick([6, 9, 12]);
    return {
      intro: `${name} joins a ${rng.pick(['gym', 'swimming pool', 'climbing gym'])}. There is a one-time sign-up fee plus a monthly fee. Let $m$ be the number of months and $T$ be the total paid in dollars.`,
      head: ['Months, $m$', 'Total paid, $T$ (\\$)'],
      iv: 'm', ov: 'T', a, b, n,
      ask: `the total ${name} will have paid after $${n}$ months`,
      money: true,
      part: (v) => exact(v, { label: `Total after ${n} months: \\$` }),
      say: (v) => `After $${n}$ months, ${name} will have paid ${tag(v)}.`,
    };
  },
  (rng, name) => {
    const a = rng.pick([5, 8, 10]);
    const b = rng.pick([20, 25, 30, 35]);
    const n = rng.int(6, 12);
    return {
      intro: `${name}’s phone plan has a monthly fee plus a charge for each gigabyte (GB) of data. Let $g$ be the data used in GB and $C$ be the monthly bill in dollars.`,
      head: ['Data, $g$ (GB)', 'Bill, $C$ (\\$)'],
      iv: 'g', ov: 'C', a, b, n,
      ask: `the bill for a month when ${name} uses $${n}$ GB`,
      money: true,
      part: (v) => exact(v, { label: `Bill for ${n} GB: \\$` }),
      say: (v) => `The bill for $${n}$ GB is ${tag(v)}.`,
    };
  },
  (rng, name) => {
    const n = rng.int(20, 60);
    return {
      intro: `${name} is building a fence on a farm near ${rng.pick(CITIES)}. The fence is made of sections in a straight line, with a post at each end of every section. Sections next to each other share a post. Let $s$ be the number of sections and $p$ be the number of posts.`,
      head: ['Sections, $s$', 'Posts, $p$'],
      iv: 's', ov: 'p', a: 1, b: 1, n,
      ask: `how many posts are needed for $${n}$ sections`,
      money: false,
      part: (v) => numPart(v, { label: `Posts for ${n} sections:`, suffix: 'posts' }),
      say: (v) => `$${n}$ sections need $${v}$ posts.`,
    };
  },
  (rng, name) => {
    const a = rng.pick([25, 30, 35, 40]);
    const b = rng.pick([20, 40, 50, 60]);
    const n = rng.int(5, 9);
    return {
      intro: `A landscaping company charges a visit fee plus the same amount for each hour of work. Let $h$ be the number of hours and $C$ be the cost in dollars. ${name} made this table from the price list.`,
      head: ['Hours, $h$', 'Cost, $C$ (\\$)'],
      iv: 'h', ov: 'C', a, b, n,
      ask: `the cost of a $${n}$-hour job`,
      money: true,
      part: (v) => exact(v, { label: `Cost for ${n} hours: \\$` }),
      say: (v) => `A $${n}$-hour job costs ${tag(v)}.`,
    };
  },
];

function patternRule(rng: Rng, d: Difficulty): Out {
  if (d === 1) return ruleWords(rng);
  if (d === 2) {
    const a = rng.int(2, 9);
    const b = rng.chance(0.15) ? 0 : rng.intExcept(Math.max(-5, 1 - a), 12, [0]);
    const vals = [1, 2, 3, 4, 5].map((n) => a * n + b);
    const expected = ruleText(a, b, 'n');
    return {
      prompt: `The table shows a pattern. Write a rule for $y$ using $n$.`,
      figure: { type: 'table', horizontal: true, headers: ['$n$', '$y$'], rows: vals.map((v, i) => [String(i + 1), String(v)]) },
      parts: [part({ kind: 'expression', expected }, { label: '$y =$' })],
      hints: [
        'How much does $y$ go up each time $n$ goes up by $1$? That number multiplies $n$.',
        'Then look at $n = 1$. What do you add or subtract to get the first value of $y$?',
      ],
      solution: [...ruleSteps(a, b, 'n', 'y', vals), `The rule is $y = ${expected}$.`],
    };
  }
  const name = rng.pick(NAMES);
  const c = rng.pick(RULE_CTX)(rng, name);
  const vals = [1, 2, 3, 4].map((n) => c.a * n + c.b);
  const expected = ruleText(c.a, c.b, c.iv);
  const v = c.a * c.n + c.b;
  return {
    prompt: `${c.intro}\n\n(a) Write a rule for $${c.ov}$ using $${c.iv}$.\n\n(b) Use your rule to find ${c.ask}.`,
    figure: { type: 'table', horizontal: true, headers: c.head, rows: vals.map((y, i) => [String(i + 1), String(y)]) },
    parts: [part({ kind: 'expression', expected }, { label: `Rule: $${c.ov} =$` }), c.part(v)],
    hints: [
      `How much does $${c.ov}$ go up each time $${c.iv}$ goes up by $1$? That number multiplies $${c.iv}$.`,
      `After you have the rule, replace $${c.iv}$ with $${c.n}$ and calculate.`,
    ],
    solution: [
      ...ruleSteps(c.a, c.b, c.iv, c.ov, vals),
      c.a === 1
        ? `Substitute $${c.iv} = ${c.n}$: $${c.ov} = ${c.n} + ${c.b} = ${v}$`
        : `Substitute $${c.iv} = ${c.n}$: $${c.ov} = ${c.a} \\times ${c.n} + ${c.b} = ${c.a * c.n} + ${c.b} = ${v}$`,
      c.say(v),
    ],
  };
}

// ---------------------------------------------------------------------------
// 5.2 Expressions and formulas — writing an expression
// ---------------------------------------------------------------------------

interface Sit {
  text: string;
  v: string;
  /** Typed form for grading. */
  plain: string;
  /** LaTeX form. */
  tex: string;
  wrong: string[];
  why: string;
}

const SITS: Array<(rng: Rng, d: Difficulty, name: string) => Sit> = [
  (rng, d) => {
    const p = d === 1 ? rng.int(8, 15) : rng.pick([11.5, 12.75, 13.25, 14.5, 15.75]);
    const P = mv(p);
    return {
      text: `Movie tickets in ${rng.pick(CITIES)} cost ${tag(p)} each. Write an expression for the cost, in dollars, of $n$ tickets.`,
      v: 'n', plain: `${P}n`, tex: `${P}n`,
      wrong: [`n + ${P}`, `\\dfrac{n}{${P}}`, `${P} - n`],
      why: `Each ticket costs ${tag(p)}, so $n$ tickets cost $${P} \\times n$. A number written right beside a letter means multiply, so write $${P}n$.`,
    };
  },
  (rng, d, name) => {
    const r = d === 1 ? rng.int(15, 20) : rng.pick([15.5, 16.25, 16.75, 17.5, 18.25]);
    const R = mv(r);
    return {
      text: `${name} earns ${tag(r)} per hour at a ${rng.pick(JOBS)}. Write an expression for ${name}’s pay, in dollars, for $h$ hours of work.`,
      v: 'h', plain: `${R}h`, tex: `${R}h`,
      wrong: [`h + ${R}`, `\\dfrac{${R}}{h}`, `${R} - h`],
      why: `Each hour pays ${tag(r)}, so $h$ hours pay $${R} \\times h$, written $${R}h$.`,
    };
  },
  (rng, d, name) => {
    const per = d === 1 ? rng.pick([6, 12, 24]) : rng.pick([18, 36, 48]);
    const item = rng.pick(['cans of soup', 'bottles of water', 'jars of salsa', 'boxes of crackers']);
    return {
      text: `${name} stocks shelves at a grocery store. Each case holds $${per}$ ${item}. Write an expression for the number of ${item} in $c$ cases.`,
      v: 'c', plain: `${per}c`, tex: `${per}c`,
      wrong: [`c + ${per}`, `\\dfrac{${per}}{c}`, `${per} - c`],
      why: `Each case holds $${per}$, so $c$ cases hold $${per} \\times c$, written $${per}c$.`,
    };
  },
  (rng, d, name) => {
    const diff = d === 1 ? rng.int(2, 9) : rng.int(11, 25);
    const other = rng.pick(NAMES.filter((x) => x !== name));
    return {
      text: `${name} is $${diff}$ years older than ${other}. ${other} is $a$ years old. Write an expression for ${name}’s age.`,
      v: 'a', plain: `a + ${diff}`, tex: `a + ${diff}`,
      wrong: [`${diff}a`, `a - ${diff}`, `${diff} - a`],
      why: `“Older than” means more years, so add: ${name}’s age is ${other}’s age plus $${diff}$, which is $a + ${diff}$.`,
    };
  },
  (rng, d) => {
    const fee = d === 1 ? rng.pick([3, 4, 5, 6]) : rng.pick([3.99, 4.49, 5.99, 6.5]);
    const F = mv(fee);
    return {
      text: `A food order costs $f$ dollars. The delivery fee is ${tag(fee)}. Write an expression for the total cost, in dollars.`,
      v: 'f', plain: `f + ${F}`, tex: `f + ${F}`,
      wrong: [`${F}f`, `f - ${F}`, `\\dfrac{f}{${F}}`],
      why: `The fee is added to the order once, so the total is $f + ${F}$.`,
    };
  },
  (rng, d, name) => {
    const start = d === 1 ? rng.pick([20, 40, 50, 80, 100]) : rng.pick([135, 160, 240, 275]);
    return {
      text: `${name} has ${tag(start)}. ${name} spends $s$ dollars on groceries. Write an expression for the money ${name} has left, in dollars.`,
      v: 's', plain: `${start} - s`, tex: `${start} - s`,
      wrong: [`s - ${start}`, `${start} + s`, `${start}s`],
      why: `Spending takes money away, so subtract the amount spent from ${tag(start)}: $${start} - s$. The order matters: $s - ${start}$ is not the same.`,
    };
  },
  (rng, d) => {
    const drop = d === 1 ? rng.int(3, 9) : rng.int(11, 18);
    return {
      text: `The temperature in ${rng.pick(CITIES)} is $t$ degrees Celsius at noon. By midnight it drops $${drop}$ degrees. Write an expression for the temperature at midnight.`,
      v: 't', plain: `t - ${drop}`, tex: `t - ${drop}`,
      wrong: [`${drop} - t`, `t + ${drop}`, `${drop}t`],
      why: `“Drops” means the temperature goes down, so subtract: $t - ${drop}$.`,
    };
  },
  (rng, d) => {
    const total = d === 1 ? rng.pick([40, 60, 80, 90]) : rng.pick([126, 148.5, 172, 215]);
    const T = mv(total);
    return {
      text: `A restaurant bill of ${tag(total)} is shared equally by $p$ friends. Write an expression for each friend’s share, in dollars.`,
      v: 'p', plain: `${T}/p`, tex: `\\dfrac{${T}}{p}`,
      wrong: [`${T}p`, `\\dfrac{p}{${T}}`, `${T} - p`],
      why: `Sharing equally means dividing the bill by the number of friends: $${T} \\div p$, written $\\dfrac{${T}}{p}$.`,
    };
  },
  (rng, d) => {
    const s = d === 1 ? rng.pick([60, 80, 90, 100]) : rng.pick([85, 95, 105, 110]);
    const [c1, c2] = rng.sample(CITIES, 2);
    return {
      text: `A bus travels at $${s}\\ ${tx('km/h')}$ on the highway from ${c1} to ${c2}. Write an expression for the distance, in kilometres, the bus travels in $t$ hours.`,
      v: 't', plain: `${s}t`, tex: `${s}t`,
      wrong: [`t + ${s}`, `\\dfrac{${s}}{t}`, `\\dfrac{t}{${s}}`],
      why: `The bus goes $${s}\\ ${tx('km')}$ every hour, so in $t$ hours it goes $${s} \\times t$, written $${s}t$.`,
    };
  },
];

interface Sit2 {
  text: string;
  what: string;
  v: string;
  a: number;
  b: number;
  at: number;
  ask: string;
  per: string;
  once: string;
  /** One unit of the variable, e.g. "hour". */
  each: string;
  say: (v: string) => string;
}

const SITS2: Array<(rng: Rng, name: string) => Sit2> = [
  (rng, name) => {
    const a = rng.pick([15.5, 16, 16.5, 17, 17.25, 18]);
    const b = rng.pick([20, 25, 30, 40]);
    const at = rng.int(4, 9);
    return {
      text: `${name} works at a ${rng.pick(JOBS)} on a holiday. ${name} earns ${tag(a)} per hour, plus a ${tag(b)} holiday bonus for the shift.`,
      what: `${name}’s pay, in dollars, for working $h$ hours on the holiday`,
      v: 'h', a, b, at,
      ask: `${name}’s pay for $${at}$ hours`,
      per: `Each hour pays ${tag(a)}`, once: `The bonus is paid once`, each: 'hour',
      say: (v) => `${name} earns ${v} for $${at}$ hours.`,
    };
  },
  (rng, name) => {
    const a = rng.pick([8, 10, 12, 15]);
    const b = rng.pick([20, 25, 30, 35]);
    const at = rng.int(2, 8);
    return {
      text: `${name}’s phone plan costs ${tag(b)} per month, plus ${tag(a)} for each gigabyte (GB) of data used.`,
      what: `the bill, in dollars, for a month when $g$ GB of data are used`,
      v: 'g', a, b, at,
      ask: `the bill for a month when ${name} uses $${at}$ GB`,
      per: `Each GB costs ${tag(a)}`, once: `The monthly fee is paid once`, each: 'GB',
      say: (v) => `The bill for $${at}$ GB is ${v}.`,
    };
  },
  (rng, name) => {
    const a = rng.pick([1.75, 2, 2.25, 2.5]);
    const b = rng.pick([3.5, 4, 4.25]);
    const at = rng.int(5, 20);
    return {
      text: `A taxi in ${rng.pick(CITIES)} charges ${tag(b)} to start, plus ${tag(a)} for each kilometre.`,
      what: `the fare, in dollars, for a trip of $k$ kilometres`,
      v: 'k', a, b, at,
      ask: `the fare for ${name}’s ${q(at, 'km')} trip`,
      per: `Each kilometre costs ${tag(a)}`, once: `The starting fee is paid once`, each: 'kilometre',
      say: (v) => `${name}’s fare is ${v}.`,
    };
  },
  (rng, name) => {
    const a = rng.pick([25, 30, 35, 40]);
    const b = rng.pick([30, 40, 45, 50]);
    const at = rng.int(2, 6);
    return {
      text: `A landscaping company charges a ${tag(b)} visit fee, plus ${tag(a)} for each hour of work. ${name} hires the company to clean up a yard.`,
      what: `the cost, in dollars, of a job that takes $h$ hours`,
      v: 'h', a, b, at,
      ask: `the cost of a job that takes $${at}$ hours`,
      per: `Each hour costs ${tag(a)}`, once: `The visit fee is paid once`, each: 'hour',
      say: (v) => `A $${at}$-hour job costs ${v}.`,
    };
  },
  (rng, name) => {
    const a = rng.pick([12.5, 13, 14, 15.75]);
    const b = rng.pick([4, 5, 6]);
    const at = rng.int(3, 8);
    return {
      text: `${name} orders pizzas for a staff party. Each pizza costs ${tag(a)}, and there is a ${tag(b)} delivery fee for the order.`,
      what: `the total cost, in dollars, of $p$ pizzas`,
      v: 'p', a, b, at,
      ask: `the cost of $${at}$ pizzas`,
      per: `Each pizza costs ${tag(a)}`, once: `The delivery fee is paid once`, each: 'pizza',
      say: (v) => `$${at}$ pizzas cost ${v} in total.`,
    };
  },
  (rng) => {
    const a = rng.pick([8, 10, 12, 15]);
    const b = rng.pick([250, 300, 350, 400]);
    const at = rng.int(18, 30);
    return {
      text: `A class from ${rng.pick(CITIES)} goes on a trip to a museum in Westbury. The bus costs ${tag(b)} for the day, and entry costs ${tag(a)} per student.`,
      what: `the total cost, in dollars, for $s$ students`,
      v: 's', a, b, at,
      ask: `the total cost for $${at}$ students`,
      per: `Each student costs ${tag(a)}`, once: `The bus is paid for once`, each: 'student',
      say: (v) => `The trip costs ${v} for $${at}$ students.`,
    };
  },
];

function writeExpression(rng: Rng, d: Difficulty): Out {
  const name = rng.pick(NAMES);
  if (d < 3) {
    const s = rng.pick(SITS)(rng, d, name);
    const hints = [
      'Ask yourself: does the amount get added, taken away, multiplied or shared (divided)?',
      `Use the letter $${s.v}$ for the unknown number. A number right beside a letter means multiply: $5${s.v}$ means $5 \\times ${s.v}$.`,
    ];
    if (d === 1) {
      return {
        prompt: `${s.text}`,
        parts: [{ answer: mc(rng, `$${s.tex}$`, s.wrong.map((w) => `$${w}$`)) }],
        hints,
        solution: [s.why, `The expression is $${s.tex}$.`],
      };
    }
    return {
      prompt: `${s.text}\n\nUse the letter $${s.v}$.`,
      parts: [part({ kind: 'expression', expected: s.plain }, { label: 'Expression:' })],
      hints,
      solution: [s.why, `The expression is $${s.tex}$.`],
    };
  }
  const s = rng.pick(SITS2)(rng, name);
  const cents = hasCents([s.a, s.b]);
  const A = mv(s.a);
  const B = mv(s.b);
  const expr = `${A}${s.v} + ${B}`;
  const total = clean(s.a * s.at + s.b);
  const ans = cash(total, cents);
  const sayT = cents ? money(total) : tag(total);
  return {
    prompt: `${s.text}\n\n(a) Write an expression for ${s.what}.\n\n(b) Use your expression to find ${s.ask}${ans.ask}.`,
    parts: [part({ kind: 'expression', expected: expr }, { label: 'Expression:' }), ans.part],
    hints: [
      `One amount is charged for every ${s.each}, so it multiplies $${s.v}$. The other amount is added only once.`,
      `Write it as (amount each)$\\times ${s.v}$ + (one-time amount). Then replace $${s.v}$ with $${s.at}$.`,
    ],
    solution: [
      `${s.per}, so that part is $${A} \\times ${s.v} = ${A}${s.v}$.`,
      `${s.once}, so add $${B}$.`,
      `Expression: $${expr}$`,
      `Substitute $${s.v} = ${s.at}$: $${A} \\times ${s.at} + ${B} = ${mv(s.a * s.at)} + ${B} = ${mv(total)}$`,
      s.say(sayT),
    ],
  };
}

// ---------------------------------------------------------------------------
// 5.2 Expressions and formulas — using a formula
// ---------------------------------------------------------------------------

type FormulaGen = (rng: Rng, d: Difficulty, name: string) => Out;

const FORMULAS: FormulaGen[] = [
  // Perimeter of a rectangle (d3: cost of fencing)
  (rng, d, name) => {
    const thing = rng.pick(['garden', 'dog run', 'vegetable plot', 'sandbox at a daycare', 'patio', 'horse paddock']);
    let l: number;
    let w: number;
    if (d === 1) {
      l = rng.int(5, 15);
      w = rng.int(2, l - 1);
    } else {
      l = rng.int(16, 60) / 2;
      w = retry(() => rng.int(6, 40) / 4, (x) => x < l - 1 && !isWhole(x));
    }
    const P = clean(2 * l + 2 * w);
    const steps = [
      `Write the formula: $P = 2l + 2w$`,
      `Substitute $l = ${num(l)}$ and $w = ${num(w)}$: $P = 2(${num(l)}) + 2(${num(w)})$`,
      `Multiply first: $P = ${num(2 * l)} + ${num(2 * w)}$`,
      `Add: $P = ${num(P)}$`,
    ];
    const hint1 = 'In the formula, $l$ is the length and $w$ is the width. Replace each letter with its number.';
    const hint2 = '$2l$ means $2 \\times l$. Multiply first, then add.';
    if (d < 3) {
      return {
        prompt: `A rectangular ${thing} is ${q(l, 'm')} long and ${q(w, 'm')} wide. Use the formula $P = 2l + 2w$ to find its perimeter.`,
        parts: [exact(P, { suffix: 'm' })],
        hints: [hint1, hint2],
        solution: [...steps, `The perimeter is ${q(P, 'm')}.`],
      };
    }
    const price = retry(() => rng.pick([8.99, 12.5, 14.75, 19.99, 24.5, 11.25, 16.49]), (x) => !onEdge(P * x, 2));
    const cost = P * price;
    return {
      prompt: `${name} is putting a fence around a rectangular ${thing} that is ${q(l, 'm')} long and ${q(w, 'm')} wide. Fencing costs ${money(price)} per metre.\n\nUse $P = 2l + 2w$ to find the perimeter. Then find the cost of the fencing, ${CENT}.`,
      parts: [exact(P, { label: 'Perimeter:', suffix: 'm' }), moneyPart(cost, 'Cost: \\$')],
      hints: [hint1, `Find the perimeter first. Then multiply the perimeter by the price for one metre.`],
      solution: [
        ...steps,
        `The perimeter is ${q(P, 'm')}, so ${name} needs ${q(P, 'm')} of fencing.`,
        `Cost: $${num(P)} \\times ${mv(price)} ${isWhole(cost * 100) ? '=' : '\\approx'} ${fmtFixed(cost, 2)}$`,
        `The fencing costs ${isWhole(cost * 100) ? '' : 'about '}${money(cost)}.`,
      ],
    };
  },
  // Pay = rate x hours (d3: a week of shifts)
  (rng, d, name) => {
    const job = rng.pick(JOBS);
    const def = '($P$ is the pay in dollars, $r$ is the hourly rate, and $h$ is the number of hours.)';
    const hints = ['$rh$ means $r \\times h$. Replace $r$ with the hourly rate and $h$ with the hours.', 'Multiply the hourly rate by the number of hours.'];
    if (d === 1) {
      const r = rng.int(15, 20);
      const h = rng.int(3, 8);
      return {
        prompt: `${name} earns ${tag(r)} per hour at a ${job}. Use the formula $P = rh$ to find ${name}’s pay for $${h}$ hours. ${def}`,
        parts: [exact(r * h, { label: '\\$' })],
        hints,
        solution: [`Write the formula: $P = rh$`, `Substitute $r = ${r}$ and $h = ${h}$: $P = ${r} \\times ${h}$`, `$P = ${r * h}$`, `${name}’s pay is ${tag(r * h)}.`],
      };
    }
    if (d === 2) {
      const { r, h } = retry(
        () => ({ r: rng.int(61, 87) / 4, h: rng.int(8, 16) / 2 }),
        (o) => isWhole(clean(o.r * o.h * 100)) && !isWhole(o.r),
      );
      const P = clean(r * h);
      return {
        prompt: `${name} earns ${money(r)} per hour at a ${job}. Use the formula $P = rh$ to find ${name}’s pay for $${num(h)}$ hours, ${CENT}. ${def}`,
        parts: [moneyPart(P)],
        hints,
        solution: [`Write the formula: $P = rh$`, `Substitute $r = ${mv(r)}$ and $h = ${num(h)}$: $P = ${mv(r)} \\times ${num(h)}$`, `$P = ${fmtFixed(P, 2)}$`, `${name}’s pay is ${money(P)}.`],
      };
    }
    const days = rng.sample(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], 3);
    const order = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    days.sort((x, y) => order.indexOf(x) - order.indexOf(y));
    const { r, hs } = retry(
      () => ({ r: rng.int(61, 87) / 4, hs: [0, 1, 2].map(() => rng.pick([3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8])) }),
      (o) => isWhole(clean(o.r * (o.hs[0] + o.hs[1] + o.hs[2]) * 100)) && !isWhole(o.r),
    );
    const H = clean(hs[0] + hs[1] + hs[2]);
    const P = clean(r * H);
    return {
      prompt: `${name} works at a ${job} and earns ${money(r)} per hour. The table shows ${name}’s shifts this week.\n\nFind the total hours. Then use $P = rh$ to find ${name}’s pay for the week, ${CENT}.`,
      figure: { type: 'table', headers: ['Day', 'Hours worked'], rows: days.map((dd, i) => [dd, fmt(hs[i])]) },
      parts: [exact(H, { label: 'Total hours:', suffix: 'h' }), moneyPart(P, 'Pay: \\$')],
      hints: ['Add the hours for all three days first.', 'Then multiply the total hours by the hourly rate.'],
      solution: [
        `Total hours: $${hs.map(fmt).join(' + ')} = ${num(H)}$`,
        `Write the formula: $P = rh$`,
        `Substitute $r = ${mv(r)}$ and $h = ${num(H)}$: $P = ${mv(r)} \\times ${num(H)} = ${fmtFixed(P, 2)}$`,
        `${name} earns ${money(P)} this week.`,
      ],
    };
  },
  // Taxi fare C = b + mk (d3: change from a payment)
  (rng, d, name) => {
    const city = rng.pick(CITIES);
    const b = d === 1 ? rng.pick([3, 4, 5]) : rng.pick([3.25, 3.5, 3.75, 4.1]);
    const m = d === 1 ? rng.pick([2, 3]) : rng.pick([1.75, 1.85, 1.95, 2.1, 2.25]);
    const k = d === 1 ? rng.int(3, 12) : rng.int(5, 25);
    const C = clean(b + m * k);
    /** Money inside maths: whole dollars at difficulty 1, always with cents after that. */
    const M = (x: number) => (d === 1 ? mv(x) : fmtFixed(x, 2));
    const F = `C = ${M(b)} + ${M(m)}k`;
    const def = `($C$ is the fare in dollars and $k$ is the distance in kilometres.)`;
    const hints = [`Replace $k$ with $${k}$.`, `Multiply $${M(m)} \\times ${k}$ first, then add $${M(b)}$.`];
    const steps = [
      `Write the formula: $${F}$`,
      `Substitute $k = ${k}$: $C = ${M(b)} + ${M(m)} \\times ${k}$`,
      `Multiply first: $C = ${M(b)} + ${M(m * k)}$`,
      `Add: $C = ${M(C)}$`,
    ];
    if (d === 1) {
      return {
        prompt: `A taxi company in ${city} uses the formula $${F}$ to find the fare. ${def} What is the fare for a ${q(k, 'km')} trip?`,
        parts: [exact(C, { label: '\\$' })],
        hints,
        solution: [...steps, `The fare is ${tag(C)}.`],
      };
    }
    if (d === 2) {
      return {
        prompt: `A taxi company in ${city} uses the formula $${F}$ to find the fare. ${def} What is the fare for a ${q(k, 'km')} trip, ${CENT}?`,
        parts: [moneyPart(C)],
        hints,
        solution: [...steps, `The fare is ${money(C)}.`],
      };
    }
    const paid = [20, 40, 50, 60, 80, 100].find((x) => x >= C + 3) ?? 100;
    const change = clean(paid - C);
    return {
      prompt: `A taxi company in ${city} uses the formula $${F}$ to find the fare. ${def} ${name} takes a ${q(k, 'km')} trip and pays with ${tag(paid)}.\n\nFind the fare and ${name}’s change, ${CENT}.`,
      parts: [moneyPart(C, 'Fare: \\$'), moneyPart(change, 'Change: \\$')],
      hints: [`Use the formula first: replace $k$ with $${k}$.`, `Then subtract the fare from ${tag(paid)} to find the change.`],
      solution: [...steps, `The fare is ${money(C)}.`, `Change: $${paid} - ${M(C)} = ${fmtFixed(change, 2)}$`, `${name} gets ${money(change)} in change.`],
    };
  },
  // Distance d = st (d3: distance left on a trip)
  (rng, d, name) => {
    const veh = rng.pick(['bus', 'delivery truck', 'pickup truck', 'car']);
    const hints = ['$st$ means $s \\times t$: speed times time.', 'Replace $s$ with the speed and $t$ with the time in hours, then multiply.'];
    const def = '($d$ is the distance in kilometres, $s$ is the speed in kilometres per hour, and $t$ is the time in hours.)';
    if (d < 3) {
      const s = d === 1 ? rng.pick([60, 70, 80, 90, 100]) : rng.pick([85, 95, 105, 110]);
      const t = d === 1 ? rng.int(2, 5) : rng.pick([1.5, 2.5, 3.5, 4.5]);
      const D = clean(s * t);
      return {
        prompt: `A ${veh} travels at an average speed of $${s}\\ ${tx('km/h')}$ for $${num(t)}$ hours. Use the formula $d = st$ to find the distance it travels. ${def}`,
        parts: [exact(D, { suffix: 'km' })],
        hints,
        solution: [`Write the formula: $d = st$`, `Substitute $s = ${s}$ and $t = ${num(t)}$: $d = ${s} \\times ${num(t)}$`, `$d = ${num(D)}$`, `The ${veh} travels ${q(D, 'km')}.`],
      };
    }
    const [from, to, total] = rng.pick([
      ['Lakeside', 'Riverton', 300],
      ['Riverton', 'Clearwater', 460],
      ['Lakeside', 'Hillcrest', 210],
      ['Lakeside', 'Pinewood', 295],
      ['Riverton', 'Ashford', 435],
      ['Brookfield', 'Hillcrest', 355],
    ] as const);
    const { s, t } = retry(
      () => ({ s: rng.pick([80, 90, 100, 110]), t: rng.pick([1.5, 2, 2.5, 3]) }),
      (o) => o.s * o.t <= total - 40,
    );
    const D = clean(s * t);
    const left = clean(total - D);
    return {
      prompt: `${name} drives a ${veh} from ${from} to ${to}. The trip is about ${q(total, 'km')} long. ${name} drives at an average speed of $${s}\\ ${tx('km/h')}$ for $${num(t)}$ hours, then stops for a break.\n\nUse $d = st$ to find how far ${name} has driven. Then find how far is left to go. ${def}`,
      parts: [exact(D, { label: 'Distance driven:', suffix: 'km' }), exact(left, { label: 'Distance left:', suffix: 'km' })],
      hints: ['Use the formula first: multiply the speed by the time.', `Then subtract that distance from the whole trip of ${q(total, 'km')}.`],
      solution: [
        `Write the formula: $d = st$`,
        `Substitute $s = ${s}$ and $t = ${num(t)}$: $d = ${s} \\times ${num(t)} = ${num(D)}$`,
        `${name} has driven ${q(D, 'km')}.`,
        `Distance left: $${total} - ${num(D)} = ${num(left)}$`,
        `${name} has ${q(left, 'km')} left to go.`,
      ],
    };
  },
  // Temperature F = 1.8C + 32 (d1 and d2 only; d3 falls back to another formula)
  (rng, d, name) => {
    if (d === 3) return FORMULAS[rng.int(0, 3)](rng, d, name);
    const C = d === 1 ? rng.pick([0, 5, 10, 15, 20, 25, 30]) : rng.intExcept(1, 35, [5, 10, 15, 20, 25, 30, 35]);
    const F = clean(1.8 * C + 32);
    const city = rng.pick(CITIES);
    return {
      prompt: `It is $${C}^\\circ\\text{C}$ in ${city}. ${name}’s friend in Montana asks for the temperature in degrees Fahrenheit. Use the formula $F = 1.8C + 32$ to change the temperature to degrees Fahrenheit.`,
      parts: [exact(F, { suffix: '°F' })],
      hints: ['Replace $C$ with the Celsius temperature.', '$1.8C$ means $1.8 \\times C$. Multiply first, then add $32$.'],
      solution: [
        `Write the formula: $F = 1.8C + 32$`,
        `Substitute $C = ${C}$: $F = 1.8 \\times ${C} + 32$`,
        `Multiply first: $F = ${num(1.8 * C)} + 32$`,
        `Add: $F = ${num(F)}$`,
        `$${C}^\\circ\\text{C}$ is $${num(F)}^\\circ\\text{F}$.`,
      ],
    };
  },
];

function useFormula(rng: Rng, d: Difficulty): Out {
  const name = rng.pick(NAMES);
  return rng.pick(FORMULAS)(rng, d, name);
}

// ---------------------------------------------------------------------------
// 5.3 Solving equations — one step
// ---------------------------------------------------------------------------

const LETTERS = ['x', 'n', 'm', 'k', 'p', 't', 'y', 'w', 'h', 'c'];
type Op1 = 'add' | 'sub' | 'mul' | 'div';

function oneStepTex(op: Op1, v: string, a: string, b: string, divFrac: boolean, flip = false): string {
  switch (op) {
    case 'add':
      return flip ? `${a} + ${v} = ${b}` : `${v} + ${a} = ${b}`;
    case 'sub':
      return `${v} - ${a} = ${b}`;
    case 'mul':
      return `${a}${v} = ${b}`;
    case 'div':
      return divFrac ? `\\dfrac{${v}}{${a}} = ${b}` : `${v} \\div ${a} = ${b}`;
  }
}

/** Worked steps for a one-step equation, naming the inverse operation and checking. */
function oneStepSolve(op: Op1, v: string, a: number, b: number, x: number, f: (n: number) => string = num): string[] {
  const A = f(a);
  const B = f(b);
  const X = f(x);
  switch (op) {
    case 'add':
      return [
        `$${A}$ is added to $${v}$. The inverse (opposite) of adding $${A}$ is subtracting $${A}$.`,
        `Subtract $${A}$ from both sides: $${v} = ${B} - ${A}$`,
        `$${v} = ${X}$`,
        `Check: $${X} + ${A} = ${B}$. ${works}`,
      ];
    case 'sub':
      return [
        `$${A}$ is subtracted from $${v}$. The inverse of subtracting $${A}$ is adding $${A}$.`,
        `Add $${A}$ to both sides: $${v} = ${B} + ${A}$`,
        `$${v} = ${X}$`,
        `Check: $${X} - ${A} = ${B}$. ${works}`,
      ];
    case 'mul':
      return [
        `$${A}${v}$ means $${A} \\times ${v}$. The inverse of multiplying by $${A}$ is dividing by $${A}$.`,
        `Divide both sides by $${A}$: $${v} = ${B} \\div ${A}$`,
        `$${v} = ${X}$`,
        `Check: $${A} \\times ${X} = ${B}$. ${works}`,
      ];
    case 'div':
      return [
        `$${v}$ is divided by $${A}$. The inverse of dividing by $${A}$ is multiplying by $${A}$.`,
        `Multiply both sides by $${A}$: $${v} = ${B} \\times ${A}$`,
        `$${v} = ${X}$`,
        `Check: $${X} \\div ${A} = ${B}$. ${works}`,
      ];
  }
}

const ONE_HINTS = [
  'Look at what is being done to the letter: adding, subtracting, multiplying or dividing.',
  'Do the inverse (opposite) operation to both sides to get the letter by itself.',
];

interface OneCtx {
  text: string;
  op: Op1;
  v: string;
  a: number;
  b: number;
  x: number;
  eq: string;
  wrong: string[];
  money: boolean;
  suffix?: string;
  say: string;
}

const ONE_CTX: Array<(rng: Rng, name: string) => OneCtx> = [
  (rng, name) => {
    const per = rng.pick([12, 18, 24, 36]);
    const x = rng.int(8, 30);
    const item = rng.pick(['cans of soup', 'bottles of juice', 'boxes of tissues']);
    return {
      text: `${name} works in a warehouse. Each case holds $${per}$ ${item}. There are $${per * x}$ ${item} in a shipment. How many cases are in the shipment? Let $c$ be the number of cases.`,
      op: 'mul', v: 'c', a: per, b: per * x, x,
      eq: `${per}c = ${per * x}`,
      wrong: [`c + ${per} = ${per * x}`, `\\dfrac{c}{${per}} = ${per * x}`, `${per * x}c = ${per}`],
      money: false, suffix: 'cases',
      say: `There are $${x}$ cases in the shipment.`,
    };
  },
  (rng, name) => {
    const spent = rng.int(25, 90);
    const left = rng.int(15, 120);
    return {
      text: `${name} spent ${tag(spent)} on groceries and had ${tag(left)} left. How much money did ${name} have before shopping? Let $m$ be that amount in dollars.`,
      op: 'sub', v: 'm', a: spent, b: left, x: spent + left,
      eq: `m - ${spent} = ${left}`,
      wrong: [`m + ${spent} = ${left}`, `${spent} - m = ${left}`, `${spent}m = ${left}`],
      money: true,
      say: `${name} had ${tag(spent + left)} before shopping.`,
    };
  },
  (rng, name) => {
    const r = rng.int(15, 22);
    const h = rng.int(12, 38);
    return {
      text: `${name} earns ${tag(r)} per hour at a ${rng.pick(JOBS)}. Last week ${name} earned ${tag(r * h)}. How many hours did ${name} work? Let $h$ be the number of hours.`,
      op: 'mul', v: 'h', a: r, b: r * h, x: h,
      eq: `${r}h = ${r * h}`,
      wrong: [`h + ${r} = ${r * h}`, `\\dfrac{h}{${r}} = ${r * h}`, `${r * h}h = ${r}`],
      money: false, suffix: 'hours',
      say: `${name} worked $${h}$ hours.`,
    };
  },
  (rng, name) => {
    const need = rng.pick([30, 40, 50, 60]);
    const done = rng.int(8, need - 6);
    return {
      text: `${name} needs $${need}$ hours of volunteer work for a certificate. ${name} has already done $${done}$ hours. How many more hours does ${name} need? Let $h$ be the hours still needed.`,
      op: 'add', v: 'h', a: done, b: need, x: need - done,
      eq: `${done} + h = ${need}`,
      wrong: [`h - ${done} = ${need}`, `${done}h = ${need}`, `h = ${done} + ${need}`],
      money: false, suffix: 'hours',
      say: `${name} needs $${need - done}$ more hours.`,
    };
  },
  (rng, name) => {
    const n = rng.pick([3, 4, 5, 6]);
    const each = rng.pick([18.5, 21.25, 23.75, 26.5, 31.25, 34.75]);
    const b = clean(n * each);
    return {
      text: `${name} and some friends split a restaurant bill equally. There are $${n}$ people, and each person pays ${money(each)}. What was the total bill? Let $b$ be the bill in dollars.`,
      op: 'div', v: 'b', a: n, b: each, x: b,
      eq: `\\dfrac{b}{${n}} = ${mv(each)}`,
      wrong: [`${n}b = ${mv(each)}`, `b - ${n} = ${mv(each)}`, `b + ${n} = ${mv(each)}`],
      money: true,
      say: `The total bill was ${money(b)}.`,
    };
  },
  (rng, name) => {
    const off = rng.int(6, 20);
    const left = rng.int(12, 35);
    const city = rng.pick(CITIES);
    return {
      text: `${name} drives a city bus in ${city}. At one stop, $${off}$ people get off and nobody gets on. Now there are $${left}$ people on the bus. How many people were on the bus before the stop? Let $p$ be that number.`,
      op: 'sub', v: 'p', a: off, b: left, x: off + left,
      eq: `p - ${off} = ${left}`,
      wrong: [`p + ${off} = ${left}`, `${off} - p = ${left}`, `${off}p = ${left}`],
      money: false, suffix: 'people',
      say: `There were $${off + left}$ people on the bus before the stop.`,
    };
  },
];

function solveOneStep(rng: Rng, d: Difficulty): Out {
  const name = rng.pick(NAMES);
  if (d === 1 || (d === 2 && rng.chance(0.5))) {
    const op = rng.pick(['add', 'sub', 'mul', 'div'] as const);
    const v = rng.pick(LETTERS);
    let a: number;
    let x: number;
    let b: number;
    if (d === 1) {
      if (op === 'add') { a = rng.int(2, 12); x = rng.int(2, 15); b = x + a; }
      else if (op === 'sub') { a = rng.int(2, 9); b = rng.int(1, 12); x = b + a; }
      else if (op === 'mul') { a = rng.int(2, 9); x = rng.int(2, 12); b = a * x; }
      else { a = rng.int(2, 6); b = rng.int(2, 10); x = a * b; }
    } else {
      if (op === 'add') { a = rng.int(12, 75) + (rng.chance(0.4) ? 0.5 : 0); x = rng.int(15, 90); b = clean(x + a); }
      else if (op === 'sub') { a = rng.int(12, 60); b = rng.int(10, 70) + (rng.chance(0.4) ? 0.5 : 0); x = clean(b + a); }
      else if (op === 'mul') { a = rng.int(6, 25); x = rng.int(12, 60) / 2; b = clean(a * x); }
      else { a = rng.int(3, 8); b = rng.int(5, 30) + (rng.chance(0.5) ? 0.5 : 0); x = clean(a * b); }
    }
    const eq = oneStepTex(op, v, num(a), num(b), d === 2, op === 'add' && rng.chance(0.3));
    return {
      prompt: `Solve the equation.\n\n$$${eq}$$`,
      parts: [exact(x, { label: `$${v} =$` })],
      hints: ONE_HINTS,
      solution: [...oneStepSolve(op, v, a, b, x), `The solution is $${v} = ${num(x)}$.`],
    };
  }
  const c = rng.pick(ONE_CTX)(rng, name);
  const f = c.money ? mv : num;
  const ans = c.money ? cash(c.x, hasCents([c.x])) : { part: exact(c.x, { suffix: c.suffix }), ask: '' };
  if (d === 2) {
    return {
      prompt: `${c.text}\n\nSolve the equation $${c.eq}$${ans.ask ? `. Give the answer ${CENT}` : ''}.`,
      parts: [{ ...ans.part, label: c.money ? `$${c.v} =$ \\$` : `$${c.v} =$` }],
      hints: ONE_HINTS,
      solution: [...oneStepSolve(c.op, c.v, c.a, c.b, c.x, f), c.say],
    };
  }
  return {
    prompt: `${c.text}\n\n(a) Choose the equation that fits the story.\n\n(b) Solve it${ans.ask}.`,
    parts: [
      { label: 'Equation', answer: mc(rng, `$${c.eq}$`, c.wrong.map((w) => `$${w}$`)) },
      { ...ans.part, label: c.money ? `$${c.v} =$ \\$` : `$${c.v} =$` },
    ],
    hints: [
      'Read the story slowly. Is the unknown amount added to, taken away from, multiplied or divided?',
      'After you choose the equation, do the inverse operation to both sides.',
    ],
    solution: [`The equation that fits is $${c.eq}$.`, ...oneStepSolve(c.op, c.v, c.a, c.b, c.x, f), c.say],
  };
}

// ---------------------------------------------------------------------------
// 5.3 Solving equations — two steps
// ---------------------------------------------------------------------------

/** Steps for a v + b = c (sign 1) or a v - b = c (sign -1). */
function twoStepSolve(v: string, a: number, b: number, c: number, x: number, sign: 1 | -1, f: (n: number) => string = num): string[] {
  const ax = clean(a * x);
  const mid = clean(c - sign * b);
  return [
    sign > 0
      ? `First undo the adding. The inverse of adding $${f(b)}$ is subtracting $${f(b)}$.`
      : `First undo the subtracting. The inverse of subtracting $${f(b)}$ is adding $${f(b)}$.`,
    sign > 0
      ? `Subtract $${f(b)}$ from both sides: $${f(a)}${v} = ${f(c)} - ${f(b)} = ${f(mid)}$`
      : `Add $${f(b)}$ to both sides: $${f(a)}${v} = ${f(c)} + ${f(b)} = ${f(mid)}$`,
    `Now undo the multiplying. The inverse of multiplying by $${f(a)}$ is dividing by $${f(a)}$: $${v} = ${f(mid)} \\div ${f(a)} = ${num(x)}$`,
    `Check: $${f(a)} \\times ${num(x)} ${sign > 0 ? '+' : '-'} ${f(b)} = ${f(ax)} ${sign > 0 ? '+' : '-'} ${f(b)} = ${f(c)}$. ${works}`,
  ];
}

const TWO_HINTS = [
  'Undo the adding or subtracting first.',
  'Then undo the multiplying by dividing both sides by the number in front of the letter.',
];

interface TwoCtx {
  text: string;
  v: string;
  a: number;
  b: number;
  x: number;
  total: number;
  money: boolean;
  suffix: string;
  setup: string;
  say: string;
}

const TWO_CTX: Array<(rng: Rng, d: Difficulty, name: string) => TwoCtx> = [
  (rng, d, name) => {
    const b = d === 2 ? rng.pick([3, 4, 5]) : rng.pick([3.25, 3.5, 3.75, 4.1]);
    const a = d === 2 ? rng.pick([2, 3]) : rng.pick([1.75, 1.95, 2.25, 2.5]);
    const x = rng.int(6, 25);
    const total = clean(b + a * x);
    return {
      text: `A taxi in ${rng.pick(CITIES)} charges ${tag(b)} to start, plus ${tag(a)} for each kilometre. ${name}’s fare was ${d === 2 ? tag(total) : money(total)}. How many kilometres long was the trip?`,
      v: 'k', a, b, x, total, money: true, suffix: 'km',
      setup: `Let $k$ be the number of kilometres. Cost per km times $k$, plus the starting fee, equals the fare`,
      say: `The trip was ${q(x, 'km')} long.`,
    };
  },
  (rng, _d, name) => {
    const b = rng.pick([20, 25, 30, 35]);
    const a = rng.pick([5, 8, 10, 12]);
    const x = rng.int(2, 9);
    const total = b + a * x;
    return {
      text: `${name}’s phone plan costs ${tag(b)} per month, plus ${tag(a)} for each gigabyte (GB) of data. Last month the bill was ${tag(total)}. How many GB of data did ${name} use?`,
      v: 'g', a, b, x, total, money: true, suffix: 'GB',
      setup: `Let $g$ be the number of GB. Cost per GB times $g$, plus the monthly fee, equals the bill`,
      say: `${name} used $${x}$ GB of data.`,
    };
  },
  (rng, _d, name) => {
    const b = rng.pick([30, 40, 50, 60]);
    const a = rng.pick([15, 20, 25, 35]);
    const x = rng.int(3, 12);
    const total = b + a * x;
    return {
      text: `${name} joins a ${rng.pick(['gym', 'swimming pool', 'climbing gym'])}. It costs a ${tag(b)} sign-up fee plus ${tag(a)} per month. So far, ${name} has paid ${tag(total)} in total. For how many months has ${name} been a member?`,
      v: 'm', a, b, x, total, money: true, suffix: 'months',
      setup: `Let $m$ be the number of months. The monthly fee times $m$, plus the sign-up fee, equals the total`,
      say: `${name} has been a member for $${x}$ months.`,
    };
  },
  (rng, d, name) => {
    const a = d === 2 ? rng.int(15, 20) : rng.pick([15.5, 16.5, 17.5, 18.5]);
    const b = rng.pick([20, 25, 30, 40, 50]);
    const x = rng.int(4, 10);
    const total = clean(a * x + b);
    return {
      text: `${name} works a holiday shift at a ${rng.pick(JOBS)}. ${name} earns ${tag(a)} per hour plus a ${tag(b)} holiday bonus. ${name}’s pay for the shift was ${d === 2 ? tag(total) : money(total)}. How many hours did ${name} work?`,
      v: 'h', a, b, x, total, money: true, suffix: 'hours',
      setup: `Let $h$ be the number of hours. The hourly rate times $h$, plus the bonus, equals the pay`,
      say: `${name} worked $${x}$ hours.`,
    };
  },
  (rng, _d, name) => {
    const b = rng.pick([30, 40, 45, 50]);
    const a = rng.pick([25, 30, 35, 40].filter((y) => y !== b));
    const x = rng.int(2, 8);
    const total = b + a * x;
    return {
      text: `A landscaping company charges a ${tag(b)} visit fee plus ${tag(a)} per hour. ${name}’s bill for a yard clean-up was ${tag(total)}. How many hours did the job take?`,
      v: 'h', a, b, x, total, money: true, suffix: 'hours',
      setup: `Let $h$ be the number of hours. The hourly rate times $h$, plus the visit fee, equals the bill`,
      say: `The job took $${x}$ hours.`,
    };
  },
  (rng, _d, name) => {
    const b = rng.pick([250, 300, 350, 400]);
    const a = rng.pick([8, 10, 12, 15]);
    const x = rng.int(15, 32);
    const total = b + a * x;
    return {
      text: `${name} is planning a class trip to a museum in Westbury. The bus costs ${tag(b)}, and entry costs ${tag(a)} per student. The total cost is ${tag(total)}. How many students are going?`,
      v: 's', a, b, x, total, money: true, suffix: 'students',
      setup: `Let $s$ be the number of students. The entry price times $s$, plus the bus, equals the total`,
      say: `$${x}$ students are going on the trip.`,
    };
  },
];

function solveTwoStep(rng: Rng, d: Difficulty): Out {
  const name = rng.pick(NAMES);
  if (d === 1 || (d === 2 && rng.chance(0.5))) {
    const v = rng.pick(LETTERS);
    const sign: 1 | -1 = rng.chance(0.65) ? 1 : -1;
    let a: number;
    let x: number;
    let b: number;
    if (d === 1) {
      a = rng.int(2, 5);
      x = rng.int(1, 10);
      b = rng.int(1, 12);
      if (sign < 0 && a * x - b <= 0) x = Math.ceil((b + 1) / a);
    } else if (rng.chance(0.3)) {
      a = rng.pick([1.5, 2.5, 0.5]);
      x = rng.int(2, 12) * 2;
      b = rng.int(3, 20);
      if (sign < 0 && a * x - b <= 0) x = Math.ceil((b + 1) / a / 2) * 2;
    } else {
      a = rng.int(3, 15);
      x = rng.int(2, 20);
      b = rng.int(5, 60);
      if (sign < 0 && a * x - b <= 0) x = Math.ceil((b + 1) / a);
    }
    const c = clean(a * x + sign * b);
    const eq = `${num(a)}${v} ${sign > 0 ? '+' : '-'} ${num(b)} = ${num(c)}`;
    return {
      prompt: `Solve the equation.\n\n$$${eq}$$`,
      parts: [exact(x, { label: `$${v} =$` })],
      hints: TWO_HINTS,
      solution: [...twoStepSolve(v, a, b, c, x, sign), `The solution is $${v} = ${num(x)}$.`],
    };
  }
  const c = rng.pick(TWO_CTX)(rng, d, name);
  const f = hasCents([c.a, c.b]) ? (n: number) => (isWhole(n) ? String(n) : fmtFixed(n, 2)) : num;
  const eq = `${f(c.a)}${c.v} + ${f(c.b)} = ${f(c.total)}`;
  if (d === 2) {
    return {
      prompt: `${c.text}\n\nSolve the equation $${eq}$ to find out.`,
      parts: [exact(c.x, { label: `$${c.v} =$`, suffix: c.suffix })],
      hints: TWO_HINTS,
      solution: [...twoStepSolve(c.v, c.a, c.b, c.total, c.x, 1, f), c.say],
    };
  }
  return {
    prompt: `${c.text}\n\nWrite an equation and solve it.`,
    parts: [exact(c.x, { suffix: c.suffix })],
    hints: [
      'The amount that is charged again and again multiplies the unknown. The one-time amount is added once.',
      `Write (amount each) $\\times$ (unknown) + (one-time amount) = total. Then undo the adding first, and the multiplying second.`,
    ],
    solution: [`${c.setup}: $${eq}$`, ...twoStepSolve(c.v, c.a, c.b, c.total, c.x, 1, f), c.say],
  };
}

// ---------------------------------------------------------------------------
// 5.4 Graphs of relationships
// ---------------------------------------------------------------------------

interface LineCtx {
  intro: string;
  xLabel: string;
  yLabel: string;
  xMax: number;
  yMax: number;
  yStep: number;
  /** y = b + m x */
  b: number;
  m: number;
  caption: string;
  money: boolean;
  ySuffix?: string;
  xSuffix: string;
  /** Questions in words. */
  askY: (x: number) => string;
  askX: (y: number) => string;
  sayY: (x: number, y: string) => string;
  sayX: (x: number, y: string) => string;
  xWord: string;
  yWord: string;
  unitX: string;
  trend: { right: string; wrong: string[] };
  start?: { right: string; wrong: string[] };
}

const LINE_CTX: Array<(rng: Rng, name: string) => LineCtx> = [
  (rng, name) => {
    const r = rng.pick([15, 20, 25]);
    const job = rng.pick(JOBS);
    return {
      intro: `The graph shows how much ${name} earns at a ${job} for different numbers of hours worked.`,
      xLabel: 'Hours worked', yLabel: 'Pay ($)', xMax: 8, yMax: 8 * r, yStep: r, b: 0, m: r,
      caption: `${name}’s pay`, money: true, xSuffix: 'hours',
      askY: (x) => `How much does ${name} earn for working $${x}$ hours?`,
      askX: (y) => `How many hours must ${name} work to earn \\$${y}?`,
      sayY: (x, y) => `${name} earns ${y} for $${x}$ hours.`,
      sayX: (x, y) => `${name} must work $${x}$ hours to earn ${y}.`,
      xWord: 'hours worked', yWord: 'pay', unitX: 'hour',
      trend: {
        right: `The more hours ${name} works, the more ${name} earns.`,
        wrong: [`The more hours ${name} works, the less ${name} earns.`, `${name} earns the same amount no matter how many hours.`, `${name} earns more for the first few hours, then less.`],
      },
    };
  },
  (rng, name) => {
    const s = rng.pick([50, 80, 100]);
    const veh = rng.pick(['a gravel truck', 'a school bus', 'a delivery van']);
    return {
      intro: `${name} drives ${veh} on a highway. The graph shows the distance travelled over time.`,
      xLabel: 'Time (h)', yLabel: 'Distance (km)', xMax: 6, yMax: 6 * s, yStep: s, b: 0, m: s,
      caption: 'Distance travelled', money: false, ySuffix: 'km', xSuffix: 'hours',
      askY: (x) => `How far has ${name} driven after $${x}$ hours?`,
      askX: (y) => `How long does it take ${name} to drive ${q(y, 'km')}?`,
      sayY: (x, y) => `After $${x}$ hours, ${name} has driven ${y}.`,
      sayX: (x, y) => `It takes $${x}$ hours to drive ${y}.`,
      xWord: 'time', yWord: 'distance', unitX: 'hour',
      trend: {
        right: 'As time goes on, the distance travelled goes up.',
        wrong: ['As time goes on, the distance travelled goes down.', 'The distance travelled stays the same.', 'The driver stops halfway through the trip.'],
      },
    };
  },
  (rng, name) => {
    const m = rng.pick([2, 3]);
    const b = m * rng.pick([1, 2, 3]);
    return {
      intro: `The graph shows the taxi fare in ${rng.pick(CITIES)} for trips of different lengths. ${name} uses it to plan a trip.`,
      xLabel: 'Distance (km)', yLabel: 'Fare ($)', xMax: 8, yMax: b + 8 * m, yStep: m, b, m,
      caption: 'Taxi fares', money: true, xSuffix: 'km',
      askY: (x) => `What is the fare for a ${q(x, 'km')} trip?`,
      askX: (y) => `${name} paid \\$${y}. How long was the trip?`,
      sayY: (x, y) => `A ${q(x, 'km')} trip costs ${y}.`,
      sayX: (x, y) => `A fare of ${y} is for a ${q(x, 'km')} trip.`,
      xWord: 'distance', yWord: 'fare', unitX: 'kilometre',
      trend: {
        right: 'The longer the trip, the higher the fare.',
        wrong: ['The longer the trip, the lower the fare.', 'Every trip costs the same.', 'The fare goes up, then down.'],
      },
      start: {
        right: `The fare starts at \\$${b}. That is the starting fee, before the taxi moves.`,
        wrong: [`The taxi costs \\$${b} for each kilometre.`, `The longest trip costs \\$${b}.`, `The taxi can only drive ${b} km.`],
      },
    };
  },
  (rng, name) => {
    const b = rng.pick([20, 30]);
    return {
      intro: `${name}’s phone plan has a monthly fee plus a charge for each gigabyte (GB) of data. The graph shows the monthly bill.`,
      xLabel: 'Data used (GB)', yLabel: 'Monthly bill ($)', xMax: 8, yMax: b + 80, yStep: 10, b, m: 10,
      caption: 'Phone bill', money: true, xSuffix: 'GB',
      askY: (x) => `What is the bill for a month when ${name} uses $${x}$ GB?`,
      askX: (y) => `One month, ${name}’s bill was \\$${y}. How much data did ${name} use?`,
      sayY: (x, y) => `The bill for $${x}$ GB is ${y}.`,
      sayX: (x, y) => `A bill of ${y} means ${name} used $${x}$ GB.`,
      xWord: 'data used', yWord: 'bill', unitX: 'GB',
      trend: {
        right: 'The more data used, the higher the bill.',
        wrong: ['The more data used, the lower the bill.', 'The bill is the same no matter how much data is used.', 'The bill goes up, then down.'],
      },
      start: {
        right: `The bill is \\$${b} even when no data is used. That is the monthly fee.`,
        wrong: [`Each GB costs \\$${b}.`, `The most the bill can be is \\$${b}.`, `${name} used ${b} GB of data.`],
      },
    };
  },
  (rng, name) => {
    const m = rng.pick([10, 20]);
    const dev = rng.pick(['phone', 'tablet', 'laptop']);
    return {
      intro: `${name} unplugs a fully charged ${dev}. The graph shows the battery charge over time.`,
      xLabel: 'Time (h)', yLabel: 'Battery (%)', xMax: 100 / m, yMax: 100, yStep: 10, b: 100, m: -m,
      caption: 'Battery charge', money: false, ySuffix: '%', xSuffix: 'hours',
      askY: (x) => `What is the battery charge after $${x}$ hours?`,
      askX: (y) => `After how many hours is the battery at $${y}\\%$?`,
      sayY: (x, y) => `After $${x}$ hours, the battery is at ${y}.`,
      sayX: (x, y) => `The battery is at ${y} after $${x}$ hours.`,
      xWord: 'time', yWord: 'battery charge', unitX: 'hour',
      trend: {
        right: 'As time goes on, the battery charge goes down.',
        wrong: ['As time goes on, the battery charge goes up.', 'The battery charge stays the same.', 'The battery charge goes down, then back up.'],
      },
      start: {
        right: `The battery starts at $100\\%$ (fully charged).`,
        wrong: ['The battery starts empty.', `The battery loses $100\\%$ every hour.`, 'The battery lasts for 100 hours.'],
      },
    };
  },
];

function lineFigure(c: LineCtx): Figure {
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: c.xMax, yMin: 0, yMax: c.yMax, xStep: 1, yStep: c.yStep, xLabel: c.xLabel, yLabel: c.yLabel },
    polylines: [{ points: [[0, c.b], [c.xMax, c.b + c.m * c.xMax]] }],
    caption: c.caption,
  };
}

function walkGraph(rng: Rng, name: string): Out {
  const bike = rng.chance(0.4);
  const yStep = bike ? 1 : 0.5;
  const v1 = bike ? 2 : rng.pick([0.5, 1]);
  const n1 = rng.int(2, 3);
  const D1 = v1 * n1;
  const rest = rng.int(1, 2);
  const home = rng.chance(0.5);
  let n3: number;
  let end: number;
  if (home) {
    // Walkers may hurry home at 1 km per 10 min; bikes come back at the same speed.
    const v3 = !bike && v1 === 0.5 && n1 === 2 && rng.chance(0.5) ? 1 : v1;
    n3 = Math.round(D1 / v3);
    end = 0;
  } else {
    n3 = rng.int(1, 2);
    end = clean(D1 + n3 * (bike ? 2 : rng.pick([0.5, 1])));
  }
  const t1 = 10 * n1;
  const t2 = t1 + 10 * rest;
  const t3 = t2 + 10 * n3;
  const peak = Math.max(D1, end);
  const yMax = clean(peak + yStep);
  const who = bike ? 'bikes' : 'walks';
  const trip = bike ? 'bike ride' : 'walk';
  const figure: Figure = {
    type: 'plane',
    grid: { xMin: 0, xMax: t3, yMin: 0, yMax, xStep: 10, yStep, xLabel: 'Time (min)', yLabel: 'Distance from home (km)' },
    polylines: [{ points: [[0, 0], [t1, D1], [t2, D1], [t3, end]] }],
    caption: `${name}’s ${trip}`,
  };
  const intro = bike
    ? `${name} ${who} on a trail in ${rng.pick(CITIES)}. The graph shows how far ${name} is from home during the ride.`
    : `${name} ${who} a neighbour’s dog. The graph shows how far ${name} is from home during the walk.`;
  const kind = rng.pick(['rest', 'distance', 'describe'] as const);
  const readHint = 'Each flat part of the graph means the distance from home is not changing.';
  if (kind === 'rest') {
    return {
      prompt: `${intro}\n\nFor how many minutes did ${name} stop?`,
      figure,
      parts: [numPart(t2 - t1, { suffix: 'min' })],
      hints: [readHint, 'Read the time where the flat part starts and where it ends. Then subtract.'],
      solution: [
        `The flat part of the graph shows ${name} stopped: the distance stays at ${q(D1, 'km')}.`,
        `It starts at $${t1}$ minutes and ends at $${t2}$ minutes.`,
        `$${t2} - ${t1} = ${t2 - t1}$`,
        `${name} stopped for $${t2 - t1}$ minutes.`,
      ],
    };
  }
  if (kind === 'distance') {
    if (home) {
      return {
        prompt: `${intro}\n\nHow far did ${name} travel in total, going out and coming back?`,
        figure,
        parts: [exact(2 * D1, { suffix: 'km' })],
        hints: ['Find the farthest distance from home on the graph.', `${name} went out that far and then came all the way back, so add the two parts.`],
        solution: [
          `The highest point of the graph is ${q(D1, 'km')}, so ${name} went ${q(D1, 'km')} away from home.`,
          `The graph comes back down to $0$, so ${name} came back ${q(D1, 'km')}.`,
          `$${num(D1)} + ${num(D1)} = ${num(2 * D1)}$`,
          `${name} travelled ${q(2 * D1, 'km')} in total.`,
        ],
      };
    }
    const D3 = clean(end - D1);
    return {
      prompt: `${intro}\n\nHow far did ${name} go after the stop?`,
      figure,
      parts: [exact(D3, { suffix: 'km' })],
      hints: [readHint, 'Read the distance at the end of the stop and at the end of the graph. Then subtract.'],
      solution: [
        `During the stop, ${name} is ${q(D1, 'km')} from home.`,
        `At the end ($${t3}$ minutes), ${name} is ${q(end, 'km')} from home.`,
        `$${num(end)} - ${num(D1)} = ${num(D3)}$`,
        `${name} went ${q(D3, 'km')} after the stop.`,
      ],
    };
  }
  const move = bike ? 'Riding' : 'Walking';
  const away = `${move} farther away from home`;
  const back = `${move} back toward home`;
  const stopped = 'Stopped, not moving';
  const segment = rng.pick(['rest', 'last'] as const);
  const [from, to] = segment === 'rest' ? [t1, t2] : [t2, t3];
  const right = segment === 'rest' ? stopped : home ? back : away;
  return {
    prompt: `${intro}\n\nWhat was ${name} doing from $${from}$ minutes to $${to}$ minutes?`,
    figure,
    parts: [{ answer: fixedChoice([away, back, stopped], [away, back, stopped].indexOf(right)) }],
    hints: ['Look at that part of the graph. Does it go up, go down or stay flat?', 'Going up means getting farther from home. Going down means getting closer to home. Flat means not moving.'],
    solution: [
      segment === 'rest'
        ? `From $${from}$ to $${to}$ minutes, the graph is flat. The distance from home stays at ${q(D1, 'km')}.`
        : home
          ? `From $${from}$ to $${to}$ minutes, the graph goes down from ${q(D1, 'km')} to $0$. ${name} is getting closer to home.`
          : `From $${from}$ to $${to}$ minutes, the graph goes up from ${q(D1, 'km')} to ${q(end, 'km')}. ${name} is getting farther from home.`,
      `${name} was: ${right.toLowerCase()}.`,
    ],
  };
}

function readRelationGraph(rng: Rng, d: Difficulty): Out {
  const name = rng.pick(NAMES);
  if (d === 3 && rng.chance(0.45)) return walkGraph(rng, name);
  const c = rng.pick(LINE_CTX)(rng, name);
  const figure = lineFigure(c);
  const yAt = (x: number) => c.b + c.m * x;
  const sayY = (y: number) => (c.money ? tag(y) : c.ySuffix === '%' ? `$${y}\\%$` : q(y, c.ySuffix!));
  const yPart = (y: number, label?: string) => (c.money ? exact(y, { label: label ?? '\\$' }) : exact(y, { label, suffix: c.ySuffix }));
  const readY = (x: number) =>
    `Find $${x}$ on the horizontal axis (${c.xWord}). Go straight up to the line, then straight across to the vertical axis.`;
  // Read at whole numbers from 2 up (never at 1, which reads as "1 hours").
  const xs = Array.from({ length: c.xMax - 2 }, (_, i) => i + 2);

  if (d === 1) {
    if (rng.chance(0.25)) {
      return {
        prompt: `${c.intro}\n\nWhich sentence describes the graph?`,
        figure,
        parts: [{ answer: mc(rng, c.trend.right, c.trend.wrong) }],
        hints: ['Follow the line from left to right. Does it go up, go down or stay flat?', `Going up means the ${c.yWord} gets bigger as the ${c.xWord} gets bigger.`],
        solution: [
          c.m > 0 ? `From left to right, the line goes up.` : `From left to right, the line goes down.`,
          c.m > 0 ? `So the ${c.yWord} goes up as the ${c.xWord} goes up.` : `So the ${c.yWord} goes down as the ${c.xWord} goes up.`,
          `Answer: ${c.trend.right}`,
        ],
      };
    }
    const x = rng.pick(xs);
    const y = yAt(x);
    return {
      prompt: `${c.intro}\n\n${c.askY(x)}`,
      figure,
      parts: [yPart(y)],
      hints: ['Find the number on the horizontal axis first.', readY(x)],
      solution: [
        `Find $${x}$ on the horizontal axis and go up to the line.`,
        `Go across to the vertical axis. The line is at $${y}$.`,
        c.sayY(x, sayY(y)),
      ],
    };
  }

  if (d === 2) {
    const kind = c.start ? rng.pick(['x', 'y', 'start'] as const) : 'x';
    if (kind === 'start' && c.start) {
      return {
        prompt: `${c.intro}\n\nThe line starts on the vertical axis, where the ${c.xWord} is $0$. What does that point tell you?`,
        figure,
        parts: [{ answer: mc(rng, c.start.right, c.start.wrong) }],
        hints: ['Look at where the line touches the vertical axis.', `That point shows the ${c.yWord} when the ${c.xWord} is $0$.`],
        solution: [
          `When the ${c.xWord} is $0$, the line is at $${c.b}$ on the vertical axis.`,
          `Answer: ${c.start.right}`,
        ],
      };
    }
    const x = rng.pick(xs);
    const y = yAt(x);
    if (kind === 'y') {
      return {
        prompt: `${c.intro}\n\n${c.askY(x)}`,
        figure,
        parts: [yPart(y)],
        hints: ['The line does not start at $0$. Read the value carefully from the vertical axis.', readY(x)],
        solution: [`Find $${x}$ on the horizontal axis and go up to the line.`, `Go across to the vertical axis. The line is at $${y}$.`, c.sayY(x, sayY(y))],
      };
    }
    return {
      prompt: `${c.intro}\n\n${c.askX(y)}`,
      figure,
      parts: [exact(x, { suffix: c.xSuffix })],
      hints: ['This time, start on the vertical axis.', `Find $${y}$ on the vertical axis. Go straight across to the line, then straight down to the horizontal axis.`],
      solution: [
        `Find $${y}$ on the vertical axis (${c.yWord}) and go across to the line.`,
        `Go straight down to the horizontal axis. It is at $${x}$.`,
        c.sayX(x, sayY(y)),
      ],
    };
  }

  // Difficulty 3: two readings
  if (c.b !== 0 && rng.chance(0.4)) {
    const [x1, x2] = retry(() => rng.sample(xs, 2).sort((p, r) => p - r), ([p, r]) => r - p >= 2);
    const y1 = yAt(x1);
    const y2 = yAt(x2);
    const per = Math.abs(c.m);
    const perPart = c.money ? exact(per, { label: '\\$' }) : exact(per, { suffix: c.ySuffix });
    return {
      prompt: `${c.intro}\n\nUse two points on the graph to find how much the ${c.yWord} ${c.m > 0 ? 'goes up' : 'goes down'} for each ${c.unitX}.`,
      figure,
      parts: [perPart],
      hints: [`Read the ${c.yWord} at two points where the line crosses grid lines.`, `Find the change in the ${c.yWord}, then divide by the change in the ${c.xWord}.`],
      solution: [
        `At $${x1}$ ${c.xSuffix}, the line is at $${y1}$. At $${x2}$ ${c.xSuffix}, it is at $${y2}$.`,
        `Change in ${c.yWord}: $${Math.max(y1, y2)} - ${Math.min(y1, y2)} = ${Math.abs(y2 - y1)}$`,
        `Change in ${c.xWord}: $${x2} - ${x1} = ${x2 - x1}$`,
        `$${Math.abs(y2 - y1)} \\div ${x2 - x1} = ${per}$`,
        `The ${c.yWord} ${c.m > 0 ? 'goes up' : 'goes down'} by ${sayY(per)} for each ${c.unitX}.`,
      ],
    };
  }
  const [x1, x2] = rng.sample(xs, 2).sort((p, r) => p - r);
  const y1 = yAt(x1);
  const y2 = yAt(x2);
  const diff = Math.abs(y2 - y1);
  const qText = c.money
    ? `How much more is the ${c.yWord} for $${x2}$ ${c.xSuffix} than for $${x1}$ ${c.xSuffix}?`
    : c.m > 0
      ? `How much farther has ${name} driven after $${x2}$ hours than after $${x1}$ hours?`
      : `How much did the battery charge drop from $${x1}$ hours to $${x2}$ hours?`;
  return {
    prompt: `${c.intro}\n\n${qText}`,
    figure,
    parts: [yPart(diff)],
    hints: ['Read two values from the graph.', 'Then subtract the smaller value from the larger value.'],
    solution: [
      `At $${x1}$ ${c.xSuffix}, the line is at $${y1}$.`,
      `At $${x2}$ ${c.xSuffix}, the line is at $${y2}$.`,
      `$${Math.max(y1, y2)} - ${Math.min(y1, y2)} = ${diff}$`,
      `The difference is ${sayY(diff)}.`,
    ],
  };
}

// ---------------------------------------------------------------------------
// Skill definitions
// ---------------------------------------------------------------------------

export const PATTERN_SKILLS: SkillDef[] = [
  skill({
    id: 'm104-pattern-extend',
    name: 'Extend a pattern',
    description: 'Find the next terms of a pattern from a real situation, and find which term reaches a goal.',
    outcomes: ['PR1'],
    lessonId: 'm104-5-1',
    calculator: true,
    gen: patternExtend,
  }),
  skill({
    id: 'm104-pattern-rule',
    name: 'Write a rule for a pattern',
    description: 'Describe a pattern in words and write a rule such as y = 3n + 2 from a table of values.',
    outcomes: ['PR1'],
    lessonId: 'm104-5-1',
    calculator: true,
    gen: patternRule,
  }),
  skill({
    id: 'm104-write-expression',
    name: 'Write an expression',
    description: 'Write an expression with a variable for an everyday situation, such as 12n for the cost of n tickets.',
    outcomes: ['PR2'],
    lessonId: 'm104-5-2',
    calculator: true,
    gen: writeExpression,
  }),
  skill({
    id: 'm104-use-formula',
    name: 'Use a formula',
    description: 'Substitute values into a formula such as P = 2l + 2w or C = 4 + 2k and evaluate it.',
    outcomes: ['PR2'],
    lessonId: 'm104-5-2',
    calculator: true,
    gen: useFormula,
  }),
  skill({
    id: 'm104-solve-one-step',
    name: 'Solve one-step equations',
    description: 'Solve equations such as x + 7 = 15 or 4x = 36 with an inverse operation, and check the answer.',
    outcomes: ['PR2'],
    lessonId: 'm104-5-3',
    calculator: true,
    gen: solveOneStep,
  }),
  skill({
    id: 'm104-solve-two-step',
    name: 'Solve two-step equations',
    description: 'Solve equations such as 3x + 5 = 26, including taxi fares and phone bills, and check the answer.',
    outcomes: ['PR2'],
    lessonId: 'm104-5-3',
    calculator: true,
    gen: solveTwoStep,
  }),
  skill({
    id: 'm104-read-relation-graph',
    name: 'Read a graph of a relationship',
    description: 'Read values from a line graph of a relationship and describe what the graph shows.',
    outcomes: ['PR1'],
    lessonId: 'm104-5-4',
    calculator: true,
    gen: readRelationGraph,
  }),
];
