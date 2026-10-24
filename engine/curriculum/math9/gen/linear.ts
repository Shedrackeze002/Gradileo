/** Math 9 Unit 4 — Linear Relations (PR1, PR2). */
import { mc, mcFigures, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, frac, fracLatex, paren, type Frac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, Line, Part, PlaneFigure, PlaneSegment, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Liam', 'Priya', 'Mateo', 'Aiyana', 'Jun', 'Fatima', 'Noah', 'Harpreet', 'Olivia', 'Tariq', 'Mei',
  'Kwame', 'Chloé', 'Ravi', 'Sienna', 'Dakota', 'Ethan', 'Leilani', 'Omar', 'Nadia', 'Jaxon', 'Ayesha', 'Wei',
  'Isabelle', 'Kiran', 'Malik', 'Sofia', 'Gurpreet', 'Hiroshi', 'Zara', 'Émile', 'Thandiwe', 'Connor', 'Rosa', 'Tyler',
];

type Out = GenOutput;

const works = 'It matches.';
const dollars = (v: number) => `\\$${fmt(v)}`;
/** Remove floating-point noise. */
const clean = (x: number) => Math.round(x * 1e9) / 1e9;
const val = (m: Frac) => m.n / m.d;

/** A coefficient in LaTeX: 3, 0.5, \frac{2}{3}; decimals for halves and quarters when asked. */
function coefTex(m: Frac, decimal = false): string {
  if (m.d === 1) return `${m.n}`;
  if (decimal && [2, 4, 5].includes(m.d)) return fmt(m.n / m.d);
  return fracLatex(m);
}

/** m·v + b in LaTeX, e.g. \frac{2}{3}x - 1, -x + 4, 0.5n + 3. */
function lineTex(m: Frac, b: number, v = 'x', decimal = false): string {
  const c = coefTex(frac(Math.abs(m.n), m.d), decimal);
  const mx = m.n === 0 ? '' : `${m.n < 0 ? '-' : ''}${c === '1' ? '' : c}${v}`;
  if (!mx) return `${fmt(b)}`;
  if (b === 0) return mx;
  return `${mx} ${b < 0 ? '-' : '+'} ${fmt(Math.abs(b))}`;
}

/** The same in the syntax students type: 2/3x - 1, 0.5n + 3. */
function lineText(m: Frac, b: number, v = 'x'): string {
  const a = Math.abs(m.n);
  const c = m.d === 1 ? (a === 1 ? '' : `${a}`) : [2, 4, 5].includes(m.d) ? fmt(a / m.d) : `(${a}/${m.d})`;
  const mx = `${m.n < 0 ? '-' : ''}${c}${v}`;
  if (b === 0) return mx;
  return `${mx} ${b < 0 ? '-' : '+'} ${fmt(Math.abs(b))}`;
}

/** Substitution y = m(x) + b in LaTeX, with the result; written b - |m|(x) when the rate is negative and the start positive. */
function substTex(m: Frac, b: number, x: number, yv = 'y', decimal = false): string {
  const y = clean(val(m) * x + b);
  const chain: string[] = [];
  if (m.n < 0 && b > 0) {
    const am = frac(-m.n, m.d);
    const c = coefTex(am, decimal);
    const prod = clean(val(am) * x);
    chain.push(`${fmt(b)} - ${c === '1' ? '' : c}(${fmt(x)})`, `${fmt(b)} - ${paren(fmt(prod))}`);
    if (prod < 0) chain.push(`${fmt(b)} + ${fmt(-prod)}`);
  } else {
    const c = coefTex(m, decimal);
    const prod = clean(val(m) * x);
    const tail = b === 0 ? '' : ` ${b < 0 ? '-' : '+'} ${fmt(Math.abs(b))}`;
    chain.push(`${c === '1' ? '' : c === '-1' ? '-' : c}(${fmt(x)})${tail}`);
    if (b !== 0) chain.push(`${fmt(prod)}${tail}`);
  }
  chain.push(fmt(y));
  return `$${yv} = ${chain.join(' = ')}$`;
}

const lineThrough = (p: [number, number], q: [number, number]): Line => ({ A: q[1] - p[1], B: -(q[0] - p[0]), C: (q[0] - p[0]) * p[1] - (q[1] - p[1]) * p[0] });

/** A bare line y = mx + b on a 12-by-12 grid, for picture choices. */
function lineChoice(m: Frac, b: number): PlaneFigure {
  return { type: 'plane', grid: { xMin: -6, xMax: 6, yMin: -6, yMax: 6 }, lines: [{ line: lineThrough([0, b], [m.d, b + m.n]) }] };
}

// ---------------------------------------------------------------------------
// Picture patterns (toothpicks and tiles), drawn as figures 1, 2 and 3
// ---------------------------------------------------------------------------

interface Pattern {
  /** What is counted, e.g. "toothpicks". */
  what: string;
  /** The letter for the count. */
  yv: string;
  a: number;
  b: number;
  intro: string;
  /** Draw figure n with its lower-left corner at x0; returns the figure's width. */
  draw: (n: number, x0: number, segs: PlaneSegment[], polys: NonNullable<PlaneFigure['polylines']>) => number;
  height: number;
  /** How to see the pattern in the picture. */
  see: string;
}

/** A toothpick from p to q, shortened a little so that each stick shows. */
function stick(segs: PlaneSegment[], p: [number, number], q: [number, number]) {
  const k = 0.07;
  const dx = q[0] - p[0];
  const dy = q[1] - p[1];
  segs.push({ from: [p[0] + k * dx, p[1] + k * dy], to: [q[0] - k * dx, q[1] - k * dy] });
}

const unitSquare = (x: number, y: number): Array<[number, number]> => [[x, y], [x + 1, y], [x + 1, y + 1], [x, y + 1], [x, y]];

