/** More Mathematics Topics, Unit 21: changing the subject of a formula, joint and partial variation, and linear programming. */
import { mc, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Part, SkillDef } from '../../../types.ts';
import { NAMES } from './common.ts';

type Out = GenOutput;

const isExact = (v: number, places = 3) => Math.abs(roundTo(v, places) - v) < 1e-9;
const answer = (v: number, opts: { label?: string; suffix?: string } = {}): Part => (isExact(v) ? numPart(roundTo(v, 3), { ...opts, exact: false }) : numPart(v, { ...opts, decimals: 2 }));
const shown = (v: number) => (isExact(v) ? fmt(v) : `${fmt(v, 2)}`);

// ---------------------------------------------------------------------------
// 21.1 Changing the subject of a formula
// ---------------------------------------------------------------------------

interface Rearrangement {
  formula: string;
  subject: string;
  correct: string;
  wrong: string[];
  steps: string[];
}

const REARRANGE: Record<Difficulty, Rearrangement[]> = {
  1: [
    { formula: 'v = u + at', subject: 'u', correct: 'u = v - at', wrong: ['u = v + at', 'u = at - v', 'u = \\dfrac{v}{at}'], steps: ['Subtract $at$ from both sides: $v - at = u$.'] },
    { formula: 'P = 2l + 2w', subject: 'l', correct: 'l = \\dfrac{P - 2w}{2}', wrong: ['l = \\dfrac{P}{2} - 2w', 'l = \\dfrac{P + 2w}{2}', 'l = 2P - 2w'], steps: ['Subtract $2w$ from both sides: $P - 2w = 2l$.', 'Divide both sides by $2$.'] },
    { formula: 'y = mx + c', subject: 'x', correct: 'x = \\dfrac{y - c}{m}', wrong: ['x = \\dfrac{y}{m} - c', 'x = \\dfrac{y + c}{m}', 'x = m(y - c)'], steps: ['Subtract $c$ from both sides: $y - c = mx$.', 'Divide both sides by $m$.'] },
    { formula: 'V = IR', subject: 'I', correct: 'I = \\dfrac{V}{R}', wrong: ['I = VR', 'I = \\dfrac{R}{V}', 'I = V - R'], steps: ['Divide both sides by $R$.'] },
    { formula: 'A = \\dfrac{1}{2}bh', subject: 'h', correct: 'h = \\dfrac{2A}{b}', wrong: ['h = \\dfrac{A}{2b}', 'h = \\dfrac{Ab}{2}', 'h = 2A - b'], steps: ['Multiply both sides by $2$: $2A = bh$.', 'Divide both sides by $b$.'] },
    { formula: 'C = 2\\pi r', subject: 'r', correct: 'r = \\dfrac{C}{2\\pi}', wrong: ['r = 2\\pi C', 'r = \\dfrac{2\\pi}{C}', 'r = C - 2\\pi'], steps: ['Divide both sides by $2\\pi$.'] },
  ],
  2: [
    { formula: 's = \\dfrac{(u + v)t}{2}', subject: 'u', correct: 'u = \\dfrac{2s}{t} - v', wrong: ['u = \\dfrac{2s - v}{t}', 'u = \\dfrac{st}{2} - v', 'u = \\dfrac{2s}{t} + v'], steps: ['Multiply both sides by $2$: $2s = (u + v)t$.', 'Divide both sides by $t$: $\\dfrac{2s}{t} = u + v$.', 'Subtract $v$ from both sides.'] },
    { formula: 'F = \\dfrac{9}{5}C + 32', subject: 'C', correct: 'C = \\dfrac{5(F - 32)}{9}', wrong: ['C = \\dfrac{5F}{9} - 32', 'C = \\dfrac{9(F - 32)}{5}', 'C = \\dfrac{5(F + 32)}{9}'], steps: ['Subtract $32$ from both sides: $F - 32 = \\dfrac{9}{5}C$.', 'Multiply both sides by $5$ and divide by $9$.'] },
    { formula: 'A = \\dfrac{h(a + b)}{2}', subject: 'a', correct: 'a = \\dfrac{2A}{h} - b', wrong: ['a = \\dfrac{2A - b}{h}', 'a = \\dfrac{Ah}{2} - b', 'a = \\dfrac{2A}{h} + b'], steps: ['Multiply both sides by $2$: $2A = h(a + b)$.', 'Divide both sides by $h$: $\\dfrac{2A}{h} = a + b$.', 'Subtract $b$ from both sides.'] },
    { formula: 'I = \\dfrac{PRT}{100}', subject: 'R', correct: 'R = \\dfrac{100I}{PT}', wrong: ['R = \\dfrac{PT}{100I}', 'R = \\dfrac{100I}{P} - T', 'R = \\dfrac{I}{100PT}'], steps: ['Multiply both sides by $100$: $100I = PRT$.', 'Divide both sides by $PT$.'] },
    { formula: 'p = \\dfrac{q - r}{t}', subject: 'q', correct: 'q = pt + r', wrong: ['q = pt - r', 'q = \\dfrac{p}{t} + r', 'q = t(p + r)'], steps: ['Multiply both sides by $t$: $pt = q - r$.', 'Add $r$ to both sides.'] },
  ],
  3: [
    { formula: 'A = \\pi r^2', subject: 'r', correct: 'r = \\sqrt{\\dfrac{A}{\\pi}}', wrong: ['r = \\dfrac{\\sqrt{A}}{\\pi}', 'r = \\dfrac{A}{2\\pi}', 'r = \\sqrt{A\\pi}'], steps: ['Divide both sides by $\\pi$: $\\dfrac{A}{\\pi} = r^2$.', 'Take the square root of both sides ($r$ is a length, so it is positive).'] },
    { formula: 'T = 2\\pi\\sqrt{\\dfrac{l}{g}}', subject: 'l', correct: 'l = \\dfrac{gT^2}{4\\pi^2}', wrong: ['l = \\dfrac{gT^2}{2\\pi}', 'l = \\dfrac{gT}{4\\pi^2}', 'l = \\dfrac{4\\pi^2 T^2}{g}'], steps: ['Divide both sides by $2\\pi$: $\\dfrac{T}{2\\pi} = \\sqrt{\\dfrac{l}{g}}$.', 'Square both sides: $\\dfrac{T^2}{4\\pi^2} = \\dfrac{l}{g}$.', 'Multiply both sides by $g$.'] },
    { formula: 'y = \\dfrac{x + 1}{x - 2}', subject: 'x', correct: 'x = \\dfrac{2y + 1}{y - 1}', wrong: ['x = \\dfrac{2y - 1}{y + 1}', 'x = \\dfrac{y + 1}{y - 2}', 'x = \\dfrac{2y + 1}{y}'], steps: ['Multiply both sides by $x - 2$: $y(x - 2) = x + 1$, so $xy - 2y = x + 1$.', 'Collect the terms in $x$ on one side: $xy - x = 2y + 1$.', 'Factorize: $x(y - 1) = 2y + 1$, then divide by $y - 1$.'] },
    { formula: 'v^2 = u^2 + 2as', subject: 'u', correct: 'u = \\sqrt{v^2 - 2as}', wrong: ['u = v - \\sqrt{2as}', 'u = \\sqrt{v^2 + 2as}', 'u = v^2 - 2as'], steps: ['Subtract $2as$ from both sides: $v^2 - 2as = u^2$.', 'Take the square root of both sides (taking $u$ as positive).'] },
    { formula: 'ax + b = cx + d', subject: 'x', correct: 'x = \\dfrac{d - b}{a - c}', wrong: ['x = \\dfrac{d - b}{a + c}', 'x = \\dfrac{d + b}{a - c}', 'x = \\dfrac{b - d}{a - c}'], steps: ['Collect the terms in $x$ on one side: $ax - cx = d - b$.', 'Factorize: $x(a - c) = d - b$.', 'Divide both sides by $a - c$.'] },
    { formula: '\\dfrac{1}{f} = \\dfrac{1}{u} + \\dfrac{1}{v}', subject: 'v', correct: 'v = \\dfrac{fu}{u - f}', wrong: ['v = f - u', 'v = \\dfrac{fu}{f - u}', 'v = \\dfrac{u - f}{fu}'], steps: ['Subtract $\\dfrac{1}{u}$ from both sides: $\\dfrac{1}{v} = \\dfrac{1}{f} - \\dfrac{1}{u} = \\dfrac{u - f}{fu}$.', 'Take the reciprocal of both sides.'] },
  ],
};

