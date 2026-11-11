/** More Mathematics Topics, Unit 20: absolute value, perfect cubes, the constant of proportionality and sets of real numbers. */
import { fixedChoice, mc, multi, numPart, part, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, gcd, roundTo } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Choice, Difficulty, SkillDef } from '../../../types.ts';

type Out = GenOutput;

// ---------------------------------------------------------------------------
// 20.1 Absolute value and opposites
// ---------------------------------------------------------------------------

interface Num {
  v: number;
  tex: string;
}

const decimal = (rng: Rng, max = 95): Num => {
  const v = (rng.sign() * retry(() => rng.int(1, max), (n) => n % 10 !== 0)) / 10;
  return { v, tex: fmt(v) };
};
const integer = (rng: Rng, max = 15): Num => {
  const v = rng.nonZero(-max, max);
  return { v, tex: String(v) };
};
const fraction = (rng: Rng): Num => {
  const den = rng.pick([2, 3, 4, 5, 8, 10]);
  const num = retry(() => rng.int(1, 2 * den - 1), (n) => gcd(n, den) === 1);
  const neg = rng.chance(0.6);
  return { v: (neg ? -1 : 1) * (num / den), tex: `${neg ? '-' : ''}\\frac{${num}}{${den}}` };
};
const abs = (x: Num) => `|${x.tex}|`;

function absoluteValue(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    // Mostly negative numbers, where the absolute value differs from the number.
    const made = rng.chance(0.5) ? integer(rng) : decimal(rng);
    const x = made.v > 0 && rng.chance(0.7) ? { v: -made.v, tex: `-${made.tex}` } : made;
    const a = Math.abs(x.v);
    return {
      prompt: `Find $${abs(x)}$.`,
      parts: [numPart(a, { label: `$${abs(x)}$ =` })],
      hints: ['The absolute value of a number is its distance from zero on the number line.', 'A distance is never negative, so an absolute value is never negative.'],
      solution: [`$${x.tex}$ is $${fmt(a)}$ units from zero on the number line.`, `$${abs(x)} = ${fmt(a)}$`],
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const x = rng.chance(0.5) ? integer(rng) : decimal(rng);
      return {
        prompt: `What is the opposite (the additive inverse) of $${x.tex}$?`,
        parts: [numPart(-x.v)],
        hints: ['Opposite numbers are the same distance from zero, on opposite sides of it.', 'A number and its opposite add to zero.'],
        solution: [`The opposite of $${x.tex}$ is $${fmt(-x.v)}$, because $${x.tex} + ${-x.v < 0 ? `(${fmt(-x.v)})` : fmt(-x.v)} = 0$.`, `Both are $${fmt(Math.abs(x.v))}$ units from zero.`],
      };
    }
    const a = Math.abs((rng.chance(0.5) ? integer(rng) : decimal(rng)).v);
    return {
      prompt: `Two different numbers have an absolute value of $${fmt(a)}$. What are they?`,
      parts: [part({ kind: 'numbers', values: [-a, a] }, { placeholder: 'e.g. -3, 3' })],
      hints: ['Absolute value is distance from zero. Two numbers are that far from zero.', 'One is to the right of zero and one is to the left.'],
      solution: [`The numbers $${fmt(a)}$ units from zero are $${fmt(a)}$ and $${fmt(-a)}$.`, `$|${fmt(a)}| = ${fmt(a)}$ and $|${fmt(-a)}| = ${fmt(a)}$`],
    };
  }
  const whole = rng.chance(0.5);
  const a = whole ? integer(rng, 12) : decimal(rng, 60);
  const b = retry(() => (whole ? integer(rng, 12) : decimal(rng, 60)), (n) => Math.abs(n.v) !== Math.abs(a.v));
  const A = Math.abs(a.v);
  const B = Math.abs(b.v);
  const p = (x: Num) => (x.v < 0 ? `(${x.tex})` : x.tex);
  const forms = [
    { tex: `${abs(a)} + ${abs(b)}`, v: A + B, steps: [`$${abs(a)} = ${fmt(A)}$ and $${abs(b)} = ${fmt(B)}$`, `$${fmt(A)} + ${fmt(B)} = ${fmt(roundTo(A + B, 2))}$`] },
    { tex: `${abs(a)} - ${abs(b)}`, v: A - B, steps: [`$${abs(a)} = ${fmt(A)}$ and $${abs(b)} = ${fmt(B)}$`, `$${fmt(A)} - ${fmt(B)} = ${fmt(roundTo(A - B, 2))}$`] },
    { tex: `|${a.tex} - ${p(b)}|`, v: Math.abs(a.v - b.v), steps: [`Work inside the bars first: $${a.tex} - ${p(b)} = ${fmt(roundTo(a.v - b.v, 2))}$`, `$|${fmt(roundTo(a.v - b.v, 2))}| = ${fmt(roundTo(Math.abs(a.v - b.v), 2))}$`] },
    { tex: `-${abs(a)}`, v: -A, steps: [`$${abs(a)} = ${fmt(A)}$`, `The negative sign is outside the bars, so $-${abs(a)} = -${fmt(A)}$`] },
  ];
  const f = rng.pick(forms);
  return {
    prompt: `Evaluate $${f.tex}$.`,
    parts: [numPart(roundTo(f.v, 2))],
    hints: ['The bars work like brackets: find the value inside them first, then take its distance from zero.', 'A sign outside the bars is applied after the absolute value is found.'],
    solution: f.steps,
  };
}

