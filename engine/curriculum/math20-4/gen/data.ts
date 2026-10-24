/** Math 20-4 Unit 9 — Data and Probability (SP1, SP2). */
import { mc, numPart, retry, skill } from '../../helpers.ts';
import { fmtFixed, fmtGroupTex, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, Part, PlaneFigure, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Ananya', 'Nathan', 'Lena', 'Diego', 'Harpreet', 'Noor',
];

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure; answerDisplay?: string };
type Lvl = Difficulty;

/** A number inside maths (thousands grouped). */
const num = (x: number, dp = 4) => fmtGroupTex(x, dp);
const isWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
const lower = (c: string) => c.toLowerCase();

function group(s: string): string {
  const [i, f] = s.split('.');
  const g = i.length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : i;
  return f === undefined ? g : `${g}.${f}`;
}
/** Money in prose, always with cents: \$12.50. Never inside $...$. */
const money = (x: number) => `\\$${group(fmtFixed(x, 2))}`;
/** Whole dollars print without cents (\$60), otherwise \$59.50. */
const tag = (x: number) => (isWhole(x) ? `\\$${group(String(Math.round(x)))}` : money(x));
/** A money amount inside maths, without a dollar sign. */
const mv = (x: number) => (isWhole(x) ? num(Math.round(x)) : group(fmtFixed(x, 2)).replace(/,/g, '{,}'));
/** Money answer graded to the cent. */
const moneyPart = (v: number): Part => numPart(v, { decimals: 2, tolerance: 0.011, label: '\\$' });

const sum = (a: number[]) => a.reduce((s, x) => s + x, 0);
const asc = (a: number[]) => [...a].sort((p, q) => p - q);
function median(a: number[]): number {
  const s = asc(a);
  const n = s.length;
  return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
}
/** True when v sits too close to a rounding boundary at `dp` places. */
function onEdge(v: number, dp: number): boolean {
  const s = Math.abs(v) * 10 ** dp;
  return Math.abs(s - Math.floor(s) - 0.5) < 0.06;
}
/** "= 12.5" when exact to `dp` places, otherwise "\approx 12.4567". */
function eq(v: number, dp = 4): string {
  return Math.abs(roundTo(v, dp) - v) < 1e-9 ? `= ${num(v, dp)}` : `\\approx ${num(v, dp)}`;
}
const plus = (a: number[]) => a.map((x) => num(x)).join(' + ');
const listTex = (a: number[]) => `$${a.map((x) => num(x)).join(',\\ \\ ')}$`;
const fr = (n: number, d: number) => `\\frac{${n}}{${d}}`;
/** Percents that add to 100: `k` parts, each a multiple of `unit` and at least `min`, all different. */
function percents(rng: Rng, k: number, unit: number, min: number): number[] {
  return retry(
    () => {
      const slots = 100 / unit - 1;
      const cuts = rng.sample([...Array(slots).keys()].map((i) => (i + 1) * unit), k - 1).sort((a, b) => a - b);
      return [...cuts, 100].map((c, i) => c - (i ? cuts[i - 1] : 0));
    },
    (ps) => ps.every((p) => p >= min) && new Set(ps).size === ps.length,
    400,
  );
}
/** A percent answer: exact when it is, otherwise to the nearest whole percent. */
function pctPart(p: number): Part {
  return isWhole(p) ? numPart(p, { suffix: '%' }) : numPart(p, { decimals: 0, suffix: '%' });
}
const pctText = (p: number) => (isWhole(p) ? `$${num(p)}\\%$` : `about $${fmtFixed(p, 0)}\\%$`);

// ---------------------------------------------------------------------------
// 9.1 Displaying data: line graphs, circle graphs and percents
// ---------------------------------------------------------------------------

interface LineCtx {
  intro: (name: string) => string;
  xs: number[];
  xStep: number;
  xLabel: string;
  yLabel: string;
  /** Grid step; values sit on a grid line (d1) or halfway between two (d2+). */
  yStep: number;
  yTop: number;
  shape: 'walk' | 'up' | 'hill';
  money?: boolean;
  unit: string;
  /** "in week 3", "at the end of month 4" */
  when: (x: number) => string;
  /** "How many iced coffees did the café sell" */
  ask: string;
  /** "weekly sales", "the balance" */
  what: string;
  /** "per week" */
  per: string;
}

const LINES: LineCtx[] = [
  {
    intro: () => 'The line graph shows how many iced coffees a café sold each week this summer.',
    xs: [1, 2, 3, 4, 5, 6, 7, 8], xStep: 1, xLabel: 'Week', yLabel: 'Iced coffees sold',
    yStep: 20, yTop: 200, shape: 'walk', unit: 'coffees',
    when: (x) => `in week ${x}`, ask: 'How many iced coffees did the café sell', what: 'weekly sales', per: 'per week',
  },
  {
    intro: (name) => `The line graph shows ${name}’s savings account balance at the end of each month.`,
    xs: [1, 2, 3, 4, 5, 6], xStep: 1, xLabel: 'Month', yLabel: 'Balance ($)',
    yStep: 200, yTop: 2000, shape: 'up', money: true, unit: '',
    when: (x) => `at the end of month ${x}`, ask: 'What was the balance', what: 'the balance', per: 'per month',
  },
  {
    intro: () => 'The line graph shows the temperature in a small town on a summer day. The hours use the 24-hour clock.',
    xs: [6, 8, 10, 12, 14, 16, 18], xStep: 2, xLabel: 'Hour of the day', yLabel: 'Temperature (°C)',
    yStep: 4, yTop: 36, shape: 'hill', unit: '°C',
    when: (x) => `at ${x}:00`, ask: 'What was the temperature', what: 'the temperature', per: 'per hour',
  },
  {
    intro: () => 'The line graph shows how many members a gym in a northern town had at the start of each year.',
    xs: [2019, 2020, 2021, 2022, 2023, 2024, 2025], xStep: 1, xLabel: 'Year', yLabel: 'Members',
    yStep: 100, yTop: 1000, shape: 'walk', unit: 'members',
    when: (x) => `in ${x}`, ask: 'How many members did the gym have', what: 'the number of members', per: 'per year',
  },
  {
    intro: (name) => `${name} measured a sunflower plant at the end of each week. The line graph shows its height.`,
    xs: [1, 2, 3, 4, 5, 6, 7, 8], xStep: 1, xLabel: 'Week', yLabel: 'Height (cm)',
    yStep: 20, yTop: 200, shape: 'up', unit: 'cm',
    when: (x) => `at the end of week ${x}`, ask: 'How tall was the sunflower', what: 'the height', per: 'per week',
  },
  {
    intro: () => 'The line graph shows how many customers came into a downtown coffee shop each hour on Saturday morning.',
    xs: [7, 8, 9, 10, 11, 12, 13, 14], xStep: 1, xLabel: 'Hour of the day', yLabel: 'Customers',
    yStep: 10, yTop: 70, shape: 'hill', unit: 'customers',
    when: (x) => `in the hour starting at ${x}:00`, ask: 'How many customers came in', what: 'the number of customers', per: 'per hour',
  },
];

function lineValues(rng: Rng, ctx: LineCtx, d: Lvl): number[] {
  const unit = d === 1 ? ctx.yStep : ctx.yStep / 2;
  const lo = ctx.yStep;
  const hi = ctx.yTop - ctx.yStep;
  const n = ctx.xs.length;
  const clamp = (v: number) => Math.max(lo, Math.min(hi, v));
  const steps = Math.round((hi - lo) / unit);
  return retry(
    () => {
      const out: number[] = [];
      if (ctx.shape === 'up') {
        let v = lo + unit * rng.int(0, 2);
        for (let i = 0; i < n; i++) {
          out.push(clamp(v));
          v += unit * rng.int(0, Math.max(1, Math.floor(steps / (n - 1)) + 1));
        }
      } else if (ctx.shape === 'hill') {
        // Rises to a peak in the afternoon, then drops more slowly.
        const peak = rng.int(Math.floor(n / 2), n - 2);
        let v = lo + ctx.yStep * rng.int(1, 3);
        for (let i = 0; i < n; i++) {
          out.push(clamp(v));
          v += i < peak ? unit * rng.int(1, 2) : -unit * rng.int(0, 1);
        }
      } else {
        let v = lo + unit * rng.int(1, steps - 1);
        for (let i = 0; i < n; i++) {
          out.push(clamp(v));
          v += unit * rng.int(-3, 3);
        }
      }
      return out;
    },
    (vs) => new Set(vs).size >= n - 2 && (d === 1 || vs.some((v) => v % ctx.yStep !== 0)),
    300,
  );
}

function lineFigure(ctx: LineCtx, values: number[]): PlaneFigure {
  const pts = ctx.xs.map((x, i) => [x, values[i]] as [number, number]);
  return {
    type: 'plane',
    grid: { xMin: ctx.xs[0], xMax: ctx.xs[ctx.xs.length - 1], yMin: 0, yMax: ctx.yTop, xStep: ctx.xStep, yStep: ctx.yStep, xLabel: ctx.xLabel, yLabel: ctx.yLabel },
    polylines: [{ points: pts }],
    points: pts.map(([x, y]) => ({ x, y })),
  };
}