function changeSubject(rng: Rng, d: Difficulty): Out {
  const r = rng.pick(REARRANGE[d]);
  return {
    prompt: `Make $${r.subject}$ the subject of the formula $${r.formula}$.`,
    parts: [{ answer: mc(rng, `$${r.correct}$`, r.wrong.map((w) => `$${w}$`)) }],
    hints: [`We want $${r.subject}$ alone on one side. Undo what has been done to it, one step at a time, doing the same to both sides.`, d === 3 ? `If $${r.subject}$ appears twice, collect its terms on one side and factorize. Undo a square with a square root, and a square root by squaring.` : 'Undo additions and subtractions first, then multiplications and divisions.'],
    solution: [...r.steps, `$${r.correct}$`],
  };
}

function subjectEvaluate(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const u = rng.int(2, 12);
    const a = rng.int(2, 6);
    const t = rng.int(2, 9);
    const v = u + a * t;
    return {
      prompt: `In the formula $v = u + at$, $v = ${v}$, $u = ${u}$ and $t = ${t}$. Find $a$.`,
      parts: [answer(a, { label: '$a$ =' })],
      hints: ['First make $a$ the subject: subtract $u$, then divide by $t$.', '$a = \\dfrac{v - u}{t}$'],
      solution: ['$a = \\dfrac{v - u}{t}$', `$a = \\dfrac{${v} - ${u}}{${t}} = \\dfrac{${v - u}}{${t}} = ${a}$`],
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const h = rng.int(4, 12);
      const a = rng.int(3, 10);
      const b = a + rng.int(2, 8);
      const A = (h * (a + b)) / 2;
      return {
        prompt: `The area of a trapezium is $A = \\dfrac{h(a + b)}{2}$. A trapezium has $A = ${fmt(A)}$ cm², $h = ${h}$ cm and $a = ${a}$ cm. Find $b$.`,
        parts: [answer(b, { label: '$b$ =', suffix: 'cm' })],
        hints: ['Make $b$ the subject: multiply by $2$, divide by $h$, then subtract $a$.', '$b = \\dfrac{2A}{h} - a$'],
        solution: ['$b = \\dfrac{2A}{h} - a$', `$b = \\dfrac{2 \\times ${fmt(A)}}{${h}} - ${a} = ${fmt((2 * A) / h)} - ${a} = ${b}$ cm`],
      };
    }
    const P = rng.pick([400, 500, 800, 1200, 1500, 2000]);
    const R = rng.pick([2, 2.5, 3, 4, 5, 6]);
    const T = rng.int(2, 6);
    const I = (P * R * T) / 100;
    return {
      prompt: `Simple interest is $I = \\dfrac{PRT}{100}$, where $P$ is the amount invested, $R$ the rate in percent per year and $T$ the time in years. An investment of $P = ${P}$ earns $I = ${fmt(I)}$ in $T = ${T}$ years. Find $R$.`,
      parts: [answer(R, { label: '$R$ =', suffix: '%' })],
      hints: ['Make $R$ the subject: multiply by $100$, then divide by $PT$.', '$R = \\dfrac{100I}{PT}$'],
      solution: ['$R = \\dfrac{100I}{PT}$', `$R = \\dfrac{100 \\times ${fmt(I)}}{${P} \\times ${T}} = \\dfrac{${fmt(100 * I)}}{${P * T}} = ${fmt(R)}$`],
    };
  }
  if (rng.chance(0.5)) {
    const r = rng.int(2, 12);
    const A = roundTo(Math.PI * r * r, 1);
    const back = Math.sqrt(A / Math.PI);
    return {
      prompt: `The area of a circle is $A = \\pi r^2$. A circle has an area of $${fmt(A)}$ cm². Find its radius, to 2 decimal places.`,
      parts: [numPart(back, { decimals: 2, label: '$r$ =', suffix: 'cm' })],
      hints: ['Make $r$ the subject: divide by $\\pi$, then take the square root.', '$r = \\sqrt{\\dfrac{A}{\\pi}}$'],
      solution: ['$r = \\sqrt{\\dfrac{A}{\\pi}}$', `$r = \\sqrt{\\dfrac{${fmt(A)}}{\\pi}} = \\sqrt{${fmt(A / Math.PI, 4)}\\ldots} \\approx ${fmt(back, 2)}$ cm`],
      calculator: true,
    };
  }
  const u = rng.int(2, 9);
  const a = rng.int(2, 5);
  const s = rng.int(3, 12);
  const v2 = u * u + 2 * a * s;
  return {
    prompt: `In the formula $v^2 = u^2 + 2as$, $v^2 = ${v2}$, $a = ${a}$ and $s = ${s}$. Find the positive value of $u$.`,
    parts: [answer(u, { label: '$u$ =' })],
    hints: ['Make $u$ the subject: subtract $2as$, then take the square root.', '$u = \\sqrt{v^2 - 2as}$'],
    solution: ['$u = \\sqrt{v^2 - 2as}$', `$u = \\sqrt{${v2} - 2 \\times ${a} \\times ${s}} = \\sqrt{${v2 - 2 * a * s}} = ${u}$`],
  };
}