const IDS = 'abcdef';

function orderSigned(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const a = decimal(rng, 60);
    const b = retry(() => decimal(rng, 60), (n) => n.v !== a.v && (a.v < 0 || n.v < 0));
    const less = a.v < b.v;
    return {
      prompt: `Which symbol makes the statement true?\n\n$$${a.tex} \\;\\square\\; ${b.tex}$$`,
      parts: [part(fixedChoice(['$<$ (is less than)', '$>$ (is greater than)'], less ? 0 : 1))],
      hints: ['Picture both numbers on a number line. The number further to the left is the lesser one.', 'Among negative numbers, the one with the greater absolute value is further left, so it is less.'],
      solution: [`On a number line, $${less ? a.tex : b.tex}$ is to the left of $${less ? b.tex : a.tex}$.`, `$${a.tex} ${less ? '<' : '>'} ${b.tex}$`],
    };
  }
  const make = () => {
    const nums: Num[] = [];
    for (let i = 0; i < 4; i++) nums.push(d === 3 && i % 2 === 0 ? fraction(rng) : decimal(rng, d === 3 ? 20 : 60));
    return nums;
  };
  const nums = retry(make, (ns) => ns.some((n) => n.v < 0) && ns.every((x, i) => ns.every((y, j) => i === j || Math.abs(x.v - y.v) > 0.04)));
  const sorted = [...nums].sort((x, y) => x.v - y.v);
  const items: Choice[] = nums.map((x, i) => ({ id: IDS[i]!, md: `$${x.tex}$` }));
  const answer: AnswerSpec = { kind: 'order', items, correctOrder: sorted.map((x) => items[nums.indexOf(x)]!.id), ends: ['Least', 'Greatest'] };
  return {
    prompt: 'Order the numbers from least to greatest.',
    parts: [{ answer }],
    hints: [d === 3 ? 'Write every number as a decimal so they are easy to compare.' : 'Negative numbers are less than positive numbers.', 'Among negative numbers, the one furthest from zero is the least.'],
    solution: [...(d === 3 ? [`As decimals: ${nums.map((x) => `$${x.tex} = ${fmt(roundTo(x.v, 3))}$`).join(', ')}.`] : []), `From left to right on the number line: $${sorted.map((x) => x.tex).join(' < ')}$`],
  };
}

// ---------------------------------------------------------------------------
// 20.2 Perfect cubes and cube roots
// ---------------------------------------------------------------------------

const cbrt = (n: number | string) => `\\sqrt[3]{${n}}`;

