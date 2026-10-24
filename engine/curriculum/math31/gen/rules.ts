/** Math 31 Unit 4 — Differentiation Rules: the power, sum, product, quotient and chain rules (D2). */
import { numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fracLatex, gcd, toFrac } from '../../../math/numbers.ts';
import { evaluate, parseExpr } from '../../../math/expr.ts';
import type { Rng } from '../../../rng.ts';
import type { Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Formatting helpers (also used by transcendental.ts)
// ---------------------------------------------------------------------------

/** LaTeX for a rational number: integers plainly, other values as fractions when they are simple. */
export function tn(x: number, dfrac = false): string {
  if (Number.isInteger(x)) return `${x + 0}`;
  const f = toFrac(x, 1000);
  return f ? fracLatex(f, { dfrac }) : fmt(x);
}

/** A rational number as a student types it: 3, -2, 3/4. */
export function txn(x: number): string {
  if (Number.isInteger(x)) return `${x + 0}`;
  const f = toFrac(x, 1000);
  return f ? `${f.n}/${f.d}` : fmt(x, 6);
}

/** A number ready to substitute: in brackets when negative or a fraction. */
export function par(x: number): string {
  const s = tn(x);
  if (x < 0 || !Number.isInteger(x)) return `\\left(${s}\\right)`;
  return s;
}

/** A number in brackets, for products of values: (3), (-2), \\left(\\frac{1}{2}\\right). */
export function bn(x: number): string {
  return Number.isInteger(x) ? `(${x + 0})` : `\\left(${tn(x)}\\right)`;
}

/** Brackets around a LaTeX expression. */
export const pp = (s: string): string => `(${s})`;

/** Coefficient in front of a body (LaTeX): '' for 1 and '-' for -1. */
export function cf(c: number): string {
  if (c === 1) return '';
  if (c === -1) return '-';
  return tn(c);
}

/** Coefficient in front of a body (typed text): '' for 1, '-' for -1, (3/2) for fractions. */
export function cft(c: number): string {
  if (c === 1) return '';
  if (c === -1) return '-';
  if (Number.isInteger(c)) return `${c}`;
  return `(${txn(c)})`;
}

/** Joins signed terms: ['3x', '-2', '5'] gives '3x - 2 + 5'. Empty and '0' terms are skipped. */
export function joinTerms(ts: string[]): string {
  const out = ts.filter((t) => t !== '' && t !== '0');
  if (!out.length) return '0';
  return out.map((t, i) => (i === 0 ? t : t.startsWith('-') ? `- ${t.slice(1)}` : `+ ${t}`)).join(' ');
}

/** Number of top-level terms in a joined expression (for deciding on brackets). */
function isSum(s: string): boolean {
  let depth = 0;
  for (let i = 1; i < s.length; i++) {
    const c = s[i];
    if (c === '(' || c === '{' || c === '[') depth++;
    else if (c === ')' || c === '}' || c === ']') depth--;
    else if (depth === 0 && (c === '+' || c === '-') && s[i - 1] === ' ') return true;
  }
  return false;
}

/** Brackets around a sum (LaTeX). */
export function wrapT(s: string): string {
  return isSum(s) || s.startsWith('-') ? `(${s})` : s;
}

/** Brackets around a sum (typed text). */
export function wrapX(s: string): string {
  return isSum(s) || s.startsWith('-') ? `(${s})` : s;
}

/** A typed fraction num/den with brackets where needed. */
export function fracX(num: string, den: string): string {
  const n = isSum(num) ? `(${num})` : num;
  const d = isSum(den) || /[\s*/]/.test(den) || /^\d+[a-z(]/.test(den) ? `(${den})` : den;
  return `${n}/${d}`;
}

/** A LaTeX fraction, with the sign of a negative numerator moved in front. */
export function fracT(num: string, den: string): string {
  if (num.startsWith('-') && !isSum(num)) return `-\\dfrac{${num.slice(1)}}{${den}}`;
  return `\\dfrac{${num}}{${den}}`;
}

/** The value of a typed expression at a point (variable x unless given). */
export function evalAt(txt: string, x: number, v = 'x'): number {
  return evaluate(parseExpr(txt), { [v]: x });
}

// ---------------------------------------------------------------------------
// Polynomials as ascending coefficient lists [c0, c1, c2, ...]
// ---------------------------------------------------------------------------

export type P = number[];

export function trimP(p: P): P {
  const q = p.map((c) => (Math.abs(c) < 1e-12 ? 0 : c));
  while (q.length > 1 && q[q.length - 1] === 0) q.pop();
  return q;
}
export const pder = (p: P): P => trimP(p.length <= 1 ? [0] : p.slice(1).map((c, i) => c * (i + 1)));
export function pmul(a: P, b: P): P {
  const out = new Array<number>(a.length + b.length - 1).fill(0);
  a.forEach((x, i) => b.forEach((y, j) => (out[i + j] += x * y)));
  return trimP(out);
}
export function padd(a: P, b: P, s = 1): P {
  return trimP(Array.from({ length: Math.max(a.length, b.length) }, (_, i) => (a[i] ?? 0) + s * (b[i] ?? 0)));
}
export const pscale = (p: P, k: number): P => trimP(p.map((c) => c * k));
export const peval = (p: P, x: number): number => p.reduce((s, c, i) => s + c * x ** i, 0);
export const pterms = (p: P): number => p.filter((c) => c !== 0).length;
export const pcontent = (p: P): number => p.reduce((g, c) => gcd(g, c), 0);

/** c·v^k in LaTeX. */
export function monoTex(c: number, k: number, v = 'x'): string {
  if (c === 0) return '0';
  if (k === 0) return tn(c);
  return `${cf(c)}${k === 1 ? v : `${v}^{${k}}`}`;
}

/** c·v^k as typed text (fractions as 3x^2/2). */
export function monoTxt(c: number, k: number, v = 'x'): string {
  if (c === 0) return '0';
  if (k === 0) return txn(c);
  const body = k === 1 ? v : `${v}^${k}`;
  if (Number.isInteger(c)) return `${c === 1 ? '' : c === -1 ? '-' : c}${body}`;
  const f = toFrac(c, 1000)!;
  return `${f.n === 1 ? '' : f.n === -1 ? '-' : f.n}${body}/${f.d}`;
}

/** A polynomial in LaTeX, highest power first. */
export function ptex(p: P, v = 'x'): string {
  const ts: string[] = [];
  for (let i = p.length - 1; i >= 0; i--) if (p[i] !== 0) ts.push(monoTex(p[i], i, v));
  return joinTerms(ts);
}

/** A polynomial as typed text, highest power first. */
export function ptxt(p: P, v = 'x'): string {
  const ts: string[] = [];
  for (let i = p.length - 1; i >= 0; i--) if (p[i] !== 0) ts.push(monoTxt(p[i], i, v));
  return joinTerms(ts);
}

/** A random polynomial of the given degree with `n` non-zero terms. */
function randPoly(rng: Rng, deg: number, n: number, lo = -9, hi = 9): P {
  const p = new Array<number>(deg + 1).fill(0);
  p[deg] = rng.nonZero(lo, hi);
  const others = rng.sample(Array.from({ length: deg }, (_, i) => i), Math.min(deg, n - 1));
  for (const k of others) p[k] = rng.nonZero(lo, hi);
  return p;
}

// ---------------------------------------------------------------------------
// Powers of x with rational exponents: c·x^n
// ---------------------------------------------------------------------------

/** An exponent as written in a superscript: 3, -2, 1/2, -3/2. */
export function expStr(n: number): string {
  if (Number.isInteger(n)) return `${n + 0}`;
  const f = toFrac(n, 12)!;
  return `${f.n}/${f.d}`;
}

/** x^m (m > 0) with radicals for halves and thirds: x, x^{2}, \sqrt{x}, x\sqrt{x}, \sqrt[3]{x^{2}}. */
function radBodyTex(m: number, v: string): string {
  if (Number.isInteger(m)) return m === 1 ? v : `${v}^{${m}}`;
  const f = toFrac(m, 12)!;
  if (f.d !== 2 && f.d !== 3) return `${v}^{${f.n}/${f.d}}`;
  const whole = Math.floor(m);
  const rem = Math.round((m - whole) * f.d);
  const inner = rem === 1 ? v : `${v}^{${rem}}`;
  const root = f.d === 2 ? `\\sqrt{${inner}}` : `\\sqrt[3]{${inner}}`;
  return `${whole === 0 ? '' : whole === 1 ? v : `${v}^{${whole}}`}${root}`;
}

function radBodyTxt(m: number, v: string): string {
  if (Number.isInteger(m)) return m === 1 ? v : `${v}^${m}`;
  const f = toFrac(m, 12)!;
  if (f.d !== 2 && f.d !== 3) return `${v}^(${f.n}/${f.d})`;
  const whole = Math.floor(m);
  const rem = Math.round((m - whole) * f.d);
  const inner = rem === 1 ? v : `${v}^${rem}`;
  const root = f.d === 2 ? `sqrt(${inner})` : `cbrt(${inner})`;
  return `${whole === 0 ? '' : whole === 1 ? `${v} ` : `${v}^${whole} `}${root}`;
}

/** c·x^n in simplified LaTeX: positive exponents, radicals for halves and thirds. */
export function powTex(c: number, n: number, v = 'x'): string {
  if (c === 0) return '0';
  if (n === 0) return tn(c);
  const f = toFrac(c, 1000)!;
  const sign = f.n < 0 ? '-' : '';
  const a = Math.abs(f.n);
  if (n > 0) {
    const body = radBodyTex(n, v);
    if (f.d === 1) return `${sign}${a === 1 ? '' : a}${body}`;
    return `${sign}\\dfrac{${a === 1 ? '' : a}${body}}{${f.d}}`;
  }
  return `${sign}\\dfrac{${a}}{${f.d === 1 ? '' : f.d}${radBodyTex(-n, v)}}`;
}

/** c·x^n as typed text: 3sqrt(x)/2, -6/x^2, 1/(2x sqrt(x)). */
export function powTxt(c: number, n: number, v = 'x'): string {
  if (c === 0) return '0';
  if (n === 0) return txn(c);
  const f = toFrac(c, 1000)!;
  const sign = f.n < 0 ? '-' : '';
  const a = Math.abs(f.n);
  if (n > 0) {
    const body = radBodyTxt(n, v);
    if (f.d === 1) return `${sign}${a === 1 ? '' : a}${body}`;
    return `${sign}${a === 1 ? '' : a}${body}/${f.d}`;
  }
  const body = radBodyTxt(-n, v);
  const den = `${f.d === 1 ? '' : f.d}${body}`;
  return `${sign}${a}/${f.d === 1 && !body.includes(' ') ? den : `(${den})`}`;
}

/** c·x^n in exponent form (LaTeX): 4x^{-1/2}. */
export function powExpTex(c: number, n: number, v = 'x'): string {
  if (n === 0) return tn(c);
  return `${cf(c)}${n === 1 ? v : `${v}^{${expStr(n)}}`}`;
}

/** The function name in a question: f(x), g(t), or y. */
export interface Fn {
  f: string;
  v: string;
}
export const fnOf = (n: Fn): string => (n.f ? `${n.f}(${n.v})` : 'y');
export const dOf = (n: Fn): string => (n.f ? `${n.f}'(${n.v})` : `\\dfrac{dy}{d${n.v}}`);
export const dAt = (n: Fn, at: string): string => `${n.f || 'f'}'(${at})`;
export const dLabel = (n: Fn): string => `$${n.f ? `${n.f}'(${n.v})` : `\\dfrac{dy}{d${n.v}}`} =$`;
const NAMES: Fn[] = [
  { f: 'f', v: 'x' },
  { f: 'f', v: 'x' },
  { f: 'g', v: 'x' },
  { f: '', v: 'x' },
  { f: 'h', v: 'x' },
  { f: 'f', v: 't' },
];
export const pickName = (rng: Rng, named = false): Fn => {
  const n = rng.pick(NAMES);
  return named && !n.f ? { f: 'f', v: 'x' } : n;
};
/** A named function of x (for questions about x-coordinates). */
export const pickNameX = (rng: Rng): Fn => ({ f: rng.pick(['f', 'f', 'g', 'h']), v: 'x' });

/** An expression answer for a derivative. */
export const derivPart = (n: Fn, expected: string): Part => part({ kind: 'expression', expected }, { label: dLabel(n) });

/** Replace the variable by a value in a LaTeX derivative (for substitution steps). */
export function subTex(tex: string, v: string, val: number): string {
  const plain = tn(val);
  return tex
    .replace(new RegExp(`\\\\sqrt(\\[3\\])?\\{${v}\\}`, 'g'), (_m, idx) => `\\sqrt${idx ?? ''}{${plain}}`)
    .replace(new RegExp(`(?<![a-zA-Z\\\\])${v}(?![a-zA-Z])`, 'g'), (_m, offset: number, whole: string) => {
      const before = whole[offset - 1] ?? '';
      const after = whole[offset + 1] ?? '';
      // Brackets after a coefficient or before an exponent: 12(2)^{2}; plain inside braces: e^{2}.
      if (/[0-9)}]/.test(before) || after === '^' || val < 0 || !Number.isInteger(val)) return bn(val);
      return plain;
    });
}