const lineVal = (ctx: LineCtx, v: number) => (ctx.money ? tag(v) : ctx.unit === '°C' ? `$${num(v)}^\\circ\\text{C}$` : `$${num(v)}$ ${ctx.unit}`);
const linePart = (ctx: LineCtx, v: number, decimals?: number): Part =>
  ctx.money ? (decimals === undefined ? numPart(v, { label: '\\$' }) : moneyPart(v)) : numPart(v, { suffix: ctx.unit, decimals });

function lineItem(rng: Rng, d: Lvl, name: string): Out {
  const ctx = rng.pick(LINES);
  const values = lineValues(rng, ctx, d);
  const figure = lineFigure(ctx, values);
  const n = ctx.xs.length;
  const READ = 'Find the time on the bottom axis. Go straight up to the line, then straight across to the scale on the left.';
  const HALF = 'A point halfway between two grid lines is halfway between their numbers.';
  if (d === 1) {
    const i = rng.int(0, n - 1);
    return {
      prompt: `${ctx.intro(name)} ${ctx.ask} ${ctx.when(ctx.xs[i])}?`,
      figure,
      parts: [linePart(ctx, values[i])],
      hints: [READ, `The grid lines on the left go up by $${num(ctx.yStep)}$.`],
      solution: [`Find ${ctx.xs[i]} on the bottom axis (${ctx.xLabel.toLowerCase()}).`, `The point above it is level with $${num(values[i])}$ on the left scale.`, `The answer is ${lineVal(ctx, values[i])}.`],
    };
  }
  if (d === 2) {
    const [i, j] = retry(() => rng.sample([...Array(n).keys()], 2).sort((a, b) => a - b), ([a, b]) => values[a] !== values[b]);
    const up = values[j] > values[i];
    const diff = Math.abs(values[j] - values[i]);
    return {
      prompt: `${ctx.intro(name)} By how much did ${ctx.what} ${up ? 'go up' : 'go down'} from ${ctx.when(ctx.xs[i]).replace(/^(in|at) /, '')} to ${ctx.when(ctx.xs[j]).replace(/^(in|at) /, '')}?`,
      figure,
      parts: [linePart(ctx, diff)],
      hints: [READ, `Read both points, then subtract the smaller value from the larger one. ${HALF}`],
      solution: [
        `${ctx.when(ctx.xs[i]).replace(/^./, (c) => c.toUpperCase())}: $${num(values[i])}$`,
        `${ctx.when(ctx.xs[j]).replace(/^./, (c) => c.toUpperCase())}: $${num(values[j])}$`,
        `Change: $${num(Math.max(values[i], values[j]))} - ${num(Math.min(values[i], values[j]))} = ${num(diff)}$`,
        `${ctx.what.replace(/^./, (c) => c.toUpperCase())} went ${up ? 'up' : 'down'} by ${lineVal(ctx, diff)}.`,
      ],
    };
  }
  // d3: greatest one-step increase, or average change per step.
  const incs = values.slice(1).map((v, k) => v - values[k]);
  const best = Math.max(...incs);
  if (best > 0 && incs.filter((x) => x === best).length === 1 && rng.chance(0.5)) {
    const k = incs.indexOf(best);
    const between = (a: number, b: number) => `${ctx.xLabel.toLowerCase()} ${a} to ${b}`;
    return {
      prompt: `${ctx.intro(name)} What was the greatest increase from one point on the graph to the next?`,
      figure,
      parts: [linePart(ctx, best)],
      hints: ['The steepest part of the line going up shows the greatest increase.', `Read the values at both ends of the steepest rising piece and subtract. ${HALF}`],
      solution: [
        `Read every point: ${values.map((v) => `$${num(v)}$`).join(', ')}.`,
        `The changes from one point to the next are ${incs.map((x) => `$${x > 0 ? '+' : ''}${num(x)}$`).join(', ')}.`,
        `The greatest increase is from ${between(ctx.xs[k], ctx.xs[k + 1])}: $${num(values[k + 1])} - ${num(values[k])} = ${num(best)}$`,
        `The greatest increase is ${lineVal(ctx, best)}.`,
      ],
    };
  }
  const first = values[0];
  const last = values[n - 1];
  const span = ctx.xs[n - 1] - ctx.xs[0];
  const rate = (last - first) / span;
  const exact = isWhole(rate * 10);
  if (!exact && onEdge(rate, 1)) return lineItem(rng.fork('again'), d, name);
  const unitWord = ctx.per.replace('per ', '');
  return {
    prompt: `${ctx.intro(name)} From ${ctx.when(ctx.xs[0]).replace(/^(in|at) /, '')} to ${ctx.when(ctx.xs[n - 1]).replace(/^(in|at) /, '')}, what was the average change ${ctx.per}?${exact ? '' : ' Round to the nearest tenth.'}${rate < 0 ? ' Use a negative number for a decrease.' : ''}`,
    figure,
    parts: [linePart(ctx, rate, exact ? undefined : 1)],
    hints: ['Find the total change: last value minus first value.', `Divide the total change by the number of ${unitWord}s between the first and last points.`],
    solution: [
      `First value: $${num(first)}$. Last value: $${num(last)}$.`,
      `Total change: $${num(last)} - ${num(first)} = ${num(last - first)}$`,
      `Number of ${unitWord}s: $${ctx.xs[n - 1]} - ${ctx.xs[0]} = ${span}$`,
      `Average change: $${num(last - first)} \\div ${span} ${eq(rate)}$`,
      `The average change is ${exact ? '' : 'about '}${ctx.money ? (rate < 0 ? `−${tag(-rate)}` : tag(rate)) : `$${exact ? num(rate) : fmtFixed(rate, 1)}$ ${ctx.unit === '°C' ? '°C' : ctx.unit}`} ${ctx.per}.`,
    ],
  };
}

interface PieCtx {
  intro: (name: string, total: number) => string;
  /** Listed from the usual largest share to the usual smallest. */
  cats: string[];
  /** Largest realistic share. */
  top: number;
  t1: number[];
  t2: number[];
  money?: boolean;
  unit: string;
  ask: (c: string) => string;
  more: (a: string, b: string) => string;
  /** Difficulty 3 extra: a whole year (budget) or "not" (survey). */
  year?: (c: string) => string;
  not?: (c: string) => string;
}

const PIES: PieCtx[] = [
  {
    intro: (name, t) => `${name} takes home ${tag(t)} a month. The circle graph shows ${name}’s monthly budget.`,
    cats: ['Rent', 'Food', 'Transport', 'Savings', 'Other', 'Phone'],
    top: 50,
    t1: [2000, 3000, 4000], t2: [2400, 2650, 2850, 3150, 3300, 3450], money: true, unit: '',
    ask: (c) => `How much is budgeted for ${lower(c)} each month?`,
    more: (a, b) => `How much more is budgeted for ${lower(a)} than for ${lower(b)} each month?`,
    year: (c) => `How much is budgeted for ${lower(c)} in a whole year?`,
  },
  {
    intro: (_n, t) => `A city café took in ${tag(t)} on Saturday. The circle graph shows the sales for each kind of item.`,
    cats: ['Coffee', 'Sandwiches', 'Baked goods', 'Smoothies', 'Tea'],
    top: 60,
    t1: [1000, 1500, 2000], t2: [1850, 2240, 2460, 2750], money: true, unit: '',
    ask: (c) => `How much money came from ${lower(c)}?`,
    more: (a, b) => `How much more money came from ${lower(a)} than from ${lower(b)}?`,
    not: (c) => `How much of the money did **not** come from ${lower(c)}?`,
  },
  {
    intro: (_n, t) => `A grocery store asked $${num(t)}$ shoppers how they like to pay. The circle graph shows the results.`,
    cats: ['Debit', 'Credit', 'Phone', 'Cash', 'Gift card'],
    top: 60,
    t1: [200, 400, 500], t2: [250, 350, 450, 650], unit: 'shoppers',
    ask: (c) => `How many shoppers chose ${lower(c)}?`,
    more: (a, b) => `How many more shoppers chose ${lower(a)} than ${lower(b)}?`,
    not: (c) => `How many shoppers did **not** choose ${lower(c)}?`,
  },
  {
    intro: (_n, t) => `A family farm has $${num(t)}$ hectares of land. The circle graph shows how the land is used.`,
    cats: ['Wheat', 'Canola', 'Barley', 'Pasture', 'Peas'],
    top: 60,
    t1: [400, 500, 800], t2: [640, 720, 960, 1250], unit: 'ha',
    ask: (c) => `How many hectares are used for ${lower(c)}?`,
    more: (a, b) => `How many more hectares are used for ${lower(a)} than for ${lower(b)}?`,
    not: (c) => `How many hectares are **not** used for ${lower(c)}?`,
  },
];

const PCT_OF = 'To find a percent of an amount, change the percent to a decimal and multiply.';
const amt = (ctx: PieCtx, v: number) => (ctx.money ? tag(v) : `$${num(v)}$ ${ctx.unit === 'ha' ? 'hectares' : ctx.unit}`);
const amtPart = (ctx: PieCtx, v: number): Part => (ctx.money ? (isWhole(v) ? numPart(v, { label: '\\$' }) : moneyPart(v)) : numPart(v, { suffix: ctx.unit }));
const pctOf = (p: number, t: number) => `$${p}\\% \\times ${num(t)} = ${num(p / 100)} \\times ${num(t)} = ${num((p * t) / 100)}$`;

