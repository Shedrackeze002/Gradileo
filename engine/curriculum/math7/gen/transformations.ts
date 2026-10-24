/** Math 7 Unit 9 — The Cartesian Plane and Transformations (SS4, SS5). */
import { fixedChoice, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, GridSpec, PlaneFigure, SkillDef } from '../../../types.ts';
import { Sketch, centroid, dirOf, type P } from './constructions.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Kiona', 'Thanh', 'Harpreet', 'Marie-Ève',
];

const G5: GridSpec = { xMin: -5, xMax: 5, yMin: -5, yMax: 5 };
const G6: GridSpec = { xMin: -6, xMax: 6, yMin: -6, yMax: 6 };
const inGrid = (g: GridSpec, p: P) => p[0] >= g.xMin && p[0] <= g.xMax && p[1] >= g.yMin && p[1] <= g.yMax;
/** Inside the grid with a one-unit margin, so labels have room. */
const inside = (g: GridSpec, p: P) => p[0] > g.xMin && p[0] < g.xMax && p[1] > g.yMin && p[1] < g.yMax;

/** An ordered pair in LaTeX: (-3, 4). */
const ptx = (p: P) => `(${p[0]}, ${p[1]})`;
/** A negative number in brackets, for sums and differences. */
const br = (n: number) => (n < 0 ? `(${n})` : `${n}`);
const units = (n: number) => `${Math.abs(n)} unit${Math.abs(n) === 1 ? '' : 's'}`;
const LET = 'ABCD';
const prime = (L: string) => `${L}′`;
const same = (p: P, q: P) => p[0] === q[0] && p[1] === q[1];
const key = (pts: P[]) => pts.map((p) => `${p[0]},${p[1]}`).sort().join(';');

type QName = 'I' | 'II' | 'III' | 'IV';
function quadrant(p: P): QName | 'x-axis' | 'y-axis' | 'origin' {
  if (p[0] === 0 && p[1] === 0) return 'origin';
  if (p[1] === 0) return 'x-axis';
  if (p[0] === 0) return 'y-axis';
  if (p[0] > 0) return p[1] > 0 ? 'I' : 'IV';
  return p[1] > 0 ? 'II' : 'III';
}
const QUAD_SIGNS: Record<QName, string> = { I: '$(+, +)$', II: '$(-, +)$', III: '$(-, -)$', IV: '$(+, -)$' };
const QUAD_RULE = 'Quadrant I is at the top right. The quadrants are numbered I, II, III, IV going counterclockwise: II is top left, III is bottom left and IV is bottom right.';

/** Words for the move from the origin to a point: "3 units left and 4 units up". */
function fromOrigin(p: P): string {
  const parts: string[] = [];
  if (p[0]) parts.push(`${units(p[0])} ${p[0] > 0 ? 'right' : 'left'}`);
  if (p[1]) parts.push(`${units(p[1])} ${p[1] > 0 ? 'up' : 'down'}`);
  return parts.length ? parts.join(' and ') : 'at the origin';
}

/** "3 units left and 2 units up" (or a single direction when one part is 0). */
function slideText(a: number, b: number): string {
  const parts: string[] = [];
  if (a) parts.push(`${units(a)} ${a > 0 ? 'right' : 'left'}`);
  if (b) parts.push(`${units(b)} ${b > 0 ? 'up' : 'down'}`);
  return parts.join(' and ');
}

/** Steps for reading the coordinates of point L at p. */
function readSteps(L: string, p: P): string[] {
  return [
    `Start at the origin, $(0, 0)$. ${p[0] === 0 ? `Point $${L}$ is on the $y$-axis, so you do not move left or right: $x = 0$.` : `Move ${p[0] > 0 ? 'right' : 'left'} along the $x$-axis to below or above $${L}$: ${units(p[0])} ${p[0] > 0 ? 'right' : 'left'}, so $x = ${p[0]}$.`}`,
    p[1] === 0 ? `Point $${L}$ is on the $x$-axis, so you do not move up or down: $y = 0$.` : `Then move ${p[1] > 0 ? 'up' : 'down'} to $${L}$: ${units(p[1])} ${p[1] > 0 ? 'up' : 'down'}, so $y = ${p[1]}$.`,
    `The coordinates of $${L}$ are $${ptx(p)}$.`,
  ];
}

interface ShapeDraw {
  pts: P[];
  color: 'brand' | 'accent';
  names: string[];
}

/** A Cartesian plane with shaded shapes (vertices labelled) and single labelled points. */
function planeFigure(g: GridSpec, shapes: ShapeDraw[], points: Array<{ p: P; label: string; color?: 'brand' | 'accent' }> = []): PlaneFigure {
  const s = new Sketch();
  for (const sh of shapes) s.polygon(sh.pts, sh.color);
  for (const sh of shapes) sh.pts.forEach((p) => s.dot(p, sh.color));
  for (const pt of points) s.dot(pt.p, pt.color ?? 'brand');
  for (const sh of shapes) {
    const c = centroid(sh.pts);
    sh.pts.forEach((p, i) => s.endLabel(p, dirOf(c, p), sh.names[i]));
  }
  for (const pt of points) s.endLabel(pt.p, 45, pt.label);
  return s.buildGrid(g);
}

