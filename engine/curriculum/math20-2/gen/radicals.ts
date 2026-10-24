/** Math 20-2 Unit 4 — Radicals (NL3, NL4). */
import { type GenOutput, numPart, part, skill } from '../../helpers.ts';
import { type Frac, frac, fracLatex, fracValue, fmt, fmtFixed, gcd, paren, plusMinus, polyString, radicalSplit } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Choice, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

/** Coefficient prefix: 1 -> '', -1 -> '-', 3 -> '3'. */
const co = (k: number) => (k === 1 ? '' : k === -1 ? '-' : `${k}`);

/** k√m in LaTeX; m = 1 prints k alone. */
function rad(k: number, m: number): string {
  if (m === 1) return `${k}`;
  return `${co(k)}\\sqrt{${m}}`;
}

/** k√m typed the way a student would. */
function radText(k: number, m: number): string {
  if (m === 1) return `${k}`;
  return `${co(k)}sqrt(${m})`;
}

/** An answer box for a single term a√b in simplest form. */
function radPart(k: number, m: number, extra: Omit<Part, 'answer'> = {}): Part {
  return part({ kind: 'expression', expected: radText(k, m), form: 'simplified-radical' }, { placeholder: 'e.g. 3√5', ...extra });
}

/** Number boxes for the coefficients of a requested form (fractions allowed). */
function coefParts(names: string[], values: number[]): Part[] {
  return names.map((n, i) => numPart(values[i], { label: `$${n} =$`, exact: false }));
}

/** "√n = √(s²)·√r = s√r" with the perfect-square factor named. */
function simplifySteps(n: number): { k: number; r: number; steps: string[] } {
  const { outside: k, inside: r } = radicalSplit(n);
  if (k === 1) return { k, r, steps: [`$\\sqrt{${n}}$ has no perfect-square factor other than $1$, so it is already in simplest form.`] };
  return {
    k,
    r,
    steps: [`The largest perfect-square factor of $${n}$ is $${k * k}$: $${n} = ${k * k} \\times ${r}$.`, `$\\sqrt{${n}} = \\sqrt{${k * k}}\\,\\sqrt{${r}} = ${rad(k, r)}$`],
  };
}

const SOLVE_NOTE = 'Enter all solutions separated by commas, or type "no solution" if there are none.';

function solutionsPart(values: number[]): Part {
  return { answer: { kind: 'numbers', values }, placeholder: 'e.g. 12 or no solution' };
}

function finalSolutions(values: number[]): string {
  if (!values.length) return 'The only candidate is extraneous, so the equation has **no solution**.';
  return values.length === 1 ? `The solution is $x = ${values[0]}$.` : `The solutions are ${values.map((v) => `$x = ${v}$`).join(' and ')}.`;
}

/** True when v is not within a whisker of a rounding boundary at this many decimals. */
function clearOfBoundary(v: number, decimals: number): boolean {
  const s = Math.abs(v) * 10 ** decimals;
  return Math.abs(s - Math.floor(s) - 0.5) > 0.04;
}

const NAMES = ['Amara', 'Jonah', 'Priya', 'Mateo', 'Keira', 'Liam', 'Nadia', 'Owen', 'Sakura', 'Tyrell', 'Ava', 'Dev', 'Hana', 'Rowan'];

// ---------------------------------------------------------------------------
// 4.1 Mixed and entire radicals
// ---------------------------------------------------------------------------

function toMixed(rng: Rng): GenOutput {
  let s = 2;
  let r = 3;
  for (let i = 0; i < 100; i++) {
    s = rng.int(2, 6);
    r = rng.pick([2, 3, 5, 6, 7, 10, 11, 13]);
    if (s * s * r < 100) break;
  }
  const n = s * s * r;
  return {
    prompt: `Write $\\sqrt{${n}}$ as a mixed radical in simplest form.`,
    parts: [radPart(s, r)],
    hints: [`List the perfect squares $4, 9, 16, 25, 36, \\ldots$ and find the largest one that divides $${n}$.`, `Write $\\sqrt{${n}}$ as $\\sqrt{\\text{perfect square}} \\times \\sqrt{\\text{what is left}}$.`],
    solution: [...simplifySteps(n).steps, `So $\\sqrt{${n}} = ${rad(s, r)}$.`],
    answerDisplay: `$${rad(s, r)}$`,
  };
}

function toEntire(rng: Rng): GenOutput {
  let k = 2;
  let m = 3;
  for (let i = 0; i < 100; i++) {
    k = rng.int(2, 6);
    m = rng.pick([2, 3, 5, 6, 7, 10, 11]);
    if (k * k * m < 100) break;
  }
  const n = k * k * m;
  return {
    prompt: `Write $${k}\\sqrt{${m}}$ as an entire radical.`,
    parts: [part({ kind: 'expression', expected: `sqrt(${n})`, form: 'entire-radical' }, { placeholder: 'e.g. √45' })],
    hints: [`An entire radical has nothing outside the radical sign. Write $${k}$ as a square root first.`, `$${k} = \\sqrt{${k * k}}$, and $\\sqrt{a}\\,\\sqrt{b} = \\sqrt{ab}$.`],
    solution: [`$${k} = \\sqrt{${k * k}}$`, `$${k}\\sqrt{${m}} = \\sqrt{${k * k}}\\,\\sqrt{${m}} = \\sqrt{${k * k} \\times ${m}}$`, `So $${k}\\sqrt{${m}} = \\sqrt{${n}}$.`],
    answerDisplay: `$\\sqrt{${n}}$`,
  };
}

function coefMixed(rng: Rng): GenOutput {
  let s = 2;
  let r = 3;
  for (let i = 0; i < 100; i++) {
    s = rng.int(2, 6);
    r = rng.pick([2, 3, 5, 6, 7, 10]);
    if (s * s * r < 100) break;
  }
  const n = s * s * r;
  const c = rng.pick([2, 3, 4, 5, -2, -3]);
  const given = `${c}\\sqrt{${n}}`;
  return {
    prompt: `Simplify $${given}$. Write it as a mixed radical in simplest form.`,
    parts: [radPart(c * s, r)],
    hints: [`Simplify $\\sqrt{${n}}$ first.`, `Then multiply the result by $${c}$.`],
    solution: [...simplifySteps(n).steps, `$${given} = ${paren(c)} \\times ${rad(s, r)} = ${rad(c * s, r)}$`],
    answerDisplay: `$${rad(c * s, r)}$`,
  };
}

function varMixed(rng: Rng): GenOutput {
  const v = rng.pick(['x', 'a', 'y', 'n']);
  let s = 2;
  let r = 3;
  for (let i = 0; i < 100; i++) {
    s = rng.int(2, 7);
    r = rng.pick([2, 3, 5, 6, 7]);
    if (s * s * r <= 200) break;
  }
  const c = s * s * r;
  return {
    prompt: `Assume $${v} \\ge 0$. Write $\\sqrt{${c}${v}^2}$ as a mixed radical $A\\sqrt{B}$ in simplest form, then enter $A$ and $B$.`,
    parts: [
      part({ kind: 'expression', expected: `${s}*${v}`, positiveVars: true }, { label: '$A =$', placeholder: 'e.g. 4x' }),
      part({ kind: 'expression', expected: `${r}`, positiveVars: true }, { label: '$B =$', placeholder: 'e.g. 3' }),
    ],
    hints: [`$\\sqrt{${v}^2} = ${v}$ when $${v} \\ge 0$, so $${v}^2$ is a perfect square.`, `Find the largest perfect square that divides $${c}$.`],
    solution: [
      `$${c}${v}^2 = ${s * s}${v}^2 \\times ${r}$, and $${s * s}${v}^2 = (${s}${v})^2$ is a perfect square.`,
      `$\\sqrt{${c}${v}^2} = \\sqrt{${s * s}${v}^2}\\,\\sqrt{${r}} = ${s}${v}\\sqrt{${r}}$`,
      `So $A = ${s}${v}$ and $B = ${r}$.`,
    ],
    answerDisplay: `$${s}${v}\\sqrt{${r}}$`,
  };
}