function pieItem(rng: Rng, d: Lvl, name: string): Out {
  const ctx = rng.pick(PIES);
  const k = d === 1 ? rng.int(3, 4) : rng.int(4, Math.min(5, ctx.cats.length));
  // Keep the usual order: the first listed category gets the largest share.
  const cats = rng.sample(ctx.cats.slice(1), k - 1).concat(ctx.cats[0]).sort((a, b) => ctx.cats.indexOf(a) - ctx.cats.indexOf(b));
  const total = rng.pick(d === 1 ? ctx.t1 : ctx.t2);
  // Counts and hectares must be whole numbers.
  const pcts = retry(
    () => percents(rng, k, d === 1 ? 5 : 1, d === 1 ? 10 : 5).sort((a, b) => b - a),
    (ps) => ps[0] <= ctx.top && (ctx.money || ps.every((p) => isWhole((p * total) / 100))),
    400,
  );
  const figure: Figure = { type: 'circleGraph', slices: cats.map((c, i) => ({ label: c, value: pcts[i] })), show: 'percent' };
  const intro = ctx.intro(name, total);
  const val = (i: number) => (pcts[i] * total) / 100;
  if (d < 3) {
    const i = rng.int(0, k - 1);
    return {
      prompt: `${intro} ${ctx.ask(cats[i])}`,
      figure,
      parts: [amtPart(ctx, val(i))],
      hints: [`Find the percent for ${cats[i]} in the legend. The whole circle is ${amt(ctx, total)}.`, PCT_OF],
      solution: [`${cats[i]} is $${pcts[i]}\\%$ of ${amt(ctx, total)}.`, pctOf(pcts[i], total), `The answer is ${amt(ctx, val(i))}.`],
    };
  }
  const mode = rng.pick(['more', ctx.year ? 'year' : 'not'] as const);
  if (mode === 'more') {
    const [i, j] = retry(() => rng.sample([...Array(k).keys()], 2), ([a, b]) => pcts[a] > pcts[b]);
    const diff = val(i) - val(j);
    return {
      prompt: `${intro} ${ctx.more(cats[i], cats[j])}`,
      figure,
      parts: [amtPart(ctx, diff)],
      hints: [PCT_OF, `Find both amounts, then subtract. Or subtract the percents first: $${pcts[i]}\\% - ${pcts[j]}\\%$.`],
      solution: [`${cats[i]}: ${pctOf(pcts[i], total)}`, `${cats[j]}: ${pctOf(pcts[j], total)}`, `Subtract: $${num(val(i))} - ${num(val(j))} = ${num(diff)}$`, `The difference is ${amt(ctx, diff)}.`],
    };
  }
  const i = rng.int(0, k - 1);
  if (mode === 'year') {
    const y = val(i) * 12;
    return {
      prompt: `${intro} ${ctx.year!(cats[i])}`,
      figure,
      parts: [amtPart(ctx, y)],
      hints: ['First find the amount for one month.', 'There are $12$ months in a year, so multiply by $12$.'],
      solution: [`One month: ${pctOf(pcts[i], total)}`, `One year: $${mv(val(i))} \\times 12 = ${mv(y)}$`, `The answer is ${amt(ctx, y)}.`],
    };
  }
  const notPct = 100 - pcts[i];
  const v = (notPct * total) / 100;
  return {
    prompt: `${intro} ${ctx.not!(cats[i])}`,
    figure,
    parts: [amtPart(ctx, v)],
    hints: [`The whole circle is $100\\%$. Find the percent that is not ${lower(cats[i])} first.`, PCT_OF],
    solution: [`Not ${lower(cats[i])}: $100\\% - ${pcts[i]}\\% = ${notPct}\\%$`, pctOf(notPct, total), `The answer is ${amt(ctx, v)}.`],
  };
}

const ANGLE_CTX: Array<{ intro: string; head: string; cats: string[]; pct: (c: string) => string }> = [
  { intro: 'A staff survey at a mountain hotel asked workers which shift they like best.', head: 'Shift', cats: ['Day', 'Evening', 'Night', 'Split'], pct: (c) => `What percent of the workers chose the ${lower(c)} shift?` },
  { intro: 'A pizza shop counted the pizzas it sold one evening.', head: 'Size', cats: ['Small', 'Medium', 'Large', 'Party'], pct: (c) => `What percent of the pizzas sold were ${lower(c)} size?` },
  { intro: 'A car wash in the city counted the washes it sold on Saturday.', head: 'Wash', cats: ['Basic', 'Deluxe', 'Premium', 'Interior'], pct: (c) => `What percent of the washes were ${lower(c)} washes?` },
  {
    intro: 'A high school asked students how they get to school.', head: 'Travel', cats: ['Bus', 'Car', 'Walk', 'Bike', 'Other'],
    pct: (c) => `What percent of the students ${({ Bus: 'take the bus', Car: 'come by car', Walk: 'walk', Bike: 'ride a bike', Other: 'chose “Other”' } as Record<string, string>)[c]}?`,
  },
];

function angleItem(rng: Rng, d: Lvl): Out {
  const ctx = rng.pick(ANGLE_CTX);
  const k = Math.min(rng.int(3, 4), ctx.cats.length);
  const cats = ctx.cats.slice(0, k);
  const hints = ['A full circle has $360^\\circ$.', 'The slice angle is the same part of $360^\\circ$ as the category is of the whole.'];
  if (d === 2) {
    const pcts = percents(rng, k, 5, 10);
    const i = rng.int(0, k - 1);
    const ang = (pcts[i] * 360) / 100;
    return {
      prompt: `${ctx.intro} The table shows the results as percents. To draw a circle graph, how many degrees should the ${lower(cats[i])} slice be?`,
      figure: { type: 'table', headers: [ctx.head, 'Percent'], rows: cats.map((c, j) => [c, `${pcts[j]}%`]) },
      parts: [numPart(ang, { suffix: '°' })],
      hints,
      solution: [`${cats[i]} is $${pcts[i]}\\%$ of the circle.`, `$${pcts[i]}\\%$ of $360^\\circ$: $${num(pcts[i] / 100)} \\times 360 = ${num(ang)}$`, `The ${lower(cats[i])} slice should be $${num(ang)}^\\circ$.`],
    };
  }
  const total = rng.pick([36, 40, 60, 72, 90, 120, 180]);
  const counts = retry(
    () => {
      const cuts = rng.sample([...Array(total - 1).keys()].map((x) => x + 1), k - 1).sort((a, b) => a - b);
      return [...cuts, total].map((c, j) => c - (j ? cuts[j - 1] : 0));
    },
    (cs) => cs.every((c) => c >= total / 12 && c <= total / 2) && new Set(cs).size === cs.length,
    300,
  );
  const i = rng.int(0, k - 1);
  const ang = (counts[i] * 360) / total;
  return {
    prompt: `${ctx.intro} The table shows the counts. To draw a circle graph, how many degrees should the ${lower(cats[i])} slice be?`,
    figure: { type: 'table', headers: [ctx.head, 'Count'], rows: cats.map((c, j) => [c, String(counts[j])]) },
    parts: [numPart(ang, { suffix: '°' })],
    hints: ['First add the counts to find the total.', 'Slice angle $= \\dfrac{\\text{count}}{\\text{total}} \\times 360^\\circ$'],
    solution: [`Total: $${plus(counts)} = ${total}$`, `${cats[i]}: $${fr(counts[i], total)} \\times 360 = ${num(ang)}$`, `The ${lower(cats[i])} slice should be $${num(ang)}^\\circ$.`],
  };
}

const COUNT_CTX: Array<{ whole: (t: number) => string; part: string; q: string }> = [
  { whole: (t) => `A food truck served $${t}$ customers at lunch.`, part: 'paid with cash', q: 'What percent of the customers paid with cash?' },
  { whole: (t) => `A hiring manager got $${t}$ job applications.`, part: 'came from people with a full driver’s licence', q: 'What percent of the applications came from people with a driver’s licence?' },
  { whole: (t) => `A lakeside hotel had $${t}$ rooms booked last night.`, part: 'were booked online', q: 'What percent of the rooms were booked online?' },
  { whole: (t) => `A warehouse shipped $${t}$ orders on Monday.`, part: 'went to addresses in the city', q: 'What percent of the orders went to addresses in the city?' },
  { whole: (t) => `A landscaping company has $${t}$ regular customers.`, part: 'want weekly mowing', q: 'What percent of the customers want weekly mowing?' },
];

