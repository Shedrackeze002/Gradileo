/** Math 5 Unit 6 — Ratios and Percentages (N7). Part-part and part-whole ratios; ratio, fraction, decimal and percentage. */
import { mc, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, Part, PlaneFigure, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type Out = GenOutput;

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Harpreet', 'Noor', 'Thanh', 'Kateri', 'Diego', 'Ngozi', 'Leah', 'Ravi',
];
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater'];

const fr = (n: number | string, d: number | string) => `\\dfrac{${n}}{${d}}`;
/** A ratio with a colon, inside maths. */
const ratio = (a: number | string, b: number | string) => `${a} : ${b}`;
const rm = (a: number | string, b: number | string) => `$${ratio(a, b)}$`;
const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/** A whole-number answer. */
const wholePart = (v: number, label?: string, suffix?: string): Part => numPart(v, { exact: false, label, suffix });

// ---------------------------------------------------------------------------
// Figures
// ---------------------------------------------------------------------------

/** Counters on a blank canvas: `a` shaded counters and `b` white counters, in rows of up to 10, in the given order. */
function countersFigure(order: boolean[], caption: string): PlaneFigure {
  const perRow = Math.min(10, order.length);
  const rows = Math.ceil(order.length / perRow);
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: perRow, yMin: 0, yMax: rows, step: perRow },
    hideTickLabels: true,
    points: order.map((shaded, i) => ({
      x: (i % perRow) + 0.5,
      y: rows - Math.floor(i / perRow) - 0.5,
      color: shaded ? ('accent' as const) : ('brand' as const),
      ...(shaded ? {} : { open: true }),
    })),
    caption,
  };
}

/** A grid of rows × cols squares with the first `shaded` squares shaded, row by row from the top. */
function gridFigure(rows: number, cols: number, shaded: number, caption: string): PlaneFigure {
  const polylines: NonNullable<PlaneFigure['polylines']> = [];
  const full = Math.floor(shaded / cols);
  const extra = shaded % cols;
  const rect = (x0: number, y0: number, x1: number, y1: number): Array<[number, number]> => [[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]];
  if (full > 0) {
    const r = rect(0, rows - full, cols, rows);
    polylines.push({ points: r, color: 'accent', fill: true }, { points: r, color: 'accent', fill: true });
  }
  if (extra > 0) {
    const r = rect(0, rows - full - 1, extra, rows - full);
    polylines.push({ points: r, color: 'accent', fill: true }, { points: r, color: 'accent', fill: true });
  }
  return { type: 'plane', grid: { xMin: 0, xMax: cols, yMin: 0, yMax: rows, step: 1 }, hideTickLabels: true, hideAxes: true, polylines, caption };
}

/** Rows and columns for a grid of n squares (n = 4, 5, 10, 20, 25, 50 or 100). */
const GRID: Record<number, [number, number]> = { 4: [1, 4], 5: [1, 5], 10: [1, 10], 20: [2, 10], 25: [5, 5], 50: [5, 10], 100: [10, 10] };

// ---------------------------------------------------------------------------
// 6.1 Ratios
// ---------------------------------------------------------------------------

interface TwoParts {
  /** Sentence giving both counts. */
  text: (a: number, b: number) => string;
  /** Names of the two parts, the whole (for "to all the ..."), and a plural noun for the whole set. */
  A: string;
  B: string;
  whole: string;
  noun: string;
  range: [number, number];
}