const PATTERNS: Pattern[] = [
  {
    what: 'toothpicks', yv: 't', a: 3, b: 1, height: 1,
    intro: 'Squares are made from toothpicks and joined in a row.',
    see: 'The first square needs $4$ toothpicks. Each new square shares a side, so it adds only $3$ more.',
    draw(n, x0, segs) {
      for (let i = 0; i < n; i++) {
        stick(segs, [x0 + i, 0], [x0 + i + 1, 0]);
        stick(segs, [x0 + i, 1], [x0 + i + 1, 1]);
      }
      for (let i = 0; i <= n; i++) stick(segs, [x0 + i, 0], [x0 + i, 1]);
      return n;
    },
  },
  {
    what: 'toothpicks', yv: 't', a: 2, b: 1, height: 0.87,
    intro: 'Triangles are made from toothpicks and joined in a row, pointing up and down in turn.',
    see: 'The first triangle needs $3$ toothpicks. Each new triangle shares a side, so it adds only $2$ more.',
    draw(n, x0, segs) {
      const h = 0.87;
      const zig: Array<[number, number]> = Array.from({ length: n + 2 }, (_, i) => [x0 + i / 2, i % 2 ? h : 0]);
      for (let i = 0; i <= n; i++) stick(segs, zig[i], zig[i + 1]);
      for (let k = 1; k <= n; k++) stick(segs, zig[k - 1], zig[k + 1]);
      return (n + 1) / 2;
    },
  },
  {
    what: 'toothpicks', yv: 't', a: 5, b: 1, height: 1.6,
    intro: 'Houses are made from toothpicks: a square with a triangle roof. The houses are joined in a row.',
    see: 'The first house needs $6$ toothpicks. Each new house shares a wall, so it adds only $5$ more.',
    draw(n, x0, segs) {
      for (let i = 0; i < n; i++) {
        stick(segs, [x0 + i, 0], [x0 + i + 1, 0]);
        stick(segs, [x0 + i, 1], [x0 + i + 1, 1]);
        stick(segs, [x0 + i, 1], [x0 + i + 0.5, 1.6]);
        stick(segs, [x0 + i + 0.5, 1.6], [x0 + i + 1, 1]);
      }
      for (let i = 0; i <= n; i++) stick(segs, [x0 + i, 0], [x0 + i, 1]);
      return n;
    },
  },
  {
    what: 'shaded border tiles', yv: 's', a: 2, b: 6, height: 3,
    intro: 'A row of white tiles is surrounded by a border of shaded tiles.',
    see: 'There are $3$ shaded tiles at each end. Above and below the white tiles there are $2$ shaded tiles for each white tile.',
    draw(n, x0, _segs, polys) {
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < n + 2; c++) {
          const white = r === 1 && c > 0 && c <= n;
          polys.push({ points: unitSquare(x0 + c, r), ...(white ? { color: 'muted' as const } : { fill: true }) });
        }
      }
      return n + 2;
    },
  },
];

function patternFigure(p: Pattern): PlaneFigure {
  const segs: PlaneSegment[] = [];
  const polys: NonNullable<PlaneFigure['polylines']> = [];
  let x = 0;
  for (let n = 1; n <= 3; n++) x += p.draw(n, x, segs, polys) + 1.4;
  const W = x - 1.4;
  const H = p.height;
  const R = Math.max(W, H) + 1;
  return {
    type: 'plane',
    grid: { xMin: -0.5, xMax: W + 0.5, yMin: -0.5, yMax: H + 0.5, step: R },
    hideTickLabels: true,
    ...(segs.length ? { segments: segs } : {}),
    ...(polys.length ? { polylines: polys } : {}),
    caption: 'Figures 1, 2 and 3, from left to right',
  };
}

// ---------------------------------------------------------------------------
// 4.1 Writing equations for patterns
// ---------------------------------------------------------------------------

/** Steps to find y = an + b from consecutive values at n = 1, 2, 3 .... */
function ruleSteps(a: number, b: number, yv: string, xv: string, xs: number[], ys: number[]): string[] {
  const dx = xs[1] - xs[0];
  const dy = clean(ys[1] - ys[0]);
  const m = frac(Math.round(dy * 1000), dx * 1000);
  return [
    dx === 1
      ? `Each time $${xv}$ goes up by $1$, $${yv}$ ${dy >= 0 ? 'goes up' : 'goes down'} by $${fmt(Math.abs(dy))}$. So the equation has $${lineTex(m, 0, xv, true)}$.`
      : `Each time $${xv}$ goes up by $${dx}$, $${yv}$ ${dy >= 0 ? 'goes up' : 'goes down'} by $${fmt(Math.abs(dy))}$. For each $1$, that is $${fmt(dy)} \\div ${dx} = ${coefTex(m, true)}$, so the equation has $${lineTex(m, 0, xv, true)}$.`,
    xs[0] === 0
      ? `When $${xv} = 0$, $${yv} = ${fmt(b)}$, so the constant term is $${fmt(b)}$.`
      : `When $${xv} = ${xs[0]}$, $${lineTex(m, 0, xv, true).replace(xv, `(${xs[0]})`)} = ${fmt(clean(a * xs[0]))}$, but $${yv} = ${fmt(ys[0])}$. The difference is $${fmt(ys[0])} - ${paren(fmt(clean(a * xs[0])))} = ${fmt(b)}$, so the constant term is $${fmt(b)}$.`,
  ];
}

interface WordCtx {
  text: string;
  yv: string;
  xv: string;
  m: Frac;
  b: number;
  /** Constant written first: C = 25 + 8n. */
  constFirst: boolean;
  xAsk: number;
  askText: string;
  yPart: (y: number) => Part;
  say: (y: number) => string;
}

