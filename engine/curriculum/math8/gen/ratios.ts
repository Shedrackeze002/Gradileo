/** Math 8 Unit 3 — Ratios, Rates and Proportional Reasoning (N4, N5). */
import { fixedChoice, mc, numPart, retry, skill } from '../../helpers.ts';
import { fmt, fmtFixed, gcd, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure; calculator?: boolean };

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Ananya', 'Nathan', 'Lena', 'Diego', 'Harpreet', 'Noor',
];
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater'];

const tx = (u: string) => `\\text{${u}}`;
const T = '\\times';
const D = '\\div';
const fr = (n: number | string, d: number | string) => `\\dfrac{${n}}{${d}}`;
/** A ratio inside maths: 3 : 4 : 5. */
const rt = (...xs: Array<number | string>) => xs.join(' : ');
/** A number inside maths (at most 4 decimals). */
const nm = (x: number) => fmt(x);
/** Money in prose, always with cents: \$12.50. Never put this inside $...$. */
const money = (x: number) => `\\$${fmtFixed(x, 2)}`;
/** A price tag: whole dollars print without cents. */
const tag = (x: number) => (isWhole(x) ? `\\$${Math.round(x)}` : money(x));
/** A money amount inside maths, without a dollar sign. */
const mv = (x: number) => (isWhole(x) ? `${Math.round(x)}` : fmtFixed(x, 2));
const isWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
/** "about " when a money value had to be rounded to the cent. */
const abt = (x: number) => (isWhole(x * 100) ? '' : 'about ');
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const CENT = 'to the nearest cent';
/** Money is graded to the cent. */
const moneyPart = (v: number, suffix?: string, label = '\\$'): Part => numPart(v, { decimals: 2, tolerance: 0.011, label, suffix });
/** True when v sits close to a rounding boundary (x.xx5) at `dp` places. */
function onEdge(v: number, dp: number): boolean {
  const s = Math.abs(v) * 10 ** dp;
  return Math.abs(s - Math.floor(s) - 0.5) < 0.08;
}
/** "= 2.5" when exact to 4 places, otherwise "\approx 2.4567". */
function eq(v: number, dp = 4): string {
  return Math.abs(roundTo(v, dp) - v) < 1e-9 ? `= ${fmt(v, dp)}` : `\\approx ${fmt(v, dp)}`;
}
/** An exact answer that may be a decimal: shown as a decimal on review screens. */
const exactNum = (v: number, suffix?: string, label?: string): Part =>
  numPart(v, { suffix, label, exact: false, ...(isWhole(v) ? {} : { display: 'decimal' as const }) });
/** Coprime pairs (a, b) with a ≠ b from 1..max. */
function coprimePairs(max: number, minB = 1): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  for (let a = 1; a <= max; a++) for (let b = minB; b <= max; b++) if (a !== b && gcd(a, b) === 1) out.push([a, b]);
  return out;
}

// ---------------------------------------------------------------------------
// 3.1 Two-term and three-term ratios
// ---------------------------------------------------------------------------

interface PairCtx {
  /** Smallest count of each part that makes sense (a class has more than a few students). */
  min?: number;
  a: string;
  b: string;
  whole: string;
  text: (x: number, y: number, name: string, town: string) => string;
}

const PAIRS: PairCtx[] = [
  { a: 'red marbles', b: 'blue marbles', whole: 'marbles', text: (x, y, n) => `${n} has a bag with $${x}$ red marbles and $${y}$ blue marbles.` },
  { min: 9, a: 'girls', b: 'boys', whole: 'students', text: (x, y, _n, t) => `A Grade 8 class in ${t} has $${x}$ girls and $${y}$ boys.` },
  { a: 'wins', b: 'losses', whole: 'games', text: (x, y, n) => `${n}’s hockey team played $${x + y}$ games. The team won $${x}$ games and lost $${y}$ games. There were no ties.` },
  { a: 'cats', b: 'dogs', whole: 'animals', text: (x, y, _n, t) => `An animal shelter in ${t} has $${x}$ cats and $${y}$ dogs.` },
  { a: 'chocolate chip cookies', b: 'oatmeal cookies', whole: 'cookies', text: (x, y, n) => `${n} baked $${x}$ chocolate chip cookies and $${y}$ oatmeal cookies for a bake sale.` },
  { a: 'goals', b: 'assists', whole: 'points', text: (x, y, n) => `This season, ${n} scored $${x}$ goals and had $${y}$ assists in soccer. Each goal or assist counts as one point.` },
  { a: 'tents', b: 'trailers', whole: 'campsites in use', text: (x, y, _n, t) => `At a campground near ${t}, $${x}$ campsites have tents and $${y}$ campsites have trailers. No site has both.` },
  { a: 'apples', b: 'oranges', whole: 'pieces of fruit', text: (x, y) => `A fruit basket for a school event has $${x}$ apples and $${y}$ oranges.` },
];

const RATIO_DEF = 'A ratio compares quantities **in a given order**. The first quantity named goes first.';

/** d1: write a part-to-part or part-to-whole ratio from counts (multiple choice). */
function ratioFromCounts(rng: Rng): Out {
  const c = rng.pick(PAIRS);
  const name = rng.pick(NAMES);
  const town = rng.pick(TOWNS);
  const lo = c.min ?? 2;
  const [x, y] = rng.pick(coprimePairs(lo + 10, lo).filter(([p]) => p >= lo));
  const t = x + y;
  const ask = rng.pick(['ab', 'ba', 'aw', 'bw'] as const);
  const q = {
    ab: `the ratio of ${c.a} to ${c.b}`,
    ba: `the ratio of ${c.b} to ${c.a}`,
    aw: `the ratio of ${c.a} to all the ${c.whole}`,
    bw: `the ratio of ${c.b} to all the ${c.whole}`,
  }[ask];
  const ans = { ab: [x, y], ba: [y, x], aw: [x, t], bw: [y, t] }[ask];
  const all = [[x, y], [y, x], [x, t], [y, t]].map((p) => `$${rt(p[0], p[1])}$`);
  const correct = `$${rt(ans[0], ans[1])}$`;
  const whole = ask === 'aw' || ask === 'bw';
  return {
    prompt: `${c.text(x, y, name, town)} What is ${q}?`,
    parts: [{ answer: mc(rng, correct, all.filter((s) => s !== correct)) }],
    hints: [RATIO_DEF, whole ? `A part-to-whole ratio compares one part with the total. First find the total: $${x} + ${y}$.` : 'A part-to-part ratio compares one part with another part. Check the order.'],
    solution: [
      whole ? `There are $${x} + ${y} = ${t}$ ${c.whole} in all.` : `There are $${x}$ ${c.a} and $${y}$ ${c.b}.`,
      `Write the quantities in the order asked: ${whole ? `${ask === 'aw' ? c.a : c.b} first, then all the ${c.whole}` : `${ask === 'ab' ? c.a : c.b} first`}.`,
      `The ratio is $${rt(ans[0], ans[1])}$.`,
    ],
  };
}

/** d1/d2: an equivalent two-term ratio with a missing term. */
function missingTerm(rng: Rng, d: Difficulty): Out {
  const [a, b] = rng.pick(coprimePairs(d === 1 ? 7 : 9));
  const k = d === 1 ? rng.int(2, 6) : rng.int(3, 9);
  const missFirst = rng.chance(0.5);
  // d2 sometimes goes from the big ratio down to lowest terms.
  const down = d === 2 && rng.chance(0.5);
  const left = down ? [a * k, b * k] : [a, b];
  const right = down ? [a, b] : [a * k, b * k];
  const shown = missFirst ? rt('?', right[1]) : rt(right[0], '?');
  const answer = missFirst ? right[0] : right[1];
  const known = missFirst ? [left[1], right[1]] : [left[0], right[0]];
  const op = down ? D : T;
  const verb = down ? 'divided' : 'multiplied';
  return {
    prompt: `Find the missing term in the equivalent ratios: $${rt(left[0], left[1])} = ${shown}$`,
    parts: [numPart(answer, { label: '? =', exact: false })],
    hints: ['Equivalent ratios are made by multiplying or dividing **every** term by the same number.', `Compare the terms you know: $${known[0]}$ and $${known[1]}$. What was ${down ? 'it divided' : 'it multiplied'} by?`],
    solution: [
      `The ${missFirst ? 'second' : 'first'} term went from $${known[0]}$ to $${known[1]}$: $${known[0]} ${op} ${k} = ${known[1]}$.`,
      `So every term is ${verb} by $${k}$: $${missFirst ? left[0] : left[1]} ${op} ${k} = ${answer}$.`,
      `$${rt(left[0], left[1])} = ${rt(right[0], right[1])}$, so the missing term is $${answer}$.`,
    ],
  };
}

