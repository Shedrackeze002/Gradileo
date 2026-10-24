/** Math 20-4 Unit 4 — Budgeting and Credit (N4, PR1). Simple interest only; every rate and rule is stated in the question. */
import { fixedChoice, mc, numPart, part, retry, skill } from '../../helpers.ts';
import { fmt, fmtFixed, fmtGroupTex, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle', 'Owen',
  'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas', 'Yusuf',
  'Maya', 'Kiona', 'Tyler', 'Ananya', 'Nathan', 'Lena', 'Diego', 'Harpreet', 'Noor', 'Marcus', 'Jasmine', 'Thanh',
  'Sipho', 'Bianca', 'Cody', 'Leila', 'Rowan', 'Gabriel',
];
const JOBS = [
  'a grocery store', 'a coffee shop', 'a hotel', 'a warehouse', 'a landscaping company', 'a fast-food restaurant',
  'a hair salon', 'a child care centre', 'an auto detailing shop', 'a building supply store', 'a farm supply store', 'a car wash',
];
const CITIES = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Clearwater', 'Ashford', 'Pinewood'];

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure };
type Lvl = 1 | 2;

const isWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
/** A number inside maths (at most `dp` decimals, thousands grouped). */
const num = (x: number, dp = 4) => fmtGroupTex(x, dp);
function group(s: string): string {
  const [i, f] = s.split('.');
  const g = i.length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : i;
  return f === undefined ? g : `${g}.${f}`;
}
/** Money in prose, always with cents: \$12.50. Never put this inside $...$. */
const money = (x: number) => `\\$${group(fmtFixed(x, 2))}`;
/** A price: whole dollars print without cents (\$950), otherwise \$54.99. */
const tag = (x: number) => (isWhole(x) ? `\\$${group(String(Math.round(x)))}` : money(x));
/** A money amount inside maths, without a dollar sign: 1250 or 12.50. */
const mv = (x: number) => (isWhole(x) ? num(Math.round(x)) : group(fmtFixed(x, 2)).replace(/,/g, '{,}'));
/** Plain-text money for table cells (cells are not Markdown). */
const cell = (x: number, cents: boolean) => `$${group(cents ? fmtFixed(x, 2) : String(Math.round(x)))}`;
/** "about " when a money value had to be rounded to the cent. */
const abt = (x: number) => (isWhole(x * 100) ? '' : 'about ');
/** A percent in prose (4.5%) and in maths (4.5\%), and the rate as a decimal (0.045). */
const pc = (r: number) => `${fmt(r)}%`;
const pcm = (r: number) => `${fmt(r)}\\%`;
const dec = (r: number) => fmt(r / 100, 6);
const sumOf = (xs: number[]) => roundTo(xs.reduce((s, x) => s + x, 0), 2);
const list = (xs: string[]) => (xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;
/** "a" or "an" before a word (an apartment, an SUV, a house). */
const an = (w: string) => `${/^([aeiou]|SUV)/i.test(w) ? 'an' : 'a'} ${w}`;

/** "= 12.5" when exact to `dp` places, otherwise "\approx 12.4567". */
function eq(v: number, dp = 4): string {
  return Math.abs(roundTo(v, dp) - v) < 1e-9 ? `= ${num(v, dp)}` : `\\approx ${num(v, dp)}`;
}
/** True when v sits too close to a rounding boundary (x.xx5) at `dp` places. */
function onEdge(v: number, dp: number): boolean {
  const s = Math.abs(v) * 10 ** dp;
  return Math.abs(s - Math.floor(s) - 0.5) < 0.06;
}
/** Smallest number of decimals (0-3) that writes v exactly, or -1. */
function exactDp(v: number): number {
  for (let dp = 0; dp <= 3; dp++) if (Math.abs(roundTo(v, dp) - v) < 1e-9) return dp;
  return -1;
}

// Money is graded to within a cent, not the 0.2% allowance used for measurements.
const moneyPart = (v: number, label = '\\$', suffix?: string): Part => numPart(v, { decimals: 2, tolerance: 0.011, label, suffix });
/** A non-money answer that is exact: integers stay exact, decimals get a matching `decimals`. */
function exactPart(v: number, suffix?: string, label?: string): Part {
  const dp = exactDp(v);
  return dp > 0 ? numPart(v, { decimals: dp, suffix, label }) : numPart(v, { suffix, label });
}
const yesNo = (label: string, yes: boolean): Part => part(fixedChoice(['Yes', 'No'], yes ? 0 : 1), { label });

// ---------------------------------------------------------------------------
// 4.1 Making a budget
// ---------------------------------------------------------------------------

interface ExpKind {
  label: string;
  fixed: boolean;
  d1: number[];
  /** Realistic range and how the cents look: whole multiples of 25 or 5, prices ending in .99, or any cents. */
  d2: [number, number, 'w25' | 'w5' | 'nine' | 'any'];
}
const EX: Record<string, ExpKind> = {
  rent: { label: 'Rent', fixed: true, d1: [550, 600, 650, 700, 750, 800], d2: [800, 1300, 'w25'] },
  board: { label: 'Room and board', fixed: true, d1: [350, 400, 450, 500], d2: [375, 650, 'w25'] },
  bus: { label: 'Bus pass', fixed: true, d1: [90, 100, 110], d2: [95, 115, 'w5'] },
  carIns: { label: 'Car insurance', fixed: true, d1: [120, 140, 150, 160, 180], d2: [110, 230, 'any'] },
  gas: { label: 'Gas for car', fixed: false, d1: [100, 120, 150, 180], d2: [90, 240, 'any'] },
  phone: { label: 'Phone plan', fixed: true, d1: [40, 50, 60], d2: [36, 81, 'nine'] },
  internet: { label: 'Internet', fixed: true, d1: [50, 60, 70], d2: [51, 91, 'nine'] },
  gym: { label: 'Gym membership', fixed: true, d1: [20, 30, 40], d2: [21, 46, 'nine'] },
  streaming: { label: 'Streaming service', fixed: true, d1: [10, 20], d2: [11, 26, 'nine'] },
  groceries: { label: 'Groceries', fixed: false, d1: [200, 250, 300, 350], d2: [180, 460, 'any'] },
  eating: { label: 'Eating out', fixed: false, d1: [40, 60, 80, 100], d2: [35, 160, 'any'] },
  fun: { label: 'Entertainment', fixed: false, d1: [30, 40, 50, 60], d2: [25, 120, 'any'] },
  clothes: { label: 'Clothing', fixed: false, d1: [30, 40, 50], d2: [20, 110, 'any'] },
  care: { label: 'Personal care', fixed: false, d1: [20, 30, 40], d2: [15, 70, 'any'] },
};

function expAmount(rng: Rng, k: ExpKind, d: Lvl): number {
  if (d === 1) return rng.pick(k.d1);
  const [lo, hi, style] = k.d2;
  if (style === 'w25') return rng.int(lo / 25, hi / 25) * 25;
  if (style === 'w5') return rng.int(lo / 5, hi / 5) * 5;
  if (style === 'nine') return rng.int(lo, hi) - 0.01;
  return rng.int(lo * 100, hi * 100) / 100;
}

interface Exp { label: string; fixed: boolean; amount: number }

/** A believable monthly budget: housing, transportation, one more fixed bill, then variable spending. */
function makeBudget(rng: Rng, d: Lvl, n: number): Exp[] {
  const board = rng.chance(0.3);
  const car = rng.chance(0.5);
  const kinds: ExpKind[] = [board ? EX.board : EX.rent, ...(car ? [EX.carIns, EX.gas] : [EX.bus])];
  kinds.push(rng.pick(board ? [EX.phone, EX.gym, EX.streaming] : [EX.phone, EX.internet, EX.gym]));
  if (!board && kinds.length < n) kinds.push(EX.groceries);
  kinds.push(...rng.sample([EX.eating, EX.fun, EX.clothes, EX.care], Math.max(0, n - kinds.length)));
  return kinds.map((k) => ({ label: k.label, fixed: k.fixed, amount: expAmount(rng, k, d) }));
}

const budgetTable = (items: Exp[], cents: boolean): Figure => ({
  type: 'table',
  headers: ['Expense', 'Cost per month'],
  rows: items.map((e) => [e.label, cell(e.amount, cents)]),
});

const LEFT_HINT = 'Money left over = take-home pay − total expenses.';

function budgetLeftover(rng: Rng, d: Lvl): Out {
  const name = rng.pick(NAMES);
  const where = `${rng.pick(JOBS)} in ${rng.pick(CITIES)}`;
  if (d === 1) {
    const items = makeBudget(rng, 1, 5);
    const T = sumOf(items.map((e) => e.amount));
    const I = Math.ceil((T + rng.int(100, 400)) / 100) * 100;
    const L = I - T;
    return {
      prompt: `${name} works at ${where} and takes home ${tag(I)} each month. The table shows ${name}’s monthly expenses. Find the total expenses and the money left over each month.`,
      figure: budgetTable(items, false),
      parts: [moneyPart(T, 'Total expenses: \\$'), moneyPart(L, 'Money left over: \\$')],
      hints: ['Add up all the expenses in the table.', LEFT_HINT],
      solution: [
        `Add the expenses: $${items.map((e) => mv(e.amount)).join(' + ')} = ${mv(T)}$`,
        `Subtract from the take-home pay: $${mv(I)} - ${mv(T)} = ${mv(L)}$`,
        `The total expenses are ${money(T)}, and ${name} has ${money(L)} left over each month.`,
      ],
    };
  }
  const items = rng.shuffle(makeBudget(rng, 2, 6));
  const fixed = items.filter((e) => e.fixed);
  const vari = items.filter((e) => !e.fixed);
  const F = sumOf(fixed.map((e) => e.amount));
  const V = sumOf(vari.map((e) => e.amount));
  const I = roundTo(F + V + rng.int(15000, 45000) / 100, 2);
  const L = roundTo(I - F - V, 2);
  const lower = (es: Exp[]) => list(es.map((e) => e.label.toLowerCase()));
  const sumLine = (es: Exp[], tot: number) => (es.length === 1 ? `$${mv(tot)}$` : `$${es.map((e) => mv(e.amount)).join(' + ')} = ${mv(tot)}$`);
  return {
    prompt: `${name} works at ${where} and takes home ${money(I)} each month. The table shows ${name}’s monthly expenses. Find the total of the **fixed** expenses, the total of the **variable** expenses, and the money left over each month.`,
    figure: budgetTable(items, true),
    parts: [moneyPart(F, 'Fixed expenses: \\$'), moneyPart(V, 'Variable expenses: \\$'), moneyPart(L, 'Money left over: \\$')],
    hints: [
      'A **fixed** expense is the same every month, like rent. A **variable** expense changes from month to month, like groceries.',
      `The fixed expenses here are ${lower(fixed)}. Add them, add the variable ones, then subtract both totals from the take-home pay.`,
    ],
    solution: [
      `Fixed expenses (the same every month): ${lower(fixed)}.`,
      `Fixed total: ${sumLine(fixed, F)}`,
      `Variable expenses (they change from month to month): ${lower(vari)}.`,
      `Variable total: ${sumLine(vari, V)}`,
      `Money left over: $${mv(I)} - ${mv(F)} - ${mv(V)} = ${mv(L)}$`,
      `Fixed expenses are ${money(F)}, variable expenses are ${money(V)}, and ${name} has ${money(L)} left over each month.`,
    ],
  };
}

function budgetClassify(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const askFixed = rng.chance(0.5);
  const FIXED = ['Rent', 'Phone plan', 'Car insurance', 'Bus pass', 'Internet', 'Gym membership', 'Car payment', 'Tenant insurance'];
  const VARIABLE = ['Groceries', 'Eating out', 'Gas for car', 'Clothing', 'Entertainment', 'Gifts', 'Personal care'];
  const correct = rng.pick(askFixed ? FIXED : VARIABLE);
  const others = rng.sample(askFixed ? VARIABLE : FIXED, 3);
  const kind = askFixed ? 'fixed' : 'variable';
  return {
    prompt: `${name} is making a monthly budget. Which of these is a **${kind} expense**?`,
    parts: [part(mc(rng, correct, others))],
    hints: [
      'A fixed expense costs the same amount every month. A variable expense can change from month to month.',
      askFixed ? 'Look for the bill that has a set price each month.' : 'Look for the cost that goes up or down with how much you buy or use.',
    ],
    solution: [
      `${correct} ${askFixed ? 'costs the same amount every month' : `${/s$/.test(correct) ? 'change' : 'changes'} from month to month, depending on how much you buy or use`}.`,
      `${list(others.map((o, i) => (i === 0 ? o : o.toLowerCase())))} ${askFixed ? 'can change from month to month, so they are variable' : 'cost the same every month, so they are fixed'}.`,
      `The ${kind} expense is ${correct.toLowerCase()}.`,
    ],
  };
}

const CIRCLE_CATS = [
  { label: 'Rent', phrase: 'rent' },
  { label: 'Food', phrase: 'food' },
  { label: 'Transportation', phrase: 'transportation' },
  { label: 'Savings', phrase: 'savings' },
  { label: 'Other', phrase: 'other spending' },
];

function budgetCircle(rng: Rng, d: Lvl): Out {
  const name = rng.pick(NAMES);
  const pcts = retry(
    () =>
      d === 1
        ? [rng.pick([30, 35, 40, 45]), rng.pick([15, 20, 25]), rng.pick([10, 15, 20]), rng.pick([5, 10, 15])]
        : [rng.int(28, 44), rng.int(12, 22), rng.int(8, 18), rng.int(5, 15)],
    (p) => 100 - sumOf(p) >= 5,
  );
  pcts.push(100 - sumOf(pcts));
  const I = d === 1 ? rng.pick([2000, 2400, 2500, 2800, 3000, 3200]) : rng.int(2150, 3450);
  const k = rng.int(0, 4);
  const p = pcts[k];
  const cat = CIRCLE_CATS[k];
  const A = roundTo((p * I) / 100, 2);
  return {
    prompt: `${name} takes home ${tag(I)} each month. The circle graph shows how ${name} plans to use this money. How much money does the plan set aside for ${cat.phrase} each month?`,
    figure: { type: 'circleGraph', slices: CIRCLE_CATS.map((c, i) => ({ label: c.label, value: pcts[i] })), show: 'percent', caption: `${name}’s monthly budget` },
    parts: [moneyPart(A)],
    hints: ['The whole circle is 100% of the take-home pay. Find the percent for this part of the budget.', `Change ${pc(p)} to a decimal, then multiply by the take-home pay: $${dec(p)} \\times ${mv(I)}$.`],
    solution: [
      `The graph shows ${cat.label} is ${pc(p)} of the take-home pay.`,
      `Write the percent as a decimal: $${pcm(p)} = ${dec(p)}$`,
      `Multiply: $${dec(p)} \\times ${mv(I)} = ${mv(A)}$`,
      `The plan sets aside ${money(A)} for ${cat.phrase} each month.`,
    ],
  };
}

const PCT_ITEMS: Array<{ what: string; goes: string; make: (rng: Rng) => number }> = [
  { what: 'rent', goes: 'rent', make: (r) => r.int(32, 56) * 25 },
  { what: 'groceries', goes: 'groceries', make: (r) => r.int(26000, 52000) / 100 },
  { what: 'car costs', goes: 'car costs', make: (r) => r.int(25000, 62000) / 100 },
  { what: 'eating out', goes: 'eating out', make: (r) => r.int(6000, 22000) / 100 },
  { what: 'a phone plan', goes: 'the phone plan', make: (r) => r.int(45, 95) - 0.01 },
];

function budgetPercent(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const it = rng.pick(PCT_ITEMS);
  const { E, I } = retry(
    () => ({ E: it.make(rng), I: rng.int(210000, 380000) / 100 }),
    (o) => !onEdge((o.E / o.I) * 100, 1),
  );
  const p = (E / I) * 100;
  return {
    prompt: `${name} takes home ${money(I)} each month and spends ${tag(E)} a month on ${it.what}. What percent of ${name}’s take-home pay goes to ${it.goes}? Round to the nearest tenth of a percent.`,
    parts: [numPart(p, { decimals: 1, suffix: '%' })],
    hints: ['Percent of income = the expense ÷ the income × 100.', `Work out $${mv(E)} \\div ${mv(I)} \\times 100$, then round to one decimal place.`],
    solution: [
      'Divide the expense by the income, then multiply by $100$ to get a percent.',
      `$${mv(E)} \\div ${mv(I)} \\times 100 ${eq(p, 3)}$`,
      `About ${fmtFixed(p, 1)}% of ${name}’s take-home pay goes to ${it.goes}.`,
    ],
  };
}

const GOALS = [
  { what: 'a damage deposit on an apartment', lo: 800, hi: 1400 },
  { what: 'a used car', lo: 2400, hi: 4800 },
  { what: 'a trip to the mountains', lo: 600, hi: 1200 },
  { what: 'a set of winter tires', lo: 600, hi: 1000 },
  { what: 'a laptop for a college course', lo: 900, hi: 1500 },
  { what: 'an emergency fund', lo: 1000, hi: 2000 },
  { what: 'steel-toed boots and tools for a new job', lo: 400, hi: 800 },
  { what: 'a concert weekend in the city', lo: 500, hi: 900 },
];
const CUTS = ['eating out', 'entertainment', 'clothing', 'take-out food'];

/** Monthly savings S (a multiple of 5) and months m so that S × m lands in the goal's range. */
function goalPlan(rng: Rng) {
  const g = rng.pick(GOALS);
  return retry(
    () => {
      const m = rng.int(4, 12);
      const lo = Math.ceil(g.lo / m / 5);
      const hi = Math.floor(g.hi / m / 5);
      const S = hi >= lo ? rng.int(lo, hi) * 5 : 0;
      return { g, m, S, G: S * m };
    },
    (o) => o.S >= 60,
  );
}

function budgetGoal(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const { g, m, S, G } = goalPlan(rng);
  const where = rng.pick(CUTS);
  if (rng.chance(0.5)) {
    // How much must be cut from spending to reach the goal on time?
    const cut = retry(() => rng.int(4, 30) * 5, (c) => S - c >= 30);
    const L = S - cut;
    return {
      prompt: `${name} wants to save ${tag(G)} for ${g.what}, and wants it ${plural(m, 'month')} from now. Right now, ${name} has ${tag(L)} left over at the end of each month. How much does ${name} need to save each month? How much less does ${name} need to spend each month to save that much?`,
      parts: [moneyPart(S, 'Save each month: \\$'), moneyPart(cut, 'Spend less by: \\$')],
      hints: ['First share the goal equally over the months: goal ÷ number of months.', 'Compare that with what is left over now. The difference has to come from spending less.'],
      solution: [
        `Savings needed each month: $${mv(G)} \\div ${m} = ${mv(S)}$`,
        `${name} has ${tag(L)} left over now, so the extra needed is $${mv(S)} - ${mv(L)} = ${mv(cut)}$`,
        `${name} needs to save ${money(S)} each month, so ${name} must spend ${money(cut)} less each month, for example on ${where}.`,
      ],
    };
  }
  // How long will it take after cutting spending?
  const cut = retry(() => rng.int(2, 20) * 5, (c) => S - c >= 30);
  const L = S - cut;
  return {
    prompt: `${name} wants to save ${tag(G)} for ${g.what}. Right now, ${name} has ${tag(L)} left over at the end of each month. ${name} decides to spend ${tag(cut)} less on ${where} each month and save that money too. How much will ${name} save each month now? How many months will it take to reach the goal?`,
    parts: [moneyPart(S, 'Saved each month: \\$'), numPart(m, { label: 'Time:', suffix: 'months' })],
    hints: ['The new monthly savings = what is left over now + the money saved by spending less.', 'Number of months = goal ÷ monthly savings.'],
    solution: [
      `New monthly savings: $${mv(L)} + ${mv(cut)} = ${mv(S)}$`,
      `Number of months: $${mv(G)} \\div ${mv(S)} = ${m}$`,
      `${name} will save ${money(S)} each month and reach the goal of ${tag(G)} in ${plural(m, 'month')}.`,
    ],
  };
}

const budget = skill({
  id: 'm204-budget',
  name: 'Making a budget',
  description: 'Total fixed and variable expenses, find the money left over, find an expense as a percent of income, and adjust a budget to save for a goal.',
  outcomes: ['N4'],
  lessonId: 'm204-4-1',
  calculator: true,
  gen(rng, d) {
    if (d === 3) return budgetGoal(rng);
    if (d === 1) {
      const kind = rng.pick(['left', 'left', 'classify', 'circle'] as const);
      if (kind === 'classify') return budgetClassify(rng);
      return kind === 'circle' ? budgetCircle(rng, 1) : budgetLeftover(rng, 1);
    }
    const kind = rng.pick(['left', 'circle', 'percent'] as const);
    if (kind === 'percent') return budgetPercent(rng);
    return kind === 'circle' ? budgetCircle(rng, 2) : budgetLeftover(rng, 2);
  },
});

// ---------------------------------------------------------------------------
// 4.2 Simple interest
// ---------------------------------------------------------------------------

const SAVE_FROM = ['money from a summer job', 'birthday money', 'a tax refund', 'tips from a restaurant job', 'savings from a warehouse job', 'money from a hockey camp job'];
const SAVE_WHERE = ['a savings account', 'a savings account at a credit union', 'a term deposit at a bank'];
const LOANS = [
  { what: 'a used car', d1: [3000, 4000, 5000], lo: 4500, hi: 12000 },
  { what: 'tools for a carpentry apprenticeship', d1: [1000, 1500, 2000], lo: 1200, hi: 3500 },
  { what: 'furniture for a first apartment', d1: [1000, 1200, 1500, 2000], lo: 900, hi: 2800 },
  { what: 'a laptop for school', d1: [800, 1000, 1200], lo: 850, hi: 1900 },
  { what: 'a used snowblower for a snow-removal business', d1: [600, 800, 1000], lo: 700, hi: 1600 },
  { what: 'a mower and trimmer for a lawn-care business', d1: [1000, 1500, 2000], lo: 1100, hi: 2600 },
];
const I_HINT = 'Use $I = Prt$: principal × rate (as a decimal) × time in years.';

function siBasic(rng: Rng, d: Lvl): Out {
  const name = rng.pick(NAMES);
  const saving = rng.chance(0.5);
  const loan = rng.pick(LOANS);
  let P: number;
  let r: number;
  if (d === 1) {
    P = saving ? rng.pick([500, 800, 1000, 1200, 1500, 2000, 2500, 3000, 4000, 5000]) : rng.pick(loan.d1);
    r = saving ? rng.pick([2, 3, 4, 5]) : rng.pick([5, 6, 8, 10]);
  } else {
    P = saving ? rng.int(24, 160) * 25 : rng.int(loan.lo / 25, loan.hi / 25) * 25;
    r = saving ? rng.pick([1.75, 2.25, 2.5, 3.1, 3.25, 3.75, 4.2, 4.5]) : rng.pick([5.9, 6.5, 6.99, 7.25, 7.5, 8.4, 8.99, 9.5]);
  }
  const intro = saving
    ? `${name} puts ${tag(P)} of ${rng.pick(SAVE_FROM)} into ${rng.pick(SAVE_WHERE)}. It pays simple interest of ${pc(r)} per year.`
    : `${name} borrows ${tag(P)} to buy ${loan.what}. The loan charges simple interest of ${pc(r)} per year.`;
  const totalQ = saving ? `How much money will be in the account at the end?` : `What is the total amount ${name} must pay back?`;
  const totalLabel = saving ? 'Total in account: \\$' : 'Total to pay back: \\$';
  const rateStep = `Write the rate as a decimal: $${pcm(r)} = ${dec(r)}$`;

  if (d === 1) {
    const t = rng.int(1, 4);
    const I = roundTo((P * r * t) / 100, 2);
    const askTotal = rng.chance(0.5);
    const A = P + I;
    const iQ = saving ? `How much interest will ${name} earn in ${plural(t, 'year')}?` : `How much interest will ${name} pay in ${plural(t, 'year')}?`;
    return {
      prompt: `${intro} ${iQ}${askTotal ? ` ${totalQ}` : ''}`,
      parts: askTotal ? [moneyPart(I, 'Interest: \\$'), moneyPart(A, totalLabel)] : [moneyPart(I, 'Interest: \\$')],
      hints: [I_HINT, `$I = ${mv(P)} \\times ${dec(r)} \\times ${t}$${askTotal ? '. Then add the interest to the principal.' : ''}`],
      solution: [
        rateStep,
        `$I = Prt = ${mv(P)} \\times ${dec(r)} \\times ${t} = ${mv(I)}$`,
        ...(askTotal ? [`Total: $A = P + I = ${mv(P)} + ${mv(I)} = ${mv(A)}$`] : []),
        `The interest is ${money(I)}${askTotal ? `, and the total is ${money(A)}` : ''}.`,
      ],
    };
  }
  const m = rng.pick([6, 8, 9, 10, 15, 18, 20, 30]);
  let I = (P * r * m) / 1200;
  // Re-pick the principal if the interest sits on a rounding boundary.
  for (let k = 0; k < 20 && onEdge(I, 2); k++) {
    P += 25;
    I = (P * r * m) / 1200;
  }
  const intro2 = saving
    ? `${name} puts ${tag(P)} of ${rng.pick(SAVE_FROM)} into ${rng.pick(SAVE_WHERE)} for ${m} months. It pays simple interest of ${pc(r)} per year.`
    : `${name} borrows ${tag(P)} for ${m} months to buy ${loan.what}. The loan charges simple interest of ${pc(r)} per year.`;
  const Ir = roundTo(I, 2);
  const A = roundTo(P + Ir, 2);
  return {
    prompt: `${intro2} How much interest ${saving ? 'is earned' : 'is charged'}? ${totalQ} Round to the nearest cent.`,
    parts: [moneyPart(I, 'Interest: \\$'), moneyPart(A, totalLabel)],
    hints: [I_HINT, `The time is ${m} months, so $t = \\dfrac{${m}}{12}$ of a year. Add the interest to the principal for the total.`],
    solution: [
      `${rateStep}. The time in years is $t = \\dfrac{${m}}{12}$.`,
      `$I = Prt = ${mv(P)} \\times ${dec(r)} \\times \\dfrac{${m}}{12} ${eq(I)}$, or ${abt(I)}${money(I)}`,
      `Total: $A = P + I = ${mv(P)} + ${mv(Ir)} = ${mv(A)}$`,
      `The interest is ${abt(I)}${money(I)}, and the total is ${money(A)}.`,
    ],
  };
}

function siFind(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const mode = rng.pick(['rate', 'rateTotal', 'time'] as const);
  const saving = rng.chance(0.5);
  const loan = rng.pick(LOANS);
  if (mode === 'time') {
    const { P, r, m, I } = retry(
      () => {
        const P = saving ? rng.int(8, 60) * 100 : rng.int(Math.ceil(loan.lo / 100), Math.floor(loan.hi / 100)) * 100;
        const r = saving ? rng.pick([2, 2.5, 3, 3.5, 4, 4.5, 5]) : rng.pick([6, 6.5, 7, 7.5, 8, 9]);
        const m = rng.pick([6, 9, 18, 24, 30, 36, 42]);
        return { P, r, m, I: (P * r * m) / 1200 };
      },
      (o) => isWhole(o.I * 100),
    );
    const Pr = roundTo((P * r) / 100, 2);
    const t = m / 12;
    return {
      prompt: saving
        ? `${name} put ${tag(P)} into a savings account that pays simple interest of ${pc(r)} per year. The account earned ${money(I)} in interest. For how many months was the money in the account?`
        : `${name} borrowed ${tag(P)} to buy ${loan.what}. The loan charged simple interest of ${pc(r)} per year, and ${name} paid ${money(I)} in interest. For how many months did ${name} have the loan?`,
      parts: [numPart(m, { suffix: 'months' })],
      hints: ['Put the numbers you know into $I = Prt$, then divide to find $t$ in years.', 'Multiply the years by $12$ to get months.'],
      solution: [
        `Start with $I = Prt$: $${mv(I)} = ${mv(P)} \\times ${dec(r)} \\times t$`,
        `$${mv(P)} \\times ${dec(r)} = ${mv(Pr)}$, so $${mv(I)} = ${mv(Pr)} \\times t$`,
        `Divide: $t = ${mv(I)} \\div ${mv(Pr)} = ${num(t)}$ years`,
        `Change to months: $${num(t)} \\times 12 = ${m}$`,
        `${saving ? 'The money was in the account' : `${name} had the loan`} for ${m} months.`,
      ],
    };
  }
  const { P, r, t, I } = retry(
    () => {
      const P = saving ? rng.int(10, 60) * 100 : rng.int(Math.ceil(loan.lo / 100), Math.floor(loan.hi / 100)) * 100;
      const r = saving ? rng.pick([1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]) : rng.pick([6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5]);
      const t = rng.int(2, 5);
      return { P, r, t, I: roundTo((P * r * t) / 100, 2) };
    },
    (o) => isWhole(o.I * 100),
  );
  const Pt = P * t;
  const A = roundTo(P + I, 2);
  const solveRate = [
    `Put the numbers into $I = Prt$: $${mv(I)} = ${mv(P)} \\times r \\times ${t}$`,
    `$${mv(P)} \\times ${t} = ${mv(Pt)}$, so $${mv(I)} = ${mv(Pt)} \\times r$`,
    `Divide: $r = ${mv(I)} \\div ${mv(Pt)} = ${dec(r)}$`,
    `Change to a percent: $${dec(r)} \\times 100 = ${pcm(r)}$`,
  ];
  if (mode === 'rate') {
    return {
      prompt: saving
        ? `${name} put ${tag(P)} into a savings account that pays simple interest. After ${t} years, the account had earned ${tag(I)} in interest. What is the interest rate per year?`
        : `${name} borrowed ${tag(P)} for ${t} years to buy ${loan.what}. The simple interest on the loan was ${tag(I)}. What was the interest rate per year?`,
      parts: [exactPart(r, '%')],
      hints: ['Put the numbers you know into $I = Prt$. The rate $r$ is the unknown.', `Divide the interest by $P \\times t$, then multiply by $100$ to get a percent.`],
      solution: [...solveRate, `The interest rate is ${pc(r)} per year.`],
    };
  }
  return {
    prompt: saving
      ? `${name} put ${tag(P)} into a savings account that pays simple interest. After ${t} years, the account holds ${tag(A)}. How much interest did the account earn? What is the interest rate per year?`
      : `${name} borrowed ${tag(P)} for ${t} years to buy ${loan.what}, and paid back ${tag(A)} in total. The loan charged simple interest. How much interest did ${name} pay? What was the interest rate per year?`,
    parts: [moneyPart(I, 'Interest: \\$'), exactPart(r, '%', 'Rate:')],
    hints: ['The interest is the total minus the principal: $I = A - P$.', 'Then put the numbers into $I = Prt$ and divide to find $r$.'],
    solution: [`Interest: $I = A - P = ${mv(A)} - ${mv(P)} = ${mv(I)}$`, ...solveRate, `The interest was ${money(I)}, and the rate is ${pc(r)} per year.`],
  };
}

const simpleInterest = skill({
  id: 'm204-simple-interest',
  name: 'Simple interest',
  description: 'Use I = Prt and A = P + I for savings and loans, with time in years or months, and find a missing rate or time.',
  outcomes: ['N4', 'PR1'],
  lessonId: 'm204-4-2',
  calculator: true,
  gen(rng, d) {
    return d === 3 ? siFind(rng) : siBasic(rng, d);
  },
});

// ---------------------------------------------------------------------------
// 4.3 Credit cards and loans
// ---------------------------------------------------------------------------

const CARDS = ['credit card', 'store credit card', 'gas station credit card'];

interface CardRate { text: string; hint: string; interest: (B: number) => number; step: (B: number) => string }

/** A stated card rate: a percent per month, or a percent per year divided by 12 (simple interest for one month). */
function cardRate(rng: Rng, yearly: boolean, friendly = false): CardRate {
  if (yearly) {
    const r = rng.pick([12.99, 19.99, 20.99, 22.99, 29.99]);
    return {
      text: `The card charges interest of ${pc(r)} per year. For one month, the interest is the unpaid balance × the yearly rate ÷ 12.`,
      hint: `Use $\\text{balance} \\times ${dec(r)} \\div 12$.`,
      interest: (B) => (B * r) / 1200,
      step: (B) => `$${mv(B)} \\times ${dec(r)} \\div 12 ${eq((B * r) / 1200)}$`,
    };
  }
  const r = friendly ? rng.pick([1.5, 2]) : rng.pick([1.5, 1.75, 2, 2.5]);
  return {
    text: `The card charges interest of ${pc(r)} per month on the unpaid balance.`,
    hint: `Use $\\text{balance} \\times ${dec(r)}$ (because $${pcm(r)} = ${dec(r)}$).`,
    interest: (B) => (B * r) / 100,
    step: (B) => `$${mv(B)} \\times ${dec(r)} ${eq((B * r) / 100)}$`,
  };
}

const LOAN_ITEMS = [
  { what: 'a used dirt bike', d1: true, lo: 4000, hi: 9000, n: [24, 36, 48], apr: [7.99, 8.99, 9.99] },
  { what: 'a new phone', d1: true, lo: 800, hi: 1500, n: [12, 18, 24], apr: [9.99, 12.99, 15.99] },
  { what: 'a laptop', d1: true, lo: 1100, hi: 2200, n: [12, 18, 24], apr: [9.99, 12.99, 14.99] },
  { what: 'a couch and bed for a first apartment', d1: true, lo: 1500, hi: 3800, n: [12, 24, 36], apr: [11.99, 14.99, 19.99] },
  { what: 'a used car', d1: false, lo: 7000, hi: 18000, n: [36, 48, 60], apr: [6.99, 7.99, 8.99, 9.99, 11.99] },
  { what: 'a used pickup truck', d1: false, lo: 12000, hi: 26000, n: [48, 60, 72], apr: [6.99, 7.99, 8.99, 10.99] },
  { what: 'a used snowmobile', d1: true, lo: 5000, hi: 11000, n: [24, 36, 48], apr: [7.99, 9.99, 11.99] },
];
const BUY = ['phone', 'TV', 'set of winter tires', 'gaming console', 'couch', 'mountain bike', 'laptop'];

function creditCardBasic(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const card = rng.pick(CARDS);
  const B = rng.pick([200, 300, 400, 500, 600, 800, 1000, 1200, 1500]);
  const rate = cardRate(rng, false, true);
  const I = rate.interest(B);
  return {
    prompt: `${name} did not pay the full ${card} bill this month. The unpaid balance is ${tag(B)}. ${rate.text} How much interest will ${name} be charged for one month?`,
    parts: [moneyPart(I)],
    hints: ['Interest = unpaid balance × monthly rate. Write the percent as a decimal first.', rate.hint],
    solution: ['Interest for one month = unpaid balance × monthly rate.', rate.step(B), `${name} will be charged ${money(I)} in interest. If ${name} had paid the full balance, the interest would be \\$0.`],
  };
}

function loanBasic(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const it = rng.pick(LOAN_ITEMS.filter((x) => x.d1));
  const { pay, n } = retry(
    () => ({ pay: rng.pick([50, 75, 100, 125, 150, 200, 250, 300]), n: rng.pick([6, 10, 12, 18, 24, 36]) }),
    (o) => o.pay * o.n >= it.lo * 0.8 && o.pay * o.n <= it.hi * 1.1,
    200,
  );
  const total = pay * n;
  const cost = Math.round((total * rng.pick([0.06, 0.08, 0.1, 0.12, 0.15])) / 10) * 10;
  const bor = total - cost;
  return {
    prompt: `${name} borrows ${tag(bor)} to buy ${it.what}. ${name} pays it back with ${n} monthly payments of ${tag(pay)}. How much does ${name} pay back in total? What is the cost of borrowing?`,
    parts: [moneyPart(total, 'Total paid: \\$'), moneyPart(cost, 'Cost of borrowing: \\$')],
    hints: ['Total paid = monthly payment × number of payments.', 'Cost of borrowing = total paid − amount borrowed.'],
    solution: [
      `Total paid: $${mv(pay)} \\times ${n} = ${mv(total)}$`,
      `Cost of borrowing: $${mv(total)} - ${mv(bor)} = ${mv(cost)}$`,
      `${name} pays back ${money(total)} in total. The cost of borrowing is ${money(cost)}.`,
    ],
  };
}

function creditCard2(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const card = rng.pick(CARDS);
  const rate = cardRate(rng, rng.chance(0.5));
  const B = retry(() => rng.int(30000, 260000) / 100, (b) => !onEdge(rate.interest(b), 2));
  const I = rate.interest(B);
  return {
    prompt: `${name}’s ${card} has an unpaid balance of ${money(B)}. ${rate.text} How much interest will ${name} be charged for one month? Round to the nearest cent.`,
    parts: [moneyPart(I)],
    hints: ['Write the percent as a decimal, then multiply by the unpaid balance.', rate.hint],
    solution: ['Interest for one month uses the unpaid balance and the stated rate.', rate.step(B), `${name} will be charged ${abt(I)}${money(I)} in interest for one month.`],
  };
}

function loan2(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const it = rng.pick(LOAN_ITEMS);
  const bor = rng.int(it.lo / 50, it.hi / 50) * 50;
  const n = rng.pick(it.n);
  const i = rng.pick(it.apr) / 1200;
  const pay = roundTo((bor * i) / (1 - (1 + i) ** -n), 2);
  const total = roundTo(pay * n, 2);
  const cost = roundTo(total - bor, 2);
  return {
    prompt: `${name} borrows ${tag(bor)} to buy ${it.what}. The loan is paid back with ${n} monthly payments of ${money(pay)}. How much does ${name} pay in total? What is the cost of borrowing?`,
    parts: [moneyPart(total, 'Total paid: \\$'), moneyPart(cost, 'Cost of borrowing: \\$')],
    hints: ['Total paid = monthly payment × number of payments.', 'Cost of borrowing = total paid − amount borrowed.'],
    solution: [
      `Total paid: $${mv(pay)} \\times ${n} = ${mv(total)}$`,
      `Cost of borrowing: $${mv(total)} - ${mv(bor)} = ${mv(cost)}$`,
      `${name} pays ${money(total)} in total. Borrowing adds ${money(cost)} to the cost.`,
    ],
  };
}

function minPayment(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const card = rng.pick(CARDS);
  const p = rng.pick([2, 3, 4]);
  const B = retry(() => rng.int(40000, 300000) / 100, (b) => !onEdge((b * p) / 100, 2));
  const M = (B * p) / 100;
  const Mr = roundTo(M, 2);
  const U = roundTo(B - Mr, 2);
  return {
    prompt: `${name}’s ${card} statement shows a balance of ${money(B)}. The minimum payment is ${pc(p)} of the balance. What is the minimum payment, to the nearest cent? If ${name} pays only the minimum, how much of the balance is left unpaid?`,
    parts: [moneyPart(M, 'Minimum payment: \\$'), moneyPart(U, 'Left unpaid: \\$')],
    hints: [`Minimum payment = balance × ${pc(p)}. Write ${pc(p)} as $${dec(p)}$.`, 'Left unpaid = balance − payment.'],
    solution: [
      `Minimum payment: $${mv(B)} \\times ${dec(p)} ${eq(M)}$, or ${abt(M)}${money(Mr)}`,
      `Left unpaid: $${mv(B)} - ${mv(Mr)} = ${mv(U)}$`,
      `The minimum payment is ${money(Mr)}. After paying it, ${money(U)} is still owing, and the card will charge interest on that amount.`,
    ],
  };
}

function creditCompare(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const card = rng.pick(CARDS);
  const mode = rng.pick(['part', 'two', 'carry'] as const);
  if (mode === 'carry') {
    const item = rng.pick(BUY);
    const r = rng.pick([1.5, 2, 2.5]);
    const P = rng.int(30, 150) * 10;
    const m = rng.pick([3, 4, 6, 8, 10, 12]);
    const Im = roundTo((P * r) / 100, 2);
    const I = roundTo(Im * m, 2);
    const T = roundTo(P + I, 2);
    return {
      prompt: `${name} buys a ${item} for ${tag(P)} on a ${rng.pick(['credit card', 'store credit card'])}. The card charges interest of ${pc(r)} per month on the unpaid balance. Each month ${name} pays only the interest, so the balance stays at ${tag(P)}. After ${m} months, ${name} pays off the ${tag(P)}. How much interest did ${name} pay in all? How much did the ${item} really cost?`,
      parts: [moneyPart(I, 'Total interest: \\$'), moneyPart(T, 'Real cost: \\$')],
      hints: ['Find the interest for one month, then multiply by the number of months.', 'Real cost = price + all the interest.'],
      solution: [
        `Interest for one month: $${mv(P)} \\times ${dec(r)} = ${mv(Im)}$`,
        `Interest for ${m} months: $${mv(Im)} \\times ${m} = ${mv(I)}$`,
        `Real cost: $${mv(P)} + ${mv(I)} = ${mv(T)}$`,
        `${name} paid ${money(I)} in interest, so the ${item} really cost ${money(T)}. Paying the full balance the first month would have cost \\$0 in interest.`,
      ],
    };
  }
  const rate = cardRate(rng, rng.chance(0.4));
  if (mode === 'part') {
    const { B, P } = retry(
      () => {
        const B = rng.int(40000, 250000) / 100;
        return { B, P: Math.max(50, Math.round((B * rng.float(0.2, 0.7, 2)) / 25) * 25) };
      },
      (o) => o.B - o.P >= 100 && !onEdge(rate.interest(roundTo(o.B - o.P, 2)), 2),
    );
    const U = roundTo(B - P, 2);
    const I = rate.interest(U);
    return {
      prompt: `${name}’s ${card} statement balance is ${money(B)}. ${name} pays ${tag(P)} by the due date. ${rate.text} How much of the balance is left unpaid? How much interest will ${name} be charged next month, to the nearest cent?`,
      parts: [moneyPart(U, 'Left unpaid: \\$'), moneyPart(I, 'Interest: \\$')],
      hints: ['Interest is charged only on the part you did not pay. Subtract the payment from the balance first.', rate.hint],
      solution: [
        `Unpaid balance: $${mv(B)} - ${mv(P)} = ${mv(U)}$`,
        `Interest on the unpaid balance: ${rate.step(U)}`,
        `${money(U)} is left unpaid, and the interest is ${abt(I)}${money(I)}.`,
        `If ${name} paid the full ${money(B)}, the interest would be \\$0. Paying in full saves ${abt(I)}${money(I)} this month.`,
      ],
    };
  }
  const { B, M, Q } = retry(
    () => {
      const B = rng.int(60000, 250000) / 100;
      const M = Math.max(10, Math.round(B * 0.03));
      const Q = Math.round((B * rng.float(0.4, 0.8, 2)) / 50) * 50;
      return { B, M, Q };
    },
    (o) => o.Q - o.M >= 100 && o.B - o.Q >= 50 && !onEdge(rate.interest(roundTo(o.B - o.M, 2)), 2) && !onEdge(rate.interest(roundTo(o.B - o.Q, 2)), 2),
  );
  const U1 = roundTo(B - M, 2);
  const U2 = roundTo(B - Q, 2);
  const I1 = rate.interest(U1);
  const I2 = rate.interest(U2);
  const save = roundTo(roundTo(I1, 2) - roundTo(I2, 2), 2);
  return {
    prompt: `${name}’s ${card} statement balance is ${money(B)}. ${rate.text} Find the interest charged next month if ${name} pays only the minimum payment of ${tag(M)}. Then find it if ${name} pays ${tag(Q)} instead. Round to the nearest cent.`,
    parts: [moneyPart(I1, `Pay ${tag(M)}: \\$`), moneyPart(I2, `Pay ${tag(Q)}: \\$`)],
    hints: ['For each choice, subtract the payment from the balance to find the unpaid balance.', `Then find the interest on each unpaid balance. ${rate.hint}`],
    solution: [
      `Minimum payment: unpaid balance $${mv(B)} - ${mv(M)} = ${mv(U1)}$`,
      `Interest: ${rate.step(U1)}`,
      `Paying ${tag(Q)}: unpaid balance $${mv(B)} - ${mv(Q)} = ${mv(U2)}$`,
      `Interest: ${rate.step(U2)}`,
      `The interest is ${abt(I1)}${money(I1)} with the minimum payment and ${abt(I2)}${money(I2)} when paying ${tag(Q)}. Paying more saves about ${money(save)}, and paying the full balance would cost \\$0 in interest.`,
    ],
  };
}

const creditCost = skill({
  id: 'm204-credit-cost',
  name: 'The cost of credit',
  description: 'Find the interest on a credit card balance for one month, the total paid and the cost of borrowing on a loan, and compare paying the full balance with paying only part.',
  outcomes: ['N4'],
  lessonId: 'm204-4-3',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return rng.chance(0.5) ? creditCardBasic(rng) : loanBasic(rng);
    if (d === 3) return creditCompare(rng);
    const kind = rng.pick(['card', 'card', 'loan', 'min'] as const);
    return kind === 'card' ? creditCard2(rng) : kind === 'loan' ? loan2(rng) : minPayment(rng);
  },
});

