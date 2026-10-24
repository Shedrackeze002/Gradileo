/** Math 30-3 Unit 6 — Statistics (S1, S2). Every method and formula is stated in the question. */
import { fixedChoice, mc, numPart, part, retry, roundingPhrase, skill } from '../../helpers.ts';
import { fmt, fmtFixed, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers (also used by probability.ts and finance.ts)
// ---------------------------------------------------------------------------

export type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure };
export type Lvl = 1 | 2 | 3;

export const NAMES = [
  'Amara', 'Liam', 'Priya', 'Mateo', 'Aiyana', 'Noah', 'Mei', 'Jaxon', 'Fatima', 'Ethan', 'Nia', 'Arjun',
  'Chloé', 'Kai', 'Zainab', 'Owen', 'Sofia', 'Tariq', 'Leila', 'Dylan', 'Harpreet', 'Kiona', 'Rajesh', 'Hana',
  'Jamal', 'Émilie', 'Wyatt', 'Ayesha', 'Lucas', 'Talia', 'Simran', 'Cole', 'Ngozi', 'Marcus', 'Rosa', 'Ji-woo',
  'Kwame', 'Tanvir', 'Maya', 'Bao', 'Dakota', 'Thanh', 'Gurpreet', 'Isabelle', 'Raven', 'Diego',
];

