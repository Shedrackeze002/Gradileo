/** Math 6 Unit 2 — Operations and Problem Solving (N2, N4). Standard algorithms with natural and decimal numbers, money and metric measurement. */
import { fixedChoice, mc, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type Out = GenOutput;

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Harpreet', 'Noor', 'Thanh', 'Kateri', 'Diego', 'Ngozi', 'Leah', 'Ravi',
];

/** Remove floating-point noise from an exact decimal result. */
const clean = (x: number) => roundTo(x, 9);
/** Decimal places needed to write v exactly (at most 4). */
function dpOf(v: number): number {
  for (let dp = 0; dp <= 4; dp++) if (Math.abs(roundTo(v, dp) - v) < 1e-9) return dp;
  return 4;
}
/** A number inside maths; 5 or more digits before the point are grouped with a thin space (12 345). */
function num(x: number, dp?: number): string {
  const s = dp === undefined ? fmt(x, 4) : fmtFixed(x, dp);
  const [i, f] = s.split('.');
  const g = i.length >= 5 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : i;
  return f === undefined ? g : `${g}.${f}`;
}
/** Money in prose, always with cents: \$12.50. Never put this inside $...$. */
const money = (x: number) => `\\$${fmtFixed(x, 2)}`;
/** A measurement as inline maths. */
const q = (x: number, u: string) => `$${num(x)}\\ \\text{${u}}$`;
/** A money answer that is exact to the cent: a one-cent slip is wrong. */
const cashPart = (v: number, label = '\\$'): Part => numPart(clean(v), { decimals: 2, tolerance: 0.004, label });
/** A money answer rounded to the nearest cent. */
const centPart = (v: number, label = '\\$'): Part => numPart(v, { decimals: 2, tolerance: 0.011, label });
/** An exact answer typed as a number (not a calculation); a decimal value must be written as a decimal, not a fraction. */
function exactPart(value: number, suffix?: string, label?: string): Part {
  const v = clean(value);
  return numPart(v, { suffix, label, exact: false, ...(dpOf(v) > 0 && { asDecimal: true }) });
}
const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);
/** True when a × b (b natural) ends in a non-zero digit, so the product keeps all its decimal places. */
const fullProduct = (a: number, b: number) => (Math.round(a * 10 ** dpOf(a)) * b) % 10 !== 0;

/** A column calculation (standard algorithm layout): the numbers are right-aligned with their decimal points lined up. */
function column(rows: number[], op: '+' | '-', dp: number): string {
  const r = op === '+' ? rows.reduce((s, x) => s + x, 0) : rows[0] - rows[1];
  const body = rows.map((x, i) => `${i === rows.length - 1 ? `${op === '+' ? '+' : '-'}\\ ` : ''}${num(x, dp)}`).join(' \\\\ ');
  return `$$\\begin{array}{r} ${body} \\\\ \\hline ${num(clean(r), dp)} \\end{array}$$`;
}
const ALIGN = 'Line up the decimal points. Write zeros so both numbers have the same number of decimal places.';

/** Steps for a × b with the standard algorithm (a natural or decimal, b a 2-digit natural number). */
function multiplySteps(a: number, b: number): { steps: string[]; product: number } {
  const dp = dpOf(a);
  const A = Math.round(a * 10 ** dp);
  const ones = b % 10;
  const tens = b - ones;
  const p1 = A * ones;
  const p2 = A * tens;
  const P = p1 + p2;
  const product = clean(P / 10 ** dp);
  const steps: string[] = [];
  if (dp > 0) steps.push(`Multiply as if there were no decimal point: $${A} \\times ${b}$.`);
  steps.push(`Multiply by the ones, then by the tens: $${A} \\times ${ones} = ${num(p1)}$ and $${A} \\times ${tens} = ${num(p2)}$.`);
  steps.push(`$$\\begin{array}{r} ${A} \\\\ \\times\\ ${b} \\\\ \\hline ${num(p1)} \\\\ +\\ ${num(p2)} \\\\ \\hline ${num(P)} \\end{array}$$`);
  if (dp > 0) {
    steps.push(`$${num(a)}$ has $${dp}$ decimal ${plural(dp, 'place', 'places')}, so the product has $${dp}$ decimal ${plural(dp, 'place', 'places')}: $${num(a)} \\times ${b} = ${num(product, dp)}$.`);
  } else steps.push(`$${num(a)} \\times ${b} = ${num(product)}$.`);
  return { steps, product };
}

/** A friendly estimate of a × b: a rounded to its leading place, b to the nearest ten. */
function estimateProduct(a: number, b: number): { ea: number; eb: number; e: number } {
  const ea = a >= 100 ? Math.round(a / 100) * 100 : a >= 10 ? Math.round(a / 10) * 10 : Math.max(1, Math.round(a));
  const eb = Math.round(b / 10) * 10;
  return { ea, eb, e: clean(ea * eb) };
}

/**
 * Long division (standard algorithm) narrated step by step. Zeros are written after the last digit
 * until the remainder is 0 or `maxDp` decimal places are reached.
 */
function longDivision(dividend: number, divisor: number, maxDp = 2): { steps: string[]; quotient: number; exact: boolean } {
  const s = fmt(dividend, 4);
  const [ip, fp = ''] = s.split('.');
  const digits = (ip + fp).split('').map(Number);
  const intLen = ip.length;
  const steps: string[] = [];
  if (fp) steps.push('Put the decimal point in the quotient right above the decimal point in the dividend.');
  let cur = 0;
  let qd = '';
  let started = false;
  let skipped: number | null = null;
  let wroteZero = false;
  let i = 0;
  for (; ; i++) {
    let appended = false;
    if (i >= digits.length) {
      if (cur === 0 || i - intLen >= maxDp) break;
      digits.push(0);
      appended = true;
    }
    const d = digits[i];
    cur = cur * 10 + d;
    const k = Math.floor(cur / divisor);
    const prod = k * divisor;
    const rem = cur - prod;
    qd += String(k);
    const goes = `$${divisor}$ goes into $${cur}$ $${k}$ ${plural(k, 'time', 'times')}: $${k} \\times ${divisor} = ${prod}$ and $${cur} - ${prod} = ${rem}$.`;
    if (!started) {
      if (k === 0) {
        skipped = cur;
        continue;
      }
      started = true;
      const pre = appended ? `Write a decimal point and a $0$ after $${ip}$. ` : '';
      steps.push(`${pre}${skipped !== null ? `$${divisor}$ does not go into $${skipped}$, so use $${cur}$. ` : ''}${goes}`);
    } else {
      let pre = `Bring down the $${d}$ to make $${cur}$.`;
      if (appended) {
        pre = wroteZero
          ? `Write another $0$ and bring it down to make $${cur}$.`
          : !fp
            ? `Write a decimal point and a $0$ after $${ip}$ (this does not change its value). Bring down the $0$ to make $${cur}$.`
            : `Write a $0$ at the end of the dividend (this does not change its value). Bring it down to make $${cur}$.`;
        wroteZero = true;
      }
      steps.push(k === 0 ? `${pre} $${divisor}$ does not go into $${cur}$, so write $0$ in the quotient.` : `${pre} ${goes}`);
    }
    cur = rem;
  }
  const qs = qd.length > intLen ? `${qd.slice(0, intLen)}.${qd.slice(intLen)}` : qd;
  const quotient = Number(qs);
  return { steps, quotient, exact: cur === 0 };
}

