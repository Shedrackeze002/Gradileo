/**
 * Math 30-2 Unit 4 — Rational Expressions and Equations (RF1, RF2, RF3).
 * Alberta limits this unit to numerators and denominators that are monomials and binomials, so every
 * expression a question shows has at most two terms above and below each fraction bar.
 */
import { fixedChoice, mc, niceNum, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, gcd, isPerfectSquare, lcm, toFrac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Polynomials in one variable, as ascending coefficient lists [c0, c1, c2, ...]
// ---------------------------------------------------------------------------

type P = number[];

function trimP(p: P): P {
  const q = p.slice();
  while (q.length > 1 && q[q.length - 1] === 0) q.pop();
  return q;
}
function pmul(a: P, b: P): P {
  const out = new Array<number>(a.length + b.length - 1).fill(0);
  a.forEach((x, i) => b.forEach((y, j) => (out[i + j] += x * y)));
  return trimP(out);
}
function padd(a: P, b: P, s = 1): P {
  return trimP(Array.from({ length: Math.max(a.length, b.length) }, (_, i) => (a[i] ?? 0) + s * (b[i] ?? 0)));
}
const pscale = (p: P, k: number): P => trimP(p.map((c) => c * k + 0));
const peval = (p: P, x: number) => p.reduce((s, c, i) => s + c * x ** i, 0);
const pprod = (ps: P[]): P => ps.reduce(pmul, [1]);
const isZeroP = (p: P) => p.every((c) => c === 0);
const contentP = (p: P) => p.reduce((g, c) => gcd(g, c), 0);
const nTerms = (p: P) => p.filter((c) => c !== 0).length;
const leadP = (p: P) => trimP(p)[trimP(p).length - 1];

/** LaTeX for a polynomial, highest power first (lowest first with `asc`, as in 10 − 2x). */
function ptex(p: P, v = 'x', asc = false): string {
  const idx = p.map((_, i) => i).filter((i) => p[i] !== 0);
  if (!asc) idx.reverse();
  if (!idx.length) return '0';
  let out = '';
  for (const i of idx) {
    const c = p[i];
    const abs = Math.abs(c);
    const body = i === 0 ? '' : i === 1 ? v : `${v}^{${i}}`;
    const coef = body && abs === 1 ? '' : fmt(abs);
    out += out === '' ? `${c < 0 ? '-' : ''}${coef}${body}` : ` ${c < 0 ? '-' : '+'} ${coef}${body}`;
  }
  return out;
}
const ptxt = (p: P, v = 'x') => ptex(p, v).replace(/\^\{(\d+)\}/g, '^$1');

// ---------------------------------------------------------------------------
// Linear factors ax + b (a > 0, gcd(a, b) = 1) and factored rational expressions
// ---------------------------------------------------------------------------

interface F {
  a: number;
  b: number;
}
const X: F = { a: 1, b: 0 };
/** The factor x − r. */
const xm = (r: number): F => ({ a: 1, b: -r });
const fRoot = (f: F) => -f.b / f.a + 0;
const fP = (f: F): P => [f.b, f.a];
const fKey = (f: F) => `${f.a}|${f.b}`;
const fEval = (f: F, x: number) => f.a * x + f.b;
const xs = (n: number): F[] => Array<F>(n).fill(X);

function groupFactors(fs: F[]): Array<{ f: F; n: number }> {
  const groups: Array<{ f: F; n: number }> = [];
  for (const f of fs) {
    const g = groups.find((q) => fKey(q.f) === fKey(f));
    if (g) g.n++;
    else groups.push({ f, n: 1 });
  }
  // A monomial factor (x) is written first, then binomials from the largest root down: 3x(x − 2)(x + 2).
  return groups.sort((p, q) => (p.f.b === 0 ? 0 : 1) - (q.f.b === 0 ? 0 : 1) || fRoot(q.f) - fRoot(p.f));
}

function uniqF(fs: F[]): F[] {
  const out: F[] = [];
  for (const f of fs) if (!out.some((g) => fKey(g) === fKey(f))) out.push(f);
  return out;
}

/** c(f1)(f2)… in LaTeX (or typed text). A single factor with c = 1 needs no brackets. */
function prodTex(c: number, fs: F[], v: string, text = false): string {
  const groups = groupFactors(fs);
  if (!groups.length) return `${c}`;
  const pow = (n: number) => (n > 1 ? (text ? `^${n}` : `^{${n}}`) : '');
  const poly = (p: P) => (text ? ptxt(p, v) : ptex(p, v));
  const lone = groups.length === 1 && groups[0].n === 1 && c === 1;
  let s = c === 1 ? '' : c === -1 ? '-' : `${c}`;
  for (const g of groups) {
    if (g.f.b === 0) s += `${v}${pow(g.n)}`;
    else s += lone ? poly(fP(g.f)) : `(${poly(fP(g.f))})${pow(g.n)}`;
  }
  return s;
}

/** A rational expression (n/d)·Π num / Π den with integer constants. */
interface RE {
  n: number;
  d: number;
  num: F[];
  den: F[];
}

function reduceRE(r: RE): RE {
  const num = r.num.slice();
  const den: F[] = [];
  for (const f of r.den) {
    const i = num.findIndex((g) => fKey(g) === fKey(f));
    if (i >= 0) num.splice(i, 1);
    else den.push(f);
  }
  const g = gcd(r.n, r.d) || 1;
  const s = r.d < 0 ? -1 : 1;
  return { n: (s * r.n) / g, d: (s * r.d) / g, num, den };
}
const flipRE = (r: RE): RE => ({ n: Math.sign(r.n) * r.d, d: Math.abs(r.n), num: r.den, den: r.num });
const negRE = (r: RE): RE => ({ ...r, n: -r.n });
const negRootsRE = (r: RE): RE => ({ ...r, num: r.num.map((f) => ({ a: f.a, b: -f.b })), den: r.den.map((f) => ({ a: f.a, b: -f.b })) });
const mulRE = (p: RE, q: RE): RE => ({ n: p.n * q.n, d: p.d * q.d, num: [...p.num, ...q.num], den: [...p.den, ...q.den] });
const reEval = (r: RE, x: number) => (r.n * r.num.reduce((s, f) => s * fEval(f, x), 1)) / (r.d * r.den.reduce((s, f) => s * fEval(f, x), 1));
/** The denominator is more than 1, so a numerator-and-denominator answer makes sense. */
const hasDen = (r: RE) => r.d > 1 || r.den.length > 0;

function reTex(r: RE, v: string): string {
  const neg = r.n < 0;
  const N = prodTex(Math.abs(r.n), r.num, v);
  if (r.d === 1 && !r.den.length) {
    if (!neg) return N;
    return Math.abs(r.n) === 1 && r.num.length === 1 && r.num[0].b !== 0 ? `-(${N})` : `-${N}`;
  }
  return `${neg ? '-' : ''}\\dfrac{${N}}{${prodTex(r.d, r.den, v)}}`;
}

/** Unique sorted roots of the factors (the non-permissible values when they are denominators). */
function rootsOf(fs: F[]): number[] {
  const out: number[] = [];
  for (const f of fs) {
    const r = fRoot(f);
    if (!out.some((q) => Math.abs(q - r) < 1e-9)) out.push(r);
  }
  return out.sort((p, q) => p - q);
}

const SAMPLE_X = [-3.7, -1.3, 0.45, 2.2, 4.9, 6.35];
/** True when two functions agree wherever both are defined (an equivalent distractor is useless). */
function sameFn(f: (x: number) => number, g: (x: number) => number): boolean {
  let checked = 0;
  for (const x of SAMPLE_X) {
    const a = f(x);
    const b = g(x);
    if (!Number.isFinite(a) || !Number.isFinite(b)) continue;
    if (Math.abs(a - b) > 1e-9 * Math.max(1, Math.abs(a))) return false;
    checked++;
  }
  return checked >= 3;
}

type Option = { tex: string; f: (x: number) => number };
const opt = (r: RE, v: string): Option => ({ tex: reTex(r, v), f: (x) => reEval(r, x) });

/** Multiple choice of simplified forms: drops distractors equivalent to the answer or to each other. */
function formChoice(rng: Rng, correct: Option, options: Option[]): AnswerSpec {
  const keep: Option[] = [];
  for (const o of options) {
    if (sameFn(o.f, correct.f)) continue;
    if (keep.some((k) => k.tex === o.tex || sameFn(k.f, o.f)) || o.tex === correct.tex) continue;
    keep.push(o);
  }
  return mc(rng, `$${correct.tex}$`, keep.map((o) => `$${o.tex}$`));
}

function npvTex(vals: number[], v: string): string {
  return vals.length ? `$${v} \\ne ${vals.map(niceNum).join(',\\ ')}$` : 'there are no non-permissible values';
}

/** "Set each factor equal to zero: x = 0; x − 3 = 0 gives x = 3." */
function zeroText(fs: F[], v: string): string {
  const u = uniqF(fs).sort((p, q) => fRoot(p) - fRoot(q));
  if (!u.length) return 'The denominator is a non-zero constant, so it is never zero.';
  const each = u.map((f) => (f.b === 0 ? `$${v} = 0$` : `$${ptex(fP(f), v)} = 0$ gives $${v} = ${niceNum(fRoot(f))}$`));
  return u.length === 1 ? `Set the factor equal to zero: ${each[0]}.` : `Set each factor equal to zero: ${each.join('; ')}.`;
}

const VARS = ['x', 'x', 'x', 'x', 'a', 't', 'm', 'n'];
const pickVar = (rng: Rng) => rng.pick(VARS);
const npvPart = (vals: number[]): Part => part({ kind: 'numbers', values: vals }, { label: 'Non-permissible values', placeholder: 'e.g. 3, -2' });
const numDenParts = (r: RE, v: string): Part[] => [
  part({ kind: 'expression', expected: prodTex(r.n, r.num, v, true) }, { label: 'Numerator' }),
  part({ kind: 'expression', expected: prodTex(r.d, r.den, v, true) }, { label: 'Denominator' }),
];

/** Distinct non-zero integers. */
function distinctInts(rng: Rng, n: number, lo: number, hi: number, exclude: number[] = []): number[] {
  const pool: number[] = [];
  for (let i = lo; i <= hi; i++) if (i !== 0 && !exclude.includes(i)) pool.push(i);
  return rng.sample(pool, n);
}

// ---------------------------------------------------------------------------
// Numerators and denominators: c·(factors), always a monomial or a binomial when expanded
// ---------------------------------------------------------------------------

interface Slot {
  c: number;
  fs: F[];
}
const slotP = (s: Slot): P => pscale(pprod(s.fs.map(fP)), s.c);
const slotTex = (s: Slot, v: string) => ptex(slotP(s), v);
const slotFac = (s: Slot, v: string) => prodTex(s.c, s.fs, v);
const smallSlot = (s: Slot) => nTerms(slotP(s)) <= 2;
/** A binomial that is not already written as a single factor, such as 3x + 6 or x² − 9. */
const needsFactor = (s: Slot) => nTerms(slotP(s)) === 2 && !(s.c === 1 && s.fs.length === 1);
const isDosPair = (f: F, g: F) => f.a === g.a && f.b === -g.b && f.b !== 0;

/** "3x + 6 = 3(x + 2) (common factor 3)" */
function factorWhy(s: Slot, v: string): string {
  const nx = s.fs.filter((f) => f.b === 0).length;
  const bins = s.fs.filter((f) => f.b !== 0);
  const gcf = `${s.c > 1 ? s.c : ''}${nx ? (nx === 1 ? v : `${v}^{${nx}}`) : ''}`;
  const dos = bins.length === 2 && isDosPair(bins[0], bins[1]);
  const why = dos ? (gcf ? `common factor $${gcf}$, then a difference of squares` : 'a difference of squares') : `common factor $${gcf}$`;
  return `$${slotTex(s, v)} = ${slotFac(s, v)}$ (${why})`;
}

/** The factors (with repeats) that appear in both lists. */
function commonFactors(a: F[], b: F[]): F[] {
  const rest = b.slice();
  const out: F[] = [];
  for (const f of a) {
    const i = rest.findIndex((g) => fKey(g) === fKey(f));
    if (i >= 0) {
      out.push(f);
      rest.splice(i, 1);
    }
  }
  return out;
}

/** "the common factors x and (x − 3)" */
function factorList(fs: F[], v: string): string {
  const parts = groupFactors(fs).map((g) => (g.f.b === 0 ? `$${v}${g.n > 1 ? `^{${g.n}}` : ''}$` : `$(${ptex(fP(g.f), v)})$${g.n > 1 ? ` (twice)` : ''}`));
  return parts.length === 1 ? parts[0] : `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`;
}

/** Steps for simplifying num/den: factor, state the restrictions, divide out common factors. */
function simplifySteps(num: Slot, den: Slot, v: string) {
  const orig: RE = { n: num.c, d: den.c, num: num.fs, den: den.fs };
  const result = reduceRE(orig);
  const vals = rootsOf(den.fs);
  const steps: string[] = [];
  const fN = needsFactor(num);
  const fD = needsFactor(den);
  const given = `\\dfrac{${slotTex(num, v)}}{${slotTex(den, v)}}`;
  const factored = `\\dfrac{${slotFac(num, v)}}{${slotFac(den, v)}}`;
  if (fN || fD) {
    const why = [fN ? factorWhy(num, v) : '', fD ? factorWhy(den, v) : ''].filter(Boolean).join(' and ');
    steps.push(`Factor ${fN && fD ? 'the numerator and the denominator' : fN ? 'the numerator' : 'the denominator'}: ${why}. So $${given} = ${factored}$.`);
  }
  steps.push(`Find the non-permissible values from the original denominator, $${slotFac(den, v)}$. ${zeroText(den.fs, v)} So ${npvTex(vals, v)}.`);
  const common = commonFactors(num.fs, den.fs);
  const g = gcd(num.c, den.c);
  const pieces: string[] = [];
  if (common.length) pieces.push(`the common factor${common.length > 1 ? 's' : ''} ${factorList(common, v)}`);
  if (g > 1) pieces.push(`the common factor $${g}$ of the constants`);
  steps.push(`Divide out ${pieces.join(' and ')}: $${factored} = ${reTex(result, v)}$.`);
  steps.push(`Simplified: $${reTex(result, v)}$, ${npvTex(vals, v)}.`);
  return { result, vals, steps, given };
}

// ---------------------------------------------------------------------------
// 4.1 — Non-permissible values and simplifying
// ---------------------------------------------------------------------------

/** A numerator that does not matter for the restrictions: a constant or a binomial. */
function randomNumerator(rng: Rng, v: string): string {
  const k = rng.int(0, 2);
  if (k === 0) return `${rng.nonZero(-9, 9)}`;
  if (k === 1) return ptex([rng.nonZero(-9, 9), 1], v);
  return ptex([0, rng.int(2, 9)], v);
}

function npvFinal(vals: number[], v: string): string {
  if (!vals.length) return 'There are no non-permissible values: the expression is defined for every real number.';
  return vals.length === 1 ? `The non-permissible value is $${niceNum(vals[0])}$, so ${npvTex(vals, v)}.` : `The non-permissible values are ${vals.map((x) => `$${niceNum(x)}$`).join(vals.length > 2 ? ', ' : ' and ')}, so ${npvTex(vals, v)}.`;
}

/** d1: a linear, monomial or factored denominator. */
function npvSimple(rng: Rng, v: string): GenOutput {
  const numer = randomNumerator(rng, v);
  const kind = rng.pick(['linear', 'linear', 'monomial', 'factored'] as const);
  let den = '';
  let fs: F[] = [];
  const steps: string[] = [];
  if (kind === 'linear') {
    const a = rng.pick([1, 1, 2, 3, 4, 5]);
    let b = rng.nonZero(-9, 9);
    if (a > 1 && rng.chance(0.5)) b = a * rng.nonZero(-5, 5);
    const c = gcd(a, b);
    fs = [{ a: a / c, b: b / c }];
    den = ptex([b, a], v);
    steps.push(`The expression is undefined when its denominator is $0$, so solve $${den} = 0$.`);
    steps.push(a === 1 ? `$${v} = ${-b}$` : `$${a}${v} = ${-b}$, so $${v} = ${niceNum(-b / a)}$.`);
  } else if (kind === 'monomial') {
    const c = rng.int(2, 9);
    const m = rng.int(1, 3);
    fs = xs(m);
    den = `${c}${v}${m > 1 ? `^{${m}}` : ''}`;
    steps.push(`The expression is undefined when its denominator is $0$: solve $${den} = 0$.`);
    steps.push(`A product is $0$ only when a factor is $0$, and $${c} \\ne 0$, so $${v} = 0$.`);
  } else {
    const c = rng.pick([1, 1, 2, 3]);
    fs = rng.chance(0.4) ? [X, xm(rng.nonZero(-9, 9))] : distinctInts(rng, 2, -9, 9).map(xm);
    den = prodTex(c, fs, v);
    steps.push(`The expression is undefined when the denominator $${den}$ is $0$. A product is $0$ when any factor is $0$.`);
    steps.push(zeroText(fs, v));
  }
  const vals = rootsOf(fs);
  steps.push(npvFinal(vals, v));
  return {
    prompt: `Find the non-permissible value${vals.length > 1 ? 's' : ''} of $${v}$ for $\\dfrac{${numer}}{${den}}$.${vals.length > 1 ? ' Enter them separated by commas.' : ''}`,
    parts: [npvPart(vals)],
    hints: ['A rational expression is undefined when its denominator equals zero. The numerator does not matter.', 'Set the denominator (or each of its factors) equal to zero and solve.'],
    solution: steps,
    answerDisplay: npvTex(vals, v),
  };
}

/** d2: a binomial denominator that must be factored first (or that is never zero). */
function npvBinomial(rng: Rng, v: string): GenOutput {
  const numer = randomNumerator(rng, v);
  const kind = rng.pick(['dos', 'dosNonMonic', 'gcf', 'gcf', 'cubic', 'none'] as const);
  let slot: Slot = { c: 1, fs: [] };
  if (kind === 'dos') {
    const s = rng.int(1, 10);
    slot = { c: rng.pick([1, 1, 1, 2, 3]), fs: [xm(s), xm(-s)] };
  } else if (kind === 'dosNonMonic') {
    const k = rng.int(2, 5);
    let s = rng.int(1, 9);
    while (gcd(k, s) !== 1) s = rng.int(1, 9);
    slot = { c: 1, fs: [{ a: k, b: -s }, { a: k, b: s }] };
  } else if (kind === 'gcf') {
    const k = rng.int(1, 6);
    let m = rng.nonZero(-12, 12);
    if (k === 1 && Math.abs(m) === 1) m *= 3;
    const c = gcd(k, m);
    slot = { c, fs: [X, { a: k / c, b: m / c }] };
  } else if (kind === 'cubic') {
    const s = rng.int(1, 6);
    slot = { c: 1, fs: [X, xm(s), xm(-s)] };
  }
  const steps: string[] = [];
  let den = '';
  let vals: number[] = [];
  if (kind === 'none') {
    const s = rng.int(1, 9);
    const c = rng.pick([1, 1, 2, 3]);
    den = ptex([c * s * s, 0, c], v);
    steps.push(`Set the denominator equal to zero: $${den} = 0$ means $${v}^2 = -${s * s}$.`);
    steps.push(`A square is never negative, so $${den}$ is at least $${c * s * s}$ for every real $${v}$: the denominator is never $0$.`);
  } else {
    den = slotTex(slot, v);
    vals = rootsOf(slot.fs);
    steps.push(`Set the denominator equal to zero and factor it: ${factorWhy(slot, v)}.`);
    steps.push(zeroText(slot.fs, v));
  }
  steps.push(npvFinal(vals, v));
  return {
    prompt: `Find the non-permissible values of $${v}$ for $\\dfrac{${numer}}{${den}}$. Enter them separated by commas, or type *none* if there are none.`,
    parts: [npvPart(vals)],
    hints: ['Only the denominator matters. Factor it completely: look for a common factor first, then a difference of squares.', 'Set each factor equal to zero. A sum of squares such as $x^2 + 4$ is never zero.'],
    solution: steps,
    answerDisplay: vals.length ? npvTex(vals, v) : 'none',
  };
}

/** A monomial written as LaTeX or typed text: 3a, 4b^2, x^3y. */
function monoStr(c: number, vars: Array<[string, number]>, text = false): string {
  const body = vars
    .filter(([w, e]) => w && e > 0)
    .map(([w, e]) => (e === 1 ? w : text ? `${w}^${e}` : `${w}^{${e}}`))
    .join('');
  return c === 1 && body ? body : `${c}${body}`;
}

/** d1: a monomial over a monomial, in one or two variables. */
function monomialSimplify(rng: Rng): GenOutput {
  const two = rng.chance(0.4);
  const [v, w] = two ? rng.pick([['x', 'y'], ['a', 'b'], ['m', 'n'], ['p', 'q']] as const) : [pickVar(rng), ''];
  let g = 2;
  let a1 = 1;
  let b1 = 2;
  let m = 1;
  let n = 2;
  let p = 0;
  let q = 0;
  for (let t = 0; t < 200; t++) {
    g = rng.int(2, 6);
    a1 = rng.int(1, 9);
    b1 = rng.int(1, 9);
    [m, n] = rng.sample([1, 2, 3, 4, 5], 2);
    [p, q] = two ? [rng.int(0, 3), rng.int(1, 4)] : [0, 0];
    if (a1 === b1 || gcd(a1, b1) !== 1) continue;
    if (b1 > 1 || n > m || q > p) break;
  }
  const top = monoStr(g * a1, [[v, m], [w, p]]);
  const bot = monoStr(g * b1, [[v, n], [w, q]]);
  const numV: Array<[string, number]> = [[v, Math.max(m - n, 0)], [w, Math.max(p - q, 0)]];
  const denV: Array<[string, number]> = [[v, Math.max(n - m, 0)], [w, Math.max(q - p, 0)]];
  const resNum = monoStr(a1, numV);
  const resDen = monoStr(b1, denV);
  const result = resDen === '1' ? resNum : `\\dfrac{${resNum}}{${resDen}}`;
  const pw = (x: string, e: number) => (e === 0 ? '1' : e === 1 ? x : `${x}^{${e}}`);
  const quot = (x: string, e1: number, e2: number) => `\\dfrac{${pw(x, e1)}}{${pw(x, e2)}} = ${e1 === e2 ? '1' : e1 > e2 ? pw(x, e1 - e2) : `\\dfrac{1}{${pw(x, e2 - e1)}}`}`;
  const steps = [
    two ? `The denominator is $0$ when $${v} = 0$ or $${w} = 0$, so $${v} \\ne 0$ and $${w} \\ne 0$.` : `The denominator $${bot}$ is $0$ only when $${v} = 0$, so $${v} \\ne 0$.`,
    `Divide the coefficients by their greatest common factor, $${g}$: $\\dfrac{${g * a1}}{${g * b1}} = ${b1 === 1 ? a1 : `\\dfrac{${a1}}{${b1}}`}$.`,
    `Divide powers with the same base by subtracting exponents: $${quot(v, m, n)}$${two ? ` and $${quot(w, p, q)}$` : ''}.`,
    `Simplified: $${result}$${two ? '' : `, $${v} \\ne 0$`}.`,
  ];
  const parts: Part[] = [
    part({ kind: 'expression', expected: monoStr(a1, numV, true) }, { label: 'Numerator' }),
    part({ kind: 'expression', expected: monoStr(b1, denV, true) }, { label: 'Denominator' }),
  ];
  if (!two) parts.push(npvPart([0]));
  return {
    prompt: two
      ? `Simplify $\\dfrac{${top}}{${bot}}$, where $${v} \\ne 0$ and $${w} \\ne 0$. Enter the numerator and the denominator of the simplified expression.`
      : `Simplify $\\dfrac{${top}}{${bot}}$. Enter the numerator and the denominator of the simplified expression, then the non-permissible value.`,
    parts,
    hints: ['Simplify the coefficients like a fraction, then deal with each variable separately.', 'Subtract exponents: the variable stays in the numerator if its exponent is larger on top, and in the denominator if it is larger below.'],
    solution: steps,
    answerDisplay: `$${result}$${two ? '' : `, $${v} \\ne 0$`}`,
  };
}

/** Numerator and denominator slots that share a binomial factor. */
function factorPair(rng: Rng, kind: 'common' | 'dos' | 'two'): { num: Slot; den: Slot } {
  for (let t = 0; t < 600; t++) {
    const s = rng.int(1, 9);
    const r = rng.nonZero(-9, 9);
    const c1 = rng.int(1, 6);
    const c2 = rng.int(1, 6);
    let num: Slot;
    let den: Slot;
    if (kind === 'common') {
      const f = xm(r);
      const tm = rng.int(0, 3);
      if (tm === 0) [num, den] = [{ c: c1, fs: [f] }, { c: c2, fs: [X, f] }];
      else if (tm === 1) [num, den] = [{ c: c1, fs: [X, f] }, { c: c2, fs: [f] }];
      else if (tm === 2) [num, den] = [{ c: c1, fs: [f] }, { c: c2, fs: [f] }];
      else [num, den] = [{ c: c1, fs: [X, X, f] }, { c: c2, fs: [X, f] }];
    } else if (kind === 'dos') {
      const pair = [xm(s), xm(-s)];
      const one = xm(rng.pick([s, -s]));
      const tm = rng.int(0, 3);
      if (tm === 0) [num, den] = [{ c: 1, fs: pair }, { c: c2, fs: [one] }];
      else if (tm === 1) [num, den] = [{ c: 1, fs: pair }, { c: 1, fs: [X, one] }];
      else if (tm === 2) [num, den] = [{ c: c1, fs: [one] }, { c: 1, fs: pair }];
      else [num, den] = [{ c: 1, fs: [X, one] }, { c: 1, fs: pair }];
    } else {
      // A difference of squares with a common factor (or a non-monic one) against another binomial.
      let pair = [xm(s), xm(-s)];
      if (rng.chance(0.3)) {
        const k = rng.int(2, 3);
        let q = rng.int(1, 7);
        while (gcd(k, q) !== 1) q = rng.int(1, 7);
        pair = [{ a: k, b: -q }, { a: k, b: q }];
      }
      const one = rng.pick(pair);
      const tm = rng.int(0, 2);
      const big: Slot = pair[0].a > 1 && rng.chance(0.6) ? { c: 1, fs: pair } : tm === 0 ? { c: rng.int(2, 5), fs: pair } : { c: rng.pick([1, 1, 2]), fs: [X, ...pair] };
      const small: Slot = rng.chance(0.5) ? { c: rng.int(2, 6), fs: [one] } : { c: rng.int(1, 4), fs: [X, one] };
      [num, den] = rng.chance(0.5) ? [big, small] : [small, big];
    }
    if (!smallSlot(num) || !smallSlot(den)) continue;
    if (!commonFactors(num.fs, den.fs).some((f) => f.b !== 0)) continue;
    if (kind === 'two' ? !(needsFactor(num) && needsFactor(den)) : !(needsFactor(num) || needsFactor(den))) continue;
    const res = reduceRE({ n: num.c, d: den.c, num: num.fs, den: den.fs });
    if (!hasDen(res) || res.n <= 0) continue;
    return { num, den };
  }
  return { num: { c: 3, fs: [xm(-2)] }, den: { c: 1, fs: [X, xm(-2)] } };
}

function factorSimplify(rng: Rng, kind: 'common' | 'dos' | 'two'): GenOutput {
  const v = pickVar(rng);
  const { num, den } = factorPair(rng, kind);
  const { result, vals, steps, given } = simplifySteps(num, den, v);
  return {
    prompt: `Simplify $${given}$ and state the non-permissible values. Enter the numerator and the denominator of the simplified expression (factored or expanded), then the non-permissible values.`,
    parts: [...numDenParts(result, v), npvPart(vals)],
    hints: [
      kind === 'common' ? 'Factor out the greatest common factor of each binomial.' : 'Look for a common factor first, then a difference of squares: $a^2 - b^2 = (a - b)(a + b)$.',
      'State the non-permissible values from the factored original denominator, then divide out factors that appear in both the numerator and the denominator.',
    ],
    solution: steps,
    answerDisplay: `$${reTex(result, v)}$, ${npvTex(vals, v)}`,
  };
}

/** d2: find the missing numerator of an equivalent expression with a larger denominator. */
function equivalentForm(rng: Rng): GenOutput {
  const v = pickVar(rng);
  const kind = rng.pick(['constDos', 'xDos', 'mono', 'monoX'] as const);
  const r = rng.int(1, 9);
  const a = rng.int(2, 9);
  let orig: { num: Slot; den: Slot };
  let mult: F;
  if (kind === 'constDos') {
    const sgn = rng.sign();
    orig = { num: { c: a, fs: [] }, den: { c: 1, fs: [xm(sgn * r)] } };
    mult = xm(-sgn * r);
  } else if (kind === 'xDos') {
    const sgn = rng.sign();
    orig = { num: { c: 1, fs: [X] }, den: { c: 1, fs: [xm(sgn * r)] } };
    mult = xm(-sgn * r);
  } else if (kind === 'mono') {
    let b = rng.int(2, 6);
    while (gcd(a, b) !== 1) b = rng.int(2, 6);
    orig = { num: { c: a, fs: [] }, den: { c: b, fs: [X] } };
    mult = xm(rng.nonZero(-9, 9));
  } else {
    orig = { num: { c: a, fs: [] }, den: { c: 1, fs: [xm(rng.nonZero(-9, 9))] } };
    mult = X;
  }
  const newDen: Slot = { c: orig.den.c, fs: [...orig.den.fs, mult] };
  const newNum: Slot = { c: orig.num.c, fs: [...orig.num.fs, mult] };
  const vals = rootsOf(newDen.fs);
  const oldVals = rootsOf(orig.den.fs);
  const multTex = mult.b === 0 ? v : `(${ptex(fP(mult), v)})`;
  const newNumTex = slotTex(newNum, v);
  const extra = vals.filter((x) => !oldVals.includes(x));
  return {
    prompt: `Find the missing numerator that makes the expressions equivalent, then state the non-permissible values of the new expression.\n\n$$\\dfrac{${slotTex(orig.num, v)}}{${slotTex(orig.den, v)}} = \\dfrac{?}{${slotTex(newDen, v)}}$$`,
    parts: [part({ kind: 'expression', expected: ptxt(slotP(newNum), v) }, { label: 'Missing numerator' }), npvPart(vals)],
    hints: ['Factor the new denominator. What was the old denominator multiplied by?', 'Multiply the numerator by the same factor. The new expression is undefined wherever its denominator is zero.'],
    solution: [
      `Factor the new denominator: ${factorWhy(newDen, v)}.`,
      `The old denominator $${slotTex(orig.den, v)}$ was multiplied by $${multTex}$. Multiply the numerator by the same factor: $${slotFac(newNum, v)} = ${newNumTex}$.`,
      `The new denominator $${slotFac(newDen, v)}$ is zero when ${vals.map((x) => `$${v} = ${niceNum(x)}$`).join(' or ')}, so ${npvTex(vals, v)}.`,
      `The two expressions are equal only for permissible values: the original is defined at $${v} = ${niceNum(extra[0])}$, but the new expression is not.`,
      `Missing numerator: $${newNumTex}$; ${npvTex(vals, v)}.`,
    ],
    answerDisplay: `$${newNumTex}$; ${npvTex(vals, v)}`,
  };
}

/** d3: a numerator that is the opposite of a denominator factor, such as 10 − 2x and x − 5. */
function oppositeSimplify(rng: Rng): GenOutput {
  const v = pickVar(rng);
  const s = rng.int(1, 9);
  const k = rng.int(1, 6);
  const kind = rng.pick(['dos', 'gcf', 'x'] as const);
  const den: Slot = kind === 'dos' ? { c: 1, fs: [xm(s), xm(-s)] } : kind === 'gcf' ? { c: rng.intExcept(2, 6, [k]), fs: [xm(s)] } : { c: 1, fs: [X, xm(s)] };
  const orig: RE = { n: -k, d: den.c, num: [xm(s)], den: den.fs };
  const correct = reduceRE(orig);
  const vals = rootsOf(den.fs);
  const numShown = ptex([k * s, -k], v, true);
  const given = `\\dfrac{${numShown}}{${slotTex(den, v)}}`;
  const negK = k === 1 ? '-' : `-${k}`;
  const negKWord = k === 1 ? '-1' : `-${k}`;
  const options = [opt(negRE(correct), v), opt(flipRE(correct), v), opt(negRootsRE(correct), v), opt(negRE(negRootsRE(correct)), v), opt(flipRE(negRE(correct)), v)];
  return {
    prompt: `Simplify $${given}$ and state the non-permissible values.`,
    parts: [part(formChoice(rng, opt(correct, v), options), { label: 'Simplified form' }), npvPart(vals)],
    hints: ['$' + `${s} - ${v}` + '$ and $' + `${v} - ${s}` + '$ are opposites: $' + `${s} - ${v} = -(${v} - ${s})` + '$.', `Factor $${negKWord}$ out of the numerator so it matches a factor of the denominator, then divide out the common factor.`],
    solution: [
      `Factor $${negKWord}$ out of the numerator so that its binomial matches the denominator: $${numShown} = ${negK}(${ptex(fP(xm(s)), v)})$.`,
      `${needsFactor(den) ? `Factor the denominator: ${factorWhy(den, v)}. ` : ''}${zeroText(den.fs, v)} So ${npvTex(vals, v)}.`,
      `Divide out $(${ptex(fP(xm(s)), v)})$: $\\dfrac{${negK}(${ptex(fP(xm(s)), v)})}{${slotFac(den, v)}} = ${reTex(correct, v)}$.`,
      `Simplified: $${reTex(correct, v)}$, ${npvTex(vals, v)}.`,
    ],
    answerDisplay: `$${reTex(correct, v)}$, ${npvTex(vals, v)}`,
  };
}

const STUDENTS = ['Jordan', 'Amara', 'Kiran', 'Mei', 'Lucas', 'Fatima', 'Owen', 'Hana', 'Dakota', 'Ravi', 'Chloé', 'Tariq', 'Sofia', 'Ethan'];

/** d3: find the step with the first error in a student's simplification. */
function errorAnalysis(rng: Rng): GenOutput {
  const who = rng.pick(STUDENTS);
  const v = 'x';
  const s = rng.int(2, 9);
  const base = rng.pick(['opposite', 'cancelTerms', 'dosGcf'] as const);
  const err = rng.weighted<0 | 1 | 2 | 3>([[1, 3], [2, 3], [3, 3], [0, 1]]);
  const D = (a: string, b: string) => `\\dfrac{${a}}{${b}}`;
  let expr = '';
  const shown: string[] = [];
  const truth: string[] = [];
  let explain = '';
  let correctFinal = '';
  if (base === 'opposite') {
    const k = rng.int(1, 5);
    expr = D(ptex([k * s, -k], v, true), `x^2 - ${s * s}`);
    const fac = `(x - ${s})(x + ${s})`;
    const kTimes = (b: string) => (k === 1 ? b : `${k}(${b})`);
    const right = [`${expr} = ${D(kTimes(`${s} - x`), fac)}`, `x \\ne -${s},\\ ${s}`, `${expr} = -${D(`${k}`, `x + ${s}`)}`];
    truth.push(...right);
    correctFinal = `$-${D(`${k}`, `x + ${s}`)}$, $x \\ne -${s},\\ ${s}$`;
    const steps = [`$${right[0]}$`, `$${right[1]}$`, `$${right[2]}$`];
    if (err === 1) {
      steps[0] = `$${expr} = ${D(kTimes(`x - ${s}`), fac)}$`;
      steps[2] = `$${expr} = ${D(`${k}`, `x + ${s}`)}$`;
      explain = `Step 1 is wrong: $${ptex([k * s, -k], v, true)} = ${k === 1 ? '-' : `-${k}`}(x - ${s})$, not $${kTimes(`x - ${s}`)}$. The sign was lost when the factor was rearranged.`;
    } else if (err === 2) {
      steps[1] = `$x \\ne -${s}$`;
      explain = `Step 2 is wrong: the non-permissible values come from the original denominator $${fac}$, so $x \\ne ${s}$ as well. ${who} used only the simplified denominator.`;
    } else if (err === 3) {
      steps[2] = `$${expr} = ${D(`${k}`, `x + ${s}`)}$`;
      explain = `Step 3 is wrong: $${s} - x$ and $x - ${s}$ are opposites, not equal, so dividing them gives $-1$. The answer needs a negative sign.`;
    }
    shown.push(...steps);
  } else if (base === 'cancelTerms') {
    expr = D(`x^2 - ${s * s}`, `x^2 - ${s}x`);
    const right = [`${expr} = ${D(`(x - ${s})(x + ${s})`, `x(x - ${s})`)}`, `x \\ne 0,\\ ${s}`, `${expr} = ${D(`x + ${s}`, 'x')}`];
    truth.push(...right);
    correctFinal = `$${D(`x + ${s}`, 'x')}$, $x \\ne 0,\\ ${s}$`;
    const steps = [`$${right[0]}$`, `$${right[1]}$`, `$${right[2]}$`];
    if (err === 1) {
      steps[0] = `$${expr} = ${D(`(x - ${s})(x + ${s})`, `x(x + ${s})`)}$`;
      steps[1] = `$x \\ne 0,\\ -${s}$`;
      steps[2] = `$${expr} = ${D(`x - ${s}`, 'x')}$`;
      explain = `Step 1 is wrong: $x^2 - ${s}x = x(x - ${s})$, not $x(x + ${s})$. Expanding $x(x + ${s})$ gives $x^2 + ${s}x$.`;
    } else if (err === 2) {
      steps[1] = `$x \\ne -${s},\\ 0,\\ ${s}$`;
      explain = `Step 2 is wrong: $x = -${s}$ makes the numerator zero, which is allowed (the expression equals $0$ there). Only the denominator $x(x - ${s})$ gives non-permissible values: $x \\ne 0,\\ ${s}$.`;
    } else if (err === 3) {
      steps[2] = `$${expr} = ${D(`x + ${s}`, 'x')} = 1 + ${s} = ${1 + s}$`;
      explain = `Step 3 is wrong: in $${D(`x + ${s}`, 'x')}$ the $x$ is a term of the numerator, not a factor, so it cannot be divided out. Test $x = 1$: $${D(`1 + ${s}`, '1')} = ${1 + s}$ but test $x = 2$: $${D(`${2 + s}`, '2')} \\ne ${1 + s}$.`;
    }
    shown.push(...steps);
  } else {
    const c = rng.int(2, 6);
    expr = D(`x^2 - ${s * s}`, `${c}x - ${c * s}`);
    const right = [`${expr} = ${D(`(x - ${s})(x + ${s})`, `${c}(x - ${s})`)}`, `x \\ne ${s}`, `${expr} = ${D(`x + ${s}`, `${c}`)}`];
    truth.push(...right);
    correctFinal = `$${D(`x + ${s}`, `${c}`)}$, $x \\ne ${s}$`;
    const steps = [`$${right[0]}$`, `$${right[1]}$`, `$${right[2]}$`];
    if (err === 1) {
      steps[0] = `$${expr} = ${D(`(x - ${s})(x - ${s})`, `${c}(x - ${s})`)}$`;
      steps[2] = `$${expr} = ${D(`x - ${s}`, `${c}`)}$`;
      explain = `Step 1 is wrong: a difference of squares factors as $x^2 - ${s * s} = (x - ${s})(x + ${s})$. The product $(x - ${s})(x - ${s})$ expands to $x^2 - ${2 * s}x + ${s * s}$.`;
    } else if (err === 2) {
      steps[1] = `$x \\ne -${s}$`;
      explain = `Step 2 is wrong: $${c}(x - ${s}) = 0$ when $x = ${s}$, not $-${s}$. The restriction is $x \\ne ${s}$.`;
    } else if (err === 3) {
      steps[2] = `$${expr} = x + ${D(`${s}`, `${c}`)}$`;
      explain = `Step 3 is wrong: the denominator $${c}$ divides the whole numerator $x + ${s}$, not just the $${s}$. The result is $${D(`x + ${s}`, `${c}`)}$.`;
    }
    shown.push(...steps);
  }
  const labels = ['Step 1', 'Step 2', 'Step 3', 'There is no error'];
  const correctIdx = err === 0 ? 3 : err - 1;
  const work = shown.map((st, i) => `**Step ${i + 1}${i === 1 ? ' (non-permissible values)' : ''}:** ${st}`).join('\n\n');
  return {
    prompt: `${who} simplified $${expr}$ and stated the non-permissible values. Where is ${who}’s first error?\n\n${work}`,
    parts: [part(fixedChoice(labels, correctIdx))],
    hints: ['Check each step on its own: expand any factoring to see if it matches, and test the restrictions in the original denominator.', 'Only factors (not terms) can be divided out, and opposites such as $3 - x$ and $x - 3$ divide to $-1$.'],
    solution: [
      `Step 1 should factor completely: $${truth[0]}$.`,
      `Step 2 should use the original denominator: $${truth[1]}$.`,
      `Step 3 should divide out only common factors: $${truth[2]}$.`,
      err === 0 ? `Every step of ${who}’s work matches. There is no error.` : explain,
      err === 0 ? `There is no error: ${correctFinal}.` : `The first error is in ${labels[correctIdx]}. The correct result is ${correctFinal}.`,
    ],
  };
}

const rationalSimplify = skill({
  id: 'm302-rational-simplify',
  name: 'Non-permissible values and simplifying',
  description: 'State the non-permissible values of a rational expression with monomial and binomial terms, write equivalent expressions, and simplify by factoring and dividing out common factors.',
  outcomes: ['RF1'],
  lessonId: 'm302-4-1',
  gen(rng, d): GenOutput {
    if (d === 1) return rng.chance(0.5) ? npvSimple(rng, pickVar(rng)) : monomialSimplify(rng);
    if (d === 2) {
      const kind = rng.weighted([['common', 3], ['dos', 3], ['npv', 2], ['equiv', 2]] as const);
      if (kind === 'npv') return npvBinomial(rng, pickVar(rng));
      if (kind === 'equiv') return equivalentForm(rng);
      return factorSimplify(rng, kind);
    }
    const kind = rng.weighted([['two', 3], ['opposite', 3], ['error', 3]] as const);
    if (kind === 'opposite') return oppositeSimplify(rng);
    if (kind === 'error') return errorAnalysis(rng);
    return factorSimplify(rng, 'two');
  },
});

// ---------------------------------------------------------------------------
// 4.2 — Multiplying, dividing, adding and subtracting
// ---------------------------------------------------------------------------

const reShow = (r: RE, v: string, expanded: boolean) =>
  `\\dfrac{${expanded ? ptex(pscale(pprod(r.num.map(fP)), r.n), v) : prodTex(r.n, r.num, v)}}{${expanded ? ptex(pscale(pprod(r.den.map(fP)), r.d), v) : prodTex(r.d, r.den, v)}}`;

/** d1: monomials multiplied or divided. */
function monoMulDiv(rng: Rng): GenOutput {
  const v = pickVar(rng);
  let first: RE = { n: 1, d: 1, num: [], den: [] };
  let second: RE = first;
  let op: 'times' | 'div' = 'times';
  let result: RE = first;
  for (let t = 0; t < 400; t++) {
    op = rng.chance(0.55) ? 'times' : 'div';
    const [a, b, c, e] = [rng.int(2, 12), rng.int(2, 12), rng.int(2, 12), rng.int(2, 12)];
    if (gcd(a, b) !== 1 || gcd(c, e) !== 1) continue;
    const m = rng.int(1, 3);
    const n = rng.int(1, 3);
    first = rng.chance(0.5) ? { n: a, d: b, num: xs(m), den: [] } : { n: a, d: b, num: [], den: xs(m) };
    // The second fraction has x on the other side after any flip, so the powers of x divide.
    const xTopSecond = (first.num.length > 0) === (op === 'div');
    second = xTopSecond ? { n: c, d: e, num: xs(n), den: [] } : { n: c, d: e, num: [], den: xs(n) };
    result = reduceRE(op === 'times' ? mulRE(first, second) : mulRE(first, flipRE(second)));
    const combinedN = first.n * (op === 'times' ? second.n : second.d);
    const combinedD = first.d * (op === 'times' ? second.d : second.n);
    if (gcd(combinedN, combinedD) === 1) continue;
    if (!hasDen(result) || result.n <= 0) continue;
    if (result.n > 60 || result.d > 60) continue;
    break;
  }
  const sym = op === 'times' ? '\\times' : '\\div';
  const given = `${reShow(first, v, false)} ${sym} ${reShow(second, v, false)}`;
  const flipped = flipRE(second);
  const prodRE = op === 'times' ? mulRE(first, second) : mulRE(first, flipped);
  const steps: string[] = [];
  if (op === 'div') steps.push(`Dividing is multiplying by the reciprocal: $${reShow(first, v, false)} \\times ${reShow(flipped, v, false)}$.`);
  steps.push(`Multiply the numerators and multiply the denominators: $${reShow(prodRE, v, false).replace(/\\dfrac\{(\d+)([a-z^{}0-9]*)\}\{(\d+)([a-z^{}0-9]*)\}/, (_m, n1, x1, d1, x2) => `\\dfrac{${n1}${x1}}{${d1}${x2}}`)}$.`);
  steps.push(`Divide the numerator and the denominator by their common factors: $${reTex(result, v)}$.`);
  steps.push(`Simplified: $${reTex(result, v)}$ (with $${v} \\ne 0$).`);
  return {
    prompt: `Simplify $${given}$, where $${v} \\ne 0$. Enter the numerator and the denominator of the answer in lowest terms.`,
    parts: numDenParts(result, v),
    hints: [op === 'div' ? 'To divide, multiply by the reciprocal of the second fraction.' : 'Multiply the numerators together and the denominators together.', 'Divide out the greatest common factor of the coefficients, and subtract exponents of the variable.'],
    solution: steps,
    answerDisplay: `$${reTex(result, v)}$`,
  };
}

/** d1: same denominators. */
function sameDenominator(rng: Rng): GenOutput {
  const v = pickVar(rng);
  for (let t = 0; t < 400; t++) {
    const sign: 1 | -1 = rng.pick([1, -1] as const);
    const mono = rng.chance(0.3);
    const r = rng.nonZero(-9, 9);
    const den: Slot = mono ? { c: rng.int(2, 9), fs: [X] } : { c: 1, fs: [xm(r)] };
    const lin = (): P => [rng.nonZero(-9, 9), rng.int(1, 5)];
    const n1: P = rng.chance(0.5) ? lin() : [rng.int(1, 9)];
    const n2: P = n1.length === 1 && rng.chance(0.5) ? lin() : [rng.int(1, 9)];
    const N = padd(n1, n2, sign);
    if (isZeroP(N) || leadP(N) < 0) continue;
    if (mono ? gcd(contentP(N), den.c) !== 1 || N[0] === 0 : Math.abs(peval(N, r)) < 1e-9) continue;
    const denTex = slotTex(den, v);
    const t1 = ptex(n1, v);
    const t2 = ptex(n2, v);
    const combine = sign > 0 ? `${t1} + ${t2}` : `${t1} - ${n2.length > 1 ? `(${t2})` : t2}`;
    return {
      prompt: `Simplify $\\dfrac{${t1}}{${denTex}} ${sign > 0 ? '+' : '-'} \\dfrac{${t2}}{${denTex}}$. Enter the numerator and the denominator of the answer.`,
      parts: [part({ kind: 'expression', expected: ptxt(N, v) }, { label: 'Numerator' }), part({ kind: 'expression', expected: ptxt(slotP(den), v) }, { label: 'Denominator' })],
      hints: ['The denominators are already the same, so combine the numerators and keep the denominator.', 'When you subtract a binomial, put it in brackets: the minus sign applies to every term.'],
      solution: [
        `The denominators are the same, so ${sign > 0 ? 'add' : 'subtract'} the numerators and keep $${denTex}$: $\\dfrac{${combine}}{${denTex}}$.`,
        `Simplify the numerator: $${combine} = ${ptex(N, v)}$.`,
        `The numerator and the denominator have no common factor, so the answer is $\\dfrac{${ptex(N, v)}}{${denTex}}$, with ${npvTex(rootsOf(den.fs), v)}.`,
      ],
      answerDisplay: `$\\dfrac{${ptex(N, v)}}{${denTex}}$`,
    };
  }
  return sameDenominator(rng);
}

interface Op {
  first: { num: Slot; den: Slot };
  second: { num: Slot; den: Slot };
  op: 'times' | 'div';
  result: RE;
  vals: number[];
}

const toRE = (o: { num: Slot; den: Slot }): RE => ({ n: o.num.c, d: o.den.c, num: o.num.fs, den: o.den.fs });

/** d2/d3: products and quotients whose numerators and denominators are monomials or binomials. */
function buildOps(rng: Rng, d: number): Op {
  for (let t = 0; t < 1500; t++) {
    const op: Op['op'] = d === 3 ? (rng.chance(0.8) ? 'div' : 'times') : rng.pick(['times', 'div'] as const);
    const s = rng.int(1, 8);
    const r = rng.intExcept(-8, 8, [0, s, -s]);
    const pool = [xm(s), xm(-s), xm(r)];
    const cPick = () => rng.pick([1, 1, 1, 2, 3, 4, 5, 6]);
    const slot = (): Slot => {
      const k = rng.weighted([['mono', 2], ['single', 4], ['dos', d === 3 ? 2 : 1]] as const);
      if (k === 'mono') {
        const i = rng.int(0, 2);
        return { c: i === 0 ? rng.int(2, 9) : cPick(), fs: xs(i) };
      }
      if (k === 'single') return { c: cPick(), fs: [...xs(rng.int(0, 1)), rng.pick(pool)] };
      return { c: rng.pick([1, 1, 2, 3]), fs: [...xs(rng.chance(0.2) ? 1 : 0), xm(s), xm(-s)] };
    };
    const first = { num: slot(), den: slot() };
    const second = { num: slot(), den: slot() };
    const all = [first.num, first.den, second.num, second.den];
    if (!all.every(smallSlot)) continue;
    if (commonFactors(first.num.fs, first.den.fs).length || commonFactors(second.num.fs, second.den.fs).length) continue;
    if (gcd(first.num.c, first.den.c) !== 1 || gcd(second.num.c, second.den.c) !== 1) continue;
    const binSlots = all.filter((x) => x.fs.some((f) => f.b !== 0)).length;
    const factorSlots = all.filter(needsFactor).length;
    if (binSlots < 2 || factorSlots < (d === 3 ? 2 : 1)) continue;
    if (d === 3 && !all.some((x) => x.fs.filter((f) => f.b !== 0).length === 2)) continue;
    const A = toRE(first);
    const B = toRE(second);
    const combined = op === 'times' ? mulRE(A, B) : mulRE(A, flipRE(B));
    const result = reduceRE(combined);
    const cancelled = combined.num.length - result.num.length;
    if (cancelled < (d === 3 ? 3 : 2)) continue;
    if (result.num.filter((f) => f.b !== 0).length > 1 || result.den.filter((f) => f.b !== 0).length > 2) continue;
    if (result.num.length > 2 || result.den.length > 2) continue;
    if (!hasDen(result) || result.n <= 0 || result.n > 40 || result.d > 40) continue;
    const vals = rootsOf([...first.den.fs, ...second.den.fs, ...(op === 'div' ? second.num.fs : [])]);
    return { first, second, op, result, vals };
  }
  const s = 3;
  return {
    first: { num: { c: 1, fs: [xm(s), xm(-s)] }, den: { c: 4, fs: [X] } },
    second: { num: { c: 8, fs: [X, X] }, den: { c: 1, fs: [xm(-s)] } },
    op: 'times',
    result: { n: 2, d: 1, num: [X, xm(s)], den: [] },
    vals: [-3, 0],
  };
}

function mulDivItem(rng: Rng, d: number): GenOutput {
  const v = pickVar(rng);
  let o = buildOps(rng, d);
  for (let t = 0; t < 20 && !hasDen(o.result); t++) o = buildOps(rng, d);
  const { first, second, op, result, vals } = o;
  const sym = op === 'times' ? '\\times' : '\\div';
  const showFrac = (x: { num: Slot; den: Slot }) => `\\dfrac{${slotTex(x.num, v)}}{${slotTex(x.den, v)}}`;
  const facFrac = (x: { num: Slot; den: Slot }) => `\\dfrac{${slotFac(x.num, v)}}{${slotFac(x.den, v)}}`;
  const given = `${showFrac(first)} ${sym} ${showFrac(second)}`;
  const steps: string[] = [];
  const toFactor = [first.num, first.den, second.num, second.den].filter(needsFactor);
  if (toFactor.length) steps.push(`Factor: ${[...new Set(toFactor.map((x) => factorWhy(x, v)))].join('; ')}. So the expression is $${facFrac(first)} ${sym} ${facFrac(second)}$.`);
  const flipped = { num: second.den, den: second.num };
  if (op === 'div') steps.push(`Multiply by the reciprocal of the divisor: $${facFrac(first)} \\times ${facFrac(flipped)}$.`);
  steps.push(
    `Non-permissible values come from ${op === 'div' ? 'both denominators and the numerator of the divisor (after you flip it, it becomes a denominator)' : 'both denominators'}: ${npvTex(vals, v)}.`,
  );
  steps.push(`Divide out the factors common to a numerator and a denominator, then multiply what is left: $${reTex(result, v)}$.`);
  steps.push(`Simplified: $${reTex(result, v)}$, ${npvTex(vals, v)}.`);
  return {
    prompt: `Simplify $${given}$ and state the non-permissible values. Enter the numerator and the denominator of the answer in lowest terms (factored or expanded), then the non-permissible values.`,
    parts: [...numDenParts(result, v), npvPart(vals)],
    hints: [
      op === 'div' ? 'Dividing by a fraction is multiplying by its reciprocal. Flip the second expression only.' : 'Factor every numerator and denominator first, then divide out factors that appear in any numerator and any denominator.',
      op === 'div' ? 'The divisor’s numerator cannot be zero either, because you cannot divide by zero. Include its zeros in the non-permissible values.' : 'State the non-permissible values from every denominator before you divide anything out.',
    ],
    solution: steps,
    answerDisplay: `$${reTex(result, v)}$, ${npvTex(vals, v)}`,
  };
}

interface Den {
  c: number;
  fs: F[];
}
interface Term {
  sign: 1 | -1;
  num: P;
  den: Den;
  /** How the denominator is printed in the question. */
  shown: string;
}

/** Lowest common denominator: lcm of constants, each factor to its highest multiplicity. */
function lcdOf(dens: Den[]): Den {
  const fs: F[] = [];
  for (const dn of dens) {
    for (const g of groupFactors(dn.fs)) {
      const have = fs.filter((f) => fKey(f) === fKey(g.f)).length;
      for (let i = have; i < g.n; i++) fs.push(g.f);
    }
  }
  return { c: dens.reduce((l, dn) => lcm(l, dn.c), 1), fs };
}
function missingFactors(all: F[], have: F[]): F[] {
  const rest = have.slice();
  const out: F[] = [];
  for (const f of all) {
    const i = rest.findIndex((g) => fKey(g) === fKey(f));
    if (i >= 0) rest.splice(i, 1);
    else out.push(f);
  }
  return out;
}

/** Factors written side by side, each binomial in brackets: x(x − 4)(x + 1). */
function factorsTex(fs: F[], v: string): string {
  return groupFactors(fs)
    .map((g) => (g.f.b === 0 ? `${v}${g.n > 1 ? `^{${g.n}}` : ''}` : `(${ptex(fP(g.f), v)})${g.n > 1 ? `^{${g.n}}` : ''}`))
    .join('');
}

interface Sum {
  terms: Term[];
  lcd: Den;
  N: P;
  pieces: string[];
  mults: string[];
}

function addTerms(terms: Term[], v: string): Sum {
  const lcd = lcdOf(terms.map((t) => t.den));
  let N: P = [0];
  const pieces: string[] = [];
  const mults: string[] = [];
  terms.forEach((t, i) => {
    const k = lcd.c / t.den.c;
    const miss = missingFactors(lcd.fs, t.den.fs);
    mults.push(prodTex(k, miss, v));
    N = padd(N, pscale(pmul(t.num, pprod(miss.map(fP))), k * t.sign));
    const multiTerm = t.num.filter((c) => c !== 0).length > 1;
    // Written as k·x^j(numerator)(binomials): 4x(x − 4), 7(x + 5), 3x².
    const missX = miss.filter((f) => f.b === 0).length;
    const binTex = factorsTex(miss.filter((f) => f.b !== 0), v);
    const xPow = (j: number) => (j === 0 ? '' : j === 1 ? v : `${v}^{${j}}`);
    let piece: string;
    let isSum = false;
    if (!multiTerm) {
      // A monomial numerator c·x^j.
      const j = t.num.length - 1;
      const c = t.num[j] * k;
      const body = `${xPow(j + missX)}${binTex}`;
      piece = `${c === 1 && body ? '' : c}${body}`;
    } else if (k === 1 && !miss.length) {
      piece = ptex(t.num, v);
      isSum = true;
    } else {
      piece = `${k === 1 ? '' : k}${xPow(missX)}(${ptex(t.num, v)})${binTex}`;
    }
    const wrap = isSum && t.sign < 0 ? `(${piece})` : piece;
    pieces.push(i === 0 ? `${t.sign < 0 ? '-' : ''}${wrap}` : `${t.sign < 0 ? ' - ' : ' + '}${wrap}`);
  });
  return { terms, lcd, N, pieces, mults };
}

function inLowestTerms(N: P, lcd: Den): boolean {
  if (isZeroP(N)) return false;
  if (gcd(contentP(N), lcd.c) !== 1) return false;
  return lcd.fs.every((f) => Math.abs(peval(N, fRoot(f))) > 1e-9);
}

function addSubItem(rng: Rng, d: number): GenOutput {
  const v = pickVar(rng);
  let sum: Sum | null = null;
  let factorStep = '';
  for (let t = 0; t < 400 && !sum; t++) {
    const sign: 1 | -1 = rng.pick([1, -1] as const);
    let terms: Term[];
    factorStep = '';
    if (d === 2) {
      // Monomial denominators such as 4x and 6x².
      const [m, n] = rng.pick([[1, 2], [2, 1], [1, 1], [2, 2], [1, 0], [0, 1], [2, 0], [3, 1], [1, 3]]);
      const [b, e] = [rng.int(2, 9), rng.int(2, 9)];
      const linTop = rng.chance(0.3) ? rng.int(0, 1) : -1;
      terms = [
        { c: b, m },
        { c: e, m: n },
      ].map((dn, i) => ({
        sign: i === 0 ? 1 : sign,
        num: i === linTop ? [rng.nonZero(-7, 7), 1] : [rng.int(1, 9)],
        den: { c: dn.c, fs: xs(dn.m) },
        shown: prodTex(dn.c, xs(dn.m), v),
      }));
    } else {
      const kind = rng.pick(['two', 'mono', 'dos', 'gcf'] as const);
      const a = rng.int(1, 9);
      const b = rng.int(1, 9);
      const xTop = rng.chance(0.3);
      if (kind === 'two' || kind === 'mono') {
        const [p, q] = distinctInts(rng, 2, -8, 8);
        const d1: F = kind === 'mono' ? X : xm(p);
        terms = [
          { sign: 1, num: xTop ? [0, 1] : [a], den: { c: 1, fs: [d1] }, shown: ptex(fP(d1), v) },
          { sign, num: [b], den: { c: 1, fs: [xm(q)] }, shown: ptex(fP(xm(q)), v) },
        ];
      } else if (kind === 'dos') {
        const s = rng.int(1, 8);
        const one = xm(rng.pick([s, -s]));
        const big: Term = { sign: 1, num: xTop ? [0, 1] : [a], den: { c: 1, fs: [xm(s), xm(-s)] }, shown: ptex(pprod([fP(xm(s)), fP(xm(-s))]), v) };
        const small: Term = { sign: 1, num: [b], den: { c: 1, fs: [one] }, shown: ptex(fP(one), v) };
        terms = rng.chance(0.5) ? [big, small] : [small, big];
        terms[1].sign = sign;
        factorStep = `Factor the denominator: $${big.shown} = ${prodTex(1, big.den.fs, v)}$ (a difference of squares).`;
      } else {
        const p = rng.nonZero(-8, 8);
        const k = rng.int(2, 5);
        const big: Term = { sign: 1, num: [a], den: { c: k, fs: [xm(p)] }, shown: ptex(pscale(fP(xm(p)), k), v) };
        const small: Term = { sign: 1, num: xTop ? [0, 1] : [b], den: { c: 1, fs: [xm(p)] }, shown: ptex(fP(xm(p)), v) };
        terms = rng.chance(0.5) ? [big, small] : [small, big];
        terms[1].sign = sign;
        factorStep = `Factor the denominator: $${big.shown} = ${prodTex(k, [xm(p)], v)}$ (common factor $${k}$).`;
      }
    }
    if (!terms.every((tm) => inLowestTerms(tm.num, tm.den))) continue;
    const s = addTerms(terms, v);
    if (!inLowestTerms(s.N, s.lcd)) continue;
    if (d === 2 && s.N.length > 2 && s.N[s.N.length - 1] < 0) continue;
    sum = s;
  }
  const { terms, lcd, N, pieces, mults } = sum!;
  const lcdTex = prodTex(lcd.c, lcd.fs, v);
  const shownTerms = terms.map((t, i) => `${i === 0 ? (t.sign < 0 ? '-' : '') : t.sign < 0 ? ' - ' : ' + '}\\dfrac{${ptex(t.num, v)}}{${t.shown}}`).join('');
  const vals = rootsOf(lcd.fs);
  const steps: string[] = [];
  if (factorStep) steps.push(factorStep);
  steps.push(`The lowest common denominator is $${lcdTex}$${d === 3 ? `, so ${npvTex(vals, v)}` : ''}.`);
  const scaled = terms
    .map((t, i) => {
      const f = `\\dfrac{${ptex(t.num, v)}}{${prodTex(t.den.c, t.den.fs, v)}}${mults[i] === '1' ? '' : ` \\cdot \\dfrac{${mults[i]}}{${mults[i]}}`}`;
      return i === 0 ? `${t.sign < 0 ? '-' : ''}${f}` : `${t.sign < 0 ? ' - ' : ' + '}${f}`;
    })
    .join('');
  steps.push(`Multiply the top and bottom of each fraction by what its denominator is missing: $${scaled}$`);
  steps.push(`Write the fractions over the LCD and combine the numerators: $\\dfrac{${pieces.join('')}}{${lcdTex}}$`);
  steps.push(`Simplify the numerator: $\\dfrac{${ptex(N, v)}}{${lcdTex}}$. It has no factor in common with the denominator, so it is in lowest terms.`);
  const parts: Part[] = [part({ kind: 'expression', expected: ptxt(N, v) }, { label: 'Numerator' }), part({ kind: 'expression', expected: prodTex(lcd.c, lcd.fs, v, true) }, { label: 'Denominator' })];
  if (d === 3) parts.push(npvPart(vals));
  const negTop = leadP(N) < 0;
  return {
    prompt: `Simplify $${shownTerms}$. Write the result as a single fraction in lowest terms and enter its numerator and denominator${d === 3 ? ', then the non-permissible values' : ''}.${negTop ? ' Put any negative sign in the numerator.' : ''}`,
    parts,
    hints: [
      d === 3 ? 'Factor each denominator first. The LCD uses each different factor the greatest number of times it appears.' : 'The LCD of monomials uses the least common multiple of the coefficients and the highest power of the variable.',
      'Multiply each numerator by the factors its denominator is missing, then add or subtract the numerators. Put brackets around a numerator you subtract.',
    ],
    solution: steps,
    answerDisplay: `$\\dfrac{${ptex(N, v)}}{${lcdTex}}$${d === 3 ? `, ${npvTex(vals, v)}` : ''}`,
  };
}

const rationalOperations = skill({
  id: 'm302-rational-operations',
  name: 'Operations on rational expressions',
  description: 'Multiply, divide, add and subtract rational expressions with monomial and binomial numerators and denominators, and state the non-permissible values.',
  outcomes: ['RF2'],
  lessonId: 'm302-4-2',
  gen(rng, d): GenOutput {
    if (d === 1) return rng.chance(0.5) ? sameDenominator(rng) : monoMulDiv(rng);
    if (d === 2) return rng.chance(0.5) ? mulDivItem(rng, 2) : addSubItem(rng, 2);
    return rng.chance(0.55) ? addSubItem(rng, 3) : mulDivItem(rng, 3);
  },
});

// ---------------------------------------------------------------------------
// 4.3 — Rational equations
// ---------------------------------------------------------------------------

const xEq = (vals: number[], v: string) => (vals.length ? vals.map((x) => `$${v} = ${niceNum(x)}$`).join(' or ') : 'no solution');
const solPart = (vals: number[]): Part => part({ kind: 'numbers', values: vals }, { label: 'Solutions', placeholder: 'e.g. 3, -2 or none' });

/** Roots of c2·x² + c1·x + c0 when rational, else null. */
function rationalRoots(c2: number, c1: number, c0: number): number[] | null {
  if (c2 === 0) return c1 === 0 ? null : [-c0 / c1];
  const disc = c1 * c1 - 4 * c2 * c0;
  if (disc < 0 || !isPerfectSquare(disc)) return null;
  const s = Math.sqrt(disc);
  const r = [(-c1 - s) / (2 * c2), (-c1 + s) / (2 * c2)];
  if (r.some((x) => !toFrac(x, 12))) return null;
  return disc === 0 ? [r[0]] : r.sort((p, q) => p - q);
}

/** The factor with this rational root, e.g. 3/2 → 2x − 3. */
function factorOfRoot(r: number): F {
  const fr = toFrac(r, 100)!;
  return { a: fr.d, b: -fr.n };
}

/** "k(ax + b)(cx + e)" for a quadratic with rational roots. */
function factoredQuadratic(c2: number, roots: number[], v: string): string {
  const fs = roots.length === 1 ? [factorOfRoot(roots[0]), factorOfRoot(roots[0])] : roots.map(factorOfRoot);
  const k = c2 / fs.reduce((p, f) => p * f.a, 1);
  return prodTex(k, fs, v);
}

/** True when s is a single term (no + or − outside brackets). */
function oneTerm(s: string): boolean {
  let depth = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '(') depth++;
    else if (ch === ')') depth--;
    else if (depth === 0 && i > 0 && (ch === '+' || ch === '-')) return false;
  }
  return true;
}
/** k·(inner) written naturally: 4(y + 2), y + 5 (for k = 1), −(n + 4), 2t. */
function times(k: number, inner: string): string {
  const body = oneTerm(inner) ? inner : `(${inner})`;
  if (k === 1) return inner;
  if (k === -1) return `-${body}`;
  return `${k}${body}`;
}
/** k·(inner) after a sign: a subtracted binomial keeps its brackets, as in − (x + 4). */
const signedTimes = (neg: boolean, k: number, inner: string) => (neg && k === 1 && !oneTerm(inner) ? `(${inner})` : times(k, inner));
/** \dfrac{top}{den} with a negative numeral moved in front. */
function fracTerm(top: number | string, den: string) {
  return typeof top === 'number' && top < 0 ? `-\\dfrac{${-top}}{${den}}` : `\\dfrac{${top}}{${den}}`;
}

