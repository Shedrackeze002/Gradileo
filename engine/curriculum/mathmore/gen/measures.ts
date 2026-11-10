/** More Mathematics Topics, Unit 10: bearings, loci, arcs and sectors, and Pythagoras and trigonometry in three dimensions. */
import { mc, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, roundTo, sinD, cosD, tanD } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, SkillDef } from '../../../types.ts';
import { NAMES } from './common.ts';

type Out = GenOutput;
const DEGS = Math.PI / 180;
const atanD = (x: number) => Math.atan(x) / DEGS;
/** A bearing as three figures: 045°, 270°. */
const three = (b: number) => `${String(Math.round(b)).padStart(3, '0')}^\\circ`;
const norm360 = (b: number) => ((b % 360) + 360) % 360;
const oneDp = (v: number) => (Math.abs(roundTo(v, 1) - v) < 1e-9 ? fmt(v) : fmtFixed(v, 1));

// ---------------------------------------------------------------------------
// 10.1 Bearings
// ---------------------------------------------------------------------------

/** Two places and the north line at each, with B on the bearing θ from A. */
function bearingFigure(theta: number, from = 'A', to = 'B'): Figure {
  const r = 4;
  const bx = roundTo(r * sinD(theta), 3);
  const by = roundTo(r * cosD(theta), 3);
  const xs = [0, bx];
  const ys = [0, by];
  const xMin = Math.min(...xs) - 1.5;
  const xMax = Math.max(...xs) + 1.5;
  const yMin = Math.min(...ys) - 1;
  const yMax = Math.max(...ys) + 2;
  return {
    type: 'plane',
    grid: { xMin, xMax, yMin, yMax, xStep: xMax - xMin, yStep: yMax - yMin },
    hideTickLabels: true,
    hideAxes: true,
    notToScale: true,
    segments: [
      { from: [0, 0], to: [0, 1.6], color: 'muted', arrowEnd: true },
      { from: [bx, by], to: [bx, by + 1.6], color: 'muted', arrowEnd: true },
      { from: [0, 0], to: [bx, by], color: 'brand' },
    ],
    points: [
      { x: 0, y: 0, label: from },
      { x: bx, y: by, label: to },
      { x: 0, y: 1.6, label: 'N', color: 'muted' },
      { x: bx, y: by + 1.6, label: 'N', color: 'muted' },
    ],
  };
}

const COMPASS: Array<[string, number]> = [
  ['north', 0], ['north-east', 45], ['east', 90], ['south-east', 135], ['south', 180], ['south-west', 225], ['west', 270], ['north-west', 315],
];

const BEARING_HINT = 'A bearing is an angle measured clockwise from north, written with three figures (so $45^\\circ$ is $045^\\circ$).';

function bearingRead(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const [dir, b] = rng.pick(COMPASS.filter(([, v]) => v !== 0));
    return {
      prompt: `A ship sails from port $P$ towards the ${dir}. On what bearing does it sail? Give the bearing as an angle in degrees.`,
      parts: [numPart(b, { suffix: '°' })],
      hints: [BEARING_HINT, 'East is a quarter turn clockwise from north ($90^\\circ$), south a half turn, west three quarters. North-east is halfway between north and east.'],
      solution: [`Turning clockwise from north to ${dir} is $${b}^\\circ$.`, `The bearing is $${three(b)}$.`],
    };
  }
  if (d === 2) {
    const theta = retry(() => rng.int(10, 350), (t) => t % 90 !== 0);
    const back = norm360(theta + 180);
    return {
      prompt: `The bearing of $B$ from $A$ is $${three(theta)}$. Find the bearing of $A$ from $B$.`,
      figure: bearingFigure(theta),
      parts: [numPart(back, { suffix: '°' })],
      hints: ['Draw a north line at $B$. The direction from $B$ back to $A$ is exactly opposite the direction from $A$ to $B$.', 'Opposite directions differ by $180^\\circ$: add $180^\\circ$ if the bearing is less than $180^\\circ$, and subtract it otherwise.'],
      solution: [
        theta < 180 ? `$${three(theta)}$ is less than $180^\\circ$, so add $180^\\circ$: $${theta} + 180 = ${back}$.` : `$${three(theta)}$ is more than $180^\\circ$, so subtract $180^\\circ$: $${theta} - 180 = ${back}$.`,
        `The bearing of $A$ from $B$ is $${three(back)}$.`,
      ],
    };
  }
  // "35° east of south" and the like.
  const a = rng.int(10, 80);
  const forms: Array<[string, number]> = [
    [`${a}^\\circ$ east of north`, a],
    [`${a}^\\circ$ east of south`, 180 - a],
    [`${a}^\\circ$ west of south`, 180 + a],
    [`${a}^\\circ$ west of north`, 360 - a],
  ];
  const [text, b] = rng.pick(forms.slice(1));
  const back = norm360(b + 180);
  return {
    prompt: `From a lighthouse $L$, a boat $S$ is in the direction $${text}. Find the bearing of $S$ from $L$, and the bearing of $L$ from $S$.`,
    figure: bearingFigure(b, 'L', 'S'),
    parts: [numPart(b, { suffix: '°', label: 'Bearing of $S$ from $L$:' }), numPart(back, { suffix: '°', label: 'Bearing of $L$ from $S$:' })],
    hints: [BEARING_HINT, 'Start at north and turn clockwise: south is $180^\\circ$. Then add or subtract the angle away from north or south.'],
    solution: [
      `$${text} is $${b}^\\circ$ clockwise from north, so the bearing of $S$ from $L$ is $${three(b)}$.`,
      `The way back is $180^\\circ$ different: $${b} ${b < 180 ? '+' : '-'} 180 = ${back}$, so the bearing of $L$ from $S$ is $${three(back)}$.`,
    ],
  };
}