const TWO: TwoParts[] = [
  { text: (a, b) => `A bag has $${a}$ red marbles and $${b}$ blue marbles.`, A: 'red marbles', B: 'blue marbles', whole: 'all the marbles', noun: 'marbles', range: [2, 9] },
  { text: (a, b) => `A chess club has $${a}$ girls and $${b}$ boys.`, A: 'girls', B: 'boys', whole: 'all the club members', noun: 'club members', range: [3, 12] },
  { text: (a, b) => `An animal shelter in @town has $${a}$ cats and $${b}$ dogs.`, A: 'cats', B: 'dogs', whole: 'all the animals', noun: 'animals', range: [2, 12] },
  { text: (a, b) => `A beaded bracelet has $${a}$ blue beads and $${b}$ white beads.`, A: 'blue beads', B: 'white beads', whole: 'all the beads', noun: 'beads', range: [4, 15] },
  { text: (a, b) => `On a field trip bus to @town, there are $${a}$ adults and $${b}$ students.`, A: 'adults', B: 'students', whole: 'all the people on the bus', noun: 'people on the bus', range: [2, 9] },
  { text: (a, b) => `@name took shots at hockey practice. $${a}$ shots were goals and $${b}$ shots missed.`, A: 'goals', B: 'missed shots', whole: 'all the shots', noun: 'shots', range: [2, 12] },
  { text: (a, b) => `A garden bed has $${a}$ tomato plants and $${b}$ pepper plants.`, A: 'tomato plants', B: 'pepper plants', whole: 'all the plants', noun: 'plants', range: [2, 10] },
  { text: (a, b) => `A basket has $${a}$ apples and $${b}$ oranges.`, A: 'apples', B: 'oranges', whole: 'all the fruit', noun: 'pieces of fruit', range: [2, 10] },
];

function fillCtx(rng: Rng, t: string): string {
  return t.replace('@town', rng.pick(TOWNS)).replace('@name', rng.pick(NAMES));
}

const RATIO_DEF_HINT = 'A ratio compares two amounts in order. The first amount named goes first.';

function ratioD1(rng: Rng): Out {
  const c = rng.pick(TWO);
  const [A, B] = retry(() => [rng.int(c.range[0], c.range[1]), rng.int(c.range[0], c.range[1])], ([x, y]) => x !== y, 50);
  const W = A + B;
  const kind = rng.pick(['AB', 'BA', 'Awhole', 'Bwhole'] as const);
  const pic = W <= 20 && rng.chance(0.5);
  const order = rng.shuffle([...Array(A).fill(true), ...Array(B).fill(false)] as boolean[]);
  const ask =
    kind === 'AB' ? `${c.A} to ${c.B}` : kind === 'BA' ? `${c.B} to ${c.A}` : kind === 'Awhole' ? `${c.A} to ${c.whole}` : `${c.B} to ${c.whole}`;
  const [p, q] = kind === 'AB' ? [A, B] : kind === 'BA' ? [B, A] : kind === 'Awhole' ? [A, W] : [B, W];
  const wrong = kind === 'AB' || kind === 'BA' ? [rm(q, p), rm(p, W), rm(q, W)] : [rm(p, kind === 'Awhole' ? B : A), rm(W, p), rm(kind === 'Awhole' ? B : A, W)];
  const partWhole = kind === 'Awhole' || kind === 'Bwhole';
  return {
    prompt: `${fillCtx(rng, c.text(A, B))}${pic ? ` The shaded counters show the ${c.A} and the white counters show the ${c.B}.` : ''} What is the ratio of ${ask}?`,
    figure: pic ? countersFigure(order, `${A} shaded counters and ${B} white counters`) : undefined,
    parts: [{ answer: mc(rng, rm(p, q), wrong) }],
    hints: [
      RATIO_DEF_HINT,
      partWhole ? `This is a part-whole ratio. The whole is $${A} + ${B} = ${W}$.` : `This is a part-part ratio. Write the number of ${kind === 'AB' ? c.A : c.B} first.`,
    ],
    solution: [
      partWhole ? `The whole is ${c.whole}: $${A} + ${B} = ${W}$.` : `There are $${p}$ ${kind === 'AB' ? c.A : c.B} and $${q}$ ${kind === 'AB' ? c.B : c.A}.`,
      `The ratio of ${ask} is $${ratio(p, q)}$. It can also be written as the fraction $${fr(p, q)}$.`,
      `The answer is ${rm(p, q)}.`,
    ],
  };
}

