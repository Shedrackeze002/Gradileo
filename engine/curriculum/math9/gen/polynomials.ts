/** Grade 9 Unit 5 — Polynomials (PR5, PR6, PR7), limited to degree 2 or less. */
import { fixedChoice, mc, numPart, part, retry, skill } from '../../helpers.ts';
import { type Poly, polyAdd, polyLatex, polyMul, polyText } from '../../../math/poly.ts';
import { fmt } from '../../../math/numbers.ts';
import type { Rng } from '../../../rng.ts';
import type { Figure, Part, SkillDef } from '../../../types.ts';

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

/** [coefficient, monomial key]; keys are '' (constant), 'x', 'x^2', 'x*y', 'y', 'y^2'. */
type Term = [number, string];

const ORDER = ['x', 'y'];
const NAMES = [
  'Amara', 'Jordan', 'Priya', 'Mateo', 'Aiyana', 'Kwame', 'Mei', 'Hamid', 'Sofia', 'Liam', 'Fatima', 'Raj',
  'Chloé', 'Tariq', 'Olivia', 'Ethan', 'Wei', 'Nadia', 'Darius', 'Talia', 'Malik', 'Simran', 'Jun', 'Isabelle',
  'Owen', 'Zainab', 'Kai', 'Ayesha', 'Mason', 'Grace', 'Emeka', 'Rosa', 'Dakota', 'Arjun', 'Hana', 'Lucas',
];

/** LaTeX body of a monomial key: 'x^2' -> 'x^{2}', 'x*y' -> 'xy'. */
const bodyTex = (k: string) => k.split('*').filter(Boolean).map((p) => p.replace(/\^(\d+)/, '^{$1}')).join('');

/** Degree of a monomial key. */
const keyDeg = (k: string) => (k ? k.split('*').reduce((s, p) => s + (p.includes('^') ? Number(p.split('^')[1]) : 1), 0) : 0);

/** One term with its own sign: -3x, x^{2}, 4, -xy. */
function termTex(c: number, k: string): string {
  const b = bodyTex(k);
  const a = Math.abs(c);
  const s = b && a === 1 ? b : `${fmt(a)}${b}`;
  return c < 0 ? `-${s}` : s;
}

/** A term wrapped in brackets when it is negative: (-3x). */
const bTerm = (c: number, k: string) => (c < 0 ? `(${termTex(c, k)})` : termTex(c, k));

/** Terms in the order given, skipping zeros: 4 - x^{2} + 3x. */
function termsTex(ts: Term[]): string {
  let out = '';
  for (const [c, k] of ts) {
    if (c === 0) continue;
    if (out === '') out = termTex(c, k);
    else out += c < 0 ? ` - ${termTex(-c, k)}` : ` + ${termTex(c, k)}`;
  }
  return out || '0';
}

/** A polynomial followed by a unit, in brackets when it has more than one term: $(2x + 5)$ cm. */
const withUnit = (tex: string, unit: string) => (/ [+-] /.test(tex) ? `$(${tex})$ ${unit}` : `$${tex}$ ${unit}`);

const toPoly = (ts: Term[]): Poly => ts.reduce<Poly>((p, [c, k]) => polyAdd(p, new Map([[k, c]])), new Map());
const P = (p: Poly) => polyLatex(p, ORDER);
const PT = (p: Poly) => polyText(p, ORDER);
/** Standard order: degree 2 terms, then degree 1, then the constant. */
const KEY_RANK = ['x^2', 'x*y', 'y^2', 'x', 'y', ''];
const keyRank = (k: string) => KEY_RANK.indexOf(k);
const sortTerms = (ts: Term[]) => [...ts].sort((a, b) => keyRank(a[1]) - keyRank(b[1]));
/** Terms of a polynomial in standard order. */
const polyTerms = (p: Poly): Term[] => sortTerms([...p].map(([k, c]) => [c, k] as Term));
const neg = (ts: Term[]): Term[] => ts.map(([c, k]) => [-c, k]);

/** The like-term groups of a list of terms, as "(3x^2 - x^2) + (5x - 2x) + (4 - 7)". */
function groupedTex(ts: Term[]): string {
  const keys = [...new Set(ts.map(([, k]) => k))].sort((a, b) => keyRank(a) - keyRank(b));
  return keys
    .map((k) => {
      const g = ts.filter(([, kk]) => kk === k);
      return g.length > 1 || g[0][0] < 0 ? `(${termsTex(g)})` : termsTex(g);
    })
    .join(' + ');
}

/** What each group of like terms adds to, as a sentence piece. */
function groupSums(ts: Term[]): string[] {
  const keys = [...new Set(ts.map(([, k]) => k))].sort((a, b) => keyRank(a) - keyRank(b));
  const out: string[] = [];
  for (const k of keys) {
    const g = ts.filter(([, kk]) => kk === k);
    if (g.length < 2) continue;
    const sum = g.reduce((s, [c]) => s + c, 0);
    const what = k ? `the $${bodyTex(k)}$-terms` : 'the constants';
    out.push(sum === 0 ? `${what} add to $0$ and cancel` : `${what}: $${g.map(([c]) => (c < 0 ? `(${c})` : `${c}`)).join(' + ')} = ${sum}$`);
  }
  return out;
}

