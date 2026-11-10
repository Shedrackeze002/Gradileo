/** More Mathematics Topics, Unit 11: frequency trees, histograms and cumulative frequency. */
import { mc, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { fmt, gcd } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, SkillDef } from '../../../types.ts';
import { sum } from './common.ts';

type Out = GenOutput;
type Pt = [number, number];

const frac = (n: number, d: number) => {
  const g = gcd(n, d);
  return g === d ? `${n / g}` : `\\frac{${n / g}}{${d / g}}`;
};

// ---------------------------------------------------------------------------
// 11.1 Frequency trees
// ---------------------------------------------------------------------------

interface TreeCtx {
  who: string;
  /** The word for one of them in "one of the people who…". */
  noun: string;
  rel: 'who' | 'that';
  /** Labels on the tree, and the two groups as nouns ("adults", "petrol cars"). */
  first: [string, string];
  groups: [string, string];
  second: [string, string];
  /** "bought popcorn": how the second split reads in a sentence, for the first option. */
  verb: string;
  notVerb: string;
}

const TREES: TreeCtx[] = [
  { who: 'people at a cinema', noun: 'people', rel: 'who', first: ['Adults', 'Children'], groups: ['adults', 'children'], second: ['Popcorn', 'None'], verb: 'bought popcorn', notVerb: 'did not buy popcorn' },
  { who: 'members of a sports club', noun: 'members', rel: 'who', first: ['Juniors', 'Seniors'], groups: ['juniors', 'seniors'], second: ['Swim', 'No swim'], verb: 'swim', notVerb: 'do not swim' },
  { who: 'cars at a test centre', noun: 'cars', rel: 'that', first: ['Petrol', 'Electric'], groups: ['petrol cars', 'electric cars'], second: ['Pass', 'Fail'], verb: 'passed the test', notVerb: 'failed the test' },
  { who: 'trees in a wood', noun: 'trees', rel: 'that', first: ['Oak', 'Ash'], groups: ['oak trees', 'ash trees'], second: ['Healthy', 'Diseased'], verb: 'were healthy', notVerb: 'were diseased' },
  { who: 'visitors to a museum', noun: 'visitors', rel: 'who', first: ['Members', 'Guests'], groups: ['members', 'guests'], second: ['Tour', 'No tour'], verb: 'took a tour', notVerb: 'did not take a tour' },
];

interface TreeData {
  c: TreeCtx;
  T: number;
  a: number;
  b: number;
  /** Leaves: a = p + q, b = r + s. */
  p: number;
  q: number;
  r: number;
  s: number;
}

function treeData(rng: Rng, nice = false): TreeData {
  const c = rng.pick(TREES);
  return retry(
    () => {
      const T = nice ? rng.pick([40, 60, 80, 100, 120, 200]) : rng.int(40, 150);
      const a = nice ? (T * rng.pick([1, 2, 3, 4])) / 5 : rng.int(Math.round(T * 0.25), Math.round(T * 0.75));
      const b = T - a;
      const p = nice ? (a * rng.pick([1, 2, 3])) / 4 : rng.int(Math.round(a * 0.2), Math.round(a * 0.8));
      const r = nice ? (b * rng.pick([1, 2, 3, 4])) / 5 : rng.int(Math.round(b * 0.2), Math.round(b * 0.8));
      return { c, T, a, b, p, q: a - p, r, s: b - r };
    },
    (t) => [t.a, t.b, t.p, t.q, t.r, t.s].every((v) => Number.isInteger(v) && v > 0) && t.p !== t.q && t.r !== t.s,
    300,
  );
}

