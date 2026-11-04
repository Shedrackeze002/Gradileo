/** More Mathematics Topics, Unit 2: scientific notation, and linear and exponential growth. */
import { fixedChoice, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, Part, SkillDef } from '../../../types.ts';
import { N } from './common.ts';

type Out = GenOutput;

const T = '\\times';
/** a × 10^n inside maths. */
const sci = (a: number, n: number) => `${fmt(a)} ${T} 10^{${n}}`;
/** A number written out in full inside maths (thin spaces between groups of three, both sides of the point). */
function full(x: number): string {
  const neg = x < 0;
  const s = Math.abs(x).toFixed(12).replace(/0+$/, '').replace(/\.$/, '');
  const [int, dec = ''] = s.split('.');
  const g = int!.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,');
  const d = dec.replace(/(\d{3})(?=\d)/g, '$1\\,');
  return `${neg ? '-' : ''}${g}${d ? `.${d}` : ''}`;
}
/** c × 10^n with c moved to between 1 and 10: [coefficient, exponent, how far the exponent moved]. */
function normalize(c: number, n: number): [number, number, number] {
  const shift = Math.floor(Math.log10(c) + 1e-9);
  return [roundTo(c / 10 ** shift, 6), n + shift, shift];
}
/** a·10^n as a plain number, without floating-point noise. */
const value = (a: number, n: number) => Number((a * 10 ** n).toPrecision(12));

/** A coefficient with 1 to 3 significant figures, from 1 to under 10. */
function coefficient(rng: Rng, sig: number): number {
  return retry(() => roundTo(rng.int(10 ** (sig - 1), 10 ** sig - 1) / 10 ** (sig - 1), sig - 1), (a) => a >= 1 && a < 10 && (sig === 1 || !Number.isInteger(a)), 50);
}

const SCI_HINT = 'In scientific notation a number is written as $a \\times 10^{n}$, where $1 \\le a < 10$ and $n$ is a whole number (an integer).';
const MOVE_HINT = 'Count how many places the decimal point moves to give a number from $1$ to $10$. Moving it left for a large number gives a positive exponent; moving it right for a small number gives a negative one.';

// Invented measurements (no real-world figure is claimed), so any size of number fits.
const BIG = ['A space probe has travelled', 'A video website has counted', 'A factory has made', 'A model of a sand dune estimates that it holds', 'A survey estimates that a forest has'];
const SMALL = ['A scientist measures a particle with a mass of', 'A machine part must be made to within', 'A chemical sample has a mass of', 'A camera shutter can open for', 'The wires on a microchip are'];
const BIG_UNITS = ['km', 'views', 'screws', 'grains of sand', 'leaves'];
const SMALL_UNITS = ['g', 'mm', 'kg', 's', 'm wide'];

function sciWrite(rng: Rng, d: Difficulty): Out {
  const big = d === 1 || (d === 3 ? rng.chance(0.5) : rng.chance(0.3));
  const a = coefficient(rng, d === 1 ? rng.int(1, 2) : rng.int(2, 3));
  const n = big ? rng.int(d === 1 ? 3 : 4, d === 3 ? 12 : 8) : -rng.int(d === 2 ? 2 : 3, d === 3 ? 9 : 6);
  const x = value(a, n);
  const i = rng.int(0, BIG.length - 1);
  const lead = big ? BIG[i]! : SMALL[i]!;
  const unit = big ? BIG_UNITS[i]! : SMALL_UNITS[i]!;
  // A hard question may start from a number written with a power of ten that is not in scientific notation.
  const fromPower = d === 3 && rng.chance(0.4);
  const k = rng.pick([1, 2, 3]);
  const shown = fromPower ? `$${fmt(roundTo(a * 10 ** k, 6))} ${T} 10^{${n - k}}$` : `$${full(x)}$ ${unit}`;
  return {
    prompt: fromPower
      ? `The number ${shown} is not in scientific notation. Write it in scientific notation, $a ${T} 10^{n}$.`
      : `${lead} ${shown}. Write the number in scientific notation, $a ${T} 10^{n}$.`,
    parts: [numPart(a, { label: '$a$ =', exact: false }), numPart(n, { label: '$n$ =', exact: false })],
    hints: [SCI_HINT, fromPower ? `$${fmt(roundTo(a * 10 ** k, 6))}$ is not between $1$ and $10$. Write it as $${fmt(a)} ${T} 10^{${k}}$, then add the exponents.` : MOVE_HINT],
    solution: fromPower
      ? [`$${fmt(roundTo(a * 10 ** k, 6))} = ${sci(a, k)}$`, `So the number is $${fmt(a)} ${T} 10^{${k}} ${T} 10^{${n - k}} = ${sci(a, n)}$ (add the exponents: $${k} + (${n - k}) = ${n}$).`]
      : [
          `Place the decimal point after the first non-zero digit to get $a = ${fmt(a)}$, which is from $1$ to $10$.`,
          big ? `The point moved $${n}$ places to the left, so the number is $${fmt(a)}$ times $10^{${n}}$.` : `The point moved $${-n}$ places to the right, so the number is $${fmt(a)}$ divided by $10^{${-n}}$, which is $${fmt(a)} ${T} 10^{${n}}$.`,
          `$${full(x)} = ${sci(a, n)}$`,
        ],
  };
}

