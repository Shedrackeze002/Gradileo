/** Math 20-3 Unit 6 — Personal Budgets and Banking (N2, N4). Every rate, fee and rule is stated in the question. */
import { fixedChoice, mc, multi, numPart, part, retry, skill } from '../../helpers.ts';
import { fmt, fmtFixed, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers (the money helpers are also used by interest.ts)
// ---------------------------------------------------------------------------

export type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure };
type Lvl = 1 | 2;

export const NAMES = [
  'Amara', 'Liam', 'Priya', 'Mateo', 'Aiyana', 'Noah', 'Mei', 'Jaxon', 'Fatima', 'Ethan', 'Nia', 'Arjun',
  'Chloé', 'Kai', 'Zainab', 'Owen', 'Sofia', 'Tariq', 'Leila', 'Dylan', 'Harpreet', 'Kiona', 'Rajesh', 'Hana',
  'Jamal', 'Émilie', 'Wyatt', 'Ayesha', 'Lucas', 'Talia', 'Simran', 'Cole', 'Ngozi', 'Marcus', 'Rosa', 'Ji-woo',
  'Kwame', 'Tanvir', 'Maya', 'Bao', 'Dakota', 'Thanh',
];
export const CITIES = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater', 'Elmwood', 'Cedar Hills'];
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const BANKS = ['Prairie Credit Union', 'Northern Bank', 'Riverbend Savings', 'Aspen Valley Credit Union', 'Foothills Trust', 'Lakeshore Bank'];

export const poss = (n: string) => `${n}’s`;
export const isWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
export const isCents = (x: number) => Math.abs(x * 100 - Math.round(x * 100)) < 1e-6;

/** Thousands separators on a plain number string. */
export function group(s: string, sep = ','): string {
  const neg = s.startsWith('-');
  const body = neg ? s.slice(1) : s;
  const [i, f] = body.split('.');
  const g = i.length > 3 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, sep) : i;
  return `${neg ? '-' : ''}${g}${f !== undefined ? `.${f}` : ''}`;
}
/** Money in prose, always with cents: \$1,234.50. Never inside $...$. */
export const money = (x: number) => `\\$${group(fmtFixed(x, 2))}`;
/** A price in prose: whole dollars print without cents (\$950). */
export const tag = (x: number) => (isWhole(x) ? `\\$${group(String(Math.round(x)))}` : money(x));
/** Money inside maths, no dollar sign: 1{,}250 or 12.50. */
export const mv = (x: number) => (isWhole(x) ? group(String(Math.round(x)), '{,}') : group(fmtFixed(x, 2), '{,}'));
/** Money inside maths with exactly two decimals. */
export const m2 = (x: number) => group(fmtFixed(x, 2), '{,}');
/** Plain-text money for table cells. */
export const cell = (x: number) => `$${group(fmtFixed(x, 2))}`;
export const num = (x: number, dp = 4) => group(fmt(x, dp), '{,}');
export const pc = (r: number) => `${fmt(r)}%`;
export const pcm = (r: number) => `${fmt(r)}\\%`;
export const dec = (r: number) => fmt(r / 100, 6);
/** "= 12.35" when exact to the cent, otherwise "= 12.3456 \approx 12.35" or "= 12.345\ldots \approx 12.35". */
export function toCents(x: number): string {
  if (isCents(x)) return `= ${m2(x)}`;
  if (Math.abs(roundTo(x, 4) - x) < 1e-9) return `= ${num(x, 4)} \\approx ${m2(x)}`;
  // Show a fourth decimal when the third is 5, so 6.3258... does not look like a tie (6.325...).
  const dp = Math.floor(Math.abs(x) * 1000) % 10 === 5 ? 4 : 3;
  const t = Math.floor(Math.abs(x) * 10 ** dp) / 10 ** dp;
  return `= ${x < 0 ? '-' : ''}${group(t.toFixed(dp), '{,}')}\\ldots \\approx ${m2(x)}`;
}
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
const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

/** A money answer graded to the cent. */
export const moneyPart = (v: number, label = '\\$'): Part => numPart(v, { decimals: 2, tolerance: 0.011, label });
export const yesNo = (label: string, yes: boolean): Part => part(fixedChoice(['Yes', 'No'], yes ? 0 : 1), { label });
export const CENT = 'Answer to the nearest cent.';

// ---------------------------------------------------------------------------
// Jobs, expenses and budget tables
// ---------------------------------------------------------------------------

interface Job { job: string; lo: number; hi: number }
const JOBS: Job[] = [
  { job: 'a cashier at a grocery store', lo: 15, hi: 18 },
  { job: 'an apprentice electrician', lo: 20, hi: 27 },
  { job: 'a lube technician', lo: 18, hi: 24 },
  { job: 'a farm hand', lo: 16, hi: 21 },
  { job: 'a labourer on a framing crew', lo: 20, hi: 26 },
  { job: 'a line cook at a mountain resort', lo: 16, hi: 21 },
  { job: 'a warehouse worker', lo: 17, hi: 23 },
  { job: 'a floorhand on a drilling rig', lo: 30, hi: 40 },
  { job: 'a parts clerk at a farm equipment dealer', lo: 17, hi: 22 },
  { job: 'a welder’s helper at a fabrication shop', lo: 22, hi: 30 },
  { job: 'a landscaper', lo: 16, hi: 21 },
  { job: 'a tire technician', lo: 18, hi: 24 },
];

interface ExpKind { label: string; phrase: string; fixed: boolean; d1: number[]; lo: number; hi: number; style: 'w25' | 'w5' | 'nine' | 'any' }
const EX = {
  rent: { label: 'Rent', phrase: 'rent', fixed: true, d1: [650, 700, 750, 800, 850, 900], lo: 750, hi: 1350, style: 'w25' },
  tenant: { label: 'Tenant insurance', phrase: 'tenant insurance', fixed: true, d1: [20, 25, 30], lo: 18, hi: 36, style: 'any' },
  utilities: { label: 'Utilities', phrase: 'utilities', fixed: false, d1: [80, 100, 120], lo: 70, hi: 170, style: 'any' },
  phone: { label: 'Phone plan', phrase: 'the phone plan', fixed: true, d1: [45, 50, 60, 65], lo: 36, hi: 81, style: 'nine' },
  internet: { label: 'Internet', phrase: 'internet', fixed: true, d1: [50, 60, 70], lo: 46, hi: 91, style: 'nine' },
  bus: { label: 'Bus pass', phrase: 'the bus pass', fixed: true, d1: [90, 100, 110], lo: 85, hi: 115, style: 'w5' },
  truckPay: { label: 'Truck payment', phrase: 'the truck payment', fixed: true, d1: [300, 350, 400], lo: 280, hi: 520, style: 'any' },
  truckIns: { label: 'Vehicle insurance', phrase: 'vehicle insurance', fixed: true, d1: [120, 150, 180], lo: 110, hi: 240, style: 'any' },
  gas: { label: 'Gas', phrase: 'gas', fixed: false, d1: [120, 150, 180, 200], lo: 90, hi: 260, style: 'any' },
  groceries: { label: 'Groceries', phrase: 'groceries', fixed: false, d1: [250, 300, 350, 400], lo: 220, hi: 480, style: 'any' },
  eating: { label: 'Eating out', phrase: 'eating out', fixed: false, d1: [60, 80, 100], lo: 40, hi: 180, style: 'any' },
  fun: { label: 'Entertainment', phrase: 'entertainment', fixed: false, d1: [40, 50, 60, 80], lo: 30, hi: 140, style: 'any' },
  clothes: { label: 'Clothing', phrase: 'clothing', fixed: false, d1: [40, 50, 60], lo: 25, hi: 120, style: 'any' },
  gym: { label: 'Gym membership', phrase: 'the gym membership', fixed: true, d1: [25, 30, 40], lo: 21, hi: 56, style: 'nine' },
  care: { label: 'Personal care', phrase: 'personal care', fixed: false, d1: [20, 30, 40], lo: 15, hi: 70, style: 'any' },
} satisfies Record<string, ExpKind>;

interface Exp { label: string; phrase: string; fixed: boolean; amount: number }

function expAmount(rng: Rng, k: ExpKind, d: Lvl): number {
  if (d === 1) return rng.pick(k.d1);
  if (k.style === 'w25') return rng.int(Math.ceil(k.lo / 25), Math.floor(k.hi / 25)) * 25;
  if (k.style === 'w5') return rng.int(Math.ceil(k.lo / 5), Math.floor(k.hi / 5)) * 5;
  if (k.style === 'nine') return rng.int(k.lo, k.hi) - 0.01;
  return rng.int(k.lo * 100, k.hi * 100) / 100;
}

/** A believable monthly budget: housing, transportation, a phone, groceries, then other spending. */
function makeBudget(rng: Rng, d: Lvl, n: number, opts: { housing?: boolean } = {}): Exp[] {
  const truck = rng.chance(0.5);
  const kinds: ExpKind[] = [EX.rent];
  if (opts.housing) kinds.push(EX.utilities, EX.tenant);
  kinds.push(...(truck ? [EX.truckPay, EX.gas] : [EX.bus]));
  kinds.push(EX.phone, EX.groceries);
  const extras: ExpKind[] = rng.shuffle([EX.eating, EX.fun, EX.clothes, EX.care, EX.gym, EX.internet, ...(opts.housing ? [] : [EX.utilities]), ...(truck ? [EX.truckIns] : [])]);
  while (kinds.length < n && extras.length) kinds.push(extras.pop()!);
  return kinds.map((k) => ({ label: k.label, phrase: k.phrase, fixed: k.fixed, amount: expAmount(rng, k, d) }));
}