const WORD_CTX: Array<(rng: Rng, name: string) => WordCtx> = [
  (rng, name) => {
    const F = rng.pick([20, 25, 30, 40]);
    const r = rng.int(6, 12);
    const n = rng.int(10, 24);
    return {
      text: `A climbing gym charges a ${dollars(F)} membership fee plus ${dollars(r)} for each visit. Let $C$ be ${name}’s total cost, in dollars, for $n$ visits.`,
      yv: 'C', xv: 'n', m: frac(r), b: F, constFirst: true, xAsk: n,
      askText: `How much does ${name} pay for $${n}$ visits?`,
      yPart: (y) => numPart(y, { label: '\\$' }),
      say: (y) => `${name} pays ${dollars(y)} for $${n}$ visits.`,
    };
  },
  (rng, name) => {
    const h0 = rng.int(3, 8);
    const r = rng.pick([frac(1, 2), frac(3, 2), frac(1, 4)]);
    const d = r.d * rng.int(5, 12);
    return {
      text: `${name}’s bean plant is $${h0}$ cm tall and grows $${coefTex(r, true)}$ cm each day. Let $h$ be its height, in centimetres, after $d$ days.`,
      yv: 'h', xv: 'd', m: r, b: h0, constFirst: false, xAsk: d,
      askText: `How tall will the plant be after $${d}$ days?`,
      yPart: (y) => numPart(y, { suffix: 'cm' }),
      say: (y) => `After $${d}$ days the plant will be $${fmt(y)}$ cm tall.`,
    };
  },
  (rng, name) => {
    const H = rng.pick([24, 30, 36]);
    const t = 2 * rng.int(3, H / 3 - 1);
    return {
      text: `${name} lights a candle that is $${H}$ cm tall. It burns down $1.5$ cm each hour. Let $h$ be its height, in centimetres, after $t$ hours.`,
      yv: 'h', xv: 't', m: frac(-3, 2), b: H, constFirst: true, xAsk: t,
      askText: `How tall is the candle after $${t}$ hours?`,
      yPart: (y) => numPart(y, { suffix: 'cm' }),
      say: (y) => `After $${t}$ hours the candle is $${fmt(y)}$ cm tall.`,
    };
  },
  (rng, name) => {
    const base = rng.pick([200, 250, 300, 400]);
    const r = rng.pick([18, 20, 25, 30]);
    const g = 10 * rng.int(4, 12);
    return {
      text: `A community hall in town charges ${dollars(base)} to rent the hall plus ${dollars(r)} for each guest’s meal. ${name} is planning a party. Let $C$ be the total cost, in dollars, for $g$ guests.`,
      yv: 'C', xv: 'g', m: frac(r), b: base, constFirst: true, xAsk: g,
      askText: `What is the total cost for $${g}$ guests?`,
      yPart: (y) => numPart(y, { label: '\\$' }),
      say: (y) => `The party costs ${dollars(y)} for $${g}$ guests.`,
    };
  },
  (rng, name) => {
    const fee = rng.pick([40, 50, 60]);
    const r = rng.pick([frac(1, 4), frac(1, 5)]);
    const k = 20 * rng.int(5, 20);
    return {
      text: `A car rental costs ${dollars(fee)} for the day plus \\$${val(r).toFixed(2)} for each kilometre driven. ${name}’s family rents a car for a day trip to a dinosaur museum. Let $C$ be the cost, in dollars, for $k$ kilometres.`,
      yv: 'C', xv: 'k', m: r, b: fee, constFirst: true, xAsk: k,
      askText: `What is the cost if they drive $${k}$ km?`,
      yPart: (y) => numPart(y, { label: '\\$' }),
      say: (y) => `The rental costs ${dollars(y)} for $${k}$ km.`,
    };
  },
  (rng, name) => {
    const E0 = 100 * rng.int(20, 26);
    const r = rng.pick([150, 200, 250, 300]);
    const t = rng.int(2, 5);
    return {
      text: `${name} starts hiking down from a mountain viewpoint at an elevation of $${E0}$ m and goes down $${r}$ m each hour. Let $E$ be ${name}’s elevation, in metres, after $t$ hours.`,
      yv: 'E', xv: 't', m: frac(-r), b: E0, constFirst: true, xAsk: t,
      askText: `What is ${name}’s elevation after $${t}$ hours?`,
      yPart: (y) => numPart(y, { suffix: 'm' }),
      say: (y) => `After $${t}$ hours ${name} is at $${fmt(y)}$ m.`,
    };
  },
  (rng, name) => {
    const V0 = 100 * rng.int(3, 9);
    const r = rng.pick([40, 50, 75, 80]);
    const t = rng.int(5, 15);
    return {
      text: `A backyard pool already has $${V0}$ L of water in it. ${name} fills it with a hose that adds $${r}$ L each minute. Let $V$ be the volume of water, in litres, after $t$ minutes.`,
      yv: 'V', xv: 't', m: frac(r), b: V0, constFirst: true, xAsk: t,
      askText: `How much water is in the pool after $${t}$ minutes?`,
      yPart: (y) => numPart(y, { suffix: 'L' }),
      say: (y) => `After $${t}$ minutes there are $${fmt(y)}$ L of water.`,
    };
  },
];

/** The right side of a context equation: 25 + 8n or 30 - 1.5t (LaTeX and typed). */
function ctxRhs(c: WordCtx): { tex: string; text: string } {
  if (!c.constFirst) return { tex: lineTex(c.m, c.b, c.xv, true), text: lineText(c.m, c.b, c.xv) };
  const a = Math.abs(c.m.n);
  const cTex = coefTex(frac(a, c.m.d), true);
  const cTxt = c.m.d === 1 ? `${a}` : [2, 4, 5].includes(c.m.d) ? fmt(a / c.m.d) : `(${a}/${c.m.d})`;
  const op = c.m.n < 0 ? '-' : '+';
  return { tex: `${fmt(c.b)} ${op} ${cTex === '1' ? '' : cTex}${c.xv}`, text: `${fmt(c.b)} ${op} ${cTxt === '1' ? '' : cTxt}${c.xv}` };
}

