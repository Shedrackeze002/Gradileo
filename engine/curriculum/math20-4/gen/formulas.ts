/** Math 20-4 Unit 5 — Formulas and Graphs (PR1): using formulas, solving equations, and tables and graphs. */
import { mcFigures, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmtFixed, fmtGroupTex, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Figure, Part, SkillDef } from '../../../types.ts';

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
/** A money amount inside maths, without a dollar sign: 1250 or 12.50. */
const mv = (x: number) => (isWhole(x) ? num(Math.round(x)) : group(fmtFixed(x, 2)).replace(/,/g, '{,}'));
/** Plain-text money for table cells (cells are not Markdown). */
const cell = (x: number) => (isWhole(x) ? `$${Math.round(x)}` : `$${fmtFixed(x, 2)}`);
const CENT = 'to the nearest cent';
const moneyPart = (v: number, label = '\\$', suffix?: string): Part => numPart(v, { decimals: 2, tolerance: 0.011, label, suffix });
/** Say "to the nearest cent" only when the exact value has more than two decimals. */
const centNote = (v: number) => (isWhole(v * 100) ? '' : `, ${CENT}`);
/** "about " when a money value had to be rounded to the cent. */
const abt = (v: number) => (isWhole(v * 100) ? '' : 'about ');
/** Money after "is": exact amounts print plainly, others as "about \$12.35". */
const moneyIs = (v: number) => `${abt(v)}${money(roundTo(v, 2))}`;
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
/** Wrap a negative number in brackets after an operation sign. */
const p = (n: number) => (n < 0 ? `(${num(n)})` : num(n));
const M2 = '\\text{m}^2';
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** "a" or "an" before a number read aloud (an \$80 fee, an 11.8 km ride). */
const an = (x: number) => (/^(8|11|18)(\D|$)|^8/.test(String(x)) ? 'an' : 'a');
const degC = (t: number) => `${num(t)}^\\circ\\text{C}`;
const degF = (t: number) => `${num(t)}^\\circ\\text{F}`;

// ---------------------------------------------------------------------------
// 5.1 Using formulas
// ---------------------------------------------------------------------------

const SUB = 'Write the formula. Replace each letter with its number (substitute). Then calculate.';

type Gen = (rng: Rng, name: string) => GenOutput;

const FORMULA_1: Gen[] = [
  // Pay E = rh
  (rng, name) => {
    const r = rng.pick([15, 16, 17, 18, 20, 22]);
    const h = rng.int(3, 8);
    const E = r * h;
    const job = rng.pick(['a car wash', 'a grocery store', 'a coffee shop', 'a hotel', 'a garden centre', 'a fast-food restaurant']);
    return {
      prompt: `${name} works at ${job}. Pay is found with the formula $E = rh$. $E$ is the pay in dollars, $r$ is the hourly wage and $h$ is the number of hours worked. Find ${name}’s pay for $${h}$ hours at ${tag(r)} per hour.`,
      parts: [moneyPart(E)],
      hints: [SUB, `$rh$ means $r \\times h$. Substitute $r = ${r}$ and $h = ${h}$.`],
      solution: [`Write the formula: $E = rh$`, `Substitute $r = ${r}$ and $h = ${h}$: $E = ${r} \\times ${h}$`, `Calculate: $E = ${E}$`, `${name}’s pay is ${tag(E)}.`],
    };
  },
  // Area A = lw
  (rng, name) => {
    const l = rng.int(5, 12);
    const w = rng.int(3, l - 1);
    const A = l * w;
    const what = rng.pick(['the floor of a storage room', 'a vegetable garden', 'a patio', 'the floor of a bedroom', 'a hockey dressing room floor']);
    return {
      prompt: `${name} needs the area of ${what}. It is a rectangle $${l}\\ \\text{m}$ long and $${w}\\ \\text{m}$ wide. Use the formula $A = lw$, where $l$ is the length and $w$ is the width, to find the area.`,
      parts: [numPart(A, { suffix: 'm²' })],
      hints: [SUB, `$lw$ means $l \\times w$. Substitute $l = ${l}$ and $w = ${w}$.`],
      solution: [`Write the formula: $A = lw$`, `Substitute $l = ${l}$ and $w = ${w}$: $A = ${l} \\times ${w}$`, `Calculate: $A = ${A}$`, `The area is $${A}\\ ${M2}$.`],
    };
  },
  // Distance d = st
  (rng, name) => {
    const s = rng.pick([60, 70, 80, 90, 100]);
    const t = rng.int(2, 5);
    const d = s * t;
    return {
      prompt: `${name} drives from ${rng.pick(CITIES)} at an average speed of $${s}\\ \\text{km/h}$ for $${t}$ hours. Use the formula $d = st$ to find the distance. $d$ is the distance in kilometres, $s$ is the speed and $t$ is the time in hours.`,
      parts: [numPart(d, { suffix: 'km' })],
      hints: [SUB, `$st$ means $s \\times t$. Substitute $s = ${s}$ and $t = ${t}$.`],
      solution: [`Write the formula: $d = st$`, `Substitute $s = ${s}$ and $t = ${t}$: $d = ${s} \\times ${t}$`, `Calculate: $d = ${d}$`, `${name} drives $${d}\\ \\text{km}$.`],
    };
  },
  // Perimeter of a square P = 4s
  (rng, name) => {
    const s = rng.int(3, 15);
    const P = 4 * s;
    const what = rng.pick(['a square dog run', 'a square garden', 'a square sandbox at a daycare', 'a square patio']);
    return {
      prompt: `${name} is putting edging around ${what}. Each side is $${s}\\ \\text{m}$ long. Use the formula $P = 4s$, where $s$ is the side length, to find the perimeter.`,
      parts: [numPart(P, { suffix: 'm' })],
      hints: [SUB, `$4s$ means $4 \\times s$. Substitute $s = ${s}$.`],
      solution: [`Write the formula: $P = 4s$`, `Substitute $s = ${s}$: $P = 4 \\times ${s}$`, `Calculate: $P = ${P}$`, `The perimeter is $${P}\\ \\text{m}$.`],
    };
  },
];