const budgetTable = (items: Exp[]): Figure => ({
  type: 'table',
  headers: ['Expense', 'Amount per month'],
  rows: items.map((e) => [e.label, cell(e.amount)]),
});

const sumLine = (xs: number[], t: number) => (xs.length === 1 ? `$${mv(t)}$` : `$${xs.map(mv).join(' + ')} = ${mv(t)}$`);

// ---------------------------------------------------------------------------
// 6.1 Personal budgets — m203-budget
// ---------------------------------------------------------------------------

function netPay(rng: Rng, d: Lvl): Out {
  const name = rng.pick(NAMES);
  const j = rng.pick(JOBS);
  const month = rng.pick(MONTHS);
  if (d === 1) {
    const r = rng.int(j.lo * 2, j.hi * 2) / 2;
    const h = rng.int(15, 40) * 4;
    const G = r * h;
    const D = Math.round((G * rng.int(12, 22)) / 100);
    const N = sub(G, D);
    return {
      prompt: `${name} works as ${j.job} for ${money(r)} an hour. In ${month}, ${name} worked ${h} hours. The deductions for income tax, CPP and EI came to ${tag(D)} for the month. What were ${poss(name)} gross pay and net pay for ${month}? ${CENT}`,
      parts: [moneyPart(G, 'Gross pay: \\$'), moneyPart(N, 'Net pay: \\$')],
      hints: ['Gross pay is what you earn before anything is taken off: hourly wage × hours.', 'Net pay (take-home pay) = gross pay − deductions.'],
      solution: [
        `Gross pay $=$ hourly wage $\\times$ hours: $${m2(r)} \\times ${h} = ${m2(G)}$`,
        `Net pay $=$ gross pay $-$ deductions: $${m2(G)} - ${m2(D)} = ${m2(N)}$`,
        `${poss(name)} gross pay was ${money(G)} and net pay was ${money(N)}.`,
      ],
    };
  }
  const o = retry(
    () => {
      const r = rng.int(j.lo * 10, j.hi * 10) / 10;
      const weekly = rng.chance(0.5);
      const hw = rng.int(18, 40);
      const h = weekly ? hw * 4 : rng.int(70, 170);
      const p = rng.pick([15, 16, 17.5, 18, 19, 20, 21, 22.5, 24]);
      const G = roundTo(r * h, 2);
      const D = (G * p) / 100;
      return { r, weekly, hw, h, p, G, D };
    },
    (x) => !onEdge(x.D),
  );
  const { r, weekly, hw, h, p, G, D } = o;
  const Dr = roundTo(D, 2);
  const N = sub(G, Dr);
  const hoursText = weekly ? `works ${hw} hours a week. For budgeting, ${name} counts 4 weeks of work in a month` : `worked ${h} hours in ${month}`;
  return {
    prompt: `${name} earns ${money(r)} an hour as ${j.job} and ${hoursText}. For this question, deductions (income tax, CPP and EI) take ${pc(p)} of gross pay. Find ${poss(name)} gross pay, deductions and net pay for the month. ${CENT}`,
    parts: [moneyPart(G, 'Gross pay: \\$'), moneyPart(D, 'Deductions: \\$'), moneyPart(N, 'Net pay: \\$')],
    hints: [
      weekly ? 'First find the hours in a month: hours per week × 4. Then gross pay = hourly wage × hours.' : 'Gross pay = hourly wage × hours worked.',
      `Deductions = ${pc(p)} of gross pay, so multiply by $${dec(p)}$. Net pay = gross pay − deductions.`,
    ],
    solution: [
      ...(weekly ? [`Hours in the month: $${hw} \\times 4 = ${h}$`] : []),
      `Gross pay: $${m2(r)} \\times ${h} = ${m2(G)}$`,
      `Deductions: $${pcm(p)} = ${dec(p)}$, so $${m2(G)} \\times ${dec(p)} ${toCents(D)}$`,
      `Net pay: $${m2(G)} - ${m2(Dr)} = ${m2(N)}$`,
      `Gross pay is ${money(G)}, deductions are ${abt(D)}${money(Dr)}, and ${poss(name)} net pay is ${money(N)}.`,
    ],
  };
}

function balanceBudget(rng: Rng, d: Lvl): Out {
  const name = rng.pick(NAMES);
  const city = rng.pick(CITIES);
  const items = makeBudget(rng, d, d === 1 ? 5 : 7);
  const T = total(items.map((e) => e.amount));
  const deficit = rng.chance(0.35);
  const gap = d === 1 ? rng.int(3, 30) * 10 : rng.int(1500, 38000) / 100;
  const I = deficit ? sub(T, gap) : total([T, gap]);
  return {
    prompt: `${name} lives in ${city} and has a net (take-home) income of ${tag(I)} a month. The table shows ${poss(name)} monthly expenses. Find the total expenses. Does the budget have a surplus or a deficit, and how much is it? ${CENT}`,
    figure: budgetTable(items),
    parts: [moneyPart(T, 'Total expenses: \\$'), part(fixedChoice(['Surplus', 'Deficit'], deficit ? 1 : 0), { label: 'Surplus or deficit?' }), moneyPart(gap, 'Amount: \\$')],
    hints: [
      'Add every expense in the table to get the total.',
      'If the income is bigger than the expenses, the difference is a **surplus**. If the expenses are bigger, the difference is a **deficit**.',
    ],
    solution: [
      `Total expenses: ${sumLine(items.map((e) => e.amount), T)}`,
      deficit
        ? `The expenses (${money(T)}) are more than the income (${money(I)}), so there is a deficit: $${m2(T)} - ${m2(I)} = ${m2(gap)}$`
        : `The income (${money(I)}) is more than the expenses (${money(T)}), so there is a surplus: $${m2(I)} - ${m2(T)} = ${m2(gap)}$`,
      deficit
        ? `The expenses total ${money(T)}. The budget has a deficit of ${money(gap)}, so ${name} needs to spend less or earn more.`
        : `The expenses total ${money(T)}. The budget has a surplus of ${money(gap)} that ${name} can save.`,
    ],
  };
}

const FIXED_LIST = ['Rent', 'Phone plan', 'Vehicle insurance', 'Bus pass', 'Internet', 'Gym membership', 'Truck payment', 'Tenant insurance', 'Student loan payment', 'Streaming service'];
const VARIABLE_LIST = ['Groceries', 'Eating out', 'Gas for the truck', 'Clothing', 'Entertainment', 'Gifts', 'Personal care', 'Haircuts'];

function classify(rng: Rng, d: Lvl): Out {
  const name = rng.pick(NAMES);
  if (d === 1) {
    const askFixed = rng.chance(0.5);
    const correct = rng.pick(askFixed ? FIXED_LIST : VARIABLE_LIST);
    const others = rng.sample(askFixed ? VARIABLE_LIST : FIXED_LIST, 3);
    const kind = askFixed ? 'fixed' : 'variable';
    return {
      prompt: `${name} is setting up a monthly budget. Which of these is a **${kind} expense**?`,
      parts: [part(mc(rng, correct, others))],
      hints: ['A fixed expense costs the same amount every month. A variable expense changes from month to month.', askFixed ? 'Look for the bill with a set price each month.' : 'Look for the cost that goes up or down with how much you buy or use.'],
      solution: [
        askFixed ? `${correct} costs the same amount every month.` : `${correct} changes from month to month, depending on how much ${name} buys or uses.`,
        `${list(others.map((x, i) => (i ? lower(x) : x)))} ${askFixed ? 'can change from month to month, so they are variable' : 'cost the same every month, so they are fixed'}.`,
        `The ${kind} expense is ${lower(correct)}.`,
      ],
    };
  }
  const nFixed = rng.int(2, 3);
  const fixed = rng.sample(FIXED_LIST, nFixed);
  const vari = rng.sample(VARIABLE_LIST, 5 - nFixed);
  const askFixed = rng.chance(0.5);
  const options = [...fixed.map((md) => ({ md, correct: askFixed })), ...vari.map((md) => ({ md, correct: !askFixed }))];
  const kind = askFixed ? 'fixed' : 'variable';
  const right = askFixed ? fixed : vari;
  return {
    prompt: `${name} is sorting expenses for a monthly budget. Select **all** the ${kind} expenses.`,
    parts: [part(multi(rng, options))],
    hints: ['A fixed expense is the same every month (a set bill). A variable expense changes with how much you buy or use.', 'Check each one: would the amount be the same next month?'],
    solution: [
      `Fixed (the same every month): ${list(fixed.map(lower))}.`,
      `Variable (they change from month to month): ${list(vari.map(lower))}.`,
      `The ${kind} expenses are ${list(right.map(lower))}.`,
    ],
  };
}

const CIRCLE_CATS = [
  { label: 'Housing', phrase: 'housing' },
  { label: 'Food', phrase: 'food' },
  { label: 'Transportation', phrase: 'transportation' },
  { label: 'Savings', phrase: 'savings' },
  { label: 'Other', phrase: 'other spending' },
];

function circlePercents(rng: Rng, d: Lvl): number[] {
  const p = retry(
    () => (d === 1 ? [rng.pick([30, 35, 40]), rng.pick([15, 20]), rng.pick([10, 15, 20]), rng.pick([5, 10, 15])] : [rng.int(28, 42), rng.int(12, 21), rng.int(9, 18), rng.int(5, 14)]),
    (x) => 100 - x.reduce((s, v) => s + v, 0) >= 8,
  );
  return [...p, 100 - p.reduce((s, v) => s + v, 0)];
}
const circleFig = (name: string, pcts: number[]): Figure => ({
  type: 'circleGraph',
  slices: CIRCLE_CATS.map((c, i) => ({ label: c.label, value: pcts[i] })),
  show: 'percent',
  caption: `${poss(name)} monthly budget`,
});

