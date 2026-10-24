/** Math 20-1 Unit 9 — Linear and Quadratic Inequalities (RF7, RF8). */
import { fixedChoice, mc, mcFigures, numPart, skill } from '../../helpers.ts';
import { fmt, fracLatex, gcd, toFrac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { GridSpec, Line, Part, PlaneFigure, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Inequality signs and formatting
// ---------------------------------------------------------------------------

type Op = '<' | '>' | '\\le' | '\\ge';
const OPS: Op[] = ['<', '>', '\\le', '\\ge'];
const isStrict = (op: Op) => op === '<' || op === '>';
const isGreater = (op: Op) => op === '>' || op === '\\ge';
const flip = (op: Op): Op => (({ '<': '>', '>': '<', '\\le': '\\ge', '\\ge': '\\le' }) as const)[op];
const toggle = (op: Op): Op => (({ '<': '\\le', '\\le': '<', '>': '\\ge', '\\ge': '>' }) as const)[op];
const holds = (op: Op, l: number, r: number) => (op === '<' ? l < r - 1e-9 : op === '>' ? l > r + 1e-9 : op === '\\le' ? l <= r + 1e-9 : l >= r - 1e-9);
const opWord = (op: Op) => ({ '<': 'less than', '>': 'greater than', '\\le': 'less than or equal to', '\\ge': 'greater than or equal to' })[op];

/** LaTeX for a rational number such as -3/2. */
function rt(x: number): string {
  const f = toFrac(x, 1000);
  return f ? fracLatex(f) : fmt(x);
}

/** A sum of [coefficient, body] terms in LaTeX, skipping zeros. */
function sumTex(terms: Array<[number, string]>): string {
  let out = '';
  for (const [c, body] of terms) {
    if (Math.abs(c) < 1e-12) continue;
    const abs = Math.abs(c);
    const coef = body && Math.abs(abs - 1) < 1e-12 ? '' : rt(abs);
    out += out === '' ? `${c < 0 ? '-' : ''}${coef}${body}` : ` ${c < 0 ? '-' : '+'} ${coef}${body}`;
  }
  return out || '0';
}

const NAMES = ['Amara', 'Liam', 'Priya', 'Mateo', 'Aiyana', 'Noah', 'Mei', 'Kwame', 'Sofia', 'Arjun', 'Chloé', 'Owen', 'Fatima', 'Jasmine', 'Raj', 'Leila', 'Tyler', 'Nia'];

// ---------------------------------------------------------------------------
// Figures: boundaries and hatched solution regions
// ---------------------------------------------------------------------------

const G: GridSpec = { xMin: -6, xMax: 6, yMin: -6, yMax: 6 };
const r3 = (x: number) => Math.round(x * 1000) / 1000;
const REGION_NOTE = 'The solution region is shown with orange hatching.';

/** Hatch lines of slope ±1, `spacing` apart, clipped to the part of the grid where inside(x, y) holds. */
function hatch(inside: (x: number, y: number) => boolean, slope: 1 | -1, spacing = 1.5, grid: GridSpec = G): PlaneSegment[] {
  const segs: PlaneSegment[] = [];
  const step = 0.04;
  const tLo = grid.yMin - Math.max(slope * grid.xMin, slope * grid.xMax);
  const tHi = grid.yMax - Math.min(slope * grid.xMin, slope * grid.xMax);
  for (let t = Math.floor(tLo / spacing) * spacing + 0.25; t <= tHi; t += spacing) {
    const ok = (x: number) => {
      const y = slope * x + t;
      return y >= grid.yMin && y <= grid.yMax && inside(x, y);
    };
    const edge = (good: number, bad: number) => {
      let lo = good;
      let hi = bad;
      for (let i = 0; i < 30; i++) {
        const mid = (lo + hi) / 2;
        if (ok(mid)) lo = mid;
        else hi = mid;
      }
      return lo;
    };
    let start: number | null = null;
    let prevOk = false;
    const n = Math.round((grid.xMax - grid.xMin) / step);
    for (let i = 0; i <= n; i++) {
      const x = grid.xMin + i * step;
      const cur = ok(x);
      if (cur && !prevOk) start = i === 0 ? x : edge(x, x - step);
      if (start !== null && ((!cur && prevOk) || (cur && i === n))) {
        const end = cur ? x : edge(x - step, x);
        if (end - start > 0.15) segs.push({ from: [r3(start), r3(slope * start + t)], to: [r3(end), r3(slope * end + t)], color: 'accent' });
        start = null;
      }
      prevOk = cur;
    }
  }
  return segs;
}

/** A non-vertical boundary y = mx + b, or a vertical one x = h. */
interface Boundary {
  m: number;
  b: number;
  vertical?: number;
}

function boundaryLine(bd: Boundary): Line {
  return bd.vertical !== undefined ? { A: 1, B: 0, C: -bd.vertical } : { A: bd.m, B: -1, C: bd.b };
}

/** Positive on the "greater" side: above a line (or to the right of a vertical line). */
function sideValue(bd: Boundary, x: number, y: number): number {
  return bd.vertical !== undefined ? x - bd.vertical : y - (bd.m * x + bd.b);
}

function linearRegion(bd: Boundary, greater: boolean, solid: boolean, points: PlanePoint[] = []): PlaneFigure {
  const L = boundaryLine(bd);
  const norm = Math.hypot(L.A, L.B);
  const inside = (x: number, y: number) => {
    const v = sideValue(bd, x, y);
    const dist = Math.abs(L.A * x + L.B * y + L.C) / norm;
    return (greater ? v > 0 : v < 0) && dist > 0.15;
  };
  const slope = bd.vertical !== undefined || bd.m <= 0 ? 1 : -1;
  return { type: 'plane', grid: G, lines: [{ line: L, dashed: !solid }], segments: hatch(inside, slope), ...(points.length ? { points } : {}) };
}

/** The graph of y = f(x) clipped to the grid, as polylines. */
function curveLines(f: (x: number) => number, g: GridSpec = G, n = 240): Array<Array<[number, number]>> {
  const lines: Array<Array<[number, number]>> = [];
  const inside = (y: number) => y >= g.yMin && y <= g.yMax;
  const cross = (xIn: number, xOut: number): [number, number] => {
    const bound = f(xOut) > g.yMax ? g.yMax : g.yMin;
    let lo = xIn;
    let hi = xOut;
    for (let i = 0; i < 40; i++) {
      const mid = (lo + hi) / 2;
      if (inside(f(mid))) lo = mid;
      else hi = mid;
    }
    return [lo, bound];
  };
  let cur: Array<[number, number]> = [];
  let prevX = g.xMin;
  for (let i = 0; i <= n; i++) {
    const x = g.xMin + ((g.xMax - g.xMin) * i) / n;
    const y = f(x);
    if (inside(y)) {
      if (!cur.length && i > 0) {
        const c = cross(x, prevX);
        if (Math.abs(c[0] - x) > 1e-6) cur.push(c);
      }
      cur.push([x, y]);
    } else if (cur.length) {
      cur.push(cross(prevX, x));
      lines.push(cur);
      cur = [];
    }
    prevX = x;
  }
  if (cur.length) lines.push(cur);
  return lines;
}

/** Break polylines into short dashes (each dash its own polyline), measured along the curve. */
function dashes(lines: Array<Array<[number, number]>>, dash = 0.3, gap = 0.24): Array<Array<[number, number]>> {
  const out: Array<Array<[number, number]>> = [];
  for (const pts of lines) {
    let drawing = true;
    let left = dash;
    let cur: Array<[number, number]> = [pts[0]];
    for (let i = 1; i < pts.length; i++) {
      let [x0, y0] = pts[i - 1];
      const [x1, y1] = pts[i];
      let len = Math.hypot(x1 - x0, y1 - y0);
      while (len > left) {
        const t = left / len;
        const xm = x0 + (x1 - x0) * t;
        const ym = y0 + (y1 - y0) * t;
        if (drawing) {
          cur.push([xm, ym]);
          out.push(cur);
          cur = [];
        } else cur = [[xm, ym]];
        drawing = !drawing;
        len -= left;
        x0 = xm;
        y0 = ym;
        left = drawing ? dash : gap;
      }
      left -= len;
      if (drawing) cur.push([x1, y1]);
    }
    if (drawing && cur.length > 1) out.push(cur);
  }
  return out;
}

const round = (lines: Array<Array<[number, number]>>) => lines.map((pts) => ({ points: pts.map(([x, y]) => [r3(x), r3(y)] as [number, number]) }));

function parabolaRegion(f: (x: number) => number, greater: boolean, solid: boolean, points: PlanePoint[] = []): PlaneFigure {
  const inside = (x: number, y: number) => (greater ? y - f(x) > 0.2 : f(x) - y > 0.2);
  const curve = curveLines(f);
  return { type: 'plane', grid: G, polylines: round(solid ? curve : dashes(curve)), segments: hatch(inside, -1, 1.2), ...(points.length ? { points } : {}) };
}

// ---------------------------------------------------------------------------
// RF7 — linear inequalities in two variables
// ---------------------------------------------------------------------------

const SLOPES = [-3, -2, -1, -1 / 2, 1 / 2, 1, 2, 3, 2 / 3, -2 / 3, 3 / 2, -3 / 2, 1 / 3, -1 / 3];

/** y op mx + b in LaTeX. */
const yForm = (op: Op, m: number, b: number) => `y ${op} ${sumTex([[m, 'x'], [b, '']])}`;

/** The same inequality written as Ax + By op C with integers (B may be negative). */
function generalForm(rng: Rng, op: Op, m: number, b: number): { tex: string; A: number; B: number; C: number; op: Op } {
  const f = toFrac(m, 100)!;
  const s = rng.chance(0.5) ? -1 : 1;
  // y op (p/q)x + b  ⇔  −p x + q y op q b  (q > 0); multiplying by s = −1 flips the sign
  const A = -s * f.n;
  const B = s * f.d;
  const C = s * f.d * b;
  const gop = s === 1 ? op : flip(op);
  return { tex: `${sumTex([[A, 'x'], [B, 'y']])} ${gop} ${C}`, A, B, C, op: gop };
}

function linearBoundary(rng: Rng): Boundary {
  const m = rng.pick(SLOPES);
  const f = toFrac(m, 100)!;
  let b = rng.int(-4, 4);
  // keep the intercept and one more lattice point on the grid
  if (Math.abs(b + f.n) > 5) b = -Math.sign(f.n) * rng.int(0, 2);
  return { m, b };
}

function describe(greater: boolean, solid: boolean, vertical: boolean): string {
  const side = vertical ? (greater ? 'shade to the right of the line' : 'shade to the left of the line') : greater ? 'shade above the line' : 'shade below the line';
  return `${solid ? 'Solid' : 'Dashed'} boundary line; ${side}`;
}

interface Context {
  intro: string;
  vars: [string, string];
  coef: [number, number];
  total: number;
  op: Op;
  ask: (u: number, v: number) => string;
}

function pickContext(rng: Rng): Context {
  const name = rng.pick(NAMES);
  const pick = rng.int(0, 4);
  if (pick === 0) {
    const [p, q] = rng.pick([
      [12, 8],
      [15, 10],
      [14, 9],
      [20, 12],
    ] as Array<[number, number]>);
    const T = rng.pick([960, 1200, 1500, 1800]);
    return {
      intro: `The drama club at a high school in ${rng.pick(['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest'])} sells adult tickets for \\$${p} and student tickets for \\$${q}. The club needs to raise at least \\$${T}. Let $a$ be the number of adult tickets sold and $s$ the number of student tickets sold.`,
      vars: ['a', 's'],
      coef: [p, q],
      total: T,
      op: '\\ge',
      ask: (u, v) => `Would selling ${u} adult tickets and ${v} student tickets meet the goal?`,
    };
  }
  if (pick === 1) {
    const [p, q] = rng.pick([
      [40, 75],
      [25, 60],
      [30, 45],
      [50, 80],
    ] as Array<[number, number]>);
    const T = rng.pick([1200, 1500, 1800, 2000]);
    return {
      intro: `A freight elevator can safely carry at most ${T} kg. It is loaded with boxes of paper that have a mass of ${p} kg each and boxes of floor tiles that have a mass of ${q} kg each. Let $p$ be the number of boxes of paper and $t$ the number of boxes of tiles.`,
      vars: ['p', 't'],
      coef: [p, q],
      total: T,
      op: '\\le',
      ask: (u, v) => `Can the elevator safely carry ${u} boxes of paper and ${v} boxes of tiles together?`,
    };
  }
  if (pick === 2) {
    const [p, q] = rng.pick([
      [16, 20],
      [15, 22],
      [17, 25],
      [18, 24],
    ] as Array<[number, number]>);
    const T = rng.pick([400, 450, 500, 600]);
    return {
      intro: `${name} works two part-time jobs: stocking shelves at a grocery store for \\$${p}/h and coaching swimming for \\$${q}/h. ${name} wants to earn more than \\$${T} in a month. Let $g$ be the number of hours at the grocery store and $c$ the number of hours coaching.`,
      vars: ['g', 'c'],
      coef: [p, q],
      total: T,
      op: '>',
      ask: (u, v) => `Would working ${u} h at the grocery store and ${v} h coaching meet ${name}’s goal?`,
    };
  }
  if (pick === 3) {
    const [p, q] = rng.pick([
      [3, 5],
      [4, 6],
      [2, 5],
      [3, 8],
    ] as Array<[number, number]>);
    const T = rng.pick([600, 900, 1200, 1500]);
    return {
      intro: `A minor hockey team in ${rng.pick(['Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury'])} sells chocolate bars for \\$${p} each and raffle tickets for \\$${q} each. The team wants to raise more than \\$${T}. Let $b$ be the number of chocolate bars sold and $r$ the number of raffle tickets sold.`,
      vars: ['b', 'r'],
      coef: [p, q],
      total: T,
      op: '>',
      ask: (u, v) => `Would selling ${u} chocolate bars and ${v} raffle tickets meet the goal?`,
    };
  }
  const [p, q] = rng.pick([
    [4, 3],
    [5, 2],
    [6, 4],
    [8, 5],
  ] as Array<[number, number]>);
  const T = rng.pick([60, 80, 100, 120]);
  return {
    intro: `${name} has at most \\$${T} to spend on school supplies. Binders cost \\$${p} each and packs of pens cost \\$${q} each. Let $b$ be the number of binders and $n$ the number of packs of pens.`,
    vars: ['b', 'n'],
    coef: [p, q],
    total: T,
    op: '\\le',
    ask: (u, v) => `Can ${name} afford ${u} binders and ${v} packs of pens?`,
  };
}

const linearInequality = skill({
  id: 'm201-linear-inequality',
  name: 'Linear inequalities in two variables',
  description: 'Test points, graph a linear inequality with a solid or dashed boundary and the correct shading, and write an inequality for a situation.',
  outcomes: ['RF7'],
  lessonId: 'm201-9-1',
  format: 'mc',
  gen(rng, d) {
    const variant = d === 1 ? rng.pick(['point', 'describe']) : d === 2 ? rng.pick(['graph', 'graph', 'pointGeneral']) : rng.pick(['fromGraph', 'context']);
    const op = rng.pick(OPS);
    if (variant === 'context') {
      const c = pickContext(rng);
      const [X, Y] = c.vars;
      const [p, q] = c.coef;
      const lhs = (pp: number, qq: number) => sumTex([[pp, X], [qq, Y]]);
      const correct = `$${lhs(p, q)} ${c.op} ${c.total}$`;
      const wrongs = [`$${lhs(p, q)} ${flip(c.op)} ${c.total}$`, `$${lhs(q, p)} ${c.op} ${c.total}$`, `$${lhs(p, q)} ${toggle(c.op)} ${c.total}$`];
      let u = 0;
      let v = 0;
      for (let i = 0; i < 100; i++) {
        u = rng.int(Math.max(1, Math.round((0.2 * c.total) / p)), Math.max(2, Math.round((0.7 * c.total) / p)));
        v = Math.max(0, Math.round((c.total - p * u) / q) + rng.pick([-3, -2, -1, 1, 2, 3]));
        if (p * u + q * v !== c.total) break;
      }
      const value = p * u + q * v;
      const ok = holds(c.op, value, c.total);
      return {
        prompt: `${c.intro}\n\n(a) Which inequality models this situation?\n\n(b) ${c.ask(u, v)}`,
        parts: [
          { label: '(a)', answer: mc(rng, correct, rng.shuffle(wrongs)) },
          { label: '(b)', answer: fixedChoice(['Yes', 'No'], ok ? 0 : 1) },
        ],
        hints: [`Write an expression for the total: (price or mass) × (number) for each item, added together.`, `“At least” means $\\ge$, “at most” means $\\le$, “more than” means $>$, “less than” means $<$.`],
        solution: [
          `The total is $${lhs(p, q)}$.`,
          `The condition is ${c.op === '\\ge' ? '“at least”, so use $\\ge$' : c.op === '\\le' ? '“at most”, so use $\\le$' : '“more than”, so use $>$'}: ${correct}`,
          `Test $${X} = ${u}$, $${Y} = ${v}$: $${p}(${u}) + ${q}(${v}) = ${value}$, and $${value} ${c.op} ${c.total}$ is ${ok ? 'true' : 'false'}.`,
          `(a) ${correct} (b) ${ok ? 'Yes' : 'No'}`,
        ],
      };
    }
    // vertical boundaries appear only in the "describe" variant
    if (variant === 'describe' && rng.chance(0.25)) {
      const h = rng.int(-4, 4);
      const vx = rng.chance(0.5);
      const v = vx ? 'x' : 'y';
      const correct = describe(isGreater(op), !isStrict(op), vx);
      const all = [true, false].flatMap((g) => [true, false].map((s) => describe(g, s, vx)));
      return {
        prompt: `How do you graph the solution region of $${v} ${op} ${h}$ on a coordinate grid?`,
        parts: [{ answer: mc(rng, correct, rng.shuffle(all.filter((x) => x !== correct))) }],
        hints: ['A strict inequality ($<$ or $>$) has a dashed boundary; $\\le$ or $\\ge$ has a solid boundary.', vx ? `The boundary is the vertical line $x = ${h}$. Values of $x$ greater than $${h}$ are to the right of it.` : `The boundary is the horizontal line $y = ${h}$. Values of $y$ greater than $${h}$ are above it.`],
        solution: [
          `The boundary is the ${vx ? 'vertical' : 'horizontal'} line $${v} = ${h}$. It is ${isStrict(op) ? 'dashed because points on it do not satisfy a strict inequality' : 'solid because points on it are included'}.`,
          `$${v} ${op} ${h}$ means ${v}-values ${opWord(op)} $${h}$: ${vx ? (isGreater(op) ? 'to the right of' : 'to the left of') : isGreater(op) ? 'above' : 'below'} the line.`,
          `Answer: ${correct}.`,
        ],
      };
    }
    const bd = linearBoundary(rng);
    const { m, b } = bd;
    const yf = yForm(op, m, b);
    if (variant === 'describe') {
      const correct = describe(isGreater(op), !isStrict(op), false);
      const all = [true, false].flatMap((g) => [true, false].map((s) => describe(g, s, false)));
      return {
        prompt: `How do you graph the solution region of $${yf}$?`,
        parts: [{ answer: mc(rng, correct, rng.shuffle(all.filter((x) => x !== correct))) }],
        hints: ['A strict inequality ($<$ or $>$) has a dashed boundary; $\\le$ or $\\ge$ has a solid boundary.', 'When $y$ is alone on the left, $y >$ or $y \\ge$ means the points above the line.'],
        solution: [
          `The boundary is $y = ${sumTex([[m, 'x'], [b, '']])}$. The sign is $${op}$, so the line is ${isStrict(op) ? 'dashed (points on it are not solutions)' : 'solid (points on it are solutions)'}.`,
          `$y$ is ${opWord(op)} the value on the line, so the solution region is ${isGreater(op) ? 'above' : 'below'} the line.`,
          `Answer: ${correct}.`,
        ],
      };
    }
    if (variant === 'point' || variant === 'pointGeneral') {
      const general = variant === 'pointGeneral' || rng.chance(0.4);
      const gf = generalForm(rng, op, m, b);
      const ineq = general ? gf.tex : yf;
      const u = rng.int(-5, 5);
      let w = rng.int(-5, 5);
      if (rng.chance(0.25) && Number.isInteger(m * u + b)) w = m * u + b;
      else if (Math.abs(w - (m * u + b)) < 1e-9) w += 1;
      const lhsVal = general ? gf.A * u + gf.B * w : w;
      const rhsVal = general ? gf.C : m * u + b;
      const ok = holds(general ? gf.op : op, lhsVal, rhsVal);
      const shownOp = general ? gf.op : op;
      const coefTimes = (c: number, x: number) => `${c === 1 ? '' : c === -1 ? '-' : c}(${x})`;
      const subst = `${coefTimes(gf.A, u)} ${gf.B < 0 ? '-' : '+'} ${coefTimes(Math.abs(gf.B), w)}`;
      const rhsTex = sumTex([[m, `(${u})`], [b, '']]);
      return {
        prompt: `Is the point $(${u}, ${w})$ a solution of $${ineq}$?`,
        parts: [{ answer: fixedChoice(['Yes', 'No'], ok ? 0 : 1) }],
        hints: ['Substitute the coordinates of the point into the inequality.', 'If the resulting statement is true, the point is in the solution region.'],
        solution: [
          `Substitute $x = ${u}$ and $y = ${w}$.`,
          general ? `Left side: $${subst} = ${lhsVal}$. Right side: $${gf.C}$.` : `Left side: $${w}$. Right side: $${rhsTex} = ${rt(rhsVal)}$.`,
          `Is $${rt(lhsVal)} ${shownOp} ${rt(rhsVal)}$? ${ok ? 'Yes, it is true' : 'No, it is false'}${Math.abs(lhsVal - rhsVal) < 1e-9 ? ` (the point is on the boundary, which is ${isStrict(shownOp) ? 'not included' : 'included'})` : ''}.`,
          `${ok ? 'Yes' : 'No'}: the point ${ok ? 'is' : 'is not'} a solution.`,
        ],
      };
    }
    if (variant === 'graph') {
      const gf = generalForm(rng, op, m, b);
      const greater = isGreater(op);
      const solid = !isStrict(op);
      const options = [
        { md: '', figure: linearRegion(bd, greater, solid), correct: true },
        { md: '', figure: linearRegion(bd, !greater, solid) },
        { md: '', figure: linearRegion(bd, greater, !solid) },
        { md: '', figure: linearRegion(bd, !greater, !solid) },
      ];
      const flipped = gf.B < 0;
      return {
        prompt: `Which graph shows the solution region of $${gf.tex}$? ${REGION_NOTE}`,
        parts: [{ answer: mcFigures(rng, options) }],
        hints: ['Solve for $y$ first. If you divide by a negative number, reverse the inequality sign.', 'Use a dashed line for $<$ or $>$ and a solid line for $\\le$ or $\\ge$. Then test a point such as $(0, 0)$.'],
        solution: [
          `Solve for $y$: $${sumTex([[gf.B, 'y']])} ${gf.op} ${sumTex([[-gf.A, 'x'], [gf.C, '']])}$`,
          ...(gf.B === 1 ? [] : [`Divide by $${gf.B}$${flipped ? ' and reverse the sign (dividing by a negative)' : ''}: $${yf}$`]),
          `The boundary $y = ${sumTex([[m, 'x'], [b, '']])}$ is ${solid ? 'solid' : 'dashed'}, and the region is ${greater ? 'above' : 'below'} the line.`,
          b !== 0 ? `Check with $(0, 0)$: $0 ${op} ${b}$ is ${holds(op, 0, b) ? 'true, so $(0, 0)$ is in the region' : 'false, so $(0, 0)$ is not in the region'}.` : `Check with $(0, 1)$: $1 ${op} ${0}$ is ${holds(op, 1, 0) ? 'true' : 'false'}, so the region is ${holds(op, 1, 0) ? 'above' : 'below'} the line.`,
        ],
      };
    }
    // fromGraph
    const greater = isGreater(op);
    const solid = !isStrict(op);
    const correct = `$${yf}$`;
    const wrongs = [`$${yForm(flip(op), m, b)}$`, `$${yForm(toggle(op), m, b)}$`, rng.chance(0.5) || b === 0 ? `$${yForm(op, -m, b)}$` : `$${yForm(op, m, -b)}$`, `$${yForm(op, -m, b)}$`];
    const f = toFrac(m, 100)!;
    return {
      prompt: `Which inequality is shown by the graph? ${REGION_NOTE}`,
      figure: linearRegion(bd, greater, solid, [
        { x: 0, y: b, color: 'muted' },
        { x: f.d, y: b + f.n, color: 'muted' },
      ]),
      parts: [{ answer: mc(rng, correct, wrongs) }],
      hints: ['Find the $y$-intercept and the slope (rise over run) of the boundary line.', 'A dashed line means $<$ or $>$; a solid line means $\\le$ or $\\ge$. Shading above the line means $y >$ or $y \\ge$.'],
      solution: [
        `The boundary passes through $(0, ${b})$ and $(${f.d}, ${b + f.n})$: the rise is $${f.n}$ and the run is $${f.d}$, so $m = ${rt(m)}$ and $b = ${b}$. The boundary is $y = ${sumTex([[m, 'x'], [b, '']])}$.`,
        `The line is ${solid ? 'solid, so the boundary is included ($\\le$ or $\\ge$)' : 'dashed, so the boundary is not included ($<$ or $>$)'}.`,
        `The region ${greater ? 'above' : 'below'} the line is shaded, so $y$ is ${greater ? 'greater' : 'less'} than the line: ${correct}`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// RF8 — quadratic inequalities in one variable
// ---------------------------------------------------------------------------

/** Solution set of a(x − r)(x − s) op 0 with r < s: between the roots or outside them, ends included or not. */
interface SolSet {
  between: boolean;
  incl: boolean;
  r: number;
  s: number;
}

function setTex(S: SolSet, v = 'x'): string {
  const lt = S.incl ? '\\le' : '<';
  const gt = S.incl ? '\\ge' : '>';
  const body = S.between ? `${rt(S.r)} ${lt} ${v} ${lt} ${rt(S.s)}` : `${v} ${lt} ${rt(S.r)} \\text{ or } ${v} ${gt} ${rt(S.s)}`;
  return `$\\{${v} \\mid ${body},\\ ${v} \\in \\mathbb{R}\\}$`;
}

function sameSet(a: SolSet, b: SolSet) {
  return a.between === b.between && a.incl === b.incl && a.r === b.r && a.s === b.s;
}

/** Distractor sets: the other region, the wrong endpoints and a sign error in the roots. */
function wrongSets(S: SolSet): SolSet[] {
  const out: SolSet[] = [
    { ...S, between: !S.between },
    { ...S, incl: !S.incl },
    { ...S, r: -S.s, s: -S.r },
    { ...S, between: !S.between, incl: !S.incl },
  ];
  return out.filter((x, i) => !sameSet(x, S) && out.findIndex((y) => sameSet(x, y)) === i);
}

/** A number line from lo to hi showing the set, drawn on a thin plane. */
function numberLine(S: SolSet, lo: number, hi: number): PlaneFigure {
  const grid: GridSpec = { xMin: lo, xMax: hi, yMin: 0, yMax: 0.5 };
  const segs: PlaneSegment[] = S.between
    ? [{ from: [S.r, 0], to: [S.s, 0] }]
    : [
        { from: [S.r, 0], to: [lo, 0], arrowEnd: true },
        { from: [S.s, 0], to: [hi, 0], arrowEnd: true },
      ];
  const points: PlanePoint[] = [S.r, S.s].map((x) => ({ x, y: 0, open: !S.incl, label: rt(x) }));
  return { type: 'plane', grid, segments: segs, points, caption: 'Number line' };
}

function signWord(v: number) {
  return v > 0 ? 'positive' : v < 0 ? 'negative' : 'zero';
}

const quadIneq1 = skill({
  id: 'm201-quad-inequality-1var',
  name: 'Quadratic inequalities in one variable',
  description: 'Solve quadratic inequalities in one variable using the roots of the related equation and test intervals or a sign diagram.',
  outcomes: ['RF8'],
  lessonId: 'm201-9-2',
  gen(rng, d) {
    const op = rng.pick(OPS);
    let r = 0;
    let s = 0;
    let ineq = '';
    const pre: string[] = [];
    const variant = d === 1 ? 'factored' : d === 2 ? rng.pick(['standard', 'standard', 'rearrange']) : rng.pick(['leadA', 'negative', 'context']);
    if (variant === 'context') {
      // h = −5t² + vt + h0 > H, with integer crossing times
      const t1 = rng.int(1, 2);
      const t2 = t1 + rng.int(2, 4);
      const h0 = rng.pick([0, 0, 2, 5]);
      const vel = 5 * (t1 + t2);
      const H = 5 * t1 * t2 + h0;
      const cop: Op = rng.chance(0.5) ? '>' : '\\ge';
      const thing = vel > 25 ? (h0 ? `A model rocket is launched from a platform ${h0} m above the ground` : 'A model rocket is launched from the ground') : h0 ? `A ball is thrown upward from a balcony ${h0} m above the ground` : rng.pick(['A soccer ball is kicked straight up from the ground', 'A model rocket is launched from the ground']);
      const context = `${thing}. Its height, $h$, in metres, after $t$ seconds is $h = -5t^2 + ${vel}t${h0 ? ` + ${h0}` : ''}$. During what times is it ${cop === '>' ? 'more than' : 'at least'} $${H}$ m above the ground?`;
      ineq = `-5t^2 + ${vel}t${h0 ? ` + ${h0}` : ''} ${cop} ${H}`;
      pre.push(`Write the inequality: $${ineq}$`, `Subtract $${H}$: $${sumTex([[-5, 't^2'], [vel, 't'], [h0 - H, '']])} ${cop} 0$`, `Divide by $-5$ and reverse the sign: $${sumTex([[1, 't^2'], [-(t1 + t2), 't'], [t1 * t2, '']])} ${flip(cop)} 0$`, `Factor: $(t - ${t1})(t - ${t2}) ${flip(cop)} 0$`);
      return solve1(rng, d, 1, t1, t2, flip(cop), 't', context, pre, true);
    }
    for (let i = 0; i < 100; i++) {
      r = rng.int(-6, 5);
      s = r + rng.int(2, d === 1 ? 7 : 8);
      if (s <= 6 && r !== 0 && s !== 0 && r !== -s) break;
    }
    if (variant === 'factored') {
      ineq = `${r === 0 ? 'x' : `(x ${r < 0 ? '+' : '-'} ${Math.abs(r)})`}(x ${s < 0 ? '+' : '-'} ${Math.abs(s)}) ${op} 0`;
      return solve1(rng, d, 1, r, s, op, 'x', `Solve $${ineq}$.`, [], false);
    }
    const b = -(r + s);
    const c = r * s;
    if (variant === 'standard') {
      ineq = `${sumTex([[1, 'x^2'], [b, 'x'], [c, '']])} ${op} 0`;
      pre.push(`Factor: $(x ${r < 0 ? '+' : '-'} ${Math.abs(r)})(x ${s < 0 ? '+' : '-'} ${Math.abs(s)}) ${op} 0$`);
      return solve1(rng, d, 1, r, s, op, 'x', `Solve $${ineq}$.`, pre, false);
    }
    if (variant === 'rearrange') {
      // x² op −bx − c, shown with terms on both sides
      ineq = b !== 0 ? `x^2 ${op} ${sumTex([[-b, 'x'], [-c, '']])}` : `x^2 ${op} ${-c}`;
      pre.push(`Move every term to the left: $${sumTex([[1, 'x^2'], [b, 'x'], [c, '']])} ${op} 0$`, `Factor: $(x ${r < 0 ? '+' : '-'} ${Math.abs(r)})(x ${s < 0 ? '+' : '-'} ${Math.abs(s)}) ${op} 0$`);
      return solve1(rng, d, 1, r, s, op, 'x', `Solve $${ineq}$.`, pre, false);
    }
    if (variant === 'negative') {
      ineq = `${sumTex([[-1, 'x^2'], [-b, 'x'], [-c, '']])} ${op} 0`;
      pre.push(`Multiply by $-1$ and reverse the sign: $${sumTex([[1, 'x^2'], [b, 'x'], [c, '']])} ${flip(op)} 0$`, `Factor: $(x ${r < 0 ? '+' : '-'} ${Math.abs(r)})(x ${s < 0 ? '+' : '-'} ${Math.abs(s)}) ${flip(op)} 0$`);
      return solve1(rng, d, 1, r, s, flip(op), 'x', `Solve $${ineq}$.`, pre, false);
    }
    // leadA: (m x − p)(n x − q) op 0 with a rational root
    let m = 2;
    let p = 1;
    let n = 1;
    let q = 2;
    for (let i = 0; i < 200; i++) {
      m = rng.pick([2, 3, 4]);
      p = rng.int(-7, 7);
      n = 1;
      q = rng.int(-5, 5);
      if (p % m !== 0 && gcd(m, p) === 1 && q !== 0 && p / m !== q) break;
    }
    const A = m * n;
    const B = -(m * q + n * p);
    const C = p * q;
    const lo = Math.min(p / m, q);
    const hi = Math.max(p / m, q);
    const side = rng.int(0, 2);
    ineq = side === 0 ? `${sumTex([[A, 'x^2'], [B, 'x'], [C, '']])} ${op} 0` : side === 1 ? `${sumTex([[A, 'x^2'], [B, 'x']])} ${op} ${-C}` : `${sumTex([[A, 'x^2']])} ${op} ${sumTex([[-B, 'x'], [-C, '']])}`;
    if (side !== 0) pre.push(`Move every term to the left: $${sumTex([[A, 'x^2'], [B, 'x'], [C, '']])} ${op} 0$`);
    pre.push(`Factor: $(${sumTex([[m, 'x'], [-p, '']])})(${sumTex([[n, 'x'], [-q, '']])}) ${op} 0$`);
    return solve1(rng, d, A, lo, hi, op, 'x', `Solve $${ineq}$.`, pre, false);
  },
});

/** Build the item for a(x − r)(x − s) op 0 (a > 0 after any rearranging), r < s. */
function solve1(rng: Rng, d: number, a: number, r: number, s: number, op: Op, v: string, prompt: string, pre: string[], context: boolean) {
  const f = (x: number) => a * (x - r) * (x - s);
  const between = !isGreater(op);
  const S: SolSet = { between, incl: !isStrict(op), r, s };
  const inner = Math.floor(r) + 1;
  const mid = inner < s ? inner : (r + s) / 2;
  const tests = [Math.floor(r) - 1, mid, Math.ceil(s) + 1];
  const testLines = tests.map((t, i) => {
    const val = f(t);
    const where = i === 0 ? `${v} < ${rt(r)}` : i === 1 ? `${rt(r)} < ${v} < ${rt(s)}` : `${v} > ${rt(s)}`;
    return `$${where}$: test $${v} = ${rt(t)}$; the expression is $${rt(val)}$ (${signWord(val)}).`;
  });
  const wrongs = wrongSets(S);
  const parts: Part[] = [{ label: 'Boundary values (roots): $' + v + ' =$', answer: { kind: 'numbers', values: [r, s] }, placeholder: 'e.g. -2, 3' }];
  if (d === 2 && Number.isInteger(r) && Number.isInteger(s)) {
    const ends = [r, s, -r, -s];
    let L = Math.min(...ends) - 2;
    let H = Math.max(...ends) + 2;
    while (H - L < 12) {
      L--;
      H++;
    }
    const options = [{ md: '', figure: numberLine(S, L, H), correct: true }, ...wrongs.slice(0, 3).map((w) => ({ md: '', figure: numberLine(w, L, H) }))];
    parts.push({ label: 'Solution:', answer: mcFigures(rng, options) });
  } else {
    parts.push({ label: 'Solution set:', answer: mc(rng, setTex(S, v), wrongs.map((w) => setTex(w, v))) });
  }
  const want = isGreater(op) ? (isStrict(op) ? 'positive' : 'positive or zero') : isStrict(op) ? 'negative' : 'negative or zero';
  return {
    prompt: `${prompt}${d === 2 ? ' Then choose the number line that shows the solution.' : ''}\n\nFirst give the roots of the related equation, separated by a comma.`,
    parts,
    hints: [
      context ? 'Write the inequality, move every term to one side, and divide by a negative number carefully (it reverses the sign).' : 'Solve the related equation (replace the inequality sign with $=$) to find the boundary values.',
      'The roots split the number line into three intervals. Test one value in each interval, or use a sign diagram.',
      `${isStrict(op) ? 'The inequality is strict, so the boundary values are not included.' : 'The inequality includes equality, so the boundary values are included.'}`,
    ],
    solution: [
      ...pre,
      `The related equation has roots $${v} = ${rt(r)}$ and $${v} = ${rt(s)}$.`,
      ...testLines,
      `We want the expression to be ${want}${between ? ', which happens between the roots' : ', which happens outside the roots'}.`,
      `Solution: ${setTex(S, v)}${context ? ' (all of these times are before it lands, so they all make sense)' : ''}`,
    ],
    answerDisplay: setTex(S, v),
  };
}

// ---------------------------------------------------------------------------
// RF7 — quadratic inequalities in two variables
// ---------------------------------------------------------------------------

interface Parab {
  a: number;
  p: number;
  q: number;
  A: number;
  B: number;
  C: number;
  f: (x: number) => number;
  tex: string;
}

/** y = a(x − p)² + q with the vertex towards the edge of the grid, so the inside of the parabola is easy to see. */
function pickParabola(rng: Rng, steep: boolean): Parab {
  for (;;) {
    const a = rng.pick(steep ? [1, -1, 2, -2, 1 / 2, -1 / 2] : [1, -1, 1 / 2, -1 / 2]);
    const p = rng.int(-2, 2);
    const q = a > 0 ? rng.int(-5, 1) : rng.int(-1, 5);
    const A = a;
    const B = -2 * a * p;
    const C = a * p * p + q;
    if (!Number.isInteger(B) || !Number.isInteger(C * 2)) continue;
    if (Math.abs(q) < 1 && p === 0) continue;
    return { a, p, q, A, B, C, f: (x) => a * (x - p) ** 2 + q, tex: sumTex([[A, 'x^2'], [B, 'x'], [C, '']]) };
  }
}

const quadIneq2 = skill({
  id: 'm201-quad-inequality-2var',
  name: 'Quadratic inequalities in two variables',
  description: 'Decide whether a point satisfies a quadratic inequality in two variables, and identify the graph or the inequality of its solution region.',
  outcomes: ['RF7'],
  lessonId: 'm201-9-3',
  format: 'mc',
  gen(rng, d) {
    const P = pickParabola(rng, d === 1);
    const op = rng.pick(OPS);
    const greater = isGreater(op);
    const solid = !isStrict(op);
    const ineq = `y ${op} ${P.tex}`;
    if (d === 1) {
      const u = rng.int(-3, 3);
      const fu = P.f(u);
      let w = Math.round(fu) + rng.pick([-3, -2, -1, 1, 2, 3]);
      if (rng.chance(0.2) && Number.isInteger(fu)) w = fu;
      const ok = holds(op, w, fu);
      const subst = sumTex([[P.A, `(${u})^2`], [P.B, `(${u})`], [P.C, '']]);
      return {
        prompt: `Consider the inequality $${ineq}$ and the point $(${u}, ${w})$.\n\n(a) Evaluate the right side, $${P.tex}$, at $x = ${u}$.\n\n(b) Is the point a solution of the inequality?`,
        parts: [numPart(fu, { label: '(a)' }), { label: '(b)', answer: fixedChoice(['Yes', 'No'], ok ? 0 : 1) }],
        hints: ['Substitute $x$ into the quadratic expression, using the order of operations.', `Then check whether $y = ${w}$ makes $${w} ${op} (\\text{your value})$ true.`],
        solution: [
          `$${subst} = ${rt(fu)}$`,
          `Is $${w} ${op} ${rt(fu)}$? ${ok ? 'Yes, it is true' : 'No, it is false'}${w === fu ? ` (the point is on the boundary, which is ${isStrict(op) ? 'not included' : 'included'})` : ''}.`,
          `(a) $${rt(fu)}$ (b) ${ok ? 'Yes' : 'No'}`,
        ],
      };
    }
    const where = greater ? 'above' : 'below';
    const style = solid ? 'solid' : 'dashed';
    const vertexNote = `The boundary is the parabola $y = ${P.tex}$, with vertex $(${P.p}, ${P.q})$, opening ${P.a > 0 ? 'up' : 'down'}.`;
    const test = Math.abs(P.f(0)) > 1e-9 ? { x: 0, y: 0 } : { x: 0, y: 1 };
    const testOk = holds(op, test.y, P.f(test.x));
    const testLine = `Check with $(${test.x}, ${test.y})$: $${test.y} ${op} ${rt(P.f(test.x))}$ is ${testOk ? 'true' : 'false'}, so $(${test.x}, ${test.y})$ is ${testOk ? 'in' : 'not in'} the solution region.`;
    if (d === 2) {
      const options = [
        { md: '', figure: parabolaRegion(P.f, greater, solid), correct: true },
        { md: '', figure: parabolaRegion(P.f, !greater, solid) },
        { md: '', figure: parabolaRegion(P.f, greater, !solid) },
        { md: '', figure: parabolaRegion(P.f, !greater, !solid) },
      ];
      return {
        prompt: `Which graph shows the solution region of $${ineq}$? ${REGION_NOTE}`,
        parts: [{ answer: mcFigures(rng, options) }],
        hints: ['Use a dashed boundary for $<$ or $>$ and a solid boundary for $\\le$ or $\\ge$.', '$y >$ or $y \\ge$ means the points above the parabola; check with a test point such as $(0, 0)$.'],
        solution: [vertexNote, `The sign is $${op}$, so the parabola is ${style}.`, `$y$ is ${opWord(op)} the value on the parabola, so the region is ${where} the parabola.`, testLine],
      };
    }
    if (rng.chance(0.5)) {
      // graph → inequality
      const correct = `$${ineq}$`;
      const mirror = P.p !== 0 ? sumTex([[P.A, 'x^2'], [-P.B, 'x'], [P.C, '']]) : sumTex([[P.A, 'x^2'], [P.B, 'x'], [-P.C, '']]);
      const wrongs = [`$y ${flip(op)} ${P.tex}$`, `$y ${toggle(op)} ${P.tex}$`, `$y ${op} ${mirror}$`, `$y ${toggle(flip(op))} ${P.tex}$`];
      return {
        prompt: `Which inequality is shown by the graph? ${REGION_NOTE}`,
        figure: parabolaRegion(P.f, greater, solid, [{ x: P.p, y: P.q, color: 'muted', label: `(${P.p},\\,${P.q})` }]),
        parts: [{ answer: mc(rng, correct, wrongs) }],
        hints: ['Match the vertex and the direction of opening to the equation of the boundary.', 'A dashed boundary means $<$ or $>$; a solid boundary means $\\le$ or $\\ge$. Shading above the parabola means $y >$ or $y \\ge$.'],
        solution: [
          `The vertex is $(${P.p}, ${P.q})$ and the parabola opens ${P.a > 0 ? 'up' : 'down'}, which matches $y = ${P.tex}$ (in vertex form, $y = ${P.a === 1 ? '' : P.a === -1 ? '-' : rt(P.a)}${P.p === 0 ? 'x^2' : `(x ${P.p < 0 ? '+' : '-'} ${Math.abs(P.p)})^2`}${P.q === 0 ? '' : ` ${P.q < 0 ? '-' : '+'} ${Math.abs(P.q)}`}$).`,
          `The boundary is ${style}, so the sign is ${solid ? '$\\le$ or $\\ge$' : '$<$ or $>$'}.`,
          `The region ${where} the parabola is shaded: ${correct}`,
        ],
      };
    }
    // which point is in the region?
    const cands: Array<[number, number]> = [];
    const inRegion = (x: number, y: number) => holds(op, y, P.f(x));
    let good: [number, number] = [P.p, P.q + (greater ? 2 : -2)];
    for (let i = 0; i < 200; i++) {
      const x = rng.int(-4, 4);
      const fx = P.f(x);
      if (!Number.isInteger(fx)) continue;
      const y = !isStrict(op) && rng.chance(0.4) ? fx : fx + (greater ? 1 : -1) * rng.int(1, 4);
      if (inRegion(x, y) && Math.abs(y) <= 9) {
        good = [x, y];
        break;
      }
    }
    const bad: Array<[number, number]> = [];
    for (let i = 0; i < 400 && bad.length < 3; i++) {
      const x = rng.int(-4, 4);
      const fx = P.f(x);
      if (!Number.isInteger(fx)) continue;
      const y = isStrict(op) && bad.length === 0 ? fx : fx + (greater ? -1 : 1) * rng.int(1, 4);
      if (!inRegion(x, y) && Math.abs(y) <= 9 && !bad.some(([bx, by]) => bx === x && by === y) && !(x === good[0] && y === good[1])) bad.push([x, y]);
    }
    cands.push(good, ...bad);
    const ptTex = ([x, y]: [number, number]) => `$(${x}, ${y})$`;
    const check = ([x, y]: [number, number]) => `$(${x}, ${y})$: at $x = ${x}$ the right side is $${rt(P.f(x))}$, and $${y} ${op} ${rt(P.f(x))}$ is ${inRegion(x, y) ? 'true' : 'false'}.`;
    return {
      prompt: `Which point is in the solution region of $${ineq}$?`,
      parts: [{ answer: mc(rng, ptTex(good), bad.map(ptTex)) }],
      hints: ['Substitute each point into the inequality.', `Evaluate $${P.tex}$ at the point’s $x$-coordinate and compare it with the $y$-coordinate. Watch whether the boundary is included.`],
      solution: [...cands.map(check), `Only ${ptTex(good)} makes the inequality true.`],
    };
  },
});

export const INEQUALITY_SKILLS: SkillDef[] = [linearInequality, quadIneq1, quadIneq2];
