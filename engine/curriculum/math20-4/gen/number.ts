/** Math 20-4 Unit 1 — Number Skills (N1): integers, fractions and mixed numbers, ratios and rates, and percent problems. */
import { mc, numPart, retry, roundingPhrase, skill, type GenOutput } from '../../helpers.ts';
import { fmtFixed, fmtGroupTex, frac, gcd, lcm, roundTo, type Frac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Ananya', 'Nathan', 'Lena', 'Diego', 'Harpreet', 'Noor', 'Jasleen', 'Bao',
];
const CITIES = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Clearwater', 'Ashford', 'Pinewood'];

const num = (x: number, dp = 4) => fmtGroupTex(x, dp);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** "a" or "an" before a number read aloud (an 8-hour shift, an \$85 bill, an 11 km ride). */
const art = (x: number) => (/^(8|11|18)(\D|$)|^8/.test(String(x)) ? 'an' : 'a');
const isWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
function group(s: string): string {
  const [i, f] = s.split('.');
  const g = i.length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : i;
  return f === undefined ? g : `${g}.${f}`;
}
/** Money in prose, always with cents: \$12.50. Never put this inside $...$. */
const money = (x: number) => `\\$${group(fmtFixed(x, 2))}`;
/** A price tag: whole dollars print without cents (\$60), otherwise \$59.99. */
const tag = (x: number) => (isWhole(x) ? `\\$${group(String(Math.round(x)))}` : money(x));
/** A money amount inside maths, without a dollar sign. */
const mv = (x: number) => (isWhole(x) ? num(Math.round(x)) : group(fmtFixed(x, 2)).replace(/,/g, '{,}'));
const CENT = 'to the nearest cent';
const moneyPart = (v: number, suffix?: string): Part => numPart(v, { decimals: 2, tolerance: 0.011, label: '\\$', suffix });
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
/** An exact non-money answer; decimals get a matching `decimals` so review shows a decimal, not a fraction. */
function exactPart(v: number, suffix?: string, label?: string): Part {
  const dp = exactDp(v);
  return dp > 0 ? numPart(v, { decimals: dp, suffix, label }) : numPart(v, { suffix, label });
}
/** A money answer: say "to the nearest cent" only when the exact value has more than two decimals. */
const centNote = (v: number) => (isWhole(v * 100) ? '' : `, ${CENT}`);
/** "about " when a money value had to be rounded to the cent. */
const abt = (v: number) => (isWhole(v * 100) ? '' : 'about ');

// ---------------------------------------------------------------------------
// 1.1 Integers and the order of operations
// ---------------------------------------------------------------------------

/** Wrap a negative number in brackets when it follows an operation sign. */
const p = (n: number) => (n < 0 ? `(${n})` : `${n}`);
const degC = (t: number) => `${t}^\\circ\\text{C}`;
const SIGNS = 'When you multiply or divide two numbers, the same signs give a positive answer and different signs give a negative answer.';
const signLine = (a: number, b: number) =>
  (a < 0) === (b < 0) ? 'The signs are the same, so the answer is positive.' : 'The signs are different, so the answer is negative.';
const ORDER = 'Order of operations: brackets first, then multiply and divide from left to right, then add and subtract from left to right.';

function intBare(rng: Rng): GenOutput {
  const op = rng.pick(['add', 'sub', 'mul', 'div'] as const);
  if (op === 'add' || op === 'sub') {
    const [a, b] = retry(() => [rng.nonZero(-15, 15), rng.nonZero(-15, 15)] as const, ([x, y]) => x < 0 || y < 0);
    if (op === 'add') {
      const ans = a + b;
      const expr = `${a} + ${p(b)}`;
      return {
        prompt: `Calculate: $${expr}$`,
        parts: [numPart(ans)],
        hints: [
          'Picture a number line. Adding a positive number moves right. Adding a negative number moves left.',
          b < 0 ? `Adding $${b}$ is the same as subtracting $${-b}$: $${a} - ${-b}$.` : `Start at $${a}$ and move $${b}$ steps to the right.`,
        ],
        solution: b < 0
          ? [`Adding a negative number is the same as subtracting: $${expr} = ${a} - ${-b}$`, `$${a} - ${-b} = ${ans}$`, `The answer is $${ans}$.`]
          : [`Start at $${a}$ on a number line and move $${b}$ steps to the right.`, `$${expr} = ${ans}$`, `The answer is $${ans}$.`],
      };
    }
    const ans = a - b;
    const expr = `${a} - ${p(b)}`;
    return {
      prompt: `Calculate: $${expr}$`,
      parts: [numPart(ans)],
      hints: [
        'Subtracting a positive number moves left on a number line. Subtracting a negative number is the same as adding.',
        b < 0 ? `Change "subtract $${b}$" to "add $${-b}$": $${a} + ${-b}$.` : `Start at $${a}$ and move $${b}$ steps to the left.`,
      ],
      solution: b < 0
        ? [`Subtracting a negative number is the same as adding its opposite: $${expr} = ${a} + ${-b}$`, `$${a} + ${-b} = ${ans}$`, `The answer is $${ans}$.`]
        : [`Start at $${a}$ on a number line and move $${b}$ steps to the left.`, `$${expr} = ${ans}$`, `The answer is $${ans}$.`],
    };
  }
  const sgn = () => rng.sign();
  if (op === 'mul') {
    const [a, b] = retry(() => [sgn() * rng.int(2, 9), sgn() * rng.int(2, 9)] as const, ([x, y]) => x < 0 || y < 0);
    const ans = a * b;
    const expr = `${a} \\times ${p(b)}`;
    return {
      prompt: `Calculate: $${expr}$`,
      parts: [numPart(ans)],
      hints: [SIGNS, `Multiply $${Math.abs(a)} \\times ${Math.abs(b)}$ first, then decide the sign.`],
      solution: [`Multiply without the signs: $${Math.abs(a)} \\times ${Math.abs(b)} = ${Math.abs(ans)}$`, signLine(a, b), `$${expr} = ${ans}$`, `The answer is $${ans}$.`],
    };
  }
  const [q, dv] = retry(() => [sgn() * rng.int(2, 9), sgn() * rng.int(2, 9)] as const, ([x, y]) => x * y < 0 || y < 0);
  const n = q * dv;
  const expr = `${n} \\div ${p(dv)}`;
  return {
    prompt: `Calculate: $${expr}$`,
    parts: [numPart(q)],
    hints: [SIGNS, `Divide $${Math.abs(n)} \\div ${Math.abs(dv)}$ first, then decide the sign.`],
    solution: [`Divide without the signs: $${Math.abs(n)} \\div ${Math.abs(dv)} = ${Math.abs(q)}$`, signLine(n, dv), `$${expr} = ${q}$`, `The answer is $${q}$.`],
  };
}

function intContext1(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const city = rng.pick(CITIES);
  const kind = rng.pick(['rise', 'drop', 'owe', 'repeat'] as const);
  if (kind === 'rise') {
    const t0 = rng.int(-22, -6);
    const c = rng.int(4, 14);
    const t1 = t0 + c;
    const [from, to] = rng.pick([['7 a.m.', 'noon'], ['6 a.m.', '2 p.m.'], ['8 a.m.', '3 p.m.']] as const);
    return {
      prompt: `At ${from} the temperature in ${city} was $${degC(t0)}$. By ${to} it went up $${c}$ degrees. What was the temperature at ${to}?`,
      parts: [numPart(t1, { suffix: '°C' })],
      hints: ['Going up means add.', `Start at $${t0}$ on a number line and move $${c}$ steps to the right.`],
      solution: [`The temperature went up, so add: $${t0} + ${c}$`, `$${t0} + ${c} = ${t1}$`, `At ${to} the temperature was $${degC(t1)}$.`],
    };
  }
  if (kind === 'drop') {
    const t0 = rng.int(-6, 8);
    const c = rng.int(7, 16);
    const t1 = t0 - c;
    const [from, to] = rng.pick([['4 p.m.', 'midnight'], ['5 p.m.', '11 p.m.'], ['3 p.m.', '10 p.m.']] as const);
    return {
      prompt: `At ${from} the temperature in ${city} was $${degC(t0)}$. By ${to} it went down $${c}$ degrees. What was the temperature at ${to}?`,
      parts: [numPart(t1, { suffix: '°C' })],
      hints: ['Going down means subtract.', `Start at $${t0}$ on a number line and move $${c}$ steps to the left.`],
      solution: [`The temperature went down, so subtract: $${t0} - ${c}$`, `$${t0} - ${c} = ${t1}$`, `At ${to} the temperature was $${degC(t1)}$.`],
    };
  }
  if (kind === 'owe') {
    const D = rng.pick([20, 30, 40, 50, 60, 75, 80, 100]);
    const P = 5 * rng.int(1, D / 5 - 1);
    const bal = -D + P;
    const who = rng.pick(['a friend', 'an older brother', 'a cousin', 'an aunt', 'a roommate']);
    return {
      prompt: `${name} borrowed ${tag(D)} from ${who}, so ${name}’s balance with ${who} is $-${D}$. Then ${name} pays back ${tag(P)}. What is the new balance? Write it as an integer. A negative balance means money is still owed.`,
      parts: [numPart(bal)],
      hints: ['Paying back money makes the balance go up, so add.', `Calculate $-${D} + ${P}$.`],
      solution: [`Paying back adds to the balance: $-${D} + ${P}$`, `$-${D} + ${P} = ${bal}$`, `The new balance is $${bal}$, so ${name} still owes ${tag(-bal)}.`],
    };
  }
  const drop = rng.int(2, 5);
  const hrs = rng.int(3, 6);
  const ch = -drop * hrs;
  return {
    prompt: `A cold front moves into ${city}. The temperature goes down $${drop}$ degrees every hour for $${hrs}$ hours. What is the total change in temperature? Write the change as an integer. Use a negative number for a drop.`,
    parts: [numPart(ch, { suffix: 'degrees' })],
    hints: ['A drop of $' + drop + '$ degrees is a change of $-' + drop + '$.', `Multiply the change each hour by the number of hours: $${hrs} \\times (-${drop})$.`],
    solution: [`Each hour the change is $-${drop}$ degrees.`, `$${hrs} \\times (-${drop}) = ${ch}$`, 'A positive times a negative is negative.', `The total change is $${ch}$ degrees.`],
  };
}