function circleAmount(rng: Rng, d: Lvl): Out {
  const name = rng.pick(NAMES);
  const pcts = circlePercents(rng, d);
  const k = rng.int(0, 4);
  const p = pcts[k];
  const I = d === 1 ? rng.int(20, 36) * 100 : retry(() => rng.int(210000, 380000) / 100, (x) => !onEdge((x * p) / 100));
  const A = (p * I) / 100;
  const cat = CIRCLE_CATS[k];
  return {
    prompt: `${name} has a net income of ${tag(I)} a month. The circle graph shows how ${name} plans to split it. How much does the plan set aside for ${cat.phrase} each month? ${CENT}`,
    figure: circleFig(name, pcts),
    parts: [moneyPart(A)],
    hints: ['The whole circle is 100% of the net income. Read the percent for this category.', `Write ${pc(p)} as a decimal and multiply by the income: $${dec(p)} \\times ${mv(I)}$.`],
    solution: [
      `The graph shows ${cat.label} is ${pc(p)} of net income: $${pcm(p)} = ${dec(p)}$`,
      `$${dec(p)} \\times ${mv(I)} ${toCents(A)}$`,
      `The plan sets aside ${abt(A)}${money(A)} for ${cat.phrase} each month.`,
    ],
  };
}

function circleReverse(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const pcts = circlePercents(rng, 2);
  const [k1, k2] = rng.sample([0, 1, 2, 3, 4], 2);
  const I = rng.int(2200, 3800);
  const A1 = (pcts[k1] * I) / 100;
  const A2 = (pcts[k2] * I) / 100;
  const c1 = CIRCLE_CATS[k1];
  const c2 = CIRCLE_CATS[k2];
  return {
    prompt: `The circle graph shows how ${name} splits a monthly net income. The plan sets aside ${money(A1)} a month for ${c1.phrase}. What is ${poss(name)} monthly net income? How much does the plan set aside for ${c2.phrase}? ${CENT}`,
    figure: circleFig(name, pcts),
    parts: [moneyPart(I, 'Net income: \\$'), moneyPart(A2, `${c2.label}: \\$`)],
    hints: [
      `${c1.label} is ${pc(pcts[k1])} of the income, so ${money(A1)} $= ${dec(pcts[k1])} \\times$ income. Divide to find the income.`,
      `Then multiply the income by the percent for ${c2.phrase} (${pc(pcts[k2])}).`,
    ],
    solution: [
      `${c1.label}: $${dec(pcts[k1])} \\times \\text{income} = ${m2(A1)}$`,
      `Divide: $\\text{income} = ${m2(A1)} \\div ${dec(pcts[k1])} = ${m2(I)}$`,
      `${c2.label}: $${dec(pcts[k2])} \\times ${m2(I)} = ${m2(A2)}$`,
      `${poss(name)} net income is ${money(I)} a month, and the plan sets aside ${money(A2)} for ${c2.phrase}.`,
    ],
  };
}

function percentOfIncome(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const items = makeBudget(rng, 2, 6);
  const o = retry(
    () => {
      const k = rng.pick(items.map((e, i) => (e.amount >= 90 ? i : -1)).filter((i) => i >= 0));
      const I = rng.int(240000, 400000) / 100;
      return { k, I, p: (items[k].amount / I) * 100 };
    },
    (x) => !onEdge(x.p, 1),
  );
  const e = items[o.k];
  return {
    prompt: `${name} has a net income of ${money(o.I)} a month. The table shows ${poss(name)} monthly budget. What percent of ${poss(name)} net income goes to ${e.phrase}? Round to the nearest tenth of a percent.`,
    figure: budgetTable(items),
    parts: [numPart(o.p, { decimals: 1, suffix: '%' })],
    hints: ['Percent of income = expense ÷ net income × 100.', `Work out $${m2(e.amount)} \\div ${m2(o.I)} \\times 100$, then round to one decimal place.`],
    solution: [
      `${e.label} costs ${money(e.amount)} a month.`,
      `$${m2(e.amount)} \\div ${m2(o.I)} \\times 100 \\approx ${num(o.p, 3)}$`,
      `About ${fmtFixed(o.p, 1)}% of ${poss(name)} net income goes to ${e.phrase}.`,
    ],
  };
}

function netBudget(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const j = rng.pick(JOBS);
  const items = makeBudget(rng, 2, 6);
  const T = total(items.map((e) => e.amount));
  const tax = rng.pick([9, 10, 11, 12, 13]);
  const cpp = rng.pick([5, 5.5, 6]);
  const ei = rng.pick([1.5, 1.6, 1.7]);
  const P = roundTo(tax + cpp + ei, 2);
  const o = retry(
    () => {
      const r = rng.int(j.lo * 50, j.hi * 50) / 50;
      const target = (T * rng.float(0.88, 1.18, 2)) / (1 - P / 100);
      const h = Math.max(60, Math.min(180, Math.round(target / r)));
      const G = roundTo(r * h, 2);
      const D = (G * P) / 100;
      const N = sub(G, roundTo(D, 2));
      return { r, h, G, D, N };
    },
    (x) => !onEdge(x.D) && Math.abs(x.N - T) >= 20,
    200,
  );
  const { r, h, G, D, N } = o;
  const Dr = roundTo(D, 2);
  const deficit = N < T;
  const gap = deficit ? sub(T, N) : sub(N, T);
  return {
    prompt: `${name} works as ${j.job} for ${money(r)} an hour and works ${h} hours a month. For this question, use these deductions: income tax ${pc(tax)}, CPP ${pc(cpp)} and EI ${pc(ei)} of gross pay. The table shows ${poss(name)} monthly expenses. Find ${poss(name)} net pay for the month. Does the budget have a surplus or a deficit, and how much? ${CENT}`,
    figure: budgetTable(items),
    parts: [moneyPart(N, 'Net pay: \\$'), part(fixedChoice(['Surplus', 'Deficit'], deficit ? 1 : 0), { label: 'Surplus or deficit?' }), moneyPart(gap, 'Amount: \\$')],
    hints: [
      `Gross pay = wage × hours. Add the deduction percents (${pc(tax)} + ${pc(cpp)} + ${pc(ei)}) and take that percent of gross pay off.`,
      'Then add the expenses and compare them with the net pay.',
    ],
    solution: [
      `Gross pay: $${m2(r)} \\times ${h} = ${m2(G)}$`,
      `Total deductions: $${pcm(tax)} + ${pcm(cpp)} + ${pcm(ei)} = ${pcm(P)} = ${dec(P)}$, so $${m2(G)} \\times ${dec(P)} ${toCents(D)}$`,
      `Net pay: $${m2(G)} - ${m2(Dr)} = ${m2(N)}$`,
      `Total expenses: ${sumLine(items.map((e) => e.amount), T)}`,
      deficit ? `Expenses are more than net pay, a deficit: $${m2(T)} - ${m2(N)} = ${m2(gap)}$` : `Net pay is more than expenses, a surplus: $${m2(N)} - ${m2(T)} = ${m2(gap)}$`,
      `${poss(name)} net pay is ${money(N)}. The budget has a ${deficit ? 'deficit' : 'surplus'} of ${money(gap)}.`,
    ],
  };
}

function biweekly(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const j = rng.pick(JOBS);
  const o = retry(
    () => {
      const r = rng.int(j.lo * 20, j.hi * 20) / 20;
      const h = rng.int(30, 80);
      const p = rng.pick([16, 17.5, 18, 19.5, 20, 21, 22]);
      const G = roundTo(r * h, 2);
      const D = (G * p) / 100;
      const Nc = sub(G, roundTo(D, 2));
      const M = (Nc * 26) / 12;
      return { r, h, p, G, D, Nc, M };
    },
    (x) => !onEdge(x.D) && !onEdge(x.M),
  );
  const { r, h, p, G, D, Nc, M } = o;
  return {
    prompt: `${name} works as ${j.job} for ${money(r)} an hour and is paid every two weeks, so there are 26 paydays in a year. Each pay cheque covers ${h} hours of work. For this question, deductions take ${pc(p)} of gross pay. What is the net pay on each pay cheque? To budget by the month, ${name} finds the average monthly net income: net pay per cheque × 26 ÷ 12. What is it? ${CENT}`,
    parts: [moneyPart(Nc, 'Net pay per cheque: \\$'), moneyPart(M, 'Average monthly net income: \\$')],
    hints: ['Gross pay = wage × hours. Net pay = gross pay − deductions.', 'There are 26 pay cheques in a year but 12 months, so multiply by 26 and divide by 12. Do not just multiply by 2.'],
    solution: [
      `Gross pay per cheque: $${m2(r)} \\times ${h} = ${m2(G)}$`,
      `Deductions: $${m2(G)} \\times ${dec(p)} ${toCents(D)}$`,
      `Net pay per cheque: $${m2(G)} - ${m2(roundTo(D, 2))} = ${m2(Nc)}$`,
      `Yearly net pay $\\div$ 12 months: $${m2(Nc)} \\times 26 \\div 12 ${toCents(M)}$`,
      `Each pay cheque is ${money(Nc)}, and ${poss(name)} average monthly net income is ${abt(M)}${money(M)}.`,
    ],
  };
}