/** d2: pick the ratio in lowest terms (multiple choice), sometimes in a context. */
function lowestTermsRatio(rng: Rng): Out {
  const [a, b] = rng.pick(coprimePairs(9).filter(([p, q]) => p + q > 3));
  const k = rng.pick([4, 6, 8, 9, 10, 12]);
  const N = a * k;
  const M = b * k;
  const p = [2, 3, 5].find((f) => k % f === 0 && k !== f)!;
  const ds = [`$${rt(N / p, M / p)}$`, `$${rt(b, a)}$`, `$${rt(M / p, N / p)}$`, `$${rt(N, M)}$`];
  const name = rng.pick(NAMES);
  const ctx = rng.pick([
    { s: `Write $${rt(N, M)}$ in lowest terms.` },
    { s: `${name} counted $${N}$ cars and $${M}$ trucks in a parking lot in ${rng.pick(TOWNS)}. What is the ratio of cars to trucks in lowest terms?` },
    { s: `A school has $${N}$ volleyballs and $${M}$ basketballs. What is the ratio of volleyballs to basketballs in lowest terms?` },
    { s: `A paint mix uses $${N}$ mL of blue paint and $${M}$ mL of white paint. What is the ratio of blue paint to white paint in lowest terms?` },
  ]);
  return {
    prompt: ctx.s,
    parts: [{ answer: mc(rng, `$${rt(a, b)}$`, ds) }],
    hints: ['A ratio is in lowest terms when its terms have no common factor other than $1$.', `Divide both terms by their greatest common factor. Try $${k}$.`],
    solution: [
      `The greatest common factor of $${N}$ and $${M}$ is $${k}$.`,
      `$${N} ${D} ${k} = ${a}$ and $${M} ${D} ${k} = ${b}$.`,
      `$${a}$ and $${b}$ have no common factor other than $1$, so $${rt(N, M)} = ${rt(a, b)}$ in lowest terms.`,
    ],
  };
}

/** d2: part-to-whole as a fraction in lowest terms or as a percent. */
function partToWhole(rng: Rng): Out {
  const c = rng.pick(PAIRS);
  const name = rng.pick(NAMES);
  const town = rng.pick(TOWNS);
  const percent = rng.chance(0.5);
  let x: number;
  let y: number;
  if (percent) {
    const t = rng.pick(c.min ? [20, 25] : [10, 20, 25, 40, 50]);
    x = retry(() => rng.int(2, t - 2), (v) => (100 * v) % t === 0 && 2 * v !== t, 200);
    y = t - x;
  } else {
    const lo = c.min ?? 3;
    [x, y] = retry(() => [rng.int(lo, lo + 15), rng.int(lo, lo + 15)], ([p, q]) => p !== q && gcd(p, p + q) > 1, 200);
  }
  const t = x + y;
  const askA = rng.chance(0.5);
  const part = askA ? x : y;
  const what = askA ? c.a : c.b;
  const g = gcd(part, t);
  if (percent) {
    const pc = (100 * part) / t;
    return {
      prompt: `${c.text(x, y, name, town)} What percent of the ${c.whole} are ${what}?`,
      parts: [numPart(pc, { suffix: '%', exact: false })],
      hints: ['A part-to-whole ratio compares one part with the total. Find the total first.', 'Write the part-to-whole ratio as a fraction, then change it to a percent (out of $100$).'],
      solution: [
        `Total: $${x} + ${y} = ${t}$ ${c.whole}.`,
        `Part to whole: $${fr(part, t)}$.`,
        `As a percent: $${fr(part, t)} = ${fr(pc, 100)} = ${pc}\\%$.`,
        `$${pc}\\%$ of the ${c.whole} are ${what}.`,
      ],
    };
  }
  return {
    prompt: `${c.text(x, y, name, town)} What fraction of the ${c.whole} are ${what}? Write your answer in lowest terms.`,
    parts: [numPart(part / t, { fraction: 'lowest' })],
    hints: ['A part-to-whole ratio compares one part with the total. Find the total first.', 'Write the ratio as a fraction (part over total), then divide the top and bottom by their greatest common factor.'],
    solution: [
      `Total: $${x} + ${y} = ${t}$ ${c.whole}.`,
      `Part to whole: $${rt(part, t)}$, or $${fr(part, t)}$.`,
      `Divide the top and bottom by $${g}$: $${fr(part, t)} = ${fr(part / g, t / g)}$.`,
      `$${fr(part / g, t / g)}$ of the ${c.whole} are ${what}.`,
    ],
  };
}

/** d2: a three-term equivalent ratio with one missing term. */
function threeTermMissing(rng: Rng): Out {
  const [a, b, c] = retry(() => [rng.int(1, 7), rng.int(1, 7), rng.int(1, 9)], (v) => new Set(v).size === 3 && gcd(gcd(v[0], v[1]), v[2]) === 1);
  const k = rng.int(2, 6);
  const down = rng.chance(0.4);
  const small = [a, b, c];
  const big = small.map((v) => v * k);
  const left = down ? big : small;
  const right = down ? small : big;
  const miss = rng.int(0, 2);
  const shown = right.map((v, i) => (i === miss ? '?' : `${v}`));
  const ref = miss === 0 ? 1 : 0;
  const op = down ? D : T;
  return {
    prompt: `Find the missing term: $${rt(...left)} = ${rt(...shown)}$`,
    parts: [numPart(right[miss], { label: '? =', exact: false })],
    hints: ['A three-term ratio works like a two-term ratio: multiply or divide **all three** terms by the same number.', `Compare $${left[ref]}$ and $${right[ref]}$ to find the number.`],
    solution: [
      `Compare a pair of terms you know: $${left[ref]} ${op} ${k} = ${right[ref]}$.`,
      `Every term is ${down ? 'divided' : 'multiplied'} by $${k}$, so the missing term is $${left[miss]} ${op} ${k} = ${right[miss]}$.`,
      `$${rt(...left)} = ${rt(...right)}$. The missing term is $${right[miss]}$.`,
    ],
  };
}

interface TripleCtx {
  names: [string, string, string];
  order: string;
  unit: string;
  whole: string;
  text: (v: number[], name: string, town: string) => string;
}

const TRIPLES: TripleCtx[] = [
  { names: ['peanuts', 'raisins', 'chocolate chips'], order: 'the ratio of peanuts to raisins to chocolate chips', unit: 'cups', whole: 'trail mix', text: (v, n) => `${n} makes trail mix for a camping trip with $${v[0]}$ cups of peanuts, $${v[1]}$ cups of raisins and $${v[2]}$ cups of chocolate chips.` },
  { names: ['orange juice', 'ginger ale', 'cranberry juice'], order: 'the ratio of orange juice to ginger ale to cranberry juice', unit: 'L', whole: 'punch', text: (v) => `A fruit punch for a school dance uses $${v[0]}\\ ${tx('L')}$ of orange juice, $${v[1]}\\ ${tx('L')}$ of ginger ale and $${v[2]}\\ ${tx('L')}$ of cranberry juice.` },
  { names: ['carrots', 'beans', 'peas'], order: 'the ratio of rows of carrots to beans to peas', unit: 'rows', whole: 'garden', text: (v, _n, t) => `A school garden in ${t} has $${v[0]}$ rows of carrots, $${v[1]}$ rows of beans and $${v[2]}$ rows of peas.` },
  { names: ['the science centre', 'the zoo', 'the water park'], order: 'the ratio of votes for the science centre to the zoo to the water park', unit: 'votes', whole: 'class', text: (v) => `A Grade 8 class voted on a field trip. The science centre got $${v[0]}$ votes, the zoo got $${v[1]}$ votes and the water park got $${v[2]}$ votes. Every student voted once.` },
  { names: ['red', 'blue', 'yellow'], order: 'the ratio of red to blue to yellow beads', unit: 'beads', whole: 'bracelet kit', text: (v, n) => `${n}’s bracelet kit has $${v[0]}$ red beads, $${v[1]}$ blue beads and $${v[2]}$ yellow beads.` },
];

/** d3: a three-term ratio in lowest terms (mc) and a part-to-whole question about it. */
function threeTermContext(rng: Rng): Out {
  const c = rng.pick(TRIPLES);
  const name = rng.pick(NAMES);
  const town = rng.pick(TOWNS);
  const { s, k } = retry(
    () => {
      const s = [rng.int(1, 6), rng.int(1, 6), rng.int(1, 6)];
      return { s, k: rng.int(2, c.unit === 'L' ? 3 : 5) };
    },
    ({ s, k }) => new Set(s).size === 3 && gcd(gcd(s[0], s[1]), s[2]) === 1 && s.reduce((x, y) => x + y) * k <= (c.unit === 'votes' ? 32 : 40),
  );
  const v = s.map((x) => x * k);
  const total = v[0] + v[1] + v[2];
  const ask = rng.int(0, 2);
  const nice = (100 * v[ask]) % total === 0;
  const p = [2, 3].find((f) => k % f === 0 && k !== f);
  const ds = [`$${rt(...v)}$`, `$${rt(s[1], s[0], s[2])}$`, `$${rt(s[2], s[1], s[0])}$`, `$${rt(s[0], s[1], total / k)}$`];
  if (p) ds.unshift(`$${rt(...v.map((x) => x / p))}$`);
  const g = gcd(v[ask], total);
  const whatOf = c.unit === 'votes' ? `What fraction of the votes went to ${c.names[ask]}?` : c.unit === 'beads' ? `What fraction of the beads are ${c.names[ask]}?` : c.unit === 'rows' ? `What fraction of the rows are ${c.names[ask]}?` : `What fraction of the ${c.whole} is ${c.names[ask]}?`;
  const pcOf = whatOf.replace('What fraction', 'What percent');
  const second: Part = nice
    ? numPart((100 * v[ask]) / total, { suffix: '%', exact: false, label: '(b)' })
    : numPart(v[ask] / total, { fraction: 'lowest', label: '(b)' });
  return {
    prompt: `${c.text(v, name, town)}\n\n(a) What is ${c.order}, in lowest terms?\n\n(b) ${nice ? pcOf : `${whatOf} Write your answer in lowest terms.`}`,
    parts: [{ label: '(a)', answer: mc(rng, `$${rt(...s)}$`, ds) }, second],
    hints: ['For (a), divide all three terms by their greatest common factor.', `For (b), the whole is the total of all three parts: $${v[0]} + ${v[1]} + ${v[2]}$.`],
    solution: [
      `(a) The greatest common factor of $${v[0]}$, $${v[1]}$ and $${v[2]}$ is $${k}$.`,
      `Divide each term by $${k}$: $${rt(...v)} = ${rt(...s)}$.`,
      `(b) The total is $${v[0]} + ${v[1]} + ${v[2]} = ${total}$.`,
      nice
        ? `Part to whole: $${fr(v[ask], total)} = ${fr((100 * v[ask]) / total, 100)} = ${(100 * v[ask]) / total}\\%$.`
        : `Part to whole: $${fr(v[ask], total)}$${g > 1 ? `. Divide the top and bottom by $${g}$: $${fr(v[ask], total)} = ${fr(v[ask] / g, total / g)}$` : ', which is already in lowest terms'}.`,
      `(a) $${rt(...s)}$; (b) ${nice ? `$${(100 * v[ask]) / total}\\%$` : `$${fr(v[ask] / g, total / g)}$`}.`,
    ],
  };
}

