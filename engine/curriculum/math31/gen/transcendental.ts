/** Math 31 Unit 5 — Transcendental Functions and Implicit Differentiation (D3, D4). */
import { numPart, part, skill, type GenOutput } from '../../helpers.ts';
import { fmt, gcd, lcm, toFrac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { SkillDef } from '../../../types.ts';
import {
  type Fn,
  type P,
  bn,
  cf,
  cft,
  dAt,
  dOf,
  derivPart,
  fnOf,
  fracT,
  fracVal,
  fracX,
  joinTerms,
  monoTex,
  monoTxt,
  pder,
  pickName,
  powExpTex,
  powTex,
  powTxt,
  pscale,
  pterms,
  ptex,
  ptxt,
  peval,
  tn,
  txn,
  wrapX,
} from './rules.ts';

const askPrompt = (rng: Rng, n: Fn, fTex: string): string =>
  rng.pick([`Find $${dOf(n)}$ for $${fnOf(n)} = ${fTex}$.`, `Differentiate $${fnOf(n)} = ${fTex}$.`, `Find the derivative of $${fnOf(n)} = ${fTex}$.`]);

/** A named function of x. */
const nameX = (rng: Rng): Fn => ({ f: rng.pick(['f', 'f', 'g', 'h']), v: 'x' });
/** A function of x, sometimes written as y. */
const nameXY = (rng: Rng): Fn => rng.pick([{ f: 'f', v: 'x' }, { f: 'g', v: 'x' }, { f: '', v: 'x' }, { f: 'h', v: 'x' }]);

// ---------------------------------------------------------------------------
// Exact values a + b√k (for trigonometric values at special angles)
// ---------------------------------------------------------------------------

interface Surd {
  r: number;
  s: number;
  k: number;
}
const S = (r: number, s = 0, k = 1): Surd => ({ r, s, k: s === 0 ? 1 : k });
const MAGNITUDES: Array<[number, Surd]> = [
  [0, S(0)],
  [0.5, S(0.5)],
  [Math.SQRT2 / 2, S(0, 0.5, 2)],
  [Math.sqrt(3) / 2, S(0, 0.5, 3)],
  [1, S(1)],
  [Math.sqrt(3) / 3, S(0, 1 / 3, 3)],
  [Math.sqrt(3), S(0, 1, 3)],
  [2, S(2)],
  [Math.SQRT2, S(0, 1, 2)],
  [(2 * Math.sqrt(3)) / 3, S(0, 2 / 3, 3)],
];
function surdOf(v: number): Surd {
  for (const [m, sd] of MAGNITUDES) if (Math.abs(Math.abs(v) - m) < 1e-9) return v < 0 ? S(-sd.r, -sd.s, sd.k) : sd;
  throw new Error(`not a special value: ${v}`);
}
const sval = (a: Surd): number => a.r + a.s * Math.sqrt(a.k);
function smul(a: Surd, b: Surd): Surd {
  const k = a.k !== 1 ? a.k : b.k;
  if (a.k !== 1 && b.k !== 1 && a.k !== b.k) throw new Error('mixed surds');
  return S(a.r * b.r + a.s * b.s * k, a.r * b.s + a.s * b.r, k);
}
function sadd(a: Surd, b: Surd): Surd {
  const k = a.k !== 1 ? a.k : b.k;
  if (a.k !== 1 && b.k !== 1 && a.k !== b.k) throw new Error('mixed surds');
  return S(a.r + b.r, a.s + b.s, k);
}
const round9 = (x: number) => Math.round(x * 1e9) / 1e9;

/** LaTeX for r + s√k as one fraction: \dfrac{3\sqrt{3} - 1}{2}. */
function surdTex(a0: Surd): string {
  const a = S(round9(a0.r), round9(a0.s), a0.k);
  if (a.s === 0) return tn(a.r, true);
  const fr = toFrac(a.r, 1000)!;
  const fs = toFrac(a.s, 1000)!;
  const d = lcm(fr.d, fs.d);
  const N1 = fr.n * (d / fr.d);
  const N2 = fs.n * (d / fs.d);
  const rad = `\\sqrt{${a.k}}`;
  const sTerm = (n: number) => `${Math.abs(n) === 1 ? '' : Math.abs(n)}${rad}`;
  let num: string;
  let neg = false;
  if (N1 === 0) {
    num = sTerm(N2);
    neg = N2 < 0;
  } else if (N2 > 0) num = `${sTerm(N2)} ${N1 < 0 ? '-' : '+'} ${Math.abs(N1)}`;
  else if (N1 > 0) num = `${N1} - ${sTerm(N2)}`;
  else {
    num = `${sTerm(N2)} + ${Math.abs(N1)}`;
    neg = true;
  }
  if (d === 1) return neg ? (N1 === 0 ? `-${num}` : `-(${num})`) : num;
  return `${neg ? '-' : ''}\\dfrac{${num}}{${d}}`;
}

// ---------------------------------------------------------------------------
// Special angles (multiples of π/6 and π/4)
// ---------------------------------------------------------------------------

interface Angle {
  p: number;
  q: number;
}
const angVal = (a: Angle) => (a.p * Math.PI) / a.q;
function angTex(a: Angle): string {
  if (a.p === 0) return '0';
  const g = gcd(a.p, a.q);
  const p = a.p / g;
  const q = a.q / g;
  const top = `${p === 1 ? '' : p === -1 ? '-' : p}\\pi`;
  return q === 1 ? top : `\\frac{${top}}{${q}}`;
}
/** f'(π/6) with brackets sized for a fraction. */
const atAngle = (n: Fn, a: Angle) => (a.q === 1 || a.p === 0 ? `${n.f || 'f'}'(${angTex(a)})` : `${n.f || 'f'}'\\left(${angTex(a)}\\right)`);
const SPECIAL: Angle[] = [
  { p: 0, q: 1 },
  { p: 1, q: 6 },
  { p: 1, q: 4 },
  { p: 1, q: 3 },
  { p: 1, q: 2 },
  { p: 2, q: 3 },
  { p: 3, q: 4 },
  { p: 5, q: 6 },
  { p: 1, q: 1 },
  { p: 7, q: 6 },
  { p: 5, q: 4 },
  { p: 4, q: 3 },
  { p: 3, q: 2 },
  { p: 5, q: 3 },
  { p: 7, q: 4 },
  { p: 11, q: 6 },
];

// ---------------------------------------------------------------------------
// Trigonometric functions
// ---------------------------------------------------------------------------

type Trig = 'sin' | 'cos' | 'tan' | 'sec' | 'csc' | 'cot';
const TRIGS: Trig[] = ['sin', 'cos', 'tan', 'sec', 'csc', 'cot'];
const trigFn: Record<Trig, (x: number) => number> = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  sec: (x) => 1 / Math.cos(x),
  csc: (x) => 1 / Math.sin(x),
  cot: (x) => Math.cos(x) / Math.sin(x),
};
/** Derivatives: sign and trig factors. */
const DERIV: Record<Trig, { sign: 1 | -1; fs: Array<[Trig, number]>; rule: string }> = {
  sin: { sign: 1, fs: [['cos', 1]], rule: '\\dfrac{d}{dx}\\sin x = \\cos x' },
  cos: { sign: -1, fs: [['sin', 1]], rule: '\\dfrac{d}{dx}\\cos x = -\\sin x' },
  tan: { sign: 1, fs: [['sec', 2]], rule: '\\dfrac{d}{dx}\\tan x = \\sec^{2} x' },
  sec: { sign: 1, fs: [['sec', 1], ['tan', 1]], rule: '\\dfrac{d}{dx}\\sec x = \\sec x\\tan x' },
  csc: { sign: -1, fs: [['csc', 1], ['cot', 1]], rule: '\\dfrac{d}{dx}\\csc x = -\\csc x\\cot x' },
  cot: { sign: -1, fs: [['csc', 2]], rule: '\\dfrac{d}{dx}\\cot x = -\\csc^{2} x' },
};

/** The argument of a function: LaTeX, typed text, and whether LaTeX needs brackets. */
interface Arg {
  tex: string;
  txt: string;
  plain: boolean;
  /** Inner derivative as a polynomial (for the chain rule). */
  d: P;
  p: P;
}
const argLin = (k: number, b = 0): Arg => {
  const p = [b, k];
  return { tex: ptex(p), txt: ptxt(p), plain: b === 0, d: [k], p };
};
const argPoly = (p: P): Arg => ({ tex: ptex(p), txt: ptxt(p), plain: pterms(p) === 1 && p[p.length - 1] > 0, d: pder(p), p });

function trigTex(f: Trig, a: Arg, pow = 1): string {
  const head = `\\${f}${pow === 1 ? '' : `^{${pow}}`}`;
  return a.plain ? `${head} ${a.tex}` : `${head}\\left(${a.tex}\\right)`;
}
const trigTxt = (f: Trig, a: Arg, pow = 1): string => `${f}${pow === 1 ? '' : `^${pow}`}(${a.txt})`;

/** A product c · poly · Π trig^pow (arg) in LaTeX and text. */
interface TTerm {
  c: number;
  poly?: P;
  fs: Array<[Trig, number]>;
  a: Arg;
}
function ttTex(t: TTerm): string {
  const trig = t.fs.map(([f, pw]) => trigTex(f, t.a, pw)).join('');
  if (t.poly && pterms(t.poly) === 1) {
    const deg = t.poly.length - 1;
    const c = t.c * t.poly[deg];
    return deg === 0 ? `${cf(c)}${trig || tn(1)}` : `${monoTex(c, deg)}${trig}`;
  }
  if (t.poly) return `${cf(t.c)}(${ptex(t.poly)})${trig}`;
  return trig ? `${cf(t.c)}${trig}` : tn(t.c);
}
function ttTxt(t: TTerm): string {
  const trig = t.fs.map(([f, pw]) => trigTxt(f, t.a, pw)).join(' ');
  if (t.poly && pterms(t.poly) === 1) {
    const deg = t.poly.length - 1;
    const c = t.c * t.poly[deg];
    return deg === 0 ? `${cft(c)}${trig || '1'}` : `${monoTxt(c, deg)} ${trig}`;
  }
  if (t.poly) return `${cft(t.c)}(${ptxt(t.poly)})${trig}`;
  return trig ? `${cft(t.c)}${trig}` : txn(t.c);
}

/** The derivative of c·T^n(u): c·n·T^(n-1)(u)·T'(u)·u'. */
function dPowTrig(c: number, f: Trig, n: number, a: Arg): TTerm {
  const D = DERIV[f];
  const fs = new Map<Trig, number>();
  if (n > 1) fs.set(f, n - 1);
  for (const [g, pw] of D.fs) fs.set(g, (fs.get(g) ?? 0) + pw);
  const order = (t: Trig) => (t === f ? 0 : 1);
  const list = [...fs.entries()].sort((p, q) => order(p[0]) - order(q[0]));
  return { c: c * n * D.sign, poly: a.d, fs: list, a };
}

/** Value of a TTerm at x (as a surd, for special angles). */
function ttSurd(t: TTerm, x: number): Surd {
  const ang = peval(t.a.p, x);
  let v = S(t.c * (t.poly ? peval(t.poly, x) : 1));
  for (const [f, pw] of t.fs) for (let i = 0; i < pw; i++) v = smul(v, surdOf(trigFn[f](ang)));
  return v;
}

const TRIG_HINTS = [
  'Use the six derivatives: $(\\sin x)\' = \\cos x$, $(\\cos x)\' = -\\sin x$, $(\\tan x)\' = \\sec^2 x$, $(\\sec x)\' = \\sec x\\tan x$, $(\\csc x)\' = -\\csc x\\cot x$, $(\\cot x)\' = -\\csc^2 x$.',
  'Differentiate term by term; constant multiples stay in front. The "co-" functions have a negative sign.',
];

const trigDerivative = skill({
  id: 'm31-trig-derivative',
  name: 'Derivatives of trigonometric functions',
  description: 'Differentiate the six trigonometric functions (in radians) with the sum, product, quotient and chain rules, and find exact derivative values at special angles.',
  outcomes: ['D3'],
  lessonId: 'm31-5-1',
  gen(rng, d): GenOutput {
    if (d === 1) {
      const kind = rng.weighted([['basic', 3], ['value', 2]] as const);
      const n = kind === 'value' ? nameX(rng) : nameXY(rng);
      if (kind === 'basic') {
        const fs = rng.sample(TRIGS, rng.int(2, 3));
        const terms: TTerm[] = fs.map((f) => ({ c: rng.nonZero(-6, 6), fs: [[f, 1]], a: argLin(1) }));
        const extra = rng.chance(0.4) ? { c: rng.nonZero(-5, 5), n: rng.int(2, 4) } : null;
        const fTex = joinTerms([...terms.map(ttTex), ...(extra ? [monoTex(extra.c, extra.n)] : [])]);
        const dts = terms.map((t) => dPowTrig(t.c, t.fs[0][0], 1, t.a));
        const dTex = joinTerms([...dts.map(ttTex), ...(extra ? [monoTex(extra.c * extra.n, extra.n - 1)] : [])]);
        const dTxt = joinTerms([...dts.map(ttTxt), ...(extra ? [monoTxt(extra.c * extra.n, extra.n - 1)] : [])]);
        return {
          prompt: askPrompt(rng, n, fTex),
          parts: [derivPart(n, dTxt)],
          hints: TRIG_HINTS,
          solution: [`Use ${fs.map((f) => `$${DERIV[f].rule}$`).join(', ')}${extra ? ' and the power rule' : ''}.`, `Differentiate term by term: $${dOf(n)} = ${dTex}$.`],
        };
      }
      // Exact value at a special angle.
      for (;;) {
        const fs = rng.chance(0.6) ? (['sin', 'cos'] as Trig[]) : rng.sample(TRIGS, 2);
        const terms: TTerm[] = fs.map((f) => ({ c: rng.nonZero(-6, 6), fs: [[f, 1]], a: argLin(1) }));
        const ang = rng.pick(SPECIAL);
        const x0 = angVal(ang);
        const dts = terms.map((t) => dPowTrig(t.c, t.fs[0][0], 1, t.a));
        let val: Surd;
        try {
          val = dts.map((t) => ttSurd(t, x0)).reduce(sadd, S(0));
        } catch {
          continue;
        }
        const fTex = joinTerms(terms.map(ttTex));
        const dTex = joinTerms(dts.map(ttTex));
        const at = atAngle(n, ang);
        const v = sval(val);
        return {
          prompt: `Given $${fnOf(n)} = ${fTex}$, find the exact value of $${at}$.`,
          parts: [numPart(v, { label: `$${at} =$` })],
          hints: [TRIG_HINTS[0], `Find $${n.f}'(x)$ first, then substitute $x = ${angTex(ang)}$ using exact values from the unit circle.`],
          solution: [
            `Differentiate: $${n.f}'(x) = ${dTex}$.`,
            `Substitute $x = ${angTex(ang)}$: $${at} = ${dts.map((t) => ttTex(t).replace(/ x/g, `\\left(${angTex(ang)}\\right)`)).join(' + ').replace(/\+ -/g, '- ')} = ${surdTex(val)}$.`,
            `So $${at} = ${surdTex(val)}$.`,
          ],
          answerDisplay: `$${at} = ${surdTex(val)}$`,
        };
      }
    }

    if (d === 2) {
      const kind = rng.weighted([['chain', 3], ['product', 2], ['quotient', 2], ['chainValue', 2]] as const);
      if (kind === 'chain') {
        const n = nameXY(rng);
        const f = rng.pick(TRIGS);
        const c = rng.chance(0.5) ? 1 : rng.nonZero(-5, 5);
        const form = rng.pick(['lin', 'quad', 'pow'] as const);
        let a: Arg;
        let pw = 1;
        if (form === 'lin') a = argLin(rng.int(2, 6), rng.chance(0.5) ? rng.nonZero(-5, 5) : 0);
        else if (form === 'quad') a = argPoly(rng.chance(0.5) ? [0, 0, rng.int(1, 3)] : [rng.nonZero(-4, 4), 0, rng.int(1, 3)]);
        else {
          a = argLin(rng.chance(0.6) ? 1 : rng.int(2, 4));
          pw = rng.int(2, 4);
        }
        const t: TTerm = { c, fs: [[f, pw]], a };
        const dt = dPowTrig(c, f, pw, a);
        const fTex = ttTex(t);
        const inner = a.tex;
        return {
          prompt: askPrompt(rng, n, fTex),
          parts: [derivPart(n, ttTxt(dt))],
          hints: [pw > 1 ? `$${trigTex(f, a, pw)}$ means $\\left(${trigTex(f, a)}\\right)^{${pw}}$: the outside function is a power.` : `The inside function is $${inner}$.`, `Chain rule: differentiate the outside function, keep the inside, then multiply by the derivative of the inside. ${DERIV[f].rule.replace(/x/g, 'u')}.`],
          solution: [
            pw > 1
              ? `Write $${fnOf(n)} = ${cf(c)}\\left(${trigTex(f, a)}\\right)^{${pw}}$. The outside is $${cf(c)}u^{${pw}}$ with $u = ${trigTex(f, a)}$, and $u' = ${ttTex(dPowTrig(1, f, 1, a))}$.`
              : `The inside function is $u = ${inner}$ with $u' = ${ptex(a.d)}$; the outside is $${cf(c)}\\${f} u$, with derivative $${ttTex({ c: c * DERIV[f].sign, fs: DERIV[f].fs, a: { tex: 'u', txt: 'u', plain: true, d: [1], p: [0, 1] } })}$.`,
            pw > 1
              ? `Chain rule: $${dOf(n)} = ${cf(c * pw)}${trigTex(f, a, pw - 1)}\\cdot ${ttTex(dPowTrig(1, f, 1, a))}$.`
              : `Chain rule: $${dOf(n)} = ${ttTex({ c: c * DERIV[f].sign, fs: DERIV[f].fs, a })}\\cdot ${pterms(a.d) > 1 || a.d[a.d.length - 1] < 0 ? `(${ptex(a.d)})` : ptex(a.d)}$.`,
            `So $${dOf(n)} = ${ttTex(dt)}$.`,
          ],
        };
      }
      if (kind === 'product') {
        const n = nameXY(rng);
        const f = rng.pick(['sin', 'cos', 'tan', 'sin', 'cos', 'sec'] as Trig[]);
        const m = rng.int(1, 3);
        const c = rng.chance(0.6) ? 1 : rng.int(2, 5);
        const a = argLin(1);
        const u: TTerm = { c, poly: [...new Array<number>(m).fill(0), 1], fs: [[f, 1]], a };
        const t1: TTerm = { c: c * m, poly: [...new Array<number>(m - 1).fill(0), 1], fs: [[f, 1]], a };
        const t2: TTerm = { ...dPowTrig(c, f, 1, a), poly: [...new Array<number>(m).fill(0), 1] };
        const dTex = joinTerms([ttTex(t1), ttTex(t2)]);
        const dTxt = joinTerms([ttTxt(t1), ttTxt(t2)]);
        return {
          prompt: askPrompt(rng, n, ttTex(u)),
          parts: [derivPart(n, dTxt)],
          hints: ['This is a product of a power of $x$ and a trigonometric function.', `Product rule: $(uv)' = u'v + uv'$, with $${DERIV[f].rule}$.`],
          solution: [
            `Let $u = ${monoTex(c, m)}$ and $v = \\${f} x$, so $u' = ${monoTex(c * m, m - 1)}$ and $v' = ${ttTex(dPowTrig(1, f, 1, a))}$.`,
            `Product rule: $${dOf(n)} = u'v + uv' = ${dTex}$.`,
            `So $${dOf(n)} = ${dTex}$.`,
          ],
        };
      }
      if (kind === 'quotient') return trigQuotient(rng);
      // Exact value of a chain-rule derivative at a special angle.
      for (;;) {
        const n = nameX(rng);
        const f = rng.pick(['sin', 'cos', 'tan', 'sin', 'cos', 'sec'] as Trig[]);
        const k = rng.int(2, 4);
        const pw = rng.chance(0.3) ? 2 : 1;
        const kk = pw === 2 ? 1 : k;
        const c = rng.pick([1, 1, 2, 3, -1, -2, 4]);
        const a = argLin(kk);
        const ang = rng.pick(SPECIAL.filter((s) => s.p !== 0));
        const x0 = angVal(ang);
        const dt = dPowTrig(c, f, pw, a);
        let val: Surd;
        try {
          val = ttSurd(dt, x0);
          if (!Number.isFinite(sval(val))) continue;
        } catch {
          continue;
        }
        const t: TTerm = { c, fs: [[f, pw]], a };
        const at = atAngle(n, ang);
        const inside = { p: ang.p * kk, q: ang.q };
        return {
          prompt: `Given $${fnOf(n)} = ${ttTex(t)}$, find the exact value of $${at}$.`,
          parts: [numPart(sval(val), { label: `$${at} =$` })],
          hints: ['Use the chain rule to find the derivative first.', `Then substitute $x = ${angTex(ang)}$ and use exact values from the unit circle.`],
          solution: [
            `Chain rule: $${n.f}'(x) = ${ttTex(dt)}$.`,
            kk === 1 ? `At $x = ${angTex(ang)}$, use the exact values of the trigonometric functions of $${angTex(ang)}$.` : `At $x = ${angTex(ang)}$ the angle is $${kk}x = ${angTex(inside)}$.`,
            `$${at} = ${ttTex({ ...dt, a: { ...dt.a, tex: angTex(inside), plain: false } }).replace(/\\left\(/g, '\\left(').replace(/\\cdot/g, '\\cdot')} = ${surdTex(val)}$.`,
            `So $${at} = ${surdTex(val)}$.`,
          ],
          answerDisplay: `$${at} = ${surdTex(val)}$`,
        };
      }
    }

    const kind = rng.weighted([['combo', 3], ['horizontal', 3], ['applied', 3]] as const);
    if (kind === 'horizontal') return trigHorizontal(rng);
    if (kind === 'applied') return trigApplied(rng);
    return trigCombo(rng);
  },
});

