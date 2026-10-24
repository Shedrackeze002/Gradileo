/** Math 20-4 Unit 2 — Shopping (N2): unit price and the best buy, sales and GST, and paying over time. */
import { fixedChoice, numPart, retry, skill } from '../../helpers.ts';
import { fmt, fmtFixed, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Ananya', 'Nathan', 'Lena', 'Diego', 'Harpreet', 'Noor', 'Jaxon', 'Ngozi',
];

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure; answerDisplay?: string };

const tx = (u: string) => `\\text{${u}}`;
const isWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
const isCents = (x: number) => Math.abs(x * 100 - Math.round(x * 100)) < 1e-6;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** "a" or "an" before a number that is read aloud (8 -> "an eight", 11 -> "an eleven"). */
const art = (x: number) => (/^(8|11|18)(\D|$)|^8/.test(String(x)) ? 'an' : 'a');

/** Thousands separators: money from 1,000 up; measurements (minDigits 5) from 10 000 up. */
function group(s: string, sep = ',', minDigits = 4): string {
  const neg = s.startsWith('-');
  const body = neg ? s.slice(1) : s;
  const [i, f] = body.split('.');
  const g = i.length >= minDigits ? i.replace(/\B(?=(\d{3})+(?!\d))/g, sep) : i;
  return `${neg ? '-' : ''}${g}${f !== undefined ? `.${f}` : ''}`;
}
/** Money in prose (never inside $...$), always with cents: \$1,234.50 */
const money = (x: number) => `\\$${group(fmtFixed(x, 2))}`;
/** A price tag: whole dollars print without cents (\$60), otherwise \$59.99. */
const tag = (x: number) => (isWhole(x) ? `\\$${group(String(Math.round(x)))}` : money(x));
/** Money inside maths with two decimals, no dollar sign: 1{,}234.50 */
const m2 = (x: number) => group(fmtFixed(x, 2), '{,}');
/** A plain number or measurement inside maths (1500, not 1,500). */
const mn = (x: number, dp = 4) => group(fmt(x, dp), '{,}', 5);
/** Money in a table cell (cells are plain text, not Markdown). */
const cell = (x: number) => `$${group(fmtFixed(x, 2))}`;
/** "= 0.75" when exact to the cent, otherwise "= 0.732 \approx 0.73" (inside maths). */
function toCents(x: number): string {
  if (isCents(x)) return `= ${m2(x)}`;
  if (Math.abs(roundTo(x, 4) - x) < 1e-9) return `= ${mn(x, 4)} \\approx ${m2(x)}`;
  return `= ${group((Math.floor(Math.abs(x) * 10000) / 10000).toFixed(4), '{,}')}\\ldots \\approx ${m2(x)}`;
}
/** "about " when a money value had to be rounded to the cent. */
const abt = (x: number) => (isCents(x) ? '' : 'about ');
/** A unit price for comparing: \$0.75, or about \$0.732 when it needs a third decimal. */
const uprice = (x: number) => (isCents(x) ? money(x) : `about \\$${fmtFixed(x, 3)}`);
/** True when a money value sits close to a half cent (x.xx5), where rounding is unclear. */
function halfCent(x: number): boolean {
  const c = Math.abs(x) * 100;
  return Math.abs(c - Math.floor(c) - 0.5) < 0.03;
}
/** Integer cents, so sums of money stay exact. */
const toC = (x: number) => Math.round(x * 100);
const fromC = (c: number) => c / 100;
/** A two-decimal price ending in 9 (like 5.49) close to `raw`. */
const price9 = (raw: number) => roundTo(Math.max(0.99, Math.round(raw * 10) / 10 - 0.01), 2);

const CENT = 'to the nearest cent';
/** A money answer graded to the cent. */
const moneyPart = (v: number, label = '\\$', tolerance = 0.011): Part => numPart(v, { decimals: 2, tolerance, label });

const NEED_NOTE = 'The lowest unit price is only the best buy if you need that much and will use it all. Also think about waste (food that goes bad), storage space and quality.';

// ---------------------------------------------------------------------------
// 2.1 Unit price
// ---------------------------------------------------------------------------

interface UPEach {
  pack: (n: number) => string;
  each: string;
  many: string;
  ns: number[];
  per: number[];
  store: string;
}

const UP1: UPEach[] = [
  { pack: (n) => `a box of $${n}$ granola bars`, each: 'bar', many: 'bars', ns: [6, 8, 10, 12], per: [0.25, 0.4, 0.5, 0.6, 0.75], store: 'the grocery store' },
  { pack: (n) => `a pack of $${n}$ juice boxes`, each: 'juice box', many: 'juice boxes', ns: [4, 6, 8, 10], per: [0.4, 0.5, 0.6, 0.75], store: 'the grocery store' },
  { pack: (n) => `a pack of $${n}$ AA batteries`, each: 'battery', many: 'batteries', ns: [4, 8, 12, 16], per: [0.75, 1, 1.25, 1.5], store: 'the hardware store' },
  { pack: (n) => `a pack of $${n}$ pairs of work socks`, each: 'pair', many: 'pairs', ns: [3, 4, 5, 6], per: [3, 3.5, 4, 4.5, 5], store: 'a work-wear store' },
  { pack: (n) => `a case of $${n}$ cans of cat food`, each: 'can', many: 'cans', ns: [6, 12, 24], per: [0.75, 1, 1.25, 1.5], store: 'the pet store' },
  { pack: (n) => `a pack of $${n}$ rolls of paper towel`, each: 'roll', many: 'rolls', ns: [2, 4, 6, 8], per: [1.25, 1.5, 1.75, 2], store: 'the grocery store' },
  { pack: (n) => `a carton of $${n}$ eggs`, each: 'egg', many: 'eggs', ns: [12, 18, 30], per: [0.25, 0.3, 0.35, 0.4], store: 'the grocery store' },
  { pack: (n) => `${art(n)} $${n}\\ ${tx('kg')}$ bag of potatoes`, each: 'kilogram', many: 'kilograms', ns: [2, 5, 10], per: [1.2, 1.5, 2, 2.5], store: 'a farmers’ market' },
  { pack: (n) => `${art(n)} $${n}\\ ${tx('kg')}$ bag of apples`, each: 'kilogram', many: 'kilograms', ns: [2, 3, 4], per: [2.5, 3, 3.5, 4], store: 'the grocery store' },
  { pack: (n) => `${art(n)} $${n}\\ ${tx('L')}$ jug of milk`, each: 'litre', many: 'litres', ns: [2, 4], per: [1.5, 1.6, 1.75, 2], store: 'a corner store' },
  { pack: (n) => `a tray of $${n}$ muffins`, each: 'muffin', many: 'muffins', ns: [4, 6, 12], per: [0.75, 1, 1.25, 1.5], store: 'a bakery' },
];

interface UPSize {
  thing: (s: number) => string;
  sizes: number[];
  unit: 'g' | 'mL' | 'kg' | 'L';
  /** The unit price is per `base` units (100 g or 1 kg ...). */
  base: number;
  lo: number;
  hi: number;
  store: string;
}

const sized = (unit: string, what: string) => (s: number) => `${art(s)} $${mn(s)}\\ ${tx(unit)}$ ${what}`;