/** d3: scale a three-term ratio from one known count, then find another part and the total. */
function threeTermScale(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const c = rng.pick([
    { names: ['red', 'blue', 'green'], item: 'beads', text: (r: string) => `In ${name}’s bead kit, the ratio of red to blue to green beads is $${r}$.` },
    { names: ['cars', 'trucks', 'vans'], item: 'vehicles', text: (r: string) => `In a parking lot in ${rng.pick(TOWNS)}, the ratio of cars to trucks to vans is $${r}$.` },
    { names: ['hockey', 'soccer', 'basketball'], item: 'students', text: (r: string) => `At a school sports day, the ratio of students playing hockey to soccer to basketball is $${r}$. Each student plays one sport.` },
    { names: ['wheat', 'canola', 'barley'], item: 'hectares', text: (r: string) => `On a farm near ${rng.pick(TOWNS)}, the ratio of hectares of wheat to canola to barley is $${r}$.` },
  ]);
  const s = retry(() => [rng.int(1, 6), rng.int(1, 6), rng.int(1, 7)], (v) => new Set(v).size === 3 && gcd(gcd(v[0], v[1]), v[2]) === 1);
  const k = rng.int(3, 9);
  const known = rng.int(0, 2);
  const ask = (known + rng.int(1, 2)) % 3;
  const v = s.map((x) => x * k);
  const total = v[0] + v[1] + v[2];
  const label = (i: number) => (c.item === 'beads' ? `${c.names[i]} beads` : c.item === 'students' ? `students playing ${c.names[i]}` : c.item === 'hectares' ? `hectares of ${c.names[i]}` : c.names[i]);
  return {
    prompt: `${c.text(rt(...s))} There are $${v[known]}$ ${label(known)}.\n\n(a) How many ${label(ask)} are there?\n\n(b) How many ${c.item} are there altogether?`,
    parts: [numPart(v[ask], { label: '(a)', exact: false }), numPart(total, { label: '(b)', exact: false })],
    hints: [`The ratio term for ${label(known)} is $${s[known]}$, but there are $${v[known]}$. What was it multiplied by?`, 'Multiply every term of the ratio by that number to get an equivalent ratio with the real counts.'],
    solution: [
      `$${s[known]} ${T} ${k} = ${v[known]}$, so every term is multiplied by $${k}$.`,
      `$${rt(...s)} = ${rt(...v)}$`,
      `(a) There are $${s[ask]} ${T} ${k} = ${v[ask]}$ ${label(ask)}.`,
      `(b) Altogether: $${v[0]} + ${v[1]} + ${v[2]} = ${total}$ ${c.item}.`,
    ],
  };
}

const ratios = skill({
  id: 'm8-ratios',
  name: 'Two-term and three-term ratios',
  description: 'Write part-to-part and part-to-whole ratios, find equivalent ratios with a missing term and write ratios in lowest terms.',
  outcomes: ['N4'],
  lessonId: 'm8-3-1',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return rng.chance(0.5) ? ratioFromCounts(rng) : missingTerm(rng, 1);
    if (d === 2) {
      const k = rng.pick(['lowest', 'whole', 'three', 'missing'] as const);
      if (k === 'lowest') return lowestTermsRatio(rng);
      if (k === 'whole') return partToWhole(rng);
      if (k === 'three') return threeTermMissing(rng);
      return missingTerm(rng, 2);
    }
    return rng.chance(0.5) ? threeTermContext(rng) : threeTermScale(rng);
  },
});

// ---------------------------------------------------------------------------
// 3.2 Rates and unit rates
// ---------------------------------------------------------------------------

const ONE = 'A unit rate tells how much for **one** unit (one hour, one kilogram, one minute). Divide by the number of units.';

type RateGen = (rng: Rng, name: string) => Out;

const RATE_D1: RateGen[] = [
  (rng, name) => {
    const [who, lo, hi] = rng.pick([['cyclist', 12, 25], ['bus', 60, 95], ['car', 70, 100], ['canoe', 4, 7]] as const);
    const s = rng.int(lo, hi);
    const t = rng.int(2, 5);
    const subj = who === 'cyclist' ? `${name} rides a bike` : `A ${who} travels`;
    return {
      prompt: `${subj} $${s * t}\\ ${tx('km')}$ in $${t}$ hours. What is the average speed in kilometres per hour?`,
      parts: [numPart(s, { suffix: 'km/h', exact: false })],
      hints: [ONE, `Divide the distance by the time: $${s * t} ${D} ${t}$.`],
      solution: ['Kilometres per hour means the distance travelled in $1$ hour.', `$${s * t}\\ ${tx('km')} ${D} ${t}\\ ${tx('h')} = ${s}\\ ${tx('km/h')}$`, `The average speed is $${s}\\ ${tx('km/h')}$.`],
    };
  },
  (rng, name) => {
    const sec = rng.pick([10, 15, 20, 30]);
    const f = 60 / sec;
    const bpm = retry(() => rng.int(60, 100), (v) => v % f === 0);
    const B = bpm / f;
    return {
      prompt: `After warming up for gym class, ${name} counts $${B}$ heartbeats in $${sec}$ seconds. What is ${name}’s heart rate in beats per minute?`,
      parts: [numPart(bpm, { suffix: 'beats/min', exact: false })],
      hints: ['A minute has $60$ seconds. How many groups of ' + `$${sec}$` + ' seconds are in a minute?', `$60 ${D} ${sec} = ${f}$, so multiply the beats by $${f}$.`],
      solution: [`One minute is $60$ seconds, and $60 ${D} ${sec} = ${f}$.`, `In one minute there are $${f}$ times as many beats: $${B} ${T} ${f} = ${bpm}$.`, `${name}’s heart rate is $${bpm}$ beats per minute.`],
    };
  },
  (rng, name) => {
    const r = rng.int(12, 20);
    const h = rng.int(3, 8);
    const job = rng.pick(['babysitting', 'shovelling snow', 'raking leaves', 'walking dogs', 'helping at a farm stand']);
    return {
      prompt: `${name} earns ${tag(r * h)} for $${h}$ hours of ${job}. How much does ${name} earn per hour?`,
      parts: [moneyPart(r, 'per hour')],
      hints: [ONE, `Divide the pay by the hours: $${r * h} ${D} ${h}$.`],
      solution: ['Pay per hour = total pay ÷ number of hours.', `$${r * h} ${D} ${h} = ${r}$`, `${name} earns ${tag(r)} per hour.`],
    };
  },
  (rng) => {
    const item = rng.pick(['potatoes', 'carrots', 'apples', 'onions', 'grapes']);
    const p = rng.pick([1.2, 1.5, 1.8, 2.2, 2.4, 2.5, 3.2, 3.5, 4.5]);
    const k = rng.int(2, 5);
    const total = roundTo(p * k, 2);
    return {
      prompt: `At a farmers’ market in ${rng.pick(TOWNS)}, $${k}\\ ${tx('kg')}$ of ${item} cost ${money(total)}. What is the price per kilogram?`,
      parts: [moneyPart(p, 'per kg')],
      hints: [ONE, `Divide the price by the number of kilograms: $${mv(total)} ${D} ${k}$.`],
      solution: ['Price per kilogram = total price ÷ number of kilograms.', `$${mv(total)} ${D} ${k} = ${fmtFixed(p, 2)}$`, `The ${item} cost ${money(p)} per kilogram.`],
    };
  },
  (rng, name) => {
    const r = rng.pick([25, 30, 35, 40, 45, 50, 55, 60]);
    const m = rng.int(3, 8);
    return {
      prompt: `${name} types $${r * m}$ words in $${m}$ minutes for a school project. What is ${name}’s typing speed in words per minute?`,
      parts: [numPart(r, { suffix: 'words/min', exact: false })],
      hints: [ONE, `Divide the words by the minutes: $${r * m} ${D} ${m}$.`],
      solution: ['Words per minute means the words typed in $1$ minute.', `$${r * m} ${D} ${m} = ${r}$`, `${name} types $${r}$ words per minute.`],
    };
  },
  (rng, name) => {
    const r = rng.int(6, 15);
    const m = rng.int(3, 8);
    const what = rng.pick(['a rain barrel', 'a water trough for horses', 'a kiddie pool', 'a cooler for a camping trip']);
    return {
      prompt: `${name} uses a hose to fill ${what}. It takes $${m}$ minutes to put in $${r * m}\\ ${tx('L')}$ of water. How many litres per minute does the hose deliver?`,
      parts: [numPart(r, { suffix: 'L/min', exact: false })],
      hints: [ONE, `Divide the litres by the minutes: $${r * m} ${D} ${m}$.`],
      solution: ['Litres per minute means the water delivered in $1$ minute.', `$${r * m}\\ ${tx('L')} ${D} ${m}\\ ${tx('min')} = ${r}\\ ${tx('L/min')}$`, `The hose delivers $${r}\\ ${tx('L')}$ per minute.`],
    };
  },
];

