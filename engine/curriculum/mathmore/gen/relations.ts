/** More Mathematics Topics, Unit 22: relations and functions, domain and range, and simple quadratic equations. */
import { fixedChoice, mc, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, isPerfectSquare, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, SkillDef } from '../../../types.ts';

type Out = GenOutput;
type Pt = [number, number];

const pairSet = (pts: Pt[]) => `\\{${pts.map(([x, y]) => `(${x}, ${y})`).join(',\\ ')}\\}`;
const sortNum = (xs: number[]) => [...xs].sort((a, b) => a - b);
const distinct = (xs: number[]) => sortNum([...new Set(xs)]);
const xyTable = (pts: Pt[], x = 'Input', y = 'Output'): Figure => ({ type: 'table', headers: [x, y], rows: pts.map(([a, b]) => [String(a), String(b)]), horizontal: true });

/** A relation as points: a function (each input once), or with one input repeated with two outputs. */
function relation(rng: Rng, n: number, isFunction: boolean, lo = -5, hi = 9): { pts: Pt[]; repeated?: number } {
  const xs = rng.shuffle(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i)).slice(0, n);
  const pts: Pt[] = xs.map((x) => [x, rng.int(lo, hi)]);
  if (isFunction) {
    // Often repeat an output, which is allowed in a function.
    if (rng.chance(0.6)) pts[1]![1] = pts[0]![1];
    return { pts: rng.shuffle(pts) };
  }
  const repeated = pts[0]![0];
  pts[1] = [repeated, retry(() => rng.int(lo, hi), (y) => y !== pts[0]![1])];
  return { pts: rng.shuffle(pts), repeated };
}

const FN = ['Function', 'Not a function'];

// ---------------------------------------------------------------------------
// 22.1 Relations and functions
// ---------------------------------------------------------------------------

function functionOrNot(rng: Rng, d: Difficulty): Out {
  const yes = rng.chance(0.5);
  const hints = ['In a function, each input has exactly one output.', 'Look for an input that appears twice with two different outputs. Two inputs may share an output.'];
  const verdict = (r: { pts: Pt[]; repeated?: number }) =>
    r.repeated === undefined
      ? ['Every input appears once, so each input has exactly one output.', 'The relation is a function.']
      : [`The input $${r.repeated}$ has two different outputs: $${r.pts.filter((p) => p[0] === r.repeated).map((p) => p[1]).join('$ and $')}$.`, 'The relation is not a function.'];
  if (d === 1) {
    const r = relation(rng, rng.int(4, 5), yes);
    return {
      prompt: `Is this relation a function?\n\n$$${pairSet(r.pts)}$$`,
      parts: [part(fixedChoice(FN, yes ? 0 : 1))],
      hints,
      solution: verdict(r),
    };
  }
  if (d === 2) {
    const r = relation(rng, 5, yes, 0, 9);
    if (rng.chance(0.5)) {
      const pts = [...r.pts].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
      return {
        prompt: 'The table shows a relation. Is it a function?',
        parts: [part(fixedChoice(FN, yes ? 0 : 1))],
        figure: xyTable(pts),
        hints,
        solution: verdict(r),
      };
    }
    const left = distinct(r.pts.map((p) => p[0]));
    const right = distinct(r.pts.map((p) => p[1]));
    return {
      prompt: 'The arrow diagram shows a relation from inputs to outputs. Is it a function?',
      parts: [part(fixedChoice(FN, yes ? 0 : 1))],
      figure: { type: 'arrowDiagram', leftTitle: 'Input', rightTitle: 'Output', left: left.map(String), right: right.map(String), arrows: r.pts.map(([x, y]) => [left.indexOf(x), right.indexOf(y)] as [number, number]) },
      hints: ['In a function, each input has exactly one output.', 'Look for an input with two arrows leaving it. Two arrows may arrive at the same output.'],
      solution: verdict(r),
    };
  }
  const grid = { xMin: -6, xMax: 6, yMin: -6, yMax: 6, step: 1 };
  if (rng.chance(0.5)) {
    const r = relation(rng, 6, yes, -5, 5);
    return {
      prompt: 'The graph shows a relation. Use the vertical line test to decide whether it is a function.',
      parts: [part(fixedChoice(FN, yes ? 0 : 1))],
      figure: { type: 'plane', grid, points: r.pts.map(([x, y]) => ({ x, y })) },
      hints: ['Imagine sliding a vertical line across the graph.', 'If the line ever touches the graph at more than one point, an input has more than one output, so the relation is not a function.'],
      solution: r.repeated === undefined ? ['No vertical line passes through more than one point of the graph.', 'The relation is a function.'] : [`The vertical line $x = ${r.repeated}$ passes through two points of the graph.`, 'So one input has two outputs, and the relation is not a function.'],
    };
  }
  const a = rng.int(2, 4);
  const b = rng.int(2, 5);
  const s = rng.sign();
  // A zigzag from left to right passes the test; a sideways V does not.
  const line: Pt[] = yes ? [[-5, s * b], [-2, -s * a], [1, s * a], [5, -s * b]] : [[s * 5, b], [-s * a, 0], [s * 5, -b]];
  return {
    prompt: 'The graph shows a relation. Use the vertical line test to decide whether it is a function.',
    parts: [part(fixedChoice(FN, yes ? 0 : 1))],
    figure: { type: 'plane', grid, polylines: [{ points: line, color: 'brand' }] },
    hints: ['Imagine sliding a vertical line across the graph.', 'If the line ever crosses the graph more than once, the relation is not a function.'],
    solution: yes ? ['Every vertical line crosses the graph at most once.', 'Each input has exactly one output, so the relation is a function.'] : [`A vertical line such as $x = ${s * 2}$ crosses the graph twice.`, 'That input has two outputs, so the relation is not a function.'],
  };
}

