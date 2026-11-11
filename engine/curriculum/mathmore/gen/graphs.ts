/** More Mathematics Topics, Unit 8 (part 2): gradients and areas under graphs, and trigonometric graphs in degrees. */
import { fixedChoice, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, roundTo, sinD, cosD, tanD } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, SkillDef } from '../../../types.ts';
import { sp } from './common.ts';

type Out = GenOutput;
type Pt = [number, number];

// ---------------------------------------------------------------------------
// 8.3 Gradients and areas under graphs
// ---------------------------------------------------------------------------

/** A velocity–time graph of straight pieces, shaded underneath. */
function vtFigure(pts: Pt[], tStep: number, vStep: number, vMax: number): Figure {
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: pts[pts.length - 1]![0], yMin: 0, yMax: vMax, xStep: tStep, yStep: vStep, xLabel: 'Time (s)', yLabel: 'Velocity (m/s)' },
    polylines: [{ points: pts, color: 'brand', fill: true }],
  };
}

/** A journey: speed up from rest, a steady speed, then (sometimes) slow to a stop. Times are multiples of the grid step. */
function journey(rng: Rng, stop: boolean) {
  const tStep = rng.pick([2, 5]);
  const vStep = rng.pick([2, 5]);
  const v = vStep * rng.int(2, 5);
  const t1 = tStep * rng.int(1, 3);
  const t2 = t1 + tStep * rng.int(2, 4);
  const t3 = stop ? t2 + tStep * rng.int(1, 3) : t2;
  const pts: Pt[] = stop ? [[0, 0], [t1, v], [t2, v], [t3, 0]] : [[0, 0], [t1, v], [t2, v]];
  return { tStep, vStep, v, t1, t2, t3, pts, figure: vtFigure(pts, tStep, vStep, v + vStep) };
}

