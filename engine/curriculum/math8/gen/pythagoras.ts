/** Math 8 Unit 1 — Squares, Square Roots and the Pythagorean Theorem (N1, N2, SS1). */
import { fixedChoice, mc, numPart, retry, roundingPhrase, skill } from '../../helpers.ts';
import type { GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, primeFactorLatex, primeFactorMap, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Choice, NumberLineFigure, PlaneFigure, PlanePoint, RightTriangleFigure, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Liam', 'Priya', 'Mateo', 'Aiyana', 'Noah', 'Mei', 'Owen', 'Fatima', 'Jasper', 'Simran', 'Kai', 'Chloé', 'Tariq', 'Nadia',
  'Ethan', 'Rajveer', 'Leah', 'Marcus', 'Sofia', 'Hiroshi', 'Zainab', 'Cole', 'Ananya', 'Wyatt', 'Thanh', 'Isabelle', 'Dakota', 'Gurpreet', 'Olumide',
  'Kiona', 'Emeka', 'Hana', 'Diego', 'Maya', 'Arjun',
];
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater', 'Oakridge', 'Millbrook'];

type Unit = 'mm' | 'cm' | 'm' | 'km' | 'in' | 'ft';
const UNIT_NAME: Record<Unit, string> = { mm: 'millimetre', cm: 'centimetre', m: 'metre', km: 'kilometre', in: 'inch', ft: 'foot' };

/** A measurement for use inside $...$, e.g. 12\ \text{cm}. */
const ms = (x: number | string, u: string) => `${typeof x === 'number' ? fmt(x) : x}\\ \\text{${u}}`;
/** A measurement written as a plain figure label, e.g. "12 cm". */
const fl = (x: number | string, u: string) => `${typeof x === 'number' ? fmt(x) : x} ${u}`;
/** Square units inside maths. */
const sqU = (u: string) => `\\text{${u}}^2`;
/** Thin-space grouping for numbers with five or more digits. */
function big(n: number): string {
  const [i, f] = fmt(n).split('.');
  const g = Math.abs(n) >= 10000 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, '\\,') : i;
  return f === undefined ? g : `${g}.${f}`;
}
const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

/** "to the nearest tenth of a metre", "to the nearest inch" ... */
function nearest(dp: number, u: Unit): string {
  const name = UNIT_NAME[u];
  if (dp === 0) return `to the nearest ${name}`;
  return `${roundingPhrase(dp)} of ${/^[aeiou]/.test(name) ? 'an' : 'a'} ${name}`;
}

/** True when x is a finite positive number that is not close to a rounding boundary at dp places. */
function safe(x: number, dp: number): boolean {
  if (!Number.isFinite(x) || x <= 0) return false;
  const f = x * 10 ** dp;
  return Math.abs(f - Math.floor(f) - 0.5) > 0.04;
}

const sq = (x: number) => roundTo(x * x, 6);
const isSquare = (n: number) => Number.isInteger(n) && n >= 0 && Math.round(Math.sqrt(n)) ** 2 === n;
/** True when x has at most dp decimal places. */
const hasDp = (x: number, dp: number) => Math.abs(x * 10 ** dp - Math.round(x * 10 ** dp)) < 1e-9;
const orList = (xs: string[]) => (xs.length === 1 ? xs[0] : `${xs.slice(0, -1).join(', ')} or ${xs[xs.length - 1]}`);

// ---------------------------------------------------------------------------
// 1.1 Perfect squares and square roots
// ---------------------------------------------------------------------------

const PS_DEF = 'A **perfect square** is a whole number that is another whole number times itself, like $36 = 6 \\times 6$.';
const ROOT_DEF = 'The **square root** of a number multiplies by itself to give that number: $\\sqrt{49} = 7$ because $7 \\times 7 = 49$.';

/** The last digits a whole number can end in when its square ends in `d`. */
const rootEndings = (d: number) => range(0, 9).filter((x) => (x * x) % 10 === d);

/** Hint and steps for finding the square root of k². */
function rootWork(k: number): { hint: string; steps: string[] } {
  const n = k * k;
  if (k <= 12) {
    return { hint: `Which whole number times itself is $${n}$?`, steps: [`Look for a whole number that multiplies by itself to give $${n}$.`, `$${k} \\times ${k} = ${n}$`] };
  }
  if (k % 10 === 0) {
    const m = k / 10;
    return {
      hint: `Write $${n}$ as $${m * m} \\times 100$. You know $\\sqrt{${m * m}}$ and $\\sqrt{100}$.`,
      steps: [`$${n} = ${m * m} \\times 100$, and $${m} \\times ${m} = ${m * m}$ and $10 \\times 10 = 100$.`, `So $${k} \\times ${k} = ${m} \\times ${m} \\times 10 \\times 10 = ${n}$.`],
    };
  }
  const lo = Math.floor(k / 10) * 10;
  const hi = lo + 10;
  const ends = rootEndings(n % 10);
  const tries = ends.map((e) => lo + e);
  return {
    hint: `$${lo}^2 = ${lo * lo}$ and $${hi}^2 = ${hi * hi}$, so the square root is between $${lo}$ and $${hi}$. The last digit of $${n}$ narrows it down.`,
    steps: [
      `$${lo}^2 = ${lo * lo}$ and $${hi}^2 = ${hi * hi}$, so $\\sqrt{${n}}$ is between $${lo}$ and $${hi}$.`,
      `$${n}$ ends in $${n % 10}$. Only numbers ending in ${orList(ends.map((e) => `$${e}$`))} have squares that end in $${n % 10}$, so try ${orList(tries.map((t) => `$${t}$`))}.`,
      tries.map((t) => `$${t} \\times ${t} = ${t * t}$`).join(' and '),
    ],
  };
}

function psRoot(k: number): GenOutput {
  const n = k * k;
  const w = rootWork(k);
  return {
    prompt: `Find $\\sqrt{${n}}$.`,
    parts: [numPart(k, { label: `$\\sqrt{${n}} =$` })],
    hints: [ROOT_DEF, w.hint],
    solution: [...w.steps, `So $\\sqrt{${n}} = ${k}$.`],
  };
}

const SQUARE_THINGS: Array<{ thing: string; u: Unit }> = [
  { thing: 'square floor tile', u: 'cm' },
  { thing: 'square sticky note', u: 'cm' },
  { thing: 'square vegetable garden', u: 'm' },
  { thing: 'square sandbox', u: 'm' },
  { thing: 'square photo', u: 'cm' },
  { thing: 'square trampoline mat', u: 'm' },
  { thing: 'square checkerboard', u: 'cm' },
];

function psArea(rng: Rng, k: number): GenOutput {
  const c = rng.pick(SQUARE_THINGS);
  return {
    prompt: `A ${c.thing} has sides that are $${ms(k, c.u)}$ long. What is its area?`,
    parts: [numPart(k * k, { label: '$A =$', suffix: `${c.u}²` })],
    hints: ['The area of a square is side length times side length.', `$A = s^2 = ${k} \\times ${k}$`],
    solution: [`The area of a square is $A = s^2$.`, `$A = ${k}^2 = ${k} \\times ${k} = ${k * k}$`, `The area is $${k * k}\\ ${sqU(c.u)}$.`],
  };
}

function psSide(rng: Rng, k: number): GenOutput {
  const c = rng.pick(SQUARE_THINGS);
  const n = k * k;
  const w = rootWork(k);
  return {
    prompt: `A ${c.thing} has an area of $${n}\\ ${sqU(c.u)}$. How long is each side?`,
    parts: [numPart(k, { label: '$s =$', suffix: c.u })],
    hints: ['The area of a square is $s \\times s$, so the side length is the square root of the area.', w.hint],
    solution: [`The area is $s \\times s = ${n}$, so $s = \\sqrt{${n}}$.`, ...w.steps, `Each side is $${ms(k, c.u)}$ long.`],
  };
}

/** Whole numbers near k² that are not perfect squares (mix-ups students make). */
function nearSquares(k: number): number[] {
  const n = k * k;
  return [n - 1, n + 1, n - 2, n + 2, 2 * k, n + k, n - k, 10 * k].filter((x, i, a) => x > 1 && !isSquare(x) && a.indexOf(x) === i);
}

/** Two perfect squares around n, as "p² = a < n < b = (p+1)²". */
function betweenSquares(n: number): string {
  const p = Math.floor(Math.sqrt(n));
  return `$${p}^2 = ${p * p} < ${n} < ${(p + 1) * (p + 1)} = ${p + 1}^2$`;
}

function psWhichSquare(rng: Rng): GenOutput {
  const k = rng.int(4, 12);
  const n = k * k;
  const ds = rng.sample(nearSquares(k), 3);
  return {
    prompt: 'Which number is a perfect square?',
    parts: [{ answer: mc(rng, `$${n}$`, ds.map((x) => `$${x}$`)) }],
    hints: [PS_DEF, 'Check each number: is it a whole number times itself?'],
    solution: [
      `$${k} \\times ${k} = ${n}$, so $${n}$ is a perfect square.`,
      `Each of the other numbers lies between two perfect squares. For example, ${betweenSquares(ds[0])}, so $${ds[0]}$ is not a whole number times itself.`,
      `The perfect square is $${n}$.`,
    ],
  };
}

function psWhichNot(rng: Rng): GenOutput {
  const ks = rng.sample(range(11, 30), 3);
  const odd = rng.pick([...range(4, 9).map((m) => 10 * m * m), ...range(11, 20).map((m) => m * (m + 1))]);
  return {
    prompt: 'Which number is **not** a perfect square?',
    parts: [{ answer: mc(rng, `$${odd}$`, ks.map((k) => `$${k * k}$`)) }],
    hints: [PS_DEF, 'Try to write each number as a whole number times itself. Start from squares you know, like $10^2 = 100$ and $20^2 = 400$.'],
    solution: [
      `${ks.map((k) => `$${k * k} = ${k} \\times ${k}$`).join(', ')}, so these are perfect squares.`,
      `${betweenSquares(odd)}, so $${odd}$ is not a whole number times itself.`,
      `$${odd}$ is not a perfect square.`,
    ],
  };
}

const FORMATIONS: Array<{ text: (n: number) => string; ask: string; what: string }> = [
  { text: (n) => `A marching band with $${n}$ members lines up in a square, with the same number of rows as members in each row.`, ask: 'How many members are in each row?', what: 'members in each row' },
  { text: (n) => `A square patio is made of $${n}$ square paving stones, all the same size.`, ask: 'How many stones are along each side?', what: 'stones along each side' },
  { text: (n) => `A square quilt is made of $${n}$ square patches, all the same size.`, ask: 'How many patches are along each side?', what: 'patches along each side' },
  { text: (n) => `Chairs for a school concert are set up in a square arrangement of $${n}$ chairs.`, ask: 'How many chairs are in each row?', what: 'chairs in each row' },
  { text: (n) => `A square mural on the gym wall is made of $${n}$ square tiles, all the same size.`, ask: 'How many tiles are along each side?', what: 'tiles along each side' },
];

function psFormation(rng: Rng, k: number): GenOutput {
  const c = rng.pick(FORMATIONS);
  const n = k * k;
  const w = rootWork(k);
  return {
    prompt: `${c.text(n)} ${c.ask}`,
    parts: [numPart(k)],
    hints: ['A square has the same number along each side, so the total is that number times itself.', w.hint],
    solution: [`The total is a number times itself, so find $\\sqrt{${n}}$.`, ...w.steps, `There are $${k}$ ${c.what}.`],
  };
}

/** Numbers 2^a 3^b 5^c 7^d with at least two different prime factors. */
const PF_NUMS = (() => {
  const out: number[] = [];
  for (let a = 0; a <= 6; a++)
    for (let b = 0; b <= 4; b++)
      for (let c = 0; c <= 2; c++)
        for (let d = 0; d <= 2; d++) {
          const n = 2 ** a * 3 ** b * 5 ** c * 7 ** d;
          if ([a, b, c, d].filter((e) => e > 0).length >= 2 && n >= 36 && n <= 3600) out.push(n);
        }
  return out.sort((x, y) => x - y);
})();
const PF_SQUARES = PF_NUMS.filter((n) => isSquare(n) && n >= 100);
const PF_NON = PF_NUMS.filter((n) => !isSquare(n) && n >= 40 && n <= 2000);

