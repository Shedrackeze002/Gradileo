/** Math 30-2 Unit 2 — Counting Methods (P4, P5, P6). */
import { mc, numPart, part, skill } from '../../helpers.ts';
import type { GenOutput } from '../../helpers.ts';
import { fmtGroupTex } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { PlaneFigure, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Ava', 'Jayden', 'Harpreet', 'Lucas', 'Kiona', 'Mohammed', 'Elise', 'Darnell', 'Yuki', 'Rowan', 'Anika', 'Mateo', 'Sienna', 'Emeka', 'Talia',
  'Arjun', 'Maëlle', 'Connor', 'Layla', 'Nathaniel', 'Wren', 'Bao', 'Fiona', 'Ibrahim', 'Skye', 'Diego', 'Naomi', 'Kwame', 'Jessie', 'Parveen',
];

const PLACES = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater', 'Oakridge', 'Elmwood'];

const DECK =
  'A standard deck of 52 playing cards has four suits: hearts and diamonds (red), clubs and spades (black). Each suit has 13 ranks: A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q and K. The J, Q and K are face cards.';

function fact(n: number): number {
  let p = 1;
  for (let i = 2; i <= n; i++) p *= i;
  return p;
}

function perm(n: number, r: number): number {
  let p = 1;
  for (let i = 0; i < r; i++) p *= n - i;
  return p;
}

function comb(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  const k = Math.min(r, n - r);
  let c = 1;
  for (let i = 1; i <= k; i++) c = (c * (n - k + i)) / i;
  return Math.round(c);
}

/** A whole number for LaTeX, thousands grouped. */
const nx = (x: number) => fmtGroupTex(x, 6);
const nP = (n: number | string, r: number | string) => `{}_{${n}}P_{${r}}`;
const nC = (n: number | string, r: number | string) => `{}_{${n}}C_{${r}}`;
/** n × (n - 1) × ... with r factors. */
const falling = (n: number, r: number) => (r <= 0 ? '1' : Array.from({ length: r }, (_, i) => n - i).join(' \\times '));
const times = (xs: number[]) => xs.map(nx).join(' \\times ');
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
/** "a, b or c" */
const orList = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} or ${xs[xs.length - 1]}`);
/** "a, b and c" */
const andList = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);

function permLine(n: number, r: number): string {
  return `${nP(n, r)} = \\dfrac{${n}!}{${n - r}!} = ${falling(n, r)} = ${nx(perm(n, r))}`;
}

function combLine(n: number, r: number): string {
  const k = Math.min(r, n - r);
  const v = nx(comb(n, r));
  if (k === 0) return `${nC(n, r)} = 1`;
  if (k === 1) return `${nC(n, r)} = \\dfrac{${n}!}{${n - r}!\\,${r}!} = ${v}`;
  return `${nC(n, r)} = \\dfrac{${n}!}{${n - r}!\\,${r}!} = \\dfrac{${falling(n, k)}}{${falling(k, k)}} = ${v}`;
}

/** n! / (a! b! ...) as LaTeX and value. */
function identicalLine(counts: number[]): { tex: string; value: number } {
  const n = counts.reduce((s, c) => s + c, 0);
  const reps = counts.filter((c) => c > 1);
  const value = counts.reduce((v, c) => v / fact(c), fact(n));
  if (!reps.length) return { tex: `${n}! = ${nx(value)}`, value };
  const den = reps.reduce((p, c) => p * fact(c), 1);
  return { tex: `\\dfrac{${n}!}{${reps.map((c) => `${c}!`).join('\\,')}} = \\dfrac{${nx(fact(n))}}{${nx(den)}} = ${nx(value)}`, value };
}

/** A two-stage tree diagram drawn left to right. */
function treeFigure(first: string[], second: string[], caption: string): PlaneFigure {
  const leaves = first.length * second.length;
  const segments: PlaneSegment[] = [];
  const points: PlanePoint[] = [];
  const rootY = (leaves - 1) / 2;
  first.forEach((f, i) => {
    const ys = second.map((_, j) => leaves - 1 - (i * second.length + j));
    const fy = (ys[0] + ys[ys.length - 1]) / 2;
    segments.push({ from: [0, rootY], to: [3, fy], color: 'muted' });
    second.forEach((s, j) => {
      segments.push({ from: [3, fy], to: [6, ys[j]], color: 'muted' });
      points.push({ x: 6, y: ys[j], label: s, color: 'accent' });
    });
    points.push({ x: 3, y: fy, label: f });
  });
  points.push({ x: 0, y: rootY, label: 'Start', color: 'muted' });
  return {
    type: 'plane',
    grid: { xMin: -0.5, xMax: 9, yMin: -0.6, yMax: leaves - 0.4, step: 20 },
    hideTickLabels: true,
    hideAxes: true,
    segments,
    points,
    caption,
  };
}

// ---------------------------------------------------------------------------
// Lesson 2.1 — The fundamental counting principle
// ---------------------------------------------------------------------------

const TREES = [
  { thing: 'smoothie', a: 'size', b: 'base', A: ['Small', 'Medium', 'Large'], B: ['Yogurt', 'Juice'], c: 'add-in', cs: ['protein', 'spinach', 'oats', 'chia seeds', 'flax', 'mango'] },
  { thing: 'phone case', a: 'colour', b: 'finish', A: ['Black', 'Blue', 'Pink'], B: ['Matte', 'Glossy'], c: 'sticker design', cs: ['maple leaf', 'mountain', 'paw print', 'star', 'wave', 'bison'] },
  { thing: 'bike', a: 'frame', b: 'colour', A: ['Road', 'Mountain'], B: ['Red', 'Silver', 'Green'], c: 'seat style', cs: ['standard', 'gel', 'racing', 'wide', 'touring'] },
  { thing: 'pizza', a: 'crust', b: 'size', A: ['Thin', 'Thick'], B: ['Small', 'Medium', 'Large'], c: 'sauce', cs: ['tomato', 'pesto', 'garlic', 'barbecue', 'alfredo'] },
  { thing: 'concert ticket', a: 'night', b: 'section', A: ['Friday', 'Saturday', 'Sunday'], B: ['Floor', 'Balcony'], c: 'parking option', cs: ['no parking', 'lot A', 'lot B', 'lot C'] },
  { thing: 'hoodie', a: 'colour', b: 'size', A: ['Grey', 'Navy'], B: ['S', 'M', 'L', 'XL'], c: 'logo', cs: ['school crest', 'team name', 'mascot', 'plain'] },
];

const FCP_HINTS = [
  'One outcome is a choice at each stage: this **and** that **and** ...',
  'Multiply the number of choices at each stage (the fundamental counting principle).',
];

function fcpD1(rng: Rng): GenOutput {
  const who = rng.pick(NAMES);
  if (rng.chance(0.45)) {
    const t = rng.pick(TREES);
    const k = rng.int(2, Math.min(5, t.cs.length));
    const leaves = t.A.length * t.B.length;
    const N = leaves * k;
    const extras = rng.sample(t.cs, k);
    return {
      prompt: `${who}'s tree diagram shows the choices of ${t.a} and ${t.b} for a ${t.thing}.\n\n(a) How many different ${t.thing}s does the tree diagram show?\n\n(b) The store adds a third choice: ${/^[aeiou]/.test(t.c) ? 'an' : 'a'} ${t.c} (${orList(extras)}). How many different ${t.thing}s are possible now?`,
      figure: treeFigure(t.A, t.B, `Choices of ${t.a} and ${t.b} for a ${t.thing}`),
      parts: [numPart(leaves, { label: '(a) Outcomes:' }), numPart(N, { label: '(b) Outcomes:' })],
      hints: ['Count the branches at the right-hand end of the tree: each one is a different outcome.', `Each of those outcomes can be paired with each ${t.c}, so multiply.`],
      solution: [
        `(a) There are ${t.A.length} choices of ${t.a}, and each has ${t.B.length} branches for ${t.b}: $${t.A.length} \\times ${t.B.length} = ${leaves}$ outcomes.`,
        `(b) Each of the ${leaves} outcomes branches again into ${k} choices of ${t.c}.`,
        `$${t.A.length} \\times ${t.B.length} \\times ${k} = ${N}$`,
        `(a) $${leaves}$; (b) $${N}$ different ${t.thing}s.`,
      ],
    };
  }
  const place = rng.pick(PLACES);
  const ctx = rng.pick([
    () => {
      const [a, b, c] = [rng.int(3, 6), rng.int(2, 4), rng.int(3, 6)];
      return { prompt: `A food truck in ${place} sells ${a} kinds of tacos, ${b} sides and ${c} drinks. A combo is one taco, one side and one drink. How many different combos are possible?`, stages: [['taco', a], ['side', b], ['drink', c]] as Array<[string, number]>, noun: 'combos' };
    },
    () => {
      const [a, b, c] = [rng.int(4, 8), rng.int(2, 4), rng.int(2, 3)];
      return { prompt: `A volleyball team is designing its jerseys. It can choose from ${a} colours, ${b} fonts for the numbers and ${c} sleeve styles. How many different jersey designs are possible?`, stages: [['colour', a], ['font', b], ['sleeve style', c]] as Array<[string, number]>, noun: 'designs' };
    },
    () => {
      const [a, b, c] = [rng.int(4, 9), rng.int(3, 6), rng.int(2, 5)];
      return { prompt: `In a video game, ${who} creates a character by choosing one of ${a} hairstyles, one of ${b} outfits and one of ${c} pets. How many different characters can ${who} create?`, stages: [['hairstyle', a], ['outfit', b], ['pet', c]] as Array<[string, number]>, noun: 'characters' };
    },
    () => {
      const [a, b] = rng.sample([4, 6, 8, 10, 12, 20], 2);
      return { prompt: `In a board game, ${a === 8 ? 'an' : 'a'} ${a}-sided die and ${b === 8 ? 'an' : 'a'} ${b}-sided die are rolled together. How many different outcomes are possible?`, stages: [[`${a}-sided die`, a], [`${b}-sided die`, b]] as Array<[string, number]>, noun: 'outcomes' };
    },
  ])();
  const N = ctx.stages.reduce((p, [, k]) => p * k, 1);
  return {
    prompt: ctx.prompt,
    parts: [numPart(N, { label: `${cap(ctx.noun)}:` })],
    hints: FCP_HINTS,
    solution: [
      `Stages: ${ctx.stages.map(([w, k]) => `${w} ($${k}$)`).join(', ')}.`,
      `By the fundamental counting principle: $${times(ctx.stages.map(([, k]) => k))} = ${nx(N)}$`,
      `There are $${nx(N)}$ different ${ctx.noun}.`,
    ],
  };
}