function perfectCubes(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    const n = rng.int(1, 5);
    const asPower = rng.chance(0.5);
    return {
      prompt: asPower ? `Evaluate $${n}^3$.` : `Find the perfect cube that equals $${n} \\times ${n} \\times ${n}$.`,
      parts: [numPart(n ** 3)],
      hints: ['A perfect cube is the product of three identical factors.', `$${n}^3$ means $${n} \\times ${n} \\times ${n}$, not $${n} \\times 3$.`],
      solution: [`$${n}^3 = ${n} \\times ${n} \\times ${n} = ${n * n} \\times ${n} = ${n ** 3}$`],
    };
  }
  if (d === 2) {
    if (rng.chance(0.5)) {
      const n = rng.int(1, 5);
      return {
        prompt: `Find $${cbrt(n ** 3)}$.`,
        parts: [numPart(n)],
        hints: ['The cube root of a number is the value that is multiplied by itself three times to make the number.', 'Recall the perfect cubes: $1, 8, 27, 64, 125$.'],
        solution: [`$${n} \\times ${n} \\times ${n} = ${n ** 3}$, so $${cbrt(n ** 3)} = ${n}$`],
      };
    }
    const cubes = rng.shuffle([1, 8, 27, 64, 125]).slice(0, rng.int(1, 3));
    const others = rng.shuffle([4, 9, 16, 25, 36, 49, 81, 100, 121, 144, 3, 6, 12, 24, 30, 75, 120]).slice(0, 6 - cubes.length);
    const all = [...cubes, ...others].sort((a, b) => a - b);
    return {
      prompt: 'Which of these numbers are perfect cubes? Select all that apply.',
      parts: [part(multi(rng, all.map((n) => ({ md: `$${n}$`, correct: cubes.includes(n) })), true))],
      hints: ['A perfect cube is a number like $2 \\times 2 \\times 2 = 8$: three identical factors.', 'The perfect cubes up to $125$ are $1, 8, 27, 64$ and $125$. Do not confuse them with perfect squares.'],
      solution: [...[...cubes].sort((a, b) => a - b).map((c) => `$${c} = ${Math.round(Math.cbrt(c))}^3$`), `The perfect cubes are $${[...cubes].sort((a, b) => a - b).join(', ')}$.`],
    };
  }
  const a = rng.int(2, 5);
  const b = rng.int(2, 12);
  const forms = [
    { tex: `${cbrt(a ** 3)} + \\sqrt{${b * b}}`, v: a + b, steps: [`$${cbrt(a ** 3)} = ${a}$ because $${a}^3 = ${a ** 3}$`, `$\\sqrt{${b * b}} = ${b}$ because $${b}^2 = ${b * b}$`, `$${a} + ${b} = ${a + b}$`] },
    { tex: `${a}^3 - ${b}^2`, v: a ** 3 - b * b, steps: [`$${a}^3 = ${a ** 3}$ and $${b}^2 = ${b * b}$`, `$${a ** 3} - ${b * b} = ${a ** 3 - b * b}$`] },
    { tex: `${cbrt(a ** 3)} \\times \\sqrt{${b * b}}`, v: a * b, steps: [`$${cbrt(a ** 3)} = ${a}$ and $\\sqrt{${b * b}} = ${b}$`, `$${a} \\times ${b} = ${a * b}$`] },
    { tex: `\\left(${cbrt(a ** 3)}\\right)^2`, v: a * a, steps: [`$${cbrt(a ** 3)} = ${a}$`, `$${a}^2 = ${a * a}$`] },
  ];
  const f = rng.pick(forms);
  return {
    prompt: `Evaluate $${f.tex}$.`,
    parts: [numPart(f.v)],
    hints: ['Find each power or root first, then combine the results.', 'A small $3$ on the radical sign means cube root. No number on it means square root.'],
    solution: f.steps,
  };
}

function cubeVolume(rng: Rng, d: Difficulty): Out {
  const unit = rng.pick(['cm', 'm', 'mm']);
  const thing = rng.pick(['A storage box', 'A block of ice', 'A wooden block', 'A gift box', 'A water tank']);
  if (d === 1) {
    const e = rng.int(1, 5);
    return {
      prompt: `${thing} is a cube with edges $${e}$ ${unit} long. Find its volume.`,
      parts: [numPart(e ** 3, { suffix: `${unit}³` })],
      hints: ['Every edge of a cube has the same length.', 'Volume of a cube $=$ edge $\\times$ edge $\\times$ edge.'],
      solution: [`$V = ${e}^3 = ${e} \\times ${e} \\times ${e} = ${e ** 3}$ ${unit}³`],
    };
  }
  if (d === 2) {
    const e = rng.int(2, 5);
    return {
      prompt: `${thing} is a cube with a volume of $${e ** 3}$ ${unit}³. How long is each edge?`,
      parts: [numPart(e, { suffix: unit })],
      hints: ['The edge length is the cube root of the volume.', 'Which number multiplied by itself three times gives the volume?'],
      solution: [`Edge $= ${cbrt(e ** 3)}$`, `$${e} \\times ${e} \\times ${e} = ${e ** 3}$, so each edge is $${e}$ ${unit} long.`],
    };
  }
  const kind = rng.int(0, 2);
  if (kind === 2) {
    const a = rng.pick([2, 3]);
    const k = rng.int(2, 5);
    const b = a * k;
    return {
      prompt: `Small cubes with edges $${a}$ ${unit} long are packed into a cube-shaped box with inside edges $${b}$ ${unit} long. How many small cubes fill the box?`,
      parts: [numPart(k ** 3, { suffix: 'cubes' })],
      hints: ['Find how many small cubes fit along one edge of the box.', 'The same number fit along the length, the width and the height, so cube it.'],
      solution: [`Along one edge: $${b} \\div ${a} = ${k}$ cubes.`, `$${k} \\times ${k} \\times ${k} = ${k}^3 = ${k ** 3}$ cubes`],
    };
  }
  const e = rng.int(2, 5);
  return kind === 0
    ? {
        prompt: `A cube has a volume of $${e ** 3}$ ${unit}³. Find the area of one of its faces.`,
        parts: [numPart(e * e, { suffix: `${unit}²` })],
        hints: ['Find the edge length first: it is the cube root of the volume.', 'Each face is a square, so its area is the edge length squared.'],
        solution: [`Edge $= ${cbrt(e ** 3)} = ${e}$ ${unit}`, `Area of a face $= ${e}^2 = ${e * e}$ ${unit}²`],
      }
    : {
        prompt: `A cube-shaped frame is made from wire along all of its edges. The cube has a volume of $${e ** 3}$ ${unit}³. Find the total length of wire.`,
        parts: [numPart(12 * e, { suffix: unit })],
        hints: ['Find the edge length first: it is the cube root of the volume.', 'A cube has $12$ edges.'],
        solution: [`Edge $= ${cbrt(e ** 3)} = ${e}$ ${unit}`, `A cube has $12$ edges, so the wire is $12 \\times ${e} = ${12 * e}$ ${unit} long.`],
      };
}