function intOrderBare(rng: Rng): GenOutput {
  const form = rng.int(1, 5);
  const s = () => rng.sign();
  let expr: string;
  let ans: number;
  let steps: string[];
  let first: string;
  if (form === 1) {
    // a + b × c
    const a = s() * rng.int(1, 20);
    const b = rng.int(2, 9);
    const c = -rng.int(2, 9);
    ans = a + b * c;
    expr = `${a} + ${b} \\times ${p(c)}`;
    steps = [`Multiply first: $${b} \\times ${p(c)} = ${b * c}$`, `Then add: $${a} + ${p(b * c)} = ${ans}$`];
    first = `Multiply first: work out $${b} \\times ${p(c)}$. Then add.`;
  } else if (form === 2) {
    // (a ± b) ÷ c
    const [c, q] = retry(() => [s() * rng.int(2, 6), s() * rng.int(2, 9)] as const, ([x, y]) => x < 0 || y < 0);
    const sum = q * c;
    const a = retry(() => rng.int(-20, 12), (v) => v !== 0 && v !== sum);
    const b = sum - a;
    const inner = `${a} ${b < 0 ? '-' : '+'} ${Math.abs(b)}`;
    ans = q;
    expr = `(${inner}) \\div ${p(c)}`;
    steps = [`Brackets first: $${inner} = ${sum}$`, `Then divide: $${sum} \\div ${p(c)} = ${q}$`];
    first = `Brackets first: work out $${inner}$. Then divide.`;
  } else if (form === 3) {
    // a × b − c
    const [a, b] = retry(() => [s() * rng.int(2, 9), s() * rng.int(2, 9)] as const, ([x, y]) => x < 0 || y < 0);
    const c = s() * rng.int(2, 15);
    ans = a * b - c;
    expr = `${a} \\times ${p(b)} - ${p(c)}`;
    first = `Multiply first: work out $${a} \\times ${p(b)}$. Then subtract.`;
    steps = [
      `Multiply first: $${a} \\times ${p(b)} = ${a * b}$`,
      c < 0 ? `Then subtract. Subtracting a negative is adding: $${a * b} - ${p(c)} = ${a * b} + ${-c} = ${ans}$` : `Then subtract: $${a * b} - ${c} = ${ans}$`,
    ];
  } else if (form === 4) {
    // a − b ÷ c
    const [c, q] = retry(() => [s() * rng.int(2, 8), s() * rng.int(2, 9)] as const, ([x, y]) => x < 0 || y < 0);
    const b = q * c;
    const a = s() * rng.int(1, 15);
    ans = a - q;
    expr = `${a} - ${p(b)} \\div ${p(c)}`;
    first = `Divide first: work out $${p(b)} \\div ${p(c)}$. Then subtract.`;
    steps = [
      `Divide first: $${p(b)} \\div ${p(c)} = ${q}$`,
      q < 0 ? `Then subtract. Subtracting a negative is adding: $${a} - ${p(q)} = ${a} + ${-q} = ${ans}$` : `Then subtract: $${a} - ${q} = ${ans}$`,
    ];
  } else {
    // a × (b ± c)
    const a = s() * rng.int(2, 6);
    const b = s() * rng.int(1, 12);
    const c = retry(() => s() * rng.int(1, 12), (v) => Math.abs(b + v) >= 2 && (b < 0 || v < 0 || a < 0));
    const sum = b + c;
    const inner = `${b} ${c < 0 ? '-' : '+'} ${Math.abs(c)}`;
    ans = a * sum;
    expr = `${a} \\times (${inner})`;
    steps = [`Brackets first: $${inner} = ${sum}$`, `Then multiply: $${a} \\times ${p(sum)} = ${ans}$`];
    first = `Brackets first: work out $${inner}$. Then multiply.`;
  }
  return {
    prompt: `Use the order of operations to calculate: $${expr}$`,
    parts: [numPart(ans)],
    hints: [ORDER, first],
    solution: [...steps, `The answer is $${ans}$.`],
  };
}

const NIGHTS5 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const NIGHTS7 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** n integer temperatures with an integer mean m; values stay in [lo, hi]. */
function tempsWithMean(rng: Rng, n: number, m: number, spread: number, hi: number): number[] {
  return retry(
    () => {
      const dev = Array.from({ length: n - 1 }, () => rng.int(-spread, spread));
      dev.push(-dev.reduce((a, b) => a + b, 0));
      return rng.shuffle(dev).map((d) => m + d);
    },
    (vals) => vals.every((v) => v <= hi && Math.abs(v - m) <= spread + 2) && new Set(vals).size >= n - 1 && Math.max(...vals) !== Math.min(...vals),
    200,
  );
}
const sumLine = (vals: number[]) => vals.map((v, i) => (i === 0 ? `${v}` : p(v))).join(' + ');

function intContext2(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const city = rng.pick(CITIES);
  const kind = rng.pick(['mean', 'payback', 'cooling'] as const);
  if (kind === 'mean') {
    const m = rng.int(-18, -3);
    const vals = tempsWithMean(rng, 5, m, 6, 2);
    const total = vals.reduce((a, b) => a + b, 0);
    return {
      prompt: `The table shows the overnight low temperatures in ${city} for five nights. What is the mean (average) low temperature?`,
      figure: { type: 'table', headers: ['Night', 'Low (°C)'], rows: vals.map((v, i) => [NIGHTS5[i], String(v)]) },
      parts: [numPart(m, { suffix: '°C' })],
      hints: ['The mean is the total divided by how many numbers there are.', 'Add the five temperatures (watch the signs), then divide by $5$.'],
      solution: [
        `Add the temperatures: $${sumLine(vals)} = ${total}$`,
        `Divide by the number of nights: $${total} \\div 5 = ${m}$`,
        `The mean low temperature is $${degC(m)}$.`,
      ],
    };
  }
  if (kind === 'payback') {
    const pay = rng.pick([10, 15, 20, 25, 30, 40, 50]);
    const wk = rng.int(2, 6);
    const D = retry(() => 10 * rng.int(5, 30), (d) => d > wk * pay && d !== wk * pay);
    const bal = -D + wk * pay;
    const who = rng.pick(['a parent', 'an older sister', 'a friend', 'a grandparent', 'an uncle']);
    return {
      prompt: `${name} borrowed ${tag(D)} from ${who} to fix a bike. As an integer, the balance is $-${D}$. ${name} pays back ${tag(pay)} every week for $${wk}$ weeks. What is the balance now? Write it as an integer. A negative balance means money is still owed.`,
      parts: [numPart(bal)],
      hints: ['Each payment adds to the balance.', `Find $-${D} + ${wk} \\times ${pay}$. Multiply before you add.`],
      solution: [
        `Start at $-${D}$ and add $${wk}$ payments of $${pay}$: $-${D} + ${wk} \\times ${pay}$`,
        `Multiply first: $${wk} \\times ${pay} = ${wk * pay}$`,
        `Then add: $-${D} + ${wk * pay} = ${bal}$`,
        `The balance is $${bal}$, so ${name} still owes ${tag(-bal)}.`,
      ],
    };
  }
  const t0 = rng.int(-3, 6);
  const drop = rng.int(2, 4);
  const hrs = rng.int(3, 7);
  const t1 = t0 - drop * hrs;
  return {
    prompt: `At 9 p.m. the temperature in ${city} is $${degC(t0)}$. It goes down $${drop}$ degrees every hour for $${hrs}$ hours. What is the temperature at the end of the $${hrs}$ hours?`,
    parts: [numPart(t1, { suffix: '°C' })],
    hints: [`The total change is $${hrs} \\times (-${drop})$.`, `Calculate $${t0} + ${hrs} \\times (-${drop})$. Multiply before you add.`],
    solution: [
      `Write the problem: $${t0} + ${hrs} \\times (-${drop})$`,
      `Multiply first: $${hrs} \\times (-${drop}) = ${-drop * hrs}$`,
      `Then add: $${t0} + (${-drop * hrs}) = ${t1}$`,
      `The temperature is $${degC(t1)}$.`,
    ],
  };
}

function intContext3(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const city = rng.pick(CITIES);
  const kind = rng.pick(['week', 'freezer', 'bank'] as const);
  if (kind === 'week') {
    const m = rng.int(-24, -6);
    const vals = tempsWithMean(rng, 7, m, 7, 1);
    const total = vals.reduce((a, b) => a + b, 0);
    const hi = Math.max(...vals);
    const lo = Math.min(...vals);
    return {
      prompt: `The table shows the overnight lows in ${city} for one week in January.\n\n**(a)** What is the mean (average) low temperature?\n\n**(b)** How many degrees warmer was the warmest night than the coldest night?`,
      figure: { type: 'table', headers: ['Night', 'Low (°C)'], rows: vals.map((v, i) => [NIGHTS7[i], String(v)]) },
      parts: [numPart(m, { label: '(a)', suffix: '°C' }), numPart(hi - lo, { label: '(b)', suffix: 'degrees' })],
      hints: ['Mean: add all seven temperatures, then divide by $7$.', `For (b), subtract the coldest from the warmest: $${hi} - ${p(lo)}$.`],
      solution: [
        `(a) Add the temperatures: $${sumLine(vals)} = ${total}$`,
        `Divide by $7$: $${total} \\div 7 = ${m}$`,
        `(b) The warmest night was $${degC(hi)}$ and the coldest was $${degC(lo)}$.`,
        lo < 0 ? `Subtract: $${hi} - ${p(lo)} = ${hi} + ${-lo} = ${hi - lo}$` : `Subtract: $${hi} - ${lo} = ${hi - lo}$`,
        `(a) The mean low is $${degC(m)}$. (b) The warmest night was $${hi - lo}$ degrees warmer than the coldest.`,
      ],
    };
  }
  if (kind === 'freezer') {
    const t0 = rng.pick([-20, -18, -15]);
    const up = rng.int(2, 4);
    const h1 = rng.int(3, 5);
    const down = rng.int(3, 5);
    const h2 = rng.int(1, 3);
    const t1 = t0 + up * h1;
    const t2 = t1 - down * h2;
    const store = rng.pick(['a grocery store', 'a restaurant kitchen', 'an ice cream shop', 'a meat shop']);
    return {
      prompt: `The walk-in freezer at ${store} in ${city} is at $${degC(t0)}$. The power goes out, and the temperature goes up $${up}$ degrees every hour for $${h1}$ hours. Then the power comes back on, and the temperature goes down $${down}$ degrees every hour for $${h2}$ ${h2 === 1 ? 'hour' : 'hours'}. What is the temperature now?`,
      parts: [numPart(t2, { suffix: '°C' })],
      hints: ['Do it in two parts: first the warm-up, then the cool-down.', `Calculate $${t0} + ${h1} \\times ${up} - ${h2} \\times ${down}$. Multiply before you add or subtract.`],
      solution: [
        `Write the problem: $${t0} + ${h1} \\times ${up} - ${h2} \\times ${down}$`,
        `Multiply first: $${h1} \\times ${up} = ${up * h1}$ and $${h2} \\times ${down} = ${down * h2}$`,
        `Then add and subtract from left to right: $${t0} + ${up * h1} = ${t1}$, and $${t1} - ${down * h2} = ${t2}$`,
        `The temperature is now $${degC(t2)}$.`,
      ],
    };
  }
  const start = -rng.pick([25, 30, 45, 60, 75, 80, 120]);
  const nC = rng.int(2, 3);
  const chq = rng.pick([145, 180, 215, 260, 285, 320]);
  const [what, lo, hi] = rng.pick([
    ['pays {a} {} phone bill', 45, 95],
    ['pays {a} {} internet bill', 60, 110],
    ['makes {a} {} car insurance payment', 120, 190],
    ['pays {} for groceries', 70, 160],
    ['buys {a} {} bus pass', 60, 110],
  ] as const);
  const bill = rng.int(lo, hi);
  const end = start + nC * chq - bill;
  return {
    prompt: `${name}’s bank account is overdrawn. The balance is $${start}$ dollars. ${name} deposits $${nC}$ pay cheques of ${tag(chq)} each. Then ${name} ${what.replace('{a}', art(bill)).replace('{}', tag(bill))} with a debit card. What is the balance now? Write it as an integer in dollars.`,
    parts: [numPart(end, { suffix: 'dollars' })],
    hints: ['Deposits add to the balance. Paying a bill subtracts from it.', `Calculate $${start} + ${nC} \\times ${chq} - ${bill}$. Multiply first.`],
    solution: [
      `Write the problem: $${start} + ${nC} \\times ${chq} - ${bill}$`,
      `Multiply first: $${nC} \\times ${chq} = ${nC * chq}$`,
      `Add and subtract from left to right: $${start} + ${nC * chq} = ${start + nC * chq}$, then $${start + nC * chq} - ${bill} = ${end}$`,
      end < 0 ? `The balance is $${end}$ dollars. The account is still overdrawn by ${tag(-end)}.` : `The balance is $${end}$ dollars.`,
    ],
  };
}

