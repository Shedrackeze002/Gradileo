/** Math 5 Unit 9 — Coordinate Grids (CG1). First quadrant only: whole-number coordinates from 0 up. */
import { fixedChoice, mc, mcFigures, part, retry, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Difficulty, Part, PlaneFigure, PlanePoint, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type Out = GenOutput;
type P = [number, number];

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Harpreet', 'Noor', 'Thanh', 'Kateri', 'Diego', 'Ngozi', 'Leah', 'Ravi',
];

const LETTERS = 'ABCDEFGH';
const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);
/** A point in maths: $(3,\ 5)$. */
const pt = (p: P) => `(${p[0]},\\ ${p[1]})`;
const P$ = (p: P) => `$${pt(p)}$`;
/** "3 units right", "1 unit down" */
const move = (n: number, dir: string) => `$${n}$ ${plural(n, 'unit', 'units')} ${dir}`;
const sameP = (a: P, b: P) => a[0] === b[0] && a[1] === b[1];
const far = (a: P, b: P, d = 1.5) => Math.hypot(a[0] - b[0], a[1] - b[1]) >= d;
const pointPart = (p: P, label?: string): Part => part({ kind: 'point', x: p[0], y: p[1] }, { ...(label ? { label } : {}), placeholder: '(x, y)' });
const choiceLetter = (ans: AnswerSpec) => (ans.kind === 'mc' ? LETTERS[ans.choices.findIndex((c) => c.id === ans.correct)] : 'A');

const READ_HINTS = [
  'Start at $(0,\\ 0)$, where the two axes meet. The first number tells how far **across** (the distance from the vertical axis). The second number tells how far **up** (the distance from the horizontal axis).',
  'Count the grid lines across to the point, then count the grid lines up to it. Write them as (across, up).',
];

/** A coordinate grid (first quadrant) with labelled points and filled polygons. */
function gridFig(max: number, points: PlanePoint[], polys: P[][] = [], caption = 'A coordinate grid'): PlaneFigure {
  const fig: PlaneFigure = { type: 'plane', grid: { xMin: 0, xMax: max, yMin: 0, yMax: max, step: 1 }, caption };
  if (polys.length) fig.polylines = polys.map((p) => ({ points: [...p, p[0]], fill: true }));
  if (points.length) fig.points = points;
  return fig;
}

const lab = (p: P, label: string, color: PlanePoint['color'] = 'brand'): PlanePoint => ({ x: p[0], y: p[1], label, color });

function randPt(rng: Rng, lo: number, hi: number): P {
  return [rng.int(lo, hi), rng.int(lo, hi)];
}

/** n points in [lo, hi]² that are spread out (at least `gap` apart). */
function spreadPts(rng: Rng, n: number, lo: number, hi: number, gap = 2): P[] {
  for (let t = 0; t < 200; t++) {
    const pts: P[] = [];
    for (let k = 0; k < 60 && pts.length < n; k++) {
      const p = randPt(rng, lo, hi);
      if (pts.every((q) => far(p, q, gap))) pts.push(p);
    }
    if (pts.length === n) return pts;
  }
  throw new Error('spreadPts');
}

/** Steps for reading the coordinates of point p, named `name`. */
function readSteps(p: P, name: string): string[] {
  return [
    `Start at $(0,\\ 0)$. Point $${name}$ is $${p[0]}$ ${plural(p[0], 'unit', 'units')} across from the vertical axis, so the first coordinate is $${p[0]}$.`,
    `Point $${name}$ is $${p[1]}$ ${plural(p[1], 'unit', 'units')} up from the horizontal axis, so the second coordinate is $${p[1]}$.`,
  ];
}

/** How to describe the move from a to b: "4 units right and 2 units down". */
function moveText(a: P, b: P): string {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const h = dx ? move(Math.abs(dx), dx > 0 ? 'right' : 'left') : '';
  const v = dy ? move(Math.abs(dy), dy > 0 ? 'up' : 'down') : '';
  return h && v ? `${h} and ${v}` : h || v;
}