function fcpD2(rng: Rng): GenOutput {
  const kind = rng.pick(['andor', 'choose', 'quiz', 'handle'] as const);
  const place = rng.pick(PLACES);
  if (kind === 'andor' || kind === 'choose') {
    let a: number;
    let b: number;
    do {
      a = rng.int(2, 6);
      b = rng.int(2, 6);
    } while (a * b === a + b);
    const c = rng.int(3, 7);
    const N = (a + b) * c;
    const prompt = `A café in ${place} sells ${a} hot drinks and ${b} cold drinks. It also sells ${c} kinds of muffins. A breakfast deal is one drink (hot or cold) and one muffin.`;
    if (kind === 'choose') {
      return {
        prompt: `${prompt} Which calculation gives the number of different breakfast deals?`,
        parts: [part(mc(rng, `$(${a} + ${b}) \\times ${c}$`, [`$${a} \\times ${b} \\times ${c}$`, `$${a} + ${b} + ${c}$`, `$${a} \\times ${b} + ${c}$`]))],
        hints: ['The drink is hot **or** cold: those choices are added. The deal is a drink **and** a muffin: those choices are multiplied.', 'Count the drinks first, then multiply by the muffins.'],
        solution: [
          `A drink is hot **or** cold, so there are $${a} + ${b} = ${a + b}$ drinks to choose from. (A deal does not include both a hot and a cold drink, so do not multiply ${a} by ${b}.)`,
          `A deal is a drink **and** a muffin, so multiply: $(${a} + ${b}) \\times ${c} = ${N}$`,
          `The calculation is $(${a} + ${b}) \\times ${c}$.`,
        ],
      };
    }
    return {
      prompt: `${prompt} How many different breakfast deals are possible?`,
      parts: [numPart(N, { label: 'Deals:' })],
      hints: ['"Hot **or** cold" means add those choices. "Drink **and** muffin" means multiply.', 'First find the total number of drinks.'],
      solution: [`Drinks: hot or cold, so $${a} + ${b} = ${a + b}$ choices.`, `A deal is a drink and a muffin: $${a + b} \\times ${c} = ${N}$`, `There are $${N}$ different breakfast deals.`],
    };
  }
  if (kind === 'quiz') {
    const n = rng.int(5, 10);
    const tf = rng.chance(0.5);
    const k = tf ? 2 : 4;
    const N = k ** n;
    return {
      prompt: tf
        ? `A quiz has ${n} true-or-false questions. In how many different ways can a student answer the quiz if every question is answered?`
        : `A quiz has ${n} multiple-choice questions, each with 4 choices (A, B, C or D). In how many different ways can a student answer the quiz if every question is answered?`,
      parts: [numPart(N, { label: 'Ways:' })],
      hints: ['Each question is one stage of the answer sheet.', `Every question has ${k} options, so multiply $${k}$ by itself ${n} times.`],
      solution: [`Each of the ${n} questions has $${k}$ possible answers.`, `$${Array(n).fill(k).join(' \\times ')} = ${k}^{${n}} = ${nx(N)}$`, `There are $${nx(N)}$ ways to answer the quiz.`],
    };
  }
  const k = rng.int(3, 5);
  const rep = rng.chance(0.4);
  const boxes = rep ? Array(k).fill(26) : Array.from({ length: k }, (_, i) => 26 - i);
  const N = boxes.reduce((p, x) => p * x, 1);
  const who = rng.pick(NAMES);
  return {
    prompt: `${who} is choosing a ${k}-letter code name for a gaming club, using the letters A to Z. ${rep ? 'Letters may repeat.' : 'No letter may be used more than once.'} How many code names are possible?`,
    parts: [numPart(N, { label: 'Code names:' })],
    hints: ['Draw a box for each letter and write the number of choices in it.', rep ? 'With repetition, every box has 26 choices.' : 'Without repetition, each box has one fewer choice than the box before.'],
    solution: [rep ? `Each of the ${k} letters has $26$ choices.` : `First letter: $26$ choices, then $25$, and so on.`, `$${times(boxes)} = ${nx(N)}$`, `There are $${nx(N)}$ possible code names.`],
  };
}

