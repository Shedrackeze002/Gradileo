/** Math 8 Unit 7 — Linear Equations (PR2). */
import { fixedChoice, mc, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { frac, fracLatex, paren } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Liam', 'Priya', 'Mateo', 'Aiyana', 'Jun', 'Fatima', 'Noah', 'Harpreet', 'Olivia', 'Tariq', 'Mei',
  'Kwame', 'Chloé', 'Ravi', 'Sienna', 'Dakota', 'Ethan', 'Leilani', 'Omar', 'Nadia', 'Jaxon', 'Ayesha', 'Wei',
  'Isabelle', 'Kiran', 'Malik', 'Sofia', 'Gurpreet', 'Hiroshi', 'Zara', 'Émile', 'Thandiwe', 'Connor', 'Rosa', 'Tyler',
];
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater'];
const LETTERS = ['n', 'm', 'k', 'p', 't', 'w', 'a', 'b'];

type Out = GenOutput;

const works = 'It works.';
const dollars = (v: number) => `\\$${v}`;
/** A number that may be a fraction, in LaTeX. */
const fx = (n: number, d = 1) => fracLatex(frac(n, d));

/** a·v in LaTeX: 3x, -x, x. */
const term = (a: number, v: string) => (a === 1 ? v : a === -1 ? `-${v}` : `${a}${v}`);
/** " + 5" or " - 5". */
const plus = (b: number) => (b < 0 ? ` - ${-b}` : ` + ${b}`);
/** v/a in LaTeX. */
const over = (v: string, a: number) => `\\dfrac{${v}}{${a}}`;

/** Why a quotient or product of integers has its sign. */
function signNote(p: number, q: number, op: 'divide' | 'multiply'): string {
  if (p === 0 || (p > 0 && q > 0)) return '';
  const same = p < 0 === q < 0;
  const what = op === 'divide' ? 'quotient' : 'product';
  return same ? ` (The signs are the same, so the ${what} is positive.)` : ` (The signs are different, so the ${what} is negative.)`;
}

/** Steps to solve a·v = b. */
function solveMul(a: number, b: number, v: string): string[] {
  const x = b / a;
  return [
    `$${term(a, v)}$ means $${a}$ times $${v}$. To undo multiplying by $${a}$, divide both sides by $${a}$.`,
    `$\\dfrac{${term(a, v)}}{${a}} = \\dfrac{${b}}{${a}}$, so $${v} = ${b} \\div ${paren(a)} = ${x}$.${signNote(b, a, 'divide')}`,
  ];
}

/** Steps to solve v/a = b. */
function solveDiv(a: number, b: number, v: string): string[] {
  const x = a * b;
  return [
    `$${v}$ is divided by $${a}$. To undo dividing by $${a}$, multiply both sides by $${a}$.`,
    `$${v} = ${b} \\times ${paren(a)} = ${x}$.${signNote(b, a, 'multiply')}`,
  ];
}

/** Undo "+ b" (or "- b") on the side with the variable: steps, and the new right side. */
function undoAdd(lhs: string, b: number, c: number): { steps: string[]; rest: number } {
  const rest = c - b;
  return {
    steps: [
      b > 0
        ? `Undo the adding first: subtract $${b}$ from both sides. $${lhs} = ${c} - ${b} = ${rest}$`
        : `Undo the subtracting first: add $${-b}$ to both sides. $${lhs} = ${c} + ${-b} = ${rest}$`,
    ],
    rest,
  };
}

const xPart = (x: number, v: string) => numPart(x, { label: `$${v} =$` });

// ---------------------------------------------------------------------------
// 7.1 One-step equations
// ---------------------------------------------------------------------------

interface OneCtx {
  text: string;
  eq: string;
  /** The substitution check, in LaTeX. */
  check: string;
  steps: string[];
  x: number;
  part: Part;
  say: string;
}