const askDerivPrompt = (rng: Rng, n: Fn, fTex: string): string =>
  rng.pick([
    `Find $${dOf(n)}$ for $${fnOf(n)} = ${fTex}$.`,
    `Differentiate $${fnOf(n)} = ${fTex}$.`,
    `Find the derivative of $${fnOf(n)} = ${fTex}$.`,
  ]);

/** A table of function and derivative values (for product, quotient and chain rule questions). */
export function valueTable(cols: string[], rows: number[][]): Figure {
  return { type: 'table', headers: cols.map((c) => `$${c}$`), rows: rows.map((r) => r.map((x) => txn(x))) };
}

// ---------------------------------------------------------------------------
// 4.1 — The power, constant multiple and sum rules
// ---------------------------------------------------------------------------

interface PowTerm {
  c: number;
  n: number;
}

/** Derivative working for a sum of powers: rewrite, apply the power rule, simplify. */
function powerRuleSteps(terms: PowTerm[], n: Fn, fTexShown: string): { steps: string[]; dTex: string; dTxt: string; d: PowTerm[] } {
  const v = n.v;
  const expForm = joinTerms(terms.map((t) => powExpTex(t.c, t.n, v)));
  const needsRewrite = expForm.replace(/\s/g, '') !== fTexShown.replace(/\s/g, '');
  const d = terms.filter((t) => t.n !== 0).map((t) => ({ c: t.c * t.n, n: t.n - 1 }));
  const apply = terms
    .filter((t) => t.n !== 0)
    .map((t) => {
      if (t.n === 1) return tn(t.c);
      const lead = t.c === 1 ? '' : t.c === -1 ? '-' : tn(t.c);
      return `${lead}${bn(t.n)}${t.n === 2 ? v : `${v}^{${expStr(t.n - 1)}}`}`;
    });
  const dExp = joinTerms(d.map((t) => powExpTex(t.c, t.n, v)));
  const dTex = joinTerms(d.map((t) => powTex(t.c, t.n, v)));
  const dTxt = joinTerms(d.map((t) => powTxt(t.c, t.n, v)));
  const steps: string[] = [];
  if (needsRewrite) steps.push(`Rewrite every term as a power of $${v}$: $${fnOf(n)} = ${expForm}$.`);
  const hasConst = terms.some((t) => t.n === 0);
  steps.push(
    `Apply the power rule $\\dfrac{d}{d${v}}\\left(${v}^n\\right) = n${v}^{n-1}$${terms.length > 1 ? ' to each term' : ''}${hasConst ? ' (the constant term has derivative $0$)' : ''}: $${dOf(n)} = ${joinTerms(apply)}$.`,
  );
  if (dExp.replace(/\s/g, '') !== dTex.replace(/\s/g, '')) steps.push(`Simplify and write with positive exponents: $${dOf(n)} = ${dExp} = ${dTex}$.`);
  else steps.push(`Simplify: $${dOf(n)} = ${dTex}$.`);
  return { steps, dTex, dTxt, d };
}

const POWER_HINTS = [
  'Differentiate term by term: the derivative of a sum is the sum of the derivatives, and constant multiples stay in front.',
  'Write roots and reciprocals as powers first ($\\sqrt{x} = x^{1/2}$, $\\dfrac{1}{x^3} = x^{-3}$), then use $\\dfrac{d}{dx}x^n = nx^{n-1}$.',
];

/** Kinds of non-polynomial terms, with an exponent. */
const ODD_EXPONENTS = [-1, -2, -3, 1 / 2, -1 / 2, 3 / 2, 1 / 3, 2 / 3, -1 / 3];

function oddCoef(rng: Rng, n: number): number {
  const den = toFrac(n, 12)!.d;
  // Coefficients that make c·n a whole number most of the time.
  const base = rng.pick([1, 2, 3, 4, 5, 6, 8]);
  const c = rng.chance(0.7) ? base * den : base;
  return rng.chance(0.3) ? -c : c;
}

function sumTermsTex(terms: PowTerm[], v: string): string {
  return joinTerms(terms.map((t) => powTex(t.c, t.n, v)));
}

const powerRule = skill({
  id: 'm31-power-rule',
  name: 'The power, constant multiple and sum rules',
  description: 'Differentiate polynomials and sums of powers of x, including roots and negative powers, and evaluate derivatives at a point.',
  outcomes: ['D2'],
  lessonId: 'm31-4-1',
  gen(rng, d): GenOutput {
    if (d === 1) {
      const kind = rng.weighted([['poly', 3], ['single', 2], ['value', 2]] as const);
      if (kind === 'poly') {
        const n = pickName(rng);
        const deg = rng.int(3, 5);
        const p = randPoly(rng, deg, rng.int(3, 4));
        const terms = p.map((c, k) => ({ c, n: k })).filter((t) => t.c !== 0).reverse();
        const fTex = ptex(p, n.v);
        const w = powerRuleSteps(terms, n, fTex);
        return {
          prompt: askDerivPrompt(rng, n, fTex),
          parts: [derivPart(n, ptxt(pder(p), n.v))],
          hints: ['Differentiate one term at a time.', `Use $\\dfrac{d}{d${n.v}}\\left(c${n.v}^n\\right) = cn${n.v}^{n-1}$; a constant term has derivative $0$.`],
          solution: [...w.steps, `So $${dOf(n)} = ${ptex(pder(p), n.v)}$.`],
        };
      }
      if (kind === 'single') {
        const n = pickName(rng);
        const e = rng.pick([-1, -2, -3, -4, 1 / 2, 3 / 2, 5 / 2, 1 / 3, 2 / 3, 4 / 3, -1 / 2, 3 / 4]);
        const c = oddCoef(rng, e);
        const terms = [{ c, n: e }];
        const fTex = powExpTex(c, e, n.v);
        const w = powerRuleSteps(terms, n, fTex);
        return {
          prompt: askDerivPrompt(rng, n, fTex),
          parts: [derivPart(n, w.dTxt)],
          hints: ['The power rule works for every real exponent, including negatives and fractions.', `Multiply by the exponent, then subtract $1$ from it: $\\dfrac{d}{d${n.v}}\\left(c${n.v}^n\\right) = cn${n.v}^{n-1}$.`],
          solution: [...w.steps, `So $${dOf(n)} = ${w.dTex}$.`],
        };
      }
      const n = pickName(rng, true);
      const p = randPoly(rng, 3, rng.int(3, 4), -6, 6);
      const k = rng.intExcept(-3, 3, [0]);
      const dp = pder(p);
      const val = peval(dp, k);
      const fTex = ptex(p, n.v);
      return {
        prompt: `Given $${fnOf(n)} = ${fTex}$, find $${dAt(n, `${k}`)}$.`,
        parts: [numPart(val, { label: `$${dAt(n, `${k}`)} =$` })],
        hints: ['First find the derivative function, then substitute.', `Differentiate term by term, then replace $${n.v}$ with $${k}$.`],
        solution: [
          `Differentiate term by term: $${dOf(n)} = ${ptex(dp, n.v)}$.`,
          `Substitute $${n.v} = ${k}$: $${dAt(n, `${k}`)} = ${subTex(ptex(dp, n.v), n.v, k)} = ${tn(val)}$.`,
          `So $${dAt(n, `${k}`)} = ${tn(val)}$.`,
        ],
      };
    }

    if (d === 2) {
      const kind = rng.weighted([['mixed', 3], ['value', 2], ['slope', 1]] as const);
      if (kind === 'mixed') {
        const n = pickName(rng);
        const odd = rng.sample(ODD_EXPONENTS, rng.int(1, 2)).map((e) => ({ c: oddCoef(rng, e), n: e }));
        const poly = rng.chance(0.8) ? [{ c: rng.nonZero(-9, 9), n: rng.int(2, 5) }] : [];
        const cons = rng.chance(0.3) ? [{ c: rng.nonZero(-9, 9), n: 0 }] : [];
        const terms = rng.shuffle([...poly, ...odd]).concat(cons);
        const fTex = sumTermsTex(terms, n.v);
        const w = powerRuleSteps(terms, n, fTex);
        return {
          prompt: askDerivPrompt(rng, n, fTex),
          parts: [derivPart(n, w.dTxt)],
          hints: POWER_HINTS,
          solution: [...w.steps, `So $${dOf(n)} = ${w.dTex}$.`],
        };
      }
      // Values: a sum of powers at a point where the roots are whole numbers.
      const n = pickName(rng, true);
      const family = rng.pick(['sqrt', 'cbrt', 'recip'] as const);
      const pool = family === 'sqrt' ? [1 / 2, -1 / 2, 3 / 2, -1] : family === 'cbrt' ? [1 / 3, 2 / 3, -1 / 3, 4 / 3] : [-1, -2, -3];
      const odd = rng.sample(pool, 2).map((e) => ({ c: oddCoef(rng, e), n: e }));
      const k = family === 'sqrt' ? rng.pick([1, 4, 9]) : family === 'cbrt' ? rng.pick([1, 8]) : rng.pick([1, 2, -1, -2]);
      const terms = rng.shuffle([{ c: rng.nonZero(-6, 6), n: k > 4 ? 1 : rng.int(1, 2) }, ...odd]);
      const fTex = sumTermsTex(terms, n.v);
      const w = powerRuleSteps(terms, n, fTex);
      const val = evalAt(w.dTxt, k, n.v);
      const at = dAt(n, `${k}`);
      const sub = `Substitute $${n.v} = ${k}$: $${at} = ${subTex(w.dTex, n.v, k)} = ${tn(val)}$.`;
      if (kind === 'slope') {
        const y0 = evalAt(joinTerms(terms.map((t) => powTxt(t.c, t.n, n.v))), k, n.v);
        return {
          prompt: `Find the slope of the tangent line to the graph of $${fnOf(n)} = ${fTex}$ at the point $(${k},\\ ${tn(y0)})$.`,
          parts: [numPart(val, { label: 'Slope' })],
          hints: ['The slope of the tangent at a point is the value of the derivative there.', 'Rewrite the terms as powers, differentiate, then substitute the $x$-coordinate.'],
          solution: [...w.steps, sub, `The slope of the tangent at $(${k},\\ ${tn(y0)})$ is $${tn(val)}$.`],
        };
      }
      return {
        prompt: `Given $${fnOf(n)} = ${fTex}$, find $${at}$.`,
        parts: [numPart(val, { label: `$${at} =$` })],
        hints: POWER_HINTS,
        solution: [...w.steps, sub, `So $${at} = ${tn(val)}$.`],
      };
    }

    // d === 3
    const kind = rng.weighted([['simplify', 3], ['horizontal', 2], ['applied', 3], ['coef', 2]] as const);
    if (kind === 'simplify') {
      const n = pickName(rng);
      const v = n.v;
      const form = rng.pick(['overX', 'overSqrt', 'sqrtTimes', 'square'] as const);
      let fTex: string;
      let terms: PowTerm[];
      let expand: string;
      if (form === 'overX') {
        const m = rng.int(1, 2);
        const p = randPoly(rng, 3, 3, -9, 9);
        if (p[0] === 0) p[0] = rng.nonZero(-9, 9);
        terms = p.map((c, k) => ({ c, n: k - m })).filter((t) => t.c !== 0).reverse();
        fTex = `\\dfrac{${ptex(p, v)}}{${m === 1 ? v : `${v}^{${m}}`}}`;
        expand = `Divide each term of the numerator by $${m === 1 ? v : `${v}^{${m}}`}$`;
      } else if (form === 'overSqrt') {
        const p = [rng.nonZero(-9, 9), rng.chance(0.5) ? rng.nonZero(-9, 9) : 0, rng.nonZero(-6, 6) * (rng.chance(0.5) ? 1 : 2)];
        terms = p.map((c, k) => ({ c, n: k - 1 / 2 })).filter((t) => t.c !== 0).reverse();
        fTex = `\\dfrac{${ptex(p, v)}}{\\sqrt{${v}}}`;
        expand = `Divide each term by $\\sqrt{${v}} = ${v}^{1/2}$`;
      } else if (form === 'sqrtTimes') {
        const a = rng.nonZero(-6, 6) * 2;
        const b = rng.nonZero(-9, 9) * 2;
        const deg = rng.int(1, 2);
        const p = deg === 1 ? [b, a] : [b, 0, a];
        terms = p.map((c, k) => ({ c, n: k + 1 / 2 })).filter((t) => t.c !== 0).reverse();
        fTex = `\\sqrt{${v}}\\left(${ptex(p, v)}\\right)`;
        expand = `Multiply out, using $\\sqrt{${v}} = ${v}^{1/2}$ and adding exponents`;
      } else {
        const a = rng.int(2, 5) * rng.sign();
        const b = rng.nonZero(-7, 7);
        const deg = rng.int(1, 2);
        const p = deg === 1 ? [b, a] : [b, 0, a];
        const sq = pmul(p, p);
        terms = sq.map((c, k) => ({ c, n: k })).filter((t) => t.c !== 0).reverse();
        fTex = `\\left(${ptex(p, v)}\\right)^{2}`;
        expand = 'Expand the square first';
      }
      const expForm = joinTerms(terms.map((t) => powExpTex(t.c, t.n, v)));
      const w = powerRuleSteps(terms, n, expForm);
      return {
        prompt: askDerivPrompt(rng, n, fTex),
        parts: [derivPart(n, w.dTxt)],
        hints: ['There is no rule yet for a quotient or a product, so simplify the function into a sum of powers first.', `${expand}, then use the power rule on each term.`],
        solution: [`${expand}: $${fnOf(n)} = ${expForm}$.`, ...w.steps, `So $${dOf(n)} = ${w.dTex}$.`],
      };
    }
    if (kind === 'horizontal') {
      const n = pickNameX(rng);
      let r1 = rng.int(-4, 4);
      let r2 = rng.intExcept(-4, 4, [r1]);
      if (r1 > r2) [r1, r2] = [r2, r1];
      const slope = rng.chance(0.5) ? 0 : rng.nonZero(-12, 12);
      let p: P;
      let dp: P;
      if ((r1 + r2) % 2 === 0) {
        // f'(x) = 3(x - r1)(x - r2) + slope
        dp = padd(pscale(pmul([-r1, 1], [-r2, 1]), 3), [slope]);
        p = [rng.int(-9, 9), dp[0], dp[1] / 2, 1];
      } else {
        // f'(x) = 6(x - r1)(x - r2) + slope
        dp = padd(pscale(pmul([-r1, 1], [-r2, 1]), 6), [slope]);
        p = [rng.int(-9, 9), dp[0], dp[1] / 2, 2];
      }
      p = trimP(p);
      const lead = p[3];
      const fTex = ptex(p, n.v);
      const what = slope === 0 ? 'is horizontal' : `has slope $${slope}$`;
      const eq = padd(dp, [slope], -1);
      return {
        prompt: `Find the $x$-coordinates of all the points on the graph of $${fnOf(n)} = ${fTex}$ where the tangent line ${what}.`,
        parts: [part({ kind: 'numbers', values: [r1, r2] }, { label: '$x =$', placeholder: 'e.g. 2, -3' })],
        hints: [
          slope === 0 ? 'A horizontal tangent has slope $0$, so solve $f\'(x) = 0$.' : `Set the derivative equal to $${slope}$ and solve.`,
          'Differentiate, move every term to one side, then factor the quadratic.',
        ],
        solution: [
          `Differentiate: $${dOf(n)} = ${ptex(dp, n.v)}$.`,
          slope === 0 ? `Set $${dOf(n)} = 0$: $${ptex(dp, n.v)} = 0$.` : `Set $${dOf(n)} = ${slope}$: $${ptex(dp, n.v)} = ${slope}$, so $${ptex(eq, n.v)} = 0$.`,
          `Divide by $${3 * lead}$ and factor: $${ptex(pmul([-r1, 1], [-r2, 1]), n.v)} = 0$, so $${r1 === 0 ? n.v : `(${ptex([-r1, 1], n.v)})`}${r2 === 0 ? n.v : `(${ptex([-r2, 1], n.v)})`} = 0$.`,
          `The tangent ${what} at $x = ${r1}$ and $x = ${r2}$.`,
        ],
      };
    }
    if (kind === 'coef') {
      const n = pickName(rng, true);
      const v = n.v;
      if (rng.chance(0.5)) {
        // y = a x^3 + b x, slope m at x = k: 3ak^2 + b = m.
        const a = rng.nonZero(-5, 5);
        const b = rng.nonZero(-9, 9);
        const k = rng.intExcept(-3, 3, [0]);
        const m = 3 * a * k * k + b;
        return {
          prompt: `The function $${fnOf(n)} = a${v}^{3} ${b < 0 ? '-' : '+'} ${Math.abs(b)}${v}$ has a tangent line with slope $${m}$ at $${v} = ${k}$. Find the value of $a$.`,
          parts: [numPart(a, { label: '$a =$' })],
          hints: ['Differentiate with $a$ as an unknown constant.', `Set $${dAt(n, `${k}`)} = ${m}$ and solve for $a$.`],
          solution: [
            `Differentiate: $${dOf(n)} = 3a${v}^{2} ${b < 0 ? '-' : '+'} ${Math.abs(b)}$.`,
            `At $${v} = ${k}$: $${dAt(n, `${k}`)} = 3a${bn(k)}^{2} ${b < 0 ? '-' : '+'} ${Math.abs(b)} = ${3 * k * k}a ${b < 0 ? '-' : '+'} ${Math.abs(b)}$.`,
            `Set it equal to the slope: $${3 * k * k}a ${b < 0 ? '-' : '+'} ${Math.abs(b)} = ${m}$, so $${3 * k * k}a = ${m - b}$.`,
            `So $a = ${a}$.`,
          ],
        };
      }
      // y = a√x + b/x, slope m at x = k^2.
      const r = rng.pick([1, 2, 3]);
      const k = r * r;
      const a = rng.nonZero(-6, 6) * 2 * r;
      const b = rng.nonZero(-4, 4) * k * k;
      const m = a / (2 * r) - b / (k * k);
      return {
        prompt: `The curve $${fnOf(n)} = a\\sqrt{${v}} ${b < 0 ? '-' : '+'} ${powTex(Math.abs(b), -1, v)}$ has a tangent line with slope $${tn(m)}$ at $${v} = ${k}$. Find the value of $a$.`,
        parts: [numPart(a, { label: '$a =$' })],
        hints: ['Write the function with exponents and differentiate with $a$ as an unknown constant.', `Set $${dAt(n, `${k}`)} = ${tn(m)}$ and solve for $a$.`],
        solution: [
          `Rewrite: $${fnOf(n)} = a${v}^{1/2} ${b < 0 ? '-' : '+'} ${Math.abs(b)}${v}^{-1}$.`,
          `Differentiate: $${dOf(n)} = \\dfrac{a}{2}${v}^{-1/2} ${b < 0 ? '+' : '-'} ${Math.abs(b)}${v}^{-2} = \\dfrac{a}{2\\sqrt{${v}}} ${b < 0 ? '+' : '-'} \\dfrac{${Math.abs(b)}}{${v}^{2}}$.`,
          `At $${v} = ${k}$: $\\dfrac{a}{2(${r})} ${b < 0 ? '+' : '-'} \\dfrac{${Math.abs(b)}}{${k * k}} = \\dfrac{a}{${2 * r}} ${-b / (k * k) < 0 ? '-' : '+'} ${tn(Math.abs(b / (k * k)))}$.`,
          `Set it equal to $${tn(m)}$: $\\dfrac{a}{${2 * r}} = ${tn(m + b / (k * k))}$.`,
          `So $a = ${a}$.`,
        ],
      };
    }
    return appliedPower(rng);
  },
});