/** Ordered pairs (red, blue) of two dice with a given sum. */
const dicePairs = (s: number) => Array.from({ length: 6 }, (_, i) => i + 1).filter((r) => s - r >= 1 && s - r <= 6).map((r) => `(${r}, ${s - r})`);

function fcpD3(rng: Rng): GenOutput {
  const kind = rng.pick(['digit', 'clash', 'blank', 'dice'] as const);
  if (kind === 'digit') {
    const k = rng.int(3, 5);
    const all = 36 ** k;
    const none = 26 ** k;
    const N = all - none;
    return {
      prompt: `A ${k}-character access code uses the letters A to Z and the digits 0 to 9, and characters may repeat. How many codes contain at least one digit?`,
      parts: [numPart(N, { label: 'Codes:' })],
      hints: ['"At least one digit" includes codes with 1, 2, 3, … digits. It is easier to count the codes with **no** digits.', 'At least one digit = all codes − codes with only letters.'],
      solution: [
        `All codes: each character has $26 + 10 = 36$ choices, so $36^{${k}} = ${nx(all)}$.`,
        `Codes with no digits (only letters): $26^{${k}} = ${nx(none)}$.`,
        `At least one digit: $${nx(all)} - ${nx(none)} = ${nx(N)}$`,
        `$${nx(N)}$ codes contain at least one digit.`,
      ],
    };
  }
  if (kind === 'clash') {
    const who = rng.pick(NAMES);
    const s = rng.int(4, 7);
    const p = rng.int(3, 5);
    const h = rng.int(2, 4);
    const two = rng.chance(0.4);
    const [c1, c2] = rng.sample(['orange', 'purple', 'green', 'red', 'yellow'], 2);
    const all = s * p * h;
    const bad = (two ? 2 : 1) * h;
    const N = all - bad;
    return {
      prompt: two
        ? `${who} has ${s} shirts (including one ${c1} and one ${c2}), ${p} pairs of pants (including one plaid pair) and ${h} pairs of shoes. An outfit is one of each. ${who} will not wear the plaid pants with either the ${c1} shirt or the ${c2} shirt. How many outfits can ${who} wear?`
        : `${who} has ${s} shirts (including one ${c1}), ${p} pairs of pants (including one ${c2} pair) and ${h} pairs of shoes. An outfit is one of each. ${who} will not wear the ${c1} shirt with the ${c2} pants. How many outfits can ${who} wear?`,
      parts: [numPart(N, { label: 'Outfits:' })],
      hints: ['First count every possible outfit with the counting principle.', `Then count the outfits that break the rule (the shoes can still be anything) and subtract.`],
      solution: [
        `All outfits: $${s} \\times ${p} \\times ${h} = ${all}$`,
        two
          ? `Outfits that break the rule: 2 shirts with the plaid pants, with any of the ${h} pairs of shoes: $2 \\times 1 \\times ${h} = ${bad}$`
          : `Outfits that break the rule: the ${c1} shirt with the ${c2} pants, with any of the ${h} pairs of shoes: $1 \\times 1 \\times ${h} = ${bad}$`,
        `Allowed outfits: $${all} - ${bad} = ${N}$`,
        `${who} can wear $${N}$ outfits.`,
      ],
    };
  }
  if (kind === 'blank') {
    const n = rng.int(5, 9);
    const N = 3 ** n - 2 ** n;
    return {
      prompt: `A survey has ${n} yes-or-no questions. How many more ways are there to fill in the survey if a question may be left blank than if every question must be answered?`,
      parts: [numPart(N, { label: 'More ways:' })],
      hints: ['Count each situation with the counting principle: how many options does each question have?', 'With blanks allowed, each question has 3 options (yes, no, blank). Subtract the two totals.'],
      solution: [
        `Every question answered: $2^{${n}} = ${nx(2 ** n)}$ ways.`,
        `Blanks allowed: each question is yes, no or blank, so $3^{${n}} = ${nx(3 ** n)}$ ways.`,
        `Difference: $${nx(3 ** n)} - ${nx(2 ** n)} = ${nx(N)}$`,
        `There are $${nx(N)}$ more ways when blanks are allowed.`,
      ],
    };
  }
  const [s1, s2] = rng.sample([3, 4, 5, 6, 7, 8, 9, 10, 11], 2).sort((a, b) => a - b);
  const l1 = dicePairs(s1);
  const l2 = dicePairs(s2);
  const N = l1.length + l2.length;
  return {
    prompt: `In a board game, a red die and a blue die (each numbered 1 to 6) are rolled. A player moves ahead only if the sum is ${s1} or ${s2}. How many of the possible outcomes let the player move ahead?`,
    parts: [numPart(N, { label: 'Outcomes:' })],
    hints: ['Make an organized list of the (red, blue) pairs for each sum. Order matters: (1, 2) and (2, 1) are different outcomes.', `The sum cannot be ${s1} and ${s2} at the same time, so add the two counts.`],
    solution: [
      `Sum of ${s1}: ${l1.join(', ')}, so $${l1.length}$ outcomes.`,
      `Sum of ${s2}: ${l2.join(', ')}, so $${l2.length}$ outcomes.`,
      `The two cases cannot happen together, so add: $${l1.length} + ${l2.length} = ${N}$`,
      `$${N}$ of the $36$ outcomes let the player move ahead.`,
    ],
  };
}

const countingPrinciple = skill({
  id: 'm302-counting-principle',
  name: 'Tree diagrams and the fundamental counting principle',
  description: 'Count outcomes with tree diagrams, organized lists and the fundamental counting principle, deciding when to add and when to multiply.',
  outcomes: ['P4'],
  lessonId: 'm302-2-1',
  calculator: true,
  gen: (rng, d) => (d === 1 ? fcpD1(rng) : d === 2 ? fcpD2(rng) : fcpD3(rng)),
});

// ---------------------------------------------------------------------------
// Lesson 2.2 — Permutations
// ---------------------------------------------------------------------------