const UP2: UPSize[] = [
  { thing: sized('g', 'box of cereal'), sizes: [350, 400, 500, 750, 900], unit: 'g', base: 100, lo: 0.6, hi: 1.2, store: 'the grocery store' },
  { thing: sized('g', 'bag of chips'), sizes: [200, 250, 300], unit: 'g', base: 100, lo: 1.2, hi: 2, store: 'a gas station' },
  { thing: sized('mL', 'bottle of shampoo'), sizes: [300, 400, 500, 750], unit: 'mL', base: 100, lo: 0.8, hi: 1.8, store: 'a drugstore' },
  { thing: sized('g', 'jar of peanut butter'), sizes: [500, 750, 1000], unit: 'g', base: 100, lo: 0.6, hi: 1.1, store: 'the grocery store' },
  { thing: sized('mL', 'bottle of ketchup'), sizes: [500, 750, 1000], unit: 'mL', base: 100, lo: 0.4, hi: 0.8, store: 'the grocery store' },
  { thing: sized('kg', 'bag of dog food'), sizes: [4, 8, 12, 15], unit: 'kg', base: 1, lo: 3, hi: 6, store: 'the pet store' },
  { thing: sized('kg', 'bag of rice'), sizes: [2, 4, 8, 10], unit: 'kg', base: 1, lo: 2, hi: 3.5, store: 'the grocery store' },
  { thing: sized('L', 'jug of windshield washer fluid'), sizes: [2, 4], unit: 'L', base: 1, lo: 1.2, hi: 2.4, store: 'a gas station on the highway' },
  { thing: sized('kg', 'bag of frozen fries'), sizes: [1, 2, 2.5], unit: 'kg', base: 1, lo: 2.5, hi: 4.5, store: 'the grocery store' },
];

interface UPConv {
  thing: (s: number) => string;
  sizes: number[];
  /** Number of "per" units in one package. */
  count: (s: number) => number;
  convert: (s: number) => string;
  perText: string;
  lo: number;
  hi: number;
  store: string;
}

const gToKg = (s: number) => `Change grams to kilograms: $${mn(s)}\\ ${tx('g')} \\div 1000 = ${mn(s / 1000)}\\ ${tx('kg')}$.`;
const mlToL = (s: number) => `Change millilitres to litres: $${mn(s)}\\ ${tx('mL')} \\div 1000 = ${mn(s / 1000)}\\ ${tx('L')}$.`;
const kgTo100g = (s: number) =>
  `Change kilograms to grams: $${mn(s)}\\ ${tx('kg')} \\times 1000 = ${mn(s * 1000)}\\ ${tx('g')}$. That is $${mn(s * 1000)} \\div 100 = ${mn(s * 10)}$ groups of $100\\ ${tx('g')}$.`;
const lTo100mL = (s: number) =>
  `Change litres to millilitres: $${mn(s)}\\ ${tx('L')} \\times 1000 = ${mn(s * 1000)}\\ ${tx('mL')}$. That is $${mn(s * 1000)} \\div 100 = ${mn(s * 10)}$ groups of $100\\ ${tx('mL')}$.`;
const PER100G = `per $100\\ ${tx('g')}$`;
const PER100ML = `per $100\\ ${tx('mL')}$`;

const UP3: UPConv[] = [
  { thing: sized('g', 'package of ground beef'), sizes: [450, 500, 750, 900], count: (s) => s / 1000, convert: gToKg, perText: 'per kilogram', lo: 9, hi: 14, store: 'a butcher shop' },
  { thing: sized('g', 'block of cheese'), sizes: [400, 450, 500, 700], count: (s) => s / 1000, convert: gToKg, perText: 'per kilogram', lo: 12, hi: 20, store: 'the grocery store' },
  { thing: sized('g', 'bag of coffee'), sizes: [300, 340, 500, 750], count: (s) => s / 1000, convert: gToKg, perText: 'per kilogram', lo: 18, hi: 30, store: 'a coffee shop' },
  { thing: sized('g', 'pack of chicken breasts'), sizes: [600, 800, 1200], count: (s) => s / 1000, convert: gToKg, perText: 'per kilogram', lo: 10, hi: 16, store: 'the grocery store' },
  { thing: sized('mL', 'bottle of maple syrup'), sizes: [250, 500, 750], count: (s) => s / 1000, convert: mlToL, perText: 'per litre', lo: 20, hi: 36, store: 'a farmers’ market' },
  { thing: sized('mL', 'bottle of olive oil'), sizes: [250, 500, 750], count: (s) => s / 1000, convert: mlToL, perText: 'per litre', lo: 12, hi: 22, store: 'the grocery store' },
  { thing: sized('kg', 'bag of rice'), sizes: [2, 4, 8], count: (s) => s * 10, convert: kgTo100g, perText: PER100G, lo: 0.2, hi: 0.4, store: 'the grocery store' },
  { thing: sized('kg', 'bag of trail mix'), sizes: [1, 1.5, 2], count: (s) => s * 10, convert: kgTo100g, perText: PER100G, lo: 1.5, hi: 2.8, store: 'a bulk food store' },
  { thing: sized('L', 'jug of laundry detergent'), sizes: [1.5, 2, 3, 4], count: (s) => s * 10, convert: lTo100mL, perText: PER100ML, lo: 0.25, hi: 0.5, store: 'a big-box store' },
  { thing: sized('L', 'jug of apple juice'), sizes: [1.5, 2, 3], count: (s) => s * 10, convert: lTo100mL, perText: PER100ML, lo: 0.12, hi: 0.25, store: 'the grocery store' },
];

const unitPrice = skill({
  id: 'm204-unit-price',
  name: 'Unit price',
  description: 'Find the unit price per item, per kilogram, per litre or per 100 g, changing units when the size and the unit price do not match.',
  outcomes: ['N2'],
  lessonId: 'm204-2-1',
  calculator: true,
  gen(rng, d): Out {
    const name = rng.pick(NAMES);
    if (d === 1) {
      const it = rng.pick(UP1);
      const n = rng.pick(it.ns);
      const per = rng.pick(it.per);
      const total = roundTo(n * per, 2);
      return {
        prompt: `At ${it.store}, ${it.pack(n)} costs ${tag(total)}. What is the unit price (the price for one ${it.each}), ${CENT}?`,
        parts: [moneyPart(per)],
        hints: ['The unit price is the cost of **one** unit.', `Divide the price by the number of ${it.many}: $${m2(total)} \\div ${n}$.`],
        solution: ['Unit price $=$ price $\\div$ number of units.', `$${m2(total)} \\div ${n} = ${m2(per)}$`, `The unit price is ${money(per)} per ${it.each}.`],
        answerDisplay: `${money(per)} per ${it.each}`,
      };
    }
    if (d === 2) {
      const it = rng.pick(UP2);
      const { s, p } = retry(
        () => {
          const s = rng.pick(it.sizes);
          return { s, p: price9((s / it.base) * rng.float(it.lo, it.hi, 3)) };
        },
        (o) => !halfCent(o.p / (o.s / it.base)),
      );
      const groups = s / it.base;
      const up = p / groups;
      const unitWord = it.unit === 'L' ? 'litres' : 'kilograms';
      const perText = it.base === 1 ? (it.unit === 'L' ? 'per litre' : 'per kilogram') : it.unit === 'g' ? PER100G : PER100ML;
      const steps =
        it.base === 1
          ? [`Unit price ${perText} $=$ price $\\div$ number of ${unitWord}.`, `$${m2(p)} \\div ${mn(s)} ${toCents(up)}$`]
          : [`Count the groups of $100\\ ${tx(it.unit)}$: $${mn(s)} \\div 100 = ${mn(groups)}$`, `Divide the price by the number of groups: $${m2(p)} \\div ${mn(groups)} ${toCents(up)}$`];
      return {
        prompt: `${name} is shopping at ${it.store}. ${cap(it.thing(s))} costs ${money(p)}. What is the unit price ${perText}, ${CENT}?`,
        parts: [moneyPart(up)],
        hints: [
          'Unit price $=$ price $\\div$ number of units.',
          it.base === 1 ? `Divide the price by the number of ${unitWord}.` : `First find how many groups of $100$ are in $${mn(s)}\\ ${tx(it.unit)}$. Then divide the price by that number.`,
        ],
        solution: [...steps, `The unit price is ${abt(up)}${money(up)} ${perText}.`],
        answerDisplay: `${money(up)} ${perText}`,
      };
    }
    const it = rng.pick(UP3);
    const { s, p } = retry(
      () => {
        const s = rng.pick(it.sizes);
        return { s, p: price9(it.count(s) * rng.float(it.lo, it.hi, 3)) };
      },
      (o) => !halfCent(o.p / it.count(o.s)),
    );
    const c = it.count(s);
    const up = p / c;
    return {
      prompt: `${name} is comparing prices at ${it.store}. ${cap(it.thing(s))} costs ${money(p)}. What is the unit price ${it.perText}, ${CENT}?`,
      parts: [moneyPart(up)],
      hints: ['The size and the unit price use different units. Change the size first.', `Use $1\\ ${tx('kg')} = 1000\\ ${tx('g')}$ and $1\\ ${tx('L')} = 1000\\ ${tx('mL')}$. Then divide the price by the new number.`],
      solution: [it.convert(s), `Divide the price by that number: $${m2(p)} \\div ${mn(c)} ${toCents(up)}$`, `The unit price is ${abt(up)}${money(up)} ${it.perText}.`],
      answerDisplay: `${money(up)} ${it.perText}`,
    };
  },
});