function percentCountItem(rng: Rng, d: Lvl): Out {
  if (d === 1) {
    const ctx = rng.pick(COUNT_CTX);
    const t = rng.pick([20, 25, 40, 50, 200]);
    const c = retry(() => rng.int(Math.ceil(t * 0.1), Math.floor(t * 0.9)), (x) => isWhole((x * 100) / t));
    const p = (c * 100) / t;
    return {
      prompt: `${ctx.whole(t)} Of these, $${c}$ ${ctx.part}. ${ctx.q}`,
      parts: [pctPart(p)],
      hints: ['Write the part over the whole as a fraction.', 'Divide, then multiply by $100$ to get a percent.'],
      solution: [`Fraction: $${fr(c, t)}$`, `Divide: $${c} \\div ${t} = ${num(c / t)}$`, `Multiply by $100$: $${num(c / t)} \\times 100 = ${num(p)}\\%$`, `The answer is $${num(p)}\\%$.`],
    };
  }
  if (d === 2) {
    const ctx = rng.pick(ANGLE_CTX);
    const k = Math.min(rng.int(3, 4), ctx.cats.length);
    const cats = ctx.cats.slice(0, k);
    const { counts, i } = retry(
      () => {
        const counts = cats.map(() => rng.int(8, 60));
        return { counts, i: rng.int(0, k - 1) };
      },
      (o) => new Set(o.counts).size === k && !onEdge((o.counts[o.i] * 100) / sum(o.counts), 0),
      300,
    );
    const t = sum(counts);
    const p = (counts[i] * 100) / t;
    return {
      prompt: `${ctx.intro} The table shows the counts. ${ctx.pct(cats[i])}${isWhole(p) ? '' : ' Round to the nearest whole percent.'}`,
      figure: { type: 'table', headers: [ctx.head, 'Count'], rows: cats.map((c, j) => [c, String(counts[j])]) },
      parts: [pctPart(p)],
      hints: ['First add all the counts to find the total.', 'Percent $= \\dfrac{\\text{part}}{\\text{total}} \\times 100$'],
      solution: [`Total: $${plus(counts)} = ${t}$`, `$${fr(counts[i], t)} \\times 100 ${eq(p)}$`, `The answer is ${pctText(p)}.`],
    };
  }
  // d3: percent of a bar graph's total.
  const ctx = rng.pick([
    { intro: 'The bar graph shows how many cars a car wash washed each day last week.', cats: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], label: 'Cars washed', cl: 'Day', what: (c: string) => `What percent of the week’s cars were washed on ${({ Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday' } as Record<string, string>)[c]}?` },
    { intro: 'The bar graph shows the number of each kind of pizza a shop sold on Friday.', cats: ['Cheese', 'Pepperoni', 'Hawaiian', 'Veggie', 'Meat'], label: 'Pizzas sold', cl: 'Pizza', what: (c: string) => `What percent of the pizzas sold were ${c === 'Hawaiian' ? 'Hawaiian' : lower(c)}?` },
    { intro: 'The bar graph shows how many hours each employee at a hardware store worked last week.', cats: ['Ava', 'Ben', 'Chen', 'Dina', 'Eli', 'Femi'], label: 'Hours worked', cl: 'Employee', what: (c: string) => `What percent of all the hours did ${c} work?` },
  ]);
  const step = 10;
  const n = ctx.cats.length;
  const [lo, hi] = ctx.label === 'Hours worked' ? [3, 9] : [2, 11];
  const { vs, i } = retry(
    () => ({ vs: ctx.cats.map(() => 5 * rng.int(lo, hi)), i: rng.int(0, n - 1) }),
    (o) => !onEdge((o.vs[o.i] * 100) / sum(o.vs), 0) && o.vs.some((v) => v % 10 !== 0),
    300,
  );
  const t = sum(vs);
  const p = (vs[i] * 100) / t;
  const max = (Math.floor(Math.max(...vs) / step) + 1) * step;
  return {
    prompt: `${ctx.intro} ${ctx.what(ctx.cats[i])}${isWhole(p) ? '' : ' Round to the nearest whole percent.'}`,
    figure: { type: 'barChart', categories: ctx.cats, values: vs, valueLabel: ctx.label, categoryLabel: ctx.cl, max, step },
    parts: [pctPart(p)],
    hints: ['Read every bar and add them to find the total.', 'Percent $= \\dfrac{\\text{one bar}}{\\text{total}} \\times 100$'],
    solution: [`Read the bars: ${ctx.cats.map((c, j) => `${c} $${vs[j]}$`).join(', ')}.`, `Total: $${plus(vs)} = ${t}$`, `$${fr(vs[i], t)} \\times 100 ${eq(p)}$`, `The answer is ${pctText(p)}.`],
  };
}

const displayData = skill({
  id: 'm204-display-data',
  name: 'Reading and making graphs',
  description: 'Read line graphs and circle graphs, find an amount from a circle-graph percent, find a percent from counts, and find the angle for a circle-graph slice.',
  outcomes: ['SP1'],
  lessonId: 'm204-9-1',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    const kind = d === 1
      ? rng.pick(['line', 'pie', 'count'] as const)
      : rng.weighted([['line', 3], ['pie', 3], ['count', 2], ['angle', 2]] as const);
    if (kind === 'line') return lineItem(rng, d, name);
    if (kind === 'pie') return pieItem(rng, d, name);
    if (kind === 'angle') return angleItem(rng, d);
    return percentCountItem(rng, d);
  },
});

// ---------------------------------------------------------------------------
// 9.2 Analyzing data: comparing data sets, outliers and the best measure
// ---------------------------------------------------------------------------

interface CmpCtx {
  intro: (a: string, b: string, n: number) => string;
  rowHead: string;
  row: (i: number) => string;
  r: [number, number];
  money?: boolean;
  unit: string;
  noun: string;
}

const CMP: CmpCtx[] = [
  {
    intro: (a, b, n) => `${a} and ${b} are servers at a downtown restaurant. The table shows their tips for the last $${n}$ shifts.`,
    rowHead: 'Shift', row: (i) => String(i + 1), r: [30, 95], money: true, unit: '', noun: 'tips per shift',
  },
  {
    intro: (a, b, n) => `${a} and ${b} bowl in a local league. The table shows their scores for $${n}$ games.`,
    rowHead: 'Game', row: (i) => String(i + 1), r: [95, 205], unit: 'points', noun: 'score',
  },
  {
    intro: (a, b, n) => `${a} and ${b} drive for a delivery company. The table shows how many minutes their last $${n}$ deliveries took.`,
    rowHead: 'Delivery', row: (i) => String(i + 1), r: [18, 46], unit: 'min', noun: 'delivery time',
  },
  {
    intro: (a, b, n) => `${a} and ${b} sell phones at a store in the mall. The table shows how many phones each sold on $${n}$ days.`,
    rowHead: 'Day', row: (i) => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i], r: [2, 16], unit: 'phones', noun: 'number of phones sold per day',
  },
  {
    intro: (a, b, n) => `${a} and ${b} are apprentices. The table shows their marks on $${n}$ safety quizzes, each out of $20$.`,
    rowHead: 'Quiz', row: (i) => String(i + 1), r: [9, 20], unit: 'marks', noun: 'quiz mark',
  },
];

/** n whole values in range whose mean is a whole number. */
function wholeMean(rng: Rng, n: number, lo: number, hi: number): number[] {
  return retry(
    () => {
      const vs = Array.from({ length: n - 1 }, () => rng.int(lo, hi));
      const m = Math.round(sum(vs) / (n - 1)) + rng.int(-2, 2);
      vs.push(m * n - sum(vs));
      return rng.shuffle(vs);
    },
    (vs) => vs.every((v) => v >= lo && v <= hi),
    300,
  );
}

const cmpVal = (ctx: CmpCtx, v: number) => (ctx.money ? tag(v) : `$${num(v)}$ ${ctx.unit}`);
const cmpPart = (ctx: CmpCtx, v: number, label: string, decimals?: number): Part =>
  ctx.money
    ? decimals === 2 ? { ...moneyPart(v), label: `${label}: \\$` } : numPart(v, { label: `${label}: \\$` })
    : numPart(v, { label: `${label}:`, suffix: ctx.unit, decimals });

function compareSets(rng: Rng, d: Lvl, a: string, b: string): Out {
  const ctx = rng.pick(CMP);
  const n = d === 1 ? 5 : 6;
  const measure = d === 1 ? rng.pick(['mean', 'median'] as const) : 'median';
  const [lo, hi] = ctx.r;
  const make = () => (measure === 'mean' ? wholeMean(rng, n, lo, hi) : Array.from({ length: n }, () => rng.int(lo, hi)));
  const { A, B } = retry(() => ({ A: make(), B: make() }), (o) => (measure === 'mean' ? sum(o.A) / n !== sum(o.B) / n : median(o.A) !== median(o.B)), 200);
  const figure: Figure = { type: 'table', headers: [ctx.rowHead, a, b], rows: A.map((v, i) => [ctx.row(i), ctx.money ? `$${v}` : String(v), ctx.money ? `$${B[i]}` : String(B[i])]) };
  const f = measure === 'mean' ? (x: number[]) => sum(x) / n : median;
  const steps = (who: string, x: number[]) =>
    measure === 'mean'
      ? `${who}: $(${plus(x)}) \\div ${n} = ${num(sum(x))} \\div ${n} = ${num(f(x))}$`
      : `${who}: in order ${listTex(asc(x))}. ${n % 2 ? `The middle value is $${num(f(x))}$.` : `Halfway between $${num(asc(x)[n / 2 - 1])}$ and $${num(asc(x)[n / 2])}$ is $${num(f(x))}$.`}`;
  return {
    prompt: `${ctx.intro(a, b, n)} Find the **${measure}** ${ctx.noun} for each person.`,
    figure,
    parts: [cmpPart(ctx, f(A), a), cmpPart(ctx, f(B), b)],
    hints: measure === 'mean' ? ['Mean: add the values, then divide by how many there are.', `Do this for each column. Each person has $${n}$ values.`] : ['Median: put the values in order and find the middle.', 'With an even number of values, the median is halfway between the two middle values.'],
    solution: [steps(a, A), steps(b, B), `${a}: ${cmpVal(ctx, f(A))}. ${b}: ${cmpVal(ctx, f(B))}. ${f(A) > f(B) ? a : b} has the higher ${measure}.`],
  };
}