// ---------------------------------------------------------------------------
// 21.2 Joint and partial variation
// ---------------------------------------------------------------------------

function jointVariation(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    // z varies jointly as x and y.
    const k = rng.pick([0.5, 2, 3, 4, 5]);
    const [x1, y1, x2, y2] = [rng.int(2, 6), rng.int(2, 6), rng.int(3, 9), rng.int(3, 9)];
    const z1 = k * x1 * y1;
    const z2 = k * x2 * y2;
    return {
      prompt: `$z$ varies jointly as $x$ and $y$. When $x = ${x1}$ and $y = ${y1}$, $z = ${fmt(z1)}$. Find the constant $k$ in $z = kxy$, and $z$ when $x = ${x2}$ and $y = ${y2}$.`,
      parts: [answer(k, { label: '$k$ =' }), answer(z2, { label: '$z$ =' })],
      hints: ['"Varies jointly as $x$ and $y$" means $z = kxy$ for a constant $k$.', 'Put in the three values you are given to find $k$.'],
      solution: ['$z = kxy$', `$${fmt(z1)} = k \\times ${x1} \\times ${y1} = ${x1 * y1}k$, so $k = ${fmt(k)}$.`, `$z = ${fmt(k)} \\times ${x2} \\times ${y2} = ${fmt(z2)}$`],
    };
  }
  // z varies directly as x (or x²) and inversely as y (or y², √y).
  const top = d === 3 ? rng.pick([1, 2] as const) : 1;
  const bottom = d === 3 ? rng.pick([2, 0.5] as const) : rng.pick([1, 2] as const);
  const pw = (v: number, p: number) => (p === 0.5 ? Math.sqrt(v) : v ** p);
  const tex = (v: string, p: number) => (p === 1 ? v : p === 0.5 ? `\\sqrt{${v}}` : `${v}^2`);
  const say = (v: string, p: number) => (p === 1 ? `$${v}$` : p === 0.5 ? `the square root of $${v}$` : `the square of $${v}$`);
  const yPool = bottom === 0.5 ? [4, 9, 16, 25, 36] : [2, 3, 4, 5, 6];
  const [y1, y2] = rng.shuffle([...yPool]).slice(0, 2) as [number, number];
  const [x1, x2] = rng.shuffle([2, 3, 4, 5, 6, 8]).slice(0, 2) as [number, number];
  const k = rng.pick([6, 12, 18, 24, 30, 36, 60]);
  const f = (x: number, y: number) => (k * pw(x, top)) / pw(y, bottom);
  const z1 = f(x1, y1);
  const z2 = f(x2, y2);
  const law = `z = \\dfrac{k${tex('x', top)}}{${tex('y', bottom)}}`;
  return {
    prompt: `$z$ varies directly as ${say('x', top)} and inversely as ${say('y', bottom)}. When $x = ${x1}$ and $y = ${y1}$, $z = ${shown(z1)}$. Find $z$ when $x = ${x2}$ and $y = ${y2}$${isExact(z2) ? '' : ', to 2 decimal places'}.`,
    parts: [answer(z2, { label: '$z$ =' })],
    hints: [`Write the rule with one constant: $${law}$.`, 'Use the first set of values to find $k$, then use the rule with the new values.'],
    solution: [
      `$${law}$`,
      `$${shown(z1)} = \\dfrac{k \\times ${fmt(pw(x1, top))}}{${fmt(pw(y1, bottom))}}$, so $k = \\dfrac{${shown(z1)} \\times ${fmt(pw(y1, bottom))}}{${fmt(pw(x1, top))}} = ${fmt(k)}$.`,
      `$z = \\dfrac{${fmt(k)} \\times ${fmt(pw(x2, top))}}{${fmt(pw(y2, bottom))}} ${isExact(z2) ? '=' : '\\approx'} ${shown(z2)}$`,
    ],
    calculator: true,
  };
}