function varEntire(rng: Rng): GenOutput {
  const v = rng.pick(['x', 'a', 'y', 'n']);
  const k = rng.int(2, 7);
  const m = rng.pick([2, 3, 5, 6, 7]);
  const given = `${k}${v}\\sqrt{${m}}`;
  return {
    prompt: `Assume $${v} \\ge 0$. Write $${given}$ as an entire radical.`,
    parts: [part({ kind: 'expression', expected: `sqrt(${k * k * m}*${v}^2)`, form: 'entire-radical', positiveVars: true }, { placeholder: 'e.g. √(12x^2)' })],
    hints: [`Write $${k}${v}$ as a square root.`, `$${k}${v} = \\sqrt{${k * k}${v}^2}$ because $${v} \\ge 0$.`],
    solution: [`$${k}${v} = \\sqrt{${k * k}${v}^2}$`, `$${given} = \\sqrt{${k * k}${v}^2}\\,\\sqrt{${m}} = \\sqrt{${k * k * m}${v}^2}$`, `So $${given} = \\sqrt{${k * k * m}${v}^2}$.`],
    answerDisplay: `$\\sqrt{${k * k * m}${v}^2}$`,
  };
}

function simplifyContext(rng: Rng): GenOutput {
  if (rng.chance(0.5)) {
    const thing = rng.pick([
      { what: 'square patio', unit: 'm' },
      { what: 'square quilt block', unit: 'cm' },
      { what: 'square vegetable garden', unit: 'm' },
      { what: 'square floor tile', unit: 'cm' },
      { what: 'square deck', unit: 'ft' },
    ]);
    let s = 2;
    let r = 3;
    for (let i = 0; i < 100; i++) {
      s = rng.int(2, 10);
      r = rng.pick([2, 3, 5, 6, 7]);
      if (s * s * r <= 500 && s * s * r >= 20) break;
    }
    const A = s * s * r;
    const name = rng.pick(NAMES);
    return {
      prompt: `${name} is planning a ${thing.what} with an area of $${A}$ ${thing.unit}². Write the exact side length as a mixed radical in simplest form.`,
      parts: [radPart(s, r, { suffix: thing.unit })],
      hints: ['For a square, area $= s^2$, so the side length is $s = \\sqrt{\\text{area}}$.', `Simplify $\\sqrt{${A}}$ by taking out the largest perfect-square factor.`],
      solution: [`Side length $= \\sqrt{${A}}$`, ...simplifySteps(A).steps, `The exact side length is $${rad(s, r)}$ ${thing.unit}.`],
      answerDisplay: `$${rad(s, r)}$ ${thing.unit}`,
    };
  }
  for (let t = 0; t < 200; t++) {
    const a = rng.int(2, 12);
    const b = rng.int(2, 12);
    const n = a * a + b * b;
    const { outside: k, inside: r } = radicalSplit(n);
    if (k < 2 || r === 1 || a >= b) continue;
    const thing = rng.pick([
      { text: `A rectangular gate is $${a}$ ft wide and $${b}$ ft tall. A diagonal brace runs from one corner to the opposite corner.`, ask: 'the brace', unit: 'ft' },
      { text: `A rectangular raised garden bed is $${a}$ m by $${b}$ m. A drip line runs straight across it from corner to corner.`, ask: 'the drip line', unit: 'm' },
      { text: `A carpenter is squaring a wall frame that is $${a}$ ft by $${b}$ ft by measuring its diagonal.`, ask: 'the diagonal', unit: 'ft' },
      { text: `A rectangular poster is $${a}$ dm by $${b}$ dm.`, ask: 'its diagonal', unit: 'dm' },
    ]);
    return {
      prompt: `${thing.text} Use the Pythagorean theorem to find the exact length of ${thing.ask}, written as a mixed radical in simplest form.`,
      parts: [radPart(k, r, { suffix: thing.unit })],
      hints: ['The diagonal is the hypotenuse of a right triangle: $d = \\sqrt{a^2 + b^2}$.', `Simplify $\\sqrt{${n}}$ by taking out the largest perfect-square factor.`],
      solution: [`$d = \\sqrt{${a}^2 + ${b}^2} = \\sqrt{${a * a} + ${b * b}} = \\sqrt{${n}}$`, ...simplifySteps(n).steps, `The exact length is $${rad(k, r)}$ ${thing.unit}.`],
      answerDisplay: `$${rad(k, r)}$ ${thing.unit}`,
    };
  }
  throw new Error('simplifyContext failed');
}

const simplify = skill({
  id: 'm202-radical-simplify',
  name: 'Mixed and entire radicals',
  description: 'Change between mixed and entire radicals, with numbers and simple variables, and use simplest radical form for exact lengths.',
  outcomes: ['NL3'],
  lessonId: 'm202-4-1',
  gen(rng, d) {
    if (d === 1) return rng.chance(0.6) ? toMixed(rng) : toEntire(rng);
    if (d === 2) {
      const kind = rng.weighted([
        ['coef', 0.4],
        ['var', 0.35],
        ['entire', 0.25],
      ] as const);
      return kind === 'coef' ? coefMixed(rng) : kind === 'var' ? varMixed(rng) : varEntire(rng);
    }
    return simplifyContext(rng);
  },
});

// ---------------------------------------------------------------------------
// Ordering
// ---------------------------------------------------------------------------

interface OrderVal {
  md: string;
  key: number;
  step: string;
}

function orderPart(vals: OrderVal[], desc = false): Part {
  const choices: Choice[] = vals.map((v, i) => ({ id: 'abcdefg'[i], md: v.md }));
  const sorted = [...vals].sort((a, b) => (desc ? b.key - a.key : a.key - b.key));
  return { answer: { kind: 'order', items: choices, correctOrder: sorted.map((v) => choices[vals.indexOf(v)].id) } };
}

function sortedList(vals: OrderVal[], desc = false): string {
  return [...vals]
    .sort((a, b) => (desc ? b.key - a.key : a.key - b.key))
    .map((v) => v.md)
    .join(', ');
}

/** Mixed radicals whose order differs from the order of their coefficients. */
function pickMixed(rng: Rng, count: number, maxN: number, used: Set<number>): Array<{ k: number; m: number }> | null {
  const out: Array<{ k: number; m: number }> = [];
  for (let i = 0; i < 200 && out.length < count; i++) {
    const k = rng.int(2, 7);
    const m = rng.pick([2, 3, 5, 6, 7, 10, 11, 13]);
    const N = k * k * m;
    if (N > maxN || used.has(N) || out.some((x) => x.k === k)) continue;
    used.add(N);
    out.push({ k, m });
  }
  if (out.length < count) return null;
  const byK = [...out].sort((a, b) => a.k - b.k).map((x) => x.k * x.k * x.m);
  return byK.join() === [...byK].sort((a, b) => a - b).join() ? null : out;
}

function mixedVal(k: number, m: number, unit = ''): OrderVal {
  const N = k * k * m;
  return { md: `$${rad(k, m)}$${unit}`, key: N, step: `$${rad(k, m)} = \\sqrt{${k * k} \\times ${m}} = \\sqrt{${N}}$` };
}

function order3(rng: Rng): GenOutput {
  for (let t = 0; t < 200; t++) {
    const used = new Set<number>();
    const ms = pickMixed(rng, 3, 150, used);
    if (!ms) continue;
    const vals = rng.shuffle(ms.map((x) => mixedVal(x.k, x.m)));
    return {
      prompt: 'Without using a calculator, arrange these mixed radicals from **least to greatest**.',
      parts: [orderPart(vals)],
      hints: ['A bigger coefficient does not always mean a bigger number. Rewrite each mixed radical as an entire radical.', 'Then compare the radicands: the larger the radicand, the larger the number.'],
      solution: [...vals.map((v) => v.step), `From least to greatest: ${sortedList(vals)}.`],
    };
  }
  throw new Error('order3 failed');
}

