/** More Mathematics Topics, Unit 8 (part 1): quadratic sequences, sign changes and iteration. */
import { fixedChoice, mc, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, polyString, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { sp } from './common.ts';

type Out = GenOutput;

const list = (vs: number[]) => vs.map((v) => fmt(v)).join(',\\ \\ ');
const quad = (a: number, b: number, c: number) => polyString([[a, 'n^2'], [b, 'n'], [c, '']]);
const termOf = (a: number, b: number, c: number, n: number) => a * n * n + b * n + c;

// ---------------------------------------------------------------------------
// 8.1 Quadratic sequences
// ---------------------------------------------------------------------------

function coefficients(rng: Rng, d: Difficulty): [number, number, number] {
  const a = d === 1 ? 1 : d === 2 ? rng.pick([1, 2, 3, -1]) : rng.pick([2, 3, -2, 4, -3]);
  const b = rng.int(d === 1 ? -4 : -8, d === 1 ? 5 : 8);
  const c = rng.int(d === 1 ? -5 : -10, d === 1 ? 6 : 12);
  return [a, b, c];
}

/** Worked steps for the nth term of a quadratic sequence from its first five terms. */
function nthTermSteps(a: number, b: number, c: number): string[] {
  const ts = [1, 2, 3, 4, 5].map((n) => termOf(a, b, c, n));
  const d1 = ts.slice(1).map((t, i) => t - ts[i]!);
  const d2 = d1.slice(1).map((t, i) => t - d1[i]!);
  const sq = [1, 2, 3, 4, 5].map((n) => a * n * n);
  const rest = ts.map((t, i) => t - sq[i]!);
  const lin = polyString([[b, 'n'], [c, '']]);
  return [
    `First differences: $${list(d1)}$. Second differences: $${list(d2)}$.`,
    `The second difference is $${d2[0]}$, so the $n^2$ term is $\\frac{${d2[0]}}{2}n^2 = ${polyString([[a, 'n^2']])}$.`,
    `Subtract $${polyString([[a, 'n^2']])}$ from each term: $${list(ts)}$ minus $${list(sq)}$ leaves $${list(rest)}$.`,
    b === 0 ? `What is left is the constant $${c}$.` : `What is left is a linear sequence that goes ${b > 0 ? 'up' : 'down'} by $${Math.abs(b)}$ each time, so its $n$th term is $${lin}$.`,
    `The $n$th term is $${quad(a, b, c)}$.`,
  ];
}

function quadraticNthTerm(rng: Rng, d: Difficulty): Out {
  const [a, b, c] = coefficients(rng, d);
  const ts = [1, 2, 3, 4, 5].map((n) => termOf(a, b, c, n));
  return {
    prompt: `Find an expression for the $n$th term of this quadratic sequence.\n\n$$${list(ts)},\\ \\ \\ldots$$`,
    parts: [part({ kind: 'expression', expected: quad(a, b, c), form: 'expanded' }, { label: '$n$th term $=$', placeholder: 'e.g. 2n^2 + 3n - 1' })],
    hints: [
      'Find the first differences, then the differences between them (the second differences). In a quadratic sequence the second differences are all the same.',
      'The number in front of $n^2$ is half the second difference. Subtract that many $n^2$ from each term, and find the $n$th term of the linear sequence that is left.',
    ],
    solution: nthTermSteps(a, b, c),
  };
}

function quadraticTerm(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const [a, b, c] = coefficients(rng, 2);
    const ts = [1, 2, 3, 4, 5].map((n) => termOf(a, b, c, n));
    const d1 = ts.slice(1).map((t, i) => t - ts[i]!);
    const d2 = 2 * a;
    const next = ts[4]! + d1[3]! + d2;
    return {
      prompt: `Find the next term of this quadratic sequence.\n\n$$${list(ts)},\\ \\ \\ldots$$`,
      parts: [numPart(next)],
      hints: ['Find the first differences, and the second differences between them.', 'The second differences stay the same, so the next first difference is the last one plus the second difference.'],
      solution: [
        `First differences: $${list(d1)}$. The second difference is $${d2}$.`,
        `The next first difference is $${d1[3]} + ${sp(d2)} = ${d1[3]! + d2}$.`,
        `The next term is $${ts[4]} + ${sp(d1[3]! + d2)} = ${next}$.`,
      ],
    };
  }
  if (d === 2) {
    const [a, b, c] = coefficients(rng, 2);
    const k1 = rng.int(6, 12);
    const k2 = rng.int(15, 30);
    const t1 = termOf(a, b, c, k1);
    const t2 = termOf(a, b, c, k2);
    return {
      prompt: `The $n$th term of a sequence is $${quad(a, b, c)}$. Find the ${k1}th term and the ${k2}th term.`,
      parts: [numPart(t1, { label: `${k1}th term:` }), numPart(t2, { label: `${k2}th term:` })],
      hints: ['Substitute the term number for $n$.', 'Square $n$ first, then multiply and add.'],
      solution: [
        `$n = ${k1}$: $${fmt(a)} \\times ${k1}^2 ${b < 0 ? '-' : '+'} ${Math.abs(b)} \\times ${k1} ${c < 0 ? '-' : '+'} ${Math.abs(c)} = ${t1}$`,
        `$n = ${k2}$: $${fmt(a)} \\times ${k2}^2 ${b < 0 ? '-' : '+'} ${Math.abs(b)} \\times ${k2} ${c < 0 ? '-' : '+'} ${Math.abs(c)} = ${t2}$`,
      ],
    };
  }
  // Which term has a given value? n² + bn + c = V, with a positive whole-number solution.
  const [n, b, c] = retry(() => [rng.int(6, 20), rng.int(-6, 9), rng.int(-10, 10)] as const, ([n, b]) => b !== 0 && 2 * n + b > 1 && b + n !== 0, 100);
  const v = termOf(1, b, c, n);
  // The other root of n² + bn + (c − V) = 0 is −b − n, which is negative (n ≥ 6, b ≤ 9, and it is not 0).
  const other = -b - n;
  return {
    prompt: `The $n$th term of a sequence is $${quad(1, b, c)}$. Which term of the sequence is $${v}$?`,
    parts: [numPart(n, { label: '$n$ =' })],
    hints: [`Set the $n$th term equal to $${v}$ and rearrange to $= 0$.`, 'Solve the quadratic equation by factorizing. The term number must be a positive whole number.'],
    solution: [
      `$${quad(1, b, c)} = ${v}$, so $${quad(1, b, c - v)} = 0$.`,
      `Factorize: $(n - ${n})(n ${other < 0 ? '+' : '-'} ${Math.abs(other)}) = 0$, so $n = ${n}$ or $n = ${other}$.`,
      `A term number must be positive, so $${v}$ is the ${n}th term.`,
    ],
  };
}

