/** More Mathematics Topics, Unit 5: vectors and matrices. */
import { numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, Part, SkillDef } from '../../../types.ts';
import { pm } from './common.ts';

type Out = GenOutput;

const vec = (x: number, y: number) => `\\langle ${x}, ${y} \\rangle`;
const deg = (rad: number) => (rad * 180) / Math.PI;
/** The direction of ⟨x, y⟩, from 0° up to 360°, measured anticlockwise from the positive x-axis. */
const direction = (x: number, y: number) => (deg(Math.atan2(y, x)) + 360) % 360;
const sp = (x: number) => (x < 0 ? `(${x})` : `${x}`);

// ---------------------------------------------------------------------------
// 5.1 Vectors
// ---------------------------------------------------------------------------

function vectorComponents(rng: Rng, d: Difficulty): Out {
  if (d < 3) {
    const [x1, y1] = [rng.int(-6, 6), rng.int(-6, 6)];
    const [x, y] = retry(() => [rng.int(-8, 8), rng.int(-8, 8)] as [number, number], ([a, b]) => a !== 0 && b !== 0 && (d === 1 ? Number.isInteger(Math.hypot(a, b)) || rng.chance(0.3) : true), 200);
    const mag = Math.hypot(x, y);
    const whole = Number.isInteger(mag);
    const figure: Figure = { type: 'plane', grid: { xMin: Math.min(x1, x1 + x, 0) - 1, xMax: Math.max(x1, x1 + x, 0) + 1, yMin: Math.min(y1, y1 + y, 0) - 1, yMax: Math.max(y1, y1 + y, 0) + 1, step: 1 }, points: [{ x: x1, y: y1, label: 'P' }, { x: x1 + x, y: y1 + y, label: 'Q' }], segments: [{ from: [x1, y1], to: [x1 + x, y1 + y], arrowEnd: true }] };
    const parts: Part[] = [numPart(x, { label: 'Horizontal component:' }), numPart(y, { label: 'Vertical component:' }), whole ? numPart(mag, { label: 'Magnitude:' }) : numPart(mag, { label: 'Magnitude:', decimals: 1 })];
    const sol = [`From $P(${x1}, ${y1})$ to $Q(${x1 + x}, ${y1 + y})$: $${x1 + x} - ${sp(x1)} = ${x}$ across and $${y1 + y} - ${sp(y1)} = ${y}$ vertically, so $\\overrightarrow{PQ} = ${vec(x, y)}$.`, `Magnitude: $\\sqrt{${sp(x)}^2 + ${sp(y)}^2} = \\sqrt{${x * x + y * y}} ${whole ? `= ${mag}` : `\\approx ${fmt(roundTo(mag, 1))}`}$`];
    if (d === 2) {
      parts.push(numPart(direction(x, y), { label: 'Direction:', decimals: 1, suffix: '°' }));
      sol.push(`Direction: the angle from the positive $x$-axis, anticlockwise. $\\tan\\theta = \\dfrac{${y}}{${x}}$; the vector points into quadrant ${x > 0 ? (y > 0 ? 'I' : 'IV') : y > 0 ? 'II' : 'III'}, so $\\theta \\approx ${fmt(roundTo(direction(x, y), 1))}^\\circ$.`);
    }
    return {
      prompt: `The vector $\\overrightarrow{PQ}$ goes from $P(${x1}, ${y1})$ to $Q(${x1 + x}, ${y1 + y})$. Write it in component form $\\langle a, b \\rangle$ and find its magnitude${whole ? '' : ' to the nearest tenth'}${d === 2 ? ', and its direction to the nearest tenth of a degree (anticlockwise from the positive $x$-axis, from $0^\\circ$ to $360^\\circ$)' : ''}.`,
      figure,
      parts,
      hints: ['The components are the change in $x$ and the change in $y$: end point minus start point.', 'The magnitude is the length: $|\\langle a, b \\rangle| = \\sqrt{a^2 + b^2}$.'],
      solution: sol,
      calculator: true,
    };
  }
  // From magnitude and direction to components.
  const m = rng.int(5, 40);
  const th = rng.pick([20, 35, 50, 65, 110, 140, 200, 230, 300, 330]);
  const x = m * Math.cos((th * Math.PI) / 180);
  const y = m * Math.sin((th * Math.PI) / 180);
  return {
    prompt: `A vector has magnitude $${m}$ and direction $${th}^\\circ$ (anticlockwise from the positive $x$-axis). Find its horizontal and vertical components, to the nearest tenth.`,
    parts: [numPart(x, { label: 'Horizontal:', decimals: 1 }), numPart(y, { label: 'Vertical:', decimals: 1 })],
    hints: ['$\\langle |v|\\cos\\theta,\\ |v|\\sin\\theta \\rangle$.', 'The signs come out of the cosine and sine: an angle between $90^\\circ$ and $270^\\circ$ has a negative horizontal component.'],
    solution: [`Horizontal: $${m}\\cos ${th}^\\circ \\approx ${fmt(roundTo(x, 1))}$`, `Vertical: $${m}\\sin ${th}^\\circ \\approx ${fmt(roundTo(y, 1))}$`, `The vector is about $${vec(roundTo(x, 1), roundTo(y, 1))}$.`],
    calculator: true,
  };
}

