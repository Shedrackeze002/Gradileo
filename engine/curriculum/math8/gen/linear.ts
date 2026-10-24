/** Math 8 Unit 6 — Linear Relations (PR1). */
import { mc, mcFigures, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { paren } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, Line, Part, PlaneFigure, SkillDef, TableFigure } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Liam', 'Priya', 'Mateo', 'Aiyana', 'Jun', 'Fatima', 'Noah', 'Harpreet', 'Olivia', 'Tariq', 'Mei',
  'Kwame', 'Chloé', 'Ravi', 'Sienna', 'Dakota', 'Ethan', 'Leilani', 'Omar', 'Nadia', 'Jaxon', 'Ayesha', 'Wei',
  'Isabelle', 'Kiran', 'Malik', 'Sofia', 'Gurpreet', 'Hiroshi', 'Zara', 'Émile', 'Thandiwe', 'Connor', 'Rosa', 'Tyler',
];
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater'];

type Out = GenOutput;

/** The right side a·x + b in LaTeX: 3x - 2, -x + 4, 5x, 7. */
function rhs(a: number, b: number, v = 'x'): string {
  const ax = a === 0 ? '' : a === 1 ? v : a === -1 ? `-${v}` : `${a}${v}`;
  if (!ax) return `${b}`;
  if (b === 0) return ax;
  return `${ax} ${b < 0 ? '-' : '+'} ${Math.abs(b)}`;
}

/** An equation y = ax + b; a falling relation with a positive start reads better as y = b - ax. */
function eqn(a: number, b: number, yv = 'y', xv = 'x'): string {
  if (a < 0 && b > 0) return `${yv} = ${b} - ${a === -1 ? '' : -a}${xv}`;
  return `${yv} = ${rhs(a, b, xv)}`;
}

/** Substitution for y = ax + b at x, e.g. y = 3(-2) - 2 = -6 - 2 = -8 or h = 12 - 2(3) = 12 - 6 = 6. */
function subst(a: number, b: number, x: number, yv = 'y'): string {
  const y = a * x + b;
  const chain: string[] = [];
  if (a < 0 && b > 0) {
    // Written as b - |a|x, like the equation.
    const prod = -a * x;
    chain.push(`${b} - ${a === -1 ? paren(x) : `${-a}(${x})`}`);
    if (a !== -1) chain.push(`${b} - ${paren(prod)}`);
    if (prod < 0) chain.push(`${b} + ${-prod}`);
  } else {
    const first = a === 1 ? paren(x) : a === -1 ? `-${paren(x)}` : `${a}(${x})`;
    const tail = b === 0 ? '' : ` ${b < 0 ? '-' : '+'} ${Math.abs(b)}`;
    chain.push(`${first}${tail}`);
    if (a !== 1 && b !== 0) chain.push(`${a * x}${tail}`);
  }
  chain.push(`${y}`);
  return `$${yv} = ${chain.join(' = ')}$`;
}

/** A plain x–y table of values; `blank` marks the y-values to fill in. */
function xyTable(xs: number[], ys: number[], blank: boolean[] = [], xh = '$x$', yh = '$y$'): TableFigure {
  return { type: 'table', horizontal: true, headers: [xh, yh], rows: xs.map((x, i) => [String(x), blank[i] ? '?' : String(ys[i])]) };
}

/** "As x increases by 1, y increases by 3." */
const xyChange = (dir: number, amt: number) =>
  dir === 0 ? 'As $x$ increases by $1$, $y$ stays the same.' : `As $x$ increases by $1$, $y$ ${dir > 0 ? 'increases' : 'decreases'} by $${amt}$.`;

/** Distinct pattern sentences: the right one first, then distractors from real mistakes. */
function changeOptions(a: number, b: number, say: (dir: number, amt: number) => string, stepX = 1): string[] {
  const dir = Math.sign(a);
  const opts = [say(dir, Math.abs(a)), say(-dir, Math.abs(a))];
  if (stepX !== 1) opts.push(say(dir, Math.abs(a * stepX)));
  if (b !== 0 && Math.abs(b) !== Math.abs(a)) opts.push(say(dir, Math.abs(b)));
  if (a + b !== 0 && Math.abs(a + b) !== Math.abs(a)) opts.push(say(dir, Math.abs(a + b)));
  opts.push(say(0, 0));
  return opts;
}

// --- Graphs -----------------------------------------------------------------

const lineThrough = (p: [number, number], q: [number, number]): Line => ({ A: q[1] - p[1], B: -(q[0] - p[0]), C: (q[0] - p[0]) * p[1] - (q[1] - p[1]) * p[0] });

/** A graph of y = ax + b on a square grid, with points plotted at the given x-values. */
function xyGraph(a: number, b: number, xs: number[], R = 8): PlaneFigure {
  return {
    type: 'plane',
    grid: { xMin: -R, xMax: R, yMin: -R, yMax: R },
    lines: [{ through: [[0, b], [1, a + b]] }],
    points: xs.map((x) => ({ x, y: a * x + b })),
  };
}

