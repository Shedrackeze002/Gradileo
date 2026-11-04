/** More Mathematics Topics, Unit 4: complex numbers, complex solutions and polynomial identities. */
import { mc, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, gcd } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Part, SkillDef } from '../../../types.ts';
import { pm } from './common.ts';

type Out = GenOutput;

/** a + bi inside maths: 3 - 2i, -i, 4, 5i. */
export function cx(a: number, b: number): string {
  const im = b === 0 ? '' : b === 1 ? 'i' : b === -1 ? '-i' : `${fmt(b)}i`;
  if (a === 0) return im || '0';
  if (b === 0) return fmt(a);
  return `${fmt(a)} ${b < 0 ? '-' : '+'} ${Math.abs(b) === 1 ? '' : fmt(Math.abs(b))}i`;
}
const br = (a: number, b: number) => `(${cx(a, b)})`;
/** A number to square, in brackets when negative: (-6)^2, not -6^2. */
const sq = (n: number) => (n < 0 ? `(${n})^2` : `${n}^2`);
/** A term c·v with its sign, leaving out a coefficient of 1: ' - x^2', ' + 11x'. */
const term = (c: number, v: string) => (c === 0 ? '' : ` ${c < 0 ? '-' : '+'} ${Math.abs(c) === 1 ? '' : Math.abs(c)}${v}`);
/** Real and imaginary parts as two answer boxes. */
const parts = (a: number, b: number): Part[] => [numPart(a, { label: 'Real part:' }), numPart(b, { label: 'Imaginary part (the number before $i$):' })];

const I_HINT = 'Treat $i$ like a variable, then replace $i^2$ with $-1$.';

// ---------------------------------------------------------------------------
// 4.1 Complex numbers
// ---------------------------------------------------------------------------

function complexArith(rng: Rng, d: Difficulty): Out {
  const a = rng.nonZero(-9, 9), b = rng.nonZero(-9, 9), c = rng.nonZero(-9, 9), e = rng.nonZero(-9, 9);
  const op = d === 1 ? rng.pick(['+', '-'] as const) : d === 2 ? '×' : rng.pick(['sq', 'power'] as const);
  if (op === '+' || op === '-') {
    const s = op === '+' ? 1 : -1;
    return {
      prompt: `Simplify $${br(a, b)} ${op} ${br(c, e)}$. Write the answer as $a + bi$.`,
      parts: parts(a + s * c, b + s * e),
      hints: ['Add or subtract the real parts, and add or subtract the imaginary parts, as with like terms.', op === '-' ? 'The minus sign applies to both parts of the second number.' : 'Real parts go with real parts, $i$ terms with $i$ terms.'],
      solution: [`Real parts: $${a} ${op} ${c < 0 ? `(${c})` : c} = ${a + s * c}$`, `Imaginary parts: $${b} ${op} ${e < 0 ? `(${e})` : e} = ${b + s * e}$`, `$${br(a, b)} ${op} ${br(c, e)} = ${cx(a + s * c, b + s * e)}$`],
    };
  }
  if (op === '×') {
    const re = a * c - b * e;
    const im = a * e + b * c;
    return {
      prompt: `Multiply $${br(a, b)}${br(c, e)}$. Write the answer as $a + bi$.`,
      parts: parts(re, im),
      hints: ['Expand the brackets as with binomials: four products.', I_HINT],
      solution: [
        `$${br(a, b)}${br(c, e)} = ${a * c} ${pm(a * e)}i ${pm(b * c)}i ${pm(b * e)}i^2$`,
        `Since $i^2 = -1$: $${b * e}i^2 = ${-b * e}$.`,
        `Real part: $${a * c} ${pm(-b * e)} = ${re}$. Imaginary part: $${a * e} ${pm(b * c)} = ${im}$.`,
        `The product is $${cx(re, im)}$.`,
      ],
    };
  }
  if (op === 'sq') {
    const re = a * a - b * b;
    const im = 2 * a * b;
    return {
      prompt: `Simplify $${br(a, b)}^2$. Write the answer as $a + bi$.`,
      parts: parts(re, im),
      hints: ['$(a + bi)^2 = a^2 + 2abi + b^2 i^2$.', I_HINT],
      solution: [`$${br(a, b)}^2 = ${a * a} ${pm(2 * a * b)}i ${pm(b * b)}i^2$`, `$${b * b}i^2 = ${-b * b}$, so the real part is $${a * a} - ${b * b} = ${re}$.`, `$${br(a, b)}^2 = ${cx(re, im)}$`],
    };
  }
  const n = rng.int(5, 40);
  const r = n % 4;
  const val: [number, number] = [[1, 0], [0, 1], [-1, 0], [0, -1]][r] as [number, number];
  return {
    prompt: `Simplify $i^{${n}}$. Write the answer as $a + bi$.`,
    parts: parts(val[0], val[1]),
    hints: ['The powers of $i$ repeat every four: $i^1 = i$, $i^2 = -1$, $i^3 = -i$, $i^4 = 1$.', `Divide the exponent by $4$ and use the remainder.`],
    solution: [`$${n} = 4 \\times ${(n - r) / 4} + ${r}$, so $i^{${n}} = (i^4)^{${(n - r) / 4}} \\times i^{${r}} = i^{${r}}$.`, `$i^{${r}} = ${cx(val[0], val[1])}$`],
  };
}

