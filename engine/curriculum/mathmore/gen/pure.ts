/**
 * More Mathematics Topics, Units 16 to 18: A level pure mathematics that Gradileo's grade courses do
 * not teach. Proof by exhaustion and by contradiction, the area of a triangle as ½ab sin C,
 * logarithmic graphs, partial fractions, sigma notation and recurrence relations, the binomial
 * expansion for any rational n, vectors in three dimensions, small-angle approximations, the
 * reciprocal and inverse trigonometric functions, and R sin(θ ± α).
 */
import { mc, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import {
  acosD, asinD, atanD, fmt, fmtFixed, frac, fracAdd, fracLatex, fracMul, fracValue, isPrime, polyString, roundTo, sinD, type Frac,
} from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { eq3, N as Ng, s3, SF_TEXT, sfPart } from './common.ts';

type Out = GenOutput;

/** A fraction answer, accepted as a fraction or a decimal and shown in lowest terms. */
const fracPart = (f: Frac, label?: string) => numPart(fracValue(f), { label, fraction: 'lowest' });
const F = (f: Frac) => fracLatex(f, { dfrac: true });
/** "(x - 3)" or "(x + 2)". */
const lin = (a: number) => (a === 0 ? 'x' : `(x ${a > 0 ? '-' : '+'} ${Math.abs(a)})`);
const d1 = (v: number) => fmtFixed(v, 1);
/** k times a letter: 6A, A, -A. */
const cf = (k: number, v: string) => (k === 1 ? v : k === -1 ? `-${v}` : `${k}${v}`);
/** (a + b) with a negative b written as a subtraction. */
const addTex = (a: number, b: number) => `${a} ${b < 0 ? '-' : '+'} ${Math.abs(b)}`;
const ANGLE_TEXT = 'Give angles to 1 decimal place.';

// ---------------------------------------------------------------------------
// 16.1 Proof by exhaustion
// ---------------------------------------------------------------------------

const PROOF_METHODS = [
  { name: 'Proof by exhaustion', how: 'Split the statement into a finite number of cases that cover every possibility, and prove each case in turn.' },
  { name: 'Disproof by counterexample', how: 'Find one example for which the statement is false.' },
  { name: 'Proof by deduction', how: 'Start from known facts and definitions, and reason step by step to the result.' },
  { name: 'Proof by contradiction', how: 'Assume the statement is false, and show that this leads to something impossible.' },
];

const CASE_STATEMENTS: Array<{ m: number; text: string }> = [
  { m: 2, text: '$n^2 + n$ is even for every integer $n$' },
  { m: 2, text: '$n^3 - n$ is even for every integer $n$' },
  { m: 2, text: 'the square of an integer is either a multiple of $4$ or one more than a multiple of $4$' },
  { m: 3, text: '$n^3 - n$ is a multiple of $3$ for every integer $n$' },
  { m: 3, text: 'every square number is a multiple of $3$ or one more than a multiple of $3$' },
  { m: 3, text: '$n^2 + 1$ is never a multiple of $3$' },
];

const casesTex = (m: number) => Array.from({ length: m }, (_, r) => `$n = ${m}k${r ? ` + ${r}` : ''}$`).join(', ');

function proofMethod(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const [m, ...rest] = rng.shuffle(PROOF_METHODS);
    return {
      prompt: `Which method of proof is this?\n\n> ${m!.how}`,
      parts: [part(mc(rng, m!.name, rest.map((r) => r.name)))],
      hints: ['Ask whether the argument checks cases, gives one example, reasons directly, or starts by assuming the opposite.', 'Only a counterexample can disprove a statement with a single example.'],
      solution: [`This is ${m!.name.toLowerCase()}.`],
    };
  }
  if (d === 2) {
    const s = rng.pick(CASE_STATEMENTS);
    const wrongMs = [2, 3, 4].filter((x) => x !== s.m);
    const choices = [
      ...wrongMs.map(casesTex),
      Array.from({ length: s.m - 1 }, (_, r) => `$n = ${s.m}k${r ? ` + ${r}` : ''}$`).join(', '),
    ];
    return {
      prompt: `A proof by exhaustion shows that ${s.text}. Which set of cases, for an integer $k$, covers every integer $n$ and is the natural one to use?`,
      parts: [part(mc(rng, casesTex(s.m), choices))],
      hints: ['The cases must cover every integer, with none left out.', s.m === 2 ? 'Even and odd numbers: $2k$ and $2k + 1$.' : `Think about the remainders when $n$ is divided by $${s.m}$.`],
      solution: [`Every integer leaves a remainder of ${Array.from({ length: s.m }, (_, r) => r).join(', ').replace(/, (\d)$/, ' or $1')} when divided by $${s.m}$, so the cases ${casesTex(s.m)} cover every integer.`],
    };
  }
  const p = rng.pick([3, 5, 11, 17, 41]);
  const plus = rng.chance(0.5);
  const answer = plus ? p - 1 : p;
  const others = rng.sample(Array.from({ length: answer - 1 }, (_, i) => i + 1), Math.min(3, answer - 1)).sort((x, y) => x - y);
  const f = (n: number) => n * n + (plus ? n : -n) + p;
  return {
    prompt: `Which of these values of $n$ is a counterexample to the statement “$n^2 ${plus ? '+' : '-'} n + ${p}$ is prime for every positive integer $n$”?`,
    parts: [part(mc(rng, `$n = ${answer}$`, others.map((n) => `$n = ${n}$`)))],
    hints: ['A counterexample is a value for which the statement is false: here, a value that gives a number that is not prime.', 'Work out the expression for each value and check whether it is prime.'],
    solution: [
      ...others.map((n) => `$n = ${n}$: $${f(n)}$, which is prime.`),
      `$n = ${answer}$: $${f(answer)} = ${p}^2$, which is not prime. So $n = ${answer}$ is a counterexample.`,
    ],
  };
}

const COUNTER: Array<{ text: string; answer: number; why: string }> = [
  { text: '$2^n - 1$ is prime for every prime number $n$', answer: 11, why: '$2^{11} - 1 = 2047 = 23 \\times 89$' },
  { text: '$n! + 1$ is prime for every positive integer $n$', answer: 4, why: '$4! + 1 = 25 = 5^2$' },
  { text: '$2^n + 1$ is prime for every positive integer $n$', answer: 3, why: '$2^3 + 1 = 9 = 3^2$' },
  { text: '$6n + 1$ is prime for every positive integer $n$', answer: 4, why: '$6 \\times 4 + 1 = 25 = 5^2$' },
];

function exhaustionCases(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const c = rng.pick([1, 2, 4, 6, 10]);
    const top = rng.int(6, 10);
    const ns = Array.from({ length: top }, (_, i) => i + 1);
    const primes = ns.filter((n) => isPrime(n * n + c));
    return {
      prompt: `Check every case: for how many of the values $n = 1, 2, \\ldots, ${top}$ is $n^2 + ${c}$ a prime number?`,
      parts: [numPart(primes.length)],
      hints: ['Work out $n^2 + ' + c + '$ for each value of $n$.', 'A prime has exactly two factors, $1$ and itself.'],
      solution: [ns.map((n) => `$${n * n + c}$`).join(', '), `The primes are ${primes.length ? primes.map((n) => `$${n * n + c}$`).join(', ') : 'none'}, so the answer is $${primes.length}$.`],
    };
  }
  if (d === 2) {
    const m = rng.int(3, 7);
    const r = rng.int(1, m - 1);
    const rem = (r * r) % m;
    return {
      prompt: `Let $n = ${m}k + ${r}$, where $k$ is an integer. Find the remainder when $n^2$ is divided by $${m}$.`,
      parts: [numPart(rem)],
      hints: [`Expand $(${m}k + ${r})^2$.`, `Take out a factor of $${m}$ from every term you can.`],
      solution: [
        `$n^2 = ${m * m}k^2 + ${2 * m * r}k + ${r * r} = ${m}(${m}k^2 + ${2 * r}k) + ${r * r}$`,
        r * r >= m ? `$${r * r} = ${m} \\times ${Math.floor((r * r) / m)} + ${rem}$, so the remainder is $${rem}$.` : `So the remainder is $${rem}$.`,
      ],
    };
  }
  if (rng.chance(0.4)) {
    const c = rng.pick(COUNTER);
    return {
      prompt: `Find the smallest value of $n$ that is a counterexample to the statement: ${c.text}.`,
      parts: [numPart(c.answer, { label: '$n =$' })],
      hints: ['Try the allowed values of $n$ in order, smallest first.', 'Stop at the first value that gives a number that is not prime.'],
      solution: [`Every smaller value gives a prime, but ${c.why}, which is not prime.`, `So the smallest counterexample is $n = ${c.answer}$.`],
    };
  }
  const p = rng.pick([3, 5, 11, 17, 41]);
  const plus = rng.chance(0.5);
  const answer = plus ? p - 1 : p;
  return {
    prompt: `Find the smallest positive integer $n$ that is a counterexample to the statement “$n^2 ${plus ? '+' : '-'} n + ${p}$ is prime for every positive integer $n$”.`,
    parts: [numPart(answer, { label: '$n =$' })],
    hints: [`Look for a value that makes every term a multiple of $${p}$.`, plus ? `Try $n = ${p - 1}$: then $n^2 + n = n(n + 1)$.` : `Try $n = ${p}$.`],
    solution: [
      plus ? `With $n = ${p - 1}$: $n^2 + n + ${p} = ${p - 1} \\times ${p} + ${p} = ${p}^2$, which is not prime.` : `With $n = ${p}$: $${p}^2 - ${p} + ${p} = ${p}^2$, which is not prime.`,
      `Every smaller positive $n$ gives a prime, so the answer is $n = ${answer}$.`,
    ],
  };
}

// ---------------------------------------------------------------------------
// 16.2 The area of a triangle as ½ab sin C
// ---------------------------------------------------------------------------

function triangleAreaSine(rng: Rng, d: Difficulty): Out {
  const a = rng.int(4, 20);
  const b = rng.int(4, 20);
  if (d === 1) {
    const C = rng.int(20, 160);
    const A = 0.5 * a * b * sinD(C);
    return {
      prompt: `In triangle $ABC$, $a = ${a}$ cm, $b = ${b}$ cm and angle $C = ${C}^\\circ$. Find the area of the triangle. ${SF_TEXT}`,
      parts: [sfPart(A, { suffix: 'cm²' })],
      hints: ['Area $= \\tfrac{1}{2}ab\\sin C$, where $C$ is the angle between sides $a$ and $b$.', 'Make sure your calculator is in degrees.'],
      solution: [`Area $= \\tfrac{1}{2} \\times ${a} \\times ${b} \\times \\sin ${C}^\\circ ${eq3(A)}$ cm²`],
      calculator: true,
    };
  }
  if (d === 2) {
    const C0 = rng.int(15, 85);
    const A = roundTo(0.5 * a * b * sinD(C0), 1);
    const C = asinD((2 * A) / (a * b));
    return {
      prompt: `In triangle $ABC$, $a = ${a}$ cm and $b = ${b}$ cm, and the area is $${fmt(A)}$ cm². Angle $C$ is acute. Find angle $C$. ${ANGLE_TEXT}`,
      parts: [numPart(C, { decimals: 1, suffix: '°' })],
      hints: ['Use area $= \\tfrac{1}{2}ab\\sin C$ and solve for $\\sin C$.', 'Then use $\\sin^{-1}$ for the acute angle.'],
      solution: [`$${fmt(A)} = \\tfrac{1}{2} \\times ${a} \\times ${b} \\times \\sin C$, so $\\sin C = \\dfrac{${fmt(2 * A)}}{${a * b}}$.`, `$C = \\sin^{-1}\\left(\\dfrac{${fmt(2 * A)}}{${a * b}}\\right) \\approx ${d1(C)}^\\circ$`],
      calculator: true,
    };
  }
  const C = rng.int(25, 155);
  const b0 = rng.int(4, 20);
  const A = roundTo(0.5 * a * b0 * sinD(C), 1);
  const bb = (2 * A) / (a * sinD(C));
  return {
    prompt: `In triangle $ABC$, $a = ${a}$ cm, angle $C = ${C}^\\circ$ and the area is $${fmt(A)}$ cm². Find the length of side $b$. ${SF_TEXT}`,
    parts: [sfPart(bb, { label: '$b =$', suffix: 'cm' })],
    hints: ['Use area $= \\tfrac{1}{2}ab\\sin C$ with $b$ unknown.', 'Rearrange: $b = \\dfrac{2 \\times \\text{area}}{a\\sin C}$.'],
    solution: [`$${fmt(A)} = \\tfrac{1}{2} \\times ${a} \\times b \\times \\sin ${C}^\\circ$`, `$b = \\dfrac{${fmt(2 * A)}}{${a}\\sin ${C}^\\circ} ${eq3(bb)}$ cm`],
    calculator: true,
  };
}

