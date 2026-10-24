/** Math 7 Unit 10 — Data Analysis (SP1, SP2, SP3). */
import { fixedChoice, mc, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Kiona', 'Thanh', 'Harpreet', 'Marie-Ève',
];
const CITIES = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater'];

const sum = (a: number[]) => a.reduce((s, x) => s + x, 0);
const asc = (a: number[]) => [...a].sort((p, q) => p - q);
const isWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
function median(a: number[]): number {
  const s = asc(a);
  const n = s.length;
  return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
}
/** Every value that appears most often (empty when no value repeats). */
function modes(a: number[]): number[] {
  const c = new Map<number, number>();
  for (const v of a) c.set(v, (c.get(v) ?? 0) + 1);
  const top = Math.max(...c.values());
  return top < 2 ? [] : [...c].filter(([, k]) => k === top).map(([v]) => v).sort((p, q) => p - q);
}
/** True when v sits too close to a rounding boundary at `dp` places. */
function onEdge(v: number, dp: number): boolean {
  const s = Math.abs(v) * 10 ** dp;
  return Math.abs(s - Math.floor(s) - 0.5) < 0.06;
}
/** A number in maths; negatives in a sum get brackets. */
const term = (x: number) => (x < 0 ? `(${fmt(x)})` : fmt(x));
const plus = (a: number[]) => a.map(term).join(' + ');
/** "= 12.5" when exact at 4 places, otherwise "\approx 12.4567". */
const eq = (v: number) => (Math.abs(roundTo(v, 4) - v) < 1e-9 ? `= ${fmt(v)}` : `\\approx ${fmt(v, 3)}`);
const money = (x: number) => `\\$${isWhole(x) ? String(Math.round(x)) : fmtFixed(x, 2)}`;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// ---------------------------------------------------------------------------
// Data contexts
// ---------------------------------------------------------------------------

interface StatCtx {
  intro: (name: string, n: number) => string;
  r1: [number, number];
  r2: [number, number];
  /** Answer-box suffix and the word after a value in prose. */
  unit: string;
  /** Unit inside maths ('' for counts). */
  tex: string;
  /** For "the mean ___". */
  noun: string;
  money?: boolean;
}

const STATS: StatCtx[] = [
  { intro: (name, n) => `${name}'s hockey team scored these numbers of goals in its last $${n}$ games:`, r1: [0, 7], r2: [0, 9], unit: 'goals', tex: '', noun: 'number of goals per game' },
  { intro: (name, n) => `${name} plays basketball for a school team. Here are ${name}'s points in the last $${n}$ games:`, r1: [2, 20], r2: [0, 28], unit: 'points', tex: '', noun: 'number of points per game' },
  { intro: (_n, n) => `Here are the daily high temperatures in a northern town for $${n}$ days in January, in degrees Celsius:`, r1: [-15, -2], r2: [-24, 3], unit: '°C', tex: '^\\circ\\text{C}', noun: 'high temperature' },
  { intro: (name, n) => `${name} wrote $${n}$ math quizzes. Each quiz was marked out of $20$. The scores were:`, r1: [10, 20], r2: [7, 20], unit: 'marks', tex: '', noun: 'quiz score' },
  { intro: (name, n) => `${name} kept track of the minutes spent on homework each night for $${n}$ nights:`, r1: [15, 60], r2: [10, 75], unit: 'min', tex: '\\ \\text{min}', noun: 'homework time' },
  { intro: (_n, n) => `$${n}$ students in a gym class counted how many push-ups they could do in one minute:`, r1: [10, 40], r2: [5, 48], unit: 'push-ups', tex: '', noun: 'number of push-ups' },
  { intro: (_n, n) => `$${n}$ students in a book club recorded how many books they read over the summer:`, r1: [1, 12], r2: [0, 16], unit: 'books', tex: '', noun: 'number of books' },
  { intro: (_n, n) => `$${n}$ classes at a school held a bake sale. The amounts the classes raised were:`, r1: [40, 120], r2: [35, 180], unit: '', tex: '', noun: 'amount raised', money: true },
  { intro: (name, n) => `${name} grew $${n}$ sunflowers for a 4-H project. Their heights, in centimetres, were:`, r1: [120, 190], r2: [95, 210], unit: 'cm', tex: '\\ \\text{cm}', noun: 'height' },
];

const fmtVal = (ctx: StatCtx, v: number) => (ctx.money ? money(v) : ctx.tex ? `$${fmt(v)}${ctx.tex}$` : `$${fmt(v)}$ ${ctx.unit}`);
const showList = (ctx: StatCtx, vs: number[]) => (ctx.money ? vs.map(money).join(', ') : `$${vs.map(fmt).join(',\\ \\ ')}$`);
const listTex = (vs: number[]) => `$${vs.map(fmt).join(',\\ \\ ')}$`;
/** The answer box: money to the cent when rounding, otherwise a number with the unit. */
function valuePart(ctx: StatCtx, v: number, dp?: number, label?: string): Part {
  if (ctx.money) return dp === 2 || !isWhole(v) ? numPart(v, { decimals: 2, tolerance: 0.011, label: label ?? '\\$' }) : numPart(v, { label: label ?? '\\$' });
  return numPart(v, { decimals: dp, suffix: ctx.unit || undefined, label });
}
const roundWords = (ctx: StatCtx) => (ctx.money ? 'to the nearest cent' : 'to the nearest tenth');
const roundDp = (ctx: StatCtx) => (ctx.money ? 2 : 1);

const MEASURE_DEF = {
  mean: 'The **mean** is the sum of the values divided by the number of values.',
  median: 'The **median** is the middle value when the values are in order from least to greatest.',
  mode: 'The **mode** is the value that appears most often.',
  range: 'The **range** is the greatest value minus the least value.',
};

function rand(rng: Rng, [lo, hi]: [number, number], n: number): number[] {
  return Array.from({ length: n }, () => rng.int(lo, hi));
}

/** n values in range whose mean is a whole number. */
function wholeMeanValues(rng: Rng, r: [number, number], n: number): number[] {
  return retry(
    () => {
      const vs = rand(rng, r, n - 1);
      const target = Math.round(sum(vs) / (n - 1)) + rng.int(-2, 2);
      vs.push(target * n - sum(vs));
      return rng.shuffle(vs);
    },
    (vs) => vs.every((v) => v >= r[0] && v <= r[1]),
    300,
  );
}

function meanSteps(ctx: StatCtx, vs: number[], dp?: number): string[] {
  const t = sum(vs);
  const m = t / vs.length;
  const rounded = dp !== undefined && !isWhole(m * 10 ** dp);
  const shown = dp === undefined ? fmt(m) : fmtFixed(m, dp);
  return [
    `Add the values: $${plus(vs)} = ${fmt(t)}$`,
    `Divide by the number of values, $${vs.length}$: $${fmt(t)} \\div ${vs.length} ${eq(m)}$`,
    `The mean is ${rounded ? 'about ' : ''}${ctx.money ? `\\$${shown}` : ctx.tex ? `$${shown}${ctx.tex}$` : `$${shown}$ ${ctx.unit}`}.`,
  ];
}

function medianSteps(ctx: StatCtx, vs: number[]): string[] {
  const s = asc(vs);
  const n = s.length;
  const m = median(vs);
  if (n % 2) return [`Put the values in order: ${listTex(s)}`, `There are $${n}$ values, so the middle one is value number $${(n + 1) / 2}$.`, `The median is ${fmtVal(ctx, m)}.`];
  return [
    `Put the values in order: ${listTex(s)}`,
    `There are $${n}$ values, so there are two middle values: $${fmt(s[n / 2 - 1])}$ and $${fmt(s[n / 2])}$.`,
    `Find the number halfway between them: $(${term(s[n / 2 - 1])} + ${term(s[n / 2])}) \\div 2 = ${fmt(m)}$`,
    `The median is ${fmtVal(ctx, m)}.`,
  ];
}

type Measure = 'mean' | 'median' | 'mode' | 'range';

