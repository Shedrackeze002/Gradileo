/** Math 30-2 Unit 1 — Set Theory and Logic (LR2, LR3). */
import { fixedChoice, mc, multi, numPart, part, skill } from '../../helpers.ts';
import type { GenOutput } from '../../helpers.ts';
import { isPrime } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { PlaneFigure, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Ava', 'Jayden', 'Harpreet', 'Lucas', 'Kiona', 'Mohammed', 'Elise', 'Darnell', 'Yuki', 'Rowan', 'Anika', 'Mateo', 'Sienna', 'Emeka', 'Talia',
  'Arjun', 'Maëlle', 'Connor', 'Layla', 'Nathaniel', 'Wren', 'Bao', 'Fiona', 'Ibrahim', 'Skye', 'Diego', 'Naomi', 'Kwame', 'Jessie', 'Parveen',
];

const PLACES = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater', 'Oakridge', 'Elmwood'];

const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
const range = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const isSq = (n: number) => n >= 0 && Number.isInteger(Math.sqrt(n));
const sortNum = (xs: number[]) => [...xs].sort((a, b) => a - b);

/** A set of numbers in LaTeX, sorted; the empty set as { }. */
const setTex = (xs: number[]) => (xs.length ? `\\{${sortNum(xs).join(', ')}\\}` : '\\{\\ \\}');
/** A set of words or letters in plain text. */
const setWords = (xs: string[]) => (xs.length ? `{${xs.join(', ')}}` : '{ }');

function union<T>(a: T[], b: T[]): T[] {
  return [...a, ...b.filter((x) => !a.includes(x))];
}
const inter = <T>(a: T[], b: T[]) => a.filter((x) => b.includes(x));
const diff = <T>(a: T[], b: T[]) => a.filter((x) => !b.includes(x));
const sameSet = <T>(a: T[], b: T[]) => a.length === b.length && a.every((x) => b.includes(x));

// ---------------------------------------------------------------------------
// Venn diagrams (drawn on a plane canvas: a rectangle for U, circles for the sets)
// ---------------------------------------------------------------------------

type P = [number, number];
export type Region = 'a' | 'b' | 'c' | 'ab' | 'ac' | 'bc' | 'abc' | 'n';
const r3 = (x: number) => Math.round(x * 1000) / 1000;

/** Approximate rendered width (px) of a 12px bold figure label. */
export function textWidth(t: string): number {
  let w = 0;
  for (const ch of t) w += ch === ' ' || ch === ',' || ch === '.' ? 3.5 : ch === '(' || ch === ')' ? 4.5 : /[A-Z]/.test(ch) ? 8 : 7.2;
  return w;
}

/** An invisible anchor point whose label is centred at (x, y). */
export function textAt(x: number, y: number, text: string, ppu: number): PlanePoint {
  const w = textWidth(text);
  return { x: r3(x - (8 + w / 2) / ppu), y: r3(y - 12.3 / ppu), label: text, color: 'muted', open: true };
}

function circlePts(c: P, r: number, n = 90): P[] {
  return Array.from({ length: n + 1 }, (_, i) => [r3(c[0] + r * Math.cos((2 * Math.PI * i) / n)), r3(c[1] + r * Math.sin((2 * Math.PI * i) / n))] as P);
}

interface VennLayout {
  w: number;
  h: number;
  centres: P[];
  r: number;
  /** Centre of each set label. */
  labels: P[];
  pos: Partial<Record<Region, P>>;
}

const VENN2: VennLayout = {
  w: 10,
  h: 6.5,
  centres: [[3.75, 3.1], [6.25, 3.1]],
  r: 2.35,
  labels: [[2.45, 5.95], [7.55, 5.95]],
  pos: { a: [2.55, 3.1], ab: [5, 3.1], b: [7.45, 3.1], n: [8.95, 1.0] },
};

const VENN3: VennLayout = {
  w: 10,
  h: 9,
  centres: [[3.85, 5.5], [6.15, 5.5], [5, 3.5]],
  r: 2.3,
  labels: [[1.75, 8.15], [8.25, 8.15], [2.6, 1.35]],
  pos: { a: [2.85, 6.1], b: [7.15, 6.1], c: [5, 2.3], ab: [5, 6.65], ac: [3.45, 3.9], bc: [6.55, 3.9], abc: [5, 4.85], n: [8.95, 1.0] },
};

export interface VennOpts {
  /** Two or three set labels (short words or letters). */
  sets: string[];
  /** Text in each region: a count, "?", or lines of elements. */
  regions?: Partial<Record<Region, string | string[]>>;
  /** Regions to hatch. */
  shade?: Region[];
  universal?: string;
  caption?: string;
}

function regionAt(p: P, L: VennLayout): Region {
  const code = ['a', 'b', 'c'].filter((_, i) => i < L.centres.length && Math.hypot(p[0] - L.centres[i][0], p[1] - L.centres[i][1]) < L.r).join('');
  return (code || 'n') as Region;
}

/** A Venn diagram for two or three sets inside a universal set. */
export function vennFigure(o: VennOpts): PlaneFigure {
  const L = o.sets.length === 2 ? VENN2 : VENN3;
  const ppu = 340 / L.w;
  const m = 0.2;
  const points: PlanePoint[] = [];
  const boxes: Array<{ x0: number; x1: number; y0: number; y1: number }> = [];
  const put = (x: number, y: number, text: string) => {
    const pt = textAt(x, y, text, ppu);
    points.push(pt);
    const hw = (textWidth(text) / 2 + 4) / ppu;
    boxes.push({ x0: x - hw, x1: x + hw, y0: y - 10 / ppu, y1: y + 10 / ppu });
    boxes.push({ x0: pt.x - 7 / ppu, x1: pt.x + 7 / ppu, y0: pt.y - 7 / ppu, y1: pt.y + 7 / ppu });
  };
  // Each label is drawn beside an invisible anchor dot that would knock a notch out of a circle it
  // touches, so nudge each label (or block of lines) until its anchors and text stay clear of the circles.
  const offLines = (p: P, px: number) => L.centres.every((c) => Math.abs(Math.hypot(p[0] - c[0], p[1] - c[1]) - L.r) > px / ppu);
  const lineY = (cy: number, n: number, j: number) => cy + ((n - 1) / 2 - j) * 0.5;
  const fits = (cx: number, cy: number, lines: string[], region: Region) =>
    lines.every((t, j) => {
      const y = lineY(cy, lines.length, j);
      const hw = (textWidth(t) / 2 + 2) / ppu;
      const hh = 8 / ppu;
      const anchor: P = [cx - (8 + textWidth(t) / 2) / ppu, y - 12.3 / ppu];
      const corners: P[] = [[cx - hw, y - hh], [cx + hw, y - hh], [cx - hw, y + hh], [cx + hw, y + hh]];
      return offLines(anchor, 7) && corners.every((p) => regionAt(p, L) === region && offLines(p, 2.5) && p[0] > m + 0.1 && p[0] < L.w - m - 0.1 && p[1] > m + 0.1 && p[1] < L.h - m - 0.1);
    });
  const place = (at: P, lines: string[], region: Region) => {
    let [x, y] = at;
    search: for (let rad = 0; rad <= 0.6; rad += 0.05) {
      for (let i = 0; i < (rad ? 16 : 1); i++) {
        const cx = at[0] + rad * Math.cos((Math.PI * i) / 8);
        const cy = at[1] + rad * Math.sin((Math.PI * i) / 8);
        if (fits(cx, cy, lines, region)) {
          [x, y] = [cx, cy];
          break search;
        }
      }
    }
    lines.forEach((t, j) => put(x, lineY(y, lines.length, j), t));
  };
  put(0.75, L.h - 0.62, o.universal ?? 'U');
  o.sets.forEach((s, i) => place(L.labels[i], [s], 'n'));
  for (const [k, v] of Object.entries(o.regions ?? {}) as Array<[Region, string | string[] | undefined]>) {
    if (v !== undefined) place(L.pos[k]!, Array.isArray(v) ? v : [v], k);
  }
  const segments: PlaneSegment[] = [];
  if (o.shade?.length) {
    const want = new Set(o.shade);
    const ok = (p: P) =>
      p[1] > m + 0.05 &&
      p[1] < L.h - m - 0.05 &&
      want.has(regionAt(p, L)) &&
      L.centres.every((c) => Math.abs(Math.hypot(p[0] - c[0], p[1] - c[1]) - L.r) > 0.07) &&
      !boxes.some((b) => p[0] > b.x0 && p[0] < b.x1 && p[1] > b.y0 && p[1] < b.y1);
    // Hatching: lines x - y = k, sampled finely and split wherever they leave the shaded regions.
    for (let k = -L.h; k <= L.w; k += 0.42) {
      let start: P | null = null;
      let last: P | null = null;
      const flush = () => {
        if (start && last && Math.hypot(last[0] - start[0], last[1] - start[1]) > 0.08) segments.push({ from: [r3(start[0]), r3(start[1])], to: [r3(last[0]), r3(last[1])], color: 'accent' });
        start = null;
        last = null;
      };
      for (let x = m + 0.05; x <= L.w - m - 0.05; x += 0.02) {
        const p: P = [x, x - k];
        if (ok(p)) {
          if (!start) start = p;
          last = p;
        } else flush();
      }
      flush();
    }
  }
  const polylines: NonNullable<PlaneFigure['polylines']> = [
    { points: [[m, m], [L.w - m, m], [L.w - m, L.h - m], [m, L.h - m], [m, m]], color: 'muted' },
    ...L.centres.map((c) => ({ points: circlePts(c, L.r), color: 'brand' as const })),
  ];
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: L.w, yMin: 0, yMax: L.h, step: L.w },
    hideTickLabels: true,
    polylines,
    ...(segments.length ? { segments } : {}),
    points,
    ...(o.caption ? { caption: o.caption } : {}),
  };
}

/** Split a list of elements into short lines for a Venn region. */
function chunk(xs: Array<number | string>, per: number): string[] {
  const out: string[] = [];
  for (let i = 0; i < xs.length; i += per) out.push(xs.slice(i, i + per).join(', '));
  return out;
}

// ---------------------------------------------------------------------------
// Lesson 1.1 — Sets and subsets
// ---------------------------------------------------------------------------

interface NumRule {
  name: string;
  test: (x: number) => boolean;
}

