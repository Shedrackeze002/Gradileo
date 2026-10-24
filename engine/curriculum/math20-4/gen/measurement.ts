/** Math 20-4 Unit 6 — Measurement (SS1, PR1): SI and imperial units, converting between systems, and temperature. */
import { fixedChoice, mc, numPart, retry, skill } from '../../helpers.ts';
import { fmt, fmtFixed, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const tx = (u: string) => `\\text{${u}}`;

/** Group the whole-number part with thin spaces (SI style) when it has 5 or more digits. */
function grp(s: string): string {
  const [i, f] = s.split('.');
  const neg = i.startsWith('-');
  const digits = neg ? i.slice(1) : i;
  const g = digits.length > 4 ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : digits;
  return `${neg ? '-' : ''}${g}${f !== undefined ? '.' + f : ''}`;
}

/** LaTeX number without trailing zeros. */
const nm = (x: number, dp = 4) => grp(fmt(x, dp));
/** LaTeX number with exactly `dp` decimals. */
const nf = (x: number, dp: number) => grp(fmtFixed(x, dp));
/** A measurement inside maths: 12\ \text{cm}. */
const ms = (x: number, u: string, dp = 4) => `${nm(x, dp)}\\ ${tx(u)}`;
/** A measurement as inline maths: $12\ \text{cm}$. */
const M = (x: number, u: string, dp = 4) => `$${ms(x, u, dp)}$`;
/** A number in brackets when it is negative (for products such as 1.8 × (−15)). */
const br = (x: number) => (x < 0 ? `(${nm(x)})` : nm(x));
const cDeg = (x: number) => `${nm(x)}^\\circ\\text{C}`;
const fDeg = (x: number) => `${nm(x)}^\\circ\\text{F}`;
/** Remove floating-point noise from an exact decimal result. */
const clean = (x: number) => roundTo(x, 9);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** "a foot", "an inch". */
const an = (w: string) => `${/^(?!US\b)[aeiou]/i.test(w) ? 'an' : 'a'} ${w}`;

/** Money for Markdown text (outside maths): \$1,234.50 */
function cash(x: number): string {
  const [i, f] = fmtFixed(x, 2).split('.');
  return `\\$${i.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${f}`;
}

function placesOf(x: number): number {
  for (let d = 0; d <= 6; d++) if (Math.abs(roundTo(x, d) - x) < 1e-9) return d;
  return 6;
}

/** An exact numeric answer. Decimal answers keep their decimal form for display. */
function exact(value: number, suffix?: string, label?: string): Part {
  const v = clean(value);
  const d = placesOf(v);
  if (d === 0) return numPart(v, { suffix, label });
  return numPart(v, { suffix, label, decimals: d, tolerance: 0.5 * 10 ** -d });
}

/** True when x is safely away from a rounding boundary (…5) at `dp` decimal places. */
function clearOf(x: number, dp: number, margin = 0.06): boolean {
  const s = Math.abs(x) * 10 ** dp;
  const f = s - Math.floor(s);
  return Math.abs(f - 0.5) > margin;
}

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Liam', 'Mei', 'Tariq', 'Sofia', 'Kwame', 'Nadia', 'Ethan',
  'Harpreet', 'Noah', 'Chloé', 'Raj', 'Leila', 'Dakota', 'Hiroshi', 'Fatima', 'Owen', 'Jasmine', 'Malik',
  'Isabelle', 'Arjun', 'Kateri', 'Diego', 'Ava', 'Tyrone', 'Simran', 'Lucas', 'Zainab', 'Thanh', 'Gurpreet',
  'Maya', 'Wyatt', 'Ngozi', 'Carlos', 'Anika', 'Ji-woo',
];

const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Clearwater', 'Ashford', 'Pinewood'];

// ---------------------------------------------------------------------------
// Lesson 6.1 — SI and imperial units
// ---------------------------------------------------------------------------

interface UnitInfo {
  one: string;
  many: string;
}

const UN: Record<string, UnitInfo> = {
  mm: { one: 'millimetre', many: 'millimetres' },
  cm: { one: 'centimetre', many: 'centimetres' },
  m: { one: 'metre', many: 'metres' },
  km: { one: 'kilometre', many: 'kilometres' },
  g: { one: 'gram', many: 'grams' },
  kg: { one: 'kilogram', many: 'kilograms' },
  mL: { one: 'millilitre', many: 'millilitres' },
  L: { one: 'litre', many: 'litres' },
  in: { one: 'inch', many: 'inches' },
  ft: { one: 'foot', many: 'feet' },
  yd: { one: 'yard', many: 'yards' },
  oz: { one: 'ounce', many: 'ounces' },
  lb: { one: 'pound', many: 'pounds' },
};

type Ctx = (q: string, n: string) => string;

interface Pair {
  big: string;
  small: string;
  f: number;
  imperial: boolean;
  /** d1 whole numbers in the big unit. */
  d1: [number, number];
  /** d2: a decimal amount in the big unit. */
  d2Big: (rng: Rng) => number;
  /** d2: an amount in the small unit that is not a whole number of big units. */
  d2Small: (rng: Rng) => number;
  ctx: Ctx[];
}

const nonWhole = (make: () => number) => retry(make, (x) => !Number.isInteger(clean(x)));
const quarter = (rng: Rng, lo: number, hi: number) => rng.int(lo, hi) + rng.pick([0.25, 0.5, 0.75]);

const PAIRS: Pair[] = [
  {
    big: 'm', small: 'cm', f: 100, imperial: false, d1: [2, 8],
    d2Big: (r) => nonWhole(() => (r.chance(0.5) ? r.int(11, 48) / 10 : r.int(105, 480) / 100)),
    d2Small: (r) => retry(() => r.int(35, 480), (x) => x % 100 !== 0),
    ctx: [
      (q, n) => `${n} cuts a piece of rope that is ${q} long.`,
      (q) => `A banner for a community event is ${q} long.`,
      (q, n) => `${n} buys a piece of ribbon that is ${q} long at a craft store.`,
      (q) => `A piece of baseboard at a job site is ${q} long.`,
    ],
  },
  {
    big: 'cm', small: 'mm', f: 10, imperial: false, d1: [2, 15],
    d2Big: (r) => nonWhole(() => r.int(12, 95) / 10),
    d2Small: (r) => retry(() => r.int(12, 95), (x) => x % 10 !== 0),
    ctx: [
      (q) => `A nail is ${q} long.`,
      (q, n) => `${n} measures a bolt at the hardware store. It is ${q} long.`,
      (q) => `A crack in a car windshield is ${q} long.`,
      (q, n) => `${n} needs a drill bit that is ${q} long.`,
    ],
  },
  {
    big: 'km', small: 'm', f: 1000, imperial: false, d1: [2, 9],
    d2Big: (r) => nonWhole(() => r.int(11, 95) / 10),
    d2Small: (r) => retry(() => r.int(3, 39) * 50, (x) => x % 1000 !== 0),
    ctx: [
      (q, n) => `${n} walks ${q} to work at a grocery store.`,
      (q, n) => `${n} rides a bike ${q} to school.`,
      (q) => `A walking trail in a city park is ${q} long.`,
      (q) => `A delivery driver drives ${q} between two stops.`,
    ],
  },
  {
    big: 'kg', small: 'g', f: 1000, imperial: false, d1: [2, 10],
    d2Big: (r) => nonWhole(() => (r.chance(0.6) ? r.int(11, 49) / 10 : quarter(r, 1, 4))),
    d2Small: (r) => r.int(10, 95) * 10,
    ctx: [
      (q) => `A bag of flour at a bakery has a mass of ${q}.`,
      (q, n) => `${n} buys ${q} of ground beef at the grocery store.`,
      (q) => `A box of nails has a mass of ${q}.`,
      (q) => `A bag of potatoes has a mass of ${q}.`,
    ],
  },
  {
    big: 'L', small: 'mL', f: 1000, imperial: false, d1: [2, 8],
    d2Big: (r) => nonWhole(() => (r.chance(0.6) ? r.int(11, 49) / 10 : quarter(r, 1, 3))),
    d2Small: (r) => r.int(3, 19) * 50,
    ctx: [
      (q) => `A bottle of juice holds ${q}.`,
      (q, n) => `${n} pours ${q} of water into a pot.`,
      (q) => `A bottle of window cleaner holds ${q}.`,
      (q, n) => `${n} adds ${q} of oil to a car engine.`,
    ],
  },
  {
    big: 'ft', small: 'in', f: 12, imperial: true, d1: [2, 10],
    d2Big: (r) => quarter(r, 1, 8),
    d2Small: (r) => 12 * r.int(1, 8) + r.pick([3, 6, 9]),
    ctx: [
      (q) => `A board is ${q} long.`,
      (q, n) => `${n} buys a piece of chain that is ${q} long.`,
      (q) => `A shelf in a stock room is ${q} wide.`,
      (q, n) => `${n} cuts a piece of trim that is ${q} long.`,
    ],
  },
  {
    big: 'yd', small: 'ft', f: 3, imperial: true, d1: [2, 20],
    d2Big: (r) => r.int(1, 15) + 0.5,
    d2Small: (r) => 3 * r.int(1, 15) + 1.5,
    ctx: [
      (q, n) => `${n} buys ${q} of fabric to make costumes for a school play.`,
      (q) => `A roll of landscape fabric is ${q} long.`,
      (q) => `A rope at a boat dock is ${q} long.`,
    ],
  },
  {
    big: 'lb', small: 'oz', f: 16, imperial: true, d1: [2, 8],
    d2Big: (r) => quarter(r, 1, 6),
    d2Small: (r) => 16 * r.int(1, 6) + r.pick([4, 8, 12]),
    ctx: [
      (q) => `A bag of carrots weighs ${q}.`,
      (q) => `A block of cheese at a deli weighs ${q}.`,
      (q, n) => `${n} buys a roast that weighs ${q}.`,
      (q) => `A bag of rice weighs ${q}.`,
    ],
  },
];