const rationalEquation = skill({
  id: 'm302-rational-equation',
  name: 'Solving rational equations',
  description: 'Solve rational equations with monomial and binomial denominators by multiplying by the lowest common denominator, and reject extraneous roots.',
  outcomes: ['RF3'],
  lessonId: 'm302-4-3',
  gen(rng, d): GenOutput {
    const v = rng.pick(['x', 'x', 'x', 'y', 't', 'n']);
    const kind =
      d === 1
        ? rng.pick(['proportion', 'proportion', 'monomial', 'overBinomial'] as const)
        : d === 2
          ? rng.weighted([['plusRecip', 2], ['twoFractions', 3], ['noSolution', 2]] as const)
          : rng.weighted([['extraneous', 4], ['allExtraneous', 1], ['general', 2]] as const);
    const steps: string[] = [];
    let eq = '';
    let sols: number[] = [];
    let hint2 = 'Multiply every term by the LCD, solve, then check each answer against the non-permissible values.';
    if (kind === 'proportion') {
      const x0 = rng.int(-6, 9);
      const [u, w] = rng.sample([1, 2, 3, 4, 5, 6, 7, 8], 2);
      const m = rng.int(1, 3);
      const a = m * u;
      const b = m * w;
      const p = u - x0;
      const q = w - x0;
      const L = ptex([p, 1], v);
      const R = ptex([q, 1], v);
      eq = `\\dfrac{${a}}{${L}} = \\dfrac{${b}}{${R}}`;
      sols = [x0];
      steps.push(`Non-permissible values: $${v} \\ne ${[-p, -q].sort((m1, m2) => m1 - m2).map(niceNum).join(',\\ ')}$.`);
      const lcdTex = p === 0 ? `${v}(${R})` : q === 0 ? `${v}(${L})` : `(${L})(${R})`;
      steps.push(`Multiply both sides by $${lcdTex}$ (cross-multiply): $${times(a, R)} = ${times(b, L)}$.`);
      steps.push(`Expand: $${ptex([a * q, a], v)} = ${ptex([b * p, b], v)}$.`);
      steps.push(a - b === 1 ? `Collect terms: $${v} = ${x0}$.` : `Collect terms: $${ptex([0, a - b], v)} = ${b * p - a * q}$, so $${v} = ${x0}$.`);
      steps.push(`$${x0}$ is permissible, so the solution is $${v} = ${x0}$.`);
      hint2 = 'Cross-multiply, then solve the linear equation.';
    } else if (kind === 'monomial') {
      let a = 1;
      let b = 1;
      let m = 2;
      let x0 = 1;
      for (let t = 0; t < 200; t++) {
        x0 = rng.nonZero(-6, 6);
        m = rng.int(2, 5);
        a = rng.int(1, 9);
        b = rng.nonZero(-9, 9);
        if (gcd(b, m) === 1 && a * m + b !== 0) break;
      }
      const r = toFrac((a * m + b) / (m * x0), 100)!;
      const L = lcm(m, r.d);
      const rTex = r.d === 1 ? `${r.n}` : `${r.n < 0 ? '-' : ''}\\dfrac{${Math.abs(r.n)}}{${r.d}}`;
      eq = `\\dfrac{${a}}{${v}} ${b < 0 ? '-' : '+'} \\dfrac{${Math.abs(b)}}{${m}${v}} = ${rTex}`;
      sols = [x0];
      const lhs = a * L + (b * L) / m;
      const coef = (r.n * L) / r.d;
      steps.push(`Non-permissible value: $${v} \\ne 0$. The LCD is $${L}${v}$.`);
      steps.push(`Multiply every term by $${L}${v}$: $${a * L} ${b < 0 ? '-' : '+'} ${Math.abs((b * L) / m)} = ${ptex([0, coef], v)}$.`);
      steps.push(`$${lhs} = ${ptex([0, coef], v)}$, so $${v} = ${x0}$.`);
      steps.push(`$${x0} \\ne 0$, so the solution is $${v} = ${x0}$.`);
    } else if (kind === 'overBinomial') {
      // (a·x + b)/(x − p) = k, a linear equation once both sides are multiplied by x − p.
      let a = 2;
      let k = 3;
      let p = 1;
      let x0 = 4;
      let b = 0;
      for (let t = 0; t < 200; t++) {
        a = rng.int(1, 6);
        k = rng.intExcept(-6, 8, [0, a]);
        p = rng.nonZero(-7, 7);
        x0 = rng.intExcept(-8, 10, [p]);
        b = (k - a) * x0 - k * p;
        if (b !== 0 && Math.abs(b) <= 40) break;
      }
      const L = ptex([-p, 1], v);
      eq = `\\dfrac{${ptex([b, a], v)}}{${L}} = ${k}`;
      sols = [x0];
      steps.push(`Non-permissible value: $${v} \\ne ${p}$.`);
      steps.push(`Multiply both sides by $${L}$: $${ptex([b, a], v)} = ${times(k, L)}$.`);
      steps.push(`Expand: $${ptex([b, a], v)} = ${ptex([-k * p, k], v)}$, so $${ptex([0, a - k], v)} = ${-k * p - b}$ and $${v} = ${x0}$.`);
      steps.push(`$${x0} \\ne ${p}$, so the solution is $${v} = ${x0}$.`);
      hint2 = 'Multiply both sides by the denominator, then solve the linear equation.';
    } else if (kind === 'plusRecip') {
      const [r1, r2] = distinctInts(rng, 2, -8, 8);
      const b = r1 + r2;
      const c = r1 * r2;
      eq = `${v} ${c < 0 ? '-' : '+'} \\dfrac{${Math.abs(c)}}{${v}} = ${b}`;
      sols = [r1, r2].sort((p, q) => p - q);
      steps.push(`Non-permissible value: $${v} \\ne 0$. Multiply every term by $${v}$: $${v}^2 ${c < 0 ? '-' : '+'} ${Math.abs(c)} = ${ptex([0, b], v)}$.`);
      steps.push(`Rearrange: $${ptex([c, -b, 1], v)} = 0$, which factors as $${prodTex(1, [xm(r1), xm(r2)], v)} = 0$.`);
      steps.push(`So ${xEq(sols, v)}. Neither is $0$, so both are solutions.`);
    } else if (kind === 'twoFractions' || kind === 'general') {
      // A/(x − p) + B/(x − q) = C, searched for rational roots that are both permissible.
      let found: { A: number; B: number; C: number; p: number; q: number; roots: number[] } | null = null;
      for (let t = 0; t < 800 && !found; t++) {
        const [p, q] = distinctInts(rng, 2, -6, 6);
        const A = rng.nonZero(-9, 9);
        const B = rng.nonZero(-9, 9);
        const C = kind === 'twoFractions' ? 1 : rng.pick([2, 3, -1, -2]);
        const roots = rationalRoots(C, -(C * (p + q) + A + B), C * p * q + A * q + B * p);
        if (!roots || roots.length !== 2) continue;
        if (roots.some((r) => Math.abs(r - p) < 1e-9 || Math.abs(r - q) < 1e-9)) continue;
        if (kind === 'twoFractions' && roots.some((r) => !Number.isInteger(r))) continue;
        if (kind === 'general' && roots.every((r) => Number.isInteger(r)) && rng.chance(0.6)) continue;
        if (roots.some((r) => Math.abs(r) > 12)) continue;
        found = { A, B, C, p, q, roots };
      }
      const { A, B, C, p, q, roots } = found ?? { A: 2, B: 3, C: 1, p: 1, q: -1, roots: [-2, 5].sort((m1, m2) => m1 - m2) };
      const Lp = ptex([-p, 1], v);
      const Lq = ptex([-q, 1], v);
      eq = `${fracTerm(A, Lp)} ${B < 0 ? '-' : '+'} \\dfrac{${Math.abs(B)}}{${Lq}} = ${C}`;
      sols = roots;
      const quad: P = [C * p * q + A * q + B * p, -(C * (p + q) + A + B), C];
      steps.push(`Non-permissible values: $${v} \\ne ${Math.min(p, q)},\\ ${Math.max(p, q)}$. The LCD is $(${Lp})(${Lq})$.`);
      steps.push(`Multiply every term by the LCD: $${times(A, Lq)} ${B < 0 ? '-' : '+'} ${signedTimes(B < 0, Math.abs(B), Lp)} = ${times(C, `(${Lp})(${Lq})`)}$.`);
      if (C < 0) {
        steps.push(`Expand and collect everything on one side: $${ptex(quad, v)} = 0$. Multiply both sides by $-1$: $${ptex(pscale(quad, -1), v)} = 0$.`);
      } else {
        steps.push(`Expand and collect everything on one side: $${ptex(quad, v)} = 0$.`);
      }
      steps.push(`Factor: $${factoredQuadratic(Math.abs(C), roots, v)} = 0$, so ${xEq(roots, v)}.`);
      steps.push('Neither value is non-permissible, so both are solutions.');
    } else if (kind === 'noSolution') {
      const p = rng.nonZero(-7, 7);
      const a = rng.int(2, 6);
      const c = rng.intExcept(1, 6, [a]);
      const L = ptex([-p, 1], v);
      eq = `\\dfrac{${ptex([0, a], v)}}{${L}} = ${c} ${a * p < 0 ? '-' : '+'} \\dfrac{${Math.abs(a * p)}}{${L}}`;
      sols = [];
      steps.push(`Non-permissible value: $${v} \\ne ${p}$.`);
      steps.push(`Multiply every term by $${L}$: $${a}${v} = ${times(c, L)} ${a * p < 0 ? '-' : '+'} ${Math.abs(a * p)}$.`);
      steps.push(`Expand: $${a}${v} = ${ptex([-c * p + a * p, c], v)}$, so ${a - c === 1 ? '' : `$${ptex([0, a - c], v)} = ${(a - c) * p}$ and `}$${v} = ${p}$.`);
      steps.push(`But $${v} = ${p}$ is non-permissible (it makes a denominator $0$), so it is extraneous. There is no solution.`);
    } else {
      // k·x/(x − p) + A/(x − q) = B/((x − p)(x − q)) with q = −p or q = 0, so the right-hand
      // denominator is the binomial x² − p² or x² − px. x = p is a root of the cleared equation.
      let p = rng.nonZero(-6, 6);
      let q = rng.chance(0.6) ? -p : 0;
      let s0 = rng.intExcept(-6, 6, [p, q, q - p]);
      for (let t = 0; t < 50 && (s0 === p || s0 === q || s0 === q - p); t++) {
        p = rng.nonZero(-6, 6);
        q = rng.chance(0.6) ? -p : 0;
        s0 = rng.intExcept(-6, 6, [p, q, q - p]);
      }
      const k = rng.pick([1, 1, 2]);
      const s = kind === 'allExtraneous' ? q : s0;
      const A = k * (q - s - p);
      const B = k * p * (p - q);
      const Lp = ptex([-p, 1], v);
      const Lq = ptex([-q, 1], v);
      const binom = ptex(pmul([-p, 1], [-q, 1]), v);
      const facTex = q === 0 ? `${v}(${Lp})` : `(${Lp})(${Lq})`;
      eq = `${fracTerm(k === 1 ? v : `${k}${v}`, Lp)} ${A < 0 ? '-' : '+'} \\dfrac{${Math.abs(A)}}{${Lq}} = ${fracTerm(B, binom)}`;
      const roots = [s, p].sort((m, n) => m - n);
      sols = kind === 'allExtraneous' ? [] : [s];
      const quad: P = [-A * p - B, A - k * q, k];
      const kv = k === 1 ? v : `${k}${v}`;
      steps.push(`Factor the denominator on the right: $${binom} = ${facTex}$${q === 0 ? '' : ' (a difference of squares)'}. Non-permissible values: $${v} \\ne ${Math.min(p, q)},\\ ${Math.max(p, q)}$.`);
      const firstTerm = q === 0 ? `${k === 1 ? '' : k}${v}^2` : `${kv}(${Lq})`;
      steps.push(`Multiply every term by $${facTex}$: $${firstTerm} ${A < 0 ? '-' : '+'} ${signedTimes(A < 0, Math.abs(A), Lp)} = ${B}$.`);
      steps.push(`Expand and collect: $${ptex(quad, v)} = 0$, which factors as $${factoredQuadratic(k, roots, v)} = 0$, so ${xEq(roots, v)}.`);
      steps.push(
        kind === 'allExtraneous'
          ? `Both $${Math.min(p, q)}$ and $${Math.max(p, q)}$ are non-permissible, so both roots are extraneous. There is no solution.`
          : `$${v} = ${p}$ is non-permissible, so it is extraneous: reject it. $${v} = ${s}$ is permissible, so the only solution is $${v} = ${s}$.`,
      );
    }
    return {
      prompt: `Solve $${eq}$. Enter every solution, separated by commas, or type *none* if there is no solution.`,
      parts: [solPart(sols)],
      hints: ['First list the non-permissible values: the values that make any denominator zero.', hint2],
      solution: steps,
      answerDisplay: xEq(sols, v),
    };
  },
});