// ---------------------------------------------------------------------------
// 2.1 Addition and subtraction problems (N2)
// ---------------------------------------------------------------------------

const SUPPLIES = ['a binder', 'a pack of markers', 'a geometry set', 'a lunch bag', 'a calculator case', 'a sketchbook', 'a backpack', 'a water bottle', 'a set of pencil crayons', 'a pair of scissors'];
const SPORTS = ['a soccer ball', 'shin pads', 'a hockey stick', 'a pair of goggles', 'a skipping rope', 'a basketball', 'a baseball glove', 'a bike helmet', 'a pair of skates laces', 'a frisbee'];

/** A price in cents, a multiple of 5 between lo and hi dollars. */
const priceC = (rng: Rng, lo: number, hi: number) => 5 * rng.int(Math.round(lo * 20), Math.round(hi * 20));

type Ctx = (rng: Rng, name: string) => Out;

const ADD_D1: Ctx[] = [
  (rng, name) => {
    const [i1, i2] = rng.sample(rng.chance(0.5) ? SUPPLIES : SPORTS, 2);
    const a = priceC(rng, 1, 15) / 100;
    const b = priceC(rng, 1, 15) / 100;
    const t = clean(a + b);
    return {
      prompt: `${name} buys ${i1} for ${money(a)} and ${i2} for ${money(b)}. What is the total cost?`,
      parts: [cashPart(t)],
      hints: ['The total cost means add the two prices.', ALIGN],
      solution: ['Add the two prices with the standard algorithm. Line up the decimal points.', column([a, b], '+', 2), `The total cost is ${money(t)}.`],
    };
  },
  (rng, name) => {
    const p = priceC(rng, 2, 19) / 100;
    const bill = p < 9.5 ? 10 : 20;
    const ch = clean(bill - p);
    const item = rng.pick([...SUPPLIES, ...SPORTS]);
    return {
      prompt: `${name} buys ${item} for ${money(p)} and pays with a \\$${bill} bill. How much change should ${name} get?`,
      parts: [cashPart(ch)],
      hints: ['Change is the money paid minus the price.', `Write \\$${bill} as $${bill}.00$ and line up the decimal points.`],
      solution: [`Change = money paid − price. Write \\$${bill} as $${bill}.00$.`, column([bill, p], '-', 2), `${name} should get ${money(ch)} in change.`],
    };
  },
  (rng, name) => {
    const a = retry(() => rng.int(12, 89), (x) => x % 10 !== 0) / 10;
    const b = retry(() => rng.int(12, 89), (x) => x % 10 !== 0) / 10;
    const t = clean(a + b);
    const [d1, d2] = rng.pick([['Saturday', 'Sunday'], ['Monday', 'Tuesday'], ['the morning', 'the afternoon']]);
    const act = rng.pick(['bikes', 'runs', 'walks', 'cross-country skis']);
    return {
      prompt: `${name} ${act} ${q(a, 'km')} on ${d1} and ${q(b, 'km')} on ${d2}. How far does ${name} go in all?`,
      parts: [exactPart(t, 'km')],
      hints: ['"In all" means add.', ALIGN],
      solution: ['Add the two distances. Line up the decimal points.', column([a, b], '+', 1), `${name} goes ${q(t, 'km')} in all.`],
    };
  },
  (rng, name) => {
    const L = rng.int(30, 95) / 10;
    const u = retry(() => rng.int(5, Math.round(L * 10) - 5), (x) => x % 10 !== 0) / 10;
    const left = clean(L - u);
    const what = rng.pick(['ribbon', 'rope', 'yarn', 'string']);
    const why = rng.pick(['for a craft project', 'to wrap gifts', 'for a school play', 'to build a kite']);
    return {
      prompt: `A roll has ${q(L, 'm')} of ${what}. ${name} uses ${q(u, 'm')} ${why}. How much ${what} is left on the roll?`,
      parts: [exactPart(left, 'm')],
      hints: ['"How much is left" means subtract.', ALIGN],
      solution: ['Subtract the amount used from the amount on the roll.', column([L, u], '-', 1), `There is ${q(left, 'm')} of ${what} left.`],
    };
  },
  (rng, name) => {
    const other = rng.pick(NAMES.filter((n) => n !== name));
    const h1 = rng.int(140, 168);
    const h2 = rng.int(122, h1 - 4);
    return {
      prompt: `${name} is ${q(h1, 'cm')} tall. ${other} is ${q(h2, 'cm')} tall. How much taller is ${name} than ${other}?`,
      parts: [exactPart(h1 - h2, 'cm')],
      hints: ['"How much taller" means find the difference. Subtract.', `Subtract the smaller height from the greater height: $${h1} - ${h2}$.`],
      solution: ['Find the difference: subtract.', column([h1, h2], '-', 0), `${name} is ${q(h1 - h2, 'cm')} taller than ${other}.`],
    };
  },
];