const integerOps = skill({
  id: 'm204-integer-ops',
  name: 'Integer operations and the order of operations',
  description: 'Add, subtract, multiply and divide integers, and use the order of operations with temperatures and money.',
  outcomes: ['N1'],
  lessonId: 'm204-1-1',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return { ...(rng.chance(0.5) ? intBare(rng) : intContext1(rng)), calculator: false };
    if (d === 2) return rng.chance(0.5) ? intOrderBare(rng) : intContext2(rng);
    return intContext3(rng);
  },
});

// ---------------------------------------------------------------------------
// 1.2 Fractions and mixed numbers
// ---------------------------------------------------------------------------

/** A mixed number w n/d as a fraction. */
const F = (w: number, n: number, d: number) => frac(w * d + n, d);
/** LaTeX for a positive fraction as a mixed number: 4\frac{1}{2}. */
function mx(f: Frac): string {
  if (f.d === 1) return `${f.n}`;
  const w = Math.floor(f.n / f.d);
  const r = f.n - w * f.d;
  return w === 0 ? `\\frac{${r}}{${f.d}}` : `${w}\\frac{${r}}{${f.d}}`;
}
/** LaTeX for a fraction as an improper fraction. */
const imp = (f: Frac) => (f.d === 1 ? `${f.n}` : `\\frac{${f.n}}{${f.d}}`);
const val = (f: Frac) => f.n / f.d;
const isMixed = (f: Frac) => f.d !== 1 && f.n > f.d;
/** n/d, then simplified, then as a mixed number, joined with = signs. */
function chain(n: number, d: number): string {
  const f = frac(n, d);
  const out = [`\\frac{${n}}{${d}}`];
  if (f.d !== d) out.push(imp(f));
  if (isMixed(f)) out.push(mx(f));
  return out.join(' = ');
}
/** Step that changes a mixed number to an improper fraction (empty when it is already a proper fraction). */
function toImproper(f: Frac): string {
  if (!isMixed(f)) return '';
  const w = Math.floor(f.n / f.d);
  return `$${mx(f)} = ${imp(f)}$, because $${w} \\times ${f.d} + ${f.n - w * f.d} = ${f.n}$`;
}
function improperSteps(fs: Frac[]): string[] {
  const parts = fs.map(toImproper).filter((s) => s);
  if (!parts.length) return [];
  return [parts.length === 1 ? `Change the mixed number to an improper fraction: ${parts[0]}.` : `Change each mixed number to an improper fraction: ${parts.join('; ')}.`];
}
/** A random proper or mixed fraction with denominator from `dens`. */
function randMixed(rng: Rng, dens: number[], wMin: number, wMax: number): Frac {
  const d = rng.pick(dens);
  const n = retry(() => rng.int(1, d - 1), (x) => gcd(x, d) === 1);
  return F(rng.int(wMin, wMax), n, d);
}
const unitWord = (u: string, f: Frac) => (u === 'cups' && val(f) <= 1 ? 'cup' : u);
const fracAnswer = (f: Frac, unit: string) => ({ parts: [numPart(val(f), { suffix: unit })], answerDisplay: `$${mx(f)}$ ${unitWord(unit, f)}` });

const RECIPES = [
  { dish: 'bannock', ing: 'flour' },
  { dish: 'pancakes', ing: 'milk' },
  { dish: 'muffins', ing: 'flour' },
  { dish: 'oatmeal cookies', ing: 'rolled oats' },
  { dish: 'banana bread', ing: 'sugar' },
  { dish: 'chili', ing: 'kidney beans' },
  { dish: 'fried rice', ing: 'rice' },
  { dish: 'smoothies', ing: 'yogurt' },
];
const KITCHENS = ['at home', 'for a bake sale', 'at the daycare where they work', 'at a community hall supper', 'for a hockey team fundraiser', 'at the café where they work'];

function fracScaleRecipe(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const r = rng.pick(RECIPES);
  const k = rng.pick([2, 3]);
  const a = randMixed(rng, [2, 3, 4], rng.chance(0.25) ? 0 : 1, 3);
  const res = frac(k * a.n, a.d);
  const batch = k === 2 ? 'a double batch' : 'a triple batch';
  return {
    prompt: `${name} is making ${r.dish} ${rng.pick(KITCHENS)}. The recipe uses $${mx(a)}$ ${unitWord('cups', a)} of ${r.ing}. ${name} makes ${batch}, which is $${k}$ times the recipe. How many cups of ${r.ing} are needed?`,
    ...fracAnswer(res, 'cups'),
    hints: [`${k === 2 ? 'A double batch' : 'A triple batch'} means multiply the amount by $${k}$.`, 'Change the mixed number to an improper fraction. Multiply the numerator by ' + k + ', then simplify.'],
    solution: [
      ...improperSteps([a]),
      `Multiply by $${k}$: $${k} \\times ${imp(a)} = \\frac{${k} \\times ${a.n}}{${a.d}} = ${chain(k * a.n, a.d)}$`,
      `${name} needs $${mx(res)}$ ${unitWord('cups', res)} of ${r.ing}.`,
    ],
  };
}

/** Add or subtract mixed numbers with the same denominator, wholes and fractions separately (the Math 10-4 method). */
function fracLike(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const d = rng.pick([4, 8, 8]);
  const add = rng.chance(0.5);
  const nums = d === 4 ? [1, 3] : [1, 3, 5, 7];
  let wa: number;
  let wb: number;
  let na: number;
  let nb: number;
  if (add) {
    [wa, wb, na, nb] = [rng.int(1, 4), rng.int(1, 3), rng.pick(nums), rng.pick(nums)];
  } else {
    [wa, wb] = [rng.int(3, 7), rng.int(1, 2)];
    [na, nb] = retry(() => [rng.pick(nums), rng.pick(nums)] as const, ([x, y]) => x > y);
  }
  const a = F(wa, na, d);
  const b = F(wb, nb, d);
  const res = add ? frac(a.n * b.d + b.n * a.d, a.d * b.d) : frac(a.n * b.d - b.n * a.d, a.d * b.d);
  const u = rng.pick([{ u: 'ft', w: 'feet' }, { u: 'in', w: 'inches' }]);
  const A = mx(a);
  const B = mx(b);
  const W = add ? wa + wb : wa - wb;
  const R = add ? na + nb : na - nb;
  const steps: string[] = [];
  steps.push(`The denominators are the same, so work with the whole numbers and the fractions separately.`);
  steps.push(`Whole numbers: $${wa} ${add ? '+' : '-'} ${wb} = ${W}$`);
  steps.push(`Fractions: $\\frac{${na}}{${d}} ${add ? '+' : '-'} \\frac{${nb}}{${d}} = \\frac{${R}}{${d}}$`);
  if (R >= d) steps.push(`$\\frac{${R}}{${d}}$ is $1$ whole or more: $\\frac{${R}}{${d}} = ${mx(frac(R, d))}$, so the total is $${W} + ${mx(frac(R, d))} = ${mx(res)}$`);
  else if (gcd(R, d) > 1) steps.push(`Put them together and simplify: $${W}\\frac{${R}}{${d}} = ${mx(res)}$`);
  else steps.push(`Put them together: $${mx(res)}$`);
  const job = rng.pick(u.u === 'ft' ? ['baseboard', 'door trim', 'shelf board', 'PVC pipe'] : ['copper tubing', 'wooden dowel', 'metal strapping', 'vinyl edging']);
  const prompt = add
    ? `${name} is a carpenter’s helper. ${name} cuts two pieces of ${job}: one is $${A}$ ${u.w} long and the other is $${B}$ ${u.w} long. What is the total length?`
    : `${name} has a piece of ${job} that is $${A}$ ${u.w} long. ${name} cuts off $${B}$ ${u.w}. How much is left? (Ignore the width of the saw cut.)`;
  return {
    prompt,
    ...fracAnswer(res, u.u),
    hints: [
      add ? 'Add the whole numbers, then add the fractions.' : 'Subtract the whole numbers, then subtract the fractions.',
      `The fractions already have the same denominator, $${d}$. ${add ? 'Add' : 'Subtract'} the numerators and keep the denominator.`,
    ],
    solution: [...steps, `${add ? 'The total length is' : 'The piece left is'} $${mx(res)}$ ${u.w}${add ? '' : ' long'}.`],
  };
}

function fracOfWhole(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const ctx = rng.pick([
    { d: [2, 3, 4], W: [8, 12], unit: 'h', text: (f: string, W: number) => `${name} works ${W === 8 ? 'an' : 'a'} $${W}$-hour shift at a warehouse. ${name} spends $${f}$ of the shift driving a forklift. How many hours is that?`, end: (x: number) => `${name} drives the forklift for $${x}$ hours.` },
    { d: [3, 4, 5], W: [60, 120], unit: 'kg', text: (f: string, W: number) => `A farm stand has $${W}\\ \\text{kg}$ of potatoes. By noon, $${f}$ of the potatoes are sold. How many kilograms are sold?`, end: (x: number) => `$${x}\\ \\text{kg}$ of potatoes are sold.` },
    { d: [4, 5, 10], W: [20, 40, 80], unit: 'L', text: (f: string, W: number) => `${W === 80 ? 'An' : 'A'} $${W}\\ \\text{L}$ fuel tank on a farm truck is $${f}$ full. How many litres of fuel are in it?`, end: (x: number) => `The tank holds $${x}\\ \\text{L}$ of fuel.` },
    { d: [3, 4, 6], W: [24, 36, 48], unit: 'eggs', text: (f: string, W: number) => `A café kitchen has $${W}$ eggs. The breakfast cook uses $${f}$ of them. How many eggs does the cook use?`, end: (x: number) => `The cook uses $${x}$ eggs.` },
  ]);
  const Wf = rng.pick(ctx.W);
  const d = rng.pick(ctx.d.filter((x) => Wf % x === 0));
  const n = retry(() => rng.int(1, d - 1), (x) => gcd(x, d) === 1);
  const ans = (Wf / d) * n;
  const f = `\\frac{${n}}{${d}}`;
  return {
    prompt: ctx.text(f, Wf),
    parts: [numPart(ans, { suffix: ctx.unit })],
    hints: ['"Of" means multiply.', `Divide $${Wf}$ by the denominator $${d}$, then multiply by the numerator $${n}$.`],
    solution: [
      `Find $${f}$ of $${Wf}$: divide by the denominator, $${Wf} \\div ${d} = ${Wf / d}$`,
      `Multiply by the numerator: $${Wf / d} \\times ${n} = ${ans}$`,
      ctx.end(ans),
    ],
  };
}

function lcdSteps(a: Frac, b: Frac, L: number): string {
  const conv = [a, b].filter((f) => f.d !== L).map((f) => `$${imp(f)} = \\frac{${(f.n * L) / f.d}}{${L}}$`);
  return conv.length ? `Use the common denominator $${L}$: ${conv.join(' and ')}.` : `Both fractions already have the denominator $${L}$.`;
}

