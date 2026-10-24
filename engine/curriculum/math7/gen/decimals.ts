/** Math 7 Unit 2 — Decimals and Percents: operations with decimals (N2) and percents from 1% to 100% (N3). */
import { fixedChoice, mc, numPart, part, retry, skill } from '../../helpers.ts';
import { fmt, fmtFixed, gcd, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Harpreet', 'Noor', 'Thanh', 'Kateri', 'Diego', 'Ngozi',
];
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater', 'Oakridge', 'Millbrook'];

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure; calculator?: boolean };
type Gen = (rng: Rng) => Out;

/** Remove floating-point noise from an exact decimal result. */
const clean = (x: number) => roundTo(x, 9);
const tx = (u: string) => `\\text{${u}}`;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
function group(s: string): string {
  const [i, f] = s.split('.');
  const g = i.length >= 5 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : i;
  return f === undefined ? g : `${g}.${f}`;
}
/** A number inside maths, without trailing zeros. */
const num = (x: number, dp = 4) => group(fmt(clean(x), dp));
/** A measurement as inline maths: $2.4\ \text{m}$. */
const q = (x: number, u: string) => `$${num(x)}\\ ${tx(u)}$`;
/** Money in prose with cents: \$12.50. Never inside $...$. */
const money = (x: number) => `\\$${fmtFixed(x, 2)}`;
/** A price tag: whole dollars print without cents (\$20). */
const tag = (x: number) => (Math.abs(x - Math.round(x)) < 1e-9 ? `\\$${Math.round(x)}` : money(x));
/** A money amount inside maths, without a dollar sign: 12.50. */
const mv = (x: number) => fmtFixed(x, 2);
/** "a" or "an" before a number read aloud: an 8, an 11, an 18, an 80. */
const art = (x: number) => (/^8|^1[18](\D|$)/.test(String(x)) ? 'an' : 'a');
const pc = (p: number) => `${num(p)}\\%`;
const fr = (n: number | string, d: number | string) => `\\frac{${n}}{${d}}`;

const CENT = 'to the nearest cent';
/** A money answer that had to be rounded: graded to within a cent. */
const moneyPart = (v: number, label = '\\$'): Part => numPart(v, { decimals: 2, tolerance: 0.011, label });
/** A money answer that is exact to the cent. */
const cashPart = (v: number, label = '\\$'): Part => numPart(clean(v), { decimals: 2, tolerance: 0.004, label });

/** An exact decimal answer, shown as a decimal on review screens. */
function decPart(value: number, suffix?: string, label?: string): Part {
  const v = clean(value);
  return { label, suffix, answer: { kind: 'numeric', value: v, allowExpression: false, display: 'decimal', exact: String(v) } };
}

/** A decimal answer to "write … as a decimal": a fraction typed back is not accepted. */
function asDecPart(value: number, label?: string): Part {
  const p = decPart(value, undefined, label);
  return { ...p, answer: { ...p.answer, asDecimal: true } as Part['answer'] };
}

/** True when v sits too close to a rounding boundary (x.xx5) at `dp` places. */
function onEdge(v: number, dp: number): boolean {
  const s = Math.abs(v) * 10 ** dp;
  return Math.abs(s - Math.floor(s) - 0.5) < 0.06;
}
const exactAt = (v: number, dp: number) => Math.abs(roundTo(v, dp) - v) < 1e-9;
/** "= 12.5" when exact to `dp` places, otherwise "\approx 12.4567". */
const eq = (v: number, dp = 4) => (exactAt(v, dp) ? `= ${num(v, dp)}` : `\\approx ${num(v, dp)}`);
const dpOf = (x: number) => {
  const s = fmt(clean(x), 6);
  return s.includes('.') ? s.split('.')[1].length : 0;
};

// Estimation -----------------------------------------------------------------

/** Round to a friendly number for a multiplication or division estimate. */
function near(x: number): number {
  if (x >= 100) return Math.round(x / 10) * 10;
  if (x >= 20) return Math.round(x / 5) * 5;
  if (x >= 3) return Math.round(x);
  if (x >= 1) {
    const w = Math.round(x);
    return Math.abs(x - w) <= 0.3 ? w : Math.round(x * 2) / 2;
  }
  return Math.max(0.1, Math.round(x * 10) / 10);
}
/** Round to the nearest whole number (nearest tenth below 1) for a sum or difference estimate. */
const whole = (x: number) => (x >= 1 ? Math.round(x) : Math.max(0.1, Math.round(x * 10) / 10));
/** One significant figure. */
function sig1(x: number): number {
  if (x <= 0) return 0;
  const p = 10 ** Math.floor(Math.log10(x));
  return Math.round(x / p) * p;
}
function checkLine(ans: number, est: number): string {
  const close = Math.abs(ans - est) <= 0.35 * Math.max(Math.abs(est), Math.abs(ans));
  return close ? `Check: $${num(ans)}$ is close to the estimate of $${num(est)}$, so the answer is reasonable.` : `Check: the estimate of $${num(est)}$ shows the answer has the right size, so the decimal point is in the right place.`;
}

// ---------------------------------------------------------------------------
// 2.1 Adding and subtracting decimals
// ---------------------------------------------------------------------------

/** Working for a sum or difference: estimate, line up, calculate, check. */
function sumSteps(terms: number[], ops: Array<'+' | '-'>): { steps: string[]; ans: number } {
  const dp = Math.max(...terms.map(dpOf));
  const f = 10 ** dp;
  let total = Math.round(terms[0] * f);
  terms.slice(1).forEach((t, i) => {
    total += (ops[i] === '+' ? 1 : -1) * Math.round(t * f);
  });
  const ans = clean(total / f);
  const expr = (xs: string[]) => xs.map((x, i) => (i === 0 ? x : ` ${ops[i - 1] === '+' ? '+' : '-'} ${x}`)).join('');
  const estWith = (round: (x: number) => number) => {
    const r = terms.map(round);
    let e = r[0];
    r.slice(1).forEach((x, i) => {
      e = ops[i] === '+' ? e + x : e - x;
    });
    return { rounded: r, est: clean(e) };
  };
  let { rounded, est } = estWith(whole);
  // Close numbers: rounding to whole numbers hides the difference, so round to tenths instead.
  if (Math.abs(ans - est) > 0.35 * Math.max(Math.abs(ans), Math.abs(est))) ({ rounded, est } = estWith((x) => roundTo(x, 1)));
  const steps = [`Estimate: $${expr(terms.map((t) => num(t)))} \\approx ${expr(rounded.map((r) => num(r)))} = ${num(est)}$.`];
  const uneven = new Set(terms.map(dpOf)).size > 1;
  steps.push(uneven ? `Line up the decimal points. Add zeros so every number has $${dp}$ decimal place${dp > 1 ? 's' : ''}: $${expr(terms.map((t) => fmtFixed(t, dp)))} = ${fmtFixed(ans, dp)}$` : `Line up the decimal points and ${ops.every((o) => o === '+') ? 'add' : 'calculate'}: $${expr(terms.map((t) => fmtFixed(t, dp)))} = ${fmtFixed(ans, dp)}$`);
  steps.push(checkLine(ans, est));
  return { steps, ans };
}

const ALIGN = 'Estimate first. Then line up the decimal points (add zeros if you need to).';

/** A decimal with 1 or 2 places in [lo, hi], not ending in 0. */
function deci(rng: Rng, lo: number, hi: number, dp: number): number {
  const f = 10 ** dp;
  return retry(() => rng.int(Math.round(lo * f), Math.round(hi * f)), (x) => x % 10 !== 0)! / f;
}

const ADD_D1: Gen[] = [
  (rng) => {
    const [a, b] = rng.shuffle([deci(rng, 1.2, 48, 1), deci(rng, 1.05, 24.99, 2)]);
    const { steps, ans } = sumSteps([a, b], ['+']);
    return {
      prompt: `Estimate, then calculate: $${num(a)} + ${num(b)}$`,
      parts: [decPart(ans)],
      hints: [ALIGN, 'Write both numbers with the same number of decimal places, then add as with whole numbers.'],
      solution: [...steps, `$${num(a)} + ${num(b)} = ${num(ans)}$`],
    };
  },
  (rng) => {
    const [x, y] = [deci(rng, 8, 60, rng.pick([1, 2])), deci(rng, 1.1, 7.9, rng.pick([1, 2]))];
    const { steps, ans } = sumSteps([x, y], ['-']);
    return {
      prompt: `Estimate, then calculate: $${num(x)} - ${num(y)}$`,
      parts: [decPart(ans)],
      hints: [ALIGN, 'Subtract from right to left. Regroup when the top digit is smaller.'],
      solution: [...steps, `$${num(x)} - ${num(y)} = ${num(ans)}$`],
    };
  },
  (rng) => {
    const name = rng.pick(NAMES);
    const [a, b] = rng.shuffle([deci(rng, 1.2, 9.8, 1), deci(rng, 0.45, 6.95, 2)]);
    const { steps, ans } = sumSteps([a, b], ['+']);
    const dest = rng.sample(['the rink', 'the library', 'school', 'a friend’s house', 'the pool', 'the skate park'], 2);
    return {
      prompt: `${name} biked ${q(a, 'km')} to ${dest[0]}, then ${q(b, 'km')} to ${dest[1]}. How far did ${name} bike in all?`,
      parts: [decPart(ans, 'km')],
      hints: ['"In all" means add.', ALIGN],
      solution: [...steps, `${name} biked ${q(ans, 'km')} in all.`],
    };
  },
  (rng) => {
    const town = rng.pick(TOWNS);
    const a = deci(rng, 8, 35, rng.pick([1, 2]));
    const b = deci(rng, 1.5, a - 1, rng.pick([1, 2]));
    const { steps, ans } = sumSteps([a, b], ['-']);
    return {
      prompt: `On Monday, ${q(a, 'mm')} of rain fell in ${town}. On Tuesday, ${q(b, 'mm')} fell. How much more rain fell on Monday?`,
      parts: [decPart(ans, 'mm')],
      hints: ['"How much more" means subtract.', ALIGN],
      solution: [...steps, `${q(ans, 'mm')} more rain fell on Monday.`],
    };
  },
  (rng) => {
    const name = rng.pick(NAMES);
    const old = deci(rng, 38, 52, 2);
    const now = clean(old - deci(rng, 1.2, 4.8, rng.pick([1, 2])));
    const { steps, ans } = sumSteps([old, now], ['-']);
    return {
      prompt: `Last month, ${name} swam $50$ m in ${q(old, 's')}. Today, ${name} swam it in ${q(now, 's')}. How many seconds faster is ${name} today?`,
      parts: [decPart(ans, 's')],
      hints: ['Find the difference between the two times.', ALIGN],
      solution: [...steps, `${name} is ${q(ans, 's')} faster today.`],
    };
  },
];

const ADD_D2: Gen[] = [
  // Three masses
  (rng) => {
    const name = rng.pick(NAMES);
    const items = rng.sample([['a tent', 1.5, 3.9], ['a sleeping bag', 0.9, 2.4], ['a camp stove', 0.35, 0.95], ['a cooler', 2.2, 4.8], ['a lantern', 0.25, 0.85], ['a backpack', 1.1, 2.6]] as Array<[string, number, number]>, 3);
    const dps = rng.shuffle([1, 2, 3]);
    const ms = items.map(([, lo, hi], i) => deci(rng, lo, hi, dps[i]));
    const { steps, ans } = sumSteps(ms, ['+', '+']);
    return {
      prompt: `${name} packs for a camping trip near ${rng.pick(['Pinewood', 'Maple Falls', 'Clearwater', 'Willow Lake', 'Stonebridge'])}. The masses are: ${items.map(([t], i) => `${t}, ${q(ms[i], 'kg')}`).join('; ')}. What is the total mass?`,
      parts: [decPart(ans, 'kg')],
      hints: ['Add the three masses.', 'Give every mass three decimal places by adding zeros, then line up the decimal points.'],
      solution: [...steps, `The total mass is ${q(ans, 'kg')}.`],
    };
  },
  // Subtract from a whole number
  (rng) => {
    const name = rng.pick(NAMES);
    const W = rng.int(2, 5);
    const used = deci(rng, 0.6, W - 0.4, rng.pick([2, 3]));
    const { steps, ans } = sumSteps([W, used], ['-']);
    return {
      prompt: `A water jug holds ${q(W, 'L')}. ${name} pours out ${q(used, 'L')} for the soccer team. How much water is left in the jug?`,
      parts: [decPart(ans, 'L')],
      hints: ['Subtract the amount poured out.', `Write $${W}$ as $${fmtFixed(W, dpOf(used))}$ so both numbers have the same number of decimal places.`],
      solution: [...steps, `There is ${q(ans, 'L')} left in the jug.`],
    };
  },
  // Change from a bill
  (rng) => {
    const name = rng.pick(NAMES);
    const bill = rng.pick([20, 50]);
    const [i1, i2] = rng.sample(['hockey tape', 'a water bottle', 'shin pads', 'a puck', 'skate laces', 'a mouthguard', 'a toque'], 2);
    const p1 = rng.int(350, bill === 20 ? 1100 : 2600) - rng.pick([0, 1, 5, 11]);
    const p2 = rng.int(199, bill === 20 ? 800 : 1900) - rng.pick([0, 1, 5]);
    const t = p1 + p2;
    if (t >= bill * 100) return ADD_D2[2](rng);
    const { steps: s1 } = sumSteps([p1 / 100, p2 / 100], ['+']);
    const change = (bill * 100 - t) / 100;
    return {
      prompt: `${name} buys ${i1} for ${money(p1 / 100)} and ${i2} for ${money(p2 / 100)}, and pays with a \\$${bill} bill. How much change should ${name} get?`,
      parts: [cashPart(change)],
      hints: ['First add the two prices. Then subtract the total from the money paid.', `Change = $${bill}.00 - \\text{total}$.`],
      solution: [
        s1[0],
        `Total: $${mv(p1 / 100)} + ${mv(p2 / 100)} = ${mv(t / 100)}$`,
        `Change: $${bill}.00 - ${mv(t / 100)} = ${mv(change)}$`,
        checkLine(change, bill - whole(p1 / 100) - whole(p2 / 100)),
        `${name} should get ${money(change)} in change.`,
      ],
    };
  },
  // Race times
  (rng) => {
    const [n1, n2] = rng.sample(NAMES, 2);
    const t1 = deci(rng, 12.4, 16.9, 2);
    const t2 = clean(t1 + deci(rng, 0.3, 2.4, rng.pick([1, 2])));
    const { steps, ans } = sumSteps([t2, t1], ['-']);
    return {
      prompt: `At a track meet in ${rng.pick(TOWNS)}, ${n1} ran the $100$ m in ${q(t1, 's')}. ${n2} ran it in ${q(t2, 's')}. How much faster was ${n1}?`,
      parts: [decPart(ans, 's')],
      hints: ['Subtract the smaller time from the larger time.', ALIGN],
      solution: [...steps, `${n1} was ${q(ans, 's')} faster.`],
    };
  },
];