/** LaTeX for a product of prime powers from a factor map. */
const pfTex = (m: Map<number, number>) => [...m].filter(([, e]) => e > 0).map(([p, e]) => (e === 1 ? `${p}` : `${p}^{${e}}`)).join(' \\times ');

/** The factor pair a × b = n with a < b and a as large as possible. */
function closePair(n: number): [number, number] {
  let a = Math.floor(Math.sqrt(n));
  if (a * a === n) a--;
  while (n % a !== 0) a--;
  return [a, n / a];
}

const PF_HINT = 'Write the prime factorization. In a perfect square, every prime factor appears an even number of times.';

function psFactorTest(rng: Rng): GenOutput {
  const square = rng.chance(0.5);
  const n = rng.pick(square ? PF_SQUARES : PF_NON);
  const map = primeFactorMap(n);
  const F = primeFactorLatex(n);
  const exps = [...map.values()];
  const [a, b] = closePair(n);
  const steps = [`Divide by primes to get the prime factorization: $${n} = ${F}$.`];
  let correct: string;
  const wrong: string[] = [];
  if (square) {
    const r = Math.round(Math.sqrt(n));
    const half = new Map([...map].map(([p, e]) => [p, e / 2]));
    correct = `Yes. $${n} = ${F}$, and every prime factor appears an even number of times.`;
    wrong.push(`No. $${n} = ${F}$ has more than one different prime factor.`);
    if (a !== b) wrong.push(`No. $${n} = ${a} \\times ${b}$, and $${a}$ and $${b}$ are not the same number.`);
    if (n % 2 === 0) wrong.push(`Yes, and $\\sqrt{${n}} = ${n / 2}$.`);
    if (new Set(exps).size > 1) wrong.push(`No. In $${n} = ${F}$, the exponents are not all the same.`);
    steps.push(`Every exponent is even, so the factors split into two identical groups: $${n} = (${pfTex(half)}) \\times (${pfTex(half)}) = ${r} \\times ${r}$.`);
    steps.push(`$${n}$ is a perfect square, and $\\sqrt{${n}} = ${r}$.`);
  } else {
    const odd = [...map].filter(([, e]) => e % 2 === 1).map(([p]) => `$${p}$`);
    correct = `No. $${n} = ${F}$, and ${orList(odd).replace(' or ', ' and ')} ${odd.length === 1 ? 'appears' : 'appear'} an odd number of times.`;
    if (exps.every((e) => e >= 2)) wrong.push(`Yes. $${n} = ${F}$, and every prime factor appears more than once.`);
    if (exps.reduce((s, e) => s + e, 0) % 2 === 0) wrong.push(`Yes. $${n} = ${F}$ has an even number of prime factors in all.`);
    if (a !== b) wrong.push(`Yes. $${n} = ${a} \\times ${b}$, so it is a product of two whole numbers.`);
    const last = n % 10;
    const ex = [1, 2, 4, 5, 6, 3, 10].find((x) => (x * x) % 10 === last);
    if (ex) wrong.push(`Yes. $${n}$ ends in $${last}$, just like the perfect square $${ex * ex}$.`);
    steps.push(`The prime ${odd.length === 1 ? 'factor' : 'factors'} ${orList(odd).replace(' or ', ' and ')} ${odd.length === 1 ? 'appears' : 'appear'} an odd number of times, so the factors cannot be split into two identical groups.`);
    steps.push(`$${n}$ is not a perfect square.`);
  }
  return {
    prompt: `Use prime factorization to decide whether $${n}$ is a perfect square. Which statement is correct?`,
    parts: [{ answer: mc(rng, correct, rng.shuffle(wrong)) }],
    hints: [PF_HINT, 'Look at the exponents in the prime factorization. Are they all even?'],
    solution: steps,
  };
}

function psFactorRoot(rng: Rng): GenOutput {
  const n = rng.pick(PF_SQUARES);
  const map = primeFactorMap(n);
  const half = new Map([...map].map(([p, e]) => [p, e / 2]));
  const r = Math.round(Math.sqrt(n));
  return {
    prompt: `The prime factorization of $${n}$ is $${primeFactorLatex(n)}$. Use it to find $\\sqrt{${n}}$.`,
    parts: [numPart(r, { label: `$\\sqrt{${n}} =$` })],
    hints: ['Split the prime factors into two identical groups.', 'Halve each exponent. The product of one group is the square root.'],
    solution: [
      `Every exponent is even, so split the factors into two identical groups: $${n} = (${pfTex(half)}) \\times (${pfTex(half)})$.`,
      `One group is $${pfTex(half)} = ${r}$.`,
      `So $\\sqrt{${n}} = ${r}$.`,
    ],
  };
}

function psMultiplier(rng: Rng): GenOutput {
  const n = rng.pick(PF_NON.filter((x) => x <= 600 && [...primeFactorMap(x)].filter(([, e]) => e % 2 === 1).reduce((m, [p]) => m * p, 1) <= 30));
  const map = primeFactorMap(n);
  const oddP = [...map].filter(([, e]) => e % 2 === 1).map(([p]) => p);
  const m = oddP.reduce((x, p) => x * p, 1);
  const N = n * m;
  const r = Math.round(Math.sqrt(N));
  const newMap = new Map([...map].map(([p, e]) => [p, e % 2 ? e + 1 : e]));
  return {
    prompt: `What is the smallest whole number you can multiply $${n}$ by to get a perfect square? What is the square root of that perfect square?`,
    parts: [numPart(m, { label: 'Multiply by' }), numPart(r, { label: 'Square root' })],
    hints: [PF_HINT, 'Find the prime factors that appear an odd number of times. Multiplying by one more of each makes every exponent even.'],
    solution: [
      `$${n} = ${primeFactorLatex(n)}$`,
      `${orList(oddP.map((p) => `$${p}$`)).replace(' or ', ' and ')} ${oddP.length === 1 ? 'appears' : 'appear'} an odd number of times. Multiply by ${oddP.length === 1 ? 'one more' : 'one more of each'}: $${m}$.`,
      `$${n} \\times ${m} = ${big(N)} = ${pfTex(newMap)}$, and every exponent is now even.`,
      `$\\sqrt{${big(N)}} = ${r}$, because $${r} \\times ${r} = ${big(N)}$.`,
      `Multiply by $${m}$ to get $${big(N)}$, whose square root is $${r}$.`,
    ],
  };
}

const PERIM_CTX = [
  { thing: 'square vegetable garden', edge: 'fencing', verb: 'go around it' },
  { thing: 'square patio', edge: 'edging', verb: 'go around it' },
  { thing: 'square dog run', edge: 'fencing', verb: 'enclose it' },
  { thing: 'square hockey practice area on a frozen pond', edge: 'boards', verb: 'go all the way around it' },
  { thing: 'square bulletin board', edge: 'border trim', verb: 'go around its edge' },
];
const UNIT_PLURAL: Record<string, string> = { m: 'metres', cm: 'centimetres' };