/** Quotients with trigonometric functions. */
function trigQuotient(rng: Rng): GenOutput {
  const n = nameXY(rng);
  const form = rng.pick(['sinOverX', 'cosOverX', 'sinOver1PlusCos', 'cosOver1PlusSin', 'xOverCos', 'tanOverX'] as const);
  let fTex = '';
  let dTex = '';
  let dTxt = '';
  let steps: string[] = [];
  const k = rng.pick([1, 1, 2, 3]);
  const K = k === 1 ? '' : `${k}`;
  /** k(expr), or just expr when k = 1. */
  const kp = (e: string) => (k === 1 ? e : `${k}\\left(${e}\\right)`);
  if (form === 'sinOverX' || form === 'cosOverX' || form === 'tanOverX') {
    const f: Trig = form === 'sinOverX' ? 'sin' : form === 'cosOverX' ? 'cos' : 'tan';
    const a = argLin(1);
    fTex = `\\dfrac{${K}\\${f} x}{x}`;
    const dT = ttTex(dPowTrig(k, f, 1, a));
    const xT: TTerm = { ...dPowTrig(k, f, 1, a), poly: [0, 1] };
    dTex = `\\dfrac{${ttTex(xT)} - ${K}\\${f} x}{x^{2}}`;
    dTxt = `(${ttTxt(xT)} - ${K}${f}(x))/x^2`;
    steps = [
      `Let $u = ${K}\\${f} x$ and $v = x$, so $u' = ${dT}$ and $v' = 1$.`,
      `Quotient rule: $${dOf(n)} = \\dfrac{u'v - uv'}{v^2} = \\dfrac{\\left(${dT}\\right)x - ${K}\\${f} x\\cdot 1}{x^{2}}$.`,
      `So $${dOf(n)} = ${dTex}$.`,
    ];
  } else if (form === 'xOverCos') {
    fTex = `\\dfrac{${K}x}{\\cos x}`;
    dTex = `\\dfrac{${K}\\cos x + ${K}x\\sin x}{\\cos^{2} x}`;
    dTxt = `(${K}cos(x) + ${K}x sin(x))/cos^2(x)`;
    steps = [
      `Let $u = ${K}x$ and $v = \\cos x$, so $u' = ${k}$ and $v' = -\\sin x$.`,
      `Quotient rule: $${dOf(n)} = \\dfrac{${k}\\cos x - ${K}x(-\\sin x)}{\\cos^{2} x}$.`,
      `So $${dOf(n)} = ${dTex}$.`,
    ];
  } else if (form === 'sinOver1PlusCos') {
    fTex = `\\dfrac{${K}\\sin x}{1 + \\cos x}`;
    dTex = `\\dfrac{${k}}{1 + \\cos x}`;
    dTxt = `${k}/(1 + cos(x))`;
    steps = [
      `Let $u = ${K}\\sin x$ and $v = 1 + \\cos x$, so $u' = ${K}\\cos x$ and $v' = -\\sin x$.`,
      `Quotient rule: $${dOf(n)} = \\dfrac{${K}\\cos x(1 + \\cos x) - ${K}\\sin x(-\\sin x)}{(1 + \\cos x)^{2}} = \\dfrac{${kp('\\cos x + \\cos^{2} x + \\sin^{2} x')}}{(1 + \\cos x)^{2}}$.`,
      `Use $\\sin^2 x + \\cos^2 x = 1$: the numerator is $${kp('\\cos x + 1')}$, so $${dOf(n)} = \\dfrac{${kp('1 + \\cos x')}}{(1 + \\cos x)^{2}} = ${dTex}$.`,
    ];
  } else {
    fTex = `\\dfrac{${K}\\cos x}{1 + \\sin x}`;
    dTex = `-\\dfrac{${k}}{1 + \\sin x}`;
    dTxt = `-${k}/(1 + sin(x))`;
    steps = [
      `Let $u = ${K}\\cos x$ and $v = 1 + \\sin x$, so $u' = -${K}\\sin x$ and $v' = \\cos x$.`,
      `Quotient rule: $${dOf(n)} = \\dfrac{-${K}\\sin x(1 + \\sin x) - ${K}\\cos x\\cos x}{(1 + \\sin x)^{2}} = \\dfrac{-${k === 1 ? '\\left(\\sin x + \\sin^{2} x + \\cos^{2} x\\right)' : kp('\\sin x + \\sin^{2} x + \\cos^{2} x')}}{(1 + \\sin x)^{2}}$.`,
      `Use $\\sin^2 x + \\cos^2 x = 1$: the numerator is $-${k === 1 ? '(\\sin x + 1)' : kp('\\sin x + 1')}$, so $${dOf(n)} = ${dTex}$.`,
    ];
  }
  return {
    prompt: askPrompt(rng, n, fTex),
    parts: [derivPart(n, dTxt)],
    hints: ['Use the quotient rule: $\\left(\\dfrac{u}{v}\\right)\' = \\dfrac{u\'v - uv\'}{v^2}$.', 'After the quotient rule, look for $\\sin^2 x + \\cos^2 x = 1$ to simplify.'],
    solution: steps,
  };
}

/** Harder trigonometric derivatives combining rules. */
function trigCombo(rng: Rng): GenOutput {
  const n = nameXY(rng);
  const form = rng.pick(['xPowTrigK', 'powTrigK', 'trigSqrt', 'sinCos', 'trigOfTrig'] as const);
  if (form === 'xPowTrigK') {
    const f = rng.pick(['sin', 'cos', 'tan'] as Trig[]);
    const m = rng.int(1, 3);
    const k = rng.int(2, 5);
    const a = argLin(k);
    const xm = (p: number): P => [...new Array<number>(p).fill(0), 1];
    const t1: TTerm = { c: m, poly: xm(m - 1), fs: [[f, 1]], a };
    const t2: TTerm = { ...dPowTrig(1, f, 1, a), poly: pscale(xm(m), k) };
    const dTex = joinTerms([ttTex(t1), ttTex(t2)]);
    return {
      prompt: askPrompt(rng, n, `${monoTex(1, m)}${trigTex(f, a)}`),
      parts: [derivPart(n, joinTerms([ttTxt(t1), ttTxt(t2)]))],
      hints: ['This is a product, and the trigonometric factor needs the chain rule.', `Let $u = ${monoTex(1, m)}$ and $v = ${trigTex(f, a)}$; then $v' = ${ttTex(dPowTrig(1, f, 1, a))}$.`],
      solution: [
        `Let $u = ${monoTex(1, m)}$ and $v = ${trigTex(f, a)}$. Then $u' = ${monoTex(m, m - 1)}$ and, by the chain rule, $v' = ${ttTex(dPowTrig(1, f, 1, a))}$.`,
        `Product rule: $${dOf(n)} = u'v + uv' = ${dTex}$.`,
        `So $${dOf(n)} = ${dTex}$.`,
      ],
    };
  }
  if (form === 'powTrigK') {
    const f = rng.pick(['sin', 'cos', 'tan', 'sec'] as Trig[]);
    const pw = rng.int(2, 4);
    const k = rng.int(2, 5);
    const a = argLin(k, rng.chance(0.3) ? rng.nonZero(-3, 3) : 0);
    const dt = dPowTrig(1, f, pw, a);
    return {
      prompt: askPrompt(rng, n, trigTex(f, a, pw)),
      parts: [derivPart(n, ttTxt(dt))],
      hints: [`$${trigTex(f, a, pw)} = \\left(${trigTex(f, a)}\\right)^{${pw}}$: there are three layers (a power, a trigonometric function, and a linear function).`, 'Apply the chain rule twice: power rule on the outside, then the derivative of the trigonometric function, then the derivative of the inside.'],
      solution: [
        `Write $${fnOf(n)} = \\left(${trigTex(f, a)}\\right)^{${pw}}$.`,
        `Chain rule (outside layer): $${pw}${trigTex(f, a, pw - 1)}$ times the derivative of $${trigTex(f, a)}$, which is $${ttTex(dPowTrig(1, f, 1, a))}$ (chain rule again).`,
        `Multiply: $${dOf(n)} = ${pw}${trigTex(f, a, pw - 1)}\\cdot ${ttTex(dPowTrig(1, f, 1, a))} = ${ttTex(dt)}$.`,
        `So $${dOf(n)} = ${ttTex(dt)}$.`,
      ],
    };
  }
  if (form === 'trigSqrt') {
    const f = rng.pick(['sin', 'cos', 'tan'] as Trig[]);
    const c = rng.pick([1, 2, 4, 6]);
    const D = DERIV[f];
    const dTrig = D.fs.map(([g, pw]) => `\\${g}${pw === 1 ? '' : `^{${pw}}`}\\sqrt{x}`).join('');
    const dTrigX = D.fs.map(([g, pw]) => `${g}${pw === 1 ? '' : `^${pw}`}(sqrt(x))`).join(' ');
    const coef = (c * D.sign) / 2;
    const cfr = toFrac(coef, 10)!;
    const num = `${Math.abs(cfr.n) === 1 ? '' : Math.abs(cfr.n)}${dTrig}`;
    const dTex = `${cfr.n < 0 ? '-' : ''}\\dfrac{${num}}{${cfr.d === 1 ? '' : cfr.d}\\sqrt{x}}`;
    const dTxt = `${cfr.n < 0 ? '-' : ''}${Math.abs(cfr.n) === 1 ? '' : Math.abs(cfr.n)}${dTrigX}/${cfr.d === 1 ? 'sqrt(x)' : `(${cfr.d}sqrt(x))`}`;
    return {
      prompt: askPrompt(rng, n, `${cf(c)}\\${f}\\sqrt{x}`),
      parts: [derivPart(n, dTxt)],
      hints: ['The inside function is $\\sqrt{x}$.', `Chain rule with $${D.rule}$ and $\\dfrac{d}{dx}\\sqrt{x} = \\dfrac{1}{2\\sqrt{x}}$.`],
      solution: [
        `The inside function is $u = \\sqrt{x}$, with $u' = \\dfrac{1}{2\\sqrt{x}}$.`,
        `Chain rule: $${dOf(n)} = ${cf(c * D.sign)}${dTrig}\\cdot\\dfrac{1}{2\\sqrt{x}}$.`,
        `So $${dOf(n)} = ${dTex}$.`,
      ],
    };
  }
  if (form === 'sinCos') {
    const k = rng.pick([1, 2, 3, 4]);
    return {
      prompt: askPrompt(rng, n, `${cf(k)}\\sin x\\cos x`),
      parts: [derivPart(n, `${cft(k)}(cos^2(x) - sin^2(x))`)],
      hints: ['This is a product of $\\sin x$ and $\\cos x$.', "Product rule: $(uv)' = u'v + uv'$. (Any equivalent form is fine, such as one using $\\cos 2x$.)"],
      solution: [
        `Let $u = ${cf(k)}\\sin x$ and $v = \\cos x$, so $u' = ${cf(k)}\\cos x$ and $v' = -\\sin x$.`,
        `Product rule: $${dOf(n)} = ${cf(k)}\\cos x\\cos x + ${cf(k)}\\sin x(-\\sin x) = ${cf(k)}\\left(\\cos^{2} x - \\sin^{2} x\\right)$.`,
        `By the double-angle identity this is also $${cf(k)}\\cos 2x$, so $${dOf(n)} = ${cf(k)}\\left(\\cos^{2} x - \\sin^{2} x\\right) = ${cf(k)}\\cos 2x$.`,
      ],
    };
  }
  // sin(cos x), cos(sin x), tan(sin x)?
  const outer = rng.pick(['sin', 'cos'] as Trig[]);
  const inner = rng.pick(['sin', 'cos'] as Trig[]);
  const Do = DERIV[outer];
  const Di = DERIV[inner];
  const sign = Do.sign * Di.sign;
  const dTex = `${sign < 0 ? '-' : ''}\\${Di.fs[0][0]} x\\,\\${Do.fs[0][0]}(\\${inner} x)`;
  const dTxt = `${sign < 0 ? '-' : ''}${Di.fs[0][0]}(x) ${Do.fs[0][0]}(${inner}(x))`;
  return {
    prompt: askPrompt(rng, n, `\\${outer}(\\${inner} x)`),
    parts: [derivPart(n, dTxt)],
    hints: [`The outside function is $\\${outer} u$ and the inside function is $u = \\${inner} x$.`, `Chain rule: $${Do.rule.replace(/x/g, 'u').replace('\\dfrac{d}{du}', '\\dfrac{d}{du}')}$, then multiply by $u'$.`],
    solution: [
      `Let $u = \\${inner} x$, so $u' = ${Di.sign < 0 ? '-' : ''}\\${Di.fs[0][0]} x$.`,
      `Chain rule: $${dOf(n)} = ${Do.sign < 0 ? '-' : ''}\\${Do.fs[0][0]}(\\${inner} x)\\cdot\\left(${Di.sign < 0 ? '-' : ''}\\${Di.fs[0][0]} x\\right)$.`,
      `So $${dOf(n)} = ${dTex}$.`,
    ],
  };
}