function vectorOps(rng: Rng, d: Difficulty): Out {
  const u = [rng.nonZero(-7, 7), rng.nonZero(-7, 7)] as const;
  const v = [rng.nonZero(-7, 7), rng.nonZero(-7, 7)] as const;
  if (d === 1) {
    const s = rng.chance(0.5) ? 1 : -1;
    const r = [u[0] + s * v[0], u[1] + s * v[1]];
    return {
      prompt: `Let $\\mathbf{u} = ${vec(u[0], u[1])}$ and $\\mathbf{v} = ${vec(v[0], v[1])}$. Find $\\mathbf{u} ${s > 0 ? '+' : '-'} \\mathbf{v}$.`,
      parts: [numPart(r[0]!, { label: 'First component:' }), numPart(r[1]!, { label: 'Second component:' })],
      hints: [`${s > 0 ? 'Add' : 'Subtract'} the matching components.`, 'Adding vectors is placing them tip to tail: the sum goes from the start of the first to the end of the second.'],
      solution: [`$\\mathbf{u} ${s > 0 ? '+' : '-'} \\mathbf{v} = \\langle ${u[0]} ${s > 0 ? '+' : '-'} ${sp(v[0])}, ${u[1]} ${s > 0 ? '+' : '-'} ${sp(v[1])} \\rangle = ${vec(r[0]!, r[1]!)}$`],
    };
  }
  const a = rng.nonZero(-4, 4);
  const b = rng.nonZero(-4, 4);
  const r = [a * u[0] + b * v[0], a * u[1] + b * v[1]];
  const term = (k: number, n: string, first: boolean) => `${first ? (k < 0 ? '-' : '') : k < 0 ? ' - ' : ' + '}${Math.abs(k) === 1 ? '' : Math.abs(k)}\\mathbf{${n}}`;
  const expr = `${term(a, 'u', true)}${term(b, 'v', false)}`;
  const parts: Part[] = [numPart(r[0]!, { label: 'First component:' }), numPart(r[1]!, { label: 'Second component:' })];
  const coef = (k: number) => (k === 1 ? '' : k === -1 ? '-' : `${k}`);
  const sol = [`$${coef(a)}\\mathbf{u} = ${vec(a * u[0], a * u[1])}$ and $${coef(b)}\\mathbf{v} = ${vec(b * v[0], b * v[1])}$`, `Add: $${expr} = ${vec(r[0]!, r[1]!)}$`];
  if (d === 3) {
    const mag = Math.hypot(r[0]!, r[1]!);
    parts.push(Number.isInteger(mag) ? numPart(mag, { label: 'Magnitude:' }) : numPart(mag, { label: 'Magnitude:', decimals: 1 }));
    sol.push(`Magnitude: $\\sqrt{${sp(r[0]!)}^2 + ${sp(r[1]!)}^2} = \\sqrt{${r[0]! ** 2 + r[1]! ** 2}} ${Number.isInteger(mag) ? `= ${mag}` : `\\approx ${fmt(roundTo(mag, 1))}`}$`);
  }
  return {
    prompt: `Let $\\mathbf{u} = ${vec(u[0], u[1])}$ and $\\mathbf{v} = ${vec(v[0], v[1])}$. Find $${expr}$${d === 3 ? ' and its magnitude (to the nearest tenth where needed)' : ''}.`,
    parts,
    hints: ['Multiplying a vector by a number (a **scalar**) multiplies each component.', 'Then add the matching components.'],
    solution: sol,
    calculator: d === 3,
  };
}