// ---------------------------------------------------------------------------
// 4.4 Owning a vehicle
// ---------------------------------------------------------------------------

const VEHICLES = [
  { name: 'small car', lo: 5.8, hi: 8.2, tank: [30, 35, 40, 45] },
  { name: 'hybrid car', lo: 4.2, hi: 5.6, tank: [30, 35, 40] },
  { name: 'minivan', lo: 9.0, hi: 11.0, tank: [40, 50, 60] },
  { name: 'SUV', lo: 9.5, hi: 12.0, tank: [40, 50, 60, 70] },
  { name: 'pickup truck', lo: 11.5, hi: 15.5, tank: [60, 70, 80, 90] },
];
const FUEL_HINT = 'Litres used = distance ÷ 100 × litres per 100 km.';

/** Fuel used and its cost for one month. */
function fuelCost(km: number, c: number, price: number) {
  const L = roundTo((km / 100) * c, 2);
  return { L, cost: L * price };
}
const fuelSteps = (km: number, c: number, price: number, who: string) => {
  const { L, cost } = fuelCost(km, c, price);
  return [
    `${who}: litres used $= ${num(km)} \\div 100 \\times ${num(c)} = ${num(L)}\\ \\text{L}$`,
    `${who}: cost $= ${num(L)} \\times ${mv(price)} ${eq(cost)}$`,
  ];
};

