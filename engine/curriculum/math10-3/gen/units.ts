/** Math 10-3 Unit 3 — SI and Imperial Units (M1, M2, A1). */
import { byDifficulty, fixedChoice, mc, numPart, retry, roundingPhrase, skill } from '../../helpers.ts';
import { fmt, fmtFixed, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const tx = (u: string) => `\\text{${u}}`;

/** Group the integer part of a numeric string with thin spaces (SI style) when it has 5 or more digits. */
function grp(s: string): string {
  const [i, f] = s.split('.');
  const neg = i.startsWith('-');
  const digits = neg ? i.slice(1) : i;
  const g = digits.length > 4 ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : digits;
  return `${neg ? '-' : ''}${g}${f !== undefined ? '.' + f : ''}`;
}

/** LaTeX number without trailing zeros. */
const nm = (x: number, dp = 4) => grp(fmt(x, dp));
/** LaTeX number rounded to exactly `dp` places. */
const nf = (x: number, dp: number) => grp(fmtFixed(x, dp));
/** A measurement for use inside maths: 12\ \text{cm}. */
const ms = (x: number, u: string, dp = 4) => `${nm(x, dp)}\\ ${tx(u)}`;
/** A measurement as inline maths: $12\ \text{cm}$. */
const M = (x: number, u: string, dp = 4) => `$${ms(x, u, dp)}$`;
const cDeg = (x: number) => `${nm(x)}^\\circ\\text{C}`;
const fDeg = (x: number) => `${nm(x)}^\\circ\\text{F}`;
/** Remove floating-point noise from an exact decimal result. */
const clean = (x: number) => roundTo(x, 9);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

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

/** True when x is safely away from a rounding boundary (…5) at `dp` places. */
function clearOf(x: number, dp: number, margin = 0.04): boolean {
  const s = Math.abs(x) * 10 ** dp;
  const f = s - Math.floor(s);
  return Math.abs(f - 0.5) > margin;
}

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Liam', 'Mei', 'Tariq', 'Sofia', 'Kwame', 'Nadia', 'Ethan',
  'Harpreet', 'Noah', 'Chloé', 'Raj', 'Leila', 'Dakota', 'Hiroshi', 'Fatima', 'Owen', 'Jasmine', 'Malik',
  'Isabelle', 'Arjun', 'Kateri', 'Diego', 'Ava', 'Tyrone', 'Simran', 'Lucas', 'Zainab', 'Émile', 'Thanh',
  'Gurpreet', 'Maya', 'Wyatt', 'Ngozi', 'Carlos', 'Anika',
];

const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater', 'Northfield', 'Elmwood'];

// ---------------------------------------------------------------------------
// Lesson 3.1 — The SI system
// ---------------------------------------------------------------------------

const W = {
  million: 'one million ($1\\,000\\,000$)',
  thousand: 'one thousand ($1000$)',
  hundred: 'one hundred ($100$)',
  ten: 'ten ($10$)',
  tenth: 'one tenth ($\\tfrac{1}{10}$)',
  hundredth: 'one hundredth ($\\tfrac{1}{100}$)',
  thousandth: 'one thousandth ($\\tfrac{1}{1000}$)',
};

const PREFIXES = [
  { p: 'kilo', core: true, meaning: W.thousand, wrong: [W.thousandth, W.hundred, W.million], units: ['kilometre', 'kilogram'], rel: '$1000$ times', fact: '$1\\ \\text{km} = 1000\\ \\text{m}$ and $1\\ \\text{kg} = 1000\\ \\text{g}$' },
  { p: 'centi', core: true, meaning: W.hundredth, wrong: [W.hundred, W.thousandth, W.tenth], units: ['centimetre'], rel: '$\\tfrac{1}{100}$ of', fact: 'it takes $100$ centimetres to make $1$ metre' },
  { p: 'milli', core: true, meaning: W.thousandth, wrong: [W.million, W.thousand, W.hundredth], units: ['millimetre', 'millilitre', 'milligram'], rel: '$\\tfrac{1}{1000}$ of', fact: 'it takes $1000$ millilitres to make $1$ litre' },
  { p: 'hecto', core: false, meaning: W.hundred, wrong: [W.hundredth, W.ten, W.thousand], units: ['hectolitre'], rel: '$100$ times', fact: '$1$ hectolitre $= 100$ litres' },
  { p: 'deca', core: false, meaning: W.ten, wrong: [W.tenth, W.hundred, W.thousand], units: ['decametre'], rel: '$10$ times', fact: '$1$ decametre $= 10$ metres' },
  { p: 'deci', core: false, meaning: W.tenth, wrong: [W.ten, W.hundredth, W.thousandth], units: ['decimetre', 'decilitre'], rel: '$\\tfrac{1}{10}$ of', fact: 'it takes $10$ decimetres to make $1$ metre' },
];

const PREFIX_PAIRS = [
  { big: 'km', bigOne: 'kilometre', small: 'm', smallOne: 'metre', smallName: 'metres', f: 1000, lvl: 1 },
  { big: 'm', bigOne: 'metre', small: 'cm', smallOne: 'centimetre', smallName: 'centimetres', f: 100, lvl: 1 },
  { big: 'm', bigOne: 'metre', small: 'mm', smallOne: 'millimetre', smallName: 'millimetres', f: 1000, lvl: 1 },
  { big: 'cm', bigOne: 'centimetre', small: 'mm', smallOne: 'millimetre', smallName: 'millimetres', f: 10, lvl: 1 },
  { big: 'kg', bigOne: 'kilogram', small: 'g', smallOne: 'gram', smallName: 'grams', f: 1000, lvl: 1 },
  { big: 'g', bigOne: 'gram', small: 'mg', smallOne: 'milligram', smallName: 'milligrams', f: 1000, lvl: 1 },
  { big: 'L', bigOne: 'litre', small: 'mL', smallOne: 'millilitre', smallName: 'millilitres', f: 1000, lvl: 1 },
  { big: 'km', bigOne: 'kilometre', small: 'cm', smallOne: 'centimetre', smallName: 'centimetres', f: 100000, lvl: 2 },
  { big: 'kg', bigOne: 'kilogram', small: 'mg', smallOne: 'milligram', smallName: 'milligrams', f: 1000000, lvl: 2 },
  { big: 'km', bigOne: 'kilometre', small: 'mm', smallOne: 'millimetre', smallName: 'millimetres', f: 1000000, lvl: 2 },
];

/** Plausible wrong powers of ten for a conversion factor. */
function powerDistractors(v: number): number[] {
  return [v * 10, v / 10, v >= 10000 ? v * 100 : 1 / v].map((x) => roundTo(x, 9));
}

const REASONABLE: Array<{ thing: string; right: string; wrong: string[] }> = [
  { thing: 'the mass of a bag of cement', right: '$40\\ \\text{kg}$', wrong: ['$40\\ \\text{g}$', '$40\\ \\text{mg}$', '$4000\\ \\text{kg}$'] },
  { thing: 'the mass of a newborn calf', right: '$40\\ \\text{kg}$', wrong: ['$40\\ \\text{g}$', '$40\\ \\text{mg}$', '$4000\\ \\text{kg}$'] },
  { thing: 'the length of a pickup truck', right: '$5.8\\ \\text{m}$', wrong: ['$5.8\\ \\text{cm}$', '$5.8\\ \\text{km}$', '$58\\ \\text{mm}$'] },
  { thing: 'the thickness of a sheet of plywood', right: '$18\\ \\text{mm}$', wrong: ['$18\\ \\text{cm}$', '$18\\ \\text{m}$', '$1.8\\ \\text{m}$'] },
  { thing: 'the capacity of a can of pop', right: '$355\\ \\text{mL}$', wrong: ['$355\\ \\text{L}$', '$3.55\\ \\text{mL}$', '$35.5\\ \\text{L}$'] },
  { thing: 'the highway distance between two cities about a 90-minute drive apart', right: '$150\\ \\text{km}$', wrong: ['$150\\ \\text{m}$', '$150\\ \\text{cm}$', '$15\\,000\\ \\text{km}$'] },
  { thing: 'the mass of the medicine in one pain-relief tablet', right: '$500\\ \\text{mg}$', wrong: ['$500\\ \\text{g}$', '$500\\ \\text{kg}$', '$5\\ \\text{kg}$'] },
  { thing: 'the height of a doorway', right: '$203\\ \\text{cm}$', wrong: ['$203\\ \\text{mm}$', '$203\\ \\text{m}$', '$2.03\\ \\text{km}$'] },
  { thing: 'the mass of a small square bale of hay', right: '$25\\ \\text{kg}$', wrong: ['$25\\ \\text{g}$', '$25\\ \\text{mg}$', '$2.5\\ \\text{g}$'] },
  { thing: 'the capacity of a home hot-water tank', right: '$180\\ \\text{L}$', wrong: ['$180\\ \\text{mL}$', '$18\\ \\text{mL}$', '$1.8\\ \\text{mL}$'] },
  { thing: 'the amount of vanilla in a batch of cookies', right: '$5\\ \\text{mL}$', wrong: ['$5\\ \\text{L}$', '$50\\ \\text{L}$', '$0.5\\ \\text{L}$'] },
  { thing: 'the width of a bolt head', right: '$13\\ \\text{mm}$', wrong: ['$13\\ \\text{cm}$', '$13\\ \\text{m}$', '$1.3\\ \\text{m}$'] },
  { thing: 'the mass of a hockey puck', right: '$170\\ \\text{g}$', wrong: ['$170\\ \\text{kg}$', '$170\\ \\text{mg}$', '$17\\ \\text{kg}$'] },
  { thing: 'the capacity of a pickup truck’s fuel tank', right: '$98\\ \\text{L}$', wrong: ['$98\\ \\text{mL}$', '$9.8\\ \\text{mL}$', '$9800\\ \\text{L}$'] },
];

const ORDER_SETS = [
  { intro: 'A carpenter has labelled four pieces of trim with these lengths:', base: 'mm', baseName: 'millimetres', units: [{ u: 'mm', f: 1 }, { u: 'cm', f: 10 }, { u: 'm', f: 1000 }], lo: 20, hi: 300, step: 10 },
  { intro: 'Four hiking trails near a mountain town have these lengths:', base: 'm', baseName: 'metres', units: [{ u: 'm', f: 1 }, { u: 'km', f: 1000 }], lo: 30, hi: 400, step: 10 },
  { intro: 'Four boxes of fasteners at a hardware store have these masses:', base: 'g', baseName: 'grams', units: [{ u: 'g', f: 1 }, { u: 'kg', f: 1000 }], lo: 8, hi: 120, step: 25 },
  { intro: 'Four containers in a restaurant kitchen hold these amounts:', base: 'mL', baseName: 'millilitres', units: [{ u: 'mL', f: 1 }, { u: 'L', f: 1000 }], lo: 3, hi: 60, step: 50 },
];

const siPrefix = skill({
  id: 'm103-si-prefix',
  name: 'SI prefixes',
  description: 'Explain what kilo, centi and milli (and hecto, deca, deci) mean, choose sensible SI units and compare measurements in mixed units.',
  outcomes: ['M1'],
  lessonId: 'm103-3-1',
  format: 'mc',
  gen(rng, d) {
    const mode = rng.pick(byDifficulty(d, ['meaning', 'howMany'] as const, ['meaning', 'howMany', 'reverse', 'reasonable', 'reasonable'] as const, ['order', 'extreme'] as const));
    if (mode === 'meaning') {
      const pre = rng.pick(PREFIXES.filter((p) => (d === 1 ? p.core : true)));
      const unit = rng.pick(pre.units);
      const baseUnit = unit.slice(pre.p.length);
      return {
        prompt: `In the unit **${unit}**, what does the prefix **${pre.p}-** mean?`,
        parts: [{ answer: mc(rng, pre.meaning, pre.wrong) }],
        hints: ['Big prefixes (kilo, hecto, deca) make the unit larger. Small prefixes (deci, centi, milli) make it smaller.', 'Remember: kilo = 1000, hecto = 100, deca = 10, deci = $\\tfrac{1}{10}$, centi = $\\tfrac{1}{100}$, milli = $\\tfrac{1}{1000}$.'],
        solution: [`Without the prefix, the unit is the ${baseUnit}. The prefix **${pre.p}-** means ${pre.rel} that unit.`, `For example, ${pre.fact}.`, `So ${pre.p}- means ${pre.meaning}.`],
      };
    }
    if (mode === 'howMany') {
      const pr = rng.pick(PREFIX_PAIRS.filter((p) => p.lvl <= d));
      return {
        prompt: `How many ${pr.smallName} are in $1\\ ${tx(pr.big)}$ (one ${pr.bigOne})?`,
        parts: [{ answer: mc(rng, `$${nm(pr.f, 8)}$`, powerDistractors(pr.f).map((x) => `$${nm(x, 8)}$`)) }],
        hints: ['Think about what each prefix means: kilo = 1000, centi = $\\tfrac{1}{100}$, milli = $\\tfrac{1}{1000}$.', `A ${pr.smallOne} is smaller than a ${pr.bigOne}, so it takes many of them to make one ${pr.bigOne}.`],
        solution:
          pr.lvl === 1
            ? [`The ${pr.smallOne} is the smaller unit, so many of them fit in one ${pr.bigOne}.`, `$1\\ ${tx(pr.big)} = ${nm(pr.f, 8)}\\ ${tx(pr.small)}$, so there are $${nm(pr.f, 8)}$ ${pr.smallName} in one ${pr.bigOne}.`]
            : pr.small === 'cm'
              ? ['$1\\ \\text{km} = 1000\\ \\text{m}$ and $1\\ \\text{m} = 100\\ \\text{cm}$.', '$1000 \\times 100 = 100\\,000$, so there are $100\\,000$ centimetres in one kilometre.']
              : pr.big === 'kg'
                ? ['$1\\ \\text{kg} = 1000\\ \\text{g}$ and $1\\ \\text{g} = 1000\\ \\text{mg}$.', '$1000 \\times 1000 = 1\\,000\\,000$, so there are $1\\,000\\,000$ milligrams in one kilogram.']
                : ['$1\\ \\text{km} = 1000\\ \\text{m}$ and $1\\ \\text{m} = 1000\\ \\text{mm}$.', '$1000 \\times 1000 = 1\\,000\\,000$, so there are $1\\,000\\,000$ millimetres in one kilometre.'],
      };
    }
    if (mode === 'reverse') {
      const pr = rng.pick(PREFIX_PAIRS.filter((p) => p.lvl === 1));
      const v = roundTo(1 / pr.f, 9);
      return {
        prompt: `Complete the statement: $1\\ ${tx(pr.small)} = \\ ?\\ ${tx(pr.big)}$`,
        parts: [{ answer: mc(rng, `$${nm(v, 8)}$`, powerDistractors(v).map((x) => `$${nm(x, 8)}$`)) }],
        hints: [`One ${pr.smallOne} is only a small part of a ${pr.bigOne}, so the answer is less than 1.`, `Since $1\\ ${tx(pr.big)} = ${nm(pr.f)}\\ ${tx(pr.small)}$, one ${pr.smallOne} is $\\tfrac{1}{${pr.f}}$ of a ${pr.bigOne}.`],
        solution: [`$1\\ ${tx(pr.big)} = ${nm(pr.f)}\\ ${tx(pr.small)}$, so $1\\ ${tx(pr.small)} = \\tfrac{1}{${pr.f}}\\ ${tx(pr.big)}$.`, `$\\tfrac{1}{${pr.f}} = ${nm(v, 8)}$, so $1\\ ${tx(pr.small)} = ${nm(v, 8)}\\ ${tx(pr.big)}$.`],
      };
    }
    if (mode === 'reasonable') {
      const r = rng.pick(REASONABLE);
      return {
        prompt: `Which is the most reasonable measurement for ${r.thing}?`,
        parts: [{ answer: mc(rng, r.right, r.wrong) }],
        hints: ['Picture the object, then picture each unit: a millimetre is the thickness of a dime, a kilogram is the mass of a litre of water, a millilitre is a few drops.', 'Check that both the number and the unit make sense together.'],
        solution: [`Compare each choice with something you know. A measurement of ${r.right} fits ${r.thing}.`, 'The other choices use the wrong prefix, so they are far too large or far too small.', `The most reasonable measurement is ${r.right}.`],
      };
    }
    // d3: ordering or greatest/least among mixed units
    const set = rng.pick(ORDER_SETS);
    const greatest = rng.chance(0.5);
    const made = retry(
      () => {
        const ks = rng.sample(Array.from({ length: set.hi - set.lo + 1 }, (_, i) => set.lo + i), 4);
        const items = ks.map((k) => {
          const v = k * set.step;
          const unit = rng.pick(set.units);
          return { v, u: unit.u, shown: roundTo(v / unit.f, 6) };
        });
        return items;
      },
      (items) => {
        if (new Set(items.map((x) => x.u)).size < 2) return false;
        const trueOrder = [...items].sort((a, b) => a.v - b.v).map((x) => x.v).join(',');
        const rawOrder = [...items].sort((a, b) => a.shown - b.shown).map((x) => x.v).join(',');
        if (mode === 'extreme') {
          const t = trueOrder.split(',');
          const r = rawOrder.split(',');
          return greatest ? t[3] !== r[3] : t[0] !== r[0];
        }
        return trueOrder !== rawOrder;
      },
    );
    const disp = (x: { shown: number; u: string }) => M(x.shown, x.u);
    const asBase = made.map((x) => (x.u === set.base ? `${disp(x)}` : `$${ms(x.shown, x.u)} = ${ms(x.v, set.base)}$`)).join(', ');
    const asc = [...made].sort((a, b) => a.v - b.v);
    if (mode === 'extreme') {
      const target = greatest ? asc[3] : asc[0];
      return {
        prompt: `${set.intro} ${made.map(disp).join(', ')}.\n\nWhich measurement is the **${greatest ? 'greatest' : 'least'}**?`,
        parts: [{ answer: mc(rng, disp(target), made.filter((x) => x !== target).map(disp)) }],
        hints: ['You cannot compare the numbers until the units are the same.', `Convert every measurement to ${set.baseName}, then compare.`],
        solution: [`Write each measurement in ${set.baseName}: ${asBase}.`, `In ${set.baseName}: $${asc.map((x) => nm(x.v)).join(' < ')}$.`, `The ${greatest ? 'greatest' : 'least'} measurement is ${disp(target)}.`],
      };
    }
    const descending = rng.chance(0.4);
    const correctList = descending ? [...asc].reverse() : asc;
    const raw = [...made].sort((a, b) => (descending ? b.shown - a.shown : a.shown - b.shown));
    const swapped = [correctList[1], correctList[0], correctList[2], correctList[3]];
    const show = (list: typeof made) => list.map(disp).join(', ');
    return {
      prompt: `${set.intro} ${made.map(disp).join(', ')}.\n\nWhich list shows them in order from **${descending ? 'greatest to least' : 'least to greatest'}**?`,
      parts: [{ answer: mc(rng, show(correctList), [show(raw), show([...correctList].reverse()), show(swapped)]) }],
      hints: ['A bigger number does not always mean a bigger measurement. Look at the units.', `Convert every measurement to ${set.baseName}, then put the numbers in order.`],
      solution: [`Write each measurement in ${set.baseName}: ${asBase}.`, `In ${set.baseName}: $${asc.map((x) => nm(x.v)).join(' < ')}$.`, `From ${descending ? 'greatest to least' : 'least to greatest'}: ${show(correctList)}.`],
    };
  },
});

