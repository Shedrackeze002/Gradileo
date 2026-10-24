/** Math 5 Unit 5 — Fractions (N5, N6). Improper fractions and mixed numbers; adding and subtracting with common denominators. */
import { fixedChoice, mc, numPart, retry, skill, type GenOutput } from '../../helpers.ts';
import { gcd } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Difficulty, Figure, NumberLineFigure, Part, PlaneFigure, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type Out = GenOutput;

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Harpreet', 'Noor', 'Thanh', 'Kateri', 'Diego', 'Ngozi', 'Leah', 'Ravi',
];
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Pinewood', 'Maple Falls', 'Stonebridge', 'Westbury', 'Ashford', 'Clearwater'];

const pickName = (rng: Rng, not: string[] = []) => rng.pick(NAMES.filter((n) => !not.includes(n)));

/** A fraction in LaTeX exactly as written (not simplified). */
const fr = (n: number | string, d: number | string) => `\\dfrac{${n}}{${d}}`;
/** A fraction as inline maths. */
const ff = (n: number, d: number) => `$${fr(n, d)}$`;
/** A mixed number in LaTeX: 2\dfrac{3}{4}, or 2 when there is no fraction part, or \dfrac{3}{4} when there are no wholes. */
const mx = (w: number, n: number, d: number) => (n === 0 ? `${w}` : w === 0 ? fr(n, d) : `${w}${fr(n, d)}`);
/** The number N/d written as a mixed number in LaTeX (no simplifying). */
const mixedOf = (N: number, d: number) => mx(Math.floor(N / d), N % d, d);
const s = (n: number, one: string, many = `${one}s`) => (n === 1 ? one : many);

const FRACTION_FORM = 'Write your answer as a fraction or a mixed number.';
const MIXED_FORM = 'Write your answer as a mixed number.';

/**
 * A fraction answer N/d. 'lowest' accepts an improper fraction or a mixed number (the value is chosen
 * so that it is naturally in lowest terms); 'mixed' wants a mixed number.
 */
function fracPart(N: number, d: number, mode: 'lowest' | 'mixed', suffix?: string): Part {
  return numPart(N / d, { exact: false, fraction: mode, suffix, display: 'fraction' });
}
/** A whole-number answer typed as a plain number. */
const wholePart = (v: number, label?: string, suffix?: string): Part => numPart(v, { exact: false, label, suffix });

/** N/d with the fraction part in lowest terms (so N/d and its mixed number need no simplifying). */
const lowestOK = (N: number, d: number) => N > 0 && gcd(N % d, d) === 1 && N % d !== 0;

const r3 = (x: number) => Math.round(x * 1000) / 1000;
type P = [number, number];
type Color = 'brand' | 'accent' | 'muted';

/**
 * Fraction bars on a blank canvas. Each row is one whole cut into `d` equal parts. `fills` lists runs
 * of shaded parts counted from the start of the first bar: [count, colour].
 */
function barsFigure(d: number, bars: number, fills: Array<[number, Color]>, caption: string): PlaneFigure {
  const W = 120;
  const h = 14;
  const gap = 8;
  const H = bars * (h + gap) + gap;
  const polylines: NonNullable<PlaneFigure['polylines']> = [];
  const segments: NonNullable<PlaneFigure['segments']> = [];
  const cw = W / d;
  let at = 0;
  for (const [count, color] of fills) {
    for (let k = at; k < at + count; k++) {
      const row = Math.floor(k / d);
      const col = k % d;
      const y0 = H - gap - h - row * (h + gap);
      const x0 = r3(col * cw);
      const x1 = r3((col + 1) * cw);
      // Two layers of the light fill make shaded parts easy to see.
      const cell: P[] = [[x0, y0], [x1, y0], [x1, y0 + h], [x0, y0 + h], [x0, y0]];
      polylines.push({ points: cell, color, fill: true }, { points: cell, color, fill: true });
    }
    at += count;
  }
  for (let i = 0; i < bars; i++) {
    const y0 = H - gap - h - i * (h + gap);
    for (let k = 1; k < d; k++) segments.push({ from: [r3(k * cw), y0], to: [r3(k * cw), y0 + h], color: 'brand' });
    polylines.push({ points: [[0, y0], [W, y0], [W, y0 + h], [0, y0 + h], [0, y0]] });
  }
  return { type: 'plane', grid: { xMin: -2, xMax: W + 2, yMin: 0, yMax: H, step: W + 4 }, polylines, segments, hideTickLabels: true, caption };
}

/** Circles (pizzas or pies) each cut into `d` equal slices, with `shaded` slices shaded counting from the first circle. */
function piesFigure(d: number, count: number, shaded: number, caption: string): PlaneFigure {
  const R = 10;
  const gap = 4;
  const W = count * 2 * R + (count - 1) * gap;
  const polylines: NonNullable<PlaneFigure['polylines']> = [];
  const segments: NonNullable<PlaneFigure['segments']> = [];
  const angle = (k: number) => Math.PI / 2 - (2 * Math.PI * k) / d;
  for (let i = 0; i < count; i++) {
    const cx = R + i * (2 * R + gap);
    const cy = R + 1;
    const at = (t: number): P => [r3(cx + R * Math.cos(t)), r3(cy + R * Math.sin(t))];
    for (let k = 0; k < d; k++) {
      if (i * d + k >= shaded) break;
      const pts: P[] = [[cx, cy]];
      const steps = Math.max(2, Math.ceil(48 / d));
      for (let j = 0; j <= steps; j++) pts.push(at(angle(k) + ((angle(k + 1) - angle(k)) * j) / steps));
      pts.push([cx, cy]);
      polylines.push({ points: pts, color: 'accent', fill: true }, { points: pts, color: 'accent', fill: true });
    }
    const ring: P[] = [];
    for (let j = 0; j <= 48; j++) ring.push(at((2 * Math.PI * j) / 48));
    polylines.push({ points: ring });
    if (d > 1) for (let k = 0; k < d; k++) segments.push({ from: [cx, cy], to: at(angle(k)), color: 'brand' });
  }
  return { type: 'plane', grid: { xMin: -1, xMax: W + 1, yMin: 0, yMax: 2 * R + 2, step: W + 2 }, polylines, segments, hideTickLabels: true, caption };
}

/** A model of N/d: pies for friendly denominators, otherwise bars; enough wholes to hold N parts. */
function modelFigure(rng: Rng, N: number, d: number, caption: string, wholes = Math.max(1, Math.ceil(N / d))): Figure {
  const pie = [2, 3, 4, 6, 8].includes(d) && rng.chance(0.5);
  return pie ? piesFigure(d, wholes, N, caption) : barsFigure(d, wholes, [[N, 'accent']], caption);
}

/**
 * The number line draws a label under every tick when it has 12 ticks or fewer, which would print
 * decimals such as 0.25. These lengths keep more than 12 ticks with a label under every whole number only.
 */
function numberLineMax(d: number, need: number): number {
  for (let R = Math.max(1, Math.ceil(need)); R <= 12; R++) {
    const n = d * R + 1;
    if (n > 12 && d % Math.ceil(n / 10) === 0) return R;
  }
  return Math.max(1, Math.ceil(need));
}
/** Denominators that the number line can show with whole-number labels only. */
const NL_DENS = [2, 3, 4, 6, 8, 12];
/** The most a number line in d-ths can reach in this lesson. */
const NL_REACH: Record<number, number> = { 2: 6, 3: 7, 4: 4, 6: 4, 8: 2, 12: 2 };

function numberLine(d: number, points: Array<{ value: number; label: string }>, need = 0): NumberLineFigure {
  const max = numberLineMax(d, Math.max(need, ...points.map((p) => p.value)));
  return { type: 'numberLine', min: 0, max, step: 1 / d, points };
}

/** Improper fraction N/d as a mixed number, step by step. */
function toMixedSteps(N: number, d: number): string[] {
  const w = Math.floor(N / d);
  const r = N % d;
  return [
    `Every $${d}$ pieces of size $${fr(1, d)}$ make $1$ whole. How many groups of $${d}$ are in $${N}$? $${N} \\div ${d} = ${w}$ R $${r}$.`,
    `So there ${w === 1 ? 'is' : 'are'} $${w}$ ${s(w, 'whole')} and $${r}$ ${s(r, 'piece')} left over: $${fr(r, d)}$.`,
    `$${fr(N, d)} = ${mx(w, r, d)}$`,
  ];
}