/** A random triangle with integer vertices in a w by h box at the origin: no two sides equal, no flat side shared by all. */
function makeTri(rng: Rng, w = 3, h = 3): P[] {
  return retry(
    () => [[rng.int(0, w), rng.int(0, h)], [rng.int(0, w), rng.int(0, h)], [rng.int(0, w), rng.int(0, h)]] as P[],
    (t) => {
      const area = Math.abs((t[1][0] - t[0][0]) * (t[2][1] - t[0][1]) - (t[2][0] - t[0][0]) * (t[1][1] - t[0][1])) / 2;
      const d = (p: P, q: P) => (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2;
      const sides = [d(t[0], t[1]), d(t[1], t[2]), d(t[2], t[0])];
      return area >= 1.5 && new Set(sides).size === 3;
    },
    300,
  );
}

/** A quadrilateral with no symmetry: a right trapezoid or a slanted shape. */
function makeQuad(rng: Rng): P[] {
  const w = rng.int(2, 3);
  const h = rng.int(2, 3);
  const t = rng.intExcept(0, w + 1, [w, 0]);
  const pts: P[] = rng.chance(0.5) ? [[0, 0], [w, 0], [t, h], [0, h]] : [[0, 0], [w, 0], [w + 1, h], [1, h - 1]];
  return pts;
}

const shift = (pts: P[], dx: number, dy: number): P[] => pts.map(([x, y]) => [x + dx, y + dy] as P);

/** Place a shape at a random spot so every vertex is strictly inside the grid. */
function placeIn(rng: Rng, g: GridSpec, base: P[], ok: (pts: P[]) => boolean = () => true): P[] {
  return retry(
    () => shift(base, rng.int(g.xMin + 1, g.xMax - 1), rng.int(g.yMin + 1, g.yMax - 1)),
    (pts) => pts.every((p) => inside(g, p)) && ok(pts),
    400,
  );
}

const SHAPE_WORD = (n: number) => (n === 3 ? 'triangle' : 'quadrilateral');
const shapeName = (n: number, primes = false) => LET.slice(0, n).split('').map((c) => (primes ? `${c}'` : c)).join('');

// ---------------------------------------------------------------------------
// Lesson 9.1 — The Cartesian plane
// ---------------------------------------------------------------------------

const QUAD_LABEL: Record<QName, string> = { I: 'Quadrant I', II: 'Quadrant II', III: 'Quadrant III', IV: 'Quadrant IV' };
const LOCATIONS = ['Quadrant I', 'Quadrant II', 'Quadrant III', 'Quadrant IV', 'On the $x$-axis', 'On the $y$-axis'];

function randomPoint(rng: Rng, g: GridSpec, axisOk = false): P {
  return retry(
    () => [rng.int(g.xMin + 1, g.xMax - 1), rng.int(g.yMin + 1, g.yMax - 1)] as P,
    (p) => (axisOk ? !(p[0] === 0 && p[1] === 0) : p[0] !== 0 && p[1] !== 0),
  );
}

function readPoint(rng: Rng, d: Difficulty): GenOutput {
  const n = d === 1 ? 3 : 4;
  const pts: P[] = [];
  // d1: one point in each of three quadrants; d2: one point sits on an axis.
  const quads = rng.sample(['I', 'II', 'III', 'IV'] as QName[], n);
  for (let i = 0; i < n; i++) {
    pts.push(
      retry(
        () => randomPoint(rng, G5),
        (p) => quadrant(p) === quads[i] && !pts.some((q) => same(p, q) || same([p[1], p[0]], q)),
      ),
    );
  }
  let ask = rng.int(0, n - 1);
  if (d === 2) {
    // One point sits on an axis; it is the one asked about most of the time.
    const onAxis = rng.int(0, n - 1);
    const v = rng.nonZero(-4, 4);
    pts[onAxis] = rng.chance(0.5) ? [v, 0] : [0, v];
    ask = rng.chance(0.65) ? onAxis : rng.intExcept(0, n - 1, [onAxis]);
  }
  const L = LET[ask];
  const ctx = rng.pick([
    'Points are plotted on the Cartesian plane.',
    'A treasure map is drawn on a Cartesian plane. The points mark places to dig.',
    'A map of a campground is drawn on a Cartesian plane, with the camp office at the origin.',
    'The points show where players stand on a field drawn on a Cartesian plane.',
  ]);
  return {
    prompt: `${ctx} What are the coordinates of point $${L}$?`,
    figure: planeFigure(G5, [], pts.map((p, i) => ({ p, label: LET[i] }))),
    parts: [part({ kind: 'point', x: pts[ask][0], y: pts[ask][1] }, { label: `$${L}$ =`, placeholder: '(x, y)' })],
    hints: ['An ordered pair is $(x, y)$: first how far right or left of the origin, then how far up or down.', 'Right and up are positive. Left and down are negative.'],
    solution: readSteps(L, pts[ask]),
    answerDisplay: `$${ptx(pts[ask])}$`,
  };
}

function whichQuadrant(rng: Rng, d: Difficulty): GenOutput {
  const axis = d === 2 && rng.chance(0.4);
  const p: P = axis ? (rng.chance(0.5) ? [rng.nonZero(-9, 9), 0] : [0, rng.nonZero(-9, 9)]) : [rng.nonZero(-9, 9), rng.nonZero(-9, 9)];
  const q = quadrant(p);
  let choices: string[];
  let correct: string;
  if (q === 'x-axis' || q === 'y-axis') {
    const v = q === 'x-axis' ? p[0] : p[1];
    const near: QName[] = q === 'x-axis' ? (v > 0 ? ['I', 'IV'] : ['II', 'III']) : v > 0 ? ['I', 'II'] : ['III', 'IV'];
    correct = q === 'x-axis' ? LOCATIONS[4] : LOCATIONS[5];
    choices = LOCATIONS.filter((c) => c === LOCATIONS[4] || c === LOCATIONS[5] || near.some((n) => QUAD_LABEL[n] === c));
  } else {
    correct = QUAD_LABEL[q as QName];
    choices = LOCATIONS.slice(0, 4);
  }
  const ctx = rng.pick(['', 'A drone hovers over a field mapped on a Cartesian plane. ', 'On a map of a town drawn on a Cartesian plane, the library is at the origin. ', 'In a video game, the map is a Cartesian plane. ']);
  const where = ctx.includes('drone') ? 'the drone at' : ctx.includes('town') ? 'a bus stop at' : ctx.includes('game') ? 'a hidden key at' : 'the point';
  return {
    prompt: `${ctx}Where is ${where} $${ptx(p)}$?`,
    parts: [{ answer: fixedChoice(choices, choices.indexOf(correct)) }],
    hints: [QUAD_RULE, 'Look at the signs: $x$ tells right (+) or left (−), and $y$ tells up (+) or down (−). A coordinate of $0$ puts the point on an axis.'],
    solution:
      q === 'x-axis' || q === 'y-axis'
        ? [
            `The ${q === 'x-axis' ? '$y$' : '$x$'}-coordinate is $0$, so the point does not move ${q === 'x-axis' ? 'up or down' : 'left or right'} from the origin.`,
            `It is ${fromOrigin(p)} from the origin, so it lies on the ${q === 'x-axis' ? '$x$' : '$y$'}-axis. Points on an axis are not in any quadrant.`,
            `The answer is: on the ${q === 'x-axis' ? '$x$' : '$y$'}-axis.`,
          ]
        : [
            `$x = ${p[0]}$ is ${p[0] > 0 ? 'positive (right)' : 'negative (left)'} and $y = ${p[1]}$ is ${p[1] > 0 ? 'positive (up)' : 'negative (down)'}.`,
            `The signs are ${QUAD_SIGNS[q as QName]}. ${QUAD_RULE}`,
            `The point is in ${QUAD_LABEL[q as QName]}.`,
          ],
    answerDisplay: correct,
  };
}

function whichPoint(rng: Rng): GenOutput {
  const x = rng.nonZero(-5, 5);
  const y = retry(() => rng.nonZero(-5, 5), (v) => Math.abs(v) !== Math.abs(x));
  const target: P = [x, y];
  const wrong: P[] = [[y, x], [-x, y], [x, -y], [-x, -y], [-y, -x]];
  const picks = rng.sample(wrong, 3);
  const all = rng.shuffle([target, ...picks]);
  const idx = all.findIndex((p) => same(p, target));
  const why = (p: P) => (Math.abs(p[0]) === Math.abs(y) ? 'has the coordinates switched' : 'has a sign that is wrong');
  return {
    prompt: `Which point has coordinates $${ptx(target)}$?`,
    figure: planeFigure(G5, [], all.map((p, i) => ({ p, label: LET[i] }))),
    parts: [{ answer: fixedChoice(LET.split('').map((c) => `Point $${c}$`), idx) }],
    hints: ['The first number is $x$: move right or left from the origin. The second number is $y$: then move up or down.', `$${ptx(target)}$ means ${fromOrigin(target)}.`],
    solution: [
      `Start at the origin. Move ${fromOrigin(target)}.`,
      ...all.filter((p) => !same(p, target)).map((p) => `Point $${LET[all.indexOf(p)]}$ is at $${ptx(p)}$: it ${why(p)}.`),
      `The answer is point $${LET[idx]}$.`,
    ],
    answerDisplay: `Point $${LET[idx]}$`,
  };
}

function describePoint(rng: Rng): GenOutput {
  const axis = rng.chance(0.3);
  const p: P = axis ? (rng.chance(0.5) ? [rng.nonZero(-8, 8), 0] : [0, rng.nonZero(-8, 8)]) : [rng.nonZero(-8, 8), rng.nonZero(-8, 8)];
  const xs = p[0] ? `${units(p[0])} ${p[0] > 0 ? 'right of' : 'left of'} the $y$-axis` : '';
  const ys = p[1] ? `${units(p[1])} ${p[1] > 0 ? 'above' : 'below'} the $x$-axis` : '';
  const desc = !p[1] ? `on the $x$-axis, ${xs}` : !p[0] ? `on the $y$-axis, ${ys}` : `${xs} and ${ys}`;
  const who = rng.pick(NAMES);
  const ctx = rng.pick([`A point is ${desc}.`, `${who} hides a geocache on a map drawn on a Cartesian plane. The cache is ${desc}.`, `On a hockey rink drawn on a Cartesian plane, the puck is ${desc}.`]);
  return {
    prompt: `${ctx} What are its coordinates?`,
    parts: [part({ kind: 'point', x: p[0], y: p[1] }, { label: 'Coordinates:', placeholder: '(x, y)' })],
    hints: ['Right of the $y$-axis means a positive $x$. Left means a negative $x$.', 'Above the $x$-axis means a positive $y$. Below means a negative $y$. On an axis, the other coordinate is $0$.'],
    solution: [
      p[0] ? `${units(p[0])} ${p[0] > 0 ? 'right' : 'left'}: $x = ${p[0]}$` : 'It is on the $y$-axis: $x = 0$',
      p[1] ? `${units(p[1])} ${p[1] > 0 ? 'up' : 'down'}: $y = ${p[1]}$` : 'It is on the $x$-axis: $y = 0$',
      `The coordinates are $${ptx(p)}$.`,
    ],
    answerDisplay: `$${ptx(p)}$`,
  };
}

function rectangleCorner(rng: Rng): GenOutput {
  const x1 = rng.int(-7, -1);
  const x2 = rng.int(1, 7);
  const y1 = rng.int(-6, -1);
  const y2 = rng.int(1, 6);
  const corners: P[] = rng.chance(0.5) ? [[x1, y2], [x2, y2], [x2, y1], [x1, y1]] : [[x2, y1], [x1, y1], [x1, y2], [x2, y2]];
  const k = rng.int(0, 3);
  const ordered = [...corners.slice(k), ...corners.slice(0, k)];
  const [A, B, C, D] = ordered;
  const sameX = D[0] === A[0] ? 'A' : 'C';
  return {
    prompt: `Rectangle $ABCD$ has three vertices at $A${ptx(A)}$, $B${ptx(B)}$ and $C${ptx(C)}$. What are the coordinates of vertex $D$? (The vertices go around the rectangle in order.)`,
    parts: [part({ kind: 'point', x: D[0], y: D[1] }, { label: '$D$ =', placeholder: '(x, y)' })],
    hints: ['Sketch the three points on a grid. The sides of this rectangle are horizontal and vertical.', '$D$ is across from $B$. It lines up with $A$ in one direction and with $C$ in the other.'],
    solution: [
      `$A$ and $B$ ${A[1] === B[1] ? `have the same $y$-coordinate, $${A[1]}$, so $AB$ is horizontal` : `have the same $x$-coordinate, $${A[0]}$, so $AB$ is vertical`}.`,
      `$D$ is directly ${A[1] === B[1] ? 'above or below' : 'left or right of'} $A$ and lines up with $C$.`,
      `So $D$ has the $x$-coordinate of ${sameX === 'A' ? '$A$' : '$C$'}, $${D[0]}$, and the $y$-coordinate of ${sameX === 'A' ? '$C$' : '$A$'}, $${D[1]}$.`,
      `$D$ is at $${ptx(D)}$.`,
    ],
    answerDisplay: `$${ptx(D)}$`,
  };
}

function distanceAcross(rng: Rng): GenOutput {
  const horizontal = rng.chance(0.5);
  const a = rng.int(-8, -1);
  const b = rng.int(1, 8);
  const c = rng.nonZero(-6, 6);
  const P1: P = horizontal ? [a, c] : [c, a];
  const P2: P = horizontal ? [b, c] : [c, b];
  const scale = rng.pick([5, 10, 20, 50]);
  const unitsApart = b - a;
  const ctx = rng.pick([
    { a: "the tent", b: 'the canoe dock', place: 'a campground', origin: 'the camp office' },
    { a: 'the goal', b: 'the bench', place: 'a soccer field', origin: 'the centre spot' },
    { a: 'the barn', b: 'the well', place: 'a farm', origin: 'the farmhouse' },
    { a: 'the swings', b: 'the slide', place: 'a playground', origin: 'the drinking fountain' },
  ]);
  const [first, second] = rng.chance(0.5) ? [P1, P2] : [P2, P1];
  return {
    prompt: `A map of ${ctx.place} is drawn on a Cartesian plane with ${ctx.origin} at the origin. ${ctx.a.charAt(0).toUpperCase() + ctx.a.slice(1)} is at $${ptx(first)}$ and ${ctx.b} is at $${ptx(second)}$. Each unit on the map is $${scale}$ m. How far apart are they?`,
    parts: [numPart(unitsApart * scale, { suffix: 'm' })],
    hints: [`The two points have the same ${horizontal ? '$y$' : '$x$'}-coordinate, so they are on a ${horizontal ? 'horizontal' : 'vertical'} line.`, `Count the units from $${a}$ to $0$, then from $0$ to $${b}$. Then multiply by $${scale}$ m.`],
    solution: [
      `Both points have ${horizontal ? `$y = ${c}$` : `$x = ${c}$`}, so count along the ${horizontal ? '$x$' : '$y$'}-coordinates: from $${a}$ to $${b}$.`,
      `From $${a}$ to $0$ is $${-a}$ units, and from $0$ to $${b}$ is $${b}$ units: $${-a} + ${b} = ${unitsApart}$ units.`,
      `Each unit is $${scale}$ m: $${unitsApart} \\times ${scale} = ${unitsApart * scale}$`,
      `They are $${unitsApart * scale}$ m apart.`,
    ],
  };
}

function rectanglePerimeter(rng: Rng): GenOutput {
  const x1 = rng.int(-6, -1);
  const x2 = rng.int(1, 6);
  const y1 = rng.int(-5, -1);
  const y2 = rng.int(1, 5);
  const w = x2 - x1;
  const h = y2 - y1;
  const area = rng.chance(0.5);
  const verts: P[] = [[x1, y1], [x2, y1], [x2, y2], [x1, y2]];
  return {
    prompt: `A rectangle has vertices at ${verts.map((v) => `$${ptx(v)}$`).join(', ')}. Each unit is $1$ m. What is its ${area ? 'area' : 'perimeter'}?`,
    parts: [numPart(area ? w * h : 2 * (w + h), { suffix: area ? 'm²' : 'm' })],
    hints: ['Find the length and the width by counting across the axes: from a negative number to a positive number.', area ? 'Area = length × width.' : 'Perimeter = 2 × (length + width).'],
    solution: [
      `Length (across): from $x = ${x1}$ to $x = ${x2}$ is $${-x1} + ${x2} = ${w}$ m.`,
      `Width (up and down): from $y = ${y1}$ to $y = ${y2}$ is $${-y1} + ${y2} = ${h}$ m.`,
      area ? `Area $= ${w} \\times ${h} = ${w * h}$` : `Perimeter $= 2 \\times (${w} + ${h}) = ${2 * (w + h)}$`,
      area ? `The area is $${w * h}\\ \\text{m}^2$.` : `The perimeter is $${2 * (w + h)}$ m.`,
    ],
  };
}

const plotPoints = skill({
  id: 'm7-plot-points',
  name: 'Points on the Cartesian plane',
  description: 'Read and plot points with integer coordinates in all four quadrants, and name the quadrant or axis a point lies on.',
  outcomes: ['SS4'],
  lessonId: 'm7-9-1',
  gen(rng, d) {
    if (d === 1) return rng.chance(0.55) ? readPoint(rng, 1) : whichQuadrant(rng, 1);
    if (d === 2) {
      const mode = rng.pick(['read', 'where', 'which', 'describe'] as const);
      if (mode === 'read') return readPoint(rng, 2);
      if (mode === 'where') return whichQuadrant(rng, 2);
      if (mode === 'which') return whichPoint(rng);
      return describePoint(rng);
    }
    const mode = rng.pick(['corner', 'distance', 'perimeter'] as const);
    if (mode === 'corner') return rectangleCorner(rng);
    if (mode === 'distance') return distanceAcross(rng);
    return rectanglePerimeter(rng);
  },
});

// ---------------------------------------------------------------------------
// Lesson 9.2 — Translations
// ---------------------------------------------------------------------------

const POINT_CTX = [
  (who: string) => `On a game board drawn on a Cartesian plane, ${who}'s game piece is at point $P$.`,
  () => 'A hockey puck sits at point $P$ on a rink drawn on a Cartesian plane.',
  (who: string) => `${who} is designing a video game. A character starts at point $P$.`,
  () => 'A robot vacuum is at point $P$ on a floor plan drawn on a Cartesian plane.',
  () => 'Point $P$ is plotted on the Cartesian plane.',
];

function translateSteps(L: string, p: P, a: number, b: number): string[] {
  return [
    `$${L}$ is at $${ptx(p)}$.`,
    a ? `${a > 0 ? 'Right' : 'Left'} ${units(a)} changes $x$: $${p[0]} ${a > 0 ? '+' : '-'} ${Math.abs(a)} = ${p[0] + a}$` : `There is no move left or right, so $x$ stays $${p[0]}$.`,
    b ? `${b > 0 ? 'Up' : 'Down'} ${units(b)} changes $y$: $${p[1]} ${b > 0 ? '+' : '-'} ${Math.abs(b)} = ${p[1] + b}$` : `There is no move up or down, so $y$ stays $${p[1]}$.`,
    `The image is $${L}'${ptx([p[0] + a, p[1] + b])}$.`,
  ];
}

const TRANSLATE_HINTS = ['In a translation, every point slides the same distance in the same direction.', 'Right adds to $x$ and left subtracts from $x$. Up adds to $y$ and down subtracts from $y$.'];

function translatePoint(rng: Rng, who: string): GenOutput {
  for (;;) {
    const p = randomPoint(rng, G5);
    const a = rng.chance(0.15) ? 0 : rng.nonZero(-5, 5);
    const b = a !== 0 && rng.chance(0.15) ? 0 : rng.nonZero(-5, 5);
    const img: P = [p[0] + a, p[1] + b];
    if (!inside(G5, img) || Math.abs(a) + Math.abs(b) < 2) continue;
    return {
      prompt: `${rng.pick(POINT_CTX)(who)} It moves **${slideText(a, b)}**. What are the coordinates of its image, $P'$?`,
      figure: planeFigure(G5, [], [{ p, label: 'P' }]),
      parts: [part({ kind: 'point', x: img[0], y: img[1] }, { label: "$P'$ =", placeholder: '(x, y)' })],
      hints: ['First read the coordinates of $P$.', TRANSLATE_HINTS[1]],
      solution: translateSteps('P', p, a, b),
      answerDisplay: `$${ptx(img)}$`,
    };
  }
}

function makeShape(rng: Rng): P[] {
  return rng.chance(0.7) ? makeTri(rng, rng.int(2, 3), rng.int(2, 3)) : makeQuad(rng);
}

function translateVertex(rng: Rng, who: string): GenOutput {
  for (;;) {
    const shape = placeIn(rng, G6, makeShape(rng));
    const a = rng.nonZero(-6, 6);
    const b = rng.nonZero(-6, 6);
    const img = shift(shape, a, b);
    if (!img.every((p) => inside(G6, p)) || Math.abs(a) + Math.abs(b) < 3) continue;
    const i = rng.int(0, shape.length - 1);
    const L = LET[i];
    const n = shape.length;
    const ctx = rng.pick([
      `Translate ${SHAPE_WORD(n)} $${shapeName(n)}$ **${slideText(a, b)}**.`,
      `${who} is moving a ${SHAPE_WORD(n)}-shaped garden bed on a plan of the schoolyard. The bed $${shapeName(n)}$ is translated **${slideText(a, b)}**.`,
      `In a game, a ${SHAPE_WORD(n)}-shaped tile $${shapeName(n)}$ slides **${slideText(a, b)}**.`,
    ]);
    return {
      prompt: `${ctx} What are the coordinates of $${L}'$, the image of vertex $${L}$?`,
      figure: planeFigure(G6, [{ pts: shape, color: 'brand', names: LET.slice(0, n).split('') }]),
      parts: [part({ kind: 'point', x: img[i][0], y: img[i][1] }, { label: `$${L}'$ =`, placeholder: '(x, y)' })],
      hints: TRANSLATE_HINTS,
      solution: translateSteps(L, shape[i], a, b),
      answerDisplay: `$${ptx(img[i])}$`,
    };
  }
}

function slidePair(rng: Rng): { shape: P[]; img: P[]; a: number; b: number } {
  for (;;) {
    const shape = placeIn(rng, G6, makeShape(rng));
    const a = rng.nonZero(-6, 6);
    const b = retry(() => rng.nonZero(-6, 6), (v) => Math.abs(v) !== Math.abs(a));
    const img = shift(shape, a, b);
    if (img.every((p) => inside(G6, p)) && Math.abs(a) + Math.abs(b) >= 4) return { shape, img, a, b };
  }
}

function describeTranslation(rng: Rng, numeric: boolean): GenOutput {
  const { shape, img, a, b } = slidePair(rng);
  const n = shape.length;
  const names = LET.slice(0, n).split('');
  const figure = planeFigure(G6, [
    { pts: shape, color: 'brand', names },
    { pts: img, color: 'accent', names: names.map(prime) },
  ]);
  const A = shape[0];
  const A2 = img[0];
  const steps = [
    `Pick one vertex and its image: $A${ptx(A)}$ and $A'${ptx(A2)}$.`,
    `Across: $x$ goes from $${A[0]}$ to $${A2[0]}$, a change of $${a > 0 ? '+' : ''}${a}$, so ${units(a)} ${a > 0 ? 'right' : 'left'}.`,
    `Up or down: $y$ goes from $${A[1]}$ to $${A2[1]}$, a change of $${b > 0 ? '+' : ''}${b}$, so ${units(b)} ${b > 0 ? 'up' : 'down'}.`,
  ];
  if (numeric) {
    return {
      prompt: `${SHAPE_WORD(n).charAt(0).toUpperCase() + SHAPE_WORD(n).slice(1)} $${shapeName(n)}$ is translated to $${shapeName(n, true)}$. Describe the translation with two numbers. For the horizontal move, right is positive and left is negative. For the vertical move, up is positive and down is negative.`,
      figure,
      parts: [numPart(a, { label: 'Horizontal move:', suffix: 'units' }), numPart(b, { label: 'Vertical move:', suffix: 'units' })],
      hints: ['Choose one vertex, such as $A$, and find its image $A\'$.', 'Subtract: new $x$ − old $x$ gives the horizontal move. New $y$ − old $y$ gives the vertical move.'],
      solution: [...steps, `The translation is ${slideText(a, b)}: horizontal $${a}$, vertical $${b}$.`],
    };
  }
  const correct = `${slideText(a, b).replace(/^./, (c) => c.toUpperCase())}`;
  const wrongs = [slideText(b, a), slideText(-a, -b), slideText(a, -b), slideText(-a, b)].map((t) => t.replace(/^./, (c) => c.toUpperCase()));
  const opts = [correct, ...rng.sample(wrongs, 3)];
  const shown = rng.shuffle(opts);
  return {
    prompt: `${SHAPE_WORD(n).charAt(0).toUpperCase() + SHAPE_WORD(n).slice(1)} $${shapeName(n)}$ is translated to its image $${shapeName(n, true)}$. Which describes the translation?`,
    figure,
    parts: [{ answer: fixedChoice(shown, shown.indexOf(correct)) }],
    hints: ['Follow one vertex, such as $A$, to its image $A\'$.', 'Count the move across first, then the move up or down. Make sure you go from the shape to the image, not back.'],
    solution: [...steps, `The translation is ${slideText(a, b)}.`],
    answerDisplay: correct,
  };
}

function translateFromCoords(rng: Rng): GenOutput {
  const tri = placeIn(rng, G6, makeTri(rng, 4, 4));
  const { a, b } = retry(
    () => ({ a: rng.nonZero(-7, 7), b: rng.nonZero(-7, 7) }),
    ({ a, b }) => shift(tri, a, b).every((p) => inGrid({ xMin: -9, xMax: 9, yMin: -9, yMax: 9 }, p)) && Math.abs(a) + Math.abs(b) >= 4,
  );
  const img = shift(tri, a, b);
  const i = rng.int(1, 2);
  const L = LET[i];
  return {
    prompt: `Triangle $ABC$ has vertices $A${ptx(tri[0])}$, $B${ptx(tri[1])}$ and $C${ptx(tri[2])}$. After a translation, the image of $A$ is $A'${ptx(img[0])}$. What are the coordinates of $${L}'$?`,
    parts: [part({ kind: 'point', x: img[i][0], y: img[i][1] }, { label: `$${L}'$ =`, placeholder: '(x, y)' })],
    hints: ['Every vertex moves the same way. Use $A$ and $A\'$ to find the move.', 'Find the change in $x$ and the change in $y$ from $A$ to $A\'$. Then apply the same change to the other vertex.'],
    solution: [
      `From $A${ptx(tri[0])}$ to $A'${ptx(img[0])}$: $x$ changes by $${img[0][0]} - ${br(tri[0][0])} = ${a}$ and $y$ changes by $${img[0][1]} - ${br(tri[0][1])} = ${b}$.`,
      `So the translation is ${slideText(a, b)}.`,
      `$${L}${ptx(tri[i])}$: $x = ${tri[i][0]} ${a > 0 ? '+' : '-'} ${Math.abs(a)} = ${img[i][0]}$ and $y = ${tri[i][1]} ${b > 0 ? '+' : '-'} ${Math.abs(b)} = ${img[i][1]}$`,
      `$${L}'$ is at $${ptx(img[i])}$.`,
    ],
    answerDisplay: `$${ptx(img[i])}$`,
  };
}

function twoTranslations(rng: Rng, who: string): GenOutput {
  const [a1, b1, a2, b2] = retry(
    () => [rng.nonZero(-6, 6), rng.nonZero(-6, 6), rng.nonZero(-6, 6), rng.nonZero(-6, 6)],
    ([p, q, r, s]) => p + r !== 0 && q + s !== 0 && (Math.sign(p) !== Math.sign(r) || Math.sign(q) !== Math.sign(s)),
  );
  const a = a1 + a2;
  const b = b1 + b2;
  const ctx = rng.pick([
    `In a board game, ${who} moves a game piece ${slideText(a1, b1)}. On the next turn, the piece moves ${slideText(a2, b2)}.`,
    `A drone on a Cartesian-plane map flies ${slideText(a1, b1)}, then ${slideText(a2, b2)}.`,
    `${who} translates a shape ${slideText(a1, b1)}, then translates the image ${slideText(a2, b2)}.`,
  ]);
  return {
    prompt: `${ctx} What single translation has the same result? For the horizontal move, right is positive and left is negative. For the vertical move, up is positive and down is negative.`,
    parts: [numPart(a, { label: 'Horizontal move:', suffix: 'units' }), numPart(b, { label: 'Vertical move:', suffix: 'units' })],
    hints: ['Write each move as two integers, such as $-3$ for 3 left.', 'Add the two horizontal moves. Then add the two vertical moves.'],
    solution: [
      `First move: horizontal $${a1}$, vertical $${b1}$. Second move: horizontal $${a2}$, vertical $${b2}$.`,
      `Horizontal: $${a1 < 0 ? `(${a1})` : a1} + ${a2 < 0 ? `(${a2})` : a2} = ${a}$`,
      `Vertical: $${b1 < 0 ? `(${b1})` : b1} + ${b2 < 0 ? `(${b2})` : b2} = ${b}$`,
      a === 0 && b === 0 ? 'The piece ends where it started.' : `The single translation is ${slideText(a, b)}: horizontal $${a}$, vertical $${b}$.`,
    ],
  };
}

function reverseTranslation(rng: Rng): GenOutput {
  const p = randomPoint(rng, { xMin: -8, xMax: 8, yMin: -8, yMax: 8 });
  const a = rng.nonZero(-6, 6);
  const b = rng.nonZero(-6, 6);
  const img: P = [p[0] + a, p[1] + b];
  return {
    prompt: `Point $P$ is translated **${slideText(a, b)}**. Its image is $P'${ptx(img)}$. What were the coordinates of $P$?`,
    parts: [part({ kind: 'point', x: p[0], y: p[1] }, { label: '$P$ =', placeholder: '(x, y)' })],
    hints: ['Work backward: undo the translation.', `To undo ${slideText(a, b)}, move ${slideText(-a, -b)}.`],
    solution: [
      `Undo the translation: move $P'$ ${slideText(-a, -b)}.`,
      `$x = ${img[0]} ${-a > 0 ? '+' : '-'} ${Math.abs(a)} = ${p[0]}$`,
      `$y = ${img[1]} ${-b > 0 ? '+' : '-'} ${Math.abs(b)} = ${p[1]}$`,
      `$P$ was at $${ptx(p)}$. Check: ${slideText(a, b)} from $${ptx(p)}$ gives $${ptx(img)}$.`,
    ],
    answerDisplay: `$${ptx(p)}$`,
  };
}

const translate = skill({
  id: 'm7-translate',
  name: 'Translations',
  description: 'Find the image of a point or shape after a translation, and describe a translation in words or as horizontal and vertical moves.',
  outcomes: ['SS5'],
  lessonId: 'm7-9-2',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    if (d === 1) return rng.chance(0.6) ? translatePoint(rng, who) : translateVertex(rng, who);
    if (d === 2) {
      const mode = rng.pick(['vertex', 'describe', 'numbers'] as const);
      if (mode === 'vertex') return translateVertex(rng, who);
      return describeTranslation(rng, mode === 'numbers');
    }
    const mode = rng.pick(['coords', 'two', 'reverse'] as const);
    if (mode === 'coords') return translateFromCoords(rng);
    if (mode === 'two') return twoTranslations(rng, who);
    return reverseTranslation(rng);
  },
});