export const poss = (n: string) => `${n}’s`;
export const isWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
export const isCents = (x: number) => Math.abs(x * 100 - Math.round(x * 100)) < 1e-6;
export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Thousands separators on a plain number string. */
export function group(s: string, sep = ','): string {
  const neg = s.startsWith('-');
  const body = neg ? s.slice(1) : s;
  const [i, f] = body.split('.');
  const g = i.length > 3 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, sep) : i;
  return `${neg ? '-' : ''}${g}${f !== undefined ? `.${f}` : ''}`;
}
/** Money in prose, always with cents: \$1,234.50. Never inside $...$. */
export const money = (x: number) => `${x < 0 ? '−' : ''}\\$${group(fmtFixed(Math.abs(x), 2))}`;
/** A price in prose: whole dollars print without cents (\$950). */
export const tag = (x: number) => (isWhole(x) ? `\\$${group(String(Math.round(x)))}` : money(x));
/** Money inside maths, no dollar sign: 1{,}250 or 12.50. */
export const mv = (x: number) => (isWhole(x) ? group(String(Math.round(x)), '{,}') : group(fmtFixed(x, 2), '{,}'));
/** Money inside maths with exactly two decimals. */
export const m2 = (x: number) => group(fmtFixed(x, 2), '{,}');
/** Plain-text money for table cells. */
export const cell = (x: number) => `${x < 0 ? '-' : ''}$${group(fmtFixed(Math.abs(x), 2))}`;
/** A number inside maths with thousands separators. */
export const num = (x: number, dp = 4) => group(fmt(x, dp), '{,}');
/** A number in prose with thousands separators. */
export const numT = (x: number, dp = 4) => group(fmt(x, dp));
export const pc = (r: number) => `${fmt(r)}%`;
export const pcm = (r: number) => `${fmt(r)}\\%`;
export const dec = (r: number) => fmt(r / 100, 6);
/** "= 12.35" when exact to the cent, otherwise "\approx 12.35". */
export function toCents(x: number): string {
  if (isCents(x)) return `= ${m2(x)}`;
  if (Math.abs(roundTo(x, 4) - x) < 1e-9) return `= ${num(x, 4)} \\approx ${m2(x)}`;
  const dp = Math.floor(Math.abs(x) * 1000) % 10 === 5 ? 4 : 3;
  const t = Math.floor(Math.abs(x) * 10 ** dp) / 10 ** dp;
  return `= ${x < 0 ? '-' : ''}${group(t.toFixed(dp), '{,}')}\\ldots \\approx ${m2(x)}`;
}
/** "= 12.4" when exact at `dp` places, otherwise "\approx 12.4". */
export function eqR(x: number, dp: number): string {
  return Math.abs(roundTo(x, dp) - x) < 1e-9 ? `= ${num(x)}` : `\\approx ${group(fmtFixed(x, dp), '{,}')}`;
}
/** "about " before a value that had to be rounded to `dp` places. */
export const about = (x: number, dp: number) => (Math.abs(roundTo(x, dp) - x) < 1e-9 ? '' : 'about ');
/** "about " before a money amount that had to be rounded. */
export const abt = (x: number) => (isCents(x) ? '' : 'about ');
/** True when v sits close to a rounding boundary (x.xx5) at `dp` places. */
export function onEdge(v: number, dp = 2): boolean {
  const s = Math.abs(v) * 10 ** dp;
  return Math.abs(s - Math.floor(s) - 0.5) < 0.06;
}
/** Exact sum of money amounts (in cents, then back to dollars). */
export const total = (xs: number[]) => xs.reduce((s, x) => s + Math.round(x * 100), 0) / 100;
export const sub = (a: number, b: number) => (Math.round(a * 100) - Math.round(b * 100)) / 100;
export const list = (xs: string[]) => (xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
/** A money answer graded to the cent. */
export const moneyPart = (v: number, label = '\\$'): Part => numPart(v, { decimals: 2, tolerance: 0.011, label });
export const CENT = 'Answer to the nearest cent.';
/** 1st, 2nd, 3rd, 4th, 11th, 21st ... */
export function ordinal(n: number): string {
  const t = n % 100;
  if (t >= 11 && t <= 13) return `${n}th`;
  return `${n}${['th', 'st', 'nd', 'rd'][n % 10] ?? 'th'}`;
}

const sum = (xs: number[]) => xs.reduce((s, x) => s + x, 0);
const sorted = (xs: number[]) => [...xs].sort((a, b) => a - b);
function median(xs: number[]): number {
  const s = sorted(xs);
  const n = s.length;
  return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
}
/** The single most common value, or null when there is a tie for most common. */
function mode(xs: number[]): number | null {
  const counts = new Map<number, number>();
  for (const x of xs) counts.set(x, (counts.get(x) ?? 0) + 1);
  const top = Math.max(...counts.values());
  const best = [...counts].filter(([, c]) => c === top);
  return top > 1 && best.length === 1 ? best[0][0] : null;
}
const range = (lo: number, hi: number, step = 1) => {
  const out: number[] = [];
  for (let v = lo; v <= hi + 1e-9; v += step) out.push(roundTo(v, 2));
  return out;
};

// ---------------------------------------------------------------------------
// Data contexts
// ---------------------------------------------------------------------------

interface DataCtx {
  intro: (name: string, n: number) => string;
  /** Unit after the answer box and in sentences ('' for money). */
  unit: string;
  lo: number;
  hi: number;
  step: number;
  money?: boolean;
  /** Range for one outlier, and why it happened. */
  out: [number, number];
  why: string;
  /** "a typical day" */
  typical: string;
}

const CTX: DataCtx[] = [
  {
    intro: (name, n) => `${name}, the dispatcher at a furnace repair shop, recorded the number of service calls each day for ${n} days:`,
    unit: 'calls', lo: 5, hi: 16, step: 1, out: [31, 38], why: 'the day of a cold snap', typical: 'the number of calls on a typical day',
  },
  {
    intro: (name, n) => `${name} timed how long, in minutes, ${n} customers waited for a tire change at a shop in town:`,
    unit: 'min', lo: 18, hi: 45, step: 1, out: [95, 130], why: 'a customer whose tire had to be ordered in', typical: 'a typical wait',
  },
  {
    intro: (name, n) => `${name}, an apprentice electrician, logged the hours worked each week for ${n} weeks:`,
    unit: 'h', lo: 32, hi: 46, step: 1, out: [8, 14], why: 'a week off sick with the flu', typical: 'a typical work week',
  },
  {
    intro: (name, n) => `${name} weighed ${n} calves at weaning on a cattle ranch. Their masses, in kilograms, were:`,
    unit: 'kg', lo: 235, hi: 295, step: 1, out: [150, 172], why: 'a calf born late in the season', typical: 'the mass of a typical calf',
  },
  {
    intro: (name, n) => `${name} recorded the canola yield, in bushels per acre, on ${n} fields on the family farm:`,
    unit: 'bu/acre', lo: 38, hi: 56, step: 1, out: [8, 15], why: 'a field hit by hail', typical: 'a typical yield',
  },
  {
    intro: (name, n) => `${name} drives a gravel truck in the north and counted the loads hauled each day for ${n} days:`,
    unit: 'loads', lo: 6, hi: 14, step: 1, out: [1, 2], why: 'a day the truck broke down', typical: 'a typical day',
  },
  {
    intro: (name, n) => `${name} asked ${n} workers at a chemical plant outside the city how far, in kilometres, they drive to work one way:`,
    unit: 'km', lo: 6, hi: 35, step: 1, out: [110, 140], why: 'a worker who lives on an acreage far out of town', typical: 'a typical drive',
  },
  {
    intro: (name, n) => `${name} owns a landscaping company. The ${n} people on the payroll earn these hourly wages:`,
    unit: '', lo: 17, hi: 26, step: 0.5, money: true, out: [55, 68], why: 'the wage of the company’s manager', typical: 'a typical wage',
  },
];

const vText = (c: DataCtx, v: number) => (c.money ? money(v) : numT(v));
const vMath = (c: DataCtx, v: number) => (c.money ? m2(v) : num(v));
const vUnit = (c: DataCtx, v: number, dp?: number) => (c.money ? money(v) : `${dp === undefined ? numT(v) : group(fmtFixed(v, dp))} ${c.unit}`);
const dataText = (c: DataCtx, vs: number[]) => vs.map((v) => vText(c, v)).join(', ');
const unitPart = (c: DataCtx, v: number, label: string, dp?: number): Part =>
  c.money ? moneyPart(v, `${label} \\$`) : numPart(v, { decimals: dp, suffix: c.unit, label });
const sumLine = (c: DataCtx, vs: number[]) => `$${vs.map((v) => vMath(c, v)).join(' + ')} = ${vMath(c, sum(vs))}$`;

function meanSteps(c: DataCtx, vs: number[], dp?: number): string[] {
  const S = sum(vs);
  const m = S / vs.length;
  const tail = c.money ? toCents(m) : dp === undefined ? `= ${num(m)}` : eqR(m, dp);
  return [`Add the values: ${sumLine(c, vs)}`, `Divide by the number of values: $${vMath(c, S)} \\div ${vs.length} ${tail}$`];
}
function medianSteps(c: DataCtx, vs: number[]): string[] {
  const s = sorted(vs);
  const n = s.length;
  const order = `Put the values in order: ${dataText(c, s)}`;
  if (n % 2) return [order, `There are ${n} values, so the median is the ${ordinal((n + 1) / 2)} value: ${vText(c, s[(n - 1) / 2])}`];
  const a = s[n / 2 - 1];
  const b = s[n / 2];
  return [order, `There are ${n} values, so the median is halfway between the ${ordinal(n / 2)} and ${ordinal(n / 2 + 1)} values: $(${vMath(c, a)} + ${vMath(c, b)}) \\div 2 = ${vMath(c, (a + b) / 2)}$`];
}
function modeStep(c: DataCtx, vs: number[]): string {
  const m = mode(vs)!;
  const k = vs.filter((v) => v === m).length;
  return `${vText(c, m)} appears ${k === 2 ? 'twice' : `${k} times`}, more often than any other value, so the mode is ${vUnit(c, m)}.`;
}

/** n distinct values from the context range, then one of them repeated (a single mode). */
function withMode(rng: Rng, c: DataCtx, n: number, repeats = 2): number[] {
  const base = rng.sample(range(c.lo, c.hi, c.step), n - repeats + 1);
  const m = base[0];
  return rng.shuffle([...base, ...Array(repeats - 1).fill(m)]);
}

// ---------------------------------------------------------------------------
// 6.1 Mean, median and mode — m303-central-tendency
// ---------------------------------------------------------------------------

function cent1(rng: Rng): Out {
  const c = rng.pick(CTX);
  const name = rng.pick(NAMES);
  const kind = rng.pick(['mean', 'median', 'mode'] as const);
  const pool = range(c.lo, c.hi, c.step);
  if (kind === 'mean') {
    const n = rng.int(5, 6);
    const vs = retry(
      () => Array.from({ length: n }, () => rng.pick(pool)),
      (x) => (c.money ? isCents(sum(x) / n) : isWhole(sum(x) / n)) && new Set(x).size > 2,
      200,
    );
    const m = sum(vs) / n;
    return {
      prompt: `${c.intro(name, n)} ${dataText(c, vs)}. What is the mean?${c.money ? ` ${CENT}` : ''}`,
      parts: [unitPart(c, m, 'Mean:')],
      hints: ['The mean is the total of the values divided by the number of values.', `Add the ${n} values, then divide the total by ${n}.`],
      solution: [...meanSteps(c, vs), `The mean is ${vUnit(c, m)}.`],
    };
  }
  if (kind === 'median') {
    const n = rng.pick([5, 7]);
    const vs = retry(
      () => rng.sample(pool, n),
      (x) => x[(n - 1) / 2] !== median(x) && x[0] !== sorted(x)[0],
    );
    const md = median(vs);
    return {
      prompt: `${c.intro(name, n)} ${dataText(c, vs)}. What is the median?${c.money ? ` ${CENT}` : ''}`,
      parts: [unitPart(c, md, 'Median:')],
      hints: ['The median is the middle value once the data is in order.', `Put the ${n} values in order from least to greatest, then take the ${ordinal((n + 1) / 2)} one.`],
      solution: [...medianSteps(c, vs), `The median is ${vUnit(c, md)}.`],
    };
  }
  const n = rng.int(6, 7);
  const vs = withMode(rng, c, n);
  const mo = mode(vs)!;
  return {
    prompt: `${c.intro(name, n)} ${dataText(c, vs)}. What is the mode?${c.money ? ` ${CENT}` : ''}`,
    parts: [unitPart(c, mo, 'Mode:')],
    hints: ['The mode is the value that appears most often.', 'Look for a value that shows up more than once.'],
    solution: [modeStep(c, vs), `The mode is ${vUnit(c, mo)}.`],
  };
}

function cent2(rng: Rng): Out {
  const c = rng.pick(CTX);
  const name = rng.pick(NAMES);
  const n = rng.pick([8, 10]);
  const dp = c.money ? 2 : 1;
  const vs = retry(() => withMode(rng, c, n), (x) => !onEdge(sum(x) / n, dp) && mode(x) !== median(x), 200);
  const m = sum(vs) / n;
  const md = median(vs);
  const mo = mode(vs)!;
  return {
    prompt: `${c.intro(name, n)} ${dataText(c, vs)}. Find the mean, median and mode. ${c.money ? CENT : 'Round the mean to the nearest tenth.'}`,
    parts: [unitPart(c, m, 'Mean:', dp), unitPart(c, md, 'Median:'), unitPart(c, mo, 'Mode:')],
    hints: [
      'Mean: add and divide by the number of values. Median: the middle value in order. Mode: the most common value.',
      `There are ${n} values, an even number, so the median is halfway between the ${ordinal(n / 2)} and ${ordinal(n / 2 + 1)} values in order.`,
    ],
    solution: [
      ...meanSteps(c, vs, dp),
      ...medianSteps(c, vs),
      modeStep(c, vs),
      `The mean is ${c.money ? `${abt(m)}${money(m)}` : `${about(m, 1)}${vUnit(c, m, 1)}`}, the median is ${vUnit(c, md)} and the mode is ${vUnit(c, mo)}.`,
    ],
  };
}

interface Choose {
  measure: 'mean' | 'median' | 'mode';
  intro: (name: string, n: number) => string;
  goal: (name: string) => string;
  values: (rng: Rng) => number[];
  unit: string;
  money?: boolean;
}

const CHOOSE: Choose[] = [
  {
    measure: 'mode',
    intro: (name, n) => `${name} manages a work-wear store in a mining town. These are the sizes of the last ${n} pairs of steel-toed boots sold:`,
    goal: () => 'the manager wants to know which size of boot to order the most of',
    values: (rng) => {
      const sizes = range(7, 13, 0.5);
      const top = rng.pick(range(9, 11, 0.5));
      const rest = rng.sample(sizes.filter((s) => s !== top), 9);
      return rng.shuffle([top, top, top, top, ...rest.slice(0, 3), ...rest.slice(0, 3), ...rest.slice(3, 9)]);
    },
    unit: '',
  },
  {
    measure: 'mode',
    intro: (name, n) => `${name} runs a tire shop in a farming town. These are the rim sizes, in inches, of the last ${n} sets of winter tires sold:`,
    goal: () => 'the shop wants to know which size of winter tire to keep the most of in stock',
    values: (rng) => {
      const sizes = [15, 16, 17, 18, 20];
      const top = rng.pick([16, 17, 18]);
      const counts = sizes.map((s) => (s === top ? rng.int(6, 7) : rng.int(1, 4)));
      return rng.shuffle(sizes.flatMap((s, i) => Array(counts[i]).fill(s)));
    },
    unit: 'in',
  },
  {
    measure: 'median',
    intro: (name, n) => `${name} is a real-estate agent in a small town. These are the selling prices of the last ${n} homes sold in town:`,
    goal: (name) => `${name} wants to tell a young couple the price of a typical home in town`,
    values: (rng) => {
      const n = rng.pick([7, 9]);
      const base = rng.sample(range(210, 330, 5), n - 1).map((k) => k * 1000);
      return rng.shuffle([...base, rng.int(78, 95) * 10000]);
    },
    unit: '',
    money: true,
  },
  {
    measure: 'median',
    intro: (name, n) => `${name} owns a landscaping company. The ${n} people on the payroll, including the manager, earn these hourly wages:`,
    goal: () => 'a job ad will state the wage that a typical worker at the company earns',
    values: (rng) => {
      const n = rng.pick([7, 9]);
      return rng.shuffle([...rng.sample(range(17, 26, 0.5), n - 1), rng.int(55, 68)]);
    },
    unit: '',
    money: true,
  },
  {
    measure: 'mean',
    intro: (name, n) => `${name} grows wheat and recorded the litres of diesel the tractor used each day for ${n} days of seeding:`,
    goal: (name) => `${name} wants to estimate how much diesel to order for the rest of seeding`,
    values: (rng) => Array.from({ length: 8 }, () => rng.int(140, 190)),
    unit: 'L',
  },
  {
    measure: 'mean',
    intro: (name, n) => `${name} is a foreman on a city sidewalk crew and recorded the bags of concrete mix the crew used each day for ${n} days:`,
    goal: (name) => `${name} wants to estimate the total number of bags needed for a 15-day job`,
    values: (rng) => Array.from({ length: 8 }, () => rng.int(42, 64)),
    unit: 'bags',
  },
];

function chooseMeasure(rng: Rng): Out {
  const ch = rng.pick(CHOOSE);
  const name = rng.pick(NAMES);
  const vs = retry(
    () => ch.values(rng),
    (x) => (ch.measure !== 'mode' || mode(x) !== null) && (ch.measure !== 'mean' || !onEdge(sum(x) / x.length, 1)),
    200,
  );
  const n = vs.length;
  const show = (v: number) => (ch.money ? (isWhole(v) && v >= 1000 ? tag(v) : money(v)) : numT(v));
  const showU = (v: number) => (ch.money ? show(v) : `${numT(v)}${ch.unit ? ` ${ch.unit}` : ''}`);
  const mx = (v: number) => (ch.money ? mv(v) : num(v));
  const s = sorted(vs);
  const out = s[n - 1];
  const reasons = {
    mode: 'The mode, because the most common value is the size that sells most often.',
    median: `The median, because the outlier (${show(out)}) pulls the mean up, but it hardly changes the median.`,
    mean: 'The mean, because there are no outliers, and the mean times the number of days estimates a total.',
  };
  const distract = {
    mode: ['The mean, because it uses every value in the data.', 'The median, because it is the middle value.', 'The mean, because the sizes are numbers that can be averaged.'],
    median: ['The mean, because it uses every value in the data.', 'The mode, because it is the most common value.', `The mean, because the outlier (${show(out)}) makes the median too high.`],
    mean: ['The median, because the data has an outlier.', 'The mode, because it is the value that happens most often.', 'The median, because it is always the middle value.'],
  }[ch.measure];
  let value: number;
  let valuePart: Part;
  let steps: string[];
  let close: string;
  if (ch.measure === 'mode') {
    value = mode(vs)!;
    const k = vs.filter((v) => v === value).length;
    valuePart = numPart(value, { label: 'Value:', suffix: ch.unit || undefined, display: 'decimal' });
    steps = [`Count each value: ${showU(value)} appears ${k} times, more than any other value.`];
    close = `Use the mode: ${showU(value)}.`;
  } else if (ch.measure === 'median') {
    value = median(vs);
    valuePart = moneyPart(value, 'Value: \\$');
    steps = [`In order: ${s.map(show).join(', ')}`, `There are ${n} values, so the median is the ${ordinal((n + 1) / 2)} value: ${show(value)}`, `The mean, ${abt(sum(vs) / n)}${money(sum(vs) / n)}, is pulled up by ${show(out)} and is higher than most of the values.`];
    close = `Use the median: ${show(value)}.`;
  } else {
    value = sum(vs) / n;
    valuePart = numPart(value, { decimals: 1, label: 'Value:', suffix: ch.unit });
    steps = [`The values are close together, with no outliers.`, `Mean: $${vs.map(mx).join(' + ')} = ${num(sum(vs))}$, and $${num(sum(vs))} \\div ${n} ${eqR(value, 1)}$`];
    close = `Use the mean: ${about(value, 1)}${fmtFixed(value, 1)} ${ch.unit} a day.`;
  }
  return {
    prompt: `${ch.intro(name, n)} ${vs.map(show).join(', ')}. ${cap(ch.goal(name))}. Which measure of central tendency is the best one to use, and what is its value?${ch.measure === 'mean' ? ' Round the value to the nearest tenth.' : ''}${ch.measure === 'median' ? ` ${CENT}` : ''}`,
    parts: [part(mc(rng, reasons[ch.measure], distract), { label: 'Best measure:' }), valuePart],
    hints: [
      'The mean is pulled toward an outlier. The median is not. The mode is the most common value.',
      ch.measure === 'mode' ? 'The store needs the size that sells most often.' : ch.measure === 'median' ? 'Look for a value far from the rest.' : 'To estimate a total, multiply an average by the number of days.',
    ],
    solution: [...steps, close],
  };
}

function outlierItem(rng: Rng): Out {
  const c = rng.pick(CTX);
  const name = rng.pick(NAMES);
  const n = rng.pick([7, 8]);
  const dp = c.money ? 2 : 1;
  const pool = range(c.lo, c.hi, c.step);
  const vs = retry(
    () => {
      const base = rng.sample(pool, n - 1);
      const o = c.money ? rng.int(c.out[0], c.out[1]) : rng.int(c.out[0], c.out[1]);
      const all = [...base, o];
      const at = rng.int(1, n - 2);
      [all[at], all[n - 1]] = [all[n - 1], all[at]];
      return all;
    },
    (x) => !onEdge(sum(x) / n, dp) && Math.abs(sum(x) / n - median(x)) >= (c.hi - c.lo) / 6,
    200,
  );
  const m = sum(vs) / n;
  const md = median(vs);
  const high = c.out[0] > c.hi;
  const o = high ? Math.max(...vs) : Math.min(...vs);
  const dir = high ? 'up' : 'down';
  const correct = `The median, because the outlier (${vUnit(c, o)}) pulls the mean ${dir}, but it hardly changes the median.`;
  const distract = [
    'The mean, because it uses every value in the data.',
    `The mean, because the outlier pulls the median ${dir}.`,
    'The mode, because it is the most common value.',
  ];
  return {
    prompt: `${c.intro(name, n)} ${dataText(c, vs)}. One value comes from ${c.why}. Find the mean and the median. ${c.money ? CENT : 'Round the mean to the nearest tenth.'} Which measure best describes ${c.typical}?`,
    parts: [unitPart(c, m, 'Mean:', dp), unitPart(c, md, 'Median:'), part(mc(rng, correct, distract), { label: 'Best measure:' })],
    hints: [
      'Find the mean (add, then divide) and the median (the middle value in order).',
      'An outlier is a value far from the rest. Which measure moves a lot because of it?',
    ],
    solution: [
      ...meanSteps(c, vs, dp),
      ...medianSteps(c, vs),
      `The outlier ${vUnit(c, o)} pulls the mean ${dir} to ${c.money ? `${abt(m)}${money(m)}` : `${about(m, 1)}${vUnit(c, m, 1)}`}, which is ${high ? 'higher' : 'lower'} than most of the data. The median, ${vUnit(c, md)}, sits among the typical values.`,
      `The mean is ${c.money ? `${abt(m)}${money(m)}` : `${about(m, 1)}${vUnit(c, m, 1)}`} and the median is ${vUnit(c, md)}. The median best describes ${c.typical}.`,
    ],
  };
}

interface Target {
  setup: (name: string, n: number, T: number) => string;
  have: string;
  ask: string;
  unit: string;
  lo: number;
  hi: number;
  max: number;
  T: number[];
  label: string;
}

const TARGETS: Target[] = [
  {
    setup: (name, n, T) => `${name} is an apprentice heavy equipment technician. Suppose that to pass the training period, ${name} needs a mean of at least ${T}% on ${n} module exams.`,
    have: 'The first marks are', ask: 'What is the lowest mark the last exam can have?', unit: '%', lo: 58, hi: 94, max: 100, T: [65, 70, 75, 80], label: 'Last exam:',
  },
  {
    setup: (name, n, T) => `${name} sells farm equipment at a dealership. The goal is a mean of at least ${T} sales a month over ${n} months.`,
    have: 'The sales in the first months were', ask: 'How many sales are needed in the last month?', unit: 'sales', lo: 9, hi: 22, max: 40, T: [14, 15, 16, 18], label: 'Last month:',
  },
  {
    setup: (name, n, T) => `${name} farms ${n} barley fields of the same size and wants a mean yield of ${T} bushels per acre over all ${n} fields.`,
    have: 'The yields from the fields harvested so far are', ask: 'What yield does the last field need?', unit: 'bu/acre', lo: 62, hi: 88, max: 120, T: [72, 75, 78, 80], label: 'Last field:',
  },
  {
    setup: (name, n, T) => `${name} drives for a gravel company that expects a mean of at least ${T} loads a day over a ${n}-day work week.`,
    have: 'The loads hauled on the first days were', ask: 'How many loads are needed on the last day?', unit: 'loads', lo: 7, hi: 14, max: 20, T: [10, 11, 12], label: 'Last day:',
  },
];

function missingValue(rng: Rng): Out {
  const t = rng.pick(TARGETS);
  const name = rng.pick(NAMES);
  const o = retry(
    () => {
      const n = rng.int(4, 6);
      const T = rng.pick(t.T);
      const vs = Array.from({ length: n - 1 }, () => rng.int(t.lo, t.hi));
      const need = T * n - sum(vs);
      return { n, T, vs, need };
    },
    (x) => x.need > x.T && x.need <= t.max && x.need !== Math.max(...x.vs),
    300,
  );
  const { n, T, vs, need } = o;
  const S = sum(vs);
  return {
    prompt: `${t.setup(name, n, T)} ${t.have} ${vs.map((v) => (t.unit === '%' ? `${v}%` : String(v))).join(', ')}. ${t.ask}`,
    parts: [numPart(need, { label: t.label, suffix: t.unit })],
    hints: [`For a mean of ${T} over ${n} values, the total of all ${n} values must be ${T} × ${n}.`, 'Subtract the total so far from the total needed.'],
    solution: [
      `Total needed: mean $\\times$ number of values $= ${T} \\times ${n} = ${T * n}$`,
      `Total so far: $${vs.join(' + ')} = ${S}$`,
      `Last value: $${T * n} - ${S} = ${need}$`,
      `Check: $(${S} + ${need}) \\div ${n} = ${T}$`,
      `The last value must be at least ${need}${t.unit === '%' ? '%' : ` ${t.unit}`}.`,
    ],
  };
}

const centralTendency = skill({
  id: 'm303-central-tendency',
  name: 'Mean, median and mode',
  description: 'Find the mean, median and mode of a data set, choose the measure that best describes it (especially with an outlier), and find a missing value for a target mean.',
  outcomes: ['S1'],
  lessonId: 'm303-6-1',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return cent1(rng);
    if (d === 2) return rng.chance(0.65) ? cent2(rng) : chooseMeasure(rng);
    return rng.chance(0.55) ? outlierItem(rng) : missingValue(rng);
  },
});

