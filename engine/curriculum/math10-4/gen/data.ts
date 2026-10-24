/** Math 10-4 Unit 9 — Data and Probability (SP1, SP2). */
import { fixedChoice, mc, numPart, retry, skill } from '../../helpers.ts';
import { fmtFixed, fmtGroupTex, gcd, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Ananya', 'Nathan', 'Lena', 'Diego', 'Harpreet', 'Noor',
];
const CITIES = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Clearwater', 'Ashford', 'Pinewood'];

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure; answerDisplay?: string };
type Lvl = Difficulty;

/** A number inside maths (thousands grouped). */
const num = (x: number, dp = 4) => fmtGroupTex(x, dp);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const isWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;

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
const CENT = 'to the nearest cent';
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
/** A data list in maths: $12,\ 15,\ 9$ */
const listTex = (a: number[]) => `$${a.map((x) => num(x)).join(',\\ \\ ')}$`;
const listMoney = (a: number[]) => a.map(tag).join(', ');
const fr = (n: number, d: number) => `\\frac{${n}}{${d}}`;
/** \frac{6}{10} = \frac{3}{5} (only shows the simplified form when it differs). */
function frSimp(n: number, d: number): string {
  const g = gcd(n, d);
  if (g <= 1) return fr(n, d);
  return d / g === 1 ? `${fr(n, d)} = ${n / g}` : `${fr(n, d)} = ${fr(n / g, d / g)}`;
}
/** Simplest form as LaTeX. */
function frLow(n: number, d: number): string {
  const g = gcd(n, d) || 1;
  return d / g === 1 ? `${n / g}` : fr(n / g, d / g);
}
const DAYS: Record<string, string> = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday' };
/** Tally marks in groups of five, e.g. "||||| |||". */
function tally(n: number): string {
  const out: string[] = [];
  for (let k = n; k > 0; k -= 5) out.push('|'.repeat(Math.min(5, k)));
  return out.join(' ');
}

// ---------------------------------------------------------------------------
// 9.1 Reading bar graphs, circle graphs and tally charts
// ---------------------------------------------------------------------------

interface CatCtx {
  kind: 'survey' | 'count';
  /** Sentence(s) before the display; {display} is replaced by "bar graph", "circle graph" or "tally chart". */
  intro: string;
  cats: string[];
  ordered?: boolean;
  noun: string;
  valueLabel: string;
  categoryLabel: string;
  one: (c: string) => string;
  more: (a: string, b: string) => string;
  total: string;
  /** Survey contexts: "What fraction of the students chose cheese?" */
  frac?: (c: string) => string;
  /** Survey contexts: percent questions for circle graphs. */
  pctNot?: (c: string) => string;
  pctOr?: (a: string, b: string) => string;
  /** Count contexts: money for two bars. */
  price?: { each: number[]; text: (p: number, a: string, b: string) => string; per: string };
  /** Count contexts: a goal for the total. */
  goal?: (g: number) => string;
  /** Largest realistic bar. */
  cap?: number;
}

function surveyCtx(o: {
  who: string;
  cats: string[];
  noun: string;
  verb: string;
  neg: string;
  w: (c: string) => string;
  valueLabel: string;
  categoryLabel: string;
}): CatCtx {
  return {
    kind: 'survey',
    intro: `${o.who} The {display} shows the results.`,
    cats: o.cats,
    noun: o.noun,
    valueLabel: o.valueLabel,
    categoryLabel: o.categoryLabel,
    one: (c) => `How many ${o.noun} ${o.verb} ${o.w(c)}?`,
    more: (a, b) => `How many more ${o.noun} ${o.verb} ${o.w(a)} than ${o.w(b)}?`,
    total: `How many ${o.noun} answered the survey in all?`,
    frac: (c) => `What fraction of the ${o.noun} ${o.verb} ${o.w(c)}?`,
    pctNot: (c) => `What percent of the ${o.noun} ${o.neg} ${o.w(c)}?`,
    pctOr: (a, b) => `What percent of the ${o.noun} ${o.verb} ${o.w(a)} or ${o.w(b)}?`,
  };
}

const lower = (c: string) => c.toLowerCase();

const SURVEYS: CatCtx[] = [
  surveyCtx({
    who: 'Kiara asked students at her high school to name their favourite pizza topping.',
    cats: ['Cheese', 'Pepperoni', 'Hawaiian', 'Veggie', 'Sausage', 'Mushroom'],
    noun: 'students', verb: 'chose', neg: 'did **not** choose', w: (c) => (c === 'Hawaiian' ? 'Hawaiian' : lower(c)),
    valueLabel: 'Number of students', categoryLabel: 'Topping',
  }),
  surveyCtx({
    who: 'A community centre asked people which sport they most like to watch.',
    cats: ['Hockey', 'Soccer', 'Basketball', 'Football', 'Baseball', 'Curling'],
    noun: 'people', verb: 'chose', neg: 'did **not** choose', w: lower,
    valueLabel: 'Number of people', categoryLabel: 'Sport',
  }),
  surveyCtx({
    who: 'An ice cream shop asked customers to vote for their favourite flavour.',
    cats: ['Vanilla', 'Chocolate', 'Strawberry', 'Mint', 'Maple'],
    noun: 'customers', verb: 'voted for', neg: 'did **not** vote for', w: lower,
    valueLabel: 'Number of votes', categoryLabel: 'Flavour',
  }),
  surveyCtx({
    who: 'Darnell asked each student in his school’s Grade 10 classes what kind of pet they have. Each student named one pet.',
    cats: ['Dog', 'Cat', 'Fish', 'Bird', 'Hamster'],
    noun: 'students', verb: 'have', neg: 'do **not** have', w: (c) => `a ${lower(c)}`,
    valueLabel: 'Number of students', categoryLabel: 'Pet',
  }),
  surveyCtx({
    who: 'A city warehouse asked its workers how they get to work.',
    cats: ['Car', 'Bus', 'Train', 'Bike', 'Walk', 'Carpool'],
    noun: 'workers', verb: 'get to work', neg: 'do **not** get to work',
    w: (c) => ({ Car: 'by car', Bus: 'by bus', Train: 'by train', Bike: 'by bike', Walk: 'on foot', Carpool: 'in a carpool' })[c] ?? lower(c),
    valueLabel: 'Number of workers', categoryLabel: 'How they travel',
  }),
  surveyCtx({
    who: 'A local radio station asked listeners what kind of music they like best.',
    cats: ['Country', 'Pop', 'Rock', 'Hip hop', 'Classical'],
    noun: 'listeners', verb: 'chose', neg: 'did **not** choose', w: lower,
    valueLabel: 'Number of listeners', categoryLabel: 'Music',
  }),
];

const COUNTS: CatCtx[] = [
  {
    kind: 'count',
    intro: 'The {display} shows how many cars an auto detailing shop washed each day last week.',
    cats: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    ordered: true,
    noun: 'cars',
    valueLabel: 'Cars washed',
    categoryLabel: 'Day',
    one: (c) => `How many cars did the shop wash on ${DAYS[c]}?`,
    more: (a, b) => `How many more cars did the shop wash on ${DAYS[a]} than on ${DAYS[b]}?`,
    total: 'How many cars did the shop wash in all last week?',
    price: { each: [12, 15, 20, 25], per: 'wash', text: (p, a, b) => `Each wash costs ${tag(p)}. How much money did the shop take in for washes on ${DAYS[a]} and ${DAYS[b]} together?` },
    goal: (g) => `The shop’s goal was to wash $${g}$ cars last week. How many more cars did it need to wash to meet the goal?`,
    cap: 100,
  },
  {
    kind: 'count',
    intro: 'The {display} shows how many haircuts a hair salon did each day last week.',
    cats: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    ordered: true,
    noun: 'haircuts',
    valueLabel: 'Haircuts',
    categoryLabel: 'Day',
    one: (c) => `How many haircuts did the salon do on ${DAYS[c]}?`,
    more: (a, b) => `How many more haircuts did the salon do on ${DAYS[a]} than on ${DAYS[b]}?`,
    total: 'How many haircuts did the salon do in all last week?',
    price: { each: [20, 25, 30, 35], per: 'haircut', text: (p, a, b) => `Each haircut costs ${tag(p)}. How much money did the salon take in for haircuts on ${DAYS[a]} and ${DAYS[b]} together?` },
    goal: (g) => `The salon’s goal was $${g}$ haircuts for the week. How many more haircuts did it need to meet the goal?`,
    cap: 40,
  },
  {
    kind: 'count',
    intro: 'The {display} shows how many bags of garden soil a garden centre sold each day last week.',
    cats: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    ordered: true,
    noun: 'bags',
    valueLabel: 'Bags sold',
    categoryLabel: 'Day',
    one: (c) => `How many bags did the garden centre sell on ${DAYS[c]}?`,
    more: (a, b) => `How many more bags did it sell on ${DAYS[a]} than on ${DAYS[b]}?`,
    total: 'How many bags did the garden centre sell in all last week?',
    price: { each: [5, 6, 8, 10], per: 'bag', text: (p, a, b) => `Each bag costs ${tag(p)}. How much money did the garden centre take in for soil on ${DAYS[a]} and ${DAYS[b]} together?` },
    goal: (g) => `The manager hoped to sell $${g}$ bags last week. How many more bags did the store need to sell to reach that goal?`,
  },
  {
    kind: 'count',
    intro: 'The {display} shows how many rooms each housekeeper cleaned at a mountain hotel on Saturday.',
    cats: ['Ana', 'Ben', 'Carmen', 'Dev', 'Elif', 'Femi'],
    noun: 'rooms',
    valueLabel: 'Rooms cleaned',
    categoryLabel: 'Housekeeper',
    one: (c) => `How many rooms did ${c} clean?`,
    more: (a, b) => `How many more rooms did ${a} clean than ${b}?`,
    total: 'How many rooms did the housekeepers clean in all?',
    goal: (g) => `The hotel had $${g}$ rooms to clean on Saturday. How many rooms were still not cleaned?`,
    cap: 20,
  },
  {
    kind: 'count',
    intro: 'The {display} shows the drinks a coffee shop sold one morning.',
    cats: ['Coffee', 'Latte', 'Tea', 'Hot cocoa', 'Smoothie'],
    noun: 'drinks',
    valueLabel: 'Drinks sold',
    categoryLabel: 'Drink',
    one: (c) => `How many ${({ Coffee: 'coffees', Latte: 'lattes', Tea: 'teas', 'Hot cocoa': 'hot cocoas', Smoothie: 'smoothies' } as Record<string, string>)[c]} did the shop sell?`,
    more: (a, b) => {
      const p = { Coffee: 'coffees', Latte: 'lattes', Tea: 'teas', 'Hot cocoa': 'hot cocoas', Smoothie: 'smoothies' } as Record<string, string>;
      return `How many more ${p[a]} than ${p[b]} did the shop sell?`;
    },
    total: 'How many drinks did the shop sell in all that morning?',
    goal: (g) => `The shop hoped to sell $${g}$ drinks that morning. How many more drinks did it need to sell to reach that goal?`,
  },
];