// ---------------------------------------------------------------------------
// Lesson 9.3 — Reflections and rotations
// ---------------------------------------------------------------------------

type Move = 'rx' | 'ry' | 'cw' | 'ccw' | 'r180';
const apply = (m: Move, [x, y]: P): P => {
  const r: P = m === 'rx' ? [x, -y] : m === 'ry' ? [-x, y] : m === 'cw' ? [y, -x] : m === 'ccw' ? [-y, x] : [-x, -y];
  return [r[0] + 0, r[1] + 0];
};
const MOVE_TEXT: Record<Move, string> = {
  rx: 'a reflection in the $x$-axis',
  ry: 'a reflection in the $y$-axis',
  cw: 'a rotation of $90^\\circ$ clockwise about the origin',
  ccw: 'a rotation of $90^\\circ$ counterclockwise about the origin',
  r180: 'a rotation of $180^\\circ$ about the origin',
};
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function reflectSteps(L: string, p: P, axis: 'rx' | 'ry'): string[] {
  const img = apply(axis, p);
  return axis === 'rx'
    ? [
        `$${L}${ptx(p)}$ is ${units(p[1])} ${p[1] > 0 ? 'above' : 'below'} the $x$-axis.`,
        `Its image is the same distance on the other side: ${units(p[1])} ${p[1] > 0 ? 'below' : 'above'} the $x$-axis. The $x$-coordinate does not change.`,
        `So $y$ changes sign: $${p[1]} \\to ${img[1]}$.`,
        `The image is $${L}'${ptx(img)}$.`,
      ]
    : [
        `$${L}${ptx(p)}$ is ${units(p[0])} ${p[0] > 0 ? 'right' : 'left'} of the $y$-axis.`,
        `Its image is the same distance on the other side: ${units(p[0])} ${p[0] > 0 ? 'left' : 'right'} of the $y$-axis. The $y$-coordinate does not change.`,
        `So $x$ changes sign: $${p[0]} \\to ${img[0]}$.`,
        `The image is $${L}'${ptx(img)}$.`,
      ];
}

