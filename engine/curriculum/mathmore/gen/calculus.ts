/**
 * More Mathematics Topics, Unit 19: A level calculus and numerical methods that Gradileo's grade
 * courses do not teach. Parametric differentiation and differentiating sin x and cos x from first
 * principles, locating roots and the Newton–Raphson method, the trapezium rule, integration by
 * parts, integrating with partial fractions, and separable differential equations.
 */
import { mc, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, frac, fracLatex, fracValue, polyString, roundTo, type Frac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Part, SkillDef } from '../../../types.ts';
import { eq3, isNice, N as Ng, s3, SF_TEXT, sfDecimals, sfPart } from './common.ts';

type Out = GenOutput;

/** A fraction answer, accepted as a fraction or a decimal and shown in lowest terms. */
const fracPart = (f: Frac, label?: string) => numPart(fracValue(f), { label, fraction: 'lowest' });
const F = (f: Frac) => fracLatex(f, { dfrac: true });
/** An answer that may be typed exactly (with ln, e, π, √) or to 3 significant figures. */
const exactPart = (v: number, label?: string): Part =>
  isNice(v) ? numPart(roundTo(v, sfDecimals(v)), { label, exact: true, display: 'decimal' }) : numPart(v, { label, decimals: sfDecimals(v), exact: true });
const EXACT_TEXT = 'Give your answer exactly, or to 3 significant figures.';
const DP4 = 'Give your answers to 4 decimal places.';
/** "(x - 3)" or "(x + 2)". */
const lin = (a: number, v = 'x') => (a === 0 ? v : `(${v} ${a > 0 ? '-' : '+'} ${Math.abs(a)})`);
/** "x - 3" or "x + 2", for a denominator or inside |…|. */
const bare = (a: number) => lin(a).replace(/[()]/g, '');
/** k times something in LaTeX: "3x", "x", "-x". */
const kx = (k: number, v: string) => (k === 1 ? v : k === -1 ? `-${v}` : `${k}${v}`);
/** A fraction as a typed coefficient: "", "-", "3*", "(3/4)*", "-(3/4)*". */
const tc = (f: Frac) => (f.d === 1 ? (f.n === 1 ? '' : f.n === -1 ? '-' : `${f.n}*`) : `${f.n < 0 ? '-' : ''}(${Math.abs(f.n)}/${f.d})*`);
/** A fraction as a LaTeX coefficient: "", "-", "3", "\tfrac{3}{4}". */
const lc = (f: Frac) => (f.d === 1 ? (f.n === 1 ? '' : f.n === -1 ? '-' : `${f.n}`) : `${f.n < 0 ? '-' : ''}\\tfrac{${Math.abs(f.n)}}{${f.d}}`);
/** Join signed LaTeX or typed terms: ["x", "-3"] → "x - 3". */
const join = (terms: string[]) => terms.filter(Boolean).map((t, i) => (i === 0 ? t : t.startsWith('-') ? `- ${t.slice(1)}` : `+ ${t}`)).join(' ');

// ---------------------------------------------------------------------------
// 19.1 Parametric differentiation, and sin x and cos x from first principles
// ---------------------------------------------------------------------------

const PI_ANGLES = [
  { tex: '\\dfrac{\\pi}{6}', v: Math.PI / 6 },
  { tex: '\\dfrac{\\pi}{4}', v: Math.PI / 4 },
  { tex: '\\dfrac{\\pi}{3}', v: Math.PI / 3 },
];

function parametricGradient(rng: Rng, d: Difficulty): Out {
  if (d === 3) {
    const a = rng.int(2, 6);
    const b = rng.pick([1, 2, 3, 4, 5].filter((x) => x !== a));
    const t = rng.pick(PI_ANGLES);
    if (rng.chance(0.5)) {
      const v = -(b * Math.cos(t.v)) / (a * Math.sin(t.v));
      return {
        prompt: `A curve has parametric equations $x = ${a}\\cos t$, $y = ${b}\\sin t$. Find the gradient $\\dfrac{dy}{dx}$ at the point where $t = ${t.tex}$. ${EXACT_TEXT}`,
        parts: [exactPart(v, '$\\dfrac{dy}{dx} =$')],
        hints: ['$\\dfrac{dy}{dx} = \\dfrac{dy/dt}{dx/dt}$.', `$\\dfrac{dx}{dt} = -${a}\\sin t$ and $\\dfrac{dy}{dt} = ${b}\\cos t$.`],
        solution: [`$\\dfrac{dy}{dx} = \\dfrac{${b}\\cos t}{-${a}\\sin t} = -\\dfrac{${b}}{${a}}\\cot t$`, `At $t = ${t.tex}$: $\\dfrac{dy}{dx} ${eq3(v)}$.`],
      };
    }
    // x = a sin t, y = b cos 2t: dy/dx = -2b sin 2t / (a cos t) = -4b sin t / a.
    const v = (-4 * b * Math.sin(t.v)) / a;
    return {
      prompt: `A curve has parametric equations $x = ${a}\\sin t$, $y = ${b}\\cos 2t$. Find the gradient $\\dfrac{dy}{dx}$ at the point where $t = ${t.tex}$. ${EXACT_TEXT}`,
      parts: [exactPart(v, '$\\dfrac{dy}{dx} =$')],
      hints: ['$\\dfrac{dy}{dx} = \\dfrac{dy/dt}{dx/dt}$.', `$\\dfrac{dx}{dt} = ${a}\\cos t$ and $\\dfrac{dy}{dt} = -${2 * b}\\sin 2t$.`],
      solution: [`$\\dfrac{dy}{dx} = \\dfrac{-${2 * b}\\sin 2t}{${a}\\cos t} = \\dfrac{-${4 * b}\\sin t\\cos t}{${a}\\cos t} = -\\dfrac{${4 * b}}{${a}}\\sin t$`, `At $t = ${t.tex}$: $\\dfrac{dy}{dx} ${eq3(v)}$.`],
    };
  }
  const c = retry(
    () => ({ p: rng.pick([1, 2, 3, -1, -2]), q: rng.int(-4, 4), r: rng.pick([1, 2, -1]), s: rng.int(-6, 6), t: rng.pick([-2, -1, 1, 2, 3]) }),
    (c) => 2 * c.p * c.t + c.q !== 0 && c.s !== 0,
  );
  const xt = polyString([[c.p, 't^2'], [c.q, 't']]);
  const yt = polyString([[c.r, 't^3'], [c.s, 't']]);
  const dxdt = 2 * c.p * c.t + c.q;
  const dydt = 3 * c.r * c.t * c.t + c.s;
  const m = frac(dydt, dxdt);
  const steps = [
    `$\\dfrac{dx}{dt} = ${polyString([[2 * c.p, 't'], [c.q, '']])}$ and $\\dfrac{dy}{dt} = ${polyString([[3 * c.r, 't^2'], [c.s, '']])}$.`,
    `At $t = ${c.t}$: $\\dfrac{dx}{dt} = ${dxdt}$ and $\\dfrac{dy}{dt} = ${dydt}$, so $\\dfrac{dy}{dx} = \\dfrac{${dydt}}{${dxdt}} = ${F(m)}$.`,
  ];
  if (d === 1) {
    return {
      prompt: `A curve has parametric equations $x = ${xt}$, $y = ${yt}$. Find $\\dfrac{dy}{dx}$ at the point where $t = ${c.t}$.`,
      parts: [fracPart(m, '$\\dfrac{dy}{dx} =$')],
      hints: ['Differentiate $x$ and $y$ with respect to $t$.', '$\\dfrac{dy}{dx} = \\dfrac{dy/dt}{dx/dt}$.'],
      solution: steps,
    };
  }
  const x0 = c.p * c.t * c.t + c.q * c.t;
  const y0 = c.r * c.t ** 3 + c.s * c.t;
  const k = frac(y0 * m.d - m.n * x0, m.d);
  return {
    prompt: `A curve has parametric equations $x = ${xt}$, $y = ${yt}$. The tangent at the point where $t = ${c.t}$ has equation $y = mx + c$. Find $m$ and $c$.`,
    parts: [fracPart(m, '$m =$'), fracPart(k, '$c =$')],
    hints: ['$m = \\dfrac{dy}{dx} = \\dfrac{dy/dt}{dx/dt}$ at that value of $t$.', `Find the point: put $t = ${c.t}$ into both equations, then use $y - y_1 = m(x - x_1)$.`],
    solution: [...steps, `The point is $(${x0}, ${y0})$, so $c = ${y0} - ${F(m)} \\times ${x0 < 0 ? `(${x0})` : x0} = ${F(k)}$.`],
  };
}