function inputOutput(rng: Rng, d: Difficulty): Out {
  const a = rng.int(2, 6);
  const b = rng.nonZero(-8, 9);
  const f = (x: number) => a * x + b;
  const rule = `multiply the input by $${a}$, then ${b > 0 ? `add $${b}$` : `subtract $${-b}$`}`;
  if (d === 1) {
    const start = rng.int(0, 4);
    const pts: Pt[] = [1, 2, 3, 4, 5].map((x) => [x + start, f(x + start)]);
    const ask = rng.pick(pts);
    return {
      prompt: `The table shows a function. What is the output when the input is $${ask[0]}$?`,
      parts: [numPart(ask[1])],
      figure: xyTable(pts),
      hints: ['The input is the value that goes into the function, and the output is the value that comes out.', 'Find the input in the top row, then read the output below it.'],
      solution: [`In the table, the input $${ask[0]}$ is paired with the output $${ask[1]}$.`],
    };
  }
  if (d === 2) {
    const x = rng.int(-6, 9);
    return {
      prompt: `A function has the rule: ${rule}. Find the output when the input is $${x}$.`,
      parts: [numPart(f(x))],
      hints: ['Follow the rule one step at a time, starting with the input.', 'Multiply first, then add or subtract.'],
      solution: [`$${a} \\times ${x < 0 ? `(${x})` : x} = ${a * x}$`, `$${a * x} ${b > 0 ? '+' : '-'} ${Math.abs(b)} = ${f(x)}$`, `The output is $${f(x)}$.`],
    };
  }
  const x = rng.int(-6, 12);
  return {
    prompt: `A function has the rule: ${rule}. The output is $${f(x)}$. Find the input.`,
    parts: [numPart(x)],
    hints: ['Work backwards through the rule, undoing each step.', `First undo the ${b > 0 ? 'addition' : 'subtraction'}, then undo the multiplication.`],
    solution: [`Undo the last step: $${f(x)} ${b > 0 ? '-' : '+'} ${Math.abs(b)} = ${a * x}$`, `Undo the multiplication: $${a * x} \\div ${a} = ${x}$`, `The input is $${x}$. Check: $${a} \\times ${x < 0 ? `(${x})` : x} ${b > 0 ? '+' : '-'} ${Math.abs(b)} = ${f(x)}$.`],
  };
}

// ---------------------------------------------------------------------------
// 22.2 Domain and range
// ---------------------------------------------------------------------------

const listPart = (values: number[], label: string) => part({ kind: 'numbers', values }, { label, placeholder: 'e.g. 1, 2, 5' });

interface Bounded {
  text: (n: number, r: number) => string;
  input: string;
  output: string;
  /** The greatest output, from the greatest input n and the rate r. */
  top: (n: number, r: number) => number;
  topWhy: (n: number, r: number) => string;
  ns: number[];
  rs: number[];
  discrete: boolean;
}

