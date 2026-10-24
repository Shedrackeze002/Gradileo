/** Math 10-4 Unit 2 — Fractions (N1, N2). */
import { fixedChoice, mc, numPart, retry, skill } from '../../helpers.ts';
import { frac, gcd, lcm, type Frac } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { AnswerSpec, Choice, Difficulty, Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure; answerDisplay?: string };

const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
  'Yusuf', 'Maya', 'Kiona', 'Tyler', 'Ananya', 'Nathan', 'Lena', 'Diego', 'Harpreet', 'Noor',
];
const TOWNS = ['Riverton', 'Lakeside', 'Brookfield', 'Hillcrest', 'Clearwater', 'Ashford', 'Pinewood'];

const tx = (u: string) => `\\text{${u}}`;
const T = '\\times';
const D = '\\div';
/** A fraction in LaTeX exactly as written (not simplified). */
const fr = (n: number | string, d: number | string) => `\\dfrac{${n}}{${d}}`;
const frf = (f: Frac) => (f.d === 1 ? `${f.n}` : fr(f.n, f.d));
const ff = (n: number, d: number) => `$${fr(n, d)}$`;
/** A mixed number in LaTeX from its parts: 2\dfrac{3}{4}, 2 or \dfrac{3}{4}. */
const mx = (w: number, n: number, d: number) => (n === 0 ? `${w}` : w === 0 ? fr(n, d) : `${w}${fr(n, d)}`);
/** A positive fraction as a simplified mixed number in LaTeX. */
function mixedTex(f: Frac): string {
  const g = frac(f.n, f.d);
  const w = Math.floor(g.n / g.d);
  return mx(w, g.n - w * g.d, g.d);
}
/** Plain text for table cells and number-line labels: "2 3/4". */
function mixedPlain(w: number, n: number, d: number): string {
  if (n === 0) return `${w}`;
  return w === 0 ? `${n}/${d}` : `${w} ${n}/${d}`;
}
const unitTex = (u?: string) => (u ? `\\ ${tx(u)}` : '');
/** An exact answer: the student may type 7/4, 1 3/4 or 1.75, but not an expression to work out. */
function exactPart(f: Frac, suffix?: string, label?: string): Part {
  return numPart(f.n / f.d, { suffix, label, exact: false, display: 'fraction' });
}
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** A whole number with commas for 4 or more digits (plain text). */
const grp = (x: number) => (String(x).length > 3 ? String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : String(x));
/** A whole number inside maths: 1{,}200. */
const N = (x: number) => grp(x).replace(/,/g, '{,}');
const money = (x: number) => `\\$${grp(x)}`;

/** Fraction strips drawn on a blank canvas: each row is a bar cut into equal parts with the first `shaded` parts striped. */
function strips(rows: Array<{ parts: number; shaded: number }>, caption?: string): Figure {
  const W = 120;
  const h = 16;
  const gap = 10;
  const H = rows.length * (h + gap) + gap;
  const polylines: Array<{ points: Array<[number, number]>; color?: 'brand' | 'accent' | 'muted' }> = [];
  const segments: Array<{ from: [number, number]; to: [number, number]; color?: 'brand' | 'accent' | 'muted' }> = [];
  rows.forEach((r, i) => {
    const y0 = H - gap - h - i * (h + gap);
    const cw = W / r.parts;
    for (let j = 1; j <= 5 && r.shaded > 0; j++) {
      const y = y0 + (h * j) / 6;
      segments.push({ from: [0.8, y], to: [r.shaded * cw - 0.8, y], color: 'accent' });
    }
    for (let k = 1; k < r.parts; k++) segments.push({ from: [k * cw, y0], to: [k * cw, y0 + h], color: 'brand' });
    polylines.push({ points: [[0, y0], [W, y0], [W, y0 + h], [0, y0 + h], [0, y0]] });
  });
  return { type: 'plane', grid: { xMin: -2, xMax: W + 2, yMin: 0, yMax: H, step: W + 4 }, polylines, segments, hideTickLabels: true, caption };
}

/** Simplify n/d with a sentence, or nothing if it is already in lowest terms. */
function simplifyStep(n: number, d: number): string | null {
  const g = gcd(n, d);
  if (g === 1 || n === 0) return null;
  return `Simplify by dividing the top and bottom by $${g}$: $${fr(n, d)} = ${frf(frac(n, d))}$.`;
}

// ---------------------------------------------------------------------------
// 2.1 Equivalent fractions
// ---------------------------------------------------------------------------

const EQ_HINT = 'Equivalent fractions name the same amount. Multiply or divide the top and the bottom by the **same** number.';

function lowestPairs(dens: number[]): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  for (const d of dens) for (let n = 1; n < d; n++) if (gcd(n, d) === 1) out.push([n, d]);
  return out;
}

function missingNumber(rng: Rng, d: Difficulty): Out {
  const [a, b] = rng.pick(lowestPairs(d === 1 ? [2, 3, 4, 5] : [3, 4, 5, 6, 8, 10, 12]));
  const k = d === 1 ? rng.int(2, Math.max(2, Math.floor(16 / b))) : rng.int(3, b >= 8 ? 5 : 8);
  const missTop = rng.chance(0.55);
  const reverse = d === 2 && rng.chance(0.4); // big fraction on the left: 12/16 = 3/?
  const big = [a * k, b * k];
  let eq: string;
  let answer: number;
  const steps: string[] = [];
  if (!reverse) {
    eq = missTop ? `${fr(a, b)} = ${fr('?', b * k)}` : `${fr(a, b)} = ${fr(a * k, '?')}`;
    answer = missTop ? a * k : b * k;
    steps.push(
      missTop ? `The bottom changed from $${b}$ to $${b * k}$. That is multiplying by $${k}$, because $${b} ${T} ${k} = ${b * k}$.` : `The top changed from $${a}$ to $${a * k}$. That is multiplying by $${k}$, because $${a} ${T} ${k} = ${a * k}$.`,
      missTop ? `Multiply the top by the same number: $${a} ${T} ${k} = ${a * k}$.` : `Multiply the bottom by the same number: $${b} ${T} ${k} = ${b * k}$.`,
    );
  } else {
    eq = missTop ? `${fr(big[0], big[1])} = ${fr('?', b)}` : `${fr(big[0], big[1])} = ${fr(a, '?')}`;
    answer = missTop ? a : b;
    steps.push(
      missTop ? `The bottom changed from $${big[1]}$ to $${b}$. That is dividing by $${k}$, because $${big[1]} ${D} ${k} = ${b}$.` : `The top changed from $${big[0]}$ to $${a}$. That is dividing by $${k}$, because $${big[0]} ${D} ${k} = ${a}$.`,
      missTop ? `Divide the top by the same number: $${big[0]} ${D} ${k} = ${a}$.` : `Divide the bottom by the same number: $${big[1]} ${D} ${k} = ${b}$.`,
    );
  }
  const full = reverse ? `${fr(big[0], big[1])} = ${fr(a, b)}` : `${fr(a, b)} = ${fr(a * k, b * k)}`;
  return {
    prompt: `${d === 1 ? 'The two fraction strips have the same amount shaded. ' : ''}Find the missing number: $${eq}$`,
    figure: d === 1 ? strips([{ parts: b, shaded: a }, { parts: b * k, shaded: a * k }], `Both strips have the same amount shaded.`) : undefined,
    parts: [numPart(answer, { label: '? =', exact: false })],
    hints: [EQ_HINT, 'Look at the two numbers you know (both tops or both bottoms). What do you multiply or divide by to get from one to the other?'],
    solution: [...steps, `So $${full}$.`, `The missing number is $${answer}$.`],
  };
}