function bearingTrig(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const theta = rng.int(15, 75);
    const dist = rng.int(5, 40);
    const east = rng.chance(0.5);
    const v = east ? dist * sinD(theta) : dist * cosD(theta);
    return {
      prompt: `A ship sails $${dist}$ km from a harbour on a bearing of $${three(theta)}$. How far ${east ? 'east' : 'north'} of the harbour is it now? Give your answer to 1 decimal place.`,
      figure: bearingFigure(theta, 'H', 'S'),
      parts: [numPart(v, { decimals: 1, suffix: 'km' })],
      hints: ['Draw a right-angled triangle: the path is the hypotenuse, with one side along the north line.', `The angle at the harbour between north and the path is $${theta}^\\circ$. The distance north is next to it, and the distance east is opposite it.`],
      solution: [
        east ? `Distance east $= ${dist} \\sin ${theta}^\\circ$ (opposite the angle)` : `Distance north $= ${dist} \\cos ${theta}^\\circ$ (next to the angle)`,
        `$= ${fmt(v, 4)}\\ldots \\approx ${oneDp(v)}$ km`,
      ],
      calculator: true,
    };
  }
  if (d === 2) {
    const ex = rng.int(2, 15) * (rng.chance(0.5) ? -1 : 1);
    const no = rng.int(2, 15) * (rng.chance(0.5) ? -1 : 1);
    const dist = Math.hypot(ex, no);
    const bearing = norm360(Math.atan2(ex, no) / DEGS);
    const name = rng.pick(NAMES);
    const base = atanD(Math.abs(ex) / Math.abs(no));
    const how =
      no > 0 && ex > 0 ? `The bearing is that angle: $${fmt(bearing, 1)}^\\circ$.`
      : no < 0 && ex > 0 ? `The path is $${fmt(base, 1)}^\\circ$ east of south, so the bearing is $180 - ${fmt(base, 1)} = ${fmt(bearing, 1)}^\\circ$.`
      : no < 0 ? `The path is $${fmt(base, 1)}^\\circ$ west of south, so the bearing is $180 + ${fmt(base, 1)} = ${fmt(bearing, 1)}^\\circ$.`
      : `The path is $${fmt(base, 1)}^\\circ$ west of north, so the bearing is $360 - ${fmt(base, 1)} = ${fmt(bearing, 1)}^\\circ$.`;
    return {
      prompt: `${name} walks $${Math.abs(no)}$ km due ${no > 0 ? 'north' : 'south'} and then $${Math.abs(ex)}$ km due ${ex > 0 ? 'east' : 'west'}. How far is ${name} from the start, and on what bearing from the start? Give both to 1 decimal place.`,
      parts: [numPart(dist, { decimals: 1, suffix: 'km', label: 'Distance:' }), numPart(bearing, { decimals: 1, suffix: '°', label: 'Bearing:' })],
      hints: ['The two walks are at right angles, so the straight-line distance is the hypotenuse: use Pythagoras’ theorem.', `Use $\\tan$ to find the angle at the start between the ${no > 0 ? 'north' : 'south'} line and the straight path, then turn it into a bearing measured clockwise from north.`],
      solution: [
        `Distance $= \\sqrt{${Math.abs(no)}^2 + ${Math.abs(ex)}^2} = \\sqrt{${no * no + ex * ex}} \\approx ${fmtFixed(dist, 1)}$ km`,
        `$\\tan \\theta = \\dfrac{${Math.abs(ex)}}{${Math.abs(no)}}$, so $\\theta = ${fmt(base, 2)}^\\circ$, the angle between the ${no > 0 ? 'north' : 'south'} line and the path.`,
        how,
        `To 1 decimal place the bearing is $${fmtFixed(bearing, 1)}^\\circ$.`,
      ],
      calculator: true,
    };
  }
  // Two legs at right angles: a on bearing θ, then b on bearing θ + 90.
  const theta = rng.int(10, 80);
  const a = rng.int(5, 30);
  const b = rng.int(5, 30);
  const dist = Math.hypot(a, b);
  const turn = atanD(b / a);
  const bearing = norm360(theta + turn);
  return {
    prompt: `A boat sails $${a}$ km on a bearing of $${three(theta)}$, then turns and sails $${b}$ km on a bearing of $${three(theta + 90)}$. Find its distance from the start, and its bearing from the start, each to 1 decimal place.`,
    parts: [numPart(dist, { decimals: 1, suffix: 'km', label: 'Distance:' }), numPart(bearing, { decimals: 1, suffix: '°', label: 'Bearing:' })],
    hints: ['The two bearings differ by $90^\\circ$, so the two legs meet at a right angle.', 'Find the angle at the start between the first leg and the straight path with $\\tan$, and add it to the first bearing.'],
    solution: [
      `The legs are at right angles, so the distance is $\\sqrt{${a}^2 + ${b}^2} = \\sqrt{${a * a + b * b}} \\approx ${fmtFixed(dist, 1)}$ km.`,
      `The angle at the start between the first leg and the straight path: $\\tan \\theta = \\dfrac{${b}}{${a}}$, so $\\theta = ${fmt(turn, 2)}^\\circ$.`,
      `The second leg turns clockwise, so the bearing is $${theta} + ${fmt(turn, 2)} = ${fmt(bearing, 2)}^\\circ$, about $${fmtFixed(bearing, 1)}^\\circ$.`,
    ],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 10.2 Loci
// ---------------------------------------------------------------------------

interface Locus {
  rule: (n: number) => string;
  answer: (n: number) => string;
  construct: string;
  level: 1 | 2;
}

const LOCI: Locus[] = [
  { rule: (n) => `the points exactly $${n}$ cm from a point $P$`, answer: (n) => `A circle with centre $P$ and radius $${n}$ cm`, construct: 'Set compasses to the distance and draw a circle centred at $P$', level: 1 },
  { rule: () => 'the points the same distance from $A$ as from $B$', answer: () => 'The perpendicular bisector of $AB$', construct: 'Construct the perpendicular bisector of $AB$', level: 1 },
  { rule: () => 'the points the same distance from the line $AB$ as from the line $AC$', answer: () => 'The bisector of the angle $BAC$', construct: 'Construct the bisector of the angle $BAC$', level: 1 },
  { rule: (n) => `the points exactly $${n}$ cm from a line segment $PQ$`, answer: (n) => `Two lines parallel to $PQ$, $${n}$ cm either side of it, joined by semicircles of radius $${n}$ cm at $P$ and $Q$`, construct: 'Draw parallel lines at the distance, and semicircles centred at $P$ and $Q$', level: 2 },
  { rule: (n) => `the points less than $${n}$ m from a tree $T$`, answer: (n) => `The region inside a circle with centre $T$ and radius $${n}$ m`, construct: 'Draw a circle centred at $T$ and shade inside it', level: 2 },
  { rule: (n) => `the points more than $${n}$ m from a post $P$`, answer: (n) => `The region outside a circle with centre $P$ and radius $${n}$ m`, construct: 'Draw a circle centred at $P$ and shade outside it', level: 2 },
  { rule: () => 'the points closer to $A$ than to $B$', answer: () => 'The region on the same side of the perpendicular bisector of $AB$ as $A$', construct: 'Construct the perpendicular bisector of $AB$ and shade the side with $A$', level: 2 },
];

function locusDescribe(rng: Rng, d: Difficulty): Out {
  const n = rng.int(2, 9);
  const pool = d === 1 ? LOCI.filter((l) => l.level === 1) : d === 2 ? LOCI.filter((l) => l.level === 2) : LOCI;
  const target = rng.pick(pool);
  const others = rng.shuffle(LOCI.filter((l) => l !== target));
  if (d === 3) {
    return {
      prompt: `Which construction would you use to draw the locus of ${target.rule(n)}?`,
      parts: [{ answer: mc(rng, target.construct, others.map((o) => o.construct)) }],
      hints: ['A locus is the set of all the points that obey a rule. First describe the shape of the locus, then choose how to draw it.', 'Equal distances from two points give a perpendicular bisector; equal distances from two lines give an angle bisector; a fixed distance from a point gives a circle.'],
      solution: [`The locus of ${target.rule(n)} is: ${target.answer(n).charAt(0).toLowerCase()}${target.answer(n).slice(1)}.`, `So: ${target.construct.charAt(0).toLowerCase()}${target.construct.slice(1)}.`],
    };
  }
  return {
    prompt: `Describe the locus of ${target.rule(n)}.`,
    parts: [{ answer: mc(rng, target.answer(n), others.map((o) => o.answer(n))) }],
    hints: ['A locus is the set of all the points that obey a rule. Imagine marking several points that obey it, and see what shape they make.', '“Less than” or “more than” a distance gives a region (shaded), not just a line.'],
    solution: [`Every point that obeys the rule lies on (or in) this shape, and no other point does.`, `The locus is: ${target.answer(n).charAt(0).toLowerCase()}${target.answer(n).slice(1)}.`],
  };
}

function locusRegion(rng: Rng, d: Difficulty): Out {
  const r = rng.int(2, 12);
  if (d === 1) {
    const area = Math.PI * r * r;
    return {
      prompt: `A goat is tied to a post in the middle of a large field by a rope $${r}$ m long. The goat can reach every point up to $${r}$ m from the post. Find the area of grass the goat can reach, to 1 decimal place.`,
      parts: [numPart(area, { decimals: 1, suffix: 'm²' })],
      hints: ['The locus of points up to $r$ m from a point is a circle and its inside.', 'Area of a circle $= \\pi r^2$.'],
      solution: [`The goat can reach a circle of radius $${r}$ m.`, `Area $= \\pi \\times ${r}^2 = ${fmt(area, 4)}\\ldots \\approx ${fmtFixed(area, 1)}$ m²`],
      calculator: true,
    };
  }
  if (d === 2) {
    const inside = rng.chance(0.5);
    const frac = inside ? 0.25 : 0.75;
    const side = r + rng.int(2, 8);
    const area = frac * Math.PI * r * r;
    return {
      prompt: inside
        ? `A goat is tied to a corner post of a square field with sides of $${side}$ m, by a rope $${r}$ m long. It cannot leave the field. Find the area it can reach, to 1 decimal place.`
        : `A goat is tied to the outside corner of a square shed with sides of $${side}$ m, by a rope $${r}$ m long. It cannot go into the shed. Find the area it can reach, to 1 decimal place.`,
      parts: [numPart(area, { decimals: 1, suffix: 'm²' })],
      hints: ['Without the walls, the goat could reach a whole circle around the post.', inside ? 'The two fences at the corner meet at $90^\\circ$, and the goat stays inside that right angle: a quarter of the circle.' : 'The shed takes up a $90^\\circ$ corner of the circle, so the goat can reach the other three quarters (the rope is shorter than the walls).'],
      solution: [
        `The goat reaches ${inside ? 'a quarter' : 'three quarters'} of a circle of radius $${r}$ m.`,
        `Area $= ${inside ? '\\frac{1}{4}' : '\\frac{3}{4}'} \\times \\pi \\times ${r}^2 = ${fmt(area, 4)}\\ldots \\approx ${fmtFixed(area, 1)}$ m²`,
      ],
      calculator: true,
    };
  }
  const L = rng.int(10, 40);
  const area = 2 * r * L + Math.PI * r * r;
  return {
    prompt: `A straight wall is $${L}$ m long. A motion sensor sounds an alarm for anyone less than $${r}$ m from any point of the wall, on either side. Find the area of ground the sensor covers, to 1 decimal place.`,
    parts: [numPart(area, { decimals: 1, suffix: 'm²' })],
    hints: [`The locus of points within $${r}$ m of a line segment is a rectangle along it with a semicircle at each end.`, 'The two semicircles together make one circle.'],
    solution: [
      `Rectangle: $${L} \\times ${2 * r} = ${2 * r * L}$ m² (the region reaches $${r}$ m either side of the wall).`,
      `The two semicircles make a circle of radius $${r}$ m: $\\pi \\times ${r}^2 = ${fmt(Math.PI * r * r, 2)}$ m².`,
      `Total $= ${2 * r * L} + ${fmt(Math.PI * r * r, 2)} \\approx ${fmtFixed(area, 1)}$ m²`,
    ],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 10.3 Arcs and sectors
// ---------------------------------------------------------------------------

const ANGLES = [30, 40, 45, 60, 72, 80, 100, 110, 120, 135, 150, 160, 200, 225, 240, 270, 300];
const sector = (r: number, theta: number, area: boolean): Figure => ({
  type: 'plane',
  grid: { xMin: -1.3, xMax: 1.3, yMin: -1.3, yMax: 1.3, xStep: 2.6, yStep: 2.6 },
  hideTickLabels: true,
  hideAxes: true,
  notToScale: true,
  polylines: [{ points: [[0, 0], ...Array.from({ length: 25 }, (_, i) => [roundTo(cosD((theta * i) / 24), 4), roundTo(sinD((theta * i) / 24), 4)] as [number, number]), [0, 0]], color: 'brand', fill: area }],
  points: [{ x: 0, y: 0, label: 'O' }, { x: roundTo(0.55 * cosD(theta / 2), 3), y: roundTo(0.55 * sinD(theta / 2), 3), label: `${theta}°`, color: 'muted' }, { x: 0.5, y: -0.05, label: `${r} cm`, color: 'muted' }],
});

function arcLength(rng: Rng, d: Difficulty): Out {
  const r = rng.int(3, 20);
  const theta = rng.pick(ANGLES);
  const arc = (theta / 360) * 2 * Math.PI * r;
  if (d === 3) {
    const given = roundTo(arc, 1);
    const ang = (given * 360) / (2 * Math.PI * r);
    return {
      prompt: `An arc of a circle of radius $${r}$ cm has a length of $${fmt(given)}$ cm. Find the angle at the centre, to the nearest degree.`,
      parts: [numPart(ang, { decimals: 0, suffix: '°' })],
      hints: ['Arc length $= \\dfrac{\\theta}{360} \\times 2\\pi r$.', `Substitute the arc length and $r = ${r}$, then solve for $\\theta$.`],
      solution: [`$${fmt(given)} = \\dfrac{\\theta}{360} \\times 2\\pi \\times ${r}$`, `$\\theta = \\dfrac{${fmt(given)} \\times 360}{2\\pi \\times ${r}} = ${fmt(ang, 3)}\\ldots \\approx ${Math.round(ang)}^\\circ$`],
      calculator: true,
    };
  }
  const per = d === 2;
  const v = per ? arc + 2 * r : arc;
  return {
    prompt: `A sector of a circle has radius $${r}$ cm and an angle of $${theta}^\\circ$ at the centre. Find the ${per ? 'perimeter of the sector' : 'length of its arc'}, to 1 decimal place.`,
    figure: sector(r, theta, false),
    parts: [numPart(v, { decimals: 1, suffix: 'cm' })],
    hints: [`The arc is $\\dfrac{${theta}}{360}$ of the whole circumference, $2\\pi r$.`, per ? 'The perimeter is the arc plus the two radii.' : 'Arc length $= \\dfrac{\\theta}{360} \\times 2\\pi r$.'],
    solution: [
      `Arc length $= \\dfrac{${theta}}{360} \\times 2\\pi \\times ${r} = ${fmt(arc, 4)}\\ldots$ cm`,
      ...(per ? [`Perimeter $= ${fmt(arc, 4)}\\ldots + ${r} + ${r} = ${fmt(v, 4)}\\ldots$ cm`] : []),
      `To 1 decimal place: $${fmtFixed(v, 1)}$ cm`,
    ],
    calculator: true,
  };
}

function sectorArea(rng: Rng, d: Difficulty): Out {
  const r = rng.int(3, 20);
  const theta = rng.pick(d === 2 ? [30, 45, 60, 90, 120, 135, 150, 240, 270, 300] : ANGLES);
  const area = (theta / 360) * Math.PI * r * r;
  if (d === 3) {
    // A segment: the sector minus the triangle.
    const th = rng.pick([40, 50, 60, 70, 80, 100, 110, 120]);
    const sec = (th / 360) * Math.PI * r * r;
    const tri = 0.5 * r * r * sinD(th);
    const seg = sec - tri;
    return {
      prompt: `A chord cuts off a segment of a circle of radius $${r}$ cm. The chord makes an angle of $${th}^\\circ$ at the centre. Find the area of the segment (between the chord and the arc), to 1 decimal place.`,
      parts: [numPart(seg, { decimals: 1, suffix: 'cm²' })],
      hints: ['The segment is the sector minus the triangle made by the two radii and the chord.', 'Area of a triangle with two sides $a$ and $b$ and the angle $C$ between them $= \\frac{1}{2}ab\\sin C$.'],
      solution: [
        `Sector: $\\dfrac{${th}}{360} \\times \\pi \\times ${r}^2 = ${fmt(sec, 3)}$ cm²`,
        `Triangle: $\\frac{1}{2} \\times ${r} \\times ${r} \\times \\sin ${th}^\\circ = ${fmt(tri, 3)}$ cm²`,
        `Segment $= ${fmt(sec, 3)} - ${fmt(tri, 3)} \\approx ${fmtFixed(seg, 1)}$ cm²`,
      ],
      calculator: true,
    };
  }
  if (d === 2) {
    // An exact answer in terms of π.
    const coef = (theta * r * r) / 360;
    const f = (() => {
      for (let den = 1; den <= 12; den++) if (Math.abs(coef * den - Math.round(coef * den)) < 1e-9) return [Math.round(coef * den), den] as const;
      return [coef, 1] as const;
    })();
    const tex = f[1] === 1 ? `${f[0]}\\pi` : `\\frac{${f[0]}\\pi}{${f[1]}}`;
    return {
      prompt: `A sector has radius $${r}$ cm and an angle of $${theta}^\\circ$ at the centre. Find its area. Give your answer in terms of $\\pi$.`,
      figure: sector(r, theta, true),
      parts: [{ label: 'Area =', suffix: 'cm²', placeholder: 'e.g. 12pi', answer: { kind: 'numeric', value: area, allowExpression: true, exact: f[1] === 1 ? `${f[0]}pi` : `${f[0]}pi/${f[1]}` } }],
      hints: [`The sector is $\\dfrac{${theta}}{360}$ of the whole circle, whose area is $\\pi r^2$.`, 'Simplify the fraction and leave $\\pi$ as it is (type pi for $\\pi$).'],
      solution: [`Area $= \\dfrac{${theta}}{360} \\times \\pi \\times ${r}^2 = \\dfrac{${theta * r * r}}{360}\\pi = ${tex}$ cm²`],
    };
  }
  return {
    prompt: `A sector has radius $${r}$ cm and an angle of $${theta}^\\circ$ at the centre. Find its area, to 1 decimal place.`,
    figure: sector(r, theta, true),
    parts: [numPart(area, { decimals: 1, suffix: 'cm²' })],
    hints: [`The sector is $\\dfrac{${theta}}{360}$ of the whole circle.`, 'Area of a sector $= \\dfrac{\\theta}{360} \\times \\pi r^2$.'],
    solution: [`Area $= \\dfrac{${theta}}{360} \\times \\pi \\times ${r}^2 = ${fmt(area, 4)}\\ldots \\approx ${fmtFixed(area, 1)}$ cm²`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 10.4 Pythagoras and trigonometry in 3D
// ---------------------------------------------------------------------------

/** Cuboids whose space diagonal is a whole number. */
const QUADRUPLES: Array<[number, number, number, number]> = [
  [1, 2, 2, 3], [2, 3, 6, 7], [1, 4, 8, 9], [4, 4, 7, 9], [2, 6, 9, 11], [6, 6, 7, 11], [2, 10, 11, 15], [3, 4, 12, 13], [2, 5, 14, 15], [8, 9, 12, 17], [6, 10, 15, 19], [4, 8, 8, 12],
];

const cuboid = (l: number | string, w: number | string, h: number | string): Figure => ({ type: 'solid', shape: 'rectPrism', labels: { l: `${l} cm`, w: `${w} cm`, h: `${h} cm` } });
const pyramid = (b: number, h: number): Figure => ({ type: 'solid', shape: 'squarePyramid', labels: { b: `${b} cm`, h: `${h} cm` } });

function pythagoras3d(rng: Rng, d: Difficulty): Out {
  if (d === 3) {
    const b = rng.int(4, 20);
    const h = rng.int(5, 25);
    const half = (b * Math.SQRT2) / 2;
    const edge = Math.hypot(half, h);
    return {
      prompt: `A square-based pyramid has a base with sides of $${b}$ cm, and its top is $${h}$ cm directly above the centre of the base. Find the length of one of its sloping edges, to 1 decimal place.`,
      figure: pyramid(b, h),
      parts: [numPart(edge, { decimals: 1, suffix: 'cm' })],
      hints: ['First find the diagonal of the square base with Pythagoras’ theorem; the centre is halfway along it.', 'The height, half the diagonal and a sloping edge make a right-angled triangle.'],
      solution: [
        `Diagonal of the base $= \\sqrt{${b}^2 + ${b}^2} = ${fmt(b * Math.SQRT2, 3)}$ cm, so half of it is $${fmt(half, 3)}$ cm.`,
        `Sloping edge $= \\sqrt{${fmt(half, 3)}^2 + ${h}^2} = \\sqrt{${fmt(half * half + h * h, 2)}} \\approx ${fmtFixed(edge, 1)}$ cm`,
      ],
      calculator: true,
    };
  }
  const [l, w, h] = (d === 1 ? rng.shuffle(rng.pick(QUADRUPLES).slice(0, 3)) : [rng.int(3, 20), rng.int(3, 15), rng.int(3, 15)]) as [number, number, number];
  const D = Math.sqrt(l * l + w * w + h * h);
  return {
    prompt: `A cuboid is $${l}$ cm long, $${w}$ cm wide and $${h}$ cm high. Find the length of the longest straight rod that fits inside it (the diagonal from one corner to the opposite corner)${d === 1 ? '' : ', to 1 decimal place'}.`,
    figure: cuboid(l, w, h),
    parts: [d === 1 ? numPart(D, { suffix: 'cm', exact: false }) : numPart(D, { decimals: 1, suffix: 'cm' })],
    hints: ['First find the diagonal of the base, $\\sqrt{l^2 + w^2}$.', 'The base diagonal, the height and the space diagonal make a right-angled triangle, so the space diagonal is $\\sqrt{l^2 + w^2 + h^2}$.'],
    solution: [
      `Base diagonal $= \\sqrt{${l}^2 + ${w}^2} = \\sqrt{${l * l + w * w}}$`,
      `Space diagonal $= \\sqrt{${l * l + w * w} + ${h}^2} = \\sqrt{${l * l + w * w + h * h}} ${d === 1 ? `= ${fmt(D)}` : `\\approx ${fmtFixed(D, 1)}`}$ cm`,
    ],
    calculator: d > 1,
  };
}

function trig3d(rng: Rng, d: Difficulty): Out {
  if (d === 2) {
    const b = rng.int(4, 20);
    const h = rng.int(5, 25);
    const half = (b * Math.SQRT2) / 2;
    const ang = atanD(h / half);
    return {
      prompt: `A square-based pyramid has a base with sides of $${b}$ cm, and its top is $${h}$ cm directly above the centre of the base. Find the angle between a sloping edge and the base, to 1 decimal place.`,
      figure: pyramid(b, h),
      parts: [numPart(ang, { decimals: 1, suffix: '°' })],
      hints: ['The edge meets the base at a corner. The right-angled triangle has the height and half the base diagonal as its two shorter sides.', '$\\tan \\theta = \\dfrac{\\text{height}}{\\text{half the base diagonal}}$.'],
      solution: [
        `Half the base diagonal $= \\frac{1}{2}\\sqrt{${b}^2 + ${b}^2} = ${fmt(half, 3)}$ cm`,
        `$\\tan \\theta = \\dfrac{${h}}{${fmt(half, 3)}}$, so $\\theta = ${fmt(ang, 3)}\\ldots \\approx ${fmtFixed(ang, 1)}^\\circ$`,
      ],
      calculator: true,
    };
  }
  const [l, w] = [rng.int(4, 20), rng.int(3, 15)];
  const base = Math.hypot(l, w);
  if (d === 3) {
    // Work backwards: the height from the angle.
    const ang = rng.int(20, 60);
    const h = base * tanD(ang);
    return {
      prompt: `A box is a cuboid with a base $${l}$ cm by $${w}$ cm. The diagonal from a bottom corner to the opposite top corner makes an angle of $${ang}^\\circ$ with the base. Find the height of the box, to 1 decimal place.`,
      figure: cuboid(l, w, 'h'),
      parts: [numPart(h, { decimals: 1, suffix: 'cm' })],
      hints: ['The angle is between the space diagonal and the diagonal of the base.', '$\\tan \\theta = \\dfrac{\\text{height}}{\\text{base diagonal}}$, so height $=$ base diagonal $\\times \\tan \\theta$.'],
      solution: [`Base diagonal $= \\sqrt{${l}^2 + ${w}^2} = ${fmt(base, 3)}$ cm`, `Height $= ${fmt(base, 3)} \\times \\tan ${ang}^\\circ \\approx ${fmtFixed(h, 1)}$ cm`],
      calculator: true,
    };
  }
  const h = rng.int(3, 15);
  const ang = atanD(h / base);
  return {
    prompt: `A cuboid is $${l}$ cm long, $${w}$ cm wide and $${h}$ cm high. Find the angle between the diagonal from a bottom corner to the opposite top corner and the base, to 1 decimal place.`,
    figure: cuboid(l, w, h),
    parts: [numPart(ang, { decimals: 1, suffix: '°' })],
    hints: ['The diagonal of the base runs from the same bottom corner to the corner under the top end of the space diagonal. The height stands at right angles to it.', '$\\tan \\theta = \\dfrac{\\text{height}}{\\text{base diagonal}}$.'],
    solution: [`Base diagonal $= \\sqrt{${l}^2 + ${w}^2} = ${fmt(base, 3)}$ cm`, `$\\tan \\theta = \\dfrac{${h}}{${fmt(base, 3)}}$, so $\\theta = ${fmt(ang, 3)}\\ldots \\approx ${fmtFixed(ang, 1)}^\\circ$`],
    calculator: true,
  };
}

export const MEASURE_SKILLS: SkillDef[] = [
  skill({ id: 'mx-bearing-read', name: 'Bearings', description: 'Write directions as three-figure bearings and find the bearing back', outcomes: ['GM1'], lessonId: 'mx-10-1', gen: bearingRead }),
  skill({ id: 'mx-bearing-trig', name: 'Bearings with trigonometry', description: 'Use Pythagoras’ theorem and trigonometry to find distances and bearings', outcomes: ['GM1'], lessonId: 'mx-10-1', calculator: true, gen: bearingTrig }),
  skill({ id: 'mx-locus-describe', name: 'Describing loci', description: 'Describe the locus of points that obey a rule, and choose the construction that draws it', outcomes: ['GM2'], lessonId: 'mx-10-2', format: 'mc', gen: locusDescribe }),
  skill({ id: 'mx-locus-region', name: 'Areas of loci', description: 'Find the area of a region of points within a distance of a point, a corner or a line', outcomes: ['GM2'], lessonId: 'mx-10-2', calculator: true, gen: locusRegion }),
  skill({ id: 'mx-arc-length', name: 'Arc lengths', description: 'Find arc lengths and sector perimeters, and the angle from an arc length', outcomes: ['GM3'], lessonId: 'mx-10-3', calculator: true, gen: arcLength }),
  skill({ id: 'mx-sector-area', name: 'Areas of sectors and segments', description: 'Find the area of a sector, exactly in terms of π or as a decimal, and of a segment', outcomes: ['GM3'], lessonId: 'mx-10-3', calculator: true, gen: sectorArea }),
  skill({ id: 'mx-3d-pythagoras', name: 'Pythagoras’ theorem in 3D', description: 'Find the space diagonal of a cuboid and the sloping edge of a pyramid', outcomes: ['GM4'], lessonId: 'mx-10-4', calculator: true, gen: pythagoras3d }),
  skill({ id: 'mx-3d-trig', name: 'Trigonometry in 3D', description: 'Find the angle between a line and a plane in a cuboid or a pyramid, and lengths from that angle', outcomes: ['GM4'], lessonId: 'mx-10-4', calculator: true, gen: trig3d }),
];