// ---------------------------------------------------------------------------
// 20.3 The constant of proportionality
// ---------------------------------------------------------------------------

interface PropCtx {
  text: string;
  y: string;
  x: string;
  yName: string;
  xName: string;
  yUnit: string;
  xUnit: string;
  ks: number[];
}

const PROP: PropCtx[] = [
  { text: 'A cyclist rides at a steady speed, so the distance $d$ km is proportional to the time $t$ hours.', y: 'd', x: 't', yName: 'distance', xName: 'time', yUnit: 'km', xUnit: 'h', ks: [12, 15, 18, 20, 24] },
  { text: 'A printer works at a steady rate, so the number of pages $p$ is proportional to the time $t$ minutes.', y: 'p', x: 't', yName: 'pages', xName: 'time', yUnit: 'pages', xUnit: 'min', ks: [8, 12, 15, 25, 30] },
  { text: 'On a map, the real distance $r$ km is proportional to the distance $m$ cm on the map.', y: 'r', x: 'm', yName: 'real distance', xName: 'map distance', yUnit: 'km', xUnit: 'cm', ks: [2, 2.5, 4, 5, 20] },
  { text: 'A tap fills a tank at a steady rate, so the volume of water $V$ litres is proportional to the time $t$ minutes.', y: 'V', x: 't', yName: 'volume', xName: 'time', yUnit: 'L', xUnit: 'min', ks: [4, 6, 7.5, 9, 12] },
  { text: 'A recipe is scaled up, so the mass of flour $f$ grams is proportional to the number of batches $b$.', y: 'f', x: 'b', yName: 'flour', xName: 'batches', yUnit: 'g', xUnit: 'batches', ks: [150, 225, 250, 300, 350] },
  { text: 'A photo is enlarged, so each length $n$ cm on the enlargement is proportional to the matching length $o$ cm on the original.', y: 'n', x: 'o', yName: 'new length', xName: 'original length', yUnit: 'cm', xUnit: 'cm', ks: [1.5, 2, 2.5, 3, 4] },
];

const ONE: Record<string, string> = { h: 'hour', min: 'minute', cm: 'centimetre', batches: 'batch' };

function constantK(rng: Rng, d: Difficulty): Out {
  const c = rng.pick(PROP);
  const k = rng.pick(c.ks);
  const xs = rng.shuffle([2, 3, 4, 5, 6, 8, 10]).slice(0, 3).sort((a, b) => a - b) as [number, number, number];
  const y = (x: number) => roundTo(k * x, 2);
  const rule = `${c.y} = k${c.x}`;
  if (d === 1) {
    const x1 = xs[1];
    return {
      prompt: `${c.text} When $${c.x} = ${x1}$, $${c.y} = ${fmt(y(x1))}$. Find the constant of proportionality $k$ in $${rule}$.`,
      parts: [numPart(k, { label: '$k$ =' })],
      hints: [`In a proportional relationship $${rule}$, so $k = \\dfrac{${c.y}}{${c.x}}$.`, `Divide the ${c.yName} by the ${c.xName}.`],
      solution: [`$k = \\dfrac{${c.y}}{${c.x}} = \\dfrac{${fmt(y(x1))}}{${x1}} = ${fmt(k)}$`, `So $${c.y} = ${fmt(k)}${c.x}$: $${fmt(k)}$ ${c.yUnit} for every ${ONE[c.xUnit] ?? c.xUnit}.`],
    };
  }
  if (d === 2) {
    const table = `| $${c.x}$ (${c.xUnit}) | ${xs.join(' | ')} |\n|---|---|---|---|\n| $${c.y}$ (${c.yUnit}) | ${fmt(y(xs[0]))} | ${fmt(y(xs[1]))} | ? |`;
    return {
      prompt: `${c.text}\n\n${table}\n\nFind the constant of proportionality $k$, and the missing value in the table.`,
      parts: [numPart(k, { label: '$k$ =' }), numPart(y(xs[2]), { label: 'Missing value =', suffix: c.yUnit })],
      hints: [`Divide any $${c.y}$ value by its $${c.x}$ value to find $k$. Every pair gives the same answer.`, `Then multiply: $${c.y} = k${c.x}$.`],
      solution: [`$k = \\dfrac{${fmt(y(xs[0]))}}{${xs[0]}} = ${fmt(k)}$ (check: $\\dfrac{${fmt(y(xs[1]))}}{${xs[1]}} = ${fmt(k)}$)`, `When $${c.x} = ${xs[2]}$: $${c.y} = ${fmt(k)} \\times ${xs[2]} = ${fmt(y(xs[2]))}$ ${c.yUnit}`],
    };
  }
  const x1 = xs[0];
  const x2 = xs[2];
  return {
    prompt: `${c.text} The graph of the relationship is a straight line through $(0, 0)$ and $(${x1}, ${fmt(y(x1))})$. Find the constant of proportionality $k$ (the slope of the line), and then find $${c.x}$ when $${c.y} = ${fmt(y(x2))}$.`,
    parts: [numPart(k, { label: '$k$ =' }), numPart(x2, { label: `$${c.x}$ =`, suffix: c.xUnit })],
    hints: [`The line passes through $(0, 0)$, so $k = \\dfrac{${c.y}}{${c.x}}$ at any other point on it.`, `To find $${c.x}$, divide $${c.y}$ by $k$.`],
    solution: [`$k = \\dfrac{${fmt(y(x1))}}{${x1}} = ${fmt(k)}$, so $${c.y} = ${fmt(k)}${c.x}$.`, `$${fmt(y(x2))} = ${fmt(k)}${c.x}$, so $${c.x} = ${fmt(y(x2))} \\div ${fmt(k)} = ${x2}$ ${c.xUnit}`],
    calculator: true,
  };
}