interface OutlierCtx {
  /** Ends with a sentence that leads into the data list. */
  intro: (name: string, n: number) => string;
  /** "a typical delivery time" */
  typ: string;
  r: [number, number];
  out: [number, number];
  money?: boolean;
  unit: string;
  noun: string;
  why: string;
}

const OUTLIERS: OutlierCtx[] = [
  {
    intro: (name, n) => `${name} drives for a delivery company. One of ${name}’s last $${n}$ deliveries was during a snowstorm. Here are the times, in minutes:`,
    typ: 'a typical delivery time',
    r: [18, 34], out: [70, 95], unit: 'min', noun: 'delivery time', why: 'the snowstorm delivery',
  },
  {
    intro: (_name, n) => `A food truck in the city recorded its sales for $${n}$ days. One of the days was during a big music festival. The daily sales were:`,
    typ: 'a typical day’s sales',
    r: [420, 690], out: [1850, 2400], money: true, unit: '', noun: 'daily sales', why: 'the festival day',
  },
  {
    intro: (name, n) => `${name} bowled $${n}$ games in a league. In one game, ${name} had a sore wrist. The scores were:`,
    typ: 'a typical score',
    r: [142, 186], out: [58, 85], unit: 'points', noun: 'score', why: 'the sore-wrist game',
  },
  {
    intro: (name, n) => `${name} is a server at a restaurant. On one of the last $${n}$ shifts, ${name} served a big wedding party. Here are ${name}’s tips for those shifts:`,
    typ: 'a typical shift’s tips',
    r: [38, 72], out: [210, 260], money: true, unit: '', noun: 'amount of tips per shift', why: 'the wedding-party shift',
  },
  {
    intro: (_name, n) => `A small landscaping company has $${n}$ people, and one of them is the owner. Here are their hourly wages:`,
    typ: 'a typical hourly wage',
    r: [16, 22], out: [55, 70], money: true, unit: '', noun: 'hourly wage', why: 'the owner’s wage',
  },
];

const oVal = (ctx: OutlierCtx, v: number) => (ctx.money ? tag(v) : `$${num(v)}$ ${ctx.unit}`);
const oList = (ctx: OutlierCtx, vs: number[]) => (ctx.money ? vs.map(tag).join(', ') : listTex(vs));

function outlierData(rng: Rng, ctx: OutlierCtx, n: number, dp: number): number[] {
  return retry(
    () => rng.shuffle([...Array.from({ length: n - 1 }, () => rng.int(ctx.r[0], ctx.r[1])), rng.int(ctx.out[0], ctx.out[1])]),
    (vs) => !onEdge(sum(vs) / n, dp) && !isWhole(sum(vs) / n) && !onEdge((sum(vs) - outOf(ctx, vs)) / (n - 1), dp),
    300,
  );
}
const outOf = (ctx: OutlierCtx, vs: number[]) => (ctx.out[0] > ctx.r[1] ? Math.max(...vs) : Math.min(...vs));

function outlierEffect(rng: Rng, name: string): Out {
  const ctx = rng.pick(OUTLIERS);
  const n = rng.int(7, 8);
  const dp = ctx.money ? 2 : 1;
  const vs = outlierData(rng, ctx, n, dp);
  const o = outOf(ctx, vs);
  const rest = vs.filter((_, i) => i !== vs.indexOf(o));
  const m1 = sum(vs) / n;
  const m2 = sum(rest) / (n - 1);
  const round = ctx.money ? 'to the nearest cent' : 'to the nearest tenth';
  const part = (v: number, label: string): Part => (ctx.money ? { ...moneyPart(v), label: `${label}: \\$` } : numPart(v, { decimals: 1, suffix: ctx.unit, label: `${label}:` }));
  return {
    prompt: `${ctx.intro(name, n)} ${oList(ctx, vs)}. Find the mean ${ctx.noun} with ${ctx.why} and without it. Round ${round}.`,
    parts: [part(m1, 'With'), part(m2, 'Without')],
    hints: ['Mean = total ÷ number of values.', `For “without”, leave out ${oVal(ctx, o)} and divide by $${n - 1}$ instead of $${n}$.`],
    solution: [
      `With: $${plus(vs)} = ${num(sum(vs))}$, and $${num(sum(vs))} \\div ${n} ${eq(m1)}$`,
      `Without: $${num(sum(vs))} - ${num(o)} = ${num(sum(rest))}$, and $${num(sum(rest))} \\div ${n - 1} ${eq(m2)}$`,
      `With ${ctx.why}, the mean is about ${ctx.money ? money(m1) : `$${fmtFixed(m1, 1)}$ ${ctx.unit}`}. Without it, the mean is about ${ctx.money ? money(m2) : `$${fmtFixed(m2, 1)}$ ${ctx.unit}`}. One outlier moves the mean a lot.`,
    ],
  };
}

const MEASURE_SCENES: Array<{ text: string; correct: string; wrong: string[] }> = [
  {
    text: 'A shoe store in a northern town wants to know which size of work boot to order the most of.',
    correct: 'The mode, because it is the size that sells most often',
    wrong: ['The mean, because it uses every size', 'The range, because it shows the spread of sizes', 'The median, because one size is an outlier'],
  },
  {
    text: 'A pizza shop wants to know which topping to keep the most of in stock.',
    correct: 'The mode, because it is the topping chosen most often',
    wrong: ['The mean, because it adds up all the toppings', 'The median, because it is the middle topping', 'The range, because it shows how many toppings there are'],
  },
  {
    text: 'A manager wants to describe a typical hourly wage at a small shop. Most workers earn about \\$17 an hour, but the owner earns \\$65 an hour.',
    correct: 'The median, because the owner’s wage pulls the mean up',
    wrong: ['The mean, because the owner’s wage makes it more accurate', 'The mode, because it is always the highest wage', 'The range, because it shows a typical wage'],
  },
  {
    text: 'A real estate agent wants to describe a typical house price on one street in a town. Most houses sold for about \\$350 000, but one large house sold for \\$1 200 000.',
    correct: 'The median, because the one very high price pulls the mean up',
    wrong: ['The mean, because the high price makes it more accurate', 'The mode, because every price is different', 'The range, because it is the middle price'],
  },
  {
    text: 'A warehouse supervisor wants a typical number of boxes packed per hour. The counts for six hours were $52$, $55$, $49$, $51$, $54$ and $53$.',
    correct: 'The mean, because the values are close together with no outliers',
    wrong: ['The median, because one count is much bigger than the rest', 'The mode, because $55$ appears most often', 'The range, because it is the middle value'],
  },
  {
    text: 'A coach wants a typical number of points per game for a player. The points in eight games were $12$, $14$, $13$, $15$, $14$, $12$, $13$ and $15$.',
    correct: 'The mean, because the values are close together with no outliers',
    wrong: ['The median, because one game is an outlier', 'The range, because it shows the most common score', 'The mode, because there is only one mode'],
  },
];

function bestMeasureMc(rng: Rng): Out {
  const sc = rng.pick(MEASURE_SCENES);
  return {
    prompt: `${sc.text} Which measure is best to use, and why?`,
    parts: [{ answer: mc(rng, sc.correct, sc.wrong) }],
    hints: ['Mean: values close together, no outliers. Median: there is an outlier. Mode: the most common item or size.', 'Check that the reason is true for this data.'],
    solution: ['Use the **mean** when the values are close together, the **median** when there is an outlier, and the **mode** for the most common item or size.', `The best answer is: ${sc.correct}.`],
    answerDisplay: sc.correct,
  };
}

