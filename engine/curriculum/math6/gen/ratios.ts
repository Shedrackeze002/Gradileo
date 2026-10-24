/** Math 6 Unit 5 — Ratios, Rates and Percents (N8). */
import { fixedChoice, mc, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { gcd } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type Out = GenOutput;

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Kiona', 'Liam', 'Mei', 'Tariq', 'Sofia', 'Aiden', 'Nadia', 'Ravi',
  'Chloé', 'Dakota', 'Hamid', 'Jasmine', 'Wei', 'Olivia', 'Kwame', 'Simran', 'Ethan', 'Fatima', 'Noah',
  'Leilani', 'Émilie', 'Tyler', 'Aaliyah', 'Connor', 'Anika', 'Gurpreet', 'Marcus', 'Ayesha', 'Owen',
  'Sienna', 'Jun', 'Malik', 'Harpreet', 'Isabelle', 'Talia', 'Yusuf', 'Rosalie', 'Nathan', 'Tanis',
];
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater', 'Oakridge', 'Millbrook'];

const T = '\\times';
const D = '\\div';
const fr = (n: number | string, d: number | string) => `\\dfrac{${n}}{${d}}`;
const ratio = (a: number | string, b: number | string) => `${a} : ${b}`;
const pickName = (rng: Rng, not: string[] = []) => rng.pick(NAMES.filter((n) => !not.includes(n)));
/** Money for Markdown text (outside maths): \$4.50, or \$12 for whole dollars when `whole` is set. */
const money = (x: number, whole = false) => (whole && Number.isInteger(x) ? `\\$${x}` : `\\$${x.toFixed(2)}`);
/** A number with exactly two decimals inside maths (prices without the dollar sign). */
const m2 = (x: number) => x.toFixed(2);
const r2 = (x: number) => Math.round(x * 100) / 100;
/** A whole number inside maths, with a comma for 5 or more digits: 11{,}400. */
const N = (x: number) => (Math.abs(x) >= 10000 ? String(x).replace(/\B(?=(\d{3})+(?!\d))/g, '{,}') : String(x));

/** A money answer to the cent. */
const centsPart = (value: number, label = '\\$'): Part => numPart(value, { decimals: 2, tolerance: 0.011, label });
const CENT = 'Give your answer to the nearest cent.';

/** A ratio table drawn horizontally: one row per quantity. */
function ratioTable(top: string, bottom: string, cols: Array<[string, string]>): Figure {
  return { type: 'table', headers: [top, bottom], rows: cols, horizontal: true };
}

// ---------------------------------------------------------------------------
// 5.1 Equivalent ratios and proportions
// ---------------------------------------------------------------------------

/** A ratio p : q in simplest form with small terms. */
function simplest(rng: Rng, max = 9, min = 1): [number, number] {
  return retry(
    () => [rng.int(min, max), rng.int(min, max)] as [number, number],
    ([p, q]) => p !== q && gcd(p, q) === 1 && !(p === 1 && q === 1),
  );
}

const YES_NO = ['Yes, they are equivalent', 'No, they are not equivalent'];

function areEquivalentD1(rng: Rng): Out {
  const [p, q] = simplest(rng, 6);
  const k = rng.int(2, 5);
  const eq = rng.chance(0.55);
  const wrong = rng.pick(['add', 'one'] as const);
  const [c, d] = eq ? [p * k, q * k] : wrong === 'add' ? [p + k, q + k] : [p * k, q * k + rng.pick([-1, 1])];
  const fp = c / p;
  const fq = d / q;
  return {
    prompt: `Are the ratios $${ratio(p, q)}$ and $${ratio(c, d)}$ equivalent?`,
    parts: [{ answer: fixedChoice(YES_NO, eq ? 0 : 1) }],
    hints: ['Equivalent ratios come from multiplying (or dividing) **both** terms by the same number.', `What do you multiply $${p}$ by to get $${c}$? Is it the same number that takes $${q}$ to $${d}$?`],
    solution: [
      Number.isInteger(fp) ? `First terms: $${p} ${T} ${fp} = ${c}$.` : `First terms: $${p}$ does not multiply by a natural number to give $${c}$.`,
      Number.isInteger(fq) ? `Second terms: $${q} ${T} ${fq} = ${d}$.` : `Second terms: $${q}$ does not multiply by a natural number to give $${d}$.`,
      eq
        ? `Both terms are multiplied by $${k}$, so the ratios are equivalent.`
        : wrong === 'add'
          ? `Adding $${k}$ to both terms does not make an equivalent ratio. The terms are not multiplied by the same number, so the ratios are not equivalent.`
          : `The terms are not multiplied by the same number, so the ratios are not equivalent.`,
      eq ? `Yes, $${ratio(p, q)}$ and $${ratio(c, d)}$ are equivalent.` : `No, $${ratio(p, q)}$ and $${ratio(c, d)}$ are not equivalent.`,
    ],
  };
}