// ---------------------------------------------------------------------------
// 6.2 Weighted and trimmed means — m303-weighted-mean
// ---------------------------------------------------------------------------

const COURSES = [
  'construction technology course', 'pre-employment welding program', 'Math 30-3 course', 'automotive service course',
  'culinary arts course', 'pre-employment electrician program', 'cabinetmaking course', 'agriculture course',
];
/** "a" or "an" before a word. */
const an = (w: string) => `${/^[aeiou]/i.test(w) ? 'an' : 'a'} ${w}`;
const COMPONENTS = ['Assignments', 'Quizzes', 'Unit tests', 'Shop projects', 'Lab work', 'Midterm exam'];

const markTable = (names: string[], ws: number[], ms: number[]): Figure => ({
  type: 'table',
  headers: ['Part of the course', 'Weight', 'Mark'],
  rows: names.map((c, i) => [c, `${ws[i]}%`, `${ms[i]}%`]),
});
const wSum = (ws: number[], ms: number[]) => `$${ws.map((w, i) => `${dec(w)}(${ms[i]})`).join(' + ')}$`;
const wProd = (ws: number[], ms: number[]) => `$${ws.map((w, i) => num((w * ms[i]) / 100)).join(' + ')}$`;

function courseMark(rng: Rng, k: 3 | 4): Out {
  const name = rng.pick(NAMES);
  const course = rng.pick(COURSES);
  const names = [...rng.sample(COMPONENTS, k - 1), 'Final exam'];
  const o = retry(
    () => {
      const ws = k === 3
        ? rng.pick([[20, 30, 50], [30, 30, 40], [10, 40, 50], [20, 40, 40], [30, 40, 30], [25, 25, 50], [20, 50, 30]])
        : rng.pick([[15, 20, 25, 40], [10, 20, 30, 40], [20, 15, 35, 30], [10, 25, 25, 40], [15, 15, 30, 40], [5, 25, 30, 40], [20, 20, 25, 35]]);
      const ms = ws.map(() => rng.int(52, 96));
      const W = sum(ws.map((w, i) => w * ms[i])) / 100;
      return { ws, ms, W };
    },
    (x) => (k === 3 ? Math.abs(x.W * 10 - Math.round(x.W * 10)) < 1e-9 : !onEdge(x.W, 1)) && !isWhole(sum(x.ms) / k) || false,
    300,
  );
  const { ws, ms, W } = o;
  const plain = sum(ms) / k;
  return {
    prompt: `The table shows how ${poss(name)} final mark in ${an(course)} is calculated, and ${poss(name)} mark in each part. What is ${poss(name)} final mark?${k === 4 ? ' Round to the nearest tenth of a percent.' : ''}`,
    figure: markTable(names, ws, ms),
    parts: [numPart(W, { decimals: k === 4 ? 1 : undefined, suffix: '%', label: 'Final mark:' })],
    hints: [
      'Each mark counts by its weight. Write each weight as a decimal and multiply it by the mark.',
      `Add the products: ${wSum(ws, ms)}. The weights add to 100%, so there is no need to divide.`,
    ],
    solution: [
      `Weighted mean: ${wSum(ws, ms)}`,
      `${wProd(ws, ms).slice(0, -1)} ${eqR(W, 1)}$`,
      `(The plain mean of the marks, ${fmt(plain, 2)}%, is wrong here because the parts do not count equally.)`,
      `${poss(name)} final mark is ${k === 4 && !isWhole(W * 10) ? 'about ' : ''}${k === 4 ? fmtFixed(W, 1) : fmt(W)}%.`,
    ],
  };
}

