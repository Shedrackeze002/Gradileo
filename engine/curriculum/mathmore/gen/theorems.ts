/** More Mathematics Topics, Unit 27: the midpoint and proportionality theorems, the inclination of a line, tangents to circles, vector geometry, and matrices as transformations. */
import { fixedChoice, mc, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { atanD, fmt, fmtFixed, fracLatex, gcd, tanD, toFrac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, SkillDef } from '../../../types.ts';

type Out = GenOutput;

const f1 = (v: number) => fmtFixed(v, 1);
const f2 = (v: number) => fmtFixed(v, 2);
/** An exact value as a whole number or a fraction in LaTeX. */
const ex = (v: number) => {
  const f = toFrac(v);
  return f ? fracLatex(f, { dfrac: true }) : fmt(v);
};
const pt = (x: number, y: number) => `(${fmt(x)}, ${fmt(y)})`;
/** "+ 5", "- 5" or "" for zero. */
const tail = (c: number) => (c === 0 ? '' : c < 0 ? ` - ${ex(-c)}` : ` + ${ex(c)}`);
/** "3x", "x", "-x" with an exact coefficient. */
const mx = (m: number) => (m === 1 ? 'x' : m === -1 ? '-x' : `${ex(m)}x`);
const lin = (k: number, c: number) => `${k === 1 ? '' : k}x${c === 0 ? '' : c < 0 ? ` - ${-c}` : ` + ${c}`}`;

// ---------------------------------------------------------------------------
// 27.1 The midpoint theorem and the proportionality theorem
// ---------------------------------------------------------------------------

function midpointTheorem(rng: Rng, d: Difficulty): Out {
  const setup = 'In triangle $ABC$, $D$ is the midpoint of $AB$ and $E$ is the midpoint of $AC$.';
  if (d === 1) {
    const de = rng.int(3, 20);
    const find = rng.chance(0.5);
    return {
      prompt: `${setup} ${find ? `$BC = ${2 * de}$ cm. Find $DE$.` : `$DE = ${de}$ cm. Find $BC$.`}`,
      parts: [numPart(find ? de : 2 * de, { suffix: 'cm', exact: false })],
      hints: ['The midpoint theorem: the line joining the midpoints of two sides of a triangle is parallel to the third side and half as long.', find ? 'Halve $BC$.' : 'Double $DE$.'],
      solution: ['$DE = \\dfrac{1}{2}BC$ (midpoint theorem)', find ? `$DE = \\dfrac{1}{2} \\times ${2 * de} = ${de}$ cm` : `$BC = 2 \\times ${de} = ${2 * de}$ cm`],
    };
  }
  if (d === 2) {
    // DE = kx + c and BC = px + q, with BC = 2 DE.
    const x = rng.int(3, 12);
    const k = rng.int(1, 3);
    const c = rng.int(1, 8);
    const p = retry(() => rng.int(1, 9), (v) => v !== 2 * k);
    const q = 2 * (k * x + c) - p * x;
    return {
      prompt: `${setup} $DE = (${lin(k, c)})$ cm and $BC = (${lin(p, q)})$ cm. Find $x$, and the length of $BC$.`,
      parts: [numPart(x, { label: '$x$ =', exact: false }), numPart(2 * (k * x + c), { label: '$BC$ =', suffix: 'cm', exact: false })],
      hints: ['By the midpoint theorem, $BC = 2 \\times DE$.', 'Write this as an equation in $x$ and solve it.'],
      solution: [`$${lin(p, q)} = 2(${lin(k, c)})$`, `$${lin(p, q)} = ${lin(2 * k, 2 * c)}$, so $x = ${x}$.`, `$BC = ${p === 1 ? '' : `${p} \\times `}${x} ${q < 0 ? `- ${-q}` : `+ ${q}`} = ${2 * (k * x + c)}$ cm`],
    };
  }
  // A triangle with whole sides and a whole area, doubled so that the halves are whole.
  const [a0, b0, c0, area0] = rng.pick([[3, 4, 5, 6], [5, 5, 6, 12], [5, 5, 8, 12], [5, 12, 13, 30], [13, 14, 15, 84], [9, 10, 17, 36], [7, 15, 20, 42], [10, 13, 13, 60], [8, 15, 17, 60]] as Array<[number, number, number, number]>);
  const [a, b, c, area] = [2 * a0, 2 * b0, 2 * c0, 4 * area0];
  return {
    prompt: `Triangle $ABC$ has sides of $${a}$ cm, $${b}$ cm and $${c}$ cm and an area of $${area}$ cm². The midpoints of its three sides are joined to make a smaller triangle. Find (a) the perimeter and (b) the area of the smaller triangle.`,
    parts: [numPart((a + b + c) / 2, { label: '(a)', suffix: 'cm', exact: false }), numPart(area / 4, { label: '(b)', suffix: 'cm²', exact: false })],
    hints: ['Each side of the smaller triangle joins two midpoints, so it is half of the side of $ABC$ that it is parallel to.', 'The smaller triangle is similar to $ABC$ with scale factor $\\dfrac{1}{2}$, so its area is $\\left(\\dfrac{1}{2}\\right)^2$ of the area of $ABC$.'],
    solution: [`(a) Its sides are $${a / 2}$, $${b / 2}$ and $${c / 2}$ cm, so the perimeter is $${(a + b + c) / 2}$ cm.`, `(b) Area $= \\dfrac{1}{4} \\times ${area} = ${area / 4}$ cm²`],
  };
}

function proportionalityTheorem(rng: Rng, d: Difficulty): Out {
  const setup = 'In triangle $ABC$, $D$ lies on $AB$ and $E$ lies on $AC$, with $DE$ parallel to $BC$.';
  if (d === 1) {
    const [ad, db, ae] = retry(() => [rng.int(2, 10), rng.int(2, 12), rng.int(2, 10)] as [number, number, number], ([a, b, c]) => (b * c) % a === 0 && a !== b && a !== c);
    const ec = (db * ae) / ad;
    return {
      prompt: `${setup} $AD = ${ad}$ cm, $DB = ${db}$ cm and $AE = ${ae}$ cm. Find $EC$.`,
      parts: [numPart(ec, { suffix: 'cm', exact: false })],
      hints: ['The proportionality theorem: a line parallel to one side of a triangle divides the other two sides in the same ratio.', '$\\dfrac{AD}{DB} = \\dfrac{AE}{EC}$'],
      solution: ['$\\dfrac{AD}{DB} = \\dfrac{AE}{EC}$ (line parallel to one side of a triangle)', `$\\dfrac{${ad}}{${db}} = \\dfrac{${ae}}{EC}$`, `$EC = \\dfrac{${db} \\times ${ae}}{${ad}} = ${ec}$ cm`],
    };
  }
  if (d === 2) {
    const [ad, ab, ac] = retry(() => [rng.int(2, 9), rng.int(6, 20), rng.int(6, 24)] as [number, number, number], ([a, b, c]) => a < b - 1 && b !== c && (a * c) % b === 0);
    const ae = (ad * ac) / ab;
    return {
      prompt: `${setup} $AD = ${ad}$ cm, $AB = ${ab}$ cm and $AC = ${ac}$ cm. Find $AE$, and then $EC$.`,
      parts: [numPart(ae, { label: '$AE$ =', suffix: 'cm', exact: false }), numPart(ac - ae, { label: '$EC$ =', suffix: 'cm', exact: false })],
      hints: ['The parallel line also cuts off the same fraction of each whole side: $\\dfrac{AD}{AB} = \\dfrac{AE}{AC}$.', 'Then $EC = AC - AE$.'],
      solution: [`$\\dfrac{AD}{AB} = \\dfrac{AE}{AC}$, so $\\dfrac{${ad}}{${ab}} = \\dfrac{AE}{${ac}}$.`, `$AE = \\dfrac{${ad} \\times ${ac}}{${ab}} = ${ae}$ cm`, `$EC = ${ac} - ${ae} = ${ac - ae}$ cm`],
    };
  }
  // AD = x, DB = x + k, AE = p, EC = q: xq = p(x + k).
  const [x, k, p, q] = retry(
    () => {
      const p0 = rng.int(2, 8);
      const q0 = rng.int(p0 + 1, 14);
      const k0 = rng.int(1, 8);
      return [(p0 * k0) / (q0 - p0), k0, p0, q0] as [number, number, number, number];
    },
    ([x0]) => Number.isInteger(x0) && x0 >= 2,
    400,
  );
  return {
    prompt: `${setup} $AD = x$ cm, $DB = (x + ${k})$ cm, $AE = ${p}$ cm and $EC = ${q}$ cm. Find $x$.`,
    parts: [numPart(x, { label: '$x$ =', exact: false })],
    hints: ['Use $\\dfrac{AD}{DB} = \\dfrac{AE}{EC}$.', 'Cross-multiply and solve the linear equation.'],
    solution: [`$\\dfrac{x}{x + ${k}} = \\dfrac{${p}}{${q}}$`, `$${q}x = ${p}(x + ${k}) = ${p}x + ${p * k}$`, `$${q - p}x = ${p * k}$, so $x = ${x}$.`],
  };
}

// ---------------------------------------------------------------------------
// 27.2 The angle of inclination of a line
// ---------------------------------------------------------------------------

/** The inclination in [0°, 180°) of a line with gradient m. */
const inclination = (m: number) => (m >= 0 ? atanD(m) : 180 + atanD(m));

function inclinationAngle(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const m = retry(() => rng.int(1, 11) / rng.pick([2, 4]), (v) => v !== 1);
    return {
      prompt: `A line has gradient $${fmt(m)}$. Find its angle of inclination, to 1 decimal place.`,
      parts: [numPart(atanD(m), { decimals: 1, suffix: '°' })],
      hints: ['The angle of inclination $\\theta$ is the angle the line makes with the positive direction of the $x$-axis.', 'The gradient is $\\tan\\theta$, so $\\theta = \\tan^{-1}(m)$.'],
      solution: [`$\\tan\\theta = ${fmt(m)}$`, `$\\theta = \\tan^{-1}(${fmt(m)}) \\approx ${f1(atanD(m))}°$`],
      calculator: true,
    };
  }
  if (d === 2) {
    const [x1, y1, x2, y2] = retry(() => [rng.int(-6, 6), rng.int(-6, 6), rng.int(-6, 6), rng.int(-6, 6)] as [number, number, number, number], ([a, b, c, e]) => a !== c && b !== e && Math.abs(e - b) !== Math.abs(c - a));
    const m = (y2 - y1) / (x2 - x1);
    const th = inclination(m);
    return {
      prompt: `Find the angle of inclination of the line through $${pt(x1, y1)}$ and $${pt(x2, y2)}$, to 1 decimal place.`,
      parts: [numPart(th, { decimals: 1, suffix: '°' })],
      hints: ['First find the gradient, $m = \\dfrac{y_2 - y_1}{x_2 - x_1}$.', 'Then $\\theta = \\tan^{-1}(m)$. If the gradient is negative, the calculator gives a negative angle: add $180°$ to get the angle of inclination.'],
      solution: [`$m = \\dfrac{${y2} - ${y1 < 0 ? `(${y1})` : y1}}{${x2} - ${x1 < 0 ? `(${x1})` : x1}} = ${ex(m)}$`, m >= 0 ? `$\\theta = \\tan^{-1}\\left(${ex(m)}\\right) \\approx ${f1(th)}°$` : `$\\tan^{-1}\\left(${ex(m)}\\right) \\approx ${f1(atanD(m))}°$, so $\\theta \\approx 180° ${f1(atanD(m)).replace('-', '- ')}° = ${f1(th)}°$`],
      calculator: true,
    };
  }
  const [m1, m2] = retry(() => [rng.nonZero(-5, 5) / rng.pick([1, 2]), rng.nonZero(-5, 5) / rng.pick([1, 2])] as [number, number], ([a, b]) => a !== b && Math.abs(a * b + 1) > 0.01 && Math.abs(inclination(a) - inclination(b)) > 8);
  const [c1, c2] = [rng.int(-6, 6), rng.int(-6, 6)];
  const diff = Math.abs(inclination(m1) - inclination(m2));
  const acute = diff > 90 ? 180 - diff : diff;
  return {
    prompt: `Find the acute angle between the lines $y = ${mx(m1)}${tail(c1)}$ and $y = ${mx(m2)}${tail(c2)}$, to 1 decimal place.`,
    parts: [numPart(acute, { decimals: 1, suffix: '°' })],
    hints: ['Find the angle of inclination of each line from its gradient. Add $180°$ when the gradient is negative.', 'The angle between the lines is the difference of the two inclinations. If that is more than $90°$, subtract it from $180°$ to get the acute angle.'],
    solution: [`First line: $\\theta_1 \\approx ${f2(inclination(m1))}°$. Second line: $\\theta_2 \\approx ${f2(inclination(m2))}°$.`, `Difference $\\approx ${f2(diff)}°$`, diff > 90 ? `Acute angle $\\approx 180° - ${f2(diff)}° = ${f1(acute)}°$` : `Acute angle $\\approx ${f1(acute)}°$`],
    calculator: true,
  };
}