/** A frequency tree drawn on a plane; `show` decides which numbers appear (the rest show "?" or a letter). */
function treeFigure(t: TreeData, show: (key: 'T' | 'a' | 'b' | 'p' | 'q' | 'r' | 's') => string): Figure {
  const root: Pt = [0.4, 4];
  const L1: Pt[] = [[4, 6], [4, 2]];
  const L2: Pt[] = [[8.4, 7], [8.4, 5], [8.4, 3], [8.4, 1]];
  const [A, B] = t.c.first;
  const [Y, N] = t.c.second;
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: 13, yMin: 0, yMax: 8, xStep: 13, yStep: 8 },
    hideTickLabels: true,
    hideAxes: true,
    segments: [
      { from: root, to: L1[0]!, color: 'muted' },
      { from: root, to: L1[1]!, color: 'muted' },
      { from: L1[0]!, to: L2[0]!, color: 'muted' },
      { from: L1[0]!, to: L2[1]!, color: 'muted' },
      { from: L1[1]!, to: L2[2]!, color: 'muted' },
      { from: L1[1]!, to: L2[3]!, color: 'muted' },
    ],
    points: [
      { x: root[0], y: root[1], label: show('T') },
      { x: L1[0]![0], y: L1[0]![1], label: `${A}: ${show('a')}` },
      { x: L1[1]![0], y: L1[1]![1], label: `${B}: ${show('b')}` },
      { x: L2[0]![0], y: L2[0]![1], label: `${Y}: ${show('p')}` },
      { x: L2[1]![0], y: L2[1]![1], label: `${N}: ${show('q')}` },
      { x: L2[2]![0], y: L2[2]![1], label: `${Y}: ${show('r')}` },
      { x: L2[3]![0], y: L2[3]![1], label: `${N}: ${show('s')}` },
    ],
    caption: `A frequency tree for ${t.c.who}`,
  };
}

function frequencyTree(rng: Rng, d: Difficulty): Out {
  const t = treeData(rng, d === 3);
  const [A, B] = t.c.first;
  const [al, bl] = t.c.groups;
  const rel = t.c.rel;
  if (d === 1) {
    const known = new Set(['T', 'a', 'p', 'r']);
    return {
      prompt: `The frequency tree shows ${t.c.who}. Find the missing numbers $x$, $y$ and $z$.`,
      figure: treeFigure(t, (k) => (known.has(k) ? String(t[k]) : k === 'b' ? 'x' : k === 'q' ? 'y' : 'z')),
      parts: [numPart(t.b, { label: '$x$ =' }), numPart(t.q, { label: '$y$ =' }), numPart(t.s, { label: '$z$ =' })],
      hints: ['The two numbers on the branches from a box add up to the number in that box.', `Start with the first split: ${A} and ${B} together make $${t.T}$.`],
      solution: [`$x = ${t.T} - ${t.a} = ${t.b}$`, `$y = ${t.a} - ${t.p} = ${t.q}$`, `$z = x - ${t.r} = ${t.b} - ${t.r} = ${t.s}$`],
    };
  }
  if (d === 2) {
    return {
      prompt: `There were $${t.T}$ ${t.c.who}. $${t.b}$ of them were ${bl}. $${t.r}$ of the ${bl} ${t.c.verb}, and $${t.q}$ of the ${al} ${t.c.notVerb}. Complete a frequency tree, then find how many ${al} ${t.c.verb}, and how many altogether ${t.c.verb}.`,
      figure: treeFigure(t, () => '?'),
      parts: [numPart(t.p, { label: `${A}:` }), numPart(t.p + t.r, { label: 'Altogether:' })],
      hints: ['Fill in the tree from the left: put the total in the first box, then split it.', `There are $${t.T} - ${t.b}$ ${al}. Split them into those ${rel} ${t.c.verb} and those ${rel} ${t.c.notVerb}.`],
      solution: [
        `${A}: $${t.T} - ${t.b} = ${t.a}$`,
        `${A} ${rel} ${t.c.verb}: $${t.a} - ${t.q} = ${t.p}$`,
        `Altogether: $${t.p} + ${t.r} = ${t.p + t.r}$`,
      ],
    };
  }
  const fa = frac(t.a, t.T);
  const pa = Math.round((t.p / t.a) * 100);
  const pb = Math.round((t.r / t.b) * 100);
  return {
    prompt: `There were $${t.T}$ ${t.c.who}. $${fa}$ of them were ${al}. $${pa}\\%$ of the ${al} ${t.c.verb}, and $${pb}\\%$ of the ${bl} ${t.c.verb}. Find how many of the ${al}, and how many of the ${bl}, ${t.c.notVerb}.`,
    figure: treeFigure(t, (k) => (k === 'T' ? String(t.T) : '?')),
    parts: [numPart(t.q, { label: `${A}:` }), numPart(t.s, { label: `${B}:` })],
    hints: [`Find the number of ${al} first: $${fa}$ of $${t.T}$.`, `Then find $${pa}\\%$ of the ${al} and $${pb}\\%$ of the ${bl}, and subtract to find those ${rel} ${t.c.notVerb}.`],
    solution: [
      `${A}: $${fa} \\times ${t.T} = ${t.a}$, so ${bl}: $${t.T} - ${t.a} = ${t.b}$.`,
      `${A} ${rel} ${t.c.verb}: $${pa}\\% \\times ${t.a} = ${t.p}$, so $${t.a} - ${t.p} = ${t.q}$ ${t.c.notVerb}.`,
      `${B} ${rel} ${t.c.verb}: $${pb}\\% \\times ${t.b} = ${t.r}$, so $${t.b} - ${t.r} = ${t.s}$ ${t.c.notVerb}.`,
    ],
  };
}