interface SiUnit {
  u: string;
  name: string;
  one: string;
  f: number;
}

const SIU: Record<string, SiUnit> = {
  mm: { u: 'mm', name: 'millimetres', one: 'millimetre', f: 0.001 },
  cm: { u: 'cm', name: 'centimetres', one: 'centimetre', f: 0.01 },
  m: { u: 'm', name: 'metres', one: 'metre', f: 1 },
  km: { u: 'km', name: 'kilometres', one: 'kilometre', f: 1000 },
  mg: { u: 'mg', name: 'milligrams', one: 'milligram', f: 0.001 },
  g: { u: 'g', name: 'grams', one: 'gram', f: 1 },
  kg: { u: 'kg', name: 'kilograms', one: 'kilogram', f: 1000 },
  t: { u: 't', name: 'tonnes', one: 'tonne', f: 1000000 },
  mL: { u: 'mL', name: 'millilitres', one: 'millilitre', f: 0.001 },
  L: { u: 'L', name: 'litres', one: 'litre', f: 1 },
};

type Ctx = (q: string, n: string) => string;

interface SiPair {
  big: string;
  small: string;
  lvl: 1 | 2;
  /** d1 values in the big unit (whole numbers). */
  d1: [number, number];
  /** d2 values in the big unit: rng.int(lo, hi) / div. */
  d2: { lo: number; hi: number; div: number };
  /** d2 values in the small unit (whole numbers). */
  d2Small: [number, number, number];
  ctx: Ctx[];
}

const SI_PAIRS: SiPair[] = [
  {
    big: 'km', small: 'm', lvl: 1, d1: [2, 25], d2: { lo: 5, hi: 250, div: 10 }, d2Small: [120, 9800, 10],
    ctx: [
      (q) => `A pipeline crew has laid ${q} of pipe so far this season.`,
      (q, n) => `${n} grades ${q} of gravel road out in the country.`,
      (q) => `A new barbed-wire fence around a pasture is ${q} long.`,
      (q, n) => `${n} walks ${q} while inspecting a line of power poles.`,
    ],
  },
  {
    big: 'm', small: 'cm', lvl: 1, d1: [2, 6], d2: { lo: 35, hi: 600, div: 100 }, d2Small: [15, 600, 1],
    ctx: [
      (q, n) => `${n} cuts a piece of baseboard that is ${q} long.`,
      (q) => `A kitchen countertop is ${q} long.`,
      (q, n) => `${n} cuts a strip of vinyl flooring that is ${q} long.`,
      (q) => `A length of PVC drainpipe is ${q} long.`,
    ],
  },
  {
    big: 'cm', small: 'mm', lvl: 1, d1: [2, 30], d2: { lo: 12, hi: 450, div: 10 }, d2Small: [6, 480, 1],
    ctx: [
      (q) => `A ceramic floor tile is ${q} wide.`,
      (q, n) => `${n} cuts a piece of rebar that is ${q} long.`,
      (q) => `A shelf board is ${q} deep.`,
      (q, n) => `${n}, an auto mechanic, measures a brake rotor that is ${q} across.`,
    ],
  },
  {
    big: 'kg', small: 'g', lvl: 1, d1: [2, 20], d2: { lo: 5, hi: 250, div: 100 }, d2Small: [50, 9500, 5],
    ctx: [
      (q) => `A bakery uses a bag of flour with a mass of ${q}.`,
      (q, n) => `${n} weighs a box of drywall screws. It has a mass of ${q}.`,
      (q) => `A sack of potatoes at a grocery store has a mass of ${q}.`,
      (q, n) => `${n} buys a bag of grass seed with a mass of ${q}.`,
    ],
  },
  {
    big: 'L', small: 'mL', lvl: 1, d1: [2, 20], d2: { lo: 5, hi: 400, div: 100 }, d2Small: [50, 9500, 5],
    ctx: [
      (q) => `A can of paint holds ${q}.`,
      (q, n) => `${n} adds ${q} of engine oil to a truck.`,
      (q) => `A soup recipe at a restaurant uses ${q} of chicken stock.`,
      (q) => `A jug of windshield-washer fluid holds ${q}.`,
    ],
  },
  {
    big: 'm', small: 'mm', lvl: 2, d1: [2, 9], d2: { lo: 250, hi: 6000, div: 1000 }, d2Small: [250, 6000, 1],
    ctx: [
      (q, n) => `${n}, a welder, cuts a piece of steel tubing ${q} long.`,
      (q) => `A length of aluminum window track is ${q} long.`,
      (q, n) => `${n} cuts a piece of copper pipe ${q} long.`,
    ],
  },
  {
    big: 'g', small: 'mg', lvl: 2, d1: [2, 9], d2: { lo: 5, hi: 200, div: 100 }, d2Small: [50, 2000, 5],
    ctx: [
      (q) => `A vitamin tablet contains ${q} of vitamin C.`,
      (q, n) => `${n}, a veterinary assistant, measures a dose of ${q} of medicine for a calf.`,
      (q) => `A pharmacist measures out ${q} of a powder.`,
    ],
  },
  {
    big: 't', small: 'kg', lvl: 2, d1: [2, 30], d2: { lo: 15, hi: 400, div: 10 }, d2Small: [500, 40000, 50],
    ctx: [
      (q) => `A grain truck is carrying ${q} of canola.`,
      (q, n) => `${n} loads ${q} of gravel into a dump truck.`,
      (q) => `A load of hay bales on a flatbed trailer has a mass of ${q}.`,
    ],
  },
];

const ASKS = [(to: SiUnit) => `How many ${to.name} is that?`, (to: SiUnit) => `Convert this measurement to ${to.name}.`, (to: SiUnit) => `What is this measurement in ${to.name}?`];

const siConvert = skill({
  id: 'm103-si-convert',
  name: 'Converting SI units',
  description: 'Convert between SI units of length, mass and capacity, and add or subtract measurements given in mixed units.',
  outcomes: ['M1'],
  lessonId: 'm103-3-1',
  gen(rng, d) {
    const n = rng.pick(NAMES);
    if (d === 3) return siConvertMixed(rng, n);
    const pair = rng.pick(SI_PAIRS.filter((p) => p.lvl <= d));
    const big = SIU[pair.big];
    const small = SIU[pair.small];
    const factor = Math.round(big.f / small.f);
    const toSmall = rng.chance(0.5);
    let v: number;
    if (toSmall) {
      v = d === 1 ? rng.int(...pair.d1) : retry(() => rng.int(pair.d2.lo, pair.d2.hi) / pair.d2.div, (x) => !Number.isInteger(x));
    } else {
      const [lo, hi, step] = pair.d2Small;
      v = d === 1 ? rng.int(...pair.d1) * factor : retry(() => rng.int(Math.ceil(lo / step), Math.floor(hi / step)) * step, (x) => x % factor !== 0);
    }
    v = clean(v);
    const from = toSmall ? big : small;
    const to = toSmall ? small : big;
    const result = clean(toSmall ? v * factor : v / factor);
    const q = M(v, from.u);
    return {
      prompt: `${rng.pick(pair.ctx)(q, n)} ${rng.pick(ASKS)(to)}`,
      parts: [exact(result, to.u)],
      hints: [
        `Is a ${to.one} bigger or smaller than a ${from.one}? A smaller unit needs a bigger number.`,
        `Use $1\\ ${tx(big.u)} = ${nm(factor)}\\ ${tx(small.u)}$, then ${toSmall ? 'multiply' : 'divide'} by $${nm(factor)}$.`,
      ],
      solution: [
        `$1\\ ${tx(big.u)} = ${nm(factor)}\\ ${tx(small.u)}$.`,
        toSmall
          ? `${cap(small.name)} are smaller than ${big.name}, so the number gets bigger: multiply by $${nm(factor)}$.`
          : `${cap(big.name)} are bigger than ${small.name}, so the number gets smaller: divide by $${nm(factor)}$.`,
        `$${nm(v)} ${toSmall ? '\\times' : '\\div'} ${nm(factor)} = ${nm(result)}$`,
        `So $${ms(v, from.u)} = ${ms(result, to.u)}$.`,
      ],
    };
  },
});

function siConvertMixed(rng: Rng, n: string) {
  const kind = rng.pick(['board', 'liquids', 'jug', 'parcel'] as const);
  if (kind === 'board') {
    const made = retry(
      () => {
        const aCm = rng.int(6, 15) * 10;
        const bCm = rng.int(30, 95);
        const cMm = rng.int(15, 60) * 10;
        const used = aCm + bCm + cMm / 10;
        const board = [2.4, 3, 3.6, 4.8].find((b) => b * 100 >= used + 20);
        return { aCm, bCm, cMm, used, board };
      },
      (x) => x.board !== undefined,
    );
    const board = made.board ?? 4.8;
    const left = clean(board * 100 - made.used);
    return {
      prompt: `${n} has a board that is ${M(board, 'm')} long. ${n} cuts off pieces that are ${M(made.aCm / 100, 'm')}, ${M(made.bCm, 'cm')} and ${M(made.cMm, 'mm')} long. Ignoring the width of the saw cuts, how much of the board is left, in **centimetres**?`,
      parts: [exact(left, 'cm')],
      hints: ['You can only add or subtract measurements that are in the same unit.', 'Change every length to centimetres first: $1\\ \\text{m} = 100\\ \\text{cm}$ and $10\\ \\text{mm} = 1\\ \\text{cm}$.'],
      solution: [
        `Board: $${ms(board, 'm')} = ${ms(board * 100, 'cm')}$.`,
        `Pieces: $${ms(made.aCm / 100, 'm')} = ${ms(made.aCm, 'cm')}$, $${ms(made.bCm, 'cm')}$, and $${ms(made.cMm, 'mm')} = ${ms(made.cMm / 10, 'cm')}$.`,
        `Total cut: $${nm(made.aCm)} + ${nm(made.bCm)} + ${nm(made.cMm / 10)} = ${nm(made.used)}\\ \\text{cm}$.`,
        `Left over: $${nm(board * 100)} - ${nm(made.used)} = ${nm(left)}\\ \\text{cm}$.`,
      ],
    };
  }
  if (kind === 'liquids') {
    const a = rng.int(10, 30) / 10;
    const b = rng.int(5, 18) * 50;
    const c = rng.int(5, 20) * 25;
    const total = clean(a + (b + c) / 1000);
    return {
      prompt: `${n} is making a big pot of soup at a restaurant. The recipe uses ${M(a, 'L')} of stock, ${M(b, 'mL')} of water and ${M(c, 'mL')} of cream. What is the total amount of liquid, in **litres**?`,
      parts: [exact(total, 'L')],
      hints: ['Change the millilitre amounts to litres (or everything to millilitres) before adding.', '$1000\\ \\text{mL} = 1\\ \\text{L}$, so divide millilitres by 1000 to get litres.'],
      solution: [
        `$${ms(b, 'mL')} = ${ms(b / 1000, 'L')}$ and $${ms(c, 'mL')} = ${ms(c / 1000, 'L')}$.`,
        `$${nm(a)} + ${nm(b / 1000)} + ${nm(c / 1000)} = ${nm(total)}$`,
        `The total amount of liquid is $${ms(total, 'L')}$.`,
      ],
    };
  }
  if (kind === 'jug') {
    const jug = rng.pick([3, 4, 5]);
    const each = rng.pick([350, 450, 500, 650, 750, 800]);
    const count = rng.int(2, Math.floor((jug * 1000 - 100) / each));
    const left = jug * 1000 - count * each;
    return {
      prompt: `A jug holds ${M(jug, 'L')} of windshield-washer fluid. ${n} fills $${count}$ spray bottles that each hold ${M(each, 'mL')}. How much fluid is left in the jug, in **millilitres**?`,
      parts: [exact(left, 'mL')],
      hints: ['Write the jug’s capacity in millilitres first.', `$1\\ \\text{L} = 1000\\ \\text{mL}$. Then subtract the fluid used: $${count} \\times ${each}\\ \\text{mL}$.`],
      solution: [
        `Jug: $${ms(jug, 'L')} = ${ms(jug * 1000, 'mL')}$.`,
        `Fluid used: $${count} \\times ${each} = ${nm(count * each)}\\ \\text{mL}$.`,
        `Left: $${nm(jug * 1000)} - ${nm(count * each)} = ${nm(left)}\\ \\text{mL}$.`,
      ],
    };
  }
  const tool = rng.int(12, 48) / 10;
  const screws = rng.int(25, 95) * 10;
  const tape = rng.int(15, 60) * 10;
  const total = clean(tool + (screws + tape) / 1000);
  return {
    prompt: `${n} ships a parcel to a job site. It contains a drill with a mass of ${M(tool, 'kg')}, a box of screws with a mass of ${M(screws, 'g')} and a tape measure with a mass of ${M(tape, 'g')}. What is the total mass, in **kilograms**?`,
    parts: [exact(total, 'kg')],
    hints: ['Change the gram amounts to kilograms before adding.', '$1000\\ \\text{g} = 1\\ \\text{kg}$, so divide grams by 1000.'],
    solution: [
      `$${ms(screws, 'g')} = ${ms(screws / 1000, 'kg')}$ and $${ms(tape, 'g')} = ${ms(tape / 1000, 'kg')}$.`,
      `$${nm(tool)} + ${nm(screws / 1000)} + ${nm(tape / 1000)} = ${nm(total)}$`,
      `The total mass is $${ms(total, 'kg')}$.`,
    ],
  };
}

const CM3 = '\\text{cm}^3';
const M3 = '\\text{m}^3';
const CM2 = '\\text{cm}^2';
const M2 = '\\text{m}^2';
const MM2 = '\\text{mm}^2';
const mu = (x: number, unitTex: string) => `${nm(x)}\\ ${unitTex}`;
const VOL_FACTS = '$1\\ \\text{cm}^3 = 1\\ \\text{mL}$, $1000\\ \\text{cm}^3 = 1\\ \\text{L}$ and $1\\ \\text{m}^3 = 1000\\ \\text{L}$';