function permD1(rng: Rng): GenOutput {
  const kind = rng.pick(['all', 'quotient', 'some'] as const);
  if (kind === 'all') {
    const ctx = rng.pick([
      (n: number) => `A teacher randomly chooses the order for ${n} group presentations. How many different orders are possible?`,
      (n: number) => `${rng.pick(NAMES)} wants to hang ${n} different photos in a row on a wall. In how many ways can the photos be arranged?`,
      (n: number) => `A coach must set the order in which ${n} players take penalty shots in a shootout. How many different orders are possible?`,
      (n: number) => `${n} different trophies are placed in a row on a shelf in the school's front hall. In how many ways can they be arranged?`,
    ]);
    const n = rng.int(4, 8);
    const N = fact(n);
    return {
      prompt: ctx(n),
      parts: [numPart(N, { label: 'Ways:' })],
      hints: ['Every object is used, and order matters.', `Multiply $${n} \\times ${n - 1} \\times \\cdots \\times 1$, which is $${n}!$.`],
      solution: [`The first position has ${n} choices, the next ${n - 1}, and so on down to 1.`, `$${n}! = ${falling(n, n)} = ${nx(N)}$`, `There are $${nx(N)}$ ways.`],
    };
  }
  if (kind === 'quotient') {
    const a = rng.int(6, 11);
    const k = rng.pick([2, 3]);
    const b = a - k;
    const N = perm(a, k);
    return {
      prompt: `Evaluate $\\dfrac{${a}!}{${b}!}$ without finding each factorial separately.`,
      parts: [numPart(N, { label: 'Value:' })],
      hints: [`Write out $${a}!$ until you reach $${b}!$: $${a}! = ${falling(a, k)} \\times ${b}!$.`, `The $${b}!$ on the top and bottom cancel.`],
      solution: [`$\\dfrac{${a}!}{${b}!} = \\dfrac{${falling(a, k)} \\times ${b}!}{${b}!}$`, `Cancel $${b}!$: $${falling(a, k)} = ${nx(N)}$`, `The value is $${nx(N)}$.`],
    };
  }
  const n = rng.int(5, 10);
  const r = rng.pick([2, 3]);
  const roles = r === 2 ? ['first', 'second'] : ['first', 'second', 'third'];
  const N = perm(n, r);
  const ctx = rng.pick([
    `${n} students enter a poster contest. In how many ways can ${andList(roles)} prizes be awarded?`,
    `A teacher chooses ${r} of ${n} students to give the ${andList(roles)} speeches at an assembly. In how many ways can this be done?`,
    `${n} dogs compete in an agility trial in ${rng.pick(PLACES)}. In how many ways can ${andList(roles)} place be awarded?`,
  ]);
  return {
    prompt: `${ctx} (No one can win more than one prize.)`,
    parts: [numPart(N, { label: 'Ways:' })],
    hints: ['The places are different, so order matters.', `Fill the places one at a time: $${falling(n, r)}$, which is $${nP(n, r)}$.`],
    solution: [`${cap(roles.map((p, i) => `${p}: $${n - i}$`).join(', '))} choices.`, `$${permLine(n, r)}$`, `There are $${nx(N)}$ ways.`],
  };
}

function permD2(rng: Rng): GenOutput {
  if (rng.chance(0.45)) {
    const kind = rng.pick(['perm', 'power', 'all'] as const);
    const n = rng.int(6, 12);
    const r = rng.int(3, Math.min(5, n - 2));
    const scen = {
      perm: { text: `A club has ${n} members. It elects ${r} different officers (such as president and treasurer), and no one holds two offices. Which expression gives the number of ways to fill the offices?`, correct: `$${nP(n, r)}$` },
      power: { text: `A lock code has ${r} digits. Each digit is one of the ${n} buttons on the lock, and buttons may be used more than once. Which expression gives the number of possible codes?`, correct: `$${n}^{${r}}$` },
      all: { text: `${n} runners are assigned to the ${n} lanes of a track, one runner per lane. Which expression gives the number of possible lane assignments?`, correct: `$${n}!$` },
    }[kind];
    const all = [`$${nP(n, r)}$`, `$${n}^{${r}}$`, `$${n}!$`, `$${nC(n, r)}$`, `$${r}!$`];
    const why = {
      perm: `Order matters (the offices are different) and no one is repeated, so the count is $${nP(n, r)} = ${falling(n, r)} = ${nx(perm(n, r))}$.`,
      power: `Each of the ${r} digits has ${n} choices because repetition is allowed, so the count is $${n}^{${r}} = ${nx(n ** r)}$.`,
      all: `All ${n} runners are arranged in ${n} lanes, so the count is $${n}! = ${nx(fact(n))}$.`,
    }[kind];
    return {
      prompt: scen.text,
      parts: [part(mc(rng, scen.correct, all.filter((x) => x !== scen.correct)))],
      hints: ['Ask two questions: does order matter, and can an item be used more than once?', 'Ordered with no repeats: $' + nP('n', 'r') + '$. Ordered with repeats allowed: $n^r$. All $n$ items arranged: $n!$.'],
      solution: [why, `The answer is ${scen.correct}.`],
    };
  }
  const NUM = ['zero', 'one', 'two', 'Three', 'Four'];
  const ctx = rng.pick([
    { n: [10, 16], r: [4, 6], text: (n: number, r: number) => `A DJ has ${n} songs ready and will play ${r} of them, one after another, to open a school dance. How many different opening sets are possible?` },
    { n: [12, 25], r: [3, 5], text: (n: number, r: number) => `A radio station ranks the top ${r} songs of the week from ${n} new releases. How many different top-${r} lists are possible?` },
    {
      n: [7, 12],
      r: [3, 4],
      text: (n: number, r: number) => `${NUM[r]} different jobs (${andList(['cooking', 'serving', 'cleaning up', 'greeting guests'].slice(0, r))}) are assigned to ${r} of ${n} volunteers at a community supper. Each volunteer does at most one job. In how many ways can the jobs be assigned?`,
    },
    { n: [10, 20], r: [3, 3], text: (n: number) => `Three different scholarships (\\$500, \\$1000 and \\$2000) are awarded to 3 of ${n} applicants. No one receives two scholarships. In how many ways can they be awarded?` },
  ]);
  const n = rng.int(ctx.n[0], ctx.n[1]);
  const r = rng.int(ctx.r[0], ctx.r[1]);
  const N = perm(n, r);
  return {
    prompt: ctx.text(n, r),
    parts: [numPart(N, { label: 'Ways:' })],
    hints: ['Order matters, and nothing is used twice: this is a permutation.', `Use $${nP(n, r)} = \\dfrac{${n}!}{(${n} - ${r})!}$.`],
    solution: [`There are ${n} to choose from and ${r} ordered positions.`, `$${permLine(n, r)}$`, `There are $${nx(N)}$ ways.`],
  };
}