const fact = (p: Pair) => `$1\\ ${tx(p.big)} = ${p.f}\\ ${tx(p.small)}$`;
const ftin = (ft: number, inch: number) => `${ft}\\ \\text{ft}\\ ${inch}\\ \\text{in}`;
const lboz = (lb: number, oz: number) => `${lb}\\ \\text{lb}\\ ${oz}\\ \\text{oz}`;

const convertWithin = skill({
  id: 'm204-convert-within',
  name: 'Converting units in one system',
  description: 'Convert lengths, masses and capacities within the SI system (mm, cm, m, km; g, kg; mL, L) and within the imperial system (in, ft, yd; oz, lb), including mixed units such as 5 ft 8 in.',
  outcomes: ['SS1'],
  lessonId: 'm204-6-1',
  calculator: true,
  gen(rng, d) {
    const n = rng.pick(NAMES);
    if (d === 3) return withinMixed(rng, n);
    const imperial = rng.chance(0.4);
    const pair = rng.pick(PAIRS.filter((p) => p.imperial === imperial));
    const toSmall = rng.chance(0.5);
    let v: number;
    if (d === 1) v = toSmall ? rng.int(...pair.d1) : rng.int(...pair.d1) * pair.f;
    else v = toSmall ? pair.d2Big(rng) : pair.d2Small(rng);
    v = clean(v);
    const from = toSmall ? pair.big : pair.small;
    const to = toSmall ? pair.small : pair.big;
    const result = clean(toSmall ? v * pair.f : v / pair.f);
    const ask = rng.pick([`How many ${UN[to].many} is that?`, `What is this amount in ${UN[to].many}?`]);
    return {
      prompt: `${rng.pick(pair.ctx)(M(v, from), n)} ${ask}\n\nUse ${fact(pair)}.`,
      parts: [exact(result, to)],
      hints: [
        `Is ${an(UN[to].one)} bigger or smaller than ${an(UN[from].one)}? A smaller unit needs a bigger number.`,
        `Use ${fact(pair)}. ${toSmall ? 'Multiply' : 'Divide'} by $${pair.f}$.`,
      ],
      solution: [
        `${fact(pair)}.`,
        toSmall
          ? `${cap(UN[pair.small].many)} are smaller than ${UN[pair.big].many}, so you need more of them. Multiply by $${pair.f}$.`
          : `${cap(UN[pair.big].many)} are bigger than ${UN[pair.small].many}, so you need fewer of them. Divide by $${pair.f}$.`,
        `$${nm(v)} ${toSmall ? '\\times' : '\\div'} ${pair.f} = ${nm(result)}$`,
        `So $${ms(v, from)} = ${ms(result, to)}$.`,
      ],
    };
  },
});