function psPerimeter(rng: Rng): GenOutput {
  const c = rng.pick(PERIM_CTX);
  const u: Unit = c.thing.includes('bulletin') ? 'cm' : 'm';
  const k = u === 'cm' ? rng.int(40, 90) : rng.int(11, 30);
  const n = k * k;
  const w = rootWork(k);
  if (rng.chance(0.5)) {
    return {
      prompt: `A ${c.thing} has an area of $${big(n)}\\ ${sqU(u)}$. How long is each side? How many ${UNIT_PLURAL[u]} of ${c.edge} are needed to ${c.verb}?`,
      parts: [numPart(k, { label: 'Side', suffix: u }), numPart(4 * k, { label: cap(c.edge), suffix: u })],
      hints: ['The side length of a square is the square root of its area.', 'The perimeter of a square is $4$ times the side length.'],
      solution: [`$s = \\sqrt{${n}}$`, ...w.steps, `Each side is $${ms(k, u)}$ long.`, `Perimeter: $4 \\times ${k} = ${4 * k}$, so $${ms(4 * k, u)}$ of ${c.edge} ${c.edge === 'boards' ? 'are' : 'is'} needed.`],
    };
  }
  return {
    prompt: `A ${c.thing} has a perimeter of $${ms(4 * k, u)}$. How long is each side? What is its area?`,
    parts: [numPart(k, { label: 'Side', suffix: u }), numPart(n, { label: 'Area', suffix: `${u}²` })],
    hints: ['A square has $4$ equal sides. Divide the perimeter by $4$.', 'The area of a square is $s^2$.'],
    solution: [`Each side is $${4 * k} \\div 4 = ${k}$, so $${ms(k, u)}$.`, `Area: $A = ${k}^2 = ${k} \\times ${k} = ${big(n)}$`, `Each side is $${ms(k, u)}$ and the area is $${big(n)}\\ ${sqU(u)}$.`],
  };
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const LEFTOVER_CTX = [
  { items: 'square tiles', make: 'the largest solid square of tiles', per: 'tiles are along each side', left: 'tiles are left over', label: 'Along each side' },
  { items: 'photos, all the same size', make: 'the largest square collage of photos, with no gaps', per: 'photos are along each side', left: 'photos are left over', label: 'Along each side' },
  { items: 'chairs', make: 'the largest square arrangement of chairs for an assembly, with the same number of rows as chairs in each row', per: 'chairs are in each row', left: 'chairs are left over', label: 'In each row' },
  { items: 'square cookies', make: 'the largest square tray of cookies', per: 'cookies are along each side', left: 'cookies are left over', label: 'Along each side' },
];

function psLeftover(rng: Rng): GenOutput {
  const c = rng.pick(LEFTOVER_CTX);
  const name = rng.pick(NAMES);
  const k = rng.int(6, 15);
  const r = rng.int(1, 2 * k);
  const N = k * k + r;
  return {
    prompt: `${name} has $${N}$ ${c.items} and wants to make ${c.make}. How many ${c.per}? How many ${c.left}?`,
    parts: [numPart(k, { label: c.label }), numPart(r, { label: 'Left over' })],
    hints: [`Find the largest perfect square that is less than or equal to $${N}$.`, 'Its square root is the number along each side. Subtract to find how many are left.'],
    solution: [
      `${betweenSquares(N)}`,
      `The largest perfect square that fits is $${k}^2 = ${k * k}$, so the square has $${k}$ along each side.`,
      `Left over: $${N} - ${k * k} = ${r}$`,
      `So $${k}$ ${c.per} and $${r}$ ${c.left}.`,
    ],
  };
}

const perfectSquares = skill({
  id: 'm8-perfect-squares',
  name: 'Perfect squares and square roots',
  description: 'Identify perfect squares, find square roots of perfect squares, and relate the side length and area of a square.',
  outcomes: ['N1'],
  lessonId: 'm8-1-1',
  calculator: false,
  gen(rng, d) {
    if (d === 1) {
      const kind = rng.pick(['root', 'area', 'side', 'which'] as const);
      if (kind === 'root') return psRoot(rng.int(2, 12));
      if (kind === 'area') return psArea(rng, rng.int(3, 15));
      if (kind === 'side') return psSide(rng, rng.int(2, 12));
      return psWhichSquare(rng);
    }
    if (d === 2) {
      const kind = rng.pick(['root', 'not', 'formation', 'side'] as const);
      const k = rng.pick([...range(13, 25), 30, 40, 50, 60, 70, 80, 90]);
      if (kind === 'root') return psRoot(k);
      if (kind === 'not') return psWhichNot(rng);
      if (kind === 'formation') return psFormation(rng, rng.int(11, 25));
      return psSide(rng, rng.int(13, 25));
    }
    const kind = rng.pick(['test', 'test', 'root', 'mult', 'perim', 'left'] as const);
    if (kind === 'test') return psFactorTest(rng);
    if (kind === 'root') return psFactorRoot(rng);
    if (kind === 'mult') return psMultiplier(rng);
    if (kind === 'perim') return psPerimeter(rng);
    return psLeftover(rng);
  },
});

// ---------------------------------------------------------------------------
// 1.2 Estimating square roots
// ---------------------------------------------------------------------------

const BENCH = 'Find the perfect squares just below and just above the number. They are your benchmarks.';

/** A whole number in [lo, hi] that is not a perfect square, whose root is not near a hundredths boundary x.x5. */
function nonSquare(rng: Rng, lo: number, hi: number): number {
  return retry(
    () => rng.int(lo, hi),
    (n) => {
      if (isSquare(n)) return false;
      const f = Math.sqrt(n) * 10;
      return Math.abs(f - Math.floor(f) - 0.5) > 0.12;
    },
  );
}

function benchStep(n: number): string {
  const k = Math.floor(Math.sqrt(n));
  return `The perfect squares on either side of $${n}$ are $${k}^2 = ${k * k}$ and $${k + 1}^2 = ${(k + 1) * (k + 1)}$. Since $${k * k} < ${n} < ${(k + 1) * (k + 1)}$, $\\sqrt{${n}}$ is between $${k}$ and $${k + 1}$.`;
}

/** Steps for estimating √n to one decimal place with benchmarks, then checking by squaring. */
function estimateSteps(n: number): { steps: string[]; est: number } {
  const k = Math.floor(Math.sqrt(n));
  const s = Math.sqrt(n);
  const f = (n - k * k) / (2 * k + 1);
  const t = Math.floor(s * 10) / 10;
  const t2 = roundTo(t + 0.1, 1);
  const lower = n - sq(t) < sq(t2) - n;
  const est = lower ? t : t2;
  return {
    est,
    steps: [
      benchStep(n),
      `$${n}$ is $${n - k * k}$ of the $${2 * k + 1}$ steps from $${k * k}$ to $${(k + 1) * (k + 1)}$, and $\\dfrac{${n - k * k}}{${2 * k + 1}} \\approx ${fmtFixed(f, 2)}$. So $\\sqrt{${n}}$ is about $${fmtFixed(k + f, 2)}$.`,
      `Check by squaring tenths: $${fmtFixed(t, 1)}^2 = ${fmt(sq(t))}$ and $${fmtFixed(t2, 1)}^2 = ${fmt(sq(t2))}$. $${n}$ is closer to $${fmt(lower ? sq(t) : sq(t2))}$.`,
      `So $\\sqrt{${n}} \\approx ${fmtFixed(est, 1)}$.`,
    ],
  };
}

function estBetween(n: number): GenOutput {
  const k = Math.floor(Math.sqrt(n));
  return {
    prompt: `$\\sqrt{${n}}$ is between two consecutive whole numbers. What are they?`,
    parts: [numPart(k, { label: 'Between' }), numPart(k + 1, { label: 'and' })],
    hints: [BENCH, `Which perfect square is just below $${n}$? Which is just above?`],
    solution: [benchStep(n), `$\\sqrt{${n}}$ is between $${k}$ and $${k + 1}$.`],
  };
}

function estBetweenMc(rng: Rng, n: number): GenOutput {
  const k = Math.floor(Math.sqrt(n));
  const h = Math.floor(n / 2);
  const pair = (a: number) => `$${a}$ and $${a + 1}$`;
  const ds = [pair(h), pair(k - 1), pair(k + 1), pair(k + 2)].filter((x) => x !== pair(k));
  return {
    prompt: `Between which two consecutive whole numbers is $\\sqrt{${n}}$?`,
    parts: [{ answer: mc(rng, pair(k), [ds[0], ...rng.shuffle(ds.slice(1))]) }],
    hints: [BENCH, 'The square root is not half of the number. Think of which whole numbers multiply by themselves to give numbers near it.'],
    solution: [benchStep(n), `$\\sqrt{${n}}$ is between $${k}$ and $${k + 1}$.`],
  };
}

function estCloser(n: number): GenOutput {
  const k = Math.floor(Math.sqrt(n));
  const a = n - k * k;
  const b = (k + 1) * (k + 1) - n;
  const lower = a < b;
  return {
    prompt: `Is $\\sqrt{${n}}$ closer to $${k}$ or to $${k + 1}$?`,
    parts: [{ answer: fixedChoice([`$${k}$`, `$${k + 1}$`], lower ? 0 : 1) }],
    hints: [BENCH, `Is $${n}$ closer to $${k * k}$ or to $${(k + 1) * (k + 1)}$?`],
    solution: [
      benchStep(n),
      `$${n} - ${k * k} = ${a}$ and $${(k + 1) * (k + 1)} - ${n} = ${b}$, so $${n}$ is closer to $${lower ? k * k : (k + 1) * (k + 1)}$.`,
      `$\\sqrt{${n}}$ is closer to $${lower ? k : k + 1}$.`,
    ],
  };
}

function estDecimal(n: number, setup?: { text: string; u: string }): GenOutput {
  const { steps, est } = estimateSteps(n);
  const s = Math.sqrt(n);
  return {
    prompt: setup
      ? `${setup.text} Estimate the length of each side to one decimal place, using benchmarks and without the square root key.`
      : `Estimate $\\sqrt{${n}}$ to one decimal place, using benchmarks and without the square root key.`,
    parts: [numPart(s, { decimals: 1, tolerance: 0.1, label: setup ? '$s \\approx$' : `$\\sqrt{${n}} \\approx$`, suffix: setup?.u })],
    hints: [BENCH, 'Decide how far the number is between the two perfect squares. Then check your estimate by squaring it.'],
    solution: setup ? [`The side length is $\\sqrt{${n}}$.`, ...steps.slice(0, -1), `Each side is about $${ms(fmtFixed(est, 1), setup.u)}$ long.`] : steps,
  };
}

function estNumberLine(rng: Rng, n: number): GenOutput {
  const k = Math.floor(Math.sqrt(n));
  const s = Math.sqrt(n);
  const min = Math.max(0, k - 2);
  const max = min + 6;
  const cands = rng.shuffle([s - 1, s + 1, 2 * k + 1 - s, n / 10, k + 0.5 + (s - k < 0.5 ? 0.35 : -0.35)]);
  const vals = [s];
  for (const c of cands) {
    if (vals.length === 4) break;
    if (c > min + 0.15 && c < max - 0.15 && vals.every((v) => Math.abs(v - c) >= 0.35)) vals.push(c);
  }
  const sorted = [...vals].sort((x, y) => x - y);
  const letters = ['A', 'B', 'C', 'D'];
  const fig: NumberLineFigure = {
    type: 'numberLine',
    min,
    max,
    step: 1,
    points: sorted.map((v, i) => ({ value: roundTo(v, 2), label: letters[i] })),
  };
  const idx = sorted.indexOf(s);
  return {
    prompt: `Which point on the number line best shows $\\sqrt{${n}}$?`,
    figure: fig,
    parts: [{ answer: fixedChoice(letters.slice(0, sorted.length).map((l) => `Point ${l}`), idx) }],
    hints: [BENCH, 'Decide which two whole numbers the square root is between, and which one it is closer to.'],
    solution: [
      benchStep(n),
      `$${n} - ${k * k} = ${n - k * k}$ and $${(k + 1) * (k + 1)} - ${n} = ${(k + 1) * (k + 1) - n}$, so $\\sqrt{${n}}$ is closer to $${n - k * k < (k + 1) * (k + 1) - n ? k : k + 1}$.`,
      `Point ${letters[idx]} is between $${k}$ and $${k + 1}$, closer to $${n - k * k < (k + 1) * (k + 1) - n ? k : k + 1}$. It best shows $\\sqrt{${n}}$.`,
    ],
  };
}

function estCount(rng: Rng): GenOutput {
  const k = rng.int(3, 15);
  return {
    prompt: `How many whole numbers have a square root that is greater than $${k}$ and less than $${k + 1}$?`,
    parts: [numPart(2 * k)],
    hints: [`Square both ends: the numbers must be greater than $${k}^2$ and less than $${k + 1}^2$.`, 'Count the whole numbers strictly between the two perfect squares.'],
    solution: [
      `$${k}^2 = ${k * k}$ and $${k + 1}^2 = ${(k + 1) * (k + 1)}$.`,
      `The numbers are the whole numbers from $${k * k + 1}$ to $${(k + 1) * (k + 1) - 1}$.`,
      `Count them: $${(k + 1) * (k + 1) - 1} - ${k * k + 1} + 1 = ${2 * k}$`,
      `There are $${2 * k}$ whole numbers.`,
    ],
  };
}

function estWhich(rng: Rng): GenOutput {
  const k = rng.int(4, 12);
  const right = rng.int(k * k + 1, (k + 1) * (k + 1) - 1);
  const below = rng.int((k - 1) * (k - 1) + 1, k * k - 1);
  const above = rng.int((k + 1) * (k + 1) + 1, (k + 2) * (k + 2) - 1);
  const half = 2 * k + 1;
  return {
    prompt: `Which number has a square root between $${k}$ and $${k + 1}$?`,
    parts: [{ answer: mc(rng, `$${right}$`, [`$${half}$`, `$${below}$`, `$${above}$`]) }],
    hints: [`Square $${k}$ and $${k + 1}$.`, `The number must be between $${k * k}$ and $${(k + 1) * (k + 1)}$.`],
    solution: [
      `$${k}^2 = ${k * k}$ and $${k + 1}^2 = ${(k + 1) * (k + 1)}$, so the number must be between $${k * k}$ and $${(k + 1) * (k + 1)}$.`,
      `$${half}$ and $${below}$ are too small, and $${above}$ is too big.`,
      `$${k * k} < ${right} < ${(k + 1) * (k + 1)}$, so $\\sqrt{${right}}$ is between $${k}$ and $${k + 1}$. The answer is $${right}$.`,
    ],
  };
}

const AREA_SETUPS: Array<{ text: (n: number) => string; u: string; lo: number; hi: number }> = [
  { text: (n) => `A square vegetable garden has an area of $${n}\\ \\text{m}^2$.`, u: 'm', lo: 20, hi: 150 },
  { text: (n) => `A square rug has an area of $${n}\\ \\text{m}^2$.`, u: 'm', lo: 3, hi: 15 },
  { text: (n) => `A square photo has an area of $${n}\\ \\text{cm}^2$.`, u: 'cm', lo: 80, hi: 240 },
  { text: (n) => `The floor of a square tent has an area of $${n}\\ \\text{m}^2$.`, u: 'm', lo: 5, hi: 20 },
  { text: (n) => `A square bulletin board has an area of $${n}\\ \\text{cm}^2$.`, u: 'cm', lo: 300, hi: 900 },
];

function estOrder(rng: Rng): GenOutput {
  const k = rng.int(4, 11);
  type V = { v: number; md: string };
  const vals = retry(
    () => {
      const a = nonSquare(rng, k * k + 1, (k + 1) * (k + 1) - 1);
      const b = nonSquare(rng, k * k + 1, (k + 1) * (k + 1) - 1);
      const c = roundTo(k + rng.int(1, 9) / 10, 1);
      const e = roundTo(k + rng.pick([-1, 1]) * rng.int(1, 5) / 10 + (rng.chance(0.5) ? 0 : 0.5), 1);
      return [
        { v: Math.sqrt(a), md: `$\\sqrt{${a}}$` },
        { v: Math.sqrt(b), md: `$\\sqrt{${b}}$` },
        { v: c, md: `$${fmtFixed(c, 1)}$` },
        { v: e, md: `$${fmtFixed(e, 1)}$` },
      ] as V[];
    },
    (vs) => vs.every((x, i) => vs.every((y, j) => i === j || Math.abs(x.v - y.v) > 0.06)) && vs[3].v > 0,
  );
  const shown = retry(
    () => rng.shuffle(vals),
    (s) => s.some((p, i) => i > 0 && p.v < s[i - 1].v),
  );
  const items: Choice[] = shown.map((p, i) => ({ id: 'abcd'[i], md: p.md }));
  const idOf = (p: V) => items[shown.indexOf(p)].id;
  const sorted = [...vals].sort((x, y) => x.v - y.v);
  const roots = vals.filter((p) => p.md.includes('sqrt'));
  const rootSteps = roots.map((p) => {
    const n = Math.round(p.v * p.v);
    const t = Math.floor(p.v * 10) / 10;
    const t2 = roundTo(t + 0.1, 1);
    return `$${fmtFixed(t, 1)}^2 = ${fmt(sq(t))}$ and $${fmtFixed(t2, 1)}^2 = ${fmt(sq(t2))}$, so $${fmtFixed(t, 1)} < \\sqrt{${n}} < ${fmtFixed(t2, 1)}$.`;
  });
  const answer: AnswerSpec = { kind: 'order', items, correctOrder: sorted.map(idOf) };
  return {
    prompt: 'Put these numbers in order from **least to greatest**.',
    parts: [{ answer }],
    hints: ['Estimate each square root to one decimal place using benchmarks.', 'Square the decimals near your estimate to see which side of them the square root is on.'],
    solution: [...rootSteps, `Compare: $${sorted.map((p) => p.md.slice(1, -1)).join(' < ')}$`, `From least to greatest: ${sorted.map((p) => p.md).join(', ')}.`],
  };
}

const estimateSqrt = skill({
  id: 'm8-estimate-sqrt',
  name: 'Estimating square roots',
  description: 'Estimate the square root of a whole number that is not a perfect square, using the perfect squares on either side as benchmarks.',
  outcomes: ['N2'],
  lessonId: 'm8-1-2',
  calculator: false,
  gen(rng, d) {
    if (d === 1) {
      const n = nonSquare(rng, 5, 150);
      return rng.chance(0.55) ? estBetween(n) : estBetweenMc(rng, n);
    }
    if (d === 2) {
      const kind = rng.pick(['closer', 'estimate', 'estimate', 'line'] as const);
      const n = nonSquare(rng, 10, 150);
      if (kind === 'closer') return estCloser(n);
      if (kind === 'line') return estNumberLine(rng, n);
      return estDecimal(n);
    }
    const kind = rng.pick(['count', 'which', 'area', 'area', 'order'] as const);
    if (kind === 'count') return estCount(rng);
    if (kind === 'which') return estWhich(rng);
    if (kind === 'order') return estOrder(rng);
    const c = rng.pick(AREA_SETUPS);
    const n = nonSquare(rng, c.lo, c.hi);
    return estDecimal(n, { text: c.text(n), u: c.u });
  },
});

// ---------------------------------------------------------------------------
// Right-triangle figures
// ---------------------------------------------------------------------------

const VERTS = [
  ['A', 'B', 'C'],
  ['P', 'Q', 'R'],
  ['X', 'Y', 'Z'],
  ['D', 'E', 'F'],
  ['L', 'M', 'N'],
  ['J', 'K', 'L'],
  ['S', 'T', 'U'],
];

interface Tri {
  R: string;
  A: string;
  B: string;
  rotate: 0 | 1 | 2 | 3;
  mirror: boolean;
}

function makeTri(rng: Rng): Tri {
  const n = rng.shuffle(rng.pick(VERTS));
  return { R: n[0], A: n[1], B: n[2], rotate: rng.pick([0, 0, 1, 2, 3] as const), mirror: rng.chance(0.4) };
}

const CTX_TRI: Tri = { R: 'C', A: 'A', B: 'B', rotate: 0, mirror: false };
const seg = (p: string, q: string) => [p, q].sort().join('');

function triFig(t: Tri, legA: number, legB: number, sideLabels: RightTriangleFigure['sideLabels'], scene?: RightTriangleFigure['scene']): RightTriangleFigure {
  const plain = !scene || scene === 'none';
  const f: RightTriangleFigure = {
    type: 'rightTriangle',
    vertices: { right: t.R, a: t.A, b: t.B },
    legA,
    legB,
    sideLabels,
    rotate: plain ? t.rotate : 0,
    mirror: plain ? t.mirror : false,
  };
  if (!plain) f.scene = scene;
  return f;
}

const TRIPLES: Array<[number, number, number]> = [
  [3, 4, 5],
  [6, 8, 10],
  [5, 12, 13],
  [9, 12, 15],
  [8, 15, 17],
  [12, 16, 20],
  [7, 24, 25],
  [15, 20, 25],
  [10, 24, 26],
  [20, 21, 29],
  [12, 35, 37],
  [9, 40, 41],
];

/** Steps for c = sqrt(a^2 + b^2). */
function hypSteps(a: number, b: number, c: number, dp: number | undefined, v = 'c'): string[] {
  const s = roundTo(sq(a) + sq(b), 6);
  return [
    `$${v}^2 = ${fmt(a)}^2 + ${fmt(b)}^2$`,
    `$${v}^2 = ${big(sq(a))} + ${big(sq(b))} = ${big(s)}$`,
    dp === undefined ? `$${v} = \\sqrt{${big(s)}} = ${fmt(c)}$` : `$${v} = \\sqrt{${big(s)}} \\approx ${fmtFixed(c, dp)}$`,
  ];
}

/** Steps for a leg: known leg a, hypotenuse c, unknown leg b. */
function legSteps(c: number, a: number, b: number, dp: number | undefined, v = 'x'): string[] {
  const s = roundTo(sq(c) - sq(a), 6);
  return [
    `$${fmt(a)}^2 + ${v}^2 = ${fmt(c)}^2$`,
    `Subtract to get $${v}^2$ by itself: $${v}^2 = ${fmt(c)}^2 - ${fmt(a)}^2$`,
    `$${v}^2 = ${big(sq(c))} - ${big(sq(a))} = ${big(s)}$`,
    dp === undefined ? `$${v} = \\sqrt{${big(s)}} = ${fmt(b)}$` : `$${v} = \\sqrt{${big(s)}} \\approx ${fmtFixed(b, dp)}$`,
  ];
}

const RT_UNITS: Unit[] = ['cm', 'm', 'mm', 'in', 'ft'];
const HYP_DEF = 'The **hypotenuse** is the side across from the right angle. It is always the longest side.';

/** Two legs (whole or one-decimal) whose hypotenuse is not a whole number and rounds safely to a tenth. */
function plainLegs(rng: Rng): [number, number, number] {
  return retry(
    () => {
      const dec = rng.chance(0.35);
      const a = dec ? rng.int(20, 150) / 10 : rng.int(3, 30);
      const b = dec ? rng.int(20, 150) / 10 : rng.int(3, 30);
      return [a, b, Math.hypot(a, b)] as [number, number, number];
    },
    ([a, b, c]) => a !== b && Math.max(a, b) / Math.min(a, b) < 4 && safe(c, 1) && !hasDp(c, 4),
  );
}

// ---------------------------------------------------------------------------
// 1.3 The Pythagorean theorem
// ---------------------------------------------------------------------------

function hypAreas(rng: Rng, exact: boolean): GenOutput {
  const u = rng.pick(['cm', 'm'] as const);
  let A1: number;
  let A2: number;
  if (exact) {
    const [p, q] = rng.pick(TRIPLES.slice(0, 9));
    [A1, A2] = rng.chance(0.5) ? [p * p, q * q] : [q * q, p * p];
  } else {
    [A1, A2] = retry(
      () => [rng.int(10, 90), rng.int(10, 90)],
      ([x, y]) => x !== y && !isSquare(x + y) && safe(Math.sqrt(x + y), 1),
    );
  }
  const S = A1 + A2;
  const c = Math.sqrt(S);
  return {
    prompt: `A square is drawn on each side of a right triangle. The squares on the two legs have areas of $${A1}\\ ${sqU(u)}$ and $${A2}\\ ${sqU(u)}$. What is the area of the square on the hypotenuse? How long is the hypotenuse${exact ? '' : `, ${nearest(1, u)}`}?`,
    parts: [numPart(S, { label: 'Area', suffix: `${u}²` }), numPart(c, { label: 'Hypotenuse', suffix: u, decimals: exact ? undefined : 1 })],
    hints: ['The Pythagorean theorem says the areas of the squares on the legs add up to the area of the square on the hypotenuse.', 'The side length of a square is the square root of its area.'],
    solution: [
      `Area of the square on the hypotenuse: $${A1} + ${A2} = ${S}$, so $${S}\\ ${sqU(u)}$.`,
      exact ? `The hypotenuse is the side of that square: $\\sqrt{${S}} = ${fmt(c)}$` : `The hypotenuse is the side of that square: $\\sqrt{${S}} \\approx ${fmtFixed(c, 1)}$`,
      `The square on the hypotenuse has an area of $${S}\\ ${sqU(u)}$, and the hypotenuse is ${exact ? '' : 'about '}$${ms(exact ? fmt(c) : fmtFixed(c, 1), u)}$ long.`,
    ],
    calculator: !exact,
  };
}

const pythHyp = skill({
  id: 'm8-pythagoras-hypotenuse',
  name: 'Finding the hypotenuse',
  description: 'Use the Pythagorean theorem to find the hypotenuse of a right triangle from its two legs.',
  outcomes: ['SS1'],
  lessonId: 'm8-1-3',
  calculator: true,
  gen(rng, d) {
    if (d === 1) {
      if (rng.chance(0.25)) return hypAreas(rng, true);
      const [p, q, h] = rng.pick(TRIPLES);
      const u = rng.pick(RT_UNITS);
      const t = makeTri(rng);
      const [a, b] = rng.chance(0.5) ? [p, q] : [q, p];
      return {
        prompt: 'Find the length of the hypotenuse, $c$, of the right triangle.',
        figure: triFig(t, a, b, { ra: fl(a, u), rb: fl(b, u), ab: 'c' }),
        parts: [numPart(h, { label: '$c =$', suffix: u })],
        hints: [HYP_DEF, 'Use $c^2 = a^2 + b^2$: square each leg, add, then take the square root.'],
        solution: [...hypSteps(a, b, h, undefined), `The hypotenuse is $${ms(h, u)}$ long.`],
      };
    }
    if (d === 2) {
      const u = rng.pick(RT_UNITS);
      const t = makeTri(rng);
      const [a, b, c] = plainLegs(rng);
      const ans = `$${ms(fmtFixed(c, 1), u)}$`;
      if (rng.chance(0.35)) {
        const hyp = seg(t.A, t.B);
        return {
          prompt: `In $\\triangle ${t.A}${t.B}${t.R}$, $\\angle ${t.R} = 90^\\circ$, $${seg(t.R, t.A)} = ${ms(a, u)}$ and $${seg(t.R, t.B)} = ${ms(b, u)}$. Find the length of $${hyp}$, ${nearest(1, u)}.`,
          parts: [numPart(c, { decimals: 1, suffix: u, label: `$${hyp} =$` })],
          hints: [`Sketch the triangle. The hypotenuse is across from the right angle at $${t.R}$, so it is $${hyp}$.`, `$${hyp}^2 = ${seg(t.R, t.A)}^2 + ${seg(t.R, t.B)}^2$`],
          solution: [`The right angle is at $${t.R}$, so the hypotenuse is the side across from it, $${hyp}$.`, ...hypSteps(a, b, c, 1, hyp), `$${hyp}$ is about ${ans} long.`],
        };
      }
      return {
        prompt: `Find the length of the hypotenuse, $c$, ${nearest(1, u)}.`,
        figure: triFig(t, a, b, { ra: fl(a, u), rb: fl(b, u), ab: 'c' }),
        parts: [numPart(c, { decimals: 1, label: '$c =$', suffix: u })],
        hints: [HYP_DEF, 'Use $c^2 = a^2 + b^2$, then take the square root. Round only at the end.'],
        solution: [...hypSteps(a, b, c, 1), `The hypotenuse is about ${ans} long.`],
      };
    }
    const kind = rng.pick(['perimeter', 'rect', 'areas', 'isosceles'] as const);
    const u = rng.pick(['cm', 'm'] as const);
    if (kind === 'areas') return hypAreas(rng, false);
    if (kind === 'perimeter') {
      const t = makeTri(rng);
      const [a, b, c] = retry(() => plainLegs(rng), (v) => safe(v[0] + v[1] + v[2], 1));
      const P = a + b + c;
      return {
        prompt: `A right triangle has legs of $${ms(a, u)}$ and $${ms(b, u)}$. Find its perimeter, ${nearest(1, u)}.`,
        figure: triFig(t, a, b, { ra: fl(a, u), rb: fl(b, u) }),
        parts: [numPart(P, { decimals: 1, label: '$P =$', suffix: u })],
        hints: ['The perimeter is the sum of all three sides. You need the hypotenuse first.', 'Find $c$ with $c^2 = a^2 + b^2$. Keep all the digits until the end.'],
        solution: [...hypSteps(a, b, c, 4), `$P = ${fmt(a)} + ${fmt(b)} + ${fmt(c, 4)} \\approx ${fmtFixed(P, 1)}$`, `The perimeter is about $${ms(fmtFixed(P, 1), u)}$.`],
      };
    }
    if (kind === 'isosceles') {
      const a = retry(() => rng.int(3, 25), (x) => safe(x * Math.SQRT2, 1));
      const c = a * Math.SQRT2;
      const t = makeTri(rng);
      return {
        prompt: `Both legs of a right triangle are $${ms(a, u)}$ long. How long is the hypotenuse, ${nearest(1, u)}?`,
        figure: triFig(t, a, a, { ra: fl(a, u), rb: fl(a, u), ab: 'c' }),
        parts: [numPart(c, { decimals: 1, label: '$c =$', suffix: u })],
        hints: [HYP_DEF, 'Both legs are the same, so $c^2 = a^2 + a^2$.'],
        solution: [...hypSteps(a, a, c, 1), `The hypotenuse is about $${ms(fmtFixed(c, 1), u)}$ long.`],
      };
    }
    const rects = [
      { thing: 'rectangle', u: u as Unit, l: [8, 40], w: [4, 30], k: 1 },
      { thing: 'rectangular poster', u: 'cm' as Unit, l: [45, 90], w: [30, 60], k: 1 },
      { thing: 'rectangular table top', u: 'cm' as Unit, l: [120, 200], w: [70, 100], k: 1 },
      { thing: 'rectangular window', u: 'cm' as Unit, l: [80, 150], w: [50, 120], k: 1 },
      { thing: 'rectangular garden bed', u: 'm' as Unit, l: [30, 80], w: [10, 25], k: 10 },
    ];
    const r = rng.pick(rects);
    const [L, W, D] = retry(
      () => {
        const L = rng.int(r.l[0], r.l[1]) / r.k;
        const W = rng.int(r.w[0], Math.min(r.w[1], Math.round(L * r.k) - 2)) / r.k;
        return [L, W, Math.hypot(L, W)] as [number, number, number];
      },
      (v) => safe(v[2], 1) && !hasDp(v[2], 4),
    );
    const uu = r.u;
    return {
      prompt: `A ${r.thing} is $${ms(L, uu)}$ long and $${ms(W, uu)}$ wide. How long is a diagonal from one corner to the opposite corner, ${nearest(1, uu)}?`,
      figure: triFig(CTX_TRI, L, W, { ra: fl(L, uu), rb: fl(W, uu), ab: 'd' }),
      parts: [numPart(D, { decimals: 1, label: '$d =$', suffix: uu })],
      hints: ['A diagonal splits the rectangle into two right triangles. The diagonal is the hypotenuse.', 'The length and the width are the legs: $d^2 = l^2 + w^2$.'],
      solution: ['The length, the width and the diagonal form a right triangle, with the diagonal as the hypotenuse.', ...hypSteps(L, W, D, 1, 'd'), `The diagonal is about $${ms(fmtFixed(D, 1), uu)}$ long.`],
    };
  },
});

function legAreas(rng: Rng, exact: boolean): GenOutput {
  const u = rng.pick(['cm', 'm'] as const);
  let C: number;
  let A: number;
  if (exact) {
    const [p, q, h] = rng.pick(TRIPLES.slice(0, 9));
    C = h * h;
    A = rng.chance(0.5) ? p * p : q * q;
  } else {
    [C, A] = retry(
      () => [rng.int(60, 200), rng.int(15, 55)],
      ([x, y]) => !isSquare(x - y) && safe(Math.sqrt(x - y), 1),
    );
  }
  const B = C - A;
  const b = Math.sqrt(B);
  return {
    prompt: `A square is drawn on each side of a right triangle. The square on the hypotenuse has an area of $${C}\\ ${sqU(u)}$. The square on one leg has an area of $${A}\\ ${sqU(u)}$. What is the area of the square on the other leg? How long is the other leg${exact ? '' : `, ${nearest(1, u)}`}?`,
    parts: [numPart(B, { label: 'Area', suffix: `${u}²` }), numPart(b, { label: 'Leg', suffix: u, decimals: exact ? undefined : 1 })],
    hints: ['The two smaller squares (on the legs) add up to the big square (on the hypotenuse).', 'Subtract to find the missing area. Then take its square root.'],
    solution: [
      `The squares on the legs add up to the square on the hypotenuse, so subtract: $${C} - ${A} = ${B}$.`,
      exact ? `The leg is the side of that square: $\\sqrt{${B}} = ${fmt(b)}$` : `The leg is the side of that square: $\\sqrt{${B}} \\approx ${fmtFixed(b, 1)}$`,
      `The square on the other leg has an area of $${B}\\ ${sqU(u)}$, and the leg is ${exact ? '' : 'about '}$${ms(exact ? fmt(b) : fmtFixed(b, 1), u)}$ long.`,
    ],
    calculator: !exact,
  };
}

/** A leg a and hypotenuse c (whole or one-decimal) with a non-whole other leg that rounds safely. */
function plainLegHyp(rng: Rng): [number, number, number] {
  return retry(
    () => {
      const dec = rng.chance(0.35);
      const a = dec ? rng.int(20, 150) / 10 : rng.int(3, 30);
      const c = roundTo(a + (dec ? rng.int(10, 120) / 10 : rng.int(2, 15)), 1);
      return [a, c, Math.sqrt(c * c - a * a)] as [number, number, number];
    },
    ([a, , b]) => b / a > 0.3 && b / a < 3.5 && safe(b, 1) && !hasDp(b, 4),
  );
}

const pythLeg = skill({
  id: 'm8-pythagoras-leg',
  name: 'Finding a leg',
  description: 'Use the Pythagorean theorem to find a leg of a right triangle from the hypotenuse and the other leg.',
  outcomes: ['SS1'],
  lessonId: 'm8-1-3',
  calculator: true,
  gen(rng, d) {
    if (d === 1) {
      if (rng.chance(0.25)) return legAreas(rng, true);
      const [p, q, h] = rng.pick(TRIPLES);
      const u = rng.pick(RT_UNITS);
      const t = makeTri(rng);
      const [legA, legB] = rng.chance(0.5) ? [p, q] : [q, p];
      const unknownA = rng.chance(0.5);
      const x = unknownA ? legA : legB;
      const known = unknownA ? legB : legA;
      return {
        prompt: 'Find the length of the unknown leg, $x$.',
        figure: triFig(t, legA, legB, { ra: unknownA ? 'x' : fl(legA, u), rb: unknownA ? fl(legB, u) : 'x', ab: fl(h, u) }),
        parts: [numPart(x, { label: '$x =$', suffix: u })],
        hints: [`The side across from the right angle ($${h}$) is the hypotenuse, $c$. The unknown $x$ is a leg.`, 'Use $x^2 = c^2 - (\\text{known leg})^2$. Subtract, then take the square root.'],
        solution: [...legSteps(h, known, x, undefined), `The missing leg is $${ms(x, u)}$ long.`],
      };
    }
    if (d === 2) {
      const u = rng.pick(RT_UNITS);
      const t = makeTri(rng);
      const [a, c, b] = plainLegHyp(rng);
      const ans = `$${ms(fmtFixed(b, 1), u)}$`;
      if (rng.chance(0.35)) {
        const hyp = seg(t.A, t.B);
        const knownSeg = seg(t.R, t.A);
        const unknownSeg = seg(t.R, t.B);
        return {
          prompt: `In $\\triangle ${t.A}${t.B}${t.R}$, $\\angle ${t.R} = 90^\\circ$, $${hyp} = ${ms(c, u)}$ and $${knownSeg} = ${ms(a, u)}$. Find the length of $${unknownSeg}$, ${nearest(1, u)}.`,
          parts: [numPart(b, { decimals: 1, suffix: u, label: `$${unknownSeg} =$` })],
          hints: [`Sketch the triangle. The hypotenuse is across from the right angle at $${t.R}$, so it is $${hyp}$. The side you want is a leg.`, `$${unknownSeg}^2 = ${hyp}^2 - ${knownSeg}^2$`],
          solution: [`The right angle is at $${t.R}$, so $${hyp}$ is the hypotenuse and $${unknownSeg}$ is a leg.`, ...legSteps(c, a, b, 1, unknownSeg), `$${unknownSeg}$ is about ${ans} long.`],
        };
      }
      const unknownA = rng.chance(0.5);
      return {
        prompt: `Find the length of the unknown leg, $x$, ${nearest(1, u)}.`,
        figure: triFig(t, unknownA ? b : a, unknownA ? a : b, { ra: unknownA ? 'x' : fl(a, u), rb: unknownA ? fl(a, u) : 'x', ab: fl(c, u) }),
        parts: [numPart(b, { decimals: 1, label: '$x =$', suffix: u })],
        hints: ['Which side is the hypotenuse? It is across from the right angle.', 'To find a leg, subtract: $x^2 = c^2 - a^2$. Then take the square root.'],
        solution: [...legSteps(c, a, b, 1), `The missing leg is about ${ans} long.`],
      };
    }
    const kind = rng.pick(['area', 'area', 'perimeter', 'squares', 'rect'] as const);
    const u = rng.pick(['cm', 'm'] as const);
    if (kind === 'squares') return legAreas(rng, false);
    if (kind === 'area') {
      const exact = rng.chance(0.5);
      const t = makeTri(rng);
      const [a, c, b] = exact
        ? (() => {
            const [p, q, h] = rng.pick(TRIPLES);
            const k = rng.pick([1, 1, 2]);
            return rng.chance(0.5) ? [p * k, h * k, q * k] : [q * k, h * k, p * k];
          })()
        : retry(() => plainLegHyp(rng), (v) => safe((v[0] * v[2]) / 2, 1));
      const A = (a * b) / 2;
      return {
        prompt: `A right triangle has a hypotenuse of $${ms(c, u)}$ and one leg of $${ms(a, u)}$. Find the area of the triangle${exact ? '' : `, ${roundingPhrase(1)} of a square ${UNIT_NAME[u]}`}.`,
        figure: triFig(t, a, b, { ra: fl(a, u), ab: fl(c, u) }),
        parts: [numPart(A, { label: '$A =$', suffix: `${u}²`, decimals: exact ? undefined : 1 })],
        hints: ['The area of a triangle is $\\frac{1}{2} \\times \\text{base} \\times \\text{height}$. In a right triangle, the two legs are the base and the height.', 'Find the missing leg first with the Pythagorean theorem.'],
        solution: [
          ...legSteps(c, a, b, exact ? undefined : 4, 'b'),
          exact ? `$A = \\frac{1}{2} \\times ${fmt(a)} \\times ${fmt(b)} = ${fmt(A)}$` : `$A = \\frac{1}{2} \\times ${fmt(a)} \\times ${fmt(b, 4)} \\approx ${fmtFixed(A, 1)}$`,
          `The area is ${exact ? '' : 'about '}$${exact ? fmt(A) : fmtFixed(A, 1)}\\ ${sqU(u)}$.`,
        ],
      };
    }
    if (kind === 'perimeter') {
      const t = makeTri(rng);
      const [a, c, b] = retry(() => plainLegHyp(rng), (v) => safe(v[0] + v[1] + v[2], 1));
      const P = a + b + c;
      return {
        prompt: `A right triangle has a hypotenuse of $${ms(c, u)}$ and one leg of $${ms(a, u)}$. Find its perimeter, ${nearest(1, u)}.`,
        figure: triFig(t, a, b, { ra: fl(a, u), ab: fl(c, u) }),
        parts: [numPart(P, { decimals: 1, label: '$P =$', suffix: u })],
        hints: ['The perimeter is the sum of all three sides. Find the missing leg first.', 'Use $b^2 = c^2 - a^2$. Keep all the digits until the end.'],
        solution: [...legSteps(c, a, b, 4, 'b'), `$P = ${fmt(a)} + ${fmt(b, 4)} + ${fmt(c)} \\approx ${fmtFixed(P, 1)}$`, `The perimeter is about $${ms(fmtFixed(P, 1), u)}$.`],
      };
    }
    const sides = [
      { thing: 'rectangle', u: u as Unit, w: [5, 30], dd: [4, 30], ask: 'How long is the rectangle', noun: 'length', v: 'l' },
      { thing: 'rectangular tablet screen', u: 'cm' as Unit, w: [14, 20], dd: [6, 12], ask: 'How tall is the screen', noun: 'height', v: 'h' },
      { thing: 'rectangular picture frame', u: 'cm' as Unit, w: [20, 40], dd: [10, 30], ask: 'How tall is the frame', noun: 'height', v: 'h' },
      { thing: 'rectangular door', u: 'cm' as Unit, w: [76, 92], dd: [125, 140], ask: 'How tall is the door', noun: 'height', v: 'h' },
    ];
    const r = rng.pick(sides);
    const [W, Dg, L] = retry(
      () => {
        const w = rng.int(r.w[0], r.w[1]);
        const dg = w + rng.int(r.dd[0], r.dd[1]);
        return [w, dg, Math.sqrt(dg * dg - w * w)] as [number, number, number];
      },
      (v) => safe(v[2], 1) && !hasDp(v[2], 4) && v[2] > v[0],
    );
    const uu = r.u;
    return {
      prompt: `A ${r.thing} is $${ms(W, uu)}$ wide. Its diagonal is $${ms(Dg, uu)}$ long. ${r.ask}, ${nearest(1, uu)}?`,
      figure: triFig(CTX_TRI, W, L, { ra: fl(W, uu), rb: r.v, ab: fl(Dg, uu) }),
      parts: [numPart(L, { decimals: 1, label: `$${r.v} =$`, suffix: uu })],
      hints: ['The diagonal splits the rectangle into two right triangles. The diagonal is the hypotenuse.', `The ${r.noun} is a leg: $${r.v}^2 = d^2 - w^2$.`],
      solution: [`The width, the ${r.noun} and the diagonal form a right triangle, with the diagonal as the hypotenuse.`, ...legSteps(Dg, W, L, 1, r.v), `The ${r.noun} is about $${ms(fmtFixed(L, 1), uu)}$.`],
    };
  },
});

// ---------------------------------------------------------------------------
// 1.4 Using the Pythagorean theorem
// ---------------------------------------------------------------------------

type SideKey = 'horiz' | 'vert' | 'hyp';
const SIDE_KEYS: SideKey[] = ['horiz', 'vert', 'hyp'];
const FIG_KEY = { horiz: 'ra', vert: 'rb', hyp: 'ab' } as const;

interface CtxSide {
  noun: string;
  given: (v: string) => string;
  ask: string;
  label: string;
}

interface RtCtx {
  hypThing: string;
  u: Unit;
  scene?: RightTriangleFigure['scene'];
  intro: (name: string, town: string) => string;
  order: SideKey[];
  unknowns: SideKey[];
  horiz: CtxSide;
  vert: CtxSide;
  hyp: CtxSide;
  /** [horiz, vert, hyp] with friendly (exact) values. */
  friendly: Array<[number, number, number]>;
  make: (rng: Rng, unknown: SideKey) => [number, number, number];
  hint: string;
}

const pickPair = (h: number, v: number): [number, number, number] => [h, v, Math.hypot(h, v)];
const fromHyp = (c: number, known: number, unknown: 'horiz' | 'vert'): [number, number, number] => {
  const other = Math.sqrt(c * c - known * known);
  return unknown === 'horiz' ? [other, known, c] : [known, other, c];
};

const CONTEXTS: RtCtx[] = [
  {
    hypThing: 'The ladder',
    u: 'm',
    scene: 'ladder',
    intro: (n) => `${n} leans a ladder against the wall of a house to clean the eavestroughs.`,
    order: ['hyp', 'horiz', 'vert'],
    unknowns: ['hyp', 'horiz', 'vert'],
    hyp: { noun: 'length of the ladder', given: (v) => `The ladder is ${v} long.`, ask: 'How long is the ladder', label: 'L' },
    horiz: { noun: 'distance from the wall to the foot of the ladder', given: (v) => `The foot of the ladder is ${v} from the wall.`, ask: 'How far from the wall is the foot of the ladder', label: 'd' },
    vert: { noun: 'height the ladder reaches up the wall', given: (v) => `The top of the ladder touches the wall ${v} above the ground.`, ask: 'How high up the wall does the ladder reach', label: 'h' },
    friendly: [
      [0.7, 2.4, 2.5],
      [1, 2.4, 2.6],
      [1.5, 3.6, 3.9],
      [1.2, 3.5, 3.7],
      [0.9, 4, 4.1],
      [1.5, 2, 2.5],
    ],
    make(rng, k) {
      if (k === 'hyp') return pickPair(rng.int(6, 16) / 10, rng.int(25, 60) / 10);
      const L = rng.pick([3, 3.5, 4, 4.5, 5, 6]);
      if (k === 'vert') return fromHyp(L, rng.int(6, Math.floor(L * 3)) / 10, 'vert');
      return fromHyp(L, roundTo(L - rng.int(2, 6) / 10, 1), 'horiz');
    },
    hint: 'The wall, the ground and the ladder form a right triangle. The ladder is across from the right angle, so it is the hypotenuse.',
  },
  {
    hypThing: 'The diagonal of the screen',
    u: 'in',
    intro: (n) => `${n} is shopping for a TV. TV sizes are measured along the diagonal of the screen.`,
    order: ['hyp', 'horiz', 'vert'],
    unknowns: ['hyp', 'horiz', 'vert'],
    hyp: { noun: 'diagonal of the screen', given: (v) => `The diagonal of the screen is ${v}.`, ask: 'How long is the diagonal of the screen', label: 'd' },
    horiz: { noun: 'width of the screen', given: (v) => `The screen is ${v} wide.`, ask: 'How wide is the screen', label: 'w' },
    vert: { noun: 'height of the screen', given: (v) => `The screen is ${v} tall.`, ask: 'How tall is the screen', label: 'h' },
    friendly: [
      [32, 24, 40],
      [40, 30, 50],
      [48, 36, 60],
      [24, 18, 30],
      [36, 27, 45],
    ],
    make(rng, k) {
      if (k === 'hyp') {
        const w = rng.int(24, 60);
        return pickPair(w, roundTo((w * 9) / 16 + rng.int(-2, 2) / 2, 1));
      }
      const D = rng.pick([32, 40, 43, 50, 55, 65]);
      if (k === 'vert') return fromHyp(D, roundTo(D * 0.87 + rng.int(-3, 3) / 10, 1), 'vert');
      return fromHyp(D, roundTo(D * 0.49 + rng.int(-3, 3) / 10, 1), 'horiz');
    },
    hint: 'The width, the height and the diagonal of the screen form a right triangle. The diagonal is the hypotenuse.',
  },
  {
    hypThing: 'The diagonal of the screen',
    u: 'cm',
    intro: (n) => `${n}’s phone has a rectangular screen.`,
    order: ['horiz', 'vert', 'hyp'],
    unknowns: ['hyp', 'horiz', 'vert'],
    hyp: { noun: 'diagonal of the screen', given: (v) => `The diagonal of the screen is ${v}.`, ask: 'How long is the diagonal of the screen', label: 'd' },
    horiz: { noun: 'width of the screen', given: (v) => `The screen is ${v} wide.`, ask: 'How wide is the screen', label: 'w' },
    vert: { noun: 'height of the screen', given: (v) => `The screen is ${v} tall.`, ask: 'How tall is the screen', label: 'h' },
    friendly: [
      [5, 12, 13],
      [6, 14.4, 15.6],
      [6.5, 15.6, 16.9],
      [7, 16.8, 18.2],
    ],
    make(rng, k) {
      if (k === 'hyp') return pickPair(rng.int(60, 78) / 10, rng.int(130, 165) / 10);
      const D = rng.int(150, 180) / 10;
      if (k === 'vert') return fromHyp(D, rng.int(60, 78) / 10, 'vert');
      return fromHyp(D, roundTo(D * rng.int(88, 93) / 100, 1), 'horiz');
    },
    hint: 'The width, the height and the diagonal of the screen form a right triangle. The diagonal is the hypotenuse.',
  },
  {
    hypThing: 'The sloped surface of the ramp',
    u: 'm',
    scene: 'ramp',
    intro: (n) => `${n} is building a skateboard ramp in the backyard.`,
    order: ['horiz', 'vert', 'hyp'],
    unknowns: ['hyp', 'horiz', 'vert'],
    horiz: { noun: 'run of the ramp', given: (v) => `The ramp covers a horizontal distance of ${v} along the ground.`, ask: 'What horizontal distance does the ramp cover', label: 'r' },
    vert: { noun: 'height of the ramp', given: (v) => `The top of the ramp is ${v} high.`, ask: 'How high is the top of the ramp', label: 'h' },
    hyp: { noun: 'length of the ramp surface', given: (v) => `The sloped surface of the ramp is ${v} long.`, ask: 'How long is the sloped surface of the ramp', label: 's' },
    friendly: [
      [2.4, 0.7, 2.5],
      [1.2, 0.5, 1.3],
      [2, 1.5, 2.5],
      [2.4, 1, 2.6],
      [1.6, 1.2, 2],
    ],
    make(rng, k) {
      if (k === 'hyp') return pickPair(rng.int(15, 40) / 10, rng.int(5, 12) / 10);
      const s = rng.int(18, 40) / 10;
      if (k === 'vert') return fromHyp(s, roundTo((s * rng.int(85, 96)) / 100, 1), 'vert');
      return fromHyp(s, rng.int(5, 12) / 10, 'horiz');
    },
    hint: 'The ground, the height and the sloped surface form a right triangle. The sloped surface is the hypotenuse.',
  },
  {
    hypThing: 'The kite string',
    u: 'm',
    scene: 'kite',
    intro: (n, town) => `${n} is flying a kite at a park in ${town}. The string is pulled straight from ${n}’s hand to the kite.`,
    order: ['hyp', 'horiz', 'vert'],
    unknowns: ['hyp', 'vert'],
    hyp: { noun: 'length of the kite string', given: (v) => `The string is ${v} long.`, ask: 'How long is the string', label: 's' },
    horiz: { noun: 'horizontal distance to the point under the kite', given: (v) => `The kite is directly above a point ${v} away, measured straight along the ground.`, ask: 'How far away along the ground is the point under the kite', label: 'd' },
    vert: { noun: 'height of the kite above the hand', given: (v) => `The kite is ${v} higher than the hand.`, ask: 'How high is the kite above the hand', label: 'h' },
    friendly: [
      [30, 40, 50],
      [24, 32, 40],
      [36, 48, 60],
      [45, 60, 75],
      [20, 48, 52],
    ],
    make(rng, k) {
      if (k === 'hyp') return pickPair(rng.int(15, 50), rng.int(20, 60));
      const s = rng.pick([40, 45, 50, 60, 70, 75, 80]);
      return fromHyp(s, rng.int(Math.ceil(s * 0.3), Math.floor(s * 0.75)), 'vert');
    },
    hint: 'The string, the height and the distance along the ground form a right triangle. The string is the hypotenuse.',
  },
  {
    hypThing: 'The guy rope',
    u: 'm',
    intro: (n) => `${n} is setting up a tent at a campground. A guy rope runs from the top of a tent pole down to a peg in the ground.`,
    order: ['vert', 'horiz', 'hyp'],
    unknowns: ['hyp', 'horiz'],
    vert: { noun: 'height of the pole', given: (v) => `The pole is ${v} tall.`, ask: 'How tall is the pole', label: 'h' },
    horiz: { noun: 'distance from the pole to the peg', given: (v) => `The peg is ${v} from the bottom of the pole.`, ask: 'How far from the bottom of the pole is the peg', label: 'd' },
    hyp: { noun: 'length of the guy rope', given: (v) => `The guy rope is ${v} long.`, ask: 'How long is the guy rope', label: 'r' },
    friendly: [
      [1.2, 0.9, 1.5],
      [1.6, 1.2, 2],
      [2, 1.5, 2.5],
      [2.4, 1, 2.6],
      [1.2, 1.6, 2],
    ],
    make(rng, k) {
      if (k === 'hyp') return pickPair(rng.int(8, 25) / 10, rng.int(8, 20) / 10);
      const r = rng.int(18, 32) / 10;
      return fromHyp(r, roundTo((r * rng.int(40, 70)) / 100, 1), 'horiz');
    },
    hint: 'The pole, the ground and the rope form a right triangle. The rope is across from the right angle, so it is the hypotenuse.',
  },
  {
    hypThing: 'The diagonal',
    u: 'm',
    intro: (n, town) => `At soccer practice in ${town}, ${n} jogs diagonally across a rectangular field from one corner to the opposite corner.`,
    order: ['horiz', 'vert', 'hyp'],
    unknowns: ['hyp', 'vert'],
    horiz: { noun: 'length of the field', given: (v) => `The field is ${v} long.`, ask: 'How long is the field', label: 'l' },
    vert: { noun: 'width of the field', given: (v) => `It is ${v} wide.`, ask: 'How wide is the field', label: 'w' },
    hyp: { noun: 'length of the diagonal', given: (v) => `The diagonal is ${v} long.`, ask: 'How long is the diagonal', label: 'd' },
    friendly: [
      [80, 60, 100],
      [96, 72, 120],
      [100, 75, 125],
      [60, 45, 75],
    ],
    make(rng, k) {
      if (k === 'hyp') return pickPair(rng.int(90, 110), rng.int(55, 75));
      const l = rng.int(95, 110);
      const D = Math.round(Math.hypot(l, rng.int(55, 75)));
      return fromHyp(D, l, 'vert');
    },
    hint: 'The length, the width and the diagonal form a right triangle. The diagonal is the hypotenuse.',
  },
  {
    hypThing: 'The straight-line distance',
    u: 'km',
    intro: (n) => `On a road trip, ${n}’s family drives straight north and then straight east.`,
    order: ['vert', 'horiz', 'hyp'],
    unknowns: ['hyp'],
    vert: { noun: 'distance north', given: (v) => `They drive ${v} north`, ask: 'How far north did they drive', label: 'n' },
    horiz: { noun: 'distance east', given: (v) => `and then ${v} east.`, ask: 'How far east did they drive', label: 'e' },
    hyp: { noun: 'straight-line distance from the start', given: (v) => `They end up ${v} from where they started.`, ask: 'How far are they from where they started, in a straight line', label: 'd' },
    friendly: [
      [40, 30, 50],
      [80, 60, 100],
      [60, 45, 75],
      [120, 50, 130],
      [24, 70, 74],
    ],
    make(rng) {
      return pickPair(rng.int(20, 140), rng.int(20, 140));
    },
    hint: 'Going north and then east makes a right angle. The straight-line distance is the hypotenuse.',
  },
];

/** A one-step right-triangle problem in a context. */
function rtProblem(rng: Rng, ctx: RtCtx, unknown: SideKey, exact: boolean): GenOutput {
  const name = rng.pick(NAMES);
  const town = rng.pick(TOWNS);
  const idx = SIDE_KEYS.indexOf(unknown);
  const vals = exact
    ? rng.pick(ctx.friendly)
    : retry(
        () => ctx.make(rng, unknown),
        (v) => v.every((x) => Number.isFinite(x) && x > 0) && safe(v[idx], 1) && !hasDp(v[idx], 1) && Math.max(v[0], v[1]) / Math.min(v[0], v[1]) < 6,
      );
  const [h, v, c] = vals;
  const val: Record<SideKey, number> = { horiz: h, vert: v, hyp: c };
  const x = val[unknown];
  const dp = exact ? undefined : 1;
  const givens = ctx.order
    .filter((k) => k !== unknown)
    .map((k) => ctx[k].given(`$${ms(val[k], ctx.u)}$`))
    .join(' ');
  const labels: RightTriangleFigure['sideLabels'] = {};
  for (const k of SIDE_KEYS) labels[FIG_KEY[k]] = k === unknown ? ctx[k].label : fl(val[k], ctx.u);
  const steps = unknown === 'hyp' ? hypSteps(h, v, c, dp, ctx.hyp.label) : legSteps(c, unknown === 'horiz' ? v : h, x, dp, ctx[unknown].label);
  const shown = exact ? fmt(x) : fmtFixed(x, 1);
  return {
    prompt: `${ctx.intro(name, town)} ${givens} ${ctx[unknown].ask}${exact ? '' : `, ${nearest(1, ctx.u)}`}?`,
    figure: triFig(CTX_TRI, h, v, labels, ctx.scene),
    parts: [numPart(x, { decimals: dp, suffix: ctx.u, label: `$${ctx[unknown].label} =$` })],
    hints: [
      ctx.hint,
      unknown === 'hyp'
        ? 'You are finding the hypotenuse: square the two legs, add, then take the square root.'
        : 'You are finding a leg: subtract the square of the known leg from the square of the hypotenuse, then take the square root.',
    ],
    solution: [`${ctx.hypThing} is across from the right angle, so it is the hypotenuse.`, ...steps, `The ${ctx[unknown].noun} is ${exact ? '' : 'about '}$${ms(shown, ctx.u)}$.`],
  };
}

function gridFig(A: [number, number], B: [number, number], legs: boolean, labels: [string, string]): PlaneFigure {
  const C: [number, number] = [B[0], A[1]];
  const points: PlanePoint[] = [
    { x: A[0], y: A[1], label: labels[0] },
    { x: B[0], y: B[1], label: labels[1] },
  ];
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: 12, yMin: 0, yMax: 10, step: 1 },
    points,
    segments: [{ from: A, to: B, dashed: !legs }, ...(legs ? [{ from: A, to: C, dashed: true, color: 'accent' as const }, { from: C, to: B, dashed: true, color: 'accent' as const }] : [])],
    hideTickLabels: true,
    hideAxes: true,
  };
}