/** Mixed number w r/d as an improper fraction, step by step. */
function toImproperSteps(w: number, r: number, d: number): string[] {
  return [
    `Each whole is $${fr(d, d)}$, so $${w}$ ${s(w, 'whole')} ${w === 1 ? 'is' : 'are'} $${w} \\times ${d} = ${w * d}$ pieces: $${fr(w * d, d)}$.`,
    `Add the $${r}$ extra ${s(r, 'piece')}: $${w * d} + ${r} = ${w * d + r}$.`,
    `$${mx(w, r, d)} = ${fr(w * d + r, d)}$`,
  ];
}

// ---------------------------------------------------------------------------
// 5.1 Improper fractions and mixed numbers
// ---------------------------------------------------------------------------

/** A fraction N/d with N > d whose fraction part is in lowest terms. */
function improper(rng: Rng, dens: number[], wMax: number): { N: number; d: number; w: number; r: number } {
  return retry(
    () => {
      const d = rng.pick(dens);
      const w = rng.int(1, wMax);
      const r = rng.int(1, d - 1);
      return { N: w * d + r, d, w, r };
    },
    (o) => lowestOK(o.N, o.d),
    200,
  );
}

function improperToMixed(rng: Rng, d: Difficulty): Out {
  const { N, d: den, w, r } = improper(rng, d === 1 ? [2, 3, 4, 5, 6, 8] : [3, 4, 5, 6, 7, 8, 9, 10, 12], d === 1 ? 3 : 9);
  const pic = d === 1;
  return {
    prompt: `${pic ? `The picture shows $${fr(N, den)}$. Each whole is cut into $${den}$ equal parts. ` : ''}Write $${fr(N, den)}$ as a mixed number.`,
    figure: pic ? modelFigure(rng, N, den, `${N} shaded parts; each whole has ${den} parts`) : undefined,
    parts: [fracPart(N, den, 'mixed')],
    hints: [
      `A mixed number has a whole-number part and a fraction part. Every $${den}$ pieces of size $${fr(1, den)}$ make one whole.`,
      `Divide: $${N} \\div ${den}$. The quotient is the number of wholes. The remainder is the number of $${fr(1, den)}$ pieces left over.`,
    ],
    solution: [...toMixedSteps(N, den), `The mixed number is $${mx(w, r, den)}$.`],
  };
}

function mixedToImproper(rng: Rng, d: Difficulty): Out {
  const { N, d: den, w, r } = improper(rng, d === 1 ? [2, 3, 4, 5, 6, 8] : [3, 4, 5, 6, 7, 8, 9, 10, 12], d === 1 ? 3 : 9);
  const pic = d === 1;
  return {
    prompt: `${pic ? `The picture shows $${mx(w, r, den)}$. ` : ''}Write $${mx(w, r, den)}$ as an improper fraction: $${mx(w, r, den)} = ${fr('?', den)}$`,
    figure: pic ? modelFigure(rng, N, den, `${w} ${s(w, 'whole')} and ${r}/${den} shaded`) : undefined,
    parts: [wholePart(N, '? =')],
    hints: [
      `How many $${fr(1, den)}$ pieces are in $1$ whole? There are $${den}$.`,
      `Multiply the wholes by $${den}$, then add the $${r}$ extra ${s(r, 'piece')}.`,
    ],
    solution: [...toImproperSteps(w, r, den), `The missing numerator is $${N}$.`],
  };
}

function wholeAsFraction(rng: Rng, d: Difficulty): Out {
  const kind = d === 1 ? rng.pick(['one', 'den'] as const) : rng.pick(['den', 'back'] as const);
  const W = rng.int(2, d === 1 ? 5 : 12);
  if (kind === 'one') {
    return {
      prompt: `A natural number can be written as a fraction with denominator $1$. Find the missing numerator: $${W} = ${fr('?', 1)}$`,
      parts: [wholePart(W, '? =')],
      hints: ['The denominator $1$ means each whole is cut into just $1$ piece.', `$${W}$ wholes cut into $1$ piece each make $${W}$ pieces.`],
      solution: [`With denominator $1$, each whole is $1$ piece.`, `$${W}$ wholes are $${W}$ pieces, so $${W} = ${fr(W, 1)}$.`, `The missing numerator is $${W}$.`],
    };
  }
  const den = rng.pick(d === 1 ? [2, 3, 4, 5] : [3, 4, 5, 6, 8, 10, 12]);
  if (kind === 'den') {
    return {
      prompt: `How many ${den === 2 ? 'halves' : den === 4 ? 'quarters' : `$${fr(1, den)}$ pieces`} are in $${W}$ wholes? Find the missing numerator: $${W} = ${fr('?', den)}$`,
      figure: d === 1 ? modelFigure(rng, W * den, den, `${W} wholes, each cut into ${den} parts`, W) : undefined,
      parts: [wholePart(W * den, '? =')],
      hints: [`One whole is $${fr(den, den)}$.`, `Multiply: $${W} \\times ${den}$.`],
      solution: [`One whole is $${fr(den, den)}$, so each whole has $${den}$ pieces.`, `$${W}$ wholes have $${W} \\times ${den} = ${W * den}$ pieces.`, `$${W} = ${fr(W * den, den)}$, so the missing numerator is $${W * den}$.`],
    };
  }
  return {
    prompt: `The improper fraction $${fr(W * den, den)}$ is equal to a natural number. Which one?`,
    parts: [wholePart(W)],
    hints: [`Every $${den}$ pieces make one whole.`, `Divide: $${W * den} \\div ${den}$.`],
    solution: [`Every $${den}$ pieces make $1$ whole.`, `$${W * den} \\div ${den} = ${W}$, with nothing left over.`, `$${fr(W * den, den)} = ${W}$`],
  };
}

function countBeyond(rng: Rng): Out {
  const den = rng.pick([2, 3, 4, 5, 6, 8]);
  const start = rng.int(Math.max(1, den - 2), den);
  const shown = [start, start + 1, start + 2];
  const next = start + 3;
  const word = den === 2 ? 'halves' : den === 4 ? 'fourths' : den === 3 ? 'thirds' : `${['', '', '', '', '', 'fifths', 'sixths', '', 'eighths'][den]}`;
  return {
    prompt: `Count by ${word}: $${shown.map((n) => fr(n, den)).join(',\\ ')},\\ ${fr('?', den)}$. What is the missing numerator?`,
    parts: [wholePart(next, '? =')],
    hints: [`Each step adds one more $${fr(1, den)}$.`, `The numerator goes up by $1$ each time. The denominator stays $${den}$.`],
    solution: [
      `Counting by ${word} adds $${fr(1, den)}$ each time, so the numerator goes up by $1$.`,
      `After $${fr(start + 2, den)}$ comes $${fr(next, den)}$. ${next > den ? `It is more than $1$ whole: $${fr(next, den)} = ${mixedOf(next, den)}$.` : next === den ? `It is $1$ whole.` : ''}`,
      `The missing numerator is $${next}$.`,
    ],
  };
}

function whichImproper(rng: Rng): Out {
  const den = rng.pick([3, 4, 5, 6, 8]);
  const top = rng.int(den + 1, 2 * den - 1);
  const proper = rng.sample(Array.from({ length: den - 1 }, (_, i) => i + 1), 2);
  const flip = rng.int(1, den - 1);
  const choices = [`$${fr(top, den)}$`, ...proper.map((n) => `$${fr(n, den)}$`), `$${fr(flip, den + flip)}$`];
  return {
    prompt: 'Which fraction is an **improper fraction**?',
    parts: [{ answer: mc(rng, choices[0], choices.slice(1)) }],
    hints: ['Look at the numerator (top) and the denominator (bottom).', 'In an improper fraction, the numerator is greater than the denominator.'],
    solution: [
      'An improper fraction has a numerator that is greater than its denominator. It is more than $1$ whole.',
      `In $${fr(top, den)}$, $${top} > ${den}$. In the other fractions, the numerator is less than the denominator.`,
      `The improper fraction is $${fr(top, den)}$.`,
    ],
  };
}