function patternEquation(rng: Rng, d: Difficulty): Out {
  if (d === 2) return wordEquation(rng);
  const usePicture = rng.chance(d === 1 ? 0.55 : 0.5);
  if (usePicture) {
    const p = rng.pick(PATTERNS);
    const counts = [1, 2, 3].map((n) => p.a * n + p.b);
    const expected = `${p.a}n + ${p.b}`;
    const steps = [
      `Count the ${p.what} in each figure: $${counts.join('$, $')}$.`,
      `${p.see}`,
      `Each figure has $${p.a}$ more ${p.what} than the one before, so the equation has $${p.a}n$.`,
      `For Figure 1, $${p.a}(1) = ${p.a}$, but there are $${counts[0]}$ ${p.what}. Add $${p.b}$: $${p.yv} = ${expected}$.`,
      `Verify with Figure 3: $${p.yv} = ${p.a}(3) + ${p.b} = ${counts[2]}$. ${works}`,
    ];
    if (d === 1) {
      return {
        prompt: `${p.intro} Write an equation for the number of ${p.what}, $${p.yv}$, in Figure $n$.`,
        figure: patternFigure(p),
        parts: [part({ kind: 'expression', expected }, { label: `$${p.yv} =$` })],
        hints: [`Count the ${p.what} in Figures 1, 2 and 3. How many are added each time?`, 'The number added each time multiplies $n$. Then find what to add so that Figure 1 is right.'],
        solution: [...steps, `The equation is $${p.yv} = ${expected}$.`],
      };
    }
    const target = retry(() => p.a * rng.int(15, 60) + p.b, (v) => v < 400);
    const N = (target - p.b) / p.a;
    return {
      prompt: `${p.intro}\n\n(a) Write an equation for the number of ${p.what}, $${p.yv}$, in Figure $n$.\n\n(b) Which figure uses exactly $${target}$ ${p.what}?`,
      figure: patternFigure(p),
      parts: [part({ kind: 'expression', expected }, { label: `(a) $${p.yv} =$` }), numPart(N, { label: '(b) Figure' })],
      hints: [`Count the ${p.what} in Figures 1, 2 and 3. The number added each time multiplies $n$.`, `For (b), substitute $${p.yv} = ${target}$ into your equation and solve for $n$.`],
      solution: [
        ...steps,
        `(b) Substitute $${p.yv} = ${target}$: $${target} = ${p.a}n + ${p.b}$, so $${p.a}n = ${target - p.b}$ and $n = ${target - p.b} \\div ${p.a} = ${N}$.`,
        `Verify: $${p.a}(${N}) + ${p.b} = ${target}$. ${works}`,
        `(a) $${p.yv} = ${expected}$ (b) Figure $${N}$`,
      ],
    };
  }
  if (d === 1) {
    const a = rng.int(2, 9);
    const b = rng.intExcept(-5, 12, [0]);
    const xs = [1, 2, 3, 4];
    const ys = xs.map((x) => a * x + b);
    const [tv, nv] = rng.pick([['t', 'n'], ['y', 'x'], ['P', 'n'], ['A', 'k']]);
    const expected = `${a}${nv}${b < 0 ? ' - ' : ' + '}${Math.abs(b)}`;
    return {
      prompt: `The table shows a linear pattern. Write an equation for $${tv}$ in terms of $${nv}$.`,
      figure: { type: 'table', horizontal: true, headers: [`$${nv}$`, `$${tv}$`], rows: xs.map((x, i) => [String(x), String(ys[i])]) },
      parts: [part({ kind: 'expression', expected }, { label: `$${tv} =$` })],
      hints: [`How much does $${tv}$ change each time $${nv}$ goes up by $1$? That number multiplies $${nv}$.`, `Then compare $${a}(1)$ with the first value of $${tv}$ to find the constant.`],
      solution: [
        ...ruleSteps(a, b, tv, nv, xs, ys),
        `Verify with the last column: $${tv} = ${a}(4)${b < 0 ? ' - ' : ' + '}${Math.abs(b)} = ${ys[3]}$. ${works}`,
        `The equation is $${tv} = ${expected}$.`,
      ],
    };
  }
  // d3: a table that goes up by 2 or 3, sometimes with a rational rate; then extrapolate.
  const step = rng.pick([2, 3]);
  const m = step === 2 ? rng.pick([frac(1, 2), frac(3, 2), frac(5, 2), frac(2), frac(-1, 2), frac(-3, 2)]) : rng.pick([frac(1, 3), frac(2, 3), frac(4, 3), frac(-2, 3), frac(5, 3)]);
  const b = m.n < 0 ? rng.int(10, 20) : rng.int(-4, 9);
  const xs = [0, 1, 2, 3].map((i) => i * step);
  const ys = xs.map((x) => clean(val(m) * x + b));
  const X = step * rng.int(8, 20);
  const Y = clean(val(m) * X + b);
  const expected = lineText(m, b, 'x');
  return {
    prompt: `The table shows a linear relation.\n\n(a) Write an equation for $y$ in terms of $x$.\n\n(b) Use your equation to find $y$ when $x = ${X}$.`,
    figure: { type: 'table', horizontal: true, headers: ['$x$', '$y$'], rows: xs.map((x, i) => [String(x), fmt(ys[i])]) },
    parts: [part({ kind: 'expression', expected }, { label: '(a) $y =$' }), numPart(Y, { label: '(b) $y =$' })],
    hints: [`The $x$-values go up by $${step}$, not $1$. Find the change in $y$ for each step of $${step}$, then divide by $${step}$.`, 'The value of $y$ when $x = 0$ is the constant term. Verify your equation with another column before you use it.'],
    solution: [
      ...ruleSteps(val(m), b, 'y', 'x', xs, ys),
      `So $y = ${lineTex(m, b, 'x')}$. Verify with $x = ${xs[3]}$: ${substTex(m, b, xs[3])}. ${works}`,
      `(b) ${substTex(m, b, X)}`,
      `(a) $y = ${lineTex(m, b, 'x')}$ (b) $y = ${fmt(Y)}$`,
    ],
  };
}

function wordEquation(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const c = rng.pick(WORD_CTX)(rng, name);
  const r = ctxRhs(c);
  const Y = clean(val(c.m) * c.xAsk + c.b);
  const rate = coefTex(frac(Math.abs(c.m.n), c.m.d), true);
  return {
    prompt: `${c.text}\n\n(a) Write an equation for $${c.yv}$ in terms of $${c.xv}$.\n\n(b) ${c.askText}`,
    parts: [part({ kind: 'expression', expected: r.text }, { label: `(a) $${c.yv} =$` }), c.yPart(Y)].map((p, i) => (i === 1 ? { ...p, label: `(b) ${p.label ?? ''}`.trim() } : p)),
    hints: [
      'Find the amount that is there at the start (the constant) and the amount that changes for each unit (the rate).',
      `The rate multiplies $${c.xv}$. ${c.m.n < 0 ? 'The amount goes down, so subtract it.' : 'The amount goes up, so add it.'} Then substitute $${c.xv} = ${c.xAsk}$.`,
    ],
    solution: [
      `The starting amount is $${fmt(c.b)}$. It ${c.m.n < 0 ? 'goes down' : 'goes up'} by $${rate}$ for each unit of $${c.xv}$.`,
      `So $${c.yv} = ${r.tex}$.`,
      `Verify with $${c.xv} = 2$. From the words: $${fmt(c.b)} ${c.m.n < 0 ? '-' : '+'} ${rate} ${c.m.n < 0 ? '-' : '+'} ${rate} = ${fmt(clean(val(c.m) * 2 + c.b))}$. From the equation: $${c.yv} = ${r.tex.replace(c.xv, '(2)')} = ${fmt(clean(val(c.m) * 2 + c.b))}$. ${works}`,
      `(b) $${c.yv} = ${r.tex.replace(c.xv, `(${c.xAsk})`)} = ${fmt(Y)}$`,
      c.say(Y),
    ],
  };
}

