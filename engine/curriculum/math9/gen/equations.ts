/** Grade 9 Unit 6 — Linear Equations and Inequalities (PR3, PR4). */
import { fixedChoice, mc, mcFigures, numPart, retry, skill } from '../../helpers.ts';
import { type Frac, frac, fracAdd, fracDiv, fracLatex, fracMul, fracSub, fracValue, fmt, fmtFixed, gcd } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
];
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater'];

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure; calculator?: boolean; answerDisplay?: string };

/** How coefficients are printed: integers and fractions, or decimals. */
type Mode = 'frac' | 'dec';

const F = (n: number, d = 1) => frac(n, d);
const ZERO = F(0);
const isZero = (f: Frac) => f.n === 0;
const isInt = (f: Frac) => f.d === 1;
const negF = (f: Frac) => F(-f.n, f.d);

/** A number in an equation. */
function num(f: Frac, mode: Mode = 'frac'): string {
  return mode === 'dec' || !isInt(f) && mode !== 'frac' ? fmt(fracValue(f), 6) : fracLatex(f);
}

/** A number, bracketed when negative (for substitutions). */
const pnum = (f: Frac, mode: Mode = 'frac') => (f.n < 0 ? `(${num(f, mode)})` : num(f, mode));

/** The x-term a·x: x, -x, 3x, \frac{2}{3}x, 1.5x. */
function xTerm(a: Frac, mode: Mode, v = 'x'): string {
  if (a.n === a.d) return v;
  if (a.n === -a.d) return `-${v}`;
  return `${num(a, mode)}${v}`;
}

/** a·x + b as LaTeX, x-term first (or the constant first). */
function lin(a: Frac, b: Frac, mode: Mode, constFirst = false, v = 'x'): string {
  if (isZero(a)) return num(b, mode);
  if (isZero(b)) return xTerm(a, mode, v);
  if (constFirst) {
    const t = xTerm(a, mode, v);
    return `${num(b, mode)} ${t.startsWith('-') ? `- ${t.slice(1)}` : `+ ${t}`}`;
  }
  return `${xTerm(a, mode, v)} ${b.n < 0 ? `- ${num(negF(b), mode)}` : `+ ${num(b, mode)}`}`;
}

/** "Subtract 3x from both sides" / "Add 2 to both sides". */
function moveText(f: Frac, mode: Mode, isX: boolean, v = 'x'): string {
  const abs = f.n < 0 ? negF(f) : f;
  const what = isX ? xTerm(abs, mode, v) : num(abs, mode);
  return f.n < 0 ? `Add $${what}$ to both sides` : `Subtract $${what}$ from both sides`;
}

/**
 * Steps to solve a·x + b = c·x + d (all coefficients exact), collecting x on the left.
 * Returns the steps and the solution.
 */
function solveSteps(a: Frac, b: Frac, c: Frac, d: Frac, mode: Mode, v = 'x'): { x: Frac; steps: string[] } {
  const steps: string[] = [];
  let A = a;
  let D = d;
  if (!isZero(c)) {
    A = fracSub(a, c);
    steps.push(`${moveText(c, mode, true, v)}: $${lin(A, b, mode, false, v)} = ${num(d, mode)}$`);
  }
  if (!isZero(b)) {
    D = fracSub(d, b);
    steps.push(`${moveText(b, mode, false)}: $${xTerm(A, mode, v)} = ${num(D, mode)}$`);
  }
  const x = fracDiv(D, A);
  if (!(A.n === A.d)) {
    const shown = mode === 'dec' && !isInt(x) && !terminates(x) ? fracLatex(x) : num(x, mode);
    if (A.n === -A.d) steps.push(`Multiply both sides by $-1$: $${v} = ${shown}$`);
    else steps.push(`Divide both sides by $${num(A, mode)}$: $${v} = \\dfrac{${num(D, mode)}}{${num(A, mode)}} = ${shown}$`);
  }
  return { x, steps };
}

/** Whether a fraction has a terminating decimal. */
function terminates(f: Frac): boolean {
  let d = f.d;
  while (d % 2 === 0) d /= 2;
  while (d % 5 === 0) d /= 5;
  return d === 1;
}

/** The solution as LaTeX: a fraction in lowest terms, plus the decimal when it ends quickly. */
function solTex(x: Frac): string {
  if (isInt(x)) return `${x.n}`;
  const dec = terminates(x) && x.d <= 20 ? ` = ${fmt(fracValue(x), 4)}` : '';
  return `${fracLatex(x)}${dec}`;
}

/** Value of a·x + b at x. */
const at = (a: Frac, b: Frac, x: Frac) => fracAdd(fracMul(a, x), b);

/** "3(x) + 4" with the value substituted. */
function subst(a: Frac, b: Frac, x: Frac, mode: Mode, constFirst = false): string {
  const ax = a.n === a.d ? pnum(x, mode) : a.n === -a.d ? (x.n >= 0 ? `-(${num(x, mode)})` : `-${pnum(x, mode)}`) : `${num(a, mode)}${pnum(x, mode).startsWith('(') ? pnum(x, mode) : `(${num(x, mode)})`}`;
  if (isZero(b)) return ax;
  if (constFirst) return `${num(b, mode)} ${ax.startsWith('-') ? `- ${ax.slice(1)}` : `+ ${ax}`}`;
  return `${ax} ${b.n < 0 ? `- ${num(negF(b), mode)}` : `+ ${num(b, mode)}`}`;
}

/** Check line for a·x + b = c·x + d. */
function checkLine(a: Frac, b: Frac, c: Frac, d: Frac, x: Frac, mode: Mode, lc = false, rc = false): string {
  const L = at(a, b, x);
  const R = at(c, d, x);
  const show = (f: Frac) => (mode === 'dec' && (isInt(f) || terminates(f)) ? num(f, 'dec') : fracLatex(f));
  const side = (p: Frac, q: Frac, v: Frac, cf: boolean) => (p.n === p.d && isZero(q) ? show(v) : `${subst(p, q, x, mode, cf)} = ${show(v)}`);
  return `Check: left side $= ${side(a, b, L, lc)}$; right side $= ${side(c, d, R, rc)}$. Both sides are equal, so the solution is correct.`;
}

const NON_INT_NOTE = 'If the solution is not an integer, write it as a fraction or a decimal.';

const xPart = (x: Frac, v = 'x'): Part => numPart(fracValue(x), { label: `$${v} =$` });

// ---------------------------------------------------------------------------
// 6.1 Variables on both sides
// ---------------------------------------------------------------------------

const equationBothSides = skill({
  id: 'm9-equation-both-sides',
  name: 'Equations with variables on both sides',
  description: 'Solve equations of the form ax = b + cx and ax + b = cx + d with rational coefficients.',
  outcomes: ['PR3'],
  lessonId: 'm9-6-1',
  gen(rng, d): Out {
    let a: Frac, b: Frac, c: Frac, dd: Frac;
    let mode: Mode = 'frac';
    let lcd = 1;
    // The left side ax + b; the right side cx + d (written d + cx when rightConstFirst).
    let rightConstFirst = rng.chance(0.4);
    if (d === 1) {
      const x0 = rng.int(1, 9);
      const cc = rng.int(1, 6);
      const aa = cc + rng.int(1, 5);
      if (rng.chance(0.4)) {
        // ax = b + cx
        a = F(aa); b = ZERO; c = F(cc); dd = F((aa - cc) * x0);
        rightConstFirst = true;
      } else {
        const bb = rng.int(1, 12);
        a = F(aa); b = F(bb); c = F(cc); dd = F((aa - cc) * x0 + bb);
      }
    } else if (d === 2) {
      const [aa, cc] = retry(() => [rng.nonZero(-9, 9), rng.nonZero(-9, 9)], ([p, q]) => p !== q && Math.abs(p - q) <= 8);
      const bb = rng.chance(0.25) ? 0 : rng.nonZero(-15, 15);
      const k = aa - cc;
      // Integer solutions most of the time; otherwise a fraction with denominator |a - c|.
      const num0 = Math.abs(k) > 1 && rng.chance(0.4) ? retry(() => rng.nonZero(-30, 30), (n) => n % k !== 0) : k * rng.intExcept(-9, 9, [0]);
      a = F(aa); b = F(bb); c = F(cc); dd = F(bb + num0);
      if (bb === 0) rightConstFirst = true;
    } else if (rng.chance(0.5)) {
      // Decimal coefficients (tenths); the solution is an integer or a half.
      mode = 'dec';
      const [A10, C10] = retry(() => [rng.nonZero(-30, 30), rng.nonZero(-30, 30)], ([p, q]) => p !== q && (p % 10 !== 0 || q % 10 !== 0));
      const x2 = rng.chance(0.7) ? 2 * rng.intExcept(-8, 8, [0]) : retry(() => rng.int(-15, 15), (v) => v % 2 !== 0);
      const B10 = rng.nonZero(-60, 60);
      a = F(A10, 10); c = F(C10, 10); b = F(B10, 10);
      const x0 = F(x2, 2);
      dd = fracSub(at(a, b, x0), fracMul(c, x0));
    } else {
      // Fraction coefficients; clear them with the lowest common denominator.
      const qs = rng.pick([[2, 3], [3, 4], [2, 5], [3, 6], [4, 6], [2, 4], [3, 2], [4, 3]]);
      const [A, C] = retry(() => [F(rng.nonZero(-5, 5), qs[0]), F(rng.nonZero(-5, 5), qs[1])], ([p, q]) => !isInt(p) && !isInt(q) && fracValue(p) !== fracValue(q));
      lcd = (qs[0] * qs[1]) / gcd(qs[0], qs[1]);
      const kMax = Math.max(1, Math.floor(12 / lcd));
      const x0 = F(lcd * rng.sign() * rng.int(1, kMax));
      a = A; c = C; b = F(rng.nonZero(-9, 9));
      dd = fracSub(at(a, b, x0), fracMul(c, x0));
    }
    const eq = `${lin(a, b, mode)} = ${lin(c, dd, mode, rightConstFirst)}`;
    const steps: string[] = [];
    let { x, steps: st } = solveSteps(a, b, c, dd, mode);
    if (lcd > 1) {
      const [A2, B2, C2, D2] = [a, b, c, dd].map((f) => fracMul(f, F(lcd)));
      steps.push(`Multiply every term by the lowest common denominator, $${lcd}$, to clear the fractions: $${lin(A2, B2, 'frac')} = ${lin(C2, D2, 'frac', rightConstFirst)}$`);
      ({ x, steps: st } = solveSteps(A2, B2, C2, D2, 'frac'));
    }
    steps.push(...st);
    steps.push(checkLine(a, b, c, dd, x, mode, false, rightConstFirst));
    steps.push(`The solution is $x = ${solTex(x)}$.`);
    return {
      prompt: `Solve for $x$:
$$${eq}$$${d >= 2 ? `\n${NON_INT_NOTE}` : ''}`,
      parts: [xPart(x)],
      hints: [
        lcd > 1 ? 'Multiply every term on both sides by the lowest common denominator to clear the fractions.' : 'Get all the $x$-terms on one side and all the constants on the other.',
        'Do the same operation to both sides each time. Then divide by the coefficient of $x$.',
      ],
      solution: steps,
    };
  },
});