function frequencyTreeProbability(rng: Rng, d: Difficulty): Out {
  const t = treeData(rng);
  const [al, bl] = t.c.groups;
  const rel = t.c.rel;
  const fig = treeFigure(t, (k) => String(t[k]));
  const fracHint = 'Probability $= \\dfrac{\\text{number of ways it can happen}}{\\text{total number}}$. Give the fraction in its lowest terms.';
  if (d === 1) {
    const first = rng.chance(0.5);
    const n = first ? t.a : t.b;
    return {
      prompt: `The frequency tree shows ${t.c.who}. One of them is chosen at random. Find the probability that it is one of the ${first ? al : bl}. Give your answer as a fraction.`,
      figure: fig,
      parts: [numPart(n / t.T, { fraction: 'lowest' })],
      hints: [fracHint, `There are $${n}$ ${first ? al : bl} out of $${t.T}$.`],
      solution: [`$P = \\dfrac{${n}}{${t.T}}${frac(n, t.T) !== `\\frac{${n}}{${t.T}}` ? ` = ${frac(n, t.T)}` : ''}$`],
    };
  }
  if (d === 2) {
    const which = rng.pick(['p', 'q', 'r', 's'] as const);
    const n = t[which];
    const group = which === 'p' || which === 'q' ? al : bl;
    const what = which === 'p' || which === 'r' ? t.c.verb : t.c.notVerb;
    return {
      prompt: `The frequency tree shows ${t.c.who}. One of them is chosen at random. Find the probability that it is one of the ${group} ${rel} ${what}. Give your answer as a fraction.`,
      figure: fig,
      parts: [numPart(n / t.T, { fraction: 'lowest' })],
      hints: [fracHint, 'Follow the branches to the end box for that group, and divide by the total at the start.'],
      solution: [`There are $${n}$ ${group} ${rel} ${what}, out of $${t.T}$.`, `$P = \\dfrac{${n}}{${t.T}}${frac(n, t.T) !== `\\frac{${n}}{${t.T}}` ? ` = ${frac(n, t.T)}` : ''}$`],
    };
  }
  // Given one fact, the probability of another: divide by the smaller group.
  const givenFirst = rng.chance(0.5);
  if (givenFirst) {
    const ofA = rng.chance(0.5);
    const n = ofA ? t.p : t.r;
    const of = ofA ? t.a : t.b;
    return {
      prompt: `The frequency tree shows ${t.c.who}. One of the ${ofA ? al : bl} is chosen at random. Find the probability that they ${t.c.verb}. Give your answer as a fraction.`,
      figure: fig,
      parts: [numPart(n / of, { fraction: 'lowest' })],
      hints: [`Only the ${ofA ? al : bl} can be chosen, so the total is $${of}$, not $${t.T}$.`, fracHint],
      solution: [`There are $${of}$ ${ofA ? al : bl}, and $${n}$ of them ${t.c.verb}.`, `$P = \\dfrac{${n}}{${of}}${frac(n, of) !== `\\frac{${n}}{${of}}` ? ` = ${frac(n, of)}` : ''}$`],
    };
  }
  const tot = t.p + t.r;
  return {
    prompt: `The frequency tree shows ${t.c.who}. One of the ${t.c.noun} ${rel} ${t.c.verb} is chosen at random. Find the probability that it is one of the ${al}. Give your answer as a fraction.`,
    figure: fig,
    parts: [numPart(t.p / tot, { fraction: 'lowest' })],
    hints: [`First count all the ${t.c.noun} ${rel} ${t.c.verb}: there are some on each main branch.`, `Then divide the number of ${al} among them by that count.`],
    solution: [`The ${t.c.noun} ${rel} ${t.c.verb}: $${t.p} + ${t.r} = ${tot}$, of whom $${t.p}$ are ${al}.`, `$P = \\dfrac{${t.p}}{${tot}}${frac(t.p, tot) !== `\\frac{${t.p}}{${tot}}` ? ` = ${frac(t.p, tot)}` : ''}$`],
  };
}