// ---------------------------------------------------------------------------
// 4.3 — Applications: work rates, travel at different speeds, average cost
// ---------------------------------------------------------------------------

const NAMES = ['Aisha', 'Mateo', 'Priya', 'Liam', 'Mei', 'Noah', 'Amara', 'Ethan', 'Sofia', 'Kiran', 'Jasmine', 'Owen', 'Fatima', 'Lucas', 'Hana', 'Dakota', 'Ravi', 'Chloé', 'Tariq', 'Émilie'];
const TASKS = [
  'clear the snow from the community rink',
  'paint a classroom',
  'stock the shelves in a grocery aisle',
  'plant a block of spruce seedlings',
  'sort a shipment of parcels',
  'set up the chairs for a graduation ceremony',
  'mow the grass on a soccer field',
  'enter a batch of survey data',
];
/** A is the faster machine (generators give A the shorter time when the order matters). */
const MACHINES = [
  { task: 'fill a stock-watering tank', A: 'the newer pump', B: 'the older pump' },
  { task: 'empty a flooded basement', A: 'the large pump', B: 'the small pump' },
  { task: 'print the yearbooks', A: 'the new printer', B: 'the old printer' },
  { task: 'clear a parking lot of snow', A: 'the large snowplow', B: 'the small snowplow' },
];