const siCapacityVolume = skill({
  id: 'm103-si-capacity-volume',
  name: 'Volume, capacity and area units',
  description: 'Use 1 cm³ = 1 mL, 1000 cm³ = 1 L, 1 m³ = 1000 L and 1 m² = 10 000 cm² to convert between volume, capacity and area units.',
  outcomes: ['M1'],
  lessonId: 'm103-3-1',
  calculator: true,
  gen(rng, d) {
    const n = rng.pick(NAMES);
    const mode = rng.pick(byDifficulty(d, ['cm3mL', 'Lcm3', 'm3L', 'm2cm2'] as const, ['box', 'box', 'cm3L', 'm3Ldec', 'area'] as const, ['trough', 'depth', 'tiles', 'concrete'] as const));
    const hintsVol = ['Capacity (mL, L) and volume (cm³, m³) are linked: one cubic centimetre holds exactly one millilitre.', `Use ${VOL_FACTS}.`];
    switch (mode) {
      case 'cm3mL': {
        const v = rng.int(5, 95) * 10;
        const thing = rng.pick(['A plastic food-storage container', 'A coffee mug', 'A measuring scoop in a bakery', 'A small oil can']);
        return {
          prompt: `${thing} has an inside volume of $${mu(v, CM3)}$. What is its capacity in millilitres?`,
          parts: [exact(v, 'mL')],
          hints: hintsVol,
          solution: [`$1\\ ${CM3}$ holds exactly $1\\ \\text{mL}$, so the number does not change.`, `$${mu(v, CM3)} = ${ms(v, 'mL')}$.`],
        };
      }
      case 'Lcm3': {
        const v = rng.int(2, 20);
        const thing = rng.pick(['A pail holds', 'A cooler holds', 'A jerry can holds', 'A bucket of drywall mud holds']);
        return {
          prompt: `${thing} ${M(v, 'L')} of water. What is the volume of the water in cubic centimetres?`,
          parts: [exact(v * 1000, 'cm³')],
          hints: hintsVol,
          solution: [`$1\\ \\text{L} = 1000\\ \\text{mL} = 1000\\ ${CM3}$.`, `$${v} \\times 1000 = ${nm(v * 1000)}$, so the volume is $${mu(v * 1000, CM3)}$.`],
        };
      }
      case 'm3L': {
        const v = rng.int(1, 12);
        const thing = rng.pick(['A water tank on a farm truck', 'A septic holding tank', 'A rain-water cistern', 'A fuel tank at a farm yard']);
        return {
          prompt: `${thing} has a volume of $${mu(v, M3)}$. How many litres does it hold when full?`,
          parts: [exact(v * 1000, 'L')],
          hints: hintsVol,
          solution: [`$1\\ ${M3} = 1000\\ \\text{L}$.`, `$${v} \\times 1000 = ${nm(v * 1000)}$, so it holds $${ms(v * 1000, 'L')}$.`],
        };
      }
      case 'm2cm2': {
        const v = rng.int(2, 9);
        const thing = rng.pick(['A workbench top', 'A sheet of metal for a duct', 'A section of countertop', 'A tarp']);
        return {
          prompt: `${thing} has an area of $${mu(v, M2)}$. What is this area in square centimetres?`,
          parts: [exact(v * 10000, 'cm²')],
          hints: ['A square that is $1\\ \\text{m}$ on each side is $100\\ \\text{cm}$ on each side.', `So $1\\ ${M2} = 100 \\times 100 = 10\\,000\\ ${CM2}$.`],
          solution: [`$1\\ ${M2} = 100\\ \\text{cm} \\times 100\\ \\text{cm} = 10\\,000\\ ${CM2}$.`, `$${v} \\times 10\\,000 = ${nm(v * 10000)}$, so the area is $${mu(v * 10000, CM2)}$.`],
        };
      }
      case 'box': {
        const l = rng.int(4, 12) * 5;
        const w = rng.int(2, 8) * 5;
        const h = rng.int(2, 8) * 5;
        const vol = l * w * h;
        const L = clean(vol / 1000);
        const thing = rng.pick(['a cooler', 'a fish tank', 'a storage bin', 'a planter box', 'a parts-washing tub']);
        return {
          prompt: `The inside of ${thing} is a rectangular box ${M(l, 'cm')} long, ${M(w, 'cm')} wide and ${M(h, 'cm')} deep. How many litres does it hold when full?`,
          parts: [exact(L, 'L')],
          hints: ['Find the volume in cubic centimetres with $V = l \\times w \\times h$.', 'Then use $1000\\ \\text{cm}^3 = 1\\ \\text{L}$: divide by 1000.'],
          solution: [`$V = ${l} \\times ${w} \\times ${h} = ${mu(vol, CM3)}$`, `$${mu(vol, CM3)} = ${ms(vol, 'mL')}$`, `$${nm(vol)} \\div 1000 = ${nm(L)}$, so it holds $${ms(L, 'L')}$.`],
        };
      }
      case 'cm3L': {
        const toL = rng.chance(0.5);
        if (toL) {
          const v = retry(() => rng.int(3, 99) * 50, (x) => x % 1000 !== 0);
          const thing = rng.pick(['A glass jar', 'A bottle of hand soap', 'A container of motor oil', 'A pitcher']);
          return {
            prompt: `${thing} has a volume of $${mu(v, CM3)}$. What is its capacity in litres?`,
            parts: [exact(v / 1000, 'L')],
            hints: hintsVol,
            solution: [`$${mu(v, CM3)} = ${ms(v, 'mL')}$.`, `$${nm(v)} \\div 1000 = ${nm(v / 1000)}$, so the capacity is $${ms(v / 1000, 'L')}$.`],
          };
        }
        const v = retry(() => rng.int(5, 95) / 20, (x) => !Number.isInteger(x));
        const thing = rng.pick(['A pitcher', 'A camping water jug', 'A bottle of coolant', 'A jug of milk']);
        return {
          prompt: `${thing} holds ${M(v, 'L')}. What is this volume in cubic centimetres?`,
          parts: [exact(v * 1000, 'cm³')],
          hints: hintsVol,
          solution: [`$1\\ \\text{L} = 1000\\ ${CM3}$.`, `$${nm(v)} \\times 1000 = ${nm(v * 1000)}$, so the volume is $${mu(v * 1000, CM3)}$.`],
        };
      }
      case 'm3Ldec': {
        if (rng.chance(0.5)) {
          const v = retry(() => rng.int(12, 95) / 10, (x) => !Number.isInteger(x));
          return {
            prompt: `A ${rng.pick(['water truck', 'swimming-pool filter tank', 'liquid-fertilizer tank', 'fire-department tanker'])} holds $${mu(v, M3)}$ of liquid. How many litres is that?`,
            parts: [exact(v * 1000, 'L')],
            hints: hintsVol,
            solution: [`$1\\ ${M3} = 1000\\ \\text{L}$.`, `$${nm(v)} \\times 1000 = ${nm(v * 1000)}$, so it holds $${ms(v * 1000, 'L')}$.`],
          };
        }
        const v = retry(() => rng.int(12, 95) * 100, (x) => x % 1000 !== 0);
        return {
          prompt: `A ${rng.pick(['hot tub', 'stock-watering tank', 'backyard pond', 'cistern'])} holds ${M(v, 'L')} of water. What is this volume in cubic metres?`,
          parts: [exact(v / 1000, 'm³')],
          hints: hintsVol,
          solution: [`$1000\\ \\text{L} = 1\\ ${M3}$.`, `$${nm(v)} \\div 1000 = ${nm(v / 1000)}$, so the volume is $${mu(v / 1000, M3)}$.`],
        };
      }
      case 'area': {
        const which = rng.pick(['m2-cm2', 'cm2-m2', 'cm2-mm2'] as const);
        if (which === 'm2-cm2') {
          const v = retry(() => rng.int(15, 95) / 10, (x) => !Number.isInteger(x));
          return {
            prompt: `A ${rng.pick(['sheet of plywood', 'piece of vinyl flooring', 'solar panel', 'glass tabletop'])} has an area of $${mu(v, M2)}$. What is its area in square centimetres?`,
            parts: [exact(v * 10000, 'cm²')],
            hints: ['A square metre is $100\\ \\text{cm}$ by $100\\ \\text{cm}$.', `So $1\\ ${M2} = 10\\,000\\ ${CM2}$: multiply by $10\\,000$.`],
            solution: [`$1\\ ${M2} = 100 \\times 100 = 10\\,000\\ ${CM2}$.`, `$${nm(v)} \\times 10\\,000 = ${nm(v * 10000)}$, so the area is $${mu(v * 10000, CM2)}$.`],
          };
        }
        if (which === 'cm2-m2') {
          const v = retry(() => rng.int(12, 95) * 1000, (x) => x % 10000 !== 0);
          return {
            prompt: `A ${rng.pick(['window', 'cutting board for a deli', 'piece of sheet metal', 'poster for a store'])} has an area of $${mu(v, CM2)}$. What is its area in square metres?`,
            parts: [exact(v / 10000, 'm²')],
            hints: ['A square metre is $100\\ \\text{cm}$ by $100\\ \\text{cm}$.', `So $10\\,000\\ ${CM2} = 1\\ ${M2}$: divide by $10\\,000$.`],
            solution: [`$1\\ ${M2} = 100 \\times 100 = 10\\,000\\ ${CM2}$.`, `$${nm(v)} \\div 10\\,000 = ${nm(v / 10000)}$, so the area is $${mu(v / 10000, M2)}$.`],
          };
        }
        const v = rng.int(4, 60);
        return {
          prompt: `The face of a ${rng.pick(['bolt head', 'computer chip', 'stamp', 'washer'])} has an area of $${mu(v, CM2)}$. What is this area in square millimetres?`,
          parts: [exact(v * 100, 'mm²')],
          hints: ['A square centimetre is $10\\ \\text{mm}$ by $10\\ \\text{mm}$.', `So $1\\ ${CM2} = 100\\ ${MM2}$: multiply by $100$.`],
          solution: [`$1\\ ${CM2} = 10 \\times 10 = 100\\ ${MM2}$.`, `$${v} \\times 100 = ${nm(v * 100)}$, so the area is $${mu(v * 100, MM2)}$.`],
        };
      }
      case 'trough': {
        const l = rng.int(12, 36) / 10;
        const w = rng.int(8, 18) * 5;
        const h = rng.int(6, 16) * 5;
        const vol = clean(l * 100 * w * h);
        const L = clean(vol / 1000);
        return {
          prompt: `A rectangular water trough for cattle is ${M(l, 'm')} long, ${M(w, 'cm')} wide and ${M(h, 'cm')} deep (inside). How many litres of water does it hold when full?`,
          parts: [exact(L, 'L')],
          hints: ['All three dimensions must be in the same unit before you multiply. Change the length to centimetres.', 'Find the volume in cm³, then divide by 1000 to get litres.'],
          solution: [
            `$${ms(l, 'm')} = ${ms(l * 100, 'cm')}$`,
            `$V = ${nm(l * 100)} \\times ${w} \\times ${h} = ${mu(vol, CM3)}$`,
            `$${nm(vol)} \\div 1000 = ${nm(L)}$, so the trough holds $${ms(L, 'L')}$.`,
          ],
        };
      }
      case 'depth': {
        const l = rng.pick([40, 50, 60, 80, 90, 100]);
        const w = rng.pick([20, 25, 30, 40, 50]);
        const h = rng.int(12, 45);
        const L = clean((l * w * h) / 1000);
        return {
          prompt: `${n} is filling a rectangular aquarium whose base is ${M(l, 'cm')} long and ${M(w, 'cm')} wide. After pouring in ${M(L, 'L')} of water, how deep is the water, in centimetres?`,
          parts: [exact(h, 'cm')],
          hints: ['Change the litres to cubic centimetres: $1\\ \\text{L} = 1000\\ \\text{cm}^3$.', 'Rearrange $V = l \\times w \\times h$ to get $h = \\dfrac{V}{l \\times w}$.'],
          solution: [
            `$${ms(L, 'L')} = ${nm(L)} \\times 1000 = ${mu(l * w * h, CM3)}$`,
            `$V = l \\times w \\times h$, so $h = \\dfrac{V}{l \\times w}$.`,
            `$h = \\dfrac{${nm(l * w * h)}}{${l} \\times ${w}} = \\dfrac{${nm(l * w * h)}}{${nm(l * w)}} = ${h}$`,
            `The water is $${ms(h, 'cm')}$ deep.`,
          ],
        };
      }
      case 'tiles': {
        const s = rng.pick([20, 25, 30, 40, 50]);
        const nx = rng.int(8, 16);
        const ny = rng.int(6, 12);
        const L = clean((nx * s) / 100);
        const Wd = clean((ny * s) / 100);
        const areaM2 = clean(L * Wd);
        const areaCm2 = nx * s * ny * s;
        return {
          prompt: `${n} is tiling a rectangular floor that is ${M(L, 'm')} long and ${M(Wd, 'm')} wide. Each square tile is ${M(s, 'cm')} by ${M(s, 'cm')}. How many tiles are needed to cover the floor exactly (no waste)?`,
          parts: [exact(nx * ny, 'tiles')],
          hints: ['Find the floor area and the area of one tile in the same square unit.', `$1\\ ${M2} = 10\\,000\\ ${CM2}$. Divide the floor area by the tile area.`],
          solution: [
            `Floor area: $${nm(L)} \\times ${nm(Wd)} = ${mu(areaM2, M2)}$`,
            `In square centimetres: $${nm(areaM2)} \\times 10\\,000 = ${mu(areaCm2, CM2)}$`,
            `One tile: $${s} \\times ${s} = ${mu(s * s, CM2)}$`,
            `Number of tiles: $${nm(areaCm2)} \\div ${nm(s * s)} = ${nx * ny}$ tiles.`,
          ],
        };
      }
      default: {
        const l = rng.int(3, 8);
        const w = rng.int(2, 6);
        const t = rng.pick([10, 12, 15, 20]);
        const vol = clean((l * w * t) / 100);
        return {
          prompt: `${n} is pouring a concrete pad for a shed. The pad is ${M(l, 'm')} long, ${M(w, 'm')} wide and ${M(t, 'cm')} thick. Concrete is ordered in cubic metres. What volume of concrete is needed?`,
          parts: [exact(vol, 'm³')],
          hints: ['All three measurements must be in metres before you multiply.', `$${ms(t, 'cm')} = ${ms(t / 100, 'm')}$. Then use $V = l \\times w \\times h$.`],
          solution: [`$${ms(t, 'cm')} = ${t} \\div 100 = ${ms(t / 100, 'm')}$`, `$V = ${l} \\times ${w} \\times ${nm(t / 100)} = ${nm(vol)}$`, `The pad needs $${mu(vol, M3)}$ of concrete.`],
        };
      }
    }
  },
});

// ---------------------------------------------------------------------------
// Lesson 3.2 — The imperial system
// ---------------------------------------------------------------------------

const LEN_FACTS = '$12\\ \\text{in} = 1\\ \\text{ft}$, $3\\ \\text{ft} = 1\\ \\text{yd}$, $36\\ \\text{in} = 1\\ \\text{yd}$, $5280\\ \\text{ft} = 1\\ \\text{mi}$ and $1760\\ \\text{yd} = 1\\ \\text{mi}$';
const ftin = (ft: number, inch: number) => `${ft}\\ \\text{ft}\\ ${inch}\\ \\text{in}`;

const LEN_CTX: Ctx[] = [
  (q) => `A length of baseboard is ${q} long.`,
  (q, n) => `${n} buys a length of copper pipe that is ${q} long.`,
  (q) => `A garden hose is ${q} long.`,
  (q, n) => `${n} unrolls ${q} of electrical wire.`,
  (q) => `A strip of weatherstripping is ${q} long.`,
  (q) => `A chain for a tow truck is ${q} long.`,
];

const impLength = skill({
  id: 'm103-imp-length',
  name: 'Imperial units of length',
  description: 'Convert between inches, feet, yards and miles, including measurements in mixed units such as 5 ft 7 in.',
  outcomes: ['M2'],
  lessonId: 'm103-3-2',
  calculator: true,
  gen(rng, d) {
    const n = rng.pick(NAMES);
    const mode = rng.pick(byDifficulty(d, ['ft-in', 'in-ft', 'yd-ft', 'ft-yd'] as const, ['ftin-in', 'in-ftin', 'yd-in', 'mi-ft', 'ftdec-in'] as const, ['sum', 'leftover', 'fence'] as const));
    const hints = (method: string) => [LEN_FACTS, method];
    switch (mode) {
      case 'ft-in': {
        const ft = rng.int(2, 16);
        return {
          prompt: `${rng.pick(LEN_CTX)(M(ft, 'ft'), n)} How many inches is that?`,
          parts: [exact(ft * 12, 'in')],
          hints: hints('Inches are smaller than feet, so multiply by 12.'),
          solution: [`$1\\ \\text{ft} = 12\\ \\text{in}$`, `$${ft} \\times 12 = ${ft * 12}$, so the length is $${ms(ft * 12, 'in')}$.`],
        };
      }
      case 'in-ft': {
        const ft = rng.int(2, 16);
        return {
          prompt: `${rng.pick(LEN_CTX)(M(ft * 12, 'in'), n)} How many feet is that?`,
          parts: [exact(ft, 'ft')],
          hints: hints('Feet are bigger than inches, so divide by 12.'),
          solution: [`$12\\ \\text{in} = 1\\ \\text{ft}$`, `$${ft * 12} \\div 12 = ${ft}$, so the length is $${ms(ft, 'ft')}$.`],
        };
      }
      case 'yd-ft': {
        const yd = rng.int(2, 30);
        return {
          prompt: `${rng.pick([`A roll of landscape fabric is ${M(yd, 'yd')} long.`, `${n} buys ${M(yd, 'yd')} of canvas for a truck tarp.`, `A sports field is ${M(yd, 'yd')} wide.`, `A rope for a construction crane is ${M(yd, 'yd')} long.`])} How many feet is that?`,
          parts: [exact(yd * 3, 'ft')],
          hints: hints('Feet are smaller than yards, so multiply by 3.'),
          solution: [`$1\\ \\text{yd} = 3\\ \\text{ft}$`, `$${yd} \\times 3 = ${yd * 3}$, so the length is $${ms(yd * 3, 'ft')}$.`],
        };
      }
      case 'ft-yd': {
        const yd = rng.int(2, 30);
        return {
          prompt: `${rng.pick(LEN_CTX)(M(yd * 3, 'ft'), n)} How many yards is that?`,
          parts: [exact(yd, 'yd')],
          hints: hints('Yards are bigger than feet, so divide by 3.'),
          solution: [`$3\\ \\text{ft} = 1\\ \\text{yd}$`, `$${yd * 3} \\div 3 = ${yd}$, so the length is $${ms(yd, 'yd')}$.`],
        };
      }
      case 'ftin-in': {
        const thing = rng.pick([
          { t: 'A doorway is', dim: 'tall', lo: 6, hi: 7 },
          { t: 'The box of a pickup truck is', dim: 'long', lo: 5, hi: 8 },
          { t: 'A kitchen island is', dim: 'long', lo: 4, hi: 9 },
          { t: 'A refrigerator is', dim: 'tall', lo: 5, hi: 6 },
          { t: 'A utility trailer is', dim: 'wide', lo: 4, hi: 7 },
          { t: 'A basement window is', dim: 'wide', lo: 2, hi: 4 },
        ]);
        const ft = rng.int(thing.lo, thing.hi);
        const inch = rng.int(1, 11);
        const total = ft * 12 + inch;
        return {
          prompt: `${thing.t} $${ftin(ft, inch)}$ ${thing.dim}. What is this measurement in inches?`,
          parts: [exact(total, 'in')],
          hints: hints('Change the feet to inches, then add the extra inches.'),
          solution: [`$${ft}\\ \\text{ft} = ${ft} \\times 12 = ${ft * 12}\\ \\text{in}$`, `$${ft * 12} + ${inch} = ${total}$, so the measurement is $${ms(total, 'in')}$.`],
        };
      }
      case 'in-ftin': {
        const total = retry(() => rng.int(25, 150), (x) => x % 12 !== 0);
        const ft = Math.floor(total / 12);
        const inch = total % 12;
        return {
          prompt: `${rng.pick(LEN_CTX)(M(total, 'in'), n)} Write this length in feet and inches.`,
          parts: [exact(ft, 'ft'), exact(inch, 'in')],
          hints: hints('Divide by 12. The whole-number answer is the feet; the remainder is the inches left over.'),
          solution: [`$${total} \\div 12 = ${ft}$ remainder $${inch}$ (because $${ft} \\times 12 = ${ft * 12}$ and $${total} - ${ft * 12} = ${inch}$).`, `So $${ms(total, 'in')} = ${ftin(ft, inch)}$.`],
          answerDisplay: `$${ftin(ft, inch)}$`,
        };
      }
      case 'yd-in': {
        const yd = rng.int(2, 9);
        return {
          prompt: `${n} buys ${M(yd, 'yd')} of fabric to reupholster the seats of a boat. How many inches of fabric is that?`,
          parts: [exact(yd * 36, 'in')],
          hints: hints('One yard is 3 feet and each foot is 12 inches, so $1\\ \\text{yd} = 36\\ \\text{in}$.'),
          solution: [`$1\\ \\text{yd} = 3 \\times 12 = 36\\ \\text{in}$`, `$${yd} \\times 36 = ${yd * 36}$, so that is $${ms(yd * 36, 'in')}$ of fabric.`],
        };
      }
      case 'mi-ft': {
        const mi = rng.pick([0.25, 0.5, 0.75, 1.5, 2, 2.5, 3]);
        const toYd = rng.chance(0.4);
        const per = toYd ? 1760 : 5280;
        const u = toYd ? 'yd' : 'ft';
        return {
          prompt: `${rng.pick([`A gravel lease road is ${M(mi, 'mi')} long.`, `A truck driver backs along a ${M(mi, 'mi')} access road.`, `A horse-riding trail is ${M(mi, 'mi')} long.`, `A section of irrigation canal is ${M(mi, 'mi')} long.`])} How many ${toYd ? 'yards' : 'feet'} is that?`,
          parts: [exact(mi * per, u)],
          hints: hints(`Use $1\\ \\text{mi} = ${per}\\ ${tx(u)}$ and multiply.`),
          solution: [`$1\\ \\text{mi} = ${per}\\ ${tx(u)}$`, `$${nm(mi)} \\times ${per} = ${nm(mi * per)}$, so the length is $${ms(mi * per, u)}$.`],
        };
      }
      case 'ftdec-in': {
        const ft = rng.pick([1.5, 2.5, 3.5, 4.5, 2.25, 3.25, 1.75, 5.75, 6.5]);
        return {
          prompt: `${n} needs a piece of pipe ${M(ft, 'ft')} long, but the tape measure is easier to read in inches. How many inches long is the piece?`,
          parts: [exact(ft * 12, 'in')],
          hints: hints('Multiply the number of feet (decimal and all) by 12.'),
          solution: [`$1\\ \\text{ft} = 12\\ \\text{in}$`, `$${nm(ft)} \\times 12 = ${nm(ft * 12)}$, so the piece is $${ms(ft * 12, 'in')}$ long.`],
        };
      }
      case 'sum': {
        const pieces = Array.from({ length: 3 }, () => [rng.int(1, 6), rng.int(1, 11)] as [number, number]);
        const totalIn = pieces.reduce((s, [f, i]) => s + f * 12 + i, 0);
        const sumFt = pieces.reduce((s, [f]) => s + f, 0);
        const sumIn = pieces.reduce((s, [, i]) => s + i, 0);
        const ft = Math.floor(totalIn / 12);
        const inch = totalIn % 12;
        return {
          prompt: `${n} is installing trim and needs three pieces: $${pieces.map(([f, i]) => ftin(f, i)).join('$, $')}$. What is the total length of trim? Give your answer in feet and inches (with fewer than 12 inches).`,
          parts: [exact(ft, 'ft'), exact(inch, 'in')],
          hints: ['Add the feet and the inches separately.', 'If you get 12 inches or more, trade every 12 inches for 1 foot.'],
          solution: [
            `Feet: $${pieces.map(([f]) => f).join(' + ')} = ${sumFt}\\ \\text{ft}$. Inches: $${pieces.map(([, i]) => i).join(' + ')} = ${sumIn}\\ \\text{in}$.`,
            sumIn >= 12 ? `$${sumIn}\\ \\text{in} = ${Math.floor(sumIn / 12)}\\ \\text{ft}\\ ${sumIn % 12}\\ \\text{in}$, so add $${Math.floor(sumIn / 12)}$ to the feet.` : 'The inches are already fewer than 12.',
            `The total is $${ftin(ft, inch)}$.`,
          ],
          answerDisplay: `$${ftin(ft, inch)}$`,
        };
      }
      case 'leftover': {
        const made = retry(
          () => {
            const board = rng.pick([8, 10, 12, 14, 16]);
            const a: [number, number] = [rng.int(2, 5), rng.int(1, 11)];
            const b: [number, number] = [rng.int(1, 4), rng.int(1, 11)];
            const left = board * 12 - (a[0] * 12 + a[1]) - (b[0] * 12 + b[1]);
            return { board, a, b, left };
          },
          (x) => x.left >= 6 && x.left % 12 !== 0,
        );
        const used = made.a[0] * 12 + made.a[1] + made.b[0] * 12 + made.b[1];
        const ft = Math.floor(made.left / 12);
        const inch = made.left % 12;
        return {
          prompt: `${n} cuts two pieces, $${ftin(...made.a)}$ and $${ftin(...made.b)}$, from a board that is ${M(made.board, 'ft')} long. Ignoring the width of the saw cuts, how much of the board is left? Give your answer in feet and inches.`,
          parts: [exact(ft, 'ft'), exact(inch, 'in')],
          hints: ['Change everything to inches so you can subtract easily.', 'Subtract, then divide the answer by 12: the quotient is feet and the remainder is inches.'],
          solution: [
            `Board: $${made.board} \\times 12 = ${made.board * 12}\\ \\text{in}$. Pieces: $${made.a[0] * 12 + made.a[1]}\\ \\text{in}$ and $${made.b[0] * 12 + made.b[1]}\\ \\text{in}$.`,
            `Left: $${made.board * 12} - ${used} = ${made.left}\\ \\text{in}$`,
            `$${made.left} \\div 12 = ${ft}$ remainder $${inch}$, so $${ftin(ft, inch)}$ is left.`,
          ],
          answerDisplay: `$${ftin(ft, inch)}$`,
        };
      }
      default: {
        const a = rng.int(15, 60);
        const b = rng.int(10, 40);
        const per = 2 * (a + b) * 3;
        return {
          prompt: `A rancher wants to fence a rectangular corral that is ${M(a, 'yd')} long and ${M(b, 'yd')} wide. The fencing is sold by the foot. How many feet of fencing go all the way around the corral?`,
          parts: [exact(per, 'ft')],
          hints: ['Find the distance around the rectangle (the perimeter) in yards first.', 'Then change yards to feet: $1\\ \\text{yd} = 3\\ \\text{ft}$.'],
          solution: [`Perimeter: $2(${a} + ${b}) = ${2 * (a + b)}\\ \\text{yd}$`, `$${2 * (a + b)} \\times 3 = ${per}$`, `The rancher needs $${ms(per, 'ft')}$ of fencing.`],
        };
      }
    }
  },
});