// ---------------------------------------------------------------------------
// 4.2 Contexts for graphs
// ---------------------------------------------------------------------------

interface GCtx {
  /** The whole situation, including the rate. */
  words: string;
  /** The situation without the rate (for reading the rate from a graph). */
  start: string;
  /** "per day", "per minute" ... */
  per: string;
  /** The equation in LaTeX. */
  eq: string;
  xv: string;
  yv: string;
  m: Frac;
  b: number;
  discrete: boolean;
  right: string;
  wrong: string[];
  xLabel: string;
  yLabel: string;
  xMax: number;
  xStep: number;
  yStep: number;
  /** The x-values in the table of data. */
  data: number[];
  yPart: (y: number, label?: string) => Part;
  xPart: (x: number, label?: string) => Part;
  ySay: (y: number) => string;
  xSay: (x: number) => string;
  askY: (x: number) => string;
  askX: (y: number) => string;
}

const CONT_WRONG = (yName: string, xName: string) => [
  `Discrete: the ${yName} was measured only a few times, so plot separate points only.`,
  `Discrete: only whole numbers of ${xName} make sense, so plot separate points only.`,
  'Discrete: the values in the table go up by the same amount each time, so plot separate points only.',
];
const DISC_WRONG = (yName: string) => [
  'Continuous: the points lie on a straight line, so join them with a line.',
  `Continuous: the ${yName} can be any amount of money, so join the points with a line.`,
  'Continuous: every linear relation is graphed as a solid line.',
];

const cm = (u: string) => (v: number, label?: string) => numPart(v, { label, suffix: u });
const money = (v: number, label?: string) => numPart(v, { label: label ? `${label} \\$` : '\\$' });

const G_CTX: Array<(rng: Rng, name: string) => GCtx> = [
  (rng, name) => {
    const b = rng.int(2, 5);
    return {
      start: `${name} measures a bean plant. On day $0$ it is $${b}$ cm tall.`,
      words: `${name} measures a bean plant. On day $0$ it is $${b}$ cm tall. It grows $0.5$ cm each day.`, per: 'per day',
      eq: `h = 0.5d + ${b}`, xv: 'd', yv: 'h', m: frac(1, 2), b, discrete: false,
      right: 'Continuous: time can be any value, such as $2.5$ days, and the plant grows all the time, so join the points with a line.',
      wrong: CONT_WRONG('height', 'days'),
      xLabel: 'Time (days)', yLabel: 'Height (cm)', xMax: 12, xStep: 1, yStep: 1, data: [0, 4, 8],
      yPart: cm('cm'), xPart: cm('days'), ySay: (y) => `$${fmt(y)}$ cm`, xSay: (x) => `$${fmt(x)}$ days`,
      askY: (x) => `How tall is the plant on day $${fmt(x)}$?`,
      askX: (y) => `On what day is the plant $${fmt(y)}$ cm tall?`,
    };
  },
  (rng, name) => {
    const b = rng.pick([18, 24, 30]);
    return {
      start: `${name} lights a candle that is $${b}$ cm tall.`,
      words: `${name} lights a candle that is $${b}$ cm tall. It burns down $1.5$ cm each hour.`, per: 'per hour',
      eq: `h = ${b} - 1.5t`, xv: 't', yv: 'h', m: frac(-3, 2), b, discrete: false,
      right: 'Continuous: time can be any value, and the candle burns all the time, so join the points with a line.',
      wrong: CONT_WRONG('height', 'hours'),
      xLabel: 'Time (h)', yLabel: 'Height (cm)', xMax: (2 * b) / 3, xStep: 1, yStep: 3, data: [0, 4, 8],
      yPart: cm('cm'), xPart: cm('h'), ySay: (y) => `$${fmt(y)}$ cm`, xSay: (x) => `$${fmt(x)}$ h`,
      askY: (x) => `How tall is the candle after $${fmt(x)}$ hours?`,
      askX: (y) => `After how many hours is the candle $${fmt(y)}$ cm tall?`,
    };
  },
  (rng, name) => {
    const b = rng.pick([20, 24, 30, 36]);
    return {
      start: `A water cooler at ${name}’s school holds $${b}$ L at the start of a track meet.`,
      words: `A water cooler at ${name}’s school holds $${b}$ L at the start of a track meet. It loses $2$ L of water every $3$ minutes.`, per: 'per minute',
      eq: `V = ${b} - \\frac{2}{3}t`, xv: 't', yv: 'V', m: frac(-2, 3), b, discrete: false,
      right: 'Continuous: time can be any value, and the water flows out all the time, so join the points with a line.',
      wrong: CONT_WRONG('volume', 'minutes'),
      xLabel: 'Time (min)', yLabel: 'Volume (L)', xMax: 18, xStep: 3, yStep: 2, data: [0, 6, 12],
      yPart: cm('L'), xPart: cm('min'), ySay: (y) => `$${fmt(y)}$ L`, xSay: (x) => `$${fmt(x)}$ min`,
      askY: (x) => `How much water is in the cooler after $${fmt(x)}$ minutes?`,
      askX: (y) => `After how many minutes are there $${fmt(y)}$ L left?`,
    };
  },
  (rng, name) => {
    const b = 50 * rng.int(1, 4);
    const r = rng.pick([25, 50]);
    return {
      start: `A hot-air balloon over the fields is $${b}$ m above the ground when ${name} starts timing.`,
      words: `A hot-air balloon over the fields is $${b}$ m above the ground when ${name} starts timing. It rises $${r}$ m each minute.`, per: 'per minute',
      eq: `A = ${r}t + ${b}`, xv: 't', yv: 'A', m: frac(r), b, discrete: false,
      right: 'Continuous: time can be any value, and the balloon rises smoothly, so join the points with a line.',
      wrong: CONT_WRONG('height', 'minutes'),
      xLabel: 'Time (min)', yLabel: 'Height (m)', xMax: 10, xStep: 1, yStep: r, data: [0, 2, 4, 6],
      yPart: cm('m'), xPart: cm('min'), ySay: (y) => `$${fmt(y)}$ m`, xSay: (x) => `$${fmt(x)}$ min`,
      askY: (x) => `How high is the balloon after $${fmt(x)}$ minutes?`,
      askX: (y) => `After how many minutes is the balloon $${fmt(y)}$ m high?`,
    };
  },
  (rng) => {
    const b = rng.pick([20, 30, 40]);
    const r = 5;
    return {
      start: `A shop prints team T-shirts.`, per: 'per shirt',
      words: `A shop prints team T-shirts. It charges a ${dollars(b)} set-up fee plus ${dollars(r)} for each shirt.`,
      eq: `C = ${r}n + ${b}`, xv: 'n', yv: 'C', m: frac(r), b, discrete: true,
      right: 'Discrete: you can only order a whole number of T-shirts, so plot separate points only.',
      wrong: DISC_WRONG('cost'),
      xLabel: 'Number of T-shirts', yLabel: 'Cost ($)', xMax: 10, xStep: 1, yStep: 10, data: [0, 2, 4, 6],
      yPart: money, xPart: cm('shirts'), ySay: dollars, xSay: (x) => `$${fmt(x)}$ shirts`,
      askY: (x) => `How much do $${fmt(x)}$ shirts cost?`,
      askX: (y) => `How many shirts cost ${dollars(y)}?`,
    };
  },
  (rng, name) => {
    const cost = rng.pick([12, 15, 18]);
    return {
      start: `${name} sells beaded bracelets.`, per: 'per bracelet',
      words: `${name} spent ${dollars(cost)} on supplies and sells beaded bracelets for ${dollars(3)} each. The profit is the money taken in minus the cost of supplies.`,
      eq: `P = 3n - ${cost}`, xv: 'n', yv: 'P', m: frac(3), b: -cost, discrete: true,
      right: 'Discrete: you can only sell a whole number of bracelets, so plot separate points only.',
      wrong: DISC_WRONG('profit'),
      xLabel: 'Bracelets sold', yLabel: 'Profit ($)', xMax: 12, xStep: 1, yStep: 3, data: [0, 2, 4, 6],
      yPart: money, xPart: cm('bracelets'), ySay: (y) => (y < 0 ? `−${dollars(-y)}` : dollars(y)), xSay: (x) => `$${fmt(x)}$ bracelets`,
      askY: (x) => `What is the profit for $${fmt(x)}$ bracelets?`,
      askX: (y) => `How many bracelets give a profit of ${y < 0 ? `−${dollars(-y)}` : dollars(y)}?`,
    };
  },
];