const ADD_D3: Gen[] = [
  // Budget: add then subtract
  (rng) => {
    const name = rng.pick(NAMES);
    const budget = rng.pick([40, 50, 60, 75, 100]);
    const items = rng.sample([['a T-shirt', 1299, 2499], ['a ball cap', 1099, 2299], ['a phone case', 899, 1999], ['a book', 999, 1899], ['a pair of socks', 499, 999], ['earbuds', 1499, 2999]] as Array<[string, number, number]>, 3);
    const ps = retry(
      () => items.map(([, lo, hi]) => rng.int(Math.ceil(lo / 10), Math.floor(hi / 10)) * 10 + rng.pick([9, 9, 5, 9])),
      (v) => v.reduce((s, x) => s + x, 0) < budget * 100 - 150,
      100,
    );
    const t = ps.reduce((s, x) => s + x, 0);
    const left = (budget * 100 - t) / 100;
    const est = budget - ps.map((p) => whole(p / 100)).reduce((s, x) => s + x, 0);
    return {
      prompt: `${name} has \\$${budget} of birthday money. ${name} buys ${items.map(([t2], i) => `${t2} for ${money(ps[i] / 100)}`).join(', ').replace(/, ([^,]*)$/, ' and $1')}. How much money does ${name} have left?`,
      parts: [cashPart(left)],
      hints: ['First find the total cost. Then subtract it from the money ' + name + ' has.', 'Line up the decimal points. Write $' + budget + '$ as $' + budget + '.00$.'],
      solution: [
        `Estimate: $${budget} - (${ps.map((p) => whole(p / 100)).join(' + ')}) = ${est}$.`,
        `Total cost: $${ps.map((p) => mv(p / 100)).join(' + ')} = ${mv(t / 100)}$`,
        `Money left: $${budget}.00 - ${mv(t / 100)} = ${mv(left)}$`,
        checkLine(left, est),
        `${name} has ${money(left)} left.`,
      ],
    };
  },
  // Missing side of a triangle
  (rng) => {
    const a = deci(rng, 3.2, 9.8, rng.pick([1, 2]));
    const b = deci(rng, 3.2, 9.8, rng.pick([1, 2]));
    const c = deci(rng, Math.abs(a - b) + 1, a + b - 1, rng.pick([1, 2]));
    const P = clean(a + b + c);
    const { steps } = sumSteps([a, b], ['+']);
    const ab = clean(a + b);
    const est = whole(P) - whole(a) - whole(b);
    return {
      prompt: `A triangular garden bed has a perimeter of ${q(P, 'm')}. Two of its sides are ${q(a, 'm')} and ${q(b, 'm')} long. How long is the third side?`,
      parts: [decPart(c, 'm')],
      hints: ['The perimeter is the sum of all three sides.', 'Add the two sides you know, then subtract that from the perimeter.'],
      solution: [
        `Estimate: $${num(whole(P))} - ${num(whole(a))} - ${num(whole(b))} = ${num(est)}$.`,
        `Add the two known sides: ${steps[1].replace(/^Line up.*?: /, '').replace(/^Line up the decimal points and add: /, '')}`,
        `Subtract from the perimeter: $${fmtFixed(P, Math.max(dpOf(P), dpOf(ab)))} - ${fmtFixed(ab, Math.max(dpOf(P), dpOf(ab)))} = ${fmtFixed(c, Math.max(dpOf(P), dpOf(ab)))}$`,
        checkLine(c, est),
        `The third side is ${q(c, 'm')} long.`,
      ],
    };
  },
  // Relay vs record
  (rng) => {
    const team = rng.pick(['swim', 'track']);
    const times = team === 'swim' ? [0, 1, 2, 3].map(() => deci(rng, 31, 39, 2)) : [0, 1, 2, 3].map(() => deci(rng, 13.5, 16.5, 2));
    const total = clean(times.reduce((s, x) => s + x, 0));
    const record = clean(total + (rng.chance(0.5) ? 1 : -1) * deci(rng, 0.15, 2.4, 2));
    const beat = total < record;
    const diff = clean(Math.abs(record - total));
    return {
      prompt: `A ${team === 'swim' ? 'swim relay team swims $4 \\times 50$ m' : 'track relay team runs $4 \\times 100$ m'}. The four times are ${times.map((t) => q(t, 's')).join(', ')}. The school record is ${q(record, 's')}. Did the team beat the record, and by how much? Enter the difference between the team's total time and the record.`,
      parts: [part(fixedChoice(['The team beat the record.', 'The team did not beat the record.'], beat ? 0 : 1)), decPart(diff, 's', 'Difference:')],
      hints: ['Add the four times to get the team’s total time.', 'A smaller time is faster. Subtract the smaller time from the larger time.'],
      solution: [
        `Estimate the total: $${times.map((t) => whole(t)).join(' + ')} = ${times.map((t) => whole(t)).reduce((s, x) => s + x, 0)}$.`,
        `Total time: $${times.map((t) => fmtFixed(t, 2)).join(' + ')} = ${fmtFixed(total, 2)}$`,
        `${beat ? `$${fmtFixed(total, 2)} < ${fmtFixed(record, 2)}$, so the team was faster than the record.` : `$${fmtFixed(total, 2)} > ${fmtFixed(record, 2)}$, so the team was slower than the record.`}`,
        `Difference: $${fmtFixed(Math.max(total, record), 2)} - ${fmtFixed(Math.min(total, record), 2)} = ${fmtFixed(diff, 2)}$`,
        `The team ${beat ? 'beat' : 'missed'} the record by ${q(diff, 's')}.`,
      ],
    };
  },
];

const decimalAddSub = skill({
  id: 'm7-decimal-add-sub',
  name: 'Adding and subtracting decimals',
  description: 'Estimate, then add and subtract decimals and solve problems with sums and differences.',
  outcomes: ['N2'],
  lessonId: 'm7-2-1',
  calculator: false,
  gen(rng, d) {
    return rng.pick(d === 1 ? ADD_D1 : d === 2 ? ADD_D2 : ADD_D3)(rng);
  },
});

// ---------------------------------------------------------------------------
// 2.2 Multiplying decimals
// ---------------------------------------------------------------------------

/** Multiply a decimal by a one-digit whole number without a calculator. */
function mulSteps(a: number, k: number): { steps: string[]; ans: number } {
  const dp = dpOf(a);
  const A = Math.round(a * 10 ** dp);
  const P = A * k;
  const ans = clean(P / 10 ** dp);
  const e = near(a);
  const est = clean(e * k);
  const raw = String(P).padStart(dp + 1, '0');
  const withPoint = `${raw.slice(0, raw.length - dp)}.${raw.slice(raw.length - dp)}`;
  return {
    steps: [
      `Estimate: $${num(a)} \\times ${k} \\approx ${num(e)} \\times ${k} = ${num(est)}$.`,
      `Multiply as if there were no decimal point: $${A} \\times ${k} = ${P}$.`,
      `$${num(a)}$ has $${dp}$ decimal place${dp > 1 ? 's' : ''}, so the product has $${dp}$ decimal place${dp > 1 ? 's' : ''}: $${withPoint}${withPoint !== num(ans) ? ` = ${num(ans)}` : ''}$.`,
      checkLine(ans, est),
    ],
    ans,
  };
}

const MUL_HINT = 'Estimate first. Then multiply as if there were no decimal points, and count the decimal places.';

const MUL_D1: Gen[] = [
  (rng) => {
    const a = deci(rng, 1.2, 25, rng.pick([1, 2]));
    const k = rng.int(3, 9);
    const { steps, ans } = mulSteps(a, k);
    return {
      prompt: `Estimate, then calculate without a calculator: $${num(a)} \\times ${k}$`,
      parts: [decPart(ans)],
      hints: [MUL_HINT, `The product has as many decimal places as $${num(a)}$.`],
      solution: [...steps, `$${num(a)} \\times ${k} = ${num(ans)}$`],
    };
  },
  (rng) => {
    const name = rng.pick(NAMES);
    const k = rng.int(3, 8);
    const [thing, lo, hi] = rng.pick([['rolls of hockey tape', 2.49, 4.99], ['granola bars', 1.25, 2.75], ['bottles of water', 1.15, 2.45], ['packs of trading cards', 3.25, 6.99], ['muffins at a bake sale', 1.5, 3.25]] as Array<[string, number, number]>);
    const p = deci(rng, lo, hi, 2);
    const { steps, ans } = mulSteps(p, k);
    return {
      prompt: `${name} buys $${k}$ ${thing}. Each one costs ${money(p)}. What is the total cost?`,
      parts: [cashPart(ans)],
      hints: ['Several items at the same price: multiply.', MUL_HINT],
      solution: [...steps, `The total cost is ${money(ans)}.`],
    };
  },
  (rng) => {
    const name = rng.pick(NAMES);
    const lap = rng.pick([0.4, 0.25, 0.8, 1.2, 0.35, 1.6, 2.5]);
    const k = rng.int(3, 9);
    const { steps, ans } = mulSteps(lap, k);
    return {
      prompt: `One lap of the trail at a park in ${rng.pick(TOWNS)} is ${q(lap, 'km')}. ${name} runs $${k}$ laps. How far does ${name} run?`,
      parts: [decPart(ans, 'km')],
      hints: ['Equal laps: multiply the length of one lap by the number of laps.', MUL_HINT],
      solution: [...steps, `${name} runs ${q(ans, 'km')}.`],
    };
  },
  (rng) => {
    const name = rng.pick(NAMES);
    const [what, one, lo, hi] = rng.pick([['bags of rice for the food bank', 'bag', 0.9, 2.4], ['bags of bird seed', 'bag', 1.2, 2.8], ['blocks of cheese for a pizza night', 'block', 0.25, 0.75], ['bags of carrots', 'bag', 0.9, 2.3], ['bags of apples', 'bag', 1.15, 2.85]] as Array<[string, string, number, number]>);
    const m = deci(rng, lo, hi, 2);
    const k = rng.int(3, 9);
    const { steps, ans } = mulSteps(m, k);
    return {
      prompt: `${name} buys $${k}$ ${what}. Each ${one} has a mass of ${q(m, 'kg')}. What is the total mass?`,
      parts: [decPart(ans, 'kg')],
      hints: ['Several equal masses: multiply.', MUL_HINT],
      solution: [...steps, `The total mass is ${q(ans, 'kg')}.`],
    };
  },
];

const GAS = [1.299, 1.329, 1.359, 1.389, 1.419, 1.449, 1.479, 1.509];
const WAGES = [15.25, 15.5, 15.75, 16.2, 16.4, 16.75];

/** Working for a calculator product: estimate, calculate, round, check. */
function calcProduct(a: number, b: number, est: [number, number], dp?: number): string[] {
  const p = a * b;
  const e = clean(est[0] * est[1]);
  return [
    `Estimate: $${num(a)} \\times ${num(b)} \\approx ${num(est[0])} \\times ${num(est[1])} = ${num(e)}$.`,
    `Use a calculator: $${num(a)} \\times ${num(b)} ${eq(p, 6)}$`,
    ...(dp !== undefined && !exactAt(p, dp) ? [`Round to $${dp}$ decimal places: $${fmtFixed(p, dp)}$.`] : []),
    checkLine(p, e),
  ];
}

const MUL_D2: Gen[] = [
  // Area of a rectangle
  (rng) => {
    const L = deci(rng, 3.2, 12.8, rng.pick([1, 2]));
    const W = deci(rng, 2.1, 9.6, 1);
    const A = clean(L * W);
    return {
      prompt: `A rectangular deck is ${q(L, 'm')} long and ${q(W, 'm')} wide. What is its area? Area of a rectangle = length × width.`,
      parts: [decPart(A, 'm²')],
      hints: ['Multiply the length by the width.', 'Estimate first, then use a calculator.'],
      solution: [...calcProduct(L, W, [near(L), near(W)]), `The area is $${num(A, 6)}\\ ${tx('m')}^2$.`],
      calculator: true,
    };
  },
  // Gas
  (rng) => {
    const name = rng.pick(NAMES);
    const price = rng.pick(GAS);
    const L = retry(() => rng.int(250, 680) / 10, (x) => !onEdge(x * price, 2) && x % 1 !== 0);
    const cost = L * price;
    return {
      prompt: `${name}’s family fills up the car in ${rng.pick(TOWNS)}. Gas costs \\$${fmtFixed(price, 3)} per litre, and they buy ${q(L, 'L')}. What is the cost, ${CENT}?`,
      parts: [moneyPart(cost)],
      hints: ['Cost = litres × price for one litre.', 'Estimate first. Then use a calculator and round to $2$ decimal places.'],
      solution: [...calcProduct(L, price, [near(L), near(price)], 2), `The gas costs ${money(cost)}.`],
      calculator: true,
    };
  },
  // Wages
  (rng) => {
    const name = rng.pick(NAMES);
    const w = rng.pick(WAGES);
    const h = retry(() => rng.pick([3.5, 4.5, 5.25, 5.75, 6.5, 7.25, 7.5, 12.5, 14.25, 18.75]), (x) => !onEdge(x * w, 2));
    const pay = h * w;
    return {
      prompt: `${name}’s older cousin earns ${money(w)} per hour at a garden centre and works $${num(h)}$ hours. How much does the cousin earn, ${CENT}?`,
      parts: [moneyPart(pay)],
      hints: ['Pay = hours × pay for one hour.', 'Estimate first. Then use a calculator.'],
      solution: [...calcProduct(h, w, [near(h), near(w)], 2), `The cousin earns ${money(pay)}.`],
      calculator: true,
    };
  },
  // Place the decimal point with an estimate
  (rng) => {
    const a = deci(rng, 2.1, 9.8, 1);
    const b = deci(rng, 1.15, 8.95, 2);
    const p = clean(a * b);
    const e = clean(near(a) * near(b));
    const shift = (k: number) => num(clean(p * 10 ** k), 6);
    return {
      prompt: `Use an estimate to choose the correct product. $$${num(a)} \\times ${num(b)}$$`,
      parts: [part(mc(rng, `$${num(p, 6)}$`, [`$${shift(-1)}$`, `$${shift(1)}$`, `$${shift(-2)}$`, `$${shift(2)}$`]))],
      hints: ['Round each factor to a friendly number and multiply.', 'Pick the choice that is closest to your estimate.'],
      solution: [`Estimate: $${num(a)} \\times ${num(b)} \\approx ${num(near(a))} \\times ${num(near(b))} = ${num(e)}$.`, `The choices have the same digits; only the decimal point moves. The one close to $${num(e)}$ is $${num(p, 6)}$.`, `So $${num(a)} \\times ${num(b)} = ${num(p, 6)}$.`],
      calculator: false,
    };
  },
];