const ADD_D2: Ctx[] = [
  (rng, name) => {
    const items = rng.sample(SPORTS, 3);
    const ps = items.map(() => priceC(rng, 4, 40) / 100);
    const t = clean(ps.reduce((s, x) => s + x, 0));
    return {
      prompt: `${name} buys ${items[0]} for ${money(ps[0])}, ${items[1]} for ${money(ps[1])} and ${items[2]} for ${money(ps[2])}. What is the total cost?`,
      parts: [cashPart(t)],
      hints: ['Add all three prices.', `${ALIGN} Add one column at a time, starting on the right, and regroup when a column adds to $10$ or more.`],
      solution: ['Add the three prices. Line up the decimal points.', column(ps, '+', 2), `The total cost is ${money(t)}.`],
    };
  },
  (rng, name) => {
    const L = rng.int(25, 60) / 10;
    const cut = retry(() => rng.int(105, Math.round(L * 100) - 30) / 100, (x) => Math.round(x * 100) % 10 !== 0);
    const left = clean(L - cut);
    const thing = rng.pick(['A board', 'A pipe', 'A wooden rail', 'A strip of trim']);
    return {
      prompt: `${thing} is ${q(L, 'm')} long. ${name} cuts off ${q(cut, 'm')}. How long is the piece that is left?`,
      parts: [exactPart(left, 'm')],
      hints: ['Subtract the piece that was cut off.', `${q(L, 'm')} has one decimal place and ${q(cut, 'm')} has two. Write $${fmtFixed(L, 2)}$ so they line up.`],
      solution: [`Write $${num(L)}$ as $${fmtFixed(L, 2)}$ so both numbers have two decimal places.`, column([L, cut], '-', 2), `The piece that is left is ${q(left, 'm')} long.`],
    };
  },
  (rng, name) => {
    const L = 50 * rng.int(30, 80);
    const run = retry(() => 5 * rng.int(100, Math.round(L / 5) - 60), (x) => x % 100 > L % 100 || x % 10 > L % 10);
    const left = L - run;
    const course = rng.pick(['cross-country course', 'fun run route', 'nature trail', 'bike path']);
    return {
      prompt: `The school ${course} is ${q(L, 'm')} long. ${name} has gone ${q(run, 'm')} so far. How far does ${name} have left to go?`,
      parts: [exactPart(left, 'm')],
      hints: ['Subtract the distance so far from the whole distance.', 'Line up the place values. Regroup (borrow) when the top digit is smaller than the bottom digit.'],
      solution: ['Subtract with the standard algorithm, regrouping where needed.', column([L, run], '-', 0), `${name} has ${q(left, 'm')} left to go.`],
    };
  },
  (rng, name) => {
    const has = priceC(rng, 25, 90) / 100;
    const spend = retry(() => priceC(rng, 6, has - 3) / 100, (x) => Math.round(x * 100) % 100 > Math.round(has * 100) % 100);
    const left = clean(has - spend);
    const what = rng.pick(['a gift for a friend', 'a new video game', 'tickets to a movie', 'a set of paints', 'a book series']);
    return {
      prompt: `${name} has ${money(has)} in a savings jar and spends ${money(spend)} on ${what}. How much money is left in the jar?`,
      parts: [cashPart(left)],
      hints: ['"How much is left" means subtract.', 'Line up the decimal points. Regroup when the top digit is smaller.'],
      solution: ['Subtract the amount spent from the savings.', column([has, spend], '-', 2), `${money(left)} is left in the jar.`],
    };
  },
  (rng, name) => {
    const a = retry(() => rng.int(205, 895) / 100, (x) => Math.round(x * 100) % 10 !== 0);
    const b = retry(() => rng.int(15, 85) / 10, (x) => Math.round(x * 10) % 10 !== 0);
    const t = clean(a + b);
    const what = rng.pick([
      { thing: 'two pumpkins', one: 'One pumpkin', two: 'the other', u: 'kg' },
      { thing: 'two bags of apples', one: 'One bag', two: 'the other', u: 'kg' },
      { thing: 'two jugs of juice', one: 'One jug holds', two: 'the other holds', u: 'L' },
      { thing: 'two watermelons', one: 'One watermelon', two: 'the other', u: 'kg' },
    ]);
    const verb = what.u === 'L' ? '' : ' has a mass of';
    return {
      prompt: `${name} has ${what.thing}. ${what.one}${verb} ${q(a, what.u)} and ${what.two}${verb} ${q(b, what.u)}. What is the total ${what.u === 'L' ? 'amount of juice' : 'mass'}?`,
      parts: [exactPart(t, what.u)],
      hints: ['A total means add.', `${q(b, what.u)} has one decimal place. Write it as $${fmtFixed(b, 2)}$ to line up the decimal points.`],
      solution: [`Write $${num(b)}$ as $${fmtFixed(b, 2)}$ and line up the decimal points.`, column([a, b], '+', 2), `The total is ${q(t, what.u)}.`],
    };
  },
];

const ADD_D3: Ctx[] = [
  (rng, name) => {
    const [i1, i2] = rng.sample([...SUPPLIES, ...SPORTS], 2);
    const a = priceC(rng, 4, 22) / 100;
    const b = priceC(rng, 4, 22) / 100;
    const t = clean(a + b);
    const bill = t < 48 ? 50 : 100;
    const ch = clean(bill - t);
    return {
      prompt: `${name} buys ${i1} for ${money(a)} and ${i2} for ${money(b)}. ${name} pays with a \\$${bill} bill. How much change should ${name} get?`,
      parts: [cashPart(ch)],
      hints: ['First add the two prices to find the total cost.', `Then subtract the total from \\$${bill}.00.`],
      solution: ['Step 1: Add to find the total cost.', column([a, b], '+', 2), `Step 2: Subtract the total from \\$${bill}.00.`, column([bill, t], '-', 2), `${name} should get ${money(ch)} in change.`],
    };
  },
  (rng, name) => {
    const cost = priceC(rng, 60, 150) / 100;
    const has = priceC(rng, 15, cost * 0.45) / 100;
    const earn = priceC(rng, 10, cost * 0.4) / 100;
    const sum = clean(has + earn);
    const need = clean(cost - sum);
    const item = rng.pick(['a new bike helmet', 'a skateboard', 'a pair of skates', 'a tent for camping', 'a keyboard for music lessons', 'a fishing rod and tackle box']);
    const job = rng.pick(['walking dogs', 'babysitting', 'raking leaves', 'selling lemonade', 'shovelling snow']);
    return {
      prompt: `${name} wants to buy ${item} that costs ${money(cost)}. ${name} has saved ${money(has)} and earns ${money(earn)} more by ${job}. How much more money does ${name} need?`,
      parts: [cashPart(need)],
      hints: ['First add what ' + name + ' has saved and earned.', 'Then subtract that from the cost.'],
      solution: ['Step 1: Add the money saved and earned.', column([has, earn], '+', 2), 'Step 2: Subtract from the cost.', column([cost, sum], '-', 2), `${name} needs ${money(need)} more.`],
    };
  },
  (rng, name) => {
    const L = rng.int(60, 99) / 10;
    const [p1, p2] = retry(
      () => [rng.int(55, 260) / 100, rng.int(55, 260) / 100],
      ([x, y]) => Math.round(x * 100) % 10 !== 0 && Math.round(y * 100) % 10 !== 0 && x + y <= L - 0.5,
    );
    const used = clean(p1 + p2);
    const left = clean(L - used);
    const what = rng.pick(['rope', 'ribbon', 'garden hose', 'fabric']);
    return {
      prompt: `${name} has ${q(L, 'm')} of ${what}. ${name} cuts off one piece that is ${q(p1, 'm')} long and another piece that is ${q(p2, 'm')} long. How much ${what} is left?`,
      parts: [exactPart(left, 'm')],
      hints: ['Find the total length cut off first.', `Then subtract it from ${q(L, 'm')}. Write $${num(L)}$ as $${fmtFixed(L, 2)}$.`],
      solution: ['Step 1: Add the two pieces.', column([p1, p2], '+', 2), `Step 2: Subtract from the whole length. Write $${num(L)}$ as $${fmtFixed(L, 2)}$.`, column([L, used], '-', 2), `There is ${q(left, 'm')} of ${what} left.`],
    };
  },
  (rng, name) => {
    const T = rng.int(150, 420) / 10;
    const a = retry(() => rng.int(35, Math.round(T * 4)), (x) => x % 10 !== 0) / 10;
    const b = retry(() => rng.int(25, Math.round(T * 10 - a * 10) - 15), (x) => x % 10 !== 0) / 10;
    const done = clean(a + b);
    const left = clean(T - done);
    const trail = rng.pick(['an old railway trail', 'a mountain trail', 'the river valley trail in Riverton', 'a trail around Willow Lake', 'the riverside pathway in Lakeside']);
    return {
      prompt: `${name}’s family is biking ${trail}, which is ${q(T, 'km')} long. They bike ${q(a, 'km')} on Saturday and ${q(b, 'km')} on Sunday. How much of the trail is left?`,
      parts: [exactPart(left, 'km')],
      hints: ['Add the distances for the two days first.', 'Then subtract that sum from the length of the trail.'],
      solution: ['Step 1: Add the two days.', column([a, b], '+', 1), 'Step 2: Subtract from the length of the trail.', column([T, done], '-', 1), `${q(left, 'km')} of the trail is left.`],
    };
  },
  (rng, name) => {
    const goal = 50 * rng.int(6, 16);
    const a = priceC(rng, goal * 0.3, goal * 0.45) / 100;
    const b = priceC(rng, goal * 0.2, goal * 0.4) / 100;
    const sum = clean(a + b);
    const need = clean(goal - sum);
    const [e1, e2] = rng.sample(['a bake sale', 'a car wash', 'a bottle drive', 'a used-book sale', 'a popcorn sale'], 2);
    return {
      prompt: `${name}’s class wants to raise \\$${goal} for a field trip. They raise ${money(a)} at ${e1} and ${money(b)} at ${e2}. How much more money do they need to reach their goal?`,
      parts: [cashPart(need)],
      hints: ['Add the two amounts raised.', `Then subtract the sum from \\$${goal}.00.`],
      solution: ['Step 1: Add the amounts raised.', column([a, b], '+', 2), `Step 2: Subtract from the goal, \\$${goal}.00.`, column([goal, sum], '-', 2), `They need ${money(need)} more.`],
    };
  },
];