/** Bar values: d1 on grid lines, d2/d3 on a grid line or halfway between two. */
function barData(rng: Rng, d: Lvl, n: number, ok: (vs: number[]) => boolean = () => true, cap = Infinity): { values: number[]; step: number; max: number } {
  const all = d === 1
    ? [{ step: 2, unit: 2, lo: 2, hi: 16 }, { step: 5, unit: 5, lo: 5, hi: 40 }]
    : [{ step: 2, unit: 1, lo: 3, hi: 19 }, { step: 10, unit: 5, lo: 10, hi: 95 }, { step: 20, unit: 10, lo: 20, hi: 150 }];
  const cfg = rng.pick(all.filter((c) => c.hi <= cap).length ? all.filter((c) => c.hi <= cap) : all.slice(0, 1));
  const pool: number[] = [];
  for (let v = cfg.lo; v <= cfg.hi; v += cfg.unit) pool.push(v);
  const values = retry(
    () => rng.sample(pool, n),
    // d2+: at least one bar sits halfway between grid lines.
    (vs) => (d === 1 || vs.some((v) => v % cfg.step !== 0)) && ok(vs),
    200,
  );
  const top = Math.max(...values);
  const max = (Math.floor(top / cfg.step) + 1) * cfg.step;
  return { values, step: cfg.step, max };
}

/** Indices whose fraction of the total simplifies to a denominator of 12 or less. */
const niceIdx = (vs: number[]) => vs.map((_, k) => k).filter((k) => sum(vs) / gcd(vs[k], sum(vs)) <= 12 && vs[k] < sum(vs));
const display = (ctx: CatCtx, what: string) => ctx.intro.replace('{display}', what);
const BAR_HINT = 'Find the top of the bar. Look straight across to the numbers on the left side of the graph.';
const HALF_HINT = 'If the top of a bar is halfway between two grid lines, its value is halfway between the two numbers.';

type BarMode = 'one' | 'more' | 'total' | 'mostLeast' | 'frac' | 'price' | 'goal';
const uniqueEnds = (vs: number[]) => vs.filter((v) => v === Math.max(...vs)).length === 1 && vs.filter((v) => v === Math.min(...vs)).length === 1;

function barItem(rng: Rng, d: Lvl): Out {
  const ctx = rng.pick([...SURVEYS, ...COUNTS]);
  const n = ctx.ordered ? ctx.cats.length : d === 1 ? 4 : rng.int(4, Math.min(6, ctx.cats.length));
  const cats = ctx.ordered ? ctx.cats : rng.sample(ctx.cats, n);
  const modes: BarMode[] = d === 1 ? ['one', 'more'] : d === 2 ? ['total', 'mostLeast', 'more'] : ctx.kind === 'survey' ? ['frac'] : ctx.price ? ['price', 'goal'] : ['goal'];
  const mode = rng.pick(modes);
  const { values, step, max } = barData(rng, d, n, mode === 'mostLeast' ? uniqueEnds : mode === 'frac' ? (vs) => niceIdx(vs).length > 0 : undefined, ctx.cap);
  const figure: Figure = { type: 'barChart', categories: cats, values, valueLabel: ctx.valueLabel, categoryLabel: ctx.categoryLabel, max, step };
  const intro = display(ctx, 'bar graph');
  const hints = [BAR_HINT, ...(d === 1 ? [] : [HALF_HINT])];
  const total = sum(values);

  if (mode === 'one') {
    const i = rng.int(0, n - 1);
    return {
      prompt: `${intro} ${ctx.one(cats[i])}`,
      figure,
      parts: [numPart(values[i], { suffix: ctx.noun })],
      hints: [BAR_HINT, `The grid lines go up by $${step}$.`],
      solution: [`Find the ${cats[i]} bar.`, `The ${cats[i]} bar reaches $${num(values[i])}$.`, `The answer is $${values[i]}$ ${ctx.noun}.`],
    };
  }
  if (mode === 'more') {
    const [i, j] = retry(() => rng.sample([...Array(n).keys()], 2), ([a, b]) => values[a] > values[b]);
    const diff = values[i] - values[j];
    return {
      prompt: `${intro} ${ctx.more(cats[i], cats[j])}`,
      figure,
      parts: [numPart(diff, { suffix: ctx.noun })],
      hints: [...hints.slice(0, 1), `Read both bars. Then subtract the smaller value from the bigger value.`],
      solution: [`${cats[i]}: $${values[i]}$. ${cats[j]}: $${values[j]}$.`, `Subtract: $${values[i]} - ${values[j]} = ${diff}$`, `The answer is $${diff}$ more ${ctx.noun}.`],
    };
  }
  if (mode === 'total') {
    return {
      prompt: `${intro} ${ctx.total}`,
      figure,
      parts: [numPart(total, { suffix: ctx.noun })],
      hints: [...hints, 'Read every bar, then add all the values.'],
      solution: [`Read each bar: ${cats.map((c, k) => `${c} $${values[k]}$`).join(', ')}.`, `Add: $${plus(values)} = ${total}$`, `The total is $${total}$ ${ctx.noun}.`],
    };
  }
  if (mode === 'mostLeast') {
    const hi = Math.max(...values);
    const lo = Math.min(...values);
    const ih = values.indexOf(hi);
    const il = values.indexOf(lo);
    const word = ctx.kind === 'survey' ? ['most popular', 'least popular'] : ['highest', 'lowest'];
    const q = ctx.kind === 'survey'
      ? `How many more ${ctx.noun} chose the most popular answer than the least popular answer?`
      : `What is the difference between the highest bar and the lowest bar?`;
    return {
      prompt: `${intro} ${q}`,
      figure,
      parts: [numPart(hi - lo, { suffix: ctx.noun })],
      hints: ['The tallest bar is the most. The shortest bar is the least.', `Read both bars, then subtract. ${HALF_HINT}`],
      solution: [
        `The ${word[0]} is ${cats[ih]} with $${hi}$.`,
        `The ${word[1]} is ${cats[il]} with $${lo}$.`,
        `Subtract: $${hi} - ${lo} = ${hi - lo}$`,
        `The difference is $${hi - lo}$ ${ctx.noun}.`,
      ],
    };
  }
  if (mode === 'frac') {
    const i = rng.pick(niceIdx(values));
    return {
      prompt: `${intro} ${ctx.frac!(cats[i])} Write the answer as a fraction.`,
      figure,
      parts: [numPart(values[i] / total)],
      hints: ['First add all the bars to find how many answered in all.', `The fraction is $\\dfrac{\\text{${cats[i]}}}{\\text{total}}$. Simplify if you can.`],
      solution: [
        `Total: $${plus(values)} = ${total}$`,
        `${cats[i]}: $${values[i]}$`,
        `Fraction: $${frSimp(values[i], total)}$`,
        `The fraction is $${frLow(values[i], total)}$.`,
      ],
    };
  }
  if (mode === 'price') {
    const p = rng.pick(ctx.price!.each);
    const [i, j] = rng.sample([...Array(n).keys()], 2).sort((a, b) => a - b);
    const both = values[i] + values[j];
    const amt = both * p;
    return {
      prompt: `${intro} ${ctx.price!.text(p, cats[i], cats[j])}`,
      figure,
      parts: [numPart(amt, { label: '\\$' })],
      hints: ['Read the two bars and add them.', `Then multiply by the price of one ${ctx.price!.per}: ${tag(p)}.`],
      solution: [
        `${DAYS[cats[i]] ?? cats[i]}: $${values[i]}$. ${DAYS[cats[j]] ?? cats[j]}: $${values[j]}$.`,
        `Add: $${values[i]} + ${values[j]} = ${both}$ ${ctx.noun}`,
        `Multiply by the price: $${both} \\times ${p} = ${num(amt)}$`,
        `The total is ${tag(amt)}.`,
      ],
    };
  }
  // goal
  const g = Math.ceil((total + 5) / 10) * 10 + rng.pick([0, 10, 20]);
  return {
    prompt: `${intro} ${ctx.goal!(g)}`,
    figure,
    parts: [numPart(g - total, { suffix: ctx.noun })],
    hints: ['First add all the bars to find the total.', `Then subtract the total from $${g}$.`],
    solution: [
      `Read each bar: ${cats.map((c, k) => `${c} $${values[k]}$`).join(', ')}.`,
      `Total: $${plus(values)} = ${total}$`,
      `Subtract: $${g} - ${total} = ${g - total}$`,
      `The answer is $${g - total}$ ${ctx.noun}.`,
    ],
  };
}