const MASS_FACTS = '$16\\ \\text{oz} = 1\\ \\text{lb}$ and $2000\\ \\text{lb} = 1$ ton (a short ton)';
const US_CAP_FACTS = 'US units: $1\\ \\text{gal} = 4\\ \\text{qt}$, $1\\ \\text{qt} = 2\\ \\text{pt}$, $1\\ \\text{pt} = 2$ cups and $1$ cup $= 8\\ \\text{fl oz}$';
const lboz = (lb: number, oz: number) => `${lb}\\ \\text{lb}\\ ${oz}\\ \\text{oz}`;

const US_CAP = [
  { u: 'gal', name: 'gallons', one: 'gallon', floz: 128 },
  { u: 'qt', name: 'quarts', one: 'quart', floz: 32 },
  { u: 'pt', name: 'pints', one: 'pint', floz: 16 },
  { u: 'cups', name: 'cups', one: 'cup', floz: 8 },
  { u: 'fl oz', name: 'fluid ounces', one: 'fluid ounce', floz: 1 },
];
const usQ = (x: number, u: string) => (u === 'cups' ? `$${nm(x)}$ ${x === 1 ? 'cup' : 'cups'}` : `$${nm(x)}\\ \\text{${u}}$`);

const impMassCapacity = skill({
  id: 'm103-imp-mass-capacity',
  name: 'Imperial units of mass and capacity',
  description: 'Convert between ounces, pounds and tons, and between US gallons, quarts, pints, cups and fluid ounces.',
  outcomes: ['M2'],
  lessonId: 'm103-3-2',
  calculator: true,
  gen(rng, d) {
    const n = rng.pick(NAMES);
    const mode = rng.pick(byDifficulty(d, ['lb-oz', 'oz-lb', 'ton-lb', 'cap-step', 'cap-step'] as const, ['lboz-oz', 'oz-lboz', 'cap-multi', 'cap-multi', 'ton-dec'] as const, ['servings', 'bags', 'patties', 'recipe'] as const));
    switch (mode) {
      case 'lb-oz': {
        const lb = rng.int(2, 12);
        return {
          prompt: `${rng.pick([`A bag of potatoes has a mass of ${M(lb, 'lb')}.`, `${n} buys a ${lb}-pound ($${lb}\\ \\text{lb}$) bag of dog food.`, `A box of nails weighs ${M(lb, 'lb')}.`, `A roast at a butcher shop weighs ${M(lb, 'lb')}.`])} How many ounces is that?`,
          parts: [exact(lb * 16, 'oz')],
          hints: [MASS_FACTS, 'Ounces are smaller than pounds, so multiply by 16.'],
          solution: [`$1\\ \\text{lb} = 16\\ \\text{oz}$`, `$${lb} \\times 16 = ${lb * 16}$, so that is $${ms(lb * 16, 'oz')}$.`],
        };
      }
      case 'oz-lb': {
        const lb = rng.int(2, 10);
        return {
          prompt: `${rng.pick([`A bag of shredded cheese for a pizza shop holds ${M(lb * 16, 'oz')}.`, `A package of ground beef is labelled ${M(lb * 16, 'oz')}.`, `A bag of bird seed holds ${M(lb * 16, 'oz')}.`])} How many pounds is that?`,
          parts: [exact(lb, 'lb')],
          hints: [MASS_FACTS, 'Pounds are bigger than ounces, so divide by 16.'],
          solution: [`$16\\ \\text{oz} = 1\\ \\text{lb}$`, `$${lb * 16} \\div 16 = ${lb}$, so that is $${ms(lb, 'lb')}$.`],
        };
      }
      case 'ton-lb': {
        const t = rng.int(2, 20);
        return {
          prompt: `${rng.pick([`A US trucking company hauls a load of ${t} tons (short tons) of gravel.`, `A rancher buys ${t} tons (short tons) of hay from a US supplier.`, `A US-made front-end loader can lift ${t} tons (short tons).`])} How many pounds is that?`,
          parts: [exact(t * 2000, 'lb')],
          hints: [MASS_FACTS, 'Pounds are smaller than tons, so multiply by 2000.'],
          solution: ['$1$ ton $= 2000\\ \\text{lb}$', `$${t} \\times 2000 = ${nm(t * 2000)}$, so that is $${ms(t * 2000, 'lb')}$.`],
        };
      }
      case 'cap-step': {
        const i = rng.int(0, 3);
        const big = US_CAP[i];
        const small = US_CAP[i + 1];
        const f = big.floz / small.floz;
        const v = rng.int(2, 12);
        const down = rng.chance(0.6);
        const from = down ? big : small;
        const to = down ? small : big;
        const given = down ? v : v * f;
        const result = down ? v * f : v;
        return {
          prompt: `A cook has ${usQ(given, from.u)} of ${rng.pick(['milk', 'broth', 'cream', 'juice', 'water'])} (US units). How many US ${to.name} is that?`,
          parts: [exact(result, to.u)],
          hints: [US_CAP_FACTS, down ? `${cap(to.name)} are smaller than ${from.name}, so multiply.` : `${cap(to.name)} are bigger than ${from.name}, so divide.`],
          solution: [`$1$ ${big.one} $= ${f}$ ${small.name}.`, `$${nm(given)} ${down ? '\\times' : '\\div'} ${f} = ${nm(result)}$, so that is ${usQ(result, to.u)}.`],
        };
      }
      case 'lboz-oz': {
        const item = rng.pick([
          { t: 'A turkey', lo: 10, hi: 24 },
          { t: 'A newborn baby', lo: 5, hi: 9 },
          { t: 'A bag of apples', lo: 2, hi: 10 },
          { t: 'A package of chicken', lo: 2, hi: 8 },
          { t: 'A brisket', lo: 8, hi: 16 },
        ]);
        const lb = rng.int(item.lo, item.hi);
        const oz = rng.int(1, 15);
        const thing = item.t;
        return {
          prompt: `${thing} weighs $${lboz(lb, oz)}$. What is the mass in ounces?`,
          parts: [exact(lb * 16 + oz, 'oz')],
          hints: [MASS_FACTS, 'Change the pounds to ounces, then add the extra ounces.'],
          solution: [`$${lb}\\ \\text{lb} = ${lb} \\times 16 = ${lb * 16}\\ \\text{oz}$`, `$${lb * 16} + ${oz} = ${lb * 16 + oz}$, so the mass is $${ms(lb * 16 + oz, 'oz')}$.`],
        };
      }
      case 'oz-lboz': {
        const total = retry(() => rng.int(20, 300), (x) => x % 16 !== 0);
        const lb = Math.floor(total / 16);
        const oz = total % 16;
        return {
          prompt: `${n} weighs a parcel on a postal scale that reads ${M(total, 'oz')}. Write this mass in pounds and ounces.`,
          parts: [exact(lb, 'lb'), exact(oz, 'oz')],
          hints: [MASS_FACTS, 'Divide by 16. The quotient is pounds; the remainder is ounces.'],
          solution: [`$${total} \\div 16 = ${lb}$ remainder $${oz}$ (because $${lb} \\times 16 = ${lb * 16}$).`, `So the parcel weighs $${lboz(lb, oz)}$.`],
          answerDisplay: `$${lboz(lb, oz)}$`,
        };
      }
      case 'cap-multi': {
        const combos: Array<[number, number]> = [[0, 3], [0, 2], [1, 3], [0, 4], [1, 4], [2, 4]];
        const [i, j] = rng.pick(combos);
        const big = US_CAP[i];
        const small = US_CAP[j];
        const f = big.floz / small.floz;
        const down = rng.chance(0.6);
        const v = rng.int(2, 9);
        const given = down ? v : v * f;
        const result = down ? v * f : v;
        const from = down ? big : small;
        const to = down ? small : big;
        const chain = US_CAP.slice(i, j + 1);
        const chainText = chain.slice(0, -1).map((c, k) => `$1$ ${c.one} $= ${c.floz / chain[k + 1].floz}$ ${chain[k + 1].name}`).join(', ');
        return {
          prompt: `${rng.pick([`A school cafeteria in the United States buys ${usQ(given, from.u)} of milk.`, `A recipe from a US website makes ${usQ(given, from.u)} of lemonade.`, `${n} mixes ${usQ(given, from.u)} of a cleaning solution (US units).`])} How many US ${to.name} is that?`,
          parts: [exact(result, to.u)],
          hints: [US_CAP_FACTS, `First find how many ${small.name} are in one ${big.one}.`],
          solution: [chainText + '.', `So $1$ ${big.one} $= ${f}$ ${small.name}.`, `$${nm(given)} ${down ? '\\times' : '\\div'} ${f} = ${nm(result)}$, so that is ${usQ(result, to.u)}.`],
        };
      }
      case 'ton-dec': {
        if (rng.chance(0.5)) {
          const t = rng.pick([0.5, 1.5, 2.5, 3.5, 0.25, 0.75, 1.25]);
          return {
            prompt: `A pickup truck from a US maker is rated to carry ${nm(t)} ${t > 1 ? 'tons' : 'ton'} (short ${t > 1 ? 'tons' : 'ton'}). How many pounds is that?`,
            parts: [exact(t * 2000, 'lb')],
            hints: [MASS_FACTS, 'Multiply the number of tons by 2000.'],
            solution: ['$1$ ton $= 2000\\ \\text{lb}$', `$${nm(t)} \\times 2000 = ${nm(t * 2000)}$, so it can carry $${ms(t * 2000, 'lb')}$.`],
          };
        }
        const lb = retry(() => rng.int(3, 30) * 500, (x) => x % 2000 !== 0);
        return {
          prompt: `A US scale ticket shows that a load of scrap metal weighs ${M(lb, 'lb')}. How many tons (short tons) is that?`,
          parts: [exact(lb / 2000, 'tons')],
          hints: [MASS_FACTS, 'Tons are bigger than pounds, so divide by 2000.'],
          solution: ['$2000\\ \\text{lb} = 1$ ton', `$${nm(lb)} \\div 2000 = ${nm(lb / 2000)}$, so the load is $${nm(lb / 2000)}$ tons.`],
        };
      }
      case 'servings': {
        const gal = rng.int(2, 6);
        const glass = rng.pick([8, 12, 16]);
        const total = gal * 128;
        const count = Math.floor(total / glass);
        const rem = total - count * glass;
        return {
          prompt: `${n} makes ${usQ(gal, 'gal')} of punch for a community hall supper. Each glass holds ${usQ(glass, 'fl oz')} (US units). How many full glasses can be poured?`,
          parts: [exact(count, 'glasses')],
          hints: ['Change the gallons to fluid ounces: $1\\ \\text{gal} = 128\\ \\text{fl oz}$ (US).', 'Divide by the size of one glass. Only count full glasses.'],
          solution: [`$${gal} \\times 128 = ${total}\\ \\text{fl oz}$`, `$${total} \\div ${glass} = ${nm(total / glass)}$`, rem ? `Only whole glasses count, so ${n} can pour $${count}$ full glasses.` : `${n} can pour $${count}$ full glasses.`],
        };
      }
      case 'bags': {
        const combos: Array<[number, number]> = [[1, 40], [1, 50], [1.5, 50], [1.5, 40], [2, 50], [2, 40], [2, 80], [2.5, 50], [2.5, 40], [3, 50], [3, 40], [3, 80], [0.5, 40], [0.5, 50]];
        const [t, bag] = rng.pick(combos);
        const lb = t * 2000;
        return {
          prompt: `A feed store sells livestock feed in ${bag}-pound ($${bag}\\ \\text{lb}$) bags. A rancher orders ${nm(t)} ${t > 1 ? 'tons' : 'ton'} (short ${t > 1 ? 'tons' : 'ton'}) of feed. How many bags is that?`,
          parts: [exact(lb / bag, 'bags')],
          hints: [MASS_FACTS, 'Change the tons to pounds, then divide by the mass of one bag.'],
          solution: [`$${nm(t)} \\times 2000 = ${nm(lb)}\\ \\text{lb}$`, `$${nm(lb)} \\div ${bag} = ${nm(lb / bag)}$`, `The rancher orders $${nm(lb / bag)}$ bags.`],
        };
      }
      case 'patties': {
        const lb = rng.int(5, 20);
        const oz = rng.int(0, 15);
        const patty = rng.pick([4, 5, 6, 8]);
        const total = lb * 16 + oz;
        const count = Math.floor(total / patty);
        return {
          prompt: `A cook at a diner has $${lboz(lb, oz)}$ of ground beef and makes burger patties of ${M(patty, 'oz')} each. How many full patties can the cook make?`,
          parts: [exact(count, 'patties')],
          hints: [MASS_FACTS, 'Change the whole mass to ounces, then divide by the mass of one patty. Only count full patties.'],
          solution: [`$${lb} \\times 16 + ${oz} = ${total}\\ \\text{oz}$`, `$${total} \\div ${patty} = ${nm(total / patty, 2)}${Number.isInteger(total / patty) ? '' : '\\ldots'}$`, `The cook can make $${count}$ full patties.`],
        };
      }
      default: {
        const qt = rng.int(1, 3);
        const pt = rng.int(1, 3);
        const cups = rng.int(1, 3);
        const batches = rng.int(2, 4);
        const per = qt * 4 + pt * 2 + cups;
        return {
          prompt: `A US recipe for chili uses ${usQ(qt, 'qt')} of tomato juice, ${usQ(pt, 'pt')} of broth and ${usQ(cups, 'cups')} of water for one batch. ${n} makes $${batches}$ batches. How many cups of liquid is that in total (US units)?`,
          parts: [exact(per * batches, 'cups')],
          hints: [US_CAP_FACTS, 'Change each amount to cups and add to find the liquid for one batch. Then multiply by the number of batches.'],
          solution: [`$${qt}\\ \\text{qt} = ${qt} \\times 4 = ${qt * 4}$ cups and $${pt}\\ \\text{pt} = ${pt} \\times 2 = ${pt * 2}$ cups.`, `One batch: $${qt * 4} + ${pt * 2} + ${cups} = ${per}$ cups.`, `$${per} \\times ${batches} = ${per * batches}$, so the total is $${per * batches}$ cups.`],
        };
      }
    }
  },
});

