/** Math 10-4 Unit 3 — Decimals, Percents and Money (N1, N2). */
import { fixedChoice, mc, numPart, retry, skill } from '../../helpers.ts';
import { fmt, fmtFixed, frac, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Harpreet', 'Noor', 'Thanh', 'Kateri', 'Diego', 'Ngozi',
];
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Clearwater', 'Ashford', 'Pinewood'];

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure; calculator?: boolean };
type Ctx = (rng: Rng, name: string) => Out;

const tx = (u: string) => `\\text{${u}}`;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const isWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
/** Remove floating-point noise from an exact decimal result. */
const clean = (x: number) => roundTo(x, 9);

function group(s: string, min = 5): string {
  const [i, f] = s.split('.');
  const g = i.length >= min ? i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : i;
  return f === undefined ? g : `${g}.${f}`;
}
/** "a" or "an" before a number read aloud: an 8, an 11, an 18, an 80. */
const art = (x: number) => (/^8|^1[18](\D|$)/.test(String(x)) ? 'an' : 'a');
/** A number inside maths, without trailing zeros. */
const num = (x: number, dp = 4) => group(fmt(x, dp)).replace(/,/g, '{,}');
/** A measurement as inline maths: $2.4\ \text{m}$. */
const q = (x: number, u: string) => `$${num(x)}\\ ${tx(u)}$`;
/** Canadian money in prose, always with cents: \$12.50. Never put this inside $...$. */
const money = (x: number) => `\\$${group(fmtFixed(x, 2), 4)}`;
/** A price per litre with three decimals: \$1.459. */
const money3 = (x: number) => `\\$${fmtFixed(x, 3)}`;
/** A price tag: whole dollars print without cents (\$60), otherwise \$59.99. */
const tag = (x: number) => (isWhole(x) ? `\\$${group(String(Math.round(x)), 4)}` : money(x));
/** A money amount inside maths, without a dollar sign: 12.50. */
const mv = (x: number) => group(fmtFixed(x, 2)).replace(/,/g, '{,}');
/** Plain-text money for table cells (cells are not Markdown). */
const cell = (x: number) => `$${fmtFixed(x, 2)}`;
/** A percent inside maths. */
const pc = (p: number) => `${num(p)}\\%`;

const CENT = 'to the nearest cent';
/** A money answer that had to be rounded: graded to within a cent. */
const moneyPart = (v: number, label = '\\$'): Part => numPart(v, { decimals: 2, tolerance: 0.011, label });
/** A money answer that is exact to the cent: no rounding allowance, so a one-cent slip is wrong. */
const cashPart = (v: number, label = '\\$'): Part => numPart(clean(v), { decimals: 2, tolerance: 0.004, label });

function exactDp(v: number): number {
  for (let dp = 0; dp <= 4; dp++) if (Math.abs(roundTo(v, dp) - v) < 1e-9) return dp;
  return 4;
}
/** An exact answer. Decimal answers keep their decimal form for review. */
function exact(value: number, suffix?: string, label?: string): Part {
  const v = clean(value);
  const dp = exactDp(v);
  if (dp === 0) return numPart(v, { suffix, label });
  return numPart(v, { suffix, label, decimals: dp, tolerance: 0.4 * 10 ** -dp });
}
/** True when v sits too close to a rounding boundary (x.xx5) at `dp` places. */
function onEdge(v: number, dp: number): boolean {
  const s = Math.abs(v) * 10 ** dp;
  return Math.abs(s - Math.floor(s) - 0.5) < 0.06;
}
/** "= 12.5" when exact to `dp` places, otherwise "\approx 12.4567". */
const eq = (v: number, dp = 4) => (Math.abs(roundTo(v, dp) - v) < 1e-9 ? `= ${num(v, dp)}` : `\\approx ${num(v, dp)}`);
/** ", which rounds to \$4.90" after a money product, or nothing when it is already exact to the cent. */
const roundsTo = (v: number) => (Math.abs(roundTo(v, 2) - v) < 1e-9 ? '' : `, which rounds to ${money(v)}`);
const fr = (n: number | string, d: number | string) => `\\dfrac{${n}}{${d}}`;
const friends = (n: number) => (n === 2 ? 'a friend' : `$${n - 1}$ friends`);

const WAGES = [15.25, 15.5, 15.75, 16.2, 16.4, 16.75, 17.1, 17.6, 18.3, 18.45];
const JOBS = ['at a grocery store', 'at a car wash', 'at a garden centre', 'in a hotel laundry room', 'at a fast-food restaurant', 'at a hardware store', 'on a landscaping crew'];
const GAS = [1.299, 1.329, 1.359, 1.389, 1.419, 1.449, 1.479, 1.509, 1.539, 1.569];

// ---------------------------------------------------------------------------
// 3.1 Operations with decimals
// ---------------------------------------------------------------------------

const ALIGN = 'Line up the decimal points before you add or subtract.';

const OPS_D1: Ctx[] = [
  // Add two prices
  (rng, name) => {
    const [i1, i2] = rng.sample(['a muffin', 'a coffee', 'a bagel', 'a smoothie', 'a breakfast wrap', 'a hot chocolate', 'a cookie', 'a bowl of soup', 'a sandwich'], 2);
    const a = 25 * rng.int(5, 19);
    const b = 25 * rng.int(3, 15);
    const t = a + b;
    const place = rng.pick(['a coffee shop', 'the school cafeteria', 'a food truck', 'a bakery']);
    return {
      prompt: `${name} buys ${i1} for ${money(a / 100)} and ${i2} for ${money(b / 100)} at ${place}. What is the total cost?`,
      parts: [cashPart(t / 100)],
      hints: ['A total means add.', `${ALIGN} Add the cents, then add the dollars.`],
      solution: ['Total means add the two prices. Line up the decimal points.', `$${mv(a / 100)} + ${mv(b / 100)} = ${mv(t / 100)}$`, `The total cost is ${money(t / 100)}.`],
    };
  },
  // Subtract lengths
  (rng, name) => {
    const c = rng.pick([
      { job: 'is building a shed', what: 'a board' },
      { job: 'is helping a plumber', what: 'a piece of copper pipe' },
      { job: 'is tying down a load on a truck', what: 'a rope' },
      { job: 'is finishing a basement', what: 'a strip of baseboard' },
      { job: 'is fixing a fence', what: 'a wooden rail' },
    ]);
    const L = rng.int(15, 40);
    const cut = rng.int(3, L - 3);
    const left = L - cut;
    return {
      prompt: `${name} ${c.job}. ${cap(c.what)} is ${q(L / 10, 'm')} long. ${name} cuts off ${q(cut / 10, 'm')}. How long is the piece that is left?`,
      parts: [exact(left / 10, 'm')],
      hints: ['Subtract the part that was cut off from the whole length.', `${ALIGN} Find $${fmtFixed(L / 10, 1)} - ${fmtFixed(cut / 10, 1)}$.`],
      solution: ['Left over = whole length − piece cut off. Line up the decimal points.', `$${fmtFixed(L / 10, 1)} - ${fmtFixed(cut / 10, 1)} = ${fmtFixed(left / 10, 1)}$`, `The piece that is left is ${q(left / 10, 'm')} long.`],
    };
  },
  // Multiply: several items at one price
  (rng, name) => {
    const it = rng.pick([
      { thing: 'bags of ice', why: 'for a community barbecue', lo: 8, hi: 16 },
      { thing: 'cans of paint', why: 'to paint a fence', lo: 40, hi: 90 },
      { thing: 'bags of potting soil', why: 'for a garden', lo: 16, hi: 36 },
      { thing: 'bus tickets', why: 'for the week', lo: 10, hi: 16 },
      { thing: 'pizzas', why: 'for a team party', lo: 48, hi: 70 },
    ]);
    const n = rng.int(2, 6);
    const p = 25 * rng.int(it.lo, it.hi);
    const t = n * p;
    return {
      prompt: `${name} buys $${n}$ ${it.thing} ${it.why}. Each one costs ${money(p / 100)}. What is the total cost?`,
      parts: [cashPart(t / 100)],
      hints: ['When you buy several items at the same price, multiply.', `Multiply the price by the number of items: $${n} \\times ${mv(p / 100)}$.`],
      solution: ['Total = number of items × price of one item', `$${n} \\times ${mv(p / 100)} = ${mv(t / 100)}$`, `The total cost is ${money(t / 100)}.`],
    };
  },
  // Multiply: shifts of equal length
  (rng, name) => {
    const h = rng.pick([3.5, 4.5, 5.5, 6.5, 7.5, 8.5]);
    const n = rng.int(2, 5);
    const job = rng.pick(JOBS);
    return {
      prompt: `${name} works $${n}$ shifts ${job} this week. Each shift is $${num(h)}$ hours long. How many hours does ${name} work in all?`,
      parts: [exact(n * h, 'h')],
      hints: ['The shifts are all the same length, so multiply.', `Find $${n} \\times ${num(h)}$.`],
      solution: ['Total hours = number of shifts × hours in one shift', `$${n} \\times ${num(h)} = ${num(n * h)}$`, `${name} works $${num(n * h)}$ hours in all.`],
    };
  },
  // Divide: split a bill
  (rng, name) => {
    const n = rng.int(2, 5);
    const per = 5 * rng.int(140, 400);
    const t = n * per;
    const what = rng.pick(['a pizza order', 'a lunch bill', 'a taxi ride', 'a birthday cake', 'a tank of gas for a road trip']);
    return {
      prompt: `${name} and ${friends(n)} split the cost of ${what} equally. The cost is ${money(t / 100)}. How much does each person pay?`,
      parts: [cashPart(per / 100)],
      hints: ['Sharing equally means divide.', `Count ${name} too. Divide the cost by $${n}$: $${mv(t / 100)} \\div ${n}$.`],
      solution: [`There are $${n}$ people, so divide by $${n}$.`, `$${mv(t / 100)} \\div ${n} = ${mv(per / 100)}$`, `Each person pays ${money(per / 100)}.`],
    };
  },
  // Divide: equal pieces
  (rng, name) => {
    const n = rng.int(2, 5);
    const piece = rng.int(5, 25);
    const L = n * piece;
    const what = rng.pick(['a board', 'a length of pipe', 'a piece of ribbon', 'a steel bar']);
    return {
      prompt: `${name} cuts ${what} that is ${q(L / 10, 'm')} long into $${n}$ equal pieces. How long is each piece?`,
      parts: [exact(piece / 10, 'm')],
      hints: ['Equal pieces means divide.', `Find $${num(L / 10)} \\div ${n}$.`],
      solution: ['Length of each piece = whole length ÷ number of pieces', `$${num(L / 10)} \\div ${n} = ${num(piece / 10)}$`, `Each piece is ${q(piece / 10, 'm')} long.`],
    };
  },
];