function sciStandard(rng: Rng, d: Difficulty): Out {
  const a = coefficient(rng, rng.int(2, 3));
  const n = d === 1 ? rng.int(2, 6) : d === 2 ? -rng.int(2, 5) : rng.pick([rng.int(5, 9), -rng.int(4, 7)]);
  const x = value(a, n);
  return {
    prompt: `Write $${sci(a, n)}$ as an ordinary number (in standard form, without a power of ten).`,
    parts: [numPart(x, { exact: false })],
    hints: [n > 0 ? `Multiplying by $10^{${n}}$ moves the decimal point $${n}$ places to the right.` : `Multiplying by $10^{${n}}$ is dividing by $10^{${-n}}$: it moves the decimal point $${-n}$ places to the left.`, 'Fill any empty places with zeros.'],
    solution: [
      n > 0 ? `Move the decimal point in $${fmt(a)}$ $${n}$ places to the right, adding zeros as needed.` : `Move the decimal point in $${fmt(a)}$ $${-n}$ places to the left, adding zeros after the point.`,
      `$${sci(a, n)} = ${full(x)}$`,
    ],
  };
}

/** Coefficients with one decimal place whose product or quotient is exact. */
function sciMultiply(rng: Rng, d: Difficulty): Out {
  const divide = d >= 2 && rng.chance(0.5);
  const A = rng.int(11, 95);
  const B = rng.int(11, 95);
  const a = A / 10;
  const b = B / 10;
  // Word problems need sensible sizes: a count of cells with a power of 10 above 2, a tiny mass, a large total.
  const word = d === 3;
  const m = word ? rng.int(4, 12) : rng.int(-6, 9);
  const n = word ? (divide ? rng.int(-8, -2) : rng.int(-12, -4)) : rng.int(-6, 9);
  if (!divide) {
    const p = roundTo(a * b, 4);
    const [coef, exp, shift] = normalize(p, m + n);
    return {
      prompt: word
        ? `A colony has $${sci(a, m)}$ cells, and each cell has a mass of $${sci(b, n)}$ grams. Find the total mass of the cells in grams. Write the answer in scientific notation, $a ${T} 10^{n}$.`
        : `Find the product. Write the answer in scientific notation, $a ${T} 10^{n}$.\n\n$$(${sci(a, m)})(${sci(b, n)})$$`,
      parts: [numPart(coef, { label: '$a$ =', exact: false }), numPart(exp, { label: '$n$ =', exact: false })],
      hints: ['Multiply the numbers in front, and add the exponents of $10$: $10^{m} \\times 10^{n} = 10^{m+n}$.', 'If the number in front is $10$ or more, divide it by $10$ and add $1$ to the exponent.'],
      solution: [
        `$${fmt(a)} ${T} ${fmt(b)} = ${fmt(p)}$ and $10^{${m}} ${T} 10^{${n}} = 10^{${m + n}}$`,
        shift ? `$${fmt(p)} ${T} 10^{${m + n}} = ${fmt(coef)} ${T} 10^{1} ${T} 10^{${m + n}} = ${sci(coef, exp)}$` : `The number in front is already from $1$ to $10$: $${sci(coef, exp)}$`,
      ],
    };
  }
  // Division: choose the quotient first so that it is exact.
  const q = rng.int(11, 95) / 10;
  // The dividend's number in front, q × b, written from 1 to 10.
  const [top] = normalize(roundTo(q * b, 4), 0);
  const qq = roundTo(top / b, 6);
  const [coef, exp, shift] = normalize(qq, m - n);
  return {
    prompt: word
      ? `A pile of sand has a mass of $${sci(top, m)}$ grams, and one grain of the sand has a mass of about $${sci(b, n)}$ grams. About how many grains are in the pile? Write the answer in scientific notation, $a ${T} 10^{n}$.`
      : `Find the quotient. Write the answer in scientific notation, $a ${T} 10^{n}$.\n\n$$\\frac{${sci(top, m)}}{${sci(b, n)}}$$`,
    parts: [numPart(coef, { label: '$a$ =', exact: false }), numPart(exp, { label: '$n$ =', exact: false })],
    hints: ['Divide the numbers in front, and subtract the exponents of $10$: $10^{m} \\div 10^{n} = 10^{m-n}$.', 'If the number in front is less than $1$, multiply it by $10$ and subtract $1$ from the exponent.'],
    solution: [
      `$${fmt(top)} \\div ${fmt(b)} = ${fmt(qq)}$ and $10^{${m}} \\div 10^{${n}} = 10^{${m - n}}$`,
      shift ? `$${fmt(qq)} ${T} 10^{${m - n}} = ${fmt(coef)} ${T} 10^{-1} ${T} 10^{${m - n}} = ${sci(coef, exp)}$` : `The number in front is already from $1$ to $10$: $${sci(coef, exp)}$`,
    ],
  };
}