function exprPart(p: Poly, suffix?: string): Part {
  return part({ kind: 'expression', expected: PT(p), form: 'expanded' }, { placeholder: 'e.g. 4x^2 - x + 7', ...(suffix && { suffix }) });
}

/** A non-zero integer coefficient; ±1 appears with the given chance. */
function coef(rng: Rng, max: number, allowNeg: boolean, unitChance = 0): number {
  const s = allowNeg ? rng.sign() : 1;
  return s * (rng.chance(unitChance) ? 1 : rng.int(2, max));
}

type Out = { prompt: string; parts: Part[]; hints: string[]; solution: string[]; figure?: Figure; answerDisplay?: string };

// ---------------------------------------------------------------------------
// 5.1 Polynomial vocabulary
// ---------------------------------------------------------------------------

const TYPES = ['monomial', 'binomial', 'trinomial'];

function termsList(ts: Term[]): string {
  const xs = ts.map(([c, k]) => `$${termTex(c, k)}$`);
  return `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`;
}

const polynomialTerms = skill({
  id: 'm9-polynomial-terms',
  name: 'Parts of a polynomial',
  description: 'Identify the terms, degree, coefficients and constant term of a polynomial and classify it as a monomial, binomial or trinomial.',
  outcomes: ['PR5'],
  lessonId: 'm9-5-1',
  gen(rng, d) {
    let ts: Term[];
    if (d < 3) {
      const n = d === 1 ? rng.int(1, 3) : rng.int(2, 3);
      const keys = retry(() => rng.sample(['x^2', 'x', ''], n), (ks) => ks.some((k) => k !== ''));
      ts = keys.map((k) => [coef(rng, 9, true, d === 2 && k ? 0.4 : 0), k] as Term);
      if (d === 1) {
        ts = sortTerms(ts);
        ts[0][0] = Math.abs(ts[0][0]);
      } else {
        // Not in standard order, so students must read every term.
        const std = sortTerms(ts).map(([, k]) => k).join();
        ts = retry(() => rng.shuffle(ts), (s) => s.map(([, k]) => k).join() !== std);
      }
    } else {
      // Two variables: the degree of xy is 2.
      const pool = ['x^2', 'x*y', 'y^2', 'x', 'y', ''];
      const n = rng.int(3, 4);
      const keys = retry(
        () => rng.sample(pool, n),
        (ks) => (ks.includes('x*y') || (ks.some((k) => k.includes('x')) && ks.some((k) => k.includes('y')))) && ks.some((k) => keyDeg(k) === 2),
      );
      ts = rng.shuffle(keys.map((k) => [coef(rng, 9, true, k ? 0.35 : 0), k] as Term));
    }
    const n = ts.length;
    const degree = Math.max(...ts.map(([, k]) => keyDeg(k)));
    const constTerm = ts.find(([, k]) => k === '')?.[0] ?? 0;
    const varTerms = ts.filter(([, k]) => k !== '');
    // Prefer a term whose coefficient is hidden (1 or -1) or a two-variable term at higher levels.
    const tricky = varTerms.filter(([c, k]) => Math.abs(c) === 1 || k === 'x*y');
    const asked = d === 1 || tricky.length === 0 ? rng.pick(varTerms) : rng.pick(d === 3 ? tricky : [...tricky, ...varTerms]);
    const [ac, ak] = asked;
    const polyTex = termsTex(ts);

    const pTerms = numPart(n, { label: 'Number of terms:' });
    const pType: Part = { label: 'Type:', answer: fixedChoice(TYPES, Math.min(n, 3) - 1) };
    const pDeg = numPart(degree, { label: 'Degree:' });
    const pCoef = numPart(ac, { label: `Coefficient of $${bodyTex(ak)}$:` });
    const pConst = numPart(constTerm, { label: 'Constant term:' });

    const sTerms = n === 1
      ? `There are no $+$ or $-$ signs between parts, so $${termTex(ts[0][0], ts[0][1])}$ is a single term: there is $1$ term.`
      : `The terms are separated by $+$ and $-$ signs. The terms are ${termsList(ts)}, so there are $${n}$ terms.`;
    const sType = `A polynomial with $${n}$ term${n === 1 ? '' : 's'} is a **${TYPES[n - 1] ?? 'polynomial'}**.`;
    const degParts = ts.map(([c, k]) => `$${termTex(c, k)}$ has degree $${keyDeg(k)}$`).join(', ');
    const sDeg = `The degree of a term is the sum of the exponents of its variables (a constant has degree $0$): ${degParts}. The highest is $${degree}$, so the polynomial has degree $${degree}$.`;
    const sCoef = Math.abs(ac) === 1
      ? `The coefficient is the number multiplying the variables. $${termTex(ac, ak)}$ means $${ac}${bodyTex(ak)}$, so the coefficient of $${bodyTex(ak)}$ is $${ac}$.`
      : `The coefficient is the number multiplying the variables, sign included: in $${termTex(ac, ak)}$ it is $${ac}$.`;
    const sConst = constTerm === 0 ? 'No term is a number on its own, so the constant term is $0$.' : `The constant term is the term with no variable: $${constTerm}$.`;

    let chosen: Array<[Part, string, string]>;
    const all: Record<string, [Part, string, string]> = {
      terms: [pTerms, sTerms, `$${n}$ term${n === 1 ? '' : 's'}`],
      type: [pType, sType, TYPES[n - 1] ?? ''],
      deg: [pDeg, sDeg, `degree $${degree}$`],
      coef: [pCoef, sCoef, `the coefficient of $${bodyTex(ak)}$ is $${ac}$`],
      cst: [pConst, sConst, `the constant term is $${constTerm}$`],
    };
    const pick = (...names: string[]) => names.map((nm) => all[nm]);
    if (d === 1) {
      const v = rng.int(0, 2);
      if (v === 0) chosen = pick('terms', 'type');
      else if (v === 1 && constTerm !== 0) chosen = pick('deg', 'cst');
      else chosen = pick('coef', 'deg');
    } else if (d === 2) {
      chosen = rng.chance(0.5) ? pick('deg', 'coef', 'cst') : pick('terms', 'type', 'coef');
    } else {
      chosen = n <= 3 ? pick('type', 'deg', 'coef', 'cst') : pick('terms', 'deg', 'coef', 'cst');
    }
    return {
      prompt: `Look at the polynomial
$$${polyTex}$$
Answer each question about it.`,
      parts: chosen.map(([p]) => p),
      hints: d === 3
        ? ['Terms are separated by $+$ and $-$ signs; the sign in front of a term belongs to it.', 'For a term with two variables, add the exponents: $xy = x^{1}y^{1}$ has degree $2$.']
        : ['Terms are separated by $+$ and $-$ signs, and the sign in front of a term belongs to it.', 'The degree is the highest exponent on the variable. A term like $x$ has coefficient $1$, and $-x$ has coefficient $-1$.'],
      solution: [...chosen.map(([, s]) => s), `Answer: ${chosen.map(([, , a]) => a).join('; ')}.`],
    };
  },
});

