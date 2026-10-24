/** Math 7 Unit 5 — Patterns and Linear Relations (PR1, PR2). Whole numbers and simple contexts. */
import { mc, mcFigures, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, Part, PlaneFigure, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type Out = GenOutput;
type Seg = { from: [number, number]; to: [number, number]; color?: 'brand' | 'accent' | 'muted' };

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Harpreet', 'Noor', 'Thanh', 'Kateri', 'Diego', 'Ngozi', 'Leah', 'Ravi',
];
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury'];

/** A linear expression an + b as text that works both as LaTeX and as a typed answer: 3n + 2, n - 1, 5n. */
function ruleText(a: number, b: number, v = 'n'): string {
  const lead = a === 1 ? v : `${a}${v}`;
  if (b === 0) return lead;
  return b > 0 ? `${lead} + ${b}` : `${lead} - ${-b}`;
}
/** a × k + b worked out: "3(7) + 2 = 21 + 2 = 23". */
function subst(a: number, b: number, k: number): string {
  const prod = a * k;
  if (b === 0) return a === 1 ? `${k}` : `${a}(${k}) = ${prod}`;
  const sign = b > 0 ? '+' : '-';
  return a === 1 ? `${k} ${sign} ${Math.abs(b)} = ${prod + b}` : `${a}(${k}) ${sign} ${Math.abs(b)} = ${prod} ${sign} ${Math.abs(b)} = ${prod + b}`;
}
const exprPart = (expected: string, label = 'Expression:'): Part => part({ kind: 'expression', expected }, { label });
const whole = (v: number, opts: { label?: string; suffix?: string } = {}) => numPart(v, { ...opts, exact: false });

/** A horizontal table of values: one row of inputs, one row of outputs. Cells may be '?'. */
function hTable(head: [string, string], xs: Array<number | string>, ys: Array<number | string>): Figure {
  return { type: 'table', horizontal: true, headers: head, rows: xs.map((x, i) => [String(x), String(ys[i])]) };
}

/** Steps that find the expression an + b from the first terms (term 1 first). */
function ruleSteps(a: number, b: number, vals: number[], what = 'term value'): string[] {
  const steps: string[] = [];
  steps.push(
    a === 1
      ? `Each ${what} is $1$ more than the one before, so the expression starts with $1 \\times n$, which is $n$.`
      : `Each ${what} is $${a}$ more than the one before (${vals.slice(0, 3).map((v, i) => (i === 0 ? '' : `$${v} - ${vals[i - 1]} = ${a}$`)).filter(Boolean).join(', ')}). So the expression starts with $${a}n$, which means $${a} \\times n$.`,
  );
  const lead = a === 1 ? 'n' : `${a}n`;
  if (b === 0) steps.push(`When $n = 1$, $${lead}$ gives $${a}$, which already matches the first term. Nothing needs to be added.`);
  else if (b > 0) steps.push(`When $n = 1$, $${lead}$ gives $${a}$, but the first term is $${vals[0]}$. Add $${vals[0]} - ${a} = ${b}$.`);
  else steps.push(`When $n = 1$, $${lead}$ gives $${a}$, but the first term is $${vals[0]}$. Subtract $${a} - ${vals[0]} = ${-b}$.`);
  steps.push(`The expression is $${ruleText(a, b)}$.`);
  steps.push(`Check with $n = 3$: $${subst(a, b, 3)}$. It matches the third term.`);
  return steps;
}

// ---- Pattern pictures -------------------------------------------------------

/** Figures 1, 2 and 3 of squares in a row made from toothpicks (3n + 1 toothpicks). */
function toothpickSquares(): Figure {
  const segments: Seg[] = [];
  let x0 = 0.5;
  for (let k = 1; k <= 3; k++) {
    for (let i = 0; i < k; i++) {
      segments.push({ from: [x0 + i, 0], to: [x0 + i + 1, 0] }, { from: [x0 + i, 1], to: [x0 + i + 1, 1] });
    }
    for (let i = 0; i <= k; i++) segments.push({ from: [x0 + i, 0], to: [x0 + i, 1] });
    x0 += k + 1;
  }
  return { type: 'plane', grid: { xMin: 0, xMax: 9, yMin: -0.5, yMax: 1.5, step: 10 }, segments, hideTickLabels: true, caption: 'Figures 1, 2 and 3, from left to right' };
}

/** Figures 1, 2 and 3 of triangles in a row made from toothpicks (2n + 1 toothpicks). */
function toothpickTriangles(): Figure {
  const h = 0.866;
  const segments: Seg[] = [];
  let x0 = 0.5;
  for (let k = 1; k <= 3; k++) {
    const zig: Array<[number, number]> = [];
    for (let j = 0; j <= k + 1; j++) zig.push(j % 2 === 0 ? [x0 + j / 2, 0] : [x0 + j / 2, h]);
    for (let j = 0; j <= k; j++) segments.push({ from: zig[j], to: zig[j + 1] });
    const bottoms = zig.filter((_, j) => j % 2 === 0);
    const tops = zig.filter((_, j) => j % 2 === 1);
    for (let i = 0; i + 1 < bottoms.length; i++) segments.push({ from: bottoms[i], to: bottoms[i + 1] });
    for (let i = 0; i + 1 < tops.length; i++) segments.push({ from: tops[i], to: tops[i + 1] });
    x0 += (k + 1) / 2 + 1;
  }
  return { type: 'plane', grid: { xMin: 0, xMax: 7.5, yMin: -0.4, yMax: 1.3, step: 8 }, segments, hideTickLabels: true, caption: 'Figures 1, 2 and 3, from left to right' };
}