// ---------------------------------------------------------------------------
// 2.1 Best buy (multiple choice)
// ---------------------------------------------------------------------------

interface BBProduct {
  item: string;
  container: string;
  unit: string;
  metric: boolean;
  sizes: number[];
  /** Size pairs for difficulty 1 and 3, the larger a whole multiple of the smaller. */
  pairs: Array<[number, number]>;
  base: number;
  perText: string;
  lo: number;
  hi: number;
}

const BB: BBProduct[] = [
  { item: 'rice', container: 'bag', unit: 'kg', metric: true, sizes: [1, 2, 4, 8], pairs: [[1, 2], [2, 4], [2, 8], [4, 8], [1, 4]], base: 1, perText: 'per kilogram', lo: 2, hi: 3.5 },
  { item: 'flour', container: 'bag', unit: 'kg', metric: true, sizes: [1, 2.5, 5, 10], pairs: [[1, 5], [2.5, 5], [5, 10], [2.5, 10]], base: 1, perText: 'per kilogram', lo: 1.2, hi: 2.4 },
  { item: 'apple juice', container: 'jug', unit: 'L', metric: true, sizes: [1, 2, 3, 4], pairs: [[1, 2], [2, 4], [1, 4], [1, 3]], base: 1, perText: 'per litre', lo: 1.5, hi: 3 },
  { item: 'toilet paper', container: 'pack', unit: 'rolls', metric: false, sizes: [6, 12, 24, 30], pairs: [[6, 12], [12, 24], [6, 24]], base: 1, perText: 'per roll', lo: 0.45, hi: 0.9 },
  { item: 'pop', container: 'case', unit: 'cans', metric: false, sizes: [6, 12, 24], pairs: [[6, 12], [12, 24], [6, 24]], base: 1, perText: 'per can', lo: 0.5, hi: 0.9 },
  { item: 'yogurt', container: 'tub', unit: 'g', metric: true, sizes: [500, 650, 750, 1000], pairs: [[500, 1000]], base: 100, perText: 'per 100 g', lo: 0.5, hi: 1 },
  { item: 'dog food', container: 'bag', unit: 'kg', metric: true, sizes: [2, 4, 8, 12], pairs: [[2, 4], [4, 8], [4, 12], [2, 8]], base: 1, perText: 'per kilogram', lo: 3, hi: 6 },
  { item: 'dish soap', container: 'bottle', unit: 'mL', metric: true, sizes: [500, 750, 1000, 1500], pairs: [[500, 1000], [750, 1500], [500, 1500]], base: 100, perText: 'per 100 mL', lo: 0.3, hi: 0.7 },
  { item: 'eggs', container: 'carton', unit: 'eggs', metric: false, sizes: [12, 18, 30], pairs: [], base: 1, perText: 'per egg', lo: 0.28, hi: 0.45 },
  { item: 'AA batteries', container: 'pack', unit: 'batteries', metric: false, sizes: [4, 8, 12, 24], pairs: [[4, 8], [4, 12], [8, 24], [12, 24]], base: 1, perText: 'per battery', lo: 0.6, hi: 1.5 },
  { item: 'coffee', container: 'bag', unit: 'g', metric: true, sizes: [300, 600, 900], pairs: [[300, 600], [300, 900]], base: 100, perText: 'per 100 g', lo: 1.5, hi: 2.5 },
];

const sizeMd = (p: BBProduct, s: number) => (p.metric ? `the $${mn(s)}\\ ${tx(p.unit)}$ ${p.container}` : `the ${p.container} of $${s}$ ${p.unit}`);
const sizeCell = (p: BBProduct, s: number) => `${fmt(s)} ${p.unit}`;
const PAIRED = BB.filter((x) => x.pairs.length > 0);

function bestBuyTwo(rng: Rng, name: string): Out {
  const p = rng.pick(PAIRED);
  const [s1, s2] = rng.pick(p.pairs);
  const m = s2 / s1;
  const kind = rng.weighted([['big', 5], ['small', 3], ['same', 1.5]] as const);
  const { P1, P2 } = retry(
    () => {
      const P1 = Math.max(1, Math.round((s1 / p.base) * rng.float(p.lo, p.hi, 3) * 4) / 4);
      const f = kind === 'big' ? rng.float(0.75, 0.9, 3) : kind === 'small' ? rng.float(1.1, 1.25, 3) : 1;
      return { P1, P2: Math.round(P1 * m * f * 4) / 4 };
    },
    (o) => kind === 'same' || Math.abs(o.P2 / (o.P1 * m) - 1) >= 0.05,
  );
  const same = Math.abs(P2 - m * P1) < 1e-9;
  const big = !same && P2 < m * P1;
  const correct = same ? 2 : big ? 1 : 0;
  const u1 = P1 / (s1 / p.base);
  const u2 = P2 / (s2 / p.base);
  const verdict = same ? 'the same amount' : big ? 'which is less' : 'which is more';
  return {
    prompt: `${name} is buying ${p.item}. The store sells two sizes, shown in the table. Which is the better buy?`,
    figure: { type: 'table', headers: ['Size', 'Price'], rows: [[sizeCell(p, s1), cell(P1)], [sizeCell(p, s2), cell(P2)]] },
    parts: [{ answer: fixedChoice([`${cap(sizeMd(p, s1))} for ${money(P1)}`, `${cap(sizeMd(p, s2))} for ${money(P2)}`, `Both cost the same ${p.perText}`], correct) }],
    hints: [`The big size holds $${m}$ times as much. What would $${m}$ of the small size cost?`, `Compare that with the price of one big ${p.container}. You can also compare unit prices ${p.perText}.`],
    solution: [
      `The big size holds $${mn(s2)} \\div ${mn(s1)} = ${m}$ times as much as the small size.`,
      `$${m}$ small ${p.container}s would cost $${m} \\times ${m2(P1)} = ${m2(m * P1)}$, or ${money(m * P1)}.`,
      `One big ${p.container} costs ${money(P2)}, ${verdict}.`,
      `Unit prices ${p.perText}: small ${uprice(u1)}, big ${uprice(u2)}.`,
      NEED_NOTE,
      same ? `Both sizes cost the same ${p.perText}, so neither is a better buy. Buy the size you need.` : `The better buy is ${sizeMd(p, big ? s2 : s1)}.`,
    ],
  };
}