const pairs = (xs: number[], f: (x: number) => number) => xs.map((x) => `$(${x}, ${fmt(roundTo(f(x), 2))})$`).join(', ');

function proportionalOrNot(rng: Rng, d: Difficulty): Out {
  const k = rng.pick([2, 3, 4, 5, 1.5, 2.5, 0.5]);
  const b = rng.int(1, 6);
  const xs = rng.shuffle([1, 2, 3, 4, 5, 6, 8]).slice(0, 4).sort((a, c) => a - c);
  if (d === 1) {
    const yes = rng.chance(0.5);
    const f = (x: number) => (yes ? k * x : k * x + b);
    const table = `| $x$ | ${xs.join(' | ')} |\n|---|---|---|---|---|\n| $y$ | ${xs.map((x) => fmt(f(x))).join(' | ')} |`;
    return {
      prompt: `Is $y$ proportional to $x$ in this table?\n\n${table}`,
      parts: [part(fixedChoice(['Proportional', 'Not proportional'], yes ? 0 : 1))],
      hints: ['Divide each $y$ value by its $x$ value.', 'The relationship is proportional only when every quotient $\\dfrac{y}{x}$ is the same number.'],
      solution: [
        `The quotients $\\dfrac{y}{x}$ are ${xs.map((x) => `$${fmt(roundTo(f(x) / x, 2))}$`).join(', ')}.`,
        yes ? `They are all $${fmt(k)}$, so $y$ is proportional to $x$, with $k = ${fmt(k)}$.` : 'They are not all the same, so $y$ is not proportional to $x$.',
      ],
    };
  }
  if (d === 2) {
    const correct = rng.chance(0.3) ? `$y = \\dfrac{x}{${rng.int(2, 6)}}$` : `$y = ${fmt(k)}x$`;
    return {
      prompt: 'Which equation shows a proportional relationship between $x$ and $y$?',
      parts: [part(mc(rng, correct, [`$y = ${fmt(k)}x + ${b}$`, `$y = x + ${b}$`, `$y = \\dfrac{${b + 6}}{x}$`, `$y = x^2$`]))],
      hints: ['A proportional relationship can always be written as $y = kx$ for one constant $k$.', 'Adding a number, dividing by $x$ or squaring $x$ all break the pattern $y = kx$.'],
      solution: [`${correct} has the form $y = kx$${correct.includes('dfrac') ? ', because dividing by a number is the same as multiplying by a fraction' : ''}.`, 'Its graph is a straight line through $(0, 0)$, and $\\dfrac{y}{x}$ is always the same.'],
    };
  }
  const correct = pairs(xs, (x) => k * x);
  const wrongAt = rng.int(1, 3);
  return {
    prompt: 'Each list gives pairs $(x, y)$. Which list shows a proportional relationship?',
    parts: [
      part(
        mc(rng, correct, [
          pairs(xs, (x) => k * x + b),
          pairs(xs, (x) => x + b + 1),
          xs.map((x, i) => `$(${x}, ${fmt(roundTo(k * x + (i === wrongAt ? 1 : 0), 2))})$`).join(', '),
        ]),
      ),
    ],
    hints: ['For each list, divide every $y$ by its $x$.', 'Only one list gives the same quotient for every pair.'],
    solution: [`In ${correct}, every quotient $\\dfrac{y}{x}$ is $${fmt(k)}$.`, `So $y = ${fmt(k)}x$, a proportional relationship. In each of the other lists at least one pair gives a different quotient.`],
    calculator: true,
  };
}

// ---------------------------------------------------------------------------
// 20.4 Sets of real numbers and set-builder notation
// ---------------------------------------------------------------------------

type SetKind = 'N' | 'Z' | 'Q' | 'I';
const SET_NAMES = ['Natural numbers', 'Integers', 'Rational numbers', 'Irrational numbers', 'Real numbers'];