// ---------------------------------------------------------------------------
// 5.2 Like terms
// ---------------------------------------------------------------------------

/** Two or more terms of each kind, shuffled so like terms are not side by side. */
function likeTermList(rng: Rng, kinds: string[], perKind: number[], max: number, allowNeg: boolean, unitChance: number): Term[] {
  const ts: Term[] = [];
  kinds.forEach((k, i) => {
    for (let j = 0; j < perKind[i]; j++) ts.push([coef(rng, max, allowNeg, k ? unitChance : 0), k]);
  });
  return retry(() => rng.shuffle(ts), (s) => s.every((t, i) => i === 0 || t[1] !== s[i - 1][1]), 30);
}

function likeTermsSolution(ts: Term[], result: Poly): string[] {
  const sums = groupSums(ts);
  return [
    `Like terms have the same variables with the same exponents. Group them: $${groupedTex(ts)}$`,
    `Add the coefficients in each group${sums.length ? ` (${sums.join('; ')})` : ''}.`,
    `The simplified polynomial is $${P(result)}$.`,
  ];
}

const TILE_NOTE = 'Shaded tiles are positive and white tiles are negative.';

const likeTerms = skill({
  id: 'm9-like-terms',
  name: 'Collecting like terms',
  description: 'Identify like terms and simplify a polynomial by collecting them, using algebra tiles or symbols.',
  outcomes: ['PR5', 'PR6'],
  lessonId: 'm9-5-2',
  gen(rng, d): Out {
    if (d === 2 && rng.chance(0.4)) {
      // Algebra tiles with zero pairs.
      const counts = retry(
        () => [0, 1, 2].map(() => [rng.int(0, 5), rng.int(0, 5)]),
        (cs) => cs.every(([p, n]) => p + n > 0) && cs.some(([p, n]) => p > 0 && n > 0) && cs.some(([p, n]) => p !== n),
      );
      const keys = ['x^2', 'x', ''];
      const result = toPoly(keys.map((k, i) => [counts[i][0] - counts[i][1], k] as Term));
      const names = ['$x^2$-tiles', '$x$-tiles', 'Unit tiles'];
      const lines = keys.map((k, i) => {
        const [p, n] = counts[i];
        const r = p - n;
        return `${names[i]}: $${p} - ${n} = ${r}$${r === 0 ? ', so they all cancel' : `, which gives $${termTex(r, k)}$`}`;
      });
      return {
        prompt: `A polynomial is modelled with the algebra tiles in the table. ${TILE_NOTE} Write the simplified polynomial that the tiles represent.`,
        figure: { type: 'table', headers: ['Tile', 'Shaded (positive)', 'White (negative)'], rows: [['$x^2$-tile', `${counts[0][0]}`, `${counts[0][1]}`], ['x-tile', `${counts[1][0]}`, `${counts[1][1]}`], ['unit tile', `${counts[2][0]}`, `${counts[2][1]}`]] },
        parts: [exprPart(result)],
        hints: ['A shaded tile and a white tile of the same kind form a zero pair: together they are worth $0$.', 'For each kind of tile, subtract the number of white tiles from the number of shaded tiles.'],
        solution: ['Remove zero pairs: each shaded tile cancels one white tile of the same kind.', ...lines, `The tiles represent $${P(result)}$.`],
        answerDisplay: `$${P(result)}$`,
      };
    }
    if (d === 3 && rng.chance(0.4)) {
      // Perimeter of a shape whose sides are monomials and binomials.
      const shape = rng.pick([
        { name: 'triangular garden', sides: 3, unit: 'm' },
        { name: 'triangular pennant for the school hockey team', sides: 3, unit: 'cm' },
        { name: 'four-sided park in the city', sides: 4, unit: 'm' },
        { name: 'quadrilateral patio', sides: 4, unit: 'm' },
      ]);
      const sides = retry(
        () => Array.from({ length: shape.sides }, (_, i): Term[] => {
          const sq = i === 0 && rng.chance(0.5);
          return sq ? [[1, 'x^2'], [rng.int(1, 6), '']] : rng.chance(0.3) ? [[rng.int(2, 9), 'x']] : [[rng.int(1, 6), 'x'], [rng.sign() * rng.int(1, 9), '']];
        }),
        (ss) => {
          const p = toPoly(ss.flat());
          return p.size >= 2 && [...p.values()].every((c) => c > 0);
        },
      );
      const all = sides.flat();
      const result = toPoly(all);
      const label = (s: Term[]) => `$${termsTex(s)}$`;
      return {
        prompt: `The sides of a ${shape.name} measure ${sides.map(label).slice(0, -1).join(', ')} and ${label(sides[sides.length - 1])}, all in ${shape.unit === 'm' ? 'metres' : 'centimetres'}. Write a simplified expression for its perimeter.`,
        parts: [exprPart(result, shape.unit)],
        hints: ['The perimeter is the sum of all the side lengths.', 'Write every side in one long sum, then collect like terms.'],
        solution: [`Add all the sides: $${sides.map((s) => (s.length > 1 ? `(${termsTex(s)})` : termsTex(s))).join(' + ')}$`, ...likeTermsSolution(all, result).slice(0, 2), `The perimeter is ${withUnit(P(result), shape.unit)}.`],
        answerDisplay: withUnit(P(result), shape.unit),
      };
    }
    let ts: Term[];
    if (d === 1) {
      const kinds = rng.chance(0.7) ? rng.sample(['x^2', 'x', ''], 2) : ['x', ''];
      ts = likeTermList(rng, kinds, [2, 2], 9, false, 0.2);
      if (rng.chance(0.4)) {
        // One subtraction, kept so each group stays positive.
        const i = rng.int(1, 3);
        const same = ts.filter(([, k]) => k === ts[i][1]);
        const other = same.find((t) => t !== ts[i])!;
        if (other[0] > ts[i][0]) ts[i] = [-ts[i][0], ts[i][1]];
      }
    } else if (d === 2) {
      const kinds = ['x^2', 'x', ''];
      ts = retry(
        () => likeTermList(rng, kinds, rng.shuffle([2, 2, rng.int(1, 2)]), 9, true, 0.3),
        (s) => toPoly(s).size >= 2,
      );
    } else {
      const kinds = rng.chance(0.5) ? ['x^2', 'x*y', 'y^2'] : rng.pick([['x', 'y', ''], ['x^2', 'x*y', ''], ['x*y', 'x', 'y'], ['x^2', 'y^2', 'x*y']]);
      ts = retry(
        () => likeTermList(rng, kinds, rng.shuffle([2, 2, rng.int(2, 3)]), 9, true, 0.3),
        (s) => toPoly(s).size >= 2,
      );
    }
    const result = toPoly(ts);
    return {
      prompt: `Simplify by collecting like terms:
$$${termsTex(ts)}$$`,
      parts: [exprPart(result)],
      hints: d === 3
        ? ['Like terms have exactly the same variables with the same exponents: $xy$ and $x^{2}$ are not like terms.', 'Group the like terms, keeping the sign in front of each term, then add the coefficients.']
        : ['Like terms have the same variable raised to the same exponent, such as $3x$ and $-x$.', 'Group the like terms, keeping the sign in front of each term, then add their coefficients.'],
      solution: likeTermsSolution(ts, result),
      answerDisplay: `$${P(result)}$`,
    };
  },
});

