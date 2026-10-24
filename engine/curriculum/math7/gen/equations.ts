/** Math 7 Unit 6 — Expressions and Equations (PR3, PR4, PR5, PR6, PR7). */
import { fixedChoice, mc, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Part, PlaneFigure, PlanePoint, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Kiona', 'Liam', 'Mei', 'Tariq', 'Sofia', 'Aiden', 'Nadia', 'Ravi',
  'Chloé', 'Dakota', 'Hamid', 'Jasmine', 'Wei', 'Olivia', 'Kwame', 'Simran', 'Ethan', 'Fatima', 'Noah',
  'Leilani', 'Émilie', 'Tyler', 'Aaliyah', 'Connor', 'Anika', 'Gurpreet', 'Marcus', 'Ayesha', 'Owen',
  'Sienna', 'Jun', 'Malik', 'Harpreet', 'Isabelle', 'Talia', 'Yusuf', 'Rosalie', 'Nathan', 'Tanis',
];
const TOWNS = [
  'Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury',
  'Ashford', 'Clearwater', 'Oakridge', 'Millbrook', 'Northfield', 'Elmwood', 'Cedarvale', 'Kingsbridge',
];
/** Letters used for unknowns (no e, i, l or o, which look like numbers or constants). */
const LETTERS = ['x', 'n', 'a', 'm', 'k', 'p', 't', 'y', 'b', 'w', 'c', 'r', 'g', 'd'];

/** An integer inside maths, in brackets when negative: (-3). */
const br = (n: number) => (n < 0 ? `(${n})` : `${n}`);
/** a times v: 3n, or n when a = 1. */
const term = (a: number, v: string) => (a === 1 ? v : `${a}${v}`);
/** Whole-dollar amount for Markdown text (outside maths). */
const dollars = (x: number) => `\\$${x}`;
const OK = '✓';

/** A numeric answer part with an "x =" style label. */
const solvePart = (x: number, v: string, suffix?: string): Part => numPart(x, { label: `$${v} =$`, suffix });

// ---------------------------------------------------------------------------
// Figures: a pan balance with bags (squares) and marbles (dots)
// ---------------------------------------------------------------------------

type P = [number, number];
const r3 = (x: number) => Math.round(x * 1000) / 1000;
const BW = 16;
const PAN_L: [number, number] = [1.1, 6.9];
const PAN_R: [number, number] = [9.1, 14.9];
const BEAM_Y = 2.4;
const TRAY_Y = 2.55;
const BAG = 0.9;
const BAG_GAP = 0.2;
const DOT = 0.72;

interface PanLoad {
  bags: number;
  marbles: number;
}

/** Place the items for one pan; returns bag squares, marble centres and the top of the pile. */
function panItems(load: PanLoad, [x0, x1]: [number, number]) {
  const bags: P[][] = [];
  const dots: P[] = [];
  let x = x0 + 0.3;
  for (let i = 0; i < load.bags; i++) {
    const y = TRAY_Y + 0.08;
    bags.push([
      [x, y],
      [x + BAG, y],
      [x + BAG, y + BAG],
      [x, y + BAG],
      [x, y],
    ]);
    x += BAG + BAG_GAP;
  }
  const startX = x + (load.bags ? 0.2 : 0) + DOT / 2;
  const cols = Math.max(1, Math.floor((x1 - 0.3 - startX + DOT / 2) / DOT));
  for (let i = 0; i < load.marbles; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    dots.push([r3(startX + c * DOT), r3(TRAY_Y + 0.4 + r * DOT)]);
  }
  const top = Math.max(load.bags ? TRAY_Y + 0.08 + BAG : 0, dots.length ? dots[dots.length - 1][1] + 0.4 : 0, TRAY_Y + 0.5);
  return { bags, dots, top };
}

/** A level pan balance. Squares are bags that each hold the same number of marbles; dots are single marbles. */
export function balanceFigure(left: PanLoad, right: PanLoad, caption: string): PlaneFigure {
  const L = panItems(left, PAN_L);
  const R = panItems(right, PAN_R);
  const H = Math.max(6, Math.ceil(Math.max(L.top, R.top) + 0.6));
  const tray = ([a, b]: [number, number]): P[] => [
    [a - 0.2, TRAY_Y + 0.3],
    [a, TRAY_Y],
    [b, TRAY_Y],
    [b + 0.2, TRAY_Y + 0.3],
  ];
  const points: PlanePoint[] = [...L.dots, ...R.dots].map(([x, y]) => ({ x, y }));
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: BW, yMin: 0, yMax: H, step: Math.max(BW, H) },
    hideTickLabels: true,
    polylines: [
      { points: [[0.8, BEAM_Y], [BW - 0.8, BEAM_Y]], color: 'muted' },
      { points: [[BW / 2, BEAM_Y], [BW / 2 - 1, 0.5], [BW / 2 + 1, 0.5], [BW / 2, BEAM_Y]], color: 'muted', fill: true },
      { points: [[BW / 2 - 1.8, 0.5], [BW / 2 + 1.8, 0.5]], color: 'muted' },
      { points: tray(PAN_L), color: 'muted' },
      { points: tray(PAN_R), color: 'muted' },
      { points: [[(PAN_L[0] + PAN_L[1]) / 2, TRAY_Y], [(PAN_L[0] + PAN_L[1]) / 2, BEAM_Y]], color: 'muted' },
      { points: [[(PAN_R[0] + PAN_R[1]) / 2, TRAY_Y], [(PAN_R[0] + PAN_R[1]) / 2, BEAM_Y]], color: 'muted' },
      ...[...L.bags, ...R.bags].map((b) => ({ points: b, color: 'accent' as const, fill: true })),
    ],
    ...(points.length ? { points } : {}),
    caption,
  };
}

const BALANCE_KEY = 'Each square is a bag holding the same number of marbles. Each dot is one marble.';
const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

// ---------------------------------------------------------------------------
// Lesson 6.1 — Expressions and equations
// ---------------------------------------------------------------------------

/** A random expression (no equals sign) in the variable v. */
function someExpression(rng: Rng, v: string): string {
  const a = rng.int(2, 9);
  const b = rng.int(1, 15);
  return rng.pick([
    `${a}${v} + ${b}`,
    `${b} + ${a}${v}`,
    `${a}${v} - ${b}`,
    `${v} + ${b}`,
    `\\dfrac{${v}}{${a}}`,
    `${a}(${v} + ${b})`,
    `${a}${v}`,
    `${b + 10} - ${v}`,
    `${a} \\times ${b}`,
  ]);
}

/** A random equation in the variable v, with a whole-number solution. */
function someEquation(rng: Rng, v: string): string {
  const a = rng.int(2, 9);
  const x = rng.int(2, 12);
  const b = rng.int(1, 15);
  return rng.pick([
    `${a}${v} + ${b} = ${a * x + b}`,
    `${a * x + b} = ${a}${v} + ${b}`,
    `${v} + ${b} = ${x + b}`,
    `${a}${v} = ${a * x}`,
    `\\dfrac{${v}}{${a}} = ${x}`,
    a * x > b ? `${a}${v} - ${b} = ${a * x - b}` : `${a}${v} + ${b} = ${a * x + b}`,
    `${a} + ${b} = ${a + b}`,
    `${v} = ${x}`,
  ]);
}

function distinct(make: () => string, n: number, avoid: string[] = []): string[] {
  const out: string[] = [];
  for (let i = 0; i < 200 && out.length < n; i++) {
    const s = make();
    if (!out.includes(s) && !avoid.includes(s)) out.push(s);
  }
  return out;
}

const EXPR_DEF = 'An **expression** is a group of numbers, variables and operations, such as $3n + 5$. It has no equals sign.';
const EQ_DEF = 'An **equation** says that two expressions are equal, such as $3n + 5 = 11$. It always has an equals sign.';

interface ExprCtx {
  intro: (a: number, b: number) => string;
  v: string;
  coef: string;
  constant: string;
  variable: string;
  total: string;
  a: (rng: Rng) => number;
  b: (rng: Rng) => number;
  money: boolean;
  /** Sentence giving a total, for choosing an equation. */
  says: (name: string, t: number) => string;
  /** Range of variable values used for the total. */
  n: [number, number];
}