interface Buy { intro: (name: string, k: string) => string; item: string; items: string; lo: number; hi: number; q: [number, number] }
const BUYS: Buy[] = [
  { intro: (name, k) => `${name}, a framer, bought 2×4 studs from ${k} suppliers`, item: 'stud', items: 'studs', lo: 3.89, hi: 5.49, q: [40, 160] },
  { intro: (name, k) => `${name} bought bags of concrete mix for a fence job at ${k} stores`, item: 'bag', items: 'bags', lo: 6.49, hi: 9.99, q: [10, 60] },
  { intro: (name, k) => `${name} bought small square bales of hay for a horse farm from ${k} neighbours`, item: 'bale', items: 'bales', lo: 6.5, hi: 11.5, q: [50, 300] },
  { intro: (name, k) => `${name}, a cleaning contractor, bought boxes of nitrile gloves at ${k} different prices`, item: 'box', items: 'boxes', lo: 11.99, hi: 18.99, q: [6, 40] },
  { intro: (name, k) => `${name} bought fence posts for a hillside pasture in ${k} loads`, item: 'post', items: 'posts', lo: 7.25, hi: 12.75, q: [30, 150] },
];

function avgPrice(rng: Rng, d: 1 | 2): Out {
  const b = rng.pick(BUYS);
  const name = rng.pick(NAMES);
  const k = d === 1 ? 2 : 3;
  const o = retry(
    () => {
      const ps = d === 1
        ? rng.sample(range(Math.ceil(b.lo), Math.floor(b.hi) + 1, 1), 2)
        : Array.from({ length: k }, () => rng.int(Math.round(b.lo * 4), Math.round(b.hi * 4)) / 4 - 0.01);
      const qs = Array.from({ length: k }, () => (d === 1 ? rng.int(1, 8) * 2 : rng.int(b.q[0], b.q[1])));
      const T = total(ps.map((p, i) => p * qs[i]));
      const Q = sum(qs);
      return { ps: ps.map((p) => roundTo(p, 2)), qs, T, Q, A: T / Q };
    },
    (x) => (d === 1 ? isCents(x.A) : !onEdge(x.A)) && new Set(x.ps).size === k && Math.abs(x.A - sum(x.ps) / k) > 0.02,
    300,
  );
  const { ps, qs, T, Q, A } = o;
  const desc = list(ps.map((p, i) => `${qs[i]} ${b.items} at ${money(p)} each`));
  return {
    prompt: `${b.intro(name, k === 2 ? 'two' : 'three')}: ${desc}. What was the mean price per ${b.item}? ${CENT}`,
    parts: [moneyPart(A, `Mean price per ${b.item}: \\$`)],
    hints: [
      `The prices do not count equally: more ${b.items} were bought at some prices. Use the total cost and the total number of ${b.items}.`,
      `Mean price = (total cost) ÷ (total number of ${b.items}).`,
    ],
    solution: [
      `Total cost: $${ps.map((p, i) => `${qs[i]}(${m2(p)})`).join(' + ')} = ${m2(T)}$`,
      `Total ${b.items}: $${qs.join(' + ')} = ${Q}$`,
      `Mean price: $${m2(T)} \\div ${Q} ${toCents(A)}$`,
      `The mean price was ${abt(A)}${money(A)} per ${b.item}.`,
    ],
  };
}