function typicalThreeStep(rng: Rng, name: string): Out {
  const ctx = rng.pick(OUTLIERS);
  const n = rng.int(7, 8);
  const dp = ctx.money ? 2 : 1;
  const vs = outlierData(rng, ctx, n, dp);
  const m = sum(vs) / n;
  const med = median(vs);
  const high = ctx.out[0] > ctx.r[1];
  const s = asc(vs);
  const others = high ? s.slice(0, -1) : s.slice(1);
  const round = ctx.money ? 'to the nearest cent' : 'to the nearest tenth';
  const correct = `The median, because ${ctx.why} pulls the mean ${high ? 'up' : 'down'}`;
  const choice = mc(rng, correct, [
    `The mean, because ${ctx.why} makes it more accurate`,
    `The median, because it is always ${high ? 'bigger' : 'smaller'} than the mean`,
    'The mean, because it is the middle value',
  ]);
  const medPart: Part = ctx.money ? { ...numPart(med, { label: 'Median: \\$' }) } : numPart(med, { label: 'Median:', suffix: ctx.unit });
  const meanPart: Part = ctx.money ? { ...moneyPart(m), label: 'Mean: \\$' } : numPart(m, { decimals: 1, label: 'Mean:', suffix: ctx.unit });
  return {
    prompt: `${ctx.intro(name, n)} ${oList(ctx, vs)}. Find the mean (round ${round}) and the median. Then decide which one better describes ${ctx.typ}.`,
    parts: [meanPart, medPart, { label: 'Better measure:', answer: choice }],
    hints: ['Mean: add and divide. Median: put the values in order and find the middle.', 'An outlier pulls the mean toward it, but it barely moves the median.'],
    solution: [
      `Mean: $${plus(vs)} = ${num(sum(vs))}$, and $${num(sum(vs))} \\div ${n} ${eq(m)}$`,
      `Median: in order ${listTex(s)}. ${n % 2 ? `The middle value is $${num(med)}$.` : `Halfway between $${num(s[n / 2 - 1])}$ and $${num(s[n / 2])}$ is $${num(med)}$.`}`,
      `Without ${ctx.why}, the values are between ${oVal(ctx, Math.min(...others))} and ${oVal(ctx, Math.max(...others))}. The median, ${oVal(ctx, med)}, is in that range. The mean, about ${ctx.money ? money(m) : `$${fmtFixed(m, 1)}$ ${ctx.unit}`}, is pulled ${high ? 'up' : 'down'} by ${ctx.why}.`,
      `Mean ≈ ${ctx.money ? money(m) : `$${fmtFixed(m, 1)}$`}, median = ${oVal(ctx, med)}. The better measure is: ${correct}.`,
    ],
  };
}

const analyzeData = skill({
  id: 'm204-analyze-data',
  name: 'Comparing data and choosing a measure',
  description: 'Compare two data sets with the mean and median, see the effect of an outlier, and choose the measure that best describes the data.',
  outcomes: ['SP1'],
  lessonId: 'm204-9-2',
  calculator: true,
  gen(rng, d) {
    const [a, b] = rng.sample(NAMES, 2);
    if (d === 1) return compareSets(rng, 1, a, b);
    if (d === 2) {
      const kind = rng.pick(['compare', 'outlier', 'outlier', 'measure'] as const);
      return kind === 'compare' ? compareSets(rng, 2, a, b) : kind === 'outlier' ? outlierEffect(rng, a) : bestMeasureMc(rng);
    }
    return typicalThreeStep(rng, a);
  },
});

// ---------------------------------------------------------------------------
// 9.2 Misleading graphs and claims
// ---------------------------------------------------------------------------

type Flaw = 'axis' | 'small' | 'biased' | 'cherry' | 'unequal' | 'over100' | 'picture' | 'outlier';
const FLAW_REASON: Record<Flaw, string> = {
  axis: 'The vertical axis does not start at $0$, so small differences look big.',
  small: 'The sample is too small to trust.',
  biased: 'The people asked are not a fair sample of everyone.',
  cherry: 'It shows only the part of the data that supports the claim.',
  unequal: 'The time gaps on the axis are not equal, but they are drawn the same width.',
  over100: 'The percents add up to more than $100\\%$, so they cannot be parts of one whole.',
  picture: 'The bigger picture is wider as well as taller, so it looks much more than twice as big.',
  outlier: 'One very large value pulls the mean up, so the “average” is not typical.',
};
/** Flaws that can be true at the same time are never used as each other's wrong answers. */
const CLASH: Partial<Record<Flaw, Flaw[]>> = { small: ['biased'], biased: ['small'], axis: ['picture'], picture: ['axis'] };

const CLAIMS: Array<{ flaw: Flaw; text: string }> = [
  { flaw: 'small', text: 'An ad for an energy drink says “4 out of 5 people prefer our drink!” The company asked $5$ people.' },
  { flaw: 'small', text: 'A gym says “$100\\%$ of our members lost weight!” It asked $3$ members.' },
  { flaw: 'small', text: 'A car lot’s sign says “Customers love us: 2 out of 2 gave us 5 stars!”' },
  { flaw: 'biased', text: 'A pizza shop says “$90\\%$ of people prefer our pizza.” It surveyed only customers eating in its own restaurant.' },
  { flaw: 'biased', text: 'A survey about building a new hockey arena in town asked only people leaving a hockey game. It says $85\\%$ of people want the arena.' },
  { flaw: 'biased', text: 'A radio station says most people in the city love country music. It asked only listeners who called in to its country show.' },
  { flaw: 'cherry', text: 'A company’s report shows a graph of sales from March to June, when sales went up. It leaves out the rest of the year, when sales fell.' },
  { flaw: 'cherry', text: 'A hockey team posts the stats from its $3$ best games and says “We score $6$ goals a game!”' },
  { flaw: 'cherry', text: 'A store ad says “Prices are down $20\\%$!” It compares this week with the one week last year when prices were highest.' },
  { flaw: 'unequal', text: 'A line graph of a town’s population shows the years 2000, 2010, 2020, 2022 and 2024, spaced the same distance apart. The line looks like it suddenly shot up.' },
  { flaw: 'unequal', text: 'A graph of gas prices shows January, February, March, July and December, spaced the same distance apart.' },
  { flaw: 'over100', text: 'A circle graph about how workers get to a warehouse shows Car $55\\%$, Bus $30\\%$ and Walk $25\\%$.' },
  { flaw: 'over100', text: 'A circle graph of a monthly budget shows Rent $45\\%$, Food $35\\%$, Transport $20\\%$ and Savings $15\\%$.' },
  { flaw: 'picture', text: 'A poster shows a small coffee cup for last year’s sales and a cup twice as tall and twice as wide for this year’s sales. Sales doubled.' },
  { flaw: 'picture', text: 'An ad shows a small truck for 2023 and a truck twice as tall and twice as wide for 2024 to show that deliveries doubled.' },
  { flaw: 'outlier', text: 'A company says its “average” wage is \\$38 an hour. Nine workers earn \\$18 an hour, and the owner earns \\$220 an hour.' },
  { flaw: 'outlier', text: 'An ad says the average house price on a street is \\$615 000. Nine houses sold for \\$350 000, and one mansion sold for \\$3 000 000.' },
  { flaw: 'axis', text: 'A bar graph compares sales this year and last year. The vertical axis starts at \\$95 000, so this year’s bar looks three times as tall as last year’s.' },
];

function reasonChoices(rng: Rng, flaw: Flaw) {
  const others = (Object.keys(FLAW_REASON) as Flaw[]).filter((f) => f !== flaw && !(CLASH[flaw] ?? []).includes(f));
  return mc(rng, FLAW_REASON[flaw], rng.sample(others, 3).map((f) => FLAW_REASON[f]));
}

interface Broken {
  figure: PlaneFigure;
  intro: string;
  xs: number[];
  vs: number[];
  base: number;
  unit: string;
  what: string;
}

/** A graph whose vertical axis starts well above 0: bars drawn as rectangles, or a line. */
function brokenGraph(rng: Rng, line: boolean): Broken {
  const ctx = rng.pick([
    { intro: 'A car dealership made this graph of the cars it sold each year.', base: 90, step: 2, unit: 'cars', what: 'Cars sold', label: 'Cars sold' },
    { intro: 'A gym put this graph of its members on a poster.', base: 450, step: 10, unit: 'members', what: 'Members', label: 'Members' },
    { intro: 'A bakery made this graph of the loaves of bread it sold each year.', base: 1800, step: 40, unit: 'loaves', what: 'Loaves sold', label: 'Loaves sold' },
    { intro: 'A mountain hotel made this graph of the rooms it booked each year.', base: 180, step: 4, unit: 'rooms', what: 'Rooms booked', label: 'Rooms booked' },
  ]);
  const xs = line ? [2019, 2020, 2021, 2022, 2023, 2024] : [2021, 2022, 2023, 2024];
  const n = xs.length;
  const vs = retry(
    () => {
      const out = [ctx.base + ctx.step * rng.int(1, 2)];
      for (let i = 1; i < n; i++) out.push(out[i - 1] + ctx.step * rng.int(0, Math.ceil(7 / (n - 1)) + 1));
      return out;
    },
    (v) => v[n - 1] <= ctx.base + 9 * ctx.step && v[n - 1] - ctx.base >= 3 * (v[0] - ctx.base) && v[n - 1] > v[0],
    300,
  );
  const top = ctx.base + 10 * ctx.step;
  const figure: PlaneFigure = line
    ? {
      type: 'plane',
      grid: { xMin: xs[0], xMax: xs[n - 1], yMin: ctx.base, yMax: top, xStep: 1, yStep: ctx.step, xLabel: 'Year', yLabel: ctx.label },
      polylines: [{ points: xs.map((x, i) => [x, vs[i]] as [number, number]) }],
      points: xs.map((x, i) => ({ x, y: vs[i] })),
    }
    : {
      type: 'plane',
      grid: { xMin: xs[0] - 0.6, xMax: xs[n - 1] + 0.6, yMin: ctx.base, yMax: top, xStep: 1, yStep: ctx.step, xLabel: 'Year', yLabel: ctx.label },
      polylines: xs.map((x, i) => ({ points: [[x - 0.3, ctx.base], [x - 0.3, vs[i]], [x + 0.3, vs[i]], [x + 0.3, ctx.base]] as Array<[number, number]> })),
    };
  return { figure, intro: ctx.intro, xs, vs, base: ctx.base, unit: ctx.unit, what: ctx.what };
}

