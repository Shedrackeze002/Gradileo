/** Math 10-3 Unit 4 — Linear Measurement (M3, A1). */
import { numPart, retry, roundingPhrase, skill } from '../../helpers.ts';
import { fmt, fmtFixed, fmtGroupTex, gcd } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Part, PlaneFigure, RulerFigure, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = [
  'Amara', 'Liam', 'Priya', 'Mateo', 'Aiyana', 'Jun', 'Fatima', 'Noah', 'Harpreet', 'Olivia', 'Tariq', 'Mei',
  'Kwame', 'Chloé', 'Ravi', 'Sienna', 'Dakota', 'Ethan', 'Leilani', 'Omar', 'Nadia', 'Jaxon', 'Ayesha', 'Wei',
  'Isabelle', 'Kiran', 'Malik', 'Sofia', 'Gurpreet', 'Hiroshi', 'Zara', 'Émile', 'Thandiwe', 'Connor', 'Rosa', 'Tyler',
];

/** A quantity inside maths, e.g. q(12, 'cm') gives 12\ \text{cm}. */
const q = (v: number | string, u: string) => `${typeof v === 'number' ? fmt(v) : v}\\ \\text{${u}}`;
/** The same quantity as inline maths. */
const Q = (v: number | string, u: string) => `$${q(v, u)}$`;

const UNIT_NAME: Record<string, string> = { mm: 'millimetre', cm: 'centimetre', m: 'metre', in: 'inch', ft: 'foot' };
const UNIT_PLURAL: Record<string, string> = { mm: 'millimetres', cm: 'centimetres', m: 'metres', in: 'inches', ft: 'feet' };

/** Money for Markdown text (outside maths): \$1,234.50 */
function money(x: number): string {
  const [i, f] = fmtFixed(x, 2).split('.');
  return `\\$${i.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}.${f}`;
}

/** An amount of money inside maths: two decimals, or more when the amount has fractions of a cent. */
const amt = (x: number) => (Math.abs(x * 100 - Math.round(x * 100)) < 1e-6 ? fmtFixed(x, 2) : fmt(x, 4));

/** True when x is safely away from a rounding boundary (…5) at the given number of decimals. */
function safe(x: number, decimals: number): boolean {
  const s = Math.abs(x) * 10 ** decimals;
  return Math.abs(s - Math.floor(s) - 0.5) > 0.06;
}

/** Tenths as a number, e.g. tenths(rng, 2, 8) is a value from 2.0 to 8.0 with one decimal. */
const tenths = (rng: Rng, lo: number, hi: number) => rng.int(Math.round(lo * 10), Math.round(hi * 10)) / 10;
/** Clean floating-point noise from sums of decimals. */
const clean = (x: number) => Math.round(x * 1e6) / 1e6;

// --- Imperial fractions. Lengths are stored as whole numbers of sixteenths of an inch. ---

/** Reduced denominator (1, 2, 4, 8 or 16) of a length in sixteenths. */
function denOf(t: number): number {
  const rem = t % 16;
  return rem === 0 ? 1 : 16 / gcd(rem, 16);
}

/** LaTeX mixed number (reduced) for a length in sixteenths, e.g. 53 -> 3\tfrac{5}{16}. */
function inch(t: number): string {
  const whole = Math.floor(t / 16);
  const rem = t - whole * 16;
  if (rem === 0) return `${whole}`;
  const g = gcd(rem, 16);
  const f = `\\tfrac{${rem / g}}{${16 / g}}`;
  return whole ? `${whole}${f}` : f;
}

/** Mixed number written over a chosen denominator (not reduced), e.g. over(52, 8) -> 3\tfrac{2}{8}. */
function over(t: number, den: number): string {
  const units = t / (16 / den);
  const whole = Math.floor(units / den);
  const rem = units - whole * den;
  if (rem === 0) return `${whole}`;
  return whole ? `${whole}\\tfrac{${rem}}{${den}}` : `\\tfrac{${rem}}{${den}}`;
}

const odds = (den: number) => Array.from({ length: den / 2 }, (_, i) => 2 * i + 1);

/** A random mixed-number length (in sixteenths) whose fraction has exactly the given denominator. */
function mixedLen(rng: Rng, wLo: number, wHi: number, den: number): number {
  return rng.int(wLo, wHi) * 16 + rng.pick(odds(den)) * (16 / den);
}

/** Worked steps for adding or subtracting two mixed numbers of inches. */
function fracSteps(a: number, b: number, op: '+' | '-'): string[] {
  const da = denOf(a);
  const db = denOf(b);
  const D = Math.max(da, db, 2);
  const k = 16 / D;
  const aw = Math.floor(a / 16);
  const an = (a % 16) / k;
  const bw = Math.floor(b / 16);
  const bn = (b % 16) / k;
  const r = op === '+' ? a + b : a - b;
  const steps: string[] = [];
  if (da === db) steps.push(`Both fractions already have the denominator $${D}$.`);
  else {
    const changed = [a, b].filter((t) => denOf(t) !== D).map((t) => `$${inch(t)} = ${over(t, D)}$`);
    steps.push(`Use the common denominator $${D}$: ${changed.join(' and ')}.`);
  }
  if (op === '+') {
    const W = aw + bw;
    const N = an + bn;
    steps.push(`Add the whole numbers and add the fractions: $(${aw} + ${bw}) + \\tfrac{${an} + ${bn}}{${D}} = ${W} + \\tfrac{${N}}{${D}}$.`);
    if (N >= D) {
      steps.push(`$\\tfrac{${N}}{${D}}$ is one whole or more, so regroup: $\\tfrac{${N}}{${D}} = 1${N > D ? `\\tfrac{${N - D}}{${D}}` : ''}$. That gives $${over(r, D)}$.`);
    }
  } else {
    let w = aw;
    let n = an;
    if (an < bn) {
      w = aw - 1;
      n = an + D;
      steps.push(`You cannot take $\\tfrac{${bn}}{${D}}$ from $\\tfrac{${an}}{${D}}$, so borrow $1$ whole inch: $${over(a, D)} = ${w}\\tfrac{${n}}{${D}}$.`);
    }
    steps.push(`Subtract the whole numbers and the fractions: $(${w} - ${bw}) + \\tfrac{${n} - ${bn}}{${D}} = ${over(r, D)}$.`);
  }
  if (r % 16 !== 0 && denOf(r) !== D) steps.push(`Simplify the fraction: $${over(r, D)} = ${inch(r)}$.`);
  return steps;
}

// --- Feet and inches. Lengths are stored as whole numbers of inches. ---

const ftin = (total: number) => `${Math.floor(total / 12)}\\ \\text{ft}\\ ${total % 12}\\ \\text{in}`;
const FTIN = (total: number) => `$${ftin(total)}$`;
function ftinParts(total: number): Part[] {
  return [numPart(Math.floor(total / 12), { label: 'Feet', suffix: 'ft' }), numPart(total % 12, { label: 'Inches', suffix: 'in' })];
}

// ---------------------------------------------------------------------------
// 4.1 Reading rulers and tape measures
// ---------------------------------------------------------------------------

const METRIC_PARTS = ['bolt', 'copper fitting', 'hinge pin', 'drill bit', 'wooden dowel', 'brass screw', 'plastic shim', 'steel pin', 'piece of trim', 'gasket strip'];

const rulerMetric = skill({
  id: 'm103-ruler-metric',
  name: 'Reading a metric ruler',
  description: 'Read a metric ruler or tape measure to the nearest millimetre and give the length in centimetres or millimetres.',
  outcomes: ['M3'],
  lessonId: 'm103-4-1',
  gen(rng, d) {
    const obj = rng.pick(METRIC_PARTS);
    const name = rng.pick(NAMES);
    const rulerCm = d === 1 ? 10 : rng.pick([12, 15]);
    const startMm = d === 1 ? 0 : d === 2 && rng.chance(0.4) ? rng.int(1, 3) * 10 : rng.int(4, 35);
    const maxLen = Math.min(rulerCm * 10 - startMm - 3, d === 1 ? 95 : 115);
    const lenMm = retry(() => rng.int(d === 1 ? 15 : 25, maxLen), (v) => v % 10 !== 0);
    const endMm = startMm + lenMm;
    const s = startMm / 10;
    const e = endMm / 10;
    const L = lenMm / 10;
    const figure: RulerFigure = { type: 'ruler', system: 'metric', length: rulerCm, start: s, end: e };

    const read: string[] =
      startMm === 0
        ? [
            `The ${obj} starts at $0$.`,
            `Its right end is $${endMm % 10}$ small marks past the $${Math.floor(endMm / 10)}$ cm mark, so the length is ${Q(L, 'cm')}.`,
          ]
        : [`The left end is at ${Q(s, 'cm')} and the right end is at ${Q(e, 'cm')}.`, `Length $= ${fmt(e)} - ${fmt(s)} = ${q(L, 'cm')}$.`];
    const toMm = `Change to millimetres ($1\\ \\text{cm} = 10\\ \\text{mm}$): $${fmt(L)} \\times 10 = ${q(lenMm, 'mm')}$.`;
    const hint1 = 'Each small mark on a metric ruler is $1\\ \\text{mm}$, and $10\\ \\text{mm} = 1\\ \\text{cm}$.';
    const hint2 =
      startMm === 0
        ? `The ${obj} starts at 0. Count the whole centimetres, then the extra millimetre marks.`
        : `The ${obj} does not start at 0. Read both ends, then subtract: length = end − start.`;

    if (d === 3) {
      const diff = rng.int(3, Math.min(24, lenMm - 15));
      const tooLong = rng.chance(0.6);
      const reqMm = tooLong ? lenMm - diff : lenMm + diff;
      const reqInCm = rng.chance(0.5);
      const reqStr = reqInCm ? Q(reqMm / 10, 'cm') : Q(reqMm, 'mm');
      return {
        prompt: tooLong
          ? `${name} needs a ${obj} that is exactly ${reqStr} long. The ${obj} shown on the ruler is too long. How many **millimetres** must ${name} cut off?`
          : `${name} needs a ${obj} that is ${reqStr} long. The ${obj} shown on the ruler is too short. By how many **millimetres** is it too short?`,
        figure,
        parts: [numPart(diff, { suffix: 'mm' })],
        hints: [`First read the length of the ${obj} from the ruler. ${hint2}`, 'Write both lengths in millimetres ($1\\ \\text{cm} = 10\\ \\text{mm}$), then subtract the smaller length from the larger one.'],
        solution: [
          ...read,
          toMm,
          ...(reqInCm ? [`The length needed is ${Q(reqMm / 10, 'cm')} $= ${q(reqMm, 'mm')}$.`] : []),
          tooLong ? `Difference: $${lenMm} - ${reqMm} = ${q(diff, 'mm')}$` : `Difference: $${reqMm} - ${lenMm} = ${q(diff, 'mm')}$`,
          tooLong ? `${name} must cut off ${Q(diff, 'mm')}.` : `The ${obj} is ${Q(diff, 'mm')} too short.`,
        ],
        answerDisplay: Q(diff, 'mm'),
      };
    }

    const asMm = rng.chance(0.4);
    return {
      prompt: asMm
        ? `What is the length of the ${obj} shown? Give your answer in **millimetres**.`
        : `What is the length of the ${obj} shown? Give your answer in **centimetres**, to the nearest tenth of a centimetre.`,
      figure,
      parts: [asMm ? numPart(lenMm, { suffix: 'mm' }) : numPart(L, { decimals: 1, suffix: 'cm' })],
      hints: [hint1, hint2],
      solution: [...read, ...(asMm ? [toMm, `The ${obj} is ${Q(lenMm, 'mm')} long.`] : [`The ${obj} is ${Q(fmtFixed(L, 1), 'cm')} long.`])],
      answerDisplay: asMm ? Q(lenMm, 'mm') : Q(fmtFixed(L, 1), 'cm'),
    };
  },
});

const IMP_PARTS = ['bolt', 'piece of trim', 'shelf pin', 'copper pipe stub', 'wood screw', 'maple block', 'drawer pull', 'steel bracket', 'dowel', 'piece of PVC pipe'];