const GRADE_POINTS = [4.0, 3.7, 3.3, 3.0, 2.7, 2.3, 2.0, 1.7];
const PROGRAMS = ['power engineering diploma', 'business administration certificate', 'agriculture diploma', 'early learning certificate', 'instrumentation technology diploma', 'veterinary technology diploma'];

function gpa(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const prog = rng.pick(PROGRAMS);
  const o = retry(
    () => {
      const k = rng.int(4, 5);
      const cr = Array.from({ length: k }, () => rng.pick([3, 3, 3, 4, 5, 1.5]));
      const gp = Array.from({ length: k }, () => rng.pick(GRADE_POINTS));
      const G = sum(cr.map((c, i) => c * gp[i])) / sum(cr);
      return { k, cr, gp, G };
    },
    (x) => !onEdge(x.G, 2) && new Set(x.cr).size > 1 && new Set(x.gp).size > 2,
    300,
  );
  const { k, cr, gp, G } = o;
  const C = sum(cr);
  const P = sum(cr.map((c, i) => c * gp[i]));
  return {
    prompt: `${name} is in ${an(prog)} at a college. The college finds a term grade point average (GPA) as a weighted mean: each course’s grade points are weighted by its credits. Find ${poss(name)} GPA for the term, to the nearest hundredth.`,
    figure: { type: 'table', headers: ['Course', 'Credits', 'Grade points'], rows: cr.map((c, i) => [`Course ${i + 1}`, fmt(c), gp[i].toFixed(1)]) },
    parts: [numPart(G, { decimals: 2, label: 'GPA:' })],
    hints: ['Multiply each course’s grade points by its credits, and add the results.', `Then divide by the total number of credits. Do not divide by ${k}, the number of courses.`],
    solution: [
      `Credits × grade points: $${cr.map((c, i) => `${fmt(c)}(${gp[i].toFixed(1)})`).join(' + ')} = ${num(P)}$`,
      `Total credits: $${cr.map((c) => fmt(c)).join(' + ')} = ${num(C)}$`,
      `GPA: $${num(P)} \\div ${num(C)} ${eqR(G, 2)}$`,
      `${poss(name)} GPA is ${isWhole(G * 100) ? '' : 'about '}${fmtFixed(G, 2)}.`,
    ],
  };
}

interface Judge { intro: (name: string, n: number) => string; of: number; lo: number; hi: number; what: string }
const JUDGES: Judge[] = [
  { intro: (name, n) => `At a regional skills competition, ${n} judges scored ${poss(name)} weld out of 10`, of: 10, lo: 5, hi: 10, what: 'score' },
  { intro: (name, n) => `At a chili cook-off at a summer rodeo, ${n} judges scored ${poss(name)} chili out of 10`, of: 10, lo: 4, hi: 10, what: 'score' },
  { intro: (name, n) => `At a cabinetmaking competition, ${n} judges scored ${poss(name)} cabinet out of 50`, of: 50, lo: 31, hi: 49, what: 'score' },
  { intro: (name, n) => `At a hairstyling competition, ${n} judges scored ${poss(name)} design out of 20`, of: 20, lo: 11, hi: 20, what: 'score' },
];

function judgesTrim(rng: Rng): Out {
  const j = rng.pick(JUDGES);
  const name = rng.pick(NAMES);
  const n = rng.pick([5, 6]);
  const vs = retry(
    () => Array.from({ length: n }, () => rng.int(j.lo, j.hi)),
    (x) => {
      const s = sorted(x);
      const mid = s.slice(1, -1);
      return isWhole((sum(mid) / mid.length) * 10) && s[0] < s[1] && s[n - 2] < s[n - 1] && Math.abs(sum(mid) / mid.length - sum(x) / n) > 0.05;
    },
    300,
  );
  const s = sorted(vs);
  const mid = s.slice(1, -1);
  const T = sum(mid) / mid.length;
  return {
    prompt: `${j.intro(name, n)}: ${vs.join(', ')}. The competition drops the highest and the lowest score and uses the mean of the rest (a trimmed mean). What is ${poss(name)} trimmed mean score?`,
    parts: [numPart(T, { label: 'Trimmed mean:', display: 'decimal' })],
    hints: ['Put the scores in order, then cross out the highest and the lowest.', `Find the mean of the ${n - 2} scores that are left.`],
    solution: [
      `In order: ${s.join(', ')}`,
      `Drop the lowest (${s[0]}) and the highest (${s[n - 1]}): ${mid.join(', ')}`,
      `Mean of the rest: $(${mid.join(' + ')}) \\div ${mid.length} = ${sum(mid)} \\div ${mid.length} = ${num(T)}$`,
      `${poss(name)} trimmed mean score is ${fmt(T)} out of ${j.of}.`,
    ],
  };
}

interface TrimCtx { intro: (n: number) => string; unit: string; lo: number; hi: number; out: [number, number] }
const TRIMS: TrimCtx[] = [
  { intro: (n) => `A courier company in a large city recorded the delivery times, in minutes, of ${n} parcels across the city:`, unit: 'min', lo: 24, hi: 58, out: [95, 140] },
  { intro: (n) => `A grain farmer recorded the hours the combine ran on each of ${n} harvest days:`, unit: 'h', lo: 6, hi: 13, out: [1, 2] },
  { intro: (n) => `A water-well driller in farm country recorded the depths, in metres, of the last ${n} wells drilled:`, unit: 'm', lo: 28, hi: 61, out: [110, 150] },
  { intro: (n) => `A small engine shop recorded the minutes spent on each of ${n} lawn-mower tune-ups:`, unit: 'min', lo: 35, hi: 70, out: [150, 190] },
];

