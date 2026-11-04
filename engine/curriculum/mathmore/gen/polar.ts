/** More Mathematics Topics, Unit 6: polar coordinates, complex numbers in polar form, conics and parametric equations. */
import { fixedChoice, niceNum, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, isPerfectSquare, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Part, SkillDef } from '../../../types.ts';
import { pm } from './common.ts';

type Out = GenOutput;

const rad = (d: number) => (d * Math.PI) / 180;
const angle = (x: number, y: number) => ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
const sp = (x: number) => (x < 0 ? `(${fmt(x)})` : fmt(x));
const quadrant = (x: number, y: number) => (x > 0 ? (y > 0 ? 'I' : 'IV') : y > 0 ? 'II' : 'III');

// ---------------------------------------------------------------------------
// 6.1 Polar coordinates
// ---------------------------------------------------------------------------

function polarConvert(rng: Rng, d: Difficulty): Out {
  const toRect = d === 1 || (d === 3 && rng.chance(0.5));
  if (toRect) {
    const r = rng.int(2, 12);
    const th = rng.pick(d === 1 ? [30, 45, 60, 120, 135, 150, 210, 240, 300, 330] : [25, 70, 110, 160, 200, 250, 290, 340]);
    const x = r * Math.cos(rad(th));
    const y = r * Math.sin(rad(th));
    return {
      prompt: `Convert the polar coordinates $(r, \\theta) = (${r}, ${th}^\\circ)$ to rectangular coordinates $(x, y)$, to the nearest tenth.`,
      parts: [numPart(x, { label: '$x$ =', decimals: 1 }), numPart(y, { label: '$y$ =', decimals: 1 })],
      hints: ['$x = r\\cos\\theta$ and $y = r\\sin\\theta$.', 'The signs come out of the cosine and sine, so check them against the quadrant of the angle.'],
      solution: [`$x = ${r}\\cos ${th}^\\circ \\approx ${fmt(roundTo(x, 1))}$`, `$y = ${r}\\sin ${th}^\\circ \\approx ${fmt(roundTo(y, 1))}$`, `The point is about $(${fmt(roundTo(x, 1))}, ${fmt(roundTo(y, 1))})$.`],
      calculator: true,
    };
  }
  const [x, y] = retry(() => [rng.nonZero(-9, 9), rng.nonZero(-9, 9)] as [number, number], ([a, b]) => d < 3 || !isPerfectSquare(a * a + b * b), 100);
  const r = Math.hypot(x, y);
  const th = angle(x, y);
  return {
    prompt: `Convert the rectangular coordinates $(${x}, ${y})$ to polar coordinates $(r, \\theta)$ with $r > 0$ and $0^\\circ \\le \\theta < 360^\\circ$. Give each to the nearest tenth.`,
    parts: [numPart(r, { label: '$r$ =', decimals: 1 }), numPart(th, { label: '$\\theta$ =', decimals: 1, suffix: '°' })],
    hints: ['$r = \\sqrt{x^2 + y^2}$.', '$\\tan\\theta = \\dfrac{y}{x}$, but the calculator gives an angle in quadrant I or IV: adjust it to the quadrant of the point.'],
    solution: [
      `$r = \\sqrt{${sp(x)}^2 + ${sp(y)}^2} = \\sqrt{${x * x + y * y}} \\approx ${fmt(roundTo(r, 1))}$`,
      `The point is in quadrant ${quadrant(x, y)}. The reference angle is $\\tan^{-1}\\left(\\dfrac{${Math.abs(y)}}{${Math.abs(x)}}\\right) \\approx ${fmt(roundTo((Math.atan(Math.abs(y / x)) * 180) / Math.PI, 1))}^\\circ$, so $\\theta \\approx ${fmt(roundTo(th, 1))}^\\circ$.`,
    ],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 6.2 Complex numbers in polar form
// ---------------------------------------------------------------------------

function complexPolar(rng: Rng, d: Difficulty): Out {
  if (d < 3) {
    const [a, b] = [rng.nonZero(-8, 8), rng.nonZero(-8, 8)];
    const r = Math.hypot(a, b);
    const th = angle(a, b);
    const whole = Number.isInteger(r);
    return {
      prompt: `Write $${a} ${b < 0 ? '-' : '+'} ${Math.abs(b) === 1 ? '' : Math.abs(b)}i$ in polar form $r(\\cos\\theta + i\\sin\\theta)$, with $0^\\circ \\le \\theta < 360^\\circ$. Give $r$${whole ? '' : ' to the nearest tenth'} and $\\theta$ to the nearest tenth of a degree.`,
      parts: [whole ? numPart(r, { label: '$r$ =' }) : numPart(r, { label: '$r$ =', decimals: 1 }), numPart(th, { label: '$\\theta$ =', decimals: 1, suffix: '°' })],
      hints: ['The **modulus** $r = \\sqrt{a^2 + b^2}$ is the distance from $0$ in the complex plane.', 'The **argument** $\\theta$ is the angle from the positive real axis to the point $(a, b)$.'],
      solution: [`$r = \\sqrt{${sp(a)}^2 + ${sp(b)}^2} = \\sqrt{${a * a + b * b}}${whole ? ` = ${r}` : ` \\approx ${fmt(roundTo(r, 1))}`}$`, `The point $(${a}, ${b})$ is in quadrant ${quadrant(a, b)}, so $\\theta \\approx ${fmt(roundTo(th, 1))}^\\circ$.`],
      calculator: true,
    };
  }
  // Multiply (or divide) in polar form: multiply moduli, add arguments.
  const r1 = rng.int(2, 6), r2 = rng.int(2, 6);
  const t1 = rng.pick([20, 35, 50, 75, 110, 140]), t2 = rng.pick([15, 40, 65, 95, 130, 160]);
  const divide = rng.chance(0.4);
  const r = divide ? r1 / r2 : r1 * r2;
  const t = ((divide ? t1 - t2 : t1 + t2) + 360) % 360;
  const cis = (m: number, a: number) => `${m}(\\cos ${a}^\\circ + i\\sin ${a}^\\circ)`;
  return {
    prompt: `Let $z = ${cis(r1, t1)}$ and $w = ${cis(r2, t2)}$. Find ${divide ? '$\\dfrac{z}{w}$' : '$zw$'} in polar form, with $0^\\circ \\le \\theta < 360^\\circ$.${Number.isInteger(r) ? '' : ' Give $r$ exactly (a fraction is fine).'}`,
    parts: [numPart(r, { label: '$r$ =' }), numPart(t, { label: '$\\theta$ =', suffix: '°' })],
    hints: [divide ? 'To divide, divide the moduli and subtract the arguments.' : 'To multiply, multiply the moduli and add the arguments.'],
    solution: [divide ? `Modulus: $${r1} \\div ${r2} = ${niceNum(r)}$. Argument: $${t1}^\\circ - ${t2}^\\circ = ${t1 - t2}^\\circ$${t1 - t2 < 0 ? `, which is $${t}^\\circ$` : ''}.` : `Modulus: $${r1} \\times ${r2} = ${r}$. Argument: $${t1}^\\circ + ${t2}^\\circ = ${t1 + t2}^\\circ$${t1 + t2 >= 360 ? `, which is $${t}^\\circ$` : ''}.`, `${divide ? '$\\dfrac{z}{w}' : '$zw'} = ${niceNum(r)}(\\cos ${t}^\\circ + i\\sin ${t}^\\circ)$`],
  };
}

// ---------------------------------------------------------------------------
// 6.3 Conic sections
// ---------------------------------------------------------------------------

function conicIdentify(rng: Rng, d: Difficulty): Out {
  const kind = rng.pick(['circle', 'ellipse', 'parabola', 'hyperbola'] as const);
  const a = rng.int(2, 9);
  const b = retry(() => rng.int(2, 9), (v) => v !== a);
  const h = d === 1 ? 0 : rng.int(-5, 5), k = d === 1 ? 0 : rng.int(-5, 5);
  const X = h ? `(x ${pm(-h)})` : 'x';
  const Y = k ? `(y ${pm(-k)})` : 'y';
  const eqns: Record<typeof kind, string> = {
    circle: `${X}^2 + ${Y}^2 = ${a * a}`,
    ellipse: `\\frac{${X}^2}{${a * a}} + \\frac{${Y}^2}{${b * b}} = 1`,
    parabola: rng.chance(0.5) ? `${Y} = ${a === 2 ? '' : fmt(a / 2)}${X}^2` : `${X} = \\frac{1}{${a}}${Y}^2`,
    hyperbola: rng.chance(0.5) ? `\\frac{${X}^2}{${a * a}} - \\frac{${Y}^2}{${b * b}} = 1` : `\\frac{${Y}^2}{${a * a}} - \\frac{${X}^2}{${b * b}} = 1`,
  };
  const names = ['A circle', 'An ellipse', 'A parabola', 'A hyperbola'];
  const idx = ['circle', 'ellipse', 'parabola', 'hyperbola'].indexOf(kind);
  const why: Record<typeof kind, string> = {
    circle: 'Both squares have the same coefficient and are added: a circle.',
    ellipse: 'Both variables are squared and added, with different denominators: an ellipse.',
    parabola: 'Only one variable is squared: a parabola.',
    hyperbola: 'Both variables are squared, and one square is subtracted from the other: a hyperbola.',
  };
  const parts: Part[] = [{ label: d === 3 ? 'Conic:' : undefined, answer: fixedChoice(names, idx) }];
  const sol = [why[kind]];
  if (d === 3) {
    parts.push(numPart(h, { label: 'Centre or vertex, $x$:' }), numPart(k, { label: 'Centre or vertex, $y$:' }));
    sol.push(`Its ${kind === 'parabola' ? 'vertex' : 'centre'} is at $(${h}, ${k})$, read from $x - h$ and $y - k$.`);
  }
  return {
    prompt: `What kind of conic section is the graph of $${eqns[kind]}$?${d === 3 ? ' Give also its centre (or, for a parabola, its vertex).' : ''}`,
    parts,
    hints: ['Look at which variables are squared, and whether the squared terms are added or subtracted.', 'Circle: same coefficients, added. Ellipse: different, added. Hyperbola: subtracted. Parabola: one variable squared.'],
    solution: sol,
  };
}

function conicFeatures(rng: Rng, d: Difficulty): Out {
  if (d < 3) {
    // Parabola y = x^2 / (4p) or x = y^2 / (4p): focus and directrix.
    const p = rng.nonZero(-5, 5);
    const up = rng.chance(0.5);
    const c = 4 * p;
    return {
      prompt: `The parabola $${up ? `x^2 = ${c}y` : `y^2 = ${c}x`}$ has its vertex at the origin. Find $p$, the focus, and the equation of the directrix.`,
      parts: [numPart(p, { label: '$p$ =' }), numPart(up ? 0 : p, { label: 'Focus, $x$:' }), numPart(up ? p : 0, { label: 'Focus, $y$:' }), numPart(-p, { label: `Directrix: ${up ? '$y$' : '$x$'} =` })],
      hints: [up ? '$x^2 = 4py$ has focus $(0, p)$ and directrix $y = -p$.' : '$y^2 = 4px$ has focus $(p, 0)$ and directrix $x = -p$.', `Compare $4p$ with $${c}$.`],
      solution: [`$4p = ${c}$, so $p = ${p}$.`, up ? `The focus is $(0, ${p})$ and the directrix is $y = ${-p}$.` : `The focus is $(${p}, 0)$ and the directrix is $x = ${-p}$.`, `The parabola opens ${up ? (p > 0 ? 'upward' : 'downward') : p > 0 ? 'to the right' : 'to the left'}, towards the focus.`],
    };
  }
  // Ellipse: axes and foci.
  const a = rng.int(4, 13);
  const b = retry(() => rng.int(2, a - 1), (v) => v < a);
  const c = Math.sqrt(a * a - b * b);
  const wide = rng.chance(0.5);
  return {
    prompt: `For the ellipse $\\dfrac{x^2}{${wide ? a * a : b * b}} + \\dfrac{y^2}{${wide ? b * b : a * a}} = 1$, find the length of the major axis, the length of the minor axis, and the distance from the centre to each focus${Number.isInteger(c) ? '' : ' (to the nearest tenth)'}.`,
    parts: [numPart(2 * a, { label: 'Major axis:' }), numPart(2 * b, { label: 'Minor axis:' }), Number.isInteger(c) ? numPart(c, { label: 'Centre to focus:' }) : numPart(c, { label: 'Centre to focus:', decimals: 1 })],
    hints: ['The larger denominator is $a^2$; the major axis has length $2a$ and the minor axis $2b$.', 'The foci are $c$ from the centre along the major axis, where $c^2 = a^2 - b^2$.'],
    solution: [`$a^2 = ${a * a}$ and $b^2 = ${b * b}$, so $a = ${a}$ and $b = ${b}$; the major axis is ${wide ? 'horizontal' : 'vertical'}.`, `Major axis $2a = ${2 * a}$; minor axis $2b = ${2 * b}$.`, `$c^2 = ${a * a} - ${b * b} = ${a * a - b * b}$, so $c ${Number.isInteger(c) ? `= ${c}` : `\\approx ${fmt(roundTo(c, 1))}`}$.`],
    calculator: !Number.isInteger(c),
  };
}

// ---------------------------------------------------------------------------
// 6.4 Parametric equations
// ---------------------------------------------------------------------------

/** v - h, or v alone when h is 0. */
const shift = (v: string, h: number) => (h ? `${v} ${pm(-h)}` : v);
/** (v - h)^2, or v^2 when h is 0. */
const sqr = (v: string, h: number) => (h ? `(${shift(v, h)})^2` : `${v}^2`);

function parametric(rng: Rng, d: Difficulty): Out {
  const a = rng.nonZero(-4, 5), b = rng.int(-6, 6), c = rng.nonZero(-4, 5), e = rng.int(-6, 6);
  const lin = (m: number, k: number) => `${m === 1 ? '' : m === -1 ? '-' : m}t${k ? ` ${pm(k)}` : ''}`;
  if (d === 1) {
    const t = rng.int(-3, 4);
    return {
      prompt: `A point moves so that $x = ${lin(a, b)}$ and $y = ${lin(c, e)}$ at time $t$. Where is it when $t = ${t}$?`,
      parts: [numPart(a * t + b, { label: '$x$ =' }), numPart(c * t + e, { label: '$y$ =' })],
      hints: ['Substitute the value of $t$ into both equations.'],
      solution: [`$x = ${a === 1 ? '' : a === -1 ? '-' : a}(${t})${b ? ` ${pm(b)}` : ''} = ${a * t + b}$ and $y = ${c === 1 ? '' : c === -1 ? '-' : c}(${t})${e ? ` ${pm(e)}` : ''} = ${c * t + e}$.`, `The point is $(${a * t + b}, ${c * t + e})$.`],
    };
  }
  if (d === 2) {
    // Eliminate t from a linear pair: y = m x + k.
    const m = c / a;
    const k = e - (c * b) / a;
    return {
      prompt: `Eliminate the parameter: write $x = ${lin(a, b)}$, $y = ${lin(c, e)}$ as one equation $y = mx + k$. Enter $m$ and $k$ as fractions or decimals.`,
      parts: [numPart(m, { label: '$m$ =' }), numPart(k, { label: '$k$ =' })],
      hints: ['Solve the $x$ equation for $t$.', 'Substitute that expression for $t$ into the $y$ equation and simplify.'],
      solution: [`From $x = ${lin(a, b)}$: $t = ${a === 1 ? shift('x', b) : `\\dfrac{${shift('x', b)}}{${a}}`}$.`, `Substitute into $y = ${lin(c, e)}$ and simplify.`, `So $m = ${niceNum(m)}$ and $k = ${niceNum(k)}$.`],
    };
  }
  // A circle from x = r cos t + h, y = r sin t + k.
  const r = rng.int(2, 9), h = rng.int(-5, 5), k = rng.int(-5, 5);
  const cosT = `${r}\\cos t${h ? ` ${pm(h)}` : ''}`;
  const sinT = `${r}\\sin t${k ? ` ${pm(k)}` : ''}`;
  return {
    prompt: `The parametric equations $x = ${cosT}$, $y = ${sinT}$ for $0 \\le t < 2\\pi$ trace a circle. Find its centre and radius.`,
    parts: [numPart(h, { label: 'Centre, $x$:' }), numPart(k, { label: 'Centre, $y$:' }), numPart(r, { label: 'Radius:' })],
    hints: ['Get $\\cos t$ and $\\sin t$ on their own, then use $\\cos^2 t + \\sin^2 t = 1$.'],
    solution: [`$\\cos t = \\dfrac{${shift('x', h)}}{${r}}$ and $\\sin t = \\dfrac{${shift('y', k)}}{${r}}$.`, `Since $\\cos^2 t + \\sin^2 t = 1$: $${sqr('x', h)} + ${sqr('y', k)} = ${r * r}$.`, `The centre is $(${h}, ${k})$ and the radius is $${r}$.`],
  };
}

export const POLAR_SKILLS: SkillDef[] = [
  skill({ id: 'mx-polar-convert', name: 'Polar and rectangular coordinates', description: 'Convert between polar and rectangular coordinates', outcomes: ['PC1'], lessonId: 'mx-6-1', gen: polarConvert }),
  skill({ id: 'mx-complex-polar', name: 'Complex numbers in polar form', description: 'Write complex numbers in polar form, and multiply and divide them', outcomes: ['PC2'], lessonId: 'mx-6-2', gen: complexPolar }),
  skill({ id: 'mx-conic-identify', name: 'Identify conic sections', description: 'Tell circles, ellipses, parabolas and hyperbolas apart from their equations', outcomes: ['PC3'], lessonId: 'mx-6-3', gen: conicIdentify }),
  skill({ id: 'mx-conic-features', name: 'Parabolas and ellipses', description: 'Find the focus and directrix of a parabola and the axes and foci of an ellipse', outcomes: ['PC3'], lessonId: 'mx-6-3', gen: conicFeatures }),
  skill({ id: 'mx-parametric', name: 'Parametric equations', description: 'Evaluate parametric equations and eliminate the parameter', outcomes: ['PC4'], lessonId: 'mx-6-4', gen: parametric }),
];