/** The vertical range of a context graph. */
function yRange(c: GCtx): { yMin: number; yMax: number } {
  const ys = [0, c.xMax].map((x) => clean(val(c.m) * x + c.b));
  const lo = Math.min(0, ...ys);
  const hi = Math.max(0, ...ys);
  return { yMin: Math.floor(lo / c.yStep) * c.yStep, yMax: Math.ceil(hi / c.yStep) * c.yStep + c.yStep };
}

/** A context graph drawn as points (discrete) or a line (continuous), optionally with a different rule. */
function ctxGraph(c: GCtx, opts: { discrete?: boolean; m?: Frac; b?: number; to?: number; data?: boolean } = {}): PlaneFigure {
  const discrete = opts.discrete ?? c.discrete;
  const m = opts.m ?? c.m;
  const b = opts.b ?? c.b;
  const to = opts.to ?? c.xMax;
  const y = (x: number) => clean(val(m) * x + b);
  const { yMin, yMax } = yRange(c);
  const inside = (x: number) => y(x) >= yMin && y(x) <= yMax;
  const fig: PlaneFigure = {
    type: 'plane',
    grid: { xMin: 0, xMax: c.xMax, yMin, yMax, xStep: c.xStep, yStep: c.yStep, xLabel: c.xLabel, yLabel: c.yLabel },
  };
  if (discrete) {
    fig.points = Array.from({ length: c.xMax + 1 }, (_, x) => x).filter(inside).map((x) => ({ x, y: y(x) }));
  } else {
    // Clip to the grid: stop where the line leaves the top or bottom.
    let end = to;
    if (!inside(end)) {
      const edge = val(m) > 0 ? yMax : yMin;
      end = (edge - b) / val(m);
    }
    fig.polylines = [{ points: [[0, y(0)], [end, y(end)]] }];
    if (opts.data) fig.points = c.data.map((x) => ({ x, y: y(x) }));
  }
  return fig;
}

// ---------------------------------------------------------------------------
// 4.2 Graphing linear relations
// ---------------------------------------------------------------------------