const MUL_D3: Gen[] = [
  // Carpet
  (rng) => {
    const L = deci(rng, 3.1, 6.8, 1);
    const W = deci(rng, 2.6, 5.4, 1);
    const price = rng.pick([18.95, 24.5, 29.99, 32.75, 21.49, 27.25]);
    const A = clean(L * W);
    const cost = A * price;
    if (onEdge(cost, 2)) return MUL_D3[1](rng);
    return {
      prompt: `A bedroom floor is a rectangle ${q(L, 'm')} long and ${q(W, 'm')} wide. New flooring costs ${money(price)} per square metre. How much will the flooring cost, ${CENT}?`,
      parts: [moneyPart(cost)],
      hints: ['First find the area of the floor: length × width.', 'Then multiply the area by the price for one square metre.'],
      solution: [
        `Estimate: area $\\approx ${num(near(L))} \\times ${num(near(W))} = ${num(near(L) * near(W))}$, and $${num(near(L) * near(W))} \\times ${num(near(price))} = ${num(clean(near(L) * near(W) * near(price)))}$.`,
        `Area: $${num(L)} \\times ${num(W)} = ${num(A)}\\ ${tx('m')}^2$`,
        `Cost: $${num(A)} \\times ${mv(price)} ${eq(cost)}$`,
        `Round to the nearest cent: ${money(cost)}.`,
        checkLine(cost, near(L) * near(W) * near(price)),
        `The flooring will cost ${money(cost)}.`,
      ],
      calculator: true,
    };
  },
  // Weekend wages
  (rng) => {
    const name = rng.pick(NAMES);
    const w = rng.pick(WAGES);
    const [h1, h2] = retry(() => rng.sample([3.5, 3.75, 4.5, 5.25, 6, 6.5, 7.25, 7.5, 8], 2), ([a, b]) => !onEdge((a + b) * w, 2));
    const h = h1 + h2;
    const pay = h * w;
    return {
      prompt: `${name}’s older sister works at a grocery store. She works $${num(h1)}$ hours on Saturday and $${num(h2)}$ hours on Sunday. She earns ${money(w)} per hour. How much does she earn for the weekend, ${CENT}?`,
      parts: [moneyPart(pay)],
      hints: ['First add the hours.', 'Then multiply the total hours by the pay for one hour.'],
      solution: [
        `Estimate: about $${Math.round(h)}$ hours at about \\$${Math.round(w)} per hour is about $${Math.round(h) * Math.round(w)}$ dollars.`,
        `Total hours: $${num(h1)} + ${num(h2)} = ${num(h)}$`,
        `Pay: $${num(h)} \\times ${mv(w)} ${eq(pay)}$`,
        `Round to the nearest cent: ${money(pay)}.`,
        checkLine(pay, Math.round(h) * Math.round(w)),
        `She earns ${money(pay)} for the weekend.`,
      ],
      calculator: true,
    };
  },
  // Two grocery items by mass
  (rng) => {
    const name = rng.pick(NAMES);
    const [a, b] = rng.sample([['apples', [2.49, 2.99, 3.49]], ['grapes', [4.99, 5.49, 6.49]], ['bananas', [1.49, 1.69, 1.79]], ['carrots', [1.29, 1.49, 1.99]], ['ground beef', [9.99, 10.49, 11.99]]] as Array<[string, number[]]>, 2);
    const pa = rng.pick(a[1]);
    const pb = rng.pick(b[1]);
    const [ka, kb] = retry(() => [rng.int(55, 360) / 100, rng.int(5, 30) / 10], ([x, y]) => {
      const ca = roundTo(x * pa, 2);
      const cb = roundTo(y * pb, 2);
      return !onEdge(x * pa, 2) && !onEdge(y * pb, 2) && Math.abs(ca + cb - (x * pa + y * pb)) < 0.006 && x * 10 % 1 !== 0;
    });
    const ca = roundTo(ka * pa, 2);
    const cb = roundTo(kb * pb, 2);
    const total = clean(ca + cb);
    const est = clean(near(ka) * near(pa) + near(kb) * near(pb));
    return {
      prompt: `${name} buys ${q(ka, 'kg')} of ${a[0]} at ${money(pa)} per kilogram and ${q(kb, 'kg')} of ${b[0]} at ${money(pb)} per kilogram. What is the total cost, ${CENT}?`,
      parts: [moneyPart(total)],
      hints: ['Find the cost of each item: mass × price per kilogram.', 'Round each cost to the nearest cent, then add.'],
      solution: [
        `Estimate: $${num(near(ka))} \\times ${num(near(pa))} + ${num(near(kb))} \\times ${num(near(pb))} = ${num(est)}$.`,
        `${cap(a[0])}: $${num(ka)} \\times ${mv(pa)} ${eq(ka * pa)}$, about ${money(ca)}.`,
        `${cap(b[0])}: $${num(kb)} \\times ${mv(pb)} ${eq(kb * pb)}$, about ${money(cb)}.`,
        `Total: $${mv(ca)} + ${mv(cb)} = ${mv(total)}$`,
        checkLine(total, est),
        `The total cost is ${money(total)}.`,
      ],
      calculator: true,
    };
  },
  // Fencing
  (rng) => {
    const L = deci(rng, 6.5, 18.5, 1);
    const W = deci(rng, 4.2, 12.8, 1);
    const price = rng.pick([12.49, 15.75, 18.99, 22.5, 9.95]);
    const P = clean(2 * L + 2 * W);
    const cost = P * price;
    if (onEdge(cost, 2)) return MUL_D3[0](rng);
    const est = clean(near(P) * near(price));
    return {
      prompt: `A rectangular dog run is ${q(L, 'm')} long and ${q(W, 'm')} wide. Fencing costs ${money(price)} per metre. How much does fencing for all four sides cost, ${CENT}?`,
      parts: [moneyPart(cost)],
      hints: ['First find the perimeter: add all four sides.', 'Then multiply the perimeter by the price for one metre.'],
      solution: [
        `Perimeter: $${num(L)} + ${num(W)} + ${num(L)} + ${num(W)} = ${num(P)}\\ ${tx('m')}$`,
        `Estimate the cost: $${num(near(P))} \\times ${num(near(price))} = ${num(est)}$.`,
        `Cost: $${num(P)} \\times ${mv(price)} ${eq(cost)}$`,
        `Round to the nearest cent: ${money(cost)}.`,
        checkLine(cost, est),
        `The fencing costs ${money(cost)}.`,
      ],
      calculator: true,
    };
  },
];

const decimalMultiply = skill({
  id: 'm7-decimal-multiply',
  name: 'Multiplying decimals',
  description: 'Estimate, then multiply decimals: by a one-digit number by hand, and with technology for larger multipliers.',
  outcomes: ['N2'],
  lessonId: 'm7-2-2',
  calculator: false,
  gen(rng, d) {
    return rng.pick(d === 1 ? MUL_D1 : d === 2 ? MUL_D2 : MUL_D3)(rng);
  },
});

// ---------------------------------------------------------------------------
// 2.2 Dividing decimals
// ---------------------------------------------------------------------------

const PLACE_WORD = ['ones', 'tenths', 'hundredths', 'thousandths'];

/** Divide a decimal by a one-digit whole number without a calculator. */
function divSteps(a: number, k: number): { steps: string[]; ans: number } {
  const ans = clean(a / k);
  const dp = Math.max(dpOf(ans), dpOf(a));
  const A = Math.round(a * 10 ** dp);
  const Q = Math.round(ans * 10 ** dp);
  const qe = ans >= 1 ? Math.round(ans) : Math.max(0.1, roundTo(ans, 1));
  const ae = clean(qe * k);
  const written = fmtFixed(a, dp);
  return {
    steps: [
      `Estimate with numbers that divide easily: $${num(a)} \\div ${k} \\approx ${num(ae)} \\div ${k} = ${num(qe)}$.`,
      `${dp > dpOf(a) ? `Write $${num(a)}$ as $${written}$. ` : ''}Think of $${written}$ as $${A}$ ${PLACE_WORD[dp]}: $${A} \\div ${k} = ${Q}$, so the answer is $${Q}$ ${PLACE_WORD[dp]}, or $${num(ans)}$.`,
      `Check by multiplying: $${num(ans)} \\times ${k} = ${num(a)}$. ${checkLine(ans, qe).replace('Check: ', '')}`,
    ],
    ans,
  };
}

const DIV_HINT = 'Estimate first. Then divide as with whole numbers, and keep the decimal point in the same place.';

/** A decimal a with at most 2 places such that a ÷ k ends within 2 places. */
function divisible(rng: Rng, k: number, lo: number, hi: number, dp: number): number {
  return retry(
    () => (k * rng.int(Math.ceil((lo * 10 ** dp) / k), Math.floor((hi * 10 ** dp) / k))) / 10 ** dp,
    (a) => dpOf(a) >= 1 && dpOf(a / k) <= 2,
  );
}

const DIV_D1: Gen[] = [
  (rng) => {
    const k = rng.int(2, 9);
    const a = divisible(rng, k, 2, 60, rng.pick([1, 2]));
    const { steps, ans } = divSteps(a, k);
    return {
      prompt: `Estimate, then calculate without a calculator: $${num(a)} \\div ${k}$`,
      parts: [decPart(ans)],
      hints: [DIV_HINT, 'Line up the decimal point in the quotient directly above the decimal point in the number you are dividing.'],
      solution: [...steps, `$${num(a)} \\div ${k} = ${num(ans)}$`],
    };
  },
  (rng) => {
    const name = rng.pick(NAMES);
    const n = rng.int(2, 6);
    const per = rng.int(450, 1890) / 100;
    const total = clean(per * n);
    const { steps, ans } = divSteps(total, n);
    const what = rng.pick(['a pizza order', 'a bill at a restaurant', 'the cost of a gift for their coach', 'a tank of gas for a road trip to the mountains', 'a cab ride home from a hockey game']);
    return {
      prompt: `${name} and ${n === 2 ? 'a friend' : `$${n - 1}$ friends`} share the cost of ${what} equally. The cost is ${money(total)}. How much does each person pay?`,
      parts: [cashPart(ans)],
      hints: [`Count ${name} too: there are $${n}$ people.`, DIV_HINT],
      solution: [`There are $${n}$ people, so divide by $${n}$.`, ...steps, `Each person pays ${money(ans)}.`],
    };
  },
  (rng) => {
    const name = rng.pick(NAMES);
    const k = rng.int(2, 8);
    const L = divisible(rng, k, 1.2, 15, rng.pick([1, 2]));
    const { steps, ans } = divSteps(L, k);
    const what = rng.pick(['a rope', 'a ribbon', 'a board', 'a piece of string for a craft']);
    return {
      prompt: `${name} cuts ${what} that is ${q(L, 'm')} long into $${k}$ equal pieces. How long is each piece?`,
      parts: [decPart(ans, 'm')],
      hints: ['Equal pieces: divide.', DIV_HINT],
      solution: [...steps, `Each piece is ${q(ans, 'm')} long.`],
    };
  },
];

