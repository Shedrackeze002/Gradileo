/** Math 5 Unit 11 — Arithmetic Sequences (P1). */
import { mc, mcFigures, numPart, part, retry, skill } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Ananya', 'Nathan', 'Lena', 'Diego', 'Harpreet', 'Noor',
];

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure; answerDisplay?: string };

const TERM = '\\text{term}';
const POS = '\\text{position}';
const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
/** A list of numbers in maths: $3,\ 6,\ 9$ */
const listTex = (a: number[]) => a.map((x) => `${x}`).join(',\\ ');

/** An arithmetic sequence: the term at position n is a + (n − 1)d. */
interface Seq {
  a: number;
  d: number;
}
const termAt = (s: Seq, n: number) => s.a + (n - 1) * s.d;

/** A one-operation rule from position to term: term = k × position, or term = position + k. */
interface Rule {
  op: 'mul' | 'add';
  k: number;
}
const apply = (r: Rule, n: number) => (r.op === 'mul' ? r.k * n : n + r.k);
/** The rule in words-and-maths LaTeX: term = 4 × position. */
const ruleTex = (r: Rule) => (r.op === 'mul' ? `${TERM} = ${r.k} \\times ${POS}` : `${TERM} = ${POS} + ${r.k}`);
/** The expression in n, as typed and as LaTeX. */
const exprText = (r: Rule) => (r.op === 'mul' ? `${r.k}n` : `n + ${r.k}`);
const exprTex = (r: Rule, v = 'n') => (r.op === 'mul' ? `${r.k}${v}` : `${v} + ${r.k}`);
/** The rule applied to a number, as a LaTeX calculation: 4 \times 7 = 28. */
const calc = (r: Rule, n: number) => (r.op === 'mul' ? `${r.k} \\times ${n} = ${r.k * n}` : `${n} + ${r.k} = ${n + r.k}`);
const ruleWords = (r: Rule) => (r.op === 'mul' ? `multiply the position by $${r.k}$` : `add $${r.k}$ to the position`);

function pickRule(rng: Rng, mulK: number[], addK: number[]): Rule {
  return rng.chance(0.5) ? { op: 'mul', k: rng.pick(mulK) } : { op: 'add', k: rng.pick(addK) };
}

/** A table of values: positions in the first row, terms in the second ("?" when hidden). */
function seqTable(pos: number[], terms: Array<number | null>, heads: [string, string] = ['Position', 'Term']): Figure {
  return { type: 'table', horizontal: true, headers: heads, rows: pos.map((p, i) => [String(p), terms[i] === null ? '?' : String(terms[i])]) };
}

/** Points (position, term) on a first-quadrant grid. */
function seqGraph(pts: Array<[number, number]>, xMax: number, yStep: number, yTop?: number): Figure {
  const maxY = Math.max(...pts.map((p) => p[1]));
  const top = yTop ?? (Math.floor(maxY / yStep) + 1) * yStep;
  // Equal steps draw square cells: widen the x-axis so the graph is not much taller than it is wide.
  const xEnd = yStep === 1 ? Math.max(xMax, Math.ceil(top / 1.2)) : xMax;
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: xEnd, yMin: 0, yMax: top, xStep: 1, yStep, xLabel: 'Position', yLabel: 'Term' },
    points: pts.map(([x, y]) => ({ x, y })),
  };
}

/** A sequence whose terms sit on grid lines: a and d are multiples of the grid step s. */
function gridSeq(rng: Rng, steps: number[], count: number, maxD: number): Seq & { s: number } {
  return retry(
    () => {
      const s = rng.pick(steps);
      return { s, a: s * rng.int(1, 4), d: s * rng.int(1, maxD) };
    },
    (q) => (q.a + (count - 1) * q.d) / q.s <= 11,
    200,
  );
}

/** "Compare each term with its position" steps for a one-operation rule. */
function ruleSteps(r: Rule, pos: number[], terms: number[]): string[] {
  const shown = pos.slice(0, 3).map((p, i) => (r.op === 'mul' ? `$${terms[i]} = ${r.k} \\times ${p}$` : `$${terms[i]} = ${p} + ${r.k}$`));
  return [
    `Compare each term with its position: ${shown.join(', ')}.`,
    r.op === 'mul' ? `Each term is the position multiplied by $${r.k}$, so $${ruleTex(r)}$.` : `Each term is $${r.k}$ more than its position, so $${ruleTex(r)}$.`,
  ];
}

const RULE_HINT = 'Compare each term with its own position, not with the term before it. Is the term always the same number of times the position, or always the same amount more?';

// ---------------------------------------------------------------------------
// Contexts for problems (one-operation rules)
// ---------------------------------------------------------------------------

interface Ctx {
  rule: Rule;
  setup: string;
  heads: [string, string];
  /** "the number of legs on $n$ spiders" */
  what: string;
  fwd: (n: number, v: number) => { q: string; part: Part; say: string };
  inv?: (v: number, n: number) => { q: string; part: Part; say: string };
  maxN: number;
}