function tallyItem(rng: Rng, d: Lvl): Out {
  const ctx = rng.pick(SURVEYS);
  const n = d === 1 ? 3 : rng.int(4, Math.min(5, ctx.cats.length));
  const cats = rng.sample(ctx.cats, n);
  const values = retry(() => cats.map(() => (d === 1 ? rng.int(3, 14) : rng.int(4, 19))), (vs) => new Set(vs).size === vs.length && (d < 3 || niceIdx(vs).length > 0), 500);
  const figure: Figure = { type: 'table', headers: [ctx.categoryLabel, 'Tally'], rows: cats.map((c, k) => [c, tally(values[k])]) };
  const intro = display(ctx, 'tally chart');
  const TALLY = 'Each group of $5$ marks counts as $5$. Count by fives, then count the extra marks.';
  const total = sum(values);
  const how = (k: number) => {
    const fives = Math.floor(values[k] / 5);
    const extra = values[k] % 5;
    if (fives === 0) return `${cats[k]}: $${extra}$ single marks, so $${values[k]}$`;
    if (extra === 0) return `${cats[k]}: $${fives}$ group${fives > 1 ? 's' : ''} of $5$, so $${values[k]}$`;
    return `${cats[k]}: $${fives}$ group${fives > 1 ? 's' : ''} of $5$ and $${extra}$ more, so $${fives * 5} + ${extra} = ${values[k]}$`;
  };
  if (d === 1) {
    const i = rng.int(0, n - 1);
    return {
      prompt: `${intro} ${ctx.one(cats[i])}`,
      figure,
      parts: [numPart(values[i], { suffix: ctx.noun })],
      hints: [TALLY],
      solution: [`Find the row for ${cats[i]}.`, `${how(i)}.`, `The answer is $${values[i]}$ ${ctx.noun}.`],
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      return {
        prompt: `${intro} ${ctx.total}`,
        figure,
        parts: [numPart(total, { suffix: ctx.noun })],
        hints: [TALLY, 'Count each row, then add the counts.'],
        solution: [...cats.map((_, k) => `${how(k)}.`), `Add: $${plus(values)} = ${total}$`, `In all, $${total}$ ${ctx.noun} answered.`],
      };
    }
    const [i, j] = retry(() => rng.sample([...Array(n).keys()], 2), ([a, b]) => values[a] > values[b]);
    return {
      prompt: `${intro} ${ctx.more(cats[i], cats[j])}`,
      figure,
      parts: [numPart(values[i] - values[j], { suffix: ctx.noun })],
      hints: [TALLY, 'Count both rows, then subtract.'],
      solution: [`${how(i)}.`, `${how(j)}.`, `Subtract: $${values[i]} - ${values[j]} = ${values[i] - values[j]}$`, `The answer is $${values[i] - values[j]}$ more ${ctx.noun}.`],
    };
  }
  const i = rng.pick(niceIdx(values));
  return {
    prompt: `${intro} ${ctx.frac!(cats[i])} Write the answer as a fraction.`,
    figure,
    parts: [numPart(values[i] / total)],
    hints: [`${TALLY} Add all the rows to find the total.`, `The fraction is $\\dfrac{\\text{${cats[i]}}}{\\text{total}}$. Simplify if you can.`],
    solution: [...cats.map((_, k) => `${how(k)}.`), `Total: $${plus(values)} = ${total}$`, `Fraction: $${frSimp(values[i], total)}$`, `The fraction is $${frLow(values[i], total)}$.`],
  };
}

function circleItem(rng: Rng, d: Lvl): Out {
  const ctx = rng.pick(SURVEYS);
  const n = d === 1 ? rng.int(3, 4) : rng.int(4, 5);
  const cats = rng.sample(ctx.cats, Math.min(n, ctx.cats.length));
  const intro = display(ctx, 'circle graph');
  if (d === 1 || (d === 2 && rng.chance(0.5))) {
    // Percents (multiples of 5 that add to 100).
    const pcts = retry(
      () => {
        const cuts = rng.sample([...Array(19).keys()].map((k) => (k + 1) * 5), cats.length - 1).sort((a, b) => a - b);
        return [...cuts, 100].map((c, k) => c - (k ? cuts[k - 1] : 0));
      },
      (ps) => ps.every((p) => p >= 10) && new Set(ps).size === ps.length,
      300,
    );
    const figure: Figure = { type: 'circleGraph', slices: cats.map((c, k) => ({ label: c, value: pcts[k] })), show: 'percent' };
    if (d === 1) {
      const i = rng.int(0, cats.length - 1);
      return {
        prompt: `${intro} ${ctx.pctNot!(cats[i])}`,
        figure,
        parts: [numPart(100 - pcts[i], { suffix: '%' })],
        hints: ['The whole circle is $100\\%$.', `Subtract the ${cats[i]} percent from $100\\%$.`],
        solution: [`The whole circle is $100\\%$. ${cats[i]} is $${pcts[i]}\\%$.`, `$100\\% - ${pcts[i]}\\% = ${100 - pcts[i]}\\%$`, `The answer is $${100 - pcts[i]}\\%$.`],
      };
    }
    const [i, j] = rng.sample([...Array(cats.length).keys()], 2);
    return {
      prompt: `${intro} ${ctx.pctOr!(cats[i], cats[j])}`,
      figure,
      parts: [numPart(pcts[i] + pcts[j], { suffix: '%' })],
      hints: ['Find the two slices in the legend.', 'Add their percents.'],
      solution: [`${cats[i]}: $${pcts[i]}\\%$. ${cats[j]}: $${pcts[j]}\\%$.`, `$${pcts[i]}\\% + ${pcts[j]}\\% = ${pcts[i] + pcts[j]}\\%$`, `The answer is $${pcts[i] + pcts[j]}\\%$.`],
    };
  }
  // Counts shown in the legend.
  const values = retry(() => cats.map(() => rng.int(3, 24)), (vs) => new Set(vs).size === vs.length && (d < 3 || niceIdx(vs).length > 0), 500);
  const figure: Figure = { type: 'circleGraph', slices: cats.map((c, k) => ({ label: c, value: values[k] })), show: 'value' };
  const total = sum(values);
  if (d === 2) {
    return {
      prompt: `${intro} The number beside each answer in the legend is how many ${ctx.noun} chose it. ${ctx.total}`,
      figure,
      parts: [numPart(total, { suffix: ctx.noun })],
      hints: ['Each slice is one answer. The whole circle is everyone who answered.', 'Add the numbers for all the slices.'],
      solution: [`Add the numbers for all the slices: $${plus(values)} = ${total}$`, `In all, $${total}$ ${ctx.noun} answered.`],
    };
  }
  const i = rng.pick(niceIdx(values));
  return {
    prompt: `${intro} The number beside each answer in the legend is how many ${ctx.noun} chose it. ${ctx.frac!(cats[i])} Write the answer as a fraction.`,
    figure,
    parts: [numPart(values[i] / total)],
    hints: ['The whole circle is everyone who answered. Add all the numbers to find the total.', `The fraction is $\\dfrac{\\text{${cats[i]}}}{\\text{total}}$. Simplify if you can.`],
    solution: [`Total: $${plus(values)} = ${total}$`, `${cats[i]}: $${values[i]}$`, `Fraction: $${frSimp(values[i], total)}$`, `The fraction is $${frLow(values[i], total)}$.`],
  };
}

const readGraph = skill({
  id: 'm104-read-graph',
  name: 'Reading bar graphs, circle graphs and tally charts',
  description: 'Read a bar graph, circle graph or tally chart to find how many, how many more, the total, or a fraction of the total.',
  outcomes: ['SP1'],
  lessonId: 'm104-9-1',
  calculator: true,
  gen(rng, d) {
    const kind = rng.weighted([['bar', 5], ['tally', 2], ['circle', 2]] as const);
    return kind === 'bar' ? barItem(rng, d) : kind === 'tally' ? tallyItem(rng, d) : circleItem(rng, d);
  },
});

// ---------------------------------------------------------------------------
// 9.1 Choosing a display, a fair question or a fair sample
// ---------------------------------------------------------------------------

type GraphKind = 'bar' | 'line' | 'circle';
const GRAPH_NAME: Record<GraphKind, string> = { bar: 'Bar graph', line: 'Line graph', circle: 'Circle graph' };
const GRAPH_WHY: Record<GraphKind, string> = {
  bar: 'it compares amounts in different groups',
  line: 'it shows how something changes over time',
  circle: 'it shows how one whole is split into parts',
};
const GRAPH_RULE = 'Bar graph: compare groups. Line graph: change over time. Circle graph: parts of one whole.';