function withinMixed(rng: Rng, n: string) {
  const mode = rng.pick(['ftin-in', 'lboz-oz', 'in-ftin', 'oz-lboz', 'si-total', 'si-left'] as const);
  if (mode === 'ftin-in') {
    const c = rng.pick([
      { t: `${n} is`, dim: 'tall', lo: 4, hi: 6, person: true, why: 'A form at a walk-in clinic asks for height in inches.' },
      { t: 'A fridge is', dim: 'tall', lo: 5, hi: 6, why: 'The space for it in the kitchen is measured in inches.' },
      { t: 'A sofa is', dim: 'long', lo: 6, hi: 7, why: 'The moving company wants the length in inches.' },
      { t: 'The box of a pickup truck is', dim: 'long', lo: 5, hi: 8, why: 'A truck-box liner is sold by length in inches.' },
    ]);
    // People are kept between 4 ft 10 in and 6 ft 4 in tall.
    const [ft, inch] = retry(() => [rng.int(c.lo, c.hi), rng.int(1, 11)], ([f, i]) => !c.person || (f * 12 + i >= 58 && f * 12 + i <= 76));
    const total = ft * 12 + inch;
    return {
      prompt: `${c.t} $${ftin(ft, inch)}$ ${c.dim}. ${c.why} What is this length in **inches**?\n\nUse $1\\ \\text{ft} = 12\\ \\text{in}$.`,
      parts: [exact(total, 'in')],
      hints: ['Change the feet to inches first: multiply the feet by 12.', 'Then add the extra inches.'],
      solution: [`Feet to inches: $${ft} \\times 12 = ${ft * 12}\\ \\text{in}$`, `Add the extra inches: $${ft * 12} + ${inch} = ${total}$`, `So $${ftin(ft, inch)} = ${ms(total, 'in')}$.`],
    };
  }
  if (mode === 'lboz-oz') {
    const c = rng.pick([
      { t: `${n}’s new baby brother weighs`, lo: 6, hi: 9, why: 'The baby book has a space for the weight in ounces.' },
      { t: 'A turkey for a community dinner weighs', lo: 10, hi: 18, why: 'The cooking chart in a US cookbook uses ounces.' },
      { t: 'A parcel weighs', lo: 2, hi: 6, why: 'The shipping chart uses ounces.' },
      { t: 'A bag of apples weighs', lo: 2, hi: 5, why: 'A recipe asks for the amount in ounces.' },
    ]);
    const lb = rng.int(c.lo, c.hi);
    const oz = rng.int(1, 15);
    const total = lb * 16 + oz;
    return {
      prompt: `${c.t} $${lboz(lb, oz)}$. ${c.why} What is the weight in **ounces**?\n\nUse $1\\ \\text{lb} = 16\\ \\text{oz}$.`,
      parts: [exact(total, 'oz')],
      hints: ['Change the pounds to ounces first: multiply the pounds by 16.', 'Then add the extra ounces.'],
      solution: [`Pounds to ounces: $${lb} \\times 16 = ${lb * 16}\\ \\text{oz}$`, `Add the extra ounces: $${lb * 16} + ${oz} = ${total}$`, `So $${lboz(lb, oz)} = ${ms(total, 'oz')}$.`],
    };
  }
  if (mode === 'in-ftin') {
    const total = retry(() => rng.int(26, 100), (x) => x % 12 !== 0);
    const ft = Math.floor(total / 12);
    const inch = total % 12;
    const ctx = rng.pick([
      `A roll of window trim has ${M(total, 'in')} left on it.`,
      `${n} measures a window at a job site. It is ${M(total, 'in')} wide.`,
      `A hockey bag is ${M(total, 'in')} long.`,
      `A piece of countertop is ${M(total, 'in')} long.`,
    ]);
    return {
      prompt: `${ctx} Write this length in **feet and inches**.\n\nUse $1\\ \\text{ft} = 12\\ \\text{in}$.`,
      parts: [exact(ft, 'ft', 'Feet'), exact(inch, 'in', 'Inches')],
      hints: ['Find how many groups of 12 inches fit into the length. Each group is 1 foot.', 'Divide by 12. The whole number is the feet. The remainder is the inches left over.'],
      solution: [`$${total} \\div 12 = ${ft}$ with a remainder, because $${ft} \\times 12 = ${ft * 12}$.`, `Inches left over: $${total} - ${ft * 12} = ${inch}$`, `So $${ms(total, 'in')} = ${ftin(ft, inch)}$.`],
      answerDisplay: `$${ftin(ft, inch)}$`,
    };
  }
  if (mode === 'oz-lboz') {
    const total = retry(() => rng.int(20, 100), (x) => x % 16 !== 0);
    const lb = Math.floor(total / 16);
    const oz = total % 16;
    const ctx = rng.pick([
      `A bag of trail mix weighs ${M(total, 'oz')}.`,
      `A package of chicken wings weighs ${M(total, 'oz')}.`,
      `A box of granola bars weighs ${M(total, 'oz')}.`,
      `A can of coffee weighs ${M(total, 'oz')}.`,
    ]);
    return {
      prompt: `${ctx} Write this weight in **pounds and ounces**.\n\nUse $1\\ \\text{lb} = 16\\ \\text{oz}$.`,
      parts: [exact(lb, 'lb', 'Pounds'), exact(oz, 'oz', 'Ounces')],
      hints: ['Find how many groups of 16 ounces fit into the weight. Each group is 1 pound.', 'Divide by 16. The whole number is the pounds. The remainder is the ounces left over.'],
      solution: [`$${total} \\div 16 = ${lb}$ with a remainder, because $${lb} \\times 16 = ${lb * 16}$.`, `Ounces left over: $${total} - ${lb * 16} = ${oz}$`, `So $${ms(total, 'oz')} = ${lboz(lb, oz)}$.`],
      answerDisplay: `$${lboz(lb, oz)}$`,
    };
  }
  if (mode === 'si-total') {
    const c = rng.pick([
      { k: [6, 24], each: [250, 355, 500, 750], small: 'mL', big: 'L', f: 1000, text: (k: number, e: string) => `${n} is setting up drinks for a community barbecue. There are $${k}$ bottles of juice. Each bottle holds ${e}.`, ask: 'How much juice is there in total' },
      { k: [4, 20], each: [250, 400, 500, 750, 800], small: 'g', big: 'kg', f: 1000, text: (k: number, e: string) => `A warehouse worker packs $${k}$ boxes of screws into a crate. Each box has a mass of ${e}.`, ask: 'What is the total mass of the boxes' },
      { k: [3, 12], each: [45, 60, 75, 85, 120, 150], small: 'cm', big: 'm', f: 100, text: (k: number, e: string) => `${n} cuts $${k}$ pieces of pipe for a plumbing job. Each piece is ${e} long.`, ask: 'What is the total length of pipe' },
    ]);
    const k = rng.int(c.k[0], c.k[1]);
    const each = rng.pick(c.each);
    const tot = k * each;
    const res = clean(tot / c.f);
    return {
      prompt: `${c.text(k, M(each, c.small))} ${c.ask}, in **${UN[c.big].many}**?\n\nUse $1\\ ${tx(c.big)} = ${c.f}\\ ${tx(c.small)}$.`,
      parts: [exact(res, c.big)],
      hints: [`First find the total in ${UN[c.small].many}: multiply.`, `Then change ${UN[c.small].many} to ${UN[c.big].many}: divide by $${c.f}$.`],
      solution: [`Total: $${k} \\times ${each} = ${nm(tot)}\\ ${tx(c.small)}$`, `${cap(UN[c.big].many)} are bigger, so divide by $${c.f}$: $${nm(tot)} \\div ${c.f} = ${nm(res)}$`, `The total is $${ms(res, c.big)}$.`],
    };
  }
  // si-left
  const c = rng.pick([
    { start: [2, 4], each: [200, 250, 300], small: 'mL', big: 'L', f: 1000, text: (s: string, k: number, e: string) => `A jug at a child care centre holds ${s} of milk. A worker pours $${k}$ cups of milk. Each cup holds ${e}.`, left: 'milk is left in the jug' },
    { start: [10, 20], each: [75, 80, 120, 150], small: 'cm', big: 'm', f: 100, text: (s: string, k: number, e: string) => `${n} has a rope that is ${s} long. ${n} cuts off $${k}$ pieces. Each piece is ${e} long.`, left: 'rope is left' },
    { start: [5, 10], each: [250, 400, 600], small: 'g', big: 'kg', f: 1000, text: (s: string, k: number, e: string) => `A bakery has a ${s} bag of sugar. A baker uses $${k}$ scoops. Each scoop has a mass of ${e}.`, left: 'sugar is left in the bag' },
  ]);
  const made = retry(
    () => {
      const s = rng.int(c.start[0], c.start[1]);
      const e = rng.pick(c.each);
      const k = rng.int(3, 9);
      return { s, e, k, left: s * c.f - k * e };
    },
    (x) => x.left > 0,
  );
  const used = made.k * made.e;
  return {
    prompt: `${c.text(M(made.s, c.big), made.k, M(made.e, c.small))} How much ${c.left}, in **${UN[c.small].many}**?\n\nUse $1\\ ${tx(c.big)} = ${c.f}\\ ${tx(c.small)}$.`,
    parts: [exact(made.left, c.small)],
    hints: [`Change the starting amount to ${UN[c.small].many} first.`, 'Find the amount used (multiply), then subtract it from the starting amount.'],
    solution: [
      `Start: $${ms(made.s, c.big)} = ${made.s} \\times ${c.f} = ${ms(made.s * c.f, c.small)}$`,
      `Used: $${made.k} \\times ${made.e} = ${ms(used, c.small)}$`,
      `Left: $${nm(made.s * c.f)} - ${nm(used)} = ${nm(made.left)}$`,
      `There ${made.left === 1 ? 'is' : 'are'} $${ms(made.left, c.small)}$ left.`,
    ],
  };
}

// ---------------------------------------------------------------------------
// Lesson 6.2 — Converting between SI and imperial
// ---------------------------------------------------------------------------

const F_IN = '$1\\ \\text{in} = 2.54\\ \\text{cm}$';
const F_KG = '$1\\ \\text{kg} \\approx 2.2\\ \\text{lb}$';
const F_MI = '$1\\ \\text{mi} \\approx 1.6\\ \\text{km}$';
const F_GAL = '$1$ US gallon $\\approx 3.79\\ \\text{L}$';

const UNIT_WORD: Record<string, UnitInfo> = {
  ...UN,
  mi: { one: 'mile', many: 'miles' },
  gal: { one: 'US gallon', many: 'US gallons' },
  'km/h': { one: 'kilometre per hour', many: 'kilometres per hour' },
  mph: { one: 'mile per hour', many: 'miles per hour' },
};

/** A quantity in a prompt: gallons and speeds are written in words. */
function qty(x: number, u: string): string {
  if (u === 'gal') return `$${nm(x)}$ US ${x === 1 ? 'gallon' : 'gallons'}`;
  if (u === 'mph') return `$${nm(x)}$ miles per hour`;
  return M(x, u);
}
const qtyIn = (x: number, u: string) => (u === 'gal' ? `${nm(x)}\\ \\text{US gal}` : u === 'mph' ? `${nm(x)}\\ \\text{mph}` : ms(x, u));