const MUL_CTX: Array<(rng: Rng, name: string) => Ctx> = [
  (rng) => {
    const k = rng.pick([6, 8, 10]);
    return {
      rule: { op: 'mul', k },
      setup: `Juice boxes come in packs of $${k}$.`,
      heads: ['Packs', 'Juice boxes'],
      what: 'the number of juice boxes in $n$ packs',
      fwd: (n, v) => ({ q: `How many juice boxes are in $${n}$ packs?`, part: numPart(v, { suffix: 'juice boxes' }), say: `$${n}$ packs hold $${v}$ juice boxes.` }),
      inv: (v, n) => ({ q: `How many packs hold $${v}$ juice boxes?`, part: numPart(n, { suffix: 'packs' }), say: `$${n}$ packs hold $${v}$ juice boxes.` }),
      maxN: 40,
    };
  },
  () => ({
    rule: { op: 'mul', k: 8 },
    setup: 'A spider has $8$ legs.',
    heads: ['Spiders', 'Legs'],
    what: 'the number of legs on $n$ spiders',
    fwd: (n, v) => ({ q: `How many legs do $${n}$ spiders have in all?`, part: numPart(v, { suffix: 'legs' }), say: `$${n}$ spiders have $${v}$ legs.` }),
    inv: (v, n) => ({ q: `How many spiders have $${v}$ legs in all?`, part: numPart(n, { suffix: 'spiders' }), say: `$${n}$ spiders have $${v}$ legs.` }),
    maxN: 40,
  }),
  () => ({
    rule: { op: 'mul', k: 3 },
    setup: 'A tricycle has $3$ wheels.',
    heads: ['Tricycles', 'Wheels'],
    what: 'the number of wheels on $n$ tricycles',
    fwd: (n, v) => ({ q: `How many wheels are on $${n}$ tricycles?`, part: numPart(v, { suffix: 'wheels' }), say: `$${n}$ tricycles have $${v}$ wheels.` }),
    inv: (v, n) => ({ q: `How many tricycles have $${v}$ wheels in all?`, part: numPart(n, { suffix: 'tricycles' }), say: `$${n}$ tricycles have $${v}$ wheels.` }),
    maxN: 50,
  }),
  () => ({
    rule: { op: 'mul', k: 7 },
    setup: 'There are $7$ days in a week.',
    heads: ['Weeks', 'Days'],
    what: 'the number of days in $n$ weeks',
    fwd: (n, v) => ({ q: `How many days are in $${n}$ weeks?`, part: numPart(v, { suffix: 'days' }), say: `$${n}$ weeks have $${v}$ days.` }),
    inv: (v, n) => ({ q: `How many weeks are in $${v}$ days?`, part: numPart(n, { suffix: 'weeks' }), say: `$${v}$ days make $${n}$ weeks.` }),
    maxN: 52,
  }),
  () => ({
    rule: { op: 'mul', k: 12 },
    setup: 'A carton holds $12$ eggs.',
    heads: ['Cartons', 'Eggs'],
    what: 'the number of eggs in $n$ cartons',
    fwd: (n, v) => ({ q: `How many eggs are in $${n}$ full cartons?`, part: numPart(v, { suffix: 'eggs' }), say: `$${n}$ cartons hold $${v}$ eggs.` }),
    maxN: 40,
  }),
  (rng) => {
    const k = rng.pick([4, 6, 8]);
    return {
      rule: { op: 'mul', k },
      setup: `At a school party, each table has $${k}$ chairs. The tables are set up apart from each other.`,
      heads: ['Tables', 'Chairs'],
      what: 'the number of chairs at $n$ tables',
      fwd: (n, v) => ({ q: `How many chairs are at $${n}$ tables?`, part: numPart(v, { suffix: 'chairs' }), say: `$${n}$ tables have $${v}$ chairs.` }),
      inv: (v, n) => ({ q: `How many tables have $${v}$ chairs in all?`, part: numPart(n, { suffix: 'tables' }), say: `$${n}$ tables have $${v}$ chairs.` }),
      maxN: 40,
    };
  },
  (rng, name) => {
    const k = rng.pick([2, 3, 4, 5, 6]);
    return {
      rule: { op: 'mul', k },
      setup: `${name} saves \\$${k} from their allowance every week. ${name} started with no savings.`,
      heads: ['Weeks', 'Dollars saved'],
      what: `the number of dollars ${name} has saved after $n$ weeks`,
      fwd: (n, v) => ({ q: `How many dollars will ${name} have saved after $${n}$ weeks?`, part: numPart(v, { label: '\\$' }), say: `After $${n}$ weeks, ${name} will have saved \\$${v}.` }),
      inv: (v, n) => ({ q: `After how many weeks will ${name} have saved \\$${v}?`, part: numPart(n, { suffix: 'weeks' }), say: `${name} will have saved \\$${v} after $${n}$ weeks.` }),
      maxN: 52,
    };
  },
  (rng) => {
    const k = rng.pick([2, 3]);
    return {
      rule: { op: 'mul', k },
      setup: `On a camping trip, each canoe holds $${k}$ campers.`,
      heads: ['Canoes', 'Campers'],
      what: 'the number of campers in $n$ full canoes',
      fwd: (n, v) => ({ q: `How many campers can ride in $${n}$ canoes?`, part: numPart(v, { suffix: 'campers' }), say: `$${n}$ canoes hold $${v}$ campers.` }),
      inv: (v, n) => ({ q: `How many canoes are needed for exactly $${v}$ campers?`, part: numPart(n, { suffix: 'canoes' }), say: `$${n}$ canoes hold $${v}$ campers.` }),
      maxN: 40,
    };
  },
];

