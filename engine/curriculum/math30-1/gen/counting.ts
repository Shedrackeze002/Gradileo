/** Math 30-1 Unit 9 — Permutations, Combinations and the Binomial Theorem (PCBT1–PCBT4). */
import { mc, numPart, part, skill } from '../../helpers.ts';
import type { GenOutput } from '../../helpers.ts';
import { fmtGroupTex } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { PlaneFigure, PlanePoint, PlaneSegment, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Liam', 'Priya', 'Mateo', 'Aiyana', 'Noah', 'Mei', 'Owen', 'Fatima', 'Jasper', 'Simran', 'Kai', 'Chloé', 'Tariq', 'Nadia',
  'Ethan', 'Rajveer', 'Leah', 'Marcus', 'Sofia', 'Hiroshi', 'Zainab', 'Cole', 'Ananya', 'Wyatt', 'Thanh', 'Isabelle', 'Dakota', 'Gurpreet', 'Olumide',
];

const PLACES = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater', 'Oakridge', 'Elmwood'];

const DECK =
  'A standard deck has 52 cards in four suits: hearts and diamonds are red, clubs and spades are black. Each suit has 13 cards: A, 2 to 10, J, Q and K. The J, Q and K are the face cards.';

function fact(n: number): number {
  let p = 1;
  for (let i = 2; i <= n; i++) p *= i;
  return p;
}

function perm(n: number, r: number): number {
  let p = 1;
  for (let i = 0; i < r; i++) p *= n - i;
  return p;
}

function comb(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  const k = Math.min(r, n - r);
  let c = 1;
  for (let i = 1; i <= k; i++) c = (c * (n - k + i)) / i;
  return Math.round(c);
}

/** A whole number for LaTeX, thousands grouped. */
const nx = (x: number) => fmtGroupTex(x, 6);
/** A number in brackets when negative. */
const pn = (x: number) => (x < 0 ? `(${nx(x)})` : nx(x));
const nP = (n: number | string, r: number | string) => `{}_{${n}}P_{${r}}`;
const nC = (n: number | string, r: number | string) => `{}_{${n}}C_{${r}}`;
/** n × (n - 1) × ... with r factors. */
const falling = (n: number, r: number) => (r <= 0 ? '1' : Array.from({ length: r }, (_, i) => n - i).join(' \\times '));
const times = (xs: number[]) => xs.map(nx).join(' \\times ');

const cap = (s: string) => s[0].toUpperCase() + s.slice(1);
/** "2, 3 or 4" */
const orList = (xs: Array<number | string>) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} or ${xs[xs.length - 1]}`);
const choices = (k: number) => `$${k}$ choice${k === 1 ? '' : 's'}`;

function ord(k: number): string {
  const t = k % 100;
  const suf = t >= 11 && t <= 13 ? 'th' : (['th', 'st', 'nd', 'rd'][k % 10] ?? 'th');
  return `${k}${suf}`;
}

/** nPr = n!/(n - r)! = n × ... = value */
function permLine(n: number, r: number): string {
  return `${nP(n, r)} = \\dfrac{${n}!}{${n - r}!} = ${falling(n, r)} = ${nx(perm(n, r))}`;
}

/** nCr = n!/((n - r)! r!) = (n × ...)/(k!) = value */
function combLine(n: number, r: number): string {
  const k = Math.min(r, n - r);
  const v = nx(comb(n, r));
  if (k === 0) return `${nC(n, r)} = 1`;
  if (k === 1) return `${nC(n, r)} = \\dfrac{${n}!}{${n - r}!\\,${r}!} = ${v}`;
  return `${nC(n, r)} = \\dfrac{${n}!}{${n - r}!\\,${r}!} = \\dfrac{${falling(n, k)}}{${falling(k, k)}} = ${v}`;
}

/** Letter counts of a word, repeated letters first (most repeated first). */
function letterCounts(word: string): Array<[string, number]> {
  const m = new Map<string, number>();
  for (const ch of word) m.set(ch, (m.get(ch) ?? 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
}

/** n! / (a! b! ...) for the counts of a multiset. */
function multiset(counts: number[]): number {
  const n = counts.reduce((s, c) => s + c, 0);
  return counts.reduce((v, c) => v / fact(c), fact(n));
}

/** "\dfrac{7!}{3!\,2!}" (or "7!" when nothing repeats). */
function multisetTex(counts: number[]): string {
  const n = counts.reduce((s, c) => s + c, 0);
  const reps = counts.filter((c) => c > 1);
  if (!reps.length) return `${n}!`;
  return `\\dfrac{${n}!}{${reps.map((c) => `${c}!`).join('\\,')}}`;
}

/** "A (2 times), S (3 times)" */
function repeatsText(counts: Array<[string, number]>): string {
  const reps = counts.filter(([, c]) => c > 1);
  return reps.map(([l, c]) => `${l} appears ${c === 2 ? 'twice' : `${c} times`}`).join(', ');
}

/** A monomial c·x^p·y^q as LaTeX and as text for the answer parser. */
function mono(c: number, vars: Array<[string, number]>): { tex: string; txt: string } {
  const vs = vars.filter(([, p]) => p !== 0);
  const coefTex = vs.length === 0 ? nx(c) : c === 1 ? '' : c === -1 ? '-' : nx(c);
  const coefTxt = vs.length === 0 ? String(c) : c === 1 ? '' : c === -1 ? '-' : String(c);
  return {
    tex: coefTex + vs.map(([v, p]) => (p === 1 ? v : `${v}^{${p}}`)).join(''),
    txt: coefTxt + vs.map(([v, p]) => (p === 1 ? v : `${v}^${p}`)).join(''),
  };
}

/** A sum of monomials as LaTeX and text. */
function polySum(terms: Array<{ c: number; vars: Array<[string, number]> }>): { tex: string; txt: string } {
  let tex = '';
  let txt = '';
  for (const t of terms) {
    if (t.c === 0) continue;
    if (tex === '') {
      const f = mono(t.c, t.vars);
      tex = f.tex;
      txt = f.txt;
    } else {
      const m = mono(Math.abs(t.c), t.vars);
      tex += ` ${t.c < 0 ? '-' : '+'} ${m.tex}`;
      txt += ` ${t.c < 0 ? '-' : '+'} ${m.txt}`;
    }
  }
  return { tex: tex || '0', txt: txt || '0' };
}

/** A factor raised to a power for the general term: (2x)^{3}, x^{3}, (-3)^{2}, (5). Empty when e = 0. */
function powFactor(baseTex: string, e: number, bare = false): string {
  if (e === 0) return '';
  if (bare) return e === 1 ? baseTex : `${baseTex}^{${e}}`;
  return e === 1 ? `(${baseTex})` : `(${baseTex})^{${e}}`;
}

/** "ax" as LaTeX: x, 2x, -x, -3x (or with another variable). */
function axTex(a: number, v = 'x'): string {
  return a === 1 ? v : a === -1 ? `-${v}` : `${a}${v}`;
}

/** (ax + b)^n as LaTeX. */
function binomTex(a: number, b: number, n: number): string {
  return `(${axTex(a)} ${b < 0 ? '-' : '+'} ${Math.abs(b)})^{${n}}`;
}

/** A street grid from A (bottom left) to B (top right), with extra marked intersections. */
function streetGrid(m: number, h: number, marks: PlanePoint[] = []): PlaneFigure {
  const segments: PlaneSegment[] = [];
  for (let x = 0; x <= m; x++) segments.push({ from: [x, 0], to: [x, h], color: 'muted' });
  for (let y = 0; y <= h; y++) segments.push({ from: [0, y], to: [m, y], color: 'muted' });
  return {
    type: 'plane',
    grid: { xMin: -0.6, xMax: m + 0.6, yMin: -0.6, yMax: h + 0.6, step: Math.max(m, h) + 2 },
    hideTickLabels: true,
    hideAxes: true,
    segments,
    points: [{ x: 0, y: 0, label: 'A' }, { x: m, y: h, label: 'B' }, ...marks],
    caption: `Streets: ${m} blocks east and ${h} blocks north from A to B.`,
  };
}

const routes = (e: number, n: number) => comb(e + n, e);

/** Steps for counting shortest routes e blocks east and n blocks north. */
function routeLine(e: number, n: number): string {
  return `$\\dfrac{${e + n}!}{${e}!\\,${n}!} = ${nx(routes(e, n))}$`;
}

// ---------------------------------------------------------------------------
// Lesson 9.1 — The fundamental counting principle
// ---------------------------------------------------------------------------

function stagesSolution(stages: Array<[string, number]>, total: number, end: string): string[] {
  return [
    `There are ${stages.length} stages: ${stages.map(([w, k]) => `${w} ($${k}$ choices)`).join(', ')}.`,
    `By the fundamental counting principle, multiply: $${times(stages.map(([, k]) => k))} = ${nx(total)}$`,
    end,
  ];
}

const CP_HINTS = [
  'Think of each outcome as a row of boxes, one box for each choice. Write the number of options in each box.',
  'By the fundamental counting principle, multiply the numbers in the boxes.',
];

function cpD1(rng: Rng): GenOutput {
  const who = rng.pick(NAMES);
  const place = rng.pick(PLACES);
  const kind = rng.pick(['outfit', 'menu', 'trail', 'experiment', 'switch', 'lock'] as const);
  if (kind === 'switch' || kind === 'lock') {
    const k = kind === 'switch' ? rng.int(4, 8) : rng.int(3, 5);
    const base = kind === 'switch' ? 2 : 10;
    const N = base ** k;
    return {
      prompt:
        kind === 'switch'
          ? `An engineer is testing a control panel with ${k} switches. Each switch can be on or off. How many different settings of the panel are possible?`
          : `${who}'s bike lock has ${k} dials. Each dial shows one of the digits 0 to 9, and digits may repeat. How many different settings does the lock have?`,
      parts: [numPart(N, { label: 'Settings:' })],
      hints: [`Each ${kind === 'switch' ? 'switch' : 'dial'} is one stage, and every stage has the same number of options.`, `Multiply $${base}$ by itself ${k} times.`],
      solution: [
        `There are ${k} stages, each with $${base}$ options.`,
        `$${Array(k).fill(base).join(' \\times ')} = ${base}^{${k}} = ${nx(N)}$`,
        `There are $${nx(N)}$ different settings.`,
      ],
    };
  }
  if (kind === 'outfit') {
    const s = rng.int(3, 7);
    const p = rng.int(2, 5);
    const h = rng.int(2, 4);
    const N = s * p * h;
    return {
      prompt: `${who} packs ${s} shirts, ${p} pairs of pants and ${h} pairs of shoes for a trip to ${place}. An outfit is one shirt, one pair of pants and one pair of shoes. How many different outfits can ${who} make?`,
      parts: [numPart(N, { label: 'Outfits:' })],
      hints: CP_HINTS,
      solution: stagesSolution([['shirt', s], ['pants', p], ['shoes', h]], N, `${who} can make $${nx(N)}$ different outfits.`),
    };
  }
  if (kind === 'menu') {
    const a = rng.int(3, 6);
    const m = rng.int(4, 8);
    const d = rng.int(2, 5);
    const N = a * m * d;
    return {
      prompt: `A restaurant in ${place} offers ${a} appetizers, ${m} main courses and ${d} desserts. A three-course meal is one appetizer, one main course and one dessert. How many different three-course meals are possible?`,
      parts: [numPart(N, { label: 'Meals:' })],
      hints: CP_HINTS,
      solution: stagesSolution([['appetizer', a], ['main course', m], ['dessert', d]], N, `$${nx(N)}$ different three-course meals are possible.`),
    };
  }
  if (kind === 'trail') {
    const a = rng.int(2, 6);
    const b = rng.int(2, 6);
    const N = a * b;
    return {
      prompt: `A hiking map near ${place} shows ${a} trails from the parking lot to a lake and ${b} trails from the lake to a lookout. How many different routes go from the parking lot to the lookout by way of the lake?`,
      parts: [numPart(N, { label: 'Routes:' })],
      hints: ['A route is one trail to the lake **and** one trail from the lake to the lookout.', 'Multiply the number of choices for each part of the trip.'],
      solution: stagesSolution([['parking lot to lake', a], ['lake to lookout', b]], N, `There are $${nx(N)}$ different routes.`),
    };
  }
  const k = rng.int(3, 8);
  const N = 2 * 6 * k;
  return {
    prompt: `In a probability experiment, a coin is flipped, a six-sided die is rolled and a spinner with ${k} equal sections is spun. How many different outcomes are possible?`,
    parts: [numPart(N, { label: 'Outcomes:' })],
    hints: CP_HINTS,
    solution: stagesSolution([['coin', 2], ['die', 6], ['spinner', k]], N, `There are $${nx(N)}$ possible outcomes.`),
  };
}