const FORMULA_2: Gen[] = [
  // Perimeter of a rectangle P = 2l + 2w
  (rng, name) => {
    const l = rng.int(80, 250) / 10;
    const w = retry(() => rng.int(40, 150) / 10, (x) => x < l - 1);
    const P = roundTo(2 * l + 2 * w, 1);
    const what = rng.pick(['a backyard', 'a horse paddock', 'a community garden', 'an outdoor rink', 'a parking lot']);
    return {
      prompt: `${name} is fencing ${what}. It is a rectangle $${num(l)}\\ \\text{m}$ long and $${num(w)}\\ \\text{m}$ wide. Use the formula $P = 2l + 2w$ to find the perimeter.`,
      parts: [exactPart(P, 'm')],
      hints: ['$2l$ means $2 \\times l$ and $2w$ means $2 \\times w$. Multiply before you add.', `Substitute: $P = 2 \\times ${num(l)} + 2 \\times ${num(w)}$.`],
      solution: [
        `Write the formula: $P = 2l + 2w$`,
        `Substitute $l = ${num(l)}$ and $w = ${num(w)}$: $P = 2 \\times ${num(l)} + 2 \\times ${num(w)}$`,
        `Multiply first: $P = ${num(2 * l)} + ${num(2 * w)}$`,
        `Add: $P = ${num(P)}$`,
        `The perimeter is $${num(P)}\\ \\text{m}$.`,
      ],
    };
  },
  // Taxi C = b + kd
  (rng, name) => {
    const b = rng.pick([3.5, 3.75, 4, 4.25]);
    const k = rng.pick([2, 2.25, 2.5]);
    const d = retry(() => rng.int(30, 250) / 10, (x) => !onEdge(b + k * x, 2));
    const C = b + k * d;
    const city = rng.pick(CITIES);
    return {
      prompt: `A taxi company in ${city} uses the formula $C = ${num(b)} + ${num(k)}d$. $C$ is the fare in dollars and $d$ is the distance in kilometres. What is the fare for ${name}’s $${num(d)}\\ \\text{km}$ ride${centNote(C)}?`,
      parts: [moneyPart(C)],
      hints: [`$${num(k)}d$ means $${num(k)} \\times d$. Multiply before you add.`, `Substitute $d = ${num(d)}$: $C = ${num(b)} + ${num(k)} \\times ${num(d)}$.`],
      solution: [
        `Write the formula: $C = ${num(b)} + ${num(k)}d$`,
        `Substitute $d = ${num(d)}$: $C = ${num(b)} + ${num(k)} \\times ${num(d)}$`,
        `Multiply first: $${num(k)} \\times ${num(d)} = ${num(k * d)}$`,
        `Add: $C = ${num(b)} + ${num(k * d)} ${eq(C)}$`,
        `${name}’s fare is ${moneyIs(C)}.`,
      ],
    };
  },
  // Temperature F = 1.8C + 32
  (rng, name) => {
    const C = rng.int(4, 35);
    const F = roundTo(1.8 * C + 32, 1);
    const ctx = rng.pick([
      `${name} is planning a trip to visit family in the United States, where temperatures are given in degrees Fahrenheit. The forecast at home in ${rng.pick(CITIES)} is $${degC(C)}$.`,
      `${name} works at a greenhouse. A plant label from the United States gives temperatures in degrees Fahrenheit. The greenhouse is at $${degC(C)}$.`,
      `${name} is reading a recipe from an American website. The water for the yeast should be warm. The tap water is $${degC(C)}$.`,
    ]);
    return {
      prompt: `${ctx} Use the formula $F = 1.8C + 32$ to change $${degC(C)}$ to degrees Fahrenheit.`,
      parts: [exactPart(F, '°F')],
      hints: ['$1.8C$ means $1.8 \\times C$. Multiply first, then add $32$.', `Substitute $C = ${C}$: $F = 1.8 \\times ${C} + 32$.`],
      solution: [
        `Write the formula: $F = 1.8C + 32$`,
        `Substitute $C = ${C}$: $F = 1.8 \\times ${C} + 32$`,
        `Multiply first: $1.8 \\times ${C} = ${num(1.8 * C)}$`,
        `Add: $F = ${num(1.8 * C)} + 32 = ${num(F)}$`,
        `$${degC(C)}$ is $${degF(F)}$.`,
      ],
    };
  },
  // Pay with decimals E = rh
  (rng, name) => {
    const { r, h } = retry(
      () => ({ r: rng.pick([15.75, 16.4, 16.85, 17.25, 18.6, 19.35, 21.15]), h: rng.pick([7.5, 16.5, 22.5, 24.5, 31.5, 37.5]) }),
      (o) => !onEdge(o.r * o.h, 2),
    );
    const E = r * h;
    const job = rng.pick(['a warehouse', 'a hardware store', 'a daycare', 'a hotel', 'an auto detailing shop']);
    return {
      prompt: `${name} earns ${money(r)} per hour at ${job} and worked $${num(h)}$ hours last week. Use the formula $E = rh$ to find ${name}’s pay${centNote(E)}.`,
      parts: [moneyPart(E)],
      hints: [SUB, `Substitute $r = ${mv(r)}$ and $h = ${num(h)}$: $E = ${mv(r)} \\times ${num(h)}$.`],
      solution: [`Write the formula: $E = rh$`, `Substitute $r = ${mv(r)}$ and $h = ${num(h)}$: $E = ${mv(r)} \\times ${num(h)}$`, `Calculate: $E ${eq(E)}$`, `${name}’s pay is ${moneyIs(E)}.`],
    };
  },
  // Service call C = b + kh
  (rng, name) => {
    const trade = rng.pick(['A plumber', 'An electrician', 'A furnace repair company', 'An appliance repair technician']);
    const b = rng.pick([75, 85, 90, 95, 120]);
    const k = rng.pick([60, 65, 70, 80, 95]);
    const h = rng.pick([1.5, 2, 2.5, 3, 3.5, 4.5]);
    const C = b + k * h;
    return {
      prompt: `${trade} uses the formula $C = ${b} + ${k}h$ to find the cost $C$ in dollars of a job that takes $h$ hours. ${name}’s job takes $${num(h)}$ hours. What is the cost?`,
      parts: [moneyPart(C)],
      hints: [`$${k}h$ means $${k} \\times h$. Multiply before you add.`, `Substitute $h = ${num(h)}$: $C = ${b} + ${k} \\times ${num(h)}$.`],
      solution: [
        `Write the formula: $C = ${b} + ${k}h$`,
        `Substitute $h = ${num(h)}$: $C = ${b} + ${k} \\times ${num(h)}$`,
        `Multiply first: $${k} \\times ${num(h)} = ${num(k * h)}$`,
        `Add: $C = ${b} + ${num(k * h)} = ${num(C)}$`,
        `The job costs ${tag(C)}.`,
      ],
    };
  },
];

