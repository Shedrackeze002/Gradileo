/**
 * More Mathematics Topics, Unit 29: the mid-ordinate rule and Voronoi diagrams. Estimating an area
 * with rectangles through the midpoints of the strips, and dividing the plane into the regions
 * nearest to each of a set of sites.
 */
import { fixedChoice, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, roundTo, toFrac, fracLatex } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, SkillDef } from '../../../types.ts';
import { eq3, s3, SF_TEXT, sfPart, sum } from './common.ts';

type Out = GenOutput;

// ---------------------------------------------------------------------------
// 29.1 The mid-ordinate rule
// ---------------------------------------------------------------------------

type Fn = { tex: string; f: (x: number) => number; F?: (x: number) => number; convex?: boolean };

/** y = ax² + bx + c with whole coefficients, and its integral. */
function quadratic(rng: Rng): Fn {
  const a = rng.pick([1, 2, 3, -1]);
  const b = rng.int(-4, 4);
  const c = rng.int(1, 12) + (a < 0 ? 30 : 0);
  const term = (k: number, v: string, first = false) => (k === 0 ? '' : `${k < 0 ? (first ? '-' : ' - ') : first ? '' : ' + '}${Math.abs(k) === 1 && v ? '' : Math.abs(k)}${v}`);
  return {
    tex: `${term(a, 'x^2', true)}${term(b, 'x')}${term(c, '')}`,
    f: (x) => a * x * x + b * x + c,
    F: (x) => (a * x ** 3) / 3 + (b * x * x) / 2 + c * x,
    convex: a > 0,
  };
}

const CURVES: Fn[] = [
  { tex: '\\sqrt{x}', f: Math.sqrt, convex: false },
  { tex: '\\dfrac{1}{1 + x}', f: (x) => 1 / (1 + x), convex: true },
  { tex: '\\ln(1 + x)', f: (x) => Math.log(1 + x), convex: false },
  { tex: 'e^{0.5x}', f: (x) => Math.exp(0.5 * x), convex: true },
  { tex: '\\sqrt{1 + x^2}', f: (x) => Math.sqrt(1 + x * x), convex: true },
  { tex: '\\dfrac{10}{x + 2}', f: (x) => 10 / (x + 2), convex: true },
];

function midOrdinate(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const n = rng.int(4, 6);
    const h = rng.pick([1, 2, 0.5]);
    const p = rng.int(0, 4);
    const mids = Array.from({ length: n }, (_, i) => p + (i + 0.5) * h);
    const ys = mids.map(() => rng.int(10, 80) / 10);
    const area = h * sum(ys);
    const figure: Figure = { type: 'table', headers: ['$x$', ...mids.map((m) => fmt(m))], rows: [['$y$', ...ys.map((y) => fmt(y))]], markdown: true };
    return {
      prompt: `The table gives the values of $y$ at the midpoints of ${n} strips of width $${fmt(h)}$, from $x = ${p}$ to $x = ${fmt(p + n * h)}$. Use the mid-ordinate rule to estimate the area under the curve.`,
      figure,
      parts: [numPart(roundTo(area, 4), { exact: false, label: 'Area $\\approx$' })],
      hints: ['The mid-ordinate rule: area $\\approx h(y_1 + y_2 + \\dots + y_n)$, where the $y$ values are taken at the midpoints of the strips.'],
      solution: [`Area $\\approx ${fmt(h)}(${ys.map((y) => fmt(y)).join(' + ')}) = ${fmt(h)} \\times ${fmt(roundTo(sum(ys), 4))} = ${fmt(roundTo(area, 4))}$`],
    };
  }
  const fn = d === 2 ? quadratic(rng) : rng.pick(CURVES);
  const n = rng.int(3, 5);
  const p = d === 2 ? rng.int(0, 3) : rng.int(0, 2);
  const h = d === 2 ? rng.pick([1, 2]) : rng.pick([0.5, 1]);
  const q = p + n * h;
  const mids = Array.from({ length: n }, (_, i) => p + (i + 0.5) * h);
  const ys = mids.map(fn.f);
  const area = h * sum(ys);
  return {
    prompt: `Use the mid-ordinate rule with $${n}$ strips to estimate $\\displaystyle\\int_{${p}}^{${fmt(q)}} ${d === 2 ? `(${fn.tex})` : fn.tex}\\,dx$. ${SF_TEXT}`,
    parts: [sfPart(area, { label: 'Estimate:' })],
    hints: [`The strip width is $h = \\dfrac{${fmt(q)} - ${p}}{${n}} = ${fmt(h)}$, and the midpoints are $x = ${mids.map((m) => fmt(m)).join(',\\ ')}$.`, 'Area $\\approx h \\times$ (the sum of the $y$ values at the midpoints).'],
    solution: [
      `$h = ${fmt(h)}$; midpoints $x = ${mids.map((m) => fmt(m)).join(',\\ ')}$`,
      `$y$ values: $${ys.map((y) => s3(y)).join(',\\ ')}$`,
      `Area $\\approx ${fmt(h)} \\times ${s3(sum(ys))} ${eq3(area)}$`,
    ],
    calculator: d === 3,
  };
}