// ---------------------------------------------------------------------------
// 5.2 Matrices
// ---------------------------------------------------------------------------

type M2 = [[number, number], [number, number]];
const mtex = (m: number[][]) => `\\begin{bmatrix} ${m.map((r) => r.join(' & ')).join(' \\\\ ')} \\end{bmatrix}`;
const rand2 = (rng: Rng, lo: number, hi: number): M2 => [[rng.int(lo, hi), rng.int(lo, hi)], [rng.int(lo, hi), rng.int(lo, hi)]];

function matrixOps(rng: Rng, d: Difficulty): Out {
  const A = rand2(rng, -5, 6);
  const B = rand2(rng, -5, 6);
  if (d === 1) {
    const k = rng.nonZero(-3, 4);
    const R = A.map((r, i) => r.map((x, j) => k * x + B[i]![j]!));
    const i = rng.int(0, 1), j = rng.int(0, 1);
    return {
      prompt: `Let $A = ${mtex(A)}$ and $B = ${mtex(B)}$. Find $${k === 1 ? '' : k}A + B$. Enter the entry in row $${i + 1}$, column $${j + 1}$, and the entry in row $${2 - i}$, column $${2 - j}$.`,
      parts: [numPart(R[i]![j]!, { label: `Row ${i + 1}, column ${j + 1}:` }), numPart(R[1 - i]![1 - j]!, { label: `Row ${2 - i}, column ${2 - j}:` })],
      hints: ['Multiplying a matrix by a number multiplies every entry.', 'Matrices of the same size add entry by entry.'],
      solution: [`$${k === 1 ? '' : k}A + B = ${mtex(R)}$`, `Row $${i + 1}$, column $${j + 1}$: $${k} \\times ${sp(A[i]![j]!)} + ${sp(B[i]![j]!)} = ${R[i]![j]}$.`],
    };
  }
  const P = [
    [A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
    [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]],
  ];
  const parts: Part[] = [numPart(P[0]![0]!, { label: 'Row 1, column 1:' }), numPart(P[0]![1]!, { label: 'Row 1, column 2:' }), numPart(P[1]![0]!, { label: 'Row 2, column 1:' }), numPart(P[1]![1]!, { label: 'Row 2, column 2:' })];
  return {
    prompt: `Let $A = ${mtex(A)}$ and $B = ${mtex(B)}$. Find ${d === 2 ? 'the first row of ' : ''}the product $AB$.`,
    parts: d === 2 ? parts.slice(0, 2) : parts,
    hints: ['Each entry of $AB$ is a row of $A$ times a column of $B$: multiply matching entries and add.', 'Row $i$ of $A$ with column $j$ of $B$ gives the entry in row $i$, column $j$.'],
    solution: [
      `Row 1, column 1: $${sp(A[0][0])} \\times ${sp(B[0][0])} + ${sp(A[0][1])} \\times ${sp(B[1][0])} = ${P[0]![0]}$`,
      `Row 1, column 2: $${sp(A[0][0])} \\times ${sp(B[0][1])} + ${sp(A[0][1])} \\times ${sp(B[1][1])} = ${P[0]![1]}$`,
      `Row 2, column 1: $${sp(A[1][0])} \\times ${sp(B[0][0])} + ${sp(A[1][1])} \\times ${sp(B[1][0])} = ${P[1]![0]}$`,
      `Row 2, column 2: $${sp(A[1][0])} \\times ${sp(B[0][1])} + ${sp(A[1][1])} \\times ${sp(B[1][1])} = ${P[1]![1]}$`,
      `$AB = ${mtex(P)}$${d === 2 ? ' (the question asks for the first row)' : ''}`,
    ],
  };
}