function bestBuyThree(rng: Rng, name: string): Out {
  const p = rng.pick(BB);
  const sizes = rng.sample(p.sizes, 3).sort((a, b) => a - b);
  const target = rng.weighted([[2, 4], [1, 4], [0, 2]] as const);
  const prices = retry(
    () => {
      const u = rng.float(p.lo, p.hi, 3);
      return sizes.map((s, i) => price9((s / p.base) * u * (i === target ? rng.float(0.8, 0.9, 3) : rng.float(0.97, 1.12, 3))));
    },
    (ps) => {
      const us = ps.map((x, i) => x / (sizes[i] / p.base));
      const others = us.filter((_, i) => i !== target);
      return Math.min(...others) / us[target] >= 1.03;
    },
  );
  const us = prices.map((x, i) => x / (sizes[i] / p.base));
  const best = us.indexOf(Math.min(...us));
  const rows = sizes.map((s, i) => [sizeCell(p, s), cell(prices[i])]);
  const line = (i: number) => {
    const n = sizes[i] / p.base;
    const work = n === 1 ? `${money(prices[i])} is already the price for $1\\ ${tx(p.unit)}$` : `$${m2(prices[i])} \\div ${mn(n)}$`;
    return `${cap(sizeMd(p, sizes[i]))}: ${work}, so ${uprice(us[i])} ${p.perText}`;
  };
  return {
    prompt: `${name} is stocking up on ${p.item}. The store sells three sizes, shown in the table. Which size is the best buy?`,
    figure: { type: 'table', headers: ['Size', 'Price'], rows },
    parts: [{ answer: fixedChoice(sizes.map((s, i) => `${cap(sizeMd(p, s))} for ${money(prices[i])}`), best) }],
    hints: [`Find the unit price of each size ${p.perText}.`, 'The best buy has the lowest unit price. The biggest size is not always the cheapest per unit.'],
    solution: [
      p.base === 1 ? `Unit price ${p.perText} $=$ price $\\div$ size.` : `Unit price ${p.perText} $=$ price $\\div$ (size $\\div$ 100).`,
      ...sizes.map((_, i) => line(i)),
      NEED_NOTE,
      `The best buy is ${sizeMd(p, sizes[best])}. It has the lowest unit price.`,
    ],
  };
}

function bestBuyDeal(rng: Rng, name: string): Out {
  const p = rng.pick(PAIRED);
  const [s1, s2] = rng.pick(p.pairs);
  const per = (price: number, size: number) => price / (size / p.base);
  const rows = (a: string, b: string) => [[sizeCell(p, s1), a], [sizeCell(p, s2), b]];
  if (rng.chance(0.4)) {
    // A coupon for some dollars off one small size.
    const dealWins = rng.chance(0.5);
    const { P1, P2, X } = retry(
      () => {
        const u = rng.float(p.lo, p.hi, 3);
        const P2 = price9((s2 / p.base) * u);
        const P1 = price9((s1 / p.base) * u * rng.float(1.08, 1.2, 3));
        const target = per(P2, s2) * (dealWins ? rng.float(0.82, 0.93, 3) : rng.float(1.06, 1.15, 3)) * (s1 / p.base);
        return { P1, P2, X: Math.round((P1 - target) * 4) / 4 };
      },
      (o) => {
        if (o.X < 0.5 || o.X > o.P1 * 0.6) return false;
        const a = per(o.P1 - o.X, s1);
        const b = per(o.P2, s2);
        return Math.max(a, b) / Math.min(a, b) >= 1.03 && per(o.P1, s1) > b * 1.03;
      },
    );
    const eff = roundTo(P1 - X, 2);
    const ua = per(eff, s1);
    const ub = per(P2, s2);
    return {
      prompt: `${name} is buying ${p.item}. The prices are in the table. ${name} also has a coupon for ${money(X)} off ${sizeMd(p, s1)}. Which is the better buy?`,
      figure: { type: 'table', headers: ['Size', 'Price'], rows: rows(cell(P1), cell(P2)) },
      parts: [{ answer: fixedChoice([`${cap(sizeMd(p, s1))}, using the coupon`, cap(sizeMd(p, s2)), `Both cost the same ${p.perText}`], ua < ub ? 0 : 1) }],
      hints: ['Take the coupon off the price first. That is what you really pay.', `Then find both unit prices ${p.perText} and compare.`],
      solution: [
        `With the coupon, ${sizeMd(p, s1)} costs $${m2(P1)} - ${m2(X)} = ${m2(eff)}$, or ${money(eff)}.`,
        `Unit price with the coupon: ${uprice(ua)} ${p.perText}.`,
        `Unit price of ${sizeMd(p, s2)}: ${uprice(ub)} ${p.perText}.`,
        NEED_NOTE,
        `The better buy is ${ua < ub ? `${sizeMd(p, s1)} with the coupon` : sizeMd(p, s2)}.`,
      ],
    };
  }
  // A multi-buy deal on the small size.
  const bogo = rng.chance(0.4);
  const dealWins = rng.chance(bogo ? 0.7 : 0.5);
  const { P1, T, P2 } = retry(
    () => {
      const u = rng.float(p.lo, p.hi, 3);
      const P1 = price9((s1 / p.base) * u * rng.float(1.0, 1.15, 3));
      const T = bogo ? roundTo(2 * P1, 2) : Math.max(2, Math.round(3 * P1 * rng.float(0.72, 0.88, 3)));
      const eA = T / ((3 * s1) / p.base);
      const P2 = price9((s2 / p.base) * eA * (dealWins ? rng.float(1.06, 1.18, 3) : rng.float(0.82, 0.94, 3)));
      return { P1, T, P2 };
    },
    (o) => {
      const a = o.T / ((3 * s1) / p.base);
      const b = per(o.P2, s2);
      // Keep the big size realistic: at most about 40% cheaper per unit than the regular small price.
      return o.T < 3 * o.P1 && Math.max(a, b) / Math.min(a, b) >= 1.03 && b >= 0.6 * per(o.P1, s1);
    },
  );
  const ua = T / ((3 * s1) / p.base);
  const ub = per(P2, s2);
  const dealText = bogo ? 'buy 2, get 1 free' : `3 for ${tag(T)}`;
  const totalSize = 3 * s1;
  const amount = p.metric ? `$${mn(totalSize)}\\ ${tx(p.unit)}$` : `$${totalSize}$ ${p.unit}`;
  return {
    prompt: `${name} needs ${p.item}. ${cap(sizeMd(p, s1))} is on sale: **${dealText}**. The regular price is ${money(P1)} each. ${cap(sizeMd(p, s2))} costs ${money(P2)}. Which is the better buy, if ${name} will use it all?`,
    figure: { type: 'table', headers: ['Size', 'Price'], rows: rows(`${cell(P1)} each, or ${bogo ? 'buy 2 get 1 free' : `3 for ${cell(T)}`}`, cell(P2)) },
    parts: [{ answer: fixedChoice([`The deal on ${sizeMd(p, s1)}`, cap(sizeMd(p, s2)), `Both cost the same ${p.perText}`], ua < ub ? 0 : 1) }],
    hints: ['Work out what the deal really costs and how much you get for that price.', `Then compare the unit prices ${p.perText}.`],
    solution: [
      bogo
        ? `With the deal, ${name} pays for $2$ and gets $3$: $2 \\times ${m2(P1)} = ${m2(T)}$ for $3 \\times ${mn(s1)} = ${mn(totalSize)}$ ${p.unit}.`
        : `With the deal, ${name} pays ${money(T)} for $3 \\times ${mn(s1)} = ${mn(totalSize)}$ ${p.unit}.`,
      `Deal unit price: ${uprice(ua)} ${p.perText} (for ${amount}).`,
      `Unit price of ${sizeMd(p, s2)}: ${uprice(ub)} ${p.perText}.`,
      NEED_NOTE,
      `The better buy is ${ua < ub ? `the deal on ${sizeMd(p, s1)}` : sizeMd(p, s2)}.`,
    ],
  };
}