function percentTrim(rng: Rng, withMean = false): Out {
  const t = rng.pick(TRIMS);
  const [n, p] = rng.pick([[10, 10], [20, 10], [10, 20], [20, 5], [20, 20]] as const);
  const k = (n * p) / 100;
  const vs = retry(
    () => {
      const base = Array.from({ length: n - 1 }, () => rng.int(t.lo, t.hi));
      return rng.shuffle([...base, rng.int(t.out[0], t.out[1])]);
    },
    (x) => {
      const s = sorted(x);
      const keep = s.slice(k, n - k);
      return !onEdge(sum(keep) / keep.length, 1) && !onEdge(sum(x) / n, 1) && s[k - 1] < s[k] && s[n - k - 1] < s[n - k];
    },
    300,
  );
  const s = sorted(vs);
  const keep = s.slice(k, n - k);
  const T = sum(keep) / keep.length;
  const M = sum(vs) / n;
  const prompt = withMean
    ? `${t.intro(n)} ${vs.join(', ')}. Find the mean and the ${p}% trimmed mean (remove the lowest ${p}% and the highest ${p}% of the values, then find the mean of the rest). Round both to the nearest tenth. Which one better describes a typical value?`
    : `${t.intro(n)} ${vs.join(', ')}. Find the ${p}% trimmed mean: remove the lowest ${p}% and the highest ${p}% of the values, then find the mean of the rest. Round to the nearest tenth.`;
  const high = t.out[0] > t.hi;
  const parts: Part[] = [
    ...(withMean ? [numPart(M, { decimals: 1, suffix: t.unit, label: 'Mean:' })] : []),
    numPart(T, { decimals: 1, suffix: t.unit, label: `${p}% trimmed mean:` }),
  ];
  if (withMean) {
    parts.push(part(mc(rng, `The trimmed mean, because it removes the outlier that pulls the mean ${high ? 'up' : 'down'}.`, [
      'The mean, because it uses every value.',
      `The mean, because the trimmed mean leaves out ${2 * k} values.`,
      'They always describe the data equally well.',
    ]), { label: 'Better measure:' }));
  }
  return {
    prompt,
    parts,
    hints: [
      `${p}% of ${n} values is $${dec(p)} \\times ${n} = ${k}$, so remove ${k} value${k > 1 ? 's' : ''} from each end of the ordered list.`,
      `Then find the mean of the ${n - 2 * k} values that are left.`,
    ],
    solution: [
      `Number to remove from each end: $${pcm(p)} \\times ${n} = ${k}$`,
      `In order: ${s.join(', ')}`,
      `Remove the lowest ${k} (${s.slice(0, k).join(', ')}) and the highest ${k} (${s.slice(n - k).join(', ')}).`,
      `Trimmed mean: $${num(sum(keep))} \\div ${keep.length} ${eqR(T, 1)}$`,
      ...(withMean ? [`Mean of all the values: $${num(sum(vs))} \\div ${n} ${eqR(M, 1)}$`] : []),
      withMean
        ? `The mean is ${about(M, 1)}${fmtFixed(M, 1)} ${t.unit} and the ${p}% trimmed mean is ${about(T, 1)}${fmtFixed(T, 1)} ${t.unit}. The trimmed mean better describes a typical value, because the outlier ${s[high ? n - 1 : 0]} ${t.unit} pulls the mean ${high ? 'up' : 'down'}.`
        : `The ${p}% trimmed mean is ${about(T, 1)}${fmtFixed(T, 1)} ${t.unit}.`,
    ],
  };
}

function neededFinal(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const course = rng.pick(COURSES);
  const o = retry(
    () => {
      const k = rng.int(2, 3);
      const wf = rng.pick([30, 40, 50]);
      const ws = k === 2 ? rng.pick([[20, 100 - wf - 20], [30, 100 - wf - 30], [25, 100 - wf - 25]]) : rng.pick([[10, 20, 100 - wf - 30], [15, 25, 100 - wf - 40], [20, 10, 100 - wf - 30]]);
      const ms = ws.map(() => rng.int(55, 92));
      const T = rng.pick([60, 65, 70, 75, 80]);
      const have = sum(ws.map((w, i) => w * ms[i])) / 100;
      const need = ((T - have) * 100) / wf;
      return { k, wf, ws, ms, T, have, need };
    },
    (x) => x.ws.every((w) => w > 0) && isWhole(x.need) && x.need >= 45 && x.need <= 98,
    500,
  );
  const { ws, ms, wf, T, have, need } = o;
  const names = [...rng.sample(COMPONENTS, ws.length), 'Final exam'];
  const goal = rng.pick([`a final mark of ${T}% to get into the next course`, `a final mark of at least ${T}% for a scholarship`, `a final mark of ${T}% to meet a program’s entrance requirement`]);
  return {
    prompt: `${name} needs ${goal}. In ${an(course)}, the parts of the course count as shown in the table, and the final exam has not been written yet. What is the lowest mark ${name} can get on the final exam and still reach ${T}%?`,
    figure: { type: 'table', headers: ['Part of the course', 'Weight', 'Mark'], rows: names.map((c, i) => [c, `${i < ws.length ? ws[i] : wf}%`, i < ws.length ? `${ms[i]}%` : '?']) },
    parts: [numPart(need, { suffix: '%', label: 'Final exam:' })],
    hints: [
      `Let $x$ be the final exam mark. Then the final mark is ${wSum(ws, ms).slice(0, -1)} + ${dec(wf)}x$.`,
      `Set this equal to ${T} and solve for $x$.`,
    ],
    solution: [
      `Weighted mean with exam mark $x$: ${wSum(ws, ms).slice(0, -1)} + ${dec(wf)}x = ${T}$`,
      `The marks so far contribute ${wProd(ws, ms).slice(0, -1)} = ${num(have)}$`,
      `So $${num(have)} + ${dec(wf)}x = ${T}$, which gives $${dec(wf)}x = ${num(T - have)}$`,
      `$x = ${num(T - have)} \\div ${dec(wf)} = ${need}$`,
      `${name} needs at least ${need}% on the final exam.`,
    ],
  };
}

function countsTwice(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const course = rng.pick(COURSES);
  const o = retry(
    () => {
      const k = rng.int(3, 5);
      const ts = Array.from({ length: k }, () => rng.int(55, 95));
      const E = rng.int(50, 95);
      const f = rng.pick([2, 3]);
      const W = (sum(ts) + f * E) / (k + f);
      return { k, ts, E, f, W };
    },
    (x) => !onEdge(x.W, 1) && !isWhole(x.W * 10) && Math.abs(x.W - (sum(x.ts) + x.E) / (x.k + 1)) > 0.3,
    300,
  );
  const { k, ts, E, f, W } = o;
  const word = f === 2 ? 'twice' : 'three times';
  const plain = (sum(ts) + E) / (k + 1);
  return {
    prompt: `In ${poss(name)} ${course}, there are ${k} unit tests and a final exam. The final exam counts ${word} as much as each unit test. ${poss(name)} unit test marks are ${ts.map((t) => `${t}%`).join(', ')}, and the final exam mark is ${E}%. What is ${poss(name)} final mark? Round to the nearest tenth of a percent.`,
    parts: [numPart(W, { decimals: 1, suffix: '%', label: 'Final mark:' })],
    hints: [`Give each unit test a weight of 1 and the final exam a weight of ${f}.`, `Weighted mean = (sum of weight × mark) ÷ (sum of the weights) = (sum of the tests + ${f} × exam) ÷ ${k + f}.`],
    solution: [
      `Weights: 1 for each unit test and ${f} for the exam. The weights add to $${k} + ${f} = ${k + f}$.`,
      `Weighted total: $${ts.join(' + ')} + ${f}(${E}) = ${sum(ts) + f * E}$`,
      `Weighted mean: $${sum(ts) + f * E} \\div ${k + f} ${eqR(W, 1)}$`,
      `(Dividing by ${k + 1} with the exam counted once would give ${about(plain, 1)}${fmtFixed(plain, 1)}%, which is wrong.)`,
      `${poss(name)} final mark is about ${fmtFixed(W, 1)}%.`,
    ],
  };
}

const weightedMean = skill({
  id: 'm303-weighted-mean',
  name: 'Weighted and trimmed means',
  description: 'Find weighted means such as course marks, mean prices and GPAs, find trimmed means, and find the mark needed on a final exam.',
  outcomes: ['S1'],
  lessonId: 'm303-6-2',
  calculator: true,
  gen(rng, d) {
    if (d === 1) {
      const r = rng.int(0, 2);
      return r === 0 ? courseMark(rng, 3) : r === 1 ? avgPrice(rng, 1) : judgesTrim(rng);
    }
    if (d === 2) {
      const r = rng.int(0, 3);
      return r === 0 ? courseMark(rng, 4) : r === 1 ? avgPrice(rng, 2) : r === 2 ? gpa(rng) : percentTrim(rng);
    }
    const r = rng.int(0, 2);
    return r === 0 ? neededFinal(rng) : r === 1 ? countsTwice(rng) : percentTrim(rng, true);
  },
});

// ---------------------------------------------------------------------------
// 6.3 Percentiles — m303-percentile
// ---------------------------------------------------------------------------

const PR_FORMULA = '$PR = \\dfrac{b + 0.5e}{n} \\times 100$, where $b$ is the number of values below the score, $e$ is the number of values equal to the score (including it) and $n$ is the number of values';
const prOf = (b: number, e: number, n: number) => ((b + 0.5 * e) / n) * 100;
const prSteps = (b: number, e: number, n: number) => {
  const v = prOf(b, e, n);
  return `$PR = \\dfrac{${b} + 0.5(${e})}{${n}} \\times 100 = \\dfrac{${fmt(b + 0.5 * e)}}{${n}} \\times 100 ${eqR(v, 0)}$`;
};