/** Square tables pushed together in rows of 1, 2 and 3, with a chair (dot) at each open side (2n + 2 chairs). */
function squareTables(): Figure {
  const polylines: PlaneFigure['polylines'] = [];
  const segments: Seg[] = [];
  const points: NonNullable<PlaneFigure['points']> = [];
  let x0 = 0.6;
  for (let k = 1; k <= 3; k++) {
    polylines.push({ points: [[x0, 0.7], [x0 + k, 0.7], [x0 + k, 1.7], [x0, 1.7], [x0, 0.7]] });
    for (let i = 1; i < k; i++) segments.push({ from: [x0 + i, 0.7], to: [x0 + i, 1.7] });
    for (let i = 0; i < k; i++) points.push({ x: x0 + i + 0.5, y: 2.1, color: 'accent' }, { x: x0 + i + 0.5, y: 0.3, color: 'accent' });
    points.push({ x: x0 - 0.35, y: 1.2, color: 'accent' }, { x: x0 + k + 0.35, y: 1.2, color: 'accent' });
    x0 += k + 1.3;
  }
  return { type: 'plane', grid: { xMin: 0, xMax: 10, yMin: 0, yMax: 2.4, step: 11 }, polylines, segments, points, hideTickLabels: true, caption: '1, 2 and 3 tables, from left to right' };
}

// ---- Contexts shared by the pattern skills ------------------------------------

interface PatternCtx {
  /** Describes the situation (no question). */
  intro: string;
  figure?: Figure;
  a: number;
  b: number;
  /** What one term counts, plural: "toothpicks". */
  noun: string;
  /** The input, plural and singular: "figures" / "Figure". */
  input: string;
  /** "Figure 12" / "12 tables" / "12 tickets". */
  at: (k: number) => string;
  /** Answer suffix for a term value. */
  suffix?: string;
  /** Answer label for a term value (money). */
  label?: string;
  /** Label for the input answer, e.g. "Figure", "Tables:". */
  inLabel: string;
  inSuffix?: string;
  /** Final sentence for a value. */
  say: (k: number, v: number) => string;
  /** Final sentence for the input that gives a value. */
  sayIn: (k: number, v: number) => string;
  /** How to read the first terms from the picture or words. */
  read: string;
  /** Headings for a table of values. */
  head: [string, string];
  /** What the expression gives: "the number of toothpicks in Figure $n$". */
  what: string;
}

const PATTERN_CTX: Array<(rng: Rng, name: string) => PatternCtx> = [
  () => ({
    intro: 'A pattern of squares is made from toothpicks. Each side of a small square is one toothpick.',
    figure: toothpickSquares(),
    a: 3, b: 1, noun: 'toothpicks', input: 'figure',
    at: (k) => `Figure ${k}`, suffix: 'toothpicks', inLabel: 'Figure',
    say: (k, v) => `Figure ${k} uses $${v}$ toothpicks.`,
    sayIn: (k, v) => `Figure ${k} uses $${v}$ toothpicks.`,
    read: 'Count the toothpicks in the picture: Figure 1 has $4$, Figure 2 has $7$ and Figure 3 has $10$.',
    head: ['Figure number, $n$', 'Toothpicks'],
    what: 'the number of toothpicks in Figure $n$',
  }),
  () => ({
    intro: 'A pattern of triangles is made from toothpicks. Each side of a small triangle is one toothpick.',
    figure: toothpickTriangles(),
    a: 2, b: 1, noun: 'toothpicks', input: 'figure',
    at: (k) => `Figure ${k}`, suffix: 'toothpicks', inLabel: 'Figure',
    say: (k, v) => `Figure ${k} uses $${v}$ toothpicks.`,
    sayIn: (k, v) => `Figure ${k} uses $${v}$ toothpicks.`,
    read: 'Count the toothpicks in the picture: Figure 1 has $3$, Figure 2 has $5$ and Figure 3 has $7$.',
    head: ['Figure number, $n$', 'Toothpicks'],
    what: 'the number of toothpicks in Figure $n$',
  }),
  (rng) => ({
    intro: `For a class party in ${rng.pick(TOWNS)}, square tables are pushed together in a row. One chair fits at each open side of a table.`,
    figure: squareTables(),
    a: 2, b: 2, noun: 'chairs', input: 'table',
    at: (k) => `${k} tables`, suffix: 'chairs', inLabel: 'Tables:',
    say: (k, v) => `A row of $${k}$ tables seats $${v}$ people.`,
    sayIn: (k, v) => `$${k}$ tables are needed to seat $${v}$ people.`,
    read: 'Count the chairs in the picture: $1$ table has $4$ chairs, $2$ tables have $6$ and $3$ tables have $8$.',
    head: ['Tables, $n$', 'Chairs'],
    what: 'the number of chairs around a row of $n$ tables',
  }),
  (rng) => {
    const a = rng.pick([4, 5, 6, 7, 8, 9, 10, 12]);
    const b = rng.pick([2, 3, 4, 5, 6, 8]);
    const event = rng.pick(['a school play', 'a hockey game', 'the science fair', 'a talent show', 'a basketball tournament']);
    return {
      intro: `Tickets for ${event} cost \\$${a} each. Every online order also has a booking fee of \\$${b}.`,
      a, b, noun: 'dollars', input: 'ticket',
      at: (k) => `${k} tickets`, label: '\\$', inLabel: 'Tickets:',
      say: (k, v) => `An order of $${k}$ tickets costs \\$${v}.`,
      sayIn: (k, v) => `An order that costs \\$${v} has $${k}$ tickets.`,
      read: `$1$ ticket costs $${a} + ${b} = ${a + b}$ dollars, $2$ tickets cost $${2 * a} + ${b} = ${2 * a + b}$ dollars and $3$ tickets cost $${3 * a} + ${b} = ${3 * a + b}$ dollars.`,
      head: ['Tickets, $n$', 'Cost (\\$)'],
      what: 'the total cost, in dollars, of an order of $n$ tickets',
    };
  },
  (rng, name) => {
    const a = rng.pick([5, 10, 15, 20]);
    const b = rng.pick([10, 15, 20, 25, 30, 40]);
    return {
      intro: `${name} has \\$${b} in a piggy bank and adds \\$${a} at the end of every week.`,
      a, b, noun: 'dollars', input: 'week',
      at: (k) => `week ${k}`, label: '\\$', inLabel: 'Week',
      say: (k, v) => `${name} will have \\$${v} at the end of week ${k}.`,
      sayIn: (k, v) => `${name} will have \\$${v} at the end of week ${k}.`,
      read: `At the end of week $1$, ${name} has $${b} + ${a} = ${a + b}$ dollars, then $${2 * a + b}$ dollars after week $2$ and $${3 * a + b}$ dollars after week $3$.`,
      head: ['Week, $n$', 'Savings (\\$)'],
      what: `${name}’s savings, in dollars, at the end of week $n$`,
    };
  },
];