function measureItem(rng: Rng, d: Difficulty, ctx: StatCtx, name: string, m: Measure): GenOutput {
  const n = d === 1 ? (m === 'median' ? rng.pick([5, 7]) : rng.int(5, 7)) : rng.int(6, 10);
  const r = d === 1 ? ctx.r1 : ctx.r2;
  const intro = ctx.intro(name, n);
  if (m === 'mean') {
    const dp = d === 1 ? undefined : roundDp(ctx);
    const vs = d === 1 ? wholeMeanValues(rng, r, n) : retry(() => rand(rng, r, n), (v) => !isWhole(sum(v) / n) && !onEdge(sum(v) / n, dp!) && (ctx.money || !isWhole((sum(v) / n) * 10)));
    const mean = sum(vs) / n;
    return {
      prompt: `${intro} ${showList(ctx, vs)}. What is the **mean** ${ctx.noun}?${dp === undefined ? '' : ` Round ${roundWords(ctx)}.`}`,
      parts: [valuePart(ctx, mean, dp)],
      hints: ['Add all the values first.', `Then divide the sum by the number of values, $${n}$.${vs.some((v) => v < 0) ? ' Use your integer rules for the negative values.' : ''}`],
      solution: [MEASURE_DEF.mean, ...meanSteps(ctx, vs, dp)],
    };
  }
  if (m === 'median') {
    const vs = retry(() => rand(rng, r, n), (v) => new Set(v).size >= v.length - 1);
    const cents = ctx.money && !isWhole(median(vs)) ? ' Give the answer to the nearest cent.' : '';
    return {
      prompt: `${intro} ${showList(ctx, vs)}. What is the **median** ${ctx.noun}?${cents}`,
      parts: [valuePart(ctx, median(vs))],
      hints: ['Write the values in order from least to greatest first.', n % 2 ? 'Cross off one value from each end until one value is left in the middle.' : 'With an even number of values, the median is halfway between the two middle values.'],
      solution: [MEASURE_DEF.median, ...medianSteps(ctx, vs)],
    };
  }
  if (m === 'mode') {
    const reps = d === 1 ? 2 : rng.int(2, 3);
    const vs = retry(
      () => {
        const pool: number[] = [];
        for (let v = r[0]; v <= r[1]; v++) pool.push(v);
        const distinct = rng.sample(pool, n - reps + 1);
        const out = [...distinct, ...Array(reps - 1).fill(distinct[0])];
        if (reps === 3 && n >= 8) out[out.length - 1] = distinct[1];
        return rng.shuffle(out);
      },
      (v) => modes(v).length === 1,
    );
    const mode = modes(vs)[0];
    const count = vs.filter((v) => v === mode).length;
    return {
      prompt: `${intro} ${showList(ctx, vs)}. What is the **mode**?`,
      parts: [valuePart(ctx, mode)],
      hints: ['Look for a value that shows up more than once.', 'Putting the values in order puts matching values side by side.'],
      solution: [MEASURE_DEF.mode, `In order: ${listTex(asc(vs))}`, `${fmtVal(ctx, mode)} appears $${count}$ times, more than any other value.`, `The mode is ${fmtVal(ctx, mode)}.`],
    };
  }
  const vs = retry(() => rand(rng, r, n), (v) => Math.max(...v) > Math.min(...v));
  const hi = Math.max(...vs);
  const lo = Math.min(...vs);
  return {
    prompt: `${intro} ${showList(ctx, vs)}. What is the **range**?`,
    parts: [valuePart(ctx, hi - lo)],
    hints: ['Find the greatest value and the least value.', `Range = greatest − least.${lo < 0 ? ' Subtracting a negative number is the same as adding its opposite.' : ''}`],
    solution: [MEASURE_DEF.range, `Greatest: ${fmtVal(ctx, hi)}. Least: ${fmtVal(ctx, lo)}.`, `$${fmt(hi)} - ${term(lo)} = ${fmt(hi - lo)}$`, `The range is ${fmtVal(ctx, hi - lo)}.`],
  };
}

function missingValue(rng: Rng, name: string): GenOutput {
  const ctx = rng.pick(STATS.filter((c) => !c.money && c.r2[0] >= 0));
  const n = rng.int(5, 7);
  const [lo, hi] = ctx.r2;
  const { vs, target } = retry(
    () => {
      const vs = rand(rng, ctx.r2, n - 1);
      const target = Math.round(sum(vs) / (n - 1)) + rng.int(-3, 3);
      return { vs, target };
    },
    ({ vs, target }) => {
      const need = target * n - sum(vs);
      return need >= lo && need <= hi && target > 0;
    },
    300,
  );
  const need = target * n - sum(vs);
  return {
    prompt: `${ctx.intro(name, n)} ${showList(ctx, vs)} and one more value that was smudged and cannot be read. The mean ${ctx.noun} of all $${n}$ values is ${fmtVal(ctx, target)}. What is the missing value?`,
    parts: [valuePart(ctx, need)],
    hints: [`If the mean of $${n}$ values is $${target}$, the sum of all $${n}$ values is $${target} \\times ${n}$.`, 'Subtract the sum of the values you know from that total.'],
    solution: [
      `Sum of all $${n}$ values: $${target} \\times ${n} = ${target * n}$`,
      `Sum of the $${n - 1}$ values you know: $${plus(vs)} = ${sum(vs)}$`,
      `Missing value: $${target * n} - ${sum(vs)} = ${need}$`,
      `The missing value is ${fmtVal(ctx, need)}.`,
    ],
  };
}

const FREQ_CTX = [
  { what: 'goals', head: 'Goals in a game', count: 'Number of games', intro: 'The table shows how many goals a hockey team scored in each game of its season.', lo: 0 },
  { what: 'pets', head: 'Number of pets', count: 'Number of students', intro: 'Students in a Grade 7 class said how many pets they have. The table shows the results.', lo: 0 },
  { what: 'siblings', head: 'Number of brothers and sisters', count: 'Number of students', intro: 'Students in a Grade 7 class said how many siblings (brothers and sisters) they have. The table shows the results.', lo: 0 },
  { what: 'books', head: 'Books borrowed', count: 'Number of students', intro: 'A school library recorded how many books each student borrowed last week.', lo: 1 },
];

function frequencyItem(rng: Rng): GenOutput {
  const ctx = rng.pick(FREQ_CTX);
  const k = rng.int(4, 5);
  const values = Array.from({ length: k }, (_, i) => ctx.lo + i);
  const freq = retry(() => values.map(() => rng.int(1, 8)), (f) => {
    const all = values.flatMap((v, i) => Array(f[i]).fill(v) as number[]);
    return modes(all).length === 1 && !onEdge(sum(all) / all.length, 1) && sum(f) >= 12;
  });
  const all = values.flatMap((v, i) => Array(freq[i]).fill(v) as number[]);
  const n = all.length;
  const total = sum(all);
  const mean = total / n;
  const figure: Figure = { type: 'table', headers: [ctx.head, ctx.count], rows: values.map((v, i) => [String(v), String(freq[i])]) };
  const ask = rng.pick(['mean', 'median'] as const);
  if (ask === 'mean') {
    const dp = isWhole(mean * 10) ? undefined : 1;
    return {
      prompt: `${ctx.intro} What is the mean number of ${ctx.what}?${dp ? ' Round to the nearest tenth.' : ''}`,
      figure,
      parts: [numPart(mean, { decimals: dp, suffix: ctx.what })],
      hints: [`Each row is a value and how many times it happened. For example, $${values[1]}$ ${ctx.what} happened $${freq[1]}$ times.`, 'Multiply each value by how many times it happened and add the products. Then divide by the total count.'],
      solution: [
        `Total of all the values: $${values.map((v, i) => `${v} \\times ${freq[i]}`).join(' + ')} = ${total}$`,
        `Number of values: $${freq.join(' + ')} = ${n}$`,
        `Mean: $${total} \\div ${n} ${eq(mean)}$`,
        `The mean is ${dp ? 'about ' : ''}$${dp ? fmtFixed(mean, 1) : fmt(mean)}$ ${ctx.what}.`,
      ],
    };
  }
  const med = median(all);
  const pos = n % 2 ? `value number $${(n + 1) / 2}$` : `halfway between values number $${n / 2}$ and $${n / 2 + 1}$`;
  let running = 0;
  const cum = freq.map((f) => (running += f));
  return {
    prompt: `${ctx.intro} What is the median number of ${ctx.what}?`,
    figure,
    parts: [numPart(med, { suffix: ctx.what })],
    hints: ['Find how many values there are in all by adding the second column.', 'The values are already in order in the table. Count down the rows to find the middle value.'],
    solution: [
      `Number of values: $${freq.join(' + ')} = ${n}$, so the median is ${pos}.`,
      `Counting down the rows: ${values.map((v, i) => `$${v}$ covers values up to number $${cum[i]}$`).join(', ')}.`,
      `The median is $${fmt(med)}$ ${ctx.what}.`,
    ],
  };
}