const rulerImperial = skill({
  id: 'm103-ruler-imperial',
  name: 'Reading an imperial ruler',
  description: 'Read an imperial ruler or tape measure to the nearest sixteenth of an inch.',
  outcomes: ['M3'],
  lessonId: 'm103-4-1',
  gen(rng, d) {
    const obj = rng.pick(IMP_PARTS);
    const name = rng.pick(NAMES);
    const maxEnd = 6 * 16 - 1;
    let startT = 0;
    if (d === 2 && rng.chance(0.4)) startT = rng.int(1, 2) * 16;
    if (d === 3) startT = retry(() => rng.int(3, 29), (v) => v % 16 !== 0);
    let lenT: number;
    if (d === 1) {
      lenT = retry(() => rng.pick([2, 4]) * rng.int(5, 22), (v) => v % 16 !== 0 && v > 16 && v <= 88);
    } else {
      const wMax = Math.floor((maxEnd - startT - 15) / 16);
      const extra = d === 2 ? rng.pick([1, 3, 5, 7, 9, 11, 13, 15, 2, 6, 10, 14, 4, 12]) : rng.int(1, 15);
      lenT = rng.int(1, wMax) * 16 + extra;
    }
    const endT = startT + lenT;
    const figure: RulerFigure = { type: 'ruler', system: 'imperial', length: 6, start: startT / 16, end: endT / 16, division: 16 };
    const trim = d === 3 && rng.chance(0.4);
    const reqT = trim ? retry(() => lenT - rng.int(2, 12), (v) => v % 2 === 0 && v > 8) : 0;
    const diff = lenT - reqT;

    const steps: string[] = [];
    if (startT === 0) {
      const w = Math.floor(lenT / 16);
      const r = lenT % 16;
      steps.push(`The ${obj} starts at $0$.`);
      steps.push(`Its right end is $${r}$ sixteenths past the $${w}$-inch mark, so it is $${w}\\tfrac{${r}}{16}$ in long.`);
      if (denOf(lenT) !== 16) steps.push(`Simplify the fraction: $${w}\\tfrac{${r}}{16} = ${inch(lenT)}$ in.`);
    } else if (startT % 16 === 0) {
      steps.push(`The left end is at the $${startT / 16}$-inch mark and the right end is at $${inch(endT)}$ in.`);
      steps.push(`Subtract the whole inches: $${inch(endT)} - ${startT / 16} = ${inch(lenT)}$ in.`);
    } else {
      steps.push(`The left end is at $${inch(startT)}$ in and the right end is at $${inch(endT)}$ in.`);
      steps.push(`Write both readings in sixteenths: $${inch(endT)} = \\tfrac{${endT}}{16}$ and $${inch(startT)} = \\tfrac{${startT}}{16}$.`);
      steps.push(`Length $= \\tfrac{${endT}}{16} - \\tfrac{${startT}}{16} = \\tfrac{${lenT}}{16} = ${inch(lenT)}$ in.`);
    }
    if (trim) {
      steps.push(`Length needed: $${inch(reqT)} = \\tfrac{${reqT}}{16}$ in.`);
      steps.push(`Cut off $\\tfrac{${lenT}}{16} - \\tfrac{${reqT}}{16} = \\tfrac{${diff}}{16}${denOf(diff) !== 16 ? ` = ${inch(diff)}` : ''}$ in.`);
      steps.push(`${name} must cut $${inch(diff)}$ in off the ${obj}.`);
    } else {
      steps.push(`The ${obj} is $${inch(lenT)}$ in long.`);
    }

    const hint1 = 'Each inch is split into 16 equal spaces, so the smallest space is $\\tfrac{1}{16}$ in. The longest marks are whole inches, then halves, quarters, eighths and sixteenths.';
    const hint2 =
      startT === 0
        ? 'Count the whole inches, then count the sixteenths past the last whole inch. Simplify the fraction if you can.'
        : 'The part does not start at 0. Read both ends, change them to sixteenths, then subtract: length = end − start.';
    return {
      prompt: trim
        ? `${name} needs the ${obj} shown to be $${inch(reqT)}$ in long. How much must ${name} cut off, in inches? You can type a mixed number or a fraction such as 3/16.`
        : `What is the length of the ${obj} shown, in inches? You can type a mixed number such as 2 3/8.`,
      figure,
      parts: [numPart(trim ? diff / 16 : lenT / 16, { suffix: 'in' })],
      hints: trim ? [hint2, 'Write the length you read and the length needed in sixteenths, then subtract.'] : [hint1, hint2],
      solution: steps,
      answerDisplay: `$${inch(trim ? diff : lenT)}$ in`,
    };
  },
});

// ---------------------------------------------------------------------------
// 4.2 Calculating with fractional measurements
// ---------------------------------------------------------------------------

interface FracCtx {
  op: '+' | '-';
  wholes: (rng: Rng) => [number, number];
  text: (name: string, a: string, b: string) => string;
  answer: (r: string) => string;
}

const FRAC_CTX: FracCtx[] = [
  {
    op: '+',
    wholes: (rng) => [rng.int(8, 30), rng.int(6, 24)],
    text: (n, a, b) => `${n} cuts two pieces of baseboard trim, ${a} and ${b} long, and fits them end to end along a wall. What is their total length?`,
    answer: (r) => `The total length is ${r}.`,
  },
  {
    op: '+',
    wholes: (rng) => [rng.int(12, 36), rng.int(1, 3)],
    text: (n, a, b) => `A kitchen cabinet is ${a} wide. ${n} fastens a filler strip ${b} wide beside it. What is the total width of the cabinet and filler strip?`,
    answer: (r) => `The total width is ${r}.`,
  },
  {
    op: '+',
    wholes: (rng) => [rng.int(6, 30), rng.int(4, 18)],
    text: (n, a, b) => `${n}, a plumber, joins a ${a} piece of copper pipe to a ${b} piece, end to end. How long is the joined pipe?`,
    answer: (r) => `The joined pipe is ${r} long.`,
  },
  {
    op: '+',
    wholes: (rng) => [rng.int(5, 14), rng.int(1, 4)],
    text: (n, a, b) => `A photo is ${a} tall. The frame ${n} is building adds ${b} to its height. How tall is the framed photo?`,
    answer: (r) => `The framed photo is ${r} tall.`,
  },
  {
    op: '-',
    wholes: (rng) => {
      const a = rng.int(20, 40);
      return [a, a - rng.int(1, 4)];
    },
    text: (n, a, b) => `A shelf board is ${a} long, but the space between the cabinet walls is only ${b} wide. How much must ${n} cut off the board?`,
    answer: (r) => `${r} must be cut off.`,
  },
  {
    op: '-',
    wholes: (rng) => [rng.int(18, 36), rng.int(4, 15)],
    text: (n, a, b) => `A length of PVC pipe is ${a} long. ${n} cuts off ${b}. Ignoring the saw cut, how long is the piece that is left?`,
    answer: (r) => `The piece left is ${r} long.`,
  },
  {
    op: '-',
    wholes: (rng) => [rng.int(12, 30), rng.int(3, 10)],
    text: (n, a, b) => `${n}, a welder, has a piece of flat bar ${a} long and cuts a ${b} piece from it. Ignoring the cut, how long is the rest of the bar?`,
    answer: (r) => `The rest of the bar is ${r} long.`,
  },
  {
    op: '-',
    wholes: (rng) => {
      const a = rng.int(5, 10);
      return [a, a - rng.int(1, 3)];
    },
    text: (n, a, b) => `A carriage bolt is ${a} long. ${n} pushes it through a beam that is ${b} thick. How much of the bolt sticks out past the beam?`,
    answer: (r) => `${r} of the bolt sticks out.`,
  },
];

const ANSWER_HINT = 'Give your answer in inches. You can type a mixed number such as 5 13/16.';

const fracInchOps = skill({
  id: 'm103-frac-inch-ops',
  name: 'Adding and subtracting fractions of an inch',
  description: 'Add and subtract imperial measurements given as mixed numbers of inches, including problems with saw kerf.',
  outcomes: ['M3'],
  lessonId: 'm103-4-2',
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 3) {
      if (rng.chance(0.55)) {
        // Cutting pieces with a saw kerf.
        const boardIn = rng.pick([48, 60, 72, 96, 120]);
        const LT = boardIn * 16;
        const n = rng.int(2, 5);
        const kerf = rng.pick([2, 2, 1]);
        const pT = retry(
          () => mixedLen(rng, Math.floor((0.45 * boardIn) / n), Math.floor((0.85 * boardIn) / n), rng.pick([4, 8, 16])),
          (p) => LT - n * (p + kerf) >= 16,
        );
        const piecesT = n * pT;
        const kerfT = n * kerf;
        const used = piecesT + kerfT;
        const left = LT - used;
        const dp = denOf(pT);
        const P = pT / (16 / dp);
        const mat = rng.pick(['board', 'piece of oak', 'length of cedar', 'plank']);
        return {
          prompt: `${name} has a ${mat} $${boardIn}$ in long and cuts $${n}$ pieces from it, each $${inch(pT)}$ in long, making $${n}$ saw cuts. Each cut turns $${inch(kerf)}$ in of wood into sawdust (this is the **saw kerf**). How long is the leftover piece? ${ANSWER_HINT}`,
          parts: [numPart(left / 16, { suffix: 'in' })],
          hints: ['The board has to cover the pieces **and** the sawdust from every cut.', 'Find the total length of the pieces, add the total kerf, then subtract from the length of the board.'],
          solution: [
            `Length of the pieces: $${n} \\times ${inch(pT)} = ${n} \\times \\tfrac{${P}}{${dp}} = \\tfrac{${n * P}}{${dp}} = ${inch(piecesT)}$ in.`,
            `Sawdust from $${n}$ cuts: $${n} \\times ${inch(kerf)} = ${inch(kerfT)}$ in.`,
            `Total used: $${inch(piecesT)} + ${inch(kerfT)} = ${inch(used)}$ in.`,
            `Leftover: $${boardIn} - ${inch(used)} = ${inch(left)}$ in.`,
            `The leftover piece is $${inch(left)}$ in long.`,
          ],
          answerDisplay: `$${inch(left)}$ in`,
        };
      }
      // Bolt length through a stack of materials.
      const lumber = rng.sample(
        [
          { t: 24, what: 'a 2 × 6 board' },
          { t: 12, what: 'a 1 × 4 board' },
          { t: 56, what: 'a 4 × 4 post' },
          { t: 88, what: 'a 6 × 6 post' },
          { t: 18, what: 'a piece of plywood' },
        ],
        2,
      );
      const washer = rng.pick([1, 2, 3]);
      const nut = rng.pick([5, 6, 7, 8]);
      const extra = rng.pick([4, 6, 8]);
      const total = lumber[0].t + lumber[1].t + 2 * washer + nut + extra;
      const sixteenths = [lumber[0].t, lumber[1].t, 2 * washer, nut, extra];
      return {
        prompt: `${name} is bolting ${lumber[0].what} ($${inch(lumber[0].t)}$ in thick) to ${lumber[1].what} ($${inch(lumber[1].t)}$ in thick). There is a washer $${inch(washer)}$ in thick on each side, then a nut $${inch(nut)}$ in thick, and the bolt should stick out $${inch(extra)}$ in past the nut. What is the shortest bolt ${name} can use? ${ANSWER_HINT}`,
        parts: [numPart(total / 16, { suffix: 'in' })],
        hints: ['List everything the bolt must pass through. Remember there are **two** washers.', 'Change every thickness to sixteenths of an inch, add, then write the answer as a mixed number.'],
        solution: [
          `Two washers: $2 \\times ${inch(washer)} = ${inch(2 * washer)}$ in.`,
          `In sixteenths: $${sixteenths.map((t) => `\\tfrac{${t}}{16}`).join(' + ')} = \\tfrac{${total}}{16}$`,
          `$\\tfrac{${total}}{16} = ${inch(total)}$ in.`,
          `The shortest bolt is $${inch(total)}$ in long.`,
        ],
        answerDisplay: `$${inch(total)}$ in`,
      };
    }

    const ctx = rng.pick(FRAC_CTX);
    const [aw, bw] = ctx.wholes(rng);
    let a = 0;
    let b = 0;
    for (let i = 0; i < 60; i++) {
      let da: number;
      let db: number;
      if (d === 1) {
        da = rng.pick([4, 8]);
        db = rng.pick([2, 4, da]);
      } else {
        da = rng.pick([2, 4, 8, 16]);
        db = rng.pick([4, 8, 16].filter((x) => x !== da));
        if (rng.chance(0.5)) [da, db] = [db, da];
      }
      a = aw * 16 + rng.pick(odds(da)) * (16 / da);
      b = bw * 16 + rng.pick(odds(db)) * (16 / db);
      if (ctx.op === '+') break;
      // Subtraction: a > b, no borrowing at level 1.
      if (a > b && a % 16 !== b % 16 && (d === 2 || a % 16 > b % 16)) break;
    }
    const r = ctx.op === '+' ? a + b : a - b;
    const R = `$${inch(r)}$ in`;
    return {
      prompt: `${ctx.text(name, `$${inch(a)}$ in`, `$${inch(b)}$ in`)} ${ANSWER_HINT}`,
      parts: [numPart(r / 16, { suffix: 'in' })],
      hints: [
        ctx.op === '+' ? 'This is an addition question. Add the whole numbers and the fractions separately.' : 'This is a subtraction question. Subtract the whole numbers and the fractions separately.',
        `Give the fractions a common denominator first.${ctx.op === '-' ? ' If the top fraction is too small, borrow 1 inch.' : ' If the fractions add to more than 1, regroup.'}`,
      ],
      solution: [`Calculate $${inch(a)} ${ctx.op === '+' ? '+' : '-'} ${inch(b)}$.`, ...fracSteps(a, b, ctx.op), ctx.answer(R)],
      answerDisplay: R,
    };
  },
});