function graphArea(rng: Rng, d: Difficulty): Out {
  if (d === 3) {
    // Estimate the area under a curve with trapezia. Slowing (v = k t (T − t), bending down) gives too small an
    // estimate; speeding up (v = k t², bending up) gives too big a one.
    const T = rng.pick([8, 12]);
    const strips = 4;
    const h = T / strips;
    const up = rng.chance(0.5);
    const k = up ? rng.pick([0.25, 0.5]) : rng.pick([0.5, 1, 1.5]);
    const vAt = (t: number) => (up ? k * t * t : k * t * (T - t));
    const ts = Array.from({ length: strips + 1 }, (_, i) => i * h);
    const vs = ts.map(vAt);
    const est = (h / 2) * (vs[0]! + vs[strips]! + 2 * vs.slice(1, -1).reduce((s, x) => s + x, 0));
    const pts: Pt[] = Array.from({ length: 41 }, (_, i) => [roundTo((i * T) / 40, 4), roundTo(vAt((i * T) / 40), 4)]);
    const vMax = Math.max(...vs);
    const vStep = vMax > 30 ? 10 : 5;
    return {
      prompt: `The graph shows the velocity of a cyclist who is ${up ? 'speeding up' : 'speeding up and then slowing to a stop'} over $${T}$ seconds. The table gives the velocity every $${fmt(h)}$ seconds.\n\n| Time (s) | ${ts.map((t) => fmt(t)).join(' | ')} |\n|---|${ts.map(() => '---').join('|')}|\n| Velocity (m/s) | ${vs.map((v) => fmt(v)).join(' | ')} |\n\nUse ${strips} strips of equal width (trapezia) to estimate the distance the cyclist travels. Is your estimate too high or too low?`,
      figure: { type: 'plane', grid: { xMin: 0, xMax: T, yMin: 0, yMax: Math.ceil(vMax / vStep) * vStep + vStep, xStep: h, yStep: vStep, xLabel: 'Time (s)', yLabel: 'Velocity (m/s)' }, polylines: [{ points: pts, color: 'brand' }], segments: ts.slice(0, -1).map((t, i) => ({ from: [t, vs[i]!] as Pt, to: [ts[i + 1]!, vs[i + 1]!] as Pt, color: 'accent' as const, dashed: true })) },
      parts: [numPart(est, { label: 'Distance ≈', suffix: 'm', exact: false }), { answer: fixedChoice(['Too high (an overestimate)', 'Too low (an underestimate)'], up ? 0 : 1) }],
      hints: [
        'The distance is the area under the velocity–time graph. Split it into strips; each strip is close to a trapezium.',
        'Area of a trapezium $= \\frac{1}{2}(a + b)h$, where $a$ and $b$ are the parallel sides (two velocities) and $h$ is the width of the strip.',
      ],
      solution: [
        ...ts.slice(0, -1).map((_, i) => `Strip ${i + 1}: $\\frac{1}{2}(${fmt(vs[i]!)} + ${fmt(vs[i + 1]!)}) \\times ${fmt(h)} = ${fmt(((vs[i]! + vs[i + 1]!) / 2) * h)}$`),
        `Total: about $${fmt(est)}$ m.`,
        up
          ? 'The curve bends upwards, so it runs below the straight tops of the trapezia: they include extra area, and the estimate is too high.'
          : 'The curve bends downwards, so it runs above the straight tops of the trapezia: they miss some area, and the estimate is too low.',
      ],
      calculator: true,
    };
  }
  const j = journey(rng, d === 2);
  const name = rng.pick(['A car', 'A train', 'A tram', 'A bus', 'A lorry']);
  if (d === 1) {
    const first = rng.chance(0.5);
    const area = first ? (j.t1 * j.v) / 2 : (j.t1 * j.v) / 2 + (j.t2 - j.t1) * j.v;
    return {
      prompt: `The velocity–time graph shows the first $${j.t2}$ seconds of a journey by ${name.toLowerCase()}. Find the distance it travels ${first ? `in the first $${j.t1}$ seconds` : `in the $${j.t2}$ seconds`}.`,
      figure: j.figure,
      parts: [numPart(area, { suffix: 'm' })],
      hints: ['The distance travelled is the area under a velocity–time graph.', first ? 'The area under the first piece is a triangle: $\\frac{1}{2} \\times$ base $\\times$ height.' : 'Split the area into a triangle and a rectangle, or use the area of a trapezium.'],
      solution: first
        ? [`The area is a triangle with base $${j.t1}$ s and height $${j.v}$ m/s.`, `Distance $= \\frac{1}{2} \\times ${j.t1} \\times ${j.v} = ${fmt(area)}$ m`]
        : [`Triangle: $\\frac{1}{2} \\times ${j.t1} \\times ${j.v} = ${fmt((j.t1 * j.v) / 2)}$. Rectangle: $${j.t2 - j.t1} \\times ${j.v} = ${(j.t2 - j.t1) * j.v}$.`, `Distance $= ${fmt((j.t1 * j.v) / 2)} + ${(j.t2 - j.t1) * j.v} = ${fmt(area)}$ m`],
    };
  }
  const area = ((j.t3 + (j.t2 - j.t1)) / 2) * j.v;
  return {
    prompt: `The velocity–time graph shows a journey by ${name.toLowerCase()}, from rest to rest. Find the total distance travelled, and the average speed for the whole journey (to 1 decimal place where needed).`,
    figure: j.figure,
    parts: [numPart(area, { suffix: 'm', label: 'Distance:' }), numPart(area / j.t3, { decimals: 1, suffix: 'm/s', label: 'Average speed:' })],
    hints: ['The distance is the area under the graph. The shape is a trapezium (or a triangle, a rectangle and a triangle).', 'Average speed $=$ total distance $\\div$ total time.'],
    solution: [
      `The area is a trapezium with parallel sides $${j.t3}$ s (the bottom) and $${j.t2 - j.t1}$ s (the top), and height $${j.v}$ m/s.`,
      `Distance $= \\frac{1}{2}(${j.t3} + ${j.t2 - j.t1}) \\times ${j.v} = ${fmt(area)}$ m`,
      `Average speed $= ${fmt(area)} \\div ${j.t3} ${Math.abs(roundTo(area / j.t3, 4) - area / j.t3) < 1e-9 ? '=' : '\\approx'} ${fmt(area / j.t3, 1)}$ m/s`,
    ],
  };
}