interface ImStory {
  text: string;
  ask: string;
  part: Part;
  steps: string[];
  answer: string;
  hint: string;
  hint2: string;
}

function improperStory(rng: Rng): Out {
  const name = pickName(rng);
  const kind = rng.pick(['scoops', 'pizza', 'laps', 'ribbon', 'juice', 'bannock'] as const);
  let st: ImStory;
  if (kind === 'scoops' || kind === 'ribbon') {
    const den = kind === 'scoops' ? rng.pick([2, 3, 4]) : rng.pick([2, 4, 5, 10]);
    const { N, w, r } = improper(rng, [den], kind === 'scoops' ? 3 : 4);
    st =
      kind === 'scoops'
        ? {
            text: `${name} is baking bannock for a class feast. The recipe needs $${mx(w, r, den)}$ cups of flour. The only measuring cup is a $${fr(1, den)}$ cup.`,
            ask: `How many times does ${name} need to fill the $${fr(1, den)}$ cup?`,
            part: wholePart(N, undefined, 'times'),
            steps: [...toImproperSteps(w, r, den), `Each scoop is $${fr(1, den)}$ cup, so ${name} needs $${N}$ scoops.`],
            answer: `${name} fills the cup $${N}$ times.`,
            hint: `Write $${mx(w, r, den)}$ as an improper fraction with denominator $${den}$.`,
            hint2: `One whole is $${den}$ pieces of size $${fr(1, den)}$. Multiply the wholes by $${den}$, then add the $${r}$ extra.`,
          }
        : {
            text: `${name} has a ribbon $${mx(w, r, den)}$ m long for a craft project. ${name} cuts it into pieces that are each $${fr(1, den)}$ m long.`,
            ask: 'How many pieces does ' + name + ' get?',
            part: wholePart(N, undefined, 'pieces'),
            steps: [...toImproperSteps(w, r, den), `Each piece is $${fr(1, den)}$ m, so there are $${N}$ pieces.`],
            answer: `${name} gets $${N}$ pieces.`,
            hint: `Write $${mx(w, r, den)}$ as an improper fraction with denominator $${den}$.`,
            hint2: `One whole is $${den}$ pieces of size $${fr(1, den)}$. Multiply the wholes by $${den}$, then add the $${r}$ extra.`,
          };
  } else {
    const den = kind === 'pizza' ? rng.pick([6, 8, 10, 12]) : kind === 'laps' ? rng.pick([2, 4, 5, 10]) : kind === 'juice' ? rng.pick([3, 4, 5]) : rng.pick([6, 8, 9, 12]);
    const { N, w, r } = improper(rng, [den], kind === 'pizza' || kind === 'bannock' ? 4 : 5);
    const town = rng.pick(TOWNS);
    const base = {
      pizza: {
        text: `At a pizza party in ${town}, every pizza is cut into $${den}$ equal slices. The class eats $${N}$ slices.`,
        ask: `How many pizzas did the class eat? ${MIXED_FORM}`,
        unit: 'pizzas', piece: 'slice',
      },
      laps: {
        text: `One lap of the school track is $${fr(1, den)}$ km. ${name} runs $${N}$ laps.`,
        ask: `How many kilometres does ${name} run? ${MIXED_FORM}`,
        unit: 'km', piece: 'lap',
      },
      juice: {
        text: `Each cup at a lemonade stand holds $${fr(1, den)}$ L. ${name} sells $${N}$ cups of lemonade.`,
        ask: `How many litres of lemonade did ${name} sell? ${MIXED_FORM}`,
        unit: 'L', piece: 'cup',
      },
      bannock: {
        text: `At a family picnic, each pan of bannock is cut into $${den}$ equal pieces. Everyone eats $${N}$ pieces in all.`,
        ask: `How many pans of bannock were eaten? ${MIXED_FORM}`,
        unit: 'pans', piece: 'piece',
      },
    }[kind];
    st = {
      text: base.text,
      ask: base.ask,
      part: fracPart(N, den, 'mixed', base.unit),
      steps: [`Each ${base.piece} is $${fr(1, den)}$ of a whole${kind === 'laps' ? ' kilometre' : kind === 'juice' ? ' litre' : ''}, so $${N}$ ${base.piece}s are $${fr(N, den)}$.`, ...toMixedSteps(N, den).slice(0, 2), `$${fr(N, den)} = ${mx(w, r, den)}$`],
      answer: `The answer is $${mx(w, r, den)}$ ${base.unit}.`,
      hint: `Write the amount as the improper fraction $${fr(N, den)}$ first.`,
      hint2: `Every $${den}$ pieces make one whole. Divide $${N}$ by $${den}$: the quotient is the wholes and the remainder is the pieces left over.`,
    };
  }
  return {
    prompt: `${st.text} ${st.ask}`,
    parts: [st.part],
    hints: [st.hint, st.hint2],
    solution: [...st.steps, st.answer],
  };
}

const improperMixed = skill({
  id: 'm5-improper-mixed',
  name: 'Improper fractions and mixed numbers',
  description: 'Write improper fractions as mixed numbers and mixed numbers as improper fractions, including natural numbers as fractions.',
  outcomes: ['N5'],
  lessonId: 'm5-5-1',
  gen(rng, d) {
    if (d === 1) {
      return rng.weighted<(r: Rng, dd: Difficulty) => Out>([
        [improperToMixed, 3],
        [mixedToImproper, 3],
        [wholeAsFraction, 1.5],
        [(r) => countBeyond(r), 1.5],
        [(r) => whichImproper(r), 1],
      ])(rng, d);
    }
    if (d === 2) return rng.weighted<(r: Rng, dd: Difficulty) => Out>([[improperToMixed, 4], [mixedToImproper, 4], [wholeAsFraction, 2]])(rng, d);
    return improperStory(rng);
  },
});

// ---------------------------------------------------------------------------
// 5.1 Fractions on a number line and benchmarks
// ---------------------------------------------------------------------------

const LETTERS = ['A', 'B', 'C', 'D'];
const BENCH = ['$0$', '$\\dfrac{1}{2}$', '$1$'];

/** A number line in d-ths for a question, and the largest tick (in d-ths) a point may use. */
function lineSetup(rng: Rng, d: Difficulty): { den: number; R: number; top: number } {
  const den = rng.pick(d === 1 ? [2, 4, 6, 8] : NL_DENS);
  const R = numberLineMax(den, d === 1 ? 2 : NL_REACH[den]);
  return { den, R, top: d === 1 ? Math.min(R * den - 1, 2 * den) : R * den - 1 };
}

/** Distinct tick positions (in d-ths) near a target, inside (0, top]. */
function nearbyTicks(rng: Rng, target: number, d: number, top: number, n: number): number[] {
  const first = rng.shuffle([target + 1, target - 1, target + d, target - d]);
  const out: number[] = [];
  for (const c of [...first, target + 2, target - 2, target + d + 1, target - d - 1, target + 3, target - 3]) {
    if (c > 0 && c <= top && c !== target && !out.includes(c)) out.push(c);
    if (out.length >= n) break;
  }
  return out;
}