function brokenWhy(rng: Rng): Out {
  const g = brokenGraph(rng, rng.chance(0.4));
  return {
    prompt: `${g.intro} It makes the growth look huge. Why is this graph misleading?`,
    figure: g.figure,
    parts: [{ answer: reasonChoices(rng, 'axis') }],
    hints: ['Look at the number at the bottom of the vertical axis.', 'If the axis does not start at $0$, the bars or the line are cut off at the bottom.'],
    solution: [
      `The vertical axis starts at $${num(g.base)}$, not at $0$.`,
      `The real change is from $${num(g.vs[0])}$ to $${num(g.vs[g.vs.length - 1])}$, only $${num(g.vs[g.vs.length - 1] - g.vs[0])}$ ${g.unit}. Cutting off the bottom makes it look much bigger.`,
      `The answer is: ${FLAW_REASON.axis}`,
    ],
    answerDisplay: FLAW_REASON.axis,
  };
}

function brokenTruth(rng: Rng): Out {
  const g = brokenGraph(rng, false);
  const a = g.vs[0];
  const b = g.vs[g.vs.length - 1];
  const x0 = g.xs[0];
  const x1 = g.xs[g.xs.length - 1];
  const pct = ((b - a) / a) * 100;
  const looks = Math.round((b - g.base) / (a - g.base));
  const pctTxt = pct < 1 ? 'less than 1' : String(Math.round(pct));
  const correct = `${g.what} went up by only $${num(b - a)}$, about ${pctTxt}%.`;
  const ds = [
    `${g.what} in ${x1} were about $${looks}$ times ${g.what.toLowerCase()} in ${x0}.`,
    `${g.what} more than doubled from ${x0} to ${x1}.`,
    `${g.what} went up by $${num(b - g.base)}$ from ${x0} to ${x1}.`,
  ];
  return {
    prompt: `${g.intro} The ${x1} bar looks about $${looks}$ times as tall as the ${x0} bar. Read the graph. Which statement is true?`,
    figure: g.figure,
    parts: [{ answer: mc(rng, correct, ds) }],
    hints: ['Read the real values of the first and last bars from the scale. Notice where the scale starts.', 'Find the increase, then compare it with the first value to get a percent.'],
    solution: [
      `The axis starts at $${num(g.base)}$, not $0$. The bars are cut off at the bottom.`,
      `${x0}: $${num(a)}$. ${x1}: $${num(b)}$. Increase: $${num(b)} - ${num(a)} = ${num(b - a)}$`,
      `Percent increase: $${num(b - a)} \\div ${num(a)} \\times 100 \\approx ${fmtFixed(pct, 1)}\\%$`,
      `The true statement is: ${correct}`,
    ],
    answerDisplay: correct,
  };
}

function averageClaim(rng: Rng): Out {
  const staff = rng.int(7, 10);
  const lo = rng.int(16, 19);
  const wages = Array.from({ length: staff }, () => lo + rng.int(0, 3));
  const boss = rng.pick([95, 110, 120, 140, 160]);
  const all = [...wages, boss];
  const m = sum(all) / all.length;
  const med = median(all);
  const mTxt = money(roundTo(m, 2));
  const correct = `The median wage is ${tag(med)}. Most workers earn much less than ${mTxt}.`;
  const ds = [
    `Most workers earn more than ${mTxt}, because that is the average.`,
    `The mean is the best typical wage, because it uses every wage.`,
    `The median wage is ${mTxt}, the same as the mean.`,
  ];
  const figure: Figure = { type: 'table', headers: ['Worker', 'Hourly wage'], rows: all.map((w, i) => [i === all.length - 1 ? 'Owner' : `Worker ${i + 1}`, `$${w}`]) };
  return {
    prompt: `A small cleaning company says its “average” hourly wage is ${mTxt}. The table shows every wage, including the owner’s. Which statement is true?`,
    figure,
    parts: [{ answer: mc(rng, correct, ds) }],
    hints: ['Find the median: put the wages in order and find the middle.', 'Compare the median with the “average”. Which is closer to what most workers earn?'],
    solution: [
      `Mean: $${plus(all)} = ${sum(all)}$, and $${sum(all)} \\div ${all.length} ${eq(m)}$`,
      `Median: in order ${listTex(asc(all))}. ${all.length % 2 ? `The middle value is $${num(med)}$.` : `Halfway between the two middle values is $${num(med)}$.`}`,
      `The owner’s wage of ${tag(boss)} pulls the mean up. The claim is misleading.`,
      `The true statement is: ${correct}`,
    ],
    answerDisplay: correct,
  };
}

const misleadingGraph = skill({
  id: 'm204-misleading-graph',
  name: 'Misleading graphs and claims',
  description: 'Explain how a graph or a claim can mislead: a broken axis, unequal intervals, a tiny or biased sample, cherry-picked data or a misleading average.',
  outcomes: ['SP1'],
  lessonId: 'm204-9-2',
  format: 'mc',
  calculator: true,
  gen(rng, d) {
    if (d === 1) {
      if (rng.chance(0.6)) return brokenWhy(rng);
      const c = rng.pick(CLAIMS.filter((x) => x.flaw === 'small' || x.flaw === 'over100'));
      return claimItem(rng, c);
    }
    if (d === 2) return claimItem(rng, rng.pick(CLAIMS));
    return rng.chance(0.6) ? brokenTruth(rng) : averageClaim(rng);
  },
});

function claimItem(rng: Rng, c: { flaw: Flaw; text: string }): Out {
  return {
    prompt: `${c.text} What makes this misleading?`,
    parts: [{ answer: reasonChoices(rng, c.flaw) }],
    hints: ['Ask: Who was asked, and how many? What data is shown or left out? Is the graph drawn fairly?', 'Check each answer against the facts in the question. Only one fits.'],
    solution: [`Look at the facts: ${c.text.replace(/“|”/g, '"')}`, `The problem is: ${FLAW_REASON[c.flaw]}`],
    answerDisplay: FLAW_REASON[c.flaw],
  };
}

// ---------------------------------------------------------------------------
// 9.3 Theoretical and experimental probability
// ---------------------------------------------------------------------------

const PROB = 'Theoretical probability $= \\dfrac{\\text{favourable outcomes}}{\\text{total outcomes}}$';
const EXP = 'Experimental probability $= \\dfrac{\\text{number of times it happened}}{\\text{number of trials}}$';
const PREDICT = 'Expected number $=$ probability $\\times$ number of trials';

function predictTheory(rng: Rng, d: Lvl, name: string): Out {
  if (d === 1) {
    const ev = rng.pick([
      () => { const k = rng.pick([4, 5, 8]); const t = k * rng.int(5, 15); return { text: `A spinner has $${k}$ equal sections, and one of them is red. ${name} spins it $${t}$ times.`, q: 'red', f: 1, tot: k, t }; },
      () => { const t = 6 * rng.int(5, 20); const face = rng.int(1, 6); return { text: `${name} rolls a regular die $${t}$ times.`, q: `a ${face}`, f: 1, tot: 6, t }; },
      () => { const t = 2 * rng.int(15, 60); return { text: `${name} flips a coin $${t}$ times.`, q: 'heads', f: 1, tot: 2, t }; },
    ])();
    const e = (ev.f * ev.t) / ev.tot;
    return {
      prompt: `${ev.text} About how many times should ${name} expect to get ${ev.q}?`,
      parts: [numPart(e, { suffix: 'times' })],
      hints: [PROB, PREDICT],
      solution: [`$P(\\text{${ev.q.replace(/^a /, '')}}) = ${fr(ev.f, ev.tot)}$`, `Expected: $${fr(ev.f, ev.tot)} \\times ${ev.t} = ${num(e)}$`, `${name} should expect about $${num(e)}$ times.`],
    };
  }
  // d2: a bag with replacement.
  const [c1, c2] = rng.sample(['red', 'blue', 'green', 'yellow'], 2);
  const { a, b, t } = retry(
    () => ({ a: rng.int(2, 7), b: rng.int(2, 9), t: rng.pick([100, 120, 150, 200, 240, 300]) }),
    (o) => isWhole((o.a * o.t) / (o.a + o.b)) && o.a !== o.b,
    300,
  );
  const e = (a * t) / (a + b);
  return {
    prompt: `A bag has $${a}$ ${c1} and $${b}$ ${c2} marbles. ${name} picks a marble, writes down its colour and puts it back. ${name} does this $${t}$ times. About how many times should ${name} expect to pick ${c1}?`,
    parts: [numPart(e, { suffix: 'times' })],
    hints: [`First find the probability of ${c1}: ${c1} marbles over all the marbles.`, PREDICT],
    solution: [`$P(\\text{${c1}}) = ${fr(a, a + b)}$`, `Expected: $${fr(a, a + b)} \\times ${t} = ${num(e)}$`, `${name} should expect about $${num(e)}$ ${c1} marbles.`],
  };
}

