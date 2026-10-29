/**
 * Grading: compares student responses to answer specs.
 *
 * Every grader returns a result with a short, student-friendly message so that a
 * correct-but-unsimplified answer gets formative feedback instead of a bare "wrong".
 */
import {
  type Node,
  ParseError,
  containsNode,
  evaluate,
  parseEquation,
  parseExpr,
  splitPoint,
  unparen,
  variablesOf,
} from './math/expr.ts';
import {
  hasCommonVariable,
  isReducibleOverIntegers,
  monomialInfo,
  polyContent,
  polyDegree,
  productFactors,
  sumTerms,
  toPoly,
} from './math/poly.ts';
import { approxEqual, gcd, isPrime, radicalSplit } from './math/numbers.ts';
import { FormulaError, isBalanced, parseFormula, readFormula, sameFormula } from './chem/formula.ts';
import type { AnswerSpec, ExprForm, Item, Line, LineForm } from './types.ts';

export interface PartResult {
  correct: boolean;
  /** Student-facing explanation when not correct (or a nudge when correct). */
  message?: string;
  /** True when the answer was unreadable; UI should let the student fix it without penalty. */
  invalid?: boolean;
}

export interface ItemResult {
  correct: boolean;
  /** Fraction of parts correct, 0..1. */
  score: number;
  parts: PartResult[];
}

const ok = (message?: string): PartResult => ({ correct: true, message });
const no = (message?: string): PartResult => ({ correct: false, message });
const invalid = (message: string): PartResult => ({ correct: false, invalid: true, message });

export function gradeItem(item: Item, responses: string[]): ItemResult {
  const parts = item.parts.map((p, i) => gradePart(p.answer, responses[i] ?? ''));
  const nCorrect = parts.filter((p) => p.correct).length;
  return { correct: nCorrect === parts.length, score: parts.length ? nCorrect / parts.length : 0, parts };
}