/** Read the fraction or mixed number at a point on a number line. */
function readPoint(rng: Rng, d: Difficulty): Out {
  const { den, R, top } = lineSetup(rng, d);
  const N = retry(() => rng.int(d === 1 ? 1 : den + 1, top), (n) => n % den !== 0 && (d === 1 || n > den), 200);
  const asMixed = d >= 2;
  const w = Math.floor(N / den);
  const r = N % den;
  const right = asMixed ? `$${mx(w, r, den)}$` : `$${fr(N, den)}$`;
  const r2 = r < den - 1 ? r + 1 : r - 1;
  const wrong = asMixed
    ? [`$${mx(w, r, den + 1)}$`, `$${mx(w + 1, r, den)}$`, `$${mx(w, r2, den)}$`, `$${mx(w - 1, r, den)}$`]
    : [`$${fr(N, den + 1)}$`, `$${fr(N + 1, den)}$`, `$${fr(N > 1 ? N - 1 : N + 2, den)}$`, `$${fr(den, N)}$`];
  return {
    prompt: `Each whole on the number line is cut into $${den}$ equal parts. Which ${asMixed ? 'mixed number' : 'fraction'} is at point A?`,
    figure: numberLine(den, [{ value: N / den, label: 'A' }], R),
    parts: [{ answer: mc(rng, right, rng.shuffle(wrong)) }],
    hints: [
      `Count the spaces between $0$ and $1$. There are $${den}$, so each space is $${fr(1, den)}$.`,
      asMixed ? 'Find the whole number just before A. Then count the spaces from it to A.' : 'Count the spaces from $0$ to A.',
    ],
    solution: [
      `There are $${den}$ equal spaces between each pair of whole numbers, so each space is $${fr(1, den)}$.`,
      asMixed
        ? `Point A is $${r}$ ${s(r, 'space')} past $${w}$, so it is at $${mx(w, r, den)}$. That is the same point as $${fr(N, den)}$.`
        : `Point A is $${N}$ ${s(N, 'space')} from $0$, so it is at $${fr(N, den)}$.${N > den ? ` That is the same point as $${mixedOf(N, den)}$.` : ''}`,
      `The answer is ${right}.`,
    ],
  };
}

/** Pick the labelled point that shows a given fraction or mixed number. */
function findPoint(rng: Rng, d: Difficulty): Out {
  const { den, R, top } = lineSetup(rng, d);
  const N = retry(() => rng.int(d === 1 ? 2 : den + 1, top), (n) => n % den !== 0 && (d === 1 || n > den), 200);
  const ticks = [N, ...nearbyTicks(rng, N, den, top, 3)].sort((a, b) => a - b);
  const label = (t: number) => LETTERS[ticks.indexOf(t)];
  const asMixed = d >= 2 && rng.chance(0.5);
  const name = asMixed ? mixedOf(N, den) : fr(N, den);
  const w = Math.floor(N / den);
  const r = N % den;
  return {
    prompt: `Which point is at $${name}$?`,
    figure: numberLine(den, ticks.map((t) => ({ value: t / den, label: label(t) })), R),
    parts: [{ answer: fixedChoice(ticks.map(label), ticks.indexOf(N)) }],
    hints: [
      `Each whole is cut into $${den}$ equal spaces, so each space is $${fr(1, den)}$.`,
      N > den ? `${asMixed ? '' : `$${fr(N, den)} = ${mixedOf(N, den)}$. `}Go to $${w}$. Then count $${r}$ more ${s(r, 'space')}.` : `Count $${N}$ spaces from $0$.`,
    ],
    solution: [
      `Each space is $${fr(1, den)}$.`,
      N > den
        ? `$${mx(w, r, den)}$ is $${r}$ ${s(r, 'space')} past $${w}$. It is the same point as $${fr(N, den)}$, which is $${N}$ spaces from $0$.`
        : `$${fr(N, den)}$ is $${N}$ ${s(N, 'space')} from $0$.`,
      `Point ${label(N)} is at $${name}$.`,
    ],
  };
}

/** Where a fraction sits compared to 0, 1/2 and 1. */
function benchmarkPlace(rng: Rng, d: Difficulty): Out {
  if (d === 1) {
    // Closest to 0, 1/2 or 1? Even denominators only, and never exactly halfway between two benchmarks.
    const { a, den } = retry(
      () => {
        const den = rng.pick([6, 8, 10, 12]);
        return { a: rng.int(1, den - 1), den };
      },
      ({ a, den }) => 4 * a !== den && 4 * a !== 3 * den && 2 * a !== den,
      200,
    );
    const half = den / 2;
    const idx = 4 * a < den ? 0 : 4 * a < 3 * den ? 1 : 2;
    return {
      prompt: `Is $${fr(a, den)}$ closest to $0$, $\\dfrac{1}{2}$ or $1$?`,
      parts: [{ answer: fixedChoice(BENCH, idx) }],
      hints: [
        `Write the benchmarks with denominator $${den}$: $0 = ${fr(0, den)}$, $\\dfrac{1}{2} = ${fr(half, den)}$ and $1 = ${fr(den, den)}$.`,
        `Which numerator is $${a}$ closest to: $0$, $${half}$ or $${den}$?`,
      ],
      solution: [
        `With denominator $${den}$: $0 = ${fr(0, den)}$, $\\dfrac{1}{2} = ${fr(half, den)}$ and $1 = ${fr(den, den)}$.`,
        `$${a}$ is closest to $${[0, half, den][idx]}$.`,
        `So $${fr(a, den)}$ is closest to ${BENCH[idx]}.`,
      ],
    };
  }
  // Between 0 and 1/2, between 1/2 and 1, or greater than 1?
  const { a, den } = retry(
    () => {
      const den = rng.pick([3, 4, 5, 6, 7, 8, 9, 10, 12]);
      return { a: rng.int(1, 2 * den - 1), den };
    },
    ({ a, den }) => a !== den && 2 * a !== den,
    200,
  );
  const opts = ['between $0$ and $\\dfrac{1}{2}$', 'between $\\dfrac{1}{2}$ and $1$', 'greater than $1$'];
  const idx = 2 * a < den ? 0 : a < den ? 1 : 2;
  return {
    prompt: `Where is $${fr(a, den)}$ on a number line?`,
    parts: [{ answer: fixedChoice(opts, idx) }],
    hints: [
      'Compare the numerator with the denominator. If the numerator is greater, the fraction is greater than $1$.',
      'To compare with $\\dfrac{1}{2}$, double the numerator. If the double is greater than the denominator, the fraction is greater than $\\dfrac{1}{2}$.',
    ],
    solution: [
      a > den
        ? `The numerator $${a}$ is greater than the denominator $${den}$, so $${fr(a, den)}$ is more than $1$ whole.`
        : `The numerator $${a}$ is less than the denominator $${den}$, so $${fr(a, den)}$ is less than $1$.`,
      ...(a < den ? [`Double the numerator: $2 \\times ${a} = ${2 * a}$. ${2 * a < den ? `$${2 * a} < ${den}$, so it is less than $\\dfrac{1}{2}$.` : `$${2 * a} > ${den}$, so it is greater than $\\dfrac{1}{2}$.`}`] : []),
      `$${fr(a, den)}$ is ${opts[idx]}.`,
    ],
  };
}

/** Which improper fraction names the same point as a mixed number (or the reverse)? */
function samePoint(rng: Rng): Out {
  const { N, d: den, w, r } = improper(rng, [2, 3, 4, 5, 6, 8, 10], 4);
  if (rng.chance(0.5)) {
    const right = `$${fr(N, den)}$`;
    const wrong = [`$${fr(w + r, den)}$`, `$${fr(w * r + den, den)}$`, `$${fr(N + 1, den)}$`, `$${fr(w * den - r, den)}$`];
    return {
      prompt: `Which improper fraction is at the same point on the number line as $${mx(w, r, den)}$?`,
      parts: [{ answer: mc(rng, right, rng.shuffle(wrong)) }],
      hints: [`One whole is $${fr(den, den)}$.`, `Multiply the wholes by $${den}$ and add the extra $${r}$.`],
      solution: [...toImproperSteps(w, r, den), `$${mx(w, r, den)}$ and $${fr(N, den)}$ are at the same point. The answer is ${right}.`],
    };
  }
  const right = `$${mx(w, r, den)}$`;
  const wrong = [`$${mx(w + 1, r, den)}$`, ...(w < den ? [`$${mx(r, w, den)}$`] : []), ...(den - r !== r ? [`$${mx(w, den - r, den)}$`] : []), ...(w > 1 ? [`$${mx(w - 1, r, den)}$`] : [])];
  return {
    prompt: `Which mixed number is at the same point on the number line as $${fr(N, den)}$?`,
    parts: [{ answer: mc(rng, right, rng.shuffle(wrong)) }],
    hints: [`Every $${den}$ pieces make one whole.`, `Divide $${N}$ by $${den}$. The remainder is the numerator of the fraction part.`],
    solution: [...toMixedSteps(N, den), `They name the same point. The answer is ${right}.`],
  };
}