function fracAddSubUnlike(rng: Rng, add: boolean): GenOutput {
  const name = rng.pick(NAMES);
  const kitchen = rng.chance(0.5);
  const dens = kitchen ? [[2, 4], [4, 2], [2, 3], [3, 2], [3, 4], [4, 3]] : [[2, 4], [4, 2], [4, 8], [8, 4], [2, 8], [8, 2]];
  const [da, db] = rng.pick(dens);
  const pick = (d: number, lo: number, hi: number) => F(rng.int(lo, hi), retry(() => rng.int(1, d - 1), (x) => gcd(x, d) === 1), d);
  const [a, b] = retry(
    () => (add ? [pick(da, kitchen ? 0 : 1, 3), pick(db, kitchen ? 0 : 1, 3)] : [pick(da, 3, 8), pick(db, 1, 3)]) as [Frac, Frac],
    ([x, y]) => (add ? true : val(x) - val(y) > 0.5),
  );
  const L = lcm(a.d, b.d);
  const xa = (a.n * L) / a.d;
  const xb = (b.n * L) / b.d;
  const R = add ? xa + xb : xa - xb;
  const res = frac(R, L);
  let prompt: string;
  let unit: string;
  if (kitchen) {
    unit = 'cups';
    const [i1, i2] = rng.pick([['milk', 'water'], ['flour', 'rolled oats'], ['chicken broth', 'water'], ['white sugar', 'brown sugar']]);
    prompt = add
      ? `${name} is cooking ${rng.pick(KITCHENS)}. The recipe needs $${mx(a)}$ ${unitWord('cups', a)} of ${i1} and $${mx(b)}$ ${unitWord('cups', b)} of ${i2}. How many cups is that altogether?`
      : `${name} has $${mx(a)}$ cups of ${i1} in a container. A recipe uses $${mx(b)}$ ${unitWord('cups', b)}. How many cups of ${i1} are left?`;
  } else {
    unit = 'ft';
    const what = rng.pick(['a 2 by 4', 'a board', 'a piece of trim', 'a length of PVC pipe']);
    prompt = add
      ? `On a job site, ${name} nails two boards end to end. One board is $${mx(a)}$ feet long and the other is $${mx(b)}$ feet long. What is the total length?`
      : `${name} is a construction labourer. ${name} has ${what} that is $${mx(a)}$ feet long and cuts off a piece $${mx(b)}$ feet long. How long is the piece that is left? (Ignore the width of the saw cut.)`;
  }
  const word = unit === 'cups' ? unitWord('cups', res) : 'feet';
  return {
    prompt,
    ...fracAnswer(res, unit),
    hints: [
      `The denominators are different. Find a common denominator first: $${L}$ works.`,
      `Change to improper fractions with denominator $${L}$, ${add ? 'add' : 'subtract'} the numerators, then change back to a mixed number.`,
    ],
    solution: [
      ...improperSteps([a, b]),
      lcdSteps(a, b, L),
      `${add ? 'Add' : 'Subtract'} the numerators: $\\frac{${xa}}{${L}} ${add ? '+' : '-'} \\frac{${xb}}{${L}} = ${chain(R, L)}$`,
      add ? `The total is $${mx(res)}$ ${word}.` : `There ${unit === 'cups' && val(res) <= 1 ? 'is' : 'are'} $${mx(res)}$ ${word} left.`,
    ],
  };
}

function fracMultiply(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['shift', 'half', 'batches'] as const);
  let a: Frac;
  let b: Frac;
  let prompt: string;
  let unit: string;
  let end: (r: Frac) => string;
  if (kind === 'shift') {
    a = rng.pick([frac(1, 2), frac(1, 3), frac(2, 3), frac(1, 4), frac(3, 4)]);
    b = F(rng.int(2, 7), 1, 2);
    const task = rng.pick(['stocking shelves', 'at the cash register', 'cleaning rooms', 'washing cars', 'on the drive-thru window', 'doing kitchen prep']);
    prompt = `${name} works a $${mx(b)}$-hour shift and spends $${imp(a)}$ of it ${task}. How many hours is that?`;
    unit = 'h';
    end = (r) => `${name} spends $${mx(r)}$ hours ${task}.`;
  } else if (kind === 'half') {
    a = rng.pick([frac(1, 2), frac(1, 3), frac(2, 3)]);
    b = randMixed(rng, [2, 4], 1, 4);
    const r = rng.pick(RECIPES);
    const size = a.n === 1 && a.d === 2 ? 'half' : a.d === 3 && a.n === 1 ? 'one-third' : 'two-thirds';
    prompt = `A recipe for ${r.dish} uses $${mx(b)}$ cups of ${r.ing}. ${name} makes only ${size} of the recipe, which is $${imp(a)}$ of it. How many cups of ${r.ing} does ${name} need?`;
    unit = 'cups';
    end = (res) => `${name} needs $${mx(res)}$ ${unitWord('cups', res)} of ${r.ing}.`;
  } else {
    a = F(1, 1, 2);
    b = randMixed(rng, [3, 4], 1, 3);
    const r = rng.pick(RECIPES);
    prompt = `A recipe for ${r.dish} uses $${mx(b)}$ cups of ${r.ing}. ${name} makes $${mx(a)}$ batches. How many cups of ${r.ing} does ${name} need?`;
    unit = 'cups';
    end = (res) => `${name} needs $${mx(res)}$ ${unitWord('cups', res)} of ${r.ing}.`;
  }
  const res = frac(a.n * b.n, a.d * b.d);
  return {
    prompt,
    ...fracAnswer(res, unit),
    hints: ['"Of" or "batches of" means multiply. Change mixed numbers to improper fractions first.', 'Multiply the numerators, multiply the denominators, then simplify.'],
    solution: [
      ...improperSteps([a, b]),
      `Multiply the numerators and the denominators: $${imp(a)} \\times ${imp(b)} = \\frac{${a.n} \\times ${b.n}}{${a.d} \\times ${b.d}} = ${chain(a.n * b.n, a.d * b.d)}$`,
      end(res),
    ],
  };
}

/** Steps for "whole number B minus fraction f". */
function subtractFromWhole(B: number, f: Frac, unit: string): string[] {
  if (f.d === 1) return [`Subtract: $${B} - ${f.n} = ${B - f.n}$ ${unit}`];
  return [
    `Write $${B}$ with the same denominator: $${B} = \\frac{${B * f.d}}{${f.d}}$`,
    `Subtract: $\\frac{${B * f.d}}{${f.d}} - ${imp(f)} = ${chain(B * f.d - f.n, f.d)}$ ${unit}`,
  ];
}

function fracTwoStep(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['cut', 'leftover', 'two'] as const);
  if (kind === 'cut') {
    const [B, L, k] = retry(
      () => [rng.pick([8, 10, 12, 16]), randMixed(rng, [2, 4, 8], 1, 3), rng.int(2, 4)] as const,
      ([b, l, n]) => b - n * val(l) >= 0.5 && b - n * val(l) < 4,
    );
    const used = frac(k * L.n, L.d);
    const left = frac(B * used.d - used.n, used.d);
    const what = rng.pick(['shelf boards', 'fence pickets', 'stair treads', 'deck boards']);
    return {
      prompt: `${name} is building a shed. ${name} has a board that is $${B}$ feet long and cuts $${k}$ ${what} from it, each $${mx(L)}$ feet long. How much of the board is left? (Ignore the width of the saw cuts.)`,
      ...fracAnswer(left, 'ft'),
      hints: ['First find the total length of the pieces. Then subtract it from the board.', `Total of the pieces: $${k} \\times ${mx(L)}$. Then subtract that total from $${B}$.`],
      solution: [
        ...improperSteps([L]),
        `Length of the $${k}$ pieces: $${k} \\times ${imp(L)} = ${chain(k * L.n, L.d)}$ feet`,
        ...subtractFromWhole(B, used, 'feet'),
        `$${mx(left)}$ feet of the board is left.`,
      ],
    };
  }
  if (kind === 'leftover') {
    const r = rng.pick(RECIPES);
    const k = rng.pick([F(1, 1, 2), frac(2, 1), F(2, 1, 2)]);
    const A = randMixed(rng, [2, 4], 1, 2);
    const need = frac(k.n * A.n, k.d * A.d);
    const H = retry(() => F(rng.int(Math.ceil(val(need)), Math.ceil(val(need)) + 3), rng.pick([0, 1, 1, 3]), 4), (h) => val(h) - val(need) >= 0.5);
    const left = frac(H.n * need.d - need.n * H.d, H.d * need.d);
    const L = lcm(H.d, need.d);
    const batches = k.d === 1 ? `$${k.n}$ batches` : `$${mx(k)}$ batches`;
    return {
      prompt: `${name} has $${mx(H)}$ cups of ${r.ing}. A recipe for ${r.dish} uses $${mx(A)}$ cups of ${r.ing}, and ${name} makes ${batches}. How many cups of ${r.ing} are left over?`,
      ...fracAnswer(left, 'cups'),
      hints: ['First find how much the batches use. Then subtract that from what you have.', `Amount used: $${mx(k)} \\times ${mx(A)}$.`],
      solution: [
        ...improperSteps([k, A]),
        `Amount used: $${imp(k)} \\times ${imp(A)} = ${chain(k.n * A.n, k.d * A.d)}$ cups`,
        ...(H.d === 1
          ? subtractFromWhole(H.n, need, 'cups')
          : [
              ...improperSteps([H]),
              lcdSteps(H, need, L),
              `Subtract: $\\frac{${(H.n * L) / H.d}}{${L}} - \\frac{${(need.n * L) / need.d}}{${L}} = ${chain((H.n * L) / H.d - (need.n * L) / need.d, L)}$ cups`,
            ]),
        `$${mx(left)}$ ${unitWord('cups', left)} of ${r.ing} ${val(left) <= 1 ? 'is' : 'are'} left over.`,
      ],
    };
  }
  const B = rng.pick([8, 10, 12]);
  const [a, b] = retry(
    () => [randMixed(rng, [2, 4, 8], 2, 4), randMixed(rng, [2, 4, 8], 2, 4)] as const,
    ([x, y]) => x.d !== y.d && B - val(x) - val(y) >= 0.5,
  );
  const L = lcm(a.d, b.d);
  const sum = frac(a.n * b.d + b.n * a.d, a.d * b.d);
  const left = frac(B * sum.d - sum.n, sum.d);
  return {
    prompt: `${name} is putting up baseboard in a hallway. From one $${B}$-foot piece, ${name} cuts two lengths: $${mx(a)}$ feet and $${mx(b)}$ feet. How much of the piece is left? (Ignore the width of the saw cuts.)`,
    ...fracAnswer(left, 'ft'),
    hints: ['First add the two lengths. Then subtract the total from the full piece.', `Use the common denominator $${L}$ to add $${mx(a)} + ${mx(b)}$.`],
    solution: [
      ...improperSteps([a, b]),
      lcdSteps(a, b, L),
      `Add: $\\frac{${(a.n * L) / a.d}}{${L}} + \\frac{${(b.n * L) / b.d}}{${L}} = ${chain((a.n * L) / a.d + (b.n * L) / b.d, L)}$ feet`,
      ...subtractFromWhole(B, sum, 'feet'),
      `$${mx(left)}$ feet of the piece is left.`,
    ],
  };
}

const fractionOps = skill({
  id: 'm204-fraction-ops',
  name: 'Operations with fractions and mixed numbers',
  description: 'Add, subtract and multiply fractions and mixed numbers to scale recipes, cut boards and share out time.',
  outcomes: ['N1'],
  lessonId: 'm204-1-2',
  calculator: false,
  gen(rng, d) {
    if (d === 1) {
      const k = rng.int(1, 3);
      return k === 1 ? fracScaleRecipe(rng) : k === 2 ? fracLike(rng) : fracOfWhole(rng);
    }
    if (d === 2) {
      const k = rng.int(1, 3);
      return k === 1 ? fracAddSubUnlike(rng, true) : k === 2 ? fracAddSubUnlike(rng, false) : fracMultiply(rng);
    }
    return fracTwoStep(rng);
  },
});