function gridPoints(rng: Rng, dx: number, dy: number): { A: [number, number]; B: [number, number] } {
  const x1 = rng.int(0, 12 - dx);
  const up = rng.chance(0.5);
  const y1 = up ? rng.int(0, 10 - dy) : rng.int(dy, 10);
  return { A: [x1, y1], B: [x1 + dx, up ? y1 + dy : y1 - dy] };
}

function gridDistance(rng: Rng, d: 1 | 2): GenOutput {
  const [dx, dy] =
    d === 1
      ? rng.pick([[3, 4], [4, 3], [6, 8], [8, 6]] as Array<[number, number]>)
      : retry(
          () => [rng.int(2, 11), rng.int(2, 9)] as [number, number],
          ([a, b]) => !isSquare(a * a + b * b) && safe(Math.hypot(a, b), 1),
        );
  const { A, B } = gridPoints(rng, dx, dy);
  const D = Math.hypot(dx, dy);
  return {
    prompt: `Each square on the grid is $1$ unit long. How long is the line segment from $A$ to $B$${d === 1 ? '' : ', to the nearest tenth of a unit'}?`,
    figure: gridFig(A, B, true, ['A', 'B']),
    parts: [numPart(D, { decimals: d === 1 ? undefined : 1, label: '$AB =$', suffix: 'units' })],
    hints: ['The dashed lines make a right triangle with $AB$ as the hypotenuse. Count the squares along each dashed line.', 'Use $AB^2 = (\\text{across})^2 + (\\text{up or down})^2$.'],
    solution: [
      `Count the squares: the horizontal leg is $${dx}$ units and the vertical leg is $${dy}$ units.`,
      ...hypSteps(dx, dy, D, d === 1 ? undefined : 1, 'AB'),
      `$AB$ is ${d === 1 ? '' : 'about '}$${d === 1 ? fmt(D) : fmtFixed(D, 1)}$ units long.`,
    ],
  };
}

