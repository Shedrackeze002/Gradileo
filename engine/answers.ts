/** Canonical answers: what a correct response looks like for each answer spec. */
import type { AnswerSpec, Item } from './types.ts';
import { fmt, fmtFixed, toFrac, fracText, fracLatex } from './math/numbers.ts';
import { lineText, generalText, lineSlope, lineYIntercept, slopePointText, evalLineY } from './math/linear.ts';
import { frac } from './math/numbers.ts';
import { parseExpr, toLatex } from './math/expr.ts';
import { balance, ce } from './chem/formula.ts';

/** A response string that the grader will accept for the spec (used for tests and "show answer"). Pass the part so a unit after the box is known. */
export function canonicalResponse(spec: AnswerSpec, part?: { suffix?: string }): string {
  switch (spec.kind) {
    case 'mc':
      return spec.correct;
    case 'multi':
      return spec.correct.join(',');
    case 'order':
      return spec.correctOrder.join(',');
    case 'text':
      return spec.accepted[0];
    case 'formula':
      return spec.expected;
    case 'coefficients':
      return (balance(spec.reactants, spec.products) ?? []).join(',');
    case 'numeric': {
      if (spec.undefinedValue) return 'undefined';
      if (spec.decimals !== undefined) return fmtFixed(spec.value, spec.decimals);
      if (spec.exact) return spec.exact;
      const f = toFrac(spec.value, spec.fraction ? 100000 : 1000);
      if (f && spec.fraction === 'mixed' && f.d !== 1 && Math.abs(f.n) > f.d) {
        const n = Math.abs(f.n);
        return `${f.n < 0 ? '-' : ''}${Math.floor(n / f.d)} ${n % f.d}/${f.d}`;
      }
      if (f && !spec.fraction && (spec.asDecimal || showDecimal(spec, f.d, unitOf(spec, part)))) return fmt(spec.value, 6);
      if (f) return fracText(f);
      return exactForm(spec.value) ?? fmt(spec.value, 10);
    }
    case 'numbers':
      return spec.values.length ? spec.values.map((value, i) => canonicalResponse({ kind: 'numeric', value, decimals: spec.decimals, exact: spec.exact?.[i] })).join(', ') : 'none';
    case 'expression':
      return spec.expected;
    case 'line': {
      const l = spec.line;
      if (spec.form === 'general') return generalText(l);
      const m = lineSlope(l);
      if (spec.form === 'slope-point' && m) {
        const x0 = 1;
        const y0 = evalLineY(l, x0);
        const yf = toFrac(y0, 1000) ?? frac(Math.round(y0));
        if (yf.d === 1) return slopePointText(m, [x0, yf.n]);
        // fall back to x = 0 with fractional intercept written as y - b = m(x - 0)
        const b = lineYIntercept(l)!;
        return `y - (${fracText(b)}) = (${fracText(m)})(x - 0)`;
      }
      return lineText(l);
    }
    case 'equation-fn':
      return `${spec.fnName}(${spec.variable}) = ${spec.expected}`;
    case 'point':
      return `(${coord(spec.x, fracText, false)}, ${coord(spec.y, fracText, false)})`;
    case 'graph-line': {
      const l = spec.line;
      if (l.B === 0) {
        const x = -l.C / l.A;
        return JSON.stringify([
          [x, 0],
          [x, 1],
        ]);
      }
      // Find two lattice points on the line within the grid if possible.
      const pts: Array<[number, number]> = [];
      for (let x = spec.grid.xMin; x <= spec.grid.xMax && pts.length < 2; x++) {
        const y = evalLineY(l, x);
        if (Math.abs(y - Math.round(y)) < 1e-9) pts.push([x, Math.round(y)]);
      }
      if (pts.length < 2) {
        pts.length = 0;
        pts.push([0, evalLineY(l, 0)], [1, evalLineY(l, 1)]);
      }
      return JSON.stringify(pts);
    }
    case 'graph-points':
      return JSON.stringify(spec.points);
    case 'manual':
      return '';
  }
}