const REFLECT_HINTS = (axis: 'rx' | 'ry') => [
  `The mirror line is the ${axis === 'rx' ? '$x$' : '$y$'}-axis. The image is the same distance from it as the original point, on the other side.`,
  axis === 'rx' ? 'In a reflection in the $x$-axis, $x$ stays the same and $y$ changes sign.' : 'In a reflection in the $y$-axis, $y$ stays the same and $x$ changes sign.',
];

function reflectPoint(rng: Rng, who: string): GenOutput {
  const p = randomPoint(rng, G5);
  const axis = rng.pick(['rx', 'ry'] as const);
  const img = apply(axis, p);
  const ctx = rng.pick([
    'Point $P$ is plotted on the Cartesian plane.',
    `${who} is drawing a symmetric design. One corner is at point $P$.`,
    'A butterfly design is drawn on a Cartesian plane. One wing tip is at point $P$.',
  ]);
  return {
    prompt: `${ctx} Reflect $P$ in the **${axis === 'rx' ? '$x$-axis' : '$y$-axis'}**. What are the coordinates of the image $P'$?`,
    figure: planeFigure(G5, [], [{ p, label: 'P' }]),
    parts: [part({ kind: 'point', x: img[0], y: img[1] }, { label: "$P'$ =", placeholder: '(x, y)' })],
    hints: REFLECT_HINTS(axis),
    solution: reflectSteps('P', p, axis),
    answerDisplay: `$${ptx(img)}$`,
  };
}

