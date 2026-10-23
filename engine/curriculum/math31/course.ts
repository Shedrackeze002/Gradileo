/**
 * Mathematics 31 (Alberta), introductory calculus, Grade 12.
 * Topics follow Alberta's Mathematics 31 program (precalculus, limits, derivatives, derivative
 * applications, integrals and integral applications), as confirmed by Alberta-equivalent college
 * course outlines. The outcome codes are Gradileo's grouping of those general outcomes; the wording
 * still needs a word-for-word check against Alberta's Mathematics 31 program of studies.
 */
import type { CourseMeta, LessonMeta, Outcome, UnitMeta } from '../../types.ts';

export const OUTCOMES: Outcome[] = [
  { code: 'PC1', strand: 'Precalculus', text: 'Use functions, composition, trigonometric identities and the laws of logarithms in preparation for calculus.' },
  { code: 'L1', strand: 'Limits', text: 'Determine limits of functions graphically, numerically and algebraically, including one-sided limits and limits at infinity.' },
  { code: 'L2', strand: 'Limits', text: 'Determine whether a function is continuous at a point and on an interval.' },
  { code: 'D1', strand: 'Derivatives', text: 'Define the derivative as the limit of a difference quotient and interpret it as the slope of a tangent and as an instantaneous rate of change.' },
  { code: 'D2', strand: 'Derivatives', text: 'Differentiate functions using the power, product, quotient and chain rules.' },
  { code: 'D3', strand: 'Derivatives', text: 'Differentiate trigonometric, exponential and logarithmic functions.' },
  { code: 'D4', strand: 'Derivatives', text: 'Use implicit differentiation and find higher-order derivatives.' },
  { code: 'DA1', strand: 'Derivative Applications', text: 'Use the first and second derivatives to find intervals of increase and decrease, extrema, concavity and points of inflection, and to sketch curves.' },
  { code: 'DA2', strand: 'Derivative Applications', text: 'Solve optimization problems.' },
  { code: 'DA3', strand: 'Derivative Applications', text: 'Solve related-rates problems.' },
  { code: 'DA4', strand: 'Derivative Applications', text: 'Find tangent lines and linear approximations, and solve problems about motion along a line.' },
  { code: 'I1', strand: 'Integrals', text: 'Find antiderivatives, including those that satisfy an initial condition.' },
  { code: 'I2', strand: 'Integrals', text: 'Approximate areas with Riemann sums and evaluate definite integrals with the fundamental theorem of calculus.' },
  { code: 'I3', strand: 'Integrals', text: 'Integrate by substitution.' },
  { code: 'IA1', strand: 'Integral Applications', text: 'Find areas between curves and volumes of solids of revolution.' },
];

const L = (
  id: string,
  unitId: string,
  number: string,
  title: string,
  outcomes: string[],
  skills: string[],
  objectives: string[],
  minutes = 75,
  vocabulary: string[] = [],
): LessonMeta => ({ id, unitId, number, title, outcomes, skills, objectives, minutes, vocabulary });

