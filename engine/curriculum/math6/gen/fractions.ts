/** Math 6 Unit 4 — Fractions (N5, N6, N7). */
import { fixedChoice, mc, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { frac, gcd, type Frac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, Part, PlanePoint, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type Out = GenOutput;

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Kiona', 'Liam', 'Mei', 'Tariq', 'Sofia', 'Aiden', 'Nadia', 'Ravi',
  'Chloé', 'Dakota', 'Hamid', 'Jasmine', 'Wei', 'Olivia', 'Kwame', 'Simran', 'Ethan', 'Fatima', 'Noah',
  'Leilani', 'Émilie', 'Tyler', 'Aaliyah', 'Connor', 'Anika', 'Gurpreet', 'Marcus', 'Ayesha', 'Owen',
  'Sienna', 'Jun', 'Malik', 'Harpreet', 'Isabelle', 'Talia', 'Yusuf', 'Rosalie', 'Nathan', 'Tanis',
];
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater'];

const T = '\\times';
const D = '\\div';
/** A fraction in LaTeX exactly as written (not simplified). */
const fr = (n: number | string, d: number | string) => `\\dfrac{${n}}{${d}}`;
const ff = (n: number, d: number) => `$${fr(n, d)}$`;
const frf = (f: Frac) => (f.d === 1 ? `${f.n}` : fr(f.n, f.d));
/** A positive fraction as a mixed number in LaTeX (or a whole number or proper fraction). */
function mixedOf(f: Frac): string {
  const g = frac(f.n, f.d);
  const w = Math.floor(g.n / g.d);
  const r = g.n - w * g.d;
  if (r === 0) return `${w}`;
  return w === 0 ? fr(r, g.d) : `${w}${fr(r, g.d)}`;
}
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const tx = (u: string) => `\\text{${u}}`;
const pickName = (rng: Rng, not: string[] = []) => rng.pick(NAMES.filter((n) => !not.includes(n)));
/** Proper numerators in lowest terms for denominator d. */
const lowNums = (d: number) => Array.from({ length: d - 1 }, (_, i) => i + 1).filter((n) => gcd(n, d) === 1);

const LOWEST = 'Write your answer in lowest terms.';
const MIXED = 'Write your answer as a mixed number in lowest terms.';

/** Ask for a mixed number when the answer is more than 1 (and not whole); otherwise lowest terms. */
const isMixed = (f: Frac) => f.d !== 1 && f.n > f.d;
const formSay = (f: Frac) => (isMixed(f) ? MIXED : LOWEST);

function fracPart(f: Frac, opts: { suffix?: string; label?: string } = {}): Part {
  return numPart(f.n / f.d, { fraction: isMixed(f) ? 'mixed' : 'lowest', suffix: opts.suffix, label: opts.label });
}

function simplifyStep(n: number, d: number): string | null {
  const g = gcd(n, d);
  if (g <= 1 || n === 0) return null;
  return `Simplify: divide the numerator and the denominator by $${g}$. $${fr(n, d)} = ${frf(frac(n, d))}$`;
}

/** The last sentence for a fraction answer: "4/3, or 1 1/3". */
function resultWords(f: Frac, unit = ''): string {
  const u = unit ? `\\ ${tx(unit)}` : '';
  return isMixed(f) ? `$${frf(f)} = ${mixedOf(f)}${u}$` : `$${frf(f)}${u}$`;
}

/** Fraction strips on a blank canvas: each row is a bar cut into equal parts with the first `shaded` parts striped. */
function strips(rows: Array<{ parts: number; shaded: number }>, caption: string): Figure {
  const W = 120;
  const h = 16;
  const gap = 10;
  const H = rows.length * (h + gap) + gap;
  const polylines: Array<{ points: Array<[number, number]>; color?: 'brand' | 'accent' | 'muted' }> = [];
  const segments: Array<{ from: [number, number]; to: [number, number]; color?: 'brand' | 'accent' | 'muted' }> = [];
  const r3 = (x: number) => Math.round(x * 1000) / 1000;
  rows.forEach((r, i) => {
    const y0 = H - gap - h - i * (h + gap);
    const cw = W / r.parts;
    for (let j = 1; j <= 5 && r.shaded > 0; j++) {
      const y = r3(y0 + (h * j) / 6);
      segments.push({ from: [0.8, y], to: [r3(r.shaded * cw - 0.8), y], color: 'accent' });
    }
    for (let k = 1; k < r.parts; k++) segments.push({ from: [r3(k * cw), y0], to: [r3(k * cw), y0 + h], color: 'brand' });
    polylines.push({ points: [[0, y0], [W, y0], [W, y0 + h], [0, y0 + h], [0, y0]] });
  });
  return { type: 'plane', grid: { xMin: -2, xMax: W + 2, yMin: 0, yMax: H, step: W + 4 }, polylines, segments, hideTickLabels: true, caption };
}

/** A set of dots in `groups` equal rows of `per`; the first `shaded` rows are boxed and coloured. */
function groupsFig(groups: number, per: number, shaded: number, caption: string): Figure {
  const W = per + 1;
  const rowH = 1.4;
  const H = groups * rowH + 0.6;
  const points: PlanePoint[] = [];
  const polylines: Array<{ points: Array<[number, number]>; color?: 'brand' | 'accent' | 'muted'; fill?: boolean }> = [];
  const r2 = (x: number) => Math.round(x * 100) / 100;
  for (let g = 0; g < groups; g++) {
    const y = r2(H - 0.3 - rowH * g - rowH / 2);
    const on = g < shaded;
    for (let k = 0; k < per; k++) points.push({ x: k + 1, y, color: on ? 'brand' : 'muted' });
    const lo = r2(y - 0.5);
    const hi = r2(y + 0.5);
    polylines.push({ points: [[0.4, lo], [per + 0.6, lo], [per + 0.6, hi], [0.4, hi], [0.4, lo]], color: on ? 'accent' : 'muted', fill: on || undefined });
  }
  return { type: 'plane', grid: { xMin: 0, xMax: W, yMin: 0, yMax: r2(H), step: Math.max(W, r2(H)) }, polylines, points, hideTickLabels: true, caption };
}

// ---------------------------------------------------------------------------
// 4.1 Fractions as quotients
// ---------------------------------------------------------------------------

interface ShareCtx {
  /** Things shared, singular and plural. */
  one: string;
  many: string;
  /** The people sharing. */
  who: string;
  whoOne: string;
  /** "of a pizza" — what each share is a fraction of. */
  of: string;
}

const SHARE: ShareCtx[] = [
  { one: 'pizza', many: 'pizzas', who: 'friends', whoOne: 'friend', of: 'of a pizza' },
  { one: 'granola bar', many: 'granola bars', who: 'hikers', whoOne: 'hiker', of: 'of a granola bar' },
  { one: 'sandwich', many: 'sandwiches', who: 'campers', whoOne: 'camper', of: 'of a sandwich' },
  { one: 'pan of brownies', many: 'pans of brownies', who: 'teams', whoOne: 'team', of: 'of a pan' },
  { one: 'loaf of bannock', many: 'loaves of bannock', who: 'families', whoOne: 'family', of: 'of a loaf' },
  { one: 'cake', many: 'cakes', who: 'groups', whoOne: 'group', of: 'of a cake' },
  { one: 'pie', many: 'pies', who: 'tables', whoOne: 'table', of: 'of a pie' },
  { one: 'sheet of stickers', many: 'sheets of stickers', who: 'students', whoOne: 'student', of: 'of a sheet' },
];

/** a things shared by b people, as words. */
const shareText = (c: ShareCtx, a: number, b: number) => `$${a}$ ${a === 1 ? c.one : c.many} ${a === 1 ? 'is' : 'are'} shared equally by $${b}$ ${c.who}`;

interface MeasureCtx {
  unit: string;
  text: (a: number, b: number, name: string) => string;
  ask: string;
  answer: (x: string) => string;
}

const MEASURE: MeasureCtx[] = [
  { unit: 'm', text: (a, b, name) => `${name} cuts a $${a}$ m rope into $${b}$ equal pieces for a camping trip.`, ask: 'How long is each piece?', answer: (x) => `Each piece is $${x}$ m long.` },
  { unit: 'L', text: (a, b, name) => `${name} pours $${a}$ L of juice equally into $${b}$ jugs for a class party.`, ask: 'How much juice is in each jug?', answer: (x) => `Each jug has $${x}$ L of juice.` },
  { unit: 'kg', text: (a, b, name) => `${name} shares $${a}$ kg of birdseed equally among $${b}$ bird feeders.`, ask: 'How much birdseed goes in each feeder?', answer: (x) => `Each feeder gets $${x}$ kg of birdseed.` },
  { unit: 'm', text: (a, b, name) => `${name} cuts $${a}$ m of ribbon into $${b}$ equal pieces to wrap gifts.`, ask: 'How long is each piece?', answer: (x) => `Each piece is $${x}$ m long.` },
  { unit: 'L', text: (a, b, name) => `${name} shares $${a}$ L of water equally among $${b}$ water bottles before a soccer game.`, ask: 'How much water goes in each bottle?', answer: (x) => `Each bottle gets $${x}$ L of water.` },
  { unit: 'km', text: (a, b) => `A relay race is $${a}$ km long. It is split into $${b}$ equal parts, one for each runner.`, ask: 'How far does each runner go?', answer: (x) => `Each runner goes $${x}$ km.` },
];

/** Denominators that give terminating decimals with at most three decimal places. */
const DEC_DENS = [2, 4, 5, 8, 10, 20, 25, 50];

const fmtDec = (x: number) => String(Math.round(x * 1000) / 1000);

/** The standard division algorithm for a ÷ b written as short steps (a terminating quotient). */
function divSteps(a: number, b: number): string[] {
  const whole = Math.floor(a / b);
  let r = a % b;
  const steps: string[] = [];
  steps.push(whole > 0 ? `$${a} ${D} ${b} = ${whole}\\text{ R }${r}$. Write $${whole}$ and a decimal point.` : `$${b}$ does not go into $${a}$. Write $0$ and a decimal point.`);
  const bits: string[] = [];
  let guard = 0;
  while (r !== 0 && guard++ < 4) {
    const n = r * 10;
    const q = Math.floor(n / b);
    r = n % b;
    bits.push(`$${n} ${D} ${b} = ${q}${r ? `\\text{ R }${r}` : ''}$`);
  }
  steps.push(`Put a zero after the remainder and keep dividing: ${bits.join(', ')}.`);
  return steps;
}

function shareD1(rng: Rng): Out {
  const c = rng.pick(SHARE);
  const b = rng.int(2, 8);
  const a = rng.pick(lowNums(b).filter((n) => n >= 2).length ? lowNums(b).filter((n) => n >= 2) : lowNums(b));
  return {
    prompt: `${cap(shareText(c, a, b))}. How much does each ${c.whoOne} get? Write the answer as a fraction in lowest terms.`,
    figure: strips(Array.from({ length: a }, () => ({ parts: b, shaded: 1 })), `Each of the ${a} ${a === 1 ? c.one : c.many} is cut into ${b} equal pieces. One ${c.whoOne}'s share is striped.`),
    parts: [fracPart(frac(a, b), { suffix: c.of })],
    hints: ['Cut each one into as many equal pieces as there are people sharing.', `A fraction is a division: $${a}$ shared by $${b}$ is $${a} ${D} ${b} = ${fr(a, b)}$.`],
    solution: [
      `Cut each ${c.one} into $${b}$ equal pieces. Each piece is $${fr(1, b)}$ ${c.of}.`,
      `Each ${c.whoOne} gets one piece from each ${c.one}. That is $${a}$ pieces of size $${fr(1, b)}$.`,
      `$${a}$ pieces of $${fr(1, b)}$ make $${fr(a, b)}$. This is the quotient $${a} ${D} ${b}$.`,
      `Each ${c.whoOne} gets $${fr(a, b)}$ ${c.of}.`,
    ],
  };
}

function divisionStatementMc(rng: Rng): Out {
  const b = rng.int(3, 12);
  const a = rng.pick(lowNums(b).filter((n) => n >= 2));
  const c = rng.pick(SHARE);
  if (rng.chance(0.5)) {
    return {
      prompt: `Which division statement means the same as $${fr(a, b)}$?`,
      parts: [{ answer: mc(rng, `$${a} ${D} ${b}$`, [`$${b} ${D} ${a}$`, `$${a} ${T} ${b}$`, `$${b} - ${a}$`]) }],
      hints: ['A fraction bar means "divided by".', 'The numerator is the amount shared. The denominator is the number of shares.'],
      solution: [`The fraction bar means "divided by".`, `The numerator, $${a}$, is divided by the denominator, $${b}$.`, `$${fr(a, b)} = ${a} ${D} ${b}$`],
    };
  }
  return {
    prompt: `Which sharing situation does $${fr(a, b)}$ describe?`,
    parts: [{ answer: mc(rng, `${cap(shareText(c, a, b))}.`, [`${cap(shareText(c, b, a))}.`, `$${a}$ ${c.who} each get $${b}$ ${b === 1 ? c.one : c.many}.`]) }],
    hints: ['In an equal-sharing fraction, the numerator is the amount shared.', 'The denominator is the number of shares.'],
    solution: [
      `$${fr(a, b)} = ${a} ${D} ${b}$.`,
      `The numerator, $${a}$, is the amount shared. The denominator, $${b}$, is the number of shares.`,
      `So $${fr(a, b)}$ describes this: ${shareText(c, a, b)}.`,
    ],
  };
}

function toDecimal(rng: Rng): Out {
  const b = rng.pick(DEC_DENS);
  const a = retry(() => rng.int(1, b < 10 ? 2 * b - 1 : b - 1), (n) => n % b !== 0 && gcd(n, b) === 1);
  const value = a / b;
  return {
    prompt: `Write $${fr(a, b)}$ as a decimal. Divide the numerator by the denominator.`,
    parts: [numPart(value, { exact: false, asDecimal: true, label: 'Decimal:' })],
    hints: [`$${fr(a, b)}$ means $${a} ${D} ${b}$.`, `Use the standard algorithm. When there is a remainder, write a zero after it and keep dividing.`],
    solution: [`$${fr(a, b)} = ${a} ${D} ${b}$.`, ...divSteps(a, b), `Check: $${b} ${T} ${fmtDec(value)} = ${a}$.`, `$${fr(a, b)} = ${fmtDec(value)}$`],
  };
}

function shareD2(rng: Rng): Out {
  const kind = rng.pick(['mixed', 'equivalent', 'measure'] as const);
  const name = pickName(rng);
  if (kind === 'measure') {
    const c = rng.pick(MEASURE);
    const b = rng.pick([2, 4, 5, 8, 10]);
    const a = retry(() => rng.int(1, 3 * b), (n) => n % b !== 0 && (c.unit !== 'km' || n >= 2));
    const value = a / b;
    return {
      prompt: `${c.text(a, b, name)} ${c.ask} Write your answer as a decimal.`,
      parts: [numPart(value, { exact: false, asDecimal: true, suffix: c.unit })],
      hints: [`Each share is $${a} ${D} ${b} = ${fr(a, b)}$ ${c.unit}.`, 'Divide the numerator by the denominator to get the decimal.'],
      solution: [`Each share is $${a} ${D} ${b} = ${fr(a, b)}$ ${c.unit}.`, ...divSteps(a, b), c.answer(fmtDec(value))],
    };
  }
  const c = rng.pick(SHARE);
  if (kind === 'mixed') {
    const b = rng.int(2, 6);
    const a = retry(() => rng.int(b + 1, 4 * b), (n) => gcd(n, b) === 1);
    const f = frac(a, b);
    const w = Math.floor(a / b);
    return {
      prompt: `${cap(shareText(c, a, b))}. How much does each ${c.whoOne} get? ${MIXED}`,
      parts: [fracPart(f, { suffix: c.many })],
      hints: [`Each ${c.whoOne} gets $${a} ${D} ${b} = ${fr(a, b)}$.`, `How many whole ${c.many} can each ${c.whoOne} get? Then share what is left.`],
      solution: [
        `Each ${c.whoOne} gets $${a} ${D} ${b} = ${fr(a, b)}$.`,
        `$${a} ${D} ${b} = ${w}\\text{ R }${a - w * b}$. Each ${c.whoOne} gets $${w}$ whole ${w === 1 ? c.one : c.many}, and $${a - w * b}$ ${a - w * b === 1 ? c.one : c.many} ${a - w * b === 1 ? 'is' : 'are'} left to share.`,
        `The ${a - w * b === 1 ? c.one : c.many} left over ${a - w * b === 1 ? 'is' : 'are'} shared by $${b}$, so each also gets $${fr(a - w * b, b)}$.`,
        `Each ${c.whoOne} gets $${mixedOf(f)}$ ${c.many}.`,
      ],
    };
  }
  // equivalent: a share that simplifies
  const q = rng.int(3, 8);
  const p = rng.pick(lowNums(q));
  const k = rng.int(2, Math.max(2, Math.floor(20 / q)));
  const a = p * k;
  const b = q * k;
  return {
    prompt: `${cap(shareText(c, a, b))}. How much does each ${c.whoOne} get? ${LOWEST}`,
    parts: [fracPart(frac(a, b), { suffix: c.of })],
    hints: [`Each ${c.whoOne} gets $${a} ${D} ${b} = ${fr(a, b)}$.`, `Divide the numerator and denominator by $${k}$ to write it in lowest terms.`],
    solution: [`Each ${c.whoOne} gets $${a} ${D} ${b} = ${fr(a, b)}$ ${c.of}.`, simplifyStep(a, b)!, `Equivalent fractions show the same share. Each ${c.whoOne} gets $${fr(p, q)}$ ${c.of}.`],
  };
}

function shareD3(rng: Rng): Out {
  const kind = rng.pick(['compare', 'people', 'same'] as const);
  const base = rng.pick([SHARE[0], SHARE[1], SHARE[2], SHARE[7]]);
  if (kind === 'compare') {
    const c = { ...rng.pick([SHARE[0], SHARE[2], SHARE[5], SHARE[6]]), who: 'students', whoOne: 'student' };
    const opts: Array<[number, number]> = [[1, 2], [1, 4], [3, 4], [2, 5], [3, 5], [4, 5], [3, 8], [5, 8], [7, 8], [3, 10], [7, 10], [9, 10], [1, 5]];
    const same = rng.chance(0.15);
    const [x, y] = retry(
      () => {
        const [p1, q1] = rng.pick(opts);
        if (same) {
          const k = rng.int(2, 3);
          return [[p1, q1], [p1 * k, q1 * k]] as Array<[number, number]>;
        }
        const [p2, q2] = rng.pick(opts);
        return [[p1, q1], [p2, q2]] as Array<[number, number]>;
      },
      ([u, v]) => same || (u[1] !== v[1] && Math.abs(u[0] / u[1] - v[0] / v[1]) > 0.04),
    );
    const vx = x[0] / x[1];
    const vy = y[0] / y[1];
    const idx = Math.abs(vx - vy) < 1e-9 ? 2 : vx > vy ? 0 : 1;
    const [A, B] = ['Table A', 'Table B'];
    return {
      prompt: `At a class party, ${c.many} are shared equally at each table. At ${A}, $${x[0]}$ ${x[0] === 1 ? c.one : c.many} ${x[0] === 1 ? 'is' : 'are'} shared by $${x[1]}$ ${c.who}. At ${B}, $${y[0]}$ ${y[0] === 1 ? c.one : c.many} ${y[0] === 1 ? 'is' : 'are'} shared by $${y[1]}$ ${c.who}. At which table does each ${c.whoOne} get more?`,
      parts: [{ answer: fixedChoice([A, B, 'Each gets the same amount at both tables'], idx) }],
      hints: ['Write each share as a fraction: amount shared ÷ number of shares.', 'Divide to change each fraction to a decimal, then compare.'],
      solution: [
        `${A}: $${x[0]} ${D} ${x[1]} = ${fr(x[0], x[1])} = ${fmtDec(vx)}$.`,
        `${B}: $${y[0]} ${D} ${y[1]} = ${fr(y[0], y[1])} = ${fmtDec(vy)}$.`,
        idx === 2 ? `The decimals are equal, so each ${c.whoOne} gets the same amount.` : `$${fmtDec(Math.max(vx, vy))} > ${fmtDec(Math.min(vx, vy))}$.`,
        idx === 2 ? 'Each gets the same amount at both tables.' : `Each ${c.whoOne} gets more at ${idx === 0 ? A : B}.`,
      ],
    };
  }
  const c = base;
  if (kind === 'people') {
    const q = rng.int(3, 8);
    const p = rng.pick(lowNums(q).filter((n) => n >= 2));
    const k = retry(() => rng.int(2, 6), (m) => q * m <= 30);
    const a = p * k;
    const people = q * k;
    return {
      prompt: `Some ${c.who} share $${a}$ ${c.many} equally. Each ${c.whoOne} gets $${fr(p, q)}$ ${c.of}. How many ${c.who} are there?`,
      parts: [numPart(people, { exact: false, suffix: c.who })],
      hints: [`The share is $${a} ${D} (\\text{number of ${c.who}})$, so it is a fraction with numerator $${a}$.`, `Find a fraction equal to $${fr(p, q)}$ with numerator $${a}$: multiply the top and bottom by the same number.`],
      solution: [
        `Each share is $${fr(a, '?')}$, where ? is the number of ${c.who}.`,
        `$${fr(a, '?')} = ${fr(p, q)}$. The numerator changed from $${p}$ to $${a}$, which is $${p} ${T} ${k}$.`,
        `Multiply the denominator by $${k}$ too: $${q} ${T} ${k} = ${people}$. So $${fr(p, q)} = ${fr(a, people)}$.`,
        `Check: $${a} ${D} ${people} = ${fr(a, people)} = ${fr(p, q)}$.`,
        `There are $${people}$ ${c.who}.`,
      ],
    };
  }
  // same: which sharing gives the same amount
  const b = rng.int(3, 6);
  const a = rng.pick(lowNums(b));
  const k = rng.int(2, 4);
  const sh = (x: number, y: number) => `$${x}$ ${x === 1 ? c.one : c.many} shared by $${y}$ ${c.who}`;
  const distractors = [sh(a + k, b + k), sh(a * k, b), sh(b, a), sh(a, b * k)];
  return {
    prompt: `${cap(shareText(c, a, b))}. Which sharing gives each ${c.whoOne} the **same** amount?`,
    parts: [{ answer: mc(rng, sh(a * k, b * k), distractors) }],
    hints: [`Each ${c.whoOne} gets $${fr(a, b)}$ ${c.of}.`, 'Equivalent fractions give the same quotient. Look for a sharing whose fraction is equivalent.'],
    solution: [
      `Each ${c.whoOne} gets $${a} ${D} ${b} = ${fr(a, b)}$ ${c.of}.`,
      `$${a * k}$ shared by $${b * k}$ is $${fr(a * k, b * k)}$. Divide the top and bottom by $${k}$: $${fr(a * k, b * k)} = ${fr(a, b)}$.`,
      `Adding the same number to the top and bottom does not keep a fraction equal. Neither does changing only one of them.`,
      `The answer is ${sh(a * k, b * k)}.`,
    ],
  };
}

const fractionQuotient = skill({
  id: 'm6-fraction-quotient',
  name: 'Fractions as quotients',
  description: 'Describe equal sharing with a fraction, write a fraction as a division and back, and write a fraction as a decimal by dividing.',
  outcomes: ['N5'],
  lessonId: 'm6-4-1',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return rng.chance(0.6) ? shareD1(rng) : divisionStatementMc(rng);
    if (d === 2) return rng.chance(0.4) ? toDecimal(rng) : shareD2(rng);
    return shareD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 4.2 Adding and subtracting fractions
// ---------------------------------------------------------------------------

/** Rewrite n/d with denominator L, showing the multiplication. */
function convert(n: number, d: number, L: number): string {
  const k = L / d;
  return `$${fr(n, d)} = ${fr(`${n} ${T} ${k}`, `${d} ${T} ${k}`)} = ${fr(n * k, L)}$`;
}

/** Steps for a sum or difference of fractions with related or unrelated denominators. */
function fracSteps(terms: Array<[number, number]>, ops: Array<'+' | '-'>, useL?: number): { steps: string[]; result: Frac; L: number } {
  const dens = [...new Set(terms.map((t) => t[1]))].sort((a, b) => a - b);
  const big = dens[dens.length - 1];
  const related = dens.every((x) => big % x === 0);
  const L = useL ?? (related ? big : dens.reduce((p, x) => p * x, 1));
  const steps: string[] = [];
  if (dens.length === 1) {
    steps.push(`The denominators are the same, so the pieces are the same size. Work with the numerators and keep the denominator $${L}$.`);
  } else if (related && L === big) {
    const why = dens.slice(0, -1).map((x) => `$${big} = ${x} ${T} ${big / x}$`).join(' and ');
    steps.push(`The denominators are related: ${why}. Use $${big}$ as the common denominator.`);
  } else if (useL === undefined) {
    steps.push(`The denominators are not related. Multiply them to get a common denominator: $${dens.join(` ${T} `)} = ${L}$.`);
  } else {
    steps.push(`Both denominators divide into $${L}$, so use $${L}$ as the common denominator.`);
  }
  const conv = terms.filter((t) => t[1] !== L).map((t) => convert(t[0], t[1], L));
  if (conv.length) steps.push(`Write ${conv.length === 1 ? 'the fraction' : 'each fraction'} with denominator $${L}$: ${conv.join(' and ')}.`);
  const nums = terms.map((t) => t[0] * (L / t[1]));
  let lhs = fr(nums[0], L);
  let top = `${nums[0]}`;
  let R = nums[0];
  ops.forEach((op, i) => {
    lhs += ` ${op} ${fr(nums[i + 1], L)}`;
    top += ` ${op} ${nums[i + 1]}`;
    R = op === '+' ? R + nums[i + 1] : R - nums[i + 1];
  });
  steps.push(`$${lhs} = ${fr(top, L)} = ${fr(R, L)}$`);
  const s = simplifyStep(R, L);
  if (s) steps.push(s);
  const result = frac(R, L);
  if (isMixed(result)) steps.push(`$${frf(result)}$ is more than $1$. As a mixed number, $${frf(result)} = ${mixedOf(result)}$.`);
  return { steps, result, L };
}

const fracExpr = (terms: Array<[number, number]>, ops: Array<'+' | '-'>) => terms.map((t, i) => (i === 0 ? '' : ` ${ops[i - 1]} `) + fr(t[0], t[1])).join('');

/** Related denominator pairs [small, big] for d1 (big within 12). */
const RELATED_SMALL: Array<[number, number]> = [[2, 4], [2, 6], [2, 8], [3, 6], [4, 8], [3, 9], [2, 10], [5, 10], [4, 12], [3, 12], [6, 12], [2, 12]];
/** Related pairs with bigger denominators within 100. */
const RELATED_BIG: Array<[number, number]> = [[10, 100], [4, 20], [5, 20], [5, 25], [6, 18], [7, 21], [8, 24], [9, 36], [12, 36], [25, 100], [20, 100], [3, 15], [4, 16], [6, 24], [10, 30], [7, 14], [8, 40], [9, 27]];
/** Unrelated pairs whose product is the common denominator. */
const UNRELATED: Array<[number, number]> = [[2, 3], [2, 5], [3, 4], [3, 5], [4, 5], [2, 7], [3, 7], [5, 6], [4, 7], [3, 8], [5, 8], [2, 9], [4, 9], [5, 7], [6, 7], [3, 10]];
/** Unrelated pairs with a common factor (a smaller common denominator than the product exists). */
const SHARED: Array<[number, number, number]> = [[4, 6, 12], [6, 8, 24], [6, 9, 18], [4, 10, 20], [8, 12, 24], [6, 10, 30], [8, 10, 40], [10, 12, 60]];
/** Unrelated pairs with friendly denominators for word problems. */
const FRIENDLY: Array<[number, number]> = [[2, 3], [2, 5], [3, 4], [3, 5], [4, 5], [5, 6], [3, 8], [5, 8], [3, 10], [2, 3], [3, 4]];

/** Two fractions a/b and c/e with the given denominators (shuffled order); for '-' the first is bigger. */
function twoFracs(rng: Rng, pair: [number, number], op: '+' | '-', maxSum = 1): [[number, number], [number, number]] {
  return retry(
    () => {
      const [p, q] = rng.chance(0.5) ? pair : [pair[1], pair[0]];
      return [[rng.pick(lowNums(p)), p], [rng.pick(lowNums(q)), q]] as [[number, number], [number, number]];
    },
    ([x, y]) => {
      const vx = x[0] / x[1];
      const vy = y[0] / y[1];
      if (op === '-') return vx - vy > 1e-9;
      return vx + vy <= maxSum + 1e-9;
    },
    200,
  );
}

function addSubD1(rng: Rng): Out {
  const pair = rng.pick(RELATED_SMALL);
  if (rng.chance(0.35)) {
    // the factor that relates the denominators, and an equivalent fraction
    const [b, B] = pair;
    const k = B / b;
    const a = rng.pick(lowNums(b));
    return {
      prompt: `The denominators $${b}$ and $${B}$ are related. Find the factor that relates them. Then write $${fr(a, b)}$ with a denominator of $${B}$.`,
      parts: [numPart(k, { exact: false, label: `Factor: $${b} \\times$` }), numPart(a * k, { exact: false, label: `$${fr(a, b)} = \\dfrac{?}{${B}}$, ? =` })],
      hints: [`What number times $${b}$ gives $${B}$?`, 'Multiply the numerator and the denominator by the same factor.'],
      solution: [`$${b} ${T} ${k} = ${B}$, so the factor is $${k}$.`, `Multiply the numerator by $${k}$ too: $${a} ${T} ${k} = ${a * k}$.`, `$${fr(a, b)} = ${fr(a * k, B)}$`],
    };
  }
  const op = rng.chance(0.6) ? '+' : '-';
  const [x, y] = twoFracs(rng, pair, op);
  const { steps, result } = fracSteps([x, y], [op]);
  const expr = fracExpr([x, y], [op]);
  const [b, B] = pair;
  const top = x[1] === b ? x : y;
  const bottom = x[1] === b ? y : x;
  return {
    prompt: `Find $${expr}$. ${formSay(result)}`,
    figure: strips([{ parts: top[1], shaded: top[0] }, { parts: bottom[1], shaded: bottom[0] }], `Top: ${top[0]}/${top[1]}. Bottom: ${bottom[0]}/${bottom[1]}.`),
    parts: [fracPart(result)],
    hints: [`The denominators are related: $${b} ${T} ${B / b} = ${B}$.`, `Write $${fr(top[0], top[1])}$ with denominator $${B}$. Then ${op === '+' ? 'add' : 'subtract'} the numerators.`],
    solution: [...steps, `$${expr} = ${isMixed(result) ? mixedOf(result) : frf(result)}$`],
  };
}

function addSubD2(rng: Rng): Out {
  const op = rng.chance(0.55) ? '+' : '-';
  const useProduct = rng.chance(0.6);
  const pair = useProduct ? rng.pick(UNRELATED) : rng.pick(RELATED_BIG);
  const [x, y] = twoFracs(rng, pair, op, 2);
  const { steps, result, L } = fracSteps([x, y], [op]);
  const expr = fracExpr([x, y], [op]);
  return {
    prompt: `Find $${expr}$. ${formSay(result)}`,
    parts: [fracPart(result)],
    hints: [
      useProduct ? `$${pair[0]}$ and $${pair[1]}$ are not related. Their product is a common denominator.` : `Is one denominator a multiple of the other? Find the factor that relates them.`,
      `Write both fractions with denominator $${L}$, then ${op === '+' ? 'add' : 'subtract'} the numerators.`,
    ],
    solution: [...steps, `$${expr} = ${isMixed(result) ? mixedOf(result) : frf(result)}$`],
  };
}

function addSubD3(rng: Rng): Out {
  const kind = rng.pick(['missing', 'three', 'shared'] as const);
  if (kind === 'missing') {
    // a/b + ? = c/e  or  c/e - ? = a/b
    const pair = rng.pick([...UNRELATED.slice(0, 10), ...RELATED_SMALL]);
    const [x, y] = twoFracs(rng, pair, '-');
    // y < x; the missing addend is x - y
    const { steps, result } = fracSteps([x, y], ['-']);
    const add = rng.chance(0.6);
    const eq = add ? `${fr(y[0], y[1])} + \\square = ${fr(x[0], x[1])}` : `${fr(x[0], x[1])} - \\square = ${fr(y[0], y[1])}`;
    return {
      prompt: `What fraction goes in the box? $${eq}$ ${formSay(result)}`,
      parts: [fracPart(result, { label: '$\\square =$' })],
      hints: [add ? 'Addition and subtraction undo each other. The missing part is the total minus the part you know.' : 'The box is the amount taken away. It is the start minus what is left.', `Find $${fr(x[0], x[1])} - ${fr(y[0], y[1])}$.`],
      solution: [
        add ? `The missing fraction is $${fr(x[0], x[1])} - ${fr(y[0], y[1])}$.` : `The missing fraction is the start minus what is left: $${fr(x[0], x[1])} - ${fr(y[0], y[1])}$.`,
        ...steps,
        `Check: $${add ? `${fr(y[0], y[1])} + ${frf(result)}` : `${fr(x[0], x[1])} - ${frf(result)}`}$ gives $${add ? fr(x[0], x[1]) : fr(y[0], y[1])}$.`,
        `The missing fraction is $${frf(result)}$.`,
      ],
    };
  }
  if (kind === 'three') {
    const set = rng.pick([[2, 4, 8], [2, 3, 6], [3, 6, 12], [2, 4, 12], [2, 5, 10], [4, 8, 16], [5, 10, 20], [2, 6, 12]]);
    const ops: Array<'+' | '-'> = [rng.chance(0.5) ? '+' : '-', '+'];
    const terms = retry(
      () => rng.shuffle(set).map((d) => [rng.pick(lowNums(d)), d] as [number, number]),
      (ts) => {
        const v = ts[0][0] / ts[0][1] + (ops[0] === '+' ? 1 : -1) * (ts[1][0] / ts[1][1]);
        return v > 1e-9 && v + ts[2][0] / ts[2][1] <= 2;
      },
      200,
    );
    const { steps, result } = fracSteps(terms, ops);
    const expr = fracExpr(terms, ops);
    return {
      prompt: `Find $${expr}$. ${formSay(result)}`,
      parts: [fracPart(result)],
      hints: [`All three denominators are related to $${set[2]}$.`, `Write every fraction with denominator $${set[2]}$. Then work from left to right.`],
      solution: [...steps, `$${expr} = ${isMixed(result) ? mixedOf(result) : frf(result)}$`],
    };
  }
  const [p, q, small] = rng.pick(SHARED);
  const op = rng.chance(0.5) ? '+' : '-';
  const [x, y] = twoFracs(rng, [p, q], op, 2);
  const { steps, result } = fracSteps([x, y], [op], small);
  const expr = fracExpr([x, y], [op]);
  return {
    prompt: `Find $${expr}$. ${formSay(result)}`,
    parts: [fracPart(result)],
    hints: [`The product $${p} ${T} ${q} = ${p * q}$ is a common denominator, but a smaller one also works.`, `Both $${p}$ and $${q}$ go into $${small}$. Write both fractions with denominator $${small}$.`],
    solution: [
      `The product $${p} ${T} ${q} = ${p * q}$ is a common denominator. A smaller one is easier: $${small} = ${p} ${T} ${small / p}$ and $${small} = ${q} ${T} ${small / q}$.`,
      ...steps.slice(1),
      `$${expr} = ${isMixed(result) ? mixedOf(result) : frf(result)}$`,
    ],
  };
}

const fractionAddSubtract = skill({
  id: 'm6-fraction-add-subtract',
  name: 'Adding and subtracting fractions',
  description: 'Write fractions with a common denominator using related denominators or the product of the denominators, then add or subtract and write the answer in lowest terms.',
  outcomes: ['N6'],
  lessonId: 'm6-4-2',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return addSubD1(rng);
    if (d === 2) return addSubD2(rng);
    return addSubD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 4.2 Fraction problems
// ---------------------------------------------------------------------------

interface ProbCtx {
  unit?: string;
  /** Two amounts combined (op '+') or one taken from the other (op '-'). */
  add: (n1: string, n2: string, x: string, y: string) => string;
  sub: (n1: string, n2: string, x: string, y: string) => string;
  addAns: (r: string, n1: string, n2: string) => string;
  subAns: (r: string, n1: string, n2: string) => string;
  /** Whether a sum bigger than 1 makes sense. */
  over1: boolean;
  /** Denominators that make sense in this context. */
  dens: number[];
}

const PROB: ProbCtx[] = [
  {
    add: (n1, n2, x, y) => `${n1} ate ${x} of a pizza. ${n2} ate ${y} of the same pizza. How much of the pizza did they eat in all?`,
    sub: (n1, n2, x, y) => `${n1} ate ${x} of a pizza. ${n2} ate ${y} of a pizza the same size. How much more pizza did ${n1} eat than ${n2}?`,
    addAns: (r) => `They ate ${r} of the pizza.`,
    subAns: (r, n1) => `${n1} ate ${r} of a pizza more.`,
    over1: false,
    dens: [2, 3, 4, 6, 8, 12],
  },
  {
    unit: 'km',
    add: (n1, _n2, x, y) => `${n1} walked ${x} km to the park. Then ${n1} walked ${y} km to the library. How far did ${n1} walk in all?`,
    sub: (n1, n2, x, y) => `${n1} ran ${x} km at track practice. ${n2} ran ${y} km. How much farther did ${n1} run?`,
    addAns: (r, n1) => `${n1} walked ${r} in all.`,
    subAns: (r, n1) => `${n1} ran ${r} farther.`,
    over1: true,
    dens: [2, 3, 4, 5, 8, 10],
  },
  {
    unit: 'cup',
    add: (n1, _n2, x, y) => `${n1} is making bannock. The recipe uses ${x} cup of flour and ${y} cup of water. How many cups is that in all?`,
    sub: (n1, _n2, x, y) => `${n1} has ${x} cup of milk. A pancake recipe needs ${y} cup. How much milk will be left?`,
    addAns: (r) => `That is ${r} in all.`,
    subAns: (r) => `There will be ${r} of milk left.`,
    over1: true,
    dens: [2, 3, 4, 8],
  },
  {
    unit: 'h',
    add: (n1, _n2, x, y) => `On Saturday, ${n1} practised piano for ${x} h and read for ${y} h. How many hours is that in all?`,
    sub: (n1, _n2, x, y) => `${n1} had ${x} h of free time. ${n1} spent ${y} h playing a board game. How much free time is left?`,
    addAns: (r) => `That is ${r} in all.`,
    subAns: (r) => `There is ${r} of free time left.`,
    over1: true,
    dens: [2, 3, 4, 6, 12],
  },
  {
    add: (n1, _n2, x, y) => `${n1}'s class is planting a school garden. They plant carrots in ${x} of the garden and beans in ${y} of it. What fraction of the garden is planted?`,
    sub: (n1, _n2, x, y) => `${n1}'s family has ${x} of a garden left to weed. They weed ${y} of the garden this morning. What fraction of the garden is still left to weed?`,
    addAns: (r) => `${cap(r)} of the garden is planted.`,
    subAns: (r) => `${cap(r)} of the garden is still left to weed.`,
    over1: false,
    dens: [2, 3, 4, 5, 6, 8, 10, 12],
  },
  {
    unit: 'L',
    add: (n1, n2, x, y) => `${n1} drank ${x} L of water at a hockey game. ${n2} drank ${y} L. How much water did they drink in all?`,
    sub: (n1, _n2, x, y) => `${n1}'s water bottle had ${x} L of water. ${n1} drank ${y} L on a hike. How much water is left?`,
    addAns: (r) => `They drank ${r} in all.`,
    subAns: (r) => `There is ${r} of water left.`,
    over1: true,
    dens: [2, 4, 5, 8, 10],
  },
  {
    unit: 'm',
    add: (n1, _n2, x, y) => `${n1} used ${x} m of ribbon for one gift and ${y} m for another. How much ribbon did ${n1} use in all?`,
    sub: (n1, _n2, x, y) => `${n1} has ${x} m of yarn. ${n1} cuts off ${y} m for a craft. How much yarn is left?`,
    addAns: (r, n1) => `${n1} used ${r} of ribbon.`,
    subAns: (r) => `There is ${r} of yarn left.`,
    over1: true,
    dens: [2, 4, 5, 8, 10],
  },
];

function probOneStep(rng: Rng, d: Difficulty): Out {
  const c = rng.pick(PROB);
  const op = rng.chance(0.55) ? '+' : '-';
  const fits = (pr: [number, number]) => c.dens.includes(pr[0]) && c.dens.includes(pr[1]);
  const pool = (d === 1 ? RELATED_SMALL : FRIENDLY).filter(fits);
  const pair = rng.pick(pool.length ? pool : d === 1 ? RELATED_SMALL : FRIENDLY);
  const [x, y] = twoFracs(rng, pair, op, c.over1 && d === 2 ? 2 : 1);
  const n1 = pickName(rng);
  const n2b = pickName(rng, [n1]);
  const X = ff(x[0], x[1]);
  const Y = ff(y[0], y[1]);
  const prompt = op === '+' ? c.add(n1, n2b, X, Y) : c.sub(n1, n2b, X, Y);
  const { steps, result, L } = fracSteps([x, y], [op]);
  const r = resultWords(result, c.unit);
  const expr = fracExpr([x, y], [op]);
  return {
    prompt: `${prompt} ${formSay(result)}`,
    parts: [fracPart(result, { suffix: c.unit })],
    hints: [op === '+' ? 'The words "in all" mean add.' : 'Find the difference: subtract.', `Write $${expr}$ with the common denominator $${L}$.`],
    solution: [`${op === '+' ? 'Add' : 'Subtract'}: $${expr}$.`, ...steps, op === '+' ? c.addAns(r, n1, n2b) : c.subAns(r, n1, n2b)],
  };
}

interface RestCtx {
  intro: (n: string) => string;
  part: (n: string, what: string, f: string) => string;
  a: string;
  b: string;
  rest: string;
  of: string;
  ask: string;
}

const REST: RestCtx[] = [
  { intro: (n) => `${n}'s class is planting a school garden.`, part: (_n, what, f) => `${cap(what)} fill ${f} of the garden.`, a: 'tomatoes', b: 'peas', rest: 'The rest is for flowers.', of: 'of the garden is for flowers', ask: 'What fraction of the garden is for flowers?' },
  { intro: (n) => `${n} is making a beaded bracelet.`, part: (_n, what, f) => `${f} of the beads are ${what}.`, a: 'red', b: 'blue', rest: 'The rest are white.', of: 'of the beads are white', ask: 'What fraction of the beads are white?' },
  { intro: (n) => `${n}'s family orders a large pizza.`, part: (_n, what, f) => `${f} of the pizza has ${what}.`, a: 'only cheese', b: 'pepperoni', rest: 'The rest has veggies.', of: 'of the pizza has veggies', ask: 'What fraction of the pizza has veggies?' },
  { intro: (n) => `${n} plans a Saturday afternoon.`, part: (n, what, f) => `${n} spends ${f} of the afternoon on ${what}.`, a: 'chores', b: 'homework', rest: 'The rest is free time.', of: 'of the afternoon is free time', ask: 'What fraction of the afternoon is free time?' },
  { intro: (n) => `${n}'s class voted on a field trip.`, part: (_n, what, f) => `${f} of the students voted for ${what}.`, a: 'the zoo', b: 'the science centre', rest: 'The rest voted for the museum.', of: 'of the students voted for the museum', ask: 'What fraction of the students voted for the museum?' },
];

interface MoreCtx {
  unit: string;
  /** Common denominators that suit the context. */
  Ls: number[];
  act: (n1: string, n2: string, x: string, y: string, z: string) => string;
  ask: (n1: string, n2: string) => string;
  ans: (n1: string, r: string) => string;
}

const MORE: MoreCtx[] = [
  { unit: 'km', Ls: [4, 6, 8, 10, 12], act: (n1, n2, x, y, z) => `${n1} ran ${x} km before school and ${y} km after school. ${n2} ran ${z} km in all.`, ask: (n1, n2) => `How much farther did ${n1} run than ${n2}?`, ans: (n1, r) => `${n1} ran ${r} farther.` },
  { unit: 'h', Ls: [4, 6, 12], act: (n1, n2, x, y, z) => `${n1} read for ${x} h on Saturday and ${y} h on Sunday. ${n2} read for ${z} h in all.`, ask: (n1, n2) => `How much longer did ${n1} read than ${n2}?`, ans: (n1, r) => `${n1} read ${r} longer.` },
  { unit: 'L', Ls: [4, 8, 10], act: (n1, n2, x, y, z) => `${n1} drank ${x} L of water in the morning and ${y} L in the afternoon. ${n2} drank ${z} L in all.`, ask: (n1, n2) => `How much more water did ${n1} drink than ${n2}?`, ans: (n1, r) => `${n1} drank ${r} more.` },
];

interface GoalCtx {
  unit: string;
  Ls: number[];
  text: (n: string, goal: number, x: string, y: string) => string;
  ask: (n: string) => string;
  ans: (n: string, r: string) => string;
}

const GOAL: GoalCtx[] = [
  { unit: 'km', Ls: [4, 6, 8, 10, 12], text: (n, g, x, y) => `${n}'s goal is to run $${g}$ km today. ${n} ran ${x} km before lunch and ${y} km after lunch.`, ask: (n) => `How much farther does ${n} need to run to reach the goal?`, ans: (n, r) => `${n} needs to run ${r} more.` },
  { unit: 'h', Ls: [4, 6, 12], text: (n, g, x, y) => `${n} wants to read for $${g}$ h this weekend. ${n} read for ${x} h on Saturday and ${y} h on Sunday morning.`, ask: (n) => `How much longer does ${n} need to read?`, ans: (n, r) => `${n} needs to read ${r} more.` },
  { unit: 'L', Ls: [4, 8, 10], text: (n, g, x, y) => `${n} wants to drink $${g}$ L of water today. ${n} drank ${x} L in the morning and ${y} L at lunch.`, ask: (n) => `How much more water does ${n} need to drink?`, ans: (n, r) => `${n} needs to drink ${r} more.` },
];

function probTwoStep(rng: Rng): Out {
  const kind = rng.pick(['rest', 'more', 'goal'] as const);
  const n1 = pickName(rng);
  const n2 = pickName(rng, [n1]);
  if (kind === 'rest') {
    const c = rng.pick(REST);
    const [x, y] = twoFracs(rng, rng.pick([...FRIENDLY, ...RELATED_SMALL]), '+', 0.9);
    const first = fracSteps([x, y], ['+']);
    const used = first.result;
    const left = frac(used.d - used.n, used.d);
    return {
      prompt: `${c.intro(n1)} ${c.part(n1, c.a, ff(x[0], x[1]))} ${c.part(n1, c.b, ff(y[0], y[1]))} ${c.rest} ${c.ask} ${formSay(left)}`,
      parts: [fracPart(left)],
      hints: ['First add the two parts you know.', `The whole is $1 = ${fr(used.d, used.d)}$. Subtract the sum from $1$.`],
      solution: [
        `Add the parts you know: $${fracExpr([x, y], ['+'])}$.`,
        ...first.steps,
        `The whole is $1 = ${fr(used.d, used.d)}$. Subtract: $${fr(used.d, used.d)} - ${frf(used)} = ${frf(left)}$.`,
        `$${frf(left)}$ ${c.of}.`,
      ],
    };
  }
  // Every denominator divides L, so the common denominators stay small.
  const more = rng.pick(MORE);
  const goalC = rng.pick(GOAL);
  const L = rng.pick(kind === 'more' ? more.Ls : goalC.Ls);
  const divs = [2, 3, 4, 5, 6, 8, 10, 12].filter((q) => L % q === 0);
  const [x, y] = retry(
    () => {
      const p = rng.pick(divs);
      const q = rng.pick(divs.filter((v) => v !== p && (v % p === 0 || p % v === 0)));
      return [[rng.pick(lowNums(p)), p], [rng.pick(lowNums(q)), q]] as [number, number][];
    },
    ([u, v]) => u[0] / u[1] + v[0] / v[1] <= 1.75,
    200,
  );
  const first = fracSteps([x, y], ['+']);
  const s = first.result;
  if (kind === 'more') {
    const c = more;
    const z = retry(
      () => {
        const zd = rng.pick(divs);
        return [rng.pick(lowNums(zd)), zd] as [number, number];
      },
      (v) => s.n / s.d - v[0] / v[1] > 1e-9 && v[1] !== s.d,
      200,
    );
    if (s.n / s.d - z[0] / z[1] <= 1e-9) return probOneStep(rng, 2);
    const second = fracSteps([[s.n, s.d], z], ['-']);
    const r = second.result;
    return {
      prompt: `${c.act(n1, n2, ff(x[0], x[1]), ff(y[0], y[1]), ff(z[0], z[1]))} ${c.ask(n1, n2)} ${formSay(r)}`,
      parts: [fracPart(r, { suffix: c.unit })],
      hints: [`First find ${n1}'s total. Then subtract ${n2}'s amount.`, `Add $${fracExpr([x, y], ['+'])}$, then subtract $${fr(z[0], z[1])}$.`],
      solution: [`${n1}'s total: $${fracExpr([x, y], ['+'])}$.`, ...first.steps, `Now subtract ${n2}'s amount: $${frf(s)} - ${fr(z[0], z[1])}$.`, ...second.steps, c.ans(n1, resultWords(r, c.unit))],
    };
  }
  const c = goalC;
  const goal = Math.ceil(s.n / s.d + 1e-9);
  const need = frac(goal * s.d - s.n, s.d);
  return {
    prompt: `${c.text(n1, goal, ff(x[0], x[1]), ff(y[0], y[1]))} ${c.ask(n1)} ${formSay(need)}`,
    parts: [fracPart(need, { suffix: c.unit })],
    hints: ['First add the two amounts.', `Then subtract the sum from the goal, $${goal} = ${fr(goal * s.d, s.d)}$.`],
    solution: [`Add: $${fracExpr([x, y], ['+'])}$.`, ...first.steps, `Subtract from the goal: $${fr(goal * s.d, s.d)} - ${frf(s)} = ${frf(need)}$.`, c.ans(n1, resultWords(need, c.unit))],
  };
}

const fractionProblems = skill({
  id: 'm6-fraction-problems',
  name: 'Fraction problems',
  description: 'Solve problems that add and subtract fractions, writing the answer in lowest terms or as a mixed number.',
  outcomes: ['N6'],
  lessonId: 'm6-4-2',
  calculator: false,
  gen(rng, d) {
    if (d === 3) return probTwoStep(rng);
    return probOneStep(rng, d);
  },
});

// ---------------------------------------------------------------------------
// 4.3 Multiplying fractions and natural numbers
// ---------------------------------------------------------------------------

function repeatedAdd(rng: Rng): Out {
  const n = rng.int(2, 5);
  const b = rng.int(2, 8);
  const a = rng.pick(lowNums(b));
  const f = frac(n * a, b);
  const sum = Array.from({ length: n }, () => fr(a, b)).join(' + ');
  return {
    prompt: `Find $${n} ${T} ${fr(a, b)}$. Think of it as repeated addition. ${formSay(f)}`,
    figure: strips(Array.from({ length: n }, () => ({ parts: b, shaded: a })), `${n} strips, each with ${a}/${b} striped`),
    parts: [fracPart(f)],
    hints: [`$${n} ${T} ${fr(a, b)}$ means $${n}$ groups of $${fr(a, b)}$.`, `Add $${fr(a, b)}$ to itself $${n}$ times. Or multiply the numerator by $${n}$ and keep the denominator.`],
    solution: [
      `$${n} ${T} ${fr(a, b)} = ${sum}$`,
      `Add the numerators and keep the denominator: $${fr(`${n} ${T} ${a}`, b)} = ${fr(n * a, b)}$.`,
      ...(simplifyStep(n * a, b) ? [simplifyStep(n * a, b)!] : []),
      ...(isMixed(f) ? [`As a mixed number: $${frf(f)} = ${mixedOf(f)}$.`] : []),
      `$${n} ${T} ${fr(a, b)} = ${isMixed(f) ? mixedOf(f) : frf(f)}$`,
    ],
  };
}

function unitFraction(rng: Rng): Out {
  const b = rng.int(2, 10);
  const q = rng.int(2, 9);
  const n = b * q;
  const order = rng.chance(0.5);
  const expr = order ? `${n} ${T} ${fr(1, b)}` : `${fr(1, b)} ${T} ${n}`;
  return {
    prompt: `Find $${expr}$.`,
    parts: [numPart(q, { exact: false })],
    hints: [`Multiplying by $${fr(1, b)}$ is the same as dividing by $${b}$.`, `Find $${n} ${D} ${b}$.`],
    solution: [`$${expr} = ${fr(n, b)}$`, `$${fr(n, b)}$ means $${n} ${D} ${b}$. Multiplying by a unit fraction is the same as dividing by its denominator.`, `$${n} ${D} ${b} = ${q}$`, `$${expr} = ${q}$`],
  };
}

function partOf(rng: Rng, withFigure: boolean): Out {
  const b = rng.pick(withFigure ? [2, 3, 4, 5, 6] : [3, 4, 5, 6, 8, 10, 12]);
  const a = rng.pick(lowNums(b).filter((x) => x > 1 || b <= 3));
  const per = withFigure ? rng.int(2, 8) : rng.int(3, 12);
  const n = b * per;
  const ans = a * per;
  const order = rng.chance(0.6);
  const expr = order ? `${fr(a, b)} ${T} ${n}` : `${n} ${T} ${fr(a, b)}`;
  return {
    prompt: `Find $${expr}$.${withFigure ? ` The picture shows $${n}$ dots in $${b}$ equal rows.` : ''}`,
    figure: withFigure ? groupsFig(b, per, a, `${n} dots in ${b} equal groups. ${a} ${a === 1 ? 'group is' : 'groups are'} coloured.`) : undefined,
    parts: [numPart(ans, { exact: false })],
    hints: [`$${fr(a, b)} ${T} ${n}$ means $${fr(a, b)}$ of $${n}$.`, `Divide $${n}$ into $${b}$ equal groups. Then take $${a}$ of the groups.`],
    solution: [
      `$${expr}$ means $${fr(a, b)}$ of $${n}$.`,
      `One group: $${n} ${D} ${b} = ${per}$.`,
      `$${a}$ groups: $${a} ${T} ${per} = ${ans}$.`,
      `Or use the rule: $${fr(`${a} ${T} ${n}`, b)} = ${fr(a * n, b)} = ${ans}$.`,
      `$${expr} = ${ans}$`,
    ],
  };
}

function naturalTimesFrac(rng: Rng): Out {
  const b = rng.pick([3, 4, 5, 6, 8, 10, 12]);
  const a = rng.pick(lowNums(b));
  const n = retry(() => rng.int(2, 12), (x) => x % b !== 0 && (x * a) % b !== 0);
  const f = frac(n * a, b);
  const order = rng.chance(0.5);
  const expr = order ? `${n} ${T} ${fr(a, b)}` : `${fr(a, b)} ${T} ${n}`;
  return {
    prompt: `Find $${expr}$. ${formSay(f)}`,
    parts: [fracPart(f)],
    hints: ['Multiply the natural number by the numerator. Keep the denominator.', `$${fr(`${n} ${T} ${a}`, b)}$. Then simplify.`],
    solution: [
      `Multiply the numerator by $${n}$ and keep the denominator: $${expr} = ${fr(`${n} ${T} ${a}`, b)} = ${fr(n * a, b)}$.`,
      ...(simplifyStep(n * a, b) ? [simplifyStep(n * a, b)!] : []),
      ...(isMixed(f) ? [`$${frf(f)} = ${mixedOf(f)}$, because $${f.n} ${D} ${f.d} = ${Math.floor(f.n / f.d)}\\text{ R }${f.n % f.d}$.`] : []),
      `$${expr} = ${isMixed(f) ? mixedOf(f) : frf(f)}$`,
    ],
  };
}

function biggerOrSmaller(rng: Rng): Out {
  const n = rng.int(6, 40);
  const kind = rng.weighted([['less', 0.45], ['more', 0.4], ['equal', 0.15]] as const);
  const b = rng.int(2, 9);
  const a = kind === 'less' ? rng.pick(lowNums(b)) : kind === 'equal' ? b : retry(() => rng.int(b + 1, 2 * b + 3), (x) => gcd(x, b) === 1);
  const idx = kind === 'less' ? 0 : kind === 'equal' ? 1 : 2;
  const expr = rng.chance(0.5) ? `${n} ${T} ${fr(a, b)}` : `${fr(a, b)} ${T} ${n}`;
  const why = kind === 'less' ? `$${fr(a, b)}$ is less than $1$, so you get only part of $${n}$.` : kind === 'equal' ? `$${fr(a, b)} = 1$, and $1 ${T} ${n} = ${n}$.` : `$${fr(a, b)}$ is more than $1$, so you get more than $${n}$.`;
  return {
    prompt: `Without working it out, is $${expr}$ less than, equal to, or greater than $${n}$?`,
    parts: [{ answer: fixedChoice([`Less than $${n}$`, `Equal to $${n}$`, `Greater than $${n}$`], idx) }],
    hints: ['Multiplication does not always make a bigger number.', `Compare the fraction $${fr(a, b)}$ to $1$.`],
    solution: [`Compare $${fr(a, b)}$ to $1$.`, why, `So $${expr}$ is ${['less than', 'equal to', 'greater than'][idx]} $${n}$.`],
  };
}

function multiplyProblem(rng: Rng): Out {
  const kind = rng.pick(['class', 'money', 'laps', 'batches'] as const);
  const name = pickName(rng);
  const name2 = pickName(rng, [name]);
  if (kind === 'class' || kind === 'money') {
    const b = rng.pick([3, 4, 5, 6, 8]);
    const a = rng.pick(lowNums(b));
    const per = kind === 'class' ? rng.int(Math.ceil(18 / b), Math.floor(36 / b)) : rng.int(Math.ceil(12 / b), Math.floor(60 / b));
    const n = b * per;
    const part = a * per;
    const rest = n - part;
    if (kind === 'class') {
      const c = rng.pick([
        { s: `There are $${n}$ students in ${name}'s class. $${fr(a, b)}$ of them bring a lunch from home.`, ask: 'How many students do **not** bring a lunch from home?', ans: (x: number) => `$${x}$ students do not bring a lunch from home.` },
        { s: `$${n}$ students from a school in ${rng.pick(TOWNS)} go on a field trip. $${fr(a, b)}$ of them ride the first bus.`, ask: 'How many students ride the other bus?', ans: (x: number) => `$${x}$ students ride the other bus.` },
        { s: `A team has $${n}$ hockey pucks. $${fr(a, b)}$ of them are used at practice.`, ask: 'How many pucks are **not** used?', ans: (x: number) => `$${x}$ pucks are not used.` },
      ]);
      return {
        prompt: `${c.s} ${c.ask}`,
        parts: [numPart(rest, { exact: false })],
        hints: [`First find $${fr(a, b)}$ of $${n}$.`, 'Then subtract that from the whole group.'],
        solution: [`$${fr(a, b)} ${T} ${n}$: one part is $${n} ${D} ${b} = ${per}$${a > 1 ? `, so $${a}$ parts are $${a} ${T} ${per} = ${part}$` : ''}.`, `The rest: $${n} - ${part} = ${rest}$.`, c.ans(rest)],
      };
    }
    return {
      prompt: `${name} gets \\$${n} for helping at a garage sale. ${name} saves $${fr(a, b)}$ of the money and spends the rest. How much does ${name} spend?`,
      parts: [numPart(rest, { exact: false, label: '\\$' })],
      hints: [`First find $${fr(a, b)}$ of \\$${n}.`, 'The money spent is the rest: subtract.'],
      solution: [`Savings: $${fr(a, b)} ${T} ${n}$. One part is $${n} ${D} ${b} = ${per}$${a > 1 ? `, so $${a}$ parts are $${a} ${T} ${per} = ${part}$` : ''}.`, `Spent: $${n} - ${part} = ${rest}$.`, `${name} spends \\$${rest}.`],
    };
  }
  if (kind === 'laps') {
    const b = rng.pick([2, 3, 4, 5, 8, 10]);
    const a = rng.pick(lowNums(b));
    const [m, k] = retry(() => [rng.int(3, 9), rng.int(2, 8)], ([p, q]) => p > q && ((p - q) * a) % b !== 0);
    const each = fr(a, b);
    const diff = frac((m - k) * a, b);
    return {
      prompt: `One lap of the trail at a park in ${rng.pick(TOWNS)} is $${each}$ km. ${name} runs $${m}$ laps. ${name2} runs $${k}$ laps. How much farther does ${name} run than ${name2}? ${formSay(diff)}`,
      parts: [fracPart(diff, { suffix: 'km' })],
      hints: [`${name} runs $${m - k}$ more laps than ${name2}.`, `Find $${m - k} ${T} ${each}$.`],
      solution: [
        `${name} runs $${m} - ${k} = ${m - k}$ more laps.`,
        `$${m - k} ${T} ${each} = ${fr(`${m - k} ${T} ${a}`, b)} = ${fr((m - k) * a, b)}$`,
        ...(simplifyStep((m - k) * a, b) ? [simplifyStep((m - k) * a, b)!] : []),
        `${name} runs ${resultWords(diff, 'km')} farther.`,
      ],
    };
  }
  const b = rng.pick([2, 3, 4, 8]);
  const a = rng.pick(lowNums(b));
  const [m, k] = retry(() => [rng.int(2, 5), rng.int(1, 4)], ([p, q]) => ((p + q) * a) % b !== 0);
  const total = frac((m + k) * a, b);
  const c = rng.pick([
    { food: 'muffins', what: 'milk', u: 'cup' },
    { food: 'pancakes', what: 'flour', u: 'cup' },
    { food: 'bannock', what: 'water', u: 'cup' },
    { food: 'granola', what: 'oats', u: 'cup' },
  ]);
  return {
    prompt: `A recipe for ${c.food} uses $${fr(a, b)}$ ${c.u} of ${c.what} for each batch. ${name} makes $${m}$ batches and ${name2} makes $${k}$ ${k === 1 ? 'batch' : 'batches'}. How many cups of ${c.what} do they use in all? ${formSay(total)}`,
    parts: [fracPart(total, { suffix: 'cups' })],
    hints: [`They make $${m} + ${k} = ${m + k}$ batches in all.`, `Find $${m + k} ${T} ${fr(a, b)}$.`],
    solution: [
      `Total batches: $${m} + ${k} = ${m + k}$.`,
      `$${m + k} ${T} ${fr(a, b)} = ${fr(`${m + k} ${T} ${a}`, b)} = ${fr((m + k) * a, b)}$`,
      ...(simplifyStep((m + k) * a, b) ? [simplifyStep((m + k) * a, b)!] : []),
      ...(isMixed(total) ? [`$${frf(total)} = ${mixedOf(total)}$`] : []),
      `They use $${isMixed(total) ? mixedOf(total) : frf(total)}$ cups of ${c.what}.`,
    ],
  };
}

const fractionMultiply = skill({
  id: 'm6-fraction-multiply',
  name: 'Multiplying fractions and natural numbers',
  description: 'Multiply a natural number by a fraction as repeated addition, find a fraction of a quantity, relate multiplying by a unit fraction to division, and solve problems.',
  outcomes: ['N7'],
  lessonId: 'm6-4-3',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return rng.pick([repeatedAdd, repeatedAdd, unitFraction, (r: Rng) => partOf(r, true)])(rng);
    if (d === 2) return rng.pick([(r: Rng) => partOf(r, false), naturalTimesFrac, naturalTimesFrac, biggerOrSmaller])(rng);
    return multiplyProblem(rng);
  },
});

export const FRACTIONS_SKILLS: SkillDef[] = [fractionQuotient, fractionAddSubtract, fractionProblems, fractionMultiply];