interface Conv {
  from: string;
  to: string;
  f: number;
  mult: boolean;
  fact: string;
  /** The factor is exact (1 in = 2.54 cm), not rounded. */
  exactFactor?: boolean;
  /** Why we multiply or divide, in plain words. */
  why: string;
}

const CONV: Record<string, Conv> = {
  'in-cm': { from: 'in', to: 'cm', f: 2.54, mult: true, fact: F_IN, exactFactor: true, why: 'A centimetre is smaller than an inch, so you need more of them. Multiply by $2.54$.' },
  'cm-in': { from: 'cm', to: 'in', f: 2.54, mult: false, fact: F_IN, exactFactor: true, why: 'An inch is bigger than a centimetre, so you need fewer of them. Divide by $2.54$.' },
  'kg-lb': { from: 'kg', to: 'lb', f: 2.2, mult: true, fact: F_KG, why: 'A pound is smaller than a kilogram, so you need more of them. Multiply by $2.2$.' },
  'lb-kg': { from: 'lb', to: 'kg', f: 2.2, mult: false, fact: F_KG, why: 'A kilogram is bigger than a pound, so you need fewer of them. Divide by $2.2$.' },
  'mi-km': { from: 'mi', to: 'km', f: 1.6, mult: true, fact: F_MI, why: 'A kilometre is shorter than a mile, so you need more of them. Multiply by $1.6$.' },
  'km-mi': { from: 'km', to: 'mi', f: 1.6, mult: false, fact: F_MI, why: 'A mile is longer than a kilometre, so you need fewer of them. Divide by $1.6$.' },
  'kmh-mph': { from: 'km/h', to: 'mph', f: 1.6, mult: false, fact: F_MI, why: 'A mile is longer than a kilometre, so the number of miles per hour is smaller. Divide by $1.6$.' },
  'gal-L': { from: 'gal', to: 'L', f: 3.79, mult: true, fact: F_GAL, why: 'A litre is smaller than a US gallon, so you need more of them. Multiply by $3.79$.' },
  'L-gal': { from: 'L', to: 'gal', f: 3.79, mult: false, fact: F_GAL, why: 'A US gallon is bigger than a litre, so you need fewer of them. Divide by $3.79$.' },
};

/** Prompt, hints and solution for a one-step conversion between systems. */
function oneStep(key: string, v: number, lead: string, dp: number | null) {
  const c = CONV[key];
  const res = c.mult ? v * c.f : v / c.f;
  const exactRes = dp === null;
  /** The calculator answer has at most 3 decimals, so it is written with = rather than ≈. */
  const calcExact = Math.abs(roundTo(res, 3) - res) < 1e-9;
  const to = UNIT_WORD[c.to];
  const round = dp === 0 ? 'to the nearest whole number' : 'to the nearest tenth';
  const answerTex = exactRes ? qtyIn(clean(res), c.to) : `${nf(res, dp)}\\ ${tx(c.to === 'gal' ? 'US gal' : c.to)}`;
  return {
    prompt: `${lead} What is this in ${to.many}${exactRes ? '' : `, ${round}`}?\n\nUse ${c.fact}.`,
    parts: [exactRes ? exact(res, c.to === 'gal' ? 'US gal' : c.to) : numPart(res, { decimals: dp, suffix: c.to === 'gal' ? 'US gal' : c.to })],
    hints: [
      `Is ${an(to.one)} bigger or smaller than ${an(UNIT_WORD[c.from].one)}? A smaller unit needs a bigger number.`,
      `${c.mult ? 'Multiply' : 'Divide'} by $${nm(c.f)}$${exactRes ? '' : ', then round'}.`,
    ],
    solution: [
      `${c.fact}. ${c.why}`,
      `$${nm(v)} ${c.mult ? '\\times' : '\\div'} ${nm(c.f)} ${calcExact ? '=' : '\\approx'} ${calcExact ? nm(clean(res)) : nm(res, 3)}$`,
      exactRes ? `So ${qty(v, c.from)} is ${c.exactFactor ? '' : 'about '}$${answerTex}$.` : `Rounded ${round}, ${qty(v, c.from)} is about $${answerTex}$.`,
    ],
  };
}