function allFour(rng: Rng, name: string): GenOutput {
  const ctx = rng.pick(STATS.filter((c) => !c.money && c.r2[1] - c.r2[0] >= 12));
  const n = rng.int(7, 9);
  const pool: number[] = [];
  for (let v = ctx.r2[0]; v <= ctx.r2[1]; v++) pool.push(v);
  const vs = retry(
    () => {
      // Distinct values plus one repeat: exactly one mode.
      const base = rng.sample(pool, n - 1);
      return rng.shuffle([...base, base[0]]);
    },
    (v) => modes(v).length === 1 && !onEdge(sum(v) / n, 1),
  );
  const mean = sum(vs) / n;
  const dp = isWhole(mean * 10) ? undefined : 1;
  const mode = modes(vs)[0];
  const hi = Math.max(...vs);
  const lo = Math.min(...vs);
  return {
    prompt: `${ctx.intro(name, n)} ${showList(ctx, vs)}. Find the mean, median, mode and range.${dp ? ' Round the mean to the nearest tenth.' : ''}`,
    parts: [valuePart(ctx, mean, dp, 'Mean:'), valuePart(ctx, median(vs), undefined, 'Median:'), valuePart(ctx, mode, undefined, 'Mode:'), valuePart(ctx, hi - lo, undefined, 'Range:')],
    hints: ['Put the values in order first. It helps with the median, the mode and the range.', 'Mean: add and divide by the number of values. Median: the middle. Mode: most often. Range: greatest − least.'],
    solution: [
      `In order: ${listTex(asc(vs))}`,
      `Mean: $${plus(vs)} = ${fmt(sum(vs))}$, and $${fmt(sum(vs))} \\div ${n} ${eq(mean)}$`,
      n % 2 ? `Median: the middle value (number $${(n + 1) / 2}$) is $${fmt(median(vs))}$.` : `Median: halfway between $${fmt(asc(vs)[n / 2 - 1])}$ and $${fmt(asc(vs)[n / 2])}$ is $${fmt(median(vs))}$.`,
      `Mode: $${fmt(mode)}$ appears twice. Range: $${fmt(hi)} - ${term(lo)} = ${fmt(hi - lo)}$`,
      `Mean ${dp ? '≈ ' : '= '}${dp ? fmtFixed(mean, 1) : fmt(mean)}, median = ${fmt(median(vs))}, mode = ${fmt(mode)}, range = ${fmt(hi - lo)}.`,
    ],
  };
}

const centralTendency = skill({
  id: 'm7-central-tendency',
  name: 'Mean, median, mode and range',
  description: 'Find the mean, median, mode and range of a data set, rounding the mean to the nearest tenth when needed.',
  outcomes: ['SP1'],
  lessonId: 'm7-10-1',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 3) {
      const mode = rng.pick(['missing', 'freq', 'all'] as const);
      if (mode === 'missing') return missingValue(rng, name);
      if (mode === 'freq') return frequencyItem(rng);
      return allFour(rng, name);
    }
    const ctx = rng.pick(STATS);
    const m = rng.pick(['mean', 'median', 'mode', 'range'] as Measure[]);
    return measureItem(rng, d, ctx, name, m);
  },
});

// ---------------------------------------------------------------------------
// 10.1 Choosing the best measure
// ---------------------------------------------------------------------------

const MEASURES = ['Mean', 'Median', 'Mode', 'Range'];
const SCENARIOS: Array<{ text: (name: string) => string; answer: number; why: string }> = [
  { text: () => 'A shoe store wants to know which shoe size it sells most often, so it can order more of that size. Which measure should it use?', answer: 2, why: 'The mode is the value that appears most often: the size sold most.' },
  { text: () => 'Students voted for the theme of the school dance: Space, Jungle, Hollywood or Winter. Which measure describes the most popular choice?', answer: 2, why: 'The choices are words, not numbers, so you cannot add them or put them in order. Only the mode works: the choice made most often.' },
  { text: () => 'A pizza shop wants to know which topping customers order most often. Which measure should it use?', answer: 2, why: 'The mode is the value that appears most often. Toppings are not numbers, so the mean and median make no sense here.' },
  { text: (name) => `${name} and four friends put all their savings together, then share the total equally. Which measure tells how much each friend gets?`, answer: 0, why: 'The mean is the sum shared equally among all the values.' },
  { text: () => 'A cycling club rode different distances on 6 days. The coach wants to know how far they would ride each day if the total distance were spread evenly over the 6 days. Which measure should the coach use?', answer: 0, why: 'Spreading a total evenly is exactly what the mean does: sum ÷ number of values.' },
  { text: () => 'A coach wants the score in the middle: half the players scored more and half scored less. Which measure should the coach use?', answer: 1, why: 'The median is the middle value when the data are in order.' },
  { text: () => 'A real-estate report wants a "typical" house price in a town where a few mansions cost far more than all the other houses. Which measure is best?', answer: 1, why: 'The few very expensive houses are outliers. They pull the mean up, but the median stays in the middle of the data.' },
  { text: () => 'A teacher wants to know how spread out the test scores are, from the lowest score to the highest score. Which measure should she use?', answer: 3, why: 'The range is the greatest value minus the least value. It shows the spread.' },
  { text: () => 'A weather reporter wants to say how much the temperature changed between the coldest and the warmest day of the week. Which measure is this?', answer: 3, why: 'The difference between the greatest and least values is the range.' },
];

/** Values close together (no repeats) with an optional outlier far above or below. */
function clustered(rng: Rng, n: number, lo: number, hi: number): number[] {
  return retry(() => rand(rng, [lo, hi], n), (v) => new Set(v).size === n, 300);
}

interface SetCtx {
  intro: string;
  unit: string;
  money?: boolean;
  lo: number;
  hi: number;
  outHi: number;
  outLo?: number;
  what: string;
}

const SET_CTX: SetCtx[] = [
  { intro: 'Some students at a school earned this money babysitting last month:', unit: '', money: true, lo: 40, hi: 70, outHi: 260, what: 'a typical amount earned' },
  { intro: 'Here are the numbers of minutes some students spent on homework last night:', unit: 'min', lo: 25, hi: 45, outHi: 150, outLo: 2, what: 'a typical homework time' },
  { intro: 'A team recorded the number of points it scored in each of its basketball games:', unit: 'points', lo: 38, hi: 56, outHi: 98, outLo: 12, what: 'a typical number of points per game' },
  { intro: 'Here are the prices of the bikes for sale at a sports store:', unit: '', money: true, lo: 180, hi: 320, outHi: 1450, what: 'a typical bike price' },
  { intro: 'Here are the numbers of push-ups some students did in one minute:', unit: 'push-ups', lo: 18, hi: 32, outHi: 75, outLo: 2, what: 'a typical number of push-ups' },
  { intro: 'Here are the heights, in centimetres, of the players on a volleyball team:', unit: 'cm', lo: 158, hi: 176, outHi: 205, outLo: 135, what: 'a typical height' },
];

const valText = (c: SetCtx, v: number) => (c.money ? money(v) : `$${fmt(v)}$${c.unit ? ` ${c.unit}` : ''}`);
const listText = (c: SetCtx, vs: number[]) => (c.money ? vs.map(money).join(', ') : listTex(vs));

const SIZE_CTX = [
  { intro: 'A store sold these hat sizes on Saturday:', item: 'hat', sizes: [6.75, 7, 7.25, 7.5, 7.75] },
  { intro: 'A sports store sold these skate sizes last week:', item: 'skate', sizes: [4, 5, 6, 7, 8, 9] },
  { intro: 'A shoe store sold these shoe sizes on Monday:', item: 'shoe', sizes: [5, 5.5, 6, 6.5, 7, 7.5, 8] },
];