function numRules(N: number): NumRule[] {
  const out: NumRule[] = [];
  for (const k of [2, 3, 4, 5, 6, 7, 8, 9]) out.push({ name: `multiples of ${k}`, test: (x) => x % k === 0 });
  for (const m of [12, 16, 18, 20, 24, 28, 30, 36]) if (m <= N) out.push({ name: `factors of ${m}`, test: (x) => m % x === 0 });
  out.push({ name: 'prime numbers', test: isPrime });
  out.push({ name: 'perfect squares', test: isSq });
  out.push({ name: 'even numbers', test: (x) => x % 2 === 0 });
  out.push({ name: 'odd numbers', test: (x) => x % 2 === 1 });
  return out;
}

const EMPTY_SETS = [
  'the set of even prime numbers greater than 2',
  'the set of months of the year with 32 days',
  'the set of whole numbers between 4 and 5',
  'the set of perfect squares between 50 and 60',
  'the set of multiples of 10 that end in the digit 5',
  'the set of days of the week that begin with the letter Q',
  'the set of odd numbers that are divisible by 2',
  'the set of triangles with four sides',
  'the set of natural numbers less than 1',
];

const NONEMPTY_SETS = [
  { md: 'the set $\\{0\\}$', why: '$\\{0\\}$ has one element, the number 0' },
  { md: 'the set of even prime numbers', why: 'it contains 2' },
  { md: 'the set of months of the year with 28 days', why: 'every month has at least 28 days' },
  { md: 'the set of perfect squares between 60 and 70', why: 'it contains 64' },
  { md: 'the set of days of the week that begin with the letter T', why: 'it contains Tuesday and Thursday' },
  { md: 'the set of whole numbers less than 1', why: 'it contains 0' },
  { md: 'the set of planets in our solar system that have rings', why: 'it contains Saturn' },
  { md: 'the set of multiples of 7 between 20 and 30', why: 'it contains 21 and 28' },
];

const INFINITE_SETS = [
  'the set of natural numbers greater than 1000',
  'the set of multiples of 7',
  'the set of real numbers between 0 and 1',
  'the set of even integers',
  'the set of fractions between $\\frac{1}{2}$ and $\\frac{3}{4}$',
  'the set of negative integers',
];

const FINITE_SETS = [
  'the set of grains of sand on a beach',
  'the set of people living in Canada',
  'the set of factors of 1 000 000',
  'the set of whole numbers less than one billion',
  'the set of letters in the English alphabet',
  'the set of integers between $-500$ and $500$',
  'the set of hairs on all the people in a large city',
];

/** A random subset of size k from xs, as a sorted list. */
const pickSub = (rng: Rng, xs: number[], k: number) => sortNum(rng.sample(xs, k));

function setsD1(rng: Rng): GenOutput {
  const kind = rng.pick(['count', 'subset', 'empty', 'infinite', 'element'] as const);
  if (kind === 'empty') {
    const correct = rng.pick(EMPTY_SETS);
    const ds = rng.sample(NONEMPTY_SETS, 3);
    return {
      prompt: 'Which of these is the **empty set**?',
      parts: [part(mc(rng, cap(correct), ds.map((d) => cap(d.md))))],
      hints: ['The empty set has no elements at all.', 'For each set, try to find one element. If you can, the set is not empty.'],
      solution: [
        ...ds.map((d) => `${cap(d.md)} is not empty: ${d.why}.`),
        `${cap(correct)} has no elements, so it is the empty set, written $\\{\\ \\}$ or $\\varnothing$.`,
        `The answer is ${correct}.`,
      ],
    };
  }
  if (kind === 'infinite') {
    const correct = rng.pick(INFINITE_SETS);
    const ds = rng.sample(FINITE_SETS, 3);
    return {
      prompt: 'Which of these sets is **infinite**?',
      parts: [part(mc(rng, cap(correct), ds.map(cap)))],
      hints: ['A finite set could be counted, even if counting would take a very long time.', 'An infinite set goes on forever: there is no last element and no end to the count.'],
      solution: [
        'Each of the other sets is very large but finite: its elements could be counted, and the count would end.',
        `${cap(correct)} never runs out of elements, so it is infinite.`,
        `The answer is ${correct}.`,
      ],
    };
  }
  const N = rng.int(15, 30);
  const U = range(1, N);
  const rule = rng.pick(numRules(N).filter((r) => {
    const n = U.filter(r.test).length;
    return n >= 4 && n <= 12;
  }));
  const A = U.filter(rule.test);
  const notA = diff(U, A);
  const primeNote = rule.name === 'prime numbers' ? ' (Remember that 1 is not a prime number.)' : '';
  const intro = `Let $U = \\{1, 2, 3, \\ldots, ${N}\\}$, and let $A$ be the set of ${rule.name} in $U$.`;
  if (kind === 'count') {
    return {
      prompt: `${intro} What is $n(A)$?`,
      parts: [numPart(A.length, { label: '$n(A) =$' })],
      hints: ['$n(A)$ is the number of elements in set $A$.', `List the ${rule.name} from 1 to ${N} in order, then count them.`],
      solution: [`List the elements of $A$:${primeNote} $A = ${setTex(A)}$`, `Count them: there are $${A.length}$ elements.`, `$n(A) = ${A.length}$`],
    };
  }
  if (kind === 'subset') {
    const k = rng.int(2, 3);
    const correct = pickSub(rng, A, k);
    const outsider = rng.pick(notA);
    const d1 = sortNum([...pickSub(rng, A, k - 1), outsider]);
    const d2 = pickSub(rng, notA, k);
    const d3 = sortNum([...A, rng.pick(notA)]);
    return {
      prompt: `${intro} Which set is a subset of $A$?`,
      parts: [part(mc(rng, `$${setTex(correct)}$`, [d1, d2, d3].map((s) => `$${setTex(s)}$`)))],
      hints: ['A set $B$ is a subset of $A$ when **every** element of $B$ is also an element of $A$.', `First list $A$, then check each element of each choice.`],
      solution: [
        `List $A$:${primeNote} $A = ${setTex(A)}$`,
        `$${setTex(d1)}$ is not a subset, because $${outsider} \\notin A$. A set that contains numbers outside $A$, or more elements than $A$, cannot be a subset of $A$.`,
        `Every element of $${setTex(correct)}$ is in $A$.`,
        `So $${setTex(correct)} \\subset A$.`,
      ],
    };
  }
  // element: which statement is true?
  const inA = rng.sample(A, 2);
  const outA = rng.sample(notA, 2);
  const correct = rng.chance(0.5) ? `$${inA[0]} \\in A$` : `$${outA[0]} \\notin A$`;
  const ds = [`$${outA[1]} \\in A$`, `$${inA[1]} \\notin A$`, `$n(A) = ${A.length + rng.pick([-1, 1])}$`, `$${setTex([inA[0]])} \\in A$`];
  return {
    prompt: `${intro} Which statement is true?`,
    parts: [part(mc(rng, correct, rng.shuffle(ds).slice(0, 3)))],
    hints: ['The symbol $\\in$ means "is an element of" and $\\notin$ means "is not an element of".', 'List the elements of $A$ first, then check each statement.'],
    solution: [
      `List $A$:${primeNote} $A = ${setTex(A)}$, so $n(A) = ${A.length}$.`,
      `$${inA[0]}$ is in the list and $${outA[0]}$ is not.`,
      `$${setTex([inA[0]])}$ is a set, not a number, so it is a subset of $A$ rather than an element of $A$.`,
      `The true statement is ${correct}.`,
    ],
  };
}

const DOMAIN_TEXT = '($N$ is the natural numbers $1, 2, 3, \\ldots$, $W$ is the whole numbers $0, 1, 2, \\ldots$ and $I$ is the integers.)';