const DAYS5 = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const FORMULA_3: Gen[] = [
  // Area then cost of flooring
  (rng, name) => {
    const { l, w, price } = retry(
      () => ({ l: rng.int(30, 65) / 10, w: rng.int(25, 50) / 10, price: rng.pick([18.99, 24.5, 29.99, 32.75, 42.99, 21.49]) }),
      (o) => o.w < o.l && !onEdge(roundTo(o.l * o.w, 2) * o.price, 2),
    );
    const A = roundTo(l * w, 2);
    const cost = A * price;
    const room = rng.pick(['bedroom', 'basement room', 'small office', 'laundry room']);
    return {
      prompt: `${name} is putting new flooring in a rectangular ${room} that is $${num(l)}\\ \\text{m}$ long and $${num(w)}\\ \\text{m}$ wide. The flooring costs ${money(price)} per square metre.\n\n**(a)** Use $A = lw$ to find the area of the floor.\n\n**(b)** What will the flooring cost${centNote(cost) ? `, ${CENT}` : ''}?`,
      parts: [exactPart(A, 'm²', '(a)'), moneyPart(cost, '(b) \\$')],
      hints: ['First find the area with $A = lw$. Then multiply the area by the price for one square metre.', `$A = ${num(l)} \\times ${num(w)}$. Cost $=$ area $\\times ${mv(price)}$.`],
      solution: [
        `(a) $A = lw = ${num(l)} \\times ${num(w)} = ${num(A)}$, so the area is $${num(A)}\\ ${M2}$.`,
        `(b) Each square metre costs ${money(price)}, so multiply: $${num(A)} \\times ${mv(price)} ${eq(cost)}$`,
        `(a) The area is $${num(A)}\\ ${M2}$. (b) The flooring costs ${moneyIs(cost)}.`,
      ],
    };
  },
  // Perimeter then cost of fencing
  (rng, name) => {
    const l = rng.int(12, 40);
    const w = rng.int(6, l - 2);
    const price = rng.pick([12.5, 14.75, 18.25, 22.4, 9.95]);
    const P = 2 * l + 2 * w;
    const cost = P * price;
    return {
      prompt: `${name} works for a landscaping company in ${rng.pick(CITIES)}. A customer wants a fence around a rectangular yard that is $${l}\\ \\text{m}$ long and $${w}\\ \\text{m}$ wide. Fencing costs ${money(price)} per metre.\n\n**(a)** Use $P = 2l + 2w$ to find how many metres of fencing are needed.\n\n**(b)** What will the fencing cost${centNote(cost)}?`,
      parts: [numPart(P, { label: '(a)', suffix: 'm' }), moneyPart(cost, '(b) \\$')],
      hints: ['First find the perimeter. Then multiply it by the price for one metre.', `$P = 2 \\times ${l} + 2 \\times ${w}$. Cost $=$ perimeter $\\times ${mv(price)}$.`],
      solution: [
        `(a) $P = 2 \\times ${l} + 2 \\times ${w} = ${2 * l} + ${2 * w} = ${P}$, so $${P}\\ \\text{m}$ of fencing.`,
        `(b) Multiply by the price per metre: $${P} \\times ${mv(price)} ${eq(cost)}$`,
        `(a) $${P}\\ \\text{m}$ of fencing. (b) The fencing costs ${moneyIs(cost)}.`,
      ],
    };
  },
  // Taxi fare then change
  (rng, name) => {
    const b = rng.pick([3.75, 4, 4.25]);
    const k = rng.pick([2.25, 2.5]);
    const d = retry(() => rng.int(40, 160) / 10, (x) => isWhole((b + k * x) * 100));
    const C = roundTo(b + k * d, 2);
    const paid = [20, 50, 100].find((x) => x - C >= 3) ?? 100;
    return {
      prompt: `A taxi in ${rng.pick(CITIES)} charges using the formula $C = ${num(b)} + ${num(k)}d$. $C$ is the fare in dollars and $d$ is the distance in kilometres. ${name} takes ${an(d)} $${num(d)}\\ \\text{km}$ ride and pays with a ${tag(paid)} bill.\n\n**(a)** What is the fare?\n\n**(b)** How much change should ${name} get?`,
      parts: [moneyPart(C, '(a) \\$'), moneyPart(paid - C, '(b) \\$')],
      hints: ['First use the formula to find the fare. Multiply before you add.', `Then subtract the fare from ${tag(paid)} to find the change.`],
      solution: [
        `(a) $C = ${num(b)} + ${num(k)} \\times ${num(d)} = ${num(b)} + ${num(k * d)} = ${mv(C)}$`,
        `(b) Change: $${paid} - ${mv(C)} = ${mv(paid - C)}$`,
        `(a) The fare is ${money(C)}. (b) The change is ${money(paid - C)}.`,
      ],
    };
  },
  // Temperature below zero
  (rng, name) => {
    const C = -rng.int(8, 35);
    const F = roundTo(1.8 * C + 32, 1);
    const city = rng.pick(['Ashford', 'Clearwater', 'Riverton', 'Brookfield']);
    return {
      prompt: `It is $${degC(C)}$ on a January morning in ${city}. ${name}’s cousin in Montana asks how cold that is in degrees Fahrenheit. Use the formula $F = 1.8C + 32$ to find out.`,
      parts: [exactPart(F, '°F')],
      hints: ['Put the negative temperature in brackets: $F = 1.8 \\times (' + C + ') + 32$. Multiply first.', 'A positive number times a negative number is negative. Then add $32$.'],
      solution: [
        `Write the formula: $F = 1.8C + 32$`,
        `Substitute $C = ${C}$: $F = 1.8 \\times (${C}) + 32$`,
        `Multiply first: $1.8 \\times (${C}) = ${num(1.8 * C)}$`,
        `Add: $F = ${num(1.8 * C)} + 32 = ${num(F)}$`,
        `$${degC(C)}$ is $${degF(F)}$.`,
      ],
    };
  },
  // Pay for a week from a timecard
  (rng, name) => {
    const hrs = Array.from({ length: 5 }, () => rng.pick([4, 4.5, 5, 6, 6.5, 7, 7.5, 8]));
    const H = hrs.reduce((a, b) => a + b, 0);
    const r = retry(() => rng.pick([15.5, 16.25, 16.8, 17.4, 18.15, 19.5]), (x) => !onEdge(x * H, 2));
    const E = r * H;
    const job = rng.pick(['a grocery store', 'a hotel', 'a car wash', 'a bakery', 'a lumber yard']);
    return {
      prompt: `The table shows the hours ${name} worked at ${job} last week. ${name} earns ${money(r)} per hour.\n\n**(a)** How many hours did ${name} work in total?\n\n**(b)** Use $E = rh$ to find ${name}’s pay for the week${centNote(E)}.`,
      figure: { type: 'table', headers: ['Day', 'Hours'], rows: hrs.map((h, i) => [DAYS5[i], String(h)]) },
      parts: [exactPart(H, 'h', '(a)'), moneyPart(E, '(b) \\$')],
      hints: ['First add the hours for all five days. That total is $h$.', `Then substitute into $E = rh$ with $r = ${mv(r)}$.`],
      solution: [
        `(a) $h = ${hrs.map((h) => num(h)).join(' + ')} = ${num(H)}$ hours`,
        `(b) $E = rh = ${mv(r)} \\times ${num(H)} ${eq(E)}$`,
        `(a) ${name} worked $${num(H)}$ hours. (b) The pay is ${moneyIs(E)}.`,
      ],
    };
  },
];

const useFormula = skill({
  id: 'm204-use-formula',
  name: 'Using formulas',
  description: 'Substitute values into a workplace formula, such as pay, perimeter, area, a taxi fare or a temperature, and evaluate it.',
  outcomes: ['PR1'],
  lessonId: 'm204-5-1',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    return rng.pick(d === 1 ? FORMULA_1 : d === 2 ? FORMULA_2 : FORMULA_3)(rng, name);
  },
});

// ---------------------------------------------------------------------------
// 5.2 Solving equations
// ---------------------------------------------------------------------------

const LETTERS = ['x', 'n', 'm', 'k', 't', 'y'];
const INVERSE = 'Use the inverse (opposite) operation: subtraction undoes addition, addition undoes subtraction, division undoes multiplication and multiplication undoes division.';

function solveOneBare(rng: Rng): GenOutput {
  const v = rng.pick(LETTERS);
  const form = rng.int(1, 4);
  let eqTex: string;
  let x: number;
  let steps: string[];
  let undo: string;
  if (form === 1) {
    x = rng.int(2, 30);
    const a = rng.int(3, 25);
    const b = x + a;
    eqTex = `${v} + ${a} = ${b}`;
    undo = `To undo $+\\ ${a}$, subtract $${a}$ from both sides.`;
    steps = [undo, `$${v} + ${a} - ${a} = ${b} - ${a}$`, `$${v} = ${x}$`, `Check: $${x} + ${a} = ${b}$. It works.`];
  } else if (form === 2) {
    const a = rng.int(3, 25);
    x = rng.int(a + 2, a + 30);
    const b = x - a;
    eqTex = `${v} - ${a} = ${b}`;
    undo = `To undo $-\\ ${a}$, add $${a}$ to both sides.`;
    steps = [undo, `$${v} - ${a} + ${a} = ${b} + ${a}$`, `$${v} = ${x}$`, `Check: $${x} - ${a} = ${b}$. It works.`];
  } else if (form === 3) {
    const a = rng.int(2, 9);
    x = rng.int(2, 15);
    const b = a * x;
    eqTex = `${a}${v} = ${b}`;
    undo = `$${a}${v}$ means $${a} \\times ${v}$. To undo $\\times\\ ${a}$, divide both sides by $${a}$.`;
    steps = [undo, `$\\dfrac{${a}${v}}{${a}} = \\dfrac{${b}}{${a}}$`, `$${v} = ${x}$`, `Check: $${a} \\times ${x} = ${b}$. It works.`];
  } else {
    const a = rng.int(2, 6);
    const b = rng.int(2, 12);
    x = a * b;
    eqTex = `\\dfrac{${v}}{${a}} = ${b}`;
    undo = `$\\dfrac{${v}}{${a}}$ means $${v} \\div ${a}$. To undo $\\div\\ ${a}$, multiply both sides by $${a}$.`;
    steps = [undo, `$${v} = ${b} \\times ${a}$`, `$${v} = ${x}$`, `Check: $${x} \\div ${a} = ${b}$. It works.`];
  }
  return {
    prompt: `Solve for $${v}$: $${eqTex}$`,
    parts: [numPart(x, { label: `$${v} =$` })],
    hints: [INVERSE, undo],
    solution: [...steps, `The solution is $${v} = ${x}$.`],
  };
}