// ---------------------------------------------------------------------------
// 6.2 Brackets and fractions
// ---------------------------------------------------------------------------

/** a(bx + c) as LaTeX. */
function brk(a: Frac, b: Frac, c: Frac, mode: Mode): string {
  const outer = a.n === a.d ? '' : a.n === -a.d ? '-' : num(a, mode);
  return `${outer}(${lin(b, c, mode)})`;
}

const equationBrackets = skill({
  id: 'm9-equation-brackets',
  name: 'Equations with brackets and fractions',
  description: 'Solve equations of the form a(bx + c) = d(ex + f), x/a + b = c and a/x = b with rational coefficients.',
  outcomes: ['PR3'],
  lessonId: 'm9-6-2',
  gen(rng, d): Out {
    const form = d === 1 ? rng.pick(['xa', 'bracket1', 'ax'] as const) : d === 2 ? rng.weighted([['bracket2', 3], ['ax', 1], ['xa', 1]] as const) : rng.weighted([['bracket2', 3], ['xa', 1], ['ax', 1]] as const);
    const note = d >= 2 ? `\n${NON_INT_NOTE}` : '';
    if (form === 'xa') {
      // x/a + b = c
      let A: Frac, B: Frac, C: Frac, x: Frac;
      let mode: Mode = 'frac';
      if (d === 1) {
        A = F(rng.int(2, 6));
        x = F(A.n * rng.int(1, 9));
        B = F(rng.int(1, 9));
      } else if (d === 2) {
        A = F(rng.sign() * rng.int(2, 6));
        x = F(A.n * rng.intExcept(-9, 9, [0]));
        B = F(rng.nonZero(-9, 9));
      } else if (rng.chance(0.5)) {
        // fractions: x/a + p/q = r/s
        A = F(rng.int(2, 6));
        const q = rng.pick([2, 3, 4, 6]);
        B = F(rng.nonZero(-5, 5), q);
        x = retry(() => F(rng.nonZero(-12, 12), rng.pick([1, 2, 3])), (v) => !isInt(fracAdd(fracDiv(v, A), B)) && fracAdd(fracDiv(v, A), B).d <= 12);
      } else {
        mode = 'dec';
        A = F(rng.pick([2, 4, 6]));
        B = F(rng.nonZero(-40, 40), 10);
        x = F((A.n * rng.intExcept(-9, 9, [0])) / 2);
      }
      C = fracAdd(fracDiv(x, A), B);
      const xa = A.n < 0 ? `-\\dfrac{x}{${-A.n}}` : `\\dfrac{x}{${num(A, mode)}}`;
      const lhs = `${xa} ${B.n < 0 ? `- ${num(negF(B), mode)}` : `+ ${num(B, mode)}`}`;
      const mid = fracSub(C, B);
      const steps = [
        `${moveText(B, mode, false)}: $${xa} = ${num(mid, mode)}$`,
        `Multiply both sides by $${num(A, mode)}$: $x = ${pnum(mid, mode)} \\times ${pnum(A, mode)} = ${num(x, mode)}$`,
        `Check: $${A.n < 0 ? `-\\dfrac{${pnum(x)}}{${-A.n}}` : `\\dfrac{${num(x, mode)}}{${num(A, mode)}}`} ${B.n < 0 ? `- ${num(negF(B), mode)}` : `+ ${num(B, mode)}`} = ${num(fracDiv(x, A), mode)} ${B.n < 0 ? `- ${num(negF(B), mode)}` : `+ ${num(B, mode)}`} = ${num(C, mode)}$, which matches the right side.`,
        `The solution is $x = ${solTex(x)}$.`,
      ];
      return {
        prompt: `Solve for $x$:
$$${lhs} = ${num(C, mode)}$$${note}`,
        parts: [xPart(x)],
        hints: ['Undo the addition or subtraction first.', `Then undo the division: multiply both sides by $${num(A, mode)}$.`],
        solution: steps,
      };
    }
    if (form === 'ax') {
      // a/x = b
      let A: Frac, B: Frac;
      let mode: Mode = 'frac';
      if (d === 1) {
        B = F(rng.int(2, 9));
        A = F(B.n * rng.int(2, 9));
      } else if (d === 2) {
        A = F(rng.sign() * rng.int(2, 12));
        B = retry(() => F(rng.sign() * rng.int(2, 9)), (v) => A.n % v.n !== 0);
      } else if (rng.chance(0.5)) {
        mode = 'dec';
        B = F(rng.sign() * rng.pick([5, 15, 25, 12, 4, 8]), 10);
        A = fracMul(B, F(rng.intExcept(-9, 9, [0, 1, -1])));
      } else {
        B = retry(() => F(rng.sign() * rng.int(1, 5), rng.pick([3, 4, 5, 7])), (v) => !isInt(v));
        A = F(rng.int(2, 9));
      }
      const x = fracDiv(A, B);
      const bShown = mode === 'frac' && !isInt(B) ? fracLatex(B, { dfrac: true }) : num(B, mode);
      return {
        prompt: `Solve for $x$:
$$\\dfrac{${num(A, mode)}}{x} = ${bShown}$$${note}`,
        parts: [xPart(x)],
        hints: ['The variable is in the denominator. Multiply both sides by $x$ first.', `Then divide both sides by $${num(B, mode)}$.`],
        solution: [
          `Multiply both sides by $x$ (where $x \\ne 0$): $${num(A, mode)} = ${isInt(B) || mode === 'dec' ? num(B, mode) : `\\dfrac{${B.n}}{${B.d}}`}x$`,
          `Divide both sides by $${num(B, mode)}$: $x = \\dfrac{${num(A, mode)}}{${num(B, mode)}} = ${mode === 'dec' ? num(x, 'dec') : fracLatex(x)}$`,
          `Check: $\\dfrac{${num(A, mode)}}{${pnum(x, mode === 'dec' ? 'dec' : 'frac')}} = ${num(B, mode)}$, which matches the right side.`,
          `The solution is $x = ${solTex(x)}$.`,
        ],
      };
    }
    // a(bx + c) = d(ex + f)
    let a: Frac, b: Frac, c: Frac, dd: Frac, e: Frac, f: Frac;
    let mode: Mode = 'frac';
    if (form === 'bracket1') {
      // a(x + b) = c
      a = F(rng.int(2, 6));
      b = F(1);
      c = F(rng.nonZero(-5, 9));
      const x0 = rng.int(1, 9);
      dd = F(1);
      e = ZERO;
      f = F(a.n * (x0 + c.n));
      if (f.n === 0) f = F(a.n * (x0 + 1 + c.n));
    } else if (d === 2) {
      [a, b, c, dd, e, f] = retry(
        () => [F(rng.sign() * rng.int(2, 5)), F(rng.int(1, 4)), F(rng.nonZero(-9, 9)), F(rng.sign() * rng.int(2, 5)), F(rng.int(1, 4)), F(rng.nonZero(-9, 9))],
        ([p, q, , s, t]) => p.n * q.n !== s.n * t.n && Math.abs(p.n * q.n - s.n * t.n) <= 12,
      );
    } else if (rng.chance(0.5)) {
      // Fraction multipliers that divide evenly into the brackets.
      [a, b, c, dd, e, f] = retry(
        () => {
          const q1 = rng.pick([2, 3, 4]);
          const q2 = rng.pick([2, 3, 4, 5]);
          return [F(rng.sign() * rng.pick([1, 1, 2, 3]), q1), F(q1 * rng.int(1, 3)), F(q1 * rng.nonZero(-4, 4)), F(rng.pick([1, 2, 3]), q2), F(q2 * rng.int(1, 2)), F(q2 * rng.nonZero(-4, 4))];
        },
        ([p, q, , s, t]) => !isInt(p) && !isInt(s) && fracValue(fracMul(p, q)) !== fracValue(fracMul(s, t)),
      );
    } else {
      // Decimal multipliers; the solution is an integer and every number has at most two decimal places.
      mode = 'dec';
      [a, b, c, dd, e, f] = retry(
        () => {
          const p = F(rng.sign() * rng.pick([5, 15, 25]), 10);
          const q = F(2 * rng.int(1, 3));
          const r = F(2 * rng.nonZero(-5, 5));
          const s2 = F(rng.pick([2, 5, 25]), 10);
          const t = F(rng.pick([2, 4, 5, 10]));
          const x0 = F(rng.intExcept(-8, 8, [0]));
          // s2(t·x0 + u) = p(q·x0 + r)  =>  u = p(q·x0 + r)/s2 - t·x0
          const u = fracSub(fracDiv(at(fracMul(p, q), fracMul(p, r), x0), s2), fracMul(t, x0));
          return [p, q, r, s2, t, u];
        },
        ([p, q, , s2, t, u]) => fracValue(fracMul(p, q)) !== fracValue(fracMul(s2, t)) && isInt(u) && u.n !== 0 && Math.abs(u.n) <= 40 && fracMul(s2, t).d <= 10,
      );
    }
    const A = fracMul(a, b);
    const B = fracMul(a, c);
    const C = fracMul(dd, e);
    const D = fracMul(dd, f);
    const rhs = form === 'bracket1' ? num(f, mode) : brk(dd, e, f, mode);
    const lhs = brk(a, b, c, mode);
    const { x, steps } = solveSteps(A, B, C, D, mode === 'dec' ? 'dec' : 'frac');
    const L = at(A, B, x);
    const showV = (v: Frac) => (mode === 'dec' && (isInt(v) || terminates(v)) ? num(v, 'dec') : fracLatex(v));
    const inner = (p: Frac, q: Frac) => `${subst(p, q, x, mode)}`;
    const check = form === 'bracket1'
      ? `Check: $${brk(a, b, c, mode).replace(/\(.*\)/, `(${inner(b, c)})`)} = ${pnum(a, mode)}(${showV(at(b, c, x))}) = ${showV(L)}$, which matches the right side.`
      : `Check: left side $= ${num(a, mode)}(${inner(b, c)}) = ${pnum(a, mode)}(${showV(at(b, c, x))}) = ${showV(L)}$; right side $= ${num(dd, mode)}(${inner(e, f)}) = ${pnum(dd, mode)}(${showV(at(e, f, x))}) = ${showV(at(C, D, x))}$. Both sides are equal.`;
    return {
      prompt: `Solve for $x$:
$$${lhs} = ${rhs}$$${note}`,
      parts: [xPart(x)],
      hints: ['Use the distributive property to remove the brackets: multiply the number outside by **each** term inside.', 'Then collect the $x$-terms on one side and the constants on the other, and divide.'],
      solution: [
        `Expand the brackets: $${lin(A, B, mode)} = ${form === 'bracket1' ? num(f, mode) : lin(C, D, mode)}$`,
        ...steps,
        check,
        `The solution is $x = ${solTex(x)}$.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// 6.3 Problems
// ---------------------------------------------------------------------------

/** Money in prose (never inside $...$): \$12.50 or \$40. */
const money = (cents: number) => (cents % 100 === 0 ? `\\$${cents / 100}` : `\\$${fmtFixed(cents / 100, 2)}`);
/** Money as a plain number inside maths: 12.50 or 40. */
const mnum = (cents: number) => (cents % 100 === 0 ? `${cents / 100}` : fmtFixed(cents / 100, 2));
const moneyPart = (cents: number, label = '\\$'): Part => numPart(cents / 100, { decimals: 2, tolerance: 0.011, label });

type Plan = { scene: string; unit: string; units: string; v: string; ask: string; names: [string, string]; baseA: number; rateA: number; baseB: number; rateB: number; x: number };

/** Two pricing plans that cost the same at a whole number x (amounts in cents). */
function makePlan(rng: Rng): Plan {
  const kind = rng.int(0, 3);
  if (kind === 0) {
    const x = rng.int(3, 15);
    const diff = rng.pick([10, 15, 20, 25, 30, 40, 50]);
    const rateB = 5 * rng.int(30, 50);
    const baseA = 5 * rng.int(50, 90);
    return { scene: 'taxi', unit: 'km', units: 'kilometres', v: 'k', ask: 'For what distance do the two taxis charge the same fare?', names: ['Prairie Cabs', 'Northwind Taxi'], baseA, rateA: rateB + diff, baseB: baseA + x * diff, rateB, x };
  }
  if (kind === 1) {
    const x = rng.int(2, 12);
    const rateB = 100 * rng.int(1, 3);
    const diff = 50 * rng.int(1, 6);
    const baseA = 500 * rng.int(4, 7);
    return { scene: 'phone', unit: 'GB', units: 'gigabytes of data', v: 'g', ask: 'For how many gigabytes of data do the two plans cost the same?', names: ['Plan A', 'Plan B'], baseA, rateA: rateB + diff, baseB: baseA + x * diff, rateB, x };
  }
  if (kind === 2) {
    const x = rng.int(2, 8);
    const rateB = 100 * rng.int(4, 8);
    const diff = 100 * rng.int(2, 6);
    const baseA = 500 * rng.int(2, 5);
    return { scene: 'canoe', unit: 'h', units: 'hours', v: 'h', ask: 'For how many hours do the two companies charge the same amount?', names: ['River Bend Rentals', 'Lakeside Outfitters'], baseA, rateA: rateB + diff, baseB: baseA + x * diff, rateB, x };
  }
  const x = rng.int(3, 12);
  const rateB = 100 * rng.int(5, 10);
  const diff = 100 * rng.int(3, 8);
  const baseA = 500 * rng.int(3, 8);
  return { scene: 'gym', unit: 'visits', units: 'visits', v: 'n', ask: 'For how many visits do the two climbing gyms cost the same?', names: ['Summit Climbing', 'Boulder Barn'], baseA, rateA: rateB + diff, baseB: baseA + x * diff, rateB, x };
}

function planText(p: Plan): string {
  const [A, B] = p.names;
  switch (p.scene) {
    case 'taxi':
      return `Two taxi companies in ${'{town}'} charge a flat fee plus a rate per kilometre. ${A} charges ${money(p.baseA)} plus ${money(p.rateA)} per km. ${B} charges ${money(p.baseB)} plus ${money(p.rateB)} per km.`;
    case 'phone':
      return `Two cell phone plans charge a monthly fee plus a cost per gigabyte (GB) of data. ${A} costs ${money(p.baseA)} per month plus ${money(p.rateA)} per GB. ${B} costs ${money(p.baseB)} per month plus ${money(p.rateB)} per GB.`;
    case 'canoe':
      return `Two companies rent canoes. ${A} charges ${money(p.baseA)} plus ${money(p.rateA)} per hour. ${B} charges ${money(p.baseB)} plus ${money(p.rateB)} per hour.`;
    default:
      return `Two climbing gyms sell a yearly membership plus a fee per visit. ${A} charges ${money(p.baseA)} plus ${money(p.rateA)} per visit. ${B} charges ${money(p.baseB)} plus ${money(p.rateB)} per visit.`;
  }
}

function planOut(rng: Rng, d: Difficulty): Out {
  const p = makePlan(rng);
  const town = rng.pick(TOWNS);
  const text = planText(p).replace('{town}', town);
  const v = p.v;
  const lhs = `${mnum(p.baseA)} + ${mnum(p.rateA)}${v}`;
  const rhs = `${mnum(p.baseB)} + ${mnum(p.rateB)}${v}`;
  const diffRate = p.rateA - p.rateB;
  const diffBase = p.baseB - p.baseA;
  const cost = p.baseA + p.rateA * p.x;
  const steps = [
    `Let $${v}$ be the number of ${p.units}. ${p.names[0]}: $${lhs}$. ${p.names[1]}: $${rhs}$.`,
    `Set the costs equal: $${lhs} = ${rhs}$`,
    `Subtract $${mnum(p.rateB)}${v}$ from both sides: $${mnum(p.baseA)} + ${mnum(diffRate)}${v} = ${mnum(p.baseB)}$`,
    `Subtract $${mnum(p.baseA)}$ from both sides: $${mnum(diffRate)}${v} = ${mnum(diffBase)}$`,
    `Divide by $${mnum(diffRate)}$: $${v} = ${p.x}$`,
    `Check: ${p.names[0]} costs $${mnum(p.baseA)} + ${mnum(p.rateA)}(${p.x}) = ${mnum(cost)}$ and ${p.names[1]} costs $${mnum(p.baseB)} + ${mnum(p.rateB)}(${p.x}) = ${mnum(cost)}$, so both cost ${money(cost)}.`,
  ];
  if (d === 1) {
    return {
      prompt: `${text}

The equation $${lhs} = ${rhs}$ shows when the two costs are equal, where $${v}$ is the number of ${p.units}. Solve the equation. ${p.ask}`,
      parts: [numPart(p.x, { label: `$${v} =$`, suffix: p.unit })],
      hints: [`Get the $${v}$-terms on one side: subtract $${mnum(p.rateB)}${v}$ from both sides.`, 'Then subtract the constant and divide.'],
      solution: [...steps.slice(1), `The costs are equal at ${p.x} ${p.unit === 'h' ? 'hours' : p.unit}.`],
      calculator: true,
    };
  }
  if (d === 2) {
    return {
      prompt: `${text}

Write and solve an equation. ${p.ask}`,
      parts: [numPart(p.x, { suffix: p.unit })],
      hints: [`Let $${v}$ be the number of ${p.units}. Write an expression for each cost.`, 'Set the two expressions equal and solve. Check your answer in both expressions.'],
      solution: [...steps, `The costs are equal at ${p.x} ${p.unit === 'h' ? 'hours' : p.unit}.`],
      calculator: true,
    };
  }
  return {
    prompt: `${text}

a) ${p.ask}

b) What is the cost at that ${p.scene === 'taxi' ? 'distance' : p.scene === 'phone' ? 'amount of data' : p.scene === 'canoe' ? 'time' : 'number of visits'}? Give your answer to the nearest cent.`,
    parts: [numPart(p.x, { label: 'a)', suffix: p.unit }), moneyPart(cost, 'b) \\$')],
    hints: [`Let $${v}$ be the number of ${p.units}. Write an expression for each cost and set them equal.`, `Substitute your value of $${v}$ into either expression to find the cost.`],
    solution: [...steps, `a) ${p.x} ${p.unit === 'h' ? 'hours' : p.unit}; b) the cost is ${money(cost)}.`],
    calculator: true,
  };
}

function savingsOut(rng: Rng, d: Difficulty): Out {
  const [n1, n2] = rng.sample(NAMES, 2);
  const w = rng.int(3, 12);
  const r1 = 5 * rng.int(2, 6);
  const diff = 5 * rng.int(1, 4);
  const r2 = r1 + diff;
  const s2 = 5 * rng.int(4, 12);
  const s1 = s2 + diff * w;
  const total = s1 + r1 * w;
  const goal = rng.pick(['a new pair of skates', 'a trip to an amusement park', 'a summer camp', 'a new bike']);
  const eq = `${s1} + ${r1}w = ${s2} + ${r2}w`;
  const steps = [
    `Let $w$ be the number of weeks. ${n1} has $${s1} + ${r1}w$ dollars and ${n2} has $${s2} + ${r2}w$ dollars.`,
    `Set them equal: $${eq}$`,
    `Subtract $${r1}w$ from both sides: $${s1} = ${s2} + ${diff}w$`,
    `Subtract $${s2}$ from both sides: $${s1 - s2} = ${diff}w$`,
    `Divide by $${diff}$: $w = ${w}$`,
    `Check: ${n1} has $${s1} + ${r1}(${w}) = ${total}$ dollars and ${n2} has $${s2} + ${r2}(${w}) = ${total}$ dollars.`,
  ];
  const text = `${n1} has \\$${s1} saved and adds \\$${r1} each week. ${n2} has \\$${s2} saved and adds \\$${r2} each week. Both are saving for ${goal}.`;
  if (d === 1) {
    return {
      prompt: `${text}

The equation $${eq}$ shows when they will have the same amount, where $w$ is the number of weeks. Solve it. After how many weeks will they have the same amount?`,
      parts: [numPart(w, { label: '$w =$', suffix: 'weeks' })],
      hints: ['Subtract the smaller $w$-term from both sides.', 'Then subtract the constant and divide.'],
      solution: [...steps.slice(1), `They will have the same amount after ${w} weeks.`],
    };
  }
  return {
    prompt: `${text}

Write and solve an equation. After how many weeks will they have the same amount of money?${d === 3 ? ' How much will each of them have then?' : ''}`,
    parts: d === 3 ? [numPart(w, { label: 'Weeks:', suffix: 'weeks' }), numPart(total, { label: 'Amount: \\$' })] : [numPart(w, { suffix: 'weeks' })],
    hints: ['Let $w$ be the number of weeks. Each amount is (money saved) + (weekly amount) × $w$.', 'Set the two expressions equal and solve.'],
    solution: [...steps, d === 3 ? `After ${w} weeks each of them will have \\$${total}.` : `They will have the same amount after ${w} weeks.`],
  };
}

function ageOut(rng: Rng, d: Difficulty): Out {
  if (d === 2 || rng.chance(0.5)) {
    // m·s + t = n(s + t), sibling ages.
    const [n1, n2] = rng.sample(NAMES, 2);
    const [m, n] = rng.pick([[3, 2], [4, 3], [4, 2], [5, 3]]);
    const t = rng.int(2, 6);
    const sNum = (n - 1) * t;
    if (sNum % (m - n) !== 0 || (m * sNum) / (m - n) > 20) return ageOut(rng, 3);
    const s = sNum / (m - n);
    const old = m * s;
    const steps = [
      `Let $s$ be ${n2}'s age now. Then ${n1} is $${m}s$.`,
      `In ${t} years: ${n1} will be $${m}s + ${t}$ and ${n2} will be $s + ${t}$.`,
      `Write the equation: $${m}s + ${t} = ${n}(s + ${t})$`,
      `Expand: $${m}s + ${t} = ${n}s + ${n * t}$`,
      `Subtract $${n}s$ and $${t}$ from both sides: $${m - n === 1 ? '' : m - n}s = ${n * t - t}$`,
      ...(m - n === 1 ? [] : [`Divide by $${m - n}$: $s = ${s}$`]),
      `Check: now ${n2} is ${s} and ${n1} is ${old}. In ${t} years they will be ${s + t} and ${old + t}, and $${old + t} = ${n} \\times ${s + t}$.`,
    ];
    return {
      prompt: `${n1} is ${m} times as old as ${n2}. In ${t} years, ${n1} will be ${n === 2 ? 'twice' : `${n} times`} as old as ${n2}. Write and solve an equation to find ${n2}'s age now.${d === 3 ? ` How old is ${n1} now?` : ''}`,
      parts: d === 3 ? [numPart(s, { label: `${n2}:`, suffix: 'years' }), numPart(old, { label: `${n1}:`, suffix: 'years' })] : [numPart(s, { suffix: 'years' })],
      hints: [`Let $s$ be ${n2}'s age now, so ${n1} is $${m}s$. Add ${t} to both ages for the future.`, `In ${t} years: $${m}s + ${t} = ${n}(s + ${t})$. Expand and solve.`],
      solution: [...steps, d === 3 ? `${n2} is ${s} years old and ${n1} is ${old} years old.` : `${n2} is ${s} years old now.`],
    };
  }
  // Parent and child: (c + D) + t = n(c + t).
  const n1 = rng.pick(NAMES);
  const [D, n, t, c] = retry(
    () => {
      const nn = rng.pick([2, 3]);
      const tt = rng.int(2, 10);
      const cc = rng.int(4, 15);
      return [(nn - 1) * (cc + tt), nn, tt, cc];
    },
    ([DD]) => DD >= 22 && DD <= 40,
  );
  const P = c + D;
  return {
    prompt: `${n1}'s mother is ${D} years older than ${n1}. In ${t} years, she will be ${n === 2 ? 'twice' : `${n} times`} as old as ${n1}. Write and solve an equation to find ${n1}'s age now. How old is ${n1}'s mother now?`,
    parts: [numPart(c, { label: `${n1}:`, suffix: 'years' }), numPart(P, { label: 'Mother:', suffix: 'years' })],
    hints: [`Let $c$ be ${n1}'s age now, so the mother is $c + ${D}$.`, `In ${t} years: $c + ${D} + ${t} = ${n}(c + ${t})$. Expand and solve.`],
    solution: [
      `Let $c$ be ${n1}'s age now. The mother is $c + ${D}$.`,
      `In ${t} years: $c + ${D + t} = ${n}(c + ${t})$`,
      `Expand: $c + ${D + t} = ${n}c + ${n * t}$`,
      `Subtract $c$ and $${n * t}$ from both sides: $${D + t - n * t} = ${n - 1 === 1 ? '' : n - 1}c$`,
      ...(n - 1 === 1 ? [] : [`Divide by $${n - 1}$: $c = ${c}$`]),
      `Check: now ${n1} is ${c} and the mother is ${P}. In ${t} years they will be ${c + t} and ${P + t}, and $${P + t} = ${n} \\times ${c + t}$.`,
      `${n1} is ${c} years old and the mother is ${P} years old.`,
    ],
  };
}