interface Interp { setup: (name: string, P: number) => string; correct: (name: string, P: number) => string; wrong: (name: string, P: number) => string[] }
const INTERP: Interp[] = [
  {
    setup: (name, P) => `${name} wrote the entrance test for a pre-apprenticeship carpentry program. The score report says ${poss(name)} score is at the ${ordinal(P)} percentile.`,
    correct: (name, P) => `About ${P}% of the people who wrote the test scored at or below ${poss(name)} score.`,
    wrong: (name, P) => [`${name} answered ${P}% of the questions correctly.`, `About ${P}% of the people who wrote the test scored higher than ${name}.`, `${name} scored ${P} marks.`],
  },
  {
    setup: (name, P) => `At a check-up at the clinic, ${poss(name)} baby son’s mass is at the ${ordinal(P)} percentile for his age.`,
    correct: (_n, P) => `About ${P}% of babies his age have a mass at or below his.`,
    wrong: (_n, P) => [`He is ${P}% heavier than a typical baby his age.`, `About ${P}% of babies his age are heavier than he is.`, `His mass is ${P}% of the mass of the heaviest baby his age.`],
  },
  {
    setup: (name, P) => `At a car dealership group, ${poss(name)} sales last year were at the ${ordinal(P)} percentile of all the salespeople.`,
    correct: (name, P) => `About ${P}% of the salespeople sold the same as ${name} or less.`,
    wrong: (name, P) => [`${name} made ${P}% of all the sales.`, `About ${P}% of the salespeople sold more than ${name}.`, `${name} sold ${P} vehicles.`],
  },
  {
    setup: (name, P) => `On the fitness test for a wildland firefighting crew, ${poss(name)} number of push-ups was at the ${ordinal(P)} percentile of all the applicants.`,
    correct: (name, P) => `About ${P}% of the applicants did the same number of push-ups as ${name} or fewer.`,
    wrong: (name, P) => [`${name} did ${P} push-ups.`, `About ${P}% of the applicants did more push-ups than ${name}.`, `${name} did ${P}% of the push-ups needed to pass.`],
  },
  {
    setup: (name, P) => `In a wage survey of welders at shops across the city, ${poss(name)} hourly wage is at the ${ordinal(P)} percentile.`,
    correct: (name, P) => `About ${P}% of the welders in the survey earn the same as ${name} or less.`,
    wrong: (name, P) => [`${name} earns ${P}% of the highest wage in the survey.`, `About ${P}% of the welders in the survey earn more than ${name}.`, `${name} earns ${P}% more than a typical welder in the survey.`],
  },
];

function interpret(rng: Rng): Out {
  const it = rng.pick(INTERP);
  const name = rng.pick(NAMES);
  const P = rng.pick([60, 65, 70, 72, 75, 80, 84, 85, 88, 90, 92, 95]);
  return {
    prompt: `${it.setup(name, P)} What does this mean?`,
    parts: [part(mc(rng, it.correct(name, P), it.wrong(name, P)))],
    hints: ['A percentile compares one value with the rest of the group. It is not a mark or a percent of something.', `The ${ordinal(P)} percentile is the value that about ${P}% of the group are at or below.`],
    solution: [
      `A percentile rank of ${P} means the value is at or above about ${P}% of the values in the group.`,
      `So about ${100 - P}% of the group are above it.`,
      it.correct(name, P),
    ],
  };
}

interface Group { group: (n: number) => string; did: string; same: string; thing: string }
const GROUPS: Group[] = [
  { group: (n) => `${n} apprentices wrote a fall-protection safety test`, did: 'scored lower than', same: 'got the same score as', thing: 'score' },
  { group: (n) => `${n} applicants did a push-up test for a wildland firefighting crew`, did: 'did fewer push-ups than', same: 'did the same number of push-ups as', thing: 'result' },
  { group: (n) => `${n} salespeople worked at a farm equipment dealership last year`, did: 'sold fewer machines than', same: 'sold the same number of machines as', thing: 'sales' },
  { group: (n) => `${n} students wrote a forklift operator’s written exam at a training centre`, did: 'scored lower than', same: 'got the same score as', thing: 'score' },
];

function prWords(rng: Rng, d: 1 | 3): Out {
  const g = rng.pick(GROUPS);
  const name = rng.pick(NAMES);
  const { n, b, e } = retry(
    () => {
      const n = d === 1 ? rng.pick([20, 25, 40, 50]) : rng.int(24, 60);
      const e = rng.int(1, 4);
      const b = rng.int(Math.round(n * 0.3), n - e);
      return { n, b, e };
    },
    (x) => !onEdge(prOf(x.b, x.e, x.n), 0) && x.b + x.e <= x.n,
  );
  const P = prOf(b, e, n);
  const others = e - 1;
  return {
    prompt: `${g.group(n)}. ${b} of them ${g.did} ${name}, and ${others === 0 ? `no one else ${g.same} ${name}` : `${others} other${others > 1 ? 's' : ''} ${g.same} ${name}`}. Use ${PR_FORMULA}. What is the percentile rank of ${poss(name)} ${g.thing}? Round to the nearest whole number.`,
    parts: [numPart(P, { decimals: 0, label: 'PR:' })],
    hints: [`Here $b = ${b}$ and $n = ${n}$. Count ${name} in $e$: $e = ${e}$.`, 'Substitute into the formula, then round to a whole number.'],
    solution: [
      `Below: $b = ${b}$. Equal (including ${name}): $e = ${others} + 1 = ${e}$. Total: $n = ${n}$.`,
      prSteps(b, e, n),
      `${poss(name)} percentile rank is ${Math.round(P)}: about ${Math.round(P)}% of the group did the same as ${name} or worse.`,
    ],
  };
}

interface ListCtx { intro: (n: number) => string; lo: number; hi: number; unit: string; who: (name: string, v: number) => string }
const LISTS: ListCtx[] = [
  { intro: (n) => `The ${n} apprentices in a class wrote a safety test marked out of 50. Their scores, from least to greatest, are:`, lo: 24, hi: 50, unit: '', who: (name, v) => `${name} scored ${v}` },
  { intro: (n) => `A hardware store in a small town recorded the number of customers each day for ${n} days. From least to greatest:`, lo: 62, hi: 118, unit: 'customers', who: (_n, v) => `One day had ${v} customers` },
  { intro: (n) => `The ${n} trainees in a commercial driving course each did a timed pre-trip inspection. Their scores out of 40, from least to greatest, are:`, lo: 18, hi: 40, unit: '', who: (name, v) => `${name} scored ${v}` },
  { intro: (n) => `A pipeline crew recorded the metres of pipe laid each day for ${n} days. From least to greatest:`, lo: 120, hi: 210, unit: 'm', who: (_n, v) => `One day the crew laid ${v} m` },
];

function makeList(rng: Rng, L: ListCtx, n: number): number[] {
  const span = L.hi - L.lo;
  return sorted(Array.from({ length: n }, () => L.lo + Math.round(rng.next() ** 0.8 * span)));
}

function prList(rng: Rng): Out {
  const L = rng.pick(LISTS);
  const name = rng.pick(NAMES);
  const o = retry(
    () => {
      const n = rng.int(15, 24);
      const vs = makeList(rng, L, n);
      const v = vs[rng.int(Math.floor(n * 0.3), n - 2)];
      const b = vs.filter((x) => x < v).length;
      const e = vs.filter((x) => x === v).length;
      return { n, vs, v, b, e };
    },
    (x) => !onEdge(prOf(x.b, x.e, x.n), 0) && x.e >= 2,
    300,
  );
  const { n, vs, v, b, e } = o;
  const P = prOf(b, e, n);
  return {
    prompt: `${L.intro(n)} ${vs.join(', ')}. ${L.who(name, v)}. Use ${PR_FORMULA}. Find the percentile rank of ${v}${L.unit ? ` ${L.unit}` : ''}, to the nearest whole number.`,
    parts: [numPart(P, { decimals: 0, label: 'PR:' })],
    hints: [`Count the values less than ${v} (that is $b$) and the values equal to ${v} (that is $e$).`, `There are $n = ${n}$ values. Substitute into the formula.`],
    solution: [
      `Values below ${v}: $b = ${b}$`,
      `Values equal to ${v}: $e = ${e}$`,
      prSteps(b, e, n),
      `The percentile rank of ${v} is ${Math.round(P)}.`,
    ],
  };
}