const GRAPH_SITUATIONS: Array<{ text: string; kind: GraphKind; easy?: boolean }> = [
  { text: 'the temperature in a town every hour from 6 in the morning to 6 in the evening', kind: 'line', easy: true },
  { text: 'how a puppy’s mass changed each week for $10$ weeks', kind: 'line', easy: true },
  { text: 'the price of a litre of gas on the first day of each month for a year', kind: 'line' },
  { text: '{name}’s savings account balance at the end of each month', kind: 'line' },
  { text: 'the height of a tomato plant each day for three weeks', kind: 'line', easy: true },
  { text: 'the water level in a farm dugout each week of the summer', kind: 'line' },
  { text: 'the number of students who chose each kind of pizza', kind: 'bar', easy: true },
  { text: 'how many cars of each colour are in the staff parking lot', kind: 'bar', easy: true },
  { text: 'the number of rooms each housekeeper cleaned on Monday', kind: 'bar' },
  { text: 'the number of each kind of sandwich a deli sold on Friday', kind: 'bar' },
  { text: 'how many goals each player on a hockey team scored this season', kind: 'bar' },
  { text: 'how {name}’s monthly paycheque is split among rent, food, bus fare and savings', kind: 'circle', easy: true },
  { text: 'the percent of a pizza shop’s sales that come from each size of pizza', kind: 'circle' },
  { text: 'how a family farm splits its land among wheat, canola, barley and pasture', kind: 'circle' },
  { text: 'how {name} spends the $24$ hours of a day: sleep, work, school and free time', kind: 'circle', easy: true },
  { text: 'what part of a community event’s budget goes to food, music, prizes and rent', kind: 'circle' },
];

const QUESTIONS: Array<{ topic: string; fair: string; biased: string[] }> = [
  {
    topic: 'what food the school cafeteria should add to the menu',
    fair: 'Which new menu item would you most like: tacos, sushi, curry or burgers?',
    biased: ['Don’t you agree that the cafeteria needs tacos?', 'Would you like tasty tacos or boring old sushi?', 'Most students want tacos. Do you want tacos too?'],
  },
  {
    topic: 'what day to hold the staff barbecue',
    fair: 'Which day works best for you for the staff barbecue: Friday, Saturday or Sunday?',
    biased: ['Saturday is the best day for a barbecue, right?', 'Would you rather have the barbecue on a fun Friday or on a boring Sunday?', 'The boss likes Saturday. Which day do you choose?'],
  },
  {
    topic: 'whether the town should build a new skatepark',
    fair: 'Should the town build a new skatepark? (Yes / No / Not sure)',
    biased: ['Should the town waste money on a skatepark?', 'Don’t you think a skatepark would keep kids out of trouble?', 'Everyone wants a skatepark. Do you agree?'],
  },
  {
    topic: 'what snacks to put in the break room at work',
    fair: 'Which snack would you most like in the break room: fruit, granola bars, chips or cookies?',
    biased: ['Do you want healthy fruit or greasy chips?', 'Wouldn’t cookies make the break room better?', 'Fruit is the best snack. Do you agree?'],
  },
  {
    topic: 'which radio station plays in the store',
    fair: 'Which radio station would you like to hear in the store?',
    biased: ['Don’t you agree the country station is the best?', 'Do you like the popular pop station or that old rock station?', 'Most staff like the pop station. You like it too, right?'],
  },
  {
    topic: 'what time the community pool should open',
    fair: 'What time would you like the pool to open on weekdays?',
    biased: ['Isn’t 6 a.m. a great time to open the pool?', 'Should the pool open at a sensible 9 a.m. or a silly 6 a.m.?', 'Most swimmers want an early opening. Do you?'],
  },
];

const SAMPLES: Array<{ goal: string; fair: string; biased: Array<[string, string]> }> = [
  {
    goal: 'what all the students at a large high school think of the cafeteria food',
    fair: 'Pick $50$ students at random from the whole school list.',
    biased: [
      ['Ask $50$ students on the school volleyball team.', 'Only one team is asked, so most students have no chance to be picked.'],
      ['Ask $50$ of their own friends.', 'Friends often think alike, so they may not match the whole school.'],
      ['Ask $50$ Grade 12 students only.', 'Only one grade is asked, so the other grades are left out.'],
    ],
  },
  {
    goal: 'whether people in a city want a new hockey arena',
    fair: 'Phone $200$ people picked at random from all over the city.',
    biased: [
      ['Ask $200$ people leaving a hockey game.', 'People at a hockey game probably like hockey more than most people do.'],
      ['Ask $200$ people at a seniors’ centre.', 'Only one age group is asked.'],
      ['Ask the $20$ players on the local hockey team.', 'The players want an arena, and the group is too small.'],
    ],
  },
  {
    goal: 'which pizza toppings the customers of a pizza shop like',
    fair: 'Ask every 10th customer who orders, all day for a week.',
    biased: [
      ['Ask only the customers who order Hawaiian pizza.', 'Those customers already like pineapple, so the results lean toward it.'],
      ['Ask the $5$ cooks who work in the kitchen.', 'The cooks are not the customers, and $5$ people is too few.'],
      ['Ask only the customers who come in on Friday night.', 'One busy night may not show what all customers like.'],
    ],
  },
  {
    goal: 'what music all the workers at a large warehouse want to hear on the job',
    fair: 'Pick $40$ workers at random from the list of all workers on every shift.',
    biased: [
      ['Ask $40$ workers on the night shift only.', 'The day and evening shifts are left out.'],
      ['Ask the $40$ workers who already listen to the rock station.', 'They already like rock, so the results lean toward rock.'],
      ['Ask the managers only.', 'Managers are only a small part of the workers.'],
    ],
  },
  {
    goal: 'how many hours a week teens in the region spend gaming',
    fair: 'Survey teens picked at random from schools all over the region.',
    biased: [
      ['Survey teens at a video game store.', 'Teens at a game store probably game more than most teens.'],
      ['Survey the members of one school’s chess club.', 'One club at one school does not match all teens.'],
      ['Survey teens at a hockey practice.', 'Teens at practice may have less free time than most teens.'],
    ],
  },
  {
    goal: 'whether shoppers want a local grocery store to stay open later',
    fair: 'Ask shoppers picked at random at different times on different days.',
    biased: [
      ['Ask only the store’s staff.', 'The staff are not the shoppers, and they may not want to work late.'],
      ['Ask only shoppers who come in during the last hour before closing.', 'Late shoppers are more likely to want later hours.'],
      ['Ask only shoppers on Sunday morning.', 'One time of the week does not match all shoppers.'],
    ],
  },
];

function graphChoice(rng: Rng, d: Lvl, name: string): Out {
  const sit = rng.pick(GRAPH_SITUATIONS.filter((s) => d > 1 || s.easy));
  const text = sit.text.replace('{name}', rng.pick(NAMES.filter((x) => x !== name)));
  const order: GraphKind[] = ['bar', 'line', 'circle'];
  if (d < 3) {
    return {
      prompt: `${name} wants to make a graph to show ${text}. Which kind of graph is best?`,
      parts: [{ answer: fixedChoice(order.map((k) => GRAPH_NAME[k]), order.indexOf(sit.kind)) }],
      hints: ['Ask: is it groups to compare, a change over time, or parts of one whole?', GRAPH_RULE],
      solution: [GRAPH_RULE, `This data ${sit.kind === 'line' ? 'changes over time' : sit.kind === 'bar' ? 'compares separate groups' : 'is one whole split into parts'}.`, `The best choice is a **${GRAPH_NAME[sit.kind].toLowerCase()}**, because ${GRAPH_WHY[sit.kind]}.`],
      answerDisplay: GRAPH_NAME[sit.kind],
    };
  }
  // Graph and reason together.
  const correct = `${GRAPH_NAME[sit.kind]}, because ${GRAPH_WHY[sit.kind]}`;
  const others = order.filter((k) => k !== sit.kind);
  const ds = [
    `${GRAPH_NAME[others[0]]}, because ${GRAPH_WHY[others[0]]}`,
    `${GRAPH_NAME[others[1]]}, because ${GRAPH_WHY[others[1]]}`,
    `${GRAPH_NAME[others[rng.int(0, 1)]]}, because ${GRAPH_WHY[sit.kind]}`,
  ];
  return {
    prompt: `${name} wants to show ${text}. Which graph should ${name} use, and why?`,
    parts: [{ answer: mc(rng, correct, ds) }],
    hints: ['First decide what kind of data it is. Then check that the reason matches the graph.', GRAPH_RULE],
    solution: [GRAPH_RULE, `This data ${sit.kind === 'line' ? 'changes over time' : sit.kind === 'bar' ? 'compares separate groups' : 'is one whole split into parts'}.`, `The answer is: ${correct}.`],
    answerDisplay: correct,
  };
}

function questionChoice(rng: Rng, name: string): Out {
  const q = rng.pick(QUESTIONS);
  return {
    prompt: `${name} is making a survey about ${q.topic}. Which survey question is **fair**?`,
    parts: [{ answer: mc(rng, q.fair, q.biased) }],
    hints: ['A fair question does not push people toward one answer.', 'Watch for words like “don’t you agree”, “right?”, or words that make one choice sound good and the other sound bad.'],
    solution: [
      'A **biased** question pushes people toward one answer. A fair question lets people choose freely.',
      'The other questions use pushy words, praise one choice, or say what “most people” think.',
      `The fair question is: “${q.fair}”`,
    ],
    answerDisplay: q.fair,
  };
}