function triangleAreaProblems(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const [a, b] = [rng.int(5, 20), rng.int(5, 20)];
    const t = rng.int(30, 150);
    const A = a * b * sinD(t);
    return {
      prompt: `A parallelogram has sides of $${a}$ cm and $${b}$ cm, with an angle of $${t}^\\circ$ between them. Find its area. ${SF_TEXT}`,
      parts: [sfPart(A, { suffix: 'cm²' })],
      hints: ['A diagonal splits the parallelogram into two identical triangles.', 'Each triangle has area $\\tfrac{1}{2}ab\\sin\\theta$, so the parallelogram has area $ab\\sin\\theta$.'],
      solution: [`Area $= 2 \\times \\tfrac{1}{2} \\times ${a} \\times ${b} \\times \\sin ${t}^\\circ ${eq3(A)}$ cm²`],
      calculator: true,
    };
  }
  if (d === 2) {
    const [a, b, c] = retry(
      () => [rng.int(4, 15), rng.int(4, 15), rng.int(4, 15)],
      ([a, b, c]) => a + b > c + 1 && a + c > b + 1 && b + c > a + 1,
      100,
    );
    const C = acosD((a * a + b * b - c * c) / (2 * a * b));
    const A = 0.5 * a * b * sinD(C);
    return {
      prompt: `A triangle has sides $a = ${a}$ cm, $b = ${b}$ cm and $c = ${c}$ cm. Find angle $C$ (opposite side $c$) and the area of the triangle. ${ANGLE_TEXT} ${SF_TEXT}`,
      parts: [numPart(C, { label: 'Angle $C$:', decimals: 1, suffix: '°' }), sfPart(A, { label: 'Area:', suffix: 'cm²' })],
      hints: ['Use the cosine rule: $\\cos C = \\dfrac{a^2 + b^2 - c^2}{2ab}$.', 'Then area $= \\tfrac{1}{2}ab\\sin C$; keep the unrounded angle in your calculator.'],
      solution: [`$\\cos C = \\dfrac{${a * a} + ${b * b} - ${c * c}}{2 \\times ${a} \\times ${b}} = \\dfrac{${a * a + b * b - c * c}}{${2 * a * b}}$, so $C \\approx ${d1(C)}^\\circ$.`, `Area $= \\tfrac{1}{2} \\times ${a} \\times ${b} \\times \\sin C ${eq3(A)}$ cm²`],
      calculator: true,
    };
  }
  const [a, b] = [rng.int(5, 20), rng.int(5, 20)];
  const C0 = rng.int(100, 160);
  const A = roundTo(0.5 * a * b * sinD(C0), 1);
  const acute = asinD((2 * A) / (a * b));
  const C = 180 - acute;
  return {
    prompt: `In triangle $ABC$, $a = ${a}$ cm, $b = ${b}$ cm and the area is $${fmt(A)}$ cm². Angle $C$ is obtuse. Find angle $C$. ${ANGLE_TEXT}`,
    parts: [numPart(C, { decimals: 1, suffix: '°' })],
    hints: ['Find $\\sin C$ from area $= \\tfrac{1}{2}ab\\sin C$.', 'Your calculator gives the acute angle; the obtuse angle with the same sine is $180^\\circ$ minus it.'],
    solution: [`$\\sin C = \\dfrac{2 \\times ${fmt(A)}}{${a} \\times ${b}}$, and $\\sin^{-1}$ gives $${d1(acute)}^\\circ$.`, `Angle $C$ is obtuse, so $C = 180^\\circ - ${d1(acute)}^\\circ \\approx ${d1(C)}^\\circ$.`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 16.3 Logarithmic graphs
// ---------------------------------------------------------------------------

const lg = (x: number) => Math.log10(x);
const f2 = (v: number) => fmtFixed(v, 2);

function logPower(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const n = rng.pick([0.5, 1.5, 2, 2.5, 3, -0.5, -1, -2]);
    const c = rng.pick([0.3, 0.48, 0.6, 0.7, 0.85, 1.2, 1.4]);
    const a = 10 ** c;
    return {
      prompt: `Two quantities are modelled by $y = ax^n$. The graph of $\\log y$ against $\\log x$ (logarithms to base $10$) is a straight line with gradient $${fmt(n)}$ that crosses the $\\log y$ axis at $${fmt(c)}$. Find $n$ and $a$. ${SF_TEXT}`,
      parts: [numPart(n, { label: '$n =$', exact: false, display: 'decimal' }), sfPart(a, { label: '$a =$' })],
      hints: ['Take logs of $y = ax^n$: $\\log y = \\log a + n\\log x$.', 'Compare with $Y = c + mX$: the gradient is $n$ and the intercept is $\\log a$.'],
      solution: [`$\\log y = \\log a + n\\log x$, so $n$ is the gradient: $n = ${fmt(n)}$.`, `$\\log a = ${fmt(c)}$, so $a = 10^{${fmt(c)}} ${eq3(a)}$.`],
      calculator: true,
    };
  }
  if (d === 2) {
    const n = rng.pick([0.5, 1.5, 2, 3, -1, -0.5]);
    const a = rng.int(2, 9);
    const [x1, x2] = [rng.int(2, 5), rng.int(8, 20)];
    const [X1, X2] = [roundTo(lg(x1), 2), roundTo(lg(x2), 2)];
    const [Y1, Y2] = [roundTo(lg(a * x1 ** n), 2), roundTo(lg(a * x2 ** n), 2)];
    const m = (Y2 - Y1) / (X2 - X1);
    const c = Y1 - m * X1;
    const A = 10 ** c;
    return {
      prompt: `The model $y = ax^n$ is tested by plotting $\\log y$ against $\\log x$. The line of best fit passes through $(${f2(X1)}, ${f2(Y1)})$ and $(${f2(X2)}, ${f2(Y2)})$. Find $n$ and $a$. ${SF_TEXT}`,
      parts: [sfPart(m, { label: '$n =$' }), sfPart(A, { label: '$a =$' })],
      hints: ['$\\log y = \\log a + n\\log x$: the gradient of the line is $n$.', 'Find the gradient from the two points, then substitute one point to find $\\log a$.'],
      solution: [`$n = \\dfrac{${f2(Y2)} - ${f2(Y1)}}{${f2(X2)} - ${f2(X1)}} ${eq3(m)}$`, `$\\log a = ${f2(Y1)} - n \\times ${f2(X1)} ${eq3(c)}$, so $a = 10^{\\log a} ${eq3(A)}$.`],
      calculator: true,
    };
  }
  const n = rng.pick([2, 3, -1, -2]);
  const a = rng.int(2, 9);
  const [x1, x2] = rng.sample([1, 2, 3, 4, 5, 10], 2).sort((p, q) => p - q) as [number, number];
  const [y1, y2] = [a * x1 ** n, a * x2 ** n];
  return {
    prompt: `Two quantities follow $y = ax^n$. When $x = ${x1}$, $y = ${fmt(y1)}$, and when $x = ${x2}$, $y = ${fmt(y2)}$. Find $n$ and $a$.`,
    parts: [numPart(n, { label: '$n =$' }), numPart(a, { label: '$a =$' })],
    hints: ['Divide one equation by the other to remove $a$.', `$\\dfrac{y_2}{y_1} = \\left(\\dfrac{${x2}}{${x1}}\\right)^n$; take logs to find $n$.`],
    solution: [`$\\dfrac{${fmt(y2)}}{${fmt(y1)}} = \\left(\\dfrac{${x2}}{${x1}}\\right)^n$, so $n = \\dfrac{\\log(${fmt(y2)} \\div ${fmt(y1)})}{\\log(${x2} \\div ${x1})} = ${n}$.`, `$a = \\dfrac{${fmt(y1)}}{${x1}^{${n}}} = ${a}$`],
    calculator: true,
  };
}

function logExp(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const m = rng.pick([0.1, 0.15, 0.2, 0.3, 0.35, -0.1, -0.2]);
    const c = rng.pick([0.3, 0.6, 0.9, 1.1, 1.5, 2.2]);
    const [b, k] = [10 ** m, 10 ** c];
    return {
      prompt: `Two quantities are modelled by $y = kb^x$. The graph of $\\log y$ against $x$ (logarithms to base $10$) is a straight line with gradient $${fmt(m)}$ that crosses the $\\log y$ axis at $${fmt(c)}$. Find $b$ and $k$. ${SF_TEXT}`,
      parts: [sfPart(b, { label: '$b =$' }), sfPart(k, { label: '$k =$' })],
      hints: ['Take logs of $y = kb^x$: $\\log y = \\log k + x\\log b$.', 'The gradient is $\\log b$ and the intercept is $\\log k$.'],
      solution: [`$\\log y = \\log k + (\\log b)x$, so $\\log b = ${fmt(m)}$ and $b = 10^{${fmt(m)}} ${eq3(b)}$.`, `$\\log k = ${fmt(c)}$, so $k = 10^{${fmt(c)}} ${eq3(k)}$.`],
      calculator: true,
    };
  }
  if (d === 2) {
    const b = rng.pick([1.2, 1.5, 2, 2.5, 3, 0.8, 0.5]);
    const k = rng.int(2, 50);
    const [x1, x2] = [rng.int(0, 3), rng.int(6, 12)];
    const [Y1, Y2] = [roundTo(lg(k * b ** x1), 2), roundTo(lg(k * b ** x2), 2)];
    const m = (Y2 - Y1) / (x2 - x1);
    const c = Y1 - m * x1;
    const [B, K] = [10 ** m, 10 ** c];
    return {
      prompt: `The model $y = kb^x$ is tested by plotting $\\log y$ against $x$. The line of best fit passes through $(${x1}, ${f2(Y1)})$ and $(${x2}, ${f2(Y2)})$. Find $b$ and $k$. ${SF_TEXT}`,
      parts: [sfPart(B, { label: '$b =$' }), sfPart(K, { label: '$k =$' })],
      hints: ['$\\log y = \\log k + x\\log b$: the gradient is $\\log b$.', 'Find the gradient, then use a point to find $\\log k$; undo each log with $10^{\\ldots}$.'],
      solution: [`Gradient $= \\dfrac{${f2(Y2)} - ${f2(Y1)}}{${x2} - ${x1}} ${eq3(m)}$, so $b = 10^{\\text{gradient}} ${eq3(B)}$.`, `$\\log k = ${f2(Y1)} - ${x1} \\times \\text{gradient} ${eq3(c)}$, so $k ${eq3(K)}$.`],
      calculator: true,
    };
  }
  const b = rng.pick([2, 3, 4, 5]);
  const k = rng.int(2, 9);
  const x1 = rng.int(1, 3);
  const x2 = x1 + rng.int(1, 3);
  const [y1, y2] = [k * b ** x1, k * b ** x2];
  return {
    prompt: `A quantity follows $y = kb^x$. When $x = ${x1}$, $y = ${y1}$, and when $x = ${x2}$, $y = ${y2}$. Find $b$ and $k$.`,
    parts: [numPart(b, { label: '$b =$' }), numPart(k, { label: '$k =$' })],
    hints: ['Divide the second equation by the first to remove $k$.', `$b${x2 - x1 === 1 ? '' : `^{${x2 - x1}}`} = \\dfrac{${y2}}{${y1}}$.`],
    solution: [`$\\dfrac{kb^{${x2}}}{kb${x1 === 1 ? '' : `^{${x1}}`}} = b${x2 - x1 === 1 ? '' : `^{${x2 - x1}}`} = \\dfrac{${y2}}{${y1}} = ${b ** (x2 - x1)}$, so $b = ${b}$.`, `$k = \\dfrac{${y1}}{${b}${x1 === 1 ? '' : `^{${x1}}`}} = ${k}$`],
  };
}