/** A bare line y = ax + b for picture choices. */
function lineChoice(a: number, b: number): PlaneFigure {
  return { type: 'plane', grid: { xMin: -6, xMax: 6, yMin: -6, yMax: 6 }, lines: [{ line: lineThrough([0, b], [1, a + b]) }] };
}

// ---------------------------------------------------------------------------
// Contexts
// ---------------------------------------------------------------------------

interface Ctx {
  /** The situation, ending with the equation. */
  intro: string;
  /** The situation in words only (no equation). */
  words: string;
  /** The situation without its numbers, for finding the rule from a table. */
  scene: string;
  xv: string;
  yv: string;
  a: number;
  b: number;
  xHead: string;
  yHead: string;
  xLabel: string;
  yLabel: string;
  /** Largest x on a graph. */
  xMax: number;
  /** Pattern sentence for a change in y when x goes up by 1. */
  say: (dir: number, amt: number) => string;
  /** A y-value in prose. */
  ySay: (y: number) => string;
  /** An x-value in prose. */
  xSay: (x: number) => string;
  yPart: (y: number, label?: string) => Part;
  xPart: (x: number, label?: string) => Part;
  /** Question for y at a given x. */
  askY: (x: number) => string;
  /** Question for x at a given y. */
  askX: (y: number) => string;
}

const dollars = (v: number) => `\\$${v}`;
const moneyY = (y: number, label?: string) => numPart(y, { label: label ? `${label} \\$` : '\\$' });
const withUnit = (u: string) => (v: number, label?: string) => numPart(v, { label, suffix: u });