function graphGradient(rng: Rng, d: Difficulty): Out {
  if (d === 3) {
    // A tangent to a distance–time curve d = k t²: its gradient estimates the speed at that moment.
    const k = rng.pick([0.5, 1, 2]);
    const a = rng.int(2, 4);
    const T = 6;
    const slope = 2 * k * a;
    const y0 = k * a * a;
    const hgap = 1;
    const p: Pt = [a - hgap, y0 - slope * hgap];
    const q: Pt = [a + hgap, y0 + slope * hgap];
    const pts: Pt[] = Array.from({ length: 31 }, (_, i) => [roundTo((i * T) / 30, 3), roundTo(k * ((i * T) / 30) ** 2, 3)]);
    const yMax = k * T * T;
    const yStep = yMax > 40 ? 10 : 5;
    return {
      prompt: `The graph shows the distance $d$ metres a ball has rolled after $t$ seconds. A tangent is drawn to the curve at $t = ${a}$; it passes through $(${fmt(p[0])},\\ ${fmt(p[1])})$ and $(${fmt(q[0])},\\ ${fmt(q[1])})$. Estimate the speed of the ball at $t = ${a}$ seconds.`,
      figure: {
        type: 'plane',
        grid: { xMin: 0, xMax: T, yMin: 0, yMax, xStep: 1, yStep, xLabel: 'Time (s)', yLabel: 'Distance (m)' },
        polylines: [{ points: pts, color: 'brand' }],
        // The tangent from where it meets the time axis (or 2 s before) to 2 s after.
        segments: [{ from: [a - Math.min(2, a / 2), y0 - slope * Math.min(2, a / 2)], to: [a + 2, y0 + slope * 2], color: 'accent', dashed: true }],
        points: [{ x: p[0], y: p[1], color: 'accent' }, { x: q[0], y: q[1], color: 'accent' }, { x: a, y: y0, label: `t = ${a}` }],
      },
      parts: [numPart(slope, { suffix: 'm/s' })],
      hints: ['The speed at an instant is the gradient of the tangent to the distance–time curve there.', 'Gradient $= \\dfrac{\\text{change in } d}{\\text{change in } t}$ between the two points on the tangent.'],
      solution: [
        `Gradient of the tangent $= \\dfrac{${fmt(q[1])} - ${sp(p[1])}}{${fmt(q[0])} - ${fmt(p[0])}} = \\dfrac{${fmt(q[1] - p[1])}}{${fmt(q[0] - p[0])}} = ${fmt(slope)}$`,
        `The speed at $t = ${a}$ s is about $${fmt(slope)}$ m/s.`,
      ],
    };
  }
  const j = journey(rng, true);
  const decel = d === 2;
  const run = decel ? j.t3 - j.t2 : j.t1;
  const g = j.v / run;
  const exact = Math.abs(roundTo(g, 2) - g) < 1e-9;
  return {
    prompt: `The velocity–time graph shows a journey that starts and ends at rest. Find the ${decel ? 'deceleration at the end of the journey' : 'acceleration at the start of the journey'}, in m/s²${exact ? '' : ', to 2 decimal places'}.`,
    figure: j.figure,
    parts: [numPart(g, { suffix: 'm/s²', ...(exact ? { exact: false } : { decimals: 2 }) })],
    hints: ['Acceleration is the gradient of a velocity–time graph: the change in velocity divided by the time taken.', decel ? 'The last piece slopes down, so the gradient is negative. A deceleration is the size of that gradient (a positive number).' : 'Read the change in velocity and the time it takes for the first piece of the graph.'],
    solution: decel
      ? [`From $t = ${j.t2}$ to $t = ${j.t3}$ the velocity falls from $${j.v}$ to $0$ m/s.`, `Gradient $= \\dfrac{0 - ${j.v}}{${j.t3} - ${j.t2}} = ${fmt(-g, 4)}$, so the deceleration is $${exact ? fmt(g) : fmtFixed(g, 2)}$ m/s².`]
      : [`From $t = 0$ to $t = ${j.t1}$ the velocity rises from $0$ to $${j.v}$ m/s.`, `Acceleration $= \\dfrac{${j.v} - 0}{${j.t1} - 0} = ${exact ? fmt(g) : fmtFixed(g, 2)}$ m/s²`],
  };
}