const bestBuy = skill({
  id: 'm204-best-buy',
  name: 'Finding the best buy',
  description: 'Compare two or three sizes, or a sale deal or coupon, to choose the best buy, and explain why need, waste and quality also matter.',
  outcomes: ['N2'],
  lessonId: 'm204-2-1',
  format: 'mc',
  calculator: true,
  gen(rng, d): Out {
    const name = rng.pick(NAMES);
    if (d === 1) return bestBuyTwo(rng, name);
    if (d === 2) return bestBuyThree(rng, name);
    return bestBuyDeal(rng, name);
  },
});

// ---------------------------------------------------------------------------
// 2.2 Sale price
// ---------------------------------------------------------------------------

const DISC_ITEMS = [
  { what: 'winter jacket', lo: 80, hi: 200, store: 'a clothing store downtown' },
  { what: 'pair of work boots', lo: 100, hi: 220, store: 'a work-wear store' },
  { what: 'hoodie', lo: 30, hi: 70, store: 'a clothing store' },
  { what: 'pair of running shoes', lo: 60, hi: 160, store: 'a shoe store at the mall' },
  { what: 'backpack', lo: 30, hi: 80, store: 'a sporting goods store' },
  { what: 'pair of headphones', lo: 40, hi: 150, store: 'an electronics store' },
  { what: 'video game', lo: 40, hi: 90, store: 'a game store' },
  { what: 'toaster', lo: 30, hi: 70, store: 'a department store' },
  { what: 'hockey stick', lo: 50, hi: 200, store: 'a sports shop' },
  { what: 'bike', lo: 200, hi: 600, store: 'a bike shop' },
  { what: 'pair of jeans', lo: 40, hi: 90, store: 'a clothing store' },
  { what: 'cordless drill', lo: 80, hi: 200, store: 'a hardware store' },
  { what: 'microwave', lo: 90, hi: 250, store: 'an appliance store' },
];

const PAIR_ITEMS = [
  { one: 'pair of running shoes', many: 'pairs of shoes', lo: 50, hi: 140, store: 'a shoe store' },
  { one: 'pair of jeans', many: 'pairs of jeans', lo: 35, hi: 80, store: 'a clothing store' },
  { one: 'video game', many: 'video games', lo: 30, hi: 80, store: 'a game store' },
  { one: 'hoodie', many: 'hoodies', lo: 30, hi: 65, store: 'a clothing store downtown' },
  { one: 'pair of sunglasses', many: 'pairs of sunglasses', lo: 20, hi: 60, store: 'a mall kiosk' },
  { one: 'board game', many: 'board games', lo: 25, hi: 60, store: 'a toy store' },
];

const salePrice = skill({
  id: 'm204-sale-price',
  name: 'Sale price and amount saved',
  description: 'Find the amount saved and the sale price after a percent discount, including "second item 50% off" and two discounts in a row.',
  outcomes: ['N2'],
  lessonId: 'm204-2-2',
  calculator: true,
  gen(rng, d): Out {
    const name = rng.pick(NAMES);
    if (d < 3) {
      const it = rng.pick(DISC_ITEMS);
      const pct = d === 1 ? rng.pick([10, 20, 25, 30, 40, 50]) : rng.pick([15, 20, 25, 30, 35, 40]);
      const P = retry(
        () => (d === 1 ? 10 * rng.int(Math.ceil(it.lo / 10), Math.floor(it.hi / 10)) : roundTo(rng.int(it.lo, it.hi - 1) + rng.pick([0.99, 0.49, 0.95, 0.79, 0.29]), 2)),
        (x) => !halfCent((x * pct) / 100),
      );
      const disc = (P * pct) / 100;
      const discR = roundTo(disc, 2);
      const sale = fromC(toC(P) - toC(discR));
      return {
        prompt: `${name} wants a ${it.what} at ${it.store}. The regular price is ${tag(P)}. It is on sale for **${pct}% off**. How much does ${name} save, and what is the sale price? Give each answer ${CENT}.`,
        parts: [moneyPart(discR, 'Amount saved: \\$'), moneyPart(sale, 'Sale price: \\$')],
        hints: [`Change ${pct}% to a decimal: $${pct}\\% = ${mn(pct / 100)}$. Multiply it by the regular price to find the amount saved.`, 'Sale price $=$ regular price $-$ amount saved.'],
        solution: [
          `Change the percent to a decimal: $${pct}\\% = ${mn(pct / 100)}$.`,
          `Amount saved: $${mn(pct / 100)} \\times ${m2(P)} ${toCents(disc)}$`,
          `Sale price: $${m2(P)} - ${m2(discR)} = ${m2(sale)}$`,
          `${name} saves ${money(discR)}, and the sale price is ${money(sale)}.`,
        ],
        answerDisplay: `Saved ${money(discR)}; sale price ${money(sale)}`,
      };
    }
    if (rng.chance(0.5)) {
      // Buy one, get the second at 50% off (the discount is on the lower price).
      const it = rng.pick(PAIR_ITEMS);
      const { A, B } = retry(
        () => {
          const ends = [0, 0.5, 0.98, 0.48, 0.9];
          const a = roundTo(rng.int(it.lo, it.hi) + rng.pick(ends), 2);
          const b = rng.chance(0.3) ? a : roundTo(rng.int(it.lo, it.hi) + rng.pick(ends), 2);
          return { A: Math.max(a, b), B: Math.min(a, b) };
        },
        (o) => isCents(o.B / 2),
      );
      const save = roundTo(B / 2, 2);
      const total = fromC(toC(A) + toC(B) - toC(save));
      const samePrice = Math.abs(A - B) < 1e-9;
      return {
        prompt: samePrice
          ? `${cap(it.store)} has a sale: **buy one, get the second at 50% off**. ${name} buys two ${it.many}. Each one is ${money(A)}. How much does ${name} save, and what is the total price before tax? Give each answer ${CENT}.`
          : `${cap(it.store)} has a sale: **buy one, get the second at 50% off**. The 50% comes off the item with the lower price. ${name} buys two ${it.many}: one for ${money(A)} and one for ${money(B)}. How much does ${name} save, and what is the total price before tax? Give each answer ${CENT}.`,
        parts: [moneyPart(save, 'Amount saved: \\$'), moneyPart(total, 'Total price: \\$')],
        hints: [samePrice ? 'Only the second item is half price.' : `Only the cheaper item (${money(B)}) is half price.`, '50% off means you save half of that price. Then add the two prices and subtract the amount saved.'],
        solution: [
          `${samePrice ? "The second item" : "The cheaper item"} is ${money(B)}. Half of it is $${m2(B)} \\div 2 = ${m2(save)}$, so ${name} saves ${money(save)}.`,
          `Without the sale, the two cost $${m2(A)} + ${m2(B)} = ${m2(A + B)}$.`,
          `With the sale: $${m2(A + B)} - ${m2(save)} = ${m2(total)}$`,
          `${name} saves ${money(save)} and pays ${money(total)} before tax.`,
        ],
        answerDisplay: `Saved ${money(save)}; total ${money(total)}`,
      };
    }
    // Two discounts in a row.
    const it = rng.pick(DISC_ITEMS);
    const p1 = rng.pick([20, 25, 30, 40, 50]);
    const p2 = rng.pick([10, 15, 20]);
    const { P, s1, fin } = retry(
      () => {
        const P = rng.chance(0.5) ? 10 * rng.int(Math.ceil(it.lo / 10), Math.floor(it.hi / 10)) : roundTo(rng.int(it.lo, it.hi - 1) + rng.pick([0.99, 0.49, 0.95]), 2);
        const s1raw = (P * (100 - p1)) / 100;
        const s1 = roundTo(s1raw, 2);
        const finRaw = (s1 * (100 - p2)) / 100;
        return { P, s1raw, s1, finRaw, fin: roundTo(finRaw, 2) };
      },
      (o) => !halfCent(o.s1raw) && !halfCent(o.finRaw),
    );
    const s1raw = (P * (100 - p1)) / 100;
    const finRaw = (s1 * (100 - p2)) / 100;
    const wrong = (P * (100 - p1 - p2)) / 100;
    return {
      prompt: `A ${it.what} at ${it.store} is regularly ${tag(P)}. This week it is **${p1}% off**. At the checkout, the store takes **another ${p2}% off** the sale price. Find the price after the first discount and the final price, ${CENT}.`,
      parts: [moneyPart(s1, 'After the first discount: \\$'), moneyPart(fin, 'Final price: \\$')],
      hints: ['Do one discount at a time. A discount of $p\\%$ leaves you paying $(100 - p)\\%$ of the price.', `The ${p2}% comes off the **sale** price, not the regular price. So ${p1}% then ${p2}% is not the same as ${p1 + p2}% off.`],
      solution: [
        `After ${p1}% off, you pay $${100 - p1}\\%$: $${mn((100 - p1) / 100)} \\times ${m2(P)} ${toCents(s1raw)}$`,
        `After another ${p2}% off, you pay $${100 - p2}\\%$ of the sale price: $${mn((100 - p2) / 100)} \\times ${m2(s1)} ${toCents(finRaw)}$`,
        `Check: ${p1 + p2}% off the regular price would give ${money(roundTo(wrong, 2))}. That is too low, because the second discount is taken off a smaller price.`,
        `The price after the first discount is ${money(s1)}, and the final price is ${money(fin)}.`,
      ],
      answerDisplay: `${money(s1)}; final ${money(fin)}`,
    };
  },
});