function vehicle1(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['table', 'table', 'yearly', 'fill'] as const);
  if (kind === 'yearly') {
    const ins = rng.chance(0.6);
    const M = rng.pick(ins ? [90, 100, 110, 120, 125, 140, 150, 175] : [30, 40, 50, 60, 75]);
    const Y = M * 12;
    const veh = rng.pick(VEHICLES).name;
    return {
      prompt: ins
        ? `Insurance for ${name}’s ${veh} costs ${tag(Y)} per year. ${name} pays it in equal monthly amounts. How much is that per month?`
        : `${name} expects to spend about ${tag(Y)} per year on maintenance for a ${veh}, like oil changes and new wiper blades. ${name} wants to set aside the same amount each month. How much is that per month?`,
      parts: [moneyPart(M)],
      hints: ['There are 12 months in a year.', `Divide the yearly cost by 12: $${mv(Y)} \\div 12$.`],
      solution: [
        'To change a yearly cost to a monthly cost, divide by 12.',
        `$${mv(Y)} \\div 12 = ${mv(M)}$`,
        ins ? `${name} pays ${money(M)} per month for insurance.` : `${name} should set aside ${money(M)} per month for maintenance.`,
      ],
    };
  }
  if (kind === 'fill') {
    const veh = rng.pick(VEHICLES);
    const L = rng.pick(veh.tank);
    const price = rng.pick([1.2, 1.3, 1.4, 1.5, 1.6]);
    const cost = roundTo(L * price, 2);
    return {
      prompt: `${name} fills up ${an(veh.name)} with ${L} L of gas. Gas costs ${money(price)} per litre. How much does the fill-up cost?`,
      parts: [moneyPart(cost)],
      hints: ['Cost = number of litres × price per litre.', `$${L} \\times ${mv(price)}$`],
      solution: ['Multiply the litres by the price for one litre.', `$${L} \\times ${mv(price)} = ${mv(cost)}$`, `The fill-up costs ${money(cost)}.`],
    };
  }
  const rows: Array<[string, number]> = [
    ['Car payment', rng.pick([200, 250, 300, 350, 400])],
    ['Insurance', rng.pick([100, 120, 150, 180])],
    ['Gas', rng.pick([100, 120, 150, 180, 200])],
    ['Maintenance', rng.pick([40, 50, 60])],
  ];
  if (rng.chance(0.5)) rows.push(['Parking', rng.pick([30, 40, 60])]);
  const T = sumOf(rows.map((r) => r[1]));
  return {
    prompt: `${name} drives to work at ${rng.pick(JOBS)} in ${rng.pick(CITIES)}. The table shows what ${name}’s car costs each month. What is the total monthly cost of owning and running the car?`,
    figure: { type: 'table', headers: ['Cost', 'Per month'], rows: rows.map(([l, v]) => [l, cell(v, false)]) },
    parts: [moneyPart(T)],
    hints: ['Owning a car costs more than the car payment. Add every cost in the table.', `$${rows.map((r) => mv(r[1])).join(' + ')}$`],
    solution: [`Add all the monthly costs: $${rows.map((r) => mv(r[1])).join(' + ')} = ${mv(T)}$`, `The car costs ${name} ${money(T)} each month.`],
  };
}