function missingTermD1(rng: Rng): Out {
  const [p, q] = simplest(rng, 8);
  const k = rng.int(2, 6);
  const missFirst = rng.chance(0.5);
  const ans = missFirst ? p * k : q * k;
  const right = missFirst ? ratio('?', q * k) : ratio(p * k, '?');
  const useTable = rng.chance(0.4);
  const c = rng.pick([
    { top: 'Cups of flour', bottom: 'Cups of milk' },
    { top: 'Red beads', bottom: 'White beads' },
    { top: 'Blue paint (cans)', bottom: 'White paint (cans)' },
    { top: 'Boys', bottom: 'Girls' },
  ]);
  if (useTable) {
    const cols: Array<[string, string]> = [];
    for (let i = 1; i <= Math.min(k, 3); i++) cols.push([`${p * i}`, `${q * i}`]);
    if (k > 3) cols.push(missFirst ? ['?', `${q * k}`] : [`${p * k}`, '?']);
    else cols[cols.length - 1] = missFirst ? ['?', `${q * k}`] : [`${p * k}`, '?'];
    return {
      prompt: `The ratio table shows equivalent ratios of ${c.top.toLowerCase()} to ${c.bottom.toLowerCase()}. What number goes in place of the "?"`,
      figure: ratioTable(c.top, c.bottom, cols),
      parts: [numPart(ans, { exact: false, label: '? =' })],
      hints: [`The first column shows the ratio $${ratio(p, q)}$.`, `Find the number that multiplies $${missFirst ? q : p}$ to give $${missFirst ? q * k : p * k}$. Multiply the other term by it too.`],
      solution: [
        `The table starts with $${ratio(p, q)}$.`,
        `In the last column, ${missFirst ? `$${q} ${T} ${k} = ${q * k}$` : `$${p} ${T} ${k} = ${p * k}$`}. So multiply both terms by $${k}$.`,
        `${missFirst ? `$${p} ${T} ${k} = ${p * k}$` : `$${q} ${T} ${k} = ${q * k}$`}`,
        `The missing number is $${ans}$.`,
      ],
    };
  }
  return {
    prompt: `Find the missing term so that the ratios are equivalent: $${ratio(p, q)} = ${right}$`,
    parts: [numPart(ans, { exact: false, label: '? =' })],
    hints: ['Multiply both terms of a ratio by the same number to get an equivalent ratio.', `What number multiplies $${missFirst ? q : p}$ to give $${missFirst ? q * k : p * k}$?`],
    solution: [
      missFirst ? `The second term changed from $${q}$ to $${q * k}$: $${q} ${T} ${k} = ${q * k}$.` : `The first term changed from $${p}$ to $${p * k}$: $${p} ${T} ${k} = ${p * k}$.`,
      `Multiply the other term by $${k}$ too: ${missFirst ? `$${p} ${T} ${k} = ${p * k}$` : `$${q} ${T} ${k} = ${q * k}$`}.`,
      `$${ratio(p, q)} = ${ratio(p * k, q * k)}$, so the missing term is $${ans}$.`,
    ],
  };
}

function areEquivalentD2(rng: Rng): Out {
  const [p, q] = simplest(rng, 5);
  const [k1, k2] = retry(() => [rng.int(2, 6), rng.int(2, 7)], ([x, y]) => x !== y && x % y !== 0 && y % x !== 0);
  const eq = rng.chance(0.55);
  const a = p * k1;
  const b = q * k1;
  const c = p * k2;
  const d = eq ? q * k2 : q * k2 + rng.pick([-1, 1]) * (q === 1 ? 1 : rng.pick([1, 2]));
  const g1 = gcd(a, b);
  const g2 = gcd(c, d);
  const s2: [number, number] = [c / g2, d / g2];
  return {
    prompt: `Are the ratios $${ratio(a, b)}$ and $${ratio(c, d)}$ equivalent?`,
    parts: [{ answer: fixedChoice(YES_NO, eq ? 0 : 1) }],
    hints: ['Write each ratio in simplest form: divide both terms by their greatest common factor.', 'If the simplest forms match, the ratios are equivalent.'],
    solution: [
      `$${ratio(a, b)}$: divide both terms by $${g1}$ to get $${ratio(p, q)}$.`,
      g2 === 1 ? `$${ratio(c, d)}$: $${c}$ and $${d}$ have no common factor except $1$, so it is already in simplest form.` : `$${ratio(c, d)}$: divide both terms by $${g2}$ to get $${ratio(s2[0], s2[1])}$.`,
      eq ? `Both simplify to $${ratio(p, q)}$, so they show the same relationship.` : `$${ratio(p, q)}$ and $${ratio(s2[0], s2[1])}$ are different.`,
      eq ? `Yes, the ratios are equivalent.` : `No, the ratios are not equivalent.`,
    ],
  };
}

function proportionD2(rng: Rng): Out {
  const [p, q] = simplest(rng, 5);
  const [k1, k2] = retry(() => [rng.int(2, 5), rng.int(2, 8)], ([x, y]) => x !== y && y % x !== 0);
  const a = p * k1;
  const b = q * k1;
  const missFirst = rng.chance(0.5);
  const c = missFirst ? '?' : p * k2;
  const d = missFirst ? q * k2 : '?';
  const ans = missFirst ? p * k2 : q * k2;
  return {
    prompt: `Solve the proportion: $${fr(a, b)} = ${fr(c, d)}$`,
    parts: [numPart(ans, { exact: false, label: '? =' })],
    hints: [`Write $${fr(a, b)}$ in simplest form first.`, `$${fr(a, b)} = ${fr(p, q)}$. What do you multiply $${missFirst ? q : p}$ by to get $${missFirst ? q * k2 : p * k2}$?`],
    solution: [
      `A proportion says two ratios are equivalent: $${ratio(a, b)} = ${ratio(c, d)}$.`,
      `Simplify the first ratio: divide both terms by $${k1}$. $${fr(a, b)} = ${fr(p, q)}$.`,
      missFirst ? `$${q} ${T} ${k2} = ${q * k2}$, so multiply the top by $${k2}$ too: $${p} ${T} ${k2} = ${p * k2}$.` : `$${p} ${T} ${k2} = ${p * k2}$, so multiply the bottom by $${k2}$ too: $${q} ${T} ${k2} = ${q * k2}$.`,
      `$${fr(a, b)} = ${fr(p * k2, q * k2)}$. The missing term is $${ans}$.`,
    ],
  };
}