function permD3(rng: Rng): GenOutput {
  const kind = rng.pick(['solve', 'threshold', 'difference'] as const);
  if (kind === 'solve') {
    const n0 = rng.int(6, 15);
    const k = n0 * (n0 - 1);
    const ctx = rng.pick([
      { text: `A science fair awards a first prize and a second prize. There are ${k} different ways to award the two prizes. How many projects were entered?`, noun: 'projects' },
      { text: `A club elects a president and a vice-president from its members. There are ${k} possible results. How many members does the club have?`, noun: 'members' },
      { text: `${rng.pick(NAMES)} arranges 2 of her favourite books on a small stand, left and right. She has ${k} possible arrangements. How many favourite books does she have?`, noun: 'books' },
    ]);
    return {
      prompt: ctx.text,
      parts: [numPart(n0, { label: `${cap(ctx.noun)}:` })],
      hints: [`The number of ways is $${nP('n', 2)} = n(n - 1)$.`, `Solve $n(n - 1) = ${k}$. Look for two consecutive whole numbers that multiply to ${k}, or factor the quadratic.`],
      solution: [
        `$${nP('n', 2)} = n(n - 1) = ${k}$`,
        `$n^2 - n - ${k} = 0$, which factors as $(n - ${n0})(n + ${n0 - 1}) = 0$`,
        `$n = ${n0}$ or $n = -${n0 - 1}$. A count cannot be negative, so $n = ${n0}$. Check: $${n0} \\times ${n0 - 1} = ${k}$.`,
        `There are $${n0}$ ${ctx.noun}.`,
      ],
    };
  }
  if (kind === 'threshold') {
    const X = rng.pick([100, 1000, 10000, 100000, 1000000]);
    let n = 1;
    while (fact(n) <= X) n++;
    const thing = rng.pick(['different books on a shelf', 'different students in a line', 'different songs in a playlist', 'different coloured beads in a row']);
    return {
      prompt: `What is the smallest number of ${thing} that can be arranged in more than $${nx(X)}$ ways?`,
      parts: [numPart(n, { label: 'Number:' })],
      hints: ['$n$ different objects can be arranged in $n!$ ways.', `Compute $1!, 2!, 3!, \\ldots$ until the value is greater than ${nx(X)}.`],
      solution: [
        `$${n - 1}! = ${nx(fact(n - 1))}$, which is not more than $${nx(X)}$.`,
        `$${n}! = ${nx(fact(n))}$, which is more than $${nx(X)}$.`,
        `The smallest number is $${n}$.`,
      ],
    };
  }
  const r = rng.int(3, 5);
  const rep = 10 ** r;
  const no = perm(10, r);
  const N = rep - no;
  return {
    prompt: `A bike lock opens with a ${r}-digit code using the digits 0 to 9. How many more codes are possible if digits may repeat than if every digit must be different?`,
    parts: [numPart(N, { label: 'More codes:' })],
    hints: ['Count each kind of code separately with the counting principle.', `With repetition: $10^{${r}}$. Without repetition: $${nP(10, r)}$. Then subtract.`],
    solution: [
      `Repetition allowed: $10^{${r}} = ${nx(rep)}$`,
      `All digits different: $${permLine(10, r)}$`,
      `Difference: $${nx(rep)} - ${nx(no)} = ${nx(N)}$`,
      `There are $${nx(N)}$ more codes when digits may repeat.`,
    ],
  };
}

const permutations = skill({
  id: 'm302-permutations',
  name: 'Factorials and permutations',
  description: 'Use factorial notation and nPr to count arrangements where order matters, and choose the right counting model.',
  outcomes: ['P5'],
  lessonId: 'm302-2-2',
  calculator: true,
  gen: (rng, d) => (d === 1 ? permD1(rng) : d === 2 ? permD2(rng) : permD3(rng)),
});

// ---------------------------------------------------------------------------
// Lesson 2.3 — Permutations with repetition and restrictions
// ---------------------------------------------------------------------------

const IDENTICAL = [
  { verb: 'are hung one above another on a signal pole', kinds: ['red', 'blue', 'white', 'yellow'], noun: 'flags', all: 'signals', same: 'colour', ends: 'at the top and at the bottom of the pole' },
  { verb: 'are threaded in a row on a bracelet cord', kinds: ['green', 'gold', 'black', 'clear'], noun: 'beads', all: 'patterns', same: 'colour', ends: 'at the two ends of the row' },
  { verb: 'are planted in a row along a fence', kinds: ['spruce', 'pine', 'aspen', 'birch'], noun: 'trees', all: 'planting orders', same: 'type', ends: 'at the two ends of the row' },
  { verb: 'are laid in a row along a kitchen backsplash', kinds: ['white', 'grey', 'blue', 'black'], noun: 'tiles', all: 'designs', same: 'colour', ends: 'at the two ends of the row' },
];

/** "Flags of the same colour look identical." */
const sameText = (t: (typeof IDENTICAL)[number]) => `${cap(t.noun)} of the same ${t.same} look identical.`;

function specialD1(rng: Rng): GenOutput {
  const t = rng.pick(IDENTICAL);
  const nk = rng.pick([2, 3]);
  const kinds = rng.sample(t.kinds, nk);
  const counts = kinds.map(() => rng.int(1, 4)).sort((a, b) => b - a);
  if (!counts.some((c) => c > 1)) counts[0] = 3;
  const total = counts.reduce((s, c) => s + c, 0);
  const L = identicalLine(counts);
  const desc = andList(kinds.map((k, i) => `${counts[i]} ${k}`));
  if (rng.chance(0.3)) {
    const who = rng.pick(NAMES);
    const reps = counts.filter((c) => c > 1);
    const den = reps.map((c) => `${c}!`).join('\\,');
    return {
      prompt: `${total} ${t.noun} (${desc}) ${t.verb}. ${sameText(t)} ${who} says there are $${total}! = ${nx(fact(total))}$ different ${t.all}. Which statement is correct?`,
      parts: [
        part(
          mc(rng, `${who} is wrong: swapping identical ${t.noun} gives the same ${t.all.replace(/s$/, '')}, so divide by $${den}$ to get $${nx(L.value)}$.`, [
            `${who} is correct, because all $${total}$ ${t.noun} are being arranged.`,
            `${who} is wrong: the answer is $${reps.map((c) => `${c}!`).join(' + ')} = ${reps.reduce((s, c) => s + fact(c), 0)}$.`,
            `${who} is wrong: the answer is $${total}^{${total}} = ${nx(total ** total)}$, because the ${t.noun} can repeat.`,
          ]),
        ),
      ],
      hints: [`Imagine labelling the identical ${t.noun}. Swapping two identical ones does not change what you see.`, 'For $n$ objects with $a$ alike, $b$ alike, …, the number of arrangements is $\\dfrac{n!}{a!\\,b!\\cdots}$.'],
      solution: [`$${total}!$ counts the identical ${t.noun} as if they were different, so each ${t.all.replace(/s$/, '')} is counted many times.`, `$${L.tex}$`, `${who} is wrong; there are $${nx(L.value)}$ different ${t.all}.`],
    };
  }
  return {
    prompt: `${cap(desc)} ${t.noun} ${t.verb}. ${sameText(t)} How many different ${t.all} are possible using all ${total} ${t.noun}?`,
    parts: [numPart(L.value, { label: `${cap(t.all)}:` })],
    hints: [`Swapping two identical ${t.noun} does not create a new ${t.all.replace(/s$/, '')}.`, 'Divide $n!$ by the factorial of each group of identical objects.'],
    solution: [`There are $${total}$ ${t.noun}: ${desc}.`, `$${L.tex}$`, `There are $${nx(L.value)}$ different ${t.all}.`],
  };
}