const convertBetween = skill({
  id: 'm204-convert-between',
  name: 'Converting between SI and imperial',
  description: 'Convert lengths, masses, capacities and speeds between SI and imperial units using a given conversion factor, deciding whether to multiply or divide and rounding to the nearest tenth.',
  outcomes: ['SS1'],
  lessonId: 'm204-6-2',
  calculator: true,
  gen(rng, d) {
    const n = rng.pick(NAMES);
    if (d === 1) {
      const mode = rng.pick(['in-cm', 'kg-lb', 'mi-km', 'gal-L'] as const);
      if (mode === 'in-cm') {
        const c = rng.pick([
          { lo: 8, hi: 16, text: (q: string) => `${n} orders a pizza that is ${q} across.` },
          { lo: 5, hi: 20, text: (q: string) => `A picture frame from a US store is ${q} wide.` },
          { lo: 2, hi: 6, text: (q: string) => `A paintbrush is ${q} wide.` },
          { lo: 6, hi: 12, text: (q: string) => `A ruler from the United States is ${q} long.` },
        ]);
        const v = rng.int(c.lo, c.hi);
        return oneStep(mode, v, c.text(M(v, 'in')), null);
      }
      if (mode === 'kg-lb') {
        const c = rng.pick([
          { lo: 5, hi: 40, text: (q: string) => `${n}’s dog has a mass of ${q}. A US pet food website uses pounds.` },
          { lo: 2, hi: 20, text: (q: string) => `A bag of rice has a mass of ${q}.` },
          { lo: 10, hi: 25, text: (q: string) => `A suitcase has a mass of ${q}.` },
        ]);
        const v = rng.int(c.lo, c.hi);
        return oneStep(mode, v, c.text(M(v, 'kg')), null);
      }
      if (mode === 'mi-km') {
        const c = rng.pick([
          { vals: [10, 20, 25, 30, 40, 50, 60, 75], text: (q: string) => `A road sign in Montana says the next town is ${q} away.` },
          { vals: [3, 5, 10, 13], text: (q: string) => `${n} runs a race in Montana that is ${q} long.` },
          { vals: [100, 150, 200, 250, 300], text: (q: string) => `A bus trip in the United States is ${q} long.` },
        ]);
        const v = rng.pick(c.vals);
        return oneStep(mode, v, c.text(M(v, 'mi')), null);
      }
      const c = rng.pick([
        { lo: 2, hi: 6, text: (q: string) => `A US recipe for a big pot of chili makes ${q}.` },
        { lo: 3, hi: 5, text: (q: string) => `A water cooler jug at an office holds ${q}.` },
        { lo: 1, hi: 5, text: (q: string) => `A gas can from a US store holds ${q}.` },
      ]);
      const v = rng.int(c.lo, c.hi);
      return oneStep('gal-L', v, c.text(qty(v, 'gal')), null);
    }
    if (d === 2) {
      const mode = rng.pick(['cm-in', 'in-cm', 'lb-kg', 'kg-lb', 'km-mi', 'kmh-mph', 'mi-km', 'L-gal', 'gal-L'] as const);
      switch (mode) {
        case 'cm-in': {
          const c = rng.pick([
            { lo: 80, hi: 165, text: (q: string) => `A TV screen is ${q} across.` },
            { lo: 150, hi: 195, text: (q: string) => `${n} is ${q} tall. A US hockey camp lists heights in inches.` },
            { lo: 50, hi: 80, text: (q: string) => `A suitcase is ${q} tall. The airline lists its size limit in inches.` },
          ]);
          const v = retry(() => rng.int(c.lo, c.hi), (x) => clearOf(x / 2.54, 1));
          return oneStep(mode, v, c.text(M(v, 'cm')), 1);
        }
        case 'in-cm': {
          const c = rng.pick([
            { lo: 32, hi: 75, text: (q: string) => `A TV from a US store is ${q} across.` },
            { lo: 20, hi: 36, text: (q: string) => `A US-made bike has wheels that are ${q} across.` },
            { lo: 30, hi: 60, text: (q: string) => `A window in an older house is ${q} wide.` },
          ]);
          const v = rng.int(c.lo, c.hi);
          return oneStep(mode, v, c.text(M(v, 'in')), 1);
        }
        case 'lb-kg': {
          const c = rng.pick([
            { lo: 3, hi: 60, text: (q: string) => `A parcel weighs ${q}. The courier’s form uses kilograms.` },
            { lo: 3, hi: 15, text: (q: string) => `A US recipe for a community dinner uses ${q} of ground beef.` },
            { lo: 15, hi: 40, text: (q: string) => `A bag of dog food from a US store weighs ${q}.` },
          ]);
          const v = retry(() => rng.int(c.lo, c.hi), (x) => clearOf(x / 2.2, 1) && x % 11 !== 0);
          return oneStep(mode, v, c.text(M(v, 'lb')), 1);
        }
        case 'kg-lb': {
          const c = rng.pick([
            { lo: 25, hi: 45, text: (q: string) => `A newborn baby has a mass of ${q}. The grandparents in Texas use pounds.` },
            { lo: 12, hi: 98, text: (q: string) => `A parcel has a mass of ${q}. The US customs form uses pounds.` },
            { lo: 15, hi: 60, text: (q: string) => `A bag of grass seed has a mass of ${q}.` },
          ]);
          const v = retry(() => rng.int(c.lo, c.hi) / 10, (x) => !Number.isInteger(x));
          return oneStep(mode, v, c.text(M(v, 'kg')), 1);
        }
        case 'km-mi': {
          const trip = retry(
            () =>
              rng.pick([
                ['Elmwood', 'Fernhill', 145],
                ['Oakridge', 'Northgate', 460],
                ['Sandford', 'Willowdale', 165],
                ['Oakridge', 'Birchwood', 435],
                ['Elmwood', 'Willowdale', 295],
                ['Oakridge', 'Elmwood', 300],
                ['Elmwood', 'Cedar Hill', 128],
                ['Fernhill', 'Oakridge', 155],
              ] as const),
            (t) => clearOf(t[2] / 1.6, 1),
          );
          return oneStep(mode, trip[2], `The drive from ${trip[0]} to ${trip[1]} is about ${M(trip[2], 'km')}. ${n} is giving directions to a visitor from the United States, who thinks in miles.`, 1);
        }
        case 'kmh-mph': {
          const v = retry(() => rng.pick([30, 40, 50, 70, 80, 90, 110]), (x) => clearOf(x / 1.6, 0));
          const where = rng.pick(['on a highway near Lakeside', 'on a country road', 'in a school zone', 'on a northern highway', 'on a city street']);
          return oneStep(mode, v, `The speed limit ${where} is ${M(v, 'km/h')}. A driver from the United States is used to miles per hour.`, 0);
        }
        case 'mi-km': {
          const v = rng.int(12, 140);
          const town = rng.pick(['Great Falls', 'Helena', 'Missoula', 'Billings', 'Spokane']);
          return oneStep(mode, v, `${n} is driving in the United States. A road sign says ${town} is ${M(v, 'mi')} away.`, null);
        }
        case 'L-gal': {
          const c = rng.pick([
            { lo: 60, hi: 136, text: (q: string) => `A pickup truck’s gas tank holds ${q}.` },
            { lo: 150, hi: 250, text: (q: string) => `A rain barrel on a farm holds ${q}.` },
            { lo: 20, hi: 50, text: (q: string) => `A cooler at a community event holds ${q} of water.` },
          ]);
          const v = retry(() => rng.int(c.lo, c.hi), (x) => clearOf(x / 3.79, 1));
          return oneStep(mode, v, c.text(M(v, 'L')), 1);
        }
        default: {
          const v = retry(() => rng.pick([1.5, 2, 2.5, 3, 3.5, 4, 5, 6]), (x) => clearOf(x * 3.79, 1));
          const lead = rng.pick([
            `A US recipe makes ${qty(v, 'gal')} of soup for a community kitchen.`,
            `A US cleaning product comes in a pail that holds ${qty(v, 'gal')}.`,
            `A fish tank from a US store holds ${qty(v, 'gal')} of water.`,
          ]);
          return oneStep('gal-L', v, lead, 1);
        }
      }
    }
    return betweenTwoStep(rng, n);
  },
});