function applyShortcut(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const town = rng.pick(TOWNS);
  const [l, w, dg] = retry(
    () => {
      const l = 10 * rng.int(8, 30);
      const w = 10 * rng.int(5, Math.floor(l / 10) - 1);
      return [l, w, Math.hypot(l, w)] as [number, number, number];
    },
    ([l, w, dg]) => safe(dg, 0) && safe(l + w - dg, 0) && !hasDp(dg, 3),
  );
  const save = l + w - dg;
  return {
    prompt: `A rectangular park in ${town} is $${ms(l, 'm')}$ long and $${ms(w, 'm')}$ wide. ${name} usually walks along two sides of the park to get from one corner to the opposite corner. Today ${name} takes a straight path across the park instead. How long is the path across the park? How much shorter is it than walking along the two sides? Round each answer to the nearest metre.`,
    figure: triFig(CTX_TRI, l, w, { ra: fl(l, 'm'), rb: fl(w, 'm'), ab: 'd' }),
    parts: [numPart(dg, { decimals: 0, label: 'Path across', suffix: 'm' }), numPart(save, { decimals: 0, label: 'Shorter by', suffix: 'm' })],
    hints: ['The two sides of the park and the path across form a right triangle. The path is the hypotenuse.', 'Walking along two sides is $l + w$. Subtract the length of the path from that.'],
    solution: [
      ...hypSteps(l, w, dg, 2, 'd'),
      `Along two sides: $${l} + ${w} = ${l + w}\\ \\text{m}$.`,
      `Difference: $${l + w} - ${fmtFixed(dg, 2)} \\approx ${fmtFixed(save, 2)}$`,
      `The path across is about $${ms(fmtFixed(dg, 0), 'm')}$ long, about $${ms(fmtFixed(save, 0), 'm')}$ shorter than walking along the two sides.`,
    ],
  };
}