const OPS_D2: Ctx[] = [
  // Gas: litres × price per litre
  (rng, name) => {
    const price = rng.pick(GAS);
    const L = retry(() => rng.int(250, 680) / 10, (x) => !onEdge(x * price, 2) && !isWhole(x));
    const cost = L * price;
    const veh = rng.pick(['car', 'pickup truck', 'minivan', 'work truck', 'SUV']);
    return {
      prompt: `${name} fills up a ${veh} at a gas station in ${rng.pick(TOWNS)}. Gas costs ${money3(price)} per litre. ${name} pumps ${q(L, 'L')}. What is the cost, ${CENT}?`,
      parts: [moneyPart(cost)],
      hints: ['Multiply the number of litres by the price of one litre.', `Find $${num(L)} \\times ${num(price)}$, then round to $2$ decimal places.`],
      solution: ['Cost = litres × price per litre', `$${num(L)} \\times ${num(price)} ${eq(cost)}$`, `Round to the nearest cent ($2$ decimal places): ${money(cost)}.`, `The gas costs ${money(cost)}.`],
    };
  },
  // Split a bill
  (rng, name) => {
    const n = rng.int(3, 6);
    const t = retry(() => rng.int(4500, 14000), (c) => c % n !== 0 && !onEdge(c / 100 / n, 2));
    const per = t / 100 / n;
    const crew = rng.pick(['warehouse', 'hotel', 'auto shop', 'restaurant kitchen', 'landscaping company']);
    return {
      prompt: `${name} and $${n - 1}$ co-workers at a ${crew} order lunch together. The bill is ${money(t / 100)}. They split it equally. How much does each person pay, ${CENT}?`,
      parts: [moneyPart(per)],
      hints: ['Sharing equally means divide. Remember to count ' + name + '.', `Find $${mv(t / 100)} \\div ${n}$, then round to $2$ decimal places.`],
      solution: [`There are $${n}$ people, so divide by $${n}$.`, `$${mv(t / 100)} \\div ${n} ${eq(per)}$`, `Round to the nearest cent: ${money(per)}.`, `Each person pays ${money(per)}.`],
    };
  },
  // Total length of three pieces
  (rng, name) => {
    const a = rng.int(45, 300);
    const b = 10 * rng.int(5, 30);
    const c = retry(() => rng.int(45, 300), (x) => x % 10 !== 0);
    const [p1, p2, p3] = rng.shuffle([a, b, c]);
    const t = p1 + p2 + p3;
    const job = rng.pick([
      ['is helping a plumber', 'pipe'],
      ['is putting up trim in a kitchen', 'trim'],
      ['is wiring a garage', 'electrical conduit'],
      ['is building garden beds', 'edging'],
    ]);
    const m = (x: number) => fmtFixed(x / 100, 2);
    return {
      prompt: `${name} ${job[0]}. The job needs three pieces of ${job[1]}: ${q(p1 / 100, 'm')}, ${q(p2 / 100, 'm')} and ${q(p3 / 100, 'm')}. What is the total length?`,
      parts: [exact(t / 100, 'm')],
      hints: ['Add the three lengths.', `${ALIGN} You can write $${num(b / 100)}$ as $${m(b)}$ so every number has two decimal places.`],
      solution: ['Line up the decimal points. Give every number two decimal places.', `$${m(p1)} + ${m(p2)} + ${m(p3)} = ${m(t)}$`, `The total length is ${q(t / 100, 'm')}.`],
    };
  },
  // Price per kilogram × mass
  (rng, name) => {
    const it = rng.pick([
      { item: 'apples', p: [2.49, 2.99, 3.49, 3.99] },
      { item: 'bananas', p: [1.49, 1.69, 1.79] },
      { item: 'ground beef', p: [9.99, 10.49, 11.99] },
      { item: 'grapes', p: [4.99, 5.49, 6.49] },
      { item: 'chicken thighs', p: [7.99, 8.49, 8.99] },
      { item: 'carrots', p: [1.29, 1.49, 1.99] },
    ]);
    const price = rng.pick(it.p);
    const kg = retry(() => rng.int(55, 360) / 100, (m) => !onEdge(m * price, 2) && !isWhole(m * 10));
    const cost = kg * price;
    return {
      prompt: `${name} buys ${q(kg, 'kg')} of ${it.item} at a grocery store. The ${it.item} cost ${money(price)} per kilogram. What is the cost, ${CENT}?`,
      parts: [moneyPart(cost)],
      hints: ['Multiply the mass by the price for one kilogram.', `Find $${num(kg)} \\times ${mv(price)}$, then round to $2$ decimal places.`],
      solution: ['Cost = mass × price per kilogram', `$${num(kg)} \\times ${mv(price)} ${eq(cost)}$`, `Round to the nearest cent: ${money(cost)}.`, `The ${it.item} cost ${money(cost)}.`],
    };
  },
  // Hours × hourly wage
  (rng, name) => {
    const w = rng.pick(WAGES);
    const h = retry(() => rng.pick([3.75, 4.5, 5.25, 5.5, 5.75, 6.25, 6.5, 7.25, 7.5, 8.75]), (x) => !onEdge(x * w, 2));
    const pay = h * w;
    return {
      prompt: `${name} works $${num(h)}$ hours ${rng.pick(JOBS)}. The pay is ${money(w)} per hour. How much does ${name} earn, ${CENT}?`,
      parts: [moneyPart(pay)],
      hints: ['Multiply the hours by the pay for one hour.', `Find $${num(h)} \\times ${mv(w)}$.`],
      solution: ['Pay = hours worked × hourly wage', `$${num(h)} \\times ${mv(w)} ${eq(pay)}$`, `Round to the nearest cent: ${money(pay)}.`, `${name} earns ${money(pay)}.`],
    };
  },
];