const CTX: Array<(rng: Rng, name: string) => Ctx> = [
  (rng, name) => {
    const fee = rng.pick([15, 20, 25, 30, 35]);
    const r = rng.pick([5, 10]);
    const words = `${name}’s phone plan costs ${dollars(fee)} a month plus ${dollars(r)} for each gigabyte (GB) of data used.`;
    return {
      words,
      scene: `${name} has a phone plan with a monthly fee plus a charge for each gigabyte (GB) of data used.`,
      intro: `${words} The equation $C = ${r}g + ${fee}$ gives the monthly cost $C$, in dollars, for $g$ GB of data.`,
      xv: 'g', yv: 'C', a: r, b: fee,
      xHead: 'Data, $g$ (GB)', yHead: 'Cost, $C$ (\\$)', xLabel: 'Data used (GB)', yLabel: 'Monthly cost ($)', xMax: 8,
      say: (dir, amt) => (dir === 0 ? 'The cost stays the same no matter how much data is used.' : `As the data used increases by $1$ GB, the cost ${dir > 0 ? 'increases' : 'decreases'} by ${dollars(amt)}.`),
      ySay: dollars, xSay: (x) => `$${x}$ GB`,
      yPart: moneyY, xPart: withUnit('GB'),
      askY: (x) => `What is the cost for $${x}$ GB of data?`,
      askX: (y) => `How many GB of data give a bill of ${dollars(y)}?`,
    };
  },
  (rng, name) => {
    const r = rng.pick([2, 3]);
    const start = r === 2 ? rng.pick([4, 6, 8]) : rng.pick([3, 6]);
    const town = rng.pick(TOWNS);
    const words = `A taxi in ${town} charges ${dollars(start)} to start plus ${dollars(r)} for each kilometre. ${name} takes a ride.`;
    return {
      words,
      scene: `${name} takes a taxi in ${town}. The fare is a starting fee plus a charge for each kilometre.`,
      intro: `${words} The equation $F = ${r}d + ${start}$ gives the fare $F$, in dollars, for a ride of $d$ kilometres.`,
      xv: 'd', yv: 'F', a: r, b: start,
      xHead: 'Distance, $d$ (km)', yHead: 'Fare, $F$ (\\$)', xLabel: 'Distance (km)', yLabel: 'Fare ($)', xMax: 8,
      say: (dir, amt) => (dir === 0 ? 'The fare stays the same for every distance.' : `As the distance increases by $1$ km, the fare ${dir > 0 ? 'increases' : 'decreases'} by ${dollars(amt)}.`),
      ySay: dollars, xSay: (x) => `$${x}$ km`,
      yPart: moneyY, xPart: withUnit('km'),
      askY: (x) => `What is the fare for a $${x}$ km ride?`,
      askX: (y) => `How long is a ride that costs ${dollars(y)}?`,
    };
  },
  (rng, name) => {
    const start = rng.pick([20, 30, 40, 50, 60]);
    const r = rng.pick([10, 15, 20, 25, 10, 20]);
    const goal = rng.pick(['a new bike', 'a hockey stick', 'a concert ticket', 'a tablet', 'a camping trip']);
    const words = `${name} has ${dollars(start)} saved for ${goal} and adds ${dollars(r)} every week.`;
    return {
      words,
      scene: `${name} is saving for ${goal} and adds the same amount every week.`,
      intro: `${words} The equation $S = ${r}w + ${start}$ gives the savings $S$, in dollars, after $w$ weeks.`,
      xv: 'w', yv: 'S', a: r, b: start,
      xHead: 'Week, $w$', yHead: 'Savings, $S$ (\\$)', xLabel: 'Time (weeks)', yLabel: 'Savings ($)', xMax: 8,
      say: (dir, amt) => (dir === 0 ? 'The savings stay the same every week.' : `As the number of weeks increases by $1$, the savings ${dir > 0 ? 'increase' : 'decrease'} by ${dollars(amt)}.`),
      ySay: dollars, xSay: (x) => `$${x}$ weeks`,
      yPart: moneyY, xPart: withUnit('weeks'),
      askY: (x) => `How much has ${name} saved after $${x}$ weeks?`,
      askX: (y) => `After how many weeks will ${name} have ${dollars(y)}?`,
    };
  },
  (rng, name) => {
    const r = rng.pick([2, 3]);
    const H = r * rng.int(6, 10);
    const words = `${name} lights a candle that is $${H}$ cm tall. It burns down $${r}$ cm every hour.`;
    return {
      words,
      scene: `${name} lights a candle. It burns down at a steady rate.`,
      intro: `${words} The equation $h = ${H} - ${r}t$ gives the height $h$, in centimetres, after $t$ hours.`,
      xv: 't', yv: 'h', a: -r, b: H,
      xHead: 'Time, $t$ (h)', yHead: 'Height, $h$ (cm)', xLabel: 'Time (h)', yLabel: 'Height (cm)', xMax: H / r,
      say: (dir, amt) => (dir === 0 ? 'The height of the candle stays the same.' : `As the time increases by $1$ h, the height ${dir > 0 ? 'increases' : 'decreases'} by $${amt}$ cm.`),
      ySay: (y) => `$${y}$ cm`, xSay: (x) => `$${x}$ h`,
      yPart: withUnit('cm'), xPart: withUnit('h'),
      askY: (x) => `How tall is the candle after $${x}$ hours?`,
      askX: (y) => `After how many hours is the candle $${y}$ cm tall?`,
    };
  },
  (rng) => {
    const r = rng.pick([2, 3]);
    const T0 = r === 2 ? -rng.pick([8, 10, 12, 14]) : -rng.pick([9, 12, 15]);
    const town = rng.pick(TOWNS);
    const words = `At 6 a.m. it was $${T0}^\\circ\\text{C}$ in ${town}. A warm wind from the mountains made the temperature rise $${r}^\\circ\\text{C}$ every hour.`;
    return {
      words,
      scene: `One winter morning in ${town}, a warm wind from the mountains made the temperature rise steadily after 6 a.m.`,
      intro: `${words} The equation $T = ${r}h - ${-T0}$ gives the temperature $T$, in degrees Celsius, $h$ hours after 6 a.m.`,
      xv: 'h', yv: 'T', a: r, b: T0,
      xHead: 'Hours after 6 a.m., $h$', yHead: 'Temperature, $T$ (°C)', xLabel: 'Hours after 6 a.m.', yLabel: 'Temperature (°C)', xMax: 8,
      say: (dir, amt) => (dir === 0 ? 'The temperature stays the same.' : `As the time increases by $1$ h, the temperature ${dir > 0 ? 'rises' : 'falls'} by $${amt}^\\circ\\text{C}$.`),
      ySay: (y) => `$${y}^\\circ\\text{C}$`, xSay: (x) => `$${x}$ h`,
      yPart: withUnit('°C'), xPart: withUnit('h'),
      askY: (x) => `What is the temperature $${x}$ hours after 6 a.m.?`,
      askX: (y) => `How many hours after 6 a.m. is the temperature $${y}^\\circ\\text{C}$?`,
    };
  },
  (rng, name) => {
    const r = rng.pick([2, 3, 4]);
    const start = -r * rng.pick([0, 1, 2]);
    const where = start === 0 ? 'at the surface of a lake' : `$${-start}$ m below the surface of a lake`;
    const words = `${name} is scuba diving. ${name} starts ${where} and goes down $${r}$ m every minute.`;
    return {
      words,
      scene: `${name} is scuba diving and goes down at a steady rate.`,
      intro: `${words} The equation $E = ${rhs(-r, start, 'm')}$ gives the elevation $E$, in metres, compared with the surface after $m$ minutes. (A negative elevation is below the surface.)`,
      xv: 'm', yv: 'E', a: -r, b: start,
      xHead: 'Time, $m$ (min)', yHead: 'Elevation, $E$ (m)', xLabel: 'Time (min)', yLabel: 'Elevation (m)', xMax: 6,
      say: (dir, amt) => (dir === 0 ? 'The elevation stays the same.' : `As the time increases by $1$ min, the elevation ${dir > 0 ? 'increases' : 'decreases'} by $${amt}$ m.`),
      ySay: (y) => `$${y}$ m`, xSay: (x) => `$${x}$ min`,
      yPart: withUnit('m'), xPart: withUnit('min'),
      askY: (x) => `What is ${name}’s elevation after $${x}$ minutes?`,
      askX: (y) => `After how many minutes is ${name} at an elevation of $${y}$ m?`,
    };
  },
];