export const LESSONS: LessonMeta[] = [
  // ---------------- Unit 1: Precalculus Review ----------------
  L('m31-1-1', 'm31-u1', '1.1', 'Functions for Calculus', ['PC1'],
    ['m31-function-review'],
    ['Evaluate and compose functions and state domains', 'Simplify difference quotients'],
    70, ['composite function', 'difference quotient']),
  L('m31-1-2', 'm31-u1', '1.2', 'Trigonometry and Logarithms for Calculus', ['PC1'],
    ['m31-trig-log-review'],
    ['Use exact trigonometric values and identities in radians', 'Use the laws of logarithms and the natural logarithm'],
    70, ['radian', 'natural logarithm']),

  // ---------------- Unit 2: Limits and Continuity ----------------
  L('m31-2-1', 'm31-u2', '2.1', 'Limits from Graphs and Tables', ['L1'],
    ['m31-limit-graph'],
    ['Read limits and one-sided limits from graphs and tables', 'Decide whether a limit exists'],
    70, ['limit', 'one-sided limit']),
  L('m31-2-2', 'm31-u2', '2.2', 'Evaluating Limits Algebraically', ['L1'],
    ['m31-limit-algebraic'],
    ['Evaluate limits by substitution, factoring and rationalizing'],
    80, ['indeterminate form']),
  L('m31-2-3', 'm31-u2', '2.3', 'Limits at Infinity and Asymptotes', ['L1'],
    ['m31-limit-infinity'],
    ['Evaluate limits at infinity and infinite limits', 'Relate them to horizontal and vertical asymptotes'],
    75, []),
  L('m31-2-4', 'm31-u2', '2.4', 'Continuity', ['L2'],
    ['m31-continuity'],
    ['Use the definition of continuity', 'Find a constant that makes a piecewise function continuous'],
    70, ['continuous', 'discontinuity']),

  // ---------------- Unit 3: The Derivative ----------------
  L('m31-3-1', 'm31-u3', '3.1', 'Rates of Change and Tangent Lines', ['D1'],
    ['m31-average-rate'],
    ['Find average rates of change and slopes of secant lines', 'Estimate instantaneous rates of change'],
    70, ['secant line', 'tangent line', 'instantaneous rate of change']),
  L('m31-3-2', 'm31-u3', '3.2', 'The Derivative from First Principles', ['D1'],
    ['m31-first-principles'],
    ['Find derivatives with the limit definition'],
    80, ['derivative']),

  // ---------------- Unit 4: Differentiation Rules ----------------
  L('m31-4-1', 'm31-u4', '4.1', 'The Power, Constant and Sum Rules', ['D2'],
    ['m31-power-rule'],
    ['Differentiate polynomials, roots and negative powers'],
    75, []),
  L('m31-4-2', 'm31-u4', '4.2', 'The Product and Quotient Rules', ['D2'],
    ['m31-product-quotient'],
    ['Differentiate products and quotients'],
    80, []),
  L('m31-4-3', 'm31-u4', '4.3', 'The Chain Rule', ['D2'],
    ['m31-chain-rule'],
    ['Differentiate composite functions'],
    80, ['chain rule']),

  // ---------------- Unit 5: Transcendental Functions and Implicit Differentiation ----------------
  L('m31-5-1', 'm31-u5', '5.1', 'Derivatives of Trigonometric Functions', ['D3'],
    ['m31-trig-derivative'],
    ['Differentiate the six trigonometric functions with the other rules'],
    80, []),
  L('m31-5-2', 'm31-u5', '5.2', 'Derivatives of Exponential and Logarithmic Functions', ['D3'],
    ['m31-exp-log-derivative'],
    ['Differentiate e^x, a^x, ln x and log_a x with the other rules'],
    80, []),
  L('m31-5-3', 'm31-u5', '5.3', 'Implicit Differentiation and Higher Derivatives', ['D4'],
    ['m31-implicit', 'm31-higher-derivative'],
    ['Find dy/dx implicitly and the slope at a point', 'Find second and higher derivatives'],
    80, ['implicit differentiation']),

  // ---------------- Unit 6: Applications of Derivatives ----------------
  L('m31-6-1', 'm31-u6', '6.1', 'Tangent Lines and Linear Approximation', ['DA4'],
    ['m31-tangent-line'],
    ['Find equations of tangent and normal lines', 'Approximate values with the tangent line'],
    70, ['normal line', 'linear approximation']),
  L('m31-6-2', 'm31-u6', '6.2', 'Increasing, Decreasing and Extreme Values', ['DA1'],
    ['m31-extrema'],
    ['Find critical numbers and intervals of increase and decrease', 'Find local and absolute extrema'],
    80, ['critical number', 'local maximum', 'absolute minimum']),
  L('m31-6-3', 'm31-u6', '6.3', 'Concavity and Curve Sketching', ['DA1'],
    ['m31-concavity'],
    ['Find intervals of concavity and points of inflection', 'Use the second derivative test and sketch curves'],
    80, ['concave up', 'point of inflection']),
  L('m31-6-4', 'm31-u6', '6.4', 'Motion Along a Line', ['DA4'],
    ['m31-motion'],
    ['Find velocity and acceleration from position', 'Decide when an object speeds up, slows down or changes direction'],
    75, ['velocity', 'acceleration']),

  // ---------------- Unit 7: Optimization and Related Rates ----------------
  L('m31-7-1', 'm31-u7', '7.1', 'Optimization', ['DA2'],
    ['m31-optimization'],
    ['Model and solve maximum and minimum problems'],
    85, ['optimization']),
  L('m31-7-2', 'm31-u7', '7.2', 'Related Rates', ['DA3'],
    ['m31-related-rates'],
    ['Relate rates of change with implicit differentiation with respect to time'],
    85, ['related rates']),

  // ---------------- Unit 8: Antiderivatives and Integrals ----------------
  L('m31-8-1', 'm31-u8', '8.1', 'Antiderivatives', ['I1'],
    ['m31-antiderivative', 'm31-initial-value'],
    ['Find general antiderivatives', 'Find the antiderivative that satisfies an initial condition'],
    80, ['antiderivative', 'constant of integration']),
  L('m31-8-2', 'm31-u8', '8.2', 'Riemann Sums and Area', ['I2'],
    ['m31-riemann'],
    ['Approximate area with left, right and midpoint sums'],
    70, ['Riemann sum']),
  L('m31-8-3', 'm31-u8', '8.3', 'The Fundamental Theorem of Calculus', ['I2'],
    ['m31-definite-integral'],
    ['Evaluate definite integrals with the fundamental theorem', 'Interpret a definite integral as net area'],
    80, ['definite integral']),
  L('m31-8-4', 'm31-u8', '8.4', 'Integration by Substitution', ['I3'],
    ['m31-substitution'],
    ['Integrate with a substitution u = g(x)', 'Change the limits of a definite integral'],
    80, ['substitution']),

  // ---------------- Unit 9: Applications of Integrals ----------------
  L('m31-9-1', 'm31-u9', '9.1', 'Area Between Curves', ['IA1'],
    ['m31-area-between'],
    ['Find the area between two curves, including finding their points of intersection'],
    80, []),
  L('m31-9-2', 'm31-u9', '9.2', 'Volumes of Revolution', ['IA1'],
    ['m31-volume-revolution'],
    ['Find volumes of solids of revolution with the disc and washer methods'],
    80, ['solid of revolution', 'disc method']),
];