function complexDivide(rng: Rng, d: Difficulty): Out {
  // Choose the answer first, so that the quotient has whole-number parts.
  const p = rng.nonZero(-6, 6), q = rng.nonZero(-6, 6);
  const c = rng.nonZero(-5, 5), e = d === 1 ? 0 : rng.nonZero(-5, 5);
  if (d === 1) {
    // Conjugates and the product of a number with its conjugate.
    const a = rng.nonZero(-9, 9), b = rng.nonZero(-9, 9);
    return {
      prompt: `Write the complex conjugate of $${cx(a, b)}$, and find the product of $${cx(a, b)}$ and its conjugate.`,
      parts: [numPart(a, { label: 'Conjugate, real part:' }), numPart(-b, { label: 'Conjugate, imaginary part:' }), numPart(a * a + b * b, { label: 'Product:' })],
      hints: ['The conjugate of $a + bi$ is $a - bi$: the sign of the imaginary part changes.', '$(a + bi)(a - bi) = a^2 + b^2$, a real number.'],
      solution: [`The conjugate of $${cx(a, b)}$ is $${cx(a, -b)}$.`, `$${br(a, b)}${br(a, -b)} = ${sq(a)} + ${sq(Math.abs(b))} = ${a * a} + ${b * b} = ${a * a + b * b}$`],
    };
  }
  // Numerator (p + qi)(c + ei).
  const na = p * c - q * e;
  const nb = p * e + q * c;
  const den = c * c + e * e;
  return {
    prompt: `Divide: $\\dfrac{${cx(na, nb)}}{${cx(c, e)}}$. Write the answer as $a + bi$.`,
    parts: parts(p, q),
    hints: ['Multiply the top and the bottom by the conjugate of the bottom.', `The conjugate of $${cx(c, e)}$ is $${cx(c, -e)}$, and $${br(c, e)}${br(c, -e)} = ${den}$.`],
    solution: [
      `Multiply by $\\dfrac{${cx(c, -e)}}{${cx(c, -e)}}$.`,
      `Bottom: $${sq(c)} + ${sq(Math.abs(e))} = ${den}$.`,
      `Top: $${br(na, nb)}${br(c, -e)} = ${cx(na * c + nb * e, nb * c - na * e)}$`,
      `Divide each part by $${den}$: $${cx(p, q)}$`,
    ],
  };
}

// ---------------------------------------------------------------------------
// 4.2 Complex solutions of quadratic equations
// ---------------------------------------------------------------------------

function complexRoots(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const k = rng.int(1, 12);
    const m = rng.pick([1, 1, 2, 3]);
    const c = m * k * k;
    return {
      prompt: `Solve $${m === 1 ? '' : m}x^2 + ${c} = 0$. Give the solution with the positive imaginary part as $a + bi$.`,
      parts: parts(0, k),
      hints: ['Get $x^2$ on its own, then take square roots of both sides.', '$\\sqrt{-n} = i\\sqrt{n}$.'],
      solution: [`$${m === 1 ? '' : m}x^2 = ${-c}$${m === 1 ? '' : `, so $x^2 = ${-k * k}$`}.`, `$x = \\pm\\sqrt{${-k * k}} = \\pm ${k === 1 ? '' : k}i$`, `The solutions are $${cx(0, k)}$ and $${cx(0, -k)}$.`],
    };
  }
  // x^2 + bx + c = 0 with roots p ± qi; hard questions have a leading coefficient.
  const p = rng.int(-6, 6);
  const q = rng.int(1, 6);
  const a = d === 3 ? rng.pick([2, 3]) : 1;
  const b = -2 * p * a;
  const c = (p * p + q * q) * a;
  const disc = b * b - 4 * a * c;
  const eqn = `${a === 1 ? '' : a}x^2 ${b ? `${pm(b)}x` : ''} ${pm(c)} = 0`;
  return {
    prompt: `Solve $${eqn}$. Give the solution with the positive imaginary part as $a + bi$.`,
    parts: parts(p, q),
    hints: ['Use the quadratic formula: $x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.', 'A negative discriminant gives two complex solutions: $\\sqrt{-n} = i\\sqrt{n}$.'],
    solution: [
      `Discriminant: $b^2 - 4ac = ${b * b} - ${4 * a * c} = ${disc}$, which is negative, so the solutions are complex.`,
      `$\\sqrt{${disc}} = ${Math.sqrt(-disc)}i$`,
      `$x = \\dfrac{${-b} \\pm ${Math.sqrt(-disc)}i}{${2 * a}} = ${cx(p, q)}$ or $${cx(p, -q)}$`,
    ],
  };
}