const BOUNDED: Bounded[] = [
  {
    text: (n, r) => `A tank is empty. Water flows in at $${r}$ litres each minute for $${n}$ minutes, and then the tank is full. The volume of water $V$ litres is a function of the time $t$ minutes.`,
    input: 't', output: 'V', top: (n, r) => n * r, topWhy: (n, r) => `After $${n}$ minutes the tank holds $${r} \\times ${n} = ${n * r}$ litres, its greatest volume.`, ns: [8, 10, 12, 15, 20], rs: [4, 5, 6, 8], discrete: false,
  },
  {
    text: (n, r) => `A candle is $${n * r}$ cm tall. It burns down $${r}$ cm each hour until nothing is left, after $${n}$ hours. The height $h$ cm is a function of the time $t$ hours.`,
    input: 't', output: 'h', top: (n, r) => n * r, topWhy: (n, r) => `The candle is tallest at the start, when $t = 0$: $${n * r}$ cm.`, ns: [4, 5, 6, 8, 9], rs: [2, 3, 4], discrete: false,
  },
  {
    text: (n, r) => `A school bus carries up to $${n}$ students. Each student brings $${r}$ books for a book drive. The number of books $b$ is a function of the number of students $s$ on the bus.`,
    input: 's', output: 'b', top: (n, r) => n * r, topWhy: (n, r) => `A full bus of $${n}$ students brings $${r} \\times ${n} = ${n * r}$ books.`, ns: [24, 30, 36, 40, 48], rs: [2, 3, 5], discrete: true,
  },
  {
    text: (n, r) => `A baker sells muffins in boxes of $${r}$ and has $${n}$ boxes. The number of muffins sold $m$ is a function of the number of boxes sold $x$.`,
    input: 'x', output: 'm', top: (n, r) => n * r, topWhy: (n, r) => `Selling all $${n}$ boxes sells $${r} \\times ${n} = ${n * r}$ muffins.`, ns: [10, 12, 15, 20, 25], rs: [4, 6, 12], discrete: true,
  },
];

function domainRange(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const r = relation(rng, rng.int(4, 5), true);
    const askDomain = rng.chance(0.5);
    const values = distinct(r.pts.map((p) => p[askDomain ? 0 : 1]));
    return {
      prompt: `List the ${askDomain ? 'domain' : 'range'} of this function.\n\n$$${pairSet(r.pts)}$$`,
      parts: [listPart(values, askDomain ? 'Domain:' : 'Range:')],
      hints: ['The domain is the set of all inputs (the first numbers). The range is the set of all outputs (the second numbers).', 'Write each value once, even if it appears more than once.'],
      solution: [`The ${askDomain ? 'inputs are the first' : 'outputs are the second'} numbers in the ordered pairs.`, `${askDomain ? 'Domain' : 'Range'}: $\\{${values.join(', ')}\\}$`],
    };
  }
  if (d === 2) {
    const r = relation(rng, 5, true, 0, 12);
    const pts = [...r.pts].sort((a, b) => a[0] - b[0]);
    const dom = distinct(pts.map((p) => p[0]));
    const ran = distinct(pts.map((p) => p[1]));
    return {
      prompt: 'The table shows a function. List its domain and its range.',
      parts: [listPart(dom, 'Domain:'), listPart(ran, 'Range:')],
      figure: xyTable(pts),
      hints: ['The domain is the set of all inputs, and the range is the set of all outputs.', 'Write each value once, even if it appears more than once.'],
      solution: [`Domain (the inputs): $\\{${dom.join(', ')}\\}$`, `Range (the outputs): $\\{${ran.join(', ')}\\}$`],
    };
  }
  const c = rng.pick(BOUNDED);
  const n = rng.pick(c.ns);
  const r = rng.pick(c.rs);
  return {
    prompt: `${c.text(n, r)} What is the greatest value in the domain, and the greatest value in the range?`,
    parts: [numPart(n, { label: 'Greatest value in the domain =' }), numPart(c.top(n, r), { label: 'Greatest value in the range =' })],
    hints: [`The domain is the set of possible values of the input, $${c.input}$. The situation limits how large it can be.`, `The range is the set of possible values of the output, $${c.output}$.`],
    solution: [
      `The input $${c.input}$ runs from $0$ to $${n}$, so the greatest value in the domain is $${n}$.`,
      c.topWhy(n, r),
      `The greatest value in the range is $${c.top(n, r)}$. The ${c.discrete ? 'domain is discrete: only whole numbers make sense' : 'domain is continuous: every value from $0$ to $' + n + '$ makes sense'}.`,
    ],
  };
}