function bestMeasureData(rng: Rng): GenOutput {
  const kind = rng.pick(['outlier', 'close', 'sizes'] as const);
  const R = {
    median: (o: string, up: boolean) => `The median, because the outlier (${o}) pulls the mean ${up ? 'up' : 'down'}.`,
    mean: 'The mean, because it uses every value.',
    meanClose: 'The mean, because the values are close together and there is no outlier.',
    mode: 'The mode, because it is the most common value.',
    range: 'The range, because it shows how spread out the data are.',
  };
  if (kind === 'sizes') {
    const c = rng.pick(SIZE_CTX);
    const n = rng.int(9, 12);
    const top = rng.pick(c.sizes.slice(1, -1));
    const vs = retry(
      () => rng.shuffle([...Array(rng.int(4, 5)).fill(top), ...Array.from({ length: n - 5 }, () => rng.pick(c.sizes))]),
      (v) => modes(v).length === 1 && modes(v)[0] === top,
    );
    const correct = `The mode, because it is the ${c.item} size sold most often.`;
    return {
      prompt: `${c.intro} ${listTex(vs)}. The store wants to know which size to order the most of. Which measure should it use?`,
      parts: [{ answer: mc(rng, correct, [R.mean, 'The median, because it is the middle value.', R.range]) }],
      hints: ['The store needs one real size that many customers buy.', 'Which measure is always a value that appears in the data, and appears most often?'],
      solution: [
        `$${fmt(top)}$ appears ${vs.filter((v) => v === top).length} times, more than any other size, so it is the mode.`,
        `The mean is $${fmt(roundTo(sum(vs) / vs.length, 2))}$, which may not be a size the store sells.`,
        `The answer: ${correct.charAt(0).toLowerCase() + correct.slice(1)}`,
      ],
      answerDisplay: correct,
    };
  }
  const c = rng.pick(SET_CTX);
  const n = rng.int(6, 7);
  if (kind === 'close') {
    const vs = clustered(rng, n, c.lo, c.hi);
    return {
      prompt: `${c.intro} ${listText(c, vs)}. Which measure best describes ${c.what}?`,
      parts: [{ answer: mc(rng, R.meanClose, [R.median(c.money ? money(Math.max(...vs)) : `${fmt(Math.max(...vs))}${c.unit ? ` ${c.unit}` : ''}`, true), R.mode, R.range]) }],
      hints: ['Is there an outlier, a value much greater or much less than the rest?', 'Does any value repeat? If not, there is no mode.'],
      solution: [
        `The values are all between ${valText(c, Math.min(...vs))} and ${valText(c, Math.max(...vs))}. There is no outlier.`,
        'No value repeats, so there is no mode. The range shows spread, not a typical value.',
        'When the values are close together with no outlier, the mean uses every value and describes the data well.',
        `The answer: ${R.meanClose.charAt(0).toLowerCase() + R.meanClose.slice(1)}`,
      ],
      answerDisplay: R.meanClose,
    };
  }
  const up = !c.outLo || rng.chance(0.6);
  const o = up ? c.outHi + rng.int(0, Math.round((c.outHi - c.hi) * 0.2)) : c.outLo!;
  const vs = rng.shuffle([...clustered(rng, n - 1, c.lo, c.hi), o]);
  const oText = c.money ? money(o) : `${fmt(o)}${c.unit ? ` ${c.unit}` : ''}`;
  const correct = R.median(oText, up);
  return {
    prompt: `${c.intro} ${listText(c, vs)}. Which measure best describes ${c.what}?`,
    parts: [{ answer: mc(rng, correct, [R.mean, R.mode, R.range]) }],
    hints: ['Look for an outlier: a value much greater or much less than the rest.', 'An outlier pulls the mean toward it. Which measure stays in the middle of the data?'],
    solution: [
      `${valText(c, o)} is an outlier: it is far ${up ? 'above' : 'below'} the other values.`,
      `The outlier pulls the mean ${up ? 'up' : 'down'}, away from most of the values. The median stays in the middle.`,
      'No value repeats, so there is no mode. The range shows spread, not a typical value.',
      `The answer: ${correct.charAt(0).toLowerCase() + correct.slice(1)}`,
    ],
    answerDisplay: correct,
  };
}

function bestMeasureComputed(rng: Rng, name: string): GenOutput {
  if (rng.chance(0.5)) {
    const c = rng.pick(SET_CTX);
    const n = rng.int(6, 7);
    const up = !c.outLo || rng.chance(0.6);
    const o = up ? c.outHi : c.outLo!;
    const vs = retry(() => rng.shuffle([...clustered(rng, n - 1, c.lo, c.hi), o]), (v) => !onEdge(sum(v) / n, c.money ? 2 : 1));
    const mean = sum(vs) / n;
    const med = median(vs);
    const mText = c.money ? money(roundTo(mean, 2)) : `$${fmtFixed(mean, 1)}$`;
    const medText = c.money ? money(med) : `$${fmt(med)}$`;
    const correct = `The median (${medText}), because it is close to most of the values.`;
    const meanPart = c.money ? numPart(mean, { decimals: 2, tolerance: 0.011, label: 'Mean: \\$' }) : numPart(mean, { decimals: 1, label: 'Mean:', suffix: c.unit || undefined });
    const medPart = c.money ? (isWhole(med) ? numPart(med, { label: 'Median: \\$' }) : numPart(med, { decimals: 2, tolerance: 0.011, label: 'Median: \\$' })) : numPart(med, { label: 'Median:', suffix: c.unit || undefined });
    return {
      prompt: `${c.intro} ${listText(c, vs)}. Find the mean and the median (round ${c.money ? 'to the nearest cent' : 'to the nearest tenth'} when needed). Then choose the measure that best describes ${c.what}.`,
      parts: [meanPart, medPart, { label: 'Best measure:', answer: mc(rng, correct, [`The mean (${mText}), because it uses every value.`, `The mean (${mText}), because it is greater than the median.`, `The range (${c.money ? money(Math.max(...vs) - Math.min(...vs)) : `$${fmt(Math.max(...vs) - Math.min(...vs))}$`}), because it shows the spread.`]) }],
      hints: ['Find the mean and the median first.', 'Compare each one with most of the values. Is there an outlier pulling one of them away?'],
      solution: [
        `Mean: $${plus(vs)} = ${fmt(sum(vs))}$, and $${fmt(sum(vs))} \\div ${n} ${eq(mean)}$, so the mean is about ${mText}.`,
        `Median: in order, ${listText(c, asc(vs))}. The median is ${medText}.`,
        `${valText(c, o)} is an outlier. It pulls the mean ${up ? 'up' : 'down'}, so the mean is ${up ? 'greater' : 'less'} than most of the values. The median is close to most of them.`,
        `The mean is about ${mText} and the median is ${medText}. The best measure is the median, because it is close to most of the values.`,
      ],
      calculator: true,
      answerDisplay: correct,
    };
  }
  // Which measure makes the data look best?
  const lowWant = rng.chance(0.5);
  const vs = retry(
    () => {
      const mode = rng.int(10, 20);
      const others = rand(rng, [5, 40], 5);
      return rng.shuffle([mode, mode, ...others]);
    },
    (v) => {
      const ms = modes(v);
      if (ms.length !== 1) return false;
      const vals = [sum(v) / v.length, median(v), ms[0]];
      const s = [...vals].sort((a, b) => a - b);
      return s[1] - s[0] >= 1.5 && s[2] - s[1] >= 1.5 && isWhole(vals[0] * 100);
    },
    500,
  );
  const mean = sum(vs) / vs.length;
  const med = median(vs);
  const mode = modes(vs)[0];
  const vals = [mean, med, mode];
  const pick = lowWant ? vals.indexOf(Math.min(...vals)) : vals.indexOf(Math.max(...vals));
  const labels = [`The mean (${money(mean)})`, `The median (${money(med)})`, `The mode (${money(mode)})`];
  const who = lowWant ? `${name}'s parent` : name;
  const story = lowWant
    ? `${name} asks for a bigger allowance. ${name}'s parent wants to show that ${name}'s friends get a **small** weekly allowance.`
    : `${name} wants to convince a parent that ${name}'s friends get a **large** weekly allowance, so ${name}'s allowance should go up.`;
  return {
    prompt: `${story} Here are the weekly allowances of ${name}'s friends: ${vs.map(money).join(', ')}. Which measure should ${who} report to make the typical allowance look as ${lowWant ? 'small' : 'large'} as possible?`,
    parts: [{ answer: fixedChoice(labels, pick) }],
    hints: ['Find all three: the mean, the median and the mode.', `Then choose the ${lowWant ? 'least' : 'greatest'} of the three.`],
    solution: [
      `Mean: $${plus(vs)} = ${sum(vs)}$, and $${sum(vs)} \\div ${vs.length} ${eq(mean)}$, so the mean is ${money(roundTo(mean, 2))}.`,
      `Median: in order, ${asc(vs).map(money).join(', ')}. The median is ${money(med)}.`,
      `Mode: ${money(mode)} appears twice.`,
      `The ${lowWant ? 'least' : 'greatest'} is ${labels[pick].replace(/^The /, 'the ')}. ${cap(who)} should report it.`,
    ],
    calculator: true,
    answerDisplay: labels[pick],
  };
}