function matrixSystems(rng: Rng, d: Difficulty): Out {
  const A = retry(() => rand2(rng, -6, 7), (m) => { const det = m[0][0] * m[1][1] - m[0][1] * m[1][0]; return det !== 0 && (d === 1 || Math.abs(det) <= 12); }, 300);
  const det = A[0][0] * A[1][1] - A[0][1] * A[1][0];
  if (d === 1) {
    return {
      prompt: `Find the determinant of $${mtex(A)}$.`,
      parts: [numPart(det)],
      hints: ['For $\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$ the determinant is $ad - bc$.'],
      solution: [`$${sp(A[0][0])} \\times ${sp(A[1][1])} - ${sp(A[0][1])} \\times ${sp(A[1][0])} = ${A[0][0] * A[1][1]} - ${sp(A[0][1] * A[1][0])} = ${det}$`],
    };
  }
  // Solve AX = B by the inverse: choose the solution first.
  const x = rng.int(-6, 6), y = rng.int(-6, 6);
  const b1 = A[0][0] * x + A[0][1] * y;
  const b2 = A[1][0] * x + A[1][1] * y;
  const eq = (a: number, b: number, c: number) => `${a === 1 ? '' : a === -1 ? '-' : a}x ${b < 0 ? '-' : '+'} ${Math.abs(b) === 1 ? '' : Math.abs(b)}y = ${c}`;
  const inv = `\\frac{1}{${det}}${mtex([[A[1][1], -A[0][1]], [-A[1][0], A[0][0]]])}`;
  const parts: Part[] = [numPart(x, { label: '$x$ =' }), numPart(y, { label: '$y$ =' })];
  if (d === 3) parts.unshift(numPart(det, { label: 'Determinant:' }));
  return {
    prompt: `Write the system as a matrix equation $AX = B$ and solve it with the inverse of $A$.\n\n$$\\begin{aligned} ${eq(A[0][0], A[0][1], b1)} \\\\ ${eq(A[1][0], A[1][1], b2)} \\end{aligned}$$`,
    parts,
    hints: ['$A$ holds the coefficients, $X = \\begin{bmatrix} x \\\\ y \\end{bmatrix}$ and $B$ holds the constants. Then $X = A^{-1}B$.', 'For $A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$, $A^{-1} = \\dfrac{1}{ad - bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$.'],
    solution: [
      `$A = ${mtex(A)}$, $B = ${mtex([[b1], [b2]])}$, and $\\det A = ${det}$.`,
      `$A^{-1} = ${inv}$`,
      `$X = A^{-1}B = \\frac{1}{${det}}${mtex([[A[1][1] * b1 - A[0][1] * b2], [-A[1][0] * b1 + A[0][0] * b2]])} = ${mtex([[x], [y]])}$`,
      `So $x = ${x}$ and $y = ${y}$. (Check in the first equation: $${A[0][0]}(${x}) ${pm(A[0][1])}(${y}) = ${b1}$.)`,
    ],
  };
}

export const VECTOR_SKILLS: SkillDef[] = [
  skill({ id: 'mx-vector-components', name: 'Vectors: components, magnitude and direction', description: 'Write a vector in component form and find its magnitude and direction, or its components', outcomes: ['VM1'], lessonId: 'mx-5-1', gen: vectorComponents }),
  skill({ id: 'mx-vector-ops', name: 'Adding vectors and multiplying by a scalar', description: 'Add and subtract vectors and multiply them by scalars', outcomes: ['VM1'], lessonId: 'mx-5-1', gen: vectorOps }),
  skill({ id: 'mx-matrix-ops', name: 'Adding and multiplying matrices', description: 'Add matrices, multiply by a scalar and multiply 2 × 2 matrices', outcomes: ['VM2'], lessonId: 'mx-5-2', gen: matrixOps }),
  skill({ id: 'mx-matrix-systems', name: 'Determinants, inverses and systems', description: 'Find a 2 × 2 determinant and solve a system with an inverse matrix', outcomes: ['VM2'], lessonId: 'mx-5-3', gen: matrixSystems }),
];
