/** More Mathematics Topics, Unit 3: cross-sections, solids of revolution, proof and the equation of a circle. */
import { mc, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, isPerfectSquare, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, Part, SkillDef } from '../../../types.ts';
import { pm } from './common.ts';

type Out = GenOutput;

// ---------------------------------------------------------------------------
// 3.1 Cross-sections of solids
// ---------------------------------------------------------------------------

const SECTIONS: Array<{ solid: string; cut: string; shape: string; why: string }> = [
  { solid: 'a cube', cut: 'parallel to one of its faces', shape: 'A square', why: 'The cut meets four faces at right angles, and every edge of a cube is the same length.' },
  { solid: 'a rectangular prism', cut: 'parallel to its base', shape: 'A rectangle the same size as the base', why: 'A slice parallel to the base of a prism is always a copy of the base.' },
  { solid: 'a rectangular prism', cut: 'perpendicular to its base, parallel to a side face', shape: 'A rectangle', why: 'The cut meets the top and bottom and two side faces, at right angles.' },
  { solid: 'a triangular prism', cut: 'parallel to its triangular base', shape: 'A triangle the same size as the base', why: 'A slice parallel to the base of a prism is always a copy of the base.' },
  { solid: 'a cylinder', cut: 'parallel to its base', shape: 'A circle', why: 'A slice parallel to the base of a cylinder is a copy of the circular base.' },
  { solid: 'a cylinder', cut: 'perpendicular to its base, through its axis', shape: 'A rectangle', why: 'The cut runs straight down the height, and across the full diameter.' },
  { solid: 'a cone', cut: 'parallel to its base', shape: 'A circle smaller than the base', why: 'Every slice parallel to the base is a circle, getting smaller towards the apex.' },
  { solid: 'a cone', cut: 'perpendicular to its base, through its apex', shape: 'A triangle', why: 'The cut runs from the apex down to both ends of a diameter of the base.' },
  { solid: 'a sphere', cut: 'through any point inside it', shape: 'A circle', why: 'Every plane slice of a sphere is a circle; it is largest when the cut passes through the centre.' },
  { solid: 'a square pyramid', cut: 'parallel to its base', shape: 'A square smaller than the base', why: 'Slices parallel to the base are squares, shrinking towards the apex.' },
  { solid: 'a square pyramid', cut: 'perpendicular to its base, through its apex', shape: 'A triangle', why: 'The cut runs from the apex down to the base.' },
  { solid: 'a cube', cut: 'through three corners next to one corner (cutting that corner off)', shape: 'A triangle', why: 'The cut meets three faces, one side of the triangle on each.' },
];
/**
 * Shapes that would also be a correct name for the answer, so are never offered as wrong choices:
 * a square is a rectangle (and, by the inclusive definition, a trapezoid), and a circle is an ellipse.
 */
const ALSO_TRUE: Record<string, string[]> = {
  'A square': ['A rectangle', 'A trapezoid'],
  'A rectangle': ['A trapezoid'],
  'A circle': ['An oval (ellipse)'],
};
const SHAPES = ['A square', 'A rectangle', 'A circle', 'A triangle', 'A trapezoid', 'A pentagon', 'An oval (ellipse)', 'A circle smaller than the base', 'A triangle the same size as the base'];