// ---------------------------------------------------------------------------
// 4.3 Polynomial identities and the fundamental theorem of algebra
// ---------------------------------------------------------------------------

function polyIdentity(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const n = rng.int(21, 99);
    const k = rng.int(1, 9);
    const sq = rng.chance(0.5);
    return sq
      ? {
          prompt: `Use the identity $(a + b)^2 = a^2 + 2ab + b^2$ to work out $${n + k}^2$ without a calculator, with $a = ${n}$ and $b = ${k}$.`,
          parts: [numPart((n + k) ** 2, { exact: false })],
          hints: ['Substitute $a$ and $b$ into the right side.', `$${n}^2 = ${n * n}$, $2 \\times ${n} \\times ${k} = ${2 * n * k}$, $${k}^2 = ${k * k}$.`],
          solution: [`$${n + k}^2 = ${n}^2 + 2(${n})(${k}) + ${k}^2 = ${n * n} + ${2 * n * k} + ${k * k} = ${(n + k) ** 2}$`],
        }
      : {
          prompt: `Use the identity $a^2 - b^2 = (a + b)(a - b)$ to work out $${n + k}^2 - ${n - k}^2$ without a calculator.`,
          parts: [numPart((n + k) ** 2 - (n - k) ** 2, { exact: false })],
          hints: ['Here $a$ and $b$ are the two numbers being squared.', `$a + b = ${2 * n}$ and $a - b = ${2 * k}$.`],
          solution: [`$${n + k}^2 - ${n - k}^2 = (${n + k} + ${n - k})(${n + k} - ${n - k}) = ${2 * n} \\times ${2 * k} = ${4 * n * k}$`],
        };
  }
  if (d === 2) {
    // Which identity is true?
    const items = [
      { t: '(a + b)^2 = a^2 + 2ab + b^2', ok: true },
      { t: '(a - b)^2 = a^2 - 2ab + b^2', ok: true },
      { t: 'a^2 - b^2 = (a + b)(a - b)', ok: true },
      { t: 'a^3 + b^3 = (a + b)(a^2 - ab + b^2)', ok: true },
      { t: 'a^3 - b^3 = (a - b)(a^2 + ab + b^2)', ok: true },
      { t: '(x^2 + y^2)^2 = (x^2 - y^2)^2 + (2xy)^2', ok: true },
      { t: '(a + b)^2 = a^2 + b^2', ok: false },
      { t: '(a - b)^2 = a^2 - b^2', ok: false },
      { t: 'a^3 + b^3 = (a + b)^3', ok: false },
      { t: 'a^2 + b^2 = (a + b)(a - b)', ok: false },
      { t: 'a^3 - b^3 = (a - b)(a^2 - ab + b^2)', ok: false },
    ];
    const askTrue = rng.chance(0.5);
    const right = rng.pick(items.filter((x) => x.ok === askTrue));
    const wrong = rng.shuffle(items.filter((x) => x.ok !== askTrue)).slice(0, 3);
    return {
      prompt: askTrue ? 'Which of these is an identity (true for every value of the letters)?' : 'Which of these is **not** an identity?',
      parts: [{ answer: mc(rng, `$${right.t}$`, wrong.map((x) => `$${x.t}$`)) }],
      hints: ['An identity is true for **every** value of its letters. One counterexample shows that an equation is not an identity.', 'Try $a = 1$ and $b = 1$ (or $a = 2$, $b = 1$) in each one.'],
      solution: askTrue
        ? [`$${right.t}$ is true for all values: expand the right side to check.`, 'Each of the others fails for some values; for example, $a = 2$, $b = 1$ gives different sides.']
        : [`Try $a = 2$ and $b = 1$ in $${right.t}$: the two sides are not equal, so it is not an identity.`, 'The others expand correctly, so they hold for every value.'],
    };
  }
  // Pythagorean triples from (x² + y²)² = (x² − y²)² + (2xy)².
  const x = rng.int(2, 9);
  const y = retry(() => rng.int(1, x - 1), (v) => gcd(v, x) === 1);
  return {
    prompt: `The identity $(x^2 + y^2)^2 = (x^2 - y^2)^2 + (2xy)^2$ makes Pythagorean triples. Use it with $x = ${x}$ and $y = ${y}$: find the two legs and the hypotenuse of the right triangle it gives.`,
    parts: [numPart(x * x - y * y, { label: 'Leg $x^2 - y^2$:' }), numPart(2 * x * y, { label: 'Leg $2xy$:' }), numPart(x * x + y * y, { label: 'Hypotenuse $x^2 + y^2$:' })],
    hints: ['Substitute $x$ and $y$ into each of the three expressions.', 'Check with the Pythagorean theorem: the squares of the legs add up to the square of the hypotenuse.'],
    solution: [
      `$x^2 - y^2 = ${x * x} - ${y * y} = ${x * x - y * y}$, $2xy = 2(${x})(${y}) = ${2 * x * y}$, $x^2 + y^2 = ${x * x + y * y}$.`,
      `Check: $${x * x - y * y}^2 + ${2 * x * y}^2 = ${(x * x - y * y) ** 2 + (2 * x * y) ** 2} = ${x * x + y * y}^2$.`,
    ],
  };
}