interface FtInCtx {
  op: '+' | '-';
  ft: (rng: Rng) => [number, number];
  text: (name: string, a: string, b: string) => string;
  answer: (r: string) => string;
}

const FTIN_CTX: FtInCtx[] = [
  {
    op: '+',
    ft: (rng) => [rng.int(6, 12), rng.int(6, 12)],
    text: (n, a, b) => `${n} lays two fence rails end to end. One is ${a} long and the other is ${b} long. What is their total length?`,
    answer: (r) => `The total length is ${r}.`,
  },
  {
    op: '+',
    ft: (rng) => [rng.int(4, 5), rng.int(5, 8)],
    text: (n, a, b) => `${n} is hauling a load on a flatbed trailer. The deck is ${a} above the road and the load is ${b} tall. How high above the road is the top of the load?`,
    answer: (r) => `The top of the load is ${r} above the road.`,
  },
  {
    op: '+',
    ft: (rng) => [rng.int(5, 12), rng.int(3, 9)],
    text: (n, a, b) => `${n} is installing a countertop in two sections, ${a} and ${b} long, placed end to end. What is the total length of the countertop?`,
    answer: (r) => `The countertop is ${r} long.`,
  },
  {
    op: '-',
    ft: (rng) => [rng.int(12, 14), rng.int(9, 11)],
    text: (n, a, b) => `A shop door opening is ${a} high. ${n}’s truck is ${b} tall. How much clearance is there above the truck?`,
    answer: (r) => `There is ${r} of clearance.`,
  },
  {
    op: '-',
    ft: (rng) => [rng.int(12, 20), rng.int(3, 9)],
    text: (n, a, b) => `${n} has a pipe ${a} long and cuts off a piece ${b} long. Ignoring the saw cut, how long is the piece that is left?`,
    answer: (r) => `The piece left is ${r} long.`,
  },
  {
    op: '-',
    ft: (rng) => [rng.int(12, 20), rng.int(5, 10)],
    text: (n, a, b) => `A kitchen wall is ${a} long. ${n} installs a row of cabinets ${b} long against it. How much of the wall is not covered by cabinets?`,
    answer: (r) => `${r} of the wall is not covered.`,
  },
];

const FTIN_PROMPT = 'Give your answer in feet and inches, with fewer than 12 inches.';

const ftInOps = skill({
  id: 'm103-ft-in-ops',
  name: 'Adding and subtracting feet and inches',
  description: 'Add and subtract measurements in feet and inches, regrouping 12 inches as 1 foot.',
  outcomes: ['M3'],
  lessonId: 'm103-4-2',
  gen(rng, d) {
    const name = rng.pick(NAMES);
    const regroup = (W: number, I: number): string[] =>
      I >= 12
        ? [`$${I}\\ \\text{in}$ is 12 inches or more, so regroup: $${I}\\ \\text{in} = ${Math.floor(I / 12)}\\ \\text{ft}\\ ${I % 12}\\ \\text{in}$. That gives ${FTIN(W * 12 + I)}.`]
        : [];

    if (d === 3) {
      const mode = rng.pick(['three', 'times', 'leftover'] as const);
      if (mode === 'three') {
        const xs = [0, 1, 2].map(() => rng.int(3, 9) * 12 + rng.int(4, 11));
        const W = xs.reduce((s, x) => s + Math.floor(x / 12), 0);
        const I = xs.reduce((s, x) => s + (x % 12), 0);
        const total = W * 12 + I;
        return {
          prompt: `${name} needs three pieces of ${rng.pick(['crown moulding for a room', 'eavestrough for a house', 'steel pipe for a job', 'baseboard for a hallway'])}: ${FTIN(xs[0])}, ${FTIN(xs[1])} and ${FTIN(xs[2])}. What is the total length? ${FTIN_PROMPT}`,
          parts: ftinParts(total),
          hints: ['Add all the feet, then add all the inches.', 'Every 12 inches makes 1 more foot. Divide the inches by 12 to regroup.'],
          solution: [
            `Feet: $${xs.map((x) => Math.floor(x / 12)).join(' + ')} = ${W}\\ \\text{ft}$`,
            `Inches: $${xs.map((x) => x % 12).join(' + ')} = ${I}\\ \\text{in}$`,
            ...regroup(W, I),
            `The total length is ${FTIN(total)}.`,
          ],
          answerDisplay: FTIN(total),
        };
      }
      if (mode === 'times') {
        const n = rng.int(3, 6);
        const x = rng.int(2, 6) * 12 + rng.int(5, 11);
        const W = n * Math.floor(x / 12);
        const I = n * (x % 12);
        const total = n * x;
        const what = rng.pick(['shelves', 'stair treads', 'fence boards', 'pieces of conduit']);
        return {
          prompt: `${name} is cutting $${n}$ ${what}, each ${FTIN(x)} long. What total length of material is needed? Ignore the saw cuts. ${FTIN_PROMPT}`,
          parts: ftinParts(total),
          hints: [`Multiply the feet by $${n}$ and the inches by $${n}$ separately.`, 'Then regroup: every 12 inches is 1 foot.'],
          solution: [
            `$${n} \\times (${ftin(x)}) = ${n * Math.floor(x / 12)}\\ \\text{ft}\\ ${n * (x % 12)}\\ \\text{in}$`,
            ...regroup(W, I),
            `${name} needs ${FTIN(total)} of material.`,
          ],
          answerDisplay: FTIN(total),
        };
      }
      const boardFt = rng.pick([12, 14, 16, 20]);
      const k = rng.int(2, 3);
      const x = retry(
        () => rng.int(2, 6) * 12 + rng.int(1, 11),
        (v) => boardFt * 12 - k * v >= 6 && (k * v) % 12 !== 0,
      );
      const used = k * x;
      const left = boardFt * 12 - used;
      const usedW = k * Math.floor(x / 12);
      const usedI = k * (x % 12);
      const uw = Math.floor(used / 12);
      const ui = used % 12;
      return {
        prompt: `${name} cuts $${k}$ pieces, each ${FTIN(x)} long, from a board $${boardFt}$ ft long. Ignoring the saw cuts, how long is the piece that is left? ${FTIN_PROMPT}`,
        parts: ftinParts(left),
        hints: ['First find the total length of the pieces, then subtract it from the board.', `To subtract from $${boardFt}\\ \\text{ft}\\ 0\\ \\text{in}$, borrow 1 foot as 12 inches.`],
        solution: [
          `Pieces: $${k} \\times (${ftin(x)}) = ${usedW}\\ \\text{ft}\\ ${usedI}\\ \\text{in}$${usedI >= 12 ? ` $= ${ftin(used)}$` : ''}.`,
          `Borrow 1 foot from the board: $${boardFt}\\ \\text{ft}\\ 0\\ \\text{in} = ${boardFt - 1}\\ \\text{ft}\\ 12\\ \\text{in}$.`,
          `Subtract: $(${boardFt - 1} - ${uw})\\ \\text{ft}\\ (12 - ${ui})\\ \\text{in} = ${ftin(left)}$`,
          `The piece left is ${FTIN(left)} long.`,
        ],
        answerDisplay: FTIN(left),
      };
    }

    const ctx = rng.pick(FTIN_CTX);
    let a = 0;
    let b = 0;
    for (let i = 0; i < 80; i++) {
      const [af, bf] = ctx.ft(rng);
      const ai = rng.int(1, 11);
      const bi = rng.int(1, 11);
      a = af * 12 + ai;
      b = bf * 12 + bi;
      const carry = ctx.op === '+' ? ai + bi >= 12 : ai < bi;
      if (ctx.op === '-' && (a <= b || ai === bi)) continue;
      if (carry === (d === 2)) break;
    }
    const ai = a % 12;
    const bi = b % 12;
    const af = Math.floor(a / 12);
    const bf = Math.floor(b / 12);
    const r = ctx.op === '+' ? a + b : a - b;
    const steps: string[] = [];
    if (ctx.op === '+') {
      steps.push(`Add the feet and the inches separately: $(${af} + ${bf})\\ \\text{ft}\\ (${ai} + ${bi})\\ \\text{in} = ${af + bf}\\ \\text{ft}\\ ${ai + bi}\\ \\text{in}$`);
      steps.push(...regroup(af + bf, ai + bi));
    } else {
      let f = af;
      let i = ai;
      if (ai < bi) {
        f = af - 1;
        i = ai + 12;
        steps.push(`You cannot take $${bi}\\ \\text{in}$ from $${ai}\\ \\text{in}$, so borrow 1 foot (12 inches): ${FTIN(a)} $= ${f}\\ \\text{ft}\\ ${i}\\ \\text{in}$.`);
      }
      steps.push(`Subtract the feet and the inches separately: $(${f} - ${bf})\\ \\text{ft}\\ (${i} - ${bi})\\ \\text{in} = ${ftin(r)}$`);
    }
    steps.push(ctx.answer(FTIN(r)));
    return {
      prompt: `${ctx.text(name, FTIN(a), FTIN(b))} ${FTIN_PROMPT}`,
      parts: ftinParts(r),
      hints: [
        ctx.op === '+' ? 'Add the feet to the feet and the inches to the inches.' : 'Subtract the feet from the feet and the inches from the inches.',
        ctx.op === '+' ? 'If you end up with 12 inches or more, change 12 inches into 1 foot.' : 'If you do not have enough inches, borrow 1 foot and add 12 inches.',
      ],
      solution: steps,
      answerDisplay: FTIN(r),
    };
  },
});

// ---------------------------------------------------------------------------
// 4.3 Perimeter and circumference
// ---------------------------------------------------------------------------

interface RectCtx {
  thing: string;
  job: string;
  u: string;
  l: [number, number];
  w: [number, number];
}