function cpD2(rng: Rng): GenOutput {
  const kind = rng.pick(['plate', 'digits', 'set', 'password'] as const);
  if (kind === 'plate') {
    const L = rng.pick([2, 3]);
    const D = rng.pick([3, 4]);
    const mode = rng.pick(['rep', 'letters', 'none'] as const);
    const letters = mode === 'rep' ? Array(L).fill(26) : Array.from({ length: L }, (_, i) => 26 - i);
    const digits = mode === 'none' ? Array.from({ length: D }, (_, i) => 10 - i) : Array(D).fill(10);
    const N = [...letters, ...digits].reduce((p, x) => p * x, 1);
    const rule = { rep: 'Letters and digits may repeat.', letters: 'No letter may be repeated, but digits may repeat.', none: 'No letter and no digit may be repeated.' }[mode];
    return {
      prompt: `A licence plate design uses ${L} letters followed by ${D} digits. ${rule} How many different plates are possible? (Use the 26 letters A to Z and the 10 digits 0 to 9.)`,
      parts: [numPart(N, { label: 'Plates:' })],
      hints: ['Draw one box for each character and write the number of options in each box.', mode === 'rep' ? 'With repetition allowed, every letter box has 26 options and every digit box has 10.' : 'Without repetition, each box has one fewer option than the box before it.'],
      solution: [
        `Letter boxes: $${times(letters)}$`,
        `Digit boxes: $${times(digits)}$`,
        `Multiply: $${times([...letters, ...digits])} = ${nx(N)}$`,
        `There are $${nx(N)}$ possible plates.`,
      ],
    };
  }
  if (kind === 'digits') {
    const distinct = rng.chance(0.6);
    const k = distinct ? rng.int(3, 5) : rng.int(4, 6);
    const N = distinct ? 9 * perm(9, k - 1) : 9 * 10 ** (k - 1);
    return {
      prompt: distinct
        ? `How many ${k}-digit whole numbers have no repeated digits?`
        : `How many ${k}-digit whole numbers are there? (Digits may repeat, but a whole number cannot start with 0.)`,
      parts: [numPart(N, { label: 'Numbers:' })],
      hints: ['A whole number cannot start with 0, so fill the first box first.', distinct ? 'After the first digit, 0 is allowed, but each box has one fewer option than the one before.' : 'After the first digit, every box has 10 options.'],
      solution: distinct
        ? [
            'The first digit cannot be 0: $9$ choices (1 to 9).',
            `The second digit can be 0 but not the first digit: $9$ choices. Each later digit has one fewer choice: $${falling(9, k - 1)}$.`,
            `$9 \\times ${falling(9, k - 1)} = ${nx(N)}$`,
            `There are $${nx(N)}$ such numbers.`,
          ]
        : [
            'The first digit cannot be 0: $9$ choices.',
            `Each of the other ${k - 1} digits has $10$ choices.`,
            `$9 \\times ${Array(k - 1).fill(10).join(' \\times ')} = ${nx(N)}$`,
            `There are $${nx(N)}$ such numbers.`,
          ],
    };
  }
  if (kind === 'set') {
    const s = rng.int(5, 8);
    const ds = rng.sample([1, 2, 3, 4, 5, 6, 7, 8, 9], s).sort((a, b) => a - b);
    const k = rng.int(3, 4);
    const rep = rng.chance(0.4);
    const boxes = rep ? Array(k).fill(s) : Array.from({ length: k }, (_, i) => s - i);
    const N = boxes.reduce((p, x) => p * x, 1);
    return {
      prompt: `Using only the digits ${ds.join(', ')}, how many ${k}-digit numbers can be made if ${rep ? 'digits may be repeated' : 'no digit is used more than once'}?`,
      parts: [numPart(N, { label: 'Numbers:' })],
      hints: CP_HINTS,
      solution: [
        `There are $${s}$ digits to choose from${rep ? ', and every box can use any of them' : ', and each box has one fewer option than the box before'}.`,
        `$${times(boxes)} = ${nx(N)}$`,
        `$${nx(N)}$ numbers can be made.`,
      ],
    };
  }
  const k = rng.int(4, 6);
  const mode = rng.pick(['letterFirst', 'digitLast'] as const);
  const boxes = mode === 'letterFirst' ? [26, ...Array(k - 1).fill(36)] : [...Array(k - 1).fill(26), 10];
  const N = boxes.reduce((p, x) => p * x, 1);
  return {
    prompt:
      mode === 'letterFirst'
        ? `A computer password has ${k} characters. The first character must be an uppercase letter (A to Z). Each other character can be an uppercase letter or a digit (0 to 9). Characters may repeat. How many passwords are possible?`
        : `A computer password has ${k} characters. The last character must be a digit (0 to 9), and each other character must be an uppercase letter (A to Z). Characters may repeat. How many passwords are possible?`,
    parts: [numPart(N, { label: 'Passwords:' })],
    hints: [
      'Write the number of options for each of the character positions.',
      mode === 'letterFirst' ? 'A position that can be a letter or a digit has $26 + 10 = 36$ options.' : 'Each letter position has 26 options and the digit position has 10.',
    ],
    solution: [
      mode === 'letterFirst' ? `First character: $26$ choices. Each of the other ${k - 1}: $26 + 10 = 36$ choices.` : `Each of the first ${k - 1} characters: $26$ choices. Last character: $10$ choices.`,
      `$${times(boxes)} = ${nx(N)}$`,
      `$${nx(N)}$ passwords are possible.`,
    ],
  };
}

function cpD3(rng: Rng): GenOutput {
  const kind = rng.pick(['parity', 'range', 'roundtrip', 'lengths'] as const);
  if (kind === 'parity') {
    const k = rng.pick([3, 4]);
    const even = rng.chance(0.6);
    const mid = perm(8, k - 2);
    const midTex = falling(8, k - 2);
    if (!even) {
      const N = 5 * 8 * mid;
      return {
        prompt: `How many odd ${k}-digit whole numbers have no repeated digits?`,
        parts: [numPart(N, { label: 'Numbers:' })],
        hints: ['Fill the restricted boxes first: the last digit (it makes the number odd) and the first digit (it cannot be 0).', 'Then the middle digits can use any digit not already used.'],
        solution: [
          'Last digit: it must be odd, so 1, 3, 5, 7 or 9: $5$ choices.',
          'First digit: not 0 and not the last digit: $8$ choices.',
          `Middle digit${k > 3 ? 's' : ''}: any of the $8$ digits not yet used: $${midTex}$.`,
          `$5 \\times 8 \\times ${midTex} = ${nx(N)}$`,
          `There are $${nx(N)}$ such numbers.`,
        ],
      };
    }
    const c1 = 9 * mid;
    const c2 = 4 * 8 * mid;
    const N = c1 + c2;
    return {
      prompt: `How many even ${k}-digit whole numbers have no repeated digits?`,
      parts: [numPart(N, { label: 'Numbers:' })],
      hints: ['The last digit must be 0, 2, 4, 6 or 8, and the first digit cannot be 0. Whether the last digit is 0 changes the choices for the first digit, so split into cases.', 'Count each case with the counting principle, then add the cases.'],
      solution: [
        `Case 1, the last digit is 0: the first digit has $9$ choices (1 to 9) and the middle digit${k > 3 ? 's have' : ' has'} $${midTex}$. Total: $9 \\times ${midTex} = ${nx(c1)}$`,
        `Case 2, the last digit is 2, 4, 6 or 8 ($4$ choices): the first digit cannot be 0 or the last digit, so $8$ choices; the middle digit${k > 3 ? 's have' : ' has'} $${midTex}$. Total: $4 \\times 8 \\times ${midTex} = ${nx(c2)}$`,
        `The cases cannot happen together, so add: $${nx(c1)} + ${nx(c2)} = ${nx(N)}$`,
        `There are $${nx(N)}$ such numbers.`,
      ],
    };
  }
  if (kind === 'range') {
    const a = rng.int(2, 5);
    const b = rng.int(a + 2, 9);
    const even = rng.chance(0.5);
    const firsts = Array.from({ length: b - a }, (_, i) => a + i);
    const same = firsts.filter((f) => (f % 2 === 0) === even);
    const other = firsts.filter((f) => (f % 2 === 0) !== even);
    const N = (4 * same.length + 5 * other.length) * 56;
    const word = even ? 'even' : 'odd';
    const lastSet = even ? '0, 2, 4, 6, 8' : '1, 3, 5, 7, 9';
    const steps: string[] = [`The number is from $${a}000$ to $${b - 1}999$, so the first digit is ${orList(firsts)}. The last digit must be ${word}: ${lastSet}.`];
    const parts: number[] = [];
    if (same.length) {
      const v = 4 * same.length * 56;
      parts.push(v);
      steps.push(`First digit ${word} (${same.join(', ')}): ${choices(same.length)}. The last digit is ${word} but not the first digit: $4$ choices. Middle two digits: $8 \\times 7$. Total: $${same.length} \\times 4 \\times 8 \\times 7 = ${nx(v)}$`);
    }
    if (other.length) {
      const v = 5 * other.length * 56;
      parts.push(v);
      steps.push(`First digit ${even ? 'odd' : 'even'} (${other.join(', ')}): ${choices(other.length)}. The last digit can be any ${word} digit: $5$ choices. Middle two digits: $8 \\times 7$. Total: $${other.length} \\times 5 \\times 8 \\times 7 = ${nx(v)}$`);
    }
    if (parts.length > 1) steps.push(`Add the cases: $${parts.map(nx).join(' + ')} = ${nx(N)}$`);
    steps.push(`There are $${nx(N)}$ such numbers.`);
    return {
      prompt: `How many ${word} whole numbers between ${a}000 and ${b}000 have four different digits?`,
      parts: [numPart(N, { label: 'Numbers:' })],
      hints: ['The first digit and the last digit are restricted. The choices for the last digit depend on whether the first digit is even or odd, so split into cases.', 'In each case, fill the first and last boxes, then the two middle boxes ($8 \\times 7$).'],
      solution: steps,
    };
  }
  if (kind === 'roundtrip') {
    const who = rng.pick(NAMES);
    const d = rng.int(1, 4);
    const a = rng.int(2, 4);
    const b = rng.int(2, 5);
    const R = d + a * b;
    const T = R * (R - 1);
    return {
      prompt: `From a campground, ${d === 1 ? 'one trail goes' : `${d} trails go`} directly to a waterfall. There are also ${a} trails from the campground to a ranger station and ${b} trails from the ranger station to the waterfall. A route either goes directly or passes the ranger station once.\n\n(a) How many different routes go from the campground to the waterfall?\n\n(b) ${who} hikes to the waterfall and back, returning on a different route from the one taken there. How many round trips are possible?`,
      parts: [numPart(R, { label: '(a) Routes:' }), numPart(T, { label: '(b) Round trips:' })],
      hints: ['A route is direct **or** through the ranger station: add those cases. Through the station is one trail **and** another trail: multiply.', 'For the round trip, the way back can be any route except the one used going there.'],
      solution: [
        `Through the ranger station: $${a} \\times ${b} = ${a * b}$ routes. Directly: $${d}$.`,
        `(a) The cases cannot both happen, so add: $${d} + ${a * b} = ${R}$ routes.`,
        `(b) Going: $${R}$ choices. Returning on a different route: $${R - 1}$ choices.`,
        `$${R} \\times ${R - 1} = ${nx(T)}$ round trips.`,
      ],
    };
  }
  if (rng.chance(0.5)) {
    const L = rng.pick([2, 3]);
    const N1 = perm(26, L);
    const N2 = perm(26, L + 1);
    const N = N1 + N2;
    return {
      prompt: `A username must be ${L} or ${L + 1} letters long, using the letters A to Z with no letter repeated. How many usernames are possible?`,
      parts: [numPart(N, { label: 'Usernames:' })],
      hints: ['A username has one length **or** the other, so count each length separately and add.', 'For each length, the number of choices drops by one for each letter.'],
      solution: [
        `${L} letters: $${falling(26, L)} = ${nx(N1)}$`,
        `${L + 1} letters: $${falling(26, L + 1)} = ${nx(N2)}$`,
        `A username cannot have both lengths, so add: $${nx(N1)} + ${nx(N2)} = ${nx(N)}$`,
        `$${nx(N)}$ usernames are possible.`,
      ],
    };
  }
  const lens = rng.pick([[3, 4], [4, 5], [4, 5, 6], [3, 4, 5]]);
  const vals = lens.map((l) => 9 * 10 ** (l - 1));
  const N = vals.reduce((s, v) => s + v, 0);
  return {
    prompt: `A building access code has ${lens.slice(0, -1).join(', ')} or ${lens[lens.length - 1]} digits. Digits may repeat, but the first digit cannot be 0. How many access codes are possible?`,
    parts: [numPart(N, { label: 'Codes:' })],
    hints: ['Count the codes of each length separately: the lengths are separate cases.', 'For each length the first digit has 9 choices and each other digit has 10. Then add the cases.'],
    solution: [
      ...lens.map((l, i) => `${l} digits: $9 \\times ${Array(l - 1).fill(10).join(' \\times ')} = ${nx(vals[i])}$`),
      `A code has only one length, so add: $${vals.map(nx).join(' + ')} = ${nx(N)}$`,
      `$${nx(N)}$ access codes are possible.`,
    ],
  };
}

const countingPrinciple = skill({
  id: 'm301-counting-principle',
  name: 'The fundamental counting principle',
  description: 'Count outcomes with the fundamental counting principle, with and without repetition, using cases for "or" situations.',
  outcomes: ['PCBT1'],
  lessonId: 'm301-9-1',
  calculator: true,
  gen: (rng, d) => (d === 1 ? cpD1(rng) : d === 2 ? cpD2(rng) : cpD3(rng)),
});