const OPS_D3: Ctx[] = [
  // Cut several pieces, find what is left
  (rng, name) => {
    const it = rng.pick([
      { job: 'works for a fencing company', what: 'A steel rail' },
      { job: 'is helping a plumber', what: 'A length of plastic pipe' },
      { job: 'is a construction labourer', what: 'A piece of lumber' },
      { job: 'is putting up shelves', what: 'A board' },
    ]);
    const P = rng.pick([3, 4, 5, 6]);
    const k = rng.int(2, 4);
    const L = retry(() => rng.int(45, 180), (x) => P * 100 - k * x >= 20 && x % 10 !== 0);
    const used = k * L;
    const left = P * 100 - used;
    const m = (x: number) => fmtFixed(x / 100, 2);
    return {
      prompt: `${name} ${it.job}. ${it.what} is ${q(P, 'm')} long. ${name} cuts $${k}$ pieces from it. Each piece is ${q(L / 100, 'm')} long. How much is left?`,
      parts: [exact(left / 100, 'm')],
      hints: ['First find the total length of the pieces. Then subtract it from the whole length.', `Multiply $${k} \\times ${m(L)}$. Then subtract that from $${P}$.`],
      solution: [
        `Length of the pieces: $${k} \\times ${m(L)} = ${m(used)}$`,
        `Length left: $${P} - ${m(used)} = ${m(left)}$`,
        `There is ${q(left / 100, 'm')} left.`,
      ],
    };
  },
  // Bill plus tip, split equally
  (rng, name) => {
    const n = rng.int(3, 5);
    const tip = rng.int(5, 18);
    const bill = retry(() => rng.int(3500, 12000), (c) => (c + tip * 100) % n !== 0 && !onEdge((c / 100 + tip) / n, 2));
    const total = bill / 100 + tip;
    const per = total / n;
    return {
      prompt: `${name} and ${friends(n)} eat at a restaurant in ${rng.pick(TOWNS)}. The bill is ${money(bill / 100)}. They leave ${art(tip)} ${tag(tip)} tip. They split the bill and the tip equally. How much does each person pay, ${CENT}?`,
      parts: [moneyPart(per)],
      hints: ['First add the tip to the bill. Then share the total equally.', `Find $${mv(bill / 100)} + ${mv(tip)}$, then divide by $${n}$.`],
      solution: [
        `Total with the tip: $${mv(bill / 100)} + ${mv(tip)} = ${mv(total)}$`,
        `Share among $${n}$ people: $${mv(total)} \\div ${n} ${eq(per)}$`,
        `Round to the nearest cent: ${money(per)}.`,
        `Each person pays ${money(per)}.`,
      ],
    };
  },
  // Two shifts × wage
  (rng, name) => {
    const w = rng.pick(WAGES);
    const [h1, h2] = retry(() => rng.sample([3.5, 3.75, 4.5, 5.25, 6, 6.5, 7.25, 7.5, 8], 2), ([a, b]) => !onEdge((a + b) * w, 2));
    const h = h1 + h2;
    const pay = h * w;
    return {
      prompt: `${name} works ${rng.pick(JOBS)}. On Saturday, ${name} works $${num(h1)}$ hours. On Sunday, ${name} works $${num(h2)}$ hours. The pay is ${money(w)} per hour. How much does ${name} earn for the weekend, ${CENT}?`,
      parts: [moneyPart(pay)],
      hints: ['First add the hours for the two days.', 'Then multiply the total hours by the pay for one hour.'],
      solution: [
        `Total hours: $${num(h1)} + ${num(h2)} = ${num(h)}$`,
        `Pay: $${num(h)} \\times ${mv(w)} ${eq(pay)}$`,
        `Round to the nearest cent: ${money(pay)}.`,
        `${name} earns ${money(pay)} for the weekend.`,
      ],
    };
  },
  // Gas plus a few items
  (rng, name) => {
    const price = rng.pick(GAS);
    const L = retry(() => rng.int(300, 650) / 10, (x) => !onEdge(x * price, 2) && !isWhole(x));
    const gas = L * price;
    const gasR = roundTo(gas, 2);
    const it = rng.pick([
      { thing: 'jugs of windshield washer fluid', p: [3.99, 4.29, 4.49, 4.99] },
      { thing: 'bottles of water', p: [1.29, 1.49, 1.79] },
      { thing: 'bags of chips', p: [2.29, 2.79, 3.49] },
      { thing: 'cups of coffee', p: [1.89, 2.19, 2.49] },
    ]);
    const p = rng.pick(it.p);
    const k = rng.int(2, 3);
    const extra = clean(k * p);
    const total = clean(gasR + extra);
    return {
      prompt: `${name} stops for gas near ${rng.pick(TOWNS)}. Gas costs ${money3(price)} per litre, and ${name} pumps ${q(L, 'L')}. ${name} also buys $${k}$ ${it.thing} for ${money(p)} each. What is the total cost, ${CENT}?`,
      parts: [moneyPart(total)],
      hints: ['Find the cost of the gas and the cost of the other items. Then add.', `Gas: multiply $${num(L)} \\times ${num(price)}$ and round to the nearest cent.`],
      solution: [
        `Gas: $${num(L)} \\times ${num(price)} ${eq(gas)}$${roundsTo(gas)}.`,
        `${cap(it.thing)}: $${k} \\times ${mv(p)} = ${mv(extra)}$`,
        `Total: $${mv(gasR)} + ${mv(extra)} = ${mv(total)}$`,
        `The total cost is ${money(total)}.`,
      ],
    };
  },
];

const decimalOps = skill({
  id: 'm104-decimal-ops',
  name: 'Operations with decimals',
  description: 'Add, subtract, multiply and divide decimals in money and measurement problems, rounding money to the nearest cent.',
  outcomes: ['N2'],
  lessonId: 'm104-3-1',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    return rng.pick(d === 1 ? OPS_D1 : d === 2 ? OPS_D2 : OPS_D3)(rng, name);
  },
});

// ---------------------------------------------------------------------------
// 3.1 Making change
// ---------------------------------------------------------------------------

interface Store {
  where: string;
  /** [label, lowest price, highest price] in cents. */
  items: Array<[string, number, number]>;
}

const STORES: Store[] = [
  { where: 'a coffee shop', items: [['Coffee', 175, 325], ['Tea', 150, 295], ['Muffin', 195, 375], ['Bagel', 225, 450], ['Cookie', 125, 250], ['Hot chocolate', 225, 395], ['Breakfast wrap', 495, 795]] },
  { where: 'a grocery store', items: [['Milk', 329, 629], ['Bread', 249, 449], ['Eggs', 399, 649], ['Apples', 349, 699], ['Cheese', 549, 899], ['Bananas', 129, 299], ['Cereal', 399, 699], ['Juice', 249, 499]] },
  { where: 'a hardware store', items: [['Screws', 499, 999], ['Duct tape', 549, 999], ['Work gloves', 799, 1499], ['Paint brush', 599, 1199], ['Light bulbs', 699, 1299], ['Sandpaper', 349, 799]] },
  { where: 'a fast-food restaurant', items: [['Burger', 549, 899], ['Fries', 249, 449], ['Pop', 179, 299], ['Chicken wrap', 599, 899], ['Salad', 599, 999], ['Ice cream', 199, 399]] },
  { where: 'a drugstore', items: [['Shampoo', 449, 999], ['Toothpaste', 249, 549], ['Snack bar', 129, 249], ['Bottled water', 129, 249], ['Bandages', 399, 799], ['Sunscreen', 899, 1499]] },
];