/** Horizontal tangents of trigonometric functions on [0, 2π). */
function trigHorizontal(rng: Rng): GenOutput {
  const n = nameX(rng);
  const T = rng.pick([
    { f: 'x + 2\\cos x', d: '1 - 2\\sin x', eq: '\\sin x = \\tfrac{1}{2}', sols: [[1, 6], [5, 6]] },
    { f: 'x - 2\\sin x', d: '1 - 2\\cos x', eq: '\\cos x = \\tfrac{1}{2}', sols: [[1, 3], [5, 3]] },
    { f: 'x + 2\\sin x', d: '1 + 2\\cos x', eq: '\\cos x = -\\tfrac{1}{2}', sols: [[2, 3], [4, 3]] },
    { f: '\\sqrt{3}\\,x + 2\\cos x', d: '\\sqrt{3} - 2\\sin x', eq: '\\sin x = \\tfrac{\\sqrt{3}}{2}', sols: [[1, 3], [2, 3]] },
    { f: '\\sin x + \\cos x', d: '\\cos x - \\sin x', eq: '\\tan x = 1', sols: [[1, 4], [5, 4]] },
    { f: '\\sin x - \\cos x', d: '\\cos x + \\sin x', eq: '\\tan x = -1', sols: [[3, 4], [7, 4]] },
    { f: 'x - \\sqrt{2}\\cos x', d: '1 + \\sqrt{2}\\sin x', eq: '\\sin x = -\\tfrac{\\sqrt{2}}{2}', sols: [[5, 4], [7, 4]] },
    { f: '\\sin^{2} x', d: '2\\sin x\\cos x', eq: '\\sin x = 0 \\text{ or } \\cos x = 0', sols: [[0, 1], [1, 2], [1, 1], [3, 2]] },
    { f: '\\cos^{2} x + \\sin x', d: '-2\\sin x\\cos x + \\cos x = \\cos x(1 - 2\\sin x)', eq: '\\cos x = 0 \\text{ or } \\sin x = \\tfrac{1}{2}', sols: [[1, 6], [1, 2], [5, 6], [3, 2]] },
    { f: '2\\cos x + \\sin 2x', d: '-2\\sin x + 2\\cos 2x = -2\\sin x + 2(1 - 2\\sin^{2} x) = -2(2\\sin x - 1)(\\sin x + 1)', eq: '\\sin x = \\tfrac{1}{2} \\text{ or } \\sin x = -1', sols: [[1, 6], [5, 6], [3, 2]] },
  ]);
  const a = rng.pick([1, 1, 2, 3, 4]);
  const c = rng.chance(0.4) ? rng.nonZero(-5, 5) : 0;
  const fTex = `${a === 1 ? '' : a}${a === 1 ? T.f : `\\left(${T.f}\\right)`}${c ? ` ${c < 0 ? '-' : '+'} ${Math.abs(c)}` : ''}`;
  const sols = T.sols.map(([p, q]) => ({ p, q }));
  const solTex = sols.map((s) => `x = ${angTex(s)}`).join(',\\ ');
  return {
    prompt: `Find all values of $x$ in the interval $0 \\le x < 2\\pi$ where the graph of $${fnOf(n)} = ${fTex}$ has a horizontal tangent line. Give exact values, separated by commas.`,
    parts: [part({ kind: 'numbers', values: sols.map(angVal) }, { label: '$x =$', placeholder: 'e.g. pi/6, 5pi/6' })],
    hints: ['A horizontal tangent has slope $0$: solve $f\'(x) = 0$.', 'Differentiate, set the derivative equal to $0$, and solve the trigonometric equation on $0 \\le x < 2\\pi$ with the unit circle.'],
    solution: [
      `Differentiate: $${n.f}'(x) = ${a === 1 ? T.d : `${a}\\left(${T.d.split(' = ')[0]}\\right)`}$${a === 1 || !T.d.includes('=') ? '' : `, and $${T.d}$`}.`,
      `Set $${n.f}'(x) = 0$: $${T.eq}$.`,
      `On $0 \\le x < 2\\pi$ the solutions are $${solTex}$.`,
    ],
    answerDisplay: `$${solTex}$`,
  };
}