function whichEquivalent(rng: Rng): Out {
  const [p, q] = simplest(rng, 7);
  const k = rng.int(2, 5);
  const correct = `$${ratio(p * k, q * k)}$`;
  const ds = [`$${ratio(p + k, q + k)}$`, `$${ratio(q * k, p * k)}$`, `$${ratio(p * k, q + k)}$`, `$${ratio(p * k, q * k + 1)}$`];
  return {
    prompt: `Which ratio is equivalent to $${ratio(p, q)}$?`,
    parts: [{ answer: mc(rng, correct, ds) }],
    hints: ['Multiply both terms by the same number.', 'Adding the same number to both terms does not make an equivalent ratio. The order of the terms matters too.'],
    solution: [`Multiply both terms of $${ratio(p, q)}$ by $${k}$: $${p} ${T} ${k} = ${p * k}$ and $${q} ${T} ${k} = ${q * k}$.`, `The equivalent ratio is $${ratio(p * k, q * k)}$.`],
  };
}

interface RatioCtx {
  a: string;
  b: string;
  text: (p: number, q: number, name: string) => string;
  ask: (known: number, knownIsA: boolean) => string;
  unitA: string;
  unitB: string;
}

const RATIO_CTX: RatioCtx[] = [
  {
    a: 'flour', b: 'milk', unitA: 'cups of flour', unitB: 'cups of milk',
    text: (p, q, name) => `${name}'s pancake recipe uses $${p}$ cups of flour for every $${q}$ cups of milk.`,
    ask: (n, knownA) => (knownA ? `How many cups of milk go with $${n}$ cups of flour?` : `How many cups of flour go with $${n}$ cups of milk?`),
  },
  {
    a: 'blue', b: 'white', unitA: 'cans of blue paint', unitB: 'cans of white paint',
    text: (p, q) => `To make sky blue paint for a mural, mix $${p}$ cans of blue paint with $${q}$ cans of white paint.`,
    ask: (n, knownA) => (knownA ? `How many cans of white paint go with $${n}$ cans of blue paint?` : `How many cans of blue paint go with $${n}$ cans of white paint?`),
  },
  {
    a: 'red', b: 'white', unitA: 'red beads', unitB: 'white beads',
    text: (p, q, name) => `${name}'s beadwork pattern uses $${p}$ red beads for every $${q}$ white beads.`,
    ask: (n, knownA) => (knownA ? `How many white beads go with $${n}$ red beads?` : `How many red beads go with $${n}$ white beads?`),
  },
  {
    a: 'juice', b: 'water', unitA: 'cups of juice', unitB: 'cups of water',
    text: (p, q) => `A fruit punch for a school dance uses $${p}$ cups of juice for every $${q}$ cups of sparkling water.`,
    ask: (n, knownA) => (knownA ? `How many cups of sparkling water go with $${n}$ cups of juice?` : `How many cups of juice go with $${n}$ cups of sparkling water?`),
  },
];