// ---------------------------------------------------------------------------
// 9.1 Points on a coordinate grid
// ---------------------------------------------------------------------------

function readPoint(rng: Rng, d: Difficulty): Out {
  const n = d === 1 ? rng.int(2, 3) : 4;
  const pts = d === 1 ? spreadPts(rng, n, 1, 9) : spreadPts(rng, n, 0, 9);
  // At difficulty 2, one point sits on an axis, or has its coordinates the other way round to another.
  if (d > 1 && rng.chance(0.5)) {
    const q = pts[0];
    const flip: P = [q[1], q[0]];
    if (q[0] !== q[1] && pts.slice(2).every((r) => far(flip, r))) pts[1] = flip;
  }
  const idx = rng.int(0, n - 1);
  const target = pts[idx];
  const name = LETTERS[idx];
  const who = rng.pick(NAMES);
  const ctx = rng.pick([
    `${who} plotted some points on a coordinate grid.`,
    `${who} marked some spots on a grid map of the schoolyard.`,
    `The grid shows where some friends are standing in a gym.`,
    `${who} is playing a board game on a coordinate grid. The letters show where the game pieces are.`,
  ]);
  return {
    prompt: `${ctx} What are the coordinates of point $${name}$?`,
    figure: gridFig(10, pts.map((p, i) => lab(p, LETTERS[i]))),
    parts: [pointPart(target, `$${name}$ =`)],
    hints: READ_HINTS,
    solution: [...readSteps(target, name), `Point $${name}$ is at ${P$(target)}.`],
  };
}

/** Which labelled point is at (x, y)? */
function findPoint(rng: Rng): Out {
  for (let t = 0; t < 100; t++) {
    const target = randPt(rng, 1, 8);
    if (target[0] === target[1]) continue;
    const cands: P[] = [
      [target[1], target[0]],
      [target[0] + rng.pick([-1, 1]), target[1]],
      [target[0], target[1] + rng.pick([-1, 1])],
      [target[0] + rng.pick([-2, 2]), target[1] + rng.pick([-2, 2])],
    ];
    const others: P[] = [];
    for (const c of [cands[0], ...rng.shuffle(cands.slice(1))]) {
      if (c[0] < 0 || c[1] < 0 || c[0] > 9 || c[1] > 9) continue;
      if ([target, ...others].some((q) => sameP(q, c))) continue;
      others.push(c);
      if (others.length === 3) break;
    }
    if (others.length < 3) continue;
    const pts = rng.shuffle([target, ...others]);
    const idx = pts.findIndex((p) => sameP(p, target));
    const name = LETTERS[idx];
    const swapped = pts.findIndex((p) => sameP(p, [target[1], target[0]]));
    return {
      prompt: `Which point is at ${P$(target)}?`,
      figure: gridFig(10, pts.map((p, i) => lab(p, LETTERS[i]))),
      parts: [{ answer: fixedChoice(pts.map((_, i) => `Point $${LETTERS[i]}$`), idx) }],
      hints: READ_HINTS,
      solution: [
        `Start at $(0,\\ 0)$. Move $${target[0]}$ across, then $${target[1]}$ up.`,
        `You land on point $${name}$.`,
        ...(swapped >= 0 ? [`Point $${LETTERS[swapped]}$ is at ${P$(pts[swapped])}: it has the numbers the other way round, so it is a different point.`] : []),
        `Point $${name}$ is at ${P$(target)}.`,
      ],
      answerDisplay: `Point $${name}$`,
    };
  }
  throw new Error('findPoint');
}

/** Two points that differ in both directions by different amounts. */
function twoPoints(rng: Rng, lo = 1, hi = 9): [P, P] {
  return retry(
    () => [randPt(rng, lo, hi), randPt(rng, lo, hi)] as [P, P],
    ([a, b]) => a[0] !== b[0] && a[1] !== b[1] && Math.abs(a[0] - b[0]) !== Math.abs(a[1] - b[1]),
    200,
  );
}