function housingGuide(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const city = rng.pick(['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Westbury']);
  const limit = rng.pick([30, 35]);
  const U = rng.int(8000, 17000) / 100;
  const Ti = rng.int(1800, 3600) / 100;
  if (rng.chance(0.5)) {
    const o = retry(
      () => {
        const I = rng.int(240000, 420000) / 100;
        const R = Math.round(((I * limit) / 100 - U - Ti) * rng.float(0.8, 1.2, 2) / 25) * 25;
        const H = total([R, U, Ti]);
        return { R, H, I, p: (H / I) * 100 };
      },
      (x) => !onEdge(x.p, 1) && Math.abs(x.p - limit) >= 0.5,
    );
    const ok = o.p <= limit;
    return {
      prompt: `${name} has a net income of ${money(o.I)} a month and rents an apartment in ${city}. Rent is ${tag(o.R)}, utilities are ${money(U)} and tenant insurance is ${money(Ti)} each month. A budgeting guideline used in this question says total housing costs should be no more than ${pc(limit)} of net income. Find the total monthly housing cost (to the nearest cent) and the percent of net income it uses (to the nearest tenth of a percent). Does ${name} meet the guideline?`,
      parts: [moneyPart(o.H, 'Housing cost: \\$'), numPart(o.p, { decimals: 1, suffix: '%', label: 'Percent of income:' }), yesNo('Meets the guideline?', ok)],
      hints: ['Housing costs = rent + utilities + tenant insurance.', 'Percent of income = housing cost ÷ net income × 100. Compare with the guideline.'],
      solution: [
        `Housing cost: $${mv(o.R)} + ${m2(U)} + ${m2(Ti)} = ${m2(o.H)}$`,
        `Percent of income: $${m2(o.H)} \\div ${m2(o.I)} \\times 100 \\approx ${num(o.p, 3)}$`,
        `About ${fmtFixed(o.p, 1)}% is ${ok ? 'within' : 'more than'} the ${pc(limit)} guideline.`,
        `Housing costs ${money(o.H)}, about ${fmtFixed(o.p, 1)}% of net income. ${ok ? `Yes, ${name} meets the guideline.` : `No, ${name} does not meet the guideline.`}`,
      ],
    };
  }
  const o = retry(
    () => {
      const I = rng.int(240000, 420000) / 100;
      const H = (I * limit) / 100;
      return { I, H, R: H - U - Ti };
    },
    (x) => !onEdge(x.H) && x.R > 500,
  );
  const Hr = roundTo(o.H, 2);
  const R = sub(Hr, total([U, Ti]));
  return {
    prompt: `${name} has a net income of ${money(o.I)} a month and is looking for an apartment in ${city}. Utilities will be about ${money(U)} and tenant insurance ${money(Ti)} a month. A budgeting guideline used in this question says total housing costs (rent + utilities + tenant insurance) should be no more than ${pc(limit)} of net income. What is the most ${name} can spend on housing in total? What is the highest rent ${name} can pay and still meet the guideline? ${CENT}`,
    parts: [moneyPart(o.H, 'Most for housing: \\$'), moneyPart(R, 'Highest rent: \\$')],
    hints: [`Find ${pc(limit)} of the net income: multiply by $${dec(limit)}$.`, 'The rent is what is left after the utilities and tenant insurance come out of that amount.'],
    solution: [
      `Most for housing: $${dec(limit)} \\times ${m2(o.I)} ${toCents(o.H)}$`,
      `Highest rent: $${m2(Hr)} - ${m2(U)} - ${m2(Ti)} = ${m2(R)}$`,
      `${name} can spend ${abt(o.H)}${money(Hr)} on housing, so the rent should be no more than ${money(R)} a month.`,
    ],
  };
}

const budget = skill({
  id: 'm203-budget',
  name: 'Personal budgets',
  description: 'Find net income from pay and stated deductions, classify fixed and variable expenses, balance a budget, and find the money or percent of income for each category.',
  outcomes: ['N2'],
  lessonId: 'm203-6-1',
  calculator: true,
  gen(rng, d) {
    if (d === 1) {
      const k = rng.pick(['net', 'balance', 'balance', 'classify', 'circle'] as const);
      if (k === 'net') return netPay(rng, 1);
      if (k === 'classify') return classify(rng, 1);
      return k === 'circle' ? circleAmount(rng, 1) : balanceBudget(rng, 1);
    }
    if (d === 2) {
      const k = rng.pick(['net', 'net', 'balance', 'balance', 'percent', 'circle', 'classify'] as const);
      if (k === 'net') return netPay(rng, 2);
      if (k === 'classify') return classify(rng, 2);
      if (k === 'percent') return percentOfIncome(rng);
      return k === 'circle' ? circleAmount(rng, 2) : balanceBudget(rng, 2);
    }
    const k = rng.pick(['netBudget', 'netBudget', 'biweekly', 'housing', 'reverse'] as const);
    if (k === 'biweekly') return biweekly(rng);
    if (k === 'housing') return housingGuide(rng);
    return k === 'reverse' ? circleReverse(rng) : netBudget(rng);
  },
});

// ---------------------------------------------------------------------------
// 6.1 Adjusting a budget — m203-budget-adjust
// ---------------------------------------------------------------------------

const GOALS = [
  { what: 'a damage deposit on an apartment', lo: 800, hi: 1600 },
  { what: 'a used truck', lo: 3000, hi: 7000 },
  { what: 'a set of winter tires', lo: 600, hi: 1200 },
  { what: 'a welding course', lo: 900, hi: 2400 },
  { what: 'a trip to the mountains', lo: 600, hi: 1400 },
  { what: 'an emergency fund', lo: 1000, hi: 2500 },
  { what: 'tools for a carpentry apprenticeship', lo: 700, hi: 1800 },
  { what: 'a used snowmobile', lo: 2500, hi: 6000 },
  { what: 'a new phone', lo: 300, hi: 1200 },
  { what: 'a concert trip to the city', lo: 300, hi: 900 },
];
const CUTS = ['eating out', 'entertainment', 'clothing', 'streaming and games'];

/** Months from the start of month a to the start of month b (same year, b after a). */
function monthSpan(rng: Rng, lo: number, hi: number) {
  const m = rng.int(lo, hi);
  const a = rng.int(0, 11 - m);
  return { m, from: MONTHS[a], to: MONTHS[a + m], counted: MONTHS.slice(a, a + m) };
}

function adjust1(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const g = rng.pick(GOALS);
  const kind = rng.pick(['perMonth', 'months', 'cut'] as const);
  const { m, S } = retry(
    () => {
      const m = rng.int(3, 12);
      return { m, S: rng.int(Math.ceil(g.lo / m / 25), Math.floor(g.hi / m / 25)) * 25 };
    },
    (x) => x.S >= 50 && x.S <= 600,
    200,
  );
  const G = S * m;
  if (kind === 'perMonth') {
    return {
      prompt: `${name} wants to save ${tag(G)} for ${g.what} in ${m} months. How much does ${name} need to save each month? ${CENT}`,
      parts: [moneyPart(S)],
      hints: ['Share the goal equally over the months.', `Monthly savings = goal ÷ number of months: $${mv(G)} \\div ${m}$.`],
      solution: ['Monthly savings $=$ goal $\\div$ number of months.', `$${mv(G)} \\div ${m} = ${mv(S)}$`, `${name} needs to save ${money(S)} each month.`],
    };
  }
  if (kind === 'months') {
    return {
      prompt: `${name} has a budget surplus of ${tag(S)} each month and puts all of it toward ${g.what}. The goal is ${tag(G)}. How many months will it take ${name} to save enough?`,
      parts: [numPart(m, { suffix: 'months' })],
      hints: ['Each month adds the same amount to the savings.', `Number of months = goal ÷ monthly savings: $${mv(G)} \\div ${mv(S)}$.`],
      solution: ['Number of months $=$ goal $\\div$ monthly savings.', `$${mv(G)} \\div ${mv(S)} = ${m}$`, `It will take ${name} ${m} months.`],
    };
  }
  const now = rng.int(8, 24) * 10;
  const cut = rng.int(2, Math.floor(now / 10) - 2) * 10;
  const after = now - cut;
  const where = rng.pick(CUTS);
  const saved = cut * m;
  return {
    prompt: `${name} spends ${tag(now)} a month on ${where} and decides to cut that to ${tag(after)} a month. The money saved goes toward ${g.what}. How much extra will ${name} save each month? How much will that add up to in ${m} months? ${CENT}`,
    parts: [moneyPart(cut, 'Extra each month: \\$'), moneyPart(saved, `In ${m} months: \\$`)],
    hints: ['The extra savings each month is the old amount minus the new amount.', 'Multiply the monthly savings by the number of months.'],
    solution: [`Extra each month: $${mv(now)} - ${mv(after)} = ${mv(cut)}$`, `In ${m} months: $${mv(cut)} \\times ${m} = ${mv(saved)}$`, `${name} saves ${money(cut)} more each month, which adds up to ${money(saved)} in ${m} months.`],
  };
}