const bestMeasure = skill({
  id: 'm7-best-measure',
  name: 'Choosing the best measure',
  description: 'Choose the mean, median or mode that best describes a data set, with a reason, and recognize which measure suits a purpose.',
  outcomes: ['SP1'],
  lessonId: 'm7-10-1',
  format: 'mc',
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      const sc = rng.pick(SCENARIOS);
      return {
        prompt: sc.text(name),
        parts: [{ answer: fixedChoice(MEASURES, sc.answer) }],
        hints: ['Mean: share the total equally. Median: the middle value. Mode: the most common value. Range: the spread.', 'Think about what question each measure answers.'],
        solution: [sc.why, `The answer is the ${MEASURES[sc.answer].toLowerCase()}.`],
        answerDisplay: MEASURES[sc.answer],
      };
    }
    if (d === 2) return bestMeasureData(rng);
    return bestMeasureComputed(rng, name);
  },
});

// ---------------------------------------------------------------------------
// 10.2 Outliers
// ---------------------------------------------------------------------------

interface OutCtx {
  intro: (name: string) => string;
  unit: string;
  tex: string;
  lo: number;
  hi: number;
  outHi: [number, number];
  outLo?: [number, number];
  noun: string;
}

const OUT_CTX: OutCtx[] = [
  { intro: (name) => `${name} recorded the number of minutes it took to walk to school each day:`, unit: 'min', tex: '\\ \\text{min}', lo: 12, hi: 19, outHi: [38, 45], outLo: [2, 4], noun: 'walking time' },
  { intro: () => 'A hockey team counted the number of shots on goal in each game:', unit: 'shots', tex: '', lo: 22, hi: 34, outHi: [61, 70], outLo: [4, 8], noun: 'number of shots' },
  { intro: () => 'Here are the daily high temperatures in Riverton for one week in March, in degrees Celsius:', unit: '°C', tex: '^\\circ\\text{C}', lo: 2, hi: 9, outHi: [20, 23], outLo: [-15, -11], noun: 'high temperature' },
  { intro: (name) => `${name} recorded the scores on a spelling test for some friends, out of 50:`, unit: 'marks', tex: '', lo: 36, hi: 48, outLo: [9, 14], outHi: [36, 48], noun: 'score' },
  { intro: () => 'A farm recorded how many eggs its hens laid each day:', unit: 'eggs', tex: '', lo: 40, hi: 52, outHi: [90, 98], outLo: [8, 14], noun: 'number of eggs' },
  { intro: (name) => `${name} timed how many seconds it took to solve a puzzle cube in several tries:`, unit: 's', tex: '\\ \\text{s}', lo: 48, hi: 62, outHi: [130, 150], outLo: [12, 16], noun: 'solving time' },
];

const oval = (c: OutCtx, v: number) => (c.tex ? `$${fmt(v)}${c.tex}$` : `$${fmt(v)}$ ${c.unit}`);

/** A cluster plus one outlier. `up` puts the outlier above the cluster. */
function outlierSet(rng: Rng, c: OutCtx, n: number, up: boolean, withMode = false): { rest: number[]; o: number } {
  const range = up ? c.outHi : c.outLo!;
  const o = rng.int(range[0], range[1]);
  const rest = retry(
    () => {
      if (!withMode) return rand(rng, [c.lo, c.hi], n - 1);
      const base = rand(rng, [c.lo, c.hi], n - 2);
      return [...base, base[rng.int(0, base.length - 1)]];
    },
    (v) => (withMode ? modes(v).length === 1 && v.filter((x) => x === modes(v)[0]).length === 2 : new Set(v).size === v.length),
    400,
  );
  return { rest, o };
}

function canGoUp(c: OutCtx) {
  return c.outHi[0] > c.hi;
}

function identifyOutlier(rng: Rng, name: string): GenOutput {
  const c = rng.pick(OUT_CTX);
  const up = c.outLo ? (canGoUp(c) ? rng.chance(0.6) : false) : true;
  const n = rng.int(6, 8);
  const { rest, o } = outlierSet(rng, c, n, up);
  const vs = rng.shuffle([...rest, o]);
  const s = asc(rest);
  if (rng.chance(0.5)) {
    const choices = [o, s[s.length - 1], s[0], s[Math.floor(s.length / 2)]].map((v) => `$${fmt(v)}$`);
    return {
      prompt: `${c.intro(name)} ${listTex(vs)}. Which value is an outlier?`,
      parts: [{ answer: mc(rng, choices[0], choices.slice(1)) }],
      hints: ['An outlier is a value much greater or much less than the rest of the data.', 'Put the values in order. Is there a big gap at either end?'],
      solution: [
        `In order: ${listTex(asc(vs))}`,
        `Most values are between $${fmt(s[0])}$ and $${fmt(s[s.length - 1])}$. ${up ? `$${fmt(o)}$ is far above them.` : `$${fmt(o)}$ is far below them.`}`,
        `The outlier is $${fmt(o)}$.`,
      ],
      answerDisplay: `$${fmt(o)}$`,
    };
  }
  return {
    prompt: `${c.intro(name)} ${listTex(vs)}. The value $${fmt(o)}$ is an outlier. How does including it change the mean?`,
    parts: [{ answer: fixedChoice(['It makes the mean greater.', 'It makes the mean less.', 'It does not change the mean.'], up ? 0 : 1) }],
    hints: ['The mean shares the total equally among all the values.', `Is $${fmt(o)}$ greater or less than the other values?`],
    solution: [
      `The other values are between $${fmt(s[0])}$ and $${fmt(s[s.length - 1])}$. The outlier $${fmt(o)}$ is much ${up ? 'greater' : 'less'}.`,
      `A very ${up ? 'large' : 'small'} value pulls the mean ${up ? 'up' : 'down'} toward it.`,
      `Including the outlier makes the mean ${up ? 'greater' : 'less'}.`,
    ],
    answerDisplay: up ? 'It makes the mean greater.' : 'It makes the mean less.',
  };
}

function recompute(rng: Rng, name: string): GenOutput {
  const c = rng.pick(OUT_CTX);
  const up = c.outLo ? (canGoUp(c) ? rng.chance(0.6) : false) : true;
  const measure = rng.pick(['mean', 'median'] as const);
  const n = measure === 'median' ? rng.pick([6, 7, 8]) : rng.int(6, 8);
  const { rest, o } = retry(
    () => outlierSet(rng, c, n, up),
    ({ rest, o }) => measure === 'median' || (!onEdge(sum(rest) / rest.length, 1) && !onEdge((sum(rest) + o) / n, 1)),
  );
  const vs = rng.shuffle([...rest, o]);
  if (measure === 'mean') {
    const m1 = sum(rest) / rest.length;
    const m2 = sum(vs) / n;
    const dp1 = isWhole(m1 * 10) ? undefined : 1;
    const dp2 = isWhole(m2 * 10) ? undefined : 1;
    return {
      prompt: `${c.intro(name)} ${listTex(vs)}. The value $${fmt(o)}$ is an outlier. Find the mean without the outlier and the mean with it. Round to the nearest tenth when needed.`,
      parts: [numPart(m1, { decimals: dp1, label: 'Mean without the outlier:', suffix: c.unit }), numPart(m2, { decimals: dp2, label: 'Mean with the outlier:', suffix: c.unit })],
      hints: [`Without the outlier there are $${n - 1}$ values. With it there are $${n}$.`, 'Add the values and divide by how many there are, both times.'],
      solution: [
        `Without the outlier: $${plus(rest)} = ${fmt(sum(rest))}$, and $${fmt(sum(rest))} \\div ${n - 1} ${eq(m1)}$`,
        `With the outlier: $${fmt(sum(rest))} + ${term(o)} = ${fmt(sum(vs))}$, and $${fmt(sum(vs))} \\div ${n} ${eq(m2)}$`,
        `The outlier pulls the mean ${up ? 'up' : 'down'} by about $${fmt(roundTo(Math.abs(m2 - m1), 1))}$.`,
        `Without: ${dp1 ? 'about ' : ''}${oval(c, roundTo(m1, 1))}. With: ${dp2 ? 'about ' : ''}${oval(c, roundTo(m2, 1))}.`,
      ],
      calculator: true,
    };
  }
  const md1 = median(rest);
  const md2 = median(vs);
  return {
    prompt: `${c.intro(name)} ${listTex(vs)}. The value $${fmt(o)}$ is an outlier. Find the median without the outlier and the median with it.`,
    parts: [numPart(md1, { label: 'Median without the outlier:', suffix: c.unit }), numPart(md2, { label: 'Median with the outlier:', suffix: c.unit })],
    hints: ['Put the values in order first.', `Without the outlier there are $${n - 1}$ values; with it there are $${n}$. With an even number of values, the median is halfway between the two middle values.`],
    solution: [
      `Without the outlier, in order: ${listTex(asc(rest))}. The median is $${fmt(md1)}$.`,
      `With the outlier, in order: ${listTex(asc(vs))}. The median is $${fmt(md2)}$.`,
      `The median moved only $${fmt(Math.abs(md2 - md1))}$. An outlier changes the median very little.`,
      `Without: ${oval(c, md1)}. With: ${oval(c, md2)}.`,
    ],
  };
}