function solveOneContext(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['pay', 'speed', 'square', 'tickets'] as const);
  if (kind === 'pay') {
    const r = rng.pick([15, 16, 18, 20, 24]);
    const h = rng.int(4, 12);
    const E = r * h;
    return {
      prompt: `${name} earns ${tag(r)} per hour. Last week ${name} earned ${tag(E)}. Using $E = rh$ gives the equation $${E} = ${r}h$. Solve it to find how many hours ${name} worked.`,
      parts: [numPart(h, { label: '$h =$', suffix: 'hours' })],
      hints: [`$${r}h$ means $${r} \\times h$.`, `To undo $\\times\\ ${r}$, divide both sides by $${r}$.`],
      solution: [`$${E} = ${r}h$`, `Divide both sides by $${r}$: $\\dfrac{${E}}{${r}} = h$`, `$h = ${h}$`, `Check: $${r} \\times ${h} = ${E}$. ${name} worked $${h}$ hours.`],
    };
  }
  if (kind === 'speed') {
    const s = rng.pick([60, 70, 80, 90, 100]);
    const t = rng.int(2, 6);
    const d = s * t;
    return {
      prompt: `A bus travels $${d}\\ \\text{km}$ from ${rng.pick(CITIES)} at an average speed of $${s}\\ \\text{km/h}$. Using $d = st$ gives the equation $${d} = ${s}t$. Solve it to find the time $t$ in hours.`,
      parts: [numPart(t, { label: '$t =$', suffix: 'hours' })],
      hints: [`$${s}t$ means $${s} \\times t$.`, `To undo $\\times\\ ${s}$, divide both sides by $${s}$.`],
      solution: [`$${d} = ${s}t$`, `Divide both sides by $${s}$: $\\dfrac{${d}}{${s}} = t$`, `$t = ${t}$`, `Check: $${s} \\times ${t} = ${d}$. The trip takes $${t}$ hours.`],
    };
  }
  if (kind === 'square') {
    const s = rng.int(4, 16);
    const P = 4 * s;
    return {
      prompt: `${name} used $${P}\\ \\text{m}$ of edging to go around a square flower bed. Using $P = 4s$ gives the equation $${P} = 4s$. Solve it to find the side length $s$.`,
      parts: [numPart(s, { label: '$s =$', suffix: 'm' })],
      hints: ['$4s$ means $4 \\times s$.', 'To undo $\\times\\ 4$, divide both sides by $4$.'],
      solution: [`$${P} = 4s$`, `Divide both sides by $4$: $\\dfrac{${P}}{4} = s$`, `$s = ${s}$`, `Check: $4 \\times ${s} = ${P}$. Each side is $${s}\\ \\text{m}$.`],
    };
  }
  const c = rng.pick([8, 12, 14, 15, 18]);
  const n = rng.int(3, 9);
  const T = c * n;
  const what = rng.pick(['movie tickets', 'swimming pool passes', 'tickets to a hockey game', 'bus tickets']);
  return {
    prompt: `${what.charAt(0).toUpperCase() + what.slice(1)} cost ${tag(c)} each. ${name} paid ${tag(T)} for a group. The equation $${c}n = ${T}$ shows this. Solve it to find how many tickets $n$ ${name} bought.`,
    parts: [numPart(n, { label: '$n =$' })],
    hints: [`$${c}n$ means $${c} \\times n$.`, `To undo $\\times\\ ${c}$, divide both sides by $${c}$.`],
    solution: [`$${c}n = ${T}$`, `Divide both sides by $${c}$: $n = \\dfrac{${T}}{${c}}$`, `$n = ${n}$`, `Check: $${c} \\times ${n} = ${T}$. ${name} bought $${n}$ tickets.`],
  };
}

function twoStepSteps(v: string, a: number, b: number, c: number, x: number, minus: boolean, bFirst = false): string[] {
  const mid = minus ? c + b : c - b;
  return [
    minus ? `Undo the subtraction first: add $${b}$ to both sides.` : `Undo the addition first: subtract $${b}$ from both sides.`,
    `$${a}${v} = ${c} ${minus ? '+' : '-'} ${b} = ${mid}$`,
    `Then undo the multiplication: divide both sides by $${a}$.`,
    `$${v} = ${mid} \\div ${a} = ${x}$`,
    bFirst ? `Check: $${b} + ${a} \\times ${x} = ${c}$. It works.` : `Check: $${a} \\times ${x} ${minus ? '-' : '+'} ${b} = ${c}$. It works.`,
  ];
}

function solveTwoBare(rng: Rng): GenOutput {
  const v = rng.pick(LETTERS);
  const a = rng.int(2, 9);
  const x = rng.int(2, 12);
  const b = rng.int(1, 20);
  const form = rng.int(1, 3);
  const minus = form === 2;
  const c = minus ? a * x - b : a * x + b;
  if (minus && c <= 0) return solveTwoBare(rng);
  const eqTex = form === 1 ? `${a}${v} + ${b} = ${c}` : form === 2 ? `${a}${v} - ${b} = ${c}` : `${b} + ${a}${v} = ${c}`;
  return {
    prompt: `Solve for $${v}$: $${eqTex}$`,
    parts: [numPart(x, { label: `$${v} =$` })],
    hints: ['Undo the operations in reverse order: first undo the adding or subtracting, then undo the multiplying.', minus ? `Add $${b}$ to both sides first.` : `Subtract $${b}$ from both sides first.`],
    solution: [...twoStepSteps(v, a, b, c, x, minus, form === 3), `The solution is $${v} = ${x}$.`],
  };
}

const TWO_STEP_CTX = [
  { b: [4, 5, 6], k: [6, 7, 8], n: [2, 6], v: 'g', text: (b: number, k: number) => `Bowling costs ${tag(b)} for shoe rental plus ${tag(k)} per game.`, unit: 'games', ask: 'how many games' },
  { b: [25, 30, 40, 50], k: [20, 25, 30, 35], n: [3, 10], v: 'm', text: (b: number, k: number) => `A gym charges a ${tag(b)} sign-up fee plus ${tag(k)} per month.`, unit: 'months', ask: 'how many months' },
  { b: [60, 80, 100], k: [15, 20, 25], n: [2, 8], v: 'h', text: (b: number, k: number) => `A community hall charges ${tag(b)} plus ${tag(k)} per hour.`, unit: 'hours', ask: 'how many hours' },
  { b: [20, 25, 30], k: [5, 10, 15], n: [2, 8], v: 'g', text: (b: number, k: number) => `A phone plan costs ${tag(b)} a month plus ${tag(k)} for each extra gigabyte of data.`, unit: 'GB', ask: 'how many extra gigabytes' },
];

function solveTwoContext(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const c = rng.pick(TWO_STEP_CTX);
  const b = rng.pick(c.b);
  const k = rng.pick(c.k);
  const x = rng.int(c.n[0], c.n[1]);
  const T = b + k * x;
  const v = c.v;
  return {
    prompt: `${c.text(b, k)} ${name} paid ${tag(T)}. Solve the equation $${b} + ${k}${v} = ${T}$ to find ${c.ask} ${name} paid for.`,
    parts: [numPart(x, { label: `$${v} =$`, suffix: c.unit })],
    hints: ['Undo the adding first, then undo the multiplying.', `Subtract $${b}$ from both sides: $${k}${v} = ${T - b}$.`],
    solution: [
      `Subtract $${b}$ from both sides: $${k}${v} = ${T} - ${b} = ${T - b}$`,
      `Divide both sides by $${k}$: $${v} = ${T - b} \\div ${k} = ${x}$`,
      `Check: $${b} + ${k} \\times ${x} = ${T}$. It works.`,
      `${name} paid for $${x}$ ${c.unit}.`,
    ],
  };
}

