/** Math 20-1 Unit 5 — Radical Expressions and Equations (AN2, AN3). */
import { type GenOutput, fixedChoice, mc, numPart, part, skill } from '../../helpers.ts';
import { type Frac, divisors, frac, fracLatex, fracValue, fmt, fmtFixed, gcd, paren, plusMinus, polyString, radicalSplit } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Choice, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

/** Square-free radicands. */
const SF = [2, 3, 5, 6, 7, 10, 11, 13, 14, 15];

/** Coefficient prefix: 1 -> '', -1 -> '-', 3 -> '3'. */
const co = (k: number) => (k === 1 ? '' : k === -1 ? '-' : `${k}`);

/** k√m (or k∛m) in LaTeX; m = 1 prints k alone. */
function rad(k: number, m: number, index = 2): string {
  if (m === 1) return `${k}`;
  return `${co(k)}${index === 3 ? `\\sqrt[3]{${m}}` : `\\sqrt{${m}}`}`;
}

/** k√m typed the way a student would. */
function radText(k: number, m: number, index = 2): string {
  if (m === 1) return `${k}`;
  return `${co(k)}${index === 3 ? 'cbrt' : 'sqrt'}(${m})`;
}

/** Exponents of the variables in a monomial, in display order. */
type Pow = Array<[string, number]>;

/** A monomial such as 6x^2y in LaTeX. */
function mono(c: number, e: Pow): string {
  const vars = e
    .filter(([, p]) => p > 0)
    .map(([v, p]) => (p === 1 ? v : `${v}^{${p}}`))
    .join('');
  return vars ? `${co(c)}${vars}` : `${c}`;
}

/** A monomial as typed text, e.g. 6*x^2*y. */
function monoText(c: number, e: Pow): string {
  const vars = e.filter(([, p]) => p > 0).map(([v, p]) => (p === 1 ? v : `${v}^${p}`));
  if (!vars.length) return `${c}`;
  return (c === 1 ? '' : c === -1 ? '-' : `${c}*`) + vars.join('*');
}

/** A coefficient times a root of a monomial, e.g. 3x\sqrt{2x}. */
function mixedTex(outC: number, outE: Pow, inC: number, inE: Pow, index = 2): string {
  const o = mono(outC, outE);
  const inner = mono(inC, inE);
  return (o === '1' ? '' : o === '-1' ? '-' : o) + (index === 3 ? `\\sqrt[3]{${inner}}` : `\\sqrt{${inner}}`);
}

/** Split the k-th root of c·(variables) into its largest perfect k-th power and what is left. */
function splitMono(c: number, e: Pow, k = 2) {
  const { outside, inside } = radicalSplit(c, k);
  return {
    outC: outside,
    outE: e.map(([v, p]) => [v, Math.floor(p / k)] as [string, number]),
    inC: inside,
    inE: e.map(([v, p]) => [v, p % k] as [string, number]),
    powC: outside ** k,
    powE: e.map(([v, p]) => [v, Math.floor(p / k) * k] as [string, number]),
  };
}

/** Two expression boxes for a mixed radical A√B (A and B may contain variables). */
function abParts(a: string, b: string): Part[] {
  return [
    part({ kind: 'expression', expected: a, positiveVars: true }, { label: '$A =$', placeholder: 'e.g. 3x^2' }),
    part({ kind: 'expression', expected: b, positiveVars: true }, { label: '$B =$', placeholder: 'e.g. 5x' }),
  ];
}

/** Number boxes for the coefficients of a requested form (fractions allowed). */
function coefParts(names: string[], values: number[]): Part[] {
  return names.map((n, i) => numPart(values[i], { label: `$${n} =$`, exact: false }));
}

/** Like polyString, but with fractional coefficients. */
function fracSum(terms: Array<[Frac, string]>): string {
  let out = '';
  for (const [c, body] of terms) {
    if (c.n === 0) continue;
    const abs = frac(Math.abs(c.n), c.d);
    const coef = body && abs.n === 1 && abs.d === 1 ? '' : fracLatex(abs);
    if (out === '') out = `${c.n < 0 ? '-' : ''}${coef}${body}`;
    else out += ` ${c.n < 0 ? '-' : '+'} ${coef}${body}`;
  }
  return out || '0';
}

/** Last step of a rationalization: divide by the rational denominator D. */
function divideStep(D: number, answer: string, names: string[], values: Frac[]): string {
  const tail = names.map((n, i) => `$${n} = ${fracLatex(values[i])}$`).join(' and ');
  if (D === 1) return `The denominator is $1$, so the result is $${answer}$: ${tail}.`;
  return `Divide each term by $${D}$: $${answer}$, so ${tail}.`;
}

const SOLVE_NOTE = 'Enter all solutions separated by commas, or type "no solution" if there are none.';

function solutionsPart(values: number[]): Part {
  return { answer: { kind: 'numbers', values }, placeholder: 'e.g. 4, 9 or no solution' };
}

function finalSolutions(values: number[]): string {
  if (!values.length) return 'Every candidate is extraneous, so the equation has **no solution**.';
  const sorted = [...values].sort((a, b) => a - b);
  return sorted.length === 1 ? `The solution is $x = ${sorted[0]}$.` : `The solutions are ${sorted.map((v) => `$x = ${v}$`).join(' and ')}.`;
}

/** True when v is not within a whisker of a rounding boundary at this many decimals. */
function clearOfBoundary(v: number, decimals: number): boolean {
  const s = Math.abs(v) * 10 ** decimals;
  return Math.abs(s - Math.floor(s) - 0.5) > 0.04;
}

interface OrderVal {
  md: string;
  key: number;
  step: string;
}

function orderPart(vals: OrderVal[]): Part {
  const choices: Choice[] = vals.map((v, i) => ({ id: 'abcdefg'[i], md: v.md }));
  const sorted = [...vals].sort((a, b) => a.key - b.key);
  return { answer: { kind: 'order', items: choices, correctOrder: sorted.map((v) => choices[vals.indexOf(v)].id) } };
}

function sortedList(vals: OrderVal[]): string {
  return [...vals].sort((a, b) => a.key - b.key).map((v) => v.md).join(', ');
}

// ---------------------------------------------------------------------------
// 5.1 Mixed and entire radicals
// ---------------------------------------------------------------------------

function mixedNumeric(rng: Rng): GenOutput {
  let s = 2;
  let r = 2;
  for (let i = 0; i < 100; i++) {
    s = rng.int(2, 10);
    r = rng.pick(SF);
    if (s * s * r <= 600 && s * s * r >= 100) break;
  }
  const n = s * s * r;
  const k = rng.pick([1, 1, 1, 2, 3, -1, -2]);
  const total = k * s;
  const given = `${co(k)}\\sqrt{${n}}`;
  return {
    prompt: `Write $${given}$ as a mixed radical in simplest form.`,
    parts: [part({ kind: 'expression', expected: radText(total, r), form: 'simplified-radical' }, { placeholder: 'e.g. 4√3' })],
    hints: [`Find the largest perfect square that divides $${n}$.`, `Write $${n} = ${s * s} \\times ${r}$ and take the square root of $${s * s}$.`],
    solution: [
      `The largest perfect-square factor of $${n}$ is $${s * s} = ${s}^2$, so $${n} = ${s * s} \\times ${r}$.`,
      `$\\sqrt{${n}} = \\sqrt{${s * s}}\\,\\sqrt{${r}} = ${s}\\sqrt{${r}}$`,
      ...(k === 1 ? [] : [`$${given} = ${paren(k)} \\times ${s}\\sqrt{${r}}$`]),
      `In simplest form, $${given} = ${rad(total, r)}$.`,
    ],
    answerDisplay: `$${rad(total, r)}$`,
  };
}

function entireNumeric(rng: Rng): GenOutput {
  let k = 5;
  let m = 7;
  for (let i = 0; i < 100; i++) {
    k = rng.int(3, 9);
    m = rng.pick([2, 3, 5, 6, 7, 10, 11]);
    if (k * k * m >= 100) break;
  }
  const n = k * k * m;
  return {
    prompt: `Write $${k}\\sqrt{${m}}$ as an entire radical.`,
    parts: [part({ kind: 'expression', expected: `sqrt(${n})`, form: 'entire-radical' }, { placeholder: 'e.g. √45' })],
    hints: [`Write $${k}$ as a square root.`, `$${k} = \\sqrt{${k * k}}$; then multiply the radicands.`],
    solution: [`$${k} = \\sqrt{${k * k}}$`, `$${k}\\sqrt{${m}} = \\sqrt{${k * k}}\\,\\sqrt{${m}} = \\sqrt{${k * k} \\times ${m}}$`, `So $${k}\\sqrt{${m}} = \\sqrt{${n}}$.`],
    answerDisplay: `$\\sqrt{${n}}$`,
  };
}

function varMixed(rng: Rng): GenOutput {
  const v = rng.pick(['x', 'a', 'n', 't', 'y']);
  let s = 2;
  let r = 2;
  let e = 3;
  for (let i = 0; i < 100; i++) {
    s = rng.int(2, 7);
    r = rng.pick([1, 2, 3, 5, 6, 7, 10]);
    e = rng.int(3, 9);
    if (s * s * r <= 300 && (r > 1 || e % 2 === 1)) break;
  }
  const c = s * s * r;
  const E: Pow = [[v, e]];
  const sp = splitMono(c, E);
  const given = mono(c, E);
  const out = mono(sp.outC, sp.outE);
  const inner = mono(sp.inC, sp.inE);
  const sq = mono(sp.powC, sp.powE);
  const ans = mixedTex(sp.outC, sp.outE, sp.inC, sp.inE);
  return {
    prompt: `Assume $${v} \\ge 0$. Write $\\sqrt{${given}}$ as a mixed radical $A\\sqrt{B}$ in simplest form, then enter $A$ and $B$.`,
    parts: abParts(monoText(sp.outC, sp.outE), monoText(sp.inC, sp.inE)),
    hints: [`A power with an even exponent is a perfect square, for example $${v}^{6} = \\left(${v}^{3}\\right)^2$.`, `Split $${given}$ into its largest perfect-square factor times what is left over.`],
    solution: [
      `Largest perfect-square factor: $${given} = ${sq} \\cdot ${inner}$, and $${sq} = \\left(${out}\\right)^2$.`,
      `$\\sqrt{${given}} = \\sqrt{${sq}}\\,\\sqrt{${inner}} = ${ans}$`,
      `So $A = ${out}$ and $B = ${inner}$.`,
    ],
    answerDisplay: `$${ans}$`,
  };
}