// ---------------------------------------------------------------------------
// 5.3 Adding and subtracting polynomials
// ---------------------------------------------------------------------------

function randPoly(rng: Rng, keys: string[], max: number, allowNeg: boolean, unitChance = 0): Term[] {
  const ts = keys.map((k) => [coef(rng, max, allowNeg, k ? unitChance : 0), k] as Term);
  if (ts.length) ts[0][0] = Math.abs(ts[0][0]);
  return ts;
}

const br = (ts: Term[]) => `(${termsTex(ts)})`;

function addSteps(a: Term[], b: Term[], op: '+' | '-'): string[] {
  const all = op === '+' ? [...a, ...b] : [...a, ...neg(b)];
  const result = toPoly(all);
  const first = op === '+'
    ? `Adding: remove the brackets. Each term keeps its sign: $${termsTex(all)}$`
    : `Subtracting: add the opposite of **every** term in the second polynomial. $-${br(b)}$ becomes $${termsTex(neg(b))}$, so the expression is $${termsTex(all)}$`;
  return [first, `Group like terms: $${groupedTex(all)}$`, `Combine like terms: $${P(result)}$`];
}

const STD2 = ['x^2', 'x', ''];

const addSubtract = skill({
  id: 'm9-poly-add-subtract',
  name: 'Adding and subtracting polynomials',
  description: 'Add and subtract polynomials of degree 2 or less, subtracting every term of the second polynomial.',
  outcomes: ['PR6'],
  lessonId: 'm9-5-3',
  gen(rng, d): Out {
    if (d === 3) {
      const v = rng.int(0, 2);
      if (v === 0) {
        // Error analysis: only the first term was subtracted.
        const a = randPoly(rng, STD2, 9, true);
        const b = retry(() => randPoly(rng, STD2, 9, true), (bb) => bb.slice(1).some(([c]) => c !== 0) && toPoly([...a, ...neg(bb)]).size >= 2);
        const right = toPoly([...a, ...neg(b)]);
        const wrong = toPoly([...a, [-b[0][0], b[0][1]], ...b.slice(1)]);
        const name = rng.pick(NAMES);
        const reason = mc(rng, `${name} subtracted only the first term of the second polynomial.`, [
          `${name} added the polynomials instead of subtracting.`,
          `${name} combined terms that are not like terms.`,
          `${name} made no mistake.`,
        ]);
        return {
          prompt: `${name} simplified $${br(a)} - ${br(b)}$ and got $${P(wrong)}$.

a) What mistake did ${name} make?

b) Write the correct answer.`,
          parts: [{ label: 'a)', answer: reason }, { ...exprPart(right), label: 'b)' }],
          hints: ['Compare the sign of each term from the second polynomial in the work with what it should be.', 'The minus sign in front of the bracket changes the sign of every term inside it.'],
          solution: [
            `In ${name}'s answer, only $${termTex(b[0][0], b[0][1])}$ changed sign. The other terms of the second polynomial kept their signs, so ${name} subtracted only the first term.`,
            ...addSteps(a, b, '-'),
            `a) ${name} subtracted only the first term. b) The correct answer is $${P(right)}$.`,
          ],
          answerDisplay: `$${P(right)}$`,
        };
      }
      if (v === 1) {
        // Missing side from the perimeter.
        const unit = rng.pick(['cm', 'm']);
        const s1: Term[] = [[rng.int(1, 3), 'x^2'], [rng.sign() * rng.int(1, 6), 'x'], [rng.int(1, 9), '']];
        const s2: Term[] = [[rng.int(2, 7), 'x'], [rng.int(1, 9), '']];
        const s3: Term[] = retry(() => [[rng.int(1, 2), 'x^2'], [rng.int(1, 8), 'x'], [rng.sign() * rng.int(1, 9), '']] as Term[], (t) => t[2][0] !== 0);
        const per = toPoly([...s1, ...s2, ...s3]);
        const thing = rng.pick(['a triangular flower bed', 'a triangular sail', 'a triangular sign at a campground']);
        const steps = [...s1, ...s2];
        const all = [...polyTerms(per), ...neg(steps)];
        const result = toPoly(all);
        return {
          prompt: `The perimeter of ${thing} is ${withUnit(P(per), unit)}. Two of its sides measure ${withUnit(termsTex(s1), unit)} and ${withUnit(termsTex(s2), unit)}. Write a simplified expression for the length of the third side.`,
          parts: [exprPart(result, unit)],
          hints: ['Third side = perimeter − first side − second side.', 'Subtract every term of each side you take away, then collect like terms.'],
          solution: [
            `Third side $= (${P(per)}) - ${br(s1)} - ${br(s2)}$`,
            `Change the sign of every term being subtracted: $${termsTex(all)}$`,
            `Group like terms: $${groupedTex(all)}$`,
            `The third side is ${withUnit(P(result), unit)}.`,
          ],
          answerDisplay: withUnit(P(result), unit),
        };
      }
      // How much greater: difference of two areas.
      const pair = rng.pick([
        ['the gym floor', 'the library floor'],
        ['the hockey rink', 'the curling sheet'],
        ['the school garden', 'the community garden plot'],
        ['the soccer field', 'the playground'],
      ]);
      const a: Term[] = [[rng.int(3, 6), 'x^2'], [rng.int(2, 9), 'x'], [rng.int(10, 30), '']];
      const b: Term[] = [[rng.int(1, a[0][0] - 1), 'x^2'], [rng.sign() * rng.int(1, 9), 'x'], [rng.int(1, 9), '']];
      const result = toPoly([...a, ...neg(b)]);
      return {
        prompt: `The area of ${pair[0]} is ${withUnit(termsTex(a), 'm²')}, and the area of ${pair[1]} is ${withUnit(termsTex(b), 'm²')}. Write a simplified expression for how much greater the area of ${pair[0]} is.`,
        parts: [exprPart(result, 'm²')],
        hints: ['"How much greater" means subtract: the larger area minus the smaller area.', 'Put the second polynomial in brackets and subtract every one of its terms.'],
        solution: [`Difference $= ${br(a)} - ${br(b)}$`, ...addSteps(a, b, '-'), `The area of ${pair[0]} is ${withUnit(P(result), 'm²')} greater.`],
        answerDisplay: withUnit(P(result), 'm²'),
      };
    }
    const sub = d === 1 ? rng.chance(0.35) : rng.chance(0.7);
    const op = sub ? '-' : '+';
    const make = (): [Term[], Term[]] => {
      if (d === 1) {
        const keysA = rng.pick([['x', ''], ['x^2', 'x'], ['x^2', ''], ['x^2', 'x', '']]);
        const keysB = rng.chance(0.5) ? keysA : rng.pick([['x', ''], ['x^2', 'x']]);
        const a = randPoly(rng, keysA, 9, !sub);
        const b = randPoly(rng, keysB, sub ? 5 : 9, !sub);
        return [sub ? a.map(([c, k]) => [c + 4, k] as Term) : a, b];
      }
      const a = randPoly(rng, rng.chance(0.7) ? STD2 : rng.pick([['x^2', 'x'], ['x^2', '']]), 9, true, 0.2);
      const b = randPoly(rng, rng.chance(0.7) ? STD2 : rng.pick([['x', ''], ['x^2', 'x']]), 9, true, 0.2);
      return [a, rng.chance(0.4) ? rng.shuffle(b) : b];
    };
    const [a, b] = retry(make, ([x, y]) => toPoly(op === '+' ? [...x, ...y] : [...x, ...neg(y)]).size >= 2);
    const result = toPoly(op === '+' ? [...a, ...b] : [...a, ...neg(b)]);
    return {
      prompt: `Simplify:
$$${br(a)} ${op} ${br(b)}$$`,
      parts: [exprPart(result)],
      hints: sub
        ? ['Subtracting a polynomial means adding its opposite.', 'Change the sign of every term in the second bracket, then collect like terms.']
        : ['Remove the brackets: each term keeps its own sign.', 'Collect like terms: $x^{2}$-terms, $x$-terms and constants.'],
      solution: [...addSteps(a, b, op), `The answer is $${P(result)}$.`],
      answerDisplay: `$${P(result)}$`,
    };
  },
});