function midOrdinateError(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const p = rng.int(0, 6);
    const n = rng.int(3, 8);
    const h = rng.pick([1, 2, 0.5, 3]);
    const k = rng.int(2, n);
    return {
      prompt: `The interval from $x = ${p}$ to $x = ${fmt(p + n * h)}$ is split into $${n}$ equal strips for the mid-ordinate rule. Find the width of each strip, and the $x$-value of the midpoint of strip number $${k}$.`,
      parts: [numPart(h, { label: '$h =$', exact: false }), numPart(p + (k - 0.5) * h, { label: '$x =$', exact: false })],
      hints: ['$h = \\dfrac{b - a}{n}$.', `Strip $${k}$ runs from $x = ${p} + ${k - 1}h$ to $x = ${p} + ${k}h$; its midpoint is halfway between.`],
      solution: [`$h = \\dfrac{${fmt(p + n * h)} - ${p}}{${n}} = ${fmt(h)}$`, `Midpoint of strip $${k}$: $x = ${p} + ${fmt(k - 0.5)} \\times ${fmt(h)} = ${fmt(p + (k - 0.5) * h)}$`],
    };
  }
  if (d === 2) {
    const fn = quadratic(rng);
    const n = rng.int(2, 4);
    const p = rng.int(0, 2);
    const h = rng.pick([1, 2]);
    const q = p + n * h;
    const est = h * sum(Array.from({ length: n }, (_, i) => fn.f(p + (i + 0.5) * h)));
    const exact = fn.F!(q) - fn.F!(p);
    const err = (Math.abs(exact - est) / Math.abs(exact)) * 100;
    return {
      prompt: `The mid-ordinate rule with $${n}$ strips gives $${fmt(roundTo(est, 4))}$ as an estimate of $\\displaystyle\\int_{${p}}^{${q}} (${fn.tex})\\,dx$. Find the exact value of the integral, and the percentage error of the estimate. ${SF_TEXT}`,
      parts: [numPart(exact, { label: 'Exact value:' }), sfPart(err, { label: 'Percentage error:', suffix: '%' })],
      hints: ['Integrate term by term and substitute the limits.', 'Percentage error $= \\dfrac{|\\text{exact} - \\text{estimate}|}{\\text{exact}} \\times 100$.'],
      solution: [`Exact value $= ${exactTex(exact)}$`, `Percentage error $= \\dfrac{|${exactTex(exact)} - ${fmt(roundTo(est, 4))}|}{${exactTex(exact)}} \\times 100 ${eq3(err)}\\%$`],
    };
  }
  const fn = rng.pick([...CURVES, quadratic(rng), quadratic(rng)]);
  return {
    prompt: `The mid-ordinate rule is used to estimate the area under $y = ${fn.tex}$ on an interval where $y > 0$. Is the estimate an overestimate or an underestimate?`,
    parts: [part(fixedChoice([
      'An underestimate, because the curve bends upwards (it is convex).',
      'An overestimate, because the curve bends downwards (it is concave).',
      'Exactly right, because the midpoints balance out.',
    ], fn.convex ? 0 : 1))],
    hints: ['Through each midpoint, the top of the rectangle can be tilted into a tangent without changing its area.', 'A curve that bends upwards lies above its tangents, so the rectangles miss some area. A curve that bends downwards lies below them.'],
    solution: [fn.convex ? `$y = ${fn.tex}$ bends upwards on this interval, so the curve lies above the tangent at each midpoint, and the mid-ordinate rule underestimates.` : `$y = ${fn.tex}$ bends downwards on this interval, so the curve lies below the tangent at each midpoint, and the mid-ordinate rule overestimates.`],
  };
}

/** An exact value as a fraction when it needs one. */
function exactTex(v: number): string {
  const fr = toFrac(v, 12);
  return fr && fr.d !== 1 ? fracLatex(fr, { dfrac: true }) : fmt(roundTo(v, 6));
}

