/**
 * More Mathematics Topics, Unit 13: A level mechanics in the second year. Resolving forces and
 * equilibrium, friction, inclined planes, projectiles, kinematics in two dimensions with vectors and
 * calculus, and moments. Every question states g = 9.8 m/s².
 */
import { fixedChoice, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { atanD, cosD, fmt, polyString, roundTo, sinD } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';
import { eq3, s3, SF_TEXT, sfPart, sp } from './common.ts';
import { G, G_TEXT } from './mechanics.ts';

type Out = GenOutput;

const ANGLE_TEXT = 'Give angles to 1 decimal place.';
/** The direction of (x, y) in degrees, from 0 up to 360, anticlockwise from the positive x-axis. */
const direction = (x: number, y: number) => ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
/** A polynomial (or a vector xi + yj) in LaTeX, leaving out 1s and zero terms. */
const poly = (terms: Array<[number, string]>) => polyString(terms.map(([c, b]) => [roundTo(c, 6), b]));
const vecTex = (x: number, y: number) => poly([[x, '\\mathbf{i}'], [y, '\\mathbf{j}']]);
const deg = (a: number) => `${fmt(a)}^\\circ`;

/** Forces drawn as arrows from a particle, with a dashed horizontal for reference. */
function forceFigure(forces: Array<{ angle: number; label: string }>, caption: string): Figure {
  const L = 3;
  const segments: PlaneSegment[] = [{ from: [-3.8, 0], to: [3.8, 0], color: 'muted', dashed: true }];
  const points: PlanePoint[] = [{ x: 0, y: 0 }];
  for (const f of forces) {
    const tip: [number, number] = [L * cosD(f.angle), L * sinD(f.angle)];
    segments.push({ from: [0, 0], to: tip, arrowEnd: true });
    points.push({ x: tip[0], y: tip[1], label: f.label, color: 'muted' });
  }
  return { type: 'plane', grid: { xMin: -4.5, xMax: 4.5, yMin: -4.5, yMax: 4.5, step: 10 }, hideTickLabels: true, segments, points, notToScale: true, caption };
}

/** A slope rising to the left at `angle`, with a particle on it (and, if asked, a pulley and a hanging particle). */
function slopeFigure(angle: number, label: string, hanging = false): Figure {
  const L = 6;
  const h = L * Math.tan((angle * Math.PI) / 180);
  const mid: [number, number] = [L * 0.45, h * 0.55];
  const points: PlanePoint[] = [{ x: mid[0], y: mid[1], label: 'A' }, { x: L - 1.1, y: 0.35, label, color: 'muted' }];
  const segments: PlaneSegment[] = [];
  if (hanging) {
    points.push({ x: 0, y: h, label: 'pulley', color: 'muted' }, { x: -0.5, y: h - 2, label: 'B' });
    segments.push({ from: mid, to: [0, h] }, { from: [0, h], to: [-0.5, h], color: 'muted' }, { from: [-0.5, h], to: [-0.5, h - 2] });
  }
  return { type: 'plane', grid: { xMin: -1.5, xMax: L + 0.5, yMin: -0.5, yMax: h + 0.8, step: 20 }, hideTickLabels: true, polylines: [{ points: [[0, 0], [L, 0], [0, h], [0, 0]], color: 'muted' }], points, segments, notToScale: true };
}

/** A horizontal beam from A (x = 0) to B (x = L), with upward reactions and downward loads. */
function beamFigure(L: number, ups: Array<{ x: number; label: string }>, downs: Array<{ x: number; label: string }>, ends = true): Figure {
  const segments: PlaneSegment[] = [{ from: [0, 0], to: [L, 0] }];
  const points: PlanePoint[] = ends ? [{ x: 0, y: 0, label: 'A' }, { x: L, y: 0, label: 'B' }] : [];
  for (const u of ups) {
    segments.push({ from: [u.x, 0], to: [u.x, 1.3], arrowEnd: true, color: 'accent' });
    points.push({ x: u.x, y: 1.3, label: u.label, color: 'muted' });
  }
  for (const w of downs) {
    segments.push({ from: [w.x, 0], to: [w.x, -1.3], arrowEnd: true });
    points.push({ x: w.x, y: -1.3, label: w.label, color: 'muted' });
  }
  return { type: 'plane', grid: { xMin: -0.8, xMax: L + 0.8, yMin: -2, yMax: 2, step: 20 }, hideTickLabels: true, segments, points, notToScale: true };
}

// ---------------------------------------------------------------------------
// 13.1 Resolving forces and equilibrium
// ---------------------------------------------------------------------------

function resolveForces(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const F = rng.int(5, 60);
    const th = rng.pick([15, 20, 25, 30, 35, 40, 50, 55, 60, 65, 70]);
    const [x, y] = [F * cosD(th), F * sinD(th)];
    return {
      prompt: `A force of $${F}$ N acts at $${deg(th)}$ above the horizontal. Find its horizontal and vertical components. ${SF_TEXT}`,
      figure: forceFigure([{ angle: th, label: `${F} N` }], `${F} N at ${th}° above the horizontal`),
      parts: [sfPart(x, { label: 'Horizontal:', suffix: 'N' }), sfPart(y, { label: 'Vertical:', suffix: 'N' })],
      hints: ['The component along a direction at angle $\\theta$ to the force is $F\\cos\\theta$.', 'The horizontal component is $F\\cos\\theta$ and the vertical component, at $90^\\circ - \\theta$ to the force, is $F\\sin\\theta$.'],
      solution: [`Horizontal: $${F}\\cos ${deg(th)} ${eq3(x)}$ N`, `Vertical: $${F}\\sin ${deg(th)} ${eq3(y)}$ N`],
      calculator: true,
    };
  }
  if (d === 2) {
    const P = rng.int(4, 30);
    const Q = rng.int(4, 30);
    const th = rng.pick([30, 40, 50, 60, 70, 110, 120, 135, 150]);
    const [x, y] = [P + Q * cosD(th), Q * sinD(th)];
    const R = Math.hypot(x, y);
    const ang = direction(x, y);
    return {
      prompt: `Two forces act on a particle: $${P}$ N along the positive $x$-direction, and $${Q}$ N at $${deg(th)}$ to the first force (anticlockwise). Find the magnitude of the resultant force and the angle it makes with the first force. ${SF_TEXT} ${ANGLE_TEXT}`,
      figure: forceFigure([{ angle: 0, label: `${P} N` }, { angle: th, label: `${Q} N` }], `${P} N along the x-direction and ${Q} N at ${th}° to it`),
      parts: [sfPart(R, { label: 'Magnitude:', suffix: 'N' }), numPart(ang, { label: 'Angle:', decimals: 1, suffix: '°' })],
      hints: ['Resolve both forces into $x$- and $y$-components and add them.', 'The resultant has magnitude $\\sqrt{X^2 + Y^2}$ and makes an angle $\\theta$ with the $x$-direction where $\\tan\\theta = \\dfrac{Y}{X}$. Sketch it to see which quadrant it is in.'],
      solution: [
        `$X = ${P} + ${Q}\\cos ${deg(th)} \\approx ${s3(x)}$ and $Y = ${Q}\\sin ${deg(th)} \\approx ${s3(y)}$.`,
        `$R = \\sqrt{X^2 + Y^2} ${eq3(R)}$ N.`,
        `$\\tan^{-1}\\left(\\dfrac{Y}{X}\\right)$${x < 0 ? ', adding $180^\\circ$ because $X < 0$,' : ''} gives an angle of $${fmt(roundTo(ang, 1))}^\\circ$ with the first force.`,
      ],
      calculator: true,
    };
  }
  const forces = retry(
    () => rng.sample([0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330], 3).map((angle) => ({ angle, F: rng.int(3, 25) })),
    (fs) => {
      const x = fs.reduce((s, f) => s + f.F * cosD(f.angle), 0);
      const y = fs.reduce((s, f) => s + f.F * sinD(f.angle), 0);
      return Math.hypot(x, y) > 2 && Math.abs(x) > 0.2 && Math.abs(y) > 0.2;
    },
    200,
  );
  const x = forces.reduce((s, f) => s + f.F * cosD(f.angle), 0);
  const y = forces.reduce((s, f) => s + f.F * sinD(f.angle), 0);
  const R = Math.hypot(x, y);
  const ang = direction(x, y);
  const list = forces.map((f) => `$${f.F}$ N at $${deg(f.angle)}$`).join(', ');
  return {
    prompt: `Three forces act on a particle: ${list}. Each angle is measured anticlockwise from the positive $x$-direction. Find the magnitude of the resultant force and its direction, as an angle from $0^\\circ$ to $360^\\circ$ measured the same way. ${SF_TEXT} ${ANGLE_TEXT}`,
    figure: forceFigure(forces.map((f) => ({ angle: f.angle, label: `${f.F} N` })), 'Angles are measured anticlockwise from the positive x-direction'),
    parts: [sfPart(R, { label: 'Magnitude:', suffix: 'N' }), numPart(ang, { label: 'Direction:', decimals: 1, suffix: '°' })],
    hints: ['Resolve each force: the $x$-component is $F\\cos\\theta$ and the $y$-component is $F\\sin\\theta$, signs included.', 'Add the components, then find the magnitude with Pythagoras’ theorem and the direction with $\\tan^{-1}$, checking the quadrant.'],
    solution: [
      `$X = ${forces.map((f) => `${f.F}\\cos ${deg(f.angle)}`).join(' + ')} \\approx ${s3(x)}$`,
      `$Y = ${forces.map((f) => `${f.F}\\sin ${deg(f.angle)}`).join(' + ')} \\approx ${s3(y)}$`,
      `$R = \\sqrt{X^2 + Y^2} ${eq3(R)}$ N.`,
      `The resultant points into quadrant ${x > 0 ? (y > 0 ? 'I' : 'IV') : y > 0 ? 'II' : 'III'}, so its direction is about $${fmt(roundTo(ang, 1))}^\\circ$.`,
    ],
    calculator: true,
  };
}