/** Choices for "lowest terms" questions built from real mistakes. */
function lowestTermsChoices(rng: Rng, a: number, b: number, k: number, unit = ''): AnswerSpec {
  const N = a * k;
  const Dn = b * k;
  const u = unit ? `\\ ${tx(unit)}` : '';
  const show = (n: number, d: number) => `$${fr(n, d)}${u}$`;
  const ds: string[] = [];
  const f = [2, 3, 5].find((p) => k % p === 0 && k !== p);
  if (f) ds.push(show(N / f, Dn / f)); // divided, but not all the way
  const sub = Dn - N + a;
  if (sub > a && gcd(a, sub) === 1 && sub !== b) ds.push(show(a, sub)); // subtracted the same number from top and bottom
  ds.push(show(a, Dn)); // divided the top only
  if (gcd(a + 1, b) === 1 && a + 1 < b) ds.push(show(a + 1, b));
  if (a > 1 && gcd(a - 1, b) === 1) ds.push(show(a - 1, b));
  return mc(rng, show(a, b), ds);
}

function lowestTermsSteps(a: number, b: number, k: number): string[] {
  return [
    `Find the biggest number that divides both $${a * k}$ and $${b * k}$. It is $${k}$.`,
    `$${a * k} ${D} ${k} = ${a}$ and $${b * k} ${D} ${k} = ${b}$.`,
    `Check: $${a}$ and $${b}$ have no common factor except $1$, so $${fr(a, b)}$ is in lowest terms.`,
  ];
}

function lowestTerms(rng: Rng): Out {
  const [a, b] = rng.pick(lowestPairs([3, 4, 5, 6, 8]));
  const k = rng.pick([2, 3, 4, 6]);
  return {
    prompt: `Which fraction is $${fr(a * k, b * k)}$ written in **lowest terms**?`,
    parts: [{ answer: lowestTermsChoices(rng, a, b, k) }],
    hints: ['Lowest terms means the top and bottom have no common factor except $1$.', `Divide the top and bottom by the biggest number that goes into both. Try $${k}$.`],
    solution: [...lowestTermsSteps(a, b, k), `$${fr(a * k, b * k)} = ${fr(a, b)}$ in lowest terms.`],
  };
}

const WRENCHES: Array<[number, number]> = [[1, 4], [5, 16], [3, 8], [7, 16], [1, 2], [9, 16], [5, 8], [11, 16], [3, 4], [13, 16], [7, 8], [15, 16]];

function equivContext(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['measure', 'wrench', 'tickets'] as const);
  if (kind === 'measure') {
    const c = rng.pick([
      { need: [3, 4], cup: 8, what: 'milk', u: 'cup', w: 0 },
      { need: [1, 2], cup: 8, what: 'oil', u: 'cup', w: 0 },
      { need: [3, 4], cup: 4, what: 'baking soda', u: 'teaspoon', w: 0 },
      { need: [2, 3], cup: 3, what: 'water', u: 'cup', w: 1 },
      { need: [1, 2], cup: 4, what: 'flour', u: 'cup', w: 1 },
      { need: [1, 4], cup: 8, what: 'sugar', u: 'cup', w: 0 },
      { need: [3, 4], cup: 8, what: 'rolled oats', u: 'cup', w: 1 },
    ]);
    const [a, b] = c.need;
    const total = frac(c.w * b + a, b);
    const ans = (total.n * c.cup) / total.d;
    const amount = c.w ? `$${mx(c.w, a, b)}$` : ff(a, b);
    return {
      prompt: `${name} is making muffins at a coffee shop. The recipe needs ${amount} ${c.u}${c.w ? 's' : ''} of ${c.what}. The only clean measure is a $${fr(1, c.cup)}$ ${c.u} measure. How many times does ${name} need to fill it?`,
      parts: [numPart(ans, { exact: false, suffix: 'times' })],
      hints: [`Write ${amount} as a fraction with denominator $${c.cup}$.`, `${EQ_HINT} The new top number is how many scoops you need.`],
      solution: [
        ...(c.w ? [`$${mx(c.w, a, b)} = ${fr(total.n, total.d)}$, because $${c.w} = ${fr(b, b)}$ and $${b} + ${a} = ${total.n}$.`] : []),
        ...(total.d === c.cup
          ? []
          : [`Change the denominator to $${c.cup}$: $${total.d} ${T} ${c.cup / total.d} = ${c.cup}$, so multiply the top by $${c.cup / total.d}$ too.`, `$${fr(total.n, total.d)} = ${fr(ans, c.cup)}$`]),
        `$${fr(ans, c.cup)}$ means $${ans}$ pieces of size $${fr(1, c.cup)}$.`,
        `${name} needs to fill the $${fr(1, c.cup)}$ ${c.u} measure $${ans}$ times.`,
      ],
    };
  }
  if (kind === 'wrench') {
    const idx = retry(() => rng.int(0, WRENCHES.length - 1), (i) => WRENCHES[i][1] < 16);
    const [a, b] = WRENCHES[idx];
    const k = 16 / b;
    const others = WRENCHES.filter((_, i) => i !== idx)
      .map((w) => ({ w, gap: Math.abs(w[0] / w[1] - a / b) }))
      .sort((x, y) => x.gap - y.gap)
      .slice(0, 2)
      .map(({ w }) => `$${fr(w[0], w[1])}$ in`);
    return {
      prompt: `${name} is an apprentice mechanic in ${rng.pick(TOWNS)}. A tape measure shows that a bolt head is $${fr(a * k, 16)}$ inch across. The wrenches are labelled in lowest terms. Which wrench fits the bolt?`,
      parts: [{ answer: mc(rng, `$${fr(a, b)}$ in`, [`$${fr(a, 16)}$ in`, ...others]) }],
      hints: ['Write the size in lowest terms.', `Divide the top and bottom of $${fr(a * k, 16)}$ by the biggest number that goes into both.`],
      solution: [...lowestTermsSteps(a, b, k).slice(1), `$${fr(a * k, 16)}$ in $= ${fr(a, b)}$ in, so the $${fr(a, b)}$ in wrench fits.`],
    };
  }
  const c = rng.pick([
    { whole: [12, 16, 20, 24, 30, 36], text: (p: number, t: number) => `${name} sold $${p}$ of the $${t}$ raffle tickets for a school fundraiser.`, ask: 'What fraction of the tickets did ' + name + ' sell' },
    { whole: [8, 10, 12, 16, 20], text: (p: number, t: number) => `A hotel cleaner has $${t}$ rooms to clean. By lunch, $${p}$ rooms are done.`, ask: 'What fraction of the rooms are done' },
    { whole: [12, 18, 24, 30], text: (p: number, t: number) => `A soccer team in ${rng.pick(TOWNS)} played $${t}$ games and won $${p}$ of them.`, ask: 'What fraction of the games did the team win' },
    { whole: [20, 24, 30, 36, 40], text: (p: number, t: number) => `A landscaping crew has $${t}$ trees to plant. They have planted $${p}$.`, ask: 'What fraction of the trees have they planted' },
  ]);
  const { a, b, k } = retry(
    () => {
      const t = rng.pick(c.whole);
      const p = rng.int(2, t - 2);
      const g = gcd(p, t);
      return { a: p / g, b: t / g, k: g };
    },
    (o) => o.k >= 2 && o.b > 2,
  );
  return {
    prompt: `${c.text(a * k, b * k)} ${c.ask}? Write it in **lowest terms**.`,
    parts: [{ answer: lowestTermsChoices(rng, a, b, k) }],
    hints: ['The fraction is part over whole.', 'Then divide the top and bottom by the biggest number that goes into both.'],
    solution: [`Part over whole: $${fr(a * k, b * k)}$.`, ...lowestTermsSteps(a, b, k), `The fraction is $${fr(a, b)}$.`],
  };
}