const ONE_CTX: Array<(rng: Rng, name: string) => OneCtx> = [
  (rng) => {
    const h = rng.int(3, 8);
    const r = -rng.int(2, 5);
    const town = rng.pick(TOWNS);
    return {
      text: `A cold front reached ${town}. Over $${h}$ hours, the temperature changed by $${h * r}^\\circ\\text{C}$ in total. It changed by the same amount every hour. Let $c$ be the change each hour. Solve $${h}c = ${h * r}$ to find the change each hour.`,
      eq: `${h}c = ${h * r}`,
      check: `${h}(${r}) = ${h * r}`,
      steps: solveMul(h, h * r, 'c'),
      x: r,
      part: numPart(r, { label: '$c =$', suffix: '°C' }),
      say: `The temperature changed by $${r}^\\circ\\text{C}$ each hour (it dropped $${-r}^\\circ\\text{C}$ an hour).`,
    };
  },
  (rng, name) => {
    const m = rng.int(3, 9);
    const r = -rng.int(2, 6);
    return {
      text: `${name} is scuba diving. ${name} goes down at a steady rate, and after $${m}$ minutes ${name}’s elevation has changed by $${m * r}$ m. Let $r$ be the change in elevation each minute. Solve $${m}r = ${m * r}$.`,
      eq: `${m}r = ${m * r}`,
      check: `${m}(${r}) = ${m * r}`,
      steps: solveMul(m, m * r, 'r'),
      x: r,
      part: numPart(r, { label: '$r =$', suffix: 'm' }),
      say: `The elevation changes by $${r}$ m each minute.`,
    };
  },
  (rng, name) => {
    const n = rng.int(3, 6);
    const each = rng.int(6, 15);
    return {
      text: `${name} and some friends share the cost of a pizza order equally. There are $${n}$ people, and each person pays ${dollars(each)}. Let $p$ be the total cost in dollars. Solve $${over('p', n)} = ${each}$.`,
      eq: `${over('p', n)} = ${each}`,
      check: `\\dfrac{${n * each}}{${n}} = ${each}`,
      steps: solveDiv(n, each, 'p'),
      x: n * each,
      part: numPart(n * each, { label: '$p =$ \\$' }),
      say: `The pizza order cost ${dollars(n * each)}.`,
    };
  },
  (rng, name) => {
    const g = rng.int(3, 6);
    const r = -rng.int(1, 4);
    return {
      text: `${name}’s golf score changed by the same amount in each of $${g}$ rounds. The total change was $${g * r}$. Let $s$ be the change in each round. Solve $${g}s = ${g * r}$.`,
      eq: `${g}s = ${g * r}`,
      check: `${g}(${r}) = ${g * r}`,
      steps: solveMul(g, g * r, 's'),
      x: r,
      part: xPart(r, 's'),
      say: `The score changed by $${r}$ in each round.`,
    };
  },
  (rng) => {
    const k = rng.int(2, 5);
    const each = -rng.int(3, 12);
    return {
      text: `A number is divided by $${k}$, and the result is $${each}$. Let $n$ be the number. Solve $${over('n', k)} = ${each}$.`,
      eq: `${over('n', k)} = ${each}`,
      check: `\\dfrac{${k * each}}{${k}} = ${each}`,
      steps: solveDiv(k, each, 'n'),
      x: k * each,
      part: xPart(k * each, 'n'),
      say: `The number is $${k * each}$.`,
    };
  },
  (rng, name) => {
    const w = rng.int(3, 8);
    const r = -5 * rng.int(2, 6);
    return {
      text: `${name} takes the same amount out of a bank account every week for $${w}$ weeks. The balance changes by ${r < 0 ? '−' : ''}${dollars(Math.abs(w * r))} in total. Let $b$ be the change each week, in dollars. Solve $${w}b = ${w * r}$.`,
      eq: `${w}b = ${w * r}`,
      check: `${w}(${r}) = ${w * r}`,
      steps: solveMul(w, w * r, 'b'),
      x: r,
      part: numPart(r, { label: '$b =$', suffix: 'dollars' }),
      say: `The balance changes by $${r}$ dollars each week (${dollars(-r)} is taken out).`,
    };
  },
];

function oneStep(rng: Rng, d: Difficulty): Out {
  if (d === 3) {
    const c = rng.pick(ONE_CTX)(rng, rng.pick(NAMES));
    return {
      prompt: c.text,
      parts: [c.part],
      hints: ['Decide what is being done to the variable: is it multiplied or divided?', 'Do the inverse operation to both sides. Watch the signs of the integers.'],
      solution: [...c.steps, `Check: $${c.check}$. ${works}`, c.say],
    };
  }
  const v = d === 1 ? 'x' : rng.pick(['x', 'x', ...LETTERS]);
  const div = rng.chance(d === 1 ? 0.3 : 0.45);
  const swap = d === 2 && rng.chance(0.3);
  if (div) {
    const a = d === 1 ? rng.int(2, 6) : rng.pick([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 7, 8]);
    const b = d === 1 ? rng.int(2, 10) : retry(() => rng.nonZero(-10, 10), (k) => a > 0 ? k < 0 || rng.chance(0.3) : true);
    const x = a * b;
    const eq = swap ? `${b} = ${over(v, a)}` : `${over(v, a)} = ${b}`;
    return {
      prompt: `Solve $${eq}$.`,
      parts: [xPart(x, v)],
      hints: [`$${v}$ is divided by $${a}$. What undoes dividing?`, `Multiply both sides by $${a}$.${d === 2 ? ' Use the sign rules for multiplying integers.' : ''}`],
      solution: [...solveDiv(a, b, v), `Check: $\\dfrac{${x}}{${a}} = ${b}$. ${works}`, `$${v} = ${x}$`],
    };
  }
  const a = d === 1 ? rng.int(2, 9) : rng.pick([-9, -8, -7, -6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 7, 8, 9]);
  const x = d === 1 ? rng.int(2, 12) : retry(() => rng.nonZero(-12, 12), (k) => a > 0 ? k < 0 || rng.chance(0.3) : true);
  const b = a * x;
  const eq = swap ? `${b} = ${term(a, v)}` : `${term(a, v)} = ${b}`;
  return {
    prompt: `Solve $${eq}$.`,
    parts: [xPart(x, v)],
    hints: [`$${term(a, v)}$ means $${a} \\times ${v}$. What undoes multiplying?`, `Divide both sides by $${a}$.${d === 2 ? ' Use the sign rules for dividing integers.' : ''}`],
    solution: [...solveMul(a, b, v), `Check: $${a}(${x}) = ${b}$. ${works}`, `$${v} = ${x}$`],
  };
}