const GAL_FACTS = '$1$ US gallon $\\approx 3.785\\ \\text{L}$ and $1$ imperial (British) gallon $\\approx 4.546\\ \\text{L}$';
const IMP_FACTS = 'Imperial (British) units: $1$ gallon $= 4$ quarts $= 8$ pints, and $1$ pint $= 20$ imperial fluid ounces, so $1$ imperial gallon $= 160$ imperial fluid ounces';

const usUkCapacity = skill({
  id: 'm103-us-uk-capacity',
  name: 'US and imperial capacity',
  description: 'Compare US and British imperial gallons, quarts, pints and fluid ounces and convert between them.',
  outcomes: ['M2'],
  lessonId: 'm103-3-2',
  calculator: true,
  gen(rng, d) {
    const n = rng.pick(NAMES);
    const mode = rng.pick(byDifficulty(d, ['larger', 'imp-count', 'gal-L', 'gal-L'] as const, ['diff-L', 'imp-us', 'pint-mL'] as const, ['sprayer', 'tanks', 'pint-diff'] as const));
    switch (mode) {
      case 'larger': {
        const unit = rng.pick(['gallon', 'quart', 'pint', 'fluid ounce']);
        const usFirst = rng.chance(0.5);
        const us = `$1$ US ${unit}`;
        const imp = `$1$ imperial (British) ${unit}`;
        const usBigger = unit === 'fluid ounce';
        const opts = usFirst ? [us, imp] : [imp, us];
        const correct = usBigger === usFirst ? 0 : 1;
        const data =
          unit === 'fluid ounce'
            ? ['$1$ US fluid ounce $\\approx 29.57\\ \\text{mL}$', '$1$ imperial fluid ounce $\\approx 28.41\\ \\text{mL}$']
            : unit === 'gallon'
              ? ['$1$ US gallon $\\approx 3.785\\ \\text{L}$', '$1$ imperial gallon $\\approx 4.546\\ \\text{L}$']
              : unit === 'quart'
                ? ['$1$ US quart $= \\tfrac14$ US gallon $\\approx 0.946\\ \\text{L}$', '$1$ imperial quart $= \\tfrac14$ imperial gallon $\\approx 1.137\\ \\text{L}$']
                : ['$1$ US pint $= \\tfrac18$ US gallon $\\approx 473\\ \\text{mL}$', '$1$ imperial pint $= \\tfrac18$ imperial gallon $\\approx 568\\ \\text{mL}$'];
        return {
          prompt: `Which holds more: ${opts[0]} or ${opts[1]}?${unit === 'fluid ounce' ? ' (Use $1$ US fl oz $\\approx 29.57\\ \\text{mL}$ and $1$ imperial fl oz $\\approx 28.41\\ \\text{mL}$.)' : ''}`,
          parts: [{ answer: fixedChoice([...opts, 'They hold the same amount'], correct) }],
          hints: [`The US and imperial systems use the same names for different sizes. ${GAL_FACTS}.`, 'Compare the sizes in millilitres or litres.'],
          solution: [`${data[0]}, while ${data[1]}.`, usBigger ? 'The US fluid ounce is slightly larger, even though the US gallon is smaller (a US gallon has only 128 fl oz, while an imperial gallon has 160).' : `The imperial ${unit} is larger, because the imperial gallon is larger and each is split up the same way.`, `So ${usBigger ? us : imp} holds more.`],
        };
      }
      case 'imp-count': {
        const kind = rng.pick(['pt-floz', 'gal-floz', 'gal-pt', 'qt-pt'] as const);
        const v = rng.int(2, kind === 'gal-floz' ? 6 : 12);
        const spec = {
          'pt-floz': { from: 'pints', to: 'fluid ounces', f: 20, why: '$1$ imperial pint $= 20$ imperial fl oz' },
          'gal-floz': { from: 'gallons', to: 'fluid ounces', f: 160, why: '$1$ imperial gallon $= 160$ imperial fl oz' },
          'gal-pt': { from: 'gallons', to: 'pints', f: 8, why: '$1$ imperial gallon $= 8$ imperial pints' },
          'qt-pt': { from: 'quarts', to: 'pints', f: 2, why: '$1$ imperial quart $= 2$ imperial pints' },
        }[kind];
        return {
          prompt: `A recipe from a British cookbook uses $${v}$ imperial ${spec.from} of stock. How many imperial ${spec.to} is that?\n\n${IMP_FACTS}.`,
          parts: [exact(v * spec.f, spec.to === 'pints' ? 'pt' : 'fl oz')],
          hints: ['Use the imperial facts given in the question, not the US ones.', `${spec.why}, so multiply by $${spec.f}$.`],
          solution: [`${spec.why}.`, `$${v} \\times ${spec.f} = ${v * spec.f}$, so the recipe uses $${v * spec.f}$ imperial ${spec.to}.`],
        };
      }
      case 'gal-L': {
        const usUnit = rng.chance(0.5);
        const f = usUnit ? 3.785 : 4.546;
        const v = retry(() => rng.int(2, 20), (x) => clearOf(x * f, 1));
        const L = clean(v * f);
        const what = usUnit
          ? rng.pick([`A US fuel can holds $${v}$ US gallons.`, `An American recipe for a fundraiser makes $${v}$ US gallons of chili.`, `A pail of hydraulic oil from a US supplier holds $${v}$ US gallons.`])
          : rng.pick([`An old British tractor’s fuel tank holds $${v}$ imperial gallons.`, `A boat built in England has a water tank that holds $${v}$ imperial gallons.`, `A recipe from a British brewery uses $${v}$ imperial gallons of water.`]);
        return {
          prompt: `${what} How many litres is that, ${roundingPhrase(1)}?\n\nUse ${usUnit ? '$1$ US gallon $\\approx 3.785\\ \\text{L}$' : '$1$ imperial gallon $\\approx 4.546\\ \\text{L}$'}.`,
          parts: [numPart(L, { decimals: 1, suffix: 'L' })],
          hints: ['Check which kind of gallon is used: US or imperial.', `Multiply the number of gallons by $${f}$, then round.`],
          solution: [`$1$ ${usUnit ? 'US' : 'imperial'} gallon $\\approx ${f}\\ \\text{L}$`, `$${v} \\times ${f} = ${nm(L)}$`, `Rounded ${roundingPhrase(1)}, that is about $${nf(L, 1)}\\ \\text{L}$.`],
        };
      }
      case 'diff-L': {
        const v = retry(() => rng.int(2, 30), (x) => clearOf(x * 0.761, 1));
        const diff = clean(v * 0.761);
        return {
          prompt: `${n} fills one container with $${v}$ US gallons of water and another with $${v}$ imperial gallons. How many more litres are in the imperial container, ${roundingPhrase(1)}?\n\nUse ${GAL_FACTS}.`,
          parts: [numPart(diff, { decimals: 1, suffix: 'L' })],
          hints: ['Change each amount to litres, then subtract.', `Or find the difference for one gallon first: $4.546 - 3.785$.`],
          solution: [`$${v} \\times 4.546 = ${nm(v * 4.546)}\\ \\text{L}$ and $${v} \\times 3.785 = ${nm(v * 3.785)}\\ \\text{L}$.`, `$${nm(v * 4.546)} - ${nm(v * 3.785)} = ${nm(diff)}$`, `The imperial container holds about $${nf(diff, 1)}\\ \\text{L}$ more.`],
        };
      }
      case 'imp-us': {
        const toUs = rng.chance(0.5);
        const made = retry(
          () => {
            const v = rng.int(5, 60);
            const L = v * (toUs ? 4.546 : 3.785);
            const res = L / (toUs ? 3.785 : 4.546);
            return { v, L, res };
          },
          (x) => clearOf(x.res, 1),
        );
        return {
          prompt: toUs
            ? `A fishing boat built in Scotland has a fuel tank that holds $${made.v}$ imperial gallons. ${n} will fill it from a pump marked in US gallons. How many US gallons will the tank hold, ${roundingPhrase(1)}?\n\nUse ${GAL_FACTS}.`
            : `A US repair manual says a truck’s cooling system holds $${made.v}$ US gallons. ${n}’s old measuring jug is marked in imperial gallons. How many imperial gallons is that, ${roundingPhrase(1)}?\n\nUse ${GAL_FACTS}.`,
          parts: [numPart(made.res, { decimals: 1, suffix: 'gal' })],
          hints: ['Change the gallons to litres first.', `Then divide the litres by the size of the other gallon (${toUs ? '3.785 L' : '4.546 L'}).`],
          solution: [
            `$${made.v} \\times ${toUs ? 4.546 : 3.785} = ${nm(made.L)}\\ \\text{L}$`,
            `$${nm(made.L)} \\div ${toUs ? 3.785 : 4.546} \\approx ${nm(made.res, 3)}$`,
            `That is about $${nf(made.res, 1)}$ ${toUs ? 'US' : 'imperial'} gallons.`,
          ],
        };
      }
      case 'pint-mL': {
        const made = retry(
          () => {
            const pt = rng.pick([0.5, 1, 1.5, 2, 2.5, 3, 4]);
            const mL = pt * 20 * 28.41;
            return { pt, mL };
          },
          (x) => clearOf(x.mL, 0),
        );
        return {
          prompt: `A recipe from a British cookbook calls for $${nm(made.pt)}$ imperial ${made.pt === 1 ? 'pint' : 'pints'} of milk. How many millilitres is that, ${roundingPhrase(0)}?\n\nUse $1$ imperial pint $= 20$ imperial fl oz and $1$ imperial fl oz $\\approx 28.41\\ \\text{mL}$.`,
          parts: [numPart(made.mL, { decimals: 0, suffix: 'mL' })],
          hints: ['Change the pints to imperial fluid ounces first.', 'Then multiply by 28.41 mL for each fluid ounce.'],
          solution: [`$${nm(made.pt)} \\times 20 = ${nm(made.pt * 20)}$ imperial fl oz`, `$${nm(made.pt * 20)} \\times 28.41 = ${nm(made.mL)}$`, `That is about $${nf(made.mL, 0)}\\ \\text{mL}$ of milk.`],
        };
      }
      case 'sprayer': {
        const made = retry(
          () => {
            const tank = rng.pick([30, 40, 50, 60, 80, 100]);
            const rate = rng.pick([1, 1.5, 2, 2.5, 3]);
            const L = tank * 4.546;
            const usGal = L / 3.785;
            const oz = usGal * rate;
            return { tank, rate, L, usGal, oz };
          },
          (x) => clearOf(x.oz, 0),
        );
        return {
          prompt: `${n}’s British-made sprayer has a tank that holds $${made.tank}$ imperial gallons of water. A herbicide label (in US units) says to mix $${nm(made.rate)}$ US fl oz of herbicide into each US gallon of water. How many US fluid ounces of herbicide are needed for a full tank, ${roundingPhrase(0)}?\n\nUse ${GAL_FACTS}.`,
          parts: [numPart(made.oz, { decimals: 0, suffix: 'fl oz' })],
          hints: ['The tank is measured in imperial gallons but the label uses US gallons. Change the tank size to litres, then to US gallons.', 'Multiply the number of US gallons by the amount of herbicide per US gallon.'],
          solution: [
            `Tank in litres: $${made.tank} \\times 4.546 = ${nm(made.L)}\\ \\text{L}$`,
            `In US gallons: $${nm(made.L)} \\div 3.785 \\approx ${nm(made.usGal, 3)}$`,
            `Herbicide: $${nm(made.usGal, 3)} \\times ${nm(made.rate)} \\approx ${nm(made.oz, 2)}$`,
            `About $${nf(made.oz, 0)}$ US fl oz of herbicide are needed.`,
          ],
        };
      }
      case 'tanks': {
        const made = retry(
          () => {
            const imp = rng.int(10, 30);
            const us = rng.int(imp, Math.round(imp * 1.35));
            const a = imp * 4.546;
            const b = us * 3.785;
            return { imp, us, a, b, diff: Math.abs(a - b) };
          },
          (x) => x.diff >= 1 && clearOf(x.diff, 1),
        );
        const impBigger = made.a > made.b;
        const optA = `The British truck ($${made.imp}$ imperial gal)`;
        const optB = `The American truck ($${made.us}$ US gal)`;
        return {
          prompt: `A British-made truck has a fuel tank that holds $${made.imp}$ imperial gallons. An American-made truck has a tank that holds $${made.us}$ US gallons.\n\n(a) Which tank holds more fuel?\n\n(b) How many more litres does it hold, ${roundingPhrase(1)}?\n\nUse ${GAL_FACTS}.`,
          parts: [
            { label: '(a)', answer: fixedChoice([optA, optB], impBigger ? 0 : 1) },
            { ...numPart(made.diff, { decimals: 1, suffix: 'L' }), label: '(b)' },
          ],
          hints: ['You cannot compare the numbers of gallons directly, because the gallons are different sizes.', 'Change both tank sizes to litres, then subtract.'],
          solution: [
            `British truck: $${made.imp} \\times 4.546 = ${nm(made.a)}\\ \\text{L}$`,
            `American truck: $${made.us} \\times 3.785 = ${nm(made.b)}\\ \\text{L}$`,
            `$${nm(Math.max(made.a, made.b))} - ${nm(Math.min(made.a, made.b))} = ${nm(made.diff)}$`,
            `The ${impBigger ? 'British' : 'American'} truck’s tank holds about $${nf(made.diff, 1)}\\ \\text{L}$ more.`,
          ],
        };
      }
      default: {
        const v = rng.int(1, 5);
        const imp = v * 20 * 28.41;
        const us = v * 16 * 29.57;
        const diff = imp - us;
        return {
          prompt: `A pub in London serves drinks in imperial pints. A diner in the United States serves drinks in US pints. How many more millilitres are in $${v}$ imperial ${v === 1 ? 'pint' : 'pints'} than in $${v}$ US ${v === 1 ? 'pint' : 'pints'}, ${roundingPhrase(0)}?\n\nUse $1$ imperial pint $= 20$ imperial fl oz with $1$ imperial fl oz $\\approx 28.41\\ \\text{mL}$, and $1$ US pint $= 16$ US fl oz with $1$ US fl oz $\\approx 29.57\\ \\text{mL}$.`,
          parts: [numPart(diff, { decimals: 0, suffix: 'mL' })],
          hints: ['Change each amount to millilitres separately, using its own kind of fluid ounce.', 'Then subtract.'],
          solution: [
            `Imperial: $${v} \\times 20 \\times 28.41 = ${nm(imp)}\\ \\text{mL}$`,
            `US: $${v} \\times 16 \\times 29.57 = ${nm(us)}\\ \\text{mL}$`,
            `$${nm(imp)} - ${nm(us)} = ${nm(diff)}$`,
            `The imperial ${v === 1 ? 'pint holds' : 'pints hold'} about $${nf(diff, 0)}\\ \\text{mL}$ more.`,
          ],
        };
      }
    }
  },
});

// ---------------------------------------------------------------------------
// Lesson 3.3 — Converting between SI and imperial
// ---------------------------------------------------------------------------

const F_IN_CM = '$1\\ \\text{in} = 2.54\\ \\text{cm}$';
const F_KG_LB = '$1\\ \\text{kg} \\approx 2.2\\ \\text{lb}$';
const F_KM_MI = '$1\\ \\text{km} \\approx 0.621\\ \\text{mi}$';
const F_L_GAL = '$1\\ \\text{L} \\approx 0.264$ US gal';
const F_M_FT = '$1\\ \\text{m} \\approx 3.28\\ \\text{ft}$';