const niceDecimal = (x: number) => Math.abs(x * 100 - Math.round(x * 100)) < 1e-9;
const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
/** Away from a rounding boundary at one decimal place. */
const safeTenth = (x: number) => Math.abs(Math.abs(x) * 10 - Math.floor(Math.abs(x) * 10) - 0.5) > 0.03;

function workPeople(rng: Rng): { A: string; B: string; task: string } {
  if (rng.chance(0.35)) return rng.pick(MACHINES);
  const [A, B] = rng.sample(NAMES, 2);
  return { A, B, task: rng.pick(TASKS) };
}

interface CostCtx {
  who: string;
  items: string;
  item: string;
  /** Plural noun for the answer box. */
  unit: string;
}
const COSTS: CostCtx[] = [
  { who: 'A small business in Hillcrest', items: 'custom phone cases', item: 'case', unit: 'cases' },
  { who: 'A leadership class in Lakeside', items: 'school hoodies', item: 'hoodie', unit: 'hoodies' },
  { who: 'A farm stand near Maple Falls', items: 'jars of berry jam', item: 'jar', unit: 'jars' },
  { who: 'A bakery in Stonebridge', items: 'loaves of sourdough bread', item: 'loaf', unit: 'loaves' },
  { who: 'A screen-printing shop in Pinewood', items: 'printed T-shirts', item: 'T-shirt', unit: 'T-shirts' },
  { who: 'An artist at a comic expo in Riverton', items: 'enamel pins', item: 'pin', unit: 'pins' },
  { who: 'A robotics club in Westbury', items: 'robot kits', item: 'kit', unit: 'kits' },
];