/** Which describes the move from A to B? */
function describeMove(rng: Rng): Out {
  const [a, b] = twoPoints(rng);
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const H = (n: number, s: number) => move(n, s > 0 ? 'right' : 'left');
  const V = (n: number, s: number) => move(n, s > 0 ? 'up' : 'down');
  const ax = Math.abs(dx);
  const ay = Math.abs(dy);
  const correct = `${H(ax, dx)} and ${V(ay, dy)}`;
  const answer = mc(rng, correct, [`${H(ay, dx)} and ${V(ax, dy)}`, `${H(ax, -dx)} and ${V(ay, dy)}`, `${H(ax, dx)} and ${V(ay, -dy)}`, `${H(ax, -dx)} and ${V(ay, -dy)}`]);
  const who = rng.pick(NAMES);
  const [na, nb] = rng.pick([['A', 'B'], ['P', 'Q'], ['S', 'T']]);
  const ctx = rng.pick([
    `On a grid map, ${who}'s house is at point $${na}$ and the library is at point $${nb}$.`,
    `In a board game, ${who}'s game piece moves from point $${na}$ to point $${nb}$.`,
    `A robot on a classroom floor grid rolls from point $${na}$ to point $${nb}$.`,
  ]);
  return {
    prompt: `${ctx} Which describes how to move from $${na}$ to $${nb}$ along the grid lines?`,
    figure: gridFig(10, [lab(a, na), lab(b, nb, 'accent')]),
    parts: [{ answer }],
    hints: [
      `Compare the first coordinates to see how far left or right to go. Then compare the second coordinates to see how far up or down.`,
      `$${na}$ is at ${P$(a)} and $${nb}$ is at ${P$(b)}.`,
    ],
    solution: [
      `$${na}$ is at ${P$(a)} and $${nb}$ is at ${P$(b)}.`,
      `Across: from $${a[0]}$ to $${b[0]}$ is $${ax}$ ${plural(ax, 'unit', 'units')} ${dx > 0 ? 'right' : 'left'} (the first number ${dx > 0 ? 'gets bigger' : 'gets smaller'}).`,
      `Up or down: from $${a[1]}$ to $${b[1]}$ is $${ay}$ ${plural(ay, 'unit', 'units')} ${dy > 0 ? 'up' : 'down'} (the second number ${dy > 0 ? 'gets bigger' : 'gets smaller'}).`,
      `Move ${correct}.`,
    ],
  };
}

/** Start at a point, move, and give the coordinates where you land. */
function landPoint(rng: Rng): Out {
  const [a, b] = twoPoints(rng, 0, 9);
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const who = rng.pick(NAMES);
  const ctx = rng.pick([
    `${who}'s game piece is at ${P$(a)}. It moves ${moveText(a, b)}. Where does the game piece land?`,
    `A rover robot starts at ${P$(a)} on a floor grid. It rolls ${moveText(a, b)}. Where does the robot stop?`,
    `On a grid map, ${who} starts at the bike rack at ${P$(a)} and walks ${moveText(a, b)}. Where does ${who} end up?`,
  ]);
  return {
    prompt: `${ctx} Give the coordinates.`,
    figure: gridFig(10, [lab(a, 'Start')]),
    parts: [pointPart(b)],
    hints: ['Moving right or left changes the **first** number. Moving up or down changes the **second** number.', 'Right means add to the first number, left means subtract. Up means add to the second number, down means subtract.'],
    solution: [
      `Start at ${P$(a)}.`,
      dx > 0 ? `Moving $${dx}$ right adds to the first number: $${a[0]} + ${dx} = ${b[0]}$.` : `Moving $${-dx}$ left subtracts from the first number: $${a[0]} - ${-dx} = ${b[0]}$.`,
      dy > 0 ? `Moving $${dy}$ up adds to the second number: $${a[1]} + ${dy} = ${b[1]}$.` : `Moving $${-dy}$ down subtracts from the second number: $${a[1]} - ${-dy} = ${b[1]}$.`,
      `It ends at ${P$(b)}.`,
    ],
  };
}