const ADD_CTX: Array<(rng: Rng, name: string) => Ctx> = [
  (rng) => {
    const c = rng.int(3, 14);
    const town = rng.pick(['Pinewood', 'Lakeside', 'Clearwater', 'Maple Falls', 'Stonebridge', 'Willow Lake']);
    return {
      rule: { op: 'add', k: c },
      setup: `Day $1$ of a summer camp near ${town} is July $${c + 1}$. Day $2$ is July $${c + 2}$, and so on.`,
      heads: ['Day of camp', 'Date in July'],
      what: 'the date in July on day $n$ of camp',
      fwd: (n, v) => ({ q: `What is the date in July on day $${n}$ of camp?`, part: numPart(v, { label: 'July' }), say: `Day $${n}$ of camp is July $${v}$.` }),
      inv: (v, n) => ({ q: `Which day of camp is July $${v}$?`, part: numPart(n, { label: 'Day' }), say: `July $${v}$ is day $${n}$ of camp.` }),
      maxN: 31 - c,
    };
  },
  (rng, name) => {
    const c = rng.int(2, 9);
    const sib = rng.pick(NAMES.filter((x) => x !== name));
    return {
      rule: { op: 'add', k: c },
      setup: `${name} is $${c}$ years older than their cousin ${sib}. When ${sib} is $1$, ${name} is $${c + 1}$.`,
      heads: [`${sib}’s age`, `${name}’s age`],
      what: `${name}’s age when ${sib} is $n$ years old`,
      fwd: (n, v) => ({ q: `How old will ${name} be when ${sib} is $${n}$?`, part: numPart(v, { suffix: 'years old' }), say: `${name} will be $${v}$ when ${sib} is $${n}$.` }),
      inv: (v, n) => ({ q: `How old will ${sib} be when ${name} is $${v}$?`, part: numPart(n, { suffix: 'years old' }), say: `${sib} will be $${n}$ when ${name} is $${v}$.` }),
      maxN: 60,
    };
  },
  (rng) => {
    const c = rng.int(5, 20);
    return {
      rule: { op: 'add', k: c },
      setup: `A school bus already has $${c}$ students on it when it reaches its first stop. At each stop, exactly one more student gets on, and no one gets off.`,
      heads: ['Stop number', 'Students on the bus'],
      what: 'the number of students on the bus after stop $n$',
      fwd: (n, v) => ({ q: `How many students are on the bus after stop $${n}$?`, part: numPart(v, { suffix: 'students' }), say: `After stop $${n}$, there are $${v}$ students on the bus.` }),
      inv: (v, n) => ({ q: `After which stop are there $${v}$ students on the bus?`, part: numPart(n, { label: 'Stop' }), say: `There are $${v}$ students after stop $${n}$.` }),
      maxN: 20,
    };
  },
  (rng, name) => {
    const c = rng.int(10, 40);
    const what = rng.pick(['hockey cards', 'stickers', 'stamps', 'shells']);
    return {
      rule: { op: 'add', k: c },
      setup: `${name} has $${c}$ ${what}. ${name} adds exactly one new one to the collection each day.`,
      heads: ['Day', `Number of ${what}`],
      what: `the number of ${what} ${name} has after day $n$`,
      fwd: (n, v) => ({ q: `How many ${what} will ${name} have after day $${n}$?`, part: numPart(v, { suffix: what }), say: `After day $${n}$, ${name} will have $${v}$ ${what}.` }),
      inv: (v, n) => ({ q: `After which day will ${name} have $${v}$ ${what}?`, part: numPart(n, { label: 'Day' }), say: `${name} will have $${v}$ ${what} after day $${n}$.` }),
      maxN: 60,
    };
  },
];

function pickCtx(rng: Rng, needInv = false): Ctx {
  const name = rng.pick(NAMES);
  for (;;) {
    const c = rng.pick(rng.chance(0.55) ? MUL_CTX : ADD_CTX)(rng, name);
    if (!needInv || c.inv) return c;
  }
}

// ---------------------------------------------------------------------------
// 11.1 Sequences in tables and graphs
// ---------------------------------------------------------------------------