/** A grid step for the vertical axis that fits every value at a whole number and keeps at most 20 grid lines. */
function graphStep(c: Ctx): number | null {
  const ys = [0, c.xMax].map((x) => c.a * x + c.b);
  const range = Math.max(0, ...ys) - Math.min(0, ...ys);
  // Equal steps on both axes would draw square cells and a very tall graph, so a step of 1 is kept for short ranges.
  const fits = (s: number) => c.a % s === 0 && c.b % s === 0 && range / s <= 20 && range / s >= 4;
  return [2, 3, 4, 5, 10, 20].find(fits) ?? (range <= 10 && fits(1) ? 1 : null);
}

/** A context graph: data points at `xs`, a solid line through them and a dashed extension. */
function ctxGraph(c: Ctx, xs: number[]): PlaneFigure {
  const yAt = (x: number) => c.a * x + c.b;
  const ys = [0, c.xMax].map(yAt);
  const lo = Math.min(0, ...ys);
  const hi = Math.max(0, ...ys);
  const step = graphStep(c) ?? 1;
  const yMin = Math.floor(lo / step) * step;
  const yMax = hi > 0 ? Math.ceil(hi / step) * step + step : 0;
  const x0 = xs[0];
  const x1 = xs[xs.length - 1];
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: c.xMax, yMin, yMax, xStep: 1, yStep: step, xLabel: c.xLabel, yLabel: c.yLabel },
    points: xs.map((x) => ({ x, y: yAt(x) })),
    polylines: [{ points: [[x0, yAt(x0)], [x1, yAt(x1)]] }],
    segments: [
      ...(x0 > 0 ? [{ from: [0, yAt(0)] as [number, number], to: [x0, yAt(x0)] as [number, number], dashed: true }] : []),
      ...(x1 < c.xMax ? [{ from: [x1, yAt(x1)] as [number, number], to: [c.xMax, yAt(c.xMax)] as [number, number], dashed: true }] : []),
    ],
  };
}

// ---------------------------------------------------------------------------
// 6.1 Tables of values
// ---------------------------------------------------------------------------

const TABLE_HINTS = (a: number, b: number, x: number) => [
  'Replace $x$ in the equation with each number from the table, one at a time.',
  `For example, when $x = ${x}$: ${subst(a, b, x)}. Multiply first, then add or subtract.`,
];

function linearTable(rng: Rng, d: Difficulty): Out {
  if (d === 3) return tableContext(rng);
  const a = d === 1 ? rng.int(2, 5) : rng.pick([-5, -4, -3, -2, -1, 2, 3, 4, 5]);
  const b = d === 1 ? rng.intExcept(-3, 9, [0]) : rng.intExcept(-7, 7, [0]);
  const xs = d === 1 ? rng.pick([[0, 1, 2, 3], [1, 2, 3, 4]]) : rng.pick([[-2, -1, 0, 1, 2], [-3, -2, -1, 0, 1], [-1, 0, 1, 2, 3]]);
  const ys = xs.map((x) => a * x + b);
  const withPattern = d === 2 && rng.chance(0.45);
  // d1: the first column is filled in as an example. d2: one column (or two, with a pattern question) is given.
  const shown = d === 1 ? [0] : withPattern ? rng.sample([0, 1, 2, 3, 4], 2) : [rng.int(0, 4)];
  const blank = xs.map((_, i) => !shown.includes(i));
  const ask = xs.map((_, i) => i).filter((i) => blank[i]);
  const parts: Part[] = ask.map((i) => numPart(ys[i], { label: `When $x = ${xs[i]}$, $y =$` }));
  const steps = ask.map((i) => `When $x = ${xs[i]}$: ${subst(a, b, xs[i])}`);
  const done = `The completed table: ${xs.map((x, i) => `$(${x},\\ ${ys[i]})$`).join(', ')}.`;
  const hints = TABLE_HINTS(a, b, xs[ask[0]]);
  if (withPattern) {
    const opts = changeOptions(a, b, xyChange);
    parts.push(part(mc(rng, opts[0], opts.slice(1)), { label: 'Which sentence describes the pattern?' }));
    return {
      prompt: `Complete the table of values for $${eqn(a, b)}$. Then choose the sentence that describes the pattern.`,
      figure: xyTable(xs, ys, blank),
      parts,
      hints: [hints[1], 'For the pattern, subtract each $y$-value from the next one. Is the change the same every time? Is it up or down?'],
      solution: [
        ...steps,
        done,
        `Each time $x$ goes up by $1$, $y$ changes by $${ys[1]} - ${paren(ys[0])} = ${a}$.`,
        `${opts[0]} This matches the number that multiplies $x$ in the equation.`,
      ],
    };
  }
  return {
    prompt: `Complete the table of values for the linear relation $${eqn(a, b)}$.`,
    figure: xyTable(xs, ys, blank),
    parts,
    hints,
    solution: [...steps, done],
  };
}