/** Smallest bill bigger than the total. */
const billFor = (cents: number) => [5, 10, 20, 50, 100].find((b) => b * 100 > cents) ?? 100;

const ROUND_RULE =
  'Canada has no penny, so a cash total is rounded to the nearest 5 cents. Totals ending in 1 or 2 cents round down to 0. Totals ending in 3 or 4 round up to 5. Totals ending in 6 or 7 round down to 5. Totals ending in 8 or 9 round up to 10.';

function roundWord(last: number): string {
  if (last === 1 || last === 2) return `$${last}$ rounds down to $0$`;
  if (last === 3 || last === 4) return `$${last}$ rounds up to $5$`;
  if (last === 6 || last === 7) return `$${last}$ rounds down to $5$`;
  return `$${last}$ rounds up to $10$`;
}

function makingChange(rng: Rng, d: Difficulty): Out {
  const name = rng.pick(NAMES);
  for (let tries = 0; ; tries++) {
    const store = rng.pick(d === 1 ? STORES.filter((s) => s.where !== 'a hardware store') : STORES);
    const n = d === 1 ? 2 : d === 2 ? rng.int(3, 4) : 3;
    const picked = rng.sample(store.items, n);
    const prices = picked.map(([, lo, hi]) => {
      if (d === 1) return 25 * rng.int(Math.ceil(lo / 25), Math.floor(hi / 25));
      const c = rng.int(lo, hi);
      return Math.floor(c / 10) * 10 + rng.pick([9, 9, 9, 9, 5, 0, 7, 3]);
    });
    const total = prices.reduce((s, x) => s + x, 0);
    const last = total % 10;
    if (d === 3 && (last === 0 || last === 5) && tries < 40) continue;
    const cash = d === 3 ? Math.round(total / 5) * 5 : total;
    const bill = billFor(cash);
    const change = bill * 100 - cash;
    const figure: Figure = { type: 'table', headers: ['Item', 'Price'], rows: picked.map(([label], i) => [label, cell(prices[i] / 100)]) };
    const addStep = `Add the prices: $${prices.map((x) => mv(x / 100)).join(' + ')} = ${mv(total / 100)}$. The total is ${money(total / 100)}.`;
    if (d < 3) {
      return {
        prompt: `${name} buys ${n === 2 ? 'two' : n === 3 ? 'three' : 'four'} things at ${store.where}. The receipt shows the prices. ${name} pays with a \\$${bill} bill. What is the total, and how much change should ${name} get?`,
        figure,
        parts: [cashPart(total / 100, 'Total (\\$)'), cashPart(change / 100, 'Change (\\$)')],
        hints: ['Add the prices on the receipt to find the total.', `Change = money paid − total. You can also count up from the total to \\$${bill}.`],
        solution: [addStep, `Change = money paid − total: $${mv(bill)} - ${mv(total / 100)} = ${mv(change / 100)}$`, `The total is ${money(total / 100)}, and ${name} should get ${money(change / 100)} in change.`],
      };
    }
    const roundStep =
      last === 0 || last === 5
        ? `The last digit of the total is $${last}$, so it does not change. The cash total is ${money(cash / 100)}.`
        : `The last digit of the total is $${last}$, and ${roundWord(last)}. The cash total is ${money(cash / 100)}.`;
    return {
      prompt: `${name} buys three things at ${store.where} and pays with cash. ${ROUND_RULE} ${name} pays with a \\$${bill} bill. Find the total on the receipt, the cash total and the change.`,
      figure,
      parts: [cashPart(total / 100, 'Receipt total (\\$)'), cashPart(cash / 100, 'Cash total (\\$)'), cashPart(change / 100, 'Change (\\$)')],
      hints: ['First add the prices. Then look at the last digit of the cents to round to the nearest 5 cents.', 'Find the change from the rounded cash total: money paid − cash total.'],
      solution: [addStep, roundStep, `Change = money paid − cash total: $${mv(bill)} - ${mv(cash / 100)} = ${mv(change / 100)}$`, `${name} pays ${money(cash / 100)} and gets ${money(change / 100)} in change.`],
    };
  }
}

const makingChangeSkill = skill({
  id: 'm104-making-change',
  name: 'Totals and making change',
  description: 'Find the total of a bill and the change from a payment, rounding a cash total to the nearest 5 cents.',
  outcomes: ['N1', 'N2'],
  lessonId: 'm104-3-1',
  calculator: true,
  gen: makingChange,
});

// ---------------------------------------------------------------------------
// 3.2 Fractions, decimals and percents
// ---------------------------------------------------------------------------

const FRAC_EASY: Array<[number, number]> = [[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 10], [3, 10], [7, 10], [9, 10]];
const FRAC_HARD: Array<[number, number]> = [[1, 8], [3, 8], [5, 8], [7, 8], [7, 20], [9, 20], [11, 20], [13, 20], [3, 25], [7, 25], [9, 50], [13, 50], [17, 25]];

const PERCENT_MEANS = 'Percent means "out of $100$".';

function fracToPercentEasy(n: number, d: number): Out {
  const m = 100 / d;
  const p = n * m;
  return {
    prompt: `Write $${fr(n, d)}$ as a percent.`,
    parts: [exact(p, '%')],
    hints: [PERCENT_MEANS, `Find an equal fraction with $100$ on the bottom. Multiply the top and the bottom by $${m}$.`],
    solution: [
      `${PERCENT_MEANS} Multiply the top and the bottom by $${m}$: $${fr(n, d)} = ${fr(`${n} \\times ${m}`, `${d} \\times ${m}`)} = ${fr(p, 100)}$`,
      `$${fr(p, 100)}$ is $${p}$ out of $100$, or $${pc(p)}$.`,
      `So $${fr(n, d)} = ${pc(p)}$.`,
    ],
  };
}

function fracToPercentDivide(n: number, d: number): Out {
  const dec = clean(n / d);
  const p = clean(dec * 100);
  return {
    prompt: `Write $${fr(n, d)}$ as a percent.`,
    parts: [exact(p, '%')],
    hints: ['Divide the top number by the bottom number to get a decimal.', 'Then multiply the decimal by $100$ to get a percent.'],
    solution: [`Divide the top by the bottom: $${n} \\div ${d} = ${num(dec)}$`, `Multiply by $100$: $${num(dec)} \\times 100 = ${num(p)}$`, `So $${fr(n, d)} = ${pc(p)}$.`],
    calculator: true,
  };
}

function decToPercent(dec: number): Out {
  const p = clean(dec * 100);
  return {
    prompt: `Write $${num(dec)}$ as a percent.`,
    parts: [exact(p, '%')],
    hints: ['To change a decimal to a percent, multiply by $100$.', 'Multiplying by $100$ moves the decimal point $2$ places to the right.'],
    solution: [`Multiply by $100$. The decimal point moves $2$ places to the right: $${num(dec)} \\times 100 = ${num(p)}$`, `So $${num(dec)} = ${pc(p)}$.`],
  };
}

function percentToDec(p: number): Out {
  const dec = clean(p / 100);
  return {
    prompt: `Write $${pc(p)}$ as a decimal.`,
    parts: [exact(dec)],
    hints: ['To change a percent to a decimal, divide by $100$.', 'Dividing by $100$ moves the decimal point $2$ places to the left. Put in zeros if you run out of digits.'],
    solution: [`Divide by $100$. The decimal point moves $2$ places to the left: $${num(p)} \\div 100 = ${num(dec)}$`, `So $${pc(p)} = ${num(dec)}$.`],
  };
}