function setsD2(rng: Rng): GenOutput {
  const kind = rng.pick(['listing', 'count', 'relation'] as const);
  if (kind === 'listing') {
    const dom = rng.pick(['N', 'W', 'I'] as const);
    for (;;) {
      const lo = dom === 'N' ? rng.int(1, 6) : dom === 'W' ? rng.int(0, 3) : rng.int(-6, -1);
      const hi = lo + rng.int(4, 6);
      const incLo = rng.chance(0.5);
      const incHi = rng.chance(0.5);
      const inDom = (x: number) => (dom === 'N' ? x >= 1 : dom === 'W' ? x >= 0 : true);
      const build = (a: boolean, b: boolean, d = inDom) => range(lo - 1, hi + 1).filter((x) => d(x) && (a ? x >= lo : x > lo) && (b ? x <= hi : x < hi));
      const correct = build(incLo, incHi);
      const variants = [build(!incLo, incHi), build(incLo, !incHi), build(!incLo, !incHi)];
      if (dom === 'I') variants.push(build(incLo, incHi, (x) => x >= 1));
      const ds = rng.shuffle(variants.filter((v) => !sameSet(v, correct)));
      if (ds.length < 3) continue;
      const lt = (inc: boolean) => (inc ? '\\le' : '<');
      const def = `\\{x \\mid ${lo} ${lt(incLo)} x ${lt(incHi)} ${hi},\\ x \\in ${dom}\\}`;
      return {
        prompt: `Which list shows the elements of $A = ${def}$? ${DOMAIN_TEXT}`,
        parts: [part(mc(rng, `$${setTex(correct)}$`, ds.slice(0, 3).map((s) => `$${setTex(s)}$`)))],
        hints: ['Read the set-builder notation as "the set of all $x$ such that ...".', `Check each endpoint: $<$ leaves the endpoint out and $\\le$ includes it. Then keep only the numbers in $${dom}$.`],
        solution: [
          `$x$ is ${incLo ? `at least $${lo}$` : `greater than $${lo}$`} and ${incHi ? `at most $${hi}$` : `less than $${hi}$`}, and $x$ must be in $${dom}$${dom === 'I' ? ' (negative numbers and 0 are allowed)' : ''}.`,
          `${incLo ? `$${lo}$ is included` : `$${lo}$ is not included`}; ${incHi ? `$${hi}$ is included` : `$${hi}$ is not included`}.`,
          `$A = ${setTex(correct)}$`,
        ],
      };
    }
  }
  if (kind === 'count') {
    const t = rng.int(0, 3);
    let def: string;
    let els: number[];
    let how: string;
    if (t === 0) {
      const k = rng.int(3, 9);
      const M = rng.int(30, 90);
      def = `\\{x \\mid x = ${k}n,\\ n \\in N,\\ x \\le ${M}\\}`;
      els = range(1, Math.floor(M / k)).map((n) => k * n);
      how = `The elements are the multiples of $${k}$ from $${k}$ up to $${M}$. The largest is $${k} \\times ${els.length} = ${k * els.length}$, since $${k} \\times ${els.length + 1} = ${k * (els.length + 1)} > ${M}$.`;
    } else if (t === 1) {
      const M = rng.int(12, 45);
      def = `\\{x \\mid x = 2n + 1,\\ n \\in W,\\ x < ${M}\\}`;
      els = range(0, M).map((n) => 2 * n + 1).filter((x) => x < M);
      how = `Substitute $n = 0, 1, 2, \\ldots$: the elements are the odd numbers $1, 3, 5, \\ldots$ that are less than $${M}$; the largest is $${els[els.length - 1]}$.`;
    } else if (t === 2) {
      const M = rng.pick([10, 17, 20, 26, 30, 37, 40, 50, 65]);
      def = `\\{x \\mid x^2 < ${M},\\ x \\in I\\}`;
      els = range(-10, 10).filter((x) => x * x < M);
      const top = els[els.length - 1];
      how = `$${top}^2 = ${top * top} < ${M}$ but $${top + 1}^2 = ${(top + 1) ** 2} \\ge ${M}$, so $x$ runs from $-${top}$ to $${top}$, including $0$.`;
    } else {
      const a = rng.int(2, 9);
      const b = rng.int(2, 12);
      def = `\\{x \\mid -${a} \\le x < ${b},\\ x \\in I\\}`;
      els = range(-a, b - 1);
      how = `The integers from $-${a}$ up to $${b - 1}$ (${b} is not included): $${a}$ negative integers, $0$, and $${b - 1}$ positive integers.`;
    }
    return {
      prompt: `How many elements are in the set $A = ${def}$? ${DOMAIN_TEXT}`,
      parts: [numPart(els.length, { label: '$n(A) =$' })],
      hints: ['Read the set-builder notation carefully: what kind of number is $x$, and what are its limits?', 'List the first few and last few elements, then count.'],
      solution: [how, els.length <= 20 ? `$A = ${setTex(els)}$` : `$A = \\{${els.slice(0, 3).join(', ')}, \\ldots, ${els[els.length - 1]}\\}$`, `$n(A) = ${els.length}$`],
    };
  }
  // Relationship between two sets.
  const want = rng.pick(['AB', 'BA', 'disjoint', 'overlap'] as const);
  for (let tries = 0; ; tries++) {
    const N = rng.int(20, 36);
    const U = range(1, N);
    const [r1, r2] = rng.sample(numRules(N), 2);
    const A = U.filter(r1.test);
    const B = U.filter(r2.test);
    if (A.length < 2 || B.length < 2 || A.length > 14 || B.length > 14 || sameSet(A, B)) continue;
    const I = inter(A, B);
    const rel = I.length === 0 ? 'disjoint' : I.length === A.length ? 'AB' : I.length === B.length ? 'BA' : 'overlap';
    if (rel !== want && tries < 400) continue;
    const opts = [
      '$A \\subset B$',
      '$B \\subset A$',
      '$A$ and $B$ are disjoint',
      'None of these: $A$ and $B$ share some elements, but neither is a subset of the other',
    ];
    const idx = ['AB', 'BA', 'disjoint', 'overlap'].indexOf(rel);
    const why =
      rel === 'AB'
        ? 'Every element of $A$ is also in $B$, so $A \\subset B$.'
        : rel === 'BA'
          ? 'Every element of $B$ is also in $A$, so $B \\subset A$.'
          : rel === 'disjoint'
            ? 'The two sets have no elements in common, so they are disjoint.'
            : `They share $${setTex(I)}$, but $${diff(A, B)[0]} \\in A$ is not in $B$ and $${diff(B, A)[0]} \\in B$ is not in $A$.`;
    return {
      prompt: `Let $U = \\{1, 2, 3, \\ldots, ${N}\\}$. Let $A$ be the set of ${r1.name} in $U$, and let $B$ be the set of ${r2.name} in $U$. Which statement is true?`,
      parts: [part(fixedChoice(opts, idx))],
      hints: ['List the elements of $A$ and of $B$.', 'Check whether every element of one set is in the other, and whether they share any elements at all.'],
      solution: [`$A = ${setTex(A)}$`, `$B = ${setTex(B)}$`, why, `The answer is: ${opts[idx]}.`],
    };
  }
}

function setsD3(rng: Rng): GenOutput {
  if (rng.chance(0.4)) {
    const n = rng.int(3, 6);
    const pool = rng.pick([
      { what: 'toppings', els: ['ham', 'olives', 'onions', 'peppers', 'pineapple', 'spinach'] },
      { what: 'colours', els: ['red', 'blue', 'green', 'yellow', 'white', 'black'] },
      { what: 'letters', els: ['a', 'b', 'c', 'd', 'e', 'f'] },
      { what: 'numbers', els: ['2', '3', '5', '7', '11', '13'] },
    ]);
    const els = pool.els.slice(0, n);
    const special = rng.pick(els);
    const mode = rng.pick(['all', 'all', 'contains', 'proper'] as const);
    const total = 2 ** n;
    const value = mode === 'all' ? total : mode === 'proper' ? total - 1 : total / 2;
    const q =
      mode === 'all'
        ? 'How many subsets does $A$ have, including the empty set and $A$ itself?'
        : mode === 'proper'
          ? 'How many subsets of $A$ are **not** equal to $A$ itself? (Include the empty set.)'
          : `How many subsets of $A$ contain ${special}?`;
    const list3 = n === 3 ? ` For example, the subsets of $A$ are: { }, ${els.map((e) => `{${e}}`).join(', ')}, {${els[0]}, ${els[1]}}, {${els[0]}, ${els[2]}}, {${els[1]}, ${els[2]}} and {${els.join(', ')}}.` : '';
    return {
      prompt: `Let A = ${setWords(els)}. ${q}`,
      parts: [numPart(value, { label: 'Subsets:' })],
      hints: [
        'Build a subset by deciding, for each element, whether it is in or out.',
        `Each of the $${n}$ elements has 2 choices (in or out), so there are $2^{${n}}$ subsets in all.`,
      ],
      solution: [
        `For each of the $${n}$ elements, there are 2 choices: in the subset or not. So $A$ has $2^{${n}} = ${total}$ subsets, from the empty set up to $A$ itself.${list3}`,
        mode === 'all'
          ? 'Both the empty set and $A$ itself are counted.'
          : mode === 'proper'
            ? `Leave out the one subset that is all of $A$: $${total} - 1 = ${value}$.`
            : `${cap(special)} must be in, so only the other $${n - 1}$ elements have 2 choices: $2^{${n - 1}} = ${value}$. (This is half of all ${total} subsets.)`,
        `The answer is $${value}$.`,
      ],
    };
  }
  // Select all true statements.
  for (;;) {
    const N = rng.int(12, 20);
    const U = range(1, N);
    const rules = rng.sample(numRules(N), 3);
    const [A, B, C] = rules.map((r) => U.filter(r.test));
    if ([A, B, C].some((s) => s.length < 2 || s.length > 10)) continue;
    if (sameSet(A, B) || sameSet(B, C) || sameSet(A, C)) continue;
    const sub = (x: number[], y: number[]) => x.every((e) => y.includes(e));
    const pool: Array<{ md: string; correct: boolean; why: string }> = [];
    const S: Record<string, number[]> = { A, B, C };
    for (const [p, q] of [['A', 'B'], ['B', 'A'], ['A', 'C'], ['C', 'A'], ['B', 'C'], ['C', 'B']]) {
      const t = sub(S[p], S[q]);
      const out = diff(S[p], S[q]);
      pool.push({ md: `$${p} \\subset ${q}$`, correct: t, why: t ? `every element of $${p}$ is in $${q}$` : `$${out[0]} \\in ${p}$ but $${out[0]} \\notin ${q}$` });
    }
    for (const [p, q] of [['A', 'B'], ['A', 'C'], ['B', 'C']]) {
      const I = inter(S[p], S[q]);
      pool.push({ md: `$${p}$ and $${q}$ are disjoint`, correct: I.length === 0, why: I.length === 0 ? 'they have no elements in common' : `both contain $${I[0]}$` });
    }
    const x = rng.pick(U);
    const nm = rng.pick(['A', 'B', 'C']);
    pool.push({ md: `$${x} \\in ${nm}$`, correct: S[nm].includes(x), why: S[nm].includes(x) ? `$${x}$ is in $${nm}$` : `$${x}$ is not in $${nm}$` });
    const nm2 = rng.pick(['A', 'B', 'C']);
    const k = S[nm2].length + rng.pick([0, 0, 1, -1]);
    pool.push({ md: `$n(${nm2}) = ${k}$`, correct: k === S[nm2].length, why: `$n(${nm2}) = ${S[nm2].length}$` });
    pool.push({ md: `$\\varnothing \\subset ${rng.pick(['A', 'B', 'C'])}$`, correct: true, why: 'the empty set is a subset of every set' });
    pool.push({ md: `$U \\subset ${rng.pick(['A', 'B', 'C'])}$`, correct: false, why: 'the universal set has elements that are not in this set' });
    const chosen = rng.sample(pool, 5);
    const nTrue = chosen.filter((c) => c.correct).length;
    if (nTrue < 1 || nTrue > 4) continue;
    return {
      prompt: `Let $U = \\{1, 2, 3, \\ldots, ${N}\\}$. In $U$, let $A$ be the set of ${rules[0].name}, $B$ the set of ${rules[1].name}, and $C$ the set of ${rules[2].name}. Select **all** the true statements.`,
      parts: [part(multi(rng, chosen.map((c) => ({ md: c.md, correct: c.correct }))))],
      hints: ['List the elements of $A$, $B$ and $C$ first.', '$P \\subset Q$ needs every element of $P$ to be in $Q$. Disjoint sets share no elements. The empty set is a subset of every set.'],
      solution: [
        `$A = ${setTex(A)}$, $B = ${setTex(B)}$, $C = ${setTex(C)}$`,
        ...chosen.map((c) => `${c.md}: ${c.correct ? 'true' : 'false'}, because ${c.why}.`),
        `The true statements are: ${chosen.filter((c) => c.correct).map((c) => c.md).join(', ')}.`,
      ],
    };
  }
}

const setsBasics = skill({
  id: 'm302-sets-basics',
  name: 'Sets, elements and subsets',
  description: 'Describe sets in words, lists and set-builder notation; identify elements, subsets, the empty set, and finite and infinite sets; find n(A).',
  outcomes: ['LR2'],
  lessonId: 'm302-1-1',
  gen: (rng, d) => (d === 1 ? setsD1(rng) : d === 2 ? setsD2(rng) : setsD3(rng)),
});