interface Situation {
  text: (n: number) => string;
  discrete: boolean;
  why: string;
  ns: number[];
}

const SITUATIONS: Situation[] = [
  { text: (n) => `Each carton holds $${n}$ eggs. The number of eggs is a function of the number of full cartons.`, discrete: true, why: 'You can count full cartons ($1, 2, 3, \\ldots$), but there is no such thing as $2.5$ full cartons.', ns: [6, 12, 18, 30] },
  { text: (n) => `A plant grows $${n}$ mm each day. Its height is a function of the time since it was planted.`, discrete: false, why: 'Time passes smoothly, so every moment between two days has a height.', ns: [2, 3, 4, 5] },
  { text: (n) => `Each team in a league has $${n}$ players. The number of players is a function of the number of teams.`, discrete: true, why: 'Teams are counted in whole numbers.', ns: [5, 6, 9, 11] },
  { text: (n) => `A car travels at a steady $${n}$ km/h. The distance travelled is a function of the driving time.`, discrete: false, why: 'The driving time can be any value, such as $1.5$ hours, and each has a distance.', ns: [60, 80, 90, 100] },
  { text: (n) => `A hall puts $${n}$ chairs in each row. The number of chairs is a function of the number of rows.`, discrete: true, why: 'Rows are counted in whole numbers.', ns: [8, 10, 12, 15] },
  { text: (n) => `A pool is filled at $${n}$ litres per minute. The volume of water is a function of the time.`, discrete: false, why: 'Water flows in all the time, so every moment has a volume.', ns: [20, 25, 40, 50] },
  { text: (n) => `Each bus seats $${n}$ students. The number of seats is a function of the number of buses.`, discrete: true, why: 'Buses are counted in whole numbers.', ns: [36, 40, 48, 52] },
  { text: (n) => `The temperature of a cup of tea starts at $${n}$ °C and falls as it cools. The temperature is a function of the time.`, discrete: false, why: 'The tea has a temperature at every moment as it cools.', ns: [70, 80, 85, 90] },
  { text: (n) => `A machine prints $${n}$ labels on every sheet. The number of labels is a function of the number of sheets printed.`, discrete: true, why: 'Sheets are counted in whole numbers.', ns: [8, 10, 14, 21] },
  { text: (n) => `A hiker climbs $${n}$ m higher each minute. The height gained is a function of the time spent climbing.`, discrete: false, why: 'The time can be any value, and the hiker is at some height at every moment.', ns: [5, 6, 8, 10] },
];

function discreteContinuous(rng: Rng, d: Difficulty): Out {
  if (d === 3) {
    const c = rng.pick(BOUNDED);
    const n = rng.pick(c.ns);
    const r = rng.pick(c.rs);
    const whole = `Whole numbers from $0$ to $${n}$`;
    const real = `All numbers from $0$ to $${n}$, including fractions and decimals`;
    return {
      prompt: `${c.text(n, r)} Which best describes the domain?`,
      parts: [part(mc(rng, c.discrete ? whole : real, [whole, real, `Whole numbers from $0$ to $${c.top(n, r)}$`, 'All numbers greater than $0$']))],
      hints: [`The domain is the set of possible values of the input, $${c.input}$, not the output.`, 'Ask whether values between the whole numbers make sense, and what the least and greatest inputs are.'],
      solution: [
        `The input $${c.input}$ runs from $0$ to $${n}$.`,
        c.discrete ? 'It counts things, so only whole numbers make sense: the domain is discrete.' : 'It is a time, so every value in between makes sense: the domain is continuous.',
        `The domain is: ${(c.discrete ? whole : real).toLowerCase()}.`,
      ],
    };
  }
  const s = rng.pick(SITUATIONS);
  const text = s.text(rng.pick(s.ns));
  if (d === 1) {
    return {
      prompt: `${text} Is this function discrete or continuous?`,
      parts: [part(fixedChoice(['Discrete', 'Continuous'], s.discrete ? 0 : 1))],
      hints: ['A discrete function has separate inputs that can be counted, with nothing in between.', 'A continuous function has inputs that can be measured, and every value in between makes sense.'],
      solution: [s.why, `The function is ${s.discrete ? 'discrete' : 'continuous'}.`],
    };
  }
  const right = s.discrete ? 'No, because the values between the points have no meaning' : 'Yes, because every value between the points has a meaning';
  return {
    prompt: `${text} The function is graphed from a table of values. Should the points be joined with a line?`,
    parts: [part(mc(rng, right, ['No, because the values between the points have no meaning', 'Yes, because every value between the points has a meaning', 'Yes, because the points of every graph are joined', 'No, because the points do not lie in a straight line']))],
    hints: ['The graph of a discrete function is a set of separate points.', 'The graph of a continuous function is a line through the points, because the values in between make sense.'],
    solution: [s.why, s.discrete ? 'The function is discrete, so its graph is separate points that are not joined.' : 'The function is continuous, so its points are joined with a line.'],
  };
}