function adjust2(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const g = rng.pick(GOALS);
  const span = monthSpan(rng, 4, 10);
  const { m } = span;
  if (rng.chance(0.5)) {
    // Savings needed by a date, with money already saved, then the cut needed.
    const o = retry(
      () => {
        const S = rng.int(Math.ceil(g.lo / m / 5), Math.floor(g.hi / m / 5)) * 5;
        const saved = rng.int(2, 12) * 25;
        const L = S - rng.int(3, 20) * 5;
        return { S, saved, L, G: saved + S * m };
      },
      (x) => x.S >= 60 && x.L >= 25,
      200,
    );
    const need = o.G - o.saved;
    const cut = o.S - o.L;
    return {
      prompt: `It is the start of ${span.from}. ${name} wants ${tag(o.G)} for ${g.what} by the start of ${span.to}, and already has ${tag(o.saved)} saved. ${poss(name)} budget has a surplus of ${tag(o.L)} a month. How much does ${name} need to save each month to reach the goal on time? How much must ${name} cut from spending each month to do it? ${CENT}`,
      parts: [moneyPart(o.S, 'Save each month: \\$'), moneyPart(cut, 'Cut spending by: \\$')],
      hints: [
        `Count the months from the start of ${span.from} to the start of ${span.to}. Take off what is already saved, then share the rest over the months.`,
        'Compare the monthly savings needed with the surplus. The difference must come from spending less.',
      ],
      solution: [
        `Months of saving: ${list(span.counted)}, which is ${m} months.`,
        `Still needed: $${mv(o.G)} - ${mv(o.saved)} = ${mv(need)}$`,
        `Each month: $${mv(need)} \\div ${m} = ${mv(o.S)}$`,
        `Cut needed: $${mv(o.S)} - ${mv(o.L)} = ${mv(cut)}$`,
        `${name} must save ${money(o.S)} a month, so ${name} needs to spend ${money(cut)} less each month.`,
      ],
    };
  }
  // How many months, rounded up to whole months.
  const o = retry(
    () => {
      const S = rng.int(12, 60) * 5;
      const saved = rng.int(0, 8) * 50;
      const G = rng.int(Math.ceil(g.lo / 50), Math.floor(g.hi / 50)) * 50;
      return { S, saved, G };
    },
    (x) => x.G > x.saved + x.S * 2 && (x.G - x.saved) % x.S !== 0 && Math.ceil((x.G - x.saved) / x.S) <= 18,
    300,
  );
  const need = o.G - o.saved;
  const exact = need / o.S;
  const months = Math.ceil(exact);
  const savedText = o.saved ? ` and already has ${tag(o.saved)} saved` : '';
  return {
    prompt: `${name} is saving ${tag(o.G)} for ${g.what}. ${name} can save ${tag(o.S)} each month${savedText}. How many months of saving will it take to have enough? Count a part of a month as a whole month.`,
    parts: [numPart(months, { suffix: 'months' })],
    hints: ['Find how much more is needed, then divide by the monthly savings.', 'If the answer is not a whole number, round **up**: rounding down leaves you short of the goal.'],
    solution: [
      ...(o.saved ? [`Still needed: $${mv(o.G)} - ${mv(o.saved)} = ${mv(need)}$`] : []),
      `Months: $${mv(need)} \\div ${mv(o.S)} \\approx ${num(exact, 2)}$`,
      `After ${months - 1} months ${name} has only ${tag(o.saved + o.S * (months - 1))}, so round up to ${months}.`,
      `It will take ${months} months.`,
    ],
  };
}

function adjust3(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const g = rng.pick(GOALS);
  if (rng.chance(0.5)) {
    // Cut two variable expenses by stated percents, then find the months needed.
    const wantYes = rng.chance(0.5);
    const o = retry(
      () => {
        const eat = rng.int(9, 26) * 10 + rng.pick([0, 5]);
        const fun = rng.int(6, 18) * 10 + rng.pick([0, 5]);
        const pe = rng.pick([20, 25, 30, 40, 50]);
        const pf = rng.pick([20, 25, 30, 40, 50]);
        const L = rng.int(4, 30) * 5;
        const ce = (eat * pe) / 100;
        const cf = (fun * pf) / 100;
        const S = total([L, ce, cf]);
        // Aim for a goal that takes 3 to 10 months, so the deadline fits in one calendar year.
        const k = rng.int(3, wantYes ? 8 : 10);
        const lo = Math.floor(((k - 1) * S) / 50) + 1;
        const G = rng.int(lo, Math.max(lo, Math.floor((k * S) / 50))) * 50;
        const months = Math.ceil(Math.round(G * 100) / Math.round(S * 100));
        // The deadline is a few months after (Yes) or before (No) the months needed.
        const m = wantYes ? months + rng.int(1, 3) : months - rng.int(1, Math.max(1, Math.min(4, months - 2)));
        return { eat, fun, pe, pf, L, ce, cf, S, G, months, m };
      },
      (x) => x.months >= 3 && x.m >= 2 && x.m <= 11 && x.m !== x.months && x.G / x.S - Math.floor(x.G / x.S) >= 0.02,
      600,
    );
    // Keep the deadline inside one calendar year even if every retry failed.
    o.m = Math.min(11, Math.max(2, o.m));
    const fits = GOALS.filter((x) => x.lo <= o.G && o.G <= x.hi);
    const goal = fits.length ? rng.pick(fits).what : 'an emergency fund';
    const a = rng.int(0, 11 - o.m);
    const span = { m: o.m, from: MONTHS[a], to: MONTHS[a + o.m] };
    const ok = o.months <= span.m;
    return {
      prompt: `${name} wants ${tag(o.G)} for ${goal}. ${poss(name)} budget has a surplus of ${tag(o.L)} a month. To save faster, ${name} cuts eating out (now ${tag(o.eat)} a month) by ${pc(o.pe)} and entertainment (now ${tag(o.fun)} a month) by ${pc(o.pf)}, and saves the surplus plus everything cut. How much will ${name} save each month (to the nearest cent)? How many months will it take to reach the goal (count a part month as a whole month)? It is the start of ${span.from}. Will ${name} have the money by the start of ${span.to}?`,
      parts: [moneyPart(o.S, 'Saved each month: \\$'), numPart(o.months, { suffix: 'months', label: 'Months needed:' }), yesNo(`Ready by ${span.to}?`, ok)],
      hints: [`Find ${pc(o.pe)} of the eating-out amount and ${pc(o.pf)} of the entertainment amount. Add both cuts to the surplus.`, 'Months needed = goal ÷ monthly savings, rounded up. Then count the months until the date.'],
      solution: [
        `Eating-out cut: $${dec(o.pe)} \\times ${mv(o.eat)} = ${mv(o.ce)}$`,
        `Entertainment cut: $${dec(o.pf)} \\times ${mv(o.fun)} = ${mv(o.cf)}$`,
        `Saved each month: $${mv(o.L)} + ${mv(o.ce)} + ${mv(o.cf)} = ${mv(o.S)}$`,
        `Months needed: $${mv(o.G)} \\div ${mv(o.S)} \\approx ${num(o.G / o.S, 2)}$, so round up to ${o.months} months.`,
        `From the start of ${span.from} to the start of ${span.to} is ${span.m} months.`,
        `${name} saves ${money(o.S)} a month and needs ${o.months} months. ${ok ? `Yes, ${name} will be ready by ${span.to}.` : `No, ${name} will not be ready by ${span.to}; ${name} would need to cut more or wait longer.`}`,
      ],
    };
  }
  // A budget table, a goal by a date, and the cut needed.
  const span = monthSpan(rng, 4, 10);
  const { m } = span;
  const o = retry(
    () => {
      const items = makeBudget(rng, 2, 6);
      const T = total(items.map((e) => e.amount));
      const L = rng.int(2000, 16000) / 100;
      const I = total([T, L]);
      const S = rng.int(Math.max(Math.ceil((L + 30) / 5), Math.ceil(g.lo / m / 5)), Math.max(Math.ceil((L + 30) / 5) + 4, Math.floor(g.hi / m / 5))) * 5;
      const saved = rng.int(0, 10) * 50;
      return { items, T, L, I, S, saved, G: saved + S * m };
    },
    (x) => x.S - x.L >= 20,
    200,
  );
  const cut = sub(o.S, o.L);
  const need = o.G - o.saved;
  const savedText = o.saved ? ` ${name} already has ${tag(o.saved)} saved.` : '';
  return {
    prompt: `${name} has a net income of ${money(o.I)} a month and the expenses in the table. It is the start of ${span.from}, and ${name} wants ${tag(o.G)} for ${g.what} by the start of ${span.to}.${savedText} What is ${poss(name)} monthly surplus now? How much must ${name} save each month to reach the goal on time? How much must ${name} cut from monthly spending? ${CENT}`,
    figure: budgetTable(o.items),
    parts: [moneyPart(o.L, 'Surplus now: \\$'), moneyPart(o.S, 'Save each month: \\$'), moneyPart(cut, 'Cut spending by: \\$')],
    hints: ['Surplus = net income − total expenses.', `Count the months until ${span.to}, then share what is still needed over those months. The cut is the savings needed minus the surplus.`],
    solution: [
      `Total expenses: ${sumLine(o.items.map((e) => e.amount), o.T)}`,
      `Surplus now: $${m2(o.I)} - ${m2(o.T)} = ${m2(o.L)}$`,
      `Months of saving: ${list(span.counted)}, which is ${m} months.`,
      ...(o.saved ? [`Still needed: $${mv(o.G)} - ${mv(o.saved)} = ${mv(need)}$`] : []),
      `Save each month: $${mv(need)} \\div ${m} = ${mv(o.S)}$`,
      `Cut needed: $${m2(o.S)} - ${m2(o.L)} = ${m2(cut)}$`,
      `The surplus is ${money(o.L)}. ${name} must save ${money(o.S)} a month, so spending must drop by ${money(cut)} a month, for example from eating out or entertainment.`,
    ],
  };
}