const RECTS: RectCtx[] = [
  { thing: 'garden', job: 'edging', u: 'm', l: [5, 15], w: [2, 9] },
  { thing: 'deck', job: 'railing', u: 'ft', l: [12, 24], w: [8, 16] },
  { thing: 'pasture', job: 'fencing', u: 'm', l: [60, 180], w: [40, 120] },
  { thing: 'window', job: 'trim', u: 'in', l: [30, 60], w: [20, 48] },
  { thing: 'sandbox', job: 'a wooden border', u: 'ft', l: [6, 12], w: [4, 10] },
  { thing: 'dog run', job: 'fencing', u: 'm', l: [6, 20], w: [3, 8] },
  { thing: 'backyard rink', job: 'boards', u: 'ft', l: [30, 60], w: [20, 40] },
];

function planFigure(points: Array<[number, number]>, w: number, h: number): PlaneFigure {
  return {
    type: 'plane',
    grid: { xMin: 0, xMax: w + 2, yMin: 0, yMax: h + 2, step: 1 },
    polylines: [{ points: points.map(([x, y]) => [x + 1, y + 1] as [number, number]) }],
    hideTickLabels: true,
    caption: 'Floor plan on a grid',
  };
}

const perimeter = skill({
  id: 'm103-perimeter',
  name: 'Perimeter of polygons and composite shapes',
  description: 'Find the perimeter of rectangles, triangles, regular polygons and composite shapes such as L-shapes.',
  outcomes: ['M3'],
  lessonId: 'm103-4-3',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      const c = rng.pick(RECTS);
      if (rng.chance(0.3)) {
        const s = rng.int(c.w[0], c.w[1]);
        const P = 4 * s;
        return {
          prompt: `${name} is putting ${c.job} around a square ${c.thing} with sides of ${Q(s, c.u)}. What is the perimeter of the ${c.thing}?`,
          parts: [numPart(P, { suffix: c.u })],
          hints: ['Perimeter is the total distance around the outside of a shape.', 'A square has four equal sides, so $P = 4s$.'],
          solution: ['For a square, $P = 4s$.', `$P = 4 \\times ${s} = ${P}$`, `The perimeter is ${Q(P, c.u)}.`],
          answerDisplay: Q(P, c.u),
        };
      }
      const l = rng.int(c.l[0], c.l[1]);
      const w = rng.int(c.w[0], Math.min(c.w[1], l - 1));
      const P = 2 * (l + w);
      return {
        prompt: `${name} is putting ${c.job} around a rectangular ${c.thing} that measures ${Q(l, c.u)} by ${Q(w, c.u)}. What is the perimeter of the ${c.thing}?`,
        parts: [numPart(P, { suffix: c.u })],
        hints: ['Perimeter is the total distance around the outside of a shape.', 'For a rectangle, add the length and the width, then double: $P = 2(l + w)$.'],
        solution: ['For a rectangle, $P = 2(l + w)$.', `$P = 2(${l} + ${w}) = 2(${l + w}) = ${P}$`, `The perimeter is ${Q(P, c.u)}.`],
        answerDisplay: Q(P, c.u),
      };
    }

    if (d === 2) {
      const mode = rng.pick(['rect', 'triangle', 'polygon', 'grid', 'mixed'] as const);
      if (mode === 'rect') {
        const thing = rng.pick(['patio', 'greenhouse floor', 'vegetable garden', 'garage floor', 'chicken run']);
        const l = tenths(rng, 3, 15);
        const w = tenths(rng, 1.5, l - 0.5);
        const P = clean(2 * (l + w));
        return {
          prompt: `A rectangular ${thing} is ${Q(l, 'm')} long and ${Q(w, 'm')} wide. What is its perimeter?`,
          parts: [numPart(P, { suffix: 'm' })],
          hints: ['Perimeter is the distance all the way around.', 'Use $P = 2(l + w)$: add the length and width, then double.'],
          solution: ['$P = 2(l + w)$', `$P = 2(${fmt(l)} + ${fmt(w)}) = 2(${fmt(clean(l + w))}) = ${fmt(P)}$`, `The perimeter is ${Q(P, 'm')}.`],
          answerDisplay: Q(P, 'm'),
        };
      }
      if (mode === 'triangle') {
        const thing = rng.pick(['triangular flower bed', 'triangular lot', 'triangular sail', 'triangular concrete pad']);
        const a = tenths(rng, 2, 8);
        const b = tenths(rng, 2, 8);
        const c = tenths(rng, Math.abs(a - b) + 0.5, a + b - 0.5);
        const P = clean(a + b + c);
        return {
          prompt: `A ${thing} has sides of ${Q(a, 'm')}, ${Q(b, 'm')} and ${Q(c, 'm')}. What is its perimeter?`,
          parts: [numPart(P, { suffix: 'm' })],
          hints: ['Perimeter is the distance all the way around the shape.', 'Add the three side lengths.'],
          solution: [`$P = ${fmt(a)} + ${fmt(b)} + ${fmt(c)}$`, `$P = ${fmt(P)}$`, `The perimeter is ${Q(P, 'm')}.`],
          answerDisplay: Q(P, 'm'),
        };
      }
      if (mode === 'polygon') {
        const poly = rng.pick([
          { n: 6, shape: 'regular hexagon', thing: 'gazebo floor' },
          { n: 8, shape: 'regular octagon', thing: 'hot tub deck' },
          { n: 5, shape: 'regular pentagon', thing: 'sandbox' },
          { n: 6, shape: 'regular hexagon', thing: 'patio' },
        ]);
        const metric = rng.chance(0.6);
        const u = metric ? 'm' : 'ft';
        const s = metric ? tenths(rng, 1.2, 3.6) : rng.int(6, 15) / 2;
        const P = clean(poly.n * s);
        return {
          prompt: `A ${poly.thing} is shaped like a ${poly.shape}. Each side is ${Q(s, u)} long. What is the perimeter of the ${poly.thing}?`,
          parts: [numPart(P, { suffix: u })],
          hints: [`A regular polygon has all sides the same length. How many sides does a ${poly.shape.replace('regular ', '')} have?`, `Multiply the side length by the number of sides: $P = ${poly.n}s$.`],
          solution: [`A ${poly.shape.replace('regular ', '')} has $${poly.n}$ equal sides.`, `$P = ${poly.n} \\times ${fmt(s)} = ${fmt(P)}$`, `The perimeter is ${Q(P, u)}.`],
          answerDisplay: Q(P, u),
        };
      }
      if (mode === 'grid') {
        const scale = rng.pick([
          { s: 1, u: 'm' },
          { s: 2, u: 'ft' },
          { s: 0.5, u: 'm' },
          { s: 3, u: 'ft' },
        ]);
        const W = rng.int(7, 12);
        const H = rng.int(5, 9);
        const room = rng.pick(['workshop', 'garage', 'basement suite', 'shop floor', 'barn']);
        let pts: Array<[number, number]>;
        let edges: number[];
        if (rng.chance(0.55)) {
          const a = rng.int(2, W - 3);
          const b = rng.int(2, H - 2);
          pts = [[0, 0], [W, 0], [W, H - b], [W - a, H - b], [W - a, H], [0, H], [0, 0]];
          edges = [W, H - b, a, b, W - a, H];
        } else {
          const a = rng.int(2, W - 4);
          const x = rng.int(1, W - a - 1);
          const b = rng.int(1, H - 2);
          pts = [[0, 0], [W, 0], [W, H], [x + a, H], [x + a, H - b], [x, H - b], [x, H], [0, H], [0, 0]];
          edges = [W, H, W - x - a, b, a, b, x, H];
        }
        const n = edges.reduce((s, e) => s + e, 0);
        const P = clean(n * scale.s);
        return {
          prompt: `The floor plan of a ${room} is drawn on a grid. Each grid square is ${Q(scale.s, scale.u)} wide. What is the perimeter of the ${room}?`,
          figure: planFigure(pts, W, H),
          parts: [numPart(P, { suffix: scale.u })],
          hints: ['Trace around the outside edge and count the grid units along each side.', `Add the side lengths in grid units, then multiply by ${Q(scale.s, scale.u)} per square.`],
          solution: [
            `Going around the outside, the sides are $${edges.join(' + ')} = ${n}$ grid units.`,
            `Each grid unit is ${Q(scale.s, scale.u)}, so $P = ${n} \\times ${fmt(scale.s)} = ${fmt(P)}$.`,
            `The perimeter is ${Q(P, scale.u)}.`,
          ],
          answerDisplay: Q(P, scale.u),
        };
      }
      const item = rng.pick([
        { thing: 'table top', l: [1.2, 2.4], w: [60, 100], job: 'edge banding' },
        { thing: 'workbench top', l: [1.5, 3], w: [50, 90], job: 'a metal edge strip' },
        { thing: 'countertop', l: [2, 3.6], w: [60, 65], job: 'edge trim' },
      ]);
      const l = tenths(rng, item.l[0], item.l[1]);
      const wcm = rng.int(item.w[0] / 5, item.w[1] / 5) * 5;
      const wm = wcm / 100;
      const P = clean(2 * (l + wm));
      return {
        prompt: `A rectangular ${item.thing} is ${Q(l, 'm')} long and ${Q(wcm, 'cm')} wide. ${name} is putting ${item.job} around it. What is its perimeter in **metres**?`,
        parts: [numPart(P, { suffix: 'm' })],
        hints: ['Both measurements must be in the same unit before you add them.', 'Change centimetres to metres by dividing by 100, then use $P = 2(l + w)$.'],
        solution: [`Change the width to metres: $${wcm} \\div 100 = ${fmt(wm)}\\ \\text{m}$.`, `$P = 2(${fmt(l)} + ${fmt(wm)}) = 2(${fmt(clean(l + wm))}) = ${fmt(P)}$`, `The perimeter is ${Q(P, 'm')}.`],
        answerDisplay: Q(P, 'm'),
      };
    }

    // Level 3: composite shapes.
    const mode = rng.pick(['L', 'U', 'fence', 'round'] as const);
    if (mode === 'L') {
      const u = rng.pick(['m', 'ft']);
      const room = rng.pick(['room', 'deck', 'patio', 'shop floor']);
      const L = rng.int(8, 16) * (u === 'ft' ? 2 : 1);
      const W = rng.int(6, Math.min(12, L / (u === 'ft' ? 2 : 1) - 1)) * (u === 'ft' ? 2 : 1);
      const a = rng.int(2, L - 3);
      const b = rng.int(2, W - 2);
      const P = 2 * (L + W);
      return {
        prompt: `An L-shaped ${room} is a ${Q(L, u)} by ${Q(W, u)} rectangle with a ${Q(a, u)} by ${Q(b, u)} rectangle cut out of one corner (the ${Q(a, u)} side of the cut-out runs along the ${Q(L, u)} side). What is the perimeter of the ${room}?`,
        parts: [numPart(P, { suffix: u })],
        hints: ['Sketch the shape and label all six sides. Two of the sides are not given.', 'A missing side is the full side minus the cut-out part. Then add all six sides.'],
        solution: [
          `The ${room} has six sides. Two of them are shortened by the cut-out: $${L} - ${a} = ${L - a}$ and $${W} - ${b} = ${W - b}$.`,
          `The other four sides are $${L}$, $${W}$, $${a}$ and $${b}$.`,
          `$P = ${L} + ${W} + ${L - a} + ${W - b} + ${a} + ${b} = ${P}$`,
          `The perimeter is ${Q(P, u)}. (Notice it equals the perimeter of the full ${L} by ${W} rectangle.)`,
        ],
        answerDisplay: Q(P, u),
      };
    }
    if (mode === 'U') {
      const L = rng.int(10, 20);
      const W = rng.int(6, 12);
      const a = rng.int(2, L - 6);
      const b = rng.int(1, W - 3);
      const P = 2 * L + 2 * W + 2 * b;
      return {
        prompt: `A rectangular garden is ${Q(L, 'm')} long and ${Q(W, 'm')} wide, but a shed sits in a notch ${Q(a, 'm')} wide and ${Q(b, 'm')} deep in the middle of one long side. ${name} puts edging all the way around the garden, including around the notch. How much edging is needed?`,
        parts: [numPart(P, { suffix: 'm' })],
        hints: ['Sketch the garden. The notched side is made of two straight pieces plus the three sides of the notch.', 'The two straight pieces on the notched side add to the long side minus the notch width. The notch adds its width plus two depths.'],
        solution: [
          `The three plain sides: $${L} + ${W} + ${W} = ${L + 2 * W}$`,
          `Notched side: the two straight pieces add to $${L} - ${a} = ${L - a}$, and the notch adds $${b} + ${a} + ${b} = ${a + 2 * b}$.`,
          `$P = ${L + 2 * W} + ${L - a} + ${a + 2 * b} = ${P}$`,
          `${name} needs ${Q(P, 'm')} of edging.`,
        ],
        answerDisplay: Q(P, 'm'),
      };
    }
    if (mode === 'fence') {
      const metric = rng.chance(0.5);
      const u = metric ? 'm' : 'ft';
      const l = metric ? rng.int(10, 30) : rng.int(20, 60);
      const w = metric ? rng.int(6, 18) : rng.int(12, 40);
      const g = metric ? rng.pick([1, 1.2, 1.5, 2]) : rng.pick([3, 4, 5]);
      const F = clean(l + 2 * w - g);
      return {
        prompt: `${name} is fencing a rectangular pen against the side of a barn, so the barn wall is one side and needs no fence. The pen is ${Q(l, u)} along the barn and sticks out ${Q(w, u)} from it. A gate ${Q(g, u)} wide (bought separately) goes in the fence. How much fencing does ${name} need?`,
        parts: [numPart(F, { suffix: u })],
        hints: ['Sketch the pen. Which sides need fencing?', 'Fence = the side opposite the barn + the two sides sticking out − the gate.'],
        solution: [
          `Three sides need fencing: one ${Q(l, u)} side and two ${Q(w, u)} sides.`,
          `$${l} + 2(${w}) = ${l + 2 * w}$`,
          `Subtract the gate: $${l + 2 * w} - ${fmt(g)} = ${fmt(F)}$`,
          `${name} needs ${Q(F, u)} of fencing.`,
        ],
        answerDisplay: Q(F, u),
      };
    }
    const track = rng.chance(0.4);
    const L = track ? rng.int(80, 100) : tenths(rng, 1.2, 2.4);
    const dec = track ? 1 : 2;
    let D = track ? rng.int(60, 75) : tenths(rng, 0.8, 1.2);
    for (let i = 0; i < 40 && !safe(2 * L + Math.PI * D, dec); i++) D = track ? rng.int(60, 75) : tenths(rng, 0.8, 1.2);
    const circ = Math.PI * D;
    const P = 2 * L + circ;
    return {
      prompt: track
        ? `A running track has two straight sides, each ${Q(L, 'm')} long, joined by a half-circle at each end. Each half-circle has a diameter of ${Q(D, 'm')}. What is the distance around the track? Round ${roundingPhrase(dec)} of a metre.`
        : `A table top has two straight sides, each ${Q(L, 'm')} long, and a half-circle at each end with a diameter of ${Q(D, 'm')}. ${name} is gluing edge banding all the way around it. How much banding is needed? Round ${roundingPhrase(dec)} of a metre.`,
      parts: [numPart(P, { decimals: dec, suffix: 'm' })],
      hints: ['Two half-circles with the same diameter make one whole circle.', 'Perimeter = the two straight sides + the circumference of one circle, $C = \\pi d$.'],
      solution: [
        `Straight sides: $2 \\times ${fmt(L)} = ${fmt(2 * L)}$`,
        `The two half-circles make one circle: $C = \\pi d = \\pi \\times ${fmt(D)} \\approx ${fmt(circ, 4)}$`,
        `$P \\approx ${fmt(2 * L)} + ${fmt(circ, 4)} = ${fmt(P, 4)}$`,
        `Rounded ${roundingPhrase(dec)}, the distance around is ${Q(fmtFixed(P, dec), 'm')}.`,
      ],
      answerDisplay: Q(fmtFixed(P, dec), 'm'),
    };
  },
});