// ---------------------------------------------------------------------------
// 29.2 Voronoi diagrams
// ---------------------------------------------------------------------------

type P = [number, number];
const pt = ([x, y]: P) => `(${fmt(x)}, ${fmt(y)})`;
const dist = (a: P, b: P) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const SITES = ['A', 'B', 'C', 'D', 'E'];
const PLACES = ['schools', 'shops', 'water pumps', 'mobile phone masts', 'fire stations'];

/** The circumcentre of three points (the point equidistant from all three). */
function circumcentre(a: P, b: P, c: P): P | null {
  const dd = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
  if (Math.abs(dd) < 1e-9) return null;
  const s = (p: P) => p[0] * p[0] + p[1] * p[1];
  return [
    (s(a) * (b[1] - c[1]) + s(b) * (c[1] - a[1]) + s(c) * (a[1] - b[1])) / dd,
    (s(a) * (c[0] - b[0]) + s(b) * (a[0] - c[0]) + s(c) * (b[0] - a[0])) / dd,
  ];
}

const fracTex = (v: number) => {
  const fr = toFrac(v, 100);
  return fr ? fracLatex(fr, { dfrac: true }) : fmt(v);
};

function voronoiBisector(rng: Rng, d: Difficulty): Out {
  const place = rng.pick(PLACES);
  if (d < 3) {
    const [a, b] = retry(
      () => [[rng.int(0, 10), rng.int(0, 10)], [rng.int(0, 10), rng.int(0, 10)]] as [P, P],
      ([a, b]) => (a[0] - b[0]) % 2 === 0 && (a[1] - b[1]) % 2 === 0 && a[0] !== b[0] && a[1] !== b[1],
      200,
    );
    const m: P = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const grad = -(b[0] - a[0]) / (b[1] - a[1]);
    const c = m[1] - grad * m[0];
    const intro = `Two ${place} are at $A${pt(a)}$ and $B${pt(b)}$. The edge of the Voronoi diagram between them is part of the perpendicular bisector of $AB$.`;
    if (d === 1) {
      return {
        prompt: `${intro} Find the midpoint of $AB$ and the gradient of the bisector.`,
        parts: [numPart(m[0], { label: 'Midpoint $x$:', exact: false }), numPart(m[1], { label: 'Midpoint $y$:', exact: false }), numPart(grad, { label: 'Gradient:' })],
        hints: ['The midpoint is $\\left(\\dfrac{x_1 + x_2}{2}, \\dfrac{y_1 + y_2}{2}\\right)$.', 'The bisector is perpendicular to $AB$, so its gradient is the negative reciprocal of the gradient of $AB$.'],
        solution: [`Midpoint $= ${pt(m)}$`, `Gradient of $AB = ${fracTex((b[1] - a[1]) / (b[0] - a[0]))}$, so the gradient of the bisector is $${fracTex(grad)}$.`],
      };
    }
    return {
      prompt: `${intro} Find the equation of this edge in the form $y = mx + c$. Give exact values of $m$ and $c$.`,
      parts: [numPart(grad, { label: '$m =$' }), numPart(c, { label: '$c =$' })],
      hints: [`The edge passes through the midpoint $${pt(m)}$.`, 'Its gradient is the negative reciprocal of the gradient of $AB$. Then use the midpoint to find $c$.'],
      solution: [`Midpoint $${pt(m)}$, gradient of $AB = ${fracTex((b[1] - a[1]) / (b[0] - a[0]))}$, so $m = ${fracTex(grad)}$.`, `$c = ${fmt(m[1])} - \\left(${fracTex(grad)}\\right) \\times ${fmt(m[0])} = ${fracTex(c)}$`],
    };
  }
  const { sites, centre } = tripleOnCircle(rng);
  return {
    prompt: `Three ${place} are at $A${pt(sites[0])}$, $B${pt(sites[1])}$ and $C${pt(sites[2])}$. Find the coordinates of the vertex of their Voronoi diagram, the point where the three edges meet.`,
    parts: [numPart(centre[0], { label: '$x =$', exact: false }), numPart(centre[1], { label: '$y =$', exact: false })],
    hints: ['The vertex is the same distance from all three sites, so it lies on the perpendicular bisectors of $AB$ and of $BC$.', 'Find the equations of two of the bisectors and solve them together.'],
    solution: [`The vertex is equidistant from $A$, $B$ and $C$. Solving the equations of the perpendicular bisectors of $AB$ and $BC$ gives $${pt(centre)}$.`, `Check: it is $${fmt(dist(centre, sites[0]))}$ units from each site.`],
  };
}