// ---------------------------------------------------------------------------
// 11.2 Histograms
// ---------------------------------------------------------------------------

interface HistCtx {
  label: string;
  v: string;
  unit: string;
  what: string;
}

const HISTS: HistCtx[] = [
  { label: 'Time, $t$ (minutes)', v: 't', unit: 'minutes', what: 'the times some runners took to finish a fun run' },
  { label: 'Height, $h$ (cm)', v: 'h', unit: 'cm', what: 'the heights of some plants' },
  { label: 'Mass, $m$ (g)', v: 'm', unit: 'g', what: 'the masses of some potatoes' },
  { label: 'Age, $a$ (years)', v: 'a', unit: 'years', what: 'the ages of the people at a concert' },
  { label: 'Length, $l$ (mm)', v: 'l', unit: 'mm', what: 'the lengths of some leaves' },
];

interface Hist {
  c: HistCtx;
  bounds: number[];
  widths: number[];
  fd: number[];
  f: number[];
  yStep: number;
}

function histData(rng: Rng): Hist {
  const c = rng.pick(HISTS);
  return retry(
    () => {
      const u = rng.pick([5, 10]);
      const start = c.unit === 'years' ? 20 : rng.pick([0, 10, 20]) * (u / 5);
      const widths = rng.pick([[1, 1, 2, 2, 4], [2, 1, 1, 2, 4], [1, 2, 2, 1, 2], [2, 2, 1, 1, 4], [4, 2, 1, 1, 2]]).map((w) => w * u);
      const bounds = widths.reduce((b, w) => [...b, b[b.length - 1]! + w], [start]);
      const yStep = rng.pick([0.2, 0.5, 1, 2]);
      const fd = widths.map(() => Math.round(yStep * rng.int(1, 9) * 10) / 10);
      const f = fd.map((x, i) => Math.round(x * widths[i]! * 100) / 100);
      return { c, bounds, widths, fd, f, yStep };
    },
    (h) => h.f.every((x) => Number.isInteger(x) && x > 0) && new Set(h.fd).size > 2,
    400,
  );
}

const cls = (h: Hist, i: number) => `$${fmt(h.bounds[i]!)} < ${h.c.v} \\le ${fmt(h.bounds[i + 1]!)}$`;

function histFigure(h: Hist): Figure {
  const top = Math.max(...h.fd);
  const step = Math.min(...h.widths);
  return {
    type: 'plane',
    grid: { xMin: h.bounds[0]!, xMax: h.bounds[h.bounds.length - 1]!, yMin: 0, yMax: Math.ceil(top / h.yStep) * h.yStep + h.yStep, xStep: step, yStep: h.yStep, xLabel: h.c.label.replace(/\$/g, ''), yLabel: 'Frequency density' },
    polylines: h.fd.map((y, i) => ({ points: [[h.bounds[i]!, 0], [h.bounds[i]!, y], [h.bounds[i + 1]!, y], [h.bounds[i + 1]!, 0]] as Pt[], color: 'brand' as const, fill: true })),
  };
}

function histTable(h: Hist): Figure {
  return { type: 'table', headers: [h.c.label, 'Frequency'], rows: h.f.map((f, i) => [cls(h, i), String(f)]), markdown: true };
}

const FD_HINT = 'Frequency density $= \\dfrac{\\text{frequency}}{\\text{class width}}$, so frequency $=$ frequency density $\\times$ class width.';