const siToImp = skill({
  id: 'm103-si-to-imp',
  name: 'Converting SI to imperial',
  description: 'Convert SI measurements of length, mass and capacity to imperial units with given conversion factors, rounding sensibly.',
  outcomes: ['M1', 'M2'],
  lessonId: 'm103-3-3',
  calculator: true,
  gen(rng, d) {
    const n = rng.pick(NAMES);
    const mode = rng.pick(byDifficulty(d, ['cm-in', 'kg-lb', 'km-mi', 'L-gal'] as const, ['cm-in', 'kg-lb', 'km-mi', 'L-gal', 'm-ft', 'mm-in'] as const, ['height', 'tonnes', 'speed', 'g-lb'] as const));
    if (d === 1) {
      switch (mode) {
        case 'cm-in': {
          const k = rng.int(2, 24);
          const cm = clean(k * 2.54);
          return {
            prompt: `${rng.pick([`A bolt from a Canadian supplier is ${M(cm, 'cm')} long.`, `${n} cuts a piece of dowel ${M(cm, 'cm')} long.`, `A shelf bracket is ${M(cm, 'cm')} long.`])} How long is it in inches?\n\nUse ${F_IN_CM}.`,
            parts: [exact(k, 'in')],
            hints: ['An inch is bigger than a centimetre, so the number of inches will be smaller.', 'Divide the centimetres by 2.54.'],
            solution: [`$${nm(cm)}\\ \\text{cm} \\times \\dfrac{1\\ \\text{in}}{2.54\\ \\text{cm}} = ${nm(cm)} \\div 2.54$`, `$${nm(cm)} \\div 2.54 = ${k}$, so it is $${ms(k, 'in')}$ long.`],
          };
        }
        case 'kg-lb': {
          const kg = rng.int(2, 40);
          const lb = clean(kg * 2.2);
          return {
            prompt: `${rng.pick([`A bag of fertilizer has a mass of ${M(kg, 'kg')}.`, `${n}’s dog has a mass of ${M(kg, 'kg')}.`, `A box of tiles has a mass of ${M(kg, 'kg')}.`])} What is its mass in pounds?\n\nUse ${F_KG_LB}.`,
            parts: [exact(lb, 'lb')],
            hints: ['A kilogram is heavier than a pound, so there will be more pounds than kilograms.', 'Multiply the kilograms by 2.2.'],
            solution: [`$${kg}\\ \\text{kg} \\times \\dfrac{2.2\\ \\text{lb}}{1\\ \\text{kg}}$`, `$${kg} \\times 2.2 = ${nm(lb)}$, so the mass is about $${ms(lb, 'lb')}$.`],
          };
        }
        case 'km-mi': {
          const km = rng.pick([10, 20, 30, 40, 50, 100, 200, 300, 500]);
          const mi = clean(km * 0.621);
          return {
            prompt: `${rng.pick([`A trucker drives ${M(km, 'km')} on a delivery run.`, `${n} cycles ${M(km, 'km')} in a charity ride.`, `A section of the Trans-Canada Highway is ${M(km, 'km')} long.`])} How far is that in miles?\n\nUse ${F_KM_MI}.`,
            parts: [exact(mi, 'mi')],
            hints: ['A mile is longer than a kilometre, so the number of miles will be smaller.', 'Multiply the kilometres by 0.621.'],
            solution: [`$${km}\\ \\text{km} \\times \\dfrac{0.621\\ \\text{mi}}{1\\ \\text{km}}$`, `$${km} \\times 0.621 = ${nm(mi)}$, so the distance is about $${ms(mi, 'mi')}$.`],
          };
        }
        default: {
          const L = rng.pick([10, 20, 25, 50, 75, 100, 200, 250]);
          const gal = clean(L * 0.264);
          return {
            prompt: `${rng.pick([`A fuel tank on a tractor holds ${M(L, 'L')}.`, `${n} buys a ${L}-litre drum of hydraulic fluid.`, `A rain barrel holds ${M(L, 'L')}.`])} How many US gallons is that?\n\nUse ${F_L_GAL}.`,
            parts: [exact(gal, 'gal')],
            hints: ['A US gallon is bigger than a litre, so the number of gallons will be smaller.', 'Multiply the litres by 0.264.'],
            solution: [`$${L}\\ \\text{L} \\times \\dfrac{0.264\\ \\text{gal}}{1\\ \\text{L}}$`, `$${L} \\times 0.264 = ${nm(gal)}$, so that is about $${nm(gal)}$ US gallons.`],
          };
        }
      }
    }
    if (d === 2) {
      const dp = rng.pick([0, 1]);
      switch (mode) {
        case 'cm-in': {
          const cm = retry(() => rng.int(15, 200), (x) => clearOf(x / 2.54, dp));
          const res = cm / 2.54;
          return {
            prompt: `${rng.pick([`A Canadian-made shelf is ${M(cm, 'cm')} wide.`, `A piece of countertop is ${M(cm, 'cm')} long.`, `${n} measures a window that is ${M(cm, 'cm')} tall.`])} What is this measurement in inches, ${roundingPhrase(dp)}?\n\nUse ${F_IN_CM}.`,
            parts: [numPart(res, { decimals: dp, suffix: 'in' })],
            hints: ['Inches are bigger than centimetres, so expect a smaller number.', 'Divide by 2.54, then round.'],
            solution: [`$${cm} \\div 2.54 \\approx ${nm(res, 3)}$`, `Rounded ${roundingPhrase(dp)}, the measurement is $${nf(res, dp)}\\ \\text{in}$.`],
          };
        }
        case 'kg-lb': {
          const kg = retry(() => rng.int(25, 950) / 10, (x) => clearOf(x * 2.2, dp) && !Number.isInteger(x));
          const res = kg * 2.2;
          return {
            prompt: `${rng.pick([`A veterinarian records that a dog has a mass of ${M(kg, 'kg')}.`, `${n}’s carry-on bag has a mass of ${M(kg, 'kg')}.`, `A bag of concrete mix has a mass of ${M(kg, 'kg')}.`, `A newborn foal has a mass of ${M(kg, 'kg')}.`])} What is this mass in pounds, ${roundingPhrase(dp)}?\n\nUse ${F_KG_LB}.`,
            parts: [numPart(res, { decimals: dp, suffix: 'lb' })],
            hints: ['Pounds are lighter than kilograms, so expect a bigger number.', 'Multiply by 2.2, then round.'],
            solution: [`$${nm(kg)} \\times 2.2 = ${nm(res)}$`, `Rounded ${roundingPhrase(dp)}, the mass is about $${nf(res, dp)}\\ \\text{lb}$.`],
          };
        }
        case 'km-mi': {
          const made = retry(
            () => {
              const trip = rng.pick([
                ['Riverton', 'Pinewood', 365],
                ['Lakeside', 'Maple Falls', 128],
                ['Lakeside', 'Brookfield', 211],
                ['Riverton', 'Clearwater', 435],
                ['Hillcrest', 'Stonebridge', 116],
                ['Westbury', 'Ashford', 197],
                ['Northfield', 'Brookfield', 167],
              ] as const);
              return { trip, res: trip[2] * 0.621 };
            },
            (x) => clearOf(x.res, dp),
          );
          const [a, b, km] = made.trip;
          return {
            prompt: `The driving distance from ${a} to ${b} is about ${M(km, 'km')}. A visitor from the United States wants to know the distance in miles. What is it, ${roundingPhrase(dp)}?\n\nUse ${F_KM_MI}.`,
            parts: [numPart(made.res, { decimals: dp, suffix: 'mi' })],
            hints: ['Miles are longer than kilometres, so expect a smaller number.', 'Multiply by 0.621, then round.'],
            solution: [`$${km} \\times 0.621 = ${nm(made.res)}$`, `Rounded ${roundingPhrase(dp)}, the distance is about $${nf(made.res, dp)}\\ \\text{mi}$.`],
          };
        }
        case 'L-gal': {
          const L = retry(() => rng.int(30, 400), (x) => clearOf(x * 0.264, dp));
          const res = L * 0.264;
          return {
            prompt: `${rng.pick([`A pickup truck’s fuel tank holds ${M(L, 'L')}.`, `${n} drains ${M(L, 'L')} of water from a hot-water tank.`, `A farm sprayer holds ${M(L, 'L')} of mix.`])} How many US gallons is that, ${roundingPhrase(dp)}?\n\nUse ${F_L_GAL}.`,
            parts: [numPart(res, { decimals: dp, suffix: 'gal' })],
            hints: ['A US gallon is bigger than a litre, so expect a smaller number.', 'Multiply by 0.264, then round.'],
            solution: [`$${L} \\times 0.264 = ${nm(res)}$`, `Rounded ${roundingPhrase(dp)}, that is about $${nf(res, dp)}$ US gallons.`],
          };
        }
        case 'm-ft': {
          const m = retry(() => rng.int(12, 150) / 10, (x) => clearOf(x * 3.28, dp) && !Number.isInteger(x));
          const res = m * 3.28;
          return {
            prompt: `${rng.pick([`A shipping container is ${M(m, 'm')} long.`, `${n} measures a garage that is ${M(m, 'm')} wide.`, `A ladder reaches ${M(m, 'm')} up a wall.`, `A flatbed trailer deck is ${M(m, 'm')} long.`])} What is this length in feet, ${roundingPhrase(dp)}?\n\nUse ${F_M_FT}.`,
            parts: [numPart(res, { decimals: dp, suffix: 'ft' })],
            hints: ['Feet are shorter than metres, so expect a bigger number.', 'Multiply by 3.28, then round.'],
            solution: [`$${nm(m)} \\times 3.28 = ${nm(res)}$`, `Rounded ${roundingPhrase(dp)}, the length is about $${nf(res, dp)}\\ \\text{ft}$.`],
          };
        }
        default: {
          const mm = retry(() => rng.int(6, 32), (x) => clearOf(x / 25.4, 2));
          const res = mm / 25.4;
          return {
            prompt: `${n}, an apprentice mechanic, has a ${M(mm, 'mm')} wrench. What is this size in inches, ${roundingPhrase(2)}?\n\nUse ${F_IN_CM}, so $1\\ \\text{in} = 25.4\\ \\text{mm}$.`,
            parts: [numPart(res, { decimals: 2, suffix: 'in' })],
            hints: ['There are 25.4 millimetres in one inch.', 'Divide by 25.4, then round to two decimal places.'],
            solution: [`$1\\ \\text{in} = 2.54\\ \\text{cm} = 25.4\\ \\text{mm}$`, `$${mm} \\div 25.4 \\approx ${nm(res, 4)}$`, `Rounded ${roundingPhrase(2)}, the wrench is about $${nf(res, 2)}\\ \\text{in}$.`],
          };
        }
      }
    }
    switch (mode) {
      case 'height': {
        const cm = retry(() => rng.int(150, 198), (x) => clearOf(x / 2.54, 0, 0.06));
        const inches = cm / 2.54;
        const r = Math.round(inches);
        const ft = Math.floor(r / 12);
        const inch = r % 12;
        return {
          prompt: `${n} is ${M(cm, 'cm')} tall. A US hockey camp asks for height in feet and inches. What is ${n}’s height, to the nearest inch?\n\nUse ${F_IN_CM}.`,
          parts: [exact(ft, 'ft'), exact(inch, 'in')],
          hints: ['First change centimetres to inches (divide by 2.54) and round to the nearest inch.', 'Then divide by 12: the quotient is feet and the remainder is inches.'],
          solution: [`$${cm} \\div 2.54 \\approx ${nm(inches, 2)}$, which rounds to $${r}\\ \\text{in}$.`, `$${r} \\div 12 = ${ft}$ remainder $${inch}$`, `${n} is about $${ft}\\ \\text{ft}\\ ${inch}\\ \\text{in}$ tall.`],
          answerDisplay: `$${ft}\\ \\text{ft}\\ ${inch}\\ \\text{in}$`,
        };
      }
      case 'tonnes': {
        const t = retry(() => rng.int(20, 400) / 10, (x) => !Number.isInteger(x));
        const kg = clean(t * 1000);
        const lb = clean(kg * 2.2);
        return {
          prompt: `A grain truck leaving a farm carries ${M(t, 't')} (tonnes) of wheat. The buyer in the United States wants the mass in pounds. What is it?\n\nUse $1\\ \\text{t} = 1000\\ \\text{kg}$ and ${F_KG_LB}.`,
          parts: [exact(lb, 'lb')],
          hints: ['Change tonnes to kilograms first.', 'Then multiply the kilograms by 2.2.'],
          solution: [`$${nm(t)} \\times 1000 = ${ms(kg, 'kg')}$`, `$${nm(kg)} \\times 2.2 = ${nm(lb)}$`, `The load is about $${ms(lb, 'lb')}$.`],
        };
      }
      case 'speed': {
        const kmh = rng.pick([30, 50, 60, 70, 80, 90, 100, 110]);
        const mph = kmh * 0.621;
        return {
          prompt: `${n} is driving a truck across a border into a country that uses miles. The speed limit sign just before the border says ${M(kmh, 'km/h')}. What is this speed in miles per hour, ${roundingPhrase(0)}?\n\nUse ${F_KM_MI}.`,
          parts: [numPart(mph, { decimals: 0, suffix: 'mph' })],
          hints: ['Only the distance unit changes. The time unit (hours) stays the same.', 'Multiply the kilometres per hour by 0.621.'],
          solution: [`$${kmh}\\ \\dfrac{\\text{km}}{\\text{h}} \\times \\dfrac{0.621\\ \\text{mi}}{1\\ \\text{km}} = ${nm(mph)}\\ \\dfrac{\\text{mi}}{\\text{h}}$`, `Rounded ${roundingPhrase(0)}, the limit is about $${nf(mph, 0)}$ miles per hour.`],
        };
      }
      default: {
        const g = retry(() => rng.int(10, 100) * 50, (x) => clearOf((x / 1000) * 2.2, 1));
        const kg = g / 1000;
        const lb = kg * 2.2;
        return {
          prompt: `A package of ${rng.pick(['ground bison', 'chicken thighs', 'pork chops', 'cheese curds'])} at a grocery store has a mass of ${M(g, 'g')}. A customer wants to know its mass in pounds. What is it, ${roundingPhrase(1)}?\n\nUse ${F_KG_LB}.`,
          parts: [numPart(lb, { decimals: 1, suffix: 'lb' })],
          hints: ['Change grams to kilograms first: divide by 1000.', 'Then multiply the kilograms by 2.2.'],
          solution: [`$${nm(g)} \\div 1000 = ${ms(kg, 'kg')}$`, `$${nm(kg)} \\times 2.2 = ${nm(lb)}$`, `Rounded ${roundingPhrase(1)}, the package is about $${nf(lb, 1)}\\ \\text{lb}$.`],
        };
      }
    }
  },
});

const F_FT_CM = '$1\\ \\text{ft} = 30.48\\ \\text{cm}$';
const F_MI_KM = '$1\\ \\text{mi} \\approx 1.609\\ \\text{km}$';
const F_GAL_L = '$1$ US gal $\\approx 3.785\\ \\text{L}$';
const F_OZ_G = '$1\\ \\text{oz} \\approx 28.35\\ \\text{g}$';