function tableContext(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const c = rng.pick(CTX)(rng, name);
  const stepX = c.xMax >= 8 && rng.chance(0.4) ? 2 : 1;
  const n = 5;
  const xs = Array.from({ length: n }, (_, i) => i * stepX).filter((x) => x <= c.xMax);
  const ys = xs.map((x) => c.a * x + c.b);
  const ask = rng.sample(xs.map((_, i) => i).slice(1), 2).sort((p, q) => p - q);
  const blank = xs.map((_, i) => ask.includes(i));
  const opts = changeOptions(c.a, c.b, c.say, stepX);
  const table: TableFigure = {
    type: 'table',
    horizontal: true,
    headers: [c.xHead, c.yHead],
    rows: xs.map((x, i) => [String(x), blank[i] ? '?' : String(ys[i])]),
  };
  return {
    prompt: `${c.intro}\n\nComplete the table of values, then choose the sentence that describes the pattern.`,
    figure: table,
    parts: [
      ...ask.map((i) => c.yPart(ys[i], `$${c.xv} = ${xs[i]}$:`)),
      part(mc(rng, opts[0], opts.slice(1)), { label: 'Which sentence describes the pattern?' }),
    ],
    hints: [
      `Substitute each value of $${c.xv}$ into the equation. For example, ${subst(c.a, c.b, xs[ask[0]], c.yv).replace(/^\$/, `$${c.xv} = ${xs[ask[0]]}$ gives $`)}.`,
      stepX === 1
        ? `For the pattern, look at how much $${c.yv}$ changes from one column to the next.`
        : `The table goes up by $${stepX}$ each time. Find how much $${c.yv}$ changes over $${stepX}$, then divide by $${stepX}$ to get the change for $1$.`,
    ],
    solution: [
      ...ask.map((i) => `When $${c.xv} = ${xs[i]}$: ${subst(c.a, c.b, xs[i], c.yv)}`),
      stepX === 1
        ? `Each column, $${c.yv}$ changes by $${ys[1]} - ${paren(ys[0])} = ${c.a}$.`
        : `Each column, $${c.xv}$ goes up by $${stepX}$ and $${c.yv}$ changes by $${ys[1]} - ${paren(ys[0])} = ${c.a * stepX}$. So for each $1$, $${c.yv}$ changes by $${c.a * stepX} \\div ${stepX} = ${c.a}$.`,
      `The missing values are ${ask.map((i) => c.ySay(ys[i])).join(' and ')}. ${opts[0]}`,
    ],
  };
}

// ---------------------------------------------------------------------------
// 6.2 Graphing and reading values
// ---------------------------------------------------------------------------

/** Pure relations whose plotted points fit on an 8-by-8 grid. */
function pureRelation(rng: Rng, d: Difficulty): { a: number; b: number; xs: number[] } {
  return retry(
    () => {
      const a = d === 1 ? rng.pick([1, 2, 3, -1, -2]) : rng.pick([-3, -2, -1, 1, 2, 3]);
      const b = rng.int(-4, 4);
      const xs = [-3, -2, -1, 0, 1, 2, 3].filter((x) => Math.abs(a * x + b) <= 7);
      return { a, b, xs };
    },
    (r) => r.xs.length >= 4 && r.b !== 0,
  );
}

function linearGraph(rng: Rng, d: Difficulty): Out {
  if (d === 3) return graphContext(rng);
  const { a, b, xs } = pureRelation(rng, d);
  const yAt = (x: number) => a * x + b;
  if (d === 1) {
    const plotted = xs.slice(0, 5);
    const x = rng.pick(plotted);
    const y = yAt(x);
    const askX = rng.chance(0.35);
    return {
      prompt: askX
        ? `The graph shows a linear relation. Use the graph to find the value of $x$ when $y = ${y}$.`
        : `The graph shows a linear relation. Use the graph to find the value of $y$ when $x = ${x}$.`,
      figure: xyGraph(a, b, plotted),
      parts: [askX ? numPart(x, { label: '$x =$' }) : numPart(y, { label: '$y =$' })],
      hints: askX
        ? [`Find $${y}$ on the $y$-axis (the vertical axis).`, `Move straight across to the line, then straight up or down to the $x$-axis.`]
        : [`Find $${x}$ on the $x$-axis (the horizontal axis).`, `Move straight up or down to the line, then straight across to the $y$-axis.`],
      solution: askX
        ? [`Start at $${y}$ on the $y$-axis and move across to the line.`, `The line passes through the point $(${x},\\ ${y})$.`, `Move down or up to the $x$-axis: $x = ${x}$.`]
        : [`Start at $${x}$ on the $x$-axis and move to the line.`, `The line passes through the point $(${x},\\ ${y})$.`, `Move across to the $y$-axis: $y = ${y}$.`],
    };
  }
  if (rng.chance(0.45)) {
    // Draw the graph.
    const [x1, x2] = rng.sample(xs, 2).sort((p, q) => p - q);
    const tab = xs.slice(0, 4).map((x) => `$(${x},\\ ${yAt(x)})$`).join(', ');
    return {
      prompt: `Graph the linear relation $${eqn(a, b)}$. Make a table of values first, then place two points from your table on the grid.`,
      parts: [part({ kind: 'graph-line', line: lineThrough([0, b], [1, a + b]), grid: { xMin: -8, xMax: 8, yMin: -8, yMax: 8 } })],
      hints: [
        `Choose easy values for $x$, such as $0$ and $1$, and find $y$ for each one.`,
        `When $x = 0$: ${subst(a, b, 0)}. So $(0,\\ ${b})$ is on the line. Find one more point the same way.`,
      ],
      solution: [
        `Make a table of values. For example, when $x = ${x1}$: ${subst(a, b, x1)}, and when $x = ${x2}$: ${subst(a, b, x2)}.`,
        `More points on the line: ${tab}.`,
        `Plot any two of these points. They line up because the relation is linear.`,
        `The graph is the straight line through $(0,\\ ${b})$ and $(1,\\ ${a + b})$.`,
      ],
    };
  }
  // Read values between and beyond three plotted points.
  return graphReadBetween(rng);
}