// ---------------------------------------------------------------------------
// 7.2 Two-step equations
// ---------------------------------------------------------------------------

function twoStep(rng: Rng, d: Difficulty): Out {
  const v = d === 1 ? 'x' : rng.pick(['x', 'x', ...LETTERS]);
  const div = rng.chance(0.35);
  // Shape at difficulty 3: sides swapped, the constant written first, or a negative divisor.
  const shape = d === 3 ? rng.pick(['swap', 'first', 'first'] as const) : 'plain';
  if (div) {
    const a = d === 1 ? rng.int(2, 5) : d === 2 ? rng.pick([2, 3, 4, 5, 6]) : rng.pick([-5, -4, -3, -2, 2, 3, 4, 5]);
    const q = d === 1 ? rng.int(1, 8) : rng.nonZero(-8, 8);
    const x = a * q;
    const b = d === 1 ? rng.int(1, 9) : rng.nonZero(-12, 12);
    const c = q + b;
    const lhsCore = over(v, a);
    const lhs = shape === 'first' ? `${b} + ${lhsCore}` : `${lhsCore}${plus(b)}`;
    const eq = shape === 'swap' ? `${c} = ${lhs}` : `${lhs} = ${c}`;
    const u = undoAdd(lhsCore, b, c);
    return {
      prompt: `Solve $${eq}$.`,
      parts: [xPart(x, v)],
      hints: [
        `Two things happen to $${v}$: it is divided by $${a}$, then $${Math.abs(b)}$ is ${b > 0 ? 'added' : 'subtracted'}. Undo them in the reverse order.`,
        `First ${b > 0 ? `subtract $${b}$ from` : `add $${-b}$ to`} both sides. Then multiply both sides by $${a}$.`,
      ],
      solution: [
        ...(shape === 'swap' ? [`Write the equation with $${v}$ on the left: $${lhs} = ${c}$.`] : shape === 'first' ? [`$${lhs}$ is the same as $${lhsCore}${plus(b)}$.`] : []),
        ...u.steps,
        ...solveDiv(a, u.rest, v),
        `Check: $\\dfrac{${x}}{${a}}${plus(b)} = ${q}${plus(b)} = ${c}$. ${works}`,
        `$${v} = ${x}$`,
      ],
    };
  }
  const a = d === 1 ? rng.int(2, 6) : rng.pick([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 7]);
  const x = d === 1 ? rng.int(1, 10) : rng.nonZero(-9, 9);
  const b = d === 1 ? rng.int(1, 15) : rng.nonZero(-15, 15);
  const c = a * x + b;
  const lhsCore = term(a, v);
  const lhs = shape === 'first' ? (a < 0 ? `${b} - ${term(-a, v)}` : `${b} + ${lhsCore}`) : `${lhsCore}${plus(b)}`;
  const eq = shape === 'swap' ? `${c} = ${lhs}` : `${lhs} = ${c}`;
  const u = undoAdd(lhsCore, b, c);
  return {
    prompt: `Solve $${eq}$.`,
    parts: [xPart(x, v)],
    hints: [
      `Two things happen to $${v}$: it is multiplied by $${a}$, then $${Math.abs(b)}$ is ${b > 0 ? 'added' : 'subtracted'}. Undo them in the reverse order.`,
      `First ${b > 0 ? `subtract $${b}$ from` : `add $${-b}$ to`} both sides. Then divide both sides by $${a}$.`,
    ],
    solution: [
      ...(shape === 'swap' ? [`Write the equation with $${v}$ on the left: $${lhs} = ${c}$.`] : shape === 'first' ? [`$${lhs}$ is the same as $${lhsCore}${plus(b)}$.`] : []),
      ...u.steps,
      ...solveMul(a, u.rest, v),
      `Check: $${a}(${x})${plus(b)} = ${a * x}${plus(b)} = ${c}$. ${works}`,
      `$${v} = ${x}$`,
    ],
  };
}

// ---------------------------------------------------------------------------
// 7.3 Equations with brackets: a(x + b) = c
// ---------------------------------------------------------------------------

/** a(v + b) in LaTeX. */
const bracket = (a: number, b: number, v: string) => `${a === -1 ? '-' : a}(${v}${plus(b)})`;

function distributeSteps(a: number, b: number, c: number, v: string): string[] {
  const ab = a * b;
  return [
    `Distribute: multiply each term in the brackets by $${a}$. $${paren(a)}(${v}) + ${paren(a)}(${b}) = ${c}$ gives $${term(a, v)}${plus(ab)} = ${c}$.`,
    ...undoAdd(term(a, v), ab, c).steps,
    ...solveMul(a, c - ab, v),
  ];
}