// ---------------------------------------------------------------------------
// 5.1 Writing an expression for a pattern
// ---------------------------------------------------------------------------

function ruleD1(rng: Rng): Out {
  const mult = rng.chance(0.55);
  const a = mult ? rng.int(2, 9) : 1;
  const b = mult ? 0 : rng.int(2, 9);
  const vals = [1, 2, 3, 4, 5].map((n) => a * n + b);
  const expected = ruleText(a, b);
  return {
    prompt: 'The table shows a pattern. Write an expression for the value of the $n$th term. Use the variable $n$.',
    figure: hTable(['Term number, $n$', 'Term value'], [1, 2, 3, 4, 5], vals),
    parts: [exprPart(expected)],
    hints: [
      'Compare each term value with its term number. What do you do to the term number to get the value?',
      mult ? 'Is each value a multiple of its term number?' : 'Is each value the same amount more than its term number?',
    ],
    solution: mult
      ? [
          `Compare each value with its term number: $1 \\times ${a} = ${a}$, $2 \\times ${a} = ${2 * a}$, $3 \\times ${a} = ${3 * a}$.`,
          `Each value is $${a}$ times its term number, so the expression is $${a} \\times n$, written $${a}n$.`,
          `Check with $n = 5$: $${a}(5) = ${5 * a}$. It matches the table.`,
          `The expression is $${expected}$.`,
        ]
      : [
          `Compare each value with its term number: $1 + ${b} = ${1 + b}$, $2 + ${b} = ${2 + b}$, $3 + ${b} = ${3 + b}$.`,
          `Each value is $${b}$ more than its term number, so the expression is $n + ${b}$.`,
          `Check with $n = 5$: $5 + ${b} = ${5 + b}$. It matches the table.`,
          `The expression is $${expected}$.`,
        ],
  };
}

function ruleD2(rng: Rng): Out {
  const a = rng.int(2, 9);
  const b = retry(() => rng.int(-(a - 1), 9), (x) => x !== 0);
  const vals = [1, 2, 3, 4, 5].map((n) => a * n + b);
  const expected = ruleText(a, b);
  const words = rng.chance(0.3);
  return {
    prompt: words
      ? `The first term of a pattern is $${vals[0]}$. Each term after that is $${a}$ more than the term before it. Write an expression for the value of the $n$th term. Use the variable $n$.`
      : 'The table shows a pattern. Write an expression for the value of the $n$th term. Use the variable $n$.',
    figure: words ? undefined : hTable(['Term number, $n$', 'Term value'], [1, 2, 3, 4, 5], vals),
    parts: [exprPart(expected)],
    hints: [
      'How much does the value go up each time $n$ goes up by $1$? That number multiplies $n$.',
      'Then look at term $1$. What do you add or subtract to get the first value?',
    ],
    solution: [
      ...(words ? [`List the first terms: $${vals.slice(0, 4).join(', ')}, \\ldots$`] : []),
      ...ruleSteps(a, b, vals),
    ],
  };
}

function ruleD3(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const c = rng.pick(PATTERN_CTX)(rng, name);
  const vals = [1, 2, 3, 4].map((n) => c.a * n + c.b);
  const expected = ruleText(c.a, c.b);
  const ask = `Write an expression for ${c.what}.`;
  return {
    prompt: `${c.intro} ${ask}`,
    figure: c.figure,
    parts: [exprPart(expected)],
    hints: [
      c.figure ? 'Count for Figures 1, 2 and 3 and make a table of values.' : 'Work out the first three terms and make a table of values.',
      'How much does the number go up each time $n$ goes up by $1$? That number multiplies $n$. Then fix the start.',
    ],
    solution: [
      c.read,
      ...ruleSteps(c.a, c.b, vals, c.noun === 'dollars' ? 'amount' : 'term'),
      c.input === 'ticket'
        ? `Each ticket adds \\$${c.a}, and the \\$${c.b} fee is paid once, so the cost is $${expected}$ dollars.`
        : c.input === 'week'
          ? `Each week adds \\$${c.a} to the \\$${c.b} ${name} started with, so the savings are $${expected}$ dollars.`
          : `Each new ${c.input} adds $${c.a}$ ${c.noun}, so the expression is $${expected}$.`,
    ],
  };
}