// ---------------------------------------------------------------------------
// 5.4 Multiplying and dividing by a monomial
// ---------------------------------------------------------------------------

function mulTerms(m: Term, q: Term[]): Term[] {
  return q.map(([c, k]) => {
    const p = polyMul(new Map([[m[1], m[0]]]), new Map([[k, c]]));
    const [[kk, cc]] = [...p];
    return [cc, kk] as Term;
  });
}

function areaFig(m: Term, q: Term[]): Figure {
  return { type: 'areaModel', top: q.map(([c, k]) => termTex(c, k)), side: [termTex(m[0], m[1])], cells: [q.map(() => '?')] };
}

function mulSteps(m: Term, q: Term[]): string[] {
  const prods = mulTerms(m, q);
  return [
    `Multiply the monomial by each term inside the brackets: $${q.map(([c, k]) => `${bTerm(m[0], m[1])}(${termTex(c, k)})`).join(' + ')}$`,
    `Each product: ${q.map(([c, k], i) => `$${bTerm(m[0], m[1])}(${termTex(c, k)}) = ${termTex(prods[i][0], prods[i][1])}$`).join(', ')}`,
    `Write the products as one polynomial: $${termsTex(prods)}$`,
  ];
}

const multiplyMonomial = skill({
  id: 'm9-poly-multiply-monomial',
  name: 'Multiplying a polynomial by a monomial',
  description: 'Multiply a polynomial of degree 2 or less by a monomial, using an area model or the distributive property.',
  outcomes: ['PR7'],
  lessonId: 'm9-5-4',
  gen(rng, d): Out {
    if (d === 3) {
      const v = rng.int(0, 2);
      if (v === 0) {
        // Two variables.
        const m: Term = [rng.sign() * rng.int(2, 5), 'x'];
        const q: Term[] = rng.chance(0.5)
          ? [[rng.int(1, 5), 'x'], [rng.sign() * rng.int(1, 6), 'y'], [rng.sign() * rng.int(1, 9), '']]
          : [[rng.int(1, 5), 'y'], [rng.sign() * rng.int(1, 9), '']];
        const result = toPoly(mulTerms(m, q));
        return {
          prompt: `Expand and simplify:
$$${termTex(m[0], m[1])}(${termsTex(q)})$$`,
          parts: [exprPart(result)],
          hints: ['Multiply the monomial by every term in the brackets.', 'Multiply the coefficients, then the variables: $x \\cdot x = x^{2}$ and $x \\cdot y = xy$. Watch the signs.'],
          solution: [...mulSteps(m, q), `The product is $${P(result)}$.`],
          answerDisplay: `$${P(result)}$`,
        };
      }
      if (v === 1) {
        // Area of a rectangle.
        const w: Term = [rng.int(2, 6), 'x'];
        const l: Term[] = [[rng.int(1, 5), 'x'], [rng.int(1, 9), '']];
        const [thing, unit] = rng.pick([['a rectangular vegetable garden', 'm'], ['a rectangular poster for the school dance', 'cm'], ['a rectangular rink on a farm pond', 'm'], ['a rectangular tent floor', 'm'], ['a rectangular photo', 'cm']]);
        const result = toPoly(mulTerms(w, l));
        return {
          prompt: `${thing[0].toUpperCase()}${thing.slice(1)} is $${termTex(w[0], w[1])}$ ${unit} wide and ${withUnit(termsTex(l), unit)} long. Write a simplified expression for its area.`,
          figure: areaFig(w, l),
          parts: [exprPart(result, `${unit}²`)],
          hints: ['Area of a rectangle = length × width.', `Multiply $${termTex(w[0], w[1])}$ by each term of $${termsTex(l)}$.`],
          solution: [`Area $= ${termTex(w[0], w[1])}(${termsTex(l)})$`, ...mulSteps(w, l).slice(1), `The area is ${withUnit(P(result), `${unit}²`)}.`],
          answerDisplay: withUnit(P(result), `${unit}²`),
        };
      }
      // Two products, then collect like terms.
      const m1: Term = [rng.int(2, 5), 'x'];
      const q1: Term[] = [[rng.int(1, 4), 'x'], [rng.sign() * rng.int(1, 9), '']];
      const m2: Term = [rng.sign() * rng.int(2, 6), ''];
      const q2: Term[] = [[rng.int(1, 5), 'x'], [rng.sign() * rng.int(1, 9), '']];
      const p1 = mulTerms(m1, q1);
      const p2 = mulTerms(m2, q2);
      const result = toPoly([...p1, ...p2]);
      const op = m2[0] < 0 ? '-' : '+';
      return {
        prompt: `Expand and simplify:
$$${termTex(m1[0], m1[1])}(${termsTex(q1)}) ${op} ${Math.abs(m2[0])}(${termsTex(q2)})$$`,
        parts: [exprPart(result)],
        hints: [m2[0] < 0 ? `Expand each product first. Treat the second one as $${m2[0]}(${termsTex(q2)})$: the minus sign goes with the ${-m2[0]} and multiplies every term.` : 'Expand each product first, multiplying every term inside each bracket.', 'Then collect like terms.'],
        solution: [
          `First product: $${termTex(m1[0], m1[1])}(${termsTex(q1)}) = ${termsTex(p1)}$`,
          `Second product: $${m2[0]}(${termsTex(q2)}) = ${termsTex(p2)}$`,
          `Add: $${termsTex([...p1, ...p2])}$`,
          `Collect like terms: $${P(result)}$`,
        ],
        answerDisplay: `$${P(result)}$`,
      };
    }
    let m: Term;
    let q: Term[];
    if (d === 1) {
      if (rng.chance(0.5)) {
        m = [rng.int(2, 6), ''];
        q = [[rng.int(1, 5), 'x'], [rng.int(1, 9), '']];
      } else {
        m = [rng.int(2, 5), 'x'];
        q = [[rng.int(1, 4), 'x'], [rng.int(1, 9), '']];
      }
    } else if (rng.chance(0.5)) {
      m = [rng.sign() * rng.int(2, 6), ''];
      q = [[coef(rng, 5, false, 0.4), 'x^2'], [coef(rng, 9, true), 'x'], [coef(rng, 9, true), '']];
      if (m[0] > 0 && q.every(([c]) => c > 0)) q[2][0] = -q[2][0];
    } else {
      m = [rng.sign() * rng.int(2, 6), 'x'];
      q = [[rng.int(1, 6), 'x'], [rng.sign() * rng.int(1, 9), '']];
    }
    const result = toPoly(mulTerms(m, q));
    const showModel = d === 1 || rng.chance(0.4);
    return {
      prompt: `${showModel ? 'Use the area model to multiply. ' : ''}Expand and simplify:
$$${termTex(m[0], m[1])}(${termsTex(q)})$$`,
      ...(showModel && { figure: areaFig(m, q) }),
      parts: [exprPart(result)],
      hints: [
        showModel ? 'Each cell of the area model is the product of its row label and its column label.' : 'Multiply the monomial by every term inside the brackets (the distributive property).',
        'Multiply the coefficients and then the variables: $x \\cdot x = x^{2}$. A negative times a negative is positive.',
      ],
      solution: [...mulSteps(m, q), `The product is $${P(result)}$.`],
      answerDisplay: `$${P(result)}$`,
    };
  },
});