const impToSi = skill({
  id: 'm103-imp-to-si',
  name: 'Converting imperial to SI',
  description: 'Convert imperial measurements of length, mass and capacity to SI units with given conversion factors, including multi-step conversions.',
  outcomes: ['M1', 'M2'],
  lessonId: 'm103-3-3',
  calculator: true,
  gen(rng, d) {
    const n = rng.pick(NAMES);
    if (d === 1) {
      const mode = rng.pick(['in-cm', 'ft-cm', 'lb-kg', 'mi-km', 'gal-L'] as const);
      switch (mode) {
        case 'in-cm': {
          const inch = rng.int(2, 36);
          const cm = clean(inch * 2.54);
          return {
            prompt: `${rng.pick([`A US-made monitor is ${M(inch, 'in')} wide.`, `${n} buys a ${inch}-inch ($${inch}\\ \\text{in}$) pipe wrench.`, `A tire is ${M(inch, 'in')} across.`])} What is this measurement in centimetres?\n\nUse ${F_IN_CM}.`,
            parts: [exact(cm, 'cm')],
            hints: ['A centimetre is smaller than an inch, so expect a bigger number.', 'Multiply the inches by 2.54.'],
            solution: [`$${inch}\\ \\text{in} \\times \\dfrac{2.54\\ \\text{cm}}{1\\ \\text{in}}$`, `$${inch} \\times 2.54 = ${nm(cm)}$, so the measurement is $${ms(cm, 'cm')}$.`],
          };
        }
        case 'ft-cm': {
          const ft = rng.int(2, 10);
          const cm = clean(ft * 30.48);
          return {
            prompt: `${rng.pick([`A length of PEX tubing is ${M(ft, 'ft')} long.`, `${n}’s step ladder is ${M(ft, 'ft')} tall.`, `A roll of flashing is ${M(ft, 'ft')} long.`])} What is this length in centimetres?\n\nUse ${F_FT_CM}.`,
            parts: [exact(cm, 'cm')],
            hints: ['A centimetre is much smaller than a foot, so expect a much bigger number.', 'Multiply the feet by 30.48.'],
            solution: [`$${ft}\\ \\text{ft} \\times \\dfrac{30.48\\ \\text{cm}}{1\\ \\text{ft}}$`, `$${ft} \\times 30.48 = ${nm(cm)}$, so the length is $${ms(cm, 'cm')}$.`],
          };
        }
        case 'lb-kg': {
          const kg = rng.int(5, 25);
          const lb = clean(kg * 2.2);
          return {
            prompt: `${rng.pick([`A sack of potatoes from a US farm weighs ${M(lb, 'lb')}.`, `A bag of US-made dog food weighs ${M(lb, 'lb')}.`, `${n} lifts a box of tools that weighs ${M(lb, 'lb')}.`])} What is the mass in kilograms?\n\nUse ${F_KG_LB}.`,
            parts: [exact(kg, 'kg')],
            hints: ['A kilogram is heavier than a pound, so expect a smaller number.', 'Divide the pounds by 2.2.'],
            solution: [`$${nm(lb)}\\ \\text{lb} \\times \\dfrac{1\\ \\text{kg}}{2.2\\ \\text{lb}} = ${nm(lb)} \\div 2.2$`, `$${nm(lb)} \\div 2.2 = ${kg}$, so the mass is about $${ms(kg, 'kg')}$.`],
          };
        }
        case 'mi-km': {
          const mi = retry(() => rng.int(2, 30), (x) => clearOf(x * 1.609, 1));
          const km = clean(mi * 1.609);
          return {
            prompt: `${rng.pick([`A trail in a US national park is ${M(mi, 'mi')} long.`, `${n} runs a ${mi}-mile race in an American city.`, `A US delivery route is ${M(mi, 'mi')} long.`])} How long is that in kilometres, ${roundingPhrase(1)}?\n\nUse ${F_MI_KM}.`,
            parts: [numPart(km, { decimals: 1, suffix: 'km' })],
            hints: ['A kilometre is shorter than a mile, so expect a bigger number.', 'Multiply the miles by 1.609, then round.'],
            solution: [`$${mi}\\ \\text{mi} \\times \\dfrac{1.609\\ \\text{km}}{1\\ \\text{mi}} = ${nm(km)}\\ \\text{km}$`, `Rounded ${roundingPhrase(1)}, that is about $${nf(km, 1)}\\ \\text{km}$.`],
          };
        }
        default: {
          const gal = retry(() => rng.int(2, 20), (x) => clearOf(x * 3.785, 1));
          const L = clean(gal * 3.785);
          return {
            prompt: `${rng.pick([`A US paint supplier sells primer in ${gal}-gallon pails.`, `${n} fills a ${gal}-gallon (US) fuel can.`, `A US recipe makes ${gal} US gallons of soup.`])} How many litres is ${gal} US gallons, ${roundingPhrase(1)}?\n\nUse ${F_GAL_L}.`,
            parts: [numPart(L, { decimals: 1, suffix: 'L' })],
            hints: ['A litre is smaller than a US gallon, so expect a bigger number.', 'Multiply the gallons by 3.785, then round.'],
            solution: [`$${gal}\\ \\text{gal} \\times \\dfrac{3.785\\ \\text{L}}{1\\ \\text{gal}} = ${nm(L)}\\ \\text{L}$`, `Rounded ${roundingPhrase(1)}, that is about $${nf(L, 1)}\\ \\text{L}$.`],
          };
        }
      }
    }
    if (d === 2) {
      const mode = rng.pick(['ftin-cm', 'lb-kg', 'mi-km', 'gal-L', 'oz-g', 'frac-mm'] as const);
      switch (mode) {
        case 'ftin-cm': {
          const made = retry(() => ({ ft: rng.int(4, 7), inch: rng.int(0, 11) }), (x) => clearOf((x.ft * 12 + x.inch) * 2.54, 0));
          const total = made.ft * 12 + made.inch;
          const cm = total * 2.54;
          const thing = rng.pick(['A basketball player is', 'A fridge is', 'A doorway in an older US house is', 'A camper van is']);
          return {
            prompt: `${thing} $${ftin(made.ft, made.inch)}$ tall. What is this height in centimetres, ${roundingPhrase(0)}?\n\nUse ${F_IN_CM}.`,
            parts: [numPart(cm, { decimals: 0, suffix: 'cm' })],
            hints: ['Change the height to inches first: multiply the feet by 12 and add the inches.', 'Then multiply by 2.54 and round.'],
            solution: [`$${made.ft} \\times 12 + ${made.inch} = ${total}\\ \\text{in}$`, `$${total} \\times 2.54 = ${nm(cm)}$`, `Rounded ${roundingPhrase(0)}, the height is about $${nf(cm, 0)}\\ \\text{cm}$.`],
          };
        }
        case 'lb-kg': {
          const lb = retry(() => rng.int(20, 300), (x) => clearOf(x / 2.2, 1) && x % 11 !== 0);
          const kg = lb / 2.2;
          return {
            prompt: `${rng.pick([`A US moving company lists a box at ${M(lb, 'lb')}.`, `${n}’s bench press record is ${M(lb, 'lb')}.`, `A bale of hay from a US farm weighs ${M(lb, 'lb')}.`, `A US-made air compressor weighs ${M(lb, 'lb')}.`])} What is this mass in kilograms, ${roundingPhrase(1)}?\n\nUse ${F_KG_LB}.`,
            parts: [numPart(kg, { decimals: 1, suffix: 'kg' })],
            hints: ['Kilograms are heavier than pounds, so expect a smaller number.', 'Divide by 2.2, then round.'],
            solution: [`$${lb} \\div 2.2 \\approx ${nm(kg, 3)}$`, `Rounded ${roundingPhrase(1)}, the mass is about $${nf(kg, 1)}\\ \\text{kg}$.`],
          };
        }
        case 'mi-km': {
          const mi = retry(() => rng.int(12, 400), (x) => clearOf(x * 1.609, 0));
          const km = mi * 1.609;
          return {
            prompt: `Just past a border crossing, in a country that uses miles, a road sign shows that ${rng.pick(['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Westbury'])} is ${M(mi, 'mi')} away. How far is that in kilometres, ${roundingPhrase(0)}?\n\nUse ${F_MI_KM}.`,
            parts: [numPart(km, { decimals: 0, suffix: 'km' })],
            hints: ['Kilometres are shorter than miles, so expect a bigger number.', 'Multiply by 1.609, then round.'],
            solution: [`$${mi} \\times 1.609 = ${nm(km)}$`, `Rounded ${roundingPhrase(0)}, the distance is about $${nf(km, 0)}\\ \\text{km}$.`],
          };
        }
        case 'gal-L': {
          const gal = retry(() => rng.int(15, 400) / 10, (x) => clearOf(x * 3.785, 1) && !Number.isInteger(x));
          const L = gal * 3.785;
          return {
            prompt: `${rng.pick([`A US gas station receipt shows that ${n} bought $${nm(gal)}$ US gallons of gasoline.`, `A US-made boat has a $${nm(gal)}$-gallon (US) fuel tank.`, `A US water heater holds $${nm(gal)}$ US gallons.`])} How many litres is that, ${roundingPhrase(1)}?\n\nUse ${F_GAL_L}.`,
            parts: [numPart(L, { decimals: 1, suffix: 'L' })],
            hints: ['Litres are smaller than US gallons, so expect a bigger number.', 'Multiply by 3.785, then round.'],
            solution: [`$${nm(gal)} \\times 3.785 = ${nm(L)}$`, `Rounded ${roundingPhrase(1)}, that is about $${nf(L, 1)}\\ \\text{L}$.`],
          };
        }
        case 'oz-g': {
          const oz = retry(() => rng.int(3, 40), (x) => clearOf(x * 28.35, 0));
          const g = oz * 28.35;
          return {
            prompt: `${rng.pick([`A US recipe calls for ${M(oz, 'oz')} of cheddar cheese.`, `A steak on a US restaurant menu weighs ${M(oz, 'oz')}.`, `A bag of US trail mix holds ${M(oz, 'oz')}.`])} What is this mass in grams, ${roundingPhrase(0)}?\n\nUse ${F_OZ_G}.`,
            parts: [numPart(g, { decimals: 0, suffix: 'g' })],
            hints: ['Grams are much lighter than ounces, so expect a bigger number.', 'Multiply by 28.35, then round.'],
            solution: [`$${oz} \\times 28.35 = ${nm(g)}$`, `Rounded ${roundingPhrase(0)}, the mass is about $${nf(g, 0)}\\ \\text{g}$.`],
          };
        }
        default: {
          const den = rng.pick([4, 8, 16]);
          const num = retry(() => rng.int(1, den - 1), (x) => x % 2 === 1 && clearOf((x / den) * 25.4, 0));
          const inches = num / den;
          const mm = inches * 25.4;
          return {
            prompt: `${n} needs a metric wrench to fit a $\\tfrac{${num}}{${den}}$-inch bolt head. What is $\\tfrac{${num}}{${den}}\\ \\text{in}$ in millimetres, ${roundingPhrase(0)}?\n\nUse ${F_IN_CM}, so $1\\ \\text{in} = 25.4\\ \\text{mm}$.`,
            parts: [numPart(mm, { decimals: 0, suffix: 'mm' })],
            hints: ['Change the fraction to a decimal first.', 'Multiply by 25.4 to get millimetres, then round.'],
            solution: [`$\\tfrac{${num}}{${den}} = ${nm(inches)}\\ \\text{in}$`, `$${nm(inches)} \\times 25.4 = ${nm(mm)}\\ \\text{mm}$`, `Rounded ${roundingPhrase(0)}, the bolt head is about $${nf(mm, 0)}\\ \\text{mm}$, so ${n} should try a $${nf(mm, 0)}\\ \\text{mm}$ wrench.`],
          };
        }
      }
    }
    const mode = rng.pick(['recipe', 'load', 'stud', 'baby', 'speed'] as const);
    switch (mode) {
      case 'recipe': {
        const made = retry(
          () => {
            const cups = rng.pick([0.5, 0.75, 1.25, 1.5, 2, 2.5, 3, 3.5]);
            const floz = cups * 8;
            return { cups, floz, mL: floz * 29.57 };
          },
          (x) => clearOf(x.mL, 0),
        );
        const ingredient = rng.pick(['milk', 'buttermilk', 'chicken broth', 'water', 'orange juice']);
        return {
          prompt: `A US recipe for ${rng.pick(['pancakes', 'bannock', 'muffins', 'soup', 'rice pilaf'])} calls for $${nm(made.cups)}$ cups of ${ingredient}. ${n} has a measuring cup marked only in millilitres. How many millilitres is that, ${roundingPhrase(0)}?\n\nUse $1$ US cup $= 8$ US fl oz and $1$ US fl oz $\\approx 29.57\\ \\text{mL}$.`,
          parts: [numPart(made.mL, { decimals: 0, suffix: 'mL' })],
          hints: ['Change the cups to US fluid ounces first.', 'Then multiply the fluid ounces by 29.57.'],
          solution: [`$${nm(made.cups)} \\times 8 = ${nm(made.floz)}$ US fl oz`, `$${nm(made.floz)} \\times 29.57 = ${nm(made.mL)}$`, `Rounded ${roundingPhrase(0)}, ${n} needs about $${nf(made.mL, 0)}\\ \\text{mL}$ of ${ingredient}.`],
        };
      }
      case 'load': {
        const kg = retry(() => rng.int(50, 400) * 100, (x) => x % 1000 !== 0);
        const lb = clean(kg * 2.2);
        const t = kg / 1000;
        return {
          prompt: `A truck from a country that uses pounds crosses the border carrying ${M(lb, 'lb')} of ${rng.pick(['lumber', 'canola seed', 'steel pipe', 'cattle feed'])}. The scale on this side of the border reports mass in tonnes. What is the load in tonnes?\n\nUse ${F_KG_LB} and $1\\ \\text{t} = 1000\\ \\text{kg}$.`,
          parts: [exact(t, 't')],
          hints: ['Change pounds to kilograms first (divide by 2.2).', 'Then change kilograms to tonnes (divide by 1000).'],
          solution: [`$${nm(lb)} \\div 2.2 = ${ms(kg, 'kg')}$`, `$${nm(kg)} \\div 1000 = ${nm(t)}$`, `The load is about $${ms(t, 't')}$ (tonnes).`],
        };
      }
      case 'stud': {
        const made = retry(() => ({ ft: rng.int(6, 12), inch: rng.int(1, 11) }), (x) => clearOf(((x.ft * 12 + x.inch) * 2.54) / 100, 2));
        const total = made.ft * 12 + made.inch;
        const cm = total * 2.54;
        const m = cm / 100;
        return {
          prompt: `${n} is framing a wall from US building plans. Each stud must be $${ftin(made.ft, made.inch)}$ long. What is this length in metres, ${roundingPhrase(2)}?\n\nUse ${F_IN_CM}.`,
          parts: [numPart(m, { decimals: 2, suffix: 'm' })],
          hints: ['Change the length to inches first, then to centimetres.', 'Finally divide by 100 to get metres.'],
          solution: [`$${made.ft} \\times 12 + ${made.inch} = ${total}\\ \\text{in}$`, `$${total} \\times 2.54 = ${nm(cm)}\\ \\text{cm}$`, `$${nm(cm)} \\div 100 = ${nm(m)}$`, `Rounded ${roundingPhrase(2)}, each stud is about $${nf(m, 2)}\\ \\text{m}$ long.`],
        };
      }
      case 'baby': {
        const made = retry(() => ({ lb: rng.int(5, 9), oz: rng.int(1, 15) }), (x) => clearOf((x.lb + x.oz / 16) / 2.2, 2));
        const lbs = made.lb + made.oz / 16;
        const kg = lbs / 2.2;
        return {
          prompt: `A baby born in a US hospital weighs $${lboz(made.lb, made.oz)}$. The family’s doctor back home records mass in kilograms. What is the baby’s mass, ${roundingPhrase(2)} of a kilogram?\n\nUse $16\\ \\text{oz} = 1\\ \\text{lb}$ and ${F_KG_LB}.`,
          parts: [numPart(kg, { decimals: 2, suffix: 'kg' })],
          hints: ['Change the ounces to a fraction of a pound and add it to the pounds.', 'Then divide the pounds by 2.2.'],
          solution: [`$${made.oz}\\ \\text{oz} = \\tfrac{${made.oz}}{16}\\ \\text{lb} = ${nm(made.oz / 16)}\\ \\text{lb}$, so the baby weighs $${nm(lbs)}\\ \\text{lb}$.`, `$${nm(lbs)} \\div 2.2 \\approx ${nm(kg, 4)}$`, `Rounded ${roundingPhrase(2)}, the baby’s mass is about $${nf(kg, 2)}\\ \\text{kg}$.`],
        };
      }
      default: {
        const mph = retry(() => rng.pick([25, 35, 40, 45, 55, 60, 65, 70, 75, 80]), (x) => clearOf(x * 1.609, 0));
        const kmh = mph * 1.609;
        return {
          prompt: `${n} is driving a rented car in the United States, where the speed limit is $${mph}$ miles per hour. The car’s speedometer only shows km/h. What speed in km/h matches the limit, ${roundingPhrase(0)}?\n\nUse ${F_MI_KM}.`,
          parts: [numPart(kmh, { decimals: 0, suffix: 'km/h' })],
          hints: ['Only the distance unit changes; the hours stay the same.', 'Multiply the miles per hour by 1.609.'],
          solution: [`$${mph}\\ \\dfrac{\\text{mi}}{\\text{h}} \\times \\dfrac{1.609\\ \\text{km}}{1\\ \\text{mi}} = ${nm(kmh)}\\ \\dfrac{\\text{km}}{\\text{h}}$`, `Rounded ${roundingPhrase(0)}, the limit is about $${nf(kmh, 0)}\\ \\text{km/h}$.`],
        };
      }
    }
  },
});

// ---------------------------------------------------------------------------
// Lesson 3.4 — Temperature
// ---------------------------------------------------------------------------

const F_FORMULA = '$F = \\tfrac{9}{5}C + 32$';
const C_FORMULA = '$C = \\tfrac{5}{9}(F - 32)$';
const toF = (c: number) => (9 / 5) * c + 32;
const toC = (f: number) => (5 / 9) * (f - 32);

const C_CONTEXTS: Array<{ lo: number; hi: number; text: (t: string, n: string, town: string) => string }> = [
  { lo: -35, hi: 35, text: (t, n, town) => `The forecast for ${town} tomorrow is ${t}. ${n}’s cousin in Texas wants to know the temperature in degrees Fahrenheit.` },
  { lo: 35, hi: 40, text: (t) => `The hot tub at a mountain hotel is kept at ${t}. A guest from Ohio asks what that is in degrees Fahrenheit.` },
  { lo: 150, hi: 250, text: (t, n) => `${n}’s recipe says to roast vegetables at ${t}, but the restaurant’s oven is marked in degrees Fahrenheit.` },
  { lo: 80, hi: 110, text: (t, n) => `The coolant in a truck engine that ${n} is servicing is at ${t}. The service manual is from the US and uses degrees Fahrenheit.` },
  { lo: 1, hi: 5, text: (t) => `A walk-in cooler at a grocery store is set to ${t}. The thermostat is an American model that shows degrees Fahrenheit.` },
  { lo: -25, hi: -15, text: (t) => `A restaurant freezer is set to ${t}. The new thermometer only shows degrees Fahrenheit.` },
];

const F_CONTEXTS: Array<{ lo: number; hi: number; text: (t: string, n: string) => string }> = [
  { lo: -20, hi: 100, text: (t, n) => `${n}’s weather app is set to a city in the United States and shows ${t} there.` },
  { lo: 300, hi: 450, text: (t) => `An American recipe says to bake at ${t}, but the oven is marked in degrees Celsius.` },
  { lo: 33, hi: 41, text: (t) => `A fridge made for the US market is set to ${t}.` },
  { lo: -10, hi: 5, text: (t) => `A US-made chest freezer is set to ${t}.` },
  { lo: 325, hi: 375, text: (t, n) => `${n} works at a fish-and-chips shop. The deep fryer’s manual says to heat the oil to ${t}.` },
  { lo: 97, hi: 104, text: (t, n) => `An old thermometer shows that ${n}’s temperature is ${t}.` },
];

function cToFSteps(c: number, dp?: number): string[] {
  const f = toF(c);
  return [
    `Use ${F_FORMULA}.`,
    `$F = \\tfrac{9}{5}(${nm(c)}) + 32 = ${nm(1.8 * c)} + 32$`,
    dp === undefined || Number.isInteger(roundTo(f, 9))
      ? `$F = ${nm(f)}$, so the temperature is $${fDeg(f)}$.`
      : `$F = ${nm(f)}$, so the temperature is about $${nf(f, dp)}^\\circ\\text{F}$.`,
  ];
}

function fToCSteps(f: number, dp?: number): string[] {
  const c = toC(f);
  const exactC = Math.abs(c - Math.round(c)) < 1e-9;
  return [
    `Use ${C_FORMULA}. Subtract 32 first (brackets come first).`,
    `$C = \\tfrac{5}{9}(${nm(f)} - 32) = \\tfrac{5}{9}(${nm(f - 32)})${exactC ? '' : ` \\approx ${nm(c, 3)}`}$`,
    exactC ? `$C = ${nm(Math.round(c))}$, so the temperature is $${cDeg(Math.round(c))}$.` : `Rounded ${roundingPhrase(dp ?? 1)}, the temperature is about $${nf(c, dp ?? 1)}^\\circ\\text{C}$.`,
  ];
}