export function gradePart(spec: AnswerSpec, raw: string): PartResult {
  const response = (raw ?? '').trim();
  try {
    switch (spec.kind) {
      case 'mc':
        if (!response) return invalid('Choose an answer.');
        return response === spec.correct ? ok() : no();
      case 'multi': {
        if (!response) return invalid('Select at least one answer.');
        const picked = new Set(response.split(',').filter(Boolean));
        const want = new Set(spec.correct);
        const same = picked.size === want.size && [...want].every((c) => picked.has(c));
        if (same) return ok();
        const missing = [...want].filter((c) => !picked.has(c)).length;
        const extra = [...picked].filter((c) => !want.has(c)).length;
        if (missing && !extra) return no('Close — at least one correct choice is missing.');
        if (extra && !missing) return no('Close — you selected a choice that does not belong.');
        return no();
      }
      case 'order': {
        const got = response.split(',');
        return got.join(',') === spec.correctOrder.join(',') ? ok() : no('The order is not quite right.');
      }
      case 'text': {
        if (!response) return invalid('Enter an answer.');
        // Phones type curly quotes and apostrophes: “it’s” and "it's" are the same answer.
        const norm = (s: string) => {
          const t = s.trim().replace(/\s+/g, ' ').replace(/[‘’ʼ`]/g, "'").replace(/[“”]/g, '"');
          return spec.caseSensitive ? t : t.toLowerCase();
        };
        return spec.accepted.some((a) => norm(a) === norm(response)) ? ok() : no();
      }
      case 'numeric':
        return gradeNumeric(spec, response);
      case 'numbers':
        return gradeNumbers(spec, response);
      case 'expression':
        return gradeExpression(spec, response);
      case 'line':
        return gradeLine(spec.line, spec.form, response);
      case 'equation-fn':
        return gradeFunctionNotation(spec, response);
      case 'point':
        return gradePoint(spec, response);
      case 'graph-line':
        return gradeGraphLine(spec.line, response);
      case 'graph-points':
        return gradeGraphPoints(spec.points, response);
      case 'formula':
        return gradeFormula(spec.expected, response);
      case 'coefficients':
        return gradeCoefficients(spec.reactants, spec.products, response);
      case 'manual':
        return response ? { correct: false, message: 'Your teacher will review this response.' } : invalid('Write a response.');
    }
  } catch (e) {
    if (e instanceof ParseError || e instanceof FormulaError) return invalid(e.message);
    return invalid('We could not read that answer. Check the format.');
  }
}

// ---------------------------------------------------------------------------
// Numeric
// ---------------------------------------------------------------------------

const MIXED = /^(-?)\s*(\d+)\s+(\d+)\s*\/\s*(\d+)$/;
const GROUPED = /^-?\d{1,3}(,\d{3})+(\.\d+)?$/;
/** Digits grouped by spaces, the SI and Canadian style: 250 000 or 1 250 000.5. */
const SPACED = /^-?\d{1,3}([ \u00a0\u2009\u202f]\d{3})+(\.\d+)?$/;

/** Strip a trailing unit the student typed ("12.5 cm" -> "12.5"). */
function stripUnits(s: string): string {
  // A unit is never the end of a longer word: the "in" of "min" is not inches.
  return s
    .replace(/\s*(?<![a-z])(km\/h|kph|mph|m\/s|km\/l|l\/100\s*km|mpg)\s*$/i, '')
    // Chemistry: pressure, amount, concentration and molar mass units, and kelvins ("298 K").
    .replace(/\s*(?<![a-z])(kpa|atm|mm\s*hg|mol\/l|g\/mol|mol)\s*$/i, '')
    .replace(/(\d)\s*K$/, '$1')
    // A rate written with a slash ("2.50/kg", "18/h"); never maths such as 1/pi.
    .replace(/(\d)\s*\/\s*(?!(?:pi|sqrt|root|cbrt)\b)[a-z]+\s*$/i, '$1')
    .replace(/\s*(?<![a-z])(cm|mm|km|m|in|inches|inch|ft|feet|foot|yd|yards|yard|mi|miles|mile|degrees|deg|°|units?)(\^?[23²³])?\s*$/i, '')
    .replace(/\s*(?<![a-z])(kg|mg|g|ml|l|litres?|liters?|lbs?|pounds?|oz|fl\.?\s*oz|gal|gallons?|qt|quarts?|pt|pints?|cups?|tons?|tonnes?|°\s*[cf]|percent|%|h|hrs?|hours?|mins?|minutes?|dollars?)\s*$/i, '')
    .replace(/°$/, '')
    // A word naming what was counted ("48 tiles", "3 cans of paint"), but not maths such as "3 pi".
    .replace(/(\d)\s+(?!(?:pi|sqrt|root|cbrt)\b)[a-z]{2,}(?:\s+[a-z]+){0,2}\.?\s*$/i, '$1')
    .trim();
}

/** Functions a student must work out rather than type: an exact value is not "sin(5pi/12)". */
const WORKED_OUT = new Set(['sin', 'cos', 'tan', 'sec', 'csc', 'cot', 'ln', 'log', 'exp']);

export function parseNumber(raw: string, allowExpression: boolean, allowFunctions = false, scientific = false): { value: number; isPlain: boolean } | null {
  let s = stripUnits(raw.replace(/\$/g, '').trim());
  if (!s) return null;
  if (scientific) {
    const sci = scientificValue(s);
    if (sci !== null) return { value: sci, isPlain: true };
  }
  if (GROUPED.test(s)) s = s.replace(/,/g, '');
  else if (SPACED.test(s)) s = s.replace(/[ \u00a0\u2009\u202f]/g, '');
  const mixed = MIXED.exec(s);
  if (mixed) {
    const sign = mixed[1] ? -1 : 1;
    const v = Number(mixed[2]) + Number(mixed[3]) / Number(mixed[4]);
    return { value: sign * v, isPlain: true };
  }
  const node = parseExpr(s);
  if (variablesOf(node).size > 0) throw new ParseError('Your answer should be a number, not an expression with variables.', 0);
  if (!allowFunctions && containsNode(node, (x) => x.t === 'fn' && WORKED_OUT.has(x.name))) {
    throw new ParseError('Work out the value: give a number or an exact form such as sqrt(3)/2 or 5pi/6, without sin, cos, tan, ln or log.', 0);
  }
  const plain = isPlainNumber(node);
  if (!plain && !allowExpression) {
    throw new ParseError('Calculate the final value as a number (you can use a decimal or a fraction).', 0);
  }
  const value = evaluate(node);
  if (!Number.isFinite(value)) throw new ParseError('That value is undefined.', 0);
  return { value, isPlain: plain };
}

const SUPERSCRIPT: Record<string, string> = { '⁻': '-', '⁺': '+', '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };
/** Scientific notation: 2.5e-3, 2.5E3, 2.5 x 10^-3, 2.5×10^(-3), 2.5*10^-3, 2.5 · 10⁻³. */
const SCIENTIFIC = /^([-−]?\d+(?:\.\d+)?)\s*(?:[eE]\s*([-+−]?\d+)|(?:[xX×*·]|\\times)\s*10\s*(?:\^\s*\(?\s*([-+−]?\d+)\s*\)?|([⁻⁺]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)))$/;

function scientificValue(s: string): number | null {
  const m = SCIENTIFIC.exec(s);
  if (!m) return null;
  const exp = m[2] ?? m[3] ?? [...m[4]].map((c) => SUPERSCRIPT[c]).join('');
  return Number(m[1].replace('−', '-')) * 10 ** Number(exp.replace('−', '-'));
}

/** A number, a negative number, or a simple fraction of numbers. */
function isPlainNumber(n: Node): boolean {
  const u = unparen(n);
  if (u.t === 'num') return u.raw !== 'e';
  if (u.t === 'neg') return isPlainNumber(u.a);
  if (u.t === 'div') {
    const a = unparen(u.a);
    const b = unparen(u.b);
    const numLike = (x: Node) => x.t === 'num' || (x.t === 'neg' && unparen(x.a).t === 'num');
    return numLike(a) && numLike(b);
  }
  return false;
}

function gradeNumeric(spec: Extract<AnswerSpec, { kind: 'numeric' }>, response: string): PartResult {
  if (!response) return invalid('Enter an answer.');
  const r = response.trim().toLowerCase();
  if (spec.undefinedValue) {
    return ['undefined', 'undef', 'und', 'none', 'no slope', 'dne'].includes(r)
      ? ok()
      : no('Think about what happens when the run is 0.');
  }
  if (['undefined', 'undef', 'und', 'dne'].includes(r)) return no();
  const allowExpr = spec.allowExpression ?? spec.decimals === undefined;
  const parsed = parseNumber(response, allowExpr, spec.allowFunctions, spec.scientific);
  if (!parsed) return invalid('Enter an answer.');
  const v = parsed.value;
  if (!numericMatches(spec, v)) return no();
  const issue = spec.fraction ? fractionIssue(response, spec.fraction) : spec.asDecimal && response.includes('/') ? 'Write your answer as a decimal.' : null;
  return issue ? no(issue) : ok();
}

function numericMatches(spec: Extract<AnswerSpec, { kind: 'numeric' }>, v: number): boolean {
  if (spec.tolerance !== undefined) return Math.abs(v - spec.value) <= spec.tolerance + 1e-12;
  if (spec.decimals !== undefined) {
    // Accept answers within roughly half a unit in the last place (allowing for
    // reasonable rounding of intermediate steps), plus a 0.2% relative allowance.
    const unit = 10 ** -spec.decimals;
    const tol = Math.max(0.6 * unit, Math.abs(spec.value) * 0.002);
    return Math.abs(v - spec.value) <= tol + 1e-12;
  }
  return approxEqual(v, spec.value, 1e-6, 1e-7);
}

/** Why a correct value is not written as the fraction the question asks for (lowest terms, or a mixed number). */
function fractionIssue(response: string, mode: 'lowest' | 'mixed'): string | null {
  const s = stripUnits(response.replace(/\$/g, '').trim());
  if (/^-?\d+$/.test(s)) return null;
  const m = /^-?\s*(?:(\d+)\s+)?(\d+)\s*\/\s*(\d+)$/.exec(s);
  if (!m) return mode === 'mixed' ? 'Write your answer as a fraction or a mixed number.' : 'Write your answer as a fraction in lowest terms.';
  const whole = m[1] !== undefined;
  const a = Number(m[2]);
  const b = Number(m[3]);
  if (b === 1 || (a % b === 0 && a > 0)) return 'Simplify: this fraction is a whole number.';
  if (whole && a >= b) return 'In a mixed number, the fraction part must be less than 1.';
  if (gcd(a, b) > 1) return 'Write the fraction in lowest terms.';
  if (mode === 'mixed' && !whole && a > b) return 'Write your answer as a mixed number.';
  return null;
}

const NO_SOLUTION = /^(none|no solutions?|no real (roots?|solutions?|zeros?)|no answer|dne|∅|\{\s*\})$/i;

/** A list of numbers in any order, such as "2, -3", "x = 2 or x = -3" or "no solution". */
function gradeNumbers(spec: Extract<AnswerSpec, { kind: 'numbers' }>, response: string): PartResult {
  if (!response) return invalid('Enter an answer.');
  if (NO_SOLUTION.test(response.trim())) return spec.values.length === 0 ? ok() : no();
  const pieces = response
    .split(/[,;]|\bor\b|\band\b/i)
    .map((p) => p.trim().replace(/^(?:[a-zθ]|theta)\s*=\s*/i, ''))
    .filter(Boolean);
  if (!pieces.length) return invalid('Enter an answer.');
  if (spec.values.length === 0) return no('Check whether any value works.');
  const one = (value: number): Extract<AnswerSpec, { kind: 'numeric' }> => ({ kind: 'numeric', value, decimals: spec.decimals, tolerance: spec.tolerance, allowFunctions: spec.allowFunctions });
  const unmatched = [...spec.values];
  let wrong = 0;
  for (const piece of pieces) {
    const at = unmatched.findIndex((v) => gradeNumeric(one(v), piece).correct);
    if (at >= 0) unmatched.splice(at, 1);
    // A repeated root ("3, 3" for a double root) is not a wrong answer.
    else if (spec.values.some((v) => !unmatched.includes(v) && gradeNumeric(one(v), piece).correct)) continue;
    else {
      const r = gradeNumeric(one(spec.values[0]), piece);
      if (r.invalid) return invalid(`We could not read "${piece}". Separate answers with commas.`);
      wrong++;
    }
  }
  if (!wrong && !unmatched.length) return ok();
  if (!wrong) return no(unmatched.length === 1 ? 'Close — there is one more answer.' : `Close — there are ${unmatched.length} more answers.`);
  if (!unmatched.length) return no('One of your answers does not work. Check each one.');
  return no();
}

// ---------------------------------------------------------------------------
// Expressions
// ---------------------------------------------------------------------------

const SAMPLE_POINTS = [0.731, 1.37, 2.113, 0.519, 1.91, 2.77, 1.123, 3.05];

function sampleEnvs(vars: string[], positive: boolean): Array<Record<string, number>> {
  const envs: Array<Record<string, number>> = [];
  for (let i = 0; i < SAMPLE_POINTS.length; i++) {
    const env: Record<string, number> = {};
    vars.forEach((v, j) => {
      const base = SAMPLE_POINTS[(i + j * 3) % SAMPLE_POINTS.length] + j * 0.173;
      env[v] = positive ? base : i % 2 === 0 ? base : -base;
    });
    envs.push(env);
  }
  return envs;
}

/** Numeric identity test on several sample points. */
export function equivalent(a: Node, b: Node, positive = true): boolean {
  const vars = [...new Set([...variablesOf(a), ...variablesOf(b)])];
  let checked = 0;
  for (const env of sampleEnvs(vars, positive)) {
    const va = evaluate(a, env);
    const vb = evaluate(b, env);
    if (!Number.isFinite(va) && !Number.isFinite(vb)) continue;
    if (!Number.isFinite(va) || !Number.isFinite(vb)) return false;
    if (!approxEqual(va, vb, 1e-7, 1e-7)) return false;
    checked++;
  }
  return checked >= 3;
}

function gradeExpression(spec: Extract<AnswerSpec, { kind: 'expression' }>, response: string): PartResult {
  if (!response) return invalid('Enter an answer.');
  const expected = parseExpr(spec.expected);
  // "y = 3n + 4" when the box already says "y =": read the right-hand side, unless the
  // left-hand letter is one of the expression's own variables.
  const named = /^\s*([A-Za-z])\s*=\s*([^=]+)$/.exec(response);
  const student = matchCase(parseExpr(named && !variablesOf(expected).has(named[1]) ? named[2] : response), expected);
  const extraVars = [...variablesOf(student)].filter((v) => !variablesOf(expected).has(v));
  if (extraVars.length) return no(`Your answer uses ${extraVars.join(', ')}, which is not in the question.`);
  if (!equivalent(student, expected, spec.positiveVars ?? true)) {
    return no();
  }
  const form = spec.form ?? 'any';
  const issue = formIssue(student, form, spec.radicalIndex ?? 2);
  return issue ? no(issue) : ok();
}

/**
 * A letter typed in the other case (c for the question's C) is read as the question's variable,
 * unless the question itself uses both cases of that letter.
 */
function matchCase(n: Node, expected: Node): Node {
  const own = variablesOf(expected);
  const byLower = new Map<string, string | null>();
  for (const v of own) byLower.set(v.toLowerCase(), byLower.has(v.toLowerCase()) ? null : v);
  const rename = (x: Node): Node => {
    switch (x.t) {
      case 'var': {
        const to = own.has(x.name) ? x.name : byLower.get(x.name.toLowerCase());
        return to ? { t: 'var', name: to } : x;
      }
      case 'neg':
      case 'paren':
        return { ...x, a: rename(x.a) };
      case 'add':
      case 'sub':
      case 'mul':
      case 'div':
      case 'pow':
        return { ...x, a: rename(x.a), b: rename(x.b) };
      case 'fn':
        return { ...x, args: x.args.map(rename) };
      default:
        return x;
    }
  };
  return rename(n);
}

/** Returns a message describing why `n` is not in the requested form, or null if it is. */
export function formIssue(n: Node, form: ExprForm, radicalIndex = 2): string | null {
  switch (form) {
    case 'any':
      return null;
    case 'expanded':
      return expandedIssue(n);
    case 'factored':
      return factoredIssue(n, true);
    case 'gcf':
      return factoredIssue(n, false);
    case 'simplified-radical':
      return radicalIssue(n, radicalIndex);
    case 'entire-radical': {
      const u = unparen(n);
      const isRad = u.t === 'fn' && (u.name === 'sqrt' || u.name === 'cbrt' || u.name === 'root');
      if (!isRad) return 'Write the answer as a single radical (an entire radical) with nothing outside the radical sign.';
      return null;
    }
    case 'positive-exponents':
      return exponentIssue(n);
    case 'single-function':
      return singleFunctionIssue(n);
    case 'prime-factorization':
      return primeFactorIssue(n);
    case 'radical-form':
      if (containsNode(n, (x) => x.t === 'pow' && !isIntegerExponent(x.b)))
        return 'Write the answer using a radical sign instead of a fractional exponent.';
      return null;
    case 'exponent-form':
      if (containsNode(n, (x) => x.t === 'fn')) return 'Write the answer using a rational exponent instead of a radical sign.';
      return null;
  }
}

/**
 * A simplified trigonometric expression: at most one function (sin 2x, 2sec^2 x, 1 + cos x, or a
 * constant) and no function in a denominator, so the unsimplified expression typed back is not accepted.
 */
function singleFunctionIssue(n: Node): string | null {
  let calls = 0;
  containsNode(n, (x) => {
    if (x.t === 'fn' && WORKED_OUT.has(x.name)) calls++;
    return false;
  });
  if (calls > 1) return 'Simplify further: the answer needs only one trigonometric function.';
  if (containsNode(n, (x) => x.t === 'div' && containsNode(x.b, (y) => y.t === 'fn'))) return 'Simplify further: write the answer without a fraction.';
  return null;
}

function isIntegerExponent(n: Node): boolean {
  try {
    const v = evaluate(n);
    return Number.isInteger(v);
  } catch {
    return false;
  }
}

function expandedIssue(n: Node): string | null {
  const terms = sumTerms(n);
  if (terms.length === 1) {
    const only = unparen(terms[0].node);
    if (only.t === 'num' && only.v === 0) return null;
  }
  const keys = new Set<string>();
  for (const { node } of terms) {
    const info = monomialInfo(node);
    if (!info) return 'Expand completely — your answer still has brackets that need to be multiplied out.';
    if (info.repeatedVar) return 'Simplify each term (for example, write x·x as x²).';
    if (info.numericLiterals > 1) return 'Multiply the numbers in each term together.';
    if (keys.has(info.key)) return 'Combine like terms.';
    if (info.coef === 0) return 'Remove terms that equal zero.';
    keys.add(info.key);
  }
  return null;
}

function factoredIssue(n: Node, full: boolean): string | null {
  const { factors } = productFactors(unparen(n));
  const polyFactors = factors
    .map((f) => ({ ...f, poly: toPoly(f.node) }))
    .filter((f) => f.poly && f.poly.size >= 2);
  if (polyFactors.length === 0) {
    // Single-term answers are only "factored" if the original was a monomial.
    const p = toPoly(n);
    if (p && p.size >= 2) return 'Write the answer as a product of factors.';
    return null;
  }
  let numericAndMonomial = 0;
  for (const f of factors) {
    const p = toPoly(f.node);
    if (!p) return 'Write the answer as a product of polynomial factors.';
    if (p.size === 1) numericAndMonomial++;
  }
  void numericAndMonomial;
  for (const f of polyFactors) {
    const p = f.poly!;
    const content = polyContent(p);
    if (content === 0) return 'Use integer coefficients inside each factor.';
    if (content > 1) return 'A common factor is still inside one of the brackets. Factor it out.';
    if (hasCommonVariable(p)) return 'A variable is common to every term in one of the brackets. Factor it out.';
    if (full && isReducibleOverIntegers(p)) return 'One of your factors can be factored further. Factor completely.';
  }
  // A product that is really just the expanded polynomial times 1 is not factored.
  if (full && factors.length === 1 && polyFactors.length === 1 && polyDegree(polyFactors[0].poly!) >= 2) {
    if (isReducibleOverIntegers(polyFactors[0].poly!)) return 'Write the answer as a product of factors.';
  }
  return null;
}

function radicalIssue(n: Node, index: number): string | null {
  // Accept: k, sqrt(m), k*sqrt(m), -k*sqrt(m), sqrt(m)*k, k/j? (not needed)
  const { factors } = productFactors(unparen(n));
  let radicals = 0;
  let numbers = 0;
  for (const f of factors) {
    const u = unparen(f.node);
    if (u.t === 'num') {
      numbers++;
      continue;
    }
    if (u.t === 'fn' && (u.name === 'sqrt' || u.name === 'cbrt' || u.name === 'root')) {
      const k = u.name === 'sqrt' ? 2 : u.name === 'cbrt' ? 3 : evaluate(u.args[0]);
      const rad = evaluate(u.args[u.args.length - 1]);
      if (!Number.isInteger(rad)) return 'Keep a whole number under the radical sign.';
      if (k !== index) return `Use a ${index === 2 ? 'square' : index === 3 ? 'cube' : `${index}th`} root.`;
      if (radicalSplit(rad, k).outside !== 1 && Math.abs(radicalSplit(rad, k).outside) !== 1)
        return 'The radical can be simplified further — look for a perfect ' + (k === 2 ? 'square' : 'cube') + ' factor.';
      if (Math.abs(rad) === 1 || rad === 0) return 'Simplify the radical completely.';
      radicals++;
      continue;
    }
    return 'Write the answer in the form a√b.';
  }
  if (radicals > 1) return 'Combine the radicals into one.';
  if (numbers > 1) return 'Multiply the numbers outside the radical together.';
  return null;
}

function exponentIssue(n: Node): string | null {
  if (containsNode(n, (x) => x.t === 'pow' && evaluateSafe(x.b) !== null && evaluateSafe(x.b)! < 0))
    return 'Write the answer using positive exponents only.';
  if (containsNode(n, (x) => x.t === 'pow' && evaluateSafe(x.b) === 0)) return 'Simplify powers with an exponent of 0.';
  // Each variable should appear once in the numerator or denominator.
  const counts = new Map<string, number>();
  const walk = (x: Node) => {
    switch (x.t) {
      case 'var':
        counts.set(x.name, (counts.get(x.name) ?? 0) + 1);
        break;
      case 'neg':
      case 'paren':
        walk(x.a);
        break;
      case 'mul':
      case 'div':
        walk(x.a);
        walk(x.b);
        break;
      case 'pow':
        walk(x.a);
        break;
      case 'fn':
        x.args.forEach(walk);
        break;
      case 'add':
      case 'sub':
        walk(x.a);
        walk(x.b);
        break;
      default:
    }
  };
  walk(n);
  for (const [v, c] of counts) if (c > 1) return `Combine the powers of ${v} into a single power.`;
  // Numeric literals: allow at most one number in numerator and one in denominator.
  let nums = 0;
  const countNums = (x: Node) => {
    if (x.t === 'num') nums++;
    else if (x.t === 'neg' || x.t === 'paren') countNums(x.a);
    else if (x.t === 'mul' || x.t === 'div') {
      countNums(x.a);
      countNums(x.b);
    }
  };
  countNums(n);
  if (nums > 2) return 'Simplify the numerical coefficient.';
  return null;
}

function evaluateSafe(n: Node): number | null {
  if (variablesOf(n).size) return null;
  const v = evaluate(n);
  return Number.isFinite(v) ? v : null;
}

function primeFactorIssue(n: Node): string | null {
  const { factors } = productFactors(unparen(n));
  for (const f of factors) {
    const u = unparen(f.node);
    if (u.t === 'num') {
      if (!isPrime(u.v)) return `${u.v} is not prime — keep factoring.`;
      continue;
    }
    if (u.t === 'pow') {
      const b = unparen(u.a);
      if (b.t === 'num' && isPrime(b.v)) continue;
    }
    return 'Write the answer as a product of prime numbers (you may use exponents).';
  }
  return null;
}

// ---------------------------------------------------------------------------
// Lines and equations
// ---------------------------------------------------------------------------

/** Extract Ax + By + C from an equation if it is linear in x and y. */
export function lineFromEquation(lhs: Node, rhs: Node): Line | null {
  const vars = new Set([...variablesOf(lhs), ...variablesOf(rhs)]);
  for (const v of vars) if (v !== 'x' && v !== 'y') return null;
  const f = (x: number, y: number) => evaluate(lhs, { x, y }) - evaluate(rhs, { x, y });
  const C = f(0, 0);
  const A = f(1, 0) - C;
  const B = f(0, 1) - C;
  if (![A, B, C].every(Number.isFinite)) return null;
  // Verify linearity at other points.
  for (const [x, y] of [
    [2.3, -1.7],
    [-3.1, 4.4],
    [5.5, 2.2],
  ]) {
    const v = f(x, y);
    if (!approxEqual(v, A * x + B * y + C, 1e-6, 1e-6)) return null;
  }
  if (Math.abs(A) < 1e-12 && Math.abs(B) < 1e-12) return null;
  return { A, B, C };
}

export function sameLine(a: Line, b: Line): boolean {
  // Proportional coefficient vectors.
  const cross = (p: number, q: number, r: number, s: number) => p * s - q * r;
  return (
    Math.abs(cross(a.A, a.B, b.A, b.B)) < 1e-6 &&
    Math.abs(cross(a.A, a.C, b.A, b.C)) < 1e-6 &&
    Math.abs(cross(a.B, a.C, b.B, b.C)) < 1e-6
  );
}

function isVar(n: Node, name: string): boolean {
  const u = unparen(n);
  return u.t === 'var' && u.name === name;
}

function gradeLine(line: Line, form: LineForm, response: string): PartResult {
  if (!response) return invalid('Enter an equation.');
  const { lhs, rhs } = parseEquation(response);
  const got = lineFromEquation(lhs, rhs);
  if (!got) return no('That equation is not a linear relation in x and y.');
  if (!sameLine(got, line)) return no();
  const issue = lineFormIssue(lhs, rhs, form);
  return issue ? no(issue) : ok();
}

export function lineFormIssue(lhs: Node, rhs: Node, form: LineForm): string | null {
  switch (form) {
    case 'any':
      return null;
    case 'slope-intercept': {
      if (!isVar(lhs, 'y')) return 'Write the equation in slope-intercept form, y = mx + b, with y alone on the left.';
      if (variablesOf(rhs).has('y')) return 'The right side should not contain y.';
      return null;
    }
    case 'general': {
      const r = unparen(rhs);
      if (!(r.t === 'num' && r.v === 0)) return 'General form has 0 on the right side: Ax + By + C = 0.';
      const poly = toPoly(lhs);
      if (!poly) return 'Write the left side as Ax + By + C.';
      const exp = expandedIssue(lhs);
      if (exp) return 'Write the left side as Ax + By + C with like terms combined.';
      for (const c of poly.values()) {
        if (Math.abs(c - Math.round(c)) > 1e-9) return 'In general form, A, B and C must be integers (no fractions or decimals).';
      }
      const A = poly.get('x') ?? 0;
      const B = poly.get('y') ?? 0;
      if (A < 0 || (A === 0 && B < 0)) return 'In general form, the coefficient of x (A) should be positive.';
      return null;
    }
    case 'slope-point': {
      // y - k = m(x - h)
      const lTerms = sumTerms(lhs);
      const yTerms = lTerms.filter((t) => isVar(t.node, 'y'));
      if (yTerms.length !== 1 || yTerms[0].sign !== 1 || lTerms.length > 2)
        return 'Write the equation in slope-point form: y − y₁ = m(x − x₁).';
      if (lTerms.some((t) => !isVar(t.node, 'y') && variablesOf(t.node).size > 0))
        return 'Write the equation in slope-point form: y − y₁ = m(x − x₁).';
      const r = unparen(rhs);
      const { factors } = productFactors(r);
      const xFactors = factors.filter((f) => variablesOf(f.node).has('x'));
      if (xFactors.length !== 1 || variablesOf(r).has('y'))
        return 'Write the right side as m(x − x₁).';
      const inner = sumTerms(xFactors[0].node);
      const xs = inner.filter((t) => isVar(t.node, 'x'));
      if (xs.length !== 1 || inner.length > 2) {
        // Allow y - k = mx only when h = 0, e.g. y - 3 = 2x.
        if (!(inner.length === 1 && isVar(inner[0].node, 'x'))) return 'Write the right side as m(x − x₁).';
      }
      return null;
    }
  }
}

function gradeFunctionNotation(spec: Extract<AnswerSpec, { kind: 'equation-fn' }>, response: string): PartResult {
  if (!response) return invalid('Enter an equation.');
  const norm = response.replace(/\s+/g, '');
  const re = new RegExp(`^${spec.fnName}\\(${spec.variable}\\)=`, 'i');
  if (!re.test(norm)) return no(`Start with ${spec.fnName}(${spec.variable}) =`);
  const body = norm.replace(re, '');
  const student = parseExpr(body);
  const expected = parseExpr(spec.expected);
  return equivalent(student, expected, false) ? ok() : no();
}

// ---------------------------------------------------------------------------
// Points and graphs
// ---------------------------------------------------------------------------

function gradePoint(spec: Extract<AnswerSpec, { kind: 'point' }>, response: string): PartResult {
  if (!response) return invalid('Enter a point such as (2, -3).');
  const parts = splitPoint(response);
  if (!parts) return invalid('Write the point as (x, y) with a comma between the coordinates.');
  const x = parseNumber(parts[0], true);
  const y = parseNumber(parts[1], true);
  if (!x || !y) return invalid('Write the point as (x, y).');
  const tol = spec.tolerance ?? 1e-6;
  const okX = Math.abs(x.value - spec.x) <= tol;
  const okY = Math.abs(y.value - spec.y) <= tol;
  if (okX && okY) return ok();
  if (Math.abs(x.value - spec.y) <= tol && Math.abs(y.value - spec.x) <= tol) return no('Check the order: (x, y).');
  if (okX) return no('The x-coordinate is right; check the y-coordinate.');
  if (okY) return no('The y-coordinate is right; check the x-coordinate.');
  return no();
}

export function parseGraphResponse(response: string): Array<[number, number]> | null {
  try {
    const v = JSON.parse(response);
    if (!Array.isArray(v)) return null;
    return v
      .filter((p) => Array.isArray(p) && p.length === 2 && p.every((c: unknown) => typeof c === 'number'))
      .map((p) => [p[0], p[1]] as [number, number]);
  } catch {
    return null;
  }
}

function onLine(l: Line, [x, y]: [number, number]) {
  const norm = Math.hypot(l.A, l.B);
  return Math.abs(l.A * x + l.B * y + l.C) / norm < 1e-6;
}

function gradeGraphLine(line: Line, response: string): PartResult {
  const pts = parseGraphResponse(response);
  if (!pts || pts.length < 2) return invalid('Place two points to draw the line.');
  const [p, q] = pts;
  if (p[0] === q[0] && p[1] === q[1]) return invalid('Your two points are the same. Move one of them.');
  const okP = onLine(line, p);
  const okQ = onLine(line, q);
  if (okP && okQ) return ok();
  if (okP || okQ) return no('One of your points is on the line, but the other is not. Check the slope.');
  return no();
}

function gradeGraphPoints(points: Array<[number, number]>, response: string): PartResult {
  const pts = parseGraphResponse(response);
  if (!pts || pts.length === 0) return invalid('Plot the points on the grid.');
  const key = (p: [number, number]) => `${p[0]},${p[1]}`;
  const want = new Set(points.map(key));
  const got = new Set(pts.map(key));
  if (want.size === got.size && [...want].every((k) => got.has(k))) return ok();
  return no(got.size !== want.size ? `Plot exactly ${want.size} point${want.size === 1 ? '' : 's'}.` : undefined);
}

// ---------------------------------------------------------------------------
// Chemistry

/** A formula is right when one way of reading it has the expected atoms and charge. */
function gradeFormula(expected: string, response: string): PartResult {
  if (!response) return invalid('Enter a formula.');
  const want = parseFormula(expected);
  const readings = readFormula(response);
  if (readings.some((f) => sameFormula(f, want))) return ok();
  const sameAtoms = (f: { atoms: Map<string, number> }) => sameFormula({ atoms: f.atoms, charge: 0 }, { atoms: want.atoms, charge: 0 });
  if (want.charge && readings.every((f) => f.charge === 0)) return no('This is an ion: write its charge too, such as SO4^2- or Fe^3+.');
  if (readings.some(sameAtoms)) return no(want.charge ? 'The atoms are right; check the charge.' : 'This compound has no charge.');
  return no();
}

/** Coefficients are right when they balance the atoms and the charge in lowest whole numbers. */
function gradeCoefficients(reactants: string[], products: string[], response: string): PartResult {
  const n = reactants.length + products.length;
  const boxes = response.split(',').map((b) => b.trim());
  if (boxes.length !== n || boxes.every((b) => !b)) return invalid('Fill in the coefficients. Leave a box empty for 1.');
  if (boxes.some((b) => b && !/^[1-9]\d*$/.test(b))) return invalid('Use whole numbers such as 2 or 3. Leave a box empty for 1.');
  const k = boxes.map((b) => (b ? Number(b) : 1));
  if (!isBalanced(reactants, products, k)) {
    // Name the first element that is off, so the student knows where to look.
    const species = [...reactants, ...products].map(parseFormula);
    const count = new Map<string, number>();
    species.forEach((f, j) => f.atoms.forEach((a, el) => count.set(el, (count.get(el) ?? 0) + a * k[j] * (j < reactants.length ? 1 : -1))));
    const off = [...count].find(([, v]) => v !== 0)?.[0];
    return no(off ? `Not balanced yet: count the ${off} atoms on each side.` : 'The atoms balance, but the charges on the two sides do not.');
  }
  if (k.reduce((a, v) => gcd(a, v), 0) > 1) return no('Balanced, but use the lowest whole numbers.');
  return ok();
}
