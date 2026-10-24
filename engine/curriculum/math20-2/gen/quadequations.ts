/**
 * Math 20-2 Unit 7 — Quadratic Equations (RF2).
 * Solving by graphing, by factoring and with the quadratic formula, and modelling problems (rejecting impossible roots).
 */
import { niceNum, numPart, part, pt, skill } from '../../helpers.ts';
import { fmt, fmtFixed, gcd, isPerfectSquare, paren, radicalSplit, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { GridSpec, Part, SkillDef } from '../../../types.ts';
import {
  NAMES,
  clearOfBoundary,
  evalParab,
  factorTex,
  factoredTex,
  fitGrid,
  graphFigure,
  gridOk,
  leadTex,
  money,
  parabFromVertex,
  parabFromZeros,
  polyTex,
  stdTex,
} from './quadfunctions.ts';

const rootsPart = (values: number[], opts: { label?: string; decimals?: number; suffix?: string } = {}): Part =>
  part({ kind: 'numbers', values, decimals: opts.decimals }, { label: opts.label, suffix: opts.suffix, placeholder: 'e.g. -2, 5' });

/** "x = 2 or x = -3" in LaTeX. */
function orText(values: number[], v = 'x', show: (n: number) => string = niceNum): string {
  return values.map((r) => `$${v} = ${show(r)}$`).join(' or ');
}

/** Solving x^2 + bx + c = 0 with roots r and s by factoring (a = 1). */
function monicSteps(r: number, s: number, v = 'x'): string[] {
  const b = -(r + s);
  const c = r * s;
  return [
    `Find two integers with a product of $${c}$ and a sum of $${b}$: $${-r}$ and $${-s}$.`,
    `Factor: $${factoredTex(1, r, s, v)} = 0$`,
    `Set each factor equal to $0$: ${orText(r === s ? [r] : [r, s], v)}.`,
  ];
}

const sortNum = (xs: number[]) => [...xs].sort((p, q) => p - q);

function distinctPair(rng: Rng, lo: number, hi: number, opts: { nonZero?: boolean } = {}): [number, number] {
  for (;;) {
    const r = rng.int(lo, hi);
    const s = rng.int(lo, hi);
    if (r === s) continue;
    if (opts.nonZero && (r === 0 || s === 0)) continue;
    return [r, s];
  }
}

/** Factors (mx + n)(px + q) with integer coefficients and no common factor; roots -n/m and -q/p. */
function rationalFactors(rng: Rng, opts: { minA: number; range: number }) {
  for (;;) {
    const m = rng.int(1, 3);
    const p = rng.int(1, 3);
    if (m * p < opts.minA) continue;
    const n = rng.nonZero(-opts.range, opts.range);
    const q = rng.nonZero(-opts.range, opts.range);
    if (gcd(m, n) !== 1 || gcd(p, q) !== 1) continue;
    if (n * p === q * m) continue; // repeated root
    const a = m * p;
    const b = m * q + n * p;
    const c = n * q;
    if (b === 0 || Math.abs(b) > 40 || Math.abs(c) > 60) continue;
    return { m, n, p, q, a, b, c, roots: sortNum([-n / m, -q / p]) };
  }
}

const binTex = (m: number, n: number) => `(${polyTex([[m, 'x'], [n, '']])})`;

/** Factoring ax^2 + bx + c (a > 1) by decomposition, then solving. */
function decompositionSteps(f: ReturnType<typeof rationalFactors>): string[] {
  const { m, n, p, q, a, b, c } = f;
  const inner = binTex(p, q);
  const second = n > 0 ? ` + ${n === 1 ? '' : n}${inner}` : ` - ${n === -1 ? '' : -n}${inner}`;
  return [
    `$ac = ${a} \\times ${paren(c)} = ${a * c}$. Find two integers with a product of $${a * c}$ and a sum of $${b}$: $${m * q}$ and $${n * p}$.`,
    `Split the middle term and group: $${polyTex([[a, 'x^2'], [m * q, 'x'], [n * p, 'x'], [n * q, '']])} = ${leadTex(m)}x${inner}${second} = ${binTex(m, n)}${inner}$`,
    `Set each factor equal to $0$: $${polyTex([[m, 'x'], [n, '']])} = 0$ or $${polyTex([[p, 'x'], [q, '']])} = 0$.`,
    `${orText(f.roots)}`,
  ];
}

/** The quadratic formula worked through. `mode` is 'exact' or a number of decimals. */
function formulaSteps(a: number, b: number, c: number, mode: 'exact' | number, v = 'x'): { steps: string[]; roots: number[]; exact?: string } {
  const D = roundTo(b * b - 4 * a * c, 9);
  const fourAC = roundTo(4 * a * c, 9);
  const steps = [
    `Identify $a = ${fmt(a)}$, $b = ${fmt(b)}$ and $c = ${fmt(c)}$.`,
    `$b^2 - 4ac = ${paren(b)}^2 - 4(${fmt(a)})(${fmt(c)}) = ${fmt(b * b)} ${fourAC <= 0 ? '+' : '-'} ${fmt(Math.abs(fourAC))} = ${fmt(D)}$`,
  ];
  if (D < 0) {
    steps.push(`$b^2 - 4ac$ is negative, and no real number is the square root of a negative number, so the equation has no real roots.`);
    return { steps, roots: [] };
  }
  const negB = fmt(-b);
  const top = (sq: string) => (b === 0 ? `\\pm ${sq}` : `${negB} \\pm ${sq}`);
  steps.push(`$${v} = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} = \\dfrac{${top(`\\sqrt{${fmt(D)}}`)}}{${fmt(2 * a)}}$`);
  const sq = Math.sqrt(D);
  const roots = sortNum([(-b + sq) / (2 * a), (-b - sq) / (2 * a)]);
  if (D === 0) {
    steps.push(`$b^2 - 4ac = 0$, so there is one root: $${v} = \\dfrac{${negB}}{${fmt(2 * a)}} = ${niceNum(-b / (2 * a))}$.`);
    return { steps, roots: [-b / (2 * a)] };
  }
  const rootPlus = (-b + sq) / (2 * a);
  const rootMinus = (-b - sq) / (2 * a);
  if (Number.isInteger(D) && isPerfectSquare(D)) {
    steps.push(
      `$\\sqrt{${D}} = ${sq}$, so $${v} = \\dfrac{${negB} + ${sq}}{${fmt(2 * a)}} = ${niceNum(rootPlus)}$ or $${v} = \\dfrac{${negB} - ${sq}}{${fmt(2 * a)}} = ${niceNum(rootMinus)}$.`,
    );
    return { steps, roots };
  }
  if (mode === 'exact' && Number.isInteger(D) && Number.isInteger(a) && Number.isInteger(b)) {
    const { outside: k, inside: rad } = radicalSplit(D, 2);
    const sgn = a < 0 ? -1 : 1;
    let num = -b * sgn;
    let den = Math.abs(2 * a);
    let kk = k;
    const g = gcd(gcd(Math.abs(num), kk), den) || 1;
    num /= g;
    den /= g;
    kk /= g;
    const sqTex = `${kk === 1 ? '' : kk}\\sqrt{${rad}}`;
    const numer = num === 0 ? `\\pm ${sqTex}` : `${num} \\pm ${sqTex}`;
    const exact = den === 1 ? numer : `\\dfrac{${numer}}{${den}}`;
    if (k > 1 || g > 1 || sgn < 0) steps.push(`Simplify: $${v} = ${exact}$`);
    steps.push(`The roots are $${v} = ${exact}$ (about $${fmtFixed(roots[0], 2)}$ and $${fmtFixed(roots[1], 2)}$).`);
    return { steps, roots, exact };
  }
  const dp = typeof mode === 'number' ? mode : 2;
  steps.push(`$${v} = \\dfrac{${negB} + \\sqrt{${fmt(D)}}}{${fmt(2 * a)}} \\approx ${fmtFixed(rootPlus, dp)}$ or $${v} = \\dfrac{${negB} - \\sqrt{${fmt(D)}}}{${fmt(2 * a)}} \\approx ${fmtFixed(rootMinus, dp)}$`);
  return { steps, roots };
}

const FORMULA = '$x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$';

// ---------------------------------------------------------------------------
// 7.1 — Solving by graphing and by factoring
// ---------------------------------------------------------------------------

const solveFactor = skill({
  id: 'm202-quad-solve-factor',
  name: 'Solving quadratic equations by graphing and factoring',
  description: 'Solve a quadratic equation by reading the x-intercepts of a graph, or by writing it in standard form, factoring and using the zero product property.',
  outcomes: ['RF2'],
  lessonId: 'm202-7-1',
  gen(rng, d) {
    const graphNote = 'The roots of $ax^2 + bx + c = 0$ are the $x$-intercepts (zeros) of the graph of $y = ax^2 + bx + c$.';
    if (d === 1) {
      const v = rng.pick(['graph', 'zpp', 'trinomial'] as const);
      if (v === 'graph') {
        for (;;) {
          const a = rng.pick([1, -1]);
          const [r, s] = distinctPair(rng, -6, 6);
          const p = parabFromZeros(a, r, s);
          const grid = fitGrid(p);
          if (!gridOk(grid)) continue;
          const eq = stdTex(a, p.b, p.c);
          return {
            prompt: `The graph of $y = ${eq}$ is shown. Use the graph to solve $${eq} = 0$.`,
            figure: graphFigure(evalParab(p), grid),
            parts: [rootsPart(p.zeros)],
            hints: [graphNote, 'Read the $x$-coordinates of the points where the parabola crosses the $x$-axis.'],
            solution: [graphNote, `The graph crosses the $x$-axis at $${pt(p.zeros[0], 0)}$ and $${pt(p.zeros[1], 0)}$.`, `Check one root: $${eq.replace(/x/g, `(${p.zeros[0]})`)} = 0$ ✓`, `The roots are ${orText(p.zeros)}.`],
          };
        }
      }
      if (v === 'zpp') {
        const [r, s] = distinctPair(rng, -9, 9);
        return {
          prompt: `Solve $${factoredTex(1, r, s)} = 0$.`,
          parts: [rootsPart(sortNum([r, s]))],
          hints: ['If a product equals $0$, then at least one of its factors equals $0$ (the zero product property).', 'Set each factor equal to $0$ and solve. Watch the signs.'],
          solution: ['Use the zero product property: one of the factors must be $0$.', `$${factorTex(r).replace(/^\(|\)$/g, '')} = 0$ or $${factorTex(s).replace(/^\(|\)$/g, '')} = 0$`, `The roots are ${orText(sortNum([r, s]))}.`],
        };
      }
      const [r, s] = distinctPair(rng, -6, 6, { nonZero: true });
      return {
        prompt: `Solve by factoring: $${stdTex(1, -(r + s), r * s)} = 0$`,
        parts: [rootsPart(sortNum([r, s]))],
        hints: ['Factor $x^2 + bx + c$ as $(x + m)(x + n)$, where $mn = c$ and $m + n = b$.', 'Then set each factor equal to $0$.'],
        solution: [...monicSteps(r, s)],
      };
    }
    if (d === 2) {
      const v = rng.pick(['rearrange', 'special', 'graphSpecial'] as const);
      if (v === 'rearrange') {
        const [r, s] = distinctPair(rng, -8, 8, { nonZero: true });
        const b = -(r + s);
        const c = r * s;
        const form = rng.int(0, 2);
        let eq: string;
        if (form === 0) eq = `${polyTex([[1, 'x^2'], [b, 'x']])} = ${-c}`;
        else if (form === 1) eq = `x^2 = ${polyTex([[-b, 'x'], [-c, '']])}`;
        else {
          const b2 = rng.nonZero(-6, 6);
          const c2 = rng.nonZero(-9, 9);
          eq = `${stdTex(1, b + b2, c + c2)} = ${polyTex([[b2, 'x'], [c2, '']])}`;
        }
        return {
          prompt: `Solve by factoring: $${eq}$`,
          parts: [rootsPart(sortNum([r, s]))],
          hints: ['First move every term to one side so the equation reads $ax^2 + bx + c = 0$.', 'Then factor and set each factor equal to $0$.'],
          solution: [`Write the equation in standard form: $${stdTex(1, b, c)} = 0$.`, ...monicSteps(r, s)],
        };
      }
      if (v === 'special') {
        const kind = rng.pick(['common', 'squares', 'gcf'] as const);
        if (kind === 'common') {
          const k = rng.int(1, 5);
          const s = rng.nonZero(-9, 9);
          const moved = rng.chance(0.5);
          const eq = moved ? `${polyTex([[k, 'x^2']])} = ${polyTex([[k * s, 'x']])}` : `${polyTex([[k, 'x^2'], [-k * s, 'x']])} = 0`;
          return {
            prompt: `Solve: $${eq}$`,
            parts: [rootsPart(sortNum([0, s]))],
            hints: ['Get $0$ on one side, then remove the common factor.', `Do not divide both sides by $x$: that loses the root $x = 0$.`],
            solution: [
              ...(moved ? [`Standard form: $${polyTex([[k, 'x^2'], [-k * s, 'x']])} = 0$`] : []),
              `Remove the common factor: $${leadTex(k)}x${factorTex(s)} = 0$`,
              `$x = 0$ or $${factorTex(s).replace(/^\(|\)$/g, '')} = 0$`,
              `The roots are ${orText(sortNum([0, s]))}.`,
            ],
          };
        }
        if (kind === 'squares') {
          const n = rng.int(2, 12);
          const k = rng.pick([1, 1, 2, 3, 4]);
          const eq = k === 1 && rng.chance(0.5) ? `x^2 = ${n * n}` : `${polyTex([[k, 'x^2'], [-k * n * n, '']])} = 0`;
          return {
            prompt: `Solve: $${eq}$`,
            parts: [rootsPart([-n, n])],
            hints: ['Write the equation with $0$ on one side. Look for a difference of squares.', '$x^2 - n^2 = (x - n)(x + n)$, so there are two roots.'],
            solution: [
              ...(k > 1 ? [`Remove the common factor: $${k}(x^2 - ${n * n}) = 0$, so $x^2 - ${n * n} = 0$.`] : [`$x^2 - ${n * n} = 0$`]),
              `Difference of squares: $(x - ${n})(x + ${n}) = 0$`,
              `The roots are $x = ${n}$ or $x = -${n}$.`,
            ],
          };
        }
        const k = rng.int(2, 5);
        const [r, s] = distinctPair(rng, -7, 7, { nonZero: true });
        const b = -(r + s);
        const c = r * s;
        return {
          prompt: `Solve by factoring: $${stdTex(k, k * b, k * c)} = 0$`,
          parts: [rootsPart(sortNum([r, s]))],
          hints: [`Every coefficient is a multiple of $${k}$. Remove that common factor first.`, 'Then factor the trinomial and set each factor equal to $0$.'],
          solution: [`Remove the common factor: $${k}(${stdTex(1, b, c)}) = 0$. Since $${k} \\ne 0$, $${stdTex(1, b, c)} = 0$.`, ...monicSteps(r, s)],
        };
      }
      for (;;) {
        const a = rng.pick([1, -1, 2, -2]);
        const h = rng.int(-4, 4);
        const none = rng.chance(0.5);
        const k = none ? Math.sign(a) * rng.int(1, 4) : 0;
        if (!none && h === 0) continue;
        const p = parabFromVertex(a, h, k);
        const grid = fitGrid(p);
        if (!gridOk(grid) || Math.abs(p.c) > 12) continue;
        const eq = stdTex(a, p.b, p.c);
        return {
          prompt: `The graph of $y = ${eq}$ is shown. Use the graph to solve $${eq} = 0$. If there are no real roots, type no real roots.`,
          figure: graphFigure(evalParab(p), grid),
          parts: [rootsPart(p.zeros)],
          hints: [graphNote, 'A parabola can cross the $x$-axis twice, touch it once, or miss it completely.'],
          solution: none
            ? [graphNote, `The vertex $${pt(h, k)}$ is ${a > 0 ? 'above' : 'below'} the $x$-axis and the parabola opens ${a > 0 ? 'up' : 'down'}, so the graph never meets the $x$-axis.`, 'The equation has no real roots.']
            : [graphNote, `The graph touches the $x$-axis only at its vertex $${pt(h, 0)}$.`, `There is one root: $x = ${h}$.`],
        };
      }
    }
    const v = rng.pick(['ac', 'acRearrange', 'line'] as const);
    if (v === 'line') {
      for (;;) {
        const a = rng.pick([1, -1]);
        const [r, s] = distinctPair(rng, -5, 5);
        const m = rng.nonZero(-6, 6);
        const p0 = parabFromZeros(a, r, s);
        const p = parabFromVertex(a, p0.h, p0.k + m);
        const grid: GridSpec = fitGrid(p, [], [m]);
        if (!gridOk(grid)) continue;
        const eq = stdTex(a, p.b, p.c);
        const zs = sortNum([r, s]);
        return {
          prompt: `The graph of $y = ${eq}$ and the line $y = ${m}$ are shown. Use the graph to solve $${eq} = ${m}$.`,
          figure: graphFigure(evalParab(p), grid, {
            lines: [{ through: [[grid.xMin, m], [grid.xMax, m]], color: 'accent', dashed: true, label: `y = ${m}` }],
            points: zs.map((z) => ({ x: z, y: m, color: 'accent' as const })),
          }),
          parts: [rootsPart(zs)],
          hints: [`The solutions are the $x$-values where $y = ${eq}$ equals $${m}$: where the parabola meets the line $y = ${m}$.`, 'Read the $x$-coordinates of the two intersection points.'],
          solution: [
            `The parabola meets the line $y = ${m}$ at $${pt(zs[0], m)}$ and $${pt(zs[1], m)}$.`,
            `Check $x = ${zs[0]}$: $${polyTex([[a, `(${zs[0]})^2`], [p.b, `(${zs[0]})`], [p.c, '']])} = ${m}$ ✓`,
            `The roots are ${orText(zs)}.`,
          ],
        };
      }
    }
    const f = rationalFactors(rng, { minA: 2, range: 7 });
    if (v === 'ac') {
      return {
        prompt: `Solve by factoring: $${stdTex(f.a, f.b, f.c)} = 0$. Write any fractional root as a fraction, such as 2/3.`,
        parts: [rootsPart(f.roots)],
        hints: ['Find two integers whose product is $ac$ and whose sum is $b$, then split the middle term and factor by grouping.', 'Set each binomial factor equal to $0$. A root can be a fraction.'],
        solution: decompositionSteps(f),
      };
    }
    const form = rng.int(0, 1);
    const b2 = rng.nonZero(-5, 5);
    const eq = form === 0 ? `${polyTex([[f.a, 'x^2']])} = ${polyTex([[-f.b, 'x'], [-f.c, '']])}` : `${polyTex([[f.a, 'x^2'], [f.b + b2, 'x']])} = ${polyTex([[b2, 'x'], [-f.c, '']])}`;
    return {
      prompt: `Solve by factoring: $${eq}$. Write any fractional root as a fraction, such as 2/3.`,
      parts: [rootsPart(f.roots)],
      hints: ['Move every term to one side to get $ax^2 + bx + c = 0$.', 'Factor by decomposition (split the middle term), then set each factor equal to $0$.'],
      solution: [`Write the equation in standard form: $${stdTex(f.a, f.b, f.c)} = 0$.`, ...decompositionSteps(f)],
    };
  },
});

// ---------------------------------------------------------------------------
// 7.2 — The quadratic formula
// ---------------------------------------------------------------------------

function irrationalQuad(rng: Rng, aSet: number[], allowNegative = 0): { a: number; b: number; c: number } {
  for (;;) {
    const a = rng.pick(aSet);
    const b = rng.int(-9, 9);
    const c = rng.nonZero(-9, 9);
    const D = b * b - 4 * a * c;
    if (D < 0) {
      if (rng.chance(allowNegative)) return { a, b, c };
      continue;
    }
    if (D === 0 || isPerfectSquare(D)) continue;
    const r1 = (-b + Math.sqrt(D)) / (2 * a);
    const r2 = (-b - Math.sqrt(D)) / (2 * a);
    if (!clearOfBoundary(r1, 2) || !clearOfBoundary(r2, 2)) continue;
    return { a, b, c };
  }
}

const quadFormula = skill({
  id: 'm202-quad-formula',
  name: 'The quadratic formula',
  description: 'Solve quadratic equations with the quadratic formula, exactly or to the nearest hundredth, and recognize when there are no real roots.',
  outcomes: ['RF2'],
  lessonId: 'm202-7-2',
  calculator: true,
  gen(rng, d) {
    if (d === 1) {
      const f = rationalFactors(rng, { minA: 1, range: 6 });
      const sign = f.a > 0 ? 1 : -1;
      const { steps, roots } = formulaSteps(f.a * sign, f.b * sign, f.c * sign, 'exact');
      const D = f.b * f.b - 4 * f.a * f.c;
      return {
        prompt: `Use the quadratic formula to solve $${stdTex(f.a, f.b, f.c)} = 0$. First find the value of $b^2 - 4ac$.`,
        parts: [numPart(D, { label: '$b^2 - 4ac =$' }), rootsPart(roots, { label: 'Roots' })],
        hints: [`The quadratic formula is ${FORMULA}.`, 'Work out $b^2 - 4ac$ first, take its square root, then use $+$ and $-$ to get two roots.'],
        solution: steps,
        calculator: false,
      };
    }
    if (d === 2) {
      const { a, b, c } = irrationalQuad(rng, [1, 2, 3, -1, -2, 4, 5]);
      const exact = rng.chance(0.3);
      const { steps, roots, exact: ex } = formulaSteps(a, b, c, exact ? 'exact' : 2);
      return {
        prompt: exact
          ? `Use the quadratic formula to solve $${stdTex(a, b, c)} = 0$. Give both roots exactly, in simplest radical form, separated by a comma (for example (3 + sqrt(5))/2, (3 - sqrt(5))/2).`
          : `Use the quadratic formula to solve $${stdTex(a, b, c)} = 0$. Round the roots to the nearest hundredth.`,
        parts: [rootsPart(roots, { decimals: exact ? undefined : 2 })],
        hints: [`The quadratic formula is ${FORMULA}. Write down $a$, $b$ and $c$ with their signs.`, 'Calculate $b^2 - 4ac$ first. Use brackets around negative numbers on your calculator.'],
        solution: steps,
        answerDisplay: exact && ex ? `$x = ${ex}$` : undefined,
      };
    }
    // d3: rearrange first; sometimes decimal coefficients; sometimes no real roots
    const form = rng.int(0, 3);
    if (form === 3) {
      for (;;) {
        const { a, b, c } = irrationalQuad(rng, [2, 3, 4, 5, -2, -3, -5], 0.15);
        const A = a / 10;
        const B = b / 10;
        const C = c / 10;
        const { steps, roots } = formulaSteps(A, B, C, 2);
        if (roots.some((r) => !clearOfBoundary(r, 2))) continue;
        return {
          prompt: `Solve $${stdTex(A, B, C)} = 0$ with the quadratic formula. Round to the nearest hundredth. If there are no real roots, type no real roots.`,
          parts: [rootsPart(roots, { decimals: 2 })],
          hints: [`Use ${FORMULA} with the decimal coefficients as they are.`, 'If $b^2 - 4ac$ is negative, there are no real roots.'],
          solution: steps,
        };
      }
    }
    const { a, b, c } = irrationalQuad(rng, [1, 2, 3, -2, 4, 5], 0.2);
    let eq: string;
    if (form === 0) {
      const b2 = rng.nonZero(-6, 6);
      const c2 = rng.nonZero(-9, 9);
      eq = `${stdTex(a, b + b2, c + c2)} = ${polyTex([[b2, 'x'], [c2, '']])}`;
    } else if (form === 1 && b !== 0) eq = `x(${polyTex([[a, 'x'], [b, '']])}) = ${-c}`;
    else eq = `${polyTex([[a, 'x^2']])} = ${polyTex([[-b, 'x'], [-c, '']])}`;
    const { steps, roots } = formulaSteps(a, b, c, 2);
    return {
      prompt: `Solve $${eq}$. Round to the nearest hundredth. If there are no real roots, type no real roots.`,
      parts: [rootsPart(roots, { decimals: 2 })],
      hints: ['Rearrange into standard form $ax^2 + bx + c = 0$ first. Expand any brackets.', `Then use ${FORMULA}. If $b^2 - 4ac$ is negative, there are no real roots.`],
      solution: [`Standard form: $${stdTex(a, b, c)} = 0$.`, ...steps],
    };
  },
});

// ---------------------------------------------------------------------------
// 7.3 — Modelling and solving problems
// ---------------------------------------------------------------------------

const RECTS = ['garden', 'patio', 'vegetable plot', 'deck', 'skating rink', 'dog run', 'parking lot'];
const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [12, 35, 37], [9, 40, 41]];