// ---------------------------------------------------------------------------
// 1.3 Ratios, rates and proportions
// ---------------------------------------------------------------------------

const RATIO_CTX = [
  { place: 'a grocery store', A: 'cashiers', B: 'stock clerks' },
  { place: 'a fast-food restaurant', A: 'cooks', B: 'servers' },
  { place: 'a hotel', A: 'housekeepers', B: 'front desk clerks' },
  { place: 'a landscaping company', A: 'trucks', B: 'trailers' },
  { place: 'a community garden', A: 'tomato plants', B: 'pepper plants' },
  { place: 'a swimming lesson', A: 'adults', B: 'children' },
  { place: 'a farm', A: 'cows', B: 'horses' },
  { place: 'a hockey tournament', A: 'home games', B: 'away games' },
];
const colon = (a: number, b: number) => `$${a} : ${b}$`;

function ratioSimplest(rng: Rng): GenOutput {
  const c = rng.pick(RATIO_CTX);
  const [pp, qq] = retry(() => [rng.int(1, 7), rng.int(1, 7)] as const, ([x, y]) => x !== y && gcd(x, y) === 1);
  const g = rng.pick([2, 3, 4, 5, 6, 8]);
  const a = g * pp;
  const b = g * qq;
  const sub = [2, 3, 4].find((h) => g % h === 0 && h < g);
  const tot = pp + qq;
  const distract = [colon(qq, pp), colon(pp, tot), sub ? colon(a / sub, b / sub) : colon(a, b), colon(a, b), colon(qq, tot)];
  return {
    prompt: `At ${c.place} there are $${a}$ ${c.A} and $${b}$ ${c.B}. What is the ratio of ${c.A} to ${c.B} in simplest form?`,
    parts: [{ answer: mc(rng, colon(pp, qq), distract) }],
    hints: [`The order matters: ${c.A} first, then ${c.B}.`, `Divide both numbers by the largest number that goes into both. Here that is $${g}$.`],
    solution: [
      `Write the ratio in the order asked, ${c.A} to ${c.B}: $${a} : ${b}$`,
      `Both numbers can be divided by $${g}$: $${a} \\div ${g} = ${pp}$ and $${b} \\div ${g} = ${qq}$`,
      `The ratio in simplest form is ${colon(pp, qq)}.`,
    ],
  };
}

const MIXES = [
  { what: 'Frozen juice concentrate is mixed with water', A: 'concentrate', B: 'water', a: 1, b: 3, unit: 'cans' },
  { what: 'A floor cleaner is mixed with water', A: 'cleaner', B: 'water', a: 1, b: 8, unit: 'capfuls' },
  { what: 'Concrete for a sidewalk is mixed from cement and gravel', A: 'cement', B: 'gravel', a: 1, b: 3, unit: 'buckets' },
  { what: 'Mortar for a brick wall is mixed from cement and sand', A: 'cement', B: 'sand', a: 1, b: 3, unit: 'shovels' },
  { what: 'A lawn fertilizer is mixed with water', A: 'fertilizer', B: 'water', a: 2, b: 5, unit: 'scoops' },
  { what: 'Hummingbird feeder water is made from sugar and water', A: 'sugar', B: 'water', a: 1, b: 4, unit: 'cups' },
];

function ratioMissing1(rng: Rng): GenOutput {
  const m = rng.pick(MIXES);
  const k = rng.int(2, 6);
  const fromA = rng.chance(0.6);
  const known = fromA ? m.a * k : m.b * k;
  const ans = fromA ? m.b * k : m.a * k;
  const [Kn, Un] = fromA ? [m.A, m.B] : [m.B, m.A];
  return {
    prompt: `${m.what} in the ratio $${m.a} : ${m.b}$ (${m.A} to ${m.B}). How many ${m.unit} of ${Un} go with $${known}$ ${m.unit} of ${Kn}?`,
    parts: [numPart(ans, { suffix: m.unit })],
    hints: [`The ratio means $${m.a}$ ${m.a === 1 ? m.unit.replace(/s$/, '') : m.unit} of ${m.A} for every $${m.b}$ ${m.unit} of ${m.B}.`, `${cap(Kn)} went from $${fromA ? m.a : m.b}$ to $${known}$. That is $${k}$ times as much. Multiply the ${Un} by $${k}$ too.`],
    solution: [
      `Write equal ratios: $${m.a} : ${m.b} = ${fromA ? `${known} : ?` : `? : ${known}`}$`,
      `$${fromA ? m.a : m.b} \\times ${k} = ${known}$, so multiply the other term by $${k}$ too.`,
      `$${fromA ? m.b : m.a} \\times ${k} = ${ans}$`,
      `Use $${ans}$ ${m.unit} of ${Un}.`,
    ],
  };
}
function unitRate1(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['kg', 'speed', 'wage', 'boxes'] as const);
  if (kind === 'kg') {
    const r = rng.pick([2, 3, 4, 1.5, 2.5, 3.5]);
    const k = rng.pick([2, 3, 4, 5, 6]);
    const item = rng.pick(['apples', 'carrots', 'potatoes', 'onions', 'bananas']);
    const total = r * k;
    return {
      prompt: `A bag of ${item} with a mass of $${k}\\ \\text{kg}$ costs ${tag(total)}. What is the price per kilogram?`,
      parts: [moneyPart(r, 'per kg')],
      hints: ['A unit rate is the amount for **one** unit. Here the unit is one kilogram.', `Divide the price by the number of kilograms: $${mv(total)} \\div ${k}$.`],
      solution: [`Price per kilogram $=$ price $\\div$ kilograms`, `$${mv(total)} \\div ${k} = ${mv(r)}$`, `The ${item} cost ${money(r)} per kilogram.`],
    };
  }
  if (kind === 'speed') {
    const r = rng.pick([60, 70, 75, 80, 85, 90]);
    const t = rng.int(2, 5);
    const veh = rng.pick(['A tour bus', 'A school bus on a field trip', 'A moving truck', 'A delivery van']);
    return {
      prompt: `${veh} leaves ${rng.pick(CITIES)} and travels $${r * t}\\ \\text{km}$ in $${t}$ hours. What is its average speed in kilometres per hour?`,
      parts: [numPart(r, { suffix: 'km/h' })],
      hints: ['Kilometres per hour means kilometres in **one** hour.', `Divide the distance by the time: $${r * t} \\div ${t}$.`],
      solution: [`Speed $=$ distance $\\div$ time`, `$${r * t} \\div ${t} = ${r}$`, `The average speed is $${r}\\ \\text{km/h}$.`],
    };
  }
  if (kind === 'wage') {
    const r = rng.pick([15, 16, 17, 18, 20]);
    const h = rng.int(4, 8);
    const job = rng.pick(['a car wash', 'a hardware store', 'a daycare', 'a coffee shop', 'a hotel']);
    return {
      prompt: `${name} works at ${job} and earns ${tag(r * h)} for $${h}$ hours of work. How much does ${name} earn per hour?`,
      parts: [moneyPart(r, 'per hour')],
      hints: ['The hourly wage is the pay for **one** hour.', `Divide the pay by the hours: $${r * h} \\div ${h}$.`],
      solution: [`Pay per hour $=$ pay $\\div$ hours`, `$${r * h} \\div ${h} = ${r}$`, `${name} earns ${tag(r)} per hour.`],
    };
  }
  const r = rng.pick([20, 25, 30, 40, 45, 60]);
  const h = rng.int(3, 8);
  return {
    prompt: `At a warehouse in ${rng.pick(CITIES)}, ${name} packs $${r * h}$ boxes in $${h}$ hours. How many boxes is that per hour?`,
    parts: [numPart(r, { suffix: 'boxes/h' })],
    hints: ['A unit rate is the amount for **one** unit. Here the unit is one hour.', `Divide the boxes by the hours: $${r * h} \\div ${h}$.`],
    solution: [`Boxes per hour $=$ boxes $\\div$ hours`, `$${r * h} \\div ${h} = ${r}$`, `${name} packs $${r}$ boxes per hour.`],
  };
}

function ratioProportion2(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['recipe', 'fuel', 'daycare', 'cleaner'] as const);
  if (kind === 'recipe') {
    const s1 = rng.pick([4, 6, 8]);
    const s2 = rng.pick([10, 12, 15, 20, 30]);
    const g = rng.pick([50, 75, 100, 125, 150]);
    const dish = rng.pick([['a pasta dish', 'pasta'], ['a beef stew', 'stewing beef'], ['a rice dish', 'rice'], ['a fruit salad', 'grapes']]);
    const a1 = s1 * g;
    const ans = s2 * g;
    return {
      prompt: `${name} preps food at a restaurant kitchen. A recipe for ${dish[0]} that serves $${s1}$ people uses $${a1}\\ \\text{g}$ of ${dish[1]}. How many grams of ${dish[1]} are needed to serve $${s2}$ people?`,
      parts: [numPart(ans, { suffix: 'g' })],
      hints: ['Set up a proportion: $\\dfrac{\\text{grams}}{\\text{servings}}$ is the same for both.', `Find the grams for $1$ serving first: $${a1} \\div ${s1}$. Then multiply by $${s2}$.`],
      solution: [
        `Set up a proportion: $\\dfrac{${a1}\\ \\text{g}}{${s1}\\ \\text{servings}} = \\dfrac{x}{${s2}\\ \\text{servings}}$`,
        `Grams for $1$ serving: $${a1} \\div ${s1} = ${g}$`,
        `For $${s2}$ servings: $${g} \\times ${s2} = ${ans}$`,
        `${name} needs $${num(ans)}\\ \\text{g}$ of ${dish[1]}.`,
      ],
    };
  }
  if (kind === 'fuel') {
    const R = rng.pick([50, 40]);
    const G = R === 50 ? rng.pick([2, 4, 5, 10, 15, 20]) : rng.pick([2, 4, 5, 10, 20]);
    const ml = (G * 1000) / R;
    const tool = rng.pick(['chainsaw', 'leaf blower', 'string trimmer', 'snowmobile', 'dirt bike']);
    return {
      prompt: `Two-stroke fuel for a ${tool} is gas and oil mixed in the ratio $${R} : 1$. How many millilitres of oil should be mixed with $${G}\\ \\text{L}$ of gas? (Use $1\\ \\text{L} = 1000\\ \\text{mL}$.)`,
      parts: [numPart(ml, { suffix: 'mL' })],
      hints: [`$${R} : 1$ means $${R}$ parts gas for every $1$ part oil. Change the gas to millilitres first.`, `$${G}\\ \\text{L} = ${num(G * 1000)}\\ \\text{mL}$. Divide by $${R}$.`],
      solution: [
        `Change the gas to millilitres: $${G} \\times 1000 = ${num(G * 1000)}\\ \\text{mL}$`,
        `The oil is $\\frac{1}{${R}}$ of the gas: $${num(G * 1000)} \\div ${R} = ${ml}$`,
        `Mix in $${ml}\\ \\text{mL}$ of oil.`,
      ],
    };
  }
  if (kind === 'daycare') {
    const r = rng.pick([4, 5, 6, 8]);
    const staff = rng.int(3, 7);
    const kids = r * staff;
    const kidsWord = rng.pick(['toddlers', 'preschoolers', 'children']);
    return {
      prompt: `A daycare in ${rng.pick(CITIES)} plans for $1$ staff member for every $${r}$ ${kidsWord}. How many staff are needed for $${kids}$ ${kidsWord}?`,
      parts: [numPart(staff, { suffix: 'staff' })],
      hints: [`The ratio is $1 : ${r}$ (staff to ${kidsWord}).`, `Divide the number of ${kidsWord} by $${r}$.`],
      solution: [`Write equal ratios: $1 : ${r} = x : ${kids}$`, `$${r}$ was multiplied by $${kids / r}$ to get $${kids}$, so $x = 1 \\times ${staff} = ${staff}$`, `The daycare needs $${staff}$ staff.`],
    };
  }
  const R = rng.pick([16, 20, 32, 40]);
  const water = rng.pick([2, 4, 5, 8]);
  const ml = (water * 1000) / R;
  return {
    prompt: `A hotel housekeeper mixes a cleaner with water in the ratio $1 : ${R}$ (cleaner to water). How many millilitres of cleaner go into $${water}\\ \\text{L}$ of water? (Use $1\\ \\text{L} = 1000\\ \\text{mL}$.)`,
    parts: [exactPart(ml, 'mL')],
    hints: [`$1 : ${R}$ means $1$ part cleaner for every $${R}$ parts water. Change the water to millilitres first.`, `$${water}\\ \\text{L} = ${num(water * 1000)}\\ \\text{mL}$. Divide by $${R}$.`],
    solution: [
      `Change the water to millilitres: $${water} \\times 1000 = ${num(water * 1000)}\\ \\text{mL}$`,
      `The cleaner is $\\frac{1}{${R}}$ of the water: $${num(water * 1000)} \\div ${R} = ${num(ml)}$`,
      `Use $${num(ml)}\\ \\text{mL}$ of cleaner.`,
    ],
  };
}