// ---------------------------------------------------------------------------
// 17.1 Proof by contradiction
// ---------------------------------------------------------------------------

interface Contra {
  stmt: string;
  assume: string;
  wrong: string[];
  step: string;
  contra: string;
}

const rootContra = (k: number): Contra => ({
  stmt: `$\\sqrt{${k}}$ is irrational`,
  assume: `Assume $\\sqrt{${k}}$ is rational, so $\\sqrt{${k}} = \\dfrac{a}{b}$ for integers $a$ and $b$ with no common factor.`,
  wrong: [`Assume $\\sqrt{${k}}$ is irrational.`, `Assume $\\sqrt{${k}} = \\dfrac{a}{b}$ where $a$ and $b$ are both multiples of $${k}$.`, `Assume $\\sqrt{${k}}$ is a whole number.`],
  step: `From $a^2 = ${k}b^2$, the proof shows that $a$ and $b$ are both multiples of $${k}$.`,
  contra: `This contradicts the assumption that $a$ and $b$ have no common factor.`,
});

const CONTRAS: Contra[] = [
  rootContra(2),
  rootContra(3),
  rootContra(5),
  {
    stmt: 'there are infinitely many prime numbers',
    assume: 'Assume there are only finitely many primes, $p_1, p_2, \\ldots, p_n$.',
    wrong: ['Assume there are infinitely many primes.', 'Assume every whole number is prime.', 'Assume $p_1p_2 \\cdots p_n + 1$ is prime.'],
    step: 'The proof shows that $N = p_1p_2 \\cdots p_n + 1$ leaves a remainder of $1$ when divided by every prime on the list.',
    contra: 'So a prime factor of $N$ is not on the list, which contradicts the list holding every prime.',
  },
  {
    stmt: 'if $n^2$ is even, then $n$ is even',
    assume: 'Assume $n^2$ is even and $n$ is odd.',
    wrong: ['Assume $n^2$ is odd and $n$ is even.', 'Assume $n^2$ is even and $n$ is even.', 'Assume $n$ is even.'],
    step: 'Writing $n = 2k + 1$ gives $n^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1$, which is odd.',
    contra: 'This contradicts the assumption that $n^2$ is even.',
  },
  {
    stmt: 'there is no largest even number',
    assume: 'Assume there is a largest even number, $N$.',
    wrong: ['Assume there is no largest even number.', 'Assume there is a smallest even number.', 'Assume every even number is larger than $N$.'],
    step: 'The proof shows that $N + 2$ is also even, and it is larger than $N$.',
    contra: 'This contradicts $N$ being the largest even number.',
  },
  {
    stmt: 'there are no integers $a$ and $b$ with $6a + 9b = 1$',
    assume: 'Assume there are integers $a$ and $b$ with $6a + 9b = 1$.',
    wrong: ['Assume $a$ and $b$ are not integers.', 'Assume $6a + 9b \\ne 1$ for all integers $a$ and $b$.', 'Assume $6a + 9b = 3$.'],
    step: 'The proof shows that $6a + 9b = 3(2a + 3b)$, a multiple of $3$.',
    contra: 'But $1$ is not a multiple of $3$, a contradiction.',
  },
  {
    stmt: 'there is no smallest positive rational number',
    assume: 'Assume there is a smallest positive rational number, $q$.',
    wrong: ['Assume every rational number is positive.', 'Assume there is a largest positive rational number.', 'Assume $q$ is irrational.'],
    step: 'The proof shows that $\\dfrac{q}{2}$ is also a positive rational number, and it is smaller than $q$.',
    contra: 'This contradicts $q$ being the smallest positive rational number.',
  },
];

const NEGATIONS: Array<{ stmt: string; neg: string; wrong: string[] }> = [
  { stmt: 'All prime numbers are odd.', neg: 'There is a prime number that is not odd.', wrong: ['No prime numbers are odd.', 'All prime numbers are even.', 'All odd numbers are prime.'] },
  { stmt: 'Every square number is even.', neg: 'There is a square number that is odd.', wrong: ['Every square number is odd.', 'No square number is even.', 'Every even number is a square number.'] },
  { stmt: 'For every real number $x$, $x^2 \\ge 0$.', neg: 'There is a real number $x$ with $x^2 < 0$.', wrong: ['For every real number $x$, $x^2 < 0$.', 'There is a real number $x$ with $x^2 \\ge 0$.', 'For every real number $x$, $x^2 \\le 0$.'] },
  { stmt: 'There is a largest prime number.', neg: 'There is no largest prime number.', wrong: ['There is a smallest prime number.', 'Every prime number is large.', 'There are only finitely many prime numbers.'] },
  { stmt: 'Some multiples of $4$ are odd.', neg: 'No multiple of $4$ is odd.', wrong: ['Some multiples of $4$ are even.', 'All multiples of $4$ are odd.', 'Some odd numbers are multiples of $4$.'] },
  { stmt: 'If $n^3$ is odd, then $n$ is odd.', neg: '$n^3$ is odd and $n$ is even.', wrong: ['$n^3$ is even and $n$ is odd.', '$n^3$ is even and $n$ is even.', 'If $n^3$ is even, then $n$ is even.'] },
];

function contradictionLogic(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const c = rng.pick(CONTRAS);
    return {
      prompt: `A proof by contradiction shows that ${c.stmt}. How should it begin?`,
      parts: [part(mc(rng, c.assume, c.wrong))],
      hints: ['A proof by contradiction starts by assuming the opposite of what is to be proved.', 'For “if A, then B”, the opposite is “A is true and B is false”.'],
      solution: [c.assume, 'This is the opposite of the statement, so showing it leads to something impossible proves the statement.'],
    };
  }
  if (d === 2) {
    const [c, ...rest] = rng.shuffle(CONTRAS.filter((x, i, all) => all.findIndex((y) => y.contra === x.contra) === i));
    return {
      prompt: `In a proof by contradiction that ${c!.stmt}, the first step is: ${c!.assume.charAt(0).toLowerCase()}${c!.assume.slice(1)} ${c!.step} What is the contradiction?`,
      parts: [part(mc(rng, c!.contra, rest.map((r) => r.contra)))],
      hints: ['The contradiction clashes with something assumed at the start, or with a known fact.', 'Look back at exactly what the first step assumed.'],
      solution: [c!.step, c!.contra],
    };
  }
  const nn = rng.pick(NEGATIONS);
  return {
    prompt: `A proof by contradiction begins by assuming the negation (the opposite) of the statement. What is the negation of: ${nn.stmt}`,
    parts: [part(mc(rng, nn.neg, nn.wrong))],
    hints: ['The negation of “every … is …” is “there is one that is not”.', 'The negation of “if A, then B” is “A and not B”.'],
    solution: [`The negation is: ${nn.neg}`],
  };
}

const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19];

function smallestPrimeFactor(n: number): number {
  for (let p = 2; p * p <= n; p++) if (n % p === 0) return p;
  return n;
}

