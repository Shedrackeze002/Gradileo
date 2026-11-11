/** More Mathematics Topics, Unit 21: geometric objects and their notation, and dilations on the Cartesian plane. */
import { fixedChoice, mc, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, SkillDef } from '../../../types.ts';

type Out = GenOutput;

const LETTERS = 'ABCDEFGHJKLMNPQRST'.split('');
const letters = (rng: Rng, n: number) => rng.shuffle([...LETTERS]).slice(0, n);

const line = (a: string, b: string) => `\\overleftrightarrow{${a}${b}}`;
const ray = (a: string, b: string) => `\\overrightarrow{${a}${b}}`;
const seg = (a: string, b: string) => `\\overline{${a}${b}}`;
const ang = (a: string, b: string, c: string) => `\\angle ${a}${b}${c}`;

// ---------------------------------------------------------------------------
// 21.1 Geometric objects and their notation
// ---------------------------------------------------------------------------

function geometricObjects(rng: Rng, d: Difficulty): Out {
  const [A, B, C] = letters(rng, 3) as [string, string, string];
  if (d === 1) {
    const kinds = [
      { text: `A figure passes through points $${A}$ and $${B}$ and goes on forever in both directions.`, name: `Line $${A}${B}$`, why: 'A line has no endpoints: it extends forever in both directions.' },
      { text: `A figure starts at point $${A}$, passes through point $${B}$ and goes on forever in that direction.`, name: `Ray $${A}${B}$`, why: 'A ray has one endpoint and extends forever in one direction.' },
      { text: `A figure is the straight path from point $${A}$ to point $${B}$, and it stops at both points.`, name: `Line segment $${A}${B}$`, why: 'A line segment is the part of a line between two endpoints.' },
      { text: `Two rays, one through $${A}$ and one through $${C}$, both start at point $${B}$.`, name: `Angle $${A}${B}${C}$`, why: 'An angle is formed by two rays, lines or segments that share a vertex.' },
    ];
    if (rng.chance(0.3)) {
      const q = rng.pick([
        { name: 'a line', n: 0, why: 'A line extends forever in both directions, so it has no endpoints.' },
        { name: 'a ray', n: 1, why: 'A ray starts at one endpoint and extends forever in one direction.' },
        { name: 'a line segment', n: 2, why: 'A line segment stops at both ends, so it has two endpoints.' },
      ]);
      return {
        prompt: `How many endpoints does ${q.name} have?`,
        parts: [numPart(q.n)],
        hints: ['An endpoint is a point where the figure stops.', 'Lines, rays and line segments differ in how many directions they go on forever.'],
        solution: [q.why],
      };
    }
    const k = rng.pick(kinds);
    return {
      prompt: `${k.text} What is the figure?`,
      parts: [part(mc(rng, k.name, [`Line $${A}${B}$`, `Ray $${A}${B}$`, `Line segment $${A}${B}$`, `Angle $${A}${B}${C}$`], { max: 4 }))],
      hints: ['Count the endpoints: a line has none, a ray has one and a line segment has two.', 'An angle needs two rays, lines or segments that meet at a vertex.'],
      solution: [k.why, `The figure is ${k.name.charAt(0).toLowerCase()}${k.name.slice(1)}.`],
    };
  }
  if (d === 2) {
    const kind = rng.int(0, 2);
    if (kind === 0) {
      const items = [
        { tex: line(A, B), name: `The line through $${A}$ and $${B}$`, why: 'An arrowhead at both ends shows a line, which goes on forever in both directions.' },
        { tex: ray(A, B), name: `The ray that starts at $${A}$ and passes through $${B}$`, why: 'One arrowhead shows a ray. The first letter is its endpoint.' },
        { tex: seg(A, B), name: `The line segment with endpoints $${A}$ and $${B}$`, why: 'A bar with no arrowheads shows a line segment.' },
      ];
      const it = rng.pick(items);
      return {
        prompt: `What does $${it.tex}$ name?`,
        parts: [part(mc(rng, it.name, [...items.map((x) => x.name), `The ray that starts at $${B}$ and passes through $${A}$`]))],
        hints: ['Look at the mark above the letters: arrowheads show the directions that go on forever.', 'For a ray, the first letter is always the endpoint.'],
        solution: [it.why, `$${it.tex}$ names ${it.name.charAt(0).toLowerCase()}${it.name.slice(1)}.`],
      };
    }
    if (kind === 1) {
      const items = [
        { name: `the line through $${A}$ and $${B}$`, tex: line(A, B) },
        { name: `the ray that starts at $${A}$ and passes through $${B}$`, tex: ray(A, B) },
        { name: `the line segment with endpoints $${A}$ and $${B}$`, tex: seg(A, B) },
      ];
      const it = rng.pick(items);
      return {
        prompt: `Which notation names ${it.name}?`,
        parts: [part(mc(rng, `$${it.tex}$`, [...items.map((x) => `$${x.tex}$`), `$${ang(A, B, C)}$`]))],
        hints: ['A line gets an arrowhead at both ends, a ray gets one arrowhead and a line segment gets a plain bar.', 'The symbol $\\angle$ names an angle, which needs three letters or its vertex.'],
        solution: [`$${it.tex}$ names ${it.name}.`],
      };
    }
    return {
      prompt: `Which point is the vertex of $${ang(A, B, C)}$?`,
      parts: [part(mc(rng, `$${B}$`, [`$${A}$`, `$${C}$`], { keepOrder: false }))],
      hints: ['When an angle is named with three letters, the order of the letters matters.', 'The vertex is always the middle letter.'],
      solution: [`The vertex is the middle letter, so the vertex of $${ang(A, B, C)}$ is $${B}$.`, `The angle can also be written $\\angle ${B}$ when no other angle has its vertex there.`],
    };
  }
  const kind = rng.int(0, 2);
  if (kind === 0) {
    return {
      prompt: `Which is another name for $${ang(A, B, C)}$?`,
      parts: [part(mc(rng, `$${ang(C, B, A)}$`, [`$${ang(B, A, C)}$`, `$${ang(A, C, B)}$`, `$${ang(C, A, B)}$`]))],
      hints: ['The vertex must stay as the middle letter.', 'The two outside letters can swap places.'],
      solution: [`The vertex of $${ang(A, B, C)}$ is $${B}$, so $${B}$ must stay in the middle.`, `$${ang(C, B, A)}$ names the same angle.`],
    };
  }
  if (kind === 1) {
    return {
      prompt: `Point $${C}$ lies on $${ray(A, B)}$, beyond $${B}$. Which names the same ray as $${ray(A, B)}$?`,
      parts: [part(mc(rng, `$${ray(A, C)}$`, [`$${ray(B, A)}$`, `$${ray(C, A)}$`, `$${ray(B, C)}$`]))],
      hints: ['A ray is named by its endpoint first, then any other point on it.', `The endpoint of $${ray(A, B)}$ is $${A}$.`],
      solution: [`$${ray(A, B)}$ starts at $${A}$. A ray is named with its endpoint first and any other point on it second.`, `$${C}$ is on the ray, so $${ray(A, C)}$ is the same ray.`],
    };
  }
  const same = rng.chance(0.5);
  return {
    prompt: same ? `True or false: $${seg(A, B)}$ and $${seg(B, A)}$ name the same line segment.` : `True or false: $${ray(A, B)}$ and $${ray(B, A)}$ name the same ray.`,
    parts: [part(fixedChoice(['True', 'False'], same ? 0 : 1))],
    hints: ['Think about where each figure starts and which way it goes.', 'For a ray, the first letter is the endpoint. A line segment has two endpoints, so either can come first.'],
    solution: same
      ? [`A line segment has two endpoints, $${A}$ and $${B}$, and either can be written first.`, 'The statement is true.']
      : [`$${ray(A, B)}$ starts at $${A}$ and goes through $${B}$, but $${ray(B, A)}$ starts at $${B}$ and goes through $${A}$.`, 'They point in opposite directions, so the statement is false.'],
  };
}