const DIV_D2: Gen[] = [
  // Unit price, exact
  (rng) => {
    const item = rng.pick(['apples', 'cherries', 'cheddar cheese', 'chicken breasts', 'potatoes', 'trail mix']);
    const kg = rng.pick([1.2, 1.5, 2.4, 2.5, 0.8, 1.6, 0.75, 3.2]);
    const per = retry(() => rng.int(180, 1890) / 100, (x) => dpOf(x * kg) <= 2);
    const price = clean(per * kg);
    const kr = kg >= 1 ? Math.round(kg) : 1;
    const e = roundTo(near(price) / kr, 1);
    return {
      prompt: `A bag with ${q(kg, 'kg')} of ${item} costs ${money(price)}. What is the price per kilogram?`,
      parts: [cashPart(per)],
      hints: ['Price per kilogram = price ÷ mass.', 'Estimate first. Then use a calculator.'],
      solution: [
        `Estimate: $${num(price)} \\div ${num(kg)} \\approx ${num(near(price))} \\div ${kr} \\approx ${num(e)}$.`,
        `Use a calculator: $${mv(price)} \\div ${num(kg)} = ${num(per)}$`,
        checkLine(per, e),
        `The ${item} cost ${money(per)} per kilogram.`,
      ],
      calculator: true,
    };
  },
  // Speed
  (rng) => {
    const name = rng.pick(NAMES);
    const t = rng.pick([1.5, 2.5, 3.5, 2.25, 1.75, 4.5]);
    const v = rng.int(48, 98);
    const dist = clean(v * t);
    const [from, to] = rng.sample(['Riverton', 'Lakeside', 'Hillcrest', 'Westbury', 'Ashford', 'Pinewood', 'Maple Falls', 'Brookfield'], 2);
    return {
      prompt: `${name}’s family drives ${q(dist, 'km')} from ${from} to ${to}. The trip takes ${q(t, 'h')}. What is their average speed in kilometres per hour?`,
      parts: [decPart(v, 'km/h')],
      hints: ['Speed = distance ÷ time.', 'Estimate first. Then use a calculator.'],
      solution: [
        `Estimate: $${num(dist)} \\div ${num(t)} \\approx ${num(near(dist))} \\div ${num(near(t))} \\approx ${num(Math.round(near(dist) / near(t)))}$.`,
        `Use a calculator: $${num(dist)} \\div ${num(t)} = ${v}$`,
        checkLine(v, Math.round(near(dist) / near(t))),
        `Their average speed is $${v}$ km/h.`,
      ],
      calculator: true,
    };
  },
  // Rounded quotient
  (rng) => {
    const a = deci(rng, 12, 95, rng.pick([1, 2]));
    const b = deci(rng, 1.2, 9.8, 1);
    const v = a / b;
    if (onEdge(v, 2) || exactAt(v, 2)) return DIV_D2[2](rng);
    const e = sig1(near(a) / near(b));
    return {
      prompt: `Use a calculator to find $${num(a)} \\div ${num(b)}$. Round to the nearest hundredth.`,
      parts: [numPart(v, { decimals: 2 })],
      hints: ['Estimate first so you can check the calculator answer.', 'Look at the thousandths digit to round to the hundredths.'],
      solution: [
        `Estimate: $${num(a)} \\div ${num(b)} \\approx ${num(near(a))} \\div ${num(near(b))} \\approx ${num(e)}$.`,
        `Calculator: $${num(a)} \\div ${num(b)} = ${fmt(v, 5)}\\ldots$`,
        `The thousandths digit is $${Math.floor(v * 1000) % 10}$, so ${Math.floor(v * 1000) % 10 >= 5 ? 'round up' : 'keep the hundredths digit'}: $${fmtFixed(v, 2)}$.`,
        checkLine(v, e),
        `$${num(a)} \\div ${num(b)} \\approx ${fmtFixed(v, 2)}$`,
      ],
      calculator: true,
    };
  },
  // How many pieces
  (rng) => {
    const piece = rng.pick([0.25, 0.4, 0.6, 0.75, 1.2, 1.5, 0.35, 0.45]);
    const n = rng.int(6, 24);
    const L = clean(piece * n);
    const name = rng.pick(NAMES);
    const what = rng.pick([['ribbon', 'bows'], ['wood trim', 'picture frame sides'], ['rope', 'skipping ropes'], ['fabric', 'scarves']]);
    return {
      prompt: `${name} has ${q(L, 'm')} of ${what[0]}. Each of the ${what[1]} needs ${q(piece, 'm')}. How many ${what[1]} can ${name} make?`,
      parts: [numPart(n, { suffix: what[1] })],
      hints: ['Divide the total length by the length of one piece.', 'Estimate first, then use a calculator.'],
      solution: [
        `Estimate: $${num(L)} \\div ${num(piece)} \\approx ${num(near(L))} \\div ${num(near(piece))} \\approx ${num(Math.round(near(L) / near(piece)))}$.`,
        `Use a calculator: $${num(L)} \\div ${num(piece)} = ${n}$`,
        checkLine(n, Math.round(near(L) / near(piece))),
        `${name} can make $${n}$ ${what[1]}.`,
      ],
      calculator: true,
    };
  },
];

const DIV_D3: Gen[] = [
  // Full bottles
  (rng) => {
    const size = rng.pick([0.75, 0.6, 0.355, 0.5, 1.5, 0.45]);
    const total = retry(() => deci(rng, 6, 24, 1), (x) => Math.abs(x / size - Math.round(x / size)) > 0.08);
    const raw = total / size;
    const full = Math.floor(raw);
    return {
      prompt: `The Grade 7 class made ${q(total, 'L')} of lemonade for a fundraiser. They pour it into bottles that hold ${q(size, 'L')} each. How many bottles can they fill completely?`,
      parts: [numPart(full, { suffix: 'bottles' })],
      hints: ['Divide the total amount by the size of one bottle.', 'Only full bottles count, so think about what to do with the decimal part.'],
      solution: [
        `Estimate: $${num(total)} \\div ${num(size)} \\approx ${num(near(total))} \\div ${num(near(size))} \\approx ${num(Math.round(near(total) / near(size)))}$.`,
        `Use a calculator: $${num(total)} \\div ${num(size)} ${exactAt(raw, 3) ? `= ${num(raw)}` : `= ${fmt(raw, 3)}\\ldots`}$`,
        `The decimal part is not a full bottle. Round **down**: they can fill $${full}$ bottles.`,
        `They can fill $${full}$ bottles completely.`,
      ],
      calculator: true,
    };
  },
  // Better buy
  (rng) => {
    const item = rng.pick(['rice', 'oats', 'flour', 'dog food', 'bird seed']);
    const [m1, m2] = rng.sample([1.5, 2, 2.5, 4, 5, 8, 10], 2).sort((a, b) => a - b);
    const per1 = rng.int(140, 450) / 100;
    const per2 = clean(per1 + (rng.chance(0.5) ? 1 : -1) * rng.int(12, 60) / 100);
    const p1 = roundTo(m1 * per1, 2);
    const p2 = roundTo(m2 * per2, 2);
    const u1 = p1 / m1;
    const u2 = p2 / m2;
    if (onEdge(u1, 2) || onEdge(u2, 2) || Math.abs(roundTo(u1, 2) - roundTo(u2, 2)) < 0.05) return DIV_D3[1](rng);
    const better = u1 < u2 ? 0 : 1;
    return {
      prompt: `A store sells ${item} in two sizes: ${art(m1)} ${q(m1, 'kg')} bag for ${money(p1)} and ${art(m2)} ${q(m2, 'kg')} bag for ${money(p2)}. Find the price per kilogram of each bag, ${CENT}. Which bag is the better buy?`,
      parts: [
        moneyPart(u1, `Small bag (\\$ per kg)`),
        moneyPart(u2, `Large bag (\\$ per kg)`),
        part(fixedChoice([`The ${num(m1)} kg bag`, `The ${num(m2)} kg bag`], better), { label: 'Better buy:' }),
      ],
      hints: ['Price per kilogram = price ÷ mass.', 'The better buy has the lower price per kilogram.'],
      solution: [
        `Estimate: the small bag is about $${num(near(p1))} \\div ${num(m1)} \\approx ${num(roundTo(near(p1) / m1, 1))}$ dollars per kilogram.`,
        `Small bag: $${mv(p1)} \\div ${num(m1)} ${eq(u1)}$, about ${money(u1)} per kilogram.`,
        `Large bag: $${mv(p2)} \\div ${num(m2)} ${eq(u2)}$, about ${money(u2)} per kilogram.`,
        `${money(Math.min(u1, u2))} < ${money(Math.max(u1, u2))}, so the ${num(better === 0 ? m1 : m2)} kg bag is the better buy.`,
      ],
      calculator: true,
    };
  },
  // Fuel use
  (rng) => {
    const name = rng.pick(NAMES);
    const L = deci(rng, 28, 62, 1);
    const kmPerL = rng.int(85, 160) / 10;
    const km = retry(() => Math.round(L * kmPerL * 10 + rng.int(-4, 4)) / 10, (x) => !onEdge(x / L, 1));
    const v = km / L;
    return {
      prompt: `On a road trip from ${rng.pick(TOWNS)}, ${name}’s family drove ${q(km, 'km')} and used ${q(L, 'L')} of gas. How many kilometres did they drive for each litre of gas? Round to the nearest tenth.`,
      parts: [numPart(v, { decimals: 1, suffix: 'km/L' })],
      hints: ['Kilometres for each litre = kilometres ÷ litres.', 'Use a calculator, then round to $1$ decimal place.'],
      solution: [
        `Estimate: $${num(km)} \\div ${num(L)} \\approx ${num(near(km))} \\div ${num(near(L))} \\approx ${num(roundTo(near(km) / near(L), 0))}$.`,
        `Use a calculator: $${num(km)} \\div ${num(L)} = ${fmt(v, 4)}\\ldots$`,
        `Round to the nearest tenth: $${fmtFixed(v, 1)}$.`,
        `They drove about $${fmtFixed(v, 1)}$ km for each litre of gas.`,
      ],
      calculator: true,
    };
  },
  // Bill plus tip, shared
  (rng) => {
    const name = rng.pick(NAMES);
    const n = rng.int(3, 6);
    const tip = rng.int(6, 15);
    const bill = retry(() => rng.int(4200, 11800), (c) => (c + tip * 100) % n !== 0 && !onEdge((c / 100 + tip) / n, 2));
    const total = bill / 100 + tip;
    const per = total / n;
    return {
      prompt: `${name} and $${n - 1}$ friends eat at a restaurant in ${rng.pick(TOWNS)}. The bill is ${money(bill / 100)}, and they leave a \\$${tip} tip. They share the bill and the tip equally. How much does each person pay, ${CENT}?`,
      parts: [moneyPart(per)],
      hints: ['First add the tip to the bill.', `Then divide the total by $${n}$ (remember to count ${name}).`],
      solution: [
        `Estimate: about $${near(total)} \\div ${n} \\approx ${num(roundTo(near(total) / n, 0))}$ dollars each.`,
        `Total: $${mv(bill / 100)} + ${tip}.00 = ${mv(total)}$`,
        `Share: $${mv(total)} \\div ${n} ${eq(per)}$`,
        `Round to the nearest cent: ${money(per)}.`,
        `Each person pays ${money(per)}.`,
      ],
      calculator: true,
    };
  },
];

const decimalDivide = skill({
  id: 'm7-decimal-divide',
  name: 'Dividing decimals',
  description: 'Estimate, then divide decimals: by a one-digit number by hand, and with technology for larger divisors.',
  outcomes: ['N2'],
  lessonId: 'm7-2-2',
  calculator: false,
  gen(rng, d) {
    return rng.pick(d === 1 ? DIV_D1 : d === 2 ? DIV_D2 : DIV_D3)(rng);
  },
});

// ---------------------------------------------------------------------------
// 2.3 Order of operations
// ---------------------------------------------------------------------------

const BEDMAS = 'Order of operations: brackets first, then multiply and divide from left to right, then add and subtract from left to right.';

interface OpsForm {
  tex: (v: number[]) => string;
  /** Rounded numbers that keep a division friendly; by default each decimal is rounded to a whole number. */
  est?: (v: number[]) => number[];
  make: (rng: Rng) => number[];
  steps: (v: number[]) => Array<[string, number]>;
}

const t1 = (rng: Rng, lo: number, hi: number) => deci(rng, lo, hi, 1);

const OPS1: OpsForm[] = [
  {
    make: (rng) => [t1(rng, 1.2, 9.8), t1(rng, 0.2, 4.8), rng.int(2, 5)],
    tex: ([a, b, c]) => `${num(a)} + ${num(b)} \\times ${c}`,
    steps: ([a, b, c]) => [[`Multiply first: $${num(b)} \\times ${c} = ${num(b * c)}$`, b * c], [`Then add: $${num(a)} + ${num(b * c)} = ${num(a + b * c)}$`, a + b * c]],
  },
  {
    make: (rng) => {
      const b = t1(rng, 0.2, 2.4);
      const c = rng.int(2, 4);
      return [t1(rng, b * c + 0.5, b * c + 9), b, c];
    },
    tex: ([a, b, c]) => `${num(a)} - ${num(b)} \\times ${c}`,
    steps: ([a, b, c]) => [[`Multiply first: $${num(b)} \\times ${c} = ${num(b * c)}$`, b * c], [`Then subtract: $${num(a)} - ${num(b * c)} = ${num(a - b * c)}$`, a - b * c]],
  },
  {
    make: (rng) => [t1(rng, 1.2, 6.8), t1(rng, 0.3, 4.8), rng.int(2, 5)],
    tex: ([a, b, c]) => `(${num(a)} + ${num(b)}) \\times ${c}`,
    steps: ([a, b, c]) => [[`Brackets first: $${num(a)} + ${num(b)} = ${num(a + b)}$`, a + b], [`Then multiply: $${num(a + b)} \\times ${c} = ${num((a + b) * c)}$`, (a + b) * c]],
  },
  {
    make: (rng) => {
      const b = t1(rng, 0.4, 5.6);
      return [t1(rng, b + 0.5, b + 8), b, rng.int(2, 4)];
    },
    tex: ([a, b, c]) => `(${num(a)} - ${num(b)}) \\times ${c}`,
    steps: ([a, b, c]) => [[`Brackets first: $${num(a)} - ${num(b)} = ${num(a - b)}$`, a - b], [`Then multiply: $${num(a - b)} \\times ${c} = ${num((a - b) * c)}$`, (a - b) * c]],
  },
  {
    make: (rng) => {
      const k = rng.int(2, 5);
      return [clean(k * t1(rng, 0.6, 4.8)), k, t1(rng, 0.2, 6.8)];
    },
    tex: ([a, k, b]) => `${num(a)} \\div ${k} + ${num(b)}`,
    est: ([a, k, b]) => [k * Math.max(1, Math.round(a / k)), k, whole(b)],
    steps: ([a, k, b]) => [[`Divide first: $${num(a)} \\div ${k} = ${num(a / k)}$`, a / k], [`Then add: $${num(a / k)} + ${num(b)} = ${num(a / k + b)}$`, a / k + b]],
  },
];