function histogramDensity(rng: Rng, d: Difficulty): Out {
  const h = histData(rng);
  if (d === 3) {
    const i = rng.int(0, h.f.length - 1);
    const table = `| ${h.c.label} | Frequency |\n|---|---|\n${h.f.map((f, k) => `| ${cls(h, k)} | ${k === i ? '?' : f} |`).join('\n')}`;
    return {
      prompt: `The table and the histogram show ${h.c.what}. One frequency is missing from the table. Use the histogram to find it, and then find the total frequency.\n\n${table}`,
      figure: histFigure(h),
      parts: [numPart(h.f[i]!, { label: 'Missing frequency:' }), numPart(sum(h.f), { label: 'Total:' })],
      hints: [FD_HINT, `Read the height of the bar for ${cls(h, i)}, and multiply by its width, $${h.widths[i]}$.`],
      solution: [
        `The bar for ${cls(h, i)} has a frequency density of $${fmt(h.fd[i]!)}$ and a width of $${h.widths[i]}$.`,
        `Frequency $= ${fmt(h.fd[i]!)} \\times ${h.widths[i]} = ${h.f[i]}$`,
        `Total $= ${h.f.join(' + ')} = ${sum(h.f)}$`,
      ],
    };
  }
  const [i, j] = rng.shuffle([0, 1, 2, 3, 4]).slice(0, 2) as [number, number];
  if (d === 1) {
    return {
      prompt: `The table shows ${h.c.what}. Find the frequency density of the class ${cls(h, i)}, to draw a histogram.`,
      figure: histTable(h),
      parts: [numPart(h.fd[i]!, { exact: false })],
      hints: [FD_HINT, `The class ${cls(h, i)} has a width of $${fmt(h.bounds[i + 1]!)} - ${fmt(h.bounds[i]!)} = ${h.widths[i]}$.`],
      solution: [`Class width $= ${fmt(h.bounds[i + 1]!)} - ${fmt(h.bounds[i]!)} = ${h.widths[i]}$`, `Frequency density $= \\dfrac{${h.f[i]}}{${h.widths[i]}} = ${fmt(h.fd[i]!)}$`],
    };
  }
  return {
    prompt: `The table shows ${h.c.what}. Find the frequency densities of the classes ${cls(h, i)} and ${cls(h, j)}.`,
    figure: histTable(h),
    parts: [numPart(h.fd[i]!, { exact: false, label: `${cls(h, i)}:` }), numPart(h.fd[j]!, { exact: false, label: `${cls(h, j)}:` })],
    hints: [FD_HINT, 'The classes have different widths, so divide each frequency by its own class width.'],
    solution: [
      `${cls(h, i)}: width $${h.widths[i]}$, so frequency density $= \\dfrac{${h.f[i]}}{${h.widths[i]}} = ${fmt(h.fd[i]!)}$`,
      `${cls(h, j)}: width $${h.widths[j]}$, so frequency density $= \\dfrac{${h.f[j]}}{${h.widths[j]}} = ${fmt(h.fd[j]!)}$`,
    ],
  };
}