// ---------------------------------------------------------------------------
// 8.4 Trigonometric graphs in degrees
// ---------------------------------------------------------------------------

type Fn = 'sin' | 'cos' | 'tan';
const VAL: Record<Fn, (x: number) => number> = { sin: sinD, cos: cosD, tan: tanD };

/** The graph of y = a·f(bx + c) + d for 0 ≤ x ≤ 360, with tan cut into branches at its asymptotes. */
function trigFigure(fn: Fn, f: (x: number) => number, yMin: number, yMax: number, extra: Partial<Extract<Figure, { type: 'plane' }>> = {}): Figure {
  const branches: Pt[][] = [[]];
  for (let x = 0; x <= 360; x += 3) {
    const y = f(x);
    if (fn === 'tan' && (Math.abs(y) > yMax + 0.6 || (x % 180 === 90))) {
      if (branches[branches.length - 1]!.length) branches.push([]);
      continue;
    }
    branches[branches.length - 1]!.push([x, roundTo(Math.max(yMin - 0.5, Math.min(yMax + 0.5, y)), 4)]);
  }
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: 360, yMin, yMax, xStep: 30, yStep: yMax - yMin > 4 ? 1 : 0.5, xLabel: 'x (degrees)', yLabel: 'y' },
    polylines: branches.filter((b) => b.length > 1).map((points) => ({ points, color: 'brand' as const })),
    ...extra,
  };
}

/** Solutions of fn x = k for 0 ≤ x ≤ 360, from the principal value. */
function solutions(fn: Fn, k: number): { p: number; xs: number[]; why: string } {
  if (fn === 'sin') {
    const p = (Math.asin(k) * 180) / Math.PI;
    const xs = p >= 0 ? [p, 180 - p] : [180 - p, 360 + p];
    return { p, xs, why: p >= 0 ? `The sine graph is symmetrical about $x = 90^\\circ$, so the other solution is $180^\\circ - ${fmt(p, 1)}^\\circ$.` : `The principal value $${fmt(p, 1)}^\\circ$ is outside the range. The sine graph gives solutions at $180^\\circ + ${fmt(-p, 1)}^\\circ$ and $360^\\circ - ${fmt(-p, 1)}^\\circ$.` };
  }
  if (fn === 'cos') {
    const p = (Math.acos(k) * 180) / Math.PI;
    return { p, xs: [p, 360 - p], why: `The cosine graph is symmetrical about $x = 180^\\circ$, so the other solution is $360^\\circ - ${fmt(p, 1)}^\\circ$.` };
  }
  const p = (Math.atan(k) * 180) / Math.PI;
  const first = p < 0 ? p + 180 : p;
  return { p, xs: [first, first + 180], why: `The tangent graph repeats every $180^\\circ$, so ${p < 0 ? `the solutions are $${fmt(p, 1)}^\\circ + 180^\\circ$ and $${fmt(p, 1)}^\\circ + 360^\\circ$` : `the other solution is $${fmt(p, 1)}^\\circ + 180^\\circ$`}.` };
}