function unitRate2(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['kg', 'wage', 'speed'] as const);
  if (kind === 'kg') {
    const item = rng.pick([['ground beef', 'package'], ['chicken thighs', 'tray'], ['cheddar cheese', 'block'], ['grapes', 'bag'], ['salmon', 'package']]);
    const { kg, price } = retry(
      () => {
        const kg = rng.pick([0.8, 1.2, 1.5, 2.5, 0.75, 1.8]);
        const price = roundTo(rng.int(6, 22) + rng.pick([0.49, 0.79, 0.99, 0.29]), 2);
        return { kg, price };
      },
      (o) => !onEdge(o.price / o.kg, 2),
    );
    const r = price / kg;
    return {
      prompt: `A ${item[1]} of ${item[0]} has a mass of $${num(kg)}\\ \\text{kg}$ and costs ${money(price)}. What is the price per kilogram, ${CENT}?`,
      parts: [moneyPart(r, 'per kg')],
      hints: ['Price per kilogram means the price of **one** kilogram.', `Divide the price by the mass: $${mv(price)} \\div ${num(kg)}$.`],
      solution: [`Price per kilogram $=$ price $\\div$ kilograms`, `$${mv(price)} \\div ${num(kg)} ${eq(r)}$`, `The ${item[0]} costs ${abt(r)}${money(roundTo(r, 2))} per kilogram.`],
    };
  }
  if (kind === 'wage') {
    const r = rng.pick([15.5, 16.25, 16.75, 17.5, 18.25, 19.5, 21.75]);
    const h = rng.pick([12, 16, 20, 24, 28, 32, 36]);
    const pay = roundTo(r * h, 2);
    const job = rng.pick(['an auto detailing shop', 'a hair salon', 'a garden centre', 'a hotel', 'a grocery store']);
    return {
      prompt: `${name} worked $${h}$ hours at ${job} and was paid ${money(pay)}. What is ${name}’s hourly wage?`,
      parts: [moneyPart(r, 'per hour')],
      hints: ['The hourly wage is the pay for **one** hour.', `Divide the pay by the hours: $${mv(pay)} \\div ${h}$.`],
      solution: [`Hourly wage $=$ pay $\\div$ hours`, `$${mv(pay)} \\div ${h} = ${mv(r)}$`, `${name} earns ${money(r)} per hour.`],
    };
  }
  const { D, t } = retry(
    () => {
      const t = rng.pick([2.5, 3.5, 4.5, 1.5, 5.5]);
      return { t, D: Math.round(t * rng.int(68, 92)) + rng.int(-4, 4) };
    },
    (o) => !onEdge(o.D / o.t, 0),
  );
  const r = D / t;
  const hrs = `$${Math.floor(t)}$ hours $30$ minutes`;
  return {
    prompt: `A truck driver drives $${D}\\ \\text{km}$ from ${rng.pick(CITIES)} in ${hrs}. What is the average speed in kilometres per hour, ${roundingPhrase(0)}?`,
    parts: [numPart(r, { decimals: 0, suffix: 'km/h' })],
    hints: ['Write the time in hours as a decimal: $30$ minutes is $0.5$ hours.', `Divide the distance by the time: $${D} \\div ${num(t)}$.`],
    solution: [`$${Math.floor(t)}$ hours $30$ minutes $= ${num(t)}$ hours`, `Speed $=$ distance $\\div$ time $= ${D} \\div ${num(t)} ${eq(r)}$`, `The average speed is about $${fmtFixed(r, 0)}\\ \\text{km/h}$.`],
  };
}

const PARTS3 = [
  { what: 'Concrete for a patio is mixed from cement, sand and gravel', mix: 'concrete mix', names: ['cement', 'sand', 'gravel'], ratio: [1, 2, 3], unit: 'buckets', totals: [12, 18, 24, 30, 36, 42, 48, 60] },
  { what: 'A trail mix for a school trip is made from peanuts, raisins and chocolate chips', mix: 'trail mix', names: ['peanuts', 'raisins', 'chocolate chips'], ratio: [3, 2, 1], unit: 'g', totals: [600, 900, 1200, 1500, 1800] },
  { what: 'A potting soil for a greenhouse is mixed from topsoil, compost and sand', mix: 'potting soil', names: ['topsoil', 'compost', 'sand'], ratio: [3, 2, 1], unit: 'L', totals: [30, 48, 60, 72, 90] },
];
const PARTS2 = [
  { what: 'Orange juice is made from frozen concentrate and water', mix: 'orange juice', names: ['concentrate', 'water'], ratio: [1, 3], unit: 'L', totals: [4, 8, 12, 16, 20] },
  { what: 'At an auto detailing shop, car wash soap is mixed with water', mix: 'soapy water', names: ['soap', 'water'], ratio: [1, 9], unit: 'L', totals: [10, 20, 30, 40] },
  { what: 'Lemonade for a community barbecue is made from syrup and water', mix: 'lemonade', names: ['syrup', 'water'], ratio: [1, 5], unit: 'L', totals: [6, 12, 18, 24, 30] },
];

function ratioShare3(rng: Rng): GenOutput {
  const m = rng.pick([...PARTS3, ...PARTS2]);
  const T = rng.pick(m.totals);
  const sumParts = m.ratio.reduce((a, b) => a + b, 0);
  const per = T / sumParts;
  const i = rng.int(0, m.names.length - 1);
  const ans = per * m.ratio[i];
  const u = m.unit === 'buckets' ? 'buckets' : m.unit === 'g' ? 'grams' : 'litres';
  const ratioTex = m.ratio.join(' : ');
  return {
    prompt: `${m.what} in the ratio $${ratioTex}$ (${m.names.join(' to ')}). ${m.unit === 'buckets' ? 'A crew needs' : 'You want to make'} $${num(T)}$ ${u} of ${m.mix} in total. How many ${u} of ${m.names[i]} are needed?`,
    parts: [numPart(ans, { suffix: m.unit === 'buckets' ? 'buckets' : m.unit })],
    hints: ['Add the numbers in the ratio to find how many equal parts make the whole mix.', `There are $${m.ratio.join(' + ')} = ${sumParts}$ parts. Find the size of one part: $${num(T)} \\div ${sumParts}$.`],
    solution: [
      `Total number of parts: $${m.ratio.join(' + ')} = ${sumParts}$`,
      `Size of one part: $${num(T)} \\div ${sumParts} = ${num(per)}$ ${u}`,
      `${cap(m.names[i])}: $${m.ratio[i]}$ ${m.ratio[i] === 1 ? 'part' : 'parts'}, so $${m.ratio[i]} \\times ${num(per)} = ${num(ans)}$`,
      `You need $${num(ans)}$ ${u} of ${m.names[i]}.`,
    ],
  };
}

function rateScale3(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['wage', 'grocery', 'fuel'] as const);
  if (kind === 'wage') {
    const r = rng.pick([15.75, 16.5, 17.25, 18.5, 19.75]);
    const h1 = rng.pick([4, 5, 6, 8]);
    const h2 = rng.pick([12, 15, 18, 25, 30].filter((h) => h !== h1));
    const p1 = roundTo(r * h1, 2);
    const ans = roundTo(r * h2, 2);
    return {
      prompt: `${name} earned ${money(p1)} for ${art(h1)} $${h1}$-hour shift at a ${rng.pick(['garden centre', 'movie theatre', 'car wash', 'bakery'])}. At the same rate, how much will ${name} earn for $${h2}$ hours${centNote(ans)}?`,
      parts: [moneyPart(ans)],
      hints: ['First find the pay for **one** hour.', `Pay per hour: $${mv(p1)} \\div ${h1}$. Then multiply by $${h2}$.`],
      solution: [`Unit rate: $${mv(p1)} \\div ${h1} = ${mv(r)}$, so ${money(r)} per hour.`, `For $${h2}$ hours: $${mv(r)} \\times ${h2} = ${mv(ans)}$`, `${name} will earn ${money(ans)}.`],
    };
  }
  if (kind === 'grocery') {
    const item = rng.pick(['apples', 'bananas', 'carrots', 'tomatoes', 'oranges']);
    const u = roundTo(rng.int(149, 449) / 100, 2);
    const k1 = rng.pick([2, 3, 4]);
    const k2 = rng.pick([5, 6, 7, 10]);
    const p1 = roundTo(u * k1, 2);
    const ans = roundTo(u * k2, 2);
    return {
      prompt: `At a farmers’ market, $${k1}\\ \\text{kg}$ of ${item} cost ${money(p1)}. At the same price per kilogram, how much will $${k2}\\ \\text{kg}$ cost${centNote(ans)}?`,
      parts: [moneyPart(ans)],
      hints: ['First find the price of **one** kilogram.', `Price per kilogram: $${mv(p1)} \\div ${k1}$. Then multiply by $${k2}$.`],
      solution: [`Unit price: $${mv(p1)} \\div ${k1} = ${mv(u)}$, so ${money(u)} per kilogram.`, `For $${k2}\\ \\text{kg}$: $${mv(u)} \\times ${k2} = ${mv(ans)}$`, `$${k2}\\ \\text{kg}$ will cost ${money(ans)}.`],
    };
  }
  const per100 = rng.pick([8, 9, 10, 12, 14, 15]);
  const d1 = rng.pick([200, 250, 300, 400]);
  const d2 = rng.pick([350, 450, 500, 600, 750].filter((x) => x !== d1));
  const L1 = (per100 * d1) / 100;
  const ans = (per100 * d2) / 100;
  const veh = rng.pick(['pickup truck', 'minivan', 'car', 'work van']);
  return {
    prompt: `${name}’s ${veh} used $${num(L1)}\\ \\text{L}$ of gas to drive $${d1}\\ \\text{km}$. At the same rate, how many litres will it use to drive $${d2}\\ \\text{km}$?`,
    parts: [exactPart(ans, 'L')],
    hints: ['First find the gas used for **one** kilometre, or for $100\\ \\text{km}$.', `Gas per kilometre: $${num(L1)} \\div ${d1}$. Then multiply by $${d2}$.`],
    solution: [
      `Unit rate: $${num(L1)} \\div ${d1} = ${num(L1 / d1)}$ litres per kilometre.`,
      `For $${d2}\\ \\text{km}$: $${num(L1 / d1)} \\times ${d2} = ${num(ans)}$`,
      `The ${veh} will use $${num(ans)}\\ \\text{L}$ of gas.`,
    ],
  };
}