const equivalentFraction = skill({
  id: 'm104-equivalent-fraction',
  name: 'Equivalent fractions',
  description: 'Find a missing numerator or denominator in equivalent fractions and write a fraction in lowest terms.',
  outcomes: ['N1'],
  lessonId: 'm104-2-1',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return missingNumber(rng, d);
    if (d === 2) return rng.chance(0.55) ? missingNumber(rng, d) : lowestTerms(rng);
    return equivContext(rng);
  },
});

// ---------------------------------------------------------------------------
// 2.1 Comparing fractions
// ---------------------------------------------------------------------------

const CMP_HINT = 'To compare fractions, write them with the same denominator. Then the bigger numerator is the bigger fraction.';

function compareD1(rng: Rng): Out {
  const [A, B] = rng.sample(NAMES, 2);
  const unit = rng.chance(0.35);
  let x: [number, number];
  let y: [number, number];
  if (unit) {
    const [m, n] = rng.sample([2, 3, 4, 5, 6, 8, 10], 2);
    x = [1, m];
    y = [1, n];
  } else {
    const d = rng.pick([3, 4, 5, 6, 8, 10, 12]);
    const [p, r] = rng.sample(Array.from({ length: d - 1 }, (_, i) => i + 1), 2);
    x = [p, d];
    y = [r, d];
  }
  const bigX = x[0] / x[1] > y[0] / y[1];
  const ctx = rng.pick([
    { s: `${A} ate ${ff(...x)} of a pizza. ${B} ate ${ff(...y)} of a pizza the same size. Who ate more pizza?`, opts: [A, B, 'They ate the same amount'] },
    { s: `${A} has painted ${ff(...x)} of a fence. ${B} has painted ${ff(...y)} of a fence the same size. Who has painted more?`, opts: [A, B, 'They painted the same amount'] },
    { s: `${A} walked ${ff(...x)} km to work. ${B} walked ${ff(...y)} km. Who walked farther?`, opts: [A, B, 'They walked the same distance'] },
    { s: `Which fraction is greater: ${ff(...x)} or ${ff(...y)}?`, opts: [ff(...x), ff(...y), 'They are equal'] },
  ]);
  const why = unit
    ? [`Both fractions have $1$ on top. The bottom number tells how many equal pieces the whole is cut into.`, `The more pieces, the smaller each piece. So $${fr(1, Math.min(x[1], y[1]))}$ is greater than $${fr(1, Math.max(x[1], y[1]))}$.`]
    : [`The denominators are the same ($${x[1]}$), so the pieces are the same size.`, `Compare the numerators: $${Math.max(x[0], y[0])} > ${Math.min(x[0], y[0])}$, so $${fr(Math.max(x[0], y[0]), x[1])}$ is greater.`];
  return {
    prompt: ctx.s,
    parts: [{ answer: fixedChoice(ctx.opts, bigX ? 0 : 1) }],
    hints: unit ? ['Think of a pizza cut into more slices. Are the slices bigger or smaller?', 'With the same top number, the smaller denominator gives the bigger fraction.'] : ['When the denominators are the same, the pieces are the same size.', 'Compare the numerators. More pieces of the same size is more.'],
    solution: [...why, `The answer is ${ctx.opts[bigX ? 0 : 1]}.`],
  };
}

/** Write p/q with denominator D (a sentence part). */
const toDen = (p: number, q: number, Dd: number) => (q === Dd ? `$${fr(p, q)}$ already has denominator $${Dd}$` : `$${fr(p, q)} = ${fr(p * (Dd / q), Dd)}$`);

function compareD2(rng: Rng): Out {
  const [A, B] = rng.sample(NAMES, 2);
  const ctxKind = rng.pick(['wrench', 'bit', 'cups', 'km', 'plain'] as const);
  const Dd = ctxKind === 'wrench' || ctxKind === 'bit' ? 16 : rng.pick([4, 6, 8, 10, 12]);
  const equal = ctxKind !== 'wrench' && ctxKind !== 'bit' && rng.chance(0.15);
  const pick = () => {
    if (ctxKind === 'wrench' || ctxKind === 'bit') {
      const [u, v] = rng.sample(WRENCHES.slice(0, ctxKind === 'bit' ? 6 : 12), 2);
      return [u, v] as Array<[number, number]>;
    }
    if (equal) {
      const n = rng.int(1, Dd - 1);
      const g = frac(n, Dd);
      return [[g.n, g.d], [n, Dd]] as Array<[number, number]>;
    }
    const [n1, n2] = rng.sample(Array.from({ length: Dd - 1 }, (_, i) => i + 1), 2);
    const g1 = frac(n1, Dd);
    const g2 = frac(n2, Dd);
    return [[g1.n, g1.d], [g2.n, g2.d]] as Array<[number, number]>;
  };
  const [x, y] = retry(pick, ([u, v]) => (equal ? u[1] !== v[1] : u[1] !== v[1] && u[0] / u[1] !== v[0] / v[1]));
  const vx = x[0] / x[1];
  const vy = y[0] / y[1];
  const idx = Math.abs(vx - vy) < 1e-9 ? 2 : vx > vy ? 0 : 1;
  const L = lcm(x[1], y[1]);
  const opts: Record<typeof ctxKind, { s: string; o: string[] }> = {
    wrench: { s: `${A} needs a wrench for a bolt. One wrench is ${ff(...x)} in and another is ${ff(...y)} in. Which wrench is bigger?`, o: [`${ff(...x)} in`, `${ff(...y)} in`, 'They are the same size'] },
    bit: { s: `${A} is building shelves and has two drill bits: ${ff(...x)} in and ${ff(...y)} in. Which drill bit is wider?`, o: [`${ff(...x)} in`, `${ff(...y)} in`, 'They are the same width'] },
    cups: { s: `A soup recipe at ${A}’s restaurant uses ${ff(...x)} cup of carrots and ${ff(...y)} cup of celery. Which amount is more?`, o: [`${ff(...x)} cup of carrots`, `${ff(...y)} cup of celery`, 'They are the same amount'] },
    km: { s: `${A} jogged ${ff(...x)} km. ${B} jogged ${ff(...y)} km. Who jogged farther?`, o: [A, B, 'They jogged the same distance'] },
    plain: { s: `Which is greater: ${ff(...x)} or ${ff(...y)}?`, o: [ff(...x), ff(...y), 'They are equal'] },
  };
  const c = opts[ctxKind];
  const nx = x[0] * (L / x[1]);
  const ny = y[0] * (L / y[1]);
  return {
    prompt: c.s,
    parts: [{ answer: fixedChoice(c.o, idx) }],
    hints: [CMP_HINT, `Use $${L}$ as the common denominator.`],
    solution: [
      `Use the common denominator $${L}$.`,
      `${toDen(x[0], x[1], L)} and ${toDen(y[0], y[1], L)}.`,
      idx === 2 ? `The numerators are the same ($${nx}$), so the fractions are equal.` : `Compare the numerators: $${Math.max(nx, ny)} > ${Math.min(nx, ny)}$.`,
      `The answer is ${c.o[idx]}.`,
    ],
  };
}