function varEntire(rng: Rng): GenOutput {
  const v = rng.pick(['x', 'a', 'n', 'y']);
  const k = rng.int(2, 6);
  const p = rng.int(1, 3);
  const r = rng.pick([1, 2, 3, 5, 6, 7]);
  const q = r === 1 || p === 1 ? 1 : rng.int(0, 1);
  const outE: Pow = [[v, p]];
  const inE: Pow = [[v, q]];
  const given = mixedTex(k, outE, r, inE);
  const coef = mono(k, outE);
  const sq = mono(k * k, [[v, 2 * p]]);
  const inner = mono(r, inE);
  const total = mono(k * k * r, [[v, 2 * p + q]]);
  return {
    prompt: `Assume $${v} \\ge 0$. Write $${given}$ as an entire radical.`,
    parts: [part({ kind: 'expression', expected: `sqrt(${monoText(k * k * r, [[v, 2 * p + q]])})`, form: 'entire-radical', positiveVars: true }, { placeholder: 'e.g. √(12x^3)' })],
    hints: ['Write the factor outside the radical as a square root.', `$${coef} = \\sqrt{${sq}}$ because $${v} \\ge 0$; then multiply the radicands.`],
    solution: [
      `$${coef} = \\sqrt{${sq}}$, since $\\left(${coef}\\right)^2 = ${sq}$ and $${v} \\ge 0$.`,
      `$${given} = \\sqrt{${sq}}\\,\\sqrt{${inner}} = \\sqrt{${sq} \\cdot ${inner}}$`,
      `So $${given} = \\sqrt{${total}}$.`,
    ],
    answerDisplay: `$\\sqrt{${total}}$`,
  };
}

function cubeNumeric(rng: Rng): GenOutput {
  let s = 2;
  let r = 2;
  for (let i = 0; i < 100; i++) {
    s = rng.int(2, 5);
    r = rng.pick([2, 3, 4, 5, 6, 7, 9, 10]);
    if (s ** 3 * r <= 1000) break;
  }
  const sign = rng.chance(0.5) ? -1 : 1;
  const cube = sign * s ** 3;
  const n = cube * r;
  const ans = sign * s;
  return {
    prompt: `Write $\\sqrt[3]{${n}}$ as a mixed radical in simplest form.`,
    parts: [part({ kind: 'expression', expected: radText(ans, r, 3), form: 'simplified-radical', radicalIndex: 3 }, { placeholder: 'e.g. 2∛5' })],
    hints: [
      'For a cube root, look for the largest perfect-cube factor: 8, 27, 64, 125, ...',
      sign < 0 ? 'The cube root of a negative number is negative: $\\sqrt[3]{-8} = -2$.' : `Write $${n}$ as a perfect cube times a number with no perfect-cube factor.`,
    ],
    solution: [
      `$${n} = ${cube} \\times ${r}$, and $${cube} = (${ans})^3$.`,
      `$\\sqrt[3]{${n}} = \\sqrt[3]{${cube}}\\,\\sqrt[3]{${r}} = ${rad(ans, r, 3)}$`,
      `In simplest form, $\\sqrt[3]{${n}} = ${rad(ans, r, 3)}$.`,
    ],
    answerDisplay: `$${rad(ans, r, 3)}$`,
  };
}

function twoVar(rng: Rng): GenOutput {
  const [v1, v2] = rng.pick([
    ['x', 'y'],
    ['a', 'b'],
    ['m', 'n'],
    ['p', 'q'],
  ]);
  let s = 2;
  let r = 2;
  for (let i = 0; i < 100; i++) {
    s = rng.int(2, 6);
    r = rng.pick([2, 3, 5, 6, 7, 10]);
    if (s * s * r <= 300) break;
  }
  const c = s * s * r;
  const E: Pow = [
    [v1, rng.int(1, 7)],
    [v2, rng.int(2, 6)],
  ];
  const k = rng.pick([1, 2, 3, -1, -2, 4]);
  const sp = splitMono(c, E);
  const radicand = mono(c, E);
  const given = `${co(k)}\\sqrt{${radicand}}`;
  const A = k * sp.outC;
  const inner = mono(sp.inC, sp.inE);
  const simple = mixedTex(sp.outC, sp.outE, sp.inC, sp.inE);
  const ans = mixedTex(A, sp.outE, sp.inC, sp.inE);
  return {
    prompt: `Assume all variables are non-negative. Write $${given}$ as a mixed radical $A\\sqrt{B}$ in simplest form, then enter $A$ and $B$.`,
    parts: abParts(monoText(A, sp.outE), monoText(sp.inC, sp.inE)),
    hints: ['Take out the largest perfect square from the number and from each variable (even exponents are perfect squares).', `Write $${radicand} = ${mono(sp.powC, sp.powE)} \\cdot ${inner}$.`],
    solution: [
      `Largest perfect-square factor: $${radicand} = ${mono(sp.powC, sp.powE)} \\cdot ${inner}$, where $${mono(sp.powC, sp.powE)} = \\left(${mono(sp.outC, sp.outE)}\\right)^2$.`,
      `$\\sqrt{${radicand}} = ${simple}$`,
      ...(k === 1 ? [] : [`$${given} = ${paren(k)} \\times ${simple} = ${ans}$`]),
      `So $A = ${mono(A, sp.outE)}$ and $B = ${inner}$.`,
    ],
    answerDisplay: `$${ans}$`,
  };
}

function cubeVar(rng: Rng): GenOutput {
  const v = rng.pick(['x', 'a', 'y', 't']);
  let s = 2;
  let r = 2;
  let e = 4;
  for (let i = 0; i < 100; i++) {
    s = rng.int(2, 4);
    r = rng.pick([1, 2, 3, 4, 5, 6, 7, 9]);
    e = rng.int(3, 8);
    if (s ** 3 * r <= 500 && (r > 1 || e % 3 !== 0)) break;
  }
  const sign = rng.chance(0.5) ? -1 : 1;
  const c = sign * s ** 3 * r;
  const E: Pow = [[v, e]];
  const sp = splitMono(c, E, 3);
  const radicand = mono(c, E);
  const cube = mono(sp.powC, sp.powE);
  const inner = mono(sp.inC, sp.inE);
  const ans = mixedTex(sp.outC, sp.outE, sp.inC, sp.inE, 3);
  return {
    prompt: `Write $\\sqrt[3]{${radicand}}$ as a mixed radical $A\\sqrt[3]{B}$ in simplest form, then enter $A$ and $B$.`,
    parts: abParts(monoText(sp.outC, sp.outE), monoText(sp.inC, sp.inE)),
    hints: [
      `A power is a perfect cube when its exponent is a multiple of 3, for example $${v}^{6} = \\left(${v}^{2}\\right)^3$. A cube root of a negative number is negative.`,
      'Split the radicand into its largest perfect-cube factor times what is left over.',
    ],
    solution: [
      `Largest perfect-cube factor: $${radicand} = ${cube} \\cdot ${inner}$, where $${cube} = \\left(${mono(sp.outC, sp.outE)}\\right)^3$.`,
      `$\\sqrt[3]{${radicand}} = \\sqrt[3]{${cube}}\\,\\sqrt[3]{${inner}} = ${ans}$`,
      `So $A = ${mono(sp.outC, sp.outE)}$ and $B = ${inner}$.`,
    ],
    answerDisplay: `$${ans}$`,
  };
}

const simplify = skill({
  id: 'm201-radical-simplify',
  name: 'Mixed and entire radicals',
  description: 'Convert between entire and mixed radicals in simplest form, with numerical and variable radicands.',
  outcomes: ['AN2'],
  lessonId: 'm201-5-1',
  gen(rng, d) {
    if (d === 1) return rng.chance(0.35) ? entireNumeric(rng) : mixedNumeric(rng);
    if (d === 2) {
      const kind = rng.weighted([
        ['var', 3],
        ['entire', 1.2],
        ['cube', 1.2],
      ] as const);
      return kind === 'var' ? varMixed(rng) : kind === 'entire' ? varEntire(rng) : cubeNumeric(rng);
    }
    return rng.chance(0.6) ? twoVar(rng) : cubeVar(rng);
  },
});

// ---------------------------------------------------------------------------
// Comparing and ordering
// ---------------------------------------------------------------------------

function compareTwo(rng: Rng): GenOutput {
  let A = { k: 2, m: 7 };
  let B = { k: 3, m: 3 };
  if (rng.chance(0.25)) {
    const m = rng.pick([2, 3, 5, 6, 7]);
    const s = rng.pick([4, 6, 8, 9, 10, 12].filter((x) => x * x * m <= 800));
    const [k1, k2] = rng.sample(
      divisors(s).filter((x) => x > 1),
      2,
    );
    A = { k: k1, m: (s * s * m) / (k1 * k1) };
    B = { k: k2, m: (s * s * m) / (k2 * k2) };
  } else {
    for (let i = 0; i < 300; i++) {
      const k1 = rng.int(2, 7);
      const k2 = rng.intExcept(2, 7, [k1]);
      const m1 = rng.pick([2, 3, 5, 6, 7, 10, 11, 13]);
      const m2 = rng.pick([2, 3, 5, 6, 7, 10, 11, 13]);
      const N1 = k1 * k1 * m1;
      const N2 = k2 * k2 * m2;
      if ((k1 - k2) * (m1 - m2) >= 0 || N1 === N2 || Math.abs(N1 - N2) > 15) continue;
      A = { k: k1, m: m1 };
      B = { k: k2, m: m2 };
      break;
    }
  }
  const NA = A.k * A.k * A.m;
  const NB = B.k * B.k * B.m;
  const aTex = rad(A.k, A.m);
  const bTex = rad(B.k, B.m);
  const idx = NA > NB ? 0 : NA < NB ? 1 : 2;
  return {
    prompt: `Without using a calculator, compare $${aTex}$ and $${bTex}$.`,
    parts: [{ answer: fixedChoice([`$${aTex}$ is greater`, `$${bTex}$ is greater`, 'They are equal'], idx) }],
    hints: ['Write each number as an entire radical.', 'For $a, b \\ge 0$, $\\sqrt{a} > \\sqrt{b}$ exactly when $a > b$.'],
    solution: [
      `$${aTex} = \\sqrt{${A.k}^2 \\times ${A.m}} = \\sqrt{${NA}}$`,
      `$${bTex} = \\sqrt{${B.k}^2 \\times ${B.m}} = \\sqrt{${NB}}$`,
      idx === 2 ? `Both equal $\\sqrt{${NA}}$, so they are equal.` : `Since $${Math.max(NA, NB)} > ${Math.min(NA, NB)}$, $${idx === 0 ? aTex : bTex}$ is greater.`,
    ],
  };
}

/** A mixed radical ±k√m with its entire-radical step; key orders the values. */
function mixedVal(k: number, m: number, sign = 1): OrderVal {
  const N = k * k * m;
  const md = sign < 0 ? `-${rad(k, m)}` : rad(k, m);
  return { md: `$${md}$`, key: sign * N, step: `$${md} = ${sign < 0 ? '-' : ''}\\sqrt{${k}^2 \\times ${m}} = ${sign < 0 ? '-' : ''}\\sqrt{${N}}$` };
}