/** Two lines crossing at a labelled point, with the angle given. */
function crossing(A: string, B: string, C: string, D: string, E: string, a: number): Figure {
  const t = (a * Math.PI) / 180;
  const cx = roundTo(4 * Math.cos(t), 2);
  const cy = roundTo(4 * Math.sin(t), 2);
  return {
    type: 'plane',
    grid: { xMin: -6, xMax: 6, yMin: -5, yMax: 5, step: 1 },
    hideTickLabels: true,
    hideAxes: true,
    segments: [
      { from: [-5, 0], to: [5, 0], arrowStart: true, arrowEnd: true },
      { from: [-cx, -cy], to: [cx, cy], arrowStart: true, arrowEnd: true, color: 'accent' },
    ],
    points: [
      { x: 4, y: 0, label: A },
      { x: -4, y: 0, label: B },
      { x: roundTo(cx * 0.8, 2), y: roundTo(cy * 0.8, 2), label: C },
      { x: roundTo(-cx * 0.8, 2), y: roundTo(-cy * 0.8, 2), label: D },
      { x: 0, y: 0, label: E },
    ],
    notToScale: true,
  };
}

function intersections(rng: Rng, d: Difficulty): Out {
  const [A, B, C, D, E] = letters(rng, 5) as [string, string, string, string, string];
  if (d === 1) {
    const kind = rng.int(0, 3);
    if (kind === 0) {
      const perp = rng.chance(0.5);
      const stmt = `${line(A, B)} ${perp ? '\\perp' : '\\parallel'} ${line(C, D)}`;
      const right = perp ? `Line $${A}${B}$ is perpendicular to line $${C}${D}$` : `Line $${A}${B}$ is parallel to line $${C}${D}$`;
      return {
        prompt: `What does $${stmt}$ mean?`,
        parts: [part(mc(rng, right, [`Line $${A}${B}$ is perpendicular to line $${C}${D}$`, `Line $${A}${B}$ is parallel to line $${C}${D}$`, `Line $${A}${B}$ is the same length as line $${C}${D}$`, `Line $${A}${B}$ is the same line as line $${C}${D}$`]))],
        hints: ['The symbol $\\perp$ looks like two lines meeting at a right angle.', 'The symbol $\\parallel$ looks like two lines that never meet.'],
        solution: [perp ? 'The symbol $\\perp$ means "is perpendicular to": the lines meet at a right angle.' : 'The symbol $\\parallel$ means "is parallel to": the lines are always the same distance apart and never meet.', `${right}.`],
      };
    }
    if (kind === 1) {
      const q = rng.pick([
        { ask: 'two lines are parallel', right: 'The same number of arrowheads on each line' },
        { ask: 'two lines are perpendicular', right: 'A small square where the lines meet' },
        { ask: 'two line segments are congruent (the same length)', right: 'The same number of hash marks on each segment' },
        { ask: 'two angles are congruent (the same size)', right: 'The same number of arcs on each angle' },
      ]);
      return {
        prompt: `On a diagram, which marking shows that ${q.ask}?`,
        parts: [part(mc(rng, q.right, ['The same number of arrowheads on each line', 'A small square where the lines meet', 'The same number of hash marks on each segment', 'The same number of arcs on each angle']))],
        hints: ['Hash marks are short strokes across a segment, and arcs are small curves inside an angle.', 'A small square marks a right angle.'],
        solution: [`${q.right} shows that ${q.ask}.`],
      };
    }
    if (kind === 2) {
      return {
        prompt: `$${line(A, B)} \\perp ${line(C, D)}$, and the lines meet at $${E}$. What is the measure of $${ang(A, E, C)}$?`,
        parts: [numPart(90, { suffix: '°' })],
        hints: ['The symbol $\\perp$ means "is perpendicular to".', 'Perpendicular lines meet at right angles.'],
        solution: ['Perpendicular lines meet at right angles.', `$${ang(A, E, C)} = 90^\\circ$`],
      };
    }
    const a = rng.int(25, 155);
    return {
      prompt: `Lines $${A}${B}$ and $${C}${D}$ intersect at $${E}$, and $${ang(A, E, C)} = ${a}^\\circ$. What is the measure of the opposite angle, $${ang(B, E, D)}$?`,
      parts: [numPart(a, { suffix: '°' })],
      figure: crossing(A, B, C, D, E, a),
      hints: ['Opposite angles are across the intersection from each other.', 'Opposite angles are congruent: they have the same measure.'],
      solution: [`$${ang(A, E, C)}$ and $${ang(B, E, D)}$ are opposite angles, so they are congruent.`, `$${ang(B, E, D)} = ${a}^\\circ$`],
    };
  }
  if (d === 2) {
    const a = retry(() => rng.int(25, 155), (n) => n !== 90);
    return {
      prompt: `Lines $${A}${B}$ and $${C}${D}$ intersect at $${E}$, and $${ang(A, E, C)} = ${a}^\\circ$. Find the measures of $${ang(B, E, D)}$ and $${ang(A, E, D)}$.`,
      parts: [numPart(a, { label: `$${ang(B, E, D)}$ =`, suffix: '°' }), numPart(180 - a, { label: `$${ang(A, E, D)}$ =`, suffix: '°' })],
      figure: crossing(A, B, C, D, E, a),
      hints: ['Opposite angles at an intersection are congruent.', 'Adjacent angles at an intersection lie on a straight line, so they are supplementary: they add to $180^\\circ$.'],
      solution: [`$${ang(B, E, D)}$ is opposite $${ang(A, E, C)}$, so $${ang(B, E, D)} = ${a}^\\circ$.`, `$${ang(A, E, D)}$ is adjacent to $${ang(A, E, C)}$, so $${ang(A, E, D)} = 180^\\circ - ${a}^\\circ = ${180 - a}^\\circ$.`],
    };
  }
  const a = retry(() => rng.int(35, 145), (n) => n !== 90);
  if (rng.chance(0.5)) {
    return {
      prompt: `$${line(A, B)} \\parallel ${line(C, D)}$. A transversal crosses $${line(A, B)}$ at $${E}$, where it makes an angle of $${a}^\\circ$. Find the corresponding angle where the transversal crosses $${line(C, D)}$, and the angle adjacent to that one.`,
      parts: [numPart(a, { label: 'Corresponding angle =', suffix: '°' }), numPart(180 - a, { label: 'Adjacent angle =', suffix: '°' })],
      hints: ['Corresponding angles are in the same position at each intersection.', 'When the lines are parallel, corresponding angles are congruent. Adjacent angles on a straight line add to $180^\\circ$.'],
      solution: [`The lines are parallel, so the corresponding angle is also $${a}^\\circ$.`, `The angle adjacent to it is $180^\\circ - ${a}^\\circ = ${180 - a}^\\circ$.`],
    };
  }
  const parallel = rng.chance(0.5);
  const b = parallel ? a : a + rng.pick([-4, -3, -2, 2, 3, 4]);
  return {
    prompt: `A transversal crosses line $${A}${B}$ and line $${C}${D}$. A pair of corresponding angles measure $${a}^\\circ$ and $${b}^\\circ$. Is $${line(A, B)} \\parallel ${line(C, D)}$?`,
    parts: [part(fixedChoice(['Yes, the lines are parallel', 'No, the lines are not parallel'], parallel ? 0 : 1))],
    hints: ['Corresponding angles are in the same position at each intersection.', 'Two lines are parallel exactly when their corresponding angles are congruent.'],
    solution: parallel ? [`The corresponding angles are both $${a}^\\circ$, so they are congruent.`, `So $${line(A, B)} \\parallel ${line(C, D)}$.`] : [`The corresponding angles are $${a}^\\circ$ and $${b}^\\circ$, which are not equal.`, 'So the lines are not parallel.'],
  };
}