export function canonicalResponses(item: Item): string[] {
  return item.parts.map((p) => canonicalResponse(p.answer, p));
}

/** A coordinate: a short decimal (2.5, -0.25), an exact fraction (5/11), or an exact radical or multiple of pi (-sqrt(3)/2). */
function coord(v: number, write: (f: NonNullable<ReturnType<typeof toFrac>>) => string, latex: boolean): string {
  const f = toFrac(v, 1000);
  if (f && (f.d === 1 || (terminates(f.d) && Math.abs(v * 100 - Math.round(v * 100)) < 1e-9))) return fmt(v, 6);
  if (f) return write(f);
  const exact = exactForm(v);
  if (exact) return latex ? latexOf(exact) : exact;
  return fmt(v, 6);
}

/** LaTeX for an answer written in the syntax students type ('5pi/6', 'sqrt(3)/2'). */
function latexOf(src: string): string {
  try {
    return toLatex(parseExpr(src));
  } catch {
    return src;
  }
}

/** An exact form for a value that is not a fraction: a multiple of pi (5pi/6) or one radical (sqrt(3)/2, -2sqrt(3)/3). */
export function exactForm(v: number): string | null {
  if (!Number.isFinite(v) || v === 0) return null;
  const sign = v < 0 ? '-' : '';
  const p = toFrac(Math.abs(v) / Math.PI, 12);
  if (p) return `${sign}${p.n === 1 ? '' : p.n}pi${p.d === 1 ? '' : `/${p.d}`}`;
  for (let d = 1; d <= 12; d++) {
    const w2 = (v * d) ** 2;
    const m = Math.round(w2);
    if (m < 2 || m > 10000 || Math.abs(w2 - m) > 1e-7 * m) continue;
    let a = 1;
    let b = m;
    for (let k = Math.floor(Math.sqrt(m)); k >= 2; k--) {
      if (m % (k * k) === 0) {
        a = k;
        b = m / (k * k);
        break;
      }
    }
    if (b === 1) continue;
    let g = a;
    for (let x = d; x; ) [g, x] = [x, g % x];
    const num = a / g;
    const den = d / g;
    return `${sign}${num === 1 ? '' : num}sqrt(${b})${den === 1 ? '' : `/${den}`}`;
  }
  return null;
}

/** True when a fraction with this denominator is a terminating decimal. */
function terminates(d: number): boolean {
  let x = d;
  while (x % 2 === 0) x /= 2;
  while (x % 5 === 0) x /= 5;
  return x === 1;
}

/** Imperial and kitchen measures, which are written with halves, quarters and eighths (5 1/2 in, 3/4 cup). */
const FRACTION_UNITS = /^(cups?|in|inch(es)?|ft|feet|foot|yd|yards?|mi|miles?|lb|pounds?|oz|ounces?|tsp|teaspoons?|tbsp|tablespoons?|pints?|quarts?|gallons?)$/i;

function unitOf(spec: { unit?: string }, part?: { suffix?: string }): string {
  return (spec.unit ?? part?.suffix ?? '').trim();
}

/**
 * Whether an exact non-integer answer is shown as a decimal: 621/50 as 12.42, and 8.4 cm, 3.5 cm or
 * 55.7% rather than 8 2/5 cm or 557/10%. Values without a unit (ratios, slopes, probabilities) and
 * imperial halves, quarters and eighths stay as fractions unless the spec says otherwise.
 */
function showDecimal(spec: { display?: 'fraction' | 'decimal' }, d: number, unit: string): boolean {
  if (!terminates(d)) return false;
  if (spec.display) return spec.display === 'decimal';
  if (d > 16) return true;
  if (!unit) return false;
  const powerOfTwo = (d & (d - 1)) === 0;
  return !(powerOfTwo && FRACTION_UNITS.test(unit));
}