function graphReadBetween(rng: Rng): Out {
  const starts = (a: number, b: number) => [-4, -2, 0].filter((x0) => [x0, x0 + 2, x0 + 4].every((x) => Math.abs(a * x + b) <= 7));
  const { a, b } = retry(() => pureRelation(rng, 2), (r) => starts(r.a, r.b).length > 0);
  const yAt = (x: number) => a * x + b;
  const yOk = (x: number) => Math.abs(yAt(x)) <= 7;
  const x0 = rng.pick(starts(a, b).length ? starts(a, b) : [-2]);
  const plotted = [x0, x0 + 2, x0 + 4].filter(yOk);
  const others = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].filter((x) => !plotted.includes(x) && yOk(x));
  const between = others.filter((x) => x > plotted[0] && x < plotted[plotted.length - 1]);
  const beyond = others.filter((x) => x < plotted[0] || x > plotted[plotted.length - 1]);
  const xIn = between.length ? rng.pick(between) : rng.pick(others);
  const xOut = beyond.length ? rng.pick(beyond) : rng.pick(others.filter((x) => x !== xIn));
  const ask = [xIn, xOut];
  return {
    prompt: `The graph of a linear relation is shown, with ${plotted.length === 3 ? 'three' : 'some'} points from its table of values marked. Use the line to find each value of $y$.`,
    figure: xyGraph(a, b, plotted),
    parts: ask.map((x) => numPart(yAt(x), { label: `When $x = ${x}$, $y =$` })),
    hints: [
      'The values you need are not marked with dots, but every point on the line belongs to the relation.',
      'Find the $x$-value on the $x$-axis, move to the line, then across to the $y$-axis. Extend the line with a ruler if you need to.',
    ],
    solution: [
      ...ask.map((x) => `At $x = ${x}$, the line passes through $(${x},\\ ${yAt(x)})$, so $y = ${yAt(x)}$.`),
      `Reading between plotted points is **interpolating**; reading beyond them is **extrapolating**.`,
      `The values are $y = ${yAt(xIn)}$ and $y = ${yAt(xOut)}$.`,
    ],
  };
}

function graphContext(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const c = retry(() => rng.pick(CTX)(rng, name), (k) => k.xMax >= 6 && graphStep(k) !== null);
  const yAt = (x: number) => c.a * x + c.b;
  const stepX = c.xMax >= 8 && rng.chance(0.5) ? 2 : 1;
  const xs = [0, 1, 2, 3].map((i) => i * stepX).filter((x) => x <= c.xMax - 2);
  const fig = ctxGraph(c, xs);
  const last = xs[xs.length - 1];
  // Never ask about x = 1, which reads as "1 weeks".
  const inside = Array.from({ length: last }, (_, i) => i).filter((x) => x > 1 && !xs.includes(x));
  const outside = Array.from({ length: c.xMax - last }, (_, i) => last + 1 + i);
  const parts: Part[] = [];
  const sol: string[] = [];
  const hints = [
    'Read the labels and the scale on each axis before you read any values.',
    'To read a value of the second variable, start on the horizontal axis, go to the line, then across. To work backwards, start on the vertical axis.',
  ];
  let qs: string[];
  if (inside.length && rng.chance(0.6)) {
    const xi = rng.pick(inside);
    const xo = rng.pick(outside);
    qs = [`(a) ${c.askY(xi)}`, `(b) If the pattern continues, ${c.askY(xo).replace(/^./, (m) => m.toLowerCase())}`];
    parts.push(c.yPart(yAt(xi), '(a)'), c.yPart(yAt(xo), '(b)'));
    sol.push(
      `(a) $${xi}$ is between the plotted points. Go up from $${xi}$ on the horizontal axis to the line, then across: ${c.ySay(yAt(xi))}. This is interpolating.`,
      `(b) $${xo}$ is beyond the plotted points, so follow the dashed extension of the line: ${c.ySay(yAt(xo))}. This is extrapolating.`,
      `Check with the equation: ${subst(c.a, c.b, xo, c.yv)}.`,
      `(a) ${c.ySay(yAt(xi))} (b) ${c.ySay(yAt(xo))}`,
    );
  } else {
    const xi = inside.length ? rng.pick(inside) : rng.pick(xs.filter((x) => x > 1));
    const xo = rng.pick(outside);
    qs = [`(a) ${c.askY(xi)}`, `(b) If the pattern continues, ${c.askX(yAt(xo)).replace(/^./, (m) => m.toLowerCase())}`];
    parts.push(c.yPart(yAt(xi), '(a)'), c.xPart(xo, '(b)'));
    sol.push(
      `(a) Go up from $${xi}$ on the horizontal axis to the line, then across to the vertical axis: ${c.ySay(yAt(xi))}.`,
      `(b) Find $${yAt(xo)}$ on the vertical axis. Go across to the dashed part of the line, then down: ${c.xSay(xo)}. This is extrapolating, because it is beyond the data.`,
      `Check with the equation: ${subst(c.a, c.b, xo, c.yv)}.`,
      `(a) ${c.ySay(yAt(xi))} (b) ${c.xSay(xo)}`,
    );
  }
  return {
    prompt: `${c.intro}\n\nThe graph shows the relation. The dots come from a table of values, and the dashed part extends the line.\n\n${qs.join('\n\n')}`,
    figure: fig,
    parts,
    hints,
    solution: sol,
  };
}