function contradictionPrimes(rng: Rng, d: Difficulty): Out {
  const m = d === 1 ? rng.int(2, 5) : d === 2 ? rng.int(3, 7) : rng.int(5, 8);
  const ps = PRIMES.slice(0, m);
  const N = ps.reduce((a, b) => a * b, 1) + 1;
  const prod = ps.join(' \\times ');
  const Ntex = Ng(N);
  if (d === 1) {
    return {
      prompt: `Euclid’s proof that there are infinitely many primes multiplies the primes on a list and adds $1$. Find $N = ${prod} + 1$.`,
      parts: [numPart(N, { label: '$N =$' })],
      hints: ['Multiply the primes, then add $1$.', 'Multiply two at a time to keep it simple.'],
      solution: [`$${prod} = ${Ng(N - 1)}$`, `$N = ${Ntex}$`],
    };
  }
  if (d === 2) {
    const p = rng.pick(ps);
    return {
      prompt: `Let $N = ${prod} + 1 = ${Ntex}$. Find the remainder when $N$ is divided by $${p}$.`,
      parts: [numPart(1)],
      hints: [`$${prod}$ is a multiple of $${p}$.`, 'So adding $1$ leaves a remainder of $1$.'],
      solution: [`$${prod}$ is a multiple of $${p}$, so $N$ is one more than a multiple of $${p}$, and the remainder is $1$.`, 'In the same way, no prime on the list divides $N$: this is the key step of the proof.'],
    };
  }
  const spf = smallestPrimeFactor(N);
  return {
    prompt: `Let $N = ${prod} + 1 = ${Ntex}$. Find the smallest prime factor of $N$. (If $N$ is prime, the answer is $N$ itself.)`,
    parts: [numPart(spf)],
    hints: [`No prime up to $${ps[ps.length - 1]}$ divides $N$, because each leaves a remainder of $1$.`, `So start testing primes larger than $${ps[ps.length - 1]}$.`],
    solution: [
      spf === N ? `No prime up to $\\sqrt{N}$ divides $N$, so $N$ is prime.` : `$N = ${spf} \\times ${Ng(N / spf)}$, and no smaller prime divides $N$.`,
      `Either way, $N$ has a prime factor that is not on the list $${ps.join(', ')}$: this is why there are infinitely many primes.`,
    ],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 17.2 Partial fractions
// ---------------------------------------------------------------------------

const nz = (rng: Rng, lo: number, hi: number) => retry(() => rng.int(lo, hi), (v) => v !== 0, 50);

function partialFractions(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const [a, b] = retry(() => [rng.int(-5, 5), rng.int(-5, 5)], ([a, b]) => a !== b, 50);
    const [A, B] = [nz(rng, -5, 5), nz(rng, -5, 5)];
    const num = polyString([[A + B, 'x'], [-A * b - B * a, '']]);
    return {
      prompt: `Express $\\dfrac{${num}}{${lin(a)}${lin(b)}}$ in partial fractions, as $\\dfrac{A}{${lin(a).replace(/^\(|\)$/g, '')}} + \\dfrac{B}{${lin(b).replace(/^\(|\)$/g, '')}}$. Find $A$ and $B$.`,
      parts: [numPart(A, { label: '$A =$' }), numPart(B, { label: '$B =$' })],
      hints: [`Multiply through: $${num} \\equiv A${lin(b)} + B${lin(a)}$.`, `Substitute $x = ${a}$ to remove $B$, and $x = ${b}$ to remove $A$.`],
      solution: [`$${num} \\equiv A${lin(b)} + B${lin(a)}$`, `$x = ${a}$: $${(A + B) * a - A * b - B * a} = ${cf(a - b, 'A')}$, so $A = ${A}$.`, `$x = ${b}$: $${(A + B) * b - A * b - B * a} = ${cf(b - a, 'B')}$, so $B = ${B}$.`],
    };
  }
  if (d === 2) {
    const a = rng.int(-4, 4);
    const c = rng.pick([2, 3]);
    const dd = retry(() => rng.int(-5, 5), (v) => v !== 0 && v !== -a * c && Math.abs(v) % c !== 0, 50);
    const [A, B] = [nz(rng, -5, 5), nz(rng, -5, 5)];
    // A(cx + d) + B(x - a)
    const num = polyString([[A * c + B, 'x'], [A * dd - B * a, '']]);
    const den = polyString([[c, 'x^2'], [dd - a * c, 'x'], [-a * dd, '']]);
    const second = `${c}x ${dd > 0 ? '+' : '-'} ${Math.abs(dd)}`;
    const root = frac(-dd, c);
    return {
      prompt: `Express $\\dfrac{${num}}{${den}}$ in partial fractions, as $\\dfrac{A}{${lin(a).replace(/^\(|\)$/g, '')}} + \\dfrac{B}{${second}}$. Find $A$ and $B$.`,
      parts: [numPart(A, { label: '$A =$' }), numPart(B, { label: '$B =$' })],
      hints: [`Check that $${den} = ${lin(a)}(${second})$.`, `Then $${num} \\equiv A(${second}) + B${lin(a)}$; substitute $x = ${a}$ and $x = ${F(root)}$.`],
      solution: [
        `$${den} = ${lin(a)}(${second})$, so $${num} \\equiv A(${second}) + B${lin(a)}$.`,
        `$x = ${a}$: $${(A * c + B) * a + A * dd - B * a} = ${cf(c * a + dd, 'A')}$, so $A = ${A}$.`,
        `$x = ${F(root)}$: $${F(fracAdd(fracMul(frac(A * c + B), root), frac(A * dd - B * a)))} = ${F(fracAdd(root, frac(-a)))}B$, so $B = ${B}$.`,
      ],
    };
  }
  const [a, b] = retry(() => [rng.int(-4, 4), rng.int(-4, 4)], ([a, b]) => a !== b, 50);
  const [A, B, C] = [nz(rng, -4, 4), nz(rng, -4, 4), nz(rng, -4, 4)];
  // A(x - b)^2 + B(x - a)(x - b) + C(x - a)
  const x2 = A + B;
  const x1 = -2 * A * b - B * (a + b) + C;
  const x0 = A * b * b + B * a * b - C * a;
  const num = polyString([[x2, 'x^2'], [x1, 'x'], [x0, '']]);
  const lb = lin(b).replace(/^\(|\)$/g, '');
  return {
    prompt: `Express $\\dfrac{${num}}{${lin(a)}${lin(b)}^2}$ as $\\dfrac{A}{${lin(a).replace(/^\(|\)$/g, '')}} + \\dfrac{B}{${lb}} + \\dfrac{C}{(${lb})^2}$. Find $A$, $B$ and $C$.`,
    parts: [numPart(A, { label: '$A =$' }), numPart(B, { label: '$B =$' }), numPart(C, { label: '$C =$' })],
    hints: [`Multiply through: $${num} \\equiv A${lin(b)}^2 + B${lin(a)}${lin(b)} + C${lin(a)}$.`, `Substitute $x = ${a}$ for $A$ and $x = ${b}$ for $C$, then compare the coefficients of $x^2$ for $B$.`],
    solution: [
      `$x = ${a}$: $${x2 * a * a + x1 * a + x0} = ${cf((a - b) ** 2, 'A')}$, so $A = ${A}$.`,
      `$x = ${b}$: $${x2 * b * b + x1 * b + x0} = ${cf(b - a, 'C')}$, so $C = ${C}$.`,
      `Coefficients of $x^2$: $${x2} = A + B$, so $B = ${B}$.`,
    ],
  };
}

function partialImproper(rng: Rng, d: Difficulty): Out {
  if (d < 3) {
    const [a, b] = retry(() => [rng.int(-5, 5), rng.int(-5, 5)], ([a, b]) => a !== b, 50);
    const Q = d === 1 ? 1 : rng.pick([2, 3, -1, -2]);
    const [A, B] = [nz(rng, -6, 6), nz(rng, -6, 6)];
    // Q(x - a)(x - b) + A(x - b) + B(x - a)
    const num = polyString([[Q, 'x^2'], [-Q * (a + b) + A + B, 'x'], [Q * a * b - A * b - B * a, '']]);
    const den = polyString([[1, 'x^2'], [-(a + b), 'x'], [a * b, '']]);
    const form = d === 1 ? `1 + \\dfrac{A}{${lin(a).replace(/^\(|\)$/g, '')}} + \\dfrac{B}{${lin(b).replace(/^\(|\)$/g, '')}}` : `P + \\dfrac{A}{${lin(a).replace(/^\(|\)$/g, '')}} + \\dfrac{B}{${lin(b).replace(/^\(|\)$/g, '')}}`;
    return {
      prompt: `The fraction $\\dfrac{${num}}{${den}}$ is improper. Write it as $${form}$${d === 1 ? '' : ', where $P$ is a constant'}. Find ${d === 1 ? '$A$ and $B$' : '$P$, $A$ and $B$'}.`,
      parts: [...(d === 1 ? [] : [numPart(Q, { label: '$P =$' })]), numPart(A, { label: '$A =$' }), numPart(B, { label: '$B =$' })],
      hints: [`The degrees of the top and bottom are equal, so dividing gives a constant ${d === 1 ? '(here $1$)' : 'equal to the ratio of the $x^2$ coefficients'} and a remainder.`, `Write $${num} \\equiv ${d === 1 ? '' : 'P'}${lin(a)}${lin(b)} + A${lin(b)} + B${lin(a)}$ and substitute $x = ${a}$ and $x = ${b}$.`],
      solution: [
        `$${den} = ${lin(a)}${lin(b)}$, and the constant is $${Q}$ (the ratio of the $x^2$ coefficients).`,
        `$${num} \\equiv ${Q === 1 ? '' : Q}${lin(a)}${lin(b)} + A${lin(b)} + B${lin(a)}$`,
        `$x = ${a}$ gives $A = ${A}$, and $x = ${b}$ gives $B = ${B}$.`,
      ],
    };
  }
  const roots = rng.sample([-3, -2, -1, 1, 2, 3, 4], 3) as [number, number, number];
  const [A, B, C] = [nz(rng, -4, 4), nz(rng, -4, 4), nz(rng, -4, 4)];
  const [a, b, c] = roots;
  // A(x-b)(x-c) + B(x-a)(x-c) + C(x-a)(x-b)
  const x2 = A + B + C;
  const x1 = -A * (b + c) - B * (a + c) - C * (a + b);
  const x0 = A * b * c + B * a * c + C * a * b;
  const num = polyString([[x2, 'x^2'], [x1, 'x'], [x0, '']]);
  const at = (x: number) => x2 * x * x + x1 * x + x0;
  return {
    prompt: `Express $\\dfrac{${num}}{${lin(a)}${lin(b)}${lin(c)}}$ as $\\dfrac{A}{${lin(a).replace(/^\(|\)$/g, '')}} + \\dfrac{B}{${lin(b).replace(/^\(|\)$/g, '')}} + \\dfrac{C}{${lin(c).replace(/^\(|\)$/g, '')}}$. Find $A$, $B$ and $C$.`,
    parts: [numPart(A, { label: '$A =$' }), numPart(B, { label: '$B =$' }), numPart(C, { label: '$C =$' })],
    hints: [`Multiply through: $${num} \\equiv A${lin(b)}${lin(c)} + B${lin(a)}${lin(c)} + C${lin(a)}${lin(b)}$.`, `Substitute $x = ${a}$, $x = ${b}$ and $x = ${c}$ in turn.`],
    solution: [
      `$x = ${a}$: $${at(a)} = ${cf((a - b) * (a - c), 'A')}$, so $A = ${A}$.`,
      `$x = ${b}$: $${at(b)} = ${cf((b - a) * (b - c), 'B')}$, so $B = ${B}$.`,
      `$x = ${c}$: $${at(c)} = ${cf((c - a) * (c - b), 'C')}$, so $C = ${C}$.`,
    ],
  };
}

// ---------------------------------------------------------------------------
// 17.3 Sigma notation and recurrence relations
// ---------------------------------------------------------------------------

const arith = (a: number, b: number, n: number) => (a * n * (n + 1)) / 2 + b * n;

function sigma(rng: Rng, d: Difficulty): Out {
  const a = nz(rng, -5, 9);
  const b = rng.int(-10, 10);
  const term = polyString([[a, 'r'], [b, '']]);
  if (d === 1) {
    const n = rng.int(8, 40);
    const S = arith(a, b, n);
    return {
      prompt: `Find $\\displaystyle\\sum_{r = 1}^{${n}} (${term})$.`,
      parts: [numPart(S)],
      hints: ['The terms form an arithmetic series: find the first and last terms.', 'Sum $= \\dfrac{n}{2}(\\text{first} + \\text{last})$.'],
      solution: [`The first term is $${a + b}$ and the last is $${a * n + b}$, with $${n}$ terms.`, `Sum $= \\dfrac{${n}}{2}(${addTex(a + b, a * n + b)}) = ${S}$`],
    };
  }
  if (d === 2) {
    const k = rng.pick([2, 3]);
    const c = rng.int(1, 5);
    const n = k === 2 ? rng.int(5, 10) : rng.int(4, 7);
    const S = (c * k * (k ** n - 1)) / (k - 1);
    return {
      prompt: `Find $\\displaystyle\\sum_{r = 1}^{${n}} ${c === 1 ? '' : `${c} \\times `}${k}^r$.`,
      parts: [numPart(S)],
      hints: ['This is a geometric series: find the first term and the common ratio.', 'Sum $= \\dfrac{a(r^n - 1)}{r - 1}$.'],
      solution: [`First term $${c * k}$, common ratio $${k}$, and $${n}$ terms.`, `Sum $= \\dfrac{${c * k}(${k}^{${n}} - 1)}{${k} - 1} = ${S}$`],
    };
  }
  const m = rng.int(5, 15);
  const n = m + rng.int(8, 30);
  const S = arith(a, b, n) - arith(a, b, m - 1);
  return {
    prompt: `Find $\\displaystyle\\sum_{r = ${m}}^{${n}} (${term})$.`,
    parts: [numPart(S)],
    hints: [`There are $${n} - ${m} + 1 = ${n - m + 1}$ terms.`, `Either find the first and last terms, or work out $\\sum_{r = 1}^{${n}} - \\sum_{r = 1}^{${m - 1}}$.`],
    solution: [`First term ($r = ${m}$): $${a * m + b}$; last term ($r = ${n}$): $${a * n + b}$; $${n - m + 1}$ terms.`, `Sum $= \\dfrac{${n - m + 1}}{2}(${addTex(a * m + b, a * n + b)}) = ${S}$`],
  };
}

function recurrence(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const a = rng.pick([2, 3, -1, -2, 0.5]);
    const b = rng.int(-5, 5);
    const u1 = rng.int(-4, 6);
    const us = [u1];
    for (let i = 0; i < 3; i++) us.push(a * us[i]! + b);
    const rule = polyString([[a, 'u_n'], [b, '']]);
    return {
      prompt: `A sequence has $u_{n + 1} = ${rule}$ and $u_1 = ${u1}$. Find $u_4$.`,
      parts: [numPart(us[3]!, { label: '$u_4 =$' })],
      hints: ['Use the rule to find each term from the one before.', 'Find $u_2$, then $u_3$, then $u_4$.'],
      solution: [`$u_2 = ${fmt(us[1]!)}$, $u_3 = ${fmt(us[2]!)}$ and $u_4 = ${fmt(us[3]!)}$.`],
    };
  }
  if (d === 2) {
    const kind = rng.int(0, 1);
    const N = rng.int(20, 100);
    if (kind === 0) {
      // u_{n+1} = k / u_n: period 2.
      const k = rng.pick([6, 12, 20, 24]);
      const u1 = rng.pick([2, 3, 4].filter((x) => k % x === 0 && x * x !== k));
      const u2 = k / u1;
      const sumAsk = rng.chance(0.5);
      const S = Math.floor(N / 2) * (u1 + u2) + (N % 2) * u1;
      return {
        prompt: `A sequence has $u_{n + 1} = \\dfrac{${k}}{u_n}$ and $u_1 = ${u1}$. ${sumAsk ? `Find $\\displaystyle\\sum_{r = 1}^{${N}} u_r$.` : `Find $u_{${N}}$.`}`,
        parts: [numPart(sumAsk ? S : N % 2 ? u1 : u2)],
        hints: ['Work out the first few terms and look for a pattern.', 'The sequence is periodic: it repeats with period $2$.'],
        solution: [`$u_1 = ${u1}$, $u_2 = ${u2}$, $u_3 = ${u1}$, …: the terms alternate.`, sumAsk ? `${N} terms: $${Math.floor(N / 2)}$ pairs of $${u1} + ${u2} = ${u1 + u2}$${N % 2 ? `, plus one more $${u1}$` : ''}, so the sum is $${S}$.` : `$${N}$ is ${N % 2 ? 'odd' : 'even'}, so $u_{${N}} = ${N % 2 ? u1 : u2}$.`],
      };
    }
    // u_{n+1} = 1 / (1 - u_n): period 3.
    const u1f = rng.pick([frac(2), frac(3), frac(-1), frac(1, 2), frac(-2), frac(4)]);
    const next = (u: Frac) => frac(u.d, u.d - u.n);
    const seq = [u1f, next(u1f), next(next(u1f))];
    const ans = seq[(N - 1) % 3]!;
    return {
      prompt: `A sequence has $u_{n + 1} = \\dfrac{1}{1 - u_n}$ and $u_1 = ${F(u1f)}$. Find $u_{${N}}$.`,
      parts: [fracPart(ans)],
      hints: ['Work out the first few terms and look for a pattern.', 'The sequence is periodic with period $3$.'],
      solution: [`$u_1 = ${F(seq[0]!)}$, $u_2 = ${F(seq[1]!)}$, $u_3 = ${F(seq[2]!)}$, $u_4 = ${F(seq[0]!)}$, …: it repeats every $3$ terms.`, `$${N} = 3 \\times ${Math.floor((N - 1) / 3)} + ${((N - 1) % 3) + 1}$, so $u_{${N}} = u_{${((N - 1) % 3) + 1}} = ${F(ans)}$.`],
    };
  }
  const k = rng.int(2, 5);
  const c = rng.int(1, 4);
  const dd = rng.int(0, 6);
  const u3 = c * k * k + dd * k + dd;
  return {
    prompt: `A sequence has $u_{n + 1} = ku_n${dd ? ` + ${dd}` : ''}$, where $k$ is a positive constant, and $u_1 = ${c}$. Given that $u_3 = ${u3}$, find $k$.`,
    parts: [numPart(k, { label: '$k =$' })],
    hints: [`Write $u_2$ and then $u_3$ in terms of $k$.`, `$u_3 = k(${c}k${dd ? ` + ${dd}` : ''})${dd ? ` + ${dd}` : ''}$; solve the quadratic and keep the positive root.`],
    solution: [
      `$u_2 = ${polyString([[c, 'k'], [dd, '']])}$ and $u_3 = k(${polyString([[c, 'k'], [dd, '']])})${dd ? ` + ${dd}` : ''} = ${polyString([[c, 'k^2'], [dd, 'k'], [dd, '']])}$.`,
      `$${polyString([[c, 'k^2'], [dd, 'k'], [dd - u3, '']])} = 0$, and the positive solution is $k = ${k}$.`,
    ],
  };
}