// ---------------------------------------------------------------------------
// Lesson 9.2 — Permutations
// ---------------------------------------------------------------------------

/** Words whose letters are all different. */
const DISTINCT_WORDS = ['JASPER', 'CANMORE', 'LEDUC', 'TABER', 'PINCHER', 'VULCAN', 'LACOMBE', 'BEAUMONT', 'SYLVAN'];
/** Words with repeated letters: short ones (d1) and long ones (d2). */
const SHORT_REPEAT = ['ALBERTA', 'CANADA', 'OKOTOKS', 'CALGARY', 'BANFF', 'PONOKA', 'OTTAWA', 'COCHRANE', 'TORONTO', 'EDMONTON', 'BARRHEAD'];
const LONG_REPEAT = ['DRUMHELLER', 'SASKATOON', 'ATHABASCA', 'INNISFAIL', 'VEGREVILLE', 'KANANASKIS', 'MISSISSIPPI', 'WETASKIWIN', 'LETHBRIDGE', 'CHESTERMERE', 'ASSINIBOIA'];
/** Words for "the vowels together": several vowels and some repeated letters. */
const VOWEL_WORDS = ['ALBERTA', 'CANADA', 'EDMONTON', 'OKOTOKS', 'SASKATOON', 'DRUMHELLER', 'KANANASKIS', 'CALGARY', 'PONOKA', 'COCHRANE', 'BARRHEAD'];

function permD1(rng: Rng): GenOutput {
  const kind = rng.pick(['eval', 'podium', 'lineup', 'quotient'] as const);
  if (kind === 'eval') {
    const n = rng.int(5, 10);
    const r = rng.int(2, 4);
    const N = perm(n, r);
    return {
      prompt: `Evaluate $${nP(n, r)}$.`,
      parts: [numPart(N, { label: `$${nP(n, r)} =$` })],
      hints: [`$${nP('n', 'r')} = \\dfrac{n!}{(n - r)!}$`, `After cancelling, $${nP(n, r)}$ is the product of ${r} factors counting down from ${n}.`],
      solution: [`$${permLine(n, r)}$`, `So $${nP(n, r)} = ${nx(N)}$.`],
    };
  }
  if (kind === 'podium') {
    const ctx = rng.pick([
      { what: 'skiers race in a slalom event at Nakiska', slots: ['gold', 'silver', 'bronze'], ask: 'the gold, silver and bronze medals be awarded' },
      { what: 'projects are entered in a science fair', slots: ['first', 'second'], ask: 'first and second prizes be awarded' },
      { what: 'robots compete in an engineering challenge', slots: ['first', 'second', 'third'], ask: 'first, second and third places be awarded' },
      { what: 'students run for the student council', slots: ['president', 'vice-president'], ask: 'a president and a vice-president be elected' },
    ]);
    const n = rng.int(6, 15);
    const r = ctx.slots.length;
    const N = perm(n, r);
    return {
      prompt: `${n} ${ctx.what}. In how many ways can ${ctx.ask}? (No ties, and no one gets two places.)`,
      parts: [numPart(N, { label: 'Ways:' })],
      hints: ['The order matters: being first is different from being second. This is a permutation.', `Use $${nP(n, r)}$: ${r} places filled from ${n} entries.`],
      solution: [
        `${cap(ctx.slots.map((s, i) => `${s}: $${n - i}$ choices`).join(', '))}.`,
        `$${permLine(n, r)}$`,
        `There are $${nx(N)}$ ways.`,
      ],
    };
  }
  if (kind === 'lineup') {
    const n = rng.int(5, 8);
    const N = fact(n);
    const prompt = rng.pick([
      `In how many different orders can ${n} students stand in a line for a class photo?`,
      `In how many ways can ${n} runners be assigned to the ${n} lanes of a track, one runner per lane?`,
      `In how many different orders can ${n} songs on a playlist be played, if each song is played once?`,
      `In how many different orders can ${n} speakers give their talks at a science conference?`,
    ]);
    return {
      prompt,
      parts: [numPart(N, { label: 'Ways:' })],
      hints: ['There are as many places as objects, so all of them are arranged.', `The number of arrangements of ${n} different objects is $${n}!$.`],
      solution: [`The first place has $${n}$ choices, the next $${n - 1}$, and so on down to $1$.`, `$${n}! = ${falling(n, n)} = ${nx(N)}$`, `There are $${nx(N)}$ ways.`],
    };
  }
  const a = rng.int(7, 12);
  const k = rng.pick([2, 3]);
  const b = a - k;
  const N = perm(a, k);
  return {
    prompt: `Evaluate $\\dfrac{${a}!}{${b}!}$.`,
    parts: [numPart(N, { label: 'Value:' })],
    hints: [`Write $${a}!$ as $${falling(a, k)} \\times ${b}!$.`, `Cancel $${b}!$ from the top and bottom.`],
    solution: [`$\\dfrac{${a}!}{${b}!} = \\dfrac{${falling(a, k)} \\times ${b}!}{${b}!}$`, `$= ${falling(a, k)} = ${nx(N)}$`, `The value is $${nx(N)}$.`],
  };
}

const SIMPLIFY = [
  { tex: '\\dfrac{(n + 1)!}{(n - 1)!}', expand: '(n + 1)! = (n + 1)(n)(n - 1)!', product: 'n(n + 1)', expected: 'n^2 + n', poly: 'n^2 + n' },
  { tex: '\\dfrac{n!}{(n - 2)!}', expand: 'n! = n(n - 1)(n - 2)!', product: 'n(n - 1)', expected: 'n^2 - n', poly: 'n^2 - n' },
  { tex: '\\dfrac{(n + 2)!}{n!}', expand: '(n + 2)! = (n + 2)(n + 1)n!', product: '(n + 2)(n + 1)', expected: 'n^2 + 3n + 2', poly: 'n^2 + 3n + 2' },
  { tex: '\\dfrac{(n - 1)!}{(n - 3)!}', expand: '(n - 1)! = (n - 1)(n - 2)(n - 3)!', product: '(n - 1)(n - 2)', expected: 'n^2 - 3n + 2', poly: 'n^2 - 3n + 2' },
  { tex: '\\dfrac{(n + 1)!}{(n - 2)!}', expand: '(n + 1)! = (n + 1)(n)(n - 1)(n - 2)!', product: '(n + 1)n(n - 1)', expected: 'n^3 - n', poly: 'n^3 - n' },
  { tex: '\\dfrac{(2n)!}{(2n - 2)!}', expand: '(2n)! = (2n)(2n - 1)(2n - 2)!', product: '2n(2n - 1)', expected: '4n^2 - 2n', poly: '4n^2 - 2n' },
];

function permD2(rng: Rng): GenOutput {
  const kind = rng.pick(['simplify', 'club', 'word', 'diff'] as const);
  if (kind === 'simplify') {
    const f = rng.pick(SIMPLIFY);
    return {
      prompt: `Simplify $${f.tex}$, where $n$ is a natural number large enough for every factorial to be defined. Write the answer as a polynomial in $n$, with no factorial signs.`,
      parts: [part({ kind: 'expression', expected: f.expected }, { label: 'Simplified:' })],
      hints: ['Write the larger factorial as a product that ends with the smaller factorial.', `For example, $(n + 1)! = (n + 1)\\,n!$ and $n! = n(n - 1)!$. Then cancel.`],
      solution: [`$${f.expand}$`, `Cancel the common factorial: $${f.tex} = ${f.product}$`, `Expand: $${f.product} = ${f.poly}$`],
    };
  }
  if (kind === 'club') {
    const club = rng.pick(['robotics club', 'physics club', 'student council', 'debate club', 'ski club']);
    const n = rng.int(8, 20);
    const r = rng.pick([3, 4]);
    const roles = ['president', 'vice-president', 'secretary', 'treasurer'].slice(0, r);
    const N = perm(n, r);
    return {
      prompt: `The ${club} has ${n} members. In how many ways can it choose a ${roles.slice(0, -1).join(', ')} and ${roles[r - 1]} if no member holds more than one position?`,
      parts: [numPart(N, { label: 'Ways:' })],
      hints: ['The positions are different, so order matters: this is a permutation.', `Use $${nP(n, r)}$.`],
      solution: [`${cap(roles.map((s, i) => `${s}: $${n - i}$`).join(', '))} choices.`, `$${permLine(n, r)}$`, `There are $${nx(N)}$ ways.`],
    };
  }
  if (kind === 'word') {
    const w = rng.pick(DISTINCT_WORDS);
    const r = rng.int(3, Math.min(5, w.length - 1));
    const N = perm(w.length, r);
    return {
      prompt: `How many ${r}-letter arrangements can be made from the letters of the word ${w} if no letter is used more than once? (The arrangements do not need to be real words.)`,
      parts: [numPart(N, { label: 'Arrangements:' })],
      hints: [`${w} has ${w.length} different letters, and order matters in an arrangement.`, `Use $${nP(w.length, r)}$.`],
      solution: [`${w} has $${w.length}$ different letters. Choose and arrange ${r} of them.`, `$${permLine(w.length, r)}$`, `There are $${nx(N)}$ arrangements.`],
    };
  }
  const c = rng.int(3, 6);
  const a = c + rng.pick([2, 3]);
  const b = c + 1;
  const top = perm(a, a - c);
  const N = top - b;
  return {
    prompt: `Evaluate $\\dfrac{${a}! - ${b}!}{${c}!}$ by first factoring $${c}!$ out of the numerator.`,
    parts: [numPart(N, { label: 'Value:' })],
    hints: [`$${a}! = ${falling(a, a - c)} \\times ${c}!$ and $${b}! = ${b} \\times ${c}!$.`, `Factor out $${c}!$, then cancel it with the denominator.`],
    solution: [
      `$${a}! = ${falling(a, a - c)} \\times ${c}! = ${nx(top)} \\times ${c}!$ and $${b}! = ${b} \\times ${c}!$`,
      `$\\dfrac{${a}! - ${b}!}{${c}!} = \\dfrac{${c}!\\,(${nx(top)} - ${b})}{${c}!} = ${nx(top)} - ${b}$`,
      `The value is $${nx(N)}$.`,
    ],
  };
}

function permD3(rng: Rng): GenOutput {
  const kind = rng.pick(['p2', 'fact', 'p3', 'fact2', 'square'] as const);
  const hints = ['Rewrite the permutation or factorial expression as a product, cancelling factorials where you can.', 'Solve the resulting equation, and reject any value that is not a natural number large enough for the notation.'];
  if (kind === 'p2') {
    const n0 = rng.int(6, 16);
    const k = n0 * (n0 - 1);
    return {
      prompt: `Solve $${nP('n', 2)} = ${k}$ for $n$, where $n$ is a natural number.`,
      parts: [numPart(n0, { label: '$n =$' })],
      hints,
      solution: [
        `$${nP('n', 2)} = \\dfrac{n!}{(n - 2)!} = n(n - 1)$`,
        `$n(n - 1) = ${k}$, so $n^2 - n - ${k} = 0$`,
        `Factor: $(n - ${n0})(n + ${n0 - 1}) = 0$, so $n = ${n0}$ or $n = -${n0 - 1}$.`,
        `$n$ must be a natural number, so reject $n = -${n0 - 1}$. Check: $${n0} \\times ${n0 - 1} = ${k}$.`,
        `$n = ${n0}$`,
      ],
    };
  }
  if (kind === 'fact') {
    const n0 = rng.int(5, 15);
    const k = n0 * (n0 + 1);
    return {
      prompt: `Solve $\\dfrac{(n + 1)!}{(n - 1)!} = ${k}$ for $n$, where $n$ is a natural number.`,
      parts: [numPart(n0, { label: '$n =$' })],
      hints,
      solution: [
        `$(n + 1)! = (n + 1)(n)(n - 1)!$, so $\\dfrac{(n + 1)!}{(n - 1)!} = (n + 1)n$`,
        `$n^2 + n = ${k}$, so $n^2 + n - ${k} = 0$`,
        `Factor: $(n - ${n0})(n + ${n0 + 1}) = 0$, so $n = ${n0}$ or $n = -${n0 + 1}$.`,
        `Reject the negative root. Check: $${n0 + 1} \\times ${n0} = ${k}$.`,
        `$n = ${n0}$`,
      ],
    };
  }
  if (kind === 'p3') {
    const n0 = rng.int(5, 12);
    const m = (n0 - 1) * (n0 - 2);
    return {
      prompt: `Solve $${nP('n', 3)} = ${m}n$ for $n$, where $n$ is a natural number and $n \\ge 3$.`,
      parts: [numPart(n0, { label: '$n =$' })],
      hints,
      solution: [
        `$${nP('n', 3)} = \\dfrac{n!}{(n - 3)!} = n(n - 1)(n - 2)$`,
        `$n(n - 1)(n - 2) = ${m}n$. Since $n \\ne 0$, divide both sides by $n$: $(n - 1)(n - 2) = ${m}$`,
        `$n^2 - 3n + 2 = ${m}$, so $n^2 - 3n - ${m - 2} = 0$`,
        `Factor: $(n - ${n0})(n + ${n0 - 3}) = 0$, so $n = ${n0}$ or $n = -${n0 - 3}$.`,
        `Reject the negative root. Check: $${n0} \\times ${n0 - 1} \\times ${n0 - 2} = ${nx(n0 * m)} = ${m}(${n0})$.`,
        `$n = ${n0}$`,
      ],
    };
  }
  if (kind === 'fact2') {
    const n0 = rng.int(3, 12);
    const k = (n0 + 2) * (n0 + 1);
    return {
      prompt: `Solve $(n + 2)! = ${k}\\,n!$ for $n$, where $n$ is a natural number.`,
      parts: [numPart(n0, { label: '$n =$' })],
      hints,
      solution: [
        `$(n + 2)! = (n + 2)(n + 1)n!$, so the equation is $(n + 2)(n + 1)n! = ${k}\\,n!$`,
        `Divide both sides by $n!$: $(n + 2)(n + 1) = ${k}$`,
        `$n^2 + 3n + 2 = ${k}$, so $n^2 + 3n - ${k - 2} = 0$`,
        `Factor: $(n - ${n0})(n + ${n0 + 3}) = 0$, so $n = ${n0}$ or $n = -${n0 + 3}$.`,
        `Reject the negative root. Check: $${n0 + 2} \\times ${n0 + 1} = ${k}$.`,
        `$n = ${n0}$`,
      ],
    };
  }
  const n0 = rng.int(5, 15);
  const k = n0 * n0;
  return {
    prompt: `Solve $${nP('n', 2)} + ${nP('n', 1)} = ${k}$ for $n$, where $n$ is a natural number and $n \\ge 2$.`,
    parts: [numPart(n0, { label: '$n =$' })],
    hints,
    solution: [
      `$${nP('n', 2)} = n(n - 1)$ and $${nP('n', 1)} = n$`,
      `$n(n - 1) + n = ${k}$, so $n^2 - n + n = ${k}$ and $n^2 = ${k}$`,
      `$n = \\pm ${n0}$. Reject $n = -${n0}$ because $n$ is a natural number.`,
      `$n = ${n0}$`,
    ],
  };
}