// ---------------------------------------------------------------------------
// 6.2 Matching equations, tables and graphs
// ---------------------------------------------------------------------------

/** Distinct wrong equations for y = ax + b, from real mistakes. */
function wrongEquations(a: number, b: number, x1: number, yv = 'y', xv = 'x'): string[] {
  const y1 = a * x1 + b;
  const pairs: Array<[number, number]> = [];
  if (b !== 0) pairs.push([b, a]); // slope and start swapped
  if (x1 !== 0) pairs.push([1, y1 - x1]); // fits the first column only
  if (x1 === 1) pairs.push([a, y1]); // used the first y-value as the start
  pairs.push([a + b, 0]); // fits x = 1 only
  if (b !== 0) pairs.push([a, -b]);
  pairs.push([-a, b]);
  pairs.push([1, a]); // wrote the change as the constant
  pairs.push([a, a]);
  return pairs.filter(([p, q]) => p !== 0 && !(p === a && q === b)).map(([p, q]) => `$${eqn(p, q, yv, xv)}$`);
}

function linearEquation(rng: Rng, d: Difficulty): Out {
  if (d === 3) return equationContext(rng);
  if (d === 1) {
    const a = rng.int(2, 5);
    const b = rng.int(1, 9);
    const xs = rng.pick([[0, 1, 2, 3], [1, 2, 3, 4]]);
    const ys = xs.map((x) => a * x + b);
    const right = `$${eqn(a, b)}$`;
    return {
      prompt: 'Which equation matches the table of values?',
      figure: xyTable(xs, ys),
      parts: [{ answer: mc(rng, right, wrongEquations(a, b, xs[0])) }],
      hints: [
        'How much does $y$ go up each time $x$ goes up by $1$? That number multiplies $x$.',
        'Then test each equation with **every** column of the table, not just the first one.',
      ],
      solution: [
        `Each time $x$ goes up by $1$, $y$ goes up by $${ys[1]} - ${ys[0]} = ${a}$, so the equation has $${a}x$.`,
        xs[0] === 0
          ? `When $x = 0$, $y = ${b}$, so the equation adds $${b}$.`
          : `When $x = 1$, $${a}x = ${a}$, but $y = ${ys[0]}$. You must add $${ys[0]} - ${a} = ${b}$.`,
        `Check another column: ${subst(a, b, xs[3])}. It matches.`,
        `The equation is ${right}.`,
      ],
    };
  }
  const { a, b, xs } = pureRelation(rng, d);
  if (rng.chance(0.5)) {
    // Graph to equation.
    const plotted = xs.slice(0, 5);
    const right = `$${eqn(a, b)}$`;
    return {
      prompt: 'Which equation matches the graph?',
      figure: xyGraph(a, b, plotted),
      parts: [{ answer: mc(rng, right, wrongEquations(a, b, plotted[0]).filter((s) => s !== `$${eqn(a + b, 0)}$` || b === 0)) }],
      hints: [
        'Read some points from the graph and put them in a table of values.',
        'Find how $y$ changes each time $x$ goes up by $1$, and find $y$ when $x = 0$. Then check the equation with another point.',
      ],
      solution: [
        `Points on the graph: ${plotted.map((x) => `$(${x},\\ ${a * x + b})$`).join(', ')}.`,
        `Each time $x$ goes up by $1$, $y$ ${a > 0 ? 'goes up' : 'goes down'} by $${Math.abs(a)}$, so the equation has $${a === 1 ? '' : a === -1 ? '-' : a}x$.`,
        `When $x = 0$, $y = ${b}$.`,
        `Check: ${subst(a, b, plotted[plotted.length - 1])}. The point $(${plotted[plotted.length - 1]},\\ ${a * plotted[plotted.length - 1] + b})$ is on the graph.`,
        `The equation is ${right}.`,
      ],
    };
  }
  // Equation to graph.
  const pairs: Array<[number, number]> = [[a, b], [-a, b], [a, -b], [b, a], [a, b + (b > 0 ? -2 : 2)]];
  const seen = new Set<string>();
  const opts = pairs
    .filter(([p, q]) => p !== 0 && Math.abs(q) <= 5 && !seen.has(`${p},${q}`) && seen.add(`${p},${q}`))
    .slice(0, 4)
    .map(([p, q], i) => ({ md: '', figure: lineChoice(p, q) as Figure, correct: i === 0 }));
  return {
    prompt: `Which graph shows the linear relation $${eqn(a, b)}$?`,
    parts: [{ answer: mcFigures(rng, opts) }],
    hints: [
      'Make a small table of values from the equation, such as for $x = 0$, $1$ and $2$.',
      'Look for the graph that passes through **all** of your points.',
    ],
    solution: [
      `When $x = 0$: ${subst(a, b, 0)}. When $x = 1$: ${subst(a, b, 1)}. When $x = 2$: ${subst(a, b, 2)}.`,
      `The graph must pass through $(0,\\ ${b})$, $(1,\\ ${a + b})$ and $(2,\\ ${2 * a + b})$.`,
      `It ${a > 0 ? 'rises' : 'falls'} from left to right, because $y$ ${a > 0 ? 'increases' : 'decreases'} by $${Math.abs(a)}$ each time $x$ increases by $1$.`,
      `The correct graph is the line through $(0,\\ ${b})$ and $(1,\\ ${a + b})$.`,
    ],
  };
}