function betweenTwoStep(rng: Rng, n: string) {
  const mode = rng.pick(['height', 'parcel', 'fuel', 'baggage', 'speed', 'recipe'] as const);
  if (mode === 'height') {
    const made = retry(() => ({ ft: rng.int(4, 6), inch: rng.int(1, 11) }), (x) => x.ft * 12 + x.inch >= 58 && x.ft * 12 + x.inch <= 78 && clearOf((x.ft * 12 + x.inch) * 2.54, 1));
    const total = made.ft * 12 + made.inch;
    const cm = total * 2.54;
    const who = rng.pick([`${n}’s cousin from Ohio is`, 'A basketball player on a US team is', `A US hockey card says a player is`, `${n}’s pen pal in Texas is`]);
    return {
      prompt: `${who} $${ftin(made.ft, made.inch)}$ tall. What is this height in centimetres, to the nearest tenth?\n\nUse $1\\ \\text{ft} = 12\\ \\text{in}$ and ${F_IN}.`,
      parts: [numPart(cm, { decimals: 1, suffix: 'cm' })],
      hints: ['First change the height to inches: multiply the feet by 12 and add the extra inches.', 'Then multiply the inches by 2.54 to get centimetres.'],
      solution: [`Inches: $${made.ft} \\times 12 + ${made.inch} = ${total}\\ \\text{in}$`, `Centimetres: $${total} \\times 2.54 = ${nm(cm)}$`, `Rounded to the nearest tenth, the height is about $${nf(cm, 1)}\\ \\text{cm}$.`],
    };
  }
  if (mode === 'parcel') {
    const made = retry(() => ({ lb: rng.int(2, 12), oz: rng.pick([4, 8, 12]) }), (x) => clearOf((x.lb + x.oz / 16) / 2.2, 1));
    const lbs = made.lb + made.oz / 16;
    const kg = lbs / 2.2;
    const what = rng.pick(['A parcel from the United States', 'A box of tools ordered from a US store', 'A package of hockey gear from a US website']);
    return {
      prompt: `${what} weighs $${lboz(made.lb, made.oz)}$. The post office in ${rng.pick(TOWNS)} records mass in kilograms. What is the mass in kilograms, to the nearest tenth?\n\nUse $1\\ \\text{lb} = 16\\ \\text{oz}$ and ${F_KG}.`,
      parts: [numPart(kg, { decimals: 1, suffix: 'kg' })],
      hints: [`First write the weight in pounds only: $${made.oz}\\ \\text{oz}$ is $\\tfrac{${made.oz}}{16}$ of a pound.`, 'Then divide the pounds by 2.2 to get kilograms.'],
      solution: [`$${made.oz} \\div 16 = ${nm(made.oz / 16)}$, so the parcel weighs $${nm(lbs)}\\ \\text{lb}$.`, `$${nm(lbs)} \\div 2.2 \\approx ${nm(kg, 3)}$`, `Rounded to the nearest tenth, the mass is about $${nf(kg, 1)}\\ \\text{kg}$.`],
    };
  }
  if (mode === 'fuel') {
    const made = retry(
      () => ({ gal: rng.int(14, 32), price: rng.int(125, 175) / 100 }),
      (x) => clearOf(x.gal * 3.79 * x.price, 2, 0.1),
    );
    const L = clean(made.gal * 3.79);
    const cost = L * made.price;
    const veh = rng.pick(['pickup truck', 'camper van', 'SUV', 'work truck']);
    return {
      prompt: `${n} bought ${veh === 'SUV' ? 'an' : 'a'} ${veh} in Montana. Its gas tank holds ${qty(made.gal, 'gal')}. Gas in ${rng.pick(TOWNS)} costs ${cash(made.price)} per litre. How much will it cost to fill the empty tank, to the nearest cent?\n\nUse ${F_GAL}.`,
      parts: [numPart(cost, { decimals: 2, tolerance: 0.011, label: 'Cost: \\$' })],
      hints: ['First change the US gallons to litres: multiply by 3.79.', 'Then multiply the litres by the price for one litre.'],
      solution: [`Litres: $${made.gal} \\times 3.79 = ${nm(L)}\\ \\text{L}$`, `Cost: $${nm(L)} \\times ${fmtFixed(made.price, 2)} \\approx ${nm(cost, 4)}$`, `It will cost about ${cash(cost)} to fill the tank.`],
    };
  }
  if (mode === 'baggage') {
    const limit = rng.pick([20, 23, 25, 32]);
    const made = retry(
      () => rng.int(Math.round(limit * 2.2) - 12, Math.round(limit * 2.2) + 12),
      (lb) => clearOf(lb / 2.2, 1) && Math.abs(lb / 2.2 - limit) >= 0.8,
    );
    const kg = made / 2.2;
    const over = kg > limit;
    return {
      prompt: `${n} is flying home to ${rng.pick(TOWNS)}. The airline allows a checked bag of up to ${M(limit, 'kg')}. ${n}’s bathroom scale shows that the bag weighs ${M(made, 'lb')}.\n\n(a) What is the mass of the bag in kilograms, to the nearest tenth?\n\n(b) Is the bag over the limit?\n\nUse ${F_KG}.`,
      parts: [{ ...numPart(kg, { decimals: 1, suffix: 'kg' }), label: '(a)' }, { label: '(b)', answer: fixedChoice(['Yes, it is over the limit', 'No, it is not over the limit'], over ? 0 : 1) }],
      hints: ['Change pounds to kilograms: a kilogram is bigger than a pound, so divide by 2.2.', `Then compare your answer with the limit of ${M(limit, 'kg')}.`],
      solution: [
        `$${made} \\div 2.2 \\approx ${nm(kg, 3)}$, so the bag is about $${nf(kg, 1)}\\ \\text{kg}$.`,
        `Compare: $${nf(kg, 1)}\\ \\text{kg}$ is ${over ? 'more' : 'less'} than $${limit}\\ \\text{kg}$.`,
        `(a) about $${nf(kg, 1)}\\ \\text{kg}$; (b) ${over ? 'Yes, the bag is over the limit.' : 'No, the bag is not over the limit.'}`,
      ],
    };
  }
  if (mode === 'speed') {
    const mph = rng.pick([25, 35, 45, 55, 65, 70, 75, 80]);
    const kmh = clean(mph * 1.6);
    const drive = retry(() => Math.round(kmh / 10) * 10 + rng.pick([-20, -10, 10, 20]), (x) => Math.abs(x - kmh) >= 4 && x > 0);
    const under = drive <= kmh;
    return {
      prompt: `${n} is driving a car from home on a trip through ${rng.pick(['Montana', 'Idaho', 'Washington State'])}. The speed limit sign says $${mph}$ miles per hour. The car’s speedometer shows kilometres per hour.\n\n(a) What is the speed limit in km/h?\n\n(b) ${n} is driving at ${M(drive, 'km/h')}. Is that at or under the limit?\n\nUse ${F_MI}.`,
      parts: [{ ...exact(kmh, 'km/h'), label: '(a)' }, { label: '(b)', answer: fixedChoice(['Yes, at or under the limit', 'No, over the limit'], under ? 0 : 1) }],
      hints: ['Only the distance unit changes. A kilometre is shorter than a mile, so multiply by 1.6.', 'Then compare the car’s speed with your answer.'],
      solution: [`$${mph} \\times 1.6 = ${nm(kmh)}$, so the limit is $${nm(kmh)}\\ \\text{km/h}$.`, `${n} is driving at $${drive}\\ \\text{km/h}$, which is ${under ? 'less than' : 'more than'} $${nm(kmh)}\\ \\text{km/h}$.`, `(a) $${nm(kmh)}\\ \\text{km/h}$; (b) ${under ? 'Yes, it is under the limit.' : 'No, it is over the limit.'}`],
    };
  }
  // recipe: scale a US recipe, then convert pounds to kilograms
  const made = retry(
    () => ({ lb: rng.pick([0.75, 1, 1.25, 1.5, 2, 2.5]), times: rng.int(2, 6) }),
    (x) => clearOf((x.lb * x.times) / 2.2, 1),
  );
  const total = clean(made.lb * made.times);
  const kg = total / 2.2;
  const food = rng.pick(['chicken', 'ground beef', 'potatoes', 'carrots', 'pasta']);
  const serves = rng.pick([4, 6, 8]);
  return {
    prompt: `A US recipe that serves $${serves}$ people uses ${M(made.lb, 'lb')} of ${food}. ${n} is cooking for $${serves * made.times}$ people at a community supper, so the recipe is made $${made.times}$ times. How many kilograms of ${food} are needed, to the nearest tenth?\n\nUse ${F_KG}.`,
    parts: [numPart(kg, { decimals: 1, suffix: 'kg' })],
    hints: [`First find the total in pounds: multiply by $${made.times}$.`, 'Then change pounds to kilograms: divide by 2.2.'],
    solution: [`Total in pounds: $${nm(made.lb)} \\times ${made.times} = ${nm(total)}\\ \\text{lb}$`, `$${nm(total)} \\div 2.2 \\approx ${nm(kg, 3)}$`, `Rounded to the nearest tenth, ${n} needs about $${nf(kg, 1)}\\ \\text{kg}$ of ${food}.`],
  };
}

// ---------------------------------------------------------------------------
// Lesson 6.3 — Temperature
// ---------------------------------------------------------------------------

const F_FORMULA = '$F = 1.8C + 32$';
const C_FORMULA = '$C = (F - 32) \\div 1.8$';
const toF = (c: number) => 1.8 * c + 32;
const toC = (f: number) => (f - 32) / 1.8;

const REFERENT_HINT = 'Compare with temperatures you know: water freezes at $0^\\circ\\text{C}$ ($32^\\circ\\text{F}$), a room is about $20^\\circ\\text{C}$ ($68^\\circ\\text{F}$), your body is about $37^\\circ\\text{C}$ ($98.6^\\circ\\text{F}$), and water boils at $100^\\circ\\text{C}$ ($212^\\circ\\text{F}$).';