interface CircCtx {
  thing: string;
  u: string;
  d: [number, number];
}

const CIRCLES: CircCtx[] = [
  { thing: 'round table top', u: 'cm', d: [80, 150] },
  { thing: 'bicycle wheel', u: 'cm', d: [50, 70] },
  { thing: 'grain bin', u: 'm', d: [5, 14] },
  { thing: 'round window', u: 'in', d: [18, 36] },
  { thing: 'pizza pan', u: 'in', d: [10, 18] },
  { thing: 'manhole cover', u: 'cm', d: [60, 80] },
  { thing: 'steel fire pit ring', u: 'cm', d: [90, 130] },
  { thing: 'hot tub', u: 'ft', d: [6, 9] },
  { thing: 'water tank', u: 'm', d: [2, 6] },
];

const RADII = [
  { thing: 'flower bed', job: 'edging', u: 'm', r: [1, 4] },
  { thing: 'skating pond', job: 'rope barrier', u: 'm', r: [5, 15] },
  { thing: 'patio', job: 'paving-stone border', u: 'm', r: [1.5, 3.5] },
  { thing: 'table top', job: 'edge banding', u: 'cm', r: [40, 75] },
  { thing: 'rug', job: 'binding tape', u: 'ft', r: [2, 6] },
];

const circumference = skill({
  id: 'm103-circumference',
  name: 'Circumference of a circle',
  description: 'Use C = πd or C = 2πr to find the distance around a circle, including wheel problems.',
  outcomes: ['M3'],
  lessonId: 'm103-4-3',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      const c = rng.pick(CIRCLES);
      const dia = retry(() => rng.int(c.d[0], c.d[1]), (v) => safe(Math.PI * v, 1));
      const C = Math.PI * dia;
      return {
        prompt: `A ${c.thing} has a diameter of ${Q(dia, c.u)}. What is its circumference? Round ${roundingPhrase(1)} of a ${UNIT_NAME[c.u]}.`,
        parts: [numPart(C, { decimals: 1, suffix: c.u })],
        hints: ['The circumference is the distance around a circle.', 'Use $C = \\pi d$ and the $\\pi$ key on your calculator.'],
        solution: ['$C = \\pi d$', `$C = \\pi \\times ${dia} \\approx ${fmt(C, 3)}$`, `The circumference is about ${Q(fmtFixed(C, 1), c.u)}.`],
        answerDisplay: Q(fmtFixed(C, 1), c.u),
      };
    }
    if (d === 2) {
      const dec = rng.pick([1, 2]);
      if (rng.chance(0.6)) {
        const c = rng.pick(RADII);
        const step = c.u === 'cm' ? 1 : 0.1;
        const r = retry(
          () => Math.round((c.r[0] + rng.next() * (c.r[1] - c.r[0])) / step) * step,
          (v) => safe(2 * Math.PI * v, dec),
        );
        const rr = clean(r);
        const C = 2 * Math.PI * rr;
        return {
          prompt: `A circular ${c.thing} has a radius of ${Q(rr, c.u)}. ${name} wants to put ${c.job} all the way around it. How much ${c.job} is needed? Give your answer in ${UNIT_PLURAL[c.u]}, rounded ${roundingPhrase(dec)}.`,
          parts: [numPart(C, { decimals: dec, suffix: c.u })],
          hints: ['The distance around a circle is its circumference.', 'With a radius, use $C = 2\\pi r$ (or double the radius to get the diameter and use $C = \\pi d$).'],
          solution: ['$C = 2\\pi r$', `$C = 2 \\times \\pi \\times ${fmt(rr)} \\approx ${fmt(C, 4)}$`, `${name} needs about ${Q(fmtFixed(C, dec), c.u)} of ${c.job}.`],
          answerDisplay: Q(fmtFixed(C, dec), c.u),
        };
      }
      const p = rng.pick([
        { thing: 'pipe', job: 'a strip of insulation tape wrapped once around it', u: 'in', lo: 1.5, hi: 6.5 },
        { thing: 'culvert', job: 'a steel band wrapped once around it', u: 'm', lo: 0.6, hi: 1.8 },
        { thing: 'fence post', job: 'a metal cap ring around its top', u: 'cm', lo: 10.5, hi: 15.5 },
      ]);
      const dia = retry(() => tenths(rng, p.lo, p.hi), (v) => safe(Math.PI * v, dec) && Math.round(v * 10) % 10 !== 0);
      const C = Math.PI * dia;
      return {
        prompt: `A ${p.thing} has an outside diameter of ${Q(dia, p.u)}. ${name} needs ${p.job}. How long is that, in ${UNIT_PLURAL[p.u]}? Round ${roundingPhrase(dec)}.`,
        parts: [numPart(C, { decimals: dec, suffix: p.u })],
        hints: ['Going once around the outside is the circumference.', 'Use $C = \\pi d$.'],
        solution: ['$C = \\pi d$', `$C = \\pi \\times ${fmt(dia)} \\approx ${fmt(C, 4)}$`, `Rounded ${roundingPhrase(dec)}, the length is ${Q(fmtFixed(C, dec), p.u)}.`],
        answerDisplay: Q(fmtFixed(C, dec), p.u),
      };
    }

    const mode = rng.pick(['distance', 'revsKm', 'revsMile'] as const);
    if (mode === 'distance') {
      const w = rng.pick([
        { thing: 'bicycle wheel', lo: 60, hi: 70 },
        { thing: 'wheelbarrow wheel', lo: 35, hi: 40 },
        { thing: 'truck tire', lo: 95, hi: 110 },
        { thing: 'tractor rear tire', lo: 150, hi: 190 },
        { thing: 'measuring wheel', lo: 30, hi: 32 },
      ]);
      let dia = rng.int(w.lo, w.hi);
      let n = rng.int(5, 50) * 10;
      for (let i = 0; i < 40 && !safe((n * Math.PI * dia) / 100, 1); i++) {
        dia = rng.int(w.lo, w.hi);
        n = rng.int(5, 50) * 10;
      }
      const C = Math.PI * dia;
      const dist = (n * C) / 100;
      return {
        prompt: `A ${w.thing} has a diameter of ${Q(dia, 'cm')}. How far does it roll, in **metres**, when it turns $${n}$ times? Round ${roundingPhrase(1)} of a metre.`,
        parts: [numPart(dist, { decimals: 1, suffix: 'm' })],
        hints: ['In one full turn, a wheel rolls a distance equal to its circumference.', 'Find $C = \\pi d$, multiply by the number of turns, then change centimetres to metres (divide by 100).'],
        solution: [
          `One turn: $C = \\pi d = \\pi \\times ${dia} \\approx ${fmt(C, 3)}\\ \\text{cm}$`,
          `$${n}$ turns: $${n} \\times ${fmt(C, 3)} \\approx ${fmtGroupTex(n * C, 2)}\\ \\text{cm}$`,
          `Change to metres: $${fmtGroupTex(n * C, 2)} \\div 100 \\approx ${fmt(dist, 3)}\\ \\text{m}$`,
          `The ${w.thing} rolls about ${Q(fmtFixed(dist, 1), 'm')}.`,
        ],
        answerDisplay: Q(fmtFixed(dist, 1), 'm'),
      };
    }
    if (mode === 'revsKm') {
      let dia = rng.int(95, 115);
      let km = rng.int(1, 5);
      for (let i = 0; i < 40 && !safe((km * 100000) / (Math.PI * dia), 0); i++) {
        dia = rng.int(95, 115);
        km = rng.int(1, 5);
      }
      const C = Math.PI * dia;
      const revs = (km * 100000) / C;
      const veh = rng.pick(['truck', 'tractor-trailer', 'school bus', 'farm truck']);
      return {
        prompt: `The tires on ${name}’s ${veh} have a diameter of ${Q(dia, 'cm')}. How many times does a tire turn when the ${veh} drives ${Q(km, 'km')}? Round to the nearest whole turn.`,
        parts: [numPart(revs, { decimals: 0, suffix: 'turns' })],
        hints: ['Each turn moves the tire forward one circumference.', 'Change the distance to centimetres ($1\\ \\text{km} = 100\\,000\\ \\text{cm}$), then divide by the circumference.'],
        solution: [
          `One turn: $C = \\pi \\times ${dia} \\approx ${fmt(C, 3)}\\ \\text{cm}$`,
          `Distance: $${km}\\ \\text{km} = ${fmtGroupTex(km * 100000)}\\ \\text{cm}$`,
          `Turns: $${fmtGroupTex(km * 100000)} \\div ${fmt(C, 3)} \\approx ${fmt(revs, 2)}$`,
          `The tire turns about $${fmtFixed(revs, 0)}$ times.`,
        ],
        answerDisplay: `$${fmtFixed(revs, 0)}$ turns`,
      };
    }
    let dia = rng.int(24, 34);
    let miles = rng.int(1, 3);
    for (let i = 0; i < 40 && !safe((miles * 63360) / (Math.PI * dia), 0); i++) {
      dia = rng.int(24, 34);
      miles = rng.int(1, 3);
    }
    const C = Math.PI * dia;
    const inches = miles * 63360;
    const revs = inches / C;
    return {
      prompt: `A pickup truck tire has a diameter of ${Q(dia, 'in')}. How many times does it turn in ${miles === 1 ? '$1$ mile' : `$${miles}$ miles`}? Use $1\\ \\text{mile} = 5280\\ \\text{ft}$ and $1\\ \\text{ft} = 12\\ \\text{in}$. Round to the nearest whole turn.`,
      parts: [numPart(revs, { decimals: 0, suffix: 'turns' })],
      hints: ['Each turn moves the tire forward one circumference.', 'Change the distance to inches, then divide by the circumference $C = \\pi d$.'],
      solution: [
        `One turn: $C = \\pi \\times ${dia} \\approx ${fmt(C, 3)}\\ \\text{in}$`,
        `Distance: $${miles} \\times 5280 \\times 12 = ${fmtGroupTex(inches)}\\ \\text{in}$`,
        `Turns: $${fmtGroupTex(inches)} \\div ${fmt(C, 3)} \\approx ${fmt(revs, 2)}$`,
        `The tire turns about $${fmtFixed(revs, 0)}$ times.`,
      ],
      answerDisplay: `$${fmtFixed(revs, 0)}$ turns`,
    };
  },
});