function equilibrium(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const W = rng.int(10, 80);
    const th = rng.pick([15, 20, 25, 30, 35, 40, 45, 50]);
    const T = W / cosD(th);
    const P = W * Math.tan((th * Math.PI) / 180);
    return {
      prompt: `A particle of weight $${W}$ N hangs on a light string. A horizontal force of $P$ N holds it in equilibrium with the string at $${deg(th)}$ to the vertical. Find the tension in the string and the value of $P$. ${SF_TEXT}`,
      parts: [sfPart(T, { label: 'Tension:', suffix: 'N' }), sfPart(P, { label: '$P =$', suffix: 'N' })],
      hints: ['In equilibrium the forces balance in every direction. Resolve vertically and horizontally.', `Vertically: $T\\cos ${deg(th)} = ${W}$. Horizontally: $T\\sin ${deg(th)} = P$.`],
      solution: [`Vertically: $T\\cos ${deg(th)} = ${W}$, so $T = \\dfrac{${W}}{\\cos ${deg(th)}} ${eq3(T)}$ N.`, `Horizontally: $P = T\\sin ${deg(th)} ${eq3(P)}$ N.`],
      calculator: true,
    };
  }
  if (d === 2) {
    const W = rng.int(20, 120);
    const [a, b] = retry(() => [rng.pick([20, 25, 30, 35, 40, 45, 50, 55, 60]), rng.pick([20, 25, 30, 35, 40, 45, 50, 55, 60])], ([p, q]) => p !== q, 50);
    const s = sinD(a + b);
    const T1 = (W * cosD(b)) / s;
    const T2 = (W * cosD(a)) / s;
    return {
      prompt: `A lamp of weight $${W}$ N hangs in equilibrium from two light strings. One string makes an angle of $${deg(a)}$ with the horizontal and the other makes an angle of $${deg(b)}$ with the horizontal, on the other side. Find the tension in each string. ${SF_TEXT}`,
      figure: forceFigure([{ angle: 180 - a, label: 'T₁' }, { angle: b, label: 'T₂' }, { angle: 270, label: `${W} N` }], `T₁ at ${a}° and T₂ at ${b}° to the horizontal`),
      parts: [sfPart(T1, { label: `Tension at $${deg(a)}$, $T_1$:`, suffix: 'N' }), sfPart(T2, { label: `Tension at $${deg(b)}$, $T_2$:`, suffix: 'N' })],
      hints: [`Horizontally the pulls balance: $T_1\\cos ${deg(a)} = T_2\\cos ${deg(b)}$.`, `Vertically they hold up the weight: $T_1\\sin ${deg(a)} + T_2\\sin ${deg(b)} = ${W}$. Substitute for one tension and solve.`],
      solution: [
        `Horizontally: $T_1\\cos ${deg(a)} = T_2\\cos ${deg(b)}$, so $T_2 = T_1 \\dfrac{\\cos ${deg(a)}}{\\cos ${deg(b)}}$.`,
        `Vertically: $T_1\\sin ${deg(a)} + T_2\\sin ${deg(b)} = ${W}$. Substituting, $T_1 ${eq3(T1)}$ N.`,
        `Then $T_2 ${eq3(T2)}$ N.`,
      ],
      calculator: true,
    };
  }
  const [a, b, pp, qq] = retry(
    () => [rng.nonZero(-9, 9), rng.nonZero(-9, 9), rng.nonZero(-9, 9), rng.nonZero(-9, 9)],
    ([a, b, p, q]) => a + p !== 0 && b + q !== 0,
    100,
  );
  const [c2, e2] = [-(a + pp), -(b + qq)];
  const m = rng.pick([0.5, 2, 2.5, 4, 5]);
  const acc = Math.hypot(pp, qq) / m;
  return {
    prompt: `Three forces act on a particle of mass $${fmt(m)}$ kg: $\\mathbf{F}_1 = (${vecTex(a, b)})$ N, $\\mathbf{F}_2 = (${vecTex(c2, e2)})$ N and $\\mathbf{F}_3 = (p\\mathbf{i} + q\\mathbf{j})$ N. The particle is in equilibrium. Find $p$ and $q$. Then $\\mathbf{F}_3$ is removed: find the magnitude of the acceleration of the particle. ${SF_TEXT}`,
    parts: [numPart(pp, { label: '$p =$' }), numPart(qq, { label: '$q =$' }), sfPart(acc, { label: 'Acceleration:', suffix: 'm/s²' })],
    hints: ['In equilibrium the resultant force is zero, so the $\\mathbf{i}$-components add to $0$ and so do the $\\mathbf{j}$-components.', 'With $\\mathbf{F}_3$ removed, the resultant of the other two is $-\\mathbf{F}_3$. Use $|\\mathbf{F}| = ma$.'],
    solution: [
      `$\\mathbf{i}$: $${fmt(a)} + ${sp(c2)} + p = 0$, so $p = ${pp}$. $\\mathbf{j}$: $${fmt(b)} + ${sp(e2)} + q = 0$, so $q = ${qq}$.`,
      `Without $\\mathbf{F}_3$ the resultant is $-\\mathbf{F}_3$, of magnitude $\\sqrt{${sp(pp)}^2 + ${sp(qq)}^2} = \\sqrt{${pp * pp + qq * qq}}$ N.`,
      `$a = \\dfrac{\\sqrt{${pp * pp + qq * qq}}}{${fmt(m)}} ${eq3(acc)}$ m/s².`,
    ],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 13.2 Friction
// ---------------------------------------------------------------------------

const MU = [0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.6];

function frictionLimiting(rng: Rng, d: Difficulty): Out {
  const m = rng.int(2, 25);
  const mu = rng.pick(MU);
  const Fmax = mu * m * G;
  if (d === 1) {
    const P = retry(() => rng.int(Math.max(1, Math.round(Fmax * 0.5)), Math.round(Fmax * 1.6) + 2), (p) => Math.abs(p - Fmax) > 1, 100);
    const moves = P > Fmax;
    const F = moves ? Fmax : P;
    return {
      prompt: `A box of mass $${m}$ kg rests on rough horizontal ground. The coefficient of friction between the box and the ground is $${fmt(mu)}$. A horizontal force of $${P}$ N is applied to the box. Find the friction force on the box, and say whether the box moves. ${G_TEXT} ${SF_TEXT}`,
      parts: [sfPart(F, { label: 'Friction:', suffix: 'N' }), part(fixedChoice(['The box moves', 'The box stays at rest'], moves ? 0 : 1), { label: 'Does it move?' })],
      hints: ['The normal reaction is $R = mg$, so the greatest friction possible is $F_{\\max} = \\mu R$.', 'If the pull is no more than $F_{\\max}$, friction matches the pull and the box stays at rest. If it is more, friction is $F_{\\max}$ and the box moves.'],
      solution: [
        `$R = ${m} \\times 9.8 = ${fmt(roundTo(m * G, 6))}$ N, so $F_{\\max} = ${fmt(mu)} \\times ${fmt(roundTo(m * G, 6))} ${eq3(Fmax)}$ N.`,
        moves ? `$${P} > ${s3(Fmax)}$, so friction is limiting at $${s3(Fmax)}$ N and the box moves.` : `$${P} < ${s3(Fmax)}$, so friction only needs to be $${P}$ N to balance the pull, and the box stays at rest.`,
      ],
      calculator: true,
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const P = rng.int(Math.round(Fmax * 0.6) + 1, Math.round(Fmax * 1.4) + 3);
      const muFound = P / (m * G);
      return {
        prompt: `A crate of mass $${m}$ kg rests on rough horizontal ground. It is on the point of moving when a horizontal force of $${P}$ N is applied. Find the coefficient of friction between the crate and the ground. ${G_TEXT} ${SF_TEXT}`,
        parts: [sfPart(muFound, { label: '$\\mu =$' })],
        hints: ['“On the point of moving” means friction is limiting: $F = \\mu R$.', 'Resolving: $R = mg$ and $F = P$.'],
        solution: [`$R = ${m} \\times 9.8 = ${fmt(roundTo(m * G, 6))}$ N and $F = ${P}$ N.`, `$\\mu = \\dfrac{F}{R} = \\dfrac{${P}}{${fmt(roundTo(m * G, 6))}} ${eq3(muFound)}$`],
        calculator: true,
      };
    }
    return {
      prompt: `A crate of mass $${m}$ kg rests on rough horizontal ground, and the coefficient of friction is $${fmt(mu)}$. Find the smallest horizontal force that will make the crate move. ${G_TEXT} ${SF_TEXT}`,
      parts: [sfPart(Fmax, { suffix: 'N' })],
      hints: ['The crate moves once the pull is bigger than the greatest friction, $\\mu R$.', 'Here $R = mg$.'],
      solution: [`$R = ${m} \\times 9.8 = ${fmt(roundTo(m * G, 6))}$ N.`, `$F_{\\max} = ${fmt(mu)} \\times ${fmt(roundTo(m * G, 6))} ${eq3(Fmax)}$ N, so the force must be just over $${s3(Fmax)}$ N.`],
      calculator: true,
    };
  }
  const th = rng.pick([15, 20, 25, 30, 35, 40]);
  const P = Math.round((mu * m * G) / (cosD(th) + mu * sinD(th)));
  const R = m * G - P * sinD(th);
  const muFound = (P * cosD(th)) / R;
  return {
    prompt: `A sledge of mass $${m}$ kg rests on rough horizontal ground. A rope pulls it with a force of $${P}$ N at $${deg(th)}$ above the horizontal, and the sledge is on the point of moving. Find the normal reaction and the coefficient of friction. ${G_TEXT} ${SF_TEXT}`,
    parts: [sfPart(R, { label: 'Normal reaction:', suffix: 'N' }), sfPart(muFound, { label: '$\\mu =$' })],
    hints: ['Resolve vertically: the upward part of the pull, $P\\sin\\theta$, reduces the normal reaction.', 'Resolve horizontally: $F = P\\cos\\theta$. Friction is limiting, so $F = \\mu R$.'],
    solution: [
      `Vertically: $R + ${P}\\sin ${deg(th)} = ${m} \\times 9.8$, so $R ${eq3(R)}$ N.`,
      `Horizontally: $F = ${P}\\cos ${deg(th)} \\approx ${s3(P * cosD(th))}$ N.`,
      `$\\mu = \\dfrac{F}{R} ${eq3(muFound)}$`,
    ],
    calculator: true,
  };
}

function frictionMotion(rng: Rng, d: Difficulty): Out {
  const m = rng.int(2, 20);
  const mu = rng.pick(MU);
  if (d === 1) {
    const u = rng.int(3, 15);
    const dec = mu * G;
    const s = (u * u) / (2 * dec);
    return {
      prompt: `A puck slides across a rough horizontal surface, starting at $${u}$ m/s. The coefficient of friction is $${fmt(mu)}$ and no other horizontal force acts. Find the deceleration of the puck and the distance it slides before stopping. ${G_TEXT} ${SF_TEXT}`,
      parts: [sfPart(dec, { label: 'Deceleration:', suffix: 'm/s²' }), sfPart(s, { label: 'Distance:', suffix: 'm' })],
      hints: ['Friction is the only horizontal force, and the puck is sliding, so $F = \\mu R = \\mu mg$.', 'Then the deceleration is $\\dfrac{\\mu mg}{m} = \\mu g$. Use $v^2 = u^2 + 2as$ with $v = 0$.'],
      solution: [`$F = \\mu mg$, so the deceleration is $\\mu g = ${fmt(mu)} \\times 9.8 ${eq3(dec)}$ m/s². (The mass cancels.)`, `$0 = ${u}^2 - 2 \\times ${s3(dec)} \\times s$, so $s ${eq3(s)}$ m.`],
      calculator: true,
    };
  }
  if (d === 2) {
    const P = rng.int(Math.ceil(mu * m * G) + 2, Math.ceil(mu * m * G) + 60);
    const a = (P - mu * m * G) / m;
    const t = rng.int(2, 8);
    return {
      prompt: `A block of mass $${m}$ kg starts from rest on rough horizontal ground, where the coefficient of friction is $${fmt(mu)}$. It is pulled by a horizontal force of $${P}$ N. Find its acceleration, and its speed after $${t}$ s. ${G_TEXT} ${SF_TEXT}`,
      parts: [sfPart(a, { label: 'Acceleration:', suffix: 'm/s²' }), sfPart(a * t, { label: 'Speed:', suffix: 'm/s' })],
      hints: ['$R = mg$, and the block is moving, so friction is $\\mu R$, against the pull.', 'Resultant force $= P - \\mu R = ma$. Then $v = u + at$.'],
      solution: [
        `$R = ${fmt(roundTo(m * G, 6))}$ N and $F = ${fmt(mu)} \\times ${fmt(roundTo(m * G, 6))} ${eq3(mu * m * G)}$ N.`,
        `$${P} - ${s3(mu * m * G)} = ${m}a$, so $a ${eq3(a)}$ m/s².`,
        `$v = 0 + ${s3(a)} \\times ${t} ${eq3(a * t)}$ m/s.`,
      ],
      calculator: true,
    };
  }
  const th = rng.pick([15, 20, 25, 30, 35, 40]);
  const P = retry(() => rng.int(Math.ceil(mu * m * G) + 4, Math.ceil(m * G * 0.9)), (p) => p * cosD(th) - mu * (m * G - p * sinD(th)) > 0.5 && m * G - p * sinD(th) > 1, 200);
  const R = m * G - P * sinD(th);
  const a = (P * cosD(th) - mu * R) / m;
  return {
    prompt: `A box of mass $${m}$ kg is pulled along rough horizontal ground by a rope at $${deg(th)}$ above the horizontal. The tension in the rope is $${P}$ N and the coefficient of friction is $${fmt(mu)}$. Find the normal reaction and the acceleration of the box. ${G_TEXT} ${SF_TEXT}`,
    parts: [sfPart(R, { label: 'Normal reaction:', suffix: 'N' }), sfPart(a, { label: 'Acceleration:', suffix: 'm/s²' })],
    hints: ['Resolve vertically first: $R + P\\sin\\theta = mg$.', 'Friction is $\\mu R$. Horizontally, $P\\cos\\theta - \\mu R = ma$.'],
    solution: [
      `Vertically: $R = ${m} \\times 9.8 - ${P}\\sin ${deg(th)} ${eq3(R)}$ N.`,
      `Friction: $F = ${fmt(mu)} \\times ${s3(R)} \\approx ${s3(mu * R)}$ N.`,
      `Horizontally: $${P}\\cos ${deg(th)} - ${s3(mu * R)} = ${m}a$, so $a ${eq3(a)}$ m/s².`,
    ],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 13.3 Inclined planes
// ---------------------------------------------------------------------------

/** Slopes with exact sines and cosines. */
const TRIPLES: Array<{ tan: string; sin: number; cos: number; sinTex: string; cosTex: string; deg: number }> = [
  { tan: '\\tfrac{3}{4}', sin: 0.6, cos: 0.8, sinTex: '\\tfrac{3}{5}', cosTex: '\\tfrac{4}{5}', deg: atanD(0.75) },
  { tan: '\\tfrac{5}{12}', sin: 5 / 13, cos: 12 / 13, sinTex: '\\tfrac{5}{13}', cosTex: '\\tfrac{12}{13}', deg: atanD(5 / 12) },
  { tan: '\\tfrac{7}{24}', sin: 7 / 25, cos: 24 / 25, sinTex: '\\tfrac{7}{25}', cosTex: '\\tfrac{24}{25}', deg: atanD(7 / 24) },
];

function inclinedPlane(rng: Rng, d: Difficulty): Out {
  const m = rng.int(2, 20);
  if (d === 1) {
    const al = rng.pick([10, 15, 20, 25, 30, 35, 40]);
    const a = G * sinD(al);
    const R = m * G * cosD(al);
    return {
      prompt: `A particle $A$ of mass $${m}$ kg is released from rest on a smooth slope inclined at $${deg(al)}$ to the horizontal. Find its acceleration down the slope and the normal reaction from the slope. ${G_TEXT} ${SF_TEXT}`,
      figure: slopeFigure(al, `${al}°`),
      parts: [sfPart(a, { label: 'Acceleration:', suffix: 'm/s²' }), sfPart(R, { label: 'Normal reaction:', suffix: 'N' })],
      hints: ['Resolve the weight along the slope and at right angles to it: $mg\\sin\\alpha$ down the slope and $mg\\cos\\alpha$ into it.', 'The slope is smooth, so there is no friction: $mg\\sin\\alpha = ma$, and $R = mg\\cos\\alpha$.'],
      solution: [`Down the slope: $${m} \\times 9.8\\sin ${deg(al)} = ${m}a$, so $a = 9.8\\sin ${deg(al)} ${eq3(a)}$ m/s².`, `At right angles to the slope: $R = ${m} \\times 9.8\\cos ${deg(al)} ${eq3(R)}$ N.`],
      calculator: true,
    };
  }
  if (d === 2) {
    const al = rng.pick([25, 30, 35, 40, 45]);
    const mu = retry(() => rng.pick(MU), (x) => x < Math.tan((al * Math.PI) / 180) - 0.05, 50);
    const a = G * (sinD(al) - mu * cosD(al));
    const dist = rng.int(2, 12);
    const v = Math.sqrt(2 * a * dist);
    return {
      prompt: `A particle $A$ of mass $${m}$ kg slides down a rough slope inclined at $${deg(al)}$ to the horizontal, starting from rest. The coefficient of friction is $${fmt(mu)}$. Find its acceleration, and its speed after it has slid $${dist}$ m. ${G_TEXT} ${SF_TEXT}`,
      figure: slopeFigure(al, `${al}°`),
      parts: [sfPart(a, { label: 'Acceleration:', suffix: 'm/s²' }), sfPart(v, { label: 'Speed:', suffix: 'm/s' })],
      hints: ['At right angles to the slope, $R = mg\\cos\\alpha$. Friction acts up the slope, against the motion, and is $\\mu R$.', 'Down the slope: $mg\\sin\\alpha - \\mu R = ma$. Then $v^2 = u^2 + 2as$.'],
      solution: [
        `$R = ${m} \\times 9.8\\cos ${deg(al)} \\approx ${s3(m * G * cosD(al))}$ N, so friction is $${fmt(mu)}R \\approx ${s3(mu * m * G * cosD(al))}$ N.`,
        `$${m} \\times 9.8\\sin ${deg(al)} - ${s3(mu * m * G * cosD(al))} = ${m}a$, so $a = 9.8(\\sin ${deg(al)} - ${fmt(mu)}\\cos ${deg(al)}) ${eq3(a)}$ m/s².`,
        `$v^2 = 2 \\times ${s3(a)} \\times ${dist}$, so $v ${eq3(v)}$ m/s.`,
      ],
      calculator: true,
    };
  }
  const t = rng.pick(TRIPLES);
  const mu = retry(() => rng.pick(MU), (x) => Math.abs(x - t.sin / t.cos) > 0.04, 50);
  const u = rng.int(3, 14);
  const dec = G * (t.sin + mu * t.cos);
  const s = (u * u) / (2 * dec);
  const back = mu < t.sin / t.cos;
  return {
    prompt: `A particle $A$ is projected up a rough slope at $${u}$ m/s. The slope is inclined at an angle $\\alpha$ to the horizontal, where $\\tan\\alpha = ${t.tan}$, and the coefficient of friction is $${fmt(mu)}$. Find the deceleration of $A$ and the distance it travels up the slope before it stops. Then say whether it slides back down. ${G_TEXT} ${SF_TEXT}`,
    figure: slopeFigure(t.deg, 'α'),
    parts: [sfPart(dec, { label: 'Deceleration:', suffix: 'm/s²' }), sfPart(s, { label: 'Distance:', suffix: 'm' }), part(fixedChoice(['It slides back down', 'It stays at rest'], back ? 0 : 1), { label: 'Afterwards:' })],
    hints: [`From $\\tan\\alpha = ${t.tan}$, $\\sin\\alpha = ${t.sinTex}$ and $\\cos\\alpha = ${t.cosTex}$. Going up, friction acts down the slope, together with $mg\\sin\\alpha$.`, 'Once it stops, it slides back only if $mg\\sin\\alpha$ is more than the greatest friction $\\mu mg\\cos\\alpha$, that is, if $\\tan\\alpha > \\mu$.'],
    solution: [
      `Up the slope: $-(mg\\sin\\alpha + \\mu mg\\cos\\alpha) = ma$, so the deceleration is $9.8(${t.sinTex} + ${fmt(mu)} \\times ${t.cosTex}) ${eq3(dec)}$ m/s².`,
      `$0 = ${u}^2 - 2 \\times ${s3(dec)} \\times s$, so $s ${eq3(s)}$ m.`,
      back ? `$\\tan\\alpha = ${fmt(roundTo(t.sin / t.cos, 4))} > ${fmt(mu)}$, so friction cannot hold it: it slides back down.` : `$\\tan\\alpha = ${fmt(roundTo(t.sin / t.cos, 4))} < ${fmt(mu)}$, so friction can hold it: it stays at rest.`,
    ],
    calculator: true,
  };
}

function inclinedConnected(rng: Rng, d: Difficulty): Out {
  const t = rng.pick(TRIPLES);
  const al = d === 1 ? rng.pick([20, 25, 30, 35]) : t.deg;
  const [sinA, cosA] = d === 1 ? [sinD(al), cosD(al)] : [t.sin, t.cos];
  const mu = d === 3 ? rng.pick([0.1, 0.15, 0.2, 0.25, 0.3]) : 0;
  const [m1, m2] = retry(() => [rng.int(2, 12), rng.int(2, 12)] as const, ([p, q]) => q - p * (sinA + mu * cosA) > 0.3, 200);
  const a = (G * (m2 - m1 * sinA - mu * m1 * cosA)) / (m1 + m2);
  const T = m2 * (G - a);
  const slope = d === 1 ? `inclined at $${deg(al)}$ to the horizontal` : `inclined at $\\alpha$ to the horizontal, where $\\tan\\alpha = ${t.tan}$`;
  const setup = `A particle $A$ of mass $${m1}$ kg rests on a ${d === 3 ? 'rough' : 'smooth'} slope ${slope}${d === 3 ? `, with coefficient of friction $${fmt(mu)}$` : ''}. A light inextensible string joins $A$, parallel to the slope, over a smooth pulley at the top of the slope, to a particle $B$ of mass $${m2}$ kg hanging freely. The system is released from rest, and $B$ moves down.`;
  const sinT = d === 1 ? `\\sin ${deg(al)}` : t.sinTex;
  const cosT = d === 1 ? `\\cos ${deg(al)}` : t.cosTex;
  const eqA = `$T - ${m1}g \\times ${sinT}${d === 3 ? ` - ${fmt(mu)} \\times ${m1}g \\times ${cosT}` : ''} = ${m1}a$`;
  const eqB = `$${m2}g - T = ${m2}a$`;
  const hints = [
    `$A$ moves up the slope: the tension pulls it up, and the part of its weight along the slope, $m_A g\\sin\\alpha$, pulls it down${d === 3 ? ', with friction $\\mu m_A g\\cos\\alpha$ also down the slope' : ''}.`,
    'Write $F = ma$ for $A$ along the slope and for $B$ vertically, then add the two equations to remove $T$.',
  ];
  const solution = [`$A$: ${eqA}. $B$: ${eqB}.`, `Adding: $a = \\dfrac{9.8(${m2} - ${m1} \\times ${sinT}${d === 3 ? ` - ${fmt(mu)} \\times ${m1} \\times ${cosT}` : ''})}{${m1 + m2}} ${eq3(a)}$ m/s².`];
  if (d === 2) {
    const h = rng.pick([0.5, 0.8, 1, 1.5, 2]);
    const v = Math.sqrt(2 * a * h);
    return {
      prompt: `${setup} Find the acceleration of the particles, and the speed of $B$ when it has fallen $${fmt(h)}$ m. ${G_TEXT} ${SF_TEXT}`,
      figure: slopeFigure(al, 'α', true),
      parts: [sfPart(a, { label: 'Acceleration:', suffix: 'm/s²' }), sfPart(v, { label: 'Speed:', suffix: 'm/s' })],
      hints,
      solution: [...solution, `$v^2 = 2 \\times ${s3(a)} \\times ${fmt(h)}$, so $v ${eq3(v)}$ m/s.`],
      calculator: true,
    };
  }
  return {
    prompt: `${setup} Find the acceleration of the particles and the tension in the string. ${G_TEXT} ${SF_TEXT}`,
    figure: slopeFigure(al, d === 1 ? `${al}°` : 'α', true),
    parts: [sfPart(a, { label: 'Acceleration:', suffix: 'm/s²' }), sfPart(T, { label: 'Tension:', suffix: 'N' })],
    hints,
    solution: [...solution, `From $B$: $T = ${m2}(9.8 - ${s3(a)}) ${eq3(T)}$ N.`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 13.4 Projectiles
// ---------------------------------------------------------------------------

function projectileRange(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const H = rng.pick([4.9, 10, 19.6, 20, 25, 30, 40, 44.1, 50, 80]);
    const U = rng.int(5, 30);
    const t = Math.sqrt((2 * H) / G);
    const x = U * t;
    return {
      prompt: `A stone is thrown horizontally at $${U}$ m/s from the top of a cliff $${fmt(H)}$ m above the sea. Modelling the stone as a particle with no air resistance, find the time it takes to reach the sea and how far from the foot of the cliff it lands. ${G_TEXT} ${SF_TEXT}`,
      parts: [sfPart(t, { label: 'Time:', suffix: 's' }), sfPart(x, { label: 'Distance:', suffix: 'm' })],
      hints: ['Treat the two directions separately. Vertically the stone starts with no velocity and falls $' + fmt(H) + '$ m with acceleration $g$.', 'Horizontally there is no force, so the speed stays $' + U + '$ m/s: distance $=$ speed $\\times$ time.'],
      solution: [`Vertically (down): $${fmt(H)} = \\tfrac{1}{2} \\times 9.8 \\times t^2$, so $t = \\sqrt{\\dfrac{${fmt(H)}}{4.9}} ${eq3(t)}$ s.`, `Horizontally: $x = ${U} \\times ${s3(t)} ${eq3(x)}$ m.`],
      calculator: true,
    };
  }
  const U = rng.int(10, 40);
  const th = rng.pick([20, 25, 30, 35, 40, 45, 50, 55, 60, 65]);
  const [ux, uy] = [U * cosD(th), U * sinD(th)];
  if (d === 2) {
    const T = (2 * uy) / G;
    const R = ux * T;
    const Hm = (uy * uy) / (2 * G);
    return {
      prompt: `A ball is kicked from level ground at $${U}$ m/s at $${deg(th)}$ above the horizontal. Modelling it as a particle with no air resistance, find its time of flight, its range, and the greatest height it reaches. ${G_TEXT} ${SF_TEXT}`,
      parts: [sfPart(T, { label: 'Time of flight:', suffix: 's' }), sfPart(R, { label: 'Range:', suffix: 'm' }), sfPart(Hm, { label: 'Greatest height:', suffix: 'm' })],
      hints: [`Split the velocity: $${U}\\cos ${deg(th)}$ horizontally and $${U}\\sin ${deg(th)}$ vertically.`, 'Vertically: it lands when $s = 0$, and is highest when $v = 0$. Horizontally: range $=$ horizontal speed $\\times$ time of flight.'],
      solution: [
        `$u_x = ${U}\\cos ${deg(th)} \\approx ${s3(ux)}$ m/s and $u_y = ${U}\\sin ${deg(th)} \\approx ${s3(uy)}$ m/s.`,
        `Vertically, $0 = u_y t - 4.9t^2$, so $t = \\dfrac{u_y}{4.9} ${eq3(T)}$ s.`,
        `Range $= u_x \\times ${s3(T)} ${eq3(R)}$ m.`,
        `At the top $v_y = 0$: $0 = u_y^2 - 2 \\times 9.8 \\times h$, so $h = \\dfrac{u_y^2}{19.6} ${eq3(Hm)}$ m.`,
      ],
      calculator: true,
    };
  }
  const H = rng.pick([5, 8, 10, 12, 15, 20, 25]);
  const t = (uy + Math.sqrt(uy * uy + 2 * G * H)) / G;
  const x = ux * t;
  return {
    prompt: `A ball is thrown from the top of a building $${H}$ m high at $${U}$ m/s at $${deg(th)}$ above the horizontal, and lands on the level ground below. Modelling it as a particle with no air resistance, find the time it takes to land and the horizontal distance from the foot of the building to where it lands. ${G_TEXT} ${SF_TEXT}`,
    parts: [sfPart(t, { label: 'Time:', suffix: 's' }), sfPart(x, { label: 'Distance:', suffix: 'm' })],
    hints: [`Vertically, with upwards positive: $u_y = ${U}\\sin ${deg(th)}$, $a = -9.8$ and the ball lands at $s = -${H}$.`, 'Solve $-H = u_y t - 4.9t^2$ and keep the positive root. Then multiply by the horizontal speed.'],
    solution: [
      `$u_x = ${U}\\cos ${deg(th)} \\approx ${s3(ux)}$ and $u_y = ${U}\\sin ${deg(th)} \\approx ${s3(uy)}$ m/s.`,
      `$-${H} = ${s3(uy)}t - 4.9t^2$, so $4.9t^2 - ${s3(uy)}t - ${H} = 0$ and $t = \\dfrac{${s3(uy)} + \\sqrt{${s3(uy * uy)} + ${fmt(roundTo(19.6 * H, 4))}}}{9.8} ${eq3(t)}$ s.`,
      `Distance $= ${s3(ux)} \\times ${s3(t)} ${eq3(x)}$ m.`,
    ],
    calculator: true,
  };
}

function projectileVelocity(rng: Rng, d: Difficulty): Out {
  const [U, th, t] = retry(() => [rng.int(12, 40), rng.pick([25, 30, 35, 40, 45, 50, 55, 60]), rng.pick([0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4])] as const, ([U, th, t]) => Math.abs(U * sinD(th) - G * t) > 0.6 && U * sinD(th) * t - 4.9 * t * t > 0.5, 200);
  const vx = U * cosD(th);
  const vy = U * sinD(th) - G * t;
  const speed = Math.hypot(vx, vy);
  const setup = `A particle is projected from level ground at $${U}$ m/s at $${deg(th)}$ above the horizontal, and moves freely under gravity.`;
  if (d === 1) {
    return {
      prompt: `${setup} Find the horizontal and vertical components of its velocity $${fmt(t)}$ s after it is projected, taking upwards as positive. ${G_TEXT} ${SF_TEXT}`,
      parts: [sfPart(vx, { label: 'Horizontal:', suffix: 'm/s' }), sfPart(vy, { label: 'Vertical:', suffix: 'm/s' })],
      hints: ['The horizontal component never changes: $U\\cos\\theta$.', 'The vertical component changes by $-9.8$ m/s every second: $v_y = U\\sin\\theta - 9.8t$.'],
      solution: [`$v_x = ${U}\\cos ${deg(th)} ${eq3(vx)}$ m/s.`, `$v_y = ${U}\\sin ${deg(th)} - 9.8 \\times ${fmt(t)} ${eq3(vy)}$ m/s.`],
      calculator: true,
    };
  }
  const ang = atanD(Math.abs(vy) / vx);
  const steps = [`$v_x = ${U}\\cos ${deg(th)} \\approx ${s3(vx)}$ m/s and $v_y = ${U}\\sin ${deg(th)} - 9.8 \\times ${fmt(t)} \\approx ${s3(vy)}$ m/s.`, `Speed $= \\sqrt{v_x^2 + v_y^2} ${eq3(speed)}$ m/s.`];
  if (d === 2) {
    return {
      prompt: `${setup} Find its speed $${fmt(t)}$ s after it is projected. ${G_TEXT} ${SF_TEXT}`,
      parts: [sfPart(speed, { suffix: 'm/s' })],
      hints: ['Find the horizontal and vertical components of the velocity at that time.', 'The speed is the magnitude: $\\sqrt{v_x^2 + v_y^2}$.'],
      solution: steps,
      calculator: true,
    };
  }
  return {
    prompt: `${setup} Find its speed $${fmt(t)}$ s after it is projected, and the angle its direction of motion makes with the horizontal at that moment. Say whether it is then moving upwards or downwards. ${G_TEXT} ${SF_TEXT} ${ANGLE_TEXT}`,
    parts: [sfPart(speed, { label: 'Speed:', suffix: 'm/s' }), numPart(ang, { label: 'Angle:', decimals: 1, suffix: '°' }), part(fixedChoice(['Upwards', 'Downwards'], vy > 0 ? 0 : 1), { label: 'Moving:' })],
    hints: ['Find $v_x$ and $v_y$ at that time, then the speed with Pythagoras’ theorem.', 'The angle with the horizontal is $\\tan^{-1}\\left(\\dfrac{|v_y|}{v_x}\\right)$. The sign of $v_y$ says whether it is still rising.'],
    solution: [...steps, `Angle $= \\tan^{-1}\\left(\\dfrac{${s3(Math.abs(vy))}}{${s3(vx)}}\\right) \\approx ${fmt(roundTo(ang, 1))}^\\circ$, ${vy > 0 ? 'above the horizontal: $v_y > 0$, so it is still moving upwards' : 'below the horizontal: $v_y < 0$, so it is moving downwards'}.`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 13.5 Kinematics in two dimensions
// ---------------------------------------------------------------------------

function kinematicsVectors(rng: Rng, d: Difficulty): Out {
  const [p, q] = [rng.nonZero(-8, 8), rng.nonZero(-8, 8)];
  const [r, s] = [rng.pick([-3, -2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2, 3]), rng.pick([-3, -2, -1.5, -1, -0.5, 0.5, 1, 1.5, 2, 3])];
  const setup = (u: [number, number], a: [number, number]) => `A particle moves with constant acceleration $(${vecTex(a[0], a[1])})$ m/s². Its initial velocity is $(${vecTex(u[0], u[1])})$ m/s.`;
  if (d === 1) {
    const t = rng.int(2, 8);
    const [vx, vy] = [p + r * t, q + s * t];
    return {
      prompt: `${setup([p, q], [r, s])} Find its velocity after $${t}$ s, as $a\\mathbf{i} + b\\mathbf{j}$.`,
      parts: [numPart(vx, { label: '$\\mathbf{i}$-component:', exact: false }), numPart(vy, { label: '$\\mathbf{j}$-component:', exact: false })],
      hints: ['The constant acceleration formulae work with vectors: $\\mathbf{v} = \\mathbf{u} + \\mathbf{a}t$.', 'Work out the $\\mathbf{i}$ and $\\mathbf{j}$ parts separately.'],
      solution: [`$\\mathbf{v} = (${vecTex(p, q)}) + ${t}(${vecTex(r, s)})$`, `$= ${vecTex(vx, vy)}$ m/s`],
    };
  }
  if (d === 2) {
    const t = rng.int(2, 6);
    const [x, y] = [p * t + 0.5 * r * t * t, q * t + 0.5 * s * t * t];
    const [vx, vy] = [p + r * t, q + s * t];
    const dist = Math.hypot(x, y);
    const speed = Math.hypot(vx, vy);
    return {
      prompt: `${setup([p, q], [r, s])} It starts at the origin. After $${t}$ s, find its distance from the origin and its speed. ${SF_TEXT}`,
      parts: [sfPart(dist, { label: 'Distance:', suffix: 'm' }), sfPart(speed, { label: 'Speed:', suffix: 'm/s' })],
      hints: ['Position: $\\mathbf{r} = \\mathbf{u}t + \\tfrac{1}{2}\\mathbf{a}t^2$. Velocity: $\\mathbf{v} = \\mathbf{u} + \\mathbf{a}t$.', 'Distance and speed are the magnitudes of those vectors.'],
      solution: [
        `$\\mathbf{r} = ${t}(${vecTex(p, q)}) + \\tfrac{1}{2}(${t * t})(${vecTex(r, s)}) = ${vecTex(x, y)}$, so the distance is $\\sqrt{${sp(x)}^2 + ${sp(y)}^2} ${eq3(dist)}$ m.`,
        `$\\mathbf{v} = ${vecTex(vx, vy)}$, so the speed is $\\sqrt{${sp(vx)}^2 + ${sp(vy)}^2} ${eq3(speed)}$ m/s.`,
      ],
      calculator: true,
    };
  }
  // When does it move parallel to i (j-component of velocity zero)?
  const qq = Math.sign(-s) * rng.int(1, 8);
  const t = -qq / s;
  const pp = retry(() => rng.nonZero(-8, 8), (x) => Math.abs(x + r * t) >= 0.5, 100);
  const sp2 = Math.abs(pp + r * t);
  return {
    prompt: `${setup([pp, qq], [r, s])} Find the time at which it is moving parallel to $\\mathbf{i}$, and its speed at that time. ${SF_TEXT}`,
    parts: [sfPart(t, { label: 'Time:', suffix: 's' }), sfPart(sp2, { label: 'Speed:', suffix: 'm/s' })],
    hints: ['Moving parallel to $\\mathbf{i}$ means the velocity has no $\\mathbf{j}$-component.', `The $\\mathbf{j}$-component of $\\mathbf{v} = \\mathbf{u} + \\mathbf{a}t$ is $${fmt(qq)} + ${sp(s)}t$. Set it to $0$.`],
    solution: [
      `$\\mathbf{v} = (${fmt(pp)} + ${sp(r)}t)\\mathbf{i} + (${fmt(qq)} + ${sp(s)}t)\\mathbf{j}$.`,
      `$${fmt(qq)} + ${sp(s)}t = 0$, so $t ${eq3(t)}$ s.`,
      `Then $\\mathbf{v} = ${fmt(roundTo(pp + r * t, 4))}\\mathbf{i}$, so the speed is $${s3(sp2)}$ m/s.`,
    ],
    calculator: true,
  };
}

function kinematicsCalculus(rng: Rng, d: Difficulty): Out {
  const T = rng.int(1, 4);
  if (d < 3) {
    const [A, B, C] = [rng.nonZero(-3, 3), rng.int(-6, 6), rng.int(-8, 8)];
    const [D, E] = [rng.nonZero(-5, 5), rng.int(-9, 9)];
    const xs = poly([[A, 't^3'], [B, 't^2'], [C, 't']]);
    const ys = poly([[D, 't^2'], [E, 't']]);
    const vxs = poly([[3 * A, 't^2'], [2 * B, 't'], [C, '']]);
    const vys = poly([[2 * D, 't'], [E, '']]);
    const axs = poly([[6 * A, 't'], [2 * B, '']]);
    const r = `\\mathbf{r} = (${xs})\\mathbf{i} + (${ys})\\mathbf{j}`;
    const [vx, vy] = [3 * A * T * T + 2 * B * T + C, 2 * D * T + E];
    const [ax, ay] = [6 * A * T + 2 * B, 2 * D];
    if (d === 1) {
      return {
        prompt: `A particle moves in a plane so that its position vector, in metres, at time $t$ seconds is\n\n$$${r}$$\n\nFind its velocity when $t = ${T}$.`,
        parts: [numPart(vx, { label: '$\\mathbf{i}$-component:', exact: false }), numPart(vy, { label: '$\\mathbf{j}$-component:', exact: false })],
        hints: ['Velocity is the rate of change of position: $\\mathbf{v} = \\dfrac{d\\mathbf{r}}{dt}$.', 'Differentiate the $\\mathbf{i}$ and $\\mathbf{j}$ components separately, then substitute $t$.'],
        solution: [`$\\mathbf{v} = (${vxs})\\mathbf{i} + (${vys})\\mathbf{j}$`, `At $t = ${T}$: $\\mathbf{v} = ${vecTex(vx, vy)}$ m/s.`],
      };
    }
    const speed = Math.hypot(vx, vy);
    const acc = Math.hypot(ax, ay);
    return {
      prompt: `A particle moves in a plane so that its position vector, in metres, at time $t$ seconds is\n\n$$${r}$$\n\nFind its speed and the magnitude of its acceleration when $t = ${T}$. ${SF_TEXT}`,
      parts: [sfPart(speed, { label: 'Speed:', suffix: 'm/s' }), sfPart(acc, { label: 'Acceleration:', suffix: 'm/s²' })],
      hints: ['Differentiate once for the velocity and again for the acceleration.', 'Speed and the magnitude of the acceleration are the lengths of those vectors: $\\sqrt{x^2 + y^2}$.'],
      solution: [
        `$\\mathbf{v} = (${vxs})\\mathbf{i} + (${vys})\\mathbf{j}$, so at $t = ${T}$, $\\mathbf{v} = ${vecTex(vx, vy)}$ and the speed is $${s3(speed)}$ m/s.`,
        `$\\mathbf{a} = (${axs})\\mathbf{i} + ${sp(2 * D)}\\mathbf{j}$, so at $t = ${T}$, $\\mathbf{a} = ${vecTex(ax, ay)}$ and its magnitude is $${s3(acc)}$ m/s².`,
      ],
      calculator: true,
    };
  }
  const [P, Q, R, S] = [3 * rng.nonZero(-2, 2), rng.int(-6, 6), 2 * rng.nonZero(-3, 3), rng.int(-6, 6)];
  const [x0, y0] = [rng.int(-5, 5), rng.int(-5, 5)];
  const X = x0 + (P / 3) * T ** 3 + Q * T;
  const Y = y0 + (R / 2) * T * T + S * T;
  const vstr = `\\mathbf{v} = (${poly([[P, 't^2'], [Q, '']])})\\mathbf{i} + (${poly([[R, 't'], [S, '']])})\\mathbf{j}`;
  return {
    prompt: `A particle moves in a plane with velocity, in m/s, at time $t$ seconds\n\n$$${vstr}$$\n\nWhen $t = 0$ its position vector is $(${vecTex(x0, y0)})$ m. Find its position vector when $t = ${T}$.`,
    parts: [numPart(X, { label: '$\\mathbf{i}$-component:', exact: false }), numPart(Y, { label: '$\\mathbf{j}$-component:', exact: false })],
    hints: ['Position is the integral of velocity: $\\mathbf{r} = \\displaystyle\\int \\mathbf{v}\\,dt$, with a constant vector $\\mathbf{c}$.', 'Use the position at $t = 0$ to find $\\mathbf{c}$, then substitute $t$.'],
    solution: [
      `$\\mathbf{r} = (${poly([[P / 3, 't^3'], [Q, 't']])})\\mathbf{i} + (${poly([[R / 2, 't^2'], [S, 't']])})\\mathbf{j} + \\mathbf{c}$`,
      `At $t = 0$, $\\mathbf{r} = \\mathbf{c} = ${vecTex(x0, y0)}$.`,
      `At $t = ${T}$: $\\mathbf{r} = ${vecTex(X, Y)}$ m.`,
    ],
  };
}

// ---------------------------------------------------------------------------
// 13.6 Moments
// ---------------------------------------------------------------------------

function moments(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const F = rng.int(5, 80);
    const dist = rng.pick([0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.75, 1.2, 1.5, 2]);
    const M = F * dist;
    return {
      prompt: `A force of $${F}$ N is applied at right angles to a spanner, $${fmt(dist)}$ m from the centre of the nut. Find the moment of the force about the centre of the nut.`,
      parts: [sfPart(M, { suffix: 'N m' })],
      hints: ['The moment of a force about a point is the force times the perpendicular distance from the point to the line of the force.', 'Moments are measured in newton metres (N m).'],
      solution: [`Moment $= F \\times d = ${F} \\times ${fmt(dist)} ${eq3(M)}$ N m`],
    };
  }
  if (d === 2) {
    const L = rng.int(4, 10);
    const forces = retry(
      () => rng.sample(Array.from({ length: L - 1 }, (_, i) => i + 1), 3).map((x) => ({ x, F: rng.int(2, 20) * rng.sign() })),
      (fs) => Math.abs(fs.reduce((s, f) => s + f.F * f.x, 0)) > 2,
      100,
    );
    const total = forces.reduce((s, f) => s + f.F * f.x, 0);
    const list = forces.map((f) => `$${Math.abs(f.F)}$ N ${f.F > 0 ? 'upwards' : 'downwards'} at $${f.x}$ m from $A$`).join(', ');
    return {
      prompt: `A light rod $AB$ of length $${L}$ m is horizontal, with $A$ on the left. Three vertical forces act on it: ${list}. Find the size of the resultant moment of these forces about $A$, and its sense.`,
      figure: beamFigure(L, forces.filter((f) => f.F > 0).map((f) => ({ x: f.x, label: `${f.F} N` })), forces.filter((f) => f.F < 0).map((f) => ({ x: f.x, label: `${-f.F} N` }))),
      parts: [sfPart(Math.abs(total), { label: 'Resultant moment:', suffix: 'N m' }), part(fixedChoice(['Clockwise', 'Anticlockwise'], total > 0 ? 1 : 0), { label: 'Sense:' })],
      hints: ['With $A$ on the left, an upward force to the right of $A$ turns the rod anticlockwise about $A$, and a downward force turns it clockwise.', 'Take anticlockwise as positive, add the moments $F \\times d$ with their signs, and read the sense from the sign of the total.'],
      solution: [
        `Taking anticlockwise as positive, the moments about $A$ add to $${poly(forces.map((f) => [f.F, ` \\times ${f.x}`]))} = ${total}$ N m,`,
        `so the resultant moment is $${Math.abs(total)}$ N m ${total > 0 ? 'anticlockwise' : 'clockwise'}.`,
      ],
    };
  }
  const F = rng.int(10, 60);
  const L = rng.pick([0.4, 0.5, 0.8, 1, 1.2, 1.5, 2, 2.5, 3]);
  const th = rng.pick([20, 30, 40, 50, 60, 70]);
  const M = F * L * sinD(th);
  return {
    prompt: `A rod $AB$ of length $${fmt(L)}$ m is hinged at $A$. A force of $${F}$ N acts at $B$, at an angle of $${deg(th)}$ to the rod. Find the moment of the force about $A$. ${SF_TEXT}`,
    parts: [sfPart(M, { suffix: 'N m' })],
    hints: ['Only the part of the force at right angles to the rod turns it about $A$; the part along the rod passes through $A$.', 'The perpendicular component is $F\\sin\\theta$, at a distance equal to the length of the rod. (Equivalently, the perpendicular distance from $A$ to the line of the force is $L\\sin\\theta$.)'],
    solution: [`Perpendicular component $= ${F}\\sin ${deg(th)}$ N.`, `Moment $= ${F}\\sin ${deg(th)} \\times ${fmt(L)} ${eq3(M)}$ N m.`],
    calculator: true,
  };
}

function beams(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const L = rng.int(3, 8);
    const M = rng.int(5, 40);
    const m = rng.int(5, 60);
    const x = rng.int(1, 2 * L - 1) / 2;
    const RB = (M * G * (L / 2) + m * G * x) / L;
    const RA = (M + m) * G - RB;
    return {
      prompt: `A uniform beam $AB$ of length $${L}$ m and mass $${M}$ kg rests horizontally on two supports, one at $A$ and one at $B$. A load of mass $${m}$ kg is placed on the beam $${fmt(x)}$ m from $A$. Find the reactions at $A$ and at $B$. ${G_TEXT} ${SF_TEXT}`,
      figure: beamFigure(L, [{ x: 0, label: 'R_A' }, { x: L, label: 'R_B' }], [{ x: L / 2, label: `${M}g` }, { x, label: `${m}g` }]),
      parts: [sfPart(RA, { label: 'Reaction at $A$:', suffix: 'N' }), sfPart(RB, { label: 'Reaction at $B$:', suffix: 'N' })],
      hints: ['The beam is uniform, so its weight acts at its midpoint. Take moments about $A$: the reaction at $A$ then has no moment.', 'Then resolve vertically: the two reactions add up to the total weight.'],
      solution: [
        `Moments about $A$: $R_B \\times ${L} = ${M} \\times 9.8 \\times ${fmt(L / 2)} + ${m} \\times 9.8 \\times ${fmt(x)}$, so $R_B ${eq3(RB)}$ N.`,
        `Vertically: $R_A + R_B = ${M + m} \\times 9.8 = ${fmt(roundTo((M + m) * G, 6))}$, so $R_A ${eq3(RA)}$ N.`,
      ],
      calculator: true,
    };
  }
  const L = rng.int(4, 10);
  const W = rng.int(4, 30) * 10;
  const c = rng.int(0, 2) * 0.5;
  const dd = L - rng.int(0, 3) * 0.5;
  if (d === 2) {
    const [P, x] = retry(() => [rng.int(3, 12) * 50, rng.int(Math.ceil(2 * c) + 1, Math.floor(2 * dd) - 1) / 2] as const, ([P, x]) => {
      const RD = (W * (L / 2 - c) + P * (x - c)) / (dd - c);
      return RD > 0 && W + P - RD > 0 && x !== L / 2;
    }, 100);
    const RD = (W * (L / 2 - c) + P * (x - c)) / (dd - c);
    const RC = W + P - RD;
    return {
      prompt: `A uniform plank $AB$ of length $${L}$ m and weight $${W}$ N rests horizontally on two supports, at $C$ and $D$, where $AC = ${fmt(c)}$ m and $AD = ${fmt(dd)}$ m. A man of weight $${P}$ N stands on the plank $${fmt(x)}$ m from $A$. Find the reactions at $C$ and $D$. ${SF_TEXT}`,
      figure: beamFigure(L, [{ x: c, label: 'R_C' }, { x: dd, label: 'R_D' }], [{ x: L / 2, label: `${W} N` }, { x, label: `${P} N` }]),
      parts: [sfPart(RC, { label: 'Reaction at $C$:', suffix: 'N' }), sfPart(RD, { label: 'Reaction at $D$:', suffix: 'N' })],
      hints: ['Take moments about $C$, so that the reaction at $C$ drops out. Measure every distance from $C$.', 'Then resolve vertically to find the other reaction.'],
      solution: [
        `Moments about $C$: $R_D \\times ${fmt(dd - c)} = ${W} \\times ${fmt(L / 2 - c)} + ${P} \\times ${sp(x - c)}$, so $R_D ${eq3(RD)}$ N.`,
        `Vertically: $R_C + R_D = ${W + P}$, so $R_C ${eq3(RC)}$ N.`,
      ],
      calculator: true,
    };
  }
  // On the point of tilting about D: the reaction at C is zero.
  const Lt = rng.int(5, 10);
  const Wt = rng.int(4, 30) * 10;
  const ct = rng.int(1, 3) * 0.5;
  const [Dt, P] = retry(() => [Lt - rng.int(1, 4) * 0.5, rng.int(3, 12) * 50] as const, ([D, P]) => D > Lt / 2 + 0.4 && D + (Wt * (D - Lt / 2)) / P < Lt - 0.05, 200);
  const x = Dt + (Wt * (Dt - Lt / 2)) / P;
  return {
    prompt: `A uniform plank $AB$ of length $${Lt}$ m and weight $${Wt}$ N rests horizontally on supports at $C$ and $D$, where $AC = ${fmt(ct)}$ m and $AD = ${fmt(Dt)}$ m. A child of weight $${P}$ N walks along the plank from $D$ towards $B$. Find how far from $A$ the child is when the plank is on the point of tilting, and the reaction at $D$ at that moment. ${SF_TEXT}`,
    figure: beamFigure(Lt, [{ x: ct, label: 'R_C' }, { x: Dt, label: 'R_D' }], [{ x: Lt / 2, label: `${Wt} N` }]),
    parts: [sfPart(x, { label: 'Distance from $A$:', suffix: 'm' }), sfPart(Wt + P, { label: 'Reaction at $D$:', suffix: 'N' })],
    hints: ['On the point of tilting about $D$, the plank is about to lift off $C$, so the reaction at $C$ is $0$.', 'Take moments about $D$: the plank’s weight on one side balances the child’s weight on the other.'],
    solution: [
      'On the point of tilting about $D$, $R_C = 0$.',
      `Moments about $D$: $${Wt} \\times ${fmt(Dt - Lt / 2)} = ${P} \\times (x - ${fmt(Dt)})$, so $x - ${fmt(Dt)} ${eq3(x - Dt)}$ and $x ${eq3(x)}$ m.`,
      `Vertically: $R_D = ${Wt} + ${P} = ${Wt + P}$ N.`,
    ],
    calculator: true,
  };
}

export const FORCES_SKILLS: SkillDef[] = [
  skill({ id: 'mx-resolve-forces', name: 'Resolving forces', description: 'Find the components of a force, and the magnitude and direction of the resultant of several forces', outcomes: ['ME6'], lessonId: 'mx-13-1', calculator: true, gen: resolveForces }),
  skill({ id: 'mx-equilibrium', name: 'Forces in equilibrium', description: 'Find unknown forces and tensions when a particle is in equilibrium', outcomes: ['ME6'], lessonId: 'mx-13-1', calculator: true, gen: equilibrium }),
  skill({ id: 'mx-friction-limiting', name: 'Limiting friction', description: 'Use F ≤ μR to decide whether an object moves, and find a coefficient of friction', outcomes: ['ME7'], lessonId: 'mx-13-2', calculator: true, gen: frictionLimiting }),
  skill({ id: 'mx-friction-motion', name: 'Motion with friction', description: 'Find accelerations and distances when friction acts, including with a pull at an angle', outcomes: ['ME7'], lessonId: 'mx-13-2', calculator: true, gen: frictionMotion }),
  skill({ id: 'mx-inclined-plane', name: 'Inclined planes', description: 'Find accelerations, reactions and distances for a particle on a smooth or rough slope', outcomes: ['ME8'], lessonId: 'mx-13-3', calculator: true, gen: inclinedPlane }),
  skill({ id: 'mx-inclined-connected', name: 'Connected particles on a slope', description: 'Find the acceleration and tension for a particle on a slope joined over a pulley to a hanging particle', outcomes: ['ME8'], lessonId: 'mx-13-3', calculator: true, gen: inclinedConnected }),
  skill({ id: 'mx-projectile-range', name: 'Projectiles: time, range and height', description: 'Find the time of flight, the range and the greatest height of a projectile', outcomes: ['ME9'], lessonId: 'mx-13-4', calculator: true, gen: projectileRange }),
  skill({ id: 'mx-projectile-velocity', name: 'Projectiles: velocity', description: 'Find the velocity of a projectile at a given time, its speed and its direction of motion', outcomes: ['ME9'], lessonId: 'mx-13-4', calculator: true, gen: projectileVelocity }),
  skill({ id: 'mx-kinematics-vectors', name: 'Constant acceleration with vectors', description: 'Use v = u + at and r = ut + ½at² with vectors in two dimensions', outcomes: ['ME10'], lessonId: 'mx-13-5', calculator: true, gen: kinematicsVectors }),
  skill({ id: 'mx-kinematics-calculus', name: 'Kinematics with calculus in 2D', description: 'Differentiate and integrate position and velocity vectors that depend on time', outcomes: ['ME10'], lessonId: 'mx-13-5', calculator: true, gen: kinematicsCalculus }),
  skill({ id: 'mx-moments', name: 'Moments', description: 'Find the moment of a force about a point, and the resultant moment of several forces with its sense', outcomes: ['ME11'], lessonId: 'mx-13-6', calculator: true, gen: moments }),
  skill({ id: 'mx-beams', name: 'Beams in equilibrium', description: 'Take moments to find the reactions on a beam, and where it is on the point of tilting', outcomes: ['ME11'], lessonId: 'mx-13-6', calculator: true, gen: beams }),
];