function divideFirstSteps(a: number, b: number, c: number, v: string): string[] {
  const q = c / a;
  return [
    `Divide both sides by $${a}$ first: $${v}${plus(b)} = ${c} \\div ${paren(a)} = ${q}$.${signNote(c, a, 'divide')}`,
    b > 0 ? `Subtract $${b}$ from both sides: $${v} = ${q} - ${b} = ${q - b}$` : `Add $${-b}$ to both sides: $${v} = ${q} + ${-b} = ${q - b}$`,
  ];
}

const checkBracket = (a: number, b: number, x: number) => `Check: $${a === -1 ? '-' : a}(${x}${plus(b)}) = ${a === -1 ? '-' : a}(${x + b}) = ${a * (x + b)}$. ${works}`;

interface BracketMistake {
  steps: string[];
  wrongStep: number;
  why: string;
}

/** A worked solution with one mistake in it, for error analysis. */
function bracketMistake(rng: Rng, a: number, b: number, c: number, v: string): BracketMistake {
  const ab = a * b;
  // A sign slip when dividing (or distributing) only happens with a negative number outside the brackets.
  const kinds = a < 0 ? ['forgot', 'add', 'sign', 'divide'] : ['forgot', 'add'];
  const kind = rng.pick(kinds);
  const show = (n: number, d: number) => `${v} = ${fx(n, d)}`;
  if (kind === 'forgot') {
    return {
      steps: [`$${term(a, v)}${plus(b)} = ${c}$`, `$${term(a, v)} = ${c - b}$`, `$${show(c - b, a)}$`],
      wrongStep: 1,
      why: `In Step 1, only $${v}$ was multiplied by $${a}$. The $${b}$ in the brackets must be multiplied by $${a}$ too, giving $${term(a, v)}${plus(ab)}$.`,
    };
  }
  if (kind === 'sign') {
    return {
      steps: [`$${term(a, v)}${plus(-ab)} = ${c}$`, `$${term(a, v)} = ${c + ab}$`, `$${show(c + ab, a)}$`],
      wrongStep: 1,
      why: `In Step 1, $${paren(a)} \\times ${paren(b)} = ${ab}$, not $${-ab}$. The equation should be $${term(a, v)}${plus(ab)} = ${c}$.`,
    };
  }
  if (kind === 'add') {
    return {
      steps: [`$${term(a, v)}${plus(ab)} = ${c}$`, `$${term(a, v)} = ${c + ab}$`, `$${show(c + ab, a)}$`],
      wrongStep: 2,
      why: `In Step 2, $${ab}$ was ${ab > 0 ? 'added to' : 'subtracted from'} the right side instead of ${ab > 0 ? 'subtracted' : 'added'}. To undo $${plus(ab).trim()}$, ${ab > 0 ? `subtract $${ab}$` : `add $${-ab}$`}: $${term(a, v)} = ${c - ab}$.`,
    };
  }
  return {
    steps: [`$${term(a, v)}${plus(ab)} = ${c}$`, `$${term(a, v)} = ${c - ab}$`, `$${show(-(c - ab), a)}$`],
    wrongStep: 3,
    why: `In Step 3, $${c - ab} \\div ${paren(a)} = ${(c - ab) / a}$. The sign of the answer is wrong.`,
  };
}

interface BracketCtx {
  text: string;
  eq: string;
  x: number;
  a: number;
  b: number;
  c: number;
  v: string;
  part: Part;
  say: string;
}

