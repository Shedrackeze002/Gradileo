/** Math 30-1 Unit 8 — Rational Functions and Combining Functions (RF14, RF1). */
import { mc, mcFigures, niceNum, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fracText, gcd, roundTo, toFrac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { GridSpec, Part, PlaneFigure, PlaneLine, SkillDef, TableFigure } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Polynomials as ascending coefficient lists [c0, c1, c2, ...]
// ---------------------------------------------------------------------------

type P = number[];
type Pt = [number, number];
type Fn = (x: number) => number;

const clean = (x: number) => Math.round(x * 1e9) / 1e9 + 0;
const near = (a: number, b: number) => Math.abs(a - b) < 1e-9;

function trimP(p: P): P {
  const q = p.map(clean);
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
const degP = (p: P) => trimP(p).length - 1;
/** k(x − r1)(x − r2)… */
const fromRoots = (k: number, roots: number[]): P => pscale(roots.reduce<P>((acc, r) => pmul(acc, [-r, 1]), [1]), k);
/** f(g(x)) for polynomials. */
function pcompose(f: P, g: P): P {
  let out: P = [0];
  let pow: P = [1];
  for (const c of f) {
    out = padd(out, pscale(pow, c));
    pow = pmul(pow, g);
  }
  return out;
}

/** LaTeX for a polynomial, highest power first. */
function ptex(p: P, v = 'x'): string {
  const idx = p.map((_, i) => i).filter((i) => p[i] !== 0).reverse();
  if (!idx.length) return '0';
  let out = '';
  for (const i of idx) {
    const c = p[i];
    const a = Math.abs(c);
    const body = i === 0 ? '' : i === 1 ? v : `${v}^{${i}}`;
    const coef = body && a === 1 ? '' : fmt(a);
    out += out === '' ? `${c < 0 ? '-' : ''}${coef}${body}` : ` ${c < 0 ? '-' : '+'} ${coef}${body}`;
  }
  return out;
}
/** A polynomial as a student would type it: 2x^2 - 3x + 1. */
const ptxt = (p: P, v = 'x') => ptex(p, v).replace(/\^\{(\d+)\}/g, '^$1');
/** The terms of p written to follow another expression: " + 3x - 2". */
function cont(p: P, v = 'x'): string {
  const s = ptex(p, v);
  return s.startsWith('-') ? ` - ${s.slice(1)}` : ` + ${s}`;
}
/** p(x0) with the value substituted: 2(-3)^{2} - 5(-3) + 1. */
function subTex(p: P, x0: number): string {
  const idx = p.map((_, i) => i).filter((i) => p[i] !== 0).reverse();
  if (!idx.length) return '0';
  const xs = x0 < 0 ? `(${fmt(x0)})` : fmt(x0);
  let out = '';
  for (const i of idx) {
    const c = p[i];
    const a = Math.abs(c);
    const body = i === 0 ? '' : i === 1 ? (a === 1 && x0 >= 0 ? xs : `(${fmt(x0)})`) : `(${fmt(x0)})^{${i}}`;
    const coef = body && a === 1 ? '' : fmt(a);
    out += out === '' ? `${c < 0 ? '-' : ''}${coef}${body}` : ` ${c < 0 ? '-' : '+'} ${coef}${body}`;
  }
  return out;
}

// ---------------------------------------------------------------------------
// Numbers, factors and sets
// ---------------------------------------------------------------------------

const N = (x: number) => niceNum(clean(x));
/** A number as a student would type it (fractions as a/b). */
function T(x: number): string {
  const f = toFrac(clean(x), 1000);
  return f ? fracText(f) : fmt(x, 6);
}
const coefTex = (c: number) => (c === 1 ? '' : c === -1 ? '-' : N(c));
const coefTxt = (c: number) => (c === 1 ? '' : c === -1 ? '-' : T(c));
const plusC = (c: number) => (c === 0 ? '' : c < 0 ? ` - ${N(-c)}` : ` + ${N(c)}`);
const par = (x: number) => (x < 0 ? `(${N(x)})` : N(x));

/** x − r: "x - 3", "x + 2", "x". */
const lin = (r: number, v = 'x') => (r === 0 ? v : `${v} ${r < 0 ? '+' : '-'} ${N(Math.abs(r))}`);
const linTxt = (r: number, v = 'x') => (r === 0 ? v : `${v} ${r < 0 ? '+' : '-'} ${T(Math.abs(r))}`);

/** c(x − r1)(x − r2)… in LaTeX; a single factor with c = 1 needs no brackets, x comes first. */
function facTex(c: number, roots: number[], v = 'x'): string {
  const rs = [...roots].sort((p, q) => (p === 0 ? -1 : q === 0 ? 1 : 0));
  if (!rs.length) return N(c);
  const lone = rs.length === 1 && c === 1;
  return coefTex(c) + rs.map((r) => (r === 0 ? v : lone ? lin(r, v) : `(${lin(r, v)})`)).join('');
}

function uniqSorted(xs: number[]): number[] {
  const out: number[] = [];
  for (const x of xs) if (!out.some((y) => near(x, y))) out.push(clean(x));
  return out.sort((p, q) => p - q);
}

/** n distinct integers in [lo, hi], avoiding `exclude` (and 0 unless allowed). */
function distinctInts(rng: Rng, n: number, lo: number, hi: number, exclude: number[] = [], allowZero = true): number[] {
  const pool: number[] = [];
  for (let i = lo; i <= hi; i++) if ((allowZero || i !== 0) && !exclude.includes(i)) pool.push(i);
  return rng.sample(pool, n);
}

const REALS = '\\mathbb{R}';
/** Set-builder notation: {x | x ≠ 2, x ∈ R}. */
function setX(conds: string[], v = 'x'): string {
  return conds.length ? `$\\{${v} \\mid ${conds.join(',\\ ')},\\ ${v} \\in ${REALS}\\}$` : `$\\{${v} \\mid ${v} \\in ${REALS}\\}$`;
}
const neq = (vals: number[], v = 'x') => uniqSorted(vals).map((a) => `${v} \\ne ${N(a)}`);
const orList = (vals: number[], v = 'x') => uniqSorted(vals).map((a) => `$${v} = ${N(a)}$`).join(' or ');
const andList = (vals: number[], v = 'x') => uniqSorted(vals).map((a) => `$${v} = ${N(a)}$`).join(' and ');

function listText(ws: string[]): string {
  return ws.length <= 1 ? (ws[0] ?? '') : `${ws.slice(0, -1).join(', ')} and ${ws[ws.length - 1]}`;
}
/** x0 − r with the value substituted: "3 - (-2)", or just "3" when r = 0. */
const subLin = (x0: number, r: number) => (r === 0 ? N(x0) : `${N(x0)} - ${par(r)}`);
/** A point in LaTeX with exact coordinates. */
const ptTex = (x: number, y: number) => `(${N(x)}, ${N(y)})`;

const NAMES = ['Aisha', 'Mateo', 'Priya', 'Liam', 'Mei', 'Noah', 'Amara', 'Ethan', 'Sofia', 'Kiran', 'Jasmine', 'Owen', 'Fatima', 'Lucas', 'Hana', 'Dakota', 'Ravi', 'Chloe', 'Tariq', 'Émilie', 'Malik', 'Noor', 'Keira', 'Arjun'];

// ---------------------------------------------------------------------------
// Rational functions f(x) = k·Π(x − nr) / (m·Π(x − dr)) with distinct roots in each list
// ---------------------------------------------------------------------------

interface RF {
  k: number;
  nr: number[];
  m: number;
  dr: number[];
}
interface View {
  red: Fn;
  vas: number[];
  ha: number | null;
  holes: Pt[];
}
interface Info extends View {
  xints: number[];
  yint: number | null;
}

function info(r: RF): Info {
  const isHole = (x: number) => r.nr.some((n) => near(n, x)) && r.dr.some((d) => near(d, x));
  const num = r.nr.filter((n) => !isHole(n));
  const den = r.dr.filter((d) => !isHole(d));
  const red: Fn = (x) => (r.k * num.reduce((s, n) => s * (x - n), 1)) / (r.m * den.reduce((s, d) => s * (x - d), 1));
  const holes = uniqSorted(r.dr.filter(isHole)).map((h): Pt => [h, clean(red(h))]);
  const ha = r.nr.length < r.dr.length ? 0 : r.nr.length === r.dr.length ? clean(r.k / r.m) : null;
  const vas = uniqSorted(den);
  const at0 = vas.some((v) => near(v, 0)) || holes.some((h) => near(h[0], 0));
  return { red, vas, ha, holes, xints: uniqSorted(num), yint: at0 ? null : clean(red(0)) };
}
const numP = (r: RF) => fromRoots(r.k, r.nr);
const denP = (r: RF) => fromRoots(r.m, r.dr);
const rfTex = (r: RF) => `\\dfrac{${ptex(numP(r))}}{${ptex(denP(r))}}`;
const rfFacTex = (r: RF) => `\\dfrac{${facTex(r.k, r.nr)}}{${facTex(r.m, r.dr)}}`;

const SAMPLE_X = [-6.3, -4.7, -2.9, -1.3, 0.45, 1.7, 3.3, 5.1, 6.6];
function sameFn(f: Fn, g: Fn): boolean {
  return SAMPLE_X.every((x) => {
    const a = f(x);
    const b = g(x);
    if (!Number.isFinite(a) || !Number.isFinite(b)) return !Number.isFinite(a) && !Number.isFinite(b);
    return Math.abs(a - b) < 1e-9 * Math.max(1, Math.abs(a));
  });
}
/** Same graph: same curve and the same holes. */
function sameView(a: View, b: View): boolean {
  return sameFn(a.red, b.red) && a.holes.length === b.holes.length && a.holes.every((h, i) => near(h[0], b.holes[i][0]));
}

// ---------------------------------------------------------------------------
// Graphs
// ---------------------------------------------------------------------------

const r3 = (x: number) => Math.round(x * 1000) / 1000 + 0;
const GRID: GridSpec = { xMin: -8, xMax: 8, yMin: -8, yMax: 8 };

/**
 * Sample a function as polylines clipped to the grid. Branches are split at `breaks`
 * (vertical asymptotes), and each polyline stops exactly where the curve leaves the window.
 */
function curve(f: Fn, g: GridSpec, opts: { breaks?: number[]; extra?: number[] } = {}): Pt[][] {
  const breaks = (opts.breaks ?? []).filter((b) => b > g.xMin && b < g.xMax).sort((a, b) => a - b);
  const edges = [g.xMin, ...breaks, g.xMax];
  const inside = (y: number) => Number.isFinite(y) && y >= g.yMin - 1e-9 && y <= g.yMax + 1e-9;
  const out: Pt[][] = [];
  for (let i = 0; i < edges.length - 1; i++) {
    const a = edges[i] + (i > 0 ? 1e-6 : 0);
    const b = edges[i + 1] - (i < edges.length - 2 ? 1e-6 : 0);
    const m = Math.max(16, Math.round((160 * (b - a)) / (g.xMax - g.xMin)));
    const xs: number[] = [];
    for (let k = 0; k <= m; k++) xs.push(a + ((b - a) * k) / m);
    for (const e of opts.extra ?? []) if (e > a && e < b) xs.push(e);
    xs.sort((p, q) => p - q);
    let cur: Pt[] = [];
    for (let k = 0; k < xs.length; k++) {
      const y = f(xs[k]);
      const inNow = inside(y);
      if (k > 0) {
        const yp = f(xs[k - 1]);
        const inPrev = inside(yp);
        if (inPrev !== inNow) {
          const outside = inNow ? yp : y;
          const target = outside > g.yMax ? g.yMax : g.yMin;
          let lo = xs[k - 1];
          let hi = xs[k];
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
      if (inNow) cur.push([r3(xs[k]), r3(y)]);
    }
    if (cur.length > 1) out.push(cur);
  }
  return out;
}

const vLine = (x: number): PlaneLine => ({ line: { A: 1, B: 0, C: -x }, dashed: true, color: 'muted' });
const hLine = (y: number): PlaneLine => ({ line: { A: 0, B: 1, C: -y }, dashed: true, color: 'muted' });

/** A rational function's graph: branches split at the vertical asymptotes, holes as open circles, asymptotes dashed. */
function ratFig(v: View, opts: { asym?: boolean; grid?: GridSpec } = {}): PlaneFigure {
  const grid = opts.grid ?? GRID;
  const polylines = curve(v.red, grid, { breaks: v.vas, extra: v.holes.map((h) => h[0]) }).map((points) => ({ points }));
  const fig: PlaneFigure = { type: 'plane', grid, polylines };
  if (opts.asym ?? true) {
    const lines = v.vas.map(vLine);
    // A horizontal asymptote is only drawn beside a vertical one (a constant graph with holes has none to show).
    if (v.ha !== null && v.ha !== 0 && v.vas.length) lines.push(hLine(v.ha));
    if (lines.length) fig.lines = lines;
  }
  if (v.holes.length) fig.points = v.holes.map(([x, y]) => ({ x, y: r3(y), open: true }));
  return fig;
}
const holesFit = (v: View, lim = 7) => v.holes.every(([, y]) => Math.abs(y) <= lim);

/** y = a/(x − h) + k */
const hyper = (a: number, h: number, k: number): View => ({ red: (x) => a / (x - h) + k, vas: [h], ha: k, holes: [] });
const hyperTex = (a: number, h: number, k: number, y = 'y') => `${y} = ${a < 0 ? '-' : ''}\\dfrac{${N(Math.abs(a))}}{${lin(h)}}${plusC(k)}`;

// Answer parts used throughout.
const vaPart = (x: number, v = 'x') => numPart(x, { label: `Vertical asymptote: $${v} =$` });
const haPart = (y: number, v = 'y') => numPart(y, { label: `Horizontal asymptote: $${v} =$` });
const vasPart = (xs: number[]) => part({ kind: 'numbers', values: xs }, { label: 'Vertical asymptotes: $x =$', placeholder: 'e.g. 3, -2 or none' });
const holePart = (x: number, y: number) => part({ kind: 'point', x, y }, { label: 'Point of discontinuity', placeholder: '(x, y)' });
const xintPart = (xs: number[]) => part({ kind: 'numbers', values: xs }, { label: '$x$-intercepts', placeholder: 'e.g. 3, -2 or none' });
const solPart = (xs: number[]) => part({ kind: 'numbers', values: xs }, { label: 'Solution(s): $x =$', placeholder: 'e.g. 3, -2 or none' });
const exprPart = (expected: string, label: string, form: 'any' | 'expanded' = 'any'): Part => part({ kind: 'expression', expected, form }, { label });

/** The degree comparison that gives the horizontal asymptote. */
function haReason(r: RF): string {
  const dn = r.nr.length;
  const dd = r.dr.length;
  if (dn < dd) return `The numerator has degree $${dn}$ and the denominator has degree $${dd}$. When the denominator has the greater degree, $f(x)$ approaches $0$ as $|x|$ grows: the horizontal asymptote is $y = 0$.`;
  const ratio = r.m === 1 ? N(r.k) : Number.isInteger(r.k / r.m) || gcd(r.k, r.m) !== 1 || r.m < 0 ? `\\dfrac{${N(r.k)}}{${N(r.m)}} = ${N(r.k / r.m)}` : `\\dfrac{${N(r.k)}}{${N(r.m)}}`;
  if (dn === dd) return `The numerator and denominator both have degree $${dn}$, so the horizontal asymptote is the ratio of the leading coefficients: $y = ${ratio}$.`;
  return 'The numerator has the greater degree, so there is no horizontal asymptote.';
}

// ---------------------------------------------------------------------------
// 8.1 — Asymptotes, points of discontinuity, intercepts and domain
// ---------------------------------------------------------------------------

type FeatKind = 'transform' | 'linLin' | 'factoredVA' | 'domainSimple' | 'holeLine' | 'holeVA' | 'domain' | 'intercepts' | 'linLinGen' | 'full' | 'rewrite' | 'whichTrue' | 'context';

const rationalFeatures = skill({
  id: 'm301-rational-features',
  name: 'Asymptotes and points of discontinuity',
  description: 'Find the vertical and horizontal asymptotes, points of discontinuity, intercepts and domain of a rational function.',
  outcomes: ['RF14'],
  lessonId: 'm301-8-1',
  gen(rng, d): GenOutput {
    const kind: FeatKind =
      d === 1
        ? rng.weighted<FeatKind>([['transform', 3], ['linLin', 3], ['factoredVA', 2], ['domainSimple', 2]])
        : d === 2
          ? rng.weighted<FeatKind>([['holeLine', 2], ['holeVA', 3], ['domain', 2], ['intercepts', 2], ['linLinGen', 1]])
          : rng.weighted<FeatKind>([['full', 3], ['rewrite', 2], ['whichTrue', 2], ['context', 2]]);

    if (kind === 'transform') {
      const a = rng.pick([1, 2, 3, 4, 5, 6, -1, -2, -3, -4]);
      const h = rng.nonZero(-6, 6);
      const k = rng.int(-5, 5);
      const eq = hyperTex(a, h, k);
      return {
        prompt: `State the equations of the vertical and horizontal asymptotes of $${eq}$.`,
        parts: [vaPart(h), haPart(k)],
        hints: ['Compare with $y = \\dfrac{a}{x - h} + k$, which is $y = \\dfrac{1}{x}$ stretched and translated.', 'The asymptotes $x = 0$ and $y = 0$ of $y = \\dfrac{1}{x}$ move $h$ units horizontally and $k$ units vertically.'],
        solution: [
          `The equation has the form $y = \\dfrac{a}{x - h} + k$ with $a = ${a}$, $h = ${h}$ and $k = ${k}$.`,
          `The denominator $${lin(h)}$ is $0$ when $x = ${h}$, so the function is undefined there: the vertical asymptote is $x = ${h}$.`,
          `As $|x|$ grows, $\\dfrac{${a}}{${lin(h)}}$ gets closer and closer to $0$, so $y$ approaches $${k}$: the horizontal asymptote is $y = ${k}$.`,
        ],
        answerDisplay: `$x = ${h}$ and $y = ${k}$`,
      };
    }

    if (kind === 'linLin') {
      const a = rng.pick([1, 2, 3, 4, -1, -2, -3]);
      const h = rng.nonZero(-6, 6);
      const b = retry(() => rng.nonZero(-9, 9), (b) => a * h + b !== 0);
      const num: P = [b, a];
      const f = `\\dfrac{${ptex(num)}}{${lin(h)}}`;
      return {
        prompt: `Find the equations of the vertical and horizontal asymptotes of $f(x) = ${f}$.`,
        parts: [vaPart(h), haPart(a)],
        hints: ['A vertical asymptote occurs where the denominator is $0$ but the numerator is not.', 'When the numerator and denominator have the same degree, the horizontal asymptote is $y = \\dfrac{\\text{leading coefficient of the numerator}}{\\text{leading coefficient of the denominator}}$.'],
        solution: [
          `The denominator $${lin(h)}$ is $0$ when $x = ${h}$. The numerator there is $${subTex(num, h)} = ${a * h + b} \\ne 0$, so $x = ${h}$ is a vertical asymptote.`,
          `Both the numerator and the denominator have degree $1$. For large $|x|$, $f(x) \\approx \\dfrac{${coefTex(a)}x}{x} = ${a}$, so the horizontal asymptote is $y = ${a}$.`,
        ],
        answerDisplay: `$x = ${h}$ and $y = ${a}$`,
      };
    }

    if (kind === 'factoredVA') {
      const [p, q] = distinctInts(rng, 2, -6, 6).sort((m, n) => m - n);
      const withNum = rng.chance(0.5);
      const c = rng.pick([1, 2, 3, 4, 5, -1, -2, -3]);
      const r = rng.intExcept(-6, 6, [p, q]);
      const num = withNum ? facTex(c, [r]) : N(c);
      const den = facTex(1, [p, q]);
      return {
        prompt: `Find the vertical asymptotes and the horizontal asymptote of $f(x) = \\dfrac{${num}}{${den}}$. Enter the vertical asymptotes as $x$-values separated by commas.`,
        parts: [vasPart([p, q]), haPart(0)],
        hints: ['Vertical asymptotes occur where a factor of the denominator is $0$ and does not cancel with the numerator.', 'Compare the degree of the numerator with the degree of the denominator.'],
        solution: [
          `The denominator $${den}$ is $0$ when ${orList([p, q])}.`,
          withNum
            ? `The numerator $${num}$ is $0$ only at $x = ${r}$, so nothing cancels: the vertical asymptotes are ${andList([p, q])}.`
            : `The numerator is the constant $${c}$, which is never $0$, so the vertical asymptotes are ${andList([p, q])}.`,
          `The numerator has degree $${withNum ? 1 : 0}$ and the denominator has degree $2$. When the denominator has the greater degree, $f(x)$ approaches $0$ as $|x|$ grows: the horizontal asymptote is $y = 0$.`,
        ],
        answerDisplay: `${andList([p, q])}; $y = 0$`,
      };
    }

    if (kind === 'domainSimple') {
      if (rng.chance(0.5)) {
        const h = rng.nonZero(-7, 7);
        const b = rng.intExcept(-9, 9, [0, -h, h]);
        const f = `\\dfrac{${ptex([b, 1])}}{${lin(h)}}`;
        return {
          prompt: `What is the domain of $f(x) = ${f}$?`,
          parts: [part(mc(rng, setX(neq([h])), [setX(neq([-h])), setX(neq([-b])), setX([])]))],
          hints: ['A rational function is undefined wherever its denominator is $0$.', `Solve $${lin(h)} = 0$.`],
          solution: [`The denominator $${lin(h)}$ is $0$ when $x = ${h}$, so $f(${h})$ is undefined.`, 'Every other real number can be substituted (the numerator may be $0$, which is fine).', `The domain is ${setX(neq([h]))}.`],
        };
      }
      const [pp, qq] = retry(
        () => distinctInts(rng, 2, -6, 6, [], false).sort((m, n) => m - n),
        ([m, n]) => m !== -n,
      );
      const c = rng.pick([1, 2, 3, 5, -1, -4]);
      const den = ptex(fromRoots(1, [pp, qq]));
      return {
        prompt: `What is the domain of $f(x) = \\dfrac{${c}}{${den}}$?`,
        parts: [part(mc(rng, setX(neq([pp, qq])), [setX(neq([-pp, -qq])), setX(neq([qq])), setX([]), setX(neq([pp]))]))],
        hints: ['A rational function is undefined wherever its denominator is $0$.', 'Factor the denominator and set each factor equal to $0$.'],
        solution: [`Factor the denominator: $${den} = ${facTex(1, [pp, qq])}$.`, `It is $0$ when ${orList([pp, qq])}, so the function is undefined at both values.`, `The domain is ${setX(neq([pp, qq]))}.`],
      };
    }

    if (kind === 'holeLine') {
      const a = rng.nonZero(-6, 6);
      const r = rng.intExcept(-6, 6, [a]);
      const m = a > 0 ? rng.pick([1, 1, 2, -1]) : rng.pick([1, 1, 2, 3]);
      const rf: RF = { k: 1, nr: [a, r], m, dr: [a] };
      const denT = m === -1 ? `${a} - x` : ptex(denP(rf));
      const y = clean((a - r) / m);
      const simp = m === 1 ? lin(r) : m === -1 ? `-(${lin(r)})` : `\\dfrac{${lin(r)}}{${m}}`;
      const subst = m === 1 ? subLin(a, r) : m === -1 ? `-(${subLin(a, r)})` : `\\dfrac{${subLin(a, r)}}{${m}}`;
      return {
        prompt: `The graph of $f(x) = \\dfrac{${ptex(numP(rf))}}{${denT}}$ is a line with one point missing. Find the coordinates of the point of discontinuity.`,
        parts: [holePart(a, y)],
        answerDisplay: `$${ptTex(a, y)}$`,
        hints: ['Factor the numerator and look for a factor that is also in the denominator.', 'Cancel the common factor, then substitute the $x$-value that makes it $0$ into the simplified expression.'],
        solution: [
          `Factor: $f(x) = ${rfFacTex(rf)}$.`,
          `The factor $${lin(a)}$ cancels: $f(x) = ${simp}$, $x \\ne ${a}$.`,
          `$x = ${a}$ is not in the domain, so the graph has a hole there. Its $y$-coordinate comes from the simplified expression: $y = ${subst} = ${N(y)}$.`,
          `The point of discontinuity is $${ptTex(a, y)}$.`,
        ],
      };
    }

    if (kind === 'holeVA' || kind === 'domain') {
      const [a, r, h] = distinctInts(rng, 3, -5, 5);
      const k = rng.pick([1, 1, 2, 3, -1, -2]);
      const rf: RF = { k, nr: [a, r], m: 1, dr: [a, h] };
      const inf = info(rf);
      const yh = inf.holes[0][1];
      const reduced = `\\dfrac{${facTex(k, [r])}}{${lin(h)}}`;
      if (kind === 'holeVA') {
        return {
          prompt: `For $f(x) = ${rfTex(rf)}$, find the point of discontinuity and the equations of the vertical and horizontal asymptotes.`,
          parts: [holePart(a, yh), vaPart(h), haPart(k)],
          answerDisplay: `hole $${ptTex(a, yh)}$; $x = ${h}$; $y = ${k}$`,
          hints: ['Factor the numerator and the denominator. A factor that cancels gives a point of discontinuity; a factor left in the denominator gives a vertical asymptote.', 'Find the $y$-coordinate of the hole by substituting into the simplified function.'],
          solution: [
            `Factor: $f(x) = ${rfFacTex(rf)}$.`,
            `The common factor $${lin(a)}$ cancels: $f(x) = ${reduced}$, $x \\ne ${a}$.`,
            `Point of discontinuity: substitute $x = ${a}$ into the simplified function: $y = \\dfrac{${k === 1 ? subLin(a, r) : `${coefTex(k)}(${subLin(a, r)})`}}{${subLin(a, h)}} = ${N(yh)}$. The hole is at $${ptTex(a, yh)}$.`,
            `Vertical asymptote: the factor $${lin(h)}$ is still in the denominator, so $x = ${h}$.`,
            haReason(rf),
          ],
        };
      }
      return {
        prompt: `What is the domain of $f(x) = ${rfTex(rf)}$?`,
        parts: [part(mc(rng, setX(neq([a, h])), rng.shuffle([setX(neq([h])), setX(neq([-a, -h])), setX(neq([a, r])), setX([])])))],
        hints: ['The domain excludes every value that makes the original denominator $0$, even if the factor later cancels.', 'Factor the denominator.'],
        solution: [
          `Factor the denominator: $${ptex(denP(rf))} = ${facTex(1, [a, h])}$. It is $0$ when ${orList([a, h])}.`,
          `After cancelling, $f(x) = ${reduced}$, but the original function is still undefined at $x = ${a}$: the graph has a hole there, and a vertical asymptote at $x = ${h}$.`,
          `The domain is ${setX(neq([a, h]))}.`,
        ],
      };
    }

    if (kind === 'intercepts') {
      const variant = rng.weighted([['hole', 3], ['two', 2], ['none', 1]] as const);
      const [p, q] = distinctInts(rng, 2, -5, 5, [], false);
      let rf: RF;
      if (variant === 'hole') rf = { k: rng.pick([1, 1, 2, -1]), nr: [p, rng.intExcept(-6, 6, [p, q])], m: 1, dr: [p, q] };
      else if (variant === 'two') rf = { k: rng.pick([1, 1, 2, -1]), nr: distinctInts(rng, 2, -6, 6, [p, q]), m: 1, dr: [p, q] };
      else rf = { k: rng.pick([2, 3, 4, 6, -3, -5]), nr: [], m: 1, dr: [p, q] };
      const inf = info(rf);
      const y0 = inf.yint!;
      const n0 = numP(rf)[0];
      const d0 = denP(rf)[0];
      const steps: string[] = [];
      if (variant === 'none') {
        steps.push(`The numerator is the constant $${rf.k}$, which is never $0$, so the graph has no $x$-intercepts.`);
      } else {
        steps.push(`Factor: $f(x) = ${rfFacTex(rf)}$.`);
        if (variant === 'hole') {
          steps.push(`The factor $${lin(p)}$ cancels, so $x = ${p}$ gives a point of discontinuity, not an $x$-intercept: $f(x) = \\dfrac{${facTex(rf.k, inf.xints)}}{${lin(q)}}$, $x \\ne ${p}$.`);
          steps.push(`The simplified numerator is $0$ when $x = ${inf.xints[0]}$, so the only $x$-intercept is $${inf.xints[0]}$.`);
        } else {
          steps.push(`No factor cancels. The numerator is $0$ when ${orList(inf.xints)}, and the denominator is not $0$ there, so the $x$-intercepts are $${inf.xints[0]}$ and $${inf.xints[1]}$.`);
        }
      }
      steps.push(`$y$-intercept: $f(0) = \\dfrac{${fmt(n0)}}{${fmt(d0)}} = ${N(y0)}$.`);
      return {
        prompt: `Find the $x$-intercepts and the $y$-intercept of the graph of $f(x) = ${rfTex(rf)}$. Enter the $x$-intercepts separated by commas, or type *none*.`,
        parts: [xintPart(inf.xints), numPart(y0, { label: '$y$-intercept' })],
        hints: ['$x$-intercepts are zeros of the numerator that do not cancel with a factor of the denominator.', 'The $y$-intercept is $f(0)$.'],
        solution: steps,
      };
    }

    if (kind === 'linLinGen') {
      const c = rng.pick([2, 3, 4, -2]);
      const a = rng.pick([1, 2, 3, 5, 6, -1, -3]);
      const e = rng.nonZero(-9, 9);
      const b = retry(() => rng.nonZero(-9, 9), (b) => b * c !== a * e);
      const va = clean(-e / c);
      const ha = clean(a / c);
      return {
        prompt: `Find the equations of the vertical and horizontal asymptotes of $f(x) = \\dfrac{${ptex([b, a])}}{${ptex([e, c])}}$. Give exact values.`,
        parts: [vaPart(va), haPart(ha)],
        hints: ['Set the denominator equal to $0$ (and check the numerator is not also $0$ there).', 'The degrees are equal, so divide the leading coefficients.'],
        solution: [
          `$${ptex([e, c])} = 0$ gives $x = ${N(va)}$. The numerator is not $0$ there, so the vertical asymptote is $x = ${N(va)}$.`,
          `Both have degree $1$; for large $|x|$, $f(x) \\approx \\dfrac{${coefTex(a)}x}{${coefTex(c)}x} = ${N(ha)}$. The horizontal asymptote is $y = ${N(ha)}$.`,
        ],
        answerDisplay: `$x = ${N(va)}$ and $y = ${N(ha)}$`,
      };
    }

    if (kind === 'full') {
      if (rng.chance(0.6)) {
        // A hole plus one vertical asymptote, with a non-monic factor or a leading constant.
        const style = rng.pick(['numNonMonic', 'denNonMonic', 'constant'] as const);
        const a = rng.nonZero(-5, 5);
        let rf: RF;
        let numFac: string;
        let denFac: string;
        let redNum: string;
        let redDen: string;
        if (style === 'numNonMonic') {
          const p = rng.pick([2, 3]);
          const q = retry(() => rng.nonZero(-7, 7), (q) => q % p !== 0 && -q / p !== a);
          const h = rng.intExcept(-5, 5, [a]);
          rf = { k: p, nr: [a, -q / p], m: 1, dr: [a, h] };
          numFac = `(${ptex([q, p])})(${lin(a)})`;
          denFac = facTex(1, [a, h]);
          redNum = ptex([q, p]);
          redDen = lin(h);
        } else if (style === 'denNonMonic') {
          const p = rng.pick([2, 3]);
          const q = retry(() => rng.nonZero(-7, 7), (q) => q % p !== 0);
          const r = rng.intExcept(-5, 5, [a]);
          rf = { k: 1, nr: [a, r], m: p, dr: [a, -q / p] };
          numFac = facTex(1, [a, r]);
          denFac = `(${ptex([q, p])})(${lin(a)})`;
          redNum = lin(r);
          redDen = ptex([q, p]);
        } else {
          const k = rng.pick([2, 3, -2]);
          const [r, h] = distinctInts(rng, 2, -5, 5, [a]);
          rf = { k, nr: [a, r], m: 1, dr: [a, h] };
          numFac = facTex(k, [a, r]);
          denFac = facTex(1, [a, h]);
          redNum = facTex(k, [r]);
          redDen = lin(h);
        }
        const inf = info(rf);
        const [hx, hy] = inf.holes[0];
        const va = inf.vas[0];
        const xi = inf.xints[0];
        const redTex = `\\dfrac{${redNum}}{${redDen}}`;
        return {
          prompt: `For $f(x) = ${rfTex(rf)}$, find the point of discontinuity, the vertical asymptote, the horizontal asymptote and the $x$-intercept. Give exact values.`,
          parts: [holePart(hx, hy), vaPart(va), haPart(inf.ha!), numPart(xi, { label: '$x$-intercept' })],
          answerDisplay: `hole $${ptTex(hx, hy)}$; $x = ${N(va)}$; $y = ${N(inf.ha!)}$; $x$-intercept $${N(xi)}$`,
          hints: ['Factor the numerator and the denominator completely, then cancel the common factor.', 'Use the simplified function for the hole, the vertical asymptote and the $x$-intercept, and the leading coefficients for the horizontal asymptote.'],
          solution: [
            `Factor: $f(x) = \\dfrac{${numFac}}{${denFac}}$.`,
            `The common factor $${lin(a)}$ cancels: $f(x) = ${redTex}$, $x \\ne ${a}$.`,
            `Point of discontinuity: substituting $x = ${a}$ into the simplified function gives $y = ${N(hy)}$, so the hole is at $${ptTex(a, hy)}$.`,
            `Vertical asymptote: the remaining denominator is $0$ when $x = ${N(va)}$. $x$-intercept: the remaining numerator is $0$ when $x = ${N(xi)}$.`,
            haReason(rf),
          ],
        };
      }
      // Two vertical asymptotes, no hole.
      const [p, q] = distinctInts(rng, 2, -5, 5).sort((m, n) => m - n);
      const two = rng.chance(0.6);
      const k = rng.pick([1, 2, 3, -1, -2]);
      const nr = two ? distinctInts(rng, 2, -6, 6, [p, q]).sort((m, n) => m - n) : [rng.intExcept(-6, 6, [p, q])];
      const rf: RF = { k, nr, m: 1, dr: [p, q] };
      return {
        prompt: `For $f(x) = ${rfTex(rf)}$, find the vertical asymptotes, the horizontal asymptote and the $x$-intercepts. Enter lists of values separated by commas.`,
        parts: [vasPart([p, q]), haPart(two ? k : 0), xintPart(nr)],
        hints: ['Factor the numerator and the denominator. Check whether any factor cancels.', 'Compare the degrees of the numerator and the denominator for the horizontal asymptote.'],
        solution: [
          `Factor: $f(x) = ${rfFacTex(rf)}$. No factor is common, so there are no points of discontinuity.`,
          `The denominator is $0$ when ${orList([p, q])}: these are the vertical asymptotes.`,
          `The numerator is $0$ when ${orList(nr)}: ${nr.length === 1 ? 'this is the $x$-intercept' : 'these are the $x$-intercepts'}.`,
          haReason(rf),
        ],
      };
    }

    if (kind === 'rewrite') {
      const p = rng.pick([1, 2, 3, 4, -1, -2]);
      const h = rng.nonZero(-5, 5);
      const q = retry(() => rng.nonZero(-12, 12), (q) => q + p * h !== 0);
      const A = q + p * h;
      const num: P = [q, p];
      return {
        prompt: `Write $f(x) = \\dfrac{${ptex(num)}}{${lin(h)}}$ in the form $y = \\dfrac{a}{x - h} + k$. State the values of $a$, $h$ and $k$.`,
        parts: [numPart(A, { label: '$a =$' }), numPart(h, { label: '$h =$' }), numPart(p, { label: '$k =$' })],
        hints: [`Write the numerator as a multiple of $${lin(h)}$ plus a remainder.`, `$${ptex(num)} = ${coefTex(p)}(${lin(h)}) + \\square$. Then split the fraction into two parts.`],
        solution: [
          `Rewrite the numerator using the denominator: $${ptex(num)} = ${coefTex(p)}(${lin(h)})${plusC(A)}$.`,
          `Split the fraction: $f(x) = \\dfrac{${coefTex(p)}(${lin(h)})}{${lin(h)}} + \\dfrac{${A}}{${lin(h)}} = \\dfrac{${A}}{${lin(h)}}${plusC(p)}$.`,
          `So $a = ${A}$, $h = ${h}$ and $k = ${p}$. The graph is $y = \\dfrac{1}{x}$ ${listText([...(Math.abs(A) === 1 ? [] : [`stretched vertically by a factor of $${Math.abs(A)}$`]), ...(A < 0 ? ['reflected in the $x$-axis'] : []), `translated $${Math.abs(h)}$ ${h > 0 ? 'right' : 'left'} and $${Math.abs(p)}$ ${p > 0 ? 'up' : 'down'}`])}, so its asymptotes are $x = ${h}$ and $y = ${p}$.`,
        ],
        answerDisplay: `$a = ${A}$, $h = ${h}$, $k = ${p}$`,
      };
    }

    if (kind === 'whichTrue') {
      const [a, r, h] = distinctInts(rng, 3, -5, 5);
      const k = rng.pick([1, 1, 2, -1]);
      const rf: RF = { k, nr: [a, r], m: 1, dr: [a, h] };
      const yh = info(rf).holes[0][1];
      const swapY = clean((k * (h - r)) / (h - a));
      const correct = `It has a point of discontinuity at $(${a}, ${N(yh)})$ and a vertical asymptote $x = ${h}$.`;
      const ds = rng.shuffle([
        `It has vertical asymptotes $x = ${Math.min(a, h)}$ and $x = ${Math.max(a, h)}$, and no points of discontinuity.`,
        `It has two $x$-intercepts, $${Math.min(a, r)}$ and $${Math.max(a, r)}$.`,
        `It has a point of discontinuity at $(${a}, 0)$ and a vertical asymptote $x = ${h}$.`,
        `It has a point of discontinuity at $(${h}, ${N(swapY)})$ and a vertical asymptote $x = ${a}$.`,
        `Its horizontal asymptote is $y = 0$.`,
      ]);
      return {
        prompt: `Which statement about the graph of $f(x) = ${rfTex(rf)}$ is true?`,
        parts: [part(mc(rng, correct, ds))],
        hints: ['Factor the numerator and the denominator completely.', 'A factor that cancels gives a point of discontinuity (not an asymptote or an intercept); find its $y$-coordinate from the simplified function.'],
        solution: [
          `Factor: $f(x) = ${rfFacTex(rf)} = \\dfrac{${facTex(k, [r])}}{${lin(h)}}$, $x \\ne ${a}$.`,
          `The cancelled factor gives a point of discontinuity at $x = ${a}$, with $y = ${N(yh)}$ from the simplified function. It is not an $x$-intercept.`,
          `The factor $${lin(h)}$ remains in the denominator, so $x = ${h}$ is a vertical asymptote. The degrees are equal, so the horizontal asymptote is $y = ${k}$.`,
          `The true statement: ${correct}`,
        ],
      };
    }

    // context
    const ctx = rng.pick(['lens', 'tank', 'fish'] as const);
    if (ctx === 'lens') {
      const fl = rng.pick([4, 5, 6, 8, 10, 12, 15, 20]);
      const d0 = retry(
        () => fl + rng.int(1, 3 * fl),
        (d0) => {
          const v = (fl * d0) / (d0 - fl);
          const frac10 = (v * 10) % 1;
          return Math.abs(frac10 - 0.5) > 0.05 && v < 400;
        },
      );
      const di = (fl * d0) / (d0 - fl);
      return {
        prompt: `For a thin converging lens with a focal length of $${fl}$ cm, an object placed $d$ centimetres from the lens forms an image $d_i(d) = \\dfrac{${fl}d}{d - ${fl}}$ centimetres from the lens, for $d > ${fl}$.\n\nState the equations of the vertical and horizontal asymptotes of this function, and find the image distance for an object $${d0}$ cm from the lens, to the nearest tenth of a centimetre.`,
        parts: [vaPart(fl, 'd'), haPart(fl, 'd_i'), numPart(di, { label: `$d_i(${d0})$`, decimals: 1, suffix: 'cm' })],
        hints: ['The vertical asymptote is where the denominator is $0$; the horizontal asymptote comes from comparing the leading coefficients.', `Substitute $d = ${d0}$.`],
        solution: [
          `Vertical asymptote: $d - ${fl} = 0$ when $d = ${fl}$. As the object moves toward the focal point, the image moves farther and farther away.`,
          `Horizontal asymptote: numerator and denominator both have degree $1$, so $d_i = \\dfrac{${fl}}{1} = ${fl}$. Light from a very distant object focuses at the focal point.`,
          `$d_i(${d0}) = \\dfrac{${fl}(${d0})}{${d0} - ${fl}} = \\dfrac{${fl * d0}}{${d0 - fl}} \\approx ${roundTo(di, 1).toFixed(1)}$ cm.`,
        ],
        calculator: true,
      };
    }
    if (ctx === 'tank') {
      const V0 = rng.pick([200, 400, 500, 800, 1000]);
      const rate = rng.pick([5, 10, 20, 25]);
      const c = rng.pick([20, 25, 30, 40, 50, 60]);
      const t1 = retry(
        () => rng.pick([5, 10, 15, 20, 30, 40, 60]),
        (t) => {
          const v = (c * rate * t) / (V0 + rate * t);
          return Math.abs(((v * 10) % 1) - 0.5) > 0.05;
        },
      );
      const C1 = (c * rate * t1) / (V0 + rate * t1);
      return {
        prompt: `A tank holds $${V0}$ L of pure water. Brine containing $${c}$ g of salt per litre is pumped in at $${rate}$ L/min. The concentration of salt in the tank after $t$ minutes is $C(t) = \\dfrac{${c * rate}t}{${V0} + ${rate}t}$ grams per litre.\n\nWhat concentration does the tank approach in the long run (the horizontal asymptote), and what is the concentration after $${t1}$ min, to the nearest tenth?`,
        parts: [numPart(c, { label: 'Horizontal asymptote: $C =$', suffix: 'g/L' }), numPart(C1, { label: `$C(${t1})$`, decimals: 1, suffix: 'g/L' })],
        hints: ['Numerator and denominator both have degree $1$ in $t$: divide the leading coefficients.', `Substitute $t = ${t1}$.`],
        solution: [
          `For large $t$, $C(t) \\approx \\dfrac{${c * rate}t}{${rate}t} = ${c}$. The horizontal asymptote is $C = ${c}$: the tank approaches the concentration of the incoming brine, $${c}$ g/L.`,
          `$C(${t1}) = \\dfrac{${c * rate}(${t1})}{${V0} + ${rate}(${t1})} = \\dfrac{${c * rate * t1}}{${V0 + rate * t1}} \\approx ${roundTo(C1, 1).toFixed(1)}$ g/L.`,
          `(The vertical asymptote $t = ${-V0 / rate}$ is outside the domain $t \\ge 0$, so it does not affect the situation.)`,
        ],
        calculator: true,
      };
    }
    const s = rng.pick([2, 3, 4, 5, 10]);
    const N0 = rng.pick([120, 150, 200, 250, 300, 400]);
    const L = rng.pick([800, 900, 1200, 1500, 2000, 2400]);
    const lake = rng.pick(['Pinewood Lake', 'Willow Lake', 'Heron Lake', 'Stonebridge Reservoir', 'Maple Lake', 'Crystal Lake']);
    return {
      prompt: `Biologists stock ${lake} with trout. They model the population after $t$ years with $P(t) = \\dfrac{${N0 * s} + ${L}t}{${s} + t}$.\n\nFind the initial population and the population the model approaches in the long run.`,
      parts: [numPart(N0, { label: 'Initial population $P(0)$', suffix: 'trout' }), numPart(L, { label: 'Long-run population', suffix: 'trout' })],
      hints: ['The initial population is the value at $t = 0$.', 'The long-run value is the horizontal asymptote: compare the leading coefficients.'],
      solution: [
        `$P(0) = \\dfrac{${N0 * s} + ${L}(0)}{${s} + 0} = \\dfrac{${N0 * s}}{${s}} = ${N0}$ trout.`,
        `Numerator and denominator both have degree $1$ in $t$, so the horizontal asymptote is $P = \\dfrac{${L}}{1} = ${L}$.`,
        `The population starts at $${N0}$ trout and approaches $${L}$ trout in the long run.`,
      ],
      calculator: true,
    };
  },
});

// ---------------------------------------------------------------------------
// 8.2 — Graphs and equations of rational functions
// ---------------------------------------------------------------------------

/** Four candidate graphs that differ from the correct one in a way a student might get wrong; equivalent ones are dropped. */
function pickDistinct<T extends { v: View }>(correct: View, cands: T[], n = 3): T[] {
  const out: T[] = [];
  for (const c of cands) {
    if (out.length >= n) break;
    if (sameView(c.v, correct) || out.some((o) => sameView(o.v, c.v))) continue;
    out.push(c);
  }
  return out;
}

/** f(x) = k(x − a)(x − r) / ((x − a)(x − h)) and three mistaken versions of it. */
function holeFamily(rng: Rng) {
  return retry(
    () => {
      const [a, h] = distinctInts(rng, 2, -4, 4, [], false);
      const r = rng.intExcept(-5, 5, [a, h]);
      const k = rng.pick([1, 1, -1, 2]);
      const rfs = {
        correct: { k, nr: [a, r], m: 1, dr: [a, h] } as RF,
        swap: { k, nr: [h, r], m: 1, dr: [h, a] } as RF,
        noHole: { k, nr: [r], m: 1, dr: [h] } as RF,
        sign: { k, nr: [-a, -r], m: 1, dr: [-a, -h] } as RF,
      };
      return { a, h, r, k, rfs };
    },
    (o) => {
      const vs = Object.values(o.rfs).map(info);
      return vs.every((v) => holesFit(v, 6.5)) && vs.every((v, i) => vs.every((w, j) => i === j || !sameView(v, w)));
    },
  );
}

/** k·Π(x − nr) / Π(x − dr) with two vertical asymptotes. */
function twoVAFamily(rng: Rng): RF {
  const dr = distinctInts(rng, 2, -4, 4).sort((m, n) => m - n);
  const nn = rng.pick([0, 1, 1, 2, 2]);
  const nr = nn ? distinctInts(rng, nn, -5, 5, dr).sort((m, n) => m - n) : [];
  const k = nn === 0 ? rng.pick([3, 4, 6, -3, -4, -6]) : nn === 1 ? rng.pick([1, 2, 3, -1, -2, -3]) : rng.pick([1, -1, 2]);
  return { k, nr, m: 1, dr };
}
function twoVAMistakes(rf: RF): RF[] {
  const neg = (xs: number[]) => xs.map((x) => -x + 0);
  const sh = (xs: number[], t: number) => xs.map((x) => x + t);
  const out: RF[] = [
    { ...rf, k: -rf.k },
    { ...rf, nr: neg(rf.nr), dr: neg(rf.dr) },
    { ...rf, nr: sh(rf.nr, 1), dr: sh(rf.dr, 1) },
  ];
  if (rf.nr.length === 2) out.push({ k: 1, nr: rf.dr, m: rf.k, dr: rf.nr });
  if (rf.nr.length === 1) out.push({ ...rf, nr: [] });
  out.push({ ...rf, nr: sh(rf.nr, -1), dr: sh(rf.dr, -1) });
  return out;
}
function featureSentence(rf: RF): string[] {
  const inf = info(rf);
  const steps = [`Factor: $f(x) = ${rfFacTex(rf)}$.`];
  steps.push(`Vertical asymptotes: ${andList(inf.vas)}. ${inf.xints.length ? `$x$-intercept${inf.xints.length > 1 ? 's' : ''}: ${inf.xints.map((x) => `$${x}$`).join(' and ')}.` : 'There are no $x$-intercepts, because the numerator is never $0$.'}`);
  steps.push(haReason(rf));
  if (inf.yint !== null) steps.push(`Check the $y$-intercept: $f(0) = ${N(inf.yint)}$.`);
  return steps;
}

type GraphKind = 'graphToEqT' | 'eqToGraphT' | 'asymMc' | 'eqToGraphHole' | 'graphToEqHole' | 'featuresToEq' | 'eqToGraph2VA' | 'graphToEq2VA' | 'writeEq';

const rationalGraph = skill({
  id: 'm301-rational-graph',
  name: 'Graphs of rational functions',
  description: 'Match rational functions with their graphs using asymptotes, points of discontinuity and intercepts, and write an equation from a graph or a list of features.',
  outcomes: ['RF14'],
  lessonId: 'm301-8-2',
  format: 'mc',
  gen(rng, d): GenOutput {
    const kind: GraphKind =
      d === 1
        ? rng.weighted<GraphKind>([['graphToEqT', 2], ['eqToGraphT', 2], ['asymMc', 1]])
        : d === 2
          ? rng.weighted<GraphKind>([['eqToGraphHole', 2], ['graphToEqHole', 2], ['featuresToEq', 1]])
          : rng.weighted<GraphKind>([['eqToGraph2VA', 2], ['graphToEq2VA', 2], ['writeEq', 2]]);

    if (kind === 'graphToEqT' || kind === 'asymMc') {
      const a = rng.pick([1, 2, 3, 4, -1, -2, -3, -4]);
      const h = rng.nonZero(-4, 4);
      const k = retry(() => rng.nonZero(-4, 4), (k) => k !== h);
      if (kind === 'asymMc') {
        if (rng.chance(0.5)) {
          const ch = (vx: number, hy: number) => `$x = ${vx}$ and $y = ${hy}$`;
          return {
            prompt: 'The graph of a rational function is shown. What are the equations of its asymptotes?',
            figure: ratFig(hyper(a, h, k), { asym: false }),
            parts: [part(mc(rng, ch(h, k), rng.shuffle([ch(k, h), ch(-h, k), ch(h, -k)])))],
            hints: ['A vertical asymptote is a vertical line the branches approach but never reach.', 'Look at where the branches level off as $x$ moves far to the left and right.'],
            solution: [`Near $x = ${h}$ the branches shoot up and down without touching the line, so the vertical asymptote is $x = ${h}$.`, `Far to the left and right, the graph levels off toward $y = ${k}$: the horizontal asymptote is $y = ${k}$.`, `The asymptotes are ${ch(h, k)}.`],
          };
        }
        const ch = (vx: number, hy: number) => `Domain ${setX(neq([vx]))}; range ${setX(neq([hy], 'y'), 'y')}`;
        return {
          prompt: 'The graph of a rational function is shown. What are its domain and range?',
          figure: ratFig(hyper(a, h, k), { asym: false }),
          parts: [part(mc(rng, ch(h, k), rng.shuffle([ch(k, h), ch(-h, -k), `Domain ${setX([])}; range ${setX(neq([k], 'y'), 'y')}`])))],
          hints: ['The graph never reaches its vertical asymptote, so that $x$-value is not in the domain.', 'The graph never reaches its horizontal asymptote either, so that $y$-value is not in the range.'],
          solution: [`The vertical asymptote is $x = ${h}$: every $x$ except $${h}$ has a point on the graph, so the domain is ${setX(neq([h]))}.`, `The horizontal asymptote is $y = ${k}$, and the graph takes every other $y$-value, so the range is ${setX(neq([k], 'y'), 'y')}.`],
        };
      }
      const correct = `$${hyperTex(a, h, k)}$`;
      const ds = rng.shuffle([hyperTex(a, -h, k), hyperTex(a, h, -k), hyperTex(-a, h, k), hyperTex(a, k, h)]).map((t) => `$${t}$`);
      return {
        prompt: 'The graph of a rational function is shown, with its asymptotes dashed. Which equation does it represent?',
        figure: ratFig(hyper(a, h, k)),
        parts: [part(mc(rng, correct, ds))],
        hints: ['The asymptotes give $h$ and $k$ in $y = \\dfrac{a}{x - h} + k$.', 'Decide the sign of $a$ from where the branches are, then check one point one unit right of the vertical asymptote.'],
        solution: [
          `The vertical asymptote is $x = ${h}$ and the horizontal asymptote is $y = ${k}$, so the equation has the form $y = \\dfrac{a}{${lin(h)}}${plusC(k)}$.`,
          `The branches lie ${a > 0 ? 'above and to the right, and below and to the left,' : 'below and to the right, and above and to the left,'} of the point $(${h}, ${k})$ where the asymptotes cross, so $a ${a > 0 ? '>' : '<'} 0$.`,
          `One unit right of the vertical asymptote the graph passes through $(${h + 1}, ${k + a})$, which is $${Math.abs(a)}$ unit${Math.abs(a) === 1 ? '' : 's'} ${a > 0 ? 'above' : 'below'} the horizontal asymptote, so $a = ${a}$.`,
          `The equation is ${correct}.`,
        ],
      };
    }

    if (kind === 'eqToGraphT') {
      const p = rng.pick([1, 2, 3, -1, -2]);
      const h = retry(() => rng.nonZero(-4, 4), (h) => h !== p);
      const A = rng.pick([1, 2, 3, 4, -1, -2, -3, -4]);
      const q = A - p * h;
      const num: P = [q, p];
      const cands = rng.shuffle([hyper(A, -h, p), hyper(-A, h, p), hyper(A, h, 0), hyper(A, p, h)]).slice(0, 3);
      return {
        prompt: `Which graph represents $f(x) = \\dfrac{${ptex(num)}}{${lin(h)}}$? (Asymptotes are dashed.)`,
        parts: [part(mcFigures(rng, [{ md: '', figure: ratFig(hyper(A, h, p)), correct: true }, ...cands.map((v) => ({ md: '', figure: ratFig(v) }))]))],
        hints: ['Find the vertical asymptote from the denominator and the horizontal asymptote from the leading coefficients.', 'Then check one point to see which side of the horizontal asymptote each branch is on.'],
        solution: [
          `Vertical asymptote: $${lin(h)} = 0$ when $x = ${h}$ (the numerator is not $0$ there).`,
          `Horizontal asymptote: the numerator and denominator have the same degree, so $y = ${p}$.`,
          `Check a point: $f(${h + 1}) = \\dfrac{${subTex(num, h + 1)}}{${subLin(h + 1, h)}} = ${A + p}$, so just right of the vertical asymptote the graph is ${A > 0 ? 'above' : 'below'} $y = ${p}$.`,
          'Only one graph has all of these features.',
        ],
      };
    }

    if (kind === 'eqToGraphHole' || kind === 'graphToEqHole' || kind === 'featuresToEq') {
      const { a, h, r, k, rfs } = holeFamily(rng);
      const inf = info(rfs.correct);
      const yh = inf.holes[0][1];
      const order = rng.shuffle(['swap', 'noHole', 'sign'] as const);
      const eqT = (rf: RF) => `$f(x) = ${rfFacTex(rf)}$`;
      const why = [
        `The factor $${lin(a)}$ cancels: $f(x) = \\dfrac{${facTex(k, [r])}}{${lin(h)}}$, $x \\ne ${a}$. So there is a point of discontinuity at $x = ${a}$, not an asymptote.`,
        `The hole is at $${ptTex(a, yh)}$, using the simplified function.`,
        `Vertical asymptote $x = ${h}$; horizontal asymptote $y = ${k}$ (equal degrees); $x$-intercept $${r}$.`,
      ];
      if (kind === 'eqToGraphHole') {
        const opts = [{ md: '', figure: ratFig(inf), correct: true }, ...order.map((key) => ({ md: '', figure: ratFig(info(rfs[key])) }))];
        return {
          prompt: `Which graph represents $f(x) = ${rng.chance(0.5) ? rfFacTex(rfs.correct) : rfTex(rfs.correct)}$? Open circles mark points of discontinuity.`,
          parts: [part(mcFigures(rng, opts))],
          hints: ['Factor and cancel. A cancelled factor gives a hole (an open circle), and a factor left in the denominator gives a vertical asymptote.', 'Find the $y$-coordinate of the hole from the simplified function, then check the horizontal asymptote and the $x$-intercept.'],
          solution: [...why, 'Only one graph has the hole, the asymptotes and the intercept in these places.'],
        };
      }
      if (kind === 'graphToEqHole') {
        return {
          prompt: 'The graph of a rational function is shown. The open circle marks a point of discontinuity, and the asymptotes are dashed. Which equation matches the graph?',
          figure: ratFig(inf),
          parts: [part(mc(rng, eqT(rfs.correct), order.map((key) => eqT(rfs[key]))))],
          hints: ['A hole at $x = a$ means the factor $(x - a)$ is in both the numerator and the denominator.', 'A vertical asymptote at $x = h$ means $(x - h)$ stays in the denominator; an $x$-intercept at $r$ means $(x - r)$ stays in the numerator.'],
          solution: [
            `The graph has a hole at $x = ${a}$, so $${lin(a)}$ is a factor of both the numerator and the denominator.`,
            `The vertical asymptote $x = ${h}$ gives the factor $${lin(h)}$ in the denominator, and the $x$-intercept $${r}$ gives $${lin(r)}$ in the numerator.`,
            `The horizontal asymptote is $y = ${k}$, so the leading coefficients have ratio $${k}$. Check: the hole is at $${ptTex(a, yh)}$, as in the graph.`,
            `The equation is ${eqT(rfs.correct)}.`,
          ],
        };
      }
      return {
        prompt: `Which function has a vertical asymptote $x = ${h}$, a point of discontinuity at $x = ${a}$, a horizontal asymptote $y = ${k}$ and an $x$-intercept of $${r}$?`,
        parts: [part(mc(rng, eqT(rfs.correct), order.map((key) => eqT(rfs[key]))))],
        hints: ['A point of discontinuity at $x = a$ comes from a factor $(x - a)$ in both the numerator and the denominator.', 'A vertical asymptote at $x = h$ needs $(x - h)$ in the denominator only.'],
        solution: [
          `The point of discontinuity at $x = ${a}$ needs the factor $${lin(a)}$ in both the numerator and the denominator.`,
          `The vertical asymptote needs $${lin(h)}$ in the denominator; the $x$-intercept needs $${lin(r)}$ in the numerator; the horizontal asymptote $y = ${k}$ needs leading coefficients in the ratio $${k}$.`,
          `So $f(x) = ${rfFacTex(rfs.correct)}$.`,
        ],
      };
    }

    if (kind === 'eqToGraph2VA' || kind === 'graphToEq2VA') {
      const { rf, ds } = retry(
        () => {
          const rf = twoVAFamily(rng);
          const correct = info(rf);
          const ds = pickDistinct(correct, rng.shuffle(twoVAMistakes(rf)).map((m) => ({ rf: m, v: info(m) as View })));
          return { rf, ds };
        },
        (o) => o.ds.length === 3,
      );
      if (kind === 'eqToGraph2VA') {
        return {
          prompt: `Which graph represents $f(x) = ${rfTex(rf)}$? (Asymptotes are dashed.)`,
          parts: [part(mcFigures(rng, [{ md: '', figure: ratFig(info(rf)), correct: true }, ...ds.map((o) => ({ md: '', figure: ratFig(o.v) }))]))],
          hints: ['Factor the numerator and the denominator to find the vertical asymptotes and the $x$-intercepts.', 'Use the degrees for the horizontal asymptote, and the $y$-intercept to check which side of the axis each branch is on.'],
          solution: [...featureSentence(rf), 'Only one graph has all of these features.'],
        };
      }
      return {
        prompt: 'The graph of a rational function is shown, with its asymptotes dashed. Which equation does it represent?',
        figure: ratFig(info(rf)),
        parts: [part(mc(rng, `$f(x) = ${rfTex(rf)}$`, ds.map((o) => `$f(x) = ${rfTex(o.rf)}$`)))],
        hints: ['Read the vertical asymptotes, the $x$-intercepts and the horizontal asymptote from the graph.', 'Factor each denominator and numerator in the choices and compare. Use the $y$-intercept to decide the sign.'],
        solution: [...featureSentence(rf), `The equation is $f(x) = ${rfTex(rf)}$.`],
      };
    }

    // writeEq
    const variant = rng.pick(['features', 'graph', 'point'] as const);
    if (variant !== 'point') {
      const h = rng.nonZero(-4, 4);
      const k = rng.pick([1, 2, 3, -1, -2, -3]);
      const r = rng.intExcept(-5, 5, [h]);
      const rf: RF = { k, nr: [r], m: 1, dr: [h] };
      const expected = `${coefTxt(k)}(${linTxt(r)})/(${linTxt(h)})`;
      const fig = ratFig(info(rf));
      fig.points = [{ x: r, y: 0, label: `(${r}, 0)` }];
      return {
        prompt:
          variant === 'features'
            ? `Write the equation of a rational function $f(x)$, with a linear numerator and a linear denominator, whose graph has a vertical asymptote $x = ${h}$, a horizontal asymptote $y = ${k}$, an $x$-intercept of $${r}$ and no points of discontinuity.`
            : 'The graph of a rational function with a linear numerator and a linear denominator is shown, with its asymptotes dashed and its $x$-intercept marked. Write its equation.',
        figure: variant === 'graph' ? fig : undefined,
        parts: [exprPart(expected, '$f(x) =$')],
        hints: ['The vertical asymptote gives the denominator and the $x$-intercept gives the numerator.', 'Multiply the numerator by the constant that makes the ratio of leading coefficients equal the horizontal asymptote.'],
        solution: [
          `${variant === 'graph' ? `From the graph: vertical asymptote $x = ${h}$, horizontal asymptote $y = ${k}$, $x$-intercept $${r}$. ` : ''}The vertical asymptote $x = ${h}$ needs the factor $${lin(h)}$ in the denominator.`,
          `The $x$-intercept $${r}$ needs the factor $${lin(r)}$ in the numerator.`,
          `For the horizontal asymptote $y = ${k}$, the leading coefficients must have ratio $${k}$: $f(x) = \\dfrac{${facTex(k, [r])}}{${lin(h)}}$.`,
        ],
        answerDisplay: `$f(x) = \\dfrac{${facTex(k, [r])}}{${lin(h)}}$`,
      };
    }
    const [p, q] = distinctInts(rng, 2, -4, 4).sort((m, n) => m - n);
    const r = rng.intExcept(-5, 5, [p, q]);
    const c = rng.pick([1, 2, 3, 4, 6, -1, -2, -3, -4]);
    const g = (x: number) => (c * (x - r)) / ((x - p) * (x - q));
    const xs = [0, 1, -1, 2, -2, 3, -3, 4, -4, 5, -5].filter((x) => ![p, q, r].includes(x));
    const x0 = xs.find((x) => Number.isInteger(clean(g(x)))) ?? xs[0];
    const y0 = clean(g(x0));
    const expected = `${coefTxt(c)}(${linTxt(r)})/((${linTxt(p)})(${linTxt(q)}))`;
    return {
      prompt: `Write the equation of a rational function $f(x)$ with a linear numerator whose graph has vertical asymptotes $x = ${p}$ and $x = ${q}$, a horizontal asymptote $y = 0$, an $x$-intercept of $${r}$, no points of discontinuity, and passes through the point $${ptTex(x0, y0)}$.`,
      parts: [exprPart(expected, '$f(x) =$')],
      hints: ['Start with $f(x) = \\dfrac{c(x - r)}{(x - p)(x - q)}$: a linear numerator over a quadratic denominator has $y = 0$ as its horizontal asymptote.', `Substitute the point $${ptTex(x0, y0)}$ to find $c$.`],
      solution: [
        `The asymptotes and the intercept give $f(x) = \\dfrac{c${r === 0 ? 'x' : `(${lin(r)})`}}{${facTex(1, [p, q])}}$. The numerator has a lower degree than the denominator, so the horizontal asymptote is $y = 0$.`,
        `Substitute $${ptTex(x0, y0)}$: $${N(y0)} = \\dfrac{c(${subLin(x0, r)})}{(${subLin(x0, p)})(${subLin(x0, q)})} = ${N((x0 - r) / ((x0 - p) * (x0 - q)))}c$, so $c = ${c}$.`,
        `So $f(x) = \\dfrac{${facTex(c, [r])}}{${facTex(1, [p, q])}}$.`,
      ],
      answerDisplay: `$f(x) = \\dfrac{${facTex(c, [r])}}{${facTex(1, [p, q])}}$`,
    };
  },
});

// ---------------------------------------------------------------------------
// 8.3 — Rational equations, algebraically and graphically
// ---------------------------------------------------------------------------

/** c(x − r) written for a product step: "3(x - 2)", "-x", "x(x + 1)". */
const prodLin = (c: number, r: number) => (r === 0 ? `${coefTex(c)}x` : `${coefTex(c)}(${lin(r)})`);

/** m/(x − a) ± n·x/(x − b) = R(x)/((x − a)(x − b)), built so that clearing denominators leaves n(x − s1)(x − s2) = 0. */
function twoFracSetup(rng: Rng) {
  return retry(
    () => {
      const [a, b] = distinctInts(rng, 2, -5, 5);
      const mode = rng.weighted([['one', 3], ['two', 2], ['none', 1]] as const);
      let sr: number[];
      if (mode === 'one') sr = [rng.pick([a, b]), rng.intExcept(-6, 6, [a, b])];
      else if (mode === 'two') sr = distinctInts(rng, 2, -6, 6, [a, b]);
      else sr = [a, b];
      const m = rng.nonZero(-6, 6);
      const n = rng.pick([1, 1, 2, 3, -1, -2]);
      const lhs = padd(pscale([-b, 1], m), pscale([0, -a, 1], n));
      const R = padd(lhs, fromRoots(n, sr), -1);
      return { a, b, m, n, sr, R, lhs, mode };
    },
    (o) => !(o.R.length === 1 && o.R[0] === 0) && o.R.every((c) => Math.abs(c) <= 60),
  );
}
type TwoFrac = ReturnType<typeof twoFracSetup>;
const twoFracTex = (o: TwoFrac) =>
  `${o.m < 0 ? '-' : ''}\\dfrac{${Math.abs(o.m)}}{${lin(o.a)}} ${o.n > 0 ? '+' : '-'} \\dfrac{${coefTex(Math.abs(o.n))}x}{${lin(o.b)}} = \\dfrac{${ptex(o.R)}}{${ptex(fromRoots(1, [o.a, o.b]))}}`;
function twoFracSteps(o: TwoFrac): string[] {
  const den = facTex(1, [o.a, o.b]);
  const valid = o.sr.filter((x) => x !== o.a && x !== o.b);
  const bad = o.sr.filter((x) => x === o.a || x === o.b);
  const steps = [
    `Factor the denominator on the right: $${ptex(fromRoots(1, [o.a, o.b]))} = ${den}$, so $x \\ne ${o.a}$ and $x \\ne ${o.b}$.`,
    `Multiply every term by $${den}$: $${prodLin(o.m, o.b)} ${o.n > 0 ? '+' : '-'} ${coefTex(Math.abs(o.n))}x${o.a === 0 ? '^{2}' : `(${lin(o.a)})`} = ${ptex(o.R)}$.`,
    `Expand and collect terms on one side: $${ptex(o.lhs)} = ${ptex(o.R)}$, so $${ptex(fromRoots(o.n, o.sr))} = 0$.`,
    `${o.n === 1 ? '' : `Divide by $${o.n}$ and factor: `}$${facTex(1, o.sr)} = 0$, so ${orList(o.sr)}.`,
  ];
  if (bad.length) steps.push(`${bad.map((x) => `$x = ${x}$`).join(' and ')} ${bad.length > 1 ? 'are non-permissible values, so they are extraneous roots' : 'is a non-permissible value, so it is an extraneous root'}.`);
  else steps.push('Neither value is non-permissible, so both are solutions.');
  steps.push(valid.length ? `The solution${valid.length > 1 ? 's are' : ' is'} ${orList(valid)}.` : 'The equation has no solution.');
  return steps;
}

// Word problems with nice numbers, precomputed.
const WORK_SETS: Array<[number, number, number]> = [];
for (let t1 = 2; t1 <= 12; t1++)
  for (let dd = 1; dd <= 10; dd++) {
    const T = (t1 * (t1 + dd)) / (2 * t1 + dd);
    if (Math.abs(T * 10 - Math.round(T * 10)) < 1e-9) WORK_SETS.push([t1, dd, clean(T)]);
  }
const BOAT_SETS: Array<[number, number, number, number]> = [];
for (let v = 6; v <= 30; v++)
  for (let c = 1; c <= 6 && c < v - 2; c++)
    for (const T of [1.5, 2, 2.5, 3, 4, 5, 6]) {
      const D = (T * (v * v - c * c)) / (2 * v);
      if (Math.abs(D - Math.round(D)) < 1e-9 && D >= 6 && D <= 120) BOAT_SETS.push([v, c, T, Math.round(D)]);
    }
/** Scale a polynomial with decimal coefficients to integers with no common factor. */
function intCoeffs(p: P): P {
  let q = p;
  for (let s = 1; s <= 100; s++) {
    q = p.map((c) => clean(c * s));
    if (q.every((c) => Number.isInteger(c))) break;
  }
  const g = q.reduce((acc, c) => gcd(acc, Math.abs(c)), 0) || 1;
  const sign = q[q.length - 1] < 0 ? -1 : 1;
  return q.map((c) => (sign * c) / g + 0);
}

type EqKind = 'simpleAlg' | 'graphLin' | 'quadAlg' | 'extraneous' | 'graphHoleLine' | 'twoFrac' | 'graphTwoVA' | 'context';

const rationalEquations = skill({
  id: 'm301-rational-equation-graph',
  name: 'Rational equations',
  description: 'Solve rational equations algebraically, rejecting extraneous roots, and graphically from the x-intercepts of the related function.',
  outcomes: ['RF14'],
  lessonId: 'm301-8-3',
  gen(rng, d): GenOutput {
    const kind: EqKind =
      d === 1
        ? rng.weighted<EqKind>([['simpleAlg', 3], ['graphLin', 2]])
        : d === 2
          ? rng.weighted<EqKind>([['quadAlg', 2], ['extraneous', 2], ['graphHoleLine', 2]])
          : rng.weighted<EqKind>([['twoFrac', 3], ['graphTwoVA', 2], ['context', 2]]);
    const name = rng.pick(NAMES);

    if (kind === 'simpleAlg') {
      const variant = rng.pick(['const', 'lin', 'recip'] as const);
      const s = rng.int(-6, 6);
      if (variant === 'const') {
        const h = rng.intExcept(-6, 6, [s]);
        const dd = rng.nonZero(-5, 5);
        const c = dd * (s - h);
        return {
          prompt: `Solve $\\dfrac{${c}}{${lin(h)}} = ${dd}$ algebraically.`,
          parts: [solPart([s])],
          hints: [`State the non-permissible value, then multiply both sides by $${lin(h)}$.`, 'Solve the linear equation and check that the answer is permissible.'],
          solution: [
            `The non-permissible value is $x = ${h}$.`,
            `Multiply both sides by $${lin(h)}$: $${c} = ${prodLin(dd, h)}$, so $${c} = ${ptex([-dd * h, dd])}$.`,
            `$${dd}x = ${c + dd * h}$, so $x = ${s}$.`,
            `$x = ${s}$ is permissible, so the solution is $x = ${s}$.`,
          ],
        };
      }
      if (variant === 'lin') {
        const h = rng.intExcept(-6, 6, [s]);
        const c = rng.pick([2, 3, 4, -1, -2, -3]);
        const p = c * (s - h) - s;
        const num = ptex([p, 1]);
        return {
          prompt: `Solve $\\dfrac{${num}}{${lin(h)}} = ${c}$ algebraically.`,
          parts: [solPart([s])],
          hints: [`Multiply both sides by $${lin(h)}$, remembering $x \\ne ${h}$.`, 'Collect the $x$-terms on one side and solve.'],
          solution: [
            `The non-permissible value is $x = ${h}$.`,
            `Multiply both sides by $${lin(h)}$: $${num} = ${prodLin(c, h)} = ${ptex([-c * h, c])}$.`,
            `Collect terms: $${ptex([0, 1 - c])} = ${-c * h - p}$, so $x = ${s}$.`,
            `Check: $\\dfrac{${subTex([p, 1], s)}}{${subLin(s, h)}} = \\dfrac{${s + p}}{${s - h}} = ${c}$. The solution is $x = ${s}$.`,
          ],
        };
      }
      const sx = s === 0 ? rng.pick([2, -3, 4]) : s;
      const e = rng.nonZero(-5, 5);
      const b = rng.nonZero(-6, 6);
      const c = b + e;
      const a = sx * e;
      return {
        prompt: `Solve $\\dfrac{${a}}{x}${plusC(b)} = ${c}$ algebraically.`,
        parts: [solPart([sx])],
        hints: ['Isolate the fraction first.', 'Then multiply both sides by $x$ (which cannot be $0$).'],
        solution: [`The non-permissible value is $x = 0$.`, `${b < 0 ? `Add $${-b}$ to` : `Subtract $${b}$ from`} both sides: $\\dfrac{${a}}{x} = ${e}$.`, `Multiply by $x$: $${a} = ${e}x$, so $x = ${sx}$.`, `$x = ${sx}$ is permissible, so the solution is $x = ${sx}$.`],
      };
    }

    if (kind === 'graphLin') {
      const { s, h, c } = retry(
        () => ({ s: rng.int(-5, 5), h: rng.nonZero(-5, 5), c: rng.pick([2, 3, 4, 5, -1, -2, -3]) }),
        (o) => o.s !== o.h && Math.abs(o.s - o.h) <= 4,
      );
      const p = c * (s - h) - s;
      const num = ptex([p, 1]);
      const rel: RF = { k: 1 - c, nr: [s], m: 1, dr: [h] };
      return {
        prompt: `${name} wants to solve $\\dfrac{${num}}{${lin(h)}} = ${c}$. The graph of the related function $y = \\dfrac{${num}}{${lin(h)}} ${c < 0 ? '+' : '-'} ${Math.abs(c)}$ is shown, with its asymptotes dashed. Use the graph to solve the equation.`,
        figure: ratFig(info(rel)),
        parts: [solPart([s])],
        hints: ['The related function is the equation rearranged to "$\\ldots = 0$".', 'The solutions are the $x$-intercepts of the related function.'],
        solution: [
          `${c < 0 ? `Adding $${-c}$ to` : `Subtracting $${c}$ from`} both sides gives $\\dfrac{${num}}{${lin(h)}} ${c < 0 ? '+' : '-'} ${Math.abs(c)} = 0$, so the solutions are the $x$-intercepts of the related function.`,
          `The graph crosses the $x$-axis once, at $x = ${s}$.`,
          `Check: $\\dfrac{${subTex([p, 1], s)}}{${subLin(s, h)}} = \\dfrac{${s + p}}{${s - h}} = ${c}$. The solution is $x = ${s}$.`,
        ],
      };
    }

    if (kind === 'quadAlg') {
      if (rng.chance(0.5)) {
        const [r1, r2] = distinctInts(rng, 2, -6, 6, [], false).sort((m, n) => m - n);
        const Pp = r1 * r2;
        const S = r1 + r2;
        return {
          prompt: `Solve $x ${Pp < 0 ? '-' : '+'} \\dfrac{${Math.abs(Pp)}}{x} = ${S}$ algebraically.`,
          parts: [solPart([r1, r2])],
          hints: ['Multiply every term by $x$ (which cannot be $0$).', 'Rearrange into a quadratic equal to $0$ and factor.'],
          solution: [
            'The non-permissible value is $x = 0$.',
            `Multiply every term by $x$: $x^{2}${plusC(Pp)} = ${S === 0 ? '0' : `${coefTex(S)}x`}$.`,
            `Rearrange: $${ptex(fromRoots(1, [r1, r2]))} = 0$, so $${facTex(1, [r1, r2])} = 0$.`,
            `$x = ${r1}$ or $x = ${r2}$. Neither is $0$, so both are solutions.`,
          ],
        };
      }
      const h = rng.int(-5, 5);
      const [r1, r2] = distinctInts(rng, 2, -6, 6, [h]).sort((m, n) => m - n);
      const kk = r1 + r2 - h;
      const m = -(r1 - h) * (r2 - h);
      return {
        prompt: `Solve $\\dfrac{${m}}{${lin(h)}} = ${lin(kk)}$ algebraically.`,
        parts: [solPart([r1, r2])],
        hints: [`Multiply both sides by $${lin(h)}$, with $x \\ne ${h}$.`, 'Expand, rearrange into a quadratic equal to $0$, and factor.'],
        solution: [
          `The non-permissible value is $x = ${h}$.`,
          `Multiply both sides by $${lin(h)}$: $${m} = ${h === 0 ? `x(${lin(kk)})` : kk === 0 ? `x(${lin(h)})` : `(${lin(h)})(${lin(kk)})`} = ${ptex(fromRoots(1, [h, kk]))}$.`,
          `Rearrange: $${ptex(fromRoots(1, [r1, r2]))} = 0$, so $${facTex(1, [r1, r2])} = 0$.`,
          `$x = ${r1}$ or $x = ${r2}$. Neither is $${h}$, so both are solutions.`,
        ],
      };
    }

    if (kind === 'extraneous' || kind === 'graphHoleLine') {
      if (kind === 'extraneous' && rng.chance(0.25)) {
        const a = rng.nonZero(-5, 5);
        const c = rng.pick([2, 3, 4, 5, -2, -3]);
        const dd = rng.intExcept(-5, 5, [0, c]);
        return {
          prompt: `Solve $\\dfrac{${coefTex(c)}x}{${lin(a)}} = \\dfrac{${c * a}}{${lin(a)}}${plusC(dd)}$ algebraically. Type *none* if there is no solution.`,
          parts: [solPart([])],
          hints: [`State the non-permissible value, then multiply every term by $${lin(a)}$.`, 'Check your answer against the non-permissible value.'],
          solution: [
            `The non-permissible value is $x = ${a}$.`,
            `Multiply every term by $${lin(a)}$: $${coefTex(c)}x = ${c * a}${dd < 0 ? ' - ' : ' + '}${Math.abs(dd) === 1 ? '' : Math.abs(dd)}(${lin(a)})$.`,
            `Expand and collect: $${ptex([0, c - dd])} = ${(c - dd) * a}$, so $x = ${a}$.`,
            `But $x = ${a}$ is non-permissible (it makes the denominators $0$), so it is an extraneous root.`,
            'The equation has no solution.',
          ],
        };
      }
      const { a, r, pp } = retry(
        () => ({ a: rng.nonZero(-5, 5), r: rng.int(-5, 5), pp: rng.int(-4, 4) }),
        (o) => o.r !== o.a && Math.abs(o.a - o.r) <= 7 && !(o.pp + o.a + o.r === 0 && o.r === 0),
      );
      const q = pp + a + r;
      const s0 = -a * r;
      const eq = `\\dfrac{${ptex([0, pp, 1])}}{${lin(a)}} = \\dfrac{${ptex([s0, q])}}{${lin(a)}}`;
      if (kind === 'extraneous') {
        return {
          prompt: `Solve $${eq}$ algebraically. Type *none* if there is no solution.`,
          parts: [solPart([r])],
          hints: [`State the non-permissible value, then multiply both sides by $${lin(a)}$.`, 'Solve the quadratic and check each root against the non-permissible value.'],
          solution: [
            `The non-permissible value is $x = ${a}$.`,
            `Multiply both sides by $${lin(a)}$: $${ptex([0, pp, 1])} = ${ptex([s0, q])}$.`,
            `Rearrange: $${ptex(fromRoots(1, [a, r]))} = 0$, so $${facTex(1, [a, r])} = 0$: $x = ${a}$ or $x = ${r}$.`,
            `$x = ${a}$ makes the denominators $0$, so it is an extraneous root.`,
            `The solution is $x = ${r}$.`,
          ],
        };
      }
      const rel: RF = { k: 1, nr: [a, r], m: 1, dr: [a] };
      return {
        prompt: `${name} solves $${eq}$ graphically. Subtracting the right side from the left side gives the related function $y = \\dfrac{${ptex(fromRoots(1, [a, r]))}}{${lin(a)}}$, graphed below. What is the solution of the equation? Type *none* if there is no solution.`,
        figure: ratFig(info(rel)),
        parts: [solPart([r])],
        hints: ['The solutions are the $x$-intercepts of the related function.', 'An open circle is a point that is not on the graph.'],
        solution: [
          'The solutions of the equation are the $x$-intercepts of the related function.',
          `The graph crosses the $x$-axis at $x = ${r}$.`,
          `The open circle at $${ptTex(a, a - r)}$ shows that $x = ${a}$ is not in the domain. Solving algebraically gives $${facTex(1, [a, r])} = 0$, but $x = ${a}$ is an extraneous root.`,
          `The solution is $x = ${r}$.`,
        ],
      };
    }

    if (kind === 'twoFrac' || kind === 'graphTwoVA') {
      const o = kind === 'twoFrac' ? twoFracSetup(rng) : retry(() => twoFracSetup(rng), (o) => holesFit(info({ k: o.n, nr: o.sr, m: 1, dr: [o.a, o.b] }), 6.5));
      const valid = o.sr.filter((x) => x !== o.a && x !== o.b);
      if (kind === 'twoFrac') {
        return {
          prompt: `Solve algebraically.\n\n$$${twoFracTex(o)}$$\n\nType *none* if there is no solution.`,
          parts: [solPart(valid)],
          hints: ['Factor the denominator on the right to find the lowest common denominator and the non-permissible values.', 'Multiply every term by the lowest common denominator, solve the quadratic, and reject any non-permissible roots.'],
          solution: twoFracSteps(o),
        };
      }
      const rel = info({ k: o.n, nr: o.sr, m: 1, dr: [o.a, o.b] });
      const holes = rel.holes;
      return {
        prompt: `${name} solves the equation below by graphing the related function $y = (\\text{left side}) - (\\text{right side})$${rel.vas.length ? ', shown with its asymptotes dashed' : ''}.${holes.length ? ' Open circles mark points of discontinuity.' : ''}\n\n$$${twoFracTex(o)}$$\n\nUse the graph to find the solution(s). Type *none* if there is no solution.`,
        figure: ratFig(rel),
        parts: [solPart(valid)],
        hints: ['The solutions are the $x$-intercepts of the related function.', 'A point of discontinuity is not on the graph, so it cannot be a solution.'],
        solution: [
          'The solutions of the equation are the $x$-values where the related function equals $0$: its $x$-intercepts.',
          valid.length ? `The graph crosses the $x$-axis at ${orList(valid)}.` : 'The graph never crosses the $x$-axis.',
          ...(holes.length ? [`The open circle${holes.length > 1 ? 's' : ''} at ${holes.map((h) => `$${ptTex(h[0], h[1])}$`).join(' and ')} ${holes.length > 1 ? 'are' : 'is'} not on the graph: solving algebraically gives $${facTex(1, o.sr)} = 0$, and ${holes.map((h) => `$x = ${h[0]}$`).join(' and ')} ${holes.length > 1 ? 'are extraneous roots' : 'is an extraneous root'}.`] : []),
          valid.length ? `The solution${valid.length > 1 ? 's are' : ' is'} ${orList(valid)}.` : 'The equation has no solution.',
        ],
      };
    }

    // context
    const ctx = rng.pick(['work', 'resistors', 'boat'] as const);
    if (ctx === 'work' || ctx === 'resistors') {
      const [t1, dd, T] = rng.pick(WORK_SETS);
      const t2 = clean((-dd * T) / t1);
      const quad = intCoeffs([-dd * T, dd - 2 * T, 1]);
      if (ctx === 'work') {
        const [A, B] = rng.sample(NAMES, 2);
        const task = rng.pick(['flood the outdoor rink', 'shovel the snow off the school parking lot', 'stock the shelves at the grocery store', 'seed a canola field', 'paint the community hall', 'sort the food bank donations']);
        return {
          prompt: `Working alone, ${B} takes $${dd}$ h longer than ${A} to ${task}. Working together, they can do it in $${T}$ h. How long does ${A} take working alone?`,
          parts: [numPart(t1, { label: `${A}'s time alone`, suffix: 'h' })],
          hints: [`Let $t$ be ${A}'s time in hours. In one hour ${A} does $\\dfrac{1}{t}$ of the job and ${B} does $\\dfrac{1}{t + ${dd}}$.`, `Together they do $\\dfrac{1}{${T}}$ of the job per hour: solve $\\dfrac{1}{t} + \\dfrac{1}{t + ${dd}} = \\dfrac{1}{${T}}$.`],
          solution: [
            `Let $t$ be ${A}'s time. Then $\\dfrac{1}{t} + \\dfrac{1}{t + ${dd}} = \\dfrac{1}{${T}}$, with $t > 0$.`,
            `Multiply by $${T}t(t + ${dd})$: $${T}(t + ${dd}) + ${T}t = t(t + ${dd})$, so $${ptex(trimP([-dd * T, dd - 2 * T, 1]), 't')} = 0$${Number.isInteger(T) ? '' : `, or $${ptex(quad, 't')} = 0$ with integer coefficients`}.`,
            `Factoring (or the quadratic formula) gives $t = ${t1}$ or $t = ${N(t2)}$.`,
            `A time cannot be negative, so reject $t = ${N(t2)}$. ${A} takes $${t1}$ h working alone (and ${B} takes $${t1 + dd}$ h).`,
          ],
          calculator: true,
        };
      }
      return {
        prompt: `Two resistors are connected in parallel. One has a resistance $${dd}$ Ω greater than the other, and their combined resistance is $${T}$ Ω. For resistors in parallel, $\\dfrac{1}{R_T} = \\dfrac{1}{R_1} + \\dfrac{1}{R_2}$. Find the resistance of the smaller resistor.`,
        parts: [numPart(t1, { label: 'Smaller resistance', suffix: 'Ω' })],
        hints: [`Let $R$ be the smaller resistance, so the other is $R + ${dd}$.`, `Solve $\\dfrac{1}{R} + \\dfrac{1}{R + ${dd}} = \\dfrac{1}{${T}}$ and reject any negative root.`],
        solution: [
          `Let $R$ be the smaller resistance: $\\dfrac{1}{R} + \\dfrac{1}{R + ${dd}} = \\dfrac{1}{${T}}$, with $R > 0$.`,
          `Multiply by $${T}R(R + ${dd})$: $${T}(R + ${dd}) + ${T}R = R(R + ${dd})$.`,
          `Rearrange: $${ptex(trimP([-dd * T, dd - 2 * T, 1]), 'R')} = 0$${Number.isInteger(T) ? '' : `, or $${ptex(quad, 'R')} = 0$ with integer coefficients`}. Factoring (or the quadratic formula) gives $R = ${t1}$ or $R = ${N(t2)}$.`,
          `A resistance cannot be negative, so the smaller resistor is $${t1}$ Ω (the other is $${t1 + dd}$ Ω).`,
        ],
        calculator: true,
      };
    }
    const [v, c, T, D] = rng.pick(BOAT_SETS);
    const v2 = clean((-c * c) / v);
    const river = rng.pick(['Willow', 'Heron', 'Silver', 'Cedar', 'Maple', 'Pinewood']);
    const quad = intCoeffs([-T * c * c, -2 * D, T]);
    return {
      prompt: `A boat travels $${D}$ km up the ${river} River against a current of $${c}$ km/h, then $${D}$ km back downstream. The round trip takes $${T}$ h. What is the boat's speed in still water?`,
      parts: [numPart(v, { label: 'Speed in still water', suffix: 'km/h' })],
      hints: [`Let $v$ be the speed in still water. Upstream the speed is $v - ${c}$ and downstream it is $v + ${c}$; time is distance divided by speed.`, `Solve $\\dfrac{${D}}{v - ${c}} + \\dfrac{${D}}{v + ${c}} = ${T}$.`],
      solution: [
        `Time upstream plus time downstream: $\\dfrac{${D}}{v - ${c}} + \\dfrac{${D}}{v + ${c}} = ${T}$, with $v > ${c}$.`,
        `Multiply by $(v - ${c})(v + ${c})$: $${D}(v + ${c}) + ${D}(v - ${c}) = ${T}(v^{2} - ${c * c})$, so $${2 * D}v = ${T}v^{2} - ${clean(T * c * c)}$.`,
        `Rearrange: $${ptex(quad, 'v')} = 0$, so $v = ${v}$ or $v = ${N(v2)}$.`,
        `A speed must be greater than $${c}$ km/h here, so reject $v = ${N(v2)}$. The boat's speed in still water is $${v}$ km/h.`,
      ],
      calculator: true,
    };
  },
});

// ---------------------------------------------------------------------------
// 8.4 — Sums, differences, products and quotients of functions
// ---------------------------------------------------------------------------

type Op = 'add' | 'sub' | 'mul' | 'div';
const opTex = (op: Op, arg: string | number = 'x', F = 'f', G = 'g') =>
  op === 'add' ? `(${F} + ${G})(${arg})` : op === 'sub' ? `(${F} - ${G})(${arg})` : op === 'mul' ? `(${F}${G})(${arg})` : `\\left(\\dfrac{${F}}{${G}}\\right)(${arg})`;
const opApply = (op: Op, u: number, v: number) => (op === 'add' ? u + v : op === 'sub' ? u - v : op === 'mul' ? u * v : u / v);
const opSym = (op: Op) => (op === 'add' ? '+' : op === 'sub' ? '-' : op === 'mul' ? '\\times' : '\\div');
const randLin = (rng: Rng): P => [rng.int(-9, 9), rng.pick([1, 2, 3, 4, 5, -1, -2, -3])];
const randQuad = (rng: Rng): P => [rng.int(-9, 9), rng.int(-6, 6), rng.pick([1, 1, 2, 3, -1])];
/** The worked line for combining two known values. */
const combineLine = (op: Op, arg: number, u: number, v: number, F = 'f', G = 'g') =>
  `$${opTex(op, arg, F, G)} = ${F}(${arg}) ${opSym(op)} ${G}(${arg}) = ${N(u)} ${opSym(op)} ${par(v)} = ${N(opApply(op, u, v))}$`;
const valTable = (xs: number[], fv: number[], gv: number[]): TableFigure => ({
  type: 'table',
  horizontal: true,
  headers: ['$x$', '$f(x)$', '$g(x)$'],
  rows: xs.map((x, i) => [fmt(x), fmt(fv[i]), fmt(gv[i])]),
});
/** A safe value to round: not on a rounding boundary. */
const safeRound = (v: number, dec: number) => Math.abs((((Math.abs(v) * 10 ** dec) % 1) - 0.5)) > 0.03;

type OpKind = 'evalEq' | 'evalTable' | 'writeSumDiff' | 'writeProduct' | 'evalGraph' | 'domainQuotient' | 'writeQuotient' | 'domainSqrt' | 'writeQuotientDomain' | 'context';

const functionOperations = skill({
  id: 'm301-function-operations',
  name: 'Combining functions',
  description: 'Add, subtract, multiply and divide functions given as equations, tables or graphs, and state the domain of the combined function.',
  outcomes: ['RF1'],
  lessonId: 'm301-8-4',
  gen(rng, d): GenOutput {
    const kind: OpKind =
      d === 1
        ? rng.weighted<OpKind>([['evalEq', 3], ['evalTable', 2], ['writeSumDiff', 3]])
        : d === 2
          ? rng.weighted<OpKind>([['writeProduct', 2], ['evalGraph', 2], ['evalTable', 1], ['domainQuotient', 2], ['writeQuotient', 2]])
          : rng.weighted<OpKind>([['domainSqrt', 3], ['writeQuotientDomain', 2], ['context', 2]]);

    if (kind === 'evalEq') {
      let f = randLin(rng);
      let g = randQuad(rng);
      if (rng.chance(0.3)) [f, g] = [g, f];
      const op = rng.pick(['add', 'sub', 'mul'] as const);
      const x0 = rng.int(-3, 4);
      const fv = peval(f, x0);
      const gv = peval(g, x0);
      return {
        prompt: `Given $f(x) = ${ptex(f)}$ and $g(x) = ${ptex(g)}$, evaluate $${opTex(op, x0)}$.`,
        parts: [numPart(opApply(op, fv, gv), { label: `$${opTex(op, x0)} =$` })],
        hints: [`$${opTex(op, x0)}$ means $f(${x0}) ${opSym(op)} g(${x0})$.`, 'Evaluate each function separately, then combine the two values.'],
        solution: [`$f(${x0}) = ${subTex(f, x0)} = ${fv}$`, `$g(${x0}) = ${subTex(g, x0)} = ${gv}$`, combineLine(op, x0, fv, gv)],
      };
    }

    if (kind === 'evalTable') {
      const start = rng.int(-3, 0);
      const xs = [0, 1, 2, 3, 4].map((i) => start + i);
      const fv = xs.map(() => rng.int(-8, 9));
      const gv = xs.map(() => rng.nonZero(-8, 9));
      const [i0, i1] = rng.sample([0, 1, 2, 3, 4], 2);
      const ops: [Op, Op] = d === 1 ? rng.pick([['add', 'sub'], ['sub', 'add'], ['add', 'mul']] as Array<[Op, Op]>) : rng.pick([['mul', 'div'], ['div', 'sub'], ['mul', 'div']] as Array<[Op, Op]>);
      const items = [
        { op: ops[0], i: i0 },
        { op: ops[1], i: i1 },
      ];
      return {
        prompt: 'Use the table of values to evaluate each combined function.',
        figure: valTable(xs, fv, gv),
        parts: items.map(({ op, i }) => numPart(opApply(op, fv[i], gv[i]), { label: `$${opTex(op, xs[i])} =$` })),
        hints: ['Read $f$ and $g$ in the column for the given $x$-value.', 'Combine the two values with the operation shown.'],
        solution: items.map(({ op, i }) => `From the table, $f(${xs[i]}) = ${fv[i]}$ and $g(${xs[i]}) = ${gv[i]}$, so ${combineLine(op, xs[i], fv[i], gv[i])}.`),
      };
    }

    if (kind === 'writeSumDiff') {
      const { f, g, which, res } = retry(
        () => {
          const f = rng.chance(0.5) ? randQuad(rng) : randLin(rng);
          const g = degP(f) === 2 && rng.chance(0.5) ? randLin(rng) : randQuad(rng);
          const which = rng.pick(['add', 'sub', 'sub', 'subRev'] as const);
          const res = which === 'add' ? padd(f, g) : which === 'sub' ? padd(f, g, -1) : padd(g, f, -1);
          return { f, g, which, res };
        },
        (o) => degP(o.res) >= 1,
      );
      const [first, second, F, G] = which === 'subRev' ? [g, f, 'g', 'f'] : [f, g, 'f', 'g'];
      const op: Op = which === 'add' ? 'add' : 'sub';
      const steps =
        op === 'add'
          ? [`$${opTex(op, 'x', F, G)} = (${ptex(first)}) + (${ptex(second)})$`, `Combine like terms: $${opTex(op, 'x', F, G)} = ${ptex(res)}$`]
          : [
              `$${opTex(op, 'x', F, G)} = (${ptex(first)}) - (${ptex(second)})$`,
              `Subtract every term of $${G}(x)$: $= ${ptex(first)}${cont(pscale(second, -1))}$`,
              `Combine like terms: $${opTex(op, 'x', F, G)} = ${ptex(res)}$`,
            ];
      return {
        prompt: `Given $f(x) = ${ptex(f)}$ and $g(x) = ${ptex(g)}$, write $${opTex(op, 'x', F, G)}$ in simplest form.`,
        parts: [exprPart(ptxt(res), `$${opTex(op, 'x', F, G)} =$`, 'expanded')],
        hints: [op === 'add' ? `Add the two expressions and combine like terms.` : `Put $${G}(x)$ in brackets: the subtraction applies to every one of its terms.`, 'Collect the $x^2$-terms, the $x$-terms and the constants.'],
        solution: steps,
      };
    }

    if (kind === 'writeProduct') {
      const f = randLin(rng);
      const g = rng.chance(0.5) ? randLin(rng) : randQuad(rng);
      const prod = pmul(f, g);
      const [b, a] = f;
      return {
        prompt: `Given $f(x) = ${ptex(f)}$ and $g(x) = ${ptex(g)}$, write $(fg)(x)$ in expanded form.`,
        parts: [exprPart(ptxt(prod), '$(fg)(x) =$', 'expanded')],
        hints: ['$(fg)(x) = f(x) \\cdot g(x)$.', 'Multiply each term of $f(x)$ by each term of $g(x)$, then combine like terms.'],
        solution: [
          `$(fg)(x) = (${ptex(f)})(${ptex(g)})$`,
          ...(b === 0
            ? [`Distribute: $(fg)(x) = ${ptex(prod)}$`]
            : [`Distribute: $= ${ptex(pmul([0, a], g))}${cont(pscale(g, b))}$`, `Combine like terms: $(fg)(x) = ${ptex(prod)}$`]),
        ],
      };
    }

    if (kind === 'evalGraph') {
      const setup = retry(
        () => {
          const m = rng.pick([-2, -1, 1, 2]);
          const b = rng.int(-3, 3);
          const sgn = rng.pick([1, -1]);
          const p = rng.int(-2, 2);
          const q = rng.int(-4, 4);
          const F: Fn = (x) => m * x + b;
          const G: Fn = (x) => sgn * (x - p) ** 2 + q;
          const ok = [-4, -3, -2, -1, 0, 1, 2, 3, 4].filter((x) => Math.abs(F(x)) <= 7 && Math.abs(G(x)) <= 7 && F(x) !== G(x) && G(x) !== 0);
          return { m, b, sgn, p, q, F, G, ok };
        },
        (o) => o.ok.length >= 2,
      );
      const [x0, x1] = rng.sample(setup.ok, 2);
      const ops = rng.sample<Op>(rng.chance(0.3) ? ['add', 'sub', 'div'] : ['add', 'sub', 'mul'], 2);
      const items = [
        { op: ops[0], x: x0 },
        { op: ops[1], x: x1 },
      ];
      const fig: PlaneFigure = {
        type: 'plane',
        grid: GRID,
        lines: [{ through: [[0, setup.b], [1, setup.b + setup.m]] }],
        polylines: curve(setup.G, GRID).map((points) => ({ points, color: 'accent' as const })),
      };
      return {
        prompt: 'The graphs of the linear function $y = f(x)$ (the line) and the quadratic function $y = g(x)$ (the parabola) are shown. Use them to evaluate each combined function.',
        figure: fig,
        parts: items.map(({ op, x }) => numPart(opApply(op, setup.F(x), setup.G(x)), { label: `$${opTex(op, x)} =$` })),
        hints: ['Read each function value from its graph at the given $x$-value.', 'Then combine the two values with the operation shown.'],
        solution: items.map(({ op, x }) => `From the graphs, $f(${x}) = ${setup.F(x)}$ and $g(${x}) = ${setup.G(x)}$, so ${combineLine(op, x, setup.F(x), setup.G(x))}.`),
      };
    }

    if (kind === 'domainQuotient') {
      const { c, p, q } = retry(
        () => {
          const c = rng.nonZero(-6, 6);
          const [p, q] = rng.chance(0.4) ? (([s]) => [-s, s])(distinctInts(rng, 1, 1, 6)) : distinctInts(rng, 2, -6, 6, [], false).sort((m, n) => m - n);
          return { c, p, q };
        },
        (o) => -o.c !== o.p && -o.c !== o.q,
      );
      const f: P = [c, 1];
      const g = fromRoots(1, [p, q]);
      const which = rng.weighted([['fg', 3], ['gf', 2], ['sum', 1], ['prod', 1]] as const);
      const gFac = facTex(1, [p, q]);
      let correct: string;
      let ds: string[];
      let steps: string[];
      if (which === 'fg') {
        correct = setX(neq([p, q]));
        ds = [setX(neq([-c])), setX([]), setX(neq([q])), setX(neq([-p, -q])), setX(neq([p, q, -c]))];
        steps = ['$f$ and $g$ are polynomials, so both are defined for every real number.', `The quotient is undefined where the denominator $g(x) = ${ptex(g)} = ${gFac}$ is $0$: ${orList([p, q])}.`, `The domain is ${correct}.`];
      } else if (which === 'gf') {
        correct = setX(neq([-c]));
        ds = [setX(neq([p, q])), setX([]), setX(neq([c])), setX(neq([p, q, -c]))];
        steps = ['$f$ and $g$ are polynomials, so both are defined for every real number.', `The quotient is undefined where the denominator $f(x) = ${ptex(f)}$ is $0$: $x = ${-c}$. (The zeros of $g$ are in the numerator, which may be $0$.)`, `The domain is ${correct}.`];
      } else {
        correct = setX([]);
        ds = [setX(neq([p, q])), setX(neq([-c])), setX(neq([p, q, -c]))];
        steps = [`$${opTex(which === 'sum' ? 'add' : 'mul')}$ is a polynomial: there is no denominator and no square root.`, `Both $f$ and $g$ are defined for every real number, so the domain is ${correct}.`];
      }
      const target = which === 'fg' ? opTex('div') : which === 'gf' ? opTex('div', 'x', 'g', 'f') : opTex(which === 'sum' ? 'add' : 'mul');
      return {
        prompt: `Let $f(x) = ${ptex(f)}$ and $g(x) = ${ptex(g)}$. What is the domain of $${target}$?`,
        parts: [part(mc(rng, correct, rng.shuffle(ds)))],
        hints: ['The domain of a combined function is where both functions are defined.', 'A quotient also excludes every value that makes its denominator $0$.'],
        solution: steps,
      };
    }

    if (kind === 'writeQuotient') {
      const a = rng.nonZero(-6, 6);
      const r = rng.intExcept(-6, 6, [a]);
      const f = fromRoots(1, [a, r]);
      const g: P = [-a, 1];
      const correct = setX(neq([a]));
      return {
        prompt: `Given $f(x) = ${ptex(f)}$ and $g(x) = ${ptex(g)}$, write $\\left(\\dfrac{f}{g}\\right)(x)$ in simplest form and state its domain.`,
        parts: [exprPart(ptxt([-r, 1]), '$\\left(\\dfrac{f}{g}\\right)(x) =$', 'expanded'), part(mc(rng, correct, rng.shuffle([setX([]), setX(neq([r])), setX(neq([-a])), setX(neq([a, r]))])), { label: 'Domain' })],
        hints: ['Factor $f(x)$ and cancel the common factor.', 'The domain comes from the original quotient: $g(x)$ cannot be $0$, even after cancelling.'],
        solution: [
          `$\\left(\\dfrac{f}{g}\\right)(x) = \\dfrac{${ptex(f)}}{${lin(a)}} = \\dfrac{${facTex(1, [a, r])}}{${lin(a)}}$`,
          `Cancel the common factor: $\\left(\\dfrac{f}{g}\\right)(x) = ${lin(r)}$.`,
          `The original denominator $${lin(a)}$ is $0$ at $x = ${a}$, so that value is still excluded: the domain is ${correct}.`,
        ],
        answerDisplay: `$${lin(r)}$, ${correct}`,
      };
    }

    if (kind === 'domainSqrt') {
      const dir = rng.pick(['ge', 'le'] as const);
      const a = rng.int(-5, 5);
      const inDom = (x: number) => (dir === 'ge' ? x >= a : x <= a);
      const fTex = dir === 'ge' ? `\\sqrt{${lin(a)}}` : `\\sqrt{${a === 0 ? '-x' : `${a} - x`}}`;
      const quad = rng.chance(0.3);
      let g: P;
      let zs: number[];
      if (quad) {
        const sq = retry(() => rng.int(1, 5), (sq) => sq !== Math.abs(a));
        g = [-sq * sq, 0, 1];
        zs = [-sq, sq];
      } else {
        const off = rng.chance(0.8) ? rng.int(1, 4) : -rng.int(1, 3);
        const b = dir === 'ge' ? a + off : a - off;
        g = [-b, 1];
        zs = [b];
      }
      const zin = zs.filter(inDom);
      const zout = zs.filter((z) => !inDom(z));
      const cond = dir === 'ge' ? `x \\ge ${a}` : `x \\le ${a}`;
      const strict = dir === 'ge' ? `x > ${a}` : `x < ${a}`;
      const opp = dir === 'ge' ? `x \\le ${a}` : `x \\ge ${a}`;
      const op = quad ? 'fg' : rng.pick(['add', 'mul', 'fg', 'fg', 'gf'] as const);
      let correct: string;
      let ds: string[];
      let extra: string;
      if (op === 'add' || op === 'mul') {
        correct = setX([cond]);
        ds = [setX([]), setX([strict]), setX([opp]), setX([cond, ...neq(zs)])];
        extra = `Nothing else is excluded (there is no denominator), so the domain of $${opTex(op === 'add' ? 'add' : 'mul')}$ is ${correct}.`;
      } else if (op === 'fg') {
        correct = setX([cond, ...neq(zin)]);
        ds = [setX([cond]), setX(neq(zs)), setX([strict, ...neq(zin)]), setX([cond, ...neq(zs)]), setX([opp, ...neq(zs)])];
        extra = `The denominator $g(x) = ${ptex(g)}$ is $0$ when ${orList(zs)}.${zout.length ? ` ${zout.map((z) => `$x = ${z}$`).join(' and ')} ${zout.length > 1 ? 'are' : 'is'} already outside the domain of $f$.` : ''}${zin.length ? ` Exclude ${zin.map((z) => `$x = ${z}$`).join(' and ')}.` : ''} The domain is ${correct}.`;
      } else {
        correct = setX([strict]);
        ds = [setX([cond]), setX([cond, ...neq(zin)]), setX(neq([a])), setX([strict, ...neq(zin)])];
        extra = `The denominator $f(x) = ${fTex}$ is $0$ when $x = ${a}$, so exclude it too. The zero of $g$ is in the numerator, which may be $0$. The domain is ${correct}.`;
      }
      const target = op === 'fg' ? opTex('div') : op === 'gf' ? opTex('div', 'x', 'g', 'f') : opTex(op);
      return {
        prompt: `Let $f(x) = ${fTex}$ and $g(x) = ${ptex(g)}$. What is the domain of $${target}$?`,
        parts: [part(mc(rng, correct, rng.shuffle(ds)))],
        hints: ['Start with the values where both $f$ and $g$ are defined: the radicand cannot be negative.', 'For a quotient, also exclude every value that makes the denominator $0$.'],
        solution: [`$f$ is defined when the radicand is not negative: ${dir === 'ge' ? `$${lin(a)} \\ge 0$` : `$${a === 0 ? '-x' : `${a} - x`} \\ge 0$`}${dir === 'ge' && a === 0 ? '' : `, so $${cond}$`}. $g$ is a polynomial, defined for every real number.`, extra],
      };
    }

    if (kind === 'writeQuotientDomain') {
      const [a, r, q] = distinctInts(rng, 3, -5, 5);
      const k = rng.pick([1, 1, 2, 3, -1]);
      const f = fromRoots(k, [a, r]);
      const g = fromRoots(1, [a, q]);
      const correct = setX(neq([a, q]));
      const expected = `${coefTxt(k)}(${linTxt(r)})/(${linTxt(q)})`;
      return {
        prompt: `Given $f(x) = ${ptex(f)}$ and $g(x) = ${ptex(g)}$, write $\\left(\\dfrac{f}{g}\\right)(x)$ in simplest form and state its domain.`,
        parts: [exprPart(expected, '$\\left(\\dfrac{f}{g}\\right)(x) =$'), part(mc(rng, correct, rng.shuffle([setX(neq([q])), setX([]), setX(neq([a, q, r])), setX(neq([-a, -q]))])), { label: 'Domain' })],
        hints: ['Factor both polynomials and cancel the common factor.', 'For the domain, use the factored denominator before cancelling.'],
        solution: [
          `$\\left(\\dfrac{f}{g}\\right)(x) = \\dfrac{${facTex(k, [a, r])}}{${facTex(1, [a, q])}} = \\dfrac{${facTex(k, [r])}}{${lin(q)}}$`,
          `The original denominator is $0$ when ${orList([a, q])}. Cancelling $${lin(a)}$ does not put $x = ${a}$ back into the domain.`,
          `The domain is ${correct}.`,
        ],
        answerDisplay: `$\\dfrac{${facTex(k, [r])}}{${lin(q)}}$, ${correct}`,
      };
    }

    // context
    const ctx = rng.pick(['garden', 'drone', 'density'] as const);
    if (ctx === 'garden') {
      const L0 = rng.int(10, 20);
      const W0 = rng.int(6, 12);
      const al = rng.pick([1, 2, 3]);
      const be = rng.pick([1, 2]);
      const t1 = rng.int(2, 6);
      const A = pmul([L0, al], [W0, be]);
      const town = rng.pick(['Hillcrest', 'Ashford', 'Lakeside', 'Pinewood', 'Maple Falls', 'Westbury']);
      return {
        prompt: `A rectangular community garden in ${town} is being enlarged. After $t$ years, its length is $L(t) = ${L0} + ${coefTex(al)}t$ metres and its width is $W(t) = ${W0} + ${coefTex(be)}t$ metres.\n\nWrite the area function $A(t) = (LW)(t)$ in expanded form, and find the area after $${t1}$ years.`,
        parts: [exprPart(ptxt(A, 't'), '$A(t) =$', 'expanded'), numPart(peval(A, t1), { label: `$A(${t1}) =$`, suffix: 'm²' })],
        hints: ['$A(t) = L(t) \\cdot W(t)$. Expand the product and combine like terms.', `Substitute $t = ${t1}$ into $A(t)$ (or multiply $L(${t1})$ by $W(${t1})$).`],
        solution: [
          `$A(t) = (${L0} + ${coefTex(al)}t)(${W0} + ${coefTex(be)}t) = ${ptex(A, 't')}$`,
          `$A(${t1}) = L(${t1}) \\cdot W(${t1}) = ${L0 + al * t1} \\times ${W0 + be * t1} = ${peval(A, t1)}$`,
          `After $${t1}$ years the garden has an area of $${peval(A, t1)}$ m².`,
        ],
        calculator: true,
      };
    }
    if (ctx === 'drone') {
      const { v, h0, c, e, t1 } = retry(
        () => ({ v: rng.pick([15, 18, 20, 24]), h0: rng.pick([1.5, 2]), c: rng.pick([2, 3, 4, 5]), e: rng.pick([5, 8, 10]), t1: rng.pick([1, 1.5, 2, 2.5]) }),
        (o) => -4.9 * o.t1 ** 2 + (o.v - o.c) * o.t1 + o.h0 - o.e > 0,
      );
      const D = trimP([h0 - e, v - c, -4.9]);
      const val = clean(peval(D, t1));
      return {
        prompt: `A ball is thrown upward. Its height after $t$ seconds is $h(t) = -4.9t^{2} + ${v}t + ${h0}$ metres. At the same moment, a drone rising at a steady rate is at height $k(t) = ${c}t + ${e}$ metres.\n\nWrite $d(t) = (h - k)(t)$, the height of the ball above the drone, in expanded form, and find $d(${t1})$.`,
        parts: [exprPart(ptxt(D, 't'), '$d(t) =$', 'expanded'), numPart(val, { label: `$d(${t1}) =$`, suffix: 'm', display: 'decimal' })],
        hints: ['$d(t) = h(t) - k(t)$: subtract every term of $k(t)$.', `Substitute $t = ${t1}$ into $d(t)$.`],
        solution: [
          `$d(t) = (-4.9t^{2} + ${v}t + ${h0}) - (${c}t + ${e}) = ${ptex(D, 't')}$`,
          `$d(${t1}) = ${subTex(D, t1)} = ${fmt(val)}$`,
          `After $${t1}$ s the ball is $${fmt(val)}$ m above the drone.`,
        ],
        calculator: true,
      };
    }
    const town = rng.pick(['Lakeside', 'Ashford', 'Oakridge', 'Elmwood', 'Brookfield', 'Hillcrest', 'Clearwater', 'Stonebridge']);
    const { P0, gr, A0, ga, t1 } = retry(
      () => ({ P0: rng.pick([8000, 12000, 15000, 20000, 24000]), gr: rng.pick([400, 600, 750, 900, 1200]), A0: rng.pick([20, 25, 30, 40]), ga: rng.pick([0.5, 1, 1.5, 2]), t1: rng.pick([5, 8, 10, 12, 15]) }),
      (o) => safeRound((o.P0 + o.gr * o.t1) / (o.A0 + o.ga * o.t1), 1),
    );
    const dens = (P0 + gr * t1) / (A0 + ga * t1);
    return {
      prompt: `The population of ${town} is modelled by $P(t) = ${P0} + ${gr}t$ people and its area by $A(t) = ${A0} + ${ga}t$ square kilometres, where $t$ is the number of years from now.\n\nThe population density is $D(t) = \\left(\\dfrac{P}{A}\\right)(t)$. Find the density in $${t1}$ years, to the nearest tenth of a person per square kilometre.`,
      parts: [numPart(dens, { label: `$D(${t1}) =$`, decimals: 1, suffix: 'people/km²' })],
      hints: ['$D(t) = \\dfrac{P(t)}{A(t)}$.', `Find $P(${t1})$ and $A(${t1})$, then divide.`],
      solution: [
        `$D(t) = \\dfrac{${P0} + ${gr}t}{${A0} + ${ga}t}$, defined for $t \\ge 0$ (the denominator is never $0$ there).`,
        `$P(${t1}) = ${P0} + ${gr}(${t1}) = ${P0 + gr * t1}$ and $A(${t1}) = ${A0} + ${ga}(${t1}) = ${fmt(A0 + ga * t1)}$.`,
        `$D(${t1}) = \\dfrac{${P0 + gr * t1}}{${fmt(A0 + ga * t1)}} \\approx ${roundTo(dens, 1).toFixed(1)}$ people per square kilometre.`,
      ],
      calculator: true,
    };
  },
});

// ---------------------------------------------------------------------------
// 8.5 — Composite functions
// ---------------------------------------------------------------------------

/** outer(inner) written out before expanding: 3(2x - 1)^{2} + 4(2x - 1) - 5. */
function substTex(outer: P, innerTex: string): string {
  const idx = outer.map((_, i) => i).filter((i) => outer[i] !== 0).reverse();
  let out = '';
  for (const i of idx) {
    const c = outer[i];
    const a = Math.abs(c);
    const body = i === 0 ? '' : i === 1 ? `(${innerTex})` : `(${innerTex})^{${i}}`;
    const coef = body && a === 1 ? '' : fmt(a);
    out += out === '' ? `${c < 0 ? '-' : ''}${coef}${body}` : ` ${c < 0 ? '-' : '+'} ${coef}${body}`;
  }
  return out || '0';
}
const linNZ = (rng: Rng): P => [rng.nonZero(-9, 9), rng.pick([2, 3, 4, 5, -1, -2, -3])];

type CompKind = 'evalEq' | 'evalTable' | 'writeLinear' | 'writeQuad' | 'evalGraph' | 'decompose' | 'selfComp' | 'domainComp' | 'solveComp' | 'findInner' | 'context';

const composition = skill({
  id: 'm301-composition',
  name: 'Composite functions',
  description: 'Evaluate and write composite functions from equations, tables and graphs, state the domain of a composite, and decompose a function into a composition.',
  outcomes: ['RF1'],
  lessonId: 'm301-8-5',
  gen(rng, d): GenOutput {
    const kind: CompKind =
      d === 1
        ? rng.weighted<CompKind>([['evalEq', 3], ['evalTable', 2], ['writeLinear', 3]])
        : d === 2
          ? rng.weighted<CompKind>([['writeQuad', 3], ['evalGraph', 2], ['evalTable', 1], ['decompose', 2], ['selfComp', 1]])
          : rng.weighted<CompKind>([['domainComp', 3], ['solveComp', 2], ['findInner', 2], ['context', 2]]);

    if (kind === 'evalEq') {
      const f = linNZ(rng);
      const g: P = [rng.int(-6, 6), rng.pick([0, 0, 1, -2]), rng.pick([1, 1, 2, -1])];
      const fg = rng.chance(0.5);
      const x0 = rng.int(-3, 3);
      const [inner, outer, In, Out] = fg ? [g, f, 'g', 'f'] : [f, g, 'f', 'g'];
      const iv = peval(inner, x0);
      const ov = peval(outer, iv);
      return {
        prompt: `Given $f(x) = ${ptex(f)}$ and $g(x) = ${ptex(g)}$, evaluate $${Out}(${In}(${x0}))$.`,
        parts: [numPart(ov, { label: `$${Out}(${In}(${x0})) =$` })],
        hints: ['Work from the inside out.', `First find $${In}(${x0})$, then substitute that value into $${Out}$.`],
        solution: [`Inside first: $${In}(${x0}) = ${subTex(inner, x0)} = ${iv}$.`, `Then $${Out}(${iv}) = ${subTex(outer, iv)} = ${ov}$.`, `So $${Out}(${In}(${x0})) = ${ov}$.`],
      };
    }

    if (kind === 'evalTable') {
      const start = rng.int(-3, -1);
      const xs = [0, 1, 2, 3, 4, 5].map((i) => start + i);
      const fv = xs.map(() => rng.pick(xs));
      const gv = xs.map(() => rng.pick(xs));
      const at = (vals: number[], x: number) => vals[xs.indexOf(x)];
      const asks: Array<{ out: 'f' | 'g'; inn: 'f' | 'g'; x: number }> =
        d === 1
          ? [{ out: rng.pick(['f', 'g'] as const), inn: 'g', x: rng.pick(xs) }].map((o) => ({ ...o, inn: o.out === 'f' ? 'g' : 'f' }))
          : rng.sample(xs, 3).map((x, i) => (i === 0 ? { out: 'f' as const, inn: 'g' as const, x } : i === 1 ? { out: 'g' as const, inn: 'f' as const, x } : rng.pick([{ out: 'f' as const, inn: 'f' as const, x }, { out: 'g' as const, inn: 'g' as const, x }])));
      const val = (o: { out: 'f' | 'g'; inn: 'f' | 'g'; x: number }) => {
        const iv = at(o.inn === 'f' ? fv : gv, o.x);
        return { iv, ov: at(o.out === 'f' ? fv : gv, iv) };
      };
      return {
        prompt: `Use the table of values to evaluate ${d === 1 ? 'the composite function' : 'each composite function'}.`,
        figure: valTable(xs, fv, gv),
        parts: asks.map((o) => numPart(val(o).ov, { label: `$${o.out}(${o.inn}(${o.x})) =$` })),
        hints: ['Work from the inside out: find the inner value in the table first.', 'Then look up that value in the $x$-row and read the outer function.'],
        solution: asks.map((o) => {
          const { iv, ov } = val(o);
          return `$${o.inn}(${o.x}) = ${iv}$, so $${o.out}(${o.inn}(${o.x})) = ${o.out}(${iv}) = ${ov}$.`;
        }),
      };
    }

    if (kind === 'writeLinear' || kind === 'selfComp') {
      const f = linNZ(rng);
      const g = linNZ(rng);
      const self = kind === 'selfComp';
      const fg = rng.chance(0.5);
      const [inner, outer, In, Out] = self ? [f, f, 'f', 'f'] : fg ? [g, f, 'g', 'f'] : [f, g, 'f', 'g'];
      const res = pcompose(outer, inner);
      return {
        prompt: self ? `Given $f(x) = ${ptex(f)}$, write $f(f(x))$ in simplest form.` : `Given $f(x) = ${ptex(f)}$ and $g(x) = ${ptex(g)}$, write $${Out}(${In}(x))$ in simplest form.`,
        parts: [exprPart(ptxt(res), `$${Out}(${In}(x)) =$`, 'expanded')],
        hints: [`Replace every $x$ in $${Out}(x)$ with the expression for $${In}(x)$.`, 'Expand and combine like terms.'],
        solution: [
          `$${Out}(${In}(x)) = ${substTex(outer, ptex(inner))}$`,
          `$= ${ptex(pscale(inner, outer[1]))}${outer[0] === 0 ? '' : plusC(outer[0])}$`,
          `$${Out}(${In}(x)) = ${ptex(res)}$`,
        ],
      };
    }

    if (kind === 'writeQuad') {
      const f: P = rng.chance(0.5) ? [rng.int(-9, 9), rng.int(-5, 5), 1] : [rng.int(-9, 9), 0, rng.pick([2, 3, -1])];
      const g = linNZ(rng);
      const fg = pcompose(f, g);
      const gf = pcompose(g, f);
      const sq = pmul(g, g);
      return {
        prompt: `Given $f(x) = ${ptex(f)}$ and $g(x) = ${ptex(g)}$, write $f(g(x))$ and $g(f(x))$ in expanded form.`,
        parts: [exprPart(ptxt(fg), '$f(g(x)) =$', 'expanded'), exprPart(ptxt(gf), '$g(f(x)) =$', 'expanded')],
        hints: ['For $f(g(x))$, replace every $x$ in $f(x)$ with $(' + ptex(g) + ')$; for $g(f(x))$, replace every $x$ in $g(x)$ with $(' + ptex(f) + ')$.', `Expand $(${ptex(g)})^{2} = ${ptex(sq)}$ carefully.`],
        solution: [
          `$f(g(x)) = ${substTex(f, ptex(g))}$`,
          `$(${ptex(g)})^{2} = ${ptex(sq)}$, so $f(g(x)) = ${ptex(pscale(sq, f[2]))}${f[1] === 0 ? '' : cont(pscale(g, f[1]))}${plusC(f[0])} = ${ptex(fg)}$`,
          `$g(f(x)) = ${substTex(g, ptex(f))} = ${ptex(gf)}$`,
          'The two composites are different: the order of composition matters.',
        ],
      };
    }

    if (kind === 'evalGraph') {
      const setup = retry(
        () => {
          const m = rng.pick([-2, -1, 1, 2]);
          const b = rng.int(-3, 3);
          const sgn = rng.pick([1, -1]);
          const p = rng.int(-2, 2);
          const q = rng.int(-4, 4);
          const F: Fn = (x) => m * x + b;
          const G: Fn = (x) => sgn * (x - p) ** 2 + q;
          const xs = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
          const okFG = xs.filter((x) => Math.abs(G(x)) <= 7 && Math.abs(F(G(x))) <= 7);
          const okGF = xs.filter((x) => Math.abs(F(x)) <= 7 && Math.abs(G(F(x))) <= 7);
          return { m, b, F, G, okFG, okGF };
        },
        (o) => o.okFG.length >= 1 && o.okGF.length >= 1,
      );
      const x0 = rng.pick(setup.okFG);
      const x1 = rng.pick(setup.okGF);
      const { F, G } = setup;
      const fig: PlaneFigure = {
        type: 'plane',
        grid: GRID,
        lines: [{ through: [[0, setup.b], [1, setup.b + setup.m]] }],
        polylines: curve(G, GRID).map((points) => ({ points, color: 'accent' as const })),
      };
      return {
        prompt: 'The graphs of the linear function $y = f(x)$ (the line) and the quadratic function $y = g(x)$ (the parabola) are shown. Evaluate each composite.',
        figure: fig,
        parts: [numPart(F(G(x0)), { label: `$f(g(${x0})) =$` }), numPart(G(F(x1)), { label: `$g(f(${x1})) =$` })],
        hints: ['Work from the inside out: read the inner function at the given $x$-value first.', 'Use that output as the input of the outer function, and read its graph there.'],
        solution: [
          `From the parabola, $g(${x0}) = ${G(x0)}$. From the line, $f(${G(x0)}) = ${F(G(x0))}$. So $f(g(${x0})) = ${F(G(x0))}$.`,
          `From the line, $f(${x1}) = ${F(x1)}$. From the parabola, $g(${F(x1)}) = ${G(F(x1))}$. So $g(f(${x1})) = ${G(F(x1))}$.`,
        ],
      };
    }

    if (kind === 'decompose') {
      const form = rng.pick(['square', 'sqrt', 'recip', 'cube'] as const);
      const a = rng.pick([2, 3, 4, 5, -2]);
      const b = rng.nonZero(-7, 7);
      const c = retry(() => rng.nonZero(-9, 9), (c) => c !== b);
      type Pair = { f: string; g: string; F: Fn; G: Fn };
      let h: Fn;
      let hT: string;
      let correct: Pair;
      let cands: Pair[];
      const lin2 = ptex([b, a]);
      if (form === 'square') {
        h = (x) => (a * x + b) ** 2 + c;
        hT = `(${lin2})^{2}${plusC(c)}`;
        correct = { f: `x^{2}${plusC(c)}`, g: lin2, F: (x) => x * x + c, G: (x) => a * x + b };
        cands = [
          { f: lin2, g: `x^{2}${plusC(c)}`, F: (x) => a * x + b, G: (x) => x * x + c },
          { f: 'x^{2}', g: ptex([b + c, a]), F: (x) => x * x, G: (x) => a * x + b + c },
          { f: `(${lin(-c)})^{2}`, g: lin2, F: (x) => (x + c) ** 2, G: (x) => a * x + b },
          { f: `x^{2}${plusC(c)}`, g: lin(-b), F: (x) => x * x + c, G: (x) => x + b },
        ];
      } else if (form === 'sqrt') {
        h = (x) => Math.sqrt(a * x + b) + c;
        hT = `\\sqrt{${lin2}}${plusC(c)}`;
        correct = { f: `\\sqrt{x}${plusC(c)}`, g: lin2, F: (x) => Math.sqrt(x) + c, G: (x) => a * x + b };
        cands = [
          { f: lin2, g: `\\sqrt{x}${plusC(c)}`, F: (x) => a * x + b, G: (x) => Math.sqrt(x) + c },
          { f: '\\sqrt{x}', g: ptex([b + c, a]), F: (x) => Math.sqrt(x), G: (x) => a * x + b + c },
          { f: `\\sqrt{${lin(-c)}}`, g: lin2, F: (x) => Math.sqrt(x + c), G: (x) => a * x + b },
          { f: `\\sqrt{x}${plusC(c)}`, g: lin(-b), F: (x) => Math.sqrt(x) + c, G: (x) => x + b },
        ];
      } else if (form === 'recip') {
        const k = Math.abs(a);
        h = (x) => k / (x * x + b);
        hT = `\\dfrac{${k}}{x^{2}${plusC(b)}}`;
        correct = { f: `\\dfrac{${k}}{x}`, g: `x^{2}${plusC(b)}`, F: (x) => k / x, G: (x) => x * x + b };
        cands = [
          { f: `x^{2}${plusC(b)}`, g: `\\dfrac{${k}}{x}`, F: (x) => x * x + b, G: (x) => k / x },
          { f: `\\dfrac{1}{x}`, g: `${k}x^{2}${plusC(b)}`, F: (x) => 1 / x, G: (x) => k * x * x + b },
          { f: `\\dfrac{${k}}{x}${plusC(b)}`, g: 'x^{2}', F: (x) => k / x + b, G: (x) => x * x },
          { f: `\\dfrac{${k}}{x^{2}}`, g: lin(-b), F: (x) => k / (x * x), G: (x) => x + b },
        ];
      } else {
        h = (x) => (x * x + b) ** 3;
        hT = `(x^{2}${plusC(b)})^{3}`;
        correct = { f: 'x^{3}', g: `x^{2}${plusC(b)}`, F: (x) => x ** 3, G: (x) => x * x + b };
        cands = [
          { f: `x^{2}${plusC(b)}`, g: 'x^{3}', F: (x) => x * x + b, G: (x) => x ** 3 },
          { f: `x^{3}${plusC(b)}`, g: 'x^{2}', F: (x) => x ** 3 + b, G: (x) => x * x },
          { f: 'x^{2}', g: `(${lin(-b)})^{3}`, F: (x) => x * x, G: (x) => (x + b) ** 3 },
          { f: `x^{3}${plusC(b ** 3)}`, g: 'x^{2}', F: (x) => x ** 3 + b ** 3, G: (x) => x * x },
        ];
      }
      const XS = [0.7, 1.3, 2.1, 3.4, 4.6];
      const works = (pr: Pair) => XS.every((x) => Math.abs(pr.F(pr.G(x)) - h(x)) < 1e-9 || (!Number.isFinite(pr.F(pr.G(x))) && !Number.isFinite(h(x))));
      const txt = (pr: Pair) => `$f(x) = ${pr.f}$ and $g(x) = ${pr.g}$`;
      const ds = rng.shuffle(cands.filter((pr) => !works(pr))).map(txt);
      return {
        prompt: `Let $h(x) = ${hT}$. Which pair of functions satisfies $h(x) = f(g(x))$?`,
        parts: [part(mc(rng, txt(correct), ds))],
        hints: ['$g$ is the inner function: what is done to $x$ first?', '$f$ is the outer function: what is done to the result of $g$?'],
        solution: [
          `To evaluate $h(x)$, you first calculate $${correct.g}$; that is the inner function $g(x) = ${correct.g}$.`,
          `Then the result is put into $f(x) = ${correct.f}$.`,
          `Check: $f(g(x)) = ${correct.f.replace(/x/g, `(${correct.g})`).replace(/\\dfrac\{(\d+)\}\{\((.*)\)\}/, '\\dfrac{$1}{$2}')} = ${hT}$.`,
        ],
      };
    }

    if (kind === 'domainComp') {
      const variant = rng.pick(['sqrtInner', 'sqrtOuter', 'sqrtRev', 'recipShift', 'recipRecip', 'squareSqrt'] as const);
      let fT: string;
      let gT: string;
      let comp = 'f(g(x))';
      let expected: string;
      let compTex: string;
      let correct: string;
      let ds: string[];
      let why: string[];
      if (variant === 'sqrtInner' || variant === 'sqrtOuter') {
        const a = rng.pick([-5, -4, -3, -2, -1, 1, 2]);
        fT = '\\sqrt{x}';
        gT = lin(a);
        if (variant === 'sqrtInner') {
          expected = `sqrt(${linTxt(a)})`;
          compTex = `\\sqrt{${lin(a)}}`;
          correct = setX([`x \\ge ${a}`]);
          ds = [setX(['x \\ge 0']), setX([`x \\ge ${-a}`]), setX([]), setX([`x > ${a}`])];
          why = [`$f(g(x)) = f(${lin(a)}) = ${compTex}$.`, `$g$ accepts every real number, but $f$ needs a non-negative input: $${lin(a)} \\ge 0$, so $x \\ge ${a}$.`];
        } else {
          comp = 'g(f(x))';
          expected = `sqrt(x)${a < 0 ? ' + ' : ' - '}${Math.abs(a)}`;
          compTex = `\\sqrt{x}${plusC(-a)}`;
          correct = setX(['x \\ge 0']);
          ds = [setX([`x \\ge ${a}`]), setX([]), setX(['x > 0']), setX([`x \\ge ${-a}`])];
          why = [`$g(f(x)) = g(\\sqrt{x}) = ${compTex}$.`, '$f$ is applied first, and it needs $x \\ge 0$. $g$ accepts every output of $f$, so nothing else is excluded.'];
        }
      } else if (variant === 'sqrtRev') {
        const a = rng.int(2, 6);
        fT = '\\sqrt{x}';
        gT = `${a} - x`;
        expected = `sqrt(${a} - x)`;
        compTex = `\\sqrt{${a} - x}`;
        correct = setX([`x \\le ${a}`]);
        ds = [setX([`x \\ge ${a}`]), setX(['x \\ge 0']), setX([`x < ${a}`]), setX([])];
        why = [`$f(g(x)) = f(${a} - x) = ${compTex}$.`, `The input of $f$ must not be negative: $${a} - x \\ge 0$, so $x \\le ${a}$.`];
      } else if (variant === 'recipShift') {
        const a = rng.nonZero(-5, 5);
        const b = rng.intExcept(-6, 6, [0, a]);
        fT = `\\dfrac{1}{${lin(a)}}`;
        gT = lin(-b);
        expected = `1/(${linTxt(a - b)})`;
        compTex = `\\dfrac{1}{${lin(a - b)}}`;
        correct = setX(neq([a - b]));
        ds = [setX(neq([a])), setX(neq([-b])), setX([]), setX(neq([b - a]))];
        why = [`$f(g(x)) = \\dfrac{1}{(${lin(-b)}) ${a < 0 ? '+' : '-'} ${Math.abs(a)}} = ${compTex}$.`, `$f$ cannot accept the input $${a}$: $g(x) = ${a}$ when $x = ${a - b}$. So $x \\ne ${a - b}$.`];
      } else if (variant === 'recipRecip') {
        const a = rng.nonZero(-5, 5);
        fT = '\\dfrac{1}{x}';
        gT = `\\dfrac{1}{${lin(a)}}`;
        expected = ptxt([-a, 1]);
        compTex = lin(a);
        correct = setX(neq([a]));
        ds = [setX([]), setX(neq([0])), setX(neq([0, a])), setX(neq([-a]))];
        why = [`$f(g(x)) = \\dfrac{1}{\\frac{1}{${lin(a)}}} = ${lin(a)}$.`, `The simplified form hides a restriction: $g(x)$ is undefined at $x = ${a}$, so that value is not in the domain of $f(g(x))$. ($g(x)$ is never $0$, so $f$ adds no restriction.)`];
      } else {
        const a = rng.int(-4, 3);
        fT = 'x^{2}';
        gT = `\\sqrt{${lin(a)}}`;
        expected = ptxt([-a, 1]);
        compTex = lin(a);
        correct = setX([`x \\ge ${a}`]);
        ds = [setX([]), setX(['x \\ge 0']), setX([`x > ${a}`]), setX([`x \\ge ${-a}`])];
        why = [`$f(g(x)) = (\\sqrt{${lin(a)}})^{2} = ${lin(a)}$.`, `But $g$ is applied first and needs $${lin(a)} \\ge 0$, so the domain is $x \\ge ${a}$, not all real numbers.`];
      }
      return {
        prompt: `Given $f(x) = ${fT}$ and $g(x) = ${gT}$, write $${comp}$ in simplest form and state its domain.`,
        parts: [exprPart(expected, `$${comp} =$`), part(mc(rng, correct, rng.shuffle(ds)), { label: 'Domain' })],
        hints: [`Substitute the inner function into the outer function.`, 'The domain of a composite contains the $x$-values in the domain of the inner function whose outputs are in the domain of the outer function. Check the restrictions before simplifying.'],
        solution: [...why, `The domain is ${correct}.`],
        answerDisplay: `$${comp} = ${compTex}$; ${correct}`,
      };
    }

    if (kind === 'solveComp') {
      if (rng.chance(0.5)) {
        const p = rng.int(-6, 6);
        const q = rng.nonZero(-5, 5);
        const s = rng.int(1, 6);
        const c = p + s * s;
        return {
          prompt: `Given $f(x) = x^{2}${plusC(p)}$ and $g(x) = ${lin(q)}$, solve $f(g(x)) = ${c}$.`,
          parts: [solPart([q - s, q + s])],
          hints: ['Write $f(g(x))$ first.', `Solve $(${lin(q)})^{2}${plusC(p)} = ${c}$ by isolating the square and taking square roots.`],
          solution: [`$f(g(x)) = (${lin(q)})^{2}${plusC(p)}$.`, `$(${lin(q)})^{2}${plusC(p)} = ${c}$ gives $(${lin(q)})^{2} = ${s * s}$.`, `$${lin(q)} = \\pm ${s}$, so $x = ${q - s}$ or $x = ${q + s}$.`],
        };
      }
      const a = rng.pick([2, 3, 4, -2]);
      const b = rng.int(-9, 9);
      const p = rng.int(-4, 4);
      const s = rng.int(1, 5);
      const c = a * (s * s + p) + b;
      return {
        prompt: `Given $f(x) = ${ptex([b, a])}$ and $g(x) = x^{2}${plusC(p)}$, solve $f(g(x)) = ${c}$.`,
        parts: [solPart([-s, s])],
        hints: ['Write $f(g(x))$ by substituting $g(x)$ into $f$.', 'Solve the resulting equation for $x^2$, then take square roots.'],
        solution: [`$f(g(x)) = ${a}(x^{2}${plusC(p)})${plusC(b)} = ${ptex([a * p + b, 0, a])}$.`, `$${ptex([a * p + b, 0, a])} = ${c}$ gives $${a}x^{2} = ${c - a * p - b}$, so $x^{2} = ${s * s}$.`, `$x = ${-s}$ or $x = ${s}$.`],
      };
    }

    if (kind === 'findInner') {
      if (rng.chance(0.5)) {
        const a = rng.pick([2, 3, 4, 5, -2]);
        const b = rng.nonZero(-9, 9);
        const g: P = rng.chance(0.5) ? [rng.int(-6, 6), rng.nonZero(-5, 5), rng.pick([1, -1, 2])] : linNZ(rng);
        const f: P = [b, a];
        const h = pcompose(f, g);
        return {
          prompt: `Let $f(x) = ${ptex(f)}$. Find $g(x)$ if $f(g(x)) = ${ptex(h)}$.`,
          parts: [exprPart(ptxt(g), '$g(x) =$', 'expanded')],
          hints: [`$f(g(x)) = ${a}\\,g(x)${plusC(b)}$.`, `Set $${a}\\,g(x)${plusC(b)} = ${ptex(h)}$ and solve for $g(x)$.`],
          solution: [`$f(g(x)) = ${a}\\,g(x)${plusC(b)}$, so $${a}\\,g(x)${plusC(b)} = ${ptex(h)}$.`, `$${a}\\,g(x) = ${ptex(padd(h, [b], -1))}$`, `$g(x) = ${ptex(g)}$`],
        };
      }
      const c = rng.nonZero(-4, 4);
      const f: P = [rng.int(-6, 6), rng.int(-4, 4), 1];
      const g: P = [c, 1];
      const h = pcompose(f, g);
      return {
        prompt: `Let $g(x) = ${ptex(g)}$. Find $f(x)$ if $f(g(x)) = ${ptex(h)}$.`,
        parts: [exprPart(ptxt(f), '$f(x) =$', 'expanded')],
        hints: [`Let $u = ${ptex(g)}$, so $x = ${lin(c, 'u')}$.`, `Substitute $x = ${lin(c, 'u')}$ into $${ptex(h)}$ and simplify to get $f(u)$.`],
        solution: [
          `Let $u = g(x) = ${ptex(g)}$; then $x = ${lin(c, 'u')}$.`,
          `$f(u) = ${substTex(h, lin(c, 'u'))}$`,
          `Expand and simplify: $f(u) = ${ptex(f, 'u')}$, so $f(x) = ${ptex(f)}$.`,
          `Check: $f(g(x)) = ${substTex(f, ptex(g))} = ${ptex(h)}$.`,
        ],
      };
    }

    // context
    const ctx = rng.pick(['oil', 'balloon', 'temp'] as const);
    if (ctx === 'oil') {
      const { v, r0, t1 } = retry(
        () => ({ v: rng.pick([2, 3, 4, 5]), r0: rng.pick([0, 1, 2, 5]), t1: rng.pick([2, 3, 4, 5, 6]) }),
        (o) => safeRound(Math.PI * (o.v * o.t1 + o.r0) ** 2, 0),
      );
      const A1 = Math.PI * (v * t1 + r0) ** 2;
      const rT = ptex([r0, v], 't');
      return {
        prompt: `Oil leaking from a tanker spreads in a circle. The radius after $t$ hours is $r(t) = ${rT}$ metres, and the area of a circle of radius $r$ is $A(r) = \\pi r^{2}$.\n\nWrite $A(r(t))$, and find the area of the slick after $${t1}$ h, to the nearest square metre.`,
        parts: [exprPart(`pi(${ptxt([r0, v], 't')})^2`, '$A(r(t)) =$'), numPart(A1, { label: `$A(r(${t1}))$`, decimals: 0, suffix: 'm²' })],
        hints: ['$A(r(t))$ means: substitute the expression for $r(t)$ in place of $r$.', `First find $r(${t1})$, then the area.`],
        solution: [`$A(r(t)) = \\pi(${rT})^{2}$`, `$r(${t1}) = ${v * t1 + r0}$ m, so $A(r(${t1})) = \\pi(${v * t1 + r0})^{2} \\approx ${Math.round(A1)}$ m².`],
        calculator: true,
      };
    }
    if (ctx === 'balloon') {
      const { v, r0, t1 } = retry(
        () => ({ v: rng.pick([0.5, 1, 1.5, 2]), r0: rng.pick([2, 3, 4, 5]), t1: rng.pick([2, 3, 4, 5]) }),
        (o) => safeRound((4 / 3) * Math.PI * (o.v * o.t1 + o.r0) ** 3, 0),
      );
      const R1 = v * t1 + r0;
      const V1 = (4 / 3) * Math.PI * R1 ** 3;
      const rT = ptex([r0, v], 't');
      return {
        prompt: `A spherical balloon is being inflated. Its radius after $t$ seconds is $r(t) = ${rT}$ centimetres, and the volume of a sphere is $V(r) = \\dfrac{4}{3}\\pi r^{3}$.\n\nWrite $V(r(t))$, and find the volume after $${t1}$ s, to the nearest cubic centimetre.`,
        parts: [exprPart(`(4/3)pi(${ptxt([r0, v], 't')})^3`, '$V(r(t)) =$'), numPart(V1, { label: `$V(r(${t1}))$`, decimals: 0, suffix: 'cm³' })],
        hints: ['Substitute the expression for $r(t)$ in place of $r$ in $V(r)$.', `First find $r(${t1})$, then the volume.`],
        solution: [`$V(r(t)) = \\dfrac{4}{3}\\pi(${rT})^{3}$`, `$r(${t1}) = ${fmt(R1)}$ cm, so $V(r(${t1})) = \\dfrac{4}{3}\\pi(${fmt(R1)})^{3} \\approx ${Math.round(V1)}$ cm³.`],
        calculator: true,
      };
    }
    const F0 = retry(
      () => rng.int(-40, 110),
      (f) => f !== 32 && safeRound((5 / 9) * (f - 32), 1) && safeRound((5 / 9) * (f - 32) + 273.15, 1),
    );
    const C0 = (5 / 9) * (F0 - 32);
    const K0 = C0 + 273.15;
    return {
      prompt: `Temperatures convert with $C(F) = \\dfrac{5}{9}(F - 32)$ (Fahrenheit to Celsius) and $K(C) = C + 273.15$ (Celsius to kelvins). A reading is $${F0}$°F.\n\nFind $C(${F0})$ and $K(C(${F0}))$, each to the nearest tenth.`,
      parts: [numPart(C0, { label: `$C(${F0})$`, decimals: 1, suffix: '°C' }), numPart(K0, { label: `$K(C(${F0}))$`, decimals: 1, suffix: 'K' })],
      hints: ['Work from the inside out: convert to Celsius first.', 'Then add $273.15$ to convert Celsius to kelvins.'],
      solution: [`$C(${F0}) = \\dfrac{5}{9}(${F0} - 32) = \\dfrac{5}{9}(${F0 - 32}) \\approx ${roundTo(C0, 1).toFixed(1)}$ °C`, `$K(C(${F0})) = ${roundTo(C0, 4)} + 273.15 \\approx ${roundTo(K0, 1).toFixed(1)}$ K (round only at the end).`],
      calculator: true,
    };
  },
});

export const RATIONALFNS_SKILLS: SkillDef[] = [rationalFeatures, rationalGraph, rationalEquations, functionOperations, composition];