const patternRule = skill({
  id: 'm7-pattern-rule',
  name: 'Writing an expression for a pattern',
  description: 'Write an expression such as 3n + 2 for the nth term of a pattern given as a table, in words or as a picture.',
  outcomes: ['PR1'],
  lessonId: 'm7-5-1',
  calculator: false,
  gen(rng, d) {
    return d === 1 ? ruleD1(rng) : d === 2 ? ruleD2(rng) : ruleD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 5.1 Using a relation to find a term or its position
// ---------------------------------------------------------------------------

/** Steps that work backwards from a value v to the term number. */
function backSteps(a: number, b: number, v: number): string[] {
  const k = (v - b) / a;
  const steps: string[] = [];
  if (b !== 0) steps.push(b > 0 ? `Undo the adding: $${v} - ${b} = ${v - b}$.` : `Undo the subtracting: $${v} + ${-b} = ${v - b}$.`);
  if (a !== 1) steps.push(`Undo the multiplying: $${v - b} \\div ${a} = ${k}$.`);
  steps.push(`Check: $${subst(a, b, k)}$. It works.`);
  return steps;
}

function termD1(rng: Rng): Out {
  const a = rng.int(2, 9);
  const b = rng.chance(0.2) ? 0 : retry(() => rng.int(-(a - 1), 12), (x) => x !== 0);
  const k = rng.int(6, 25);
  const v = a * k + b;
  const expr = ruleText(a, b);
  return {
    prompt: `The value of the $n$th term of a pattern is $${expr}$. What is the value of term $${k}$?`,
    parts: [whole(v, { label: `Term ${k}:` })],
    hints: ['The term number is $n$. Replace $n$ with the term number.', `Find $${expr.replace('n', `(${k})`)}$. Multiply first, then ${b < 0 ? 'subtract' : 'add'}.`],
    solution: [`Replace $n$ with $${k}$: $${subst(a, b, k)}$.`, `The value of term $${k}$ is $${v}$.`],
  };
}

function termD2(rng: Rng): Out {
  const a = rng.int(2, 9);
  const b = retry(() => rng.int(-(a - 1), 12), (x) => x !== 0);
  const expr = ruleText(a, b);
  if (rng.chance(0.5)) {
    const k = rng.int(8, 30);
    const v = a * k + b;
    return {
      prompt: `The value of the $n$th term of a pattern is $${expr}$. Which term has a value of $${v}$?`,
      parts: [whole(k, { label: 'Term number:' })],
      hints: [`You need the term number $n$ that makes $${expr} = ${v}$.`, `Work backwards: undo the ${b > 0 ? 'adding' : 'subtracting'} first, then undo the multiplying.`],
      solution: [`Find $n$ so that $${expr} = ${v}$. Work backwards.`, ...backSteps(a, b, v), `Term $${k}$ has a value of $${v}$.`],
    };
  }
  const vals = [1, 2, 3, 4].map((n) => a * n + b);
  const k = rng.pick([10, 12, 15, 20, 25, 30, 50]);
  const v = a * k + b;
  return {
    prompt: `The table shows the first four terms of a pattern. What is the value of term $${k}$?`,
    figure: hTable(['Term number, $n$', 'Term value'], [1, 2, 3, 4], vals),
    parts: [whole(v, { label: `Term ${k}:` })],
    hints: ['Counting on to term ' + k + ' takes a long time. Write an expression for the $n$th term first.', `Then replace $n$ with $${k}$.`],
    solution: [...ruleSteps(a, b, vals), `Replace $n$ with $${k}$: $${subst(a, b, k)}$.`, `The value of term $${k}$ is $${v}$.`],
  };
}

function termD3(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const c = rng.pick(PATTERN_CTX)(rng, name);
  const expr = ruleText(c.a, c.b);
  const k1 = rng.int(10, 30);
  const v1 = c.a * k1 + c.b;
  const k2 = retry(() => rng.int(8, 40), (x) => x !== k1);
  const v2 = c.a * k2 + c.b;
  const q1 =
    c.input === 'figure' ? `How many toothpicks are in Figure ${k1}?` : c.input === 'table' ? `How many people can sit at a row of $${k1}$ tables?` : c.input === 'ticket' ? `What is the cost of an order of $${k1}$ tickets?` : `How much will ${name} have at the end of week ${k1}?`;
  const q2 =
    c.input === 'figure' ? `Which figure uses $${v2}$ toothpicks?` : c.input === 'table' ? `How many tables are needed to seat $${v2}$ people?` : c.input === 'ticket' ? `An order costs \\$${v2}. How many tickets are in the order?` : `At the end of which week will ${name} have \\$${v2}?`;
  return {
    prompt: `${c.intro} The expression $${expr}$ gives ${c.what}.\n\n(a) ${q1}\n\n(b) ${q2}`,
    figure: c.figure,
    parts: [whole(v1, { label: '(a)', suffix: c.suffix, ...(c.label ? { label: `(a) ${c.label}` } : {}) }), whole(k2, { label: `(b) ${c.inLabel}`, suffix: c.inSuffix })],
    hints: [`(a) Replace $n$ with $${k1}$ in $${expr}$.`, `(b) Work backwards from $${v2}$: undo the adding, then undo the multiplying.`],
    solution: [
      `(a) Replace $n$ with $${k1}$: $${subst(c.a, c.b, k1)}$.`,
      c.say(k1, v1),
      `(b) Find $n$ so that $${expr} = ${v2}$. Work backwards.`,
      ...backSteps(c.a, c.b, v2),
      c.sayIn(k2, v2),
    ],
  };
}

const patternTerm = skill({
  id: 'm7-pattern-term',
  name: 'Using a linear relation',
  description: 'Use a linear relation such as 4n + 3 to find the value of a term, or work backwards to find which term has a given value.',
  outcomes: ['PR1'],
  lessonId: 'm7-5-1',
  calculator: false,
  gen(rng, d) {
    return d === 1 ? termD1(rng) : d === 2 ? termD2(rng) : termD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 5.2 Tables of values
// ---------------------------------------------------------------------------

function tableD1(rng: Rng): Out {
  const a = rng.int(2, 6);
  const b = rng.int(0, 9);
  const start = rng.pick([0, 1]);
  const xs = [0, 1, 2, 3, 4].map((i) => start + i);
  const ys = xs.map((x) => a * x + b);
  const blanks = rng.sample([1, 2, 3, 4], 3).sort((p, q) => p - q);
  const shown = ys.map((y, i) => (blanks.includes(i) ? '?' : y));
  const rel = `y = ${ruleText(a, b, 'x')}`;
  return {
    prompt: `Complete the table of values for the linear relation $${rel}$.`,
    figure: hTable(['$x$', '$y$'], xs, shown),
    parts: blanks.map((i) => whole(ys[i], { label: `$x = ${xs[i]}$, $y =$` })),
    hints: ['Replace $x$ with each value in the table.', `Multiply $x$ by $${a}$${b ? `, then add $${b}$` : ''}.`],
    solution: [
      `Substitute each value of $x$ into $${rel}$.`,
      ...blanks.map((i) => `$x = ${xs[i]}$: $y = ${subst(a, b, xs[i])}$`),
      `The missing values are ${blanks.map((i) => `$${ys[i]}$`).join(', ')}.`,
    ],
  };
}

interface TableCtx {
  intro: string;
  rel: string;
  a: number;
  b: number;
  head: [string, string];
  iv: string;
  ov: string;
  money: boolean;
  /** The relation in words, for the solution. */
  why: string;
}

const TABLE_CTX: Array<(rng: Rng, name: string) => TableCtx> = [
  (rng) => {
    const a = rng.pick([3, 4, 5, 6]);
    const b = rng.pick([4, 5, 6, 8]);
    return {
      intro: `A bowling alley charges \\$${b} to rent shoes plus \\$${a} for each game.`,
      rel: `C = ${a}g + ${b}`, a, b, head: ['Games, $g$', 'Cost, $C$ (\\$)'], iv: 'g', ov: 'C', money: true,
      why: `Each game costs \\$${a} and the shoes cost \\$${b} once, so $C = ${a}g + ${b}$.`,
    };
  },
  (rng, name) => {
    const a = rng.pick([2, 3, 4, 5]);
    const b = rng.pick([5, 6, 8, 10, 12]);
    return {
      intro: `${name} plants a bean seedling that is $${b}$ cm tall. It grows $${a}$ cm each week.`,
      rel: `h = ${a}w + ${b}`, a, b, head: ['Week, $w$', 'Height, $h$ (cm)'], iv: 'w', ov: 'h', money: false,
      why: `The seedling starts at $${b}$ cm and grows $${a}$ cm each week, so $h = ${a}w + ${b}$.`,
    };
  },
  (rng) => {
    const a = rng.pick([8, 10, 12, 15]);
    const b = rng.pick([10, 15, 20, 25]);
    return {
      intro: `A climbing gym charges a \\$${b} membership fee plus \\$${a} for each visit.`,
      rel: `C = ${a}v + ${b}`, a, b, head: ['Visits, $v$', 'Cost, $C$ (\\$)'], iv: 'v', ov: 'C', money: true,
      why: `Each visit costs \\$${a} and the fee is paid once, so $C = ${a}v + ${b}$.`,
    };
  },
  () => ({
    intro: 'Hexagon-shaped tables are pushed together in a row for a family reunion. One table seats $6$ people, and each table added to the row seats $4$ more.',
    rel: 'p = 4t + 2', a: 4, b: 2, head: ['Tables, $t$', 'People, $p$'], iv: 't', ov: 'p', money: false,
    why: 'One table seats $6 = 4(1) + 2$, and each table adds $4$ more, so $p = 4t + 2$.',
  }),
  (rng, name) => {
    const a = rng.pick([20, 25, 30]);
    const b = rng.pick([30, 40, 50, 60]);
    return {
      intro: `${name} already has \\$${b} saved and earns \\$${a} each time ${name} mows a lawn.`,
      rel: `S = ${a}m + ${b}`, a, b, head: ['Lawns mowed, $m$', 'Savings, $S$ (\\$)'], iv: 'm', ov: 'S', money: true,
      why: `${name} starts with \\$${b} and adds \\$${a} per lawn, so $S = ${a}m + ${b}$.`,
    };
  },
];

function tableContext(rng: Rng, d: Difficulty): Out {
  const name = rng.pick(NAMES);
  const c = rng.pick(TABLE_CTX)(rng, name);
  const xs = d === 2 ? [1, 2, 3, 4, 5] : [1, 2, 3, rng.int(6, 9), rng.int(10, 15)];
  const ys = xs.map((x) => c.a * x + c.b);
  // Two missing outputs and one missing input.
  const [yi1, yi2, xi] = d === 2 ? rng.sample([1, 2, 3, 4], 3) : [rng.pick([0, 1, 2]), 3, 4];
  const outBlanks = [yi1, yi2].sort((p, q) => p - q);
  const shownX = xs.map((x, i) => (i === xi ? '?' : x));
  const shownY = ys.map((y, i) => (outBlanks.includes(i) ? '?' : y));
  const lab = (i: number) => (c.money ? `$${c.iv} = ${xs[i]}$, $${c.ov} =$ \\$` : `$${c.iv} = ${xs[i]}$, $${c.ov} =$`);
  const unitSuffix = c.ov === 'h' ? 'cm' : c.ov === 'p' ? 'people' : undefined;
  const parts = [
    ...outBlanks.map((i) => whole(ys[i], { label: lab(i), suffix: unitSuffix })),
    whole(xs[xi], { label: `$${c.ov} = ${ys[xi]}$, $${c.iv} =$` }),
  ];
  const given = d === 2 ? ` The relation is $${c.rel}$.` : '';
  return {
    prompt: `${c.intro}${given} Complete the table of values.`,
    figure: hTable(c.head, shownX, shownY),
    parts,
    hints: [
      d === 2 ? `Substitute each value of $${c.iv}$ into $${c.rel}$.` : `First write a relation: what is multiplied by $${c.iv}$, and what is added once?`,
      `For the missing $${c.iv}$, work backwards from $${c.ov} = ${ys[xi]}$: subtract $${c.b}$, then divide by $${c.a}$.`,
    ],
    solution: [
      ...(d === 3 ? [c.why] : [`Use the relation $${c.rel}$.`]),
      ...outBlanks.map((i) => `$${c.iv} = ${xs[i]}$: $${c.ov} = ${subst(c.a, c.b, xs[i])}$`),
      `$${c.ov} = ${ys[xi]}$: work backwards. $${ys[xi]} - ${c.b} = ${ys[xi] - c.b}$, and $${ys[xi] - c.b} \\div ${c.a} = ${xs[xi]}$. Check: $${subst(c.a, c.b, xs[xi])}$.`,
      `The missing values are $${c.ov} = ${ys[outBlanks[0]]}$, $${c.ov} = ${ys[outBlanks[1]]}$ and $${c.iv} = ${xs[xi]}$.`,
    ],
  };
}

const tableOfValues = skill({
  id: 'm7-table-of-values',
  name: 'Tables of values',
  description: 'Complete a table of values from a linear relation or a situation, including working backwards to a missing input.',
  outcomes: ['PR2'],
  lessonId: 'm7-5-2',
  calculator: false,
  gen(rng, d) {
    return d === 1 ? tableD1(rng) : tableContext(rng, d);
  },
});

// ---------------------------------------------------------------------------
// 5.2 Graphs of linear relations
// ---------------------------------------------------------------------------

interface GraphCtx {
  intro: string;
  xLabel: string;
  yLabel: string;
  /** y = a x + b at the plotted x values. */
  a: number;
  b: number;
  xs: number[];
  /** Ask for y at x / x at y. */
  askY: (x: number) => string;
  askX: (y: number) => string;
  sayY: (x: number, y: number) => string;
  sayX: (x: number, y: number) => string;
  yLab?: string;
  ySuffix?: string;
  xLab?: string;
  xSuffix?: string;
  /** What b and a mean. */
  startQ: string;
  rateQ: string;
  startSay: (b: number) => string;
  rateSay: (a: number) => string;
  /** Variable names for the relation, and a sentence that defines them. */
  iv: string;
  ov: string;
  vars: string;
}

/** The y step for a graph, so every plotted value sits on a labelled grid line, or 0 if none works. */
function yStepFor(a: number, b: number, xs: number[]): number {
  const ys = xs.map((x) => a * x + b);
  const top = Math.max(...ys);
  return [2, 5, 10, 20].find((s) => a % s === 0 && b % s === 0 && top / s <= 10) ?? 0;
}

const GRAPH_CTX: Array<(rng: Rng, name: string) => GraphCtx> = [
  (rng) => {
    const { a, b } = retry(() => ({ a: rng.pick([4, 5, 6, 8, 10]), b: rng.pick([2, 4, 5, 6, 10]) }), (o) => yStepFor(o.a, o.b, [1, 2, 3, 4, 5, 6]) > 0);
    return {
      intro: `Tickets for a school concert cost the same amount each, plus a booking fee once per order. The graph shows the cost of an order for different numbers of tickets.`,
      xLabel: 'Number of tickets', yLabel: 'Cost ($)', a, b, xs: [1, 2, 3, 4, 5, 6], iv: 'n', ov: 'C', vars: 'Let $n$ be the number of tickets and $C$ be the cost in dollars.',
      askY: (x) => `What is the cost of an order of $${x}$ tickets?`,
      askX: (y) => `How many tickets are in an order that costs \\$${y}?`,
      sayY: (x, y) => `An order of $${x}$ tickets costs \\$${y}.`,
      sayX: (x, y) => `An order that costs \\$${y} has $${x}$ tickets.`,
      yLab: '\\$', xSuffix: 'tickets',
      startQ: 'What is the booking fee?', rateQ: 'How much does each ticket cost?',
      startSay: (v) => `The booking fee is \\$${v}.`, rateSay: (v) => `Each ticket costs \\$${v}.`,
    };
  },
  (rng, name) => {
    const { a, b } = retry(() => ({ a: rng.pick([2, 4, 5]), b: rng.pick([2, 4, 6, 8, 10]) }), (o) => yStepFor(o.a, o.b, [0, 1, 2, 3, 4, 5, 6]) > 0);
    return {
      intro: `${name} measures a sunflower plant every week. The graph shows its height.`,
      xLabel: 'Week', yLabel: 'Height (cm)', a, b, xs: [0, 1, 2, 3, 4, 5, 6], iv: 'w', ov: 'h', vars: 'Let $w$ be the week number and $h$ be the height in centimetres.',
      askY: (x) => `How tall is the plant in week $${x}$?`,
      askX: (y) => `In which week is the plant $${y}$ cm tall?`,
      sayY: (x, y) => `In week $${x}$ the plant is $${y}$ cm tall.`,
      sayX: (x, y) => `The plant is $${y}$ cm tall in week $${x}$.`,
      ySuffix: 'cm', xLab: 'Week',
      startQ: 'How tall was the plant in week $0$, when it was first measured?', rateQ: 'How many centimetres does the plant grow each week?',
      startSay: (v) => `The plant was $${v}$ cm tall at the start.`, rateSay: (v) => `The plant grows $${v}$ cm each week.`,
    };
  },
  (rng, name) => {
    const { a, b } = retry(() => ({ a: rng.pick([5, 10, 15, 20]), b: rng.pick([10, 20, 30, 40]) }), (o) => yStepFor(o.a, o.b, [0, 1, 2, 3, 4, 5]) > 0);
    return {
      intro: `${name} has some money saved and adds the same amount every week. The graph shows ${name}’s savings.`,
      xLabel: 'Week', yLabel: 'Savings ($)', a, b, xs: [0, 1, 2, 3, 4, 5], iv: 'w', ov: 'S', vars: 'Let $w$ be the week number and $S$ be the savings in dollars.',
      askY: (x) => `How much has ${name} saved at the end of week $${x}$?`,
      askX: (y) => `At the end of which week does ${name} have \\$${y}?`,
      sayY: (x, y) => `At the end of week $${x}$, ${name} has \\$${y}.`,
      sayX: (x, y) => `${name} has \\$${y} at the end of week $${x}$.`,
      yLab: '\\$', xLab: 'Week',
      startQ: `How much did ${name} have saved at the start (week $0$)?`, rateQ: `How much does ${name} add each week?`,
      startSay: (v) => `${name} started with \\$${v}.`, rateSay: (v) => `${name} adds \\$${v} each week.`,
    };
  },
  (rng) => {
    const t = rng.pick([{ a: 2, b: 2, kind: 'square', seat: 'chairs' }, { a: 4, b: 2, kind: 'hexagon-shaped', seat: 'chairs' }]);
    return {
      intro: `${t.kind === 'square' ? 'Square' : 'Hexagon-shaped'} tables are pushed together in a row. The graph shows how many people can sit at the row.`,
      xLabel: 'Number of tables', yLabel: 'Number of people', a: t.a, b: t.b, xs: t.a === 2 ? [1, 2, 3, 4, 5, 6] : [1, 2, 3, 4], iv: 't', ov: 'p', vars: 'Let $t$ be the number of tables and $p$ be the number of people.',
      askY: (x) => `How many people can sit at a row of $${x}$ tables?`,
      askX: (y) => `How many tables are needed to seat $${y}$ people?`,
      sayY: (x, y) => `A row of $${x}$ tables seats $${y}$ people.`,
      sayX: (x, y) => `$${x}$ tables seat $${y}$ people.`,
      ySuffix: 'people', xSuffix: 'tables',
      startQ: 'How many people sit at the two ends of the row?', rateQ: 'How many more people can sit for each table added?',
      startSay: (v) => `$${v}$ people sit at the two ends.`, rateSay: (v) => `Each table adds $${v}$ people.`,
    };
  },
  (rng) => {
    const { a, b } = retry(() => ({ a: rng.pick([2, 4, 6, 10]), b: rng.pick([0, 2, 4, 6, 10]) }), (o) => yStepFor(o.a, o.b, [0, 1, 2, 3, 4, 5]) > 0 && (o.b > 0 || o.a > 2));
    return {
      intro: `The graph shows the linear relation between $x$ and $y$.`,
      xLabel: 'x', yLabel: 'y', a, b, xs: [0, 1, 2, 3, 4, 5], iv: 'x', ov: 'y', vars: '',
      askY: (x) => `What is the value of $y$ when $x = ${x}$?`,
      askX: (y) => `What is the value of $x$ when $y = ${y}$?`,
      sayY: (x, y) => `When $x = ${x}$, $y = ${y}$.`,
      sayX: (x, y) => `When $y = ${y}$, $x = ${x}$.`,
      xLab: '$x =$',
      startQ: 'What is $y$ when $x = 0$?', rateQ: 'By how much does $y$ go up each time $x$ goes up by $1$?',
      startSay: (v) => `When $x = 0$, $y = ${v}$.`, rateSay: (v) => `$y$ goes up by $${v}$ each time.`,
    };
  },
];

function graphOf(c: { a: number; b: number; xs: number[]; xLabel: string; yLabel: string }, yMax: number, yStep: number, caption?: string): Figure {
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: Math.max(...c.xs) + 1, yMin: 0, yMax, xStep: 1, yStep, xLabel: c.xLabel, yLabel: c.yLabel },
    points: c.xs.map((x) => ({ x, y: c.a * x + c.b })),
    caption,
  };
}

const READ_UP = (x: number) => `Find $${x}$ on the horizontal axis. Go straight up to the point, then straight across to the vertical axis.`;
const READ_ACROSS = (y: number) => `Find $${y}$ on the vertical axis. Go straight across to the point, then straight down to the horizontal axis.`;

function graphD1D2(rng: Rng, d: Difficulty, c: GraphCtx): Out {
  const yStep = yStepFor(c.a, c.b, c.xs);
  const yMax = (Math.floor(Math.max(...c.xs.map((x) => c.a * x + c.b)) / yStep) + 1) * yStep;
  const figure = graphOf(c, yMax, yStep);
  const inner = c.xs.filter((x) => x >= 2);
  const yPart = (y: number) => whole(y, { label: c.yLab, suffix: c.ySuffix });
  if (d === 1 || rng.chance(0.4)) {
    const x = rng.pick(inner);
    const y = c.a * x + c.b;
    return {
      prompt: `${c.intro} ${c.askY(x)}`,
      figure,
      parts: [yPart(y)],
      hints: ['Start on the horizontal axis.', READ_UP(x)],
      solution: [`Find $${x}$ on the horizontal axis and go up to the point.`, `Go across to the vertical axis: the point is at $${y}$.`, c.sayY(x, y)],
    };
  }
  const x = rng.pick(inner);
  const y = c.a * x + c.b;
  return {
    prompt: `${c.intro} ${c.askX(y)}`,
    figure,
    parts: [whole(x, { label: c.xLab, suffix: c.xSuffix })],
    hints: ['This time, start on the vertical axis.', READ_ACROSS(y)],
    solution: [`Find $${y}$ on the vertical axis and go across to the point.`, `Go straight down to the horizontal axis: the point is at $${x}$.`, c.sayX(x, y)],
  };
}

/** Which graph shows the relation? Four point graphs on the same grid. */
function pickGraph(rng: Rng): Out {
  const { a, b } = retry(
    () => ({ a: rng.pick([2, 4, 6]), b: rng.pick([2, 4, 6, 8]) }),
    (o) => o.a !== o.b,
  );
  const xs = [0, 1, 2, 3, 4];
  const rels: Array<[number, number]> = [[a, b], [b, a], [a, 0], [a + 2, b]];
  const yStep = 2;
  const top = Math.max(...rels.map(([p, q]) => p * 4 + q));
  const yMax = (Math.floor(top / yStep) + 1) * yStep;
  const useTable = rng.chance(0.5);
  const order = rng.shuffle(rels.map((r, i) => ({ r, correct: i === 0 })));
  const options = order.map((o, i) => ({
    md: `Graph ${'ABCD'[i]}`,
    correct: o.correct,
    figure: graphOf({ a: o.r[0], b: o.r[1], xs, xLabel: 'x', yLabel: 'y' }, yMax, yStep),
  }));
  const ys = xs.map((x) => a * x + b);
  const rel = `y = ${ruleText(a, b, 'x')}`;
  const right = 'ABCD'[order.findIndex((o) => o.correct)];
  return {
    prompt: useTable ? 'Which graph shows the points in this table of values?' : `Which graph shows the linear relation $${rel}$ for $x = 0$ to $4$?`,
    figure: useTable ? hTable(['$x$', '$y$'], xs, ys) : undefined,
    parts: [{ answer: mcFigures(rng, options, true) }],
    hints: [
      useTable ? 'Look at the first point in the table, $(0,\\ ' + b + ')$. Which graphs start there?' : `Make a table of values first. When $x = 0$, $y = ${b}$.`,
      `Check a second point: when $x = 3$, $y = ${a * 3 + b}$.`,
    ],
    solution: [
      ...(useTable ? [] : [`Make a table: ${xs.map((x, i) => `$(${x},\\ ${ys[i]})$`).join(', ')}.`]),
      `The graph must go through $(0,\\ ${b})$ and go up by $${a}$ each time $x$ goes up by $1$.`,
      `Check $x = 3$: $y = ${subst(a, b, 3)}$. Only Graph ${right} has the point $(3,\\ ${a * 3 + b})$ and all the other points.`,
      `The answer is Graph ${right}.`,
    ],
  };
}

function graphD3(rng: Rng, c: GraphCtx): Out {
  const yStep = yStepFor(c.a, c.b, c.xs);
  const yMax = (Math.floor(Math.max(...c.xs.map((x) => c.a * x + c.b)) / yStep) + 1) * yStep;
  const figure = graphOf(c, yMax, yStep);
  const x0 = c.xs[0];
  const y0 = c.a * x0 + c.b;
  const rel = `${c.ov} = ${ruleText(c.a, c.b, c.iv)}`;
  if (rng.chance(0.5)) {
    // Which relation matches the graph, then predict beyond the graph.
    const k = rng.int(Math.max(...c.xs) + 3, Math.max(...c.xs) + 12);
    const v = c.a * k + c.b;
    const wrong = [
      `$${c.ov} = ${ruleText(c.b || c.a + 1, c.a, c.iv)}$`,
      `$${c.ov} = ${ruleText(c.a, 0, c.iv)}$`,
      `$${c.ov} = ${ruleText(c.a + yStep, c.b, c.iv)}$`,
      `$${c.ov} = ${ruleText(c.a, c.b + yStep, c.iv)}$`,
    ];
    return {
      prompt: `${c.intro}${c.vars ? ` ${c.vars}` : ''}\n\n(a) Which relation matches the graph?\n\n(b) Use the relation to find $${c.ov}$ when $${c.iv} = ${k}$, which is past the end of the graph.`,
      figure,
      parts: [{ label: '(a)', answer: mc(rng, `$${rel}$`, wrong) }, whole(v, { label: `(b) ${c.yLab ?? ''}`.trim(), suffix: c.ySuffix })],
      hints: ['Read two points next to each other. How much does the value go up each time? That number multiplies the variable.', `Read the value when $${c.iv} = ${x0}$ to find the start. Then substitute $${c.iv} = ${k}$.`],
      solution: [
        `From one point to the next, the value goes up by $${c.a}$ (for example, $${c.a * (x0 + 1) + c.b} - ${y0} = ${c.a}$). So the relation has $${c.a}${c.iv}$.`,
        x0 === 0 ? `When $${c.iv} = 0$, the value is $${c.b}$, so add $${c.b}$.` : `When $${c.iv} = 1$, $${c.a}(1) = ${c.a}$, but the graph shows $${y0}$, so add $${y0 - c.a}$.`,
        `(a) The relation is $${rel}$.`,
        `(b) Substitute $${c.iv} = ${k}$: $${c.ov} = ${subst(c.a, c.b, k)}$.`,
        `When $${c.iv} = ${k}$, $${c.ov} = ${v}$.`,
      ],
    };
  }
  // Start value and change per step, read from the graph.
  return {
    prompt: `${c.intro}\n\n(a) ${c.startQ}\n\n(b) ${c.rateQ}`,
    figure,
    parts: [whole(c.b, { label: `(a) ${c.yLab ?? ''}`.trim(), suffix: c.ySuffix }), whole(c.a, { label: `(b) ${c.yLab ?? ''}`.trim(), suffix: c.ySuffix })],
    hints: [
      x0 === 0 ? '(a) Read the point where the horizontal value is $0$.' : `(a) The graph starts at $1$. Each step adds the same amount, so go back one step from the first point to find the value at $0$.`,
      '(b) Read two points next to each other and subtract.',
    ],
    solution: [
      `Read two points next to each other: at $${x0}$ the value is $${y0}$, and at $${x0 + 1}$ it is $${y0 + c.a}$. The change for each step is $${y0 + c.a} - ${y0} = ${c.a}$.`,
      x0 === 0 ? `(a) At $0$ the point is at $${c.b}$. ${c.startSay(c.b)}` : `(a) The value at $0$ is one step before the first point: $${y0} - ${c.a} = ${c.b}$. ${c.startSay(c.b)}`,
      `(b) ${c.rateSay(c.a)}`,
    ],
  };
}

const graphRelation = skill({
  id: 'm7-graph-relation',
  name: 'Graphs of linear relations',
  description: 'Read values from the graph of a linear relation, match a graph to its table or relation, and use the graph to solve problems.',
  outcomes: ['PR2'],
  lessonId: 'm7-5-2',
  calculator: false,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 2 && rng.chance(0.4)) return pickGraph(rng);
    const c = rng.pick(GRAPH_CTX)(rng, name);
    return d === 3 ? graphD3(rng, c) : graphD1D2(rng, d, c);
  },
});

export const PATTERNS_SKILLS: SkillDef[] = [patternRule, patternTerm, tableOfValues, graphRelation];