/** A shape placed so its image under every listed move stays strictly inside the grid and differs from the shape. */
function shapeFor(rng: Rng, g: GridSpec, moves: Move[], ok: (pts: P[]) => boolean = () => true): P[] {
  return placeIn(rng, g, makeShape(rng), (pts) => moves.every((m) => pts.map((p) => apply(m, p)).every((p) => inside(g, p))) && ok(pts));
}

function reflectVertex(rng: Rng, who: string): GenOutput {
  const axis = rng.pick(['rx', 'ry'] as const);
  // The shape sits on one side of the mirror line, or crosses it.
  const shape = shapeFor(rng, G6, [axis]);
  const n = shape.length;
  const i = rng.int(0, n - 1);
  const L = LET[i];
  const img = apply(axis, shape[i]);
  const ctx = rng.pick([
    `Reflect ${SHAPE_WORD(n)} $${shapeName(n)}$ in the **${axis === 'rx' ? '$x$-axis' : '$y$-axis'}**.`,
    `${who} is making a mirror-image logo. ${cap(SHAPE_WORD(n))} $${shapeName(n)}$ is reflected in the **${axis === 'rx' ? '$x$-axis' : '$y$-axis'}**.`,
  ]);
  return {
    prompt: `${ctx} What are the coordinates of $${L}'$, the image of vertex $${L}$?`,
    figure: planeFigure(G6, [{ pts: shape, color: 'brand', names: LET.slice(0, n).split('') }]),
    parts: [part({ kind: 'point', x: img[0], y: img[1] }, { label: `$${L}'$ =`, placeholder: '(x, y)' })],
    hints: REFLECT_HINTS(axis),
    solution: reflectSteps(L, shape[i], axis),
    answerDisplay: `$${ptx(img)}$`,
  };
}