interface Classified {
  tex: string;
  kind: SetKind;
  why: string;
}

function classified(rng: Rng, d: Difficulty): Classified {
  const kind = rng.pick<SetKind>(['N', 'Z', 'Q', 'Q', 'I', 'I']);
  const n = rng.int(2, 40);
  const r = rng.int(2, 12);
  if (kind === 'N') {
    return d > 1 && rng.chance(0.5) ? { tex: `\\sqrt{${r * r}}`, kind, why: `$\\sqrt{${r * r}} = ${r}$, a counting number` } : { tex: String(n), kind, why: `$${n}$ is a counting number` };
  }
  if (kind === 'Z') {
    if (d > 1 && rng.chance(0.4)) return { tex: `-\\sqrt{${r * r}}`, kind, why: `$-\\sqrt{${r * r}} = -${r}$, a negative whole number` };
    return rng.chance(0.2) ? { tex: '0', kind, why: 'zero is an integer, but it is not a natural number' } : { tex: String(-n), kind, why: `$-${n}$ is a negative whole number` };
  }
  if (kind === 'Q') {
    const den = rng.pick([2, 3, 4, 5, 7, 8]);
    const num = retry(() => rng.int(1, 15), (x) => gcd(x, den) === 1);
    const sign = rng.chance(0.4) ? '-' : '';
    const dec = fmt(rng.sign() * (rng.int(1, 9) + rng.pick([0.25, 0.5, 0.75, 0.2, 0.4, 0.125])));
    const rep = rng.pick(['0.\\overline{3}', '0.\\overline{6}', '1.\\overline{2}', '0.\\overline{45}']);
    return rng.pick<Classified>([
      { tex: `${sign}\\frac{${num}}{${den}}`, kind, why: 'it is a quotient of two integers that is not a whole number' },
      { tex: dec, kind, why: 'a terminating decimal can be written as a fraction' },
      { tex: rep, kind, why: 'a repeating decimal can be written as a fraction' },
    ]);
  }
  const m = rng.pick([2, 3, 5, 6, 7, 10, 11, 13, 15]);
  return rng.pick<Classified>([
    { tex: `\\sqrt{${m}}`, kind, why: `$${m}$ is not a perfect square, so $\\sqrt{${m}}$ is a decimal that never ends and never repeats` },
    { tex: `-\\sqrt{${m}}`, kind, why: `$${m}$ is not a perfect square, so its square root never ends and never repeats` },
    { tex: '\\pi', kind, why: '$\\pi$ is a decimal that never ends and never repeats' },
  ]);
}

const FACTS: Array<{ md: string; ok: boolean; why: string }> = [
  { md: 'Every integer is a rational number.', ok: true, why: 'Any integer $n$ can be written as $\\frac{n}{1}$.' },
  { md: 'The set of natural numbers is a subset of the set of integers.', ok: true, why: 'Every natural number is also an integer.' },
  { md: 'Every natural number is a real number.', ok: true, why: 'The natural numbers sit inside the integers, the rational numbers and the real numbers.' },
  { md: 'Every real number is either rational or irrational.', ok: true, why: 'The rational and irrational numbers together make up the real numbers, and no number is both.' },
  { md: 'The set of integers is infinite.', ok: true, why: 'The integers go on forever in both directions.' },
  { md: 'The set of even natural numbers less than $20$ is finite.', ok: true, why: 'It is $\\{2, 4, 6, \\ldots, 18\\}$, which has $9$ elements.' },
  { md: '$\\sqrt{15}$ is an irrational number.', ok: true, why: '$15$ is not a perfect square.' },
  { md: 'Every rational number is an integer.', ok: false, why: '$\\frac{1}{2}$ is rational but is not an integer.' },
  { md: 'The set of integers is a subset of the set of natural numbers.', ok: false, why: '$-3$ is an integer but is not a natural number.' },
  { md: 'Some irrational numbers are also rational.', ok: false, why: 'No number is both rational and irrational.' },
  { md: 'The set $\\{1, 2, 3, \\ldots, 50\\}$ is infinite.', ok: false, why: 'It stops at $50$, so it has $50$ elements.' },
  { md: 'The set of rational numbers between $0$ and $1$ is finite.', ok: false, why: 'There are infinitely many fractions between $0$ and $1$.' },
  { md: '$\\sqrt{16}$ is an irrational number.', ok: false, why: '$\\sqrt{16} = 4$, a natural number.' },
  { md: 'Every real number is rational.', ok: false, why: '$\\sqrt{2}$ is real but not rational.' },
  { md: 'The set of irrational numbers is a subset of the set of rational numbers.', ok: false, why: 'The two sets have no numbers in common.' },
  { md: '$\\pi$ is rational, because it equals $3.14$.', ok: false, why: '$3.14$ is only an approximation of $\\pi$.' },
];