function compareD3(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const kind = rng.pick(['wrench', 'board', 'board'] as const);
  type V = { w: number; n: number; d: number; v: number };
  let vals: V[];
  let prompt: string;
  let unit: string;
  if (kind === 'wrench') {
    const ws = retry(
      () => rng.sample(WRENCHES, 3),
      (s) => new Set(s.map((w) => w[1])).size >= 2,
    );
    vals = ws.map(([n, d]) => ({ w: 0, n, d, v: n / d }));
    unit = 'in';
    prompt = `${name} works at a hardware store and is putting wrenches on a rack. Put the wrench sizes in order from **smallest to largest**.`;
  } else {
    const w = rng.int(2, 9);
    const opts: Array<[number, number]> = [[1, 2], [1, 4], [3, 4], [1, 8], [3, 8], [5, 8], [7, 8]];
    vals = retry(
      () => {
        const picks = rng.sample(opts, 3).map(([n, d]) => ({ w, n, d, v: w + n / d }));
        if (rng.chance(0.5)) {
          // one board has a smaller whole number but a big fraction part
          const big = rng.pick([[7, 8], [3, 4]] as Array<[number, number]>);
          picks[2] = { w: w - 1, n: big[0], d: big[1], v: w - 1 + big[0] / big[1] };
        }
        return picks;
      },
      (s) => new Set(s.map((p) => p.v)).size === 3 && new Set(s.map((p) => p.d)).size >= 2,
    );
    unit = 'ft';
    prompt = `${name} works for a fencing company in ${rng.pick(TOWNS)}. Three boards were cut to these lengths. Put them in order from **shortest to longest**.`;
  }
  const shown = retry(
    () => rng.shuffle(vals),
    (s) => s.some((p, i) => i > 0 && p.v < s[i - 1].v),
  );
  const sorted = [...vals].sort((a, b) => a.v - b.v);
  const items: Choice[] = shown.map((p, i) => ({ id: 'abc'[i], md: `$${mx(p.w, p.n, p.d)}\\ ${tx(unit)}$` }));
  const idOf = (p: V) => items[shown.indexOf(p)].id;
  const L = vals.reduce((m, p) => lcm(m, p.d), 1);
  const steps: string[] = [];
  const wholes = new Set(vals.map((p) => p.w));
  if (wholes.size > 1) steps.push(`Compare the whole numbers first. A smaller whole number means a shorter board, no matter how big the fraction is.`);
  const conv = vals.filter((p) => p.d !== L).map((p) => `$${mx(p.w, p.n, p.d)} = ${mx(p.w, p.n * (L / p.d), L)}$`);
  steps.push(`Write ${kind === 'board' ? 'the fraction parts' : 'the fractions'} with the common denominator $${L}$: ${conv.join(', ')}.`);
  steps.push(`Now compare: $${sorted.map((p) => mx(p.w, p.n * (L / p.d), L)).join(' < ')}$.`);
  steps.push(`In order: ${sorted.map((p) => `$${mx(p.w, p.n, p.d)}\\ ${tx(unit)}$`).join(', ')}.`);
  const answer: AnswerSpec = { kind: 'order', items, correctOrder: sorted.map(idOf) };
  return {
    prompt,
    parts: [{ answer }],
    hints: [kind === 'board' ? 'Look at the whole numbers first. If they are the same, compare the fractions.' : 'Change all the fractions to sixteenths.', CMP_HINT],
    solution: steps,
  };
}