function order4(rng: Rng): GenOutput {
  for (let t = 0; t < 200; t++) {
    const used = new Set<number>();
    const ms = pickMixed(rng, 2, 180, used);
    if (!ms) continue;
    const lo = Math.min(...used);
    const hi = Math.max(...used);
    const wholes: number[] = [];
    for (let w = 2; w * w < hi + 30; w++) if (w * w > lo - 30 && !used.has(w * w)) wholes.push(w);
    if (!wholes.length) continue;
    const w = rng.pick(wholes);
    used.add(w * w);
    let N = 0;
    for (let i = 0; i < 50 && !N; i++) {
      const c = rng.int(Math.max(2, lo - 20), hi + 20);
      if (!used.has(c) && !Number.isInteger(Math.sqrt(c))) N = c;
    }
    if (!N) continue;
    const desc = rng.chance(0.5);
    const vals = rng.shuffle([...ms.map((x) => mixedVal(x.k, x.m)), { md: `$${w}$`, key: w * w, step: `$${w} = \\sqrt{${w * w}}$` }, { md: `$\\sqrt{${N}}$`, key: N, step: `$\\sqrt{${N}}$ is already an entire radical.` }]);
    return {
      prompt: `Without using a calculator, arrange these numbers from **${desc ? 'greatest to least' : 'least to greatest'}**.`,
      parts: [orderPart(vals, desc)],
      hints: ['Write every number as an entire radical. A whole number $w$ equals $\\sqrt{w^2}$.', 'Compare the radicands.'],
      solution: [...vals.map((v) => v.step), `From ${desc ? 'greatest to least' : 'least to greatest'}: ${sortedList(vals, desc)}.`],
    };
  }
  throw new Error('order4 failed');
}

function orderContext(rng: Rng): GenOutput {
  for (let t = 0; t < 300; t++) {
    const used = new Set<number>();
    const ms = pickMixed(rng, 3, 160, used);
    if (!ms) continue;
    const lo = Math.min(...used);
    const hi = Math.max(...used);
    // A tape-measure reading to one decimal place, compared through its square.
    const dec = rng.int(Math.ceil(Math.sqrt(lo) * 10) + 1, Math.floor(Math.sqrt(hi) * 10) - 1) / 10;
    if (!Number.isFinite(dec) || Number.isInteger(dec) || dec * dec < lo || dec * dec > hi || used.has(dec * dec)) continue;
    const ctx = rng.pick([
      { intro: 'Four teams in a design class built ramps for a model-car test. The ramp lengths are', unit: ' m', short: 'shortest', long: 'longest' },
      { intro: 'A landscaper is comparing four pieces of edging. Their lengths are', unit: ' m', short: 'shortest', long: 'longest' },
      { intro: 'Four square photo prints have these side lengths:', unit: ' cm', short: 'smallest', long: 'largest' },
    ]);
    const vals = rng.shuffle([...ms.map((x) => mixedVal(x.k, x.m, ctx.unit)), { md: `$${fmt(dec)}$${ctx.unit}`, key: dec * dec, step: `$${fmt(dec)}^2 = ${fmt(dec * dec)}$, so $${fmt(dec)} = \\sqrt{${fmt(dec * dec)}}$` }]);
    const desc = rng.chance(0.4);
    return {
      prompt: `${ctx.intro} ${vals.map((v) => v.md).join(', ')} (one was measured with a tape measure). Without using a calculator, arrange them from **${desc ? `${ctx.long} to ${ctx.short}` : `${ctx.short} to ${ctx.long}`}**.`,
      parts: [orderPart(vals, desc)],
      hints: ['Write each length as an entire radical so they can be compared.', 'For the decimal, square it: if $d^2 = n$, then $d = \\sqrt{n}$.'],
      solution: [...vals.map((v) => v.step), `From ${desc ? `${ctx.long} to ${ctx.short}` : `${ctx.short} to ${ctx.long}`}: ${sortedList(vals, desc)}.`],
    };
  }
  throw new Error('orderContext failed');
}

const order = skill({
  id: 'm202-radical-order',
  name: 'Ordering radicals',
  description: 'Order radicals, whole numbers and decimals by writing them as entire radicals, including in context.',
  outcomes: ['NL3'],
  lessonId: 'm202-4-1',
  gen(rng, d) {
    if (d === 1) return order3(rng);
    if (d === 2) return order4(rng);
    return orderContext(rng);
  },
});

// ---------------------------------------------------------------------------
// 4.2 Adding and subtracting
// ---------------------------------------------------------------------------

function addLike(rng: Rng): GenOutput {
  if (rng.chance(0.55)) {
    const m = rng.pick([2, 3, 5, 6, 7, 10, 11]);
    for (let t = 0; t < 100; t++) {
      const cs = [rng.int(1, 9), rng.nonZero(-9, 9), rng.nonZero(-9, 9)];
      const total = cs.reduce((a, b) => a + b, 0);
      if (total === 0) continue;
      const expr = polyString(cs.map((c) => [c, `\\sqrt{${m}}`]));
      return {
        prompt: `Simplify $${expr}$.`,
        parts: [radPart(total, m)],
        hints: [`All the terms are like radicals: they all contain $\\sqrt{${m}}$.`, 'Add and subtract the coefficients; the radical stays the same, just as $4x + 2x = 6x$.'],
        solution: [`Combine like radicals the same way you combine like terms: $(${polyString(cs.map((c) => [c, '']))})\\sqrt{${m}}$`, `$= ${rad(total, m)}$`],
        answerDisplay: `$${rad(total, m)}$`,
      };
    }
  }
  for (let t = 0; t < 100; t++) {
    const [m1, m2] = rng.pick([
      [2, 3],
      [2, 5],
      [3, 5],
      [2, 7],
      [3, 7],
      [5, 6],
    ]);
    const terms = rng.shuffle([m1, m1, m2, m2].map((m) => ({ m, c: rng.nonZero(-8, 8) })));
    if (terms[0].c < 0) terms[0].c = -terms[0].c;
    const a = terms.filter((x) => x.m === m1).reduce((s, x) => s + x.c, 0);
    const b = terms.filter((x) => x.m === m2).reduce((s, x) => s + x.c, 0);
    if (a === 0 || b === 0) continue;
    const expr = polyString(terms.map((x) => [x.c, `\\sqrt{${x.m}}`]));
    const answer = polyString([
      [a, `\\sqrt{${m1}}`],
      [b, `\\sqrt{${m2}}`],
    ]);
    const group = (m: number) => polyString(terms.filter((x) => x.m === m).map((x) => [x.c, '']));
    return {
      prompt: `Simplify $${expr}$. Write your answer in the form $a\\sqrt{${m1}} + b\\sqrt{${m2}}$.`,
      parts: coefParts(['a', 'b'], [a, b]),
      hints: [`Only like radicals can be combined: $\\sqrt{${m1}}$ terms with $\\sqrt{${m1}}$ terms, and $\\sqrt{${m2}}$ terms with $\\sqrt{${m2}}$ terms.`, 'Add the coefficients within each group.'],
      solution: [`Group like radicals: $(${group(m1)})\\sqrt{${m1}} + (${group(m2)})\\sqrt{${m2}}$`, `$= ${answer}$, so $a = ${a}$ and $b = ${b}$.`],
      answerDisplay: `$${answer}$`,
    };
  }
  throw new Error('addLike failed');
}

function addSimplifyFirst(rng: Rng): GenOutput {
  for (let t = 0; t < 300; t++) {
    const m = rng.pick([2, 3, 5, 6, 7]);
    const s1 = rng.int(1, 5);
    const s2 = rng.int(1, 5);
    const c1 = rng.int(1, 4);
    const c2 = rng.int(1, 4) * rng.sign();
    const total = c1 * s1 + c2 * s2;
    if (s1 === s2 || (s1 === 1 && s2 === 1) || (c1 === 1 && Math.abs(c2) === 1) || total === 0 || s1 * s1 * m > 150 || s2 * s2 * m > 150) continue;
    const expr = polyString([
      [c1, `\\sqrt{${s1 * s1 * m}}`],
      [c2, `\\sqrt{${s2 * s2 * m}}`],
    ]);
    const simple = polyString([
      [c1 * s1, `\\sqrt{${m}}`],
      [c2 * s2, `\\sqrt{${m}}`],
    ]);
    const list = [s1, s2]
      .filter((s) => s > 1)
      .map((s) => `$\\sqrt{${s * s * m}} = \\sqrt{${s * s}}\\,\\sqrt{${m}} = ${s}\\sqrt{${m}}$`)
      .join(' and ');
    return {
      prompt: `Simplify $${expr}$. Write your answer as a mixed radical in simplest form.`,
      parts: [radPart(total, m)],
      hints: ['The radicals are not like radicals yet. Simplify each one first.', `After simplifying, both terms are multiples of $\\sqrt{${m}}$.`],
      solution: [`Simplify: ${list}.`, `$${expr} = ${simple}$`, `Combine like radicals: $${rad(total, m)}$`],
      answerDisplay: `$${rad(total, m)}$`,
    };
  }
  throw new Error('addSimplifyFirst failed');
}