// ---------------------------------------------------------------------------
// 8.2 Iteration
// ---------------------------------------------------------------------------

interface Iter {
  /** The equation, = 0 form. */
  eq: string;
  /** The iteration formula's right-hand side, with x_n. */
  g: string;
  f: (x: number) => number;
  step: (x: number) => number;
  /** How to rearrange the equation into x = g(x). */
  rearrange: string[];
  /** Wrong rearrangements, for the multiple-choice question. */
  wrong: string[];
}

/** x³ + qx − p = 0 and its rearrangements. */
function cubicIter(rng: Rng): Iter {
  const kind = rng.int(0, 2);
  const p = rng.int(5, 25);
  const q = rng.int(1, 6);
  const qx = q === 1 ? 'x' : `${q}x`;
  if (kind === 0) {
    return {
      eq: `x^3 + ${qx} - ${p} = 0`,
      g: `\\sqrt[3]{${p} - ${q === 1 ? '' : q}x_n}`,
      f: (x) => x ** 3 + q * x - p,
      step: (x) => Math.cbrt(p - q * x),
      rearrange: [`$x^3 = ${p} - ${q === 1 ? '' : q}x$`, `$x = \\sqrt[3]{${p} - ${q === 1 ? '' : q}x}$`],
      wrong: [`x = \\sqrt[3]{${p} + ${q === 1 ? '' : q}x}`, `x = \\sqrt{${p} - ${q === 1 ? '' : q}x}`, `x = \\sqrt[3]{${q === 1 ? '' : q}x - ${p}}`],
    };
  }
  if (kind === 1) {
    return {
      eq: `x^3 + ${qx} - ${p} = 0`,
      g: `\\frac{${p}}{x_n^2 + ${q}}`,
      f: (x) => x ** 3 + q * x - p,
      step: (x) => p / (x * x + q),
      rearrange: [`$x(x^2 + ${q}) = ${p}$`, `$x = \\frac{${p}}{x^2 + ${q}}$`],
      wrong: [`x = \\frac{${p}}{x^2 - ${q}}`, `x = \\frac{${p} - x^2}{${q}}`, `x = \\frac{${q}}{x^2 + ${p}}`],
    };
  }
  // x³ − qx − p = 0  →  x = ∛(qx + p)
  return {
    eq: `x^3 - ${qx} - ${p} = 0`,
    g: `\\sqrt[3]{${q === 1 ? '' : q}x_n + ${p}}`,
    f: (x) => x ** 3 - q * x - p,
    step: (x) => Math.cbrt(q * x + p),
    rearrange: [`$x^3 = ${q === 1 ? '' : q}x + ${p}$`, `$x = \\sqrt[3]{${q === 1 ? '' : q}x + ${p}}$`],
    wrong: [`x = \\sqrt[3]{${q === 1 ? '' : q}x - ${p}}`, `x = \\sqrt{${q === 1 ? '' : q}x + ${p}}`, `x = \\sqrt[3]{${p} - ${q === 1 ? '' : q}x}`],
  };
}