function applyBaseball(rng: Rng): GenOutput {
  const town = rng.pick(TOWNS);
  const s = retry(
    () => rng.pick([18, 19, 20, 21, 22, 23, 24, 25, 26, 27]),
    (x) => safe(x * Math.SQRT2, 1) && safe(x * Math.SQRT2 - x, 1),
  );
  const dg = s * Math.SQRT2;
  return {
    prompt: `At the ball diamond in ${town}, the four bases form a square with sides of $${ms(s, 'm')}$. The catcher throws the ball straight from home plate to second base, which is the opposite corner of the square. In the diagram, $H$ is home plate, $F$ is first base and $S$ is second base. How long is the throw? How much longer is it than the distance from home plate to first base? Round each answer to the nearest tenth of a metre.`,
    figure: triFig({ R: 'F', A: 'H', B: 'S', rotate: 0, mirror: false }, s, s, { ra: fl(s, 'm'), rb: fl(s, 'm'), ab: 't' }),
    parts: [numPart(dg, { decimals: 1, label: 'Throw', suffix: 'm' }), numPart(dg - s, { decimals: 1, label: 'Longer by', suffix: 'm' })],
    hints: ['Home plate, first base and second base form a right triangle. The throw is the hypotenuse.', `Both legs are $${ms(s, 'm')}$.`],
    solution: [
      'The corner at first base is a right angle, so the throw from home to second is the hypotenuse.',
      ...hypSteps(s, s, dg, 2, 't'),
      `Difference: $${fmtFixed(dg, 2)} - ${s} \\approx ${fmtFixed(dg - s, 2)}$`,
      `The throw is about $${ms(fmtFixed(dg, 1), 'm')}$, about $${ms(fmtFixed(dg - s, 1), 'm')}$ longer than home to first.`,
    ],
  };
}

