/** Math 30-1 Unit 7 — Exponential and Logarithmic Functions (RF7, RF8, RF9, RF10). Every formula, rate and constant is stated in the question. */
import { mc, mcFigures, numPart, part, retry, roundingPhrase, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, frac, fracLatex, toFrac, type Frac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, GridSpec, Part, PlaneFigure, PlaneLine, PlanePoint, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type Pt = [number, number];
type Fn = (x: number) => number;
type Base = Frac;

const NAMES = ['Aisha', 'Mateo', 'Priya', 'Liam', 'Mei', 'Noah', 'Amara', 'Ethan', 'Sofia', 'Kiran', 'Jasmine', 'Owen', 'Fatima', 'Lucas', 'Hana', 'Dakota', 'Ravi', 'Chloe', 'Tariq', 'Émilie', 'Wapun', 'Siobhan', 'Arjun', 'Nadia'];
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater', 'Oakridge', 'Elmwood'];

const r3 = (x: number) => Math.round(x * 1000) / 1000 + 0;
const lg = (x: number) => Math.log10(x);
/** LaTeX for an exact rational value: integers plainly, fractions as \frac (denominators up to 1000). */
function nn(x: number): string {
  const f = toFrac(x, 1000);
  return f && f.d !== 1 ? fracLatex(f) : fmt(x, 6);
}
/** An exact rational value as a student would type it in an expression. */
function ns(x: number): string {
  const f = toFrac(x, 1000);
  return f && f.d !== 1 ? `(${f.n}/${f.d})` : fmt(x, 6);
}
const lead = (a: number) => (a === 1 ? '' : a === -1 ? '-' : nn(a));
const sgn = (k: number) => (k === 0 ? '' : k > 0 ? ` + ${nn(k)}` : ` - ${nn(-k)}`);
const pn = (x: number) => (x < 0 ? `(${nn(x)})` : nn(x));
const units = (n: number, w = 'unit') => `${fmt(Math.abs(n))} ${w}${Math.abs(n) === 1 ? '' : 's'}`;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const listWords = (xs: string[]) => (xs.length <= 1 ? (xs[0] ?? '') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
/** Large whole numbers with thin spaces (SI style), for LaTeX. */
const big = (n: number) => (Math.abs(n) >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '{,}') : String(n));
/** Large whole numbers in prose: 12,500. */
const prose = (n: number) => (Math.abs(n) >= 10000 ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : String(n));
/** A rounded value that is not close to a rounding boundary. */
function safeRound(v: number, decimals: number): boolean {
  if (!Number.isFinite(v)) return false;
  const s = Math.abs(v) * 10 ** decimals;
  return Math.abs(s - Math.floor(s) - 0.5) > 0.08;
}
const fx = (v: number, d: number) => fmtFixed(v, d);
const solPart = (values: number[], decimals?: number): Part =>
  part({ kind: 'numbers', values, ...(decimals !== undefined && { decimals }) }, { label: 'Solutions', placeholder: 'e.g. 3, -2 or none' });

/** a + b x written in LaTeX (p x + q). */
function lin(p: number, q: number, v = 'x'): string {
  const head = p === 0 ? '' : p === 1 ? v : p === -1 ? `-${v}` : `${nn(p)}${v}`;
  if (!head) return nn(q);
  return q === 0 ? head : `${head} ${q > 0 ? '+' : '-'} ${nn(Math.abs(q))}`;
}

// Bases c = n/d of exponential and logarithmic functions.
const B = (n: number, d = 1): Base => frac(n, d);
const bval = (c: Base) => c.n / c.d;
const btex = (c: Base) => (c.d === 1 ? `${c.n}` : `\\left(\\frac{${c.n}}{${c.d}}\\right)`);
const bsub = (c: Base) => (c.d === 1 ? `${c.n}` : `\\frac{${c.n}}{${c.d}}`);
const bstr = (c: Base) => (c.d === 1 ? `${c.n}` : `(${c.n}/${c.d})`);
/** \log_{c} (or \log for the common logarithm). */
function logb(c: Base | number): string {
  const k = typeof c === 'number' ? B(c) : c;
  return k.d === 1 && k.n === 10 ? '\\log' : `\\log_{${bsub(k)}}`;
}
/** c^m as an exact fraction. */
function fpow(c: Base, m: number): Frac {
  return m >= 0 ? frac(c.n ** m, c.d ** m) : frac(c.d ** -m, c.n ** -m);
}
const ftex = (f: Frac) => fracLatex(f);

const innerTex = (h: number, v = 'x') => (h === 0 ? v : `${v} ${h > 0 ? '-' : '+'} ${fmt(Math.abs(h))}`);
/** b(x - h) in LaTeX. */
function argTex(b: number, h: number, v = 'x'): string {
  const i = innerTex(h, v);
  if (b === 1) return i;
  if (b === -1) return h === 0 ? `-${v}` : `-(${i})`;
  return h === 0 ? `${nn(b)}${v}` : `${nn(b)}(${i})`;
}
/** b(x - h) as typed. */
function argStr(b: number, h: number, v = 'x'): string {
  const i = innerTex(h, v);
  if (b === 1) return i;
  if (b === -1) return h === 0 ? `-${v}` : `-(${i})`;
  return h === 0 ? `${ns(b)}${v}` : `${ns(b)}(${i})`;
}

/** y = a(c)^(b(x - h)) + k */
interface ExpFn {
  a: number;
  c: Base;
  b: number;
  h: number;
  k: number;
}
const expAt = (f: ExpFn, x: number) => f.a * bval(f.c) ** (f.b * (x - f.h)) + f.k;
function expTex(f: ExpFn): string {
  const base = f.c.d === 1 && Math.abs(f.a) !== 1 ? `(${f.c.n})` : btex(f.c);
  const lead = f.a === 1 ? '' : f.a === -1 ? '-' : nn(f.a);
  return `${lead}${base}^{${argTex(f.b, f.h)}}${sgn(f.k)}`;
}
function expStr(f: ExpFn): string {
  const arg = argStr(f.b, f.h);
  const base = f.c.d === 1 && Math.abs(f.a) !== 1 ? `(${f.c.n})` : bstr(f.c);
  const lead = f.a === 1 ? '' : f.a === -1 ? '-' : ns(f.a);
  const k = f.k === 0 ? '' : f.k > 0 ? ` + ${fmt(f.k)}` : ` - ${fmt(-f.k)}`;
  return `${lead}${base}^${arg === 'x' ? 'x' : `(${arg})`}${k}`;
}

/** y = a log_c(b(x - h)) + k */
interface LogFn {
  a: number;
  c: Base;
  b: number;
  h: number;
  k: number;
}
function logAt(L: LogFn, x: number): number {
  const u = L.b * (x - L.h);
  return u > 0 ? (L.a * Math.log(u)) / Math.log(bval(L.c)) + L.k : NaN;
}
function logTex(L: LogFn): string {
  const arg = argTex(L.b, L.h);
  const body = arg === 'x' ? `${logb(L.c)} x` : `${logb(L.c)}(${arg})`;
  const lead = L.a === 1 ? '' : L.a === -1 ? '-' : nn(L.a);
  return `${lead}${body}${sgn(L.k)}`;
}

/** Sample a function on [from, to] as polylines clipped to the grid (never across an asymptote). */
function curve(f: Fn, g: GridSpec, from = g.xMin, to = g.xMax, m = 200): Pt[][] {
  const inside = (y: number) => Number.isFinite(y) && y >= g.yMin - 1e-9 && y <= g.yMax + 1e-9;
  const xs: number[] = [];
  for (let i = 0; i <= m; i++) xs.push(from + ((to - from) * i) / m);
  // Extra samples near each end, where a logarithmic curve is steep.
  for (let j = 1; j <= 14; j++) {
    const e = ((to - from) * 2 ** -j) / m;
    xs.push(from + e, to - e);
  }
  xs.sort((p, q) => p - q);
  const out: Pt[][] = [];
  let cur: Pt[] = [];
  for (let i = 0; i < xs.length; i++) {
    const y = f(xs[i]);
    const inNow = inside(y);
    if (i > 0) {
      const yp = f(xs[i - 1]);
      const inPrev = inside(yp);
      if (inPrev !== inNow) {
        const outside = inNow ? yp : y;
        const target = outside > g.yMax ? g.yMax : g.yMin;
        let lo = xs[i - 1];
        let hi = xs[i];
        for (let it = 0; it < 60; it++) {
          const mid = (lo + hi) / 2;
          if (inside(f(mid)) === inPrev) lo = mid;
          else hi = mid;
        }
        const cross: Pt = [r3(inPrev ? lo : hi), target];
        if (inPrev) {
          cur.push(cross);
          if (cur.length > 1) out.push(cur);
          cur = [];
        } else cur = [cross];
      }
    }
    if (inNow) {
      const p: Pt = [r3(xs[i]), r3(y)];
      const last = cur[cur.length - 1];
      if (!last || last[0] !== p[0] || last[1] !== p[1]) cur.push(p);
    }
  }
  if (cur.length > 1) out.push(cur);
  return out;
}

const hLine = (k: number): PlaneLine => ({ line: { A: 0, B: 1, C: -k }, dashed: true, color: 'muted' });
const vLine = (h: number): PlaneLine => ({ line: { A: 1, B: 0, C: -h }, dashed: true, color: 'muted' });
const ptLabel = (x: number, y: number) => `(${fmt(x)}, ${fmt(y)})`.replace(/-/g, '−');
const ptTex = (x: number, y: number) => `(${nn(x)},\\ ${nn(y)})`;

function plot(f: Fn, g: GridSpec, from?: number, to?: number): PlaneFigure {
  return { type: 'plane', grid: g, polylines: curve(f, g, from, to).map((p) => ({ points: p })) };
}
function expFig(f: ExpFn, g: GridSpec, points: PlanePoint[] = []): PlaneFigure {
  const fig = plot((x) => expAt(f, x), g);
  if (f.k !== 0) fig.lines = [hLine(f.k)];
  if (points.length) fig.points = points;
  return fig;
}
function logFig(L: LogFn, g: GridSpec, points: PlanePoint[] = []): PlaneFigure {
  const eps = 1e-7;
  const fig = L.b > 0 ? plot((x) => logAt(L, x), g, Math.max(g.xMin, L.h + eps), g.xMax) : plot((x) => logAt(L, x), g, g.xMin, Math.min(g.xMax, L.h - eps));
  if (L.h !== 0) fig.lines = [vLine(L.h)];
  if (points.length) fig.points = points;
  return fig;
}
const inGrid = (g: GridSpec, x: number, y: number, pad = 0.5) => x >= g.xMin + pad && x <= g.xMax - pad && y >= g.yMin + pad && y <= g.yMax - pad;

// Set notation for domain and range.
const D_ALL = '\\{x \\mid x \\in \\mathbb{R}\\}';
const R_ALL = '\\{y \\mid y \\in \\mathbb{R}\\}';
const setv = (v: 'x' | 'y', op: string, k: number) => `\\{${v} \\mid ${v} ${op} ${nn(k)},\\ ${v} \\in \\mathbb{R}\\}`;
const dr = (d: string, r: string) => `Domain $${d}$; range $${r}$`;

// ---------------------------------------------------------------------------
// 7.1 Characteristics of exponential functions — m301-exp-features
// ---------------------------------------------------------------------------

interface Form {
  tex: string;
  c: number;
  note?: string;
}
const GROW_PLAIN: Form[] = [
  { tex: '3^{x}', c: 3 },
  { tex: '1.2^{x}', c: 1.2 },
  { tex: '\\left(\\frac{5}{4}\\right)^{x}', c: 1.25 },
  { tex: '2.5^{x}', c: 2.5 },
  { tex: '10^{x}', c: 10 },
  { tex: '\\left(\\frac{3}{2}\\right)^{x}', c: 1.5 },
  { tex: '1.05^{x}', c: 1.05 },
];
const DECAY_PLAIN: Form[] = [
  { tex: '\\left(\\frac{1}{3}\\right)^{x}', c: 1 / 3 },
  { tex: '0.8^{x}', c: 0.8 },
  { tex: '\\left(\\frac{3}{4}\\right)^{x}', c: 0.75 },
  { tex: '0.45^{x}', c: 0.45 },
  { tex: '\\left(\\frac{2}{5}\\right)^{x}', c: 0.4 },
  { tex: '0.95^{x}', c: 0.95 },
];
const GROW_TRICK: Form[] = [
  { tex: '\\left(\\frac{1}{2}\\right)^{-x}', c: 2, note: '\\left(\\frac{1}{2}\\right)^{-x} = 2^{x}' },
  { tex: '0.25^{-x}', c: 4, note: '0.25^{-x} = 4^{x}' },
  { tex: '\\left(\\frac{2}{3}\\right)^{-x}', c: 1.5, note: '\\left(\\frac{2}{3}\\right)^{-x} = \\left(\\frac{3}{2}\\right)^{x}' },
];
const DECAY_TRICK: Form[] = [
  { tex: '2^{-x}', c: 0.5, note: '2^{-x} = \\left(\\frac{1}{2}\\right)^{x}' },
  { tex: '5^{-x}', c: 0.2, note: '5^{-x} = \\left(\\frac{1}{5}\\right)^{x}' },
  { tex: '1.5^{-x}', c: 2 / 3, note: '1.5^{-x} = \\left(\\frac{2}{3}\\right)^{x}' },
];
const classify = (f: Form) =>
  `$y = ${f.tex}$: ${f.note ? `$${f.note}$, so the` : 'the'} base is ${f.c > 1 ? 'greater than $1$ — growth' : 'between $0$ and $1$ — decay'}.`;

function featWhich(rng: Rng, d: Difficulty): GenOutput {
  const wantGrowth = rng.chance(0.5);
  const tricky = d >= 2;
  const right = wantGrowth ? (tricky && rng.chance(0.6) ? GROW_TRICK : GROW_PLAIN) : tricky && rng.chance(0.6) ? DECAY_TRICK : DECAY_PLAIN;
  const correct = rng.pick(right);
  const plainWrong = rng.sample(wantGrowth ? DECAY_PLAIN : GROW_PLAIN, 3);
  const wrong = tricky ? [rng.pick(wantGrowth ? DECAY_TRICK : GROW_TRICK), ...plainWrong.slice(0, 2)] : plainWrong;
  const word = wantGrowth ? 'growth' : 'decay';
  return {
    prompt: `Which function represents exponential ${word}?`,
    parts: [part(mc(rng, `$y = ${correct.tex}$`, wrong.map((w) => `$y = ${w.tex}$`)))],
    hints: [
      'For $y = c^{x}$ with $c > 0$, the function shows growth when $c > 1$ and decay when $0 < c < 1$.',
      tricky ? 'A negative exponent flips the base: $c^{-x} = \\left(\\frac{1}{c}\\right)^{x}$.' : 'Compare each base with $1$.',
    ],
    solution: [
      'For $y = c^{x}$: growth when $c > 1$ (the graph rises from left to right) and decay when $0 < c < 1$ (it falls).',
      ...[correct, ...wrong].map(classify),
      `So $y = ${correct.tex}$ represents exponential ${word}.`,
    ],
  };
}

function featEvaluate(rng: Rng): GenOutput {
  const [c, x0] = retry(
    () => [rng.pick([B(2), B(3), B(4), B(5), B(10), B(1, 2), B(1, 3), B(1, 4)]), rng.pick([-3, -2, -1, 2, 3, 4])] as const,
    ([c, x]) => {
      const v = fpow(c, x);
      return v.n <= 1000 && v.d <= 1000 && !(c.n === 10 && Math.abs(x) > 3);
    },
  );
  const v = fpow(c, x0);
  const name = rng.pick(['f', 'g', 'h']);
  let step: string;
  if (x0 > 0) step = `$${name}(${x0}) = ${btex(c)}^{${x0}} = ${ftex(v)}$`;
  else if (c.d === 1) step = `$${name}(${x0}) = ${c.n}^{${x0}} = \\dfrac{1}{${c.n}^{${-x0}}} = ${ftex(v)}$`;
  else step = `$${name}(${x0}) = ${btex(c)}^{${x0}} = ${c.d}^{${-x0}} = ${ftex(v)}$`;
  return {
    prompt: `For $${name}(x) = ${btex(c)}^{x}$, evaluate $${name}(${x0})$. Give an exact answer.`,
    parts: [numPart(v.n / v.d, { label: `$${name}(${x0}) =$` })],
    hints: [`Substitute $x = ${x0}$.`, 'A negative exponent means a reciprocal: $c^{-n} = \\dfrac{1}{c^{n}}$.'],
    solution: [step, `$${name}(${x0}) = ${ftex(v)}$`],
  };
}

function featBase(rng: Rng, d: Difficulty): GenOutput {
  const [c, m] = retry(
    () =>
      d === 1
        ? ([rng.pick([B(2), B(3), B(4), B(5), B(6)]), rng.pick([2, 3])] as const)
        : ([rng.pick([B(2), B(3), B(4), B(5), B(1, 2), B(1, 3), B(1, 4), B(2, 3), B(3, 2)]), rng.pick([-3, -2, -1, 2, 3])] as const),
    ([c, m]) => {
      const v = fpow(c, m);
      return v.n <= 216 && v.d <= 216 && (d === 1 || m < 0 || c.d !== 1);
    },
  );
  const y0 = fpow(c, m);
  const steps = [`Substitute the point into $y = c^{x}$: $c^{${m}} = ${ftex(y0)}$.`];
  let pos = y0;
  if (m < 0) {
    pos = frac(y0.d, y0.n);
    steps.push(`A negative exponent means a reciprocal: $\\dfrac{1}{c^{${-m}}} = ${ftex(y0)}$, so $c^{${-m}} = ${ftex(pos)}$.`);
  }
  const am = Math.abs(m);
  if (am === 2) steps.push(`Take the square root. The base of an exponential function is positive, so $c = \\sqrt{${ftex(pos)}} = ${bsub(c)}$.`);
  else if (am === 3) steps.push(`Take the cube root: $c = \\sqrt[3]{${ftex(pos)}} = ${bsub(c)}$.`);
  steps.push(`$c = ${bsub(c)}$, so the function is $y = ${btex(c)}^{x}$.`);
  return {
    prompt: `The graph of $y = c^{x}$, where $c > 0$, passes through the point $\\left(${m},\\ ${ftex(y0)}\\right)$. Find the value of $c$.`,
    parts: [numPart(bval(c), { label: '$c =$' })],
    hints: [`Substitute $x = ${m}$ and $y = ${ftex(y0)}$ into $y = c^{x}$.`, m < 0 ? 'Rewrite the negative exponent as a reciprocal, then take a root.' : 'Undo the exponent by taking a root.'],
    solution: steps,
  };
}

function featStatements(rng: Rng): GenOutput {
  const c = rng.pick([B(2), B(3), B(4), B(5), B(1, 2), B(1, 3), B(1, 4), B(3, 2), B(2, 3)]);
  const inc = bval(c) > 1;
  const trend = (up: boolean) => (up ? 'increasing' : 'decreasing');
  const s = (up: boolean, yInt: string, asym: string) => `It is ${trend(up)}, its $y$-intercept is $${yInt}$, and its asymptote is $${asym}$.`;
  const correct = s(inc, '1', 'y = 0');
  const distractors = [s(!inc, '1', 'y = 0'), s(inc, bsub(c), 'y = 0'), s(inc, '1', 'x = 0'), s(inc, '0', 'y = 0')];
  return {
    prompt: `Which statement about the graph of $y = ${btex(c)}^{x}$ is true?`,
    parts: [part(mc(rng, correct, rng.shuffle(distractors)))],
    hints: ['Substitute $x = 0$ to find the $y$-intercept.', 'Is the base greater than 1 or between 0 and 1? A power of a positive base is never zero.'],
    solution: [
      `$y$-intercept: $${btex(c)}^{0} = 1$.`,
      `The base $${bsub(c)}$ is ${inc ? 'greater than $1$, so the function is increasing' : 'between $0$ and $1$, so the function is decreasing'}.`,
      `$${btex(c)}^{x}$ is always positive and gets closer and closer to $0$ as $x$ ${inc ? 'decreases' : 'increases'}, so the horizontal asymptote is $y = 0$ (the $x$-axis).`,
      correct,
    ],
  };
}

function featDomainRange(rng: Rng): GenOutput {
  const c = rng.pick([B(2), B(3), B(5), B(1, 2), B(1, 3), B(3, 2), B(1, 4)]);
  const a = rng.pick([1, 1, 2, 3, 5]);
  const f: ExpFn = { a, c, b: 1, h: 0, k: 0 };
  const correct = dr(D_ALL, setv('y', '>', 0));
  const distractors = rng.shuffle([dr(D_ALL, setv('y', '\\ge', 0)), dr(D_ALL, R_ALL), dr(setv('x', '>', 0), setv('y', '>', 0)), ...(a !== 1 ? [dr(D_ALL, setv('y', '>', a))] : [])]);
  return {
    prompt: `State the domain and range of $y = ${expTex(f)}$.`,
    parts: [part(mc(rng, correct, distractors))],
    hints: ['Can you substitute any real number for $x$?', `Can $${expTex(f)}$ ever be $0$ or negative?`],
    solution: [
      `Any real number can be an exponent, so the domain is $${D_ALL}$.`,
      `A positive base raised to any power is positive${a !== 1 ? `, and multiplying by $${a}$ keeps it positive` : ''}. The graph approaches the asymptote $y = 0$ but never reaches it.`,
      `Range: $${setv('y', '>', 0)}$.`,
    ],
  };
}

function featMatch(rng: Rng): GenOutput {
  const c = rng.pick([B(2), B(3), B(1, 2), B(1, 3)]);
  const cv = bval(c);
  const other = cv === 2 ? 3 : cv === 3 ? 2 : cv === 0.5 ? 1 / 3 : 0.5;
  const g: GridSpec = { xMin: -4, xMax: 4, yMin: -2, yMax: 10 };
  const power = cv === 0.5 ? plot((x) => Math.sqrt(x), g, 0) : cv === 1 / 3 ? plot((x) => Math.cbrt(x), g) : plot((x) => x ** cv, g);
  const powTex = cv === 0.5 ? '\\sqrt{x}' : cv === 1 / 3 ? '\\sqrt[3]{x}' : `x^{${cv}}`;
  const opts = [
    { md: '', figure: plot((x) => cv ** x, g), correct: true },
    { md: '', figure: plot((x) => (1 / cv) ** x, g) },
    { md: '', figure: plot((x) => other ** x, g) },
    { md: '', figure: power },
  ];
  return {
    prompt: `Which graph shows $y = ${btex(c)}^{x}$?`,
    parts: [part(mcFigures(rng, opts))],
    hints: ['Every graph of $y = c^{x}$ passes through $(0, 1)$ and $(1, c)$.', 'Decide whether the graph should rise or fall from left to right.'],
    solution: [
      `$y = ${btex(c)}^{x}$ passes through $(-1,\\ ${nn(1 / cv)})$, $(0, 1)$ and $(1,\\ ${nn(cv)})$.`,
      `The base is ${cv > 1 ? 'greater than $1$, so the graph rises from left to right' : 'between $0$ and $1$, so the graph falls from left to right'}, approaching the asymptote $y = 0$ ${cv > 1 ? 'on the left' : 'on the right'}.`,
      `The other graphs show $y = ${btex(B(c.d, c.n))}^{x}$, $y = ${btex(other > 1 ? B(other) : B(1, Math.round(1 / other)))}^{x}$ and the power function $y = ${powTex}$, which is not exponential.`,
      'The correct graph is the one through those three points.',
    ],
  };
}

function featFromPoints(rng: Rng): GenOutput {
  const pick = retry(
    () => {
      const c = rng.pick([B(2), B(3), B(4), B(5), B(1, 2), B(1, 3), B(3, 2), B(2, 3)]);
      const a = rng.pick([2, 3, 4, 5, 6, 8, 10, 12]);
      const x1 = rng.pick([-1, 1, 2]);
      const gap = rng.pick([1, 2]);
      return { c, a, x1, x2: x1 + gap, gap };
    },
    ({ c, a, x1, x2 }) => {
      const y1 = fpow(c, x1);
      const y2 = fpow(c, x2);
      const v1 = (a * y1.n) / y1.d;
      const v2 = (a * y2.n) / y2.d;
      const f1 = toFrac(v1, 50);
      const f2 = toFrac(v2, 50);
      return !!f1 && !!f2 && Math.max(v1, v2) <= 400 && v1 !== v2;
    },
  );
  const { c, a, x1, x2, gap } = pick;
  const y1 = (a * fpow(c, x1).n) / fpow(c, x1).d;
  const y2 = (a * fpow(c, x2).n) / fpow(c, x2).d;
  const ratio = fpow(c, gap);
  const f: ExpFn = { a, c, b: 1, h: 0, k: 0 };
  return {
    prompt: `The graph of an exponential function $y = a(c)^{x}$ passes through $\\left(${x1},\\ ${nn(y1)}\\right)$ and $\\left(${x2},\\ ${nn(y2)}\\right)$. Write its equation.`,
    parts: [part({ kind: 'expression', expected: expStr(f) }, { label: '$y =$', placeholder: 'e.g. 5(2)^x' })],
    hints: ['Substitute both points to get two equations in $a$ and $c$.', 'Divide one equation by the other: $a$ cancels and you can solve for $c$.'],
    solution: [
      `Substitute the points: $${nn(y1)} = a\\,c^{${x1}}$ and $${nn(y2)} = a\\,c^{${x2}}$.`,
      `Divide the second equation by the first: $c^{${gap}} = \\dfrac{${nn(y2)}}{${nn(y1)}} = ${ftex(ratio)}$.`,
      gap === 2 ? `Take the square root ($c > 0$): $c = ${bsub(c)}$.` : `So $c = ${bsub(c)}$.`,
      `Then $a = ${nn(y1)} \\div ${btex(c)}^{${x1}} = ${a}$.`,
      `The equation is $y = ${expTex(f)}$.`,
    ],
  };
}

function featFromGraph(rng: Rng): GenOutput {
  const c = rng.pick([B(2), B(3), B(1, 2), B(1, 3)]);
  const cv = bval(c);
  const a = rng.pick(cv === 3 || cv === 1 / 3 ? [1, 2, 3] : [1, 2, 3, 4]);
  const f: ExpFn = { a, c, b: 1, h: 0, k: 0 };
  const dir = cv > 1 ? 1 : -1;
  const pts: Pt[] = [
    [0, a],
    [dir, a * Math.max(cv, 1 / cv)],
  ];
  const yMax = Math.max(8, Math.ceil((pts[1][1] + 2) / 2) * 2);
  const g: GridSpec = { xMin: -4, xMax: 4, yMin: -2, yMax };
  const fig = expFig(f, g, pts.map(([x, y]) => ({ x, y, label: ptLabel(x, y) })));
  return {
    prompt: `The graph of an exponential function of the form $y = a(c)^{x}$ is shown. Write its equation.`,
    figure: fig,
    parts: [part({ kind: 'expression', expected: expStr(f) }, { label: '$y =$', placeholder: 'e.g. 3(2)^x' })],
    hints: ['At $x = 0$, $c^{0} = 1$, so the $y$-intercept is $a$.', `Compare the $y$-values at $x = 0$ and $x = ${dir}$ to find the base.`],
    solution: [
      `The $y$-intercept is $${a}$, and when $x = 0$, $y = a(c)^{0} = a$. So $a = ${a}$.`,
      dir === 1 ? `At $x = 1$, $y = ${a === 1 ? '' : a}c = ${pts[1][1]}$, so $c = ${nn(cv)}$.` : `At $x = -1$, $y = ${a}c^{-1} = \\dfrac{${a}}{c} = ${pts[1][1]}$, so $c = \\dfrac{${a}}{${pts[1][1]}} = ${nn(cv)}$.`,
      `The equation is $y = ${expTex(f)}$.`,
    ],
  };
}

interface ExpCtx {
  intro: (start: number, model: string) => string;
  growth: boolean;
  starts: number[];
  rates: number[];
  per: string;
  ask: (n: number) => string;
  times: number[];
  decimals: number;
  suffix: string;
  what: string;
}
const EXP_CTX: ExpCtx[] = [
  {
    intro: (_s, m) => `The population of ${'{town}'} is modelled by $P = ${m}$, where $t$ is the time in years since 2020.`,
    growth: true,
    starts: [8400, 12500, 15600, 21000, 26800, 32400, 9600],
    rates: [1.5, 2, 2.5, 3, 3.5, 4],
    per: 'year',
    ask: (n) => `Use the model to estimate the population in ${2020 + n}, to the nearest whole number.`,
    times: [5, 6, 8, 10, 12, 15],
    decimals: 0,
    suffix: 'people',
    what: 'population',
  },
  {
    intro: (_s, m) => `A biology class grows bacteria in a culture. The number of bacteria after $t$ hours is modelled by $N = ${m}$.`,
    growth: true,
    starts: [150, 200, 250, 400, 500, 640, 800],
    rates: [10, 15, 20, 25, 30, 35],
    per: 'hour',
    ask: (n) => `How many bacteria does the model predict after ${n} hours? Round to the nearest whole number.`,
    times: [4, 5, 6, 7, 8, 10],
    decimals: 0,
    suffix: 'bacteria',
    what: 'number of bacteria',
  },
  {
    intro: (_s, m) => `The mass of caffeine, in milligrams, left in ${'{name}'}'s body $t$ hours after drinking a large coffee is modelled by $C = ${m}$.`,
    growth: false,
    starts: [120, 140, 160, 180, 200, 240],
    rates: [11, 12, 13, 14, 15],
    per: 'hour',
    ask: (n) => `How much caffeine is left after ${n} hours? Round to the nearest tenth of a milligram.`,
    times: [3, 4, 5, 6, 8],
    decimals: 1,
    suffix: 'mg',
    what: 'mass of caffeine',
  },
  {
    intro: (_s, m) => `The intensity of sunlight under the surface of a lake near ${'{town}'}, as a percent of the intensity at the surface, is modelled by $L = ${m}$, where $d$ is the depth in metres.`,
    growth: false,
    starts: [100],
    rates: [6, 8, 10, 12, 15, 18],
    per: 'metre',
    ask: (n) => `What percent of the surface light reaches a depth of ${n} m? Round to the nearest tenth of a percent.`,
    times: [3, 4, 5, 6, 8, 10],
    decimals: 1,
    suffix: '%',
    what: 'light intensity',
  },
];

function featContext(rng: Rng): GenOutput {
  const ctx = rng.pick(EXP_CTX);
  const start = rng.pick(ctx.starts);
  const rate = rng.pick(ctx.rates);
  const cv = ctx.growth ? 1 + rate / 100 : 1 - rate / 100;
  const t = ctx.per === 'metre' ? 'd' : 't';
  const model = `${big(start)}(${fmt(cv, 4)})^{${t}}`;
  const n = retry(
    () => rng.pick(ctx.times),
    (k) => safeRound(start * cv ** k, ctx.decimals),
  );
  const value = start * cv ** n;
  const intro = ctx.intro(start, model).replace('{town}', rng.pick(TOWNS)).replace('{name}', rng.pick(NAMES));
  const unit = ctx.suffix === '%' ? '%' : ` ${ctx.suffix}`;
  const st = (dir: 'increases' | 'decreases', r: string) => `The ${ctx.what} starts at ${prose(start)}${unit} and ${dir} by ${r}% each ${ctx.per}.`;
  const right = ctx.growth ? 'increases' : 'decreases';
  const wrongDir = ctx.growth ? 'decreases' : 'increases';
  const correct = st(right, fmt(rate));
  const distractors = [st(wrongDir, fmt(rate)), st(right, fmt(ctx.growth ? 100 + rate : 100 - rate)), st(right, fmt(rate / 100, 4))];
  const sym = intro.match(/\$([A-Z]) =/)?.[1] ?? 'y';
  return {
    prompt: `${intro}\n\n**a)** What does the model tell you?\n\n**b)** ${ctx.ask(n)}`,
    parts: [part(mc(rng, correct, distractors), { label: 'a)' }), numPart(value, { decimals: ctx.decimals, label: 'b)', suffix: ctx.suffix })],
    hints: [
      `In $y = a(c)^{${t}}$, $a$ is the starting value and $c$ is the growth or decay factor: $c = 1 + r$ for growth and $c = 1 - r$ for decay.`,
      `Substitute $${t} = ${n}$ and evaluate with a calculator.`,
    ],
    solution: [
      `The starting value (when $${t} = 0$) is $${big(start)}$.`,
      ctx.growth
        ? `The factor is $${fmt(cv, 4)} = 1 + ${fmt(rate / 100, 4)}$, which is greater than $1$: growth of ${fmt(rate)}% per ${ctx.per}.`
        : `The factor is $${fmt(cv, 4)} = 1 - ${fmt(rate / 100, 4)}$, which is between $0$ and $1$: a decrease of ${fmt(rate)}% per ${ctx.per}.`,
      `**a)** ${correct}`,
      `**b)** $${sym} = ${big(start)}(${fmt(cv, 4)})^{${n}} \\approx ${big(Number(fx(value, ctx.decimals))) === fx(value, ctx.decimals) ? fx(value, ctx.decimals) : big(Number(fx(value, ctx.decimals)))}$${ctx.suffix === '%' ? '%' : ` ${ctx.suffix}`}`,
    ],
    calculator: true,
  };
}

const expFeatures = skill({
  id: 'm301-exp-features',
  name: 'Characteristics of exponential functions',
  description: 'Identify growth or decay, the intercept, asymptote, domain and range of y = c^x, match graphs and equations, and find an exponential equation from points or a graph.',
  outcomes: ['RF9'],
  lessonId: 'm301-7-1',
  gen(rng, d): GenOutput {
    if (d === 1) {
      const kind = rng.pick(['which', 'evaluate', 'base'] as const);
      return kind === 'which' ? featWhich(rng, d) : kind === 'evaluate' ? featEvaluate(rng) : featBase(rng, d);
    }
    if (d === 2) {
      const kind = rng.pick(['which', 'base', 'statements', 'domain', 'match'] as const);
      if (kind === 'which') return featWhich(rng, d);
      if (kind === 'base') return featBase(rng, d);
      if (kind === 'statements') return featStatements(rng);
      if (kind === 'domain') return featDomainRange(rng);
      return featMatch(rng);
    }
    const kind = rng.pick(['points', 'graph', 'context'] as const);
    return kind === 'points' ? featFromPoints(rng) : kind === 'graph' ? featFromGraph(rng) : featContext(rng);
  },
});

// ---------------------------------------------------------------------------
// 7.2 Transformations of exponential functions — m301-exp-transform
// ---------------------------------------------------------------------------

interface Tr {
  a: number;
  b: number;
  h: number;
  k: number;
}
/** Words for the transformations in y = a f(b(x - h)) + k; the flags introduce common mistakes. */
function transformWords(t: Tr, flip: { hStretch?: boolean; aStretch?: boolean; axes?: boolean } = {}): string {
  const out: string[] = [];
  const A = Math.abs(t.a);
  const Bb = Math.abs(t.b);
  if (A !== 1) out.push(`a vertical stretch by a factor of $${nn(flip.aStretch ? 1 / A : A)}$`);
  if (t.a < 0) out.push(`a reflection in the ${flip.axes ? '$y$' : '$x$'}-axis`);
  if (Bb !== 1) out.push(`a horizontal stretch by a factor of $${nn(flip.hStretch ? Bb : 1 / Bb)}$`);
  if (t.b < 0) out.push(`a reflection in the ${flip.axes ? '$x$' : '$y$'}-axis`);
  const tr: string[] = [];
  if (t.h) tr.push(`${units(t.h)} ${t.h > 0 ? 'right' : 'left'}`);
  if (t.k) tr.push(`${units(t.k)} ${t.k > 0 ? 'up' : 'down'}`);
  if (tr.length) out.push(`a translation of ${tr.join(' and ')}`);
  return listWords(out);
}
const mapRule = '(x, y) \\to \\left(\\dfrac{x}{b} + h,\\ ay + k\\right)';
const EXP_BASES = [B(2), B(3), B(4), B(5), B(1, 2), B(1, 3)];

function trAsymptote(rng: Rng): GenOutput {
  const f = retry(
    (): ExpFn => ({ a: 1, c: rng.pick([B(2), B(3), B(4), B(5), B(1, 2), B(1, 3)]), b: 1, h: rng.int(-3, 3), k: rng.nonZero(-6, 6) }),
    (f) => {
      const v = fpow(f.c, -f.h);
      return v.n <= 64 && v.d <= 64;
    },
  );
  const v = fpow(f.c, -f.h);
  const yInt = v.n / v.d + f.k;
  return {
    prompt: `For $y = ${expTex(f)}$, state the equation of the horizontal asymptote and the $y$-intercept.`,
    parts: [numPart(f.k, { label: 'Asymptote: $y =$' }), numPart(yInt, { label: '$y$-intercept:' })],
    hints: ['The asymptote $y = 0$ of $y = c^{x}$ moves up or down with the vertical translation $k$.', 'For the $y$-intercept, substitute $x = 0$.'],
    solution: [
      `The graph of $y = ${btex(f.c)}^{x}$ has asymptote $y = 0$. It is translated ${units(f.k)} ${f.k > 0 ? 'up' : 'down'}, so the asymptote is $y = ${f.k}$.`,
      `$y$-intercept: $y = ${btex(f.c)}^{${argTex(1, f.h).replace('x', '0')}}${sgn(f.k)} = ${ftex(v)}${sgn(f.k)} = ${nn(yInt)}$.`,
      `Asymptote $y = ${f.k}$; $y$-intercept $${nn(yInt)}$.`,
    ],
  };
}

function trDescribeShift(rng: Rng): GenOutput {
  const f: ExpFn = { a: 1, c: rng.pick(EXP_BASES), b: 1, h: rng.nonZero(-5, 5), k: rng.nonZero(-6, 6) };
  const words = (h: number, k: number) => cap(transformWords({ a: 1, b: 1, h, k })) + '.';
  return {
    prompt: `How is the graph of $y = ${btex(f.c)}^{x}$ transformed to give the graph of $y = ${expTex(f)}$?`,
    parts: [part(mc(rng, words(f.h, f.k), [words(-f.h, f.k), words(f.h, -f.k), words(-f.h, -f.k)]))],
    hints: ['Compare with $y = c^{x - h} + k$.', '$x - h$ moves the graph $h$ units right; $x + h$ moves it left. $+k$ moves it up.'],
    solution: [
      `Write the equation as $y = ${btex(f.c)}^{x - (${f.h})} + (${f.k})$: $h = ${f.h}$ and $k = ${f.k}$.`,
      `$h = ${f.h}$ is a horizontal translation ${units(f.h)} ${f.h > 0 ? 'right' : 'left'}; $k = ${f.k}$ is a vertical translation ${units(f.k)} ${f.k > 0 ? 'up' : 'down'}.`,
      words(f.h, f.k),
    ],
  };
}

function basePoint(rng: Rng, c: Base, b = 1): [number, number] {
  const cv = bval(c);
  const xs = (cv > 1 ? [0, 1, 2] : [0, -1, -2]).filter((x) => Number.isInteger(x / b) && Math.abs(cv ** x) <= 25);
  const nonZero = xs.filter((x) => x !== 0);
  const x0 = rng.pick(nonZero.length && (b !== 1 || rng.chance(0.7)) ? nonZero : xs.length ? xs : [0]);
  return [x0, cv ** x0];
}

function trImageShift(rng: Rng): GenOutput {
  const c = rng.pick(EXP_BASES);
  const f: ExpFn = { a: 1, c, b: 1, h: rng.nonZero(-5, 5), k: rng.nonZero(-6, 6) };
  const [x0, y0] = basePoint(rng, c);
  return {
    prompt: `The point $(${x0},\\ ${nn(y0)})$ is on the graph of $y = ${btex(c)}^{x}$. What is the image of this point on the graph of $y = ${expTex(f)}$?`,
    parts: [part({ kind: 'point', x: x0 + f.h, y: y0 + f.k }, { label: 'Image point' })],
    hints: ['Each point moves by the same translation: $(x, y) \\to (x + h,\\ y + k)$.', `Here $h = ${f.h}$ and $k = ${f.k}$.`],
    solution: [
      `The graph is translated ${units(f.h)} ${f.h > 0 ? 'right' : 'left'} and ${units(f.k)} ${f.k > 0 ? 'up' : 'down'}: $(x, y) \\to (x ${f.h > 0 ? '+' : '-'} ${Math.abs(f.h)},\\ y ${f.k > 0 ? '+' : '-'} ${Math.abs(f.k)})$.`,
      `$(${x0},\\ ${nn(y0)}) \\to (${x0 + f.h},\\ ${nn(y0 + f.k)})$`,
    ],
  };
}

function trImagePoint(rng: Rng): GenOutput {
  const f = retry(
    (): ExpFn => ({ a: rng.pick([2, 3, -1, -2, -3, 1 / 2, 4]), c: rng.pick([B(2), B(3), B(1, 2), B(1, 3)]), b: rng.pick([1, -1, 2, 1 / 2, -2]), h: rng.int(-4, 4), k: rng.nonZero(-5, 5) }),
    (f) => f.b !== 1 || Math.abs(f.a) !== 1,
  );
  const [x0, y0] = basePoint(rng, f.c, f.b);
  const X = x0 / f.b + f.h;
  const Y = f.a * y0 + f.k;
  return {
    prompt: `The point $(${x0},\\ ${nn(y0)})$ is on the graph of $y = ${btex(f.c)}^{x}$. Find its image on the graph of $y = ${expTex(f)}$.`,
    parts: [part({ kind: 'point', x: X + 0, y: Y + 0 }, { label: 'Image point' })],
    hints: [`Compare with $y = a(c)^{b(x - h)} + k$ to read $a$, $b$, $h$ and $k$.`, `Use the mapping $${mapRule}$.`],
    solution: [
      `Here $a = ${nn(f.a)}$, $b = ${nn(f.b)}$, $h = ${f.h}$ and $k = ${f.k}$.`,
      `Mapping: $${mapRule}$.`,
      `$x$: $${Number.isInteger(f.b) ? `\\dfrac{${x0}}{${f.b}}` : `${x0} \\div ${pn(f.b)}`} + ${pn(f.h)} = ${nn(X)}$; $y$: $${pn(f.a)}(${nn(y0)}) + ${pn(f.k)} = ${nn(Y)}$.`,
      `The image point is $(${nn(X)},\\ ${nn(Y)})$.`,
    ],
  };
}

function trDomainRange(rng: Rng): GenOutput {
  const f: ExpFn = { a: rng.pick([1, -1, 2, -2, 3, -3, 1 / 2, -1 / 2]), c: rng.pick(EXP_BASES), b: rng.pick([1, -1, 2, 1 / 2]), h: rng.int(-5, 5), k: rng.nonZero(-6, 6) };
  const up = f.a > 0;
  const range = setv('y', up ? '>' : '<', f.k);
  const correct = dr(D_ALL, range);
  const distractors = rng.shuffle([dr(D_ALL, setv('y', up ? '<' : '>', f.k)), dr(D_ALL, setv('y', up ? '>' : '<', -f.k)), dr(setv('x', '>', f.h === 0 ? f.k : f.h), range), dr(D_ALL, setv('y', up ? '\\ge' : '\\le', f.k))]);
  return {
    prompt: `State the domain and range of $y = ${expTex(f)}$.`,
    parts: [part(mc(rng, correct, distractors))],
    hints: ['Stretches, reflections and translations never limit which $x$-values can be used.', `The asymptote is $y = ${f.k}$. Is the graph above it or below it?`],
    solution: [
      `Any real number can be substituted for $x$, so the domain is $${D_ALL}$.`,
      `The horizontal asymptote $y = 0$ of $y = ${btex(f.c)}^{x}$ moves to $y = ${f.k}$.`,
      up
        ? `$a = ${nn(f.a)} > 0$, so the graph stays above the asymptote: range $${range}$.`
        : `$a = ${nn(f.a)} < 0$ reflects the graph in the $x$-axis before the translation, so it stays below the asymptote: range $${range}$.`,
    ],
  };
}

function trDescribe(rng: Rng): GenOutput {
  const f = retry(
    (): ExpFn => ({ a: rng.pick([1, -1, 2, -2, 3, -3, 1 / 2, -1 / 2, 4]), c: rng.pick(EXP_BASES), b: rng.pick([1, 1, -1, 2, 1 / 2, 3, 1 / 3]), h: rng.nonZero(-5, 5), k: rng.nonZero(-6, 6) }),
    (f) => (Math.abs(f.a) !== 1 || Math.abs(f.b) !== 1) && !(f.a < 0 && f.b < 0),
  );
  const w = (t: Tr, flip = {}) => cap(transformWords(t, flip)) + '.';
  const distractors = rng.shuffle(
    [
      Math.abs(f.b) !== 1 ? w(f, { hStretch: true }) : null,
      Math.abs(f.a) !== 1 ? w(f, { aStretch: true }) : null,
      f.a < 0 || f.b < 0 ? w(f, { axes: true }) : null,
      w({ ...f, h: -f.h }),
      w({ ...f, k: -f.k }),
    ].filter((s): s is string => !!s),
  );
  return {
    prompt: `Which describes the transformations that map the graph of $y = ${btex(f.c)}^{x}$ onto the graph of $y = ${expTex(f)}$?`,
    parts: [part(mc(rng, w(f), distractors))],
    hints: ['Compare with $y = a(c)^{b(x - h)} + k$.', '$|a|$ is a vertical stretch; a horizontal stretch has factor $\\frac{1}{|b|}$; a negative $a$ reflects in the $x$-axis and a negative $b$ in the $y$-axis.'],
    solution: [
      `$a = ${nn(f.a)}$, $b = ${nn(f.b)}$, $h = ${f.h}$, $k = ${f.k}$.`,
      ...(Math.abs(f.a) !== 1 ? [`$|a| = ${nn(Math.abs(f.a))}$: vertical stretch by a factor of $${nn(Math.abs(f.a))}$.`] : []),
      ...(f.a < 0 ? ['$a < 0$: reflection in the $x$-axis.'] : []),
      ...(Math.abs(f.b) !== 1 ? [`$|b| = ${nn(Math.abs(f.b))}$: horizontal stretch by a factor of $\\frac{1}{|b|} = ${nn(1 / Math.abs(f.b))}$.`] : []),
      ...(f.b < 0 ? ['$b < 0$: reflection in the $y$-axis.'] : []),
      `$h = ${f.h}$ and $k = ${f.k}$: translation ${units(f.h)} ${f.h > 0 ? 'right' : 'left'} and ${units(f.k)} ${f.k > 0 ? 'up' : 'down'}.`,
      w(f),
    ],
  };
}

function trYIntercept(rng: Rng): GenOutput {
  const f = retry(
    (): ExpFn => ({ a: rng.pick([1, -1, 2, -2, 3, -3, 4]), c: rng.pick([B(2), B(3), B(1, 2), B(1, 3)]), b: rng.pick([1, -1, 2]), h: rng.nonZero(-2, 2), k: rng.int(-6, 6) }),
    (f) => Math.abs(f.b * f.h) <= 3 && (f.a !== 1 || f.b !== 1),
  );
  const e = -f.b * f.h;
  const v = fpow(f.c, e);
  const y = (f.a * v.n) / v.d + f.k;
  return {
    prompt: `Find the $y$-intercept of $y = ${expTex(f)}$. Give an exact answer.`,
    parts: [numPart(y, { label: '$y$-intercept:' })],
    hints: ['Substitute $x = 0$.', 'Work out the exponent first, then the power, then multiply by $a$ and add $k$.'],
    solution: [
      `Substitute $x = 0$. The exponent is $${argTex(f.b, f.h).replace(/x/g, '0')} = ${e}$.`,
      `$y = ${f.a === 1 ? '' : f.a === -1 ? '-' : pn(f.a)}${btex(f.c)}^{${e}}${sgn(f.k)} = ${f.a === 1 ? '' : f.a === -1 ? '-' : pn(f.a)}${f.a !== 1 && f.a !== -1 ? `\\left(${ftex(v)}\\right)` : ftex(v)}${sgn(f.k)} = ${nn(y)}$`,
      `The $y$-intercept is $${nn(y)}$.`,
    ],
  };
}

function trFromDescription(rng: Rng): GenOutput {
  const c = rng.pick([B(2), B(3), B(4), B(5), B(1, 2), B(1, 3)]);
  const f = retry(
    (): ExpFn => ({ a: rng.sign() * rng.pick([1, 2, 3, 4, 1 / 2]), c, b: rng.pick([1, 1, 2, 3, 1 / 2, 1 / 3, -1]), h: rng.nonZero(-5, 5), k: rng.nonZero(-6, 6) }),
    (f) => Math.abs(f.a) !== 1 || Math.abs(f.b) !== 1,
  );
  return {
    prompt: `The graph of $y = ${btex(c)}^{x}$ is transformed by ${transformWords(f)}. Write the equation of the transformed function.`,
    parts: [part({ kind: 'expression', expected: expStr(f) }, { label: '$y =$', placeholder: 'e.g. -3(2)^(x + 1) + 4' })],
    hints: ['Use the form $y = a(c)^{b(x - h)} + k$.', 'A horizontal stretch by a factor of $s$ gives $b = \\frac{1}{s}$; a reflection in the $x$-axis makes $a$ negative and a reflection in the $y$-axis makes $b$ negative.'],
    solution: [
      `Start from $y = a${c.d === 1 ? `(${c.n})` : btex(c)}^{b(x - h)} + k$.`,
      `Vertical: ${Math.abs(f.a) !== 1 ? `stretch by $${nn(Math.abs(f.a))}$` : 'no stretch'}${f.a < 0 ? ' and a reflection in the $x$-axis' : ''}, so $a = ${nn(f.a)}$.`,
      `Horizontal: ${Math.abs(f.b) !== 1 ? `stretch by $${nn(1 / Math.abs(f.b))}$, so $|b| = ${nn(Math.abs(f.b))}$` : 'no stretch'}${f.b < 0 ? ' and a reflection in the $y$-axis' : ''}, so $b = ${nn(f.b)}$.`,
      `Translation: $h = ${f.h}$ and $k = ${f.k}$.`,
      `$y = ${expTex(f)}$`,
    ],
  };
}

function trFromGraph(rng: Rng): GenOutput {
  const g: GridSpec = { xMin: -6, xMax: 6, yMin: -8, yMax: 8 };
  const { f, pts } = retry(
    () => {
      const c = rng.pick([B(2), B(2), B(3), B(1, 2)]);
      const f: ExpFn = { a: rng.pick([1, 2, -1, -2, 3, -3]), c, b: 1, h: rng.int(-3, 3), k: rng.int(-4, 4) };
      const step = bval(c) > 1 ? 1 : -1;
      const pts: Pt[] = [
        [f.h, f.a + f.k],
        [f.h + step, f.a * Math.max(bval(c), 1 / bval(c)) + f.k],
      ];
      return { f, pts };
    },
    ({ f, pts }) => pts.every(([x, y]) => inGrid(g, x, y, 1)) && Math.abs(f.a * Math.max(bval(f.c), 1 / bval(f.c))) <= 6,
  );
  const cv = bval(f.c);
  const step = cv > 1 ? 1 : -1;
  const fig = expFig(f, g, pts.map(([x, y]) => ({ x, y, label: ptLabel(x, y) })));
  const form = `y = a${f.c.d === 1 ? `(${f.c.n})` : btex(f.c)}^{x - h} + k`;
  const d0 = pts[0][1] - f.k;
  const d1 = pts[1][1] - f.k;
  return {
    prompt: `The graph is a transformation of $y = ${btex(f.c)}^{x}$. The dashed line is its horizontal asymptote. Write its equation in the form $${form}$.`,
    figure: fig,
    parts: [part({ kind: 'expression', expected: expStr(f) }, { label: '$y =$', placeholder: 'e.g. 2(2)^(x - 1) + 3' })],
    hints: [
      'The asymptote gives $k$. In $y = a(c)^{x - h} + k$, when $x = h$ the point is $a$ units from the asymptote.',
      `Measure each labelled point's vertical distance from the asymptote. The distance is multiplied by $${nn(cv)}$ each time $x$ increases by $1$.`,
    ],
    solution: [
      `The asymptote is $y = ${f.k}$, so $k = ${f.k}$.`,
      `The point $${ptTex(pts[0][0], pts[0][1])}$ is $${Math.abs(d0)}$ ${d0 > 0 ? 'above' : 'below'} the asymptote and $${ptTex(pts[1][0], pts[1][1])}$ is $${Math.abs(d1)}$ ${d1 > 0 ? 'above' : 'below'} it. ${step === 1 ? 'Moving right' : 'Moving left'} by $1$ multiplies the distance by $${nn(Math.max(cv, 1 / cv))}$, which matches the base $${bsub(f.c)}$.`,
      `Take $h = ${f.h}$: at $x = h$, $y = a + k$, so $a = ${pts[0][1]} - ${pn(f.k)} = ${f.a}$${f.a < 0 ? ' (negative: the graph is reflected in the $x$-axis)' : ''}.`,
      `$y = ${expTex(f)}$ (any equivalent equation describes the same graph).`,
    ],
  };
}

function trMatch(rng: Rng): GenOutput {
  const g: GridSpec = { xMin: -6, xMax: 6, yMin: -8, yMax: 8 };
  const f: ExpFn = { a: rng.pick([1, -1, 2, -2]), c: rng.pick([B(2), B(1, 2)]), b: 1, h: rng.nonZero(-3, 3), k: rng.nonZero(-4, 4) };
  const opts = [
    { md: '', figure: expFig(f, g), correct: true },
    { md: '', figure: expFig({ ...f, h: -f.h }, g) },
    { md: '', figure: expFig({ ...f, k: -f.k }, g) },
    { md: '', figure: expFig({ ...f, a: -f.a }, g) },
  ];
  return {
    prompt: `Which graph shows $y = ${expTex(f)}$? The dashed line on each graph is its horizontal asymptote.`,
    parts: [part(mcFigures(rng, opts))],
    hints: [`The asymptote is $y = ${f.k}$.`, `When $x = ${f.h}$, the exponent is $0$, so $y = ${nn(f.a)} + ${pn(f.k)} = ${nn(f.a + f.k)}$.`],
    solution: [
      `The horizontal asymptote is $y = ${f.k}$.`,
      `$a = ${nn(f.a)}$ is ${f.a > 0 ? 'positive, so the graph is above the asymptote' : 'negative, so the graph is reflected and lies below the asymptote'}.`,
      `When $x = ${f.h}$: $y = ${f.a === 1 ? '' : f.a === -1 ? '-' : nn(f.a)}${btex(f.c)}^{0}${sgn(f.k)} = ${nn(f.a + f.k)}$, so the graph passes through $(${f.h},\\ ${nn(f.a + f.k)})$.`,
      'The correct graph has that asymptote, lies on that side of it, and passes through that point.',
    ],
  };
}

const expTransform = skill({
  id: 'm301-exp-transform',
  name: 'Transformations of exponential functions',
  description: 'Apply y = a(c)^(b(x - h)) + k: describe the transformations, find image points, the asymptote, intercept, domain and range, and write the equation from a description or a graph.',
  outcomes: ['RF9'],
  lessonId: 'm301-7-2',
  gen(rng, d): GenOutput {
    if (d === 1) {
      const kind = rng.pick(['asymptote', 'describe', 'image'] as const);
      return kind === 'asymptote' ? trAsymptote(rng) : kind === 'describe' ? trDescribeShift(rng) : trImageShift(rng);
    }
    if (d === 2) {
      const kind = rng.pick(['image', 'domain', 'describe', 'yint'] as const);
      return kind === 'image' ? trImagePoint(rng) : kind === 'domain' ? trDomainRange(rng) : kind === 'describe' ? trDescribe(rng) : trYIntercept(rng);
    }
    const kind = rng.pick(['description', 'graph', 'match'] as const);
    return kind === 'description' ? trFromDescription(rng) : kind === 'graph' ? trFromGraph(rng) : trMatch(rng);
  },
});

// ---------------------------------------------------------------------------
// 7.3 Solving exponential equations with a common base — m301-exp-equation-common-base
// ---------------------------------------------------------------------------

/** Exponents m with g^m a convenient base. */
const FAMILY: Record<number, number[]> = { 2: [1, 2, 3, 4, 5, -1, -2, -3], 3: [1, 2, 3, 4, -1, -2, -3], 5: [1, 2, 3, -1, -2] };
const famBase = (g: number, m: number): Base => (m > 0 ? B(g ** m) : B(1, g ** -m));
/** g^n written as a number (or a fraction for a negative n). */
const powNum = (g: number, n: number) => (n >= 0 ? big(g ** n) : `\\dfrac{1}{${big(g ** -n)}}`);
/** (g^m)^e in LaTeX. */
const pw = (g: number, m: number, e: string) => (m === 1 ? `${g}^{${e}}` : `\\left(${g}^{${m}}\\right)^{${e}}`);
const rewrite = (g: number, pairs: Array<[string, number]>) => {
  const items = pairs.filter(([t]) => t !== String(g)).map(([t, m]) => `$${t} = ${g}^{${m}}$`);
  return `Write each base${pairs.length > 2 ? ' and number' : ''} as a power of $${g}$: ${listWords(items)}.`;
};

function cbSimple(rng: Rng): GenOutput {
  const b = rng.pick([2, 3, 4, 5, 6, 10]);
  const maxM: Record<number, number> = { 2: 10, 3: 7, 4: 5, 5: 5, 6: 4, 10: 5 };
  const m = rng.int(2, maxM[b]);
  const N = b ** m;
  const variant = rng.pick(['shift', 'shift', 'scale', 'recip'] as const);
  if (variant === 'recip') {
    return {
      prompt: `Solve $${b}^{x} = \\dfrac{1}{${big(N)}}$.`,
      parts: [numPart(-m, { label: '$x =$' })],
      hints: [`Write $${big(N)}$ as a power of $${b}$.`, 'A reciprocal is a negative exponent: $\\dfrac{1}{b^{n}} = b^{-n}$.'],
      solution: [`$\\dfrac{1}{${big(N)}} = \\dfrac{1}{${b}^{${m}}} = ${b}^{${-m}}$`, `$${b}^{x} = ${b}^{${-m}}$, so the exponents are equal.`, `$x = ${-m}$`],
    };
  }
  let lhs: string;
  let x: number;
  if (variant === 'scale' && (m % 2 === 0 || m % 3 === 0)) {
    const q = m % 3 === 0 && (m % 2 !== 0 || rng.chance(0.5)) ? 3 : 2;
    lhs = `${q}x`;
    x = m / q;
  } else {
    const p = rng.nonZero(-4, 4);
    lhs = lin(1, p);
    x = m - p;
  }
  return {
    prompt: `Solve $${b}^{${lhs}} = ${big(N)}$.`,
    parts: [numPart(x, { label: '$x =$' })],
    hints: [`Write $${big(N)}$ as a power of $${b}$.`, 'When two powers with the same base are equal, their exponents are equal.'],
    solution: [`$${big(N)} = ${b}^{${m}}$`, `$${b}^{${lhs}} = ${b}^{${m}}$, so $${lhs} = ${m}$.`, `$x = ${nn(x)}$`],
  };
}

function cbTwoBases(rng: Rng): GenOutput {
  const g = rng.pick([2, 2, 3, 3, 5]);
  const o = retry(
    () => {
      const [m1, m2] = rng.sample(FAMILY[g], 2);
      return { m1, m2, p1: rng.pick([1, 1, 2]), p2: rng.pick([1, 1, 2, -1]), q1: rng.int(-4, 4), q2: rng.int(-4, 4) };
    },
    ({ m1, m2, p1, p2, q1, q2 }) => {
      const den = m1 * p1 - m2 * p2;
      if (den === 0) return false;
      const x = frac(m2 * q2 - m1 * q1, den);
      return x.d <= 9 && Math.abs(x.n / x.d) <= 12 && x.n !== 0 && !(m1 === 1 && p1 === 1 && q1 === 0);
    },
  );
  const { m1, m2, p1, p2, q1, q2 } = o;
  const c1 = famBase(g, m1);
  const c2 = famBase(g, m2);
  const e1 = lin(p1, q1);
  const e2 = lin(p2, q2);
  const [L, Lq, R, Rq] = [m1 * p1, m1 * q1, m2 * p2, m2 * q2];
  const x = frac(Rq - Lq, L - R);
  return {
    prompt: `Solve $${btex(c1)}^{${e1}} = ${btex(c2)}^{${e2}}$. Give an exact answer.`,
    parts: [numPart(x.n / x.d, { label: '$x =$' })],
    hints: [`Both bases are powers of $${g}$.`, 'Rewrite each side as a single power of the same base, then set the exponents equal.'],
    solution: [
      rewrite(g, [
        [btex(c1), m1],
        [btex(c2), m2],
      ]),
      `$${pw(g, m1, e1)} = ${pw(g, m2, e2)}$`,
      `Power of a power — multiply the exponents: $${g}^{${lin(L, Lq)}} = ${g}^{${lin(R, Rq)}}$`,
      `The bases are equal, so the exponents are equal: $${lin(L, Lq)} = ${lin(R, Rq)}$.`,
      `$${lin(L - R, 0)} = ${Rq - Lq}$, so $x = ${ftex(x)}$.`,
    ],
  };
}

function cbToNumber(rng: Rng): GenOutput {
  const g = rng.pick([2, 2, 3, 5]);
  const o = retry(
    () => ({ m1: rng.pick(FAMILY[g].filter((m) => m !== 1)), n: rng.nonZero(-4, 6), p: rng.pick([1, 1, 2]), q: rng.int(-3, 3) }),
    ({ m1, n, p, q }) => {
      const x = frac(n - m1 * q, m1 * p);
      return g ** Math.abs(n) <= 729 && x.d <= 12 && x.n !== 0;
    },
  );
  const { m1, n, p, q } = o;
  const c1 = famBase(g, m1);
  const e1 = lin(p, q);
  const x = frac(n - m1 * q, m1 * p);
  return {
    prompt: `Solve $${btex(c1)}^{${e1}} = ${powNum(g, n)}$. Give an exact answer.`,
    parts: [numPart(x.n / x.d, { label: '$x =$' })],
    hints: [`Write both sides as powers of $${g}$.`, 'Multiply exponents for a power of a power, then set the exponents equal.'],
    solution: [
      `$${btex(c1)} = ${g}^{${m1}}$ and $${powNum(g, n)} = ${g}^{${n}}$.`,
      `$${pw(g, m1, e1)} = ${g}^{${n}}$, so $${g}^{${lin(m1 * p, m1 * q)}} = ${g}^{${n}}$.`,
      `Equate the exponents: $${lin(m1 * p, m1 * q)} = ${n}$.`,
      `$x = ${ftex(x)}$`,
    ],
  };
}

function cbProductQuotient(rng: Rng): GenOutput {
  const g = rng.pick([2, 3, 3, 5]);
  const tpl = rng.pick(['div', 'mul', 'prod'] as const);
  const o = retry(
    () => {
      const [m1, m2] = rng.sample(FAMILY[g].filter((m) => m > 0 || rng.chance(0.4)), 2);
      return { m1, m2, p1: rng.pick([1, 1, 2]), p2: rng.pick([1, 1, 2]), q1: rng.int(-3, 3), q2: rng.int(-3, 3), n: tpl === 'prod' ? rng.nonZero(-3, 5) : rng.int(1, g === 2 ? 3 : 2) };
    },
    (o) => {
      if (o.m1 === undefined || o.m2 === undefined) return false;
      const { Lp, Lq, Rp, Rq } = pqSides(tpl, o);
      if (Lp === Rp) return false;
      const x = frac(Rq - Lq, Lp - Rp);
      return x.d <= 9 && Math.abs(x.n / x.d) <= 12 && x.n !== 0 && g ** Math.abs(o.n) <= 625;
    },
  );
  const { m1, m2, p1, p2, q1, q2, n } = o;
  const { Lp, Lq, Rp, Rq } = pqSides(tpl, o);
  const x = frac(Rq - Lq, Lp - Rp);
  const c1 = famBase(g, m1);
  const c2 = famBase(g, m2);
  const e1 = lin(p1, q1);
  const e2 = lin(p2, q2);
  const P1 = `${btex(c1)}^{${e1}}`;
  const P2 = `${btex(c2)}^{${e2}}`;
  const eq = tpl === 'div' ? `${P1} = \\dfrac{${P2}}{${g ** n}}` : tpl === 'mul' ? `${P1} = ${g ** n} \\cdot ${P2}` : `${P1} \\cdot ${P2} = ${powNum(g, n)}`;
  const G1 = pw(g, m1, e1);
  const G2 = pw(g, m2, e2);
  const eqG = tpl === 'div' ? `${G1} = \\dfrac{${G2}}{${g}^{${n}}}` : tpl === 'mul' ? `${G1} = ${g}^{${n}} \\cdot ${G2}` : `${G1} \\cdot ${G2} = ${g}^{${n}}`;
  const law = tpl === 'div' ? 'to divide powers, subtract the exponents' : 'to multiply powers, add the exponents';
  return {
    prompt: `Solve $${eq}$. Give an exact answer.`,
    parts: [numPart(x.n / x.d, { label: '$x =$' })],
    hints: [`Write every base and number as a power of $${g}$.`, `Use the exponent laws (${law}) to get a single power on each side, then equate the exponents.`],
    solution: [
      rewrite(g, [
        [btex(c1), m1],
        [btex(c2), m2],
        ...(tpl === 'prod' ? ([[powNum(g, n), n]] as Array<[string, number]>) : ([[String(g ** n), n]] as Array<[string, number]>)),
      ]),
      `$${eqG}$`,
      `Multiply exponents for each power of a power, and ${law}: $${g}^{${lin(Lp, Lq)}} = ${g}^{${lin(Rp, Rq)}}$`,
      `Equate the exponents: $${lin(Lp, Lq)} = ${lin(Rp, Rq)}$.`,
      `$${lin(Lp - Rp, 0)} = ${Rq - Lq}$, so $x = ${ftex(x)}$.`,
    ],
  };
}
function pqSides(tpl: 'div' | 'mul' | 'prod', o: { m1: number; m2: number; p1: number; p2: number; q1: number; q2: number; n: number }) {
  const { m1, m2, p1, p2, q1, q2, n } = o;
  if (tpl === 'prod') return { Lp: m1 * p1 + m2 * p2, Lq: m1 * q1 + m2 * q2, Rp: 0, Rq: n };
  return { Lp: m1 * p1, Lq: m1 * q1, Rp: m2 * p2, Rq: m2 * q2 + (tpl === 'div' ? -n : n) };
}

/** x^2 + bx + c in LaTeX. */
function quadTex(b: number, c: number): string {
  let s = 'x^{2}';
  if (b) s += ` ${b > 0 ? '+' : '-'} ${Math.abs(b) === 1 ? '' : Math.abs(b)}x`;
  if (c) s += ` ${c > 0 ? '+' : '-'} ${Math.abs(c)}`;
  return s;
}
const factorTex = (r: number) => (r === 0 ? 'x' : `(x ${r > 0 ? '-' : '+'} ${Math.abs(r)})`);

function cbQuadratic(rng: Rng): GenOutput {
  if (rng.chance(0.4)) {
    const g = rng.pick([2, 3, 5]);
    const r = rng.int(1, 3);
    const n = rng.int(1, g === 2 ? 6 : g === 3 ? 4 : 3);
    const c = n - r * r;
    const lhs = c === 0 ? 'x^{2}' : `x^{2} ${c > 0 ? '+' : '-'} ${Math.abs(c)}`;
    return {
      prompt: `Solve $${g}^{${lhs}} = ${big(g ** n)}$. Enter all solutions.`,
      parts: [solPart([-r, r])],
      hints: [`Write $${big(g ** n)}$ as a power of $${g}$.`, 'After equating the exponents you get a quadratic equation; it can have two solutions.'],
      solution: [`$${big(g ** n)} = ${g}^{${n}}$, so $${lhs} = ${n}$.`, `$x^{2} = ${r * r}$`, `$x = \\pm ${r}$: $x = ${-r}$ or $x = ${r}$.`],
    };
  }
  const g = rng.pick([2, 3]);
  const o = retry(
    () => {
      const m = rng.pick([2, 3]);
      const [r1, r2] = rng.sample([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5], 2);
      return { m, r1, r2 };
    },
    ({ m, r1, r2 }) => (r1 * r2) % m === 0 && Math.abs(m - (r1 + r2)) <= 8,
  );
  const { m, r1, r2 } = o;
  const t = (-r1 * r2) / m;
  const A = m - (r1 + r2);
  const lhs = quadTex(A, 0);
  const s = r1 + r2;
  const pr = r1 * r2;
  return {
    prompt: `Solve $${g}^{${lhs}} = ${g ** m}^{${lin(1, t)}}$. Enter all solutions.`,
    parts: [solPart([r1, r2])],
    hints: [`Write $${g ** m}$ as a power of $${g}$ and equate the exponents.`, 'Rearrange the quadratic so one side is $0$, then factor.'],
    solution: [
      `$${g ** m} = ${g}^{${m}}$, so the right side is $${pw(g, m, lin(1, t))} = ${g}^{${lin(m, m * t)}}$.`,
      `Equate the exponents: $${lhs} = ${lin(m, m * t)}$.`,
      `$${quadTex(-s, pr)} = 0$`,
      `$${factorTex(r1)}${factorTex(r2)} = 0$`,
      `$x = ${Math.min(r1, r2)}$ or $x = ${Math.max(r1, r2)}$`,
    ],
  };
}

function cbApplication(rng: Rng): GenOutput {
  const kind = rng.pick(['double', 'half', 'triple'] as const);
  if (kind === 'double') {
    const N0 = rng.pick([100, 150, 200, 250, 300, 400, 500, 750]);
    const [d, unit, word] = rng.pick([
      [2, 'h', 'hours'],
      [3, 'h', 'hours'],
      [4, 'h', 'hours'],
      [5, 'h', 'hours'],
      [20, 'min', 'minutes'],
      [30, 'min', 'minutes'],
    ] as const);
    const m = rng.int(3, 7);
    const N = N0 * 2 ** m;
    return {
      prompt: `A culture starts with ${N0} bacteria and the number doubles every ${d} ${word}. The number of bacteria after $t$ ${word} is $N = ${N0}(2)^{\\frac{t}{${d}}}$. How long will it take for the culture to reach ${big(N)} bacteria?`,
      parts: [numPart(m * d, { suffix: unit })],
      hints: [`Substitute $N = ${big(N)}$ and divide both sides by $${N0}$.`, 'Write the result as a power of $2$ and equate the exponents.'],
      solution: [
        `$${big(N)} = ${N0}(2)^{\\frac{t}{${d}}}$`,
        `Divide by $${N0}$: $${2 ** m} = 2^{\\frac{t}{${d}}}$`,
        `$2^{${m}} = 2^{\\frac{t}{${d}}}$, so $\\dfrac{t}{${d}} = ${m}$.`,
        `$t = ${m * d}$ ${word}`,
      ],
    };
  }
  if (kind === 'half') {
    const A0 = rng.pick([80, 96, 160, 200, 320, 400, 640, 800]);
    const [h, unit, word] = rng.pick([
      [6, 'h', 'hours'],
      [8, 'h', 'hours'],
      [12, 'h', 'hours'],
      [4, 'days', 'days'],
      [8, 'days', 'days'],
      [14, 'days', 'days'],
      [30, 'years', 'years'],
    ] as const);
    const m = rng.int(2, 5);
    const A = A0 / 2 ** m;
    return {
      prompt: `A sample of a radioactive isotope has a mass of ${A0} mg. Its half-life is ${h} ${word}, so the mass remaining after $t$ ${word} is $A = ${A0}\\left(\\frac{1}{2}\\right)^{\\frac{t}{${h}}}$. How long will it take until ${fmt(A)} mg remain?`,
      parts: [numPart(m * h, { suffix: unit })],
      hints: [`Substitute $A = ${fmt(A)}$ and divide both sides by $${A0}$.`, 'Write the fraction as a power of $\\frac{1}{2}$ and equate the exponents.'],
      solution: [
        `$${fmt(A)} = ${A0}\\left(\\frac{1}{2}\\right)^{\\frac{t}{${h}}}$`,
        `Divide by $${A0}$: $\\dfrac{${fmt(A)}}{${A0}} = \\dfrac{1}{${2 ** m}} = \\left(\\frac{1}{2}\\right)^{${m}}$`,
        `So $\\dfrac{t}{${h}} = ${m}$.`,
        `$t = ${m * h}$ ${word}`,
      ],
    };
  }
  const name = rng.pick(NAMES);
  const [S0, d] = [rng.pick([20, 30, 40, 50, 60]), rng.pick([2, 3, 4, 5])];
  const m = rng.int(2, 4);
  const S = S0 * 3 ** m;
  return {
    prompt: `The number of views of ${name}'s video on hiking in the mountains triples every ${d} days. The number of views $t$ days after posting is modelled by $V = ${S0}(3)^{\\frac{t}{${d}}}$. After how many days will it have ${big(S)} views?`,
    parts: [numPart(m * d, { suffix: 'days' })],
    hints: [`Substitute $V = ${big(S)}$ and divide both sides by $${S0}$.`, 'Write the result as a power of $3$ and equate the exponents.'],
    solution: [`$${big(S)} = ${S0}(3)^{\\frac{t}{${d}}}$`, `Divide by $${S0}$: $${3 ** m} = 3^{\\frac{t}{${d}}}$`, `$3^{${m}} = 3^{\\frac{t}{${d}}}$, so $\\dfrac{t}{${d}} = ${m}$.`, `$t = ${m * d}$ days`],
  };
}

/** g^n multiplied by a root of g, in LaTeX (s = 1/2, -1/2, 1/3 or 2/3). */
function radArg(g: number, n: number, s: number): string {
  const head = n === 0 ? '' : big(g ** n);
  if (s === 1 / 2) return `${head}\\sqrt{${g}}`;
  if (s === 1 / 3) return `${head}\\sqrt[3]{${g}}`;
  if (s === 2 / 3) return `${head}\\sqrt[3]{${g * g}}`;
  return `\\dfrac{${n === 0 ? 1 : big(g ** n)}}{\\sqrt{${g}}}`;
}
const rootPow = (s: number) => (s === 1 / 2 ? '\\sqrt{a} = a^{\\frac{1}{2}}' : s === -1 / 2 ? '\\dfrac{1}{\\sqrt{a}} = a^{-\\frac{1}{2}}' : s === 1 / 3 ? '\\sqrt[3]{a} = a^{\\frac{1}{3}}' : '\\sqrt[3]{a^{2}} = a^{\\frac{2}{3}}');

function cbRadical(rng: Rng): GenOutput {
  const g = rng.pick([2, 3, 5]);
  const m = rng.pick(g === 5 ? [1, 2] : [1, 2, 3]);
  const n = rng.int(0, g === 2 ? 3 : 2);
  const s = rng.pick([1 / 2, -1 / 2, 1 / 3]);
  const q = rng.int(-2, 2);
  const x = (n + s) / m - q;
  const lhs = `${g ** m}^{${lin(1, q)}}`;
  return {
    prompt: `Solve $${lhs} = ${radArg(g, n, s)}$. Give an exact answer.`,
    parts: [numPart(x, { label: '$x =$' })],
    hints: [`Write the radical as a power with a rational exponent: $${rootPow(s)}$.`, `Write both sides as powers of $${g}$, then equate the exponents.`],
    solution: [
      `Right side: $${radArg(g, n, s)} = ${n === 0 ? '' : `${g}^{${n}} \\cdot `}${g}^{${nn(s)}}${n === 0 ? '' : ` = ${g}^{${nn(n + s)}}`}$`,
      `Left side: $${m === 1 ? `${g}^{${lin(1, q)}}` : `${pw(g, m, lin(1, q))} = ${g}^{${lin(m, m * q)}}`}$`,
      `Equate the exponents: $${lin(m, m * q)} = ${nn(n + s)}$.`,
      `$x = ${nn(x)}$`,
    ],
  };
}

const expCommonBase = skill({
  id: 'm301-exp-equation-common-base',
  name: 'Exponential equations with a common base',
  description: 'Solve exponential equations by writing both sides as powers of the same base and equating the exponents.',
  outcomes: ['RF10'],
  lessonId: 'm301-7-3',
  gen(rng, d): GenOutput {
    if (d === 1) return cbSimple(rng);
    if (d === 2) return rng.chance(0.55) ? cbTwoBases(rng) : cbToNumber(rng);
    const kind = rng.pick(['pq', 'pq', 'quad', 'app', 'rad'] as const);
    if (kind === 'pq') return cbProductQuotient(rng);
    if (kind === 'quad') return cbQuadratic(rng);
    return kind === 'app' ? cbApplication(rng) : cbRadical(rng);
  },
});

// ---------------------------------------------------------------------------
// 7.4 Understanding logarithms — m301-log-evaluate, m301-log-exp-form
// ---------------------------------------------------------------------------

const LOG_DEF = '$\\log_{c} x = y$ means $c^{y} = x$: the logarithm is an exponent.';

function logBasic(rng: Rng): GenOutput {
  const b = rng.pick([2, 3, 4, 5, 6, 7, 8, 9, 10, 10]);
  const maxN = Math.min(6, Math.floor(Math.log(100000) / Math.log(b) + 1e-9));
  const weights: Array<[number, number]> = [
    [0, 1],
    [1, 1],
  ];
  for (let k = 2; k <= maxN; k++) weights.push([k, 3]);
  const n = rng.weighted(weights);
  const N = b ** n;
  return {
    prompt: `Evaluate $${logb(b)} ${big(N)}$.`,
    parts: [numPart(n)],
    hints: [`$${logb(b)} ${big(N)}$ asks: $${b}$ to what exponent gives $${big(N)}$?`, b === 10 ? 'A logarithm with no base written is the common logarithm, base $10$.' : `List the powers of $${b}$: $${b}^{1} = ${b}$, $${b}^{2} = ${b * b}$, and so on.`],
    solution: [`$${b}^{${n}} = ${big(N)}$`, `So $${logb(b)} ${big(N)} = ${n}$.`],
  };
}

function logCalc(rng: Rng): GenOutput {
  const decimals = rng.pick([2, 3]);
  const N = retry(
    () => rng.pick([rng.int(2, 99), rng.int(101, 999), rng.int(2, 99) / 100, rng.int(1001, 9999)]),
    (v) => !Number.isInteger(lg(v)) && safeRound(lg(v), decimals),
  );
  const k = Math.floor(lg(N));
  return {
    prompt: `Use a calculator to evaluate $\\log ${fmt(N)}$, ${roundingPhrase(decimals)}.`,
    parts: [numPart(lg(N), { decimals })],
    hints: ['$\\log$ with no base is the common logarithm, base $10$. Use the LOG key.', `Estimate first: $10^{${k}} < ${fmt(N)} < 10^{${k + 1}}$.`],
    solution: [
      `$\\log ${fmt(N)}$ is the exponent on $10$ that gives $${fmt(N)}$.`,
      `Since $10^{${k}} = ${fmt(10 ** k, 6)}$ and $10^{${k + 1}} = ${fmt(10 ** (k + 1), 6)}$, the answer is between $${k}$ and $${k + 1}$.`,
      `$\\log ${fmt(N)} \\approx ${fx(lg(N), decimals)}$`,
    ],
    calculator: true,
  };
}

function logNegFrac(rng: Rng): GenOutput {
  const kind = rng.pick(['recip', 'fracBase', 'root', 'powBase', 'powBase'] as const);
  let tex = '';
  let v = 0;
  let steps: string[] = [];
  if (kind === 'recip') {
    const b = rng.pick([2, 3, 4, 5, 6, 10]);
    const n = retry(
      () => rng.int(1, 4),
      (k) => b ** k <= 10000,
    );
    const arg = b === 10 ? fmt(10 ** -n, 6) : `\\frac{1}{${big(b ** n)}}`;
    tex = `${logb(b)} ${arg}`;
    v = -n;
    steps = [`$${arg} = \\dfrac{1}{${b}^{${n}}} = ${b}^{${-n}}$`, `So $${tex} = ${-n}$.`];
  } else if (kind === 'fracBase') {
    const b = rng.pick([2, 3, 4, 5]);
    const n = retry(
      () => rng.int(1, 4),
      (k) => b ** k <= 625,
    );
    const up = rng.chance(0.6);
    const arg = up ? big(b ** n) : `\\frac{1}{${big(b ** n)}}`;
    tex = `\\log_{\\frac{1}{${b}}} ${arg}`;
    v = up ? -n : n;
    steps = [`Ask: $\\frac{1}{${b}}$ to what exponent gives $${arg}$?`, `$\\left(\\frac{1}{${b}}\\right)^{${v}} = ${arg}$`, `So $${tex} = ${v}$.`];
  } else if (kind === 'root') {
    const b = rng.pick([2, 3, 5, 7, 10]);
    const [arg, val, why] = rng.pick([
      [`\\sqrt{${b}}`, 1 / 2, `\\sqrt{${b}} = ${b}^{\\frac{1}{2}}`],
      [`\\sqrt[3]{${b}}`, 1 / 3, `\\sqrt[3]{${b}} = ${b}^{\\frac{1}{3}}`],
      [`${b}\\sqrt{${b}}`, 3 / 2, `${b}\\sqrt{${b}} = ${b}^{1} \\cdot ${b}^{\\frac{1}{2}} = ${b}^{\\frac{3}{2}}`],
      [`\\frac{1}{\\sqrt{${b}}}`, -1 / 2, `\\frac{1}{\\sqrt{${b}}} = ${b}^{-\\frac{1}{2}}`],
      [`\\sqrt[3]{${b * b}}`, 2 / 3, `\\sqrt[3]{${b * b}} = \\sqrt[3]{${b}^{2}} = ${b}^{\\frac{2}{3}}`],
    ] as const);
    tex = `${logb(b)} ${arg.startsWith(String(b)) ? `\\left(${arg}\\right)` : arg}`;
    v = val;
    steps = [`Write the argument as a power of $${b}$: $${why}$.`, `So $${tex} = ${nn(val)}$.`];
  } else {
    const g = rng.pick([2, 3, 5]);
    const m = rng.pick(g === 2 ? [2, 3, 4] : [2, 3]);
    const n = retry(
      () => rng.nonZero(-6, 6),
      (k) => k % m !== 0 && g ** Math.abs(k) <= 3125,
    );
    const arg = n > 0 ? big(g ** n) : `\\frac{1}{${big(g ** -n)}}`;
    tex = `${logb(g ** m)} ${arg}`;
    v = n / m;
    steps = [
      `Write both numbers as powers of $${g}$: $${g ** m} = ${g}^{${m}}$ and $${arg} = ${g}^{${n}}$.`,
      `If $\\left(${g}^{${m}}\\right)^{y} = ${g}^{${n}}$, then $${m}y = ${n}$.`,
      `$y = ${nn(v)}$, so $${tex} = ${nn(v)}$.`,
    ];
  }
  return {
    prompt: `Evaluate $${tex}$. Give an exact answer.`,
    parts: [numPart(v)],
    hints: [LOG_DEF, 'Write the argument (and the base, if needed) as powers of the same number. Negative and fractional exponents are allowed.'],
    solution: steps,
  };
}

function logBetween(rng: Rng): GenOutput {
  const b = rng.pick([2, 3, 4, 5, 6, 7, 10]);
  const k = retry(
    () => rng.int(1, 4),
    (j) => b ** (j + 1) <= 100000,
  );
  const N = retry(
    () => rng.int(b ** k + 1, b ** (k + 1) - 1),
    (x) => !Number.isInteger(Math.log(x) / Math.log(b) + 1e-12) && Math.abs(Math.log(x) / Math.log(b) - Math.round(Math.log(x) / Math.log(b))) > 0.05,
  );
  const q = Math.floor(N / b);
  const opt = (a: number) => `$${a}$ and $${a + 1}$`;
  const value = Math.log(N) / Math.log(b);
  return {
    prompt: `Between which two consecutive whole numbers is $${logb(b)} ${big(N)}$?`,
    parts: [part(mc(rng, opt(k), rng.shuffle([opt(k - 1), opt(k + 1), q <= 12 ? opt(q) : opt(k + 2)])))],
    hints: [`List powers of $${b}$ and find the two that $${big(N)}$ lies between.`, LOG_DEF],
    solution: [
      `$${b}^{${k}} = ${big(b ** k)}$ and $${b}^{${k + 1}} = ${big(b ** (k + 1))}$.`,
      `Since $${big(b ** k)} < ${big(N)} < ${big(b ** (k + 1))}$, the exponent is between $${k}$ and $${k + 1}$: $${k} < ${logb(b)} ${big(N)} < ${k + 1}$.`,
      b === 10 ? `(Check with a calculator: $\\log ${big(N)} \\approx ${fx(value, 2)}$.)` : `(Check with a calculator: $${logb(b)} ${big(N)} = \\dfrac{\\log ${big(N)}}{\\log ${b}} \\approx ${fx(value, 2)}$.)`,
    ],
  };
}

/** A logarithm with an exact value, for combined questions. */
function simpleLog(rng: Rng): { tex: string; v: number; why: string } {
  const kind = rng.pick(['pow', 'recip', 'powBase'] as const);
  if (kind === 'pow') {
    const b = rng.pick([2, 3, 4, 5, 10]);
    const n = retry(
      () => rng.int(2, 4),
      (k) => b ** k <= 10000,
    );
    return { tex: `${logb(b)} ${big(b ** n)}`, v: n, why: `$${b}^{${n}} = ${big(b ** n)}$` };
  }
  if (kind === 'recip') {
    const b = rng.pick([2, 3, 5]);
    const n = rng.int(1, 3);
    return { tex: `${logb(b)} \\frac{1}{${b ** n}}`, v: -n, why: `$${b}^{${-n}} = \\frac{1}{${b ** n}}$` };
  }
  const g = rng.pick([2, 3]);
  const m = rng.pick([2, 3]);
  const n = retry(
    () => rng.nonZero(-5, 5),
    (k) => k % m !== 0 && g ** Math.abs(k) <= 243,
  );
  const arg = n > 0 ? `${g ** n}` : `\\frac{1}{${g ** -n}}`;
  return { tex: `${logb(g ** m)} ${arg}`, v: n / m, why: `$${g ** m}^{${nn(n / m)}} = \\left(${g}^{${m}}\\right)^{${nn(n / m)}} = ${g}^{${n}} = ${arg}$` };
}

function logCombo(rng: Rng): GenOutput {
  const f1 = simpleLog(rng);
  const f2 = retry(
    () => simpleLog(rng),
    (f) => f.tex !== f1.tex,
  );
  const c1 = rng.pick([1, 1, 2, 3]);
  const op = rng.pick(['+', '-'] as const);
  const v = c1 * f1.v + (op === '+' ? f2.v : -f2.v);
  const tex = `${c1 === 1 ? '' : c1}${f1.tex} ${op} ${f2.tex}`;
  return {
    prompt: `Evaluate $${tex}$. Give an exact answer.`,
    parts: [numPart(v)],
    hints: ['Evaluate each logarithm separately, then combine.', LOG_DEF],
    solution: [
      `$${f1.tex} = ${nn(f1.v)}$ because ${f1.why}.`,
      `$${f2.tex} = ${nn(f2.v)}$ because ${f2.why}.`,
      `$${c1 === 1 ? '' : `${c1}`}${c1 === 1 ? nn(f1.v) : `\\left(${nn(f1.v)}\\right)`} ${op} ${pn(f2.v)} = ${nn(v)}$`,
    ],
  };
}

const NESTED: Array<[number, number, number]> = [
  [2, 2, 1],
  [2, 4, 2],
  [2, 8, 3],
  [2, 16, 4],
  [3, 9, 2],
  [3, 3, 1],
  [4, 2, 1 / 2],
  [4, 8, 3 / 2],
  [8, 2, 1 / 3],
  [9, 3, 1 / 2],
  [4, 16, 2],
  [8, 4, 2 / 3],
];
function logNested(rng: Rng): GenOutput {
  const [[a, e, ans], b] = retry(
    () => [rng.pick(NESTED), rng.pick([2, 3, 5, 10])] as const,
    ([[, e], b]) => b ** e <= 1000000,
  );
  const N = b ** e;
  const tex = `${logb(a)}\\left(${logb(b)} ${big(N)}\\right)`;
  return {
    prompt: `Evaluate $${tex}$. Give an exact answer.`,
    parts: [numPart(ans)],
    hints: ['Work from the inside out: evaluate the inner logarithm first.', LOG_DEF],
    solution: [`Inner: $${logb(b)} ${big(N)} = ${e}$ because $${b}^{${e}} = ${big(N)}$.`, `Outer: $${logb(a)} ${e} = ${nn(ans)}$ because $${a}^{${nn(ans)}} = ${e}$.`, `So $${tex} = ${nn(ans)}$.`],
  };
}

function logInverse(rng: Rng): GenOutput {
  const b = rng.pick([2, 3, 5, 7]);
  const c = rng.pick([2, 3, 4, 5, 10]);
  const n = rng.int(2, 9);
  const variant = rng.pick(['add', 'sub', 'square'] as const);
  if (variant === 'square') {
    const M = rng.int(2, 9);
    const tex = `${b}^{2${logb(b)} ${M}} + ${logb(c)} ${c}^{${n}}`;
    return {
      prompt: `Evaluate $${tex}$.`,
      parts: [numPart(M * M + n)],
      hints: ['$c^{\\log_{c} x} = x$ and $\\log_{c} c^{n} = n$: a power and a logarithm with the same base undo each other.', `Write $${b}^{2${logb(b)} ${M}}$ as $\\left(${b}^{${logb(b)} ${M}}\\right)^{2}$.`],
      solution: [
        `$${b}^{2${logb(b)} ${M}} = \\left(${b}^{${logb(b)} ${M}}\\right)^{2} = ${M}^{2} = ${M * M}$`,
        `$${logb(c)} ${c}^{${n}} = ${n}$`,
        `$${M * M} + ${n} = ${M * M + n}$`,
      ],
    };
  }
  const M = rng.int(2, 20);
  const op = variant === 'add' ? '+' : '-';
  const v = variant === 'add' ? M + n : M - n;
  const tex = `${b}^{${logb(b)} ${M}} ${op} ${logb(c)} ${c}^{${n}}`;
  return {
    prompt: `Evaluate $${tex}$.`,
    parts: [numPart(v)],
    hints: ['A power and a logarithm with the same base undo each other: $c^{\\log_{c} x} = x$ and $\\log_{c} c^{n} = n$.', 'Simplify each term, then combine.'],
    solution: [`$${b}^{${logb(b)} ${M}} = ${M}$`, `$${logb(c)} ${c}^{${n}} = ${n}$`, `$${M} ${op} ${n} = ${v}$`],
  };
}

function logRootPower(rng: Rng): GenOutput {
  const g = rng.pick([2, 3, 5, 10]);
  const n = rng.int(1, g === 10 ? 3 : 2);
  const s = rng.pick([1 / 2, -1 / 2, 1 / 3, 2 / 3]);
  const arg = radArg(g, n, s);
  const tex = `${logb(g)}\\left(${arg}\\right)`;
  const v = n + s;
  return {
    prompt: `Evaluate $${tex}$. Give an exact answer.`,
    parts: [numPart(v)],
    hints: [`Write the argument as a single power of $${g}$.`, `Use $${rootPow(s)}$ and add exponents when multiplying powers.`],
    solution: [`$${arg} = ${g}^{${n}} \\cdot ${g}^{${nn(s)}} = ${g}^{${nn(v)}}$`, `$${logb(g)} ${g}^{${nn(v)}} = ${nn(v)}$`],
  };
}

const logEvaluate = skill({
  id: 'm301-log-evaluate',
  name: 'Evaluating logarithms',
  description: 'Evaluate logarithms, including common logarithms, fractional and negative values, and estimate a logarithm between consecutive integers.',
  outcomes: ['RF7'],
  lessonId: 'm301-7-4',
  gen(rng, d): GenOutput {
    if (d === 1) return rng.chance(0.75) ? logBasic(rng) : logCalc(rng);
    if (d === 2) return rng.chance(0.7) ? logNegFrac(rng) : logBetween(rng);
    const kind = rng.pick(['combo', 'combo', 'nested', 'inverse', 'root'] as const);
    if (kind === 'combo') return logCombo(rng);
    if (kind === 'nested') return logNested(rng);
    return kind === 'inverse' ? logInverse(rng) : logRootPower(rng);
  },
});

/** A power b^n with its value written as a number or fraction. */
function powPair(rng: Rng, neg: boolean): { b: number; n: number; N: string; v: number } {
  const b = rng.pick([2, 3, 4, 5, 6, 7, 10]);
  const n = retry(
    () => (neg ? -rng.int(1, 3) : rng.int(2, 4)),
    (k) => b ** Math.abs(k) <= 10000 && k !== b,
  );
  const N = n >= 0 ? big(b ** n) : b === 10 ? fmt(10 ** n, 6) : `\\frac{1}{${big(b ** -n)}}`;
  return { b, n, N, v: b ** n };
}

function lfToLog(rng: Rng): GenOutput {
  const { b, n, N } = powPair(rng, rng.chance(0.35));
  const correct = `$${logb(b)} ${N} = ${n}$`;
  const distractors = [...(n >= 2 ? [`$\\log_{${n}} ${N} = ${b}$`] : [`$${logb(b)} ${N} = ${-n}$`]), `$\\log_{${N}} ${b} = ${n}$`, `$${logb(b)} ${n} = ${N}$`];
  return {
    prompt: `Write $${b}^{${n}} = ${N}$ in logarithmic form.`,
    parts: [part(mc(rng, correct, distractors))],
    hints: [LOG_DEF, 'The base of the power is the base of the logarithm, and the logarithm equals the exponent.'],
    solution: [`In $${b}^{${n}} = ${N}$, the base is $${b}$ and the exponent is $${n}$.`, `The logarithm is the exponent: $${logb(b)} ${N} = ${n}$.`],
  };
}

function lfToExp(rng: Rng): GenOutput {
  const { b, n, N } = powPair(rng, rng.chance(0.35));
  const Np = N.startsWith('\\frac') || N.includes('.') ? `\\left(${N}\\right)` : N;
  const correct = `$${b}^{${n}} = ${N}$`;
  const distractors = [...(n >= 2 ? [`$${n}^{${b}} = ${N}$`] : [`$${b}^{${-n}} = ${N}$`]), `$${Np}^{${n}} = ${b}$`, `$${b}^{${N}} = ${n}$`];
  return {
    prompt: `Write $${logb(b)} ${N} = ${n}$ in exponential form.`,
    parts: [part(mc(rng, correct, distractors))],
    hints: [LOG_DEF, b === 10 ? 'With no base written, the base is $10$.' : `The base of the logarithm, $${b}$, becomes the base of the power.`],
    solution: [`The base is $${b}$ and the logarithm (the exponent) is $${n}$.`, `$${b}^{${n}} = ${N}$`],
  };
}

function lfSolveArg(rng: Rng): GenOutput {
  const b = rng.pick([2, 3, 4, 5, 6, 10]);
  const n = retry(
    () => rng.int(1, 4),
    (k) => b ** k <= 10000,
  );
  return {
    prompt: `Solve $${logb(b)} x = ${n}$.`,
    parts: [numPart(b ** n, { label: '$x =$' })],
    hints: ['Rewrite the equation in exponential form.', LOG_DEF],
    solution: [`$${logb(b)} x = ${n}$ means $x = ${b}^{${n}}$.`, `$x = ${big(b ** n)}$`],
  };
}

function lfSolveD2(rng: Rng): GenOutput {
  const kind = rng.pick(['frac', 'base', 'common'] as const);
  if (kind === 'frac') {
    const r = rng.pick([2, 3, 5]);
    const q = rng.pick(r === 5 ? [2] : [2, 3]);
    const p = retry(
      () => rng.nonZero(-4, 4),
      (k) => k % q !== 0 && r ** Math.abs(k) <= 243,
    );
    const b = r ** q;
    const x = r ** p;
    return {
      prompt: `Solve $${logb(b)} x = ${nn(p / q)}$. Give an exact answer.`,
      parts: [numPart(x, { label: '$x =$' })],
      hints: ['Rewrite in exponential form.', `A fractional exponent is a root and a power: $a^{\\frac{m}{n}} = \\left(\\sqrt[n]{a}\\right)^{m}$.`],
      solution: [`$x = ${b}^{${nn(p / q)}}$`, `$= \\left(${q === 2 ? `\\sqrt{${b}}` : `\\sqrt[3]{${b}}`}\\right)^{${p}} = ${r}^{${p}}$`, `$x = ${nn(x)}$`],
    };
  }
  if (kind === 'base') {
    const r = rng.int(2, 6);
    const n = retry(
      () => rng.pick([2, 3, 4, -2, -3]),
      (k) => r ** Math.abs(k) <= 1296,
    );
    const N = n > 0 ? big(r ** n) : `\\frac{1}{${big(r ** -n)}}`;
    const even = Math.abs(n) % 2 === 0;
    return {
      prompt: `Solve $\\log_{x} ${N} = ${n}$.`,
      parts: [numPart(r, { label: '$x =$' })],
      hints: ['Rewrite in exponential form: $x^{n} = $ the argument.', 'The base of a logarithm must be positive and not equal to $1$.'],
      solution: [
        `$x^{${n}} = ${N}$`,
        ...(n < 0 ? [`Take reciprocals: $x^{${-n}} = ${big(r ** -n)}$.`] : []),
        `$x = ${even ? '\\pm ' : ''}${r}$${even ? `, but a base must be positive, so reject $x = -${r}$` : ''}.`,
        `$x = ${r}$`,
      ],
    };
  }
  const n = rng.pick([-3, -2, -1, 2, 3, 4, 5]);
  return {
    prompt: `Solve $\\log x = ${n}$.`,
    parts: [numPart(10 ** n, { label: '$x =$', display: 'decimal' })],
    hints: ['$\\log$ with no base written is base $10$.', 'Rewrite in exponential form.'],
    solution: [`$\\log x = ${n}$ means $x = 10^{${n}}$.`, `$x = ${fmt(10 ** n, 6)}$`],
  };
}

function lfConvertFrac(rng: Rng): GenOutput {
  const r = rng.pick([2, 3]);
  const q = rng.pick([2, 3]);
  const p = retry(
    () => rng.nonZero(-4, 4),
    (k) => k % q !== 0 && r ** Math.abs(k) <= 81,
  );
  const b = r ** q;
  const N = p > 0 ? `${r ** p}` : `\\frac{1}{${r ** -p}}`;
  const e = nn(p / q);
  const toLog = rng.chance(0.5);
  if (toLog) {
    const correct = `$\\log_{${b}} ${N} = ${e}$`;
    return {
      prompt: `Write $${b}^{${e}} = ${N}$ in logarithmic form.`,
      parts: [part(mc(rng, correct, [`$\\log_{${N}} ${b} = ${e}$`, `$\\log_{${b}} ${e} = ${N}$`, `$\\log_{${b}} ${N} = ${nn(q / p)}$`]))],
      hints: [LOG_DEF, 'The exponent, even when it is a fraction, is the value of the logarithm.'],
      solution: [`The base is $${b}$ and the exponent is $${e}$.`, correct],
    };
  }
  const Np = p > 0 ? N : `\\left(${N}\\right)`;
  const correct = `$${b}^{${e}} = ${N}$`;
  return {
    prompt: `Write $\\log_{${b}} ${N} = ${e}$ in exponential form.`,
    parts: [part(mc(rng, correct, [`$${Np}^{${e}} = ${b}$`, `$${b}^{${N}} = ${e}$`, `$${b}^{${nn(q / p)}} = ${N}$`]))],
    hints: [LOG_DEF, 'The base of the logarithm is the base of the power; the value of the logarithm is the exponent.'],
    solution: [`The base is $${b}$ and the exponent is $${e}$.`, `${correct} (check: $${b}^{${e}} = \\left(${q === 2 ? `\\sqrt{${b}}` : `\\sqrt[3]{${b}}`}\\right)^{${p}} = ${N}$)`],
  };
}

function lfSolveD3(rng: Rng): GenOutput {
  const kind = rng.pick(['linear', 'nested', 'fracBase'] as const);
  if (kind === 'linear') {
    const b = rng.pick([2, 3, 4, 5, 10]);
    const n = retry(
      () => rng.int(1, 4),
      (k) => b ** k <= 1000,
    );
    const p = rng.int(1, 4);
    const q = rng.nonZero(-9, 9);
    const x = (b ** n - q) / p;
    return {
      prompt: `Solve $${logb(b)}(${lin(p, q)}) = ${n}$. Give an exact answer.`,
      parts: [numPart(x, { label: '$x =$' })],
      hints: ['Rewrite in exponential form.', 'Then solve the linear equation.'],
      solution: [`$${lin(p, q)} = ${b}^{${n}} = ${b ** n}$`, ...(p === 1 ? [] : [`$${lin(p, 0)} = ${b ** n - q}$`]), `$x = ${nn(x)}$`],
    };
  }
  if (kind === 'nested') {
    const [a, b, k] = retry(
      () => [rng.pick([2, 3, 4]), rng.pick([2, 3, 5, 10]), rng.pick([1, 2, 1 / 2])] as const,
      ([a, b, k]) => Number.isInteger(a ** k) && b ** (a ** k) <= 100000 && a ** k >= 1,
    );
    const inner = a ** k;
    const x = b ** inner;
    return {
      prompt: `Solve $${logb(a)}\\left(${logb(b)} x\\right) = ${nn(k)}$.`,
      parts: [numPart(x, { label: '$x =$' })],
      hints: ['Work from the outside in: rewrite the outer logarithm in exponential form first.', LOG_DEF],
      solution: [`$${logb(b)} x = ${a}^{${nn(k)}} = ${inner}$`, `$x = ${b}^{${inner}} = ${big(x)}$`],
    };
  }
  const r = rng.pick([2, 3]);
  const q = rng.pick([2, 3]);
  const p = retry(
    () => rng.nonZero(-5, 5),
    (k) => k % q !== 0 && r ** Math.abs(k) <= 243,
  );
  const x = r ** q;
  const N = p > 0 ? big(r ** p) : `\\frac{1}{${big(r ** -p)}}`;
  return {
    prompt: `Solve $\\log_{x} ${N} = ${nn(p / q)}$.`,
    parts: [numPart(x, { label: '$x =$' })],
    hints: ['Rewrite in exponential form.', `Raise both sides to the reciprocal power, $${nn(q / p)}$.`],
    solution: [`$x^{${nn(p / q)}} = ${N} = ${r}^{${p}}$`, `Raise both sides to the power $${nn(q / p)}$: $x = \\left(${r}^{${p}}\\right)^{${nn(q / p)}} = ${r}^{${q}}$.`, `$x = ${x}$`],
  };
}

const logExpForm = skill({
  id: 'm301-log-exp-form',
  name: 'Logarithmic and exponential form',
  description: 'Convert between exponential and logarithmic form and use the conversion to find an unknown base, argument or value.',
  outcomes: ['RF7'],
  lessonId: 'm301-7-4',
  gen(rng, d): GenOutput {
    if (d === 1) {
      const kind = rng.pick(['toLog', 'toExp', 'solve'] as const);
      return kind === 'toLog' ? lfToLog(rng) : kind === 'toExp' ? lfToExp(rng) : lfSolveArg(rng);
    }
    if (d === 2) return rng.chance(0.7) ? lfSolveD2(rng) : lfConvertFrac(rng);
    return lfSolveD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 7.5 Transformations of logarithmic functions — m301-log-graph
// ---------------------------------------------------------------------------

const powTexOf = (c: Base, sign = 1) => `${btex(c)}^{${sign < 0 ? '-x' : 'x'}}`;

function lgInverse(rng: Rng): GenOutput {
  const c = rng.pick([B(2), B(3), B(4), B(5), B(10), B(1, 2), B(1, 3)]);
  const correct = `$y = ${logb(c)} x$`;
  const distractors = [`$y = \\log_{x} ${bsub(c)}$`, `$y = ${powTexOf(c, -1)}$`, `$y = ${logb(B(c.d, c.n))} x$`];
  return {
    prompt: `What is the inverse of $y = ${powTexOf(c)}$?`,
    parts: [part(mc(rng, correct, distractors))],
    hints: ['To find an inverse, interchange $x$ and $y$, then solve for $y$.', LOG_DEF],
    solution: [`Interchange $x$ and $y$: $x = ${btex(c)}^{y}$.`, `Write this in logarithmic form: $y = ${logb(c)} x$.`, `The inverse of $y = ${powTexOf(c)}$ is $y = ${logb(c)} x$; its graph is the reflection in the line $y = x$.`],
  };
}

function lgReadPoint(rng: Rng): GenOutput {
  const c = rng.pick([B(2), B(3), B(4), B(5), B(10), B(1, 2)]);
  const [n1, n2] = retry(
    () => rng.sample([-2, -1, 2, 3, 4], 2),
    ([p, q]) => [p, q].every((n) => {
      const f = fpow(c, n);
      return f.n <= 1000 && f.d <= 1000;
    }),
  );
  const X1 = fpow(c, n1);
  const X2 = fpow(c, n2);
  return {
    prompt: `The points $\\left(${ftex(X1)},\\ a\\right)$ and $\\left(b,\\ ${n2}\\right)$ are on the graph of $y = ${logb(c)} x$. Find $a$ and $b$.`,
    parts: [numPart(n1, { label: '$a =$' }), numPart(X2.n / X2.d, { label: '$b =$' })],
    hints: [`$a = ${logb(c)} ${ftex(X1)}$: $${bsub(c)}$ to what exponent gives $${ftex(X1)}$?`, `For $b$, write $${logb(c)} b = ${n2}$ in exponential form.`],
    solution: [`$a = ${logb(c)} ${ftex(X1)} = ${n1}$ because $${btex(c)}^{${n1}} = ${ftex(X1)}$.`, `$${logb(c)} b = ${n2}$ means $b = ${btex(c)}^{${n2}} = ${ftex(X2)}$.`, `$a = ${n1}$ and $b = ${ftex(X2)}$`],
  };
}

function lgAsymptote(rng: Rng): GenOutput {
  const c = rng.pick([B(2), B(3), B(4), B(5), B(10)]);
  const L: LogFn = { a: 1, c, b: 1, h: rng.nonZero(-6, 6), k: rng.int(-5, 5) };
  const useC = rng.chance(0.5);
  const [x0, y0] = useC ? [bval(c), 1] : [1, 0];
  return {
    prompt: `For $y = ${logTex(L)}$, state the equation of the vertical asymptote and find the image of the point $(${x0},\\ ${y0})$ on $y = ${logb(c)} x$.`,
    parts: [numPart(L.h, { label: 'Asymptote: $x =$' }), part({ kind: 'point', x: x0 + L.h, y: y0 + L.k }, { label: 'Image point' })],
    hints: ['The asymptote $x = 0$ of $y = \\log_{c} x$ moves left or right with the horizontal translation.', `The graph is translated by $(x, y) \\to (x + h,\\ y + k)$ with $h = ${L.h}$ and $k = ${L.k}$.`],
    solution: [
      `Compare with $y = ${logb(c)}(x - h) + k$: $h = ${L.h}$ and $k = ${L.k}$.`,
      `The vertical asymptote $x = 0$ moves ${units(L.h)} ${L.h > 0 ? 'right' : 'left'}: $x = ${L.h}$.`,
      `$(${x0},\\ ${y0}) \\to (${x0} + ${pn(L.h)},\\ ${y0} + ${pn(L.k)}) = (${x0 + L.h},\\ ${y0 + L.k})$`,
    ],
  };
}

function lgDomain(rng: Rng): GenOutput {
  const L: LogFn = { a: rng.pick([1, -1, 2, -2, 3, 1 / 2]), c: rng.pick([B(2), B(3), B(5), B(10), B(1, 2)]), b: rng.pick([1, 1, -1, 2, -2]), h: rng.int(-6, 6), k: rng.int(-5, 5) };
  const right = L.b > 0 ? setv('x', '>', L.h) : setv('x', '<', L.h);
  const correct = dr(right, R_ALL);
  const distractors = rng.shuffle([
    dr(L.b > 0 ? setv('x', '<', L.h) : setv('x', '>', L.h), R_ALL),
    dr(setv('x', L.b > 0 ? '>' : '<', -L.h), R_ALL),
    dr(right, setv('y', '>', L.k)),
    dr(L.b > 0 ? setv('x', '\\ge', L.h) : setv('x', '\\le', L.h), R_ALL),
  ]);
  return {
    prompt: `State the domain and range of $y = ${logTex(L)}$.`,
    parts: [part(mc(rng, correct, distractors))],
    hints: ['You can only take the logarithm of a positive number: set the argument greater than $0$.', 'Every logarithmic function of this form takes every real $y$-value.'],
    solution: [
      `The argument must be positive: $${argTex(L.b, L.h)} > 0$.`,
      L.b === 1 ? `So $x > ${L.h}$.` : L.b > 0 ? `Divide by $${nn(L.b)}$: $${innerTex(L.h)} > 0$, so $x > ${L.h}$.` : `Divide by $${nn(L.b)}$ (negative, so reverse the inequality): $${innerTex(L.h)} < 0$, so $x < ${L.h}$.`,
      `The vertical asymptote is $x = ${L.h}$. Stretches and vertical translations do not limit the $y$-values, so the range is all real numbers.`,
      `${correct}`,
    ],
  };
}

function lgImagePoint(rng: Rng): GenOutput {
  const L = retry(
    (): LogFn => ({ a: rng.pick([2, 3, -1, -2, 1 / 2]), c: rng.pick([B(2), B(3), B(4), B(10)]), b: rng.pick([1, -1, 2, 1 / 2, -2]), h: rng.int(-5, 5), k: rng.int(-5, 5) }),
    (L) => L.b !== 1 || Math.abs(L.a) !== 1,
  );
  const n = rng.pick(L.a === 1 / 2 ? [0, 2, -2] : [0, 1, 2, -1]);
  const xf = fpow(L.c, n);
  const x0 = xf.n / xf.d;
  const X = x0 / L.b + L.h;
  const Y = L.a * n + L.k;
  return {
    prompt: `The point $\\left(${ftex(xf)},\\ ${n}\\right)$ is on the graph of $y = ${logb(L.c)} x$. Find its image on the graph of $y = ${logTex(L)}$.`,
    parts: [part({ kind: 'point', x: X + 0, y: Y + 0 }, { label: 'Image point' })],
    hints: ['Compare with $y = a\\log_{c}(b(x - h)) + k$.', `Use the mapping $${mapRule}$.`],
    solution: [
      `Here $a = ${nn(L.a)}$, $b = ${nn(L.b)}$, $h = ${L.h}$ and $k = ${L.k}$.`,
      `Mapping: $${mapRule}$.`,
      `$x$: $${Number.isInteger(L.b) ? `\\dfrac{${ftex(xf)}}{${L.b}}` : `${ftex(xf)} \\div ${pn(L.b)}`} + ${pn(L.h)} = ${nn(X)}$; $y$: $${pn(L.a)}(${n}) + ${pn(L.k)} = ${nn(Y)}$.`,
      `The image point is $(${nn(X)},\\ ${nn(Y)})$.`,
    ],
  };
}

function lgXIntSimple(rng: Rng): GenOutput {
  const L = retry(
    (): LogFn => ({ a: 1, c: rng.pick([B(2), B(3), B(4), B(5), B(10)]), b: 1, h: rng.int(-5, 5), k: rng.nonZero(-3, 3) }),
    (L) => bval(L.c) ** Math.abs(L.k) <= 125,
  );
  const v = fpow(L.c, -L.k);
  const x = L.h + v.n / v.d;
  return {
    prompt: `Find the $x$-intercept of $y = ${logTex(L)}$. Give an exact answer.`,
    parts: [numPart(x, { label: '$x$-intercept:' })],
    hints: ['Set $y = 0$ and isolate the logarithm.', 'Rewrite in exponential form, then solve for $x$.'],
    solution: [
      `$0 = ${logTex(L)}$`,
      `$${logb(L.c)}(${innerTex(L.h)}) = ${-L.k}$`,
      `$${innerTex(L.h)} = ${bsub(L.c)}^{${-L.k}} = ${ftex(v)}$`,
      `$x = ${nn(x)}$`,
    ],
  };
}

function lgMatch(rng: Rng): GenOutput {
  const g: GridSpec = { xMin: -6, xMax: 8, yMin: -6, yMax: 6 };
  const L: LogFn = { a: rng.pick([1, -1, 2]), c: rng.pick([B(2), B(3)]), b: 1, h: rng.nonZero(-3, 3), k: rng.nonZero(-3, 3) };
  const opts = [
    { md: '', figure: logFig(L, g), correct: true },
    { md: '', figure: logFig({ ...L, h: -L.h }, g) },
    { md: '', figure: logFig({ ...L, k: -L.k }, g) },
    { md: '', figure: logFig({ ...L, a: -L.a }, g) },
  ];
  return {
    prompt: `Which graph shows $y = ${logTex(L)}$? The dashed line on each graph is its vertical asymptote.`,
    parts: [part(mcFigures(rng, opts))],
    hints: [`The vertical asymptote is $x = ${L.h}$.`, `When $x - ${pn(L.h)} = 1$, the logarithm is $0$, so the graph passes through $(${L.h + 1},\\ ${L.k})$.`],
    solution: [
      `The vertical asymptote is $x = ${L.h}$, and the domain is $x > ${L.h}$.`,
      `At $x = ${L.h + 1}$: $y = ${lead(L.a)}${logb(L.c)} 1${sgn(L.k)} = ${L.k}$, so the graph passes through $(${L.h + 1},\\ ${L.k})$.`,
      `$a = ${nn(L.a)}$ is ${L.a > 0 ? 'positive, so the graph rises from left to right' : 'negative, so the graph is reflected in the $x$-axis and falls from left to right'}.`,
      'The correct graph has that asymptote, passes through that point and has that direction.',
    ],
  };
}

function lgXIntFull(rng: Rng): GenOutput {
  const o = retry(
    () => {
      const a = rng.pick([2, 3, -1, -2, 1 / 2]);
      const e = rng.pick([-2, -1, 1, 2, 3]);
      return { a, e, c: rng.pick([B(2), B(3), B(5)]), b: rng.pick([1, 2, -1, 3, -2]), h: rng.int(-4, 4) };
    },
    ({ a, e, c, b }) => Number.isInteger(-a * e) && bval(c) ** Math.abs(e) <= 125 && (a !== 1 || b !== 1) && (toFrac(bval(c) ** e / b, 500)?.d ?? 1000) <= 250,
  );
  const L: LogFn = { a: o.a, c: o.c, b: o.b, h: o.h, k: -o.a * o.e + 0 };
  const ce = fpow(L.c, o.e);
  const x = L.h + ce.n / ce.d / L.b;
  return {
    prompt: `Find the $x$-intercept of $y = ${logTex(L)}$. Give an exact answer.`,
    parts: [numPart(x, { label: '$x$-intercept:' })],
    hints: ['Set $y = 0$ and isolate the logarithm.', 'Rewrite in exponential form, then solve the linear equation.'],
    solution: [
      `$0 = ${logTex(L)}$`,
      `$${lead(L.a)}${logb(L.c)}(${argTex(L.b, L.h)}) = ${-L.k}$, so $${logb(L.c)}(${argTex(L.b, L.h)}) = ${o.e}$.`,
      `$${argTex(L.b, L.h)} = ${bsub(L.c)}^{${o.e}} = ${ftex(ce)}$`,
      L.b === 1 ? `$x = ${ftex(ce)} + ${pn(L.h)} = ${nn(x)}$` : `$${innerTex(L.h)} = ${ftex(ce)} \\div ${pn(L.b)} = ${nn((ce.n / ce.d) / L.b)}$${L.h === 0 ? '' : `, so $x = ${nn(x)}$`}.`,
    ],
  };
}

function lgInverseTr(rng: Rng): GenOutput {
  const c = rng.pick([B(2), B(3), B(5), B(10)]);
  const h = rng.nonZero(-5, 5);
  const k = rng.nonZero(-5, 5);
  const E = (hh: number, kk: number) => `$y = ${expTex({ a: 1, c, b: 1, h: hh, k: kk })}$`;
  const Lg = (hh: number, kk: number) => `$y = ${logTex({ a: 1, c, b: 1, h: hh, k: kk })}$`;
  if (rng.chance(0.5)) {
    return {
      prompt: `Find the inverse of $y = ${expTex({ a: 1, c, b: 1, h, k })}$.`,
      parts: [part(mc(rng, Lg(k, h), [Lg(h, k), Lg(-k, -h), Lg(k, -h)]))],
      hints: ['Interchange $x$ and $y$, then isolate the power.', 'Rewrite the power in logarithmic form and solve for $y$.'],
      solution: [
        `Interchange $x$ and $y$: $x = ${btex(c)}^{${innerTex(h, 'y')}}${sgn(k)}$.`,
        `Isolate the power: $${innerTex(k)} = ${btex(c)}^{${innerTex(h, 'y')}}$.`,
        `Logarithmic form: $${innerTex(h, 'y')} = ${logb(c)}(${innerTex(k)})$.`,
        `${Lg(k, h)}`,
      ],
    };
  }
  return {
    prompt: `Find the inverse of $y = ${logTex({ a: 1, c, b: 1, h, k })}$.`,
    parts: [part(mc(rng, E(k, h), [E(h, k), E(-k, -h), E(k, -h)]))],
    hints: ['Interchange $x$ and $y$, then isolate the logarithm.', 'Rewrite in exponential form and solve for $y$.'],
    solution: [
      `Interchange $x$ and $y$: $x = ${logb(c)}(${innerTex(h, 'y')})${sgn(k)}$.`,
      `Isolate the logarithm: $${innerTex(k)} = ${logb(c)}(${innerTex(h, 'y')})$.`,
      `Exponential form: $${innerTex(h, 'y')} = ${btex(c)}^{${innerTex(k)}}$.`,
      `${E(k, h)}`,
    ],
  };
}

function lgDomainLinear(rng: Rng): GenOutput {
  const c = rng.pick([B(2), B(3), B(5), B(10)]);
  const p = rng.pick([1, 2, 3, 4, -1, -2, -3]);
  const q = retry(
    () => rng.nonZero(-9, 9),
    (v) => v % p !== 0 || rng.chance(0.5),
  );
  const x0 = -q / p;
  const constFirst = p < 0 || rng.chance(0.3);
  const arg = constFirst ? `${q} ${p > 0 ? '+' : '-'} ${Math.abs(p) === 1 ? '' : Math.abs(p)}x` : lin(p, q);
  const k = rng.int(-4, 4);
  const op = p > 0 ? '>' : '<';
  const correct = `$${setv('x', op, x0)}$`;
  const distractors = [`$${setv('x', p > 0 ? '<' : '>', x0)}$`, `$${setv('x', op, -x0)}$`, `$${setv('x', op, q)}$`, `$${setv('x', p > 0 ? '<' : '>', -x0)}$`];
  return {
    prompt: `What is the domain of $y = ${logb(c)}(${arg})${sgn(k)}$?`,
    parts: [part(mc(rng, correct, rng.shuffle(distractors)))],
    hints: ['The argument of a logarithm must be positive.', `Solve $${arg} > 0$. If you divide by a negative number, reverse the inequality.`],
    solution: [
      `Solve $${arg} > 0$.`,
      p > 0 ? `$${lin(p, 0)} > ${-q}$, so $x > ${nn(x0)}$.` : `$${lin(p, 0)} > ${-q}$. Divide by $${p}$ and reverse the inequality: $x < ${nn(x0)}$.`,
      `Domain: $${setv('x', op, x0)}$`,
    ],
  };
}

function lgFromGraph(rng: Rng): GenOutput {
  const g: GridSpec = { xMin: -6, xMax: 10, yMin: -6, yMax: 6 };
  const L = retry(
    (): LogFn => ({ a: 1, c: rng.pick([B(2), B(3)]), b: 1, h: rng.nonZero(-4, 3), k: rng.nonZero(-3, 3) }),
    (L) => inGrid(g, L.h + (bval(L.c) === 2 ? 4 : 3), L.k + (bval(L.c) === 2 ? 2 : 1), 1),
  );
  const cv = bval(L.c);
  const m = cv === 2 ? 2 : 1;
  const pts: Pt[] = [
    [L.h + 1, L.k],
    [L.h + cv ** m, L.k + m],
  ];
  const other = B(cv === 2 ? 3 : 2);
  const eq = (M: LogFn) => `$y = ${logTex(M)}$`;
  return {
    prompt: 'Which equation matches the graph? The dashed line is the vertical asymptote.',
    figure: logFig(L, g, pts.map(([x, y]) => ({ x, y, label: ptLabel(x, y) }))),
    parts: [part(mc(rng, eq(L), [eq({ ...L, h: -L.h }), eq({ ...L, k: -L.k }), eq({ ...L, c: other })]))],
    hints: ['The vertical asymptote gives $h$. On $y = \\log_{c}(x - h) + k$, the point where $x - h = 1$ has $y = k$.', 'Use the second labelled point to find the base: how far is it to the right of the asymptote, and how far above $y = k$?'],
    solution: [
      `The asymptote is $x = ${L.h}$, so $h = ${L.h}$.`,
      `At $x = ${L.h + 1}$ (one unit right of the asymptote), $y = ${L.k}$, so $k = ${L.k}$.`,
      `The point $${ptTex(pts[1][0], pts[1][1])}$ has $x - h = ${cv ** m}$ and $y - k = ${m}$, so $\\log_{c} ${cv ** m} = ${m}$ and $c^{${m}} = ${cv ** m}$: the base is $${cv}$.`,
      eq(L),
    ],
  };
}

const logGraph = skill({
  id: 'm301-log-graph',
  name: 'Graphs of logarithmic functions',
  description: 'Relate y = log_c x to y = c^x and apply y = a log_c(b(x - h)) + k: asymptote, domain and range, image points, intercepts, inverses and graphs.',
  outcomes: ['RF9'],
  lessonId: 'm301-7-5',
  gen(rng, d): GenOutput {
    if (d === 1) {
      const kind = rng.pick(['inverse', 'read', 'asymptote'] as const);
      return kind === 'inverse' ? lgInverse(rng) : kind === 'read' ? lgReadPoint(rng) : lgAsymptote(rng);
    }
    if (d === 2) {
      const kind = rng.pick(['domain', 'image', 'xint', 'match'] as const);
      return kind === 'domain' ? lgDomain(rng) : kind === 'image' ? lgImagePoint(rng) : kind === 'xint' ? lgXIntSimple(rng) : lgMatch(rng);
    }
    const kind = rng.pick(['xint', 'inverse', 'domain', 'graph'] as const);
    if (kind === 'xint') return lgXIntFull(rng);
    if (kind === 'inverse') return lgInverseTr(rng);
    return kind === 'domain' ? lgDomainLinear(rng) : lgFromGraph(rng);
  },
});

// ---------------------------------------------------------------------------
// 7.6 Laws of logarithms — m301-log-laws
// ---------------------------------------------------------------------------

const LAWS = 'Product law: $\\log_{c} MN = \\log_{c} M + \\log_{c} N$. Quotient law: $\\log_{c} \\frac{M}{N} = \\log_{c} M - \\log_{c} N$. Power law: $\\log_{c} M^{P} = P\\log_{c} M$.';
const isPowOf = (n: number, b: number) => {
  if (n < 1 || !Number.isInteger(n)) return false;
  let m = n;
  while (m % b === 0) m /= b;
  return m === 1;
};
const PROD: Array<[number, number, number, number]> = [
  [6, 4, 9, 2], [6, 2, 18, 2], [6, 3, 12, 2], [6, 12, 18, 3], [6, 4, 54, 3],
  [10, 4, 25, 2], [10, 2, 50, 2], [10, 5, 20, 2], [10, 8, 125, 3], [10, 25, 40, 3], [10, 20, 50, 3], [10, 4, 250, 3], [10, 2, 5, 1],
  [12, 8, 18, 2], [12, 16, 9, 2], [12, 3, 48, 2], [15, 9, 25, 2], [15, 5, 45, 2], [15, 3, 75, 2], [14, 7, 28, 2], [14, 2, 98, 2],
];

function llEvalSimple(rng: Rng): GenOutput {
  if (rng.chance(0.55)) {
    const b = rng.pick([2, 3, 4, 5, 6]);
    const n = retry(
      () => rng.int(1, 3),
      (k) => b ** k <= 125,
    );
    const N = rng.pick([3, 5, 6, 7, 10, 11, 12, 14, 15].filter((v) => !isPowOf(v, b) && v !== b));
    const M = b ** n * N;
    const tex = `${logb(b)} ${M} - ${logb(b)} ${N}`;
    return {
      prompt: `Evaluate $${tex}$.`,
      parts: [numPart(n)],
      hints: ['Neither logarithm is a whole number on its own. Combine them first.', 'Quotient law: $\\log_{c} M - \\log_{c} N = \\log_{c} \\dfrac{M}{N}$.'],
      solution: [`Quotient law: $${tex} = ${logb(b)} \\dfrac{${M}}{${N}}$`, `$= ${logb(b)} ${b ** n}$`, `$= ${n}$ because $${b}^{${n}} = ${b ** n}$.`],
    };
  }
  const [b, m1, m2, n] = rng.pick(PROD);
  const [M, N] = rng.chance(0.5) ? [m1, m2] : [m2, m1];
  const tex = `${logb(b)} ${M} + ${logb(b)} ${N}`;
  return {
    prompt: `Evaluate $${tex}$.`,
    parts: [numPart(n)],
    hints: ['Neither logarithm is a whole number on its own. Combine them first.', 'Product law: $\\log_{c} M + \\log_{c} N = \\log_{c} MN$.'],
    solution: [`Product law: $${tex} = ${logb(b)}(${M} \\times ${N})$`, `$= ${logb(b)} ${big(M * N)}$`, `$= ${n}$ because $${b}^{${n}} = ${big(M * N)}$.`],
  };
}

function llEvalPower(rng: Rng): GenOutput {
  const o = retry(
    () => {
      const b = rng.pick([2, 3, 5, 6, 10]);
      const k = rng.pick([2, 3, 1 / 2]);
      const M = k === 1 / 2 ? rng.pick([4, 9, 16, 25, 36, 64, 100, 144]) : rng.int(2, 12);
      const Mk = Math.round(M ** k);
      const n = rng.int(1, 3);
      const op = rng.pick(['+', '-'] as const);
      const N = op === '+' ? b ** n / Mk : Mk / b ** n;
      return { b, k, M, Mk, n, op, N };
    },
    ({ b, M, Mk, N }) => Number.isInteger(N) && N > 1 && N <= 1000 && !isPowOf(N, b) && !isPowOf(M, b) && !isPowOf(Mk, b),
    200,
  );
  const { b, k, M, Mk, n, op, N } = o;
  const kt = k === 1 / 2 ? '\\frac{1}{2}' : `${k}`;
  const tex = `${kt}${logb(b)} ${M} ${op} ${logb(b)} ${N}`;
  return {
    prompt: `Evaluate $${tex}$.`,
    parts: [numPart(n)],
    hints: ['Use the power law first to move the coefficient into the argument: $P\\log_{c} M = \\log_{c} M^{P}$.', op === '+' ? 'Then use the product law.' : 'Then use the quotient law.'],
    solution: [
      `Power law: $${kt}${logb(b)} ${M} = ${logb(b)} ${M}^{${kt}} = ${logb(b)} ${Mk}$.`,
      op === '+' ? `Product law: $${logb(b)} ${Mk} + ${logb(b)} ${N} = ${logb(b)}(${Mk} \\times ${N}) = ${logb(b)} ${big(Mk * N)}$` : `Quotient law: $${logb(b)} ${Mk} - ${logb(b)} ${N} = ${logb(b)} \\dfrac{${Mk}}{${N}} = ${logb(b)} ${b ** n}$`,
      `$= ${n}$ because $${b}^{${n}} = ${big(b ** n)}$.`,
    ],
  };
}

interface Fac {
  v: string;
  e: number;
  num: boolean;
}
const facTex = (f: Fac) => (f.e === 1 ? f.v : f.e === 1 / 2 ? `\\sqrt{${f.v}}` : `${f.v}^{${f.e}}`);
function argOf(facs: Fac[], root: number): string {
  const top = facs.filter((f) => f.num).map(facTex).join('') || '1';
  const bot = facs.filter((f) => !f.num).map(facTex).join('');
  const inner = bot ? `\\dfrac{${top}}{${bot}}` : top;
  return root === 2 ? `\\sqrt{${inner}}` : root === 3 ? `\\sqrt[3]{${inner}}` : bot || root > 1 ? inner : `(${inner})`;
}
function sumTex(L: string, terms: Array<{ v: string; c: number }>, joinProd = false): string {
  return terms
    .map((t, i) => {
      const a = Math.abs(t.c);
      const body = `${a === 1 ? '' : nn(a)}${L} ${t.v}`;
      if (i === 0) return `${t.c < 0 ? '-' : ''}${body}`;
      if (joinProd && t.c > 0) return ` \\cdot ${body}`;
      return ` ${t.c < 0 ? '-' : '+'} ${body}`;
    })
    .join('');
}

function llExpand(rng: Rng): GenOutput {
  const c = rng.pick([B(2), B(3), B(5), B(10), B(7)]);
  const L = logb(c);
  const n = rng.pick([2, 3, 3]);
  const vars = rng.pick([['x', 'y', 'z'], ['u', 'v', 'w'], ['m', 'n', 'p']]).slice(0, n);
  const root = rng.pick([1, 1, 1, 2, 3]);
  const facs: Fac[] = vars.map((v, i) => ({ v, e: rng.pick([1, 2, 3, 4, 5]), num: n === 2 ? i === 0 : i < 2 }));
  if (root === 1 && rng.chance(0.4)) facs[1].e = 1 / 2;
  if (facs.every((f) => f.e === 1)) facs[0].e = rng.pick([2, 3, 4]);
  const terms = facs.map((f) => ({ v: f.v, c: ((f.num ? 1 : -1) * f.e) / root }));
  const correct = `$${sumTex(L, terms)}$`;
  const ds = [
    `$${sumTex(L, terms.map((t) => ({ v: t.v, c: Math.sign(t.c) })))}$`,
    `$${sumTex(L, terms.map((t) => ({ v: t.v, c: Math.abs(t.c) })))}$`,
    `$${sumTex(L, terms, true)}$`,
    ...(root > 1 ? [`$${sumTex(L, terms.map((t) => ({ v: t.v, c: t.c * root })))}$`, `$${sumTex(L, terms.map((t) => ({ v: t.v, c: t.c * root * root })))}$`] : []),
    ...(facs.some((f) => f.e === 1 / 2) ? [`$${sumTex(L, terms.map((t) => ({ v: t.v, c: Math.abs(t.c) === 1 / 2 ? Math.sign(t.c) * 2 : t.c })))}$`] : []),
  ];
  const arg = argOf(facs, root);
  return {
    prompt: `Which is the expanded form of $${L} ${arg}$? Assume all variables are positive.`,
    parts: [part(mc(rng, correct, rng.shuffle(ds)))],
    hints: [LAWS, root > 1 ? `Write the root as a power first: $\\sqrt${root === 3 ? '[3]' : ''}{A} = A^{\\frac{1}{${root}}}$.` : 'Factors in the numerator are added, factors in the denominator are subtracted, and exponents become coefficients.'],
    solution: [
      ...(root > 1 ? [`Write the root as a power: $${L} ${arg} = \\dfrac{1}{${root}}${L} ${argOf(facs, 1)}$.`] : []),
      `Product and quotient laws: ${facs.map((f) => `$${f.num ? '+' : '-'}${L} ${facTex(f)}$`).join(', ')}.`,
      `Power law: each exponent becomes a coefficient${root > 1 ? `, then multiply every term by $\\frac{1}{${root}}$` : ''}.`,
      correct,
    ],
  };
}

function llCondense(rng: Rng): GenOutput {
  const c = rng.pick([B(2), B(3), B(5), B(10), B(6)]);
  const L = logb(c);
  const vars = rng.pick([['x', 'y', 'z'], ['u', 'v', 'w'], ['m', 'n', 'p']]);
  const n = rng.pick([2, 3]);
  const facs: Fac[] = vars.slice(0, n).map((v, i) => ({ v, e: rng.pick([1, 2, 3, 4]), num: i < n - 1 }));
  if (rng.chance(0.35)) facs[0].e = 1 / 2;
  if (facs.every((f) => f.e === 1)) facs[n - 1].e = rng.pick([2, 3]);
  const terms = facs.map((f) => ({ v: f.v, c: (f.num ? 1 : -1) * f.e }));
  const expr = sumTex(L, terms);
  const correct = `$${L} ${argOf(facs, 1)}$`;
  const all = facs.map((f) => facTex(f)).join('');
  const top = facs.filter((f) => f.num).map(facTex).join('');
  const bot = facs.filter((f) => !f.num).map(facTex).join('');
  const coefArg = (f: Fac) => (f.e === 1 ? f.v : f.e === 1 / 2 ? `\\frac{1}{2}${f.v}` : `${f.e}${f.v}`);
  const ds = [
    `$${L}(${all})$`,
    `$\\dfrac{${L} ${top.length > 1 && facs.filter((f) => f.num).length > 1 ? `(${top})` : top}}{${L} ${bot}}$`,
    `$${L} \\dfrac{${facs.filter((f) => f.num).map(coefArg).join(' \\cdot ')}}{${facs.filter((f) => !f.num).map(coefArg).join('')}}$`,
    `$${L}\\left(${facs.map((f, i) => `${i === 0 ? '' : f.num ? ' + ' : ' - '}${facTex(f)}`).join('')}\\right)$`,
  ];
  return {
    prompt: `Write $${expr}$ as a single logarithm. Assume all variables are positive.`,
    parts: [part(mc(rng, correct, rng.shuffle(ds)))],
    hints: [LAWS, 'Use the power law first to move each coefficient into an exponent, then combine with the product and quotient laws.'],
    solution: [
      `Power law: ${listWords(facs.filter((f) => f.e !== 1).map((f) => `$${nn(f.e)}${L} ${f.v} = ${L} ${facTex(f)}$`))}.`,
      `Product law for the added terms, quotient law for the subtracted term: $${L} ${top} - ${L} ${bot} = ${L} ${argOf(facs, 1)}$.`,
      correct,
    ],
  };
}

function llChangeBase(rng: Rng): GenOutput {
  const decimals = rng.pick([2, 3]);
  const [b, N] = retry(
    () => [rng.pick([2, 3, 4, 5, 6, 7, 8]), rng.int(3, 500)] as const,
    ([b, N]) => !isPowOf(N, b) && N !== b && safeRound(Math.log(N) / Math.log(b), decimals),
  );
  const v = Math.log(N) / Math.log(b);
  return {
    prompt: `Use the change of base formula to evaluate $${logb(b)} ${N}$, ${roundingPhrase(decimals)}.`,
    parts: [numPart(v, { decimals })],
    hints: ['Change of base: $\\log_{c} x = \\dfrac{\\log x}{\\log c}$.', `Calculate $\\dfrac{\\log ${N}}{\\log ${b}}$.`],
    solution: [`$${logb(b)} ${N} = \\dfrac{\\log ${N}}{\\log ${b}}$`, `$\\approx \\dfrac{${fx(lg(N), 4)}}{${fx(lg(b), 4)}} \\approx ${fx(v, decimals)}$`, `Check: $${b}^{${fx(v, decimals)}} \\approx ${N}$.`],
    calculator: true,
  };
}

/** p, q terms like "2p - q + 1". */
function pqStr(i: number, j: number, k: number): string {
  const parts: string[] = [];
  const add = (c: number, v: string) => {
    if (c === 0) return;
    const a = Math.abs(c);
    const t = v ? `${a === 1 ? '' : a}${v}` : `${a}`;
    parts.push(parts.length === 0 ? `${c < 0 ? '-' : ''}${t}` : `${c < 0 ? ' - ' : ' + '}${t}`);
  };
  add(i, 'p');
  add(j, 'q');
  add(k, '');
  return parts.join('') || '0';
}

function llInTerms(rng: Rng): GenOutput {
  const base = rng.pick([5, 7, 10]);
  const L = logb(base);
  const o = retry(
    () => ({ i: rng.int(-3, 3), j: rng.int(-2, 3), k: rng.pick([0, 0, 1, 2, -1]), r: rng.pick([1, 1, 1, 2]) }),
    ({ i, j, k, r }) => {
      const num = 2 ** Math.max(i, 0) * 3 ** Math.max(j, 0) * base ** Math.max(k, 0);
      const den = 2 ** Math.max(-i, 0) * 3 ** Math.max(-j, 0) * base ** Math.max(-k, 0);
      const terms = [i, j, k].filter((t) => t !== 0).length;
      const size = Math.abs(i) + Math.abs(j) + Math.abs(k);
      return num <= 2000 && den <= 2000 && terms >= 2 && (i !== 0 || j !== 0) && size >= 3 && !(r === 2 && size > 4);
    },
  );
  const { i, j, k, r } = o;
  const value = (2 ** i * 3 ** j * base ** k);
  const Ntex = nn(value);
  const arg = r === 2 ? `\\sqrt{${Ntex}}` : Ntex;
  const inner = pqStr(i, j, k);
  const expected = r === 2 ? `(${inner})/2` : inner;
  const factor = [i ? `2^{${i}}` : '', j ? `3^{${j}}` : '', k ? `${base}^{${k}}` : ''].filter(Boolean).join(' \\times ');
  const ans = r === 2 ? `\\dfrac{${inner}}{2}` : inner;
  return {
    prompt: `Given $${L} 2 = p$ and $${L} 3 = q$, write $${L} ${arg}$ in terms of $p$ and $q$.`,
    parts: [part({ kind: 'expression', expected }, { label: `$${L} ${arg} =$`, placeholder: 'e.g. 2p + q' })],
    hints: [`Write $${Ntex}$ as a product of powers of $2$, $3$${k ? ` and $${base}$` : ''}.`, `Then use the laws of logarithms${k ? `, and $${L} ${base} = 1$` : ''}.`],
    solution: [
      `$${Ntex} = ${factor}$`,
      ...(r === 2 ? [`$${L} \\sqrt{${Ntex}} = \\dfrac{1}{2}${L} ${Ntex}$ (power law)`] : []),
      `$${L} ${Ntex} = ${[i ? `${i === 1 ? '' : i === -1 ? '-' : i}${L} 2` : '', j ? `${j === 1 ? '' : j === -1 ? '-' : j}${L} 3` : '', k ? `${k === 1 ? '' : k === -1 ? '-' : k}${L} ${base}` : ''].filter(Boolean).join(' + ').replace(/\+ -/g, '- ')}$`,
      `$= ${inner}$${k ? ` since $${L} ${base} = 1$` : ''}.`,
      `$${L} ${arg} = ${ans}$`,
    ],
  };
}

function llEvalMixed(rng: Rng): GenOutput {
  const o = retry(
    () => {
      const b = rng.pick([2, 3, 5, 6]);
      const k = rng.pick([2, 3]);
      const M = rng.int(2, 6);
      const P = rng.pick([2, 3, 5, 6, 7, 10]);
      const n = rng.int(1, 3);
      const N = (b ** n * P) / M ** k;
      return { b, k, M, P, n, N };
    },
    ({ b, M, P, N }) => Number.isInteger(N) && N > 1 && N <= 500 && !isPowOf(M, b) && !isPowOf(P, b) && !isPowOf(N, b) && N !== P,
    300,
  );
  const { b, k, M, P, n, N } = o;
  const Mk = M ** k;
  const tex = `${k}${logb(b)} ${M} + ${logb(b)} ${N} - ${logb(b)} ${P}`;
  return {
    prompt: `Evaluate $${tex}$.`,
    parts: [numPart(n)],
    hints: ['Power law first, then combine everything into one logarithm.', 'Added logarithms multiply inside the logarithm; subtracted ones divide.'],
    solution: [
      `Power law: $${k}${logb(b)} ${M} = ${logb(b)} ${Mk}$.`,
      `$${logb(b)} ${Mk} + ${logb(b)} ${N} - ${logb(b)} ${P} = ${logb(b)} \\dfrac{${Mk} \\times ${N}}{${P}} = ${logb(b)} ${big(b ** n)}$`,
      `$= ${n}$`,
    ],
  };
}

function llChain(rng: Rng): GenOutput {
  const a = rng.pick([2, 3, 5]);
  const c = rng.pick([6, 7, 11, 13, 15].filter((v) => !isPowOf(v, a)));
  const n = retry(
    () => rng.nonZero(-3, 5),
    (k) => a ** Math.abs(k) <= 625 && k !== 1,
  );
  const N = n > 0 ? big(a ** n) : `\\frac{1}{${a ** -n}}`;
  const tex = `${logb(a)} ${c} \\cdot ${logb(c)} ${N}`;
  return {
    prompt: `Evaluate $${tex}$ without a calculator.`,
    parts: [numPart(n)],
    hints: ['Use the change of base formula on both factors: $\\log_{c} x = \\dfrac{\\log x}{\\log c}$.', 'Something cancels.'],
    solution: [
      `$${tex} = \\dfrac{\\log ${c}}{\\log ${a}} \\cdot \\dfrac{\\log ${N}}{\\log ${c}}$`,
      `$\\log ${c}$ cancels: $= \\dfrac{\\log ${N}}{\\log ${a}} = ${logb(a)} ${N}$`,
      `$= ${n}$ because $${a}^{${n}} = ${N}$.`,
    ],
  };
}

const logLaws = skill({
  id: 'm301-log-laws',
  name: 'Laws of logarithms',
  description: 'Use the product, quotient and power laws (and the change of base formula) to evaluate, expand and condense logarithmic expressions.',
  outcomes: ['RF8'],
  lessonId: 'm301-7-6',
  gen(rng, d): GenOutput {
    if (d === 1) return llEvalSimple(rng);
    if (d === 2) {
      const kind = rng.pick(['power', 'expand', 'condense', 'change'] as const);
      if (kind === 'power') return llEvalPower(rng);
      if (kind === 'expand') return llExpand(rng);
      return kind === 'condense' ? llCondense(rng) : llChangeBase(rng);
    }
    const kind = rng.pick(['terms', 'terms', 'mixed', 'chain'] as const);
    return kind === 'terms' ? llInTerms(rng) : kind === 'mixed' ? llEvalMixed(rng) : llChain(rng);
  },
});

const ALL_SOL = ' Enter every solution, or "none" if there is no solution.';

// ---------------------------------------------------------------------------
// 7.7 Logarithmic and exponential equations — m301-log-equation, m301-exp-equation-log, m301-exp-log-apply
// ---------------------------------------------------------------------------

/** x + p in LaTeX. */
const xp = (p: number) => innerTex(-p);

function leSingle(rng: Rng): GenOutput {
  const b = rng.pick([2, 3, 5, 10]);
  const n = retry(
    () => rng.int(1, 3),
    (k) => b ** k <= 1000,
  );
  const p = rng.int(1, 4);
  const q = retry(
    () => rng.nonZero(-9, 9),
    (v) => (b ** n - v) % p === 0,
  );
  const x = (b ** n - q) / p;
  return {
    prompt: `Solve $${logb(b)}(${lin(p, q)}) = ${n}$.${ALL_SOL}`,
    parts: [solPart([x])],
    hints: ['Rewrite the equation in exponential form.', 'Check that the argument of the logarithm is positive for your answer.'],
    solution: [`Exponential form: $${lin(p, q)} = ${b}^{${n}} = ${b ** n}$`, p === 1 ? `$x = ${nn(x)}$` : `$${lin(p, 0)} = ${b ** n - q}$, so $x = ${nn(x)}$.`, `Check: the argument is $${b ** n} > 0$ ✓`, `$x = ${nn(x)}$`],
  };
}

function leEqualArgs(rng: Rng): GenOutput {
  const b = rng.pick([2, 3, 5, 10]);
  const x0 = rng.int(-5, 8);
  const v = rng.int(1, 12);
  const [p, r] = rng.sample([1, 2, 3, 4, 5], 2);
  const q = v - p * x0;
  const s = v - r * x0;
  return {
    prompt: `Solve $${logb(b)}(${lin(p, q)}) = ${logb(b)}(${lin(r, s)})$.${ALL_SOL}`,
    parts: [solPart([x0])],
    hints: ['If $\\log_{c} A = \\log_{c} B$, then $A = B$.', 'Check that both arguments are positive for your answer.'],
    solution: [`The logarithms have the same base, so the arguments are equal: $${lin(p, q)} = ${lin(r, s)}$.`, p - r === 1 ? `$x = ${x0}$` : `$${lin(p - r, 0)} = ${s - q}$, so $x = ${x0}$.`, `Check: both arguments equal $${v} > 0$ ✓`, `$x = ${x0}$`],
  };
}

function leProduct(rng: Rng): GenOutput {
  const o = retry(
    () => {
      const [b, n] = rng.pick([
        [2, 2], [2, 3], [2, 4], [3, 2], [6, 1], [6, 2], [10, 1], [10, 2], [4, 2], [12, 1], [5, 2],
      ] as const);
      const T = b ** n;
      const pairs: Array<[number, number]> = [];
      for (let u = 1; u <= T; u++) if (T % u === 0 && u !== T / u) pairs.push([u, T / u]);
      const [u, v] = rng.pick(pairs);
      const p = rng.int(-4, 4);
      return { b, n, T, u, v, p };
    },
    ({ u, v, p }) => Math.abs(v - u + p) <= 12 && Math.abs(u - p) <= 15,
  );
  const { b, n, T, u, v, p } = o;
  const r = u - p;
  const q = v - r;
  const r2 = -p - q - r;
  const A = xp(p);
  const Bq = xp(q);
  const la = (t: string) => (t === 'x' ? ` x` : `(${t})`);
  const pa = (t: string) => (t === 'x' ? 'x' : `(${t})`);
  return {
    prompt: `Solve $${logb(b)}${la(A)} + ${logb(b)}${la(Bq)} = ${n}$.${ALL_SOL}`,
    parts: [solPart([r])],
    hints: ['Use the product law to write the left side as a single logarithm, then rewrite in exponential form.', 'Solve the quadratic, then check each answer: the argument of every logarithm in the original equation must be positive.'],
    solution: [
      `Product law: $${logb(b)}\\left[${pa(A)}${pa(Bq)}\\right] = ${n}$`,
      `Exponential form: $${pa(A)}${pa(Bq)} = ${b}^{${n}} = ${T}$`,
      `$${quadTex(p + q, p * q - T)} = 0$`,
      `$${factorTex(r)}${factorTex(r2)} = 0$, so $x = ${r}$ or $x = ${r2}$.`,
      `Check $x = ${r2}$: the argument $${A}$ would be $${r2 + p}$, which is negative, so $x = ${r2}$ is extraneous.`,
      `Check $x = ${r}$: the arguments are $${u}$ and $${v}$, both positive ✓`,
      `$x = ${r}$`,
    ],
  };
}

function leQuotient(rng: Rng): GenOutput {
  const [b, n] = rng.pick([
    [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [5, 1], [10, 1], [4, 1],
  ] as const);
  const T = b ** n;
  const x0 = rng.int(-4, 10);
  const u = rng.int(1, 5);
  const q = u - x0;
  const p = T * u - x0;
  return {
    prompt: `Solve $${logb(b)}${xp(p) === 'x' ? ' x' : `(${xp(p)})`} - ${logb(b)}${xp(q) === 'x' ? ' x' : `(${xp(q)})`} = ${n}$.${ALL_SOL}`,
    parts: [solPart([x0])],
    hints: ['Use the quotient law to write the left side as a single logarithm.', 'Rewrite in exponential form, multiply both sides by the denominator, and check your answer.'],
    solution: [
      `Quotient law: $${logb(b)} \\dfrac{${xp(p)}}{${xp(q)}} = ${n}$`,
      `Exponential form: $\\dfrac{${xp(p)}}{${xp(q)}} = ${T}$`,
      `$${xp(p)} = ${T}(${xp(q)})$, so $${lin(1, p)} = ${lin(T, T * q)}$.`,
      `$${lin(1 - T, 0)} = ${T * q - p}$, so $x = ${x0}$.`,
      `Check: when $x = ${x0}$, the arguments are $${T * u}$ and $${u}$, both positive ✓`,
      `$x = ${x0}$`,
    ],
  };
}

function leNone(rng: Rng): GenOutput {
  const b = rng.pick([2, 3, 5, 10]);
  if (rng.chance(0.5)) {
    const x0 = rng.int(-6, 6);
    const v = -rng.int(1, 6);
    const [p, r] = rng.sample([1, 2, 3, 4, 5], 2);
    const q = v - p * x0;
    const s = v - r * x0;
    return {
      prompt: `Solve $${logb(b)}(${lin(p, q)}) = ${logb(b)}(${lin(r, s)})$.${ALL_SOL}`,
      parts: [solPart([])],
      hints: ['If $\\log_{c} A = \\log_{c} B$, then $A = B$.', 'Check your answer in the original equation: the argument of a logarithm must be positive.'],
      solution: [
        `Set the arguments equal: $${lin(p, q)} = ${lin(r, s)}$.`,
        p - r === 1 ? `$x = ${x0}$` : `$${lin(p - r, 0)} = ${s - q}$, so $x = ${x0}$.`,
        `Check: when $x = ${x0}$, both arguments equal $${v}$. The logarithm of a negative number is undefined, so $x = ${x0}$ is extraneous.`,
        'There is no solution.',
      ],
    };
  }
  const r = rng.int(2, 5);
  const Bc = rng.int(1, r - 1);
  const A = Bc - 2 * r;
  const C = -r * r;
  const v = Bc * r + C;
  return {
    prompt: `Solve $${logb(b)}(${quadTex(A, 0)}) = ${logb(b)}(${lin(Bc, C)})$.${ALL_SOL}`,
    parts: [solPart([])],
    hints: ['Set the arguments equal and solve the quadratic.', 'Check every answer: both arguments must be positive.'],
    solution: [
      `Set the arguments equal: $${quadTex(A, 0)} = ${lin(Bc, C)}$.`,
      `$${quadTex(A - Bc, -C)} = 0$, so $(x - ${r})^{2} = 0$ and $x = ${r}$.`,
      `Check: when $x = ${r}$, both arguments equal $${v}$, which is negative. So $x = ${r}$ is extraneous.`,
      'There is no solution.',
    ],
  };
}

function leTwoValid(rng: Rng): GenOutput {
  const [b, n] = rng.pick([
    [2, 3], [2, 4], [3, 2], [10, 1], [6, 1], [2, 5], [5, 2], [3, 3],
  ] as const);
  const T = b ** n;
  if (rng.chance(0.5)) {
    const pairs: Array<[number, number]> = [];
    for (let u = 1; u <= T; u++) if (T % u === 0 && u !== T / u && Math.abs(u - T / u) <= 24) pairs.push([u, T / u]);
    const [u, v] = rng.pick(pairs);
    const m = u - v;
    return {
      prompt: `Solve $${logb(b)}(${quadTex(-m, 0)}) = ${n}$.${ALL_SOL}`,
      parts: [solPart([u, -v])],
      hints: ['Rewrite in exponential form and solve the quadratic.', 'Check each answer in the original equation.'],
      solution: [
        `Exponential form: $${quadTex(-m, 0)} = ${b}^{${n}} = ${T}$`,
        `$${quadTex(-m, -T)} = 0$`,
        `$${factorTex(u)}${factorTex(-v)} = 0$, so $x = ${u}$ or $x = ${-v}$.`,
        `Check: for both values the argument $${quadTex(-m, 0)}$ equals $${T} > 0$, so neither is extraneous.`,
        `$x = ${-v}$ or $x = ${u}$`,
      ],
    };
  }
  const r = retry(
    () => rng.int(2, 7),
    (k) => k * k !== T,
  );
  const c = T - r * r;
  return {
    prompt: `Solve $${logb(b)}(${quadTex(0, c)}) = ${n}$.${ALL_SOL}`,
    parts: [solPart([r, -r])],
    hints: ['Rewrite in exponential form.', 'Both square roots may work: check each one.'],
    solution: [
      `Exponential form: $${quadTex(0, c)} = ${T}$`,
      `$x^{2} = ${r * r}$, so $x = \\pm ${r}$.`,
      `Check: for both values the argument is $${T} > 0$ ✓`,
      `$x = ${-r}$ or $x = ${r}$`,
    ],
  };
}

function lePowerLaw(rng: Rng): GenOutput {
  const b = rng.pick([2, 3, 5, 10]);
  const o = retry(
    () => {
      const [r1, r2] = rng.sample([-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7], 2);
      return { r1, r2 };
    },
    ({ r1, r2 }) => {
      if ((r1 + r2) % 2 === 0) return false;
      const p = (1 - r1 - r2) / 2;
      const s = p * p - r1 * r2;
      return Math.abs(p) <= 6 && p !== 0 && Math.abs(s) <= 40 && r1 + p !== 0 && r2 + p !== 0;
    },
  );
  const { r1, r2 } = o;
  const p = (1 - r1 - r2) / 2;
  const s = p * p - r1 * r2;
  const [good, bad] = r1 + p > 0 ? [r1, r2] : [r2, r1];
  return {
    prompt: `Solve $2${logb(b)}(${xp(p)}) = ${logb(b)}(${xp(s)})$.${ALL_SOL}`,
    parts: [solPart([good])],
    hints: ['Use the power law: $2\\log_{c} A = \\log_{c} A^{2}$. Then set the arguments equal.', `Check each answer in the original equation: $${xp(p)}$ must be positive.`],
    solution: [
      `Power law: $${logb(b)}(${xp(p)})^{2} = ${logb(b)}(${xp(s)})$`,
      `$(${xp(p)})^{2} = ${xp(s)}$`,
      `$${quadTex(2 * p, p * p)} = ${xp(s)}$, so $${quadTex(2 * p - 1, p * p - s)} = 0$.`,
      `$${factorTex(r1)}${factorTex(r2)} = 0$, so $x = ${r1}$ or $x = ${r2}$.`,
      `Check $x = ${bad}$: $${bad} ${p >= 0 ? '+' : '-'} ${Math.abs(p)} = ${bad + p}$ is not positive, so $${logb(b)}(${xp(p)})$ is undefined: extraneous.`,
      `Check $x = ${good}$: $${good} ${p >= 0 ? '+' : '-'} ${Math.abs(p)} = ${good + p} > 0$ ✓`,
      `$x = ${good}$`,
    ],
  };
}

const logEquation = skill({
  id: 'm301-log-equation',
  name: 'Solving logarithmic equations',
  description: 'Solve logarithmic equations using the laws of logarithms and exponential form, and reject extraneous roots.',
  outcomes: ['RF10'],
  lessonId: 'm301-7-7',
  gen(rng, d): GenOutput {
    if (d === 1) return rng.chance(0.6) ? leSingle(rng) : leEqualArgs(rng);
    if (d === 2) return rng.chance(0.6) ? leProduct(rng) : leQuotient(rng);
    const kind = rng.pick(['none', 'two', 'power', 'product'] as const);
    if (kind === 'none') return leNone(rng);
    if (kind === 'two') return leTwoValid(rng);
    return kind === 'power' ? lePowerLaw(rng) : leProduct(rng);
  },
});

const TAKE_LOG = 'Take the common logarithm of both sides, then use the power law to bring the exponent down.';

function elBasic(rng: Rng): GenOutput {
  const decimals = rng.pick([2, 2, 3]);
  const [b, N] = retry(
    () => [rng.pick([2, 3, 4, 5, 6, 7, 10, 1.5]), rng.pick([rng.int(5, 99), rng.int(100, 900), rng.int(11, 99) / 10])] as const,
    ([b, N]) => !Number.isInteger(Math.log(N) / Math.log(b) + 1e-12) && safeRound(Math.log(N) / Math.log(b), decimals) && Math.abs(Math.log(N) / Math.log(b) - Math.round(Math.log(N) / Math.log(b))) > 0.01,
  );
  const x = Math.log(N) / Math.log(b);
  const steps =
    b === 10
      ? [`Take the common logarithm of both sides: $x = \\log ${fmt(N)}$`, `$x \\approx ${fx(x, decimals)}$`]
      : [`Take the common logarithm of both sides: $\\log ${fmt(b)}^{x} = \\log ${fmt(N)}$`, `Power law: $x\\log ${fmt(b)} = \\log ${fmt(N)}$`, `$x = \\dfrac{\\log ${fmt(N)}}{\\log ${fmt(b)}} \\approx ${fx(x, decimals)}$`];
  return {
    prompt: `Solve $${fmt(b)}^{x} = ${fmt(N)}$. Round to the nearest ${decimals === 2 ? 'hundredth' : 'thousandth'}.`,
    parts: [numPart(x, { decimals, label: '$x \\approx$' })],
    hints: ['The two sides cannot easily be written with the same base.', TAKE_LOG],
    solution: [...steps, `Check: $${fmt(b)}^{${fx(x, decimals)}} \\approx ${fmt(N)}$ ✓`],
  };
}

function elD2(rng: Rng): GenOutput {
  const decimals = 2;
  if (rng.chance(0.5)) {
    const o = retry(
      () => {
        const b = rng.pick([2, 3, 5, 1.5, 4]);
        const a = rng.int(2, 6);
        const c = rng.int(-20, 20);
        const R = rng.int(3, 80);
        return { b, a, c, R, N: a * R + c };
      },
      ({ b, R }) => !isPowOf(R, b) && safeRound(Math.log(R) / Math.log(b), decimals) && Math.abs(Math.log(R) / Math.log(b) - Math.round(Math.log(R) / Math.log(b))) > 0.01,
    );
    const { b, a, c, R, N } = o;
    const x = Math.log(R) / Math.log(b);
    return {
      prompt: `Solve $${a}(${fmt(b)})^{x}${sgn(c)} = ${N}$. Round to the nearest hundredth.`,
      parts: [numPart(x, { decimals, label: '$x \\approx$' })],
      hints: ['Isolate the power first.', TAKE_LOG],
      solution: [
        ...(c !== 0 ? [`${c > 0 ? 'Subtract' : 'Add'} $${Math.abs(c)}$: $${a}(${fmt(b)})^{x} = ${N - c}$`] : []),
        `Divide by $${a}$: $${fmt(b)}^{x} = ${R}$`,
        `$x\\log ${fmt(b)} = \\log ${R}$, so $x = \\dfrac{\\log ${R}}{\\log ${fmt(b)}} \\approx ${fx(x, decimals)}$`,
      ],
    };
  }
  const o = retry(
    () => ({ b: rng.pick([2, 3, 5, 7]), p: rng.pick([2, 3, -1, -2]), q: rng.nonZero(-3, 3), N: rng.int(5, 400) }),
    ({ b, p, q, N }) => !isPowOf(N, b) && safeRound((Math.log(N) / Math.log(b) - q) / p, decimals),
  );
  const { b, p, q, N } = o;
  const Lv = Math.log(N) / Math.log(b);
  const x = (Lv - q) / p;
  return {
    prompt: `Solve $${b}^{${lin(p, q)}} = ${N}$. Round to the nearest hundredth.`,
    parts: [numPart(x, { decimals, label: '$x \\approx$' })],
    hints: [TAKE_LOG, 'Keep brackets around the whole exponent when you bring it down.'],
    solution: [
      `$(${lin(p, q)})\\log ${b} = \\log ${N}$`,
      `$${lin(p, q)} = \\dfrac{\\log ${N}}{\\log ${b}} \\approx ${fx(Lv, 4)}$`,
      `$x = \\dfrac{${fx(Lv, 4)} ${q > 0 ? '-' : '+'} ${Math.abs(q)}}{${p}} \\approx ${fx(x, decimals)}$`,
    ],
  };
}

const cl = (c: number) => (c === 1 ? '' : `${c}`);

function elTwoBases(rng: Rng): GenOutput {
  const decimals = 2;
  const o = retry(
    () => {
      const [b1, b2] = rng.pick([
        [2, 3], [3, 2], [2, 5], [5, 2], [3, 5], [5, 3], [3, 7], [7, 2], [4, 3], [6, 5],
      ] as const);
      return { b1, b2, p1: rng.pick([1, 1, 2]), q1: rng.int(-3, 3), p2: rng.pick([1, 1, 2]), q2: rng.int(-3, 3) };
    },
    ({ b1, b2, p1, q1, p2, q2 }) => {
      const den = p1 * lg(b1) - p2 * lg(b2);
      const x = (q2 * lg(b2) - q1 * lg(b1)) / den;
      return Math.abs(den) > 0.05 && (q1 !== 0 || q2 !== 0) && Math.abs(x) < 50 && safeRound(x, decimals);
    },
  );
  const { b1, b2, p1, q1, p2, q2 } = o;
  const x = (q2 * lg(b2) - q1 * lg(b1)) / (p1 * lg(b1) - p2 * lg(b2));
  return {
    prompt: `Solve $${b1}^{${lin(p1, q1)}} = ${b2}^{${lin(p2, q2)}}$. Round to the nearest hundredth.`,
    parts: [numPart(x, { decimals, label: '$x \\approx$' })],
    hints: [TAKE_LOG, 'Expand both sides, collect the terms with $x$ on one side and factor out $x$.'],
    solution: [
      `$${q1 ? `(${lin(p1, q1)})` : lin(p1, q1)}\\log ${b1} = ${q2 ? `(${lin(p2, q2)})` : lin(p2, q2)}\\log ${b2}$`,
      `Expand: $${cl(p1)}x\\log ${b1}${q1 ? ` ${q1 > 0 ? '+' : '-'} ${cl(Math.abs(q1))}\\log ${b1}` : ''} = ${cl(p2)}x\\log ${b2}${q2 ? ` ${q2 > 0 ? '+' : '-'} ${cl(Math.abs(q2))}\\log ${b2}` : ''}$`,
      `Collect the $x$-terms: $x(${cl(p1)}\\log ${b1} - ${cl(p2)}\\log ${b2}) = ${[q2 ? `${q2 < 0 ? '-' : ''}${cl(Math.abs(q2))}\\log ${b2}` : '', q1 ? `${q1 < 0 ? (q2 ? '+ ' : '') : '- '}${cl(Math.abs(q1))}\\log ${b1}` : ''].filter(Boolean).join(' ')}$`,
      `$x = \\dfrac{${fx(q2 * lg(b2) - q1 * lg(b1), 4)}}{${fx(p1 * lg(b1) - p2 * lg(b2), 4)}} \\approx ${fx(x, decimals)}$`,
    ],
  };
}

/** x = (exact or rounded value), with an optional expression first. */
function xTex(x: number, expr: string): string {
  const exact = Math.abs(x - Math.round(x)) < 1e-9;
  const val = exact ? `${Math.round(x)}` : fx(x, 2);
  const rel = exact ? '=' : '\\approx';
  return expr ? `$x = ${expr} ${rel} ${val}$` : `$x ${rel} ${val}$`;
}

function elQuadForm(rng: Rng): GenOutput {
  const decimals = 2;
  const o = retry(
    () => {
      const b = rng.pick([2, 3, 5]);
      const [u1, u2] = rng.chance(0.6) ? rng.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 2) : [rng.int(2, 9), -rng.int(1, 4)];
      return { b, u1, u2 };
    },
    ({ b, u1, u2 }) => [u1, u2].filter((u) => u > 0).every((u) => safeRound(Math.log(u) / Math.log(b), decimals)) && u1 !== u2,
  );
  const { b, u1, u2 } = o;
  const S = u1 + u2;
  const P = u1 * u2;
  const pos = [u1, u2].filter((u) => u > 0);
  const xs = pos.map((u) => Math.log(u) / Math.log(b) + 0);
  const mid = S === 0 ? '' : ` ${S > 0 ? '-' : '+'} ${Math.abs(S) === 1 ? '' : Math.abs(S)}(${b}^{x})`;
  const eq = `${b}^{2x}${mid} ${P > 0 ? '+' : '-'} ${Math.abs(P)} = 0`;
  const fac = (u: number) => `(A ${u > 0 ? '-' : '+'} ${Math.abs(u)})`;
  return {
    prompt: `Solve $${eq}$. Round to the nearest hundredth where necessary. Enter all solutions.`,
    parts: [solPart(xs, decimals)],
    hints: [`Let $A = ${b}^{x}$. Then $${b}^{2x} = A^{2}$ and the equation is quadratic in $A$.`, `Factor, then solve $${b}^{x} = $ each root. A power of $${b}$ is never negative.`],
    solution: [
      `Let $A = ${b}^{x}$: $A^{2}${S === 0 ? '' : ` ${S > 0 ? '-' : '+'} ${Math.abs(S) === 1 ? '' : Math.abs(S)}A`} ${P > 0 ? '+' : '-'} ${Math.abs(P)} = 0$`,
      `$${fac(u1)}${fac(u2)} = 0$, so $A = ${u1}$ or $A = ${u2}$.`,
      ...[u1, u2].map((u) =>
        u > 0
          ? `$${b}^{x} = ${u}$: ${xTex(Math.log(u) / Math.log(b), `\\dfrac{\\log ${u}}{\\log ${b}}`)}`
          : `$${b}^{x} = ${u}$ has no solution, because a power of $${b}$ is always positive.`,
      ),
      xs.map((x) => xTex(x, '')).join(' or '),
    ],
  };
}

const expEquationLog = skill({
  id: 'm301-exp-equation-log',
  name: 'Solving exponential equations with logarithms',
  description: 'Solve exponential equations whose sides cannot be written with a common base by taking logarithms, rounding as directed.',
  outcomes: ['RF10'],
  lessonId: 'm301-7-7',
  calculator: true,
  gen(rng, d): GenOutput {
    if (d === 1) return elBasic(rng);
    if (d === 2) return elD2(rng);
    return rng.chance(0.55) ? elTwoBases(rng) : elQuadForm(rng);
  },
});

const money = (x: number) => `\\$${fmtFixed(x, 2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
const tag = (x: number) => (Number.isInteger(x) ? `\\$${String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` : money(x));
const mv = (x: number) => (Number.isInteger(x) ? String(x) : fmtFixed(x, 2)).replace(/\B(?=(\d{3})+(?!\d))/g, '{,}');
const FREQ: Array<[string, number]> = [
  ['annually', 1],
  ['semi-annually', 2],
  ['quarterly', 4],
  ['monthly', 12],
];
const COMPOUND = 'The amount is $A = P(1 + i)^{n}$, where $P$ is the principal, $i$ is the interest rate per compounding period (as a decimal) and $n$ is the number of compounding periods.';
const HALF = (A0: number, h: number, unit: string, sym = 'A') => `$${sym} = ${A0}\\left(\\frac{1}{2}\\right)^{\\frac{t}{${h}}}$, where $t$ is the time in ${unit}`;
const ISOTOPES: Record<string, string[]> = {
  hours: ['a radioactive tracer used in medical imaging', 'a radioactive tracer used at a city hospital'],
  days: ['a radioactive isotope used in medical treatment', 'a radioactive isotope used in a university research lab'],
  years: ['a radioactive isotope in a sample of nuclear waste', 'a radioactive isotope used in industry', 'a radioactive isotope stored at a government research lab'],
};
const QUAKE = 'The magnitude of an earthquake is $M = \\log \\dfrac{A}{A_0}$, where $A$ is the amplitude of the ground motion and $A_0$ is the amplitude of a reference earthquake. So an increase of $1$ in magnitude multiplies the amplitude by $10$.';
const DB = 'The sound level in decibels is $\\beta = 10\\log \\dfrac{I}{I_0}$, where $I$ is the intensity of the sound and $I_0$ is the intensity of the quietest sound a person can hear.';
const PH = 'The pH of a solution is $\\text{pH} = -\\log\\left[\\text{H}^{+}\\right]$, where $\\left[\\text{H}^{+}\\right]$ is the hydrogen ion concentration in moles per litre.';
const SOLUTIONS = ['a sample of tomato juice', 'a sample of water from a northern lake', 'a cup of black coffee', 'a sample of rainwater', 'a glass of orange juice', 'a sample of apple juice', 'a sample of vinegar', 'a soil sample from a farm'];

function apCompoundA(rng: Rng): GenOutput {
  const o = retry(
    () => {
      const P = rng.int(2, 80) * 250;
      const r = rng.pick([2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6]);
      const [freq, m] = rng.pick(FREQ);
      const t = rng.int(2, 15);
      const i = r / 100 / m;
      const n = m * t;
      return { P, r, freq, m, t, i, n, A: P * (1 + i) ** n };
    },
    (o) => safeRound(o.A, 2),
  );
  const { P, r, freq, t, i, n, A } = o;
  const name = rng.pick(NAMES);
  return {
    prompt: `${name} invests ${tag(P)} at ${fmt(r)}% per year, compounded ${freq}. ${COMPOUND} Find the value of the investment after ${t} years, to the nearest cent.`,
    parts: [numPart(A, { decimals: 2, tolerance: 0.011, label: '\\$' })],
    hints: [`Divide the annual rate by the number of compounding periods per year to get $i$; multiply the years by that number to get $n$.`, `$A = ${mv(P)}(1 + ${fmt(i, 6)})^{${n}}$`],
    solution: [`$i = ${fmt(r / 100, 4)} \\div ${o.m} = ${fmt(i, 6)}$ and $n = ${t} \\times ${o.m} = ${n}$.`, `$A = ${mv(P)}(1 + ${fmt(i, 6)})^{${n}} \\approx ${mv(roundTo2(A))}$`, `The investment is worth ${money(A)}.`],
  };
}
const roundTo2 = (x: number) => Math.round(x * 100) / 100;

function apHalfAmount(rng: Rng): GenOutput {
  const o = retry(
    () => {
      const A0 = rng.pick([50, 80, 120, 150, 200, 250, 400, 500]);
      const [h, unit] = rng.pick([
        [6, 'hours'], [8, 'days'], [13, 'hours'], [5.3, 'years'], [28, 'years'], [14, 'days'], [2.7, 'days'],
      ] as const);
      const t = rng.int(2, 9) * (h < 10 ? 2 : 5);
      return { A0, h, unit, t, A: A0 * 0.5 ** (t / h) };
    },
    (o) => safeRound(o.A, 1) && o.A > 0.5,
  );
  const { A0, h, unit, t, A } = o;
  const what = rng.pick(ISOTOPES[unit]);
  return {
    prompt: `A sample of ${what} has a mass of ${A0} mg. Its half-life is ${fmt(h)} ${unit}, so the mass remaining is ${HALF(A0, h, unit)}. How much remains after ${t} ${unit}? Round to the nearest tenth of a milligram.`,
    parts: [numPart(A, { decimals: 1, suffix: 'mg' })],
    hints: [`Substitute $t = ${t}$.`, `Evaluate the exponent $\\frac{${t}}{${fmt(h)}}$ first, then the power.`],
    solution: [`$A = ${A0}\\left(\\frac{1}{2}\\right)^{\\frac{${t}}{${fmt(h)}}}$`, `$\\frac{${t}}{${fmt(h)}} \\approx ${fx(t / h, 4)}$, so $A \\approx ${A0}(0.5)^{${fx(t / h, 4)}} \\approx ${fx(A, 1)}$`, `About ${fx(A, 1)} mg remains.`],
  };
}

function apPH(rng: Rng): GenOutput {
  const decimals = rng.pick([1, 2]);
  const o = retry(
    () => ({ m: rng.int(11, 99) / 10, k: rng.int(2, 7) }),
    ({ m, k }) => safeRound(-lg(m * 10 ** -k), decimals),
  );
  const { m, k } = o;
  const H = m * 10 ** -k;
  const pH = -lg(H);
  const what = rng.pick(SOLUTIONS);
  return {
    prompt: `${PH} The hydrogen ion concentration of ${what} is $${fmt(m)} \\times 10^{-${k}}$ mol/L. Find its pH, ${roundingPhrase(decimals)}.`,
    parts: [numPart(pH, { decimals, label: 'pH =' })],
    hints: ['Substitute the concentration into the formula.', `Enter $-\\log(${fmt(m)} \\times 10^{-${k}})$ on a calculator. Use brackets.`],
    solution: [`$\\text{pH} = -\\log(${fmt(m)} \\times 10^{-${k}})$`, `$= -(\\log ${fmt(m)} - ${k}) = ${k} - \\log ${fmt(m)} \\approx ${fx(pH, decimals)}$`, `The pH is about ${fx(pH, decimals)}.`],
  };
}

function apQuakeInt(rng: Rng): GenOutput {
  const M2 = rng.int(30, 55) / 10;
  const dM = rng.int(1, 3);
  const M1 = M2 + dM;
  const [place1, place2] = rng.sample(['in northern British Columbia', 'in the Yukon', 'in southern Alaska', 'off Haida Gwaii', 'off Vancouver Island', 'in the Northwest Territories', 'in New Zealand'], 2);
  return {
    prompt: `${QUAKE} An earthquake ${place1} had magnitude ${fmt(M1)}, and one ${place2} had magnitude ${fmt(M2)}. How many times as great was the amplitude of the first earthquake?`,
    parts: [numPart(10 ** dM, { suffix: 'times' })],
    hints: ['Each increase of $1$ in magnitude multiplies the amplitude by $10$.', `The magnitudes differ by $${fmt(M1)} - ${fmt(M2)} = ${dM}$.`],
    solution: [`$\\dfrac{A_1}{A_2} = 10^{M_1 - M_2} = 10^{${fmt(M1)} - ${fmt(M2)}} = 10^{${dM}}$`, `$= ${10 ** dM}$`, `The first earthquake's amplitude was ${10 ** dM} times as great.`],
  };
}

function apDecibel(rng: Rng): GenOutput {
  const o = retry(
    () => ({ m: rng.int(11, 99) / 10, k: rng.int(3, 11) }),
    ({ m, k }) => safeRound(10 * lg(m * 10 ** k), 1),
  );
  const { m, k } = o;
  const beta = 10 * lg(m * 10 ** k);
  const what = rng.pick(['a busy street downtown', 'a lawn mower', 'a hair dryer', 'a crowd at a hockey game', 'a quiet library', 'a rock concert', 'a dishwasher', 'a chainsaw']);
  return {
    prompt: `${DB} The intensity of the sound of ${what} is $${fmt(m)} \\times 10^{${k}}$ times $I_0$. Find its sound level, to the nearest tenth of a decibel.`,
    parts: [numPart(beta, { decimals: 1, suffix: 'dB' })],
    hints: [`$\\dfrac{I}{I_0} = ${fmt(m)} \\times 10^{${k}}$.`, `$\\beta = 10\\log(${fmt(m)} \\times 10^{${k}})$`],
    solution: [`$\\beta = 10\\log(${fmt(m)} \\times 10^{${k}})$`, `$= 10(\\log ${fmt(m)} + ${k}) \\approx 10(${fx(lg(m) + k, 4)}) \\approx ${fx(beta, 1)}$`, `The sound level is about ${fx(beta, 1)} dB.`],
  };
}

function apCompoundTime(rng: Rng): GenOutput {
  const o = retry(
    () => {
      const P = rng.int(4, 60) * 250;
      const r = rng.pick([2.5, 3, 3.5, 4, 4.5, 5, 6, 7]);
      const [freq, m] = rng.pick(FREQ);
      const k = rng.pick([1.5, 2, 2, 2.5, 3]);
      const i = r / 100 / m;
      const n = Math.log(k) / Math.log(1 + i);
      return { P, r, freq, m, k, i, n, years: n / m };
    },
    (o) => safeRound(o.years, 1),
  );
  const { P, r, freq, m, k, i, n, years } = o;
  const A = P * k;
  const name = rng.pick(NAMES);
  return {
    prompt: `${name} invests ${tag(P)} at ${fmt(r)}% per year, compounded ${freq}. ${COMPOUND} How long will it take for the investment to ${k === 2 ? 'double' : k === 3 ? 'triple' : `grow to ${tag(A)}`}? Answer in years, to the nearest tenth of a year.`,
    parts: [numPart(years, { decimals: 1, suffix: 'years' })],
    hints: [`Substitute $A = ${mv(A)}$, $P = ${mv(P)}$ and $i = ${fmt(i, 6)}$, then divide both sides by $${mv(P)}$.`, 'Take the logarithm of both sides to solve for $n$, then convert compounding periods to years.'],
    solution: [
      `$${mv(A)} = ${mv(P)}(1 + ${fmt(i, 6)})^{n}$, so $${fmt(k)} = ${fmt(1 + i, 6)}^{n}$.`,
      `$n = \\dfrac{\\log ${fmt(k)}}{\\log ${fmt(1 + i, 6)}} \\approx ${fx(n, 2)}$ compounding periods.`,
      ...(m > 1 ? [`There are ${m} compounding periods per year: $${fx(n, 2)} \\div ${m} \\approx ${fx(years, 1)}$ years.`] : []),
      `It takes about ${fx(years, 1)} years.`,
    ],
  };
}

function apHalfTime(rng: Rng): GenOutput {
  const o = retry(
    () => {
      const A0 = rng.pick([40, 60, 80, 100, 150, 200, 500]);
      const [h, unit] = rng.pick([
        [6, 'hours'], [8, 'days'], [5.3, 'years'], [28, 'years'], [14, 'days'], [12.3, 'years'], [30, 'years'],
      ] as const);
      const frac0 = rng.pick([0.4, 0.3, 0.2, 0.15, 0.1, 0.05, 0.6, 0.35]);
      const A = A0 * frac0;
      const t = (h * Math.log(A / A0)) / Math.log(0.5);
      return { A0, h, unit, A, t };
    },
    (o) => safeRound(o.t, 1) && Number.isInteger(o.A * 10),
  );
  const { A0, h, unit, A, t } = o;
  const what = rng.pick(ISOTOPES[unit]);
  return {
    prompt: `A sample of ${what} has an initial mass of ${A0} mg and a half-life of ${fmt(h)} ${unit}. The mass remaining is ${HALF(A0, h, unit)}. How long will it take until only ${fmt(A)} mg remain? Round to the nearest tenth.`,
    parts: [numPart(t, { decimals: 1, suffix: unit })],
    hints: [`Substitute $A = ${fmt(A)}$ and divide both sides by $${A0}$.`, 'Take the logarithm of both sides and solve for $t$.'],
    solution: [
      `$${fmt(A)} = ${A0}\\left(\\frac{1}{2}\\right)^{\\frac{t}{${fmt(h)}}}$, so $${fmt(A / A0, 4)} = 0.5^{\\frac{t}{${fmt(h)}}}$.`,
      `$\\dfrac{t}{${fmt(h)}}\\log 0.5 = \\log ${fmt(A / A0, 4)}$`,
      `$t = \\dfrac{${fmt(h)}\\log ${fmt(A / A0, 4)}}{\\log 0.5} \\approx ${fx(t, 1)}$`,
      `It takes about ${fx(t, 1)} ${unit}.`,
    ],
  };
}

function apBacteriaTime(rng: Rng): GenOutput {
  const o = retry(
    () => {
      const N0 = rng.pick([50, 100, 120, 200, 250, 400, 500]);
      const d = rng.pick([20, 25, 30, 40, 45]);
      const N = N0 * rng.int(15, 300);
      const t = (d * Math.log(N / N0)) / Math.log(2);
      return { N0, d, N, t };
    },
    (o) => safeRound(o.t, 1) && !isPowOf(o.N / o.N0, 2),
  );
  const { N0, d, N, t } = o;
  return {
    prompt: `A culture of ${N0} bacteria doubles every ${d} minutes, so the number of bacteria after $t$ minutes is $N = ${N0}(2)^{\\frac{t}{${d}}}$. How long will it take to reach ${prose(N)} bacteria? Round to the nearest tenth of a minute.`,
    parts: [numPart(t, { decimals: 1, suffix: 'min' })],
    hints: [`Substitute $N = ${big(N)}$ and divide both sides by $${N0}$.`, 'Take the logarithm of both sides and solve for $t$.'],
    solution: [
      `$${big(N)} = ${N0}(2)^{\\frac{t}{${d}}}$, so $${fmt(N / N0)} = 2^{\\frac{t}{${d}}}$.`,
      `$\\dfrac{t}{${d}}\\log 2 = \\log ${fmt(N / N0)}$`,
      `$t = \\dfrac{${d}\\log ${fmt(N / N0)}}{\\log 2} \\approx ${fx(t, 1)}$`,
      `It takes about ${fx(t, 1)} minutes.`,
    ],
  };
}

function apCompare(rng: Rng): GenOutput {
  const kind = rng.pick(['quake', 'db', 'ph'] as const);
  if (kind === 'quake') {
    const o = retry(
      () => ({ M2: rng.int(30, 55) / 10, dM: rng.int(3, 28) / 10 }),
      ({ dM }) => !Number.isInteger(dM) && safeRound(10 ** dM, 1),
    );
    const { M2, dM } = o;
    const M1 = Math.round((M2 + dM) * 10) / 10;
    const ratio = 10 ** dM;
    return {
      prompt: `${QUAKE} How many times as great is the amplitude of a magnitude ${fmt(M1)} earthquake as that of a magnitude ${fmt(M2)} earthquake? Round to the nearest tenth.`,
      parts: [numPart(ratio, { decimals: 1, suffix: 'times' })],
      hints: ['The amplitude ratio is $10^{M_1 - M_2}$.', `Find $10^{${fmt(dM)}}$ with a calculator.`],
      solution: [`$\\dfrac{A_1}{A_2} = 10^{${fmt(M1)} - ${fmt(M2)}} = 10^{${fmt(dM)}}$`, `$\\approx ${fx(ratio, 1)}$`, `The amplitude is about ${fx(ratio, 1)} times as great.`],
    };
  }
  if (kind === 'db') {
    const o = retry(
      () => ({ b2: rng.int(40, 75), d: rng.int(3, 35) }),
      ({ d }) => d % 10 !== 0 && safeRound(10 ** (d / 10), 1),
    );
    const { b2, d } = o;
    const b1 = b2 + d;
    const ratio = 10 ** (d / 10);
    return {
      prompt: `${DB} How many times as intense is a ${b1} dB sound as a ${b2} dB sound? Round to the nearest tenth.`,
      parts: [numPart(ratio, { decimals: 1, suffix: 'times' })],
      hints: ['Subtract the two equations: $\\beta_1 - \\beta_2 = 10\\log \\dfrac{I_1}{I_2}$.', `So $\\dfrac{I_1}{I_2} = 10^{\\frac{${b1} - ${b2}}{10}}$.`],
      solution: [`$${b1} - ${b2} = 10\\log \\dfrac{I_1}{I_2}$, so $\\log \\dfrac{I_1}{I_2} = ${fmt(d / 10)}$.`, `$\\dfrac{I_1}{I_2} = 10^{${fmt(d / 10)}} \\approx ${fx(ratio, 1)}$`, `The ${b1} dB sound is about ${fx(ratio, 1)} times as intense.`],
    };
  }
  const o = retry(
    () => ({ p1: rng.int(20, 45) / 10, d: rng.int(3, 25) / 10 }),
    ({ d }) => !Number.isInteger(d) && safeRound(10 ** d, 1),
  );
  const { p1, d } = o;
  const p2 = Math.round((p1 + d) * 10) / 10;
  const ratio = 10 ** d;
  const [s1, s2] = rng.sample(SOLUTIONS, 2);
  return {
    prompt: `${PH} ${cap(s1)} has a pH of ${fmt(p1)} and ${s2} has a pH of ${fmt(p2)}. How many times as great is the hydrogen ion concentration of the first? Round to the nearest tenth.`,
    parts: [numPart(ratio, { decimals: 1, suffix: 'times' })],
    hints: ['$\\left[\\text{H}^{+}\\right] = 10^{-\\text{pH}}$.', 'Divide the two concentrations; the powers of $10$ subtract.'],
    solution: [`$\\left[\\text{H}^{+}\\right]_1 = 10^{-${fmt(p1)}}$ and $\\left[\\text{H}^{+}\\right]_2 = 10^{-${fmt(p2)}}$.`, `$\\dfrac{10^{-${fmt(p1)}}}{10^{-${fmt(p2)}}} = 10^{${fmt(p2)} - ${fmt(p1)}} = 10^{${fmt(d)}} \\approx ${fx(ratio, 1)}$`, `The concentration is about ${fx(ratio, 1)} times as great.`],
  };
}

function apFindHalfLife(rng: Rng): GenOutput {
  const o = retry(
    () => {
      const A0 = rng.pick([50, 80, 100, 200, 400]);
      const A = Math.round(A0 * rng.int(10, 80)) / 100;
      const [t, unit] = rng.pick([
        [10, 'hours'], [24, 'hours'], [12, 'days'], [30, 'days'], [50, 'years'], [20, 'years'],
      ] as const);
      const h = (t * Math.log(0.5)) / Math.log(A / A0);
      return { A0, A, t, unit, h };
    },
    (o) => safeRound(o.h, 1) && o.A > 0 && o.A < o.A0,
  );
  const { A0, A, t, unit, h } = o;
  return {
    prompt: `A ${A0} mg sample of a radioactive isotope decays to ${fmt(A)} mg in ${t} ${unit}. The mass remaining after $t$ ${unit} is $A = A_0\\left(\\frac{1}{2}\\right)^{\\frac{t}{h}}$, where $A_0$ is the initial mass and $h$ is the half-life. Find the half-life, to the nearest tenth.`,
    parts: [numPart(h, { decimals: 1, suffix: unit })],
    hints: [`Substitute $A = ${fmt(A)}$, $A_0 = ${A0}$ and $t = ${t}$, then divide by $${A0}$.`, 'Take the logarithm of both sides and solve for $h$.'],
    solution: [
      `$${fmt(A)} = ${A0}\\left(\\frac{1}{2}\\right)^{\\frac{${t}}{h}}$, so $${fmt(A / A0, 4)} = 0.5^{\\frac{${t}}{h}}$.`,
      `$\\dfrac{${t}}{h}\\log 0.5 = \\log ${fmt(A / A0, 4)}$`,
      `$h = \\dfrac{${t}\\log 0.5}{\\log ${fmt(A / A0, 4)}} \\approx ${fx(h, 1)}$`,
      `The half-life is about ${fx(h, 1)} ${unit}.`,
    ],
  };
}

function apFindRate(rng: Rng): GenOutput {
  const o = retry(
    () => {
      const P = rng.int(8, 80) * 250;
      const n = rng.int(4, 15);
      const A = Math.round(P * rng.int(115, 220)) / 100;
      const i = (A / P) ** (1 / n) - 1;
      return { P, n, A, i };
    },
    (o) => safeRound(o.i * 100, 2) && o.i > 0.01 && o.i < 0.12,
  );
  const { P, n, A, i } = o;
  const name = rng.pick(NAMES);
  return {
    prompt: `${name}'s investment of ${tag(P)} grew to ${money(A)} in ${n} years, with interest compounded annually. ${COMPOUND} What annual interest rate did it earn? Give the rate as a percent, to the nearest hundredth.`,
    parts: [numPart(i * 100, { decimals: 2, suffix: '%' })],
    hints: [`Substitute and divide: $(1 + i)^{${n}} = \\dfrac{${mv(A)}}{${mv(P)}}$.`, `Take the ${n}th root of both sides (raise to the power $\\frac{1}{${n}}$).`],
    solution: [
      `$${mv(A)} = ${mv(P)}(1 + i)^{${n}}$, so $(1 + i)^{${n}} = ${fmt(A / P, 6)}$.`,
      `$1 + i = ${fmt(A / P, 6)}^{\\frac{1}{${n}}} \\approx ${fx(1 + i, 6)}$`,
      `$i \\approx ${fx(i, 6)}$, or about ${fx(i * 100, 2)}% per year.`,
    ],
  };
}

function apTwoTowns(rng: Rng): GenOutput {
  const o = retry(
    () => {
      const [t1, t2] = rng.sample(TOWNS, 2);
      const P1 = rng.int(40, 120) * 100;
      const P2 = P1 + rng.int(10, 80) * 100;
      const r1 = rng.pick([3, 3.5, 4, 4.5, 5, 6]);
      const r2 = rng.pick([0.5, 1, 1.5, 2, 2.5]);
      const t = Math.log(P2 / P1) / Math.log((1 + r1 / 100) / (1 + r2 / 100));
      return { t1, t2, P1, P2, r1, r2, t };
    },
    (o) => safeRound(o.t, 1) && o.t < 60,
  );
  const { t1, t2, P1, P2, r1, r2, t } = o;
  const c1 = fmt(1 + r1 / 100, 4);
  const c2 = fmt(1 + r2 / 100, 4);
  return {
    prompt: `${t1} has a population of ${prose(P1)} that is growing by ${fmt(r1)}% per year, so its population after $t$ years is $P = ${big(P1)}(${c1})^{t}$. ${t2} has a population of ${prose(P2)} growing by ${fmt(r2)}% per year: $P = ${big(P2)}(${c2})^{t}$. If these trends continue, after how many years will the two towns have the same population? Round to the nearest tenth of a year.`,
    parts: [numPart(t, { decimals: 1, suffix: 'years' })],
    hints: [`Set the two expressions equal and divide both sides by $${big(P1)}$ and by $(${c2})^{t}$.`, 'Take the logarithm of both sides and solve for $t$.'],
    solution: [
      `$${big(P1)}(${c1})^{t} = ${big(P2)}(${c2})^{t}$`,
      `$\\left(\\dfrac{${c1}}{${c2}}\\right)^{t} = \\dfrac{${big(P2)}}{${big(P1)}}$`,
      `$t = \\dfrac{\\log \\frac{${big(P2)}}{${big(P1)}}}{\\log \\frac{${c1}}{${c2}}} \\approx ${fx(t, 1)}$`,
      `After about ${fx(t, 1)} years.`,
    ],
  };
}

function apSolveLevel(rng: Rng): GenOutput {
  if (rng.chance(0.5)) {
    const o = retry(
      () => ({ M: rng.int(30, 60) / 10, k: rng.pick([5, 8, 12, 15, 20, 25, 40, 50, 60, 75, 150, 250, 400]) }),
      ({ M, k }) => safeRound(M + lg(k), 1),
    );
    const { M, k } = o;
    const MB = M + lg(k);
    return {
      prompt: `${QUAKE} An earthquake in the mountains had magnitude ${fmt(M)}. A later earthquake had an amplitude ${k} times as great. What was the magnitude of the later earthquake? Round to the nearest tenth.`,
      parts: [numPart(MB, { decimals: 1, label: '$M =$' })],
      hints: [`$\\dfrac{A_2}{A_1} = 10^{M_2 - M_1} = ${k}$.`, `So $M_2 - M_1 = \\log ${k}$.`],
      solution: [`$10^{M_2 - ${fmt(M)}} = ${k}$`, `$M_2 - ${fmt(M)} = \\log ${k} \\approx ${fx(lg(k), 4)}$`, `$M_2 \\approx ${fx(MB, 1)}$`],
    };
  }
  const o = retry(
    () => ({ k: rng.pick([3, 5, 6, 8, 12, 15, 20, 25, 40, 50, 200, 500]) }),
    ({ k }) => safeRound(10 * lg(k), 1),
  );
  const { k } = o;
  const inc = 10 * lg(k);
  return {
    prompt: `${DB} A sound system at an outdoor concert is turned up so that the intensity of the sound is ${k} times as great. By how many decibels does the sound level increase? Round to the nearest tenth.`,
    parts: [numPart(inc, { decimals: 1, suffix: 'dB' })],
    hints: ['$\\beta_2 - \\beta_1 = 10\\log \\dfrac{I_2}{I_0} - 10\\log \\dfrac{I_1}{I_0} = 10\\log \\dfrac{I_2}{I_1}$.', `Here $\\dfrac{I_2}{I_1} = ${k}$.`],
    solution: [`$\\beta_2 - \\beta_1 = 10\\log \\dfrac{I_2}{I_1}$ (quotient law)`, `$= 10\\log ${k} \\approx ${fx(inc, 1)}$`, `The level increases by about ${fx(inc, 1)} dB.`],
  };
}

const expLogApply = skill({
  id: 'm301-exp-log-apply',
  name: 'Exponential and logarithmic applications',
  description: 'Solve compound interest, half-life, doubling, earthquake, pH and decibel problems with the formula given, using logarithms to find an unknown exponent.',
  outcomes: ['RF10'],
  lessonId: 'm301-7-7',
  calculator: true,
  gen(rng, d): GenOutput {
    if (d === 1) {
      const kind = rng.pick(['money', 'half', 'ph', 'quake', 'db'] as const);
      if (kind === 'money') return apCompoundA(rng);
      if (kind === 'half') return apHalfAmount(rng);
      if (kind === 'ph') return apPH(rng);
      return kind === 'quake' ? apQuakeInt(rng) : apDecibel(rng);
    }
    if (d === 2) {
      const kind = rng.pick(['money', 'half', 'bacteria', 'compare'] as const);
      if (kind === 'money') return apCompoundTime(rng);
      if (kind === 'half') return apHalfTime(rng);
      return kind === 'bacteria' ? apBacteriaTime(rng) : apCompare(rng);
    }
    const kind = rng.pick(['halflife', 'rate', 'towns', 'level'] as const);
    if (kind === 'halflife') return apFindHalfLife(rng);
    if (kind === 'rate') return apFindRate(rng);
    return kind === 'towns' ? apTwoTowns(rng) : apSolveLevel(rng);
  },
});

export const EXPLOG_SKILLS: SkillDef[] = [expFeatures, expTransform, expCommonBase, logEvaluate, logExpForm, logGraph, logLaws, logEquation, expEquationLog, expLogApply];