function ratioProblem(rng: Rng): Out {
  const kind = rng.pick(['scale', 'scale', 'total'] as const);
  const name = pickName(rng);
  if (kind === 'scale') {
    const c = rng.pick(RATIO_CTX);
    const [p, q] = simplest(rng, 5, 2);
    const [k1, k2] = retry(() => [rng.int(1, 3), rng.int(2, 6)], ([x, y]) => x !== y && (x === 1 || y % x !== 0));
    // Recipe ratio p*k1 : q*k1 (sometimes not in simplest form), scaled to k2.
    const A = p * k1;
    const B = q * k1;
    const knownA = rng.chance(0.5);
    const known = knownA ? p * k2 : q * k2;
    const ans = knownA ? q * k2 : p * k2;
    return {
      prompt: `${c.text(A, B, name)} ${c.ask(known, knownA)}`,
      parts: [numPart(ans, { exact: false, suffix: knownA ? c.unitB.split(' of ')[0] : c.unitA.split(' of ')[0] })],
      hints: [`Write a proportion: $${fr(A, B)} = ${knownA ? fr(known, '?') : fr('?', known)}$.`, k1 > 1 ? `Simplify $${ratio(A, B)}$ to $${ratio(p, q)}$ first. Then multiply both terms by the same number.` : 'Multiply both terms of the ratio by the same number.'],
      solution: [
        `The ratio of ${c.unitA.replace(/^cans of |^cups of /, '')} to ${c.unitB.replace(/^cans of |^cups of /, '')} is $${ratio(A, B)}$.`,
        ...(k1 > 1 ? [`Simplify: divide both terms by $${k1}$ to get $${ratio(p, q)}$.`] : []),
        knownA ? `$${p} ${T} ${k2} = ${known}$, so multiply the other term by $${k2}$ too: $${q} ${T} ${k2} = ${ans}$.` : `$${q} ${T} ${k2} = ${known}$, so multiply the other term by $${k2}$ too: $${p} ${T} ${k2} = ${ans}$.`,
        `So $${ratio(A, B)} = ${knownA ? ratio(known, ans) : ratio(ans, known)}$.`,
        `The answer is $${ans}$ ${knownA ? c.unitB : c.unitA}.`,
      ],
    };
  }
  // part-part ratio with one part given, find the total
  const c = rng.pick([
    { a: 'boys', b: 'girls', whole: 'students', ask: 'How many students are in the class?', text: (p: number, q: number) => `In a Grade 6 class in ${rng.pick(TOWNS)}, the ratio of boys to girls is $${ratio(p, q)}$.` },
    { a: 'cats', b: 'dogs', whole: 'animals', ask: 'How many cats and dogs are there in all?', text: (p: number, q: number) => `At an animal shelter, the ratio of cats to dogs is $${ratio(p, q)}$.` },
    { a: 'fiction books', b: 'non-fiction books', whole: 'books', ask: 'How many books are there in all?', text: (p: number, q: number) => `In ${name}'s classroom library, the ratio of fiction books to non-fiction books is $${ratio(p, q)}$.` },
    { a: 'wins', b: 'losses', whole: 'games', ask: 'How many games did the team play?', text: (p: number, q: number) => `A hockey team's ratio of wins to losses is $${ratio(p, q)}$. The team had no ties.` },
  ]);
  const [p, q] = simplest(rng, 5, 2);
  const k = rng.int(2, 6);
  const knownA = rng.chance(0.5);
  const known = knownA ? p * k : q * k;
  const other = knownA ? q * k : p * k;
  const total = known + other;
  return {
    prompt: `${c.text(p, q)} There are $${known}$ ${knownA ? c.a : c.b}. ${c.ask}`,
    parts: [numPart(total, { exact: false, suffix: c.whole })],
    hints: [`First use the ratio to find the number of ${knownA ? c.b : c.a}.`, `$${knownA ? p : q} ${T} ${k} = ${known}$. Multiply the other term by $${k}$ too, then add.`],
    solution: [
      `The ratio is $${ratio(p, q)}$. The ${knownA ? 'first' : 'second'} term, $${knownA ? p : q}$, became $${known}$: $${knownA ? p : q} ${T} ${k} = ${known}$.`,
      `Multiply the other term by $${k}$: $${knownA ? q : p} ${T} ${k} = ${other}$. There are $${other}$ ${knownA ? c.b : c.a}.`,
      `Total: $${known} + ${other} = ${total}$.`,
      `There are $${total}$ ${c.whole} in all.`,
    ],
  };
}

const equivalentRatios = skill({
  id: 'm6-equivalent-ratios',
  name: 'Equivalent ratios and proportions',
  description: 'Decide whether two ratios are equivalent, find a missing term with a proportion, and solve ratio problems.',
  outcomes: ['N8'],
  lessonId: 'm6-5-1',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return rng.chance(0.45) ? areEquivalentD1(rng) : missingTermD1(rng);
    if (d === 2) return rng.pick([areEquivalentD2, proportionD2, proportionD2, whichEquivalent])(rng);
    return ratioProblem(rng);
  },
});

// ---------------------------------------------------------------------------
// 5.2 Rates and unit rates
// ---------------------------------------------------------------------------

interface RateCtx {
  /** Unit of the unit rate, e.g. km/h. */
  unit: string;
  text: (total: number, n: number, name: string) => string;
  ask: string;
  ans: (r: number) => string;
  per: string;
  /** Unit rate range and count range. */
  rate: [number, number];
  count: [number, number];
}

const RATE_CTX: RateCtx[] = [
  { unit: 'km/h', per: 'hour', text: (t, n) => `A train travels $${t}$ km in $${n}$ h.`, ask: 'What is its speed in kilometres per hour?', ans: (r) => `The speed is $${r}$ km/h.`, rate: [60, 120], count: [2, 5] },
  { unit: 'km/h', per: 'hour', text: (t, n, name) => `${name} cycles $${t}$ km in $${n}$ h on a forest trail.`, ask: 'What is the speed in kilometres per hour?', ans: (r) => `The speed is $${r}$ km/h.`, rate: [12, 25], count: [2, 4] },
  { unit: '$/h', per: 'hour', text: (t, n, name) => `${name} earns \\$${t} for $${n}$ hours of babysitting.`, ask: 'How much does that pay per hour?', ans: (r) => `That is \\$${r} per hour.`, rate: [8, 15], count: [2, 6] },
  { unit: 'pages/day', per: 'day', text: (t, n, name) => `${name} reads $${t}$ pages in $${n}$ days.`, ask: 'How many pages is that per day?', ans: (r) => `That is $${r}$ pages per day.`, rate: [12, 40], count: [3, 7] },
  { unit: 'L/min', per: 'minute', text: (t, n) => `A hose fills a $${t}$ L pool in $${n}$ minutes.`, ask: 'How many litres flow out of the hose per minute?', ans: (r) => `That is $${r}$ L per minute.`, rate: [8, 20], count: [5, 9] },
  { unit: 'beats/min', per: 'minute', text: (t, n, name) => `After a soccer game, ${name}'s heart beats $${t}$ times in $${n}$ minutes.`, ask: 'How many beats is that per minute?', ans: (r) => `That is $${r}$ beats per minute.`, rate: [70, 110], count: [2, 3] },
];