function convertFdp(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const kind = rng.pick(['f2p', 'd2p', 'p2d', 'mc'] as const);
    if (kind === 'd2p') return decToPercent(rng.pick([0.25, 0.4, 0.75, 0.35, 0.6, 0.15, 0.5, 0.9, 0.45, 0.8, 0.65, 0.2]));
    if (kind === 'p2d') return percentToDec(rng.pick([50, 25, 75, 40, 30, 60, 15, 90, 35, 20, 45, 10, 80, 65]));
    const [n, dd] = rng.pick(FRAC_EASY);
    if (kind === 'f2p') return fracToPercentEasy(n, dd);
    const p = (100 * n) / dd;
    const m = 100 / dd;
    const wrong = [`${fmt(n / dd)}%`, `${100 - p}%`, ...(Number(`${n}${dd}`) < 100 ? [`${n}${dd}%`] : []), `${fmt(p / 10)}%`, `${dd}%`];
    return {
      prompt: `Which percent is equal to $${fr(n, dd)}$?`,
      parts: [{ answer: mc(rng, `${p}%`, wrong) }],
      hints: [PERCENT_MEANS, `Find an equal fraction with $100$ on the bottom. Multiply the top and the bottom by $${m}$.`],
      solution: [`Multiply the top and the bottom by $${m}$: $${fr(n, dd)} = ${fr(p, 100)}$`, `$${p}$ out of $100$ is $${pc(p)}$.`, `So $${fr(n, dd)} = ${pc(p)}$.`],
    };
  }
  if (d === 2) {
    const kind = rng.pick(['f2p', 'd2p', 'p2d', 'p2f', 'third'] as const);
    if (kind === 'f2p') {
      const [n, dd] = rng.pick(FRAC_HARD);
      return fracToPercentDivide(n, dd);
    }
    if (kind === 'd2p') return decToPercent(rng.pick([0.06, 0.08, 0.035, 0.125, 1.25, 1.5, 0.045, 0.02, 0.375, 0.07]));
    if (kind === 'p2d') return percentToDec(rng.pick([6, 8, 12.5, 150, 2.5, 4, 7.5, 120, 3, 9]));
    if (kind === 'third') {
      const [n, dd] = rng.pick([[1, 3], [2, 3], [1, 6], [5, 6]] as const);
      const dec = n / dd;
      const p = dec * 100;
      return {
        prompt: `Write $${fr(n, dd)}$ as a percent, to the nearest tenth of a percent.`,
        parts: [numPart(p, { decimals: 1, suffix: '%' })],
        hints: ['Divide the top number by the bottom number. The decimal goes on and on.', 'Multiply by $100$, then round to one decimal place.'],
        solution: [`Divide: $${n} \\div ${dd} = ${fmt(dec, 5)}\\ldots$`, `Multiply by $100$: $${fmt(p, 3)}\\ldots$`, `Round to the nearest tenth: $${fr(n, dd)} \\approx ${fmtFixed(p, 1)}\\%$.`],
        calculator: true,
      };
    }
    const p = rng.pick([35, 45, 15, 12, 64, 85, 24, 40, 60, 80, 5, 8, 75, 36, 26]);
    const f = frac(p, 100);
    const g = 100 / f.d;
    const wrong = [fr(p, 10), fr(f.d, f.n)];
    if (p >= 10 && p % 10 !== 0) wrong.splice(1, 0, fr(Math.floor(p / 10), p % 10));
    wrong.push(fr(f.n, f.d * 10), fr(1, p));
    return {
      prompt: `Which fraction in lowest terms is equal to $${pc(p)}$?`,
      parts: [{ answer: mc(rng, `$${fr(f.n, f.d)}$`, wrong.map((w) => `$${w}$`)) }],
      hints: [`${PERCENT_MEANS} Write the percent as a fraction over $100$.`, 'Simplify: divide the top and the bottom by the same number until you cannot divide any more.'],
      solution: [`${PERCENT_MEANS} $${pc(p)} = ${fr(p, 100)}$`, `Divide the top and the bottom by $${g}$: $${fr(`${p} \\div ${g}`, `100 \\div ${g}`)} = ${fr(f.n, f.d)}$`, `So $${pc(p)} = ${fr(f.n, f.d)}$.`],
    };
  }
  // d === 3: a real task with two steps
  const name = rng.pick(NAMES);
  const kind = rng.pick(['outof', 'compare', 'share'] as const);
  if (kind === 'outof') {
    const total = rng.pick([20, 25, 40, 50, 80, 200]);
    const k = retry(() => rng.int(Math.ceil(total * 0.4), Math.floor(total * 0.95)), (x) => (x * 100) % total === 0);
    const p = (k * 100) / total;
    const c = rng.pick([
      { setup: `${name} works in hotel housekeeping. There are $${total}$ rooms to clean today. By lunch, $${k}$ rooms are clean.`, q1: 'What percent of the rooms are clean?', q2: 'What percent still need to be cleaned?', l1: 'Clean', l2: 'Not clean yet' },
      { setup: `${name}’s crew has $${total}$ trees to plant. So far, they have planted $${k}$ of them.`, q1: 'What percent of the trees are planted?', q2: 'What percent are not planted yet?', l1: 'Planted', l2: 'Not planted' },
      { setup: `A pizza shop in ${rng.pick(TOWNS)} had $${total}$ delivery orders on Friday. $${k}$ of them were delivered on time.`, q1: 'What percent were on time?', q2: 'What percent were late?', l1: 'On time', l2: 'Late' },
      { setup: `${name} planted $${total}$ seeds in a greenhouse. $${k}$ of the seeds sprouted.`, q1: 'What percent of the seeds sprouted?', q2: 'What percent did not sprout?', l1: 'Sprouted', l2: 'Did not sprout' },
      { setup: `${name} got $${k}$ out of $${total}$ questions right on a workplace safety quiz.`, q1: 'What is the score as a percent?', q2: 'What percent of the questions were wrong?', l1: 'Right', l2: 'Wrong' },
    ]);
    const dec = k / total;
    return {
      prompt: `${c.setup} ${c.q1} ${c.q2}`,
      parts: [exact(p, '%', c.l1), exact(100 - p, '%', c.l2)],
      hints: [`Write a fraction: $${fr(k, total)}$. Divide, then multiply by $100$.`, 'All of the group is $100\\%$. Subtract to find the percent that is left.'],
      solution: [
        `Write it as a fraction: $${fr(k, total)}$`,
        `Divide: $${k} \\div ${total} = ${num(dec)}$. Multiply by $100$: $${num(dec)} \\times 100 = ${num(p)}$, so the answer is $${pc(p)}$.`,
        `The whole group is $100\\%$: $100\\% - ${pc(p)} = ${pc(100 - p)}$`,
        `${c.l1}: $${pc(p)}$. ${c.l2}: $${pc(100 - p)}$.`,
      ],
      calculator: true,
    };
  }
  if (kind === 'compare') {
    const total = rng.pick([20, 25, 40, 50]);
    const k = retry(() => rng.int(Math.ceil(total * 0.55), total - 1), (x) => (x * 100) % total === 0);
    const p1 = (k * 100) / total;
    const p2 = Math.min(99, p1 + rng.pick([-6, -4, -3, -2, 0, 2, 3, 4, 6]));
    const course = rng.pick(['a forklift course', 'a first aid course', 'a food safety course', 'a cashier training course']);
    const idx = p1 > p2 ? 0 : p1 < p2 ? 1 : 2;
    return {
      prompt: `${name} wrote two tests in ${course}. On the first test, ${name} got $${k}$ out of $${total}$. On the second test, ${name} got $${pc(p2)}$. Write the first score as a percent. Then decide which score is better.`,
      parts: [exact(p1, '%', 'First test'), { label: 'Better score', answer: fixedChoice(['The first test', 'The second test', 'They are the same'], idx) }],
      hints: ['Change the first score to a percent: divide, then multiply by $100$.', 'Now both scores are percents. Compare them.'],
      solution: [
        `First test: $${k} \\div ${total} = ${num(k / total)}$, and $${num(k / total)} \\times 100 = ${num(p1)}$, so $${pc(p1)}$.`,
        `Second test: $${pc(p2)}$.`,
        idx === 2 ? `$${pc(p1)} = ${pc(p2)}$, so the scores are the same.` : `$${pc(p1)} ${idx === 0 ? '>' : '<'} ${pc(p2)}$, so the ${idx === 0 ? 'first' : 'second'} test has the better score.`,
      ],
      calculator: true,
    };
  }
  const [n, dd] = rng.pick([...FRAC_EASY.filter(([, b]) => b !== 10), [1, 8], [3, 8], [5, 8], [7, 20], [9, 20]] as Array<[number, number]>);
  const N = dd * rng.int(Math.ceil(40 / dd), Math.floor(240 / dd));
  const p = clean((100 * n) / dd);
  const count = (N * n) / dd;
  const c = rng.pick([
    `In a survey of $${N}$ customers at a coffee shop in ${rng.pick(TOWNS)}, $${fr(n, dd)}$ of them ordered tea.`,
    `A warehouse has $${N}$ workers. $${fr(n, dd)}$ of them take the bus to work.`,
    `$${N}$ people came to a community supper. $${fr(n, dd)}$ of them chose the chili.`,
    `A farm has $${N}$ hens. $${fr(n, dd)}$ of them are brown hens.`,
  ]);
  return {
    prompt: `${c} What percent is that? How many is that?`,
    parts: [exact(p, '%', 'Percent'), numPart(count, { label: 'How many' })],
    hints: ['Change the fraction to a percent: divide the top by the bottom, then multiply by $100$.', `To find how many, find $${fr(n, dd)}$ of $${N}$: divide by $${dd}$${n === 1 ? '' : `, then multiply by $${n}$`}.`],
    solution: [
      `Percent: $${n} \\div ${dd} = ${num(n / dd)}$, and $${num(n / dd)} \\times 100 = ${num(p)}$, so $${pc(p)}$.`,
      n === 1 ? `How many: $${N} \\div ${dd} = ${count}$.` : `How many: $${N} \\div ${dd} = ${N / dd}$, and $${N / dd} \\times ${n} = ${count}$.`,
      `It is $${pc(p)}$, or $${count}$ out of $${N}$.`,
    ],
    calculator: true,
  };
}