const permutations = skill({
  id: 'm301-permutations',
  name: 'Factorials and permutations',
  description: 'Evaluate and simplify factorial expressions, use nPr to count arrangements, and solve equations involving nPr and factorials.',
  outcomes: ['PCBT2'],
  lessonId: 'm301-9-2',
  calculator: true,
  gen: (rng, d) => (d === 1 ? permD1(rng) : d === 2 ? permD2(rng) : permD3(rng)),
});

function wordArrangement(rng: Rng, words: string[]): GenOutput {
  const w = rng.pick(words);
  const counts = letterCounts(w);
  const cs = counts.map(([, c]) => c);
  const N = multiset(cs);
  const denom = cs.filter((c) => c > 1).reduce((p, c) => p * fact(c), 1);
  return {
    prompt: `How many different arrangements can be made using all the letters of the word ${w}?`,
    parts: [numPart(N, { label: 'Arrangements:' })],
    hints: ['Swapping two identical letters does not make a new arrangement.', 'Divide $n!$ by the factorial of the number of times each repeated letter appears.'],
    solution: [
      `${w} has $${w.length}$ letters: ${repeatsText(counts)}.`,
      `$${multisetTex(cs)} = \\dfrac{${nx(fact(w.length))}}{${nx(denom)}} = ${nx(N)}$`,
      `There are $${nx(N)}$ different arrangements.`,
    ],
  };
}

function specialD1(rng: Rng): GenOutput {
  if (rng.chance(0.6)) return wordArrangement(rng, SHORT_REPEAT);
  const n = rng.int(5, 8);
  const [A, B] = rng.sample(NAMES, 2);
  const both = rng.chance(0.4);
  const N = fact(both ? n - 2 : n - 1);
  return {
    prompt: both
      ? `${n} students, including ${A} and ${B}, line up at a bus stop. In how many ways can they line up if ${A} must be first and ${B} must be last?`
      : `${n} students, including ${A}, line up at a bus stop. In how many ways can they line up if ${A} must be first?`,
    parts: [numPart(N, { label: 'Ways:' })],
    hints: ['Place the restricted person (or people) first: there is only one choice for each restricted position.', 'Then arrange the rest of the students in the remaining places.'],
    solution: both
      ? [`${A} goes first and ${B} goes last: $1$ way each.`, `The other $${n - 2}$ students fill the middle: $${n - 2}! = ${nx(N)}$`, `There are $${nx(N)}$ ways.`]
      : [`${A} goes first: $1$ way.`, `The other $${n - 1}$ students fill the remaining places: $${n - 1}! = ${nx(N)}$`, `There are $${nx(N)}$ ways.`],
  };
}

function specialD2(rng: Rng): GenOutput {
  const kind = rng.pick(['together', 'apart', 'grid', 'long', 'start'] as const);
  if (kind === 'together' || kind === 'apart') {
    const n = rng.int(5, 8);
    const [A, B] = rng.sample(NAMES, 2);
    const together = 2 * fact(n - 1);
    const place = rng.pick(PLACES);
    if (kind === 'together') {
      return {
        prompt: `${n} friends, including ${A} and ${B}, sit in a row of ${n} seats at a movie theatre in ${place}. In how many ways can they sit if ${A} and ${B} must sit next to each other?`,
        parts: [numPart(together, { label: 'Ways:' })],
        hints: [`Tape ${A} and ${B} together and treat them as one unit.`, `Arrange the units, then multiply by the number of ways to order ${A} and ${B} inside their unit.`],
        solution: [
          `Treat ${A} and ${B} as one unit. There are $${n - 1}$ units to arrange: $${n - 1}! = ${nx(fact(n - 1))}$`,
          `Inside the unit, ${A} and ${B} can be in $2! = 2$ orders.`,
          `$2 \\times ${nx(fact(n - 1))} = ${nx(together)}$`,
          `There are $${nx(together)}$ ways.`,
        ],
      };
    }
    const N = fact(n) - together;
    return {
      prompt: `${n} friends, including ${A} and ${B}, sit in a row of ${n} seats at a movie theatre in ${place}. In how many ways can they sit if ${A} and ${B} must not sit next to each other?`,
      parts: [numPart(N, { label: 'Ways:' })],
      hints: ['Count all the seatings, then subtract the seatings where the two do sit together.', `For "together", treat ${A} and ${B} as one unit, and remember they can switch places.`],
      solution: [
        `All seatings: $${n}! = ${nx(fact(n))}$`,
        `Together: $2 \\times ${n - 1}! = ${nx(together)}$`,
        `Not together: $${nx(fact(n))} - ${nx(together)} = ${nx(N)}$`,
        `There are $${nx(N)}$ ways.`,
      ],
    };
  }
  if (kind === 'grid') {
    const m = rng.int(3, 6);
    const h = rng.int(2, 5);
    const N = routes(m, h);
    const who = rng.pick(NAMES);
    return {
      prompt: `The map shows a grid of city streets. ${who} walks from A to B, travelling only east (right) or north (up) along the streets. How many different routes are possible?`,
      figure: streetGrid(m, h),
      parts: [numPart(N, { label: 'Routes:' })],
      hints: [`Every route is a list of ${m} moves east (E) and ${h} moves north (N), in some order.`, 'Count the arrangements of those letters, where the Es are identical and the Ns are identical.'],
      solution: [
        `Every route has ${m} E moves and ${h} N moves: $${m + h}$ moves in all.`,
        `The number of routes is the number of arrangements of ${'E'.repeat(m)}${'N'.repeat(h)}: ${routeLine(m, h)}`,
        `There are $${nx(N)}$ routes.`,
      ],
    };
  }
  if (kind === 'long') return wordArrangement(rng, LONG_REPEAT);
  const w = rng.pick([...SHORT_REPEAT.filter((x) => x.length >= 7), ...LONG_REPEAT]);
  const counts = letterCounts(w);
  const L = counts[0][0];
  const rest = counts.map(([l, c]) => (l === L ? c - 1 : c)).filter((c) => c > 0);
  const N = multiset(rest);
  const restCounts: Array<[string, number]> = counts.map(([l, c]): [string, number] => [l, l === L ? c - 1 : c]).filter(([, c]) => c > 0);
  const reps = repeatsText(restCounts);
  return {
    prompt: `How many arrangements of all the letters of ${w} begin with ${L}?`,
    parts: [numPart(N, { label: 'Arrangements:' })],
    hints: [`Put one ${L} in the first position. Only the other ${w.length - 1} letters are left to arrange.`, 'Divide by the factorial of each letter that is still repeated.'],
    solution: [
      `Place ${L} first. The remaining $${w.length - 1}$ letters are arranged in the other places${reps ? `; among them, ${reps}` : ', and they are all different'}.`,
      `$${multisetTex(rest)} = ${nx(N)}$`,
      `There are $${nx(N)}$ arrangements that begin with ${L}.`,
    ],
  };
}

const VOWELS = new Set(['A', 'E', 'I', 'O', 'U']);

function specialD3(rng: Rng): GenOutput {
  const kind = rng.pick(['through', 'books', 'vowels'] as const);
  if (kind === 'through') {
    const m = rng.int(4, 6);
    const h = rng.int(3, 5);
    const cx = rng.int(1, m - 1);
    const cy = rng.int(1, h - 1);
    const r1 = routes(cx, cy);
    const r2 = routes(m - cx, h - cy);
    const N = r1 * r2;
    const who = rng.pick(NAMES);
    return {
      prompt: `${who} walks from A to B along the streets shown, travelling only east (right) or north (up). On the way, ${who} must stop at the library at C. How many different routes are possible?`,
      figure: streetGrid(m, h, [{ x: cx, y: cy, label: 'C', color: 'accent' }]),
      parts: [numPart(N, { label: 'Routes:' })],
      hints: ['Split the trip into two legs: A to C, then C to B.', 'Count the routes for each leg as arrangements of E and N moves, then multiply.'],
      solution: [
        `A to C: ${cx} E and ${cy} N moves: ${routeLine(cx, cy)}`,
        `C to B: ${m - cx} E and ${h - cy} N moves: ${routeLine(m - cx, h - cy)}`,
        `Each first leg can be followed by each second leg: $${nx(r1)} \\times ${nx(r2)} = ${nx(N)}$`,
        `There are $${nx(N)}$ routes through C.`,
      ],
    };
  }
  if (kind === 'books') {
    const [a, b, c] = [rng.int(2, 4), rng.int(2, 4), rng.int(2, 4)];
    const who = rng.pick(NAMES);
    const all = rng.chance(0.5);
    const intro = `${who} has ${a} different math books, ${b} different physics books and ${c} different chemistry books to put on a shelf.`;
    if (all) {
      const N = 6 * fact(a) * fact(b) * fact(c);
      return {
        prompt: `${intro} In how many ways can the books be arranged if the books for each subject must be kept together?`,
        parts: [numPart(N, { label: 'Ways:' })],
        hints: ['Treat each subject as one block. First arrange the 3 blocks.', 'Then arrange the books inside each block, and multiply everything together.'],
        solution: [
          'Arrange the three subject blocks: $3! = 6$',
          `Inside the blocks: math $${a}! = ${fact(a)}$, physics $${b}! = ${fact(b)}$, chemistry $${c}! = ${fact(c)}$`,
          `$6 \\times ${fact(a)} \\times ${fact(b)} \\times ${fact(c)} = ${nx(N)}$`,
          `There are $${nx(N)}$ ways.`,
        ],
      };
    }
    const units = b + c + 1;
    const N = fact(units) * fact(a);
    return {
      prompt: `${intro} In how many ways can the books be arranged if the math books must be kept together (the other books can go anywhere)?`,
      parts: [numPart(N, { label: 'Ways:' })],
      hints: ['Treat the math books as one block. Count the units to arrange: the block plus each other book.', 'Multiply by the number of ways to arrange the math books inside their block.'],
      solution: [
        `Units: the math block plus $${b + c}$ other books, so $${units}$ units: $${units}! = ${nx(fact(units))}$`,
        `Inside the math block: $${a}! = ${fact(a)}$`,
        `$${nx(fact(units))} \\times ${fact(a)} = ${nx(N)}$`,
        `There are $${nx(N)}$ ways.`,
      ],
    };
  }
  const w = rng.pick(VOWEL_WORDS);
  const counts = letterCounts(w);
  const vowels = counts.filter(([l]) => VOWELS.has(l));
  const cons = counts.filter(([l]) => !VOWELS.has(l));
  const nv = vowels.reduce((s, [, c]) => s + c, 0);
  const consCounts = cons.map(([, c]) => c);
  const outer = multiset([...consCounts, 1]);
  const inner = multiset(vowels.map(([, c]) => c));
  const N = outer * inner;
  const vowelList = [...w].filter((l) => VOWELS.has(l)).join(', ');
  const consReps = repeatsText(cons);
  const vowReps = repeatsText(vowels);
  return {
    prompt: `How many arrangements of all the letters of ${w} have all the vowels together? (The vowels are A, E, I, O and U.)`,
    parts: [numPart(N, { label: 'Arrangements:' })],
    hints: ['Treat the block of vowels as a single unit. Arrange that unit with the consonants.', 'Then arrange the vowels inside the block. Divide by the factorials of repeated letters in each step.'],
    solution: [
      `The vowels are ${vowelList}. Treat them as one block. The units are the block and the $${w.length - nv}$ consonants${consReps ? ` (${consReps})` : ''}.`,
      `Arrange the $${w.length - nv + 1}$ units: $${multisetTex([...consCounts, 1])} = ${nx(outer)}$`,
      `Arrange the vowels inside the block${vowReps ? ` (${vowReps})` : ''}: $${multisetTex(vowels.map(([, c]) => c))} = ${nx(inner)}$`,
      `$${nx(outer)} \\times ${nx(inner)} = ${nx(N)}$`,
      `There are $${nx(N)}$ arrangements with the vowels together.`,
    ],
  };
}