function missingInTable(rng: Rng, d: Difficulty): Out {
  const s: Seq = { a: rng.int(1, d === 1 ? 10 : 25), d: rng.int(2, d === 1 ? 5 : 9) };
  const pos = range(1, 5);
  const terms = pos.map((n) => termAt(s, n));
  const m = rng.int(2, 5);
  const [i, j] = m <= 3 ? [3, 4] : [0, 1];
  return {
    prompt: 'The table of values shows an arithmetic sequence. What is the missing term?',
    figure: seqTable(pos, terms.map((t, k) => (k === m - 1 ? null : t))),
    parts: [numPart(terms[m - 1], { label: `Term at position $${m}$:` })],
    hints: ['In an arithmetic sequence, you add the same number each time. Find that number from two terms next to each other.', `Add that number to the term at position $${m - 1}$.`],
    solution: [
      `Find the change from one term to the next: $${terms[j]} - ${terms[i]} = ${s.d}$`,
      `Each term is $${s.d}$ more than the term before it.`,
      `Term at position $${m}$: $${terms[m - 2]} + ${s.d} = ${terms[m - 1]}$`,
      `The missing term is $${terms[m - 1]}$.`,
    ],
  };
}

function readGraph(rng: Rng): Out {
  const q = gridSeq(rng, [1, 2], 5, 2);
  const pts = range(1, 5).map((n) => [n, termAt(q, n)] as [number, number]);
  const m = rng.int(1, 5);
  const t = termAt(q, m);
  return {
    prompt: `The graph shows the first five terms of an arithmetic sequence. Each point is (position, term). What is the term at position $${m}$?`,
    figure: seqGraph(pts, 6, q.s),
    parts: [numPart(t, { label: `Term at position $${m}$:` })],
    hints: [`Find $${m}$ on the Position axis at the bottom. Go straight up to the point.`, `From the point, look straight across to the Term axis.${q.s > 1 ? ` The grid lines on the Term axis go up by $${q.s}$.` : ''}`],
    solution: [`Start at position $${m}$ on the bottom axis and go up to the point.`, `Look across to the Term axis: the point is at $${t}$. The point is $(${m}, ${t})$.`, `The term at position $${m}$ is $${t}$.`],
  };
}

const LINE_DESC = [
  'The points lie on a straight line.',
  'The points lie on a curve that gets steeper and steeper.',
  'The points go up and then come back down.',
  'The points are scattered with no pattern.',
];

function describeGraph(rng: Rng): Out {
  const q = gridSeq(rng, [1, 2], 5, 2);
  const pts = range(1, 5).map((n) => [n, termAt(q, n)] as [number, number]);
  const name = rng.pick(NAMES);
  const next = termAt(q, 6);
  if (rng.chance(0.5)) {
    return {
      prompt: `${name} graphed the first five terms of the arithmetic sequence $${listTex(pts.map((p) => p[1]))}, \\ldots$ Which sentence describes the points?`,
      figure: seqGraph(pts, 7, q.s, Math.max((Math.floor(next / q.s) + 1) * q.s, 6)),
      parts: [{ answer: mc(rng, LINE_DESC[0], LINE_DESC.slice(1)) }],
      hints: ['Hold a ruler along the points in your mind. Do they all touch it?', `The terms go up by the same amount, $${q.d}$, each time. So each point is $1$ step right and $${q.d}$ up from the one before.`],
      solution: [`Each term is $${q.d}$ more than the term before it.`, `So every point is $1$ to the right and $${q.d}$ up from the one before. Equal steps make a straight line.`, `The points lie on a straight line.`],
      answerDisplay: LINE_DESC[0],
    };
  }
  const right = `At $(6, ${next})$, on the same straight line as the other points`;
  return {
    prompt: `${name} graphed the first five terms of the arithmetic sequence $${listTex(pts.map((p) => p[1]))}, \\ldots$ Where will the point for the next term go?`,
    figure: seqGraph(pts, 7, q.s, (Math.floor(next / q.s) + 1) * q.s),
    parts: [{ answer: mc(rng, right, [
      `At $(6, ${next - q.d})$, at the same height as the last point`,
      `At $(${next}, 6)$, on the same straight line as the other points`,
      `At $(6, ${next + q.d})$, a little above the line`,
    ]) }],
    hints: ['The next term is at position $6$. Find the term first.', `Add the same amount as before: $${q.d}$.`],
    solution: [`The next term is at position $6$: $${termAt(q, 5)} + ${q.d} = ${next}$.`, `The point is (position, term) $= (6, ${next})$. It is $1$ step right and $${q.d}$ up from the last point, so it is on the same straight line.`, `The answer: ${right}.`],
    answerDisplay: right,
  };
}

function orderedPair(rng: Rng): Out {
  const s: Seq = { a: rng.int(2, 15), d: rng.int(2, 9) };
  const shown = range(1, 4).map((n) => termAt(s, n));
  const m = rng.int(2, 6);
  const t = termAt(s, m);
  const steps = m <= 4
    ? [`The term at position $${m}$ is $${t}$ (count along the list).`]
    : [`The list stops at position $4$. Each term is $${s.d}$ more than the one before.`, ...range(5, m).map((n) => `Position $${n}$: $${termAt(s, n - 1)} + ${s.d} = ${termAt(s, n)}$`)];
  return {
    prompt: `An arithmetic sequence begins $${listTex(shown)}, \\ldots$ Write the point for the term at position $${m}$ as an ordered pair (position, term).`,
    parts: [part({ kind: 'point', x: m, y: t }, { label: 'Point:' })],
    hints: ['The first term is at position $1$, the second at position $2$, and so on.', 'The position comes first in the ordered pair and the term comes second.'],
    solution: [...steps, `The position is $${m}$ and the term is $${t}$.`, `The point is $(${m}, ${t})$.`],
  };
}