const convertFdpSkill = skill({
  id: 'm104-convert-fdp',
  name: 'Fractions, decimals and percents',
  description: 'Change between fractions, decimals and percents, and use a percent to describe part of a group.',
  outcomes: ['N1'],
  lessonId: 'm104-3-2',
  calculator: false,
  gen: convertFdp,
});

// ---------------------------------------------------------------------------
// 3.3 Percent of an amount
// ---------------------------------------------------------------------------

const SHORTCUT: Record<number, string> = {
  10: 'Shortcut: $10\\%$ is one tenth, so divide by $10$.',
  20: 'Shortcut: $20\\%$ is one fifth, so divide by $5$.',
  25: 'Shortcut: $25\\%$ is one quarter, so divide by $4$.',
  50: 'Shortcut: $50\\%$ is one half, so divide by $2$.',
  75: 'Shortcut: $75\\%$ is three quarters, so divide by $4$ and multiply by $3$.',
};
const PCT_METHOD = 'Change the percent to a decimal (divide by $100$). Then multiply by the amount.';

/** A whole number N near [lo, hi] for which p% of N is a whole number. */
function wholeBase(rng: Rng, p: number, lo: number, hi: number): number {
  const unit = frac(p, 100).d;
  return unit * rng.int(Math.max(1, Math.ceil(lo / unit)), Math.max(1, Math.floor(hi / unit)));
}

function pctSteps(p: number, base: string, result: number, resultTex = num(result)): string[] {
  return [`Change the percent to a decimal: $${pc(p)} = ${num(p / 100)}$`, `Multiply: $${num(p / 100)} \\times ${base} ${Math.abs(result - roundTo(result, 4)) < 1e-9 ? '=' : '\\approx'} ${resultTex}$`];
}

const PO_D1: Ctx[] = [
  // People in a group
  (rng) => {
    const p = rng.pick([10, 20, 25, 50, 75]);
    const N = wholeBase(rng, p, 20, 120);
    const ans = (N * p) / 100;
    const c = rng.pick([
      [`There are $${N}$ students in a class. $${pc(p)}$ of them take the bus to school. How many students take the bus?`, 'students take the bus'],
      [`A warehouse in ${rng.pick(TOWNS)} has $${N}$ workers. $${pc(p)}$ of them work the night shift. How many workers is that?`, 'workers work the night shift'],
      [`A day camp has $${N}$ kids. $${pc(p)}$ of them bring their own lunch. How many kids bring their own lunch?`, 'kids bring their own lunch'],
      [`A hotel has $${N}$ rooms. $${pc(p)}$ of them need new towels today. How many rooms need new towels?`, 'rooms need new towels'],
    ]);
    return {
      prompt: c[0],
      parts: [numPart(ans)],
      hints: [PCT_METHOD, SHORTCUT[p]],
      solution: [...pctSteps(p, String(N), ans), `$${ans}$ ${c[1]}.`],
    };
  },
  // Tip on a bill
  (rng, name) => {
    const p = rng.pick([10, 20]);
    const bill = 5 * rng.int(4, 18);
    const tip = (bill * p) / 100;
    return {
      prompt: `${name}’s lunch bill at a café in ${rng.pick(TOWNS)} is ${tag(bill)}. ${name} wants to leave ${art(p)} ${p}% tip. How much is the tip?`,
      parts: [cashPart(tip)],
      hints: [PCT_METHOD, SHORTCUT[p]],
      solution: [...pctSteps(p, String(bill), tip, mv(tip)), `The tip is ${money(tip)}.`],
    };
  },
  // Water in a tank
  (rng) => {
    const p = rng.pick([10, 20, 25, 50, 75]);
    const L = rng.pick([40, 60, 80, 100, 120, 200, 400]);
    const ans = (L * p) / 100;
    const [tank, short] = rng.pick([['water tank on a farm', 'tank'], ['fuel tank on a tractor', 'tank'], ['water trough for cattle', 'trough'], ['rain barrel', 'barrel']]);
    return {
      prompt: `${cap(art(L))} ${q(L, 'L')} ${tank} is ${p}% full. How many litres are in it?`,
      parts: [exact(ans, 'L')],
      hints: [PCT_METHOD, SHORTCUT[p]],
      solution: [...pctSteps(p, String(L), ans), `There are ${q(ans, 'L')} in the ${short}.`],
    };
  },
  // Savings from a paycheque
  (rng, name) => {
    const p = rng.pick([10, 20, 25, 50]);
    const pay = 20 * rng.int(12, 40);
    const ans = (pay * p) / 100;
    return {
      prompt: `${name} earns ${tag(pay)} this week ${rng.pick(JOBS)}. ${name} saves ${p}% of it. How much does ${name} save?`,
      parts: [cashPart(ans)],
      hints: [PCT_METHOD, SHORTCUT[p]],
      solution: [...pctSteps(p, String(pay), ans, mv(ans)), `${name} saves ${money(ans)}.`],
    };
  },
];