/** Which labelled point is a given move away from point P? */
function whichFromMove(rng: Rng): Out {
  for (let t = 0; t < 100; t++) {
    const [s, target] = twoPoints(rng, 1, 9);
    const dx = target[0] - s[0];
    const dy = target[1] - s[1];
    const cands: P[] = [
      [s[0] - dx, s[1] + dy],
      [s[0] + dx, s[1] - dy],
      [s[0] + dy, s[1] + dx],
      [s[0] - dx, s[1] - dy],
    ];
    const others: P[] = [];
    for (const c of cands) {
      if (c[0] < 0 || c[1] < 0 || c[0] > 9 || c[1] > 9) continue;
      if ([s, target, ...others].some((q) => sameP(q, c))) continue;
      others.push(c);
      if (others.length === 3) break;
    }
    if (others.length < 2) continue;
    const pts = rng.shuffle([target, ...others]);
    const idx = pts.findIndex((p) => sameP(p, target));
    const who = rng.pick(NAMES);
    return {
      prompt: `${who} hid a treasure. Start at point $S$ and move ${moveText(s, target)}. Which point shows where the treasure is?`,
      figure: gridFig(10, [lab(s, 'S', 'accent'), ...pts.map((p, i) => lab(p, LETTERS[i]))]),
      parts: [{ answer: fixedChoice(pts.map((_, i) => `Point $${LETTERS[i]}$`), idx) }],
      hints: ['First find the coordinates of $S$.', 'Right or left changes the first number. Up or down changes the second number.'],
      solution: [
        `$S$ is at ${P$(s)}.`,
        `Moving ${moveText(s, target)} takes you to $(${s[0]} ${dx > 0 ? '+' : '-'} ${Math.abs(dx)},\\ ${s[1]} ${dy > 0 ? '+' : '-'} ${Math.abs(dy)}) = ${pt(target)}$.`,
        `Point $${LETTERS[idx]}$ is at ${P$(target)}.`,
      ],
      answerDisplay: `Point $${LETTERS[idx]}$`,
    };
  }
  throw new Error('whichFromMove');
}

const MAPS = [
  { place: 'a campground', start: 'the tent', mid: 'the washroom', end: 'the dock' },
  { place: 'a zoo', start: 'the front gate', mid: 'the bison', end: 'the snack bar' },
  { place: 'the schoolyard', start: 'the front door', mid: 'the swings', end: 'the soccer goal' },
  { place: 'a city park', start: 'the parking lot', mid: 'the pond', end: 'the picnic tables' },
  { place: 'a farm', start: 'the barn', mid: 'the chicken coop', end: 'the garden' },
  { place: 'a ski hill', start: 'the lodge', mid: 'the chairlift', end: 'the warming hut' },
];

/** Two moves in a row (a plan with a middle point). */
function twoMoves(rng: Rng): Out {
  for (let t = 0; t < 200; t++) {
    const a = randPt(rng, 0, 9);
    const m: P = rng.chance(0.5) ? [rng.int(0, 9), a[1]] : [a[0], rng.int(0, 9)];
    if (sameP(a, m)) continue;
    const b: P = m[0] === a[0] ? [rng.int(0, 9), m[1]] : [m[0], rng.int(0, 9)];
    if (sameP(b, m) || Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]) < 3) continue;
    const mp = rng.pick(MAPS);
    const who = rng.pick(NAMES);
    return {
      prompt: `On a grid map of ${mp.place}, ${mp.start} is at ${P$(a)}. ${who} walks ${moveText(a, m)} to ${mp.mid}. Then ${who} walks ${moveText(m, b)} to ${mp.end}. What are the coordinates of ${mp.end}?`,
      parts: [pointPart(b)],
      hints: [`First find the coordinates of ${mp.mid}. Then make the second move from there.`, 'Right or left changes the first number. Up or down changes the second number.'],
      solution: [
        `Start at ${P$(a)}.`,
        `Walking ${moveText(a, m)} gives ${mp.mid} at ${P$(m)}.`,
        `Walking ${moveText(m, b)} from ${P$(m)} gives ${P$(b)}.`,
        `${mp.end.charAt(0).toUpperCase() + mp.end.slice(1)} is at ${P$(b)}.`,
      ],
    };
  }
  throw new Error('twoMoves');
}