const budgetAdjust = skill({
  id: 'm203-budget-adjust',
  name: 'Adjusting a budget for a savings goal',
  description: 'Find the monthly savings or the time needed to reach a goal, and adjust spending to reach a goal by a date.',
  outcomes: ['N2'],
  lessonId: 'm203-6-1',
  calculator: true,
  gen(rng, d) {
    return d === 1 ? adjust1(rng) : d === 2 ? adjust2(rng) : adjust3(rng);
  },
});

// ---------------------------------------------------------------------------
// 6.2 Bank account plans and fees — m203-bank-fees
// ---------------------------------------------------------------------------

interface Plan { name: string; fee: number; free: number; extra: number }
const planText = (p: Plan) =>
  p.free === Infinity
    ? `the **${p.name}** plan costs ${money(p.fee)} a month with unlimited transactions`
    : p.fee === 0 && p.free === 0
      ? `the **${p.name}** plan has no monthly fee, but every transaction costs ${money(p.extra)}`
      : `the **${p.name}** plan costs ${money(p.fee)} a month, includes ${p.free} transactions, and charges ${money(p.extra)} for each extra transaction`;
const planCost = (p: Plan, x: number) => (p.free === Infinity ? p.fee : total([p.fee, Math.max(0, x - p.free) * p.extra]));
function planSteps(p: Plan, x: number): string {
  if (p.free === Infinity) return `${p.name}: unlimited transactions, so the cost is ${money(p.fee)}.`;
  const k = Math.max(0, x - p.free);
  if (k === 0) return `${p.name}: ${x} transactions are all included, so the cost is just ${money(p.fee)}.`;
  if (p.free === 0 && p.fee === 0) return `${p.name}: $${x} \\times ${m2(p.extra)} = ${m2(planCost(p, x))}$.`;
  return `${p.name}: $${x} - ${p.free} = ${k}$ extra transactions, so $${m2(p.fee)} + ${k} \\times ${m2(p.extra)} = ${m2(planCost(p, x))}$.`;
}
const LIMITED_NAMES = ['Basic', 'Everyday', 'Value', 'Student', 'Starter'];
const BIG_NAMES = ['Unlimited', 'Premium', 'Plus', 'All-In'];

function fees1(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const bank = rng.pick(BANKS);
  const month = rng.pick(MONTHS);
  if (rng.chance(0.55)) {
    const p: Plan = { name: rng.pick(LIMITED_NAMES), fee: rng.pick([3.95, 4, 4.95, 5, 5.95, 6.5]), free: rng.pick([10, 12, 15, 20]), extra: rng.pick([0.75, 1, 1.25, 1.5]) };
    const x = p.free + (rng.chance(0.15) ? -rng.int(1, 4) : rng.int(2, 9));
    const C = planCost(p, x);
    return {
      prompt: `At ${bank}, ${planText(p)}. In ${month}, ${name} made ${x} transactions (debit purchases, withdrawals and bill payments). What was the total service charge for the month? ${CENT}`,
      parts: [moneyPart(C)],
      hints: ['Only the transactions past the free ones cost extra.', 'Service charge = monthly fee + (number of extra transactions × fee for each).'],
      solution: [planSteps(p, x), `The service charge for ${month} was ${money(C)}.`],
    };
  }
  const a = rng.pick([1.5, 2, 2.5, 3]);
  const b = rng.pick([1.5, 2, 2.5, 3, 3.5]);
  const n = rng.int(2, 6);
  const et = rng.pick([1, 1.5]);
  const e = rng.int(0, 5);
  const atm = n * (a + b);
  const C = total([atm, e * et]);
  return {
    prompt: `${poss(name)} bank, ${bank}, charges ${money(a)} each time ${name} uses an ATM that belongs to another bank, and the owner of that ATM also charges ${money(b)}.${e ? ` ${name} also pays ${money(et)} for each e-transfer sent.` : ''} In ${month}, ${name} used other banks’ ATMs ${n} times${e ? ` and sent ${e} e-transfers` : ''}. How much did ${name} pay in these fees? ${CENT}`,
    parts: [moneyPart(C)],
    hints: ['Each ATM visit costs both fees.', e ? 'Add the ATM fees and the e-transfer fees.' : `Multiply the fee for one visit by ${n}.`],
    solution: [
      `One ATM visit: $${m2(a)} + ${m2(b)} = ${m2(a + b)}$, so ${n} visits cost $${n} \\times ${m2(a + b)} = ${m2(atm)}$`,
      ...(e ? [`E-transfers: $${e} \\times ${m2(et)} = ${m2(e * et)}$`, `Total: $${m2(atm)} + ${m2(e * et)} = ${m2(C)}$`] : []),
      `${name} paid ${money(C)} in fees.`,
    ],
  };
}

function fees2(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const bank = rng.pick(BANKS);
  if (rng.chance(0.6)) {
    const o = retry(
      () => {
        const A: Plan = { name: rng.pick(LIMITED_NAMES), fee: rng.pick([0, 3.95, 4, 4.95, 5.95]), free: rng.pick([8, 10, 12, 15]), extra: rng.pick([0.75, 1, 1.25, 1.5]) };
        if (A.fee === 0) A.free = 0;
        const B: Plan = rng.chance(0.6)
          ? { name: rng.pick(BIG_NAMES), fee: rng.pick([10.95, 12.95, 14.95, 16.95, 18.95]), free: Infinity, extra: 0 }
          : { name: rng.pick(BIG_NAMES.filter((n) => n !== 'Unlimited')), fee: rng.pick([9.95, 10.95, 11.95]), free: rng.pick([25, 30, 40]), extra: rng.pick([1, 1.25]) };
        const x = rng.int(12, 40);
        return { A, B, x, a: planCost(A, x), b: planCost(B, x) };
      },
      (v) => Math.abs(v.a - v.b) >= 0.5,
    );
    const { A, B, x, a, b } = o;
    const cheaperA = a < b;
    return {
      prompt: `${bank} has two chequing plans: ${planText(A)}; ${planText(B)}. ${name} makes about ${x} transactions a month. Find the monthly cost of each plan for ${name}. Which plan is cheaper? ${CENT}`,
      parts: [moneyPart(a, `${A.name}: \\$`), moneyPart(b, `${B.name}: \\$`), part(fixedChoice([`The ${A.name} plan`, `The ${B.name} plan`], cheaperA ? 0 : 1), { label: 'Cheaper plan:' })],
      hints: ['For each plan, count only the transactions past the included ones as extra.', 'Cost = monthly fee + extra transactions × fee for each. Compare the two costs.'],
      solution: [planSteps(A, x), planSteps(B, x), `For ${x} transactions, the ${cheaperA ? A.name : B.name} plan is cheaper by ${money(Math.abs(sub(a, b)))} a month.`],
    };
  }
  const o = retry(
    () => {
      const bal = rng.int(4000, 40000) / 100;
      const over = rng.int(5000, 60000) / 100;
      const r = rng.pick([19, 21, 21.5, 22, 24]);
      const D = rng.int(3, 14);
      const fee = rng.pick([5, 5, 10]);
      const I = (over * r * D) / 36500;
      return { bal, over, pay: total([bal, over]), r, D, fee, I };
    },
    (v) => !onEdge(v.I),
  );
  const what = rng.pick(['the rent', 'a truck repair', 'a phone bill', 'car insurance', 'a dentist bill']);
  const Ir = roundTo(o.I, 2);
  const T = total([o.fee, Ir]);
  return {
    prompt: `${name} has ${money(o.bal)} in a chequing account at ${bank}, with overdraft protection. A payment of ${money(o.pay)} for ${what} goes through, so the account is overdrawn. The bank charges a ${tag(o.fee)} overdraft fee each time this happens, plus interest of ${pc(o.r)} per year on the overdrawn amount, charged for each day (overdrawn amount × ${dec(o.r)} ÷ 365 × days). The account stays overdrawn for ${o.D} days until payday. How much is the account overdrawn? What is the interest, and the total cost of the overdraft? ${CENT}`,
    parts: [moneyPart(o.over, 'Overdrawn by: \\$'), moneyPart(o.I, 'Interest: \\$'), moneyPart(T, 'Total cost: \\$')],
    hints: ['Overdrawn amount = payment − balance.', `Interest = overdrawn amount × ${dec(o.r)} ÷ 365 × ${o.D}. Then add the overdraft fee.`],
    solution: [
      `Overdrawn by: $${m2(o.pay)} - ${m2(o.bal)} = ${m2(o.over)}$`,
      `Interest: $${m2(o.over)} \\times ${dec(o.r)} \\div 365 \\times ${o.D} ${toCents(o.I)}$`,
      `Total cost: $${mv(o.fee)} + ${m2(Ir)} = ${m2(T)}$`,
      `The account is overdrawn by ${money(o.over)}. The interest is ${abt(o.I)}${money(Ir)}, so the overdraft costs ${money(T)}.`,
    ],
  };
}