const PO_D2: Ctx[] = [
  // Realistic tip, nearest cent
  (rng, name) => {
    const p = rng.pick([15, 18, 12, 20]);
    const bill = retry(() => rng.int(2340, 9875), (c) => !onEdge((c * p) / 10000, 2) && (c * p) % 100 !== 0);
    const tip = (bill * p) / 10000;
    return {
      prompt: `${name}’s family eats dinner at a restaurant in ${rng.pick(TOWNS)}. The bill is ${money(bill / 100)}. They leave ${art(p)} ${p}% tip. How much is the tip, ${CENT}?`,
      parts: [moneyPart(tip)],
      hints: [PCT_METHOD, `Find $${num(p / 100)} \\times ${mv(bill / 100)}$, then round to $2$ decimal places.`],
      solution: [...pctSteps(p, mv(bill / 100), tip), `Round to the nearest cent: the tip is ${money(tip)}.`],
      calculator: true,
    };
  },
  // A count in a large group
  (rng) => {
    const p = rng.pick([12, 15, 35, 8, 65, 4, 18, 45]);
    const N = wholeBase(rng, p, 120, 600);
    const ans = (N * p) / 100;
    const c = rng.pick([
      [`A grocery store sold $${N}$ cartons of eggs last week. $${pc(p)}$ of them were the large size. How many cartons of large eggs were sold?`, 'cartons of large eggs were sold'],
      [`$${N}$ people ran in a fun run in ${rng.pick(TOWNS)}. $${pc(p)}$ of them were under $18$. How many runners were under $18$?`, 'runners were under $18$'],
      [`A warehouse shipped $${N}$ boxes. $${pc(p)}$ of the boxes went to Ashford. How many boxes went to Ashford?`, 'boxes went to Ashford'],
      [`A coffee shop served $${N}$ customers on Monday. $${pc(p)}$ of them paid with cash. How many customers paid with cash?`, 'customers paid with cash'],
    ]);
    return {
      prompt: c[0],
      parts: [numPart(ans)],
      hints: [PCT_METHOD, `Find $${num(p / 100)} \\times ${N}$.`],
      solution: [...pctSteps(p, String(N), ans), `$${ans}$ ${c[1]}.`],
    };
  },
  // Commission on sales
  (rng, name) => {
    const p = rng.pick([3, 4, 5, 6, 8]);
    const sales = retry(() => rng.int(1250, 4800), (s) => !onEdge((s * p) / 100, 2));
    const ans = (sales * p) / 100;
    const what = rng.pick(['furniture', 'cell phones', 'used cars', 'shoes', 'appliances']);
    return {
      prompt: `${name} sells ${what} and earns ${art(p)} ${p}% commission on sales. (A commission is a part of the sales that the worker gets as pay.) This week ${name} sold ${tag(sales)} worth of ${what}. How much commission did ${name} earn?`,
      parts: [cashPart(ans)],
      hints: [PCT_METHOD, `Find $${num(p / 100)} \\times ${num(sales)}$.`],
      solution: [...pctSteps(p, num(sales), ans, mv(ans)), `${name} earned ${money(ans)} in commission.`],
      calculator: true,
    };
  },
  // Nitrogen in a bag of fertilizer
  (rng, name) => {
    const p = rng.pick([11, 21, 34, 46, 12, 18]);
    const kg = rng.pick([20, 25, 40]);
    const ans = clean((kg * p) / 100);
    return {
      prompt: `${name} works on a farm. ${cap(art(kg))} ${q(kg, 'kg')} bag of fertilizer is ${p}% nitrogen. How many kilograms of nitrogen are in the bag?`,
      parts: [exact(ans, 'kg')],
      hints: [PCT_METHOD, `Find $${num(p / 100)} \\times ${kg}$.`],
      solution: [...pctSteps(p, String(kg), ans), `The bag has ${q(ans, 'kg')} of nitrogen.`],
      calculator: true,
    };
  },
];

const PO_D3: Ctx[] = [
  // Tip, then total with tip
  (rng, name) => {
    const p = rng.pick([15, 18, 20]);
    const bill = retry(() => rng.int(3000, 12000), (c) => !onEdge((c * p) / 10000, 2));
    const tip = (bill * p) / 10000;
    const tipR = roundTo(tip, 2);
    const total = clean(bill / 100 + tipR);
    return {
      prompt: `${name} takes a group from work out for lunch in ${rng.pick(TOWNS)}. The bill is ${money(bill / 100)}. ${name} wants to leave ${art(p)} ${p}% tip. How much is the tip, and what is the total with the tip? Round each answer ${CENT}.`,
      parts: [moneyPart(tip, 'Tip (\\$)'), moneyPart(total, 'Total (\\$)')],
      hints: ['First find the tip: change the percent to a decimal and multiply by the bill.', 'Then add the tip to the bill.'],
      solution: [...pctSteps(p, mv(bill / 100), tip), `Round to the nearest cent: the tip is ${money(tip)}.`, `Total: $${mv(bill / 100)} + ${mv(tipR)} = ${mv(total)}$`, `The tip is ${money(tip)} and the total is ${money(total)}.`],
      calculator: true,
    };
  },
  // How many are NOT in the group
  (rng) => {
    const c = rng.pick([
      { p: [2, 4, 5, 6, 8], lo: 200, hi: 600, s: (N: number, p: number) => `A farm collected $${N}$ eggs today. $${pc(p)}$ of the eggs were cracked.`, l1: 'Cracked', l2: 'Not cracked', ask: 'How many eggs were cracked? How many were not cracked?' },
      { p: [5, 10, 15, 20], lo: 100, hi: 400, s: (N: number, p: number) => `A warehouse received $${N}$ boxes. $${pc(p)}$ of the boxes were damaged.`, l1: 'Damaged', l2: 'Not damaged', ask: 'How many boxes were damaged? How many were not damaged?' },
      { p: [15, 25, 35, 40], lo: 80, hi: 300, s: (N: number, p: number) => `A hockey arena in ${rng.pick(TOWNS)} has $${N}$ seats. $${pc(p)}$ of the seats were empty at a game.`, l1: 'Empty', l2: 'Full', ask: 'How many seats were empty? How many seats had someone in them?' },
    ]);
    const p = rng.pick(c.p);
    const N = wholeBase(rng, p, c.lo, c.hi);
    const part1 = (N * p) / 100;
    return {
      prompt: `${c.s(N, p)} ${c.ask}`,
      parts: [numPart(part1, { label: c.l1 }), numPart(N - part1, { label: c.l2 })],
      hints: [`First find $${pc(p)}$ of $${N}$.`, `Then subtract from $${N}$ to find the rest.`],
      solution: [...pctSteps(p, String(N), part1), `The rest: $${N} - ${part1} = ${N - part1}$`, `${c.l1}: $${part1}$. ${c.l2}: $${N - part1}$.`],
      calculator: true,
    };
  },
  // Tank: how much more to fill it
  (rng, name) => {
    const p = rng.pick([15, 20, 30, 35, 40, 45, 60, 65]);
    const L = rng.pick([60, 80, 120, 200, 250, 300]);
    const have = clean((L * p) / 100);
    const more = clean(L - have);
    const tank = rng.pick(['water tank on a farm truck', 'fuel tank on a tractor', 'water tank for a pressure washer', 'stock-watering trough']);
    return {
      prompt: `${name} checks ${art(L)} ${q(L, 'L')} ${tank}. It is ${p}% full. How many litres are in it now? How many more litres will fill it?`,
      parts: [exact(have, 'L', 'In it now'), exact(more, 'L', 'More to fill')],
      hints: [`First find $${pc(p)}$ of $${L}$.`, `Then subtract from $${L}$ to find how much more fits.`],
      solution: [...pctSteps(p, String(L), have), `More to fill: $${L} - ${num(have)} = ${num(more)}$`, `There are ${q(have, 'L')} in it now. It needs ${q(more, 'L')} more.`],
      calculator: true,
    };
  },
  // A raise
  (rng, name) => {
    const p = rng.pick([2, 3, 4, 5, 6]);
    const w = retry(() => 0.25 * rng.int(60, 80), (x) => !onEdge((x * p) / 100, 2));
    const raise = (w * p) / 100;
    const raiseR = roundTo(raise, 2);
    const nw = clean(w + raiseR);
    return {
      prompt: `${name} earns ${money(w)} per hour ${rng.pick(JOBS)}. ${name} gets a ${p}% raise. How much is the raise per hour, and what is the new hourly wage? Round each answer ${CENT}.`,
      parts: [moneyPart(raise, 'Raise (\\$ per hour)'), moneyPart(nw, 'New wage (\\$ per hour)')],
      hints: [`First find $${pc(p)}$ of ${money(w)}.`, 'Then add the raise to the old wage.'],
      solution: [...pctSteps(p, mv(w), raise), `Round to the nearest cent: the raise is ${money(raise)} per hour.`, `New wage: $${mv(w)} + ${mv(raiseR)} = ${mv(nw)}$`, `The new wage is ${money(nw)} per hour.`],
      calculator: true,
    };
  },
];