/** An iteration that settles quickly, with x₀ a whole number or a half next to the root. */
function settled(rng: Rng): { it: Iter; x0: number; xs: number[]; root: number } {
  return retry(
    () => {
      const it = cubicIter(rng);
      let x = 2;
      for (let i = 0; i < 200; i++) x = it.step(x);
      const root = x;
      const x0 = rng.chance(0.5) ? Math.round(root) : Math.round(root * 2) / 2;
      const xs = [x0];
      for (let i = 0; i < 40; i++) xs.push(it.step(xs[i]!));
      return { it, x0, xs, root };
    },
    ({ it, xs, root, x0 }) =>
      Number.isFinite(root) && root > 1.05 && Math.abs(it.f(root)) < 1e-6 && Math.abs(xs[6]! - root) < 5e-4 && Math.abs(x0 - root) > 0.02 && Math.abs(roundTo(root, 2) - root) < 0.004,
    300,
  );
}

function iteration(rng: Rng, d: Difficulty): Out {
  const { it, x0, xs, root } = settled(rng);
  const val = (i: number) => (i === 0 ? fmt(x0) : `${fmt(xs[i]!, 6)}\\ldots`);
  const show = (i: number) => `x_{${i}} = ${it.g.replace(/x_n/g, `(${val(i - 1)})`)} = ${val(i)}`;
  const intro = `Use the iteration formula $x_{n+1} = ${it.g}$ with $x_0 = ${fmt(x0)}$`;
  if (d === 1) {
    return {
      prompt: `${intro} to find $x_1$ and $x_2$, each to 3 decimal places.`,
      parts: [numPart(xs[1]!, { decimals: 3, label: '$x_1$ =' }), numPart(xs[2]!, { decimals: 3, label: '$x_2$ =' })],
      hints: ['Put $x_0$ into the formula to get $x_1$, then put $x_1$ in to get $x_2$.', 'Keep every digit on your calculator for the next step (use the ANS key); round only the answers you write down.'],
      solution: [`$${show(1)}$`, `$${show(2)}$`, `So $x_1 = ${fmtFixed(xs[1]!, 3)}$ and $x_2 = ${fmtFixed(xs[2]!, 3)}$ to 3 decimal places.`],
      calculator: true,
    };
  }
  if (d === 2) {
    return {
      prompt: `${intro} to find $x_3$, to 4 decimal places.`,
      parts: [numPart(xs[3]!, { decimals: 4, label: '$x_3$ =' })],
      hints: ['Find $x_1$, then $x_2$, then $x_3$, each time putting the last value into the formula.', 'Keep every digit (use the ANS key); round only at the end.'],
      solution: [`$${show(1)}$`, `$${show(2)}$`, `$${show(3)}$`, `$x_3 = ${fmtFixed(xs[3]!, 4)}$ to 4 decimal places.`],
      calculator: true,
    };
  }
  const k = xs.findIndex((x, i) => i > 0 && roundTo(x, 2) === roundTo(xs[i - 1]!, 2) && roundTo(x, 2) === roundTo(root, 2));
  return {
    prompt: `The equation $${it.eq}$ has a solution near $x = ${fmt(x0)}$. ${intro} to find this solution to 2 decimal places.`,
    parts: [numPart(root, { decimals: 2, label: '$x$ =' })],
    hints: ['Keep using the formula, putting each answer back in, until two answers in a row round to the same value.', 'Keep every digit on your calculator (use the ANS key).'],
    solution: [
      ...xs.slice(1, Math.max(4, k + 1)).map((x, i) => `$x_{${i + 1}} = ${fmt(x, 6)}\\ldots$`),
      `$x_{${Math.max(3, k) - 1}}$ and $x_{${Math.max(3, k)}}$ both round to $${fmtFixed(root, 2)}$, so the solution is $x = ${fmtFixed(root, 2)}$ to 2 decimal places.`,
    ],
    calculator: true,
  };
}