function linearGraph(rng: Rng, d: Difficulty): Out {
  if (d === 3) return graphContext(rng);
  if (d === 2 && rng.chance(0.45)) return discreteOrContinuous(rng);
  const m =
    d === 1
      ? frac(rng.pick([-3, -2, -1, 1, 2, 3]))
      : rng.pick([frac(1, 2), frac(-1, 2), frac(3, 2), frac(-3, 2), frac(1, 3), frac(-1, 3), frac(2, 3), frac(-2, 3)]);
  const b = rng.intExcept(-4, 4, [0]);
  const decimal = m.d === 2 && rng.chance(0.4);
  const eq = `y = ${lineTex(m, b, 'x', decimal)}`;
  const cands: Array<[Frac, number]> = [
    [m, b],
    [frac(-m.n, m.d), b],
    [m, -b],
    ...(m.d !== 1 ? [[frac(m.d * Math.sign(m.n), Math.abs(m.n)), b] as [Frac, number]] : [[frac(b), m.n] as [Frac, number]]),
    [m, b > 0 ? b - 3 : b + 3],
  ];
  const seen = new Set<string>();
  const opts = cands
    .filter(([p, q]) => p.n !== 0 && Math.abs(q) <= 5 && !seen.has(`${p.n}/${p.d},${q}`) && seen.add(`${p.n}/${p.d},${q}`))
    .slice(0, 4)
    .map(([p, q], i) => ({ md: '', figure: lineChoice(p, q) as Figure, correct: i === 0 }));
  const q = m.d;
  const xs = [-q, 0, q];
  return {
    prompt: `Which graph shows the linear relation $${eq}$?`,
    parts: [part(mcFigures(rng, opts))],
    hints: [
      q === 1 ? 'Make a table of values with a few easy values of $x$, such as $-1$, $0$ and $1$.' : `Make a table of values. Choose values of $x$ that are multiples of $${q}$, so that the values of $y$ are integers.`,
      'Find the graph that passes through every point in your table. Check where it crosses the $y$-axis and whether it rises or falls.',
    ],
    solution: [
      `Table of values: ${xs.map((x) => `when $x = ${x}$, ${substTex(m, b, x, 'y', decimal)}`).join('; ')}.`,
      `So the graph passes through ${xs.map((x) => `$(${x},\\ ${fmt(clean(val(m) * x + b))})$`).join(', ')}.`,
      `It crosses the $y$-axis at $(0,\\ ${b})$ and ${m.n > 0 ? 'rises' : 'falls'} from left to right: ${m.n > 0 ? 'up' : 'down'} $${Math.abs(m.n)}$ for every $${q}$ to the right.`,
      `The correct graph is the line through $(0,\\ ${b})$ and $(${q},\\ ${b + m.n})$.`,
    ],
  };
}

function discreteOrContinuous(rng: Rng): Out {
  const c = rng.pick(G_CTX)(rng, rng.pick(NAMES));
  return {
    prompt: `${c.words} The equation $${c.eq}$ describes the relation.\n\nShould the graph show separate points (discrete data) or a line (continuous data)?`,
    parts: [part(mc(rng, c.right, c.wrong))],
    hints: ['Ask yourself: can the variable on the horizontal axis take values between whole numbers?', 'Counts of things (people, tickets, shirts) are discrete. Measurements such as time, length and volume are continuous.'],
    solution: [
      c.discrete
        ? `$${c.xv}$ counts whole things, so values such as $${c.xv} = 2.5$ make no sense. Only whole-number points belong on the graph.`
        : `$${c.xv}$ is a measurement of time, so values between whole numbers, such as $${c.xv} = 2.5$, make sense. Every point on the line belongs to the relation.`,
      c.right,
    ],
  };
}

function graphContext(rng: Rng): Out {
  const c = rng.pick(G_CTX)(rng, rng.pick(NAMES));
  const wrongB = retry(() => c.b + c.yStep * rng.pick([-2, -1, 1, 2]), (v) => v !== c.b && (c.b >= 0 ? v >= 0 : true));
  const r = val(c.m);
  // A wrong rate: the change for one step written as if it were the change per unit, or the rate doubled.
  const wrongM = c.m.d !== 1 ? frac(c.m.n, 1) : frac(c.m.n * 2);
  const figs = [
    { md: '', figure: ctxGraph(c) as Figure, correct: true },
    { md: '', figure: ctxGraph(c, { discrete: !c.discrete }) as Figure },
    { md: '', figure: ctxGraph(c, { b: wrongB }) as Figure },
    { md: '', figure: ctxGraph(c, { m: wrongM }) as Figure },
  ];
  const x1 = c.data[1];
  return {
    prompt: `${c.words} The equation $${c.eq}$ describes the relation.\n\n(a) Are the data discrete or continuous?\n\n(b) Which graph shows the relation?`,
    parts: [part(mc(rng, c.right, c.wrong), { label: '(a)' }), part(mcFigures(rng, figs), { label: '(b)' })],
    hints: [
      'Can the horizontal variable take values between whole numbers? If not, the graph is separate points.',
      `Make a short table of values from the equation (for example $${c.xv} = 0$ and $${c.xv} = ${x1}$) and find the graph that passes through those points.`,
    ],
    solution: [
      `(a) ${c.right}`,
      `(b) When $${c.xv} = 0$, $${c.yv} = ${fmt(c.b)}$. When $${c.xv} = ${x1}$, ${substTex(c.m, c.b, x1, c.yv, true)}.`,
      `The graph must start at $(0,\\ ${fmt(c.b)})$, pass through $(${x1},\\ ${fmt(clean(r * x1 + c.b))})$, and be drawn as ${c.discrete ? 'separate points' : 'a solid line'}.`,
      `(a) ${c.discrete ? 'Discrete' : 'Continuous'} (b) the graph ${c.discrete ? 'of separate points' : 'with a line'} through $(0,\\ ${fmt(c.b)})$ and $(${x1},\\ ${fmt(clean(r * x1 + c.b))})$`,
    ],
  };
}

// ---------------------------------------------------------------------------
// 4.2 Interpolating and extrapolating
// ---------------------------------------------------------------------------

const KIND_OPTS = [
  'Interpolation: the value is between the data points.',
  'Extrapolation: the value is beyond the data points.',
  'Neither: a value worked out from an equation is not interpolated or extrapolated.',
];