const PER_KG = [
  { item: 'carrots', size: [2, 2.5, 3, 5], lo: 1.1, hi: 2.4 },
  { item: 'potatoes', size: [4.5, 5, 10, 2.5], lo: 0.8, hi: 1.9 },
  { item: 'apples', size: [1.5, 2, 2.5, 3], lo: 2.6, hi: 4.9 },
  { item: 'rice', size: [2, 4, 8], lo: 2.1, hi: 3.9 },
  { item: 'flour', size: [2.5, 5, 10], lo: 1.4, hi: 2.9 },
];
const PER_L = [
  { item: 'milk', size: [2, 4], lo: 1.4, hi: 2.4 },
  { item: 'orange juice', size: [1.75, 2.5], lo: 2.2, hi: 3.6 },
  { item: 'apple juice', size: [1.36, 1.89, 2.84], lo: 1.5, hi: 2.9 },
];
const PER_ITEM = [
  { item: 'granola bars', unit: 'bar', n: [6, 8, 12], lo: 0.4, hi: 0.8, why: 'snacks for a class party' },
  { item: 'bottles of water', unit: 'bottle', n: [12, 24, 35], lo: 0.18, hi: 0.4, why: 'water for a soccer tournament' },
  { item: 'hockey pucks', unit: 'puck', n: [6, 10, 12], lo: 1.2, hi: 2.4, why: 'pucks for hockey practice' },
  { item: 'pencils', unit: 'pencil', n: [10, 12, 18, 24], lo: 0.25, hi: 0.6, why: 'school supplies' },
];
/** A price ending in 9 near raw (like 5.49). */
const price9 = (raw: number) => roundTo(Math.max(0.99, Math.round(raw * 10) / 10 - 0.01), 2);

const RATE_D2: RateGen[] = [
  (rng, name) => {
    const perL = rng.chance(0.35);
    const it = perL ? rng.pick(PER_L) : rng.pick(PER_KG);
    const u = perL ? 'L' : 'kg';
    const { s, p } = retry(
      () => {
        const s = rng.pick(it.size);
        return { s, p: price9(s * rng.float(it.lo, it.hi, 2)) };
      },
      (o) => !onEdge(o.p / o.s, 2) && !isWhole((o.p / o.s) * 100),
    );
    const up = p / s;
    return {
      prompt: `${name} sees ${perL ? `a $${nm(s)}\\ ${tx('L')}$ jug of ${it.item}` : `a $${nm(s)}\\ ${tx('kg')}$ bag of ${it.item}`} for ${money(p)}. What is the price per ${perL ? 'litre' : 'kilogram'}, ${CENT}?`,
      parts: [moneyPart(up, `per ${u}`)],
      hints: [ONE, `Divide the price by the ${perL ? 'litres' : 'kilograms'}: $${mv(p)} ${D} ${nm(s)}$.`],
      solution: [`Price per ${perL ? 'litre' : 'kilogram'} = price ÷ ${perL ? 'litres' : 'kilograms'}.`, `$${mv(p)} ${D} ${nm(s)} ${eq(up)}$`, `Rounded to the nearest cent, the price is ${money(roundTo(up, 2))} per ${perL ? 'litre' : 'kilogram'}.`],
      calculator: true,
    };
  },
  (rng, name) => {
    const it = rng.pick(PER_ITEM);
    const { n, p } = retry(
      () => {
        const n = rng.pick(it.n);
        return { n, p: price9(n * rng.float(it.lo, it.hi, 2)) };
      },
      (o) => !onEdge(o.p / o.n, 2) && !isWhole((o.p / o.n) * 100),
    );
    const up = p / n;
    return {
      prompt: `${name} is shopping for ${it.why}. A pack of $${n}$ ${it.item} costs ${money(p)}. What is the price per ${it.unit}, ${CENT}?`,
      parts: [moneyPart(up, `per ${it.unit}`)],
      hints: [ONE, `Divide the price by the number of ${it.item}: $${mv(p)} ${D} ${n}$.`],
      solution: [`Price per ${it.unit} = price ÷ number of ${it.item}.`, `$${mv(p)} ${D} ${n} ${eq(up)}$`, `Rounded to the nearest cent, the price is ${money(roundTo(up, 2))} per ${it.unit}.`],
      calculator: true,
    };
  },
  (rng, name) => {
    const [act, lo, hi] = rng.pick([['runs', 8, 14], ['cycles', 15, 30], ['skates', 10, 18], ['rollerblades', 10, 16]] as const);
    const m = rng.pick([12, 15, 24, 30, 36, 45, 48]);
    const s = retry(() => rng.int(lo, hi), (v) => isWhole((v * m) / 30));
    const dist = (s * m) / 60;
    return {
      prompt: `${name} ${act} $${nm(dist)}\\ ${tx('km')}$ in $${m}$ minutes. What is ${name}’s average speed in kilometres per hour?`,
      parts: [numPart(s, { suffix: 'km/h', exact: false })],
      hints: ['Change the time to hours first: there are $60$ minutes in an hour.', `$${m}\\ ${tx('min')} = ${fr(m, 60)}\\ ${tx('h')}$. Divide the distance by the time in hours.`],
      solution: [
        `Change the time to hours: $${m}\\ ${tx('min')} = ${fr(m, 60)}\\ ${tx('h')} = ${nm(m / 60)}\\ ${tx('h')}$.`,
        `Divide the distance by the time: $${nm(dist)} ${D} ${nm(m / 60)} = ${s}$.`,
        `Or: the distance in $60$ minutes is $${nm(dist)} ${T} 60 ${D} ${m} = ${nm(dist * 60)} ${D} ${m} = ${s}$.`,
        `The average speed is $${s}\\ ${tx('km/h')}$.`,
      ],
      calculator: true,
    };
  },
  (rng, name) => {
    const sec = rng.pick([15, 20, 30]);
    const f = 60 / sec;
    const B = rng.int(Math.ceil(110 / f), Math.floor(170 / f));
    const bpm = B * f;
    return {
      prompt: `Right after a soccer drill, ${name} counts $${B}$ heartbeats in $${sec}$ seconds. What is ${name}’s heart rate in beats per minute?`,
      parts: [numPart(bpm, { suffix: 'beats/min', exact: false })],
      hints: ['There are $60$ seconds in a minute.', `Find how many $${sec}$-second groups fit in a minute, then multiply.`],
      solution: [`$60 ${D} ${sec} = ${f}$, so a minute is $${f}$ groups of $${sec}$ seconds.`, `$${B} ${T} ${f} = ${bpm}$`, `${name}’s heart rate is $${bpm}$ beats per minute.`],
    };
  },
  (rng, name) => {
    const r = rng.pick([11, 12, 12.5, 13, 14, 15, 16]);
    const L = rng.pick([32, 40, 48, 50, 56, 60]);
    const km = r * L;
    return {
      prompt: `On a road trip from ${rng.pick(TOWNS)} to the mountains, ${name}’s family car uses $${L}\\ ${tx('L')}$ of gas to travel $${km}\\ ${tx('km')}$. How many kilometres does the car travel per litre of gas?`,
      parts: [exactNum(r, 'km/L')],
      hints: [ONE, `Divide the kilometres by the litres: $${km} ${D} ${L}$.`],
      solution: ['Kilometres per litre means the distance for $1$ litre of gas.', `$${km}\\ ${tx('km')} ${D} ${L}\\ ${tx('L')} = ${nm(r)}\\ ${tx('km/L')}$`, `The car travels $${nm(r)}\\ ${tx('km')}$ per litre.`],
      calculator: true,
    };
  },
];

interface BuyCtx {
  item: string;
  /** What one size is called: box, bag, jug ... */
  pack: string;
  per: string;
  perWord: string;
  /** Sizes as [amount in base units, label]. */
  sizes: Array<[number, string]>;
  lo: number;
  hi: number;
  convert?: (s: [number, string]) => string | null;
}