function whichGraph(rng: Rng): Out {
  // Every choice must fit on the same grid with at most 11 grid lines up the Term axis.
  const q = retry(() => gridSeq(rng, [1, 2], 4, 2), (g) => (g.a + 3 * (g.d + g.s)) / g.s <= 11, 200);
  const n4 = range(1, 4);
  const sets: Array<Array<[number, number]>> = [
    n4.map((n) => [n, termAt(q, n)]),
    n4.map((n) => [n - 1, termAt(q, n)]),
    n4.map((n) => [n, q.a + (n - 1) * (q.d + q.s)]),
    n4.map((n) => [n, q.a + q.s + (n - 1) * q.d]),
  ];
  const maxY = Math.max(...sets.flat().map((p) => p[1]));
  const top = (Math.floor(maxY / q.s) + 1) * q.s;
  const answer = mcFigures(rng, sets.map((pts, i) => ({ md: '', figure: seqGraph(pts, 5, q.s, top), correct: i === 0 })));
  const letter = answer.kind === 'mc' ? String.fromCharCode(65 + answer.choices.findIndex((c) => c.id === answer.correct)) : 'A';
  const terms = n4.map((n) => termAt(q, n));
  return {
    prompt: `Which graph shows the first four terms of the arithmetic sequence $${listTex(terms)}, \\ldots$? Each point is (position, term).`,
    parts: [{ answer }],
    hints: ['Write each term as a point (position, term). The first term is at position $1$.', `The points should be ${n4.map((n) => `$(${n}, ${termAt(q, n)})$`).join(', ')}.`],
    solution: [
      `The first term is at position $1$, so the points are ${n4.map((n) => `$(${n}, ${termAt(q, n)})$`).join(', ')}.`,
      'Check each graph: the first point must be above position $1$ (not $0$), and the points must go up by the same amount as the terms.',
      `Graph ${letter} shows these points.`,
    ],
  };
}

function completeTable(rng: Rng): Out {
  const s: Seq = { a: rng.int(1, 20), d: rng.int(3, 12) };
  const pos = range(1, 6);
  const terms = pos.map((n) => termAt(s, n));
  const [m1, m2] = rng.chance(0.5) ? [3, 6] : rng.pick([[2, 5], [4, 6], [3, 5]]);
  // Two terms next to each other that are both shown.
  const i = pos.findIndex((p) => p !== m1 && p !== m2 && p + 1 !== m1 && p + 1 !== m2 && p < 6);
  return {
    prompt: 'Complete the table of values for this arithmetic sequence.',
    figure: seqTable(pos, terms.map((t, k) => (k === m1 - 1 || k === m2 - 1 ? null : t))),
    parts: [numPart(terms[m1 - 1], { label: `Position $${m1}$:` }), numPart(terms[m2 - 1], { label: `Position $${m2}$:` })],
    hints: ['Find two terms next to each other in the table. How much is added each time?', 'Keep adding that same amount to fill each empty box.'],
    solution: [
      `Each term is $${s.d}$ more than the one before (for example, $${terms[i + 1]} - ${terms[i]} = ${s.d}$).`,
      `Position $${m1}$: $${terms[m1 - 2]} + ${s.d} = ${terms[m1 - 1]}$`,
      `Position $${m2}$: $${terms[m2 - 2]} + ${s.d} = ${terms[m2 - 1]}$`,
      `The missing terms are $${terms[m1 - 1]}$ and $${terms[m2 - 1]}$.`,
    ],
  };
}

function extendGraph(rng: Rng): Out {
  const q = gridSeq(rng, [1, 2, 5], 4, 3);
  const pts = range(1, 4).map((n) => [n, termAt(q, n)] as [number, number]);
  const m = rng.int(6, 9);
  const t = termAt(q, m);
  return {
    prompt: `The graph shows the first four terms of an arithmetic sequence. Each point is (position, term). If the pattern continues, what is the term at position $${m}$?`,
    figure: seqGraph(pts, 5, q.s),
    parts: [numPart(t, { label: `Term at position $${m}$:` })],
    hints: ['Read the four terms from the graph. How much does the term go up each time?', `Keep adding that amount until you reach position $${m}$.`],
    solution: [
      `Read the terms: ${pts.map(([x, y]) => `$(${x}, ${y})$`).join(', ')}.`,
      `Each term is $${q.d}$ more than the one before.`,
      `Keep going: ${range(5, m).map((n) => `position $${n}$: $${termAt(q, n)}$`).join(', ')}.`,
      `The term at position $${m}$ is $${t}$.`,
    ],
  };
}