/** Rates of change from the power rule in physics, economics, biology and geometry. */
function appliedPower(rng: Rng): GenOutput {
  const ctx = rng.pick(['ball', 'cost', 'bacteria', 'sphere', 'circle'] as const);
  if (ctx === 'ball') {
    const name = rng.pick(['Amara', 'Liam', 'Priya', 'Noah', 'Mei', 'Jacob']);
    const h0 = rng.int(1, 3) * 0.5 + rng.int(0, 1);
    const v0 = rng.pick([14.7, 19.6, 24.5, 12, 15, 18, 20]);
    const T = rng.pick([0.5, 1, 1.5, 2, 2.5, 3]);
    const vel = Math.round((v0 - 9.8 * T) * 1000) / 1000;
    const hTex = `${fmt(h0)} + ${fmt(v0)}t - 4.9t^{2}`;
    return {
      prompt: `${name} throws a ball straight up. Its height after $t$ seconds is $h(t) = ${hTex}$ metres. The velocity of the ball is $h'(t)$. Find the velocity of the ball at $t = ${fmt(T)}$ s.`,
      parts: [numPart(vel, { label: `$h'(${fmt(T)}) =$`, suffix: 'm/s', display: 'decimal' })],
      hints: ['Velocity is the derivative of height with respect to time.', 'Differentiate $h(t)$ term by term, then substitute the time.'],
      solution: [
        `Differentiate: $h'(t) = ${fmt(v0)} - 9.8t$.`,
        `Substitute $t = ${fmt(T)}$: $h'(${fmt(T)}) = ${fmt(v0)} - 9.8(${fmt(T)}) = ${fmt(vel)}$.`,
        `The velocity is $${fmt(vel)}$ m/s${vel < 0 ? ' (negative, so the ball is falling)' : vel > 0 ? ' (positive, so the ball is still rising)' : ' (the ball is at its highest point)'}.`,
      ],
      calculator: true,
    };
  }
  if (ctx === 'cost') {
    const what = rng.pick([
      ['hockey sticks', 'hockey stick'],
      ['canoe paddles', 'canoe paddle'],
      ['bicycle frames', 'bicycle frame'],
      ['wooden chairs', 'wooden chair'],
    ] as const);
    const F = rng.int(10, 40) * 100;
    let a = rng.int(20, 60);
    const b = rng.pick([0.02, 0.04, 0.05, 0.08, 0.1]);
    const c = rng.pick([0.0001, 0.0002, 0.0004]);
    const q = rng.pick([50, 100, 150, 200, 250]);
    // Keep the marginal cost positive.
    while (a - 2 * b * q + 3 * c * q * q < 3) a += 10;
    const mc = a - 2 * b * q + 3 * c * q * q;
    const mcR = Math.round(mc * 100) / 100;
    return {
      prompt: `A shop's cost, in dollars, of making $x$ ${what[0]} is $C(x) = ${F} + ${a}x - ${fmt(b)}x^{2} + ${fmt(c)}x^{3}$. The marginal cost is $C'(x)$, the approximate cost of making one more ${what[1]}. Find the marginal cost when $x = ${q}$, to the nearest cent.`,
      parts: [numPart(mcR, { label: `$C'(${q}) =$`, decimals: 2, tolerance: 0.011 })],
      hints: ['Marginal cost is the derivative of the cost function.', 'Differentiate term by term (the fixed cost has derivative $0$), then substitute.'],
      solution: [
        `Differentiate: $C'(x) = ${a} - ${fmt(2 * b)}x + ${fmt(3 * c)}x^{2}$.`,
        `Substitute $x = ${q}$: $C'(${q}) = ${a} - ${fmt(2 * b)}(${q}) + ${fmt(3 * c)}(${q})^{2} = ${fmt(mc)}$.`,
        `The marginal cost is about \\$${mcR.toFixed(2)} per ${what[1]}.`,
      ],
      calculator: true,
    };
  }
  if (ctx === 'bacteria') {
    const P0 = rng.int(2, 9) * 100;
    const a = rng.int(2, 12) * 10;
    const T = rng.pick([1, 4, 9, 16, 25]);
    const rate = a * 1.5 * Math.sqrt(T);
    return {
      prompt: `A biologist models the number of bacteria in a culture after $t$ hours as $N(t) = ${P0} + ${a}t\\sqrt{t}$. How fast is the population growing at $t = ${T}$ h?`,
      parts: [numPart(rate, { label: `$N'(${T}) =$`, suffix: 'bacteria/h', display: 'decimal' })],
      hints: ['Write $t\\sqrt{t}$ as a single power of $t$.', '$t\\sqrt{t} = t^{3/2}$, so use the power rule, then substitute.'],
      solution: [
        `Rewrite: $N(t) = ${P0} + ${a}t^{3/2}$.`,
        `Differentiate: $N'(t) = ${a}\\left(\\tfrac{3}{2}\\right)t^{1/2} = ${fmt(1.5 * a)}\\sqrt{t}$.`,
        `Substitute $t = ${T}$: $N'(${T}) = ${fmt(1.5 * a)}\\sqrt{${T}} = ${fmt(1.5 * a)}(${Math.sqrt(T)}) = ${fmt(rate)}$.`,
        `The population is growing at $${fmt(rate)}$ bacteria per hour.`,
      ],
    };
  }
  if (ctx === 'sphere') {
    const r = rng.int(2, 9);
    const rate = 4 * Math.PI * r * r;
    return {
      prompt: `The volume of a spherical weather balloon of radius $r$ centimetres is $V = \\tfrac{4}{3}\\pi r^{3}$. Find the rate of change of the volume with respect to the radius, $\\dfrac{dV}{dr}$, when $r = ${r}$ cm. Give the answer to the nearest hundredth.`,
      parts: [numPart(rate, { label: '$\\dfrac{dV}{dr} =$', decimals: 2, exact: true, suffix: 'cm³/cm' })],
      hints: ['$\\tfrac{4}{3}\\pi$ is a constant multiple.', 'Differentiate $r^3$ with the power rule, then substitute.'],
      solution: [
        `Differentiate: $\\dfrac{dV}{dr} = \\tfrac{4}{3}\\pi \\cdot 3r^{2} = 4\\pi r^{2}$.`,
        `Substitute $r = ${r}$: $4\\pi(${r})^{2} = ${4 * r * r}\\pi \\approx ${rate.toFixed(2)}$.`,
        `The volume is changing at about $${rate.toFixed(2)}$ cm³ per centimetre of radius. (Notice that $4\\pi r^2$ is the surface area of the sphere.)`,
      ],
      calculator: true,
    };
  }
  const r = rng.int(2, 12);
  const rate = 2 * Math.PI * r;
  return {
    prompt: `A circular oil slick has radius $r$ metres and area $A = \\pi r^{2}$. Find $\\dfrac{dA}{dr}$, the rate of change of the area with respect to the radius, when $r = ${r}$ m. Give the answer to the nearest hundredth.`,
    parts: [numPart(rate, { label: '$\\dfrac{dA}{dr} =$', decimals: 2, exact: true, suffix: 'm²/m' })],
    hints: ['$\\pi$ is a constant multiple.', 'Differentiate $r^2$, then substitute.'],
    solution: [
      `Differentiate: $\\dfrac{dA}{dr} = 2\\pi r$.`,
      `Substitute $r = ${r}$: $2\\pi(${r}) = ${2 * r}\\pi \\approx ${rate.toFixed(2)}$.`,
      `The area is growing at about $${rate.toFixed(2)}$ m² per metre of radius (the circumference of the slick).`,
    ],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 4.2 — The product and quotient rules
// ---------------------------------------------------------------------------

const PRODUCT_HINTS = ['Name the two factors $u$ and $v$ and find $u\'$ and $v\'$.', 'Product rule: $(uv)\' = u\'v + uv\'$.'];
const QUOTIENT_HINTS = ['Name the numerator $u$ and the denominator $v$ and find $u\'$ and $v\'$.', "Quotient rule: $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$ — the numerator starts with $u'v$."];

/** u, v, u', v' line. */
function uvLine(u: string, v: string, du: string, dv: string): string {
  return `Let $u = ${u}$ and $v = ${v}$, so $u' = ${du}$ and $v' = ${dv}$.`;
}

/** A random polynomial factor for product and quotient questions. */
function factorPoly(rng: Rng, kind: 'lin' | 'quad' | 'quadNoX' | 'mono'): P {
  const lead = (hi: number) => (rng.chance(0.75) ? rng.int(1, hi) : -rng.int(1, hi));
  if (kind === 'lin') return [rng.nonZero(-9, 9), lead(5)];
  if (kind === 'quadNoX') return [rng.nonZero(-9, 9), 0, lead(4)];
  if (kind === 'mono') return [0, 0, rng.nonZero(-5, 5)];
  return [rng.nonZero(-9, 9), rng.nonZero(-6, 6), lead(3)];
}

/** The product rule on two polynomials: steps and expanded result. */
function productWork(u: P, v: P, n: Fn): { steps: string[]; res: P } {
  const du = pder(u);
  const dv = pder(v);
  const a = pmul(du, v);
  const b = pmul(u, dv);
  const res = padd(a, b);
  const x = n.v;
  return {
    steps: [
      uvLine(ptex(u, x), ptex(v, x), ptex(du, x), ptex(dv, x)),
      `Product rule: $${dOf(n)} = u'v + uv' = ${pp(ptex(du, x))}${pp(ptex(v, x))} + ${pp(ptex(u, x))}${pp(ptex(dv, x))}$.`,
      `Expand and collect like terms: $${dOf(n)} = ${ptex(a, x)} + ${wrapT(ptex(b, x))} = ${ptex(res, x)}$.`,
    ],
    res,
  };
}

/** The quotient rule on two polynomials: steps, numerator and the typed answer. */
function quotientWork(u: P, v: P, n: Fn): { steps: string[]; num: P; dTex: string; dTxt: string } {
  const du = pder(u);
  const dv = pder(v);
  const a = pmul(du, v);
  const b = pmul(u, dv);
  const num = padd(a, b, -1);
  const x = n.v;
  const vT = ptex(v, x);
  const den = vT === x ? `${x}^{2}` : `(${vT})^{2}`;
  const denX = vT === x ? `${x}^2` : `(${ptxt(v, x)})^2`;
  const dTex = fracT(ptex(num, x), den);
  const dTxt = fracX(ptxt(num, x), denX);
  return {
    steps: [
      uvLine(ptex(u, x), vT, ptex(du, x), ptex(dv, x)),
      `Quotient rule: $${dOf(n)} = \\dfrac{u'v - uv'}{v^2} = \\dfrac{${pp(ptex(du, x))}${pp(vT)} - ${pp(ptex(u, x))}${pp(ptex(dv, x))}}{${den}}$.`,
      `Expand the numerator: $${ptex(a, x)} - ${wrapT(ptex(b, x))} = ${ptex(num, x)}$, so $${dOf(n)} = ${dTex}$.`,
    ],
    num,
    dTex,
    dTxt,
  };
}

/** p(x)·√x written with the root last: 4\\sqrt{x}, 2x\\sqrt{x}, (2x + 1)\\sqrt{x}. */
function rootTerm(p: P, x: string): string {
  return pterms(p) === 1 ? `${p.length === 1 ? cf(p[0]) : monoTex(p[p.length - 1], p.length - 1, x)}\\sqrt{${x}}` : `(${ptex(p, x)})\\sqrt{${x}}`;
}

/** N/D as a step: the reduced value, with the unreduced fraction first when it reduces. */
export function fracVal(N: number, D: number): string {
  const val = N / D;
  if (Number.isInteger(val)) return D === 1 ? `${val}` : `\\dfrac{${N}}{${D}} = ${val}`;
  const g = gcd(N, D);
  if (g === 1 && D > 0) return tn(val, true);
  return `\\dfrac{${N}}{${D}} = ${tn(val, true)}`;
}

/** Values of u, u', v, v' at a point and the product or quotient rule there. */
function ruleAtPoint(kind: 'product' | 'quotient', uk: number, duk: number, vk: number, dvk: number, at: string): { line: string; val: number } {
  if (kind === 'product') {
    const val = duk * vk + uk * dvk;
    return { line: `$${at} = u'v + uv' = ${bn(duk)}${bn(vk)} + ${bn(uk)}${bn(dvk)} = ${tn(val)}$`, val };
  }
  const val = (duk * vk - uk * dvk) / (vk * vk);
  return { line: `$${at} = \\dfrac{u'v - uv'}{v^2} = \\dfrac{${bn(duk)}${bn(vk)} - ${bn(uk)}${bn(dvk)}}{${bn(vk)}^{2}} = ${fracVal(duk * vk - uk * dvk, vk * vk)}$`, val };
}

const productQuotient = skill({
  id: 'm31-product-quotient',
  name: 'The product and quotient rules',
  description: 'Differentiate products and quotients of functions with the product and quotient rules, and evaluate them at a point, including from tables of values.',
  outcomes: ['D2'],
  lessonId: 'm31-4-2',
  gen(rng, d): GenOutput {
    if (d === 1) {
      const kind = rng.weighted([['product', 3], ['productValue', 2], ['quotient', 3]] as const);
      const n = pickName(rng, kind === 'productValue');
      const x = n.v;
      if (kind === 'product') {
        const u = factorPoly(rng, 'lin');
        const v = factorPoly(rng, rng.pick(['quadNoX', 'quad', 'lin'] as const));
        const w = productWork(u, v, n);
        return {
          prompt: `Use the product rule to differentiate $${fnOf(n)} = (${ptex(u, x)})(${ptex(v, x)})$.`,
          parts: [derivPart(n, ptxt(w.res, x))],
          hints: PRODUCT_HINTS,
          solution: [...w.steps, `So $${dOf(n)} = ${ptex(w.res, x)}$.`],
        };
      }
      if (kind === 'productValue') {
        const u = factorPoly(rng, 'lin');
        const v = factorPoly(rng, rng.pick(['quadNoX', 'quad'] as const));
        const k = rng.intExcept(-3, 3, [0]);
        const at = dAt(n, `${k}`);
        const r = ruleAtPoint('product', peval(u, k), peval(pder(u), k), peval(v, k), peval(pder(v), k), at);
        return {
          prompt: `Given $${fnOf(n)} = (${ptex(u, x)})(${ptex(v, x)})$, find $${at}$.`,
          parts: [numPart(r.val, { label: `$${at} =$` })],
          hints: PRODUCT_HINTS,
          solution: [
            uvLine(ptex(u, x), ptex(v, x), ptex(pder(u), x), ptex(pder(v), x)),
            `At $${x} = ${k}$: $u = ${tn(peval(u, k))}$, $u' = ${tn(peval(pder(u), k))}$, $v = ${tn(peval(v, k))}$ and $v' = ${tn(peval(pder(v), k))}$.`,
            `${r.line}.`,
            `So $${at} = ${tn(r.val)}$.`,
          ],
        };
      }
      let u = factorPoly(rng, 'lin');
      const linDen = (): P => {
        const a = rng.int(1, 4);
        let b = rng.nonZero(-9, 9);
        while (gcd(a, b) !== 1) b = rng.nonZero(-9, 9);
        return [b, a];
      };
      let v = linDen();
      while (u[0] * v[1] === u[1] * v[0]) v = linDen();
      if (rng.chance(0.3)) u = [0, rng.nonZero(-5, 5)];
      const w = quotientWork(u, v, n);
      return {
        prompt: `Use the quotient rule to differentiate $${fnOf(n)} = \\dfrac{${ptex(u, x)}}{${ptex(v, x)}}$.`,
        parts: [derivPart(n, w.dTxt)],
        hints: QUOTIENT_HINTS,
        solution: [...w.steps, `So $${dOf(n)} = ${w.dTex}$.`],
      };
    }

    if (d === 2) {
      const kind = rng.weighted([['rootProduct', 2], ['quotient', 3], ['table', 3], ['quotientValue', 2]] as const);
      if (kind === 'rootProduct') {
        const n = pickName(rng);
        const x = n.v;
        const p = rng.chance(0.5) ? [rng.nonZero(-9, 9), rng.nonZero(-5, 5)] : [rng.nonZero(-9, 9), 0, rng.nonZero(-4, 4)];
        // f' = p'√x + p/(2√x) = (2x p' + p) / (2√x)
        const num0 = padd(pmul([0, 2], pder(p)), p);
        // Divide out a common factor of 2: (10x^2 - 8)/(2√x) = (5x^2 - 4)/√x.
        const half = pcontent(num0) % 2 === 0;
        const num = half ? pscale(num0, 1 / 2) : num0;
        const dTex = fracT(ptex(num, x), half ? `\\sqrt{${x}}` : `2\\sqrt{${x}}`);
        const dTxt = fracX(ptxt(num, x), half ? `sqrt(${x})` : `2sqrt(${x})`);
        return {
          prompt: `Use the product rule to differentiate $${fnOf(n)} = \\sqrt{${x}}\\,(${ptex(p, x)})$.`,
          parts: [derivPart(n, dTxt)],
          hints: [PRODUCT_HINTS[0], `$\\dfrac{d}{d${x}}\\sqrt{${x}} = \\dfrac{1}{2\\sqrt{${x}}}$. After the product rule, combine over the common denominator $2\\sqrt{${x}}$.`],
          solution: [
            uvLine(`\\sqrt{${x}}`, ptex(p, x), `\\dfrac{1}{2\\sqrt{${x}}}`, ptex(pder(p), x)),
            `Product rule: $${dOf(n)} = u'v + uv' = \\dfrac{${ptex(p, x)}}{2\\sqrt{${x}}} ${pder(p)[pder(p).length - 1] < 0 ? '-' : '+'} ${rootTerm(pscale(pder(p), pder(p)[pder(p).length - 1] < 0 ? -1 : 1), x)}$.`,
            `Write the second term over $2\\sqrt{${x}}$ (multiply by $\\tfrac{2\\sqrt{${x}}}{2\\sqrt{${x}}}$, using $\\sqrt{${x}}\\cdot\\sqrt{${x}} = ${x}$): $${rootTerm(pder(p), x)} = ${fracT(ptex(pmul([0, 2], pder(p)), x), `2\\sqrt{${x}}`)}$.`,
            `Add: $${dOf(n)} = ${fracT(ptex(num0, x), `2\\sqrt{${x}}`)}${half ? ` = ${dTex}` : ''}$.`,
          ],
        };
      }
      if (kind === 'quotient' || kind === 'quotientValue') {
        const n = pickName(rng, kind === 'quotientValue');
        const x = n.v;
        const form = rng.pick(['linOverQuad', 'quadOverLin', 'monoOverQuad'] as const);
        let u: P;
        let v: P;
        if (form === 'linOverQuad') {
          u = factorPoly(rng, 'lin');
          v = [rng.int(1, 9), 0, 1];
        } else if (form === 'quadOverLin') {
          u = rng.chance(0.5) ? [0, 0, rng.int(1, 4)] : [rng.nonZero(-9, 9), 0, 1];
          v = [rng.nonZero(-6, 6), 1];
        } else {
          u = [0, 0, rng.nonZero(-4, 4)];
          v = [rng.int(1, 9), 0, 1];
        }
        const w = quotientWork(u, v, n);
        if (kind === 'quotient') {
          return {
            prompt: `Use the quotient rule to differentiate $${fnOf(n)} = \\dfrac{${ptex(u, x)}}{${ptex(v, x)}}$.`,
            parts: [derivPart(n, w.dTxt)],
            hints: QUOTIENT_HINTS,
            solution: [...w.steps, `So $${dOf(n)} = ${w.dTex}$.`],
          };
        }
        let k = rng.int(-3, 3);
        for (let i = 0; i < 20 && Math.abs(peval(v, k)) < 1e-9; i++) k = rng.int(-3, 3);
        const at = dAt(n, `${k}`);
        const r = ruleAtPoint('quotient', peval(u, k), peval(pder(u), k), peval(v, k), peval(pder(v), k), at);
        return {
          prompt: `Given $${fnOf(n)} = \\dfrac{${ptex(u, x)}}{${ptex(v, x)}}$, find $${at}$.`,
          parts: [numPart(r.val, { label: `$${at} =$` })],
          hints: QUOTIENT_HINTS,
          solution: [
            uvLine(ptex(u, x), ptex(v, x), ptex(pder(u), x), ptex(pder(v), x)),
            `At $${x} = ${k}$: $u = ${tn(peval(u, k))}$, $u' = ${tn(peval(pder(u), k))}$, $v = ${tn(peval(v, k))}$ and $v' = ${tn(peval(pder(v), k))}$.`,
            `${r.line}.`,
            `So $${at} = ${tn(r.val)}$.`,
          ],
        };
      }
      return tableQuestion(rng, false);
    }

    // d === 3
    const kind = rng.weighted([['table', 2], ['horizontal', 2], ['applied', 2], ['mixed', 2]] as const);
    if (kind === 'table') return tableQuestion(rng, true);
    if (kind === 'horizontal') {
      const n = pickNameX(rng);
      const x = n.v;
      const form = rng.pick(['quad', 'recip', 'prod'] as const);
      if (form === 'quad') {
        // y = (x^2 + c)/(x - a), y' = (x^2 - 2ax - c)/(x - a)^2, roots a ± k.
        const a = rng.nonZero(-3, 3);
        const k = rng.intExcept(1, 4, [Math.abs(a)]);
        const c = k * k - a * a;
        const u = [c, 0, 1];
        const v = [-a, 1];
        const w = quotientWork(u, v, n);
        return {
          prompt: `Find the $x$-coordinates of the points where the graph of $${fnOf(n)} = \\dfrac{${ptex(u, x)}}{${ptex(v, x)}}$ has a horizontal tangent line.`,
          parts: [part({ kind: 'numbers', values: [a - k, a + k] }, { label: '$x =$', placeholder: 'e.g. 2, -3' })],
          hints: ['A horizontal tangent has slope $0$.', 'A fraction is $0$ when its numerator is $0$ (and its denominator is not).'],
          solution: [
            ...w.steps,
            `Set the numerator equal to $0$: $${ptex(w.num, x)} = 0$, so $(${ptex([-(a - k), 1], x)})(${ptex([-(a + k), 1], x)}) = 0$.`,
            `Neither value makes the denominator $0$, so the tangent is horizontal at $x = ${a - k}$ and $x = ${a + k}$.`,
          ],
        };
      }
      if (form === 'recip') {
        const m = rng.int(1, 5);
        const s = rng.nonZero(-4, 4);
        const u = [0, s];
        const v = [m * m, 0, 1];
        const w = quotientWork(u, v, n);
        return {
          prompt: `Find the $x$-coordinates of the points where the graph of $${fnOf(n)} = \\dfrac{${ptex(u, x)}}{${ptex(v, x)}}$ has a horizontal tangent line.`,
          parts: [part({ kind: 'numbers', values: [-m, m] }, { label: '$x =$', placeholder: 'e.g. 2, -3' })],
          hints: ['A horizontal tangent has slope $0$.', 'A fraction is $0$ when its numerator is $0$.'],
          solution: [...w.steps, `Set the numerator equal to $0$: $${ptex(w.num, x)} = 0$, so $x^2 = ${m * m}$.`, `The tangent is horizontal at $x = ${-m}$ and $x = ${m}$.`],
        };
      }
      // y = (x - a)^2 (x + b): y' = (x - a)(3x + 2b - a) = 3(x - a)(x - r2) with r2 = (a - 2b)/3.
      const a = rng.int(-3, 3);
      const r2 = rng.pick([-4, -3, -2, -1, 0, 1, 2, 3, 4].filter((r) => r !== a && (a - r) % 2 === 0 && a !== 3 * r));
      const b = (a - 3 * r2) / 2;
      const lin = (r: number) => (r === 0 ? x : `(${ptex([-r, 1], x)})`);
      const u = pmul([-a, 1], [-a, 1]);
      const v = [b, 1];
      const w = productWork(u, v, n);
      return {
        prompt: `Find the $x$-coordinates of the points where the graph of $${fnOf(n)} = ${a === 0 ? `${x}^{2}` : `(${ptex([-a, 1], x)})^{2}`}${pp(ptex(v, x))}$ has a horizontal tangent line.`,
        parts: [part({ kind: 'numbers', values: [a, r2] }, { label: '$x =$', placeholder: 'e.g. 2, -3' })],
        hints: ['A horizontal tangent has slope $0$.', `Use the product rule with $u = ${a === 0 ? `${x}^{2}` : `(${ptex([-a, 1], x)})^{2}`}$ and $v = ${ptex(v, x)}$, then factor the derivative.`],
        solution: [
          `Expand the square: $${a === 0 ? `${x}^{2}` : `(${ptex([-a, 1], x)})^{2}`} = ${ptex(u, x)}$.`,
          ...w.steps,
          `Factor: $${ptex(w.res, x)} = 3${lin(a)}${lin(r2)}$.`,
          `Set it equal to $0$: the tangent is horizontal at $x = ${Math.min(a, r2)}$ and $x = ${Math.max(a, r2)}$.`,
        ],
      };
    }
    if (kind === 'applied') return appliedProduct(rng);
    // A quotient whose numerator is a product.
    const n = pickName(rng);
    const x = n.v;
    const a = rng.nonZero(-5, 5);
    let b = rng.nonZero(-5, 5);
    if (b === a) b = -a;
    let c = rng.nonZero(-5, 5);
    while (c === a || c === b) c = rng.nonZero(-6, 6);
    const U = pmul([a, 1], [b, 1]);
    const v = [c, 1];
    const w = quotientWork(U, v, n);
    return {
      prompt: `Differentiate $${fnOf(n)} = \\dfrac{(${ptex([a, 1], x)})(${ptex([b, 1], x)})}{${ptex(v, x)}}$.`,
      parts: [derivPart(n, w.dTxt)],
      hints: ['Expand the numerator first (or use the product rule for $u\'$).', QUOTIENT_HINTS[1]],
      solution: [`Expand the numerator: $(${ptex([a, 1], x)})(${ptex([b, 1], x)}) = ${ptex(U, x)}$.`, ...w.steps, `So $${dOf(n)} = ${w.dTex}$.`],
    };
  },
});

/** Product and quotient rules from a table of values. */
function tableQuestion(rng: Rng, hard: boolean): GenOutput {
  const a = rng.int(1, 4);
  const other = rng.intExcept(0, 5, [a]);
  const xs = [a, other].sort((p, q) => p - q);
  const vals = new Map<number, number[]>();
  for (const x of xs) {
    const f = rng.nonZero(-6, 6);
    let g = rng.nonZero(-6, 6);
    while (Math.abs(g) === 1 && !hard) g = rng.nonZero(-6, 6);
    vals.set(x, [f, rng.nonZero(-5, 5), g, rng.nonZero(-5, 5)]);
  }
  const [f, df, g, dg] = vals.get(a)!;
  const fig = valueTable(['x', 'f(x)', "f'(x)", 'g(x)', "g'(x)"], xs.map((x) => [x, ...vals.get(x)!]));
  const kind = hard ? rng.pick(['x2f', 'fOverX', 'fgOverX', 'fgMinusXg'] as const) : rng.pick(['fg', 'fOverG', 'gOverF'] as const);
  let hTex = '';
  let steps: string[] = [];
  let val = 0;
  const at = `h'(${a})`;
  const readLine = `From the table at $x = ${a}$: $f(${a}) = ${f}$, $f'(${a}) = ${df}$, $g(${a}) = ${g}$, $g'(${a}) = ${dg}$.`;
  if (kind === 'fg') {
    hTex = 'f(x)g(x)';
    val = df * g + f * dg;
    steps = [readLine, `Product rule: $h'(x) = f'(x)g(x) + f(x)g'(x)$.`, `$${at} = ${bn(df)}${bn(g)} + ${bn(f)}${bn(dg)} = ${tn(val)}$.`];
  } else if (kind === 'fOverG' || kind === 'gOverF') {
    const [U, dU, V, dV, un, vn] = kind === 'fOverG' ? [f, df, g, dg, 'f', 'g'] : [g, dg, f, df, 'g', 'f'];
    hTex = `\\dfrac{${un}(x)}{${vn}(x)}`;
    val = ((dU as number) * (V as number) - (U as number) * (dV as number)) / ((V as number) * (V as number));
    steps = [
      readLine,
      `Quotient rule: $h'(x) = \\dfrac{${un}'(x)${vn}(x) - ${un}(x)${vn}'(x)}{[${vn}(x)]^2}$.`,
      `$${at} = \\dfrac{${bn(dU as number)}${bn(V as number)} - ${bn(U as number)}${bn(dV as number)}}{${bn(V as number)}^{2}} = ${fracVal((dU as number) * (V as number) - (U as number) * (dV as number), (V as number) ** 2)}$.`,
    ];
  } else if (kind === 'x2f') {
    hTex = 'x^{2}f(x)';
    val = 2 * a * f + a * a * df;
    steps = [readLine, `Product rule with $u = x^2$ and $v = f(x)$: $h'(x) = 2x\\,f(x) + x^{2}f'(x)$.`, `$${at} = 2(${a})${bn(f)} + (${a})^{2}${bn(df)} = ${tn(val)}$.`];
  } else if (kind === 'fOverX') {
    hTex = '\\dfrac{f(x)}{x}';
    val = (df * a - f) / (a * a);
    steps = [readLine, `Quotient rule with $u = f(x)$ and $v = x$: $h'(x) = \\dfrac{f'(x)\\cdot x - f(x)\\cdot 1}{x^{2}}$.`, `$${at} = \\dfrac{${bn(df)}(${a}) - ${bn(f)}}{(${a})^{2}} = ${fracVal(df * a - f, a * a)}$.`];
  } else if (kind === 'fgOverX') {
    hTex = '\\dfrac{f(x)g(x)}{x}';
    const P = f * g;
    const dP = df * g + f * dg;
    val = (dP * a - P) / (a * a);
    steps = [
      readLine,
      `Let $u = f(x)g(x)$. By the product rule, $u'(${a}) = ${bn(df)}${bn(g)} + ${bn(f)}${bn(dg)} = ${dP}$, and $u(${a}) = ${bn(f)}${bn(g)} = ${P}$.`,
      `Quotient rule with $v = x$: $${at} = \\dfrac{u'(${a})\\cdot ${a} - u(${a})\\cdot 1}{${a}^{2}} = \\dfrac{${bn(dP)}(${a}) - ${bn(P)}}{${a * a}} = ${fracVal(dP * a - P, a * a)}$.`,
    ];
  } else {
    hTex = 'f(x)\\,g(x) - x\\,g(x)';
    val = df * g + f * dg - (g + a * dg);
    steps = [readLine, `Use the product rule on each product: $h'(x) = f'(x)g(x) + f(x)g'(x) - \\left[g(x) + x\\,g'(x)\\right]$.`, `$${at} = ${bn(df)}${bn(g)} + ${bn(f)}${bn(dg)} - \\left[${bn(g)} + ${a}${bn(dg)}\\right] = ${tn(val)}$.`];
  }
  return {
    prompt: `The table gives values of the functions $f$ and $g$ and their derivatives. If $h(x) = ${hTex}$, find $${at}$.`,
    figure: fig,
    parts: [numPart(val, { label: `$${at} =$` })],
    hints: [kind === 'fg' || kind === 'x2f' ? 'This is a product: use the product rule.' : 'Decide whether $h$ is a product or a quotient, and write the rule with $f$, $g$ and their derivatives.', `Read the four values in the row $x = ${a}$ (not the other row), then substitute.`],
    solution: [...steps, `So $${at} = ${tn(val)}$.`],
  };
}

/** Applied product and quotient rule problems. */
function appliedProduct(rng: Rng): GenOutput {
  const ctx = rng.pick(['drug', 'revenue', 'drug', 'revenue'] as const);
  if (ctx === 'drug') {
    const A = rng.pick([20, 30, 40, 50, 60]);
    const b = rng.pick([1, 4, 9]);
    const T = rng.pick([1, 2, 3, 4].filter((t) => t * t !== b));
    const rate = (A * (b - T * T)) / (T * T + b) ** 2;
    const name = rng.pick(['A nurse', 'A pharmacologist', 'Dr. Okafor', 'Dr. Tremblay']);
    return {
      prompt: `${name} models the concentration of a medication in a patient's blood $t$ hours after an injection as $C(t) = \\dfrac{${A}t}{t^{2} + ${b}}$ mg/L. Find $C'(${T})$, the rate of change of the concentration at $t = ${T}$ h. Give the answer to the nearest hundredth.`,
      parts: [numPart(rate, { label: `$C'(${T}) =$`, decimals: 2, exact: true, suffix: 'mg/L per hour' })],
      hints: QUOTIENT_HINTS,
      solution: [
        uvLine(`${A}t`, `t^{2} + ${b}`, `${A}`, '2t'),
        `$C'(t) = \\dfrac{${A}(t^{2} + ${b}) - ${A}t(2t)}{(t^{2} + ${b})^{2}} = \\dfrac{${A}(${b} - t^{2})}{(t^{2} + ${b})^{2}}$.`,
        `$C'(${T}) = \\dfrac{${A}(${b} - ${T * T})}{(${T * T + b})^{2}} = \\dfrac{${A * (b - T * T)}}{${(T * T + b) ** 2}} \\approx ${rate.toFixed(2)}$.`,
        `The concentration is ${rate > 0 ? 'rising' : 'falling'} at about $${Math.abs(rate).toFixed(2)}$ mg/L per hour${rate < 0 ? ', so the answer is negative' : ''}.`,
      ],
      calculator: true,
    };
  }
  const shop = rng.pick(['A Hillcrest bakery', 'An Ashford bike shop', 'A Brookfield coffee roaster', 'A Riverton bookstore']);
  const N = rng.int(12, 40) * 10;
  const dN = rng.int(2, 15) * 2;
  const p = rng.int(800, 3500) / 100;
  const dp = -rng.int(5, 60) / 100;
  const rate = Math.round((dN * p + N * dp) * 100) / 100;
  return {
    prompt: `${shop} sells $N(t)$ items per week at a price of $p(t)$ dollars each, so its weekly revenue is $R(t) = N(t)\\,p(t)$ dollars, where $t$ is in weeks. At $t = 6$ it sells $N(6) = ${N}$ items per week, and sales are rising at $N'(6) = ${dN}$ items per week each week. The price is \\$${p.toFixed(2)} and is falling by \\$${Math.abs(dp).toFixed(2)} per week, so $p(6) = ${p.toFixed(2)}$ and $p'(6) = ${dp.toFixed(2)}$. How fast is the weekly revenue changing at $t = 6$? Give the answer in dollars per week, to the nearest cent.`,
    parts: [numPart(rate, { label: "$R'(6) =$", decimals: 2, tolerance: 0.011 })],
    hints: ['Revenue is a product of two changing quantities.', "Product rule: $R'(t) = N'(t)p(t) + N(t)p'(t)$."],
    solution: [
      "Product rule: $R'(t) = N'(t)\\,p(t) + N(t)\\,p'(t)$.",
      `$R'(6) = ${dN}(${p.toFixed(2)}) + ${N}(${dp.toFixed(2)}) = ${(dN * p).toFixed(2)} ${N * dp < 0 ? '-' : '+'} ${Math.abs(N * dp).toFixed(2)} = ${rate.toFixed(2)}$.`,
      `The revenue is ${rate >= 0 ? 'increasing' : 'decreasing'} at about \\$${Math.abs(rate).toFixed(2)} per week${rate < 0 ? ' (the answer is negative)' : ''}.`,
    ],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 4.3 — The chain rule
// ---------------------------------------------------------------------------

const CHAIN_HINTS = ['Identify the inside function $u = g(x)$ and the outside function.', "Chain rule: $\\dfrac{dy}{dx} = \\dfrac{dy}{du}\\cdot\\dfrac{du}{dx}$ — differentiate the outside (leaving the inside alone), then multiply by the derivative of the inside."];

/** A positive-definite inner polynomial (positive for x > 0) for roots. */
function positiveInner(rng: Rng): P {
  const kind = rng.int(0, 3);
  if (kind === 0) return [rng.int(1, 9), 0, rng.int(1, 4)];
  if (kind === 1) return [rng.int(1, 9), rng.int(1, 6), 1];
  if (kind === 2) return [rng.int(1, 9), rng.int(1, 5)];
  return [rng.int(1, 9), 0, 0, rng.int(1, 3)];
}

/** (inner)^m in LaTeX and text, with roots for 1/2, 1/3 and 2/3. */
function innerPow(iT: string, iX: string, m: number): [string, string] {
  if (m === 1) return [`(${iT})`, `(${iX})`];
  if (m === 1 / 2) return [`\\sqrt{${iT}}`, `sqrt(${iX})`];
  if (m === 1 / 3) return [`\\sqrt[3]{${iT}}`, `cbrt(${iX})`];
  if (m === 2 / 3) return [`\\sqrt[3]{(${iT})^{2}}`, `cbrt((${iX})^2)`];
  if (Number.isInteger(m)) return [`(${iT})^{${m}}`, `(${iX})^${m}`];
  return [`(${iT})^{${expStr(m)}}`, `(${iX})^(${expStr(m)})`];
}

/** The derivative of c·(inner)^e, simplified: K·D(x)·(inner)^(e-1) with D primitive. */
function powerChain(c: number, inner: P, e: number, x: string): { dTex: string; dTxt: string } {
  const di = pder(inner);
  let g = Math.abs(pcontent(di)) || 1;
  if (di[di.length - 1] < 0) g = -g;
  const D = pscale(di, 1 / g);
  const K = c * e * g;
  const Kf = toFrac(K, 1000)!;
  const mono = pterms(D) === 1;
  const deg = D.length - 1;
  const iT = ptex(inner, x);
  const iX = ptxt(inner, x);
  const ne = e - 1;
  const sign = Kf.n < 0 ? '-' : '';
  const absN = Math.abs(Kf.n);
  // The numerator factor absN·D as a leading factor (followed by more) or standing alone.
  const leadT = (alone: boolean): string => {
    if (mono) return deg === 0 ? (alone || absN !== 1 ? `${absN}` : '') : monoTex(absN, deg, x);
    return `${absN === 1 ? '' : absN}${alone && absN === 1 ? ptex(D, x) : `(${ptex(D, x)})`}`;
  };
  const leadX = (alone: boolean): string => {
    if (mono) return deg === 0 ? (alone || absN !== 1 ? `${absN}` : '') : monoTxt(absN, deg, x);
    return `${absN === 1 ? '' : absN}${alone && absN === 1 ? ptxt(D, x) : `(${ptxt(D, x)})`}`;
  };
  if (ne === 0) {
    if (Kf.d === 1) return { dTex: `${sign}${leadT(true)}`, dTxt: `${sign}${leadX(true)}` };
    return { dTex: `${sign}\\dfrac{${leadT(true)}}{${Kf.d}}`, dTxt: `${sign}${fracX(leadX(true), `${Kf.d}`)}` };
  }
  if (ne > 0) {
    const [pT, pX] = innerPow(iT, iX, ne);
    if (Kf.d === 1) return { dTex: `${sign}${leadT(false)}${pT}`, dTxt: `${sign}${leadX(false)}${pX}` };
    return { dTex: `${sign}\\dfrac{${leadT(false)}${pT}}{${Kf.d}}`, dTxt: `${sign}${leadX(false)}${pX}/${Kf.d}` };
  }
  const [pT, pX] = innerPow(iT, iX, -ne);
  const denT = `${Kf.d === 1 ? '' : Kf.d}${pT}`;
  const denX = Kf.d === 1 ? pX : `(${Kf.d}${pX})`;
  return { dTex: `${sign}\\dfrac{${leadT(true)}}{${denT}}`, dTxt: `${sign}${wrapX(leadX(true))}/${denX}` };
}

/** Steps for y = c(inner)^e. */
function chainSteps(n: Fn, c: number, inner: P, e: number, shown: string): { steps: string[]; dTex: string; dTxt: string } {
  const x = n.v;
  const iT = ptex(inner, x);
  const di = pder(inner);
  const r = powerChain(c, inner, e, x);
  const steps: string[] = [];
  const expForm = `${cf(c)}(${iT})^{${expStr(e)}}`;
  if (shown.replace(/\s/g, '') !== expForm.replace(/\s/g, '')) steps.push(`Write the function as a power: $${fnOf(n)} = ${expForm}$.`);
  steps.push(`The inside function is $u = ${iT}$, with $\\dfrac{du}{d${x}} = ${ptex(di, x)}$; the outside function is $${cf(c)}u^{${expStr(e)}}$.`);
  steps.push(`Chain rule: $${dOf(n)} = ${tn(c * e) === '1' ? '' : tn(c * e) === '-1' ? '-' : tn(c * e)}(${iT})^{${expStr(e - 1)}}\\cdot ${wrapT(ptex(di, x))}$.`);
  steps.push(`Simplify: $${dOf(n)} = ${r.dTex}$.`);
  return { steps, dTex: r.dTex, dTxt: r.dTxt };
}

/** LaTeX for c(inner)^e as a student would see it: roots and reciprocals where natural. */
function chainShown(c: number, inner: P, e: number, x: string): string {
  const iT = ptex(inner, x);
  if (e === 1 / 2) return `${cf(c)}\\sqrt{${iT}}`;
  if (e === 1 / 3) return `${cf(c)}\\sqrt[3]{${iT}}`;
  if (e === 2 / 3) return `${cf(c)}\\sqrt[3]{(${iT})^{2}}`;
  if (e === -1 / 2) return fracT(tn(c), `\\sqrt{${iT}}`);
  if (e < 0 && Number.isInteger(e)) return fracT(tn(c), e === -1 ? iT : `(${iT})^{${-e}}`);
  return `${cf(c)}(${iT})^{${expStr(e)}}`;
}

const chainRule = skill({
  id: 'm31-chain-rule',
  name: 'The chain rule',
  description: 'Differentiate composite functions, including powers and roots of polynomials, nested functions and combinations with the product and quotient rules.',
  outcomes: ['D2'],
  lessonId: 'm31-4-3',
  gen(rng, d): GenOutput {
    if (d === 1) {
      const kind = rng.weighted([['linear', 3], ['quad', 2], ['value', 2]] as const);
      const n = pickName(rng, kind === 'value');
      const x = n.v;
      if (kind === 'value') {
        const a = rng.chance(0.75) ? rng.int(1, 4) : -rng.int(1, 4);
        const k = rng.intExcept(-3, 3, [0]);
        const t = rng.pick([-2, -1, 1, 2]);
        const b = t - a * k;
        const e = rng.int(3, 6);
        const inner = [b, a];
        const w = chainSteps(n, 1, inner, e, chainShown(1, inner, e, x));
        const val = e * a * t ** (e - 1);
        const at = dAt(n, `${k}`);
        return {
          prompt: `Given $${fnOf(n)} = ${chainShown(1, inner, e, x)}$, find $${at}$.`,
          parts: [numPart(val, { label: `$${at} =$` })],
          hints: CHAIN_HINTS,
          solution: [...w.steps, `At $${x} = ${k}$ the inside is $${ptex(inner, x).replace(new RegExp(x, 'g'), `(${k})`)} = ${t}$, so $${at} = ${tn(e * a)}(${t})^{${e - 1}} = ${tn(val)}$.`, `So $${at} = ${tn(val)}$.`],
        };
      }
      const lead = (hi: number) => (rng.chance(0.75) ? rng.int(1, hi) : -rng.int(1, hi));
      const inner = kind === 'linear' ? [rng.nonZero(-9, 9), lead(6)] : [rng.nonZero(-9, 9), 0, lead(4)];
      const e = kind === 'linear' ? rng.pick([2, 3, 4, 5, 6, 7, 8, -1, -2]) : rng.pick([2, 3, 4, 5, 6]);
      const c = rng.chance(0.3) ? rng.nonZero(-4, 4) : 1;
      const shown = e < 0 ? chainShown(c, inner, e, x) : `${cf(c)}(${ptex(inner, x)})^{${e}}`;
      const w = chainSteps(n, c, inner, e, shown);
      return {
        prompt: askDerivPrompt(rng, n, shown),
        parts: [derivPart(n, w.dTxt)],
        hints: CHAIN_HINTS,
        solution: [...w.steps, `So $${dOf(n)} = ${w.dTex}$.`],
      };
    }

    if (d === 2) {
      const kind = rng.weighted([['root', 3], ['recip', 2], ['poly', 2], ['sqrtValue', 2], ['table', 2]] as const);
      if (kind === 'table') return chainTable(rng, false);
      const n = pickName(rng, kind === 'sqrtValue');
      const x = n.v;
      if (kind === 'sqrtValue') {
        const trip = rng.pick([
          [3, 16, 5],
          [4, 9, 5],
          [6, 64, 10],
          [8, 36, 10],
          [5, 144, 13],
          [12, 25, 13],
          [2, 5, 3],
          [1, 8, 3],
          [2, 12, 4],
          [1, 3, 2],
        ]);
        const [k, c, r] = rng.chance(0.4) ? [-trip[0], trip[1], trip[2]] : trip;
        const m = rng.pick([1, 1, 2, 3]);
        const inner = [c, 0, 1];
        const shown = chainShown(m, inner, 1 / 2, x);
        const w = chainSteps(n, m, inner, 1 / 2, shown);
        const val = (m * k) / r;
        const at = dAt(n, `${k}`);
        return {
          prompt: `Given $${fnOf(n)} = ${shown}$, find $${at}$.`,
          parts: [numPart(val, { label: `$${at} =$` })],
          hints: CHAIN_HINTS,
          solution: [...w.steps, `Substitute $${x} = ${k}$: $${at} = \\dfrac{${m === 1 ? '' : m}${bn(k)}}{\\sqrt{${bn(k)}^{2} + ${c}}} = \\dfrac{${m * k}}{\\sqrt{${k * k + c}}} = ${tn(val)}$.`, `So $${at} = ${tn(val)}$.`],
        };
      }
      let inner: P;
      let e: number;
      let c = 1;
      if (kind === 'root') {
        inner = positiveInner(rng);
        e = rng.pick([1 / 2, 1 / 2, 1 / 3, 2 / 3, 3 / 2]);
        c = rng.pick([1, 1, 2, 3, 4, 6]);
      } else if (kind === 'recip') {
        inner = rng.chance(0.5) ? [rng.nonZero(-9, 9), rng.nonZero(-5, 5)] : [rng.int(1, 9), 0, rng.int(1, 3)];
        e = rng.pick([-1, -2, -3, -4, -1 / 2]);
        if (e === -1 / 2) inner = positiveInner(rng);
        c = rng.nonZero(-8, 8);
      } else {
        inner = randPoly(rng, 3, 3, -6, 6);
        if (inner[0] === 0) inner[0] = rng.nonZero(-6, 6);
        if (inner[3] < 0 && rng.chance(0.7)) inner = pscale(inner, -1);
        e = rng.int(2, 5);
      }
      const shown = chainShown(c, inner, e, x);
      const w = chainSteps(n, c, inner, e, shown);
      return {
        prompt: askDerivPrompt(rng, n, shown),
        parts: [derivPart(n, w.dTxt)],
        hints: [CHAIN_HINTS[0], kind === 'poly' ? CHAIN_HINTS[1] : `Write the root or reciprocal as a power first, e.g. $\\sqrt{u} = u^{1/2}$ and $\\dfrac{1}{u^2} = u^{-2}$, then use the chain rule.`],
        solution: [...w.steps, `So $${dOf(n)} = ${w.dTex}$.`],
      };
    }

    // d === 3
    const kind = rng.weighted([['productChain', 3], ['quotientChain', 2], ['nested', 2], ['table', 2], ['applied', 2]] as const);
    if (kind === 'table') return chainTable(rng, true);
    if (kind === 'applied') return appliedChain(rng);
    const n = pickName(rng);
    const x = n.v;
    if (kind === 'productChain') {
      const m = rng.int(1, 3);
      const a = rng.nonZero(-4, 4);
      const b = rng.nonZero(-6, 6);
      const e = rng.int(2, 5);
      // f = x^m (ax + b)^e, f' = x^(m-1)(ax + b)^(e-1) [ (m + e) a x + m b ]
      const inner = [b, a];
      const iT = ptex(inner, x);
      const iX = ptxt(inner, x);
      const brack = [m * b, (m + e) * a];
      const g = Math.abs(pcontent(brack)) * (brack[1] < 0 ? -1 : 1);
      const br = pscale(brack, 1 / g);
      const xPow = (p: number, t: boolean) => (p === 0 ? '' : p === 1 ? x : t ? `${x}^{${p}}` : `${x}^${p}`);
      const pw = (p: number, t: boolean) => (p === 1 ? (t ? `(${iT})` : `(${iX})`) : t ? `(${iT})^{${p}}` : `(${iX})^${p}`);
      const dTex = `${cf(g)}${xPow(m - 1, true)}${pw(e - 1, true)}(${ptex(br, x)})`;
      const dTxt = `${cft(g)}${xPow(m - 1, false)}${m > 1 ? ' ' : ''}${pw(e - 1, false)}(${ptxt(br, x)})`;
      const fTex = `${xPow(m, true)}(${iT})^{${e}}`;
      return {
        prompt: askDerivPrompt(rng, n, fTex),
        parts: [derivPart(n, dTxt)],
        hints: ['This is a product, and one factor needs the chain rule.', `Use $u = ${xPow(m, true)}$ and $v = (${iT})^{${e}}$, with $v' = ${cf(e * a)}${pw(e - 1, true)}$ by the chain rule. Then factor out common factors.`],
        solution: [
          `Let $u = ${xPow(m, true)}$ and $v = (${iT})^{${e}}$. Then $u' = ${monoTex(m, m - 1, x)}$ and, by the chain rule, $v' = ${e}${pw(e - 1, true)}\\cdot ${bn(a)} = ${cf(e * a)}${pw(e - 1, true)}$.`,
          `Product rule: $${dOf(n)} = ${m === 1 ? '' : monoTex(m, m - 1, x)}(${iT})^{${e}} ${e * a < 0 ? '-' : '+'} ${monoTex(Math.abs(e * a), m, x)}${pw(e - 1, true)}$.`,
          `Factor out $${xPow(m - 1, true)}${pw(e - 1, true)}$: $${dOf(n)} = ${xPow(m - 1, true)}${pw(e - 1, true)}\\left[${m === 1 ? '' : m}(${iT}) ${e * a < 0 ? '-' : '+'} ${monoTex(Math.abs(e * a), 1, x)}\\right] = ${dTex}$.`,
          `So $${dOf(n)} = ${dTex}$.`,
        ],
      };
    }
    if (kind === 'quotientChain') {
      if (rng.chance(0.5)) {
        // x / sqrt(x^2 + c) → c / (x^2 + c)^(3/2)
        const c = rng.int(1, 9);
        const k = rng.pick([1, 1, 2, 3]);
        const iT = `${x}^{2} + ${c}`;
        const dTex = `\\dfrac{${k * c}}{(${iT})^{3/2}}`;
        const dTxt = `${k * c}/(${x}^2 + ${c})^(3/2)`;
        return {
          prompt: askDerivPrompt(rng, n, `\\dfrac{${k === 1 ? '' : k}${x}}{\\sqrt{${iT}}}`),
          parts: [derivPart(n, dTxt)],
          hints: ['Use the quotient rule; the derivative of the denominator needs the chain rule.', `$\\dfrac{d}{d${x}}\\sqrt{${iT}} = \\dfrac{${x}}{\\sqrt{${iT}}}$. Multiply the numerator and denominator by $\\sqrt{${iT}}$ to simplify.`],
          solution: [
            `Let $u = ${k === 1 ? '' : k}${x}$ and $v = \\sqrt{${iT}}$. Then $u' = ${k}$ and, by the chain rule, $v' = \\dfrac{2${x}}{2\\sqrt{${iT}}} = \\dfrac{${x}}{\\sqrt{${iT}}}$.`,
            `Quotient rule: $${dOf(n)} = \\dfrac{${k === 1 ? '' : k}\\sqrt{${iT}} - ${k === 1 ? '' : k}${x}\\cdot\\dfrac{${x}}{\\sqrt{${iT}}}}{${iT}}$.`,
            `Multiply the numerator and denominator by $\\sqrt{${iT}}$: $${dOf(n)} = \\dfrac{${k === 1 ? '' : k}(${iT}) - ${k === 1 ? '' : k}${x}^{2}}{(${iT})\\sqrt{${iT}}} = \\dfrac{${k * c}}{(${iT})^{3/2}}$.`,
            `So $${dOf(n)} = ${dTex}$.`,
          ],
        };
      }
      // (x + a)^2 / (x + b) → (x + a)(x + 2b - a) / (x + b)^2
      const a = rng.nonZero(-5, 5);
      let b = rng.nonZero(-5, 5);
      while (b === a) b = rng.nonZero(-5, 5);
      const A = ptex([a, 1], x);
      const B = ptex([b, 1], x);
      const C = ptex([2 * b - a, 1], x);
      const dTex = `\\dfrac{(${A})(${C})}{(${B})^{2}}`;
      const dTxt = `(${ptxt([a, 1], x)})(${ptxt([2 * b - a, 1], x)})/(${ptxt([b, 1], x)})^2`;
      return {
        prompt: askDerivPrompt(rng, n, `\\dfrac{(${A})^{2}}{${B}}`),
        parts: [derivPart(n, dTxt)],
        hints: ['Use the quotient rule; the numerator needs the chain rule.', `$\\dfrac{d}{d${x}}(${A})^{2} = 2(${A})$. Factor $(${A})$ out of the numerator.`],
        solution: [
          `Let $u = (${A})^{2}$ and $v = ${B}$. Then $u' = 2(${A})$ by the chain rule, and $v' = 1$.`,
          `Quotient rule: $${dOf(n)} = \\dfrac{2(${A})(${B}) - (${A})^{2}}{(${B})^{2}}$.`,
          `Factor out $(${A})$: $${dOf(n)} = \\dfrac{(${A})\\left[2(${B}) - (${A})\\right]}{(${B})^{2}} = ${dTex}$.`,
          `So $${dOf(n)} = ${dTex}$.`,
        ],
      };
    }
    // nested
    if (rng.chance(0.5)) {
      // ((ax + b)^2 + c)^3 → 6a(ax + b)((ax + b)^2 + c)^2
      const a = rng.nonZero(-3, 3);
      const b = rng.nonZero(-5, 5);
      const c = rng.nonZero(-6, 6);
      const e = rng.int(2, 4);
      const L = ptex([b, a], x);
      const Lx = ptxt([b, a], x);
      const inner = `(${L})^{2} ${c < 0 ? '-' : '+'} ${Math.abs(c)}`;
      const innerX = `(${Lx})^2 ${c < 0 ? '-' : '+'} ${Math.abs(c)}`;
      const k = 2 * e * a;
      const dTex = `${cf(k)}(${L})\\left[${inner}\\right]${e - 1 === 1 ? '' : `^{${e - 1}}`}`;
      const dTxt = `${cft(k)}(${Lx})(${innerX})${e - 1 === 1 ? '' : `^${e - 1}`}`;
      return {
        prompt: askDerivPrompt(rng, n, `\\left[${inner}\\right]^{${e}}`),
        parts: [derivPart(n, dTxt)],
        hints: ['There are three layers: a power of (a square plus a constant), and the square is of a linear function.', 'Apply the chain rule twice, working from the outside in.'],
        solution: [
          `Outside layer: the derivative of $u^{${e}}$ is $${e}u^{${e - 1}}$, so start with $${e}\\left[${inner}\\right]${e - 1 === 1 ? '' : `^{${e - 1}}`}$ and multiply by the derivative of the inside.`,
          `The inside is $${inner}$; by the chain rule again its derivative is $2(${L})\\cdot ${bn(a)}$.`,
          `Multiply: $${dOf(n)} = ${e}\\left[${inner}\\right]${e - 1 === 1 ? '' : `^{${e - 1}}`}\\cdot 2(${L})${bn(a)}$.`,
          `So $${dOf(n)} = ${dTex}$.`,
        ],
      };
    }
    // sqrt(x + sqrt(x)) style: sqrt(a x^2 + sqrt(x))? keep sqrt(x^2 + k sqrt(x))
    const k = rng.pick([1, 2, 4]);
    const m = rng.pick([1, 2]);
    const inner = `${m === 1 ? '' : m}${x} + ${k === 1 ? '' : k}\\sqrt{${x}}`;
    const innerX = `${m === 1 ? '' : m}${x} + ${k === 1 ? '' : k}sqrt(${x})`;
    // d/dx inner = m + k/(2√x) = (2m√x + k)/(2√x); f' = (2m√x + k)/(4√x √inner)
    const numT = `${2 * m}\\sqrt{${x}} + ${k}`;
    const numX = `${2 * m}sqrt(${x}) + ${k}`;
    const dTex = `\\dfrac{${numT}}{4\\sqrt{${x}}\\,\\sqrt{${inner}}}`;
    const dTxt = `(${numX})/(4sqrt(${x}) sqrt(${innerX}))`;
    return {
      prompt: askDerivPrompt(rng, n, `\\sqrt{${inner}}`),
      parts: [derivPart(n, dTxt)],
      hints: ['The outside function is a square root; the inside contains another square root.', `Use $\\dfrac{d}{d${x}}\\sqrt{u} = \\dfrac{u'}{2\\sqrt{u}}$ with $u = ${inner}$, and $\\dfrac{d}{d${x}}\\sqrt{${x}} = \\dfrac{1}{2\\sqrt{${x}}}$.`],
      solution: [
        `Let $u = ${inner}$. Then $u' = ${m} + \\dfrac{${k}}{2\\sqrt{${x}}} = \\dfrac{${numT}}{2\\sqrt{${x}}}$.`,
        `Chain rule: $${dOf(n)} = \\dfrac{u'}{2\\sqrt{u}} = \\dfrac{${numT}}{2\\sqrt{${x}}}\\cdot\\dfrac{1}{2\\sqrt{${inner}}}$.`,
        `So $${dOf(n)} = ${dTex}$.`,
      ],
    };
  },
});

/** Chain rule with a table of values: h(x) = f(g(x)), [f(x)]^n, f(x^2), √f(x). */
function chainTable(rng: Rng, hard: boolean): GenOutput {
  const a = rng.int(1, 3);
  const b = rng.intExcept(0, 5, [a]);
  const xs = [a, b].sort((p, q) => p - q);
  const vals = new Map<number, number[]>();
  for (const x of xs) vals.set(x, [rng.nonZero(-5, 5), rng.nonZero(-5, 5), rng.nonZero(-5, 5), rng.nonZero(-5, 5)]);
  const kind = hard ? rng.pick(['gof', 'fPow', 'fx2', 'sqrtF'] as const) : rng.pick(['fog', 'gof', 'fPow'] as const);
  let hTex = '';
  let steps: string[] = [];
  let val = 0;
  let at = a;
  if (kind === 'fog' || kind === 'gof') {
    // inner(a) = b, outer'(b) is read from the other row.
    const [inner, outer] = kind === 'fog' ? ['g', 'f'] : ['f', 'g'];
    const ii = inner === 'f' ? 0 : 2;
    const oi = outer === 'f' ? 0 : 2;
    vals.get(a)![ii] = b;
    const innerVal = b;
    const dInner = vals.get(a)![ii + 1];
    const dOuter = vals.get(b)![oi + 1];
    val = dOuter * dInner;
    hTex = `${outer}(${inner}(x))`;
    steps = [
      `Chain rule: $h'(x) = ${outer}'(${inner}(x))\\cdot ${inner}'(x)$, so $h'(${a}) = ${outer}'(${inner}(${a}))\\cdot ${inner}'(${a})$.`,
      `From the row $x = ${a}$: $${inner}(${a}) = ${innerVal}$ and $${inner}'(${a}) = ${dInner}$.`,
      `From the row $x = ${b}$: $${outer}'(${b}) = ${dOuter}$.`,
      `$h'(${a}) = ${outer}'(${b})\\cdot ${inner}'(${a}) = ${bn(dOuter)}${bn(dInner)} = ${val}$.`,
    ];
  } else if (kind === 'fPow') {
    const e = rng.int(2, 4);
    const [f, df] = vals.get(a)!;
    val = e * f ** (e - 1) * df;
    hTex = `[f(x)]^{${e}}`;
    steps = [
      `Chain rule with the outside function $u^{${e}}$: $h'(x) = ${e}[f(x)]^{${e - 1}}\\cdot f'(x)$.`,
      `From the row $x = ${a}$: $f(${a}) = ${f}$ and $f'(${a}) = ${df}$.`,
      `$h'(${a}) = ${e}${bn(f)}^{${e - 1}}${bn(df)} = ${val}$.`,
    ];
  } else if (kind === 'fx2') {
    // h(x) = f(x^2) at x = 1 or 2 with x^2 in the table.
    at = rng.pick([1, 2]);
    const sq = at * at;
    const rows = at === 1 ? [1, rng.intExcept(2, 5, [1])] : [2, 4];
    const vv = new Map<number, number[]>();
    for (const x of rows) vv.set(x, [rng.nonZero(-5, 5), rng.nonZero(-5, 5), rng.nonZero(-5, 5), rng.nonZero(-5, 5)]);
    const dfsq = vv.get(sq)![1];
    val = dfsq * 2 * at;
    hTex = 'f(x^{2})';
    steps = [
      `Chain rule with the inside function $x^2$: $h'(x) = f'(x^{2})\\cdot 2x$.`,
      `At $x = ${at}$: $h'(${at}) = f'(${sq})\\cdot 2(${at})$.`,
      `From the row $x = ${sq}$: $f'(${sq}) = ${dfsq}$, so $h'(${at}) = ${bn(dfsq)}(${2 * at}) = ${val}$.`,
    ];
    const fig = valueTable(['x', 'f(x)', "f'(x)", 'g(x)', "g'(x)"], rows.sort((p, q) => p - q).map((x) => [x, ...vv.get(x)!]));
    return {
      prompt: `The table gives values of the functions $f$ and $g$ and their derivatives. If $h(x) = ${hTex}$, find $h'(${at})$.`,
      figure: fig,
      parts: [numPart(val, { label: `$h'(${at}) =$` })],
      hints: ['$h$ is a composition: the inside function is $x^2$.', 'By the chain rule $h\'(x) = f\'(x^2)\\cdot 2x$ — read $f\'$ at $x^2$, not at $x$.'],
      solution: [...steps, `So $h'(${at}) = ${val}$.`],
    };
  } else {
    const r = rng.int(1, 4);
    vals.get(a)![0] = r * r;
    const df = vals.get(a)![1];
    val = df / (2 * r);
    hTex = '\\sqrt{f(x)}';
    steps = [
      `Chain rule with the outside function $\\sqrt{u}$: $h'(x) = \\dfrac{f'(x)}{2\\sqrt{f(x)}}$.`,
      `From the row $x = ${a}$: $f(${a}) = ${r * r}$ and $f'(${a}) = ${df}$.`,
      `$h'(${a}) = \\dfrac{${df}}{2\\sqrt{${r * r}}} = \\dfrac{${df}}{${2 * r}} = ${tn(val)}$.`,
    ];
  }
  const fig = valueTable(['x', 'f(x)', "f'(x)", 'g(x)', "g'(x)"], xs.map((x) => [x, ...vals.get(x)!]));
  return {
    prompt: `The table gives values of the functions $f$ and $g$ and their derivatives. If $h(x) = ${hTex}$, find $h'(${at})$.`,
    figure: fig,
    parts: [numPart(val, { label: `$h'(${at}) =$` })],
    hints: [CHAIN_HINTS[0], kind === 'fog' || kind === 'gof' ? 'The outside derivative is evaluated at the value of the inside function, which may be in a different row of the table.' : CHAIN_HINTS[1]],
    solution: [...steps, `So $h'(${at}) = ${tn(val)}$.`],
  };
}

/** Applied chain rule problems. */
function appliedChain(rng: Rng): GenOutput {
  const ctx = rng.pick(['sound', 'pendulum', 'chem'] as const);
  if (ctx === 'sound') {
    const [T, root] = rng.pick([
      [16, 17],
      [51, 18],
      [88, 19],
      [-48, 15],
      [127, 20],
    ]);
    const rate = 10 / root;
    const place = rng.pick(['Clearwater', 'Westbury', 'Stonebridge', 'Pinewood']);
    return {
      prompt: `A physics class in ${place} models the speed of sound in air at a temperature of $T$ °C as $v(T) = 20\\sqrt{T + 273}$ m/s. Find $v'(${T})$, the rate of change of the speed with respect to temperature at $${T}$ °C. Give the answer to the nearest hundredth.`,
      parts: [numPart(rate, { label: `$v'(${T}) =$`, decimals: 2, exact: true, suffix: 'm/s per °C' })],
      hints: CHAIN_HINTS,
      solution: [
        `Write $v = 20(T + 273)^{1/2}$. The inside function $T + 273$ has derivative $1$.`,
        `Chain rule: $v'(T) = 20\\cdot\\tfrac{1}{2}(T + 273)^{-1/2}\\cdot 1 = \\dfrac{10}{\\sqrt{T + 273}}$.`,
        `$v'(${T}) = \\dfrac{10}{\\sqrt{${T + 273}}} = \\dfrac{10}{${root}} \\approx ${rate.toFixed(2)}$.`,
        `The speed increases by about $${rate.toFixed(2)}$ m/s for each degree Celsius.`,
      ],
      calculator: true,
    };
  }
  if (ctx === 'pendulum') {
    const [L, s] = rng.pick([
      [2.45, 0.5],
      [0.882, 0.3],
      [1.568, 0.4],
      [3.528, 0.6],
      [0.392, 0.2],
      [4.802, 0.7],
    ]);
    // T = 2π (L/9.8)^(1/2) → T' = π / (9.8 √(L/9.8))
    const rate = Math.PI / (9.8 * s);
    return {
      prompt: `The period of a pendulum of length $L$ metres is modelled by $T(L) = 2\\pi\\sqrt{\\dfrac{L}{9.8}}$ seconds. Find $T'(${fmt(L)})$, the rate of change of the period with respect to the length when $L = ${fmt(L)}$ m. Give the answer to the nearest hundredth.`,
      parts: [numPart(rate, { label: `$T'(${fmt(L)}) =$`, decimals: 2, exact: true, suffix: 's per m' })],
      hints: CHAIN_HINTS,
      solution: [
        `Write $T = 2\\pi\\left(\\dfrac{L}{9.8}\\right)^{1/2}$. The inside function $\\dfrac{L}{9.8}$ has derivative $\\dfrac{1}{9.8}$.`,
        `Chain rule: $T'(L) = 2\\pi\\cdot\\tfrac{1}{2}\\left(\\dfrac{L}{9.8}\\right)^{-1/2}\\cdot\\dfrac{1}{9.8} = \\dfrac{\\pi}{9.8\\sqrt{L/9.8}}$.`,
        `At $L = ${fmt(L)}$: $\\dfrac{L}{9.8} = ${fmt(s * s)}$ and $\\sqrt{${fmt(s * s)}} = ${fmt(s)}$, so $T'(${fmt(L)}) = \\dfrac{\\pi}{9.8(${fmt(s)})} \\approx ${rate.toFixed(2)}$.`,
        `The period grows by about $${rate.toFixed(2)}$ s for each extra metre of length.`,
      ],
      calculator: true,
    };
  }
  const A = rng.pick([40, 80, 160, 120, 60]);
  const T = rng.pick([0.5, 1, 1.5, 2, 3]);
  const base = 2 * T + 1;
  const rate = (-4 * A) / base ** 3;
  return {
    prompt: `The concentration of a cleaning chemical in a water tank $t$ hours after flushing begins is $C(t) = \\dfrac{${A}}{(2t + 1)^{2}}$ mg/L. Find $C'(${fmt(T)})$. Give the answer to the nearest hundredth.`,
    parts: [numPart(rate, { label: `$C'(${fmt(T)}) =$`, decimals: 2, exact: true, suffix: 'mg/L per hour' })],
    hints: CHAIN_HINTS,
    solution: [
      `Write $C(t) = ${A}(2t + 1)^{-2}$. The inside function $2t + 1$ has derivative $2$.`,
      `Chain rule: $C'(t) = ${A}(-2)(2t + 1)^{-3}\\cdot 2 = -\\dfrac{${4 * A}}{(2t + 1)^{3}}$.`,
      `$C'(${fmt(T)}) = -\\dfrac{${4 * A}}{(${fmt(base)})^{3}} = -\\dfrac{${4 * A}}{${fmt(base ** 3)}} \\approx ${rate.toFixed(2)}$.`,
      `The concentration is falling at about $${Math.abs(rate).toFixed(2)}$ mg/L per hour (the answer is negative).`,
    ],
    calculator: true,
  };
}

export const RULES_SKILLS: SkillDef[] = [powerRule, productQuotient, chainRule];