const permutationsSpecial = skill({
  id: 'm301-permutations-special',
  name: 'Permutations with repeated objects and restrictions',
  description: 'Count arrangements with identical objects, with positions fixed, with objects together or apart, and shortest routes on a grid.',
  outcomes: ['PCBT2'],
  lessonId: 'm301-9-2',
  calculator: true,
  gen: (rng, d) => (d === 1 ? specialD1(rng) : d === 2 ? specialD2(rng) : specialD3(rng)),
});

// ---------------------------------------------------------------------------
// Lesson 9.3 — Combinations
// ---------------------------------------------------------------------------

const COMB_HINTS = ['Does the order of the selection matter? If not, it is a combination.', '$\\displaystyle {}_{n}C_{r} = \\frac{n!}{(n - r)!\\,r!}$'];

function combD1(rng: Rng): GenOutput {
  if (rng.chance(0.35)) {
    const n = rng.int(6, 12);
    const r = rng.int(2, Math.min(5, n - 2));
    const N = comb(n, r);
    return {
      prompt: `Evaluate $${nC(n, r)}$.`,
      parts: [numPart(N, { label: `$${nC(n, r)} =$` })],
      hints: ['$\\displaystyle {}_{n}C_{r} = \\frac{n!}{(n - r)!\\,r!}$', `Cancel $${n - r}!$ first, then divide by $${r}!$.`],
      solution: [`$${combLine(n, r)}$`, `So $${nC(n, r)} = ${nx(N)}$.`],
    };
  }
  const who = rng.pick(NAMES);
  const place = rng.pick(PLACES);
  const ctx = rng.pick([
    (n: number, r: number) => `A physics teacher has ${n} different lab activities and will choose ${r} of them for a unit. How many different selections are possible?`,
    (n: number, r: number) => `A pizza place in ${place} offers ${n} toppings. How many different ${r}-topping pizzas can be ordered if each topping is used at most once?`,
    (n: number, r: number) => `${who} is choosing ${r} of ${n} different novels to bring on a trip to ${place}. How many different selections are possible?`,
    (n: number, r: number) => `A coach chooses ${r} of the ${n} players on a hockey team to attend a skills camp. How many different groups can be sent?`,
    (n: number, r: number) => `An engineering firm will interview ${r} of the ${n} applicants for a job. How many different groups of applicants can be chosen for interviews?`,
  ]);
  const n = rng.int(7, 15);
  const r = rng.int(2, Math.min(5, n - 3));
  const N = comb(n, r);
  return {
    prompt: ctx(n, r),
    parts: [numPart(N, { label: 'Selections:' })],
    hints: COMB_HINTS,
    solution: [`Only the group chosen matters, not the order, so use a combination.`, `$${combLine(n, r)}$`, `There are $${nx(N)}$ possible selections.`],
  };
}

const CARD_SETS = [
  { desc: 'only hearts', pool: 13, why: 'There are 13 hearts.' },
  { desc: 'only spades', pool: 13, why: 'There are 13 spades.' },
  { desc: 'only red cards', pool: 26, why: 'There are 26 red cards (13 hearts and 13 diamonds).' },
  { desc: 'only black cards', pool: 26, why: 'There are 26 black cards (13 clubs and 13 spades).' },
  { desc: 'only face cards', pool: 12, why: 'There are 12 face cards (J, Q and K in each of 4 suits).' },
  { desc: 'no face cards', pool: 40, why: 'There are $52 - 12 = 40$ cards that are not face cards.' },
];

function combD2(rng: Rng): GenOutput {
  const kind = rng.pick(['cards', 'lottery', 'points'] as const);
  if (kind === 'cards') {
    const s = rng.pick(CARD_SETS);
    const r = rng.int(3, s.pool === 12 ? 4 : 5);
    const N = comb(s.pool, r);
    return {
      prompt: `${DECK}\n\nHow many different ${r}-card hands contain ${s.desc}?`,
      parts: [numPart(N, { label: 'Hands:' })],
      hints: ['A hand is a selection: the order the cards are dealt does not matter.', 'Count the cards that are allowed, then choose the hand from those cards only.'],
      solution: [s.why, `$${combLine(s.pool, r)}$`, `There are $${nx(N)}$ such hands.`],
    };
  }
  if (kind === 'lottery') {
    const k = rng.int(4, 6);
    const N0 = rng.int(20, 49);
    const N = comb(N0, k);
    return {
      prompt: `In a lottery game, players choose ${k} different numbers from 1 to ${N0}. The order of the numbers does not matter. How many different selections are possible?`,
      parts: [numPart(N, { label: 'Selections:' })],
      hints: COMB_HINTS,
      solution: ['The order does not matter, so this is a combination.', `$${combLine(N0, k)}$`, `There are $${nx(N)}$ possible selections.`],
    };
  }
  const n = rng.int(6, 12);
  const shape = rng.pick([
    { noun: 'chords (line segments joining two of the points)', one: 'chord', r: 2 },
    { noun: 'triangles with all three vertices at these points', one: 'triangle', r: 3 },
    { noun: 'quadrilaterals with all four vertices at these points', one: 'quadrilateral', r: 4 },
  ]);
  const N = comb(n, shape.r);
  return {
    prompt: `${n} points are marked on a circle. How many different ${shape.noun} can be drawn?`,
    parts: [numPart(N, { label: 'Number:' })],
    hints: [`Each ${shape.one} is decided by which ${shape.r} points are used, not by the order they are picked.`, `Use $${nC(n, shape.r)}$.`],
    solution: [
      `No three points on a circle lie on one line, so any ${shape.r} of the points give a different ${shape.one}. The order of choosing them does not matter.`,
      `$${combLine(n, shape.r)}$`,
      `$${nx(N)}$ ${shape.one}s can be drawn.`,
    ],
  };
}

function combD3(rng: Rng): GenOutput {
  const kind = rng.pick(['handshake', 'league', 'diagonals', 'ratio'] as const);
  const hints = ['Write the combination as a fraction with factorials, then cancel to get a polynomial in $n$.', 'Solve the equation and keep only the natural-number solution.'];
  if (kind === 'handshake' || kind === 'league') {
    const once = kind === 'handshake' || rng.chance(0.5);
    const n0 = kind === 'handshake' ? rng.int(6, 20) : rng.int(5, 16);
    const k = once ? comb(n0, 2) : n0 * (n0 - 1);
    const prompt =
      kind === 'handshake'
        ? `At a meeting of engineers, every person shook hands with every other person exactly once. There were ${k} handshakes. How many people were at the meeting?`
        : `In a hockey league, each team plays every other team ${once ? 'once' : 'twice (once at home and once away)'}. The season has ${k} games. How many teams are in the league?`;
    return {
      prompt,
      parts: [numPart(n0, { label: kind === 'handshake' ? 'People:' : 'Teams:' })],
      hints: [`Each ${kind === 'handshake' ? 'handshake' : 'pairing'} is a selection of 2 from $n$: $${nC('n', 2)} = \\dfrac{n(n - 1)}{2}$.`, 'Set up the equation, rearrange it into a quadratic and factor.'],
      solution: once
        ? [
            `$${nC('n', 2)} = \\dfrac{n!}{(n - 2)!\\,2!} = \\dfrac{n(n - 1)}{2}$`,
            `$\\dfrac{n(n - 1)}{2} = ${k}$, so $n^2 - n - ${2 * k} = 0$`,
            `Factor: $(n - ${n0})(n + ${n0 - 1}) = 0$, so $n = ${n0}$ or $n = -${n0 - 1}$.`,
            `Reject the negative root. Check: $\\dfrac{${n0} \\times ${n0 - 1}}{2} = ${k}$.`,
            `There are $${n0}$ ${kind === 'handshake' ? 'people' : 'teams'}.`,
          ]
        : [
            `Each pair of teams plays twice, so the number of games is $2 \\times ${nC('n', 2)} = n(n - 1)$.`,
            `$n(n - 1) = ${k}$, so $n^2 - n - ${k} = 0$`,
            `Factor: $(n - ${n0})(n + ${n0 - 1}) = 0$, so $n = ${n0}$ or $n = -${n0 - 1}$.`,
            `Reject the negative root. Check: $${n0} \\times ${n0 - 1} = ${k}$.`,
            `There are $${n0}$ teams.`,
          ],
    };
  }
  if (kind === 'diagonals') {
    const n0 = rng.int(6, 15);
    const k = (n0 * (n0 - 3)) / 2;
    return {
      prompt: `A convex polygon has ${k} diagonals. How many sides does it have?`,
      parts: [numPart(n0, { label: 'Sides:' })],
      hints: ['Every segment joining two vertices is either a side or a diagonal. There are $n$ sides.', `Diagonals $= ${nC('n', 2)} - n$. Set this equal to ${k} and solve.`],
      solution: [
        `Segments joining two of the $n$ vertices: $${nC('n', 2)} = \\dfrac{n(n - 1)}{2}$. Of these, $n$ are sides.`,
        `$\\dfrac{n(n - 1)}{2} - n = ${k}$. Multiply by 2: $n^2 - n - 2n = ${2 * k}$, so $n^2 - 3n - ${2 * k} = 0$`,
        `Factor: $(n - ${n0})(n + ${n0 - 3}) = 0$, so $n = ${n0}$ or $n = -${n0 - 3}$.`,
        `Reject the negative root. Check: $\\dfrac{${n0}(${n0 - 3})}{2} = ${k}$.`,
        `The polygon has $${n0}$ sides.`,
      ],
    };
  }
  const m = rng.int(2, 6);
  const n0 = 3 * m + 2;
  return {
    prompt: `Solve $${nC('n', 3)} = ${m}\\,${nC('n', 2)}$ for $n$, where $n$ is a natural number and $n \\ge 3$.`,
    parts: [numPart(n0, { label: '$n =$' })],
    hints,
    solution: [
      `$${nC('n', 3)} = \\dfrac{n(n - 1)(n - 2)}{3!} = \\dfrac{n(n - 1)(n - 2)}{6}$ and $${nC('n', 2)} = \\dfrac{n(n - 1)}{2}$`,
      `$\\dfrac{n(n - 1)(n - 2)}{6} = ${m} \\cdot \\dfrac{n(n - 1)}{2}$`,
      `Since $n \\ge 3$, $n(n - 1) \\ne 0$. Divide both sides by $\\dfrac{n(n - 1)}{2}$: $\\dfrac{n - 2}{3} = ${m}$`,
      `$n - 2 = ${3 * m}$`,
      `$n = ${n0}$`,
    ],
  };
}

const combinations = skill({
  id: 'm301-combinations',
  name: 'Combinations',
  description: 'Use nCr to count selections where order does not matter, including card hands, and solve equations involving nCr.',
  outcomes: ['PCBT3'],
  lessonId: 'm301-9-3',
  calculator: true,
  gen: (rng, d) => (d === 1 ? combD1(rng) : d === 2 ? combD2(rng) : combD3(rng)),
});

const GROUPS: Array<[string, string, string, string]> = [
  ['Grade 11 students', 'Grade 12 students', 'student committee', 'committees'],
  ['engineers', 'technicians', 'project team', 'teams'],
  ['teachers', 'students', 'school safety committee', 'committees'],
  ['nurses', 'doctors', 'hospital committee', 'committees'],
  ['biologists', 'chemists', 'research team', 'teams'],
];

/** "1 engineer", "2 engineers" */
const howMany = (k: number, plural: string) => `${k} ${k === 1 ? plural.replace(/s$/, '') : plural}`;