function vehicle2(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const veh = rng.pick(VEHICLES);
  if (rng.chance(0.5)) {
    const { km, c, price } = retry(
      () => ({ km: rng.int(8, 25) * 100, c: rng.float(veh.lo, veh.hi, 1), price: rng.int(129, 169) / 100 }),
      (o) => !onEdge(fuelCost(o.km, o.c, o.price).cost, 2),
    );
    const { L, cost } = fuelCost(km, c, price);
    return {
      prompt: `${name} drives about ${km} km each month in ${an(veh.name)}. Its fuel economy is ${num(c)} L/100 km, which means it uses ${num(c)} L of gas for every 100 km. Gas costs ${money(price)} per litre. How many litres of gas does ${name} use each month? What does the gas cost per month, to the nearest cent?`,
      parts: [exactPart(L, 'L', 'Gas used:'), moneyPart(cost, 'Gas cost: \\$')],
      hints: [FUEL_HINT, 'Then multiply the litres by the price per litre.'],
      solution: [
        `Groups of 100 km: $${km} \\div 100 = ${km / 100}$`,
        `Litres used: $${km / 100} \\times ${num(c)} = ${num(L)}\\ \\text{L}$`,
        `Cost: $${num(L)} \\times ${mv(price)} ${eq(cost)}$`,
        `${name} uses ${num(L)} L of gas, which costs ${abt(cost)}${money(cost)} per month.`,
      ],
    };
  }
  const pay = rng.int(22000, 48000) / 100;
  const insM = rng.int(95, 210);
  const insY = insM * 12;
  const fuel = rng.int(9000, 26000) / 100;
  const maint = rng.pick([40, 50, 60, 75]);
  const T = sumOf([pay, insM, fuel, maint]);
  return {
    prompt: `${name} owns ${an(veh.name)}. The loan payment is ${money(pay)} per month, insurance is ${tag(insY)} per year, gas is about ${money(fuel)} per month, and ${name} sets aside ${tag(maint)} per month for maintenance. What is the insurance cost per month? What is the total monthly cost of the ${veh.name}?`,
    parts: [moneyPart(insM, 'Insurance per month: \\$'), moneyPart(T, 'Total per month: \\$')],
    hints: ['Change the yearly insurance to a monthly cost: divide by 12.', 'Then add all four monthly costs.'],
    solution: [
      `Insurance per month: $${mv(insY)} \\div 12 = ${mv(insM)}$`,
      `Total: $${mv(pay)} + ${mv(insM)} + ${mv(fuel)} + ${mv(maint)} = ${mv(T)}$`,
      `Insurance is ${money(insM)} per month, and the ${veh.name} costs ${money(T)} per month in all.`,
    ],
  };
}