function unitRateD1(rng: Rng): Out {
  const c = rng.pick(RATE_CTX);
  const name = pickName(rng);
  const r = rng.int(c.rate[0], c.rate[1]);
  const n = rng.int(c.count[0], c.count[1]);
  const t = r * n;
  const suffix = c.unit === '$/h' ? 'per hour' : c.unit;
  return {
    prompt: `${c.text(t, n, name)} ${c.ask}`,
    parts: [numPart(r, { exact: false, label: c.unit === '$/h' ? '\\$' : undefined, suffix })],
    hints: [`A unit rate tells how much for **one** ${c.per}.`, `Divide the total by the number of ${c.per}s: $${t} ${D} ${n}$.`],
    solution: [`The rate is $${t}$ for $${n}$ ${c.per}s. To find the amount for $1$ ${c.per}, divide both by $${n}$.`, `$${t} ${D} ${n} = ${r}$`, c.ans(r)],
  };
}

interface PriceCtx {
  item: string;
  items: string;
  pack: (n: number) => string;
  each: [number, number];
}

const PRICE_CTX: PriceCtx[] = [
  { item: 'juice box', items: 'juice boxes', pack: (n) => `A pack of $${n}$ juice boxes`, each: [0.45, 0.95] },
  { item: 'granola bar', items: 'granola bars', pack: (n) => `A box of $${n}$ granola bars`, each: [0.35, 0.85] },
  { item: 'pencil', items: 'pencils', pack: (n) => `A pack of $${n}$ pencils`, each: [0.15, 0.45] },
  { item: 'muffin', items: 'muffins', pack: (n) => `A box of $${n}$ muffins`, each: [1.15, 2.25] },
  { item: 'bottle of water', items: 'bottles of water', pack: (n) => `A case of $${n}$ bottles of water`, each: [0.25, 0.65] },
  { item: 'hockey card', items: 'hockey cards', pack: (n) => `A pack of $${n}$ hockey cards`, each: [0.3, 0.6] },
  { item: 'apple', items: 'apples', pack: (n) => `A bag of $${n}$ apples`, each: [0.4, 0.9] },
];

/** A unit price in cents within the range, and a pack size, with a 3-digit (or smaller) total. */
function pricePack(rng: Rng, c: PriceCtx, counts: number[]): { each: number; n: number; total: number } {
  const fits = counts.filter((n) => n * c.each[1] < 10);
  return retry(
    () => {
      const each = rng.int(Math.round(c.each[0] * 100), Math.round(c.each[1] * 100)) / 100;
      const n = rng.pick(fits);
      return { each, n, total: r2(each * n) };
    },
    (o) => Math.round(o.total * 100) < 1000 && Math.round(o.each * 100) % 5 === 0,
  );
}

function unitPriceD2(rng: Rng): Out {
  const c = rng.pick(PRICE_CTX);
  const { each, n, total } = pricePack(rng, c, [2, 3, 4, 5, 6, 8, 10, 12]);
  return {
    prompt: `${c.pack(n)} costs ${money(total)}. What is the unit price, the cost of one ${c.item}? ${CENT}`,
    parts: [centsPart(each)],
    hints: ['The unit price is the cost of **one** item.', `Divide the total cost by the number of ${c.items}: $${m2(total)} ${D} ${n}$.`],
    solution: [`Unit price = total cost $${D}$ number of ${c.items}.`, `$${m2(total)} ${D} ${n} = ${m2(each)}$`, `Check: $${m2(each)} ${T} ${n} = ${m2(total)}$.`, `The unit price is ${money(each)} per ${c.item}.`],
  };
}

function speedD2(rng: Rng): Out {
  const name = pickName(rng);
  const c = rng.pick([
    { who: (n: string) => `${n}'s family drives`, from: () => `from ${rng.pick(['Riverton', 'Lakeside'])} to ${rng.pick(['Pinewood', 'Maple Falls', 'Hillcrest', 'Westbury', 'Stonebridge'])}`, rate: [70, 100] as [number, number], h: [2, 4] as [number, number] },
    { who: () => 'A bus travels', from: () => `between two towns`, rate: [60, 90] as [number, number], h: [2, 5] as [number, number] },
    { who: () => 'A small plane flies', from: () => `from ${rng.pick(['Northfield', 'Clearwater', 'Ashford'])} to Riverton`, rate: [150, 240] as [number, number], h: [2, 4] as [number, number] },
  ]);
  const r = rng.int(c.rate[0], c.rate[1]);
  const h = rng.int(c.h[0], c.h[1]);
  const dist = r * h;
  return {
    prompt: `${c.who(name)} $${dist}$ km ${c.from()} in $${h}$ h. What is the average speed in kilometres per hour (km/h)?`,
    parts: [numPart(r, { exact: false, suffix: 'km/h' })],
    hints: ['Speed is a unit rate: the distance travelled in **one** hour.', `Divide the distance by the time: $${dist} ${D} ${h}$.`],
    solution: [`Speed = distance $${D}$ time.`, `$${dist} ${D} ${h} = ${r}$`, `The average speed is $${r}$ km/h.`],
  };
}

function rateTableD2(rng: Rng): Out {
  const c = rng.pick([
    { top: 'Distance (km)', bottom: 'Time (h)', unit: 'km/h', words: 'kilometres per hour', r: [40, 90] as [number, number] },
    { top: 'Pages read', bottom: 'Days', unit: 'pages/day', words: 'pages per day', r: [15, 35] as [number, number] },
    { top: 'Water (L)', bottom: 'Time (min)', unit: 'L/min', words: 'litres per minute', r: [6, 15] as [number, number] },
  ]);
  const r = rng.int(c.r[0], c.r[1]);
  const ns = rng.sample([2, 3, 4, 5, 6, 8], 3).sort((a, b) => a - b);
  return {
    prompt: `The table shows equivalent ratios for a rate. What is the unit rate in ${c.words}?`,
    figure: ratioTable(c.top, c.bottom, ns.map((n) => [`${r * n}`, `${n}`])),
    parts: [numPart(r, { exact: false, suffix: c.unit })],
    hints: ['A unit rate has a second term of $1$.', `Divide any column: $${r * ns[0]} ${D} ${ns[0]}$.`],
    solution: [`Use the first column: $${ratio(r * ns[0], ns[0])}$.`, `Divide both terms by $${ns[0]}$: $${r * ns[0]} ${D} ${ns[0]} = ${r}$ and $${ns[0]} ${D} ${ns[0]} = 1$.`, `Check another column: $${r * ns[1]} ${D} ${ns[1]} = ${r}$.`, `The unit rate is $${r}$ ${c.unit}.`],
  };
}