type Zone = 'low' | 'mid' | 'over' | 'half' | 'one';
interface Cand {
  a: number;
  den: number;
}

/** A fraction in a zone: below 1/2, between 1/2 and 1, above 1, or exactly 1/2 or 1. */
function zoneFraction(rng: Rng, zone: Zone): Cand {
  if (zone === 'half') {
    const den = rng.pick([4, 6, 8, 10, 12]);
    return { a: den / 2, den };
  }
  const den = rng.pick([3, 4, 5, 6, 8, 10, 12]);
  if (zone === 'one') return { a: den, den };
  if (zone === 'low') return { a: rng.int(1, Math.ceil(den / 2) - 1), den };
  if (zone === 'mid') return { a: rng.int(Math.floor(den / 2) + 1, den - 1), den };
  return { a: rng.int(den + 1, 2 * den - 1), den };
}

/** Pick the fraction (with different denominators) in a benchmark interval, sometimes in a story. */
function betweenBenchmarks(rng: Rng): Out {
  const target = rng.pick(['low', 'mid', 'mid', 'over'] as const);
  const right = zoneFraction(rng, target);
  const same = (x: Cand, y: Cand) => x.a * y.den === y.a * x.den;
  const wrongs: Cand[] = [];
  for (const z of rng.sample((['low', 'mid', 'over', 'half', 'one'] as Zone[]).filter((x) => x !== target), 3)) {
    wrongs.push(retry(() => zoneFraction(rng, z), (c) => !same(c, right) && !wrongs.some((w) => same(w, c)), 100));
  }
  const ask = target === 'low' ? 'between $0$ and $\\dfrac{1}{2}$' : target === 'mid' ? 'between $\\dfrac{1}{2}$ and $1$' : 'greater than $1$';
  const tex = (c: Cand) => `$${fr(c.a, c.den)}$`;
  const why = (c: Cand) =>
    c.a > c.den
      ? `${tex(c)}: $${c.a} > ${c.den}$, so it is greater than $1$.`
      : c.a === c.den
        ? `${tex(c)} is exactly $1$.`
        : 2 * c.a === c.den
          ? `${tex(c)}: $2 \\times ${c.a} = ${c.den}$, so it is exactly $\\dfrac{1}{2}$.`
          : 2 * c.a < c.den
            ? `${tex(c)}: $2 \\times ${c.a} = ${2 * c.a}$, which is less than $${c.den}$, so it is less than $\\dfrac{1}{2}$.`
            : `${tex(c)}: $2 \\times ${c.a} = ${2 * c.a}$, which is more than $${c.den}$, and $${c.a} < ${c.den}$. It is between $\\dfrac{1}{2}$ and $1$.`;
  const order = rng.shuffle([right, ...wrongs]);
  if (rng.chance(0.5)) {
    const names = rng.sample(NAMES, 4);
    const who = (c: Cand) => names[order.indexOf(c)];
    return {
      prompt: `Four friends went for walks in ${rng.pick(TOWNS)}. ${order.map((c) => `${who(c)} walked ${tex(c)} km`).join('. ')}. Who walked a distance ${ask} km?`,
      parts: [{ answer: fixedChoice(order.map(who), order.indexOf(right)) }],
      hints: [
        'Compare each numerator with its denominator to see if the distance is more than $1$ km.',
        'Then double the numerator. If the double is more than the denominator, the fraction is more than $\\dfrac{1}{2}$.',
      ],
      solution: [...order.map((c) => `${who(c)}: ${why(c)}`), `${who(right)} walked a distance ${ask} km.`],
    };
  }
  return {
    prompt: `Which fraction is ${ask}?`,
    parts: [{ answer: mc(rng, tex(right), wrongs.map(tex)) }],
    hints: [
      'Compare each numerator with its denominator to see if the fraction is greater than $1$.',
      'Then double the numerator. If the double is more than the denominator, the fraction is more than $\\dfrac{1}{2}$.',
    ],
    solution: [...order.map(why), `The answer is ${tex(right)}.`],
  };
}

const fractionNumberLine = skill({
  id: 'm5-fraction-number-line',
  name: 'Fractions on a number line',
  description: 'Place fractions, improper fractions and mixed numbers on a number line and compare them to 0, 1/2 and 1.',
  outcomes: ['N5'],
  lessonId: 'm5-5-1',
  format: 'mc',
  gen(rng, d) {
    if (d === 1) return rng.weighted<(r: Rng, dd: Difficulty) => Out>([[readPoint, 1], [findPoint, 1], [benchmarkPlace, 1]])(rng, d);
    if (d === 2) return rng.weighted<(r: Rng, dd: Difficulty) => Out>([[readPoint, 1], [findPoint, 1], [benchmarkPlace, 1], [(r) => samePoint(r), 1]])(rng, d);
    return betweenBenchmarks(rng);
  },
});

// ---------------------------------------------------------------------------
// 5.2 Adding and subtracting fractions with common denominators
// ---------------------------------------------------------------------------

const ADD_HINT = 'The denominators are the same, so the pieces are the same size. Only the number of pieces changes.';

/** One sum or difference of two proper fractions with the same denominator; the result is in (0, 1]. */
function addSubD1(rng: Rng): Out {
  const kind = rng.pick(['add', 'sub', 'split'] as const);
  const den = rng.pick([3, 4, 5, 6, 8, 10, 12]);
  if (kind === 'split') {
    const N = rng.int(3, den - 1);
    const a = rng.int(1, N - 1);
    return {
      prompt: `$${fr(N, den)}$ is made of $${N}$ unit fractions $${fr(1, den)}$. Split it into two parts. Find the missing numerator: $${fr(N, den)} = ${fr(a, den)} + ${fr('?', den)}$`,
      figure: barsFigure(den, 1, [[a, 'brand'], [N - a, 'accent']], `${N}/${den} split into ${a}/${den} and another part`),
      parts: [wholePart(N - a, '? =')],
      hints: [`$${fr(N, den)}$ is $${N}$ pieces of size $${fr(1, den)}$.`, `$${a}$ pieces plus how many more pieces make $${N}$ pieces?`],
      solution: [`$${fr(N, den)}$ is $${N}$ pieces. $${fr(a, den)}$ is $${a}$ of them.`, `$${N} - ${a} = ${N - a}$, so $${N - a}$ ${s(N - a, 'piece')} ${N - a === 1 ? 'is' : 'are'} left.`, `$${fr(N, den)} = ${fr(a, den)} + ${fr(N - a, den)}$, so the missing numerator is $${N - a}$.`],
    };
  }
  const [a, b] = retry(
    () => [rng.int(1, den - 1), rng.int(1, den - 1)],
    ([x, y]) => (kind === 'add' ? x + y <= den : x > y),
    200,
  );
  const res = kind === 'add' ? a + b : a - b;
  const op = kind === 'add' ? '+' : '-';
  const pic = rng.chance(0.6);
  const figure = pic
    ? kind === 'add'
      ? barsFigure(den, 1, [[a, 'brand'], [b, 'accent']], `${a}/${den} and ${b}/${den} shaded on one bar`)
      : barsFigure(den, 1, [[res, 'accent'], [b, 'muted']], `${a}/${den} shaded; ${b}/${den} of it is taken away`)
    : undefined;
  return {
    prompt: `${pic ? (kind === 'add' ? 'The bar shows the sum. ' : `The bar shows $${fr(a, den)}$. The grey part is taken away. `) : ''}Find the missing numerator: $${fr(a, den)} ${op} ${fr(b, den)} = ${fr('?', den)}$`,
    figure,
    parts: [wholePart(res, '? =')],
    hints: [ADD_HINT, `${kind === 'add' ? 'Add' : 'Subtract'} the numerators: $${a} ${op} ${b}$. Keep the denominator $${den}$.`],
    solution: [
      `Both fractions count pieces of size $${fr(1, den)}$.`,
      `$${a}$ ${s(a, 'piece')} $${op}$ $${b}$ ${s(b, 'piece')} $= ${res}$ ${s(res, 'piece')}.`,
      `$${fr(a, den)} ${op} ${fr(b, den)} = ${fr(res, den)}$${res === den ? `, which is $1$ whole` : ''}. The missing numerator is $${res}$.`,
    ],
  };
}