// ---------------------------------------------------------------------------
// 22.3 Simple quadratic equations
// ---------------------------------------------------------------------------

const rootsPart = (values: number[], extra: { decimals?: number; exact?: string[] } = {}) => part({ kind: 'numbers', values, ...extra }, { label: '$x$ =', placeholder: 'e.g. -3, 3' });
/** x² + c = 0 written out, with c of either sign. */
const plusC = (c: number) => (c === 0 ? 'x^2 = 0' : `x^2 ${c > 0 ? '+' : '-'} ${Math.abs(c)} = 0`);

function quadraticRoots(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const r = rng.int(1, 12);
    return {
      prompt: `Solve $x^2 = ${r * r}$. Give every solution.`,
      parts: [rootsPart([-r, r])],
      hints: ['Which numbers, multiplied by themselves, give this value?', 'A negative number times itself is positive, so there are two solutions.'],
      solution: [`$${r} \\times ${r} = ${r * r}$ and $(-${r}) \\times (-${r}) = ${r * r}$`, `$x = ${r}$ or $x = -${r}$`],
    };
  }
  if (d === 2) {
    const kind = rng.weighted<'two' | 'none' | 'one'>([['two', 6], ['none', 3], ['one', 1]]);
    if (kind === 'one') {
      return {
        prompt: 'Solve $x^2 = 0$. Give every solution.',
        parts: [rootsPart([0])],
        hints: ['Which numbers, multiplied by themselves, give $0$?', 'Zero is neither positive nor negative.'],
        solution: ['Only $0 \\times 0 = 0$.', 'There is one solution: $x = 0$.'],
      };
    }
    const r = rng.int(1, 12);
    const c = kind === 'two' ? -r * r : rng.int(1, 60);
    return {
      prompt: `Solve $${plusC(c)}$. Give every solution, or state that there is no solution.`,
      parts: [rootsPart(kind === 'two' ? [-r, r] : [])],
      hints: ['Move the number to the other side so that $x^2$ is alone.', 'The square of a number is never negative. If $x^2$ equals a negative number, there is no solution.'],
      solution: kind === 'two' ? [`Add $${r * r}$ to both sides: $x^2 = ${r * r}$`, `$x = ${r}$ or $x = -${r}$`] : [`Subtract $${c}$ from both sides: $x^2 = -${c}$`, 'No number multiplied by itself gives a negative number, so the equation has no solution.'],
    };
  }
  if (rng.chance(0.5)) {
    const a = retry(() => rng.int(2, 90), (n) => !isPerfectSquare(n));
    const r = Math.sqrt(a);
    return {
      prompt: `Solve $x^2 - ${a} = 0$. Give every solution, to 2 decimal places.`,
      parts: [rootsPart([-roundTo(r, 2), roundTo(r, 2)], { decimals: 2, exact: [`-\\sqrt{${a}}`, `\\sqrt{${a}}`] })],
      hints: [`Add $${a}$ to both sides, then take the square root.`, `$${a}$ is not a perfect square, so use a calculator, and remember the negative solution.`],
      solution: [`$x^2 = ${a}$`, `$x = \\sqrt{${a}}$ or $x = -\\sqrt{${a}}$`, `$x \\approx ${fmt(r, 2)}$ or $x \\approx -${fmt(r, 2)}$`],
      calculator: true,
    };
  }
  const area = retry(() => rng.int(20, 200), (n) => !isPerfectSquare(n));
  const side = Math.sqrt(area);
  const thing = rng.pick(['garden', 'patio', 'floor tile', 'field', 'tablecloth']);
  const unit = thing === 'floor tile' || thing === 'tablecloth' ? 'cm' : 'm';
  return {
    prompt: `A square ${thing} has an area of $${area}$ ${unit}². Solve $x^2 = ${area}$ to find the length $x$ of one side, to 1 decimal place.`,
    parts: [numPart(side, { decimals: 1, label: '$x$ =', suffix: unit })],
    hints: ['The equation $x^2 = a$ has two solutions, one positive and one negative.', 'A length cannot be negative, so only the positive solution makes sense here.'],
    solution: [`$x = \\sqrt{${area}}$ or $x = -\\sqrt{${area}}$`, `A length is positive, so $x = \\sqrt{${area}} \\approx ${fmt(side, 1)}$ ${unit}.`],
    calculator: true,
  };
}