const OPS2: OpsForm[] = [
  {
    make: (rng) => {
      const a = rng.pick([2, 3, 4, 0.5, 1.5]);
      const b = t1(rng, 1.1, 4.8);
      const c = t1(rng, 0.2, 3.6);
      return [a, b, c, t1(rng, 0.1, Math.min(4, a * (b + c) - 0.2))];
    },
    tex: ([a, b, c, d]) => `${num(a)} \\times (${num(b)} + ${num(c)}) - ${num(d)}`,
    steps: ([a, b, c, d]) => [
      [`Brackets: $${num(b)} + ${num(c)} = ${num(b + c)}$`, b + c],
      [`Multiply: $${num(a)} \\times ${num(b + c)} = ${num(a * (b + c))}$`, a * (b + c)],
      [`Subtract: $${num(a * (b + c))} - ${num(d)} = ${num(a * (b + c) - d)}$`, a * (b + c) - d],
    ],
  },
  {
    make: (rng) => {
      const c = rng.pick([0.2, 0.4, 0.5, 2, 4, 5]);
      const b = clean(c * rng.int(2, 12));
      const a = t1(rng, b / c + 0.4, b / c + 9);
      return [a, b, c, t1(rng, 0.3, 6.6)];
    },
    tex: ([a, b, c, d]) => `${num(a)} - ${num(b)} \\div ${num(c)} + ${num(d)}`,
    est: ([a, b, c, d]) => [whole(a), b, c, whole(d)],
    steps: ([a, b, c, d]) => [
      [`Divide first: $${num(b)} \\div ${num(c)} = ${num(b / c)}$`, b / c],
      [`Then add and subtract from left to right: $${num(a)} - ${num(b / c)} = ${num(a - b / c)}$`, a - b / c],
      [`$${num(a - b / c)} + ${num(d)} = ${num(a - b / c + d)}$`, a - b / c + d],
    ],
  },
  {
    make: (rng) => [rng.int(2, 6), t1(rng, 0.3, 4.8), t1(rng, 0.2, 3.5), rng.int(2, 5)],
    tex: ([a, b, c, d]) => `${num(a)} \\times ${num(b)} + ${num(c)} \\times ${num(d)}`,
    steps: ([a, b, c, d]) => [
      [`Multiply: $${num(a)} \\times ${num(b)} = ${num(a * b)}$`, a * b],
      [`Multiply: $${num(c)} \\times ${num(d)} = ${num(c * d)}$`, c * d],
      [`Add: $${num(a * b)} + ${num(c * d)} = ${num(a * b + c * d)}$`, a * b + c * d],
    ],
  },
  {
    make: (rng) => {
      const c = rng.int(2, 5);
      const s = clean(c * t1(rng, 1.1, 4.4));
      const a = t1(rng, 0.5, s - 0.5);
      const b = clean(s - a);
      return [a, b, c, t1(rng, 0.1, Math.max(0.2, s / c - 0.3))];
    },
    tex: ([a, b, c, d]) => `(${num(a)} + ${num(b)}) \\div ${c} - ${num(d)}`,
    est: ([a, b, c, d]) => {
      const A = whole(a);
      const S = c * Math.max(1, Math.round((a + b) / c));
      return [A, S - A, c, d < 1 ? roundTo(d, 1) : whole(d)];
    },
    steps: ([a, b, c, d]) => [
      [`Brackets: $${num(a)} + ${num(b)} = ${num(a + b)}$`, a + b],
      [`Divide: $${num(a + b)} \\div ${c} = ${num((a + b) / c)}$`, (a + b) / c],
      [`Subtract: $${num((a + b) / c)} - ${num(d)} = ${num((a + b) / c - d)}$`, (a + b) / c - d],
    ],
  },
];

function opsItem(rng: Rng, forms: OpsForm[]): Out {
  const f = rng.pick(forms);
  const v = retry(
    () => f.make(rng),
    (x) => {
      const st = f.steps(x);
      return st.every(([, r]) => r > 0 && dpOf(r) <= 3) && x.every((y) => y > 0) && x.every((y) => dpOf(y) <= 2);
    },
    200,
  );
  const st = f.steps(v);
  const ans = clean(st[st.length - 1][1]);
  const ev = f.est ? f.est(v) : v.map((x) => (Number.isInteger(x) ? x : whole(x)));
  const evSteps = f.steps(ev);
  const est = clean(evSteps[evSteps.length - 1][1]);
  return {
    prompt: `Evaluate. $$${f.tex(v)}$$`,
    parts: [decPart(ans)],
    hints: [BEDMAS, 'Do one step at a time and rewrite the expression after each step.'],
    solution: [`Estimate with rounded numbers: $${f.tex(ev)} = ${num(est)}$.`, ...st.map(([s]) => s), checkLine(ans, est), `So $${f.tex(v)} = ${num(ans)}$.`],
    calculator: false,
  };
}

function opsMistake(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['sub-div', 'add-mul'] as const);
  if (kind === 'sub-div') {
    const c = rng.pick([0.2, 0.4, 0.5, 0.8, 2, 4]);
    const b = clean(c * rng.int(2, 9));
    const a = t1(rng, b / c + 1, b / c + 9);
    const right = clean(a - b / c);
    const wrong = clean((a - b) / c);
    const tex = `${num(a)} - ${num(b)} \\div ${num(c)}`;
    return {
      prompt: `${name} says $${tex} = ${num(wrong)}$. What is the correct value?`,
      parts: [part(mc(rng, `$${num(right)}$`, [`$${num(wrong)}$`, `$${num(clean(a - b * c))}$`, `$${num(clean(a / c - b))}$`, `$${num(clean(right + 1))}$`]))],
      hints: [BEDMAS, 'Which operation should come first: the subtraction or the division?'],
      solution: [`${name} subtracted first: $${num(a)} - ${num(b)} = ${num(clean(a - b))}$, then divided. That is the mistake.`, `Divide first: $${num(b)} \\div ${num(c)} = ${num(b / c)}$`, `Then subtract: $${num(a)} - ${num(b / c)} = ${num(right)}$`, `The correct value is $${num(right)}$.`],
      calculator: false,
    };
  }
  const a = t1(rng, 1.2, 9.6);
  const b = t1(rng, 0.2, 3.4);
  const c = rng.int(2, 6);
  const right = clean(a + b * c);
  const wrong = clean((a + b) * c);
  const tex = `${num(a)} + ${num(b)} \\times ${c}`;
  return {
    prompt: `${name} says $${tex} = ${num(wrong)}$. What is the correct value?`,
    parts: [part(mc(rng, `$${num(right)}$`, [`$${num(wrong)}$`, `$${num(clean(a * c + b))}$`, `$${num(clean(a + b + c))}$`]))],
    hints: [BEDMAS, 'Which operation should come first: the addition or the multiplication?'],
    solution: [`${name} added first: $${num(a)} + ${num(b)} = ${num(clean(a + b))}$, then multiplied by $${c}$. That is the mistake.`, `Multiply first: $${num(b)} \\times ${c} = ${num(clean(b * c))}$`, `Then add: $${num(a)} + ${num(clean(b * c))} = ${num(right)}$`, `The correct value is $${num(right)}$.`],
    calculator: false,
  };
}

const SNACKS: Array<[string, number, number]> = [['hot dogs', 225, 375], ['slices of pizza', 250, 400], ['bottles of juice', 125, 225], ['bags of popcorn', 150, 300], ['granola bars', 100, 175], ['cookies', 75, 150]];

function snackChange(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const [[s1, lo1, hi1], [s2, lo2, hi2]] = rng.sample(SNACKS, 2);
  const n1 = rng.int(2, 4);
  const n2 = rng.int(2, 4);
  const p1 = 25 * rng.int(lo1 / 25, hi1 / 25);
  const p2 = 25 * rng.int(lo2 / 25, hi2 / 25);
  const cost = n1 * p1 + n2 * p2;
  const bill = [10, 20, 50].find((b) => b * 100 > cost)!;
  const change = (bill * 100 - cost) / 100;
  const tex = `${bill} - (${n1} \\times ${mv(p1 / 100)} + ${n2} \\times ${mv(p2 / 100)})`;
  return {
    prompt: `At the concession stand at a hockey game, ${name} buys $${n1}$ ${s1} at ${money(p1 / 100)} each and $${n2}$ ${s2} at ${money(p2 / 100)} each. ${name} pays with a \\$${bill} bill. How much change does ${name} get?`,
    parts: [cashPart(change)],
    hints: ['Write one expression: money paid − (cost of the first item + cost of the second item).', BEDMAS],
    solution: [
      `Expression: $${tex}$`,
      `Estimate: $${bill} - (${n1} \\times ${num(near(p1 / 100))} + ${n2} \\times ${num(near(p2 / 100))}) = ${num(clean(bill - n1 * near(p1 / 100) - n2 * near(p2 / 100)))}$.`,
      `Inside the brackets, multiply first: $${n1} \\times ${mv(p1 / 100)} = ${mv((n1 * p1) / 100)}$ and $${n2} \\times ${mv(p2 / 100)} = ${mv((n2 * p2) / 100)}$`,
      `Add: $${mv((n1 * p1) / 100)} + ${mv((n2 * p2) / 100)} = ${mv(cost / 100)}$`,
      `Subtract: $${bill}.00 - ${mv(cost / 100)} = ${mv(change)}$`,
      `${name} gets ${money(change)} in change.`,
    ],
    calculator: false,
  };
}

function ticketExpression(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const a = rng.int(2, 4);
  const c = rng.int(2, 5);
  const pa = 25 * rng.int(44, 64);
  const pc2 = 25 * rng.int(26, 40);
  const off = rng.pick([5, 10]);
  const total = (a * pa + c * pc2) / 100 - off;
  const A = mv(pa / 100);
  const C = mv(pc2 / 100);
  const right = `$${a} \\times ${A} + ${c} \\times ${C} - ${off}$`;
  const wrong = [`$(${a} + ${c}) \\times (${A} + ${C}) - ${off}$`, `$${a} \\times (${A} + ${c}) \\times ${C} - ${off}$`, `$${a} \\times ${A} + ${c} \\times ${C} + ${off}$`, `$${a} + ${A} \\times ${c} + ${C} - ${off}$`];
  return {
    prompt: `${name}’s family goes to a movie in ${rng.pick(TOWNS)}. They buy $${a}$ adult tickets at ${tag(pa / 100)} each and $${c}$ youth tickets at ${tag(pc2 / 100)} each. They use a \\$${off} coupon. Which expression gives the total cost? Then find the total cost.`,
    parts: [part(mc(rng, right, wrong), { label: 'Expression:' }), cashPart(total, 'Total cost (\\$):')],
    hints: ['Cost of adult tickets + cost of youth tickets − coupon.', BEDMAS],
    solution: [
      `Total = adult tickets + youth tickets − coupon: ${right}.`,
      `Estimate: $${a} \\times ${num(near(pa / 100))} + ${c} \\times ${num(near(pc2 / 100))} - ${off} = ${num(clean(a * near(pa / 100) + c * near(pc2 / 100) - off))}$.`,
      `Multiply first: $${a} \\times ${A} = ${mv((a * pa) / 100)}$ and $${c} \\times ${C} = ${mv((c * pc2) / 100)}$`,
      `Add, then subtract: $${mv((a * pa) / 100)} + ${mv((c * pc2) / 100)} - ${off} = ${mv(total)}$`,
      `The total cost is ${money(total)}.`,
    ],
    calculator: false,
  };
}

function meanJumps(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const vals = retry(
    () => [0, 1, 2].map(() => rng.int(250, 420) / 100),
    (v) => Math.round(v.reduce((s, x) => s + x, 0) * 100) % 3 === 0 && new Set(v).size === 3,
    300,
  );
  const sum = clean(vals.reduce((s, x) => s + x, 0));
  const mean = clean(sum / 3);
  return {
    prompt: `${name} did the long jump three times: ${vals.map((x) => q(x, 'm')).join(', ')}. The mean jump is $(${vals.map((x) => fmtFixed(x, 2)).join(' + ')}) \\div 3$. Find the mean jump.`,
    parts: [decPart(mean, 'm')],
    hints: ['The brackets come first: add the three jumps.', 'Then divide the sum by $3$.'],
    solution: [
      `Estimate: every jump is between $${Math.floor(Math.min(...vals) * 2) / 2}$ and $${Math.ceil(Math.max(...vals) * 2) / 2}$, so the mean is too.`,
      `Brackets first: $${vals.map((x) => fmtFixed(x, 2)).join(' + ')} = ${fmtFixed(sum, 2)}$`,
      `Then divide: $${fmtFixed(sum, 2)} \\div 3 = ${num(mean)}$`,
      `The mean jump is ${q(mean, 'm')}.`,
    ],
    calculator: false,
  };
}

const decimalOrderOps = skill({
  id: 'm7-decimal-order-ops',
  name: 'Order of operations with decimals',
  description: 'Apply the order of operations to expressions with decimals and solve multi-step decimal problems.',
  outcomes: ['N2'],
  lessonId: 'm7-2-3',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return opsItem(rng, OPS1);
    if (d === 2) return rng.chance(0.7) ? opsItem(rng, OPS2) : opsMistake(rng);
    return rng.pick([snackChange, ticketExpression, meanJumps])(rng);
  },
});

// ---------------------------------------------------------------------------
// 2.4 Percents, fractions and decimals
// ---------------------------------------------------------------------------

const PERCENT_MEANS = 'Percent means "out of $100$".';

/** A benchmark phrase for a value between 0 and 1: "a little more than $25\%$ ($\frac{1}{4}$)". */
function benchmark(v: number): string {
  if (v < 0.05) return 'less than $5\\%$, a small part of the whole';
  const marks: Array<[number, string]> = [[0.1, '$10\\%$ ($\\frac{1}{10}$)'], [0.25, '$25\\%$ ($\\frac{1}{4}$)'], [0.5, '$50\\%$ ($\\frac{1}{2}$)'], [0.75, '$75\\%$ ($\\frac{3}{4}$)'], [1, '$100\\%$ (the whole)']];
  let best = marks[0];
  for (const m of marks) if (Math.abs(m[0] - v) < Math.abs(best[0] - v)) best = m;
  const d = Math.abs(best[0] - v);
  if (d < 1e-9) return `exactly ${best[1]}`;
  if (d <= 0.06) return `a little ${v < best[0] ? 'less' : 'more'} than ${best[1]}`;
  const lo = [...marks].reverse().find((m) => m[0] < v) ?? marks[0];
  const hi = marks.find((m) => m[0] > v) ?? marks[marks.length - 1];
  return `between ${lo[1]} and ${hi[1]}`;
}
const estLine = (v: number) => `Estimate: the amount is ${benchmark(v)}.`;