// ---------------------------------------------------------------------------
// 2.2 Total cost with GST
// ---------------------------------------------------------------------------

interface ShopCtx {
  store: string;
  kind: string;
  /** Item name, lowest and highest whole-dollar price. */
  items: Array<[string, number, number]>;
  compare?: boolean;
}

const SHOPS: ShopCtx[] = [
  { store: 'a hardware store', kind: 'hardware stores', compare: true, items: [['Hammer', 12, 18], ['Box of nails', 5, 8], ['Tape measure', 9, 13], ['Work gloves', 7, 10], ['Safety glasses', 4, 7], ['Utility knife', 6, 9]] },
  { store: 'an office supply store', kind: 'office supply stores', compare: true, items: [['Binder', 4, 7], ['Pack of pens', 3, 5], ['Calculator', 12, 16], ['Notebook', 2, 4], ['Highlighters', 3, 5], ['USB stick', 9, 15]] },
  { store: 'a clothing store', kind: 'clothing stores', items: [['T-shirt', 12, 18], ['Jeans', 38, 50], ['Socks', 8, 11], ['Hoodie', 28, 40], ['Toque', 10, 16], ['Belt', 18, 26]] },
  { store: 'a pet store', kind: 'pet stores', compare: true, items: [['Dog toy', 6, 10], ['Leash', 14, 19], ['Dog treats', 6, 10], ['Cat litter', 12, 16], ['Food bowl', 8, 13]] },
  { store: 'a sporting goods store', kind: 'sporting goods stores', compare: true, items: [['Hockey tape', 3, 5], ['Water bottle', 9, 14], ['Soccer ball', 18, 26], ['Shin pads', 20, 28], ['Mouthguard', 6, 10]] },
  { store: 'an auto parts store', kind: 'auto parts stores', compare: true, items: [['Wiper blades', 20, 26], ['Washer fluid', 4, 6], ['Air freshener', 2, 4], ['Car wash soap', 8, 11], ['Ice scraper', 5, 8]] },
  { store: 'a fast-food restaurant', kind: 'restaurants', items: [['Burger', 7, 9], ['Fries', 3, 5], ['Drink', 2, 4], ['Chicken wrap', 6, 9], ['Sundae', 3, 5], ['Salad', 6, 9]] },
  { store: 'a coffee shop', kind: 'coffee shops', items: [['Latte', 4, 6], ['Muffin', 2, 4], ['Tea', 2, 4], ['Breakfast sandwich', 5, 7], ['Hot chocolate', 3, 5], ['Cookie', 1, 3]] },
  { store: 'a dollar store', kind: 'dollar stores', items: [['Birthday card', 2, 4], ['Gift bag', 1, 3], ['Balloons', 2, 4], ['Paper plates', 2, 4], ['Napkins', 1, 3], ['Tape', 1, 3]] },
];

const GST_TEXT = 'A sales tax (GST) of 5% is added.';

interface Line {
  name: string;
  qty: number;
  price: number;
}

const lineTotal = (l: Line) => fromC(l.qty * toC(l.price));
const realPrice = (rng: Rng, lo: number, hi: number) => roundTo(rng.int(lo, Math.max(lo, hi - 1)) + rng.pick([0.99, 0.49, 0.79, 0.29, 0.25, 0.95]), 2);

function makeLines(rng: Rng, shop: ShopCtx, n: number, friendly: boolean): Line[] {
  const picks = rng.sample(shop.items, n);
  const withQty = friendly ? -1 : rng.int(0, n - 1);
  return picks.map(([name, lo, hi], i) => ({
    name,
    qty: i === withQty ? (hi <= 5 ? rng.int(2, 3) : 2) : 1,
    price: friendly ? rng.int(lo * 2, hi * 2) / 2 : realPrice(rng, lo, hi),
  }));
}

function lineSteps(lines: Line[]): string[] {
  const multi = lines.filter((l) => l.qty > 1);
  return multi.map((l) => `${l.name}: $${l.qty} \\times ${m2(l.price)} = ${m2(lineTotal(l))}$`);
}