const BUYS: BuyCtx[] = [
  { item: 'cereal', pack: 'box', per: 'kg', perWord: 'per kilogram', sizes: [[0.75, '750 g'], [1.2, '1.2 kg'], [0.5, '500 g'], [1.5, '1.5 kg']], lo: 5.5, hi: 9.5, convert: (s) => (s[1].endsWith(' g') ? `$${s[1].replace(' g', '')}\\ ${tx('g')} = ${nm(s[0])}\\ ${tx('kg')}$` : null) },
  { item: 'dog food', pack: 'bag', per: 'kg', perWord: 'per kilogram', sizes: [[4, '4 kg'], [8, '8 kg'], [10, '10 kg'], [15, '15 kg']], lo: 3.2, hi: 5.4 },
  { item: 'yogurt', pack: 'tub', per: 'kg', perWord: 'per kilogram', sizes: [[0.65, '650 g'], [0.75, '750 g'], [1.5, '1.5 kg'], [2, '2 kg']], lo: 4.5, hi: 7.5, convert: (s) => (s[1].endsWith(' g') ? `$${s[1].replace(' g', '')}\\ ${tx('g')} = ${nm(s[0])}\\ ${tx('kg')}$` : null) },
  { item: 'apple juice', pack: 'jug', per: 'L', perWord: 'per litre', sizes: [[1.36, '1.36 L'], [1.89, '1.89 L'], [2.5, '2.5 L'], [4, '4 L']], lo: 1.4, hi: 2.8 },
  { item: 'phone data', pack: 'add-on', per: 'GB', perWord: 'per gigabyte', sizes: [[3, '3 GB'], [5, '5 GB'], [8, '8 GB'], [12, '12 GB']], lo: 4, hi: 9 },
  { item: 'sports drink', pack: '', per: 'bottle', perWord: 'per bottle', sizes: [[6, 'pack of 6'], [12, 'pack of 12'], [24, 'case of 24']], lo: 0.8, hi: 1.5 },
];

/** d3: two unit prices to the cent and the better buy. */
function betterBuy(rng: Rng, name: string): Out {
  const c = rng.pick(BUYS);
  const { A, B, pa, pb } = retry(
    () => {
      const [A, B] = rng.sample(c.sizes, 2).sort((x, y) => x[0] - y[0]);
      const base = rng.float(c.lo, c.hi, 2);
      const pa = price9(A[0] * base * rng.float(0.95, 1.2, 2));
      const pb = price9(B[0] * base * rng.float(0.8, 1.05, 2));
      return { A, B, pa, pb };
    },
    (o) => {
      const ua = o.pa / o.A[0];
      const ub = o.pb / o.B[0];
      return !onEdge(ua, 2) && !onEdge(ub, 2) && Math.abs(roundTo(ua, 2) - roundTo(ub, 2)) >= 0.03 && o.pb > o.pa;
    },
    300,
  );
  const ua = pa / A[0];
  const ub = pb / B[0];
  const bWins = ub < ua;
  const isData = c.per === 'GB';
  const what = (s: [number, string]) => (c.pack ? `the ${s[1]} ${c.pack}` : `the ${s[1]}`);
  const prompt = isData
    ? `${name} is choosing a prepaid phone data add-on. The ${A[1]} add-on costs ${money(pa)} and the ${B[1]} add-on costs ${money(pb)}.`
    : `${name} is shopping for ${c.item}. ${cap(what(A))} costs ${money(pa)} and ${what(B)} costs ${money(pb)}.`;
  const convA = c.convert?.(A);
  const convB = c.convert?.(B);
  const conv = [convA, convB].filter(Boolean) as string[];
  const wa = what(A);
  const wb = what(B);
  return {
    prompt: `${prompt}\n\n(a) Find the unit price of each, ${c.perWord}, ${CENT}.\n\n(b) Which is the better buy?`,
    parts: [
      moneyPart(ua, `per ${c.per}`, `(a) ${A[1]}: \\$`),
      moneyPart(ub, `per ${c.per}`, `${B[1]}: \\$`),
      { label: '(b)', answer: fixedChoice([cap(wa), cap(wb), 'They have the same unit price'], bWins ? 1 : 0) },
    ],
    hints: [`Find the price for one ${c.per === 'bottle' ? 'bottle' : c.per === 'GB' ? 'gigabyte' : c.per === 'L' ? 'litre' : 'kilogram'}: divide each price by its size${conv.length ? ' (in kilograms)' : ''}.`, 'The better buy has the lower unit price.'],
    solution: [
      ...(conv.length ? [`Write the sizes in kilograms: ${conv.join(' and ')}.`] : []),
      `${cap(wa)}: $${mv(pa)} ${D} ${nm(A[0])} ${eq(ua)}$, so ${abt(ua)}${money(roundTo(ua, 2))} ${c.perWord}.`,
      `${cap(wb)}: $${mv(pb)} ${D} ${nm(B[0])} ${eq(ub)}$, so ${abt(ub)}${money(roundTo(ub, 2))} ${c.perWord}.`,
      `(b) ${bWins ? cap(wb) : cap(wa)} has the lower unit price, so it is the better buy (if ${name} will use it all).`,
    ],
    calculator: true,
  };
}

/** d3: compare two speeds, each a unit rate, and pick the faster. */
function compareSpeeds(rng: Rng): Out {
  const [A, B] = rng.sample(NAMES, 2);
  const act = rng.pick([['ran', 8, 15, `a running club in ${rng.pick(TOWNS)}`], ['cycled', 14, 28, `a cycling club in ${rng.pick(TOWNS)}`], ['skied', 6, 14, 'a cross-country ski club']] as const);
  const mins = [15, 20, 24, 30, 36, 40, 45, 48, 50];
  const make = () => {
    const m = rng.pick(mins);
    const s = retry(() => rng.int(act[1], act[2]), (v) => isWhole((v * m) / 30));
    return { m, s, d: (s * m) / 60 };
  };
  const { a, b } = retry(() => ({ a: make(), b: make() }), (o) => o.a.s !== o.b.s && o.a.m !== o.b.m && o.a.d !== o.b.d);
  const aWins = a.s > b.s;
  const line = (who: string, o: { m: number; s: number; d: number }) =>
    `${who}: in $60$ minutes, the distance is $${nm(o.d)} ${T} 60 ${D} ${o.m} = ${nm(o.d * 60)} ${D} ${o.m} = ${o.s}$, so the speed is $${o.s}\\ ${tx('km/h')}$.`;
  return {
    prompt: `At ${act[3]}, ${A} ${act[0]} $${nm(a.d)}\\ ${tx('km')}$ in $${a.m}$ minutes. ${B} ${act[0]} $${nm(b.d)}\\ ${tx('km')}$ in $${b.m}$ minutes.\n\n(a) Find each average speed in km/h.\n\n(b) Who was faster?`,
    parts: [
      numPart(a.s, { label: `(a) ${A}:`, suffix: 'km/h', exact: false }),
      numPart(b.s, { label: `${B}:`, suffix: 'km/h', exact: false }),
      { label: '(b)', answer: fixedChoice([A, B, 'They were equally fast'], aWins ? 0 : 1) },
    ],
    hints: ['A speed in km/h is the distance for $60$ minutes. Scale each distance from its time up to $60$ minutes.', 'Multiply the distance by $60$, then divide by the number of minutes. The greater unit rate is the faster speed.'],
    solution: [line(A, a), line(B, b), `(b) $${Math.max(a.s, b.s)} > ${Math.min(a.s, b.s)}$, so ${aWins ? A : B} was faster.`],
    calculator: true,
  };
}

const unitRate = skill({
  id: 'm8-unit-rate',
  name: 'Rates and unit rates',
  description: 'Find unit rates such as speeds, prices per kilogram and heart rates, and compare unit prices to find the better buy.',
  outcomes: ['N4'],
  lessonId: 'm8-3-2',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) return rng.pick(RATE_D1)(rng, name);
    if (d === 2) return rng.pick(RATE_D2)(rng, name);
    return rng.chance(0.7) ? betterBuy(rng, name) : compareSpeeds(rng);
  },
});

// ---------------------------------------------------------------------------
// 3.3 Solving proportions
// ---------------------------------------------------------------------------

const VARS = ['x', 'n', 'm', 'y', 'p'];

/** A proportion with the unknown in one of the right-hand positions; written as fractions or with colons. */
function proportionTex(left: [number | string, number | string], right: [number | string, number | string], colon: boolean, swap: boolean): string {
  const L = colon ? rt(left[0], left[1]) : fr(left[0], left[1]);
  const R = colon ? rt(right[0], right[1]) : fr(right[0], right[1]);
  return swap ? `${R} = ${L}` : `${L} = ${R}`;
}