function valueAt(rng: Rng): Out {
  const L = rng.pick(LISTS);
  const o = retry(
    () => {
      const n = rng.int(12, 24);
      const P = rng.pick([10, 20, 25, 30, 40, 60, 70, 75, 80, 90]);
      const vs = makeList(rng, L, n);
      const R = (P * n) / 100;
      return { n, P, vs, R };
    },
    (x) => x.R >= 1 && x.R < x.n,
    300,
  );
  const { n, P, vs, R } = o;
  const whole = isWhole(R);
  const pos = whole ? R : Math.ceil(R);
  const val = whole ? (vs[R - 1] + vs[R]) / 2 : vs[pos - 1];
  return {
    prompt: `${L.intro(n)} ${vs.join(', ')}. Find the ${ordinal(P)} percentile. Use this method: work out $R = \\dfrac{P}{100} \\times n$. If $R$ is a whole number, the percentile is the mean of the values in positions $R$ and $R + 1$. If $R$ is not a whole number, round $R$ up and use the value in that position.`,
    parts: [numPart(val, { label: `${ordinal(P)} percentile:`, suffix: L.unit || undefined, display: 'decimal' })],
    hints: [`$R = \\dfrac{${P}}{100} \\times ${n}$. Count along the ordered list to that position.`, whole ? 'R is a whole number here, so average two values.' : 'R is not a whole number here, so round it up.'],
    solution: [
      `$R = ${dec(P)} \\times ${n} = ${num(R)}$`,
      whole
        ? `$R$ is a whole number, so use the mean of the ${ordinal(R)} and ${ordinal(R + 1)} values: $(${vs[R - 1]} + ${vs[R]}) \\div 2 = ${num(val)}$`
        : `$R$ is not a whole number, so round up to ${pos}. The ${ordinal(pos)} value is ${val}.`,
      `The ${ordinal(P)} percentile is ${numT(val)}${L.unit ? ` ${L.unit}` : ''}: about ${P}% of the values are at or below it.`,
    ],
  };
}

function prTable(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const ctx = rng.pick([
    { intro: 'The table shows the scores of the workers at a meat-packing plant on a 10-question safety quiz.', head: ['Score', 'Number of workers'], lo: 3, hi: 10, who: `${name} scored` },
    { intro: 'The table shows how many sales calls each agent at a call centre closed on Friday.', head: ['Sales closed', 'Number of agents'], lo: 0, hi: 7, who: `${name} closed` },
    { intro: 'The table shows the number of defects an inspector found in each of the trusses built at a truss plant one week.', head: ['Defects', 'Number of trusses'], lo: 0, hi: 6, who: 'One truss had' },
  ]);
  const o = retry(
    () => {
      const xs = range(ctx.lo, ctx.hi);
      const fs = xs.map((_, i) => Math.max(0, Math.round(2 + 7 * Math.sin(((i + 0.5) / xs.length) * Math.PI) + rng.int(-2, 2))));
      const k = rng.int(Math.floor(xs.length / 2), xs.length - 2);
      const s = xs[k];
      const b = sum(fs.slice(0, k));
      const e = fs[k];
      const n = sum(fs);
      return { xs, fs, s, b, e, n };
    },
    (x) => x.e >= 2 && !onEdge(prOf(x.b, x.e, x.n), 0),
    300,
  );
  const { xs, fs, s, b, e, n } = o;
  const P = prOf(b, e, n);
  const below = xs.filter((x) => x < s);
  return {
    prompt: `${ctx.intro} ${ctx.who} ${s}. Use ${PR_FORMULA}. Find the percentile rank of ${s}, to the nearest whole number.`,
    figure: { type: 'table', headers: ctx.head, rows: xs.map((x, i) => [String(x), String(fs[i])]) },
    parts: [numPart(P, { decimals: 0, label: 'PR:' })],
    hints: ['Add all the frequencies to find $n$.', `$b$ is the total of the frequencies for values below ${s}; $e$ is the frequency of ${s}.`],
    solution: [
      `Total: $n = ${fs.join(' + ')} = ${n}$`,
      `Below ${s} (${below.join(', ')}): $b = ${fs.slice(0, below.length).join(' + ')} = ${b}$`,
      `Equal to ${s}: $e = ${e}$`,
      prSteps(b, e, n),
      `The percentile rank of ${s} is ${Math.round(P)}.`,
    ],
  };
}

function comparePR(rng: Rng): Out {
  const [A, B] = rng.sample(NAMES, 2);
  const test = rng.pick([
    { what: 'the same safety exam, marked out of 80, in different classes', unit: 'out of 80', lo: 48, hi: 76 },
    { what: 'the same welding theory exam, marked out of 100, at different colleges', unit: 'out of 100', lo: 58, hi: 94 },
    { what: 'the same first-aid test, marked out of 60, on different courses', unit: 'out of 60', lo: 36, hi: 58 },
  ]);
  const o = retry(
    () => {
      const sA = rng.int(test.lo, test.hi);
      const sB = rng.int(test.lo, test.hi);
      const nA = rng.int(18, 32);
      const nB = rng.int(18, 32);
      const eA = rng.int(1, 3);
      const eB = rng.int(1, 3);
      const bA = rng.int(Math.round(nA * 0.4), nA - eA);
      const bB = rng.int(Math.round(nB * 0.4), nB - eB);
      return { sA, sB, nA, nB, eA, eB, bA, bB, pA: prOf(bA, eA, nA), pB: prOf(bB, eB, nB) };
    },
    (x) => x.sA !== x.sB && Math.abs(Math.round(x.pA) - Math.round(x.pB)) >= 4 && (x.sA - x.sB) * (x.pA - x.pB) < 0 && !onEdge(x.pA, 0) && !onEdge(x.pB, 0),
    500,
  );
  const { sA, sB, nA, nB, eA, eB, bA, bB, pA, pB } = o;
  const better = pA > pB ? A : B;
  const worse = better === A ? B : A;
  const sameText = (e: number, who: string) => (e === 1 ? `no one else had the same score as ${who}` : `${e - 1} other${e > 2 ? 's' : ''} had the same score as ${who}`);
  return {
    prompt: `${A} and ${B} wrote ${test.what}. ${A} scored ${sA} in a class of ${nA}: ${bA} classmates scored lower and ${sameText(eA, A)}. ${B} scored ${sB} in a class of ${nB}: ${bB} classmates scored lower and ${sameText(eB, B)}. Use ${PR_FORMULA}. Find each percentile rank to the nearest whole number. Who did better compared with their own class?`,
    parts: [
      numPart(pA, { decimals: 0, label: `${A}:` }),
      numPart(pB, { decimals: 0, label: `${B}:` }),
      part(mc(rng, `${better}, because ${poss(better)} percentile rank is higher.`, [
        `${worse}, because ${poss(worse)} score is higher.`,
        'They did equally well, because they wrote the same exam.',
        'You cannot tell without the mean of each class.',
      ]), { label: 'Did better:' }),
    ],
    hints: ['Find $b$, $e$ and $n$ for each person, remembering to count the person in $e$.', 'A percentile rank compares a person with their own group, so compare the percentile ranks, not the scores.'],
    solution: [
      `${A}: $b = ${bA}$, $e = ${eA}$, $n = ${nA}$. ${prSteps(bA, eA, nA)}`,
      `${B}: $b = ${bB}$, $e = ${eB}$, $n = ${nB}$. ${prSteps(bB, eB, nB)}`,
      `${worse} had the higher score, but ${better} did better than more of the class.`,
      `${A}: PR ${Math.round(pA)}. ${B}: PR ${Math.round(pB)}. ${better} did better compared with their own class.`,
    ],
  };
}

const percentile = skill({
  id: 'm303-percentile',
  name: 'Percentiles and percentile ranks',
  description: 'Interpret percentiles, find a percentile rank with PR = (b + 0.5e)/n × 100, find the value at a percentile, and compare percentile ranks.',
  outcomes: ['S2'],
  lessonId: 'm303-6-3',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return rng.chance(0.5) ? interpret(rng) : prWords(rng, 1);
    if (d === 2) return rng.chance(0.55) ? prList(rng) : valueAt(rng);
    return rng.chance(0.5) ? prTable(rng) : comparePR(rng);
  },
});

export const STATISTICS_SKILLS: SkillDef[] = [centralTendency, weightedMean, percentile];

// Kept for reuse by the other Unit 6–8 generators.
export { fixedChoice, roundingPhrase };