function equationContext(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const c = rng.pick(CTX)(rng, name);
  const stepX = c.xMax >= 8 && rng.chance(0.35) ? 2 : 1;
  const off = stepX === 1 && rng.chance(0.3) ? 1 : 0;
  const xs = [0, 1, 2, 3].map((i) => i * stepX + off);
  const ys = xs.map((x) => c.a * x + c.b);
  const right = `$${eqn(c.a, c.b, c.yv, c.xv)}$`;
  const opts = changeOptions(c.a, c.b, c.say, stepX);
  return {
    prompt: `${c.scene} The table shows some values.\n\n(a) Which equation describes the relation?\n\n(b) Which sentence describes the pattern?`,
    figure: { type: 'table', horizontal: true, headers: [c.xHead, c.yHead], rows: xs.map((x, i) => [String(x), String(ys[i])]) },
    parts: [
      part(mc(rng, right, wrongEquations(c.a, c.b, xs[0], c.yv, c.xv)), { label: '(a)' }),
      part(mc(rng, opts[0], opts.slice(1)), { label: '(b)' }),
    ],
    hints: [
      `Find how much $${c.yv}$ changes when $${c.xv}$ goes up by $1$.${stepX === 1 ? '' : ` The table goes up by $${stepX}$, so divide the change by $${stepX}$.`}`,
      `Find the value of $${c.yv}$ when $${c.xv} = 0$ (the starting value). Then test the equation with every column.`,
    ],
    solution: [
      stepX === 1
        ? `Each time $${c.xv}$ goes up by $1$, $${c.yv}$ changes by $${ys[1]} - ${paren(ys[0])} = ${c.a}$.`
        : `Each time $${c.xv}$ goes up by $${stepX}$, $${c.yv}$ changes by $${ys[1]} - ${paren(ys[0])} = ${c.a * stepX}$. For $1$, that is $${c.a * stepX} \\div ${stepX} = ${c.a}$.`,
      `When $${c.xv} = 0$, $${c.yv} = ${c.b}$${xs[0] === 0 ? '' : ` (go back one column: $${ys[0]} - ${paren(c.a)} = ${c.b}$)`}.`,
      `Check: ${subst(c.a, c.b, xs[3], c.yv)}. It matches the last column.`,
      `(a) ${right} (b) ${opts[0]}`,
    ],
  };
}

// ---------------------------------------------------------------------------
// Skill definitions
// ---------------------------------------------------------------------------

export const LINEAR_SKILLS: SkillDef[] = [
  skill({
    id: 'm8-linear-table',
    name: 'Tables of values',
    description: 'Complete a table of values for a linear relation such as y = 3x − 2, including negative values of x, and describe the pattern.',
    outcomes: ['PR1'],
    lessonId: 'm8-6-1',
    gen: linearTable,
  }),
  skill({
    id: 'm8-linear-graph',
    name: 'Graphing linear relations',
    description: 'Graph a linear relation from its equation and read values from a graph, between and beyond the plotted points.',
    outcomes: ['PR1'],
    lessonId: 'm8-6-2',
    gen: linearGraph,
  }),
  skill({
    id: 'm8-linear-equation',
    name: 'Matching equations, tables and graphs',
    description: 'Match a linear equation to its table of values or graph, and describe the pattern in words.',
    outcomes: ['PR1'],
    lessonId: 'm8-6-2',
    format: 'mc',
    gen: linearEquation,
  }),
];