function fta(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const n = rng.int(2, 7);
    const real = rng.int(0, n);
    const ok = (n - real) % 2 === 0;
    const r = ok ? real : real - 1;
    const nonreal = n - r;
    return {
      prompt: `A polynomial with real coefficients has degree $${n}$ and exactly $${r}$ real roots (counted with multiplicity). How many roots does it have altogether, and how many are not real?`,
      parts: [numPart(n, { label: 'Roots altogether:' }), numPart(nonreal, { label: 'Non-real roots:' })],
      hints: ['The **fundamental theorem of algebra**: a polynomial of degree $n$ has exactly $n$ complex roots, counted with multiplicity.', 'Real numbers are complex numbers too; the non-real roots are the rest.'],
      solution: [`By the fundamental theorem of algebra, a degree $${n}$ polynomial has $${n}$ roots.`, `$${r}$ are real, so $${n} - ${r} = ${nonreal}$ are not real (and they come in conjugate pairs).`],
    };
  }
  // A real cubic with a known complex root a + bi and a real root r.
  const a = rng.int(-4, 4);
  const b = rng.int(1, 5);
  const r = rng.nonZero(-6, 6);
  // (x^2 - 2ax + a^2 + b^2)(x - r) = x^3 + B x^2 + C x + D
  const s = -2 * a, t = a * a + b * b;
  const B = s - r, C = t - r * s, D = -r * t;
  const poly = `x^3${term(B, 'x^2')}${term(C, 'x')}${D ? ` ${pm(D)}` : ''}`;
  const parts: Part[] = [numPart(a, { label: 'Another root, real part:' }), numPart(-b, { label: 'Another root, imaginary part:' })];
  const sol = [`The coefficients are real, so the conjugate $${cx(a, -b)}$ is also a root.`];
  if (d === 3) {
    parts.push(numPart(r, { label: 'The real root:' }));
    sol.push(
      `The two complex roots give the factor $(x - (${cx(a, b)}))(x - (${cx(a, -b)})) = x^2${term(s, 'x')} ${pm(t)}$.`,
      `The constant term is $${D}$, and $${t} \\times (-r) = ${D}$, so $r = ${r}$: the third factor is $x ${pm(-r)}$.`,
    );
  }
  return {
    prompt: `The polynomial $p(x) = ${poly}$ has real coefficients, and $${cx(a, b)}$ is a root. ${d === 3 ? 'Find another non-real root, and the real root.' : 'Find another root.'}`,
    parts,
    hints: ['Non-real roots of a polynomial with real coefficients come in conjugate pairs: $a + bi$ and $a - bi$.', d === 3 ? 'Multiply out the factor from the two complex roots, then compare constant terms (or divide) to find the third factor.' : 'Change the sign of the imaginary part.'],
    solution: sol,
  };
}

export const COMPLEX_SKILLS: SkillDef[] = [
  skill({ id: 'mx-complex-arith', name: 'Add, subtract and multiply complex numbers', description: 'Add, subtract, multiply and square complex numbers, and simplify powers of i', outcomes: ['CX1'], lessonId: 'mx-4-1', gen: complexArith }),
  skill({ id: 'mx-complex-divide', name: 'Conjugates and dividing complex numbers', description: 'Use conjugates to divide complex numbers', outcomes: ['CX1'], lessonId: 'mx-4-1', gen: complexDivide }),
  skill({ id: 'mx-complex-roots', name: 'Complex solutions of quadratic equations', description: 'Solve quadratic equations with a negative discriminant', outcomes: ['CX2'], lessonId: 'mx-4-2', gen: complexRoots }),
  skill({ id: 'mx-poly-identity', name: 'Polynomial identities', description: 'Recognize and use polynomial identities', outcomes: ['CX3'], lessonId: 'mx-4-3', gen: polyIdentity }),
  skill({ id: 'mx-fta', name: 'The fundamental theorem of algebra', description: 'Count the roots of a polynomial and use conjugate pairs to find roots', outcomes: ['CX3'], lessonId: 'mx-4-3', gen: fta }),
];