const BRACKET_CTX: Array<(rng: Rng, name: string) => BracketCtx> = [
  (rng, name) => {
    const n = rng.int(3, 6);
    const fee = rng.int(2, 6);
    const t = rng.int(12, 30);
    const c = n * (t + fee);
    const what = rng.pick(['hockey game', 'concert', 'movie', 'water park']);
    return {
      text: `${name} buys $${n}$ tickets for a ${what}. Each ticket costs $t$ dollars plus a ${dollars(fee)} service fee. The total is ${dollars(c)}. Solve $${bracket(n, fee, 't')} = ${c}$ to find the price of one ticket before the fee.`,
      eq: `${bracket(n, fee, 't')} = ${c}`, x: t, a: n, b: fee, c, v: 't',
      part: numPart(t, { label: '$t =$ \\$' }),
      say: `One ticket costs ${dollars(t)} before the fee.`,
    };
  },
  (rng) => {
    const k = rng.int(2, 6);
    const x = rng.int(3, 12);
    const P = 4 * (x + k);
    return {
      text: `Each side of a square garden is $(s + ${k})$ m long. The perimeter of the garden is $${P}$ m. Solve $4(s + ${k}) = ${P}$ to find $s$.`,
      eq: `4(s + ${k}) = ${P}`, x, a: 4, b: k, c: P, v: 's',
      part: numPart(x, { label: '$s =$', suffix: 'm' }),
      say: `$s = ${x}$ m, so each side is $${x + k}$ m long.`,
    };
  },
  (rng) => {
    const k = rng.int(1, 4);
    const x = rng.int(k + 3, 14);
    const P = 3 * (x - k);
    return {
      text: `Each side of a triangular flower bed with three equal sides is $(s - ${k})$ m long. Its perimeter is $${P}$ m. Solve $3(s - ${k}) = ${P}$ to find $s$.`,
      eq: `3(s - ${k}) = ${P}`, x, a: 3, b: -k, c: P, v: 's',
      part: numPart(x, { label: '$s =$', suffix: 'm' }),
      say: `$s = ${x}$ m, so each side is $${x - k}$ m long.`,
    };
  },
  (rng, name) => {
    const n = rng.int(5, 12);
    const extra = rng.int(3, 8);
    const j = 5 * rng.int(5, 12);
    const c = n * (j + extra);
    return {
      text: `${name}’s coach orders $${n}$ hockey jerseys. Each jersey costs $j$ dollars plus ${dollars(extra)} to print a name on it. The order costs ${dollars(c)}. Solve $${bracket(n, extra, 'j')} = ${c}$ to find the price of one jersey without the name.`,
      eq: `${bracket(n, extra, 'j')} = ${c}`, x: j, a: n, b: extra, c, v: 'j',
      part: numPart(j, { label: '$j =$ \\$' }),
      say: `One jersey costs ${dollars(j)} without the name.`,
    };
  },
  (rng) => {
    const a = rng.int(2, 6);
    const b = rng.nonZero(-6, 8);
    const x = retry(() => rng.nonZero(-12, 6), (k) => k < 0 && k + b !== 0);
    const c = a * (x + b);
    const word = ['', '', 'two', 'three', 'four', 'five', 'six'][a];
    return {
      text: `${word.replace(/^./, (m) => m.toUpperCase())} times the sum of a number and $${b}$ is $${c}$. Let $n$ be the number. Solve $${bracket(a, b, 'n')} = ${c}$.`.replace('Two times', 'Twice'),
      eq: `${bracket(a, b, 'n')} = ${c}`, x, a, b, c, v: 'n',
      part: xPart(x, 'n'),
      say: `The number is $${x}$.`,
    };
  },
];

function distributive(rng: Rng, d: Difficulty): Out {
  if (d === 3) {
    if (rng.chance(0.5)) {
      const k = rng.pick(BRACKET_CTX)(rng, rng.pick(NAMES));
      return {
        prompt: k.text,
        parts: [k.part],
        hints: [
          `You can divide both sides by $${k.a}$ first, or distribute $${k.a}$ over the brackets first.`,
          `Dividing first: $${k.v}${plus(k.b)} = ${k.c} \\div ${k.a}$. Then undo the ${k.b > 0 ? 'adding' : 'subtracting'}.`,
        ],
        solution: [...divideFirstSteps(k.a, k.b, k.c, k.v), checkBracket(k.a, k.b, k.x).replace(/^Check: \$/, `Check in the equation: $`), k.say],
      };
    }
    // Error analysis.
    const v = rng.pick(['x', 'x', 'n', 'm']);
    const a = rng.pick([-5, -4, -3, -2, 2, 3, 4, 5, 6]);
    const b = rng.nonZero(-7, 7);
    const x = rng.nonZero(-8, 8);
    const c = a * (x + b);
    const name = rng.pick(NAMES);
    const m = bracketMistake(rng, a, b, c, v);
    const labels = ['Step 1', 'Step 2', 'Step 3', 'There is no mistake.'];
    return {
      prompt: `${name} solved $${bracket(a, b, v)} = ${c}$ like this:\n\n${m.steps.map((s, i) => `Step ${i + 1}: ${s}`).join('\n\n')}\n\n(a) In which step did ${name} make the first mistake?\n\n(b) Solve the equation correctly.`,
      parts: [part(fixedChoice(labels, m.wrongStep - 1), { label: '(a)' }), numPart(x, { label: `(b) $${v} =$` })],
      hints: [
        'Check each step. When you distribute, every term in the brackets is multiplied. When you move a number, use the inverse operation.',
        `Solve it yourself, then compare your steps with ${name}’s. You can check any answer by substituting it.`,
      ],
      solution: [
        m.why,
        ...distributeSteps(a, b, c, v),
        checkBracket(a, b, x),
        `(a) Step ${m.wrongStep} (b) $${v} = ${x}$`,
      ],
    };
  }
  const v = d === 1 ? 'x' : rng.pick(['x', 'x', ...LETTERS]);
  const a = d === 1 ? rng.int(2, 6) : rng.pick([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6]);
  const b = d === 1 ? rng.int(1, 8) : rng.nonZero(-9, 9);
  const x = d === 1 ? rng.int(1, 10) : retry(() => rng.nonZero(-10, 10), (k) => k + b !== 0);
  const c = a * (x + b);
  const distribute = d === 2 && rng.chance(0.6);
  return {
    prompt: `Solve $${bracket(a, b, v)} = ${c}$.`,
    parts: [xPart(x, v)],
    hints: distribute
      ? ['Use the distributive property: multiply each term in the brackets by the number outside.', `$${bracket(a, b, v)} = ${term(a, v)}${plus(a * b)}$. Then solve the two-step equation.`]
      : [`The brackets are multiplied by $${a}$. You can undo that first.`, `Divide both sides by $${a}$, then undo the ${b > 0 ? 'adding' : 'subtracting'}.`],
    solution: [...(distribute ? distributeSteps(a, b, c, v) : divideFirstSteps(a, b, c, v)), checkBracket(a, b, x), `$${v} = ${x}$`],
  };
}