const REASONABLE: Array<{ thing: string; right: string; wrong: string[]; why: string }> = [
  { thing: 'a hot summer afternoon', right: cDeg(32), wrong: [fDeg(32), cDeg(90), cDeg(-5)], why: 'A hot day is warmer than a room ($20^\\circ\\text{C}$) but much colder than boiling water.' },
  { thing: 'a cold winter morning in a northern town', right: cDeg(-25), wrong: [cDeg(25), fDeg(60), cDeg(-80)], why: 'A cold winter morning in the north is well below freezing ($0^\\circ\\text{C}$).' },
  { thing: 'the inside of a fridge at a grocery store', right: cDeg(4), wrong: [fDeg(4), cDeg(40), cDeg(-30)], why: 'A fridge keeps food cold but just above freezing ($0^\\circ\\text{C}$).' },
  { thing: 'a walk-in freezer at a restaurant', right: cDeg(-18), wrong: [cDeg(18), fDeg(40), cDeg(-80)], why: 'A freezer must be well below the freezing point of water ($0^\\circ\\text{C}$).' },
  { thing: 'a cup of hot coffee at a coffee shop', right: cDeg(70), wrong: [fDeg(70), cDeg(7), cDeg(300)], why: 'Hot coffee is much warmer than your body ($37^\\circ\\text{C}$) but cooler than boiling water ($100^\\circ\\text{C}$).' },
  { thing: 'the water in a hotel hot tub', right: cDeg(39), wrong: [fDeg(39), cDeg(80), cDeg(15)], why: 'A hot tub is a little warmer than your body ($37^\\circ\\text{C}$).' },
  { thing: 'a comfortable classroom', right: cDeg(21), wrong: [fDeg(21), cDeg(40), cDeg(5)], why: 'Room temperature is about $20^\\circ\\text{C}$.' },
  { thing: 'a child with a fever', right: cDeg(39), wrong: [fDeg(39), cDeg(50), cDeg(30)], why: 'Normal body temperature is about $37^\\circ\\text{C}$, so a fever is a bit higher.' },
  { thing: 'a nice spring day', right: cDeg(15), wrong: [fDeg(15), cDeg(45), cDeg(-30)], why: 'A nice spring day is mild: a little cooler than a room ($20^\\circ\\text{C}$).' },
  { thing: 'oil in a deep fryer at a fast-food restaurant', right: cDeg(180), wrong: [cDeg(18), fDeg(80), cDeg(800)], why: 'Frying oil is much hotter than boiling water ($100^\\circ\\text{C}$).' },
  { thing: 'the water in a swimming pool at a recreation centre', right: cDeg(27), wrong: [fDeg(27), cDeg(70), cDeg(2)], why: 'Pool water is warmer than a room but cooler than your body.' },
  { thing: 'a hot summer day in Montana, on a US weather app', right: fDeg(90), wrong: [cDeg(90), fDeg(30), fDeg(9)], why: 'In Fahrenheit, a room is about $68^\\circ\\text{F}$ and body temperature is about $98.6^\\circ\\text{F}$, so a hot day is around $90^\\circ\\text{F}$.' },
  { thing: 'an oven baking bread, in a US recipe', right: fDeg(375), wrong: [cDeg(375), fDeg(37), fDeg(100)], why: 'Water boils at $212^\\circ\\text{F}$, and an oven for baking is much hotter than that.' },
  { thing: 'a cold winter day in Montana, on a US weather app', right: fDeg(10), wrong: [cDeg(10), fDeg(80), fDeg(-150)], why: 'Water freezes at $32^\\circ\\text{F}$, so a cold winter day is below $32^\\circ\\text{F}$.' },
];

const REFERENTS = [
  { q: 'At what temperature does water freeze?', fact: 'Water freezes at', C: 0, F: 32 },
  { q: 'At what temperature does water boil?', fact: 'Water boils at', C: 100, F: 212 },
  { q: 'What is normal body temperature?', fact: 'Normal body temperature is', C: 37, F: 98.6 },
  { q: 'What is a comfortable room temperature?', fact: 'A comfortable room is about', C: 20, F: 68 },
];

interface TempCtx {
  lo: number;
  hi: number;
  step: number;
  text: (t: string, n: string, town: string) => string;
}

const C_CTX: TempCtx[] = [
  { lo: -30, hi: 30, step: 1, text: (t, n, town) => `The forecast for ${town} tomorrow is ${t}. ${n}’s cousin in Texas uses degrees Fahrenheit.` },
  { lo: 37, hi: 40, step: 1, text: (t) => `The hot tub at a mountain hotel is set to ${t}. A guest from Ohio is used to degrees Fahrenheit.` },
  { lo: 160, hi: 230, step: 5, text: (t, n) => `${n}’s recipe says to bake at ${t}, but the oven at the restaurant shows degrees Fahrenheit.` },
  { lo: 2, hi: 5, step: 1, text: (t) => `A walk-in cooler at a grocery store is set to ${t}. The new thermostat is a US model that shows degrees Fahrenheit.` },
  { lo: -23, hi: -15, step: 1, text: (t) => `A freezer at a fast-food restaurant is set to ${t}. The new thermometer shows only degrees Fahrenheit.` },
];

const F_CTX: TempCtx[] = [
  { lo: 300, hi: 450, step: 25, text: (t) => `A US recipe says to bake at ${t}. The oven shows degrees Celsius.` },
  { lo: -10, hi: 95, step: 1, text: (t, n) => `${n}’s weather app is set to a US city. It shows ${t} in Great Falls, Montana.` },
  { lo: 34, hi: 40, step: 1, text: (t) => `A fridge made for the US market is set to ${t}.` },
  { lo: 350, hi: 375, step: 5, text: (t, n) => `${n} works at a fish-and-chips shop. The deep fryer’s manual says to heat the oil to ${t}.` },
  { lo: 78, hi: 86, step: 1, text: (t) => `A US website says a swimming pool should be about ${t}.` },
];

const valuesIn = (c: TempCtx) => Array.from({ length: Math.floor((c.hi - c.lo) / c.step) + 1 }, (_, i) => c.lo + i * c.step);

function cToFSteps(c: number): string[] {
  const f = toF(c);
  return [
    `Use ${F_FORMULA}. Multiply first, then add.`,
    `Multiply: $1.8 \\times ${br(c)} = ${nm(clean(1.8 * c))}$`,
    `Add 32: $${nm(clean(1.8 * c))} + 32 = ${nm(clean(f))}$`,
    Number.isInteger(clean(f)) ? `The temperature is $${fDeg(clean(f))}$.` : `Rounded to the nearest degree, the temperature is about $${nf(f, 0)}^\\circ\\text{F}$.`,
  ];
}

function fToCSteps(f: number): string[] {
  const c = toC(f);
  const whole = Number.isInteger(clean(c));
  return [
    `Use ${C_FORMULA}. Subtract 32 first, then divide.`,
    `Subtract 32: $${nm(f)} - 32 = ${nm(f - 32)}$`,
    `Divide by 1.8: $${br(f - 32)} \\div 1.8 ${whole ? '=' : '\\approx'} ${whole ? nm(clean(c)) : nm(c, 2)}$`,
    whole ? `The temperature is $${cDeg(clean(c))}$.` : `Rounded to the nearest degree, the temperature is about $${nf(c, 0)}^\\circ\\text{C}$.`,
  ];
}