function numberSets(rng: Rng, d: Difficulty): Out {
  if (d === 3) {
    const right = rng.pick(FACTS.filter((f) => f.ok));
    const wrong = rng.shuffle(FACTS.filter((f) => !f.ok)).slice(0, 3);
    return {
      prompt: 'Which statement is true?',
      parts: [part(mc(rng, right.md, wrong.map((w) => w.md)))],
      hints: ['The sets fit inside each other: natural numbers, then integers, then rational numbers, then real numbers.', 'A set is finite when its elements could be counted with the counting coming to an end.'],
      solution: [`True: ${right.md} ${right.why}`, ...wrong.map((w) => `False: ${w.md} ${w.why}`)],
    };
  }
  const x = classified(rng, d);
  const index = { N: 0, Z: 1, Q: 2, I: 3 }[x.kind];
  if (d === 1) {
    return {
      prompt: `Which is the smallest of these sets that contains $${x.tex}$?`,
      parts: [part(fixedChoice(SET_NAMES.slice(0, 4), index))],
      hints: ['Natural numbers are the counting numbers $1, 2, 3, \\ldots$ Integers add zero and the negatives. Rational numbers can be written as a fraction of two integers.', 'Irrational numbers are decimals that never end and never repeat.'],
      solution: [`$${x.tex}$: ${x.why}.`, `The smallest set that contains it is the ${SET_NAMES[index]!.toLowerCase()}.`],
    };
  }
  const inSet = [x.kind === 'N', x.kind === 'N' || x.kind === 'Z', x.kind !== 'I', x.kind === 'I', true];
  return {
    prompt: `Select every set that $${x.tex}$ belongs to.`,
    parts: [part(multi(rng, SET_NAMES.map((md, i) => ({ md, correct: inSet[i]! })), true))],
    hints: ['Simplify the number first if you can.', 'A natural number is also an integer, a rational number and a real number. Every number here is a real number.'],
    solution: [`$${x.tex}$: ${x.why}.`, `It belongs to: ${SET_NAMES.filter((_, i) => inSet[i]).map((s) => s.toLowerCase()).join(', ')}.`],
  };
}

const builder = (cond: string, set: 'N' | 'Z' | 'R') => `\\{x \\mid ${cond},\\ x \\in \\mathbb{${set}}\\}`;
const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