const PARTIAL = [
  { text: (n: string) => `The cost $C$ dollars of ${n}’s taxi ride is partly constant and partly varies as the distance $d$ km.`, y: 'C', x: 'd', unit: 'dollars', money: true },
  { text: () => 'The cost $C$ dollars of hiring a hall is partly constant and partly varies as the number of guests $n$.', y: 'C', x: 'n', unit: 'dollars', money: true },
  { text: () => 'The length $L$ cm of a spring is partly constant and partly varies as the mass $m$ kg hung on it.', y: 'L', x: 'm', unit: 'cm', money: false },
  { text: (n: string) => `${n}’s monthly phone bill $B$ dollars is partly constant and partly varies as the number of minutes $t$ used.`, y: 'B', x: 't', unit: 'dollars', money: true },
];

function partialVariation(rng: Rng, d: Difficulty): Out {
  const c = rng.pick(PARTIAL);
  const a = rng.int(3, 20) * (c.money ? 5 : 1);
  const b = rng.pick(d === 1 ? [2, 3, 4, 5] : [0.5, 1.5, 2.5, 3, 4, 6]);
  const [x1, x2, x3] = retry(
    () => rng.shuffle([4, 6, 8, 10, 12, 14, 16, 20, 24, 30]).slice(0, 3) as [number, number, number],
    ([p, q]) => p < q,
  );
  const f = (x: number) => a + b * x;
  const law = `${c.y} = a + b${c.x}`;
  const m = (v: number) => (c.money ? `\\$${fmt(v)}` : `$${fmt(v)}$ ${c.unit}`);
  const intro = c.text(rng.pick(NAMES));
  if (d === 1) {
    return {
      prompt: `${intro} So $${law}$, where $a = ${fmt(a)}$ and $b = ${fmt(b)}$. Find $${c.y}$ when $${c.x} = ${x1}$.`,
      parts: [answer(f(x1), { label: `$${c.y}$ =`, suffix: c.money ? undefined : c.unit })],
      hints: ['The constant part is $a$, and the part that varies is $b$ times the other quantity.', `Put $${c.x} = ${x1}$ into $${law}$.`],
      solution: [`$${c.y} = ${fmt(a)} + ${fmt(b)} \\times ${x1} = ${fmt(a)} + ${fmt(b * x1)} = ${fmt(f(x1))}$`],
    };
  }
  const solve = [
    `$${law}$`,
    `When $${c.x} = ${x1}$: $${fmt(f(x1))} = a + ${x1}b$. When $${c.x} = ${x2}$: $${fmt(f(x2))} = a + ${x2}b$.`,
    `Subtract the first equation from the second: $${fmt(f(x2) - f(x1))} = ${x2 - x1}b$, so $b = ${fmt(b)}$.`,
    `Then $a = ${fmt(f(x1))} - ${x1} \\times ${fmt(b)} = ${fmt(a)}$, so $${c.y} = ${fmt(a)} + ${fmt(b)}${c.x}$.`,
  ];
  const given = `When $${c.x} = ${x1}$, $${c.y}$ is ${m(f(x1))}, and when $${c.x} = ${x2}$, $${c.y}$ is ${m(f(x2))}.`;
  if (d === 2) {
    return {
      prompt: `${intro} ${given} Find the constants $a$ and $b$ in $${law}$.`,
      parts: [answer(a, { label: '$a$ =' }), answer(b, { label: '$b$ =' })],
      hints: [`Each pair of values gives one equation in $a$ and $b$.`, 'Subtract one equation from the other to remove $a$.'],
      solution: solve,
    };
  }
  return {
    prompt: `${intro} ${given} Find $${c.y}$ when $${c.x} = ${x3}$.`,
    parts: [answer(f(x3), { label: `$${c.y}$ =`, suffix: c.money ? undefined : c.unit })],
    hints: [`Write $${law}$. Each pair of values gives one equation in $a$ and $b$.`, 'Solve the two equations for $a$ and $b$, then use the rule.'],
    solution: [...solve, `When $${c.x} = ${x3}$: $${c.y} = ${fmt(a)} + ${fmt(b)} \\times ${x3} = ${fmt(f(x3))}$`],
  };
}