function vehicle3(rng: Rng): Out {
  const name = rng.pick(NAMES);
  if (rng.chance(0.6)) {
    const A = rng.pick(VEHICLES.slice(0, 2));
    const B = rng.pick(VEHICLES.slice(2));
    const o = retry(
      () => ({ km: rng.int(10, 25) * 100, cA: rng.float(A.lo, A.hi, 1), cB: rng.float(B.lo, B.hi, 1), price: rng.int(129, 169) / 100 }),
      (x) => {
        const a = fuelCost(x.km, x.cA, x.price).cost;
        const b = fuelCost(x.km, x.cB, x.price).cost;
        return !onEdge(a, 2) && !onEdge(b, 2) && !onEdge(b - a, 2);
      },
    );
    const a = fuelCost(o.km, o.cA, o.price).cost;
    const b = fuelCost(o.km, o.cB, o.price).cost;
    const diff = b - a;
    return {
      prompt: `${name} is choosing between ${an(A.name)} that uses ${num(o.cA)} L/100 km and ${an(B.name)} that uses ${num(o.cB)} L/100 km. ${name} drives about ${o.km} km each month, and gas costs ${money(o.price)} per litre. Find the monthly gas cost for each vehicle, to the nearest cent. How much more does the ${B.name} cost for gas each month?`,
      parts: [moneyPart(a, `${A.name[0].toUpperCase()}${A.name.slice(1)}: \\$`), moneyPart(b, `${B.name[0].toUpperCase()}${B.name.slice(1)}: \\$`), moneyPart(diff, 'Difference: \\$')],
      hints: [`${FUEL_HINT} Then multiply by the price per litre.`, 'Do this for each vehicle, then subtract the smaller cost from the larger one.'],
      solution: [
        ...fuelSteps(o.km, o.cA, o.price, `The ${A.name}`),
        ...fuelSteps(o.km, o.cB, o.price, `The ${B.name}`),
        `Difference: $${num(roundTo(b, 4))} - ${num(roundTo(a, 4))} ${eq(diff)}$`,
        `The ${A.name} costs ${abt(a)}${money(a)} and the ${B.name} costs ${abt(b)}${money(b)} for gas each month. The ${B.name} costs ${abt(diff)}${money(diff)} more each month, which is about ${money(diff * 12)} more per year.`,
      ],
    };
  }
  const veh = rng.pick(VEHICLES);
  const pay = rng.int(22000, 48000) / 100;
  const insM = rng.int(95, 210);
  const insY = insM * 12;
  const maint = rng.pick([40, 50, 60, 75]);
  const { km, c, price } = retry(
    () => ({ km: rng.int(8, 25) * 100, c: rng.float(veh.lo, veh.hi, 1), price: rng.int(129, 169) / 100 }),
    (o) => !onEdge(fuelCost(o.km, o.c, o.price).cost, 2) && !onEdge(fuelCost(o.km, o.c, o.price).cost + pay + insM + maint, 2),
  );
  const { cost: fuel } = fuelCost(km, c, price);
  const T = fuel + pay + insM + maint;
  return {
    prompt: `${name} owns ${an(veh.name)} with a loan payment of ${money(pay)} per month. Insurance is ${tag(insY)} per year, and ${name} sets aside ${tag(maint)} per month for maintenance. ${name} drives about ${km} km a month, the ${veh.name} uses ${num(c)} L/100 km, and gas costs ${money(price)} per litre. Find the monthly gas cost and the total monthly cost of the ${veh.name}, to the nearest cent.`,
    parts: [moneyPart(fuel, 'Gas per month: \\$'), moneyPart(T, 'Total per month: \\$')],
    hints: [`${FUEL_HINT} Then multiply by the price per litre.`, 'Change the yearly insurance to monthly (÷ 12), then add the payment, insurance, gas and maintenance.'],
    solution: [
      ...fuelSteps(km, c, price, 'Gas'),
      `Insurance per month: $${mv(insY)} \\div 12 = ${mv(insM)}$`,
      `Total: $${mv(pay)} + ${mv(insM)} + ${num(roundTo(fuel, 4))} + ${mv(maint)} ${eq(T)}$`,
      `Gas costs ${abt(fuel)}${money(fuel)} per month, and the ${veh.name} costs ${abt(T)}${money(T)} per month in all.`,
    ],
  };
}