interface Mixed {
  w: number;
  n: number;
  d: number;
}
const mtex = (m: Mixed) => mx(m.w, m.n, m.d);
const total = (m: Mixed) => m.w * m.d + m.n;

/** Steps for adding or subtracting two mixed numbers by wholes and parts (with regrouping when needed). */
function mixedSteps(x: Mixed, y: Mixed, op: '+' | '-'): string[] {
  const den = x.d;
  const steps: string[] = [];
  if (op === '+') {
    const W = x.w + y.w;
    const F = x.n + y.n;
    steps.push(`Add the wholes: $${x.w} + ${y.w} = ${W}$. Add the fractions: $${fr(x.n, den)} + ${fr(y.n, den)} = ${fr(F, den)}$.`);
    if (F >= den) {
      steps.push(`$${fr(F, den)}$ is more than $1$: $${fr(F, den)} = ${mixedOf(F, den)}$. So $${W} + ${mixedOf(F, den)} = ${mixedOf(W * den + F, den)}$.`);
    } else steps.push(`Put them together: $${mx(W, F, den)}$.`);
    return steps;
  }
  if (x.n >= y.n) {
    steps.push(`Subtract the wholes: $${x.w} - ${y.w} = ${x.w - y.w}$. Subtract the fractions: $${fr(x.n, den)} - ${fr(y.n, den)} = ${fr(x.n - y.n, den)}$.`);
    steps.push(`Put them together: $${mx(x.w - y.w, x.n - y.n, den)}$.`);
    return steps;
  }
  steps.push(`$${fr(x.n, den)}$ is less than $${fr(y.n, den)}$, so regroup $1$ whole as $${fr(den, den)}$: $${mtex(x)} = ${x.w - 1} + ${fr(den + x.n, den)}$.`);
  steps.push(`Subtract the wholes: $${x.w - 1} - ${y.w} = ${x.w - 1 - y.w}$. Subtract the fractions: $${fr(den + x.n, den)} - ${fr(y.n, den)} = ${fr(den + x.n - y.n, den)}$.`);
  steps.push(`Put them together: $${mx(x.w - 1 - y.w, den + x.n - y.n, den)}$.`);
  return steps;
}

/** The same sum or difference with improper fractions. */
function improperSteps(x: Mixed, y: Mixed, op: '+' | '-'): string {
  const A = total(x);
  const B = total(y);
  const R = op === '+' ? A + B : A - B;
  return `Or use improper fractions: $${fr(A, x.d)} ${op} ${fr(B, x.d)} = ${fr(R, x.d)} = ${mixedOf(R, x.d)}$.`;
}

/** Two mixed numbers with the same denominator; the result is positive and its fraction part is in lowest terms. */
function mixedPair(rng: Rng, dens: number[], op: '+' | '-', regroup: boolean, wMax: number): { x: Mixed; y: Mixed; R: number } {
  return retry(
    () => {
      const den = rng.pick(dens);
      const x = { w: rng.int(1, wMax), n: rng.int(1, den - 1), d: den };
      const y = { w: rng.int(1, wMax), n: rng.int(1, den - 1), d: den };
      const R = op === '+' ? total(x) + total(y) : total(x) - total(y);
      return { x, y, R };
    },
    ({ x, y, R }) => {
      const den = x.d;
      if (!lowestOK(R, den) || R <= den) return false;
      if (op === '+') return regroup ? x.n + y.n > den : x.n + y.n < den;
      if (x.w <= y.w) return false;
      return regroup ? x.n < y.n : x.n > y.n;
    },
    300,
  );
}

function addSubD2(rng: Rng): Out {
  const kind = rng.pick(['improper', 'mixed', 'mixed', 'hundredths'] as const);
  const op = rng.pick(['+', '-'] as const);
  if (kind === 'improper') {
    const { A, B, den } = retry(
      () => {
        const den = rng.pick([3, 4, 5, 6, 8, 10]);
        return { A: rng.int(den + 1, 3 * den), B: rng.int(2, 2 * den), den };
      },
      ({ A, B, den }) => (op === '+' ? lowestOK(A + B, den) && (A + B) % den !== 0 : A - B > den && lowestOK(A - B, den)),
      300,
    );
    const R = op === '+' ? A + B : A - B;
    return {
      prompt: `Find $${fr(A, den)} ${op} ${fr(B, den)}$. ${FRACTION_FORM}`,
      parts: [fracPart(R, den, 'lowest')],
      hints: [ADD_HINT, `${op === '+' ? 'Add' : 'Subtract'} the numerators: $${A} ${op} ${B}$. Keep the denominator $${den}$.`],
      solution: [
        `The denominators are both $${den}$, so ${op === '+' ? 'add' : 'subtract'} the numerators: $${A} ${op} ${B} = ${R}$.`,
        `$${fr(A, den)} ${op} ${fr(B, den)} = ${fr(R, den)}$`,
        `As a mixed number, $${fr(R, den)} = ${mixedOf(R, den)}$. Either form is correct.`,
      ],
    };
  }
  if (kind === 'hundredths') {
    const [a, b] = retry(
      () => [rng.int(11, 89), rng.int(11, 89)],
      ([x, y]) => (op === '+' ? x + y < 100 && lowestOK(x + y, 100) : x - y > 0 && lowestOK(x - y, 100)),
      300,
    );
    const R = op === '+' ? a + b : a - b;
    return {
      prompt: `Find $${fr(a, 100)} ${op} ${fr(b, 100)}$. ${FRACTION_FORM}`,
      parts: [fracPart(R, 100, 'lowest')],
      hints: [ADD_HINT, `${op === '+' ? 'Add' : 'Subtract'} the numerators: $${a} ${op} ${b}$. Keep the denominator $100$.`],
      solution: [`Both fractions count hundredths.`, `$${a} ${op} ${b} = ${R}$`, `$${fr(a, 100)} ${op} ${fr(b, 100)} = ${fr(R, 100)}$`],
    };
  }
  const { x, y, R } = mixedPair(rng, [3, 4, 5, 6, 7, 8, 9, 10, 12], op, false, 6);
  return {
    prompt: `Find $${mtex(x)} ${op} ${mtex(y)}$. ${MIXED_FORM}`,
    parts: [fracPart(R, x.d, 'mixed')],
    hints: [`${op === '+' ? 'Add' : 'Subtract'} the whole numbers. Then ${op === '+' ? 'add' : 'subtract'} the fractions.`, `The denominator stays $${x.d}$.`],
    solution: [...mixedSteps(x, y, op), improperSteps(x, y, op), `$${mtex(x)} ${op} ${mtex(y)} = ${mixedOf(R, x.d)}$`],
  };
}