// ---------------------------------------------------------------------------
// Lesson 1.2 — Set operations
// ---------------------------------------------------------------------------

const PLACE_WORDS = ['CALGARY', 'EDMONTON', 'BANFF', 'JASPER', 'CANMORE', 'OKOTOKS', 'BROOKS', 'CAMROSE', 'LEDUC', 'AIRDRIE', 'OLDS', 'DRUMHELLER', 'COCHRANE', 'HINTON', 'STRATHMORE'];
const letters = (w: string) => [...new Set(w.split(''))];

const CLUBS = [
  ['drama club', 'robotics club'],
  ['school band', 'volleyball team'],
  ['student council', 'yearbook committee'],
  ['chess club', 'debate team'],
  ['ski club', 'art club'],
];

interface Expr2 {
  tex: string;
  regions: Region[];
}

const EXPR2: Expr2[] = [
  { tex: 'A \\cup B', regions: ['a', 'ab', 'b'] },
  { tex: 'A \\cap B', regions: ['ab'] },
  { tex: 'A \\setminus B', regions: ['a'] },
  { tex: 'B \\setminus A', regions: ['b'] },
  { tex: "A'", regions: ['b', 'n'] },
  { tex: "B'", regions: ['a', 'n'] },
  { tex: "(A \\cup B)'", regions: ['n'] },
  { tex: "(A \\cap B)'", regions: ['a', 'b', 'n'] },
  { tex: "A' \\cap B", regions: ['b'] },
  { tex: "A \\cup B'", regions: ['a', 'ab', 'n'] },
];

const EXPR3: Expr2[] = [
  { tex: 'A \\cap B \\cap C', regions: ['abc'] },
  { tex: '(A \\cap B) \\setminus C', regions: ['ab'] },
  { tex: 'A \\setminus (B \\cup C)', regions: ['a'] },
  { tex: '(A \\cup B) \\cap C', regions: ['ac', 'bc', 'abc'] },
  { tex: 'A \\cap (B \\cup C)', regions: ['ab', 'ac', 'abc'] },
  { tex: "(A \\cup B \\cup C)'", regions: ['n'] },
  { tex: 'C \\setminus (A \\cup B)', regions: ['c'] },
  { tex: '(A \\cup B) \\setminus C', regions: ['a', 'b', 'ab'] },
  { tex: 'A \\cup (B \\cap C)', regions: ['a', 'ab', 'ac', 'abc', 'bc'] },
  { tex: '(A \\cap B) \\cup C', regions: ['ab', 'abc', 'c', 'ac', 'bc'] },
  { tex: '(B \\cap C) \\setminus A', regions: ['bc'] },
  { tex: "A' \\cap B", regions: ['b', 'bc'] },
  { tex: "(A \\cup C) \\cap B'", regions: ['a', 'ac', 'c'] },
  { tex: "(A \\cap C)'", regions: ['a', 'b', 'c', 'ab', 'bc', 'n'] },
];

const sameRegions = (x: Region[], y: Region[]) => x.length === y.length && x.every((r) => y.includes(r));

/** How to read a region list in words (for solutions). */
const REGION_WORDS: Record<Region, string> = {
  a: 'only $A$',
  b: 'only $B$',
  c: 'only $C$',
  ab: '$A$ and $B$ but not $C$',
  ac: '$A$ and $C$ but not $B$',
  bc: '$B$ and $C$ but not $A$',
  abc: 'all three sets',
  n: 'none of the sets',
};
const REGION_WORDS2: Partial<Record<Region, string>> = { a: 'only $A$', b: 'only $B$', ab: 'both $A$ and $B$', n: 'neither set' };

function exprMeaning(e: Expr2, three: boolean): string {
  const w = three ? REGION_WORDS : REGION_WORDS2;
  return e.regions.map((r) => w[r]).join('; ');
}

/** Elements of U assigned to regions so that every region gets at least `min` elements. */
function assignRegions(rng: Rng, U: number[], regions: Region[], min = 1): Record<Region, number[]> {
  for (;;) {
    const out = Object.fromEntries(regions.map((r) => [r, [] as number[]])) as Record<Region, number[]>;
    for (const x of rng.shuffle(U)) out[rng.pick(regions)].push(x);
    if (regions.every((r) => out[r].length >= min)) {
      for (const r of regions) out[r] = sortNum(out[r]);
      return out;
    }
  }
}

function opsD1(rng: Rng): GenOutput {
  const kind = rng.pick(['numbers', 'clubs', 'letters'] as const);
  const op = rng.pick(['union', 'inter', 'count'] as const);
  let A: Array<number | string>;
  let B: Array<number | string>;
  let intro: string;
  let show: (s: Array<number | string>) => string;
  if (kind === 'numbers') {
    for (;;) {
      const N = rng.int(10, 20);
      const a = pickSub(rng, range(1, N), rng.int(4, 6));
      const b = pickSub(rng, range(1, N), rng.int(4, 6));
      const I = inter(a, b);
      if (I.length < 1 || I.length > 3) continue;
      A = a;
      B = b;
      break;
    }
    intro = `Let $A = ${setTex(A as number[])}$ and $B = ${setTex(B as number[])}$.`;
    show = (s) => `$${setTex(s as number[])}$`;
  } else if (kind === 'clubs') {
    const [c1, c2] = rng.pick(CLUBS);
    for (;;) {
      const people = rng.sample(NAMES, 8);
      const a = people.slice(0, rng.int(3, 5));
      const nShared = rng.int(1, 2);
      const b = [...rng.sample(a, nShared), ...people.slice(5, 5 + rng.int(2, 3))];
      if (b.length < 3) continue;
      A = a;
      B = rng.shuffle(b);
      break;
    }
    intro = `Set $A$ is the members of the ${c1}: ${setWords(A as string[])}. Set $B$ is the members of the ${c2}: ${setWords(B as string[])}.`;
    show = (s) => setWords(s as string[]);
  } else {
    for (;;) {
      const [w1, w2] = rng.sample(PLACE_WORDS, 2);
      const a = letters(w1);
      const b = letters(w2);
      const I = inter(a, b);
      if (I.length < 1 || I.length > 4 || a.length > 7 || b.length > 7 || !diff(a, b).length || !diff(b, a).length) continue;
      A = a;
      B = b;
      intro = `Let $A$ be the set of letters in ${w1} and $B$ the set of letters in ${w2}. So A = ${setWords(a)} and B = ${setWords(b)}.`;
      break;
    }
    show = (s) => setWords(s as string[]);
  }
  const U = union(A, B);
  const I = inter(A, B);
  const sym = union(diff(A, B), diff(B, A));
  const sort = (s: Array<number | string>) => (kind === 'numbers' ? sortNum(s as number[]) : s);
  if (op === 'count') {
    return {
      prompt: `${intro} What is $n(A \\cup B)$?`,
      parts: [numPart(U.length, { label: '$n(A \\cup B) =$' })],
      hints: ['$A \\cup B$ (the union) contains every element that is in $A$, in $B$, or in both.', 'List each element only once, even if it is in both sets.'],
      solution: [
        `$A \\cup B$ = ${show(sort(U))}`,
        `The shared element${I.length > 1 ? 's' : ''} ${show(sort(I))} ${I.length > 1 ? 'are' : 'is'} listed only once.`,
        `$n(A \\cup B) = ${U.length}$`,
      ],
    };
  }
  if (op === 'union') {
    return {
      prompt: `${intro} What is $A \\cup B$?`,
      parts: [part(mc(rng, show(sort(U)), [show(sort(I)), show(sort(sym)), show(sort(diff(A, B))), show(sort(A))]))],
      hints: ['The union $A \\cup B$ contains every element that is in $A$ **or** in $B$ (or both).', 'Start with all of $A$, then add the elements of $B$ that are not already listed.'],
      solution: [`Start with $A$, then add the elements of $B$ that are not in $A$: ${show(sort(diff(B, A)))}.`, `The shared element${I.length > 1 ? 's' : ''} ${show(sort(I))} ${I.length > 1 ? 'are' : 'is'} listed once.`, `$A \\cup B$ = ${show(sort(U))}`],
    };
  }
  return {
    prompt: `${intro} What is $A \\cap B$?`,
    parts: [part(mc(rng, show(sort(I)), [show(sort(U)), show(sort(diff(A, B))), show(sort(diff(B, A))), show(sort(sym))]))],
    hints: ['The intersection $A \\cap B$ contains only the elements that are in **both** $A$ and $B$.', 'Go through $A$ one element at a time and keep it only if it is also in $B$.'],
    solution: [`Check each element of $A$: keep it only if it is also in $B$.`, `$A \\cap B$ = ${show(sort(I))}`],
  };
}

function opsD2(rng: Rng): GenOutput {
  const N = rng.int(10, 15);
  const U = range(1, N);
  const reg = assignRegions(rng, U, ['a', 'ab', 'b', 'n'], 2);
  const A = sortNum([...reg.a, ...reg.ab]);
  const B = sortNum([...reg.b, ...reg.ab]);
  const of = (e: Expr2) => sortNum(e.regions.flatMap((r) => reg[r]));
  const targets = EXPR2.filter((e) => e.tex !== 'A \\cup B' && e.tex !== 'A \\cap B');
  const target = rng.pick(targets);
  const ans = of(target);
  const ds = rng.shuffle(EXPR2.filter((e) => !sameRegions(e.regions, target.regions))).map(of);
  const useFig = rng.chance(0.5);
  const intro = useFig
    ? `The Venn diagram shows the universal set $U = \\{1, 2, 3, \\ldots, ${N}\\}$ and two sets $A$ and $B$.`
    : `Let $U = \\{1, 2, 3, \\ldots, ${N}\\}$, $A = ${setTex(A)}$ and $B = ${setTex(B)}$.`;
  const figure = useFig ? vennFigure({ sets: ['A', 'B'], regions: { a: chunk(reg.a, 2), ab: chunk(reg.ab, 2), b: chunk(reg.b, 2), n: chunk(reg.n, 3) } }) : undefined;
  const asNum = rng.chance(0.25);
  const steps = [
    useFig ? `From the diagram, $A = ${setTex(A)}$ and $B = ${setTex(B)}$.` : `Sort the elements of $U$ into regions: only $A$: $${setTex(reg.a)}$; both: $${setTex(reg.ab)}$; only $B$: $${setTex(reg.b)}$; neither: $${setTex(reg.n)}$.`,
    `$${target.tex}$ is the elements in ${exprMeaning(target, false)}.`,
    `$${target.tex} = ${setTex(ans)}$`,
  ];
  if (asNum) {
    return {
      prompt: `${intro} What is $n(${target.tex})$?`,
      figure,
      parts: [numPart(ans.length, { label: `$n(${target.tex}) =$` })],
      hints: ["$A'$ (the complement) is everything in $U$ that is not in $A$. $A \\setminus B$ (the difference) is the elements of $A$ that are not in $B$.", 'List the set first, then count its elements.'],
      solution: [...steps, `$n(${target.tex}) = ${ans.length}$`],
    };
  }
  return {
    prompt: `${intro} What is $${target.tex}$?`,
    figure,
    parts: [part(mc(rng, `$${setTex(ans)}$`, ds.map((s) => `$${setTex(s)}$`)))],
    hints: ["$A'$ (the complement of $A$) is everything in $U$ that is not in $A$. $A \\setminus B$ (the difference) is the elements of $A$ that are not in $B$.", 'Work inside the brackets first, and use the regions of the Venn diagram: only $A$, both, only $B$, neither.'],
    solution: steps,
  };
}