/** A whole number or entire radical between lo and hi whose square is not already used. */
function extraVal(rng: Rng, lo: number, hi: number, used: Set<number>): OrderVal | null {
  if (rng.chance(0.4)) {
    const wholes = [];
    for (let w = 2; w * w < hi; w++) if (w * w > lo && !used.has(w * w)) wholes.push(w);
    if (wholes.length) {
      const w = rng.pick(wholes);
      return { md: `$${w}$`, key: w * w, step: `$${w} = \\sqrt{${w * w}}$` };
    }
  }
  for (let i = 0; i < 50; i++) {
    const N = rng.int(lo + 1, hi - 1);
    if (used.has(N) || Number.isInteger(Math.sqrt(N))) continue;
    return { md: `$\\sqrt{${N}}$`, key: N, step: `$\\sqrt{${N}}$ is already an entire radical.` };
  }
  return null;
}

/** Three or more mixed radicals whose order differs from the order of their coefficients. */
function pickMixed(rng: Rng, count: number, maxN: number, used: Set<number>): Array<{ k: number; m: number }> | null {
  const out: Array<{ k: number; m: number }> = [];
  for (let i = 0; i < 200 && out.length < count; i++) {
    const k = rng.int(2, 6);
    const m = rng.pick([2, 3, 5, 6, 7, 10, 11]);
    const N = k * k * m;
    if (N > maxN || used.has(N) || out.some((x) => x.k === k)) continue;
    used.add(N);
    out.push({ k, m });
  }
  if (out.length < count) return null;
  const byK = [...out].sort((a, b) => a.k - b.k).map((x) => x.k * x.k * x.m);
  const byN = [...byK].sort((a, b) => a - b);
  return byK.join() === byN.join() ? null : out;
}

function orderPositive(rng: Rng): GenOutput {
  for (let t = 0; t < 200; t++) {
    const used = new Set<number>();
    const ms = pickMixed(rng, 3, 200, used);
    if (!ms) continue;
    const vals = ms.map((x) => mixedVal(x.k, x.m));
    const extra = extraVal(rng, Math.min(...used), Math.max(...used), used);
    if (!extra) continue;
    vals.push(extra);
    const shown = rng.shuffle(vals);
    return {
      prompt: 'Without using a calculator, arrange these numbers from **least to greatest**.',
      parts: [orderPart(shown)],
      hints: ['Write every number as an entire radical (a whole number $w$ is $\\sqrt{w^2}$).', 'Then compare the radicands: the larger the radicand, the larger the square root.'],
      solution: [...shown.map((v) => v.step), `From least to greatest: ${sortedList(shown)}.`],
    };
  }
  throw new Error('orderPositive failed');
}

function orderSigned(rng: Rng): GenOutput {
  for (let t = 0; t < 200; t++) {
    const used = new Set<number>();
    const neg = pickMixed(rng, 2, 200, used);
    if (!neg || neg[0].k === neg[1].k) continue;
    const posUsed = new Set<number>();
    const pos = pickMixed(rng, 2, 200, posUsed);
    if (!pos) continue;
    const vals = [...neg.map((x) => mixedVal(x.k, x.m, -1)), ...pos.map((x) => mixedVal(x.k, x.m))];
    const extra = extraVal(rng, Math.min(...posUsed), Math.max(...posUsed), posUsed);
    if (!extra) continue;
    vals.push(extra);
    const shown = rng.shuffle(vals);
    return {
      prompt: 'Without using a calculator, arrange these numbers from **least to greatest**.',
      parts: [orderPart(shown)],
      hints: ['Write every number as an entire radical, keeping its sign.', 'For negative numbers the order flips: $-\\sqrt{50} < -\\sqrt{48}$ because $\\sqrt{50}$ is farther from zero.'],
      solution: [...shown.map((v) => v.step), 'Negative numbers come first; the one with the larger radicand is farther left on the number line.', `From least to greatest: ${sortedList(shown)}.`],
    };
  }
  throw new Error('orderSigned failed');
}

function orderVariable(rng: Rng): GenOutput {
  const v = rng.pick(['x', 'a', 'n']);
  for (let t = 0; t < 300; t++) {
    const items: Array<{ k: number; m: number }> = [];
    const keys = new Set<number>();
    for (let i = 0; i < 100 && items.length < 4; i++) {
      const k = rng.int(1, 5);
      const m = rng.pick([1, 2, 3, 5, 6, 7]);
      const N = k * k * m;
      if (N > 110 || keys.has(N)) continue;
      keys.add(N);
      items.push({ k, m });
    }
    if (items.length < 4) continue;
    const byK = [...items].sort((a, b) => a.k - b.k || a.m - b.m).map((x) => x.k * x.k * x.m);
    if (byK.join() === [...byK].sort((a, b) => a - b).join()) continue;
    const inner = (m: number) => `${m === 1 ? '' : m}${v}`;
    const vals: OrderVal[] = items.map(({ k, m }) => ({
      md: `$${co(k)}\\sqrt{${inner(m)}}$`,
      key: k * k * m,
      step: k === 1 ? `$\\sqrt{${inner(m)}}$ is already an entire radical.` : `$${co(k)}\\sqrt{${inner(m)}} = \\sqrt{${k * k} \\cdot ${inner(m)}} = \\sqrt{${k * k * m}${v}}$`,
    }));
    const shown = rng.shuffle(vals);
    return {
      prompt: `Assume $${v} > 0$. Without using a calculator, arrange these expressions from **least to greatest**.`,
      parts: [orderPart(shown)],
      hints: ['Write each expression as an entire radical.', `Each radicand is a multiple of $${v}$; since $${v} > 0$, the larger multiple gives the larger value.`],
      solution: [...shown.map((x) => x.step), `Because $${v} > 0$, compare the coefficients of $${v}$ under the radical signs.`, `From least to greatest: ${sortedList(shown)}.`],
    };
  }
  throw new Error('orderVariable failed');
}

const compare = skill({
  id: 'm201-radical-compare',
  name: 'Comparing and ordering radicals',
  description: 'Compare and order mixed and entire radicals, including negative radicals and variable radicands, by writing them as entire radicals.',
  outcomes: ['AN2'],
  lessonId: 'm201-5-1',
  gen(rng, d) {
    if (d === 1) return compareTwo(rng);
    if (d === 2) return orderPositive(rng);
    return rng.chance(0.5) ? orderSigned(rng) : orderVariable(rng);
  },
});

// ---------------------------------------------------------------------------
// Adding and subtracting
// ---------------------------------------------------------------------------

interface RadTerm {
  c: number; // signed coefficient written in front of the radical
  s: number; // square root of the perfect-square factor
}

function addOneFamily(rng: Rng, d: 1 | 2): GenOutput {
  let m = 2;
  let terms: RadTerm[] = [];
  let total = 0;
  for (let t = 0; t < 300; t++) {
    m = rng.pick([2, 3, 5, 6, 7]);
    const n = d === 1 ? rng.pick([2, 3, 3]) : 3;
    terms = [];
    for (let i = 0; i < n; i++) {
      const c = d === 1 ? 1 : rng.pick([1, 1, 2, 3, 4]);
      terms.push({ c: i === 0 ? c : c * rng.sign(), s: rng.int(1, d === 1 ? 5 : 6) });
    }
    const radicands = terms.map((x) => x.s * x.s * m);
    total = terms.reduce((acc, x) => acc + x.c * x.s, 0);
    if (radicands.some((r) => r > 250) || new Set(radicands).size < n || terms.filter((x) => x.s > 1).length < 2 || total === 0) continue;
    break;
  }
  const expr = polyString(terms.map((x) => [x.c, `\\sqrt{${x.s * x.s * m}}`]));
  const simplified = polyString(terms.map((x) => [x.c * x.s, `\\sqrt{${m}}`]));
  const coefs = polyString(terms.map((x) => [x.c * x.s, '']));
  const simplifyList = terms
    .filter((x) => x.s > 1)
    .map((x) => `$\\sqrt{${x.s * x.s * m}} = \\sqrt{${x.s * x.s}}\\,\\sqrt{${m}} = ${x.s}\\sqrt{${m}}$`)
    .join(', ');
  return {
    prompt: `Simplify $${expr}$. Write your answer as a mixed radical in simplest form.`,
    parts: [part({ kind: 'expression', expected: radText(total, m), form: 'simplified-radical' }, { placeholder: 'e.g. 7√2' })],
    hints: ['You can only add or subtract like radicals (same index, same radicand). Simplify each radical first.', `Each radical simplifies to a multiple of the same square root; then combine the coefficients.`],
    solution: [
      `Simplify each radical: ${simplifyList}.`,
      `$${expr} = ${simplified}$`,
      `These are like radicals, so combine the coefficients: $(${coefs})\\sqrt{${m}} = ${rad(total, m)}$.`,
    ],
    answerDisplay: `$${rad(total, m)}$`,
  };
}

function addTwoFamilies(rng: Rng): GenOutput {
  for (let t = 0; t < 300; t++) {
    const [m1, m2] = rng.pick([
      [2, 3],
      [2, 5],
      [3, 5],
      [2, 7],
      [3, 7],
      [5, 7],
    ]);
    const raw = [m1, m1, m2, m2].map((m) => ({ m, c: rng.pick([1, 1, 2, 3]) * rng.sign(), s: rng.int(1, 5) }));
    const terms = rng.shuffle(raw);
    if (terms[0].c < 0) terms[0].c = -terms[0].c;
    const radicands = terms.map((x) => x.s * x.s * x.m);
    const a = terms.filter((x) => x.m === m1).reduce((acc, x) => acc + x.c * x.s, 0);
    const b = terms.filter((x) => x.m === m2).reduce((acc, x) => acc + x.c * x.s, 0);
    if (radicands.some((r) => r > 250) || new Set(radicands).size < 4 || terms.filter((x) => x.s > 1).length < 3 || a === 0 || b === 0) continue;
    const expr = polyString(terms.map((x) => [x.c, `\\sqrt{${x.s * x.s * x.m}}`]));
    const simplified = polyString(terms.map((x) => [x.c * x.s, `\\sqrt{${x.m}}`]));
    const group = (m: number) => polyString(terms.filter((x) => x.m === m).map((x) => [x.c * x.s, '']));
    const answer = polyString([
      [a, `\\sqrt{${m1}}`],
      [b, `\\sqrt{${m2}}`],
    ]);
    return {
      prompt: `Simplify $${expr}$. Write your answer in the form $a\\sqrt{${m1}} + b\\sqrt{${m2}}$.`,
      parts: coefParts(['a', 'b'], [a, b]),
      hints: ['Simplify each radical first, then collect the like radicals.', `Every term becomes a multiple of $\\sqrt{${m1}}$ or of $\\sqrt{${m2}}$.`],
      solution: [
        `Simplify each radical: ${terms
          .filter((x) => x.s > 1)
          .map((x) => `$\\sqrt{${x.s * x.s * x.m}} = ${x.s}\\sqrt{${x.m}}$`)
          .join(', ')}.`,
        `$${expr} = ${simplified}$`,
        `Group like radicals: $(${group(m1)})\\sqrt{${m1}} + (${group(m2)})\\sqrt{${m2}} = ${answer}$`,
        `So $a = ${a}$ and $b = ${b}$.`,
      ],
      answerDisplay: `$${answer}$`,
    };
  }
  throw new Error('addTwoFamilies failed');
}