function casesD1(rng: Rng): GenOutput {
  if (rng.chance(0.45)) {
    const club = rng.pick(['robotics club', 'student council', 'drama club', 'environment club']);
    const n = rng.int(8, 15);
    const r = rng.int(3, 5);
    const A = rng.pick(NAMES);
    const include = rng.chance(0.5);
    const N = include ? comb(n - 1, r - 1) : comb(n - 1, r);
    return {
      prompt: `A committee of ${r} is chosen from the ${n} members of the ${club}. How many committees are possible if ${include ? `${A} must be on the committee` : `${A} cannot be on the committee`}?`,
      parts: [numPart(N, { label: 'Committees:' })],
      hints: include ? [`Put ${A} on the committee first. How many more people are needed, and how many are left to choose from?`, `Use $${nC(n - 1, r - 1)}$.`] : [`Remove ${A} from the group. Choose all ${r} members from the others.`, `Use $${nC(n - 1, r)}$.`],
      solution: include
        ? [`${A} takes one seat. Choose the other $${r - 1}$ members from the remaining $${n - 1}$.`, `$${combLine(n - 1, r - 1)}$`, `There are $${nx(N)}$ committees.`]
        : [`${A} is left out, so choose all $${r}$ members from the other $${n - 1}$.`, `$${combLine(n - 1, r)}$`, `There are $${nx(N)}$ committees.`],
    };
  }
  const [g1, g2, team, plural] = rng.pick(GROUPS);
  const a = rng.int(4, 8);
  const b = rng.int(4, 9);
  const r = rng.int(3, 5);
  const k = rng.int(1, r - 1);
  const x = comb(a, k);
  const y = comb(b, r - k);
  const N = x * y;
  return {
    prompt: `A ${r}-person ${team} is chosen from ${a} ${g1} and ${b} ${g2}. How many different ${plural} have exactly ${howMany(k, g1)}?`,
    parts: [numPart(N, { label: `${cap(plural)}:` })],
    hints: [`Choose the ${g1} **and** the ${g2} separately, then multiply.`, `Exactly ${howMany(k, g1)} means the other ${howMany(r - k, g2)}.`],
    solution: [
      `${cap(g1)}: $${combLine(a, k)}$`,
      `${cap(g2)}: $${combLine(b, r - k)}$`,
      `$${nx(x)} \\times ${nx(y)} = ${nx(N)}$`,
      `There are $${nx(N)}$ ${plural}.`,
    ],
  };
}

function casesD2(rng: Rng): GenOutput {
  const kind = rng.pick(['atLeastOne', 'atMostOne', 'cards', 'three'] as const);
  if (kind === 'cards') {
    const t = rng.pick([
      { what: 'hearts', one: 'heart', pool: 13, ks: [1, 2, 3] },
      { what: 'aces', one: 'ace', pool: 4, ks: [1, 2] },
      { what: 'face cards', one: 'face card', pool: 12, ks: [1, 2, 3] },
    ]);
    const k = rng.pick(t.ks);
    const x = comb(t.pool, k);
    const y = comb(52 - t.pool, 5 - k);
    const N = x * y;
    return {
      prompt: `${DECK}\n\nHow many 5-card hands contain exactly ${k} ${k === 1 ? t.one : t.what}?`,
      parts: [numPart(N, { label: 'Hands:' })],
      hints: [`Exactly ${k} ${k === 1 ? t.one : t.what} means the other ${5 - k} cards are **not** ${t.what}.`, `Choose the ${t.what} and the other cards separately, then multiply.`],
      solution: [
        `There are ${t.pool} ${t.what} and $52 - ${t.pool} = ${52 - t.pool}$ other cards.`,
        `${cap(t.what)}: $${combLine(t.pool, k)}$`,
        `Other cards: $${combLine(52 - t.pool, 5 - k)}$`,
        `$${nx(x)} \\times ${nx(y)} = ${nx(N)}$ hands.`,
      ],
    };
  }
  if (kind === 'three') {
    const [a, b, c] = [rng.int(4, 8), rng.int(4, 8), rng.int(4, 8)];
    const xs = [comb(a, 2), comb(b, 2), comb(c, 2)];
    const N = xs[0] * xs[1] * xs[2];
    return {
      prompt: `A school's 6-person safety committee must include exactly two students from each of Grades 10, 11 and 12. There are ${a} Grade 10, ${b} Grade 11 and ${c} Grade 12 volunteers. How many different committees are possible?`,
      parts: [numPart(N, { label: 'Committees:' })],
      hints: ['Choose 2 from each grade separately: Grade 10 **and** Grade 11 **and** Grade 12.', 'Multiply the three combinations.'],
      solution: [
        `Grade 10: $${combLine(a, 2)}$`,
        `Grade 11: $${combLine(b, 2)}$`,
        `Grade 12: $${combLine(c, 2)}$`,
        `$${times(xs)} = ${nx(N)}$ committees.`,
      ],
    };
  }
  const [g1, g2, team, plural] = rng.pick(GROUPS);
  const r = rng.int(3, 5);
  const a = rng.int(3, 7);
  const b = rng.int(r + 1, 9);
  const one = g1.replace(/s$/, '');
  if (kind === 'atLeastOne') {
    const T = comb(a + b, r);
    const none = comb(b, r);
    const N = T - none;
    return {
      prompt: `A ${r}-person ${team} is chosen from ${a} ${g1} and ${b} ${g2}. How many different ${plural} include at least one ${one}?`,
      parts: [numPart(N, { label: `${cap(plural)}:` })],
      hints: [`"At least one" has many cases. It is quicker to count the ${plural} with **no** ${g1} and subtract.`, `At least one = all ${plural} − ${plural} with none.`],
      solution: [
        `All ${plural}: $${combLine(a + b, r)}$`,
        `${cap(plural)} with no ${g1} (all ${g2}): $${combLine(b, r)}$`,
        `At least one ${one}: $${nx(T)} - ${nx(none)} = ${nx(N)}$`,
        `There are $${nx(N)}$ ${plural}.`,
      ],
    };
  }
  const c0 = comb(b, r);
  const c1 = a * comb(b, r - 1);
  const N = c0 + c1;
  return {
    prompt: `A ${r}-person ${team} is chosen from ${a} ${g1} and ${b} ${g2}. How many different ${plural} include at most one ${one}?`,
    parts: [numPart(N, { label: `${cap(plural)}:` })],
    hints: [`"At most one" means 0 ${g1} **or** exactly 1 ${one}. Count each case.`, 'The cases cannot happen together, so add them.'],
    solution: [
      `No ${g1}: $${combLine(b, r)}$`,
      `Exactly one ${one}: $${nC(a, 1)} \\times ${nC(b, r - 1)} = ${a} \\times ${nx(comb(b, r - 1))} = ${nx(c1)}$`,
      `Add the cases: $${nx(c0)} + ${nx(c1)} = ${nx(N)}$`,
      `There are $${nx(N)}$ ${plural}.`,
    ],
  };
}

function casesD3(rng: Rng): GenOutput {
  const kind = rng.pick(['twoEach', 'cardsAtLeast', 'refuse', 'poker'] as const);
  if (kind === 'twoEach') {
    const [g1, g2, team, plural] = rng.pick(GROUPS);
    const r = rng.pick([5, 6]);
    const a = rng.int(r - 1, 8);
    const b = rng.int(r - 1, 8);
    const ks = Array.from({ length: r - 3 }, (_, i) => i + 2);
    const vals = ks.map((k) => comb(a, k) * comb(b, r - k));
    const N = vals.reduce((s, v) => s + v, 0);
    return {
      prompt: `A ${r}-person ${team} is chosen from ${a} ${g1} and ${b} ${g2}. It must include at least two ${g1} and at least two ${g2}. How many different ${plural} are possible?`,
      parts: [numPart(N, { label: `${cap(plural)}:` })],
      hints: ['List the possible splits, such as 2 and 3 or 3 and 2.', 'Count each split by multiplying two combinations, then add the cases.'],
      solution: [
        `Possible splits (${g1}, ${g2}): ${ks.map((k) => `$(${k}, ${r - k})$`).join(', ')}.`,
        ...ks.map((k, i) => `$(${k}, ${r - k})$: $${nC(a, k)} \\times ${nC(b, r - k)} = ${nx(comb(a, k))} \\times ${nx(comb(b, r - k))} = ${nx(vals[i])}$`),
        `Add the cases: $${vals.map(nx).join(' + ')} = ${nx(N)}$`,
        `There are $${nx(N)}$ ${plural}.`,
      ],
    };
  }
  if (kind === 'cardsAtLeast') {
    const t = rng.pick([
      { one: 'ace', other: 'non-aces', pool: 48 },
      { one: 'heart', other: 'cards that are not hearts', pool: 39 },
      { one: 'face card', other: 'cards that are not face cards', pool: 40 },
      { one: 'red card', other: 'black cards', pool: 26 },
    ]);
    const r = rng.pick([4, 5]);
    const T = comb(52, r);
    const none = comb(t.pool, r);
    const N = T - none;
    return {
      prompt: `${DECK}\n\nHow many ${r}-card hands contain at least one ${t.one}?`,
      parts: [numPart(N, { label: 'Hands:' })],
      hints: ['Use the complement: count the hands with **none**, and subtract from all hands.', `Hands with no ${t.one} are chosen only from the ${t.pool} ${t.other}.`],
      solution: [
        `All ${r}-card hands: $${combLine(52, r)}$`,
        `Hands with no ${t.one} (all ${t.other}): $${combLine(t.pool, r)}$`,
        `At least one ${t.one}: $${nx(T)} - ${nx(none)} = ${nx(N)}$`,
        `There are $${nx(N)}$ such hands.`,
      ],
    };
  }
  if (kind === 'refuse') {
    const [A, B] = rng.sample(NAMES, 2);
    const n = rng.int(8, 14);
    const r = rng.int(3, 5);
    const T = comb(n, r);
    const both = comb(n - 2, r - 2);
    const N = T - both;
    return {
      prompt: `A ${r}-person committee is chosen from ${n} volunteers at a food bank in ${rng.pick(PLACES)}. Two of the volunteers, ${A} and ${B}, refuse to serve on the committee together. How many different committees are possible?`,
      parts: [numPart(N, { label: 'Committees:' })],
      hints: [`Count all committees, then subtract the ones with both ${A} and ${B}.`, `If both are on the committee, only ${r - 2} more members are chosen from the other ${n - 2} volunteers.`],
      solution: [
        `All committees: $${combLine(n, r)}$`,
        `Committees with both ${A} and ${B}: $${combLine(n - 2, r - 2)}$`,
        `$${nx(T)} - ${nx(both)} = ${nx(N)}$`,
        `There are $${nx(N)}$ committees.`,
      ],
    };
  }
  const full = rng.chance(0.5);
  if (full) {
    return {
      prompt: `${DECK}\n\nA full house is a 5-card hand with three cards of one rank and two cards of another rank (for example, three 8s and two Ks). How many different full houses are there?`,
      parts: [numPart(3744, { label: 'Hands:' })],
      hints: ['Choose the rank for the three cards, then which 3 of its 4 suits. Then choose a different rank for the pair, and which 2 of its 4 suits.', 'Multiply all four choices.'],
      solution: [
        `Rank for the three of a kind: $${nC(13, 1)} = 13$; its cards: $${nC(4, 3)} = 4$`,
        `Rank for the pair (a different rank): $${nC(12, 1)} = 12$; its cards: $${nC(4, 2)} = 6$`,
        '$13 \\times 4 \\times 12 \\times 6 = 3744$',
        'There are $3744$ full houses.',
      ],
    };
  }
  const r = rng.pick([5, 6]);
  const N = 13 * comb(48, r - 4);
  return {
    prompt: `${DECK}\n\nHow many ${r}-card hands contain all four cards of one rank (for example, all four 7s)?`,
    parts: [numPart(N, { label: 'Hands:' })],
    hints: ['Choose the rank first: there are 13 ranks. All 4 cards of that rank are in the hand.', `The other ${r - 4} card${r - 4 > 1 ? 's come' : ' comes'} from the 48 cards of other ranks.`],
    solution: [
      'Rank: $13$ choices, and all $4$ cards of that rank are in the hand.',
      `Remaining card${r - 4 > 1 ? 's' : ''}: $${combLine(48, r - 4)}$`,
      `$13 \\times ${nx(comb(48, r - 4))} = ${nx(N)}$`,
      `There are $${nx(N)}$ such hands.`,
    ],
  };
}

const combinationsCases = skill({
  id: 'm301-combinations-cases',
  name: 'Combinations with cases',
  description: 'Solve selection problems with conditions such as "exactly", "at least" and "at most", using cases or the complement.',
  outcomes: ['PCBT3'],
  lessonId: 'm301-9-3',
  calculator: true,
  gen: (rng, d) => (d === 1 ? casesD1(rng) : d === 2 ? casesD2(rng) : casesD3(rng)),
});

// ---------------------------------------------------------------------------
// Lesson 9.4 — Pascal's triangle and the binomial theorem
// ---------------------------------------------------------------------------

const pascalRow = (n: number) => Array.from({ length: n + 1 }, (_, k) => comb(n, k));
const rowTex = (n: number) => pascalRow(n).map(nx).join(',\\ ');