const SPECIAL: Array<{ fn: Fn; k: number; tex: string; neg?: boolean }> = [
  { fn: 'sin', k: 0.5, tex: '0.5' },
  { fn: 'cos', k: 0.5, tex: '0.5' },
  { fn: 'tan', k: 1, tex: '1' },
  { fn: 'sin', k: Math.sqrt(3) / 2, tex: '\\frac{\\sqrt{3}}{2}' },
  { fn: 'cos', k: Math.sqrt(2) / 2, tex: '\\frac{\\sqrt{2}}{2}' },
  { fn: 'sin', k: -0.5, tex: '-0.5', neg: true },
  { fn: 'cos', k: -0.5, tex: '-0.5', neg: true },
  { fn: 'tan', k: -1, tex: '-1', neg: true },
  { fn: 'cos', k: -Math.sqrt(3) / 2, tex: '-\\frac{\\sqrt{3}}{2}', neg: true },
  { fn: 'tan', k: Math.sqrt(3), tex: '\\sqrt{3}' },
];

function trigSolveDegrees(rng: Rng, d: Difficulty): Out {
  const spec = d === 3 ? null : rng.pick(SPECIAL.filter((s) => !!s.neg === (d === 2) || (d === 2 && s.fn === 'tan' && s.k > 1)));
  const fn: Fn = spec ? spec.fn : rng.pick(['sin', 'cos', 'tan'] as const);
  const k = spec ? spec.k : roundTo((rng.int(1, fn === 'tan' ? 25 : 9) / 10) * (rng.chance(0.4) ? -1 : 1), 1);
  const tex = spec ? spec.tex : fmt(k);
  const { p, xs, why } = solutions(fn, k);
  const exact = d !== 3;
  const vals = xs.map((x) => (exact ? Math.round(x) : x));
  const yMax = fn === 'tan' ? 3 : 1.5;
  return {
    prompt: `Solve $\\${fn} x = ${tex}$ for $0^\\circ \\le x \\le 360^\\circ$${exact ? '' : ', giving each solution to 1 decimal place'}. The graph of $y = \\${fn} x$ is drawn with the line $y = ${fmt(k, 3)}$.`,
    figure: trigFigure(fn, VAL[fn], -yMax, yMax, { lines: [{ line: { A: 0, B: 1, C: -k }, color: 'accent', dashed: true }] }),
    parts: [part({ kind: 'numbers', values: vals, ...(exact ? {} : { decimals: 1 }) }, { label: '$x$ =', placeholder: 'e.g. 30, 150', suffix: '°' })],
    hints: [`Use $\\${fn}^{-1}$ on your calculator to find one solution.`, `Then use the graph: the line $y = ${fmt(k, 3)}$ crosses the curve twice between $0^\\circ$ and $360^\\circ$. Use the symmetry of the graph to find the other one.`],
    solution: [
      `$x = \\${fn}^{-1}(${tex}) = ${fmt(p, exact ? 0 : 1)}^\\circ$`,
      why,
      `$x = ${vals.map((v) => `${exact ? fmt(v) : fmtFixed(v, 1)}^\\circ`).join('$ or $x = ')}$`,
    ],
    calculator: d === 3,
  };
}