function outlierEffect(rng: Rng, name: string): GenOutput {
  if (rng.chance(0.5)) {
    const c = rng.pick(OUT_CTX);
    const up = c.outLo ? (canGoUp(c) ? rng.chance(0.6) : false) : true;
    const n = rng.int(7, 8);
    const { rest, o } = retry(
      () => outlierSet(rng, c, n, up, true),
      ({ rest, o }) => {
        const all = [...rest, o];
        const dMean = Math.abs(sum(all) / n - sum(rest) / (n - 1));
        const dMed = Math.abs(median(all) - median(rest));
        return dMean > dMed + 1 && modes(all).length === 1 && !onEdge(sum(rest) / (n - 1), 1) && !onEdge(sum(all) / n, 1);
      },
    );
    const vs = rng.shuffle([...rest, o]);
    const m1 = sum(rest) / (n - 1);
    const m2 = sum(vs) / n;
    const md1 = median(rest);
    const md2 = median(vs);
    const mode = modes(rest)[0];
    const correct = md1 === md2 ? 'The mean changes the most. The median and the mode do not change.' : 'The mean changes the most. The median changes a little. The mode does not change.';
    return {
      prompt: `${c.intro(name)} ${listTex(vs)}. The value $${fmt(o)}$ is an outlier. Find the mean without and with the outlier (round to the nearest tenth when needed). Then choose the statement that describes the effect of the outlier.`,
      parts: [
        numPart(m1, { decimals: isWhole(m1 * 10) ? undefined : 1, label: 'Mean without:', suffix: c.unit }),
        numPart(m2, { decimals: isWhole(m2 * 10) ? undefined : 1, label: 'Mean with:', suffix: c.unit }),
        { label: 'Effect:', answer: mc(rng, correct, ['The median changes the most. The mean does not change.', 'The mode changes the most. The mean and median do not change.', 'All three measures change by about the same amount.']) },
      ],
      hints: ['Find the mean twice: without the outlier and with it.', 'Then find the median and the mode both ways too, and compare the changes.'],
      solution: [
        `Mean without: $${plus(rest)} = ${fmt(sum(rest))}$, and $${fmt(sum(rest))} \\div ${n - 1} ${eq(m1)}$.`,
        `Mean with: $${fmt(sum(rest))} + ${term(o)} = ${fmt(sum(vs))}$, and $${fmt(sum(vs))} \\div ${n} ${eq(m2)}$. The mean changes by about $${fmt(roundTo(Math.abs(m2 - m1), 1))}$.`,
        md1 === md2 ? `Median without: $${fmt(md1)}$. Median with: $${fmt(md2)}$. It does not change.` : `Median without: $${fmt(md1)}$. Median with: $${fmt(md2)}$. It changes by only $${fmt(Math.abs(md2 - md1))}$.`,
        `Mode: $${fmt(mode)}$ both times, because the outlier appears only once.`,
        `${correct}`,
      ],
      calculator: true,
      answerDisplay: correct,
    };
  }
  // A new value added to a set with a known mean.
  const who = name;
  const games = rng.int(5, 8);
  const ctx = rng.pick([
    { thing: 'bowling games', unit: 'points', lo: 110, hi: 160, out: [40, 70] as [number, number], verb: 'bowled' },
    { thing: 'basketball games', unit: 'points', lo: 12, hi: 22, out: [40, 50] as [number, number], verb: 'scored' },
    { thing: 'math tests', unit: 'marks', lo: 72, hi: 88, out: [20, 35] as [number, number], verb: 'scored' },
  ]);
  const { mean, o } = retry(
    () => ({ mean: rng.int(ctx.lo, ctx.hi), o: rng.int(ctx.out[0], ctx.out[1]) }),
    ({ mean, o }) => !onEdge((mean * games + o) / (games + 1), 1),
  );
  const total = mean * games + o;
  const nm = total / (games + 1);
  const dp = isWhole(nm * 10) ? undefined : 1;
  return {
    prompt: `${who}'s mean score for $${games}$ ${ctx.thing} is $${mean}$ ${ctx.unit}. In the next game, ${who} ${ctx.verb} only $${o}$ ${ctx.unit}, an outlier. What is the new mean for all $${games + 1}$ ${ctx.thing}?${dp ? ' Round to the nearest tenth.' : ''}`.replace('next game', ctx.thing === 'math tests' ? 'next test' : 'next game'),
    parts: [numPart(nm, { decimals: dp, suffix: ctx.unit })],
    hints: [`A mean of $${mean}$ over $${games}$ games means the scores add up to $${mean} \\times ${games}$.`, `Add the new score to that sum, then divide by $${games + 1}$.`],
    solution: [
      `Sum of the first $${games}$ scores: $${mean} \\times ${games} = ${mean * games}$`,
      `Add the new score: $${mean * games} + ${o} = ${total}$`,
      `New mean: $${total} \\div ${games + 1} ${eq(nm)}$`,
      `The outlier pulls the mean down from $${mean}$ to ${dp ? 'about ' : ''}$${dp ? fmtFixed(nm, 1) : fmt(nm)}$ ${ctx.unit}.`,
    ],
    calculator: true,
  };
}

const outliers = skill({
  id: 'm7-outliers',
  name: 'The effect of outliers',
  description: 'Identify an outlier and describe and calculate how it changes the mean, median and mode.',
  outcomes: ['SP2'],
  lessonId: 'm7-10-2',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) return identifyOutlier(rng, name);
    if (d === 2) return recompute(rng, name);
    return outlierEffect(rng, name);
  },
});

// ---------------------------------------------------------------------------
// 10.3 Circle graphs
// ---------------------------------------------------------------------------

interface GraphCtx {
  intro: (total: number) => string;
  cats: string[];
  /** "How many students chose hockey?" */
  ask: (cat: string) => string;
  noun: string;
  money?: boolean;
}

const lc = (s: string) => s.toLowerCase();

const GRAPHS: GraphCtx[] = [
  { intro: (t) => `In a survey, $${t}$ students at a school in ${CITIES[t % CITIES.length]} named their favourite sport.`, cats: ['Hockey', 'Soccer', 'Basketball', 'Volleyball', 'Swimming', 'Lacrosse'], ask: (c) => `chose ${lc(c)}`, noun: 'students' },
  { intro: (t) => `$${t}$ people at a community centre voted for their favourite season.`, cats: ['Winter', 'Spring', 'Summer', 'Fall'], ask: (c) => `voted for ${lc(c)}`, noun: 'people' },
  { intro: (t) => `$${t}$ Grade 7 students were asked how they usually get to school.`, cats: ['Bus', 'Walk', 'Car', 'Bike'], ask: (c) => ({ Bus: 'take the bus', Walk: 'walk', Car: 'come by car', Bike: 'ride a bike' })[c] ?? c, noun: 'students' },
  { intro: (t) => `$${t}$ customers at a pizza shop chose their favourite topping.`, cats: ['Pepperoni', 'Cheese', 'Hawaiian', 'Veggie', 'Mushroom'], ask: (c) => `chose ${c === 'Hawaiian' ? c : lc(c)}`, noun: 'customers' },
  { intro: (t) => `$${t}$ students named their favourite kind of pet.`, cats: ['Dog', 'Cat', 'Fish', 'Bird', 'Hamster'], ask: (c) => `chose a ${lc(c)}`, noun: 'students' },
  { intro: (t) => `$${t}$ students named their favourite subject.`, cats: ['Math', 'Science', 'Art', 'Phys Ed', 'Music'], ask: (c) => `chose ${c === 'Phys Ed' || c === 'Math' ? c : lc(c)}`, noun: 'students' },
  { intro: (t) => `The Grade 7 classes at a school raised \\$${t} at a fundraiser. The circle graph shows how the money was spent.`, cats: ['Field trip', 'Sports gear', 'Library books', 'Art supplies', 'Charity'], ask: (c) => `was spent on ${lc(c)}`, noun: 'dollars', money: true },
];