function pascalD1(rng: Rng): GenOutput {
  const kind = rng.pick(['next', 'kth', 'sum'] as const);
  if (kind === 'next') {
    const n = rng.int(5, 9);
    const row = pascalRow(n + 1);
    const prev = pascalRow(n);
    return {
      prompt: `One row of Pascal's triangle is $${rowTex(n)}$. Write the next row. Enter the numbers separated by commas.`,
      parts: [part({ kind: 'numbers', values: row }, { label: 'Next row:' })],
      hints: ['Each row starts and ends with 1.', 'Every other number is the sum of the two numbers just above it.'],
      solution: [
        'The new row starts and ends with $1$.',
        `Add neighbouring pairs: ${prev.slice(0, -1).map((v, i) => `$${v} + ${prev[i + 1]} = ${row[i + 1]}$`).join(', ')}`,
        `The next row is $${rowTex(n + 1)}$.`,
      ],
    };
  }
  const n = rng.int(6, 12);
  if (kind === 'kth') {
    const k = rng.int(3, Math.min(5, n));
    const N = comb(n, k - 1);
    return {
      prompt: `What is the ${ord(k)} number in the row of Pascal's triangle that begins $1,\\ ${n},\\ \\ldots$?`,
      parts: [numPart(N, { label: 'Number:' })],
      hints: [`The row that begins $1,\\ ${n}$ is $${nC(n, 0)},\\ ${nC(n, 1)},\\ ${nC(n, 2)},\\ \\ldots$`, `The ${ord(k)} number is $${nC(n, k - 1)}$ (the count starts at $${nC(n, 0)}$).`],
      solution: [
        `The row that begins $1,\\ ${n}$ holds $${nC(n, 0)},\\ ${nC(n, 1)},\\ ${nC(n, 2)},\\ \\ldots,\\ ${nC(n, n)}$.`,
        `The ${ord(k)} number is $${combLine(n, k - 1)}$`,
        `The ${ord(k)} number is $${nx(N)}$.`,
      ],
    };
  }
  const N = 2 ** n;
  return {
    prompt: `What is the sum of all the numbers in the row of Pascal's triangle that begins $1,\\ ${n},\\ \\ldots$?`,
    parts: [numPart(N, { label: 'Sum:' })],
    hints: ['Add up the first few rows: $1$, $1 + 1 = 2$, $1 + 2 + 1 = 4$, … Each row sum is double the one before.', `The row that begins $1,\\ n$ adds to $2^n$.`],
    solution: [
      `The row that begins $1,\\ ${n}$ holds $${nC(n, 0)},\\ ${nC(n, 1)},\\ \\ldots,\\ ${nC(n, n)}$, the coefficients of $(1 + 1)^{${n}}$.`,
      `Its sum is $(1 + 1)^{${n}} = 2^{${n}} = ${nx(N)}$`,
      `The sum is $${nx(N)}$.`,
    ],
  };
}

function pascalD2(rng: Rng): GenOutput {
  const kind = rng.pick(['identity', 'choice', 'rowsum'] as const);
  if (kind === 'identity') {
    const n = rng.int(8, 14);
    const r = rng.int(3, Math.min(6, n - 2));
    const a = comb(n, r - 1);
    const b = comb(n, r);
    const s = comb(n + 1, r);
    if (rng.chance(0.6)) {
      return {
        prompt: `Given $${nC(n, r - 1)} = ${nx(a)}$ and $${nC(n, r)} = ${nx(b)}$, use Pascal's identity to find $${nC(n + 1, r)}$.`,
        parts: [numPart(s, { label: `$${nC(n + 1, r)} =$` })],
        hints: [`Pascal's identity: $${nC('n', 'r - 1')} + ${nC('n', 'r')} = ${nC('n + 1', 'r')}$`, 'In the triangle, the two given numbers sit side by side, and the number below them is their sum.'],
        solution: [`By Pascal's identity, $${nC(n + 1, r)} = ${nC(n, r - 1)} + ${nC(n, r)}$`, `$= ${nx(a)} + ${nx(b)} = ${nx(s)}$`, `$${nC(n + 1, r)} = ${nx(s)}$`],
      };
    }
    return {
      prompt: `Given $${nC(n + 1, r)} = ${nx(s)}$ and $${nC(n, r)} = ${nx(b)}$, use Pascal's identity to find $${nC(n, r - 1)}$.`,
      parts: [numPart(a, { label: `$${nC(n, r - 1)} =$` })],
      hints: [`Pascal's identity: $${nC('n', 'r - 1')} + ${nC('n', 'r')} = ${nC('n + 1', 'r')}$`, 'Substitute the known values and subtract.'],
      solution: [`$${nC(n, r - 1)} + ${nC(n, r)} = ${nC(n + 1, r)}$`, `$${nC(n, r - 1)} + ${nx(b)} = ${nx(s)}$`, `$${nC(n, r - 1)} = ${nx(s)} - ${nx(b)} = ${nx(a)}$`],
    };
  }
  if (kind === 'choice') {
    const n = rng.int(7, 13);
    const r = rng.int(2, n - 3);
    const target = comb(n + 1, r + 1);
    const cand: Array<[number, number]> = [[2 * n, 2 * r + 1], [n + 1, r], [n, 2 * r + 1], [n + 2, r + 1], [n + 1, r + 2], [n, r + 2]];
    const ds = cand.filter(([a, b]) => b >= 0 && b <= a && comb(a, b) !== target).map(([a, b]) => `$${nC(a, b)}$`);
    return {
      prompt: `Which single combination is equal to $${nC(n, r)} + ${nC(n, r + 1)}$?`,
      parts: [part(mc(rng, `$${nC(n + 1, r + 1)}$`, ds))],
      hints: ['Two neighbouring numbers in a row of Pascal\'s triangle add to the number below them.', `$${nC('n', 'r')} + ${nC('n', 'r + 1')} = ${nC('n + 1', 'r + 1')}$`],
      solution: [
        `$${nC(n, r)}$ and $${nC(n, r + 1)}$ are neighbours in the row that begins $1,\\ ${n}$.`,
        `By Pascal's identity, their sum is the number below them: $${nC(n + 1, r + 1)}$.`,
        `Check: $${nx(comb(n, r))} + ${nx(comb(n, r + 1))} = ${nx(target)}$`,
        `The answer is $${nC(n + 1, r + 1)}$.`,
      ],
    };
  }
  const n = rng.int(6, 12);
  const S = 2 ** n;
  return {
    prompt: `The numbers in one row of Pascal's triangle add up to ${nx(S)}.\n\n(a) What is the second number in that row?\n\n(b) What is the third number in that row?`,
    parts: [numPart(n, { label: '(a) Second number:' }), numPart(comb(n, 2), { label: '(b) Third number:' })],
    hints: ['The row that begins $1,\\ n$ adds up to $2^n$.', `Find $n$ with $2^n = ${S}$. The third number is $${nC('n', 2)}$.`],
    solution: [
      `The row beginning $1,\\ n$ has sum $2^n$. $2^{${n}} = ${nx(S)}$, so $n = ${n}$.`,
      `(a) The second number is $${nC(n, 1)} = ${n}$.`,
      `(b) The third number is $${combLine(n, 2)}$`,
      `The row begins $1,\\ ${n},\\ ${comb(n, 2)}$.`,
    ],
  };
}

function pascalD3(rng: Rng): GenOutput {
  const kind = rng.pick(['blocked', 'third', 'chain'] as const);
  if (kind === 'blocked') {
    const m = rng.int(4, 6);
    const h = rng.int(3, 5);
    const bx = rng.int(1, m - 1);
    const by = rng.int(1, h - 1);
    const T = routes(m, h);
    const t1 = routes(bx, by);
    const t2 = routes(m - bx, h - by);
    const N = T - t1 * t2;
    return {
      prompt: `The map shows a grid of streets. A delivery driver goes from A to B, travelling only east (right) or north (up). The intersection marked X is closed for construction. How many different routes avoid X?`,
      figure: streetGrid(m, h, [{ x: bx, y: by, label: 'X', color: 'accent' }]),
      parts: [numPart(N, { label: 'Routes:' })],
      hints: ['Count all the routes from A to B, then subtract the routes that pass through X.', 'Or write the number of routes at each intersection, Pascal-style: each one is the sum of the numbers to its left and below. Use 0 at X.'],
      solution: [
        `All routes: ${m} E and ${h} N moves: ${routeLine(m, h)}`,
        `Routes through X: A to X ${routeLine(bx, by)}, X to B ${routeLine(m - bx, h - by)}, so $${nx(t1)} \\times ${nx(t2)} = ${nx(t1 * t2)}$`,
        `Avoiding X: $${nx(T)} - ${nx(t1 * t2)} = ${nx(N)}$`,
        `There are $${nx(N)}$ routes that avoid X.`,
      ],
    };
  }
  if (kind === 'third') {
    const n = rng.int(7, 15);
    const k = comb(n, 2);
    const N = comb(n, 3);
    return {
      prompt: `In one row of Pascal's triangle, the third number is ${k}. What is the fourth number in that row?`,
      parts: [numPart(N, { label: 'Fourth number:' })],
      hints: [`The row that begins $1,\\ n$ has third number $${nC('n', 2)} = \\dfrac{n(n - 1)}{2}$.`, 'Solve for $n$, then find the fourth number, $' + nC('n', 3) + '$.'],
      solution: [
        `$${nC('n', 2)} = \\dfrac{n(n - 1)}{2} = ${k}$, so $n^2 - n - ${2 * k} = 0$`,
        `$(n - ${n})(n + ${n - 1}) = 0$, and $n$ is positive, so $n = ${n}$.`,
        `Fourth number: $${combLine(n, 3)}$`,
        `The fourth number is $${nx(N)}$.`,
      ],
    };
  }
  const n = rng.int(6, 11);
  const r = rng.int(2, n - 2);
  const target = comb(n + 2, r + 1);
  const cand: Array<[number, number]> = [[n + 1, r + 1], [n + 2, r], [n + 2, r + 2], [n + 4, r + 1], [n, r + 1], [n + 1, r + 2]];
  const ds = cand.filter(([a, b]) => b >= 0 && b <= a && comb(a, b) !== target).map(([a, b]) => `$${nC(a, b)}$`);
  return {
    prompt: `Which single combination is equal to $${nC(n, r - 1)} + 2\\,${nC(n, r)} + ${nC(n, r + 1)}$?`,
    parts: [part(mc(rng, `$${nC(n + 2, r + 1)}$`, ds))],
    hints: [`Split the middle term: $${nC(n, r - 1)} + ${nC(n, r)} + ${nC(n, r)} + ${nC(n, r + 1)}$.`, "Use Pascal's identity on each pair, then once more on the result."],
    solution: [
      `$\\left(${nC(n, r - 1)} + ${nC(n, r)}\\right) + \\left(${nC(n, r)} + ${nC(n, r + 1)}\\right) = ${nC(n + 1, r)} + ${nC(n + 1, r + 1)}$`,
      `Apply Pascal's identity again: $${nC(n + 1, r)} + ${nC(n + 1, r + 1)} = ${nC(n + 2, r + 1)}$`,
      `Check: $${nx(comb(n, r - 1))} + 2(${nx(comb(n, r))}) + ${nx(comb(n, r + 1))} = ${nx(target)}$`,
      `The answer is $${nC(n + 2, r + 1)}$.`,
    ],
  };
}

const pascal = skill({
  id: 'm301-pascal',
  name: "Pascal's triangle",
  description: "Build rows of Pascal's triangle, relate its entries to combinations, use Pascal's identity, and count routes.",
  outcomes: ['PCBT4'],
  lessonId: 'm301-9-4',
  calculator: true,
  gen: (rng, d) => (d === 1 ? pascalD1(rng) : d === 2 ? pascalD2(rng) : pascalD3(rng)),
});

/** Terms of (ax + b)^n in descending powers of x. */
function expandTerms(a: number, b: number, n: number) {
  return Array.from({ length: n + 1 }, (_, k) => ({ k, c: comb(n, k) * a ** (n - k) * b ** k, vars: [['x', n - k]] as Array<[string, number]> }));
}