// ---------------------------------------------------------------------------
// 21.2 Dilations on the Cartesian plane
// ---------------------------------------------------------------------------

type Pt = [number, number];
const P = (p: Pt) => `(${fmt(p[0])}, ${fmt(p[1])})`;
const kTex = (k: number) => (k === 0.5 ? '\\frac{1}{2}' : k === 0.25 ? '\\frac{1}{4}' : k === 1.5 ? '\\frac{3}{2}' : fmt(k));
const pointPart = (p: Pt, label: string) => part({ kind: 'point', x: p[0], y: p[1] }, { label, placeholder: '(x, y)' });

function evenPoint(rng: Rng, mult: number): Pt {
  return retry(() => [rng.int(-4, 4) * mult, rng.int(-4, 4) * mult] as Pt, (p) => p[0] !== 0 && p[1] !== 0);
}

function dilatePoint(rng: Rng, d: Difficulty): Out {
  const name = rng.pick(['A', 'B', 'P', 'Q', 'T']);
  if (d === 1) {
    const k = rng.pick([2, 3, 4]);
    const p: Pt = retry(() => [rng.int(-4, 4), rng.int(-4, 4)] as Pt, (q) => q[0] !== 0 || q[1] !== 0);
    const img: Pt = [k * p[0], k * p[1]];
    return {
      prompt: `Point $${name}${P(p)}$ is dilated with centre $(0, 0)$ and scale factor $${k}$. Find the coordinates of the image $${name}'$.`,
      parts: [pointPart(img, `$${name}'$ =`)],
      hints: ['With the centre at the origin, a dilation multiplies both coordinates by the scale factor.', `$(x, y) \\rightarrow (${k}x, ${k}y)$`],
      solution: [`$(x, y) \\rightarrow (${k}x, ${k}y)$`, `$${name}' = (${k} \\times ${p[0] < 0 ? `(${p[0]})` : p[0]},\\ ${k} \\times ${p[1] < 0 ? `(${p[1]})` : p[1]}) = ${P(img)}$`],
    };
  }
  if (d === 2) {
    const k = rng.pick([0.5, 0.25, 1.5]);
    const mult = k === 0.25 ? 4 : 2;
    const [p, q] = [evenPoint(rng, mult), evenPoint(rng, mult)];
    const f = (a: Pt): Pt => [k * a[0], k * a[1]];
    return {
      prompt: `Line segment $AB$ has endpoints $A${P(p)}$ and $B${P(q)}$. It is dilated with centre $(0, 0)$ and scale factor $${kTex(k)}$. Find the coordinates of $A'$ and $B'$.`,
      parts: [pointPart(f(p), "$A'$ ="), pointPart(f(q), "$B'$ =")],
      hints: ['Multiply both coordinates of each point by the scale factor.', k < 1 ? 'A scale factor between $0$ and $1$ is a reduction, so the image is closer to the centre.' : 'A scale factor greater than $1$ is an enlargement, so the image is further from the centre.'],
      solution: [`$(x, y) \\rightarrow (${kTex(k)}x, ${kTex(k)}y)$`, `$A' = ${P(f(p))}$`, `$B' = ${P(f(q))}$`],
    };
  }
  // A centre that is not the origin.
  const k = rng.pick([2, 3]);
  const c: Pt = retry(() => [rng.int(-3, 3), rng.int(-3, 3)] as Pt, (q) => q[0] !== 0 || q[1] !== 0);
  const off: Pt = retry(() => [rng.int(-3, 3), rng.int(-3, 3)] as Pt, (q) => q[0] !== 0 && q[1] !== 0);
  const p: Pt = [c[0] + off[0], c[1] + off[1]];
  const img: Pt = [c[0] + k * off[0], c[1] + k * off[1]];
  const move = (n: number, pos: string, neg: string) => `$${Math.abs(n)}$ ${n > 0 ? pos : neg}`;
  return {
    prompt: `Point $${name}${P(p)}$ is dilated with centre $C${P(c)}$ and scale factor $${k}$. Find the coordinates of the image $${name}'$.`,
    parts: [pointPart(img, `$${name}'$ =`)],
    hints: [`Count how far $${name}$ is from the centre $C$, across and up or down.`, `Multiply both distances by $${k}$, then count from $C$ again.`],
    solution: [
      `From $C$ to $${name}$: ${move(off[0], 'right', 'left')} and ${move(off[1], 'up', 'down')}.`,
      `Multiply by $${k}$: ${move(k * off[0], 'right', 'left')} and ${move(k * off[1], 'up', 'down')}.`,
      `$${name}' = (${c[0]} ${off[0] > 0 ? '+' : '-'} ${Math.abs(k * off[0])},\\ ${c[1]} ${off[1] > 0 ? '+' : '-'} ${Math.abs(k * off[1])}) = ${P(img)}$`,
    ],
  };
}