function histogramRead(rng: Rng, d: Difficulty): Out {
  const h = histData(rng);
  const fig = histFigure(h);
  if (d === 1) {
    const i = rng.int(0, h.f.length - 1);
    return {
      prompt: `The histogram shows ${h.c.what}. How many are in the class ${cls(h, i)}?`,
      figure: fig,
      parts: [numPart(h.f[i]!)],
      hints: ['In a histogram the area of a bar, not its height, shows the frequency.', FD_HINT],
      solution: [`The bar for ${cls(h, i)} is $${h.widths[i]}$ wide and $${fmt(h.fd[i]!)}$ high.`, `Frequency $= ${fmt(h.fd[i]!)} \\times ${h.widths[i]} = ${h.f[i]}$`],
    };
  }
  if (d === 2) {
    return {
      prompt: `The histogram shows ${h.c.what}. How many are there altogether?`,
      figure: fig,
      parts: [numPart(sum(h.f))],
      hints: [FD_HINT, 'Find the frequency of every bar, and add them.'],
      solution: [...h.f.map((f, i) => `${cls(h, i)}: $${fmt(h.fd[i]!)} \\times ${h.widths[i]} = ${f}$`), `Total $= ${h.f.join(' + ')} = ${sum(h.f)}$`],
    };
  }
  // Estimate how many are above a value inside a class, assuming the values are spread evenly.
  const i = retry(() => rng.int(1, h.f.length - 1), (k) => h.widths[k]! >= 10);
  const part = rng.pick([0.25, 0.5, 0.75]);
  const v = h.bounds[i]! + h.widths[i]! * part;
  const inClass = h.fd[i]! * (h.bounds[i + 1]! - v);
  const above = h.f.slice(i + 1);
  const est = inClass + sum(above);
  return {
    prompt: `The histogram shows ${h.c.what}. Estimate how many are more than $${fmt(v)}$ ${h.c.unit}.`,
    figure: fig,
    parts: [numPart(est, { exact: false })],
    hints: [FD_HINT, `$${fmt(v)}$ is inside the class ${cls(h, i)}. Assume its values are spread evenly, and take the part of that bar to the right of $${fmt(v)}$.`],
    solution: [
      `Part of ${cls(h, i)} above $${fmt(v)}$: width $${fmt(h.bounds[i + 1]! - v)}$, so about $${fmt(h.fd[i]!)} \\times ${fmt(h.bounds[i + 1]! - v)} = ${fmt(inClass)}$.`,
      above.length ? `Classes above it: $${above.join(' + ')} = ${sum(above)}$` : 'No classes lie above it.',
      `Estimate: $${fmt(inClass)}${above.length ? ` + ${sum(above)}` : ''} = ${fmt(est)}$`,
    ],
  };
}

// ---------------------------------------------------------------------------
// 11.3 Cumulative frequency
// ---------------------------------------------------------------------------

interface Cum {
  c: HistCtx;
  bounds: number[];
  f: number[];
  cf: number[];
  N: number;
  w: number;
}

function cumData(rng: Rng): Cum {
  const c = rng.pick(HISTS);
  return retry(
    () => {
      const w = rng.pick([5, 10, 20]);
      const k = rng.int(5, 6);
      const start = c.unit === 'years' ? 20 : rng.pick([0, w, 2 * w]);
      const bounds = Array.from({ length: k + 1 }, (_, i) => start + i * w);
      const N = rng.pick([40, 60, 80, 100, 120]);
      // A hump-shaped set of frequencies that adds to N.
      const shape = Array.from({ length: k }, (_, i) => 1 + Math.min(i, k - 1 - i) * 2 + rng.int(0, 2));
      const raw = shape.map((s) => Math.max(1, Math.round((s / sum(shape)) * N)));
      raw[Math.floor(k / 2)]! += N - sum(raw);
      const cf = raw.reduce<number[]>((a, x) => [...a, (a[a.length - 1] ?? 0) + x], []);
      return { c, bounds, f: raw, cf, N, w };
    },
    (d) => d.f.every((x) => x > 0) && sum(d.f) === d.N,
    200,
  );
}

const ccls = (d: Cum, i: number) => `$${fmt(d.bounds[i]!)} < ${d.c.v} \\le ${fmt(d.bounds[i + 1]!)}$`;

function cumTable(d: Cum): Figure {
  return { type: 'table', headers: [d.c.label, 'Frequency'], rows: d.f.map((f, i) => [ccls(d, i), String(f)]), markdown: true };
}

function cumFigure(d: Cum): Figure {
  const pts: Pt[] = [[d.bounds[0]!, 0], ...d.cf.map((y, i) => [d.bounds[i + 1]!, y] as Pt)];
  const yStep = d.N <= 60 ? 5 : 10;
  return {
    type: 'plane',
    grid: { xMin: d.bounds[0]!, xMax: d.bounds[d.bounds.length - 1]!, yMin: 0, yMax: Math.ceil(d.N / yStep) * yStep, xStep: d.w / (d.w >= 10 ? 2 : 1), yStep, xLabel: d.c.label.replace(/\$/g, ''), yLabel: 'Cumulative frequency' },
    polylines: [{ points: pts, color: 'brand' }],
    points: pts.map(([x, y]) => ({ x, y, color: 'brand' as const })),
  };
}