function perimeterOut(rng: Rng, d: Difficulty): Out {
  if (d === 2 || (d === 1 && rng.chance(0.5))) {
    // Rectangle: length = k·w + e, perimeter P.
    const k = rng.int(2, 3);
    const e = rng.nonZero(-4, 9);
    const w = rng.int(4, 20);
    const l = k * w + e;
    const P = 2 * (w + l);
    const thing = rng.pick(['rectangular hockey banner', 'rectangular vegetable garden', 'rectangular photo frame', 'rectangular dog run']);
    const unit = thing.includes('banner') || thing.includes('frame') ? 'cm' : 'm';
    const eqTxt = `2w + 2(${k}w ${e < 0 ? '-' : '+'} ${Math.abs(e)}) = ${P}`;
    const rel = `${e < 0 ? `${-e} ${unit} less` : `${e} ${unit} more`} than ${k === 2 ? 'twice' : 'three times'} its width`;
    const steps = [
      `Let $w$ be the width. The length is $${k}w ${e < 0 ? '-' : '+'} ${Math.abs(e)}$.`,
      `Perimeter $= 2(\\text{width}) + 2(\\text{length})$: $${eqTxt}$`,
      `Expand: $2w + ${2 * k}w ${2 * e < 0 ? '-' : '+'} ${Math.abs(2 * e)} = ${P}$`,
      `Collect like terms: $${2 + 2 * k}w ${2 * e < 0 ? '-' : '+'} ${Math.abs(2 * e)} = ${P}$`,
      `${2 * e < 0 ? `Add $${-2 * e}$ to` : `Subtract $${2 * e}$ from`} both sides: $${2 + 2 * k}w = ${P - 2 * e}$`,
      `Divide by $${2 + 2 * k}$: $w = ${w}$`,
      `Check: the length is $${k}(${w}) ${e < 0 ? '-' : '+'} ${Math.abs(e)} = ${l}$ and the perimeter is $2(${w}) + 2(${l}) = ${P}$.`,
    ];
    if (d === 1) {
      return {
        prompt: `The length of a ${thing} is ${rel}. Its perimeter is ${P} ${unit}. The equation $${eqTxt}$ models this, where $w$ is the width. Solve it to find the width.`,
        parts: [numPart(w, { label: '$w =$', suffix: unit })],
        hints: ['Expand the brackets, then collect like terms.', 'Undo the addition or subtraction, then divide.'],
        solution: [...steps.slice(2), `The width is ${w} ${unit}.`],
      };
    }
    return {
      prompt: `The length of a ${thing} is ${rel}. Its perimeter is ${P} ${unit}. Write and solve an equation to find the width.`,
      parts: [numPart(w, { label: 'Width:', suffix: unit })],
      hints: ['Let $w$ be the width. Write the length in terms of $w$.', 'Perimeter = 2 × width + 2 × length. Expand, collect like terms and solve.'],
      solution: [...steps, `The width is ${w} ${unit}.`],
    };
  }
  // Square and equilateral triangle with equal perimeters: 4(ax + b) = 3(cx + e).
  const [a, b, c, e, x] = retry(
    () => {
      const aa = rng.int(1, 3);
      const cc = rng.int(1, 4);
      const xx = rng.int(3, 12);
      const bb = rng.nonZero(-3, 8);
      const num3 = 4 * (aa * xx + bb) - 3 * cc * xx;
      return [aa, bb, cc, num3 / 3, xx];
    },
    ([aa, bb, cc, ee, xx]) => 4 * aa !== 3 * cc && Number.isInteger(ee) && ee !== 0 && aa * xx + bb > 0 && cc * xx + ee > 0,
  );
  const sq = lin(F(a), F(b), 'frac');
  const tri = lin(F(c), F(e), 'frac');
  const P = 4 * (a * x + b);
  const unit = 'cm';
  const { steps } = solveSteps(F(4 * a), F(4 * b), F(3 * c), F(3 * e), 'frac');
  return {
    prompt: `A square has sides of length $(${sq})$ cm. An equilateral triangle has sides of length $(${tri})$ cm. The two shapes have the same perimeter.

a) Write and solve an equation to find $x$.

b) What is the perimeter of each shape?`,
    parts: [numPart(x, { label: 'a) $x =$' }), numPart(P, { label: 'b) Perimeter:', suffix: unit })],
    hints: ['A square has 4 equal sides and an equilateral triangle has 3 equal sides.', `Solve $4(${sq}) = 3(${tri})$, then substitute $x$ to find the perimeter.`],
    solution: [
      `Square perimeter: $4(${sq})$. Triangle perimeter: $3(${tri})$.`,
      `Set them equal and expand: $${lin(F(4 * a), F(4 * b), 'frac')} = ${lin(F(3 * c), F(3 * e), 'frac')}$`,
      ...steps,
      `Check: the square's side is $${a * x + b}$ cm, so its perimeter is $4 \\times ${a * x + b} = ${P}$ cm. The triangle's side is $${c * x + e}$ cm, so its perimeter is $3 \\times ${c * x + e} = ${P}$ cm.`,
      `a) $x = ${x}$; b) each perimeter is ${P} ${unit}.`,
    ],
  };
}