/** Point C is directly below/above A and directly left/right of B. */
function cornerPoint(rng: Rng): Out {
  const [a, b] = twoPoints(rng, 1, 9);
  const c: P = [a[0], b[1]];
  const vert = c[1] < a[1] ? 'below' : 'above';
  const hor = c[0] > b[0] ? 'right' : 'left';
  const who = rng.pick(NAMES);
  return {
    prompt: `${who} wants to put a flag at point $C$. Point $C$ is directly ${vert} point $A$, and directly to the ${hor} of point $B$. What are the coordinates of point $C$?`,
    figure: gridFig(10, [lab(a, 'A'), lab(b, 'B')]),
    parts: [pointPart(c, '$C$ =')],
    hints: [
      `Points that are directly ${vert === 'below' ? 'below' : 'above'} each other are on the same vertical line, so they have the same **first** coordinate.`,
      'Points that are directly left or right of each other are on the same horizontal line, so they have the same **second** coordinate.',
    ],
    solution: [
      `$A$ is at ${P$(a)} and $B$ is at ${P$(b)}.`,
      `$C$ is directly ${vert} $A$, so it is the same distance across as $A$: its first coordinate is $${a[0]}$.`,
      `$C$ is directly to the ${hor} of $B$, so it is the same distance up as $B$: its second coordinate is $${b[1]}$.`,
      `Point $C$ is at ${P$(c)}.`,
    ],
  };
}

const gridPoints = skill({
  id: 'm5-grid-points',
  name: 'Points on a coordinate grid',
  description: 'Locate and describe points on a coordinate grid with ordered pairs, and describe one point from another with left, right, up and down.',
  outcomes: ['CG1'],
  lessonId: 'm5-9-1',
  gen(rng, d: Difficulty) {
    if (d === 1) return rng.chance(0.55) ? readPoint(rng, 1) : findPoint(rng);
    if (d === 2) {
      const r = rng.next();
      if (r < 0.25) return readPoint(rng, 2);
      if (r < 0.5) return describeMove(rng);
      if (r < 0.75) return landPoint(rng);
      return whichFromMove(rng);
    }
    return rng.chance(0.55) ? twoMoves(rng) : cornerPoint(rng);
  },
});

// ---------------------------------------------------------------------------
// 9.2 Polygons on a coordinate grid
// ---------------------------------------------------------------------------

type Kind = 'triangle' | 'right triangle' | 'rectangle' | 'square' | 'parallelogram' | 'trapezoid' | 'kite' | 'pentagon';

/** A polygon of the given kind with vertices in [lo, hi]², listed counterclockwise from the bottom left. */
function makePoly(rng: Rng, kind: Kind, lo: number, hi: number): P[] {
  for (let t = 0; t < 500; t++) {
    const x = rng.int(lo, hi - 2);
    const y = rng.int(lo, hi - 2);
    const w = rng.int(2, Math.min(6, hi - x));
    const h = rng.int(2, Math.min(5, hi - y));
    let pts: P[];
    switch (kind) {
      case 'rectangle':
        if (w === h) continue;
        pts = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
        break;
      case 'square':
        pts = [[x, y], [x + w, y], [x + w, y + w], [x, y + w]];
        break;
      case 'right triangle':
        pts = rng.chance(0.5) ? [[x, y], [x + w, y], [x, y + h]] : [[x, y], [x + w, y], [x + w, y + h]];
        break;
      case 'triangle': {
        const tx = rng.int(x, x + w);
        if (tx === x || tx === x + w) continue;
        pts = [[x, y], [x + w, y], [tx, y + h]];
        break;
      }
      case 'parallelogram': {
        const s = rng.int(1, 2);
        if (x + w + s > hi || w < 3) continue;
        pts = [[x, y], [x + w, y], [x + w + s, y + h], [x + s, y + h]];
        break;
      }
      case 'trapezoid': {
        const a = rng.int(1, 2);
        const b = rng.int(0, 2);
        if (w - a - b < 1) continue;
        pts = [[x, y], [x + w, y], [x + w - b, y + h], [x + a, y + h]];
        break;
      }
      case 'kite': {
        if (w % 2 || h < 3) continue;
        const m = rng.int(1, h - 1);
        if (m * 2 === h) continue;
        pts = [[x + w / 2, y], [x + w, y + m], [x + w / 2, y + h], [x, y + m]];
        break;
      }
      case 'pentagon': {
        if (w % 2 || h < 3) continue;
        const m = rng.int(1, h - 1);
        pts = [[x, y], [x + w, y], [x + w, y + m], [x + w / 2, y + h], [x, y + m]];
        break;
      }
    }
    if (pts.every(([px, py]) => px >= lo && py >= lo && px <= hi && py <= hi)) return pts;
  }
  throw new Error(`makePoly ${kind}`);
}