const vehicleCost = skill({
  id: 'm204-vehicle-cost',
  name: 'The cost of a vehicle',
  description: 'Find the monthly cost of owning a vehicle, including payments, insurance, fuel and maintenance, and compare the fuel costs of two vehicles.',
  outcomes: ['N4'],
  lessonId: 'm204-4-4',
  calculator: true,
  gen(rng, d) {
    return d === 1 ? vehicle1(rng) : d === 2 ? vehicle2(rng) : vehicle3(rng);
  },
});

// ---------------------------------------------------------------------------
// 4.4 Renting a home
// ---------------------------------------------------------------------------

const HOMES = ['apartment', 'basement suite', 'townhouse', 'house'];
const RULE = 'A common rule of thumb says to spend no more than about 30% of your income on rent.';
const mates = (k: number) => (k === 2 ? 'a roommate' : `${k - 1} roommates`);

function housing1(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const city = rng.pick(CITIES);
  const kind = rng.pick(['monthly', 'split', 'movein'] as const);
  if (kind === 'split') {
    const k = rng.pick([2, 3, 4]);
    const share = rng.pick([400, 450, 500, 550, 600, 650, 700]);
    const R = share * k;
    return {
      prompt: `Rent for a ${k}-bedroom ${rng.pick(HOMES.slice(1))} in ${city} is ${tag(R)} per month. ${name} and ${mates(k)} split the rent equally. How much does each person pay per month?`,
      parts: [moneyPart(share)],
      hints: [`There are ${k} people sharing, counting ${name}.`, `Divide the rent by ${k}: $${mv(R)} \\div ${k}$.`],
      solution: [`${name} and ${mates(k)} make ${k} people.`, `$${mv(R)} \\div ${k} = ${mv(share)}$`, `Each person pays ${money(share)} per month.`],
    };
  }
  if (kind === 'movein') {
    const R = rng.int(14, 26) * 50;
    const fullDeposit = rng.chance(0.5);
    const D = fullDeposit ? R : rng.pick([400, 500, 600]);
    const T = R + D;
    return {
      prompt: `${name} is renting ${an(rng.pick(['apartment', 'apartment', 'upstairs suite', 'basement suite']))} in ${city} for ${tag(R)} per month. To move in, ${name} must pay the first month’s rent and a damage deposit ${fullDeposit ? 'equal to one month’s rent' : `of ${tag(D)}`}. How much money does ${name} need to move in?`,
      parts: [moneyPart(T)],
      hints: ['Move-in cost = first month’s rent + damage deposit.', `$${mv(R)} + ${mv(D)}$`],
      solution: [
        `Damage deposit: ${fullDeposit ? `one month’s rent, ${tag(D)}` : tag(D)}`,
        `Move-in cost: $${mv(R)} + ${mv(D)} = ${mv(T)}$`,
        `${name} needs ${money(T)} to move in. The deposit comes back at move-out if there is no damage.`,
      ],
    };
  }
  const rows: Array<[string, number]> = [
    ['Rent', rng.int(13, 24) * 50],
    ['Utilities', rng.pick([100, 120, 150, 180, 200])],
    ['Tenant insurance', rng.pick([15, 20, 25, 30])],
  ];
  if (rng.chance(0.5)) rows.push(['Internet', rng.pick([50, 60, 70])]);
  const T = sumOf(rows.map((r) => r[1]));
  return {
    prompt: `${name} rents ${an(rng.pick(HOMES))} in ${city}. The table shows ${name}’s monthly housing costs. What is the total cost of housing each month?`,
    figure: { type: 'table', headers: ['Cost', 'Per month'], rows: rows.map(([l, v]) => [l, cell(v, false)]) },
    parts: [moneyPart(T)],
    hints: ['Housing costs more than just the rent. Add every cost in the table.', `$${rows.map((r) => mv(r[1])).join(' + ')}$`],
    solution: [`Add the monthly costs: $${rows.map((r) => mv(r[1])).join(' + ')} = ${mv(T)}$`, `${name}’s housing costs ${money(T)} each month.`],
  };
}