function fees3(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const bank = rng.pick(BANKS);
  if (rng.chance(0.6)) {
    // Break-even number of transactions.
    const payPer = rng.chance(0.3);
    const extra = rng.pick([0.5, 0.75, 1, 1.25, 1.5]);
    const A: Plan = payPer ? { name: 'Pay-as-you-go', fee: 0, free: 0, extra } : { name: rng.pick(LIMITED_NAMES), fee: rng.pick([3.95, 4, 4.95, 5]), free: rng.pick([10, 12, 15]), extra };
    const k = rng.int(payPer ? 10 : 4, payPer ? 24 : 16);
    const B: Plan = { name: rng.pick(BIG_NAMES), fee: total([A.fee, k * extra]), free: Infinity, extra: 0 };
    const x = A.free + k;
    const u = x + (rng.chance(0.5) ? rng.int(3, 8) : -rng.int(2, Math.min(6, x - 1)));
    const au = planCost(A, u);
    const cheaperA = au < B.fee;
    return {
      prompt: `At ${bank}, ${planText(A)}. The other choice: ${planText(B)}. For how many transactions in a month do the two plans cost the same? Which plan is cheaper for ${name}, who makes about ${u} transactions a month?`,
      parts: [numPart(x, { suffix: 'transactions', label: 'Same cost at:' }), part(fixedChoice([`The ${A.name} plan`, `The ${B.name} plan`], cheaperA ? 0 : 1), { label: `Cheaper for ${u}:` })],
      hints: [
        A.free ? `Past ${A.free} transactions, each one adds ${money(extra)} to the ${A.name} plan. How many extra transactions make up the difference in monthly fees?` : `How many transactions at ${money(extra)} each add up to ${money(B.fee)}?`,
        A.free ? `Extra transactions = (${money(B.fee)} − ${money(A.fee)}) ÷ ${money(extra)}. Add the ${A.free} included ones.` : `Divide ${money(B.fee)} by ${money(extra)}.`,
      ],
      solution: [
        A.free
          ? `The difference in monthly fees: $${m2(B.fee)} - ${m2(A.fee)} = ${m2(k * extra)}$`
          : `The ${B.name} plan costs ${money(B.fee)} a month.`,
        `${A.free ? 'Extra transactions' : 'Transactions'} to cover it: $${m2(k * extra)} \\div ${m2(extra)} = ${k}$`,
        ...(A.free ? [`Add the included transactions: $${A.free} + ${k} = ${x}$`] : []),
        `Check: ${planSteps(A, x)}`,
        `For ${u} transactions: ${planSteps(A, u)} The ${B.name} plan is ${money(B.fee)}.`,
        `The plans cost the same at ${x} transactions. For ${u} transactions, the ${cheaperA ? A.name : B.name} plan is cheaper.`,
      ],
    };
  }
  // A year of fees, with e-transfers.
  const o = retry(
    () => {
      const A: Plan = { name: rng.pick(LIMITED_NAMES), fee: rng.pick([3.95, 4.95, 5.95]), free: rng.pick([10, 12, 15]), extra: rng.pick([1, 1.25]) };
      const B: Plan = { name: rng.pick(BIG_NAMES), fee: rng.pick([11.95, 13.95, 14.95, 16.95]), free: Infinity, extra: 0 };
      const x = rng.int(14, 32);
      const e = rng.int(2, 8);
      const et = rng.pick([1, 1.5]);
      const a = total([planCost(A, x), e * et]);
      return { A, B, x, e, et, a, b: B.fee };
    },
    (v) => Math.abs(v.a - v.b) >= 1,
  );
  const { A, B, x, e, et, a, b } = o;
  const save = roundTo(Math.abs(sub(a, b)) * 12, 2);
  const cheaperA = a < b;
  return {
    prompt: `${name} is choosing a chequing plan at ${bank}. The **${A.name}** plan costs ${money(A.fee)} a month, includes ${A.free} transactions and charges ${money(A.extra)} for each extra transaction; e-transfers are not included and cost ${money(et)} each. The **${B.name}** plan costs ${money(B.fee)} a month and includes unlimited transactions and e-transfers. ${name} makes about ${x} transactions and sends ${e} e-transfers a month. Find the monthly cost of each plan. How much would ${name} save in a year by choosing the cheaper plan? ${CENT}`,
    parts: [moneyPart(a, `${A.name} per month: \\$`), moneyPart(b, `${B.name} per month: \\$`), moneyPart(save, 'Saved in a year: \\$')],
    hints: [`For the ${A.name} plan, add the monthly fee, the extra transactions and the e-transfers.`, 'Find the monthly difference, then multiply by 12.'],
    solution: [
      planSteps(A, x),
      `E-transfers: $${e} \\times ${m2(et)} = ${m2(e * et)}$, so the ${A.name} plan costs $${m2(planCost(A, x))} + ${m2(e * et)} = ${m2(a)}$ a month.`,
      `${B.name}: ${money(b)} a month.`,
      `Yearly savings: $(${m2(cheaperA ? b : a)} - ${m2(cheaperA ? a : b)}) \\times 12 = ${m2(save)}$`,
      `The ${A.name} plan costs ${money(a)} and the ${B.name} plan costs ${money(b)} a month. Choosing the ${cheaperA ? A.name : B.name} plan saves ${money(save)} a year.`,
    ],
  };
}

const bankFees = skill({
  id: 'm203-bank-fees',
  name: 'Bank account plans and fees',
  description: 'Find monthly service charges, ATM, e-transfer and overdraft costs, compare account plans for a stated usage, and find the break-even number of transactions.',
  outcomes: ['N4'],
  lessonId: 'm203-6-2',
  calculator: true,
  gen(rng, d) {
    return d === 1 ? fees1(rng) : d === 2 ? fees2(rng) : fees3(rng);
  },
});

// ---------------------------------------------------------------------------
// 6.2 Bank statements — m203-bank-reconcile
// ---------------------------------------------------------------------------

const SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
interface Tx { desc: string; amt: number; dep: boolean }
const WITHDRAWALS: Array<{ desc: string; lo: number; hi: number; whole?: boolean }> = [
  { desc: 'Debit purchase: groceries', lo: 40, hi: 180 },
  { desc: 'Debit purchase: gas', lo: 45, hi: 110 },
  { desc: 'ATM withdrawal', lo: 2, hi: 10, whole: true },
  { desc: 'Bill payment: phone', lo: 40, hi: 85 },
  { desc: 'Bill payment: power', lo: 60, hi: 140 },
  { desc: 'E-transfer to roommate', lo: 50, hi: 250 },
  { desc: 'Debit purchase: hardware store', lo: 20, hi: 120 },
  { desc: 'Bill payment: vehicle insurance', lo: 110, hi: 220 },
];
const DEPOSITS = ['Payroll deposit', 'Cash deposit', 'E-transfer received'];

function txAmount(rng: Rng, w: { lo: number; hi: number; whole?: boolean }, d: number): number {
  if (w.whole) return rng.int(w.lo, w.hi) * 20;
  return d === 1 ? rng.int(w.lo, w.hi) : rng.int(w.lo * 100, w.hi * 100) / 100;
}

/** A month of transactions in date order, with a payroll deposit in the middle. */
function makeTx(rng: Rng, d: number, n: number): Tx[] {
  const ws = rng.sample(WITHDRAWALS, n - (n >= 5 ? 2 : 1)).map((w) => ({ desc: w.desc, amt: txAmount(rng, w, d), dep: false }));
  const pay = d === 1 ? rng.int(30, 90) * 10 : rng.int(60000, 160000) / 100;
  const deps: Tx[] = [{ desc: 'Payroll deposit', amt: pay, dep: true }];
  if (n >= 5) deps.push({ desc: rng.pick(DEPOSITS.slice(1)), amt: d === 1 ? rng.int(2, 10) * 10 : rng.int(2000, 20000) / 100, dep: true });
  const all = [...ws];
  all.splice(rng.int(1, all.length - 1), 0, deps[0]);
  if (deps[1]) all.splice(rng.int(0, all.length), 0, deps[1]);
  return all;
}
/** The balance after each transaction. */
function runBalances(O: number, txs: Tx[]): number[] {
  const out: number[] = [];
  let b = O;
  for (const t of txs) {
    b = t.dep ? total([b, t.amt]) : sub(b, t.amt);
    out.push(b);
  }
  return out;
}
function dates(rng: Rng, n: number): string[] {
  const mon = rng.pick(SHORT_MONTHS);
  const days = rng.sample(Array.from({ length: 27 }, (_, i) => i + 2), n).sort((a, b) => a - b);
  return days.map((dd) => `${mon} ${dd}`);
}

function reconcile1(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const { O, txs } = retry(
    () => ({ O: rng.int(20, 90) * 10, txs: makeTx(rng, 1, 4) }),
    (v) => runBalances(v.O, v.txs).every((b) => b >= 20),
  );
  const ds = dates(rng, txs.length);
  const W = total(txs.filter((t) => !t.dep).map((t) => t.amt));
  const Dp = total(txs.filter((t) => t.dep).map((t) => t.amt));
  const C = total([O, Dp, -W]);
  return {
    prompt: `${name} started the month with ${tag(O)} in a chequing account. The table shows the transactions for the month. What is the closing balance? ${CENT}`,
    figure: { type: 'table', headers: ['Date', 'Description', 'Withdrawal', 'Deposit'], rows: txs.map((t, i) => [ds[i], t.desc, t.dep ? '' : cell(t.amt), t.dep ? cell(t.amt) : '']) },
    parts: [moneyPart(C, 'Closing balance: \\$')],
    hints: ['Deposits add to the balance. Withdrawals subtract from it.', 'Closing balance = opening balance + total deposits − total withdrawals.'],
    solution: [
      `Total deposits: ${sumLine(txs.filter((t) => t.dep).map((t) => t.amt), Dp)}`,
      `Total withdrawals: ${sumLine(txs.filter((t) => !t.dep).map((t) => t.amt), W)}`,
      `Closing balance: $${mv(O)} + ${mv(Dp)} - ${mv(W)} = ${mv(C)}$`,
      `The closing balance is ${money(C)}.`,
    ],
  };
}