const tempConvert = skill({
  id: 'm103-temp-convert',
  name: 'Converting temperatures',
  description: 'Convert between degrees Celsius and degrees Fahrenheit with the formulas, and rearrange the formula when needed.',
  outcomes: ['M1', 'M2', 'A1'],
  lessonId: 'm103-3-4',
  calculator: true,
  gen(rng, d) {
    const n = rng.pick(NAMES);
    const town = rng.pick(TOWNS);
    if (d < 3) {
      const cToF = rng.chance(0.5);
      if (cToF) {
        const ctx = rng.pick(C_CONTEXTS);
        const c =
          d === 1
            ? rng.pick(Array.from({ length: 200 }, (_, i) => i * 5 - 50).filter((x) => x >= ctx.lo && x <= ctx.hi))
            : retry(() => rng.int(ctx.lo, ctx.hi), (x) => x % 5 !== 0 || ctx.hi - ctx.lo < 5);
        const f = toF(c);
        const dp = d === 1 ? undefined : rng.pick([0, 1]);
        return {
          prompt: `${ctx.text(`$${cDeg(c)}$`, n, town)} What is the temperature in degrees Fahrenheit${dp === undefined || Number.isInteger(roundTo(f, 9)) ? '' : `, ${roundingPhrase(dp)}`}?\n\nUse ${F_FORMULA}.`,
          parts: [dp === undefined || Number.isInteger(roundTo(f, 9)) ? exact(f, '°F') : numPart(f, { decimals: dp, suffix: '°F' })],
          hints: ['Multiply the Celsius temperature by $\\tfrac{9}{5}$ (or 1.8) first.', 'Then add 32.'],
          solution: cToFSteps(c, dp),
        };
      }
      const ctx = rng.pick(F_CONTEXTS);
      const f =
        d === 1
          ? rng.pick(Array.from({ length: 80 }, (_, i) => 32 + 9 * (i - 20)).filter((x) => x >= ctx.lo && x <= ctx.hi).concat(ctx.lo < 33 ? [32] : []))
          : retry(() => rng.int(ctx.lo, ctx.hi), (x) => (x - 32) % 9 !== 0);
      const c = toC(f);
      const exactC = Math.abs(c - Math.round(c)) < 1e-9;
      const dp = rng.pick([0, 1]);
      return {
        prompt: `${ctx.text(`$${fDeg(f)}$`, n)} What is the temperature in degrees Celsius${exactC ? '' : `, ${roundingPhrase(dp)}`}?\n\nUse ${C_FORMULA}.`,
        parts: [exactC ? exact(Math.round(c), '°C') : numPart(c, { decimals: dp, suffix: '°C' })],
        hints: ['Subtract 32 from the Fahrenheit temperature first.', 'Then multiply by $\\tfrac{5}{9}$ (multiply by 5, then divide by 9).'],
        solution: fToCSteps(f, dp),
      };
    }
    const mode = rng.pick(['change', 'rearrange', 'limit'] as const);
    if (mode === 'change') {
      if (rng.chance(0.5)) {
        const a = rng.int(-32, -12);
        const b = rng.int(-4, 14);
        const dC = b - a;
        const dF = clean(1.8 * dC);
        return {
          prompt: `A warm wind blew into ${town}. In a few hours the temperature rose from $${cDeg(a)}$ to $${cDeg(b)}$. By how many Fahrenheit degrees did the temperature rise?`,
          parts: [exact(dF, '°F')],
          hints: ['Find the rise in Celsius degrees first.', 'A change of $1$ Celsius degree is a change of $\\tfrac{9}{5}$ Fahrenheit degrees. Do not add 32 to a change: the 32 only shifts the starting point of the scale.'],
          solution: [`Rise in Celsius: $${nm(b)} - (${nm(a)}) = ${dC}$ Celsius degrees.`, `Each Celsius degree is $\\tfrac{9}{5} = 1.8$ Fahrenheit degrees: $${dC} \\times 1.8 = ${nm(dF)}$.`, `The temperature rose by $${nm(dF)}$ Fahrenheit degrees ($${nm(dF)}^\\circ\\text{F}$).`],
        };
      }
      const dF = retry(() => rng.int(10, 60), (x) => x % 9 !== 0);
      const dC = (dF * 5) / 9;
      return {
        prompt: `Overnight in a small US town, the temperature dropped by $${dF}$ Fahrenheit degrees. By how many Celsius degrees did it drop, ${roundingPhrase(1)}?`,
        parts: [numPart(dC, { decimals: 1, suffix: '°C' })],
        hints: ['This is a change in temperature, not a temperature, so do not subtract 32.', 'A change of $1$ Fahrenheit degree is a change of $\\tfrac{5}{9}$ of a Celsius degree.'],
        solution: [`Each Fahrenheit degree is $\\tfrac{5}{9}$ of a Celsius degree.`, `$\\tfrac{5}{9} \\times ${dF} = ${nm(dC, 3)}$`, `The temperature dropped by about $${nf(dC, 1)}$ Celsius degrees ($${nf(dC, 1)}^\\circ\\text{C}$).`],
      };
    }
    if (mode === 'rearrange') {
      const f = retry(() => rng.int(-20, 450), (x) => (x - 32) % 9 !== 0);
      const c = toC(f);
      return {
        prompt: `${n} knows the formula ${F_FORMULA} but needs to change a reading of $${fDeg(f)}$ into degrees Celsius.\n\n(a) Which equation correctly rearranges the formula to solve for $C$?\n\n(b) Use it to convert $${fDeg(f)}$ to degrees Celsius, ${roundingPhrase(1)}.`,
        parts: [
          { label: '(a)', answer: mc(rng, '$C = \\tfrac{5}{9}(F - 32)$', ['$C = \\tfrac{5}{9}F - 32$', '$C = \\tfrac{9}{5}(F - 32)$', '$C = \\tfrac{5}{9}(F + 32)$']) },
          { ...numPart(c, { decimals: 1, suffix: '°C' }), label: '(b)' },
        ],
        hints: ['Undo the steps in reverse order: the formula multiplies by $\\tfrac{9}{5}$ and then adds 32, so first subtract 32, then multiply by $\\tfrac{5}{9}$.', 'Brackets show that you subtract 32 before multiplying.'],
        solution: [
          'Start with $F = \\tfrac{9}{5}C + 32$. Subtract 32 from both sides: $F - 32 = \\tfrac{9}{5}C$.',
          'Multiply both sides by $\\tfrac{5}{9}$: $C = \\tfrac{5}{9}(F - 32)$.',
          `$C = \\tfrac{5}{9}(${nm(f)} - 32) = \\tfrac{5}{9}(${nm(f - 32)}) \\approx ${nm(c, 3)}$`,
          `(a) $C = \\tfrac{5}{9}(F - 32)$; (b) about $${nf(c, 1)}^\\circ\\text{C}$.`,
        ],
      };
    }
    const lim = rng.pick([
      { what: 'The coolant in a diesel engine', limitC: 105, lo: 200, hi: 240, q: 'Is the engine hotter than the limit?', rule: 'must stay at or below', yesIfAbove: true },
      { what: 'Food in a hot-holding cabinet at a cafeteria', limitC: 60, lo: 125, hi: 160, q: 'Is the food hot enough?', rule: 'must stay at or above', yesIfAbove: true },
      { what: 'A walk-in freezer at a restaurant', limitC: -18, lo: -12, hi: 12, q: 'Is the freezer cold enough?', rule: 'must stay at or below', yesIfAbove: false },
      { what: 'A fridge for vaccines at a pharmacy', limitC: 8, lo: 36, hi: 52, q: 'Is the fridge too warm?', rule: 'must stay at or below', yesIfAbove: true },
    ]);
    const made = retry(
      () => {
        const f = rng.int(lim.lo, lim.hi);
        const c = toC(f);
        return { f, c, diff: Math.abs(c - lim.limitC) };
      },
      (x) => x.diff >= 0.5 && clearOf(x.diff, 1),
    );
    const above = made.c > lim.limitC;
    const yes = above === lim.yesIfAbove;
    return {
      prompt: `${lim.what} ${lim.rule} $${cDeg(lim.limitC)}$. An American thermometer reads $${fDeg(made.f)}$.\n\n(a) ${lim.q}\n\n(b) By how many Celsius degrees is the reading ${above ? 'above' : 'below'} the limit, ${roundingPhrase(1)}?`,
      parts: [
        { label: '(a)', answer: fixedChoice(['Yes', 'No'], yes ? 0 : 1) },
        { ...numPart(made.diff, { decimals: 1, suffix: '°C' }), label: '(b)' },
      ],
      hints: ['Change the Fahrenheit reading to Celsius so you can compare it with the limit.', `Use ${C_FORMULA}, then subtract to find the difference.`],
      solution: [
        `$C = \\tfrac{5}{9}(${nm(made.f)} - 32) = \\tfrac{5}{9}(${nm(made.f - 32)}) \\approx ${nm(made.c, 2)}^\\circ\\text{C}$`,
        `Compare with the limit of $${cDeg(lim.limitC)}$: the reading is ${above ? 'above' : 'below'} the limit, so the answer to (a) is **${yes ? 'Yes' : 'No'}**.`,
        `Difference: $${above ? `${nm(made.c, 2)} - (${nm(lim.limitC)})` : `${nm(lim.limitC)} - (${nm(made.c, 2)})`} \\approx ${nm(made.diff, 2)}$`,
        `(b) The reading is about $${nf(made.diff, 1)}$ Celsius degrees ${above ? 'above' : 'below'} the limit.`,
      ],
    };
  },
});

const REFERENTS = [
  { what: 'the temperature at which water freezes', C: 0, F: 32 },
  { what: 'the temperature at which water boils (at sea level)', C: 100, F: 212 },
  { what: 'normal human body temperature', C: 37, F: 98.6 },
  { what: 'a comfortable room temperature', C: 20, F: 68 },
  { what: 'the temperature of a moderate oven for baking cookies', C: 180, F: 350 },
];

const REASONABLE_TEMPS: Array<{ thing: string; right: string; wrong: string[] }> = [
  { thing: 'a hot summer afternoon', right: '$33^\\circ\\text{C}$', wrong: ['$33^\\circ\\text{F}$', '$91^\\circ\\text{C}$', '$-5^\\circ\\text{C}$'] },
  { thing: 'a cold January morning in a northern city', right: '$-25^\\circ\\text{C}$', wrong: ['$25^\\circ\\text{C}$', '$60^\\circ\\text{F}$', '$-80^\\circ\\text{C}$'] },
  { thing: 'a cup of hot coffee', right: '$70^\\circ\\text{C}$', wrong: ['$70^\\circ\\text{F}$', '$7^\\circ\\text{C}$', '$300^\\circ\\text{C}$'] },
  { thing: 'the inside of a household fridge', right: '$4^\\circ\\text{C}$', wrong: ['$4^\\circ\\text{F}$', '$40^\\circ\\text{C}$', '$-30^\\circ\\text{C}$'] },
  { thing: 'a restaurant’s walk-in freezer', right: '$-18^\\circ\\text{C}$', wrong: ['$18^\\circ\\text{C}$', '$40^\\circ\\text{F}$', '$-80^\\circ\\text{F}$'] },
  { thing: 'the water in a hot tub', right: '$39^\\circ\\text{C}$', wrong: ['$39^\\circ\\text{F}$', '$80^\\circ\\text{C}$', '$15^\\circ\\text{C}$'] },
  { thing: 'an oven baking bread', right: '$375^\\circ\\text{F}$', wrong: ['$375^\\circ\\text{C}$', '$37^\\circ\\text{F}$', '$100^\\circ\\text{F}$'] },
  { thing: 'a comfortable office', right: '$21^\\circ\\text{C}$', wrong: ['$21^\\circ\\text{F}$', '$40^\\circ\\text{C}$', '$5^\\circ\\text{C}$'] },
  { thing: 'a child with a fever', right: '$39^\\circ\\text{C}$', wrong: ['$39^\\circ\\text{F}$', '$102^\\circ\\text{C}$', '$30^\\circ\\text{C}$'] },
  { thing: 'hot asphalt being laid on a new road', right: '$150^\\circ\\text{C}$', wrong: ['$15^\\circ\\text{C}$', '$150^\\circ\\text{F}$', '$1500^\\circ\\text{C}$'] },
  { thing: 'a pleasant spring day', right: '$15^\\circ\\text{C}$', wrong: ['$15^\\circ\\text{F}$', '$45^\\circ\\text{C}$', '$-30^\\circ\\text{C}$'] },
  { thing: 'oil in a deep fryer cooking fries', right: '$180^\\circ\\text{C}$', wrong: ['$180^\\circ\\text{F}$', '$18^\\circ\\text{C}$', '$800^\\circ\\text{C}$'] },
];

const SAME_PAIRS: Array<[number, number]> = [[0, 32], [100, 212], [-40, -40], [10, 50], [20, 68], [30, 86], [-10, 14], [-20, -4], [25, 77], [40, 104], [-30, -22], [15, 59], [5, 41]];

const tempReason = skill({
  id: 'm103-temp-reason',
  name: 'Reasoning about temperature',
  description: 'Use temperature referents to judge whether a temperature is reasonable, compare temperatures in both scales and check estimates.',
  outcomes: ['M1', 'M2'],
  lessonId: 'm103-3-4',
  format: 'mc',
  gen(rng, d) {
    const n = rng.pick(NAMES);
    if (d === 1) {
      const r = rng.pick(REFERENTS);
      const inC = rng.chance(0.5);
      const deg = inC ? cDeg : fDeg;
      const right = `$${deg(inC ? r.C : r.F)}$`;
      const others = rng.shuffle(REFERENTS.filter((x) => x !== r)).map((x) => `$${deg(inC ? x.C : x.F)}$`);
      const wrongScale = `$${deg(inC ? r.F : r.C)}$`;
      return {
        prompt: `Which temperature is closest to ${r.what}?`,
        parts: [{ answer: mc(rng, right, [wrongScale, ...others]) }],
        hints: ['Learn a few referents in both scales: water freezes at $0^\\circ\\text{C}$ ($32^\\circ\\text{F}$) and boils at $100^\\circ\\text{C}$ ($212^\\circ\\text{F}$).', 'Body temperature is about $37^\\circ\\text{C}$ ($98.6^\\circ\\text{F}$), a room is about $20^\\circ\\text{C}$ ($68^\\circ\\text{F}$) and a moderate oven is about $180^\\circ\\text{C}$ ($350^\\circ\\text{F}$).'],
        solution: [`The referent for ${r.what} is $${cDeg(r.C)}$, which is about $${fDeg(r.F)}$.`, `Be careful: $${deg(inC ? r.F : r.C)}$ uses the right number with the wrong scale.`, `The answer is ${right}.`],
      };
    }
    if (d === 2) {
      if (rng.chance(0.55)) {
        const r = rng.pick(REASONABLE_TEMPS);
        return {
          prompt: `Which temperature is reasonable for ${r.thing}?`,
          parts: [{ answer: mc(rng, r.right, r.wrong) }],
          hints: ['Check the scale first: is the temperature in °C or °F?', 'Compare with referents: $0^\\circ\\text{C} = 32^\\circ\\text{F}$ (freezing), $20^\\circ\\text{C} \\approx 68^\\circ\\text{F}$ (room), $37^\\circ\\text{C} \\approx 98.6^\\circ\\text{F}$ (body), $100^\\circ\\text{C} = 212^\\circ\\text{F}$ (boiling).'],
          solution: ['Compare each choice with a referent you know, paying attention to whether it is in °C or °F.', 'The wrong choices are much too hot, much too cold, or use the right number with the wrong scale.', `A reasonable temperature for ${r.thing} is ${r.right}.`],
        };
      }
      const same = rng.chance(0.2);
      const pair = same
        ? rng.pick(SAME_PAIRS)
        : retry(
            () => [rng.int(-30, 40), rng.int(-20, 100)] as [number, number],
            ([c, f]) => Math.abs(c - toC(f)) >= 3,
          );
      const [c, f] = pair;
      const warmer = rng.chance(0.5);
      const cFirst = rng.chance(0.5);
      const opts = cFirst ? [`$${cDeg(c)}$`, `$${fDeg(f)}$`] : [`$${fDeg(f)}$`, `$${cDeg(c)}$`];
      const fc = toC(f);
      const cWins = warmer ? c > fc : c < fc;
      const idx = same ? 2 : cWins === cFirst ? 0 : 1;
      return {
        prompt: `Which temperature is ${warmer ? 'warmer' : 'colder'}: ${opts[0]} or ${opts[1]}?`,
        parts: [{ answer: fixedChoice([...opts, 'They are the same temperature'], idx) }],
        hints: ['You cannot compare the numbers directly, because the scales are different.', `Change the Fahrenheit temperature to Celsius with ${C_FORMULA} (or use referents), then compare.`],
        solution: [
          `$C = \\tfrac{5}{9}(${nm(f)} - 32) ${same ? '=' : '\\approx'} ${nm(fc, 1)}$, so $${fDeg(f)} ${same ? '=' : '\\approx'} ${nm(fc, 1)}^\\circ\\text{C}$.`,
          same ? `Both temperatures equal $${cDeg(c)}$.` : `Compare $${cDeg(c)}$ with $${nm(fc, 1)}^\\circ\\text{C}$.`,
          same ? 'They are the same temperature.' : `So $${cWins ? cDeg(c) : fDeg(f)}$ is ${warmer ? 'warmer' : 'colder'}.`,
        ],
      };
    }
    const mode = rng.pick(['rule-check', 'rule-check', 'reverse-rule', 'rule-exact'] as const);
    if (mode === 'rule-check') {
      const c = rng.pick([-30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40]);
      const est = 2 * c + 30;
      const ex = toF(c);
      const diff = Math.round(est - ex);
      const say = (delta: number) => (delta === 0 ? 'The estimate is exactly right' : `The estimate is too ${delta > 0 ? 'high' : 'low'} by $${Math.abs(delta)}$ Fahrenheit degrees`);
      const correct = say(diff);
      const distract = diff === 0 ? [say(2), say(-2), say(4)] : [say(-diff), say(0), say(diff > 0 ? diff + 2 : diff - 2)];
      return {
        prompt: `${n} uses the quick rule “double it and add 30” to estimate $${cDeg(c)}$ in degrees Fahrenheit. How does the estimate compare with the exact value from ${F_FORMULA}?`,
        parts: [{ answer: mc(rng, correct, distract) }],
        hints: ['Work out the estimate: $2 \\times C + 30$.', 'Work out the exact value: $\\tfrac{9}{5}C + 32$. Then subtract.'],
        solution: [`Estimate: $2(${nm(c)}) + 30 = ${est}^\\circ\\text{F}$`, `Exact: $\\tfrac{9}{5}(${nm(c)}) + 32 = ${nm(ex)}^\\circ\\text{F}$`, `$${est} - (${nm(ex)}) = ${diff}$`, `${correct}.`],
      };
    }
    if (mode === 'reverse-rule') {
      const f = rng.pick([40, 44, 50, 56, 60, 64, 70, 76, 80, 86, 90, 96, 100]);
      const est = (f - 30) / 2;
      const ex = Math.round(toC(f));
      const wEst = f / 2 - 30;
      const wEx = Math.round((5 / 9) * f - 32);
      const opt = (e: number, x: number) => `Estimate $${nm(e)}^\\circ\\text{C}$; exact value about $${nm(x)}^\\circ\\text{C}$`;
      return {
        prompt: `To change Fahrenheit to Celsius in their head, ${n} uses the quick rule “subtract 30, then divide by 2”. What estimate does the rule give for $${fDeg(f)}$, and what is the exact value from ${C_FORMULA}, to the nearest degree?`,
        parts: [{ answer: mc(rng, opt(est, ex), [opt(wEst, ex), opt(est, wEx), opt(wEst, wEx)]) }],
        hints: ['Follow the rule in order: subtract 30 first, then halve.', 'For the exact value, subtract 32 first (it is in brackets), then multiply by $\\tfrac{5}{9}$.'],
        solution: [`Estimate: $(${f} - 30) \\div 2 = ${nm(est)}^\\circ\\text{C}$`, `Exact: $\\tfrac{5}{9}(${f} - 32) = \\tfrac{5}{9}(${f - 32}) \\approx ${nm(toC(f), 1)}^\\circ\\text{C}$, about $${ex}^\\circ\\text{C}$.`, `${opt(est, ex)}. The estimate is close enough for deciding what to wear, but not for a recipe or a medical reading.`],
      };
    }
    return {
      prompt: `${n} checks the quick rule “double it and add 30” against the exact formula ${F_FORMULA}. For which Celsius temperature does the quick rule give **exactly** the right Fahrenheit temperature?`,
      parts: [{ answer: mc(rng, `$${cDeg(10)}$`, [`$${cDeg(0)}$`, `$${cDeg(30)}$`, `$${cDeg(-40)}$`]) }],
      hints: ['Set the two expressions equal: $2C + 30 = \\tfrac{9}{5}C + 32$.', 'Or test each choice in both expressions and see which gives the same answer.'],
      solution: ['Set the rule equal to the formula: $2C + 30 = 1.8C + 32$.', 'Subtract $1.8C$ and 30 from both sides: $0.2C = 2$, so $C = 10$.', `Check: $2(10) + 30 = 50$ and $1.8(10) + 32 = 50$. The rule is exact at $${cDeg(10)}$.`],
    };
  },
});

export const UNIT_SYSTEM_SKILLS: SkillDef[] = [siPrefix, siConvert, siCapacityVolume, impLength, impMassCapacity, usUkCapacity, siToImp, impToSi, tempConvert, tempReason];