const temperatureConvert = skill({
  id: 'm204-temperature-convert',
  name: 'Converting temperatures',
  description: 'Judge whether a temperature is reasonable, and convert between degrees Celsius and degrees Fahrenheit with F = 1.8C + 32 and C = (F − 32) ÷ 1.8, rounding to the nearest degree.',
  outcomes: ['SS1', 'PR1'],
  lessonId: 'm204-6-3',
  calculator: true,
  gen(rng, d) {
    const n = rng.pick(NAMES);
    const town = rng.pick(TOWNS);
    if (d === 1) {
      if (rng.chance(0.7)) {
        const r = rng.pick(REASONABLE);
        return {
          prompt: `Which temperature makes sense for ${r.thing}?`,
          parts: [{ answer: mc(rng, `$${r.right}$`, r.wrong.map((w) => `$${w}$`)) }],
          hints: ['First check the scale: is each temperature in °C or °F?', REFERENT_HINT],
          solution: [r.why, 'The other choices are much too hot, much too cold, or use the wrong scale.', `The temperature that makes sense is $${r.right}$.`],
          calculator: false,
        };
      }
      const r = rng.pick(REFERENTS);
      const inC = rng.chance(0.5);
      const deg = inC ? cDeg : fDeg;
      const right = `$${deg(inC ? r.C : r.F)}$`;
      const others = rng.shuffle(REFERENTS.filter((x) => x !== r)).map((x) => `$${deg(inC ? x.C : x.F)}$`);
      return {
        prompt: `${r.q} Choose the best answer.`,
        parts: [{ answer: mc(rng, right, [`$${deg(inC ? r.F : r.C)}$`, ...others]) }],
        hints: ['Each choice uses the same scale. Think about which number matches.', REFERENT_HINT],
        solution: [`${r.fact} $${cDeg(r.C)}$, which is $${fDeg(r.F)}$.`, `Be careful: $${deg(inC ? r.F : r.C)}$ is the right number on the wrong scale.`, `The answer is ${right}.`],
        calculator: false,
      };
    }
    if (d === 2) {
      if (rng.chance(0.5)) {
        const ctx = rng.pick(C_CTX);
        const c = rng.pick(valuesIn(ctx));
        const f = toF(c);
        return {
          prompt: `${ctx.text(`$${cDeg(c)}$`, n, town)} What is the temperature in degrees Fahrenheit, to the nearest degree?\n\nUse ${F_FORMULA}.`,
          parts: [numPart(f, { decimals: 0, suffix: '°F' })],
          hints: ['Multiply the Celsius temperature by 1.8 first.', 'Then add 32, and round to the nearest degree.'],
          solution: cToFSteps(c),
        };
      }
      const ctx = rng.pick(F_CTX);
      const f = retry(() => rng.pick(valuesIn(ctx)), (x) => clearOf(toC(x), 0));
      const c = toC(f);
      return {
        prompt: `${ctx.text(`$${fDeg(f)}$`, n, town)} What is the temperature in degrees Celsius, to the nearest degree?\n\nUse ${C_FORMULA}.`,
        parts: [numPart(c, { decimals: 0, suffix: '°C' })],
        hints: ['Subtract 32 from the Fahrenheit temperature first.', 'Then divide by 1.8, and round to the nearest degree.'],
        solution: fToCSteps(f),
      };
    }
    const mode = rng.pick(['safety', 'safety', 'warmWind', 'compare', 'oven'] as const);
    if (mode === 'safety') {
      const rule = rng.pick([
        { what: 'Hot food on a buffet line', rule: 'must be kept at', limit: 60, atLeast: true, lo: 120, hi: 170, q: 'Is the food hot enough?' },
        { what: 'A fridge in a restaurant kitchen', rule: 'must be at', limit: 4, atLeast: false, lo: 33, hi: 50, q: 'Is the fridge cold enough?' },
        { what: 'A freezer at a grocery store', rule: 'must be at', limit: -18, atLeast: false, lo: -12, hi: 15, q: 'Is the freezer cold enough?' },
        { what: 'Cooked chicken at a fast-food restaurant', rule: 'must reach', limit: 74, atLeast: true, lo: 150, hi: 185, q: 'Is the chicken cooked enough?' },
      ]);
      const f = retry(() => rng.int(rule.lo, rule.hi), (x) => clearOf(toC(x), 0) && Math.abs(toC(x) - rule.limit) >= 1);
      const c = toC(f);
      const rounded = Math.round(c);
      const yes = rule.atLeast ? c >= rule.limit : c <= rule.limit;
      const side = rule.atLeast ? 'or hotter' : 'or colder';
      return {
        prompt: `${rule.what} ${rule.rule} $${cDeg(rule.limit)}$ ${side}. ${n} checks it with a US thermometer that reads $${fDeg(f)}$.\n\n(a) What is the reading in degrees Celsius, to the nearest degree?\n\n(b) ${rule.q}\n\nUse ${C_FORMULA}.`,
        parts: [{ ...numPart(c, { decimals: 0, suffix: '°C' }), label: '(a)' }, { label: '(b)', answer: fixedChoice(['Yes', 'No'], yes ? 0 : 1) }],
        hints: ['Change the Fahrenheit reading to Celsius: subtract 32, then divide by 1.8.', `Then compare your answer with $${cDeg(rule.limit)}$.`],
        solution: [
          ...fToCSteps(f).slice(1, 3),
          `The reading is about $${cDeg(rounded)}$. The rule is $${cDeg(rule.limit)}$ ${side}.`,
          `(a) about $${cDeg(rounded)}$; (b) ${yes ? 'Yes' : 'No'}: $${cDeg(rounded)}$ is ${rounded > rule.limit ? 'warmer' : 'colder'} than $${cDeg(rule.limit)}$.`,
        ],
      };
    }
    if (mode === 'warmWind') {
      const made = retry(() => ({ a: rng.int(-28, -8), rise: rng.int(10, 25) }), (x) => clearOf(toF(x.a + x.rise), 0));
      const b = made.a + made.rise;
      return {
        prompt: `On a winter morning in ${rng.pick(['Hillcrest', 'Lakeside', 'Pinewood', 'Stonebridge'])}, the temperature was $${cDeg(made.a)}$. A warm wind blew in, and the temperature rose by $${made.rise}$ degrees Celsius. ${n}’s friend in Montana asks for the new temperature in degrees Fahrenheit. What is it, to the nearest degree?\n\nUse ${F_FORMULA}.`,
        parts: [numPart(toF(b), { decimals: 0, suffix: '°F' })],
        hints: ['First find the new temperature in degrees Celsius: add the rise.', 'Then change it to Fahrenheit: multiply by 1.8, then add 32.'],
        solution: [`New temperature: $${nm(made.a)} + ${made.rise} = ${cDeg(b)}$`, ...cToFSteps(b).slice(1)],
      };
    }
    if (mode === 'compare') {
      const made = retry(
        () => ({ c: rng.int(-25, 25), f: rng.int(-10, 80) }),
        (x) => Math.abs(toC(x.f) - x.c) >= 1.5 && clearOf(toC(x.f), 0),
      );
      const fc = toC(made.f);
      const usTown = rng.pick(['Great Falls, Montana', 'Spokane, Washington', 'Billings, Montana', 'Boise, Idaho']);
      const ab = rng.pick(TOWNS);
      const warmer = rng.chance(0.5);
      const abWins = warmer ? made.c > fc : made.c < fc;
      return {
        prompt: `On the same day, it is $${cDeg(made.c)}$ in ${ab} and $${fDeg(made.f)}$ in ${usTown}.\n\n(a) What is the temperature in ${usTown.split(',')[0]} in degrees Celsius, to the nearest degree?\n\n(b) Which place is ${warmer ? 'warmer' : 'colder'}?\n\nUse ${C_FORMULA}.`,
        parts: [{ ...numPart(fc, { decimals: 0, suffix: '°C' }), label: '(a)' }, { label: '(b)', answer: fixedChoice([ab, usTown.split(',')[0]], abWins ? 0 : 1) }],
        hints: ['You cannot compare the numbers until both temperatures use the same scale.', 'Change the Fahrenheit temperature to Celsius, then compare.'],
        solution: [
          ...fToCSteps(made.f).slice(1, 3),
          `Compare $${cDeg(made.c)}$ in ${ab} with about $${cDeg(Math.round(fc))}$ in ${usTown.split(',')[0]}.`,
          `(a) about $${cDeg(Math.round(fc))}$; (b) ${abWins ? ab : usTown.split(',')[0]} is ${warmer ? 'warmer' : 'colder'}.`,
        ],
      };
    }
    // oven: convert, then choose the closest dial setting (steps of 5 degrees)
    const f = rng.pick([325, 350, 375, 400, 425, 450]);
    const c = toC(f);
    const setting = Math.round(c / 5) * 5;
    // Distractors: dividing before subtracting, not converting at all, and a near miss.
    const wrongOrder = Math.round((f / 1.8 - 32) / 5) * 5;
    const opts = [setting, wrongOrder, f, setting + 10, setting - 10].map((x) => `$${cDeg(x)}$`);
    return {
      prompt: `A US recipe for ${rng.pick(['cinnamon buns', 'banana bread', 'lasagna', 'roast chicken', 'cookies'])} says to bake at $${fDeg(f)}$. The oven at ${n}’s work shows degrees Celsius, and its dial goes up in steps of $5$ degrees ($160$, $165$, $170$, …). Which setting is closest to the recipe’s temperature?\n\nUse ${C_FORMULA}.`,
      parts: [{ answer: mc(rng, opts[0], opts.slice(1)) }],
      hints: ['Change the recipe’s temperature to Celsius first: subtract 32, then divide by 1.8.', 'Then find the multiple of 5 that is closest to your answer.'],
      solution: [`Subtract 32: $${f} - 32 = ${f - 32}$`, `Divide by 1.8: $${f - 32} \\div 1.8 \\approx ${nm(c, 1)}$`, `The closest multiple of 5 is $${setting}$.`, `${n} should set the oven to $${cDeg(setting)}$.`],
    };
  },
});

export const MEASUREMENT_SKILLS: SkillDef[] = [convertWithin, convertBetween, temperatureConvert];