/** The correct answer as Markdown (with LaTeX) for review screens. Pass the part so a unit shown after the box is included. */
export function answerMarkdown(spec: AnswerSpec, part?: { suffix?: string }): string {
  switch (spec.kind) {
    case 'mc':
      return spec.choices.find((c) => c.id === spec.correct)?.md ?? '';
    case 'multi':
      return spec.choices
        .filter((c) => spec.correct.includes(c.id))
        .map((c) => c.md)
        .join('; ');
    case 'order':
      return spec.correctOrder.map((id) => spec.items.find((c) => c.id === id)?.md ?? id).join(' , ');
    case 'text':
      return spec.accepted[0];
    case 'formula':
      return `$${ce(spec.expected)}$`;
    case 'coefficients':
      return `$${equationTex(spec.reactants, spec.products, balance(spec.reactants, spec.products) ?? [])}$`;
    case 'numeric': {
      if (spec.undefinedValue) return 'undefined';
      const unit = spec.unit ? ` ${spec.unit}` : part?.suffix ? ` ${part.suffix}` : '';
      if (spec.decimals !== undefined) return `$${fmtFixed(spec.value, spec.decimals)}$${unit}`;
      if (spec.exact) return `$${latexOf(spec.exact)}$${unit}`;
      const f = toFrac(spec.value, spec.fraction ? 100000 : 1000);
      if (f && f.d !== 1) {
        if (!spec.fraction && (spec.asDecimal || showDecimal(spec, f.d, unitOf(spec, part)))) return `$${fmt(spec.value, 6)}$${unit}`;
        const n = Math.abs(f.n);
        // A measured amount (it has a unit) is written as a mixed number: 5 2/3 cups, not 17/3.
        if ((part?.suffix || spec.fraction === 'mixed') && n > f.d) return `$${f.n < 0 ? '-' : ''}${Math.floor(n / f.d)}\\tfrac{${n % f.d}}{${f.d}}$${unit}`;
        return `$${f.n < 0 ? '-' : ''}\\frac{${n}}{${f.d}}$${unit}`;
      }
      if (f) return `$${f.n}$${unit}`;
      const exact = exactForm(spec.value);
      return `$${exact ? latexOf(exact) : fmt(spec.value, 6)}$${unit}`;
    }
    case 'numbers':
      return spec.values.length ? spec.values.map((value, i) => answerMarkdown({ kind: 'numeric', value, decimals: spec.decimals, exact: spec.exact?.[i] })).join(' and ') : 'none';
    case 'expression':
      return '`' + spec.expected + '`';
    case 'line':
      return '`' + canonicalResponse(spec) + '`';
    case 'equation-fn':
      return '`' + canonicalResponse(spec) + '`';
    case 'point':
      return `$(${coord(spec.x, fracLatex, true)},\\ ${coord(spec.y, fracLatex, true)})$`;
    case 'graph-line':
      return 'the line through ' + JSON.parse(canonicalResponse(spec)).map((p: number[]) => `$(${fmt(p[0], 3)}, ${fmt(p[1], 3)})$`).join(' and ');
    case 'graph-points':
      return spec.points.map((p) => `$(${p[0]}, ${p[1]})$`).join(', ');
    case 'manual':
      return spec.rubric ?? 'Teacher-graded response';
  }
}

/** An equation in mhchem with its coefficients (a coefficient of 1 is not written): `\ce{2H2 + O2 -> 2H2O}`. */
export function equationTex(reactants: string[], products: string[], coefficients: number[]): string {
  const side = (list: string[], from: number) => list.map((f, i) => `${coefficients[from + i] && coefficients[from + i] !== 1 ? coefficients[from + i] : ''}${f.replace(/\./g, '*')}`).join(' + ');
  return `\\ce{${side(reactants, 0)} -> ${side(products, reactants.length)}}`;
}