/** Money in prose (outside maths): \$4.50, \$1200. */
const money = (x: number) => `\\$${Number.isInteger(x) ? fmt(x) : fmtFixed(x, 2)}`;
/** Money inside maths as a plain number: 4.5 → 4.50. */
const mnum = (x: number) => (Number.isInteger(x) ? fmt(x) : fmtFixed(x, 2));

/** Fixed cost F, cost per item v and an item count n with F/n a whole number of cents. */
function costNumbers(rng: Rng): { F: number; v: number; n: number } {
  for (let t = 0; t < 300; t++) {
    const F = rng.pick([600, 800, 900, 1200, 1500, 1800, 2000, 2400, 3000, 3600]);
    const v = rng.pick([2.5, 3, 3.75, 4, 4.5, 5, 6, 7.25, 8, 9.5, 12]);
    const n = rng.pick([40, 50, 60, 75, 80, 100, 120, 150, 200, 240, 250, 300, 400, 500]);
    if (niceDecimal(F / n) && F / n >= 1) return { F, v, n };
  }
  return { F: 1200, v: 4.5, n: 400 };
}

const TRAVEL = [
  { fast: 'cyclist', slow: 'runner', where: 'on a valley bike trail', unit: 'km/h', k: [4, 6, 8, 10, 12], s: [8, 9, 10, 12, 14, 15], t: [0.5, 1, 1.5, 2] },
  { fast: 'car', slow: 'loaded truck', where: 'on the highway between Riverton and Brookfield', unit: 'km/h', k: [10, 15, 20, 25], s: [70, 75, 80, 85, 90], t: [1, 1.5, 2, 2.5, 3] },
  { fast: 'motorboat', slow: 'canoe', where: 'across a large lake', unit: 'km/h', k: [6, 8, 10, 12, 15], s: [4, 5, 6, 8], t: [0.5, 1, 1.5, 2] },
  { fast: 'delivery drone', slow: 'courier van', where: 'across the city', unit: 'km/h', k: [10, 15, 20, 30], s: [30, 40, 45, 50, 60], t: [0.5, 1, 1.5] },
];