/** The value at a cumulative frequency, reading across to the polygon and down (straight-line interpolation). */
function readAt(d: Cum, target: number): number {
  const pts: Pt[] = [[d.bounds[0]!, 0], ...d.cf.map((y, i) => [d.bounds[i + 1]!, y] as Pt)];
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1]!;
    const [x1, y1] = pts[i]!;
    if (target <= y1) return x0 + ((target - y0) / (y1 - y0)) * (x1 - x0);
  }
  return pts[pts.length - 1]![0];
}

function cumulativeTable(rng: Rng, dd: Difficulty): Out {
  const d = cumData(rng);
  const k = rng.int(1, d.f.length - 2);
  if (dd === 3) {
    const quartile = rng.pick([['median', 0.5], ['lower quartile', 0.25], ['upper quartile', 0.75]] as const);
    const pos = d.N * quartile[1];
    const idx = d.cf.findIndex((c) => c >= pos);
    return {
      prompt: `The table shows ${d.c.what}. Which class contains the ${quartile[0]}?`,
      figure: cumTable(d),
      parts: [{ answer: mc(rng, ccls(d, idx), d.f.map((_, i) => ccls(d, i)).filter((_, i) => i !== idx), { keepOrder: true, max: 6 }) }],
      hints: ['Work out the cumulative frequencies: a running total of the frequencies.', `The ${quartile[0]} is about the $${fmt(pos)}$th value (${quartile[1] === 0.5 ? 'half' : quartile[1] === 0.25 ? 'a quarter' : 'three quarters'} of $${d.N}$). Find the first class whose running total reaches it.`],
      solution: [`Cumulative frequencies: $${d.cf.join(',\\ ')}$`, `The ${quartile[0]} is the $${fmt(pos)}$th value, and the running total first reaches $${fmt(pos)}$ in ${ccls(d, idx)} (at $${d.cf[idx]}$).`],
    };
  }
  if (dd === 1) {
    return {
      prompt: `The table shows ${d.c.what}. Find the cumulative frequency at $${fmt(d.bounds[k + 1]!)}$ ${d.c.unit}: the number of values that are at most $${fmt(d.bounds[k + 1]!)}$ ${d.c.unit}.`,
      figure: cumTable(d),
      parts: [numPart(d.cf[k]!)],
      hints: ['The cumulative frequency is a running total of the frequencies.', `Add the frequencies of every class up to ${ccls(d, k)}.`],
      solution: [`$${d.f.slice(0, k + 1).join(' + ')} = ${d.cf[k]}$`],
    };
  }
  return {
    prompt: `The table shows ${d.c.what}. How many are more than $${fmt(d.bounds[k + 1]!)}$ ${d.c.unit}?`,
    figure: cumTable(d),
    parts: [numPart(d.N - d.cf[k]!)],
    hints: ['Find the cumulative frequency (running total) up to that value.', 'Subtract it from the total frequency.'],
    solution: [`Up to $${fmt(d.bounds[k + 1]!)}$: $${d.f.slice(0, k + 1).join(' + ')} = ${d.cf[k]}$. Total: $${d.N}$.`, `More than $${fmt(d.bounds[k + 1]!)}$: $${d.N} - ${d.cf[k]} = ${d.N - d.cf[k]!}$`],
  };
}