const perimeterUnknown = skill({
  id: 'm103-perimeter-unknown',
  name: 'Finding a side from the perimeter',
  description: 'Rearrange perimeter and circumference formulas to find an unknown side, width or radius.',
  outcomes: ['A1', 'M3'],
  lessonId: 'm103-4-3',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      const shape = rng.pick([
        { n: 4, what: 'square', formula: 'P = 4s', things: ['garden', 'sandbox', 'window', 'storage shed floor'] },
        { n: 3, what: 'triangle with three equal sides', formula: 'P = 3s', things: ['warning sign', 'garden bed', 'corner shelf'] },
        { n: 6, what: 'regular hexagon', formula: 'P = 6s', things: ['gazebo floor', 'patio', 'picnic shelter floor'] },
      ]);
      const u = rng.pick(['m', 'ft']);
      const s = shape.n === 4 && rng.chance(0.3) ? rng.int(5, 30) / 2 : rng.int(2, 25);
      const P = clean(shape.n * s);
      const thing = rng.pick(shape.things);
      return {
        prompt: `A ${thing} is shaped like a ${shape.what}. Its perimeter is ${Q(P, u)}. How long is each side?`,
        parts: [numPart(s, { suffix: u })],
        hints: [`All ${shape.n} sides are equal, so $${shape.formula}$.`, `Undo the multiplication: divide the perimeter by $${shape.n}$.`],
        solution: [`$${shape.formula}$`, `Divide both sides by $${shape.n}$: $s = \\dfrac{P}{${shape.n}}$`, `$s = \\dfrac{${fmt(P)}}{${shape.n}} = ${fmt(s)}$`, `Each side is ${Q(s, u)} long.`],
        answerDisplay: Q(s, u),
      };
    }
    if (d === 2) {
      const mode = rng.pick(['width', 'length', 'triangle'] as const);
      if (mode === 'triangle') {
        const a = tenths(rng, 2, 9);
        const b = tenths(rng, 2, 9);
        const c = tenths(rng, Math.abs(a - b) + 0.5, a + b - 0.5);
        const P = clean(a + b + c);
        const thing = rng.pick(['triangular flower bed', 'triangular lot', 'triangular deck']);
        return {
          prompt: `A ${thing} has a perimeter of ${Q(P, 'm')}. Two of its sides are ${Q(a, 'm')} and ${Q(b, 'm')}. How long is the third side?`,
          parts: [numPart(c, { suffix: 'm' })],
          hints: ['The perimeter is the sum of the three sides: $P = a + b + c$.', 'Subtract the two sides you know from the perimeter.'],
          solution: ['$P = a + b + c$, so $c = P - a - b$.', `$c = ${fmt(P)} - ${fmt(a)} - ${fmt(b)} = ${fmt(c)}$`, `The third side is ${Q(c, 'm')}.`],
          answerDisplay: Q(c, 'm'),
        };
      }
      const c = rng.pick([
        { thing: 'dog run', u: 'm' },
        { thing: 'garden', u: 'm' },
        { thing: 'deck', u: 'ft' },
        { thing: 'picture frame', u: 'cm' },
        { thing: 'parking pad', u: 'm' },
      ]);
      const l = c.u === 'm' ? tenths(rng, 4, 20) : rng.int(c.u === 'cm' ? 30 : 12, c.u === 'cm' ? 90 : 30);
      const w = c.u === 'm' ? tenths(rng, 2, l - 0.5) : rng.int(c.u === 'cm' ? 20 : 8, l - 2);
      const P = clean(2 * (l + w));
      const half = clean(P / 2);
      const findW = mode === 'width';
      const known = findW ? l : w;
      const ans = findW ? w : l;
      const kw = findW ? 'l' : 'w';
      const uw = findW ? 'w' : 'l';
      return {
        prompt: `A rectangular ${c.thing} has a perimeter of ${Q(P, c.u)}. Its ${findW ? 'length' : 'width'} is ${Q(known, c.u)}. What is its ${findW ? 'width' : 'length'}?`,
        parts: [numPart(ans, { suffix: c.u })],
        hints: ['Start with $P = 2(l + w)$ and substitute what you know.', `Divide the perimeter by 2 to get $l + w$, then subtract the ${findW ? 'length' : 'width'}.`],
        solution: [
          '$P = 2(l + w)$',
          `Divide both sides by 2: $\\dfrac{P}{2} = l + w$`,
          `Subtract $${kw}$: $${uw} = \\dfrac{P}{2} - ${kw}$`,
          `$${uw} = \\dfrac{${fmt(P)}}{2} - ${fmt(known)} = ${fmt(half)} - ${fmt(known)} = ${fmt(ans)}$`,
          `The ${findW ? 'width' : 'length'} is ${Q(ans, c.u)}.`,
        ],
        answerDisplay: Q(ans, c.u),
      };
    }

    const mode = rng.pick(['radius', 'trunk', 'relation', 'fence'] as const);
    if (mode === 'radius') {
      const dec = rng.pick([1, 2]);
      const spot = rng.pick([
        { thing: 'flower bed', lo: 6, hi: 20 },
        { thing: 'fire pit', lo: 3, hi: 6 },
        { thing: 'fish pond', lo: 6, hi: 18 },
        { thing: 'patio', lo: 9, hi: 25 },
      ]);
      const C = retry(() => tenths(rng, spot.lo, spot.hi), (v) => safe(v / (2 * Math.PI), dec));
      const r = C / (2 * Math.PI);
      const thing = spot.thing;
      return {
        prompt: `${name} used ${Q(C, 'm')} of edging to go exactly once around a circular ${thing}. What is the radius of the ${thing}? Round ${roundingPhrase(dec)} of a metre.`,
        parts: [numPart(r, { decimals: dec, suffix: 'm' })],
        hints: ['The edging is the circumference: $C = 2\\pi r$.', 'Rearrange to get $r$ by itself: $r = \\dfrac{C}{2\\pi}$.'],
        solution: ['$C = 2\\pi r$', 'Divide both sides by $2\\pi$: $r = \\dfrac{C}{2\\pi}$', `$r = \\dfrac{${fmt(C)}}{2\\pi} \\approx ${fmt(r, 4)}$`, `The radius is about ${Q(fmtFixed(r, dec), 'm')}.`],
        answerDisplay: Q(fmtFixed(r, dec), 'm'),
      };
    }
    if (mode === 'trunk') {
      const C = retry(() => rng.int(60, 300), (v) => safe(v / Math.PI, 0));
      const dia = C / Math.PI;
      return {
        prompt: `${name}, an arborist in a forestry town, wraps a tape measure once around a lodgepole pine trunk. The circumference is ${Q(C, 'cm')}. What is the diameter of the trunk? Round to the nearest centimetre.`,
        parts: [numPart(dia, { decimals: 0, suffix: 'cm' })],
        hints: ['The distance around the trunk is its circumference: $C = \\pi d$.', 'Rearrange to get $d$ by itself: $d = \\dfrac{C}{\\pi}$.'],
        solution: ['$C = \\pi d$', 'Divide both sides by $\\pi$: $d = \\dfrac{C}{\\pi}$', `$d = \\dfrac{${C}}{\\pi} \\approx ${fmt(dia, 3)}$`, `The trunk is about ${Q(fmtFixed(dia, 0), 'cm')} across.`],
        answerDisplay: Q(fmtFixed(dia, 0), 'cm'),
      };
    }
    if (mode === 'relation') {
      const u = rng.pick(['m', 'ft']);
      const w = rng.int(4, 20);
      const k = rng.int(2, 12);
      const l = w + k;
      const P = 2 * (l + w);
      const askL = rng.chance(0.5);
      const thing = rng.pick(['pasture', 'garden', 'parking lot', 'shop floor']);
      return {
        prompt: `A rectangular ${thing} is ${Q(k, u)} longer than it is wide. Its perimeter is ${Q(P, u)}. What is its ${askL ? 'length' : 'width'}?`,
        parts: [numPart(askL ? l : w, { suffix: u })],
        hints: [`Call the width $w$. Then the length is $w + ${k}$.`, `Substitute into $P = 2(l + w)$ to get $${P} = 2(w + ${k} + w)$, then solve for $w$.`],
        solution: [
          `Let the width be $w$, so the length is $w + ${k}$.`,
          `$P = 2(l + w) = 2(w + ${k} + w) = 4w + ${2 * k}$`,
          `$${P} = 4w + ${2 * k}$`,
          `Subtract $${2 * k}$: $${P - 2 * k} = 4w$`,
          `Divide by 4: $w = ${w}$`,
          ...(askL ? [`Length $= ${w} + ${k} = ${l}$`, `The length is ${Q(l, u)}.`] : [`The width is ${Q(w, u)}.`]),
        ],
        answerDisplay: Q(askL ? l : w, u),
      };
    }
    const metric = rng.chance(0.5);
    const u = metric ? 'm' : 'ft';
    const l = metric ? rng.int(10, 40) : rng.int(24, 80);
    const w = metric ? rng.int(5, 20) + rng.pick([0, 0.5]) : rng.int(10, 40);
    const F = clean(l + 2 * w);
    return {
      prompt: `${name} has ${Q(F, u)} of fencing to make a rectangular pen against a straight barn wall. The wall forms one side, so only three sides need fence. The side opposite the wall is ${Q(l, u)} long. How far does the pen stick out from the wall?`,
      parts: [numPart(w, { suffix: u })],
      hints: ['The fence covers one long side and two short sides: $F = l + 2w$.', 'Rearrange: subtract $l$, then divide by 2.'],
      solution: ['$F = l + 2w$', 'Subtract $l$: $F - l = 2w$', 'Divide by 2: $w = \\dfrac{F - l}{2}$', `$w = \\dfrac{${fmt(F)} - ${l}}{2} = \\dfrac{${fmt(F - l)}}{2} = ${fmt(w)}$`, `The pen sticks out ${Q(w, u)} from the wall.`],
      answerDisplay: Q(w, u),
    };
  },
});