function crossSection(rng: Rng, d: Difficulty): Out {
  if (d < 3) {
    const s = rng.pick(SECTIONS.filter((x) => d === 2 || !x.cut.includes('corners')));
    const base = s.shape.split(' ').slice(0, 2).join(' ');
    return {
      prompt: `A plane cuts ${s.solid} ${s.cut}. What shape is the cross-section?`,
      parts: [{ answer: mc(rng, s.shape, SHAPES.filter((x) => !x.startsWith(base) && !(ALSO_TRUE[base] ?? []).includes(x))) }],
      hints: ['A **cross-section** is the flat face left where a plane slices through a solid.', 'Picture slicing the solid with a knife, then look at the cut face straight on.'],
      solution: [s.why, `The cross-section is ${s.shape.charAt(0).toLowerCase()}${s.shape.slice(1)}.`],
    };
  }
  // The area of a cross-section.
  const kind = rng.pick(['prism-base', 'prism-side', 'cyl-base', 'cyl-axis'] as const);
  const l = rng.int(4, 15), w = rng.int(3, 12), h = rng.int(5, 20), r = rng.int(2, 9);
  if (kind === 'prism-base' || kind === 'prism-side') {
    const area = kind === 'prism-base' ? l * w : w * h;
    return {
      prompt: `A rectangular prism is $${l}$ cm long, $${w}$ cm wide and $${h}$ cm high. It is cut ${kind === 'prism-base' ? 'parallel to its base' : 'perpendicular to its base, parallel to the end face that is ' + w + ' cm wide'}. Find the area of the cross-section.`,
      parts: [numPart(area, { suffix: 'cm²' })],
      hints: ['First decide the shape of the cross-section and its dimensions.', kind === 'prism-base' ? 'A slice parallel to the base is a copy of the base.' : 'This slice is a copy of the end face: width by height.'],
      solution: [kind === 'prism-base' ? `The cross-section is a rectangle the size of the base: $${l}$ cm by $${w}$ cm.` : `The cross-section is a rectangle the size of the end face: $${w}$ cm by $${h}$ cm.`, `Area $= ${kind === 'prism-base' ? `${l} \\times ${w}` : `${w} \\times ${h}`} = ${area}\\ \\text{cm}^2$`],
    };
  }
  const area = kind === 'cyl-base' ? Math.PI * r * r : 2 * r * h;
  return {
    prompt: `A cylinder has radius $${r}$ cm and height $${h}$ cm. It is cut ${kind === 'cyl-base' ? 'parallel to its base' : 'perpendicular to its base, through its axis'}. Find the area of the cross-section${kind === 'cyl-base' ? ', to the nearest tenth' : ''}.`,
    parts: [kind === 'cyl-base' ? numPart(area, { decimals: 1, suffix: 'cm²' }) : numPart(area, { suffix: 'cm²' })],
    hints: ['First decide the shape of the cross-section and its dimensions.', kind === 'cyl-base' ? 'The slice is a circle with the radius of the cylinder.' : 'The slice is a rectangle: the diameter by the height.'],
    solution: kind === 'cyl-base'
      ? [`The cross-section is a circle of radius $${r}$ cm.`, `Area $= \\pi r^2 = \\pi \\times ${r}^2 \\approx ${fmt(roundTo(area, 1))}\\ \\text{cm}^2$`]
      : [`The cross-section is a rectangle: the diameter, $2 \\times ${r} = ${2 * r}$ cm, by the height, $${h}$ cm.`, `Area $= ${2 * r} \\times ${h} = ${area}\\ \\text{cm}^2$`],
    calculator: kind === 'cyl-base',
  };
}

// ---------------------------------------------------------------------------
// 3.2 Solids of revolution
// ---------------------------------------------------------------------------