const addSubtractProblems = skill({
  id: 'm6-add-subtract-problems',
  name: 'Addition and subtraction problems',
  description: 'Solve problems with money and metric measurement, using the standard algorithms for addition and subtraction.',
  outcomes: ['N2'],
  lessonId: 'm6-2-1',
  calculator: false,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    const list = d === 1 ? ADD_D1 : d === 2 ? ADD_D2 : ADD_D3;
    return rng.pick(list)(rng, name);
  },
});

// ---------------------------------------------------------------------------
// 2.2 Multiplying decimal and natural numbers (N4)
// ---------------------------------------------------------------------------

/** A 2-digit factor whose ones digit is not 0. */
const twoDigit = (rng: Rng, lo = 11, hi = 49) => retry(() => rng.int(lo, hi), (x) => x % 10 !== 0);

/** A first factor: kind 'n2' (2-digit natural), 'n3' (3-digit natural), 't' (tenths), 'h' (hundredths), 'th3' (3-digit with tenths). */
function factor(rng: Rng, kind: 'n2' | 'n3' | 't' | 'h' | 'th3'): number {
  switch (kind) {
    case 'n2':
      return twoDigit(rng, 12, 98);
    case 'n3':
      return retry(() => rng.int(102, 989), (x) => x % 10 !== 0);
    case 't':
      return retry(() => rng.int(11, 99), (x) => x % 10 !== 0) / 10;
    case 'h':
      return retry(() => rng.int(102, 989), (x) => x % 10 !== 0) / 100;
    case 'th3':
      return retry(() => rng.int(102, 989), (x) => x % 10 !== 0) / 10;
  }
}

function multiplyFree(rng: Rng, kind: 'n2' | 'n3' | 't' | 'h' | 'th3', bHi: number): Out {
  const { a, b } = retry(
    () => ({ a: factor(rng, kind), b: twoDigit(rng, 11, bHi) }),
    (o) => fullProduct(o.a, o.b),
  );
  const { steps, product } = multiplySteps(a, b);
  const est = estimateProduct(a, b);
  const dp = dpOf(a);
  return {
    prompt: `Use the standard algorithm to find the product. $$${num(a)} \\times ${b}$$`,
    parts: [exactPart(product)],
    hints: [
      dp > 0 ? 'Multiply as if there were no decimal point. Then count the decimal places in the decimal number.' : `Multiply by the ones digit of $${b}$, then by the tens. Add the two partial products.`,
      `Estimate first: $${num(est.ea)} \\times ${est.eb} = ${num(est.e)}$. Your answer should be close to this.`,
    ],
    solution: [...steps, `Check with an estimate: $${num(est.ea)} \\times ${est.eb} = ${num(est.e)}$. $${num(product)}$ is close to $${num(est.e)}$, so the answer is reasonable.`],
  };
}