function ratioD2(rng: Rng): Out {
  const c = rng.pick(TWO);
  const [A, B] = retry(() => [rng.int(c.range[0], c.range[1] + 4), rng.int(c.range[0], c.range[1] + 4)], ([x, y]) => x !== y, 50);
  const W = A + B;
  const text = fillCtx(rng, c.text(A, B));
  const kind = rng.pick(['fraction', 'fraction', 'missingWhole', 'missingPart'] as const);
  if (kind === 'fraction') {
    const first = rng.chance(0.5);
    const [p, name] = first ? [A, c.A] : [B, c.B];
    return {
      prompt: `${text} Write the part-whole ratio of ${name} to ${c.whole} as a fraction.`,
      parts: [numPart(p / W, { exact: false, display: 'fraction' })],
      hints: ['A part-whole ratio compares one part with the whole. As a fraction, the part is the numerator and the whole is the denominator.', `The whole is $${A} + ${B}$.`],
      solution: [`The part is the $${p}$ ${name}.`, `The whole is $${A} + ${B} = ${W}$.`, `The ratio is $${ratio(p, W)}$. As a fraction it is $${fr(p, W)}$.`],
    };
  }
  if (kind === 'missingWhole') {
    const first = rng.chance(0.5);
    const [p, name] = first ? [A, c.A] : [B, c.B];
    return {
      prompt: `${text} Complete the part-whole ratio of ${name} to ${c.whole}: $${ratio(p, '\\square')}$`,
      parts: [wholePart(W, '$\\square =$')],
      hints: ['The second number of a part-whole ratio is the whole.', `Add the two parts: $${A} + ${B}$.`],
      solution: [`The whole is $${A} + ${B} = ${W}$.`, `The ratio of ${name} to ${c.whole} is $${ratio(p, W)}$.`, `The missing number is $${W}$.`],
    };
  }
  // Missing part-part term from the whole.
  return {
    prompt: `There are $${W}$ ${c.noun} in all. $${A}$ of them ${A === 1 ? 'is' : 'are'} ${c.A}. The rest are ${c.B}. Complete the part-part ratio of ${c.A} to ${c.B}: $${ratio(A, '\\square')}$`,
    parts: [wholePart(B, '$\\square =$')],
    hints: [`Find how many are ${c.B}: take the ${c.A} away from the whole.`, `$${W} - ${A} = ?$`],
    solution: [`The number of ${c.B} is $${W} - ${A} = ${B}$.`, `The ratio of ${c.A} to ${c.B} is $${ratio(A, B)}$.`, `The missing number is $${B}$.`],
  };
}

interface ThreeParts {
  intro: string;
  names: [string, string, string];
  whole: string;
  /** The part for one category, e.g. "votes for summer". */
  who: (n: string) => string;
  /** Everything except one category, e.g. "votes that were not for summer". */
  not: (n: string) => string;
  range: [number, number];
  /** Shown as a bar graph instead of in the text. */
  graph?: { title: string; value: string };
}

const THREE: ThreeParts[] = [
  { intro: 'A fruit bowl has', names: ['apples', 'pears', 'bananas'], whole: 'pieces of fruit', who: (n) => n, not: (n) => `pieces of fruit that are not ${n}`, range: [2, 9] },
  {
    intro: 'A class voted for a favourite season. The votes are', names: ['summer', 'winter', 'fall'], whole: 'votes',
    who: (n) => `votes for ${n}`, not: (n) => `votes that are not for ${n}`, range: [3, 12], graph: { title: 'Favourite season', value: 'Number of votes' },
  },
  { intro: 'A pet store has', names: ['hamsters', 'guinea pigs', 'rabbits'], whole: 'animals', who: (n) => n, not: (n) => `animals that are not ${n}`, range: [2, 9] },
  { intro: 'A box of crayons has', names: ['red crayons', 'green crayons', 'yellow crayons'], whole: 'crayons', who: (n) => n, not: (n) => `crayons that are not ${n.replace(' crayons', '')}`, range: [3, 12] },
  {
    intro: 'Each student chose a field trip. The choices are', names: ['the zoo', 'the science centre', 'the farm'], whole: 'students',
    who: (n) => `students who chose ${n}`, not: (n) => `students who did not choose ${n}`, range: [4, 14], graph: { title: 'Field trip choices', value: 'Number of students' },
  },
];