function signChange(rng: Rng, d: Difficulty): Out {
  const { it, root } = settled(rng);
  if (d === 3) {
    const [, correct] = it.rearrange;
    return {
      prompt: `Which of these is a rearrangement of $${it.eq}$?`,
      parts: [{ answer: mc(rng, correct!, it.wrong.map((w) => `$${w}$`)) }],
      hints: ['Move the terms so that one side is $x^3$ (or $x$ times a bracket), then undo the power or the multiplication.', 'Check each choice by working backwards to the original equation.'],
      solution: [`Start from $${it.eq}$.`, it.rearrange[0]!, `So ${correct}, which is the iteration formula without the $n$.`],
    };
  }
  const a = Math.floor(root);
  const lo = d === 1 ? a : roundTo(Math.floor(root * 10) / 10, 1);
  const hi = d === 1 ? a + 1 : roundTo(lo + 0.1, 1);
  // Half the time, ask about an interval that misses the root (no sign change).
  const miss = d === 2 && rng.chance(0.35);
  const [p, q] = miss ? (rng.chance(0.5) ? [roundTo(hi, 1), roundTo(hi + 0.1, 1)] : [roundTo(lo - 0.1, 1), lo]) : [lo, hi];
  const fp = it.f(p);
  const fq = it.f(q);
  const yes = fp * fq < 0;
  const r3 = (x: number) => roundTo(x, 3);
  return {
    prompt: `$f(x) = ${it.eq.replace(' = 0', '')}$. Find $f(${fmt(p)})$ and $f(${fmt(q)})$, to 3 decimal places where needed. Does the equation $${it.eq}$ have a solution between $x = ${fmt(p)}$ and $x = ${fmt(q)}$?`,
    parts: [numPart(r3(fp), { decimals: 3, label: `$f(${fmt(p)})$ =` }), numPart(r3(fq), { decimals: 3, label: `$f(${fmt(q)})$ =` }), { answer: fixedChoice(['Yes, the sign changes', 'No, the sign does not change'], yes ? 0 : 1) }],
    hints: ['Substitute each value of $x$ into $f(x)$.', 'If one value is negative and the other positive, the graph crosses the $x$-axis in between (the function is continuous), so there is a solution there.'],
    solution: [
      `$f(${fmt(p)}) = ${fmt(fp, 3)}$ and $f(${fmt(q)}) = ${fmt(fq, 3)}$.`,
      yes ? 'One is negative and the other positive, so the sign changes: there is a solution between them.' : `Both have the same sign, so the sign does not change. The solution near $x = ${fmt(root, 2)}$ is not between them.`,
    ],
    calculator: true,
  };
}

export const SEQUENCE_SKILLS: SkillDef[] = [
  skill({ id: 'mx-quadratic-nth-term', name: 'The nth term of a quadratic sequence', description: 'Find the nth term of a quadratic sequence from its second differences', outcomes: ['SG1'], lessonId: 'mx-8-1', gen: quadraticNthTerm }),
  skill({ id: 'mx-quadratic-sequence-term', name: 'Terms of quadratic sequences', description: 'Continue a quadratic sequence, find a term from the nth term, and find which term has a given value', outcomes: ['SG1'], lessonId: 'mx-8-1', gen: quadraticTerm }),
  skill({ id: 'mx-sign-change', name: 'Sign changes and rearranging', description: 'Show that an equation has a solution between two values, and rearrange it for iteration', outcomes: ['SG2'], lessonId: 'mx-8-2', calculator: true, gen: signChange }),
  skill({ id: 'mx-iteration', name: 'Solving equations by iteration', description: 'Use an iteration formula to find terms and a solution to a given accuracy', outcomes: ['SG2'], lessonId: 'mx-8-2', calculator: true, gen: iteration }),
];