function inclinationLine(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const th = rng.pick([20, 25, 35, 40, 50, 55, 65, 70, 75, 100, 110, 115, 125, 140, 150, 160]);
    return {
      prompt: `A line has an angle of inclination of $${th}°$. Find its gradient, to 2 decimal places.`,
      parts: [numPart(tanD(th), { decimals: 2 })],
      hints: ['The gradient of a line is the tangent of its angle of inclination: $m = \\tan\\theta$.', th > 90 ? 'An inclination between $90°$ and $180°$ gives a negative gradient.' : 'Make sure the calculator is in degrees.'],
      solution: [`$m = \\tan ${th}° \\approx ${f2(tanD(th))}$`],
      calculator: true,
    };
  }
  const [a, b] = [rng.nonZero(-6, 6), rng.int(-6, 6)];
  if (d === 2) {
    const th = rng.pick([45, 135]);
    const m = th === 45 ? 1 : -1;
    return {
      prompt: `A line has an angle of inclination of $${th}°$ and passes through $${pt(a, b)}$. Find its $y$-intercept.`,
      parts: [numPart(b - m * a, { exact: false })],
      hints: [`The gradient is $\\tan ${th}° = ${m}$.`, 'Put the point into $y = mx + c$ and solve for $c$.'],
      solution: [`$m = \\tan ${th}° = ${m}$`, `$${b} = ${m} \\times ${a < 0 ? `(${a})` : a} + c$`, `$c = ${b - m * a}$`],
    };
  }
  const th = rng.pick([30, 40, 50, 60, 70, 110, 120, 130, 140, 150]);
  const m = tanD(th);
  return {
    prompt: `A line has an angle of inclination of $${th}°$ and passes through $${pt(a, b)}$. Find its $y$-intercept, to 2 decimal places.`,
    parts: [numPart(b - m * a, { decimals: 2 })],
    hints: [`The gradient is $m = \\tan ${th}°$. Keep its full value on the calculator.`, 'Put the point into $y = mx + c$ and solve for $c$.'],
    solution: [`$m = \\tan ${th}° \\approx ${fmt(m, 4)}$`, `$c = y - mx = ${b} - (${fmt(m, 4)}) \\times ${a < 0 ? `(${a})` : a} \\approx ${f2(b - m * a)}$`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 27.3 The equation of a tangent to a circle
// ---------------------------------------------------------------------------

const OFFSETS: Array<[number, number]> = [[3, 4], [4, 3], [6, 8], [8, 6], [5, 12], [12, 5], [1, 2], [2, 1], [1, 3], [3, 1], [2, 3], [3, 2], [2, 4], [1, 4]];
function circlePoint(rng: Rng, atOrigin: boolean) {
  const [dx0, dy0] = rng.pick(OFFSETS);
  const dx = dx0 * rng.sign();
  const dy = dy0 * rng.sign();
  const [h, k] = atOrigin ? [0, 0] : retry(() => [rng.int(-5, 5), rng.int(-5, 5)] as [number, number], ([p, q]) => p !== 0 && q !== 0);
  const r2 = dx * dx + dy * dy;
  const mr = dy / dx;
  const mt = -dx / dy;
  const px = h + dx;
  const py = k + dy;
  return { h, k, r2, px, py, mr, mt, c: py - mt * px };
}
const sq = (v: string, s: number) => (s === 0 ? `${v}^2` : `(${v} ${s < 0 ? `+ ${-s}` : `- ${s}`})^2`);
const circleEq = (h: number, k: number, r2: number) => `${sq('x', h)} + ${sq('y', k)} = ${r2}`;
const sub = (a: number, b: number) => `${a} - ${b < 0 ? `(${b})` : b}`;

function tangentGradient(rng: Rng, d: Difficulty): Out {
  const o = circlePoint(rng, d === 1);
  const radius = `Gradient of the radius $= \\dfrac{${sub(o.py, o.k)}}{${sub(o.px, o.h)}} = ${ex(o.mr)}$`;
  if (d === 1) {
    return {
      prompt: `The point $${pt(o.px, o.py)}$ lies on the circle $${circleEq(0, 0, o.r2)}$. Find the gradient of the tangent to the circle at this point. Give an exact answer.`,
      parts: [numPart(o.mt)],
      hints: ['A tangent is perpendicular to the radius at the point where it touches the circle.', 'Find the gradient of the radius from the centre $(0, 0)$ to the point. The gradient of the tangent is its negative reciprocal.'],
      solution: [radius, `Gradient of the tangent $= -\\dfrac{1}{${o.mr < 0 ? `(${ex(o.mr)})` : ex(o.mr)}} = ${ex(o.mt)}$`],
    };
  }
  if (d === 2) {
    return {
      prompt: `The point $${pt(o.px, o.py)}$ lies on the circle $${circleEq(o.h, o.k, o.r2)}$. Find (a) the gradient of the radius to this point and (b) the gradient of the tangent at this point. Give exact answers.`,
      parts: [numPart(o.mr, { label: '(a)' }), numPart(o.mt, { label: '(b)' })],
      hints: [`The centre of the circle is $${pt(o.h, o.k)}$.`, 'The tangent is perpendicular to the radius, so the two gradients multiply to $-1$.'],
      solution: [`Centre: $${pt(o.h, o.k)}$`, `(a) ${radius}`, `(b) Gradient of the tangent $= ${ex(o.mt)}$, since $${ex(o.mr)} \\times ${o.mt < 0 ? `\\left(${ex(o.mt)}\\right)` : ex(o.mt)} = -1$.`],
    };
  }
  // General form: x² + y² + Dx + Ey + F = 0.
  const [D, E, F] = [-2 * o.h, -2 * o.k, o.h * o.h + o.k * o.k - o.r2];
  const term = (c: number, v: string) => (c === 0 ? '' : ` ${c < 0 ? '-' : '+'} ${Math.abs(c) === 1 && v ? '' : Math.abs(c)}${v}`);
  return {
    prompt: `The point $${pt(o.px, o.py)}$ lies on the circle $x^2 + y^2${term(D, 'x')}${term(E, 'y')}${term(F, '')} = 0$. Find the gradient of the tangent to the circle at this point. Give an exact answer.`,
    parts: [numPart(o.mt)],
    hints: ['Complete the square in $x$ and in $y$ to find the centre of the circle.', 'Find the gradient of the radius to the point, then take its negative reciprocal.'],
    solution: [`Completing the square gives $${circleEq(o.h, o.k, o.r2)}$, so the centre is $${pt(o.h, o.k)}$.`, radius, `Gradient of the tangent $= ${ex(o.mt)}$`],
  };
}

function tangentEquation(rng: Rng, d: Difficulty): Out {
  const o = circlePoint(rng, d === 1);
  const parts = [numPart(o.mt, { label: '$m$ =' }), numPart(o.c, { label: '$c$ =' })];
  const steps = [`Gradient of the radius $= \\dfrac{${sub(o.py, o.k)}}{${sub(o.px, o.h)}} = ${ex(o.mr)}$, so the gradient of the tangent is $m = ${ex(o.mt)}$.`, `Through $${pt(o.px, o.py)}$: $c = y - mx = ${o.py} - ${o.mt < 0 ? `\\left(${ex(o.mt)}\\right)` : ex(o.mt)} \\times ${o.px < 0 ? `(${o.px})` : o.px} = ${ex(o.c)}$`, `The tangent is $y = ${mx(o.mt)}${tail(o.c)}$.`];
  const ask = 'Find the equation of the tangent to the circle at this point in the form $y = mx + c$. Give exact values of $m$ and $c$.';
  if (d < 3) {
    return {
      prompt: `The point $${pt(o.px, o.py)}$ lies on the circle $${circleEq(o.h, o.k, o.r2)}$. ${ask}`,
      parts,
      hints: [`The centre is $${pt(o.h, o.k)}$. The tangent is perpendicular to the radius, so its gradient is the negative reciprocal of the gradient of the radius.`, 'Then put the point into $y = mx + c$ to find $c$.'],
      solution: steps,
    };
  }
  const [D, E, F] = [-2 * o.h, -2 * o.k, o.h * o.h + o.k * o.k - o.r2];
  const term = (c: number, v: string) => (c === 0 ? '' : ` ${c < 0 ? '-' : '+'} ${Math.abs(c) === 1 && v ? '' : Math.abs(c)}${v}`);
  return {
    prompt: `The point $${pt(o.px, o.py)}$ lies on the circle $x^2 + y^2${term(D, 'x')}${term(E, 'y')}${term(F, '')} = 0$. ${ask}`,
    parts,
    hints: ['Complete the square in $x$ and in $y$ to find the centre.', 'The gradient of the tangent is the negative reciprocal of the gradient of the radius. Then use the point to find $c$.'],
    solution: [`Completing the square gives $${circleEq(o.h, o.k, o.r2)}$, so the centre is $${pt(o.h, o.k)}$.`, ...steps],
  };
}

// ---------------------------------------------------------------------------
// 27.4 Vector geometry: the ratio theorem and collinear points
// ---------------------------------------------------------------------------

function ratioTheorem(rng: Rng, d: Difficulty): Out {
  const [m, n] = d === 1 ? [1, 1] : retry(() => [rng.int(1, 5), rng.int(1, 5)] as [number, number], ([p, q]) => p !== q && gcd(p, q) === 1);
  const s = m + n;
  // A and the step (B − A)/s are whole, so P is a lattice point.
  const [ax, ay] = [rng.int(-6, 6), rng.int(-6, 6)];
  const [ux, uy] = retry(() => [rng.int(-3, 3), rng.int(-3, 3)] as [number, number], ([p, q]) => p !== 0 || q !== 0);
  const [bx, by] = [ax + s * ux, ay + s * uy];
  const [px, py] = [ax + m * ux, ay + m * uy];
  const formula = '$\\mathbf{p} = \\dfrac{n\\mathbf{a} + m\\mathbf{b}}{m + n}$';
  if (d === 1) {
    return {
      prompt: `$A$ and $B$ have position vectors $\\mathbf{a} = \\begin{pmatrix} ${ax} \\\\ ${ay} \\end{pmatrix}$ and $\\mathbf{b} = \\begin{pmatrix} ${bx} \\\\ ${by} \\end{pmatrix}$. Find the position vector of the midpoint $M$ of $AB$.`,
      parts: [numPart(px, { label: '$x$ =', exact: false }), numPart(py, { label: '$y$ =', exact: false })],
      hints: ['The midpoint divides $AB$ in the ratio $1 : 1$.', '$\\mathbf{m} = \\dfrac{1}{2}(\\mathbf{a} + \\mathbf{b})$'],
      solution: [`$\\mathbf{m} = \\dfrac{1}{2}(\\mathbf{a} + \\mathbf{b}) = \\dfrac{1}{2}\\begin{pmatrix} ${ax + bx} \\\\ ${ay + by} \\end{pmatrix} = \\begin{pmatrix} ${px} \\\\ ${py} \\end{pmatrix}$`],
    };
  }
  if (d === 2) {
    return {
      prompt: `$A$ and $B$ have position vectors $\\mathbf{a} = \\begin{pmatrix} ${ax} \\\\ ${ay} \\end{pmatrix}$ and $\\mathbf{b} = \\begin{pmatrix} ${bx} \\\\ ${by} \\end{pmatrix}$. The point $P$ divides $AB$ in the ratio $AP : PB = ${m} : ${n}$. Find the position vector of $P$.`,
      parts: [numPart(px, { label: '$x$ =', exact: false }), numPart(py, { label: '$y$ =', exact: false })],
      hints: [`The ratio theorem: if $AP : PB = m : n$, then ${formula}.`, `Here $m = ${m}$ and $n = ${n}$. Notice that $\\mathbf{a}$ is multiplied by $n$, the part of the ratio next to $B$.`],
      solution: [`$\\mathbf{p} = \\dfrac{${n}\\mathbf{a} + ${m}\\mathbf{b}}{${s}} = \\dfrac{1}{${s}}\\begin{pmatrix} ${n * ax + m * bx} \\\\ ${n * ay + m * by} \\end{pmatrix} = \\begin{pmatrix} ${px} \\\\ ${py} \\end{pmatrix}$`],
    };
  }
  return {
    prompt: `$A$ has position vector $\\begin{pmatrix} ${ax} \\\\ ${ay} \\end{pmatrix}$. The point $P$, with position vector $\\begin{pmatrix} ${px} \\\\ ${py} \\end{pmatrix}$, divides $AB$ in the ratio $AP : PB = ${m} : ${n}$. Find the position vector of $B$.`,
    parts: [numPart(bx, { label: '$x$ =', exact: false }), numPart(by, { label: '$y$ =', exact: false })],
    hints: [`$\\overrightarrow{AP}$ is $\\dfrac{${m}}{${s}}$ of $\\overrightarrow{AB}$, so $\\overrightarrow{AB} = \\dfrac{${s}}{${m}}\\overrightarrow{AP}$.`, 'Then $\\mathbf{b} = \\mathbf{a} + \\overrightarrow{AB}$.'],
    solution: [`$\\overrightarrow{AP} = \\mathbf{p} - \\mathbf{a} = \\begin{pmatrix} ${px - ax} \\\\ ${py - ay} \\end{pmatrix}$`, `$\\overrightarrow{AB} = \\dfrac{${s}}{${m}}\\overrightarrow{AP} = \\begin{pmatrix} ${bx - ax} \\\\ ${by - ay} \\end{pmatrix}$`, `$\\mathbf{b} = \\mathbf{a} + \\overrightarrow{AB} = \\begin{pmatrix} ${bx} \\\\ ${by} \\end{pmatrix}$`],
  };
}

function collinearPoints(rng: Rng, d: Difficulty): Out {
  const [ax, ay] = [rng.int(-5, 5), rng.int(-5, 5)];
  const [ux, uy] = retry(() => [rng.nonZero(-3, 3), rng.nonZero(-3, 3)] as [number, number], ([p, q]) => gcd(Math.abs(p), Math.abs(q)) === 1);
  const [s, t] = retry(() => [rng.int(1, 3), rng.int(2, 5)] as [number, number], ([p, q]) => q > p);
  const [bx, by] = [ax + s * ux, ay + s * uy];
  const [cx, cy] = [ax + t * ux, ay + t * uy];
  const col = (x: number, y: number) => `\\begin{pmatrix} ${x} \\\\ ${y} \\end{pmatrix}`;
  if (d === 1) {
    const yes = rng.chance(0.5);
    const cy2 = yes ? cy : cy + rng.pick([-2, -1, 1, 2]);
    return {
      prompt: `The points $A${pt(ax, ay)}$, $B${pt(bx, by)}$ and $C${pt(cx, cy2)}$ are given. Are $A$, $B$ and $C$ collinear?`,
      parts: [{ answer: fixedChoice(['Yes', 'No'], yes ? 0 : 1) }],
      hints: ['Points are collinear when they lie on one straight line.', 'Find $\\overrightarrow{AB}$ and $\\overrightarrow{AC}$. The points are collinear if one vector is a multiple of the other.'],
      solution: [`$\\overrightarrow{AB} = ${col(bx - ax, by - ay)}$ and $\\overrightarrow{AC} = ${col(cx - ax, cy2 - ay)}$`, yes ? `$\\overrightarrow{AC} = ${ex(t / s)}\\,\\overrightarrow{AB}$, and the vectors share the point $A$, so the points are collinear.` : `$\\overrightarrow{AC}$ is not a multiple of $\\overrightarrow{AB}$, so the points are not collinear.`],
    };
  }
  if (d === 2) {
    return {
      prompt: `The points $A${pt(ax, ay)}$, $B${pt(bx, by)}$ and $C(${cx}, k)$ are collinear. Find $k$.`,
      parts: [numPart(cy, { label: '$k$ =', exact: false })],
      hints: ['If the points are collinear, $\\overrightarrow{AC}$ is a multiple of $\\overrightarrow{AB}$.', 'Use the $x$-components to find the multiple, then apply it to the $y$-components.'],
      solution: [`$\\overrightarrow{AB} = ${col(bx - ax, by - ay)}$ and $\\overrightarrow{AC} = \\begin{pmatrix} ${cx - ax} \\\\ k ${ay < 0 ? `+ ${-ay}` : `- ${ay}`} \\end{pmatrix}$`, `From the $x$-components, $\\overrightarrow{AC} = ${ex(t / s)}\\,\\overrightarrow{AB}$.`, `$k ${ay < 0 ? `+ ${-ay}` : `- ${ay}`} = ${ex(t / s)} \\times ${by - ay < 0 ? `(${by - ay})` : by - ay} = ${cy - ay}$, so $k = ${cy}$.`],
    };
  }
  const [m, n] = retry(() => [rng.int(1, 5), rng.int(1, 5)] as [number, number], ([p, q]) => p !== q && gcd(p, q) === 1);
  return {
    prompt: `$\\overrightarrow{OA} = \\mathbf{a}$ and $\\overrightarrow{OB} = \\mathbf{b}$. The point $P$ lies on $AB$ with $AP : PB = ${m} : ${n}$. Write $\\overrightarrow{OP}$ as $\\lambda\\mathbf{a} + \\mu\\mathbf{b}$, and give the exact values of $\\lambda$ and $\\mu$.`,
    parts: [numPart(n / (m + n), { label: '$\\lambda$ =' }), numPart(m / (m + n), { label: '$\\mu$ =' })],
    hints: [`$\\overrightarrow{OP} = \\overrightarrow{OA} + \\overrightarrow{AP}$, and $\\overrightarrow{AP} = \\dfrac{${m}}{${m + n}}\\overrightarrow{AB}$.`, '$\\overrightarrow{AB} = \\mathbf{b} - \\mathbf{a}$. Collect the terms in $\\mathbf{a}$ and in $\\mathbf{b}$.'],
    solution: [`$\\overrightarrow{OP} = \\mathbf{a} + \\dfrac{${m}}{${m + n}}(\\mathbf{b} - \\mathbf{a})$`, `$= \\dfrac{${n}}{${m + n}}\\mathbf{a} + \\dfrac{${m}}{${m + n}}\\mathbf{b}$`, 'The two numbers add up to $1$, which is true for every point on the line $AB$.'],
  };
}

// ---------------------------------------------------------------------------
// 27.5 Matrices and transformations
// ---------------------------------------------------------------------------

type M2 = [number, number, number, number];
const mat = ([a, b, c, e]: M2) => `\\begin{pmatrix} ${a} & ${b} \\\\ ${c} & ${e} \\end{pmatrix}`;
const mul = (p: M2, q: M2): M2 => [p[0] * q[0] + p[1] * q[2], p[0] * q[1] + p[1] * q[3], p[2] * q[0] + p[3] * q[2], p[2] * q[1] + p[3] * q[3]];
const STANDARD: Array<{ name: string; m: M2 }> = [
  { name: 'a reflection in the $x$-axis', m: [1, 0, 0, -1] },
  { name: 'a reflection in the $y$-axis', m: [-1, 0, 0, 1] },
  { name: 'a reflection in the line $y = x$', m: [0, 1, 1, 0] },
  { name: 'a reflection in the line $y = -x$', m: [0, -1, -1, 0] },
  { name: 'a rotation of $90°$ anticlockwise about the origin', m: [0, -1, 1, 0] },
  { name: 'a rotation of $90°$ clockwise about the origin', m: [0, 1, -1, 0] },
  { name: 'a rotation of $180°$ about the origin', m: [-1, 0, 0, -1] },
];
const cap1 = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const entries = (m: M2) => [numPart(m[0], { label: 'Top left', exact: false }), numPart(m[1], { label: 'Top right', exact: false }), numPart(m[2], { label: 'Bottom left', exact: false }), numPart(m[3], { label: 'Bottom right', exact: false })];

function transformationMatrix(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const m = retry(() => [rng.int(-3, 4), rng.int(-3, 4), rng.int(-3, 4), rng.int(-3, 4)] as M2, (v) => v[0] * v[3] - v[1] * v[2] !== 0 && v.filter((e) => e === 0).length <= 1);
    const [x, y] = [rng.nonZero(-5, 5), rng.nonZero(-5, 5)];
    const [ix, iy] = [m[0] * x + m[1] * y, m[2] * x + m[3] * y];
    const b = (v: number) => (v < 0 ? `(${v})` : `${v}`);
    return {
      prompt: `A transformation is given by the matrix $${mat(m)}$. Find the image of the point $${pt(x, y)}$.`,
      parts: [numPart(ix, { label: '$x$ =', exact: false }), numPart(iy, { label: '$y$ =', exact: false })],
      hints: ['Write the point as a column vector and multiply it by the matrix, with the matrix on the left.', 'Each row of the matrix gives one coordinate of the image.'],
      solution: [`$${mat(m)}\\begin{pmatrix} ${x} \\\\ ${y} \\end{pmatrix} = \\begin{pmatrix} ${b(m[0])} \\times ${b(x)} + ${b(m[1])} \\times ${b(y)} \\\\ ${b(m[2])} \\times ${b(x)} + ${b(m[3])} \\times ${b(y)} \\end{pmatrix} = \\begin{pmatrix} ${ix} \\\\ ${iy} \\end{pmatrix}$`, `The image is $${pt(ix, iy)}$.`],
    };
  }
  if (d === 2) {
    const t = rng.pick(STANDARD);
    return {
      prompt: `Which transformation does the matrix $${mat(t.m)}$ represent?`,
      parts: [{ answer: mc(rng, cap1(t.name), STANDARD.filter((s) => s !== t).map((s) => cap1(s.name)), { max: 4 }) }],
      hints: ['The columns of the matrix are the images of the points $(1, 0)$ and $(0, 1)$.', `Here $(1, 0)$ goes to $${pt(t.m[0], t.m[2])}$ and $(0, 1)$ goes to $${pt(t.m[1], t.m[3])}$. Decide which transformation does that.`],
      solution: [`The first column shows that $(1, 0)$ goes to $${pt(t.m[0], t.m[2])}$, and the second that $(0, 1)$ goes to $${pt(t.m[1], t.m[3])}$.`, `This is ${t.name}.`],
    };
  }
  const m = retry(() => [rng.int(-3, 4), rng.int(-3, 4), rng.int(-3, 4), rng.int(-3, 4)] as M2, (v) => Math.abs(v[0] * v[3] - v[1] * v[2]) >= 2);
  const det = m[0] * m[3] - m[1] * m[2];
  const area = rng.int(2, 12);
  return {
    prompt: `A triangle with an area of $${area}$ square units is transformed by the matrix $${mat(m)}$. Find the area of its image.`,
    parts: [numPart(area * Math.abs(det), { suffix: 'square units', exact: false })],
    hints: ['A matrix multiplies every area by the size of its determinant.', 'The determinant of $\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$ is $ad - bc$. Ignore its sign for the area.'],
    solution: [`Determinant $= ${m[0]} \\times ${m[3] < 0 ? `(${m[3]})` : m[3]} - ${m[1] < 0 ? `(${m[1]})` : m[1]} \\times ${m[2] < 0 ? `(${m[2]})` : m[2]} = ${det}$`, `Area scale factor $= ${Math.abs(det)}$`, `Area of the image $= ${area} \\times ${Math.abs(det)} = ${area * Math.abs(det)}$ square units`],
  };
}

function transformationCombine(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const enlarge = rng.chance(0.3);
    const k = rng.pick([2, 3, 4, -2]);
    const t = enlarge ? { name: `an enlargement with scale factor $${k}$ about the origin`, m: [k, 0, 0, k] as M2 } : rng.pick(STANDARD);
    return {
      prompt: `Write down the $2 \\times 2$ matrix that represents ${t.name}. Enter its four entries.`,
      parts: entries(t.m),
      hints: ['Find where the transformation sends $(1, 0)$ and where it sends $(0, 1)$.', 'The image of $(1, 0)$ is the first column of the matrix, and the image of $(0, 1)$ is the second column.'],
      solution: [`$(1, 0)$ goes to $${pt(t.m[0], t.m[2])}$ and $(0, 1)$ goes to $${pt(t.m[1], t.m[3])}$.`, `The matrix is $${mat(t.m)}$.`],
    };
  }
  if (d === 2) {
    const [p, q] = retry(() => [rng.pick(STANDARD), rng.pick(STANDARD)] as const, ([a, b]) => a !== b);
    const prod = mul(q.m, p.m);
    return {
      prompt: `A shape is transformed by ${p.name}, with matrix $\\mathbf{P} = ${mat(p.m)}$, and then by ${q.name}, with matrix $\\mathbf{Q} = ${mat(q.m)}$. Find the single matrix that represents the combined transformation. Enter its four entries.`,
      parts: entries(prod),
      hints: ['The transformation done first is written on the right, next to the point. So "first $\\mathbf{P}$, then $\\mathbf{Q}$" is the product $\\mathbf{QP}$.', 'Multiply the rows of $\\mathbf{Q}$ by the columns of $\\mathbf{P}$.'],
      solution: [`The combined matrix is $\\mathbf{QP} = ${mat(q.m)}${mat(p.m)} = ${mat(prod)}$.`],
    };
  }
  // An image point is given; find the object with the inverse matrix (determinant ±1, so the inverse is whole).
  const m = retry(() => [rng.int(-3, 4), rng.int(-3, 4), rng.int(-3, 4), rng.int(-3, 4)] as M2, (v) => Math.abs(v[0] * v[3] - v[1] * v[2]) === 1 && v.filter((e) => e === 0).length === 0, 500);
  const det = m[0] * m[3] - m[1] * m[2];
  const inv: M2 = [m[3] / det, -m[1] / det, -m[2] / det, m[0] / det];
  const [x, y] = [rng.nonZero(-5, 5), rng.nonZero(-5, 5)];
  const [ix, iy] = [m[0] * x + m[1] * y, m[2] * x + m[3] * y];
  return {
    prompt: `The matrix $\\mathbf{M} = ${mat(m)}$ maps a point $P$ to the point $${pt(ix, iy)}$. Find the coordinates of $P$.`,
    parts: [numPart(x, { label: '$x$ =', exact: false }), numPart(y, { label: '$y$ =', exact: false })],
    hints: ['The inverse matrix undoes the transformation, so $P$ is $\\mathbf{M}^{-1}$ times the image.', 'The inverse of $\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$ is $\\dfrac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$.'],
    solution: [`Determinant $= ${det}$, so $\\mathbf{M}^{-1} = ${mat(inv)}$.`, `$${mat(inv)}\\begin{pmatrix} ${ix} \\\\ ${iy} \\end{pmatrix} = \\begin{pmatrix} ${x} \\\\ ${y} \\end{pmatrix}$`, `$P$ is $${pt(x, y)}$.`],
  };
}