const equationProblems = skill({
  id: 'm9-equation-problems',
  name: 'Solving problems with linear equations',
  description: 'Model a problem with a linear equation, solve it and verify the solution in the problem.',
  outcomes: ['PR3'],
  lessonId: 'm9-6-3',
  calculator: true,
  gen(rng, d): Out {
    const kind = d === 1 ? rng.pick(['plan', 'savings', 'perimeter'] as const) : rng.pick(['plan', 'savings', 'age', 'perimeter'] as const);
    if (kind === 'plan') return planOut(rng, d);
    if (kind === 'savings') return savingsOut(rng, d);
    if (kind === 'age') return ageOut(rng, d);
    return perimeterOut(rng, d);
  },
});

// ---------------------------------------------------------------------------
// Inequalities
// ---------------------------------------------------------------------------

type Sym = '<' | '\\le' | '>' | '\\ge';
const SYMS: Sym[] = ['<', '\\le', '>', '\\ge'];
const flip = (s: Sym): Sym => ({ '<': '>', '>': '<', '\\le': '\\ge', '\\ge': '\\le' } as const)[s];
const strictSwap = (s: Sym): Sym => ({ '<': '\\le', '\\le': '<', '>': '\\ge', '\\ge': '>' } as const)[s];
const isRight = (s: Sym) => s === '>' || s === '\\ge';
const isClosed = (s: Sym) => s === '\\le' || s === '\\ge';
const symWord = (s: Sym) => ({ '<': 'less than', '\\le': 'less than or equal to', '>': 'greater than', '\\ge': 'greater than or equal to' } as const)[s];