/** Is `img` (as a set of vertices) the image of `shape` under a translation? */
function isTranslate(shape: P[], img: P[]): boolean {
  const k = key(img);
  return img.some((q) => key(shift(shape, q[0] - shape[0][0], q[1] - shape[0][1])) === k);
}

/** Original and image drawn; name the transformation from a fixed list. */
function identifyMove(rng: Rng, moves: Move[], answer: Move, labels: string[]): GenOutput {
  // The shape sits inside one quadrant, so it never overlaps its image.
  const oneQuadrant = (pts: P[]) => pts.every((p) => p[0] !== 0 && p[1] !== 0 && quadrant(p) === quadrant(pts[0]));
  const shape = retry(
    () => shapeFor(rng, G6, [answer], oneQuadrant),
    (pts) => {
      const img = pts.map((p) => apply(answer, p));
      if (key(img) === key(pts) || isTranslate(pts, img)) return false;
      return moves.filter((m) => m !== answer).every((m) => key(pts.map((p) => apply(m, p))) !== key(img));
    },
    100,
  );
  const n = shape.length;
  const names = LET.slice(0, n).split('');
  const img = shape.map((p) => apply(answer, p));
  const figure = planeFigure(G6, [
    { pts: shape, color: 'brand', names },
    { pts: img, color: 'accent', names: names.map(prime) },
  ]);
  const idx = moves.indexOf(answer);
  const [A, A2] = [shape[0], img[0]];
  const why: Record<Move, string> = {
    rx: '$x$ stays the same and $y$ changes sign: the shape flipped over the $x$-axis.',
    ry: '$y$ stays the same and $x$ changes sign: the shape flipped over the $y$-axis.',
    cw: 'The coordinates switch places and the new $y$ is the opposite of the old $x$: $(x, y) \\to (y, -x)$. That is a quarter turn clockwise.',
    ccw: 'The coordinates switch places and the new $x$ is the opposite of the old $y$: $(x, y) \\to (-y, x)$. That is a quarter turn counterclockwise.',
    r180: 'Both coordinates change sign: $(x, y) \\to (-x, -y)$. That is a half turn.',
  };
  return {
    prompt: `${cap(SHAPE_WORD(n))} $${shapeName(n)}$ is moved to $${shapeName(n, true)}$. Which transformation was used?`,
    figure,
    parts: [{ answer: fixedChoice(labels, idx) }],
    hints: ['Compare one vertex with its image, such as $A$ and $A\'$. What happened to each coordinate?', 'A flip reverses the order of the vertices (clockwise becomes counterclockwise). A turn keeps the order but changes the direction the shape faces.'],
    solution: [
      `$A${ptx(A)}$ goes to $A'${ptx(A2)}$.`,
      ...shape.slice(1).map((p, k) => `$${names[k + 1]}${ptx(p)}$ goes to $${names[k + 1]}'${ptx(img[k + 1])}$.`),
      why[answer],
      `The transformation is ${MOVE_TEXT[answer].replace(/^a /, 'a ')}.`,
    ],
    answerDisplay: labels[idx],
  };
}

function doubleReflection(rng: Rng): GenOutput {
  const p = randomPoint(rng, { xMin: -9, xMax: 9, yMin: -9, yMax: 9 });
  const first = rng.pick(['rx', 'ry'] as const);
  const second = first === 'rx' ? 'ry' : 'rx';
  const mid = apply(first, p);
  const end = apply(second, mid);
  const choices = ['A rotation of $180^\\circ$ about the origin', 'A reflection in the $x$-axis', 'A reflection in the $y$-axis', 'A translation'];
  return {
    prompt: `Point $P${ptx(p)}$ is reflected in the ${first === 'rx' ? '$x$-axis' : '$y$-axis'}. Then its image $P'$ is reflected in the ${second === 'rx' ? '$x$-axis' : '$y$-axis'}. What are the coordinates of the final image $P''$? Which single transformation moves $P$ straight to $P''$?`,
    parts: [
      part({ kind: 'point', x: end[0], y: end[1] }, { label: "$P''$ =", placeholder: '(x, y)' }),
      { label: 'Single transformation:', answer: fixedChoice(choices, 0) },
    ],
    hints: ['Do one reflection at a time. A reflection in the $x$-axis changes the sign of $y$. A reflection in the $y$-axis changes the sign of $x$.', 'Compare $P$ with $P\'\'$. Both coordinates have changed sign.'],
    solution: [
      `Reflect in the ${first === 'rx' ? '$x$' : '$y$'}-axis: $P'${ptx(mid)}$.`,
      `Reflect in the ${second === 'rx' ? '$x$' : '$y$'}-axis: $P''${ptx(end)}$.`,
      `From $${ptx(p)}$ to $${ptx(end)}$, both coordinates changed sign. That is what a rotation of $180^\\circ$ about the origin does.`,
      `$P''$ is at $${ptx(end)}$, and the single transformation is a rotation of $180^\\circ$ about the origin.`,
    ],
  };
}