function rateProblemD3(rng: Rng): Out {
  const kind = rng.pick(['better', 'extend-price', 'extend-speed', 'time'] as const);
  const name = pickName(rng);
  if (kind === 'better') {
    const c = rng.pick(PRICE_CTX);
    const [n1, n2] = rng.sample([2, 3, 4, 5, 6, 8, 10, 12].filter((n) => n * c.each[1] < 10), 2);
    const same = rng.chance(0.12);
    const [e1, e2] = retry(
      () => {
        const lo = Math.round(c.each[0] * 20);
        const hi = Math.round(c.each[1] * 20);
        const a = rng.int(lo, hi) / 20;
        const b = same ? a : rng.int(lo, hi) / 20;
        return [a, b];
      },
      ([a, b]) => (same || a !== b) && Math.round(a * n1 * 100) < 1000 && Math.round(b * n2 * 100) < 1000,
    );
    const t1 = r2(e1 * n1);
    const t2 = r2(e2 * n2);
    const idx = same ? 2 : e1 < e2 ? 0 : 1;
    return {
      prompt: `Two stores in ${rng.pick(TOWNS)} sell ${c.items}. Store A sells $${n1}$ for ${money(t1)}. Store B sells $${n2}$ for ${money(t2)}. Which store has the better buy (the lower unit price)?`,
      parts: [{ answer: fixedChoice(['Store A', 'Store B', 'The unit prices are the same'], idx) }],
      hints: ['Find the unit price at each store: the cost of one item.', 'The lower unit price is the better buy.'],
      solution: [
        `Store A: $${m2(t1)} ${D} ${n1} = ${m2(e1)}$, so ${money(e1)} for one.`,
        `Store B: $${m2(t2)} ${D} ${n2} = ${m2(e2)}$, so ${money(e2)} for one.`,
        same ? 'The unit prices are the same.' : `${money(Math.min(e1, e2))} is less than ${money(Math.max(e1, e2))}.`,
        same ? 'Neither store is a better buy: the unit prices are the same.' : `Store ${idx === 0 ? 'A' : 'B'} has the better buy.`,
      ],
    };
  }
  if (kind === 'extend-price') {
    const c = rng.pick(PRICE_CTX);
    const { each, n, total } = pricePack(rng, c, [2, 4, 5, 6, 8, 10]);
    const m = retry(() => rng.int(2, 15), (x) => x !== n && Math.round(each * x * 100) < 10000);
    const cost = r2(each * m);
    return {
      prompt: `${c.pack(n)} costs ${money(total)}. At the same unit price, how much do $${m}$ ${c.items} cost? ${CENT}`,
      parts: [centsPart(cost)],
      hints: ['First find the unit price: the cost of one item.', `Then multiply the unit price by $${m}$.`],
      solution: [`Unit price: $${m2(total)} ${D} ${n} = ${m2(each)}$, so one costs ${money(each)}.`, `$${m}$ ${c.items}: $${m2(each)} ${T} ${m} = ${m2(cost)}$.`, `$${m}$ ${c.items} cost ${money(cost)}.`],
    };
  }
  const r = rng.int(6, 10) * 10;
  const h = rng.int(2, 4);
  const dist = r * h;
  const vehicle = rng.pick(['car', 'bus', 'train']);
  if (kind === 'extend-speed') {
    const h2 = rng.intExcept(2, 7, [h]);
    return {
      prompt: `A ${vehicle} travels $${dist}$ km in $${h}$ h. At the same speed, how far does it travel in $${h2}$ h?`,
      parts: [numPart(r * h2, { exact: false, suffix: 'km' })],
      hints: ['First find the unit rate: the distance in **one** hour.', `Then multiply by $${h2}$.`],
      solution: [`Unit rate: $${dist} ${D} ${h} = ${r}$, so the speed is $${r}$ km/h.`, `In $${h2}$ h: $${r} ${T} ${h2} = ${r * h2}$.`, `The ${vehicle} travels $${r * h2}$ km.`],
    };
  }
  const h2 = rng.intExcept(2, 8, [h]);
  return {
    prompt: `${name}'s family drives $${dist}$ km in $${h}$ h on the way to a camping trip. At the same speed, how many hours will it take to drive $${r * h2}$ km?`,
    parts: [numPart(h2, { exact: false, suffix: 'h' })],
    hints: ['First find the speed: the distance in one hour.', `Then ask: how many groups of that distance make $${r * h2}$ km?`],
    solution: [`Speed: $${dist} ${D} ${h} = ${r}$ km/h.`, `Time: $${r * h2} ${D} ${r} = ${h2}$.`, `It will take $${h2}$ h.`],
  };
}