const ratioRate = skill({
  id: 'm204-ratio-rate',
  name: 'Ratios, rates and proportions',
  description: 'Write a ratio in simplest form, find a unit rate, and use a proportion to scale a recipe or a mix.',
  outcomes: ['N1'],
  lessonId: 'm204-1-3',
  calculator: true,
  gen(rng, d) {
    if (d === 1) {
      const k = rng.int(1, 3);
      return k === 1 ? ratioSimplest(rng) : k === 2 ? ratioMissing1(rng) : unitRate1(rng);
    }
    if (d === 2) return rng.chance(0.55) ? ratioProportion2(rng) : unitRate2(rng);
    return rng.chance(0.5) ? ratioShare3(rng) : rateScale3(rng);
  },
});

// ---------------------------------------------------------------------------
// 1.4 Percent problems
// ---------------------------------------------------------------------------

const pc = (x: number) => `${num(x)}\\%`;
/** "a" or "an" before a percent read aloud (an 18% tip, an 8% raise). */
const anPct = art;
const dec = (pct: number) => num(pct / 100);

function percentOf1(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['tip', 'people', 'save', 'tank'] as const);
  if (kind === 'tip') {
    const pct = rng.pick([10, 15, 20]);
    const B = rng.pick([20, 30, 40, 50, 60, 80]);
    const t = (B * pct) / 100;
    return {
      prompt: `${name} and some friends have supper at a restaurant in ${rng.pick(CITIES)}. The bill is ${tag(B)}. They leave ${anPct(pct)} $${pct}\\%$ tip. How much is the tip?`,
      parts: [moneyPart(t)],
      hints: [`$${pct}\\%$ means $${pct}$ out of $100$. As a decimal it is $${dec(pct)}$.`, `Multiply: $${dec(pct)} \\times ${B}$.`],
      solution: [`Change the percent to a decimal: $${pct}\\% = ${dec(pct)}$`, `Multiply: $${dec(pct)} \\times ${B} = ${mv(t)}$`, `The tip is ${money(t)}.`],
    };
  }
  if (kind === 'people') {
    const [pct, W] = retry(() => [rng.pick([10, 20, 25, 50, 75, 5]), 20 * rng.int(2, 10)] as const, ([q, w]) => isWhole((q * w) / 100));
    const ans = (pct * W) / 100;
    const [where, who, act] = rng.pick([
      ['a warehouse', 'workers', 'ride the bus to work'],
      ['a high school', 'students in Grade 11', 'have a part-time job'],
      ['a hotel', 'rooms', 'are booked for the weekend'],
      ['a fitness centre', 'members', 'come in the morning'],
    ]);
    return {
      prompt: `At ${where} in ${rng.pick(CITIES)}, $${pct}\\%$ of the $${W}$ ${who} ${act}. How many ${who} is that?`,
      parts: [numPart(ans)],
      hints: [`$${pct}\\%$ as a decimal is $${dec(pct)}$.`, `Multiply: $${dec(pct)} \\times ${W}$.`],
      solution: [`Change the percent to a decimal: $${pct}\\% = ${dec(pct)}$`, `Multiply: $${dec(pct)} \\times ${W} = ${ans}$`, `That is $${ans}$ ${who}.`],
    };
  }
  if (kind === 'save') {
    const pct = rng.pick([10, 20, 25, 50]);
    const P = rng.pick([20, 40, 60, 80, 100, 120, 160]);
    const s = (P * pct) / 100;
    const item = rng.pick(['pair of work boots', 'winter coat', 'hockey helmet', 'backpack', 'pair of running shoes']);
    return {
      prompt: `A ${item} costs ${tag(P)}. It is on sale for $${pct}\\%$ off. How much money do you save?`,
      parts: [moneyPart(s)],
      hints: [`The amount you save is $${pct}\\%$ of ${tag(P)}.`, `Multiply: $${dec(pct)} \\times ${P}$.`],
      solution: [`Change the percent to a decimal: $${pct}\\% = ${dec(pct)}$`, `Multiply: $${dec(pct)} \\times ${P} = ${mv(s)}$`, `You save ${tag(s)}.`],
    };
  }
  const pct = rng.pick([25, 50, 75]);
  const C = rng.pick([20, 40, 60, 80, 100]);
  const ans = (pct * C) / 100;
  const tank = rng.pick(['fuel tank on a tractor', 'water tank on a camper', 'fuel tank on a delivery truck', 'water tank for a pressure washer']);
  return {
    prompt: `${cap(art(C))} $${C}\\ \\text{L}$ ${tank} is $${pct}\\%$ full. How many litres are in the tank?`,
    parts: [numPart(ans, { suffix: 'L' })],
    hints: [`$${pct}\\%$ as a decimal is $${dec(pct)}$.`, `Multiply: $${dec(pct)} \\times ${C}$.`],
    solution: [`Change the percent to a decimal: $${pct}\\% = ${dec(pct)}$`, `Multiply: $${dec(pct)} \\times ${C} = ${ans}$`, `There are $${ans}\\ \\text{L}$ in the tank.`],
  };
}

function whatPercent(rng: Rng, d: 1 | 2): GenOutput {
  const name = rng.pick(NAMES);
  // b1: wholes for difficulty 1; b2: range of wholes for difficulty 2; f: range of part/whole.
  const ctx = rng.pick([
    { b1: [10, 20, 25, 50], b2: [30, 60], f: [0.6, 0.98], t: (a: number, b: number) => `${name} got $${a}$ out of $${b}$ on a practice test for a driver’s licence. What percent is that?`, end: (x: string) => `${name} scored ${x} on the test.` },
    { b1: [20, 25, 50], b2: [40, 120], f: [0.4, 0.9], t: (a: number, b: number) => `Of the $${b}$ customers at a coffee shop one morning, $${a}$ paid with a debit card. What percent paid with debit?`, end: (x: string) => `${x} of the customers paid with debit.` },
    { b1: [10, 20, 25, 50], b2: [30, 90], f: [0.7, 0.98], t: (a: number, b: number) => `A landscaping crew planted $${b}$ trees in the spring. By fall, $${a}$ of them were still alive. What percent of the trees lived?`, end: (x: string) => `${x} of the trees lived.` },
    { b1: [20, 25, 50], b2: [40, 56], f: [0.5, 0.98], t: (a: number, b: number) => `A shuttle bus from Brookfield to Lakeside has $${b}$ seats, and $${a}$ of them are taken. What percent of the seats are taken?`, end: (x: string) => `${x} of the seats are taken.` },
    { b1: [20, 25], b2: [24, 45], f: [0.8, 0.97], t: (a: number, b: number) => `A hockey goalie faced $${b}$ shots in a game and stopped $${a}$ of them. What percent of the shots did the goalie stop?`, end: (x: string) => `The goalie stopped ${x} of the shots.` },
  ]);
  const partOf = (bb: number) => rng.int(Math.ceil(bb * ctx.f[0]), Math.min(bb - 1, Math.floor(bb * ctx.f[1])));
  let a: number;
  let b: number;
  let rounded = false;
  if (d === 1) {
    b = rng.pick(ctx.b1);
    a = retry(() => rng.int(1, b - 1), (x) => ((x * 100) / b) % 5 === 0 && x / b >= ctx.f[0] - 0.2 && x / b <= ctx.f[1]);
  } else if (rng.chance(0.5)) {
    [a, b] = retry(() => {
      const bb = rng.int(ctx.b2[0], ctx.b2[1]);
      return [partOf(bb), bb] as const;
    }, ([x, y]) => isWhole((x * 100) / y), 200);
  } else {
    rounded = true;
    [a, b] = retry(() => {
      const bb = rng.int(ctx.b2[0], ctx.b2[1]);
      return [partOf(bb), bb] as const;
    }, ([x, y]) => !isWhole((x * 1000) / y) && !onEdge((x * 100) / y, 0), 200);
  }
  const pct = (a * 100) / b;
  const prompt = ctx.t(a, b) + (rounded ? ` Round to the nearest whole percent.` : '');
  return {
    prompt,
    parts: [rounded ? numPart(pct, { decimals: 0, suffix: '%' }) : exactPart(pct, '%')],
    hints: ['Write the part over the whole as a fraction, then change it to a percent.', `Divide $${a} \\div ${b}$, then multiply by $100$.`],
    solution: [
      `Part over whole: $\\dfrac{${a}}{${b}}$`,
      `Divide: $${a} \\div ${b} ${eq(a / b)}$`,
      `Multiply by $100$: $${num(roundTo(a / b, 4))} \\times 100 ${rounded ? `\\approx ${fmtFixed(pct, 0)}` : `= ${num(pct)}`}$`,
      ctx.end(rounded ? `about $${fmtFixed(pct, 0)}\\%$` : `$${pc(pct)}$`),
    ],
  };
}

function percentOf2(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['gst', 'tip', 'deposit'] as const);
  if (kind === 'gst') {
    const P = retry(() => roundTo(rng.int(1500, 18000) / 100, 2), (x) => !onEdge(x * 0.05, 2) && !isWhole(x));
    const ans = P * 0.05;
    return {
      prompt: `${name} buys a ${rng.pick(['set of winter tires', 'microwave', 'pair of steel-toe boots', 'tool set', 'bike helmet'])} for ${money(P)} before tax. In this question, GST is $5\\%$. How much GST is charged, ${CENT}?`,
      parts: [moneyPart(ans)],
      hints: ['$5\\%$ as a decimal is $0.05$.', `Multiply: $0.05 \\times ${mv(P)}$.`],
      solution: [`Change the percent to a decimal: $5\\% = 0.05$`, `Multiply: $0.05 \\times ${mv(P)} ${eq(ans)}$`, `The GST is ${abt(ans)}${money(roundTo(ans, 2))}.`],
    };
  }
  if (kind === 'tip') {
    const pct = rng.pick([15, 18, 20]);
    const B = retry(() => roundTo(rng.int(2400, 12000) / 100, 2), (x) => !onEdge((x * pct) / 100, 2));
    const ans = (B * pct) / 100;
    return {
      prompt: `${name}’s family has supper at a restaurant. The bill is ${money(B)}. They leave ${anPct(pct)} $${pct}\\%$ tip. How much is the tip, ${CENT}?`,
      parts: [moneyPart(ans)],
      hints: [`$${pct}\\%$ as a decimal is $${dec(pct)}$.`, `Multiply: $${dec(pct)} \\times ${mv(B)}$.`],
      solution: [`Change the percent to a decimal: $${pct}\\% = ${dec(pct)}$`, `Multiply: $${dec(pct)} \\times ${mv(B)} ${eq(ans)}$`, `The tip is ${abt(ans)}${money(roundTo(ans, 2))}.`],
    };
  }
  const pct = rng.pick([10, 15, 20, 25]);
  const P = 10 * rng.int(25, 180);
  const ans = (P * pct) / 100;
  const item = rng.pick(['couch', 'used snowmobile', 'kitchen table set', 'mountain bike', 'laptop']);
  return {
    prompt: `A store asks for a $${pct}\\%$ deposit to hold a ${item} that costs ${tag(P)}. How much is the deposit${centNote(ans)}?`,
    parts: [moneyPart(ans)],
    hints: [`$${pct}\\%$ as a decimal is $${dec(pct)}$.`, `Multiply: $${dec(pct)} \\times ${num(P)}$.`],
    solution: [`Change the percent to a decimal: $${pct}\\% = ${dec(pct)}$`, `Multiply: $${dec(pct)} \\times ${num(P)} = ${mv(ans)}$`, `The deposit is ${tag(ans)}.`],
  };
}