// ---------------------------------------------------------------------------
// 17.4 The binomial expansion for any rational n
// ---------------------------------------------------------------------------

/** The coefficient of x^k in (1 + ax)^n, as a fraction (n = p/q). */
function binomCoef(n: Frac, a: Frac, k: number): Frac {
  let c = frac(1);
  for (let i = 0; i < k; i++) c = fracMul(c, frac(n.n - i * n.d, n.d * (i + 1)));
  for (let i = 0; i < k; i++) c = fracMul(c, a);
  return c;
}
const nTex = (n: Frac) => (n.d === 1 ? `${n.n}` : `${n.n < 0 ? '-' : ''}\\frac{${Math.abs(n.n)}}{${n.d}}`);
const ax = (a: Frac) => (a.d === 1 ? `${a.n === 1 ? '' : a.n === -1 ? '-' : a.n}x` : `${F(a)}x`);
const onePlus = (a: Frac) => `1 ${a.n < 0 ? '-' : '+'} ${ax(frac(Math.abs(a.n), a.d))}`;

function binomialRational(rng: Rng, d: Difficulty): Out {
  if (d < 3) {
    const n = d === 1 ? frac(rng.pick([-1, -2, -3])) : rng.pick([frac(1, 2), frac(-1, 2), frac(1, 3), frac(-1, 3), frac(3, 2), frac(-3, 2), frac(2, 3)]);
    const a = frac(rng.pick([1, 2, 3, -1, -2, -3, 4]));
    const ks = d === 1 ? [1, 2] : [2, 3];
    const cs = ks.map((k) => binomCoef(n, a, k));
    return {
      prompt: `Find the coefficients of $x^${ks[0]}$ and $x^${ks[1]}$ in the expansion of $(${onePlus(a)})^{${nTex(n)}}$.`.replace('x^1', 'x'),
      parts: ks.map((k, i) => fracPart(cs[i]!, `Coefficient of $x${k === 1 ? '' : `^${k}`}$:`)),
      hints: ['$(1 + y)^n = 1 + ny + \\dfrac{n(n - 1)}{2!}y^2 + \\dfrac{n(n - 1)(n - 2)}{3!}y^3 + \\cdots$', `Here $n = ${nTex(n)}$ and $y = ${ax(a)}$: remember to raise the whole of $y$ to each power.`],
      solution: ks.map((k, i) => {
        const factors = Array.from({ length: k }, (_, j) => `(${nTex(fracAdd(n, frac(-j)))})`).join('');
        return `$x${k === 1 ? '' : `^${k}`}$: $\\dfrac{${factors}}{${k}!} \\times (${fracLatex(a)})^{${k}} = ${F(cs[i]!)}$`;
      }),
    };
  }
  const opts: Array<{ b: number; n: Frac; bn: Frac; bTex: string }> = [
    { b: 4, n: frac(1, 2), bn: frac(2), bTex: '4^{\\frac{1}{2}} = 2' },
    { b: 9, n: frac(1, 2), bn: frac(3), bTex: '9^{\\frac{1}{2}} = 3' },
    { b: 4, n: frac(-1, 2), bn: frac(1, 2), bTex: '4^{-\\frac{1}{2}} = \\frac{1}{2}' },
    { b: 2, n: frac(-1), bn: frac(1, 2), bTex: '2^{-1} = \\frac{1}{2}' },
    { b: 3, n: frac(-2), bn: frac(1, 9), bTex: '3^{-2} = \\frac{1}{9}' },
    { b: 8, n: frac(1, 3), bn: frac(2), bTex: '8^{\\frac{1}{3}} = 2' },
  ];
  const o = rng.pick(opts);
  const a = rng.pick([1, 2, 3, -1, -2]);
  const ratio = frac(a, o.b);
  const c2 = fracMul(o.bn, binomCoef(o.n, ratio, 2));
  const c1 = fracMul(o.bn, binomCoef(o.n, ratio, 1));
  return {
    prompt: `Find the constant term, and the coefficients of $x$ and $x^2$, in the expansion of $(${o.b} ${a < 0 ? '-' : '+'} ${Math.abs(a) === 1 ? '' : Math.abs(a)}x)^{${nTex(o.n)}}$.`,
    parts: [fracPart(o.bn, 'Constant term:'), fracPart(c1, 'Coefficient of $x$:'), fracPart(c2, 'Coefficient of $x^2$:')],
    hints: [`Take out a factor of $${o.b}$: $(${o.b} ${a < 0 ? '-' : '+'} ${Math.abs(a) === 1 ? '' : Math.abs(a)}x)^{${nTex(o.n)}} = ${o.b}^{${nTex(o.n)}}\\left(1 ${a < 0 ? '-' : '+'} ${F(frac(Math.abs(a), o.b))}x\\right)^{${nTex(o.n)}}$.`, 'Expand the bracket with $(1 + y)^n = 1 + ny + \\dfrac{n(n - 1)}{2}y^2 + \\cdots$, then multiply every term by the factor in front.'],
    solution: [`$${o.bTex}$, and $y = ${ax(ratio)}$.`, `Constant $${F(o.bn)}$; $x$: $${F(o.bn)} \\times (${nTex(o.n)}) \\times (${F(ratio)}) = ${F(c1)}$; $x^2$: $${F(o.bn)} \\times \\dfrac{(${nTex(o.n)})(${nTex(fracAdd(o.n, frac(-1)))})}{2} \\times \\left(${F(ratio)}\\right)^2 = ${F(c2)}$.`],
  };
}