// ---------------------------------------------------------------------------
// 21.3 Linear programming
// ---------------------------------------------------------------------------

interface Region {
  /** x + y ≤ s, x ≤ a, y ≤ b, with x ≥ 0 and y ≥ 0. */
  s: number;
  a: number;
  b: number;
}

const region = (rng: Rng): Region => {
  const a = rng.int(4, 9);
  const b = rng.int(4, 9);
  const s = rng.int(Math.max(a, b) + 1, a + b - 1);
  return { s, a, b };
};
const inside = (r: Region, x: number, y: number) => x >= 0 && y >= 0 && x <= r.a && y <= r.b && x + y <= r.s;
const vertices = (r: Region): Array<[number, number]> => [[0, 0], [r.a, 0], [r.a, r.s - r.a], [r.s - r.b, r.b], [0, r.b]];
const constraints = (r: Region) => `$x \\ge 0$, $y \\ge 0$, $x \\le ${r.a}$, $y \\le ${r.b}$ and $x + y \\le ${r.s}$`;

function lpConstraints(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const r = region(rng);
    const good = retry(() => [rng.int(1, r.a), rng.int(1, r.b)] as [number, number], ([x, y]) => inside(r, x, y), 200);
    const bad: Array<[number, number]> = [[r.a + 1, 1], [1, r.b + 1], [r.a, r.b], [r.a + 2, r.b - 1]];
    const show = ([x, y]: [number, number]) => `$(${x}, ${y})$`;
    return {
      prompt: `A region is given by the inequalities ${constraints(r)}. Which point lies in the region?`,
      parts: [{ answer: mc(rng, show(good), bad.filter(([x, y]) => !inside(r, x, y)).map(show), { max: 4 }) }],
      hints: ['A point is in the region only if it satisfies every inequality.', 'Test each point in all of them. One failure is enough to rule a point out.'],
      solution: [`${show(good)}: $${good[0]} \\le ${r.a}$, $${good[1]} \\le ${r.b}$ and $${good[0]} + ${good[1]} = ${good[0] + good[1]} \\le ${r.s}$, so it satisfies them all.`, 'Each of the other points breaks at least one inequality.'],
    };
  }
  // Writing a constraint from a situation.
  const name = rng.pick(NAMES);
  const [p, q] = [rng.int(2, 6), rng.int(2, 6)];
  const total = rng.int(6, 12) * 5;
  const kind = rng.pick(d === 2 ? ['cost', 'count'] : ['cost', 'ratio', 'atleast']);
  if (kind === 'cost') {
    return {
      prompt: `${name} buys $x$ pens at \\$${p} each and $y$ notebooks at \\$${q} each, and can spend at most \\$${total}. Which inequality shows this?`,
      parts: [{ answer: mc(rng, `$${p}x + ${q}y \\le ${total}$`, [`$${p}x + ${q}y \\ge ${total}$`, `$x + y \\le ${total}$`, `$${q}x + ${p}y \\le ${total}$`, `$${p}x + ${q}y < ${total}$`].filter((w) => p !== q || !w.startsWith(`$${q}x + ${p}y`))) }],
      hints: ['The cost of $x$ pens is the price of one pen times $x$.', '"At most" means less than or equal to.'],
      solution: [`The pens cost $${p}x$ dollars and the notebooks cost $${q}y$ dollars.`, `The total is at most ${total}, so $${p}x + ${q}y \\le ${total}$.`],
    };
  }
  if (kind === 'count') {
    const n = rng.int(8, 20);
    return {
      prompt: `A minibus carries $x$ adults and $y$ children. It has room for no more than $${n}$ passengers, and there must be at least $2$ adults. Which pair of inequalities shows this?`,
      parts: [{ answer: mc(rng, `$x + y \\le ${n}$ and $x \\ge 2$`, [`$x + y \\ge ${n}$ and $x \\ge 2$`, `$x + y \\le ${n}$ and $x \\le 2$`, `$x + y < ${n}$ and $x > 2$`]) }],
      hints: ['"No more than" means less than or equal to, and "at least" means greater than or equal to.', 'The number of passengers is $x + y$.'],
      solution: [`The passengers number $x + y$, which is no more than $${n}$: $x + y \\le ${n}$.`, 'At least $2$ adults: $x \\ge 2$.'],
    };
  }
  if (kind === 'ratio') {
    const k = rng.int(2, 4);
    return {
      prompt: `A farmer plants $x$ hectares of maize and $y$ hectares of beans. The area of maize must be at least $${k}$ times the area of beans. Which inequality shows this?`,
      parts: [{ answer: mc(rng, `$x \\ge ${k}y$`, [`$y \\ge ${k}x$`, `$x \\le ${k}y$`, `$${k}x \\ge y$`]) }],
      hints: [`$${k}$ times the area of beans is $${k}y$.`, '"At least" means greater than or equal to.'],
      solution: [`The area of maize, $x$, is at least $${k}y$, so $x \\ge ${k}y$.`],
    };
  }
  const least = rng.int(10, 30);
  return {
    prompt: `A baker makes $x$ loaves and $y$ cakes each day. A loaf needs $${p}$ cups of flour and a cake needs $${q + 1}$, and the baker wants to use at least $${least}$ cups of flour so that none is wasted. Which inequality shows this?`,
    parts: [{ answer: mc(rng, `$${p}x + ${q + 1}y \\ge ${least}$`, [`$${p}x + ${q + 1}y \\le ${least}$`, `$x + y \\ge ${least}$`, `$${p}x + ${q + 1}y > ${least}$`]) }],
    hints: [`The flour used is $${p}x + ${q + 1}y$ cups.`, '"At least" means greater than or equal to.'],
    solution: [`The loaves use $${p}x$ cups and the cakes use $${q + 1}y$ cups.`, `At least $${least}$ cups: $${p}x + ${q + 1}y \\ge ${least}$.`],
  };
}

