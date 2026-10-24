/** Math 20-1 Unit 3 — Quadratic Functions (RF3, RF4). */
import { fixedChoice, mc, numPart, part, skill } from '../../helpers.ts';
import { fmt, fmtFixed, fracLatex, radicalSplit, roundTo, toFrac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { GridSpec, Part, PlaneFigure, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Formatting and graphing helpers (also used by systems.ts)
// ---------------------------------------------------------------------------

/** A number in LaTeX: integers plainly, fractions (denominator up to 100) as fractions, or a decimal when asked. */
export function texNum(x: number, opts: { dfrac?: boolean; decimal?: boolean } = {}): string {
  if (Number.isInteger(x) || opts.decimal) return fmt(x);
  const f = toFrac(x, 100);
  return f ? fracLatex(f, { dfrac: opts.dfrac }) : fmt(x);
}

/** Coefficient written in front of a bracket or a variable: '' for 1 and '-' for -1. */
export function coefTex(a: number, decimal = false): string {
  if (a === 1) return '';
  if (a === -1) return '-';
  return texNum(a, { decimal });
}

/** (x - p)^2, or x^2 when p = 0. */
function sqTex(p: number, x = 'x', decimal = false): string {
  if (p === 0) return `${x}^2`;
  const n = texNum(Math.abs(p), { decimal });
  return n.includes('\\frac') ? `\\left(${x} ${p > 0 ? '-' : '+'} ${n}\\right)^2` : `(${x} ${p > 0 ? '-' : '+'} ${n})^2`;
}

/** The right side of y = a(x - p)^2 + q. */
export function vertexTex(a: number, p: number, q: number, x = 'x', decimal = false): string {
  const qs = q === 0 ? '' : ` ${q > 0 ? '+' : '-'} ${texNum(Math.abs(q), { decimal })}`;
  return `${coefTex(a, decimal)}${sqTex(p, x, decimal)}${qs}`;
}

/** A polynomial from [coefficient, body] pairs, skipping zero terms. */
export function polyTex(terms: Array<[number, string]>, decimal = false): string {
  let out = '';
  for (const [c, body] of terms) {
    if (Math.abs(c) < 1e-12) continue;
    const abs = Math.abs(c);
    const k = body && abs === 1 ? '' : texNum(abs, { decimal });
    out += out === '' ? `${c < 0 ? '-' : ''}${k}${body}` : ` ${c < 0 ? '-' : '+'} ${k}${body}`;
  }
  return out || '0';
}

/** ax^2 + bx + c. */
export function stdTex(a: number, b: number, c: number, x = 'x', decimal = false): string {
  return polyTex([[a, `${x}^2`], [b, x], [c, '']], decimal);
}

/** A number for substitution, in brackets when negative: (-3). */
export function par(x: number, decimal = false): string {
  const s = texNum(x, { decimal });
  return x < 0 ? `(${s})` : s;
}

/** A number always in brackets, for substituting into products and powers: (3), (-2), (3/2). */
export function br(x: number, decimal = false): string {
  const s = texNum(x, { decimal });
  return s.includes('\\frac') ? `\\left(${s}\\right)` : `(${s})`;
}

/** An ordered pair with exact fractions. */
export function ptTex(x: number, y: number): string {
  return `(${texNum(x)},\\ ${texNum(y)})`;
}

const REALS = '\\mathbb{R}';
/** {x | x ∈ R} */
export const allReals = (v = 'x') => `\\{${v} \\mid ${v} \\in ${REALS}\\}`;
/** {y | y ≥ k, y ∈ R} */
export function boundSet(v: string, op: '\\ge' | '\\le', k: number): string {
  return `\\{${v} \\mid ${v} ${op} ${texNum(k)},\\ ${v} \\in ${REALS}\\}`;
}

type Pt = [number, number];
const r3 = (v: number) => Math.round(v * 1000) / 1000;

/** Sample y = f(x) across the grid and clip it to the grid: one polyline per visible piece. */
export function curvePieces(f: (x: number) => number, grid: GridSpec, extraXs: number[] = []): Pt[][] {
  const n = 160;
  const raw = Array.from({ length: n + 1 }, (_, i) => grid.xMin + ((grid.xMax - grid.xMin) * i) / n);
  for (const x of extraXs) if (x > grid.xMin && x < grid.xMax) raw.push(x);
  raw.sort((a, b) => a - b);
  const xs = raw.filter((x, i) => i === 0 || x - raw[i - 1] > 1e-9);
  const inside = (y: number) => y >= grid.yMin - 1e-9 && y <= grid.yMax + 1e-9;
  const cross = (x0: number, x1: number, level: number): Pt => {
    let lo = x0;
    let hi = x1;
    const s = Math.sign(f(lo) - level);
    for (let i = 0; i < 50; i++) {
      const mid = (lo + hi) / 2;
      if (Math.sign(f(mid) - level) === s) lo = mid;
      else hi = mid;
    }
    return [r3((lo + hi) / 2), level];
  };
  const pieces: Pt[][] = [];
  let cur: Pt[] = [];
  for (let i = 0; i < xs.length; i++) {
    const x = xs[i];
    const y = f(x);
    if (i > 0) {
      const px = xs[i - 1];
      const py = f(px);
      if (inside(py) && !inside(y)) {
        cur.push(cross(px, x, y > grid.yMax ? grid.yMax : grid.yMin));
        pieces.push(cur);
        cur = [];
        continue;
      }
      if (!inside(py) && inside(y)) cur = [cross(px, x, py > grid.yMax ? grid.yMax : grid.yMin)];
    }
    if (inside(y)) cur.push([r3(x), r3(y)]);
  }
  if (cur.length > 1) pieces.push(cur);
  return pieces.filter((p) => p.length > 1);
}

export type Curve = { f: (x: number) => number; color?: 'brand' | 'accent' | 'muted'; vertexX?: number };

/** A coordinate plane with parabolas (or other curves) drawn as clipped polylines. */
export function curvePlane(grid: GridSpec, curves: Curve[], extra: Partial<Omit<PlaneFigure, 'type' | 'grid'>> = {}): PlaneFigure {
  return {
    type: 'plane',
    grid,
    polylines: curves.flatMap((c) => curvePieces(c.f, grid, c.vertexX !== undefined ? [c.vertexX] : []).map((points) => ({ points, color: c.color ?? 'brand' }))),
    ...extra,
  };
}

export const GRID10: GridSpec = { xMin: -10, xMax: 10, yMin: -10, yMax: 10 };

/** True when x is safely away from a rounding boundary at the given number of decimals. */
export function safeRound(x: number, decimals: number): boolean {
  const s = Math.abs(x) * 10 ** decimals;
  return Math.abs(s - Math.floor(s) - 0.5) > 0.02;
}

const NAMES = ['Aiyana', 'Mateo', 'Priya', 'Liam', 'Mei', 'Kwame', 'Sofia', 'Arjun', 'Chloé', 'Tariq', 'Noah', 'Amara', 'Jasmine', 'Ethan', 'Nadia', 'Owen', 'Leila', 'Dakota', 'Hamid', 'Grace'];

const A_INT = [-3, -2, -1, 1, 2, 3];

/** "(since x + 3 = x - (-3), p = -3)" when p is negative. */
function signNote(p: number): string {
  return p < 0 ? ` (because $x + ${texNum(-p)} = x - (${texNum(p)})$)` : '';
}

const opOf = (a: number): '\\ge' | '\\le' => (a > 0 ? '\\ge' : '\\le');
const oppOf = (a: number): '\\ge' | '\\le' => (a > 0 ? '\\le' : '\\ge');

/** Range choices for a parabola with vertex (p, q). */
function rangeMc(rng: Rng, a: number, p: number, q: number) {
  const correct = `$${boundSet('y', opOf(a), q)}$`;
  const wrong = rng.shuffle([`$${boundSet('y', oppOf(a), q)}$`, `$${boundSet('y', opOf(a), p)}$`, `$${allReals('y')}$`, `$${boundSet('x', opOf(a), p)}$`]);
  return mc(rng, correct, wrong);
}

/** Domain-and-range choices for a parabola with vertex (p, q). */
function domainRangeMc(rng: Rng, a: number, p: number, q: number) {
  const dr = (d: string, r: string) => `Domain: $${d}$; range: $${r}$`;
  const correct = dr(allReals('x'), boundSet('y', opOf(a), q));
  const wrong = rng.shuffle([
    dr(boundSet('x', opOf(a), p), boundSet('y', opOf(a), q)),
    dr(allReals('x'), boundSet('y', oppOf(a), q)),
    dr(allReals('x'), boundSet('y', opOf(a), p)),
    dr(allReals('x'), boundSet('y', opOf(a), -q)),
  ]);
  return mc(rng, correct, wrong);
}

function rangeReason(a: number, q: number): string {
  return a > 0
    ? `The parabola opens up, so $${texNum(q)}$ is the minimum value and $y$ takes every value from $${texNum(q)}$ upward: range $${boundSet('y', '\\ge', q)}$.`
    : `The parabola opens down, so $${texNum(q)}$ is the maximum value and $y$ takes every value from $${texNum(q)}$ downward: range $${boundSet('y', '\\le', q)}$.`;
}

const vertexPart = (x: number, y: number, label = 'Vertex:'): Part => part({ kind: 'point', x, y }, { label, placeholder: '(x, y)' });

// ---------------------------------------------------------------------------
// 3.1 — Vertex form
// ---------------------------------------------------------------------------

const PATHS = [
  (n: string, h0: number) => `${n} throws a ball from a height of $${fmt(h0)}$ m`,
  (n: string, h0: number) => `A shot put leaves ${n}’s hand $${fmt(h0)}$ m above the ground`,
  (n: string, h0: number) => `Water from a fountain nozzle in ${n}’s garden leaves the nozzle $${fmt(h0)}$ m above the ground`,
  (n: string, h0: number) => `${n} serves a volleyball, hitting it $${fmt(h0)}$ m above the floor`,
  (n: string, h0: number) => `${n} kicks a soccer ball off a ledge $${fmt(h0)}$ m above the field`,
];

const vertexFeatures = skill({
  id: 'm201-vertex-features',
  name: 'Features of vertex form',
  description: 'State the vertex, axis of symmetry, direction of opening, maximum or minimum value, domain and range of y = a(x − p)² + q from its equation or its graph.',
  outcomes: ['RF3'],
  lessonId: 'm201-3-1',
  gen(rng, d) {
    if (d === 1) {
      const a = rng.pick(A_INT);
      const p = rng.int(-6, 6);
      const q = rng.int(-8, 8);
      const eq = `y = ${vertexTex(a, p, q)}`;
      const match = `Compare $${eq}$ with $y = a(x - p)^2 + q$: $a = ${a}$, $p = ${p}$${signNote(p)} and $q = ${q}$.`;
      if (rng.chance(0.5)) {
        return {
          prompt: `For the quadratic function $${eq}$, state the coordinates of the vertex and the equation of the axis of symmetry.`,
          parts: [vertexPart(p, q), numPart(p, { label: 'Axis of symmetry: $x =$' })],
          hints: ['In $y = a(x - p)^2 + q$, the vertex is $(p, q)$ and the axis of symmetry is the line $x = p$.', 'Watch the sign inside the brackets: $(x + 3)^2$ means $p = -3$.'],
          solution: [match, `The vertex is $(p, q) = ${ptTex(p, q)}$.`, `The axis of symmetry is the vertical line through the vertex: $x = ${p}$.`],
        };
      }
      return {
        prompt: `For the quadratic function $${eq}$, state the direction of opening and the maximum or minimum value of the function.`,
        parts: [
          { label: 'Direction of opening:', answer: fixedChoice(['Opens up, so the vertex is a minimum point', 'Opens down, so the vertex is a maximum point'], a > 0 ? 0 : 1) },
          numPart(q, { label: 'Maximum or minimum value:' }),
        ],
        hints: ['The sign of $a$ tells you the direction of opening.', 'The maximum or minimum value is the $y$-coordinate of the vertex, $q$.'],
        solution: [
          match,
          `$a = ${a}$ is ${a > 0 ? 'positive, so the parabola opens up and the vertex is the lowest point' : 'negative, so the parabola opens down and the vertex is the highest point'}.`,
          `The ${a > 0 ? 'minimum' : 'maximum'} value is $q = ${q}$.`,
        ],
      };
    }

    if (d === 2) {
      if (rng.chance(0.5)) {
        // From the equation: vertex and range.
        const a = rng.pick([-3, -2, -1, -0.5, -0.25, 0.25, 0.5, 2, 3]);
        const p = rng.nonZero(-7, 7);
        const q = rng.intExcept(-9, 9, [p, 0]);
        const eq = `y = ${vertexTex(a, p, q)}`;
        return {
          prompt: `For $${eq}$, state the vertex and the range.`,
          parts: [vertexPart(p, q), { label: 'Range:', answer: rangeMc(rng, a, p, q) }],
          hints: ['Read $p$ and $q$ from $y = a(x - p)^2 + q$; the vertex is $(p, q)$.', 'The range starts at the $y$-coordinate of the vertex. The sign of $a$ tells you whether it goes up or down from there.'],
          solution: [
            `Compare with $y = a(x - p)^2 + q$: $a = ${texNum(a)}$, $p = ${p}$${signNote(p)} and $q = ${q}$.`,
            `The vertex is $${ptTex(p, q)}$.`,
            rangeReason(a, q),
          ],
        };
      }
      // From a graph: vertex, axis and range.
      const a = rng.pick([-2, -1, -0.5, 0.5, 1, 2]);
      const p = rng.int(-5, 5);
      const q = a > 0 ? rng.int(-8, 2) : rng.int(-2, 8);
      const fig = curvePlane(GRID10, [{ f: (x) => a * (x - p) ** 2 + q, vertexX: p }], { points: [{ x: p, y: q }] });
      return {
        prompt: 'The graph of a quadratic function is shown. State the vertex, the equation of the axis of symmetry, and the range.',
        figure: fig,
        parts: [vertexPart(p, q), numPart(p, { label: 'Axis of symmetry: $x =$' }), { label: 'Range:', answer: rangeMc(rng, a, p, q) }],
        hints: ['The vertex is the turning point of the parabola (marked with a dot).', 'The axis of symmetry is the vertical line through the vertex. The range depends on the $y$-coordinate of the vertex and the direction of opening.'],
        solution: [
          `The turning point is $${ptTex(p, q)}$, so that is the vertex.`,
          `The axis of symmetry is the vertical line through the vertex: $x = ${p}$.`,
          rangeReason(a, q),
        ],
      };
    }

    // d === 3
    if (rng.chance(0.55)) {
      // A projectile in context.
      const a = rng.pick([-0.1, -0.2, -0.25, -0.4, -0.5]);
      const p = a <= -0.4 ? rng.int(3, 6) : rng.int(4, 9);
      const h0 = rng.pick([0.5, 1, 1.5, 2, 2.5]);
      const q = roundTo(h0 - a * p * p, 4);
      const name = rng.pick(NAMES);
      const ctx = rng.pick(PATHS)(name, h0);
      const eq = `h = ${vertexTex(a, p, q, 'd', true)}`;
      const correct = `$\\{h \\mid 0 \\le h \\le ${fmt(q)},\\ h \\in ${REALS}\\}$`;
      const wrong = [
        `$\\{h \\mid ${fmt(h0)} \\le h \\le ${fmt(q)},\\ h \\in ${REALS}\\}$`,
        `$\\{h \\mid h \\le ${fmt(q)},\\ h \\in ${REALS}\\}$`,
        `$\\{h \\mid 0 \\le h \\le ${p},\\ h \\in ${REALS}\\}$`,
      ];
      return {
        prompt: `${ctx}. Its height, $h$, in metres, is modelled by $${eq}$, where $d$ is the horizontal distance travelled, in metres.\n\nWhat is the maximum height, and at what horizontal distance does it occur? What is the range of the function from the moment of release until the object lands on the ground?`,
        parts: [
          numPart(q, { label: 'Maximum height:', suffix: 'm' }),
          numPart(p, { label: 'Horizontal distance at the maximum:', suffix: 'm' }),
          { label: 'Range:', answer: mc(rng, correct, wrong) },
        ],
        hints: ['The function is in vertex form, so the vertex $(p, q)$ gives the maximum point.', 'Height cannot go below the ground: the range runs from $0$ (landing) up to the maximum height.'],
        solution: [
          `Compare with $h = a(d - p)^2 + q$: $a = ${fmt(a)}$, $p = ${p}$, $q = ${fmt(q)}$. Since $a < 0$, the vertex is a maximum.`,
          `The maximum height is $${fmt(q)}$ m, reached when the horizontal distance is $${p}$ m.`,
          `The object starts at $${fmt(h0)}$ m, rises to $${fmt(q)}$ m, then falls to $0$ m when it lands. Every height from $0$ to $${fmt(q)}$ m occurs.`,
          `Range: $\\{h \\mid 0 \\le h \\le ${fmt(q)},\\ h \\in ${REALS}\\}$.`,
        ],
      };
    }
    // The equation is written in a less familiar arrangement.
    const a = rng.pick([-4, -3, -2, -0.5, 0.5, 2, 3, 4]);
    const p = rng.nonZero(-6, 6);
    const q = rng.intExcept(-9, 9, [0, p, -p]);
    const style = rng.int(0, 2);
    const aTerm = `${coefTex(Math.abs(a))}${sqTex(p)}`;
    const eq =
      style === 0
        ? `y = ${q} ${a > 0 ? '+' : '-'} ${aTerm}`
        : style === 1
          ? `y ${q > 0 ? '-' : '+'} ${Math.abs(q)} = ${coefTex(a)}${sqTex(p)}`
          : `y = ${coefTex(a)}(${p} - x)^2 ${q > 0 ? '+' : '-'} ${Math.abs(q)}`;
    const rewrite =
      style === 0
        ? `Reorder the terms: $y = ${vertexTex(a, p, q)}$.`
        : style === 1
          ? `Isolate $y$: ${q > 0 ? `add $${q}$ to both sides` : `subtract $${-q}$ from both sides`}, so $y = ${vertexTex(a, p, q)}$.`
          : `Since $(${p} - x)^2 = (x - ${par(p)})^2$ (a number and its opposite have the same square), the equation is $y = ${vertexTex(a, p, q)}$.`;
    return {
      prompt: `For $${eq}$, state the vertex and the domain and range.`,
      parts: [vertexPart(p, q), { label: 'Domain and range:', answer: domainRangeMc(rng, a, p, q) }],
      hints: ['Rearrange the equation into the form $y = a(x - p)^2 + q$ first.', 'Every quadratic function has domain $\\{x \\mid x \\in \\mathbb{R}\\}$. The range starts at the $y$-coordinate of the vertex.'],
      solution: [
        rewrite,
        `So $a = ${texNum(a)}$, $p = ${p}$ and $q = ${q}$: the vertex is $${ptTex(p, q)}$.`,
        `Any real number can be substituted for $x$, so the domain is $${allReals('x')}$.`,
        rangeReason(a, q),
      ],
    };
  },
});

/** Transformations of y = x^2 that give y = a(x - p)^2 + q, in order. */
function transformList(a: number, p: number, q: number): string[] {
  const out: string[] = [];
  const units = (n: number) => `$${texNum(Math.abs(n))}$ ${Math.abs(n) === 1 ? 'unit' : 'units'}`;
  if (a < 0) out.push('a reflection in the $x$-axis');
  if (Math.abs(a) !== 1) out.push(`a vertical stretch by a factor of $${texNum(Math.abs(a))}$`);
  if (p !== 0) out.push(`a translation of ${units(p)} ${p > 0 ? 'right' : 'left'}`);
  if (q !== 0) out.push(`a translation of ${units(q)} ${q > 0 ? 'up' : 'down'}`);
  return out;
}

function listText(ws: string[]): string {
  const s = ws.length <= 1 ? ws.join('') : `${ws.slice(0, -1).join(', ')} and ${ws[ws.length - 1]}`;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function transformSteps(a: number, p: number, q: number): string[] {
  const steps: string[] = [`Compare with $y = a(x - p)^2 + q$: $a = ${texNum(a)}$, $p = ${p}$${signNote(p)} and $q = ${q}$.`];
  if (a < 0) steps.push('$a < 0$: the graph is reflected in the $x$-axis (it opens down).');
  if (Math.abs(a) > 1) steps.push(`$|a| = ${texNum(Math.abs(a))} > 1$: a vertical stretch by a factor of $${texNum(Math.abs(a))}$ (the graph is narrower).`);
  if (Math.abs(a) < 1) steps.push(`$|a| = ${texNum(Math.abs(a))} < 1$: a vertical stretch by a factor of $${texNum(Math.abs(a))}$ (the graph is wider).`);
  const u = (n: number) => `$${texNum(Math.abs(n))}$ ${Math.abs(n) === 1 ? 'unit' : 'units'}`;
  steps.push(`$p = ${p}$: a horizontal translation of ${u(p)} ${p > 0 ? 'right' : 'left'}; $q = ${q}$: a vertical translation of ${u(q)} ${q > 0 ? 'up' : 'down'}.`);
  return steps;
}

const vertexTransform = skill({
  id: 'm201-vertex-transform',
  name: 'Transforming y = x²',
  description: 'Describe how a, p and q transform the graph of y = x², and find a, p and q from a description of the transformations.',
  outcomes: ['RF3'],
  lessonId: 'm201-3-1',
  format: 'mc',
  gen(rng, d) {
    if (d === 1) {
      const p = rng.nonZero(-7, 7);
      const q = rng.intExcept(-8, 8, [0, p, -p]);
      if (rng.chance(0.6)) {
        const choice = (pp: number, qq: number) => listText(transformList(1, pp, qq));
        return {
          prompt: `Which transformations of the graph of $y = x^2$ give the graph of $y = ${vertexTex(1, p, q)}$?`,
          parts: [{ answer: mc(rng, choice(p, q), rng.shuffle([choice(-p, q), choice(p, -q), choice(-p, -q), choice(q, p)])) }],
          hints: ['$p$ moves the graph left or right and $q$ moves it up or down.', '$(x - p)^2$ moves the graph $p$ units to the right, so $(x + 3)^2$ moves it $3$ units to the left.'],
          solution: [...transformSteps(1, p, q), `The graph is translated $${Math.abs(p)}$ ${Math.abs(p) === 1 ? 'unit' : 'units'} ${p > 0 ? 'right' : 'left'} and $${Math.abs(q)}$ ${Math.abs(q) === 1 ? 'unit' : 'units'} ${q > 0 ? 'up' : 'down'}.`],
        };
      }
      return {
        prompt: `The graph of $y = x^2$ is translated $${Math.abs(p)}$ ${Math.abs(p) === 1 ? 'unit' : 'units'} ${p > 0 ? 'right' : 'left'} and $${Math.abs(q)}$ ${Math.abs(q) === 1 ? 'unit' : 'units'} ${q > 0 ? 'up' : 'down'}. Its new equation is $y = (x - p)^2 + q$. What are $p$ and $q$?`,
        parts: [numPart(p, { label: '$p =$' }), numPart(q, { label: '$q =$' })],
        hints: ['A translation right makes $p$ positive; a translation left makes $p$ negative.', 'A translation up makes $q$ positive; down makes $q$ negative.'],
        solution: [
          `A horizontal translation of $${Math.abs(p)}$ ${p > 0 ? 'right' : 'left'} gives $p = ${p}$.`,
          `A vertical translation of $${Math.abs(q)}$ ${q > 0 ? 'up' : 'down'} gives $q = ${q}$.`,
          `The equation is $y = ${vertexTex(1, p, q)}$, so $p = ${p}$ and $q = ${q}$.`,
        ],
      };
    }

    const a = rng.pick([-4, -3, -2, -0.5, 0.5, 2, 3, 4, -1, 1 / 3, -1 / 3, 0.25]);
    const p = rng.nonZero(-6, 6);
    const q = rng.intExcept(-8, 8, [0, p, -p]);
    if (d === 2) {
      const choice = (aa: number, pp: number, qq: number) => listText(transformList(aa, pp, qq));
      const wrong = [choice(-a, p, q), choice(a, -p, q), choice(a, p, -q)];
      if (Math.abs(a) !== 1) wrong.push(choice(Math.sign(a) / Math.abs(a), p, q));
      return {
        prompt: `Which list describes the transformations of the graph of $y = x^2$ that give the graph of $y = ${vertexTex(a, p, q)}$?`,
        parts: [{ answer: mc(rng, choice(a, p, q), rng.shuffle(wrong)) }],
        hints: ['A negative $a$ reflects the graph in the $x$-axis, and $|a|$ is the vertical stretch factor.', '$p$ gives the horizontal translation (watch the sign) and $q$ the vertical translation.'],
        solution: [...transformSteps(a, p, q), `So the transformations are: ${choice(a, p, q).charAt(0).toLowerCase()}${choice(a, p, q).slice(1)}.`],
      };
    }

    // d === 3
    if (rng.chance(0.5)) {
      return {
        prompt: `The graph of $y = x^2$ is transformed by ${transformList(a, p, q).join(', then ')}. The new equation is $y = a(x - p)^2 + q$. Find $a$, $p$ and $q$ (use a fraction for $a$ if needed).`,
        parts: [numPart(a, { label: '$a =$' }), numPart(p, { label: '$p =$' }), numPart(q, { label: '$q =$' })],
        hints: ['A reflection in the $x$-axis makes $a$ negative; the stretch factor is $|a|$.', 'Right is positive $p$, left is negative $p$; up is positive $q$, down is negative $q$.'],
        solution: [
          `${a < 0 ? 'The reflection makes $a$ negative' : 'There is no reflection, so $a$ is positive'}${Math.abs(a) !== 1 ? ` and the stretch factor is $${texNum(Math.abs(a))}$` : ''}: $a = ${texNum(a)}$.`,
          `The horizontal translation gives $p = ${p}$ and the vertical translation gives $q = ${q}$.`,
          `The equation is $y = ${vertexTex(a, p, q)}$: $a = ${texNum(a)}$, $p = ${p}$, $q = ${q}$.`,
        ],
      };
    }
    // Image of a point on y = x^2.
    const a2 = rng.pick([-3, -2, -1, -0.5, 0.5, 2, 3]);
    const x0 = rng.pick([-3, -2, -1, 1, 2, 3]);
    const y0 = x0 * x0;
    const X = x0 + p;
    const Y = a2 * y0 + q;
    return {
      prompt: `The point $(${x0}, ${y0})$ is on the graph of $y = x^2$. What is the image of this point on the graph of $y = ${vertexTex(a2, p, q)}$?`,
      parts: [part({ kind: 'point', x: X, y: Y }, { label: 'Image point:', placeholder: '(x, y)' })],
      hints: ['The horizontal translation changes only the $x$-coordinate: add $p$.', 'For the $y$-coordinate, multiply by $a$ first (stretch and reflection), then add $q$.'],
      solution: [
        `Here $a = ${texNum(a2)}$, $p = ${p}$ and $q = ${q}$, so $(x, y) \\to (x + p,\\ ay + q)$.`,
        `$x$: $${x0} + ${par(p)} = ${X}$.`,
        `$y$: $${texNum(a2)}(${y0}) + ${par(q)} = ${texNum(Y)}$.`,
        `Check in the equation: $${texNum(a2)}(${X} - ${par(p)})^2 + ${par(q)} = ${texNum(a2)}(${x0 * x0}) + ${par(q)} = ${texNum(Y)}$ ✓`,
        `The image point is $${ptTex(X, Y)}$.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// 3.2 — Writing vertex form; intercepts
// ---------------------------------------------------------------------------

const ARCHES = [
  { what: 'A footbridge in a city park is supported by a parabolic arch', spans: [30, 40, 50, 60], heights: [6, 8, 10, 12, 15] },
  { what: 'The entrance to an outdoor skating shelter is a parabolic arch', spans: [6, 8, 10, 12], heights: [3, 4, 5, 6] },
  { what: 'A greenhouse is built over parabolic hoops', spans: [6, 8, 10], heights: [2, 3, 4] },
  { what: 'A concrete overpass has a parabolic arch', spans: [20, 24, 30, 36], heights: [5, 6, 8, 9] },
];

function aSolveSteps(p: number, q: number, x1: number, y1: number, a: number): string[] {
  const dx = x1 - p;
  const qT = q === 0 ? '' : ` ${q < 0 ? '-' : '+'} ${Math.abs(q)}`;
  const k = dx * dx === 1 ? '' : `${dx * dx}`;
  return [
    `The vertex is $(p, q) = ${ptTex(p, q)}$, so $y = a${sqTex(p)}${qT}$.`,
    `Substitute the point $${ptTex(x1, y1)}$: $${y1} = a(${x1} - ${par(p)})^2${qT}$, so $${y1} = ${k}a${qT}$.`,
    k ? `Solve: $${k}a = ${y1 - q}$, so $a = ${texNum(a)}$.` : `Solve: $a = ${y1} - ${par(q)} = ${texNum(a)}$.`,
    `The equation is $y = ${vertexTex(a, p, q)}$: $a = ${texNum(a)}$, $p = ${p}$, $q = ${q}$.`,
  ];
}

const apqParts = (a: number, p: number, q: number): Part[] => [numPart(a, { label: '$a =$' }), numPart(p, { label: '$p =$' }), numPart(q, { label: '$q =$' })];

const vertexEquation = skill({
  id: 'm201-vertex-equation',
  name: 'Writing the equation in vertex form',
  description: 'Write the equation of a parabola in vertex form from its vertex and another point, from its graph, or from a description.',
  outcomes: ['RF3'],
  lessonId: 'm201-3-2',
  gen(rng, d) {
    const hints = ['Substitute the vertex for $p$ and $q$ in $y = a(x - p)^2 + q$.', 'Then substitute the other point for $x$ and $y$ and solve for $a$.'];
    if (d === 1) {
      const a = rng.pick(A_INT);
      const p = rng.int(-5, 5);
      const q = rng.int(-8, 8);
      const dx = rng.pick([-2, -1, 1, 2]);
      const x1 = p + dx;
      const y1 = q + a * dx * dx;
      return {
        prompt: `A parabola has vertex $${ptTex(p, q)}$ and passes through the point $${ptTex(x1, y1)}$. Write its equation in the form $y = a(x - p)^2 + q$ by giving $a$, $p$ and $q$.`,
        parts: apqParts(a, p, q),
        hints,
        solution: aSolveSteps(p, q, x1, y1, a),
      };
    }
    if (d === 2) {
      for (;;) {
        const a = rng.pick([-2, -1, -0.5, 0.5, 1, 2]);
        const p = rng.int(-5, 5);
        const q = a > 0 ? rng.int(-8, 1) : rng.int(-1, 8);
        const dx = Math.abs(a) === 0.5 ? rng.pick([-4, -2, 2, 4]) : rng.pick([-2, -1, 1, 2]);
        const x1 = p + dx;
        const y1 = q + a * dx * dx;
        if (Math.abs(y1) > 9 || Math.abs(x1) > 9) continue;
        const fig = curvePlane(GRID10, [{ f: (x) => a * (x - p) ** 2 + q, vertexX: p }], { points: [{ x: p, y: q }, { x: x1, y: y1 }] });
        return {
          prompt: 'The vertex and one other point of the parabola are marked on the graph. Write the equation of the parabola in the form $y = a(x - p)^2 + q$ by giving $a$, $p$ and $q$.',
          figure: fig,
          parts: apqParts(a, p, q),
          hints: ['Read the vertex $(p, q)$ and the other marked point from the grid.', 'Substitute the other point into $y = a(x - p)^2 + q$ and solve for $a$.'],
          solution: [`From the graph, the vertex is $${ptTex(p, q)}$ and the parabola passes through $${ptTex(x1, y1)}$.`, ...aSolveSteps(p, q, x1, y1, a)],
        };
      }
    }
    // d === 3
    if (rng.chance(0.5)) {
      const [num, den] = rng.pick([[1, 2], [3, 2], [1, 3], [2, 3], [1, 4], [3, 4]] as const);
      const a = (rng.sign() * num) / den;
      const dx = rng.sign() * (den === 3 ? 3 : rng.pick([2, 4]));
      const p = rng.int(-6, 6);
      const q = rng.int(-10, 10);
      const x1 = p + dx;
      const y1 = q + a * dx * dx;
      return {
        prompt: `A parabola has its axis of symmetry at $x = ${p}$ and a ${a < 0 ? 'maximum' : 'minimum'} value of $${q}$. It passes through the point $${ptTex(x1, y1)}$. Write its equation in the form $y = a(x - p)^2 + q$ by giving $a$, $p$ and $q$ (use a fraction for $a$ if needed).`,
        parts: apqParts(a, p, q),
        hints: ['The vertex lies on the axis of symmetry, and its $y$-coordinate is the maximum or minimum value.', 'So the vertex is $(p, q)$. Substitute the given point to find $a$.'],
        solution: [`The vertex is on the axis of symmetry and its $y$-coordinate is the ${a < 0 ? 'maximum' : 'minimum'} value, so the vertex is $${ptTex(p, q)}$.`, ...aSolveSteps(p, q, x1, y1, a)],
      };
    }
    const arch = rng.pick(ARCHES);
    const s = rng.pick(arch.spans);
    const h = rng.pick(arch.heights);
    const p = s / 2;
    const a = -h / (p * p);
    const aFrac = toFrac(a, 10000);
    const aTex = aFrac ? fracLatex(aFrac) : fmt(a, 6);
    return {
      prompt: `${arch.what}. The arch is $${s}$ m wide at ground level and $${h}$ m high at its centre. Place the origin at the left end of the arch, at ground level, with the $x$-axis along the ground. Write the equation of the arch in the form $y = a(x - p)^2 + q$ by giving $a$, $p$ and $q$ (a fraction is fine for $a$).`,
      parts: apqParts(a, p, h),
      hints: ['The highest point is halfway across the arch. That point is the vertex.', `The arch also passes through the origin, $(0, 0)$. Substitute it to find $a$.`],
      solution: [
        `The vertex is at the centre, halfway across: $(${s} \\div 2,\\ ${h}) = (${p}, ${h})$, so $y = a(x - ${p})^2 + ${h}$.`,
        `The left end of the arch is the origin. Substitute $(0, 0)$: $0 = a(0 - ${p})^2 + ${h}$, so $0 = ${p * p}a + ${h}$.`,
        `Solve: $a = -\\dfrac{${h}}{${p * p}}${aFrac && aFrac.d !== p * p ? ` = ${aTex}` : ''}$.`,
        `The equation is $y = ${aTex}(x - ${p})^2 + ${h}$: $a = ${aTex}$, $p = ${p}$, $q = ${h}$.`,
      ],
    };
  },
});

function interceptCountReason(a: number, q: number): string {
  const opens = a > 0 ? 'opens up' : 'opens down';
  if (q === 0) return `The vertex is on the $x$-axis ($q = 0$), so the parabola touches the $x$-axis once.`;
  const above = q > 0;
  if ((a > 0 && above) || (a < 0 && !above)) return `The vertex is ${above ? 'above' : 'below'} the $x$-axis and the parabola ${opens}, away from the axis, so it never crosses the $x$-axis.`;
  return `The vertex is ${above ? 'above' : 'below'} the $x$-axis and the parabola ${opens}, toward the axis, so it crosses the $x$-axis twice.`;
}

/** "Set x = 0: y = a(0 - p)^2 + q = ... = y-intercept." */
function yIntStep(a: number, p: number, q: number): string {
  const qT = q === 0 ? '' : ` ${q < 0 ? '-' : '+'} ${texNum(Math.abs(q))}`;
  const yi = a * p * p + q;
  const sub = p === 0 ? `${coefTex(a)}(0)^2${qT}` : `${coefTex(a)}(0 ${p > 0 ? '-' : '+'} ${Math.abs(p)})^2${qT}`;
  return `Set $x = 0$: $y = ${sub} = ${coefTex(a)}(${p * p})${qT} = ${texNum(yi)}$.`;
}

function rootsTex(p: number, k: number): string {
  const { outside, inside } = radicalSplit(k);
  const rad = inside === 1 ? `${outside}` : `${outside === 1 ? '' : outside}\\sqrt{${inside}}`;
  return p === 0 ? `\\pm ${rad}` : `${p} \\pm ${rad}`;
}

const vertexIntercepts = skill({
  id: 'm201-vertex-intercepts',
  name: 'Intercepts of a parabola in vertex form',
  description: 'Find the number of x-intercepts from a and q, and find the x- and y-intercepts of y = a(x − p)² + q.',
  outcomes: ['RF3'],
  lessonId: 'm201-3-2',
  gen(rng, d) {
    if (d === 1) {
      const a = rng.pick([-3, -2, -1, -0.5, 0.5, 1, 2, 3]);
      const p = rng.nonZero(-6, 6);
      if (rng.chance(0.65)) {
        const kind = rng.int(0, 2);
        const q = kind === 1 ? 0 : (kind === 0 ? Math.sign(a) : -Math.sign(a)) * rng.int(1, 9);
        const count = kind === 0 ? 0 : kind === 1 ? 1 : 2;
        return {
          prompt: `How many $x$-intercepts does the graph of $y = ${vertexTex(a, p, q)}$ have?`,
          parts: [{ answer: fixedChoice(['None', 'One', 'Two'], count) }],
          hints: ['Find the vertex and the direction of opening, then picture the graph.', 'If the parabola opens toward the $x$-axis from its vertex, it crosses twice; if it opens away, it never crosses.'],
          solution: [`The vertex is $${ptTex(p, q)}$ and $a = ${texNum(a)}$, so the parabola ${a > 0 ? 'opens up' : 'opens down'}.`, interceptCountReason(a, q), `Number of $x$-intercepts: ${['none', 'one', 'two'][count]}.`],
        };
      }
      const q = rng.int(-9, 9);
      const yi = a * p * p + q;
      return {
        prompt: `What is the $y$-intercept of the graph of $y = ${vertexTex(a, p, q)}$?`,
        parts: [numPart(yi, { label: '$y$-intercept:' })],
        hints: ['The $y$-intercept is where $x = 0$.', 'Substitute $x = 0$ and evaluate. Square before multiplying by $a$.'],
        solution: [yIntStep(a, p, q), `The $y$-intercept is $${texNum(yi)}$.`],
      };
    }
    if (d === 2) {
      const a = rng.pick([-3, -2, -1, -0.5, 0.5, 1, 2, 3]);
      const p = rng.int(-5, 5);
      const r = Math.abs(a) === 0.5 ? rng.pick([2, 4]) : rng.int(1, 5);
      const q = -a * r * r;
      const yi = a * p * p + q;
      return {
        prompt: `Determine the $x$-intercepts and the $y$-intercept of the graph of $y = ${vertexTex(a, p, q)}$.`,
        parts: [part({ kind: 'numbers', values: [p - r, p + r] }, { label: '$x$-intercepts:', placeholder: 'e.g. -1, 5' }), numPart(yi, { label: '$y$-intercept:' })],
        hints: ['For the $x$-intercepts, set $y = 0$, isolate the squared bracket, then take the square root of both sides (remember $\\pm$).', 'For the $y$-intercept, substitute $x = 0$.'],
        solution: [
          `Set $y = 0$: $0 = ${vertexTex(a, p, q)}$.`,
          `Isolate the square: $${sqTex(p)} = ${r * r}$.`,
          `Take square roots: $x ${p === 0 ? '' : `${p > 0 ? '-' : '+'} ${Math.abs(p)} `}= \\pm ${r}$, so $x = ${p - r}$ or $x = ${p + r}$.`,
          yIntStep(a, p, q),
          `The $x$-intercepts are $${p - r}$ and $${p + r}$; the $y$-intercept is $${texNum(yi)}$.`,
        ],
      };
    }
    // d === 3: irrational, none, or fractional a.
    const mode = rng.pick(['irrational', 'irrational', 'none', 'fraction'] as const);
    const promptTail = 'Give the $x$-intercepts to the nearest hundredth (type none if there are none), and give the exact $y$-intercept.';
    if (mode === 'none') {
      const a = rng.pick([-3, -2, -1, -0.5, 0.5, 1, 2, 3]);
      const p = rng.nonZero(-5, 5);
      const q = Math.sign(a) * rng.int(1, 9);
      const yi = a * p * p + q;
      return {
        prompt: `Determine the $x$-intercepts and the $y$-intercept of $y = ${vertexTex(a, p, q)}$. ${promptTail}`,
        parts: [part({ kind: 'numbers', values: [], decimals: 2 }, { label: '$x$-intercepts:', placeholder: 'e.g. 1.27, -3.27' }), numPart(yi, { label: '$y$-intercept:' })],
        hints: ['Set $y = 0$ and isolate the squared bracket.', 'A square can never be negative. What does that tell you?'],
        solution: [
          `Set $y = 0$ and isolate the square: $${sqTex(p)} = ${texNum(-q / a)}$.`,
          'A square cannot be negative, so there are no real solutions: the graph has no $x$-intercepts.',
          interceptCountReason(a, q),
          yIntStep(a, p, q),
          `No $x$-intercepts; the $y$-intercept is $${texNum(yi)}$.`,
        ],
      };
    }
    if (mode === 'fraction') {
      const [num, den] = rng.pick([[1, 3], [2, 3], [1, 4], [3, 4], [3, 2]] as const);
      const a = (rng.sign() * num) / den;
      const p = rng.int(-4, 4);
      const r = den === 3 ? rng.pick([3, 6]) : rng.pick([2, 4]);
      const q = -a * r * r;
      const yi = a * p * p + q;
      return {
        prompt: `Determine the $x$-intercepts and the $y$-intercept of $y = ${vertexTex(a, p, q)}$. ${promptTail}`,
        parts: [part({ kind: 'numbers', values: [p - r, p + r], decimals: 2 }, { label: '$x$-intercepts:', placeholder: 'e.g. 1.27, -3.27' }), numPart(yi, { label: '$y$-intercept:' })],
        hints: ['Set $y = 0$, move $q$ to the other side, then divide by $a$ (multiply by its reciprocal).', 'Take the square root of both sides, remembering $\\pm$.'],
        solution: [
          `Set $y = 0$ and move $q$ to the other side: $${coefTex(a)}${sqTex(p)} = ${texNum(-q)}$.`,
          `Multiply both sides by $${texNum(1 / a)}$: $${sqTex(p)} = ${r * r}$.`,
          `Take square roots: $x = ${p} \\pm ${r}$, so $x = ${p - r}$ or $x = ${p + r}$.`,
          yIntStep(a, p, q),
          `The $x$-intercepts are $${p - r}$ and $${p + r}$; the $y$-intercept is $${texNum(yi)}$.`,
        ],
      };
    }
    for (;;) {
      const a = rng.pick([-3, -2, -1, -0.5, 0.5, 1, 2, 3]);
      const p = rng.int(-5, 5);
      const k = rng.pick([2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 15, 18, 20]);
      const q = -a * k;
      const x1 = p - Math.sqrt(k);
      const x2 = p + Math.sqrt(k);
      if (!safeRound(x1, 2) || !safeRound(x2, 2)) continue;
      const yi = a * p * p + q;
      return {
        prompt: `Determine the $x$-intercepts and the $y$-intercept of $y = ${vertexTex(a, p, q)}$. ${promptTail}`,
        parts: [part({ kind: 'numbers', values: [x1, x2], decimals: 2 }, { label: '$x$-intercepts:', placeholder: 'e.g. 1.27, -3.27' }), numPart(yi, { label: '$y$-intercept:' })],
        hints: ['Set $y = 0$, isolate the squared bracket, then take the square root of both sides (remember $\\pm$).', 'Write the exact answers with a radical first, then round.'],
        solution: [
          `Set $y = 0$ and isolate the square: $${coefTex(a)}${sqTex(p)} = ${texNum(-q)}$, so $${sqTex(p)} = ${k}$.`,
          `Take square roots: $x ${p === 0 ? '' : `${p > 0 ? '-' : '+'} ${Math.abs(p)} `}= \\pm\\sqrt{${k}}$${p === 0 && radicalSplit(k).outside === 1 ? '' : `, so $x = ${rootsTex(p, k)}$`}.`,
          `$x \\approx ${fmtFixed(x1, 2)}$ or $x \\approx ${fmtFixed(x2, 2)}$.`,
          yIntStep(a, p, q),
          `The $x$-intercepts are about $${fmtFixed(x1, 2)}$ and $${fmtFixed(x2, 2)}$; the $y$-intercept is $${texNum(yi)}$.`,
        ],
      };
    }
  },
});

// ---------------------------------------------------------------------------
// 3.3 — Standard form and completing the square
// ---------------------------------------------------------------------------

function vertexFromStdSteps(a: number, b: number, c: number): string[] {
  const h = -b / (2 * a);
  const k = a * h * h + b * h + c;
  const cTerm = c === 0 ? '' : ` ${c < 0 ? '-' : '+'} ${texNum(Math.abs(c))}`;
  return [
    `Here $a = ${texNum(a)}$, $b = ${texNum(b)}$ and $c = ${texNum(c)}$. The axis of symmetry is $x = -\\dfrac{b}{2a} = -\\dfrac{${texNum(b)}}{2(${texNum(a)})} = ${texNum(h)}$.`,
    `Substitute $x = ${texNum(h)}$: $y = ${coefTex(a)}${br(h)}^2 ${b < 0 ? '-' : '+'} ${texNum(Math.abs(b))}${br(h)}${cTerm} = ${texNum(k)}$.`,
  ];
}

const standardFeatures = skill({
  id: 'm201-standard-features',
  name: 'Features of standard form',
  description: 'Find the vertex, axis of symmetry, intercepts, maximum or minimum, domain and range of y = ax² + bx + c.',
  outcomes: ['RF4'],
  lessonId: 'm201-3-3',
  gen(rng, d) {
    const hints = ['The axis of symmetry is $x = -\\dfrac{b}{2a}$.', 'Substitute that $x$-value into the function to find the $y$-coordinate of the vertex.'];
    if (d === 1) {
      const a = rng.pick([1, -1]);
      const h = rng.nonZero(-5, 5);
      const b = -2 * a * h;
      const c = rng.int(-9, 9);
      const k = a * h * h + b * h + c;
      return {
        prompt: `For $y = ${stdTex(a, b, c)}$, find the equation of the axis of symmetry and the coordinates of the vertex.`,
        parts: [numPart(h, { label: 'Axis of symmetry: $x =$' }), vertexPart(h, k)],
        hints,
        solution: [...vertexFromStdSteps(a, b, c), `The axis of symmetry is $x = ${h}$ and the vertex is $${ptTex(h, k)}$.`],
      };
    }
    if (d === 2) {
      const a = rng.pick([-3, -2, 2, 3]);
      const h = rng.nonZero(-4, 4);
      const b = -2 * a * h;
      const c = rng.intExcept(-10, 10, [0]);
      const k = a * h * h + b * h + c;
      return {
        prompt: `For $y = ${stdTex(a, b, c)}$, find the vertex, the $y$-intercept and the range.`,
        parts: [vertexPart(h, k), numPart(c, { label: '$y$-intercept:' }), { label: 'Range:', answer: rangeMc(rng, a, h, k) }],
        hints: [...hints.slice(0, 1), 'The $y$-intercept is the value of $y$ when $x = 0$, which is $c$. The range starts at the $y$-coordinate of the vertex.'],
        solution: [
          ...vertexFromStdSteps(a, b, c),
          `The vertex is $${ptTex(h, k)}$.`,
          `When $x = 0$, $y = ${c}$, so the $y$-intercept is $${c}$.`,
          rangeReason(a, k),
        ],
      };
    }
    // d === 3
    if (rng.chance(0.5)) {
      const a = rng.pick([-3, -2, -1, 1, 2, 3]);
      const h = rng.pick([-7, -5, -3, -1, 1, 3, 5, 7]) / 2;
      const b = -2 * a * h;
      const c = rng.int(-6, 6);
      const k = a * h * h + b * h + c;
      const count = k === 0 ? 1 : Math.sign(k) === Math.sign(a) ? 0 : 2;
      return {
        prompt: `For $y = ${stdTex(a, b, c)}$, find the exact vertex (fractions are fine), the domain and range, and the number of $x$-intercepts.`,
        parts: [
          vertexPart(h, k),
          { label: 'Domain and range:', answer: domainRangeMc(rng, a, h, k) },
          { label: 'Number of $x$-intercepts:', answer: fixedChoice(['None', 'One', 'Two'], count) },
        ],
        hints: ['Use $x = -\\dfrac{b}{2a}$; the answer will be a fraction.', 'Use the vertex and the direction of opening for the range and the number of $x$-intercepts.'],
        solution: [
          ...vertexFromStdSteps(a, b, c),
          `The vertex is $${ptTex(h, k)}$. The domain is $${allReals('x')}$.`,
          rangeReason(a, k),
          `${interceptCountReason(a, k)} Number of $x$-intercepts: ${['none', 'one', 'two'][count]}.`,
        ],
      };
    }
    // Rearrange: find b and c from the vertex.
    const a = rng.pick([-3, -2, -1, 1, 2, 3]);
    const h = rng.nonZero(-5, 5);
    const k = rng.int(-9, 9);
    const b = -2 * a * h;
    const c = k + a * h * h;
    return {
      prompt: `The parabola $y = ${coefTex(a)}x^2 + bx + c$ has its vertex at $${ptTex(h, k)}$. Find $b$ and $c$.`,
      parts: [numPart(b, { label: '$b =$' }), numPart(c, { label: '$c =$' })],
      hints: ['The axis of symmetry is $x = -\\dfrac{b}{2a}$. Substitute the $x$-coordinate of the vertex and solve for $b$.', 'Then substitute the vertex into the equation to find $c$.'],
      solution: [
        `The axis of symmetry is $x = ${h}$, so $${h} = -\\dfrac{b}{2(${a})}$, which gives $b = -2(${a})(${h}) = ${b}$.`,
        `Substitute the vertex $${ptTex(h, k)}$: $${k} = ${coefTex(a)}(${h})^2 + (${b})(${h}) + c$, so $${k} = ${a * h * h + b * h} + c$.`,
        `Solve: $c = ${k} - ${par(a * h * h + b * h)} = ${c}$.`,
        `Check: $y = ${stdTex(a, b, c)}$ has $x = -\\dfrac{${b}}{2(${a})} = ${h}$ ✓. So $b = ${b}$ and $c = ${c}$.`,
      ],
    };
  },
});

const completeSquare = skill({
  id: 'm201-complete-square',
  name: 'Completing the square',
  description: 'Rewrite y = ax² + bx + c in vertex form by completing the square.',
  outcomes: ['RF4'],
  lessonId: 'm201-3-3',
  gen(rng, d) {
    let a: number;
    let b: number;
    const c = rng.int(-9, 9);
    if (d === 1) {
      a = 1;
      b = 2 * rng.nonZero(-6, 6);
    } else if (d === 2) {
      if (rng.chance(0.6)) {
        a = rng.pick([2, 3, -1, -2, -3]);
        b = 2 * a * rng.nonZero(-4, 4);
      } else {
        a = 1;
        b = rng.pick([-9, -7, -5, -3, -1, 1, 3, 5, 7, 9]);
      }
    } else {
      a = rng.pick([2, -2, 3, -3, 4, -4, 0.5, -0.5]);
      // Keep p a half or a quarter so the arithmetic stays reasonable.
      if (Math.abs(a) === 0.5) b = rng.nonZero(-5, 5);
      else if (Math.abs(a) === 2) b = rng.pick([-9, -7, -5, -3, -1, 1, 3, 5, 7, 9]);
      else if (Math.abs(a) === 3) b = rng.pick([-9, -3, 3, 9]);
      else b = rng.pick([-10, -6, -2, 2, 6, 10]);
    }
    const h = -b / (2 * a);
    const k = c - (b * b) / (4 * a);
    const half = b / (2 * a); // the number in (x + half)^2
    const inner = b / a; // coefficient of x inside the brackets
    const steps: string[] = [];
    const sq = texNum(half * half);
    const cT = c === 0 ? '' : ` ${c < 0 ? '-' : '+'} ${Math.abs(c)}`;
    const xTerm = `${inner < 0 ? '-' : '+'} ${coefTex(Math.abs(inner))}x`;
    if (a === 1) {
      steps.push(`Take half the coefficient of $x$ and square it: $${br(half)}^2 = ${sq}$.`);
      steps.push(`Add and subtract it: $y = \\left(x^2 ${xTerm} + ${sq}\\right) - ${sq}${cT}$.`);
      steps.push(`The brackets hold a perfect square: $x^2 ${xTerm} + ${sq} = ${sqTex(h)}$, so $y = ${vertexTex(1, h, k)}$.`);
    } else {
      const moved = -a * half * half;
      steps.push(`Factor $${texNum(a)}$ from the first two terms: $y = ${coefTex(a)}\\left(x^2 ${xTerm}\\right)${cT}$.`);
      steps.push(`Half of $${texNum(inner)}$ is $${texNum(half)}$, and $${br(half)}^2 = ${sq}$. Add and subtract it inside the brackets: $y = ${coefTex(a)}\\left(x^2 ${xTerm} + ${sq} - ${sq}\\right)${cT}$.`);
      steps.push(`Move $-${sq}$ out of the brackets by multiplying it by $${texNum(a)}$: $y = ${coefTex(a)}\\left(x^2 ${xTerm} + ${sq}\\right) ${moved < 0 ? '-' : '+'} ${texNum(Math.abs(moved))}${cT}$.`);
      steps.push(`Factor the perfect square and combine the constants: $y = ${vertexTex(a, h, k)}$.`);
    }
    steps.push(`So $a = ${texNum(a)}$, $p = ${texNum(h)}$ and $q = ${texNum(k)}$.`);
    return {
      prompt: `Write $y = ${stdTex(a, b, c)}$ in vertex form, $y = a(x - p)^2 + q$, by completing the square. Give $a$, $p$ and $q$${d === 1 ? '' : ' (fractions are fine)'}.`,
      parts: apqParts(a, h, k),
      hints:
        a === 1
          ? ['Add and subtract the square of half the coefficient of $x$.', 'The first three terms then factor as a perfect square $(x - p)^2$.']
          : ['First factor $a$ out of the $x^2$ and $x$ terms.', 'Inside the brackets, add and subtract the square of half the coefficient of $x$. The subtracted term must be multiplied by $a$ when it leaves the brackets.'],
      solution: [...steps, `Check: the vertex $${ptTex(h, k)}$ agrees with $x = -\\dfrac{b}{2a} = ${texNum(h)}$.`],
    };
  },
});


// ---------------------------------------------------------------------------
// 3.4 — Maximum and minimum problems
// ---------------------------------------------------------------------------

const ROCKETS = ['A model rocket is launched from a platform', 'A ball is tossed straight up from a balcony', 'A signal flare is fired upward from a boat', 'A beach ball is bumped into the air'];

const REVENUE = [
  { what: (n: number, p: number) => `A community theatre sells about $${n}$ tickets per show at \\$${p} each`, unit: 'ticket', units: 'tickets', verb: 'sold', p0: [16, 30], s: 1, k: [5, 8, 10, 12], x: [2, 9] },
  { what: (n: number, p: number) => `A downtown food truck sells about $${n}$ bowls of pho a day at \\$${p} each`, unit: 'bowl', units: 'bowls', verb: 'sold', p0: [10, 15], s: 0.5, k: [4, 5, 6, 8], x: [2, 7] },
  { what: (n: number, p: number) => `A ski hill sells about $${n}$ day passes on a Saturday at \\$${p} each`, unit: 'pass', units: 'passes', verb: 'sold', p0: [30, 45], s: 2, k: [5, 10, 15], x: [2, 8] },
  { what: (n: number, p: number) => `A bike rental shop in a mountain town rents about $${n}$ bikes a day at \\$${p} per day`, unit: 'bike', units: 'bikes', verb: 'rented', p0: [30, 50], s: 1, k: [1, 2, 3], x: [2, 10] },
];

const PENS = [
  { what: 'a rectangular dog run', place: 'in a backyard' },
  { what: 'a rectangular garden plot', place: 'at a community garden' },
  { what: 'a rectangular corral', place: 'on a cattle ranch' },
  { what: 'a rectangular play area', place: 'beside a daycare' },
];

/** Fixed two decimals with thousands separators from 10 000 up (in maths, commas need braces). */
function cents(x: number, tex = false): string {
  const [i, f] = fmtFixed(x, 2).split('.');
  const g = i.length > 4 ? i.replace(/\B(?=(\d{3})+(?!\d))/g, tex ? '{,}' : ',') : i;
  return `${g}.${f}`;
}
const money = (x: number) => `\\$${cents(x)}`;

const quadOptimize = skill({
  id: 'm201-quad-optimize',
  name: 'Maximum and minimum problems',
  description: 'Model a situation with a quadratic function and find its maximum or minimum value and where it occurs.',
  outcomes: ['RF4'],
  lessonId: 'm201-3-4',
  calculator: true,
  gen(rng, d) {
    if (d === 1) {
      const kind = rng.int(0, 2);
      if (kind === 0) {
        const p = rng.pick([1, 1.5, 2, 2.5, 3]);
        const h0 = rng.int(0, 4);
        const q = h0 + 5 * p * p;
        return {
          prompt: `${rng.pick(ROCKETS)}. Its height, $h$, in metres, after $t$ seconds is $h(t) = ${vertexTex(-5, p, q, 't', true)}$. What is the maximum height, and when does it occur?`,
          parts: [numPart(q, { label: 'Maximum height:', suffix: 'm' }), numPart(p, { label: 'Time:', suffix: 's' })],
          hints: ['The function is in vertex form, $h(t) = a(t - p)^2 + q$.', 'Because $a < 0$, the vertex $(p, q)$ is the maximum point.'],
          solution: [`Compare with $h(t) = a(t - p)^2 + q$: $a = -5$, $p = ${fmt(p)}$, $q = ${q}$.`, 'Since $a < 0$ the parabola opens down, so the vertex is the highest point.', `The maximum height is $${q}$ m, at $t = ${fmt(p)}$ s.`],
        };
      }
      if (kind === 1) {
        const k = rng.pick([5, 10, 20, 25]);
        const p = rng.int(8, 30);
        const M = rng.int(20, 120) * 50;
        return {
          prompt: `A company’s weekly profit, $P$, in dollars, when it charges $x$ dollars for its product is $P(x) = ${vertexTex(-k, p, M, 'x')}$. What is the maximum weekly profit, and what price gives it?`,
          parts: [numPart(M, { label: 'Maximum profit: \\$' }), numPart(p, { label: 'Price: \\$' })],
          hints: ['The function is in vertex form, so read the vertex $(p, q)$.', 'Since $a < 0$, the vertex is a maximum.'],
          solution: [`Compare with $P(x) = a(x - p)^2 + q$: $a = ${-k}$, $p = ${p}$, $q = ${M}$.`, 'Since $a < 0$, the vertex is the highest point of the graph.', `The maximum weekly profit is \\$${M}, when the price is \\$${p}.`],
        };
      }
      const k = rng.pick([0.01, 0.02, 0.05]);
      const p = rng.pick([30, 35, 40, 45, 50]);
      const m = rng.int(12, 40);
      return {
        prompt: `The fuel cost, $C$, in dollars per hour, of running a fishing boat at a speed of $v$ km/h is $C(v) = ${vertexTex(k, p, m, 'v', true)}$. What is the minimum fuel cost per hour, and at what speed does it occur?`,
        parts: [numPart(m, { label: 'Minimum cost: \\$', suffix: 'per hour' }), numPart(p, { label: 'Speed:', suffix: 'km/h' })],
        hints: ['The function is in vertex form, so read the vertex $(p, q)$.', 'Since $a > 0$, the vertex is a minimum.'],
        solution: [`Compare with $C(v) = a(v - p)^2 + q$: $a = ${fmt(k)}$, $p = ${p}$, $q = ${m}$.`, 'Since $a > 0$, the parabola opens up and the vertex is the lowest point.', `The minimum fuel cost is \\$${m} per hour, at $${p}$ km/h.`],
      };
    }

    if (d === 2) {
      const kind = rng.int(0, 2);
      if (kind === 0) {
        const b = rng.pick([10, 15, 20, 25, 30, 35, 40]);
        const c = rng.pick([0, 1, 1.5, 2, 3, 10, 20]);
        const t = b / 10;
        const hmax = c + (b * b) / 20;
        return {
          prompt: `${rng.pick(ROCKETS)}. Its height, $h$, in metres, after $t$ seconds is $h(t) = ${stdTex(-5, b, c, 't', true)}$. What is the maximum height, and when does it occur?`,
          parts: [numPart(hmax, { label: 'Maximum height:', suffix: 'm' }), numPart(t, { label: 'Time:', suffix: 's' })],
          hints: ['The maximum occurs at the vertex. Its $t$-coordinate is $t = -\\dfrac{b}{2a}$.', 'Substitute that time into $h(t)$ to find the maximum height.'],
          solution: [
            `$a = -5$ and $b = ${b}$, so $t = -\\dfrac{${b}}{2(-5)} = ${fmt(t)}$.`,
            `$h(${fmt(t)}) = -5(${fmt(t)})^2 + ${b}(${fmt(t)})${c ? ` + ${fmt(c)}` : ''} = ${fmt(-5 * t * t)} + ${fmt(b * t)}${c ? ` + ${fmt(c)}` : ''} = ${fmt(hmax)}$.`,
            `The maximum height is $${fmt(hmax)}$ m, at $t = ${fmt(t)}$ s.`,
          ],
        };
      }
      if (kind === 1) {
        const r = REVENUE[rng.pick([0, 3])];
        const p0 = rng.int(r.p0[0], r.p0[1]);
        const k = rng.pick(r.k);
        const xs = rng.int(r.x[0], r.x[1]);
        const n0 = k * (2 * xs + p0);
        const best = (p0 + xs) * (n0 - k * xs);
        const B = n0 - k * p0;
        const C = p0 * n0;
        return {
          prompt: `${r.what(n0, p0)}. For every \\$1 increase in price, $${k}$ fewer ${r.units} are ${r.verb}. The revenue, $R$, in dollars, after $x$ price increases of \\$1 is $R(x) = ${stdTex(-k, B, C)}$. What is the maximum revenue, and what price gives it?`,
          parts: [numPart(best, { label: 'Maximum revenue: \\$' }), numPart(p0 + xs, { label: 'Price: \\$' })],
          hints: ['The maximum occurs at the vertex: $x = -\\dfrac{b}{2a}$ price increases.', `The price is \\$${p0} plus $x$ increases of \\$1. Substitute $x$ into $R(x)$ for the revenue.`],
          solution: [
            `$x = -\\dfrac{${B}}{2(${-k})} = ${xs}$ increases of \\$1.`,
            `The price is \\$${p0} + \\$${xs} = \\$${p0 + xs}.`,
            `$R(${xs}) = ${-k}(${xs})^2 + ${B}(${xs}) + ${C} = ${best}$. (Check: $${n0 - k * xs}$ ${r.units} at \\$${p0 + xs} each is \\$${best}.)`,
            `The maximum revenue is \\$${best}, at a price of \\$${p0 + xs}.`,
          ],
        };
      }
      if (rng.chance(0.5)) {
        const D = 2 * rng.int(2, 15);
        const lo = -D / 2;
        const hi = D / 2;
        return {
          prompt: `Two numbers differ by $${D}$. What is the smallest possible product of the two numbers, and what is the larger number when the product is smallest?`,
          parts: [numPart(-(D * D) / 4, { label: 'Minimum product:' }), numPart(hi, { label: 'Larger number:' })],
          hints: [`Let the smaller number be $x$. Then the larger is $x + ${D}$, and the product is $P = x(x + ${D})$.`, 'Expand and find the vertex with $x = -\\dfrac{b}{2a}$.'],
          solution: [
            `Let the numbers be $x$ and $x + ${D}$. The product is $P(x) = x(x + ${D}) = x^2 + ${D}x$.`,
            `The parabola opens up, so the vertex is a minimum: $x = -\\dfrac{${D}}{2(1)} = ${lo}$.`,
            `The numbers are $${lo}$ and $${hi}$, and the product is $(${lo})(${hi}) = ${-(D * D) / 4}$.`,
            `The minimum product is $${-(D * D) / 4}$, when the larger number is $${hi}$.`,
          ],
        };
      }
      const S = 2 * rng.int(6, 30);
      return {
        prompt: `Two numbers have a sum of $${S}$. What is the largest possible product of the two numbers, and what are the numbers then?`,
        parts: [numPart((S * S) / 4, { label: 'Maximum product:' }), numPart(S / 2, { label: 'Each number:' })],
        hints: [`Let one number be $x$. The other is $${S} - x$, and the product is $P = x(${S} - x)$.`, 'Expand and find the vertex with $x = -\\dfrac{b}{2a}$.'],
        solution: [
          `Let the numbers be $x$ and $${S} - x$. The product is $P(x) = x(${S} - x) = -x^2 + ${S}x$.`,
          `The parabola opens down, so the vertex is a maximum: $x = -\\dfrac{${S}}{2(-1)} = ${S / 2}$.`,
          `The other number is $${S} - ${S / 2} = ${S / 2}$, and the product is $${S / 2} \\times ${S / 2} = ${(S * S) / 4}$.`,
          `The maximum product is $${(S * S) / 4}$, when both numbers are $${S / 2}$.`,
        ],
      };
    }

    // d === 3: build the model yourself.
    const kind = rng.int(0, 2);
    if (kind === 0) {
      const pen = rng.pick(PENS);
      const P = 12 * rng.int(3, 20);
      const v = rng.int(0, 3);
      const setups = [
        { text: `uses $${P}$ m of fencing to enclose ${pen.what} ${pen.place}. All four sides are fenced. Let $w$ be the width of the rectangle.`, width: 'the width', eqn: `2l + 2w = ${P}`, l: `l = ${P / 2} - w`, A: `A = w(${P / 2} - w)`, roots: [0, P / 2], w: P / 4, area: (P * P) / 16 },
        { text: `uses $${P}$ m of fencing to enclose ${pen.what} ${pen.place}. One side of the rectangle is along a wall, so only three sides are fenced. Let $w$ be the length of each side perpendicular to the wall.`, width: '$w$', eqn: `2w + l = ${P}`, l: `l = ${P} - 2w`, A: `A = w(${P} - 2w)`, roots: [0, P / 2], w: P / 4, area: (P * P) / 8 },
        { text: `uses $${P}$ m of fencing to enclose ${pen.what} ${pen.place} and divide it into two equal parts with a fence parallel to the width $w$. All outside sides are fenced.`, width: '$w$', eqn: `3w + 2l = ${P}`, l: `l = \\dfrac{${P} - 3w}{2}`, A: `A = w\\left(\\dfrac{${P} - 3w}{2}\\right)`, roots: [0, P / 3], w: P / 6, area: (P * P) / 24 },
        { text: `uses $${P}$ m of fencing to enclose ${pen.what} ${pen.place} against a wall. A fence perpendicular to the wall divides it into two equal parts. Let $w$ be the length of each of the three sides perpendicular to the wall.`, width: '$w$', eqn: `3w + l = ${P}`, l: `l = ${P} - 3w`, A: `A = w(${P} - 3w)`, roots: [0, P / 3], w: P / 6, area: (P * P) / 12 },
      ];
      const s = setups[v];
      const name = rng.pick(NAMES);
      return {
        prompt: `${name} ${s.text} What is the maximum area that can be enclosed, and what value of $w$ gives it?`,
        parts: [numPart(s.area, { label: 'Maximum area:', suffix: 'm²' }), numPart(s.w, { label: '$w =$', suffix: 'm' })],
        hints: ['Write the length in terms of $w$ using the total fencing, then write the area $A = lw$ as a function of $w$.', 'The area function is quadratic with $a < 0$. Its vertex is halfway between its two zeros.'],
        solution: [
          `Fencing: $${s.eqn}$, so $${s.l}$.`,
          `Area: $${s.A}$.`,
          `The zeros of $A$ are $w = 0$ and $w = ${fmt(s.roots[1])}$, so the vertex is halfway between them: $w = ${fmt(s.w)}$ m.`,
          `Then $l = ${fmt(s.area / s.w)}$ m and $A = ${fmt(s.w)} \\times ${fmt(s.area / s.w)} = ${fmt(s.area)}$.`,
          `The maximum area is $${fmt(s.area)}$ m², when $w = ${fmt(s.w)}$ m.`,
        ],
      };
    }
    if (kind === 1) {
      const r = rng.pick(REVENUE);
      const s = r.s;
      const p0 = r.s === 2 ? 2 * rng.int(r.p0[0], r.p0[1]) : rng.int(r.p0[0], r.p0[1]);
      const k = rng.pick(r.k);
      const xs = rng.int(r.x[0], r.x[1]);
      const n0 = k * (2 * xs + p0 / s);
      const price = p0 + s * xs;
      const sold = n0 - k * xs;
      const best = price * sold;
      const sTex = s === 0.5 ? '0.50' : `${s}`;
      return {
        prompt: `${r.what(n0, p0)}. Market research shows that for every \\$${sTex} increase in price, $${k}$ fewer ${r.units} are ${r.verb}. What price maximizes the revenue, and what is the maximum revenue? Give both to the nearest cent.`,
        parts: [numPart(price, { label: 'Best price: \\$', decimals: 2, tolerance: 0.011 }), numPart(best, { label: 'Maximum revenue: \\$', decimals: 2, tolerance: 0.011 })],
        hints: [`Let $x$ be the number of \\$${sTex} increases. Write the price and the number sold in terms of $x$.`, `Revenue = price × number ${r.verb}. Its zeros are easy to find in factored form, and the vertex is halfway between them.`],
        solution: [
          `Let $x$ be the number of \\$${sTex} increases. Price: $${p0} + ${coefTex(s, true)}x$; number ${r.verb}: $${n0} - ${k}x$.`,
          `$R(x) = (${p0} + ${coefTex(s, true)}x)(${n0} - ${k}x)$.`,
          `The zeros are $x = ${fmt(-p0 / s)}$ and $x = ${fmt(n0 / k)}$. The vertex is halfway between: $x = \\dfrac{${fmt(-p0 / s)} + ${fmt(n0 / k)}}{2} = ${xs}$.`,
          `Price: $${p0} + ${s === 1 ? xs : `${fmt(s)}(${xs})`} = ${cents(price, true)}$ dollars; number ${r.verb}: $${n0} - ${k}(${xs}) = ${sold}$.`,
          `Revenue: $${cents(price, true)} \\times ${sold} = ${cents(best, true)}$ dollars.`,
          `The best price is ${money(price)}, which gives a maximum revenue of ${money(best)}.`,
        ],
      };
    }
    for (;;) {
      const v = rng.int(12, 30);
      const h0 = rng.pick([0.5, 1, 1.2, 1.5, 1.8, 2]);
      const t = v / 9.8;
      const hmax = h0 + (v * v) / 19.6;
      if (!safeRound(t, 1) || !safeRound(hmax, 1)) continue;
      const what = rng.pick(['A football is punted', 'A lacrosse ball is thrown straight up', 'A baseball is popped straight up', 'A volleyball is set straight up']);
      return {
        prompt: `${what}. Its height, $h$, in metres, after $t$ seconds is modelled by $h(t) = ${stdTex(-4.9, v, h0, 't', true)}$. What is the maximum height, and when does it occur? Give both to the nearest tenth.`,
        parts: [numPart(hmax, { label: 'Maximum height:', suffix: 'm', decimals: 1 }), numPart(t, { label: 'Time:', suffix: 's', decimals: 1 })],
        hints: ['The maximum is at the vertex: $t = -\\dfrac{b}{2a}$.', 'Keep the full value of $t$ in your calculator when you substitute it to find the height.'],
        solution: [
          `$t = -\\dfrac{b}{2a} = -\\dfrac{${v}}{2(-4.9)} = \\dfrac{${v}}{9.8} \\approx ${fmt(t, 4)}$.`,
          `$h \\approx -4.9(${fmt(t, 4)})^2 + ${v}(${fmt(t, 4)}) + ${fmt(h0)} \\approx ${fmt(hmax, 3)}$.`,
          `The maximum height is about $${fmtFixed(hmax, 1)}$ m, at about $${fmtFixed(t, 1)}$ s.`,
        ],
      };
    }
  },
});

export const QUAD_FUNCTION_SKILLS: SkillDef[] = [vertexFeatures, vertexTransform, vertexEquation, vertexIntercepts, standardFeatures, completeSquare, quadOptimize];