function opsD3(rng: Rng): GenOutput {
  const kind = rng.pick(['shade', 'shade', 'list', 'count'] as const);
  if (kind === 'shade') {
    const three = rng.chance(0.65);
    const bank = three ? EXPR3 : EXPR2;
    const target = rng.pick(bank);
    const ds = rng.shuffle(bank.filter((e) => !sameRegions(e.regions, target.regions)));
    // Prefer distractors that share some regions with the answer (closer mistakes).
    ds.sort((x, y) => Number(y.regions.some((r) => target.regions.includes(r))) - Number(x.regions.some((r) => target.regions.includes(r))));
    return {
      prompt: 'Which expression describes the shaded region of the Venn diagram?',
      figure: vennFigure({ sets: three ? ['A', 'B', 'C'] : ['A', 'B'], shade: target.regions }),
      parts: [part(mc(rng, `$${target.tex}$`, ds.slice(0, 3).map((e) => `$${e.tex}$`)))],
      hints: ['Describe the shaded part in words first: which sets is it inside, and which is it outside?', '$\\cup$ means "or", $\\cap$ means "and", $\\setminus$ means "but not", and a prime ($\'$) means "not in".'],
      solution: [
        `The shaded region is the part in: ${exprMeaning(target, three)}.`,
        ...ds.slice(0, 1).map((e) => `For comparison, $${e.tex}$ would be ${exprMeaning(e, three)}, which is a different region.`),
        `So the shaded region is $${target.tex}$.`,
      ],
    };
  }
  // Three sets with elements in the diagram.
  const regs: Region[] = ['a', 'b', 'c', 'ab', 'ac', 'bc', 'abc', 'n'];
  const N = rng.int(14, 18);
  const U = range(1, N);
  let reg = assignRegions(rng, U, regs, 1);
  while (regs.some((r) => reg[r].length > (r.length === 1 || r === 'n' ? 3 : 2))) reg = assignRegions(rng, U, regs, 1);
  const target = rng.pick(EXPR3.filter((e) => e.regions.length > 1 || rng.chance(0.3)));
  const of = (e: Expr2) => sortNum(e.regions.flatMap((r) => reg[r]));
  const ans = of(target);
  const per = (r: Region) => (r.length === 1 || r === 'n' ? 2 : 1);
  const figure = vennFigure({ sets: ['A', 'B', 'C'], regions: Object.fromEntries(regs.map((r) => [r, chunk(reg[r], per(r))])) as Partial<Record<Region, string[]>> });
  const A = sortNum([...reg.a, ...reg.ab, ...reg.ac, ...reg.abc]);
  const B = sortNum([...reg.b, ...reg.ab, ...reg.bc, ...reg.abc]);
  const C = sortNum([...reg.c, ...reg.ac, ...reg.bc, ...reg.abc]);
  const steps = [
    `From the diagram: $A = ${setTex(A)}$, $B = ${setTex(B)}$, $C = ${setTex(C)}$.`,
    `$${target.tex}$ is the elements in ${exprMeaning(target, true)}.`,
    `$${target.tex} = ${setTex(ans)}$`,
  ];
  if (kind === 'count') {
    return {
      prompt: `The Venn diagram shows the elements of $U = \\{1, 2, 3, \\ldots, ${N}\\}$ sorted into sets $A$, $B$ and $C$. What is $n(${target.tex})$?`,
      figure,
      parts: [numPart(ans.length, { label: `$n(${target.tex}) =$` })],
      hints: ['Describe the set in words: which sets must an element be in, and which must it be outside?', 'Find the matching regions of the diagram, list their elements, and count.'],
      solution: [...steps, `$n(${target.tex}) = ${ans.length}$`],
    };
  }
  const ds = rng.shuffle(EXPR3.filter((e) => !sameSet(of(e), ans))).map(of);
  return {
    prompt: `The Venn diagram shows the elements of $U = \\{1, 2, 3, \\ldots, ${N}\\}$ sorted into sets $A$, $B$ and $C$. What is $${target.tex}$?`,
    figure,
    parts: [part(mc(rng, `$${setTex(ans)}$`, ds.map((s) => `$${setTex(s)}$`)))],
    hints: ['Work inside the brackets first.', 'Describe the set in words, then find the matching regions of the diagram.'],
    solution: steps,
  };
}

const setOperations = skill({
  id: 'm302-set-operations',
  name: 'Union, intersection, complement and difference',
  description: 'Find unions, intersections, complements and differences of sets from lists and Venn diagrams, and describe regions of a Venn diagram in set notation.',
  outcomes: ['LR2'],
  lessonId: 'm302-1-2',
  gen: (rng, d) => (d === 1 ? opsD1(rng) : d === 2 ? opsD2(rng) : opsD3(rng)),
});

// ---------------------------------------------------------------------------
// Lesson 1.2 — Counting with Venn diagrams
// ---------------------------------------------------------------------------

interface Ctx2 {
  group: string;
  A: string;
  B: string;
  notA: string;
  both: string;
  la: string;
  lb: string;
}

const CTX2: Ctx2[] = [
  { group: 'Grade 12 students at a school in PLACE', A: 'take Biology', B: 'take Chemistry', notA: 'do not take Biology', both: 'take both courses', la: 'Bio', lb: 'Chem' },
  { group: 'families in PLACE', A: 'own a dog', B: 'own a cat', notA: 'do not own a dog', both: 'own both a dog and a cat', la: 'Dog', lb: 'Cat' },
  { group: 'students at a junior high school in PLACE', A: 'play hockey', B: 'play soccer', notA: 'do not play hockey', both: 'play both sports', la: 'Hockey', lb: 'Soccer' },
  { group: 'customers at a café in PLACE', A: 'bought a coffee', B: 'bought a muffin', notA: 'did not buy a coffee', both: 'bought both', la: 'Coffee', lb: 'Muffin' },
  { group: 'students at a high school in PLACE', A: 'speak French', B: 'speak Spanish', notA: 'do not speak French', both: 'speak both languages', la: 'French', lb: 'Spanish' },
  { group: 'Grade 12 students in PLACE', A: 'have a part-time job', B: 'play on a school team', notA: 'do not have a part-time job', both: 'do both', la: 'Job', lb: 'Team' },
  { group: 'people at a community meeting in PLACE', A: 'volunteer at the food bank', B: 'volunteer at the animal shelter', notA: 'do not volunteer at the food bank', both: 'volunteer at both', la: 'Food', lb: 'Shelter' },
  { group: 'hockey fans in PLACE', A: 'watched the Hawks game', B: 'watched the Wolves game', notA: 'did not watch the Hawks game', both: 'watched both games', la: 'Hawks', lb: 'Wolves' },
];

interface Ctx3 {
  group: string;
  who: string;
  verb: string;
  /** What the three sets are, e.g. "courses" in "take exactly one of the three courses". */
  kind: string;
  names: [string, string, string];
  labels: [string, string, string];
}

const CTX3: Ctx3[] = [
  { group: 'Grade 12 students at a school in PLACE', who: 'students', verb: 'take', kind: 'courses', names: ['Biology', 'Chemistry', 'Physics'], labels: ['Bio', 'Chem', 'Phys'] },
  { group: 'students in an activities survey in PLACE', who: 'students', verb: 'belong to', kind: 'groups', names: ['the music club', 'a sports team', 'the art club'], labels: ['Music', 'Sports', 'Art'] },
  { group: 'students at a high school in PLACE', who: 'students', verb: 'play', kind: 'sports', names: ['basketball', 'volleyball', 'badminton'], labels: ['Bball', 'Vball', 'Badm'] },
  { group: 'people at a winter festival in PLACE', who: 'people', verb: 'tried', kind: 'activities', names: ['skating', 'cross-country skiing', 'snowshoeing'], labels: ['Skate', 'Ski', 'Shoe'] },
  { group: 'customers at a pizza place in PLACE', who: 'customers', verb: 'ordered', kind: 'toppings', names: ['pepperoni', 'mushrooms', 'green peppers'], labels: ['Pep', 'Mush', 'Green'] },
  { group: 'families in PLACE', who: 'families', verb: 'have', kind: 'pets', names: ['a dog', 'a cat', 'a fish'], labels: ['Dog', 'Cat', 'Fish'] },
];

const fillPlace = (s: string, rng: Rng) => s.replace('PLACE', rng.pick(PLACES));