function addPerimeter(rng: Rng): GenOutput {
  const unit = rng.pick(['cm', 'm']);
  for (let t = 0; t < 300; t++) {
    const m = rng.pick([2, 3, 5, 6, 7]);
    if (rng.chance(0.5)) {
      const [s1, s2, s3] = [rng.int(1, 6), rng.int(1, 6), rng.int(1, 6)];
      if (s1 + s2 <= s3 || s1 + s3 <= s2 || s2 + s3 <= s1 || new Set([s1, s2, s3]).size < 2 || [s1, s2, s3].filter((s) => s > 1).length < 2 || Math.max(s1, s2, s3) ** 2 * m > 200) continue;
      const sides = [s1, s2, s3];
      const total = s1 + s2 + s3;
      const what = rng.pick(['a triangular garden bed', 'a triangular sail', 'a triangular logo', 'a triangular pennant']);
      return {
        prompt: `The sides of ${what} measure $\\sqrt{${s1 * s1 * m}}$ ${unit}, $\\sqrt{${s2 * s2 * m}}$ ${unit} and $\\sqrt{${s3 * s3 * m}}$ ${unit}. Determine the exact perimeter as a mixed radical in simplest form.`,
        parts: [radPart(total, m, { suffix: unit })],
        hints: ['The perimeter is the sum of the three sides. Simplify each radical first.', `Each side is a multiple of $\\sqrt{${m}}$.`],
        solution: [
          `Simplify each side: ${sides.map((s) => `$\\sqrt{${s * s * m}} = ${rad(s, m)}$`).join(', ')}.`,
          `$P = ${sides.map((s) => rad(s, m)).join(' + ')}$`,
          `$P = ${rad(total, m)}$ ${unit}`,
        ],
        answerDisplay: `$${rad(total, m)}$ ${unit}`,
      };
    }
    const s1 = rng.int(2, 6);
    const s2 = rng.int(1, 5);
    if (s1 <= s2 || s1 * s1 * m > 200) continue;
    const total = 2 * (s1 + s2);
    const what = rng.pick(['a rectangular picture frame', 'a rectangular dog run', 'a rectangular patio', 'a rectangular flower bed']);
    return {
      prompt: `${what[0].toUpperCase()}${what.slice(1)} is $\\sqrt{${s1 * s1 * m}}$ ${unit} long and $\\sqrt{${s2 * s2 * m}}$ ${unit} wide. Determine its exact perimeter as a mixed radical in simplest form.`,
      parts: [radPart(total, m, { suffix: unit })],
      hints: ['Perimeter of a rectangle: $P = 2\\ell + 2w$. Simplify each radical first.', `Both dimensions are multiples of $\\sqrt{${m}}$.`],
      solution: [
        `Simplify: $\\sqrt{${s1 * s1 * m}} = ${rad(s1, m)}$${s2 > 1 ? ` and $\\sqrt{${s2 * s2 * m}} = ${rad(s2, m)}$` : ''}.`,
        `$P = 2\\left(${rad(s1, m)}\\right) + 2\\left(${rad(s2, m)}\\right) = ${rad(2 * s1, m)} + ${rad(2 * s2, m)}$`,
        `$P = ${rad(total, m)}$ ${unit}`,
      ],
      answerDisplay: `$${rad(total, m)}$ ${unit}`,
    };
  }
  throw new Error('addPerimeter failed');
}

const add = skill({
  id: 'm202-radical-add',
  name: 'Adding and subtracting radicals',
  description: 'Add and subtract like radicals, simplifying first when needed, including perimeters in exact form.',
  outcomes: ['NL3'],
  lessonId: 'm202-4-2',
  gen(rng, d) {
    if (d === 1) return addLike(rng);
    if (d === 2) return addSimplifyFirst(rng);
    return addPerimeter(rng);
  },
});

// ---------------------------------------------------------------------------
// Multiplying
// ---------------------------------------------------------------------------

function mulBasic(rng: Rng): GenOutput {
  if (rng.chance(0.55)) {
    for (let t = 0; t < 300; t++) {
      const a = rng.int(2, 20);
      const b = rng.int(2, 20);
      const n = a * b;
      const { outside: k, inside: r } = radicalSplit(n);
      if (a === b || Number.isInteger(Math.sqrt(a)) || Number.isInteger(Math.sqrt(b)) || k < 2 || n > 300) continue;
      const simp = simplifySteps(n);
      return {
        prompt: `Multiply and simplify: $\\sqrt{${a}} \\times \\sqrt{${b}}$`,
        parts: [radPart(k, r)],
        hints: ['$\\sqrt{a} \\times \\sqrt{b} = \\sqrt{ab}$ for $a, b \\ge 0$.', `Multiply to get $\\sqrt{${n}}$, then simplify.`],
        solution: [`$\\sqrt{${a}} \\times \\sqrt{${b}} = \\sqrt{${a} \\times ${b}} = \\sqrt{${n}}$`, ...(r === 1 ? [`$\\sqrt{${n}} = ${k}$ because $${k}^2 = ${n}$.`] : simp.steps), `So the product is $${rad(k, r)}$.`],
        answerDisplay: `$${rad(k, r)}$`,
      };
    }
  }
  const [m, n] = rng.pick([
    [2, 3],
    [2, 5],
    [3, 5],
    [2, 7],
    [3, 7],
    [5, 7],
    [3, 2],
    [5, 3],
    [7, 2],
  ]);
  const a = rng.int(2, 6);
  const b = rng.int(2, 6) * (rng.chance(0.25) ? -1 : 1);
  return {
    prompt: `Multiply: $\\left(${rad(a, m)}\\right)\\left(${rad(b, n)}\\right)$`,
    parts: [radPart(a * b, m * n)],
    hints: ['Multiply the coefficients together and the radicands together.', '$\\left(a\\sqrt{m}\\right)\\left(b\\sqrt{n}\\right) = ab\\sqrt{mn}$'],
    solution: [`$\\left(${rad(a, m)}\\right)\\left(${rad(b, n)}\\right) = (${a} \\times ${paren(b)})\\sqrt{${m} \\times ${n}}$`, `$= ${rad(a * b, m * n)}$`],
    answerDisplay: `$${rad(a * b, m * n)}$`,
  };
}

function mulDistribute(rng: Rng): GenOutput {
  if (rng.chance(0.5)) {
    // √m(a + √n) where √(mn) simplifies to k√r
    const [m, n] = rng.pick([
      [3, 6],
      [2, 6],
      [2, 10],
      [5, 10],
      [3, 15],
      [5, 15],
      [2, 14],
      [7, 14],
      [6, 10],
    ]);
    const { outside: k, inside: r } = radicalSplit(m * n);
    const a = rng.nonZero(-7, 7);
    const s = rng.sign();
    const inner = polyString([
      [a, ''],
      [s, `\\sqrt{${n}}`],
    ]);
    const [lo, hi] = m < r ? [m, r] : [r, m];
    const coefOf = (rr: number) => (rr === m ? a : s * k);
    const answer = polyString([
      [coefOf(lo), `\\sqrt{${lo}}`],
      [coefOf(hi), `\\sqrt{${hi}}`],
    ]);
    return {
      prompt: `Expand and simplify $\\sqrt{${m}}\\left(${inner}\\right)$. Write your answer in the form $a\\sqrt{${lo}} + b\\sqrt{${hi}}$.`,
      parts: coefParts(['a', 'b'], [coefOf(lo), coefOf(hi)]),
      hints: ['Multiply $\\sqrt{' + m + '}$ by each term inside the brackets.', `Simplify $\\sqrt{${m * n}}$ at the end.`],
      solution: [
        `Distribute: $\\sqrt{${m}}\\left(${inner}\\right) = ${polyString([
          [a, `\\sqrt{${m}}`],
          [s, `\\sqrt{${m * n}}`],
        ])}$`,
        `$\\sqrt{${m * n}} = \\sqrt{${k * k}}\\,\\sqrt{${r}} = ${rad(k, r)}$`,
        `So the result is $${answer}$: $a = ${coefOf(lo)}$ and $b = ${coefOf(hi)}$.`,
      ],
      answerDisplay: `$${answer}$`,
    };
  }
  // b√m(c + d√m) = bd·m + bc√m
  const m = rng.pick([2, 3, 5, 6, 7]);
  const b = rng.int(2, 5) * (rng.chance(0.3) ? -1 : 1);
  const c = rng.nonZero(-8, 8);
  const dd = rng.pick([1, 1, 2, 3]) * rng.sign();
  const P = b * dd * m;
  const Q = b * c;
  const inner = polyString([
    [c, ''],
    [dd, `\\sqrt{${m}}`],
  ]);
  const answer = polyString([
    [P, ''],
    [Q, `\\sqrt{${m}}`],
  ]);
  return {
    prompt: `Expand and simplify $${rad(b, m)}\\left(${inner}\\right)$. Write your answer in the form $a + b\\sqrt{${m}}$.`,
    parts: coefParts(['a', 'b'], [P, Q]),
    hints: [`Multiply $${rad(b, m)}$ by each term in the brackets.`, `$\\sqrt{${m}} \\times \\sqrt{${m}} = ${m}$.`],
    solution: [
      `Distribute: $${rad(b, m)}\\left(${inner}\\right) = ${polyString([
        [b * c, `\\sqrt{${m}}`],
        [b * dd, `\\left(\\sqrt{${m}}\\right)^2`],
      ])}$`,
      `$= ${polyString([
        [b * c, `\\sqrt{${m}}`],
        [b * dd * m, ''],
      ])}$`,
      `In the requested order: $${answer}$, so $a = ${P}$ and $b = ${Q}$.`,
    ],
    answerDisplay: `$${answer}$`,
  };
}