function applyTvFit(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const [D, w, h] = retry(
    () => {
      const D = rng.pick([40, 43, 50, 55, 65]);
      const w = roundTo(D * 0.87 + rng.int(-3, 3) / 10, 1);
      return [D, w, Math.sqrt(D * D - w * w)] as [number, number, number];
    },
    ([, , h]) => safe(h, 1),
  );
  const fits = rng.chance(0.5);
  const space = fits ? Math.ceil(h) + rng.int(0, 2) : Math.floor(h) - rng.int(0, 2);
  return {
    prompt: `${name} wants to buy a TV whose screen has a diagonal of $${ms(D, 'in')}$ and a width of $${ms(w, 'in')}$. The TV has to fit under a shelf. The space for the screen is $${ms(space, 'in')}$ tall. How tall is the screen, to the nearest tenth of an inch? Will the screen fit in the space?`,
    figure: triFig(CTX_TRI, w, h, { ra: fl(w, 'in'), rb: 'h', ab: fl(D, 'in') }),
    parts: [numPart(h, { decimals: 1, label: '$h =$', suffix: 'in' }), { label: 'Fits?', answer: fixedChoice(['Yes, the screen fits.', 'No, the screen is too tall.'], fits ? 0 : 1) }],
    hints: ['The width, the height and the diagonal form a right triangle. The diagonal is the hypotenuse.', 'Find the height with $h^2 = d^2 - w^2$, then compare it with the space.'],
    solution: [
      ...legSteps(D, w, h, 1, 'h'),
      fits ? `$${fmtFixed(h, 1)} < ${space}$, so the screen is shorter than the space.` : `$${fmtFixed(h, 1)} > ${space}$, so the screen is taller than the space.`,
      `The screen is about $${ms(fmtFixed(h, 1), 'in')}$ tall, so ${fits ? 'it fits' : 'it does not fit'}.`,
    ],
  };
}