const BACKWARDS: Gen[] = [
  // Taxi: find the distance
  (rng, name) => {
    const b = rng.pick([3.5, 3.75, 4, 4.25]);
    const k = rng.pick([2, 2.25, 2.5]);
    const d = rng.int(5, 30);
    const C = roundTo(b + k * d, 2);
    return {
      prompt: `A taxi in ${rng.pick(CITIES)} charges using the formula $C = ${num(b)} + ${num(k)}d$. $C$ is the fare in dollars and $d$ is the distance in kilometres. ${name}’s ride cost ${money(C)}. How many kilometres long was the ride?`,
      parts: [numPart(d, { label: '$d =$', suffix: 'km' })],
      hints: [`Substitute $C = ${mv(C)}$: $${mv(C)} = ${num(b)} + ${num(k)}d$. Now solve for $d$.`, `Subtract $${num(b)}$ from both sides, then divide by $${num(k)}$.`],
      solution: [
        `Substitute $C = ${mv(C)}$: $${mv(C)} = ${num(b)} + ${num(k)}d$`,
        `Subtract $${num(b)}$ from both sides: $${num(C - b)} = ${num(k)}d$`,
        `Divide both sides by $${num(k)}$: $d = ${num(C - b)} \\div ${num(k)} = ${d}$`,
        `Check: $${num(b)} + ${num(k)} \\times ${d} = ${mv(C)}$. The ride was $${d}\\ \\text{km}$ long.`,
      ],
    };
  },
  // Service call: find the hours
  (rng, name) => {
    const trade = rng.pick(['A plumber', 'An electrician', 'A furnace repair company', 'A small-engine mechanic']);
    const b = rng.pick([75, 85, 90, 95, 120]);
    const k = rng.pick([60, 65, 70, 80, 90]);
    const h = rng.pick([1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]);
    const C = b + k * h;
    return {
      prompt: `${trade} charges using the formula $C = ${b} + ${k}h$. $C$ is the cost in dollars and $h$ is the number of hours. ${name}’s bill was ${tag(C)}. How many hours did the job take?`,
      parts: [exactPart(h, 'hours', '$h =$')],
      hints: [`Substitute $C = ${num(C)}$: $${num(C)} = ${b} + ${k}h$. Now solve for $h$.`, `Subtract $${b}$ from both sides, then divide by $${k}$.`],
      solution: [
        `Substitute $C = ${num(C)}$: $${num(C)} = ${b} + ${k}h$`,
        `Subtract $${b}$ from both sides: $${num(C - b)} = ${k}h$`,
        `Divide both sides by $${k}$: $h = ${num(C - b)} \\div ${k} = ${num(h)}$`,
        `Check: $${b} + ${k} \\times ${num(h)} = ${num(C)}$. The job took $${num(h)}$ hours.`,
      ],
    };
  },
  // Pay: find the hours
  (rng, name) => {
    const r = rng.pick([15.5, 16.25, 16.75, 17.5, 18.25, 19.5, 21.25]);
    const h = rng.pick([12, 16, 20, 24, 28, 30, 32, 36, 40]);
    const E = roundTo(r * h, 2);
    const job = rng.pick(['a grocery store', 'a warehouse', 'a hotel', 'a coffee shop', 'a landscaping company']);
    return {
      prompt: `${name} earns ${money(r)} per hour at ${job}. Last pay period, ${name} earned ${money(E)}. Use the formula $E = rh$ to find how many hours ${name} worked.`,
      parts: [numPart(h, { label: '$h =$', suffix: 'hours' })],
      hints: [`Substitute $E = ${mv(E)}$ and $r = ${mv(r)}$: $${mv(E)} = ${mv(r)}h$.`, `Divide both sides by $${mv(r)}$.`],
      solution: [
        `Substitute: $${mv(E)} = ${mv(r)}h$`,
        `Divide both sides by $${mv(r)}$: $h = ${mv(E)} \\div ${mv(r)} = ${h}$`,
        `Check: $${mv(r)} \\times ${h} = ${mv(E)}$. ${name} worked $${h}$ hours.`,
      ],
    };
  },
  // Fence: find the width
  (rng, name) => {
    const l = rng.int(100, 300) / 10;
    const w = retry(() => rng.int(50, 200) / 10, (x) => x < l - 1);
    const P = roundTo(2 * l + 2 * w, 1);
    return {
      prompt: `${name} used $${num(P)}\\ \\text{m}$ of fencing to go around a rectangular garden. The garden is $${num(l)}\\ \\text{m}$ long. Use $P = 2l + 2w$ to find the width $w$.`,
      parts: [exactPart(w, 'm', '$w =$')],
      hints: [`Substitute: $${num(P)} = 2 \\times ${num(l)} + 2w$, so $${num(P)} = ${num(2 * l)} + 2w$.`, `Subtract $${num(2 * l)}$ from both sides, then divide by $2$.`],
      solution: [
        `Substitute $P = ${num(P)}$ and $l = ${num(l)}$: $${num(P)} = 2 \\times ${num(l)} + 2w$`,
        `Multiply: $${num(P)} = ${num(2 * l)} + 2w$`,
        `Subtract $${num(2 * l)}$ from both sides: $${num(roundTo(P - 2 * l, 2))} = 2w$`,
        `Divide both sides by $2$: $w = ${num(w)}$`,
        `Check: $2 \\times ${num(l)} + 2 \\times ${num(w)} = ${num(P)}$. The garden is $${num(w)}\\ \\text{m}$ wide.`,
      ],
    };
  },
  // Temperature: find Celsius
  (rng, name) => {
    const C = rng.int(-30, 35);
    const F = roundTo(1.8 * C + 32, 1);
    return {
      prompt: `${name} sees a temperature of $${degF(F)}$ on an American weather website. Use the formula $F = 1.8C + 32$ to find the temperature in degrees Celsius.`,
      parts: [numPart(C, { label: '$C =$', suffix: '°C' })],
      hints: [`Substitute $F = ${num(F)}$: $${num(F)} = 1.8C + 32$.`, 'Subtract $32$ from both sides, then divide by $1.8$.'],
      solution: [
        `Substitute $F = ${num(F)}$: $${num(F)} = 1.8C + 32$`,
        `Subtract $32$ from both sides: $${num(roundTo(F - 32, 2))} = 1.8C$`,
        `Divide both sides by $1.8$: $C = ${p(roundTo(F - 32, 2))} \\div 1.8 = ${C}$`,
        `Check: $1.8 \\times ${p(C)} + 32 = ${num(F)}$. The temperature is $${degC(C)}$.`,
      ],
    };
  },
  // Truck rental: find the kilometres
  (rng, name) => {
    const b = rng.pick([29.95, 39.95, 49.95]);
    const k = rng.pick([0.25, 0.3, 0.35]);
    const km = 10 * rng.int(4, 30);
    const C = roundTo(b + k * km, 2);
    return {
      prompt: `${name} rents a moving truck in ${rng.pick(CITIES)}. The cost is found with $C = ${num(b)} + ${num(k)}k$, where $C$ is the cost in dollars and $k$ is the number of kilometres driven. The bill was ${money(C)}. How many kilometres did ${name} drive?`,
      parts: [numPart(km, { label: '$k =$', suffix: 'km' })],
      hints: [`Substitute $C = ${mv(C)}$: $${mv(C)} = ${num(b)} + ${num(k)}k$.`, `Subtract $${num(b)}$ from both sides, then divide by $${num(k)}$.`],
      solution: [
        `Substitute $C = ${mv(C)}$: $${mv(C)} = ${num(b)} + ${num(k)}k$`,
        `Subtract $${num(b)}$ from both sides: $${num(roundTo(C - b, 2))} = ${num(k)}k$`,
        `Divide both sides by $${num(k)}$: $k = ${num(roundTo(C - b, 2))} \\div ${num(k)} = ${km}$`,
        `Check: $${num(b)} + ${num(k)} \\times ${km} = ${mv(C)}$. ${name} drove $${km}\\ \\text{km}$.`,
      ],
    };
  },
];

const solveEquation = skill({
  id: 'm204-solve-equation',
  name: 'Solving equations',
  description: 'Solve one- and two-step equations with inverse operations, and use a formula backwards to find a missing value.',
  outcomes: ['PR1'],
  lessonId: 'm204-5-2',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return rng.chance(0.5) ? solveOneBare(rng) : solveOneContext(rng);
    if (d === 2) return rng.chance(0.5) ? solveTwoBare(rng) : solveTwoContext(rng);
    return rng.pick(BACKWARDS)(rng, rng.pick(NAMES));
  },
});