function binomialValidity(rng: Rng, d: Difficulty): Out {
  const n = rng.pick([frac(1, 2), frac(-1, 2), frac(-1), frac(-2), frac(1, 3), frac(3, 2)]);
  if (d === 1) {
    const a = rng.pick([2, 3, 4, 5, -2, -3, -4]);
    return {
      prompt: `The expansion of $(1 ${a < 0 ? '-' : '+'} ${Math.abs(a)}x)^{${nTex(n)}}$ is valid for $|x| < k$. Find $k$.`,
      parts: [fracPart(frac(1, Math.abs(a)), '$k =$')],
      hints: ['$(1 + y)^n$ for a $n$ that is not a positive whole number is valid only when $|y| < 1$.', `Here $y = ${a}x$, so you need $|${a}x| < 1$.`],
      solution: [`$|${a}x| < 1$ gives $|x| < ${F(frac(1, Math.abs(a)))}$, so $k = ${F(frac(1, Math.abs(a)))}$.`],
    };
  }
  if (d === 2) {
    const b = rng.pick([2, 3, 4, 5, 9]);
    const a = rng.pick([1, 2, 3, -1, -2, -3].filter((x) => Math.abs(x) !== b));
    const k = frac(b, Math.abs(a));
    return {
      prompt: `The expansion of $(${b} ${a < 0 ? '-' : '+'} ${Math.abs(a) === 1 ? '' : Math.abs(a)}x)^{${nTex(n)}}$ is valid for $|x| < k$. Find $k$.`,
      parts: [fracPart(k, '$k =$')],
      hints: [`Write it as $${b}^{${nTex(n)}}\\left(1 ${a < 0 ? '-' : '+'} ${F(frac(Math.abs(a), b))}x\\right)^{${nTex(n)}}$.`, `The expansion is valid when $\\left|${F(frac(Math.abs(a), b))}x\\right| < 1$.`],
      solution: [`$\\left|${F(frac(Math.abs(a), b))}x\\right| < 1$ gives $|x| < ${F(k)}$, so $k = ${F(k)}$.`],
    };
  }
  const x = rng.pick([0.01, 0.02, 0.03, 0.04, 0.05, -0.01, -0.02, -0.05]);
  const nv = fracValue(n);
  const est = 1 + nv * x + ((nv * (nv - 1)) / 2) * x * x;
  return {
    prompt: `Use the first three terms of the expansion of $(1 + x)^{${nTex(n)}}$ to estimate $${fmt(1 + x)}^{${nTex(n)}}$, to 5 decimal places.`,
    parts: [numPart(est, { decimals: 5 })],
    hints: ['$(1 + x)^n \\approx 1 + nx + \\dfrac{n(n - 1)}{2}x^2$ for small $x$.', `Here $x = ${fmt(x)}$.`],
    solution: [`$1 + (${nTex(n)})(${fmt(x)}) + \\dfrac{(${nTex(n)})(${nTex(fracAdd(n, frac(-1)))})}{2}(${fmt(x)})^2 \\approx ${fmtFixed(est, 5)}$`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 17.5 Vectors in three dimensions
// ---------------------------------------------------------------------------

const vec3 = (x: number, y: number, z: number) => polyString([[x, '\\mathbf{i}'], [y, '\\mathbf{j}'], [z, '\\mathbf{k}']]);
const pt3 = (p: number[]) => `(${p.map(fmt).join(', ')})`;
const QUADS = [[1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [2, 6, 9, 11], [4, 4, 7, 9], [2, 10, 11, 15], [6, 6, 7, 11]];

function vectors3d(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const q = rng.chance(0.5) ? rng.shuffle(QUADS[rng.int(0, QUADS.length - 1)]!.slice(0, 3)).map((v) => v * (rng.chance(0.5) ? -1 : 1)) : [nz(rng, -9, 9), nz(rng, -9, 9), nz(rng, -9, 9)];
    const m = Math.hypot(q[0]!, q[1]!, q[2]!);
    return {
      prompt: `Find the magnitude of $${vec3(q[0]!, q[1]!, q[2]!)}$. ${SF_TEXT}`,
      parts: [sfPart(m)],
      hints: ['$|x\\mathbf{i} + y\\mathbf{j} + z\\mathbf{k}| = \\sqrt{x^2 + y^2 + z^2}$', 'Square each component, including the negative ones, and add.'],
      solution: [`$\\sqrt{${q.map((v) => `${v < 0 ? `(${v})` : v}^2`).join(' + ')}} = \\sqrt{${q[0]! ** 2 + q[1]! ** 2 + q[2]! ** 2}} ${eq3(m)}$`],
    };
  }
  if (d === 2) {
    const A = [rng.int(-6, 6), rng.int(-6, 6), rng.int(-6, 6)];
    const B = retry(() => [rng.int(-6, 8), rng.int(-6, 8), rng.int(-6, 8)], (b) => b.some((v, i) => v !== A[i]), 50);
    const D = B.map((v, i) => v - A[i]!);
    const m = Math.hypot(D[0]!, D[1]!, D[2]!);
    return {
      prompt: `Find the distance between the points $A${pt3(A)}$ and $B${pt3(B)}$. ${SF_TEXT}`,
      parts: [sfPart(m)],
      hints: ['Find $\\overrightarrow{AB}$ by subtracting the coordinates of $A$ from those of $B$.', 'The distance is the magnitude of $\\overrightarrow{AB}$.'],
      solution: [`$\\overrightarrow{AB} = ${vec3(D[0]!, D[1]!, D[2]!)}$`, `$AB = \\sqrt{${D.map((v) => `${v < 0 ? `(${v})` : v}^2`).join(' + ')}} ${eq3(m)}$`],
    };
  }
  const v = [nz(rng, -8, 8), nz(rng, -8, 8), nz(rng, -8, 8)];
  const axis = rng.int(0, 2);
  const m = Math.hypot(v[0]!, v[1]!, v[2]!);
  const ang = acosD(v[axis]! / m);
  const name = ['x', 'y', 'z'][axis]!;
  return {
    prompt: `Find the angle between the vector $${vec3(v[0]!, v[1]!, v[2]!)}$ and the positive $${name}$-axis. ${ANGLE_TEXT}`,
    parts: [numPart(ang, { decimals: 1, suffix: '°' })],
    hints: [`The angle $\\theta$ with the $${name}$-axis has $\\cos\\theta = \\dfrac{${name}\\text{-component}}{\\text{magnitude}}$.`, 'Find the magnitude first.'],
    solution: [`$|\\mathbf{v}| = \\sqrt{${v[0]! ** 2 + v[1]! ** 2 + v[2]! ** 2}}$`, `$\\cos\\theta = \\dfrac{${v[axis]}}{\\sqrt{${v[0]! ** 2 + v[1]! ** 2 + v[2]! ** 2}}}$, so $\\theta \\approx ${d1(ang)}^\\circ$.`],
    calculator: true,
  };
}

function vectors3dGeometry(rng: Rng, d: Difficulty): Out {
  const A = [rng.int(-6, 6), rng.int(-6, 6), rng.int(-6, 6)];
  const B = retry(() => [rng.int(-6, 8), rng.int(-6, 8), rng.int(-6, 8)], (b) => b.some((v, i) => v !== A[i]), 50);
  const lbl = ['$x$:', '$y$:', '$z$:'];
  if (d === 1) {
    const D = B.map((v, i) => v - A[i]!);
    return {
      prompt: `$A$ is the point $${pt3(A)}$ and $B$ is $${pt3(B)}$. Find $\\overrightarrow{AB}$ as $x\\mathbf{i} + y\\mathbf{j} + z\\mathbf{k}$.`,
      parts: D.map((v, i) => numPart(v, { label: lbl[i] })),
      hints: ['$\\overrightarrow{AB} = \\mathbf{b} - \\mathbf{a}$: subtract the position vector of $A$ from that of $B$.', 'Subtract each coordinate separately.'],
      solution: [`$\\overrightarrow{AB} = ${vec3(B[0]!, B[1]!, B[2]!)} - (${vec3(A[0]!, A[1]!, A[2]!)}) = ${vec3(D[0]!, D[1]!, D[2]!)}$`],
    };
  }
  if (d === 2) {
    const M = B.map((v, i) => (v + A[i]!) / 2);
    return {
      prompt: `$A$ is the point $${pt3(A)}$ and $B$ is $${pt3(B)}$. Find the coordinates of the midpoint $M$ of $AB$.`,
      parts: M.map((v, i) => numPart(v, { label: lbl[i], exact: false, display: 'decimal' })),
      hints: ['$\\overrightarrow{OM} = \\mathbf{a} + \\tfrac{1}{2}\\overrightarrow{AB} = \\tfrac{1}{2}(\\mathbf{a} + \\mathbf{b})$.', 'Average each coordinate.'],
      solution: [`$M = \\left(\\dfrac{${A[0]} + ${B[0]}}{2}, \\dfrac{${A[1]} + ${B[1]}}{2}, \\dfrac{${A[2]} + ${B[2]}}{2}\\right) = ${pt3(M)}$`],
    };
  }
  const C = [rng.int(-6, 6), rng.int(-6, 6), rng.int(-6, 6)];
  const D = C.map((v, i) => v + A[i]! - B[i]!);
  return {
    prompt: `$ABCD$ is a parallelogram with $A${pt3(A)}$, $B${pt3(B)}$ and $C${pt3(C)}$. Find the coordinates of $D$.`,
    parts: D.map((v, i) => numPart(v, { label: lbl[i] })),
    hints: ['In parallelogram $ABCD$, $\\overrightarrow{AD} = \\overrightarrow{BC}$.', 'So $\\mathbf{d} = \\mathbf{a} + \\mathbf{c} - \\mathbf{b}$.'],
    solution: [`$\\overrightarrow{BC} = ${vec3(C[0]! - B[0]!, C[1]! - B[1]!, C[2]! - B[2]!)}$`, `$\\mathbf{d} = \\mathbf{a} + \\overrightarrow{BC}$, so $D = ${pt3(D)}$.`],
  };
}

// ---------------------------------------------------------------------------
// 18.1 Small-angle approximations
// ---------------------------------------------------------------------------

function smallAngleValues(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const t = rng.pick([0.05, 0.1, 0.12, 0.15, 0.2, 0.08]);
    const fn = rng.int(0, 2);
    const est = fn === 1 ? 1 - (t * t) / 2 : t;
    const name = ['\\sin', '\\cos', '\\tan'][fn]!;
    return {
      prompt: `Use a small-angle approximation to estimate $${name} ${fmt(t)}$, where the angle is in radians. Give your answer to 4 decimal places.`,
      parts: [numPart(est, { decimals: 4 })],
      hints: ['For small $\\theta$ in radians: $\\sin\\theta \\approx \\theta$, $\\cos\\theta \\approx 1 - \\dfrac{\\theta^2}{2}$ and $\\tan\\theta \\approx \\theta$.', `Here $\\theta = ${fmt(t)}$.`],
      solution: [fn === 1 ? `$\\cos ${fmt(t)} \\approx 1 - \\dfrac{${fmt(t)}^2}{2} = ${fmtFixed(est, 4)}$` : `$${name} ${fmt(t)} \\approx ${fmt(t)}$`],
    };
  }
  if (d === 2) {
    const deg = rng.pick([2, 3, 4, 5, 6]);
    const t = (deg * Math.PI) / 180;
    const fn = rng.int(0, 1);
    const est = fn === 1 ? 1 - (t * t) / 2 : t;
    return {
      prompt: `Use a small-angle approximation to estimate $${fn ? '\\cos' : '\\sin'} ${deg}^\\circ$, to 4 decimal places.`,
      parts: [numPart(est, { decimals: 4 })],
      hints: ['The approximations work only in radians, so convert first: multiply by $\\dfrac{\\pi}{180}$.', fn ? '$\\cos\\theta \\approx 1 - \\dfrac{\\theta^2}{2}$' : '$\\sin\\theta \\approx \\theta$'],
      solution: [`$${deg}^\\circ = \\dfrac{${deg}\\pi}{180} \\approx ${fmtFixed(t, 5)}$ radians.`, fn ? `$\\cos ${deg}^\\circ \\approx 1 - \\dfrac{${fmtFixed(t, 5)}^2}{2} \\approx ${fmtFixed(est, 4)}$` : `$\\sin ${deg}^\\circ \\approx ${fmtFixed(est, 4)}$`],
      calculator: true,
    };
  }
  const kind = rng.int(0, 2);
  const [a, b] = [rng.int(1, 6), rng.int(1, 6)];
  if (kind === 0) {
    const v = frac(a, b);
    return {
      prompt: `When $\\theta$ is small, $\\dfrac{\\sin ${a === 1 ? '' : a}\\theta}{\\tan ${b === 1 ? '' : b}\\theta}$ is approximately a constant. Find it.`,
      parts: [fracPart(v)],
      hints: ['Use $\\sin x \\approx x$ and $\\tan x \\approx x$.', `So the top is about $${a === 1 ? '' : a}\\theta$ and the bottom about $${b === 1 ? '' : b}\\theta$.`],
      solution: [`$\\dfrac{\\sin ${a === 1 ? '' : a}\\theta}{\\tan ${b === 1 ? '' : b}\\theta} \\approx \\dfrac{${a}\\theta}{${b}\\theta} = ${F(v)}$`],
    };
  }
  if (kind === 1) {
    const v = frac(a * a, 2 * b);
    return {
      prompt: `When $\\theta$ is small, $\\dfrac{1 - \\cos ${a === 1 ? '' : a}\\theta}{\\theta \\sin ${b === 1 ? '' : b}\\theta}$ is approximately a constant. Find it.`,
      parts: [fracPart(v)],
      hints: ['$\\cos x \\approx 1 - \\dfrac{x^2}{2}$, so $1 - \\cos x \\approx \\dfrac{x^2}{2}$.', 'And $\\sin x \\approx x$.'],
      solution: [`$1 - \\cos ${a === 1 ? '' : a}\\theta \\approx \\dfrac{${a * a}\\theta^2}{2}$ and $\\theta\\sin ${b === 1 ? '' : b}\\theta \\approx ${b === 1 ? '' : b}\\theta^2$.`, `So the expression is about $\\dfrac{${a * a}}{2 \\times ${b}} = ${F(v)}$.`],
    };
  }
  const c = rng.int(1, 4);
  const v = frac(2 * a * b, c * c);
  return {
    prompt: `When $\\theta$ is small, $\\dfrac{\\sin ${a === 1 ? '' : a}\\theta \\tan ${b === 1 ? '' : b}\\theta}{1 - \\cos ${c === 1 ? '' : c}\\theta}$ is approximately a constant. Find it.`,
    parts: [fracPart(v)],
    hints: ['Replace each function by its small-angle approximation.', '$1 - \\cos x \\approx \\dfrac{x^2}{2}$.'],
    solution: [`$\\approx \\dfrac{${a}\\theta \\times ${b}\\theta}{\\tfrac{1}{2} \\times ${c * c}\\theta^2} = \\dfrac{${2 * a * b}}{${c * c}} = ${F(v)}$`],
  };
}

function smallAngleExpressions(rng: Rng, d: Difficulty): Out {
  const [a, b] = [rng.int(1, 5), rng.int(1, 5)];
  const A = a === 1 ? '' : `${a}`;
  const B = b === 1 ? '' : `${b}`;
  let expr: string;
  let p: Frac;
  let q: Frac;
  let r: Frac;
  let work: string;
  if (d === 1) {
    const plus = rng.chance(0.5);
    expr = `\\cos ${A}x ${plus ? '+' : '-'} \\sin ${B}x`;
    [p, q, r] = [frac(1), frac(plus ? b : -b), frac(-a * a, 2)];
    work = `$\\cos ${A}x \\approx 1 - \\dfrac{${a * a}x^2}{2}$ and $\\sin ${B}x \\approx ${B}x$.`;
  } else if (d === 2) {
    const k = rng.int(2, 5);
    expr = `${k} - ${k === 2 ? '' : ''}2\\cos ${A}x + \\tan ${B}x`;
    [p, q, r] = [frac(k - 2), frac(b), frac(a * a)];
    work = `$2\\cos ${A}x \\approx 2 - ${a * a}x^2$ and $\\tan ${B}x \\approx ${B}x$.`;
  } else {
    expr = `(1 + \\sin ${A}x)\\cos ${B}x`;
    [p, q, r] = [frac(1), frac(a), frac(-b * b, 2)];
    work = `$(1 + ${A}x)\\left(1 - \\dfrac{${b * b}x^2}{2}\\right) = 1 + ${A}x - \\dfrac{${b * b}x^2}{2} - \\ldots$, ignoring the $x^3$ term.`;
  }
  return {
    prompt: `When $x$ is small and measured in radians, $${expr} \\approx p + qx + rx^2$. Find $p$, $q$ and $r$.`,
    parts: [fracPart(p, '$p =$'), fracPart(q, '$q =$'), fracPart(r, '$r =$')],
    hints: ['$\\sin x \\approx x$, $\\tan x \\approx x$ and $\\cos x \\approx 1 - \\dfrac{x^2}{2}$; for $\\cos kx$, replace $x$ by $kx$, so $1 - \\dfrac{k^2x^2}{2}$.', 'Collect the constant, the $x$ terms and the $x^2$ terms.'],
    solution: [work, `So $p = ${F(p)}$, $q = ${F(q)}$ and $r = ${F(r)}$.`],
  };
}

// ---------------------------------------------------------------------------
// 18.2 Reciprocal and inverse trigonometric functions
// ---------------------------------------------------------------------------

const SPECIAL: Array<{ f: 'sec' | 'cosec' | 'cot'; deg: number; v: number }> = [
  { f: 'sec', deg: 60, v: 2 }, { f: 'sec', deg: 180, v: -1 }, { f: 'sec', deg: 120, v: -2 }, { f: 'sec', deg: 300, v: 2 }, { f: 'sec', deg: 0, v: 1 },
  { f: 'cosec', deg: 30, v: 2 }, { f: 'cosec', deg: 90, v: 1 }, { f: 'cosec', deg: 210, v: -2 }, { f: 'cosec', deg: 270, v: -1 }, { f: 'cosec', deg: 150, v: 2 },
  { f: 'cot', deg: 45, v: 1 }, { f: 'cot', deg: 135, v: -1 }, { f: 'cot', deg: 225, v: 1 }, { f: 'cot', deg: 90, v: 0 }, { f: 'cot', deg: 315, v: -1 },
];
const TRIPLES = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]];