function cumulativeRead(rng: Rng, dd: Difficulty): Out {
  const d = cumData(rng);
  const fig = cumFigure(d);
  if (dd === 1) {
    const k = rng.int(0, d.f.length - 2);
    const more = rng.chance(0.5);
    return {
      prompt: `The cumulative frequency graph shows ${d.c.what}. How many are ${more ? 'more than' : 'at most'} $${fmt(d.bounds[k + 1]!)}$ ${d.c.unit}?`,
      figure: fig,
      parts: [numPart(more ? d.N - d.cf[k]! : d.cf[k]!)],
      hints: [`Go up from $${fmt(d.bounds[k + 1]!)}$ to the graph and across to the cumulative frequency axis.`, more ? `That is how many are at most $${fmt(d.bounds[k + 1]!)}$; subtract it from the total, $${d.N}$.` : 'The cumulative frequency counts every value up to that point.'],
      solution: more ? [`At $${fmt(d.bounds[k + 1]!)}$ the cumulative frequency is $${d.cf[k]}$.`, `More than $${fmt(d.bounds[k + 1]!)}$: $${d.N} - ${d.cf[k]} = ${d.N - d.cf[k]!}$`] : [`At $${fmt(d.bounds[k + 1]!)}$ the cumulative frequency is $${d.cf[k]}$.`],
    };
  }
  const tol = d.w / 5;
  if (dd === 2) {
    const m = readAt(d, d.N / 2);
    return {
      prompt: `The cumulative frequency graph shows ${d.c.what}. Use it to estimate the median.`,
      figure: fig,
      parts: [numPart(m, { tolerance: tol, exact: false, suffix: d.c.unit })],
      hints: [`There are $${d.N}$ values, so the median is at a cumulative frequency of $${d.N} \\div 2 = ${d.N / 2}$.`, `Go across from $${d.N / 2}$ on the cumulative frequency axis to the graph, then down to read the value.`],
      solution: [`Median: cumulative frequency $${d.N / 2}$.`, `Reading across and down gives about $${fmt(m, 1)}$ ${d.c.unit}.`],
    };
  }
  const q1 = readAt(d, d.N / 4);
  const q3 = readAt(d, (3 * d.N) / 4);
  return {
    prompt: `The cumulative frequency graph shows ${d.c.what}. Use it to estimate the lower quartile, the upper quartile and the interquartile range.`,
    figure: fig,
    parts: [numPart(q1, { tolerance: tol, exact: false, label: 'Lower quartile:' }), numPart(q3, { tolerance: tol, exact: false, label: 'Upper quartile:' }), numPart(q3 - q1, { tolerance: 2 * tol, exact: false, label: 'Interquartile range:' })],
    hints: [`The lower quartile is at a cumulative frequency of $\\frac{1}{4} \\times ${d.N} = ${d.N / 4}$, and the upper quartile at $\\frac{3}{4} \\times ${d.N} = ${(3 * d.N) / 4}$.`, 'Interquartile range $=$ upper quartile $-$ lower quartile.'],
    solution: [
      `Lower quartile: across from $${d.N / 4}$ and down, about $${fmt(q1, 1)}$.`,
      `Upper quartile: across from $${(3 * d.N) / 4}$ and down, about $${fmt(q3, 1)}$.`,
      `Interquartile range $\\approx ${fmt(q3, 1)} - ${fmt(q1, 1)} = ${fmt(q3 - q1, 1)}$`,
    ],
  };
}

export const FREQUENCY_SKILLS: SkillDef[] = [
  skill({ id: 'mx-frequency-tree', name: 'Frequency trees', description: 'Complete a frequency tree from given facts, counts, fractions or percentages', outcomes: ['FD1'], lessonId: 'mx-11-1', gen: frequencyTree }),
  skill({ id: 'mx-frequency-tree-probability', name: 'Probability from frequency trees', description: 'Find probabilities, including ones given a fact, from a frequency tree', outcomes: ['FD1'], lessonId: 'mx-11-1', gen: frequencyTreeProbability }),
  skill({ id: 'mx-histogram-density', name: 'Frequency density', description: 'Work out frequency densities for a histogram, and frequencies from its bars', outcomes: ['FD2'], lessonId: 'mx-11-2', gen: histogramDensity }),
  skill({ id: 'mx-histogram-read', name: 'Reading histograms', description: 'Find frequencies, totals and estimates from a histogram with unequal class widths', outcomes: ['FD2'], lessonId: 'mx-11-2', gen: histogramRead }),
  skill({ id: 'mx-cumulative-table', name: 'Cumulative frequency tables', description: 'Find running totals from a grouped frequency table, and the class that holds the median or a quartile', outcomes: ['FD3'], lessonId: 'mx-11-3', gen: cumulativeTable }),
  skill({ id: 'mx-cumulative-read', name: 'Cumulative frequency graphs', description: 'Read counts, the median, the quartiles and the interquartile range from a cumulative frequency graph', outcomes: ['FD3'], lessonId: 'mx-11-3', gen: cumulativeRead }),
];