function mulArea(rng: Rng): GenOutput {
  const unit = rng.pick(['m', 'ft']);
  const kind = rng.pick(['rect', 'square', 'triangle'] as const);
  if (kind === 'triangle') {
    for (let t = 0; t < 200; t++) {
      const [m, n] = rng.pick([
        [6, 2],
        [3, 6],
        [10, 2],
        [5, 10],
        [3, 15],
        [2, 14],
      ]);
      const a = rng.int(1, 3) * 2;
      const b = rng.int(1, 4);
      const { outside: k, inside: r } = radicalSplit(m * n);
      const coef = (a * b * k) / 2;
      const obj = rng.pick([
        { what: 'A triangular glass panel', unit: 'dm' },
        { what: 'A triangular corner shelf', unit: 'dm' },
        { what: 'A triangular patch of lawn', unit: 'm' },
        { what: 'A triangular sail', unit: 'm' },
      ]);
      const what = obj.what;
      const unit = obj.unit;
      return {
        prompt: `${what} has a base of $${rad(a, m)}$ ${unit} and a height of $${rad(b, n)}$ ${unit}. Determine its exact area, in simplest radical form.`,
        parts: [radPart(coef, r, { suffix: `${unit}²` })],
        hints: ['Area of a triangle $= \\dfrac{1}{2}bh$.', 'Multiply the coefficients and the radicands, then simplify.'],
        solution: [
          `$A = \\dfrac{1}{2}\\left(${rad(a, m)}\\right)\\left(${rad(b, n)}\\right) = \\dfrac{${a * b}}{2}\\sqrt{${m * n}} = ${co((a * b) / 2)}\\sqrt{${m * n}}$`,
          `$\\sqrt{${m * n}} = ${rad(k, r)}$`,
          `$A = ${rad(coef, r)}$ ${unit}²`,
        ],
        answerDisplay: `$${rad(coef, r)}$ ${unit}²`,
      };
    }
  }
  for (let t = 0; t < 200; t++) {
    const m = rng.pick([2, 3, 5, 6, 7]);
    const a = rng.int(1, 6);
    const c = kind === 'square' ? a : rng.int(1, 6);
    const s2 = kind === 'square' ? 1 : rng.sign();
    if (kind === 'rect' && (c * c <= m || a === c)) continue;
    const P = a * c + s2 * m;
    const Q = a * s2 + c;
    if (Q === 0 || P <= 0) continue;
    const L = polyString([
      [a, ''],
      [1, `\\sqrt{${m}}`],
    ]);
    const W = polyString([
      [c, ''],
      [s2, `\\sqrt{${m}}`],
    ]);
    const answer = polyString([
      [P, ''],
      [Q, `\\sqrt{${m}}`],
    ]);
    const prompt =
      kind === 'square'
        ? `A square ${rng.pick(['tabletop', 'window', 'sandbox', 'rug'])} has side length $\\left(${L}\\right)$ ${unit}. Determine its exact area in the form $a + b\\sqrt{${m}}$ ${unit}².`
        : `A rectangular ${rng.pick(['garden plot', 'patio', 'banner', 'mural'])} measures $\\left(${L}\\right)$ ${unit} by $\\left(${W}\\right)$ ${unit}. Determine its exact area in the form $a + b\\sqrt{${m}}$ ${unit}².`;
    return {
      prompt,
      parts: coefParts(['a', 'b'], [P, Q]),
      hints: [kind === 'square' ? 'Area $= s^2 = s \\times s$. Write the square as a product of two brackets.' : 'Area $= \\ell w$. Multiply each term in the first bracket by each term in the second.', `$\\sqrt{${m}} \\times \\sqrt{${m}} = ${m}$; then collect like terms.`],
      solution: [
        `$A = \\left(${L}\\right)\\left(${W}\\right)$`,
        `$= ${polyString([
          [a * c, ''],
          [a * s2, `\\sqrt{${m}}`],
          [c, `\\sqrt{${m}}`],
          [s2 * m, ''],
        ])}$`,
        `$= ${answer}$, so $a = ${P}$ and $b = ${Q}$ (area in ${unit}²).`,
      ],
      answerDisplay: `$${answer}$ ${unit}²`,
    };
  }
  throw new Error('mulArea failed');
}

const multiply = skill({
  id: 'm202-radical-multiply',
  name: 'Multiplying radicals',
  description: 'Multiply radicals, use the distributive property with radicals, and find exact areas.',
  outcomes: ['NL3'],
  lessonId: 'm202-4-2',
  gen(rng, d) {
    if (d === 1) return mulBasic(rng);
    if (d === 2) return mulDistribute(rng);
    return mulArea(rng);
  },
});

// ---------------------------------------------------------------------------
// 4.3 Dividing
// ---------------------------------------------------------------------------

function divBasic(rng: Rng): GenOutput {
  for (let t = 0; t < 300; t++) {
    const b = rng.pick([2, 3, 5, 6, 7]);
    const q = rng.int(2, 15);
    if (Number.isInteger(Math.sqrt(q * b)) && rng.chance(0.7)) continue;
    const a = q * b;
    const { outside: k, inside: r } = radicalSplit(q);
    if (a > 200) continue;
    const withCoef = rng.chance(0.5);
    if (!withCoef) {
      if (k === 1 && r !== 1 && rng.chance(0.6)) continue;
      return {
        prompt: `Divide and simplify: $\\dfrac{\\sqrt{${a}}}{\\sqrt{${b}}}$`,
        parts: [radPart(k, r)],
        hints: ['$\\dfrac{\\sqrt{a}}{\\sqrt{b}} = \\sqrt{\\dfrac{a}{b}}$ for $a \\ge 0,\\ b > 0$.', `Divide the radicands, then simplify $\\sqrt{${q}}$ if you can.`],
        solution: [`$\\dfrac{\\sqrt{${a}}}{\\sqrt{${b}}} = \\sqrt{\\dfrac{${a}}{${b}}} = \\sqrt{${q}}$`, ...(r === 1 ? [`$\\sqrt{${q}} = ${k}$`] : k > 1 ? simplifySteps(q).steps : []), `So the quotient is $${rad(k, r)}$.`],
        answerDisplay: `$${rad(k, r)}$`,
      };
    }
    const d = rng.int(2, 5);
    const c = d * rng.int(1, 5);
    const coef = (c / d) * k;
    return {
      prompt: `Divide and simplify: $\\dfrac{${c}\\sqrt{${a}}}{${d}\\sqrt{${b}}}$`,
      parts: [radPart(coef, r)],
      hints: ['Divide the coefficients and divide the radicands: $\\dfrac{a\\sqrt{m}}{b\\sqrt{n}} = \\dfrac{a}{b}\\sqrt{\\dfrac{m}{n}}$.', 'Simplify the radical at the end.'],
      solution: [
        `$\\dfrac{${c}\\sqrt{${a}}}{${d}\\sqrt{${b}}} = \\dfrac{${c}}{${d}}\\sqrt{\\dfrac{${a}}{${b}}} = ${co(c / d)}\\sqrt{${q}}$`,
        ...(k > 1 ? [`$\\sqrt{${q}} = ${rad(k, r)}$`] : []),
        `So the quotient is $${rad(coef, r)}$.`,
      ],
      answerDisplay: `$${rad(coef, r)}$`,
    };
  }
  throw new Error('divBasic failed');
}