/** A number line for v (sym) b, drawn on a plane: ticks every `step`, the boundary not always centred. */
function ineqFigure(b: number, sym: Sym, lo: number, step: number): Figure {
  const hi = lo + 10 * step;
  const xMin = lo - 0.6 * step;
  const xMax = hi + 0.6 * step;
  const y = 0.5 * step;
  return {
    type: 'plane',
    grid: { xMin, xMax, yMin: 0.1 * step, yMax: 0.9 * step, step },
    hideAxes: true,
    segments: [
      { from: [xMin, y], to: [xMax, y], color: 'muted', arrowStart: true, arrowEnd: true },
      { from: [b, y], to: [isRight(sym) ? xMax : xMin, y], arrowEnd: true, ...(isClosed(sym) ? { closedStart: true } : { openStart: true }) },
    ],
  };
}

/** The window start for a number line through b. */
const lineStart = (rng: Rng, b: number, step: number) => b - step * rng.int(3, 7);

type Situation = { text: (b: number, town: string) => string; v: string; meaning: string; sym: Sym; lo: number; hi: number; step: number; unit: string };

const SITUATIONS: Situation[] = [
  { text: (b) => `To ride the Thunder Coaster at the summer fair, a rider must be at least ${b} cm tall.`, v: 'h', meaning: "a rider's height in centimetres", sym: '\\ge', lo: 100, hi: 140, step: 5, unit: 'cm' },
  { text: (b) => `A freight elevator can safely carry at most ${b} kg.`, v: 'm', meaning: 'the mass in the elevator in kilograms', sym: '\\le', lo: 500, hi: 1500, step: 100, unit: 'kg' },
  { text: (b, t) => `The temperature in ${t} stayed above ${b}°C all day.`, v: 't', meaning: 'the temperature in degrees Celsius', sym: '>', lo: -20, hi: 10, step: 1, unit: '°C' },
  { text: (b, t) => `The overnight low in ${t} will be below ${b}°C.`, v: 't', meaning: 'the temperature in degrees Celsius', sym: '<', lo: -25, hi: 5, step: 1, unit: '°C' },
  { text: (b) => `Fewer than ${b} students signed up for the chess club.`, v: 's', meaning: 'the number of students', sym: '<', lo: 8, hi: 30, step: 1, unit: '' },
  { text: (b) => `To make the playoffs, the hockey team needs more than ${b} points.`, v: 'p', meaning: 'the number of points', sym: '>', lo: 20, hi: 60, step: 5, unit: '' },
  { text: (b) => `On the school bus trip, each bag can have a mass of no more than ${b} kg.`, v: 'w', meaning: 'the mass of a bag in kilograms', sym: '\\le', lo: 10, hi: 25, step: 1, unit: 'kg' },
  { text: (b) => `The school dance needs a minimum of ${b} volunteers.`, v: 'n', meaning: 'the number of volunteers', sym: '\\ge', lo: 6, hi: 20, step: 1, unit: '' },
  { text: (b) => `In the fishing derby at the lake, only fish longer than ${b} cm count.`, v: 'L', meaning: 'the length of a fish in centimetres', sym: '>', lo: 20, hi: 60, step: 5, unit: 'cm' },
  { text: (b) => `A camp stove's fuel bottle holds no more than ${b} mL.`, v: 'f', meaning: 'the amount of fuel in millilitres', sym: '\\le', lo: 300, hi: 1000, step: 50, unit: 'mL' },
  { text: (b) => `Players on the under-${b} soccer team must be younger than ${b} years old.`, v: 'a', meaning: "a player's age in years", sym: '<', lo: 11, hi: 18, step: 1, unit: '' },
  { text: (b) => `A pizza must bake for at least ${b} minutes.`, v: 't', meaning: 'the baking time in minutes', sym: '\\ge', lo: 10, hi: 25, step: 1, unit: '' },
];