const KIND_NAME: Record<Kind, string> = {
  triangle: 'triangle',
  'right triangle': 'triangle',
  rectangle: 'rectangle',
  square: 'square',
  parallelogram: 'parallelogram',
  trapezoid: 'trapezoid',
  kite: 'kite',
  pentagon: 'pentagon',
};

const POLY_CONTEXTS = [
  (who: string, k: string) => `${who} drew this ${k} on a coordinate grid.`,
  (who: string, k: string) => `On ${who}'s grid map of the town, a park is shaped like this ${k}.`,
  (who: string, k: string) => `${who} is planning a garden shaped like this ${k} on a grid.`,
  (who: string, k: string) => `${who} made this ${k} with an elastic band on a geoboard.`,
];

/** Write the coordinates of each vertex of a polygon drawn on the grid. */
function readVertices(rng: Rng, d: Difficulty): Out {
  const kind: Kind = d === 1 ? rng.pick(['right triangle', 'triangle', 'rectangle'] as Kind[]) : rng.pick(['parallelogram', 'trapezoid', 'kite', 'square', 'rectangle', 'pentagon'] as Kind[]);
  const lo = d === 1 ? 1 : 0;
  const pts = makePoly(rng, kind, lo, 9);
  const start = rng.int(0, pts.length - 1);
  const ordered = pts.map((_, i) => pts[(i + start) % pts.length]);
  const names = LETTERS.slice(0, ordered.length).split('');
  const who = rng.pick(NAMES);
  const k = KIND_NAME[kind];
  return {
    prompt: `${rng.pick(POLY_CONTEXTS)(who, k)} Write the coordinates of each vertex.`,
    figure: gridFig(10, ordered.map((p, i) => lab(p, names[i])), [ordered], `A ${k} with vertices ${names.join(', ')}`),
    parts: ordered.map((p, i) => pointPart(p, `$${names[i]}$ =`)),
    hints: ['A **vertex** is a corner of the polygon. Read each corner like a point.', READ_HINTS[0]],
    solution: [
      'For each vertex, count across from the vertical axis first, then up from the horizontal axis.',
      ...ordered.map((p, i) => `$${names[i]}$ is $${p[0]}$ across and $${p[1]}$ up: $${names[i]}${pt(p)}$.`),
      `The vertices are ${ordered.map((p, i) => `$${names[i]}${pt(p)}$`).join(', ')}.`,
    ],
  };
}

/** True when no two sides of the polygon cross (and no side has zero length). */
function isSimple(ps: P[]): boolean {
  const n = ps.length;
  const cross = (o: P, a: P, b: P) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const hit = (a: P, b: P, c: P, d: P) => {
    const d1 = cross(c, d, a);
    const d2 = cross(c, d, b);
    const d3 = cross(a, b, c);
    const d4 = cross(a, b, d);
    return ((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0));
  };
  for (let i = 0; i < n; i++) {
    if (sameP(ps[i], ps[(i + 1) % n])) return false;
    for (let j = i + 2; j < n; j++) {
      if (i === 0 && j === n - 1) continue;
      if (hit(ps[i], ps[(i + 1) % n], ps[j], ps[(j + 1) % n])) return false;
    }
  }
  // No three vertices in a row on one line.
  return ps.every((p, i) => cross(ps[(i + n - 1) % n], p, ps[(i + 1) % n]) !== 0);
}