function interpolate(rng: Rng, d: Difficulty): Out {
  const name = rng.pick(NAMES);
  const c = retry(() => rng.pick(G_CTX)(rng, name), (k) => !k.discrete);
  const yAt = (x: number) => clean(val(c.m) * x + c.b);
  const last = c.data[c.data.length - 1];
  const onGrid = (x: number) => Math.abs(yAt(x) / c.yStep - Math.round(yAt(x) / c.yStep)) < 1e-9;
  const inner = Array.from({ length: last }, (_, x) => x).filter((x) => x > 1 && x % c.xStep === 0 && !c.data.includes(x) && onGrid(x));
  const xi = rng.pick(inner);
  const fig = ctxGraph(c, { to: last, data: true });
  const intro = `${c.words} ${name} recorded some data and graphed it.`;
  if (d === 1) {
    const backwards = rng.chance(0.35);
    return {
      prompt: `${intro}\n\n${backwards ? c.askX(yAt(xi)) : c.askY(xi)}`,
      figure: fig,
      parts: [backwards ? c.xPart(xi) : c.yPart(yAt(xi))],
      hints: [
        'The value you need is between two data points, so read it from the line. This is called interpolating.',
        backwards
          ? 'Start on the vertical axis, go across to the line, then straight down to the horizontal axis. Check the scale on each axis.'
          : 'Start on the horizontal axis, go up to the line, then straight across to the vertical axis. Check the scale on each axis.',
      ],
      solution: [
        backwards
          ? `Find $${fmt(yAt(xi))}$ on the vertical axis, go across to the line, then down: ${c.xSay(xi)}.`
          : `Find $${xi}$ on the horizontal axis, go up to the line, then across: ${c.ySay(yAt(xi))}.`,
        `The value is between the data points at $${c.xv} = ${Math.max(...c.data.filter((x) => x < xi))}$ and $${c.xv} = ${Math.min(...c.data.filter((x) => x > xi))}$, so this is interpolation.`,
        backwards ? `${c.xSay(xi)}` : `${c.ySay(yAt(xi))}`,
      ],
    };
  }
  // Values beyond the data.
  const end = c.m.n < 0 ? -c.b / val(c.m) : null;
  const beyond = Array.from({ length: 30 }, (_, i) => last + c.xStep * (i + 1)).filter((x) => onGrid(x) && (end === null || x < end) && x <= last + 20);
  const xo = rng.pick(beyond.length ? beyond : [last + c.xStep]);
  const yo = yAt(xo);
  if (d === 2) {
    const askKind = rng.chance(0.5);
    const useInner = askKind && rng.chance(0.4);
    const xq = useInner ? xi : xo;
    const kindRight = useInner ? KIND_OPTS[0] : KIND_OPTS[1];
    return {
      prompt: `${intro} The equation of the relation is $${c.eq}$.\n\n(a) ${c.askY(xq)}\n\n(b) Is this interpolation or extrapolation?`,
      figure: fig,
      parts: [c.yPart(yAt(xq), '(a)'), part(mc(rng, kindRight, KIND_OPTS.filter((o) => o !== kindRight)), { label: '(b)' })],
      hints: [`Substitute $${c.xv} = ${xq}$ into the equation.`, `Compare $${xq}$ with the data, which go from $${c.xv} = 0$ to $${c.xv} = ${last}$.`],
      solution: [
        `(a) ${substTex(c.m, c.b, xq, c.yv, true)}`,
        useInner
          ? `(b) $${xq}$ is between $0$ and $${last}$, inside the data, so this is interpolation.`
          : `(b) $${xq}$ is greater than $${last}$, beyond the data, so this is extrapolation. It assumes the pattern keeps going.`,
        `(a) ${c.ySay(yAt(xq))} (b) ${useInner ? 'interpolation' : 'extrapolation'}`,
      ],
    };
  }
  // d3: no equation; read the rate from the graph, interpolate, then extrapolate backwards from a value.
  const rateTex = coefTex(frac(Math.abs(c.m.n), c.m.d), true);
  const [x0, x1] = [c.data[0], c.data[1]];
  const dy = clean(yAt(x1) - yAt(x0));
  return {
    prompt: `${c.start} ${name} recorded some data and graphed it.\n\n(a) ${c.askY(xi)}\n\n(b) If the pattern continues, ${c.askX(yo).replace(/^./, (s) => s.toLowerCase())}`,
    figure: fig,
    parts: [c.yPart(yAt(xi), '(a)'), c.xPart(xo, '(b)')],
    hints: [
      'For (a), read the line between the data points (interpolation).',
      `For (b), the value is beyond the graph. Use two points to find how much $${c.yv}$ changes for each unit of $${c.xv}$, write an equation, and solve it (extrapolation).`,
    ],
    solution: [
      `(a) Go up from $${xi}$ on the horizontal axis to the line and across: ${c.ySay(yAt(xi))}.`,
      `(b) From $(${x0},\\ ${fmt(yAt(x0))})$ to $(${x1},\\ ${fmt(yAt(x1))})$, $${c.yv}$ changes by $${fmt(dy)}$ over $${x1 - x0}$, which is $${fmt(dy)} \\div ${x1 - x0} = ${c.m.n < 0 ? '-' : ''}${rateTex}$ ${c.per}.`,
      `The line starts at $${fmt(c.b)}$, so $${c.eq}$.`,
      `Substitute $${c.yv} = ${fmt(yo)}$ and solve: $${c.xv} = (${fmt(yo)} - ${paren(fmt(c.b))}) \\div ${paren(c.m.d === 1 ? `${c.m.n}` : `${c.m.n < 0 ? '-' : ''}${rateTex}`)} = ${fmt(xo)}$.`,
      `Check: ${substTex(c.m, c.b, xo, c.yv, true)}. ${works}`,
      `(a) ${c.ySay(yAt(xi))} (b) ${c.xSay(xo)}`,
    ],
  };
}

// ---------------------------------------------------------------------------
// Skill definitions
// ---------------------------------------------------------------------------

export const LINEAR_SKILLS: SkillDef[] = [
  skill({
    id: 'm9-pattern-equation',
    name: 'Writing equations for patterns',
    description: 'Write a linear equation for a pattern or a situation, such as C = 25 + 8n, verify it by substitution, and use it.',
    outcomes: ['PR1'],
    lessonId: 'm9-4-1',
    gen: patternEquation,
  }),
  skill({
    id: 'm9-linear-graph',
    name: 'Graphing linear relations',
    description: 'Match a linear relation, including rational coefficients, to its graph, and decide whether the data are discrete or continuous.',
    outcomes: ['PR2'],
    lessonId: 'm9-4-2',
    format: 'mc',
    gen: linearGraph,
  }),
  skill({
    id: 'm9-interpolate-extrapolate',
    name: 'Interpolating and extrapolating',
    description: 'Read values between data points on a graph and extend a linear relation beyond the data, using a graph or an equation.',
    outcomes: ['PR2'],
    lessonId: 'm9-4-2',
    gen: interpolate,
  }),
];