function solidOfRevolution(rng: Rng, d: Difficulty): Out {
  const shape = rng.pick(['rectangle', 'triangle', 'semicircle'] as const);
  const a = rng.int(2, 9);
  const b = retry(() => rng.int(2, 12), (x) => x !== a);
  const solid = shape === 'rectangle' ? 'A cylinder' : shape === 'triangle' ? 'A cone' : 'A sphere';
  const what = shape === 'rectangle' ? `a rectangle $${a}$ cm by $${b}$ cm is turned all the way around its side of length $${b}$ cm` : shape === 'triangle' ? `a right triangle with legs $${a}$ cm and $${b}$ cm is turned all the way around its leg of length $${b}$ cm` : `a semicircle of radius $${a}$ cm is turned all the way around its diameter`;
  const why = shape === 'rectangle' ? `The side it turns around becomes the axis, the height of $${b}$ cm; the opposite side sweeps out the curved surface, and the other sides sweep out two circles of radius $${a}$ cm.` : shape === 'triangle' ? `The leg it turns around becomes the height, $${b}$ cm; the other leg sweeps out a circular base of radius $${a}$ cm, and the hypotenuse sweeps out the slanted surface.` : `Every point of the curved edge stays $${a}$ cm from the centre, so the curve sweeps out a sphere of radius $${a}$ cm.`;
  if (d === 1) {
    return {
      prompt: `Imagine that ${what}. What solid does it sweep out?`,
      parts: [{ answer: mc(rng, solid, ['A cylinder', 'A cone', 'A sphere', 'A rectangular prism', 'A pyramid'].filter((x) => x !== solid)) }],
      hints: ['The line the shape turns around is the **axis** of the solid.', 'Picture each edge of the shape as it spins: a side parallel to the axis makes a tube, a slanted side makes a cone shape, and a curve stays curved.'],
      solution: [why, `${solid} is swept out.`],
    };
  }
  const v = shape === 'rectangle' ? Math.PI * a * a * b : shape === 'triangle' ? (Math.PI * a * a * b) / 3 : (4 / 3) * Math.PI * a ** 3;
  const formula = shape === 'rectangle' ? `V = \\pi r^2 h = \\pi \\times ${a}^2 \\times ${b}` : shape === 'triangle' ? `V = \\tfrac{1}{3}\\pi r^2 h = \\tfrac{1}{3} \\times \\pi \\times ${a}^2 \\times ${b}` : `V = \\tfrac{4}{3}\\pi r^3 = \\tfrac{4}{3} \\times \\pi \\times ${a}^3`;
  const parts: Part[] = [{ label: 'Solid:', answer: mc(rng, solid, ['A cylinder', 'A cone', 'A sphere'].filter((x) => x !== solid), { keepOrder: false }) }, numPart(v, { decimals: 1, label: 'Volume:', suffix: 'cm³' })];
  return {
    prompt: `Imagine that ${what}. Name the solid it sweeps out, and find its volume to the nearest tenth of a cubic centimetre.`,
    parts: d === 3 ? parts : parts,
    hints: ['Decide the solid first, then which length is the radius and which is the height.', 'Cylinder: $V = \\pi r^2 h$. Cone: $V = \\tfrac{1}{3}\\pi r^2 h$. Sphere: $V = \\tfrac{4}{3}\\pi r^3$.'],
    solution: [why, `$${formula} \\approx ${fmt(roundTo(v, 1))}\\ \\text{cm}^3$`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 3.3 Two-column proofs
// ---------------------------------------------------------------------------

interface Proof {
  given: string;
  prove: string;
  rows: Array<[string, string]>;
}

const L3 = ['ABC', 'PQR', 'DEF', 'JKL', 'XYZ', 'MNO'];

/** Proof templates on random letters. Each row is [statement, reason]. */
function proofs(rng: Rng): Proof[] {
  const [A, B, C] = rng.pick(L3).split('') as [string, string, string];
  const D = rng.pick(['D', 'M', 'S', 'T'].filter((x) => ![A, B, C].includes(x)));
  const E = rng.pick(['E', 'N', 'U', 'W'].filter((x) => ![A, B, C, D].includes(x)));
  return [
    {
      given: `$\\overline{${A}${B}} \\cong \\overline{${C}${D}}$`,
      prove: `$\\overline{${A}${C}} \\cong \\overline{${B}${D}}$ (the points lie on a line in the order $${A}, ${B}, ${C}, ${D}$)`,
      rows: [
        [`$${A}${B} = ${C}${D}$`, 'Definition of congruent segments'],
        [`$${B}${C} = ${B}${C}$`, 'Reflexive property'],
        [`$${A}${B} + ${B}${C} = ${B}${C} + ${C}${D}$`, 'Addition property of equality'],
        [`$${A}${C} = ${A}${B} + ${B}${C}$ and $${B}${D} = ${B}${C} + ${C}${D}$`, 'Segment addition postulate'],
        [`$${A}${C} = ${B}${D}$`, 'Substitution'],
        [`$\\overline{${A}${C}} \\cong \\overline{${B}${D}}$`, 'Definition of congruent segments'],
      ],
    },
    {
      given: `Lines $${A}${B}$ and $${C}${D}$ cross at $${E}$, which lies between $${A}$ and $${B}$ and between $${C}$ and $${D}$`,
      prove: `$\\angle ${A}${E}${C} \\cong \\angle ${B}${E}${D}$`,
      rows: [
        [`$\\angle ${A}${E}${C}$ and $\\angle ${C}${E}${B}$ form a linear pair`, 'Definition of a linear pair'],
        [`$m\\angle ${A}${E}${C} + m\\angle ${C}${E}${B} = 180^\\circ$`, 'Linear pair postulate (the angles are supplementary)'],
        [`$m\\angle ${C}${E}${B} + m\\angle ${B}${E}${D} = 180^\\circ$`, 'Linear pair postulate (the angles are supplementary)'],
        [`$m\\angle ${A}${E}${C} = m\\angle ${B}${E}${D}$`, 'Subtraction property of equality'],
        [`$\\angle ${A}${E}${C} \\cong \\angle ${B}${E}${D}$`, 'Definition of congruent angles'],
      ],
    },
    {
      given: `$${E}$ is the midpoint of $\\overline{${A}${D}}$ and of $\\overline{${B}${C}}$`,
      prove: `$\\triangle ${A}${E}${B} \\cong \\triangle ${D}${E}${C}$`,
      rows: [
        [`$\\overline{${A}${E}} \\cong \\overline{${D}${E}}$`, 'Definition of midpoint'],
        [`$\\overline{${B}${E}} \\cong \\overline{${C}${E}}$`, 'Definition of midpoint'],
        [`$\\angle ${A}${E}${B} \\cong \\angle ${D}${E}${C}$`, 'Vertical angles are congruent'],
        [`$\\triangle ${A}${E}${B} \\cong \\triangle ${D}${E}${C}$`, 'SAS congruence'],
      ],
    },
    {
      given: `$\\overline{${A}${B}} \\cong \\overline{${A}${C}}$ and $\\overline{${A}${D}}$ bisects $\\angle ${B}${A}${C}$, with $${D}$ on $\\overline{${B}${C}}$`,
      prove: `$\\angle ${B} \\cong \\angle ${C}$`,
      rows: [
        [`$\\overline{${A}${B}} \\cong \\overline{${A}${C}}$`, 'Given'],
        [`$\\angle ${B}${A}${D} \\cong \\angle ${C}${A}${D}$`, 'Definition of angle bisector'],
        [`$\\overline{${A}${D}} \\cong \\overline{${A}${D}}$`, 'Reflexive property'],
        [`$\\triangle ${A}${B}${D} \\cong \\triangle ${A}${C}${D}$`, 'SAS congruence'],
        [`$\\angle ${B} \\cong \\angle ${C}$`, 'Corresponding parts of congruent triangles are congruent (CPCTC)'],
      ],
    },
    {
      given: `$\\overline{${A}${B}} \\parallel \\overline{${C}${D}}$ and $\\overline{${A}${B}} \\cong \\overline{${C}${D}}$, with $\\overline{${A}${D}}$ and $\\overline{${B}${C}}$ crossing at $${E}$`,
      prove: `$\\triangle ${A}${B}${E} \\cong \\triangle ${D}${C}${E}$`,
      rows: [
        [`$\\angle ${B}${A}${E} \\cong \\angle ${C}${D}${E}$`, 'Alternate interior angles are congruent (parallel lines)'],
        [`$\\angle ${A}${B}${E} \\cong \\angle ${D}${C}${E}$`, 'Alternate interior angles are congruent (parallel lines)'],
        [`$\\overline{${A}${B}} \\cong \\overline{${C}${D}}$`, 'Given'],
        [`$\\triangle ${A}${B}${E} \\cong \\triangle ${D}${C}${E}$`, 'ASA congruence'],
      ],
    },
    {
      given: `$\\overline{${A}${B}} \\cong \\overline{${D}${C}}$ and $\\overline{${A}${C}} \\cong \\overline{${D}${B}}$`,
      prove: `$\\triangle ${A}${B}${C} \\cong \\triangle ${D}${C}${B}$`,
      rows: [
        [`$\\overline{${A}${B}} \\cong \\overline{${D}${C}}$ and $\\overline{${A}${C}} \\cong \\overline{${D}${B}}$`, 'Given'],
        [`$\\overline{${B}${C}} \\cong \\overline{${C}${B}}$`, 'Reflexive property'],
        [`$\\triangle ${A}${B}${C} \\cong \\triangle ${D}${C}${B}$`, 'SSS congruence'],
      ],
    },
    {
      given: `In $\\triangle ${A}${B}${C}$, the side $\\overline{${B}${C}}$ is extended to a point $${D}$`,
      prove: `$m\\angle ${A}${C}${D} = m\\angle ${A} + m\\angle ${B}$`,
      rows: [
        [`$m\\angle ${A} + m\\angle ${B} + m\\angle ${A}${C}${B} = 180^\\circ$`, 'Triangle angle sum theorem'],
        [`$m\\angle ${A}${C}${B} + m\\angle ${A}${C}${D} = 180^\\circ$`, 'Linear pair postulate (the angles are supplementary)'],
        [`$m\\angle ${A} + m\\angle ${B} + m\\angle ${A}${C}${B} = m\\angle ${A}${C}${B} + m\\angle ${A}${C}${D}$`, 'Substitution'],
        [`$m\\angle ${A}${C}${D} = m\\angle ${A} + m\\angle ${B}$`, 'Subtraction property of equality'],
      ],
    },
  ];
}

const REASONS = [
  'Given', 'Definition of a linear pair', 'Definition of midpoint', 'Definition of angle bisector', 'Definition of congruent segments', 'Definition of congruent angles', 'Reflexive property',
  'Substitution', 'Addition property of equality', 'Subtraction property of equality', 'Segment addition postulate', 'Vertical angles are congruent',
  'Linear pair postulate (the angles are supplementary)', 'Alternate interior angles are congruent (parallel lines)', 'Triangle angle sum theorem',
  'SAS congruence', 'ASA congruence', 'SSS congruence', 'Corresponding parts of congruent triangles are congruent (CPCTC)',
];

function proofReason(rng: Rng, d: Difficulty): Out {
  const all = proofs(rng);
  const pool = d === 1 ? all.slice(2, 6) : all;
  const p = rng.pick(pool);
  const i = rng.int(0, p.rows.length - 1);
  const [stmt, reason] = p.rows[i]!;
  const figure: Figure = { type: 'table', markdown: true, headers: ['Statement', 'Reason'], rows: p.rows.map(([s, r], j) => [`${j + 1}. ${s}`, j === i ? '**?**' : r]) };
  // Hard questions offer close distractors (other congruence tests, other properties).
  // "Given" is left out of the wrong answers: a fact that follows straight from the given one could arguably be called given.
  const close = REASONS.filter((r) => r !== reason && r !== 'Given' && (d < 3 || r.split(' ')[0] === reason.split(' ')[0] || /congruence|property|Definition/.test(r)));
  return {
    prompt: `**Given:** ${p.given}\n\n**Prove:** ${p.prove}\n\nWhich reason belongs in step ${i + 1}?`,
    figure,
    parts: [{ answer: mc(rng, reason, rng.shuffle(close)) }],
    hints: ['Each statement in a proof needs a reason: the given information, a definition, a property of equality, a postulate or a theorem already proved.', `Look at what step ${i + 1} claims, and at the steps before it that it uses.`],
    solution: [`Step ${i + 1} says ${stmt}.`, explainReason(reason), `The reason is: ${reason}.`],
  };
}

function explainReason(r: string): string {
  if (r === 'Given') return 'This fact is stated in the given information, so we may use it directly.';
  if (r.startsWith('Definition of midpoint')) return 'A midpoint divides a segment into two congruent segments.';
  if (r.startsWith('Definition of angle bisector')) return 'An angle bisector divides an angle into two congruent angles.';
  if (r.startsWith('Definition of congruent')) return 'Congruent segments have equal lengths and congruent angles have equal measures, and the other way round.';
  if (r.startsWith('Reflexive')) return 'Anything is equal (congruent) to itself; here a side is shared by two figures.';
  if (r.startsWith('Substitution')) return 'Equal quantities can replace each other in an equation.';
  if (r.startsWith('Addition property')) return 'Adding the same amount to both sides of an equation keeps it true.';
  if (r.startsWith('Subtraction property')) return 'Subtracting the same amount from both sides of an equation keeps it true.';
  if (r.startsWith('Segment addition')) return 'If a point lies on a segment between its ends, the two parts add up to the whole.';
  if (r.startsWith('Vertical')) return 'The angles are opposite each other where two lines cross, and vertical angles are congruent.';
  if (r.startsWith('Linear pair')) return 'The two angles sit side by side on a straight line, so they add up to $180^\\circ$.';
  if (r.startsWith('Alternate')) return 'A transversal crosses two parallel lines, and alternate interior angles of parallel lines are congruent.';
  if (r.startsWith('Triangle angle')) return 'The three angles of any triangle add up to $180^\\circ$.';
  if (r.startsWith('SAS')) return 'Two sides and the angle between them are congruent in the two triangles.';
  if (r.startsWith('ASA')) return 'Two angles and the side between them are congruent in the two triangles.';
  if (r.startsWith('SSS')) return 'All three pairs of sides are congruent.';
  return 'The triangles were proved congruent, so their matching parts are congruent.';
}

// ---------------------------------------------------------------------------
// 3.4 The equation of a circle
// ---------------------------------------------------------------------------

/** (x - h)^2 written with the sign worked out: x^2 when h = 0, (x + 3)^2 when h = -3. */
const sq = (v: string, h: number) => (h === 0 ? `${v}^2` : `(${v} ${pm(-h)})^2`);

function circleEquation(rng: Rng, d: Difficulty): Out {
  const h = rng.int(-9, 9);
  const k = rng.int(-9, 9);
  if (d === 1) {
    const r = rng.int(1, 12);
    return {
      prompt: `Find the centre and the radius of the circle\n\n$$${sq('x', h)} + ${sq('y', k)} = ${r * r}$$`,
      parts: [numPart(h, { label: 'Centre $x$:' }), numPart(k, { label: 'Centre $y$:' }), numPart(r, { label: 'Radius:' })],
      hints: ['The circle with centre $(h, k)$ and radius $r$ is $(x - h)^2 + (y - k)^2 = r^2$.', 'Watch the signs: $(x + 3)^2$ is $(x - (-3))^2$, so $h = -3$.'],
      solution: [`Compare with $(x - h)^2 + (y - k)^2 = r^2$: $h = ${h}$ and $k = ${k}$.`, `$r^2 = ${r * r}$, so $r = \\sqrt{${r * r}} = ${r}$.`, `The centre is $(${h}, ${k})$ and the radius is $${r}$.`],
    };
  }
  // Centre and a point on the circle: find r².
  const dx = rng.int(-8, 8);
  const dy = retry(() => rng.int(-8, 8), (v) => v !== 0 || dx !== 0);
  const r2 = dx * dx + dy * dy;
  const px = h + dx;
  const py = k + dy;
  const parts: Part[] = [numPart(r2, { label: '$r^2$:' })];
  const sol = [`The radius is the distance from the centre to the point: $r^2 = (${px} - ${sp(h)})^2 + (${py} - ${sp(k)})^2 = ${dx * dx} + ${dy * dy} = ${r2}$.`];
  if (d === 3) {
    parts.push(numPart(Math.sqrt(r2), isPerfectSquare(r2) ? { label: 'Radius:' } : { label: 'Radius:', decimals: 1 }));
    sol.push(isPerfectSquare(r2) ? `$r = \\sqrt{${r2}} = ${Math.sqrt(r2)}$` : `$r = \\sqrt{${r2}} \\approx ${fmt(roundTo(Math.sqrt(r2), 1))}$`);
  }
  sol.push(`The equation is $${sq('x', h)} + ${sq('y', k)} = ${r2}$.`);
  return {
    prompt: `A circle has centre $(${h}, ${k})$ and passes through the point $(${px}, ${py})$. Its equation is $(x - h)^2 + (y - k)^2 = r^2$. Find $r^2$${d === 3 ? ' and the radius (to the nearest tenth where needed)' : ''}.`,
    parts,
    hints: ['Every point on a circle is the radius away from the centre.', 'Use the distance formula, or the Pythagorean theorem: $r^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2$.'],
    solution: sol,
    calculator: d === 3,
  };
}

const sp = (x: number) => (x < 0 ? `(${x})` : `${x}`);

function circleCompleteSquare(rng: Rng, d: Difficulty): Out {
  const h = rng.intExcept(-8, 8, [0]);
  const k = d === 1 ? 0 : rng.intExcept(-8, 8, [0]);
  const r = rng.int(1, 10);
  const D = -2 * h;
  const E = -2 * k;
  const F = h * h + k * k - r * r;
  // Hard questions multiply the whole equation by 2 or 3, to be divided out first.
  const c = d === 3 ? rng.pick([2, 3]) : 1;
  const co = (v: number, t: string) => (v ? `${pm(c * v)}${t}` : '');
  const terms = [`${c > 1 ? c : ''}x^2 + ${c > 1 ? c : ''}y^2`, co(D, 'x'), co(E, 'y'), co(F, '')].filter(Boolean).join(' ');
  return {
    prompt: `Find the centre and the radius of the circle\n\n$$${terms} = 0$$`,
    parts: [numPart(h, { label: 'Centre $x$:' }), numPart(k, { label: 'Centre $y$:' }), numPart(r, { label: 'Radius:' })],
    hints: ['Group the $x$ terms and the $y$ terms, and move the number to the other side.', 'Complete the square: add the square of half the coefficient of $x$ (and of $y$) to both sides.'],
    solution: [
      ...(c > 1 ? [`Divide every term by $${c}$, so that $x^2$ and $y^2$ have coefficient $1$: $${[`x^2 + y^2`, D ? `${pm(D)}x` : '', E ? `${pm(E)}y` : '', F ? pm(F) : ''].filter(Boolean).join(' ')} = 0$`] : []),
      `Group and move the constant: $(x^2 ${D ? `${pm(D)}x` : ''})${E ? ` + (y^2 ${pm(E)}y)` : ' + y^2'} = ${-F}$`,
      `Half of $${D}$ is $${-h}$, and $(${-h})^2 = ${h * h}$.${k ? ` Half of $${E}$ is $${-k}$, and $(${-k})^2 = ${k * k}$.` : ''} Add ${k ? 'these' : 'this'} to both sides.`,
      `$${sq('x', h)} + ${sq('y', k)} = ${-F} + ${h * h}${k ? ` + ${k * k}` : ''} = ${r * r}$`,
      `The centre is $(${h}, ${k})$ and the radius is $\\sqrt{${r * r}} = ${r}$.`,
    ],
  };
}

export const GEOMETRY_SKILLS: SkillDef[] = [
  skill({ id: 'mx-cross-section', name: 'Cross-sections of solids', description: 'Name the shape of a cross-section and find its area', outcomes: ['GE1'], lessonId: 'mx-3-1', gen: crossSection }),
  skill({ id: 'mx-solid-of-revolution', name: 'Solids of revolution', description: 'Name the solid a turning shape sweeps out and find its volume', outcomes: ['GE2'], lessonId: 'mx-3-2', gen: solidOfRevolution }),
  skill({ id: 'mx-proof-reason', name: 'Reasons in two-column proofs', description: 'Choose the reason for a step of a two-column proof', outcomes: ['GE3'], lessonId: 'mx-3-3', format: 'mc', gen: proofReason }),
  skill({ id: 'mx-circle-equation', name: 'The equation of a circle', description: 'Find the centre and radius from the equation, and the equation from the centre and a point', outcomes: ['GE4'], lessonId: 'mx-3-4', gen: circleEquation }),
  skill({ id: 'mx-circle-complete-square', name: 'Circles by completing the square', description: 'Find the centre and radius of a circle written in general form', outcomes: ['GE4'], lessonId: 'mx-3-4', gen: circleCompleteSquare }),
];