function multiplyD3(rng: Rng): Out {
  const kind = rng.pick(['point', 'estimate', 'check'] as const);
  if (kind === 'point') {
    const { a, b } = retry(() => ({ a: factor(rng, rng.pick(['h', 'th3'] as const)), b: twoDigit(rng, 12, 49) }), (o) => fullProduct(o.a, o.b));
    const dp = dpOf(a);
    const A = Math.round(a * 10 ** dp);
    const P = A * b;
    const product = clean(P / 10 ** dp);
    const shift = (k: number) => num(clean(P / 10 ** k), k);
    const est = estimateProduct(a, b);
    return {
      prompt: `$${A} \\times ${b} = ${num(P)}$. Use this to find $${num(a)} \\times ${b}$. Do not multiply again.`,
      parts: [{ answer: mc(rng, `$${shift(dp)}$`, [0, 1, 2, 3].filter((k) => k !== dp).map((k) => `$${shift(k)}$`)) }],
      hints: [`How many decimal places does $${num(a)}$ have?`, `The product has the same number of decimal places. You can check with an estimate: $${num(est.ea)} \\times ${est.eb} = ${num(est.e)}$.`],
      solution: [
        `$${num(a)}$ is $${A}$ with the decimal point moved $${dp}$ ${plural(dp, 'place', 'places')} to the left.`,
        `So the product has $${dp}$ decimal ${plural(dp, 'place', 'places')}: $${num(a)} \\times ${b} = ${shift(dp)}$.`,
        `Check: $${num(est.ea)} \\times ${est.eb} = ${num(est.e)}$, and $${num(product)}$ is close to $${num(est.e)}$.`,
      ],
    };
  }
  if (kind === 'estimate') {
    const { a, b } = retry(() => ({ a: factor(rng, 'h'), b: twoDigit(rng, 12, 89) }), (o) => {
      const e = estimateProduct(o.a, o.b);
      return e.ea + e.eb !== e.e / 10 && e.ea >= 2;
    });
    const est = estimateProduct(a, b);
    return {
      prompt: `Which is the best estimate for $${num(a)} \\times ${b}$?`,
      parts: [{ answer: mc(rng, `$${num(est.e)}$`, [`$${num(est.e / 10)}$`, `$${num(est.e * 10)}$`, `$${num(est.ea + est.eb)}$`]) }],
      hints: ['Round each number to a friendly number.', `Round $${num(a)}$ to the nearest whole number and $${b}$ to the nearest ten. Then multiply.`],
      solution: [`$${num(a)}$ is about $${est.ea}$, and $${b}$ is about $${est.eb}$.`, `$${est.ea} \\times ${est.eb} = ${num(est.e)}$`, `The best estimate is $${num(est.e)}$. (The exact product is $${num(clean(a * b))}$.)`],
    };
  }
  const name = rng.pick(NAMES);
  const { a, b } = retry(() => ({ a: factor(rng, rng.pick(['h', 'th3', 't'] as const)), b: twoDigit(rng, 12, 89) }), (o) => fullProduct(o.a, o.b));
  const product = clean(a * b);
  const est = estimateProduct(a, b);
  const claim = rng.pick([0, 1, -1] as const);
  const claimed = clean(product * 10 ** claim);
  const idx = claim === 0 ? 0 : claim < 0 ? 1 : 2;
  return {
    prompt: `${name} used the standard algorithm and says $${num(a)} \\times ${b} = ${num(claimed)}$. Use an estimate to decide whether this answer is reasonable.`,
    parts: [
      {
        answer: fixedChoice(
          [
            `Reasonable: the estimate is $${num(est.e)}$, and the answer is close to it.`,
            `Not reasonable: the estimate is $${num(est.e)}$, so the answer is much too small.`,
            `Not reasonable: the estimate is $${num(est.e)}$, so the answer is much too large.`,
          ],
          idx,
        ),
      },
    ],
    hints: ['Round each number to a friendly number and multiply.', `$${num(a)}$ is about $${num(est.ea)}$ and $${b}$ is about $${est.eb}$.`],
    solution: [
      `Estimate: $${num(est.ea)} \\times ${est.eb} = ${num(est.e)}$.`,
      claim === 0
        ? `$${num(claimed)}$ is close to $${num(est.e)}$, so the answer is reasonable.`
        : `$${num(claimed)}$ is about ${claim < 0 ? 'ten times smaller' : 'ten times larger'} than $${num(est.e)}$. The decimal point is in the wrong place. The answer is not reasonable.`,
      `The exact product is $${num(product)}$.`,
    ],
  };
}