function lpOptimize(rng: Rng, d: Difficulty): Out {
  const r = region(rng);
  const [p, q] = retry(() => [rng.int(2, 9), rng.int(2, 9)] as [number, number], ([m, n]) => m !== n);
  const vs = vertices(r);
  const value = ([x, y]: [number, number]) => p * x + q * y;
  const best = Math.max(...vs.map(value));
  const at = vs.find((v) => value(v) === best)!;
  const table = vs.map((v) => `$(${v[0]}, ${v[1]})$: $${p} \\times ${v[0]} + ${q} \\times ${v[1]} = ${value(v)}$`);
  if (d === 1) {
    return {
      prompt: `The corners of a feasible region are ${vs.map(([x, y]) => `$(${x}, ${y})$`).join(', ')}. Find the greatest value of $P = ${p}x + ${q}y$ in the region.`,
      parts: [numPart(best, { label: '$P$ =', exact: false })],
      hints: ['The greatest value of a linear objective is always at a corner of the region.', 'Work out $P$ at each corner and choose the largest.'],
      solution: [...table, `The greatest value is $${best}$, at $(${at[0]}, ${at[1]})$.`],
    };
  }
  if (d === 2) {
    return {
      prompt: `A region is given by ${constraints(r)}. Find the greatest value of $P = ${p}x + ${q}y$ in the region.`,
      parts: [numPart(best, { label: '$P$ =', exact: false })],
      hints: [`Find the corners of the region. Two of them are where $x + y = ${r.s}$ meets $x = ${r.a}$ and $y = ${r.b}$.`, 'Work out $P$ at each corner and choose the largest.'],
      solution: [`$x + y = ${r.s}$ meets $x = ${r.a}$ at $(${r.a}, ${r.s - r.a})$ and $y = ${r.b}$ at $(${r.s - r.b}, ${r.b})$. The other corners are $(0, 0)$, $(${r.a}, 0)$ and $(0, ${r.b})$.`, ...table, `The greatest value is $${best}$, at $(${at[0]}, ${at[1]})$.`],
    };
  }
  const name = rng.pick(NAMES);
  return {
    prompt: `${name} makes $x$ chairs and $y$ tables in a week. There is time to make at most $${r.s}$ items in all, and there is wood for at most $${r.a}$ chairs and $${r.b}$ tables. The profit is \\$${p * 10} on a chair and \\$${q * 10} on a table. Find the greatest profit ${name} can make in a week.`,
    parts: [numPart(best * 10, { decimals: 2, tolerance: 0.011, label: '\\$' })],
    hints: [`The constraints are $x + y \\le ${r.s}$, $x \\le ${r.a}$ and $y \\le ${r.b}$, with $x \\ge 0$ and $y \\ge 0$. The profit is $P = ${p * 10}x + ${q * 10}y$.`, 'Find the corners of the feasible region and work out the profit at each one.'],
    solution: [
      `Constraints: ${constraints(r)}. Objective: $P = ${p * 10}x + ${q * 10}y$.`,
      `The corners are ${vs.map(([x, y]) => `$(${x}, ${y})$`).join(', ')}.`,
      ...vs.map((v) => `$(${v[0]}, ${v[1]})$: $P = ${p * 10} \\times ${v[0]} + ${q * 10} \\times ${v[1]} = ${value(v) * 10}$`),
      `The greatest profit is \\$${best * 10}, from $${at[0]}$ chairs and $${at[1]}$ tables.`,
    ],
  };
}