const totalCost = skill({
  id: 'm204-total-cost',
  name: 'Total cost with sales tax',
  description: 'Add the items on a receipt to find the subtotal, find a 5% sales tax and the total, and find the change or compare two stores.',
  outcomes: ['N2'],
  lessonId: 'm204-2-2',
  calculator: true,
  gen(rng, d): Out {
    const name = rng.pick(NAMES);
    if (d === 3 && rng.chance(0.45)) {
      // Which store is cheaper overall?
      const shop = rng.pick(SHOPS.filter((s) => s.compare));
      const made = retry(
        () => {
          const picks = rng.sample(shop.items, 3);
          const a = picks.map(([, lo, hi]) => realPrice(rng, lo, hi));
          const b = picks.map(([, lo, hi]) => realPrice(rng, lo, hi));
          const sa = a.reduce((s, x) => s + toC(x), 0);
          const sb = b.reduce((s, x) => s + toC(x), 0);
          return { picks, a, b, sa, sb };
        },
        (o) => {
          const aWins = o.a.some((x, i) => x < o.b[i]);
          const bWins = o.a.some((x, i) => x > o.b[i]);
          return aWins && bWins && Math.abs(o.sa - o.sb) >= 75 && o.sa % 20 !== 10 && o.sb % 20 !== 10;
        },
      );
      const { picks, a, b, sa, sb } = made;
      const gA = roundTo((sa * 5) / 10000, 2);
      const gB = roundTo((sb * 5) / 10000, 2);
      const tA = fromC(sa + toC(gA));
      const tB = fromC(sb + toC(gB));
      const save = fromC(Math.abs(toC(tA) - toC(tB)));
      const cheaper = tA < tB ? 'Store A' : 'Store B';
      return {
        prompt: `${name} needs three items. The table shows the prices at two ${shop.kind}. ${GST_TEXT} Find the total cost with GST at each store. Then find how much ${name} saves by buying everything at the cheaper store. Give each answer ${CENT}.`,
        figure: { type: 'table', headers: ['Item', 'Store A', 'Store B'], rows: picks.map(([n], i) => [n, cell(a[i]), cell(b[i])]) },
        parts: [moneyPart(tA, 'Total at Store A: \\$'), moneyPart(tB, 'Total at Store B: \\$'), moneyPart(save, 'Amount saved: \\$')],
        hints: ['For each store, add the prices to get the subtotal. Then add 5% GST.', 'GST $= 0.05 \\times$ subtotal. The amount saved is the difference between the two totals.'],
        solution: [
          `Store A subtotal: $${a.map(m2).join(' + ')} = ${m2(fromC(sa))}$. GST: $0.05 \\times ${m2(fromC(sa))} ${toCents((sa * 5) / 10000)}$. Total: $${m2(fromC(sa))} + ${m2(gA)} = ${m2(tA)}$`,
          `Store B subtotal: $${b.map(m2).join(' + ')} = ${m2(fromC(sb))}$. GST: $0.05 \\times ${m2(fromC(sb))} ${toCents((sb * 5) / 10000)}$. Total: $${m2(fromC(sb))} + ${m2(gB)} = ${m2(tB)}$`,
          `Difference: $${m2(Math.max(tA, tB))} - ${m2(Math.min(tA, tB))} = ${m2(save)}$`,
          `${cheaper} is cheaper overall, even though it does not have the lowest price on every item. ${name} saves ${money(save)}.`,
        ],
        answerDisplay: `A ${money(tA)}; B ${money(tB)}; saves ${money(save)}`,
      };
    }
    const shop = rng.pick(d === 3 ? SHOPS.filter((s) => s.kind !== 'clothing stores') : SHOPS);
    const n = d === 1 ? rng.int(2, 3) : rng.int(3, 4);
    const lines = retry(
      () => makeLines(rng, shop, n, d === 1),
      (ls) => {
        const S = ls.reduce((s, l) => s + toC(lineTotal(l)), 0);
        if (d === 1) return S % 100 === 0;
        return S % 20 !== 10 && S < 9200;
      },
    );
    const S = lines.reduce((s, l) => s + toC(lineTotal(l)), 0);
    const sub = fromC(S);
    const gstRaw = (S * 5) / 10000;
    const gst = roundTo(gstRaw, 2);
    const total = fromC(S + toC(gst));
    const withQty = lines.some((l) => l.qty > 1);
    const figure: Figure = withQty
      ? { type: 'table', headers: ['Item', 'Qty', 'Price each'], rows: [...lines.map((l) => [l.name, String(l.qty), cell(l.price)]), ['Subtotal', '', '?'], ['GST (5%)', '', '?'], ['Total', '', '?']] }
      : { type: 'table', headers: ['Item', 'Price'], rows: [...lines.map((l) => [l.name, cell(l.price)]), ['Subtotal', '?'], ['GST (5%)', '?'], ['Total', '?']] };
    const subStep = `Subtotal: $${lines.map((l) => m2(lineTotal(l))).join(' + ')} = ${m2(sub)}$`;
    const gstStep = `GST: $0.05 \\times ${m2(sub)} ${toCents(gstRaw)}$`;
    const totStep = `Total: $${m2(sub)} + ${m2(gst)} = ${m2(total)}$`;
    if (d === 3) {
      const bill = [20, 50, 100].find((b) => b > total + 0.5) ?? 100;
      const change = fromC(bill * 100 - toC(total));
      return {
        prompt: `${name} buys the items on this receipt at ${shop.store}. ${GST_TEXT} ${name} pays with a ${tag(bill)} bill. What is the total with GST, and how much change should ${name} get? Give each answer ${CENT}.`,
        figure,
        parts: [moneyPart(total, 'Total: \\$'), moneyPart(change, 'Change: \\$')],
        hints: ['Find the subtotal first (multiply when the quantity is more than 1). Then add 5% GST to get the total.', `Change $=$ amount paid $-$ total, so subtract the total from ${tag(bill)}.`],
        solution: [...lineSteps(lines), subStep, gstStep, totStep, `Change: $${bill} - ${m2(total)} = ${m2(change)}$`, `The total is ${money(total)}, and ${name} should get ${money(change)} in change.`],
        answerDisplay: `Total ${money(total)}; change ${money(change)}`,
      };
    }
    return {
      prompt: `${name} buys the items on this receipt at ${shop.store}. ${GST_TEXT} Find the subtotal, the GST and the total. Give each answer ${CENT}.`,
      figure,
      parts: [moneyPart(sub, 'Subtotal: \\$'), moneyPart(gst, 'GST: \\$'), moneyPart(total, 'Total: \\$')],
      hints: [withQty ? 'The subtotal is the sum of the prices before tax. When the quantity is 2 or 3, multiply first.' : 'The subtotal is the sum of the prices before tax.', 'GST $= 0.05 \\times$ subtotal. Total $=$ subtotal $+$ GST.'],
      solution: [...lineSteps(lines), subStep, gstStep, totStep, `The subtotal is ${money(sub)}, the GST is ${money(gst)} and the total is ${money(total)}.`],
      answerDisplay: `${money(sub)}; GST ${money(gst)}; total ${money(total)}`,
    };
  },
});

// ---------------------------------------------------------------------------
// 2.3 Paying over time
// ---------------------------------------------------------------------------

const BIG_ITEMS = [
  { what: 'TV', lo: 500, hi: 1400 },
  { what: 'laptop', lo: 600, hi: 1400 },
  { what: 'couch', lo: 800, hi: 2000 },
  { what: 'fridge', lo: 1000, hi: 2200 },
  { what: 'washing machine', lo: 700, hi: 1400 },
  { what: 'gaming console', lo: 400, hi: 700 },
  { what: 'mattress', lo: 500, hi: 1200 },
  { what: 'e-bike', lo: 1200, hi: 2500 },
  { what: 'cellphone', lo: 800, hi: 1400 },
  { what: 'snowblower', lo: 600, hi: 1200 },
];

const anA = (w: string) => (/^[aeiou]/i.test(w) ? 'an' : 'a');

function planText(down: number, n: number, pay: number, every = 'monthly'): string {
  const start = down > 0 ? `${tag(down)} down, then` : 'no money down, then';
  return `${start} $${n}$ ${every} payments of ${tag(pay)}`;
}

function planTotalStep(down: number, n: number, pay: number): string {
  const pays = fromC(n * toC(pay));
  return down > 0
    ? `Total of the payments: $${n} \\times ${m2(pay)} = ${m2(pays)}$. Add the down payment: $${m2(down)} + ${m2(pays)} = ${m2(down + pays)}$`
    : `There is no down payment. Total of the payments: $${n} \\times ${m2(pay)} = ${m2(pays)}$`;
}