const EXPR_CTX: ExprCtx[] = [
  {
    intro: (a, b) => `At a bowling alley, renting shoes costs ${dollars(b)} and each game costs ${dollars(a)}. The expression $${a}g + ${b}$ gives the total cost, in dollars, for $g$ games.`,
    v: 'g', coef: 'the cost of one game', constant: 'the cost of renting shoes', variable: 'the number of games', total: 'the total cost',
    a: (r) => r.int(4, 8), b: (r) => r.int(2, 5), money: true, n: [2, 5],
    says: (name, t) => `${name} paid ${dollars(t)} in total`,
  },
  {
    intro: (a, b) => `A phone plan costs ${dollars(b)} each month plus ${dollars(a)} for each gigabyte (GB) of data used. The expression $${a}d + ${b}$ gives the monthly bill, in dollars, when $d$ GB are used.`,
    v: 'd', coef: 'the cost of each GB of data', constant: 'the monthly cost before any data is used', variable: 'the number of GB of data used', total: 'the monthly bill',
    a: (r) => r.pick([5, 8, 10, 12]), b: (r) => r.pick([20, 25, 30, 35]), money: true, n: [2, 9],
    says: (name, t) => `${name}’s bill was ${dollars(t)}`,
  },
  {
    intro: (a, b) => `A large pizza costs ${dollars(b)} plus ${dollars(a)} for each topping. The expression $${a}t + ${b}$ gives the cost, in dollars, of a large pizza with $t$ toppings.`,
    v: 't', coef: 'the cost of one topping', constant: 'the cost of a plain pizza', variable: 'the number of toppings', total: 'the cost of the pizza',
    a: (r) => r.int(2, 3), b: (r) => r.int(11, 16), money: true, n: [2, 5],
    says: (name, t) => `${name}’s pizza cost ${dollars(t)}`,
  },
  {
    intro: (a, b) => `A taxi charges ${dollars(b)} to start a trip plus ${dollars(a)} for each kilometre. The expression $${a}k + ${b}$ gives the fare, in dollars, for a trip of $k$ kilometres.`,
    v: 'k', coef: 'the cost of each kilometre', constant: 'the charge to start a trip', variable: 'the number of kilometres', total: 'the fare for the trip',
    a: (r) => r.int(2, 3), b: (r) => r.int(4, 6), money: true, n: [5, 15],
    says: (name, t) => `${name}’s fare was ${dollars(t)}`,
  },
  {
    intro: (a, b) => `A sunflower seedling is $${b}\\ \\text{cm}$ tall. It grows $${a}\\ \\text{cm}$ each week. The expression $${a}w + ${b}$ gives its height, in centimetres, after $w$ weeks.`,
    v: 'w', coef: 'how much the plant grows each week', constant: 'the height of the seedling at the start', variable: 'the number of weeks', total: 'the height of the plant',
    a: (r) => r.int(3, 9), b: (r) => r.int(2, 12), money: false, n: [3, 8],
    says: (_name, t) => `the plant is $${t}\\ \\text{cm}$ tall`,
  },
  {
    intro: (a, b) => `Renting a canoe at Willow Lake costs a ${dollars(b)} booking fee plus ${dollars(a)} for each hour. The expression $${a}h + ${b}$ gives the cost, in dollars, for $h$ hours.`,
    v: 'h', coef: 'the cost of each hour', constant: 'the booking fee', variable: 'the number of hours', total: 'the total cost',
    a: (r) => r.pick([12, 15, 18, 20]), b: (r) => r.pick([5, 8, 10]), money: true, n: [2, 6],
    says: (name, t) => `${name} paid ${dollars(t)}`,
  },
  {
    intro: (a, b) => `A savings account has ${dollars(b)} in it. Every week, ${dollars(a)} more is added. The expression $${a}w + ${b}$ gives the amount in the account, in dollars, after $w$ weeks.`,
    v: 'w', coef: 'the amount added each week', constant: 'the amount in the account at the start', variable: 'the number of weeks', total: 'the amount in the account',
    a: (r) => r.pick([5, 10, 15, 20]), b: (r) => r.pick([30, 40, 50, 60, 75]), money: true, n: [3, 12],
    says: (_name, t) => `the account holds ${dollars(t)}`,
  },
];

const expressionOrEquation = skill({
  id: 'm7-expression-or-equation',
  name: 'Expressions and equations',
  description: 'Tell an expression from an equation, and name the variable, coefficient and constant term.',
  outcomes: ['PR4'],
  lessonId: 'm7-6-1',
  format: 'mc',
  gen(rng, d): GenOutput {
    const v = rng.pick(LETTERS);
    if (d === 1) {
      const mode = rng.pick(['findEq', 'findExpr', 'which'] as const);
      if (mode === 'findEq' || mode === 'findExpr') {
        const wantEq = mode === 'findEq';
        const right = wantEq ? someEquation(rng, v) : someExpression(rng, v);
        const wrong = distinct(() => (wantEq ? someExpression(rng, v) : someEquation(rng, v)), 3);
        return {
          prompt: `Which of these is ${wantEq ? 'an equation' : 'an expression'}?`,
          parts: [{ answer: mc(rng, `$${right}$`, wrong.map((w) => `$${w}$`)) }],
          hints: ['Look for an equals sign.', `${EXPR_DEF} ${EQ_DEF}`],
          solution: [
            'An equation has an equals sign. An expression does not.',
            wantEq ? `Only $${right}$ has an equals sign.` : `Only $${right}$ has no equals sign. The others are all equations.`,
            `The answer is $${right}$.`,
          ],
        };
      }
      const isEq = rng.chance(0.5);
      const shown = isEq ? someEquation(rng, v) : someExpression(rng, v);
      return {
        prompt: `Is $${shown}$ an expression or an equation?`,
        parts: [{
          answer: fixedChoice([
            'An expression, because it has no equals sign',
            'An equation, because it has an equals sign',
            'An expression, because it has a variable',
            'An equation, because it has a variable',
          ], isEq ? 1 : 0),
        }],
        hints: ['Does it have an equals sign?', `${EXPR_DEF} ${EQ_DEF}`],
        solution: [
          'Having a variable does not decide it: both expressions and equations can have variables.',
          isEq ? `$${shown}$ has an equals sign, so it is an equation.` : `$${shown}$ has no equals sign, so it is an expression.`,
          `The answer is: ${isEq ? 'an equation, because it has an equals sign' : 'an expression, because it has no equals sign'}.`,
        ],
      };
    }
    if (d === 2) {
      const [a, b] = retry(() => [rng.int(2, 12), rng.int(1, 20)], ([p, q]) => p !== q);
      if (rng.chance(0.3)) {
        const correct = rng.chance(0.5) ? `${a}${v} + ${b}` : `${b} + ${a}${v}`;
        return {
          prompt: `Which expression has a coefficient of $${a}$ and a constant term of $${b}$?`,
          parts: [{ answer: mc(rng, `$${correct}$`, [`$${term(b, v)} + ${a}$`, `$${a}${v} = ${b}$`, `$${v} + ${a} + ${b}$`]) }],
          hints: ['The coefficient multiplies the variable. The constant term is a number on its own.', 'An expression has no equals sign.'],
          solution: [
            `The coefficient $${a}$ must be written right in front of the variable: $${a}${v}$.`,
            `The constant term $${b}$ is added on its own.`,
            `$${a}${v} = ${b}$ has an equals sign, so it is an equation, not an expression.`,
            `The answer is $${correct}$.`,
          ],
        };
      }
      const inEquation = rng.chance(0.35);
      const x = rng.int(2, 9);
      const e = rng.chance(0.6) ? `${a}${v} + ${b}` : `${b} + ${a}${v}`;
      const shown = inEquation ? `${e} = ${a * x + b}` : e;
      const ask = rng.pick(['coefficient', 'constant', 'variable'] as const);
      const askText = ask === 'coefficient' ? 'the coefficient' : ask === 'constant' ? `the constant term${inEquation ? ' on the left side' : ''}` : 'the variable';
      const correct = ask === 'coefficient' ? `$${a}$` : ask === 'constant' ? `$${b}$` : `$${v}$`;
      const others = ask === 'variable' ? [`$${a}$`, `$${b}$`, `$${a}${v}$`] : [`$${a}$`, `$${b}$`, `$${v}$`, `$${a + b}$`].filter((c) => c !== correct);
      return {
        prompt: `In the ${inEquation ? 'equation' : 'expression'} $${shown}$, what is ${askText}?`,
        parts: [{ answer: mc(rng, correct, others) }],
        hints: [
          'A variable is a letter that stands for a number.',
          'The coefficient is the number that multiplies the variable. The constant term is a number with no variable.',
        ],
        solution: [
          `The variable is the letter: $${v}$.`,
          `$${a}${v}$ means $${a} \\times ${v}$, so the coefficient is $${a}$.`,
          `$${b}$ has no variable, so it is the constant term.`,
          `The answer is ${correct}.`,
        ],
      };
    }
    // d === 3: an expression in a real situation
    const c = rng.pick(EXPR_CTX);
    const [a, b] = retry(() => [c.a(rng), c.b(rng)], ([p, q]) => p !== q);
    const n = rng.int(c.n[0], c.n[1]);
    const t = a * n + b;
    const name = rng.pick(NAMES);
    const ask = rng.pick(['coef', 'constant', 'variable'] as const);
    const asked = ask === 'coef' ? `the $${a}$` : ask === 'constant' ? `the $${b}$` : `$${c.v}$`;
    const meaning = ask === 'coef' ? c.coef : ask === 'constant' ? c.constant : c.variable;
    const eq = `${a}${c.v} + ${b} = ${t}`;
    return {
      prompt: `${c.intro(a, b)}\n\n(a) In the expression, what does ${asked} represent?\n\n(b) Which equation says that ${c.says(name, t)}?`,
      parts: [
        { label: '(a)', answer: mc(rng, cap(meaning), [c.coef, c.constant, c.variable, c.total].filter((m) => m !== meaning).map(cap)) },
        { label: '(b)', answer: mc(rng, `$${eq}$`, [`$${b}${c.v} + ${a} = ${t}$`, `$${a}${c.v} + ${b} + ${t}$`, `$${a}(${c.v} + ${b}) = ${t}$`]) },
      ],
      hints: [
        'The coefficient multiplies the variable, so it is the amount for each one. The constant term is added once.',
        `An equation sets the expression equal to a value: expression $=$ total.`,
      ],
      solution: [
        `In $${a}${c.v} + ${b}$, the variable $${c.v}$ is ${c.variable}. The coefficient $${a}$ is ${c.coef}, and the constant term $${b}$ is ${c.constant}.`,
        `(a) ${cap(asked)} represents ${meaning}.`,
        `(b) Set the expression equal to the total: $${eq}$. This is an equation because it has an equals sign; $${a}${c.v} + ${b} + ${t}$ is only an expression.`,
        `The answers are (a) ${meaning} and (b) $${eq}$.`,
      ],
    };
  },
});

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Evaluate steps for a one-variable expression. */
interface EvalCase {
  expr: string;
  value: number;
  steps: string[];
}