// ---------------------------------------------------------------------------
// 5.3 Tables and graphs
// ---------------------------------------------------------------------------

/** A relationship y = b + kx in context. */
interface Rel {
  /** Short story that introduces the rule. */
  story: string;
  /** What the graph shows, without giving the numbers away. */
  scene: string;
  /** The rule in words and as a formula. */
  words: string;
  tex: string;
  xVar: string;
  yVar: string;
  /** x in words (plural), e.g. "hours worked", and how a y-value is asked for: "the pay" ... "for". */
  xName: string;
  yWhat: string;
  xPrep: 'for' | 'after';
  /** Finish "Use the graph to find ..." when y is given and x is wanted. */
  back: (y: number) => string;
  xLabel: string;
  yLabel: string;
  money: boolean;
  /** Unit word after a y-value that is not money, and the unit of x. */
  yUnit: string;
  xUnit: string;
  b: number;
  k: number;
  /** Graph settings: grid spacing on the y-axis and the last x-value (at most 11 grid lines up the side). */
  yStep: number;
  xMax: number;
}

const MONEY_Y = { money: true, yUnit: '' };

/** Proportional relationships (no start value) with friendly numbers. */
function relProp(rng: Rng): Rel {
  const name = rng.pick(NAMES);
  const kind = rng.int(1, 4);
  if (kind === 1) {
    const k = rng.pick([15, 16, 18, 20, 25]);
    const job = rng.pick(['coffee shop', 'car wash', 'garden centre', 'grocery store']);
    return {
      ...MONEY_Y, story: `${name} earns ${tag(k)} per hour at a ${job}.`, scene: `The graph shows ${name}’s pay at a ${job}.`,
      words: `Pay $=$ ${k} $\\times$ hours worked`, tex: `P = ${k}h`, xVar: 'h', yVar: 'P', xName: 'hours worked', yWhat: 'the pay', xPrep: 'for',
      back: (y) => `how many hours ${name} must work to earn ${tag(y)}`, xLabel: 'Hours worked', yLabel: 'Pay ($)', xUnit: 'h', b: 0, k, yStep: k, xMax: 8,
    };
  }
  if (kind === 2) {
    const k = rng.pick([6, 8, 10, 12, 14]);
    const what = rng.pick(['movie tickets', 'tickets to a hockey game', 'tickets to a school dance', 'bus tickets']);
    return {
      ...MONEY_Y, story: `${cap(what)} cost ${tag(k)} each.`, scene: `The graph shows the cost of ${what}.`,
      words: `Cost $=$ ${k} $\\times$ number of tickets`, tex: `C = ${k}n`, xVar: 'n', yVar: 'C', xName: 'tickets', yWhat: 'the cost', xPrep: 'for',
      back: (y) => `how many tickets you can buy for ${tag(y)}`, xLabel: 'Number of tickets', yLabel: 'Cost ($)', xUnit: '', b: 0, k, yStep: k, xMax: 8,
    };
  }
  if (kind === 3) {
    const k = rng.pick([5, 10, 15, 20]);
    return {
      story: `A hose fills an empty stock tank on a farm at ${k} litres per minute.`, scene: 'The graph shows the water in a stock tank as a hose fills it.',
      words: `Water $=$ ${k} $\\times$ minutes`, tex: `W = ${k}t`, xVar: 't', yVar: 'W', xName: 'minutes', yWhat: 'the amount of water in the tank', xPrep: 'after',
      back: (y) => `how many minutes it takes to put $${y}\\ \\text{L}$ in the tank`, xLabel: 'Time (min)', yLabel: 'Water (L)', money: false, yUnit: 'L', xUnit: 'min', b: 0, k, yStep: k, xMax: 10,
    };
  }
  const k = rng.pick([60, 70, 80, 90, 100]);
  return {
    story: `A delivery truck travels at an average speed of ${k} km/h.`, scene: 'The graph shows how far a delivery truck travels.',
    words: `Distance $=$ ${k} $\\times$ hours`, tex: `d = ${k}t`, xVar: 't', yVar: 'd', xName: 'hours', yWhat: 'the distance travelled', xPrep: 'after',
    back: (y) => `how many hours it takes to travel $${y}\\ \\text{km}$`, xLabel: 'Time (h)', yLabel: 'Distance (km)', money: false, yUnit: 'km', xUnit: 'h', b: 0, k, yStep: k, xMax: 6,
  };
}

/** Relationships with a start value, chosen so every whole-number x lands on a labelled grid line. */
function relStart(rng: Rng): Rel {
  const kind = rng.int(1, 7);
  const costBack = (unit: string) => (y: number) => `how many ${unit} give a total cost of ${tag(y)}`;
  if (kind === 1) {
    const [b, k, s] = rng.pick([[4, 2, 2], [3, 3, 3], [6, 2, 2], [4, 4, 4]] as const);
    const city = rng.pick(CITIES);
    return {
      ...MONEY_Y, story: `A taxi company in ${city} charges ${tag(b)} to start plus ${tag(k)} per kilometre.`, scene: `The graph shows the fare for a taxi ride in ${city}.`,
      words: `Fare $=$ ${b} $+$ ${k} $\\times$ kilometres`, tex: `C = ${b} + ${k}d`, xVar: 'd', yVar: 'C', xName: 'kilometres', yWhat: 'the fare', xPrep: 'for',
      back: (y) => `how many kilometres long a ride is if the fare is ${tag(y)}`, xLabel: 'Distance (km)', yLabel: 'Fare ($)', xUnit: 'km', b, k, yStep: s, xMax: 8,
    };
  }
  if (kind === 2) {
    const [b, k, s] = rng.pick([[50, 25, 25], [75, 25, 25], [100, 50, 50]] as const);
    return {
      ...MONEY_Y, story: `A community hall charges ${tag(b)} to book plus ${tag(k)} per hour.`, scene: 'The graph shows the cost to book a community hall.',
      words: `Cost $=$ ${b} $+$ ${k} $\\times$ hours`, tex: `C = ${b} + ${k}h`, xVar: 'h', yVar: 'C', xName: 'hours', yWhat: 'the cost', xPrep: 'for',
      back: costBack('hours'), xLabel: 'Time (h)', yLabel: 'Cost ($)', xUnit: 'h', b, k, yStep: s, xMax: 8,
    };
  }
  if (kind === 3) {
    const [b, k] = rng.pick([[80, 40], [120, 40], [40, 40]] as const);
    return {
      ...MONEY_Y, story: `A plumber charges ${an(b)} ${tag(b)} call-out fee plus ${tag(k)} per hour.`, scene: 'The graph shows what a plumber charges for a job.',
      words: `Cost $=$ ${b} $+$ ${k} $\\times$ hours`, tex: `C = ${b} + ${k}h`, xVar: 'h', yVar: 'C', xName: 'hours', yWhat: 'the cost', xPrep: 'for',
      back: costBack('hours of work'), xLabel: 'Time (h)', yLabel: 'Cost ($)', xUnit: 'h', b, k, yStep: 40, xMax: 6,
    };
  }
  if (kind === 4) {
    const [b, k, s] = rng.pick([[5, 5, 5], [10, 5, 5], [8, 4, 4]] as const);
    return {
      ...MONEY_Y, story: `At a bowling alley, shoe rental costs ${tag(b)} and each game costs ${tag(k)}.`, scene: 'The graph shows the cost of bowling, including shoe rental.',
      words: `Cost $=$ ${b} $+$ ${k} $\\times$ games`, tex: `C = ${b} + ${k}g`, xVar: 'g', yVar: 'C', xName: 'games', yWhat: 'the cost', xPrep: 'for',
      back: costBack('games'), xLabel: 'Number of games', yLabel: 'Cost ($)', xUnit: 'games', b, k, yStep: s, xMax: 8,
    };
  }
  if (kind === 5) {
    const [b, k] = rng.pick([[20, 10], [30, 10], [10, 10]] as const);
    return {
      ...MONEY_Y, story: `A phone plan costs ${tag(b)} a month plus ${tag(k)} for each gigabyte (GB) of data.`, scene: 'The graph shows the monthly cost of a phone plan.',
      words: `Cost $=$ ${b} $+$ ${k} $\\times$ GB`, tex: `C = ${b} + ${k}g`, xVar: 'g', yVar: 'C', xName: 'gigabytes', yWhat: 'the monthly cost', xPrep: 'for',
      back: costBack('gigabytes'), xLabel: 'Data (GB)', yLabel: 'Cost ($)', xUnit: 'GB', b, k, yStep: 10, xMax: 8,
    };
  }
  if (kind === 6) {
    const [b, k, s] = rng.pick([[30, 15, 15], [45, 15, 15], [40, 20, 20]] as const);
    return {
      ...MONEY_Y, story: `A tool rental shop charges ${tag(b)} for a pressure washer plus ${tag(k)} per hour.`, scene: 'The graph shows the cost to rent a pressure washer.',
      words: `Cost $=$ ${b} $+$ ${k} $\\times$ hours`, tex: `C = ${b} + ${k}h`, xVar: 'h', yVar: 'C', xName: 'hours', yWhat: 'the cost', xPrep: 'for',
      back: costBack('hours'), xLabel: 'Time (h)', yLabel: 'Cost ($)', xUnit: 'h', b, k, yStep: s, xMax: 8,
    };
  }
  const [b, k, s] = rng.pick([[20, 10, 10], [30, 10, 10], [20, 20, 20]] as const);
  return {
    story: `A water tank on a farm already holds ${b} L. A pump adds ${k} L every minute.`, scene: 'The graph shows the water in a farm tank as a pump fills it.',
    words: `Water $=$ ${b} $+$ ${k} $\\times$ minutes`, tex: `W = ${b} + ${k}t`, xVar: 't', yVar: 'W', xName: 'minutes', yWhat: 'the amount of water in the tank', xPrep: 'after',
    back: (y) => `how many minutes it takes until the tank holds $${y}\\ \\text{L}$`, xLabel: 'Time (min)', yLabel: 'Water (L)', money: false, yUnit: 'L', xUnit: 'min', b, k, yStep: s, xMax: 8,
  };
}