const unitRates = skill({
  id: 'm6-unit-rates',
  name: 'Rates and unit rates',
  description: 'Write a unit rate for a rate, including unit price to the cent and speed in km/h, and use unit rates to solve problems.',
  outcomes: ['N8'],
  lessonId: 'm6-5-2',
  calculator: false,
  gen(rng, d: Difficulty) {
    if (d === 1) return unitRateD1(rng);
    if (d === 2) return rng.pick([unitPriceD2, unitPriceD2, speedD2, rateTableD2])(rng);
    return rateProblemD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 5.3 Percent of a number
// ---------------------------------------------------------------------------

/** The fraction a friendly percent stands for. */
const FRIENDLY_PCT: Record<number, [number, number]> = { 10: [1, 10], 20: [1, 5], 25: [1, 4], 50: [1, 2], 75: [3, 4] };

/** A 10 by 10 hundred grid with the first `p` squares shaded (by columns). */
function hundredGrid(p: number, caption: string): Figure {
  const full = Math.floor(p / 10);
  const extra = p % 10;
  const polylines: Array<{ points: Array<[number, number]>; color?: 'brand' | 'accent' | 'muted'; fill?: boolean }> = [];
  if (full > 0) polylines.push({ points: [[0, 0], [full, 0], [full, 10], [0, 10], [0, 0]], color: 'accent', fill: true });
  if (extra > 0) polylines.push({ points: [[full, 10 - extra], [full + 1, 10 - extra], [full + 1, 10], [full, 10], [full, 10 - extra]], color: 'accent', fill: true });
  return { type: 'plane', grid: { xMin: 0, xMax: 10, yMin: 0, yMax: 10, step: 1 }, hideTickLabels: true, hideAxes: true, polylines, caption };
}

function percentD1(rng: Rng): Out {
  const p = rng.pick([10, 20, 25, 50, 75, 50, 10]);
  const [a, b] = FRIENDLY_PCT[p];
  const n = b * rng.int(b === 2 ? 3 : 2, Math.min(15, Math.floor(120 / b)));
  const ans = (n / b) * a;
  const showGrid = rng.chance(0.35);
  return {
    prompt: `Find $${p}\\%$ of $${n}$.${showGrid ? ` The hundred grid shows $${p}\\%$.` : ''}`,
    figure: showGrid ? hundredGrid(p, `${p} of the 100 squares are shaded`) : undefined,
    parts: [numPart(ans, { exact: false })],
    hints: [`$${p}\\%$ means $${p}$ out of $100$, or $${fr(p, 100)} = ${fr(a, b)}$.`, `Find $${fr(a, b)}$ of $${n}$: divide by $${b}$${a > 1 ? `, then multiply by $${a}$` : ''}.`],
    solution: [
      `$${p}\\% = ${fr(p, 100)} = ${fr(a, b)}$.`,
      a === 1 ? `$${fr(1, b)}$ of $${n}$: $${n} ${D} ${b} = ${ans}$.` : `$${fr(a, b)}$ of $${n}$: $${n} ${D} ${b} = ${n / b}$, then $${a} ${T} ${n / b} = ${ans}$.`,
      `$${p}\\%$ of $${n}$ is $${ans}$.`,
    ],
  };
}

function percentD2(rng: Rng): Out {
  if (rng.chance(0.3)) {
    // relate to a proportion
    const p = rng.pick([20, 30, 40, 60, 70, 80, 90, 15, 35, 45]);
    const n = retry(() => rng.int(2, 18) * 10, (x) => (p * x) % 100 === 0 && x !== 100 && x !== p);
    const ans = (p * n) / 100;
    const correct = `$${fr(p, 100)} = ${fr('x', n)}$`;
    return {
      prompt: `Which proportion can you use to find $${p}\\%$ of $${n}$? Let $x$ be the answer.`,
      parts: [{ answer: mc(rng, correct, [`$${fr(p, n)} = ${fr('x', 100)}$`, `$${fr(100, p)} = ${fr('x', n)}$`, `$${fr(n, 100)} = ${fr(p, 'x')}$`]) }],
      hints: [`A percent compares a number to $100$: $${p}\\% = ${fr(p, 100)}$.`, `The part $x$ compares to the whole, $${n}$, in the same way.`],
      solution: [`$${p}\\%$ means $${p}$ out of $100$.`, `The part, $x$, out of the whole, $${n}$, must be the same ratio: $${fr(p, 100)} = ${fr('x', n)}$.`, `Solving it: $x = ${p} ${T} ${n} ${D} 100 = ${ans}$.`, `The proportion is ${correct}.`],
    };
  }
  const p = rng.pick([5, 15, 30, 35, 40, 45, 60, 65, 70, 80, 90, 95]);
  const n = retry(() => rng.int(2, 40) * 5, (x) => (p * x) % 100 === 0 && x >= 20 && x <= 200);
  const ans = (p * n) / 100;
  const tenth = n / 10;
  const tens = p / 10;
  const useTens = p % 10 === 0;
  return {
    prompt: `Find $${p}\\%$ of $${n}$.`,
    parts: [numPart(ans, { exact: false })],
    hints: ['To find a percent of a number, multiply the number by the percent and divide by $100$.', useTens ? `Or find $10\\%$ first ($${n} ${D} 10$), then multiply by $${tens}$.` : `Find $${p} ${T} ${n}$, then divide by $100$.`],
    solution: [
      `Multiply by the percent and divide by $100$: $${p} ${T} ${n} = ${N(p * n)}$.`,
      `$${N(p * n)} ${D} 100 = ${ans}$`,
      ...(useTens && Number.isInteger(tenth) ? [`Check: $10\\%$ of $${n}$ is $${tenth}$, and $${tens} ${T} ${tenth} = ${ans}$.`] : []),
      `$${p}\\%$ of $${n}$ is $${ans}$.`,
    ],
  };
}

function percentD3(rng: Rng): Out {
  const kind = rng.pick(['sale', 'class', 'quiz', 'tax'] as const);
  const name = pickName(rng);
  if (kind === 'sale') {
    const item = rng.pick(['pair of skates', 'backpack', 'video game', 'hockey stick', 'winter jacket', 'board game']);
    const p = rng.pick([10, 20, 25, 30, 40, 50]);
    const price = retry(() => rng.int(4, 40) * 5, (x) => (p * x) % 100 === 0 && x >= 20 && x <= 150);
    const off = (p * price) / 100;
    const sale = price - off;
    return {
      prompt: `A ${item} costs ${money(price, true)}. It is on sale for $${p}\\%$ off. What is the sale price?`,
      parts: [numPart(sale, { exact: false, label: '\\$' })],
      hints: [`First find $${p}\\%$ of ${money(price, true)}. That is the discount.`, 'Subtract the discount from the regular price.'],
      solution: [`Discount: $${p}\\%$ of $${price}$ is $${p} ${T} ${price} ${D} 100 = ${off}$, so ${money(off, true)} off.`, `Sale price: $${price} - ${off} = ${sale}$.`, `The sale price is ${money(sale, true)}.`],
    };
  }
  if (kind === 'class') {
    const c = rng.pick([
      { whole: 'students in a school', part: 'walk to school', ask: 'How many students do not walk to school?', ans: (x: number) => `$${x}$ students do not walk to school.` },
      { whole: 'students in Grade 6 at a school', part: 'play a winter sport', ask: 'How many students do not play a winter sport?', ans: (x: number) => `$${x}$ students do not play a winter sport.` },
      { whole: 'people at a pancake breakfast', part: 'ask for syrup', ask: 'How many people do not ask for syrup?', ans: (x: number) => `$${x}$ people do not ask for syrup.` },
      { whole: 'trees in a park', part: 'are evergreens', ask: 'How many trees are not evergreens?', ans: (x: number) => `$${x}$ trees are not evergreens.` },
    ]);
    const p = rng.pick([10, 20, 30, 40, 60, 70, 80, 25, 75]);
    const n = retry(() => rng.int(4, 40) * 5, (x) => (p * x) % 100 === 0 && x >= 20 && x <= 200);
    const part = (p * n) / 100;
    return {
      prompt: `There are $${n}$ ${c.whole}. $${p}\\%$ of them ${c.part}. ${c.ask}`,
      parts: [numPart(n - part, { exact: false })],
      hints: [`First find $${p}\\%$ of $${n}$.`, `Then subtract from $${n}$. Or find $${100 - p}\\%$ of $${n}$ directly.`],
      solution: [`$${p}\\%$ of $${n}$: $${p} ${T} ${n} ${D} 100 = ${part}$.`, `The rest: $${n} - ${part} = ${n - part}$.`, `Check: $${100 - p}\\%$ of $${n}$ is $${((100 - p) * n) / 100}$.`, c.ans(n - part)],
    };
  }
  if (kind === 'quiz') {
    const q = rng.pick([10, 20, 25, 40, 50]);
    const p = retry(() => rng.pick([60, 70, 75, 80, 85, 90, 95]), (x) => (x * q) % 100 === 0);
    const right = (p * q) / 100;
    return {
      prompt: `${name} wrote a math quiz with $${q}$ questions. ${name} got $${p}\\%$ of the questions right. How many questions did ${name} get wrong?`,
      parts: [numPart(q - right, { exact: false, suffix: 'questions' })],
      hints: [`First find $${p}\\%$ of $${q}$: the number right.`, `Subtract from $${q}$.`],
      solution: [`Right: $${p} ${T} ${q} ${D} 100 = ${right}$.`, `Wrong: $${q} - ${right} = ${q - right}$.`, `${name} got $${q - right}$ questions wrong.`],
    };
  }
  const p = rng.pick([5, 10, 15]);
  const price = retry(() => rng.int(4, 40) * 5, (x) => (p * x) % 100 === 0 && x >= 20 && x <= 160);
  const tax = (p * price) / 100;
  const item = rng.pick(['bike helmet', 'pair of soccer cleats', 'skateboard', 'tent', 'sleeping bag']);
  return {
    prompt: `A ${item} costs ${money(price, true)} before tax. In this question, the tax is $${p}\\%$ of the price. What is the total cost with tax?`,
    parts: [numPart(price + tax, { exact: false, label: '\\$' })],
    hints: [`Find $${p}\\%$ of ${money(price, true)}. That is the tax.`, 'Add the tax to the price.'],
    solution: [`Tax: $${p} ${T} ${price} ${D} 100 = ${tax}$, so the tax is ${money(tax, true)}.`, `Total: $${price} + ${tax} = ${price + tax}$.`, `The total cost is ${money(price + tax, true)}.`],
  };
}

const percentOf = skill({
  id: 'm6-percent-of',
  name: 'Percent of a number',
  description: 'Relate a percentage to a proportion and find a percent of a number within 100%, including problems.',
  outcomes: ['N8'],
  lessonId: 'm6-5-3',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return percentD1(rng);
    if (d === 2) return percentD2(rng);
    return percentD3(rng);
  },
});

export const RATIOS_SKILLS: SkillDef[] = [equivalentRatios, unitRates, percentOf];