function addVariable(rng: Rng): GenOutput {
  for (let t = 0; t < 300; t++) {
    const v = rng.pick(['x', 'a', 'y', 'n']);
    const r = rng.pick([2, 3, 5, 6]);
    const P = rng.pick([0, 1]);
    const terms = [0, 1, 2].map((i) => {
      const c = rng.pick([1, 1, 2, 3]) * (i === 0 ? 1 : rng.sign());
      const s = rng.int(1, 4);
      const kind = P === 0 ? 'plain' : rng.pick(['out', 'in'] as const);
      const body = kind === 'plain' ? `\\sqrt{${s * s * r}${v}}` : kind === 'out' ? `${v}\\sqrt{${s * s * r}${v}}` : `\\sqrt{${s * s * r}${v}^{3}}`;
      return { c, s, kind, body };
    });
    const total = terms.reduce((acc, x) => acc + x.c * x.s, 0);
    const needs = terms.filter((x) => x.s > 1 || x.kind === 'in').length;
    if (total === 0 || needs < 2 || new Set(terms.map((x) => x.body)).size < 3 || terms.some((x) => x.s * x.s * r > 100)) continue;
    const unit = mixedTex(1, [[v, P]], r, [[v, 1]]);
    const unitBody = unit; // coefficient 1 prints nothing in front
    const expr = polyString(terms.map((x) => [x.c, x.body]));
    const simplified = polyString(terms.map((x) => [x.c * x.s, unitBody]));
    const coefs = polyString(terms.map((x) => [x.c * x.s, '']));
    const list = terms
      .filter((x) => x.s > 1 || x.kind === 'in')
      .map((x) => `$${x.body} = ${mixedTex(x.s, [[v, P]], r, [[v, 1]])}$`)
      .join(', ');
    const ans = mixedTex(total, [[v, P]], r, [[v, 1]]);
    return {
      prompt: `Assume $${v} \\ge 0$. Simplify $${expr}$ and write the result as a single mixed radical $A\\sqrt{B}$ in simplest form. Enter $A$ and $B$.`,
      parts: abParts(monoText(total, [[v, P]]), monoText(r, [[v, 1]])),
      hints: ['Simplify each radical: take the largest perfect square out of the number and out of the variable part.', `Every term becomes a multiple of $${unit}$; then combine the coefficients.`],
      solution: [`Simplify each radical: ${list}.`, `$${expr} = ${simplified}$`, `Combine like radicals: $(${coefs})${unitBody} = ${ans}$`, `So $A = ${mono(total, [[v, P]])}$ and $B = ${r}${v}$.`],
      answerDisplay: `$${ans}$`,
    };
  }
  throw new Error('addVariable failed');
}

const add = skill({
  id: 'm201-radical-add',
  name: 'Adding and subtracting radicals',
  description: 'Add and subtract radicals with numerical and variable radicands by simplifying and combining like radicals.',
  outcomes: ['AN2'],
  lessonId: 'm201-5-1',
  gen(rng, d) {
    if (d === 1) return addOneFamily(rng, 1);
    if (d === 2) return rng.chance(0.6) ? addTwoFamilies(rng) : addOneFamily(rng, 2);
    return addVariable(rng);
  },
});

// ---------------------------------------------------------------------------
// 5.2 Multiplying
// ---------------------------------------------------------------------------

function mulMonomial(rng: Rng): GenOutput {
  if (rng.chance(0.25)) {
    const a = rng.int(2, 6) * (rng.chance(0.3) ? -1 : 1);
    const m = rng.pick([2, 3, 5, 6, 7, 10]);
    const value = a * a * m;
    return {
      prompt: `Simplify $\\left(${rad(a, m)}\\right)^2$.`,
      parts: [part({ kind: 'expression', expected: `${value}`, form: 'simplified-radical' }, { placeholder: 'e.g. 48' })],
      hints: ['$(ab)^2 = a^2b^2$, and $\\left(\\sqrt{m}\\right)^2 = m$ for $m \\ge 0$.'],
      solution: [`$\\left(${rad(a, m)}\\right)^2 = (${a})^2\\left(\\sqrt{${m}}\\right)^2$`, `$= ${a * a} \\times ${m} = ${value}$`],
      answerDisplay: `$${value}$`,
    };
  }
  for (let t = 0; t < 300; t++) {
    const a = rng.int(1, 5) * (rng.chance(0.25) ? -1 : 1);
    const b = rng.int(1, 6);
    const m = rng.pick([2, 3, 5, 6, 7, 10, 11, 14, 15]);
    const n = rng.pick([2, 3, 5, 6, 7, 10, 11, 14, 15]);
    const mn = m * n;
    const { outside: o, inside: i } = radicalSplit(mn);
    if (m === n || o < 2 || mn > 250 || (Math.abs(a) === 1 && b === 1)) continue;
    const ab = a * b;
    const ans = rad(ab * o, i);
    return {
      prompt: `Multiply and simplify: $\\left(${rad(a, m)}\\right)\\left(${rad(b, n)}\\right)$`,
      parts: [part({ kind: 'expression', expected: radText(ab * o, i), form: 'simplified-radical' }, { placeholder: 'e.g. 12√5' })],
      hints: ['Multiply the coefficients together and the radicands together: $(a\\sqrt{m})(b\\sqrt{n}) = ab\\sqrt{mn}$.', 'Then simplify the radical.'],
      solution: [
        `Multiply coefficients and radicands: $(${a} \\times ${b})\\sqrt{${m} \\times ${n}} = ${co(ab)}\\sqrt{${mn}}$`,
        `$\\sqrt{${mn}} = \\sqrt{${o * o}}\\,\\sqrt{${i}} = ${rad(o, i)}$`,
        `So the product is $${ab === 1 ? '' : `${paren(ab)} \\times `}${rad(o, i)} = ${ans}$.`,
      ],
      answerDisplay: `$${ans}$`,
    };
  }
  throw new Error('mulMonomial failed');
}

function mulBinomial(rng: Rng, kind: 'binomial' | 'square' | 'conjugate'): GenOutput {
  const m = rng.pick([2, 3, 5, 6, 7]);
  const root = `\\sqrt{${m}}`;
  const sq = `\\left(${root}\\right)^2`;
  if (kind === 'conjugate') {
    if (rng.chance(0.4)) {
      const [p, q] = rng.pick([
        [7, 2],
        [5, 3],
        [11, 6],
        [10, 3],
        [13, 7],
        [6, 11],
        [3, 7],
        [2, 5],
      ]);
      const value = p - q;
      return {
        prompt: `Multiply and simplify: $\\left(\\sqrt{${p}} + \\sqrt{${q}}\\right)\\left(\\sqrt{${p}} - \\sqrt{${q}}\\right)$`,
        parts: [numPart(value, { exact: false })],
        hints: ['The factors are conjugates: $(x + y)(x - y) = x^2 - y^2$.'],
        solution: [`This is a difference of squares: $\\left(\\sqrt{${p}}\\right)^2 - \\left(\\sqrt{${q}}\\right)^2$`, `$= ${p} - ${q} = ${value}$`],
      };
    }
    const a = rng.int(1, 8);
    const b = rng.int(1, 3);
    const value = a * a - b * b * m;
    const first = polyString([
      [a, ''],
      [b, root],
    ]);
    const second = polyString([
      [a, ''],
      [-b, root],
    ]);
    return {
      prompt: `Multiply and simplify: $\\left(${first}\\right)\\left(${second}\\right)$`,
      parts: [numPart(value, { exact: false })],
      hints: ['The factors are conjugates: $(x + y)(x - y) = x^2 - y^2$.', 'The middle terms cancel, and squaring removes the radical.'],
      solution: [`This is a difference of squares: $${a}^2 - \\left(${rad(b, m)}\\right)^2$`, `$= ${a * a} - ${b * b * m} = ${value}$`],
    };
  }
  for (let t = 0; t < 300; t++) {
    const a = rng.nonZero(-6, 6);
    const b = rng.pick([1, 2, 3]) * rng.sign();
    const c = kind === 'square' ? a : rng.nonZero(-6, 6);
    const dd = kind === 'square' ? b : rng.pick([1, 2, 3]) * rng.sign();
    const P = a * c + b * dd * m;
    const Q = a * dd + b * c;
    if (P === 0 || Q === 0 || (a === c && b === -dd)) continue;
    if (kind === 'binomial' && a === c && b === dd) continue;
    const first = polyString([
      [a, ''],
      [b, root],
    ]);
    const second = polyString([
      [c, ''],
      [dd, root],
    ]);
    const given = kind === 'square' ? `\\left(${first}\\right)^2` : `\\left(${first}\\right)\\left(${second}\\right)`;
    const answer = polyString([
      [P, ''],
      [Q, root],
    ]);
    return {
      prompt: `Expand and simplify $${given}$. Write the answer in the form $P + Q\\sqrt{${m}}$.`,
      parts: coefParts(['P', 'Q'], [P, Q]),
      hints: [
        kind === 'square' ? `Write the square as a product: $${given} = \\left(${first}\\right)\\left(${first}\\right)$.` : 'Multiply each term of the first factor by each term of the second.',
        `Use $${sq} = ${m}$, then collect the whole-number terms and the $${root}$ terms.`,
      ],
      solution: [
        ...(kind === 'square' ? [`$${given} = \\left(${first}\\right)\\left(${first}\\right)$`] : []),
        `Multiply each term by each term: $${polyString([
          [a * c, ''],
          [a * dd, root],
          [b * c, root],
          [b * dd, sq],
        ])}$`,
        `Since $${sq} = ${m}$: $${polyString([
          [a * c, ''],
          [b * dd * m, ''],
          [a * dd, root],
          [b * c, root],
        ])}$`,
        `Collect like terms: $${answer}$, so $P = ${P}$ and $Q = ${Q}$.`,
      ],
      answerDisplay: `$${answer}$`,
    };
  }
  throw new Error('mulBinomial failed');
}