const COUNTS = ['No solution', 'One solution', 'Two solutions'];

function quadraticCount(rng: Rng, d: Difficulty): Out {
  // The value a in x² = a once the equation is rearranged.
  const a = rng.weighted<number>([[rng.int(1, 80), 4], [-rng.int(1, 80), 4], [0, 2]]);
  const n = a > 0 ? 2 : a === 0 ? 1 : 0;
  const why = a > 0 ? `$${a}$ is positive, so $x = \\sqrt{${a}}$ and $x = -\\sqrt{${a}}$ both work: two solutions.` : a === 0 ? 'Only $x = 0$ works: one solution.' : `$${a}$ is negative, and the square of a number is never negative: no solution.`;
  const hints = ['Rearrange the equation so that $x^2$ is alone on one side.', 'Then look at the sign of the other side: positive gives two solutions, zero gives one, and negative gives none.'];
  if (d === 1) {
    return {
      prompt: `How many solutions does $x^2 = ${a}$ have?`,
      parts: [part(fixedChoice(COUNTS, n))],
      hints: ['Ask which numbers, multiplied by themselves, give the value on the right.', 'A positive value gives two solutions, zero gives one, and a negative value gives none.'],
      solution: [why],
    };
  }
  if (d === 2) {
    return {
      prompt: `How many solutions does $${plusC(-a)}$ have?`,
      parts: [part(fixedChoice(COUNTS, n))],
      hints,
      solution: [a === 0 ? '$x^2 = 0$' : `${a > 0 ? 'Add' : 'Subtract'} $${Math.abs(a)}$ ${a > 0 ? 'to' : 'from'} both sides: $x^2 = ${a}$`, why],
    };
  }
  const c = rng.nonZero(-30, 30);
  const e = a + c;
  const left = `x^2 ${c > 0 ? '+' : '-'} ${Math.abs(c)}`;
  const eq = rng.chance(0.5) ? `${left} = ${e}` : `${e} = ${left}`;
  return {
    prompt: `How many solutions does $${eq}$ have?`,
    parts: [part(fixedChoice(COUNTS, n))],
    hints,
    solution: [`${c > 0 ? 'Subtract' : 'Add'} $${Math.abs(c)}$ ${c > 0 ? 'from' : 'to'} both sides: $x^2 = ${e} ${c > 0 ? '-' : '+'} ${Math.abs(c)} = ${a}$`, why],
  };
}

export const RELATION_SKILLS: SkillDef[] = [
  skill({ id: 'mx-function-or-not', name: 'Function or not', description: 'Decide whether a relation is a function from ordered pairs, a table, an arrow diagram or a graph', outcomes: ['FN1'], lessonId: 'mx-22-1', format: 'mc', gen: functionOrNot }),
  skill({ id: 'mx-function-input-output', name: 'Inputs and outputs', description: 'Find outputs and inputs of a function from a table or a rule', outcomes: ['FN1'], lessonId: 'mx-22-1', gen: inputOutput }),
  skill({ id: 'mx-domain-range', name: 'Domain and range', description: 'Find the domain and range of a function from ordered pairs, a table or a situation', outcomes: ['FN2'], lessonId: 'mx-22-2', gen: domainRange }),
  skill({ id: 'mx-discrete-continuous', name: 'Discrete and continuous functions', description: 'Tell discrete from continuous functions, and describe a domain that a situation restricts', outcomes: ['FN2'], lessonId: 'mx-22-2', format: 'mc', gen: discreteContinuous }),
  skill({ id: 'mx-quadratic-square-roots', name: 'Solving x² = a', description: 'Solve quadratic equations of the form x² = a and x² + c = 0, including when there is no solution', outcomes: ['FN3'], lessonId: 'mx-22-3', gen: quadraticRoots }),
  skill({ id: 'mx-quadratic-solutions-count', name: 'Number of solutions', description: 'Decide whether a simple quadratic equation has no solution, one solution or two', outcomes: ['FN3'], lessonId: 'mx-22-3', format: 'mc', gen: quadraticCount }),
];