function addSubD3(rng: Rng): Out {
  const kind = rng.pick(['regroup', 'regroup', 'three', 'whole', 'missing'] as const);
  if (kind === 'regroup') {
    const op = rng.pick(['+', '-'] as const);
    const { x, y, R } = mixedPair(rng, [3, 4, 5, 6, 7, 8, 9, 10, 12], op, true, 7);
    return {
      prompt: `Find $${mtex(x)} ${op} ${mtex(y)}$. ${MIXED_FORM}`,
      parts: [fracPart(R, x.d, 'mixed')],
      hints: [
        op === '+' ? 'Add the wholes and add the fractions. Is the fraction part more than $1$?' : `You cannot take $${fr(y.n, x.d)}$ from $${fr(x.n, x.d)}$. Regroup $1$ whole, or change both to improper fractions.`,
        `Improper fractions work too: $${mtex(x)} = ${fr(total(x), x.d)}$ and $${mtex(y)} = ${fr(total(y), x.d)}$.`,
      ],
      solution: [...mixedSteps(x, y, op), improperSteps(x, y, op), `$${mtex(x)} ${op} ${mtex(y)} = ${mixedOf(R, x.d)}$`],
    };
  }
  if (kind === 'three') {
    const { A, B, C, den } = retry(
      () => {
        const den = rng.pick([3, 4, 5, 6, 8, 10, 12]);
        return { A: rng.int(2, 2 * den), B: rng.int(2, 2 * den), C: rng.int(2, 2 * den), den };
      },
      ({ A, B, C, den }) => A + B - C > 0 && lowestOK(A + B - C, den) && A + B - C > den,
      300,
    );
    const R = A + B - C;
    return {
      prompt: `Find $${fr(A, den)} + ${fr(B, den)} - ${fr(C, den)}$. ${FRACTION_FORM}`,
      parts: [fracPart(R, den, 'lowest')],
      hints: ['Work from left to right.', `All the denominators are $${den}$, so work with the numerators: $${A} + ${B} - ${C}$.`],
      solution: [
        `Add first: $${fr(A, den)} + ${fr(B, den)} = ${fr(A + B, den)}$.`,
        `Then subtract: $${fr(A + B, den)} - ${fr(C, den)} = ${fr(R, den)}$.`,
        `The answer is $${fr(R, den)}$, which is the same as $${mixedOf(R, den)}$.`,
      ],
    };
  }
  if (kind === 'whole') {
    const { W, y } = retry(
      () => {
        const den = rng.pick([3, 4, 5, 6, 8, 10]);
        return { W: rng.int(2, 9), y: { w: rng.int(0, 5), n: rng.int(1, den - 1), d: den } };
      },
      ({ W, y }) => W > y.w + 0 && lowestOK(W * y.d - total(y), y.d),
      300,
    );
    const den = y.d;
    const R = W * den - total(y);
    return {
      prompt: `Find $${W} - ${mtex(y)}$. ${MIXED_FORM}`,
      parts: [fracPart(R, den, 'mixed')],
      hints: [`There is no fraction to subtract from in $${W}$. Regroup $1$ whole as $${fr(den, den)}$.`, `$${W} = ${W - 1} + ${fr(den, den)}$.`],
      solution: [
        `Regroup $1$ whole: $${W} = ${mx(W - 1, 0, den)} + ${fr(den, den)}$.`,
        `Subtract the wholes: $${W - 1} - ${y.w} = ${W - 1 - y.w}$. Subtract the fractions: $${fr(den, den)} - ${fr(y.n, den)} = ${fr(den - y.n, den)}$.`,
        `Or use improper fractions: $${fr(W * den, den)} - ${fr(total(y), den)} = ${fr(R, den)}$.`,
        `$${W} - ${mtex(y)} = ${mixedOf(R, den)}$`,
      ],
    };
  }
  // missing addend: x + ? = W
  const { x, W } = retry(
    () => {
      const den = rng.pick([3, 4, 5, 6, 8, 10]);
      return { x: { w: rng.int(1, 4), n: rng.int(1, den - 1), d: den }, W: rng.int(3, 7) };
    },
    ({ x, W }) => W > x.w + 1 && lowestOK(W * x.d - total(x), x.d),
    300,
  );
  const den = x.d;
  const R = W * den - total(x);
  return {
    prompt: `Find the missing number: $${mtex(x)} + \\square = ${W}$. ${MIXED_FORM}`,
    parts: [fracPart(R, den, 'mixed', undefined)],
    hints: ['Addition and subtraction undo each other.', `The missing number is $${W} - ${mtex(x)}$.`],
    solution: [
      `The missing number is $${W} - ${mtex(x)}$.`,
      `Use improper fractions: $${fr(W * den, den)} - ${fr(total(x), den)} = ${fr(R, den)}$.`,
      `$${fr(R, den)} = ${mixedOf(R, den)}$`,
      `Check: $${mtex(x)} + ${mixedOf(R, den)} = ${W}$. The missing number is $${mixedOf(R, den)}$.`,
    ],
  };
}