export const THEOREM_SKILLS: SkillDef[] = [
  skill({ id: 'mx-midpoint-theorem', name: 'The midpoint theorem', description: 'Use the midpoint theorem to find lengths in triangles', outcomes: ['GT1'], lessonId: 'mx-27-1', gen: midpointTheorem }),
  skill({ id: 'mx-proportionality-theorem', name: 'The proportionality theorem', description: 'Find lengths when a line parallel to one side divides the other two sides of a triangle', outcomes: ['GT1'], lessonId: 'mx-27-1', gen: proportionalityTheorem }),
  skill({ id: 'mx-inclination-angle', name: 'The angle of inclination', description: 'Find the angle of inclination of a line, and the angle between two lines', outcomes: ['GT2'], lessonId: 'mx-27-2', calculator: true, gen: inclinationAngle }),
  skill({ id: 'mx-inclination-line', name: 'Lines from their inclination', description: 'Find the gradient and equation of a line from its angle of inclination', outcomes: ['GT2'], lessonId: 'mx-27-2', calculator: true, gen: inclinationLine }),
  skill({ id: 'mx-circle-tangent-gradient', name: 'Gradient of a tangent to a circle', description: 'Find the gradient of the radius and of the tangent at a point on a circle', outcomes: ['GT3'], lessonId: 'mx-27-3', gen: tangentGradient }),
  skill({ id: 'mx-circle-tangent-equation', name: 'Equation of a tangent to a circle', description: 'Find the equation of the tangent to a circle at a given point', outcomes: ['GT3'], lessonId: 'mx-27-3', gen: tangentEquation }),
  skill({ id: 'mx-ratio-theorem', name: 'The ratio theorem', description: 'Find the position vector of a point that divides a line segment in a given ratio', outcomes: ['GT4'], lessonId: 'mx-27-4', gen: ratioTheorem }),
  skill({ id: 'mx-collinear-points', name: 'Collinear points', description: 'Use vectors to decide whether points are collinear, and to write position vectors in terms of a and b', outcomes: ['GT4'], lessonId: 'mx-27-4', gen: collinearPoints }),
  skill({ id: 'mx-transformation-matrix', name: 'Matrices as transformations', description: 'Find images under a matrix, recognize standard transformation matrices, and use the determinant as an area scale factor', outcomes: ['GT5'], lessonId: 'mx-27-5', gen: transformationMatrix }),
  skill({ id: 'mx-transformation-combine', name: 'Building and combining transformation matrices', description: 'Write the matrix of a transformation, combine two transformations, and undo one with the inverse matrix', outcomes: ['GT5'], lessonId: 'mx-27-5', gen: transformationCombine }),
];