function evalCase(rng: Rng, d: Difficulty, v: string): EvalCase {
  const x = d === 1 ? rng.int(2, 10) : rng.int(3, 15);
  const sub = `Replace $${v}$ with $${x}$.`;
  if (d === 1) {
    const kind = rng.weighted([['ax+b', 3], ['ax-b', 2], ['b+ax', 2], ['ax', 1]] as const);
    const a = rng.int(2, 9);
    if (kind === 'ax') {
      return { expr: `${a}${v}`, value: a * x, steps: [sub, `$${a}${v} = ${a} \\times ${x} = ${a * x}$`] };
    }
    if (kind === 'ax-b') {
      const b = rng.int(1, Math.min(15, a * x - 1));
      return {
        expr: `${a}${v} - ${b}`, value: a * x - b,
        steps: [sub, `$${a}${v} - ${b} = ${a} \\times ${x} - ${b}$`, `Multiply first: $${a * x} - ${b}$`, `Then subtract: $${a * x - b}$`],
      };
    }
    const b = rng.int(1, 15);
    if (kind === 'b+ax') {
      return {
        expr: `${b} + ${a}${v}`, value: a * x + b,
        steps: [sub, `$${b} + ${a}${v} = ${b} + ${a} \\times ${x}$`, `Multiply first: $${b} + ${a * x}$`, `Then add: $${a * x + b}$`],
      };
    }
    return {
      expr: `${a}${v} + ${b}`, value: a * x + b,
      steps: [sub, `$${a}${v} + ${b} = ${a} \\times ${x} + ${b}$`, `Multiply first: $${a * x} + ${b}$`, `Then add: $${a * x + b}$`],
    };
  }
  const kind = rng.pick(['a(x+b)', 'a(x-b)', 'x/a+b', '(x+b)/a', 'c-ax', 'big'] as const);
  if (kind === 'a(x+b)') {
    const a = rng.int(2, 8);
    const b = rng.int(1, 9);
    return {
      expr: `${a}(${v} + ${b})`, value: a * (x + b),
      steps: [sub, `$${a}(${v} + ${b}) = ${a}(${x} + ${b})$`, `Brackets first: $${a} \\times ${x + b}$`, `Then multiply: $${a * (x + b)}$`],
    };
  }
  if (kind === 'a(x-b)') {
    const a = rng.int(2, 8);
    const b = rng.int(1, x - 1);
    return {
      expr: `${a}(${v} - ${b})`, value: a * (x - b),
      steps: [sub, `$${a}(${v} - ${b}) = ${a}(${x} - ${b})$`, `Brackets first: $${a} \\times ${x - b}$`, `Then multiply: $${a * (x - b)}$`],
    };
  }
  if (kind === 'x/a+b') {
    const a = rng.int(2, 6);
    const q = rng.int(2, 9);
    const b = rng.int(1, 15);
    const xx = a * q;
    return {
      expr: `\\dfrac{${v}}{${a}} + ${b}`, value: q + b,
      steps: [`Replace $${v}$ with $${xx}$.`, `$\\dfrac{${v}}{${a}} + ${b} = \\dfrac{${xx}}{${a}} + ${b}$`, `Divide first: $${q} + ${b}$`, `Then add: $${q + b}$`],
    };
  }
  if (kind === '(x+b)/a') {
    const a = rng.int(2, 6);
    const b = rng.int(1, 12);
    const xx = retry(() => rng.int(2, 30), (t) => (t + b) % a === 0 && t !== b);
    const q = (xx + b) / a;
    return {
      expr: `\\dfrac{${v} + ${b}}{${a}}`, value: q,
      steps: [`Replace $${v}$ with $${xx}$.`, `$\\dfrac{${v} + ${b}}{${a}} = \\dfrac{${xx} + ${b}}{${a}}$`, `The fraction bar groups the top, so add first: $\\dfrac{${xx + b}}{${a}}$`, `Then divide: $${q}$`],
    };
  }
  if (kind === 'c-ax') {
    const a = rng.int(2, 6);
    const c = a * x + rng.int(3, 30);
    return {
      expr: `${c} - ${a}${v}`, value: c - a * x,
      steps: [sub, `$${c} - ${a}${v} = ${c} - ${a} \\times ${x}$`, `Multiply first: $${c} - ${a * x}$`, `Then subtract: $${c - a * x}$`],
    };
  }
  const a = rng.int(6, 15);
  const b = rng.int(10, Math.min(60, a * x - 1));
  return {
    expr: `${a}${v} - ${b}`, value: a * x - b,
    steps: [sub, `$${a}${v} - ${b} = ${a} \\times ${x} - ${b}$`, `Multiply first: $${a * x} - ${b}$`, `Then subtract: $${a * x - b}$`],
  };
}

/** The value of v used in an evalCase (read back from its first step). */
function valueShown(c: EvalCase): string {
  return /with \$(\d+)\$/.exec(c.steps[0])![1];
}

interface FormulaCase {
  prompt: string;
  value: number;
  suffix?: string;
  label?: string;
  steps: string[];
  say: string;
}

const FORMULAS: Array<(rng: Rng, name: string) => FormulaCase> = [
  (rng, name) => {
    const t = rng.int(2, 9);
    const h = rng.int(0, 5);
    const f = rng.int(1, 7);
    const P = 2 * t + 3 * h + f;
    return {
      prompt: `In basketball, a basket can be worth 2 or 3 points, and a free throw is worth 1 point. The formula $P = 2t + 3h + f$ gives a player’s points, where $t$ is the number of 2-point baskets, $h$ is the number of 3-point baskets and $f$ is the number of free throws. In one game, ${name} made ${plural(t, '2-point basket')}, ${plural(h, '3-point basket')} and ${plural(f, 'free throw')}. How many points did ${name} score?`,
      value: P, suffix: 'points',
      steps: [`Substitute $t = ${t}$, $h = ${h}$ and $f = ${f}$: $P = 2(${t}) + 3(${h}) + ${f}$`, `Multiply first: $P = ${2 * t} + ${3 * h} + ${f}$`, `Add: $P = ${P}$`],
      say: `${name} scored $${P}$ points.`,
    };
  },
  (rng, _name) => {
    const w = rng.int(4, 18);
    const t = rng.int(1, 6);
    const team = rng.pick(['Riverton Rebels', 'Lakeside Kodiaks', 'Brookfield Bandits', 'Hillcrest Hawks', 'Pinewood Eagles', 'Westbury Dragons']);
    const P = 2 * w + t;
    return {
      prompt: `In a minor hockey league, a team gets 2 points for a win, 1 point for a tie and 0 points for a loss. The formula $P = 2w + t$ gives a team’s points, where $w$ is the number of wins and $t$ is the number of ties. The ${team} have ${plural(w, 'win')}, ${plural(t, 'tie')} and ${plural(rng.int(2, 10), 'loss', 'losses')}. How many points do they have?`,
      value: P, suffix: 'points',
      steps: [`Losses are worth 0 points, so they do not appear in the formula.`, `Substitute $w = ${w}$ and $t = ${t}$: $P = 2(${w}) + ${t}$`, `Multiply first, then add: $P = ${2 * w} + ${t} = ${P}$`],
      say: `The ${team} have $${P}$ points.`,
    };
  },
  (rng, name) => {
    const l = rng.int(8, 30);
    const w = rng.int(3, l - 2);
    const thing = rng.pick(['a rectangular garden', 'a rectangular poster', 'a rectangular dog run', 'a rectangular sandbox']);
    const u = thing.includes('poster') ? 'cm' : 'm';
    const P = 2 * l + 2 * w;
    return {
      prompt: `${name} is putting a border around ${thing} that is $${l}\\ \\text{${u}}$ long and $${w}\\ \\text{${u}}$ wide. The perimeter of a rectangle is $P = 2l + 2w$. What is the perimeter?`,
      value: P, suffix: u,
      steps: [`Substitute $l = ${l}$ and $w = ${w}$: $P = 2(${l}) + 2(${w})$`, `Multiply first: $P = ${2 * l} + ${2 * w}$`, `Add: $P = ${P}$`],
      say: `The perimeter is $${P}\\ \\text{${u}}$.`,
    };
  },
  (rng, name) => {
    const s = rng.int(18, 32);
    const per = rng.pick([8, 10, 12, 15]);
    const bus = rng.pick([150, 200, 250, 300]);
    const place = rng.pick(['a dinosaur museum', 'the city zoo', 'a science centre', 'a historic site']);
    const C = per * s + bus;
    return {
      prompt: `${name}’s class is planning a trip to ${place}. The cost, in dollars, is given by $C = ${per}s + ${bus}$, where $s$ is the number of students. What is the cost for ${s} students?`,
      value: C, label: 'Cost: \\$',
      steps: [`Substitute $s = ${s}$: $C = ${per}(${s}) + ${bus}$`, `Multiply first: $C = ${per * s} + ${bus}$`, `Add: $C = ${C}$`],
      say: `The trip costs ${dollars(C)}.`,
    };
  },
  (rng, _name) => {
    const n = rng.int(6, 20);
    const P = 2 * n + 2;
    return {
      prompt: `Square tables are pushed together in a row for a school banquet. The expression $2n + 2$ gives the number of people who can sit at $n$ tables. How many people can sit at ${n} tables?`,
      value: P, suffix: 'people',
      steps: [`Substitute $n = ${n}$: $2(${n}) + 2$`, `Multiply first: $${2 * n} + 2$`, `Add: $${P}$`],
      say: `$${P}$ people can sit at ${n} tables.`,
    };
  },
  (rng, name) => {
    const r = rng.pick([12, 14, 15, 16, 18]);
    const h = rng.int(3, 9);
    const b = rng.pick([10, 15, 20, 25]);
    const pay = r * h + b;
    return {
      prompt: `${name} babysits on weekends. ${name}’s pay, in dollars, is $P = ${r}h + ${b}$, where $h$ is the number of hours and ${dollars(b)} is a bonus for making dinner. How much does ${name} earn for ${plural(h, 'hour')}?`,
      value: pay, label: 'Pay: \\$',
      steps: [`Substitute $h = ${h}$: $P = ${r}(${h}) + ${b}$`, `Multiply first: $P = ${r * h} + ${b}$`, `Add: $P = ${pay}$`],
      say: `${name} earns ${dollars(pay)}.`,
    };
  },
];

const VAR_PAIRS: Array<[string, string]> = [['a', 'b'], ['m', 'n'], ['x', 'y'], ['p', 'q'], ['s', 't'], ['j', 'k']];