function sampleChoice(rng: Rng, d: Lvl, name: string): Out {
  const s = rng.pick(SAMPLES);
  if (d < 3) {
    return {
      prompt: `${name} wants to find out ${s.goal}. Which group should ${name} survey to get a **fair** sample?`,
      parts: [{ answer: mc(rng, s.fair, s.biased.map((b) => b[0])) }],
      hints: ['A fair sample gives everyone in the whole group the same chance to be picked.', 'Avoid a group that already leans one way, or that leaves out part of the population.'],
      solution: [
        'A **sample** is the part of a group that you survey. It is fair when it is picked at random from the whole group.',
        ...s.biased.slice(0, 2).map((b) => `“${b[0]}” is biased: ${b[1].charAt(0).toLowerCase()}${b[1].slice(1)}`),
        `The fair sample is: ${s.fair}`,
      ],
      answerDisplay: s.fair,
    };
  }
  // Why is this sample biased?
  const [plan, why] = rng.pick(s.biased);
  const wrong = [
    'The survey has too many questions.',
    'A survey can never give useful results.',
    'The group is picked at random, so it is unfair.',
    'The sample is too big.',
  ];
  return {
    prompt: `${name} wants to find out ${s.goal}. ${name}’s plan: “${plan.replace(/\.$/, '')}.” Why will this plan give **biased** results?`,
    parts: [{ answer: mc(rng, why, rng.sample(wrong, 3)) }],
    hints: ['Think about who is being asked. Do they match the whole group?', 'A sample is biased if it leaves people out or picks people who already lean one way.'],
    solution: [`The whole group is the population: everyone ${name} wants to learn about.`, `This sample does not match it. ${why}`, `So the results are biased. ${name} should pick people at random from the whole group instead.`],
    answerDisplay: why,
  };
}

const chooseDisplay = skill({
  id: 'm104-choose-display',
  name: 'Choosing a graph and a fair survey',
  description: 'Choose the best graph for a set of data, a fair survey question, and a fair (unbiased) sample.',
  outcomes: ['SP1'],
  lessonId: 'm104-9-1',
  format: 'mc',
  gen(rng, d) {
    const name = rng.pick(NAMES);
    const kind = rng.pick(d === 1 ? (['graph', 'graph', 'question'] as const) : d === 2 ? (['graph', 'question', 'sample'] as const) : (['graph', 'sample'] as const));
    if (kind === 'graph') return graphChoice(rng, d, name);
    if (kind === 'question') return questionChoice(rng, name);
    return sampleChoice(rng, d, name);
  },
});

// ---------------------------------------------------------------------------
// 9.2 Mean, median, mode and range
// ---------------------------------------------------------------------------

interface StatCtx {
  intro: (name: string, n: number) => string;
  /** Ranges for difficulty 1 and difficulty 2/3. */
  r1: [number, number];
  r2: [number, number];
  money?: boolean;
  /** Suffix for the answer box and the words after a value. */
  unit: string;
  /** LaTeX unit for solution steps ('' for counts). */
  tex: string;
  /** "score", "tips per shift" ... for "the mean ___". */
  noun: string;
  /** Allow half values (22.5 h) at difficulty 2. */
  half?: boolean;
  /** Difficulty 3: what is needed next time to reach a mean. */
  next?: { item: string; targets: number[]; text: (name: string, n: number, target: number) => string };
}

const STATS: StatCtx[] = [
  {
    intro: (name, n) => `${name} is a server at a restaurant in ${CITIES[name.length % CITIES.length]}. Here are ${name}’s tips for the last $${n}$ shifts:`,
    r1: [10, 45], r2: [18, 85], money: true, unit: '', tex: '', noun: 'amount of tips per shift',
  },
  {
    intro: (name, n) => `${name} bowled $${n}$ games at a bowling alley. The scores were:`,
    r1: [90, 150], r2: [78, 196], unit: 'points', tex: '', noun: 'score',
    next: { item: 'game', targets: [120, 125, 130, 140, 150], text: (name, n, t) => `${name} wants a mean score of $${t}$ for all $${n + 1}$ games. What score does ${name} need in the next game?` },
  },
  {
    intro: (name, n) => `${name} works part-time at a grocery store. Here are the hours ${name} worked each week for the last $${n}$ weeks:`,
    r1: [10, 30], r2: [8, 34], half: true, unit: 'h', tex: '\\ \\text{h}', noun: 'number of hours per week',
    next: { item: 'week', targets: [20, 22, 24, 25], text: (name, n, t) => `${name} wants to average $${t}$ hours a week over $${n + 1}$ weeks. How many hours does ${name} need to work next week?` },
  },
  {
    intro: (_name, n) => `A coffee shop counted its customers each hour for $${n}$ hours on a Saturday:`,
    r1: [8, 40], r2: [12, 68], unit: 'customers', tex: '', noun: 'number of customers per hour',
  },
  {
    intro: (name, n) => `${name} plays on a high school basketball team. Here are ${name}’s points in the last $${n}$ games:`,
    r1: [2, 20], r2: [0, 29], unit: 'points', tex: '', noun: 'number of points per game',
    next: { item: 'game', targets: [10, 12, 14, 15], text: (name, n, t) => `${name} wants to average $${t}$ points a game over $${n + 1}$ games. How many points does ${name} need to score in the next game?` },
  },
  {
    intro: (_name, n) => `Here are the daily high temperatures in Hillcrest for $${n}$ days in May, in degrees Celsius:`,
    r1: [8, 24], r2: [3, 27], unit: '°C', tex: '^\\circ\\text{C}', noun: 'high temperature',
  },
  {
    intro: (_name, n) => `A landscaping crew counted how many lawns it mowed each day for $${n}$ days:`,
    r1: [4, 14], r2: [3, 19], unit: 'lawns', tex: '', noun: 'number of lawns per day',
  },
  {
    intro: (name, n) => `${name} takes the bus to work in the city. Here is how many minutes the ride took on $${n}$ days:`,
    r1: [18, 40], r2: [15, 48], unit: 'min', tex: '\\ \\text{min}', noun: 'ride time',
  },
];

type Measure = 'mean' | 'median' | 'mode' | 'range';
const MEASURE_DEF: Record<Measure, string> = {
  mean: 'The **mean** is the total of all the values divided by how many values there are.',
  median: 'The **median** is the middle value when the values are put in order from least to greatest.',
  mode: 'The **mode** is the value that appears most often.',
  range: 'The **range** is the highest value minus the lowest value.',
};

const fmtVal = (ctx: StatCtx, v: number) => (ctx.money ? tag(v) : ctx.tex ? `$${num(v)}${ctx.tex}$` : `$${num(v)}$ ${ctx.unit}`);
const showList = (ctx: StatCtx, vs: number[]) => (ctx.money ? listMoney(vs) : listTex(vs));
const valuePart = (ctx: StatCtx, v: number, dp?: number): Part =>
  ctx.money ? (dp === 2 ? moneyPart(v) : numPart(v, { label: '\\$' })) : numPart(v, { decimals: dp, suffix: ctx.unit || undefined });

/** Steps for the median of vs. */
function medianSteps(ctx: StatCtx, vs: number[]): string[] {
  const s = asc(vs);
  const n = s.length;
  const m = median(vs);
  if (n % 2) return [`Put the values in order: ${listTex(s)}`, `There are $${n}$ values. The middle one is value number $${(n + 1) / 2}$.`, `The median is ${fmtVal(ctx, m)}.`];
  return [
    `Put the values in order: ${listTex(s)}`,
    `There are $${n}$ values, so there are two middle values: $${num(s[n / 2 - 1])}$ and $${num(s[n / 2])}$.`,
    `Find the number halfway between them: $(${num(s[n / 2 - 1])} + ${num(s[n / 2])}) \\div 2 = ${num(m)}$`,
    `The median is ${fmtVal(ctx, m)}.`,
  ];
}

function meanSteps(ctx: StatCtx, vs: number[], dp?: number): string[] {
  const t = sum(vs);
  const m = t / vs.length;
  const shown = dp === undefined ? num(m) : fmtFixed(m, dp);
  return [
    `Add all the values: $${plus(vs)} = ${num(t)}$`,
    `Divide by the number of values, $${vs.length}$: $${num(t)} \\div ${vs.length} ${eq(m)}$`,
    `The mean is ${dp === undefined || isWhole(m * 10 ** dp) ? '' : 'about '}${ctx.money ? `\\$${shown}` : ctx.tex ? `$${shown}${ctx.tex}$` : `$${shown}$ ${ctx.unit}`}.`,
  ];
}

function statValues(rng: Rng, ctx: StatCtx, d: Lvl, n: number): number[] {
  const [lo, hi] = d === 1 ? ctx.r1 : ctx.r2;
  return Array.from({ length: n }, () => (d > 1 && ctx.half && rng.chance(0.3) ? rng.int(lo, hi - 1) + 0.5 : rng.int(lo, hi)));
}

/** n values in range whose mean is a whole number (exactly divisible). */
function wholeMeanValues(rng: Rng, ctx: StatCtx, d: Lvl, n: number): number[] {
  const [lo, hi] = d === 1 ? ctx.r1 : ctx.r2;
  return retry(
    () => {
      const vs = Array.from({ length: n - 1 }, () => rng.int(lo, hi));
      const target = Math.round(sum(vs) / (n - 1)) + rng.int(-2, 2);
      vs.push(target * n - sum(vs));
      return rng.shuffle(vs);
    },
    (vs) => vs.every((v) => v >= lo && v <= hi),
    200,
  );
}

function modeValues(rng: Rng, ctx: StatCtx, d: Lvl, n: number): number[] {
  const [lo, hi] = d === 1 ? ctx.r1 : ctx.r2;
  const pool: number[] = [];
  for (let v = lo; v <= hi; v++) pool.push(v);
  const reps = d === 1 ? 2 : rng.int(2, 3);
  const distinct = rng.sample(pool, n - reps + 1);
  const vs = [...distinct, ...Array(reps - 1).fill(distinct[0])];
  // d2: a second value appears twice when the mode appears three times.
  if (reps === 3 && n >= 8) vs[vs.length - reps] = distinct[1];
  return rng.shuffle(vs);
}