const fractionAddSubtract = skill({
  id: 'm5-fraction-add-subtract',
  name: 'Adding and subtracting fractions',
  description: 'Add and subtract fractions with common denominators, including improper fractions and mixed numbers.',
  outcomes: ['N6'],
  lessonId: 'm5-5-2',
  gen(rng, d) {
    if (d === 1) return addSubD1(rng);
    if (d === 2) return addSubD2(rng);
    return addSubD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 5.2 Fraction problems
// ---------------------------------------------------------------------------

interface Prob {
  prompt: string;
  den: number;
  R: number;
  unit?: string;
  mode: 'lowest' | 'mixed';
  hint: string;
  steps: string[];
  answer: string;
}

function problemD1(rng: Rng): Prob {
  const A = pickName(rng);
  const B = pickName(rng, [A]);
  const kind = rng.pick(['pizza', 'garden', 'left', 'paint', 'trail'] as const);
  const den = rng.pick(kind === 'pizza' ? [6, 8, 10, 12] : [4, 5, 6, 8, 10]);
  const { a, b } = retry(
    () => ({ a: rng.int(1, den - 1), b: rng.int(1, den - 1) }),
    ({ a, b }) => (kind === 'left' ? lowestOK(den - a, den) : kind === 'trail' ? a > b && lowestOK(a - b, den) : a + b < den && lowestOK(a + b, den)),
    300,
  );
  if (kind === 'left') {
    const R = den - a;
    return {
      prompt: `A pan of lasagna is cut into $${den}$ equal pieces. ${A}'s family eats ${ff(a, den)} of the pan. What fraction of the pan is left?`,
      den, R, mode: 'lowest',
      hint: `The whole pan is $${fr(den, den)}$.`,
      steps: [`The whole pan is $1 = ${fr(den, den)}$.`, `$${fr(den, den)} - ${fr(a, den)} = ${fr(R, den)}$`],
      answer: `$${fr(R, den)}$ of the pan is left.`,
    };
  }
  if (kind === 'trail') {
    const R = a - b;
    return {
      prompt: `${A} hiked ${ff(a, den)} km on a trail near ${rng.pick(TOWNS)}. ${B} hiked ${ff(b, den)} km. How much farther did ${A} hike?`,
      den, R, unit: 'km', mode: 'lowest',
      hint: '"How much farther" means subtract.',
      steps: [`Subtract: $${fr(a, den)} - ${fr(b, den)}$.`, `$${a} - ${b} = ${R}$, so the difference is $${fr(R, den)}$ km.`],
      answer: `${A} hiked $${fr(R, den)}$ km farther.`,
    };
  }
  const R = a + b;
  const text = {
    pizza: `${A} ate ${ff(a, den)} of a pizza. ${B} ate ${ff(b, den)} of the same pizza. What fraction of the pizza did they eat altogether?`,
    garden: `In the school garden, ${ff(a, den)} of the beds have carrots and ${ff(b, den)} of the beds have beans. What fraction of the beds have carrots or beans?`,
    paint: `${A} painted ${ff(a, den)} of a mural on Monday and ${ff(b, den)} of it on Tuesday. What fraction of the mural is painted?`,
  }[kind];
  return {
    prompt: text,
    den, R, mode: 'lowest',
    hint: 'The two parts are put together, so add.',
    steps: [`Add: $${fr(a, den)} + ${fr(b, den)}$.`, `$${a} + ${b} = ${R}$, so the sum is $${fr(R, den)}$.`],
    answer: `The answer is $${fr(R, den)}$.`,
  };
}

const PROBLEM_UNITS = [
  { key: 'trail', unit: 'km', dens: [4, 5, 8, 10] },
  { key: 'ribbon', unit: 'm', dens: [4, 5, 8, 10] },
  { key: 'recipe', unit: 'cups', dens: [2, 3, 4] },
  { key: 'juice', unit: 'L', dens: [4, 5, 10] },
  { key: 'reading', unit: 'h', dens: [3, 4, 6] },
] as const;

function problemD2(rng: Rng): Prob {
  const A = pickName(rng);
  const B = pickName(rng, [A]);
  const ctx = rng.pick(PROBLEM_UNITS);
  const op = rng.pick(['+', '-'] as const);
  const { x, y, R } = mixedPair(rng, [...ctx.dens], op, rng.chance(0.4), 4);
  const town = rng.pick(TOWNS);
  const X = mtex(x);
  const Y = mtex(y);
  const texts: Record<string, [string, string]> = {
    trail: [
      `${A} hiked $${X}$ km on the first trail and $${Y}$ km on the second trail near ${town}. How far did ${A} hike in all?`,
      `A trail near ${town} is $${X}$ km long. ${A} has hiked $${Y}$ km of it. How far does ${A} still have to hike?`,
    ],
    ribbon: [
      `${A} has $${X}$ m of red ribbon and $${Y}$ m of blue ribbon. How much ribbon does ${A} have altogether?`,
      `${A} has a ribbon $${X}$ m long. ${A} cuts off $${Y}$ m for a gift. How much ribbon is left?`,
    ],
    recipe: [
      `A muffin recipe uses $${X}$ cups of flour and $${Y}$ cups of oats. How many cups is that altogether?`,
      `${A} has $${X}$ cups of flour. A recipe uses $${Y}$ cups. How much flour is left?`,
    ],
    juice: [
      `${A} makes $${X}$ L of orange juice and $${Y}$ L of apple juice for a class party. How many litres is that in all?`,
      `A jug holds $${X}$ L of lemonade. ${A} and ${B} drink $${Y}$ L. How much lemonade is left?`,
    ],
    reading: [
      `${A} read for $${X}$ h on Saturday and $${Y}$ h on Sunday. How many hours is that altogether?`,
      `${A} spent $${X}$ h at the pool. ${B} spent $${Y}$ h there. How much longer did ${A} spend?`,
    ],
  };
  return {
    prompt: `${texts[ctx.key][op === '+' ? 0 : 1]} ${MIXED_FORM}`,
    den: x.d, R, unit: ctx.unit, mode: 'mixed',
    hint: op === '+' ? 'The words tell you to put two amounts together, so add.' : 'The words tell you to find what is left or the difference, so subtract.',
    steps: [`${op === '+' ? 'Add' : 'Subtract'}: $${X} ${op} ${Y}$.`, ...mixedSteps(x, y, op), improperSteps(x, y, op)],
    answer: `The answer is $${mixedOf(R, x.d)}$ ${ctx.unit}.`,
  };
}

function problemD3(rng: Rng): Prob {
  const A = pickName(rng);
  const kind = rng.pick(['goal', 'left', 'compare'] as const);
  const ctx = rng.pick(PROBLEM_UNITS.filter((c) => c.key !== 'reading'));
  const { x, y, W } = retry(
    () => {
      const den = rng.pick([...ctx.dens]);
      const x = { w: rng.int(1, 3), n: rng.int(1, den - 1), d: den };
      const y = { w: rng.int(0, 3), n: rng.int(1, den - 1), d: den };
      return { x, y, W: rng.int(3, 9) };
    },
    ({ x, y, W }) => {
      const S = total(x) + total(y);
      if (kind === 'compare') return total(x) > total(y) && lowestOK(total(x) - total(y) + W * x.d, x.d);
      return W * x.d - S > 0 && lowestOK(W * x.d - S, x.d);
    },
    300,
  );
  const den = x.d;
  const X = mtex(x);
  const Y = mtex(y);
  const S = total(x) + total(y);
  const u = ctx.unit;
  if (kind === 'compare') {
    // first amount + W vs second amount
    const first = total(x) + W * den;
    const R = first - total(y);
    const prompts: Record<string, string> = {
      trail: `On Saturday, ${A} hiked $${W}$ km in the morning and $${X}$ km in the afternoon. On Sunday, ${A} hiked $${Y}$ km. How much farther did ${A} hike on Saturday than on Sunday?`,
      ribbon: `${A} used $${W}$ m of ribbon for one banner and $${X}$ m for another. A friend used $${Y}$ m. How much more ribbon did ${A} use?`,
      recipe: `${A} uses $${W}$ cups of flour in bread dough and $${X}$ cups to dust the counter. A cookie recipe uses $${Y}$ cups of flour. How much more flour does the bread use than the cookies?`,
      juice: `${A} poured $${W}$ L of water and $${X}$ L of juice into a punch bowl. ${A}'s friend drank $${Y}$ L of punch. How much punch is left in the bowl?`,
    };
    return {
      prompt: `${prompts[ctx.key]} ${MIXED_FORM}`,
      den, R, unit: u, mode: 'mixed',
      hint: 'Find the first total, then subtract.',
      steps: [
        `First total: $${W} + ${X} = ${mixedOf(first, den)}$.`,
        `Subtract: $${mixedOf(first, den)} - ${Y}$. With improper fractions: $${fr(first, den)} - ${fr(total(y), den)} = ${fr(R, den)}$.`,
        `$${fr(R, den)} = ${mixedOf(R, den)}$`,
      ],
      answer: `The answer is $${mixedOf(R, den)}$ ${u}.`,
    };
  }
  const R = W * den - S;
  const prompts: Record<string, string> = {
    trail: kind === 'goal'
      ? `${A} wants to hike $${W}$ km this weekend. ${A} hiked $${X}$ km on Saturday and $${Y}$ km on Sunday morning. How many more kilometres does ${A} need to hike to reach the goal?`
      : `A hiking loop near ${rng.pick(TOWNS)} is $${W}$ km long. ${A} walks $${X}$ km to a lookout, then $${Y}$ km to a lake. How far is it from the lake back to the start?`,
    ribbon: kind === 'goal'
      ? `${A} needs $${W}$ m of ribbon. ${A} has one piece $${X}$ m long and another $${Y}$ m long. How much more ribbon does ${A} need?`
      : `${A} buys $${W}$ m of ribbon. ${A} uses $${X}$ m for a banner and $${Y}$ m for bows. How much ribbon is left?`,
    recipe: kind === 'goal'
      ? `A bread recipe needs $${W}$ cups of flour. ${A} has a bag with $${X}$ cups and a jar with $${Y}$ cups. How many more cups does ${A} need?`
      : `${A} has $${W}$ cups of flour. ${A} uses $${X}$ cups for pancakes and $${Y}$ cups for muffins. How much flour is left?`,
    juice: kind === 'goal'
      ? `${A} wants $${W}$ L of punch for a party. ${A} has $${X}$ L of juice and $${Y}$ L of sparkling water. How many more litres does ${A} need?`
      : `A cooler holds $${W}$ L of water at a soccer game. The players drink $${X}$ L in the first half and $${Y}$ L in the second half. How much water is left?`,
  };
  return {
    prompt: `${prompts[ctx.key]} ${MIXED_FORM}`,
    den, R, unit: u, mode: 'mixed',
    hint: 'Step 1: add the two amounts. Step 2: subtract the sum from the whole amount.',
    steps: [
      `Add the two amounts: $${X} + ${Y} = ${fr(total(x), den)} + ${fr(total(y), den)} = ${fr(S, den)} = ${mixedOf(S, den)}$.`,
      `Subtract from $${W}$: $${fr(W * den, den)} - ${fr(S, den)} = ${fr(R, den)}$.`,
      `$${fr(R, den)} = ${mixedOf(R, den)}$`,
    ],
    answer: `The answer is $${mixedOf(R, den)}$ ${u}.`,
  };
}

const fractionProblems = skill({
  id: 'm5-fraction-problems',
  name: 'Fraction problems',
  description: 'Solve problems by adding and subtracting fractions with common denominators, including improper fractions and mixed numbers.',
  outcomes: ['N6'],
  lessonId: 'm5-5-2',
  gen(rng, d) {
    const p = d === 1 ? problemD1(rng) : d === 2 ? problemD2(rng) : problemD3(rng);
    return {
      prompt: d === 1 ? `${p.prompt} ${FRACTION_FORM}` : p.prompt,
      parts: [fracPart(p.R, p.den, p.mode, p.unit)],
      hints: [p.hint, d === 1 ? ADD_HINT : 'You can work with mixed numbers (wholes and parts) or change them to improper fractions first.'],
      solution: [...p.steps, p.answer],
    };
  },
});

export const FRACTIONS_SKILLS: SkillDef[] = [improperMixed, fractionNumberLine, fractionAddSubtract, fractionProblems];