function pctToDec(p: number): Out {
  const dec = clean(p / 100);
  return {
    prompt: `Write $${pc(p)}$ as a decimal.`,
    parts: [asDecPart(dec)],
    hints: [`${PERCENT_MEANS} To change a percent to a decimal, divide by $100$.`, 'Dividing by $100$ moves the decimal point $2$ places to the left. Put in zeros if you run out of digits.'],
    solution: [estLine(dec), `$${pc(p)} = ${fr(num(p), 100)}$. Divide by $100$: the decimal point moves $2$ places to the left.`, `$${num(p)} \\div 100 = ${num(dec)}$`, `So $${pc(p)} = ${num(dec)}$.`],
  };
}

function decToPct(dec: number): Out {
  const p = clean(dec * 100);
  return {
    prompt: `Write $${num(dec)}$ as a percent.`,
    parts: [decPart(p, '%')],
    hints: ['To change a decimal to a percent, multiply by $100$.', 'Multiplying by $100$ moves the decimal point $2$ places to the right.'],
    solution: [estLine(dec), `Multiply by $100$. The decimal point moves $2$ places to the right: $${num(dec)} \\times 100 = ${num(p)}$`, `So $${num(dec)} = ${pc(p)}$.`],
  };
}

function fracToPct(n: number, d: number): Out {
  const p = clean((100 * n) / d);
  const steps = 100 % d === 0
    ? [`$${d} \\times ${100 / d} = 100$, so multiply the numerator and the denominator by $${100 / d}$: $${fr(n, d)} = ${fr(`${n} \\times ${100 / d}`, `${d} \\times ${100 / d}`)} = ${fr(p, 100)}$`, `$${fr(p, 100)}$ means $${p}$ out of $100$, or $${pc(p)}$.`]
    : [`Divide: $${n} \\div ${d} = ${num(n / d)}$`, `Multiply by $100$: $${num(n / d)} \\times 100 = ${num(p)}$`];
  return {
    prompt: `Write $${fr(n, d)}$ as a percent.`,
    parts: [decPart(p, '%')],
    hints: [PERCENT_MEANS, 100 % d === 0 ? `Find an equivalent fraction with a denominator of $100$.` : 'Divide the numerator by the denominator, then multiply by $100$.'],
    solution: [estLine(n / d), ...steps, `So $${fr(n, d)} = ${pc(p)}$.`],
  };
}

function pctToFrac(p: number): Out {
  const g = gcd(p, 100);
  return {
    prompt: `Write $${pc(p)}$ as a fraction in lowest terms.`,
    parts: [numPart(p / 100, { fraction: 'lowest' })],
    hints: [`${PERCENT_MEANS} Write the percent as a fraction with a denominator of $100$.`, 'Then divide the numerator and the denominator by their greatest common factor.'],
    solution: [
      estLine(p / 100),
      `$${pc(p)} = ${fr(p, 100)}$`,
      g > 1 ? `Divide the numerator and the denominator by $${g}$: $${fr(`${p} \\div ${g}`, `100 \\div ${g}`)} = ${fr(p / g, 100 / g)}$` : `$${p}$ and $100$ have no common factor other than $1$, so the fraction is already in lowest terms.`,
      `So $${pc(p)} = ${fr(p / g, 100 / g)}$.`,
    ],
  };
}

function convertD1(rng: Rng): Out {
  const k = rng.int(0, 3);
  if (k === 0) return pctToDec(retry(() => rng.int(11, 99), (x) => x % 10 !== 0 || rng.chance(0.3)));
  if (k === 1) return decToPct(rng.int(11, 99) / 100);
  if (k === 2) {
    const n = rng.int(1, 99);
    const p = n;
    return {
      prompt: `Write $${fr(n, 100)}$ as a percent.`,
      parts: [decPart(p, '%')],
      hints: [PERCENT_MEANS, `$${fr(n, 100)}$ means $${n}$ out of $100$.`],
      solution: [estLine(n / 100), `$${fr(n, 100)}$ is $${n}$ out of $100$.`, `So $${fr(n, 100)} = ${pc(p)}$.`],
    };
  }
  const [n, d] = rng.pick([[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 10], [3, 10], [7, 10], [9, 10], [3, 20], [7, 20], [11, 20], [9, 25], [12, 25], [21, 50]] as Array<[number, number]>);
  return fracToPct(n, d);
}

function convertD2(rng: Rng): Out {
  const k = rng.int(0, 4);
  if (k === 0) return pctToFrac(retry(() => rng.int(1, 99), (x) => gcd(x, 100) > 1 || rng.chance(0.15)));
  if (k === 1) return pctToDec(rng.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 12.5, 4.5, 100, 7.5]));
  if (k === 2) {
    const [n, d] = rng.pick([[1, 8], [3, 8], [5, 8], [7, 8], [3, 40], [7, 40], [9, 40], [1, 16], [3, 16], [2, 3], [1, 3]] as Array<[number, number]>);
    if (d === 3) {
      const p = (100 * n) / d;
      return {
        prompt: `Write $${fr(n, d)}$ as a percent. Round to the nearest tenth of a percent.`,
        parts: [numPart(p, { decimals: 1, suffix: '%' })],
        hints: ['Divide the numerator by the denominator, then multiply by $100$.', 'The decimal repeats, so round at the end.'],
        solution: [estLine(n / d), `Divide: $${n} \\div 3 = ${n === 1 ? '0.3333\\ldots' : '0.6666\\ldots'}$`, `Multiply by $100$: $${n === 1 ? '33.333\\ldots' : '66.666\\ldots'}$`, `Round to the nearest tenth: $${n === 1 ? '33.3' : '66.7'}\\%$.`],
      };
    }
    return fracToPct(n, d);
  }
  if (k === 3) return decToPct(rng.pick([0.125, 0.375, 0.045, 0.06, 0.08, 0.025, 0.875, 0.005, 0.625, 1]));
  const p = retry(() => rng.int(2, 98), (x) => gcd(x, 100) >= 4);
  return pctToFrac(p);
}

function convertD3(rng: Rng): Out {
  const k = rng.int(0, 3);
  if (k === 0) {
    const p = retry(() => rng.int(1, 99), (x) => gcd(x, 100) > 1);
    const g = gcd(p, 100);
    return {
      prompt: `Write $${pc(p)}$ as a decimal and as a fraction in lowest terms.`,
      parts: [asDecPart(p / 100, 'Decimal:'), { ...numPart(p / 100, { fraction: 'lowest' }), label: 'Fraction:' }],
      hints: [`${PERCENT_MEANS} Divide by $100$ for the decimal.`, 'For the fraction, write it over $100$ and simplify.'],
      solution: [estLine(p / 100), `Decimal: $${num(p)} \\div 100 = ${num(p / 100)}$`, `Fraction: $${fr(p, 100)} = ${fr(p / g, 100 / g)}$ (divide both by $${g}$)`, `So $${pc(p)} = ${num(p / 100)} = ${fr(p / g, 100 / g)}$.`],
    };
  }
  if (k === 1) {
    const [n, d] = rng.pick([[3, 8], [7, 20], [9, 25], [13, 50], [5, 8], [17, 20], [1, 40], [11, 25], [7, 8], [3, 50]] as Array<[number, number]>);
    const dec = n / d;
    return {
      prompt: `Write $${fr(n, d)}$ as a decimal and as a percent.`,
      parts: [asDecPart(dec, 'Decimal:'), decPart(dec * 100, '%', 'Percent:')],
      hints: ['Divide the numerator by the denominator to get the decimal.', 'Multiply the decimal by $100$ to get the percent.'],
      solution: [estLine(dec), `Decimal: $${n} \\div ${d} = ${num(dec)}$`, `Percent: $${num(dec)} \\times 100 = ${num(dec * 100)}$, so $${pc(dec * 100)}$`, `So $${fr(n, d)} = ${num(dec)} = ${pc(dec * 100)}$.`],
    };
  }
  if (k === 2) {
    const c = rng.int(1, 99);
    const dec = c / 100;
    const g = gcd(c, 100);
    return {
      prompt: `${rng.pick(NAMES)}’s phone battery is at $${num(dec)}$ of full charge. Write $${num(dec)}$ as a percent and as a fraction in lowest terms.`,
      parts: [decPart(c, '%', 'Percent:'), { ...numPart(dec, { fraction: 'lowest' }), label: 'Fraction:' }],
      hints: ['Multiply by $100$ for the percent.', 'The last digit is in the hundredths place, so write the decimal over $100$ and simplify.'],
      solution: [estLine(dec), `Percent: $${num(dec)} \\times 100 = ${c}$, so $${pc(c)}$`, `Fraction: $${num(dec)} = ${fr(c, 100)}${g > 1 ? ` = ${fr(c / g, 100 / g)}$ (divide both by $${g}$)` : '$, already in lowest terms'}`, `So $${num(dec)} = ${pc(c)} = ${fr(c / g, 100 / g)}$.`],
    };
  }
  const [n, d] = rng.pick([[3, 5], [1, 4], [3, 4], [2, 5], [7, 10], [1, 20], [9, 20], [4, 25]] as Array<[number, number]>);
  const p = (100 * n) / d;
  const dec = n / d;
  const wrongDec = num(dec / 10);
  return {
    prompt: `Which of these is **not** equal to $${fr(n, d)}$?`,
    parts: [part(mc(rng, `$${wrongDec}$`, [`$${pc(p)}$`, `$${num(dec)}$`, `$${fr(n * 2, d * 2)}$`, `$${fr(p, 100)}$`]))],
    hints: ['Change each choice to the same form, such as a decimal.', 'A percent is out of $100$; a decimal like $0.06$ means $6$ hundredths.'],
    solution: [estLine(dec), `$${fr(n, d)} = ${fr(p, 100)} = ${pc(p)} = ${num(dec)}$, and $${fr(n * 2, d * 2)} = ${fr(n, d)}$.`, `$${wrongDec}$ is $${pc(p / 10)}$, not $${pc(p)}$.`, `The one that is not equal is $${wrongDec}$.`],
  };
}