function measureItem(rng: Rng, d: Lvl, ctx: StatCtx, name: string, m: Measure): Out {
  const n = d === 1 ? (m === 'median' ? 7 : rng.int(6, 7)) : rng.int(7, 9);
  const intro = ctx.intro(name, n);
  const ask = (what: string) => `What is the **${what}**?`;
  if (m === 'mean') {
    const vs = d === 1 ? wholeMeanValues(rng, ctx, d, n) : retry(() => statValues(rng, ctx, d, n), (v) => !onEdge(sum(v) / n, ctx.money ? 2 : 1) && !isWhole(sum(v) / n));
    const dp = d === 1 ? undefined : ctx.money ? 2 : 1;
    const mean = sum(vs) / n;
    return {
      prompt: `${intro} ${showList(ctx, vs)}. ${ask(`mean ${ctx.noun}`)}${dp === undefined ? '' : ` Round ${dp === 2 ? CENT : 'to the nearest tenth'}.`}`,
      parts: [valuePart(ctx, mean, dp)],
      hints: ['Add all the values first.', `Then divide the total by how many values there are ($${n}$).`],
      solution: [MEASURE_DEF.mean, ...meanSteps(ctx, vs, dp)],
    };
  }
  if (m === 'median') {
    const vs = retry(() => statValues(rng, ctx, d, n), (v) => new Set(v).size >= v.length - 1);
    const med = median(vs);
    return {
      prompt: `${intro} ${showList(ctx, vs)}. ${ask(`median ${ctx.noun}`)}`,
      parts: [valuePart(ctx, med)],
      hints: ['Write the values in order from least to greatest first.', n % 2 ? 'Cross off one value from each end until one value is left in the middle.' : 'With an even number of values, the median is halfway between the two middle values.'],
      solution: [MEASURE_DEF.median, ...medianSteps(ctx, vs)],
    };
  }
  if (m === 'mode') {
    const vs = modeValues(rng, ctx, d, n);
    const counts = new Map<number, number>();
    for (const v of vs) counts.set(v, (counts.get(v) ?? 0) + 1);
    const top = Math.max(...counts.values());
    const mode = [...counts].find(([, c]) => c === top)![0];
    return {
      prompt: `${intro} ${showList(ctx, vs)}. ${ask(`mode`)}`,
      parts: [valuePart(ctx, mode)],
      hints: ['Look for a value that shows up more than once.', 'Putting the values in order puts matching values side by side.'],
      solution: [MEASURE_DEF.mode, `In order: ${listTex(asc(vs))}`, `${fmtVal(ctx, mode)} appears $${top}$ times, more than any other value.`, `The mode is ${fmtVal(ctx, mode)}.`],
    };
  }
  const vs = retry(() => statValues(rng, ctx, d, n), (v) => new Set(v).size === v.length);
  const hi = Math.max(...vs);
  const lo = Math.min(...vs);
  return {
    prompt: `${intro} ${showList(ctx, vs)}. ${ask('range')}`,
    parts: [valuePart(ctx, hi - lo)],
    hints: ['Find the highest value and the lowest value.', 'Range = highest − lowest.'],
    solution: [MEASURE_DEF.range, `Highest: ${fmtVal(ctx, hi)}. Lowest: ${fmtVal(ctx, lo)}.`, `$${num(hi)} - ${num(lo)} = ${num(hi - lo)}$`, `The range is ${fmtVal(ctx, hi - lo)}.`],
  };
}

function statTwoStep(rng: Rng, name: string): Out {
  const mode = rng.pick(['next', 'above', 'pay'] as const);
  if (mode === 'next') {
    const ctx = rng.pick(STATS.filter((c) => c.next));
    const nx = ctx.next!;
    const n = rng.int(5, 7);
    const t = rng.pick(nx.targets);
    const vs = retry(
      () => Array.from({ length: n }, () => t + rng.int(-Math.round(t * 0.25), Math.round(t * 0.25))),
      (v) => {
        const need = t * (n + 1) - sum(v);
        return need >= ctx.r2[0] && need <= ctx.r2[1] && need !== t && v.every((x) => x >= ctx.r2[0] && x <= ctx.r2[1]);
      },
      200,
    );
    const need = t * (n + 1) - sum(vs);
    return {
      prompt: `${ctx.intro(name, n)} ${showList(ctx, vs)}. ${nx.text(name, n, t)}`,
      parts: [numPart(need, { suffix: ctx.unit || undefined })],
      hints: [`For a mean of $${t}$ over $${n + 1}$ ${nx.item}s, the total must be $${t} \\times ${n + 1}$.`, 'Subtract the total so far from the total needed.'],
      solution: [
        `Total needed for a mean of $${t}$: $${t} \\times ${n + 1} = ${t * (n + 1)}$`,
        `Total so far: $${plus(vs)} = ${sum(vs)}$`,
        `Needed next ${nx.item}: $${t * (n + 1)} - ${sum(vs)} = ${need}$`,
        `${name} needs ${fmtVal(ctx, need)} in the next ${nx.item}.`,
      ],
    };
  }
  if (mode === 'pay') {
    const ctx = STATS[2];
    const n = rng.int(5, 7);
    const vs = wholeMeanValues(rng, { ...ctx, r1: [12, 30] }, 1, n);
    const mean = sum(vs) / n;
    const wage = rng.pick([15.5, 16, 16.25, 16.75, 17.5, 18.25]);
    const pay = roundTo(mean * wage, 2);
    return {
      prompt: `${ctx.intro(name, n)} ${showList(ctx, vs)}. ${name} earns ${money(wage)} per hour. Use the mean number of hours to find ${name}’s pay for a typical week.`,
      parts: [moneyPart(pay)],
      hints: ['First find the mean number of hours per week.', `Then multiply the mean by the hourly wage, ${money(wage)}.`],
      solution: [`Total hours: $${plus(vs)} = ${sum(vs)}$`, `Mean: $${sum(vs)} \\div ${n} = ${num(mean)}\\ \\text{h}$`, `Pay: $${num(mean)} \\times ${mv(wage)} = ${mv(pay)}$`, `A typical week pays ${money(pay)}.`],
    };
  }
  // How far above the mean is the highest value?
  const ctx = rng.pick(STATS.filter((c) => !c.half));
  const n = rng.int(6, 8);
  const vs = retry(() => wholeMeanValues(rng, ctx, 2, n), (v) => new Set(v).size === v.length);
  const mean = sum(vs) / n;
  const hi = Math.max(...vs);
  return {
    prompt: `${ctx.intro(name, n)} ${showList(ctx, vs)}. How much greater is the highest value than the mean?`,
    parts: [valuePart(ctx, hi - mean)],
    hints: ['First find the mean: add the values, then divide by how many there are.', 'Then subtract the mean from the highest value.'],
    solution: [`Total: $${plus(vs)} = ${num(sum(vs))}$`, `Mean: $${num(sum(vs))} \\div ${n} = ${num(mean)}$`, `Highest value: $${num(hi)}$. Subtract: $${num(hi)} - ${num(mean)} = ${num(hi - mean)}$`, `The highest value is ${fmtVal(ctx, hi - mean)} above the mean.`],
  };
}

const centralTendency = skill({
  id: 'm104-central-tendency',
  name: 'Mean, median, mode and range',
  description: 'Find the mean, median, mode or range of a small data set from everyday life or work.',
  outcomes: ['SP1'],
  lessonId: 'm104-9-2',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 3) return statTwoStep(rng, name);
    const ctx = rng.pick(STATS);
    const m = rng.pick(['mean', 'median', 'mode', 'range'] as Measure[]);
    return measureItem(rng, d, ctx, name, m);
  },
});

// ---------------------------------------------------------------------------
// 9.3 Probability
// ---------------------------------------------------------------------------

const COLOURS = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'white', 'black'];
const BAGS: Array<{ has: (desc: string) => string; pick: (name: string) => string; thing: string }> = [
  { has: (desc) => `A bag has ${desc} marbles.`, pick: (name) => `${name} picks one marble without looking.`, thing: 'marble' },
  { has: (desc) => `A gumball machine has ${desc} gumballs.`, pick: (name) => `${name} gets one gumball at random.`, thing: 'gumball' },
  { has: (desc) => `A drawer has ${desc} socks.`, pick: (name) => `${name} grabs one sock in the dark.`, thing: 'sock' },
  { has: (desc) => `A cup at the front desk holds ${desc} pens.`, pick: (name) => `${name} takes one pen without looking.`, thing: 'pen' },
  { has: (desc) => `A jar has ${desc} jelly beans.`, pick: (name) => `${name} picks one jelly bean without looking.`, thing: 'jelly bean' },
];
const bagText = (b: (typeof BAGS)[number], name: string, desc: string) => `${b.has(desc)} ${b.pick(name)}`;
/** "a red" or "an orange". */
const an = (w: string) => (/^[aeiou]/i.test(w) ? `an ${w}` : `a ${w}`);

function bagDesc(cols: string[], counts: number[]): string {
  const parts = cols.map((c, k) => `$${counts[k]}$ ${c}`);
  if (parts.length === 1) return parts[0];
  return parts.length === 2 ? `${parts[0]} and ${parts[1]}` : `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`;
}