const percentOf = skill({
  id: 'm104-percent-of',
  name: 'Percent of an amount',
  description: 'Find a percent of an amount, such as a tip, a part of a group or a commission.',
  outcomes: ['N2'],
  lessonId: 'm104-3-3',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    return rng.pick(d === 1 ? PO_D1 : d === 2 ? PO_D2 : PO_D3)(rng, name);
  },
});

// ---------------------------------------------------------------------------
// 3.3 Discounts and GST
// ---------------------------------------------------------------------------

const GOODS = [
  { item: 'a winter jacket', lo: 80, hi: 190 },
  { item: 'a pair of work boots', lo: 90, hi: 180 },
  { item: 'a cordless drill', lo: 80, hi: 200 },
  { item: 'a pair of jeans', lo: 40, hi: 80 },
  { item: 'a hockey stick', lo: 50, hi: 230 },
  { item: 'a microwave', lo: 80, hi: 150 },
  { item: 'a backpack', lo: 30, hi: 70 },
  { item: 'a set of pots', lo: 60, hi: 160 },
  { item: 'a bike helmet', lo: 40, hi: 110 },
  { item: 'a coffee maker', lo: 40, hi: 120 },
];
const GST = 'A sales tax (GST) of 5% is added to the price.';
const DISC_HINT = 'The discount is the percent of the price that you save. Sale price = price − discount.';

/** A realistic shelf price in dollars (x.99, x.49 or x.95). */
const shelf = (rng: Rng, lo: number, hi: number) => rng.int(lo, hi) - 1 + rng.pick([0.99, 0.99, 0.49, 0.95]);

function discountTax(rng: Rng, d: Difficulty): Out {
  const name = rng.pick(NAMES);
  const g = rng.pick(GOODS);
  const store = rng.pick(['a store in', 'a shop in']) + ' ' + rng.pick(TOWNS);
  if (d === 1) {
    if (rng.chance(0.5)) {
      const p = rng.pick([10, 20, 25, 50]);
      const price = 10 * rng.int(Math.ceil(g.lo / 10), Math.floor(g.hi / 10));
      const disc = (price * p) / 100;
      const sale = price - disc;
      return {
        prompt: `${cap(g.item)} costs ${tag(price)} at ${store}. It is on sale for ${p}% off. How much is the discount? What is the sale price?`,
        parts: [cashPart(disc, 'Discount (\\$)'), cashPart(sale, 'Sale price (\\$)')],
        hints: [DISC_HINT, SHORTCUT[p]],
        solution: [`Discount: $${pc(p)}$ of ${tag(price)} is $${num(p / 100)} \\times ${price} = ${mv(disc)}$`, `Sale price: $${price} - ${mv(disc)} = ${mv(sale)}$`, `The discount is ${money(disc)}, so the sale price is ${money(sale)}.`],
      };
    }
    const price = rng.chance(0.5) ? 10 * rng.int(Math.ceil((0.6 * g.lo) / 10), Math.floor(g.hi / 10)) : 2 * rng.int(Math.ceil((0.3 * g.lo)), Math.floor(g.hi / 2));
    const gst = (price * 5) / 100;
    const total = price + gst;
    return {
      prompt: `${name} buys ${g.item} for ${tag(price)}. ${GST} How much is the GST? What is the total?`,
      parts: [cashPart(gst, 'GST (\\$)'), cashPart(total, 'Total (\\$)')],
      hints: ['GST is $5\\%$ of the price. Change $5\\%$ to the decimal $0.05$ and multiply.', 'Then add the GST to the price.'],
      solution: [`GST: $0.05 \\times ${price} = ${mv(gst)}$`, `Total: $${price} + ${mv(gst)} = ${mv(total)}$`, `The GST is ${money(gst)} and the total is ${money(total)}.`],
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const p = rng.pick([15, 20, 25, 30, 35, 40]);
      const price = retry(() => shelf(rng, g.lo, g.hi), (x) => !onEdge((x * p) / 100, 2));
      const disc = (price * p) / 100;
      const discR = roundTo(disc, 2);
      const sale = clean(price - discR);
      return {
        prompt: `${cap(g.item)} costs ${money(price)}. This week it is ${p}% off. What is the sale price, ${CENT}?`,
        parts: [moneyPart(sale)],
        hints: [DISC_HINT, `Or use a shortcut: with ${p}% off, you pay ${100 - p}% of the price. Multiply by $${num((100 - p) / 100)}$.`],
        solution: [`Discount: $${num(p / 100)} \\times ${mv(price)} ${eq(disc)}$${roundsTo(disc)}.`, `Sale price: $${mv(price)} - ${mv(discR)} = ${mv(sale)}$`, `The sale price is ${money(sale)}.`],
      };
    }
    const price = retry(() => shelf(rng, g.lo, g.hi), (x) => !onEdge(x * 0.05, 2));
    const gst = price * 0.05;
    const gstR = roundTo(gst, 2);
    const total = clean(price + gstR);
    return {
      prompt: `${name} buys ${g.item} for ${money(price)}. ${GST} What is the total cost, ${CENT}?`,
      parts: [moneyPart(total)],
      hints: ['GST is $5\\%$ of the price: multiply the price by $0.05$.', 'Add the GST to the price. Or multiply the price by $1.05$ in one step.'],
      solution: [`GST: $0.05 \\times ${mv(price)} ${eq(gst)}$${roundsTo(gst)}.`, `Total: $${mv(price)} + ${mv(gstR)} = ${mv(total)}$`, `The total cost is ${money(total)}.`],
    };
  }
  // d === 3: discount first, then GST
  const p = rng.pick([15, 20, 25, 30, 40]);
  const { price, disc, sale, gst } = retry(
    () => {
      const price = shelf(rng, g.lo, g.hi);
      const disc = (price * p) / 100;
      const sale = clean(price - roundTo(disc, 2));
      return { price, disc, sale, gst: sale * 0.05 };
    },
    (o) => !onEdge(o.disc, 2) && !onEdge(o.gst, 2),
  );
  const discR = roundTo(disc, 2);
  const gstR = roundTo(gst, 2);
  const total = clean(sale + gstR);
  return {
    prompt: `${name} buys ${g.item} at ${store}. The price is ${money(price)}, and it is on sale for ${p}% off. ${GST} The store takes off the discount first. Then it adds the GST to the sale price. What is the sale price? What is the total cost? Round each answer ${CENT}.`,
    parts: [moneyPart(sale, 'Sale price (\\$)'), moneyPart(total, 'Total with GST (\\$)')],
    hints: ['Step 1: find the discount and subtract it from the price.', 'Step 2: find 5% GST on the sale price, not on the original price. Add it on.'],
    solution: [
      `Discount: $${num(p / 100)} \\times ${mv(price)} ${eq(disc)}$${roundsTo(disc)}.`,
      `Sale price: $${mv(price)} - ${mv(discR)} = ${mv(sale)}$`,
      `GST: $0.05 \\times ${mv(sale)} ${eq(gst)}$${roundsTo(gst)}.`,
      `Total: $${mv(sale)} + ${mv(gstR)} = ${mv(total)}$`,
      `The sale price is ${money(sale)} and the total cost is ${money(total)}.`,
    ],
  };
}

const discountTaxSkill = skill({
  id: 'm104-discount-tax',
  name: 'Discounts and sales tax',
  description: 'Find a sale price after a percent discount and a total after a 5% sales tax, in that order when both apply.',
  outcomes: ['N2'],
  lessonId: 'm104-3-3',
  calculator: true,
  gen: discountTax,
});

export const DECIMAL_SKILLS: SkillDef[] = [decimalOps, makingChangeSkill, convertFdpSkill, percentOf, discountTaxSkill];