// ---------------------------------------------------------------------------
// 4.4 Linear measurement on the job
// ---------------------------------------------------------------------------

const MATERIALS = ['board', 'length of copper pipe', 'steel rod', 'length of PVC pipe', 'piece of angle iron', 'length of conduit'];

const cutPieces = skill({
  id: 'm103-cut-pieces',
  name: 'Cutting pieces from a length',
  description: 'Find how many whole pieces can be cut from a board, pipe or rod and how much is left over, including saw kerf.',
  outcomes: ['M3'],
  lessonId: 'm103-4-4',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    const mat = rng.pick(MATERIALS);
    if (d === 1) {
      const metric = rng.chance(0.5);
      const u = metric ? 'cm' : 'in';
      const L = metric ? rng.pick([180, 240, 250, 300, 360]) : rng.pick([72, 96, 120, 144]);
      const p = retry(() => (metric ? rng.int(15, 70) : rng.int(7, 30)), (v) => L % v !== 0 && Math.floor(L / v) >= 2);
      const n = Math.floor(L / p);
      return {
        prompt: `${name} is cutting pieces ${Q(p, u)} long from a ${mat} ${Q(L, u)} long. How many whole pieces can ${name} cut? Ignore the width of the saw cuts.`,
        parts: [numPart(n, { suffix: 'pieces' })],
        hints: ['How many times does one piece fit into the full length?', 'Divide the full length by the piece length, then round **down** — a part of a piece is not a piece.'],
        solution: [`$${L} \\div ${p} \\approx ${fmt(L / p, 2)}$`, `Only whole pieces count, so round down to $${n}$.`, `${name} can cut $${n}$ whole pieces.`],
        answerDisplay: `$${n}$ pieces`,
      };
    }
    if (d === 2) {
      const metric = rng.chance(0.5);
      if (metric) {
        const Lm = rng.pick([2.4, 3, 3.6, 4.8, 6]);
        const Lcm = Math.round(Lm * 100);
        const p = retry(() => rng.int(20, 90), (v) => Lcm % v !== 0 && Math.floor(Lcm / v) >= 2);
        const n = Math.floor(Lcm / p);
        const left = Lcm - n * p;
        return {
          prompt: `${name} cuts pieces ${Q(p, 'cm')} long from a ${mat} ${Q(Lm, 'm')} long. Ignoring the saw cuts, how many whole pieces can ${name} cut, and how many centimetres are left over?`,
          parts: [numPart(n, { label: 'Number of pieces', suffix: 'pieces' }), numPart(left, { label: 'Leftover', suffix: 'cm' })],
          hints: ['Write both lengths in the same unit first ($1\\ \\text{m} = 100\\ \\text{cm}$).', 'Divide and round down for the number of pieces. Leftover = full length − (pieces × piece length).'],
          solution: [
            `Change to centimetres: $${fmt(Lm)}\\ \\text{m} = ${Lcm}\\ \\text{cm}$.`,
            `$${Lcm} \\div ${p} \\approx ${fmt(Lcm / p, 2)}$, so round down to $${n}$ whole pieces.`,
            `Used: $${n} \\times ${p} = ${n * p}\\ \\text{cm}$`,
            `Leftover: $${Lcm} - ${n * p} = ${left}\\ \\text{cm}$`,
            `${name} can cut $${n}$ pieces with ${Q(left, 'cm')} left over.`,
          ],
          answerDisplay: `$${n}$ pieces, ${Q(left, 'cm')} left over`,
        };
      }
      const Lft = rng.pick([8, 10, 12, 16, 20]);
      const Lin = Lft * 12;
      const p = retry(() => rng.int(9, 40), (v) => Lin % v !== 0 && Math.floor(Lin / v) >= 2);
      const n = Math.floor(Lin / p);
      const left = Lin - n * p;
      return {
        prompt: `${name} cuts pieces ${Q(p, 'in')} long from a ${mat} ${Q(Lft, 'ft')} long. Ignoring the saw cuts, how many whole pieces can ${name} cut, and how many inches are left over?`,
        parts: [numPart(n, { label: 'Number of pieces', suffix: 'pieces' }), numPart(left, { label: 'Leftover', suffix: 'in' })],
        hints: ['Write both lengths in the same unit first ($1\\ \\text{ft} = 12\\ \\text{in}$).', 'Divide and round down for the number of pieces. Leftover = full length − (pieces × piece length).'],
        solution: [
          `Change to inches: $${Lft} \\times 12 = ${Lin}\\ \\text{in}$.`,
          `$${Lin} \\div ${p} \\approx ${fmt(Lin / p, 2)}$, so round down to $${n}$ whole pieces.`,
          `Used: $${n} \\times ${p} = ${n * p}\\ \\text{in}$`,
          `Leftover: $${Lin} - ${n * p} = ${left}\\ \\text{in}$`,
          `${name} can cut $${n}$ pieces with ${Q(left, 'in')} left over.`,
        ],
        answerDisplay: `$${n}$ pieces, ${Q(left, 'in')} left over`,
      };
    }

    const mode = rng.pick(['kerfMetric', 'kerfImperial', 'boards'] as const);
    if (mode === 'kerfMetric') {
      const Lm = rng.pick([2.4, 3, 3.6]);
      const L = Math.round(Lm * 1000);
      const k = rng.pick([3, 4]);
      const p = retry(
        () => rng.int(30, 130) * 5,
        (v) => {
          const n = Math.floor(L / (v + k));
          return n >= 2 && L - n * (v + k) > 0 && Math.floor((L + k) / (v + k)) === n;
        },
      );
      const n = Math.floor(L / (p + k));
      const left = L - n * (p + k);
      return {
        prompt: `${name} is cutting shelf pieces ${Q(p, 'mm')} long from a board ${Q(Lm, 'm')} long. Each saw cut turns ${Q(k, 'mm')} of wood into sawdust (the **saw kerf**), and every piece needs its own cut. How many whole pieces can ${name} cut, and how long is the leftover piece in millimetres?`,
        parts: [numPart(n, { label: 'Number of pieces', suffix: 'pieces' }), numPart(left, { label: 'Leftover', suffix: 'mm' })],
        hints: [`Each piece uses its own length plus ${Q(k, 'mm')} of sawdust.`, `Change the board to millimetres, divide by $${p} + ${k}$ and round down. Then find what is left.`],
        solution: [
          `Board: $${fmt(Lm)}\\ \\text{m} = ${fmtGroupTex(L)}\\ \\text{mm}$.`,
          `Each piece uses $${p} + ${k} = ${p + k}\\ \\text{mm}$.`,
          `$${fmtGroupTex(L)} \\div ${p + k} \\approx ${fmt(L / (p + k), 2)}$, so round down to $${n}$ pieces.`,
          `Used: $${n} \\times ${p + k} = ${fmtGroupTex(n * (p + k))}\\ \\text{mm}$; leftover: $${fmtGroupTex(L)} - ${fmtGroupTex(n * (p + k))} = ${left}\\ \\text{mm}$`,
          `${name} can cut $${n}$ pieces, with a leftover piece ${Q(left, 'mm')} long.`,
        ],
        answerDisplay: `$${n}$ pieces, ${Q(left, 'mm')} left over`,
      };
    }
    if (mode === 'kerfImperial') {
      const Lft = rng.pick([8, 10, 12]);
      const LT = Lft * 12 * 16;
      const k = 2; // 1/8 in
      const pT = retry(
        () => mixedLen(rng, 8, 30, rng.pick([2, 4, 8])),
        (v) => {
          const n = Math.floor(LT / (v + k));
          return n >= 3 && LT - n * (v + k) > 0 && Math.floor((LT + k) / (v + k)) === n;
        },
      );
      const n = Math.floor(LT / (pT + k));
      const used = n * (pT + k);
      const left = LT - used;
      return {
        prompt: `${name} is cutting blocking pieces $${inch(pT)}$ in long from a $${Lft}$ ft board. Each saw cut turns $\\tfrac18$ in of wood into sawdust (the **saw kerf**), and every piece needs its own cut. How many whole pieces can ${name} cut, and how long is the leftover piece in inches? You can type a mixed number such as 3 5/8.`,
        parts: [numPart(n, { label: 'Number of pieces', suffix: 'pieces' }), numPart(left / 16, { label: 'Leftover', suffix: 'in' })],
        hints: ['Each piece uses its own length plus $\\tfrac18$ in of sawdust.', 'Change the board to inches. Divide by (piece + kerf) and round down, then find what is left.'],
        solution: [
          `Board: $${Lft} \\times 12 = ${Lft * 12}\\ \\text{in}$.`,
          `Each piece uses $${inch(pT)} + \\tfrac18 = ${inch(pT + k)}$ in $= ${fmt((pT + k) / 16, 4)}$ in.`,
          `$${Lft * 12} \\div ${fmt((pT + k) / 16, 4)} \\approx ${fmt(LT / (pT + k), 2)}$, so round down to $${n}$ pieces.`,
          `Used: $${n} \\times ${inch(pT + k)} = ${inch(used)}$ in; leftover: $${Lft * 12} - ${inch(used)} = ${inch(left)}$ in`,
          `${name} can cut $${n}$ pieces, with a leftover piece $${inch(left)}$ in long.`,
        ],
        answerDisplay: `$${n}$ pieces, $${inch(left)}$ in left over`,
      };
    }
    const metric = rng.chance(0.5);
    const u = metric ? 'cm' : 'in';
    const Lstd = metric ? rng.pick([2.4, 3, 3.6]) : rng.pick([8, 10, 12]);
    const Lsmall = metric ? Math.round(Lstd * 100) : Lstd * 12;
    let p = 0;
    let per = 0;
    let N = 0;
    for (let i = 0; i < 60; i++) {
      p = metric ? rng.int(25, 90) : rng.int(10, 40);
      per = Math.floor(Lsmall / p);
      N = rng.int(10, 40);
      if (per >= 2 && N % per !== 0 && N > per) break;
    }
    const boards = Math.ceil(N / per);
    const stock = metric ? `${Q(Lstd, 'm')} lengths` : `${Q(Lstd, 'ft')} lengths`;
    return {
      prompt: `${name} needs $${N}$ pieces, each ${Q(p, u)} long. The material is sold in ${stock}. Pieces cannot be joined, and you can ignore the saw cuts. How many lengths must ${name} buy?`,
      parts: [numPart(boards, { suffix: 'lengths' })],
      hints: ['First find how many whole pieces you can cut from one length.', 'Then divide the number of pieces needed by the pieces per length, and round **up** — you cannot buy part of a length.'],
      solution: [
        `One length is $${metric ? `${fmt(Lstd)}\\ \\text{m} = ${Lsmall}\\ \\text{cm}` : `${Lstd} \\times 12 = ${Lsmall}\\ \\text{in}`}$.`,
        `Pieces per length: $${Lsmall} \\div ${p} \\approx ${fmt(Lsmall / p, 2)}$, so $${per}$ whole pieces.`,
        `Lengths needed: $${N} \\div ${per} \\approx ${fmt(N / per, 2)}$. Round up to $${boards}$.`,
        `${name} must buy $${boards}$ lengths.`,
      ],
      answerDisplay: `$${boards}$ lengths`,
    };
  },
});

interface PriceCtx {
  what: string;
  u: 'ft' | 'm';
  cents: [number, number];
  len: [number, number];
}

const PRICED: PriceCtx[] = [
  { what: 'Baseboard', u: 'ft', cents: [129, 399], len: [20, 80] },
  { what: 'Crown moulding', u: 'ft', cents: [249, 699], len: [20, 70] },
  { what: 'Chain-link fencing', u: 'm', cents: [1250, 2499], len: [15, 60] },
  { what: 'Electrical wire', u: 'm', cents: [89, 249], len: [15, 75] },
  { what: 'Copper pipe', u: 'ft', cents: [315, 650], len: [10, 40] },
  { what: 'Garden edging', u: 'm', cents: [225, 575], len: [8, 40] },
  { what: 'LED strip lighting', u: 'm', cents: [450, 999], len: [3, 20] },
  { what: 'Weatherstripping', u: 'ft', cents: [45, 125], len: [17, 60] },
];