function vennD1(rng: Rng): GenOutput {
  const c = rng.pick(CTX2);
  const group = fillPlace(c.group, rng);
  const a = rng.int(5, 30);
  const ab = rng.int(2, 15);
  const b = rng.int(5, 30);
  const n = rng.int(2, 20);
  const total = a + ab + b + n;
  if (rng.chance(0.5)) {
    const ask = rng.pick(['A', 'union', 'notA', 'onlyOne'] as const);
    const fig = vennFigure({ sets: [c.la, c.lb], regions: { a: String(a), ab: String(ab), b: String(b), n: String(n) }, caption: `${c.la}: ${c.A}. ${c.lb}: ${c.B}.` });
    const q = {
      A: { text: `How many of them ${c.A}?`, v: a + ab, step: `Add the two regions inside the ${c.la} circle: $${a} + ${ab} = ${a + ab}$` },
      union: { text: `How many of them ${c.A} or ${c.B} (or both)?`, v: a + ab + b, step: `Add the three regions inside the circles: $${a} + ${ab} + ${b} = ${a + ab + b}$` },
      notA: { text: `How many of them ${c.notA}?`, v: b + n, step: `Add the regions outside the ${c.la} circle: $${b} + ${n} = ${b + n}$` },
      onlyOne: { text: `How many of them ${c.A} or ${c.B}, but not both?`, v: a + b, step: `Add the two regions that are inside only one circle: $${a} + ${b} = ${a + b}$` },
    }[ask];
    return {
      prompt: `The Venn diagram shows the results of a survey of ${total} ${group}. ${q.text}`,
      figure: fig,
      parts: [numPart(q.v, { label: 'Number:' })],
      hints: ['Each number in the diagram counts only the people in that region.', 'Decide which regions match the description, then add their numbers.'],
      solution: [`The number in the overlap ($${ab}$) counts the people in both groups; the number outside the circles ($${n}$) counts the people in neither.`, q.step, `The answer is $${q.v}$.`],
    };
  }
  const nA = a + ab;
  const nB = b + ab;
  return {
    prompt: `In a survey of ${group}, ${nA} ${c.A} and ${nB} ${c.B}. Of these, ${ab} ${c.both}. How many ${c.A} or ${c.B} (or both)?`,
    parts: [numPart(nA + nB - ab, { label: 'Number:' })],
    hints: [`Adding ${nA} and ${nB} counts the ${ab} people in both groups twice.`, 'Use $n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$.'],
    solution: [
      `Let $A$ be the people who ${c.A} and $B$ the people who ${c.B}. Then $n(A) = ${nA}$, $n(B) = ${nB}$ and $n(A \\cap B) = ${ab}$.`,
      `$n(A \\cup B) = n(A) + n(B) - n(A \\cap B) = ${nA} + ${nB} - ${ab} = ${nA + nB - ab}$`,
      `$${nA + nB - ab}$ of them ${c.A} or ${c.B}.`,
    ],
  };
}

function vennD2(rng: Rng): GenOutput {
  const c = rng.pick(CTX2);
  const group = fillPlace(c.group, rng);
  const a = rng.int(6, 35);
  const ab = rng.int(3, 18);
  const b = rng.int(6, 35);
  const n = rng.int(0, 20);
  const nA = a + ab;
  const nB = b + ab;
  const total = a + ab + b + n;
  const kind = rng.pick(['both', 'both', 'neither', 'unionKnown'] as const);
  const fig = vennFigure({ sets: [c.la, c.lb], regions: { a: '?', ab: '?', b: '?', n: '?' }, caption: `${c.la}: ${c.A}. ${c.lb}: ${c.B}.` });
  if (kind === 'both') {
    return {
      prompt: `In a survey of ${total} ${group}, ${nA} ${c.A}, ${nB} ${c.B}, and ${n === 0 ? 'everyone is in at least one of the two groups' : `${n} are in neither group`}. How many ${c.both}?`,
      figure: fig,
      parts: [numPart(ab, { label: 'Both:' })],
      hints: ['First find how many are in at least one group: the total minus those in neither.', 'Then rearrange $n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$ to find $n(A \\cap B)$.'],
      solution: [
        `In at least one group: $n(A \\cup B) = ${total} - ${n} = ${total - n}$`,
        `$n(A \\cap B) = n(A) + n(B) - n(A \\cup B) = ${nA} + ${nB} - ${total - n} = ${ab}$`,
        `Check: only ${c.la}: $${nA} - ${ab} = ${a}$; only ${c.lb}: $${nB} - ${ab} = ${b}$; $${a} + ${ab} + ${b} + ${n} = ${total}$ ✓`,
        `$${ab}$ ${c.both}.`,
      ],
    };
  }
  if (kind === 'neither') {
    return {
      prompt: `In a survey of ${total} ${group}, ${nA} ${c.A}, ${nB} ${c.B}, and ${ab} ${c.both}.\n\n(a) How many are in **neither** group?\n\n(b) How many are in **exactly one** of the two groups?`,
      figure: fig,
      parts: [numPart(n, { label: '(a) Neither:' }), numPart(a + b, { label: '(b) Exactly one:' })],
      hints: ['Fill in the Venn diagram from the middle out: start with the overlap.', `Only ${c.la} $= n(A) - n(A \\cap B)$. The number in neither group is the total minus everyone inside the circles.`],
      solution: [
        `Overlap: $${ab}$. Only ${c.la}: $${nA} - ${ab} = ${a}$. Only ${c.lb}: $${nB} - ${ab} = ${b}$.`,
        `Inside the circles: $${a} + ${ab} + ${b} = ${a + ab + b}$, so neither: $${total} - ${a + ab + b} = ${n}$.`,
        `Exactly one group: $${a} + ${b} = ${a + b}$.`,
        `(a) $${n}$; (b) $${a + b}$`,
      ],
    };
  }
  return {
    prompt: `In a survey of ${group}, ${nA + nB - ab} said they ${c.A} or ${c.B} (or both). Of these, ${nA} ${c.A} and ${nB} ${c.B}.\n\n(a) How many ${c.both}?\n\n(b) How many ${c.B} but ${c.notA}?`,
    figure: fig,
    parts: [numPart(ab, { label: '(a) Both:' }), numPart(b, { label: `(b) Only ${c.lb}:` })],
    hints: ['Rearrange $n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$.', `Only ${c.lb} $= n(B) - n(A \\cap B)$.`],
    solution: [
      `$n(A \\cap B) = n(A) + n(B) - n(A \\cup B) = ${nA} + ${nB} - ${nA + nB - ab} = ${ab}$`,
      `Only ${c.lb}: $${nB} - ${ab} = ${b}$`,
      `(a) $${ab}$; (b) $${b}$`,
    ],
  };
}

function vennD3(rng: Rng): GenOutput {
  const c = rng.pick(CTX3);
  const group = fillPlace(c.group, rng);
  const r = {
    abc: rng.int(1, 6),
    ab: rng.int(2, 9),
    ac: rng.int(2, 9),
    bc: rng.int(2, 9),
    a: rng.int(4, 20),
    b: rng.int(4, 20),
    c: rng.int(4, 20),
    n: rng.int(2, 15),
  };
  const nA = r.a + r.ab + r.ac + r.abc;
  const nB = r.b + r.ab + r.bc + r.abc;
  const nC = r.c + r.ac + r.bc + r.abc;
  const nAB = r.ab + r.abc;
  const nAC = r.ac + r.abc;
  const nBC = r.bc + r.abc;
  const total = nA + r.b + r.c + r.bc + r.n;
  const [A, B, C] = c.names;
  const ask = rng.pick(['none', 'exactlyOne', 'onlyA', 'exactlyTwo'] as const);
  const q = {
    none: { text: `How many of the ${total} ${c.who} ${c.verb} none of the three ${c.kind}?`, v: r.n },
    exactlyOne: { text: `How many ${c.verb} exactly one of the three ${c.kind}?`, v: r.a + r.b + r.c },
    onlyA: { text: `How many ${c.verb} ${A} but neither of the other two ${c.kind}?`, v: r.a },
    exactlyTwo: { text: `How many ${c.verb} exactly two of the three ${c.kind}?`, v: r.ab + r.ac + r.bc },
  }[ask];
  return {
    prompt: `A survey of ${total} ${group} found:\n\n- ${nA} ${c.verb} ${A}, ${nB} ${c.verb} ${B} and ${nC} ${c.verb} ${C}\n- ${nAB} ${c.verb} both ${A} and ${B}\n- ${nAC} ${c.verb} both ${A} and ${C}\n- ${nBC} ${c.verb} both ${B} and ${C}\n- ${r.abc} ${c.verb} all three\n\n${q.text}`,
    figure: vennFigure({ sets: [...c.labels], regions: { abc: String(r.abc) }, caption: `${c.labels[0]} = ${c.names[0]}, ${c.labels[1]} = ${c.names[1]}, ${c.labels[2]} = ${c.names[2]}` }),
    parts: [numPart(q.v, { label: 'Number:' })],
    hints: [
      `Fill in the Venn diagram from the centre outward. The ${nAB} who ${c.verb} both ${A} and ${B} include the ${r.abc} who ${c.verb} all three.`,
      `For example, ${A} and ${B} but not ${C}: $${nAB} - ${r.abc} = ${r.ab}$. Then subtract the overlaps from each circle total.`,
    ],
    solution: [
      `Centre (all three): $${r.abc}$`,
      `Exactly two: ${c.labels[0]} and ${c.labels[1]} only $= ${nAB} - ${r.abc} = ${r.ab}$; ${c.labels[0]} and ${c.labels[2]} only $= ${nAC} - ${r.abc} = ${r.ac}$; ${c.labels[1]} and ${c.labels[2]} only $= ${nBC} - ${r.abc} = ${r.bc}$`,
      `Only ${c.labels[0]}: $${nA} - ${r.ab} - ${r.ac} - ${r.abc} = ${r.a}$; only ${c.labels[1]}: $${nB} - ${r.ab} - ${r.bc} - ${r.abc} = ${r.b}$; only ${c.labels[2]}: $${nC} - ${r.ac} - ${r.bc} - ${r.abc} = ${r.c}$`,
      `In at least one: $${r.a} + ${r.b} + ${r.c} + ${r.ab} + ${r.ac} + ${r.bc} + ${r.abc} = ${total - r.n}$, so none: $${total} - ${total - r.n} = ${r.n}$.`,
      ask === 'none'
        ? `$${r.n}$ ${c.who} ${c.verb} none of the three ${c.kind}.`
        : ask === 'exactlyOne'
          ? `Exactly one: $${r.a} + ${r.b} + ${r.c} = ${q.v}$ ${c.who}.`
          : ask === 'onlyA'
            ? `$${r.a}$ ${c.who} ${c.verb} ${A} only.`
            : `Exactly two: $${r.ab} + ${r.ac} + ${r.bc} = ${q.v}$ ${c.who}.`,
    ],
  };
}

const vennCount = skill({
  id: 'm302-venn-count',
  name: 'Counting with Venn diagrams',
  description: 'Solve counting problems with two and three sets using Venn diagrams and n(A ∪ B) = n(A) + n(B) − n(A ∩ B).',
  outcomes: ['LR2'],
  lessonId: 'm302-1-2',
  gen: (rng, d) => (d === 1 ? vennD1(rng) : d === 2 ? vennD2(rng) : vennD3(rng)),
});

// ---------------------------------------------------------------------------
// Lesson 1.3 — Conditional statements
// ---------------------------------------------------------------------------

interface Cond {
  /** Subject noun phrase and the pronoun used in the conclusion; empty for statements written as two full clauses. */
  S: string;
  pron: string;
  P: string;
  Q: string;
  nP: string;
  nQ: string;
  truth: boolean;
  conv: boolean;
  /** Counterexample to the statement (when false) and to the converse (when false). */
  cx?: string;
  ccx?: string;
}