/** Three whole-number points at a whole-number distance from a whole-number centre. */
function tripleOnCircle(rng: Rng): { sites: [P, P, P]; centre: P; r: number } {
  const r = rng.pick([5, 10, 13]);
  const offs: P[] = r === 13 ? [[5, 12], [12, 5], [13, 0]] : r === 10 ? [[6, 8], [8, 6], [10, 0]] : [[3, 4], [4, 3], [5, 0]];
  const all: P[] = [];
  for (const [x, y] of offs) for (const sx of [1, -1]) for (const sy of [1, -1]) all.push([sx * x, sy * y], [sx * y, sy * x]);
  const uniq = [...new Map(all.map((p) => [`${p[0]},${p[1]}`, p])).values()];
  const centre: P = [rng.int(-3, 6), rng.int(-3, 6)];
  const picks = retry(
    () => rng.shuffle(uniq).slice(0, 3) as [P, P, P],
    (ps) => {
      // Keep the three sites well spread around the circle (an acute triangle).
      const ang = ps.map(([x, y]) => Math.atan2(y, x)).sort((p, q) => p - q);
      const gaps = [ang[1]! - ang[0]!, ang[2]! - ang[1]!, 2 * Math.PI - ang[2]! + ang[0]!];
      return gaps.every((g) => g < Math.PI * 0.95 && g > 0.6);
    },
    200,
  );
  return { sites: picks.map(([x, y]) => [x + centre[0], y + centre[1]] as P) as [P, P, P], centre, r };
}