function housing2(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const city = rng.pick(CITIES);
  const kind = rng.pick(['split', 'monthly', 'movein'] as const);
  if (kind === 'split') {
    const k = rng.pick([2, 3, 4]);
    const { R, U, N } = retry(
      () => ({ R: rng.int(54, 90) * 25, U: rng.int(12000, 26000) / 100, N: rng.int(60, 95) - 0.01 }),
      (o) => !onEdge(sumOf([o.R, o.U, o.N]) / k, 2),
    );
    const T = sumOf([R, U, N]);
    const share = T / k;
    return {
      prompt: `${name} and ${mates(k)} rent ${an(rng.pick(HOMES.slice(1)))} in ${city}. Each month the rent is ${tag(R)}, utilities are ${money(U)}, and internet is ${money(N)}. They split all three costs equally. What is the total each month? What is each person’s share, to the nearest cent?`,
      parts: [moneyPart(T, 'Total per month: \\$'), moneyPart(share, 'Each share: \\$')],
      hints: ['First add the three monthly costs.', `Then divide the total by the number of people: ${k}.`],
      solution: [
        `Total: $${mv(R)} + ${mv(U)} + ${mv(N)} = ${mv(T)}$`,
        `Each share: $${mv(T)} \\div ${k} ${eq(share)}$`,
        `The total is ${money(T)} per month, and each person pays ${abt(share)}${money(share)}.`,
      ],
    };
  }
  if (kind === 'monthly') {
    const R = rng.int(34, 60) * 25;
    const U = rng.int(9000, 24000) / 100;
    const insM = rng.int(14, 32);
    const insY = insM * 12;
    const T = sumOf([R, U, insM]);
    return {
      prompt: `${name} rents ${an(rng.pick(HOMES))} in ${city} for ${tag(R)} per month. Utilities (power, heat and water) are about ${money(U)} per month. Tenant insurance costs ${tag(insY)} per year. What does tenant insurance cost per month? What is the total monthly cost of housing?`,
      parts: [moneyPart(insM, 'Insurance per month: \\$'), moneyPart(T, 'Total per month: \\$')],
      hints: ['Change the yearly insurance to a monthly cost: divide by 12.', 'Then add the rent, the utilities and the monthly insurance.'],
      solution: [
        `Tenant insurance per month: $${mv(insY)} \\div 12 = ${mv(insM)}$`,
        `Total: $${mv(R)} + ${mv(U)} + ${mv(insM)} = ${mv(T)}$`,
        `Insurance is ${money(insM)} per month, and housing costs ${money(T)} per month in all.`,
      ],
    };
  }
  const R = rng.int(34, 60) * 25;
  const D = rng.chance(0.5) ? R : rng.int(10, R / 50 - 2) * 50;
  const truck = rng.int(8000, 24000) / 100;
  const fee = rng.pick([25, 40, 50, 75]);
  const T = sumOf([R, D, truck, fee]);
  return {
    prompt: `${name} is moving into ${an(rng.pick(HOMES))} in ${city}. The rent is ${tag(R)} per month. Before moving in, ${name} must pay the first month’s rent and a damage deposit of ${tag(D)}. ${name} also rents a moving truck for ${money(truck)} and pays a ${tag(fee)} fee to set up the power account. How much money does ${name} need to move in?`,
    parts: [moneyPart(T)],
    hints: ['Move-in costs are everything you pay before or on moving day.', 'Add the first month’s rent, the damage deposit, the truck and the fee.'],
    solution: [
      `Add the move-in costs: $${mv(R)} + ${mv(D)} + ${mv(truck)} + ${mv(fee)} = ${mv(T)}$`,
      `${name} needs ${money(T)} to move in. The damage deposit is returned at move-out if there is no damage.`,
    ],
  };
}