interface Mix {
  intro: (a: number, b: number) => string;
  A: string;
  B: string;
  whole: string;
  unit: string;
}

const MIXES: Mix[] = [
  { intro: (a, b) => `A punch recipe mixes $${a}$ cups of orange juice with $${b}$ cups of sparkling water.`, A: 'orange juice', B: 'sparkling water', whole: 'punch', unit: 'cups' },
  { intro: (a, b) => `A paint colour is made with $${a}$ L of blue paint and $${b}$ L of white paint.`, A: 'blue paint', B: 'white paint', whole: 'paint', unit: 'L' },
  { intro: (a, b) => `A trail mix uses $${a}$ cups of oats and $${b}$ cups of raisins.`, A: 'oats', B: 'raisins', whole: 'trail mix', unit: 'cups' },
];

function ratioD3(rng: Rng): Out {
  if (rng.chance(0.3)) {
    const m = rng.pick(MIXES);
    const [a, b] = retry(() => [rng.int(1, 6), rng.int(2, 9)], ([x, y]) => x !== y, 50);
    const W = a + b;
    return {
      prompt: `${m.intro(a, b)}\n\n(a) Complete the part-part ratio of ${m.A} to ${m.B}: $${ratio(a, '\\square')}$\n\n(b) Write the part-whole ratio of ${m.A} to all the ${m.whole} as a fraction.`,
      parts: [wholePart(b, '(a) $\\square =$'), numPart(a / W, { exact: false, display: 'fraction', label: '(b)' })],
      hints: ['Ratios can compare measured amounts, not just things you count.', `The whole ${m.whole} is $${a} + ${b} = ${W}$ ${m.unit}.`],
      solution: [
        `(a) ${cap(m.A)} to ${m.B}: $${ratio(a, b)}$, so the missing number is $${b}$.`,
        `(b) The whole is $${a} + ${b} = ${W}$ ${m.unit}.`,
        `${cap(m.A)} to all the ${m.whole}: $${ratio(a, W)}$, which is the fraction $${fr(a, W)}$.`,
        `The answers are (a) $${b}$ and (b) $${fr(a, W)}$.`,
      ],
    };
  }
  const t = rng.pick(THREE);
  const counts = retry(() => [rng.int(t.range[0], t.range[1]), rng.int(t.range[0], t.range[1]), rng.int(t.range[0], t.range[1])], (v) => new Set(v).size === 3, 50);
  const W = counts[0] + counts[1] + counts[2];
  const [i, j] = rng.sample([0, 1, 2], 2);
  const k = 3 - i - j;
  const top = 2 * Math.ceil((Math.max(...counts) + 1) / 2);
  const figure: Figure | undefined = t.graph
    ? { type: 'barChart', categories: t.names.map((n) => cap(n.replace(/^the /, ''))), values: counts, valueLabel: t.graph.value, max: top, step: 2, caption: t.graph.title }
    : undefined;
  const list = `$${counts[0]}$ ${t.names[0]}, $${counts[1]}$ ${t.names[1]} and $${counts[2]}$ ${t.names[2]}`;
  const intro = t.graph ? `${t.intro} shown in the bar graph.` : `${t.intro} ${list}.`;
  const sum = `$${counts[0]} + ${counts[1]} + ${counts[2]} = ${W}$`;
  if (rng.chance(0.5)) {
    // Part-whole, then a part-part ratio where one part is "everything except k".
    const rest = W - counts[k];
    return {
      prompt: `${intro}\n\n(a) Complete the part-whole ratio of ${t.who(t.names[k])} to all the ${t.whole}: $${ratio(counts[k], '\\square')}$\n\n(b) Complete the part-part ratio of ${t.not(t.names[k])} to ${t.who(t.names[k])}: $${ratio('\\square', counts[k])}$`,
      figure,
      parts: [wholePart(W, '(a) $\\square =$'), wholePart(rest, '(b) $\\square =$')],
      hints: ['First find the whole: add all three numbers.', `For (b), take the ${t.who(t.names[k])} away from the whole.`],
      solution: [
        `The whole is ${sum}.`,
        `(a) ${cap(t.who(t.names[k]))} to all the ${t.whole}: $${ratio(counts[k], W)}$.`,
        `(b) ${cap(t.not(t.names[k]))}: $${W} - ${counts[k]} = ${rest}$. The ratio is $${ratio(rest, counts[k])}$.`,
        `The answers are (a) $${W}$ and (b) $${rest}$.`,
      ],
    };
  }
  return {
    prompt: `${intro}\n\n(a) Complete the part-part ratio of ${t.who(t.names[i])} to ${t.who(t.names[j])}: $${ratio(counts[i], '\\square')}$\n\n(b) Write the part-whole ratio of ${t.who(t.names[i])} to all the ${t.whole} as a fraction.`,
    figure,
    parts: [wholePart(counts[j], '(a) $\\square =$'), numPart(counts[i] / W, { exact: false, display: 'fraction', label: '(b)' })],
    hints: ['A part-part ratio compares two parts. A part-whole ratio compares one part with the whole.', 'The whole is all three numbers added together.'],
    solution: [
      `(a) ${cap(t.who(t.names[i]))} to ${t.who(t.names[j])}: $${ratio(counts[i], counts[j])}$, so the missing number is $${counts[j]}$.`,
      `(b) The whole is ${sum}.`,
      `${cap(t.who(t.names[i]))} to all the ${t.whole}: $${ratio(counts[i], W)}$, which is the fraction $${fr(counts[i], W)}$.`,
      `The answers are (a) $${counts[j]}$ and (b) $${fr(counts[i], W)}$.`,
    ],
  };
}