function dilationScale(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const k = rng.pick([2, 3, 4, 5, 0.5]);
    const p = evenPoint(rng, 2);
    const img: Pt = [k * p[0], k * p[1]];
    return {
      prompt: `A dilation with centre $(0, 0)$ maps $P${P(p)}$ to $P'${P(img)}$. Find the scale factor.`,
      parts: [numPart(k, { label: 'Scale factor =' })],
      hints: ['Divide a coordinate of the image by the matching coordinate of the original point.', 'Both coordinates give the same scale factor.'],
      solution: [`$\\dfrac{${fmt(img[0])}}{${p[0]}} = ${fmt(k)}$ and $\\dfrac{${fmt(img[1])}}{${p[1]}} = ${fmt(k)}$`, `The scale factor is $${fmt(k)}$${k < 1 ? ', a reduction' : ', an enlargement'}.`],
    };
  }
  const shape = rng.pick(['triangle', 'rectangle', 'parallelogram']);
  if (d === 2) {
    const k = rng.pick([2, 3, 1.5, 0.5]);
    const side = rng.int(2, 9) * 2;
    const perim = side * rng.int(3, 5) + 2 * rng.int(1, 4);
    return {
      prompt: `A ${shape} has one side $${side}$ units long and a perimeter of $${perim}$ units. It is dilated with scale factor $${kTex(k)}$. Find the length of the matching side of the image, and the perimeter of the image.`,
      parts: [numPart(k * side, { label: 'Side =', suffix: 'units' }), numPart(k * perim, { label: 'Perimeter =', suffix: 'units' })],
      hints: ['A dilation multiplies every length by the scale factor.', 'The perimeter is a length too, so it is multiplied by the same scale factor.'],
      solution: [`Side: $${kTex(k)} \\times ${side} = ${fmt(k * side)}$ units`, `Perimeter: $${kTex(k)} \\times ${perim} = ${fmt(k * perim)}$ units`],
    };
  }
  if (rng.chance(0.5)) {
    const k = rng.pick([2, 3, 4, 0.5]);
    const area = rng.int(3, 12) * 4;
    return {
      prompt: `A ${shape} has an area of $${area}$ square units. It is dilated with scale factor $${kTex(k)}$. Find the area of the image.`,
      parts: [numPart(k * k * area, { suffix: 'square units' })],
      hints: ['A dilation multiplies every length by the scale factor.', 'Area comes from multiplying two lengths, so it is multiplied by the scale factor twice: by $k^2$.'],
      solution: [`Lengths are multiplied by $${kTex(k)}$, so the area is multiplied by $\\left(${kTex(k)}\\right)^2 = ${fmt(k * k)}$.`, `Area of the image $= ${fmt(k * k)} \\times ${area} = ${fmt(k * k * area)}$ square units`],
    };
  }
  const k = rng.pick([2, 3, 4, 0.5]);
  const p = evenPoint(rng, 2);
  const img: Pt = [k * p[0], k * p[1]];
  return {
    prompt: `After a dilation with centre $(0, 0)$ and scale factor $${kTex(k)}$, the image of point $P$ is $P'${P(img)}$. Find the coordinates of $P$.`,
    parts: [pointPart(p, '$P$ =')],
    hints: ['The dilation multiplied both coordinates of $P$ by the scale factor.', 'Work backwards: divide both coordinates of the image by the scale factor.'],
    solution: [`$P' = (${kTex(k)}x, ${kTex(k)}y) = ${P(img)}$`, `$P = (${fmt(img[0])} \\div ${kTex(k)},\\ ${fmt(img[1])} \\div ${kTex(k)}) = ${P(p)}$`],
  };
}

export const OBJECT_SKILLS: SkillDef[] = [
  skill({ id: 'mx-geometric-objects', name: 'Lines, rays, segments and angles', description: 'Tell lines, rays, line segments and angles apart, and name them with symbols', outcomes: ['GN1'], lessonId: 'mx-21-1', gen: geometricObjects }),
  skill({ id: 'mx-angles-at-intersections', name: 'Parallel, perpendicular and angles at intersections', description: 'Read the symbols for parallel and perpendicular lines, and find opposite, adjacent and corresponding angles', outcomes: ['GN1'], lessonId: 'mx-21-1', gen: intersections }),
  skill({ id: 'mx-dilate-point', name: 'Dilating points', description: 'Find the image of a point or a segment after a dilation on the Cartesian plane', outcomes: ['GN2'], lessonId: 'mx-21-2', gen: dilatePoint }),
  skill({ id: 'mx-dilation-scale-factor', name: 'Scale factor of a dilation', description: 'Find the scale factor of a dilation, and use it for lengths, perimeters, areas and original points', outcomes: ['GN2'], lessonId: 'mx-21-2', gen: dilationScale }),
];