function solveD1(rng: Rng): Out {
  const v = rng.pick(VARS);
  const [a, b] = rng.pick(coprimePairs(9).filter(([p, q]) => p + q > 3 && q > 1));
  const k = rng.int(2, 6);
  const top = rng.chance(0.55);
  const colon = rng.chance(0.3);
  const swap = rng.chance(0.3);
  const right: [number | string, number | string] = top ? [v, b * k] : [a * k, v];
  const ans = top ? a * k : b * k;
  const knownFrom = top ? b : a;
  const knownTo = top ? b * k : a * k;
  return {
    prompt: `Solve the proportion: $${proportionTex([a, b], right, colon, swap)}$`,
    parts: [numPart(ans, { label: `$${v} =$`, exact: false })],
    hints: ['In a proportion, the two ratios are equivalent: both terms are multiplied by the same number.', `What do you multiply $${knownFrom}$ by to get $${knownTo}$?`],
    solution: [
      `$${knownFrom} ${T} ${k} = ${knownTo}$, so the scale factor is $${k}$.`,
      `Multiply the other term by $${k}$ too: $${top ? a : b} ${T} ${k} = ${ans}$.`,
      `Check: $${colon ? `${rt(a, b)} = ${rt(a * k, b * k)}` : `${fr(a, b)} = ${fr(a * k, b * k)}`}$.`,
      `$${v} = ${ans}$`,
    ],
  };
}

function solveD2(rng: Rng): Out {
  const v = rng.pick(VARS);
  const { a, b, m1, m2 } = retry(
    () => {
      const [a, b] = rng.pick(coprimePairs(7).filter(([p, q]) => p + q > 3 && q > 1));
      return { a, b, m1: rng.int(2, 6), m2: rng.int(2, 7) };
    },
    (o) => o.m1 !== o.m2 && o.m2 % o.m1 !== 0 && o.m1 % o.m2 !== 0,
  );
  const top = rng.chance(0.5);
  const colon = rng.chance(0.3);
  const swap = rng.chance(0.3);
  const left: [number, number] = [a * m1, b * m1];
  const right: [number | string, number | string] = top ? [v, b * m2] : [a * m2, v];
  const ans = top ? a * m2 : b * m2;
  const given = top ? b * m2 : a * m2;
  return {
    prompt: `Solve the proportion: $${proportionTex(left, right, colon, swap)}$`,
    parts: [numPart(ans, { label: `$${v} =$`, exact: false })],
    hints: [`There is no whole number that takes $${top ? left[1] : left[0]}$ to $${given}$. Write $${colon ? rt(...left) : fr(...left)}$ in lowest terms first.`, `$${colon ? rt(...left) : fr(...left)} = ${colon ? rt(a, b) : fr(a, b)}$. Now scale up to $${given}$.`],
    solution: [
      `Method 1 (lowest terms first): divide both terms by $${m1}$: $${colon ? `${rt(...left)} = ${rt(a, b)}` : `${fr(...left)} = ${fr(a, b)}`}$.`,
      `$${top ? b : a} ${T} ${m2} = ${given}$, so multiply the other term by $${m2}$: $${top ? a : b} ${T} ${m2} = ${ans}$.`,
      top
        ? `Method 2 (multiply both sides): $${v} = ${given} ${T} ${fr(left[0], left[1])} = ${fr(given * left[0], left[1])} = ${ans}$.`
        : `Method 2 (flip both ratios): $${fr(left[1], left[0])} = ${fr(v, given)}$, so $${v} = ${given} ${T} ${fr(left[1], left[0])} = ${fr(given * left[1], left[0])} = ${ans}$.`,
      `$${v} = ${ans}$`,
    ],
  };
}

function solveD3(rng: Rng): Out {
  const v = rng.pick(VARS);
  if (rng.chance(0.3)) {
    // Three-term ratio with a scale factor that is not a whole number.
    const s = retry(() => [rng.int(1, 5), rng.int(1, 5), rng.int(1, 6)], (x) => new Set(x).size === 3 && gcd(gcd(x[0], x[1]), x[2]) === 1);
    const [m1, m2] = rng.pick([[2, 3], [2, 5], [4, 6], [4, 10], [6, 9], [3, 2], [6, 4], [10, 4]]);
    const L = s.map((x) => x * m1);
    const R = s.map((x) => x * m2);
    const miss = rng.int(0, 2);
    const ref = miss === 0 ? 1 : 0;
    const f = m2 / m1;
    return {
      prompt: `Solve for $${v}$: $${rt(...L)} = ${rt(...R.map((x, i) => (i === miss ? v : x)))}$`,
      parts: [numPart(R[miss], { label: `$${v} =$`, exact: false })],
      hints: ['Every term is multiplied by the same number, but it may not be a whole number.', `Find it from a pair you know: $${R[ref]} ${D} ${L[ref]}$.`],
      solution: [
        `Scale factor: $${R[ref]} ${D} ${L[ref]} = ${nm(f)}$.`,
        `Check with the other known pair: $${L[3 - miss - ref]} ${T} ${nm(f)} = ${R[3 - miss - ref]}$. ✓`,
        `$${v} = ${L[miss]} ${T} ${nm(f)} = ${R[miss]}$`,
      ],
      calculator: true,
    };
  }
  // Two-term proportion whose answer may be a decimal.
  const { p, q, r, top } = retry(
    () => {
      const q = rng.pick([2, 4, 5, 6, 8, 10, 12, 15]);
      const p = rng.int(2, 20);
      const r = rng.int(3, 16);
      return { p, q, r, top: rng.chance(0.6) };
    },
    (o) => {
      const ans = o.top ? (o.p * o.r) / o.q : (o.q * o.r) / o.p;
      const from = o.top ? o.q : o.p;
      return o.p !== o.q && gcd(o.p, o.q) < Math.min(o.p, o.q) && isWhole(ans * 100) && !isWhole(o.r / from) && !isWhole(from / o.r) && ans < 200;
    },
    300,
  );
  // top: p/q = x/r -> x = p r / q.  bottom: p/q = r/x -> x = q r / p.
  const ans = top ? (p * r) / q : (q * r) / p;
  const swap = rng.chance(0.4);
  const tex = swap ? (top ? `${fr(v, r)} = ${fr(p, q)}` : `${fr(r, v)} = ${fr(p, q)}`) : top ? `${fr(p, q)} = ${fr(v, r)}` : `${fr(p, q)} = ${fr(r, v)}`;
  const steps = top
    ? [
        `Multiply both sides by $${r}$ to get $${v}$ by itself: $${v} = ${r} ${T} ${fr(p, q)}$.`,
        `$${v} = ${fr(`${r} ${T} ${p}`, q)} = ${fr(r * p, q)} = ${nm(ans)}$`,
      ]
    : [
        `Flip both ratios (equivalent ratios stay equal when you flip them): $${fr(q, p)} = ${fr(v, r)}$.`,
        `Multiply both sides by $${r}$: $${v} = ${r} ${T} ${fr(q, p)} = ${fr(r * q, p)} = ${nm(ans)}$`,
      ];
  return {
    prompt: `Solve the proportion: $${tex}$${isWhole(ans) ? '' : ' Give your answer as a decimal.'}`,
    parts: [exactNum(ans, undefined, `$${v} =$`)],
    hints: ['The numbers do not scale by a whole number. Get the unknown by itself.', top ? `Multiply both sides by $${r}$.` : `Flip both ratios so $${v}$ is on top, then multiply both sides by $${r}$.`],
    solution: [...steps, `Check: $${top ? `${fr(nm(ans), r)}` : `${fr(r, nm(ans))}`} ${eq(top ? ans / r : r / ans)}$ and $${fr(p, q)} ${eq(p / q)}$. ✓`, `$${v} = ${nm(ans)}$`],
    calculator: true,
  };
}