function reciprocalTrig(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const s = rng.pick(SPECIAL);
    const base = { sec: '\\cos', cosec: '\\sin', cot: '\\tan' }[s.f];
    return {
      prompt: `Find the exact value of $\\${s.f === 'cosec' ? 'operatorname{cosec}' : s.f} ${s.deg}^\\circ$.`,
      parts: [numPart(s.v)],
      hints: ['$\\sec\\theta = \\dfrac{1}{\\cos\\theta}$, $\\operatorname{cosec}\\theta = \\dfrac{1}{\\sin\\theta}$ and $\\cot\\theta = \\dfrac{1}{\\tan\\theta} = \\dfrac{\\cos\\theta}{\\sin\\theta}$.', `Find $${base} ${s.deg}^\\circ$ first.`],
      solution: [s.f === 'cot' ? `$\\cot ${s.deg}^\\circ = \\dfrac{\\cos ${s.deg}^\\circ}{\\sin ${s.deg}^\\circ} = ${s.v}$` : `$${base} ${s.deg}^\\circ = ${F(frac(1, s.v))}$, so the value is $${s.v}$.`],
    };
  }
  if (d === 2) {
    const [p, q, h] = rng.pick(TRIPLES) as [number, number, number];
    const given = rng.pick(['tan', 'sin', 'cos'] as const);
    const want = rng.pick(['sec', 'cosec', 'cot'] as const);
    const obtuse = rng.chance(0.5);
    // θ acute with opposite p, adjacent q; or obtuse (cos and tan negative).
    const sgnC = obtuse ? -1 : 1;
    const vals = { sin: frac(p, h), cos: frac(sgnC * q, h), tan: frac(sgnC * p, q) };
    const ans = { sec: frac(sgnC * h, q), cosec: frac(h, p), cot: frac(sgnC * q, p) }[want];
    const wName = want === 'cosec' ? '\\operatorname{cosec}' : `\\${want}`;
    return {
      prompt: `Given that $\\${given}\\theta = ${F(vals[given])}$ and $\\theta$ is ${obtuse ? 'obtuse' : 'acute'}, find the exact value of $${wName}\\theta$.`,
      parts: [fracPart(ans)],
      hints: ['Draw a right-angled triangle with the given ratio and find the third side with Pythagoras’ theorem.', obtuse ? 'For an obtuse angle, $\\sin$ is positive and $\\cos$ and $\\tan$ are negative.' : 'For an acute angle, every ratio is positive.'],
      solution: [`The triangle has sides $${p}$, $${q}$ and $${h}$, so $\\sin\\theta = ${F(vals.sin)}$, $\\cos\\theta = ${F(vals.cos)}$ and $\\tan\\theta = ${F(vals.tan)}$.`, `$${wName}\\theta = ${F(ans)}$`],
    };
  }
  const f = rng.pick(['sec', 'cosec', 'cot'] as const);
  const k = rng.pick([1.5, 2.5, 3, 4, -1.5, -2.5, -3, -4]);
  let s1: number;
  let s2: number;
  if (f === 'sec') {
    s1 = acosD(1 / k);
    s2 = 360 - s1;
  } else if (f === 'cosec') {
    const a = asinD(1 / k);
    [s1, s2] = k > 0 ? [a, 180 - a] : [180 - a, 360 + a];
  } else {
    const a = atanD(1 / k);
    s1 = a < 0 ? a + 180 : a;
    s2 = s1 + 180;
  }
  const [lo, hi] = [Math.min(s1, s2), Math.max(s1, s2)];
  const base = { sec: '\\cos', cosec: '\\sin', cot: '\\tan' }[f];
  const fName = f === 'cosec' ? '\\operatorname{cosec}' : `\\${f}`;
  return {
    prompt: `Solve $${fName} x = ${fmt(k)}$ for $0^\\circ \\le x < 360^\\circ$. ${ANGLE_TEXT}`,
    parts: [numPart(lo, { label: 'Smaller solution:', decimals: 1, suffix: '°' }), numPart(hi, { label: 'Larger solution:', decimals: 1, suffix: '°' })],
    hints: [`Turn it round: $${base} x = \\dfrac{1}{${fmt(k)}}$.`, `Find one solution with the inverse function, then use the graph of $${base}$ to find the other in the interval.`],
    solution: [`$${base} x = \\dfrac{1}{${fmt(k)}} ${eq3(1 / k)}$`, `$x \\approx ${d1(lo)}^\\circ$ or $x \\approx ${d1(hi)}^\\circ$`],
    calculator: true,
  };
}

const INV: Array<{ f: 'arcsin' | 'arccos' | 'arctan'; arg: string; v: number; tex: string; neg: boolean }> = [
  { f: 'arcsin', arg: '\\tfrac{1}{2}', v: Math.PI / 6, tex: '\\dfrac{\\pi}{6}', neg: false },
  { f: 'arcsin', arg: '\\tfrac{\\sqrt{3}}{2}', v: Math.PI / 3, tex: '\\dfrac{\\pi}{3}', neg: false },
  { f: 'arcsin', arg: '1', v: Math.PI / 2, tex: '\\dfrac{\\pi}{2}', neg: false },
  { f: 'arccos', arg: '\\tfrac{1}{2}', v: Math.PI / 3, tex: '\\dfrac{\\pi}{3}', neg: false },
  { f: 'arccos', arg: '\\tfrac{\\sqrt{2}}{2}', v: Math.PI / 4, tex: '\\dfrac{\\pi}{4}', neg: false },
  { f: 'arccos', arg: '0', v: Math.PI / 2, tex: '\\dfrac{\\pi}{2}', neg: false },
  { f: 'arctan', arg: '1', v: Math.PI / 4, tex: '\\dfrac{\\pi}{4}', neg: false },
  { f: 'arctan', arg: '\\sqrt{3}', v: Math.PI / 3, tex: '\\dfrac{\\pi}{3}', neg: false },
  { f: 'arcsin', arg: '-\\tfrac{1}{2}', v: -Math.PI / 6, tex: '-\\dfrac{\\pi}{6}', neg: true },
  { f: 'arccos', arg: '-\\tfrac{1}{2}', v: (2 * Math.PI) / 3, tex: '\\dfrac{2\\pi}{3}', neg: true },
  { f: 'arccos', arg: '-\\tfrac{\\sqrt{3}}{2}', v: (5 * Math.PI) / 6, tex: '\\dfrac{5\\pi}{6}', neg: true },
  { f: 'arctan', arg: '-1', v: -Math.PI / 4, tex: '-\\dfrac{\\pi}{4}', neg: true },
  { f: 'arccos', arg: '-1', v: Math.PI, tex: '\\pi', neg: true },
  { f: 'arcsin', arg: '-\\tfrac{\\sqrt{2}}{2}', v: -Math.PI / 4, tex: '-\\dfrac{\\pi}{4}', neg: true },
];
const TRIG_NAME = { arcsin: 'sine', arccos: 'cosine', arctan: 'tangent' };
const RANGES = { arcsin: '-\\dfrac{\\pi}{2} \\le y \\le \\dfrac{\\pi}{2}', arccos: '0 \\le y \\le \\pi', arctan: '-\\dfrac{\\pi}{2} < y < \\dfrac{\\pi}{2}' };

function inverseTrig(rng: Rng, d: Difficulty): Out {
  if (d < 3) {
    const e = rng.pick(INV.filter((x) => x.neg === (d === 2)));
    return {
      prompt: `Find the exact value of $\\${e.f} \\left(${e.arg}\\right)$, in radians.`,
      parts: [numPart(e.v)],
      hints: [`$\\${e.f}$ gives the angle in the range $${RANGES[e.f]}$ whose ${TRIG_NAME[e.f]} is $${e.arg}$.`, 'Use the exact values of $\\dfrac{\\pi}{6}$, $\\dfrac{\\pi}{4}$ and $\\dfrac{\\pi}{3}$, and the symmetry of the graphs for negative values.'],
      solution: [`The angle in $${RANGES[e.f]}$ with ${TRIG_NAME[e.f]} $${e.arg}$ is $${e.tex}$.`],
    };
  }
  const [p, q, h] = rng.pick(TRIPLES) as [number, number, number];
  const kind = rng.int(0, 2);
  if (kind === 0) {
    return {
      prompt: `Find the exact value of $\\sin\\left(\\arccos ${F(frac(q, h))}\\right)$.`,
      parts: [fracPart(frac(p, h))],
      hints: [`Let $\\theta = \\arccos ${F(frac(q, h))}$, so $\\cos\\theta = ${F(frac(q, h))}$ and $\\theta$ is between $0$ and $\\pi$.`, 'Use $\\sin^2\\theta + \\cos^2\\theta = 1$; $\\sin\\theta \\ge 0$ in that range.'],
      solution: [`$\\sin\\theta = \\sqrt{1 - \\left(${F(frac(q, h))}\\right)^2} = ${F(frac(p, h))}$`],
    };
  }
  if (kind === 1) {
    return {
      prompt: `Find the exact value of $\\tan\\left(\\arcsin ${F(frac(p, h))}\\right)$.`,
      parts: [fracPart(frac(p, q))],
      hints: [`Let $\\theta = \\arcsin ${F(frac(p, h))}$: a right-angled triangle with opposite $${p}$ and hypotenuse $${h}$.`, 'Find the adjacent side with Pythagoras’ theorem.'],
      solution: [`The adjacent side is $\\sqrt{${h}^2 - ${p}^2} = ${q}$, so $\\tan\\theta = ${F(frac(p, q))}$.`],
    };
  }
  return {
    prompt: `Find the exact value of $\\cos\\left(\\arctan ${F(frac(p, q))}\\right)$.`,
    parts: [fracPart(frac(q, h))],
    hints: [`Let $\\theta = \\arctan ${F(frac(p, q))}$: a right-angled triangle with opposite $${p}$ and adjacent $${q}$.`, 'Find the hypotenuse with Pythagoras’ theorem.'],
    solution: [`The hypotenuse is $\\sqrt{${p}^2 + ${q}^2} = ${h}$, so $\\cos\\theta = ${F(frac(q, h))}$.`],
  };
}

// ---------------------------------------------------------------------------
// 18.3 a sin θ + b cos θ as R sin(θ ± α)
// ---------------------------------------------------------------------------

const R_TEXT = 'Give $R$ exactly if it is a whole number, otherwise to 3 significant figures, and $\\alpha$ to 1 decimal place.';
const coefPair = (rng: Rng) => (rng.chance(0.4) ? (rng.pick([[3, 4], [4, 3], [5, 12], [12, 5], [8, 15], [6, 8]]) as [number, number]) : ([rng.int(1, 9), rng.int(1, 9)] as [number, number]));