export const FORMULAE_SKILLS: SkillDef[] = [
  skill({ id: 'mx-change-subject', name: 'Changing the subject', description: 'Rearrange a formula to make a different letter its subject', outcomes: ['FV1'], lessonId: 'mx-21-1', format: 'mc', gen: changeSubject }),
  skill({ id: 'mx-subject-evaluate', name: 'Rearranging and substituting', description: 'Find a quantity that is not the subject of a formula by rearranging and substituting', outcomes: ['FV1'], lessonId: 'mx-21-1', gen: subjectEvaluate }),
  skill({ id: 'mx-joint-variation', name: 'Joint variation', description: 'Find and use the rule when one quantity varies with two others, directly or inversely', outcomes: ['FV2'], lessonId: 'mx-21-2', gen: jointVariation }),
  skill({ id: 'mx-partial-variation', name: 'Partial variation', description: 'Find and use the rule when a quantity is partly constant and partly varies with another', outcomes: ['FV2'], lessonId: 'mx-21-2', gen: partialVariation }),
  skill({ id: 'mx-lp-constraints', name: 'Constraints as inequalities', description: 'Write the constraints of a problem as inequalities, and test points against them', outcomes: ['FV3'], lessonId: 'mx-21-3', format: 'mc', gen: lpConstraints }),
  skill({ id: 'mx-lp-optimize', name: 'Greatest value in a region', description: 'Find the greatest value of a linear objective at the corners of a feasible region', outcomes: ['FV3'], lessonId: 'mx-21-3', gen: lpOptimize }),
];