function reverseReflection(rng: Rng): GenOutput {
  const p = randomPoint(rng, { xMin: -9, xMax: 9, yMin: -9, yMax: 9 });
  const axis = rng.pick(['rx', 'ry'] as const);
  const img = apply(axis, p);
  return {
    prompt: `After a reflection in the ${axis === 'rx' ? '$x$-axis' : '$y$-axis'}, the image of point $A$ is $A'${ptx(img)}$. What were the coordinates of $A$?`,
    parts: [part({ kind: 'point', x: p[0], y: p[1] }, { label: '$A$ =', placeholder: '(x, y)' })],
    hints: ['Reflecting the image back in the same axis gives the original point.', REFLECT_HINTS(axis)[1]],
    solution: [
      `A reflection undoes itself: reflect $A'$ in the ${axis === 'rx' ? '$x$' : '$y$'}-axis to get $A$.`,
      axis === 'rx' ? `Keep $x = ${img[0]}$ and change the sign of $y$: $${img[1]} \\to ${p[1]}$.` : `Keep $y = ${img[1]}$ and change the sign of $x$: $${img[0]} \\to ${p[0]}$.`,
      `$A$ was at $${ptx(p)}$.`,
    ],
    answerDisplay: `$${ptx(p)}$`,
  };
}

function reflectFromCoords(rng: Rng): GenOutput {
  const axis = rng.pick(['rx', 'ry'] as const);
  // A triangle that crosses the mirror line.
  const tri = retry(
    () => placeIn(rng, G6, makeTri(rng, 4, 4)),
    (t) => (axis === 'rx' ? t.some((p) => p[1] > 0) && t.some((p) => p[1] < 0) : t.some((p) => p[0] > 0) && t.some((p) => p[0] < 0)),
  );
  const i = rng.int(0, 2);
  const L = LET[i];
  const img = apply(axis, tri[i]);
  return {
    prompt: `Triangle $ABC$ has vertices $A${ptx(tri[0])}$, $B${ptx(tri[1])}$ and $C${ptx(tri[2])}$. It is reflected in the ${axis === 'rx' ? '$x$-axis' : '$y$-axis'}. What are the coordinates of $${L}'$?`,
    parts: [part({ kind: 'point', x: img[0], y: img[1] }, { label: `$${L}'$ =`, placeholder: '(x, y)' })],
    hints: [REFLECT_HINTS(axis)[1], 'Only one coordinate changes. Check its sign carefully.'],
    solution: [
      ...reflectSteps(L, tri[i], axis).slice(-2),
      quadrant(img) === 'x-axis' || quadrant(img) === 'y-axis' ? `$${L}'$ is on the ${quadrant(img) === 'x-axis' ? '$x$' : '$y$'}-axis.` : `$${L}'$ is in Quadrant ${quadrant(img)}.`,
      `$${L}'$ is at $${ptx(img)}$.`,
    ],
    answerDisplay: `$${ptx(img)}$`,
  };
}

const reflect = skill({
  id: 'm7-reflect',
  name: 'Reflections in the axes',
  description: 'Reflect points and shapes in the x-axis and the y-axis, and recognize a reflection from a picture.',
  outcomes: ['SS5'],
  lessonId: 'm7-9-3',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    if (d === 1) return reflectPoint(rng, who);
    if (d === 2) {
      if (rng.chance(0.6)) return reflectVertex(rng, who);
      const moves: Move[] = ['rx', 'ry', 'r180'];
      return identifyMove(rng, moves, rng.pick(['rx', 'ry'] as const), ['A reflection in the $x$-axis', 'A reflection in the $y$-axis', 'A rotation of $180^\\circ$ about the origin', 'A translation']);
    }
    const mode = rng.pick(['double', 'reverse', 'coords'] as const);
    if (mode === 'double') return doubleReflection(rng);
    if (mode === 'reverse') return reverseReflection(rng);
    return reflectFromCoords(rng);
  },
});

/** Turn each part of the move from the origin by a quarter or half turn. */
const TURN: Record<'cw' | 'ccw' | 'r180', Record<string, string>> = {
  ccw: { right: 'up', up: 'left', left: 'down', down: 'right' },
  cw: { right: 'down', down: 'left', left: 'up', up: 'right' },
  r180: { right: 'left', left: 'right', up: 'down', down: 'up' },
};
function rotateSteps(L: string, p: P, m: 'cw' | 'ccw' | 'r180'): string[] {
  const img = apply(m, p);
  const moves: Array<[number, string]> = [];
  if (p[0]) moves.push([Math.abs(p[0]), p[0] > 0 ? 'right' : 'left']);
  if (p[1]) moves.push([Math.abs(p[1]), p[1] > 0 ? 'up' : 'down']);
  // Write the turned moves across first, then up or down.
  const turned = moves
    .map(([n, w]) => [n, TURN[m][w]] as [number, string])
    .sort((a, b) => Number(a[1] === 'up' || a[1] === 'down') - Number(b[1] === 'up' || b[1] === 'down'))
    .map(([n, w]) => `${units(n)} ${w}`);
  const turnName = m === 'r180' ? 'a half turn' : m === 'cw' ? 'a quarter turn clockwise' : 'a quarter turn counterclockwise';
  return [
    `From the origin, $${L}${ptx(p)}$ is ${moves.map(([n, w]) => `${units(n)} ${w}`).join(' and ')}.`,
    `Turn each move ${turnName}: ${moves.map(([, w]) => `${w} becomes ${TURN[m][w]}`).join(', ')}.`,
    `So $${L}'$ is ${turned.join(' and ')} from the origin.`,
    m === 'r180' ? `Check with the rule $(x, y) \\to (-x, -y)$: both signs change.` : m === 'cw' ? `Check with the rule $(x, y) \\to (y, -x)$.` : `Check with the rule $(x, y) \\to (-y, x)$.`,
    `The image is $${L}'${ptx(img)}$.`,
  ];
}

const ROT_NAME: Record<'cw' | 'ccw' | 'r180', string> = {
  cw: '$90^\\circ$ clockwise',
  ccw: '$90^\\circ$ counterclockwise',
  r180: '$180^\\circ$',
};
const ROT_HINTS = (m: 'cw' | 'ccw' | 'r180') => [
  m === 'r180' ? 'A $180^\\circ$ rotation is a half turn. Trace the point and the axes on paper, then turn the paper halfway around the origin.' : `A $90^\\circ$ rotation is a quarter turn. Picture the path from the origin to the point, and turn the whole path a quarter turn ${m === 'cw' ? 'clockwise (the way clock hands move)' : 'counterclockwise'}.`,
  m === 'r180' ? 'In a half turn, right becomes left and up becomes down, so both coordinates change sign.' : m === 'cw' ? 'Turning clockwise: right becomes down, down becomes left, left becomes up, up becomes right.' : 'Turning counterclockwise: right becomes up, up becomes left, left becomes down, down becomes right.',
];

function rotatePoint(rng: Rng, who: string, m: 'cw' | 'ccw' | 'r180'): GenOutput {
  const p = randomPoint(rng, G5);
  const img = apply(m, p);
  const ctx = rng.pick([
    'Point $P$ is plotted on the Cartesian plane.',
    `${who} spins a game spinner drawn on a Cartesian plane. The tip of the arrow is at point $P$.`,
    'A Ferris wheel is drawn on a Cartesian plane with its centre at the origin. One seat is at point $P$.',
  ]);
  return {
    prompt: `${ctx} Rotate $P$ **${ROT_NAME[m]}** about the origin. What are the coordinates of the image $P'$?`,
    figure: planeFigure(G5, [], [{ p, label: 'P' }]),
    parts: [part({ kind: 'point', x: img[0], y: img[1] }, { label: "$P'$ =", placeholder: '(x, y)' })],
    hints: ROT_HINTS(m),
    solution: rotateSteps('P', p, m),
    answerDisplay: `$${ptx(img)}$`,
  };
}