const rationalApply = skill({
  id: 'm302-rational-apply',
  name: 'Problems with rational equations',
  description: 'Solve work-rate, travel and average-cost problems with rational equations, using a given model or building one, and reject answers that make no sense.',
  outcomes: ['RF3'],
  lessonId: 'm302-4-3',
  calculator: true,
  gen(rng, d): GenOutput {
    const kind =
      d === 1
        ? rng.pick(['modelWork', 'modelTravel', 'modelCost', 'modelCostN'] as const)
        : d === 2
          ? rng.pick(['together', 'otherTime', 'sameTime', 'costBuild'] as const)
          : rng.pick(['longer', 'twoLegs', 'costMore'] as const);

    if (kind === 'modelWork' || kind === 'together') {
      let a = 2;
      let b = 3;
      for (let t = 0; t < 200; t++) {
        [a, b] = rng.sample([2, 3, 4, 5, 6, 8, 9, 10, 12, 15], 2).sort((p, q) => p - q);
        const tt = (a * b) / (a + b);
        if (niceDecimal(tt) || safeTenth(tt)) break;
      }
      const w = workPeople(rng);
      const t = (a * b) / (a + b);
      const L = lcm(a, b);
      const exact = niceDecimal(t);
      const ask = exact ? 'Give the exact time in hours.' : 'Round to the nearest tenth of an hour.';
      const prompt =
        kind === 'modelWork'
          ? `Working alone, ${w.A} can ${w.task} in ${a} h, and ${w.B} can do it in ${b} h. The time, $t$ hours, that they take working together is modelled by $\\dfrac{1}{${a}} + \\dfrac{1}{${b}} = \\dfrac{1}{t}$. Solve for $t$. ${ask}`
          : `Working alone, ${w.A} can ${w.task} in ${a} h. Working alone, ${w.B} can do it in ${b} h. How long does the job take if they work together? ${ask}`;
      return {
        prompt,
        parts: [numPart(t, exact ? { suffix: 'h' } : { suffix: 'h', decimals: 1 })],
        hints: [
          kind === 'modelWork' ? 'Clear the fractions: multiply every term by the lowest common denominator.' : 'In 1 hour, a worker who takes $a$ hours does $\\tfrac{1}{a}$ of the job. The rates add.',
          `Solve $\\dfrac{1}{${a}} + \\dfrac{1}{${b}} = \\dfrac{1}{t}$ by multiplying every term by the LCD, $${L}t$.`,
        ],
        solution: [
          `Let $t$ be the time together, in hours. Each hour, ${w.A} does $\\tfrac{1}{${a}}$ of the job and ${w.B} does $\\tfrac{1}{${b}}$; together they do $\\tfrac{1}{t}$.`,
          `$\\dfrac{1}{${a}} + \\dfrac{1}{${b}} = \\dfrac{1}{t}$, with $t \\ne 0$.`,
          `Multiply every term by the LCD, $${L}t$: $${L / a === 1 ? '' : L / a}t + ${L / b === 1 ? '' : L / b}t = ${L}$, so $${L / a + L / b}t = ${L}$.`,
          `$t = \\dfrac{${L}}{${L / a + L / b}} ${exact ? '=' : '\\approx'} ${exact ? fmt(t) : fmtFixed(t, 1)}$ h. Together they take ${exact ? '' : 'about '}${exact ? fmt(t) : fmtFixed(t, 1)} h.`,
        ],
      };
    }

    if (kind === 'modelTravel' || kind === 'sameTime') {
      const ctx = rng.pick(TRAVEL);
      const s = rng.pick(ctx.s);
      const k = rng.pick(ctx.k);
      const t = rng.pick(ctx.t);
      const D1 = (s + k) * t;
      const D2 = s * t;
      const askFast = rng.chance(0.4);
      const ans = askFast ? s + k : s;
      const sameLine = `In the same amount of time that a ${ctx.fast} travels ${fmt(D1)} km ${ctx.where}, a ${ctx.slow} travels ${fmt(D2)} km. The ${ctx.fast} is ${k} km/h faster than the ${ctx.slow}.`;
      const prompt =
        kind === 'modelTravel'
          ? `${sameLine} If $s$ is the speed of the ${ctx.slow} in km/h, the equation $\\dfrac{${fmt(D1)}}{s + ${k}} = \\dfrac{${fmt(D2)}}{s}$ models the equal travel times. Solve for $s$.`
          : `${sameLine} What is the speed of the ${askFast ? ctx.fast : ctx.slow}?`;
      return {
        prompt,
        parts: [numPart(kind === 'modelTravel' ? s : ans, { suffix: 'km/h' })],
        hints: [
          'Time = distance ÷ speed. The two times are equal.',
          `Let $s$ be the slower speed. Solve $\\dfrac{${fmt(D1)}}{s + ${k}} = \\dfrac{${fmt(D2)}}{s}$ by cross-multiplying.`,
        ],
        solution: [
          `Let $s$ be the speed of the ${ctx.slow} in km/h, so the ${ctx.fast} travels at $s + ${k}$ km/h. Time is distance ÷ speed, and the times are equal.`,
          `$\\dfrac{${fmt(D1)}}{s + ${k}} = \\dfrac{${fmt(D2)}}{s}$, with $s \\ne 0,\\ -${k}$.`,
          `Cross-multiply: $${fmt(D1)}s = ${fmt(D2)}(s + ${k})$, so $${fmt(D1)}s = ${fmt(D2)}s + ${fmt(D2 * k)}$.`,
          `$${fmt(D1 - D2)}s = ${fmt(D2 * k)}$, so $s = ${fmt(s)}$.`,
          kind === 'sameTime' && askFast ? `The ${ctx.fast} travels at $${s} + ${k} = ${s + k}$ km/h.` : `The ${ctx.slow} travels at ${s} km/h.`,
        ],
      };
    }

    if (kind === 'modelCost' || kind === 'modelCostN' || kind === 'costBuild') {
      const ctx = rng.pick(COSTS);
      const { F, v, n } = costNumbers(rng);
      const Y = v + F / n;
      const model = `C(n) = \\dfrac{${F} + ${mnum(v)}n}{n}`;
      if (kind === 'modelCost') {
        // Evaluate the model for a number of items that does not divide evenly.
        let m = rng.int(30, 500);
        for (let t = 0; t < 100 && (niceDecimal(F / m) || !safeCent(v + F / m)); t++) m = rng.int(30, 500);
        const C = v + F / m;
        return {
          prompt: `${ctx.who} has fixed costs of ${money(F)} to make ${ctx.items}, plus ${money(v)} for each ${ctx.item}. The average cost per ${ctx.item}, in dollars, for $n$ ${ctx.items} is $${model}$. What is the average cost per ${ctx.item} when ${m} ${ctx.items} are made? Round to the nearest cent.`,
          parts: [numPart(C, { decimals: 2, tolerance: 0.011, label: '\\$' })],
          hints: ['Substitute the number of items for $n$.', 'Divide the total cost by the number of items.'],
          solution: [
            `Substitute $n = ${m}$: $C(${m}) = \\dfrac{${F} + ${mnum(v)}(${m})}{${m}}$.`,
            `The total cost is $${F} + ${mnum(v * m)} = ${mnum(F + v * m)}$ dollars.`,
            `$C(${m}) = \\dfrac{${mnum(F + v * m)}}{${m}} \\approx ${fmtFixed(C, 2)}$`,
            `The average cost is about ${money(Math.round(C * 100) / 100)} per ${ctx.item}.`,
          ],
        };
      }
      const prompt =
        kind === 'modelCostN'
          ? `${ctx.who} has fixed costs of ${money(F)} to make ${ctx.items}, plus ${money(v)} for each ${ctx.item}. The average cost per ${ctx.item}, in dollars, is $${model}$. How many ${ctx.items} must be made for the average cost to be ${money(Y)} per ${ctx.item}?`
          : `${ctx.who} makes ${ctx.items}. The fixed costs are ${money(F)}, and each ${ctx.item} costs ${money(v)} in materials. Write an equation for the average cost per ${ctx.item}, and use it to find how many ${ctx.items} must be made for the average cost to be ${money(Y)} per ${ctx.item}.`;
      return {
        prompt,
        parts: [numPart(n, { suffix: ctx.unit })],
        hints: [
          kind === 'costBuild' ? 'Average cost = total cost ÷ number of items, and total cost = fixed costs + cost per item × number of items.' : 'Set the model equal to the target average cost.',
          `Solve $\\dfrac{${F} + ${mnum(v)}n}{n} = ${mnum(Y)}$ by multiplying both sides by $n$.`,
        ],
        solution: [
          ...(kind === 'costBuild' ? [`The total cost of $n$ ${ctx.items} is $${F} + ${mnum(v)}n$ dollars, so the average cost is $${model}$.`] : []),
          `Set the average cost equal to $${mnum(Y)}$: $\\dfrac{${F} + ${mnum(v)}n}{n} = ${mnum(Y)}$, with $n \\ne 0$.`,
          `Multiply both sides by $n$: $${F} + ${mnum(v)}n = ${mnum(Y)}n$.`,
          `$${F} = ${mnum(Y - v)}n$, so $n = \\dfrac{${F}}{${mnum(Y - v)}} = ${n}$.`,
          `They must make ${n} ${ctx.items}.`,
        ],
      };
    }

    if (kind === 'otherTime') {
      let a = 3;
      let x = 6;
      let t = 2;
      for (let i = 0; i < 200; i++) {
        [a, x] = rng.sample([2, 3, 4, 5, 6, 8, 10, 12, 15, 20], 2);
        t = (a * x) / (a + x);
        if (niceDecimal(t)) break;
      }
      const w = workPeople(rng);
      // A machine named as the faster one gets the shorter time.
      if (MACHINES.some((mc) => mc.A === w.A) && a > x) [a, x] = [x, a];
      return {
        prompt: `Working together, ${w.A} and ${w.B} can ${w.task} in ${fmt(t)} h. ${cap(w.A)} alone takes ${a} h. How long would ${w.B} take alone?`,
        parts: [numPart(x, { suffix: 'h' })],
        hints: ['Let $x$ be the unknown time. In 1 hour the two do $\\tfrac{1}{' + a + '}$ and $\\tfrac{1}{x}$ of the job.', `Solve $\\dfrac{1}{${a}} + \\dfrac{1}{x} = \\dfrac{1}{${fmt(t)}}$.`],
        solution: [
          `Let $x$ be the time alone, in hours ($x \\ne 0$). The rates add: $\\dfrac{1}{${a}} + \\dfrac{1}{x} = \\dfrac{1}{${fmt(t)}}$.`,
          `Multiply every term by $${fmt(t)} \\cdot ${a}x$: $${fmt(t)}x + ${fmt(a * t)} = ${a}x$.`,
          Math.abs(a - t - 1) < 1e-9 ? `Subtract $${fmt(t)}x$ from both sides: $x = ${fmt(a * t)}$.` : `$${fmt(a - t)}x = ${fmt(a * t)}$, so $x = ${fmt(x)}$.`,
          `${cap(w.B)} would take ${fmt(x)} h alone.`,
        ],
      };
    }

    if (kind === 'costMore') {
      const ctx = rng.pick(COSTS);
      let F = 1200;
      let v = 4.5;
      let n1 = 100;
      let n2 = 200;
      for (let t = 0; t < 400; t++) {
        F = rng.pick([600, 900, 1200, 1500, 1800, 2400, 3000, 3600]);
        v = rng.pick([2.5, 3, 4, 4.5, 5, 6, 7.5, 8]);
        [n1, n2] = rng.sample([40, 50, 60, 75, 80, 100, 120, 150, 200, 240, 300, 400, 600], 2).sort((p, q) => p - q);
        if (niceDecimal(F / n1) && niceDecimal(F / n2) && F / n2 >= 1) break;
      }
      const Y1 = v + F / n1;
      const Y2 = v + F / n2;
      return {
        prompt: `${ctx.who} makes ${ctx.items}. The fixed costs are ${money(F)}, and each ${ctx.item} costs ${money(v)} to make. Right now the average cost is ${money(Y1)} per ${ctx.item}. How many more ${ctx.items} must be made to bring the average cost down to ${money(Y2)} per ${ctx.item}?`,
        parts: [numPart(n2 - n1, { suffix: `more ${ctx.unit}` })],
        hints: [`The average cost of $n$ items is $C(n) = \\dfrac{${F} + ${mnum(v)}n}{n}$.`, 'Solve $C(n) = $ each average cost to find the two numbers of items, then subtract.'],
        solution: [
          `The average cost of $n$ ${ctx.items} is $C(n) = \\dfrac{${F} + ${mnum(v)}n}{n}$ dollars.`,
          `Now: $\\dfrac{${F} + ${mnum(v)}n}{n} = ${mnum(Y1)}$ gives $${F} = ${mnum(Y1 - v)}n$, so $n = ${n1}$.`,
          `Goal: $\\dfrac{${F} + ${mnum(v)}n}{n} = ${mnum(Y2)}$ gives $${F} = ${mnum(Y2 - v)}n$, so $n = ${n2}$.`,
          `They must make $${n2} - ${n1} = ${n2 - n1}$ more ${ctx.items}.`,
        ],
      };
    }

    if (kind === 'longer') {
      const combos: Array<[number, number]> = [];
      for (let x0 = 2; x0 <= 12; x0++) {
        for (let k = 1; k <= 10; k++) {
          const t = (x0 * (x0 + k)) / (2 * x0 + k);
          if (Number.isInteger(t * 10) || Number.isInteger(t * 4)) combos.push([x0, k]);
        }
      }
      const [x0, k] = rng.pick(combos);
      const t = (x0 * (x0 + k)) / (2 * x0 + k);
      const w = workPeople(rng);
      const other = -(k * t) / x0;
      return {
        prompt: `Working alone, ${w.B} takes ${k} h longer than ${w.A} to ${w.task}. Together they can do it in ${fmt(t)} h. How long does ${w.A} take alone?`,
        parts: [numPart(x0, { suffix: 'h' })],
        hints: [`Let $x$ be the faster time; the slower time is $x + ${k}$.`, `Solve $\\dfrac{1}{x} + \\dfrac{1}{x + ${k}} = \\dfrac{1}{${fmt(t)}}$. You will get a quadratic: reject the root that makes no sense.`],
        solution: [
          `Let $x$ be ${w.A}’s time in hours; ${w.B} takes $x + ${k}$ h. Then $\\dfrac{1}{x} + \\dfrac{1}{x + ${k}} = \\dfrac{1}{${fmt(t)}}$, with $x \\ne 0,\\ -${k}$.`,
          `Multiply every term by $${fmt(t)}x(x + ${k})$: $${fmt(t)}(x + ${k}) + ${fmt(t)}x = x(x + ${k})$.`,
          `Collect terms: $${ptex([-k * t, k - 2 * t, 1])} = 0$.`,
          `Factor or use the quadratic formula: $x = ${x0}$ or $x = ${fmt(other)}$.`,
          `A time cannot be negative, so reject $${fmt(other)}$. ${cap(w.A)} takes ${x0} h alone.`,
        ],
      };
    }

    // twoLegs: D1/s + D2/(s + k) = T.
    const combos: Array<[number, number, number, number]> = [];
    for (const s of [10, 12, 15, 16, 18, 20, 24, 25]) for (const k of [2, 4, 5, 6, 8, 10]) for (const D1 of [6, 8, 9, 10, 12, 15, 18, 20, 24, 30]) for (const D2 of [10, 12, 14, 15, 18, 20, 21, 24, 28, 30, 35, 36, 40]) {
      const t = D1 / s + D2 / (s + k);
      if (D2 > D1 && t * 4 === Math.round(t * 4) && niceDecimal(D1 / s)) combos.push([s, k, D1, D2]);
    }
    const [s, k, D1, D2] = rng.pick(combos);
    const T = D1 / s + D2 / (s + k);
    const who = rng.pick(NAMES);
    const quad: P = [-D1 * k, T * k - D1 - D2, T];
    const disc = quad[1] ** 2 - 4 * quad[2] * quad[0];
    const other = (-quad[1] - Math.sqrt(disc)) / (2 * quad[2]);
    const trail = rng.pick(['a gravel trail in the foothills', 'a gravel road outside Ashford', 'a dirt path along a river', 'a gravel trail in a national park']);
    return {
      prompt: `${who} cycles ${D1} km on ${trail}, then ${D2} km on a paved road, riding ${k} km/h faster on the pavement. The whole ride takes ${fmt(T)} h. What was ${who}’s speed on the gravel?`,
      parts: [numPart(s, { suffix: 'km/h' })],
      hints: ['Let $s$ be the speed on gravel; on pavement it is $s + ' + k + '$. Time = distance ÷ speed, and the two times add to the total.', `Solve $\\dfrac{${D1}}{s} + \\dfrac{${D2}}{s + ${k}} = ${fmt(T)}$ and reject any impossible root.`],
      solution: [
        `Let $s$ be the gravel speed in km/h: $\\dfrac{${D1}}{s} + \\dfrac{${D2}}{s + ${k}} = ${fmt(T)}$, with $s \\ne 0,\\ -${k}$.`,
        `Multiply every term by $s(s + ${k})$: $${D1}(s + ${k}) + ${D2}s = ${fmt(T)}s(s + ${k})$.`,
        `Collect terms: $${ptex(quad, 's')} = 0$.`,
        `Quadratic formula: $s = ${s}$ or $s ${Number.isInteger(other) ? '=' : '\\approx'} ${fmt(other, 2)}$. A speed cannot be negative, so the gravel speed was ${s} km/h.`,
      ],
    };
  },
});

/** Away from a rounding boundary at two decimal places. */
function safeCent(x: number): boolean {
  const s = Math.abs(x) * 100;
  return Math.abs(s - Math.floor(s) - 0.5) > 0.03;
}

export const RATIONAL_SKILLS: SkillDef[] = [rationalSimplify, rationalOperations, rationalEquation, rationalApply];