function divRationalize(rng: Rng): GenOutput {
  const m = rng.pick([2, 3, 5, 6, 7, 10]);
  const b = rng.pick([1, 1, 1, 2, 3, 4]);
  const n = rng.int(1, 15);
  const denVal = b * m;
  const g = gcd(n, denVal);
  const top = n / g;
  const bottom = denVal / g;
  const given = `\\dfrac{${n}}{${rad(b, m)}}`;
  const answer = bottom === 1 ? rad(top, m) : `\\dfrac{${rad(top, m)}}{${bottom}}`;
  return {
    prompt: `Rationalize the denominator of $${given}$ and simplify. Write the result as a fraction in lowest terms and enter its numerator and denominator (enter $1$ as the denominator if the result is not a fraction).`,
    parts: [radPart(top, m, { label: 'Numerator' }), numPart(bottom, { label: 'Denominator', exact: false })],
    hints: [`Multiply the numerator and the denominator by $\\sqrt{${m}}$. This is the same as multiplying by $1$, so the value does not change.`, `$\\sqrt{${m}} \\times \\sqrt{${m}} = ${m}$. Then reduce the fraction.`],
    solution: [
      `$${given} \\times \\dfrac{\\sqrt{${m}}}{\\sqrt{${m}}} = \\dfrac{${co(n)}\\sqrt{${m}}}{${b === 1 ? '' : `${b} \\times `}${m}}${b === 1 ? '' : ` = \\dfrac{${co(n)}\\sqrt{${m}}}{${denVal}}`}$`,
      ...(g > 1 ? [`Divide the numerator and the denominator by $${g}$: $${answer}$`] : []),
      `So $${given} = ${answer}$.`,
    ],
    answerDisplay: `$${answer}$`,
  };
}

/** Like polyString, but with fractional coefficients. */
function fracSum(terms: Array<[Frac, string]>): string {
  let out = '';
  for (const [c, body] of terms) {
    if (c.n === 0) continue;
    const abs = frac(Math.abs(c.n), c.d);
    const coef = body && abs.n === 1 && abs.d === 1 ? '' : fracLatex(abs);
    if (out === '') out = `${c.n < 0 ? '-' : ''}${coef}${body}`;
    else out += ` ${c.n < 0 ? '-' : '+'} ${coef}${body}`;
  }
  return out || '0';
}

function divBinomialNumerator(rng: Rng): GenOutput {
  for (let t = 0; t < 300; t++) {
    const m = rng.pick([2, 3, 5, 6]);
    const n = rng.pick([2, 3, 5, 6, 7, 10]);
    if (n === m) continue;
    const a = rng.int(1, 12);
    const b = rng.pick([1, 1, 2, 3]) * rng.sign();
    const { outside: o, inside: i } = radicalSplit(n * m);
    const P = frac(a, m);
    const Q = frac(b * o, m);
    if (P.d > 3 || Q.d > 3) continue;
    const top = polyString([
      [a, ''],
      [b, `\\sqrt{${n}}`],
    ]);
    const answer = fracSum([
      [P, `\\sqrt{${m}}`],
      [Q, `\\sqrt{${i}}`],
    ]);
    return {
      prompt: `Simplify $\\dfrac{${top}}{\\sqrt{${m}}}$ so that there is no radical in the denominator. Write your answer in the form $a\\sqrt{${m}} + b\\sqrt{${i}}$, where $a$ and $b$ are rational numbers.`,
      parts: coefParts(['a', 'b'], [fracValue(P), fracValue(Q)]),
      hints: [`Multiply the numerator and the denominator by $\\sqrt{${m}}$. Multiply each term of the numerator.`, `Then divide each term of the numerator by $${m}$${o > 1 ? ` (simplify $\\sqrt{${n * m}}$ first)` : ''}.`],
      solution: [
        `$\\dfrac{${top}}{\\sqrt{${m}}} \\times \\dfrac{\\sqrt{${m}}}{\\sqrt{${m}}} = \\dfrac{${polyString([
          [a, `\\sqrt{${m}}`],
          [b, `\\sqrt{${n * m}}`],
        ])}}{${m}}$`,
        ...(o > 1
          ? [`$\\sqrt{${n * m}} = ${rad(o, i)}$, so the numerator is $${polyString([
              [a, `\\sqrt{${m}}`],
              [b * o, `\\sqrt{${i}}`],
            ])}$`]
          : []),
        `Divide each term by $${m}$: $${answer}$, so $a = ${fracLatex(P)}$ and $b = ${fracLatex(Q)}$.`,
      ],
      answerDisplay: `$${answer}$`,
    };
  }
  throw new Error('divBinomialNumerator failed');
}

function divContext(rng: Rng): GenOutput {
  for (let t = 0; t < 300; t++) {
    const b = rng.pick([2, 3, 5]);
    const q = rng.pick([2, 3, 5, 6, 7, 8, 12, 18, 20]);
    const a = q * b;
    if (a > 100) continue;
    const d = rng.int(2, 4);
    const c = d * rng.int(2, 6);
    const { outside: k, inside: r } = radicalSplit(q);
    const coef = (c / d) * k;
    const { what, unit } = rng.pick([
      { what: 'rectangular sticker', unit: 'cm' },
      { what: 'rectangular ceramic tile', unit: 'cm' },
      { what: 'rectangular garden', unit: 'm' },
      { what: 'rectangular rug', unit: 'm' },
      { what: 'rectangular deck', unit: 'm' },
    ]);
    return {
      prompt: `A ${what} has an area of $${c}\\sqrt{${a}}$ ${unit}² and a width of $${d}\\sqrt{${b}}$ ${unit}. Determine its exact length, in simplest radical form.`,
      parts: [radPart(coef, r, { suffix: unit })],
      hints: ['Length $= \\dfrac{\\text{area}}{\\text{width}}$.', 'Divide the coefficients and divide the radicands, then simplify.'],
      solution: [
        `$\\ell = \\dfrac{${c}\\sqrt{${a}}}{${d}\\sqrt{${b}}} = \\dfrac{${c}}{${d}}\\sqrt{\\dfrac{${a}}{${b}}} = ${co(c / d)}\\sqrt{${q}}$`,
        ...(k > 1 ? [`$\\sqrt{${q}} = ${rad(k, r)}$`] : []),
        `The length is $${rad(coef, r)}$ ${unit}.`,
      ],
      answerDisplay: `$${rad(coef, r)}$ ${unit}`,
    };
  }
  throw new Error('divContext failed');
}

const divide = skill({
  id: 'm202-radical-divide',
  name: 'Dividing radicals',
  description: 'Divide radicals and rationalize a monomial denominator.',
  outcomes: ['NL3'],
  lessonId: 'm202-4-3',
  gen(rng, d) {
    if (d === 1) return divBasic(rng);
    if (d === 2) return divRationalize(rng);
    return rng.chance(0.55) ? divBinomialNumerator(rng) : divContext(rng);
  },
});

// ---------------------------------------------------------------------------
// 4.4 Radical equations
// ---------------------------------------------------------------------------