function missingPoint(rng: Rng): Out {
  const q = gridSeq(rng, [1, 2, 5], 5, 2);
  const m = rng.int(2, 4);
  const pts = range(1, 5).filter((n) => n !== m).map((n) => [n, termAt(q, n)] as [number, number]);
  const t = termAt(q, m);
  return {
    prompt: `The graph should show the first five terms of an arithmetic sequence, but one point was erased. Each point is (position, term). Write the missing point as an ordered pair.`,
    figure: seqGraph(pts, 6, q.s),
    parts: [part({ kind: 'point', x: m, y: t }, { label: 'Missing point:' })],
    hints: ['Which position has no point above it?', 'Find how much the terms go up each step. The missing point must fit on the same straight line.'],
    solution: [
      `There is no point at position $${m}$.`,
      `The terms go up by $${q.d}$ each step (for example, from $${termAt(q, m === 4 ? 1 : 4)}$ to $${termAt(q, m === 4 ? 2 : 5)}$).`,
      `Term at position $${m}$: $${termAt(q, m - 1)} + ${q.d} = ${t}$`,
      `The missing point is $(${m}, ${t})$.`,
    ],
  };
}

function towerPoint(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const ctx = rng.pick([
    { thing: 'tower', item: 'blocks', verb: 'builds towers of blocks' },
    { thing: 'row', item: 'tiles', verb: 'lays rows of tiles for a mosaic' },
    { thing: 'stack', item: 'cups', verb: 'builds stacks of cups' },
    { thing: 'bracelet', item: 'beads', verb: 'makes bracelets with beads' },
  ]);
  const s: Seq = { a: rng.int(2, 9), d: rng.int(2, 6) };
  const m = rng.int(6, 10);
  const t = termAt(s, m);
  return {
    prompt: `${name} ${ctx.verb}. ${ctx.thing.charAt(0).toUpperCase() + ctx.thing.slice(1)} $1$ has $${s.a}$ ${ctx.item}. Each ${ctx.thing} has $${s.d}$ more ${ctx.item} than the one before. ${name} graphs the pattern with points (${ctx.thing} number, number of ${ctx.item}). What point would ${name} plot for ${ctx.thing} $${m}$?`,
    parts: [part({ kind: 'point', x: m, y: t }, { label: 'Point:' })],
    hints: [`Make a table: ${ctx.thing} $1$ has $${s.a}$, ${ctx.thing} $2$ has $${s.a + s.d}$, and so on.`, `Keep adding $${s.d}$ until you reach ${ctx.thing} $${m}$. The ${ctx.thing} number comes first in the point.`],
    solution: [
      `The ${ctx.item} go ${range(1, Math.min(m, 6)).map((n) => `$${termAt(s, n)}$`).join(', ')}${m > 6 ? ', …' : ''} (add $${s.d}$ each time).`,
      `${ctx.thing.charAt(0).toUpperCase() + ctx.thing.slice(1)} $${m}$ has $${t}$ ${ctx.item}.`,
      `The point is (${ctx.thing} number, number of ${ctx.item}) $= (${m}, ${t})$.`,
    ],
  };
}

const sequenceTable = skill({
  id: 'm5-sequence-table',
  name: 'Arithmetic sequences in tables and graphs',
  description: 'Show the positions and terms of an arithmetic sequence in a table of values and as points on a grid, and describe the graph as a straight line.',
  outcomes: ['P1'],
  lessonId: 'm5-11-1',
  gen(rng, d) {
    if (d === 1) {
      const k = rng.weighted([['missing', 2], ['read', 2], ['line', 1]] as const);
      return k === 'missing' ? missingInTable(rng, d) : k === 'read' ? readGraph(rng) : describeGraph(rng);
    }
    if (d === 2) {
      const k = rng.pick(['pair', 'which', 'complete'] as const);
      return k === 'pair' ? orderedPair(rng) : k === 'which' ? whichGraph(rng) : completeTable(rng);
    }
    const k = rng.pick(['extend', 'missingPt', 'tower'] as const);
    return k === 'extend' ? extendGraph(rng) : k === 'missingPt' ? missingPoint(rng) : towerPoint(rng);
  },
});

// ---------------------------------------------------------------------------
// 11.2 Rules and expressions
// ---------------------------------------------------------------------------

function ruleChoice(rng: Rng): Out {
  const r = pickRule(rng, [2, 3, 4, 5, 6, 7, 8, 9], range(2, 12));
  const pos = range(1, 5);
  const terms = pos.map((n) => apply(r, n));
  const wrong: Rule[] = r.op === 'mul'
    ? [{ op: 'add', k: r.k }, { op: 'add', k: r.k - 1 }, { op: 'mul', k: r.k + 1 }]
    : [{ op: 'mul', k: r.k + 1 }, { op: 'add', k: r.k + 1 }, { op: 'mul', k: r.k }];
  return {
    prompt: 'The table of values shows an arithmetic sequence. Which rule tells how to get each term from its position?',
    figure: seqTable(pos, terms),
    parts: [{ answer: mc(rng, `$${ruleTex(r)}$`, wrong.map((w) => `$${ruleTex(w)}$`)) }],
    hints: [RULE_HINT, 'Test a rule on every column of the table, not just the first one.'],
    solution: [...ruleSteps(r, pos, terms), `Check position $5$: $${calc(r, 5)}$ ✓`, `The rule is $${ruleTex(r)}$.`],
    answerDisplay: `$${ruleTex(r)}$`,
  };
}