function mulTwoRadicals(rng: Rng): GenOutput {
  for (let t = 0; t < 300; t++) {
    const [m, n] = rng.pick([
      [2, 3],
      [2, 5],
      [3, 5],
      [2, 7],
      [3, 7],
      [5, 7],
      [2, 11],
      [3, 11],
    ]);
    const square = rng.chance(0.3);
    const a = rng.nonZero(-4, 4);
    const b = rng.nonZero(-4, 4);
    const c = square ? a : rng.nonZero(-4, 4);
    const dd = square ? b : rng.nonZero(-4, 4);
    const P = a * c * m + b * dd * n;
    const Q = a * dd + b * c;
    if (P === 0 || Q === 0 || a < 0 || c < 0 || (!square && a === c && b === dd)) continue;
    const rm = `\\sqrt{${m}}`;
    const rn = `\\sqrt{${n}}`;
    const rmn = `\\sqrt{${m * n}}`;
    const first = polyString([
      [a, rm],
      [b, rn],
    ]);
    const second = polyString([
      [c, rm],
      [dd, rn],
    ]);
    const given = square ? `\\left(${first}\\right)^2` : `\\left(${first}\\right)\\left(${second}\\right)`;
    const answer = polyString([
      [P, ''],
      [Q, rmn],
    ]);
    return {
      prompt: `Expand and simplify $${given}$. Write the answer in the form $P + Q\\sqrt{${m * n}}$.`,
      parts: coefParts(['P', 'Q'], [P, Q]),
      hints: ['Multiply each term of the first factor by each term of the second.', `$\\left(${rm}\\right)^2 = ${m}$, $\\left(${rn}\\right)^2 = ${n}$ and $${rm}\\,${rn} = ${rmn}$.`],
      solution: [
        ...(square ? [`$${given} = \\left(${first}\\right)\\left(${first}\\right)$`] : []),
        `Multiply each term by each term: $${polyString([
          [a * c, `\\left(${rm}\\right)^2`],
          [a * dd, rmn],
          [b * c, rmn],
          [b * dd, `\\left(${rn}\\right)^2`],
        ])}$`,
        `Simplify the squares: $${polyString([
          [a * c * m, ''],
          [b * dd * n, ''],
          [a * dd, rmn],
          [b * c, rmn],
        ])}$`,
        `Collect like terms: $${answer}$, so $P = ${P}$ and $Q = ${Q}$.`,
      ],
      answerDisplay: `$${answer}$`,
    };
  }
  throw new Error('mulTwoRadicals failed');
}

function mulVariable(rng: Rng): GenOutput {
  for (let t = 0; t < 300; t++) {
    const v = rng.pick(['x', 'y']);
    const k = rng.pick([1, 1, 2, 3]);
    const square = rng.chance(0.3);
    const a = rng.int(1, 3);
    const b = rng.nonZero(-6, 6);
    const c = square ? a : rng.int(1, 3);
    const dd = square ? b : rng.nonZero(-6, 6);
    const P = a * c * k;
    const Q = a * dd + b * c;
    const R = b * dd;
    if (Q === 0 || (!square && a === c && b === dd)) continue;
    const root = k === 1 ? `\\sqrt{${v}}` : `\\sqrt{${k}${v}}`;
    const first = polyString([
      [a, root],
      [b, ''],
    ]);
    const second = polyString([
      [c, root],
      [dd, ''],
    ]);
    const given = square ? `\\left(${first}\\right)^2` : `\\left(${first}\\right)\\left(${second}\\right)`;
    const answer = polyString([
      [P, v],
      [Q, root],
      [R, ''],
    ]);
    return {
      prompt: `Assume $${v} \\ge 0$. Expand and simplify $${given}$. Write the answer in the form $P${v} + Q${root} + R$.`,
      parts: coefParts(['P', 'Q', 'R'], [P, Q, R]),
      hints: ['Multiply each term of the first factor by each term of the second.', `Because $${v} \\ge 0$, $\\left(${root}\\right)^2 = ${k === 1 ? v : `${k}${v}`}$.`],
      solution: [
        ...(square ? [`$${given} = \\left(${first}\\right)\\left(${first}\\right)$`] : []),
        `Multiply each term by each term: $${polyString([
          [a * c, `\\left(${root}\\right)^2`],
          [a * dd, root],
          [b * c, root],
          [b * dd, ''],
        ])}$`,
        `Since $\\left(${root}\\right)^2 = ${k === 1 ? v : `${k}${v}`}$, collect like terms: $${answer}$`,
        `So $P = ${P}$, $Q = ${Q}$ and $R = ${R}$.`,
      ],
      answerDisplay: `$${answer}$`,
    };
  }
  throw new Error('mulVariable failed');
}

const multiply = skill({
  id: 'm201-radical-multiply',
  name: 'Multiplying radicals',
  description: 'Multiply radical expressions, including binomial products, conjugates and squares, and simplify the result.',
  outcomes: ['AN2'],
  lessonId: 'm201-5-2',
  gen(rng, d) {
    if (d === 1) return mulMonomial(rng);
    if (d === 2) return mulBinomial(rng, rng.pick(['binomial', 'binomial', 'square', 'conjugate'] as const));
    return rng.chance(0.55) ? mulTwoRadicals(rng) : mulVariable(rng);
  },
});

// ---------------------------------------------------------------------------
// Dividing and rationalizing
// ---------------------------------------------------------------------------

function ratMonomial(rng: Rng): GenOutput {
  for (let t = 0; t < 300; t++) {
    const m = rng.pick([2, 3, 5, 6, 7, 10, 11]);
    const b = rng.pick([1, 1, 2, 3, 4, 5]);
    const a = rng.int(1, 5);
    const p = rng.pick([2, 3, 5, 6, 7, 10]);
    if (p === m) continue;
    const { outside: o, inside: numRad } = radicalSplit(p * m);
    const numTex = rad(a, p);
    const afterTex = `${co(a)}\\sqrt{${p * m}}`;
    const numCoef = a * o;
    const steps: string[] = [];
    if (o > 1) steps.push(`Simplify the numerator: $${afterTex} = ${a === 1 ? '' : `${a} \\times `}${rad(o, numRad)}${a === 1 ? '' : ` = ${rad(numCoef, numRad)}`}$`);
    const denVal = b * m;
    const g = gcd(numCoef, denVal);
    const top = numCoef / g;
    const bottom = denVal / g;
    const given = `\\dfrac{${numTex}}{${rad(b, m)}}`;
    const answer = bottom === 1 ? rad(top, numRad) : `\\dfrac{${rad(top, numRad)}}{${bottom}}`;
    if (g > 1) steps.push(`Divide the numerator and the denominator by $${g}$: $\\dfrac{${rad(numCoef, numRad)}}{${denVal}} = ${answer}$`);
    return {
      prompt: `Rationalize the denominator and simplify $${given}$. Write the result as a fraction in lowest terms and enter its numerator and denominator (enter $1$ as the denominator if the result is not a fraction).`,
      parts: [
        part({ kind: 'expression', expected: radText(top, numRad), form: 'simplified-radical' }, { label: 'Numerator', placeholder: 'e.g. 3√2' }),
        numPart(bottom, { label: 'Denominator', exact: false }),
      ],
      hints: [`Multiply the numerator and the denominator by $\\sqrt{${m}}$ — this is multiplying by $1$.`, `$\\sqrt{${m}} \\times \\sqrt{${m}} = ${m}$, so the denominator becomes a whole number. Then simplify and reduce.`],
      solution: [
        `Multiply by $\\dfrac{\\sqrt{${m}}}{\\sqrt{${m}}}$: $${given} \\times \\dfrac{\\sqrt{${m}}}{\\sqrt{${m}}} = ${b === 1 ? '' : `\\dfrac{${afterTex}}{${b} \\times ${m}} = `}\\dfrac{${afterTex}}{${denVal}}$`,
        ...steps,
        `So $${given} = ${answer}$.`,
      ],
      answerDisplay: `$${answer}$`,
    };
  }
  throw new Error('ratMonomial failed');
}

/** Small fractions only, so rationalized answers stay readable. */
const nice = (f: Frac, maxDen = 4) => f.d <= maxDen;

function ratConjugate(rng: Rng): GenOutput {
  const kind = rng.weighted([
    ['int', 0.45],
    ['rad', 0.25],
    ['two', 0.3],
  ] as const);
  for (let t = 0; t < 500; t++) {
    if (kind === 'two') {
      const [m, p] = rng.pick([
        [3, 2],
        [5, 2],
        [5, 3],
        [6, 5],
        [7, 2],
        [7, 3],
        [7, 5],
        [10, 3],
        [11, 7],
        [6, 2],
      ]);
      const s = rng.sign();
      const D = m - p;
      const n = rng.chance(0.6) ? D * rng.int(1, 3) : rng.int(1, 9);
      const Pm = frac(n, D);
      const Pp = frac(-s * n, D);
      if (!nice(Pm, 3) || !nice(Pp, 3)) continue;
      const den = polyString([
        [1, `\\sqrt{${m}}`],
        [s, `\\sqrt{${p}}`],
      ]);
      const conj = polyString([
        [1, `\\sqrt{${m}}`],
        [-s, `\\sqrt{${p}}`],
      ]);
      const answer = fracSum([
        [Pm, `\\sqrt{${m}}`],
        [Pp, `\\sqrt{${p}}`],
      ]);
      return {
        prompt: `Rationalize the denominator of $\\dfrac{${n}}{${den}}$. Write the answer in the form $P\\sqrt{${m}} + Q\\sqrt{${p}}$, where $P$ and $Q$ are rational numbers.`,
        parts: coefParts(['P', 'Q'], [fracValue(Pm), fracValue(Pp)]),
        hints: [`Multiply the numerator and the denominator by the conjugate $${conj}$.`, `The denominator becomes $\\left(\\sqrt{${m}}\\right)^2 - \\left(\\sqrt{${p}}\\right)^2$.`],
        solution: [
          `The conjugate of $${den}$ is $${conj}$. Multiply the numerator and denominator by it.`,
          `Denominator: $\\left(${den}\\right)\\left(${conj}\\right) = ${m} - ${p} = ${D}$`,
          `Numerator: $${n}\\left(${conj}\\right) = ${polyString([
            [n, `\\sqrt{${m}}`],
            [-s * n, `\\sqrt{${p}}`],
          ])}$`,
          divideStep(D, answer, ['P', 'Q'], [Pm, Pp]),
        ],
        answerDisplay: `$${answer}$`,
      };
    }
    const m = rng.pick([2, 3, 5, 6, 7, 10, 11]);
    const root = `\\sqrt{${m}}`;
    if (kind === 'rad') {
      // k√m / (√m + s·a) = k√m(√m − s·a) / (m − a²)
      const k = rng.int(1, 4);
      const a = rng.int(1, 4);
      const s = rng.sign();
      const D = m - a * a;
      if (D === 0) continue;
      const P = frac(k * m, D);
      const Q = frac(-s * k * a, D);
      if (!nice(P) || !nice(Q)) continue;
      const den = polyString([
        [1, root],
        [s * a, ''],
      ]);
      const conj = polyString([
        [1, root],
        [-s * a, ''],
      ]);
      const answer = fracSum([
        [P, ''],
        [Q, root],
      ]);
      return {
        prompt: `Rationalize the denominator of $\\dfrac{${rad(k, m)}}{${den}}$. Write the answer in the form $P + Q\\sqrt{${m}}$, where $P$ and $Q$ are rational numbers.`,
        parts: coefParts(['P', 'Q'], [fracValue(P), fracValue(Q)]),
        hints: [`Multiply the numerator and the denominator by the conjugate $${conj}$.`, 'The product of conjugates is a difference of squares, which has no radical.'],
        solution: [
          `The conjugate of $${den}$ is $${conj}$. Multiply the numerator and denominator by it.`,
          `Denominator: $\\left(${den}\\right)\\left(${conj}\\right) = ${m} - ${a * a} = ${D}$`,
          `Numerator: $${rad(k, m)}\\left(${conj}\\right) = ${polyString([
            [k * m, ''],
            [-s * k * a, root],
          ])}$`,
          divideStep(D, answer, ['P', 'Q'], [P, Q]),
        ],
        answerDisplay: `$${answer}$`,
      };
    }
    // n / (a + b√m) = n(a − b√m) / (a² − b²m)
    const a = rng.int(1, 6);
    const b = rng.pick([1, 1, 2]) * rng.sign();
    const D = a * a - b * b * m;
    if (D === 0) continue;
    const n = rng.chance(0.5) ? Math.abs(D) * rng.int(1, 3) : rng.int(1, 12);
    const P = frac(n * a, D);
    const Q = frac(-n * b, D);
    if (!nice(P) || !nice(Q)) continue;
    const den = polyString([
      [a, ''],
      [b, root],
    ]);
    const conj = polyString([
      [a, ''],
      [-b, root],
    ]);
    const answer = fracSum([
      [P, ''],
      [Q, root],
    ]);
    return {
      prompt: `Rationalize the denominator of $\\dfrac{${n}}{${den}}$. Write the answer in the form $P + Q\\sqrt{${m}}$, where $P$ and $Q$ are rational numbers.`,
      parts: coefParts(['P', 'Q'], [fracValue(P), fracValue(Q)]),
      hints: [`Multiply the numerator and the denominator by the conjugate $${conj}$.`, `The denominator becomes $${a}^2 - \\left(${rad(Math.abs(b), m)}\\right)^2$, a rational number.`],
      solution: [
        `The conjugate of $${den}$ is $${conj}$. Multiply the numerator and denominator by it.`,
        `Denominator: $\\left(${den}\\right)\\left(${conj}\\right) = ${a}^2 - \\left(${rad(Math.abs(b), m)}\\right)^2 = ${a * a} - ${b * b * m} = ${D}$`,
        `Numerator: $${n}\\left(${conj}\\right) = ${polyString([
          [n * a, ''],
          [-n * b, root],
        ])}$`,
        divideStep(D, answer, ['P', 'Q'], [P, Q]),
      ],
      answerDisplay: `$${answer}$`,
    };
  }
  throw new Error('ratConjugate failed');
}