function firstPrinciplesTrig(rng: Rng, d: Difficulty): Out {
  const isSin = rng.chance(0.5);
  const fn = isSin ? '\\sin' : '\\cos';
  if (d === 1) {
    return {
      prompt: `To differentiate $${fn} x$ from first principles, which expression do we find the limit of as $h \\to 0$?`,
      parts: [part(mc(rng, `$\\dfrac{${fn}(x + h) - ${fn} x}{h}$`, [`$\\dfrac{${fn}(x + h) - ${fn} x}{x}$`, `$\\dfrac{${fn}(x + h) + ${fn} x}{h}$`, `$\\dfrac{${fn} h - ${fn} x}{h}$`]))],
      hints: ['The gradient of the chord from $x$ to $x + h$ is the change in $y$ over the change in $x$.', 'The change in $x$ is $h$.'],
      solution: [`The chord from $(x, ${fn} x)$ to $(x + h, ${fn}(x + h))$ has gradient $\\dfrac{${fn}(x + h) - ${fn} x}{h}$, and the derivative is its limit as $h \\to 0$.`],
    };
  }
  if (d === 2) {
    const expand = isSin ? '\\sin x\\cos h + \\cos x\\sin h' : '\\cos x\\cos h - \\sin x\\sin h';
    const ask = rng.pick(['which two limits complete the proof', 'what the two limits used in the proof are']);
    return {
      prompt: `In differentiating $${fn} x$ from first principles, $${fn}(x + h)$ is expanded as $${expand}$. Choose ${ask}.`,
      parts: [part(mc(rng, '$\\dfrac{\\sin h}{h} \\to 1$ and $\\dfrac{\\cos h - 1}{h} \\to 0$', ['$\\dfrac{\\sin h}{h} \\to 0$ and $\\dfrac{\\cos h - 1}{h} \\to 1$', '$\\dfrac{\\sin h}{h} \\to 1$ and $\\dfrac{\\cos h - 1}{h} \\to 1$', '$\\dfrac{\\sin h}{h} \\to 0$ and $\\dfrac{\\cos h - 1}{h} \\to 0$']))],
      hints: ['Use the small-angle approximations: $\\sin h \\approx h$ and $\\cos h \\approx 1 - \\tfrac{h^2}{2}$.', 'So $\\dfrac{\\sin h}{h} \\approx 1$ and $\\dfrac{\\cos h - 1}{h} \\approx -\\tfrac{h}{2}$.'],
      solution: [
        isSin
          ? '$\\dfrac{\\sin(x + h) - \\sin x}{h} = \\sin x\\left(\\dfrac{\\cos h - 1}{h}\\right) + \\cos x\\left(\\dfrac{\\sin h}{h}\\right)$'
          : '$\\dfrac{\\cos(x + h) - \\cos x}{h} = \\cos x\\left(\\dfrac{\\cos h - 1}{h}\\right) - \\sin x\\left(\\dfrac{\\sin h}{h}\\right)$',
        `As $h \\to 0$, $\\dfrac{\\sin h}{h} \\to 1$ and $\\dfrac{\\cos h - 1}{h} \\to 0$, so the derivative is $${isSin ? '\\cos x' : '-\\sin x'}$.`,
      ],
    };
  }
  const t = rng.pick([...PI_ANGLES, { tex: '\\dfrac{\\pi}{2}', v: Math.PI / 2 }, { tex: '\\dfrac{2\\pi}{3}', v: (2 * Math.PI) / 3 }]);
  const h = rng.pick([0.1, 0.01, 0.001]);
  const f = isSin ? Math.sin : Math.cos;
  const chord = (f(t.v + h) - f(t.v)) / h;
  const exact = isSin ? Math.cos(t.v) : -Math.sin(t.v);
  return {
    prompt: `For $y = ${fn} x$ ($x$ in radians), work out the gradient of the chord from $x = ${t.tex}$ to $x = ${t.tex} + ${h}$, to 4 decimal places. Then give the exact gradient of the curve at $x = ${t.tex}$.`,
    parts: [numPart(chord, { label: 'Chord gradient:', decimals: 4 }), numPart(exact, { label: 'Exact gradient:' })],
    hints: [`The chord gradient is $\\dfrac{${fn}(x + h) - ${fn} x}{h}$ with $h = ${h}$.`, `From first principles, $\\dfrac{d}{dx}${fn} x = ${isSin ? '\\cos x' : '-\\sin x'}$.`],
    solution: [`$\\dfrac{${fn}(${t.tex} + ${h}) - ${fn}\\,${t.tex}}{${h}} \\approx ${fmtFixed(chord, 4)}$`, `The exact gradient is $${isSin ? '\\cos' : '-\\sin'}\\,${t.tex} ${eq3(exact)}$; the chord gradient gets closer to it as $h$ gets smaller.`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 19.2 Locating roots, and the Newton–Raphson method
// ---------------------------------------------------------------------------

const cubic = (p: number, q: number) => (x: number) => x ** 3 + p * x + q;
const cubicTex = (p: number, q: number) => polyString([[1, 'x^3'], [p, 'x'], [q, '']]);
/** A real root of a function between lo and hi, by bisection. */
function bisect(f: (x: number) => number, lo: number, hi: number): number {
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    if (Math.sign(f(mid)) === Math.sign(f(lo))) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

const SIGN_YES = (a: string, b: string) => `$f$ is continuous and $f(${a})$ and $f(${b})$ have different signs, so there is a root between $${a}$ and $${b}$`;
const SIGN_WRONG = (a: string, b: string) => [
  `$f(${a})$ and $f(${b})$ have the same sign, so there is no root between them`,
  `There is a root at $x = ${a}$`,
  `The values show nothing, because neither is $0$`,
];

function changeOfSign(rng: Rng, d: Difficulty): Out {
  if (d === 3) {
    const c = rng.int(1, 5);
    if (rng.chance(0.5)) {
      const k = rng.int(1, 4);
      return {
        prompt: `$f(x) = \\dfrac{${k}}{x - ${c}}$. Here $f(${c - 1}) < 0$ and $f(${c + 1}) > 0$. Why does this not show that $f(x) = 0$ has a root between $${c - 1}$ and $${c + 1}$?`,
        parts: [part(mc(rng, `$f$ is not continuous there: its graph has an asymptote at $x = ${c}$`, [`There is a root at $x = ${c}$`, 'The interval is too wide for the method to work', `$f(${c - 1})$ and $f(${c + 1})$ have the same sign`]))],
        hints: ['The change of sign method needs the function to be continuous on the interval.', `What happens to $f(x)$ as $x \\to ${c}$?`],
        solution: [`$f(x)$ is undefined at $x = ${c}$ and its graph jumps from $-\\infty$ to $+\\infty$ there, so the sign changes without the graph crossing the axis. In fact $f(x) = 0$ has no solutions at all.`],
      };
    }
    const e = c + rng.int(3, 5);
    return {
      prompt: `$f(x) = (x - ${c})^2(x - ${e})$. Here $f(${c - 1})$ and $f(${c + 1})$ are both negative. What does this tell us about roots between $${c - 1}$ and $${c + 1}$?`,
      parts: [part(mc(rng, `Nothing for certain: here there is a repeated root at $x = ${c}$, where the graph touches the axis`, [`There is no root between $${c - 1}$ and $${c + 1}$`, `There is exactly one root between $${c - 1}$ and $${c + 1}$`, `There is a root at $x = ${e}$ between them`]))],
      hints: ['A change of sign shows that there is a root, but no change of sign does not show that there is none.', `What happens at $x = ${c}$?`],
      solution: [`$f(${c}) = 0$, but the graph only touches the axis there (a repeated root), so $f$ does not change sign. No change of sign does not mean no root.`],
    };
  }
  if (d === 1) {
    const { p, q, a } = retry(
      () => ({ p: rng.int(-6, 6), q: rng.int(-9, 9), a: rng.int(-3, 2) }),
      ({ p, q, a }) => cubic(p, q)(a) * cubic(p, q)(a + 1) < 0,
      400,
    );
    const f = cubic(p, q);
    return {
      prompt: `$f(x) = ${cubicTex(p, q)}$. Work out $f(${a})$ and $f(${a + 1})$, and say what they show.`,
      parts: [numPart(f(a), { label: `$f(${a}) =$` }), numPart(f(a + 1), { label: `$f(${a + 1}) =$` }), part(mc(rng, SIGN_YES(`${a}`, `${a + 1}`), SIGN_WRONG(`${a}`, `${a + 1}`)))],
      hints: ['Substitute each value carefully, with brackets round negatives.', 'A continuous function that changes sign must cross the $x$-axis.'],
      solution: [`$f(${a}) = ${f(a)}$ and $f(${a + 1}) = ${f(a + 1)}$.`, `One is negative and one is positive, and $f$ is continuous, so $f(x) = 0$ has a root between $${a}$ and $${a + 1}$.`],
    };
  }
  const fam = rng.int(0, 2);
  const k = rng.int(2, 9);
  const fns: Array<{ tex: string; f: (x: number) => number; lo: number; hi: number }> = [
    { tex: `x^3 - ${k}`, f: (x) => x ** 3 - k, lo: 1, hi: 3 },
    { tex: `e^x - ${k + 1}x`, f: (x) => Math.exp(x) - (k + 1) * x, lo: 1, hi: 5 },
    { tex: `\\ln x + x - ${k}`, f: (x) => Math.log(x) + x - k, lo: 0.5, hi: 10 },
  ];
  const g = fns[fam]!;
  const root = bisect(g.f, g.lo, g.hi);
  const a = roundTo(Math.floor(root * 10 + 1e-9) / 10, 1);
  const b = roundTo(a + 0.1, 1);
  if (Math.abs(g.f(a)) < 0.005 || Math.abs(g.f(b)) < 0.005) return changeOfSign(rng, d);
  const A = fmt(a, 1);
  const B = fmt(b, 1);
  const fa = g.f(a);
  const fb = g.f(b);
  return {
    prompt: `$f(x) = ${g.tex}$. Work out $f(${A})$ and $f(${B})$, and say what they show. ${SF_TEXT}`,
    parts: [sfPart(fa, { label: `$f(${A}) =$` }), sfPart(fb, { label: `$f(${B}) =$` }), part(mc(rng, SIGN_YES(A, B), SIGN_WRONG(A, B)))],
    hints: ['Substitute each value with a calculator, and look at the signs of the results.', 'A continuous function that changes sign must cross the $x$-axis.'],
    solution: [`$f(${A}) ${eq3(fa)}$ and $f(${B}) ${eq3(fb)}$.`, `They have different signs and $f$ is continuous for $x > 0$, so $f(x) = 0$ has a root between $${A}$ and $${B}$.`],
    calculator: true,
  };
}

function newtonRaphson(rng: Rng, d: Difficulty): Out {
  if (d === 3) {
    const k = rng.int(2, 6);
    const useLn = rng.chance(0.5);
    const g = useLn
      ? { tex: `\\ln x + 2x - ${k}`, f: (x: number) => Math.log(x) + 2 * x - k, df: (x: number) => 1 / x + 2, dTex: '\\dfrac{1}{x} + 2', lo: 0.2, hi: 10 }
      : { tex: `e^x + x - ${k}`, f: (x: number) => Math.exp(x) + x - k, df: (x: number) => Math.exp(x) + 1, dTex: 'e^x + 1', lo: -5, hi: 5 };
    const root = bisect(g.f, g.lo, g.hi);
    const x0 = Math.max(1, Math.round(root));
    const x1 = x0 - g.f(x0) / g.df(x0);
    return {
      prompt: `$f(x) = ${g.tex}$. Taking $x_0 = ${x0}$, use the Newton–Raphson method to find $x_1$ to 4 decimal places. Then keep going to find the root of $f(x) = 0$ to 3 decimal places.`,
      parts: [numPart(x1, { label: '$x_1 =$', decimals: 4 }), numPart(root, { label: 'Root:', decimals: 3 })],
      hints: [`$f'(x) = ${g.dTex}$, and $x_{n+1} = x_n - \\dfrac{f(x_n)}{f'(x_n)}$.`, 'Repeat until the value stops changing in the third decimal place.'],
      solution: [`$x_1 = ${x0} - \\dfrac{f(${x0})}{f'(${x0})} \\approx ${fmtFixed(x1, 4)}$`, `Repeating, the values settle at $x \\approx ${fmtFixed(root, 3)}$.`],
      calculator: true,
    };
  }
  const { p, q, x0 } = retry(
    () => {
      const p = rng.int(-6, 6);
      const q = rng.int(-9, 9);
      const x0 = rng.pick([1, 2, 3, -1, -2]);
      return { p, q, x0 };
    },
    ({ p, q, x0 }) => {
      const f = cubic(p, q);
      const df = 3 * x0 * x0 + p;
      if (Math.abs(df) < 2 || q === 0) return false;
      const x1 = x0 - f(x0) / df;
      const df1 = 3 * x1 * x1 + p;
      return Math.abs(x1 - x0) > 0.01 && Math.abs(x1 - x0) < 0.6 && Math.abs(df1) > 1;
    },
    800,
  );
  const f = cubic(p, q);
  const df = (x: number) => 3 * x * x + p;
  const x1 = x0 - f(x0) / df(x0);
  const x2 = x1 - f(x1) / df(x1);
  const steps = [`$f'(x) = ${polyString([[3, 'x^2'], [p, '']])}$`, `$x_1 = ${x0} - \\dfrac{f(${x0})}{f'(${x0})} = ${x0} - \\dfrac{${f(x0)}}{${df(x0)}} \\approx ${fmtFixed(x1, 4)}$`];
  if (d === 1) {
    return {
      prompt: `$f(x) = ${cubicTex(p, q)}$. Taking $x_0 = ${x0}$, use the Newton–Raphson method once to find $x_1$. Give your answer to 4 decimal places.`,
      parts: [numPart(x1, { label: '$x_1 =$', decimals: 4 })],
      hints: ['$x_{n+1} = x_n - \\dfrac{f(x_n)}{f\'(x_n)}$.', 'Differentiate $f$ first, then substitute $x_0$ into $f$ and $f\'$.'],
      solution: steps,
    };
  }
  return {
    prompt: `$f(x) = ${cubicTex(p, q)}$. Taking $x_0 = ${x0}$, use the Newton–Raphson method twice to find $x_1$ and $x_2$. ${DP4}`,
    parts: [numPart(x1, { label: '$x_1 =$', decimals: 4 }), numPart(x2, { label: '$x_2 =$', decimals: 4 })],
    hints: ['$x_{n+1} = x_n - \\dfrac{f(x_n)}{f\'(x_n)}$.', 'Use the unrounded value of $x_1$ (your calculator’s ANS) to find $x_2$.'],
    solution: [...steps, `$x_2 = x_1 - \\dfrac{f(x_1)}{f'(x_1)} \\approx ${fmtFixed(x2, 4)}$`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 19.3 The trapezium rule
// ---------------------------------------------------------------------------

const TRAP_FNS: Array<{ tex: string; f: (x: number) => number }> = [
  { tex: '\\sqrt{1 + x^2}', f: (x) => Math.sqrt(1 + x * x) },
  { tex: '\\sqrt{1 + x^3}', f: (x) => Math.sqrt(1 + x ** 3) },
  { tex: '\\dfrac{1}{1 + x^2}', f: (x) => 1 / (1 + x * x) },
  { tex: '\\ln(1 + x)', f: (x) => Math.log(1 + x) },
  { tex: 'e^{-x^2}', f: (x) => Math.exp(-x * x) },
  { tex: 'x e^{-x}', f: (x) => x * Math.exp(-x) },
  { tex: '\\dfrac{x}{x + 1}', f: (x) => x / (x + 1) },
];
const TRAP_FORMULA = '$\\displaystyle\\int_a^b y\\,dx \\approx \\tfrac{1}{2}h\\big[y_0 + 2(y_1 + y_2 + \\cdots + y_{n-1}) + y_n\\big]$, where $h = \\dfrac{b - a}{n}$.';
const trap = (ys: number[], h: number) => 0.5 * h * (ys[0]! + ys[ys.length - 1]! + 2 * ys.slice(1, -1).reduce((s, y) => s + y, 0));

function trapezium(rng: Rng, d: Difficulty): Out {
  const g = rng.pick(TRAP_FNS);
  const a = rng.pick([0, 1]);
  const h = d === 3 ? rng.pick([0.25, 0.5]) : rng.pick([0.5, 1]);
  const n = d === 1 ? rng.int(3, 4) : d === 2 ? 4 : rng.int(5, 6);
  const xs = Array.from({ length: n + 1 }, (_, i) => roundTo(a + i * h, 2));
  const b = xs[n]!;
  const exactYs = xs.map(g.f);
  const ys = d === 1 ? exactYs.map((y) => roundTo(y, 4)) : exactYs;
  const est = trap(ys, h);
  const integral = `$\\displaystyle\\int_{${a}}^{${fmt(b)}} ${g.tex}\\,dx$`;
  const work = `$\\tfrac{1}{2}(${fmt(h)})\\big[${fmt(ys[0]!, 4)} + 2(${ys.slice(1, -1).map((y) => fmt(y, 4)).join(' + ')}) + ${fmt(ys[n]!, 4)}\\big] ${eq3(est)}$`;
  if (d === 1) {
    const table = `| $x$ | ${xs.map((x) => `$${fmt(x)}$`).join(' | ')} |\n|${' --- |'.repeat(n + 2)}\n| $y$ | ${ys.map((y) => `$${fmt(y, 4)}$`).join(' | ')} |`;
    return {
      prompt: `The table gives values of $y = ${g.tex}$, to 4 decimal places.\n\n${table}\n\nUse the trapezium rule with all the values in the table to estimate ${integral}. ${SF_TEXT}`,
      parts: [sfPart(est, { label: 'Estimate:' })],
      hints: [TRAP_FORMULA, `Here $h = ${fmt(h)}$: the first and last $y$-values are counted once, and the others twice.`],
      solution: [work],
    };
  }
  return {
    prompt: `Use the trapezium rule with ${n} strips to estimate ${integral}. ${SF_TEXT}`,
    parts: [sfPart(est, { label: 'Estimate:' })],
    hints: [TRAP_FORMULA, `Each strip has width $h = \\dfrac{${fmt(b)} - ${a}}{${n}} = ${fmt(h)}$, so the $x$-values are $${xs.map((x) => fmt(x)).join(',\\ ')}$.`],
    solution: [`$h = ${fmt(h)}$, and the $y$-values are $${ys.map((y) => fmt(y, 4)).join(',\\ ')}$ (to 4 decimal places).`, work],
    calculator: true,
  };
}

const ERR_FNS: Array<{ tex: string; f: (x: number) => number; I: (a: number, b: number) => number; convex: boolean; a: number[]; maxB?: number }> = [
  { tex: 'x^2 + 1', f: (x) => x * x + 1, I: (a, b) => (b ** 3 - a ** 3) / 3 + b - a, convex: true, a: [0, 1, 2] },
  { tex: 'e^x', f: Math.exp, I: (a, b) => Math.exp(b) - Math.exp(a), convex: true, a: [0, 1] },
  { tex: '\\dfrac{1}{x}', f: (x) => 1 / x, I: (a, b) => Math.log(b / a), convex: true, a: [1, 2] },
  { tex: '\\sqrt{x}', f: Math.sqrt, I: (a, b) => (2 / 3) * (b ** 1.5 - a ** 1.5), convex: false, a: [1] },
  { tex: '\\ln x', f: Math.log, I: (a, b) => b * Math.log(b) - b - (a * Math.log(a) - a), convex: false, a: [1, 2] },
  { tex: '4 - x^2', f: (x) => 4 - x * x, I: (a, b) => 4 * (b - a) - (b ** 3 - a ** 3) / 3, convex: false, a: [0], maxB: 2 },
];
const OVER = 'An overestimate';
const UNDER = 'An underestimate';

function trapeziumError(rng: Rng, d: Difficulty): Out {
  const { g, a, n, h, b, est, exact, pct } = retry(
    () => {
      const g = rng.pick(ERR_FNS);
      const a = rng.pick(g.a);
      const n = rng.int(2, 4);
      const h = rng.pick([0.5, 1]);
      const b = a + n * h;
      const xs = Array.from({ length: n + 1 }, (_, i) => a + i * h);
      const est = trap(xs.map(g.f), h);
      const exact = g.I(a, b);
      return { g, a, n, h, b, est, exact, pct: (Math.abs(est - exact) / exact) * 100 };
    },
    (c) => c.b <= (c.g.maxB ?? 99) && c.exact > 0 && c.pct >= 0.5,
    200,
  );
  const integral = `$\\displaystyle\\int_{${a}}^{${fmt(b)}} ${/ [-+] /.test(g.tex) ? `(${g.tex})` : g.tex}\\,dx$`;
  const why = g.convex
    ? `The curve $y = ${g.tex}$ bends upwards (it is convex) between $${a}$ and $${fmt(b)}$, so the top of each trapezium lies above the curve and the rule overestimates.`
    : `The curve $y = ${g.tex}$ bends downwards (it is concave) between $${a}$ and $${fmt(b)}$, so the top of each trapezium lies below the curve and the rule underestimates.`;
  const overUnder = part(mc(rng, g.convex ? OVER : UNDER, [g.convex ? UNDER : OVER, 'Exactly right'], { keepOrder: true }));
  if (d === 1) {
    return {
      prompt: `The trapezium rule with ${n} strips is used to estimate ${integral}. Is the estimate an overestimate or an underestimate?`,
      parts: [overUnder],
      hints: ['Sketch the curve and the straight tops of the trapezia.', 'If the curve bends upwards, the straight lines lie above it.'],
      solution: [why],
    };
  }
  const parts = [sfPart(est, { label: 'Estimate:' }), numPart(pct, { label: 'Percentage error:', suffix: '%', decimals: 1 })];
  return {
    prompt: `(a) Use the trapezium rule with ${n} strips to estimate ${integral}. ${SF_TEXT}\n\n(b) The exact value of the integral is $${exactText(exact)}$. Work out the percentage error of the estimate, to 1 decimal place${d === 3 ? ', and say whether the estimate is an overestimate or an underestimate' : ''}.`,
    parts: d === 3 ? [...parts, overUnder] : parts,
    hints: [TRAP_FORMULA, 'Percentage error $= \\dfrac{|\\text{estimate} - \\text{exact}|}{\\text{exact}} \\times 100$.'],
    solution: [`With $h = ${fmt(h)}$, the estimate is $${fmt(est, 6)}$, or $${s3(est)}$ to 3 significant figures.`, `The percentage error is $\\dfrac{|${fmt(est, 6)} - ${exactText(exact)}|}{${exactText(exact)}} \\times 100 \\approx ${fmtFixed(pct, 1)}\\%$.`, ...(d === 3 ? [why] : [])],
    calculator: true,
  };
}
/** The exact value: as it is when it has few decimals, otherwise to 6 decimal places. */
const exactText = (v: number) => (Math.abs(roundTo(v, 4) - v) < 1e-9 ? fmt(v) : `${fmtFixed(v, 6)}\\ldots`);

// ---------------------------------------------------------------------------
// 19.4 Integration by parts
// ---------------------------------------------------------------------------

interface PartsCase { integrand: string; u: string; dv: string; answerTex: string; typed: string; F: (x: number) => number; twice?: boolean }

/** ∫ c·x·g(kx) dx for g = e, sin, cos, and ∫ c·xⁿ ln x dx. */
function partsCase(rng: Rng, d: Difficulty): PartsCase {
  const c = d === 1 ? 1 : rng.pick([1, 2, 3, 4, 6]);
  const k = d === 1 ? 1 : rng.pick([2, 3, -1, -2]);
  const fam = rng.pick(d === 3 ? ['x2e', 'x2cos', 'x2sin', 'xnln'] : ['e', 'sin', 'cos', 'ln']);
  const kxT = k === 1 ? 'x' : `${k}*x`;
  const kxL = kx(k, 'x');
  const cL = c === 1 ? '' : `${c}`;
  const ck = (num: number, den: number) => frac(c * num, den);
  switch (fam) {
    case 'e': {
      // ∫ c x e^{kx} = (c/k) x e^{kx} − (c/k²) e^{kx}
      const A = ck(1, k);
      const B = ck(-1, k * k);
      return {
        integrand: `${cL}xe^{${kxL}}`, u: `u = ${cL || ''}x`, dv: `\\dfrac{dv}{dx} = e^{${kxL}}`,
        answerTex: join([`${lc(A)}xe^{${kxL}}`, `${lc(B)}e^{${kxL}}`]),
        typed: `${tc(A)}x*e^(${kxT}) ${B.n < 0 ? '-' : '+'} ${tc({ n: Math.abs(B.n), d: B.d })}e^(${kxT})`,
        F: (x) => fracValue(A) * x * Math.exp(k * x) + fracValue(B) * Math.exp(k * x),
      };
    }
    case 'sin': {
      // ∫ c x sin kx = −(c/k) x cos kx + (c/k²) sin kx
      const A = ck(-1, k);
      const B = ck(1, k * k);
      return {
        integrand: `${cL}x\\sin ${kxL}`, u: `u = ${cL}x`, dv: `\\dfrac{dv}{dx} = \\sin ${kxL}`,
        answerTex: join([`${lc(A)}x\\cos ${kxL}`, `${lc(B)}\\sin ${kxL}`]),
        typed: `${tc(A)}x*cos(${kxT}) ${B.n < 0 ? '-' : '+'} ${tc({ n: Math.abs(B.n), d: B.d })}sin(${kxT})`,
        F: (x) => fracValue(A) * x * Math.cos(k * x) + fracValue(B) * Math.sin(k * x),
      };
    }
    case 'cos': {
      // ∫ c x cos kx = (c/k) x sin kx + (c/k²) cos kx
      const A = ck(1, k);
      const B = ck(1, k * k);
      return {
        integrand: `${cL}x\\cos ${kxL}`, u: `u = ${cL}x`, dv: `\\dfrac{dv}{dx} = \\cos ${kxL}`,
        answerTex: join([`${lc(A)}x\\sin ${kxL}`, `${lc(B)}\\cos ${kxL}`]),
        typed: `${tc(A)}x*sin(${kxT}) ${B.n < 0 ? '-' : '+'} ${tc({ n: Math.abs(B.n), d: B.d })}cos(${kxT})`,
        F: (x) => fracValue(A) * x * Math.sin(k * x) + fracValue(B) * Math.cos(k * x),
      };
    }
    case 'ln': {
      // ∫ c xⁿ ln x = c xⁿ⁺¹ ln x/(n+1) − c xⁿ⁺¹/(n+1)²
      const n = d === 1 ? rng.pick([0, 1]) : rng.pick([1, 2, 3]);
      const A = ck(1, n + 1);
      const B = ck(-1, (n + 1) ** 2);
      const xp = n === 0 ? 'x' : `x^{${n + 1}}`;
      const xpT = n === 0 ? 'x' : `x^${n + 1}`;
      return {
        integrand: `${cL}${n === 0 ? '' : n === 1 ? 'x' : `x^{${n}}`}\\ln x`, u: 'u = \\ln x', dv: `\\dfrac{dv}{dx} = ${n === 0 ? (c === 1 ? '1' : cL) : `${cL}${n === 1 ? 'x' : `x^{${n}}`}`}`,
        answerTex: join([`${lc(A)}${xp}\\ln x`, `${lc(B)}${xp}`]),
        typed: `${tc(A)}${xpT}*ln(x) - ${tc({ n: -B.n, d: B.d })}${xpT}`,
        F: (x) => fracValue(A) * x ** (n + 1) * Math.log(x) + fracValue(B) * x ** (n + 1),
      };
    }
    case 'x2e':
      // ∫ c x² e^x = c e^x (x² − 2x + 2)
      return {
        integrand: `${cL}x^2e^{x}`, u: `u = ${cL}x^2`, dv: '\\dfrac{dv}{dx} = e^{x}',
        answerTex: `${cL}e^{x}(x^2 - 2x + 2)`, typed: `${c === 1 ? '' : `${c}*`}e^x*(x^2 - 2*x + 2)`,
        F: (x) => c * Math.exp(x) * (x * x - 2 * x + 2), twice: true,
      };
    case 'x2cos':
      // ∫ c x² cos x = c(x² sin x + 2x cos x − 2 sin x)
      return {
        integrand: `${cL}x^2\\cos x`, u: `u = ${cL}x^2`, dv: '\\dfrac{dv}{dx} = \\cos x',
        answerTex: `${cL}${c === 1 ? '' : '('}x^2\\sin x + 2x\\cos x - 2\\sin x${c === 1 ? '' : ')'}`, typed: `${c === 1 ? '' : `${c}*`}(x^2*sin(x) + 2*x*cos(x) - 2*sin(x))`,
        F: (x) => c * (x * x * Math.sin(x) + 2 * x * Math.cos(x) - 2 * Math.sin(x)), twice: true,
      };
    case 'x2sin':
      // ∫ c x² sin x = c(−x² cos x + 2x sin x + 2 cos x)
      return {
        integrand: `${cL}x^2\\sin x`, u: `u = ${cL}x^2`, dv: '\\dfrac{dv}{dx} = \\sin x',
        answerTex: `${cL}${c === 1 ? '' : '('}-x^2\\cos x + 2x\\sin x + 2\\cos x${c === 1 ? '' : ')'}`, typed: `${c === 1 ? '' : `${c}*`}(-x^2*cos(x) + 2*x*sin(x) + 2*cos(x))`,
        F: (x) => c * (-x * x * Math.cos(x) + 2 * x * Math.sin(x) + 2 * Math.cos(x)), twice: true,
      };
    default:
      // ∫ c xⁿ ln x with a higher power, handled by the 'ln' case.
      return partsCase(rng, 2);
  }
}

const PARTS_FORMULA = '$\\displaystyle\\int u\\frac{dv}{dx}\\,dx = uv - \\int v\\frac{du}{dx}\\,dx$';
const C_NOTE = 'Type the answer with $C = 0$ (the box adds the $+ C$).';

function partsIndefinite(rng: Rng, d: Difficulty): Out {
  const c = partsCase(rng, d);
  return {
    prompt: `Find $\\displaystyle\\int ${c.integrand}\\,dx$. ${C_NOTE}`,
    parts: [part({ kind: 'expression', expected: c.typed }, { label: '$F(x) =$', suffix: '+ C' })],
    hints: [PARTS_FORMULA, `Let $${c.u}$ and $${c.dv}$${c.twice ? '; you will need to integrate by parts twice' : ''}.`],
    solution: [`With $${c.u}$ and $${c.dv}$, integrate by parts.`, `$\\displaystyle\\int ${c.integrand}\\,dx = ${c.answerTex} + C$`, 'Check by differentiating: the product rule gives back the integrand.'],
  };
}

const PARTS_DEF: Array<{ tex: string; F: (x: number) => number; Ftex: string; lims: Array<[string, number, string, number]>; u: string }> = [
  { tex: 'xe^{x}', Ftex: '(x - 1)e^{x}', F: (x) => (x - 1) * Math.exp(x), lims: [['0', 0, '1', 1], ['0', 0, '2', 2], ['1', 1, '2', 2]], u: 'u = x,\\ \\dfrac{dv}{dx} = e^x' },
  { tex: 'xe^{2x}', Ftex: '\\left(\\tfrac{1}{2}x - \\tfrac{1}{4}\\right)e^{2x}', F: (x) => (x / 2 - 0.25) * Math.exp(2 * x), lims: [['0', 0, '1', 1], ['0', 0, '\\tfrac{1}{2}', 0.5]], u: 'u = x,\\ \\dfrac{dv}{dx} = e^{2x}' },
  { tex: 'x\\cos x', Ftex: 'x\\sin x + \\cos x', F: (x) => x * Math.sin(x) + Math.cos(x), lims: [['0', 0, '\\tfrac{\\pi}{2}', Math.PI / 2], ['0', 0, '\\pi', Math.PI], ['0', 0, '\\tfrac{\\pi}{4}', Math.PI / 4]], u: 'u = x,\\ \\dfrac{dv}{dx} = \\cos x' },
  { tex: 'x\\sin x', Ftex: '-x\\cos x + \\sin x', F: (x) => -x * Math.cos(x) + Math.sin(x), lims: [['0', 0, '\\tfrac{\\pi}{2}', Math.PI / 2], ['0', 0, '\\pi', Math.PI], ['0', 0, '\\tfrac{\\pi}{3}', Math.PI / 3]], u: 'u = x,\\ \\dfrac{dv}{dx} = \\sin x' },
  { tex: 'x\\ln x', Ftex: '\\tfrac{1}{2}x^2\\ln x - \\tfrac{1}{4}x^2', F: (x) => (x * x * Math.log(x)) / 2 - (x * x) / 4, lims: [['1', 1, 'e', Math.E], ['1', 1, '2', 2], ['1', 1, '3', 3]], u: 'u = \\ln x,\\ \\dfrac{dv}{dx} = x' },
  { tex: '\\ln x', Ftex: 'x\\ln x - x', F: (x) => x * Math.log(x) - x, lims: [['1', 1, 'e', Math.E], ['1', 1, '2', 2], ['1', 1, '4', 4]], u: 'u = \\ln x,\\ \\dfrac{dv}{dx} = 1' },
  { tex: 'x^2\\ln x', Ftex: '\\tfrac{1}{3}x^3\\ln x - \\tfrac{1}{9}x^3', F: (x) => (x ** 3 * Math.log(x)) / 3 - x ** 3 / 9, lims: [['1', 1, 'e', Math.E], ['1', 1, '2', 2]], u: 'u = \\ln x,\\ \\dfrac{dv}{dx} = x^2' },
];

function partsDefinite(rng: Rng, d: Difficulty): Out {
  const g = rng.pick(d === 1 ? PARTS_DEF.slice(0, 4) : PARTS_DEF);
  const [aT, a, bT, b] = rng.pick(g.lims);
  const k = d === 3 ? rng.int(2, 5) : 1;
  const v = k * (g.F(b) - g.F(a));
  return {
    prompt: `Find $\\displaystyle\\int_{${aT}}^{${bT}} ${k === 1 ? '' : k}${g.tex}\\,dx$. ${EXACT_TEXT}`,
    parts: [exactPart(v, 'Value:')],
    hints: [PARTS_FORMULA, `Let $${g.u}$. Integrate first, then substitute the limits.`],
    solution: [`With $${g.u}$: $\\displaystyle\\int ${g.tex}\\,dx = ${g.Ftex} + C$.`, `So the integral is $${k === 1 ? '' : k}\\Big[${g.Ftex}\\Big]_{${aT}}^{${bT}} ${eq3(v)}$.`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 19.5 Integrating with partial fractions
// ---------------------------------------------------------------------------

const lnCoef = (k: number) => (k === 1 ? '' : k === -1 ? '-' : fmt(k));
const lnTex = (f: Frac) => `\\ln ${f.d === 1 ? f.n : `\\tfrac{${f.n}}{${f.d}}`}`;

function pfIntegrate(rng: Rng, d: Difficulty): Out {
  const c = retry(
    () => {
      const r = rng.int(-3, 3);
      const s = rng.int(-3, 3);
      const A = rng.pick([1, 2, 3, -1, -2, 4]);
      const B = rng.pick([1, 2, 3, -1, -2, 5]);
      const lo = Math.max(r, s) + rng.int(1, 2);
      const hi = lo + rng.int(1, 3);
      return { r, s, A, B, lo, hi };
    },
    (c) => c.r !== c.s && c.A + c.B !== 0,
  );
  const { r, s, A, B, lo, hi } = c;
  const p = A + B;
  const q = -A * s - B * r;
  const num = polyString([[p, 'x'], [q, '']]);
  const den = `${lin(r)}${lin(s)}`;
  const value = A * Math.log((hi - r) / (lo - r)) + B * Math.log((hi - s) / (lo - s));
  const k1 = frac(hi - r, lo - r);
  const k2 = frac(hi - s, lo - s);
  const pfTex = `\\dfrac{${A}}{x ${r > 0 ? '-' : '+'} ${Math.abs(r)}} ${B < 0 ? '-' : '+'} \\dfrac{${Math.abs(B)}}{x ${s > 0 ? '-' : '+'} ${Math.abs(s)}}`.replace(/x [-+] 0/g, 'x');
  const solution = [
    `$\\displaystyle\\int_{${lo}}^{${hi}} \\left(${pfTex}\\right) dx = \\Big[${A === 1 ? '' : A === -1 ? '-' : A}\\ln|${bare(r)}| ${B < 0 ? '-' : '+'} ${Math.abs(B) === 1 ? '' : Math.abs(B)}\\ln|${bare(s)}|\\Big]_{${lo}}^{${hi}}$`,
    `$= ${A === 1 ? '' : A === -1 ? '-' : A}${lnTex(k1)} ${B < 0 ? '-' : '+'} ${Math.abs(B) === 1 ? '' : Math.abs(B)}${lnTex(k2)} ${eq3(value)}$`,
  ];
  if (d === 1) {
    return {
      prompt: `Find $\\displaystyle\\int_{${lo}}^{${hi}} \\left(${pfTex}\\right) dx$. ${EXACT_TEXT}`,
      parts: [exactPart(value, 'Value:')],
      hints: ['$\\displaystyle\\int \\frac{1}{x - a}\\,dx = \\ln|x - a| + C$.', 'Then use $\\ln b - \\ln a = \\ln\\dfrac{b}{a}$.'],
      solution,
    };
  }
  if (d === 2) {
    return {
      prompt: `$\\dfrac{${num}}{${den}} \\equiv \\dfrac{A}{${bare(r)}} + \\dfrac{B}{${bare(s)}}$.\n\nFind $A$ and $B$, and hence find $\\displaystyle\\int_{${lo}}^{${hi}} \\dfrac{${num}}{${den}}\\,dx$. ${EXACT_TEXT}`,
      parts: [numPart(A, { label: '$A =$' }), numPart(B, { label: '$B =$' }), exactPart(value, 'Integral:')],
      hints: [`Multiply through: $${num} \\equiv A${lin(s)} + B${lin(r)}$, then put $x = ${r}$ and $x = ${s}$.`, '$\\displaystyle\\int \\frac{1}{x - a}\\,dx = \\ln|x - a| + C$.'],
      solution: [`Putting $x = ${r}$: $A = ${A}$. Putting $x = ${s}$: $B = ${B}$.`, ...solution],
    };
  }
  // A linear factor with a coefficient: A/(2x + e) + B/(x − s) over an interval where both are positive.
  const e = rng.pick([1, 3, -1, 5]);
  const A2 = rng.pick([2, 4, -2, 6]);
  const B2 = rng.pick([1, 3, -1, 2]);
  const lo2 = Math.max(s + 1, Math.ceil(-e / 2) + 1, 1);
  const hi2 = lo2 + rng.int(1, 3);
  const p2 = A2 + 2 * B2;
  const q2 = -A2 * s + B2 * e;
  const num2 = polyString([[p2, 'x'], [q2, '']]);
  const den2 = `(2x ${e < 0 ? '-' : '+'} ${Math.abs(e)})${lin(s)}`;
  const v2 = (A2 / 2) * Math.log((2 * hi2 + e) / (2 * lo2 + e)) + B2 * Math.log((hi2 - s) / (lo2 - s));
  return {
    prompt: `$\\dfrac{${num2}}{${den2}} \\equiv \\dfrac{A}{2x ${e < 0 ? '-' : '+'} ${Math.abs(e)}} + \\dfrac{B}{${bare(s)}}$.\n\nFind $A$ and $B$, and hence find $\\displaystyle\\int_{${lo2}}^{${hi2}} \\dfrac{${num2}}{${den2}}\\,dx$. ${EXACT_TEXT}`,
    parts: [numPart(A2, { label: '$A =$' }), numPart(B2, { label: '$B =$' }), exactPart(v2, 'Integral:')],
    hints: [`Multiply through: $${num2} \\equiv A${lin(s)} + B(2x ${e < 0 ? '-' : '+'} ${Math.abs(e)})$, then put $x = ${s}$ and $x = ${fmt(-e / 2)}$.`, '$\\displaystyle\\int \\frac{A}{2x + e}\\,dx = \\frac{A}{2}\\ln|2x + e| + C$: divide by the coefficient of $x$.'],
    solution: [
      `Putting $x = ${s}$: $B = ${B2}$. Putting $x = ${fmt(-e / 2)}$: $A = ${A2}$.`,
      `$\\displaystyle\\int_{${lo2}}^{${hi2}} = \\Big[${lnCoef(A2 / 2)}\\ln|2x ${e < 0 ? '-' : '+'} ${Math.abs(e)}| ${B2 < 0 ? '-' : '+'} ${Math.abs(B2) === 1 ? '' : Math.abs(B2)}\\ln|${bare(s)}|\\Big]_{${lo2}}^{${hi2}} ${eq3(v2)}$`,
    ],
    calculator: true,
  };
}

function pfLnForm(rng: Rng, d: Difficulty): Out {
  const c = retry(
    () => {
      const r = rng.int(-4, 4);
      const s = rng.int(-4, 4);
      const lo = Math.max(r, s) + rng.int(1, 3);
      const hi = lo + rng.int(1, 4);
      return { r, s, lo, hi };
    },
    (c) => c.r > c.s,
  );
  const { r, s, lo, hi } = c;
  const m = d === 3 ? 2 : 1;
  // m(r − s)/((x − r)(x − s)) = m/(x − r) − m/(x − s).
  const top = m * (r - s);
  const ratio = frac((hi - r) * (lo - s), (lo - r) * (hi - s));
  const K = frac(ratio.n ** m, ratio.d ** m);
  const den = s === 0 ? `x${lin(r)}` : `${lin(r)}${lin(s)}`;
  const integral = d === 1
    ? `\\displaystyle\\int_{${lo}}^{${hi}} \\left(\\dfrac{1}{${bare(r)}} - \\dfrac{1}{${bare(s)}}\\right) dx`
    : `\\displaystyle\\int_{${lo}}^{${hi}} \\dfrac{${top}}{${den}}\\,dx`;
  return {
    prompt: `Show that $${integral} = \\ln K$, and find the exact value of $K$.`,
    parts: [fracPart(K, '$K =$')],
    hints: [
      d === 1 ? 'Integrate each term to a logarithm.' : `Split into partial fractions: $\\dfrac{${top}}{${den}} \\equiv \\dfrac{${m}}{${bare(r)}} - \\dfrac{${m}}{${bare(s)}}$.`,
      `Combine the logarithms with $\\ln a - \\ln b = \\ln\\dfrac{a}{b}$${m > 1 ? ` and $${m}\\ln a = \\ln a^{${m}}$` : ''}.`,
    ],
    solution: [
      `$${m === 1 ? '' : m}\\Big[\\ln|${bare(r)}| - \\ln|${bare(s)}|\\Big]_{${lo}}^{${hi}} = ${m === 1 ? '' : m}\\Big(\\ln ${hi - r} - \\ln ${hi - s} - \\ln ${lo - r} + \\ln ${lo - s}\\Big)$`,
      `$= ${m === 1 ? '' : m}\\ln\\dfrac{${hi - r} \\times ${lo - s}}{${hi - s} \\times ${lo - r}} = ${m === 1 ? '' : m}\\ln ${F(ratio)}${m === 1 ? '' : ` = \\ln ${F(K)}`}$, so $K = ${F(K)}$.`,
    ],
    calculator: d === 3,
  };
}

// ---------------------------------------------------------------------------
// 19.6 Separable differential equations
// ---------------------------------------------------------------------------

function separableSolve(rng: Rng, d: Difficulty): Out {
  const X = rng.pick([1, 2, 3, 0.5, 1.5]);
  const y0 = rng.int(2, 9);
  const kk = rng.pick([0.2, 0.3, 0.5, -0.4, -0.2, 0.1]);
  const kind = d === 1 ? 'ky' : rng.pick(d === 2 ? ['kxy', 'x/y', 'y2'] : ['ycos', 'ex/y', 'xy2']);
  let de = '';
  let sol = '';
  let y = 0;
  let sep = '';
  switch (kind) {
    case 'ky':
      de = `\\dfrac{dy}{dx} = ${fmt(kk)}y`; sep = `\\displaystyle\\int \\frac{1}{y}\\,dy = \\int ${fmt(kk)}\\,dx`;
      sol = `y = ${y0}e^{${fmt(kk)}x}`; y = y0 * Math.exp(kk * X); break;
    case 'kxy':
      de = `\\dfrac{dy}{dx} = ${fmt(kk)}xy`; sep = `\\displaystyle\\int \\frac{1}{y}\\,dy = \\int ${fmt(kk)}x\\,dx`;
      sol = `y = ${y0}e^{${fmt(kk / 2)}x^2}`; y = y0 * Math.exp((kk / 2) * X * X); break;
    case 'x/y':
      de = '\\dfrac{dy}{dx} = \\dfrac{x}{y}'; sep = '\\displaystyle\\int y\\,dy = \\int x\\,dx';
      sol = `y^2 = x^2 + ${y0 * y0}`; y = Math.sqrt(X * X + y0 * y0); break;
    case 'y2': {
      const k = rng.pick([0.01, 0.02]);
      de = `\\dfrac{dy}{dx} = ${fmt(k)}y^2`; sep = `\\displaystyle\\int \\frac{1}{y^2}\\,dy = \\int ${fmt(k)}\\,dx`;
      sol = `-\\dfrac{1}{y} = ${fmt(k)}x - \\dfrac{1}{${y0}}`; y = 1 / (1 / y0 - k * X); break;
    }
    case 'ycos':
      de = '\\dfrac{dy}{dx} = y\\cos x'; sep = '\\displaystyle\\int \\frac{1}{y}\\,dy = \\int \\cos x\\,dx';
      sol = `y = ${y0}e^{\\sin x}`; y = y0 * Math.exp(Math.sin(X)); break;
    case 'ex/y':
      de = '\\dfrac{dy}{dx} = \\dfrac{e^x}{y}'; sep = '\\displaystyle\\int y\\,dy = \\int e^x\\,dx';
      sol = `y^2 = 2e^x + ${y0 * y0 - 2}`; y = Math.sqrt(2 * Math.exp(X) + y0 * y0 - 2); break;
    default: {
      // dy/dx = x y² → −1/y = x²/2 − 1/y0.
      const k = 0.01;
      de = `\\dfrac{dy}{dx} = ${fmt(k)}xy^2`; sep = `\\displaystyle\\int \\frac{1}{y^2}\\,dy = \\int ${fmt(k)}x\\,dx`;
      sol = `-\\dfrac{1}{y} = ${fmt(k / 2, 4)}x^2 - \\dfrac{1}{${y0}}`; y = 1 / (1 / y0 - (k / 2) * X * X); break;
    }
  }
  return {
    prompt: `Solve $${de}$, given that $y = ${y0}$ when $x = 0$${kind === 'x/y' || kind === 'ex/y' ? ' (and $y > 0$)' : ''}. Hence find $y$ when $x = ${fmt(X)}$. ${SF_TEXT}`,
    parts: [sfPart(y, { label: `$y =$` })],
    hints: ['Separate the variables: put every $y$ on the side with $dy$ and every $x$ on the side with $dx$, then integrate both sides.', `Add one constant, and find it by putting $x = 0$, $y = ${y0}$.`],
    solution: [`$${sep}$`, `Using $y = ${y0}$ when $x = 0$: $${sol}$.`, `When $x = ${fmt(X)}$: $y ${eq3(y)}$.`],
    calculator: true,
  };
}

const GROWTH = [
  { what: 'The number of bacteria, $N$, in a dish', v: 'N', unit: 'hours', grow: true, n0: [200, 500, 1000, 800] },
  { what: 'The population of a town, $P$,', v: 'P', unit: 'years', grow: true, n0: [12000, 25000, 40000] },
  { what: 'The mass, $m$ grams, of a radioactive sample', v: 'm', unit: 'days', grow: false, n0: [80, 120, 200, 50] },
  { what: 'The amount of a drug, $D$ mg, in a patient’s blood', v: 'D', unit: 'hours', grow: false, n0: [100, 250, 400] },
];

function deModel(rng: Rng, d: Difficulty): Out {
  if (d === 3) {
    const room = rng.pick([15, 18, 20, 22]);
    const th0 = rng.pick([80, 90, 95, 70]);
    const t1 = rng.pick([5, 10]);
    const th1 = th0 - rng.int(10, 25);
    const k = Math.log((th0 - room) / (th1 - room)) / t1;
    const target = rng.int(room + 10, th1 - 5);
    const T = Math.log((th0 - room) / (target - room)) / k;
    return {
      prompt: `A cup of tea cools in a room at $${room}^\\circ$C. Its temperature $\\theta^\\circ$C after $t$ minutes satisfies $\\dfrac{d\\theta}{dt} = -k(\\theta - ${room})$. At first $\\theta = ${th0}$, and after $${t1}$ minutes $\\theta = ${th1}$. Find $k$, and the time it takes for the tea to cool to $${target}^\\circ$C. ${SF_TEXT}`,
      parts: [sfPart(k, { label: '$k =$' }), sfPart(T, { label: 'Time:', suffix: 'minutes' })],
      hints: [`Separate: $\\displaystyle\\int \\frac{1}{\\theta - ${room}}\\,d\\theta = \\int -k\\,dt$, which gives $\\theta = ${room} + Ae^{-kt}$.`, `$A = ${th0 - room}$; then use $\\theta = ${th1}$ at $t = ${t1}$ to find $k$.`],
      solution: [`$\\theta = ${room} + ${th0 - room}e^{-kt}$.`, `$${th1 - room} = ${th0 - room}e^{-${t1}k}$, so $k = \\dfrac{1}{${t1}}\\ln\\dfrac{${th0 - room}}{${th1 - room}} \\approx ${s3(k)}$.`, `$${target - room} = ${th0 - room}e^{-kt}$ gives $t = \\dfrac{1}{k}\\ln\\dfrac{${th0 - room}}{${target - room}} \\approx ${s3(T)}$ minutes.`],
      calculator: true,
    };
  }
  const g = rng.pick(GROWTH);
  const n0 = rng.pick(g.n0);
  const t1 = rng.pick([2, 3, 4, 5]);
  const factor = g.grow ? rng.pick([1.2, 1.5, 2, 1.8, 2.5]) : rng.pick([0.8, 0.6, 0.5, 0.7]);
  const n1 = roundTo(n0 * factor, 0);
  const k = Math.log(n1 / n0) / t1;
  const T = t1 + rng.int(2, 6);
  const nT = n0 * Math.exp(k * T);
  const model = `$\\dfrac{d${g.v}}{dt} = k${g.v}$`;
  if (d === 1) {
    const kk = roundTo(k, 2) || (g.grow ? 0.1 : -0.1);
    const v = n0 * Math.exp(kk * T);
    return {
      prompt: `${g.what} after $t$ ${g.unit} is modelled by ${model.replace('k', fmt(kk))}. At $t = 0$, $${g.v} = ${Ng(n0)}$. Find $${g.v}$ when $t = ${T}$. ${v >= 1000 ? 'Give your answer to the nearest whole number.' : SF_TEXT}`,
      parts: [v >= 1000 ? numPart(v, { label: `$${g.v} =$`, decimals: 0 }) : sfPart(v, { label: `$${g.v} =$` })],
      hints: [`Separating the variables gives $\\ln ${g.v} = ${fmt(kk)}t + c$, so $${g.v} = Ae^{${fmt(kk)}t}$.`, `$A$ is the value at $t = 0$.`],
      solution: [`$${g.v} = ${Ng(n0)}e^{${fmt(kk)}t}$, so at $t = ${T}$, $${g.v} = ${Ng(n0)}e^{${fmt(kk * T)}} ${v >= 1000 ? `\\approx ${Ng(Math.round(v))}` : eq3(v)}$.`],
      calculator: true,
    };
  }
  return {
    prompt: `${g.what} after $t$ ${g.unit} is modelled by ${model}. At $t = 0$, $${g.v} = ${Ng(n0)}$, and at $t = ${t1}$, $${g.v} = ${Ng(n1)}$. Find $k$, and $${g.v}$ when $t = ${T}$. ${nT >= 1000 ? `Give $k$ to 3 significant figures and $${g.v}$ to the nearest whole number.` : SF_TEXT}`,
    parts: [sfPart(k, { label: '$k =$' }), nT >= 1000 ? numPart(nT, { label: `$${g.v} =$`, decimals: 0 }) : sfPart(nT, { label: `$${g.v} =$` })],
    hints: [`Separating the variables gives $${g.v} = Ae^{kt}$, with $A = ${Ng(n0)}$.`, `Use $t = ${t1}$: $${Ng(n1)} = ${Ng(n0)}e^{${t1}k}$, so $k = \\dfrac{1}{${t1}}\\ln\\dfrac{${Ng(n1)}}{${Ng(n0)}}$.`],
    solution: [`$${g.v} = ${Ng(n0)}e^{kt}$ and $k = \\dfrac{1}{${t1}}\\ln\\dfrac{${Ng(n1)}}{${Ng(n0)}} \\approx ${s3(k)}$.`, `When $t = ${T}$: $${g.v} = ${Ng(n0)}e^{${T}k} ${nT >= 1000 ? `\\approx ${Ng(Math.round(nT))}` : eq3(nT)}$ (using the unrounded $k$).`],
    calculator: true,
  };
}

export const CALCULUS_SKILLS: SkillDef[] = [
  skill({ id: 'mx-parametric-gradient', name: 'Parametric differentiation', description: 'Find dy/dx for curves given parametrically, and the equations of their tangents', outcomes: ['CL1'], lessonId: 'mx-19-1', gen: parametricGradient }),
  skill({ id: 'mx-first-principles-trig', name: 'sin x and cos x from first principles', description: 'Follow the first-principles derivation of the derivatives of sin x and cos x, and compare chord gradients with them', outcomes: ['CL1'], lessonId: 'mx-19-1', gen: firstPrinciplesTrig }),
  skill({ id: 'mx-change-of-sign', name: 'Locating roots', description: 'Show that a root lies in an interval by a change of sign, and know when the method fails', outcomes: ['CL2'], lessonId: 'mx-19-2', calculator: true, gen: changeOfSign }),
  skill({ id: 'mx-newton-raphson', name: 'The Newton–Raphson method', description: 'Use the Newton–Raphson method to approximate a root', outcomes: ['CL2'], lessonId: 'mx-19-2', calculator: true, gen: newtonRaphson }),
  skill({ id: 'mx-trapezium', name: 'The trapezium rule', description: 'Estimate a definite integral with the trapezium rule, from a table or a function', outcomes: ['CL3'], lessonId: 'mx-19-3', calculator: true, gen: trapezium }),
  skill({ id: 'mx-trapezium-error', name: 'Over- and underestimates', description: 'Decide whether the trapezium rule over- or underestimates, and find its percentage error', outcomes: ['CL3'], lessonId: 'mx-19-3', calculator: true, gen: trapeziumError }),
  skill({ id: 'mx-parts-indefinite', name: 'Integration by parts', description: 'Integrate x eᵏˣ, x sin kx, x cos kx and xⁿ ln x by parts, and use parts twice', outcomes: ['CL4'], lessonId: 'mx-19-4', gen: partsIndefinite }),
  skill({ id: 'mx-parts-definite', name: 'Definite integrals by parts', description: 'Evaluate definite integrals by parts', outcomes: ['CL4'], lessonId: 'mx-19-4', calculator: true, gen: partsDefinite }),
  skill({ id: 'mx-pf-integrate', name: 'Integrating with partial fractions', description: 'Split a fraction into partial fractions and integrate it to logarithms', outcomes: ['CL5'], lessonId: 'mx-19-5', calculator: true, gen: pfIntegrate }),
  skill({ id: 'mx-pf-ln-form', name: 'Answers in the form ln K', description: 'Write a definite integral of partial fractions as a single logarithm', outcomes: ['CL5'], lessonId: 'mx-19-5', gen: pfLnForm }),
  skill({ id: 'mx-separable-solve', name: 'Separable differential equations', description: 'Solve first-order differential equations by separating the variables', outcomes: ['CL6'], lessonId: 'mx-19-6', calculator: true, gen: separableSolve }),
  skill({ id: 'mx-de-model', name: 'Modelling with differential equations', description: 'Find and use exponential growth, decay and cooling models from differential equations', outcomes: ['CL6'], lessonId: 'mx-19-6', calculator: true, gen: deModel }),
];