/** k percents that add to 100, each at least `min`, as multiples of `step`, all different. */
function percents(rng: Rng, k: number, step: number, min: number): number[] {
  return retry(
    () => {
      const cuts = rng.sample([...Array(100 / step - 1).keys()].map((i) => (i + 1) * step), k - 1).sort((a, b) => a - b);
      return [...cuts, 100].map((c, i) => c - (i ? cuts[i - 1] : 0));
    },
    (ps) => ps.every((p) => p >= min) && new Set(ps).size === ps.length && (step === 1 ? ps.some((p) => p % 5 !== 0) : true),
    500,
  );
}

const howMany = (g: GraphCtx, c: string) => (g.money ? `How much money ${g.ask(c)}?` : `How many ${g.noun} ${g.ask(c)}?`);
const countPart = (g: GraphCtx, v: number, label?: string): Part => (g.money ? numPart(v, { label: label ? `${label} \\$` : '\\$' }) : numPart(v, { suffix: g.noun, label }));
const countText = (g: GraphCtx, v: number) => (g.money ? `\\$${v}` : `$${v}$ ${g.noun}`);

function circleRead(rng: Rng, d: Difficulty): GenOutput {
  const g = rng.pick(GRAPHS);
  const k = d === 1 ? rng.int(3, 4) : Math.min(g.cats.length, rng.int(4, 5));
  const cats = rng.sample(g.cats, k);
  const READ_HINT = 'Each percent is a part of the whole. To find a percent of the total, write the percent as a decimal and multiply.';
  if (d === 3) {
    const ps = percents(rng, k, 5, 10);
    const total = rng.pick([40, 60, 80, 120, 160, 200, 240, 300, 400]);
    const figure: Figure = { type: 'circleGraph', slices: cats.map((c, i) => ({ label: c, value: ps[i] })), show: 'percent' };
    const [i, j] = rng.sample([...Array(k).keys()], 2);
    const ki = (ps[i] * total) / 100;
    const kj = (ps[j] * total) / 100;
    const intro = g.money ? g.intro(total).replace(`\\$${total}`, 'money') : g.intro(total).replace(/^\$\d+\$/, 'Some').replace(`$${total}$`, 'some');
    const qi = g.money ? `\\$${ki} ${g.ask(cats[i])}` : `$${ki}$ ${g.noun} ${g.ask(cats[i])}`;
    return {
      prompt: `${intro} ${cap(qi)}. ${g.money ? 'How much money was raised in all?' : `How many ${g.noun} were surveyed in all?`} ${howMany(g, cats[j])}`,
      figure,
      parts: [countPart(g, total, 'Total:'), countPart(g, kj, `${cats[j]}:`)],
      hints: [`$${ps[i]}\\%$ of the total is ${countText(g, ki)}. So $1\\%$ of the total is ${countText(g, ki)} $\\div ${ps[i]}$.`, `Find the total. Then find $${ps[j]}\\%$ of it.`],
      solution: [
        `${cats[i]} is $${ps[i]}\\%$ of the total, and $${ps[i]}\\%$ is $${ki}$.`,
        `$1\\%$ is $${ki} \\div ${ps[i]} = ${fmt(ki / ps[i])}$, so $100\\%$ is $${fmt(ki / ps[i])} \\times 100 = ${total}$.`,
        `${cats[j]}: $${ps[j]}\\% \\times ${total} = ${fmt(ps[j] / 100)} \\times ${total} = ${kj}$`,
        `The total is ${countText(g, total)}, and ${countText(g, kj)} ${g.ask(cats[j])}.`,
      ],
    };
  }
  const ps = d === 1 ? percents(rng, k, 5, 10) : percents(rng, k, 1, 6);
  const total = d === 1 ? rng.pick([20, 40, 60, 80, 100, 120, 200, 300, 400, 500]) : rng.pick([200, 300, 400, 500, 600, 800, 1000, 1200]);
  const figure: Figure = { type: 'circleGraph', slices: cats.map((c, i) => ({ label: c, value: ps[i] })), show: 'percent' };
  const intro = g.intro(total);
  const of = (p: number) => (p * total) / 100;
  const step = (c: string, p: number) => `${c}: $${p}\\% \\times ${total} = ${fmt(p / 100)} \\times ${total} = ${fmt(of(p))}$`;
  const mode = d === 1 ? 'one' : rng.pick(['one', 'more', 'not', 'both'] as const);
  if (mode === 'one') {
    const i = rng.int(0, k - 1);
    return {
      prompt: `${intro} ${howMany(g, cats[i])}`,
      figure,
      parts: [countPart(g, of(ps[i]))],
      hints: [`Find ${cats[i]} in the legend: $${ps[i]}\\%$.`, READ_HINT],
      solution: [`${cats[i]} is $${ps[i]}\\%$ of the circle.`, `$${ps[i]}\\% = ${fmt(ps[i] / 100)}$`, step(cats[i], ps[i]), `The answer is ${countText(g, of(ps[i]))}.`],
    };
  }
  if (mode === 'not') {
    const i = rng.int(0, k - 1);
    const q = g.money ? `How much money was **not** spent on ${lc(cats[i])}?` : `How many ${g.noun} did **not** ${g.ask(cats[i]).replace(/^chose/, 'choose').replace(/^voted/, 'vote')}?`;
    return {
      prompt: `${intro} ${q}`,
      figure,
      parts: [countPart(g, total - of(ps[i]))],
      hints: ['The whole circle is $100\\%$.', `Subtract to find the percent that is not ${cats[i]}, then find that percent of $${total}$.`],
      solution: [`Not ${cats[i]}: $100\\% - ${ps[i]}\\% = ${100 - ps[i]}\\%$`, `$${100 - ps[i]}\\% \\times ${total} = ${fmt((100 - ps[i]) / 100)} \\times ${total} = ${fmt(total - of(ps[i]))}$`, `The answer is ${countText(g, total - of(ps[i]))}.`],
    };
  }
  const [i, j] = retry(() => rng.sample([...Array(k).keys()], 2), ([a, b]) => mode !== 'more' || ps[a] > ps[b]);
  if (mode === 'more') {
    const diff = of(ps[i]) - of(ps[j]);
    const q = g.money ? `How much more money was spent on ${lc(cats[i])} than on ${lc(cats[j])}?` : `How many more ${g.noun} ${g.ask(cats[i])} than ${g.ask(cats[j])}?`;
    return {
      prompt: `${intro} ${q}`,
      figure,
      parts: [countPart(g, diff)],
      hints: [READ_HINT, `Find both amounts, then subtract. Or subtract the percents first: $${ps[i]}\\% - ${ps[j]}\\% = ${ps[i] - ps[j]}\\%$.`],
      solution: [step(cats[i], ps[i]), step(cats[j], ps[j]), `Subtract: $${fmt(of(ps[i]))} - ${fmt(of(ps[j]))} = ${fmt(diff)}$`, `The answer is ${countText(g, diff)}.`],
    };
  }
  const both = of(ps[i]) + of(ps[j]);
  const q = g.money ? `How much money was spent on ${lc(cats[i])} and ${lc(cats[j])} together?` : `How many ${g.noun} chose either ${cats[i]} or ${cats[j]}?`;
  return {
    prompt: `${intro} ${q}`,
    figure,
    parts: [countPart(g, both)],
    hints: ['Add the two percents first.', READ_HINT],
    solution: [`Add the percents: $${ps[i]}\\% + ${ps[j]}\\% = ${ps[i] + ps[j]}\\%$`, `$${ps[i] + ps[j]}\\% \\times ${total} = ${fmt((ps[i] + ps[j]) / 100)} \\times ${total} = ${fmt(both)}$`, `The answer is ${countText(g, both)}.`],
  };
}

const circleGraphRead = skill({
  id: 'm7-circle-graph-read',
  name: 'Reading circle graphs',
  description: 'Interpret a circle graph: find the number in a category as a percent of the total, compare categories, and work back from a part to the total.',
  outcomes: ['SP3'],
  lessonId: 'm7-10-3',
  calculator: true,
  gen(rng, d) {
    return circleRead(rng, d);
  },
});

const ANGLE_RULE = 'A full circle is $360^\\circ$. The central angle of a sector is its percent of $360^\\circ$.';