const perUnit = (u: 'ft' | 'm') => (u === 'ft' ? 'linear foot' : 'metre');

const linearCost = skill({
  id: 'm103-linear-cost',
  name: 'Cost of materials sold by length',
  description: 'Find the cost of trim, fencing, wire or pipe sold by the linear foot or metre, including buying whole standard lengths and adding GST.',
  outcomes: ['M3'],
  lessonId: 'm103-4-4',
  calculator: true,
  gen(rng, d) {
    const name = rng.pick(NAMES);
    if (d === 1) {
      const c = rng.pick(PRICED);
      const price = rng.int(c.cents[0], c.cents[1]) / 100;
      const L = rng.int(c.len[0], c.len[1]);
      const cost = L * price;
      return {
        prompt: `${c.what} costs ${money(price)} per ${perUnit(c.u)}. ${name} needs ${Q(L, c.u)}. How much will it cost, to the nearest cent?`,
        parts: [numPart(cost, { decimals: 2, tolerance: 0.011, suffix: 'dollars' })],
        hints: [`The price is for each ${perUnit(c.u)}, so multiply.`, 'Cost = length × price per unit of length.'],
        solution: ['Cost = length × price per unit', `$${L} \\times ${fmtFixed(price, 2)} = ${amt(cost)}$`, `The ${c.what.toLowerCase()} costs ${money(cost)}.`],
        answerDisplay: money(cost),
      };
    }
    if (d === 2) {
      const mode = rng.pick(['room', 'yard', 'windows', 'yards'] as const);
      if (mode === 'room') {
        let l = 0;
        let w = 0;
        let doors = 1;
        let price = 0;
        let need = 0;
        for (let i = 0; i < 60; i++) {
          l = rng.int(10, 22);
          w = rng.int(8, l);
          doors = rng.int(1, 2);
          price = rng.int(129, 349) / 100;
          need = 2 * (l + w) - 3 * doors;
          if (safe(need * price, 2)) break;
        }
        const cost = need * price;
        return {
          prompt: `${name} is putting baseboard around a rectangular room that is ${Q(l, 'ft')} by ${Q(w, 'ft')}. The room has ${doors === 1 ? 'one doorway' : 'two doorways'}, each ${Q(3, 'ft')} wide, with no baseboard across ${doors === 1 ? 'it' : 'them'}. Baseboard costs ${money(price)} per linear foot. What is the cost of the baseboard, to the nearest cent?`,
          parts: [numPart(cost, { decimals: 2, tolerance: 0.011, suffix: 'dollars' })],
          hints: ['First find the length of baseboard: the perimeter of the room minus the doorways.', 'Then multiply the length by the price per linear foot.'],
          solution: [
            `Perimeter: $2(${l} + ${w}) = ${2 * (l + w)}\\ \\text{ft}$`,
            `Subtract the doorway${doors === 1 ? '' : 's'}: $${2 * (l + w)} - ${3 * doors} = ${need}\\ \\text{ft}$`,
            `Cost: $${need} \\times ${fmtFixed(price, 2)} = ${amt(cost)}$`,
            `The baseboard costs ${money(cost)}.`,
          ],
          answerDisplay: money(cost),
        };
      }
      if (mode === 'yard') {
        let l = 0;
        let w = 0;
        let price = 0;
        let need = 0;
        const gate = rng.pick([1, 1.5, 2]);
        for (let i = 0; i < 60; i++) {
          l = rng.int(12, 40);
          w = rng.int(8, l);
          price = rng.int(1250, 2899) / 100;
          need = 2 * (l + w) - gate;
          if (safe(need * price, 2)) break;
        }
        const cost = need * price;
        return {
          prompt: `${name} is fencing a rectangular yard on an acreage outside town. The yard is ${Q(l, 'm')} by ${Q(w, 'm')}, and a gate ${Q(gate, 'm')} wide (priced separately) takes the place of some fence. Fencing costs ${money(price)} per metre. What does the fencing cost, to the nearest cent?`,
          parts: [numPart(cost, { decimals: 2, tolerance: 0.011, suffix: 'dollars' })],
          hints: ['Find the perimeter of the yard, then subtract the gate.', 'Multiply the length of fencing by the price per metre.'],
          solution: [
            `Perimeter: $2(${l} + ${w}) = ${2 * (l + w)}\\ \\text{m}$`,
            `Subtract the gate: $${2 * (l + w)} - ${fmt(gate)} = ${fmt(need)}\\ \\text{m}$`,
            `Cost: $${fmt(need)} \\times ${fmtFixed(price, 2)} = ${amt(cost)}$`,
            `To the nearest cent, the fencing costs ${money(cost)}.`,
          ],
          answerDisplay: money(cost),
        };
      }
      if (mode === 'windows') {
        let a = 0;
        let b = 0;
        let n = 0;
        let price = 0;
        for (let i = 0; i < 60; i++) {
          a = rng.int(4, 8) * 6;
          b = rng.int(3, 7) * 6;
          n = rng.int(2, 6);
          price = rng.int(129, 299) / 100;
          if (a !== b && safe(((n * 2 * (a + b)) / 12) * price, 2)) break;
        }
        const perIn = 2 * (a + b);
        const totalFt = (n * perIn) / 12;
        const cost = totalFt * price;
        return {
          prompt: `${name} is putting trim around $${n}$ windows. Each window is ${Q(a, 'in')} by ${Q(b, 'in')}. Trim costs ${money(price)} per linear foot. What is the cost of the trim, to the nearest cent?`,
          parts: [numPart(cost, { decimals: 2, tolerance: 0.011, suffix: 'dollars' })],
          hints: ['Find the perimeter of one window in inches, then the total for all the windows.', 'Change inches to feet (divide by 12) before multiplying by the price per foot.'],
          solution: [
            `One window: $2(${a} + ${b}) = ${perIn}\\ \\text{in}$`,
            `All $${n}$ windows: $${n} \\times ${perIn} = ${n * perIn}\\ \\text{in}$`,
            `In feet: $${n * perIn} \\div 12 = ${fmt(totalFt)}\\ \\text{ft}$`,
            `Cost: $${fmt(totalFt)} \\times ${fmtFixed(price, 2)} = ${amt(cost)}$`,
            `The trim costs ${money(cost)}.`,
          ],
          answerDisplay: money(cost),
        };
      }
      let yd = 0;
      let price = 0;
      for (let i = 0; i < 60; i++) {
        yd = rng.int(5, 30);
        price = rng.int(35, 189) / 100;
        if (safe(3 * yd * price, 2)) break;
      }
      const item = rng.pick(['Rope', 'Chain', 'Tie-down strap webbing', 'Hose']);
      const cost = 3 * yd * price;
      return {
        prompt: `${item} costs ${money(price)} per foot. ${name} needs ${Q(yd, 'yd')}. Using $1\\ \\text{yd} = 3\\ \\text{ft}$, what will it cost, to the nearest cent?`,
        parts: [numPart(cost, { decimals: 2, tolerance: 0.011, suffix: 'dollars' })],
        hints: ['The price is per foot, but the length is in yards. Convert first.', 'Multiply the yards by 3 to get feet, then multiply by the price per foot.'],
        solution: [`$${yd}\\ \\text{yd} \\times 3 = ${3 * yd}\\ \\text{ft}$`, `Cost: $${3 * yd} \\times ${fmtFixed(price, 2)} = ${amt(cost)}$`, `It will cost ${money(cost)}.`],
        answerDisplay: money(cost),
      };
    }

    // Level 3: whole standard lengths, then GST.
    const mode = rng.pick(['baseboard', 'fence', 'wire'] as const);
    let need = 0;
    let std = 0;
    let price = 0;
    let n = 0;
    let setup = '';
    let lengthSteps: string[] = [];
    let stockWord = 'lengths';
    for (let i = 0; i < 80; i++) {
      if (mode === 'baseboard') {
        const l = rng.int(10, 20);
        const w = rng.int(8, l);
        const doors = rng.int(1, 2);
        std = rng.pick([8, 12, 16]);
        price = rng.int(899, 2499) / 100;
        need = 2 * (l + w) - 3 * doors;
        stockWord = 'lengths';
        setup = `${name} is installing baseboard in a room that is ${Q(l, 'ft')} by ${Q(w, 'ft')}, with ${doors === 1 ? 'one doorway' : 'two doorways'} ${Q(3, 'ft')} wide that get${doors === 1 ? 's' : ''} no baseboard. Baseboard is sold only in ${Q(std, 'ft')} lengths at ${money(price)} each, and pieces can be joined along a wall.`;
        lengthSteps = [`Baseboard needed: $2(${l} + ${w}) - ${3 * doors} = ${need}\\ \\text{ft}$`];
      } else if (mode === 'fence') {
        const l = rng.int(10, 30);
        const w = rng.int(6, 20);
        std = 2.4;
        price = rng.int(4999, 11999) / 100;
        need = clean(l + 2 * w);
        stockWord = 'panels';
        setup = `${name} is fencing three sides of a garden against a garage wall: the side opposite the wall is ${Q(l, 'm')} and the two other sides are ${Q(w, 'm')} each. Fence panels are ${Q(std, 'm')} wide and cost ${money(price)} each. A panel can be cut, and the cut-off piece can be used on another side.`;
        lengthSteps = [`Fencing needed: $${l} + 2(${w}) = ${fmt(need)}\\ \\text{m}$`];
      } else {
        const runs = rng.int(6, 20);
        const run = rng.int(8, 30);
        std = rng.pick([50, 75, 100]);
        price = rng.int(5999, 14999) / 100;
        need = runs * run;
        stockWord = 'rolls';
        setup = `${name}, an electrician, needs $${runs}$ runs of wire, each ${Q(run, 'm')} long. Wire is sold in ${Q(std, 'm')} rolls at ${money(price)} per roll, and runs can be cut from any roll.`;
        lengthSteps = [`Wire needed: $${runs} \\times ${run} = ${need}\\ \\text{m}$`];
      }
      n = Math.ceil(need / std - 1e-9);
      const exact = Math.abs(need / std - Math.round(need / std)) < 1e-9;
      if (!exact && safe(n * price * 1.05, 2)) break;
    }
    const sub = n * price;
    const gst = sub * 0.05;
    const total = sub * 1.05;
    return {
      prompt: `${setup} GST of 5% is added to the price. How many ${stockWord} must ${name} buy, and what is the total cost including GST, to the nearest cent?`,
      parts: [numPart(n, { label: `Number of ${stockWord}`, suffix: stockWord }), numPart(total, { label: 'Total cost', decimals: 2, tolerance: 0.011, suffix: 'dollars' })],
      hints: [`Find the total length needed, then divide by the length of one ${stockWord.slice(0, -1)}. Round **up** — you cannot buy part of one.`, 'Cost before tax = number bought × price each. Then add 5% GST: total = subtotal × 1.05.'],
      solution: [
        ...lengthSteps,
        `${stockWord[0].toUpperCase() + stockWord.slice(1)}: $${fmt(need)} \\div ${fmt(std)} \\approx ${fmt(need / std, 2)}$. Round up to $${n}$.`,
        `Subtotal: $${n} \\times ${fmtFixed(price, 2)} = ${fmtFixed(sub, 2)}$`,
        `GST: $0.05 \\times ${fmtFixed(sub, 2)} = ${amt(gst)}$`,
        `Total: $${fmtFixed(sub, 2)} + ${amt(gst)} = ${amt(total)}$`,
        `${name} buys $${n}$ ${stockWord} for a total of ${money(total)}, including GST.`,
      ],
      answerDisplay: `$${n}$ ${stockWord}; ${money(total)}`,
    };
  },
});

export const LINEAR_SKILLS: SkillDef[] = [rulerMetric, rulerImperial, fracInchOps, ftInOps, perimeter, circumference, perimeterUnknown, cutPieces, linearCost];