const instalment = skill({
  id: 'm204-instalment',
  name: 'Instalment plans',
  description: 'Find the total cost of a down payment plus regular payments, the extra cost compared with the cash price, and which payment plan costs less.',
  outcomes: ['N2'],
  lessonId: 'm204-2-3',
  calculator: true,
  gen(rng, d): Out {
    const name = rng.pick(NAMES);
    const it = rng.pick(BIG_ITEMS);
    const a = anA(it.what);
    if (d === 1 || d === 2) {
      const weekly = d === 2 && rng.chance(0.3);
      const made = retry(
        () => {
          if (d === 1) {
            const cash = 50 * rng.int(Math.ceil(it.lo / 50), Math.floor(it.hi / 50));
            const down = rng.pick([0, 50, 100, 100, 200]);
            const n = rng.pick([6, 10, 12]);
            const pay = 5 * Math.round((cash * rng.float(1.08, 1.25, 3) - down) / n / 5);
            return { down, n, pay, total: down + n * pay, cash };
          }
          const cash = roundTo(rng.int(it.lo, it.hi) - 0.01, 2);
          if (weekly) {
            const n = rng.pick([52, 78, 104]);
            const pay = price9((cash * rng.float(1.4, 1.9, 3)) / n);
            return { down: 0, n, pay, total: fromC(n * toC(pay)), cash };
          }
          const down = rng.pick([0, 50, 100, 150, 200]);
          const n = rng.pick([12, 18, 24]);
          const pay = roundTo(Math.round(((cash * rng.float(1.08, 1.25, 3) - down) / n) * 4) / 4 - 0.01, 2);
          return { down, n, pay, total: fromC(toC(down) + n * toC(pay)), cash };
        },
        (o) => o.cash > o.down && o.total - o.cash >= 10 && o.pay > 5,
      );
      const { down, n, pay, total, cash } = made;
      const extra = fromC(toC(total) - toC(cash));
      const plan = weekly ? `no money down, then $${n}$ weekly payments of ${tag(pay)}` : planText(down, n, pay);
      const where = weekly ? `A rent-to-own store lets ${name} pay over time instead` : `The store also lets ${name} pay over time`;
      return {
        prompt: `${name} wants ${a} ${it.what}. The cash price is ${tag(cash)}. ${where}: ${plan}. Find the total cost of the payment plan and the extra cost compared with paying cash. Give each answer ${CENT}.`,
        parts: [moneyPart(total, 'Total cost of the plan: \\$'), moneyPart(extra, 'Extra cost: \\$')],
        hints: ['Total cost $=$ down payment $+$ (number of payments $\\times$ each payment).', 'Extra cost (the finance charge) $=$ total cost of the plan $-$ cash price.'],
        solution: [
          planTotalStep(down, n, pay),
          `Extra cost: $${m2(total)} - ${m2(cash)} = ${m2(extra)}$`,
          `The plan costs ${money(total)} in all. That is ${money(extra)} more than paying cash.`,
        ],
        answerDisplay: `${money(total)}; extra ${money(extra)}`,
      };
    }
    if (rng.chance(0.5)) {
      // A percent down payment.
      const pct = rng.pick([10, 15, 20, 25]);
      const made = retry(
        () => {
          const cash = 10 * rng.int(Math.ceil(it.lo / 10), Math.floor(it.hi / 10));
          const down = (cash * pct) / 100;
          const n = rng.pick([12, 18, 24]);
          const pay = roundTo(Math.round(((cash * rng.float(1.08, 1.22, 3) - down) / n) * 2) / 2 - 0.01, 2);
          const total = fromC(toC(down) + n * toC(pay));
          return { cash, down, n, pay, total };
        },
        (o) => o.total - o.cash >= 10,
      );
      const { cash, down, n, pay, total } = made;
      const pays = fromC(n * toC(pay));
      const extra = fromC(toC(total) - toC(cash));
      return {
        prompt: `${name} is buying ${a} ${it.what} with a cash price of ${tag(cash)}. The store offers a plan: pay **${pct}% down**, then $${n}$ monthly payments of ${money(pay)}. Find the down payment, the total cost of the plan and the extra cost compared with paying cash. Give each answer ${CENT}.`,
        parts: [moneyPart(down, 'Down payment: \\$'), moneyPart(total, 'Total cost of the plan: \\$'), moneyPart(extra, 'Extra cost: \\$')],
        hints: [`The down payment is ${pct}% of the cash price: multiply by $${mn(pct / 100)}$.`, 'Total $=$ down payment $+$ all the monthly payments. Extra cost $=$ total $-$ cash price.'],
        solution: [
          `Down payment: $${mn(pct / 100)} \\times ${mn(cash)} = ${m2(down)}$`,
          `Monthly payments: $${n} \\times ${m2(pay)} = ${m2(pays)}$`,
          `Total cost: $${m2(down)} + ${m2(pays)} = ${m2(total)}$`,
          `Extra cost: $${m2(total)} - ${m2(cash)} = ${m2(extra)}$`,
          `The down payment is ${money(down)}, the plan costs ${money(total)} in all, and that is ${money(extra)} more than cash.`,
        ],
        answerDisplay: `${money(down)}; ${money(total)}; extra ${money(extra)}`,
      };
    }
    // Two plans: which costs less?
    const made = retry(
      () => {
        const cash = roundTo(rng.int(it.lo, it.hi) - 0.01, 2);
        const dA = rng.pick([100, 150, 200, 250]);
        const nA = rng.pick([6, 10, 12]);
        const pA = roundTo(Math.round(((cash * rng.float(1.03, 1.12, 3) - dA) / nA) * 2) / 2 - 0.01, 2);
        const nB = rng.pick([18, 24, 36].filter((x) => x > nA));
        const pB = roundTo(Math.round(((cash * rng.float(1.06, 1.2, 3)) / nB) * 2) / 2 - 0.01, 2);
        const tA = fromC(toC(dA) + nA * toC(pA));
        const tB = fromC(nB * toC(pB));
        return { dA, nA, pA, nB, pB, tA, tB };
      },
      (o) => o.pA > 10 && o.pB > 10 && Math.abs(o.tA - o.tB) >= 10,
    );
    const { dA, nA, pA, nB, pB, tA, tB } = made;
    const save = fromC(Math.abs(toC(tA) - toC(tB)));
    const cheaper = tA < tB ? 'Plan A' : 'Plan B';
    return {
      prompt: `${name} wants ${a} ${it.what}. The store offers the two payment plans in the table. Find the total cost of each plan. Then find how much ${name} saves by choosing the cheaper plan. Give each answer ${CENT}.`,
      figure: { type: 'table', headers: ['Plan', 'Down payment', 'Monthly payment', 'Number of payments'], rows: [['Plan A', cell(dA), cell(pA), String(nA)], ['Plan B', cell(0), cell(pB), String(nB)]] },
      parts: [moneyPart(tA, 'Plan A total: \\$'), moneyPart(tB, 'Plan B total: \\$'), moneyPart(save, 'Amount saved: \\$')],
      hints: ['For each plan: total $=$ down payment $+$ (number of payments $\\times$ monthly payment).', 'The cheaper plan has the smaller total. Subtract to find the amount saved.'],
      solution: [
        `Plan A: $${m2(dA)} + ${nA} \\times ${m2(pA)} = ${m2(dA)} + ${m2(fromC(nA * toC(pA)))} = ${m2(tA)}$`,
        `Plan B: $${nB} \\times ${m2(pB)} = ${m2(tB)}$`,
        `Difference: $${m2(Math.max(tA, tB))} - ${m2(Math.min(tA, tB))} = ${m2(save)}$`,
        `${cheaper} costs less. ${name} saves ${money(save)} by choosing it.${tB > tA ? ' A small monthly payment can hide a bigger total cost.' : ''}`,
      ],
      answerDisplay: `A ${money(tA)}; B ${money(tB)}; saves ${money(save)}`,
    };
  },
});

export const SHOPPING_SKILLS: SkillDef[] = [unitPrice, bestBuy, salePrice, totalCost, instalment];