function writeExprFromTable(rng: Rng): Out {
  const r = pickRule(rng, range(2, 12), range(2, 20));
  const pos = range(1, 5);
  const terms = pos.map((n) => apply(r, n));
  return {
    prompt: 'The table of values shows an arithmetic sequence. Write an expression for the term at position $n$.',
    figure: seqTable(pos, terms),
    parts: [part({ kind: 'expression', expected: exprText(r) }, { label: 'Term at position $n$:' })],
    hints: [RULE_HINT, r.op === 'mul' ? 'If each term is a number of times its position, the expression is that number times $n$.' : 'If each term is the same amount more than its position, the expression is $n$ plus that amount.'],
    solution: [...ruleSteps(r, pos, terms), `Use $n$ for the position: the term is $${exprTex(r)}$.`, `The expression is $${exprTex(r)}$.`],
  };
}

function writeExprFromWords(rng: Rng): Out {
  const r = pickRule(rng, range(2, 12), range(2, 25));
  const say = rng.chance(0.5) ? `To get each term, ${ruleWords(r)}.` : r.op === 'mul' ? `Each term is $${r.k}$ times its position.` : `Each term is $${r.k}$ more than its position.`;
  const pos = range(1, 3);
  return {
    prompt: `The rule for an arithmetic sequence is: ${say} Write an expression for the term at position $n$.`,
    parts: [part({ kind: 'expression', expected: exprText(r) }, { label: 'Term at position $n$:' })],
    hints: ['Use the letter $n$ in place of the word “position”.', r.op === 'mul' ? `“$${r.k}$ times $n$” is written $${r.k}n$.` : `“$${r.k}$ more than $n$” is written $n + ${r.k}$.`],
    solution: [
      `The first terms are ${pos.map((n) => `$${calc(r, n)}$`).join(', ')}.`,
      `Replace “position” with $n$: ${r.op === 'mul' ? `$${r.k} \\times n$, written $${r.k}n$` : `$n + ${r.k}$`}.`,
      `The expression is $${exprTex(r)}$.`,
    ],
  };
}

function exprScattered(rng: Rng): Out {
  const r = pickRule(rng, range(3, 12), range(3, 30));
  const pos = retry(() => rng.sample(range(2, 12), 4).sort((a, b) => a - b), (p) => p[0] > 1 && p[3] - p[0] >= 4);
  const terms = pos.map((n) => apply(r, n));
  return {
    prompt: 'This table of values shows only some positions of an arithmetic sequence. Write an expression for the term at position $n$.',
    figure: seqTable(pos, terms),
    parts: [part({ kind: 'expression', expected: exprText(r) }, { label: 'Term at position $n$:' })],
    hints: ['The positions skip some numbers, so do not just look at how the terms change. Compare each term with its own position.', 'Try a division and a subtraction for each column: is term ÷ position always the same, or is term − position always the same?'],
    solution: [
      r.op === 'mul'
        ? `Divide each term by its position: ${pos.map((p, i) => `$${terms[i]} \\div ${p} = ${r.k}$`).join(', ')}.`
        : `Subtract each position from its term: ${pos.map((p, i) => `$${terms[i]} - ${p} = ${r.k}$`).join(', ')}.`,
      r.op === 'mul' ? `Each term is $${r.k}$ times its position.` : `Each term is $${r.k}$ more than its position.`,
      `The expression is $${exprTex(r)}$.`,
    ],
  };
}

function exprContext(rng: Rng): Out {
  const c = pickCtx(rng);
  const pos = range(1, 4);
  const terms = pos.map((n) => apply(c.rule, n));
  return {
    prompt: `${c.setup} The table shows the pattern. Write an expression for ${c.what}.`,
    figure: seqTable(pos, terms, c.heads),
    parts: [part({ kind: 'expression', expected: exprText(c.rule) }, { label: 'Expression:' })],
    hints: [`The first row of the table is the position. Compare each number in the second row with the number above it.`, c.rule.op === 'mul' ? 'Is each number in the second row the same number of times the number above it?' : 'Is each number in the second row the same amount more than the number above it?'],
    solution: [`The first row is the position and the second row is the term.`, ...ruleSteps(c.rule, pos, terms), `Use $n$ for the position: the expression is $${exprTex(c.rule)}$.`],
  };
}

const sequenceRule = skill({
  id: 'm5-sequence-rule',
  name: 'Rules and expressions for sequences',
  description: 'Describe a one-operation rule that relates position to term in an arithmetic sequence, and write it as an expression such as 4n or n + 6.',
  outcomes: ['P1'],
  lessonId: 'm5-11-2',
  gen(rng, d) {
    if (d === 1) return rng.chance(0.7) ? ruleChoice(rng) : writeExprFromWords(rng);
    if (d === 2) return rng.chance(0.65) ? writeExprFromTable(rng) : writeExprFromWords(rng);
    return rng.chance(0.5) ? exprScattered(rng) : exprContext(rng);
  },
});