// ---------------------------------------------------------------------------
// 7.4 Problems: write the equation, then solve it
// ---------------------------------------------------------------------------

interface Problem {
  text: string;
  /** The right equation, then wrong ones from real mistakes (LaTeX, no $). */
  eqs: string[];
  steps: string[];
  check: string;
  x: number;
  part: Part;
  say: string;
}

const PROBLEMS: Record<Difficulty, Array<(rng: Rng, name: string) => Problem>> = {
  1: [
    (rng, name) => {
      const w = rng.int(4, 9);
      const s = rng.int(6, 20);
      const what = rng.pick(['a new skateboard', 'a pair of skates', 'a video game', 'a camping trip']);
      return {
        text: `${name} saves the same amount each week for ${what}. After $${w}$ weeks, ${name} has saved ${dollars(w * s)}. Let $s$ be the amount saved each week, in dollars.`,
        eqs: [`${w}s = ${w * s}`, `${over('s', w)} = ${w * s}`, `s + ${w} = ${w * s}`, `${w * s}s = ${w}`],
        steps: solveMul(w, w * s, 's'),
        check: `$${w} \\times ${s} = ${w * s}$`,
        x: s,
        part: numPart(s, { label: '$s =$ \\$' }),
        say: `${name} saves ${dollars(s)} each week.`,
      };
    },
    (rng, name) => {
      const n = rng.int(3, 6);
      const each = rng.int(5, 14);
      return {
        text: `${name} and friends split the cost of a pizza order equally among $${n}$ people. Each person pays ${dollars(each)}. Let $p$ be the total cost of the order, in dollars.`,
        eqs: [`${over('p', n)} = ${each}`, `${n}p = ${each}`, `p - ${n} = ${each}`, `\\dfrac{${n}}{p} = ${each}`],
        steps: solveDiv(n, each, 'p'),
        check: `$${n * each} \\div ${n} = ${each}$`,
        x: n * each,
        part: numPart(n * each, { label: '$p =$ \\$' }),
        say: `The pizza order cost ${dollars(n * each)}.`,
      };
    },
    (rng) => {
      const h = rng.int(3, 7);
      const r = -rng.int(2, 5);
      const town = rng.pick(TOWNS);
      return {
        text: `In ${town}, the temperature dropped by the same amount every hour for $${h}$ hours. The total change was $${h * r}^\\circ\\text{C}$. Let $c$ be the change each hour, in degrees Celsius.`,
        eqs: [`${h}c = ${h * r}`, `${over('c', h)} = ${h * r}`, `c + ${h} = ${h * r}`, `${h * r}c = ${h}`],
        steps: solveMul(h, h * r, 'c'),
        check: `$${h}(${r}) = ${h * r}$`,
        x: r,
        part: numPart(r, { label: '$c =$', suffix: '°C' }),
        say: `The temperature changed by $${r}^\\circ\\text{C}$ each hour.`,
      };
    },
    (rng, name) => {
      const n = rng.int(4, 8);
      const per = rng.int(6, 12);
      return {
        text: `${name} packs muffins for a bake sale, with the same number in each box. $${n * per}$ muffins fill $${n}$ boxes. Let $m$ be the number of muffins in one box.`,
        eqs: [`${n}m = ${n * per}`, `${over('m', n)} = ${n * per}`, `m - ${n} = ${n * per}`, `m + ${n} = ${n * per}`],
        steps: solveMul(n, n * per, 'm'),
        check: `$${n} \\times ${per} = ${n * per}$`,
        x: per,
        part: numPart(per, { label: '$m =$', suffix: 'muffins' }),
        say: `Each box holds $${per}$ muffins.`,
      };
    },
  ],
  2: [
    (rng, name) => {
      const start = rng.int(3, 6);
      const r = rng.int(2, 3);
      const d = rng.int(4, 15);
      const F = r * d + start;
      const town = rng.pick(TOWNS);
      return {
        text: `A taxi in ${town} charges ${dollars(start)} to start plus ${dollars(r)} for each kilometre. ${name}’s fare was ${dollars(F)}. Let $d$ be the distance in kilometres.`,
        eqs: [`${r}d + ${start} = ${F}`, `${start}d + ${r} = ${F}`, `${r}d - ${start} = ${F}`, `${r}(d + ${start}) = ${F}`],
        steps: [...undoAdd(`${r}d`, start, F).steps, ...solveMul(r, F - start, 'd')],
        check: `$${r}(${d}) + ${start} = ${r * d} + ${start} = ${F}$`,
        x: d,
        part: numPart(d, { label: '$d =$', suffix: 'km' }),
        say: `The ride was $${d}$ km long.`,
      };
    },
    (rng, name) => {
      const fee = rng.pick([15, 20, 25, 30]);
      const r = rng.pick([5, 10]);
      const g = rng.int(2, 8);
      const C = r * g + fee;
      return {
        text: `${name}’s phone plan costs ${dollars(fee)} a month plus ${dollars(r)} for each GB of data. Last month the bill was ${dollars(C)}. Let $g$ be the number of GB used.`,
        eqs: [`${r}g + ${fee} = ${C}`, `${fee}g + ${r} = ${C}`, `${r}g - ${fee} = ${C}`, `${r + fee}g = ${C}`],
        steps: [...undoAdd(`${r}g`, fee, C).steps, ...solveMul(r, C - fee, 'g')],
        check: `$${r}(${g}) + ${fee} = ${r * g} + ${fee} = ${C}$`,
        x: g,
        part: numPart(g, { label: '$g =$', suffix: 'GB' }),
        say: `${name} used $${g}$ GB of data.`,
      };
    },
    (rng) => {
      const T0 = -rng.int(8, 16);
      const r = rng.int(2, 4);
      const h = rng.int(3, 8);
      const T = T0 + r * h;
      const town = rng.pick(TOWNS);
      return {
        text: `At sunrise in ${town} it was $${T0}^\\circ\\text{C}$. The temperature rose $${r}^\\circ\\text{C}$ each hour until it reached $${T}^\\circ\\text{C}$. Let $h$ be the number of hours.`,
        eqs: [`${r}h - ${-T0} = ${T}`, `${r}h + ${-T0} = ${T}`, `${T0}h + ${r} = ${T}`, `${r}(h - ${-T0}) = ${T}`],
        steps: [...undoAdd(`${r}h`, T0, T).steps, ...solveMul(r, T - T0, 'h')],
        check: `$${r}(${h}) - ${-T0} = ${r * h} - ${-T0} = ${T}$`,
        x: h,
        part: numPart(h, { label: '$h =$', suffix: 'h' }),
        say: `It took $${h}$ hours.`,
      };
    },
    (rng, name) => {
      const n = rng.int(3, 5);
      const drink = rng.int(2, 4);
      const each = rng.int(8, 15);
      const p = n * (each - drink);
      return {
        text: `${name} and friends, $${n}$ people in all, share the cost of a pizza equally. Each person also pays ${dollars(drink)} for a drink. Each person pays ${dollars(each)} in total. Let $p$ be the cost of the pizza, in dollars.`,
        eqs: [`${over('p', n)} + ${drink} = ${each}`, `${n}p + ${drink} = ${each}`, `${over('p', n)} - ${drink} = ${each}`, `${over(`p + ${drink}`, n)} = ${each}`],
        steps: [...undoAdd(over('p', n), drink, each).steps, ...solveDiv(n, each - drink, 'p')],
        check: `$${p} \\div ${n} + ${drink} = ${p / n} + ${drink} = ${each}$`,
        x: p,
        part: numPart(p, { label: '$p =$ \\$' }),
        say: `The pizza cost ${dollars(p)}.`,
      };
    },
  ],
  3: [
    (rng) => {
      const depth = -rng.pick([20, 30, 40, 50]);
      const m = rng.int(3, 8);
      const r = -rng.int(2, 9);
      const E = depth + r * m;
      return {
        text: `A research submarine is at an elevation of $${depth}$ m (below sea level). It changes its elevation by the same amount every minute. After $${m}$ minutes it is at $${E}$ m. Let $r$ be the change in elevation each minute, in metres.`,
        eqs: [`${m}r - ${-depth} = ${E}`, `${m}r + ${-depth} = ${E}`, `${depth}r + ${m} = ${E}`, `${m}(r - ${-depth}) = ${E}`],
        steps: [...undoAdd(`${m}r`, depth, E).steps, ...solveMul(m, E - depth, 'r')],
        check: `$${m}(${r}) - ${-depth} = ${m * r} - ${-depth} = ${E}$`,
        x: r,
        part: numPart(r, { label: '$r =$', suffix: 'm' }),
        say: `The submarine changes elevation by $${r}$ m each minute (it goes down $${-r}$ m a minute).`,
      };
    },
    (rng, name) => {
      const n = rng.int(3, 6);
      const fee = rng.int(2, 5);
      const t = rng.int(10, 25);
      const c = n * (t + fee);
      return {
        text: `${name} buys $${n}$ tickets to a hockey game. Each ticket costs $t$ dollars plus a ${dollars(fee)} service fee. The total is ${dollars(c)}. Let $t$ be the price of one ticket before the fee.`,
        eqs: [`${n}(t + ${fee}) = ${c}`, `${n}t + ${fee} = ${c}`, `${fee}(t + ${n}) = ${c}`, `${n}(t - ${fee}) = ${c}`],
        steps: divideFirstSteps(n, fee, c, 't'),
        check: `$${n}(${t} + ${fee}) = ${n}(${t + fee}) = ${c}$`,
        x: t,
        part: numPart(t, { label: '$t =$ \\$' }),
        say: `One ticket costs ${dollars(t)} before the fee.`,
      };
    },
    (rng) => {
      const k = rng.int(2, 6);
      const s = rng.int(3, 12);
      const P = 4 * (s + k);
      return {
        text: `A square patio has sides that are $${k}$ m longer than the sides of a square sandbox. The perimeter of the patio is $${P}$ m. Let $s$ be the side length of the sandbox, in metres.`,
        eqs: [`4(s + ${k}) = ${P}`, `4s + ${k} = ${P}`, `${k}(s + 4) = ${P}`, `4(s - ${k}) = ${P}`],
        steps: divideFirstSteps(4, k, P, 's'),
        check: `$4(${s} + ${k}) = 4(${s + k}) = ${P}$`,
        x: s,
        part: numPart(s, { label: '$s =$', suffix: 'm' }),
        say: `The sandbox sides are $${s}$ m long.`,
      };
    },
    (rng, name) => {
      const n = rng.int(3, 6);
      const extra = rng.int(2, 5);
      const per = rng.int(4, 10);
      const total = n * (per + extra);
      return {
        text: `${name} is packing snack bags for a school trip. Each of the $${n}$ bags gets $c$ crackers and $${extra}$ cookies. ${name} uses $${total}$ snacks in all. Let $c$ be the number of crackers in each bag.`,
        eqs: [`${n}(c + ${extra}) = ${total}`, `${n}c + ${extra} = ${total}`, `${extra}(c + ${n}) = ${total}`, `${over('c', n)} + ${extra} = ${total}`],
        steps: divideFirstSteps(n, extra, total, 'c'),
        check: `$${n}(${per} + ${extra}) = ${n}(${per + extra}) = ${total}$`,
        x: per,
        part: numPart(per, { label: '$c =$', suffix: 'crackers' }),
        say: `Each bag has $${per}$ crackers.`,
      };
    },
    (rng, name) => {
      const T0 = rng.int(2, 8);
      const h = rng.int(3, 7);
      const r = -rng.int(2, 4);
      const T = T0 + r * h;
      const town = rng.pick(TOWNS);
      return {
        text: `At 4 p.m. in ${town} it was $${T0}^\\circ\\text{C}$. ${name} noticed that the temperature fell by the same amount each hour. After $${h}$ hours it was $${T}^\\circ\\text{C}$. Let $c$ be the change in temperature each hour.`,
        eqs: [`${h}c + ${T0} = ${T}`, `${T0}c + ${h} = ${T}`, `${h}c - ${T0} = ${T}`, `${h}(c + ${T0}) = ${T}`],
        steps: [...undoAdd(`${h}c`, T0, T).steps, ...solveMul(h, T - T0, 'c')],
        check: `$${h}(${r}) + ${T0} = ${h * r} + ${T0} = ${T}$`,
        x: r,
        part: numPart(r, { label: '$c =$', suffix: '°C' }),
        say: `The temperature changed by $${r}^\\circ\\text{C}$ each hour.`,
      };
    },
  ],
};