function rotateQuadrant(rng: Rng): GenOutput {
  const p = randomPoint(rng, { xMin: -9, xMax: 9, yMin: -9, yMax: 9 });
  const m = rng.pick(['cw', 'ccw', 'r180'] as const);
  const img = apply(m, p);
  const q = quadrant(p) as QName;
  const qi = quadrant(img) as QName;
  const choices = LOCATIONS.slice(0, 4);
  return {
    prompt: `Point $P${ptx(p)}$ is in Quadrant ${q}. It is rotated **${ROT_NAME[m]}** about the origin. In which quadrant is its image?`,
    parts: [{ answer: fixedChoice(choices, choices.indexOf(QUAD_LABEL[qi])) }],
    hints: [QUAD_RULE, m === 'r180' ? 'A half turn takes a point to the opposite quadrant, diagonally across the origin.' : `A quarter turn ${m === 'cw' ? 'clockwise' : 'counterclockwise'} moves a point to the next quadrant ${m === 'cw' ? 'clockwise' : 'counterclockwise'}.`],
    solution: [
      QUAD_RULE,
      m === 'r180' ? `A half turn moves Quadrant ${q} to the opposite quadrant.` : `A quarter turn ${m === 'cw' ? 'clockwise' : 'counterclockwise'} moves Quadrant ${q} to the next quadrant in that direction.`,
      `Check: the image is $${ptx(img)}$, with signs ${QUAD_SIGNS[qi]}.`,
      `The image is in Quadrant ${qi}.`,
    ],
    answerDisplay: QUAD_LABEL[qi],
  };
}

function rotateVertex(rng: Rng, who: string): GenOutput {
  const m = rng.pick(['cw', 'ccw', 'r180', 'cw', 'ccw'] as const);
  const shape = shapeFor(rng, G6, [m]);
  const n = shape.length;
  const i = rng.int(0, n - 1);
  const L = LET[i];
  const img = apply(m, shape[i]);
  const ctx = rng.pick([
    `Rotate ${SHAPE_WORD(n)} $${shapeName(n)}$ **${ROT_NAME[m]}** about the origin.`,
    `${who} is designing a pinwheel. ${cap(SHAPE_WORD(n))} $${shapeName(n)}$ is rotated **${ROT_NAME[m]}** about the origin.`,
  ]);
  return {
    prompt: `${ctx} What are the coordinates of $${L}'$, the image of vertex $${L}$?`,
    figure: planeFigure(G6, [{ pts: shape, color: 'brand', names: LET.slice(0, n).split('') }]),
    parts: [part({ kind: 'point', x: img[0], y: img[1] }, { label: `$${L}'$ =`, placeholder: '(x, y)' })],
    hints: ROT_HINTS(m),
    solution: rotateSteps(L, shape[i], m),
    answerDisplay: `$${ptx(img)}$`,
  };
}

function rotate270(rng: Rng): GenOutput {
  const p = randomPoint(rng, { xMin: -9, xMax: 9, yMin: -9, yMax: 9 });
  const ccw270 = rng.chance(0.5);
  const m = ccw270 ? 'cw' : 'ccw';
  const img = apply(m, p);
  return {
    prompt: `Point $A${ptx(p)}$ is rotated $270^\\circ$ ${ccw270 ? 'counterclockwise' : 'clockwise'} about the origin. What are the coordinates of its image $A'$?`,
    parts: [part({ kind: 'point', x: img[0], y: img[1] }, { label: "$A'$ =", placeholder: '(x, y)' })],
    hints: [`Three quarter turns one way end in the same place as one quarter turn the other way.`, `So a $270^\\circ$ ${ccw270 ? 'counterclockwise' : 'clockwise'} turn is the same as a $90^\\circ$ ${ccw270 ? 'clockwise' : 'counterclockwise'} turn.`],
    solution: [
      `$270^\\circ$ ${ccw270 ? 'counterclockwise' : 'clockwise'} is three quarter turns. It ends in the same place as $90^\\circ$ ${ccw270 ? 'clockwise' : 'counterclockwise'}.`,
      ...rotateSteps('A', p, m).slice(0, 4),
      `The image is $A'${ptx(img)}$.`,
    ],
    answerDisplay: `$${ptx(img)}$`,
  };
}

function rotateFromCoords(rng: Rng): GenOutput {
  const m = rng.pick(['cw', 'ccw', 'r180'] as const);
  const tri = placeIn(rng, G6, makeTri(rng, 4, 4), (t) => !(t[0][0] === 0 && t[0][1] === 0));
  const i = rng.int(1, 2);
  const L = LET[i];
  const img = tri.map((p) => apply(m, p));
  return {
    prompt: `Triangle $ABC$ has vertices $A${ptx(tri[0])}$, $B${ptx(tri[1])}$ and $C${ptx(tri[2])}$. It is rotated about the origin, and $A$ moves to $A'${ptx(img[0])}$. The rotation is $90^\\circ$ clockwise, $90^\\circ$ counterclockwise or $180^\\circ$. What are the coordinates of $${L}'$?`,
    parts: [part({ kind: 'point', x: img[i][0], y: img[i][1] }, { label: `$${L}'$ =`, placeholder: '(x, y)' })],
    hints: ['First decide which rotation moves $A$ to $A\'$: compare the coordinates with the rules $(x, y) \\to (y, -x)$, $(-y, x)$ and $(-x, -y)$.', `Then use the same rule on $${L}$.`],
    solution: [
      `Test the rules on $A${ptx(tri[0])}$: $90^\\circ$ clockwise gives $${ptx(apply('cw', tri[0]))}$, $90^\\circ$ counterclockwise gives $${ptx(apply('ccw', tri[0]))}$, $180^\\circ$ gives $${ptx(apply('r180', tri[0]))}$.`,
      `Only the ${ROT_NAME[m]} rotation gives $A'${ptx(img[0])}$.`,
      ...rotateSteps(L, tri[i], m).slice(0, 3),
      `$${L}'$ is at $${ptx(img[i])}$.`,
    ],
    answerDisplay: `$${ptx(img[i])}$`,
  };
}

const rotate = skill({
  id: 'm7-rotate',
  name: 'Rotations about the origin',
  description: 'Rotate points and shapes 90° clockwise, 90° counterclockwise and 180° about the origin, and recognize a rotation from a picture.',
  outcomes: ['SS5'],
  lessonId: 'm7-9-3',
  gen(rng, d) {
    const who = rng.pick(NAMES);
    if (d === 1) return rng.chance(0.6) ? rotatePoint(rng, who, 'r180') : rotateQuadrant(rng);
    if (d === 2) return rng.chance(0.3) ? rotatePoint(rng, who, rng.pick(['cw', 'ccw'] as const)) : rotateVertex(rng, who);
    const mode = rng.pick(['identify', '270', 'coords'] as const);
    if (mode === 'identify') {
      const moves: Move[] = ['cw', 'ccw', 'r180', 'ry'];
      return identifyMove(rng, moves, rng.pick(['cw', 'ccw', 'r180'] as const), ['A rotation of $90^\\circ$ clockwise', 'A rotation of $90^\\circ$ counterclockwise', 'A rotation of $180^\\circ$', 'A reflection in the $y$-axis']);
    }
    if (mode === '270') return rotate270(rng);
    return rotateFromCoords(rng);
  },
});

export const TRANSFORMATIONS_SKILLS: SkillDef[] = [plotPoints, translate, reflect, rotate];