const quadApply = skill({
  id: 'm202-quad-apply',
  name: 'Solving problems with quadratic equations',
  description: 'Model a situation with a quadratic equation (area, borders, projectiles, break-even, right triangles), solve it, and reject roots that are impossible in context.',
  outcomes: ['RF2'],
  lessonId: 'm202-7-3',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      if (rng.chance(0.5)) {
        const w = rng.int(3, 15);
        const k = rng.int(1, 8);
        const A = w * (w + k);
        const thing = rng.pick(RECTS);
        return {
          prompt: `A rectangular ${thing} is $${k}$ m longer than it is wide. Its area is $${A}\\ \\text{m}^2$. If the width is $w$ metres, then $w(w + ${k}) = ${A}$. Solve the equation to find the width.`,
          parts: [numPart(w, { label: 'Width', suffix: 'm' })],
          hints: [`Expand and rearrange: $w^2 + ${k}w - ${A} = 0$. Then factor.`, 'A width cannot be negative, so reject any negative root.'],
          solution: [`$w^2 + ${k}w - ${A} = 0$`, `$(w - ${w})(w + ${w + k}) = 0$, so $w = ${w}$ or $w = -${w + k}$.`, `A width cannot be negative, so reject $w = -${w + k}$.`, `The width is $${w}$ m.`],
          calculator: false,
        };
      }
      const t1 = rng.int(2, 6);
      const t0 = rng.int(1, t1 - 1);
      const b = 5 * (t1 - t0);
      const c = 5 * t1 * t0;
      const from = rng.pick(['the top of a building', 'a bridge over a river', 'the edge of a cliff', 'a tall observation deck']);
      return {
        prompt: `${name} throws a ball upward from ${from}. Its height above the ground, $h$ metres, after $t$ seconds is $h = ${stdTex(-5, b, c, 't')}$. Solve $${stdTex(-5, b, c, 't')} = 0$ to find when the ball reaches the ground.`,
        parts: [numPart(t1, { label: '$t =$', suffix: 's' })],
        hints: ['Divide every term by $-5$ first, then factor.', 'Time after the throw cannot be negative.'],
        solution: [`Divide by $-5$: $${stdTex(1, -(t1 - t0), -t1 * t0, 't')} = 0$`, `$(t - ${t1})(t + ${t0}) = 0$, so $t = ${t1}$ or $t = -${t0}$.`, `The time cannot be negative, so reject $t = -${t0}$.`, `The ball reaches the ground after $${t1}$ s.`],
        calculator: false,
      };
    }
    if (d === 2) {
      const v = rng.pick(['border', 'breakEven', 'land'] as const);
      if (v === 'border') {
        const ctx = rng.pick([
          { what: 'A photo', how: 'is framed with a mat of uniform width', unit: 'cm', L: [20, 40], W: [15, 30], x: [2, 8], total: 'the framed photo' },
          { what: 'A rectangular lawn', how: 'is surrounded by a gravel path of uniform width', unit: 'm', L: [8, 20], W: [5, 12], x: [1, 4], total: 'the lawn and path together' },
          { what: 'A rectangular pool', how: 'has a concrete deck of uniform width all around it', unit: 'm', L: [8, 16], W: [4, 8], x: [1, 4], total: 'the pool and deck together' },
        ]);
        const L = rng.int(ctx.L[0], ctx.L[1]);
        const W = rng.int(ctx.W[0], Math.min(ctx.W[1], L - 1));
        const x = rng.int(ctx.x[0], ctx.x[1]);
        const T = (L + 2 * x) * (W + 2 * x);
        const K = (T - L * W) / 2;
        const other = -(2 * x + L + W) / 2;
        const u = ctx.unit;
        return {
          prompt: `${ctx.what} measuring $${L}$ ${u} by $${W}$ ${u} ${ctx.how}. The total area of ${ctx.total} is $${T}\\ \\text{${u}}^2$. Find the width of the border.`,
          parts: [numPart(x, { label: 'Width', suffix: u })],
          hints: [`If the border is $x$ ${u} wide, the outside measures $(${L} + 2x)$ by $(${W} + 2x)$.`, `Solve $(${L} + 2x)(${W} + 2x) = ${T}$ and reject the negative root.`],
          solution: [
            `$(${L} + 2x)(${W} + 2x) = ${T}$`,
            `Expand: $${stdTex(4, 2 * (L + W), L * W)} = ${T}$, so $${stdTex(4, 2 * (L + W), L * W - T)} = 0$.`,
            `Divide by 2: $${stdTex(2, L + W, -K)} = 0$, which factors as $(x - ${x})(2x + ${2 * x + L + W}) = 0$.`,
            `$x = ${x}$ or $x = ${fmt(other)}$. A width cannot be negative, so reject $x = ${fmt(other)}$.`,
            `The border is $${x}$ ${u} wide.`,
          ],
        };
      }
      if (v === 'breakEven') {
        const k = rng.pick([2, 5, 10, 20]);
        const p1 = rng.int(3, 10);
        const p2 = rng.int(p1 + 4, p1 + 14);
        const B = k * (p1 + p2);
        const C = k * p1 * p2;
        const biz = rng.pick([
          { who: 'A school club selling smoothies', item: 'a smoothie' },
          { who: 'A small business that makes candles', item: 'a candle' },
          { who: 'A food truck in a northern city', item: 'a meal' },
          { who: 'A student selling custom phone cases', item: 'a phone case' },
        ]);
        return {
          prompt: `${biz.who} models its profit, $P$ dollars, when it charges $x$ dollars for ${biz.item} with $P = ${stdTex(-k, B, -C)}$. Find the break-even prices (where the profit is \\$0).`,
          parts: [rootsPart([p1, p2], { label: 'Prices (\\$)' })],
          hints: ['Break even means $P = 0$. Solve the equation.', `Divide every term by $${-k}$ first, then factor.`],
          solution: [
            `Set $P = 0$: $${stdTex(-k, B, -C)} = 0$`,
            `Divide by $${-k}$: $${stdTex(1, -(p1 + p2), p1 * p2)} = 0$`,
            `$(x - ${p1})(x - ${p2}) = 0$, so $x = ${p1}$ or $x = ${p2}$.`,
            `Both prices make sense, so it breaks even at ${money(p1)} and at ${money(p2)}.`,
          ],
        };
      }
      for (;;) {
        const vv = rng.int(8, 22);
        const h0 = rng.pick([1.2, 1.5, 1.8, 2, 10, 15, 25]);
        const D = vv * vv + 4 * 4.9 * h0;
        const t = (vv + Math.sqrt(D)) / 9.8;
        const neg = (vv - Math.sqrt(D)) / 9.8;
        if (!clearOfBoundary(t, 2)) continue;
        const thing = h0 < 5 ? rng.pick(['kicks a soccer ball', 'hits a volleyball', 'throws a softball']) : rng.pick(['throws a stone upward from a cliff', 'tosses a ball upward from a balcony']);
        const { steps } = formulaSteps(-4.9, vv, h0, 2, 't');
        return {
          prompt: `${name} ${thing}. Its height, $h$ metres, after $t$ seconds is $h = ${stdTex(-4.9, vv, h0, 't')}$. When does it hit the ground? Round to the nearest hundredth of a second.`,
          parts: [numPart(t, { label: '$t =$', decimals: 2, suffix: 's' })],
          hints: ['It hits the ground when $h = 0$. This equation does not factor, so use the quadratic formula.', 'Time cannot be negative, so reject the negative root.'],
          solution: [`Solve $${stdTex(-4.9, vv, h0, 't')} = 0$.`, ...steps, `Reject $t \\approx ${fmtFixed(neg, 2)}$ because time cannot be negative.`, `It hits the ground after about $${fmtFixed(t, 2)}$ s.`],
        };
      }
    }
    const v = rng.pick(['path', 'perimArea', 'rightTri', 'heightTimes'] as const);
    if (v === 'path') {
      for (;;) {
        const L = rng.int(6, 20);
        const W = rng.int(4, L - 1);
        const half = rng.chance(0.5);
        const f = half ? 0.5 : 1;
        const fLW = f * L * W;
        const { steps, roots } = formulaSteps(4, 2 * (L + W), -fLW, 2);
        const x = roots[1];
        if (!clearOfBoundary(x, 2)) continue;
        return {
          prompt: `${name} plans a rectangular garden $${L}$ m by $${W}$ m, with a path of uniform width all around it. The area of the path is to be ${half ? 'half of' : 'equal to'} the area of the garden. How wide should the path be? Round to the nearest hundredth of a metre.`,
          parts: [numPart(x, { label: 'Width', decimals: 2, suffix: 'm' })],
          hints: [`Garden and path together measure $(${L} + 2x)$ by $(${W} + 2x)$, and their total area is ${half ? '$1.5$ times' : 'twice'} the garden's area.`, 'Expand, write the equation in standard form, use the quadratic formula and reject the negative root.'],
          solution: [
            `Garden area: $${L} \\times ${W} = ${L * W}\\ \\text{m}^2$. Total area: $${fmt(L * W + fLW)}\\ \\text{m}^2$.`,
            `$(${L} + 2x)(${W} + 2x) = ${fmt(L * W + fLW)}$, so $${stdTex(4, 2 * (L + W), -fLW)} = 0$.`,
            ...steps,
            `Reject the negative root. The path should be about $${fmtFixed(x, 2)}$ m wide.`,
          ],
        };
      }
    }
    if (v === 'perimArea') {
      const w = rng.int(3, 14);
      const l = rng.int(w + 1, w + 12);
      const P = 2 * (l + w);
      const A = l * w;
      const thing = rng.pick(RECTS);
      return {
        prompt: `A rectangular ${thing} has a perimeter of $${P}$ m and an area of $${A}\\ \\text{m}^2$. Write and solve a quadratic equation to find its length and width.`,
        parts: [rootsPart([w, l], { label: 'Length and width', suffix: 'm' })],
        hints: [`Length $+$ width $= ${P / 2}$, so if the width is $x$, the length is $${P / 2} - x$.`, `Solve $x(${P / 2} - x) = ${A}$.`],
        solution: [
          `Let the width be $x$ m. Then the length is $(${P / 2} - x)$ m and $x(${P / 2} - x) = ${A}$.`,
          `$${stdTex(-1, P / 2, -A)} = 0$, or $${stdTex(1, -P / 2, A)} = 0$.`,
          `$(x - ${w})(x - ${l}) = 0$, so $x = ${w}$ or $x = ${l}$.`,
          `Both roots give the same rectangle: the ${thing} is $${l}$ m long and $${w}$ m wide.`,
        ],
        calculator: false,
      };
    }
    if (v === 'rightTri') {
      for (;;) {
        const [a0, b0, c0] = rng.pick(TRIPLES);
        const s = rng.int(1, 4);
        const [a, b, c] = [a0 * s, b0 * s, c0 * s];
        if (c > 100) continue;
        const k = b - a;
        const ctx = rng.pick([
          { setup: `A diagonal path crosses a rectangular park. The path is $${c}$ m long, and the park is $${k}$ m longer than it is wide.`, ask: 'Find the length and width of the park.' },
          { setup: `A straight fence runs diagonally across a rectangular pasture. The fence is $${c}$ m long, and the pasture is $${k}$ m longer than it is wide.`, ask: 'Find the length and width of the pasture.' },
          { setup: `A support cable runs from the top of a vertical mast to a ground anchor. The cable is $${c}$ m long, and the anchor is $${k}$ m farther from the foot of the mast than the mast is tall.`, ask: 'Find the height of the mast and the distance from the mast to the anchor.' },
        ]);
        const u = 'm';
        return {
          prompt: `${ctx.setup} ${ctx.ask}`,
          parts: [rootsPart([a, b], { label: 'The two lengths', suffix: u })],
          hints: [`Call the shorter side $x$; the longer side is $x + ${k}$. They are the legs of a right triangle with hypotenuse $${c}$.`, `Use the Pythagorean theorem: $x^2 + (x + ${k})^2 = ${c}^2$. Reject the negative root.`],
          solution: [
            `$x^2 + (x + ${k})^2 = ${c}^2$`,
            `$${stdTex(2, 2 * k, k * k)} = ${c * c}$, so $${stdTex(2, 2 * k, k * k - c * c)} = 0$.`,
            `Divide by 2: $${stdTex(1, k, -a * b)} = 0$, which factors as $(x - ${a})(x + ${b}) = 0$.`,
            `$x = ${a}$ or $x = -${b}$. A length cannot be negative, so $x = ${a}$ and $x + ${k} = ${b}$.`,
            `The two lengths are $${a}$ ${u} and $${b}$ ${u}.`,
          ],
          calculator: false,
        };
      }
    }
    for (;;) {
      const vv = rng.int(10, 24);
      const h0 = rng.pick([0, 1.5, 2, 10, 15, 20, 30]);
      const H = h0 + (vv * vv) / 19.6;
      const Y = rng.int(1, Math.floor(H - 1));
      if (Y === h0) continue;
      const { steps, roots } = formulaSteps(-4.9, vv, h0 - Y, 2, 't');
      if (roots.some((r) => !clearOfBoundary(r, 2) || Math.abs(r) < 0.05)) continue;
      const valid = roots.filter((r) => r > 0);
      const thing = h0 >= 10 ? rng.pick(['throws a ball upward from the top of a cliff', 'launches a water rocket from a balcony']) : rng.pick(['kicks a football', 'throws a ball straight up', 'launches a foam rocket']);
      return {
        prompt: `${name} ${thing}. Its height, $h$ metres, after $t$ seconds is $h = ${stdTex(-4.9, vv, h0, 't')}$. At what time or times is it $${Y}$ m above the ground? Round to the nearest hundredth of a second.`,
        parts: [rootsPart(valid, { label: '$t =$', decimals: 2, suffix: 's' })],
        hints: [`Set $h = ${Y}$ and rearrange: $${stdTex(-4.9, vv, h0 - Y, 't')} = 0$. Use the quadratic formula.`, 'Keep only times that make sense: time cannot be negative.'],
        solution: [
          `$${stdTex(-4.9, vv, h0, 't')} = ${Y}$, so $${stdTex(-4.9, vv, h0 - Y, 't')} = 0$.`,
          ...steps,
          valid.length === 2
            ? `Both times are positive: it passes $${Y}$ m on the way up and again on the way down, at about $${fmtFixed(valid[0], 2)}$ s and $${fmtFixed(valid[1], 2)}$ s.`
            : `Reject $t \\approx ${fmtFixed(roots[0], 2)}$ (negative time). It is $${Y}$ m high only once, on the way down, at about $${fmtFixed(valid[0], 2)}$ s.`,
        ],
      };
    }
  },
});

export const QUAD_EQUATION_SKILLS: SkillDef[] = [solveFactor, quadFormula, quadApply];