function sciAdd(rng: Rng, d: Difficulty): Out {
  const n = rng.int(-5, 9);
  const k = d === 1 ? 0 : rng.int(1, 2);
  const sub = rng.chance(0.4);
  const a = rng.int(11, 95) / 10;
  const b = retry(() => rng.int(11, 95) / 10, (v) => k > 0 || v !== a);
  // Rewrite b × 10^(n−k) with the exponent n: b / 10^k × 10^n.
  const bAligned = roundTo(b / 10 ** k, 6);
  const [x, y] = sub && bAligned > a ? [bAligned, a] : [a, bAligned];
  const raw = roundTo(sub ? x - y : x + y, 6);
  const [coef, exp, shift] = normalize(raw, n);
  const first = x === a ? sci(a, n) : sci(b, n - k);
  const second = x === a ? sci(b, n - k) : sci(a, n);
  return {
    prompt: d === 3
      ? `Two samples have masses of $${first}$ g and $${second}$ g. Find ${sub ? 'how much greater the first is' : 'their total mass'}, in grams. Write the answer in scientific notation, $a ${T} 10^{n}$.`
      : `Find the ${sub ? 'difference' : 'sum'}. Write the answer in scientific notation, $a ${T} 10^{n}$.\n\n$$${first} ${sub ? '-' : '+'} ${second}$$`,
    parts: [numPart(coef, { label: '$a$ =', exact: false }), numPart(exp, { label: '$n$ =', exact: false })],
    hints: ['You can add or subtract the numbers in front only when the powers of ten are the same.', k ? `Rewrite $${sci(b, n - k)}$ with the power $10^{${n}}$: move its decimal point $${k}$ place${k > 1 ? 's' : ''} left.` : 'The powers are already the same: add or subtract the numbers in front.'],
    solution: [
      ...(k ? [`$${sci(b, n - k)} = ${sci(bAligned, n)}$`] : []),
      `$${fmt(x)} ${sub ? '-' : '+'} ${fmt(y)} = ${fmt(raw)}$, so the answer is $${fmt(raw)} ${T} 10^{${n}}$.`,
      shift ? `Adjust so the number in front is from $1$ to $10$: $${sci(coef, exp)}$` : `That is already in scientific notation: $${sci(coef, exp)}$`,
    ],
  };
}

// ---------------------------------------------------------------------------
// 2.3 Linear and exponential growth
// ---------------------------------------------------------------------------

const GROWTH = [
  { thing: 'the number of members of a club', unit: 'members', t: 'year' },
  { thing: 'the number of bacteria in a dish', unit: 'bacteria', t: 'hour' },
  { thing: 'the number of trees in a new forest', unit: 'trees', t: 'year' },
  { thing: 'the number of views of a video', unit: 'views', t: 'day' },
  { thing: 'the number of fish in a pond', unit: 'fish', t: 'year' },
];