function specialD2(rng: Rng): GenOutput {
  const kind = rng.pick(['spot', 'together', 'ends'] as const);
  const [A, B] = rng.sample(NAMES, 2);
  if (kind === 'spot') {
    const n = rng.pick([5, 6, 7, 8]);
    const mid = n % 2 === 1 && rng.chance(0.6);
    const N = mid ? fact(n - 1) : 2 * fact(n - 1);
    return {
      prompt: mid
        ? `${n} friends, including ${A}, line up for a team photo. ${A} is the captain and must stand in the middle. In how many ways can the friends line up?`
        : `${n} friends, including ${A}, line up for a team photo. ${A} must stand at one of the two ends. In how many ways can the friends line up?`,
      parts: [numPart(N, { label: 'Ways:' })],
      hints: ['Deal with the restriction first: where can the restricted person stand?', 'Then arrange everyone else in the remaining spots.'],
      solution: mid
        ? [`${A} has $1$ spot (the middle).`, `The other $${n - 1}$ friends fill the other spots: $${n - 1}! = ${nx(fact(n - 1))}$`, `$1 \\times ${nx(fact(n - 1))} = ${nx(N)}$ ways.`]
        : [`${A} has $2$ choices of spot (left end or right end).`, `The other $${n - 1}$ friends fill the remaining spots: $${n - 1}! = ${nx(fact(n - 1))}$`, `$2 \\times ${nx(fact(n - 1))} = ${nx(N)}$ ways.`],
    };
  }
  if (kind === 'together') {
    const n = rng.int(5, 8);
    const ctx = rng.pick([
      { intro: `${n} students, including the twins ${A} and ${B}, line up for a field trip bus.`, rule: `the twins must stand next to each other` },
      { intro: `${n} cars, including ${A}'s and ${B}'s, drive one behind another in a parade.`, rule: `${A}'s and ${B}'s cars must be next to each other` },
      { intro: `${n} dogs, including ${A}'s two puppies, walk in a single line in a dog show.`, rule: `the two puppies must be next to each other` },
    ]);
    const N = 2 * fact(n - 1);
    return {
      prompt: `${ctx.intro} In how many orders is this possible if ${ctx.rule}?`,
      parts: [numPart(N, { label: 'Orders:' })],
      hints: ['Treat the pair that must be together as a single unit.', 'Arrange the units, then multiply by 2 because the pair can be in either order.'],
      solution: [`Treat the pair as one unit. That makes $${n - 1}$ units: $${n - 1}! = ${nx(fact(n - 1))}$`, 'The pair can be arranged inside its unit in $2! = 2$ ways.', `$${nx(fact(n - 1))} \\times 2 = ${nx(N)}$`, `There are $${nx(N)}$ orders.`],
    };
  }
  const t = rng.pick(IDENTICAL.filter((x) => x.noun === 'flags' || x.noun === 'trees'));
  const [k1, k2, k3] = rng.sample(t.kinds, 3);
  const c1 = rng.int(3, 5);
  const c2 = rng.int(2, 4);
  const c3 = 2;
  const L = identicalLine([c1, c2]);
  return {
    prompt: `${c1} ${k1}, ${c2} ${k2} and ${c3} ${k3} ${t.noun} ${t.verb}. ${sameText(t)} The two ${k3} ${t.noun} must go ${t.ends}. How many different ${t.all} are possible?`,
    parts: [numPart(L.value, { label: `${cap(t.all)}:` })],
    hints: [`The two ${k3} ${t.noun} are identical, so placing them at the two ends can be done in only 1 way.`, `Arrange the other ${c1 + c2} ${t.noun} in the middle, dividing by the factorials of the identical groups.`],
    solution: [`The ${k3} ${t.noun} fill both ends: $1$ way, because they are identical.`, `The middle holds ${c1} ${k1} and ${c2} ${k2}: $${L.tex}$`, `There are $${nx(L.value)}$ different ${t.all}.`],
  };
}

function specialD3(rng: Rng): GenOutput {
  const kind = rng.pick(['apart', 'alternate', 'parents', 'block'] as const);
  const [A, B] = rng.sample(NAMES, 2);
  if (kind === 'apart') {
    const n = rng.int(5, 8);
    const together = 2 * fact(n - 1);
    const N = fact(n) - together;
    return {
      prompt: `${n} members of a band, including ${A} and ${B}, stand in a row for a publicity photo. ${A} and ${B} had an argument and refuse to stand next to each other. In how many ways can the band line up?`,
      parts: [numPart(N, { label: 'Ways:' })],
      hints: ['It is easier to count the line-ups where the two **are** together, then subtract from the total.', 'Together: treat them as one unit, and remember they can switch places.'],
      solution: [`All line-ups: $${n}! = ${nx(fact(n))}$`, `Line-ups with ${A} and ${B} together: $2 \\times ${n - 1}! = ${nx(together)}$`, `Not together: $${nx(fact(n))} - ${nx(together)} = ${nx(N)}$`, `There are $${nx(N)}$ ways.`],
    };
  }
  if (kind === 'alternate') {
    const g = rng.int(2, 4);
    const extra = rng.chance(0.5);
    const b = extra ? g + 1 : g;
    const N = (extra ? 1 : 2) * fact(b) * fact(g);
    return {
      prompt: `${b} boys and ${g} girls sit in a row of ${b + g} chairs for a choir photo. Boys and girls must alternate (no two boys and no two girls side by side). How many seating arrangements are possible?`,
      parts: [numPart(N, { label: 'Arrangements:' })],
      hints: [extra ? 'With one more boy than girls, the row must start and end with a boy.' : 'With equal numbers, the row can start with a boy or with a girl: two patterns.', 'In each pattern, arrange the boys in the boys’ chairs and the girls in the girls’ chairs, then multiply.'],
      solution: [
        extra ? `There is one more boy, so the only pattern is B G B G … B.` : `Two patterns are possible: B G B G … or G B G B …`,
        `Boys in their chairs: $${b}! = ${fact(b)}$. Girls in their chairs: $${g}! = ${fact(g)}$.`,
        `$${extra ? '' : '2 \\times '}${fact(b)} \\times ${fact(g)} = ${nx(N)}$`,
        `There are $${nx(N)}$ arrangements.`,
      ],
    };
  }
  if (kind === 'parents') {
    const k = rng.int(3, 6);
    const N = 2 * fact(k);
    return {
      prompt: `A family of two parents and ${k} children sits in a row at a hockey game in ${rng.pick(PLACES)}. The parents sit at the two ends of the row. In how many ways can the family sit?`,
      parts: [numPart(N, { label: 'Ways:' })],
      hints: ['Place the parents first: how many ways can they fill the two end seats?', `Then arrange the ${k} children in the middle seats.`],
      solution: [`Parents at the ends: $2! = 2$ ways (either parent on the left).`, `Children in the middle: $${k}! = ${fact(k)}$`, `$2 \\times ${fact(k)} = ${nx(N)}$`, `There are $${nx(N)}$ ways.`],
    };
  }
  const t = rng.pick(IDENTICAL.filter((x) => x.noun !== 'flags'));
  const [k1, k2, k3] = rng.sample(t.kinds, 3);
  const c1 = rng.int(2, 4);
  const c2 = rng.int(2, 4);
  const units = [c1, c2, 1];
  const L = identicalLine(units);
  return {
    prompt: `${c1} ${k1}, ${c2} ${k2} and 2 ${k3} ${t.noun} ${t.verb}. ${sameText(t)} The two ${k3} ${t.noun} must be side by side. How many different ${t.all} are possible?`,
    parts: [numPart(L.value, { label: `${cap(t.all)}:` })],
    hints: [`Treat the two ${k3} ${t.noun} as one block. Because they are identical, the block can be arranged inside in only 1 way.`, `Arrange the block with the other ${c1 + c2} ${t.noun}, dividing by the factorials of the identical groups.`],
    solution: [
      `Treat the two ${k3} ${t.noun} as one block. Units: ${c1} ${k1}, ${c2} ${k2} and 1 block, so $${c1 + c2 + 1}$ units.`,
      `$${L.tex}$`,
      `The block is two identical ${t.noun}, so it adds no extra arrangements.`,
      `There are $${nx(L.value)}$ different ${t.all}.`,
    ],
  };
}