const percentConvert = skill({
  id: 'm7-percent-convert',
  name: 'Percents, fractions and decimals',
  description: 'Change between percents from 1% to 100%, fractions in lowest terms and decimals.',
  outcomes: ['N3'],
  lessonId: 'm7-2-4',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return convertD1(rng);
    if (d === 2) return convertD2(rng);
    return convertD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 2.4 Percent of a number
// ---------------------------------------------------------------------------

const SHORTCUT: Record<number, [string, number]> = {
  1: ['$1\\%$ is one hundredth, so divide by $100$', 100],
  10: ['$10\\%$ is one tenth, so divide by $10$', 10],
  20: ['$20\\%$ is one fifth, so divide by $5$', 5],
  25: ['$25\\%$ is one quarter, so divide by $4$', 4],
  50: ['$50\\%$ is one half, so divide by $2$', 2],
};
const PCT_METHOD = 'Change the percent to a decimal (divide by $100$), then multiply by the number.';

/** A whole number N in [lo, hi] for which p% of N is a whole number. */
function wholeBase(rng: Rng, p: number, lo: number, hi: number): number {
  const unit = 100 / gcd(p, 100);
  return unit * rng.int(Math.max(1, Math.ceil(lo / unit)), Math.max(1, Math.floor(hi / unit)));
}

/** An estimate for p% of N: a benchmark fraction, or 1% or 10% steps, with N rounded to a friendly number. */
function pctEstimate(p: number, N: number): { line: string; est: number } {
  const B = near(N);
  const pre = B !== N ? `$${num(N)}$ is close to $${num(B)}$. ` : '';
  const FR: Record<number, [string, number]> = { 25: ['one quarter', 0.25], 50: ['one half', 0.5], 75: ['three quarters', 0.75] };
  if (FR[p]) {
    const est = clean(B * FR[p][1]);
    return { line: `Estimate: ${pre}$${pc(p)}$ is ${FR[p][0]}, so the answer is about ${FR[p][0]} of $${num(B)}$, or $${num(est)}$.`, est };
  }
  if (p < 10) {
    const one = clean(B / 100);
    const est = clean(p * one);
    return { line: `Estimate: ${pre}$1\\%$ of $${num(B)}$ is $${num(one)}$, so $${pc(p)}$ is about $${p} \\times ${num(one)} = ${num(est)}$.`, est };
  }
  const P = Math.round(p / 10) * 10;
  const ten = clean(B / 10);
  const est = clean((P / 10) * ten);
  const close = P === p ? '' : `$${pc(p)}$ is close to $${P}\\%$. `;
  if (P === 10) return { line: `Estimate: ${pre}${close}$10\\%$ of $${num(B)}$ is $${num(ten)}$.`, est };
  return { line: `Estimate: ${pre}${close}$10\\%$ of $${num(B)}$ is $${num(ten)}$, so $${P}\\%$ is about $${P / 10} \\times ${num(ten)} = ${num(est)}$.`, est };
}

function pctSteps(p: number, base: string, result: number, dp = 4): string[] {
  return [`Change the percent to a decimal: $${pc(p)} = ${num(p / 100)}$`, `Multiply: $${num(p / 100)} \\times ${base} ${eq(result, dp)}$`];
}

const OF_D1: Gen[] = [
  (rng) => {
    const p = rng.pick([10, 20, 25, 50, 1]);
    const N = wholeBase(rng, p, p === 1 ? 300 : 20, p === 1 ? 2400 : 400);
    const ans = (N * p) / 100;
    const [s, k] = SHORTCUT[p];
    return {
      prompt: `What is $${pc(p)}$ of $${num(N)}$?`,
      parts: [decPart(ans)],
      hints: [`Shortcut: ${s}.`, PCT_METHOD],
      solution: [`Think: ${s}.`, `$${num(N)} \\div ${k} = ${num(ans)}$`, `So $${pc(p)}$ of $${num(N)}$ is $${num(ans)}$.`],
    };
  },
  (rng) => {
    const p = rng.pick([10, 20, 25, 50, 75]);
    const N = wholeBase(rng, p, 20, 120);
    const ans = (N * p) / 100;
    const c = rng.pick([
      [`There are $${N}$ students in the Grade 7 classes at a school in ${rng.pick(TOWNS)}. $${pc(p)}$ of them play on a sports team. How many students play on a team?`, 'students play on a team', 'students'],
      [`A box holds $${N}$ crayons. $${pc(p)}$ of them are broken. How many crayons are broken?`, 'crayons are broken', 'crayons'],
      [`A soccer team took $${N}$ shots this season. $${pc(p)}$ of the shots were on goal. How many shots were on goal?`, 'shots were on goal', 'shots'],
      [`A farmer planted $${N}$ rows of crops. $${pc(p)}$ of the rows are corn. How many rows of corn are there?`, 'rows are corn', 'rows'],
    ]);
    const steps = p === 75 ? [`Think: $75\\%$ is three quarters. One quarter of $${N}$ is $${N} \\div 4 = ${N / 4}$.`, `Three quarters is $3 \\times ${N / 4} = ${ans}$.`] : [`Think: ${SHORTCUT[p][0]}.`, `$${N} \\div ${SHORTCUT[p][1]} = ${ans}$`];
    return {
      prompt: c[0],
      parts: [numPart(ans, { suffix: c[2] })],
      hints: [p === 75 ? '$75\\%$ is three quarters: find one quarter, then multiply by $3$.' : `Shortcut: ${SHORTCUT[p][0]}.`, PCT_METHOD],
      solution: [...steps, `$${ans}$ ${c[1]}.`],
    };
  },
  (rng) => {
    const name = rng.pick(NAMES);
    const p = rng.pick([10, 20, 25, 50]);
    const N = wholeBase(rng, p, 40, 400);
    const ans = (N * p) / 100;
    return {
      prompt: `${name} has \\$${N} saved. ${name} spends $${pc(p)}$ of it on a new pair of skates. How much does ${name} spend?`,
      parts: [cashPart(ans)],
      hints: [`Shortcut: ${SHORTCUT[p][0]}.`, PCT_METHOD],
      solution: [`Think: ${SHORTCUT[p][0]}.`, `$${N} \\div ${SHORTCUT[p][1]} = ${num(ans)}$`, `${name} spends ${tag(ans)}.`],
    };
  },
];

const OF_D2: Gen[] = [
  (rng) => {
    const p = rng.pick([12, 15, 35, 8, 65, 4, 18, 45, 72, 3, 64, 88]);
    const N = wholeBase(rng, p, 120, 900);
    const ans = (N * p) / 100;
    const c = rng.pick([
      [`$${N}$ people came to a hockey game in ${rng.pick(TOWNS)}. $${pc(p)}$ of them wore the home team’s jersey. How many people wore the jersey?`, 'people wore the jersey', 'people'],
      [`A school in ${rng.pick(TOWNS)} has $${N}$ students. $${pc(p)}$ of them walk to school. How many students walk to school?`, 'students walk to school', 'students'],
      [`A farm has $${N}$ chickens. $${pc(p)}$ of them are brown. How many brown chickens are there?`, 'chickens are brown', 'chickens'],
      [`$${N}$ runners entered a fun run in ${rng.pick(TOWNS)}. $${pc(p)}$ of them finished in under $30$ minutes. How many runners is that?`, 'runners finished in under $30$ minutes', 'runners'],
    ]);
    const { line, est } = pctEstimate(p, N);
    return {
      prompt: c[0],
      parts: [numPart(ans, { suffix: c[2] })],
      hints: [PCT_METHOD, `Find $${num(p / 100)} \\times ${N}$.`],
      solution: [line, ...pctSteps(p, String(N), ans), checkLine(ans, est), `$${ans}$ ${c[1]}.`],
      calculator: true,
    };
  },
  (rng) => {
    const [what, total, unit, part2] = rng.pick([
      ['A box of cereal', [450, 600, 750, 900, 1200], 'g', 'sugar'],
      ['A jug of juice', [1500, 2000, 2500, 3000], 'mL', 'real fruit juice'],
      ['A bag of trail mix', [400, 500, 800, 1000], 'g', 'peanuts'],
      ['A bag of soil', [2500, 4000, 5000, 6000], 'g', 'sand'],
    ] as Array<[string, number[], string, string]>);
    const N = rng.pick(total);
    const p = rng.pick([12, 15, 8, 24, 35, 6, 45, 18]);
    const ans = clean((N * p) / 100);
    const { line, est } = pctEstimate(p, N);
    return {
      prompt: `${what} has ${q(N, unit)}. It is $${pc(p)}$ ${part2}. How many ${unit === 'g' ? 'grams' : 'millilitres'} of ${part2} is that?`,
      parts: [decPart(ans, unit)],
      hints: [PCT_METHOD, `Find $${num(p / 100)} \\times ${num(N)}$.`],
      solution: [line, ...pctSteps(p, num(N), ans), checkLine(ans, est), `It has ${q(ans, unit)} of ${part2}.`],
      calculator: true,
    };
  },
  (rng) => {
    const name = rng.pick(NAMES);
    const p = rng.pick([15, 12, 8, 35, 40, 6]);
    const pay = retry(() => rng.int(4000, 18000) / 100, (x) => !onEdge((x * p) / 100, 2) && !exactAt((x * p) / 100, 2));
    const ans = (pay * p) / 100;
    const { line, est } = pctEstimate(p, pay);
    return {
      prompt: `${name} earned ${money(pay)} babysitting this month and puts $${pc(p)}$ of it into a savings account. How much does ${name} save, ${CENT}?`,
      parts: [moneyPart(ans)],
      hints: [PCT_METHOD, `Find $${num(p / 100)} \\times ${mv(pay)}$, then round to $2$ decimal places.`],
      solution: [line, ...pctSteps(p, mv(pay), ans), `Round to the nearest cent: ${money(ans)}.`, checkLine(ans, est), `${name} saves ${money(ans)}.`],
      calculator: true,
    };
  },
];

const OF_D3: Gen[] = [
  // The rest
  (rng) => {
    const N = rng.pick([240, 320, 400, 480, 560, 600, 720, 800]);
    const [a, b] = retry(() => [5 * rng.int(4, 9), 5 * rng.int(3, 8)], ([x, y]) => x + y < 90 && ((100 - x - y) * N) % 100 === 0 && (x * N) % 100 === 0);
    const rest = 100 - a - b;
    const ans = (rest * N) / 100;
    return {
      prompt: `A school in ${rng.pick(TOWNS)} has $${N}$ students. $${pc(a)}$ walk to school and $${pc(b)}$ take the bus. The rest are driven. How many students are driven to school?`,
      parts: [numPart(ans, { suffix: 'students' })],
      hints: ['All the students make $100\\%$. What percent are driven?', 'Find that percent of the number of students.'],
      solution: [
        `Percent driven: $100\\% - ${pc(a)} - ${pc(b)} = ${pc(rest)}$`,
        pctEstimate(rest, N).line,
        `$${pc(rest)}$ of $${N}$: $${num(rest / 100)} \\times ${N} = ${ans}$`,
        `$${ans}$ students are driven to school.`,
      ],
      calculator: true,
    };
  },
  // Games won, tied, lost
  (rng) => {
    const G = rng.pick([20, 40, 60, 80, 24, 32]);
    const p = retry(() => 5 * rng.int(8, 15), (x) => (x * G) % 100 === 0);
    const won = (p * G) / 100;
    const ties = rng.int(1, Math.min(5, G - won - 1));
    const lost = G - won - ties;
    const team = rng.pick(['hockey', 'basketball', 'soccer', 'ringette']);
    const { line } = pctEstimate(p, G);
    return {
      prompt: `A ${team} team played $${G}$ games. It won $${pc(p)}$ of its games and tied $${ties}$. The rest were losses. How many games did the team lose?`,
      parts: [numPart(lost, { suffix: 'games' })],
      hints: ['First find how many games the team won.', 'Then subtract the wins and the ties from the total.'],
      solution: [line, `Wins: $${num(p / 100)} \\times ${G} = ${won}$`, `Losses: $${G} - ${won} - ${ties} = ${lost}$`, `The team lost $${lost}$ games.`],
      calculator: true,
    };
  },
  // Using 10% and 5%
  (rng) => {
    const N = rng.int(12, 96) * 2;
    const [p, parts] = rng.pick([[15, '10% + 5%'], [30, '3 × 10%'], [5, 'half of 10%'], [35, '3 × 10% + 5%'], [45, '4 × 10% + 5%']] as Array<[number, string]>);
    const ten = clean(N / 10);
    const five = clean(N / 20);
    const ans = clean((N * p) / 100);
    const how: Record<number, string> = {
      15: `$15\\% = 10\\% + 5\\%$: $${num(ten)} + ${num(five)} = ${num(ans)}$`,
      30: `$30\\% = 3 \\times 10\\%$: $3 \\times ${num(ten)} = ${num(ans)}$`,
      5: `$5\\%$ is half of $10\\%$: $${num(ten)} \\div 2 = ${num(ans)}$`,
      35: `$35\\% = 3 \\times 10\\% + 5\\%$: $3 \\times ${num(ten)} + ${num(five)} = ${num(ans)}$`,
      45: `$45\\% = 4 \\times 10\\% + 5\\%$: $4 \\times ${num(ten)} + ${num(five)} = ${num(ans)}$`,
    };
    return {
      prompt: `Use mental math. Start with $10\\%$ of $${N}$, then find $${pc(p)}$ of $${N}$.`,
      parts: [decPart(ans)],
      hints: ['$10\\%$ is one tenth: divide by $10$.', `Build $${pc(p)}$ from $10\\%$ and $5\\%$ (half of $10\\%$): ${parts.replace(/%/g, '\\%').replace(/^/, '$').replace(/$/, '$')}.`],
      solution: [`$10\\%$ of $${N}$: $${N} \\div 10 = ${num(ten)}$.`, `$5\\%$ is half of that: $${num(five)}$.`, how[p], `So $${pc(p)}$ of $${N}$ is $${num(ans)}$.`],
      calculator: false,
    };
  },
  // Juice left in a jug
  (rng) => {
    const V = rng.pick([1.5, 2, 2.5, 3, 4]);
    const p = rng.pick([20, 30, 40, 60, 25, 75, 35]);
    const used = clean((V * p) / 100);
    const left = clean(V - used);
    const name = rng.pick(NAMES);
    return {
      prompt: `A jug holds ${q(V, 'L')} of milk. ${name} pours $${pc(p)}$ of it into glasses for the family. How many litres of milk are left in the jug?`,
      parts: [decPart(left, 'L')],
      hints: [`Find $${pc(p)}$ of $${num(V)}$, then subtract. Or find $${pc(100 - p)}$ of $${num(V)}$ directly.`, PCT_METHOD],
      solution: [
        `${pctEstimate(p, V).line} So about $${num(clean(V - pctEstimate(p, V).est))}$ L should be left.`,
        `Milk poured: $${num(p / 100)} \\times ${num(V)} = ${num(used)}$ L`,
        `Milk left: $${num(V)} - ${num(used)} = ${num(left)}$ L`,
        `There ${left === 1 ? 'is' : 'are'} ${q(left, 'L')} left in the jug.`,
      ],
      calculator: true,
    };
  },
];

const percentOf = skill({
  id: 'm7-percent-of',
  name: 'Percent of a number',
  description: 'Find a percent of a number with benchmarks, mental math and technology.',
  outcomes: ['N3'],
  lessonId: 'm7-2-4',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return { ...rng.pick(OF_D1)(rng), calculator: false };
    return rng.pick(d === 2 ? OF_D2 : OF_D3)(rng);
  },
});

// ---------------------------------------------------------------------------
// 2.5 Percent problems
// ---------------------------------------------------------------------------

const ITEMS: Array<[string, number, number]> = [
  ['a hoodie', 39.99, 69.99], ['a pair of running shoes', 79.99, 149.99], ['a backpack', 34.99, 59.99], ['a video game', 49.99, 79.99],
  ['a hockey stick', 59.99, 129.99], ['a winter jacket', 89.99, 189.99], ['a basketball', 24.99, 44.99], ['a pair of headphones', 29.99, 89.99],
];

const PROB_D1: Gen[] = [
  // Test score
  (rng) => {
    const name = rng.pick(NAMES);
    const T = rng.pick([10, 20, 25, 50, 20, 25]);
    const s = rng.int(Math.ceil(T * 0.5), T - 1);
    const p = (100 * s) / T;
    const m = 100 / T;
    return {
      prompt: `${name} got $${s}$ out of $${T}$ on a math quiz. What is the score as a percent?`,
      parts: [decPart(p, '%')],
      hints: ['Write the score as a fraction: marks earned over total marks.', `Make an equivalent fraction with a denominator of $100$: multiply the top and the bottom by $${m}$.`],
      solution: [
        `Estimate: $${fr(s, T)}$ is ${benchmark(s / T)}.`,
        `Score as a fraction: $${fr(s, T)}$`,
        `Multiply the top and the bottom by $${m}$: $${fr(s, T)} = ${fr(s * m, 100)}$`,
        `The score is $${pc(p)}$.`,
      ],
      calculator: false,
    };
  },
  // Discount amount
  (rng) => {
    const name = rng.pick(NAMES);
    const p = rng.pick([10, 20, 25, 50]);
    const P = wholeBase(rng, p, 20, 160);
    const save = (P * p) / 100;
    const [thing] = rng.pick(ITEMS);
    return {
      prompt: `${cap(thing)} costs \\$${P}. It is on sale for $${pc(p)}$ off. How much money does ${name} save by buying it on sale?`,
      parts: [cashPart(save)],
      hints: ['The discount is the amount you save: find the percent of the price.', `Shortcut: ${SHORTCUT[p][0]}.`],
      solution: [`Estimate: ${SHORTCUT[p][0]}.`, `Discount: $${P} \\div ${SHORTCUT[p][1]} = ${num(save)}$`, `${name} saves ${tag(save)}.`],
      calculator: false,
    };
  },
  // Simple tip
  (rng) => {
    const name = rng.pick(NAMES);
    const p = rng.pick([10, 20]);
    const B = 5 * rng.int(6, 24);
    const tip = (B * p) / 100;
    return {
      prompt: `${name}’s family’s bill at a restaurant in ${rng.pick(TOWNS)} is \\$${B}. They leave ${art(p)} $${pc(p)}$ tip. How much is the tip?`,
      parts: [cashPart(tip)],
      hints: [`$10\\%$ is one tenth: divide by $10$.`, p === 20 ? '$20\\%$ is double $10\\%$.' : 'Divide the bill by $10$.'],
      solution: [`Estimate: the tip is a small part of the bill, much less than half of \\$${B}.`, `$10\\%$ of \\$${B} is $${B} \\div 10 = ${num(B / 10)}$.`, ...(p === 20 ? [`$20\\%$ is double that: $2 \\times ${num(B / 10)} = ${num(tip)}$`] : []), `The tip is ${tag(tip)}.`],
      calculator: false,
    };
  },
];

const PROB_D2: Gen[] = [
  // Sale price
  (rng) => {
    const name = rng.pick(NAMES);
    const [thing, lo, hi] = rng.pick(ITEMS);
    const p = rng.pick([15, 20, 25, 30, 35, 40]);
    const price = retry(() => clean(rng.int(Math.ceil(lo), Math.floor(hi)) + 0.99), (x) => !onEdge((x * (100 - p)) / 100, 2) && !onEdge((x * p) / 100, 2));
    const disc = (price * p) / 100;
    const sale = price - roundTo(disc, 2);
    const est = clean(near(price) * (1 - p / 100));
    return {
      prompt: `${name} wants ${thing} that costs ${money(price)}. It is on sale for $${pc(p)}$ off. What is the sale price, ${CENT}?`,
      parts: [moneyPart(sale)],
      hints: ['Find the discount: the percent of the price.', 'Subtract the discount from the price. (Or find $' + (100 - p) + '\\%$ of the price.)'],
      solution: [
        `Estimate: $${pc(p)}$ of about \\$${near(price)} is about ${tag(clean((near(price) * p) / 100))}, so the sale price is about ${tag(est)}.`,
        `Discount: $${num(p / 100)} \\times ${mv(price)} ${eq(disc)}$, about ${money(disc)}.`,
        `Sale price: $${mv(price)} - ${mv(roundTo(disc, 2))} = ${mv(sale)}$`,
        checkLine(sale, est),
        `The sale price is ${money(sale)}.`,
      ],
      calculator: true,
    };
  },
  // Sales tax
  (rng) => {
    const name = rng.pick(NAMES);
    const [thing, lo, hi] = rng.pick(ITEMS);
    const r = rng.pick([5, 5, 6, 7, 8]);
    const price = retry(() => clean(rng.int(Math.ceil(lo), Math.floor(hi)) + rng.pick([0.99, 0.49, 0.95])), (x) => !onEdge((x * r) / 100, 2));
    const tax = (price * r) / 100;
    const total = clean(price + roundTo(tax, 2));
    return {
      prompt: `${name} buys ${thing} for ${money(price)}. There is ${art(r)} $${pc(r)}$ sales tax on the price. What is the total cost, including tax, ${CENT}?`,
      parts: [moneyPart(total)],
      hints: [`Find the tax: $${pc(r)}$ of the price.`, 'Add the tax to the price.'],
      solution: [
        `Estimate: $10\\%$ of about \\$${near(price)} is ${tag(near(price) / 10)}, so ${art(r)} $${pc(r)}$ tax is ${r === 5 ? 'half of that' : 'a bit more than half of that'}, about ${tag(roundTo((near(price) * r) / 100, 1))}.`,
        `Tax: $${num(r / 100)} \\times ${mv(price)} ${eq(tax)}$, about ${money(tax)}.`,
        `Total: $${mv(price)} + ${mv(roundTo(tax, 2))} = ${mv(total)}$`,
        `The total cost is ${money(total)}.`,
      ],
      calculator: true,
    };
  },
  // Tip and total
  (rng) => {
    const name = rng.pick(NAMES);
    const p = rng.pick([15, 18, 20, 12]);
    const bill = retry(() => rng.int(2340, 9875) / 100, (x) => !onEdge((x * p) / 100, 2) && !exactAt((x * p) / 100, 2));
    const tip = (bill * p) / 100;
    const total = clean(bill + roundTo(tip, 2));
    return {
      prompt: `${name}’s family has dinner at a restaurant in ${rng.pick(TOWNS)}. The bill is ${money(bill)}. They leave ${art(p)} $${pc(p)}$ tip. What is the total, including the tip, ${CENT}?`,
      parts: [moneyPart(total)],
      hints: [`Find the tip: $${pc(p)}$ of the bill.`, 'Add the tip to the bill.'],
      solution: [
        `Estimate: $10\\%$ of about \\$${near(bill)} is ${tag(near(bill) / 10)}, so the tip is about ${tag(roundTo((near(bill) * p) / 100, 0))}.`,
        `Tip: $${num(p / 100)} \\times ${mv(bill)} ${eq(tip)}$, about ${money(tip)}.`,
        `Total: $${mv(bill)} + ${mv(roundTo(tip, 2))} = ${mv(total)}$`,
        `The total is ${money(total)}.`,
      ],
      calculator: true,
    };
  },
  // Test score as a percent
  (rng) => {
    const name = rng.pick(NAMES);
    const T = rng.pick([30, 40, 60, 35, 45, 80, 24]);
    const s = retry(() => rng.int(Math.ceil(T * 0.55), T - 1), (x) => !onEdge((100 * x) / T, 1));
    const p = (100 * s) / T;
    const exact = exactAt(p, 1);
    return {
      prompt: `${name} got $${s}$ out of $${T}$ on a science test. What is the score as a percent?${exact ? '' : ' Round to the nearest tenth of a percent.'}`,
      parts: [exact ? decPart(p, '%') : numPart(p, { decimals: 1, suffix: '%' })],
      hints: ['Divide the marks earned by the total marks.', 'Multiply the decimal by $100$ to get a percent.'],
      solution: [
        `Estimate: $${fr(s, T)}$ is ${benchmark(s / T)}.`,
        `Divide: $${s} \\div ${T} ${eq(s / T, 4)}$`,
        `Multiply by $100$: $${eq(p, 3).replace(/^= /, '').replace(/^\\approx /, '')}$${exact ? '' : `, which rounds to $${fmtFixed(p, 1)}$`}.`,
        `The score is $${exact ? num(p) : fmtFixed(p, 1)}\\%$.`,
      ],
      calculator: true,
    };
  },
];

const PROB_D3: Gen[] = [
  // Discount then tax
  (rng) => {
    const name = rng.pick(NAMES);
    const [thing, lo, hi] = rng.pick(ITEMS);
    const p = rng.pick([20, 25, 30, 40, 15]);
    const r = rng.pick([5, 5, 7]);
    const [price, sale, tax, total] = retry(
      () => {
        const pr = clean(rng.int(Math.ceil(lo), Math.floor(hi)) + 0.99);
        const s = roundTo(pr - roundTo((pr * p) / 100, 2), 2);
        const t = (s * r) / 100;
        return [pr, s, t, clean(s + roundTo(t, 2))];
      },
      ([pr, s, t]) => !onEdge((pr * p) / 100, 2) && !onEdge(t, 2) && Math.abs(clean(s + roundTo(t, 2)) - (pr * (1 - p / 100) * (1 + r / 100))) < 0.006,
      200,
    );
    return {
      prompt: `${cap(thing)} costs ${money(price)}. It is on sale for $${pc(p)}$ off. Then ${art(r)} $${pc(r)}$ sales tax is added to the sale price. What does ${name} pay, ${CENT}?`,
      parts: [moneyPart(total)],
      hints: ['Step 1: find the sale price (price − discount).', `Step 2: find the $${pc(r)}$ tax on the sale price and add it.`],
      solution: [
        `Estimate: about \\$${near(price)} with $${pc(p)}$ off is about ${tag(clean(near(price) * (1 - p / 100)))}, plus a little tax.`,
        `Discount: $${num(p / 100)} \\times ${mv(price)} ${eq((price * p) / 100)}$, about ${money((price * p) / 100)}.`,
        `Sale price: $${mv(price)} - ${mv(roundTo((price * p) / 100, 2))} = ${mv(sale)}$`,
        `Tax: $${num(r / 100)} \\times ${mv(sale)} ${eq(tax)}$, about ${money(tax)}.`,
        `Total: $${mv(sale)} + ${mv(roundTo(tax, 2))} = ${mv(total)}$`,
        `${name} pays ${money(total)}.`,
      ],
      calculator: true,
    };
  },
  // Bill plus percent tip, shared
  (rng) => {
    const name = rng.pick(NAMES);
    const n = rng.int(3, 5);
    const p = rng.pick([15, 18, 20]);
    const bill = retry(() => rng.int(4500, 12500) / 100, (x) => {
      const t = roundTo((x * p) / 100, 2);
      return !onEdge((x * p) / 100, 2) && !onEdge((x + t) / n, 2) && !exactAt((x + t) / n, 2) && Math.abs(roundTo((x + t) / n, 2) - roundTo((x * (1 + p / 100)) / n, 2)) < 0.006;
    }, 200);
    const tip = roundTo((bill * p) / 100, 2);
    const total = clean(bill + tip);
    const per = total / n;
    return {
      prompt: `${name} and $${n - 1}$ friends have pizza after a ${rng.pick(['hockey', 'soccer', 'volleyball', 'basketball'])} game. The bill is ${money(bill)}. They add ${art(p)} $${pc(p)}$ tip and split the total equally. How much does each person pay, ${CENT}?`,
      parts: [moneyPart(per)],
      hints: ['First find the tip and add it to the bill.', `Then divide the total by $${n}$.`],
      solution: [
        `Estimate: ${art(p)} $${pc(p)}$ tip on about \\$${near(bill)} is about ${tag(roundTo((near(bill) * p) / 100, 0))}; split $${n}$ ways, each pays about ${tag(roundTo((near(bill) * (1 + p / 100)) / n, 0))}.`,
        `Tip: $${num(p / 100)} \\times ${mv(bill)} ${eq((bill * p) / 100)}$, about ${money(tip)}.`,
        `Total: $${mv(bill)} + ${mv(tip)} = ${mv(total)}$`,
        `Each person: $${mv(total)} \\div ${n} ${eq(per)}$, which rounds to ${money(per)}.`,
        `Each person pays ${money(per)}.`,
      ],
      calculator: true,
    };
  },
  // Compare two deals
  (rng) => {
    const name = rng.pick(NAMES);
    const [thing, lo, hi] = rng.pick(ITEMS);
    const P = rng.int(Math.ceil(lo), Math.floor(hi)) + 0.99;
    const p = rng.pick([20, 25, 30]);
    const off = retry(() => 5 * rng.int(2, 10), (x) => Math.abs(x - (P * p) / 100) > 1.5);
    const saleA = roundTo(P - roundTo((P * p) / 100, 2), 2);
    const saleB = clean(P - off);
    if (onEdge((P * p) / 100, 2)) return PROB_D3[2](rng);
    const diff = clean(Math.abs(saleA - saleB));
    const cheaper = saleA < saleB ? 0 : 1;
    return {
      prompt: `${name} wants ${thing}. Both stores charge ${money(P)}. Store A has $${pc(p)}$ off. Store B has \\$${off} off. Which store has the lower price, and how much less is it, ${CENT}?`,
      parts: [part(fixedChoice(['Store A', 'Store B'], cheaper), { label: 'Lower price:' }), moneyPart(diff, 'Difference (\\$):')],
      hints: [`Find the sale price at each store. For Store A, find $${pc(p)}$ of the price first.`, 'Subtract the two sale prices.'],
      solution: [
        `Estimate: $${pc(p)}$ of about \\$${near(P)} is about ${tag(clean((near(P) * p) / 100))}, compared with \\$${off} off at Store B.`,
        `Store A discount: $${num(p / 100)} \\times ${mv(P)} ${eq((P * p) / 100)}$, about ${money((P * p) / 100)}. Sale price: $${mv(P)} - ${mv(roundTo((P * p) / 100, 2))} = ${mv(saleA)}$`,
        `Store B sale price: $${mv(P)} - ${off}.00 = ${mv(saleB)}$`,
        `Difference: $${mv(Math.max(saleA, saleB))} - ${mv(Math.min(saleA, saleB))} = ${mv(diff)}$`,
        `Store ${cheaper === 0 ? 'A' : 'B'} is cheaper by ${money(diff)}.`,
      ],
      calculator: true,
    };
  },
  // Marks needed
  (rng) => {
    const name = rng.pick(NAMES);
    const T = rng.pick([32, 45, 36, 48, 28, 64, 55, 42]);
    const p = rng.pick([60, 65, 70, 75, 80, 85]);
    const raw = (T * p) / 100;
    if (Number.isInteger(raw)) return PROB_D3[3](rng);
    const need = Math.ceil(raw);
    return {
      prompt: `A test has $${T}$ questions, each worth $1$ mark. To earn a badge, ${name} needs a score of at least $${pc(p)}$. What is the smallest number of questions ${name} must get right?`,
      parts: [numPart(need, { suffix: 'questions' })],
      hints: [`Find $${pc(p)}$ of $${T}$.`, 'You cannot get part of a question right. Should you round up or down?'],
      solution: [
        pctEstimate(p, T).line,
        `$${pc(p)}$ of $${T}$: $${num(p / 100)} \\times ${T} = ${num(raw)}$`,
        `$${num(raw)}$ is not a whole number. $${Math.floor(raw)}$ right would be less than $${pc(p)}$, so round **up**.`,
        `${name} must get at least $${need}$ questions right.`,
      ],
      calculator: true,
    };
  },
];

const percentProblems = skill({
  id: 'm7-percent-problems',
  name: 'Solving percent problems',
  description: 'Solve problems with discounts, sales tax, tips and test scores, rounding money to the nearest cent.',
  outcomes: ['N3'],
  lessonId: 'm7-2-5',
  calculator: true,
  gen(rng, d) {
    return rng.pick(d === 1 ? PROB_D1 : d === 2 ? PROB_D2 : PROB_D3)(rng);
  },
});

export const DECIMALS_SKILLS: SkillDef[] = [decimalAddSub, decimalMultiply, decimalDivide, decimalOrderOps, percentConvert, percentOf, percentProblems];