function ratRadOverRad(rng: Rng): GenOutput {
  for (let t = 0; t < 300; t++) {
    const [m, p] = rng.pick([
      [3, 2],
      [5, 2],
      [5, 3],
      [6, 2],
      [6, 3],
      [7, 3],
      [7, 5],
      [10, 2],
      [10, 6],
      [11, 3],
    ]);
    const s = rng.sign();
    const D = m - p;
    const { outside: o, inside: i } = radicalSplit(m * p);
    const P = frac(m + p, D);
    const Q = frac(2 * s * o, D);
    if (!nice(P) || !nice(Q)) continue;
    const top = polyString([
      [1, `\\sqrt{${m}}`],
      [s, `\\sqrt{${p}}`],
    ]);
    const bottom = polyString([
      [1, `\\sqrt{${m}}`],
      [-s, `\\sqrt{${p}}`],
    ]);
    const answer = fracSum([
      [P, ''],
      [Q, `\\sqrt{${i}}`],
    ]);
    return {
      prompt: `Rationalize the denominator of $\\dfrac{${top}}{${bottom}}$ and simplify. Write the answer in the form $P + Q\\sqrt{${i}}$, where $P$ and $Q$ are rational numbers.`,
      parts: coefParts(['P', 'Q'], [fracValue(P), fracValue(Q)]),
      hints: [`Multiply the numerator and the denominator by the conjugate of the denominator, $${top}$.`, 'The numerator becomes a perfect square; expand it carefully and simplify the radical.'],
      solution: [
        `Multiply the numerator and denominator by the conjugate $${top}$.`,
        `Denominator: $\\left(\\sqrt{${m}}\\right)^2 - \\left(\\sqrt{${p}}\\right)^2 = ${m} - ${p} = ${D}$`,
        `Numerator: $\\left(${top}\\right)^2 = ${m} ${s > 0 ? '+' : '-'} 2\\sqrt{${m * p}} + ${p} = ${polyString([
          [m + p, ''],
          [2 * s, `\\sqrt{${m * p}}`],
        ])}$`,
        ...(o > 1 ? [`$\\sqrt{${m * p}} = ${o}\\sqrt{${i}}$, so the numerator is $${polyString([
          [m + p, ''],
          [2 * s * o, `\\sqrt{${i}}`],
        ])}$`] : []),
        divideStep(D, answer, ['P', 'Q'], [P, Q]),
      ],
      answerDisplay: `$${answer}$`,
    };
  }
  throw new Error('ratRadOverRad failed');
}

function ratBinOverBin(rng: Rng): GenOutput {
  for (let t = 0; t < 500; t++) {
    const m = rng.pick([2, 3, 5, 6, 7]);
    const root = `\\sqrt{${m}}`;
    const a = rng.int(1, 6);
    const b = rng.nonZero(-3, 3);
    const c = rng.int(1, 5);
    const dd = rng.pick([1, 2]) * rng.sign();
    const D = c * c - dd * dd * m;
    if (D === 0 || a * dd === b * c) continue;
    const Pn = a * c - b * dd * m;
    const Qn = b * c - a * dd;
    const P = frac(Pn, D);
    const Q = frac(Qn, D);
    if (Q.n === 0 || !nice(P) || !nice(Q)) continue;
    const top = polyString([
      [a, ''],
      [b, root],
    ]);
    const bottom = polyString([
      [c, ''],
      [dd, root],
    ]);
    const conj = polyString([
      [c, ''],
      [-dd, root],
    ]);
    const answer = fracSum([
      [P, ''],
      [Q, root],
    ]);
    return {
      prompt: `Rationalize the denominator of $\\dfrac{${top}}{${bottom}}$ and simplify. Write the answer in the form $P + Q\\sqrt{${m}}$, where $P$ and $Q$ are rational numbers.`,
      parts: coefParts(['P', 'Q'], [fracValue(P), fracValue(Q)]),
      hints: [`Multiply the numerator and the denominator by the conjugate $${conj}$.`, 'Expand the numerator term by term; the denominator is a difference of squares.'],
      solution: [
        `Multiply the numerator and denominator by the conjugate $${conj}$.`,
        `Denominator: $${c}^2 - \\left(${rad(Math.abs(dd), m)}\\right)^2 = ${c * c} - ${dd * dd * m} = ${D}$`,
        `Numerator: $\\left(${top}\\right)\\left(${conj}\\right) = ${polyString([
          [a * c, ''],
          [-a * dd, root],
          [b * c, root],
          [-b * dd * m, ''],
        ])} = ${polyString([
          [Pn, ''],
          [Qn, root],
        ])}$`,
        divideStep(D, answer, ['P', 'Q'], [P, Q]),
      ],
      answerDisplay: `$${answer}$`,
    };
  }
  throw new Error('ratBinOverBin failed');
}

function ratVariable(rng: Rng): GenOutput {
  const a = rng.int(2, 6);
  const s = rng.sign();
  const rootNum = rng.chance(0.4);
  const n = rng.int(2, 9);
  const den = `\\sqrt{x} ${plusMinus(s * a)}`;
  const conj = `\\sqrt{x} ${plusMinus(-s * a)}`;
  const wrongConj = den;
  const numTex = rootNum ? '\\sqrt{x}' : `${n}`;
  const after = (c: string) => (rootNum ? `x ${plusMinus(c === conj ? -s * a : s * a)}\\sqrt{x}` : `${n}\\left(${c}\\right)`);
  const correct = `$\\dfrac{${after(conj)}}{x - ${a * a}}$`;
  return {
    prompt: `Assume $x \\ge 0$ and $x \\ne ${a * a}$. Which expression is equivalent to $\\dfrac{${numTex}}{${den}}$ and has a rational denominator?`,
    parts: [
      {
        answer: mc(rng, correct, [`$\\dfrac{${after(conj)}}{x - ${a}}$`, `$\\dfrac{${after(conj)}}{x + ${a * a}}$`, `$\\dfrac{${after(wrongConj)}}{x - ${a * a}}$`]),
      },
    ],
    hints: [`Multiply the numerator and the denominator by the conjugate $${conj}$.`, `$\\left(\\sqrt{x}\\right)^2 = x$ and $${a}^2 = ${a * a}$.`],
    solution: [
      `The conjugate of $${den}$ is $${conj}$.`,
      `Denominator: $\\left(${den}\\right)\\left(${conj}\\right) = \\left(\\sqrt{x}\\right)^2 - ${a}^2 = x - ${a * a}$`,
      `Numerator: $${numTex}\\left(${conj}\\right)${rootNum ? ` = ${after(conj)}` : ''}$`,
      `So the expression equals ${correct}.`,
    ],
  };
}

const rationalize = skill({
  id: 'm201-rationalize',
  name: 'Dividing radicals and rationalizing denominators',
  description: 'Divide radicals and rationalize monomial and binomial denominators, using a conjugate for a binomial.',
  outcomes: ['AN2'],
  lessonId: 'm201-5-2',
  gen(rng, d) {
    if (d === 1) return ratMonomial(rng);
    if (d === 2) return ratConjugate(rng);
    const kind = rng.weighted([
      ['radOverRad', 0.4],
      ['binOverBin', 0.35],
      ['variable', 0.25],
    ] as const);
    return kind === 'radOverRad' ? ratRadOverRad(rng) : kind === 'binOverBin' ? ratBinOverBin(rng) : ratVariable(rng);
  },
});

// ---------------------------------------------------------------------------
// 5.3 Restrictions
// ---------------------------------------------------------------------------

interface RestrictionCase {
  expr: string;
  correct: string;
  wrong: string[];
  steps: string[];
  prompt?: string;
}

function linearRestriction(rng: Rng, strict: boolean): RestrictionCase {
  const p = rng.int(1, 5);
  const q = rng.nonZero(-15, 15);
  const lin = polyString([
    [p, 'x'],
    [q, ''],
  ]);
  const B = fracLatex(frac(-q, p));
  const op = strict ? '>' : '\\ge';
  const steps = [
    strict ? `The radicand must be non-negative and the denominator cannot be $0$, so the radicand must be positive: $${lin} > 0$.` : `The radicand must be non-negative: $${lin} \\ge 0$.`,
    `$${co(p)}x ${op} ${-q}$`,
    ...(p > 1 ? [`Divide by $${p}$: $x ${op} ${B}$`] : []),
  ];
  const wrong = strict
    ? [`$x \\ge ${B}$`, `$x < ${B}$`, `$x \\ne ${B}$`]
    : [`$x \\le ${B}$`, `$x \\ge ${fracLatex(frac(q, p))}$`, p > 1 ? `$x \\ge ${-q}$` : `$x > ${B}$`];
  let expr = `\\sqrt{${lin}}`;
  if (strict) expr = `\\dfrac{${rng.int(1, 9)}}{\\sqrt{${lin}}}`;
  else {
    const wrap = rng.pick(['plain', 'coef', 'plus'] as const);
    if (wrap === 'coef') expr = `${rng.int(2, 7)}\\sqrt{${lin}}`;
    if (wrap === 'plus') expr = `\\sqrt{${lin}} ${plusMinus(rng.nonZero(-9, 9))}`;
  }
  return { expr, correct: `$x ${op} ${B}$`, wrong, steps };
}