function divSteps(dividend: Term[], m: Term, q: Term[]): string[] {
  return [
    `Divide each term of the polynomial by the monomial: $${dividend.map(([c, k]) => `\\dfrac{${termTex(c, k)}}{${termTex(m[0], m[1])}}`).join(' + ')}$`,
    `Divide the coefficients${m[1] ? ', then the variables (for example $\\dfrac{x^{2}}{x} = x$ and $\\dfrac{x}{x} = 1$)' : ''}: ${dividend.map(([c, k], i) => `$\\dfrac{${termTex(c, k)}}{${termTex(m[0], m[1])}} = ${termTex(q[i][0], q[i][1])}$`).join(', ')}`,
    `Check by multiplying: $${termTex(m[0], m[1])}(${termsTex(q)}) = ${termsTex(dividend)}$, which is the original polynomial.`,
  ];
}

const divideMonomial = skill({
  id: 'm9-poly-divide-monomial',
  name: 'Dividing a polynomial by a monomial',
  description: 'Divide a polynomial of degree 2 or less by a monomial, writing the quotient in expanded form.',
  outcomes: ['PR7'],
  lessonId: 'm9-5-4',
  gen(rng, d): Out {
    let m: Term;
    let q: Term[];
    let context = false;
    if (d === 1) {
      m = [rng.int(2, 6), ''];
      q = rng.chance(0.6) ? [[rng.int(1, 5), 'x'], [rng.int(1, 9), '']] : [[rng.int(1, 4), 'x^2'], [rng.int(1, 9), 'x']];
      if (rng.chance(0.3)) q[1][0] = -q[1][0];
    } else if (d === 2) {
      if (rng.chance(0.65)) {
        m = [rng.sign() * rng.int(2, 6), 'x'];
        q = [[coef(rng, 5, false, 0.2), 'x'], [coef(rng, 9, true), '']];
      } else {
        m = [rng.sign() * rng.int(2, 5), ''];
        q = [[coef(rng, 4, false, 0.3), 'x^2'], [coef(rng, 9, true), 'x'], [coef(rng, 9, true), '']];
      }
    } else {
      const v = rng.int(0, 2);
      if (v === 0) {
        m = [rng.sign() * rng.int(2, 6), 'x'];
        q = [[coef(rng, 4, true, 0.3), 'x'], [coef(rng, 6, true, 0.3), 'y'], [coef(rng, 9, true), '']];
      } else if (v === 1) {
        context = true;
        m = [rng.int(2, 6), 'x'];
        q = [[rng.int(1, 4), 'x'], [rng.int(1, 9), '']];
      } else {
        m = [-rng.int(2, 5), rng.pick(['', 'x'])];
        q = m[1] === '' ? [[coef(rng, 4, true, 0.3), 'x^2'], [coef(rng, 6, true), 'x*y'], [coef(rng, 9, true), 'y^2']] : [[coef(rng, 4, true, 0.3), 'x'], [coef(rng, 6, true), 'y']];
      }
    }
    const dividend = mulTerms(m, q);
    const quotient = toPoly(q);
    if (context) {
      const [thing, unit] = rng.pick([['a rectangular soccer field', 'm'], ['a rectangular classroom bulletin board', 'cm'], ['a rectangular dog run', 'm'], ['a rectangular quilt', 'cm']]);
      return {
        prompt: `The area of ${thing} is ${withUnit(termsTex(dividend), `${unit}²`)}. Its width is $${termTex(m[0], m[1])}$ ${unit}. Write a simplified expression for its length.`,
        figure: { type: 'areaModel', top: q.map(() => '?'), side: [termTex(m[0], m[1])], cells: [dividend.map(([c, k]) => termTex(c, k))] },
        parts: [exprPart(quotient, unit)],
        hints: ['Length = area ÷ width.', `Divide each term of the area by $${termTex(m[0], m[1])}$.`],
        solution: [`Length $= \\dfrac{${termsTex(dividend)}}{${termTex(m[0], m[1])}}$`, ...divSteps(dividend, m, q), `The length is ${withUnit(P(quotient), unit)}.`],
        answerDisplay: withUnit(P(quotient), unit),
      };
    }
    const asFraction = d >= 2 && rng.chance(0.5);
    const shown = asFraction ? `\\dfrac{${termsTex(dividend)}}{${termTex(m[0], m[1])}}` : `(${termsTex(dividend)}) \\div ${m[0] < 0 || m[1] ? `(${termTex(m[0], m[1])})` : termTex(m[0], m[1])}`;
    return {
      prompt: `Divide and simplify:
$$${shown}$$`,
      parts: [exprPart(quotient)],
      hints: [
        'Divide every term of the polynomial by the monomial.',
        'Divide the coefficients (watch the signs), then subtract exponents of the same variable: $\\dfrac{x^{2}}{x} = x$.',
      ],
      solution: [...divSteps(dividend, m, q), `The quotient is $${P(quotient)}$.`],
      answerDisplay: `$${P(quotient)}$`,
    };
  },
});

export const POLYNOMIALS_SKILLS: SkillDef[] = [polynomialTerms, likeTerms, addSubtract, multiplyMonomial, divideMonomial];