const proportionSolve = skill({
  id: 'm8-proportion-solve',
  name: 'Solving proportions',
  description: 'Solve a proportion for a missing term using equivalent ratios or unit rates.',
  outcomes: ['N5'],
  lessonId: 'm8-3-3',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return solveD1(rng);
    if (d === 2) return solveD2(rng);
    return solveD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 3.3 Proportional reasoning problems
// ---------------------------------------------------------------------------

const PROP_HINT = 'Set up equivalent ratios with the same units in the same order, or find a unit rate first.';

function problemsD1(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['recipe', 'speed', 'price', 'trip'] as const);
  if (kind === 'recipe') {
    const c = rng.pick([
      { what: 'pancakes', ing: 'cups of flour', per: [8, 10, 12], amt: [2, 3] },
      { what: 'muffins', ing: 'eggs', per: [6, 12], amt: [2, 3] },
      { what: 'cookies', ing: 'cups of oats', per: [12, 18, 24], amt: [2, 3] },
      { what: 'servings of bannock', ing: 'cups of flour', per: [4, 6], amt: [3, 4] },
    ]);
    const n = rng.pick(c.per);
    const a = retry(() => rng.pick(c.amt), (v) => v !== n);
    const k = rng.int(2, 5);
    return {
      prompt: `A recipe makes $${n}$ ${c.what} with $${a}$ ${c.ing}. ${name} wants to make $${n * k}$ ${c.what}. How many ${c.ing} are needed?`,
      parts: [numPart(a * k, { exact: false, suffix: c.ing.split(' ')[0] })],
      hints: [PROP_HINT, `How many times as many ${c.what} is $${n * k}$ compared with $${n}$?`],
      solution: [
        `Set up equivalent ratios of ${c.ing.split(' of ')[0]} to ${c.what}: $${fr(a, n)} = ${fr('?', n * k)}$.`,
        `$${n} ${T} ${k} = ${n * k}$, so multiply the ${c.ing.split(' of ')[0]} by $${k}$ too: $${a} ${T} ${k} = ${a * k}$.`,
        `${name} needs $${a * k}$ ${c.ing}.`,
      ],
    };
  }
  if (kind === 'speed') {
    const veh = rng.pick(['bus', 'car', 'train']);
    const s = rng.pick([60, 70, 75, 80, 90, 100]);
    const t1 = rng.int(2, 3);
    const t2 = rng.intExcept(4, 7, [t1 * 2]);
    return {
      prompt: `A ${veh} travels $${s * t1}\\ ${tx('km')}$ in $${t1}$ hours. At the same speed, how far will it travel in $${t2}$ hours?`,
      parts: [numPart(s * t2, { exact: false, suffix: 'km' })],
      hints: [PROP_HINT, `Find the distance in $1$ hour first: $${s * t1} ${D} ${t1}$.`],
      solution: [
        `Unit rate: $${s * t1} ${D} ${t1} = ${s}$, so the ${veh} travels $${s}\\ ${tx('km')}$ in each hour.`,
        `In $${t2}$ hours: $${s} ${T} ${t2} = ${s * t2}$.`,
        `The ${veh} will travel $${s * t2}\\ ${tx('km')}$.`,
      ],
    };
  }
  if (kind === 'price') {
    const c = rng.pick([
      { item: 'rolls of hockey tape', p: [3, 4, 5], pre: `${name} is buying hockey tape for the team.` },
      { item: 'bags of popcorn', p: [2, 3, 4], pre: `${name} is buying snacks for a class movie night.` },
      { item: 'tickets to the school play', p: [5, 6, 8, 10], pre: `${name}’s family is going to the school play.` },
      { item: 'packs of trading cards', p: [4, 5, 6], pre: `${name} collects hockey cards.` },
    ]);
    const p = rng.pick(c.p);
    const n1 = rng.int(3, 5);
    const n2 = rng.intExcept(6, 12, [2 * n1, 3 * n1]);
    return {
      prompt: `${c.pre} $${n1}$ ${c.item} cost ${tag(p * n1)}. At the same price, how much do $${n2}$ ${c.item} cost?`,
      parts: [moneyPart(p * n2)],
      hints: [PROP_HINT, `Find the price of one first: $${p * n1} ${D} ${n1}$.`],
      solution: [`Unit price: $${p * n1} ${D} ${n1} = ${p}$, so one costs ${tag(p)}.`, `$${n2} ${T} ${p} = ${p * n2}$`, `$${n2}$ ${c.item} cost ${tag(p * n2)}.`],
    };
  }
  const r = rng.pick([5, 6, 8, 10]);
  const adults = rng.int(3, 8);
  return {
    prompt: `On a school field trip to ${rng.pick(['a dinosaur museum', 'the city zoo', 'a living history museum', 'a historic site'])}, the ratio of students to adults must be $${rt(r, 1)}$. There are $${r * adults}$ students. How many adults are needed?`,
    parts: [numPart(adults, { exact: false, suffix: 'adults' })],
    hints: [PROP_HINT, `For every $${r}$ students there is $1$ adult. How many groups of $${r}$ are in $${r * adults}$?`],
    solution: [`$${rt(r, 1)} = ${rt(r * adults, '?')}$`, `$${r} ${T} ${adults} = ${r * adults}$, so multiply $1$ by $${adults}$ too.`, `$${adults}$ adults are needed.`],
  };
}

function problemsD2(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['map', 'currency', 'recipe', 'mixture'] as const);
  if (kind === 'map') {
    const scale = rng.pick([10, 20, 25, 40, 50]);
    const toMap = rng.chance(0.4);
    const mapCm = retry(() => rng.int(21, 98) / 10, (x) => !isWhole(x));
    const real = roundTo(mapCm * scale, 4);
    const [A, B] = rng.sample(['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater'], 2);
    if (toMap) {
      return {
        prompt: `On a road map, $1\\ ${tx('cm')}$ represents $${scale}\\ ${tx('km')}$. ${A} and ${B} are $${nm(real)}\\ ${tx('km')}$ apart (in a straight line). How far apart are they on the map?`,
        parts: [exactNum(mapCm, 'cm')],
        hints: [PROP_HINT, `Every $${scale}\\ ${tx('km')}$ is $1\\ ${tx('cm')}$ on the map. Divide by $${scale}$.`],
        solution: [`Map to real is $${rt(`1\\ ${tx('cm')}`, `${scale}\\ ${tx('km')}`)}$, so $${fr(1, scale)} = ${fr('x', nm(real))}$.`, `$x = ${nm(real)} ${D} ${scale} = ${nm(mapCm)}$`, `They are $${nm(mapCm)}\\ ${tx('cm')}$ apart on the map.`],
        calculator: true,
      };
    }
    return {
      prompt: `On a road map, $1\\ ${tx('cm')}$ represents $${scale}\\ ${tx('km')}$. On the map, ${A} and ${B} are $${nm(mapCm)}\\ ${tx('cm')}$ apart. What is the actual distance between them (in a straight line)?`,
      parts: [exactNum(real, 'km')],
      hints: [PROP_HINT, `Each centimetre on the map is $${scale}\\ ${tx('km')}$. Multiply.`],
      solution: [`Unit rate: $1\\ ${tx('cm')}$ on the map is $${scale}\\ ${tx('km')}$.`, `$${nm(mapCm)} ${T} ${scale} = ${nm(real)}$`, `The towns are $${nm(real)}\\ ${tx('km')}$ apart.`],
      calculator: true,
    };
  }
  if (kind === 'currency') {
    const rate = rng.pick([0.72, 0.73, 0.74, 0.75, 0.76]);
    const cad = 5 * rng.int(9, 60);
    const usd = roundTo(cad * rate, 2);
    return {
      prompt: `${name} is going on a family trip to Montana. Suppose the exchange rate is $1$ Canadian dollar (CAD) $=$ $${rate}$ US dollars (USD). How many US dollars will ${name} get for ${tag(cad)} CAD? Give your answer ${CENT}.`,
      parts: [moneyPart(usd, undefined, 'US\\$')],
      hints: [PROP_HINT, `Each Canadian dollar is worth $${rate}$ US dollars. Multiply.`],
      solution: [`Equivalent ratios: $${fr(`${rate}\\ ${tx('USD')}`, `1\\ ${tx('CAD')}`)} = ${fr('x', `${cad}\\ ${tx('CAD')}`)}$.`, `$x = ${cad} ${T} ${rate} = ${fmtFixed(usd, 2)}$`, `${name} will get US${money(usd)}.`],
      calculator: true,
    };
  }
  if (kind === 'recipe') {
    const c = rng.pick([
      { what: 'servings of chili', one: 'serving', ing: 'cans of beans', word: 'cans', unit1: 'can', base: [4, 6, 8] },
      { what: 'servings of pancakes', one: 'serving', ing: 'eggs', word: 'eggs', unit1: 'egg', base: [4, 6] },
      { what: 'muffins', one: 'muffin', ing: 'cups of blueberries', word: 'cups', unit1: 'cup', base: [12, 18] },
      { what: 'servings of soup', one: 'serving', ing: 'cups of broth', word: 'cups', unit1: 'cup', base: [4, 6, 8] },
    ]);
    const { n, a, n2 } = retry(
      () => {
        const n = rng.pick(c.base);
        const a = rng.int(2, 6);
        const n2 = rng.int(n + 1, 3 * n);
        return { n, a, n2 };
      },
      (o) => isWhole((o.a * o.n2) / o.n) && o.n2 % o.n !== 0 && o.a !== o.n,
      300,
    );
    const ans = (a * n2) / n;
    const g = gcd(a, n);
    return {
      prompt: `A recipe for $${n}$ ${c.what} uses $${a}$ ${c.ing}. How many ${c.ing} are needed for $${n2}$ ${c.what}?`,
      parts: [numPart(ans, { exact: false, suffix: c.word })],
      hints: [PROP_HINT, `$${n2}$ is not a whole-number multiple of $${n}$. Write $${fr(a, n)}$ in lowest terms first, or find the amount for one ${c.one}.`],
      solution: [
        `Set up a proportion of ${c.word} to ${c.what}: $${fr(a, n)} = ${fr('x', n2)}$.`,
        g > 1
          ? `Equivalent-ratio method: $${fr(a, n)} = ${fr(a / g, n / g)}$. Since $${n / g} ${T} ${n2 / (n / g)} = ${n2}$, $x = ${a / g} ${T} ${n2 / (n / g)} = ${nm(ans)}$.`
          : `Equivalent-ratio method: multiply both sides by $${n2}$: $x = ${n2} ${T} ${fr(a, n)} = ${fr(a * n2, n)} = ${nm(ans)}$.`,
        `Unit-rate method: one ${c.one} needs $${a} ${D} ${n} = ${fr(a / g, n / g)}$ of ${/^[aeiou]/.test(c.unit1) ? 'an' : 'a'} ${c.unit1}, so $${n2}$ ${c.what} need $${n2} ${T} ${fr(a / g, n / g)} = ${nm(ans)}$ ${c.word}.`,
        `$${nm(ans)}$ ${c.ing} are needed.`,
      ],
    };
  }
  // mixture
  const c = rng.pick([
    { a: 'blue paint', b: 'white paint', u: 'L', uw: 'litres', ctx: `${name} is mixing paint for a school mural.` },
    { a: 'juice concentrate', b: 'water', u: 'cups', uw: 'cups', ctx: `${name} is making juice for a soccer team.` },
    { a: 'sand', b: 'gravel', u: 'buckets', uw: 'buckets', ctx: `${name} is helping mix concrete for a backyard firepit.` },
  ]);
  const [p, q] = rng.pick(coprimePairs(7).filter(([x, y]) => x < y && x > 1 || (x === 1 && y > 2)));
  const k = retry(() => rng.int(2, 8), (v) => v !== p && v !== q);
  const giveA = rng.chance(0.5);
  const known = giveA ? p * k : q * k;
  const ans = giveA ? q * k : p * k;
  return {
    prompt: `${c.ctx} The ratio of ${c.a} to ${c.b} is $${rt(p, q)}$. ${giveA ? `${name} uses $${known}$ ${c.uw} of ${c.a}. How many ${c.uw} of ${c.b} are needed?` : `${name} uses $${known}$ ${c.uw} of ${c.b}. How many ${c.uw} of ${c.a} are needed?`}`,
    parts: [numPart(ans, { exact: false, suffix: c.u })],
    hints: [PROP_HINT, `Write $${rt(p, q)} = ${giveA ? rt(known, 'x') : rt('x', known)}$ and find the scale factor.`],
    solution: [
      `$${rt(p, q)} = ${giveA ? rt(known, 'x') : rt('x', known)}$`,
      `$${giveA ? p : q} ${T} ${k} = ${known}$, so the scale factor is $${k}$.`,
      `$x = ${giveA ? q : p} ${T} ${k} = ${ans}$`,
      `${name} needs $${ans}$ ${c.uw} of ${giveA ? c.b : c.a}.`,
    ],
  };
}