function symChoices(rng: Rng, v: string, b: string, sym: Sym) {
  return mc(rng, `$${v} ${sym} ${b}$`, SYMS.filter((s) => s !== sym).map((s) => `$${v} ${s} ${b}$`));
}

function lineChoices(rng: Rng, b: number, sym: Sym, lo: number, step: number) {
  return mcFigures(rng, [
    { md: '', figure: ineqFigure(b, sym, lo, step), correct: true },
    { md: '', figure: ineqFigure(b, strictSwap(sym), lo, step) },
    { md: '', figure: ineqFigure(b, flip(sym), lo, step) },
    { md: '', figure: ineqFigure(b, flip(strictSwap(sym)), lo, step) },
  ]);
}

const LINE_RULES = 'A closed (filled) dot means the boundary is included ($\\le$ or $\\ge$); an open dot means it is not included ($<$ or $>$).';

function lineSolution(v: string, b: number, sym: Sym): string[] {
  return [
    `The boundary is $${b}$. The symbol $${sym}$ ${isClosed(sym) ? 'includes' : 'does not include'} the boundary, so the dot is ${isClosed(sym) ? 'closed (filled)' : 'open'}.`,
    `$${v}$ is ${symWord(sym)} $${b}$, so the arrow points to the ${isRight(sym) ? 'right (greater values)' : 'left (smaller values)'}.`,
  ];
}

const PHRASES: Record<Sym, string> = { '<': '"less than", "fewer than", "below" and "younger than" mean $<$', '\\le': '"at most", "no more than" and "cannot exceed" mean $\\le$', '>': '"more than", "above", "over" and "longer than" mean $>$', '\\ge': '"at least" and "a minimum of" mean $\\ge$' };

type Model = { text: string; correct: string; wrong: string[]; explain: string };

function modelSituation(rng: Rng): Model {
  const name = rng.pick(NAMES);
  const k = rng.int(0, 4);
  if (k === 0) {
    const base = rng.int(3, 6);
    const rate = rng.int(2, 4);
    const max = rng.int(25, 60);
    return {
      text: `A taxi charges \\$${base} plus \\$${rate} per kilometre. ${name} can spend at most \\$${max}. Let $k$ be the number of kilometres.`,
      correct: `${base} + ${rate}k \\le ${max}`,
      wrong: [`${base} + ${rate}k \\ge ${max}`, `${base}k + ${rate} \\le ${max}`, `${base} + ${rate}k < ${max}`],
      explain: `The cost is $${base} + ${rate}k$ dollars, and "at most" means $\\le$.`,
    };
  }
  if (k === 1) {
    const start = 5 * rng.int(5, 20);
    const per = rng.int(6, 15);
    const goal = 50 * rng.int(4, 8);
    return {
      text: `In a video game, ${name} has ${start} points and earns ${per} points for each level completed. ${name} wants more than ${goal} points. Let $n$ be the number of levels completed.`,
      correct: `${start} + ${per}n > ${goal}`,
      wrong: [`${start} + ${per}n < ${goal}`, `${start}n + ${per} > ${goal}`, `${start} + ${per}n \\ge ${goal}`],
      explain: `The points are $${start} + ${per}n$, and "more than" means $>$.`,
    };
  }
  if (k === 2) {
    const raised = 10 * rng.int(8, 30);
    const price = rng.int(2, 5);
    const goal = 100 * rng.int(5, 9);
    return {
      text: `The Grade 9 class has raised \\$${raised} for a trip to a science centre. They sell cookies for \\$${price} each and need at least \\$${goal} in total. Let $c$ be the number of cookies sold.`,
      correct: `${raised} + ${price}c \\ge ${goal}`,
      wrong: [`${raised} + ${price}c \\le ${goal}`, `${raised}c + ${price} \\ge ${goal}`, `${raised} + ${price}c > ${goal}`],
      explain: `The money raised is $${raised} + ${price}c$ dollars, and "at least" means $\\ge$.`,
    };
  }
  if (k === 3) {
    const person = rng.int(70, 95);
    const box = rng.pick([20, 25, 30, 40]);
    const cap = 100 * rng.int(8, 12);
    return {
      text: `A worker with a mass of ${person} kg loads boxes of ${box} kg each into an elevator that can carry no more than ${cap} kg. Let $b$ be the number of boxes.`,
      correct: `${person} + ${box}b \\le ${cap}`,
      wrong: [`${person} + ${box}b \\ge ${cap}`, `${person}b + ${box} \\le ${cap}`, `${person} + ${box}b < ${cap}`],
      explain: `The total mass is $${person} + ${box}b$ kilograms, and "no more than" means $\\le$.`,
    };
  }
  const fee = 5 * rng.int(4, 8);
  const per = rng.int(2, 5);
  const max = 10 * rng.int(5, 9);
  return {
    text: `A cell phone plan costs \\$${fee} per month plus \\$${per} for each gigabyte of data. ${name} wants the monthly bill to be less than \\$${max}. Let $g$ be the number of gigabytes used.`,
    correct: `${fee} + ${per}g < ${max}`,
    wrong: [`${fee} + ${per}g > ${max}`, `${fee}g + ${per} < ${max}`, `${fee} + ${per}g \\le ${max}`],
    explain: `The bill is $${fee} + ${per}g$ dollars, and "less than" means $<$.`,
  };
}