const permutationsSpecial = skill({
  id: 'm302-permutations-special',
  name: 'Permutations with identical items and restrictions',
  description: 'Count arrangements of objects where some are identical, and arrangements with positions fixed, objects together or apart, or alternating.',
  outcomes: ['P5'],
  lessonId: 'm302-2-3',
  calculator: true,
  gen: (rng, d) => (d === 1 ? specialD1(rng) : d === 2 ? specialD2(rng) : specialD3(rng)),
});

// ---------------------------------------------------------------------------
// Lesson 2.4 — Combinations
// ---------------------------------------------------------------------------

const SCENARIOS: Array<{ text: string; perm: boolean; why: string }> = [
  { text: 'choosing 3 toppings for a pizza', perm: false, why: 'a pizza with ham, olives and peppers is the same as one with peppers, ham and olives' },
  { text: 'electing a president, a vice-president and a treasurer from a club', perm: true, why: 'the three offices are different jobs' },
  { text: 'choosing 5 players from a team to go to a tournament', perm: false, why: 'the same 5 players make the same group whatever order they are picked in' },
  { text: 'awarding gold, silver and bronze medals in a race', perm: true, why: 'gold is different from silver and bronze' },
  { text: 'setting a 4-digit PIN with no repeated digits', perm: true, why: '1234 and 4321 are different PINs' },
  { text: 'picking 4 books to take on a camping trip', perm: false, why: 'the same 4 books make the same selection in any order' },
  { text: 'arranging 6 photos in a row on a poster', perm: true, why: 'moving the photos to different spots gives a different poster' },
  { text: 'being dealt a 5-card hand in a card game', perm: false, why: 'a hand is the same no matter which card was dealt first' },
  { text: 'choosing a committee of 4 from a class', perm: false, why: 'the committee members all have the same role' },
  { text: 'choosing the batting order for 9 baseball players', perm: true, why: 'batting first is different from batting ninth' },
  { text: 'choosing 2 friends to invite to a concert', perm: false, why: 'inviting Ava and Kwame is the same as inviting Kwame and Ava' },
  { text: 'choosing a starting goalie and a backup goalie', perm: true, why: 'the two positions are different' },
];

function combD1(rng: Rng): GenOutput {
  if (rng.chance(0.45)) {
    const s = rng.pick(SCENARIOS);
    const P = 'Permutation, because order matters';
    const C = 'Combination, because order does not matter';
    return {
      prompt: `Does this situation involve a permutation or a combination?\n\n**${cap(s.text)}**`,
      parts: [part(mc(rng, s.perm ? P : C, [s.perm ? C : P, s.perm ? 'Combination, because no item is used twice' : 'Permutation, because no item is used twice', 'Neither, because items can repeat'], { keepOrder: false }))],
      hints: ['Swap the order of two of the items chosen. Do you get a different result?', 'If a different order gives a different result (different jobs, places or positions), it is a permutation. If not, it is a combination.'],
      solution: [`Swap the order of two items: ${s.why}.`, s.perm ? 'A different order gives a different result, so order matters.' : 'A different order gives the same result, so order does not matter.', `It is a ${s.perm ? 'permutation' : 'combination'}.`],
    };
  }
  const who = rng.pick(NAMES);
  const ctx = rng.pick([
    { n: [6, 10], r: [2, 4], text: (n: number, r: number) => `${who} has ${n} movies saved and wants to pick ${r} of them for a sleepover. How many different sets of movies can ${who} pick?` },
    { n: [6, 12], r: [2, 3], text: (n: number, r: number) => `${who} has ${r} extra concert tickets to give to ${r} of ${n} friends. How many different groups of friends can be invited?` },
    { n: [8, 15], r: [3, 5], text: (n: number, r: number) => `${who} is choosing ${r} of ${n} photos for a collage, where the photos can go anywhere. How many different sets of photos can be chosen?` },
    { n: [7, 12], r: [2, 4], text: (n: number, r: number) => `A frozen yogurt shop in ${rng.pick(PLACES)} has ${n} toppings. A "mix" cup has ${r} different toppings. How many different mix cups are possible?` },
  ]);
  const n = rng.int(ctx.n[0], ctx.n[1]);
  const r = rng.int(ctx.r[0], ctx.r[1]);
  const N = comb(n, r);
  return {
    prompt: ctx.text(n, r),
    parts: [numPart(N, { label: 'Groups:' })],
    hints: ['The order of choosing does not matter, so use combinations.', `$${nC('n', 'r')} = \\dfrac{n!}{(n - r)!\\,r!}$`],
    solution: [`Order does not matter, so this is $${nC(n, r)}$.`, `$${combLine(n, r)}$`, `There are $${nx(N)}$ different groups.`],
  };
}

function combD2(rng: Rng): GenOutput {
  if (rng.chance(0.45)) {
    const t = rng.pick([
      { q: 'How many 2-card hands are a pair (two cards of the same rank, such as two 9s)?', value: 13 * 6, steps: ['Choose the rank: $13$ ways.', `Choose 2 of the 4 cards of that rank: $${nC(4, 2)} = 6$.`, '$13 \\times 6 = 78$'] },
      { q: 'How many 4-card hands have one card from each suit?', value: 13 ** 4, steps: ['Choose 1 heart, 1 diamond, 1 club and 1 spade: $13$ choices each.', `$13 \\times 13 \\times 13 \\times 13 = 13^4 = ${nx(13 ** 4)}$`] },
      { q: 'How many 2-card hands contain two red cards?', value: comb(26, 2), steps: ['There are 26 red cards.', `$${combLine(26, 2)}$`] },
      { q: 'How many 3-card hands contain only face cards?', value: comb(12, 3), steps: ['There are 12 face cards (J, Q and K in 4 suits).', `$${combLine(12, 3)}$`] },
      { q: 'In blackjack, a 2-card hand of an ace and a card worth 10 (a 10, J, Q or K) is called a blackjack. How many different blackjack hands are there?', value: 4 * 16, steps: ['Choose the ace: $4$ ways. Choose the 10-value card: there are $4 \\times 4 = 16$ of them.', '$4 \\times 16 = 64$'] },
      { q: 'How many 3-card hands contain three cards of the same rank (such as three Qs)?', value: 13 * 4, steps: ['Choose the rank: $13$ ways.', `Choose 3 of its 4 cards: $${nC(4, 3)} = 4$.`, '$13 \\times 4 = 52$'] },
    ]);
    return {
      prompt: `${DECK}\n\n${t.q}`,
      parts: [numPart(t.value, { label: 'Hands:' })],
      hints: ['A hand is a combination: the order the cards are dealt does not matter.', 'Break the hand into choices (a rank, a suit, a group of cards), count each, and multiply.'],
      solution: [...t.steps, `There are $${nx(t.value)}$ such hands.`],
    };
  }
  const ctx = rng.pick([
    { g1: 'singers', g2: 'dancers', what: 'a talent show act' },
    { g1: 'Grade 11 players', g2: 'Grade 12 players', what: 'an all-star volleyball team' },
    { g1: 'adults', g2: 'teens', what: 'a volunteer crew at a food bank' },
    { g1: 'fiction books', g2: 'non-fiction books', what: 'a book club reading list' },
  ]);
  const a = rng.int(5, 9);
  const b = rng.int(5, 10);
  const x = rng.int(2, 3);
  const y = rng.int(2, 3);
  const N = comb(a, x) * comb(b, y);
  return {
    prompt: `For ${ctx.what}, ${x} of ${a} ${ctx.g1} and ${y} of ${b} ${ctx.g2} are chosen. How many different selections are possible?`,
    parts: [numPart(N, { label: 'Selections:' })],
    hints: [`Choose the ${ctx.g1} **and** choose the ${ctx.g2}: count each with a combination.`, 'Multiply the two counts (the fundamental counting principle).'],
    solution: [`${cap(ctx.g1)}: $${combLine(a, x)}$`, `${cap(ctx.g2)}: $${combLine(b, y)}$`, `$${nx(comb(a, x))} \\times ${nx(comb(b, y))} = ${nx(N)}$`, `There are $${nx(N)}$ possible selections.`],
  };
}