function problems(rng: Rng, d: Difficulty): Out {
  const p = rng.pick(PROBLEMS[d])(rng, rng.pick(NAMES));
  const [right, ...wrong] = p.eqs.map((e) => `$${e}$`);
  return {
    prompt: `${p.text}\n\n(a) Which equation models the problem?\n\n(b) Solve the equation.`,
    parts: [part(mc(rng, right, wrong), { label: '(a)' }), { ...p.part, label: `(b) ${p.part.label ?? ''}` }],
    hints: [
      d === 1
        ? 'Say the problem in words first, such as “number of groups times the amount in each group equals the total”. Then turn each phrase into maths.'
        : 'Say the problem in words first, such as “start amount plus rate times the unknown equals the total”. Then turn each phrase into maths.',
      d === 1 ? 'Undo the multiplying or dividing with the inverse operation.' : 'Undo the operations in reverse order: adding or subtracting first, then multiplying or dividing.',
    ],
    solution: [`(a) The equation is ${right}.`, ...p.steps, `Check in the problem: ${p.check}. ${works}`, `(b) ${p.say}`],
  };
}

// ---------------------------------------------------------------------------
// Skill definitions
// ---------------------------------------------------------------------------

export const EQUATIONS_SKILLS: SkillDef[] = [
  skill({
    id: 'm8-equation-one-step',
    name: 'One-step equations',
    description: 'Solve equations of the form ax = b and x/a = b with integers, and check by substitution.',
    outcomes: ['PR2'],
    lessonId: 'm8-7-1',
    gen: oneStep,
  }),
  skill({
    id: 'm8-equation-two-step',
    name: 'Two-step equations',
    description: 'Solve equations of the form ax + b = c and x/a + b = c with integers, and check by substitution.',
    outcomes: ['PR2'],
    lessonId: 'm8-7-2',
    gen: twoStep,
  }),
  skill({
    id: 'm8-equation-distributive',
    name: 'Equations with brackets',
    description: 'Solve equations of the form a(x + b) = c by dividing first or by distributing, and find mistakes in a solution.',
    outcomes: ['PR2'],
    lessonId: 'm8-7-3',
    gen: distributive,
  }),
  skill({
    id: 'm8-equation-problems',
    name: 'Solving problems with equations',
    description: 'Choose the linear equation that models a problem, solve it, and check the answer in the problem.',
    outcomes: ['PR2'],
    lessonId: 'm8-7-4',
    gen: problems,
  }),
];