const CHANGE_CTX = [
  { what: 'the price of a monthly bus pass', money: true, lo: 50, hi: 120, step: 5 },
  { what: 'the rent for a basement suite', money: true, lo: 800, hi: 1600, step: 50 },
  { what: 'the number of customers at a coffee shop each day', money: false, lo: 120, hi: 400, step: 20 },
  { what: 'the price of a large pizza', money: true, lo: 16, hi: 30, step: 2 },
  { what: 'the number of members at a gym', money: false, lo: 200, hi: 800, step: 40 },
];

function percentChange2(rng: Rng): GenOutput {
  const c = rng.pick(CHANGE_CTX);
  const up = rng.chance(0.55);
  const [o, pct] = retry(
    () => [c.step * rng.int(Math.ceil(c.lo / c.step), Math.floor(c.hi / c.step)), rng.pick([5, 10, 15, 20, 25, 30, 40])] as const,
    ([x, q]) => isWhole((x * q) / 100),
  );
  const n = up ? o + (o * pct) / 100 : o - (o * pct) / 100;
  const diff = Math.abs(n - o);
  const show = (x: number) => (c.money ? tag(x) : `$${num(x)}$`);
  const word = up ? 'increase' : 'decrease';
  return {
    prompt: `Last year, ${c.what} was ${show(o)}. This year it is ${show(n)}. What is the percent ${word}?`,
    parts: [numPart(pct, { suffix: '%' })],
    hints: [`First find the amount of the ${word}: subtract the smaller number from the larger one.`, `Percent ${word} $= \\dfrac{\\text{${word}}}{\\text{original}} \\times 100$. The original is last year’s number, $${num(o)}$.`],
    solution: [
      `Amount of the ${word}: $${num(Math.max(o, n))} - ${num(Math.min(o, n))} = ${num(diff)}$`,
      `Divide by the original amount: $${num(diff)} \\div ${num(o)} = ${num(diff / o)}$`,
      `Multiply by $100$: $${num(diff / o)} \\times 100 = ${pct}$`,
      `The percent ${word} is $${pct}\\%$.`,
    ],
  };
}

function newAmount3(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['rent', 'raise', 'sale'] as const);
  let o: number;
  let pct: number;
  let up: boolean;
  let prompt: string;
  let endText: (x: string) => string;
  if (kind === 'rent') {
    [o, pct] = retry(() => [50 * rng.int(18, 34), rng.pick([2, 3, 4, 5, 6])] as const, ([x, q]) => !onEdge((x * (100 + q)) / 100, 2));
    up = true;
    prompt = `${name} rents an apartment in ${rng.pick(CITIES)} for ${tag(o)} a month. The landlord raises the rent by $${pct}\\%$. What is the new monthly rent${centNote((o * (100 + pct)) / 100)}?`;
    endText = (x) => `The new rent is ${x} a month.`;
  } else if (kind === 'raise') {
    [o, pct] = retry(() => [roundTo(rng.int(1550, 2250) / 100, 2), rng.pick([2, 3, 4, 5, 8, 10])] as const, ([x, q]) => !onEdge((x * (100 + q)) / 100, 2));
    up = true;
    prompt = `${name} earns ${money(o)} per hour at a ${rng.pick(['grocery store', 'lumber yard', 'hotel', 'pet store'])}. ${name} gets ${anPct(pct)} $${pct}\\%$ raise. What is the new hourly wage${centNote((o * (100 + pct)) / 100)}?`;
    endText = (x) => `The new wage is ${x} per hour.`;
  } else {
    [o, pct] = retry(() => [roundTo(rng.int(20, 160) - 0.01, 2), rng.pick([15, 20, 25, 30, 40])] as const, ([x, q]) => !onEdge((x * (100 - q)) / 100, 2));
    up = false;
    const item = rng.pick(['winter jacket', 'pair of boots', 'snowboard', 'coffee maker', 'set of pots']);
    prompt = `A ${item} costs ${money(o)}. It goes on sale for $${pct}\\%$ off. What is the sale price${centNote((o * (100 - pct)) / 100)}?`;
    endText = (x) => `The sale price is ${x}.`;
  }
  const ch = (o * pct) / 100;
  const n = up ? o + ch : o - ch;
  return {
    prompt,
    parts: [moneyPart(n)],
    hints: [`First find $${pct}\\%$ of ${tag(o)}. Then ${up ? 'add it to' : 'subtract it from'} the original amount.`, `$${pct}\\% = ${dec(pct)}$. Find $${dec(pct)} \\times ${mv(o)}$.`],
    solution: [
      `Find the ${up ? 'increase' : 'discount'}: $${dec(pct)} \\times ${mv(o)} ${eq(ch)}$`,
      `${up ? 'Add' : 'Subtract'}: $${mv(o)} ${up ? '+' : '-'} ${num(roundTo(ch, 4))} ${eq(n)}$`,
      endText(isWhole(n * 100) ? tag(n) : `about ${money(roundTo(n, 2))}`),
    ],
  };
}

function wholeFromPart3(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const [item, kind, lo, hi] = rng.pick([
    ['used car', 'a down payment', 3000, 15000],
    ['couch', 'a deposit', 400, 1800],
    ['set of hockey gear', 'a deposit', 200, 900],
    ['fridge', 'a deposit', 800, 2200],
    ['used utility trailer', 'a down payment', 1500, 6000],
  ] as const);
  const step = hi >= 3000 ? 100 : 20;
  const [pct, W] = retry(() => [rng.pick([10, 15, 20, 25, 30]), step * rng.int(Math.ceil(lo / step), Math.floor(hi / step))] as const, ([q, w]) => isWhole((q * w) / 100));
  const part = (pct * W) / 100;
  return {
    prompt: `${name} pays ${kind} of ${tag(part)} on a ${item}. The ${kind.replace(/^an? /, '')} is $${pct}\\%$ of the full price.\n\n**(a)** What is the full price of the ${item}?\n\n**(b)** How much does ${name} still have to pay?`,
    parts: [moneyPart(W, undefined), moneyPart(W - part)].map((pt, i) => ({ ...pt, label: i === 0 ? '(a) \\$' : '(b) \\$' })),
    hints: [`${tag(part)} is $${pct}\\%$ of the full price. So $${dec(pct)} \\times \\text{price} = ${num(part)}$.`, `Divide to undo the multiply: price $= ${num(part)} \\div ${dec(pct)}$. Then subtract the ${kind.replace(/^an? /, '')}.`],
    solution: [
      `$${pct}\\%$ of the price is ${tag(part)}, so $${dec(pct)} \\times \\text{price} = ${num(part)}$`,
      `Divide: price $= ${num(part)} \\div ${dec(pct)} = ${num(W)}$`,
      `Still to pay: $${num(W)} - ${num(part)} = ${num(W - part)}$`,
      `(a) The full price is ${tag(W)}. (b) ${name} still has to pay ${tag(W - part)}.`,
    ],
  };
}

function percentChangeRound3(rng: Rng): GenOutput {
  const kind = rng.pick(['gas', 'customers'] as const);
  if (kind === 'gas') {
    const [o, n] = retry(() => {
      const x = rng.int(119, 169) / 100;
      return [x, roundTo(x + rng.sign() * rng.int(6, 22) / 100, 2)] as const;
    }, ([x, y]) => !onEdge((Math.abs(y - x) / x) * 100, 1));
    const up = n > o;
    const pct = (Math.abs(n - o) / o) * 100;
    const w = up ? 'increase' : 'decrease';
    return {
      prompt: `Last month, regular gas in ${rng.pick(CITIES)} cost ${money(o)} per litre. This month it costs ${money(n)} per litre. What is the percent ${w}, ${roundingPhrase(1)} of a percent?`,
      parts: [numPart(pct, { decimals: 1, suffix: '%' })],
      hints: [`Find the ${w} first: subtract the two prices.`, `Divide the ${w} by last month’s price, then multiply by $100$.`],
      solution: [
        `Amount of the ${w}: $${mv(Math.max(o, n))} - ${mv(Math.min(o, n))} = ${mv(Math.abs(n - o))}$`,
        `Divide by the original price: $${mv(Math.abs(n - o))} \\div ${mv(o)} ${eq(Math.abs(n - o) / o)}$`,
        `Multiply by $100$: about $${fmtFixed(pct, 1)}\\%$`,
        `The price went ${up ? 'up' : 'down'} by about $${fmtFixed(pct, 1)}\\%$.`,
      ],
    };
  }
  const [o, n] = retry(() => [rng.int(150, 420), rng.int(120, 460)] as const, ([x, y]) => Math.abs(y - x) >= 12 && !onEdge((Math.abs(y - x) / x) * 100, 1) && !isWhole((Math.abs(y - x) / x) * 1000));
  const up = n > o;
  const pct = (Math.abs(n - o) / o) * 100;
  const w = up ? 'increase' : 'decrease';
  const place = rng.pick(['a food bank', 'a public swimming pool', 'a skating rink', 'a public library']);
  return {
    prompt: `In March, ${place} in ${rng.pick(CITIES)} had $${o}$ visitors. In April it had $${n}$ visitors. What is the percent ${w}, ${roundingPhrase(1)} of a percent?`,
    parts: [numPart(pct, { decimals: 1, suffix: '%' })],
    hints: [`Find the ${w} first: subtract the two numbers.`, `Divide the ${w} by the March number (the original), then multiply by $100$.`],
    solution: [
      `Amount of the ${w}: $${Math.max(o, n)} - ${Math.min(o, n)} = ${Math.abs(n - o)}$`,
      `Divide by the original: $${Math.abs(n - o)} \\div ${o} ${eq(Math.abs(n - o) / o)}$`,
      `Multiply by $100$: about $${fmtFixed(pct, 1)}\\%$`,
      `The number of visitors went ${up ? 'up' : 'down'} by about $${fmtFixed(pct, 1)}\\%$.`,
    ],
  };
}

const percentProblems = skill({
  id: 'm204-percent-problems',
  name: 'Percent problems',
  description: 'Find a percent of a number, what percent one number is of another, a percent increase or decrease, and the whole from a part.',
  outcomes: ['N1'],
  lessonId: 'm204-1-4',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return rng.chance(0.55) ? percentOf1(rng) : whatPercent(rng, 1);
    if (d === 2) {
      const k = rng.int(1, 3);
      return k === 1 ? percentOf2(rng) : k === 2 ? whatPercent(rng, 2) : percentChange2(rng);
    }
    const k = rng.int(1, 3);
    return k === 1 ? newAmount3(rng) : k === 2 ? wholeFromPart3(rng) : percentChangeRound3(rng);
  },
});

export const NUMBER_SKILLS: SkillDef[] = [integerOps, fractionOps, ratioRate, percentProblems];