function applyMap(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const [scale, u] = rng.pick([[50, 'm'], [100, 'm'], [20, 'm'], [2, 'km'], [5, 'km']] as Array<[number, Unit]>);
  const places = rng.pick([
    ['S', 'A', 'school', 'arena'],
    ['H', 'L', 'house', 'library'],
    ['C', 'P', 'campsite', 'lookout point'],
    ['F', 'B', 'farmhouse', 'barn'],
    ['R', 'K', 'rink', 'skatepark'],
  ] as const);
  const [dx, dy] = retry(
    () => [rng.int(2, 11), rng.int(2, 9)] as [number, number],
    ([a, b]) => safe(Math.hypot(a, b) * scale, 1) && a !== b,
  );
  const { A, B } = gridPoints(rng, dx, dy);
  const D = Math.hypot(dx, dy) * scale;
  const via = (dx + dy) * scale;
  return {
    prompt: `On ${name}’s map, each square is $${ms(scale, u)}$ long. Point $${places[0]}$ is the ${places[2]} and point $${places[1]}$ is the ${places[3]}. How far is it in a straight line from the ${places[2]} to the ${places[3]}, ${nearest(1, u)}? How much shorter is that than going along the grid lines?`,
    figure: gridFig(A, B, false, [places[0], places[1]]),
    parts: [numPart(D, { decimals: 1, label: 'Straight line', suffix: u }), numPart(via - D, { decimals: 1, label: 'Shorter by', suffix: u })],
    hints: ['Draw a right triangle with the straight line as the hypotenuse. Count the squares across and up or down.', `Change squares to ${UNIT_NAME[u]}s with the scale, or use the theorem in squares first and multiply by $${scale}$ at the end.`],
    solution: [
      `Across: $${dx}$ squares $= ${dx} \\times ${scale} = ${ms(dx * scale, u)}$. ${A[1] < B[1] ? 'Up' : 'Down'}: $${dy}$ squares $= ${dy} \\times ${scale} = ${ms(dy * scale, u)}$.`,
      ...hypSteps(dx * scale, dy * scale, D, 2, 'd'),
      `Along the grid lines: $${dx * scale} + ${dy * scale} = ${ms(via, u)}$, and $${via} - ${fmtFixed(D, 2)} \\approx ${fmtFixed(via - D, 1)}$.`,
      `The straight-line distance is about $${ms(fmtFixed(D, 1), u)}$, about $${ms(fmtFixed(via - D, 1), u)}$ shorter than going along the grid lines.`,
    ],
  };
}

const pythApply = skill({
  id: 'm8-pythagoras-apply',
  name: 'Pythagorean theorem problems',
  description: 'Solve problems with the Pythagorean theorem: ladders, screens, ramps, ball diamonds, shortcuts and distances on a grid.',
  outcomes: ['SS1'],
  lessonId: 'm8-1-4',
  calculator: true,
  gen(rng, d) {
    if (d === 1 || d === 2) {
      if (rng.chance(0.2)) return gridDistance(rng, d);
      const ctx = rng.pick(CONTEXTS);
      return rtProblem(rng, ctx, rng.pick(ctx.unknowns), d === 1);
    }
    const kind = rng.pick(['shortcut', 'baseball', 'tv', 'map'] as const);
    if (kind === 'shortcut') return applyShortcut(rng);
    if (kind === 'baseball') return applyBaseball(rng);
    if (kind === 'tv') return applyTvFit(rng);
    return applyMap(rng);
  },
});

// ---- Is it a right triangle? ----

function rightSet(rng: Rng, scale: number): number[] {
  const [p, q, h] = rng.pick(TRIPLES.slice(0, 10));
  return [p, q, h].map((x) => roundTo(x * scale, 2));
}

function notRightSet(rng: Rng, scale: number): number[] {
  return retry(
    () => {
      const s = rightSet(rng, scale);
      const which = rng.int(0, 2);
      s[which] = roundTo(s[which] + rng.pick([-2, -1, 1, 2]) * scale, 2);
      return s.sort((x, y) => x - y);
    },
    (s) => s[0] > 0 && s[0] + s[1] > s[2] + 1e-9 && Math.abs(sq(s[0]) + sq(s[1]) - sq(s[2])) > 1e-6 && new Set(s).size === 3,
  );
}

function rightTestSteps(s: number[], u: string): string[] {
  const [a, b, c] = s;
  const sum = roundTo(sq(a) + sq(b), 6);
  const right = Math.abs(sum - sq(c)) < 1e-6;
  return [
    `The longest side, $${ms(c, u)}$, is the only side that could be the hypotenuse.`,
    `$a^2 + b^2 = ${fmt(a)}^2 + ${fmt(b)}^2 = ${big(sq(a))} + ${big(sq(b))} = ${big(sum)}$`,
    `$c^2 = ${fmt(c)}^2 = ${big(sq(c))}$`,
    right ? `$${big(sum)} = ${big(sq(c))}$, so $a^2 + b^2 = c^2$ and the triangle **is** a right triangle.` : `$${big(sum)} \\ne ${big(sq(c))}$, so the triangle is **not** a right triangle.`,
  ];
}

const sidesText = (s: number[], u: string) => `$${ms(s[0], u)}$, $${ms(s[1], u)}$ and $${ms(s[2], u)}$`;
const CONVERSE = 'If the squares of the two shorter sides add up to the square of the longest side, the triangle is a right triangle. If not, it is not.';

function testReasons(rng: Rng, s: number[], u: string): GenOutput {
  const shown = rng.shuffle(s);
  const [a, b, c] = s;
  const sum = roundTo(sq(a) + sq(b), 6);
  const right = Math.abs(sum - sq(c)) < 1e-6;
  const correct = right
    ? `Yes, because $${fmt(a)}^2 + ${fmt(b)}^2 = ${fmt(c)}^2$: $${big(sq(a))} + ${big(sq(b))} = ${big(sq(c))}$.`
    : `No, because $${fmt(a)}^2 + ${fmt(b)}^2 = ${big(sum)}$, but $${fmt(c)}^2 = ${big(sq(c))}$.`;
  const wrong = right
    ? [
        `No, because $${fmt(a)} + ${fmt(b)} = ${fmt(roundTo(a + b, 4))}$, not $${fmt(c)}$.`,
        `No, because $${fmt(b)}^2 + ${fmt(c)}^2$ is not equal to $${fmt(a)}^2$.`,
        `You cannot tell without measuring the angles.`,
      ]
    : [
        `Yes, because $${fmt(c)}$ is the longest side.`,
        `Yes, because $${fmt(a)} + ${fmt(b)}$ is greater than $${fmt(c)}$.`,
        `You cannot tell without measuring the angles.`,
      ];
  return {
    prompt: `A triangle has sides of ${sidesText(shown, u)}. Is it a right triangle? Choose the correct answer and reason.`,
    parts: [{ answer: mc(rng, correct, wrong) }],
    hints: ['Only the longest side can be the hypotenuse.', CONVERSE],
    solution: rightTestSteps(s, u),
  };
}

function testWhichSet(rng: Rng): GenOutput {
  const scale = rng.pick([1, 1, 2, 0.5]);
  const right = rightSet(rng, scale);
  const plus = rng.pick([1, 2]) * (scale < 1 ? 0.5 : 1);
  const added = right.map((x) => roundTo(x + plus, 2));
  const wrongs: number[][] = [];
  if (Math.abs(sq(added[0]) + sq(added[1]) - sq(added[2])) > 1e-6) wrongs.push(added);
  for (let i = 0; wrongs.length < 3 && i < 20; i++) {
    const s = notRightSet(rng, scale);
    const isRight = Math.abs(sq(s[0]) + sq(s[1]) - sq(s[2])) < 1e-6;
    if (!isRight && !wrongs.some((w) => w.join() === s.join())) wrongs.push(s);
  }
  const u = rng.pick(['cm', 'm']);
  const md = (s: number[]) => `$${fmt(s[0])}\\ \\text{${u}}$, $${fmt(s[1])}\\ \\text{${u}}$, $${fmt(s[2])}\\ \\text{${u}}$`;
  const [a, b, c] = right;
  return {
    prompt: 'Which set of side lengths makes a right triangle?',
    parts: [{ answer: mc(rng, md(right), wrongs.map(md)) }],
    hints: ['For each set, the longest side would be the hypotenuse.', 'Check whether the squares of the two shorter sides add up to the square of the longest side.'],
    solution: [
      ...wrongs.map((w) => `$${fmt(w[0])}^2 + ${fmt(w[1])}^2 = ${big(roundTo(sq(w[0]) + sq(w[1]), 6))}$ but $${fmt(w[2])}^2 = ${big(sq(w[2]))}$: not a right triangle.`),
      `$${fmt(a)}^2 + ${fmt(b)}^2 = ${big(sq(a))} + ${big(sq(b))} = ${big(roundTo(sq(a) + sq(b), 6))} = ${fmt(c)}^2$`,
      `The right triangle has sides ${md(right)}.`,
    ],
  };
}

const CORNER_JOBS = [
  'building a rectangular garden box',
  'building a wooden frame for a sandbox',
  'laying out a rectangular skating rink in the backyard',
  'building a bookshelf',
  'framing a rectangular window box',
];

function testCorner(rng: Rng): GenOutput {
  const name = rng.pick(NAMES);
  const job = rng.pick(CORNER_JOBS);
  const [p, q, h] = rng.pick(TRIPLES.slice(0, 8));
  const k = rng.pick([10, 20, 5]);
  const a = p * k;
  const b = q * k;
  const c = h * k;
  const square = rng.chance(0.5);
  const diag = square ? c : c + rng.pick([-3, -2, -1, 1, 2, 3]);
  const sum = a * a + b * b;
  const correct = square ? `Yes. $${a}^2 + ${b}^2 = ${big(sum)} = ${diag}^2$, so the corner is a right angle.` : `No. For a right angle, the diagonal must be $\\sqrt{${big(sum)}} = ${c}\\ \\text{cm}$, not $${diag}\\ \\text{cm}$.`;
  const wrong = square
    ? [`No. For a right angle, the diagonal must be $${a} + ${b} = ${a + b}\\ \\text{cm}$.`, `No. The diagonal must be the same length as the longer side.`, 'You cannot tell without a protractor.']
    : [`Yes. The diagonal is the longest side, so the corner is a right angle.`, `Yes. $${diag}\\ \\text{cm}$ is close to $${c}\\ \\text{cm}$, so the corner is square.`, `No. For a right angle, the diagonal must be $${a} + ${b} = ${a + b}\\ \\text{cm}$.`];
  return {
    prompt: `${name} is ${job}. To check that a corner is square (a right angle), ${name} measures $${a}\\ \\text{cm}$ along one side and $${b}\\ \\text{cm}$ along the other side. The diagonal between those two marks is $${diag}\\ \\text{cm}$. Is the corner a right angle?`,
    parts: [{ answer: mc(rng, correct, wrong) }],
    hints: ['The two sides and the diagonal make a triangle. The diagonal is the longest side.', CONVERSE],
    solution: [
      `For a right angle, the diagonal would be the hypotenuse: $${a}^2 + ${b}^2 = ${big(a * a)} + ${big(b * b)} = ${big(sum)}$.`,
      `$${diag}^2 = ${big(diag * diag)}$`,
      square ? `$${big(sum)} = ${big(diag * diag)}$, so the corner is a right angle.` : `$${big(sum)} \\ne ${big(diag * diag)}$, so the corner is not a right angle. The diagonal should be $\\sqrt{${big(sum)}} = ${c}\\ \\text{cm}$.`,
    ],
  };
}

const rightTriangleTest = skill({
  id: 'm8-right-triangle-test',
  name: 'Is it a right triangle?',
  description: 'Decide whether a triangle with given side lengths is a right triangle by checking whether a² + b² = c².',
  outcomes: ['SS1'],
  lessonId: 'm8-1-4',
  format: 'mc',
  calculator: true,
  gen(rng, d) {
    if (d === 1) {
      const u = rng.pick(RT_UNITS);
      const s = rng.chance(0.5) ? rightSet(rng, rng.pick([1, 1, 2])) : notRightSet(rng, 1);
      const right = Math.abs(sq(s[0]) + sq(s[1]) - sq(s[2])) < 1e-6;
      const shown = rng.shuffle(s);
      return {
        prompt: `A triangle has sides of ${sidesText(shown, u)}. Is it a right triangle?`,
        parts: [{ answer: fixedChoice(['Yes, it is a right triangle.', 'No, it is not a right triangle.'], right ? 0 : 1) }],
        hints: ['Only the longest side can be the hypotenuse.', CONVERSE],
        solution: rightTestSteps(s, u),
      };
    }
    if (d === 2) {
      const u = rng.pick(RT_UNITS);
      const scale = rng.pick([1, 1, 0.5, 0.1, 3]);
      const s = rng.chance(0.5) ? rightSet(rng, scale) : notRightSet(rng, scale);
      return testReasons(rng, s, u);
    }
    return rng.chance(0.5) ? testWhichSet(rng) : testCorner(rng);
  },
});

export const PYTHAGORAS_SKILLS: SkillDef[] = [perfectSquares, estimateSqrt, pythHyp, pythLeg, pythApply, rightTriangleTest];