export const UNITS: UnitMeta[] = [
  { id: 'm31-u1', number: 1, title: 'Precalculus Review', description: 'Functions, composition, trigonometry and logarithms for calculus.', outcomes: ['PC1'], lessons: [], color: 'emerald' },
  { id: 'm31-u2', number: 2, title: 'Limits and Continuity', description: 'Limits from graphs, tables and algebra, limits at infinity, and continuity.', outcomes: ['L1', 'L2'], lessons: [], color: 'amber' },
  { id: 'm31-u3', number: 3, title: 'The Derivative', description: 'Average and instantaneous rates of change and the derivative from first principles.', outcomes: ['D1'], lessons: [], color: 'teal' },
  { id: 'm31-u4', number: 4, title: 'Differentiation Rules', description: 'The power, sum, product, quotient and chain rules.', outcomes: ['D2'], lessons: [], color: 'sky' },
  { id: 'm31-u5', number: 5, title: 'Transcendental Functions and Implicit Differentiation', description: 'Derivatives of trigonometric, exponential and logarithmic functions, implicit differentiation and higher derivatives.', outcomes: ['D3', 'D4'], lessons: [], color: 'violet' },
  { id: 'm31-u6', number: 6, title: 'Applications of Derivatives', description: 'Tangent lines, linear approximation, extrema, concavity, curve sketching and motion.', outcomes: ['DA1', 'DA4'], lessons: [], color: 'orange' },
  { id: 'm31-u7', number: 7, title: 'Optimization and Related Rates', description: 'Maximum and minimum problems and related rates.', outcomes: ['DA2', 'DA3'], lessons: [], color: 'rose' },
  { id: 'm31-u8', number: 8, title: 'Antiderivatives and Integrals', description: 'Antiderivatives, Riemann sums, the fundamental theorem of calculus and substitution.', outcomes: ['I1', 'I2', 'I3'], lessons: [], color: 'fuchsia' },
  { id: 'm31-u9', number: 9, title: 'Applications of Integrals', description: 'Areas between curves and volumes of solids of revolution.', outcomes: ['IA1'], lessons: [], color: 'indigo' },
];

for (const u of UNITS) u.lessons = LESSONS.filter((l) => l.unitId === u.id).map((l) => l.id);

export const MATH31: CourseMeta = {
  id: 'math-31',
  title: 'Grade 12 Mathematics: Calculus',
  shortTitle: 'Math 12 Calculus',
  grade: 12,
  subject: 'Mathematics',
  description: 'Introductory calculus: limits and continuity, the derivative and its rules, derivatives of trigonometric, exponential and logarithmic functions, curve sketching, optimization, related rates and motion, antiderivatives, definite integrals, and areas and volumes.',
  outcomes: OUTCOMES,
  units: UNITS,
  lessons: LESSONS,
};