/** Applied rates with trigonometric models. */
function trigApplied(rng: Rng): GenOutput {
  const ctx = rng.pick(['spring', 'tide', 'ferris'] as const);
  if (ctx === 'spring') {
    const A = rng.int(3, 12);
    const k = rng.int(2, 6);
    const t = rng.pick([0.5, 1, 1.5, 2, 2.5, 3]);
    const v = -A * k * Math.sin(k * t);
    const name = rng.pick(['Sofia', 'Ethan', 'Harpreet', 'Lucas', 'Aiyana', 'Chloé']);
    return {
      prompt: `In ${name}'s physics lab, a mass on a spring has position $s(t) = ${A}\\cos(${k}t)$ centimetres from its rest position after $t$ seconds. Find its velocity, $s'(t)$, at $t = ${fmt(t)}$ s, to the nearest hundredth.`,
      parts: [numPart(v, { label: `$s'(${fmt(t)}) =$`, decimals: 2, exact: true, suffix: 'cm/s' })],
      hints: ['Velocity is the derivative of position.', 'Chain rule: $\\dfrac{d}{dt}\\cos(kt) = -k\\sin(kt)$. Use radian mode.'],
      solution: [
        `Differentiate: $s'(t) = ${A}(-\\sin(${k}t))(${k}) = -${A * k}\\sin(${k}t)$.`,
        `Substitute $t = ${fmt(t)}$ (radians): $s'(${fmt(t)}) = -${A * k}\\sin(${fmt(k * t)}) \\approx ${v.toFixed(2)}$.`,
        `The velocity is about $${v.toFixed(2)}$ cm/s${Math.abs(v) < 0.005 ? '' : v < 0 ? ' (moving in the negative direction)' : ' (moving in the positive direction)'}.`,
      ],
      calculator: true,
    };
  }
  if (ctx === 'tide') {
    const M = rng.int(3, 8);
    const A = rng.int(1, 3) + rng.pick([0, 0.5]);
    const t = rng.pick([1, 2, 4, 5, 7, 8, 10, 11]);
    const rate = ((A * Math.PI) / 6) * Math.cos((Math.PI * t) / 6);
    const place = rng.pick(['a harbour in Nova Scotia', 'a wharf in Prince Rupert', 'a dock in Saint John', 'a marina in Victoria']);
    const ang = { p: t, q: 6 };
    const cosV = surdOf(Math.cos((Math.PI * t) / 6));
    return {
      prompt: `The depth of water at ${place} is modelled by $d(t) = ${M} + ${fmt(A)}\\sin\\left(\\dfrac{\\pi t}{6}\\right)$ metres, $t$ hours after midnight. How fast is the depth changing at $t = ${t}$ h? Give the answer in metres per hour, to the nearest hundredth.`,
      parts: [numPart(rate, { label: `$d'(${t}) =$`, decimals: 2, exact: true, suffix: 'm/h' })],
      hints: ['Differentiate with the chain rule; the inside function is $\\dfrac{\\pi t}{6}$.', '$\\dfrac{d}{dt}\\sin\\left(\\dfrac{\\pi t}{6}\\right) = \\dfrac{\\pi}{6}\\cos\\left(\\dfrac{\\pi t}{6}\\right)$.'],
      solution: [
        `Differentiate: $d'(t) = ${fmt(A)}\\cdot\\dfrac{\\pi}{6}\\cos\\left(\\dfrac{\\pi t}{6}\\right)$.`,
        `At $t = ${t}$: $\\cos\\left(${angTex(ang)}\\right) = ${surdTex(cosV)}$, so $d'(${t}) = ${fmt(A)}\\cdot\\dfrac{\\pi}{6}\\cdot ${surdTex(cosV).startsWith('-') ? `\\left(${surdTex(cosV)}\\right)` : surdTex(cosV)} \\approx ${rate.toFixed(2)}$.`,
        `The depth is ${rate > 0 ? 'rising' : 'falling'} at about $${Math.abs(rate).toFixed(2)}$ m/h${rate < 0 ? ' (the answer is negative)' : ''}.`,
      ],
      calculator: true,
    };
  }
  const R = rng.int(8, 30);
  const C = R + rng.int(1, 3);
  const P = rng.pick([3, 4, 5, 6, 10]);
  const t = rng.pick([1, 2, 0.5, 1.5].filter((x) => x < P));
  const rate = ((R * Math.PI) / P) * Math.sin((Math.PI * t) / P);
  const place = rng.pick(['a summer rodeo', 'the Riverton city fair', 'a summer fair in Hillcrest', 'an indoor amusement park']);
  return {
    prompt: `A rider's height on a Ferris wheel at ${place} is $h(t) = ${C} - ${R}\\cos\\left(\\dfrac{\\pi t}{${P}}\\right)$ metres, $t$ minutes after boarding. Find $h'(${fmt(t)})$, the rate at which the rider is rising, to the nearest hundredth.`,
    parts: [numPart(rate, { label: `$h'(${fmt(t)}) =$`, decimals: 2, exact: true, suffix: 'm/min' })],
    hints: ['Differentiate with the chain rule; the inside function is $\\dfrac{\\pi t}{' + P + '}$.', `$\\dfrac{d}{dt}\\left[-\\cos\\left(\\dfrac{\\pi t}{${P}}\\right)\\right] = \\dfrac{\\pi}{${P}}\\sin\\left(\\dfrac{\\pi t}{${P}}\\right)$. Use radian mode.`],
    solution: [
      `Differentiate: $h'(t) = ${R}\\cdot\\dfrac{\\pi}{${P}}\\sin\\left(\\dfrac{\\pi t}{${P}}\\right)$.`,
      `Substitute $t = ${fmt(t)}$: $h'(${fmt(t)}) = \\dfrac{${R}\\pi}{${P}}\\sin\\left(\\dfrac{${fmt(t)}\\pi}{${P}}\\right) \\approx ${rate.toFixed(2)}$.`,
      `The rider is rising at about $${rate.toFixed(2)}$ m/min.`,
    ],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 5.2 — Exponential and logarithmic functions
// ---------------------------------------------------------------------------

const EXP_HINTS = [
  'Use $\\dfrac{d}{dx}e^x = e^x$, $\\dfrac{d}{dx}a^x = a^x\\ln a$, $\\dfrac{d}{dx}\\ln x = \\dfrac{1}{x}$ and $\\dfrac{d}{dx}\\log_a x = \\dfrac{1}{x\\ln a}$.',
  'With an inside function $u$: $\\dfrac{d}{dx}e^u = e^u u\'$ and $\\dfrac{d}{dx}\\ln u = \\dfrac{u\'}{u}$.',
];

/** Positive polynomial (for x > 0) for ln(u). */
function posPoly(rng: Rng): P {
  return rng.pick([
    () => [rng.int(1, 9), 0, rng.int(1, 3)],
    () => [rng.int(1, 9), rng.int(1, 5)],
    () => [rng.int(1, 5), rng.int(1, 4), 1],
    () => [rng.int(1, 9), 0, 0, 1],
  ])();
}

/** A product c·poly written in front of something else (LaTeX / text). */
function lead(c: number, p: P): [string, string] {
  if (pterms(p) === 1) {
    const deg = p.length - 1;
    const k = c * p[deg];
    return deg === 0 ? [cf(k), cft(k)] : [monoTex(k, deg), `${monoTxt(k, deg)} `];
  }
  return [`${cf(c)}(${ptex(p)})`, `${cft(c)}(${ptxt(p)})`];
}

const expLog = skill({
  id: 'm31-exp-log-derivative',
  name: 'Derivatives of exponential and logarithmic functions',
  description: 'Differentiate e^x, a^x, ln x and log_a x with the sum, product, quotient and chain rules, using the laws of logarithms to simplify first, and solve rate problems with exponential models.',
  outcomes: ['D3'],
  lessonId: 'm31-5-2',
  gen(rng, d): GenOutput {
    if (d === 1) {
      const kind = rng.weighted([['basic', 3], ['base', 2], ['simpleChain', 2], ['value', 2]] as const);
      const n = kind === 'value' ? nameX(rng) : nameXY(rng);
      if (kind === 'basic') {
        const a = rng.nonZero(-6, 6);
        const b = rng.nonZero(-9, 9);
        const pw = rng.chance(0.6) ? { c: rng.nonZero(-5, 5), n: rng.int(2, 4) } : null;
        const items: Array<[string, string, string]> = rng.shuffle([
          [`${cf(a)}e^{x}`, `${cf(a)}e^{x}`, `${cft(a)}e^x`],
          [`${cf(b)}\\ln x`, powTex(b, -1), powTxt(b, -1)],
          ...(pw ? ([[monoTex(pw.c, pw.n), monoTex(pw.c * pw.n, pw.n - 1), monoTxt(pw.c * pw.n, pw.n - 1)]] as Array<[string, string, string]>) : []),
        ]);
        const fTex = joinTerms(items.map((i) => i[0]));
        const dTex = joinTerms(items.map((i) => i[1]));
        return {
          prompt: askPrompt(rng, n, fTex),
          parts: [derivPart(n, joinTerms(items.map((i) => i[2])))],
          hints: EXP_HINTS,
          solution: [`Use $\\dfrac{d}{dx}e^x = e^x$ and $\\dfrac{d}{dx}\\ln x = \\dfrac{1}{x}$${pw ? ', and the power rule' : ''}.`, `Differentiate term by term: $${dOf(n)} = ${dTex}$.`],
        };
      }
      if (kind === 'base') {
        const b = rng.pick([2, 3, 5, 10, 4, 7]);
        const c = rng.pick([1, 1, 2, 3, 5, -2, -4]);
        if (rng.chance(0.5)) {
          const dTex = `${c === 1 ? '' : c === -1 ? '-' : `${c}\\cdot `}${b}^{x}\\ln ${b}`;
          const dTxt = `${c === 1 ? '' : c === -1 ? '-' : `${c} * `}${b}^x ln(${b})`;
          return {
            prompt: askPrompt(rng, n, `${c === 1 ? '' : c === -1 ? '-' : `${c}\\cdot `}${b}^{x}`),
            parts: [derivPart(n, dTxt)],
            hints: ['The base is a number other than $e$.', `$\\dfrac{d}{dx}a^x = a^x\\ln a$. Leave $\\ln ${b}$ exact (type it as ln(${b})).`],
            solution: [`Use $\\dfrac{d}{dx}a^x = a^x\\ln a$ with $a = ${b}$ (because $${b}^x = e^{x\\ln ${b}}$).`, `So $${dOf(n)} = ${dTex}$.`],
          };
        }
        const dTex = fracT(`${c}`, `x\\ln ${b}`);
        const dTxt = `${c}/(x ln(${b}))`;
        return {
          prompt: askPrompt(rng, n, `${cf(c)}\\log_{${b}} x`),
          parts: [derivPart(n, dTxt)],
          hints: ['Change of base: $\\log_a x = \\dfrac{\\ln x}{\\ln a}$.', `$\\dfrac{d}{dx}\\log_a x = \\dfrac{1}{x\\ln a}$. Type $\\ln ${b}$ as ln(${b}).`],
          solution: [`Change of base: $${cf(c)}\\log_{${b}} x = \\dfrac{${c === 1 ? '' : c === -1 ? '-' : c}\\ln x}{\\ln ${b}}$, and $\\ln ${b}$ is a constant.`, `So $${dOf(n)} = ${c === 1 ? '' : c === -1 ? '-' : c}\\cdot\\dfrac{1}{\\ln ${b}}\\cdot\\dfrac{1}{x} = ${dTex}$.`],
        };
      }
      if (kind === 'simpleChain') {
        const k = rng.pick([2, 3, 4, 5, -1, -2, -3]);
        const c = rng.pick([1, 1, 2, 3, -1, 4]);
        if (rng.chance(0.65)) {
          const kx = k === -1 ? '-x' : `${k}x`;
          const dc = c * k;
          return {
            prompt: askPrompt(rng, n, `${cf(c)}e^{${kx}}`),
            parts: [derivPart(n, `${cft(dc)}e^(${kx})`)],
            hints: [`The inside function is $${kx}$.`, `Chain rule: $\\dfrac{d}{dx}e^{u} = e^{u}\\,u'$, so multiply by the derivative of $${kx}$.`],
            solution: [`The inside function is $u = ${kx}$, with $u' = ${k}$.`, `Chain rule: $${dOf(n)} = ${cf(c)}e^{${kx}}\\cdot ${bn(k)} = ${cf(dc)}e^{${kx}}$.`],
          };
        }
        const m = rng.int(2, 9);
        return {
          prompt: askPrompt(rng, n, `${cf(c)}\\ln(${m}x)`),
          parts: [derivPart(n, powTxt(c, -1))],
          hints: ['Use the chain rule, or first split the logarithm with a law of logarithms.', `$\\ln(${m}x) = \\ln ${m} + \\ln x$, and $\\ln ${m}$ is a constant.`],
          solution: [`Chain rule: $${dOf(n)} = ${cf(c)}\\dfrac{1}{${m}x}\\cdot ${m} = ${powTex(c, -1)}$.`, `(Check with the product law: $\\ln(${m}x) = \\ln ${m} + \\ln x$, and the constant $\\ln ${m}$ has derivative $0$.) So $${dOf(n)} = ${powTex(c, -1)}$.`],
        };
      }
      // value
      const form = rng.pick(['eln', 'ekx', 'base', 'lnPow'] as const);
      if (form === 'eln') {
        const a = rng.nonZero(-5, 5);
        const b = rng.nonZero(-9, 9);
        const exact = `${cf(a)}e ${b < 0 ? '-' : '+'} ${Math.abs(b)}`;
        return {
          prompt: `Given $${fnOf(n)} = ${cf(a)}e^{x} ${b < 0 ? '-' : '+'} ${Math.abs(b)}\\ln x$, find the exact value of $${dAt(n, '1')}$.`,
          parts: [numPart(a * Math.E + b, { label: `$${dAt(n, '1')} =$` })],
          hints: EXP_HINTS,
          solution: [`Differentiate: $${n.f}'(x) = ${cf(a)}e^{x} ${b < 0 ? '-' : '+'} ${powTex(Math.abs(b), -1)}$.`, `Substitute $x = 1$: $${dAt(n, '1')} = ${cf(a)}e^{1} ${b < 0 ? '-' : '+'} \\dfrac{${Math.abs(b)}}{1} = ${exact}$.`, `So $${dAt(n, '1')} = ${exact}$ (about $${fmt(a * Math.E + b, 3)}$).`],
          answerDisplay: `$${dAt(n, '1')} = ${exact}$`,
        };
      }
      if (form === 'ekx') {
        const k = rng.pick([2, 3, 4, -1, -2, -3, 5]);
        const c = rng.pick([1, 2, 3, 5, -2]);
        const val = c * k;
        const kx = k === -1 ? '-x' : `${k}x`;
        return {
          prompt: `Given $${fnOf(n)} = ${cf(c)}e^{${kx}}$, find $${dAt(n, '0')}$.`,
          parts: [numPart(val, { label: `$${dAt(n, '0')} =$` })],
          hints: ['Use the chain rule for $e^{kx}$.', 'Remember $e^0 = 1$.'],
          solution: [`Differentiate: $${n.f}'(x) = ${cf(val)}e^{${kx}}$.`, `Substitute $x = 0$: $${dAt(n, '0')} = ${val}e^{0} = ${val}$.`, `So $${dAt(n, '0')} = ${val}$.`],
        };
      }
      if (form === 'base') {
        const b = rng.pick([2, 3, 5, 10]);
        const x0 = rng.int(1, 3);
        const val = b ** x0 * Math.log(b);
        const exact = `${b ** x0}\\ln ${b}`;
        return {
          prompt: `Given $${fnOf(n)} = ${b}^{x}$, find $${dAt(n, `${x0}`)}$. Give the exact value.`,
          parts: [numPart(val, { label: `$${dAt(n, `${x0}`)} =$` })],
          hints: ['$\\dfrac{d}{dx}a^x = a^x\\ln a$.', `Leave $\\ln ${b}$ exact; type it as ln(${b}).`],
          solution: [`Differentiate: $${n.f}'(x) = ${b}^{x}\\ln ${b}$.`, `Substitute $x = ${x0}$: $${dAt(n, `${x0}`)} = ${b}^{${x0}}\\ln ${b} = ${exact}$.`, `So $${dAt(n, `${x0}`)} = ${exact}$ (about $${fmt(val, 3)}$).`],
          answerDisplay: `$${dAt(n, `${x0}`)} = ${exact}$`,
        };
      }
      const a = rng.nonZero(-9, 9);
      const b = rng.nonZero(-4, 4);
      const x0 = rng.pick([1, 2, 3, 4]);
      const val = a / x0 + 2 * b * x0;
      return {
        prompt: `Given $${fnOf(n)} = ${cf(a)}\\ln x ${b < 0 ? '-' : '+'} ${monoTex(Math.abs(b), 2)}$, find $${dAt(n, `${x0}`)}$.`,
        parts: [numPart(val, { label: `$${dAt(n, `${x0}`)} =$` })],
        hints: EXP_HINTS,
        solution: [`Differentiate: $${n.f}'(x) = ${powTex(a, -1)} ${b < 0 ? '-' : '+'} ${monoTex(Math.abs(2 * b), 1)}$.`, `Substitute $x = ${x0}$: $${dAt(n, `${x0}`)} = ${tn(a / x0)} ${b < 0 ? '-' : '+'} ${Math.abs(2 * b * x0)} = ${tn(val)}$.`, `So $${dAt(n, `${x0}`)} = ${tn(val)}$.`],
      };
    }

    if (d === 2) {
      const kind = rng.weighted([['chain', 3], ['product', 2], ['quotient', 2], ['logLaws', 2], ['value', 2]] as const);
      if (kind === 'value') return expValue(rng);
      const n = nameXY(rng);
      if (kind === 'chain') {
        const form = rng.pick(['expPoly', 'lnPoly', 'baseKx', 'logPoly'] as const);
        if (form === 'expPoly') {
          const p = rng.pick([() => [0, 0, rng.nonZero(-3, 3)], () => [rng.nonZero(-5, 5), 0, rng.int(1, 2)], () => [0, rng.nonZero(-4, 4), rng.int(1, 2)], () => [rng.nonZero(-3, 3), 0, 0, 1]])();
          const dp = pder(p);
          const [lt, lx] = lead(1, dp);
          return {
            prompt: askPrompt(rng, n, `e^{${ptex(p)}}`),
            parts: [derivPart(n, `${lx}e^(${ptxt(p)})`)],
            hints: [`The inside function is $u = ${ptex(p)}$.`, "Chain rule: $\\dfrac{d}{dx}e^{u} = e^{u}u'$ — the exponential stays the same and is multiplied by the derivative of the exponent."],
            solution: [`The inside function is $u = ${ptex(p)}$, with $u' = ${ptex(dp)}$.`, `Chain rule: $${dOf(n)} = e^{${ptex(p)}}\\cdot ${pterms(dp) > 1 ? `(${ptex(dp)})` : ptex(dp)} = ${lt}e^{${ptex(p)}}$.`],
          };
        }
        if (form === 'lnPoly' || form === 'logPoly') {
          const p = posPoly(rng);
          const dp = pder(p);
          const b = rng.pick([2, 3, 10, 5]);
          const isLog = form === 'logPoly';
          const dTex = isLog ? `\\dfrac{${ptex(dp)}}{(${ptex(p)})\\ln ${b}}` : `\\dfrac{${ptex(dp)}}{${ptex(p)}}`;
          const dTxt = isLog ? `${wrapX(ptxt(dp))}/((${ptxt(p)})ln(${b}))` : fracX(ptxt(dp), ptxt(p));
          return {
            prompt: askPrompt(rng, n, isLog ? `\\log_{${b}}(${ptex(p)})` : `\\ln(${ptex(p)})`),
            parts: [derivPart(n, dTxt)],
            hints: [`The inside function is $u = ${ptex(p)}$.`, isLog ? "$\\dfrac{d}{dx}\\log_a u = \\dfrac{u'}{u\\ln a}$." : "$\\dfrac{d}{dx}\\ln u = \\dfrac{u'}{u}$."],
            solution: [`The inside function is $u = ${ptex(p)}$, with $u' = ${ptex(dp)}$.`, isLog ? `$\\dfrac{d}{dx}\\log_{${b}} u = \\dfrac{u'}{u\\ln ${b}}$, so $${dOf(n)} = ${dTex}$.` : `$\\dfrac{d}{dx}\\ln u = \\dfrac{u'}{u}$, so $${dOf(n)} = ${dTex}$.`],
          };
        }
        const b = rng.pick([2, 3, 5, 10]);
        const k = rng.pick([2, 3, 4, -1, -2]);
        const kx = k === -1 ? '-x' : `${k}x`;
        const dTex = `${k === 1 ? '' : k === -1 ? '-' : `${k}\\cdot `}${b}^{${kx}}\\ln ${b}`;
        const dTxt = `${k === -1 ? '-' : `${k} * `}${b}^(${kx}) ln(${b})`;
        return {
          prompt: askPrompt(rng, n, `${b}^{${kx}}`),
          parts: [derivPart(n, dTxt)],
          hints: ['$\\dfrac{d}{dx}a^{u} = a^{u}\\ln a\\cdot u\'$.', `The inside function is $${kx}$; type $\\ln ${b}$ as ln(${b}).`],
          solution: [`The inside function is $u = ${kx}$, with $u' = ${k}$.`, `Chain rule: $${dOf(n)} = ${b}^{${kx}}\\ln ${b}\\cdot ${bn(k)} = ${dTex}$.`],
        };
      }
      if (kind === 'product') {
        const form = rng.pick(['xekx', 'x2lnx', 'xnex', 'exlnx'] as const);
        if (form === 'xekx') {
          const k = rng.pick([2, 3, -1, -2, 4]);
          const kx = k === -1 ? '-x' : `${k}x`;
          // (1 + kx) e^{kx}
          return {
            prompt: askPrompt(rng, n, `xe^{${kx}}`),
            parts: [derivPart(n, `e^(${kx})(1 ${k < 0 ? '-' : '+'} ${Math.abs(k) === 1 ? '' : Math.abs(k)}x)`)],
            hints: ['Product rule with $u = x$ and $v = e^{' + kx + '}$.', `$v' = ${cf(k)}e^{${kx}}$ by the chain rule. Factor out $e^{${kx}}$ at the end.`],
            solution: [`Let $u = x$ and $v = e^{${kx}}$, so $u' = 1$ and $v' = ${cf(k)}e^{${kx}}$.`, `Product rule: $${dOf(n)} = e^{${kx}} ${k < 0 ? '-' : '+'} ${Math.abs(k) === 1 ? '' : Math.abs(k)}xe^{${kx}}$.`, `Factor: $${dOf(n)} = e^{${kx}}(1 ${k < 0 ? '-' : '+'} ${Math.abs(k) === 1 ? '' : Math.abs(k)}x)$.`],
          };
        }
        if (form === 'x2lnx') {
          const m = rng.int(2, 4);
          return {
            prompt: askPrompt(rng, n, `x^{${m}}\\ln x`),
            parts: [derivPart(n, `${m}x^${m - 1} ln(x) + x^${m - 1}`)],
            hints: [`Product rule with $u = x^{${m}}$ and $v = \\ln x$.`, '$v\' = \\dfrac{1}{x}$, and $x^n\\cdot\\dfrac{1}{x} = x^{n-1}$.'],
            solution: [`Let $u = x^{${m}}$ and $v = \\ln x$, so $u' = ${m}${monoTex(1, m - 1)}$ and $v' = \\dfrac{1}{x}$.`, `Product rule: $${dOf(n)} = ${m}${monoTex(1, m - 1)}\\ln x + x^{${m}}\\cdot\\dfrac{1}{x} = ${m}${monoTex(1, m - 1)}\\ln x + ${monoTex(1, m - 1)}$.`, `So $${dOf(n)} = ${monoTex(1, m - 1)}(${m}\\ln x + 1)$.`],
          };
        }
        if (form === 'xnex') {
          const m = rng.int(2, 4);
          return {
            prompt: askPrompt(rng, n, `x^{${m}}e^{x}`),
            parts: [derivPart(n, `x^${m - 1}e^x(x + ${m})`)],
            hints: [`Product rule with $u = x^{${m}}$ and $v = e^{x}$.`, 'Factor out the common factors at the end.'],
            solution: [`Let $u = x^{${m}}$ and $v = e^x$, so $u' = ${m}${monoTex(1, m - 1)}$ and $v' = e^x$.`, `Product rule: $${dOf(n)} = ${m}${monoTex(1, m - 1)}e^{x} + x^{${m}}e^{x}$.`, `Factor: $${dOf(n)} = ${monoTex(1, m - 1)}e^{x}(x + ${m})$.`],
          };
        }
        return {
          prompt: askPrompt(rng, n, 'e^{x}\\ln x'),
          parts: [derivPart(n, 'e^x(ln(x) + 1/x)')],
          hints: ['Product rule with $u = e^x$ and $v = \\ln x$.', '$(e^x)\' = e^x$ and $(\\ln x)\' = \\dfrac{1}{x}$.'],
          solution: ["Let $u = e^x$ and $v = \\ln x$, so $u' = e^x$ and $v' = \\dfrac{1}{x}$.", `Product rule: $${dOf(n)} = e^{x}\\ln x + \\dfrac{e^{x}}{x}$.`, `So $${dOf(n)} = e^{x}\\left(\\ln x + \\dfrac{1}{x}\\right)$.`],
        };
      }
      if (kind === 'quotient') {
        const form = rng.pick(['exOverX', 'lnOverX', 'xOverEx', 'exOverExPlus1', 'lnOverX2'] as const);
        const T: Record<typeof form, { f: string; d: string; x: string; u: string; v: string; du: string; dv: string; mid: string }> = {
          exOverX: { f: '\\dfrac{e^{x}}{x}', d: '\\dfrac{e^{x}(x - 1)}{x^{2}}', x: 'e^x(x - 1)/x^2', u: 'e^x', v: 'x', du: 'e^x', dv: '1', mid: '\\dfrac{xe^{x} - e^{x}}{x^{2}}' },
          lnOverX: { f: '\\dfrac{\\ln x}{x}', d: '\\dfrac{1 - \\ln x}{x^{2}}', x: '(1 - ln(x))/x^2', u: '\\ln x', v: 'x', du: '\\dfrac{1}{x}', dv: '1', mid: '\\dfrac{\\frac{1}{x}\\cdot x - \\ln x}{x^{2}}' },
          xOverEx: { f: '\\dfrac{x}{e^{x}}', d: '\\dfrac{1 - x}{e^{x}}', x: '(1 - x)/e^x', u: 'x', v: 'e^x', du: '1', dv: 'e^x', mid: '\\dfrac{e^{x} - xe^{x}}{(e^{x})^{2}}' },
          exOverExPlus1: { f: '\\dfrac{e^{x}}{e^{x} + 1}', d: '\\dfrac{e^{x}}{(e^{x} + 1)^{2}}', x: 'e^x/(e^x + 1)^2', u: 'e^x', v: 'e^x + 1', du: 'e^x', dv: 'e^x', mid: '\\dfrac{e^{x}(e^{x} + 1) - e^{x}e^{x}}{(e^{x} + 1)^{2}}' },
          lnOverX2: { f: '\\dfrac{\\ln x}{x^{2}}', d: '\\dfrac{1 - 2\\ln x}{x^{3}}', x: '(1 - 2ln(x))/x^3', u: '\\ln x', v: 'x^2', du: '\\dfrac{1}{x}', dv: '2x', mid: '\\dfrac{\\frac{1}{x}\\cdot x^{2} - 2x\\ln x}{x^{4}}' },
        };
        const t = T[form];
        return {
          prompt: askPrompt(rng, n, t.f),
          parts: [derivPart(n, t.x)],
          hints: ["Quotient rule: $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$.", 'Simplify by cancelling a common factor at the end.'],
          solution: [`Let $u = ${t.u}$ and $v = ${t.v}$, so $u' = ${t.du}$ and $v' = ${t.dv}$.`, `Quotient rule: $${dOf(n)} = ${t.mid}$.`, `Simplify: $${dOf(n)} = ${t.d}$.`],
        };
      }
      // log laws first
      return logLaws(rng, n);
    }

    const kind = rng.weighted([['combo', 3], ['applied', 3], ['critical', 2], ['logLaws', 1]] as const);
    if (kind === 'applied') return expApplied(rng);
    if (kind === 'critical') return expCritical(rng);
    if (kind === 'logLaws') return logLaws(rng, nameXY(rng), true);
    return expCombo(rng);
  },
});

/** ln of a product, quotient or power: expand with the laws of logarithms first. */
function logLaws(rng: Rng, n: Fn, hard = false): GenOutput {
  const m = rng.int(2, 4);
  const a = rng.int(1, 4);
  let b = rng.int(1, 6);
  while (gcd(a, b) !== 1) b = rng.int(1, 6);
  const form = hard ? rng.pick(['quotPow', 'rootProd'] as const) : rng.pick(['prod', 'quot', 'root'] as const);
  const L = ptex([b, a]);
  const Lx = ptxt([b, a]);
  if (form === 'prod') {
    // ln(x^m (ax + b)) = m ln x + ln(ax + b)
    return {
      prompt: askPrompt(rng, n, `\\ln\\left(x^{${m}}(${L})\\right)`),
      parts: [derivPart(n, `${m}/x + ${a}/(${Lx})`)],
      hints: ['Expand the logarithm first: $\\ln(AB) = \\ln A + \\ln B$ and $\\ln A^n = n\\ln A$.', '$\\dfrac{d}{dx}\\ln(ax + b) = \\dfrac{a}{ax + b}$.'],
      solution: [`Expand: $${fnOf(n)} = ${m}\\ln x + \\ln(${L})$.`, `Differentiate: $${dOf(n)} = \\dfrac{${m}}{x} + \\dfrac{${a}}{${L}}$.`],
    };
  }
  if (form === 'quot') {
    const c = rng.int(1, 4);
    let e = rng.intExcept(1, 6, [b]);
    while (gcd(c, e) !== 1) e = rng.intExcept(1, 6, [b]);
    const M = ptex([-e, c]);
    const Mx = ptxt([-e, c]);
    return {
      prompt: askPrompt(rng, n, `\\ln\\left(\\dfrac{${L}}{${M}}\\right)`),
      parts: [derivPart(n, `${a}/(${Lx}) - ${c}/(${Mx})`)],
      hints: ['Expand the logarithm first: $\\ln\\dfrac{A}{B} = \\ln A - \\ln B$.', '$\\dfrac{d}{dx}\\ln(ax + b) = \\dfrac{a}{ax + b}$.'],
      solution: [`Expand: $${fnOf(n)} = \\ln(${L}) - \\ln(${M})$.`, `Differentiate: $${dOf(n)} = \\dfrac{${a}}{${L}} - \\dfrac{${c}}{${M}}$.`],
    };
  }
  if (form === 'root') {
    const c = rng.int(1, 9);
    return {
      prompt: askPrompt(rng, n, `\\ln\\sqrt{x^{2} + ${c}}`),
      parts: [derivPart(n, `x/(x^2 + ${c})`)],
      hints: ['Write the root as a power and bring it in front: $\\ln\\sqrt{A} = \\tfrac{1}{2}\\ln A$.', `Then $\\dfrac{d}{dx}\\ln(x^{2} + ${c}) = \\dfrac{2x}{x^{2} + ${c}}$.`],
      solution: [`Power law: $${fnOf(n)} = \\tfrac{1}{2}\\ln(x^{2} + ${c})$.`, `Differentiate: $${dOf(n)} = \\tfrac{1}{2}\\cdot\\dfrac{2x}{x^{2} + ${c}} = \\dfrac{x}{x^{2} + ${c}}$.`],
    };
  }
  if (form === 'quotPow') {
    // ln((ax + b)^m / x^k) = m ln(ax + b) - k ln x
    const k = rng.int(1, 3);
    return {
      prompt: askPrompt(rng, n, `\\ln\\left(\\dfrac{(${L})^{${m}}}{x^{${k}}}\\right)`),
      parts: [derivPart(n, `${m * a}/(${Lx}) - ${k}/x`)],
      hints: ['Expand with the quotient and power laws before differentiating.', `$${fnOf(n)} = ${m}\\ln(${L}) - ${k === 1 ? '' : k}\\ln x$.`],
      solution: [`Expand: $${fnOf(n)} = ${m}\\ln(${L}) - ${k === 1 ? '' : k}\\ln x$.`, `Differentiate: $${dOf(n)} = ${m}\\cdot\\dfrac{${a}}{${L}} - \\dfrac{${k}}{x} = \\dfrac{${m * a}}{${L}} - \\dfrac{${k}}{x}$.`],
    };
  }
  // ln(x^m sqrt(x^2 + c))
  const c = rng.int(1, 9);
  return {
    prompt: askPrompt(rng, n, `\\ln\\left(x^{${m}}\\sqrt{x^{2} + ${c}}\\right)`),
    parts: [derivPart(n, `${m}/x + x/(x^2 + ${c})`)],
    hints: ['Expand with the product and power laws before differentiating.', `$${fnOf(n)} = ${m}\\ln x + \\tfrac{1}{2}\\ln(x^{2} + ${c})$.`],
    solution: [`Expand: $${fnOf(n)} = ${m}\\ln x + \\tfrac{1}{2}\\ln(x^{2} + ${c})$.`, `Differentiate: $${dOf(n)} = \\dfrac{${m}}{x} + \\tfrac{1}{2}\\cdot\\dfrac{2x}{x^{2} + ${c}} = \\dfrac{${m}}{x} + \\dfrac{x}{x^{2} + ${c}}$.`],
  };
}

/** Exact derivative values of exponential and logarithmic functions. */
function expValue(rng: Rng): GenOutput {
  const n = nameX(rng);
  const form = rng.pick(['lnQuad', 'xe2x', 'ex2', 'logb'] as const);
  if (form === 'lnQuad') {
    const k = rng.int(1, 4);
    const c = rng.int(1, 12);
    const val = (2 * k) / (k * k + c);
    return {
      prompt: `Given $${fnOf(n)} = \\ln(x^{2} + ${c})$, find $${dAt(n, `${k}`)}$.`,
      parts: [numPart(val, { label: `$${dAt(n, `${k}`)} =$` })],
      hints: ["Chain rule: $\\dfrac{d}{dx}\\ln u = \\dfrac{u'}{u}$.", 'Find the derivative, then substitute.'],
      solution: [`Differentiate: $${n.f}'(x) = \\dfrac{2x}{x^{2} + ${c}}$.`, `Substitute $x = ${k}$: $${dAt(n, `${k}`)} = \\dfrac{${2 * k}}{${k * k + c}} = ${tn(val, true)}$.`, `So $${dAt(n, `${k}`)} = ${tn(val, true)}$.`],
    };
  }
  if (form === 'xe2x') {
    const k = rng.pick([2, 3, -1, -2]);
    const x0 = rng.pick([0, 1]);
    const kx = k === -1 ? '-x' : `${k}x`;
    const val = Math.exp(k * x0) * (1 + k * x0);
    const exact = x0 === 0 ? '1' : `${1 + k === 1 ? '' : 1 + k === -1 ? '-' : 1 + k}e^{${k}}`;
    return {
      prompt: `Given $${fnOf(n)} = xe^{${kx}}$, find the exact value of $${dAt(n, `${x0}`)}$.`,
      parts: [numPart(val, { label: `$${dAt(n, `${x0}`)} =$` })],
      hints: ['Product rule with $u = x$ and $v = e^{' + kx + '}$.', 'Simplify the derivative before substituting.'],
      solution: [`Product rule: $${n.f}'(x) = ${joinTerms([`e^{${kx}}`, `${cf(k)}xe^{${kx}}`])} = e^{${kx}}(1 ${k < 0 ? '-' : '+'} ${Math.abs(k) === 1 ? '' : Math.abs(k)}x)$.`, `Substitute $x = ${x0}$: $${dAt(n, `${x0}`)} = e^{${k * x0}}(${1 + k * x0}) = ${exact}$.`, `So $${dAt(n, `${x0}`)} = ${exact}$${x0 === 0 ? '' : ` (about $${fmt(val, 3)}$)`}.`],
      answerDisplay: `$${dAt(n, `${x0}`)} = ${exact}$`,
    };
  }
  if (form === 'ex2') {
    const c = rng.pick([1, 2, 3]);
    const val = 2 * c * Math.E;
    return {
      prompt: `Given $${fnOf(n)} = ${cf(c)}e^{x^{2}}$, find the exact value of $${dAt(n, '1')}$.`,
      parts: [numPart(val, { label: `$${dAt(n, '1')} =$` })],
      hints: ["Chain rule: $\\dfrac{d}{dx}e^{u} = e^{u}u'$ with $u = x^2$.", 'Then substitute $x = 1$.'],
      solution: [`Chain rule: $${n.f}'(x) = ${cf(c)}e^{x^{2}}\\cdot 2x = ${2 * c}xe^{x^{2}}$.`, `Substitute $x = 1$: $${dAt(n, '1')} = ${2 * c}(1)e^{1} = ${2 * c}e$.`, `So $${dAt(n, '1')} = ${2 * c}e$ (about $${fmt(val, 3)}$).`],
      answerDisplay: `$${dAt(n, '1')} = ${2 * c}e$`,
    };
  }
  const b = rng.pick([2, 3, 10]);
  const x0 = rng.pick([1, 2, 4, 5]);
  const val = 1 / (x0 * Math.log(b));
  return {
    prompt: `Given $${fnOf(n)} = \\log_{${b}} x$, find $${dAt(n, `${x0}`)}$ to the nearest thousandth.`,
    parts: [numPart(val, { label: `$${dAt(n, `${x0}`)} =$`, decimals: 3, exact: true })],
    hints: ['$\\dfrac{d}{dx}\\log_a x = \\dfrac{1}{x\\ln a}$.', 'Substitute, then use a calculator for $\\ln ' + b + '$.'],
    solution: [`Differentiate: $${n.f}'(x) = \\dfrac{1}{x\\ln ${b}}$.`, `Substitute $x = ${x0}$: $${dAt(n, `${x0}`)} = \\dfrac{1}{${x0}\\ln ${b}} \\approx ${val.toFixed(3)}$.`, `So $${dAt(n, `${x0}`)} \\approx ${val.toFixed(3)}$.`],
    calculator: true,
  };
}

/** Harder combinations with exponential and logarithmic functions. */
function expCombo(rng: Rng): GenOutput {
  const n = nameXY(rng);
  const form = rng.pick(['expTrig', 'x2emx', 'lnTrig', 'eSin', 'lnLn', 'log10'] as const);
  if (form === 'expTrig') {
    const k = rng.int(2, 4);
    const m = rng.int(2, 5);
    const f = rng.pick(['sin', 'cos'] as Trig[]);
    const dIn = f === 'sin' ? `${k}\\sin ${m}x + ${m}\\cos ${m}x` : `${k}\\cos ${m}x - ${m}\\sin ${m}x`;
    const dInX = f === 'sin' ? `${k}sin(${m}x) + ${m}cos(${m}x)` : `${k}cos(${m}x) - ${m}sin(${m}x)`;
    return {
      prompt: askPrompt(rng, n, `e^{${k}x}\\${f} ${m}x`),
      parts: [derivPart(n, `e^(${k}x)(${dInX})`)],
      hints: ['Product rule, with the chain rule for each factor.', `$\\dfrac{d}{dx}e^{${k}x} = ${k}e^{${k}x}$ and $\\dfrac{d}{dx}\\${f} ${m}x = ${f === 'sin' ? '' : '-'}${m}\\${f === 'sin' ? 'cos' : 'sin'} ${m}x$.`],
      solution: [
        `Let $u = e^{${k}x}$ and $v = \\${f} ${m}x$, so $u' = ${k}e^{${k}x}$ and $v' = ${f === 'sin' ? '' : '-'}${m}\\${f === 'sin' ? 'cos' : 'sin'} ${m}x$.`,
        `Product rule: $${dOf(n)} = ${k}e^{${k}x}\\${f} ${m}x ${f === 'sin' ? '+' : '-'} ${m}e^{${k}x}\\${f === 'sin' ? 'cos' : 'sin'} ${m}x$.`,
        `Factor: $${dOf(n)} = e^{${k}x}(${dIn})$.`,
      ],
    };
  }
  if (form === 'x2emx') {
    const m = rng.int(1, 3);
    const mx = m === 1 ? '-x' : `-${m}x`;
    // f' = xe^{-mx}(2 - mx), or 2xe^{-2x}(1 - x) when m = 2.
    const fac = m === 2 ? ['2xe^{-2x}(1 - x)', '2x e^(-2x)(1 - x)'] : [`xe^{${mx}}(2 - ${m === 1 ? '' : m}x)`, `x e^(${mx})(2 - ${m === 1 ? '' : m}x)`];
    return {
      prompt: askPrompt(rng, n, `x^{2}e^{${mx}}`),
      parts: [derivPart(n, fac[1])],
      hints: ['Product rule with $u = x^2$ and $v = e^{' + mx + '}$ (chain rule for $v\'$).', 'Factor out $xe^{' + mx + '}$ at the end.'],
      solution: [`Let $u = x^{2}$ and $v = e^{${mx}}$, so $u' = 2x$ and $v' = ${m === 1 ? '-' : `-${m}`}e^{${mx}}$.`, `Product rule: $${dOf(n)} = 2xe^{${mx}} - ${m === 1 ? '' : m}x^{2}e^{${mx}}$.`, `Factor: $${dOf(n)} = ${fac[0]}$.`],
    };
  }
  if (form === 'lnTrig') {
    const f = rng.pick(['sin', 'cos', 'sec'] as Trig[]);
    const res = f === 'sin' ? ['\\cot x', 'cot(x)', '\\dfrac{\\cos x}{\\sin x}'] : f === 'cos' ? ['-\\tan x', '-tan(x)', '\\dfrac{-\\sin x}{\\cos x}'] : ['\\tan x', 'tan(x)', '\\dfrac{\\sec x\\tan x}{\\sec x}'];
    return {
      prompt: askPrompt(rng, n, `\\ln(\\${f} x)`),
      parts: [derivPart(n, res[1])],
      hints: ["Chain rule: $\\dfrac{d}{dx}\\ln u = \\dfrac{u'}{u}$.", `Here $u = \\${f} x$; simplify the quotient to a single trigonometric function.`],
      solution: [`Let $u = \\${f} x$, so $u' = ${ttTex(dPowTrig(1, f, 1, argLin(1)))}$.`, `$${dOf(n)} = \\dfrac{u'}{u} = ${res[2]} = ${res[0]}$.`],
    };
  }
  if (form === 'eSin') {
    const f = rng.pick(['sin', 'cos', 'tan'] as Trig[]);
    const dt = ttTex(dPowTrig(1, f, 1, argLin(1)));
    const dtx = ttTxt(dPowTrig(1, f, 1, argLin(1)));
    return {
      prompt: askPrompt(rng, n, `e^{\\${f} x}`),
      parts: [derivPart(n, `${dtx.startsWith('-') ? `-${dtx.slice(1)}` : dtx} e^(${f}(x))`)],
      hints: [`The inside function is $u = \\${f} x$.`, "Chain rule: $\\dfrac{d}{dx}e^{u} = e^{u}u'$."],
      solution: [`Let $u = \\${f} x$, so $u' = ${dt}$.`, `Chain rule: $${dOf(n)} = e^{\\${f} x}\\cdot ${dt.startsWith('-') ? `\\left(${dt}\\right)` : dt}$, so $${dOf(n)} = ${dt}\\,e^{\\${f} x}$.`],
    };
  }
  if (form === 'lnLn') {
    return {
      prompt: askPrompt(rng, n, '\\ln(\\ln x)'),
      parts: [derivPart(n, '1/(x ln(x))')],
      hints: ['The inside function is $u = \\ln x$.', "$\\dfrac{d}{dx}\\ln u = \\dfrac{u'}{u}$ with $u' = \\dfrac{1}{x}$."],
      solution: ["Let $u = \\ln x$, so $u' = \\dfrac{1}{x}$.", `$${dOf(n)} = \\dfrac{u'}{u} = \\dfrac{1/x}{\\ln x} = \\dfrac{1}{x\\ln x}$.`],
    };
  }
  const c = rng.int(1, 9);
  const k = rng.int(2, 3);
  return {
    prompt: askPrompt(rng, n, `\\log(x^{${k}} + ${c})`),
    parts: [derivPart(n, `${k}x^${k - 1}/((x^${k} + ${c})ln(10))`)],
    hints: ['$\\log$ means base $10$: $\\dfrac{d}{dx}\\log u = \\dfrac{u\'}{u\\ln 10}$.', `The inside function is $x^{${k}} + ${c}$.`],
    solution: [`Here $\\log$ is $\\log_{10}$, and $u = x^{${k}} + ${c}$ with $u' = ${monoTex(k, k - 1)}$.`, `$${dOf(n)} = \\dfrac{u'}{u\\ln 10} = \\dfrac{${monoTex(k, k - 1)}}{(x^{${k}} + ${c})\\ln 10}$.`],
  };
}

/** Exponential growth and decay rates. */
function expApplied(rng: Rng): GenOutput {
  const ctx = rng.pick(['population', 'decay', 'interest', 'cooling'] as const);
  if (ctx === 'population') {
    const P0 = rng.int(2, 9) * 1000;
    const k = rng.pick([0.02, 0.03, 0.025, 0.04, 0.015]);
    const T = rng.pick([5, 10, 15, 20]);
    const rate = P0 * k * Math.exp(k * T);
    const town = rng.pick(['Lakeside', 'Ashford', 'Oakridge', 'Stonebridge', 'Elmwood', 'Brookfield']);
    return {
      prompt: `The population of ${town} is modelled by $P(t) = ${P0}e^{${fmt(k)}t}$, where $t$ is the number of years after the model starts. How fast is the population growing when $t = ${T}$? Give the answer in people per year, to the nearest whole number.`,
      parts: [numPart(rate, { label: `$P'(${T}) =$`, decimals: 0, exact: true, suffix: 'people/year' })],
      hints: ["$\\dfrac{d}{dt}e^{kt} = ke^{kt}$.", 'Differentiate, then substitute the time.'],
      solution: [`Differentiate: $P'(t) = ${P0}(${fmt(k)})e^{${fmt(k)}t} = ${fmt(P0 * k)}e^{${fmt(k)}t}$.`, `Substitute $t = ${T}$: $P'(${T}) = ${fmt(P0 * k)}e^{${fmt(k * T)}} \\approx ${fmt(rate, 2)}$.`, `The population is growing by about $${Math.round(rate)}$ people per year.`],
      calculator: true,
    };
  }
  if (ctx === 'decay') {
    const m0 = rng.pick([50, 80, 100, 120, 200]);
    const k = rng.pick([0.03, 0.05, 0.02, 0.1, 0.08]);
    const T = rng.pick([5, 10, 20, 15]);
    const rate = -m0 * k * Math.exp(-k * T);
    return {
      prompt: `A sample of a radioactive isotope has mass $m(t) = ${m0}e^{-${fmt(k)}t}$ grams after $t$ years. Find $m'(${T})$, the rate of change of the mass at $t = ${T}$ years, to the nearest hundredth.`,
      parts: [numPart(rate, { label: `$m'(${T}) =$`, decimals: 2, exact: true, suffix: 'g/year' })],
      hints: ["$\\dfrac{d}{dt}e^{-kt} = -ke^{-kt}$.", 'The answer should be negative: the mass is decreasing.'],
      solution: [`Differentiate: $m'(t) = ${m0}(-${fmt(k)})e^{-${fmt(k)}t} = -${fmt(m0 * k)}e^{-${fmt(k)}t}$.`, `Substitute $t = ${T}$: $m'(${T}) = -${fmt(m0 * k)}e^{-${fmt(k * T)}} \\approx ${rate.toFixed(2)}$.`, `The mass is decreasing at about $${Math.abs(rate).toFixed(2)}$ g per year.`],
      calculator: true,
    };
  }
  if (ctx === 'interest') {
    const P = rng.pick([1000, 2500, 5000, 800, 1500]);
    const r = rng.pick([3, 4, 5, 6, 2.5]);
    const T = rng.pick([5, 10, 8, 12]);
    const g = 1 + r / 100;
    const rate = P * g ** T * Math.log(g);
    const name = rng.pick(['Maya', 'Owen', 'Fatima', 'Kenji', 'Isabelle', 'Tyler']);
    return {
      prompt: `${name} invests \\$${P} in an account that earns ${fmt(r)}% interest compounded annually, so the balance after $t$ years is $A(t) = ${P}(${fmt(g)})^{t}$ dollars. How fast is the balance growing at $t = ${T}$ years? Give the answer in dollars per year, to the nearest cent.`,
      parts: [numPart(Math.round(rate * 100) / 100, { label: `$A'(${T}) =$`, decimals: 2, tolerance: 0.011 })],
      hints: ['$\\dfrac{d}{dt}a^{t} = a^{t}\\ln a$.', 'Differentiate, substitute the time, then round to the nearest cent.'],
      solution: [`Differentiate: $A'(t) = ${P}(${fmt(g)})^{t}\\ln ${fmt(g)}$.`, `Substitute $t = ${T}$: $A'(${T}) = ${P}(${fmt(g)})^{${T}}\\ln ${fmt(g)} \\approx ${rate.toFixed(4)}$.`, `The balance is growing at about \\$${rate.toFixed(2)} per year.`],
      calculator: true,
    };
  }
  const Ta = rng.pick([20, 21, 22, 18]);
  const D = rng.pick([60, 70, 75, 80]);
  const k = rng.pick([0.1, 0.05, 0.08, 0.12]);
  const T = rng.pick([5, 10, 15]);
  const rate = -D * k * Math.exp(-k * T);
  return {
    prompt: `A cup of tea cools in a ${Ta} °C room. Its temperature after $t$ minutes is $T(t) = ${Ta} + ${D}e^{-${fmt(k)}t}$ °C. Find $T'(${T})$, the rate of change of the temperature at $t = ${T}$ min, to the nearest hundredth.`,
    parts: [numPart(rate, { label: `$T'(${T}) =$`, decimals: 2, exact: true, suffix: '°C/min' })],
    hints: ['The constant room temperature has derivative $0$.', "$\\dfrac{d}{dt}e^{-kt} = -ke^{-kt}$."],
    solution: [`Differentiate: $T'(t) = ${D}(-${fmt(k)})e^{-${fmt(k)}t} = -${fmt(D * k)}e^{-${fmt(k)}t}$.`, `Substitute $t = ${T}$: $T'(${T}) = -${fmt(D * k)}e^{-${fmt(k * T)}} \\approx ${rate.toFixed(2)}$.`, `The tea is cooling at about $${Math.abs(rate).toFixed(2)}$ °C per minute.`],
    calculator: true,
  };
}

/** Where is f'(x) = 0? Exponential and logarithmic functions. */
function expCritical(rng: Rng): GenOutput {
  const n = nameX(rng);
  const form = rng.pick(['xekx', 'x2ex', 'xlnx', 'lnxOverX', 'exMinusKx', 'xMinusKlnx'] as const);
  const ask = (fTex: string) => `Find the exact $x$-coordinate${form === 'x2ex' ? 's of all points' : ' of the point'} where the graph of $${fnOf(n)} = ${fTex}$ has a horizontal tangent line.`;
  if (form === 'xekx') {
    const k = rng.int(2, 6);
    return {
      prompt: ask(`xe^{-x/${k}}`),
      parts: [part({ kind: 'numbers', values: [k] }, { label: '$x =$' })],
      hints: ['Set the derivative equal to $0$.', 'Factor out the exponential: $e^{u}$ is never $0$.'],
      solution: [`Product rule: $${n.f}'(x) = e^{-x/${k}} - \\dfrac{x}{${k}}e^{-x/${k}} = e^{-x/${k}}\\left(1 - \\dfrac{x}{${k}}\\right)$.`, `Since $e^{-x/${k}} > 0$, set $1 - \\dfrac{x}{${k}} = 0$.`, `So $x = ${k}$.`],
    };
  }
  if (form === 'x2ex') {
    const k = rng.int(1, 3);
    const kx = k === 1 ? '-x' : `-${k}x`;
    const r = 2 / k;
    return {
      prompt: ask(`x^{2}e^{${kx}}`),
      parts: [part({ kind: 'numbers', values: [0, r] }, { label: '$x =$', placeholder: 'e.g. 0, 2' })],
      hints: ['Set the derivative equal to $0$.', 'Factor: $e^{u}$ is never $0$.'],
      solution: [`Product rule: $${n.f}'(x) = 2xe^{${kx}} - ${k === 1 ? '' : k}x^{2}e^{${kx}} = xe^{${kx}}(2 - ${k === 1 ? '' : k}x)$.`, `Since $e^{${kx}} > 0$, set $x(2 - ${k === 1 ? '' : k}x) = 0$.`, `So $x = 0$ and $x = ${tn(r)}$.`],
    };
  }
  if (form === 'xlnx') {
    const c = rng.pick([1, 2, 3]);
    return {
      prompt: ask(`${cf(c)}x\\ln x`),
      parts: [part({ kind: 'numbers', values: [Math.exp(-1)] }, { label: '$x =$' })],
      hints: ['Product rule, then set the derivative equal to $0$.', 'If $\\ln x = k$ then $x = e^{k}$.'],
      solution: [`Product rule: $${n.f}'(x) = ${c === 1 ? '\\ln x + x\\cdot\\dfrac{1}{x} = \\ln x + 1' : `${c}\\left(\\ln x + x\\cdot\\dfrac{1}{x}\\right) = ${c}(\\ln x + 1)`}$.`, 'Set $\\ln x + 1 = 0$: $\\ln x = -1$.', 'So $x = e^{-1} = \\dfrac{1}{e}$.'],
      answerDisplay: '$x = \\dfrac{1}{e}$',
    };
  }
  if (form === 'lnxOverX') {
    const c = rng.pick([1, 2, 5]);
    return {
      prompt: ask(`\\dfrac{${c === 1 ? '' : c}\\ln x}{x}`),
      parts: [part({ kind: 'numbers', values: [Math.E] }, { label: '$x =$' })],
      hints: ['Quotient rule, then set the numerator equal to $0$.', 'If $\\ln x = 1$ then $x = e$.'],
      solution: [`Quotient rule: $${n.f}'(x) = \\dfrac{${c === 1 ? '' : c}\\left(\\frac{1}{x}\\cdot x - \\ln x\\right)}{x^{2}} = \\dfrac{${c === 1 ? '' : c}(1 - \\ln x)}{x^{2}}$.`, 'Set the numerator equal to $0$: $\\ln x = 1$.', 'So $x = e$.'],
      answerDisplay: '$x = e$',
    };
  }
  if (form === 'exMinusKx') {
    const k = rng.pick([2, 3, 5, 4, 6]);
    return {
      prompt: ask(`e^{x} - ${k}x`),
      parts: [part({ kind: 'numbers', values: [Math.log(k)] }, { label: '$x =$' })],
      hints: ['Set the derivative equal to $0$.', 'Solve $e^x = k$ by taking the natural logarithm of both sides.'],
      solution: [`Differentiate: $${n.f}'(x) = e^{x} - ${k}$.`, `Set $e^{x} - ${k} = 0$: $e^{x} = ${k}$.`, `So $x = \\ln ${k}$ (about $${fmt(Math.log(k), 3)}$).`],
      answerDisplay: `$x = \\ln ${k}$`,
    };
  }
  const k = rng.int(2, 9);
  return {
    prompt: ask(`x - ${k}\\ln x`),
    parts: [part({ kind: 'numbers', values: [k] }, { label: '$x =$' })],
    hints: ['Set the derivative equal to $0$.', '$\\dfrac{d}{dx}\\ln x = \\dfrac{1}{x}$.'],
    solution: [`Differentiate: $${n.f}'(x) = 1 - \\dfrac{${k}}{x}$.`, `Set $1 - \\dfrac{${k}}{x} = 0$: $\\dfrac{${k}}{x} = 1$.`, `So $x = ${k}$.`],
  };
}

// ---------------------------------------------------------------------------
// 5.3 — Implicit differentiation
// ---------------------------------------------------------------------------

/** A monomial c·x^p·y^q. */
type Mono = [number, number, number];

function bTex(c: number, p: number, q: number): string {
  const xs = p === 0 ? '' : p === 1 ? 'x' : `x^{${p}}`;
  const ys = q === 0 ? '' : q === 1 ? 'y' : `y^{${q}}`;
  const body = `${xs}${ys}`;
  return body ? `${cf(c)}${body}` : tn(c);
}
function bTxt(c: number, p: number, q: number): string {
  const xs = p === 0 ? '' : p === 1 ? 'x' : `x^${p}`;
  const ys = q === 0 ? '' : q === 1 ? 'y' : `y^${q}`;
  const body = xs && ys ? `${xs}${q > 0 && p > 1 ? ' ' : ''}${ys}` : `${xs}${ys}`;
  return body ? `${cft(c)}${body}` : txn(c);
}
/** Combine like terms and sort (x powers first). */
function bCollect(ms: Mono[]): Mono[] {
  const map = new Map<string, Mono>();
  for (const [c, p, q] of ms) {
    const key = `${p},${q}`;
    const m = map.get(key);
    if (m) m[0] += c;
    else map.set(key, [c, p, q]);
  }
  return [...map.values()].filter((m) => Math.abs(m[0]) > 1e-12).sort((a, b) => b[1] + b[2] - (a[1] + a[2]) || b[1] - a[1]);
}
/** Collected terms, with a positive term first when there is one (2x - 2y^2 rather than -2y^2 + 2x). */
function bOrder(ms: Mono[]): Mono[] {
  const t = bCollect(ms);
  const i = t.findIndex((m) => m[0] > 0);
  return i > 0 ? [t[i], ...t.slice(0, i), ...t.slice(i + 1)] : t;
}
const bpTex = (ms: Mono[]) => joinTerms(bOrder(ms).map(([c, p, q]) => bTex(c, p, q)));
const bpTxt = (ms: Mono[]) => joinTerms(bOrder(ms).map(([c, p, q]) => bTxt(c, p, q)));
const bEval = (ms: Mono[], x: number, y: number) => ms.reduce((s, [c, p, q]) => s + c * x ** p * y ** q, 0);
const bScale = (ms: Mono[], k: number): Mono[] => ms.map(([c, p, q]) => [c * k, p, q]);

/** An implicit curve: lhs = rhs (both lists of monomials). */
interface Curve {
  lhs: Mono[];
  rhs: Mono[];
}
const curveTex = (cv: Curve) => `${bpTex(cv.lhs)} = ${bpTex(cv.rhs)}`;

const DYDX = '\\dfrac{dy}{dx}';

/** d/dx of one monomial (y a function of x), as LaTeX. */
function dMonoTex([c, p, q]: Mono): string {
  if (q === 0) return p === 0 ? '0' : bTex(c * p, p - 1, 0);
  const yPart = (k: number, pp: number, qq: number) => (pp === 0 && qq === 0 ? `${cf(k)}${DYDX}` : `${bTex(k, pp, qq)}${DYDX}`);
  if (p === 0) return yPart(c * q, 0, q - 1);
  return joinTerms([bTex(c * p, p - 1, q), yPart(c * q, p, q - 1)]);
}

/** dy/dx = -Fx/Fy for F = lhs - rhs, simplified; with working. */
function implicitWork(cv: Curve): { steps: string[]; num: Mono[]; den: Mono[]; dTex: string; dTxt: string } {
  const F = bCollect([...cv.lhs, ...bScale(cv.rhs, -1)]);
  const Fx = bCollect(F.filter((m) => m[1] > 0).map(([c, p, q]) => [c * p, p - 1, q] as Mono));
  const Fy = bCollect(F.filter((m) => m[2] > 0).map(([c, p, q]) => [c * q, p, q - 1] as Mono));
  let g = [...Fx, ...Fy].reduce((acc, m) => gcd(acc, m[0]), 0) || 1;
  if ((Fy[0]?.[0] ?? 1) < 0) g = -g;
  const num = bScale(Fx, -1 / g);
  const den = bScale(Fy, 1 / g);
  const nT = bpTex(num);
  const dT = bpTex(den);
  const nX = bpTxt(num);
  const dX = bpTxt(den);
  const dTex = den.length === 1 && den[0][0] === 1 && den[0][1] === 0 && den[0][2] === 0 ? nT : fracT(nT, dT);
  const dTxt = fracX(nX, dX);
  const dl = (ms: Mono[]) => joinTerms(bOrder(ms).map(dMonoTex));
  const rhsHasVar = cv.rhs.some((m) => m[1] > 0 || m[2] > 0);
  const steps = [
    `Differentiate both sides with respect to $x$. Treat $y$ as a function of $x$: $\\dfrac{d}{dx}(y^n) = ny^{n-1}${DYDX}$, and a product such as $xy$ needs the product rule.`,
    `$${dl(cv.lhs)} = ${rhsHasVar ? dl(cv.rhs) : '0'}$`,
    `Collect the $${DYDX}$ terms on one side: $(${bpTex(Fy)})${DYDX} = ${bpTex(bScale(Fx, -1))}$.`,
    `Divide${Math.abs(g) !== 1 || g < 0 ? ' and simplify' : ''}: $${DYDX} = ${dTex}$.`,
  ];
  return { steps, num, den, dTex, dTxt };
}

const IMPLICIT_HINTS = [
  'Differentiate every term with respect to $x$; each time you differentiate an expression in $y$, multiply by $\\dfrac{dy}{dx}$ (chain rule).',
  'Collect the terms containing $\\dfrac{dy}{dx}$ on one side, factor it out, and divide.',
];

const TRIPLES: Array<[number, number, number]> = [
  [3, 4, 5],
  [6, 8, 10],
  [5, 12, 13],
  [8, 15, 17],
  [4, 3, 5],
  [12, 5, 13],
  [8, 6, 10],
  [15, 8, 17],
];

/** Random polynomial curve terms (with a y-term) for d2 and d3. */
function randomCurve(rng: Rng, hard: boolean): Curve {
  const pool: Array<[number, number]> = hard
    ? [[2, 0], [0, 2], [1, 1], [3, 0], [0, 3], [2, 1], [1, 2], [2, 2], [3, 1], [1, 3], [0, 1], [1, 0]]
    : [[2, 0], [0, 2], [1, 1], [3, 0], [0, 3], [2, 1], [1, 2], [0, 1]];
  for (;;) {
    const picks = rng.sample(pool, 3);
    if (!picks.some(([p, q]) => p > 0 && q > 0)) continue;
    if (hard && !picks.some(([p, q]) => p + q >= 3 && p > 0 && q > 0)) continue;
    const lhs = bCollect(picks.map(([p, q]) => [rng.nonZero(-5, 5), p, q] as Mono));
    if (lhs[0][0] < 0) lhs[0][0] = -lhs[0][0];
    return { lhs, rhs: [] };
  }
}

const implicit = skill({
  id: 'm31-implicit',
  name: 'Implicit differentiation',
  description: 'Find dy/dx by implicit differentiation as an expression in x and y, and find the slope of the tangent line at a point on a curve.',
  outcomes: ['D4'],
  lessonId: 'm31-5-3',
  gen(rng, d): GenOutput {
    if (d === 1) {
      if (rng.chance(0.5)) {
        // dy/dx for a conic.
        const form = rng.pick(['circle', 'ellipse', 'hyperbola', 'xy', 'parabola'] as const);
        let cv: Curve;
        if (form === 'circle') cv = { lhs: [[1, 2, 0], [1, 0, 2]], rhs: [[rng.pick([4, 9, 16, 25, 36, 49, 100]), 0, 0]] };
        else if (form === 'ellipse') {
          const a = rng.int(1, 9);
          let b = rng.int(2, 9);
          if (b === a) b = a + 1;
          cv = { lhs: [[a, 2, 0], [b, 0, 2]], rhs: [[a * rng.int(1, 4) + b * rng.int(1, 4), 0, 0]] };
        } else if (form === 'hyperbola') {
          const a = rng.int(1, 5);
          const b = rng.int(1, 5);
          cv = { lhs: [[a, 2, 0], [-b, 0, 2]], rhs: [[rng.int(1, 30), 0, 0]] };
        } else if (form === 'xy') cv = { lhs: [[1, 1, 1]], rhs: [[rng.int(2, 24), 0, 0]] };
        else cv = { lhs: [[1, 0, 2]], rhs: [[rng.int(2, 12), 1, 0]] };
        const w = implicitWork(cv);
        return {
          prompt: `Use implicit differentiation to find $${DYDX}$ for the curve $${curveTex(cv)}$. Give the answer in terms of $x$ and $y$.`,
          parts: [part({ kind: 'expression', expected: w.dTxt }, { label: `$${DYDX} =$` })],
          hints: IMPLICIT_HINTS,
          solution: [...w.steps, `So $${DYDX} = ${w.dTex}$.`],
        };
      }
      // Slope at a point on a circle.
      const [a, b, r] = rng.pick(TRIPLES);
      const x0 = a * rng.sign();
      const y0 = b * rng.sign();
      const slope = -x0 / y0;
      return {
        prompt: `Find the slope of the tangent line to the circle $x^{2} + y^{2} = ${r * r}$ at the point $(${x0},\\ ${y0})$.`,
        parts: [numPart(slope, { label: 'Slope' })],
        hints: IMPLICIT_HINTS,
        solution: [
          `Differentiate implicitly: $2x + 2y${DYDX} = 0$, so $${DYDX} = -\\dfrac{x}{y}$.`,
          `At $(${x0},\\ ${y0})$: $${DYDX} = -\\dfrac{${x0}}{${y0}} = ${tn(slope, true)}$.`,
          `The slope of the tangent is $${tn(slope, true)}$.`,
        ],
      };
    }
    if (d === 2) {
      const cv0 = randomCurve(rng, false);
      if (rng.chance(0.5)) {
        const c = rng.int(1, 30) * rng.sign();
        const cv = { lhs: cv0.lhs, rhs: [[c, 0, 0]] as Mono[] };
        const w = implicitWork(cv);
        return {
          prompt: `Use implicit differentiation to find $${DYDX}$ for the curve $${curveTex(cv)}$. Give the answer in terms of $x$ and $y$.`,
          parts: [part({ kind: 'expression', expected: w.dTxt }, { label: `$${DYDX} =$` })],
          hints: IMPLICIT_HINTS,
          solution: [...w.steps, `So $${DYDX} = ${w.dTex}$.`],
        };
      }
      return slopeAtPoint(rng, cv0);
    }
    const kind = rng.weighted([['poly', 2], ['polySlope', 2], ['transc', 3], ['horizontal', 2]] as const);
    if (kind === 'poly') {
      const cv0 = randomCurve(rng, true);
      const cv = { lhs: cv0.lhs, rhs: [[rng.int(1, 30) * rng.sign(), 0, 0]] as Mono[] };
      const w = implicitWork(cv);
      return {
        prompt: `Use implicit differentiation to find $${DYDX}$ for the curve $${curveTex(cv)}$. Give the answer in terms of $x$ and $y$.`,
        parts: [part({ kind: 'expression', expected: w.dTxt }, { label: `$${DYDX} =$` })],
        hints: IMPLICIT_HINTS,
        solution: [...w.steps, `So $${DYDX} = ${w.dTex}$.`],
      };
    }
    if (kind === 'polySlope') return slopeAtPoint(rng, randomCurve(rng, true));
    if (kind === 'horizontal') {
      // x^2 + a xy + y^2 = 3m^2 with a = ±1: horizontal where 2x + ay = 0, i.e. y = -2x/a.
      const a = rng.pick([1, -1]);
      const m = rng.int(1, 4);
      const c = 3 * m * m;
      const cv: Curve = { lhs: [[1, 2, 0], [a, 1, 1], [1, 0, 2]], rhs: [[c, 0, 0]] };
      const pts: Array<[number, number]> = [
        [-m, 2 * m * a],
        [m, -2 * m * a],
      ];
      return {
        prompt: `Find the two points on the curve $${curveTex(cv)}$ where the tangent line is horizontal. Enter the point with the smaller $x$-coordinate first.`,
        parts: [
          part({ kind: 'point', x: pts[0][0], y: pts[0][1] }, { label: 'First point' }),
          part({ kind: 'point', x: pts[1][0], y: pts[1][1] }, { label: 'Second point' }),
        ],
        hints: ['A horizontal tangent has $\\dfrac{dy}{dx} = 0$, so the numerator of $\\dfrac{dy}{dx}$ is $0$.', 'Solve the numerator equation for $y$, substitute into the curve, and solve for $x$.'],
        solution: [
          `Differentiate implicitly: $2x ${a < 0 ? '-' : '+'} \\left(y + x${DYDX}\\right) + 2y${DYDX} = 0$, so $${DYDX} = ${a < 0 ? '\\dfrac{2x - y}{2y - x}' : '-\\dfrac{2x + y}{x + 2y}'}$.`,
          `The tangent is horizontal when the numerator is $0$: $2x ${a < 0 ? '-' : '+'} y = 0$, so $y = ${a < 0 ? '2x' : '-2x'}$.`,
          `Substitute: $x^{2} ${a < 0 ? '-' : '+'} x(${a < 0 ? '2x' : '-2x'}) + (${a < 0 ? '2x' : '-2x'})^{2} = ${c}$, so $x^{2} - 2x^{2} + 4x^{2} = 3x^{2} = ${c}$ and $x = \\pm ${m}$.`,
          `Then $y = ${a < 0 ? '2x' : '-2x'}$ gives the points $(${pts[0][0]},\\ ${pts[0][1]})$ and $(${pts[1][0]},\\ ${pts[1][1]})$ (the denominator is not $0$ there).`,
        ],
      };
    }
    return transcendentalSlope(rng);
  },
});

/** Slope of the tangent at an integer point on a polynomial curve. */
function slopeAtPoint(rng: Rng, cv0: Curve): GenOutput {
  for (let tries = 0; ; tries++) {
    const x0 = rng.intExcept(-3, 3, [0]);
    const y0 = rng.intExcept(-3, 3, [0]);
    const c = bEval(cv0.lhs, x0, y0);
    const cv: Curve = { lhs: cv0.lhs, rhs: [[c, 0, 0]] };
    const w = implicitWork(cv);
    const N = bEval(w.num, x0, y0);
    const D = bEval(w.den, x0, y0);
    if (D === 0 && tries < 40) continue;
    if (D === 0) cv0 = { lhs: [[1, 2, 0], [1, 1, 1], [1, 0, 2]], rhs: [] };
    if (D === 0) continue;
    const slope = N / D;
    const subNum = bpTex(w.num).replace(/x/g, `(${x0})`).replace(/y/g, `(${y0})`);
    const subDen = bpTex(w.den).replace(/x/g, `(${x0})`).replace(/y/g, `(${y0})`);
    return {
      prompt: `The point $(${x0},\\ ${y0})$ lies on the curve $${curveTex(cv)}$. Find the slope of the tangent line at this point.`,
      parts: [numPart(slope, { label: 'Slope' })],
      hints: [...IMPLICIT_HINTS.slice(0, 1), 'Find $\\dfrac{dy}{dx}$ in terms of $x$ and $y$, then substitute both coordinates of the point.'],
      solution: [
        ...w.steps,
        `Substitute $x = ${x0}$ and $y = ${y0}$: $${DYDX} = \\dfrac{${subNum}}{${subDen}} = ${fracVal(N, D)}$.`,
        `The slope of the tangent at $(${x0},\\ ${y0})$ is $${tn(slope, true)}$.`,
      ],
    };
  }
}

/** Slopes on curves with exponential, logarithmic and trigonometric terms. */
function transcendentalSlope(rng: Rng): GenOutput {
  const form = rng.pick(['xey', 'exy', 'x2siny', 'eyxy'] as const);
  if (form === 'xey') {
    // x e^y + a y = x0 through (x0, 0); y' = -e^y/(x e^y + a)
    const a = rng.int(1, 4);
    const x0 = rng.int(1, 6);
    const slope = -1 / (x0 + a);
    return {
      prompt: `The point $(${x0},\\ 0)$ lies on the curve $xe^{y} + ${a === 1 ? '' : a}y = ${x0}$. Find the slope of the tangent line at this point.`,
      parts: [numPart(slope, { label: 'Slope' })],
      hints: [IMPLICIT_HINTS[0], 'Use the product rule on $xe^{y}$: $\\dfrac{d}{dx}(xe^{y}) = e^{y} + xe^{y}\\dfrac{dy}{dx}$.'],
      solution: [
        `Differentiate: $e^{y} + xe^{y}${DYDX} + ${a === 1 ? '' : a}${DYDX} = 0$.`,
        `Solve: $${DYDX} = -\\dfrac{e^{y}}{xe^{y} + ${a}}$.`,
        `At $(${x0},\\ 0)$, $e^{0} = 1$: $${DYDX} = -\\dfrac{1}{${x0} + ${a}} = ${tn(slope, true)}$.`,
        `The slope is $${tn(slope, true)}$.`,
      ],
    };
  }
  if (form === 'exy') {
    // e^{xy} + a y = 1 + a y0 through (0, y0); y' = -y e^{xy} / (x e^{xy} + a)
    const a = rng.int(1, 4);
    const y0 = rng.nonZero(-4, 4);
    const slope = -y0 / a;
    return {
      prompt: `The point $(0,\\ ${y0})$ lies on the curve $e^{xy} ${a === 1 ? '+ ' : `+ ${a}`}y = ${1 + a * y0}$. Find the slope of the tangent line at this point.`,
      parts: [numPart(slope, { label: 'Slope' })],
      hints: [IMPLICIT_HINTS[0], 'Chain rule and product rule: $\\dfrac{d}{dx}e^{xy} = e^{xy}\\left(y + x\\dfrac{dy}{dx}\\right)$.'],
      solution: [
        `Differentiate: $e^{xy}\\left(y + x${DYDX}\\right) + ${a === 1 ? '' : a}${DYDX} = 0$.`,
        `Solve: $\\left(xe^{xy} + ${a}\\right)${DYDX} = -ye^{xy}$, so $${DYDX} = -\\dfrac{ye^{xy}}{xe^{xy} + ${a}}$.`,
        `At $(0,\\ ${y0})$, $e^{0} = 1$: $${DYDX} = -\\dfrac{${y0}}{0 + ${a}} = ${tn(slope, true)}$.`,
        `The slope is $${tn(slope, true)}$.`,
      ],
    };
  }
  if (form === 'x2siny') {
    // x^2 + a y + sin y = x0^2 through (x0, 0); y' = -2x/(a + cos y)
    const a = rng.int(1, 4);
    const x0 = rng.nonZero(-4, 4);
    const slope = (-2 * x0) / (a + 1);
    return {
      prompt: `The point $(${x0},\\ 0)$ lies on the curve $x^{2} + ${a === 1 ? '' : a}y + \\sin y = ${x0 * x0}$. Find the slope of the tangent line at this point.`,
      parts: [numPart(slope, { label: 'Slope' })],
      hints: [IMPLICIT_HINTS[0], '$\\dfrac{d}{dx}\\sin y = \\cos y\\dfrac{dy}{dx}$.'],
      solution: [
        `Differentiate: $2x + ${a === 1 ? '' : a}${DYDX} + \\cos y${DYDX} = 0$.`,
        `Solve: $${DYDX} = -\\dfrac{2x}{${a} + \\cos y}$.`,
        `At $(${x0},\\ 0)$, $\\cos 0 = 1$: $${DYDX} = -\\dfrac{${2 * x0}}{${a + 1}} = ${tn(slope, true)}$.`,
        `The slope is $${tn(slope, true)}$.`,
      ],
    };
  }
  // e^y + a x y = e^k through (0, k); y' = -a y/(e^y + a x) → -a k e^{-k}
  const a = rng.int(1, 3);
  const k = rng.int(1, 2);
  const slope = -a * k * Math.exp(-k);
  const exact = `-\\dfrac{${a * k}}{e${k === 1 ? '' : `^{${k}}`}}`;
  return {
    prompt: `The point $(0,\\ ${k})$ lies on the curve $e^{y} + ${a === 1 ? '' : a}xy = e${k === 1 ? '' : `^{${k}}`}$. Find the exact slope of the tangent line at this point.`,
    parts: [numPart(slope, { label: 'Slope' })],
    hints: [IMPLICIT_HINTS[0], 'Product rule on $xy$: $\\dfrac{d}{dx}(xy) = y + x\\dfrac{dy}{dx}$.'],
    solution: [
      `Differentiate: $e^{y}${DYDX} + ${a === 1 ? '' : a}\\left(y + x${DYDX}\\right) = 0$.`,
      `Solve: $${DYDX} = -\\dfrac{${a === 1 ? '' : a}y}{e^{y} + ${a === 1 ? '' : a}x}$.`,
      `At $(0,\\ ${k})$: $${DYDX} = ${exact}$.`,
      `The slope is $${exact}$ (about $${fmt(slope, 3)}$).`,
    ],
    answerDisplay: `slope $= ${exact}$`,
  };
}

// ---------------------------------------------------------------------------
// 5.3 — Higher derivatives
// ---------------------------------------------------------------------------

/** f'' label for a function name. */
const d2Of = (n: Fn) => (n.f ? `${n.f}''(${n.v})` : `\\dfrac{d^{2}y}{d${n.v}^{2}}`);
const d2Label = (n: Fn) => `$${d2Of(n)} =$`;

/** k^o in LaTeX, with brackets for a negative base. */
const kpow = (k: number, o: number) => `${k < 0 ? `(${k})` : k}^{${o}}`;

/** Derivative of the n-th order: f''', f^{(4)}. */
const dnOf = (f: string, k: number, at = 'x') => (k <= 3 ? `${f}${"'".repeat(k)}(${at})` : `${f}^{(${k})}(${at})`);

const higher = skill({
  id: 'm31-higher-derivative',
  name: 'Higher derivatives',
  description: 'Find second and higher derivatives of polynomial, power, exponential, logarithmic and trigonometric functions, evaluate them, and find second derivatives implicitly.',
  outcomes: ['D4'],
  lessonId: 'm31-5-3',
  gen(rng, d): GenOutput {
    if (d === 1) {
      const n = pickName(rng, true);
      const v = n.v;
      const p = [rng.int(-9, 9), rng.nonZero(-9, 9), rng.nonZero(-9, 9), rng.nonZero(-5, 5), ...(rng.chance(0.5) ? [rng.nonZero(-3, 3)] : [])];
      const d1 = pder(p);
      const d2 = pder(d1);
      if (rng.chance(0.5)) {
        return {
          prompt: `Find $${d2Of(n)}$ for $${fnOf(n)} = ${ptex(p, v)}$.`,
          parts: [part({ kind: 'expression', expected: ptxt(d2, v) }, { label: d2Label(n) })],
          hints: ['The second derivative is the derivative of the first derivative.', 'Differentiate twice, term by term.'],
          solution: [`First derivative: $${dOf(n)} = ${ptex(d1, v)}$.`, `Differentiate again: $${d2Of(n)} = ${ptex(d2, v)}$.`],
        };
      }
      const k = rng.intExcept(-3, 3, [0]);
      const val = peval(d2, k);
      const at = `${n.f}''(${k})`;
      return {
        prompt: `Given $${fnOf(n)} = ${ptex(p, v)}$, find $${at}$.`,
        parts: [numPart(val, { label: `$${at} =$` })],
        hints: ['Differentiate twice, then substitute.', 'The second derivative is the derivative of the first derivative.'],
        solution: [`$${dOf(n)} = ${ptex(d1, v)}$.`, `$${d2Of(n)} = ${ptex(d2, v)}$.`, `$${at} = ${ptex(d2, v).replace(new RegExp(v, 'g'), `(${k})`)} = ${val}$.`],
      };
    }
    if (d === 2) {
      const kind = rng.weighted([['powers', 2], ['transc', 3], ['third', 2], ['motion', 2]] as const);
      if (kind === 'powers') {
        const n = nameXY(rng);
        const e = rng.pick([-1, -2, -3, 1 / 2, 3 / 2, -1 / 2, 5 / 2]);
        const c = toFrac(e, 4)!.d === 2 ? rng.pick([4, 8, 2, 12]) * rng.sign() : rng.nonZero(-6, 6);
        const c1 = c * e;
        const c2 = c1 * (e - 1);
        const extra = rng.chance(0.5) ? { c: rng.nonZero(-5, 5), n: rng.int(3, 4) } : null;
        const fTex = joinTerms([powTex(c, e), ...(extra ? [monoTex(extra.c, extra.n)] : [])]);
        const d1T = joinTerms([powExpTex(c1, e - 1), ...(extra ? [monoTex(extra.c * extra.n, extra.n - 1)] : [])]);
        const d2T = joinTerms([powTex(c2, e - 2), ...(extra ? [monoTex(extra.c * extra.n * (extra.n - 1), extra.n - 2)] : [])]);
        const d2X = joinTerms([powTxt(c2, e - 2), ...(extra ? [monoTxt(extra.c * extra.n * (extra.n - 1), extra.n - 2)] : [])]);
        return {
          prompt: `Find $${d2Of(n)}$ for $${fnOf(n)} = ${fTex}$.`,
          parts: [part({ kind: 'expression', expected: d2X }, { label: d2Label(n) })],
          hints: ['Write each term as a power of $x$ first.', 'Apply the power rule twice.'],
          solution: [`Rewrite: $${fnOf(n)} = ${joinTerms([powExpTex(c, e), ...(extra ? [monoTex(extra.c, extra.n)] : [])])}$.`, `First derivative: $${dOf(n)} = ${d1T}$.`, `Second derivative: $${d2Of(n)} = ${joinTerms([powExpTex(c2, e - 2), ...(extra ? [monoTex(extra.c * extra.n * (extra.n - 1), extra.n - 2)] : [])])} = ${d2T}$.`],
        };
      }
      if (kind === 'transc') return secondTransc(rng, false);
      if (kind === 'third') {
        const n = nameX(rng);
        const f = n.f;
        const form = rng.pick(['poly', 'ekx', 'sin', 'recip'] as const);
        if (form === 'poly') {
          const p = [rng.int(-9, 9), rng.nonZero(-9, 9), rng.nonZero(-6, 6), rng.nonZero(-5, 5), rng.nonZero(-3, 3)];
          const d3 = pder(pder(pder(p)));
          return {
            prompt: `Find $${dnOf(f, 3)}$ for $${f}(x) = ${ptex(p)}$.`,
            parts: [part({ kind: 'expression', expected: ptxt(d3) }, { label: `$${dnOf(f, 3)} =$` })],
            hints: ['Differentiate three times.', 'Each differentiation lowers every power by one.'],
            solution: [`$${f}'(x) = ${ptex(pder(p))}$`, `$${f}''(x) = ${ptex(pder(pder(p)))}$`, `$${dnOf(f, 3)} = ${ptex(d3)}$`],
          };
        }
        if (form === 'ekx') {
          const k = rng.pick([2, 3, -2, -1, 4]);
          const kx = k === -1 ? '-x' : `${k}x`;
          const o = rng.int(3, 4);
          const c = k ** o;
          return {
            prompt: `Find $${dnOf(f, o)}$ for $${f}(x) = e^{${kx}}$.`,
            parts: [part({ kind: 'expression', expected: `${cft(c)}e^(${kx})` }, { label: `$${dnOf(f, o)} =$` })],
            hints: [`Each derivative multiplies by ${k}.`, `So the derivative of order $n$ is $(${k})^{n}e^{${kx}}$.`],
            solution: [`$${f}'(x) = ${cf(k)}e^{${kx}}$, $${f}''(x) = ${cf(k * k)}e^{${kx}}$, and each further derivative multiplies by $${k}$ again.`, `$${dnOf(f, o)} = ${kpow(k, o)}e^{${kx}} = ${cf(c)}e^{${kx}}$.`],
          };
        }
        if (form === 'sin') {
          const g = rng.pick(['sin', 'cos'] as Trig[]);
          const k = rng.int(2, 3);
          const o = 3;
          // d^3/dx^3 sin(kx) = -k^3 cos(kx); cos(kx) → k^3 sin(kx)
          const c = g === 'sin' ? -(k ** 3) : k ** 3;
          const h = g === 'sin' ? 'cos' : 'sin';
          return {
            prompt: `Find $${dnOf(f, o)}$ for $${f}(x) = \\${g} ${k}x$.`,
            parts: [part({ kind: 'expression', expected: `${c}${h}(${k}x)` }, { label: `$${dnOf(f, o)} =$` })],
            hints: ['Differentiate three times, using the chain rule each time.', `Each derivative brings out a factor of $${k}$.`],
            solution: g === 'sin'
              ? [`$${f}'(x) = ${k}\\cos ${k}x$`, `$${f}''(x) = -${k * k}\\sin ${k}x$`, `$${dnOf(f, 3)} = -${k ** 3}\\cos ${k}x$`]
              : [`$${f}'(x) = -${k}\\sin ${k}x$`, `$${f}''(x) = -${k * k}\\cos ${k}x$`, `$${dnOf(f, 3)} = ${k ** 3}\\sin ${k}x$`],
          };
        }
        const c = rng.pick([1, 2, 3, 4, 6]);
        // c/x: f' = -c/x^2, f'' = 2c/x^3, f''' = -6c/x^4
        return {
          prompt: `Find $${dnOf(f, 3)}$ for $${f}(x) = \\dfrac{${c}}{x}$.`,
          parts: [part({ kind: 'expression', expected: `${-6 * c}/x^4` }, { label: `$${dnOf(f, 3)} =$` })],
          hints: [`Write $\\dfrac{${c}}{x} = ${c}x^{-1}$.`, 'Apply the power rule three times.'],
          solution: [`$${f}(x) = ${c}x^{-1}$, so $${f}'(x) = -${c}x^{-2}$.`, `$${f}''(x) = ${2 * c}x^{-3}$.`, `$${dnOf(f, 3)} = -${6 * c}x^{-4} = -\\dfrac{${6 * c}}{x^{4}}$.`],
        };
      }
      // motion
      const a = rng.int(1, 3);
      const b = rng.int(2, 9) * a;
      const c = rng.int(1, 20);
      const T = rng.int(1, 6);
      const acc = 6 * a * T - 2 * b;
      const name = rng.pick(['A cyclist', 'A remote-control car', 'A particle', 'A drone']);
      return {
        prompt: `${name} moves along a straight line with position $s(t) = ${a === 1 ? '' : a}t^{3} - ${b}t^{2} + ${c}t$ metres after $t$ seconds. Find its acceleration at $t = ${T}$ s.`,
        parts: [numPart(acc, { label: `$s''(${T}) =$`, suffix: 'm/s²' })],
        hints: ['Velocity is $s\'(t)$ and acceleration is $s\'\'(t)$.', 'Differentiate twice, then substitute.'],
        solution: [`Velocity: $s'(t) = ${3 * a}t^{2} - ${2 * b}t + ${c}$.`, `Acceleration: $s''(t) = ${6 * a}t - ${2 * b}$.`, `$s''(${T}) = ${6 * a}(${T}) - ${2 * b} = ${acc}$, so the acceleration is $${acc}$ m/s².`],
      };
    }
    const kind = rng.weighted([['transc', 3], ['nth', 2], ['implicit2', 2]] as const);
    if (kind === 'transc') return secondTransc(rng, true);
    if (kind === 'nth') {
      const n = nameX(rng);
      const f = n.f;
      const form = rng.pick(['ekx0', 'recip1', 'xex0', 'sinBig', 'ln1'] as const);
      if (form === 'ekx0') {
        const k = rng.pick([2, 3, -2, -1]);
        const o = rng.int(4, 6);
        const kx = k === -1 ? '-x' : `${k}x`;
        const val = k ** o;
        return {
          prompt: `Given $${f}(x) = e^{${kx}}$, find $${dnOf(f, o, '0')}$.`,
          parts: [numPart(val, { label: `$${dnOf(f, o, '0')} =$` })],
          hints: ['Find the first few derivatives and look for a pattern.', `Each derivative multiplies by $${k}$.`],
          solution: [`$${f}'(x) = ${cf(k)}e^{${kx}}$, $${f}''(x) = ${cf(k * k)}e^{${kx}}$, … so $${dnOf(f, o)} = ${kpow(k, o)}e^{${kx}}$.`, `At $x = 0$: $${dnOf(f, o, '0')} = ${kpow(k, o)}e^{0} = ${val}$.`],
        };
      }
      if (form === 'recip1') {
        const o = rng.int(3, 5);
        let fact = 1;
        for (let i = 2; i <= o; i++) fact *= i;
        const val = (o % 2 === 0 ? 1 : -1) * fact;
        return {
          prompt: `Given $${f}(x) = \\dfrac{1}{x}$, find $${dnOf(f, o, '1')}$.`,
          parts: [numPart(val, { label: `$${dnOf(f, o, '1')} =$` })],
          hints: ['Write $\\dfrac{1}{x} = x^{-1}$ and differentiate several times.', 'Look for the pattern in the coefficients: $-1$, $2$, $-6$, $24$, …'],
          solution: [`$${f}'(x) = -x^{-2}$, $${f}''(x) = 2x^{-3}$, $${f}'''(x) = -6x^{-4}$, $${f}^{(4)}(x) = 24x^{-5}$, …`, `In general $${f}^{(n)}(x) = (-1)^{n}n!\\,x^{-(n+1)}$, so $${dnOf(f, o)} = ${val}x^{-${o + 1}}$.`, `At $x = 1$: $${dnOf(f, o, '1')} = ${val}$.`],
        };
      }
      if (form === 'xex0') {
        const o = rng.int(3, 8);
        return {
          prompt: `Given $${f}(x) = xe^{x}$, find $${dnOf(f, o, '0')}$.`,
          parts: [numPart(o, { label: `$${dnOf(f, o, '0')} =$` })],
          hints: ['Find the first few derivatives with the product rule and look for a pattern.', `$${f}'(x) = (x + 1)e^{x}$ and $${f}''(x) = (x + 2)e^{x}$.`],
          solution: [`$${f}'(x) = e^{x} + xe^{x} = (x + 1)e^{x}$, $${f}''(x) = (x + 2)e^{x}$, $${f}'''(x) = (x + 3)e^{x}$, …`, `So $${dnOf(f, o)} = (x + ${o})e^{x}$.`, `At $x = 0$: $${dnOf(f, o, '0')} = ${o}$.`],
        };
      }
      if (form === 'ln1') {
        const o = rng.int(3, 5);
        let fact = 1;
        for (let i = 2; i < o; i++) fact *= i;
        const val = (o % 2 === 1 ? 1 : -1) * fact;
        return {
          prompt: `Given $${f}(x) = \\ln x$, find $${dnOf(f, o, '1')}$.`,
          parts: [numPart(val, { label: `$${dnOf(f, o, '1')} =$` })],
          hints: ['$f\'(x) = x^{-1}$; keep differentiating.', 'Look for the pattern: $1$, $-1$, $2$, $-6$, …'],
          solution: [`$${f}'(x) = x^{-1}$, $${f}''(x) = -x^{-2}$, $${f}'''(x) = 2x^{-3}$, $${f}^{(4)}(x) = -6x^{-4}$, $${f}^{(5)}(x) = 24x^{-5}$.`, `At $x = 1$ every power of $x$ is $1$, so $${dnOf(f, o, '1')} = ${val}$.`],
        };
      }
      const g = rng.pick(['sin', 'cos'] as Trig[]);
      const o = rng.int(13, 60);
      const cycle = g === 'sin' ? ['\\sin x', '\\cos x', '-\\sin x', '-\\cos x'] : ['\\cos x', '-\\sin x', '-\\cos x', '\\sin x'];
      const cycleX = g === 'sin' ? ['sin(x)', 'cos(x)', '-sin(x)', '-cos(x)'] : ['cos(x)', '-sin(x)', '-cos(x)', 'sin(x)'];
      return {
        prompt: `Find $${dnOf(f, o)}$ for $${f}(x) = \\${g} x$.`,
        parts: [part({ kind: 'expression', expected: cycleX[o % 4] }, { label: `$${dnOf(f, o)} =$` })],
        hints: ['Find the first four derivatives: the pattern repeats.', `The derivatives repeat every $4$ steps, so use the remainder when $${o}$ is divided by $4$.`],
        solution: [`The derivatives of $\\${g} x$ cycle: $${cycle[1]}$, $${cycle[2]}$, $${cycle[3]}$, $${cycle[0]}$, then repeat every $4$.`, `$${o} = 4(${Math.floor(o / 4)}) + ${o % 4}$, so the derivative of order $${o}$ is the same as the derivative of order $${o % 4}$${o % 4 === 0 ? ' (the function itself)' : ''}.`, `So $${dnOf(f, o)} = ${cycle[o % 4]}$.`],
      };
    }
    // y'' implicitly on a x^2 + b y^2 = c, at a point.
    for (;;) {
      const x0 = rng.nonZero(-3, 3);
      const y0 = rng.nonZero(-3, 3);
      const a = rng.int(1, 4);
      const b = rng.pick([1, 2, 3, 4, -1, -2]);
      const c = a * x0 * x0 + b * y0 * y0;
      if (c === 0) continue;
      const y1 = (-a * x0) / (b * y0);
      const y2 = (-a * c) / (b * b * y0 ** 3);
      const K = -a / b;
      const kc = `${K < 0 ? '-' : ''}${Math.abs(K) === 1 ? '' : `${tn(Math.abs(K))}\\cdot`}`;
      const curve = `${joinTerms([monoTex(a, 2), monoTex(b, 2, 'y')])} = ${c}`;
      return {
        prompt: `The point $(${x0},\\ ${y0})$ lies on the curve $${curve}$. Find $\\dfrac{d^{2}y}{dx^{2}}$ at this point.`,
        parts: [numPart(y2, { label: '$\\dfrac{d^{2}y}{dx^{2}} =$' })],
        hints: ['Find $\\dfrac{dy}{dx}$ implicitly, then differentiate it again with the quotient rule (remember $y$ depends on $x$).', 'Substitute the value of $\\dfrac{dy}{dx}$ at the point, then the coordinates.'],
        solution: [
          `Differentiate: $${joinTerms([monoTex(2 * a, 1), `${monoTex(2 * b, 1, 'y')}\\,y'`])} = 0$, so $y' = ${kc}\\dfrac{x}{y}$. At the point, $y' = ${fracVal(-a * x0, b * y0)}$.`,
          `Differentiate $y'$ with the quotient rule: $y'' = ${kc}\\dfrac{y - xy'}{y^{2}}$.`,
          `Substitute $x = ${x0}$, $y = ${y0}$ and $y' = ${tn(y1, true)}$: $y'' = ${kc}\\dfrac{${y0} - (${x0})${bn(y1)}}{${y0 * y0}} = ${tn(y2, true)}$.`,
          `So $\\dfrac{d^{2}y}{dx^{2}} = ${tn(y2, true)}$ at $(${x0},\\ ${y0})$.`,
        ],
      };
    }
  },
});

/** Second derivatives of exponential, logarithmic, trigonometric and composite functions. */
function secondTransc(rng: Rng, hard: boolean): GenOutput {
  const n = nameXY(rng);
  type T = { f: string; d1: string; d2: string; x: string; how: string };
  const k = rng.int(2, 5);
  const a = rng.int(1, 4);
  const easy: Array<() => T> = [
    () => ({ f: `e^{${k}x}`, d1: `${k}e^{${k}x}`, d2: `${k * k}e^{${k}x}`, x: `${k * k}e^(${k}x)`, how: 'chain rule twice' }),
    () => ({ f: `\\sin ${k}x`, d1: `${k}\\cos ${k}x`, d2: `-${k * k}\\sin ${k}x`, x: `-${k * k}sin(${k}x)`, how: 'chain rule twice' }),
    () => ({ f: `\\cos ${k}x`, d1: `-${k}\\sin ${k}x`, d2: `-${k * k}\\cos ${k}x`, x: `-${k * k}cos(${k}x)`, how: 'chain rule twice' }),
    () => ({ f: `${a === 1 ? '' : a}\\ln x`, d1: `\\dfrac{${a}}{x}`, d2: `-\\dfrac{${a}}{x^{2}}`, x: `-${a}/x^2`, how: 'rewrite as a power' }),
    () => ({ f: 'xe^{x}', d1: '(x + 1)e^{x}', d2: '(x + 2)e^{x}', x: '(x + 2)e^x', how: 'product rule twice' }),
    () => ({ f: 'x\\ln x', d1: '\\ln x + 1', d2: '\\dfrac{1}{x}', x: '1/x', how: 'product rule' }),
    () => ({ f: `\\ln(${a === 1 ? '' : a}x + ${k})`, d1: `\\dfrac{${a}}{${a === 1 ? '' : a}x + ${k}}`, d2: `-\\dfrac{${a * a}}{(${a === 1 ? '' : a}x + ${k})^{2}}`, x: `-${a * a}/(${a === 1 ? '' : a}x + ${k})^2`, how: 'chain rule' }),
  ];
  const harder: Array<() => T> = [
    () => ({ f: `\\dfrac{x}{x + ${a}}`, d1: `\\dfrac{${a}}{(x + ${a})^{2}}`, d2: `-\\dfrac{${2 * a}}{(x + ${a})^{3}}`, x: `-${2 * a}/(x + ${a})^3`, how: 'quotient rule, then the chain rule' }),
    () => ({ f: `\\sqrt{${k === 1 ? '' : k}x + 1}`, d1: `\\dfrac{${k}}{2\\sqrt{${k}x + 1}}`, d2: `-\\dfrac{${k * k}}{4(${k}x + 1)^{3/2}}`, x: `-${k * k}/(4(${k}x + 1)^(3/2))`, how: 'chain rule twice' }),
    () => ({ f: 'e^{x^{2}}', d1: '2xe^{x^{2}}', d2: '(4x^{2} + 2)e^{x^{2}}', x: '(4x^2 + 2)e^(x^2)', how: 'chain rule, then the product rule' }),
    () => ({ f: `\\ln(x^{2} + ${a})`, d1: `\\dfrac{2x}{x^{2} + ${a}}`, d2: `\\dfrac{${2 * a} - 2x^{2}}{(x^{2} + ${a})^{2}}`, x: `(${2 * a} - 2x^2)/(x^2 + ${a})^2`, how: 'quotient rule' }),
    () => ({ f: 'x^{2}e^{x}', d1: '(x^{2} + 2x)e^{x}', d2: '(x^{2} + 4x + 2)e^{x}', x: '(x^2 + 4x + 2)e^x', how: 'product rule twice' }),
    () => ({ f: '\\tan x', d1: '\\sec^{2} x', d2: '2\\sec^{2} x\\tan x', x: '2sec^2(x)tan(x)', how: 'chain rule on $(\\sec x)^2$' }),
    () => ({ f: 'x\\sin x', d1: '\\sin x + x\\cos x', d2: '2\\cos x - x\\sin x', x: '2cos(x) - x sin(x)', how: 'product rule twice' }),
    () => ({ f: `\\dfrac{1}{x^{2} + ${a}}`, d1: `-\\dfrac{2x}{(x^{2} + ${a})^{2}}`, d2: `\\dfrac{6x^{2} - ${2 * a}}{(x^{2} + ${a})^{3}}`, x: `(6x^2 - ${2 * a})/(x^2 + ${a})^3`, how: 'chain rule, then the quotient rule' }),
    () => ({ f: '\\sin^{2} x', d1: '2\\sin x\\cos x = \\sin 2x', d2: '2\\cos 2x', x: '2cos(2x)', how: 'chain rule, then a double-angle identity' }),
  ];
  const t = rng.pick(hard ? harder : easy)();
  return {
    prompt: `Find $${d2Of(n)}$ for $${fnOf(n)} = ${t.f}$.`,
    parts: [part({ kind: 'expression', expected: t.x }, { label: d2Label(n) })],
    hints: ['Find the first derivative and simplify it before differentiating again.', `Use the ${t.how}.`],
    solution: [`First derivative: $${dOf(n)} = ${t.d1}$.`, `Differentiate again (${t.how}): $${d2Of(n)} = ${t.d2}$.`],
  };
}

export const TRANSCENDENTAL_SKILLS: SkillDef[] = [trigDerivative, expLog, implicit, higher];