const compareFraction = skill({
  id: 'm104-compare-fraction',
  name: 'Comparing fractions',
  description: 'Compare two fractions and order fractions and mixed numbers, including measurements in inches and feet.',
  outcomes: ['N1'],
  lessonId: 'm104-2-1',
  format: 'mc',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return compareD1(rng);
    if (d === 2) return compareD2(rng);
    return compareD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 2.2 Fraction of a quantity
// ---------------------------------------------------------------------------

interface OfCtx {
  dens1: number[];
  dens2: number[];
  m1: [number, number];
  m2: [number, number];
  u?: string;
  label?: string;
  suffix?: string;
  text: (Q: number, f: string, name: string, town: string) => string;
  answer: (x: number, name: string) => string;
  allowed?: (Q: number) => boolean;
}

const qty = (x: number, u?: string) => (u ? `$${N(x)}\\ ${tx(u)}$` : `$${N(x)}$`);

const OF_CTX: OfCtx[] = [
  {
    dens1: [2, 4, 5], dens2: [3, 4, 5, 8], m1: [2, 5], m2: [3, 6], u: 'L', suffix: 'L',
    text: (Q, f, name) => `${name} has a ${qty(Q, 'L')} pail of paint for a painting job. ${name} uses ${f} of the paint on the first room. How many litres is that?`,
    answer: (x, name) => `${name} uses ${qty(x, 'L')} of paint.`,
  },
  {
    dens1: [2, 3, 4], dens2: [3, 4, 6], m1: [2, 3], m2: [2, 3], u: 'h', suffix: 'h',
    text: (Q, f, name, town) => `${name} works a ${qty(Q)}-hour shift at a grocery store in ${town}. ${name} spends ${f} of the shift at the cash register. How many hours is that?`,
    answer: (x) => `That is $${x}$ hours.`,
    allowed: (Q) => [6, 8, 9, 10, 12].includes(Q),
  },
  {
    dens1: [2, 3, 4, 5], dens2: [3, 4, 5, 6, 8], m1: [5, 9], m2: [20, 60], suffix: 'students',
    text: (Q, f, _n, town) => `There are ${qty(Q)} students ${Q <= 40 ? 'in a class' : 'at a school'} in ${town}. ${cap(f)} of them take the bus to school. How many students take the bus?`,
    answer: (x) => `${qty(x)} students take the bus.`,
  },
  {
    dens1: [2, 4, 5, 10], dens2: [3, 4, 5, 8, 10], m1: [10, 25], m2: [25, 90], label: '\\$',
    text: (Q, f, name) => `${name} earns ${money(Q)} this month at a part-time job at a car wash. ${name} saves ${f} of it. How much does ${name} save?`,
    answer: (x, name) => `${name} saves ${money(x)}.`,
  },
  {
    dens1: [2, 4, 5], dens2: [3, 4, 5, 8], m1: [2, 5], m2: [4, 8], u: 'kg', suffix: 'kg',
    text: (Q, f) => `A bakery has a ${qty(Q, 'kg')} bag of flour. The bakers use ${f} of the bag today. How many kilograms of flour do they use?`,
    answer: (x) => `They use ${qty(x, 'kg')} of flour.`,
  },
  {
    dens1: [2, 3, 4, 5], dens2: [3, 4, 5, 6, 8], m1: [10, 20], m2: [40, 90], u: 'km', suffix: 'km',
    text: (Q, f, name, town) => `${name} is driving ${qty(Q, 'km')} from ${town} to a hockey tournament. So far, ${name} has driven ${f} of the way. How far has ${name} driven?`,
    answer: (x, name) => `${name} has driven ${qty(x, 'km')}.`,
  },
  {
    dens1: [2, 3, 4], dens2: [3, 4, 5, 6], m1: [15, 30], m2: [15, 30], u: 'min', suffix: 'min',
    text: (Q, f) => `A hockey practice lasts ${qty(Q, 'min')}. The coach spends ${f} of the practice on skating drills. How many minutes is that?`,
    answer: (x) => `That is $${x}$ minutes.`,
    allowed: (Q) => [45, 60, 75, 90, 120].includes(Q),
  },
];

function fractionOfBasic(rng: Rng, d: Difficulty): Out {
  const name = rng.pick(NAMES);
  const town = rng.pick(TOWNS);
  const c = rng.pick(OF_CTX);
  const { n, dd, Q } = retry(
    () => {
      const dd = rng.pick(d === 1 ? c.dens1 : c.dens2);
      const n = d === 1 && rng.chance(0.3) ? 1 : rng.int(1, dd - 1);
      const [lo, hi] = d === 1 ? c.m1 : c.m2;
      return { n, dd, Q: dd * rng.int(lo, hi) };
    },
    (o) => gcd(o.n, o.dd) === 1 && (!c.allowed || c.allowed(o.Q)) && (d === 1 || o.n > 1),
    200,
  );
  const one = Q / dd;
  const x = one * n;
  const f = ff(n, dd);
  return {
    prompt: `${c.text(Q, f, name, town)}${d === 1 ? ` The strip shows the whole split into $${dd}$ equal parts.` : ''}`,
    figure: d === 1 ? strips([{ parts: dd, shaded: n }], `The whole is split into ${dd} equal parts. ${n} ${n === 1 ? 'part is' : 'parts are'} shaded.`) : undefined,
    parts: [numPart(x, { exact: false, suffix: c.suffix, label: c.label })],
    hints: [`The bottom number, $${dd}$, tells you to split the whole into $${dd}$ equal parts.`, `Find one part: divide by $${dd}$. Then multiply by the top number, $${n}$.`],
    solution: [
      `Split the whole into $${dd}$ equal parts: $${N(Q)} ${D} ${dd} = ${N(one)}$. So $${fr(1, dd)}$ of ${qty(Q, c.u)} is ${qty(one, c.u)}.`,
      n === 1 ? `You need $1$ part, so the answer is ${qty(one, c.u)}.` : `Take $${n}$ parts: $${n} ${T} ${N(one)} = ${N(x)}$.`,
      c.answer(x, name),
    ],
  };
}

function fractionLeft(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const town = rng.pick(TOWNS);
  if (rng.chance(0.5)) {
    // Both fractions are of the full amount.
    const c = rng.pick([
      { what: (Q: number) => `A farm truck near ${town} has ${qty(Q, 'L')} of diesel in its tank.`, day1: 'On Monday, the truck uses', day2: 'On Tuesday, it uses', of: 'of the full tank', u: 'L', ask: 'How many litres of diesel are left?', ans: (x: number) => `There are $${x}\\ ${tx('L')}$ of diesel left.` },
      { what: (Q: number) => `A garden centre in ${town} has ${qty(Q, 'kg')} of potting soil.`, day1: 'On Saturday, it sells', day2: 'On Sunday, it sells', of: 'of the soil it started with', u: 'kg', ask: 'How many kilograms of soil are left?', ans: (x: number) => `There are $${x}\\ ${tx('kg')}$ of soil left.` },
      { what: (Q: number) => `A roll of fencing wire is ${qty(Q, 'm')} long.`, day1: `${name} uses`, day2: 'A co-worker uses', of: 'of the full roll', u: 'm', ask: 'How many metres of wire are left on the roll?', ans: (x: number) => `There are $${x}\\ ${tx('m')}$ of wire left.` },
    ]);
    const { f1, f2, Q } = retry(
      () => {
        const f1 = rng.pick([[1, 2], [1, 3], [1, 4], [2, 5], [1, 5], [3, 8], [1, 6]] as Array<[number, number]>);
        const f2 = rng.pick([[1, 3], [1, 4], [1, 5], [1, 6], [1, 8], [3, 10], [1, 10]] as Array<[number, number]>);
        const L = lcm(f1[1], f2[1]);
        return { f1, f2, Q: L * rng.int(Math.ceil(40 / L), Math.floor(200 / L)) };
      },
      (o) => o.f1[1] !== o.f2[1] && o.f1[0] / o.f1[1] + o.f2[0] / o.f2[1] < 0.9,
    );
    const a = (Q / f1[1]) * f1[0];
    const b = (Q / f2[1]) * f2[0];
    const left = Q - a - b;
    return {
      prompt: `${c.what(Q)} ${c.day1} ${ff(...f1)} ${c.of}. ${c.day2} ${ff(...f2)} ${c.of}. ${c.ask}`,
      parts: [numPart(left, { exact: false, suffix: c.u })],
      hints: ['Find each amount used. Both fractions are fractions of the **full** amount.', 'Then subtract both amounts from the full amount.'],
      solution: [
        `First amount: $${fr(f1[0], f1[1])}$ of $${N(Q)}$ is $${Q} ${D} ${f1[1]} = ${Q / f1[1]}$${f1[0] > 1 ? `, then $${f1[0]} ${T} ${Q / f1[1]} = ${a}$` : ''}. That is ${qty(a, c.u)}.`,
        `Second amount: $${fr(f2[0], f2[1])}$ of $${N(Q)}$ is $${Q} ${D} ${f2[1]} = ${Q / f2[1]}$${f2[0] > 1 ? `, then $${f2[0]} ${T} ${Q / f2[1]} = ${b}$` : ''}. That is ${qty(b, c.u)}.`,
        `What is left: $${Q} - ${a} - ${b} = ${left}$.`,
        c.ans(left),
      ],
    };
  }
  // The second fraction is of what is left.
  const c = rng.pick([
    { start: (Q: number) => `${name} gets paid ${money(Q)} from a job at a hotel in ${town}.`, s1: `${name} spends`, s1b: 'of it on rent', s2: 'Then', s2b: 'of what is left goes to groceries', label: '\\$', u: undefined, ask: `How much money does ${name} have left?`, ans: (x: number) => `${name} has ${money(x)} left.` },
    { start: (Q: number) => `A landscaping crew has ${qty(Q, 'kg')} of gravel.`, s1: 'They use', s1b: 'of it on a path', s2: 'Then they use', s2b: 'of what is left on a patio', label: undefined, u: 'kg', ask: 'How many kilograms of gravel are left?', ans: (x: number) => `There are $${x}\\ ${tx('kg')}$ of gravel left.` },
    { start: (Q: number) => `A food bank in ${town} has ${qty(Q)} cans of soup.`, s1: 'It gives out', s1b: 'of the cans on Monday', s2: 'On Tuesday, it gives out', s2b: 'of the cans that are left', label: undefined, u: 'cans', ask: 'How many cans are left?', ans: (x: number) => `There are $${x}$ cans left.` },
  ]);
  const f1 = rng.pick([[1, 4], [1, 3], [1, 2], [2, 5], [1, 5]] as Array<[number, number]>);
  const f2 = rng.pick([[1, 3], [1, 4], [1, 2], [2, 3], [3, 4]] as Array<[number, number]>);
  const unitQ = f1[1] * f2[1];
  const Q = unitQ * rng.int(Math.ceil(60 / unitQ), Math.floor(c.label ? 1200 / unitQ : 600 / unitQ));
  const a = (Q / f1[1]) * f1[0];
  const rest = Q - a;
  const b = (rest / f2[1]) * f2[0];
  const left = rest - b;
  const show = (x: number) => (c.label ? money(x) : qty(x, c.u === 'cans' ? undefined : c.u));
  return {
    prompt: `${c.start(Q)} ${c.s1} ${ff(...f1)} ${c.s1b}. ${c.s2} ${ff(...f2)} ${c.s2b}. ${c.ask}`,
    parts: [numPart(left, { exact: false, label: c.label, suffix: c.u })],
    hints: ['Work in two steps. First find what is left after the first fraction.', 'The second fraction is a fraction of **what is left**, not of the starting amount.'],
    solution: [
      `First: $${fr(f1[0], f1[1])}$ of $${N(Q)}$ is $${N(Q)} ${D} ${f1[1]}${f1[0] > 1 ? ` ${T} ${f1[0]}` : ''} = ${N(a)}$. Left: $${N(Q)} - ${N(a)} = ${N(rest)}$.`,
      `Second: $${fr(f2[0], f2[1])}$ of $${N(rest)}$ is $${N(rest)} ${D} ${f2[1]}${f2[0] > 1 ? ` ${T} ${f2[0]}` : ''} = ${N(b)}$. Left: $${N(rest)} - ${N(b)} = ${N(left)}$.`,
      `Check: ${show(a)} + ${show(b)} + ${show(left)} makes ${show(Q)} in all.`,
      c.ans(left),
    ],
  };
}

const fractionOf = skill({
  id: 'm104-fraction-of',
  name: 'Fraction of a quantity',
  description: 'Find a fraction of an amount, such as 3/4 of 20 L, and find what is left after fractions are used.',
  outcomes: ['N2'],
  lessonId: 'm104-2-2',
  calculator: true,
  gen(rng, d) {
    if (d === 3) return fractionLeft(rng);
    return fractionOfBasic(rng, d);
  },
});

// ---------------------------------------------------------------------------
// 2.3 Adding and subtracting fractions and mixed numbers
// ---------------------------------------------------------------------------

/** Steps for a/b ± c/e (proper fractions); returns the exact result. */
function fracSteps(a: number, b: number, c: number, e: number, op: '+' | '-'): { steps: string[]; result: Frac } {
  const L = lcm(b, e);
  const A = a * (L / b);
  const C = c * (L / e);
  const R = op === '+' ? A + C : A - C;
  const steps: string[] = [];
  if (b === e) steps.push(`The denominators are the same, so ${op === '+' ? 'add' : 'subtract'} the numerators and keep the denominator.`);
  else {
    steps.push(`The denominators are different. Use the common denominator $${L}$: ${toDen(a, b, L)} and ${toDen(c, e, L)}.`);
  }
  steps.push(`$${fr(A, L)} ${op} ${fr(C, L)} = ${fr(R, L)}$`);
  const s = simplifyStep(R, L);
  if (s) steps.push(s);
  const result = frac(R, L);
  if (result.n > result.d && result.d > 1) steps.push(`As a mixed number: $${frf(result)} = ${mixedTex(result)}$.`);
  return { steps, result };
}

interface Mixed {
  w: number;
  n: number;
  d: number;
}
const mtex = (m: Mixed) => mx(m.w, m.n, m.d);

/** Steps for mixed numbers using whole parts and fraction parts (with regrouping). */
function mixedSteps(a: Mixed, b: Mixed, op: '+' | '-'): { steps: string[]; result: Frac } {
  const L = lcm(a.d, b.d);
  const A = a.n * (L / a.d);
  const B = b.n * (L / b.d);
  const steps: string[] = [];
  if (a.d !== b.d) {
    const conv = [a, b].filter((m) => m.d !== L).map((m) => `$${mtex(m)} = ${mx(m.w, m.n * (L / m.d), L)}$`);
    steps.push(`Use the common denominator $${L}$: ${conv.join(' and ')}.`);
  }
  let W: number;
  let F: number;
  if (op === '+') {
    W = a.w + b.w;
    F = A + B;
    steps.push(`Add the whole numbers: $${a.w} + ${b.w} = ${W}$. Add the fractions: $${fr(A, L)} + ${fr(B, L)} = ${fr(F, L)}$.`);
    if (F >= L) {
      steps.push(
        F === L
          ? `$${fr(F, L)} = 1$ whole. So the total is $${W} + 1 = ${W + 1}$.`
          : `$${fr(F, L)}$ is more than one whole: $${fr(F, L)} = ${mx(1, F - L, L)}$. So the total is $${W} + ${mx(1, F - L, L)} = ${mx(W + 1, F - L, L)}$.`,
      );
      W += 1;
      F -= L;
    }
  } else {
    let aw = a.w;
    let aA = A;
    if (A < B) {
      aw = a.w - 1;
      aA = A + L;
      steps.push(`You cannot take $${fr(B, L)}$ away from $${fr(A, L)}$. Regroup $1$ whole as $${fr(L, L)}$: $${mx(a.w, A, L)} = ${mx(aw, aA, L)}$.`);
    }
    W = aw - b.w;
    F = aA - B;
    steps.push(`Subtract the whole numbers: $${aw} - ${b.w} = ${W}$. Subtract the fractions: $${fr(aA, L)} - ${fr(B, L)} = ${fr(F, L)}$.`);
  }
  const g = gcd(F, L);
  if (F > 0 && g > 1) steps.push(`Simplify: $${mx(W, F, L)} = ${mx(W, F / g, L / g)}$.`);
  return { steps, result: frac(W * L + F, L) };
}

const PAIRS_LIKE = [3, 4, 5, 6, 8, 10, 12];
const PAIRS_UNLIKE: Array<[number, number]> = [[2, 4], [2, 8], [4, 8], [3, 6], [2, 6], [3, 12], [4, 12], [6, 12], [5, 10], [2, 10], [2, 3], [3, 4], [2, 5], [4, 16], [8, 16]];

function properLowest(rng: Rng, d: number): number {
  return retry(() => rng.int(1, d - 1), (n) => gcd(n, d) === 1);
}

function addSubD1(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const d = rng.pick(PAIRS_LIKE);
  const op = rng.pick(['+', '-'] as const);
  const ctxOn = rng.chance(0.6);
  const [a, c] = retry(
    () => [rng.int(1, d - 1), rng.int(1, d - 1)],
    ([x, y]) => (op === '+' ? x + y <= (ctxOn ? d - 1 : d + 3) && x + y !== d : x > y),
  );
  const { steps, result } = fracSteps(a, d, c, d, op);
  const ctxs =
    op === '+'
      ? [
          `${name} used ${ff(a, d)} of a can of paint on a door and ${ff(c, d)} of the can on the trim. What fraction of the can did ${name} use?`,
          `A pizza is cut into $${d}$ equal slices. ${name} ate ${ff(a, d)} of the pizza and a friend ate ${ff(c, d)}. What fraction of the pizza did they eat?`,
          `${name} mopped ${ff(a, d)} of a hotel lobby before lunch and ${ff(c, d)} after lunch. What fraction of the lobby is mopped?`,
        ]
      : [
          `A jug was ${ff(a, d)} full of juice. ${name} poured out ${ff(c, d)} of the jug. What fraction of the jug is full now?`,
          `${name} had ${ff(a, d)} of a bag of dog food. The dog ate ${ff(c, d)} of the bag this week. What fraction of the bag is left?`,
          `${name} had ${ff(a, d)} of a bag of potting soil. ${name} used ${ff(c, d)} of the bag in planters. What fraction of the bag is left?`,
        ];
  return {
    prompt: ctxOn ? rng.pick(ctxs) : `Find $${fr(a, d)} ${op} ${fr(c, d)}$.`,
    parts: [exactPart(result)],
    hints: ['The denominators are the same, so the pieces are the same size.', `${op === '+' ? 'Add' : 'Subtract'} the numerators. Keep the denominator $${d}$.`],
    solution: [...steps, `The answer is $${frf(result)}$${result.n > result.d && result.d > 1 ? `, or $${mixedTex(result)}$` : ''}.`],
    answerDisplay: `$${mixedTex(result)}$`,
  };
}

function addSubD2(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const [p, q2] = rng.pick(PAIRS_UNLIKE);
  const [b, e] = rng.chance(0.5) ? [p, q2] : [q2, p];
  const op = rng.pick(['+', '-'] as const);
  const [a, c] = retry(
    () => [properLowest(rng, b), properLowest(rng, e)],
    ([x, y]) => (op === '+' ? true : x / b > y / e),
  );
  const { steps, result } = fracSteps(a, b, c, e, op);
  const inch = [b, e].every((x) => [2, 4, 8, 16].includes(x));
  const gauge = [b, e].every((x) => [2, 4, 8].includes(x));
  const cands: Array<{ s: string; u?: string; ok: boolean }> =
    op === '+'
      ? [
          { s: `${name} walked ${ff(a, b)} km to the bus stop and then ${ff(c, e)} km from the bus to work. How far did ${name} walk?`, u: 'km', ok: true },
          { s: `A recipe uses ${ff(a, b)} cup of white sugar and ${ff(c, e)} cup of brown sugar. How many cups of sugar is that in all?`, u: 'cups', ok: [b, e].every((x) => [2, 3, 4, 8].includes(x)) },
          { s: `${name} glues a ${ff(a, b)} in sheet of plywood onto a ${ff(c, e)} in board. How thick are they together?`, u: 'in', ok: inch },
          { s: `Find $${fr(a, b)} + ${fr(c, e)}$.`, ok: true },
        ]
      : [
          { s: `${name}’s truck had ${ff(a, b)} of a tank of gas. The drive to work used ${ff(c, e)} of a tank. What fraction of a tank is left?`, ok: gauge },
          { s: `A board is ${ff(a, b)} in thick. ${name} sands off ${ff(c, e)} in. How thick is the board now?`, u: 'in', ok: inch },
          { s: `${name} had ${ff(a, b)} km left to walk to work. ${name} has now walked ${ff(c, e)} km of it. How far is left?`, u: 'km', ok: true },
          { s: `Find $${fr(a, b)} - ${fr(c, e)}$.`, ok: true },
        ];
  const ctx = rng.pick(cands.filter((x) => x.ok));
  return {
    prompt: ctx.s,
    parts: [exactPart(result, ctx.u)],
    hints: ['You can only add or subtract fractions when the denominators are the same.', `Write both fractions with denominator $${lcm(b, e)}$ first.`],
    solution: [...steps, `The answer is $${frf(result)}${unitTex(ctx.u)}$${result.n > result.d && result.d > 1 ? `, or $${mixedTex(result)}${unitTex(ctx.u)}$` : ''}.`],
    answerDisplay: `$${mixedTex(result)}${unitTex(ctx.u)}$`,
  };
}

function addSubD3(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const op = rng.pick(['+', '-'] as const);
  const c = rng.pick([
    { dens: [[2, 4], [4, 4], [2, 2], [3, 3], [3, 6]] as Array<[number, number]>, u: 'h', w: [2, 8],
      add: (x: string, y: string) => `${name} worked ${x} hours at a hotel on Saturday and ${y} hours on Sunday. How many hours did ${name} work in all?`,
      sub: (x: string, y: string) => `${name} has a ${x}-hour shift at a restaurant. ${name} has worked ${y} hours so far. How many hours are left in the shift?` },
    { dens: [[2, 4], [4, 8], [2, 3], [3, 4], [2, 8]] as Array<[number, number]>, u: 'km', w: [1, 9],
      add: (x: string, y: string) => `${name} ran ${x} km on Monday and ${y} km on Wednesday. How far did ${name} run in all?`,
      sub: (x: string, y: string) => `A walking trail in ${rng.pick(TOWNS)} is ${x} km long. ${name} has walked ${y} km. How far is it to the end?` },
    { dens: [[2, 4], [4, 8], [2, 8], [3, 6]] as Array<[number, number]>, u: 'kg', w: [1, 6],
      add: (x: string, y: string) => `A kitchen used ${x} kg of ground beef for burgers and ${y} kg for chili. How much ground beef was used?`,
      sub: (x: string, y: string) => `A deli has ${x} kg of ham. It sells ${y} kg today. How much ham is left?` },
  ]);
  const { A, B } = retry(
    () => {
      const [d1, d2] = rng.pick(c.dens);
      const [p, r] = rng.chance(0.5) ? [d1, d2] : [d2, d1];
      const A: Mixed = { w: rng.int(c.w[0], c.w[1]), n: properLowest(rng, p), d: p };
      const B: Mixed = { w: rng.int(c.w[0], c.w[1]), n: properLowest(rng, r), d: r };
      return { A, B };
    },
    ({ A, B }) => {
      const va = A.w + A.n / A.d;
      const vb = B.w + B.n / B.d;
      if (op === '+') return true;
      return va - vb >= 1 && Math.abs((va - vb) % 1) > 1e-9;
    },
  );
  const { steps, result } = mixedSteps(A, B, op);
  const xs = `$${mtex(A)}$`;
  const ys = `$${mtex(B)}$`;
  return {
    prompt: op === '+' ? c.add(xs, ys) : c.sub(xs, ys),
    parts: [exactPart(result, c.u)],
    hints: ['Work with the whole numbers and the fractions separately.', `Give the fractions a common denominator first.${op === '-' ? ' If the first fraction is too small to subtract from, regroup $1$ whole.' : ''}`],
    solution: [...steps, `The answer is $${mixedTex(result)}\\ ${tx(c.u)}$.`],
    answerDisplay: `$${mixedTex(result)}\\ ${tx(c.u)}$`,
  };
}

const addSubFraction = skill({
  id: 'm104-add-sub-fraction',
  name: 'Adding and subtracting fractions',
  description: 'Add and subtract fractions with like and unlike denominators, and mixed numbers.',
  outcomes: ['N2'],
  lessonId: 'm104-2-3',
  calculator: false,
  gen(rng, d) {
    if (d === 1) return addSubD1(rng);
    if (d === 2) return addSubD2(rng);
    return addSubD3(rng);
  },
});

// ---------------------------------------------------------------------------
// 2.3 Mixed numbers in measurement
// ---------------------------------------------------------------------------

function measureD1D2(rng: Rng, d: Difficulty): Out {
  const name = rng.pick(NAMES);
  const op = rng.pick(['+', '-'] as const);
  const c = rng.pick([
    { u: 'in', dens: d === 1 ? [8, 16, 4] : [2, 4, 8, 16], w: [6, 48],
      add: (x: string, y: string) => `${name} is putting trim around a window. One piece of trim is ${x} in long and the other is ${y} in long. What is the total length?`,
      sub: (x: string, y: string) => `${name} has a pipe that is ${x} in long. ${name} cuts off a piece ${y} in long. How long is the rest of the pipe? (Ignore the width of the saw cut.)` },
    { u: 'ft', dens: d === 1 ? [4, 2] : [2, 4], w: [2, 12],
      add: (x: string, y: string) => `${name} lays two boards end to end on a deck. One is ${x} ft long and the other is ${y} ft long. How long are they together?`,
      sub: (x: string, y: string) => `A board is ${x} ft long. ${name} cuts off ${y} ft for a shelf. How much of the board is left? (Ignore the width of the saw cut.)` },
    { u: 'cups', dens: d === 1 ? [4, 3, 2] : [2, 3, 4], w: [1, 4],
      add: (x: string, y: string) => `${name} works in a restaurant kitchen. A batch of pancakes needs ${x} cups of flour and a batch of muffins needs ${y} cups. How many cups of flour is that in all?`,
      sub: (x: string, y: string) => `A container holds ${x} cups of rice. ${name} uses ${y} cups for a stir-fry. How many cups of rice are left?` },
  ]);
  // Build the two mixed numbers so the conditions always hold (no rejection loop that could run out).
  const lowNums = (q: number) => Array.from({ length: q - 1 }, (_, i) => i + 1).filter((n) => gcd(n, q) === 1);
  let p: number;
  let r: number;
  if (d === 1) {
    // Same denominator; halves are left out because 1/2 + 1/2 and 1/2 - 1/2 have no fraction part.
    p = r = rng.pick(c.dens.filter((x) => x !== 2));
  } else {
    [p, r] = rng.sample(c.dens, 2);
  }
  let na: number;
  let nb: number;
  if (d === 1) {
    if (op === '+') {
      // fa + fb < p
      const opts = lowNums(p).flatMap((x) => lowNums(p).filter((y) => x + y < p).map((y) => [x, y] as [number, number]));
      [na, nb] = rng.pick(opts);
    } else {
      const [x, y] = rng.sample(lowNums(p), 2);
      [na, nb] = x > y ? [x, y] : [y, x];
    }
  } else {
    const L = lcm(p, r);
    [na, nb] = retry(
      () => [rng.pick(lowNums(p)), rng.pick(lowNums(r))],
      ([x, y]) => x * (L / p) !== y * (L / r),
    );
  }
  const wb = op === '+' ? rng.int(c.w[0], c.w[1]) : rng.int(c.w[0], c.w[1] - 1);
  const wa = op === '+' ? rng.int(c.w[0], c.w[1]) : rng.int(wb + 1, c.w[1]);
  const A: Mixed = { w: wa, n: na, d: p };
  const B: Mixed = { w: wb, n: nb, d: r };
  const { steps, result } = mixedSteps(A, B, op);
  const unitWord = c.u === 'cups' ? 'cups' : c.u;
  return {
    prompt: op === '+' ? c.add(`$${mtex(A)}$`, `$${mtex(B)}$`) : c.sub(`$${mtex(A)}$`, `$${mtex(B)}$`),
    parts: [exactPart(result, unitWord)],
    hints: ['Work with the whole numbers and the fractions separately.', d === 1 ? 'The denominators are the same, so you can add or subtract the numerators.' : 'Give the fractions a common denominator first. Regroup if you need to.'],
    solution: [...steps, `The answer is $${mixedTex(result)}\\ ${tx(unitWord)}$.`],
    answerDisplay: `$${mixedTex(result)}\\ ${tx(unitWord)}$`,
  };
}

function cutList(rng: Rng): Out {
  const name = rng.pick(NAMES);
  const inches = rng.chance(0.6);
  const L = inches ? rng.pick([72, 96, 120, 144]) : rng.pick([8, 10, 12, 16]);
  const u = inches ? 'in' : 'ft';
  const dens = inches ? [2, 4, 8, 16] : [2, 4];
  const { p1, p2 } = retry(
    () => {
      const [d1, d2] = rng.sample(dens, 2);
      const hi = inches ? Math.floor(L * 0.42) : Math.floor(L * 0.4);
      const lo = inches ? 12 : 1;
      const p1: Mixed = { w: rng.int(lo, hi), n: properLowest(rng, d1), d: d1 };
      const p2: Mixed = { w: rng.int(lo, hi), n: properLowest(rng, d2), d: d2 };
      return { p1, p2 };
    },
    ({ p1, p2 }) => p1.w + p2.w + 2 <= L && p1.n / p1.d + p2.n / p2.d !== 1,
  );
  const add = mixedSteps(p1, p2, '+');
  const used = add.result;
  const usedW = Math.floor(used.n / used.d);
  const usedN = used.n - usedW * used.d;
  const left = frac(L * used.d - used.n, used.d);
  const board = `${L}-${u === 'in' ? 'inch' : 'foot'} board`;
  const job = rng.pick([
    `${name} is a construction labourer in ${rng.pick(TOWNS)}. ${name} needs to cut two pieces from a ${board}.`,
    `${name} is building a garden box and needs two pieces cut from one ${board}.`,
    `${name} works for a fencing company and cuts two pieces from a ${board}.`,
  ]);
  const usedTex = mx(usedW, usedN, used.d);
  return {
    prompt: `${job} The cut list is in the table. Ignoring the width of the saw cuts, how much of the board is left?`,
    figure: { type: 'table', headers: ['Piece', `Length (${u})`], rows: [['Piece 1', mixedPlain(p1.w, p1.n, p1.d)], ['Piece 2', mixedPlain(p2.w, p2.n, p2.d)]] },
    parts: [exactPart(left, u)],
    hints: ['First add the two pieces to find how much board is used.', `Then subtract that from ${L} ${u}. Write ${L} as a mixed number to regroup, like $${L} = ${mx(L - 1, used.d, used.d)}$.`],
    solution: [
      'Step 1: Add the two pieces to find how much board is used.',
      ...add.steps,
      `The pieces use $${usedTex}\\ ${tx(u)}$ of the board.`,
      `Step 2: Subtract from the whole board. Regroup: $${L} = ${mx(L - 1, used.d, used.d)}$.`,
      `$${mx(L - 1, used.d, used.d)} - ${usedTex} = ${mx(L - 1 - usedW, used.d - usedN, used.d)}$`,
      `There is $${mixedTex(left)}\\ ${tx(u)}$ of the board left.`,
    ],
    answerDisplay: `$${mixedTex(left)}\\ ${tx(u)}$`,
  };
}

const mixedMeasure = skill({
  id: 'm104-mixed-measure',
  name: 'Mixed numbers in measurement',
  description: 'Add and subtract mixed numbers in measurement problems, such as board lengths in inches or feet and cups in a recipe.',
  outcomes: ['N2'],
  lessonId: 'm104-2-3',
  calculator: false,
  gen(rng, d) {
    if (d === 3) return cutList(rng);
    return measureD1D2(rng, d);
  },
});

export const FRACTION_SKILLS: SkillDef[] = [equivalentFraction, compareFraction, fractionOf, addSubFraction, mixedMeasure];