const inequalityRepresent = skill({
  id: 'm9-inequality-represent',
  name: 'Representing inequalities',
  description: 'Write an inequality for a situation and match an inequality with its number line.',
  outcomes: ['PR4'],
  lessonId: 'm9-6-4',
  format: 'mc',
  gen(rng, d): Out {
    if (d === 3 && rng.chance(0.7)) {
      const m = modelSituation(rng);
      return {
        prompt: `${m.text}

Which inequality models the situation?`,
        parts: [{ answer: mc(rng, `$${m.correct}$`, m.wrong.map((w) => `$${w}$`)) }],
        hints: ['First write an expression for the total: the starting amount plus the amount per item times the number of items.', 'Then choose the symbol: "at most" or "no more than" is $\\le$, "at least" is $\\ge$, "more than" is $>$ and "less than" is $<$.'],
        solution: [m.explain, `The inequality is $${m.correct}$.`],
      };
    }
    const sit = rng.pick(SITUATIONS);
    const town = rng.pick(TOWNS);
    const b = sit.lo + sit.step * rng.int(0, Math.floor((sit.hi - sit.lo) / sit.step));
    const lo = lineStart(rng, b, sit.step);
    const variant = d === 1 ? rng.pick(['words', 'line']) : d === 2 ? rng.pick(['toLine', 'wordsToLine']) : 'wordsToLine';
    if (variant === 'words') {
      return {
        prompt: `${sit.text(b, town)} Let $${sit.v}$ be ${sit.meaning}. Which inequality describes the situation?`,
        parts: [{ answer: symChoices(rng, sit.v, `${b}`, sit.sym) }],
        hints: ['Look for the key words: "at least", "at most", "more than", "less than" ...', 'At least means $\\ge$ (the boundary is allowed). At most means $\\le$. More than means $>$. Less than means $<$.'],
        solution: [`The key words: ${PHRASES[sit.sym]}.`, `The inequality is $${sit.v} ${sit.sym} ${b}$.`],
      };
    }
    if (variant === 'line') {
      const v = rng.pick(['x', 'n', 't', 'p']);
      return {
        prompt: `Which inequality does the number line show?`,
        figure: ineqFigure(b, sit.sym, lo, sit.step),
        parts: [{ answer: symChoices(rng, v, `${b}`, sit.sym) }],
        hints: [LINE_RULES, 'An arrow to the right means greater values; an arrow to the left means smaller values.'],
        solution: [...lineSolution(v, b, sit.sym), `The number line shows $${v} ${sit.sym} ${b}$.`],
      };
    }
    const intro = variant === 'toLine'
      ? `Which number line shows $${sit.v} ${sit.sym} ${b}$?`
      : `${sit.text(b, town)} Let $${sit.v}$ be ${sit.meaning}. Which number line shows the situation?`;
    return {
      prompt: intro,
      parts: [{ answer: lineChoices(rng, b, sit.sym, lo, sit.step) }],
      hints: [variant === 'toLine' ? LINE_RULES : 'First write the inequality from the key words, then match it to a number line.', 'An arrow to the right means greater values; an arrow to the left means smaller values.'],
      solution: [
        ...(variant === 'toLine' ? [] : [`The key words: ${PHRASES[sit.sym]}. The inequality is $${sit.v} ${sit.sym} ${b}$.`]),
        ...lineSolution(sit.v, b, sit.sym),
        `The correct number line has ${isClosed(sit.sym) ? 'a closed' : 'an open'} dot at $${b}$ and an arrow pointing ${isRight(sit.sym) ? 'right' : 'left'}.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// 6.5 Solving inequalities
// ---------------------------------------------------------------------------

type Ineq = { tex: string; steps: string[]; sym: Sym; b: Frac; wrongB: Frac; reversed: boolean; check: (t: Frac) => string };

/** Steps for a·x + b (sym) c·x + d, collecting x on the left. */
function solveIneq(a: Frac, b: Frac, c: Frac, dd: Frac, sym: Sym, mode: Mode, constFirst = false): Ineq {
  const steps: string[] = [];
  let A = a;
  let D = dd;
  const rhs = isZero(c) ? num(dd, mode) : lin(c, dd, mode);
  const tex = `${lin(a, b, mode, constFirst)} ${sym} ${rhs}`;
  if (!isZero(c)) {
    A = fracSub(a, c);
    steps.push(`${moveText(c, mode, true)}: $${lin(A, b, mode)} ${sym} ${num(dd, mode)}$`);
  }
  if (!isZero(b)) {
    D = fracSub(dd, b);
    steps.push(`${moveText(b, mode, false)}: $${xTerm(A, mode)} ${sym} ${num(D, mode)}$`);
  }
  const bound = fracDiv(D, A);
  const reversed = A.n < 0;
  const out = reversed ? flip(sym) : sym;
  const bTex = mode === 'dec' && (isInt(bound) || terminates(bound)) ? num(bound, 'dec') : fracLatex(bound);
  if (A.n !== A.d) {
    steps.push(
      reversed
        ? `Divide both sides by $${num(A, mode)}$. Dividing by a **negative** number reverses the inequality sign, so $${sym}$ becomes $${out}$: $x ${out} ${bTex}$`
        : `Divide both sides by $${num(A, mode)}$ (a positive number, so the sign stays the same): $x ${out} ${bTex}$`,
    );
  }
  // A typical wrong boundary: adding instead of subtracting the constant.
  const wrongB = fracDiv(fracAdd(dd, b), A);
  const check = (t: Frac) => {
    const L = at(a, b, t);
    const R = at(c, dd, t);
    const m2: Mode = mode === 'dec' ? 'dec' : 'frac';
    const show = (f: Frac) => (mode === 'dec' && (isInt(f) || terminates(f)) ? num(f, 'dec') : fracLatex(f));
    const side = (p: Frac, q: Frac, v: Frac, cf: boolean) => (isZero(p) ? show(v) : `${subst(p, q, t, m2, cf)} = ${show(v)}`);
    return `Check with a value in the solution, $x = ${fracLatex(t)}$: the left side is $${side(a, b, L, constFirst)}$ and the right side is $${side(c, dd, R, false)}$. Since $${show(L)} ${sym} ${show(R)}$ is true, the solution checks.`;
  };
  return { tex, steps, sym: out, b: bound, wrongB, reversed, check };
}

/** An integer test value inside the solution set, near the boundary. */
function testValue(b: Frac, sym: Sym): Frac {
  const v = fracValue(b);
  return F(isRight(sym) ? Math.floor(v) + 1 : Math.ceil(v) - 1);
}

function ineqChoices(rng: Rng, s: Ineq) {
  const bt = (f: Frac) => fracLatex(f);
  let wb = s.wrongB;
  if (fracValue(wb) === fracValue(s.b)) wb = negF(s.b);
  if (fracValue(wb) === fracValue(s.b)) wb = fracAdd(s.b, F(1));
  return mc(rng, `$x ${s.sym} ${bt(s.b)}$`, [
    `$x ${flip(s.sym)} ${bt(s.b)}$`,
    `$x ${s.sym} ${bt(wb)}$`,
    `$x ${flip(s.sym)} ${bt(wb)}$`,
    `$x ${strictSwap(s.sym)} ${bt(s.b)}$`,
  ]);
}

const inequalitySolve = skill({
  id: 'm9-inequality-solve',
  name: 'Solving linear inequalities',
  description: 'Solve single-variable linear inequalities, reversing the sign when multiplying or dividing by a negative number.',
  outcomes: ['PR4'],
  lessonId: 'm9-6-5',
  format: 'mc',
  gen(rng, d): Out {
    const sym = rng.pick(SYMS);
    let s: Ineq;
    let mode: Mode = 'frac';
    if (d === 1) {
      const k = rng.int(0, 3);
      const x0 = rng.intExcept(-9, 9, [0]);
      if (k === 0) {
        const a = rng.nonZero(-9, 9);
        s = solveIneq(F(1), F(a), ZERO, F(x0 + a), sym, mode, rng.chance(0.3));
      } else if (k === 1) {
        const a = rng.int(2, 9);
        s = solveIneq(F(a), ZERO, ZERO, F(a * x0), sym, mode);
      } else if (k === 2) {
        const a = -rng.int(2, 9);
        s = solveIneq(F(a), ZERO, ZERO, F(a * x0), sym, mode);
      } else {
        // x/a (sym) c, written as a fraction coefficient: multiply both sides by a.
        const a = rng.sign() * rng.int(2, 6);
        const c = rng.intExcept(-6, 6, [0]);
        const bound = F(a * c);
        const out = a < 0 ? flip(sym) : sym;
        const tex = `${a < 0 ? '-' : ''}\\dfrac{x}{${Math.abs(a)}} ${sym} ${c}`;
        s = {
          tex,
          steps: [a < 0
            ? `Multiply both sides by $${a}$. Multiplying by a **negative** number reverses the inequality sign, so $${sym}$ becomes $${out}$: $x ${out} ${a * c}$`
            : `Multiply both sides by $${a}$ (a positive number, so the sign stays the same): $x ${out} ${a * c}$`],
          sym: out,
          b: bound,
          wrongB: F(a < 0 ? -a * c : c + a),
          reversed: a < 0,
          check: (t) => `Check with a value in the solution, $x = ${fracLatex(t)}$: $${a < 0 ? '-' : ''}\\dfrac{${t.n}}{${Math.abs(a)}} = ${fracLatex(F(t.n, a))}$, and $${fracLatex(F(t.n, a))} ${sym} ${c}$ is true.`,
        };
      }
    } else if (d === 2) {
      const a = rng.nonZero(-6, 6);
      const A = Math.abs(a) === 1 ? a * rng.int(2, 6) : a;
      const b = rng.nonZero(-12, 12);
      const x0 = rng.intExcept(-8, 8, [0]);
      s = solveIneq(F(A), F(b), ZERO, F(A * x0 + b), sym, mode, rng.chance(0.4));
    } else if (rng.chance(0.5)) {
      // Variables on both sides.
      const [a, c] = retry(() => [rng.nonZero(-8, 8), rng.nonZero(-8, 8)], ([p, q]) => p !== q && Math.abs(p - q) >= 2);
      const b = rng.nonZero(-12, 12);
      const k = a - c;
      const top = rng.chance(0.3) ? retry(() => rng.nonZero(-20, 20), (n) => n % k !== 0) : k * rng.intExcept(-7, 7, [0]);
      s = solveIneq(F(a), F(b), F(c), F(b + top), sym, mode);
    } else {
      // Decimal coefficients.
      mode = 'dec';
      const [a10, c10] = retry(() => [rng.nonZero(-30, 30), rng.nonZero(-30, 30)], ([p, q]) => p !== q && (p - q) % 10 === 0 && p % 10 !== 0);
      const b10 = rng.nonZero(-50, 50);
      const x0 = rng.intExcept(-6, 6, [0]);
      const a = F(a10, 10);
      const c = F(c10, 10);
      const b = F(b10, 10);
      s = solveIneq(a, b, c, fracSub(at(a, b, F(x0)), fracMul(c, F(x0))), sym, mode);
    }
    const t = testValue(s.b, s.sym);
    const solution = [...s.steps, s.check(t), `The solution is $x ${s.sym} ${fracLatex(s.b)}$.`];
    const hints = [
      'Solve it like an equation: undo addition or subtraction first, then multiplication or division.',
      'If you multiply or divide both sides by a negative number, reverse the inequality sign.',
    ];
    if (d === 3 && rng.chance(0.5)) {
      return {
        prompt: `Solve the inequality:
$$${s.tex}$$
Give the boundary value (as an integer, a fraction or a decimal) and choose the inequality sign in the solution.`,
        parts: [
          numPart(fracValue(s.b), { label: 'Boundary value:' }),
          { label: 'Solution: $x$ ___ boundary', answer: fixedChoice(SYMS.map((z) => `$${z}$`), SYMS.indexOf(s.sym)) },
        ],
        hints,
        solution,
      };
    }
    return {
      prompt: `Solve the inequality:
$$${s.tex}$$`,
      parts: [{ answer: ineqChoices(rng, s) }],
      hints,
      solution,
    };
  },
});

// ---------------------------------------------------------------------------
// 6.5 Problems with inequalities
// ---------------------------------------------------------------------------

/** A quotient to three decimals, with an ellipsis when it was cut short. */
const approx = (x: number) => (Math.abs(x - Number(fmt(x, 3))) < 1e-9 ? fmt(x, 3) : `${fmt(x, 3)}\\ldots`);

type Prob = { prompt: string; ineq: string; wrong: string[]; answer: number; suffix: string; steps: string[]; hints: string[] };

function budgetProb(rng: Rng, d: Difficulty): Prob {
  const name = rng.pick(NAMES);
  const item = rng.pick([
    { what: 'movie tickets', one: 'ticket', v: 't', price: [800, 1400], fee: 'a one-time online booking fee' },
    { what: 'games of bowling', one: 'game', v: 'g', price: [400, 750], fee: 'a one-time shoe rental fee' },
    { what: 'slices of pizza at the fundraiser', one: 'slice', v: 's', price: [250, 450], fee: 'a one-time charge for a drink' },
    { what: 'rides at the fair', one: 'ride', v: 'r', price: [300, 600], fee: 'an admission fee' },
  ] as const);
  const price = 25 * rng.int(item.price[0] / 25, item.price[1] / 25);
  const fee = d === 1 ? 0 : 50 * rng.int(4, 20);
  const n = rng.int(3, 12);
  // A whole-dollar budget that buys exactly n items.
  const budgets: number[] = [];
  for (let c = Math.ceil((fee + price * n) / 100) * 100; c < fee + price * (n + 1); c += 100) budgets.push(c);
  const budget = rng.pick(budgets);
  const v = item.v;
  const feeText = fee ? ` There is also ${item.fee} of ${money(fee)}.` : '';
  const ineq = fee ? `${mnum(fee)} + ${mnum(price)}${v} \\le ${mnum(budget)}` : `${mnum(price)}${v} \\le ${mnum(budget)}`;
  const bound = (budget - fee) / price;
  const steps = [
    `Let $${v}$ be the number of ${item.what.split(' ')[0] === 'games' ? 'games' : item.what.split(' at ')[0]}. The cost must be at most ${money(budget)}: $${ineq}$`,
    ...(fee ? [`Subtract $${mnum(fee)}$ from both sides: $${mnum(price)}${v} \\le ${mnum(budget - fee)}$`] : []),
    `Divide both sides by $${mnum(price)}$: $${v} \\le ${approx(bound)}$`,
    `$${v}$ must be a whole number, so the greatest value is $${n}$.`,
    `Check: ${n} ${n === 1 ? item.one : `${item.one}s`} cost ${money(fee + price * n)}, which is within ${money(budget)}; ${n + 1} would cost ${money(fee + price * (n + 1))}, which is too much.`,
  ];
  return {
    prompt: `${name} has ${money(budget)} to spend on ${item.what}. Each ${item.one} costs ${money(price)}.${feeText} What is the greatest number of ${item.one}s ${name} can buy?`,
    ineq,
    wrong: [ineq.replace('\\le', '\\ge'), fee ? `${mnum(price)} + ${mnum(fee)}${v} \\le ${mnum(budget)}` : `${v} + ${mnum(price)} \\le ${mnum(budget)}`, ineq.replace('\\le', '<'), ...(fee ? [`${mnum(price)}${v} \\le ${mnum(budget)}`] : [])],
    answer: n,
    suffix: `${item.one}s`,
    steps,
    hints: [`Write an inequality: the total cost must be less than or equal to ${money(budget)}.`, 'Solve it, then choose the greatest whole number that works.'],
  };
}

function scoreProb(rng: Rng, d: Difficulty): Prob {
  const team = rng.pick(['The Grade 9 volleyball team', 'The school hockey team', 'A soccer club in town', 'A ringette team in a nearby town']);
  const per = rng.pick([2, 3]);
  const have = d === 1 ? 0 : rng.int(8, 30);
  const need = retry(() => have + rng.int(10, 40), (t) => (t - have) % per !== 0 || rng.chance(0.3));
  const w = Math.ceil((need - have) / per);
  const ineq = have ? `${have} + ${per}w \\ge ${need}` : `${per}w \\ge ${need}`;
  const bound = (need - have) / per;
  const steps = [
    `Let $w$ be the number of wins. The points must be at least ${need}: $${ineq}$`,
    ...(have ? [`Subtract $${have}$ from both sides: $${per}w \\ge ${need - have}$`] : []),
    `Divide both sides by $${per}$: $w \\ge ${approx(bound)}$`,
    `$w$ must be a whole number, so the least value is $${w}$.`,
    `Check: ${w} wins give ${have + per * w} points (at least ${need}); ${w - 1} wins give only ${have + per * (w - 1)} points.`,
  ];
  return {
    prompt: `${team} earns ${per} points for each win.${have ? ` It already has ${have} points.` : ''} It needs at least ${need} points to make the playoffs. What is the least number of ${have ? 'additional ' : ''}wins it needs?`,
    ineq,
    wrong: [ineq.replace('\\ge', '\\le'), have ? `${per} + ${have}w \\ge ${need}` : `w + ${per} \\ge ${need}`, ineq.replace('\\ge', '>'), ...(have ? [`${per}w \\ge ${need}`] : [])],
    answer: w,
    suffix: 'wins',
    steps,
    hints: [`Write an inequality: the points must be greater than or equal to ${need}.`, 'Solve it, then choose the least whole number that works.'],
  };
}

function planProb(rng: Rng): Prob {
  // Plan A: fee + rate·t < Plan B: flat. Strict, so a whole-number boundary is excluded.
  const name = rng.pick(NAMES);
  const fee = 500 * rng.int(3, 6);
  const rate = rng.pick([5, 10, 15, 20, 25, 30, 40]);
  const flat = fee + 50 * rng.int(6, 30);
  const bound = (flat - fee) / rate;
  const t = Number.isInteger(bound) ? bound - 1 : Math.floor(bound);
  const ineq = `${mnum(fee)} + ${mnum(rate)}t < ${mnum(flat)}`;
  return {
    prompt: `${name} is choosing a phone plan for texting. Plan A costs ${money(fee)} per month plus ${money(rate)} per text. Plan B costs ${money(flat)} per month with unlimited texts. What is the greatest number of texts ${name} can send in a month for Plan A to cost less than Plan B?`,
    ineq,
    wrong: [ineq.replace('<', '>'), `${mnum(rate)} + ${mnum(fee)}t < ${mnum(flat)}`, ineq.replace('<', '\\le')],
    answer: t,
    suffix: 'texts',
    steps: [
      `Let $t$ be the number of texts. Plan A must cost less than Plan B: $${ineq}$`,
      `Subtract $${mnum(fee)}$ from both sides: $${mnum(rate)}t < ${mnum(flat - fee)}$`,
      `Divide both sides by $${mnum(rate)}$: $t < ${approx(bound)}$`,
      Number.isInteger(bound)
        ? `$t$ must be a whole number less than $${bound}$ (at exactly ${bound} texts the plans cost the same), so the greatest value is $${t}$.`
        : `$t$ must be a whole number, so the greatest value is $${t}$.`,
      `Check: with ${t} texts Plan A costs ${money(fee + rate * t)}, which is less than ${money(flat)}; with ${t + 1} texts it costs ${money(fee + rate * (t + 1))}.`,
    ],
    hints: ['Write an inequality: (cost of Plan A) < (cost of Plan B).', 'Solve it. The answer must be a whole number that makes the inequality true.'],
  };
}

function averageProb(rng: Rng): Prob {
  const name = rng.pick(NAMES);
  const marks = retry(() => [rng.int(62, 92), rng.int(62, 92), rng.int(62, 92)], (m) => m.every((x, i) => m.indexOf(x) === i));
  const sum = marks[0] + marks[1] + marks[2];
  const goal = retry(() => 5 * rng.int(15, 18), (g) => 4 * g - sum > 50 && 4 * g - sum <= 100);
  const need = 4 * goal - sum;
  const ineq = `\\dfrac{${sum} + m}{4} \\ge ${goal}`;
  return {
    prompt: `${name}'s marks on three math tests are ${marks[0]}, ${marks[1]} and ${marks[2]} (out of 100). ${name} wants an average of at least ${goal} after the fourth test. What is the least mark ${name} needs on the fourth test?`,
    ineq,
    wrong: [ineq.replace('\\ge', '\\le'), `\\dfrac{${sum}}{4} + m \\ge ${goal}`, ineq.replace('\\ge', '>')],
    answer: need,
    suffix: '',
    steps: [
      `Let $m$ be the mark on the fourth test. The average is the sum of the four marks divided by 4: $${ineq}$`,
      `Multiply both sides by $4$: $${sum} + m \\ge ${4 * goal}$`,
      `Subtract $${sum}$ from both sides: $m \\ge ${need}$`,
      `The least mark is $${need}$.`,
      `Check: $\\dfrac{${sum} + ${need}}{4} = ${goal}$, which is exactly the goal; a mark of ${need - 1} gives an average below ${goal}.`,
    ],
    hints: ['The average of four tests is (sum of the marks) ÷ 4.', 'Multiply both sides by 4 first, then subtract.'],
  };
}

const inequalityProblems = skill({
  id: 'm9-inequality-problems',
  name: 'Solving problems with inequalities',
  description: 'Model a budget, score or comparison problem with a linear inequality and interpret the solution as whole numbers.',
  outcomes: ['PR4'],
  lessonId: 'm9-6-5',
  calculator: true,
  gen(rng, d): Out {
    const p = d === 3 ? rng.pick([planProb, averageProb, (r: Rng) => budgetProb(r, 2), (r: Rng) => scoreProb(r, 2)])(rng) : rng.chance(0.5) ? budgetProb(rng, d) : scoreProb(rng, d);
    if (d === 3) {
      return {
        prompt: `${p.prompt}

a) Which inequality models the problem?

b) Solve the problem.`,
        parts: [{ label: 'a)', answer: mc(rng, `$${p.ineq}$`, p.wrong.map((w) => `$${w}$`)) }, numPart(p.answer, { label: 'b)', suffix: p.suffix })],
        hints: p.hints,
        solution: [...p.steps, `a) $${p.ineq}$; b) ${p.suffix ? `${p.answer} ${p.suffix}` : `$${p.answer}$`}.`],
      };
    }
    return {
      prompt: p.prompt,
      parts: [numPart(p.answer, { suffix: p.suffix })],
      hints: p.hints,
      solution: [...p.steps, `The answer is ${p.answer} ${p.suffix}.`],
    };
  },
});

export const EQUATIONS_SKILLS: SkillDef[] = [equationBothSides, equationBrackets, equationProblems, inequalityRepresent, inequalitySolve, inequalityProblems];