function problemsD3(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['share', 'juice', 'time', 'currency'] as const);
  if (kind === 'share') {
    const three = rng.chance(0.5);
    const s = three
      ? retry(() => [rng.int(1, 5), rng.int(1, 5), rng.int(1, 6)], (v) => new Set(v).size === 3 && gcd(gcd(v[0], v[1]), v[2]) === 1)
      : retry(() => [rng.int(1, 7), rng.int(1, 7)], (v) => v[0] !== v[1] && gcd(v[0], v[1]) === 1);
    const parts = s.reduce((x, y) => x + y, 0);
    const per = rng.pick([5, 6, 8, 10, 12, 15, 20, 25]);
    const total = parts * per;
    const who = three ? rng.sample(['the art club', 'the band', 'the robotics club', 'the drama club', 'the ski club'], 3) : rng.sample(NAMES.filter((x) => x !== name), 2);
    const ask = rng.int(0, s.length - 1);
    const shares = s.map((x) => x * per);
    return {
      prompt: three
        ? `A school fundraiser in ${rng.pick(TOWNS)} raised ${tag(total)}. The money is shared among ${who[0]}, ${who[1]} and ${who[2]} in the ratio $${rt(...s)}$. How much does ${who[ask]} get?`
        : `${who[0]} and ${who[1]} run a lemonade stand and share the profit of ${tag(total)} in the ratio $${rt(...s)}$ (${who[0]} : ${who[1]}). How much does ${who[ask]} get?`,
      parts: [moneyPart(shares[ask])],
      hints: ['Add the terms of the ratio to find the total number of equal parts.', `Divide the money by the number of parts to find one part, then multiply by $${s[ask]}$.`],
      solution: [
        `Total parts: $${s.join(' + ')} = ${parts}$.`,
        `One part: $${total} ${D} ${parts} = ${per}$, so each part is ${tag(per)}.`,
        `${cap(who[ask])} gets $${s[ask]}$ parts: $${s[ask]} ${T} ${per} = ${shares[ask]}$.`,
        `Check: $${shares.join(' + ')} = ${total}$. ✓`,
        `${cap(who[ask])} gets ${tag(shares[ask])}.`,
      ],
    };
  }
  if (kind === 'juice') {
    const [p, q] = rng.pick([[1, 3], [1, 4], [1, 5], [2, 3], [2, 5], [3, 5], [1, 7]] as Array<[number, number]>);
    const parts = p + q;
    const totalMl = retry(() => rng.int(4, 30) * 250, (v) => v % parts === 0, 200);
    const one = totalMl / parts;
    const ask = rng.pick(['a', 'b'] as const);
    const ans = ask === 'a' ? p * one : q * one;
    const L = totalMl / 1000;
    return {
      prompt: `${name} makes iced tea for a family reunion by mixing concentrate and water in the ratio $${rt(p, q)}$. ${name} wants $${nm(L)}\\ ${tx('L')}$ of iced tea in all. How many millilitres of ${ask === 'a' ? 'concentrate' : 'water'} are needed?`,
      parts: [numPart(ans, { exact: false, suffix: 'mL' })],
      hints: [`Change litres to millilitres: $1\\ ${tx('L')} = 1000\\ ${tx('mL')}$.`, `The ratio $${rt(p, q)}$ means $${parts}$ equal parts in all. Find the size of one part.`],
      solution: [
        `$${nm(L)}\\ ${tx('L')} = ${totalMl}\\ ${tx('mL')}$.`,
        `Concentrate : water : total $= ${rt(p, q, parts)}$.`,
        `One part: $${totalMl} ${D} ${parts} = ${nm(one)}\\ ${tx('mL')}$.`,
        `${ask === 'a' ? 'Concentrate' : 'Water'}: $${ask === 'a' ? p : q} ${T} ${nm(one)} = ${nm(ans)}\\ ${tx('mL')}$.`,
        `${name} needs $${nm(ans)}\\ ${tx('mL')}$ of ${ask === 'a' ? 'concentrate' : 'water'}.`,
      ],
      calculator: true,
    };
  }
  if (kind === 'time') {
    const s = rng.pick([60, 70, 75, 80, 90, 100]);
    const t1 = rng.pick([2, 3, 4]);
    const t2 = retry(() => rng.pick([1.5, 2.5, 3.5, 4.5, 5.5, 1.25, 2.25, 3.75, 4.25]), (v) => v !== t1);
    const d2 = s * t2;
    const h = Math.floor(t2);
    const m = Math.round((t2 - h) * 60);
    return {
      prompt: `On a summer road trip, ${name}’s family drives $${s * t1}\\ ${tx('km')}$ in $${t1}$ hours. At the same speed, how many hours will it take to drive the next $${nm(d2)}\\ ${tx('km')}$? Give your answer in hours, as a decimal.`,
      parts: [exactNum(t2, 'h')],
      hints: ['Find the speed (a unit rate in km/h) first.', 'Time = distance ÷ speed.'],
      solution: [
        `Unit rate: $${s * t1} ${D} ${t1} = ${s}\\ ${tx('km/h')}$.`,
        `Time for $${nm(d2)}\\ ${tx('km')}$: $${nm(d2)} ${D} ${s} = ${nm(t2)}\\ ${tx('h')}$.`,
        `Check with equivalent ratios: $${fr(s * t1, t1)} = ${fr(nm(d2), nm(t2))}$, because both equal $${s}$.`,
        `It will take $${nm(t2)}$ hours (${h} h ${m} min).`,
      ],
      calculator: true,
    };
  }
  // currency: convert, then spend
  const rate = rng.pick([0.72, 0.73, 0.74, 0.75]);
  const cad = rng.pick([100, 120, 150, 200, 250]);
  const usd = roundTo(cad * rate, 2);
  const spent = retry(() => rng.int(18, Math.floor(usd) - 10) + rng.pick([0, 0.49, 0.99]), (v) => v < usd - 5);
  const left = roundTo(usd - spent, 2);
  return {
    prompt: `${name} exchanges ${tag(cad)} CAD for US dollars before a school band trip to Seattle. Suppose $1$ CAD $=$ $${rate}$ USD. ${name} then buys a hoodie for US${money(spent)}. How many US dollars does ${name} have left? Give your answer ${CENT}.`,
    parts: [moneyPart(left, undefined, 'US\\$')],
    hints: ['First convert the Canadian dollars to US dollars with the rate.', 'Then subtract the cost of the hoodie.'],
    solution: [
      `Convert: $${cad} ${T} ${rate} = ${fmtFixed(usd, 2)}$, so ${name} gets US${money(usd)}.`,
      `Subtract: $${fmtFixed(usd, 2)} - ${fmtFixed(spent, 2)} = ${fmtFixed(left, 2)}$`,
      `${name} has US${money(left)} left.`,
    ],
    calculator: true,
  };
}

const proportionProblems = skill({
  id: 'm8-proportion-problems',
  name: 'Proportional reasoning problems',
  description: 'Solve problems with recipes, maps, currency at a stated rate, speeds and mixtures, using unit rates or equivalent ratios.',
  outcomes: ['N5'],
  lessonId: 'm8-3-3',
  calculator: true,
  gen(rng, d) {
    if (d === 1) return problemsD1(rng);
    if (d === 2) return problemsD2(rng);
    return problemsD3(rng);
  },
});

export const RATIOS_SKILLS: SkillDef[] = [ratios, unitRate, proportionSolve, proportionProblems];