function trigFeatures(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const fn = rng.pick(['sin', 'cos'] as const);
    const x = rng.pick([0, 90, 180, 270, 360]);
    const y = Math.round(VAL[fn](x));
    const maxX = fn === 'sin' ? 90 : rng.pick([0, 360]);
    const askMin = rng.chance(0.5);
    const at = askMin ? (fn === 'sin' ? 270 : 180) : maxX;
    return {
      prompt: `Use the graph of $y = \\${fn} x$ for $0^\\circ \\le x \\le 360^\\circ$. Find the value of $\\${fn} ${x}^\\circ$, and every value of $x$ where $y$ is at its ${askMin ? 'minimum' : 'maximum'}.`,
      figure: trigFigure(fn, VAL[fn], -1.5, 1.5),
      parts: [numPart(y, { label: `$\\${fn} ${x}^\\circ$ =` }), askMin || fn === 'sin' ? numPart(at, { label: '$x$ =', suffix: '°' }) : part({ kind: 'numbers', values: [0, 360] }, { label: '$x$ =', suffix: '°', placeholder: 'e.g. 0, 360' })],
      hints: [`Read the graph at $x = ${x}^\\circ$.`, `The ${askMin ? 'lowest' : 'highest'} point of the graph is where $y = ${askMin ? '-1' : '1'}$.`],
      solution: [
        `At $x = ${x}^\\circ$ the graph is at $y = ${y}$, so $\\${fn} ${x}^\\circ = ${y}$.`,
        askMin || fn === 'sin' ? `The ${askMin ? 'minimum' : 'maximum'}, $y = ${askMin ? -1 : 1}$, is at $x = ${at}^\\circ$.` : 'The maximum, $y = 1$, is at $x = 0^\\circ$ and at $x = 360^\\circ$.',
      ],
    };
  }
  if (d === 2) {
    const fn = rng.pick(['sin', 'cos'] as const);
    const a = rng.pick([2, 3, 4, 0.5]);
    const c = rng.int(-3, 3);
    const f = (x: number) => a * VAL[fn](x) + c;
    const lo = Math.floor(c - a) - 1;
    const hi = Math.ceil(c + a) + 1;
    const eq = `${a === 1 ? '' : fmt(a)}\\${fn} x${c ? ` ${c < 0 ? '-' : '+'} ${Math.abs(c)}` : ''}`;
    return {
      prompt: `Find the maximum and minimum values of $y = ${eq}$, and the value of $x$ between $0^\\circ$ and $360^\\circ$ where the ${fn === 'sin' ? 'maximum' : 'minimum'} is.`,
      figure: trigFigure(fn, f, lo, hi),
      parts: [numPart(c + a, { label: 'Maximum:' }), numPart(c - a, { label: 'Minimum:' }), numPart(fn === 'sin' ? 90 : 180, { label: `$x$ at the ${fn === 'sin' ? 'maximum' : 'minimum'}:`, suffix: '°' })],
      hints: [`$\\${fn} x$ goes from $-1$ to $1$. Multiplying by $${fmt(a)}$ stretches it to between $${fmt(-a)}$ and $${fmt(a)}$.`, c ? `Then ${c > 0 ? 'adding' : 'subtracting'} $${Math.abs(c)}$ moves the whole graph ${c > 0 ? 'up' : 'down'}.` : 'Nothing is added, so the graph is not moved up or down.'],
      solution: [
        `Maximum $= ${fmt(a)} \\times 1 ${c < 0 ? '-' : '+'} ${Math.abs(c)} = ${fmt(c + a)}$, and minimum $= ${fmt(a)} \\times (-1) ${c < 0 ? '-' : '+'} ${Math.abs(c)} = ${fmt(c - a)}$.`,
        fn === 'sin' ? 'The maximum is where $\\sin x = 1$: at $x = 90^\\circ$.' : 'The minimum is where $\\cos x = -1$: at $x = 180^\\circ$.',
      ],
    };
  }
  if (rng.chance(0.5)) {
    // y = sin(x − c) or cos(x − c): a translation to the right by c.
    const fn = rng.pick(['sin', 'cos'] as const);
    // Not sin(x + 90°), which is cos x, with maximums at both 0° and 360°.
    const c = retry(() => rng.pick([30, 45, 60, 90]) * (rng.chance(0.5) ? -1 : 1), (v) => !(fn === 'sin' && v === -90));
    const f = (x: number) => VAL[fn](x - c);
    const base = fn === 'sin' ? 90 : 0;
    let at = base + c;
    if (at < 0) at += 360;
    return {
      prompt: `The graph of $y = \\${fn} x$ is translated to give $y = \\${fn}(x ${c > 0 ? '-' : '+'} ${Math.abs(c)}^\\circ)$. Describe the translation as a column vector, and find the value of $x$ between $0^\\circ$ and $360^\\circ$ where $y = \\${fn}(x ${c > 0 ? '-' : '+'} ${Math.abs(c)}^\\circ)$ has its maximum.`,
      figure: trigFigure(fn, f, -1.5, 1.5),
      parts: [numPart(c, { label: 'Horizontal part of the vector:' }), numPart(0, { label: 'Vertical part:' }), numPart(at, { label: '$x$ at the maximum:', suffix: '°' })],
      hints: [`$y = f(x - a)$ is $y = f(x)$ translated $a$ to the right (and $f(x + a)$ is $a$ to the left).`, `The maximum of $y = \\${fn} x$ is at $x = ${base}^\\circ$; move it with the graph${at !== base + c ? ', and add $360^\\circ$ if it leaves the range' : ''}.`],
      solution: [
        `$y = \\${fn}(x ${c > 0 ? '-' : '+'} ${Math.abs(c)}^\\circ)$ is $y = \\${fn} x$ moved $${Math.abs(c)}^\\circ$ ${c > 0 ? 'right' : 'left'}: the vector $\\begin{pmatrix} ${c} \\\\ 0 \\end{pmatrix}$.`,
        `The maximum moves from $x = ${base}^\\circ$ to $x = ${base + c}^\\circ$${at !== base + c ? `, which is the same point of the repeating graph as $${at}^\\circ$` : ''}.`,
      ],
    };
  }
  // y = sin(bx): the period is 360 ÷ b.
  const fn = rng.pick(['sin', 'cos'] as const);
  const b = rng.pick([2, 3, 4]);
  const f = (x: number) => VAL[fn](b * x);
  return {
    prompt: `Find the period of $y = \\${fn} ${b}x$, and how many times its graph reaches its maximum for $0^\\circ \\le x \\le 360^\\circ$.`,
    figure: trigFigure(fn, f, -1.5, 1.5),
    parts: [numPart(360 / b, { label: 'Period:', suffix: '°' }), numPart(fn === 'sin' ? b : b + 1, { label: 'Number of maximums:' })],
    hints: [`$y = \\${fn} x$ repeats every $360^\\circ$. Multiplying $x$ by $${b}$ squashes the graph so that it repeats ${b} times as often.`, 'Count the highest points on the graph, including any at the ends of the range.'],
    solution: [
      `Period $= 360^\\circ \\div ${b} = ${360 / b}^\\circ$, so there are $${b}$ full waves between $0^\\circ$ and $360^\\circ$.`,
      fn === 'sin' ? `Each wave has one maximum, so there are $${b}$ maximums.` : `$y = \\cos ${b}x$ starts and ends at a maximum, with one more at the end of each wave: $${b} + 1 = ${b + 1}$ maximums.`,
    ],
  };
}

export const GRAPH_SKILLS: SkillDef[] = [
  skill({ id: 'mx-graph-area', name: 'Areas under graphs', description: 'Find the distance from the area under a velocity–time graph, and estimate areas under curves with trapezia', outcomes: ['SG3'], lessonId: 'mx-8-3', gen: graphArea }),
  skill({ id: 'mx-graph-gradient', name: 'Gradients of graphs', description: 'Find accelerations from a velocity–time graph, and estimate a rate of change from a tangent', outcomes: ['SG3'], lessonId: 'mx-8-3', gen: graphGradient }),
  skill({ id: 'mx-trig-solve-degrees', name: 'Solving trigonometric equations in degrees', description: 'Find every solution of sin x, cos x or tan x = k between 0° and 360° from the graphs', outcomes: ['SG4'], lessonId: 'mx-8-4', gen: trigSolveDegrees }),
  skill({ id: 'mx-trig-graph-features', name: 'Graphs of sine, cosine and tangent', description: 'Read values, maximums, minimums and periods from trigonometric graphs in degrees, and describe their transformations', outcomes: ['SG4'], lessonId: 'mx-8-4', gen: trigFeatures }),
];