const yv = (r: Rel, x: number) => r.b + r.k * x;
/** The y quantity in words: "pay", "fare", "water". */
const yName = (r: Rel) => axisName(r.yLabel);
/** An axis title without its unit, in lower case: "time", "number of games". */
const axisName = (label: string) => label.replace(/ \(.*\)$/, '').toLowerCase();
/** One unit of x in words: "hour", "game", "kilometre". */
const xOne = (r: Rel) => (r.xName === 'tickets' ? 'ticket' : r.xName.replace(/s$/, ''));
/** A y-value in prose: \$45 or 45 L. */
const yText = (r: Rel, y: number) => (r.money ? tag(y) : `$${num(y)}\\ \\text{${r.yUnit}}$`);
/** An x-value in prose: 6 hours, 4 games. */
function xText(r: Rel, x: number): string {
  const unit = r.xName === 'tickets' ? (x === 1 ? 'ticket' : 'tickets') : x === 1 ? r.xName.replace(/s$/, '') : r.xName;
  return `$${num(x)}$ ${unit}`;
}
const yPart = (r: Rel, y: number, label?: string): Part => (r.money ? moneyPart(y, label ? `${label} \\$` : '\\$') : numPart(y, { label, suffix: r.yUnit }));
/** Substitution line for the rule: P = 15 × 6 = 90. */
function subLine(r: Rel, x: number): string {
  return r.b === 0
    ? `$${r.yVar} = ${num(r.k)} \\times ${num(x)} = ${num(yv(r, x))}$`
    : `$${r.yVar} = ${num(r.b)} + ${num(r.k)} \\times ${num(x)} = ${num(r.b)} + ${num(r.k * x)} = ${num(yv(r, x))}$`;
}

/** Endpoints of y = b + kx from x = 0, stopping at the top of the grid. */
function linePts(b: number, k: number, xMax: number, yMax: number): Array<[number, number]> {
  const yEnd = b + k * xMax;
  if (yEnd <= yMax) return [[0, b], [xMax, yEnd]];
  return [[0, b], [roundTo((yMax - b) / k, 4), yMax]];
}
function graphOf(r: Rel, lines: Array<[number, number]>): Figure {
  const yMax = yv(r, r.xMax);
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: r.xMax, yMin: 0, yMax, xStep: 1, yStep: r.yStep, xLabel: r.xLabel, yLabel: r.yLabel },
    polylines: lines.map(([b, k]) => ({ points: linePts(b, k, r.xMax, yMax) })),
  };
}

function tableTask(rng: Rng, r: Rel, missing: number): GenOutput {
  const step = r.xMax >= 10 ? rng.pick([1, 2]) : 1;
  const start = r.b === 0 ? step : rng.pick([0, 1]);
  const xs = Array.from({ length: 5 }, (_, i) => start + i * step);
  const hide = rng.sample([1, 2, 3, 4], missing).sort((a, b) => a - b);
  const labels = missing === 1 ? ['?'] : ['A', 'B'];
  const rows = xs.map((x, i) => {
    const y = yv(r, x);
    const j = hide.indexOf(i);
    return [String(x), j >= 0 ? labels[j] : r.money ? cell(y) : String(y)];
  });
  const head = [r.xLabel, r.yLabel.replace('($)', '(\\$)')];
  const hidden = hide.map((i) => xs[i]);
  return {
    prompt: `${r.story} The rule is ${r.words}, or $${r.tex}$. Find the missing ${missing === 1 ? 'value' : 'values A and B'} in the table of values.`,
    figure: { type: 'table', headers: head, rows, horizontal: true },
    parts: hidden.map((x, j) => yPart(r, yv(r, x), missing === 1 ? undefined : labels[j])),
    hints: [`The top row gives $${r.xVar}$. Put the value above each missing entry into the rule.`, `For $${r.xVar} = ${hidden[0]}$: ${r.b === 0 ? `$${r.yVar} = ${num(r.k)} \\times ${hidden[0]}$` : `$${r.yVar} = ${num(r.b)} + ${num(r.k)} \\times ${hidden[0]}$`}. Multiply first.`],
    solution: [
      ...hidden.map((x, j) => `${missing === 1 ? '' : `${labels[j]}: `}Substitute $${r.xVar} = ${x}$: ${subLine(r, x)}`),
      missing === 1
        ? `The missing value is ${yText(r, yv(r, hidden[0]))}.`
        : `A is ${yText(r, yv(r, hidden[0]))} and B is ${yText(r, yv(r, hidden[1]))}.`,
    ],
  };
}