function eqSimple(rng: Rng): GenOutput {
  const kind = rng.pick(['shift', 'inside', 'cube', 'cubeInside'] as const);
  if (kind === 'shift') {
    const t = rng.int(1, 12);
    const a = rng.nonZero(-9, 9);
    const b = t + a;
    const x = t * t;
    const lhs = polyString([
      [1, '\\sqrt{x}'],
      [a, ''],
    ]);
    return {
      prompt: `Solve $${lhs} = ${b}$. ${SOLVE_NOTE}`,
      parts: [solutionsPart([x])],
      hints: ['Isolate the radical, then square both sides.', 'Check your answer in the original equation.'],
      solution: [`Isolate the radical: $\\sqrt{x} = ${t}$`, `Square both sides: $x = ${t}^2 = ${x}$`, `Check: $\\sqrt{${x}} ${plusMinus(a)} = ${t} ${plusMinus(a)} = ${b}$ ✓`, finalSolutions([x])],
    };
  }
  if (kind === 'inside') {
    const b = rng.int(2, 10);
    const a = rng.nonZero(-20, 20);
    const x = b * b - a;
    const inner = polyString([
      [1, 'x'],
      [a, ''],
    ]);
    return {
      prompt: `Solve $\\sqrt{${inner}} = ${b}$. ${SOLVE_NOTE}`,
      parts: [solutionsPart([x])],
      hints: ['Square both sides to undo the square root.', 'Check your answer in the original equation.'],
      solution: [`Square both sides: $${inner} = ${b * b}$`, `$x = ${b * b} ${plusMinus(-a)} = ${x}$`, `Check: $\\sqrt{${paren(x)} ${plusMinus(a)}} = \\sqrt{${b * b}} = ${b}$ ✓`, finalSolutions([x])],
    };
  }
  if (kind === 'cube') {
    const c = rng.nonZero(-5, 5);
    const x = c ** 3;
    return {
      prompt: `Solve $\\sqrt[3]{x} = ${c}$. ${SOLVE_NOTE}`,
      parts: [solutionsPart([x])],
      hints: ['Cube both sides to undo the cube root.', c < 0 ? 'A cube root can be negative: $(-2)^3 = -8$.' : 'Check your answer in the original equation.'],
      solution: [`Cube both sides: $x = (${c})^3 = ${x}$`, `Check: $\\sqrt[3]{${x}} = ${c}$ ✓`, finalSolutions([x])],
    };
  }
  const b = rng.nonZero(-4, 4);
  const a = rng.nonZero(-12, 12);
  const x = b ** 3 - a;
  const inner = polyString([
    [1, 'x'],
    [a, ''],
  ]);
  return {
    prompt: `Solve $\\sqrt[3]{${inner}} = ${b}$. ${SOLVE_NOTE}`,
    parts: [solutionsPart([x])],
    hints: ['Cube both sides to undo the cube root.', 'Then solve the linear equation and check.'],
    solution: [`Cube both sides: $${inner} = (${b})^3 = ${b ** 3}$`, `$x = ${b ** 3} ${plusMinus(-a)} = ${x}$`, `Check: $\\sqrt[3]{${paren(x)} ${plusMinus(a)}} = \\sqrt[3]{${b ** 3}} = ${b}$ ✓`, finalSolutions([x])],
  };
}

function eqTwoStep(rng: Rng): GenOutput {
  const kind = rng.weighted([
    ['coef', 0.35],
    ['cube', 0.35],
    ['none', 0.3],
  ] as const);
  if (kind === 'coef') {
    const a = rng.int(2, 5);
    const t = rng.int(1, 8);
    const b = rng.nonZero(-10, 10);
    const c = rng.nonZero(-12, 12);
    const d = a * t + c;
    const x = t * t - b;
    const inner = polyString([
      [1, 'x'],
      [b, ''],
    ]);
    return {
      prompt: `Solve $${a}\\sqrt{${inner}} ${plusMinus(c)} = ${d}$. ${SOLVE_NOTE}`,
      parts: [solutionsPart([x])],
      hints: [`Isolate the radical: undo the $${plusMinus(c).replace(/ /g, '')}$ first, then divide by $${a}$.`, 'Square both sides and check your answer.'],
      solution: [
        `Subtract: $${a}\\sqrt{${inner}} = ${d - c}$`,
        `Divide by $${a}$: $\\sqrt{${inner}} = ${t}$`,
        `Square both sides: $${inner} = ${t * t}$, so $x = ${x}$.`,
        `Check: $${a}\\sqrt{${paren(x)} ${plusMinus(b)}} ${plusMinus(c)} = ${a}(${t}) ${plusMinus(c)} = ${d}$ ✓`,
        finalSolutions([x]),
      ],
    };
  }
  if (kind === 'cube') {
    for (let i = 0; i < 100; i++) {
      const a = rng.int(2, 5);
      const t = rng.nonZero(-3, 4);
      const x = rng.int(-10, 15);
      const b = t ** 3 - a * x;
      const c = rng.nonZero(-9, 9);
      if (b === 0 || Math.abs(b) > 70) continue;
      const inner = polyString([
        [a, 'x'],
        [b, ''],
      ]);
      const d = t + c;
      return {
        prompt: `Solve $\\sqrt[3]{${inner}} ${plusMinus(c)} = ${d}$. ${SOLVE_NOTE}`,
        parts: [solutionsPart([x])],
        hints: ['Isolate the cube root, then cube both sides.', 'Cube roots of negative numbers are negative, so a negative value is possible.'],
        solution: [
          `Isolate the cube root: $\\sqrt[3]{${inner}} = ${t}$`,
          `Cube both sides: $${inner} = ${t ** 3}$`,
          `$${a}x = ${t ** 3 - b}$, so $x = ${x}$.`,
          `Check: $\\sqrt[3]{${a}(${x}) ${plusMinus(b)}} ${plusMinus(c)} = \\sqrt[3]{${t ** 3}} ${plusMinus(c)} = ${t} ${plusMinus(c)} = ${d}$ ✓`,
          finalSolutions([x]),
        ],
      };
    }
  }
  // No solution: the isolated radical would have to equal a negative number.
  const a = rng.pick([1, 1, 2, 3]);
  const k = rng.int(1, 6); // the radical would have to equal -k
  const xc = rng.int(-5, 12);
  const b = k * k - xc; // x + b = k² when x = xc
  const c = rng.int(2, 12);
  const d = c - a * k;
  const inner = polyString([
    [1, 'x'],
    [b, ''],
  ]);
  return {
    prompt: `Solve $${co(a)}\\sqrt{${inner}} + ${c} = ${d}$. ${SOLVE_NOTE}`,
    parts: [solutionsPart([])],
    hints: ['Isolate the radical first. What value must the square root equal?', 'A principal square root is never negative. If you square anyway, check the result in the original equation.'],
    solution: [
      `Isolate the radical: $${co(a)}\\sqrt{${inner}} = ${d - c}$${a > 1 ? `, so $\\sqrt{${inner}} = ${-k}$` : ''}`,
      `The principal square root of a number cannot be negative, so this equation cannot be true.`,
      `(Squaring anyway gives $${inner} = ${k * k}$, so $x = ${xc}$. Check: $${co(a)}\\sqrt{${paren(xc)} ${plusMinus(b)}} + ${c} = ${a === 1 ? k : `${a}(${k})`} + ${c} = ${a * k + c} \\ne ${d}$ ✗ — extraneous.)`,
      finalSolutions([]),
    ],
  };
}

function eqFall(rng: Rng): GenOutput {
  for (let i = 0; i < 100; i++) {
    const name = rng.pick(NAMES);
    const ctx = rng.pick([
      { text: `${name} drops a pebble from a footbridge over a river valley. It hits the water`, lo: 12, hi: 25 },
      { text: `${name} drops a tennis ball from the top of a climbing tower. It hits the ground`, lo: 12, hi: 20 },
      { text: `During a physics lab, ${name} drops a ball from a balcony. It hits the floor below`, lo: 11, hi: 18 },
      { text: 'A roofer accidentally drops a hammer from a roof. It hits the ground', lo: 11, hi: 16 },
    ]);
    const t = rng.int(ctx.lo, ctx.hi) / 10;
    const d = 4.9 * t * t;
    if (!clearOfBoundary(d, 1)) continue;
    const what = ctx.text;
    return {
      prompt: `The time $t$, in seconds, that an object takes to fall $d$ metres is modelled by $t = \\sqrt{\\dfrac{d}{4.9}}$ (ignoring air resistance). ${what} $${fmt(t)}$ s later. From what height was it dropped? Answer to the nearest tenth of a metre.`,
      parts: [numPart(d, { decimals: 1, suffix: 'm' })],
      hints: ['Substitute the time for $t$, then square both sides.', 'Multiply both sides by $4.9$ to solve for $d$.'],
      solution: [`$${fmt(t)} = \\sqrt{\\dfrac{d}{4.9}}$`, `Square both sides: $${fmt(t * t)} = \\dfrac{d}{4.9}$`, `$d = 4.9 \\times ${fmt(t * t)} = ${fmt(d, 3)}$`, `It was dropped from about $${fmtFixed(d, 1)}$ m.`],
      calculator: true,
    };
  }
  throw new Error('eqFall failed');
}