/** Which picture shows the polygon with these vertices? */
function whichPolygon(rng: Rng): Out {
  const MAX = 7;
  for (let t = 0; t < 200; t++) {
    const kind = rng.pick(['right triangle', 'triangle', 'rectangle', 'parallelogram', 'trapezoid', 'kite'] as Kind[]);
    const pts = makePoly(rng, kind, 0, MAX - 1);
    const key = (ps: P[]) => ps.map((p) => p.join(',')).sort().join(' ');
    const inside = (ps: P[]) => ps.every(([x, y]) => x >= 0 && y >= 0 && x <= MAX - 1 && y <= MAX - 1);
    // Distractors: every vertex with its coordinates swapped; one vertex swapped; the shape shifted.
    const swapAll = pts.map(([x, y]) => [y, x] as P);
    const j = pts.findIndex(([x, y]) => x !== y);
    let swapOne = pts.map((p, i) => (i === j ? ([p[1], p[0]] as P) : p));
    if (!isSimple(swapOne)) {
      const k = rng.int(0, pts.length - 1);
      const nudge = rng.pick([[1, 0], [-1, 0], [0, 1], [0, -1]] as P[]);
      swapOne = pts.map((p, i) => (i === k ? ([p[0] + nudge[0], p[1] + nudge[1]] as P) : p));
    }
    const sh = rng.pick([[1, 0], [-1, 0], [0, 1], [0, -1]] as P[]);
    const shift = pts.map(([x, y]) => [x + sh[0], y + sh[1]] as P);
    const opts = [pts, swapAll, swapOne, shift].filter((o) => inside(o) && isSimple(o));
    const keys = opts.map(key);
    if (opts.length < 4 || new Set(keys).size < 4 || j < 0 || opts[0] !== pts) continue;
    const order = rng.shuffle(opts.map((o, i) => ({ o, correct: i === 0 })));
    const answer = mcFigures(rng, order.map(({ o, correct }) => ({ md: '', figure: gridFig(MAX, [], [o], 'A polygon on a grid'), correct })), true);
    const letter = choiceLetter(answer);
    const list = pts.map((p) => P$(p)).join(', ');
    return {
      prompt: `${rng.pick(NAMES)} plotted the points ${list} and joined them in order to make a polygon. Which picture shows the polygon?`,
      parts: [{ answer }],
      hints: ['Plot one vertex at a time: across first, then up.', `Check every vertex. One wrong corner means it is the wrong picture.`],
      solution: [
        `Plot each point: ${pts.map((p) => `${P$(p)} is $${p[0]}$ across and $${p[1]}$ up`).join('; ')}.`,
        'The other pictures have a vertex in the wrong place: a corner with its numbers the other way round, a corner moved by one square, or the whole shape moved over.',
        `Picture ${letter} has a vertex at every point and no others, so picture ${letter} shows the polygon.`,
      ],
      answerDisplay: `Picture ${letter}`,
    };
  }
  throw new Error('whichPolygon');
}