function rAlpha(rng: Rng, d: Difficulty): Out {
  const [a, b] = coefPair(rng);
  const R = Math.hypot(a, b);
  const al = atanD(b / a);
  const A = a === 1 ? '' : a;
  const Bc = b === 1 ? '' : b;
  const [lhs, form, compare] =
    d === 1
      ? [`${A}\\sin\\theta + ${Bc}\\cos\\theta`, 'R\\sin(\\theta + \\alpha)', `R\\sin(\\theta + \\alpha) = R\\cos\\alpha\\sin\\theta + R\\sin\\alpha\\cos\\theta$, so $R\\cos\\alpha = ${a}$ and $R\\sin\\alpha = ${b}`]
      : d === 2
        ? [`${A}\\cos\\theta + ${Bc}\\sin\\theta`, 'R\\cos(\\theta - \\alpha)', `R\\cos(\\theta - \\alpha) = R\\cos\\alpha\\cos\\theta + R\\sin\\alpha\\sin\\theta$, so $R\\cos\\alpha = ${a}$ and $R\\sin\\alpha = ${b}`]
        : [`${A}\\sin\\theta - ${Bc}\\cos\\theta`, 'R\\sin(\\theta - \\alpha)', `R\\sin(\\theta - \\alpha) = R\\cos\\alpha\\sin\\theta - R\\sin\\alpha\\cos\\theta$, so $R\\cos\\alpha = ${a}$ and $R\\sin\\alpha = ${b}`];
  return {
    prompt: `Write $${lhs}$ in the form $${form}$, where $R > 0$ and $0^\\circ < \\alpha < 90^\\circ$. ${R_TEXT}`,
    parts: [sfPart(R, { label: '$R =$' }), numPart(al, { label: '$\\alpha =$', decimals: 1, suffix: '°' })],
    hints: [`Expand $${form}$ with the compound angle formula and compare coefficients.`, '$R = \\sqrt{(R\\cos\\alpha)^2 + (R\\sin\\alpha)^2}$ and $\\tan\\alpha = \\dfrac{R\\sin\\alpha}{R\\cos\\alpha}$.'],
    solution: [`$${compare}$.`, `$R = \\sqrt{${a}^2 + ${b}^2} ${eq3(R)}$ and $\\tan\\alpha = \\dfrac{${b}}{${a}}$, so $\\alpha \\approx ${d1(al)}^\\circ$.`],
    calculator: true,
  };
}

function rAlphaApply(rng: Rng, d: Difficulty): Out {
  const [a, b] = coefPair(rng);
  const R = Math.hypot(a, b);
  const al = atanD(b / a);
  const A = a === 1 ? '' : a;
  const Bc = b === 1 ? '' : b;
  const expr = `${A}\\sin\\theta + ${Bc}\\cos\\theta`;
  const given = `$${expr} \\equiv ${s3(R)}\\sin(\\theta + ${d1(al)}^\\circ)$ (to 3 significant figures and 1 decimal place)`;
  if (d === 1) {
    const k = rng.int(-5, 20);
    return {
      prompt: `${given.charAt(0).toUpperCase()}${given.slice(1)}. Find the greatest and least values of $${k ? `${k} + ` : ''}${expr}$. ${SF_TEXT}`,
      parts: [sfPart(k + R, { label: 'Greatest:' }), sfPart(k - R, { label: 'Least:' })],
      hints: [`$\\sin$ of anything lies between $-1$ and $1$, so $R\\sin(\\theta + \\alpha)$ lies between $-R$ and $R$, with $R = \\sqrt{${a}^2 + ${b}^2}$.`, `Then add $${k}$.`],
      solution: [`$R = \\sqrt{${a * a + b * b}} ${eq3(R)}$`, `Greatest $= ${k} + R ${eq3(k + R)}$ and least $= ${k} - R ${eq3(k - R)}$.`],
      calculator: true,
    };
  }
  if (d === 2) {
    const th = 90 - al;
    return {
      prompt: `${given.charAt(0).toUpperCase()}${given.slice(1)}. Find the value of $\\theta$ between $0^\\circ$ and $360^\\circ$ at which $${expr}$ is greatest. ${ANGLE_TEXT}`,
      parts: [numPart(th, { decimals: 1, suffix: '°' })],
      hints: ['$\\sin(\\theta + \\alpha)$ is greatest, $1$, when $\\theta + \\alpha = 90^\\circ$.', 'Use the unrounded $\\alpha = \\tan^{-1}\\left(\\dfrac{b}{a}\\right)$.'],
      solution: [`$\\alpha = \\tan^{-1}\\dfrac{${b}}{${a}} \\approx ${d1(al)}^\\circ$`, `$\\theta + \\alpha = 90^\\circ$, so $\\theta \\approx ${d1(th)}^\\circ$.`],
      calculator: true,
    };
  }
  // Solutions of sin(θ + α) = c / R with θ in [0°, 360°), kept clear of the ends of the interval.
  const solve = (c: number) => {
    const base = asinD(c / R);
    return [base, 180 - base, base + 360, 540 - base].map((v) => v - al).filter((v) => v > 0.5 && v < 359.5).sort((p, q) => p - q);
  };
  const c = retry(() => roundTo((rng.int(-9, 9) / 10) * R, 0), (v) => Math.abs(v) < R - 0.2 && v !== 0 && solve(v).length === 2, 100);
  const [s1, s2] = solve(c) as [number, number];
  return {
    prompt: `${given.charAt(0).toUpperCase()}${given.slice(1)}. Solve $${expr} = ${c}$ for $0^\\circ \\le \\theta < 360^\\circ$. ${ANGLE_TEXT}`,
    parts: [numPart(s1, { label: 'Smaller solution:', decimals: 1, suffix: '°' }), numPart(s2, { label: 'Larger solution:', decimals: 1, suffix: '°' })],
    hints: [`Write the equation as $R\\sin(\\theta + \\alpha) = ${c}$, so $\\sin(\\theta + \\alpha) = \\dfrac{${c}}{R}$.`, `$\\theta + \\alpha$ runs from $\\alpha$ to $360^\\circ + \\alpha$; find both solutions in that range, then subtract $\\alpha$.`],
    solution: [`$\\sin(\\theta + \\alpha) = \\dfrac{${c}}{\\sqrt{${a * a + b * b}}}$, so $\\theta + \\alpha \\approx ${d1(s1 + al)}^\\circ$ or $${d1(s2 + al)}^\\circ$.`, `Subtracting $\\alpha \\approx ${d1(al)}^\\circ$: $\\theta \\approx ${d1(s1)}^\\circ$ or $${d1(s2)}^\\circ$.`],
    calculator: true,
  };
}

export const PURE_SKILLS: SkillDef[] = [
  skill({ id: 'mx-proof-method', name: 'Methods of proof', description: 'Recognize proof by exhaustion, deduction and contradiction and disproof by counterexample, and choose the cases for a proof by exhaustion', outcomes: ['PF1'], lessonId: 'mx-16-1', format: 'mc', gen: proofMethod }),
  skill({ id: 'mx-exhaustion-cases', name: 'Checking cases', description: 'Check every case, find remainders of n = mk + r, and find counterexamples', outcomes: ['PF1'], lessonId: 'mx-16-1', gen: exhaustionCases }),
  skill({ id: 'mx-triangle-area-sine', name: 'The area of a triangle', description: 'Use area = ½ab sin C to find an area, an angle or a side', outcomes: ['PF2'], lessonId: 'mx-16-2', calculator: true, gen: triangleAreaSine }),
  skill({ id: 'mx-triangle-area-problems', name: 'Areas with the sine and cosine rules', description: 'Find the areas of parallelograms and of triangles from three sides, and obtuse angles from an area', outcomes: ['PF2'], lessonId: 'mx-16-2', calculator: true, gen: triangleAreaProblems }),
  skill({ id: 'mx-log-power', name: 'Logarithmic graphs of y = axⁿ', description: 'Find a and n from a graph of log y against log x, or from two data points', outcomes: ['PF3'], lessonId: 'mx-16-3', calculator: true, gen: logPower }),
  skill({ id: 'mx-log-exp', name: 'Logarithmic graphs of y = kbˣ', description: 'Find k and b from a graph of log y against x, or from two data points', outcomes: ['PF3'], lessonId: 'mx-16-3', calculator: true, gen: logExp }),
  skill({ id: 'mx-contradiction-logic', name: 'Proof by contradiction', description: 'Start a proof by contradiction, recognize the contradiction, and negate statements', outcomes: ['AL1'], lessonId: 'mx-17-1', format: 'mc', gen: contradictionLogic }),
  skill({ id: 'mx-contradiction-primes', name: 'The infinity of primes', description: 'Work through the numbers in Euclid’s proof that there are infinitely many primes', outcomes: ['AL1'], lessonId: 'mx-17-1', gen: contradictionPrimes }),
  skill({ id: 'mx-partial-fractions', name: 'Partial fractions', description: 'Split a fraction with linear factors, including a repeated factor, into partial fractions', outcomes: ['AL2'], lessonId: 'mx-17-2', gen: partialFractions }),
  skill({ id: 'mx-partial-improper', name: 'More partial fractions', description: 'Split improper fractions and fractions with three linear factors into partial fractions', outcomes: ['AL2'], lessonId: 'mx-17-2', gen: partialImproper }),
  skill({ id: 'mx-sigma', name: 'Sigma notation', description: 'Evaluate arithmetic and geometric series written in sigma notation', outcomes: ['AL3'], lessonId: 'mx-17-3', gen: sigma }),
  skill({ id: 'mx-recurrence', name: 'Recurrence relations', description: 'Find terms of sequences defined by recurrence relations, including periodic sequences', outcomes: ['AL3'], lessonId: 'mx-17-3', gen: recurrence }),
  skill({ id: 'mx-binomial-rational', name: 'The binomial expansion for rational n', description: 'Find coefficients in the expansion of (a + bx)ⁿ for negative and fractional n', outcomes: ['AL4'], lessonId: 'mx-17-4', gen: binomialRational }),
  skill({ id: 'mx-binomial-validity', name: 'Validity and approximations', description: 'Find where a binomial expansion is valid, and use it to estimate a power', outcomes: ['AL4'], lessonId: 'mx-17-4', gen: binomialValidity }),
  skill({ id: 'mx-vectors-3d', name: 'Vectors in three dimensions', description: 'Find magnitudes, distances, and angles with the axes in three dimensions', outcomes: ['AL5'], lessonId: 'mx-17-5', calculator: true, gen: vectors3d }),
  skill({ id: 'mx-vectors-3d-geometry', name: 'Geometry with 3D vectors', description: 'Find vectors between points, midpoints and the fourth vertex of a parallelogram in three dimensions', outcomes: ['AL5'], lessonId: 'mx-17-5', gen: vectors3dGeometry }),
  skill({ id: 'mx-small-angle-values', name: 'Small-angle approximations', description: 'Estimate trigonometric values and limits with sin θ ≈ θ, cos θ ≈ 1 − θ²/2 and tan θ ≈ θ', outcomes: ['TR1'], lessonId: 'mx-18-1', gen: smallAngleValues }),
  skill({ id: 'mx-small-angle-expressions', name: 'Approximating expressions', description: 'Approximate trigonometric expressions by quadratics in a small angle', outcomes: ['TR1'], lessonId: 'mx-18-1', gen: smallAngleExpressions }),
  skill({ id: 'mx-reciprocal-trig', name: 'Sec, cosec and cot', description: 'Find exact values of sec, cosec and cot, and solve equations with them', outcomes: ['TR2'], lessonId: 'mx-18-2', gen: reciprocalTrig }),
  skill({ id: 'mx-inverse-trig', name: 'Arcsin, arccos and arctan', description: 'Find exact values of the inverse trigonometric functions in their ranges', outcomes: ['TR2'], lessonId: 'mx-18-2', gen: inverseTrig }),
  skill({ id: 'mx-r-alpha', name: 'R sin(θ ± α)', description: 'Write a sin θ ± b cos θ as R sin(θ ± α) or R cos(θ − α)', outcomes: ['TR3'], lessonId: 'mx-18-3', calculator: true, gen: rAlpha }),
  skill({ id: 'mx-r-alpha-apply', name: 'Using R sin(θ + α)', description: 'Find the greatest and least values of a sin θ + b cos θ and solve equations with it', outcomes: ['TR3'], lessonId: 'mx-18-3', calculator: true, gen: rAlphaApply }),
];