const ratios = skill({
  id: 'm5-ratios',
  name: 'Part-part and part-whole ratios',
  description: 'Write part-part and part-whole ratios with a colon or as a fraction to describe a situation.',
  outcomes: ['N7'],
  lessonId: 'm5-6-1',
  gen(rng, d) {
    if (d === 1) return ratioD1(rng);
    if (d === 2) return ratioD2(rng);
    return ratioD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 6.2 Ratios, fractions, decimals and percentages
// ---------------------------------------------------------------------------

/** A hundredths value written as a decimal: 0.45, 0.3, 1. */
const dec = (hundredths: number) => fmt(hundredths / 100, 2);
const pct = (hundredths: number) => `${hundredths}\\%`;

/** The steps that turn a/b into hundredths. */
function toHundredths(a: number, b: number): string[] {
  if (b === 100) return [`$${fr(a, 100)}$ already compares with $100$.`];
  const k = 100 / b;
  return [`Make the whole $100$: $${b} \\times ${k} = 100$, so multiply the part by $${k}$ too: $${a} \\times ${k} = ${a * k}$.`, `$${fr(a, b)} = ${fr(a * k, 100)}$`];
}

interface PctCtx {
  text: (a: number, b: number, name: string, town: string) => string;
  /** The part and the whole, for "the part-whole ratio of ... to ...". */
  part: string;
  all: string;
  /** The percentage question. */
  ask: (name: string) => string;
  whole: number[];
}

const are = (a: number) => (a === 1 ? 'is' : 'are');

const PCT_CTX: PctCtx[] = [
  {
    text: (a, b, name) => `${name} answered $${a}$ of $${b}$ questions correctly on a spelling quiz.`,
    part: 'questions answered correctly', all: 'all the questions', ask: (name) => `What percentage of the questions did ${name} answer correctly?`, whole: [10, 20, 25, 50],
  },
  {
    text: (a, b, _n, town) => `A hockey team in ${town} played $${b}$ games and won $${a}$ of them.`,
    part: 'games won', all: 'all the games played', ask: () => 'What percentage of its games did the team win?', whole: [10, 20, 25],
  },
  {
    text: (a, b) => `In a class of $${b}$ students, $${a}$ ${a === 1 ? 'walks' : 'walk'} to school.`,
    part: 'students who walk', all: 'all the students', ask: () => 'What percentage of the class walks to school?', whole: [20, 25],
  },
  {
    text: (a, b, name) => `${name} planted $${b}$ seeds in the school garden. $${a}$ of them sprouted.`,
    part: 'seeds that sprouted', all: 'all the seeds', ask: () => 'What percentage of the seeds sprouted?', whole: [10, 20, 25, 50],
  },
  {
    text: (a, b) => `A bag has $${b}$ beads. $${a}$ of them ${are(a)} red.`,
    part: 'red beads', all: 'all the beads', ask: () => 'What percentage of the beads are red?', whole: [4, 5, 10, 20, 25, 50],
  },
];

const PCT_HINT = 'A percentage compares a part with a whole of $100$. "Percent" means "out of $100$".';

function pctD1(rng: Rng): Out {
  const kind = rng.pick(['grid', 'grid', 'fracToPct', 'pctToDec', 'decToPct', 'pctToFrac'] as const);
  const h = retry(() => rng.int(3, 97), (x) => x % 10 !== 0 && (kind !== 'grid' || x > 10), 50);
  if (kind === 'grid') {
    const rows = Math.floor(h / 10);
    return {
      prompt: 'The grid has $100$ equal squares. What percentage of the grid is shaded?',
      figure: gridFigure(10, 10, h, `${h} of 100 squares shaded`),
      parts: [wholePart(h, undefined, '%')],
      hints: [PCT_HINT, 'Count the full shaded rows of $10$, then the extra squares.'],
      solution: [`$${rows}$ full ${rows === 1 ? 'row' : 'rows'} of $10$ ${rows === 1 ? 'makes' : 'make'} $${rows * 10}$ squares. There ${h % 10 === 1 ? 'is' : 'are'} $${h % 10}$ more. That is $${h}$ squares.`, `$${h}$ out of $100$ is $${fr(h, 100)} = ${pct(h)}$.`, `$${pct(h)}$ of the grid is shaded.`],
    };
  }
  if (kind === 'fracToPct') {
    return {
      prompt: `Write $${fr(h, 100)}$ as a percentage.`,
      parts: [wholePart(h, undefined, '%')],
      hints: [PCT_HINT, `$${fr(h, 100)}$ means $${h}$ out of $100$.`],
      solution: [`$${fr(h, 100)}$ means $${h}$ out of $100$.`, `$${fr(h, 100)} = ${pct(h)}$`],
    };
  }
  if (kind === 'pctToDec') {
    return {
      prompt: `Write $${pct(h)}$ as a decimal number.`,
      parts: [numPart(h / 100, { exact: false, asDecimal: true, display: 'decimal' })],
      hints: [PCT_HINT, `$${pct(h)} = ${fr(h, 100)}$. How do you write hundredths as a decimal?`],
      solution: [`$${pct(h)}$ means $${h}$ out of $100$: $${fr(h, 100)}$.`, `$${h}$ hundredths is $${dec(h)}$.`, `$${pct(h)} = ${dec(h)}$`],
    };
  }
  if (kind === 'decToPct') {
    return {
      prompt: `Write $${dec(h)}$ as a percentage.`,
      parts: [wholePart(h, undefined, '%')],
      hints: [PCT_HINT, `$${dec(h)}$ is $${h}$ hundredths.`],
      solution: [`$${dec(h)}$ is $${h}$ hundredths: $${fr(h, 100)}$.`, `$${h}$ out of $100$ is $${pct(h)}$.`, `$${dec(h)} = ${pct(h)}$`],
    };
  }
  return {
    prompt: `Write $${pct(h)}$ as a fraction with denominator $100$: $${pct(h)} = ${fr('?', 100)}$`,
    parts: [wholePart(h, '? =')],
    hints: [PCT_HINT, `$${pct(h)}$ means $${h}$ out of $100$.`],
    solution: [`$${pct(h)}$ means $${h}$ out of $100$.`, `$${pct(h)} = ${fr(h, 100)}$, so the missing numerator is $${h}$.`],
  };
}

function pctD2(rng: Rng): Out {
  const b = rng.pick([4, 5, 10, 20, 25, 50]);
  const a = rng.int(1, b - 1);
  const H = (a * 100) / b;
  const kind = rng.pick(['ratioPct', 'fracDec', 'gridBoth', 'mcSame'] as const);
  if (kind === 'mcSame') {
    const right = `$${pct(H)}$`;
    const wrong = [`$${pct(a)}$`, `$${pct(b)}$`, `$${pct(H === 50 ? 25 : 100 - H)}$`, `$${pct(a + b)}$`];
    return {
      prompt: `Which percentage shows the same part-whole relationship as the ratio $${ratio(a, b)}$?`,
      parts: [{ answer: mc(rng, right, wrong) }],
      hints: [PCT_HINT, `Write $${ratio(a, b)}$ as the fraction $${fr(a, b)}$, then make the denominator $100$.`],
      solution: [`The ratio $${ratio(a, b)}$ is the fraction $${fr(a, b)}$.`, ...toHundredths(a, b), `$${fr(H, 100)} = ${pct(H)}$. The answer is ${right}.`],
    };
  }
  if (kind === 'gridBoth') {
    const [rows, cols] = GRID[b];
    return {
      prompt: `The picture has $${b}$ equal squares. $${a}$ of them ${a === 1 ? 'is' : 'are'} shaded.\n\n(a) Write the shaded part as a decimal number.\n\n(b) Write the shaded part as a percentage.`,
      figure: gridFigure(rows, cols, a, `${a} of ${b} squares shaded`),
      parts: [numPart(H / 100, { exact: false, asDecimal: true, display: 'decimal', label: '(a)' }), wholePart(H, '(b)', '%')],
      hints: [`The shaded part is $${fr(a, b)}$ of the picture. Change it to hundredths.`, `Multiply the top and bottom by the same number to make the denominator $100$.`],
      solution: [`The shaded part is $${fr(a, b)}$.`, ...toHundredths(a, b), `(a) $${H}$ hundredths is $${dec(H)}$.`, `(b) $${H}$ out of $100$ is $${pct(H)}$.`],
    };
  }
  const c = rng.pick(PCT_CTX.filter((x) => x.whole.includes(b)));
  const name = rng.pick(NAMES);
  const text = c.text(a, b, name, rng.pick(TOWNS));
  if (kind === 'fracDec') {
    return {
      prompt: `${text} Write the part-whole ratio of ${c.part} to ${c.all} as a decimal number.`,
      parts: [numPart(H / 100, { exact: false, asDecimal: true, display: 'decimal' })],
      hints: [`As a fraction, the ratio is $${fr(a, b)}$.`, 'Make the denominator $100$, then write the hundredths as a decimal.'],
      solution: [`The ratio is $${ratio(a, b)}$, or $${fr(a, b)}$.`, ...toHundredths(a, b), `$${fr(H, 100)} = ${dec(H)}$`],
    };
  }
  return {
    prompt: `${text} ${c.ask(name)}`,
    parts: [wholePart(H, undefined, '%')],
    hints: [PCT_HINT, `Write $${fr(a, b)}$ with denominator $100$.`],
    solution: [`The part-whole ratio is $${ratio(a, b)}$, or $${fr(a, b)}$.`, ...toHundredths(a, b), `$${fr(H, 100)} = ${pct(H)}$`],
  };
}

function pctD3(rng: Rng): Out {
  const b = rng.pick([10, 20, 25, 50]);
  const a = rng.int(2, b - 2);
  const H = (a * 100) / b;
  const kind = rng.pick(['rest', 'table'] as const);
  if (kind === 'table') {
    const c = rng.pick(PCT_CTX.filter((x) => x.whole.includes(b)));
    const text = c.text(a, b, rng.pick(NAMES), rng.pick(TOWNS));
    return {
      prompt: `${text} Complete the table. Each column shows the same part-whole relationship.`,
      figure: { type: 'table', headers: ['Ratio', 'Fraction', 'Decimal', 'Percentage'], rows: [[ratio(a, b), `$${fr(a, b)}$`, '(a)', '(b)']] },
      parts: [numPart(H / 100, { exact: false, asDecimal: true, display: 'decimal', label: '(a) Decimal' }), wholePart(H, '(b) Percentage', '%')],
      hints: [`Change $${fr(a, b)}$ to hundredths first.`, 'Hundredths can be written as a decimal (two places after the point) and as a percentage (out of $100$).'],
      solution: [...toHundredths(a, b), `(a) $${fr(H, 100)} = ${dec(H)}$`, `(b) $${fr(H, 100)} = ${pct(H)}$`, `The answers are $${dec(H)}$ and $${pct(H)}$.`],
    };
  }
  const name = rng.pick(NAMES);
  const ctx = rng.pick([
    { s: `${name}'s class has $${b}$ students. $${a}$ of them take the bus to school. The rest walk or bike.`, p: 'take the bus', q: 'do not take the bus' },
    { s: `${name} shot $${b}$ free throws at basketball practice and made $${a}$ of them.`, p: 'were made', q: 'were missed' },
    { s: `A garden in ${rng.pick(TOWNS)} has $${b}$ plants. $${a}$ of them ${are(a)} carrots. The rest are beans.`, p: 'are carrots', q: 'are beans' },
  ]);
  const R = 100 - H;
  return {
    prompt: `${ctx.s}\n\n(a) What percentage ${ctx.p}?\n\n(b) What percentage ${ctx.q}?`,
    parts: [wholePart(H, '(a)', '%'), wholePart(R, '(b)', '%')],
    hints: [`Write $${fr(a, b)}$ with denominator $100$ to find the first percentage.`, 'The whole is $100\\%$. The two parts together make $100\\%$.'],
    solution: [
      `(a) The part-whole ratio is $${ratio(a, b)}$, or $${fr(a, b)}$.`,
      ...toHundredths(a, b),
      `So $${pct(H)}$ ${ctx.p}.`,
      `(b) The whole is $100\\%$: $100\\% - ${pct(H)} = ${pct(R)}$. (Check: $${b} - ${a} = ${b - a}$, and $${fr(b - a, b)} = ${fr(R, 100)}$.)`,
      `The answers are (a) $${pct(H)}$ and (b) $${pct(R)}$.`,
    ],
  };
}

const ratioPercent = skill({
  id: 'm5-ratio-percent',
  name: 'Ratios, fractions, decimals and percentages',
  description: 'Write the same part-whole relationship as a ratio, a fraction, a decimal number and a percentage.',
  outcomes: ['N7'],
  lessonId: 'm5-6-2',
  gen(rng, d: Difficulty) {
    if (d === 1) return pctD1(rng);
    if (d === 2) return pctD2(rng);
    return pctD3(rng);
  },
});

export const RATIOS_SKILLS: SkillDef[] = [ratios, ratioPercent];