function binomD1(rng: Rng): GenOutput {
  const kind = rng.pick(['expand', 'count', 'xy'] as const);
  if (kind === 'expand') {
    if (rng.chance(0.35)) {
      const n = rng.pick([4, 5]);
      const s = rng.pick([1, -1]);
      const terms = Array.from({ length: n + 1 }, (_, k) => ({ c: comb(n, k) * s ** k, vars: [['x', n - k], ['y', k]] as Array<[string, number]> }));
      const P = polySum(terms);
      return {
        prompt: `Expand $(x ${s < 0 ? '-' : '+'} y)^{${n}}$. Write the terms in descending powers of $x$.`,
        parts: [part({ kind: 'expression', expected: P.txt, form: 'expanded' }, { label: 'Expansion:' })],
        hints: [`The coefficients come from the row of Pascal's triangle that begins $1,\\ ${n}$: $${rowTex(n)}$.`, `The powers of $x$ go down from ${n} to 0 while the powers of $y$ go up from 0 to ${n}.${s < 0 ? ' The signs alternate because the second term is $-y$.' : ''}`],
        solution: [
          `Coefficients (row $1,\\ ${n}$): $${rowTex(n)}$`,
          `$(x ${s < 0 ? '-' : '+'} y)^{${n}} = ${Array.from({ length: n + 1 }, (_, k) => `${comb(n, k)}${powFactor('x', n - k, true)}${s < 0 ? powFactor('-y', k) : powFactor('y', k, true)}`).join(' + ')}$`,
          `$= ${P.tex}$`,
        ],
      };
    }
    const n = rng.pick([3, 4]);
    const b = rng.pick([1, 2, 3, -1, -2, -3]);
    const terms = expandTerms(1, b, n);
    const P = polySum(terms);
    return {
      prompt: `Use Pascal's triangle or the binomial theorem to expand $${binomTex(1, b, n)}$. Write the terms in descending powers of $x$.`,
      parts: [part({ kind: 'expression', expected: P.txt, form: 'expanded' }, { label: 'Expansion:' })],
      hints: [`The coefficients are $${rowTex(n)}$.`, `Term $k + 1$ is $${nC(n, 'k')}\\,x^{${n} - k}(${b})^k$.`],
      solution: [
        `Coefficients (row $1,\\ ${n}$): $${rowTex(n)}$`,
        `$${binomTex(1, b, n)} = ${terms.map((t) => `${comb(n, t.k)}${powFactor('x', n - t.k, true)}${powFactor(String(b), t.k)}`).join(' + ')}$`,
        `$= ${P.tex}$`,
      ],
    };
  }
  if (kind === 'count') {
    const n = rng.int(6, 12);
    const k = rng.int(2, n - 2);
    const N = comb(n, k);
    return {
      prompt: `Consider the expansion of $(x + 1)^{${n}}$.\n\n(a) How many terms does the expansion have?\n\n(b) What is the coefficient of $x^{${k}}$?`,
      parts: [numPart(n + 1, { label: '(a) Terms:' }), numPart(N, { label: '(b) Coefficient:' })],
      hints: ['$(a + b)^n$ has one more term than its exponent.', `The term in $x^{${k}}$ is $${nC(n, n - k)}x^{${k}}(1)^{${n - k}}$, and $${nC(n, n - k)} = ${nC(n, k)}$.`],
      solution: [
        `(a) The powers of $x$ run from $${n}$ down to $0$: $${n + 1}$ terms.`,
        `(b) The term in $x^{${k}}$ uses $1^{${n - k}}$, so its coefficient is $${nC(n, n - k)} = ${nC(n, k)}$.`,
        `$${combLine(n, k)}$`,
        `(a) $${n + 1}$ terms; (b) the coefficient is $${nx(N)}$.`,
      ],
    };
  }
  const n = rng.int(5, 9);
  const k = rng.int(2, n);
  const j = k - 1;
  const T = mono(comb(n, j), [['x', n - j], ['y', j]]);
  return {
    prompt: `Find the ${ord(k)} term in the expansion of $(x + y)^{${n}}$, written in descending powers of $x$.`,
    parts: [part({ kind: 'expression', expected: T.txt, form: 'expanded' }, { label: `$t_{${k}} =$` })],
    hints: [`The general term is $t_{k + 1} = ${nC('n', 'k')}\\,x^{n - k}y^{k}$.`, `For the ${ord(k)} term, $k = ${j}$.`],
    solution: [`The ${ord(k)} term is $t_{${j} + 1}$, so $k = ${j}$.`, `$t_{${k}} = ${nC(n, j)}\\,${mono(1, [['x', n - j], ['y', j]]).tex}$, and $${combLine(n, j)}$`, `$t_{${k}} = ${T.tex}$`],
  };
}

function binomD2(rng: Rng): GenOutput {
  const kind = rng.pick(['kth', 'expand', 'xy'] as const);
  if (kind === 'kth') {
    const a = rng.pick([1, 2, 3]);
    const b = a === 1 ? rng.pick([2, 3, 4, 5, -2, -3, -4, -5]) : rng.pick([1, 2, 3, 4, 5, -1, -2, -3, -4, -5]);
    const n = rng.int(5, 8);
    const k = rng.int(2, n);
    const j = k - 1;
    const cf = comb(n, j);
    const ap = a ** (n - j);
    const bp = b ** j;
    const T = mono(cf * ap * bp, [['x', n - j]]);
    return {
      prompt: `When $${binomTex(a, b, n)}$ is expanded in descending powers of $x$, what is the ${ord(k)} term?`,
      parts: [part({ kind: 'expression', expected: T.txt, form: 'expanded' }, { label: `$t_{${k}} =$` })],
      hints: [`The general term of $(a + b)^n$ is $t_{k + 1} = ${nC('n', 'k')}\\,a^{n - k}b^{k}$. Here $a = ${axTex(a)}$ and $b = ${b}$.`, `The ${ord(k)} term has $k = ${j}$. Keep the sign of $b$ inside brackets.`],
      solution: [
        `The ${ord(k)} term is $t_{${j} + 1}$, so $k = ${j}$, with $a = ${axTex(a)}$, $b = ${b}$ and $n = ${n}$.`,
        `$t_{${k}} = ${nC(n, j)}${powFactor(axTex(a), n - j, a === 1)}${powFactor(String(b), j)}$`,
        `$= ${nx(cf)} \\times ${mono(ap, [['x', n - j]]).tex} \\times ${pn(bp)}$`,
        `$t_{${k}} = ${T.tex}$`,
      ],
    };
  }
  if (kind === 'expand') {
    const a = rng.pick([2, 3]);
    const b = rng.pick([1, 2, 3, -1, -2, -3].filter((v) => Math.abs(v) !== a));
    const n = rng.pick([3, 4]);
    const terms = expandTerms(a, b, n);
    const P = polySum(terms);
    return {
      prompt: `Expand $${binomTex(a, b, n)}$ using the binomial theorem. Write the terms in descending powers of $x$.`,
      parts: [part({ kind: 'expression', expected: P.txt, form: 'expanded' }, { label: 'Expansion:' })],
      hints: [`The coefficients from Pascal's triangle are $${rowTex(n)}$.`, `Each term is $${nC(n, 'k')}(${a}x)^{${n} - k}(${b})^{k}$. Raise the whole bracket $(${a}x)$ to the power, not just $x$.`],
      solution: [
        `$${binomTex(a, b, n)} = ${terms.map((t) => `${comb(n, t.k)}${powFactor(`${a}x`, n - t.k)}${powFactor(String(b), t.k)}`).join(' + ')}$`,
        `$= ${terms.map((t) => `${comb(n, t.k)}(${mono(a ** (n - t.k), [['x', n - t.k]]).tex})(${nx(b ** t.k)})`).join(' + ')}$`,
        `$= ${P.tex}$`,
      ],
    };
  }
  let a: number;
  let b: number;
  do {
    a = rng.pick([1, 2, 3]);
    b = rng.pick([1, 2, 3, -1, -2, -3]);
  } while (a === Math.abs(b));
  const n = rng.int(4, 7);
  const j = rng.int(1, n - 1);
  const cf = comb(n, j);
  const ap = a ** (n - j);
  const bp = b ** j;
  const T = mono(cf * ap * bp, [['x', n - j], ['y', j]]);
  const yb = axTex(b, 'y');
  const second = b < 0 ? `- ${axTex(-b, 'y')}` : `+ ${yb}`;
  return {
    prompt: `Find the term containing $${mono(1, [['x', n - j], ['y', j]]).tex}$ in the expansion of $(${axTex(a)} ${second})^{${n}}$.`,
    parts: [part({ kind: 'expression', expected: T.txt, form: 'expanded' }, { label: 'Term:' })],
    hints: [`The general term is $${nC(n, 'k')}(${axTex(a)})^{${n} - k}(${yb})^{k}$.`, `The power of $y$ is $k$, so $k = ${j}$.`],
    solution: [
      `The power of $y$ is $${j}$, so $k = ${j}$.`,
      `$t_{${j + 1}} = ${nC(n, j)}${powFactor(axTex(a), n - j, a === 1)}${powFactor(yb, j)}$`,
      `$= ${nx(cf)} \\times ${mono(ap, [['x', n - j]]).tex} \\times ${bp < 0 ? `(${mono(bp, [['y', j]]).tex})` : mono(bp, [['y', j]]).tex}$`,
      `The term is $${T.tex}$.`,
    ],
  };
}

/** (ax^p + b/x^q)^n as LaTeX. */
function recipBinomTex(a: number, p: number, b: number, q: number, n: number): string {
  const first = mono(a, [['x', p]]).tex;
  const second = `\\dfrac{${Math.abs(b)}}{${q === 1 ? 'x' : `x^{${q}}`}}`;
  return `\\left(${first} ${b < 0 ? '-' : '+'} ${second}\\right)^{${n}}`;
}

function binomD3(rng: Rng): GenOutput {
  const kind = rng.pick(['constant', 'coef', 'unknown'] as const);
  if (kind === 'unknown') {
    const n = rng.int(4, 8);
    const cube = rng.chance(0.4);
    const c = cube ? rng.pick([2, 3, -2, -3, -1]) : rng.int(2, 5);
    const e = cube ? 3 : 2;
    const K = comb(n, e) * c ** e;
    return {
      prompt: `In the expansion of $(x + c)^{${n}}$, the coefficient of $x^{${n - e}}$ is $${nx(K)}$. Find $c$${cube ? '' : ', given that $c > 0$'}.`,
      parts: [numPart(c, { label: '$c =$' })],
      hints: [`The term in $x^{${n - e}}$ is $${nC(n, e)}\\,x^{${n - e}}c^{${e}}$.`, `Set $${nC(n, e)}\\,c^{${e}} = ${nx(K)}$ and solve for $c$.`],
      solution: [
        `General term: $t_{k + 1} = ${nC(n, 'k')}\\,x^{${n} - k}c^{k}$. For $x^{${n - e}}$, $k = ${e}$.`,
        `$${nC(n, e)}\\,c^{${e}} = ${nx(K)}$, and $${nC(n, e)} = ${comb(n, e)}$`,
        `$c^{${e}} = \\dfrac{${nx(K)}}{${comb(n, e)}} = ${c ** e}$`,
        cube ? `$c = \\sqrt[3]{${c ** 3}} = ${c}$` : `$c = \\sqrt{${c * c}} = ${c}$ (since $c > 0$)`,
      ],
    };
  }
  const fam = rng.pick([
    { p: 1, q: 1, ns: [4, 6, 8] },
    { p: 2, q: 1, ns: [3, 6] },
    { p: 1, q: 2, ns: kind === 'constant' ? [3, 6] : [6] },
    { p: 3, q: 1, ns: [4, 8] },
  ]);
  const n = rng.pick(fam.ns);
  const { p, q } = fam;
  let a: number;
  let b: number;
  do {
    a = rng.pick([1, 2, 3]);
    b = rng.pick([1, 2, 3, -1, -2, -3]);
  } while (a === 1 && Math.abs(b) === 1 && rng.chance(0.7));
  const expo = (k: number) => p * n - (p + q) * k;
  let k: number;
  let target: number;
  if (kind === 'constant') {
    k = (p * n) / (p + q);
    target = 0;
  } else {
    const ks = Array.from({ length: n }, (_, i) => i + 1).filter((i) => expo(i) > 0);
    k = rng.pick(ks);
    target = expo(k);
  }
  const cf = comb(n, k);
  const ap = a ** (n - k);
  const bp = b ** k;
  const V = cf * ap * bp;
  const base = recipBinomTex(a, p, b, q, n);
  const firstT = mono(a, [['x', p]]).tex;
  const secT = `${b < 0 ? '-' : ''}${Math.abs(b)}x^{-${q}}`;
  const expTex = `${p * n} - ${p + q === 1 ? '' : p + q}k`;
  return {
    prompt: kind === 'constant' ? `Find the constant term in the expansion of $${base}$.` : `Find the coefficient of $x^{${target}}$ in the expansion of $${base}$.`,
    parts: [numPart(V, { label: kind === 'constant' ? 'Constant term:' : 'Coefficient:' })],
    hints: [`Write the second term as $${secT}$. The general term is $${nC(n, 'k')}(${firstT})^{${n} - k}(${secT})^{k}$.`, `Find the power of $x$ in the general term in terms of $k$, set it equal to $${target}$, and solve for $k$.`],
    solution: [
      `General term: $t_{k + 1} = ${nC(n, 'k')}(${firstT})^{${n} - k}(${secT})^{k} = ${nC(n, 'k')}(${a})^{${n} - k}(${b})^{k}\\,x^{${p === 1 ? '' : p}(${n} - k) - ${q === 1 ? '' : q}k}$`,
      `Power of $x$: $${p === 1 ? '' : p}(${n} - k) - ${q === 1 ? '' : q}k = ${expTex}$. Set $${expTex} = ${target}$: $k = ${k}$.`,
      `$t_{${k + 1}} = ${nC(n, k)}(${a})^{${n - k}}(${b})^{${k}}${target === 0 ? '' : `x^{${target}}`} = ${nx(cf)} \\times ${nx(ap)} \\times ${pn(bp)}${target === 0 ? '' : `\\,x^{${target}}`}$`,
      kind === 'constant' ? `The constant term is $${nx(V)}$.` : `The coefficient of $x^{${target}}$ is $${nx(V)}$.`,
    ],
  };
}

const binomialTerm = skill({
  id: 'm301-binomial-term',
  name: 'The binomial theorem',
  description: 'Expand powers of binomials and find a specific term, coefficient or constant term with the binomial theorem.',
  outcomes: ['PCBT4'],
  lessonId: 'm301-9-4',
  calculator: true,
  gen: (rng, d) => (d === 1 ? binomD1(rng) : d === 2 ? binomD2(rng) : binomD3(rng)),
});

export const COUNTING_SKILLS: SkillDef[] = [countingPrinciple, permutations, permutationsSpecial, combinations, combinationsCases, pascal, binomialTerm];