const CONDS: Cond[] = [
  { S: 'a number', pron: 'it', P: 'is a multiple of 10', Q: 'is a multiple of 5', nP: 'is not a multiple of 10', nQ: 'is not a multiple of 5', truth: true, conv: false, ccx: '15 is a multiple of 5 but not a multiple of 10' },
  { S: 'a quadrilateral', pron: 'it', P: 'is a square', Q: 'has four right angles', nP: 'is not a square', nQ: 'does not have four right angles', truth: true, conv: false, ccx: 'a 2 cm by 5 cm rectangle has four right angles but is not a square' },
  { S: 'an integer', pron: 'it', P: 'is even', Q: 'is divisible by 2', nP: 'is not even', nQ: 'is not divisible by 2', truth: true, conv: true },
  { S: 'a triangle', pron: 'it', P: 'has three equal sides', Q: 'has three equal angles', nP: 'does not have three equal sides', nQ: 'does not have three equal angles', truth: true, conv: true },
  { S: 'a person', pron: 'that person', P: 'lives in Tokyo', Q: 'lives in Japan', nP: 'does not live in Tokyo', nQ: 'does not live in Japan', truth: true, conv: false, ccx: 'a person who lives in Osaka lives in Japan but not in Tokyo' },
  { S: '', pron: '', P: '$x = 3$', Q: '$x^2 = 9$', nP: '$x \\neq 3$', nQ: '$x^2 \\neq 9$', truth: true, conv: false, ccx: '$x = -3$ gives $x^2 = 9$, but $x \\neq 3$' },
  { S: '', pron: '', P: '$x^2 = 16$', Q: '$x = 4$', nP: '$x^2 \\neq 16$', nQ: '$x \\neq 4$', truth: false, conv: true, cx: '$x = -4$ gives $x^2 = 16$, but $x \\neq 4$' },
  { S: 'a number', pron: 'it', P: 'is prime', Q: 'is odd', nP: 'is not prime', nQ: 'is not odd', truth: false, conv: false, cx: '2 is prime but not odd', ccx: '9 is odd but not prime' },
  { S: 'a polygon', pron: 'it', P: 'is a triangle', Q: 'has exactly three sides', nP: 'is not a triangle', nQ: 'does not have exactly three sides', truth: true, conv: true },
  { S: '', pron: '', P: 'today is Saturday', Q: 'tomorrow is Sunday', nP: 'today is not Saturday', nQ: 'tomorrow is not Sunday', truth: true, conv: true },
  { S: 'an integer', pron: 'it', P: 'ends in the digit 0', Q: 'is divisible by 10', nP: 'does not end in the digit 0', nQ: 'is not divisible by 10', truth: true, conv: true },
  { S: 'a quadrilateral', pron: 'it', P: 'is a rectangle', Q: 'is a square', nP: 'is not a rectangle', nQ: 'is not a square', truth: false, conv: true, cx: 'a 2 cm by 5 cm rectangle is not a square' },
  { S: 'a number', pron: 'it', P: 'is divisible by 4', Q: 'is even', nP: 'is not divisible by 4', nQ: 'is not even', truth: true, conv: false, ccx: '6 is even but not divisible by 4' },
  { S: 'a student', pron: 'that student', P: 'is in Grade 12', Q: 'is in high school', nP: 'is not in Grade 12', nQ: 'is not in high school', truth: true, conv: false, ccx: 'a Grade 10 student is in high school but not in Grade 12' },
  { S: 'a number', pron: 'it', P: 'is divisible by 6', Q: 'is divisible by 3', nP: 'is not divisible by 6', nQ: 'is not divisible by 3', truth: true, conv: false, ccx: '9 is divisible by 3 but not by 6' },
  { S: 'a quadrilateral', pron: 'it', P: 'is a rhombus', Q: 'has four equal sides', nP: 'is not a rhombus', nQ: 'does not have four equal sides', truth: true, conv: true },
  { S: '', pron: '', P: '$x > 5$', Q: '$x > 2$', nP: '$x \\le 5$', nQ: '$x \\le 2$', truth: true, conv: false, ccx: '$x = 3$ is greater than 2 but not greater than 5' },
  { S: 'a month', pron: 'it', P: 'has 31 days', Q: 'is not February', nP: 'does not have 31 days', nQ: 'is February', truth: true, conv: false, ccx: 'April is not February, but it has only 30 days' },
  { S: 'an angle', pron: 'it', P: 'measures 90°', Q: 'is a right angle', nP: 'does not measure 90°', nQ: 'is not a right angle', truth: true, conv: true },
  { S: 'an animal', pron: 'it', P: 'is a bear', Q: 'is a mammal', nP: 'is not a bear', nQ: 'is not a mammal', truth: true, conv: false, ccx: 'a moose is a mammal but not a bear' },
  { S: 'a number', pron: 'it', P: 'is a multiple of 9', Q: 'is a multiple of 3', nP: 'is not a multiple of 9', nQ: 'is not a multiple of 3', truth: true, conv: false, ccx: '6 is a multiple of 3 but not a multiple of 9' },
  { S: 'a number', pron: 'it', P: 'is a whole number', Q: 'is an integer', nP: 'is not a whole number', nQ: 'is not an integer', truth: true, conv: false, ccx: '$-4$ is an integer but not a whole number' },
  { S: 'two lines in a plane', pron: 'they', P: 'are parallel', Q: 'never intersect', nP: 'are not parallel', nQ: 'intersect', truth: true, conv: true },
  { S: 'a triangle', pron: 'it', P: 'has a right angle', Q: 'has two acute angles', nP: 'does not have a right angle', nQ: 'does not have two acute angles', truth: true, conv: false, ccx: 'an equilateral triangle has two (in fact three) acute angles but no right angle' },
  { S: 'a number', pron: 'it', P: 'is a multiple of 3', Q: 'is a multiple of 6', nP: 'is not a multiple of 3', nQ: 'is not a multiple of 6', truth: false, conv: true, cx: '9 is a multiple of 3 but not a multiple of 6' },
  { S: 'a city', pron: 'it', P: 'is in Europe', Q: 'is in Italy', nP: 'is not in Europe', nQ: 'is not in Italy', truth: false, conv: true, cx: 'Madrid is in Europe but not in Italy' },
];

const clause = (subj: string, pred: string) => (subj ? `${subj} ${pred}` : pred);
const capFirst = (s: string) => (s.startsWith('$') ? s : cap(s));
function ifThen(c: Cond, h: 'P' | 'Q' | 'nP' | 'nQ', k: 'P' | 'Q' | 'nP' | 'nQ'): string {
  return `If ${clause(c.S, c[h])}, then ${clause(c.pron, c[k])}.`;
}
const statementOf = (c: Cond) => ifThen(c, 'P', 'Q');
const converseOf = (c: Cond) => ifThen(c, 'Q', 'P');
const inverseOf = (c: Cond) => ifThen(c, 'nP', 'nQ');
const contraOf = (c: Cond) => ifThen(c, 'nQ', 'nP');
const biconditionalOf = (c: Cond) => `${capFirst(clause(c.S, c.P))} if and only if ${clause(c.pron, c.Q)}.`;

const KINDS = ['converse', 'inverse', 'contrapositive'] as const;
type Kind = (typeof KINDS)[number];
const kindOf: Record<Kind, (c: Cond) => string> = { converse: converseOf, inverse: inverseOf, contrapositive: contraOf };
const KIND_RULE: Record<Kind, string> = {
  converse: 'The converse switches the hypothesis and the conclusion: "If $q$, then $p$."',
  inverse: 'The inverse negates both parts: "If not $p$, then not $q$."',
  contrapositive: 'The contrapositive switches **and** negates both parts: "If not $q$, then not $p$."',
};

function condD1(rng: Rng): GenOutput {
  const c = rng.pick(CONDS);
  const kind = rng.pick(['write', 'write', 'name', 'parts'] as const);
  if (kind === 'parts') {
    const askHyp = rng.chance(0.5);
    const hyp = capFirst(clause(c.S, c.P));
    const con = capFirst(clause(c.pron || c.S, c.Q));
    return {
      prompt: `What is the **${askHyp ? 'hypothesis' : 'conclusion'}** of this conditional statement?\n\n"${statementOf(c)}"`,
      parts: [part(mc(rng, askHyp ? hyp : con, [askHyp ? con : hyp, capFirst(clause(c.S, c.nP)), capFirst(clause(c.pron || c.S, c.nQ))]))],
      hints: ['A conditional statement has the form "If $p$, then $q$."', 'The hypothesis $p$ follows "if"; the conclusion $q$ follows "then".'],
      solution: [`Hypothesis ($p$): ${clause(c.S, c.P)}.`, `Conclusion ($q$): ${clause(c.pron || c.S, c.Q)}.`, `The ${askHyp ? 'hypothesis' : 'conclusion'} is "${askHyp ? hyp : con}".`],
    };
  }
  if (kind === 'name') {
    const k = rng.pick(KINDS);
    const opts = ['The converse', 'The inverse', 'The contrapositive'];
    return {
      prompt: `Statement: "${statementOf(c)}"\n\nNew statement: "${kindOf[k](c)}"\n\nHow is the new statement related to the original statement?`,
      parts: [part(fixedChoice(opts, KINDS.indexOf(k)))],
      hints: ['Compare the two parts: were they switched, negated, or both?', 'Converse: switch. Inverse: negate both. Contrapositive: switch and negate both.'],
      solution: [
        `In the original, $p$: ${clause(c.S, c.P)}; $q$: ${clause(c.pron || c.S, c.Q)}.`,
        KIND_RULE[k],
        `The new statement is the ${k}.`,
      ],
    };
  }
  const k: Kind = rng.chance(0.6) ? 'converse' : rng.pick(KINDS);
  const others = KINDS.filter((x) => x !== k).map((x) => kindOf[x](c));
  return {
    prompt: `Which is the **${k}** of this statement?\n\n"${statementOf(c)}"`,
    parts: [part(mc(rng, kindOf[k](c), [...others, statementOf(c)]))],
    hints: ['Write the statement as "If $p$, then $q$" and identify $p$ and $q$.', KIND_RULE[k]],
    solution: [`$p$: ${clause(c.S, c.P)}; $q$: ${clause(c.pron || c.S, c.Q)}.`, KIND_RULE[k], `The ${k} is: "${kindOf[k](c)}"`],
  };
}

