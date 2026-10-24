/** Math 31 Unit 1 — Precalculus Review (PC1). */
import { mc, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, fmtFixed, fmtGroup, fmtGroupTex, frac, fracLatex, toFrac } from '../../../math/numbers.ts';
import type { Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

/** A number in LaTeX: integers plainly, simple fractions as \frac. */
function tn(x: number, dfrac = false): string {
  if (Number.isInteger(x)) return fmt(x);
  const f = toFrac(x, 200);
  return f ? fracLatex(f, { dfrac }) : fmt(x);
}
/** A number in brackets when negative, for substitutions. */
const par = (x: number) => (x < 0 ? `(${tn(x)})` : tn(x));

/** A polynomial from [coefficient, body] pairs, skipping zero terms (LaTeX or plain text, depending on the bodies). */
function poly(terms: Array<[number, string]>): string {
  let out = '';
  for (const [c, body] of terms) {
    if (c === 0) continue;
    const abs = Math.abs(c);
    const k = body && abs === 1 ? '' : fmt(abs);
    out += out === '' ? `${c < 0 ? '-' : ''}${k}${body}` : ` ${c < 0 ? '-' : '+'} ${k}${body}`;
  }
  return out || '0';
}
/** ax^2 + bx + c in LaTeX. */
const quadTex = (a: number, b: number, c: number, v = 'x') => poly([[a, `${v}^2`], [b, v], [c, '']]);
/** mx + b in LaTeX. */
const linTex = (m: number, b: number, v = 'x') => poly([[m, v], [b, '']]);
/** + 3 or - 3. */
const pm = (n: number) => (n < 0 ? `- ${tn(-n)}` : `+ ${tn(n)}`);
/** A coefficient in front of a bracket or variable: '' for 1, '-' for -1. */
const cf = (n: number) => (n === 1 ? '' : n === -1 ? '-' : tn(n));
/** Further terms of a sum, each with its sign (' + 3x - 2'), or '' when all are zero. */
function more(terms: Array<[number, string]>): string {
  const s = poly(terms);
  if (s === '0') return '';
  return s.startsWith('-') ? ` - ${s.slice(1)}` : ` + ${s}`;
}
/** m(x) + b with a number substituted for x. */
const linSub = (m: number, x: number, b: number) => `${cf(m)}(${tn(x)})${more([[b, '']])}`;

const NAMES = ['Aiyana', 'Mateo', 'Priya', 'Liam', 'Mei', 'Noah', 'Amara', 'Ethan', 'Sofia', 'Kiran', 'Jasmine', 'Owen', 'Fatima', 'Lucas', 'Hana', 'Dakota', 'Ravi', 'Chloé', 'Tariq', 'Émilie'];

/** True when v is not close to a rounding boundary at `dp` decimals. */
function safeRound(v: number, dp: number): boolean {
  const s = Math.abs(v) * 10 ** dp;
  return Math.abs(s - Math.floor(s) - 0.5) > 0.1;
}

// ---------------------------------------------------------------------------
// 1.1 — Functions for calculus
// ---------------------------------------------------------------------------

type Lin = { m: number; b: number };
type Quad = { a: number; b: number; c: number };

const fnRev = skill({
  id: 'm31-function-review',
  name: 'Composition, domains and difference quotients',
  description: 'Evaluate and compose functions, find the domain of a composite function and simplify a difference quotient.',
  outcomes: ['PC1'],
  lessonId: 'm31-1-1',
  gen(rng, d): GenOutput {
    const kind =
      d === 1
        ? rng.pick(['evalComp', 'compLinear'] as const)
        : d === 2
          ? rng.pick(['compQuad', 'dqQuad', 'dqQuad', 'domainRoot', 'decompose', 'dqLinear'] as const)
          : rng.pick(['dqCubic', 'dqRational', 'domainMixed', 'dqQuadEval'] as const);
    const [F, G] = rng.pick([['f', 'g'], ['f', 'g'], ['p', 'q'], ['u', 'v']] as const);

    if (kind === 'evalComp') {
      const f: Lin = { m: rng.nonZero(-4, 5), b: rng.int(-6, 6) };
      const g: Quad = { a: 1, b: 0, c: rng.int(-5, 5) };
      const k = rng.nonZero(-3, 3);
      const fFirst = rng.chance(0.5);
      const fv = (x: number) => f.m * x + f.b;
      const gv = (x: number) => x * x + g.c;
      const inner = fFirst ? gv(k) : fv(k);
      const value = fFirst ? fv(inner) : gv(inner);
      const [outer, innerName] = fFirst ? [F, G] : [G, F];
      return {
        prompt: `Let $${F}(x) = ${linTex(f.m, f.b)}$ and $${G}(x) = ${quadTex(1, 0, g.c)}$. Evaluate $(${outer} \\circ ${innerName})(${k})$.`,
        parts: [numPart(value)],
        hints: [`$(${outer} \\circ ${innerName})(${k})$ means $${outer}(${innerName}(${k}))$: work from the inside out.`, `First find $${innerName}(${k})$, then put that number into $${outer}$.`],
        solution: [
          fFirst ? `$${G}(${k}) = ${par(k)}^2${more([[g.c, '']])} = ${inner}$` : `$${F}(${k}) = ${linSub(f.m, k, f.b)} = ${inner}$`,
          fFirst ? `$${F}(${inner}) = ${linSub(f.m, inner, f.b)} = ${value}$` : `$${G}(${inner}) = ${par(inner)}^2${more([[g.c, '']])} = ${value}$`,
          `$(${outer} \\circ ${innerName})(${k}) = ${value}$`,
        ],
      };
    }

    if (kind === 'compLinear') {
      const f: Lin = { m: rng.nonZero(-5, 5), b: rng.int(-7, 7) };
      const g: Lin = { m: rng.pick([-3, -2, 2, 3, 4]), b: rng.nonZero(-6, 6) };
      const order = rng.chance(0.5);
      // order: f(g(x)); otherwise g(f(x))
      const [o, i] = order ? [f, g] : [g, f];
      const [oName, iName] = order ? [F, G] : [G, F];
      const m = o.m * i.m;
      const b = o.m * i.b + o.b;
      return {
        prompt: `Let $${F}(x) = ${linTex(f.m, f.b)}$ and $${G}(x) = ${linTex(g.m, g.b)}$. Find $(${oName} \\circ ${iName})(x)$ and simplify.`,
        parts: [part({ kind: 'expression', expected: poly([[m, 'x'], [b, '']]), form: 'expanded' }, { label: `$(${oName} \\circ ${iName})(x) =$` })],
        hints: [`$(${oName} \\circ ${iName})(x) = ${oName}(${iName}(x))$: replace every $x$ in $${oName}$ with the whole expression for $${iName}(x)$.`, 'Expand the brackets and collect like terms.'],
        solution: [
          `$${oName}(${iName}(x)) = ${oName}(${linTex(i.m, i.b)})$`,
          `$= ${o.m === 1 ? '' : o.m === -1 ? '-' : o.m}(${linTex(i.m, i.b)}) ${o.b === 0 ? '' : pm(o.b)}$`,
          `$(${oName} \\circ ${iName})(x) = ${poly([[m, 'x'], [b, '']])}$`,
        ],
      };
    }

    if (kind === 'dqLinear') {
      const m = rng.nonZero(-9, 9);
      const b = rng.int(-9, 9);
      return {
        prompt: `For $${F}(x) = ${linTex(m, b)}$, simplify the difference quotient $$\\dfrac{${F}(x + h) - ${F}(x)}{h}, \\quad h \\ne 0.$$`,
        parts: [part({ kind: 'expression', expected: fmt(m), form: 'expanded' }, { label: 'Difference quotient $=$' })],
        hints: [`Find $${F}(x + h)$ by replacing $x$ with $(x + h)$.`, `Subtract $${F}(x)$: most terms cancel. Then divide by $h$.`],
        solution: [
          `$${F}(x + h) = ${m === 1 ? '' : m === -1 ? '-' : m}(x + h) ${b === 0 ? '' : pm(b)} = ${poly([[m, 'x'], [m, 'h'], [b, '']])}$`,
          `$${F}(x + h) - ${F}(x) = (${poly([[m, 'x'], [m, 'h'], [b, '']])}) - (${linTex(m, b)}) = ${poly([[m, 'h']])}$`,
          `$\\dfrac{${poly([[m, 'h']])}}{h} = ${m}$`,
          `The difference quotient is $${m}$, the slope of the line — the same for every $x$ and $h$.`,
        ],
      };
    }

    if (kind === 'compQuad') {
      const f: Quad = { a: rng.pick([1, 1, 2, -1]), b: 0, c: rng.int(-6, 6) };
      const g: Lin = { m: rng.pick([-3, -2, 2, 3]), b: rng.nonZero(-5, 5) };
      const fOfG = rng.chance(0.6);
      if (fOfG) {
        // f(g(x)) = a(mx + b)^2 + c
        const A = f.a * g.m * g.m;
        const B = f.a * 2 * g.m * g.b;
        const C = f.a * g.b * g.b + f.c;
        const exp = quadTex(A, B, C);
        return {
          prompt: `Let $${F}(x) = ${quadTex(f.a, 0, f.c)}$ and $${G}(x) = ${linTex(g.m, g.b)}$. Find $(${F} \\circ ${G})(x)$ in expanded form.`,
          parts: [part({ kind: 'expression', expected: poly([[A, 'x^2'], [B, 'x'], [C, '']]), form: 'expanded' }, { label: `$(${F} \\circ ${G})(x) =$` })],
          hints: [`Replace $x$ in $${F}(x)$ with $(${linTex(g.m, g.b)})$.`, `Square the binomial first: $(mx + b)^2 = m^2x^2 + 2mbx + b^2$.`],
          solution: [
            `$${F}(${G}(x)) = ${f.a === 1 ? '' : f.a === -1 ? '-' : f.a}(${linTex(g.m, g.b)})^2 ${f.c === 0 ? '' : pm(f.c)}$`,
            `$(${linTex(g.m, g.b)})^2 = ${quadTex(g.m * g.m, 2 * g.m * g.b, g.b * g.b)}$`,
            f.a === 1 ? `Add ${f.c === 0 ? 'nothing' : `$${f.c}$`}.` : `Multiply by $${f.a}$${f.c === 0 ? '' : ` and add $${f.c}$`}.`,
            `$(${F} \\circ ${G})(x) = ${exp}$`,
          ],
        };
      }
      // g(f(x)) = m(ax^2 + c) + b
      const A = g.m * f.a;
      const C = g.m * f.c + g.b;
      return {
        prompt: `Let $${F}(x) = ${quadTex(f.a, 0, f.c)}$ and $${G}(x) = ${linTex(g.m, g.b)}$. Find $(${G} \\circ ${F})(x)$ in expanded form.`,
        parts: [part({ kind: 'expression', expected: poly([[A, 'x^2'], [C, '']]), form: 'expanded' }, { label: `$(${G} \\circ ${F})(x) =$` })],
        hints: [`$(${G} \\circ ${F})(x) = ${G}(${F}(x))$: the inside function is $${F}$.`, `Replace $x$ in $${G}(x)$ with $(${quadTex(f.a, 0, f.c)})$ and expand.`],
        solution: [
          `$${G}(${F}(x)) = ${g.m}(${quadTex(f.a, 0, f.c)}) ${pm(g.b)}$`,
          `$= ${poly([[A, 'x^2'], [g.m * f.c, '']])} ${pm(g.b)}$`,
          `$(${G} \\circ ${F})(x) = ${quadTex(A, 0, C)}$`,
        ],
      };
    }

    if (kind === 'dqQuad' || kind === 'dqQuadEval') {
      const a = rng.pick([-3, -2, -1, 1, 2, 3, 4]);
      const b = rng.int(-6, 6);
      const c = rng.int(-8, 8);
      const fx = quadTex(a, b, c);
      const dq = poly([[2 * a, 'x'], [a, 'h'], [b, '']]);
      const cancelled = [poly([[a, 'x^2']]), b ? poly([[b, 'x']]) : '', c ? `${c}` : ''].filter(Boolean).map((t) => `$${t}$`);
      const steps = [
        `$${F}(x + h) = ${poly([[a, '(x + h)^2'], [b, '(x + h)'], [c, '']])}$`,
        `$= ${poly([[a, 'x^2'], [2 * a, 'xh'], [a, 'h^2'], [b, 'x'], [b, 'h'], [c, '']])}$`,
        `$${F}(x + h) - ${F}(x) = ${poly([[2 * a, 'xh'], [a, 'h^2'], [b, 'h']])}$ (the ${cancelled.join(cancelled.length > 2 ? ', ' : ' and ').replace(/, (?=[^,]*$)/, ' and ')} terms cancel)`,
        `$\\dfrac{${poly([[2 * a, 'xh'], [a, 'h^2'], [b, 'h']])}}{h} = \\dfrac{h(${dq})}{h} = ${dq}$`,
      ];
      if (kind === 'dqQuad') {
        return {
          prompt: `For $${F}(x) = ${fx}$, simplify the difference quotient $$\\dfrac{${F}(x + h) - ${F}(x)}{h}, \\quad h \\ne 0.$$ Write your answer in terms of $x$ and $h$.`,
          parts: [part({ kind: 'expression', expected: poly([[2 * a, 'x'], [a, 'h'], [b, '']]), form: 'expanded' }, { label: 'Difference quotient $=$' })],
          hints: [`Expand $${F}(x + h)$ carefully: $(x + h)^2 = x^2 + 2xh + h^2$.`, 'After subtracting, every remaining term has a factor of $h$. Factor it out and cancel it with the denominator.'],
          solution: [...steps, `The difference quotient is $${dq}$.`],
        };
      }
      // d3: simplify then evaluate at a given x and h (as a secant slope).
      const x0 = rng.int(-3, 4);
      const h0 = rng.pick([0.1, 0.5, 1, 2, 0.01]);
      const v = 2 * a * x0 + a * h0 + b;
      return {
        prompt: `For $${F}(x) = ${fx}$:\n\n(a) Simplify $\\dfrac{${F}(x + h) - ${F}(x)}{h}$, $h \\ne 0$.\n\n(b) Use your answer to find the slope of the secant line through the points on the graph where $x = ${x0}$ and $x = ${fmt(x0 + h0)}$.`,
        parts: [
          part({ kind: 'expression', expected: poly([[2 * a, 'x'], [a, 'h'], [b, '']]), form: 'expanded' }, { label: '(a)' }),
          numPart(v, { label: '(b) Slope $=$', display: 'decimal' }),
        ],
        hints: [`Expand $${F}(x + h)$, subtract $${F}(x)$, then factor $h$ out of the numerator.`, `For (b), the secant from $x$ to $x + h$ has slope equal to the difference quotient: use $x = ${x0}$ and $h = ${fmt(h0)}$.`],
        solution: [...steps, `(a) $${dq}$`, `(b) With $x = ${x0}$ and $h = ${fmt(h0)}$: $${2 * a}(${x0})${more([[a, `(${fmt(h0)})`], [b, '']])} = ${fmt(v)}$`, `The slope of the secant line is $${fmt(v)}$.`],
      };
    }

    if (kind === 'domainRoot') {
      // f(x) = sqrt(x), g(x) = k - x or x - k (or scaled): domain of f(g(x)).
      const k = rng.nonZero(-6, 8);
      const flip = rng.chance(0.5);
      const m = rng.pick([1, 1, 2, 3]);
      // g(x) = m x - m k  (zero at x = k) or g(x) = m k - m x
      const g = flip ? linTex(-m, m * k) : linTex(m, -m * k);
      const correct = flip ? `$x \\le ${k}$` : `$x \\ge ${k}$`;
      const wrongDir = flip ? `$x \\ge ${k}$` : `$x \\le ${k}$`;
      const choices = [wrongDir, '$x \\ge 0$', '$x \\in \\mathbb{R}$', `$x \\ge ${-k}$`];
      return {
        prompt: `Let $${F}(x) = \\sqrt{x}$ and $${G}(x) = ${g}$. What is the domain of $(${F} \\circ ${G})(x)$?`,
        parts: [part(mc(rng, correct, choices))],
        hints: [`$(${F} \\circ ${G})(x) = \\sqrt{${g}}$. A square root needs a radicand that is not negative.`, `Solve $${g} \\ge 0$.`],
        solution: [
          `$(${F} \\circ ${G})(x) = ${F}(${G}(x)) = \\sqrt{${g}}$`,
          `The radicand must satisfy $${g} \\ge 0$.`,
          flip ? `$${tn(m * k)} \\ge ${m === 1 ? '' : m}x$, so $x \\le ${k}$.` : `$${m === 1 ? '' : m}x \\ge ${tn(m * k)}$, so $x \\ge ${k}$.`,
          `The domain is ${correct}, that is, ${flip ? `$(-\\infty, ${k}]$` : `$[${k}, \\infty)$`}.`,
        ],
      };
    }

    if (kind === 'decompose') {
      const t = rng.int(0, 3);
      const m = rng.pick([2, 3, 4, 5]);
      const b = rng.nonZero(-7, 7);
      const n = rng.pick([3, 4, 5]);
      const inner = linTex(m, b);
      let h = '';
      let correct = '';
      let wrong: string[] = [];
      if (t === 0) {
        h = `(${inner})^{${n}}`;
        correct = `$${F}(x) = x^{${n}}$, $${G}(x) = ${inner}$`;
        wrong = [`$${F}(x) = ${inner}$, $${G}(x) = x^{${n}}$`, `$${F}(x) = x^{${n}}$, $${G}(x) = ${m}x$`, `$${F}(x) = (${m}x)^{${n}}$, $${G}(x) = x ${pm(b)}$`];
      } else if (t === 1) {
        h = `\\sqrt{${inner}}`;
        correct = `$${F}(x) = \\sqrt{x}$, $${G}(x) = ${inner}$`;
        wrong = [`$${F}(x) = ${inner}$, $${G}(x) = \\sqrt{x}$`, `$${F}(x) = \\sqrt{${m}x}$, $${G}(x) = x ${pm(b)}$`, `$${F}(x) = \\sqrt{x}$, $${G}(x) = ${m}x$`];
      } else if (t === 2) {
        h = `\\dfrac{1}{${inner}}`;
        correct = `$${F}(x) = \\dfrac{1}{x}$, $${G}(x) = ${inner}$`;
        wrong = [`$${F}(x) = ${inner}$, $${G}(x) = \\dfrac{1}{x}$`, `$${F}(x) = \\dfrac{1}{${m}x}$, $${G}(x) = x ${pm(b)}$`, `$${F}(x) = \\dfrac{1}{x}$, $${G}(x) = ${m}x$`];
      } else {
        h = `(x^2 ${pm(b)})^{${n}}`;
        correct = `$${F}(x) = x^{${n}}$, $${G}(x) = x^2 ${pm(b)}$`;
        wrong = [`$${F}(x) = x^2 ${pm(b)}$, $${G}(x) = x^{${n}}$`, `$${F}(x) = x^{${2 * n}}$, $${G}(x) = x ${pm(b)}$`, `$${F}(x) = x^{${n}} ${pm(b)}$, $${G}(x) = x^2$`];
      }
      return {
        prompt: `Let $H(x) = ${h}$. Which pair of functions satisfies $H(x) = (${F} \\circ ${G})(x)$?`,
        parts: [part(mc(rng, correct, wrong))],
        hints: [`In $${F}(${G}(x))$, $${G}$ acts first. Ask: what is calculated first when you evaluate $H(x)$?`, `Check each choice by substituting $${G}(x)$ into $${F}$.`],
        solution: [
          `To evaluate $H(x)$ you first calculate the inside expression, then apply the outer operation.`,
          `So the inner function is $${G}(x) = ${t === 3 ? `x^2 ${pm(b)}` : inner}$ and the outer function is $${F}(x) = ${t === 1 ? '\\sqrt{x}' : t === 2 ? '\\dfrac{1}{x}' : `x^{${n}}`}$.`,
          `Check: $${F}(${G}(x)) = ${h}$ ✓`,
          `The answer is ${correct}.`,
        ],
      };
    }

    if (kind === 'dqCubic') {
      const a = rng.pick([1, 1, 2, -1]);
      const b = rng.int(-6, 6);
      const c = rng.int(-5, 5);
      const fx = poly([[a, 'x^3'], [b, 'x'], [c, '']]);
      const ans = poly([[3 * a, 'x^2'], [3 * a, 'xh'], [a, 'h^2'], [b, '']]);
      return {
        prompt: `For $${F}(x) = ${fx}$, simplify the difference quotient $$\\dfrac{${F}(x + h) - ${F}(x)}{h}, \\quad h \\ne 0.$$`,
        parts: [part({ kind: 'expression', expected: ans, form: 'expanded' }, { label: 'Difference quotient $=$' })],
        hints: ['Use $(x + h)^3 = x^3 + 3x^2h + 3xh^2 + h^3$.', 'After subtracting, factor $h$ out of every term in the numerator and cancel.'],
        solution: [
          `$(x + h)^3 = x^3 + 3x^2h + 3xh^2 + h^3$`,
          `$${F}(x + h) = ${poly([[a, 'x^3'], [3 * a, 'x^2h'], [3 * a, 'xh^2'], [a, 'h^3'], [b, 'x'], [b, 'h'], [c, '']])}$`,
          `$${F}(x + h) - ${F}(x) = ${poly([[3 * a, 'x^2h'], [3 * a, 'xh^2'], [a, 'h^3'], [b, 'h']])}$`,
          `Divide each term by $h$: $${ans}$`,
          `The difference quotient is $${ans}$.`,
        ],
      };
    }

    if (kind === 'dqRational') {
      const k = rng.pick([1, 2, 3, 4, 5, -1, -2, -3]);
      const p = rng.int(0, 4);
      const den = p === 0 ? 'x' : `x + ${p}`;
      const denH = p === 0 ? 'x + h' : `x + h + ${p}`;
      const prod = `(${denH})${p === 0 ? 'x' : `(${den})`}`;
      const correct = `$\\dfrac{${-k}}{${prod}}$`;
      const wrong = [`$\\dfrac{${k}}{${prod}}$`, `$\\dfrac{${-k}}{${p === 0 ? 'x^2' : `(${den})^2`}}$`, `$\\dfrac{${cf(-k)}h}{${prod}}$`];
      const kNum = (body: string) => `${cf(k)}${body}`;
      return {
        prompt: `For $${F}(x) = \\dfrac{${k}}{${den}}$, which expression is the simplified difference quotient $\\dfrac{${F}(x + h) - ${F}(x)}{h}$, $h \\ne 0$?`,
        parts: [part(mc(rng, correct, wrong))],
        hints: ['Subtract the two fractions in the numerator using a common denominator.', 'The numerator simplifies to a multiple of $h$; dividing by $h$ cancels it.'],
        solution: [
          `$${F}(x + h) - ${F}(x) = \\dfrac{${k}}{${denH}} - \\dfrac{${k}}{${den}} = \\dfrac{${kNum(`(${den})`)} - ${k < 0 ? `(${k})` : k === 1 ? '' : k}(${denH})}{${prod}}$`,
          `Expand the numerator: the $x$ terms${p ? ' and the constant terms' : ''} cancel, leaving $${cf(-k)}h$.`,
          `Divide by $h$: $\\dfrac{${cf(-k)}h}{${prod}} \\cdot \\dfrac{1}{h} = \\dfrac{${-k}}{${prod}}$`,
          `The simplified difference quotient is ${correct}.`,
        ],
      };
    }

    // domainMixed: f(x) = 1/(x - m), g(x) = sqrt(x): f(g(x)) = 1/(sqrt x - m), domain x >= 0, x != m^2.
    const m = rng.int(1, 5);
    const which = rng.chance(0.5);
    if (which) {
      const correct = `$x \\ge 0$ and $x \\ne ${m * m}$`;
      const wrong = [`$x \\ge 0$ and $x \\ne ${m}$`, '$x \\ge 0$', `$x \\ne ${m}$`];
      return {
        prompt: `Let $${F}(x) = \\dfrac{1}{x - ${m}}$ and $${G}(x) = \\sqrt{x}$. What is the domain of $(${F} \\circ ${G})(x)$?`,
        parts: [part(mc(rng, correct, wrong))],
        hints: [`The domain of $${F} \\circ ${G}$ contains the $x$-values in the domain of $${G}$ for which $${G}(x)$ is in the domain of $${F}$.`, `$${G}(x) = \\sqrt{x}$ needs $x \\ge 0$, and $${F}$ cannot take the input $${m}$: solve $\\sqrt{x} = ${m}$.`],
        solution: [
          `$(${F} \\circ ${G})(x) = \\dfrac{1}{\\sqrt{x} - ${m}}$`,
          `$\\sqrt{x}$ is defined only for $x \\ge 0$.`,
          `The denominator is $0$ when $\\sqrt{x} = ${m}$, that is, when $x = ${m * m}$.`,
          `The domain is ${correct}: $[0, ${m * m}) \\cup (${m * m}, \\infty)$.`,
        ],
      };
    }
    // g(f(x)) = sqrt(1/(x - m)) : need x - m > 0
    const correct = `$x > ${m}$`;
    const wrong = [`$x \\ge ${m}$`, `$x \\ne ${m}$`, `$x \\ge 0$ and $x \\ne ${m}$`];
    return {
      prompt: `Let $${F}(x) = \\dfrac{1}{x - ${m}}$ and $${G}(x) = \\sqrt{x}$. What is the domain of $(${G} \\circ ${F})(x)$?`,
      parts: [part(mc(rng, correct, wrong))],
      hints: [`$(${G} \\circ ${F})(x) = \\sqrt{\\dfrac{1}{x - ${m}}}$.`, `You need $x \\ne ${m}$ for $${F}$, and $\\dfrac{1}{x - ${m}} \\ge 0$ for the square root.`],
      solution: [
        `$(${G} \\circ ${F})(x) = \\sqrt{\\dfrac{1}{x - ${m}}}$`,
        `$${F}(x)$ is undefined at $x = ${m}$.`,
        `$\\dfrac{1}{x - ${m}}$ is never $0$, and it is positive exactly when $x - ${m} > 0$.`,
        `The domain is ${correct}, that is, $(${m}, \\infty)$.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// 1.2 — Trigonometry and logarithms
// ---------------------------------------------------------------------------

/** An angle nπ/d in [0, 2π), reduced. */
type Ang = { n: number; d: number };
function ang(n: number, d: number): Ang {
  const f = frac(n, d);
  return { n: f.n, d: f.d };
}
/** All the special angles (multiples of π/6 and π/4) in [0, 2π), in increasing order. */
const SPECIAL: Ang[] = (() => {
  const out: Ang[] = [];
  for (let k = 0; k < 24; k++) if (k % 2 === 0 || k % 3 === 0) out.push(ang(k, 12));
  return out;
})();
const angVal = (a: Ang) => (a.n * Math.PI) / a.d;
function angTex(a: Ang): string {
  if (a.n === 0) return '0';
  const top = a.n === 1 ? '\\pi' : `${a.n}\\pi`;
  return a.d === 1 ? top : `\\frac{${top}}{${a.d}}`;
}
function angText(a: Ang): string {
  if (a.n === 0) return '0';
  const top = a.n === 1 ? 'pi' : `${a.n}pi`;
  return a.d === 1 ? top : `${top}/${a.d}`;
}

type Trig = 'sin' | 'cos' | 'tan';
const TRIG: Record<Trig, (x: number) => number> = { sin: Math.sin, cos: Math.cos, tan: Math.tan };

/** Exact values that appear for special angles: value, LaTeX. */
const EXACT: Array<[number, string]> = [
  [0, '0'],
  [0.5, '\\frac{1}{2}'],
  [Math.SQRT2 / 2, '\\frac{\\sqrt{2}}{2}'],
  [Math.sqrt(3) / 2, '\\frac{\\sqrt{3}}{2}'],
  [1, '1'],
  [Math.sqrt(3), '\\sqrt{3}'],
  [Math.sqrt(3) / 3, '\\frac{\\sqrt{3}}{3}'],
];
/** The same exact values as students type them. */
const EXACT_TEXT: Array<[number, string]> = [
  [0, '0'],
  [0.5, '1/2'],
  [Math.SQRT2 / 2, 'sqrt(2)/2'],
  [Math.sqrt(3) / 2, 'sqrt(3)/2'],
  [1, '1'],
  [Math.sqrt(3), 'sqrt(3)'],
  [Math.sqrt(3) / 3, 'sqrt(3)/3'],
];
function exactText(v: number): string {
  const hit = EXACT_TEXT.find(([x]) => Math.abs(Math.abs(v) - x) < 1e-9);
  if (!hit) return fmt(v);
  return v < -1e-9 ? `-${hit[1]}` : hit[1];
}
/** A numeric part with an exact value, recording the exact form for review screens. */
function exactPart(value: number, exact: string, label?: string, suffix?: string): Part {
  return { label, suffix, answer: { kind: 'numeric', value, exact } };
}
function exactTex(v: number): string {
  const hit = EXACT.find(([x]) => Math.abs(Math.abs(v) - x) < 1e-9);
  if (!hit) return fmt(v);
  return v < -1e-9 ? `-${hit[1]}` : hit[1];
}
const isTan90 = (f: Trig, a: Ang) => f === 'tan' && Math.abs(Math.cos(angVal(a))) < 1e-9;
function quadrantOf(a: Ang): 0 | 1 | 2 | 3 | 4 {
  const t = a.n / a.d; // multiple of π
  if (Number.isInteger(t * 2)) return 0;
  return t < 0.5 ? 1 : t < 1 ? 2 : t < 1.5 ? 3 : 4;
}
function refAng(a: Ang): Ang {
  const q = quadrantOf(a);
  const t = frac(a.n, a.d);
  const r = q === 1 ? t : q === 2 ? frac(t.d - t.n, t.d) : q === 3 ? frac(t.n - t.d, t.d) : frac(2 * t.d - t.n, t.d);
  return { n: r.n, d: r.d };
}
function refWork(a: Ang): string {
  const q = quadrantOf(a);
  const r = angTex(refAng(a));
  if (q === 1) return `${angTex(a)}$ is in quadrant I, so it is its own reference angle`;
  if (q === 2) return `${angTex(a)}$ is in quadrant II; its reference angle is $\\pi - ${angTex(a)} = ${r}$`;
  if (q === 3) return `${angTex(a)}$ is in quadrant III; its reference angle is $${angTex(a)} - \\pi = ${r}$`;
  return `${angTex(a)}$ is in quadrant IV; its reference angle is $2\\pi - ${angTex(a)} = ${r}$`;
}
const FN_WORD: Record<Trig, string> = { sin: 'sine', cos: 'cosine', tan: 'tangent' };
const QUAD_SIGN: Record<Trig, string> = {
  sin: 'sine is positive in quadrants I and II and negative in III and IV',
  cos: 'cosine is positive in quadrants I and IV and negative in II and III',
  tan: 'tangent is positive in quadrants I and III and negative in II and IV',
};
/** Solutions in [0, 2π) of trig(x) = v among the special angles. */
function solveSpecial(f: Trig, v: number): Ang[] {
  return SPECIAL.filter((a) => !isTan90(f, a) && Math.abs(TRIG[f](angVal(a)) - v) < 1e-9);
}
const listAngles = (as: Ang[]) => as.map((a) => `$x = ${angTex(a)}$`).join(', ');
const solsPart = (as: Ang[]): Part =>
  part({ kind: 'numbers', values: as.map(angVal), exact: as.map(angText) }, { label: '$x =$', placeholder: 'e.g. pi/6, 5pi/6' });
const solsText = (as: Ang[]) => (as.length ? as.map((a) => `$${angTex(a)}$`).join(', ') : 'no solution');

/** Explain the solutions of f(x) = v in [0, 2π). */
function solveSteps(f: Trig, v: number, sols: Ang[]): string[] {
  if (Math.abs(v) < 1e-9 || Math.abs(Math.abs(v) - 1) < 1e-9) {
    const where = f === 'sin' ? 'the $y$-coordinate' : f === 'cos' ? 'the $x$-coordinate' : '$y/x$';
    return [`On the unit circle, $\\${f} x$ is ${where}. It equals $${exactTex(v)}$ at ${sols.length ? solsText(sols) : 'no angle'} in $[0, 2\\pi)$.`];
  }
  const r = solveSpecial(f, Math.abs(v))[0];
  const qs = sols.map((a) => ['', 'I', 'II', 'III', 'IV'][quadrantOf(a)]).join(' and ');
  return [
    `The reference angle satisfies $\\${f} \\theta_R = ${exactTex(Math.abs(v))}$, so $\\theta_R = ${angTex(r)}$.`,
    `Since ${QUAD_SIGN[f]}, $\\${f} x = ${exactTex(v)}$ in quadrants ${qs}.`,
    `The solutions are ${solsText(sols)}.`,
  ];
}

/** Trig identity templates: expression, equivalent, distractors, a short reason. */
const IDENTITIES: Array<{ e: string; ans: string; wrong: string[]; why: string[]; typed?: string }> = [
  { typed: 'cos x', e: '\\sin x \\cot x', ans: '\\cos x', wrong: ['\\sin x', '\\tan x', '\\dfrac{\\sin^2 x}{\\cos x}'], why: ['$\\cot x = \\dfrac{\\cos x}{\\sin x}$', '$\\sin x \\cdot \\dfrac{\\cos x}{\\sin x} = \\cos x$'] },
  { typed: 'sin x', e: '\\dfrac{1 - \\cos^2 x}{\\sin x}', ans: '\\sin x', wrong: ['\\cos x', '\\dfrac{1}{\\sin x}', '1 - \\cos x'], why: ['Pythagorean identity: $1 - \\cos^2 x = \\sin^2 x$', '$\\dfrac{\\sin^2 x}{\\sin x} = \\sin x$'] },
  { typed: '1', e: '\\sec^2 x - \\tan^2 x', ans: '1', wrong: ['-1', '\\sec x - \\tan x', '0'], why: ['Pythagorean identity: $1 + \\tan^2 x = \\sec^2 x$', 'So $\\sec^2 x - \\tan^2 x = 1$'] },
  { typed: 'sin x', e: '\\tan x \\cos x', ans: '\\sin x', wrong: ['\\cos x', '1', '\\dfrac{\\sin x}{\\cos^2 x}'], why: ['$\\tan x = \\dfrac{\\sin x}{\\cos x}$', '$\\dfrac{\\sin x}{\\cos x} \\cdot \\cos x = \\sin x$'] },
  { typed: '2cos x', e: '\\dfrac{\\sin 2x}{\\sin x}', ans: '2\\cos x', wrong: ['2', '\\cos x', '2\\sin x'], why: ['Double-angle identity: $\\sin 2x = 2\\sin x \\cos x$', '$\\dfrac{2\\sin x \\cos x}{\\sin x} = 2\\cos x$'] },
  { typed: 'cos 2x', e: '\\cos^2 x - \\sin^2 x', ans: '\\cos 2x', wrong: ['1', '\\sin 2x', '-\\cos 2x'], why: ['Double-angle identity: $\\cos 2x = \\cos^2 x - \\sin^2 x$'] },
  { e: '(\\sin x + \\cos x)^2', ans: '1 + \\sin 2x', wrong: ['1', '1 + 2\\sin x', '1 + \\cos 2x'], why: ['Expand: $\\sin^2 x + 2\\sin x \\cos x + \\cos^2 x$', '$\\sin^2 x + \\cos^2 x = 1$ and $2\\sin x \\cos x = \\sin 2x$', 'So the expression equals $1 + \\sin 2x$'] },
  { typed: 'cos^2 x', e: '\\dfrac{1}{1 + \\tan^2 x}', ans: '\\cos^2 x', wrong: ['\\sec^2 x', '\\sin^2 x', '\\cot^2 x'], why: ['$1 + \\tan^2 x = \\sec^2 x$', '$\\dfrac{1}{\\sec^2 x} = \\cos^2 x$'] },
  { typed: 'cos x', e: '\\dfrac{1 - \\sin^2 x}{\\cos x}', ans: '\\cos x', wrong: ['\\sin x', '1 - \\sin x', '\\sec x'], why: ['$1 - \\sin^2 x = \\cos^2 x$', '$\\dfrac{\\cos^2 x}{\\cos x} = \\cos x$'] },
  { e: '1 - 2\\sin^2 x', ans: '\\cos 2x', wrong: ['\\sin 2x', '\\cos^2 x', '-\\cos 2x'], why: ['Double-angle identity: $\\cos 2x = 1 - 2\\sin^2 x$'] },
  { typed: 'cos x', e: '\\dfrac{\\sin x}{\\tan x}', ans: '\\cos x', wrong: ['\\sin^2 x', '\\sec x', '\\dfrac{1}{\\cos x}'], why: ['$\\dfrac{\\sin x}{\\tan x} = \\sin x \\cdot \\dfrac{\\cos x}{\\sin x}$', '$= \\cos x$'] },
  { e: '\\csc x - \\sin x', ans: '\\cos x \\cot x', wrong: ['\\cos x \\tan x', '\\cos^2 x', '\\cot x'], why: ['$\\csc x - \\sin x = \\dfrac{1}{\\sin x} - \\sin x = \\dfrac{1 - \\sin^2 x}{\\sin x}$', '$= \\dfrac{\\cos^2 x}{\\sin x} = \\cos x \\cdot \\dfrac{\\cos x}{\\sin x} = \\cos x \\cot x$'] },
];

const EXP_CONTEXTS = [
  { what: 'The number of bacteria in a culture', q: 'N', unit: 'bacteria', tUnit: 'hours', tShort: 'h', p0: [200, 500, 800, 1000], k: [0.15, 0.2, 0.25, 0.35], growth: true },
  { what: 'The population of a small town', q: 'P', unit: 'people', tUnit: 'years', tShort: 'years', p0: [4000, 6500, 8200, 12000], k: [0.012, 0.018, 0.024, 0.03], growth: true },
  { what: 'The mass of a radioactive sample, in milligrams,', q: 'm', unit: 'mg', tUnit: 'days', tShort: 'days', p0: [80, 120, 250, 400], k: [-0.05, -0.08, -0.115, -0.2], growth: false },
  { what: 'The temperature difference, in degrees Celsius, between a cooling cup of tea and the room', q: 'D', unit: '°C', tUnit: 'minutes', tShort: 'min', p0: [60, 70, 75], k: [-0.04, -0.06, -0.09], growth: false },
] as const;

const trigLog = skill({
  id: 'm31-trig-log-review',
  name: 'Trigonometry and logarithms for calculus',
  description: 'Find exact trigonometric values in radians, use identities, solve trigonometric equations on [0, 2π), and use the laws of logarithms and ln to solve equations.',
  outcomes: ['PC1'],
  lessonId: 'm31-1-2',
  gen(rng, d): GenOutput {
    const kind =
      d === 1
        ? rng.pick(['exact', 'exact', 'radians', 'logEval'] as const)
        : d === 2
          ? rng.pick(['trigEq', 'trigEq', 'identity', 'logLaws', 'expSolve'] as const)
          : rng.pick(['trigQuad', 'doubleAngle', 'logEq', 'expContext', 'expQuad'] as const);

    if (kind === 'exact') {
      const f = rng.pick(['sin', 'cos', 'tan'] as const);
      const a = retry(() => rng.pick(SPECIAL), (x) => !isTan90(f, x) && x.n !== 0);
      const v = TRIG[f](angVal(a));
      const q = quadrantOf(a);
      const exact = exactTex(v);
      const steps =
        q === 0
          ? [`$${angTex(a)}$ is on an axis. The point on the unit circle is $(${fmt(Math.round(Math.cos(angVal(a))))}, ${fmt(Math.round(Math.sin(angVal(a))))})$.`, f === 'sin' ? 'Sine is the $y$-coordinate.' : f === 'cos' ? 'Cosine is the $x$-coordinate.' : 'Tangent is $y/x$.']
          : [`$${refWork(a)}.`, `$\\${f} ${angTex(refAng(a))} = ${exactTex(Math.abs(v))}$`, `In quadrant ${['', 'I', 'II', 'III', 'IV'][q]}, ${FN_WORD[f]} is ${v > 0 ? 'positive' : 'negative'}.`];
      return {
        prompt: `Find the exact value of $\\${f} ${angTex(a)}$.`,
        parts: [exactPart(v, exactText(v), `$\\${f} ${angTex(a)} =$`)],
        hints: ['Find the reference angle and the quadrant of the angle (or the point on the unit circle for an angle on an axis).', `Use the special triangles: $\\sin\\frac{\\pi}{6} = \\frac{1}{2}$, $\\cos\\frac{\\pi}{6} = \\frac{\\sqrt{3}}{2}$, $\\sin\\frac{\\pi}{4} = \\cos\\frac{\\pi}{4} = \\frac{\\sqrt{2}}{2}$. Type a root as sqrt(3).`],
        solution: [...steps, `$\\${f} ${angTex(a)} = ${exact}$`],
        answerDisplay: `$${exact}$`,
      };
    }

    if (kind === 'radians') {
      const toRad = rng.chance(0.55);
      if (toRad) {
        const degs = rng.pick([20, 40, 45, 72, 80, 100, 120, 135, 150, 160, 200, 210, 225, 240, 270, 300, 315, 330]);
        const f = frac(degs, 180);
        const tex = angTex({ n: f.n, d: f.d });
        return {
          prompt: `Convert $${degs}^\\circ$ to radians. Give an exact answer in terms of $\\pi$.`,
          parts: [exactPart((degs * Math.PI) / 180, angText({ n: f.n, d: f.d }), 'Angle $=$', 'rad')],
          hints: ['$180^\\circ = \\pi$ radians.', `Multiply by $\\dfrac{\\pi}{180^\\circ}$ and reduce the fraction.`],
          solution: [`$${degs}^\\circ \\times \\dfrac{\\pi}{180^\\circ} = \\dfrac{${degs}\\pi}{180}$`, `Reduce: $\\dfrac{${degs}}{180} = ${fracLatex(f)}$`, `$${degs}^\\circ = ${tex}$ rad`],
          answerDisplay: `$${tex}$ rad (type ${angText({ n: f.n, d: f.d })})`,
        };
      }
      const a = retry(() => rng.pick(SPECIAL), (x) => x.n !== 0 && x.d !== 1);
      const degs = (a.n * 180) / a.d;
      return {
        prompt: `Convert $${angTex(a)}$ radians to degrees.`,
        parts: [numPart(degs, { label: 'Angle $=$', suffix: '°' })],
        hints: ['$\\pi$ radians $= 180^\\circ$.', `Replace $\\pi$ with $180^\\circ$ and simplify.`],
        solution: [`$${angTex(a)} \\times \\dfrac{180^\\circ}{\\pi} = \\dfrac{${a.n} \\times 180^\\circ}{${a.d}}$`, `$= ${degs}^\\circ$`],
      };
    }

    if (kind === 'logEval') {
      const t = rng.int(0, 5);
      const k = rng.nonZero(-6, 9);
      const a = rng.int(2, 9);
      const b = rng.int(2, 7);
      const m = rng.int(2, 5);
      const m2 = rng.int(2, 3);
      const T: Array<[string, number, string[]]> = [
        [`\\ln\\left(e^{${k}}\\right)`, k, [`$\\ln x$ and $e^x$ are inverses, so $\\ln(e^{${k}}) = ${k}$.`]],
        [`e^{\\ln ${a}}`, a, [`$e^x$ and $\\ln x$ are inverses, so $e^{\\ln ${a}} = ${a}$.`]],
        [`\\ln\\left(e^{${a}} \\cdot e^{${b}}\\right)`, a + b, [`$e^{${a}} \\cdot e^{${b}} = e^{${a + b}}$`, `$\\ln(e^{${a + b}}) = ${a + b}$`]],
        [`\\ln ${m === 2 ? '\\sqrt{e}' : `\\sqrt[${m}]{e}`}`, 1 / m, [`$${m === 2 ? '\\sqrt{e}' : `\\sqrt[${m}]{e}`} = e^{1/${m}}$`, `$\\ln(e^{1/${m}}) = \\frac{1}{${m}}$`]],
        [`e^{${m2}\\ln ${b}}`, b ** m2, [`$${m2}\\ln ${b} = \\ln(${b}^${m2}) = \\ln ${b ** m2}$ by the power law`, `$e^{\\ln ${b ** m2}} = ${b ** m2}$`]],
        [`\\ln\\left(\\dfrac{1}{e^{${a}}}\\right)`, -a, [`$\\dfrac{1}{e^{${a}}} = e^{-${a}}$`, `$\\ln(e^{-${a}}) = -${a}$`]],
      ];
      const [tex, value, steps] = T[t];
      return {
        prompt: `Evaluate $${tex}$ without a calculator.`,
        parts: [numPart(value)],
        hints: ['$\\ln x$ is the logarithm with base $e$, so $\\ln(e^k) = k$ and $e^{\\ln x} = x$.', 'Use the laws of exponents or logarithms to write the expression as $\\ln(e^{\\text{power}})$ or $e^{\\ln(\\text{number})}$.'],
        solution: [...steps, `The value is $${tn(value)}$.`],
        calculator: false,
      };
    }

    if (kind === 'trigEq') {
      const f = rng.pick(['sin', 'cos', 'tan'] as const);
      const vals = f === 'tan' ? [1, -1, Math.sqrt(3), -Math.sqrt(3), Math.sqrt(3) / 3, -Math.sqrt(3) / 3, 0] : [0.5, -0.5, Math.SQRT2 / 2, -Math.SQRT2 / 2, Math.sqrt(3) / 2, -Math.sqrt(3) / 2, 1, -1, 0];
      const v = rng.pick(vals);
      const sols = solveSpecial(f, v);
      let eq = '';
      let iso = '';
      const F = `\\${f} x`;
      const av = Math.abs(v);
      const s = v < 0 ? '+' : '-';
      if (Math.abs(av - 0.5) < 1e-9) {
        const a = rng.pick([2, 4, 6]);
        const b = rng.int(-5, 5);
        const c = (a * v) + b;
        eq = `${a}${F}${more([[b, '']])} = ${c}`;
        iso = b === 0 ? `divide by $${a}$ to get $${F} = ${exactTex(v)}$` : `${b > 0 ? `subtract $${b}$` : `add $${-b}$`} to get $${a}${F} = ${c - b}$, so $${F} = ${exactTex(v)}$`;
      } else if (Math.abs(av - Math.SQRT2 / 2) < 1e-9) {
        if (rng.chance(0.5)) {
          eq = `2${F} ${s} \\sqrt{2} = 0`;
          iso = `$2${F} = ${v < 0 ? '-' : ''}\\sqrt{2}$, so $${F} = ${exactTex(v)}$`;
        } else {
          eq = `\\sqrt{2}${F} ${s} 1 = 0`;
          iso = `$${F} = ${v < 0 ? '-' : ''}\\dfrac{1}{\\sqrt{2}} = ${exactTex(v)}$`;
        }
      } else if (Math.abs(av - Math.sqrt(3) / 2) < 1e-9) {
        eq = `2${F} ${s} \\sqrt{3} = 0`;
        iso = `$2${F} = ${v < 0 ? '-' : ''}\\sqrt{3}$, so $${F} = ${exactTex(v)}$`;
      } else if (Math.abs(av - Math.sqrt(3)) < 1e-9) {
        eq = `${F} ${s} \\sqrt{3} = 0`;
        iso = `$${F} = ${exactTex(v)}$`;
      } else if (Math.abs(av - Math.sqrt(3) / 3) < 1e-9) {
        eq = `\\sqrt{3}${F} ${s} 1 = 0`;
        iso = `$${F} = ${v < 0 ? '-' : ''}\\dfrac{1}{\\sqrt{3}} = ${exactTex(v)}$`;
      } else if (av === 1) {
        const a = rng.pick([1, 2, 3, 5]);
        const b = rng.int(-4, 4);
        eq = `${a === 1 ? '' : a}${F}${more([[b, '']])} = ${a * v + b}`;
        iso = `$${F} = ${fmt(v)}$`;
      } else {
        const a = rng.pick([2, 3, 4]);
        const b = rng.nonZero(-5, 5);
        eq = `${a}${F} ${pm(b)} = ${b}`;
        iso = `$${a}${F} = 0$, so $${F} = 0$`;
      }
      return {
        prompt: `Solve $${eq}$ for $0 \\le x < 2\\pi$. Give exact values, separated by commas.`,
        parts: [solsPart(sols)],
        hints: [`Isolate $${F}$ first.`, 'Find the reference angle from the special triangles, then use the signs of the ratios in each quadrant (or the unit circle) to find every solution in $[0, 2\\pi)$.'],
        solution: [`Isolate $${F}$: ${iso}.`, ...solveSteps(f, v, sols)],
        answerDisplay: listAngles(sols),
      };
    }

    if (kind === 'identity') {
      const t = rng.pick(IDENTITIES);
      if (t.typed && rng.chance(0.5)) {
        return {
          prompt: `Simplify $${t.e}$ to a single trigonometric function (or a constant).`,
          parts: [part({ kind: 'expression', expected: t.typed, form: 'single-function' }, { label: 'Simplified:' })],
          hints: ['Write everything in terms of $\\sin x$ and $\\cos x$, or use a Pythagorean ($\\sin^2 x + \\cos^2 x = 1$) or double-angle identity.', 'Type your answer like sin x, 2cos x, cos^2 x or cos 2x.'],
          solution: [...t.why, `The expression simplifies to $${t.ans}$.`],
        };
      }
      return {
        prompt: `Which expression is equivalent to $${t.e}$ (wherever both are defined)?`,
        parts: [part(mc(rng, `$${t.ans}$`, t.wrong.map((w) => `$${w}$`)))],
        hints: ['Write everything in terms of $\\sin x$ and $\\cos x$, or look for a Pythagorean ($\\sin^2 x + \\cos^2 x = 1$) or double-angle identity.', 'You can test a choice by substituting a value such as $x = \\frac{\\pi}{6}$ into both expressions.'],
        solution: [...t.why, `The equivalent expression is $${t.ans}$.`],
      };
    }

    if (kind === 'logLaws') {
      const p = rng.pick([1.5, 2, 2.5, 3, 0.5, 1.2, 0.8, 4]);
      const q = retry(() => rng.pick([1, 0.5, 1.5, 2, 3, 0.3, 0.7]), (v) => v !== p);
      const t = rng.int(0, 4);
      const m = rng.int(2, 4);
      const n = rng.int(2, 3);
      let tex = '';
      let value = 0;
      let steps: string[] = [];
      if (t === 0) {
        tex = `\\ln(a^${m} b)`;
        value = m * p + q;
        steps = [`$\\ln(a^${m} b) = \\ln a^${m} + \\ln b = ${m}\\ln a + \\ln b$`, `$= ${m}(${fmt(p)}) + ${fmt(q)} = ${fmt(value)}$`];
      } else if (t === 1) {
        tex = `\\ln\\left(\\dfrac{a}{b^${n}}\\right)`;
        value = p - n * q;
        steps = [`$\\ln\\left(\\dfrac{a}{b^${n}}\\right) = \\ln a - ${n}\\ln b$`, `$= ${fmt(p)} - ${n}(${fmt(q)}) = ${fmt(value)}$`];
      } else if (t === 2) {
        tex = `\\ln\\left(\\sqrt{a}\\, b^${n}\\right)`;
        value = p / 2 + n * q;
        steps = [`$\\sqrt{a} = a^{1/2}$, so $\\ln(\\sqrt{a}\\,b^${n}) = \\tfrac{1}{2}\\ln a + ${n}\\ln b$`, `$= \\tfrac{1}{2}(${fmt(p)}) + ${n}(${fmt(q)}) = ${fmt(value)}$`];
      } else if (t === 3) {
        tex = `\\ln\\left(\\dfrac{e^${m} a}{b}\\right)`;
        value = m + p - q;
        steps = [`$\\ln\\left(\\dfrac{e^${m} a}{b}\\right) = \\ln e^${m} + \\ln a - \\ln b$`, `$= ${m} + ${fmt(p)} - ${fmt(q)} = ${fmt(value)}$`];
      } else {
        tex = `\\ln(ab) + \\ln\\left(\\dfrac{a}{b}\\right)`;
        value = 2 * p;
        steps = [`$\\ln(ab) + \\ln\\left(\\dfrac{a}{b}\\right) = (\\ln a + \\ln b) + (\\ln a - \\ln b)$`, `$= 2\\ln a = 2(${fmt(p)}) = ${fmt(value)}$`];
      }
      return {
        prompt: `Given $\\ln a = ${fmt(p)}$ and $\\ln b = ${fmt(q)}$, evaluate $${tex}$.`,
        parts: [numPart(value, { display: 'decimal' })],
        hints: ['Laws of logarithms: $\\ln(MN) = \\ln M + \\ln N$, $\\ln\\left(\\frac{M}{N}\\right) = \\ln M - \\ln N$, $\\ln(M^k) = k\\ln M$.', 'Expand the logarithm into $\\ln a$ and $\\ln b$ terms, then substitute.'],
        solution: [...steps, `The value is $${fmt(value)}$.`],
      };
    }

    if (kind === 'expSolve') {
      const t = rng.int(0, 2);
      if (t === 0) {
        const { k, c } = retry(
          () => ({ k: rng.pick([1, 2, 3, 4, 0.5]), c: rng.pick([3, 5, 6, 7, 10, 12, 15, 20, 0.5, 0.2]) }),
          (o) => safeRound(Math.log(o.c) / o.k, 3),
        );
        const x = Math.log(c) / k;
        const kTex = k === 1 ? 'x' : k === 0.5 ? '0.5x' : `${k}x`;
        return {
          prompt: `Solve $e^{${kTex}} = ${fmt(c)}$. Round to the nearest thousandth.`,
          parts: [numPart(x, { label: '$x =$', decimals: 3 })],
          hints: ['Take the natural logarithm of both sides: $\\ln(e^{u}) = u$.', `Then divide by the coefficient of $x$.`],
          solution: [`$\\ln(e^{${kTex}}) = \\ln ${fmt(c)}$`, `$${kTex} = \\ln ${fmt(c)}$`, k === 1 ? `$x = \\ln ${fmt(c)} \\approx ${fmtFixed(x, 3)}$` : `$x = \\dfrac{\\ln ${fmt(c)}}{${fmt(k)}} \\approx ${fmtFixed(x, 3)}$`],
          calculator: true,
        };
      }
      if (t === 1) {
        const { a, b, k, c } = retry(
          () => {
            const a = rng.pick([2, 3, 4, 5]);
            const b = rng.int(-6, 6);
            const k = rng.pick([1, 2, 3, -1, 0.2]);
            const r = rng.pick([1.5, 2, 3, 4, 2.5, 6]);
            return { a, b, k, c: a * r + b };
          },
          (o) => (o.c - o.b) / o.a > 0 && safeRound(Math.log((o.c - o.b) / o.a) / o.k, 3) && Math.abs(Math.log((o.c - o.b) / o.a)) > 1e-9,
        );
        const r = (c - b) / a;
        const x = Math.log(r) / k;
        const kTex = k === 1 ? 'x' : k === -1 ? '-x' : `${fmt(k)}x`;
        return {
          prompt: `Solve $${a}e^{${kTex}} ${b === 0 ? '' : pm(b)} = ${fmt(c)}$. Round to the nearest thousandth.`,
          parts: [numPart(x, { label: '$x =$', decimals: 3 })],
          hints: ['Isolate the power $e^{(\\ldots)}$ first.', 'Then take $\\ln$ of both sides.'],
          solution: [
            b === 0 ? `Divide by $${a}$: $e^{${kTex}} = ${tn(r)}$` : `Subtract $${b}$ and divide by $${a}$: $e^{${kTex}} = ${tn(r)}$`,
            `Take $\\ln$ of both sides: $${kTex} = \\ln ${tn(r)}$`,
            k === 1 ? `$x = \\ln ${tn(r)} \\approx ${fmtFixed(x, 3)}$` : k === -1 ? `$x = -\\ln ${tn(r)} \\approx ${fmtFixed(x, 3)}$` : `$x = \\dfrac{\\ln ${tn(r)}}{${fmt(k)}} \\approx ${fmtFixed(x, 3)}$`,
          ],
          calculator: true,
        };
      }
      // ln(kx + b) = c
      const { k, b, c } = retry(
        () => ({ k: rng.pick([1, 2, 3, 4]), b: rng.int(-5, 5), c: rng.pick([1, 1.5, 2, 0.5, 3, -1]) }),
        (o) => safeRound((Math.exp(o.c) - o.b) / o.k, 3),
      );
      const x = (Math.exp(c) - b) / k;
      const inner = linTex(k, b);
      return {
        prompt: `Solve $\\ln(${inner}) = ${fmt(c)}$. Round to the nearest thousandth.`,
        parts: [numPart(x, { label: '$x =$', decimals: 3 })],
        hints: ['Rewrite the logarithmic equation in exponential form: $\\ln u = c$ means $u = e^c$.', 'Then solve the linear equation for $x$.'],
        solution: [`$${inner} = e^{${fmt(c)}}$`, b === 0 ? `$x = \\dfrac{e^{${fmt(c)}}}{${k}}$` : k === 1 ? `$x = e^{${fmt(c)}} ${pm(-b)}$` : `$x = \\dfrac{e^{${fmt(c)}} ${pm(-b)}}{${k}}$`, `$x \\approx ${fmtFixed(x, 3)}$`],
        calculator: true,
      };
    }

    if (kind === 'trigQuad') {
      const f = rng.pick(['sin', 'cos'] as const);
      const g = f === 'sin' ? 'cos' : 'sin';
      // Roots of the quadratic in s = f(x), each b/a with a in {1, 2}.
      const ROOTS: Array<[number, number]> = [[-1, 1], [-1, 2], [0, 1], [1, 2], [1, 1], [2, 1], [-2, 1], [3, 2], [-3, 2]];
      const [r1, r2] = retry(
        () => rng.sample(ROOTS, 2),
        ([p, q]) => p[0] / p[1] !== q[0] / q[1] && (Math.abs(p[0] / p[1]) <= 1 || Math.abs(q[0] / q[1]) <= 1),
      );
      const [b1, a1] = r1;
      const [b2, a2] = r2;
      // (a1 s - b1)(a2 s - b2) = A s^2 + B s + C
      const A = a1 * a2;
      const B = -(a1 * b2 + a2 * b1);
      const C = b1 * b2;
      const S = `\\${f} x`;
      const v1 = b1 / a1;
      const v2 = b2 / a2;
      const sols = [...solveSpecial(f, v1), ...solveSpecial(f, v2)].sort((p, q) => angVal(p) - angVal(q));
      const usePyth = rng.chance(0.4);
      const factor = (a: number, b: number) => `(${a === 1 ? '' : a}${S} ${b === 0 ? '' : pm(-b)})`.replace(' )', ')');
      const S2 = `\\${f}^2 x`;
      const quadEq = `${poly([[A, S2], [B, S], [C, '']])} = 0`;
      // Pythagorean form: A s^2 + B s + C = A(1 - g^2) + B s + C -> A g^2 - B s - (A + C) = 0
      const pythEq = `${poly([[A, `\\${g}^2 x`], [-B, S], [-(A + C), '']])} = 0`;
      const steps: string[] = [];
      if (usePyth) {
        steps.push(
          `Replace $\\${g}^2 x$ with $1 - ${S2}$: $${cf(A)}(1 - ${S2})${more([[-B, S], [-(A + C), '']])} = 0$`,
          `Expand and simplify: $${poly([[-A, S2], [-B, S], [-C, '']])} = 0$, then multiply by $-1$: $${quadEq}$`,
        );
      }
      steps.push(`Factor: $${factor(a1, b1)}${factor(a2, b2)} = 0$`);
      const caseStep = (v: number) => {
        if (Math.abs(v) > 1) return `$${S} = ${tn(v)}$ has no solution, because $-1 \\le ${S} \\le 1$.`;
        const ss = solveSpecial(f, v);
        return `$${S} = ${tn(v)}$ gives ${solsText(ss)}.`;
      };
      steps.push(caseStep(v1), caseStep(v2), `The solution${sols.length === 1 ? ' is' : 's are'} ${solsText(sols)}.`);
      return {
        prompt: `Solve $${usePyth ? pythEq : quadEq}$ for $0 \\le x < 2\\pi$. Give exact values, separated by commas.`,
        parts: [solsPart(sols)],
        hints: usePyth
          ? [`Use $\\sin^2 x + \\cos^2 x = 1$ to write the equation in terms of $${S}$ only.`, `You get a quadratic in $${S}$: factor it, then solve each factor on $[0, 2\\pi)$.`]
          : [`Treat it as a quadratic in $${S}$ (let $u = ${S}$) and factor.`, `Solve each factor on $[0, 2\\pi)$; a value outside $[-1, 1]$ gives no solution.`],
        solution: steps,
        answerDisplay: listAngles(sols),
      };
    }

    if (kind === 'doubleAngle') {
      const g = rng.pick(['sin', 'cos'] as const);
      const k = rng.pick([1, -1, Math.SQRT2, -Math.SQRT2, Math.sqrt(3), -Math.sqrt(3)]);
      const kTex = k === 1 ? '' : k === -1 ? '-' : `${k < 0 ? '-' : ''}\\sqrt{${Math.round(k * k)}}`;
      // sin 2x = k g(x)  ->  2 sin x cos x - k g(x) = 0  ->  g(x) (2 h(x) - k) = 0, h = the other function
      const h: Trig = g === 'sin' ? 'cos' : 'sin';
      const v = k / 2;
      const s1 = solveSpecial(g, 0);
      const s2 = solveSpecial(h, v);
      const sols = [...s1, ...s2].sort((p, q) => angVal(p) - angVal(q));
      const kAbs = k === 1 || k === -1 ? '' : `\\sqrt{${Math.round(k * k)}}`;
      return {
        prompt: `Solve $\\sin 2x = ${kTex}\\${g} x$ for $0 \\le x < 2\\pi$. Give exact values, separated by commas.`,
        parts: [solsPart(sols)],
        hints: ['Use the double-angle identity $\\sin 2x = 2\\sin x \\cos x$, then bring every term to one side.', `Factor out $\\${g} x$ — do not divide by it, or you lose the solutions where $\\${g} x = 0$.`],
        solution: [
          `$2\\sin x \\cos x ${k < 0 ? '+' : '-'} ${kAbs || '1'}\\${g} x = 0$`.replace(' 1\\', ' \\'),
          `$\\${g} x\\,(2\\${h} x ${k < 0 ? '+' : '-'} ${kAbs || '1'}) = 0$`,
          `$\\${g} x = 0$ gives ${solsText(s1)}.`,
          `$\\${h} x = ${exactTex(v)}$ gives ${solsText(s2)}.`,
          `The solutions are ${solsText(sols)}.`,
        ],
        answerDisplay: listAngles(sols),
      };
    }

    if (kind === 'logEq') {
      if (rng.chance(0.5)) {
        // ln x + ln(x + a) = ln b, b = r(r + a)
        const r = rng.int(1, 6);
        const a = rng.int(1, 6);
        const b = r * (r + a);
        const other = -(r + a);
        return {
          prompt: `Solve $\\ln x + \\ln(x + ${a}) = \\ln ${b}$.`,
          parts: [part({ kind: 'numbers', values: [r] }, { label: '$x =$', placeholder: 'e.g. 4' })],
          hints: ['Combine the left side with the product law, then use the fact that $\\ln M = \\ln N$ means $M = N$.', 'Solve the quadratic, then check each root: the argument of every logarithm must be positive.'],
          solution: [
            `$\\ln(x(x + ${a})) = \\ln ${b}$, so $x^2 + ${a}x = ${b}$.`,
            `$x^2 + ${a}x - ${b} = 0$, so $(x - ${r})(x + ${r + a}) = 0$.`,
            `$x = ${r}$ or $x = ${other}$.`,
            `Reject $x = ${other}$: $\\ln(${other})$ is undefined.`,
            `The solution is $x = ${r}$.`,
          ],
        };
      }
      // ln(x + p) - ln(x - q) = ln k  ->  x + p = k(x - q)  ->  x = (p + kq)/(k - 1)
      const { p, q, k } = retry(
        () => ({ p: rng.int(1, 12), q: rng.int(1, 6), k: rng.int(2, 5) }),
        (o) => (o.p + o.k * o.q) % (o.k - 1) === 0,
      );
      const x = (p + k * q) / (k - 1);
      return {
        prompt: `Solve $\\ln(x + ${p}) - \\ln(x - ${q}) = \\ln ${k}$.`,
        parts: [part({ kind: 'numbers', values: [x] }, { label: '$x =$', placeholder: 'e.g. 4' })],
        hints: ['Use the quotient law to write the left side as one logarithm.', 'If $\\ln M = \\ln N$ then $M = N$. Check that your answer keeps both arguments positive.'],
        solution: [
          `$\\ln\\left(\\dfrac{x + ${p}}{x - ${q}}\\right) = \\ln ${k}$, so $\\dfrac{x + ${p}}{x - ${q}} = ${k}$.`,
          `$x + ${p} = ${k}x - ${k * q}$, so $${k - 1 === 1 ? '' : k - 1}x = ${p + k * q}$.`,
          `$x = ${x}$`,
          `Check: $x + ${p} = ${x + p} > 0$ and $x - ${q} = ${x - q} > 0$ ✓`,
          `The solution is $x = ${x}$.`,
        ],
      };
    }

    if (kind === 'expQuad') {
      // e^{2x} - (m + n) e^x + mn = 0 with roots e^x = m, n (n may be negative)
      const [m, n] = retry(
        () => [rng.int(1, 7), rng.pick([2, 3, 4, 5, 6, -1, -2, -3, -4])] as const,
        ([m, n]) => m !== n && m + n !== 0,
      );
      const B = -(m + n);
      const C = m * n;
      const roots = [m, n].filter((r) => r > 0).sort((p, q) => p - q).map((r) => Math.log(r));
      const steps = [
        `Let $u = e^x$, so $e^{2x} = u^2$: $${poly([[1, 'u^2'], [B, 'u'], [C, '']])} = 0$.`,
        `Factor: $(u ${pm(-m)})(u ${pm(-n)}) = 0$, so $u = ${m}$ or $u = ${n}$.`,
      ];
      for (const r of [m, n].sort((p, q) => p - q)) {
        if (r < 0) steps.push(`$e^x = ${r}$ has no solution, because $e^x > 0$ for every $x$.`);
        else if (r === 1) steps.push(`$e^x = 1$ gives $x = \\ln 1 = 0$.`);
        else steps.push(`$e^x = ${r}$ gives $x = \\ln ${r} \\approx ${fmtFixed(Math.log(r), 3)}$.`);
      }
      return {
        prompt: `Solve $e^{2x} ${pm(B)}e^x ${pm(C)} = 0$. Round each solution to the nearest thousandth, separated by commas.`.replace('+ 1e^x', '+ e^x').replace('- 1e^x', '- e^x'),
        parts: [part({ kind: 'numbers', values: roots, decimals: 3 }, { label: '$x =$', placeholder: 'e.g. 0.693, 1.099' })],
        hints: ['$e^{2x} = (e^x)^2$, so the equation is a quadratic in $e^x$. Let $u = e^x$.', 'Factor, then solve $e^x = u$ with $x = \\ln u$. Remember that $e^x$ is always positive.'],
        solution: [...steps, `The solution${roots.length > 1 ? 's are' : ' is'} ${roots.map((r) => `$x \\approx ${fmtFixed(r, 3)}$`).join(' and ')}.`],
        calculator: true,
      };
    }

    // expContext: Q(t) = Q0 e^{kt}; when does Q reach a target?
    const c = rng.pick(EXP_CONTEXTS);
    const name = rng.pick(NAMES);
    const { q0, k, target } = retry(
      () => {
        const q0 = rng.pick(c.p0 as readonly number[]);
        const k = rng.pick(c.k as readonly number[]);
        const ratio = c.growth ? rng.pick([1.5, 2, 2.5, 3, 4, 5]) : rng.pick([0.5, 0.25, 0.4, 0.3, 0.1, 0.2]);
        return { q0, k, target: Math.round(q0 * ratio) };
      },
      (o) => safeRound(Math.log(o.target / o.q0) / o.k, 1),
    );
    const t = Math.log(target / q0) / k;
    return {
      prompt: `${c.what} is modelled by $${c.q}(t) = ${fmtGroupTex(q0)}e^{${fmt(k)}t}$, where $t$ is the time in ${c.tUnit}. ${name} wants to know when $${c.q}$ will ${c.growth ? 'reach' : 'drop to'} ${fmtGroup(target)} ${c.unit}. Find $t$ to the nearest tenth.`,
      parts: [numPart(t, { label: '$t =$', decimals: 1, suffix: c.tShort })],
      hints: [`Set $${fmtGroupTex(q0)}e^{${fmt(k)}t} = ${fmtGroupTex(target)}$ and divide by $${fmtGroupTex(q0)}$ first.`, 'Take $\\ln$ of both sides, then divide by the rate constant.'],
      solution: [
        `$${fmtGroupTex(q0)}e^{${fmt(k)}t} = ${fmtGroupTex(target)}$`,
        `$e^{${fmt(k)}t} = \\dfrac{${fmtGroupTex(target)}}{${fmtGroupTex(q0)}}${Math.abs((target / q0) * 100 - Math.round((target / q0) * 100)) < 1e-9 ? ` = ${fmt(target / q0)}` : ''}$`,
        `$${fmt(k)}t = \\ln\\left(\\dfrac{${fmtGroupTex(target)}}{${fmtGroupTex(q0)}}\\right)$`,
        `$t = \\dfrac{\\ln(${fmtGroupTex(target)}/${fmtGroupTex(q0)})}{${fmt(k)}} \\approx ${fmtFixed(t, 1)}$`,
        `$${c.q}$ ${c.growth ? 'reaches' : 'drops to'} ${fmtGroup(target)} ${c.unit} after about ${fmtFixed(t, 1)} ${c.tUnit}.`,
      ],
      calculator: true,
    };
  },
});

export const REVIEW_SKILLS: SkillDef[] = [fnRev, trigLog];