const decimalMultiply = skill({
  id: 'm6-decimal-multiply',
  name: 'Multiplying decimal and natural numbers',
  description: 'Multiply up to 3-digit natural or decimal numbers by 2-digit natural numbers with the standard algorithm, and check the product with an estimate.',
  outcomes: ['N4'],
  lessonId: 'm6-2-2',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return multiplyFree(rng, rng.pick(['n2', 't'] as const), 29);
    if (d === 2) return multiplyFree(rng, rng.pick(['n3', 'h', 'th3'] as const), 49);
    return multiplyD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 2.3 Dividing decimal and natural numbers (N4)
// ---------------------------------------------------------------------------

const DIV_HINT = 'Use long division: divide, multiply, subtract, then bring down the next digit.';

function divideFree(rng: Rng, d: 1 | 2): Out {
  const kind = d === 1 ? rng.pick(['whole', 'tenths'] as const) : rng.pick(['hundredths', 'tenths3', 'remainder', 'remainder'] as const);
  if (kind === 'remainder') {
    const { n, m } = retry(
      () => ({ n: rng.int(101, 999), m: rng.pick([12, 15, 16, 20, 24, 25, 32, 40, 48, 50, 75, 80]) }),
      (o) => o.n % o.m !== 0 && (o.n * 100) % o.m === 0 && o.n > o.m * 3,
    );
    const { steps, quotient } = longDivision(n, m, 2);
    const whole = Math.floor(n / m);
    const r = n - whole * m;
    return {
      prompt: `Find $${n} \\div ${m}$. Write the quotient as a decimal number, not with a remainder.`,
      parts: [exactPart(quotient)],
      hints: [DIV_HINT, `When you run out of digits, you get a remainder of $${r}$. Write a decimal point and a $0$ after $${n}$ and keep dividing.`],
      solution: [...steps, `$${n} \\div ${m} = ${num(quotient)}$ (the remainder $${r}$ became the decimal part).`],
    };
  }
  const plan = {
    whole: { lo: 12, hi: 45, scale: 1, mlo: 11, mhi: 25, max: 999 },
    tenths: { lo: 11, hi: 79, scale: 10, mlo: 11, mhi: 19, max: 999 },
    tenths3: { lo: 11, hi: 79, scale: 10, mlo: 12, mhi: 39, max: 999 },
    hundredths: { lo: 11, hi: 89, scale: 100, mlo: 11, mhi: 29, max: 999 },
  }[kind];
  const { qi, m } = retry(
    () => ({ qi: rng.int(plan.lo, plan.hi), m: rng.int(plan.mlo, plan.mhi) }),
    (o) => o.qi * o.m <= plan.max && o.qi * o.m >= 100 && o.qi % 10 !== 0 && o.m % 10 !== 0 && (o.qi * o.m) % 10 !== 0,
  );
  const quotient = qi / plan.scale;
  const dividend = clean((qi * m) / plan.scale);
  const { steps } = longDivision(dividend, m, 2);
  const est = Math.round(m / 10) * 10;
  return {
    prompt: `Use the standard algorithm (long division) to find the quotient. $$${num(dividend)} \\div ${m}$$`,
    parts: [exactPart(quotient)],
    hints: [DIV_HINT, plan.scale > 1 ? 'Put the decimal point in the quotient right above the decimal point in the dividend.' : `Start with the first two digits. How many times does $${m}$ go into $${Math.floor(dividend / 10)}$?`],
    solution: [...steps, `$${num(dividend)} \\div ${m} = ${num(quotient)}$`, `Check: $${num(quotient)} \\times ${m} = ${num(dividend)}$. Or estimate: $${num(dividend)} \\div ${est}$ is about $${num(roundTo(dividend / est, plan.scale === 1 ? 0 : 1))}$.`],
  };
}

function divideD3(rng: Rng): Out {
  const kind = rng.pick(['fromRemainder', 'check', 'round'] as const);
  const name = rng.pick(NAMES);
  if (kind === 'fromRemainder') {
    const { n, m } = retry(
      () => ({ n: rng.int(101, 999), m: rng.pick([20, 25, 40, 50, 16, 80]) }),
      (o) => o.n % o.m !== 0 && (o.n * 100) % o.m === 0 && o.n > o.m * 3,
    );
    const whole = Math.floor(n / m);
    const r = n - whole * m;
    const quotient = clean(n / m);
    const hundred = 100 % m === 0;
    return {
      prompt: `${name} divided $${n}$ by $${m}$ and got $${whole}$ R $${r}$ (a remainder of $${r}$). Write the quotient as a decimal number.`,
      parts: [exactPart(quotient)],
      hints: [`The remainder $${r}$ is part of one more group of $${m}$. As a fraction, that is $\\dfrac{${r}}{${m}}$.`, hundred ? `Write $\\dfrac{${r}}{${m}}$ with a denominator of $100$.` : `Divide $${r}$ by $${m}$: write $${r}$ as $${r}.000$ and keep dividing.`],
      solution: [
        `The remainder $${r}$ out of $${m}$ is the fraction $\\dfrac{${r}}{${m}}$ of one more group.`,
        hundred
          ? `$\\dfrac{${r}}{${m}} = \\dfrac{${(r * 100) / m}}{100} = ${num(clean(r / m))}$`
          : `$${r} \\div ${m} = ${num(clean(r / m))}$ (write zeros after $${r}$ and keep dividing).`,
        `So $${n} \\div ${m} = ${whole} + ${num(clean(r / m))} = ${num(quotient)}$.`,
      ],
    };
  }
  if (kind === 'check') {
    const { qi, m } = retry(() => ({ qi: rng.int(21, 89), m: twoDigit(rng, 12, 48) }), (o) => qiOk(o.qi, o.m));
    const quotient = qi / 10;
    const dividend = clean((qi * m) / 10);
    const em = Math.round(m / 10) * 10;
    const en = Math.max(em, Math.round(dividend / em) * em);
    const e = en / em;
    const claim = rng.pick([0, 1, -1] as const);
    const claimed = clean(quotient * 10 ** claim);
    const idx = claim === 0 ? 0 : claim < 0 ? 1 : 2;
    return {
      prompt: `${name} says $${num(dividend)} \\div ${m} = ${num(claimed)}$. Use an estimate to decide whether this answer is reasonable.`,
      parts: [
        {
          answer: fixedChoice(
            [
              `Reasonable: the estimate is about $${e}$, and the answer is close to it.`,
              `Not reasonable: the estimate is about $${e}$, so the answer is much too small.`,
              `Not reasonable: the estimate is about $${e}$, so the answer is much too large.`,
            ],
            idx,
          ),
        },
      ],
      hints: ['Use friendly numbers that divide easily.', `$${m}$ is about $${em}$. Which multiple of $${em}$ is close to $${num(dividend)}$?`],
      solution: [
        `$${m}$ is about $${em}$, and $${num(dividend)}$ is about $${en}$.`,
        `$${en} \\div ${em} = ${e}$, so the quotient should be about $${e}$.`,
        claim === 0 ? `$${num(claimed)}$ is close to $${e}$. The answer is reasonable.` : `$${num(claimed)}$ is about ${claim < 0 ? 'ten times smaller' : 'ten times larger'} than it should be. The decimal point is in the wrong place, so the answer is not reasonable.`,
        `The exact quotient is $${num(quotient)}$.`,
      ],
    };
  }
  const { n, m } = retry(
    () => ({ n: rng.int(101, 999), m: twoDigit(rng, 12, 48) }),
    (o) => {
      const v = o.n / o.m;
      const h = Math.floor(v * 100) % 10;
      return o.n % o.m !== 0 && v >= 3 && h !== 0 && Math.abs(v * 10 - Math.floor(v * 10) - 0.5) > 0.06;
    },
  );
  const { steps, quotient: q2 } = longDivision(n, m, 2);
  const value = n / m;
  const r1 = roundTo(value, 1);
  const hd = Math.floor(value * 100) % 10;
  return {
    prompt: `Find $${n} \\div ${m}$. Round the quotient to the nearest tenth.`,
    parts: [numPart(value, { decimals: 1 })],
    hints: [DIV_HINT, 'Divide until you have a digit in the hundredths place. Then look at that digit to round to the tenths.'],
    solution: [
      ...steps,
      `So far, $${n} \\div ${m} = ${num(q2, 2)}\\ldots$`,
      `The hundredths digit is $${hd}$. ${hd >= 5 ? 'It is $5$ or more, so round the tenths digit up.' : 'It is less than $5$, so keep the tenths digit.'}`,
      `$${n} \\div ${m} \\approx ${fmtFixed(r1, 1)}$`,
    ],
  };
}

/** A quotient with one decimal place whose dividend has three digits. */
function qiOk(qi: number, m: number): boolean {
  const n = qi * m;
  return qi % 10 !== 0 && n >= 100 && n <= 999 && n % 10 !== 0;
}

const decimalDivide = skill({
  id: 'm6-decimal-divide',
  name: 'Dividing decimal and natural numbers',
  description: 'Divide up to 3-digit natural or decimal numbers by 2-digit natural numbers with the standard algorithm, and write a quotient with a remainder as a decimal.',
  outcomes: ['N4'],
  lessonId: 'm6-2-3',
  calculator: false,
  gen(rng, d) {
    return d === 3 ? divideD3(rng) : divideFree(rng, d);
  },
});

// ---------------------------------------------------------------------------
// 2.4 Multiplication and division problems (N4)
// ---------------------------------------------------------------------------

const BUY = [
  { thing: 'pack of markers', things: 'packs of markers', why: 'for an art project', lo: 2, hi: 6 },
  { thing: 'ticket to the science centre', things: 'tickets to the science centre', why: 'for a field trip', lo: 6, hi: 9.9 },
  { thing: 'bag of popcorn', things: 'bags of popcorn', why: 'for a movie afternoon', lo: 1, hi: 3.5 },
  { thing: 'pizza', things: 'pizzas', why: 'for a class party', lo: 7, hi: 9.9 },
  { thing: 'jar of paint', things: 'jars of paint', why: 'for a mural', lo: 2, hi: 5 },
  { thing: 'bus ticket', things: 'bus tickets', why: 'for a trip to the library', lo: 2, hi: 4 },
  { thing: 'notebook', things: 'notebooks', why: 'for science journals', lo: 1, hi: 3 },
  { thing: 'pair of hockey socks', things: 'pairs of hockey socks', why: 'for the school team', lo: 4, hi: 9 },
];

/** A price in cents (multiple of 5, a 3-digit decimal under \$10) whose product with n has no stray cents. */
const unitPrice = (rng: Rng, lo: number, hi: number) => 5 * rng.int(Math.max(21, Math.round(lo * 20)), Math.round(hi * 20));

function problemD1(rng: Rng, name: string): Out {
  const kind = rng.pick(['total', 'length', 'share'] as const);
  if (kind === 'total') {
    const it = rng.pick(BUY);
    const n = rng.int(12, 30);
    const p = unitPrice(rng, it.lo, it.hi) / 100;
    const { steps, product } = multiplySteps(p, n);
    return {
      prompt: `${name}’s class buys $${n}$ ${it.things} ${it.why}. Each ${it.thing} costs ${money(p)}. What is the total cost?`,
      parts: [cashPart(product)],
      hints: ['When you buy many items at the same price, multiply.', `Find $${num(p)} \\times ${n}$.`],
      solution: [`Total cost = price × number of items = $${fmtFixed(p, 2)} \\times ${n}$.`, ...steps, `The total cost is ${money(product)}.`],
    };
  }
  if (kind === 'length') {
    const c = rng.pick([
      { what: 'board', u: 'm', lo: 11, hi: 49, verb: 'lays', each: 'Each board is', ask: 'What is the total length of the boards' },
      { what: 'lap of the track', u: 'km', lo: 2, hi: 8, verb: 'runs', each: 'One lap is', ask: 'How far does ' + name + ' run' },
      { what: 'piece of ribbon', u: 'm', lo: 3, hi: 9, verb: 'cuts', each: 'Each piece is', ask: 'What is the total length of ribbon' },
    ]);
    const n = twoDigit(rng, 11, 25);
    const len = retry(() => rng.int(c.lo, c.hi) / 10, (x) => Math.round(x * 10) % 10 !== 0 && Math.round(x * 10 * n) % 10 !== 0);
    const { steps, product } = multiplySteps(len, n);
    const things = c.what === 'lap of the track' ? 'laps of the track' : c.what === 'board' ? 'boards end to end' : 'pieces of ribbon';
    return {
      prompt: `${name} ${c.verb} $${n}$ ${things}. ${c.each} ${q(len, c.u)} long. ${c.ask}?`,
      parts: [exactPart(product, c.u)],
      hints: ['Equal lengths, many times: multiply.', `Find $${num(len)} \\times ${n}$.`],
      solution: [`Multiply: $${num(len)} \\times ${n}$.`, ...steps, `The answer is ${q(product, c.u)}.`],
    };
  }
  const { pc, n } = retry(() => ({ pc: unitPrice(rng, 1.2, 8), n: twoDigit(rng, 12, 25) }), (o) => (o.pc * o.n) % 10 === 0 && o.pc * o.n <= 99990 && o.pc * o.n >= 1000);
  const total = (pc * n) / 100;
  const each = pc / 100;
  const { steps } = longDivision(total, n, 2);
  const what = rng.pick(['a pizza lunch', 'a class gift', 'craft supplies', 'a team snack order', 'bus tickets']);
  return {
    prompt: `A group of $${n}$ students shares the cost of ${what} equally. The total cost is ${money(total)}. How much does each student pay?`,
    parts: [cashPart(each)],
    hints: ['Sharing equally means divide.', `Find $${num(total)} \\div ${n}$ with long division.`],
    solution: [`Divide the total by the number of students: $${num(total)} \\div ${n}$.`, ...steps, `Each student pays ${money(each)}.`],
  };
}

function problemD2(rng: Rng, name: string): Out {
  const kind = rng.pick(['unit', 'pieces', 'earn'] as const);
  if (kind === 'unit') {
    const c = rng.pick([
      { pack: 'juice boxes', one: 'juice box' },
      { pack: 'granola bars', one: 'granola bar' },
      { pack: 'pencils', one: 'pencil' },
      { pack: 'yogurt cups', one: 'yogurt cup' },
      { pack: 'tennis balls', one: 'tennis ball' },
    ]);
    const { pc, n } = retry(() => ({ pc: rng.int(21, 95), n: rng.pick([12, 15, 16, 18, 20, 24]) }), (o) => o.pc * o.n <= 999 && o.pc * o.n >= 100 && (o.pc * o.n) % 10 !== 0);
    const total = (pc * n) / 100;
    const { steps } = longDivision(total, n, 2);
    return {
      prompt: `A pack of $${n}$ ${c.pack} costs ${money(total)}. What is the price of one ${c.one}?`,
      parts: [cashPart(pc / 100)],
      hints: ['The price of one item is the total price divided by the number of items.', `Find $${num(total)} \\div ${n}$.`],
      solution: [`Divide: $${num(total)} \\div ${n}$.`, ...steps, `One ${c.one} costs ${money(pc / 100)}.`],
    };
  }
  if (kind === 'pieces') {
    const { qi, n } = retry(() => ({ qi: rng.int(21, 95), n: twoDigit(rng, 12, 24) }), (o) => o.qi % 10 !== 0 && o.qi * o.n <= 999 && o.qi * o.n >= 100 && (o.qi * o.n) % 10 !== 0);
    const total = (qi * n) / 100;
    const what = rng.pick(['rope', 'ribbon', 'pipe', 'lumber']);
    const { steps } = longDivision(total, n, 2);
    return {
      prompt: `${name} has a piece of ${what} that is ${q(total, 'm')} long. ${name} cuts it into $${n}$ equal pieces. How long is each piece?`,
      parts: [exactPart(qi / 100, 'm')],
      hints: ['Cutting into equal pieces means divide.', `Find $${num(total)} \\div ${n}$.`],
      solution: [`Divide: $${num(total)} \\div ${n}$.`, ...steps, `Each piece is ${q(qi / 100, 'm')} long.`],
    };
  }
  const c = rng.pick([
    { text: (p: string, n: number) => `${name} earns ${p} each hour for babysitting. Last month, ${name} babysat for $${n}$ hours. How much did ${name} earn?`, lo: 8, hi: 15 },
    { text: (p: string, n: number) => `A school orders $${n}$ copies of a novel for a book club. Each copy costs ${p}. What is the total cost?`, lo: 6, hi: 14 },
    { text: (p: string, n: number) => `A team pays ${p} per player for a skating party. There are $${n}$ players. What is the total cost?`, lo: 5, hi: 12 },
  ]);
  const n = twoDigit(rng, 12, 35);
  // A 3-digit price such as \$12.50 or \$8.75.
  const p = retry(() => (c.lo >= 10 || rng.chance(0.5) ? rng.int(c.lo * 2, c.hi * 2) / 2 : rng.int(c.lo * 4, Math.min(c.hi, 9.75) * 4) / 4), (x) => x % 1 !== 0 && (x < 10 || (x * 10) % 1 === 0));
  const { steps, product } = multiplySteps(p, n);
  return {
    prompt: c.text(money(p), n),
    parts: [cashPart(product)],
    hints: ['The same amount many times: multiply.', `Find $${num(p)} \\times ${n}$.`],
    solution: [...steps, `The total is ${money(product)}.`],
  };
}

function problemD3(rng: Rng, name: string): Out {
  const kind = rng.pick(['change', 'split', 'better', 'boxes'] as const);
  if (kind === 'change') {
    const it = rng.pick(BUY.filter((b) => b.hi <= 6));
    const { pc, n } = retry(() => ({ pc: unitPrice(rng, it.lo, it.hi), n: twoDigit(rng, 12, 24) }), (o) => o.pc * o.n < 9900 && o.pc * o.n > 1500);
    const p = pc / 100;
    const total = (pc * n) / 100;
    const bill = total < 49 ? 50 : 100;
    const change = clean(bill - total);
    const { steps } = multiplySteps(p, n);
    return {
      prompt: `${name} buys $${n}$ ${it.things} ${it.why}. Each ${it.thing} costs ${money(p)}. ${name} pays with a \\$${bill} bill. How much change should ${name} get?`,
      parts: [cashPart(change)],
      hints: ['First multiply to find the total cost.', `Then subtract the total cost from \\$${bill}.00.`],
      solution: [`Step 1: Total cost = $${fmtFixed(p, 2)} \\times ${n}$.`, ...steps, `Step 2: Change = \\$${bill}.00 − ${money(total)}.`, column([bill, total], '-', 2), `${name} should get ${money(change)} in change.`],
    };
  }
  if (kind === 'split') {
    const { t, n } = retry(
      () => ({ t: rng.int(300, 999), n: twoDigit(rng, 12, 24) }),
      (o) => {
        const v = o.t / 10 / o.n;
        const f = v * 100 - Math.floor(v * 100);
        return o.t % 10 !== 0 && (o.t * 10) % o.n !== 0 && Math.abs(f - 0.5) > 0.06;
      },
    );
    const total = t / 10;
    const value = total / n;
    const { steps, quotient } = longDivision(total, n, 3);
    const what = rng.pick(['a pizza lunch', 'a birthday gift for their teacher', 'a bowling party', 'snacks for a road trip']);
    return {
      prompt: `A group of $${n}$ friends shares the cost of ${what} equally. The total is ${money(total)}. How much does each friend pay, to the nearest cent?`,
      parts: [centPart(value)],
      hints: ['Sharing equally means divide.', 'Divide to the thousandths place, then round to the nearest hundredth (the nearest cent).'],
      solution: [`Divide: $${num(total)} \\div ${n}$.`, ...steps, `So far, the quotient is $${num(quotient, 3)}\\ldots$ Round to the nearest hundredth.`, `Each friend pays about ${money(roundTo(value, 2))}.`],
    };
  }
  if (kind === 'better') {
    const c = rng.pick([
      { item: 'granola bars', one: 'bar' },
      { item: 'juice boxes', one: 'juice box' },
      { item: 'muffins', one: 'muffin' },
      { item: 'pencils', one: 'pencil' },
    ]);
    const { n1, n2, c1, c2 } = retry(
      () => ({ n1: rng.pick([12, 15, 16, 18, 20]), n2: rng.pick([12, 15, 16, 18, 20, 24]), c1: rng.int(25, 70), c2: rng.int(25, 70) }),
      (o) => o.n1 !== o.n2 && Math.abs(o.c1 - o.c2) >= 2 && o.c1 * o.n1 <= 999 && o.c2 * o.n2 <= 999 && (o.c1 * o.n1 > o.c2 * o.n2) !== (o.c1 > o.c2),
    );
    const t1 = (c1 * n1) / 100;
    const t2 = (c2 * n2) / 100;
    const best = c1 < c2 ? 0 : 1;
    const d1 = longDivision(t1, n1, 2);
    const d2 = longDivision(t2, n2, 2);
    return {
      prompt: `Pack A has $${n1}$ ${c.item} for ${money(t1)}. Pack B has $${n2}$ ${c.item} for ${money(t2)}. Find the price of one ${c.one} in each pack. Which pack is the better buy? What is the lower price for one ${c.one}?`,
      parts: [{ label: 'Better buy', answer: fixedChoice(['Pack A', 'Pack B'], best) }, cashPart(Math.min(c1, c2) / 100, `Lower price for one ${c.one}: \\$`)],
      hints: ['Divide each price by the number of items to get the price of one item.', 'The better buy has the lower price for one item. The bigger pack is not always the better buy.'],
      solution: [
        `Pack A: $${num(t1)} \\div ${n1} = ${num(c1 / 100, 2)}$. ${d1.steps.length > 3 ? '' : d1.steps.join(' ')}`.trim(),
        `Pack B: $${num(t2)} \\div ${n2} = ${num(c2 / 100, 2)}$. ${d2.steps.length > 3 ? '' : d2.steps.join(' ')}`.trim(),
        `${money(Math.min(c1, c2) / 100)} is less than ${money(Math.max(c1, c2) / 100)}, so Pack ${best === 0 ? 'A' : 'B'} is the better buy.`,
      ],
    };
  }
  const { n, m } = retry(() => ({ n: rng.int(120, 900), m: rng.pick([12, 15, 16, 18, 20, 24, 25, 30, 36, 48]) }), (o) => o.n % o.m !== 0 && o.n / o.m >= 4 && o.n / o.m <= 60);
  const whole = Math.floor(n / m);
  const r = n - whole * m;
  const up = rng.chance(0.6);
  const c = rng.pick([
    { item: 'cans of food', box: 'box', boxes: 'boxes', holds: 'holds', why: 'for the food bank' },
    { item: 'students', box: 'bus', boxes: 'buses', holds: 'seats', why: 'for a field trip to a dinosaur museum' },
    { item: 'eggs', box: 'carton', boxes: 'cartons', holds: 'holds', why: 'from the school farm' },
    { item: 'cookies', box: 'tray', boxes: 'trays', holds: 'holds', why: 'for a bake sale' },
  ]);
  const people = c.item === 'students';
  const ask = up
    ? `How many ${c.boxes} are needed for all $${n}$ ${c.item}?`
    : people
      ? `How many ${c.boxes} can be filled completely?`
      : `How many ${c.boxes} can be filled completely?`;
  const ans = up ? whole + 1 : whole;
  return {
    prompt: `Each ${c.box} ${c.holds} $${m}$ ${c.item}. There are $${n}$ ${c.item} ${c.why}. ${ask}`,
    parts: [exactPart(ans, c.boxes)],
    hints: [`Divide: $${n} \\div ${m}$. Find the quotient and the remainder.`, up ? 'The leftover ones still need a place to go.' : `A ${c.box} with a remainder is not full.`],
    solution: [
      `$${n} \\div ${m} = ${whole}$ R $${r}$, because $${whole} \\times ${m} = ${whole * m}$ and $${n} - ${whole * m} = ${r}$.`,
      up
        ? `$${whole}$ ${c.boxes} hold $${whole * m}$ ${c.item}. The other $${r}$ ${c.item} need one more ${c.box}.`
        : `$${whole}$ ${c.boxes} are full. The last $${r}$ ${c.item} do not fill a whole ${c.box}.`,
      up ? `$${whole} + 1 = ${ans}$ ${c.boxes} are needed.` : `$${ans}$ ${c.boxes} can be filled completely.`,
    ],
  };
}

const decimalProblems = skill({
  id: 'm6-decimal-problems',
  name: 'Multiplication and division problems',
  description: 'Solve problems, including money problems, by multiplying and dividing decimal and natural numbers.',
  outcomes: ['N4'],
  lessonId: 'm6-2-4',
  calculator: false,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    return d === 1 ? problemD1(rng, name) : d === 2 ? problemD2(rng, name) : problemD3(rng, name);
  },
});

export const OPERATIONS_SKILLS: SkillDef[] = [addSubtractProblems, decimalMultiply, decimalDivide, decimalProblems];