function eqSphere(rng: Rng): GenOutput {
  for (let i = 0; i < 100; i++) {
    const thing = rng.pick([
      { what: 'a spherical exercise ball', unit: 'cm', lo: 25, hi: 40 },
      { what: 'a spherical water tower tank', unit: 'm', lo: 4, hi: 9 },
      { what: 'a spherical gumball', unit: 'cm', lo: 1, hi: 3 },
      { what: 'a spherical weather balloon', unit: 'm', lo: 1, hi: 4 },
    ]);
    const r = thing.lo >= 10 ? rng.int(thing.lo, thing.hi) : rng.int(thing.lo * 10, thing.hi * 10) / 10;
    const V = (4 / 3) * Math.PI * r ** 3;
    const dec = V >= 1000 ? 0 : 1;
    if (!clearOfBoundary(V, dec)) continue;
    return {
      prompt: `The radius of a sphere with volume $V$ is $r = \\sqrt[3]{\\dfrac{3V}{4\\pi}}$. The radius of ${thing.what} is $${fmt(r)}$ ${thing.unit}. Solve the equation for $V$ to determine the volume, ${dec === 0 ? 'to the nearest whole' : 'to the nearest tenth of a'} cubic ${thing.unit === 'm' ? 'metre' : 'centimetre'}.`,
      parts: [numPart(V, { decimals: dec, suffix: `${thing.unit}³` })],
      hints: ['Cube both sides to undo the cube root.', 'Then multiply both sides by $4\\pi$ and divide by $3$.'],
      solution: [
        `$${fmt(r)} = \\sqrt[3]{\\dfrac{3V}{4\\pi}}$`,
        `Cube both sides: $${fmt(r)}^3 = \\dfrac{3V}{4\\pi}$`,
        `$V = \\dfrac{4\\pi(${fmt(r)})^3}{3} \\approx ${fmt(V, 3)}$`,
        `The volume is about $${fmtFixed(V, dec)}$ ${thing.unit}³.`,
      ],
      calculator: true,
    };
  }
  throw new Error('eqSphere failed');
}

function eqWave(rng: Rng): GenOutput {
  for (let i = 0; i < 100; i++) {
    const s = rng.int(30, 120) / 10;
    const d = (s * s) / 9.8;
    if (!clearOfBoundary(d, 1)) continue;
    const where = rng.pick(['a mountain lake', 'a large lake', 'a wave pool at an indoor water park', 'a glacier-fed lake']);
    return {
      prompt: `In shallow water, the speed $s$ of a wave, in metres per second, can be modelled by $s = \\sqrt{9.8d}$, where $d$ is the water depth in metres. A wave on ${where} travels at $${fmt(s)}$ m/s. According to the model, how deep is the water? Answer to the nearest tenth of a metre.`,
      parts: [numPart(d, { decimals: 1, suffix: 'm' })],
      hints: ['Substitute the speed, then square both sides.', 'Divide by $9.8$ to solve for $d$.'],
      solution: [`$${fmt(s)} = \\sqrt{9.8d}$`, `Square both sides: $${fmt(s * s)} = 9.8d$`, `$d = \\dfrac{${fmt(s * s)}}{9.8} \\approx ${fmt(d, 3)}$`, `The water is about $${fmtFixed(d, 1)}$ m deep.`],
      calculator: true,
    };
  }
  throw new Error('eqWave failed');
}

function eqSquaredCancel(rng: Rng): GenOutput {
  for (let i = 0; i < 200; i++) {
    const c = rng.nonZero(-5, 5);
    const x = rng.int(-8, 10);
    const k = 2 * c * x + c * c;
    if (k <= 0 || k > 80) continue;
    const valid = x + c >= 0;
    const rhs = polyString([
      [1, 'x'],
      [c, ''],
    ]);
    const lhsVal = Math.sqrt(x * x + k);
    return {
      prompt: `Solve $\\sqrt{x^2 + ${k}} = ${rhs}$. ${SOLVE_NOTE}`,
      parts: [solutionsPart(valid ? [x] : [])],
      hints: ['Square both sides. The $x^2$ terms cancel, leaving a linear equation.', 'Squaring can create an extraneous root: check your answer in the original equation.'],
      solution: [
        `Square both sides: $x^2 + ${k} = ${polyString([
          [1, 'x^2'],
          [2 * c, 'x'],
          [c * c, ''],
        ])}$`,
        `Subtract $x^2$ from both sides: $${k} = ${polyString([
          [2 * c, 'x'],
          [c * c, ''],
        ])}$, so $${2 * c}x = ${k - c * c}$ and $x = ${x}$.`,
        `Check: left side $\\sqrt{${paren(x)}^2 + ${k}} = \\sqrt{${x * x + k}} = ${lhsVal}$; right side $${x} ${plusMinus(c)} = ${x + c}$. ${valid ? '✓' : `✗ — $x = ${x}$ is extraneous.`}`,
        finalSolutions(valid ? [x] : []),
      ],
    };
  }
  throw new Error('eqSquaredCancel failed');
}

function eqTwoRadicals(rng: Rng): GenOutput {
  for (let i = 0; i < 200; i++) {
    const a = rng.int(2, 5);
    const c = rng.int(1, a - 1);
    const x = rng.int(-6, 10);
    const v = rng.chance(0.75) ? rng.int(1, 30) : -rng.int(1, 12);
    const b = v - a * x;
    const d = v - c * x;
    if (b === 0 || d === 0 || b === d) continue;
    const L = polyString([
      [a, 'x'],
      [b, ''],
    ]);
    const R = polyString([
      [c, 'x'],
      [d, ''],
    ]);
    const valid = v >= 0;
    return {
      prompt: `Solve $\\sqrt{${L}} = \\sqrt{${R}}$. ${SOLVE_NOTE}`,
      parts: [solutionsPart(valid ? [x] : [])],
      hints: ['Square both sides to remove both radicals, then solve the linear equation.', 'Check that both radicands are non-negative for your answer.'],
      solution: [
        `Square both sides: $${L} = ${R}$`,
        a - c === 1 ? `$x = ${x}$` : `$${a - c}x = ${d - b}$, so $x = ${x}$.`,
        valid
          ? `Check: $\\sqrt{${a}(${x}) ${plusMinus(b)}} = \\sqrt{${v}}$ and $\\sqrt{${c === 1 ? paren(x) : `${c}(${x})`} ${plusMinus(d)}} = \\sqrt{${v}}$ ✓`
          : `Check: both radicands equal $${v}$ when $x = ${x}$, and $\\sqrt{${v}}$ is not a real number. ✗ — $x = ${x}$ is extraneous.`,
        finalSolutions(valid ? [x] : []),
      ],
    };
  }
  throw new Error('eqTwoRadicals failed');
}

const equation = skill({
  id: 'm202-radical-equation',
  name: 'Solving radical equations',
  description: 'Solve radical equations with square roots or cube roots, check for extraneous roots, and solve problems modelled by radical equations.',
  outcomes: ['NL4'],
  lessonId: 'm202-4-4',
  gen(rng, d) {
    if (d === 1) return eqSimple(rng);
    if (d === 2) return eqTwoStep(rng);
    const kind = rng.weighted([
      ['fall', 0.2],
      ['sphere', 0.2],
      ['wave', 0.15],
      ['squared', 0.25],
      ['two', 0.2],
    ] as const);
    if (kind === 'fall') return eqFall(rng);
    if (kind === 'sphere') return eqSphere(rng);
    if (kind === 'wave') return eqWave(rng);
    return kind === 'squared' ? eqSquaredCancel(rng) : eqTwoRadicals(rng);
  },
});

export const RADICAL_SKILLS: SkillDef[] = [simplify, order, add, multiply, divide, equation];