/** `verb` makes "chose skating" or "were grey". */
const MAKE_CTX: Array<{ intro: (who: string) => string; cats: string[]; noun: string; verb?: string }> = [
  { intro: (who) => `${who} asked students in Grade 7 to name their favourite winter activity.`, cats: ['Skating', 'Skiing', 'Tobogganing', 'Snowboarding', 'Hockey'], noun: 'students' },
  { intro: (who) => `${who} surveyed people at a farmers' market about their favourite fruit.`, cats: ['Apples', 'Strawberries', 'Saskatoons', 'Cherries', 'Raspberries'], noun: 'people' },
  { intro: (who) => `${who} recorded the colours of the cars in a school parking lot.`, cats: ['White', 'Black', 'Grey', 'Red', 'Blue'], noun: 'cars', verb: 'were' },
  { intro: (who) => `${who} asked campers at a provincial park how they spend most of their time.`, cats: ['Hiking', 'Swimming', 'Fishing', 'Canoeing', 'Biking'], noun: 'campers' },
  { intro: (who) => `${who} surveyed Grade 7 students about their favourite type of music.`, cats: ['Pop', 'Country', 'Hip hop', 'Rock', 'Classical'], noun: 'students' },
];

function circleMake(rng: Rng, d: Difficulty, who: string): GenOutput {
  const ctx = rng.pick(MAKE_CTX);
  const did = (c: string) => `${ctx.verb ?? 'chose'} ${lc(c)}`;
  if (d === 1) {
    const p = rng.int(2, 15) * 5;
    const cat = rng.pick(ctx.cats);
    const angle = (p / 100) * 360;
    return {
      prompt: `${ctx.intro(who)} ${cap(ctx.noun)} ${ctx.verb ? 'that' : 'who'} ${did(cat)} made up $${p}\\%$ of the results. ${who} is drawing a circle graph. What is the central angle of the sector for ${lc(cat)}?`,
      parts: [numPart(angle, { suffix: '°' })],
      hints: [ANGLE_RULE, `Multiply: $${p}\\% \\times 360^\\circ$. Write $${p}\\%$ as the decimal $${fmt(p / 100)}$ first.`],
      solution: [ANGLE_RULE, `$${p}\\% = ${fmt(p / 100)}$`, `$${fmt(p / 100)} \\times 360^\\circ = ${fmt(angle)}^\\circ$`, `The central angle is $${fmt(angle)}^\\circ$.`],
    };
  }
  if (d === 2) {
    const total = rng.pick([20, 25, 50, 100]);
    const k = rng.int(4, 5);
    const cats = rng.sample(ctx.cats, k);
    const counts = retry(
      () => {
        const ps = percents(rng, k, 100 / total, 8);
        return ps.map((p) => (p * total) / 100);
      },
      (cs) => cs.every((c) => Number.isInteger(c) && c > 0),
      300,
    );
    const i = rng.int(0, k - 1);
    const p = (counts[i] / total) * 100;
    const angle = (counts[i] / total) * 360;
    return {
      prompt: `${ctx.intro(who)} The table shows the results. ${who} is making a circle graph. What percent of the ${ctx.noun} ${did(cats[i])}, and what is the central angle of that sector? Round the angle to the nearest degree.`,
      figure: { type: 'table', headers: ['Choice', `Number of ${ctx.noun}`], rows: [...cats.map((c, j) => [c, String(counts[j])]), ['Total', String(total)]] },
      parts: [numPart(p, { label: 'Percent:', suffix: '%' }), numPart(angle, { decimals: 0, label: 'Central angle:', suffix: '°' })],
      hints: [`Percent = $\\dfrac{\\text{number in the category}}{\\text{total}} \\times 100\\%$`, ANGLE_RULE],
      solution: [
        `Percent: $\\dfrac{${counts[i]}}{${total}} = ${fmt(counts[i] / total)} = ${fmt(p)}\\%$`,
        `Central angle: $${fmt(p / 100)} \\times 360^\\circ = ${fmt(angle)}^\\circ$`,
        `${cats[i]}: $${fmt(p)}\\%$ of the ${ctx.noun}, and a central angle of ${isWhole(angle) ? '' : 'about '}$${fmt(Math.round(angle))}^\\circ$.`,
      ],
    };
  }
  if (rng.chance(0.5)) {
    // Angle back to percent and count.
    const p = rng.int(2, 14) * 5;
    const angle = (p / 100) * 360;
    const total = rng.pick([60, 80, 120, 140, 160, 180, 200, 240, 260, 300, 360]);
    const count = (p * total) / 100;
    const cat = rng.pick(ctx.cats);
    return {
      prompt: `${ctx.intro(who)} In ${who}'s circle graph, the sector for ${lc(cat)} has a central angle of $${fmt(angle)}^\\circ$. In all, $${total}$ ${ctx.noun} were counted. What percent of the ${ctx.noun} ${did(cat)}? How many ${ctx.noun} is that?`,
      parts: [numPart(p, { label: 'Percent:', suffix: '%' }), numPart(count, { label: 'Number:', suffix: ctx.noun })],
      hints: [`The sector is $\\dfrac{${fmt(angle)}}{360}$ of the circle.`, 'Write that fraction as a percent. Then find that percent of the total.'],
      solution: [
        `Fraction of the circle: $\\dfrac{${fmt(angle)}}{360} = ${fmt(p / 100)}$`,
        `As a percent: $${fmt(p / 100)} = ${p}\\%$`,
        `Number: $${fmt(p / 100)} \\times ${total} = ${fmt(count)}$`,
        `$${p}\\%$ of the ${ctx.noun} ${did(cat)}, which is $${fmt(count)}$ ${ctx.noun}.`,
      ],
    };
  }
  // Awkward total: percent to the nearest tenth and angle to the nearest degree.
  const total = rng.pick([24, 30, 32, 36, 45, 48, 60, 64, 72, 75, 80, 90, 96, 120]);
  const k = rng.int(4, 5);
  const cats = rng.sample(ctx.cats, k);
  const { counts, i } = retry(
    () => {
      const cuts = rng.sample([...Array(total - 1).keys()].map((x) => x + 1), k - 1).sort((a, b) => a - b);
      const counts = [...cuts, total].map((c, j) => c - (j ? cuts[j - 1] : 0));
      return { counts, i: rng.int(0, k - 1) };
    },
    ({ counts, i }) => {
      const p = (counts[i] / total) * 100;
      const a = (counts[i] / total) * 360;
      return counts.every((c) => c >= 2) && !isWhole(p * 10) && !onEdge(p, 1) && !onEdge(a, 0);
    },
    500,
  );
  const p = (counts[i] / total) * 100;
  const angle = (counts[i] / total) * 360;
  return {
    prompt: `${ctx.intro(who)} The table shows the results. What percent of the ${ctx.noun} ${did(cats[i])}, and what central angle should its sector have in a circle graph? Round the percent to the nearest tenth and the angle to the nearest degree.`,
    figure: { type: 'table', headers: ['Choice', `Number of ${ctx.noun}`], rows: cats.map((c, j) => [c, String(counts[j])]) },
    parts: [numPart(p, { decimals: 1, label: 'Percent:', suffix: '%' }), numPart(angle, { decimals: 0, label: 'Central angle:', suffix: '°' })],
    hints: ['First add the table to find the total.', `Percent = number ÷ total × $100\\%$. Central angle = number ÷ total × $360^\\circ$. Use the unrounded value for the angle.`],
    solution: [
      `Total: $${counts.join(' + ')} = ${total}$`,
      `Percent: $${counts[i]} \\div ${total} \\times 100\\% \\approx ${fmt(p, 3)}\\%$, which rounds to $${fmtFixed(p, 1)}\\%$.`,
      isWhole(angle) ? `Central angle: $${counts[i]} \\div ${total} \\times 360^\\circ = ${fmt(angle)}^\\circ$` : `Central angle: $${counts[i]} \\div ${total} \\times 360^\\circ ${eq(angle)}^\\circ$, which rounds to $${Math.round(angle)}^\\circ$.`,
      `About $${fmtFixed(p, 1)}\\%$, with a central angle of about $${Math.round(angle)}^\\circ$.`,
    ],
  };
}

const circleGraphMake = skill({
  id: 'm7-circle-graph-make',
  name: 'Constructing circle graphs',
  description: 'Find the percent of the total for each category and the central angle of its sector (percent × 360°) to construct a circle graph.',
  outcomes: ['SP3'],
  lessonId: 'm7-10-3',
  calculator: true,
  gen(rng, d) {
    return circleMake(rng, d, rng.pick(NAMES));
  },
});

export const DATA_SKILLS: SkillDef[] = [centralTendency, bestMeasure, outliers, circleGraphRead, circleGraphMake];