/** Number-based statements with predicates, for generating counterexample choices. */
interface NumCond {
  P: string;
  Q: string;
  p: (n: number) => boolean;
  q: (n: number) => boolean;
}

function numConds(rng: Rng): NumCond {
  const t = rng.int(0, 3);
  if (t === 0) {
    const [a, b] = rng.pick([[10, 5], [6, 3], [9, 3], [12, 4], [8, 4], [15, 5], [12, 6], [20, 4]]);
    return rng.chance(0.5)
      ? { P: `is a multiple of ${a}`, Q: `is a multiple of ${b}`, p: (n) => n % a === 0, q: (n) => n % b === 0 }
      : { P: `is a multiple of ${b}`, Q: `is a multiple of ${a}`, p: (n) => n % b === 0, q: (n) => n % a === 0 };
  }
  if (t === 1) return rng.chance(0.5) ? { P: 'is prime', Q: 'is odd', p: isPrime, q: (n) => n % 2 === 1 } : { P: 'is odd', Q: 'is prime', p: (n) => n % 2 === 1, q: isPrime };
  if (t === 2) return rng.chance(0.5) ? { P: 'is a perfect square', Q: 'is odd', p: isSq, q: (n) => n % 2 === 1 } : { P: 'is a perfect square', Q: 'is even', p: isSq, q: (n) => n % 2 === 0 };
  const a = rng.int(10, 30);
  const b = a + rng.int(5, 15);
  return rng.chance(0.5)
    ? { P: `is greater than ${a}`, Q: `is greater than ${b}`, p: (n) => n > a, q: (n) => n > b }
    : { P: `is less than ${b}`, Q: `is less than ${a}`, p: (n) => n < b, q: (n) => n < a };
}

function condD2(rng: Rng): GenOutput {
  const kind = rng.pick(['write', 'counter', 'converseTrue'] as const);
  if (kind === 'write') {
    const c = rng.pick(CONDS);
    const k: Kind = rng.pick(['inverse', 'contrapositive', 'contrapositive']);
    const others = KINDS.filter((x) => x !== k).map((x) => kindOf[x](c));
    return {
      prompt: `Which is the **${k}** of this statement?\n\n"${statementOf(c)}"`,
      parts: [part(mc(rng, kindOf[k](c), [...others, ifThen(c, 'nP', 'Q')]))],
      hints: ['Identify the hypothesis $p$ and the conclusion $q$, and write the negation of each ("not $p$", "not $q$").', KIND_RULE[k]],
      solution: [`$p$: ${clause(c.S, c.P)}; $q$: ${clause(c.pron || c.S, c.Q)}.`, `not $p$: ${clause(c.S, c.nP)}; not $q$: ${clause(c.pron || c.S, c.nQ)}.`, KIND_RULE[k], `The ${k} is: "${kindOf[k](c)}"`],
    };
  }
  if (kind === 'counter') {
    for (;;) {
      const nc = numConds(rng);
      const conv = rng.chance(0.4);
      const [hyp, con, hp, cq] = conv ? [nc.Q, nc.P, nc.q, nc.p] : [nc.P, nc.Q, nc.p, nc.q];
      const xs = range(2, 60);
      const good = xs.filter((n) => hp(n) && !cq(n));
      const both = xs.filter((n) => hp(n) && cq(n));
      const onlyQ = xs.filter((n) => !hp(n) && cq(n));
      const neither = xs.filter((n) => !hp(n) && !cq(n));
      if (!good.length || !both.length || !neither.length) continue;
      const cx = rng.pick(good);
      const d1 = rng.pick(both);
      const d3 = rng.pick(neither);
      // A number that satisfies only the conclusion, or else a second number that satisfies both parts.
      const d2 = onlyQ.length ? rng.pick(onlyQ) : rng.pick(both.filter((x) => x !== d1));
      if (d2 === undefined) continue;
      const stmt = `If a number ${hyp}, then it ${con}.`;
      return {
        prompt: `Which number is a **counterexample** to this statement?\n\n"${stmt}"`,
        parts: [part(mc(rng, `$${cx}$`, [`$${d1}$`, `$${d2}$`, `$${d3}$`]))],
        hints: ['A counterexample makes the hypothesis true and the conclusion false.', `Look for a number that ${hyp} but does not satisfy "${con}".`],
        solution: [
          `A counterexample must satisfy the hypothesis ("${hyp}") but not the conclusion ("${con}").`,
          onlyQ.includes(d2)
            ? `$${d1}$ satisfies both parts, so it agrees with the statement. $${d2}$ and $${d3}$ do not satisfy the hypothesis, so they cannot disprove it.`
            : `$${d1}$ and $${d2}$ satisfy both parts, so they agree with the statement. $${d3}$ does not satisfy the hypothesis, so it cannot disprove it.`,
          `$${cx}$ ${hyp}, but it does not satisfy "${con}".`,
          `The counterexample is $${cx}$.`,
        ],
      };
    }
  }
  const c = rng.pick(CONDS.filter((x) => x.truth));
  const correct = c.conv ? 'The converse is true.' : `The converse is false. Counterexample: ${c.ccx}.`;
  const wrong = c.conv
    ? ['The converse is false, because a converse is never true when the original statement is true.', 'The converse is false, because the inverse is false.', 'You cannot tell whether a converse is true without a counterexample.']
    : ['The converse is true, because the original statement is true.', 'The converse is true, because no counterexample exists.', 'The converse is false, because every converse is false.'];
  return {
    prompt: `The statement "${statementOf(c).slice(0, -1)}" is true. Is its converse true? Choose the best answer.`,
    parts: [part(mc(rng, correct, wrong))],
    hints: ['Switch the hypothesis and the conclusion to write the converse.', 'Try to find a counterexample to the converse: something that satisfies its hypothesis but not its conclusion.'],
    solution: [`Converse: "${converseOf(c)}"`, c.conv ? 'No counterexample can be found: every case that satisfies the new hypothesis also satisfies the new conclusion.' : `Counterexample: ${c.ccx}.`, correct],
  };
}

function condD3(rng: Rng): GenOutput {
  const kind = rng.pick(['which', 'bicond', 'bicondPick'] as const);
  if (kind === 'which') {
    const c = rng.pick(CONDS);
    const opts = [
      { md: `Statement: "${statementOf(c)}"`, correct: c.truth },
      { md: `Converse: "${converseOf(c)}"`, correct: c.conv },
      { md: `Inverse: "${inverseOf(c)}"`, correct: c.conv },
      { md: `Contrapositive: "${contraOf(c)}"`, correct: c.truth },
    ];
    if (!opts.some((o) => o.correct)) return condD3(rng.fork('again'));
    return {
      prompt: 'Select **all** the statements that are true.',
      parts: [part(multi(rng, opts, true))],
      hints: ['A statement and its contrapositive are always both true or both false.', 'The converse and the inverse are also always both true or both false. Test the original statement and its converse with counterexamples.'],
      solution: [
        `The statement is ${c.truth ? 'true' : `false: ${c.cx}`}.`,
        `The converse is ${c.conv ? 'true' : `false: ${c.ccx}`}.`,
        `The contrapositive has the same truth value as the statement (${c.truth ? 'true' : 'false'}), and the inverse has the same truth value as the converse (${c.conv ? 'true' : 'false'}).`,
        `True: ${opts.filter((o) => o.correct).map((o) => o.md.split(':')[0].toLowerCase()).join(', ')}.`,
      ],
    };
  }
  if (kind === 'bicond') {
    const c = rng.pick(CONDS);
    const ok = c.truth && c.conv;
    const correct = ok
      ? `Yes: "${biconditionalOf(c)}" is true, because the statement and its converse are both true.`
      : !c.truth
        ? `No. The statement itself is false (${c.cx}), so the biconditional is false.`
        : `No. The converse is false (${c.ccx}), so the biconditional is false.`;
    const ds = ok
      ? [`No. A biconditional is true only when the converse is false.`, `No. The inverse of a true statement is always false.`, `Yes, but only because the contrapositive is true.`]
      : !c.truth
        ? [`Yes: "${biconditionalOf(c)}" is true, because the converse is true.`, `No. The converse is false, so the biconditional is false.`, `Yes, because a biconditional only needs one direction to be true.`]
        : [`Yes: "${biconditionalOf(c)}" is true, because the statement is true.`, `No. The statement itself is false, so the biconditional is false.`, `Yes, because the contrapositive is true.`];
    return {
      prompt: `Can this statement be written as a true biconditional? Choose the best answer.\n\n"${statementOf(c)}"`,
      parts: [part(mc(rng, correct, ds))],
      hints: ['A biconditional "$p$ if and only if $q$" is true only when both "if $p$, then $q$" and its converse "if $q$, then $p$" are true.', 'Check the statement and its converse for counterexamples.'],
      solution: [
        `Statement: ${c.truth ? 'true' : `false (${c.cx})`}.`,
        `Converse: "${converseOf(c)}" is ${c.conv ? 'true' : `false (${c.ccx})`}.`,
        ok ? `Both are true, so the biconditional "${biconditionalOf(c)}" is true.` : 'Both directions must be true for a true biconditional.',
        correct,
      ],
    };
  }
  const good = rng.pick(CONDS.filter((x) => x.truth && x.conv));
  const bad = rng.sample(CONDS.filter((x) => !(x.truth && x.conv)), 3);
  return {
    prompt: 'Which biconditional statement is **true**?',
    parts: [part(mc(rng, biconditionalOf(good), bad.map(biconditionalOf)))],
    hints: ['Split each biconditional into two conditional statements: "if $p$, then $q$" and "if $q$, then $p$".', 'A biconditional is true only when both conditionals are true. Look for a counterexample to each direction.'],
    solution: [
      ...bad.map((b) => `"${biconditionalOf(b)}" is false: ${!b.truth ? b.cx : b.ccx}.`),
      `"${statementOf(good)}" and its converse "${converseOf(good)}" are both true.`,
      `The true biconditional is "${biconditionalOf(good)}"`,
    ],
  };
}

const conditional = skill({
  id: 'm302-conditional',
  name: 'Conditional statements',
  description: 'Identify the hypothesis and conclusion; write and recognize the converse, inverse and contrapositive; use counterexamples; and decide whether a biconditional is true.',
  outcomes: ['LR3'],
  lessonId: 'm302-1-3',
  format: 'mc',
  gen: (rng, d) => (d === 1 ? condD1(rng) : d === 2 ? condD2(rng) : condD3(rng)),
});

export const SETSLOGIC_SKILLS: SkillDef[] = [setsBasics, setOperations, vennCount, conditional];