const evaluateExpression = skill({
  id: 'm7-evaluate-expression',
  name: 'Evaluating expressions',
  description: 'Substitute whole-number values for one or two variables and evaluate the expression using the order of operations.',
  outcomes: ['PR5'],
  lessonId: 'm7-6-1',
  gen(rng, d): GenOutput {
    const hints = ['Replace each variable with its value. Remember that $3n$ means $3 \\times n$.', 'Use the order of operations: brackets first, then multiply and divide, then add and subtract.'];
    if (d < 3) {
      const v = rng.pick(LETTERS);
      const c = evalCase(rng, d, v);
      return {
        prompt: `Evaluate $${c.expr}$ when $${v} = ${valueShown(c)}$.`,
        parts: [numPart(c.value)],
        hints,
        solution: [...c.steps, `The value of the expression is $${c.value}$.`],
      };
    }
    if (rng.chance(0.45)) {
      const [u, w] = rng.pick(VAR_PAIRS);
      const kind = rng.pick(['sum', 'diff', 'prod', 'mean'] as const);
      let x = rng.int(2, 12);
      let y = rng.int(2, 12);
      let expr: string;
      let value: number;
      let steps: string[];
      const subst = `Replace $${u}$ with $${x}$ and $${w}$ with $${y}$.`;
      if (kind === 'sum') {
        const p = rng.int(2, 9);
        const q = rng.int(2, 9);
        expr = `${p}${u} + ${q}${w}`;
        value = p * x + q * y;
        steps = [subst, `$${p} \\times ${x} + ${q} \\times ${y}$`, `Multiply first: $${p * x} + ${q * y}$`, `Add: $${value}$`];
      } else if (kind === 'diff') {
        const p = rng.int(3, 9);
        const q = rng.int(2, p - 1);
        [x, y] = retry(() => [rng.int(2, 12), rng.int(2, 12)], ([s, t]) => p * s > q * t);
        expr = `${p}${u} - ${q}${w}`;
        value = p * x - q * y;
        steps = [`Replace $${u}$ with $${x}$ and $${w}$ with $${y}$.`, `$${p} \\times ${x} - ${q} \\times ${y}$`, `Multiply first: $${p * x} - ${q * y}$`, `Subtract: $${value}$`];
      } else if (kind === 'prod') {
        const c = rng.int(1, 20);
        expr = `${u}${w} + ${c}`;
        value = x * y + c;
        steps = [subst, `$${u}${w}$ means $${u} \\times ${w}$: $${x} \\times ${y} + ${c}$`, `Multiply first: $${x * y} + ${c}$`, `Add: $${value}$`];
      } else {
        if ((x + y) % 2 === 1) y += 1;
        expr = `\\dfrac{${u} + ${w}}{2}`;
        value = (x + y) / 2;
        steps = [`Replace $${u}$ with $${x}$ and $${w}$ with $${y}$.`, `$\\dfrac{${x} + ${y}}{2}$`, `The fraction bar groups the top, so add first: $\\dfrac{${x + y}}{2}$`, `Divide: $${value}$`];
      }
      return {
        prompt: `Evaluate $${expr}$ when $${u} = ${x}$ and $${w} = ${y}$.`,
        parts: [numPart(value)],
        hints: ['Replace each variable with its own value.', hints[1]],
        solution: [...steps, `The value of the expression is $${value}$.`],
      };
    }
    const f = rng.pick(FORMULAS)(rng, rng.pick(NAMES));
    return {
      prompt: f.prompt,
      parts: [numPart(f.value, { suffix: f.suffix, label: f.label })],
      hints: ['Find the value of each variable in the story, then substitute.', hints[1]],
      solution: [...f.steps, f.say],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 6.2 — Preserving equality
// ---------------------------------------------------------------------------

function balanceSetup(rng: Rng, minBags = 1) {
  return retry(
    () => {
      const k = rng.int(minBags, 3);
      const x = rng.int(2, 6);
      const m = rng.int(1, k === 3 ? 6 : 8);
      return { k, x, m, n: k * x + m };
    },
    (s) => s.n <= 24 && s.n > s.m + 1 && s.m !== s.k,
  );
}

const preserveEquality = skill({
  id: 'm7-preserve-equality',
  name: 'Preserving equality',
  description: 'Keep a pan balance or an equation balanced by doing the same thing to both sides, and find a step that breaks the balance.',
  outcomes: ['PR3'],
  lessonId: 'm7-6-2',
  format: 'mc',
  gen(rng, d): GenOutput {
    if (d === 1) {
      const mode = rng.pick(['balance', 'equation', 'number'] as const);
      if (mode === 'balance') {
        const { k, x, m, n } = balanceSetup(rng);
        const j = rng.intExcept(1, 5, [x]);
        const removeEach = rng.chance(0.5);
        const right = removeEach ? `Remove ${plural(m, 'marble')} from each pan` : `Add ${plural(j, 'marble')} to each pan`;
        const wrong = removeEach
          ? [`Remove ${plural(m, 'marble')} from the left pan only`, `Remove ${plural(m, 'marble')} from the left pan and add ${plural(m, 'marble')} to the right pan`, `Remove 1 bag from the left pan and 1 marble from the right pan`]
          : [`Add ${plural(j, 'marble')} to the right pan only`, `Add ${plural(j, 'marble')} to the left pan and remove ${plural(j, 'marble')} from the right pan`, `Add 1 bag to the left pan and ${plural(j, 'marble')} to the right pan`];
        return {
          prompt: `The pan balance is level. The left pan holds ${plural(k, 'bag')} and ${plural(m, 'marble')}. The right pan holds ${plural(n, 'marble')}. Every bag holds the same number of marbles.\n\nWhich change keeps the pan balance level?`,
          figure: balanceFigure({ bags: k, marbles: m }, { bags: 0, marbles: n }, BALANCE_KEY),
          parts: [{ answer: mc(rng, right, wrong) }],
          hints: ['A balance stays level when both pans gain or lose the same amount.', 'A change to only one pan, or opposite changes to the two pans, tips the balance.'],
          solution: [
            'Both pans have the same mass now. To keep them equal, change both pans in exactly the same way.',
            removeEach ? `Removing ${plural(m, 'marble')} from each pan takes the same mass off both sides.` : `Adding ${plural(j, 'marble')} to each pan puts the same mass on both sides.`,
            'Every other choice changes one pan more than the other, so the balance would tip. (A bag is not the same as 1 marble.)',
            `The answer is: ${right}.`,
          ],
        };
      }
      if (mode === 'equation') {
        const v = rng.pick(LETTERS);
        const a = rng.int(2, 12);
        const b = a + rng.int(3, 15);
        const eq = `${v} + ${a} = ${b}`;
        const op = rng.pick(['sub', 'add', 'mul'] as const);
        const j = rng.intExcept(2, 9, [a]);
        const right = op === 'sub' ? `Subtract $${a}$ from both sides` : op === 'add' ? `Add $${j}$ to both sides` : `Multiply both sides by $${j}$`;
        const wrong = op === 'sub'
          ? [`Subtract $${a}$ from the left side only`, `Subtract $${a}$ from the left side and add $${a}$ to the right side`, `Subtract $${a}$ from the right side only`]
          : op === 'add'
            ? [`Add $${j}$ to the left side only`, `Add $${j}$ to the left side and subtract $${j}$ from the right side`, `Add $${j}$ to the left side and $${2 * j}$ to the right side`]
            : [`Multiply the left side by $${j}$ only`, `Multiply the left side by $${j}$ and add $${j}$ to the right side`, `Multiply the right side by $${j}$ only`];
        return {
          prompt: `Which change keeps the equation $${eq}$ balanced?`,
          parts: [{ answer: mc(rng, right, wrong) }],
          hints: ['Think of the equation as a pan balance. The equals sign is the middle of the balance.', 'Whatever you do to one side, you must do to the other side.'],
          solution: [
            'An equation stays balanced (true) when you do the same operation to both sides.',
            `“${right}” changes both sides in the same way, so the two sides stay equal.`,
            'The other changes treat the sides differently, so the sides would no longer be equal.',
            `The answer is: ${right}.`,
          ],
        };
      }
      // A true number sentence.
      const op = rng.pick(['add', 'sub', 'mul', 'div'] as const);
      const p = rng.int(3, 12);
      const q = op === 'div' ? (p % 2 === 0 ? 2 * rng.int(1, 5) : 2 * rng.int(2, 5) - 1) : rng.int(2, 10);
      const s = p + q;
      const k = op === 'div' ? 2 : rng.int(2, 6);
      const L = `${p} + ${q}`;
      let right: string;
      let wrong: string[];
      let check: string;
      if (op === 'add') {
        right = `${L} + ${k} = ${s} + ${k}`;
        wrong = [`${L} + ${k} = ${s}`, `${L} + ${k} = ${s} - ${k}`, `${L} = ${s} + ${k}`];
        check = `Left side: $${L} + ${k} = ${s + k}$. Right side: $${s} + ${k} = ${s + k}$.`;
      } else if (op === 'sub') {
        right = `${L} - ${k} = ${s} - ${k}`;
        wrong = [`${L} - ${k} = ${s}`, `${L} - ${k} = ${s} + ${k}`, `${L} = ${s} - ${k}`];
        check = `Left side: $${L} - ${k} = ${s - k}$. Right side: $${s} - ${k} = ${s - k}$.`;
      } else if (op === 'mul') {
        right = `(${L}) \\times ${k} = ${s} \\times ${k}`;
        wrong = [`${p} + ${q} \\times ${k} = ${s} \\times ${k}`, `(${L}) \\times ${k} = ${s} + ${k}`, `(${L}) \\times ${k} = ${s}`];
        check = `Left side: $(${L}) \\times ${k} = ${s} \\times ${k} = ${s * k}$. Right side: $${s} \\times ${k} = ${s * k}$.`;
      } else {
        right = `(${L}) \\div ${k} = ${s} \\div ${k}`;
        wrong = [`${p} + ${q} \\div ${k} = ${s} \\div ${k}`, `(${L}) \\div ${k} = ${s}`, `(${L}) \\div ${k} = ${s} - ${k}`];
        check = `Left side: $(${L}) \\div ${k} = ${s} \\div ${k} = ${s / k}$. Right side: $${s} \\div ${k} = ${s / k}$.`;
      }
      return {
        prompt: `The equation $${L} = ${s}$ is balanced: both sides equal $${s}$. Which equation is still balanced?`,
        parts: [{ answer: mc(rng, `$${right}$`, wrong.map((w) => `$${w}$`)) }],
        hints: ['Work out the value of each side of every choice.', 'The equation stays balanced only when the same operation is done to the whole of both sides.'],
        solution: [
          `In $${right}$, the same operation is done to the whole of both sides.`,
          `${check} Both sides are equal.`,
          'In the other choices, the two sides were changed in different ways, so they are no longer equal.',
          `The answer is $${right}$.`,
        ],
      };
    }
    if (d === 2) {
      const v = rng.pick(LETTERS);
      const mode = rng.pick(['result', 'whichOp', 'firstStep'] as const);
      if (mode === 'result' || mode === 'whichOp') {
        const kind = rng.pick(['sub', 'div', 'mul', 'add'] as const);
        const x = rng.int(2, 12);
        let start: string;
        let end: string;
        let op: string;
        let wrongEnds: string[];
        let wrongOps: string[];
        if (kind === 'sub') {
          const a = rng.int(2, 9);
          const b = rng.intExcept(2, 15, [a]);
          const c = a * x + b;
          start = `${a}${v} + ${b} = ${c}`;
          end = `${a}${v} = ${c - b}`;
          op = `Subtract $${b}$ from both sides`;
          wrongEnds = [`${a}${v} = ${c + b}`, `${a}${v} + ${b} = ${c - b}`, `${v} = ${c - b}`];
          wrongOps = [`Add $${b}$ to both sides`, `Subtract $${c}$ from both sides`, `Subtract $${b}$ from the left side only`];
        } else if (kind === 'div') {
          const a = rng.int(2, 9);
          const c = a * x;
          start = `${a}${v} = ${c}`;
          end = `${v} = ${x}`;
          op = `Divide both sides by $${a}$`;
          wrongEnds = [`${v} = ${c - a}`, `${v} = ${c * a}`, `${a}${v} = ${x}`];
          wrongOps = [`Subtract $${a}$ from both sides`, `Multiply both sides by $${a}$`, `Divide the left side by $${a}$ only`];
        } else if (kind === 'mul') {
          const a = rng.int(2, 6);
          start = `\\dfrac{${v}}{${a}} = ${x}`;
          end = `${v} = ${a * x}`;
          op = `Multiply both sides by $${a}$`;
          wrongEnds = [`${v} = ${x + a}`, `\\dfrac{${v}}{${a}} = ${a * x}`, `${v} = ${x}`];
          wrongOps = [`Divide both sides by $${a}$`, `Add $${a}$ to both sides`, `Multiply the left side by $${a}$ only`];
        } else {
          const a = rng.int(2, 12);
          const b = rng.int(3, 20);
          start = `${v} - ${a} = ${b}`;
          end = `${v} = ${b + a}`;
          op = `Add $${a}$ to both sides`;
          wrongEnds = [`${v} = ${b - a}`, `${v} - ${a} = ${b + a}`, `${v} = ${b}`];
          wrongOps = [`Subtract $${a}$ from both sides`, `Add $${b}$ to both sides`, `Add $${a}$ to the left side only`];
        }
        if (mode === 'result') {
          return {
            prompt: `Start with the equation $${start}$. ${op}. Which equation do you get?`,
            parts: [{ answer: mc(rng, `$${end}$`, wrongEnds.map((w) => `$${w}$`)) }],
            hints: ['Apply the operation to the left side, then to the right side.', 'Simplify each side after the operation.'],
            solution: [
              `${op}.`,
              `Left side: $${start.split(' = ')[0]}$ becomes $${end.split(' = ')[0]}$. Right side: $${start.split(' = ')[1]}$ becomes $${end.split(' = ')[1]}$.`,
              `The answer is $${end}$.`,
            ],
          };
        }
        return {
          prompt: `Which step changes $${start}$ into $${end}$ and keeps the equation balanced?`,
          parts: [{ answer: mc(rng, op, wrongOps) }],
          hints: ['Compare the two equations. What was undone on the left side?', 'The same operation must be done to both sides.'],
          solution: [
            `To get from $${start}$ to $${end}$, the operation on the left side must be undone with its inverse (opposite).`,
            `${op}: this does the same thing to both sides, so the equation stays balanced.`,
            `The answer is: ${op}.`,
          ],
        };
      }
      // Which written step keeps the equation balanced?
      const a = rng.int(2, 9);
      const x = rng.int(2, 10);
      const b = rng.intExcept(1, 15, [a]);
      const c = a * x + b;
      const right = `${a}${v} + ${b} - ${b} = ${c} - ${b}`;
      return {
        prompt: `Which step keeps the equation $${a}${v} + ${b} = ${c}$ balanced?`,
        parts: [{ answer: mc(rng, `$${right}$`, [`$${a}${v} + ${b} - ${b} = ${c}$`, `$${a}${v} + ${b} - ${b} = ${c} + ${b}$`, `$\\dfrac{${a}${v}}{${a}} + ${b} = \\dfrac{${c}}{${a}}$`]) }],
        hints: ['Check that each side has had exactly the same thing done to it.', 'Dividing only one term on a side does not divide the whole side.'],
        solution: [
          `In $${right}$, $${b}$ is subtracted from the whole left side and from the whole right side.`,
          `The other choices subtract from one side only, subtract on one side but add on the other, or divide only part of the left side.`,
          `The answer is $${right}$.`,
        ],
      };
    }
    // d === 3
    if (rng.chance(0.3)) {
      const { k, x, m, n } = balanceSetup(rng, 2);
      const right = `Remove ${plural(m, 'marble')} from each pan. Then split each pan into ${k} equal groups and keep one group.`;
      return {
        prompt: `The pan balance is level. The left pan holds ${k} bags and ${plural(m, 'marble')}. The right pan holds ${n} marbles. Every bag holds the same number of marbles.\n\nWhich plan keeps the balance level and shows how many marbles are in one bag?`,
        figure: balanceFigure({ bags: k, marbles: m }, { bags: 0, marbles: n }, BALANCE_KEY),
        parts: [{
          answer: mc(rng, right, [
            `Remove ${plural(m, 'marble')} from the left pan only. Then split each pan into ${k} equal groups and keep one group.`,
            `Remove ${plural(m, 'marble')} from each pan. Then remove ${k} marbles from each pan.`,
            `Add ${plural(m, 'marble')} to each pan. Then split each pan into ${k} equal groups and keep one group.`,
          ]),
        }],
        hints: ['First get the bags alone on one pan, without tipping the balance.', 'Then share each pan into equal groups, one group for each bag.'],
        solution: [
          `As an equation: $${k}x + ${m} = ${n}$, where $x$ is the number of marbles in one bag.`,
          `Remove ${plural(m, 'marble')} from each pan: $${k}x = ${n - m}$. The balance stays level.`,
          `Split each pan into ${k} equal groups: $x = ${n - m} \\div ${k} = ${x}$. Each bag holds ${plural(x, 'marble')}.`,
          `The answer is: ${right}`,
        ],
      };
    }
    // Find the step with a mistake in a worked solution.
    const v = rng.pick(LETTERS);
    const name = rng.pick(NAMES);
    const err = rng.pick(['s1-one', 's1-add', 's3-one', 's3-mul'] as const);
    const { a, b, x } = retry(
      () => ({ a: rng.int(2, 6), b: rng.int(2, 15), x: rng.int(2, 10) }),
      ({ a, b }) => a !== b && (err !== 's1-one' || b % a === 0) && (err !== 's1-add' || (2 * b) % a === 0),
    );
    const c = a * x + b;
    const L = `${a}${v} + ${b} - ${b}`;
    const good = [`${L} = ${c} - ${b}`, `${a}${v} = ${c - b}`, `\\dfrac{${a}${v}}{${a}} = \\dfrac{${c - b}}{${a}}`, `${v} = ${x}`];
    let shown: string[];
    let bad: number;
    if (err === 's1-one') {
      shown = [`${L} = ${c}`, `${a}${v} = ${c}`, `\\dfrac{${a}${v}}{${a}} = \\dfrac{${c}}{${a}}`, `${v} = ${c / a}`];
      bad = 0;
    } else if (err === 's1-add') {
      shown = [`${L} = ${c} + ${b}`, `${a}${v} = ${c + b}`, `\\dfrac{${a}${v}}{${a}} = \\dfrac{${c + b}}{${a}}`, `${v} = ${(c + b) / a}`];
      bad = 0;
    } else if (err === 's3-one') {
      shown = [good[0], good[1], `\\dfrac{${a}${v}}{${a}} = ${c - b}`, `${v} = ${c - b}`];
      bad = 2;
    } else {
      shown = [good[0], good[1], `\\dfrac{${a}${v}}{${a}} = ${c - b} \\times ${a}`, `${v} = ${(c - b) * a}`];
      bad = 2;
    }
    const fix = good[bad];
    const fixWrong = bad === 0
      ? [`${L} = ${c}`, `${L} = ${c} + ${b}`, `\\dfrac{${a}${v}}{${a}} + ${b} = \\dfrac{${c}}{${a}}`]
      : [`\\dfrac{${a}${v}}{${a}} = ${c - b}`, `\\dfrac{${a}${v}}{${a}} = ${c - b} \\times ${a}`, `${a}${v} - ${a} = ${c - b} - ${a}`];
    const lines = shown.map((s, i) => `Step ${i + 1}: $${s}$`).join('\n\n');
    return {
      prompt: `${name} solved $${a}${v} + ${b} = ${c}$ like this:\n\n${lines}\n\n(a) In which step did ${name} first make a mistake?\n\n(b) What should that step say?`,
      parts: [
        { label: '(a)', answer: fixedChoice(['Step 1', 'Step 2', 'Step 3', 'Step 4'], bad) },
        { label: '(b)', answer: mc(rng, `$${fix}$`, fixWrong.map((w) => `$${w}$`)) },
      ],
      hints: ['Check each step: was the same operation done to the whole of both sides?', `Substitute ${name}’s answer into $${a}${v} + ${b} = ${c}$. If it does not work, look for the step where the two sides were treated differently.`],
      solution: [
        `Check ${name}’s answer: $${a}(${shown[3].split(' = ')[1]}) + ${b} = ${a * Number(shown[3].split(' = ')[1]) + b}$, not $${c}$. So there is a mistake.`,
        bad === 0
          ? `In Step 1, ${name} subtracted $${b}$ on the left side but ${err === 's1-one' ? 'did not change the right side' : `added $${b}$ on the right side`}. Both sides must have $${b}$ subtracted.`
          : `In Step 3, ${name} divided the left side by $${a}$ but ${err === 's3-one' ? 'did not divide the right side' : `multiplied the right side by $${a}$`}. Both sides must be divided by $${a}$.`,
        `Step ${bad + 1} should be $${fix}$.`,
        `A correct solution: $${good[0]}$, so $${good[1]}$. Then $${good[2]}$, so $${good[3]}$. Check: $${a}(${x}) + ${b} = ${c}$ ${OK}`,
        `The answers are (a) Step ${bad + 1} and (b) $${fix}$.`,
      ],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 6.3 — One-step equations
// ---------------------------------------------------------------------------

type Op1 = 'add' | 'sub' | 'mul' | 'div';

/** The equation in LaTeX. For 'add', a may be negative: x + (-6) = 3. */
function oneStepTex(op: Op1, v: string, a: number, b: number, flip = false): string {
  switch (op) {
    case 'add':
      return flip ? `${br(a)} + ${v} = ${b}` : `${v} + ${br(a)} = ${b}`;
    case 'sub':
      return `${v} - ${a} = ${b}`;
    case 'mul':
      return `${a}${v} = ${b}`;
    case 'div':
      return `\\dfrac{${v}}{${a}} = ${b}`;
  }
}

/** Worked steps for a one-step equation, naming the inverse operation and checking by substitution. */
function oneStepSteps(op: Op1, v: string, a: number, b: number, x: number, flip = false): string[] {
  switch (op) {
    case 'add':
      if (a < 0) {
        return [
          `$${br(a)}$ is added to $${v}$. To undo it, subtract $${br(a)}$ from both sides.`,
          `$${v} = ${br(b)} - ${br(a)} = ${br(b)} + ${-a} = ${x}$`,
          `Check: $${flip ? `${br(a)} + ${br(x)}` : `${br(x)} + ${br(a)}`} = ${b}$ ${OK}`,
        ];
      }
      return [
        `$${a}$ is added to $${v}$. To undo it, subtract $${a}$ from both sides.`,
        `$${v} = ${br(b)} - ${a} = ${x}$`,
        `Check: $${flip ? `${a} + ${br(x)}` : `${br(x)} + ${a}`} = ${b}$ ${OK}`,
      ];
    case 'sub':
      return [
        `$${a}$ is subtracted from $${v}$. To undo it, add $${a}$ to both sides.`,
        `$${v} = ${br(b)} + ${a} = ${x}$`,
        `Check: $${br(x)} - ${a} = ${b}$ ${OK}`,
      ];
    case 'mul':
      return [
        `$${a}${v}$ means $${a} \\times ${v}$. To undo multiplying by $${a}$, divide both sides by $${a}$.`,
        `$${v} = ${b} \\div ${a} = ${x}$`,
        `Check: $${a} \\times ${x} = ${b}$ ${OK}`,
      ];
    case 'div':
      return [
        `$${v}$ is divided by $${a}$. To undo dividing by $${a}$, multiply both sides by $${a}$.`,
        `$${v} = ${b} \\times ${a} = ${x}$`,
        `Check: $${x} \\div ${a} = ${b}$ ${OK}`,
      ];
  }
}

const ONE_HINTS = [
  'What is being done to the variable: adding, subtracting, multiplying or dividing?',
  'Do the inverse (opposite) operation to both sides to get the variable by itself.',
];

interface OneCtx {
  text: string;
  op: Op1;
  v: string;
  a: number;
  b: number;
  x: number;
  suffix?: string;
  label?: string;
  setup: string;
  say: string;
}

const ONE_CTX: Array<(rng: Rng, name: string) => OneCtx> = [
  (rng) => {
    const town = rng.pick(TOWNS);
    const a = rng.int(4, 15);
    const x = rng.int(-20, -1);
    const b = x + a;
    return {
      text: `One winter morning in ${town}, the temperature rose $${a}^\\circ\\text{C}$ by noon. The temperature at noon was $${b}^\\circ\\text{C}$. What was the temperature in the morning?`,
      op: 'add', v: 't', a, b, x, suffix: '°C',
      setup: `Let $t$ be the morning temperature. The morning temperature plus the rise equals the noon temperature: $t + ${a} = ${b}$.`,
      say: `The morning temperature was $${x}^\\circ\\text{C}$.`,
    };
  },
  (rng) => {
    const town = rng.pick(TOWNS);
    const a = rng.int(5, 18);
    const b = rng.int(-15, 3);
    const x = b + a;
    return {
      text: `In ${town}, the temperature dropped $${a}^\\circ\\text{C}$ overnight. In the morning it was $${b}^\\circ\\text{C}$. What was the temperature the evening before?`,
      op: 'sub', v: 't', a, b, x, suffix: '°C',
      setup: `Let $t$ be the evening temperature. The evening temperature minus the drop equals the morning temperature: $t - ${a} = ${b}$.`,
      say: `The evening temperature was $${x}^\\circ\\text{C}$.`,
    };
  },
  (rng, name) => {
    const a = rng.int(10, 40);
    const b = rng.int(-25, -5);
    const x = b + a;
    return {
      text: `In a card game, ${name} lost $${a}$ points in one round. After the round, ${name}’s score was $${b}$. What was ${name}’s score before the round?`,
      op: 'sub', v: 's', a, b, x, suffix: 'points',
      setup: `Let $s$ be the score before the round. The score minus the points lost equals the new score: $s - ${a} = ${b}$.`,
      say: `${name}’s score before the round was $${x}$.`,
    };
  },
  (rng) => {
    const per = rng.pick([3, 4, 5, 6, 8]);
    const x = rng.int(5, 15);
    return {
      text: `Hockey tape is sold in packs of ${per} rolls. A team needs ${per * x} rolls for the season. How many packs should the team buy?`,
      op: 'mul', v: 'p', a: per, b: per * x, x, suffix: 'packs',
      setup: `Let $p$ be the number of packs. ${per} rolls in each pack times the number of packs equals the rolls needed: $${per}p = ${per * x}$.`,
      say: `The team should buy ${x} packs.`,
    };
  },
  (rng, name) => {
    const laps = rng.pick([4, 5, 6, 8, 10]);
    const len = rng.pick([200, 250, 300, 400]);
    return {
      text: `${name} ran ${laps} laps of a track and covered $${laps * len}\\ \\text{m}$. How long is one lap?`,
      op: 'mul', v: 'L', a: laps, b: laps * len, x: len, suffix: 'm',
      setup: `Let $L$ be the length of one lap in metres. ${laps} laps of length $L$ make the whole distance: $${laps}L = ${laps * len}$.`,
      say: `One lap is $${len}\\ \\text{m}$ long.`,
    };
  },
  (rng, name) => {
    const n = rng.pick([3, 4, 5, 6]);
    const each = rng.int(6, 15);
    const what = rng.pick(['a pizza order', 'a birthday gift', 'the cost of a campsite', 'a bag of hockey pucks']);
    return {
      text: `${name} and some friends share ${what} equally. There are ${n} people, and each person pays ${dollars(each)}. What was the total cost?`,
      op: 'div', v: 'c', a: n, b: each, x: n * each, label: 'Cost: \\$',
      setup: `Let $c$ be the total cost in dollars. The total shared by ${n} people gives each share: $\\dfrac{c}{${n}} = ${each}$.`,
      say: `The total cost was ${dollars(n * each)}.`,
    };
  },
  (rng, name) => {
    const spent = rng.int(8, 40);
    const left = rng.int(5, 60);
    const where = rng.pick(['at a summer fair', 'at a school book fair', 'at a shopping mall', 'at a hockey tournament']);
    return {
      text: `${name} spent ${dollars(spent)} ${where} and had ${dollars(left)} left. How much money did ${name} have to start with?`,
      op: 'sub', v: 'm', a: spent, b: left, x: spent + left, label: '\\$',
      setup: `Let $m$ be the starting amount in dollars. The starting amount minus the amount spent equals what is left: $m - ${spent} = ${left}$.`,
      say: `${name} started with ${dollars(spent + left)}.`,
    };
  },
  (rng, name) => {
    const a = rng.int(6, 20);
    const x = rng.int(-12, -1);
    const b = x + a;
    return {
      text: `${name} is playing a video game. ${name}’s score was negative. After earning $${a}$ points, the score is $${b}$. What was the score before?`,
      op: 'add', v: 's', a, b, x, suffix: 'points',
      setup: `Let $s$ be the score before. The old score plus the points earned equals the new score: $s + ${a} = ${b}$.`,
      say: `The score before was $${x}$.`,
    };
  },
];

const oneStepEquation = skill({
  id: 'm7-one-step-equation',
  name: 'Solving one-step equations',
  description: 'Solve x + a = b with integers, and ax = b and x/a = b with whole numbers, using inverse operations, and check by substitution.',
  outcomes: ['PR6', 'PR7'],
  lessonId: 'm7-6-3',
  gen(rng, d): GenOutput {
    if (d < 3) {
      const v = rng.pick(LETTERS);
      const op = rng.pick(['add', 'sub', 'mul', 'div'] as const);
      let a: number;
      let b: number;
      let x: number;
      let flip = false;
      if (d === 1) {
        if (op === 'add') { a = rng.int(2, 15); x = rng.int(1, 20); b = x + a; }
        else if (op === 'sub') { a = rng.int(2, 12); b = rng.int(1, 15); x = b + a; }
        else if (op === 'mul') { a = rng.int(2, 9); x = rng.int(2, 10); b = a * x; }
        else { a = rng.int(2, 6); b = rng.int(2, 9); x = a * b; }
      } else if (op === 'add') {
        // x + a = b with integers; at least one of a, b, x negative.
        [a, x] = retry(() => [rng.nonZero(-15, 15), rng.nonZero(-20, 20)], ([p, q]) => (p < 0 || q < 0 || p + q < 0) && p + q !== 0);
        b = x + a;
        flip = a > 0 && rng.chance(0.3);
      } else if (op === 'sub') {
        a = rng.int(3, 15);
        b = rng.nonZero(-15, -1);
        x = b + a;
        if (x === 0) { b -= 1; x -= 1; }
      } else if (op === 'mul') { a = rng.int(6, 15); x = rng.int(6, 15); b = a * x; }
      else { a = rng.int(3, 12); b = rng.int(4, 15); x = a * b; }
      const eq = oneStepTex(op, v, a, b, flip);
      return {
        prompt: `Solve the equation and check your answer.\n\n$$${eq}$$`,
        parts: [solvePart(x, v)],
        hints: ONE_HINTS,
        solution: [...oneStepSteps(op, v, a, b, x, flip), `The solution is $${v} = ${x}$.`],
        calculator: false,
      };
    }
    const c = rng.pick(ONE_CTX)(rng, rng.pick(NAMES));
    return {
      prompt: `${c.text}\n\nWrite an equation and solve it.`,
      parts: [numPart(c.x, { suffix: c.suffix, label: c.label })],
      hints: ['Choose a letter for the unknown. Write an equation that says the two amounts are equal.', ONE_HINTS[1]],
      solution: [c.setup, ...oneStepSteps(c.op, c.v, c.a, c.b, c.x), c.say],
    };
  },
});

// ---------------------------------------------------------------------------
// Lesson 6.4 — Two-step equations and problems
// ---------------------------------------------------------------------------

/** Steps to solve av + b = c (whole numbers), with a check. */
function twoStepSteps(a: number, v: string, b: number, c: number, x: number): string[] {
  return [
    `Undo the adding first. Subtract $${b}$ from both sides: $${a}${v} + ${b} - ${b} = ${c} - ${b}$, so $${a}${v} = ${c - b}$.`,
    `Undo the multiplying. Divide both sides by $${a}$: $\\dfrac{${a}${v}}{${a}} = \\dfrac{${c - b}}{${a}}$, so $${v} = ${x}$.`,
    `Check: $${a}(${x}) + ${b} = ${a * x} + ${b} = ${c}$ ${OK}`,
  ];
}

const TWO_HINTS = [
  'Undo the adding first: subtract the constant term from both sides.',
  'Then undo the multiplying: divide both sides by the coefficient.',
];

const twoStepEquation = skill({
  id: 'm7-two-step-equation',
  name: 'Solving two-step equations',
  description: 'Solve equations of the form ax + b = c with whole numbers, and check the solution by substitution.',
  outcomes: ['PR7'],
  lessonId: 'm7-6-4',
  gen(rng, d): GenOutput {
    const v = rng.pick(LETTERS);
    if (d < 3) {
      const a = d === 1 ? rng.int(2, 5) : rng.int(3, 12);
      const x = d === 1 ? rng.int(1, 10) : rng.int(2, 15);
      const b = d === 1 ? rng.int(1, 12) : rng.int(5, 40);
      const c = a * x + b;
      const form = d === 1 ? 0 : rng.int(0, 2);
      const eq = form === 0 ? `${a}${v} + ${b} = ${c}` : form === 1 ? `${b} + ${a}${v} = ${c}` : `${c} = ${a}${v} + ${b}`;
      const note = form === 1 ? [`$${b} + ${a}${v}$ is the same as $${a}${v} + ${b}$.`] : form === 2 ? [`The sides can be read in either order: $${a}${v} + ${b} = ${c}$.`] : [];
      return {
        prompt: `Solve the equation and check your answer.\n\n$$${eq}$$`,
        parts: [solvePart(x, v)],
        hints: TWO_HINTS,
        solution: [...note, ...twoStepSteps(a, v, b, c, x), `The solution is $${v} = ${x}$.`],
      };
    }
    if (rng.chance(0.55)) {
      // A number puzzle in words.
      const a = rng.int(2, 9);
      const x = rng.int(3, 20);
      const b = rng.int(3, 30);
      const c = a * x + b;
      const name = rng.pick(NAMES);
      const times = a === 2 ? 'doubles it' : a === 3 ? 'triples it' : `multiplies it by ${a}`;
      const text = rng.pick([
        `${name} thinks of a number, ${times}, then adds ${b}. The result is ${c}. What number did ${name} start with?`,
        `${b} more than ${a} times a number is ${c}. What is the number?`,
        `When a number is multiplied by ${a} and then ${b} is added, the answer is ${c}. What is the number?`,
      ]);
      return {
        prompt: text,
        parts: [solvePart(x, 'n')],
        hints: [`Let $n$ be the number. Write the steps in order as an expression: multiply by ${a}, then add ${b}.`, 'Set the expression equal to the result, then undo the steps in reverse order.'],
        solution: [`Let $n$ be the number. Multiplying by ${a} gives $${a}n$; adding ${b} gives $${a}n + ${b}$.`, `The equation is $${a}n + ${b} = ${c}$.`, ...twoStepSteps(a, 'n', b, c, x), `The number is $${x}$.`],
      };
    }
    // Solve, then use the solution.
    const a = rng.int(3, 12);
    const x = rng.int(2, 15);
    const b = rng.int(5, 50);
    const c = a * x + b;
    const p = rng.int(2, 6);
    const q = rng.int(1, 12);
    const val = p * x - q > 0 && rng.chance(0.5) ? p * x - q : p * x + q;
    const minus = val === p * x - q;
    const ask = `${p}${v} ${minus ? '-' : '+'} ${q}`;
    return {
      prompt: `If $${a}${v} + ${b} = ${c}$, what is the value of $${ask}$?`,
      parts: [numPart(val, { label: `$${ask} =$` })],
      hints: [`First solve $${a}${v} + ${b} = ${c}$ to find $${v}$.`, `Then substitute your value of $${v}$ into $${ask}$.`],
      solution: [
        ...twoStepSteps(a, v, b, c, x),
        `Substitute $${v} = ${x}$: $${ask} = ${p} \\times ${x} ${minus ? '-' : '+'} ${q} = ${p * x} ${minus ? '-' : '+'} ${q} = ${val}$`,
        `The value of $${ask}$ is $${val}$.`,
      ],
    };
  },
});

interface ProbCtx {
  text: string;
  v: string;
  /** The equation that fits, and wrong equations from real mistakes. */
  eq: string;
  wrong: string[];
  x: number;
  suffix?: string;
  label?: string;
  /** The question the equation answers. */
  ask: string;
  steps: string[];
  say: string;
}

/** One-step problems (difficulty 1). */
const PROB1: Array<(rng: Rng, name: string) => ProbCtx> = [
  (rng, name) => {
    const per = rng.pick([4, 5, 6, 8, 10]);
    const x = rng.int(3, 12);
    const what = rng.pick(['trading cards', 'granola bars', 'juice boxes', 'markers']);
    return {
      text: `${what.charAt(0).toUpperCase() + what.slice(1)} come in packs of ${per}. ${name} needs ${per * x} ${what} for a class party. Let $p$ be the number of packs ${name} needs.`,
      v: 'p', eq: `${per}p = ${per * x}`, wrong: [`p + ${per} = ${per * x}`, `\\dfrac{p}{${per}} = ${per * x}`, `${per * x}p = ${per}`], x, suffix: 'packs', ask: `How many packs does ${name} need?`,
      steps: oneStepSteps('mul', 'p', per, per * x, x), say: `${name} needs ${x} packs.`,
    };
  },
  (rng, name) => {
    const had = rng.int(20, 60);
    const x = rng.int(5, 40);
    return {
      text: `${name} had some hockey cards. After buying ${had} more, ${name} has ${x + had} cards. Let $h$ be the number of cards ${name} had at first.`,
      v: 'h', eq: `h + ${had} = ${x + had}`, wrong: [`h - ${had} = ${x + had}`, `${had}h = ${x + had}`, `h + ${x + had} = ${had}`], x, suffix: 'cards', ask: `How many cards did ${name} have at first?`,
      steps: oneStepSteps('add', 'h', had, x + had, x), say: `${name} had ${x} cards at first.`,
    };
  },
  (rng, name) => {
    const n = rng.pick([3, 4, 5, 6]);
    const each = rng.int(5, 14);
    return {
      text: `${name} and some friends split the cost of a campsite in the mountains equally. There are ${n} people, and each pays ${dollars(each)}. Let $c$ be the cost of the campsite in dollars.`,
      v: 'c', eq: `\\dfrac{c}{${n}} = ${each}`, wrong: [`${n}c = ${each}`, `c - ${n} = ${each}`, `\\dfrac{${n}}{c} = ${each}`], x: n * each, label: '\\$', ask: 'How much did the campsite cost?',
      steps: oneStepSteps('div', 'c', n, each, n * each), say: `The campsite cost ${dollars(n * each)}.`,
    };
  },
  (rng, name) => {
    const gave = rng.int(4, 20);
    const left = rng.int(6, 30);
    const what = rng.pick(['stickers', 'marbles', 'pencils', 'cookies']);
    return {
      text: `${name} gave away ${gave} ${what} and has ${left} left. Let $s$ be the number of ${what} ${name} had to start.`,
      v: 's', eq: `s - ${gave} = ${left}`, wrong: [`s + ${gave} = ${left}`, `${gave} - s = ${left}`, `${gave}s = ${left}`], x: gave + left, suffix: what, ask: `How many ${what} did ${name} have to start?`,
      steps: oneStepSteps('sub', 's', gave, left, gave + left), say: `${name} had ${gave + left} ${what} to start.`,
    };
  },
];

/** Two-step problems ax + b = c (difficulty 2 and 3). */
const PROB2: Array<(rng: Rng, name: string, d: Difficulty) => ProbCtx> = [
  (rng, name) => {
    const fee = rng.pick([20, 25, 30, 35]);
    const per = rng.pick([5, 8, 10, 12].filter((t) => t !== fee));
    const x = rng.int(2, 9);
    const total = fee + per * x;
    return {
      text: `${name}’s phone plan costs ${dollars(fee)} each month plus ${dollars(per)} for each GB of data. Last month the bill was ${dollars(total)}. Let $g$ be the number of GB used.`,
      v: 'g', eq: `${per}g + ${fee} = ${total}`, wrong: [`${fee}g + ${per} = ${total}`, `${per}g - ${fee} = ${total}`, `${per}(g + ${fee}) = ${total}`], x, suffix: 'GB', ask: `How many GB did ${name} use?`,
      steps: twoStepSteps(per, 'g', fee, total, x), say: `${name} used ${x} GB of data.`,
    };
  },
  (rng, name) => {
    const start = rng.pick([4, 5, 6]);
    const per = rng.pick([2, 3]);
    const x = rng.int(4, 15);
    const total = start + per * x;
    const town = rng.pick(TOWNS);
    return {
      text: `A taxi in ${town} charges ${dollars(start)} to start plus ${dollars(per)} for each kilometre. ${name}’s fare was ${dollars(total)}. Let $k$ be the length of the trip in kilometres.`,
      v: 'k', eq: `${per}k + ${start} = ${total}`, wrong: [`${start}k + ${per} = ${total}`, `${per}k - ${start} = ${total}`, `k + ${per} + ${start} = ${total}`], x, suffix: 'km', ask: 'How long was the trip?',
      steps: twoStepSteps(per, 'k', start, total, x), say: `The trip was $${x}\\ \\text{km}$ long.`,
    };
  },
  (rng, name) => {
    const have = rng.pick([40, 60, 75, 90, 120]);
    const per = rng.pick([2, 3, 4, 5]);
    const x = rng.int(15, 60);
    const goal = have + per * x;
    const item = rng.pick(['chocolate bars', 'raffle tickets', 'cookies', 'bags of popcorn']);
    return {
      text: `${name}’s class has ${dollars(have)} saved for a trip. They earn ${dollars(per)} for each of the ${item} they sell. They need ${dollars(goal)} in total. Let $s$ be the number of ${item} they must sell.`,
      v: 's', eq: `${per}s + ${have} = ${goal}`, wrong: [`${have}s + ${per} = ${goal}`, `${per}s = ${goal} + ${have}`, `${per}(s + ${have}) = ${goal}`], x, suffix: item, ask: `How many ${item} must they sell?`,
      steps: twoStepSteps(per, 's', have, goal, x), say: `They must sell ${x} ${item}.`,
    };
  },
  (rng, name) => {
    const fee = rng.pick([5, 8, 10]);
    const per = rng.pick([12, 15, 18, 20]);
    const x = rng.int(2, 6);
    const total = fee + per * x;
    return {
      text: `Renting a canoe at Willow Lake costs a ${dollars(fee)} booking fee plus ${dollars(per)} for each hour. ${name} paid ${dollars(total)}. Let $h$ be the number of hours.`,
      v: 'h', eq: `${per}h + ${fee} = ${total}`, wrong: [`${fee}h + ${per} = ${total}`, `${per}h - ${fee} = ${total}`, `h + ${per} + ${fee} = ${total}`], x, suffix: 'hours', ask: `For how many hours did ${name} rent the canoe?`,
      steps: twoStepSteps(per, 'h', fee, total, x), say: `${name} rented the canoe for ${x} hours.`,
    };
  },
  (rng, name) => {
    const start = rng.int(3, 12);
    const per = rng.int(2, 6);
    const x = rng.int(3, 10);
    const h = start + per * x;
    return {
      text: `${name}’s bean plant is $${start}\\ \\text{cm}$ tall. It grows $${per}\\ \\text{cm}$ each week. Let $w$ be the number of weeks until the plant is $${h}\\ \\text{cm}$ tall.`,
      v: 'w', eq: `${per}w + ${start} = ${h}`, wrong: [`${start}w + ${per} = ${h}`, `${per}w = ${h} + ${start}`, `w + ${per} + ${start} = ${h}`], x, suffix: 'weeks', ask: 'How many weeks will it take?',
      steps: twoStepSteps(per, 'w', start, h, x), say: `The plant will be $${h}\\ \\text{cm}$ tall after ${x} weeks.`,
    };
  },
];

/** Problems that need more planning (difficulty 3). */
const PROB3: Array<(rng: Rng, name: string) => ProbCtx> = [
  (rng, name) => {
    const w = rng.int(4, 12);
    const l = rng.int(w + 2, 30);
    const P = 2 * l + 2 * w;
    const [thing, short] = rng.pick([['a rectangular garden', 'garden'], ['a rectangular dog run', 'dog run'], ['a rectangular vegetable patch', 'vegetable patch'], ['a rectangular horse paddock', 'paddock']] as const);
    return {
      text: `${name} used $${P}\\ \\text{m}$ of fencing to go all the way around ${thing}. It is $${w}\\ \\text{m}$ wide. Let $l$ be its length in metres.`,
      v: 'l', eq: `2l + ${2 * w} = ${P}`, wrong: [`l + ${w} = ${P}`, `2l + ${w} = ${P}`, `${2 * w}l + 2 = ${P}`], x: l, suffix: 'm', ask: `How long is the ${short}?`,
      steps: [`The perimeter is $2l + 2w$, and $2 \\times ${w} = ${2 * w}$, so the equation is $2l + ${2 * w} = ${P}$.`, ...twoStepSteps(2, 'l', 2 * w, P, l)],
      say: `The length is $${l}\\ \\text{m}$.`,
    };
  },
  (rng) => {
    const n = rng.int(8, 40);
    const s = 3 * n + 3;
    return {
      text: `The sum of three consecutive whole numbers is ${s}. (Consecutive numbers follow one after another, like 7, 8, 9.) Let $n$ be the smallest number.`,
      v: 'n', eq: `3n + 3 = ${s}`, wrong: [`3n = ${s}`, `n + 3 = ${s}`, `3n + 2 = ${s}`], x: n, ask: 'What is the smallest number?',
      steps: [`The numbers are $n$, $n + 1$ and $n + 2$. Their sum is $n + n + 1 + n + 2 = 3n + 3$.`, ...twoStepSteps(3, 'n', 3, s, n), `The numbers are ${n}, ${n + 1} and ${n + 2}.`],
      say: `The smallest number is ${n}.`,
    };
  },
  (rng, name) => {
    const k = rng.int(8, 14);
    const a = rng.pick([2, 3]);
    const b = rng.int(2, 9);
    const age = a * k + b;
    const rel = rng.pick(['aunt', 'uncle', 'mother', 'father']);
    return {
      text: `${name}’s ${rel} is ${b} years older than ${a === 2 ? 'twice' : 'three times'} ${name}’s age. The ${rel} is ${age} years old. Let $k$ be ${name}’s age in years.`,
      v: 'k', eq: `${a}k + ${b} = ${age}`, wrong: [`${a}(k + ${b}) = ${age}`, `${b}k + ${a} = ${age}`, `${a}k - ${b} = ${age}`], x: k, suffix: 'years', ask: `How old is ${name}?`,
      steps: twoStepSteps(a, 'k', b, age, k), say: `${name} is ${k} years old.`,
    };
  },
  (rng) => {
    const rows = rng.int(5, 12);
    const per = rng.int(8, 20);
    const extra = rng.int(5, 30);
    const total = rows * per + extra;
    return {
      text: `The gym is set up for a school concert. There are ${rows} rows with the same number of chairs in each row, plus ${extra} chairs at the back for parents. There are ${total} chairs in all. Let $c$ be the number of chairs in each row.`,
      v: 'c', eq: `${rows}c + ${extra} = ${total}`, wrong: [`${extra}c + ${rows} = ${total}`, `${rows}c = ${total} + ${extra}`, `c + ${rows} + ${extra} = ${total}`], x: per, suffix: 'chairs', ask: 'How many chairs are in each row?',
      steps: twoStepSteps(rows, 'c', extra, total, per), say: `There are ${per} chairs in each row.`,
    };
  },
  (rng) => {
    const s = rng.int(6, 20);
    const base = rng.intExcept(4, 15, [s]);
    const P = 2 * s + base;
    return {
      text: `An isosceles triangle has two equal sides. Its third side is $${base}\\ \\text{cm}$ long, and its perimeter is $${P}\\ \\text{cm}$. Let $s$ be the length of each equal side in centimetres.`,
      v: 's', eq: `2s + ${base} = ${P}`, wrong: [`s + ${base} = ${P}`, `${base}s + 2 = ${P}`, `2(s + ${base}) = ${P}`], x: s, suffix: 'cm', ask: 'How long is each equal side?',
      steps: twoStepSteps(2, 's', base, P, s), say: `Each equal side is $${s}\\ \\text{cm}$ long.`,
    };
  },
];

const equationProblems = skill({
  id: 'm7-equation-problems',
  name: 'Writing and solving equations for problems',
  description: 'Choose an equation that models a situation, solve it, and check the answer in the story.',
  outcomes: ['PR7'],
  lessonId: 'm7-6-4',
  gen(rng, d): GenOutput {
    const name = rng.pick(NAMES);
    const c = d === 1 ? rng.pick(PROB1)(rng, name) : d === 2 ? rng.pick(PROB2)(rng, name, d) : rng.chance(0.85) ? rng.pick(PROB3)(rng, name) : rng.pick(PROB2)(rng, name, d);
    return {
      prompt: `${c.text}\n\n(a) Which equation represents the situation?\n\n(b) Solve the equation. ${c.ask}`,
      parts: [
        { label: '(a)', answer: mc(rng, `$${c.eq}$`, c.wrong.map((w) => `$${w}$`)) },
        { ...numPart(c.x, { suffix: c.suffix, label: c.label }), label: c.label ? `(b) $${c.v} =$ \\$` : `(b) $${c.v} =$` },
      ],
      hints: d === 1
        ? ['Is the unknown being added to, subtracted from, multiplied or divided?', 'Solve with the inverse operation, then check your answer in the story.']
        : ['The amount that repeats (for each one) is the coefficient. The one-time amount is the constant term.', 'Undo the adding first, then the multiplying. Check your answer in the story.'],
      solution: [`(a) The equation is $${c.eq}$.`, ...c.steps, `(b) ${c.say}`],
    };
  },
});

export const EQUATIONS_SKILLS: SkillDef[] = [
  expressionOrEquation,
  evaluateExpression,
  preserveEquality,
  oneStepEquation,
  twoStepEquation,
  equationProblems,
];