function reconcile2(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const fee = rng.pick([3.95, 4.95, 5.95, 6.5, 7.95]);
  const { O, txs } = retry(
    () => {
      const txs = makeTx(rng, 2, rng.int(5, 6));
      txs.push({ desc: 'Monthly account fee', amt: fee, dep: false });
      return { O: rng.int(30000, 180000) / 100, txs };
    },
    (v) => runBalances(v.O, v.txs).every((b) => b >= 20),
  );
  const ds = dates(rng, txs.length);
  const bals = runBalances(O, txs);
  if (rng.chance(0.5)) {
    const W = total(txs.filter((t) => !t.dep).map((t) => t.amt));
    const Dp = total(txs.filter((t) => t.dep).map((t) => t.amt));
    const C = bals[bals.length - 1];
    return {
      prompt: `The table shows ${poss(name)} chequing account for one month. The opening balance was ${money(O)}. What are the total deposits, the total withdrawals and the closing balance? ${CENT}`,
      figure: { type: 'table', headers: ['Date', 'Description', 'Withdrawal', 'Deposit'], rows: txs.map((t, i) => [ds[i], t.desc, t.dep ? '' : cell(t.amt), t.dep ? cell(t.amt) : '']) },
      parts: [moneyPart(Dp, 'Total deposits: \\$'), moneyPart(W, 'Total withdrawals: \\$'), moneyPart(C, 'Closing balance: \\$')],
      hints: ['The monthly account fee is a withdrawal too.', 'Closing balance = opening balance + total deposits − total withdrawals.'],
      solution: [
        `Total deposits: ${sumLine(txs.filter((t) => t.dep).map((t) => t.amt), Dp)}`,
        `Total withdrawals: ${sumLine(txs.filter((t) => !t.dep).map((t) => t.amt), W)}`,
        `Closing balance: $${m2(O)} + ${m2(Dp)} - ${m2(W)} = ${m2(C)}$`,
        `Deposits total ${money(Dp)}, withdrawals total ${money(W)}, and the closing balance is ${money(C)}.`,
      ],
    };
  }
  // Running balance with two blanks.
  const k = rng.int(1, txs.length - 3);
  const last = txs.length - 1;
  const rows = [
    ['', 'Opening balance', '', '', cell(O)],
    ...txs.map((t, i) => [ds[i], t.desc, t.dep ? '' : cell(t.amt), t.dep ? cell(t.amt) : '', i === k ? 'A' : i === last ? 'B' : cell(bals[i])]),
  ];
  return {
    prompt: `${name} keeps a running balance for a chequing account. Find the missing balances **A** and **B** in the table. ${CENT}`,
    figure: { type: 'table', headers: ['Date', 'Description', 'Withdrawal', 'Deposit', 'Balance'], rows },
    parts: [moneyPart(bals[k], 'A: \\$'), moneyPart(bals[last], 'B: \\$')],
    hints: ['Each new balance = the balance on the line above + a deposit, or − a withdrawal.', 'Work down the table one line at a time.'],
    solution: [
      `A: $${m2(bals[k - 1])} ${txs[k].dep ? '+' : '-'} ${m2(txs[k].amt)} = ${m2(bals[k])}$`,
      `B: $${m2(bals[last - 1])} - ${m2(txs[last].amt)} = ${m2(bals[last])}$`,
      `A is ${money(bals[k])} and B is ${money(bals[last])}.`,
    ],
  };
}

const PAYEES = ['Riverton Rentals', 'Prairie Auto Repair', 'Tri-City Plumbing', 'Southside Dental', 'Big Sky Driving School', 'Valley Feed Supply', 'Northern Lights Hockey Club', 'Harmony Music Lessons'];

function reconcile3(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const start = rng.int(101, 240);
  if (rng.chance(0.5)) {
    // Which cheques are outstanding?
    const o = retry(
      () => {
        const amts = Array.from({ length: 5 }, () => rng.int(2500, 90000) / 100);
        const subsets: number[][] = [];
        for (let i = 0; i < 5; i++) subsets.push([i]);
        for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) subsets.push([i, j]);
        const correct = rng.pick(subsets);
        const S = (s: number[]) => total(s.map((i) => amts[i]));
        const distract = rng.shuffle(subsets.filter((s) => s.join() !== correct.join() && Math.abs(S(s) - S(correct)) >= 1)).slice(0, 3);
        const all: number[][] = [];
        for (let mask = 1; mask < 32; mask++) all.push([0, 1, 2, 3, 4].filter((i) => mask & (1 << i)));
        const unique = all.every((s) => s.join() === correct.join() || Math.abs(S(s) - S(correct)) >= 0.005);
        return { amts, correct, distract, S, unique };
      },
      (v) => v.unique && v.distract.length === 3,
    );
    const nums = o.amts.map((_, i) => start + i);
    const label = (s: number[]) => (s.length === 1 ? `Cheque #${nums[s[0]]} only` : `Cheques #${nums[s[0]]} and #${nums[s[1]]}`);
    const out = o.S(o.correct);
    const R = rng.int(40000, 250000) / 100;
    const Sb = total([R, out]);
    const payees = rng.sample(PAYEES, 5);
    return {
      prompt: `${name} wrote the cheques in the table this month. ${poss(name)} own record (the cheque register) shows a balance of ${money(R)}, but the bank statement shows ${money(Sb)}. The only reason for the difference is that some cheques have not been cashed yet (they are outstanding). Which cheques are outstanding? What is their total? ${CENT}`,
      figure: { type: 'table', headers: ['Cheque', 'Paid to', 'Amount'], rows: o.amts.map((a, i) => [`#${nums[i]}`, payees[i], cell(a)]) },
      parts: [part(mc(rng, label(o.correct), o.distract.map(label)), { label: 'Outstanding:' }), moneyPart(out, 'Total outstanding: \\$')],
      hints: ['The register already subtracted every cheque. The bank has not subtracted the outstanding ones yet, so the statement is higher by their total.', 'Find the difference between the two balances, then look for the cheque or pair of cheques that adds up to it.'],
      solution: [
        `Difference: $${m2(Sb)} - ${m2(R)} = ${m2(out)}$`,
        o.correct.length === 1
          ? `Cheque #${nums[o.correct[0]]} is for ${money(out)}, which matches the difference.`
          : `Cheques #${nums[o.correct[0]]} and #${nums[o.correct[1]]}: $${m2(o.amts[o.correct[0]])} + ${m2(o.amts[o.correct[1]])} = ${m2(out)}$, which matches the difference.`,
        `The outstanding ${o.correct.length === 1 ? 'cheque is' : 'cheques are'} ${o.correct.map((i) => `#${nums[i]}`).join(' and ')}, totalling ${money(out)}.`,
      ],
    };
  }
  // Reconcile: adjust the statement and the register; they should agree.
  const nOut = rng.int(2, 3);
  const { outs, dit, Sb } = retry(
    () => ({ outs: Array.from({ length: nOut }, () => rng.int(2500, 60000) / 100), dit: rng.int(5000, 80000) / 100, Sb: rng.int(80000, 300000) / 100 }),
    (v) => total([v.Sb, v.dit, -total(v.outs)]) >= 200,
  );
  const outTot = total(outs);
  const adj = total([Sb, dit, -outTot]);
  const fee = rng.pick([4.95, 5.95, 6.95, 8.5]);
  const int = rng.int(3, 95) / 100;
  const R = total([adj, fee, -int]);
  const payees = rng.sample(PAYEES, nOut);
  const mon = rng.pick(MONTHS);
  return {
    prompt: `${name} is reconciling a chequing account for the end of ${mon}. The bank statement shows a closing balance of ${money(Sb)}. The cheques in the table have not cleared the bank yet, and a deposit of ${money(dit)} made on the last day of the month is not on the statement. ${poss(name)} register shows ${money(R)}, but ${name} has not yet recorded the ${money(fee)} monthly fee or the ${money(int)} interest the account earned, which are both on the statement. Find the total of the outstanding cheques, the adjusted statement balance, and the corrected register balance. ${CENT}`,
    figure: { type: 'table', headers: ['Cheque', 'Paid to', 'Amount'], rows: outs.map((a, i) => [`#${start + i}`, payees[i], cell(a)]) },
    parts: [moneyPart(outTot, 'Outstanding cheques: \\$'), moneyPart(adj, 'Adjusted statement balance: \\$'), moneyPart(adj, 'Corrected register balance: \\$')],
    hints: [
      'Adjusted statement balance = statement balance + deposits not shown − outstanding cheques.',
      'Corrected register balance = register balance − fees + interest. When the account is reconciled, the two adjusted balances match.',
    ],
    solution: [
      `Outstanding cheques: ${sumLine(outs, outTot)}`,
      `Adjusted statement balance: $${m2(Sb)} + ${m2(dit)} - ${m2(outTot)} = ${m2(adj)}$`,
      `Corrected register balance: $${m2(R)} - ${m2(fee)} + ${m2(int)} = ${m2(adj)}$`,
      `The outstanding cheques total ${money(outTot)}. Both balances come to ${money(adj)}, so the account is reconciled.`,
    ],
  };
}

const bankReconcile = skill({
  id: 'm203-bank-reconcile',
  name: 'Bank statements and reconciling',
  description: 'Find closing and running balances from a list of transactions, and reconcile a statement with a register using outstanding cheques, deposits, fees and interest.',
  outcomes: ['N4'],
  lessonId: 'm203-6-2',
  calculator: true,
  gen(rng, d) {
    return d === 1 ? reconcile1(rng) : d === 2 ? reconcile2(rng) : reconcile3(rng);
  },
});

export const BUDGET_SKILLS: SkillDef[] = [budget, budgetAdjust, bankFees, bankReconcile];