/** Realistic rules with decimals for difficulty-2 tables (no graph). */
function relDecimal(rng: Rng): Rel {
  const kind = rng.int(1, 4);
  const base = { yStep: 1, xMax: 10, scene: '', yWhat: '', xPrep: 'for' as const, back: () => '' };
  if (kind === 1) {
    const b = rng.pick([3.5, 3.75, 4.25]);
    const k = rng.pick([1.75, 2.25, 2.5]);
    return { ...base, story: `A taxi in ${rng.pick(CITIES)} charges ${money(b)} to start plus ${money(k)} per kilometre.`, words: `Fare $=$ ${num(b)} $+$ ${num(k)} $\\times$ kilometres`, tex: `C = ${num(b)} + ${num(k)}d`, xVar: 'd', yVar: 'C', xName: 'kilometres', xLabel: 'Distance (km)', yLabel: 'Fare ($)', money: true, yUnit: '', xUnit: 'km', b, k };
  }
  if (kind === 2) {
    const b = rng.pick([75, 120, 150]);
    const k = rng.pick([22.5, 32.5, 45]);
    return { ...base, story: `A banquet hall charges ${tag(b)} plus ${money(k)} per hour.`, words: `Cost $=$ ${b} $+$ ${num(k)} $\\times$ hours`, tex: `C = ${b} + ${num(k)}h`, xVar: 'h', yVar: 'C', xName: 'hours', xLabel: 'Time (h)', yLabel: 'Cost ($)', money: true, yUnit: '', xUnit: 'h', b, k };
  }
  if (kind === 3) {
    const b = rng.pick([40, 75, 120]);
    const k = rng.pick([15, 25, 35]);
    const name = rng.pick(NAMES);
    return { ...base, story: `${name} has ${tag(b)} saved and adds ${tag(k)} each week.`, words: `Savings $=$ ${b} $+$ ${k} $\\times$ weeks`, tex: `S = ${b} + ${k}w`, xVar: 'w', yVar: 'S', xName: 'weeks', xLabel: 'Weeks', yLabel: 'Savings ($)', money: true, yUnit: '', xUnit: '', b, k };
  }
  const b = rng.pick([15, 25, 40]);
  const k = rng.pick([12, 15, 18]);
  return { ...base, story: `A water truck already holds ${b} L. A pump adds ${k} L every minute.`, words: `Water $=$ ${b} $+$ ${k} $\\times$ minutes`, tex: `W = ${b} + ${k}t`, xVar: 't', yVar: 'W', xName: 'minutes', xLabel: 'Time (min)', yLabel: 'Water (L)', money: false, yUnit: 'L', xUnit: 'min', b, k };
}

function readGraph(rng: Rng, r: Rel, backwards: boolean): GenOutput {
  const x = rng.int(2, r.xMax - 1);
  const y = yv(r, x);
  const fig = graphOf(r, [[r.b, r.k]]);
  if (backwards) {
    return {
      prompt: `${r.scene} Use the graph to find ${r.back(y)}.`,
      figure: fig,
      parts: [numPart(x, { suffix: r.xUnit || r.xName })],
      hints: [`Find ${r.money ? mv(y) : num(y)} on the vertical axis, the ${yName(r)} axis.`, 'Go straight across to the line. Then go straight down to the horizontal axis and read the value.'],
      solution: [
        `Start at ${r.money ? mv(y) : num(y)} on the vertical axis and go across to the line.`,
        `Go down from the line to the horizontal axis. It reads $${x}$.`,
        `Check with the rule: ${subLine(r, x)}`,
        `The answer is ${xText(r, x)}.`,
      ],
    };
  }
  return {
    prompt: `${r.scene} Use the graph to find ${r.yWhat} ${r.xPrep} ${xText(r, x)}.`,
    figure: fig,
    parts: [yPart(r, y)],
    hints: [`Find $${x}$ on the horizontal axis, the ${axisName(r.xLabel)} axis.`, 'Go straight up to the line. Then go straight across to the vertical axis and read the value.'],
    solution: [
      `Start at $${x}$ on the horizontal axis and go straight up to the line.`,
      `Go across from the line to the vertical axis. It reads ${r.money ? mv(y) : num(y)}.`,
      `Check with the rule: ${subLine(r, x)}`,
      `${cap(r.yWhat)} ${r.xPrep} ${xText(r, x)} is ${yText(r, y)}.`,
    ],
  };
}

function chooseGraph(rng: Rng, r: Rel): GenOutput {
  const { b, k } = r;
  const s = r.yStep;
  const cands: Array<[number, number]> =
    b === 0
      ? [[0, 2 * k], [k, k], [0, k / 2], [k, 1], [2 * k, k]]
      : [[0, k], [k, b], [b, 2 * k], [2 * b, k], [b, k + s], [b, k - s]];
  const yMax = yv(r, r.xMax);
  const seen = new Set([`${b},${k}`]);
  const distract: Array<[number, number]> = [];
  for (const c of rng.shuffle(cands)) {
    const key = `${c[0]},${c[1]}`;
    if (seen.has(key) || c[1] <= 0 || c[0] >= yMax) continue;
    seen.add(key);
    distract.push(c);
    if (distract.length === 3) break;
  }
  const opts = [{ md: '', figure: graphOf(r, [[b, k]]), correct: true }, ...distract.map((c) => ({ md: '', figure: graphOf(r, [c]) }))];
  const answer = mcFigures(rng, opts);
  if (answer.kind === 'mc') answer.choices.forEach((c, i) => (c.md = `Graph ${String.fromCharCode(65 + i)}`));
  const label = answer.kind === 'mc' ? answer.choices.find((c) => c.id === answer.correct)!.md : '';
  const x2 = r.xMax / 2;
  return {
    prompt: `${r.story} The rule is ${r.words}, or $${r.tex}$. Which graph shows this rule?`,
    parts: [{ answer }],
    hints: [
      `Use the rule to find two points. Start with $${r.xVar} = 0$: where does the line start?`,
      `When $${r.xVar} = 0$, $${r.yVar} = ${b}$. When $${r.xVar} = ${x2}$, $${r.yVar} = ${yv(r, x2)}$. Find the graph that goes through both points.`,
    ],
    solution: [
      `When $${r.xVar} = 0$: ${subLine(r, 0)}. The line starts at ${r.money ? mv(b) : num(b)} on the vertical axis.`,
      `When $${r.xVar} = ${x2}$: ${subLine(r, x2)}`,
      `Only ${label} goes through $(0, ${b})$ and $(${x2}, ${yv(r, x2)})$.`,
      `${label} shows the rule.`,
    ],
    answerDisplay: label,
    calculator: false,
  };
}

function describeGraph(rng: Rng, r: Rel): GenOutput {
  const x1 = rng.int(2, r.xMax - 2);
  const y1 = yv(r, x1);
  const askA = r.money ? `What is the ${yName(r)} for $0$ ${r.xName}? This is the start fee.` : `How much ${yName(r)} is there at $0$ ${r.xName}?`;
  return {
    prompt: `${r.scene}\n\n**(a)** ${askA}\n\n**(b)** How much does the ${yName(r)} go up for each extra ${xOne(r)}?`,
    figure: graphOf(r, [[r.b, r.k]]),
    parts: [yPart(r, r.b, '(a)'), yPart(r, r.k, '(b)')],
    hints: ['(a) Read the graph where the line meets the vertical axis. That is where the horizontal value is $0$.', `(b) Read two points, for example at $0$ and at $${x1}$. Find how much the value goes up, then divide by $${x1}$.`],
    solution: [
      `(a) The line starts at ${r.money ? mv(r.b) : num(r.b)} on the vertical axis.`,
      `(b) At $${x1}$ ${r.xName} the line is at ${r.money ? mv(y1) : num(y1)}. From $0$ to $${x1}$, the value goes up $${num(y1)} - ${num(r.b)} = ${num(y1 - r.b)}$.`,
      `Divide by the number of ${r.xName}: $${num(y1 - r.b)} \\div ${x1} = ${num(r.k)}$`,
      `(a) ${cap(r.money ? 'the start fee is ' : `there is `)}${yText(r, r.b)}${r.money ? '' : ` at the start`}. (b) The ${yName(r)} goes up ${yText(r, r.k)} for each ${xOne(r)}. The rule is $${r.tex}$.`,
    ],
  };
}

const tableGraph = skill({
  id: 'm204-table-graph',
  name: 'Tables and graphs of relationships',
  description: 'Complete a table of values from a rule, read values from a graph, and choose the graph that matches a rule.',
  outcomes: ['PR1'],
  lessonId: 'm204-5-3',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return rng.chance(0.5) ? tableTask(rng, relProp(rng), 1) : readGraph(rng, relProp(rng), false);
    if (d === 2) {
      const k = rng.int(1, 3);
      if (k === 1) return tableTask(rng, relDecimal(rng), 2);
      if (k === 2) return readGraph(rng, relStart(rng), rng.chance(0.5));
      return chooseGraph(rng, relProp(rng));
    }
    return rng.chance(0.5) ? chooseGraph(rng, relStart(rng)) : describeGraph(rng, relStart(rng));
  },
});

export const FORMULA_SKILLS: SkillDef[] = [useFormula, solveEquation, tableGraph];