function combD3(rng: Rng): GenOutput {
  const kind = rng.pick(['toppings', 'arrange', 'chair', 'atleast'] as const);
  if (kind === 'toppings') {
    const n = rng.int(5, 10);
    const mode = rng.pick(['any', 'atMost2', 'twoOrThree'] as const);
    const place = rng.pick(PLACES);
    if (mode === 'any') {
      const N = 2 ** n - 1;
      return {
        prompt: `A sandwich shop in ${place} offers ${n} different toppings. A customer must choose at least one topping and can choose up to all ${n}. How many different topping combinations are possible?`,
        parts: [numPart(N, { label: 'Combinations:' })],
        hints: ['For each topping, the customer says yes or no: that is 2 choices per topping.', 'Count all yes/no patterns, then remove the one pattern with no toppings.'],
        solution: [`Each of the ${n} toppings is either on or off: $2^{${n}} = ${nx(2 ** n)}$ patterns.`, 'One pattern has no toppings at all, which is not allowed.', `$${nx(2 ** n)} - 1 = ${nx(N)}$`, `There are $${nx(N)}$ topping combinations. (This equals $${nC(n, 1)} + ${nC(n, 2)} + \\cdots + ${nC(n, n)}$.)`],
      };
    }
    const ks = mode === 'atMost2' ? [0, 1, 2] : [2, 3];
    const vals = ks.map((k) => comb(n, k));
    const N = vals.reduce((s, v) => s + v, 0);
    return {
      prompt:
        mode === 'atMost2'
          ? `A sandwich shop in ${place} offers ${n} different toppings. A customer may choose at most 2 toppings (no toppings is allowed). How many different topping choices are possible?`
          : `A sandwich shop in ${place} offers ${n} different toppings. A customer chooses either 2 or 3 different toppings. How many different topping choices are possible?`,
      parts: [numPart(N, { label: 'Choices:' })],
      hints: [`List the cases: ${andList(ks.map((k) => `${k} topping${k === 1 ? '' : 's'}`))}.`, 'Count each case with a combination, then add (the cases cannot happen together).'],
      solution: [...ks.map((k, i) => `${k} topping${k === 1 ? '' : 's'}: $${nC(n, k)} = ${nx(vals[i])}$`), `Add the cases: $${vals.map(nx).join(' + ')} = ${nx(N)}$`, `There are $${nx(N)}$ different topping choices.`],
    };
  }
  if (kind === 'arrange') {
    const n = rng.int(6, 10);
    const r = rng.int(3, 4);
    const sel = comb(n, r);
    const N = sel * fact(r);
    const who = rng.pick(NAMES);
    return {
      prompt: `${who} has ${n} paintings and will choose ${r} of them for an art show.\n\n(a) How many different groups of ${r} paintings can ${who} choose?\n\n(b) The ${r} paintings will hang in a row, left to right. How many different displays (choice and order) are possible?`,
      parts: [numPart(sel, { label: '(a) Groups:' }), numPart(N, { label: '(b) Displays:' })],
      hints: ['(a) Choosing a group: order does not matter.', `(b) Each group of ${r} can be hung in $${r}!$ orders. Multiply.`],
      solution: [
        `(a) $${combLine(n, r)}$`,
        `(b) Each group can be arranged in $${r}! = ${fact(r)}$ orders: $${nx(sel)} \\times ${fact(r)} = ${nx(N)}$`,
        `This matches $${nP(n, r)} = ${nx(perm(n, r))}$: choosing and then arranging is a permutation.`,
        `(a) $${nx(sel)}$ groups; (b) $${nx(N)}$ displays.`,
      ],
    };
  }
  if (kind === 'chair') {
    const n = rng.int(8, 14);
    const r = rng.int(3, 5);
    const N = comb(n, r) * r;
    return {
      prompt: `A ${r}-person grad committee is chosen from ${n} students, and then one of the ${r} committee members is chosen to be the chair. How many different ways can this be done?`,
      parts: [numPart(N, { label: 'Ways:' })],
      hints: [`First choose the ${r} members (order does not matter).`, `Then choose the chair from those ${r} people, and multiply.`],
      solution: [`Choose the committee: $${combLine(n, r)}$`, `Choose the chair from the ${r} members: $${r}$ ways.`, `$${nx(comb(n, r))} \\times ${r} = ${nx(N)}$`, `There are $${nx(N)}$ ways.`],
    };
  }
  const r = rng.int(3, 5);
  const adults = rng.int(4, 8);
  const teens = rng.int(3, 6);
  const T = comb(adults + teens, r);
  const none = comb(adults, r);
  const N = T - none;
  return {
    prompt: `A food bank in ${rng.pick(PLACES)} needs ${r} volunteers for a Saturday shift. ${adults} adults and ${teens} teens have signed up. How many different groups of ${r} include at least one teen?`,
    parts: [numPart(N, { label: 'Groups:' })],
    hints: ['"At least one teen" includes many cases. Count the groups with **no** teens instead.', 'At least one teen = all groups − groups of adults only.'],
    solution: [`All groups: $${combLine(adults + teens, r)}$`, `Groups with no teens (adults only): $${combLine(adults, r)}$`, `At least one teen: $${nx(T)} - ${nx(none)} = ${nx(N)}$`, `There are $${nx(N)}$ groups.`],
  };
}

const combinations = skill({
  id: 'm302-combinations',
  name: 'Combinations',
  description: 'Decide whether order matters, and use nCr to count selections, including card hands and problems with cases.',
  outcomes: ['P6'],
  lessonId: 'm302-2-4',
  calculator: true,
  gen: (rng, d) => (d === 1 ? combD1(rng) : d === 2 ? combD2(rng) : combD3(rng)),
});

export const COUNTING_SKILLS: SkillDef[] = [countingPrinciple, permutations, permutationsSpecial, combinations];