function linearVsExponential(rng: Rng, d: Difficulty): Out {
  const ctx = rng.pick(GROWTH);
  if (d < 3) {
    const exp = rng.chance(0.5);
    const start = exp ? rng.pick([2, 3, 4, 5, 8, 10, 12, 20]) : rng.int(5, 60);
    const r = rng.pick([2, 3]);
    const k = rng.int(3, 15);
    const xs = [0, 1, 2, 3, 4];
    const ys = xs.map((x) => (exp ? start * r ** x : start + k * x));
    const figure: Figure = { type: 'table', headers: [`${ctx.t[0]!.toUpperCase()}${ctx.t.slice(1)}s, $x$`, `${ctx.unit[0]!.toUpperCase()}${ctx.unit.slice(1)}, $y$`], rows: xs.map((x, i) => [String(x), String(ys[i])]) };
    const parts: Part[] = [{ label: 'Kind of growth:', answer: fixedChoice(['Linear', 'Exponential'], exp ? 1 : 0) }];
    const sol = [
      `Differences: ${ys.slice(1).map((y, i) => `$${y} - ${ys[i]} = ${y - ys[i]!}$`).join(', ')}.`,
      `Ratios: ${ys.slice(1).map((y, i) => `$${y} \\div ${ys[i]} = ${fmt(roundTo(y / ys[i]!, 3))}$`).join(', ')}.`,
      exp ? `The ratios are all $${r}$: each ${ctx.t} multiplies the amount by $${r}$, so the growth is exponential.` : `The differences are all $${k}$: each ${ctx.t} adds the same amount, so the growth is linear.`,
    ];
    if (d === 2) {
      parts.push(numPart(exp ? r : k, { label: exp ? 'Common ratio:' : 'Common difference:' }));
      parts.push(numPart(exp ? start * r ** 6 : start + k * 6, { label: `Value when $x = 6$:` }));
      sol.push(exp ? `$y = ${start} \\times ${r}^{x}$, so at $x = 6$: $${start} \\times ${r}^{6} = ${N(start * r ** 6)}$` : `$y = ${start} + ${k}x$, so at $x = 6$: $${start} + ${k} \\times 6 = ${start + 6 * k}$`);
    }
    return {
      prompt: `The table shows ${ctx.thing} over time. Is the growth linear or exponential?${d === 2 ? ' Give the common difference or common ratio, and the value when $x = 6$.' : ''}`,
      figure,
      parts,
      hints: ['**Linear** growth adds the same amount in each equal step. **Exponential** growth multiplies by the same factor in each equal step.', 'Check the differences between values, then the ratios.'],
      solution: sol,
    };
  }
  // Which grows past which: a linear model against an exponential one.
  const a0 = rng.int(100, 600);
  const k = rng.int(30, 150);
  const b0 = rng.int(5, 40);
  const r = rng.pick([1.5, 2, 3]);
  let n = 0;
  while (b0 * r ** n <= a0 + k * n && n < 60) n++;
  return {
    prompt: `Two towns are planting trees. Town A has $${a0}$ trees and plants $${k}$ more each year. Town B has $${b0}$ trees, and its number of trees is multiplied by $${fmt(r)}$ each year.\n\nAfter how many whole years will Town B first have more trees than Town A?`,
    parts: [numPart(n, { suffix: 'years', exact: false })],
    hints: ['Town A: $A = ' + a0 + ' + ' + k + 'n$ (linear). Town B: $B = ' + b0 + ' \\times ' + fmt(r) + '^{n}$ (exponential).', 'Make a table of both for $n = 0, 1, 2, \\dots$ and look for the first year where $B > A$.'],
    solution: [
      `Town A grows linearly: $A = ${a0} + ${k}n$. Town B grows exponentially: $B = ${b0} \\times ${fmt(r)}^{n}$.`,
      ...[n - 1, n].filter((x) => x >= 0).map((x) => `Year $${x}$: $A = ${a0 + k * x}$, $B = ${fmt(roundTo(b0 * r ** x, 2))}$.`),
      `Year $${n}$ is the first year in which Town B has more trees. An exponential model always overtakes a linear one in the end, however far behind it starts.`,
    ],
  };
}

export const NUMBER_SKILLS: SkillDef[] = [
  skill({ id: 'mx-sci-write', name: 'Write numbers in scientific notation', description: 'Write very large and very small numbers as a × 10ⁿ', outcomes: ['NA1'], lessonId: 'mx-2-1', gen: sciWrite }),
  skill({ id: 'mx-sci-standard', name: 'Write scientific notation as ordinary numbers', description: 'Write a × 10ⁿ in full', outcomes: ['NA1'], lessonId: 'mx-2-1', gen: sciStandard }),
  skill({ id: 'mx-sci-multiply', name: 'Multiply and divide in scientific notation', description: 'Multiply and divide numbers in scientific notation and adjust the answer', outcomes: ['NA2'], lessonId: 'mx-2-2', gen: sciMultiply }),
  skill({ id: 'mx-sci-add', name: 'Add and subtract in scientific notation', description: 'Add and subtract numbers in scientific notation with the same or different powers of ten', outcomes: ['NA2'], lessonId: 'mx-2-2', gen: sciAdd }),
  skill({ id: 'mx-linear-vs-exponential', name: 'Compare linear and exponential growth', description: 'Tell linear from exponential growth in a table and find when one overtakes the other', outcomes: ['NA3'], lessonId: 'mx-2-3', calculator: true, gen: linearVsExponential }),
];