const PROB_DEF = 'Probability $= \\dfrac{\\text{number of favourable outcomes}}{\\text{total number of outcomes}}$';

const LIKELY = ['Impossible', 'Unlikely', 'Equally likely', 'Likely', 'Certain'] as const;
type Likely = (typeof LIKELY)[number];
function likelyWord(n: number, d: number): Likely {
  if (n === 0) return 'Impossible';
  if (n === d) return 'Certain';
  if (2 * n === d) return 'Equally likely';
  return 2 * n < d ? 'Unlikely' : 'Likely';
}
const LIKELY_RULE = 'Impossible: it can never happen. Unlikely: less than half the time. Equally likely: exactly half the time. Likely: more than half the time. Certain: it always happens.';

function likelihoodItem(rng: Rng, name: string): Out {
  const kind = rng.pick(['bag', 'die', 'spinner'] as const);
  let prompt = '';
  let fav = 0;
  let tot = 0;
  let why = '';
  if (kind === 'die') {
    const ev = rng.pick([
      { t: 'rolls a $7$', f: 0, why: 'A regular die only has the numbers $1$ to $6$.' },
      { t: 'rolls a number less than $7$', f: 6, why: 'Every number on the die, $1$ to $6$, is less than $7$.' },
      { t: 'rolls an even number', f: 3, why: 'Three of the six numbers ($2$, $4$, $6$) are even. That is exactly half.' },
      { t: 'rolls an odd number', f: 3, why: 'Three of the six numbers ($1$, $3$, $5$) are odd. That is exactly half.' },
      { t: 'rolls a $6$', f: 1, why: 'Only one of the six numbers is a $6$. That is less than half.' },
      { t: 'rolls a number greater than $1$', f: 5, why: 'Five of the six numbers ($2$ to $6$) are greater than $1$. That is more than half.' },
      { t: 'rolls a $0$', f: 0, why: 'There is no $0$ on a regular die.' },
      { t: 'rolls a number from $1$ to $6$', f: 6, why: 'Every roll is a number from $1$ to $6$.' },
    ]);
    prompt = `${name} rolls a regular six-sided die (numbers $1$ to $6$). How likely is it that ${name} ${ev.t}?`;
    fav = ev.f;
    tot = 6;
    why = ev.why;
  } else {
    const thing = kind === 'bag' ? rng.pick(BAGS) : null;
    const [a, b] = rng.sample(COLOURS, 2);
    const target = rng.pick(['Impossible', 'Unlikely', 'Equally likely', 'Likely', 'Certain'] as Likely[]);
    let na = 0;
    let nb = 0;
    if (target === 'Impossible') { na = 0; nb = rng.int(4, 12); }
    else if (target === 'Certain') { na = rng.int(4, 12); nb = 0; }
    else if (target === 'Equally likely') { na = nb = rng.int(3, 8); }
    else if (target === 'Unlikely') { na = rng.int(1, 3); nb = rng.int(na * 3, 14); }
    else { nb = rng.int(1, 3); na = rng.int(nb * 3, 14); }
    if (kind === 'bag') {
      const cols = na === 0 ? [b] : nb === 0 ? [a] : [a, b];
      const counts = na === 0 ? [nb] : nb === 0 ? [na] : [na, nb];
      prompt = `${bagText(thing!, name, bagDesc(cols, counts))} How likely is it that ${name} gets ${an(a)} ${thing!.thing}?`;
      why = na === 0 ? `There are no ${a} ${thing!.thing}s at all.` : nb === 0 ? `Every ${thing!.thing} is ${a}.` : `$${na}$ out of $${na + nb}$ are ${a}. ${2 * na === na + nb ? 'That is exactly half.' : 2 * na < na + nb ? 'That is less than half.' : 'That is more than half.'}`;
    } else {
      const secs = rng.pick([4, 6, 8, 10, 12]);
      const q = rng.int(1, Math.floor(secs / 4));
      na = { Impossible: 0, Certain: secs, 'Equally likely': secs / 2, Unlikely: q, Likely: secs - q }[target];
      nb = secs - na;
      prompt = na === 0
        ? `A spinner has $${secs}$ equal sections. All of them are ${b}. How likely is it that the spinner lands on ${a}?`
        : nb === 0
          ? `A spinner has $${secs}$ equal sections. All of them are ${a}. How likely is it that the spinner lands on ${a}?`
          : `A spinner has $${secs}$ equal sections: $${na}$ are ${a} and $${nb}$ are ${b}. How likely is it that the spinner lands on ${a}?`;
      why = na === 0 ? `No section is ${a}.` : nb === 0 ? `Every section is ${a}.` : `$${na}$ out of $${secs}$ sections are ${a}. ${2 * na === secs ? 'That is exactly half.' : 2 * na < secs ? 'That is less than half.' : 'That is more than half.'}`;
    }
    fav = na;
    tot = na + nb;
  }
  const word = likelyWord(fav, tot);
  // Four of the five words, always including the answer, in their natural order.
  const drop = rng.pick(LIKELY.filter((w) => w !== word));
  const options = LIKELY.filter((w) => w !== drop);
  return {
    prompt,
    parts: [{ answer: fixedChoice([...options], options.indexOf(word)) }],
    hints: ['Compare the number of ways it can happen with the total number of outcomes.', LIKELY_RULE],
    solution: [why, `So the event is **${word.toLowerCase()}**.`],
    answerDisplay: word,
  };
}

/** Simple events: [prompt, favourable, total, explanation]. */
function simpleEvent(rng: Rng, d: Lvl, name: string): { prompt: string; f: number; t: number; why: string; figure?: Figure } {
  const kind = rng.pick(d === 1 ? (['bag', 'die', 'spinner'] as const) : (['bag', 'cards', 'raffle', 'wheel'] as const));
  if (kind === 'die') {
    const ev = rng.pick([
      { t: 'a $4$', f: 1, why: 'There is one $4$.' },
      { t: 'an even number', f: 3, why: 'The even numbers are $2$, $4$ and $6$.' },
      { t: 'an odd number', f: 3, why: 'The odd numbers are $1$, $3$ and $5$.' },
      { t: 'a number greater than $4$', f: 2, why: 'The numbers greater than $4$ are $5$ and $6$.' },
      { t: 'a number less than $3$', f: 2, why: 'The numbers less than $3$ are $1$ and $2$.' },
      { t: 'a $1$ or a $6$', f: 2, why: 'That is $2$ of the numbers.' },
      { t: 'a number less than $5$', f: 4, why: 'The numbers less than $5$ are $1$, $2$, $3$ and $4$.' },
    ]);
    return { prompt: `${name} rolls a regular six-sided die (numbers $1$ to $6$). What is the probability of rolling ${ev.t}?`, f: ev.f, t: 6, why: `There are $6$ possible outcomes. ${ev.why}` };
  }
  if (kind === 'spinner') {
    const secs = rng.int(4, 6);
    const ev = rng.pick([
      { t: `a $${rng.int(1, secs)}$`, f: 1 },
      { t: 'an even number', f: Math.floor(secs / 2) },
      { t: 'a number greater than $2$', f: secs - 2 },
      { t: 'a number less than $4$', f: 3 },
    ]);
    const figure: Figure = { type: 'circleGraph', slices: Array.from({ length: secs }, (_, k) => ({ label: String(k + 1), value: 1 })), show: 'none' };
    return { prompt: `The spinner has $${secs}$ equal sections numbered $1$ to $${secs}$. What is the probability that it lands on ${ev.t}?`, f: ev.f, t: secs, why: `There are $${secs}$ equal sections, and $${ev.f}$ of them match.`, figure };
  }
  if (kind === 'bag') {
    const thing = rng.pick(BAGS);
    const k = d === 1 ? rng.int(2, 3) : 3;
    const cols = rng.sample(COLOURS, k);
    const counts = retry(
      () => cols.map(() => (d === 1 ? rng.int(1, 6) : rng.int(2, 12))),
      (cs) => d === 1 || [10, 20, 25, 40, 50].includes(sum(cs)),
      300,
    );
    const i = rng.int(0, k - 1);
    return {
      prompt: `${bagText(thing, name, bagDesc(cols, counts))} What is the probability that it is ${cols[i]}?`,
      f: counts[i],
      t: sum(counts),
      why: `There are $${plus(counts)} = ${sum(counts)}$ ${thing.thing}s in all, and $${counts[i]}$ are ${cols[i]}.`,
    };
  }
  if (kind === 'cards') {
    const ev = rng.pick([
      { t: 'a red card', f: 26, why: 'Hearts and diamonds are red: $13 + 13 = 26$ cards.' },
      { t: 'a heart', f: 13, why: 'There are $13$ hearts.' },
      { t: 'a black card', f: 26, why: 'Clubs and spades are black: $13 + 13 = 26$ cards.' },
      { t: 'a spade', f: 13, why: 'There are $13$ spades.' },
      { t: 'a club or a diamond', f: 26, why: 'There are $13$ clubs and $13$ diamonds: $26$ cards.' },
    ]);
    return {
      prompt: `A standard deck has $52$ cards. There are $4$ suits (hearts, diamonds, clubs and spades) with $13$ cards in each suit. Hearts and diamonds are red. Clubs and spades are black. ${name} shuffles the deck and picks one card. What is the probability of picking ${ev.t}?`,
      f: ev.f,
      t: 52,
      why: `There are $52$ cards. ${ev.why}`,
    };
  }
  if (kind === 'raffle') {
    const t = rng.pick([100, 200, 250, 400, 500]);
    const f = rng.pick([1, 2, 4, 5, 10, 20].filter((x) => x * 20 <= t && isWhole((1000 * x) / t)));
    const cause = rng.pick(['the food bank', 'a minor hockey team', 'the school band trip', 'a 4-H club', 'the animal shelter']);
    return {
      prompt: `A raffle for ${cause} sold $${t}$ tickets. ${name} bought $${f}$ of them. One winning ticket is drawn. What is the probability that ${name} wins?`,
      f,
      t,
      why: `There are $${t}$ tickets, and $${f}$ of them are ${name}’s.`,
    };
  }
  // Prize wheel with merged sections.
  const secs = rng.pick([8, 10, 20]);
  const big = 1;
  const small = rng.int(2, Math.floor(secs / 2) - 1);
  const again = secs - big - small;
  const which = rng.pick([['the big prize', big], ['a small prize', small], ['“Try again”', again]] as const);
  const figure: Figure = { type: 'circleGraph', slices: [{ label: 'Big prize', value: big }, { label: 'Small prize', value: small }, { label: 'Try again', value: again }], show: 'none' };
  return {
    prompt: `A prize wheel at a community fair has $${secs}$ equal sections: $${big}$ says “Big prize”, $${small}$ say “Small prize” and $${again}$ say “Try again”. What is the probability of landing on ${which[0]}?`,
    f: which[1],
    t: secs,
    why: `There are $${secs}$ equal sections, and $${which[1]}$ of them give ${which[0]}.`,
    figure,
  };
}