const RESULTS: Array<{ intro: (t: number) => string; head: string; cats: string[]; rank: string[]; ask: (c: string) => string; next: (c: string, n: number) => string }> = [
  {
    intro: (t) => `A coffee shop recorded the drink size for its last $${t}$ customers.`, head: 'Size', cats: ['Small', 'Medium', 'Large', 'Extra large'], rank: ['Medium', 'Large', 'Small', 'Extra large'],
    ask: (c) => `What is the experimental probability that a customer orders ${lower(c)}?`, next: (c, n) => `Predict how many of the next $${n}$ customers will order ${lower(c)}.`,
  },
  {
    intro: (t) => `A quality checker at a factory tested $${t}$ light bulbs.`, head: 'Result', cats: ['Works', 'Dim', 'Broken'], rank: ['Works', 'Dim', 'Broken'],
    ask: (c) => `What is the experimental probability that a bulb is ${c === 'Works' ? 'working' : lower(c)}?`, next: (c, n) => `Predict how many bulbs in the next batch of $${n}$ will be ${c === 'Works' ? 'working' : lower(c)}.`,
  },
  {
    intro: (t) => `A car wash recorded the wash chosen by its last $${t}$ customers.`, head: 'Wash', cats: ['Basic', 'Deluxe', 'Premium'], rank: ['Basic', 'Deluxe', 'Premium'],
    ask: (c) => `What is the experimental probability that a customer chooses the ${lower(c)} wash?`, next: (c, n) => `Predict how many of the next $${n}$ customers will choose the ${lower(c)} wash.`,
  },
  {
    intro: (t) => `A basketball player took $${t}$ free throws in practice.`, head: 'Result', cats: ['Made', 'Missed'], rank: ['Made', 'Missed'],
    ask: (c) => `What is the experimental probability that a free throw is ${lower(c)}?`, next: (c, n) => `If the player takes $${n}$ free throws in the season, predict how many will be ${lower(c)}.`,
  },
];

function resultsItem(rng: Rng, d: Lvl, name: string): Out {
  if (d === 1) {
    const t = rng.pick([20, 25, 40, 50]);
    const h = retry(() => rng.int(Math.ceil(t * 0.3), Math.floor(t * 0.7)), (x) => isWhole((x * 100) / t) && x * 2 !== t);
    const p = (h * 100) / t;
    const ev = rng.pick([
      { text: `${name} flipped a coin $${t}$ times and got heads $${h}$ times.`, q: 'heads' },
      { text: `${name} took $${t}$ free throws and made $${h}$ of them.`, q: 'making a free throw' },
      { text: `${name} spun a spinner $${t}$ times. It landed on blue $${h}$ times.`, q: 'landing on blue' },
    ]);
    return {
      prompt: `${ev.text} What is the experimental probability of ${ev.q}? Write it as a percent.`,
      parts: [numPart(p, { suffix: '%' })],
      hints: [EXP, 'Divide, then multiply by $100$ to get a percent.'],
      solution: [`$P = ${fr(h, t)}$`, `$${h} \\div ${t} = ${num(h / t)}$, and $${num(h / t)} \\times 100 = ${num(p)}\\%$`, `The experimental probability is $${num(p)}\\%$.`],
    };
  }
  const ctx = rng.pick(RESULTS);
  const t = rng.pick([100, 200, 250, 400]);
  const k = ctx.cats.length;
  const counts = retry(
    () => {
      const cuts = rng.sample([...Array(t - 1).keys()].map((x) => x + 1), k - 1).sort((x, y) => x - y);
      return [...cuts, t].map((c, j) => c - (j ? cuts[j - 1] : 0));
    },
    (cs) => cs.every((c) => c >= t * 0.08) && new Set(cs).size === k && Math.max(...cs) <= t * 0.75,
    300,
  )
    .sort((x, y) => y - x)
    // The usual most popular result gets the biggest count.
    .map((_, j, sorted) => sorted[ctx.rank.indexOf(ctx.cats[j])]);
  const i = rng.int(0, k - 1);
  const figure: Figure = { type: 'table', headers: [ctx.head, 'Count'], rows: ctx.cats.map((c, j) => [c, String(counts[j])]) };
  const p = (counts[i] * 100) / t;
  if (rng.chance(0.5)) {
    return {
      prompt: `${ctx.intro(t)} ${ctx.ask(ctx.cats[i])} Write it as a percent.`,
      figure,
      parts: [numPart(p, { suffix: '%' })],
      hints: [EXP, 'The number of trials is the total of the counts.'],
      solution: [`Trials: $${plus(counts)} = ${t}$`, `$P = ${fr(counts[i], t)} = ${num(counts[i] / t)} = ${num(p)}\\%$`, `The experimental probability is $${num(p)}\\%$.`],
    };
  }
  const nNext = retry(() => rng.pick([300, 400, 500, 600, 800, 1000, 1200]), (x) => isWhole((counts[i] * x) / t) && x !== t);
  const e = (counts[i] * nNext) / t;
  return {
    prompt: `${ctx.intro(t)} ${ctx.next(ctx.cats[i], nNext)}`,
    figure,
    parts: [numPart(e)],
    hints: ['Use the results as the probability: count over total.', PREDICT],
    solution: [`Experimental probability: $${fr(counts[i], t)}$`, `Prediction: $${fr(counts[i], t)} \\times ${nNext} = ${num(e)}$`, `Predict about $${num(e)}$.`],
  };
}

function compareItem(rng: Rng, name: string): Out {
  if (rng.chance(0.5)) {
    // Die: predicted count versus the real count.
    const t = rng.pick([60, 90, 120, 180]);
    const e = t / 6;
    const counts = retry(
      () => {
        const cs = Array.from({ length: 5 }, () => e + rng.int(-Math.round(e * 0.35), Math.round(e * 0.35)));
        return [...cs, t - sum(cs)];
      },
      (cs) => cs[5] > 0 && Math.abs(cs[5] - e) <= e * 0.4 && cs.some((c) => c !== e),
      300,
    );
    const shuffled = rng.shuffle(counts);
    const face = retry(() => rng.int(1, 6), (f) => shuffled[f - 1] !== e);
    const actual = shuffled[face - 1];
    const figure: Figure = { type: 'table', headers: ['Number rolled', '1', '2', '3', '4', '5', '6'], rows: [['Times', ...shuffled.map(String)]] };
    return {
      prompt: `${name} rolled a regular die $${t}$ times. The table shows the results. How many ${face}s does theory predict? How far from the prediction was the real number of ${face}s?`,
      figure,
      parts: [numPart(e, { label: 'Predicted:' }), numPart(Math.abs(actual - e), { label: 'Difference:' })],
      hints: [`Each number has a $${fr(1, 6)}$ chance, so the prediction is $${fr(1, 6)} \\times ${t}$.`, `Read the real number of ${face}s from the table. Subtract the smaller number from the larger one.`],
      solution: [
        `Predicted: $${fr(1, 6)} \\times ${t} = ${e}$`,
        `Real number of ${face}s: $${actual}$`,
        `Difference: $${Math.max(actual, e)} - ${Math.min(actual, e)} = ${Math.abs(actual - e)}$`,
        `Theory predicts $${e}$. The real result was $${Math.abs(actual - e)}$ ${actual > e ? 'more' : 'fewer'}. Experimental results are usually close to, but not exactly, the prediction.`,
      ],
    };
  }
  // Spinner: theoretical percent versus experimental percent.
  const k = rng.pick([4, 5, 10]);
  const m = k === 10 ? rng.int(2, 4) : rng.int(1, 2);
  const col = rng.pick(['blue', 'red', 'green', 'yellow']);
  const t = rng.pick([50, 100]);
  const th = (m * 100) / k;
  const h = retry(() => Math.round((t * th) / 100) + rng.int(-Math.round(t * 0.08), Math.round(t * 0.08)), (x) => x > 0 && (x * 100) / t !== th);
  const ex = (h * 100) / t;
  return {
    prompt: `A spinner has $${k}$ equal sections, and $${m}$ of them ${m === 1 ? 'is' : 'are'} ${col}. ${name} spun it $${t}$ times and it landed on ${col} $${h}$ times. Find the theoretical and the experimental probability of ${col}, as percents.`,
    parts: [numPart(th, { label: 'Theoretical:', suffix: '%' }), numPart(ex, { label: 'Experimental:', suffix: '%' })],
    hints: [PROB, EXP],
    solution: [
      `Theoretical: $${fr(m, k)} = ${num(m / k)} = ${num(th)}\\%$`,
      `Experimental: $${fr(h, t)} = ${num(h / t)} = ${num(ex)}\\%$`,
      `The experimental result is $${num(Math.abs(ex - th))}$ percentage points ${ex > th ? 'higher' : 'lower'} than theory. With more spins, the results usually get closer to $${num(th)}\\%$.`,
    ],
  };
}

const probability204 = skill({
  id: 'm204-probability',
  name: 'Theoretical and experimental probability',
  description: 'Find theoretical and experimental probabilities, use them to predict results, and compare a prediction with real results.',
  outcomes: ['SP2'],
  lessonId: 'm204-9-3',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 3) return compareItem(rng, name);
    return rng.chance(0.5) ? predictTheory(rng, d, name) : resultsItem(rng, d, name);
  },
});

export const DATA_SKILLS: SkillDef[] = [displayData, analyzeData, misleadingGraph, probability204];