function voronoiNearest(rng: Rng, d: Difficulty): Out {
  const place = rng.pick(PLACES);
  if (d === 1) {
    const k = rng.int(3, 5);
    const sites = retry(() => Array.from({ length: k }, () => [rng.int(0, 12), rng.int(0, 12)] as P), (ss) => new Set(ss.map((s) => s.join())).size === k, 100);
    const [q, best] = retry(
      () => {
        const q: P = [rng.int(0, 12), rng.int(0, 12)];
        const ds = sites.map((s) => dist(s, q)).sort((a, b) => a - b);
        return [q, ds] as [P, number[]];
      },
      ([q, ds]) => ds[1]! - ds[0]! > 0.4 && !sites.some((s) => s.join() === q.join()),
      200,
    );
    const nearest = sites.findIndex((s) => Math.abs(dist(s, q) - best[0]!) < 1e-9);
    return {
      prompt: `The ${place} in a town are at ${sites.map((s, i) => `$${SITES[i]}${pt(s)}$`).join(', ')}. A house is at $${pt(q)}$. In the Voronoi diagram of the ${place}, which cell is the house in?`,
      parts: [part(fixedChoice(sites.map((_, i) => `The cell of $${SITES[i]}$`), nearest))],
      hints: ['Each cell of a Voronoi diagram holds the points that are nearer to its site than to any other site.', 'Work out the distance from the house to each site, and pick the smallest.'],
      solution: [...sites.map((s, i) => `Distance to $${SITES[i]}$: $\\sqrt{${(s[0] - q[0]) ** 2} + ${(s[1] - q[1]) ** 2}} ${eq3(dist(s, q))}$`), `The nearest site is $${SITES[nearest]}$, so the house is in its cell.`],
      calculator: true,
    };
  }
  if (d === 2) {
    const { sites, centre, r } = tripleOnCircle(rng);
    return {
      prompt: `Three ${place} are at $A${pt(sites[0])}$, $B${pt(sites[1])}$ and $C${pt(sites[2])}$, and their Voronoi diagram has a vertex at $V${pt(centre)}$. A new building should be as far as possible from the nearest of the ${place}, and it is put at $V$. How far is it from each of them?`,
      parts: [numPart(r, { label: 'Distance:', exact: false, suffix: 'units' })],
      hints: ['A vertex of a Voronoi diagram is the same distance from the three sites around it.', 'Find the distance from $V$ to any one of the sites.'],
      solution: [`$VA = \\sqrt{(${sites[0][0]} - ${sp(centre[0])})^2 + (${sites[0][1]} - ${sp(centre[1])})^2} = ${r}$`, `By the same working, $VB = VC = ${r}$.`],
    };
  }
  // Two vertices of a four-site diagram: which is further from its nearest sites?
  const data = retry(
    () => {
      const s = Array.from({ length: 4 }, () => [rng.int(0, 14), rng.int(0, 14)] as P);
      const p = circumcentre(s[0]!, s[1]!, s[2]!);
      const q = circumcentre(s[1]!, s[2]!, s[3]!);
      return { s, p, q };
    },
    ({ s, p, q }) => {
      if (!p || !q) return false;
      const half = (v: number) => Math.abs(v * 2 - Math.round(v * 2)) < 1e-9;
      if (![...p, ...q].every(half)) return false;
      if ([...p, ...q].some((v) => v < -2 || v > 16)) return false;
      const [rp, rq] = [dist(p, s[0]!), dist(q, s[3]!)];
      // Delaunay: D outside the circle through A, B, C, and A outside the circle through B, C, D.
      if (dist(s[3]!, p) <= rp + 0.3 || dist(s[0]!, q) <= rq + 0.3) return false;
      // A and D on opposite sides of BC, and B and C on opposite sides of AD: a convex quadrilateral.
      const side = (u: P, v: P, w: P) => Math.sign((v[0] - u[0]) * (w[1] - u[1]) - (v[1] - u[1]) * (w[0] - u[0]));
      if (side(s[1]!, s[2]!, s[0]!) * side(s[1]!, s[2]!, s[3]!) >= 0 || side(s[0]!, s[3]!, s[1]!) * side(s[0]!, s[3]!, s[2]!) >= 0) return false;
      return Math.abs(rp - rq) > 0.3 && dist(p, q) > 1;
    },
    3000,
  );
  const { s, p, q } = data;
  const [rp, rq] = [dist(p!, s[0]!), dist(q!, s[3]!)];
  const best = rp > rq ? 0 : 1;
  return {
    prompt: `Four ${place} are at $A${pt(s[0]!)}$, $B${pt(s[1]!)}$, $C${pt(s[2]!)}$ and $D${pt(s[3]!)}$. Their Voronoi diagram has two vertices: $P${pt(p!)}$, equidistant from $A$, $B$ and $C$, and $Q${pt(q!)}$, equidistant from $B$, $C$ and $D$. A new site must be as far as possible from the nearest existing one, at one of these vertices. Which vertex should be chosen, and how far is it from its nearest site? ${SF_TEXT}`,
    parts: [part(fixedChoice(['$P$', '$Q$'], best), { label: 'Vertex:' }), sfPart(Math.max(rp, rq), { label: 'Distance:', suffix: 'units' })],
    hints: ['At a vertex, the nearest sites are the three it is equidistant from.', 'Find $PA$ and $QD$, and choose the vertex with the larger distance.'],
    solution: [`$PA = \\sqrt{(${s[0]![0]} - ${sp(p![0])})^2 + (${s[0]![1]} - ${sp(p![1])})^2} ${eq3(rp)}$`, `$QD = \\sqrt{(${s[3]![0]} - ${sp(q![0])})^2 + (${s[3]![1]} - ${sp(q![1])})^2} ${eq3(rq)}$`, `Choose $${best ? 'Q' : 'P'}$, which is $${s3(Math.max(rp, rq))}$ units from its nearest sites.`],
    calculator: true,
  };
}

const sp = (v: number) => (v < 0 ? `(${fmt(v)})` : fmt(v));

export const VORONOI_SKILLS: SkillDef[] = [
  skill({ id: 'mx-mid-ordinate', name: 'The mid-ordinate rule', description: 'Estimate the area under a curve with the mid-ordinate rule, from a table or a function', outcomes: ['MV1'], lessonId: 'mx-29-1', gen: midOrdinate }),
  skill({ id: 'mx-mid-ordinate-error', name: 'Accuracy of the mid-ordinate rule', description: 'Set up the strips, find the percentage error against the exact integral, and decide whether the rule over- or underestimates', outcomes: ['MV1'], lessonId: 'mx-29-1', gen: midOrdinateError }),
  skill({ id: 'mx-voronoi-bisector', name: 'Edges and vertices of a Voronoi diagram', description: 'Find the perpendicular bisector between two sites, and the vertex equidistant from three sites', outcomes: ['MV2'], lessonId: 'mx-29-2', gen: voronoiBisector }),
  skill({ id: 'mx-voronoi-nearest', name: 'Using Voronoi diagrams', description: 'Find the cell a point lies in, and the vertex furthest from its nearest sites', outcomes: ['MV2'], lessonId: 'mx-29-2', gen: voronoiNearest }),
];
