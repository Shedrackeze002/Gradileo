/** Math 20-1 Unit 6 — Rational Expressions and Equations (AN4, AN5, AN6). */
import { mc, niceNum, numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { fmt, gcd, isPerfectSquare, lcm, toFrac } from '../../../math/numbers.ts';
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
const pscale = (p: P, k: number): P => trimP(p.map((c) => c * k));
const peval = (p: P, x: number) => p.reduce((s, c, i) => s + c * x ** i, 0);
const pprod = (ps: P[]): P => ps.reduce(pmul, [1]);
const isZeroP = (p: P) => p.every((c) => c === 0);
const contentP = (p: P) => p.reduce((g, c) => gcd(g, c), 0);

/** LaTeX for a polynomial, highest power first (lowest first with `asc`, as in 16 − x²). */
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

/** The factor with this rational root, e.g. 3/2 → 2x − 3. */
function factorOfRoot(r: number): F {
  const fr = toFrac(r, 100)!;
  return { a: fr.d, b: -fr.n };
}

function groupFactors(fs: F[]): Array<{ f: F; n: number }> {
  const groups: Array<{ f: F; n: number }> = [];
  for (const f of fs) {
    const g = groups.find((q) => fKey(q.f) === fKey(f));
    if (g) g.n++;
    else groups.push({ f, n: 1 });
  }
  // A monomial factor (x) is written first: 3x(x − 2).
  return groups.sort((p, q) => (p.f.b === 0 ? 0 : 1) - (q.f.b === 0 ? 0 : 1));
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
function solveFactorsText(fs: F[], v: string): string {
  const uniq: F[] = [];
  for (const f of fs) if (!uniq.some((g) => fKey(g) === fKey(f))) uniq.push(f);
  if (uniq.length === 1) return `$${ptex(fP(uniq[0]), v)} = 0$ gives $${v} = ${niceNum(fRoot(uniq[0]))}$.`;
  return `${uniq.map((f) => `$${ptex(fP(f), v)} = 0$`).join(' or ')}, so ${uniq.map((f) => `$${v} = ${niceNum(fRoot(f))}$`).join(' or ')}.`;
}

const VARS = ['x', 'x', 'x', 'x', 't', 'a', 'm', 'n'];
const pickVar = (rng: Rng) => rng.pick(VARS);
const npvPart = (vals: number[]): Part => part({ kind: 'numbers', values: vals }, { label: 'Non-permissible values', placeholder: 'e.g. 3, -2' });

/** Distinct non-zero integers. */
function distinctInts(rng: Rng, n: number, lo: number, hi: number, exclude: number[] = []): number[] {
  const pool: number[] = [];
  for (let i = lo; i <= hi; i++) if (i !== 0 && !exclude.includes(i)) pool.push(i);
  return rng.sample(pool, n);
}

// ---------------------------------------------------------------------------
// 6.1 — Non-permissible values
// ---------------------------------------------------------------------------

function randomNumerator(rng: Rng, v: string): string {
  const k = rng.int(0, 2);
  if (k === 0) return `${rng.nonZero(-9, 9)}`;
  if (k === 1) return ptex([rng.nonZero(-9, 9), 1], v);
  return ptex([rng.nonZero(-9, 9), rng.int(2, 5)], v);
}

const nonPermissible = skill({
  id: 'm201-nonpermissible',
  name: 'Non-permissible values',
  description: 'Find the values of the variable that make a denominator zero, factoring the denominator first when needed.',
  outcomes: ['AN4'],
  lessonId: 'm201-6-1',
  gen(rng, d) {
    const v = pickVar(rng);
    const numer = randomNumerator(rng, v);
    type Kind = 'linear' | 'monomial' | 'factored' | 'trinomial' | 'dos' | 'gcf' | 'none' | 'nonmonic' | 'dosfrac' | 'cubic' | 'sum' | 'noneDisc';
    const kind: Kind =
      d === 1
        ? rng.weighted<Kind>([['linear', 3], ['monomial', 1], ['factored', 2]])
        : d === 2
          ? rng.weighted<Kind>([['trinomial', 3], ['dos', 2], ['gcf', 2], ['none', 1]])
          : rng.weighted<Kind>([['nonmonic', 3], ['dosfrac', 2], ['cubic', 2], ['sum', 2], ['noneDisc', 1]]);
    let expr = '';
    let vals: number[] = [];
    const steps: string[] = [];
    const frac = (den: string) => `\\dfrac{${numer}}{${den}}`;
    if (kind === 'linear') {
      const r = rng.nonZero(-9, 9);
      const a = rng.pick([1, 1, 2, 3, 4, 5]);
      const den = ptex([-a * r, a], v);
      expr = frac(den);
      vals = [r];
      steps.push(`The expression is undefined when its denominator is $0$, so solve $${den} = 0$.`);
      steps.push(a === 1 ? `$${v} = ${r}$` : `$${a}${v} = ${a * r}$, so $${v} = ${r}$.`);
    } else if (kind === 'monomial') {
      const c = rng.int(2, 9);
      const m = rng.int(1, 3);
      const den = `${c}${v}${m > 1 ? `^{${m}}` : ''}`;
      expr = frac(den);
      vals = [0];
      steps.push(`The expression is undefined when its denominator is $0$: solve $${den} = 0$.`);
      steps.push(`A product is $0$ only when a factor is $0$, and $${c} \\ne 0$, so $${v} = 0$.`);
    } else if (kind === 'factored' || kind === 'gcf' || kind === 'trinomial' || kind === 'dos' || kind === 'cubic') {
      let fs: F[];
      let c = 1;
      if (kind === 'factored') {
        if (rng.chance(0.5)) fs = distinctInts(rng, 2, -9, 9).map(xm);
        else {
          c = rng.int(2, 6);
          fs = [X, xm(rng.nonZero(-9, 9))];
        }
      } else if (kind === 'trinomial') {
        let rs = distinctInts(rng, 2, -9, 9);
        while (rs[0] + rs[1] === 0) rs = distinctInts(rng, 2, -9, 9);
        fs = rs.map(xm);
      } else if (kind === 'dos') {
        const s = rng.int(1, 10);
        fs = [xm(s), xm(-s)];
      } else if (kind === 'gcf') {
        c = rng.int(2, 5);
        fs = rng.chance(0.5) ? [X, xm(rng.nonZero(-9, 9))] : distinctInts(rng, 2, -7, 7).map(xm);
      } else {
        const rs = distinctInts(rng, 2, -6, 6);
        fs = [X, ...rs.map(xm)];
      }
      vals = rootsOf(fs);
      const denP = pscale(pprod(fs.map(fP)), c);
      const den = kind === 'factored' ? prodTex(c, fs, v) : ptex(denP, v);
      expr = frac(den);
      if (kind === 'factored') steps.push(`The expression is undefined when the denominator $${den}$ is $0$. A product is $0$ when any factor is $0$.`);
      else {
        steps.push(`The expression is undefined when the denominator is $0$. Factor it${kind === 'gcf' || kind === 'cubic' ? ' (common factor first)' : ''}: $${den} = ${prodTex(c, fs, v)}$.`);
      }
      steps.push(solveFactorsText(fs, v));
    } else if (kind === 'none') {
      const k = rng.int(1, 16);
      const den = ptex([k, 0, 1], v);
      expr = frac(den);
      vals = [];
      steps.push(`Set the denominator equal to $0$: $${den} = 0$ means $${v}^2 = ${-k}$.`);
      steps.push(`A square is never negative, so $${den} \\ge ${k}$ for every real $${v}$: the denominator is never $0$.`);
    } else if (kind === 'noneDisc') {
      const b = rng.nonZero(-6, 6);
      const c = Math.floor((b * b) / 4) + rng.int(1, 6);
      const den = ptex([c, b, 1], v);
      expr = frac(den);
      vals = [];
      steps.push(`Try to solve $${den} = 0$. It does not factor, so check the discriminant.`);
      steps.push(`$b^2 - 4ac = ${b * b} - ${4 * c} = ${b * b - 4 * c} < 0$, so the denominator is never $0$.`);
    } else if (kind === 'nonmonic' || kind === 'dosfrac') {
      let fs: F[];
      if (kind === 'nonmonic') {
        const p = rng.int(2, 5);
        let q = rng.nonZero(-7, 7);
        while (gcd(p, q) !== 1) q = rng.nonZero(-7, 7);
        fs = [{ a: p, b: q }, xm(rng.nonZero(-6, 6))];
      } else {
        const p = rng.int(2, 5);
        let q = rng.int(1, 9);
        while (gcd(p, q) !== 1) q = rng.int(1, 9);
        fs = [{ a: p, b: -q }, { a: p, b: q }];
      }
      vals = rootsOf(fs);
      const den = ptex(pprod(fs.map(fP)), v);
      expr = frac(den);
      steps.push(`The expression is undefined when the denominator is $0$. Factor it: $${den} = ${prodTex(1, fs, v)}$.`);
      steps.push(solveFactorsText(fs, v));
    } else {
      // Two terms: every denominator counts.
      const r = rng.nonZero(-8, 8);
      const s = rng.intExcept(1, 8, [Math.abs(r)]);
      const a = rng.int(1, 9);
      const fs2 = [xm(s), xm(-s)];
      const den2 = ptex(pprod(fs2.map(fP)), v);
      expr = `\\dfrac{${a}}{${ptex([-r, 1], v)}} + \\dfrac{${numer}}{${den2}}`;
      vals = rootsOf([xm(r), ...fs2]);
      steps.push(`Every denominator must be non-zero. First: $${ptex([-r, 1], v)} = 0$ gives $${v} = ${r}$.`);
      steps.push(`Second: $${den2} = ${prodTex(1, fs2, v)} = 0$ gives $${v} = ${s}$ or $${v} = ${-s}$.`);
    }
    steps.push(
      vals.length === 1
        ? `The non-permissible value is $${niceNum(vals[0])}$, so ${npvTex(vals, v)}.`
        : vals.length
          ? `The non-permissible values are ${vals.map((x) => `$${niceNum(x)}$`).join(vals.length > 2 ? ', ' : ' and ')}, so ${npvTex(vals, v)}.`
          : 'There are no non-permissible values: the expression is defined for every real number.',
    );
    return {
      prompt: `Find the non-permissible values of $${v}$ for $${expr}$.${d >= 2 ? ' If there are none, type *none*.' : ''}`,
      parts: [npvPart(vals)],
      hints: ['A rational expression is undefined when a denominator equals zero. The numerator does not matter.', d === 1 ? 'Set the denominator equal to zero and solve.' : 'Factor each denominator completely, then set each factor equal to zero.'],
      solution: steps,
      answerDisplay: vals.length ? npvTex(vals, v) : 'none',
    };
  },
});

// ---------------------------------------------------------------------------
// 6.1 — Simplifying rational expressions
// ---------------------------------------------------------------------------

const simplify = skill({
  id: 'm201-rational-simplify',
  name: 'Simplifying rational expressions',
  description: 'Simplify a rational expression by factoring and cancelling common factors, and state its non-permissible values.',
  outcomes: ['AN4'],
  lessonId: 'm201-6-1',
  gen(rng, d) {
    const v = pickVar(rng);
    type Kind = 'monomial' | 'factored' | 'trinomial' | 'dos' | 'gcf' | 'nonmonic' | 'opposite' | 'oppositeGcf';
    const kind: Kind = d === 1 ? rng.pick<Kind>(['monomial', 'factored', 'factored']) : d === 2 ? rng.pick<Kind>(['trinomial', 'dos', 'gcf']) : rng.pick<Kind>(['nonmonic', 'opposite', 'oppositeGcf']);
    let orig: RE;
    let given: string;
    const steps: string[] = [];
    const extra: Option[] = [];
    if (kind === 'monomial') {
      const g = rng.int(2, 6);
      let a1 = rng.int(1, 9);
      let b1 = rng.int(1, 9);
      while (a1 === b1 || gcd(a1, b1) !== 1) {
        a1 = rng.int(1, 9);
        b1 = rng.int(1, 9);
      }
      const [m, n] = rng.sample([1, 2, 3, 4, 5], 2);
      orig = { n: g * a1, d: g * b1, num: Array<F>(m).fill(X), den: Array<F>(n).fill(X) };
      given = `\\dfrac{${prodTex(g * a1, orig.num, v)}}{${prodTex(g * b1, orig.den, v)}}`;
      const k = Math.abs(m - n);
      const xs = Array<F>(k).fill(X);
      const pw = (e: number) => (e === 1 ? v : `${v}^{${e}}`);
      steps.push(`Divide the coefficients by their greatest common factor, $${g}$: $\\dfrac{${g * a1}}{${g * b1}} = ${b1 === 1 ? a1 : `\\dfrac{${a1}}{${b1}}`}$.`);
      steps.push(`Divide the powers by subtracting exponents: $\\dfrac{${pw(m)}}{${pw(n)}} = ${m > n ? pw(k) : `\\dfrac{1}{${pw(k)}}`}$.`);
      extra.push(opt({ n: a1, d: b1, num: m > n ? [] : xs, den: m > n ? xs : [] }, v));
      extra.push(opt({ n: b1, d: a1, num: m > n ? xs : [], den: m > n ? [] : xs }, v));
      extra.push(opt({ n: a1, d: b1, num: Array<F>(m + n).fill(X), den: [] }, v));
    } else if (kind === 'factored') {
      const [p, q, r] = distinctInts(rng, 3, -8, 8);
      const cs = rng.chance(0.4) ? rng.sample([2, 3, 4, 5, 6], 2) : [1, 1];
      orig = { n: cs[0], d: cs[1], num: rng.shuffle([xm(p), xm(q)]), den: rng.shuffle([xm(q), xm(r)]) };
      given = `\\dfrac{${prodTex(cs[0], orig.num, v)}}{${prodTex(cs[1], orig.den, v)}}`;
      steps.push(`The factor $(${ptex(fP(xm(q)), v)})$ appears in the numerator and the denominator. Divide it out.`);
      extra.push(opt(reduceRE({ n: cs[0], d: cs[1], num: [xm(q)], den: [xm(r)] }), v));
      // "Cancelling the x's": (x − p)/(x − r) becomes −p/−r.
      if (cs[0] === 1 && cs[1] === 1) extra.push({ tex: niceNum(p / r), f: () => p / r });
    } else {
      const [s, p, r] = distinctInts(rng, 3, -7, 7);
      let numF: F[];
      let denF: F[];
      let c = 1;
      let sign = 1;
      if (kind === 'trinomial') {
        numF = [xm(s), xm(p)];
        denF = [xm(s), xm(r)];
      } else if (kind === 'dos') {
        const ss = Math.abs(s);
        if (rng.chance(0.5)) {
          numF = [xm(ss), xm(p === -ss ? -p : p)];
        } else {
          c = rng.int(2, 6);
          numF = [xm(ss)];
        }
        denF = [xm(ss), xm(-ss)];
      } else if (kind === 'gcf') {
        c = rng.int(2, 6);
        numF = [xm(s)];
        denF = rng.chance(0.5) ? [X, xm(s)] : [xm(s), xm(r)];
      } else if (kind === 'nonmonic') {
        const a = rng.int(2, 4);
        let b = rng.nonZero(-7, 7);
        while (gcd(a, b) !== 1) b = rng.nonZero(-7, 7);
        numF = [{ a, b }, xm(s)];
        denF = [xm(s), xm(r)];
      } else if (kind === 'opposite') {
        const ss = Math.abs(s);
        numF = [xm(ss), xm(p === -ss ? -p : p)];
        denF = [xm(ss), xm(-ss)];
        sign = -1;
      } else {
        c = rng.int(2, 6);
        numF = [xm(s)];
        denF = [xm(s), xm(r)];
        sign = -1;
      }
      orig = { n: sign * c, d: 1, num: numF, den: denF };
      const numP = pscale(pprod(numF.map(fP)), c);
      const denP = pscale(pprod(denF.map(fP)), sign);
      const denShown = kind === 'opposite' ? ptex(denP, v, true) : ptex(denP, v);
      given = `\\dfrac{${ptex(numP, v)}}{${denShown}}`;
      const facNum = prodTex(c, numF, v);
      if (sign === -1) {
        steps.push(`Factor the numerator: $${ptex(numP, v)} = ${facNum}$.`);
        steps.push(`Factor $-1$ out of the denominator so its factors match: $${denShown} = -${prodTex(1, denF, v)}$.`);
      } else {
        steps.push(`Factor the numerator and the denominator: $\\dfrac{${facNum}}{${prodTex(1, denF, v)}}$.`);
      }
      steps.push(`Divide out the common factor $(${ptex(fP(numF.find((f) => denF.some((g) => fKey(g) === fKey(f)))!), v)})$.`);
      // Cancelling terms instead of factors (x² with x²) is a classic error.
      if (numP.length === 3 && denP.length === 3 && numP[2] === denP[2]) {
        const n2 = numP.slice(0, 2);
        const d2 = denP.slice(0, 2);
        if (!isZeroP(d2) && !isZeroP(n2)) extra.push({ tex: `\\dfrac{${ptex(n2, v)}}{${ptex(d2, v)}}`, f: (x) => peval(n2, x) / peval(d2, x) });
      }
      if (sign === -1) extra.push(opt(negRE(reduceRE(orig)), v));
      if (kind === 'nonmonic') {
        const red = reduceRE(orig);
        extra.push(opt({ ...red, num: red.num.map((f) => ({ a: f.a, b: -f.b })) }, v));
      }
    }
    const correct = reduceRE(orig);
    const vals = rootsOf(orig.den);
    steps.push(`Simplified: $${reTex(correct, v)}$`);
    steps.push(`Non-permissible values come from the **original** denominator, including any cancelled factor: ${npvTex(vals, v)}.`);
    const options = [...extra, opt(flipRE(correct), v), opt(negRootsRE(correct), v), opt(negRE(correct), v), opt({ ...correct, n: Math.sign(correct.n), d: 1 }, v)];
    return {
      prompt: `Simplify $${given}$ and state the non-permissible values.`,
      parts: [part(formChoice(rng, opt(correct, v), options), { label: 'Simplified form' }), npvPart(vals)],
      hints: ['Factor the numerator and the denominator completely, then divide out common **factors** (never single terms).', 'Find the non-permissible values from the original denominator, before you cancel anything.'],
      solution: steps,
      answerDisplay: `$${reTex(correct, v)}$, ${npvTex(vals, v)}`,
    };
  },
});

// ---------------------------------------------------------------------------
// 6.2 — Multiplying and dividing
// ---------------------------------------------------------------------------

interface MD {
  first: RE;
  second: RE;
  op: 'times' | 'div';
  result: RE;
  vals: number[];
}

function buildMD(rng: Rng, d: number): MD {
  for (let t = 0; t < 400; t++) {
    const op: MD['op'] = d === 1 ? (rng.chance(0.3) ? 'div' : 'times') : d === 2 ? rng.pick(['times', 'div'] as const) : rng.chance(0.8) ? 'div' : 'times';
    const roots = distinctInts(rng, 5, -7, 7);
    const pool: F[] = roots.map(xm);
    if (d === 3) {
      const a = rng.int(2, 3);
      let b = rng.nonZero(-5, 5);
      while (gcd(a, b) !== 1) b = rng.nonZero(-5, 5);
      pool[rng.int(0, 4)] = { a, b };
    }
    if (d >= 2 && rng.chance(0.3)) pool[rng.int(0, 4)] = X;
    const sizes = d === 1 ? [rng.int(1, 2), 1, 1, rng.int(1, 2)] : [rng.int(1, 2), rng.int(1, 2), rng.int(1, 2), rng.int(1, 2)];
    const n1 = rng.sample(pool, sizes[0]);
    const d1 = rng.sample(pool.filter((f) => !n1.includes(f)), sizes[1]);
    const n2 = rng.sample(pool, sizes[2]);
    const d2 = rng.sample(pool.filter((f) => !n2.includes(f)), sizes[3]);
    const cpick = () => (rng.chance(d === 1 ? 0.25 : 0.4) ? rng.int(2, 6) : 1);
    const first: RE = { n: cpick(), d: cpick(), num: n1, den: d1 };
    const second: RE = { n: cpick(), d: cpick(), num: n2, den: d2 };
    if (gcd(first.n, first.d) !== 1 || gcd(second.n, second.d) !== 1) continue;
    const combined = op === 'times' ? mulRE(first, second) : mulRE(first, flipRE(second));
    const result = reduceRE(combined);
    const cancelled = combined.num.length - result.num.length;
    if (cancelled < (d === 1 ? 1 : 2)) continue;
    if (result.num.length > 2 || result.den.length > 2 || result.num.length + result.den.length === 0) continue;
    // The question should not be the answer in disguise: something must be left on each side or a constant.
    const vals = rootsOf([...d1, ...d2, ...(op === 'div' ? n2 : [])]);
    return { first, second, op, result, vals };
  }
  throw new Error('buildMD');
}

/** c·(factors), expanded, for a numerator or denominator shown in a prompt. */
const slotTex = (c: number, fs: F[], v: string, expanded: boolean) => (expanded ? ptex(pscale(pprod(fs.map(fP)), c), v) : prodTex(c, fs, v));
const reShow = (r: RE, v: string, expanded: boolean) => `\\dfrac{${slotTex(r.n, r.num, v, expanded)}}{${slotTex(r.d, r.den, v, expanded)}}`;

const multiplyDivide = skill({
  id: 'm201-rational-multiply-divide',
  name: 'Multiplying and dividing rational expressions',
  description: 'Multiply and divide rational expressions by factoring and cancelling, and state all non-permissible values, including those from the divisor’s numerator.',
  outcomes: ['AN5'],
  lessonId: 'm201-6-2',
  gen(rng, d) {
    const v = pickVar(rng);
    const { first, second, op, result, vals } = buildMD(rng, d);
    const expanded = d >= 2;
    const sym = op === 'times' ? '\\times' : '\\div';
    const given = `${reShow(first, v, expanded)} ${sym} ${reShow(second, v, expanded)}`;
    const factored = `${reShow(first, v, false)} ${sym} ${reShow(second, v, false)}`;
    const steps: string[] = [];
    if (expanded) steps.push(`Factor every numerator and denominator: $${factored}$`);
    const flipped = flipRE(second);
    if (op === 'div') steps.push(`Multiply by the reciprocal of the divisor: $${reShow(first, v, false)} \\times ${reShow(flipped, v, false)}$`);
    const npvSources = op === 'div' ? 'the two denominators and the numerator of the divisor (after flipping, it becomes a denominator)' : 'both denominators';
    steps.push(`Non-permissible values come from ${npvSources}: ${npvTex(vals, v)}.`);
    steps.push(`Divide out common factors and multiply what is left: $${reTex(result, v)}$`);
    const options: Option[] = [];
    // Multiplying instead of dividing (or the reverse) is a real mistake, but only a believable choice when it is short.
    const swapped = reduceRE(op === 'div' ? mulRE(first, second) : mulRE(first, flipRE(second)));
    if (swapped.num.length + swapped.den.length <= 3) options.push(opt(swapped, v));
    options.push(opt(flipRE(result), v), opt(negRootsRE(result), v), opt(negRE(result), v), opt({ ...result, n: 1, d: 1 }, v));
    const useParts = d === 2 && result.n > 0 && rng.chance(0.4);
    const parts: Part[] = useParts
      ? [
          part({ kind: 'expression', expected: prodTex(result.n, result.num, v, true) }, { label: 'Numerator' }),
          part({ kind: 'expression', expected: prodTex(result.d, result.den, v, true) }, { label: 'Denominator' }),
          npvPart(vals),
        ]
      : [part(formChoice(rng, opt(result, v), options), { label: 'Simplified form' }), npvPart(vals)];
    return {
      prompt: useParts
        ? `Simplify $${given}$. Enter the numerator and the denominator of the answer in lowest terms (factored or expanded), then the non-permissible values.`
        : `Simplify $${given}$ and state the non-permissible values.`,
      parts,
      hints: [
        op === 'div' ? 'Dividing by a fraction is multiplying by its reciprocal. Flip the second expression only.' : 'Factor everything first, then divide out factors that appear in any numerator and any denominator.',
        op === 'div' ? 'The divisor’s numerator cannot be zero either, because you cannot divide by zero.' : 'State the non-permissible values from every denominator before you cancel.',
      ],
      solution: steps,
      answerDisplay: `$${reTex(result, v)}$, ${npvTex(vals, v)}`,
    };
  },
});

// ---------------------------------------------------------------------------
// 6.3 — Adding and subtracting
// ---------------------------------------------------------------------------

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

interface Sum {
  terms: Term[];
  lcd: Den;
  N: P;
  /** LaTeX for each term rewritten over the LCD (numerator only). */
  pieces: string[];
  /** What each denominator is missing from the LCD, e.g. 8x or (x − 4). */
  mults: string[];
}

/** Factors written side by side, each binomial in brackets: x(x − 4)(x + 1). */
function factorsTex(fs: F[], v: string): string {
  return groupFactors(fs)
    .map((g) => (g.f.b === 0 ? `${v}${g.n > 1 ? `^{${g.n}}` : ''}` : `(${ptex(fP(g.f), v)})${g.n > 1 ? `^{${g.n}}` : ''}`))
    .join('');
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
    // The numerator times what its denominator is missing, e.g. 3(x − 4) or x(x + 2).
    const multiTerm = t.num.filter((c) => c !== 0).length > 1;
    let piece: string;
    let isSum = false;
    if (!multiTerm && t.num.length === 1) {
      const c = t.num[0] * k;
      piece = miss.length ? `${c === 1 ? '' : c}${factorsTex(miss, v)}` : `${c}`;
    } else if (k === 1 && !miss.length) {
      piece = ptex(t.num, v);
      isSum = multiTerm;
    } else {
      piece = `${k === 1 ? '' : k}${multiTerm ? `(${ptex(t.num, v)})` : ptex(t.num, v)}${factorsTex(miss, v)}`;
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

const addSubtract = skill({
  id: 'm201-rational-add-subtract',
  name: 'Adding and subtracting rational expressions',
  description: 'Add and subtract rational expressions with monomial and binomial denominators using the lowest common denominator.',
  outcomes: ['AN5'],
  lessonId: 'm201-6-3',
  gen(rng, d) {
    const v = pickVar(rng);
    let sum: Sum | null = null;
    let factorStep = '';
    for (let t = 0; t < 300 && !sum; t++) {
      const sign: 1 | -1 = rng.pick([1, -1] as const);
      let terms: Term[];
      factorStep = '';
      if (d === 1) {
        if (rng.chance(0.6)) {
          const [m, n] = rng.pick([[1, 2], [2, 1], [1, 1], [2, 2], [1, 0], [0, 1], [2, 0], [3, 1]]);
          const b = rng.int(2, 9);
          const e = rng.int(2, 9);
          const dens: Den[] = [{ c: b, fs: Array<F>(m).fill(X) }, { c: e, fs: Array<F>(n).fill(X) }];
          terms = dens.map((dn, i) => ({ sign: i === 0 ? 1 : sign, num: [rng.int(1, 9)], den: dn, shown: prodTex(dn.c, dn.fs, v) }));
        } else {
          const [b, e] = rng.sample([2, 3, 4, 5, 6, 8, 10], 2);
          terms = [b, e].map((c, i) => ({ sign: i === 0 ? 1 : sign, num: [rng.nonZero(-7, 7), 1], den: { c, fs: [] }, shown: `${c}` }));
        }
      } else if (d === 2) {
        const [p, q] = distinctInts(rng, 2, -8, 8);
        const kind = rng.pick(['consts', 'consts', 'xnum', 'mono'] as const);
        const a = rng.int(1, 9);
        const b = rng.int(1, 9);
        if (kind === 'mono') {
          terms = [
            { sign: 1, num: [a], den: { c: 1, fs: [X] }, shown: v },
            { sign, num: [b], den: { c: 1, fs: [xm(q)] }, shown: ptex(fP(xm(q)), v) },
          ];
        } else {
          terms = [
            { sign: 1, num: kind === 'xnum' ? [0, 1] : [a], den: { c: 1, fs: [xm(p)] }, shown: ptex(fP(xm(p)), v) },
            { sign, num: [b], den: { c: 1, fs: [xm(q)] }, shown: ptex(fP(xm(q)), v) },
          ];
        }
      } else {
        const [r, s, u] = distinctInts(rng, 3, -7, 7);
        const kind = rng.pick(['shared', 'dos', 'trinomial'] as const);
        const a = rng.int(1, 9);
        const b = rng.int(1, 9);
        let big: F[];
        let small: F[];
        if (kind === 'shared') {
          big = [xm(r), xm(s)];
          small = [xm(r), xm(u)];
        } else if (kind === 'dos') {
          const ss = Math.abs(s);
          big = [xm(ss), xm(-ss)];
          small = [xm(rng.pick([ss, -ss]))];
        } else {
          big = [xm(r), xm(s)];
          small = [xm(rng.pick([r, s]))];
        }
        const bigShown = ptex(pprod(big.map(fP)), v);
        const smallShown = small.length === 2 ? ptex(pprod(small.map(fP)), v) : ptex(fP(small[0]), v);
        const xTop = rng.chance(0.4);
        terms = rng.shuffle([
          { sign: 1 as const, num: xTop ? [rng.nonZero(-5, 5), 1] : [a], den: { c: 1, fs: big }, shown: bigShown },
          { sign: 1 as const, num: [b], den: { c: 1, fs: small }, shown: smallShown },
        ]);
        terms[1].sign = sign;
        factorStep = `Factor the denominators: ${terms.filter((tm) => tm.den.fs.length > 1).map((tm) => `$${tm.shown} = ${prodTex(1, tm.den.fs, v)}$`).join(' and ')}.`;
      }
      const s = addTerms(terms, v);
      if (!inLowestTerms(s.N, s.lcd)) continue;
      sum = s;
    }
    const { terms, lcd, N, pieces, mults } = sum!;
    const lcdTex = prodTex(lcd.c, lcd.fs, v);
    const shownTerms = terms.map((t, i) => `${i === 0 ? (t.sign < 0 ? '-' : '') : t.sign < 0 ? ' - ' : ' + '}\\dfrac{${ptex(t.num, v)}}{${t.shown}}`).join('');
    const vals = rootsOf(lcd.fs);
    const steps: string[] = [];
    if (factorStep) steps.push(factorStep);
    steps.push(`The lowest common denominator is $${lcdTex}$.`);
    const scaled = terms
      .map((t, i) => {
        const f = `\\dfrac{${ptex(t.num, v)}}{${prodTex(t.den.c, t.den.fs, v)}}${mults[i] === '1' ? '' : ` \\cdot \\dfrac{${mults[i]}}{${mults[i]}}`}`;
        return i === 0 ? `${t.sign < 0 ? '-' : ''}${f}` : `${t.sign < 0 ? ' - ' : ' + '}${f}`;
      })
      .join('');
    steps.push(`Multiply the top and bottom of each fraction by what its denominator is missing: $${scaled}$`);
    steps.push(`Rewrite each fraction over the LCD and combine the numerators: $\\dfrac{${pieces.join('')}}{${lcdTex}}$`);
    steps.push(`Simplify the numerator: $\\dfrac{${ptex(N, v)}}{${lcdTex}}$. It has no factor in common with the denominator, so this is in lowest terms.`);
    if (d === 3) steps.push(`Non-permissible values: ${npvTex(vals, v)}.`);
    const parts: Part[] = [
      part({ kind: 'expression', expected: ptxt(N, v) }, { label: 'Numerator' }),
      part({ kind: 'expression', expected: prodTex(lcd.c, lcd.fs, v, true) }, { label: 'Denominator' }),
    ];
    if (d === 3) parts.push(npvPart(vals));
    return {
      prompt: `Simplify $${shownTerms}$. Write the result as a single fraction in lowest terms and enter its numerator and denominator${d === 3 ? ', then the non-permissible values' : ''}.`,
      parts,
      hints: [
        d === 3 ? 'Factor each denominator first. The LCD uses each different factor the greatest number of times it appears.' : 'Find the lowest common denominator (LCD) first.',
        'Multiply each numerator by the factors its denominator is missing, then add or subtract the numerators. Put brackets around a numerator you subtract.',
      ],
      solution: steps,
      answerDisplay: `$\\dfrac{${ptex(N, v)}}{${lcdTex}}$${d === 3 ? `, ${npvTex(vals, v)}` : ''}`,
    };
  },
});

// ---------------------------------------------------------------------------
// 6.4 — Rational equations
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

/** "Factor: k(ax + b)(cx + e) = 0" for a quadratic with rational roots. */
function factoredQuadratic(c2: number, roots: number[], v: string): string {
  const fs = roots.length === 1 ? [factorOfRoot(roots[0]), factorOfRoot(roots[0])] : roots.map(factorOfRoot);
  const k = c2 / fs.reduce((p, f) => p * f.a, 1);
  return prodTex(k, fs, v);
}

const rationalEquation = skill({
  id: 'm201-rational-equation',
  name: 'Solving rational equations',
  description: 'Solve a rational equation by multiplying by the lowest common denominator, and reject non-permissible solutions.',
  outcomes: ['AN6'],
  lessonId: 'm201-6-4',
  gen(rng, d): GenOutput {
    const v = rng.pick(['x', 'x', 'x', 'y', 't', 'n']);
    const kind = d === 1 ? rng.pick(['proportion', 'proportion', 'monomial'] as const) : d === 2 ? rng.weighted([['plusRecip', 2], ['twoFractions', 3], ['noSolution', 1]] as const) : rng.weighted([['extraneous', 4], ['allExtraneous', 1], ['general', 2]] as const);
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
      steps.push(`Multiply both sides by $${prod2(L, R)}$ (cross-multiply): $${times(a, R)} = ${times(b, L)}$.`);
      steps.push(`Expand: $${ptex([a * q, a], v)} = ${ptex([b * p, b], v)}$.`);
      steps.push(`Collect terms: $${ptex([0, a - b], v)} = ${b * p - a * q}$, so $${v} = ${x0}$.`);
      steps.push(`$${x0}$ is permissible, so the solution is $${v} = ${x0}$.`);
      hint2 = 'Cross-multiply, then solve the linear equation.';
    } else if (kind === 'monomial') {
      // a/x + b/(mx) = r, where r is a whole number or a fraction.
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
      for (let t = 0; t < 600 && !found; t++) {
        const [p, q] = distinctInts(rng, 2, -6, 6);
        const A = rng.nonZero(-9, 9);
        const B = rng.nonZero(-9, 9);
        const C = kind === 'twoFractions' ? 1 : rng.pick([1, 2, 3, -1, -2]);
        const roots = rationalRoots(C, -(C * (p + q) + A + B), C * p * q + A * q + B * p);
        if (!roots || roots.length !== 2) continue;
        if (roots.some((r) => Math.abs(r - p) < 1e-9 || Math.abs(r - q) < 1e-9)) continue;
        if (kind === 'twoFractions' && roots.some((r) => !Number.isInteger(r))) continue;
        if (kind === 'general' && roots.every((r) => Number.isInteger(r)) && rng.chance(0.6)) continue;
        if (roots.some((r) => Math.abs(r) > 12)) continue;
        found = { A, B, C, p, q, roots };
      }
      const { A, B, C, p, q, roots } = found!;
      const Lp = ptex([-p, 1], v);
      const Lq = ptex([-q, 1], v);
      eq = `${fracTerm(A, Lp)} ${B < 0 ? '-' : '+'} \\dfrac{${Math.abs(B)}}{${Lq}} = ${C}`;
      sols = roots;
      const quad: P = [C * p * q + A * q + B * p, -(C * (p + q) + A + B), C];
      steps.push(`Non-permissible values: $${v} \\ne ${Math.min(p, q)},\\ ${Math.max(p, q)}$. The LCD is $(${Lp})(${Lq})$.`);
      steps.push(`Multiply every term by the LCD: $${times(A, Lq)} ${B < 0 ? '-' : '+'} ${times(Math.abs(B), Lp)} = ${times(C, `(${Lp})(${Lq})`)}$.`);
      steps.push(`Expand and collect everything on one side: $${ptex(quad, v)} = 0$.`);
      steps.push(`Factor: $${factoredQuadratic(C, roots, v)} = 0$, so ${xEq(roots, v)}.`);
      steps.push(`Neither value is non-permissible, so both are solutions.`);
    } else if (kind === 'noSolution') {
      const p = rng.nonZero(-7, 7);
      const a = rng.int(2, 6);
      const c = rng.intExcept(1, 6, [a]);
      const L = ptex([-p, 1], v);
      eq = `\\dfrac{${ptex([0, a], v)}}{${L}} = ${c} + \\dfrac{${a * p}}{${L}}`;
      sols = [];
      steps.push(`Non-permissible value: $${v} \\ne ${p}$.`);
      steps.push(`Multiply every term by $${L}$: $${a}${v} = ${times(c, L)} ${a * p < 0 ? '-' : '+'} ${Math.abs(a * p)}$.`);
      steps.push(`Expand: $${a}${v} = ${ptex([-c * p + a * p, c], v)}$, so ${a - c === 1 ? '' : `$${ptex([0, a - c], v)} = ${(a - c) * p}$ and `}$${v} = ${p}$.`);
      steps.push(`But $${v} = ${p}$ is non-permissible (it makes a denominator $0$), so it is extraneous. There is no solution.`);
    } else {
      // k·x/(x − p) + A/(x − q) = B/((x − p)(x − q)), built so that x = p is a root of the cleared equation.
      let [p, q, s0] = distinctInts(rng, 3, -6, 6);
      while (s0 === q - p) [p, q, s0] = distinctInts(rng, 3, -6, 6);
      const k = rng.pick([1, 1, 2]);
      const s = kind === 'allExtraneous' ? q : s0;
      const A = k * (q - s - p);
      const B = k * p * (p - q);
      const Lp = ptex([-p, 1], v);
      const Lq = ptex([-q, 1], v);
      const tri = ptex(pmul([-p, 1], [-q, 1]), v);
      eq = `${fracTerm(k === 1 ? v : `${k}${v}`, Lp)} ${A < 0 ? '-' : '+'} \\dfrac{${Math.abs(A)}}{${Lq}} = ${fracTerm(B, tri)}`;
      const roots = [s, p].sort((m, n) => m - n);
      sols = kind === 'allExtraneous' ? [] : [s];
      const quad: P = [-A * p - B, A - k * q, k];
      steps.push(`Factor the denominator on the right: $${tri} = (${Lp})(${Lq})$. Non-permissible values: $${v} \\ne ${Math.min(p, q)},\\ ${Math.max(p, q)}$.`);
      steps.push(`Multiply every term by $(${Lp})(${Lq})$: $${k === 1 ? v : `${k}${v}`}(${Lq}) ${A < 0 ? '-' : '+'} ${times(Math.abs(A), Lp)} = ${B}$.`);
      steps.push(`Expand and collect: $${ptex(quad, v)} = 0$, which factors as $${factoredQuadratic(k, roots, v)} = 0$, so ${xEq(roots, v)}.`);
      steps.push(
        kind === 'allExtraneous'
          ? `Both $${p}$ and $${q}$ are non-permissible, so both are extraneous. There is no solution.`
          : `$${v} = ${p}$ is non-permissible, so reject it. Check $${v} = ${s}$: it is permissible, so the only solution is $${v} = ${s}$.`,
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

/** True when s is a single term (no + or − outside brackets), e.g. "t", "3x" or "(x - 1)(x + 2)". */
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
/** The product of two binomials or monomials, monomial first: t(t − 1), (x + 4)(x + 3). */
function prod2(L: string, R: string): string {
  const w = (q: string) => (oneTerm(q) ? q : `(${q})`);
  return oneTerm(R) && !oneTerm(L) ? `${R}${w(L)}` : `${w(L)}${w(R)}`;
}
/** \dfrac{top}{den} with a negative numeral moved in front: −\dfrac{3}{x − 2}. */
function fracTerm(top: number | string, den: string) {
  return typeof top === 'number' && top < 0 ? `-\\dfrac{${-top}}{${den}}` : `\\dfrac{${top}}{${den}}`;
}

// ---------------------------------------------------------------------------
// 6.4 — Applications
// ---------------------------------------------------------------------------

const NAMES = ['Aisha', 'Mateo', 'Priya', 'Liam', 'Mei', 'Noah', 'Amara', 'Ethan', 'Sofia', 'Kiran', 'Jasmine', 'Owen', 'Fatima', 'Lucas', 'Hana', 'Dakota', 'Ravi', 'Chloe', 'Tariq', 'Émilie'];
const TASKS = [
  'clear the snow from the community rink',
  'paint the inside of a garage',
  'stock the shelves in a grocery aisle',
  'plant a block of spruce seedlings',
  'sort a shipment of parcels',
  'wash the windows of a small office building',
  'mow the grass on a soccer field',
  'enter a batch of survey data',
];
const PUMPS = [
  { task: 'fill a stock-watering tank', A: 'the older pump', B: 'the newer pump' },
  { task: 'empty a flooded basement', A: 'the small pump', B: 'the large pump' },
  { task: 'fill an irrigation reservoir', A: 'the narrow pipe', B: 'the wide pipe' },
];

/** Terminating decimals with at most two places look natural in a word problem. */
function niceDecimal(x: number): boolean {
  return Math.abs(x * 100 - Math.round(x * 100)) < 1e-9;
}

const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

/** Two workers (people or machines) as noun phrases that read well mid-sentence. */
function workPeople(rng: Rng): { A: string; B: string; task: string } {
  if (rng.chance(0.3)) return rng.pick(PUMPS);
  const [A, B] = rng.sample(NAMES, 2);
  return { A, B, task: rng.pick(TASKS) };
}

const rationalApply = skill({
  id: 'm201-rational-apply',
  name: 'Problems with rational equations',
  description: 'Model work-together, travel with a current or wind, and number problems with rational equations and solve them.',
  outcomes: ['AN6'],
  lessonId: 'm201-6-4',
  calculator: true,
  gen(rng, d): GenOutput {
    const kind = d === 1 ? rng.pick(['together', 'together', 'fraction'] as const) : d === 2 ? rng.pick(['current', 'current', 'otherTime', 'reciprocal'] as const) : rng.pick(['longer', 'roundTrip', 'twoLegs'] as const);
    if (kind === 'together') {
      let a = 2;
      let b = 3;
      do {
        [a, b] = rng.sample([2, 3, 4, 5, 6, 8, 9, 10, 12], 2);
      } while (Math.abs(((a * b) / (a + b)) * 10 - Math.floor(((a * b) / (a + b)) * 10) - 0.5) < 0.02);
      const w = workPeople(rng);
      const t = (a * b) / (a + b);
      const exact = niceDecimal(t);
      return {
        prompt: `Working alone, ${w.A} can ${w.task} in ${a} h. Working alone, ${w.B} can do it in ${b} h. How long does the job take if they work together? ${exact ? 'Give the exact time in hours.' : 'Round to the nearest tenth of an hour.'}`,
        parts: [numPart(t, exact ? { suffix: 'h' } : { suffix: 'h', decimals: 1 })],
        hints: ['In 1 hour, a worker who takes $a$ hours does $\\tfrac{1}{a}$ of the job.', 'Together: $\\dfrac{1}{' + a + '} + \\dfrac{1}{' + b + '} = \\dfrac{1}{t}$. Multiply by the LCD to solve for $t$.'],
        solution: [
          `Let $t$ be the time together, in hours. Each hour, the first does $\\tfrac{1}{${a}}$ of the job and the second $\\tfrac{1}{${b}}$.`,
          `$\\dfrac{1}{${a}} + \\dfrac{1}{${b}} = \\dfrac{1}{t}$, with $t \\ne 0$.`,
          `Multiply by $${a * b}t$: $${b}t + ${a}t = ${a * b}$, so $${a + b}t = ${a * b}$.`,
          `$t = \\dfrac{${a * b}}{${a + b}} ${exact ? '=' : '\\approx'} ${exact ? fmt(t) : fmt(Math.round(t * 10) / 10)}$ h`,
        ],
      };
    }
    if (kind === 'fraction') {
      let x0 = 7;
      let k = 2;
      let m = 3;
      for (let t = 0; t < 200; t++) {
        x0 = rng.int(4, 15);
        k = rng.int(1, x0 - 1);
        m = rng.int(1, 9);
        if (gcd(x0 - k, x0) === 1 && gcd(x0 - k + m, x0 + m) !== x0 + m) break;
      }
      const g = gcd(x0 - k + m, x0 + m);
      const pN = (x0 - k + m) / g;
      const qN = (x0 + m) / g;
      return {
        prompt: `The numerator of a fraction is ${k} less than its denominator. When ${m} is added to both the numerator and the denominator, the new fraction is equal to $\\dfrac{${pN}}{${qN}}$. What was the original fraction?`,
        parts: [numPart((x0 - k) / x0, { label: 'Original fraction' })],
        hints: ['Let the denominator be $x$. Then the numerator is $x - ' + k + '$.', `Write $\\dfrac{x - ${k} + ${m}}{x + ${m}} = \\dfrac{${pN}}{${qN}}$ and cross-multiply.`],
        solution: [
          `Let the denominator be $x$, so the numerator is $x - ${k}$.`,
          `$\\dfrac{${ptex([m - k, 1])}}{${ptex([m, 1])}} = \\dfrac{${pN}}{${qN}}$, with $x \\ne ${-m}$.`,
          `Cross-multiply: $${times(qN, ptex([m - k, 1]))} = ${times(pN, ptex([m, 1]))}$, so $${ptex([qN * (m - k), qN])} = ${ptex([pN * m, pN])}$.`,
          `$${ptex([0, qN - pN])} = ${pN * m - qN * (m - k)}$, so $x = ${x0}$.`,
          `The original fraction is $\\dfrac{${x0 - k}}{${x0}}$.`,
        ],
        answerDisplay: `$\\dfrac{${x0 - k}}{${x0}}$`,
      };
    }
    if (kind === 'current') {
      const air = rng.chance(0.4);
      let v = 0;
      let c = 0;
      let t = 0;
      do {
        v = air ? rng.pick([400, 450, 500, 550, 600, 650, 700, 750, 800]) : rng.int(6, 20);
        c = air ? rng.pick([20, 25, 30, 40, 50, 60, 75, 80]) : rng.int(1, Math.min(5, v - 2));
        t = air ? rng.pick([1.5, 2, 2.5, 3, 4]) : rng.pick([0.5, 1, 1.5, 2, 2.5, 3]);
      } while (!Number.isInteger((v + c) * t) || !Number.isInteger((v - c) * t));
      const D1 = (v + c) * t;
      const D2 = (v - c) * t;
      const askV = rng.chance(0.65);
      const who = rng.pick(NAMES);
      const ctx = air
        ? { thing: 'a small plane', withC: 'with the wind', against: 'against the wind', speedName: 'airspeed (its speed in still air)', cName: 'wind speed', unit: 'km/h' }
        : rng.pick([
            { thing: `${who}’s motorboat on a wide river`, withC: 'downstream', against: 'upstream', speedName: 'speed of the boat in still water', cName: 'speed of the current', unit: 'km/h' },
            { thing: `${who}’s canoe on a mountain river`, withC: 'downstream', against: 'upstream', speedName: 'speed of the canoe in still water', cName: 'speed of the current', unit: 'km/h' },
          ]);
      const prompt = askV
        ? `In the same amount of time, ${ctx.thing} travels ${fmt(D1)} km ${ctx.withC} and ${fmt(D2)} km ${ctx.against}. The ${ctx.cName} is ${c} km/h. What is the ${ctx.speedName}?`
        : `In the same amount of time, ${ctx.thing} travels ${fmt(D1)} km ${ctx.withC} and ${fmt(D2)} km ${ctx.against}. The ${ctx.speedName} is ${v} km/h. What is the ${ctx.cName}?`;
      const unknown = askV ? 's' : 'c';
      const plus = askV ? `s + ${c}` : `${v} + c`;
      const minus = askV ? `s - ${c}` : `${v} - c`;
      const ans = askV ? v : c;
      return {
        prompt,
        parts: [numPart(ans, { suffix: 'km/h' })],
        hints: ['Time = distance ÷ speed. Going with the current (or wind) the speeds add; going against it they subtract.', `Set the two times equal: $\\dfrac{${fmt(D1)}}{${plus}} = \\dfrac{${fmt(D2)}}{${minus}}$.`],
        solution: [
          `Let $${unknown}$ be the ${askV ? ctx.speedName : ctx.cName}, in km/h. ${ctx.withC[0].toUpperCase() + ctx.withC.slice(1)} the speed is $${plus}$; ${ctx.against} it is $${minus}$.`,
          `The times are equal: $\\dfrac{${fmt(D1)}}{${plus}} = \\dfrac{${fmt(D2)}}{${minus}}$.`,
          `Cross-multiply: $${times(D1, minus)} = ${times(D2, plus)}$.`,
          askV
            ? `$${ptex([-D1 * c, D1], 's')} = ${ptex([D2 * c, D2], 's')}$, so $${ptex([0, D1 - D2], 's')} = ${fmt((D1 + D2) * c)}$.`
            : `$${ptex([D1 * v, -D1], 'c', true)} = ${ptex([D2 * v, D2], 'c', true)}$, so $${ptex([0, D1 + D2], 'c')} = ${fmt((D1 - D2) * v)}$.`,
          `$${unknown} = ${fmt(ans)}$ km/h`,
        ],
      };
    }
    if (kind === 'otherTime') {
      let a = 3;
      let x = 6;
      let t = 2;
      for (let i = 0; i < 200; i++) {
        [a, x] = rng.sample([2, 3, 4, 5, 6, 8, 10, 12, 15], 2);
        t = (a * x) / (a + x);
        if (niceDecimal(t)) break;
      }
      const w = workPeople(rng);
      return {
        prompt: `Working together, ${w.A} and ${w.B} can ${w.task} in ${fmt(t)} h. ${cap(w.A)} alone takes ${a} h. How long would ${w.B} take alone?`,
        parts: [numPart(x, { suffix: 'h' })],
        hints: ['Let $x$ be the unknown time. In 1 hour the two do $\\tfrac{1}{' + a + '}$ and $\\tfrac{1}{x}$ of the job.', `Solve $\\dfrac{1}{${a}} + \\dfrac{1}{x} = \\dfrac{1}{${fmt(t)}}$.`],
        solution: [
          `Let $x$ be the time alone, in hours ($x \\ne 0$). Rates add: $\\dfrac{1}{${a}} + \\dfrac{1}{x} = \\dfrac{1}{${fmt(t)}}$.`,
          `Multiply by $${a}x$: $x + ${a} = \\dfrac{${a}x}{${fmt(t)}}$, so $${fmt(t)}x + ${fmt(a * t)} = ${a}x$.`,
          `$${ptex([0, a - t])} = ${fmt(a * t)}$, so $x = ${fmt(x)}$.`,
          `It would take ${fmt(x)} h alone.`,
        ],
      };
    }
    if (kind === 'reciprocal') {
      const r = rng.int(2, 7) * rng.pick([1, 1, -1]);
      const minus = rng.chance(0.4);
      const rhs = minus ? (r * r - 1) / r : (r * r + 1) / r;
      const sols = (minus ? [r, -1 / r] : [r, 1 / r]).sort((p, q) => p - q);
      const rhsTex = niceNum(rhs);
      const quad: P = minus ? [-1, -(r * r - 1) / r, 1] : [1, -(r * r + 1) / r, 1];
      const scaled = pscale(quad, Math.abs(r));
      return {
        prompt: `A number ${minus ? 'minus' : 'plus'} its reciprocal is $${rhsTex}$. Find every possible number.`,
        parts: [solPart(sols)],
        hints: ['Let the number be $x$; its reciprocal is $\\dfrac{1}{x}$.', `Solve $x ${minus ? '-' : '+'} \\dfrac{1}{x} = ${rhsTex}$ by multiplying every term by the LCD, $${Math.abs(r)}x$.`],
        solution: [
          `Let the number be $x$ ($x \\ne 0$): $x ${minus ? '-' : '+'} \\dfrac{1}{x} = ${rhsTex}$.`,
          `Multiply every term by $${Math.abs(r)}x$: $${ptex(scaled)} = 0$.`,
          `Factor: $${factoredQuadratic(scaled[2], sols, 'x')} = 0$, so ${xEq(sols, 'x')}.`,
          `Both are permissible, so the numbers are $${niceNum(sols[0])}$ and $${niceNum(sols[1])}$.`,
        ],
        answerDisplay: xEq(sols, 'x'),
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
          `Let $x$ be the faster time in hours; the other takes $x + ${k}$ h. Then $\\dfrac{1}{x} + \\dfrac{1}{x + ${k}} = \\dfrac{1}{${fmt(t)}}$, with $x \\ne 0, -${k}$.`,
          `Multiply by $${fmt(t)}x(x + ${k})$: $${fmt(t)}(x + ${k}) + ${fmt(t)}x = x(x + ${k})$.`,
          `Collect terms: $${ptex([-k * t, k - 2 * t, 1])} = 0$.`,
          `Factor or use the quadratic formula: $x = ${x0}$ or $x = ${fmt(other)}$.`,
          `A time cannot be negative, so reject $${fmt(other)}$. It takes ${x0} h alone.`,
        ],
      };
    }
    if (kind === 'roundTrip') {
      const combos: Array<[number, number, number]> = [];
      for (const v of [150, 160, 180, 200, 220, 240, 250, 300]) for (const c of [10, 20, 25, 30, 40, 50]) for (const D of [300, 400, 450, 480, 500, 600, 720, 800, 900, 1000, 1200]) {
        const t1 = D / (v + c);
        const t2 = D / (v - c);
        if (niceDecimal(t1) && niceDecimal(t2) && t1 * 4 === Math.round(t1 * 4) && t2 * 4 === Math.round(t2 * 4)) combos.push([v, c, D]);
      }
      const [v, c, D] = rng.pick(combos);
      const T = D / (v + c) + D / (v - c);
      const askC = rng.chance(0.4);
      const other = askC ? -c : -(c * c) / v;
      return {
        prompt: askC
          ? `A small plane has an airspeed of ${v} km/h. It flies ${D} km with the wind and returns ${D} km against the same wind. The round trip takes ${fmt(T)} h of flying time. What is the wind speed?`
          : `A small plane flies ${D} km with a ${c} km/h wind and then returns ${D} km against the same wind. The round trip takes ${fmt(T)} h of flying time. What is the plane’s airspeed (its speed in still air)?`,
        parts: [numPart(askC ? c : v, { suffix: 'km/h' })],
        hints: ['Total time = time with the wind + time against the wind, and time = distance ÷ speed.', askC ? `Solve $\\dfrac{${D}}{${v} + w} + \\dfrac{${D}}{${v} - w} = ${fmt(T)}$.` : `Solve $\\dfrac{${D}}{s + ${c}} + \\dfrac{${D}}{s - ${c}} = ${fmt(T)}$.`],
        solution: askC
          ? [
              `Let $w$ be the wind speed: $\\dfrac{${D}}{${v} + w} + \\dfrac{${D}}{${v} - w} = ${fmt(T)}$, with $w \\ne \\pm ${v}$.`,
              `Multiply by $(${v} + w)(${v} - w)$: $${D}(${v} - w) + ${D}(${v} + w) = ${fmt(T)}(${v * v} - w^2)$.`,
              `$${2 * D * v} = ${fmt(T * v * v)} - ${fmt(T)}w^2$, so $w^2 = ${fmt(c * c)}$.`,
              `$w = ${c}$ or $w = ${-c}$; a speed cannot be negative, so the wind speed is ${c} km/h.`,
            ]
          : [
              `Let $s$ be the airspeed: $\\dfrac{${D}}{s + ${c}} + \\dfrac{${D}}{s - ${c}} = ${fmt(T)}$, with $s \\ne \\pm ${c}$.`,
              `Multiply by $(s + ${c})(s - ${c})$: $${D}(s - ${c}) + ${D}(s + ${c}) = ${fmt(T)}(s^2 - ${c * c})$.`,
              `$${ptex([-T * c * c, -2 * D, T], 's')} = 0$.`,
              `Quadratic formula: $s = ${v}$ or $s ${Number.isInteger(other) ? '=' : '\\approx'} ${fmt(other, 2)}$. Reject the negative root: the airspeed is ${v} km/h.`,
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
    return {
      prompt: `${who} cycles ${D1} km on a gravel trail, then ${D2} km on a paved road, riding ${k} km/h faster on the pavement. The whole ride takes ${fmt(T)} h. What was ${who}’s speed on the gravel trail?`,
      parts: [numPart(s, { suffix: 'km/h' })],
      hints: ['Let $s$ be the speed on gravel; on pavement it is $s + ' + k + '$. Time = distance ÷ speed.', `Solve $\\dfrac{${D1}}{s} + \\dfrac{${D2}}{s + ${k}} = ${fmt(T)}$ and reject any impossible root.`],
      solution: [
        `Let $s$ be the gravel speed in km/h: $\\dfrac{${D1}}{s} + \\dfrac{${D2}}{s + ${k}} = ${fmt(T)}$, with $s \\ne 0, -${k}$.`,
        `Multiply by $s(s + ${k})$: $${D1}(s + ${k}) + ${D2}s = ${fmt(T)}s(s + ${k})$.`,
        `Collect terms: $${ptex(quad, 's')} = 0$.`,
        `Quadratic formula: $s = ${s}$ or $s ${Number.isInteger(other) ? '=' : '\\approx'} ${fmt(other, 2)}$. A speed cannot be negative, so the gravel speed was ${s} km/h.`,
      ],
    };
  },
});

export const RATIONAL_SKILLS: SkillDef[] = [nonPermissible, simplify, multiplyDivide, addSubtract, rationalEquation, rationalApply];