function housing3(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const city = rng.pick(CITIES);
  const home = rng.pick(HOMES);
  if (rng.chance(0.5)) {
    // Max rent by the 30% rule, compared with an actual rent.
    const { I, R, max } = retry(
      () => {
        const I = rng.int(20000, 42000) / 10;
        const max = roundTo(I * 0.3, 2);
        return { I, max, R: Math.round((max * rng.pick([0.75, 0.82, 0.88, 1.12, 1.2, 1.3])) / 25) * 25 };
      },
      (o) => Math.abs(o.R - o.max) >= 25,
    );
    const ok = R <= max;
    return {
      prompt: `${name} takes home ${money(I)} each month. ${RULE} What is the most rent ${name} should pay, using this rule? ${name} finds ${an(home)} in ${city} for ${tag(R)} per month. Is this rent within the 30% guideline?`,
      parts: [moneyPart(max, 'Most rent: \\$'), yesNo('Within 30%?', ok)],
      hints: ['Find 30% of the income: multiply by $0.3$.', 'Compare the rent with that amount.'],
      solution: [
        `Most rent: $0.3 \\times ${mv(I)} = ${mv(max)}$`,
        `The ${home} costs ${tag(R)}, which is ${ok ? 'less' : 'more'} than ${money(max)}.`,
        ok
          ? `${name} should pay no more than ${money(max)}. Yes, the ${home} is within the guideline.`
          : `${name} should pay no more than ${money(max)}. No, the ${home} costs more than the guideline. A roommate or a cheaper place would help.`,
      ],
    };
  }
  // Rent share as a percent of income, compared with 30%.
  const split = rng.chance(0.5);
  const o = retry(
    () => {
      const R = split ? rng.int(48, 88) * 25 : rng.int(30, 60) * 25;
      const share = split ? R / 2 : R;
      const target = rng.chance(0.5) ? rng.int(18, 28) : rng.int(32, 45);
      const I = Math.round((share / target) * 100 * 100 + rng.int(-5000, 5000)) / 100;
      return { I, share, R };
    },
    (x) => x.I >= 1800 && x.I <= 4500 && Math.abs((x.share / x.I) * 100 - 30) >= 1 && !onEdge((x.share / x.I) * 100, 1),
  );
  const p = (o.share / o.I) * 100;
  const ok = p <= 30;
  const parts: Part[] = [];
  if (split) parts.push(moneyPart(o.share, `${name}’s share: \\$`));
  parts.push(numPart(p, { decimals: 1, suffix: '%', label: 'Percent of income:' }), yesNo('Within 30%?', ok));
  return {
    prompt: split
      ? `${name} takes home ${money(o.I)} each month. ${name} and a roommate split the rent on ${an(home)} in ${city} equally. The rent is ${tag(o.R)} per month. ${RULE} What is ${name}’s share of the rent? What percent of ${name}’s income is that, to the nearest tenth of a percent? Is it within the 30% guideline?`
      : `${name} takes home ${money(o.I)} each month and pays ${tag(o.R)} a month to rent ${an(home)} in ${city}. ${RULE} What percent of ${name}’s income goes to rent, to the nearest tenth of a percent? Is it within the 30% guideline?`,
    parts,
    hints: [
      split ? 'First find the share: rent ÷ 2.' : 'Percent of income = rent ÷ income × 100.',
      split ? 'Then percent of income = share ÷ income × 100. Compare it with 30%.' : 'Compare your answer with 30%.',
    ],
    solution: [
      ...(split ? [`Share of the rent: $${mv(o.R)} \\div 2 = ${mv(o.share)}$`] : []),
      `Percent of income: $${mv(o.share)} \\div ${mv(o.I)} \\times 100 ${eq(p, 3)}$`,
      `About ${fmtFixed(p, 1)}% is ${ok ? 'less than' : 'more than'} 30%.`,
      ok
        ? `${name} spends about ${fmtFixed(p, 1)}% of income on rent. Yes, that is within the guideline.`
        : `${name} spends about ${fmtFixed(p, 1)}% of income on rent. No, that is more than the guideline, so less money is left for everything else.`,
    ],
  };
}

const housingCost = skill({
  id: 'm204-housing-cost',
  name: 'The cost of renting',
  description: 'Find the monthly cost of renting with utilities and tenant insurance, split rent with roommates, find move-in costs, and compare rent with 30% of income.',
  outcomes: ['N4'],
  lessonId: 'm204-4-4',
  calculator: true,
  gen(rng, d) {
    return d === 1 ? housing1(rng) : d === 2 ? housing2(rng) : housing3(rng);
  },
});

export const BUDGET_SKILLS: SkillDef[] = [budget, simpleInterest, creditCost, vehicleCost, housingCost];