// ---------------------------------------------------------------------------
// 11.2 The term at a given position
// ---------------------------------------------------------------------------

function termFromRule(rng: Rng): Out {
  const r = pickRule(rng, range(2, 10), range(3, 20));
  const n = rng.int(6, 15);
  const v = apply(r, n);
  const asExpr = rng.chance(0.5);
  const given = asExpr ? `The expression $${exprTex(r)}$ gives the term at position $n$ of an arithmetic sequence.` : `The rule for an arithmetic sequence is $${ruleTex(r)}$.`;
  return {
    prompt: `${given} What is the term at position $${n}$?`,
    parts: [numPart(v, { label: `Term at position $${n}$:` })],
    hints: [asExpr ? `Replace $n$ with $${n}$.` : `Put $${n}$ in place of “position”.`, r.op === 'mul' ? `Multiply: $${r.k} \\times ${n}$.` : `Add: $${n} + ${r.k}$.`],
    solution: [asExpr ? `Replace $n$ with $${n}$ in $${exprTex(r)}$.` : `Put $${n}$ in place of the position.`, `$${calc(r, n)}$`, `The term at position $${n}$ is $${v}$.`],
  };
}

function termFromTable(rng: Rng): Out {
  const r = pickRule(rng, range(2, 12), range(2, 20));
  const pos = range(1, 5);
  const terms = pos.map((n) => apply(r, n));
  const n = rng.int(12, 30);
  const v = apply(r, n);
  return {
    prompt: `The table of values shows an arithmetic sequence. What is the term at position $${n}$?`,
    figure: seqTable(pos, terms),
    parts: [numPart(v, { label: `Term at position $${n}$:` })],
    hints: [`It would take a long time to keep adding. Find the rule first. ${RULE_HINT}`, `Use the rule with position $${n}$.`],
    solution: [...ruleSteps(r, pos, terms), `Use the rule with position $${n}$: $${calc(r, n)}$`, `The term at position $${n}$ is $${v}$.`],
  };
}

function termProblem(rng: Rng): Out {
  const inverse = rng.chance(0.5);
  const c = pickCtx(rng, inverse);
  const r = c.rule;
  const pos = range(1, 4);
  const terms = pos.map((n) => apply(r, n));
  // Grade 5 divides 3-digit numbers by 1-digit numbers, so the inverse uses a one-digit multiplier.
  const useInv = inverse && c.inv && !(r.op === 'mul' && r.k > 9);
  const n = rng.int(useInv ? 11 : 12, Math.max(13, Math.min(c.maxN, useInv && r.op === 'mul' ? Math.floor(999 / r.k) : 50)));
  const v = apply(r, n);
  const ask = useInv ? c.inv!(v, n) : c.fwd(n, v);
  return {
    prompt: `${c.setup} The table shows the pattern. ${ask.q}`,
    figure: seqTable(pos, terms, c.heads),
    parts: [ask.part],
    hints: [
      `Find the rule that turns the first row into the second row. ${r.op === 'mul' ? 'Is each number the same number of times the number above it?' : 'Is each number the same amount more than the number above it?'}`,
      useInv
        ? r.op === 'mul' ? `You know the second-row number. Work backwards: divide by $${r.k}$.` : `You know the second-row number. Work backwards: subtract $${r.k}$.`
        : `Use the rule with $${n}$ in the first row.`,
    ],
    solution: useInv
      ? [
        r.op === 'mul' ? `The rule: second row $= ${r.k} \\times$ first row (for example, $${terms[2]} = ${r.k} \\times 3$).` : `The rule: second row $=$ first row $+ ${r.k}$ (for example, $${terms[2]} = 3 + ${r.k}$).`,
        r.op === 'mul' ? `We need $${r.k} \\times ? = ${v}$. Work backwards: $${v} \\div ${r.k} = ${n}$` : `We need $? + ${r.k} = ${v}$. Work backwards: $${v} - ${r.k} = ${n}$`,
        `Check: $${calc(r, n)}$ ✓`,
        ask.say,
      ]
      : [
        r.op === 'mul' ? `The rule: second row $= ${r.k} \\times$ first row (for example, $${terms[2]} = ${r.k} \\times 3$).` : `The rule: second row $=$ first row $+ ${r.k}$ (for example, $${terms[2]} = 3 + ${r.k}$).`,
        `Use the rule with $${n}$: $${calc(r, n)}$`,
        ask.say,
      ],
  };
}

const sequenceTerm = skill({
  id: 'm5-sequence-term',
  name: 'Finding a term from its position',
  description: 'Find the term at a given position of an arithmetic sequence from a rule, an expression or a table, and solve problems with sequences.',
  outcomes: ['P1'],
  lessonId: 'm5-11-2',
  gen(rng, d) {
    if (d === 1) return termFromRule(rng);
    if (d === 2) return termFromTable(rng);
    return termProblem(rng);
  },
});

export const SEQUENCES_SKILLS: SkillDef[] = [sequenceTable, sequenceRule, sequenceTerm];