function negativeRestriction(rng: Rng): RestrictionCase {
  const p = rng.int(1, 5);
  const q = rng.nonZero(-15, 15);
  const lin = polyString([
    [q, ''],
    [-p, 'x'],
  ]);
  const B = fracLatex(frac(q, p));
  return {
    expr: rng.chance(0.5) ? `\\sqrt{${lin}}` : `${rng.int(2, 6)}\\sqrt{${lin}}`,
    correct: `$x \\le ${B}$`,
    wrong: [`$x \\ge ${B}$`, `$x \\le ${fracLatex(frac(-q, p))}$`, `$x < ${B}$`],
    steps: [
      `The radicand must be non-negative: $${lin} \\ge 0$.`,
      `$${co(-p)}x \\ge ${-q}$`,
      `${p === 1 ? 'Multiply by $-1$' : `Divide by $-${p}$`} and reverse the inequality sign: $x \\le ${B}$`,
    ],
  };
}

function equationRestriction(rng: Rng): RestrictionCase {
  const p = rng.int(1, 5);
  const q = rng.nonZero(-15, 15);
  const lin = polyString([
    [p, 'x'],
    [q, ''],
  ]);
  const B = fracLatex(frac(-q, p));
  const rhs = polyString([
    [1, 'x'],
    [rng.nonZero(-6, 6), ''],
  ]);
  return {
    expr: `\\sqrt{${lin}} = ${rhs}`,
    prompt: `Before solving $\\sqrt{${lin}} = ${rhs}$, state the restriction on $x$ that makes the radical defined.`,
    correct: `$x \\ge ${B}$`,
    wrong: [`$x \\le ${B}$`, `$x \\ge ${fracLatex(frac(q, p))}$`, `$x > ${B}$`],
    steps: [`The radicand must be non-negative: $${lin} \\ge 0$.`, `$${co(p)}x \\ge ${-q}$`, ...(p > 1 ? [`Divide by $${p}$: $x \\ge ${B}$`] : [])],
  };
}

function twoRadicalRestriction(rng: Rng): RestrictionCase {
  const a = rng.int(-8, 5);
  const b = a + rng.int(2, 10);
  const left = polyString([
    [1, 'x'],
    [-a, ''],
  ]);
  const right = polyString([
    [b, ''],
    [-1, 'x'],
  ]);
  const order = rng.chance(0.5);
  return {
    expr: order ? `\\sqrt{${left}} + \\sqrt{${right}}` : `\\sqrt{${right}} - \\sqrt{${left}}`,
    correct: `$${a} \\le x \\le ${b}$`,
    wrong: [`$x \\ge ${a}$`, `$x \\le ${b}$`, `$x \\le ${a}$ or $x \\ge ${b}$`],
    steps: [`$${left} \\ge 0$ gives $x \\ge ${a}$.`, `$${right} \\ge 0$ gives $x \\le ${b}$.`, `Both radicals must be defined at the same time, so $${a} \\le x \\le ${b}$.`],
  };
}

function ratioRestriction(rng: Rng): RestrictionCase {
  const p = rng.int(1, 3);
  const q = rng.nonZero(-12, 12);
  const lin = polyString([
    [p, 'x'],
    [q, ''],
  ]);
  const Bv = -q / p;
  const B = fracLatex(frac(-q, p));
  const c = Math.ceil(Bv + 1e-9) + rng.int(1, 6);
  const den = polyString([
    [1, 'x'],
    [-c, ''],
  ]);
  return {
    expr: `\\dfrac{\\sqrt{${lin}}}{${den}}`,
    correct: `$x \\ge ${B},\\ x \\ne ${c}$`,
    wrong: [`$x \\ge ${B}$`, `$x \\ne ${c}$`, `$x > ${c}$`],
    steps: [
      `The radicand must be non-negative: $${lin} \\ge 0$, so $x \\ge ${B}$.`,
      `The denominator cannot be zero: $${den} \\ne 0$, so $x \\ne ${c}$.`,
      `Since $${c}$ satisfies $x \\ge ${B}$, it must be removed separately: $x \\ge ${B},\\ x \\ne ${c}$.`,
    ],
  };
}

function productRestriction(rng: Rng): RestrictionCase {
  const k = rng.int(1, 5);
  const c = rng.int(1, 9);
  return {
    expr: `\\sqrt{${co(k)}x}\\,\\sqrt{x - ${c}}`,
    correct: `$x \\ge ${c}$`,
    wrong: [`$x \\ge 0$`, `$0 \\le x \\le ${c}$`, `$x \\ge -${c}$`],
    steps: [k === 1 ? 'The first radicand gives $x \\ge 0$.' : `The first radicand: $${k}x \\ge 0$ gives $x \\ge 0$.`, `The second radicand: $x - ${c} \\ge 0$ gives $x \\ge ${c}$.`, `Both must hold, and every $x \\ge ${c}$ is also $\\ge 0$, so the restriction is $x \\ge ${c}$.`],
  };
}

function allRealRestriction(rng: Rng): RestrictionCase {
  const k = rng.int(1, 16);
  return {
    expr: rng.chance(0.5) ? `\\sqrt{x^2 + ${k}}` : `${rng.int(2, 5)}\\sqrt{x^2 + ${k}}`,
    correct: '$x$ can be any real number',
    wrong: ['$x \\ge 0$', `$x \\ge -${k}$`, `$x \\le -${k}$ or $x \\ge ${k}$`],
    steps: [`$x^2 \\ge 0$ for every real number $x$, so $x^2 + ${k} \\ge ${k} > 0$.`, 'The radicand is never negative, so there is no restriction: $x$ can be any real number.'],
  };
}

const restrictions = skill({
  id: 'm201-radical-restrictions',
  name: 'Restrictions on radical expressions',
  description: 'Determine the values of the variable for which a radical expression or equation is defined.',
  outcomes: ['AN3'],
  lessonId: 'm201-5-3',
  format: 'mc',
  gen(rng, d) {
    let c: RestrictionCase;
    if (d === 1) c = linearRestriction(rng, false);
    else if (d === 2) {
      const kind = rng.pick(['neg', 'den', 'eq'] as const);
      c = kind === 'neg' ? negativeRestriction(rng) : kind === 'den' ? linearRestriction(rng, true) : equationRestriction(rng);
    } else {
      const kind = rng.weighted([
        ['two', 0.3],
        ['ratio', 0.3],
        ['product', 0.2],
        ['all', 0.2],
      ] as const);
      c = kind === 'two' ? twoRadicalRestriction(rng) : kind === 'ratio' ? ratioRestriction(rng) : kind === 'product' ? productRestriction(rng) : allRealRestriction(rng);
    }
    const prompt =
      c.prompt ?? rng.pick([`For which values of $x$ is $${c.expr}$ a real number?`, `State the restriction on $x$ in $${c.expr}$.`, `What values of $x$ make $${c.expr}$ defined in the real numbers?`]);
    return {
      prompt,
      parts: [{ answer: mc(rng, c.correct, c.wrong) }],
      hints: ['A square root of a negative number is not a real number, so every radicand must be $\\ge 0$.', 'Write an inequality for each radicand (and each denominator), solve it, and keep the values that satisfy all of them.'],
      solution: [...c.steps, `Answer: ${c.correct}.`],
    };
  },
});

// ---------------------------------------------------------------------------
// Radical equations
// ---------------------------------------------------------------------------

/** "\sqrt{p(r) + q}" substitution text. */
function subst(p: number, q: number, r: number): string {
  const first = p === 1 ? paren(r) : `${p}(${r})`;
  return q === 0 ? first : `${first} ${plusMinus(q)}`;
}

function eqBasic(rng: Rng): GenOutput {
  const kind = rng.pick(['equals', 'coef', 'shift'] as const);
  if (kind === 'coef') {
    const tRoot = rng.int(2, 9);
    const k = rng.int(2, 5);
    const m = rng.nonZero(-15, 15);
    const n = k * tRoot + m;
    const x = tRoot * tRoot;
    const lhs = polyString([
      [k, '\\sqrt{x}'],
      [m, ''],
    ]);
    return {
      prompt: `Solve $${lhs} = ${n}$. ${SOLVE_NOTE}`,
      parts: [solutionsPart([x])],
      hints: ['Isolate the radical first, then square both sides.', 'Check your answer in the original equation.'],
      solution: [
        `Isolate the radical: $${k}\\sqrt{x} = ${n - m}$, so $\\sqrt{x} = ${tRoot}$.`,
        `Square both sides: $x = ${tRoot}^2 = ${x}$`,
        `Check: $${k}\\sqrt{${x}} ${plusMinus(m)} = ${k * tRoot} ${plusMinus(m)} = ${n}$ ✓`,
        finalSolutions([x]),
      ],
    };
  }
  const x = rng.int(-5, 12);
  const a = rng.int(2, 6);
  let c = rng.int(2, 9);
  let b = c * c - a * x;
  for (let i = 0; i < 20 && (b === 0 || Math.abs(b) > 60); i++) {
    c = rng.int(2, 9);
    b = c * c - a * x;
  }
  const lin = polyString([
    [a, 'x'],
    [b, ''],
  ]);
  const m = kind === 'shift' ? rng.nonZero(-9, 9) : 0;
  const lhs = m === 0 ? `\\sqrt{${lin}}` : `\\sqrt{${lin}} ${plusMinus(m)}`;
  const rhs = c + m;
  return {
    prompt: `Solve $${lhs} = ${rhs}$. ${SOLVE_NOTE}`,
    parts: [solutionsPart([x])],
    hints: [m === 0 ? 'Square both sides to remove the radical.' : 'Isolate the radical first, then square both sides.', 'Check your answer in the original equation.'],
    solution: [
      ...(m === 0 ? [] : [`Isolate the radical: $\\sqrt{${lin}} = ${c}$`]),
      `Square both sides: $${lin} = ${c * c}$`,
      `$${co(a)}x = ${c * c - b}$, so $x = ${x}$.`,
      `Check: $\\sqrt{${subst(a, b, x)}} = \\sqrt{${c * c}} = ${c}$ ✓`,
      finalSolutions([x]),
    ],
  };
}