function probAnswer(rng: Rng, d: Lvl, f: number, t: number): { form: 'fraction' | 'decimal' | 'percent'; part: Part; steps: string[]; ask: string; display: string } {
  const p = f / t;
  const exactDec = isWhole(p * 100);
  const form = d === 1 ? 'fraction' : exactDec ? rng.pick(['decimal', 'percent'] as const) : 'percent';
  if (form === 'fraction') {
    return { form, part: numPart(p), steps: [`$P = ${frSimp(f, t)}$`], ask: 'Write the answer as a fraction.', display: `$${frLow(f, t)}$` };
  }
  if (form === 'decimal') {
    return {
      form,
      part: numPart(p, { decimals: exactDec ? undefined : 2 }),
      steps: [`$P = ${fr(f, t)}$`, `Divide: $${f} \\div ${t} = ${num(p)}$`],
      ask: 'Write the answer as a decimal.',
      display: `$${num(p)}$`,
    };
  }
  const pc = p * 100;
  const exact = isWhole(pc * 10);
  return {
    form,
    part: numPart(pc, { suffix: '%', decimals: exact ? undefined : 1 }),
    steps: [`$P = ${fr(f, t)}$`, `Divide: $${f} \\div ${t} ${eq(p)}$`, `Multiply by $100$ to get a percent: $${num(p, 6)} \\times 100 ${eq(pc, exact ? 4 : 1)}\\%$`],
    ask: exact ? 'Write the answer as a percent.' : 'Write the answer as a percent, to the nearest tenth of a percent.',
    display: `$${exact ? num(pc) : fmtFixed(pc, 1)}\\%$`,
  };
}

function probTwoStep(rng: Rng, name: string): Out {
  const mode = rng.pick(['not', 'either', 'added', 'compare', 'raffle'] as const);
  const thing = rng.pick(BAGS);
  if (mode === 'compare') {
    const thing = rng.pick([BAGS[0], BAGS[4]]);
    const col = rng.pick(COLOURS);
    const [ta, tb] = rng.sample([10, 20, 25, 50], 2);
    const fa = rng.int(2, Math.floor(ta * 0.6));
    const fb = retry(() => rng.int(2, Math.floor(tb * 0.6)), (x) => x * ta !== fa * tb && Math.abs(x / tb - fa / ta) >= 0.04);
    const pa = (fa / ta) * 100;
    const pb = (fb / tb) * 100;
    const best = pa > pb ? 'Bag A' : 'Bag B';
    return {
      prompt: `${name} can pick one ${thing.thing} without looking from Bag A or Bag B. Bag A has $${ta}$ ${thing.thing}s and $${fa}$ of them are ${col}. Bag B has $${tb}$ ${thing.thing}s and $${fb}$ of them are ${col}. ${name} wants ${an(col)} one. Which bag gives a better chance?`,
      parts: [{ answer: fixedChoice(['Bag A', 'Bag B', 'Both bags give the same chance'], best === 'Bag A' ? 0 : 1) }],
      hints: ['Find the probability for each bag.', 'Change each probability to a percent so they are easy to compare.'],
      solution: [`Bag A: $${fr(fa, ta)} = ${num(pa)}\\%$`, `Bag B: $${fr(fb, tb)} = ${num(pb)}\\%$`, `$${num(Math.max(pa, pb))}\\%$ is greater, so **${best}** gives the better chance.`],
      answerDisplay: best,
    };
  }
  if (mode === 'raffle') {
    const t = rng.pick([200, 250, 400, 500]);
    const a = rng.pick([2, 4, 5, 6, 10]);
    const b = rng.pick([1, 2, 3, 4, 5, 10]);
    const other = rng.pick(['brother', 'sister', 'aunt', 'grandfather', 'best friend']);
    const pc = ((a + b) / t) * 100;
    return {
      prompt: `A 50/50 draw at a junior hockey game sold $${t}$ tickets. ${name} bought $${a}$ tickets and ${name}’s ${other} bought $${b}$ tickets. One ticket wins. What is the probability that one of them wins? Write the answer as a percent.`,
      parts: [numPart(pc, { suffix: '%' })],
      hints: ['First add the two people’s tickets.', 'Divide by the total number of tickets, then multiply by $100$.'],
      solution: [`Their tickets: $${a} + ${b} = ${a + b}$`, `$P = ${fr(a + b, t)} = ${num((a + b) / t)}$`, `As a percent: $${num((a + b) / t)} \\times 100 = ${num(pc)}\\%$`, `The probability is $${num(pc)}\\%$.`],
    };
  }
  const cols = rng.sample(COLOURS, 3);
  const counts = retry(() => cols.map(() => rng.int(2, 9)), (cs) => new Set(cs).size === 3);
  const tot = sum(counts);
  const desc = bagDesc(cols, counts);
  if (mode === 'not') {
    const i = rng.int(0, 2);
    const f = tot - counts[i];
    return {
      prompt: `${bagText(thing, name, desc)} What is the probability that it is **not** ${cols[i]}? Write the answer as a fraction.`,
      parts: [numPart(f / tot)],
      hints: [`Count the ${thing.thing}s that are not ${cols[i]}.`, 'Put that count over the total number.'],
      solution: [`Total: $${plus(counts)} = ${tot}$`, `Not ${cols[i]}: $${tot} - ${counts[i]} = ${f}$`, `$P(\\text{not ${cols[i]}}) = ${frSimp(f, tot)}$`, `The probability is $${frLow(f, tot)}$.`],
    };
  }
  if (mode === 'either') {
    const [i, j] = rng.sample([0, 1, 2], 2).sort();
    const f = counts[i] + counts[j];
    return {
      prompt: `${bagText(thing, name, desc)} What is the probability that it is ${cols[i]} or ${cols[j]}? Write the answer as a fraction.`,
      parts: [numPart(f / tot)],
      hints: [`Add the ${cols[i]} and ${cols[j]} ${thing.thing}s.`, 'Put that number over the total number.'],
      solution: [`Total: $${plus(counts)} = ${tot}$`, `${cap(cols[i])} or ${cols[j]}: $${counts[i]} + ${counts[j]} = ${f}$`, `$P = ${frSimp(f, tot)}$`, `The probability is $${frLow(f, tot)}$.`],
    };
  }
  // added
  const i = rng.int(0, 2);
  const add = rng.int(2, 6);
  const f = counts[i] + add;
  const t2 = tot + add;
  return {
    prompt: `${thing.has(desc)} Then $${add}$ more ${cols[i]} ${thing.thing}s are added. Now ${thing.pick(name)} What is the probability that it is ${cols[i]}? Write the answer as a fraction.`,
    parts: [numPart(f / t2)],
    hints: ['Find the new number of each colour and the new total.', 'Probability = favourable ÷ total.'],
    solution: [`New number of ${cols[i]}: $${counts[i]} + ${add} = ${f}$`, `New total: $${tot} + ${add} = ${t2}$`, `$P = ${frSimp(f, t2)}$`, `The probability is $${frLow(f, t2)}$.`],
  };
}

const probability = skill({
  id: 'm104-probability',
  name: 'Probability of simple events',
  description: 'Describe how likely an event is and find a probability as a fraction, decimal or percent.',
  outcomes: ['SP2'],
  lessonId: 'm104-9-3',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 3) return probTwoStep(rng, name);
    if (d === 1 && rng.chance(0.35)) return likelihoodItem(rng, name);
    const ev = simpleEvent(rng, d, name);
    const a = probAnswer(rng, d, ev.f, ev.t);
    return {
      prompt: `${ev.prompt} ${a.ask}`,
      figure: ev.figure,
      parts: [a.part],
      hints: [PROB_DEF, d === 1 ? 'Count the outcomes you want. Then count all the outcomes.' : a.form === 'percent' ? 'Find the fraction first. Divide, then multiply by $100$ to get a percent.' : 'Find the fraction first. Then divide the top number by the bottom number.'],
      solution: [PROB_DEF, ev.why, ...a.steps, `The probability is ${a.display}.`],
    };
  },
});

export const DATA_SKILLS: SkillDef[] = [readGraph, chooseDisplay, centralTendency, probability];