function setBuilder(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    if (rng.chance(0.3)) {
      const b = rng.int(4, 8);
      const strict = rng.chance(0.5);
      const values = range(1, strict ? b - 1 : b);
      return {
        prompt: `List the elements of the set $${builder(`x ${strict ? '<' : '\\le'} ${b}`, 'N')}$.`,
        parts: [part({ kind: 'numbers', values }, { placeholder: 'e.g. 1, 2, 3' })],
        hints: ['Read the notation as "the set of all $x$ such that ...". $\\mathbb{N}$ is the set of natural numbers, which start at $1$.', strict ? 'The symbol $<$ does not include the end number.' : 'The symbol $\\le$ includes the end number.'],
        solution: [`The natural numbers ${strict ? 'less than' : 'less than or equal to'} $${b}$ are $${values.join(', ')}$.`],
      };
    }
    const a = rng.int(-5, 1);
    const b = a + rng.int(3, 5);
    const sa = rng.chance(0.5);
    const sb = rng.chance(0.5);
    const values = range(sa ? a + 1 : a, sb ? b - 1 : b);
    return {
      prompt: `List the elements of the set $${builder(`${a} ${sa ? '<' : '\\le'} x ${sb ? '<' : '\\le'} ${b}`, 'Z')}$.`,
      parts: [part({ kind: 'numbers', values }, { placeholder: 'e.g. -1, 0, 1' })],
      hints: ['Read the notation as "the set of all $x$ such that ...". $\\mathbb{Z}$ is the set of integers.', 'The symbol $\\le$ includes the end number, and $<$ does not.'],
      solution: [`The integers from $${a}$ ${sa ? '(not included)' : '(included)'} to $${b}$ ${sb ? '(not included)' : '(included)'} are $${values.join(', ')}$.`],
    };
  }
  if (d === 2) {
    const a = rng.int(-9, 9);
    const forms = [
      { words: `greater than $${a}$`, sym: '>' },
      { words: `less than $${a}$`, sym: '<' },
      { words: `greater than or equal to $${a}$`, sym: '\\ge' },
      { words: `less than or equal to $${a}$`, sym: '\\le' },
      { words: `at least $${a}$`, sym: '\\ge' },
      { words: `at most $${a}$`, sym: '\\le' },
    ];
    const f = rng.pick(forms);
    const flip: Record<string, string> = { '>': '<', '<': '>', '\\ge': '\\le', '\\le': '\\ge' };
    const loosen: Record<string, string> = { '>': '\\ge', '<': '\\le', '\\ge': '>', '\\le': '<' };
    return {
      prompt: `Which set-builder notation describes the set of all real numbers ${f.words}?`,
      parts: [part(mc(rng, `$${builder(`x ${f.sym} ${a}`, 'R')}$`, [`$${builder(`x ${loosen[f.sym]} ${a}`, 'R')}$`, `$${builder(`x ${flip[f.sym]} ${a}`, 'R')}$`, `$${builder(`x ${f.sym} ${a}`, 'N')}$`]))],
      hints: ['$\\mathbb{R}$ stands for the real numbers and $\\mathbb{N}$ for the natural numbers.', '"At least" and "or equal to" include the end number, so they need $\\ge$ or $\\le$.'],
      solution: [`"${f.words.replace(/\$/g, '')}" is written $x ${f.sym} ${a}$.`, `All real numbers: $x \\in \\mathbb{R}$. The set is $${builder(`x ${f.sym} ${a}`, 'R')}$.`],
    };
  }
  // Solve ax + b (sign) c, then choose the solution set.
  const a = rng.pick([2, 3, 4, 5, -2, -3, -4]);
  const sol = rng.int(-6, 6);
  const b = rng.nonZero(-9, 9);
  const c = a * sol + b;
  const sym = rng.pick(['<', '>', '\\le', '\\ge']);
  const flip: Record<string, string> = { '>': '<', '<': '>', '\\ge': '\\le', '\\le': '\\ge' };
  const loosen: Record<string, string> = { '>': '\\ge', '<': '\\le', '\\ge': '>', '\\le': '<' };
  const final = a < 0 ? flip[sym]! : sym;
  const lhs = `${a === -1 ? '-' : a}x ${b < 0 ? '-' : '+'} ${Math.abs(b)}`;
  return {
    prompt: `Solve $${lhs} ${sym} ${c}$. Which set describes the solutions?`,
    parts: [part(mc(rng, `$${builder(`x ${final} ${sol}`, 'R')}$`, [`$${builder(`x ${flip[final]} ${sol}`, 'R')}$`, `$${builder(`x ${loosen[final]} ${sol}`, 'R')}$`, `$${builder(`x ${final} ${-sol === sol ? sol + 1 : -sol}`, 'R')}$`]))],
    hints: ['Solve the inequality as you would an equation: undo the addition or subtraction, then the multiplication.', 'When you divide both sides by a negative number, reverse the inequality sign.'],
    solution: [
      `$${a}x ${sym} ${c} ${b < 0 ? '+' : '-'} ${Math.abs(b)}$, so $${a}x ${sym} ${c - b}$.`,
      a < 0 ? `Divide both sides by $${a}$ and reverse the sign: $x ${final} ${sol}$.` : `Divide both sides by $${a}$: $x ${final} ${sol}$.`,
      `The solution set is $${builder(`x ${final} ${sol}`, 'R')}$.`,
    ],
  };
}

export const NUMBERSET_SKILLS: SkillDef[] = [
  skill({ id: 'mx-absolute-value', name: 'Absolute value and opposites', description: 'Find absolute values and opposites of integers and decimals, and evaluate expressions with absolute value bars', outcomes: ['NS1'], lessonId: 'mx-20-1', gen: absoluteValue }),
  skill({ id: 'mx-order-signed-numbers', name: 'Ordering positive and negative numbers', description: 'Compare and order positive and negative decimals and fractions', outcomes: ['NS1'], lessonId: 'mx-20-1', gen: orderSigned }),
  skill({ id: 'mx-perfect-cubes', name: 'Perfect cubes and cube roots', description: 'Recognize perfect cubes up to 125, and find cubes and cube roots', outcomes: ['NS2'], lessonId: 'mx-20-2', gen: perfectCubes }),
  skill({ id: 'mx-cube-volume', name: 'Cubes and volume', description: 'Relate the volume of a cube to its edge length with cubes and cube roots', outcomes: ['NS2'], lessonId: 'mx-20-2', gen: cubeVolume }),
  skill({ id: 'mx-constant-of-proportionality', name: 'The constant of proportionality', description: 'Find the constant of proportionality from a pair of values, a table or a graph, and use it', outcomes: ['NS3'], lessonId: 'mx-20-3', gen: constantK }),
  skill({ id: 'mx-proportional-or-not', name: 'Proportional or not', description: 'Decide whether a table, an equation or a list of pairs shows a proportional relationship', outcomes: ['NS3'], lessonId: 'mx-20-3', gen: proportionalOrNot }),
  skill({ id: 'mx-number-sets', name: 'Sets of real numbers', description: 'Classify numbers as natural, integer, rational, irrational and real, and reason about subsets and finite and infinite sets', outcomes: ['NS4'], lessonId: 'mx-20-4', gen: numberSets }),
  skill({ id: 'mx-set-builder', name: 'Set-builder notation', description: 'Read and write sets of numbers in set-builder notation, including the solutions of a linear inequality', outcomes: ['NS4'], lessonId: 'mx-20-4', gen: setBuilder }),
];