function eqQuadratic(rng: Rng): GenOutput {
  for (let t = 0; t < 500; t++) {
    const p = rng.pick([1, 1, 2, 3, 4]);
    const b = rng.int(-6, 4);
    const r1 = rng.int(-6, 12);
    const r2 = p - 2 * b - r1;
    const q = b * b - r1 * r2;
    if (r1 === r2 || q === 0 || Math.abs(q) > 60 || r2 < -10 || r2 > 15) continue;
    const valid = [r1, r2].filter((r) => r + b >= 0);
    const wantOne = rng.chance(0.75);
    if (wantOne !== (valid.length === 1)) continue;
    const lin = polyString([
      [p, 'x'],
      [q, ''],
    ]);
    const rhs = polyString([
      [1, 'x'],
      [b, ''],
    ]);
    const display = rng.pick(['plain', 'moved', 'xFirst'] as const);
    let given = `\\sqrt{${lin}} = ${rhs}`;
    let isolate: string[] = [];
    if (display === 'moved' && b !== 0) {
      given = `\\sqrt{${lin}} - x = ${b}`;
      isolate = [`Isolate the radical: $\\sqrt{${lin}} = ${rhs}$`];
    } else if (display === 'xFirst' && b !== 0) {
      given = `x = \\sqrt{${lin}} ${plusMinus(-b)}`;
      isolate = [`Isolate the radical: $\\sqrt{${lin}} = ${rhs}$`];
    } else if (p === 4 && q % 4 === 0 && rng.chance(0.6)) {
      given = `2\\sqrt{${polyString([
        [1, 'x'],
        [q / 4, ''],
      ])}} = ${rhs}`;
      isolate = [`Write $2\\sqrt{${polyString([
        [1, 'x'],
        [q / 4, ''],
      ])}} = \\sqrt{${lin}}$, so $\\sqrt{${lin}} = ${rhs}$.`];
    }
    const B = 2 * b - p;
    const C = b * b - q;
    const quad = polyString([
      [1, 'x^2'],
      [B, 'x'],
      [C, ''],
    ]);
    const sq = polyString([
      [1, 'x^2'],
      [2 * b, 'x'],
      [b * b, ''],
    ]);
    const factor = (r: number) => (r === 0 ? 'x' : `(x ${plusMinus(-r)})`);
    const check = (r: number) => {
      const left = Math.abs(r + b);
      const ok = r + b >= 0;
      return `Check $x = ${r}$: left side $\\sqrt{${subst(p, q, r)}} = \\sqrt{${p * r + q}} = ${left}$; right side $${r} ${plusMinus(b)} = ${r + b}$. ${ok ? '✓' : `✗ — $x = ${r}$ is extraneous.`}`;
    };
    return {
      prompt: `Solve $${given}$. ${SOLVE_NOTE}`,
      parts: [solutionsPart(valid)],
      hints: ['Isolate the radical, square both sides, and solve the quadratic equation.', 'Squaring can create extraneous roots: check every root in the original equation.'],
      solution: [
        ...isolate,
        `Square both sides: $${lin} = ${sq}$`,
        `Collect terms: $${quad} = 0$`,
        `Factor: $${factor(Math.min(r1, r2))}${factor(Math.max(r1, r2))} = 0$, so $x = ${Math.min(r1, r2)}$ or $x = ${Math.max(r1, r2)}$.`,
        check(Math.min(r1, r2)),
        check(Math.max(r1, r2)),
        finalSolutions(valid),
      ],
    };
  }
  throw new Error('eqQuadratic failed');
}

function eqNone(rng: Rng): GenOutput {
  const a = rng.int(2, 5);
  const xc = rng.int(-4, 10);
  const m = rng.int(3, 12);
  const n = rng.int(-4, m - 1);
  const k = n - m; // negative
  const b = k * k - a * xc;
  const lin = polyString([
    [a, 'x'],
    [b, ''],
  ]);
  return {
    prompt: `Solve $\\sqrt{${lin}} + ${m} = ${n}$. ${SOLVE_NOTE}`,
    parts: [solutionsPart([])],
    hints: ['Isolate the radical first. What sign does it have to be?', 'The principal square root $\\sqrt{\\ }$ is never negative. If you square anyway, check the result.'],
    solution: [
      `Isolate the radical: $\\sqrt{${lin}} = ${k}$`,
      `A principal square root is never negative, so no real $x$ works.`,
      `(Squaring anyway gives $${lin} = ${k * k}$, so $x = ${xc}$. Check: $\\sqrt{${subst(a, b, xc)}} = \\sqrt{${k * k}} = ${-k} \\ne ${k}$ ✗ — extraneous.)`,
      finalSolutions([]),
    ],
  };
}

function eqPendulum(rng: Rng): GenOutput {
  for (let t = 0; t < 100; t++) {
    const what = rng.pick([
      { s: 'A playground swing', obj: 'the swing’s chains', lo: 24, hi: 36 },
      { s: 'The pendulum of a grandfather clock', obj: 'the pendulum', lo: 16, hi: 22 },
      { s: 'A wrecking ball hanging from a construction crane', obj: 'the cable', lo: 50, hi: 80 },
      { s: 'A rope swing over a mountain creek', obj: 'the rope', lo: 35, hi: 50 },
    ]);
    const T = rng.int(what.lo, what.hi) / 10;
    const L = 9.8 * (T / (2 * Math.PI)) ** 2;
    if (!clearOfBoundary(L, 2)) continue;
    return {
      prompt: `The period $T$, in seconds, of a pendulum of length $L$ metres is modelled by $T = 2\\pi\\sqrt{\\dfrac{L}{9.8}}$. ${what.s} has a period of $${fmt(T)}$ s. Determine the length of ${what.obj}, to the nearest hundredth of a metre.`,
      parts: [numPart(L, { decimals: 2, suffix: 'm' })],
      hints: ['Isolate the radical: divide both sides by $2\\pi$.', 'Square both sides, then multiply by $9.8$.'],
      solution: [
        `$${fmt(T)} = 2\\pi\\sqrt{\\dfrac{L}{9.8}}$`,
        `Divide by $2\\pi$: $\\sqrt{\\dfrac{L}{9.8}} = \\dfrac{${fmt(T)}}{2\\pi}$`,
        `Square both sides: $\\dfrac{L}{9.8} = \\left(\\dfrac{${fmt(T)}}{2\\pi}\\right)^2$`,
        `$L = 9.8\\left(\\dfrac{${fmt(T)}}{2\\pi}\\right)^2 \\approx ${fmt(L, 4)}$`,
        `The length is about $${fmtFixed(L, 2)}$ m.`,
      ],
      calculator: true,
    };
  }
  throw new Error('eqPendulum failed');
}

function eqSkid(rng: Rng): GenOutput {
  for (let t = 0; t < 100; t++) {
    const s = rng.pick([50, 60, 70, 80, 90, 100, 110]) + rng.pick([0, 0, 5]);
    const f = rng.pick([0.4, 0.5, 0.6, 0.7, 0.8]);
    const d = (s * s) / (254 * f);
    if (!clearOfBoundary(d, 1)) continue;
    const place = rng.pick(['near a northern town', 'on a divided highway', 'at a city intersection', 'on a rural road', 'on a mountain highway']);
    const name = rng.pick(['Constable Okafor', 'Constable Tremblay', 'An investigator, Priya,', 'Sergeant Whitehorse']);
    return {
      prompt: `Collision investigators use the model $s = \\sqrt{254fd}$, where $s$ is a car's speed in km/h when it starts to skid, $d$ is the length of the skid marks in metres and $f$ is the drag factor of the road. ${name} is reconstructing a collision ${place} on a road with $f = ${f}$. The driver says they were travelling at $${s}$ km/h. How long would the skid marks be at that speed? Answer to the nearest tenth of a metre.`,
      parts: [numPart(d, { decimals: 1, suffix: 'm' })],
      hints: ['Substitute $s$ and $f$, then square both sides to remove the radical.', 'Solve the linear equation for $d$.'],
      solution: [
        `$${s} = \\sqrt{254(${f})d} = \\sqrt{${fmt(254 * f)}d}$`,
        `Square both sides: $${s * s} = ${fmt(254 * f)}d$`,
        `$d = \\dfrac{${s * s}}{${fmt(254 * f)}} \\approx ${fmt(d, 3)}$`,
        `The skid marks would be about $${fmtFixed(d, 1)}$ m long.`,
      ],
      calculator: true,
    };
  }
  throw new Error('eqSkid failed');
}

function eqTwice(rng: Rng): GenOutput {
  const c = rng.int(1, 3);
  const none = c > 1 && rng.chance(0.3);
  const tRoot = rng.int(1, 6);
  const a = none ? rng.int(1, c * c - 1) : c * c + 2 * c * tRoot;
  const form = rng.pick(['sum', 'diff'] as const);
  const given = form === 'sum' ? `\\sqrt{x + ${a}} = \\sqrt{x} + ${c}` : `\\sqrt{x + ${a}} - \\sqrt{x} = ${c}`;
  const k = frac(a - c * c, 2 * c);
  const values = none ? [] : [tRoot * tRoot];
  return {
    prompt: `Solve $${given}$. ${SOLVE_NOTE}`,
    parts: [solutionsPart(values)],
    hints: ['Isolate one radical, then square both sides. A radical will remain — isolate it and square again.', '$\\left(\\sqrt{x} + c\\right)^2 = x + 2c\\sqrt{x} + c^2$. Check your answer at the end.'],
    solution: [
      ...(form === 'diff' ? [`Isolate one radical: $\\sqrt{x + ${a}} = \\sqrt{x} + ${c}$`] : []),
      `Square both sides: $x + ${a} = x + ${2 * c}\\sqrt{x} + ${c * c}$`,
      `Simplify: $${a - c * c} = ${2 * c}\\sqrt{x}$, so $\\sqrt{x} = ${fracLatex(k)}$`,
      ...(none
        ? ['A principal square root cannot be negative, so no value of $x$ works (squaring again would give an extraneous root).']
        : [`Square again: $x = ${tRoot * tRoot}$`, `Check: $\\sqrt{${tRoot * tRoot} + ${a}} = \\sqrt{${tRoot * tRoot + a}} = ${tRoot + c}$ and $\\sqrt{${tRoot * tRoot}} + ${c} = ${tRoot + c}$ ✓`]),
      finalSolutions(values),
    ],
  };
}

const equation = skill({
  id: 'm201-radical-equation',
  name: 'Solving radical equations',
  description: 'Solve radical equations with square roots, identify extraneous roots, and solve problems modelled by radical equations.',
  outcomes: ['AN3'],
  lessonId: 'm201-5-3',
  gen(rng, d) {
    if (d === 1) return eqBasic(rng);
    if (d === 2) return rng.chance(0.8) ? eqQuadratic(rng) : eqNone(rng);
    const kind = rng.weighted([
      ['pendulum', 0.3],
      ['skid', 0.3],
      ['twice', 0.4],
    ] as const);
    return kind === 'pendulum' ? eqPendulum(rng) : kind === 'skid' ? eqSkid(rng) : eqTwice(rng);
  },
});

export const RADICAL_SKILLS: SkillDef[] = [simplify, compare, add, multiply, rationalize, restrictions, equation];
