/** More Mathematics Topics, Unit 22: segments, frustums, Heron's formula, cyclic quadrilaterals, chords and tangents, and longitude and latitude. */
import { numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { cosD, fmt, roundTo, sinD } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';
import { NAMES } from './common.ts';

type Out = GenOutput;

const PI = Math.PI;
const f2 = (v: number) => fmt(v, 2);
const f4 = (v: number) => fmt(v, 4);
const isWhole = (v: number) => Math.abs(v - Math.round(v)) < 1e-9;
/** "= 12" when whole, otherwise "≈ 12.35". */
const eq2 = (v: number) => (isWhole(v) ? `= ${fmt(Math.round(v))}` : `\\approx ${f2(v)}`);

// ---------------------------------------------------------------------------
// 22.1 Segments of a circle
// ---------------------------------------------------------------------------

const sectorArea = (r: number, t: number) => (t / 360) * PI * r * r;
const triArea = (r: number, t: number) => 0.5 * r * r * sinD(t);

function segmentArea(rng: Rng, d: Difficulty): Out {
  const r = rng.int(4, 15);
  const t = d === 1 ? 90 : rng.pick([40, 50, 60, 70, 80, 100, 110, 120, 130, 140, 150]);
  const sec = sectorArea(r, t);
  const tri = triArea(r, t);
  const minor = sec - tri;
  const setup = `A chord $AB$ of a circle with centre $O$ and radius $${r}$ cm subtends an angle of $${t}°$ at $O$.`;
  const steps = [
    `Sector $AOB$: $\\dfrac{${t}}{360} \\times \\pi \\times ${r}^2 \\approx ${f4(sec)}$ cm²`,
    `Triangle $AOB$: $\\dfrac{1}{2} \\times ${r}^2 \\times \\sin ${t}° ${t === 90 ? '=' : '\\approx'} ${f4(tri)}$ cm²`,
    `Minor segment $= ${f4(sec)} - ${f4(tri)} \\approx ${f2(minor)}$ cm²`,
  ];
  if (d === 3) {
    const major = PI * r * r - minor;
    return {
      prompt: `${setup} Find the area of the major segment cut off by $AB$, to 2 decimal places.`,
      parts: [numPart(major, { decimals: 2, suffix: 'cm²' })],
      hints: ['First find the minor segment: the sector $AOB$ minus the triangle $AOB$.', 'The major segment is the rest of the circle: the area of the circle minus the minor segment.'],
      solution: [...steps, `Circle: $\\pi \\times ${r}^2 \\approx ${f4(PI * r * r)}$ cm²`, `Major segment $= ${f4(PI * r * r)} - ${f4(minor)} \\approx ${f2(major)}$ cm²`],
      calculator: true,
    };
  }
  return {
    prompt: `${setup} Find the area of the minor segment cut off by $AB$, to 2 decimal places.`,
    parts: [numPart(minor, { decimals: 2, suffix: 'cm²' })],
    hints: ['The segment is the sector $AOB$ with the triangle $AOB$ taken away.', `The sector is $\\dfrac{\\theta}{360} \\times \\pi r^2$, and the triangle is $\\dfrac{1}{2}r^2 \\sin\\theta$${t === 90 ? ', which is $\\dfrac{1}{2}r^2$ for a right angle' : ''}.`],
    solution: steps,
    calculator: true,
  };
}

function segmentPerimeter(rng: Rng, d: Difficulty): Out {
  const r = rng.int(4, 15);
  const t = d === 1 ? rng.pick([60, 90, 120]) : rng.pick([40, 50, 70, 80, 100, 110, 130, 140, 150]);
  const chord = 2 * r * sinD(t / 2);
  const arc = (t / 360) * 2 * PI * r;
  const setup = `A chord $AB$ of a circle with centre $O$ and radius $${r}$ cm subtends an angle of $${t}°$ at $O$.`;
  const chordStep = `Chord: $AB = 2 \\times ${r} \\times \\sin ${t / 2}° ${isWhole(chord) ? '=' : '\\approx'} ${f4(chord)}$ cm`;
  if (d === 1) {
    return {
      prompt: `${setup} Find the length of the chord $AB$, to 2 decimal places.`,
      parts: [numPart(chord, { decimals: 2, suffix: 'cm' })],
      hints: ['The line from $O$ to the midpoint of the chord cuts triangle $AOB$ into two equal right-angled triangles.', `Each has an angle of $${t / 2}°$ at $O$ and a hypotenuse of $${r}$ cm, so half the chord is $${r} \\sin ${t / 2}°$.`],
      solution: ['$AB = 2r \\sin\\dfrac{\\theta}{2}$', chordStep.replace('Chord: ', ''), `$AB \\approx ${f2(chord)}$ cm`],
      calculator: true,
    };
  }
  if (d === 2) {
    return {
      prompt: `${setup} Find the perimeter of the minor segment cut off by $AB$, to 2 decimal places.`,
      parts: [numPart(arc + chord, { decimals: 2, suffix: 'cm' })],
      hints: ['The perimeter of a segment is the arc plus the chord.', 'The arc is $\\dfrac{\\theta}{360} \\times 2\\pi r$, and the chord is $2r \\sin\\dfrac{\\theta}{2}$.'],
      solution: [`Arc: $\\dfrac{${t}}{360} \\times 2\\pi \\times ${r} \\approx ${f4(arc)}$ cm`, chordStep, `Perimeter $= ${f4(arc)} + ${f4(chord)} \\approx ${f2(arc + chord)}$ cm`],
      calculator: true,
    };
  }
  // Find the radius from the chord and the angle.
  const c = roundTo(chord, 1);
  const back = c / (2 * sinD(t / 2));
  return {
    prompt: `A chord of length $${fmt(c)}$ cm subtends an angle of $${t}°$ at the centre of a circle. Find the radius of the circle, to 2 decimal places.`,
    parts: [numPart(back, { decimals: 2, suffix: 'cm' })],
    hints: ['Use chord $= 2r \\sin\\dfrac{\\theta}{2}$.', 'Rearrange to make $r$ the subject.'],
    solution: [`$${fmt(c)} = 2r \\sin ${t / 2}°$`, `$r = \\dfrac{${fmt(c)}}{2 \\sin ${t / 2}°} \\approx ${f2(back)}$ cm`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 22.2 Frustums
// ---------------------------------------------------------------------------

function frustumVolume(rng: Rng, d: Difficulty): Out {
  // A cone of radius R and height H, cut at a fraction k of its height from the top.
  const [num, den] = rng.pick([[1, 2], [1, 3], [2, 3], [2, 5], [3, 5], [1, 4], [3, 4]] as Array<[number, number]>);
  const R = den * rng.int(1, 3);
  const H = den * rng.int(2, 4);
  const r = (R * num) / den;
  const h = (H * num) / den;
  const big = (PI * R * R * H) / 3;
  const small = (PI * r * r * h) / 3;
  const vol = big - small;
  const subtract = [`Whole cone: $\\dfrac{1}{3}\\pi \\times ${R}^2 \\times ${H} \\approx ${f4(big)}$ cm³`, `Small cone: $\\dfrac{1}{3}\\pi \\times ${r}^2 \\times ${h} \\approx ${f4(small)}$ cm³`, `Frustum $= ${f4(big)} - ${f4(small)} \\approx ${f2(vol)}$ cm³`];
  if (d === 1) {
    return {
      prompt: `A cone has a base radius of $${R}$ cm and a height of $${H}$ cm. A small cone with a base radius of $${r}$ cm and a height of $${h}$ cm is cut from its top. Find the volume of the frustum that is left, to 2 decimal places.`,
      parts: [numPart(vol, { decimals: 2, suffix: 'cm³' })],
      hints: ['The frustum is the whole cone with the small cone taken away.', 'The volume of a cone is $\\dfrac{1}{3}\\pi r^2 h$.'],
      solution: subtract,
      calculator: true,
    };
  }
  if (d === 2) {
    return {
      prompt: `A frustum of a cone has a base radius of $${R}$ cm, a top radius of $${r}$ cm and a height of $${H - h}$ cm. Find its volume, to 2 decimal places.`,
      parts: [numPart(vol, { decimals: 2, suffix: 'cm³' })],
      hints: [`Complete the cone. If the small cone that was removed has height $x$ cm, similar triangles give $\\dfrac{x}{x + ${H - h}} = \\dfrac{${r}}{${R}}$.`, 'Then subtract the small cone from the whole cone.'],
      solution: [`Let the removed cone have height $x$ cm. By similar triangles, $\\dfrac{x}{x + ${H - h}} = \\dfrac{${r}}{${R}}$, so $${R}x = ${r === 1 ? '' : r}x + ${r * (H - h)}$ and $x = ${h}$.`, `The whole cone has height $${h} + ${H - h} = ${H}$ cm.`, ...subtract],
      calculator: true,
    };
  }
  const litres = vol / 1000;
  const name = rng.pick(NAMES);
  const [Rb, rb, hb] = [R * 5, r * 5, (H - h) * 5];
  const volB = vol * 125;
  return {
    prompt: `${name}’s bucket is a frustum of a cone. The top has a radius of $${Rb}$ cm, the bottom has a radius of $${rb}$ cm, and the bucket is $${hb}$ cm deep. Find how much water it holds in litres, to 2 decimal places. ($1$ litre $= 1000$ cm³.)`,
    parts: [numPart(volB / 1000, { decimals: 2, suffix: 'litres' })],
    hints: [`Complete the cone below the bucket. If the missing cone has height $x$ cm, then $\\dfrac{x}{x + ${hb}} = \\dfrac{${rb}}{${Rb}}$.`, 'Subtract the missing cone from the whole cone, then divide by $1000$ to change cm³ to litres.'],
    solution: [
      `$\\dfrac{x}{x + ${hb}} = \\dfrac{${rb}}{${Rb}}$ gives $x = ${h * 5}$, so the whole cone is $${H * 5}$ cm high.`,
      `Whole cone: $\\dfrac{1}{3}\\pi \\times ${Rb}^2 \\times ${H * 5} \\approx ${fmt(big * 125, 2)}$ cm³`,
      `Missing cone: $\\dfrac{1}{3}\\pi \\times ${rb}^2 \\times ${h * 5} \\approx ${fmt(small * 125, 2)}$ cm³`,
      `Bucket $\\approx ${fmt(volB, 2)}$ cm³ $\\approx ${f2(litres * 125)}$ litres`,
    ],
    calculator: true,
  };
}

function frustumSurface(rng: Rng, d: Difficulty): Out {
  // Radii and height from a 3-4-5 or 5-12-13 triangle, so the slant height is whole.
  const [dr, h, l] = rng.pick([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17]] as Array<[number, number, number]>);
  const r = rng.int(2, 8);
  const R = r + dr;
  const curved = PI * (R + r) * l;
  const total = curved + PI * R * R + PI * r * r;
  if (d === 1) {
    return {
      prompt: `A frustum of a cone has end radii of $${R}$ cm and $${r}$ cm and a slant height of $${l}$ cm. Find its curved surface area, to 2 decimal places.`,
      parts: [numPart(curved, { decimals: 2, suffix: 'cm²' })],
      hints: ['The curved surface area of a frustum is $\\pi(R + r)l$, where $l$ is the slant height.', `Here $R + r = ${R + r}$.`],
      solution: [`$\\pi(R + r)l = \\pi \\times (${R} + ${r}) \\times ${l} = ${(R + r) * l}\\pi \\approx ${f2(curved)}$ cm²`],
      calculator: true,
    };
  }
  const slant = `The slant height is the hypotenuse of a right-angled triangle with sides $${h}$ and $${R} - ${r} = ${dr}$: $l = \\sqrt{${h}^2 + ${dr}^2} = ${l}$ cm.`;
  if (d === 2) {
    return {
      prompt: `A frustum of a cone has end radii of $${R}$ cm and $${r}$ cm and a vertical height of $${h}$ cm. Find its curved surface area, to 2 decimal places.`,
      parts: [numPart(curved, { decimals: 2, suffix: 'cm²' })],
      hints: [`First find the slant height. It is the hypotenuse of a right-angled triangle whose other sides are the height, $${h}$ cm, and the difference of the radii, $${dr}$ cm.`, 'Then use $\\pi(R + r)l$.'],
      solution: [slant, `$\\pi(R + r)l = \\pi \\times ${R + r} \\times ${l} = ${(R + r) * l}\\pi \\approx ${f2(curved)}$ cm²`],
      calculator: true,
    };
  }
  return {
    prompt: `A solid frustum of a cone has end radii of $${R}$ cm and $${r}$ cm and a vertical height of $${h}$ cm. Find its total surface area, including both circular ends, to 2 decimal places.`,
    parts: [numPart(total, { decimals: 2, suffix: 'cm²' })],
    hints: ['The total surface area is the curved surface plus the two circles.', `Find the slant height first, from the height $${h}$ cm and the difference of the radii, $${dr}$ cm.`],
    solution: [slant, `Curved surface: $\\pi \\times ${R + r} \\times ${l} = ${(R + r) * l}\\pi$`, `Ends: $\\pi \\times ${R}^2 + \\pi \\times ${r}^2 = ${R * R + r * r}\\pi$`, `Total $= ${(R + r) * l + R * R + r * r}\\pi \\approx ${f2(total)}$ cm²`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 22.3 Heron's formula
// ---------------------------------------------------------------------------

/** Triangles with whole sides and a whole area. */
const HERONIAN: Array<[number, number, number]> = [[3, 4, 5], [5, 5, 6], [5, 5, 8], [6, 8, 10], [5, 12, 13], [13, 14, 15], [9, 10, 17], [7, 15, 20], [10, 13, 13], [8, 15, 17], [11, 13, 20], [12, 17, 25], [13, 20, 21], [10, 17, 21], [4, 13, 15], [9, 12, 15]];
const heron = (a: number, b: number, c: number) => {
  const s = (a + b + c) / 2;
  return Math.sqrt(s * (s - a) * (s - b) * (s - c));
};
const heronSteps = (a: number, b: number, c: number, unit: string) => {
  const s = (a + b + c) / 2;
  const A = heron(a, b, c);
  return [`$s = \\dfrac{${fmt(a)} + ${fmt(b)} + ${fmt(c)}}{2} = ${fmt(s)}$`, `Area $= \\sqrt{${fmt(s)}(${fmt(s)} - ${fmt(a)})(${fmt(s)} - ${fmt(b)})(${fmt(s)} - ${fmt(c)})} = \\sqrt{${fmt(s)} \\times ${fmt(s - a)} \\times ${fmt(s - b)} \\times ${fmt(s - c)}}$`, `$= \\sqrt{${fmt(s * (s - a) * (s - b) * (s - c))}} ${eq2(A)}$ ${unit}²`];
};
const anyTriangle = (rng: Rng): [number, number, number] =>
  retry(
    () => [rng.int(5, 20), rng.int(5, 20), rng.int(5, 20)] as [number, number, number],
    ([a, b, c]) => a + b > c + 1 && a + c > b + 1 && b + c > a + 1 && !isWhole(heron(a, b, c)),
    200,
  );

function heronArea(rng: Rng, d: Difficulty): Out {
  const hints = ['First find the semi-perimeter $s$, half the sum of the three sides.', 'Then the area is $\\sqrt{s(s - a)(s - b)(s - c)}$.'];
  if (d === 1) {
    const [a, b, c] = rng.shuffle([...rng.pick(HERONIAN)]) as [number, number, number];
    return {
      prompt: `A triangle has sides of $${a}$ cm, $${b}$ cm and $${c}$ cm. Use Heron’s formula to find its area.`,
      parts: [numPart(Math.round(heron(a, b, c)), { suffix: 'cm²', exact: false })],
      hints,
      solution: heronSteps(a, b, c, 'cm'),
    };
  }
  const [a, b, c] = anyTriangle(rng);
  const A = heron(a, b, c);
  if (d === 2) {
    return {
      prompt: `A triangular field has sides of $${a}$ m, $${b}$ m and $${c}$ m. Find its area, to 2 decimal places.`,
      parts: [numPart(A, { decimals: 2, suffix: 'm²' })],
      hints,
      solution: heronSteps(a, b, c, 'm'),
      calculator: true,
    };
  }
  const rate = rng.pick([1.5, 2, 2.5, 4]);
  const name = rng.pick(NAMES);
  return {
    prompt: `${name} is planting grass on a triangular lawn with sides of $${a}$ m, $${b}$ m and $${c}$ m. Grass seed costs \\$${fmt(rate)} for each square metre. Find the cost of the seed, to the nearest cent.`,
    parts: [numPart(A * rate, { decimals: 2, tolerance: 0.011, label: '\\$' })],
    hints: ['Find the area of the lawn with Heron’s formula.', `Multiply the area by the cost of one square metre, \\$${fmt(rate)}.`],
    solution: [...heronSteps(a, b, c, 'm'), `Cost $= ${f4(A)} \\times ${fmt(rate)} \\approx ${(A * rate).toFixed(2)}$ dollars`],
    calculator: true,
  };
}

function heronApply(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    // The altitude to the longest side of a Heronian triangle.
    const t = rng.pick(HERONIAN);
    const base = Math.max(...t);
    const A = heron(...t);
    const alt = (2 * A) / base;
    return {
      prompt: `A triangle has sides of $${t[0]}$ cm, $${t[1]}$ cm and $${t[2]}$ cm, and Heron’s formula gives its area as $${fmt(Math.round(A))}$ cm². Find the height of the triangle measured from its longest side${isWhole(alt) ? '' : ', to 2 decimal places'}.`,
      parts: [isWhole(alt) ? numPart(Math.round(alt), { suffix: 'cm', exact: false }) : numPart(alt, { decimals: 2, suffix: 'cm' })],
      hints: ['The area of a triangle is also $\\dfrac{1}{2} \\times$ base $\\times$ height.', `Use the longest side, $${base}$ cm, as the base and solve for the height.`],
      solution: [`$${fmt(Math.round(A))} = \\dfrac{1}{2} \\times ${base} \\times h$`, `$h = \\dfrac{2 \\times ${fmt(Math.round(A))}}{${base}} ${eq2(alt)}$ cm`],
    };
  }
  if (d === 2) {
    const [a, b, c] = anyTriangle(rng);
    const A = heron(a, b, c);
    const base = Math.min(a, b, c);
    const alt = (2 * A) / base;
    return {
      prompt: `A triangle has sides of $${a}$ cm, $${b}$ cm and $${c}$ cm. Find the height of the triangle measured from its shortest side, to 2 decimal places.`,
      parts: [numPart(alt, { decimals: 2, suffix: 'cm' })],
      hints: ['Find the area with Heron’s formula.', `Then use area $= \\dfrac{1}{2} \\times$ base $\\times$ height, with the shortest side, $${base}$ cm, as the base.`],
      solution: [...heronSteps(a, b, c, 'cm'), `$h = \\dfrac{2 \\times ${f4(A)}}{${base}} \\approx ${f2(alt)}$ cm`],
      calculator: true,
    };
  }
  // A quadrilateral split by a diagonal into two triangles.
  const [t1, t2] = retry(
    () => [rng.pick(HERONIAN), rng.pick(HERONIAN)] as [[number, number, number], [number, number, number]],
    ([p, q]) => p !== q && Math.max(...p) === Math.max(...q),
    400,
  );
  const diag = Math.max(...t1);
  const rest = (t: [number, number, number]) => {
    const i = t.indexOf(diag);
    return t.filter((_, j) => j !== i) as [number, number];
  };
  const [ab, bc] = rest(t1);
  const [cd, da] = rest(t2);
  const A1 = Math.round(heron(...t1));
  const A2 = Math.round(heron(...t2));
  return {
    prompt: `A plot of land is a quadrilateral $ABCD$ with $AB = ${ab}$ m, $BC = ${bc}$ m, $CD = ${cd}$ m and $DA = ${da}$ m. The diagonal $AC$ is $${diag}$ m. Find the area of the plot.`,
    parts: [numPart(A1 + A2, { suffix: 'm²', exact: false })],
    hints: ['The diagonal $AC$ splits the plot into two triangles, $ABC$ and $ACD$.', 'Find the area of each triangle with Heron’s formula, and add.'],
    solution: [`Triangle $ABC$ has sides $${ab}$, $${bc}$ and $${diag}$: $s = ${fmt((ab + bc + diag) / 2)}$, area $= ${A1}$ m².`, `Triangle $ACD$ has sides $${cd}$, $${da}$ and $${diag}$: $s = ${fmt((cd + da + diag) / 2)}$, area $= ${A2}$ m².`, `Plot $= ${A1} + ${A2} = ${A1 + A2}$ m²`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 22.4 Cyclic quadrilaterals and the alternate segment theorem
// ---------------------------------------------------------------------------

function cyclicQuad(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const a = rng.int(55, 125);
    return {
      prompt: `$ABCD$ is a cyclic quadrilateral, and angle $A = ${a}°$. Find angle $C$.`,
      parts: [numPart(180 - a, { suffix: '°', exact: false })],
      hints: ['In a cyclic quadrilateral, all four corners lie on one circle.', 'Opposite angles of a cyclic quadrilateral add up to $180°$, and $C$ is opposite $A$.'],
      solution: [`$A + C = 180°$ (opposite angles of a cyclic quadrilateral)`, `$C = 180° - ${a}° = ${180 - a}°$`],
    };
  }
  if (d === 2) {
    const a = rng.int(60, 120);
    const b = retry(() => rng.int(60, 120), (x) => x !== a && x !== 180 - a);
    const ext = rng.chance(0.5);
    if (ext) {
      return {
        prompt: `$ABCD$ is a cyclic quadrilateral with angle $A = ${a}°$. The side $BC$ is extended beyond $C$ to a point $E$. Find the exterior angle $DCE$.`,
        parts: [numPart(a, { suffix: '°', exact: false })],
        hints: ['Angle $BCD$ is opposite angle $A$, so the two add up to $180°$.', 'Angles $BCD$ and $DCE$ lie on a straight line.'],
        solution: [`$\\angle BCD = 180° - ${a}° = ${180 - a}°$ (opposite angles of a cyclic quadrilateral)`, `$\\angle DCE = 180° - ${180 - a}° = ${a}°$ (angles on a straight line)`, 'The exterior angle of a cyclic quadrilateral equals the interior opposite angle.'],
      };
    }
    return {
      prompt: `$ABCD$ is a cyclic quadrilateral with angle $A = ${a}°$ and angle $B = ${b}°$. Find angles $C$ and $D$.`,
      parts: [numPart(180 - a, { label: '$C$ =', suffix: '°', exact: false }), numPart(180 - b, { label: '$D$ =', suffix: '°', exact: false })],
      hints: ['Opposite angles of a cyclic quadrilateral add up to $180°$.', '$C$ is opposite $A$, and $D$ is opposite $B$.'],
      solution: [`$C = 180° - ${a}° = ${180 - a}°$`, `$D = 180° - ${b}° = ${180 - b}°$`],
    };
  }
  // Opposite angles given as expressions in x.
  const x = rng.int(8, 30);
  const [m, n] = [rng.int(2, 4), rng.int(1, 3)];
  const p = rng.int(5, 30);
  const q = 180 - (m + n) * x - p;
  const expr = (k: number, c: number) => `${k === 1 ? '' : k}x ${c < 0 ? `- ${-c}` : `+ ${c}`}`;
  return {
    prompt: `In the cyclic quadrilateral $PQRS$, angle $P = (${expr(m, p)})°$ and the opposite angle $R = (${expr(n, q)})°$. Find $x$, and angle $P$.`,
    parts: [numPart(x, { label: '$x$ =', exact: false }), numPart(m * x + p, { label: '$P$ =', suffix: '°', exact: false })],
    hints: ['Opposite angles of a cyclic quadrilateral add up to $180°$.', 'Add the two expressions, put the sum equal to $180$, and solve for $x$.'],
    solution: [`$(${expr(m, p)}) + (${expr(n, q)}) = 180$`, `$${m + n}x ${p + q < 0 ? `- ${-(p + q)}` : `+ ${p + q}`} = 180$, so $x = ${x}$.`, `$P = ${m} \\times ${x} + ${p} = ${m * x + p}°$`],
  };
}

function alternateSegment(rng: Rng, d: Difficulty): Out {
  const setup = 'A tangent $PTQ$ touches a circle at $T$, and $A$ and $B$ are points on the circle.';
  if (d === 1) {
    const a = rng.int(35, 80);
    return {
      prompt: `${setup} The angle between the tangent $TQ$ and the chord $TB$ is $${a}°$. Find angle $TAB$, the angle in the alternate segment.`,
      parts: [numPart(a, { suffix: '°', exact: false })],
      hints: ['The alternate segment theorem: the angle between a tangent and a chord equals the angle in the alternate segment.', 'The angle in the alternate segment is the angle the chord makes at the circumference on the other side of the chord.'],
      solution: [`$\\angle TAB = \\angle BTQ = ${a}°$ (alternate segment theorem)`],
    };
  }
  if (d === 2) {
    const a = rng.int(40, 75);
    const b = retry(() => rng.int(35, 70), (x) => a + x < 150);
    return {
      prompt: `${setup} Angle $BTQ = ${a}°$ and angle $ATP = ${b}°$. Find the three angles of triangle $TAB$.`,
      parts: [numPart(a, { label: '$\\angle TAB$ =', suffix: '°', exact: false }), numPart(b, { label: '$\\angle TBA$ =', suffix: '°', exact: false }), numPart(180 - a - b, { label: '$\\angle ATB$ =', suffix: '°', exact: false })],
      hints: ['Use the alternate segment theorem twice: once for the chord $TB$, and once for the chord $TA$.', 'The angles on the straight line $PTQ$ add up to $180°$.'],
      solution: [`$\\angle TAB = \\angle BTQ = ${a}°$ (alternate segment theorem)`, `$\\angle TBA = \\angle ATP = ${b}°$ (alternate segment theorem)`, `$\\angle ATB = 180° - ${a}° - ${b}° = ${180 - a - b}°$ (angles on a straight line, or angles in a triangle)`],
    };
  }
  // TA = TB is not given; instead AB = AT, an isosceles triangle.
  const a = rng.int(25, 42) * 2;
  const base = (180 - a) / 2;
  return {
    prompt: `${setup} Angle $BTQ = ${a}°$, and $AT = AB$. Find angle $ATB$, and angle $ATP$.`,
    parts: [numPart(base, { label: '$\\angle ATB$ =', suffix: '°', exact: false }), numPart(180 - a - base, { label: '$\\angle ATP$ =', suffix: '°', exact: false })],
    hints: [`By the alternate segment theorem, angle $TAB = ${a}°$.`, 'Triangle $TAB$ is isosceles with $AT = AB$, so the angles at $T$ and $B$ are equal. Then use the straight line $PTQ$.'],
    solution: [`$\\angle TAB = ${a}°$ (alternate segment theorem)`, `$AT = AB$, so $\\angle ATB = \\angle ABT = \\dfrac{180° - ${a}°}{2} = ${base}°$.`, `$\\angle ATP = 180° - ${a}° - ${base}° = ${180 - a - base}°$ (angles on a straight line)`],
  };
}

// ---------------------------------------------------------------------------
// 22.5 Intersecting chords and common tangents
// ---------------------------------------------------------------------------

function intersectingChords(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const [ap, pb, cp] = retry(
      () => [rng.int(2, 9), rng.int(2, 12), rng.int(2, 9)] as [number, number, number],
      ([a, b, c]) => (a * b) % c === 0 && (a * b) / c !== a && (a * b) / c !== b && a !== c,
      400,
    );
    const pd = (ap * pb) / cp;
    return {
      prompt: `Two chords $AB$ and $CD$ of a circle cross at a point $P$ inside the circle. $AP = ${ap}$ cm, $PB = ${pb}$ cm and $CP = ${cp}$ cm. Find $PD$.`,
      parts: [numPart(pd, { suffix: 'cm', exact: false })],
      hints: ['When two chords cross inside a circle, the products of their parts are equal.', '$AP \\times PB = CP \\times PD$'],
      solution: ['$AP \\times PB = CP \\times PD$', `$${ap} \\times ${pb} = ${cp} \\times PD$`, `$PD = \\dfrac{${ap * pb}}{${cp}} = ${pd}$ cm`],
    };
  }
  if (d === 2) {
    // Two secants from an outside point: PA·PB = PC·PD.
    const [pa, ab, pc] = retry(
      () => [rng.int(3, 8), rng.int(2, 12), rng.int(3, 9)] as [number, number, number],
      ([a, b, c]) => a !== c && (a * (a + b)) % c === 0 && (a * (a + b)) / c > c,
      400,
    );
    const pd = (pa * (pa + ab)) / pc;
    return {
      prompt: `From a point $P$ outside a circle, one straight line cuts the circle at $A$ and then $B$, and another cuts it at $C$ and then $D$. $PA = ${pa}$ cm, $AB = ${ab}$ cm and $PC = ${pc}$ cm. Find the length of the chord $CD$.`,
      parts: [numPart(pd - pc, { suffix: 'cm', exact: false })],
      hints: ['For two secants from the same outside point, $PA \\times PB = PC \\times PD$. Each product uses the whole distance to the far point.', `$PB = ${pa} + ${ab} = ${pa + ab}$ cm. Find $PD$, then subtract $PC$.`],
      solution: ['$PA \\times PB = PC \\times PD$', `$${pa} \\times ${pa + ab} = ${pc} \\times PD$, so $PD = \\dfrac{${pa * (pa + ab)}}{${pc}} = ${pd}$ cm.`, `$CD = PD - PC = ${pd} - ${pc} = ${pd - pc}$ cm`],
    };
  }
  // A tangent and a secant: PT² = PA·PB.
  const [pa, pt] = retry(
    () => [rng.int(2, 9), rng.int(4, 15)] as [number, number],
    ([a, t]) => (t * t) % a === 0 && (t * t) / a > a,
    400,
  );
  const pb = (pt * pt) / pa;
  return {
    prompt: `From a point $P$ outside a circle, a tangent touches the circle at $T$ and a straight line cuts the circle at $A$ and then $B$. $PT = ${pt}$ cm and $PA = ${pa}$ cm. Find the length of the chord $AB$.`,
    parts: [numPart(pb - pa, { suffix: 'cm', exact: false })],
    hints: ['For a tangent and a secant from the same point, $PT^2 = PA \\times PB$.', 'Find $PB$, then subtract $PA$ to get the chord.'],
    solution: ['$PT^2 = PA \\times PB$', `$${pt}^2 = ${pa} \\times PB$, so $PB = \\dfrac{${pt * pt}}{${pa}} = ${pb}$ cm.`, `$AB = PB - PA = ${pb} - ${pa} = ${pb - pa}$ cm`],
  };
}

function commonTangents(rng: Rng, d: Difficulty): Out {
  const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25]];
  if (d === 3) {
    // Find the distance between the centres from a transverse common tangent.
    const [leg, tan, dist] = retry(() => rng.pick(TRIPLES), ([l]) => l >= 5);
    const r = rng.int(2, leg - 2);
    const R = leg - r;
    return {
      prompt: `Two circles with radii $${Math.max(R, r)}$ cm and $${Math.min(R, r)}$ cm do not overlap. A transverse common tangent, which crosses between the circles, has a length of $${tan}$ cm between its points of contact. Find the distance between the centres.`,
      parts: [numPart(dist, { suffix: 'cm', exact: false })],
      hints: ['For a transverse common tangent, the right-angled triangle has the tangent as one side and the sum of the radii as the other.', 'The distance between the centres is the hypotenuse.'],
      solution: [`Sum of the radii: $${Math.max(R, r)} + ${Math.min(R, r)} = ${leg}$ cm`, `$d^2 = ${tan}^2 + ${leg}^2 = ${tan * tan + leg * leg}$`, `$d = ${dist}$ cm`],
    };
  }
  const [leg, tan, dist] = rng.pick(TRIPLES);
  if (d === 1) {
    const r = rng.int(2, 8);
    const R = r + leg;
    return {
      prompt: `Two circles have radii $${R}$ cm and $${r}$ cm, and their centres are $${dist}$ cm apart. Find the length of a direct common tangent between its points of contact.`,
      parts: [numPart(tan, { suffix: 'cm', exact: false })],
      hints: ['A direct common tangent stays on the same side of both circles. Draw a line from the centre of the small circle parallel to the tangent.', 'This makes a right-angled triangle with the distance between the centres as hypotenuse and the difference of the radii as one side.'],
      solution: [`Difference of the radii: $${R} - ${r} = ${leg}$ cm`, `Tangent $= \\sqrt{${dist}^2 - ${leg}^2} = \\sqrt{${dist * dist - leg * leg}} = ${tan}$ cm`],
    };
  }
  const [l2, t2, d2] = retry(() => rng.pick(TRIPLES), ([l]) => l >= 5);
  const r = rng.int(2, l2 - 2);
  const R = l2 - r;
  return {
    prompt: `Two circles have radii $${Math.max(R, r)}$ cm and $${Math.min(R, r)}$ cm, and their centres are $${d2}$ cm apart. Find the length of a transverse common tangent, which crosses between the circles, between its points of contact.`,
    parts: [numPart(t2, { suffix: 'cm', exact: false })],
    hints: ['A transverse common tangent crosses the line joining the centres.', 'It makes a right-angled triangle with the distance between the centres as hypotenuse and the sum of the radii as one side.'],
    solution: [`Sum of the radii: $${Math.max(R, r)} + ${Math.min(R, r)} = ${l2}$ cm`, `Tangent $= \\sqrt{${d2}^2 - ${l2}^2} = \\sqrt{${d2 * d2 - l2 * l2}} = ${t2}$ cm`],
  };
}

// ---------------------------------------------------------------------------
// 22.6 Longitude and latitude
// ---------------------------------------------------------------------------

const EARTH = 6400;
const TAKE = `Take the radius of the Earth as $${EARTH}$ km and use the $\\pi$ key.`;
const km = (v: number, label?: string) => numPart(Math.round(v), { decimals: 0, tolerance: Math.max(1, v * 0.0015), suffix: 'km', label });
const ns = (lat: number) => (lat === 0 ? '0°' : `${Math.abs(lat)}°${lat > 0 ? 'N' : 'S'}`);
const ew = (lon: number) => (lon === 0 ? '0°' : `${Math.abs(lon)}°${lon > 0 ? 'E' : 'W'}`);

function greatCircle(rng: Rng, d: Difficulty): Out {
  if (d === 3) {
    // Nautical miles: 1 minute of a great circle is 1 nautical mile.
    const lon = rng.int(-17, 30) * 5;
    const [a, b] = retry(() => [rng.int(-12, 14) * 5, rng.int(-12, 14) * 5] as [number, number], ([p, q]) => Math.abs(p - q) >= 10);
    const diff = Math.abs(a - b);
    return {
      prompt: `Two ports $A$ (${ns(a)}, ${ew(lon)}) and $B$ (${ns(b)}, ${ew(lon)}) lie on the same meridian. Find the distance between them along the meridian in nautical miles. ($1°$ of a great circle is $60$ nautical miles.)`,
      parts: [numPart(diff * 60, { suffix: 'nm', exact: false })],
      hints: ['Find the angle between the two latitudes. Subtract if they are on the same side of the equator, and add if they are on opposite sides.', 'Multiply the angle in degrees by $60$.'],
      solution: [`Angle $= ${diff}°$ (${a * b >= 0 ? 'the difference, since both are on the same side of the equator' : 'the sum, since they are on opposite sides of the equator'})`, `Distance $= ${diff} \\times 60 = ${diff * 60}$ nautical miles`],
    };
  }
  if (d === 1) {
    const lon = rng.int(-17, 30) * 5;
    const [a, b] = retry(() => [rng.int(1, 14) * 5, rng.int(1, 14) * 5] as [number, number], ([p, q]) => Math.abs(p - q) >= 10);
    const diff = Math.abs(a - b);
    const dist = (diff / 360) * 2 * PI * EARTH;
    return {
      prompt: `Two towns $A$ (${ns(a)}, ${ew(lon)}) and $B$ (${ns(b)}, ${ew(lon)}) lie on the same meridian. Find the distance between them along the meridian, to the nearest kilometre. ${TAKE}`,
      parts: [km(dist)],
      hints: ['A meridian is half of a great circle, a circle with the same radius as the Earth.', `The towns are $${diff}°$ apart, so the distance is $\\dfrac{${diff}}{360}$ of the circumference $2\\pi R$.`],
      solution: [`Angle $= ${Math.max(a, b)}° - ${Math.min(a, b)}° = ${diff}°$`, `Distance $= \\dfrac{${diff}}{360} \\times 2\\pi \\times ${EARTH} \\approx ${fmt(Math.round(dist))}$ km`],
      calculator: true,
    };
  }
  // Opposite sides of the equator, or two points on the equator.
  if (rng.chance(0.5)) {
    const lon = rng.int(-17, 30) * 5;
    const a = rng.int(1, 12) * 5;
    const b = -rng.int(1, 12) * 5;
    const diff = a - b;
    const dist = (diff / 360) * 2 * PI * EARTH;
    return {
      prompt: `Two towns $A$ (${ns(a)}, ${ew(lon)}) and $B$ (${ns(b)}, ${ew(lon)}) lie on the same meridian. Find the distance between them along the meridian, to the nearest kilometre. ${TAKE}`,
      parts: [km(dist)],
      hints: ['One town is north of the equator and the other is south, so add the two latitudes to find the angle between them.', 'The distance is that fraction of $360°$ times the circumference $2\\pi R$.'],
      solution: [`Angle $= ${a}° + ${-b}° = ${diff}°$`, `Distance $= \\dfrac{${diff}}{360} \\times 2\\pi \\times ${EARTH} \\approx ${fmt(Math.round(dist))}$ km`],
      calculator: true,
    };
  }
  const a = rng.int(1, 16) * 5;
  const b = -rng.int(1, 16) * 5;
  const diff = a - b;
  const dist = (diff / 360) * 2 * PI * EARTH;
  return {
    prompt: `Two points on the equator have longitudes ${ew(b)} and ${ew(a)}. Find the shorter distance between them along the equator, to the nearest kilometre. ${TAKE}`,
    parts: [km(dist)],
    hints: ['The equator is a great circle. One point is west of the Greenwich meridian and the other is east, so add the longitudes.', 'The distance is that fraction of $360°$ times the circumference $2\\pi R$.'],
    solution: [`Angle $= ${-b}° + ${a}° = ${diff}°$`, `Distance $= \\dfrac{${diff}}{360} \\times 2\\pi \\times ${EARTH} \\approx ${fmt(Math.round(dist))}$ km`],
    calculator: true,
  };
}

function parallelLatitude(rng: Rng, d: Difficulty): Out {
  const lat = rng.pick([20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70]) * rng.pick([1, -1]);
  const r = EARTH * cosD(Math.abs(lat));
  if (d === 1) {
    return {
      prompt: `Find the radius of the parallel of latitude ${ns(lat)}, to the nearest kilometre. Take the radius of the Earth as $${EARTH}$ km.`,
      parts: [km(r)],
      hints: ['A parallel of latitude is a small circle. Its radius is smaller than the Earth’s.', 'The radius of the parallel of latitude $\\theta$ is $R\\cos\\theta$.'],
      solution: [`$r = R\\cos\\theta = ${EARTH} \\times \\cos ${Math.abs(lat)}° \\approx ${fmt(Math.round(r))}$ km`],
      calculator: true,
    };
  }
  const [a, b] = retry(() => [rng.int(-16, 16) * 5, rng.int(-16, 16) * 5] as [number, number], ([p, q]) => Math.abs(p - q) >= 20 && Math.abs(p - q) <= 150);
  const diff = Math.abs(a - b);
  const dist = (diff / 360) * 2 * PI * r;
  const angle = a * b >= 0 ? `the difference of the longitudes, $${diff}°$` : `the sum of the longitudes, $${diff}°$, since one is east and the other west`;
  if (d === 2) {
    return {
      prompt: `Two towns $P$ (${ns(lat)}, ${ew(a)}) and $Q$ (${ns(lat)}, ${ew(b)}) lie on the same parallel of latitude. Find the distance between them along the parallel, to the nearest kilometre. ${TAKE}`,
      parts: [km(dist)],
      hints: [`The radius of the parallel of latitude is $R\\cos ${Math.abs(lat)}°$.`, 'Find the angle between the two longitudes, then take that fraction of the circumference of the parallel.'],
      solution: [`The angle is ${angle}.`, `Distance $= \\dfrac{${diff}}{360} \\times 2\\pi \\times ${EARTH} \\times \\cos ${Math.abs(lat)}° \\approx ${fmt(Math.round(dist))}$ km`],
      calculator: true,
    };
  }
  // Time difference: 15° of longitude is one hour.
  const [e1, e2] = retry(() => [rng.int(-11, 11) * 15, rng.int(-11, 11) * 15] as [number, number], ([p, q]) => p < q && q - p <= 180);
  const hours = (e2 - e1) / 15;
  const t1 = rng.int(6, 11);
  const t2 = t1 + hours;
  const clock = (t: number) => `${String(((t % 24) + 24) % 24).padStart(2, '0')}:00`;
  return {
    prompt: `The Earth turns through $15°$ of longitude each hour, and places to the east are ahead in time. Town $X$ is at longitude ${ew(e1)} and town $Y$ is at longitude ${ew(e2)}. When the local time at $X$ is ${clock(t1)}, how many hours ahead is the local time at $Y$?`,
    parts: [numPart(hours, { suffix: 'hours', exact: false })],
    hints: ['Find the angle between the two longitudes. Add them if one is east and the other west.', 'Divide the angle by $15$ to change degrees into hours.'],
    solution: [`Angle $= ${e2 - e1}°$`, `Time difference $= ${e2 - e1} \\div 15 = ${hours}$ hours`, `$Y$ is east of $X$, so its local time is ahead: ${clock(t2)}${t2 >= 24 ? ' the next day' : ''}.`],
  };
}

export const CIRCLE_SKILLS: SkillDef[] = [
  skill({ id: 'mx-segment-area', name: 'Area of a segment', description: 'Find the area of a minor or major segment of a circle', outcomes: ['CS1'], lessonId: 'mx-22-1', calculator: true, gen: segmentArea }),
  skill({ id: 'mx-segment-perimeter', name: 'Chords and the perimeter of a segment', description: 'Find the length of a chord from the angle at the centre, and the perimeter of a segment', outcomes: ['CS1'], lessonId: 'mx-22-1', calculator: true, gen: segmentPerimeter }),
  skill({ id: 'mx-frustum-volume', name: 'Volume of a frustum', description: 'Find the volume of a frustum of a cone by subtracting the cone that was removed', outcomes: ['CS2'], lessonId: 'mx-22-2', calculator: true, gen: frustumVolume }),
  skill({ id: 'mx-frustum-surface', name: 'Surface area of a frustum', description: 'Find the curved and total surface area of a frustum of a cone', outcomes: ['CS2'], lessonId: 'mx-22-2', calculator: true, gen: frustumSurface }),
  skill({ id: 'mx-heron-area', name: 'Heron’s formula', description: 'Find the area of a triangle from its three sides', outcomes: ['CS3'], lessonId: 'mx-22-3', gen: heronArea }),
  skill({ id: 'mx-heron-apply', name: 'Using Heron’s formula', description: 'Use Heron’s formula to find heights of triangles and areas of quadrilaterals', outcomes: ['CS3'], lessonId: 'mx-22-3', gen: heronApply }),
  skill({ id: 'mx-cyclic-quadrilateral', name: 'Cyclic quadrilaterals', description: 'Use the angle properties of cyclic quadrilaterals', outcomes: ['CS4'], lessonId: 'mx-22-4', gen: cyclicQuad }),
  skill({ id: 'mx-alternate-segment', name: 'The alternate segment theorem', description: 'Find angles between tangents and chords with the alternate segment theorem', outcomes: ['CS4'], lessonId: 'mx-22-4', gen: alternateSegment }),
  skill({ id: 'mx-intersecting-chords', name: 'Intersecting chords and secants', description: 'Use the products of the parts of intersecting chords, secants and a tangent', outcomes: ['CS5'], lessonId: 'mx-22-5', gen: intersectingChords }),
  skill({ id: 'mx-common-tangents', name: 'Common tangents', description: 'Find the lengths of direct and transverse common tangents to two circles', outcomes: ['CS5'], lessonId: 'mx-22-5', gen: commonTangents }),
  skill({ id: 'mx-great-circle', name: 'Distances along great circles', description: 'Find distances along meridians and the equator', outcomes: ['CS6'], lessonId: 'mx-22-6', gen: greatCircle }),
  skill({ id: 'mx-parallel-latitude', name: 'Parallels of latitude', description: 'Find the radius of a parallel of latitude, distances along it, and time differences from longitude', outcomes: ['CS6'], lessonId: 'mx-22-6', gen: parallelLatitude }),
];