/** Three vertices of a rectangle or square are given: find the fourth. */
function fourthVertex(rng: Rng): Out {
  const kind: Kind = rng.chance(0.7) ? 'rectangle' : 'square';
  const pts = makePoly(rng, kind, 0, 9);
  const miss = rng.int(0, 3);
  const given = pts.filter((_, i) => i !== miss);
  const ans = pts[miss];
  const who = rng.pick(NAMES);
  const ctx = rng.pick([
    `${who} is drawing a ${kind} on a coordinate grid.`,
    `${who} is marking out a ${kind}-shaped garden on a grid map.`,
    `A ${kind}-shaped skating rink is drawn on a grid map.`,
  ]);
  const xs = [...new Set(given.map((p) => p[0]))].sort((a, b) => a - b);
  const ys = [...new Set(given.map((p) => p[1]))].sort((a, b) => a - b);
  return {
    prompt: `${ctx} Three of its vertices are at ${given.map((p) => P$(p)).join(', ')}. What are the coordinates of the fourth vertex?`,
    figure: gridFig(10, given.map((p) => ({ x: p[0], y: p[1], color: 'brand' as const }))),
    parts: [pointPart(ans, 'Fourth vertex =')],
    hints: [
      `The sides of this ${kind} are along grid lines. Each vertex shares its first number with one vertex and its second number with another.`,
      'Plot the three vertices. Which corner is missing?',
    ],
    solution: [
      `The vertices use only the first numbers $${xs.join('$ and $')}$ and the second numbers $${ys.join('$ and $')}$.`,
      `The corner that is missing is the one that is directly ${ans[1] === ys[0] ? 'below' : 'above'} ${P$([ans[0], ans[1] === ys[0] ? ys[1] : ys[0]])} and directly ${ans[0] === xs[0] ? 'left' : 'right'} of ${P$([ans[0] === xs[0] ? xs[1] : xs[0], ans[1]])}.`,
      `The fourth vertex is ${P$(ans)}.`,
    ],
  };
}

/** Build a rectangle from one vertex, its width and its height. */
function buildRectangle(rng: Rng): Out {
  const x = rng.int(0, 5);
  const y = rng.int(0, 5);
  const w = rng.int(2, 9 - x);
  const h = rng.chance(0.25) && y + w <= 9 ? w : retry(() => rng.int(2, 9 - y), (v) => v !== w);
  const name = w === h ? 'square' : 'rectangle';
  const who = rng.pick(NAMES);
  const ctx = rng.pick([`${who} is drawing a ${name} on a coordinate grid.`, `${who} is planning a ${name}-shaped vegetable garden on a grid map.`, `A ${name}-shaped poster is drawn on a grid.`]);
  const A: P = [x, y];
  const B: P = [x + w, y];
  const C: P = [x + w, y + h];
  const D: P = [x, y + h];
  return {
    prompt: `${ctx} Its bottom-left vertex is $A${pt(A)}$. The ${name} is $${w}$ units wide and $${h}$ units tall. Going around the ${name}, vertex $B$ is the bottom-right vertex, $C$ is the top-right vertex and $D$ is the top-left vertex. What are the coordinates of $B$, $C$ and $D$?`,
    figure: gridFig(10, [lab(A, 'A')]),
    parts: [pointPart(B, '$B$ ='), pointPart(C, '$C$ ='), pointPart(D, '$D$ =')],
    hints: ['Wide means across: moving right adds to the first number. Tall means up: moving up adds to the second number.', `Start at $A${pt(A)}$. Move $${w}$ right to get $B$, then $${h}$ up to get $C$.`],
    solution: [
      `$B$ is $${w}$ units right of $A$: $(${x} + ${w},\\ ${y}) = ${pt(B)}$.`,
      `$C$ is $${h}$ units up from $B$: $(${x + w},\\ ${y} + ${h}) = ${pt(C)}$.`,
      `$D$ is $${h}$ units up from $A$: $(${x},\\ ${y} + ${h}) = ${pt(D)}$.`,
      `$B${pt(B)}$, $C${pt(C)}$ and $D${pt(D)}$.`,
    ],
  };
}

const gridPolygons = skill({
  id: 'm5-grid-polygons',
  name: 'Polygons on a coordinate grid',
  description: 'Describe the vertices of a polygon on a coordinate grid with coordinates, and model a polygon on the grid from the coordinates of its vertices.',
  outcomes: ['CG1'],
  lessonId: 'm5-9-2',
  gen(rng, d: Difficulty) {
    if (d === 1) return readVertices(rng, 1);
    if (d === 2) return rng.chance(0.5) ? readVertices(rng, 2) : whichPolygon(rng);
    const r = rng.next();
    if (r < 0.45) return fourthVertex(rng);
    if (r < 0.8) return buildRectangle(rng);
    return whichPolygon(rng);
  },
});

export const GRIDS_SKILLS: SkillDef[] = [gridPoints, gridPolygons];
